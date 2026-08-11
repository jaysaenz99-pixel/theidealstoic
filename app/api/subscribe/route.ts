import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Per-IP throttle. This lives in process memory, so it resets on deploy and is
 * not shared between serverless instances — it is a speed bump for casual
 * scripted submissions, not real abuse protection. The database unique index on
 * email is what actually keeps the list clean.
 */
const RATE_LIMIT = { max: 5, windowMs: 60_000 };
const hits = new Map<string, number[]>();

function overRateLimit(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) hits.clear();

  return recent.length > RATE_LIMIT.max;
}

export async function POST(request: Request) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("Supabase env vars are missing. See SETUP.md.");
    return NextResponse.json(
      { error: "The signup form is not connected yet." },
      { status: 500 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (overRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Wait a minute and try again." },
      { status: 429 },
    );
  }

  let payload: { email?: unknown; website?: unknown };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Report success so the bot does not learn to work around it.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "That does not look like an email address." },
      { status: 400 },
    );
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from("subscribers").insert({ email, source: "site" });

  if (error) {
    // 23505 is Postgres' unique-violation: they are already subscribed, which
    // is the outcome they wanted. Do not confront them about it.
    if (error.code === "23505") {
      return NextResponse.json({ ok: true });
    }

    console.error("Supabase insert failed:", error.message, error.code);
    return NextResponse.json(
      { error: "Could not save that address. Try again in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
