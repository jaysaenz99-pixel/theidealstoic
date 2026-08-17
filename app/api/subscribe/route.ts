import { NextResponse } from "next/server";
import {
  WELCOME_SUBJECT,
  welcomeHtml,
  welcomeText,
} from "@/lib/welcome-email";

export const runtime = "nodejs";

/**
 * Credentials for this site only. Deliberately namespaced so nothing here can
 * ever pick up another project's email configuration.
 */
const API_KEY = process.env.IDEAL_STOIC_RESEND_KEY;
const AUDIENCE_ID = process.env.IDEAL_STOIC_AUDIENCE_ID;
const FROM =
  process.env.IDEAL_STOIC_FROM ??
  "Christ the Ideal Stoic <hello@theidealstoic.com>";

const RESEND = "https://api.resend.com";

// Best-effort throttle. Per instance, so it slows abuse rather than stopping it.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > RATE_MAX;
}

function isEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)
  );
}

class ResendError extends Error {
  constructor(
    readonly status: number,
    readonly path: string,
    detail: string,
  ) {
    super(`Resend ${path} ${status}: ${detail.slice(0, 300)}`);
  }
}

async function resend(path: string, body: unknown) {
  const response = await fetch(`${RESEND}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new ResendError(response.status, path, detail);
  }

  return response.json().catch(() => ({}));
}

/**
 * Resend renamed Audiences to Segments and retired the old path, which failed
 * silently in the worst way: storing the address is attempted before the
 * welcome note is sent, so a 404 here cost us both the contact and the email.
 *
 * Both paths are tried, newest first, so this survives the rename in either
 * direction. An address Resend already holds is the outcome the reader wanted,
 * so a conflict counts as success rather than an error thrown in their face.
 */
async function storeContact(segmentId: string, email: string) {
  const paths = [
    `/segments/${segmentId}/contacts`,
    `/audiences/${segmentId}/contacts`,
  ];

  let lastError: unknown;

  for (const path of paths) {
    try {
      return await resend(path, { email, unsubscribed: false });
    } catch (error) {
      if (error instanceof ResendError) {
        if (error.status === 409 || error.status === 422) return {};
        // Only a missing endpoint is worth retrying elsewhere.
        if (error.status !== 404) throw error;
      }
      lastError = error;
    }
  }

  throw lastError;
}

export async function POST(request: Request) {
  let payload: { email?: unknown; company?: unknown };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot, checked again on the server.
  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";

  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "That does not look like an email address." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again in a minute." },
      { status: 429 },
    );
  }

  if (!API_KEY) {
    console.error(
      "IDEAL_STOIC_RESEND_KEY is not set — the signup form cannot store or send anything.",
    );
    return NextResponse.json(
      {
        error:
          "The list is not quite open yet. Please try again shortly, or write to hello@theidealstoic.com.",
      },
      { status: 503 },
    );
  }

  try {
    // Keep the address first. The welcome note matters less than the list.
    if (AUDIENCE_ID) {
      await storeContact(AUDIENCE_ID, email);
    }

    await resend("/emails", {
      from: FROM,
      to: [email],
      subject: WELCOME_SUBJECT,
      html: welcomeHtml(),
      text: welcomeText(),
      headers: {
        "List-Unsubscribe": `<mailto:${FROM.replace(/^.*<|>$/g, "")}?subject=Unsubscribe>`,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("subscribe failed", error);
    return NextResponse.json(
      {
        error:
          "We could not add you just now. Please try again in a moment, or write to hello@theidealstoic.com.",
      },
      { status: 502 },
    );
  }
}
