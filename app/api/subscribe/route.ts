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
    throw new Error(`Resend ${path} ${response.status}: ${detail.slice(0, 300)}`);
  }

  return response.json().catch(() => ({}));
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
      await resend(`/audiences/${AUDIENCE_ID}/contacts`, {
        email,
        unsubscribed: false,
      });
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
