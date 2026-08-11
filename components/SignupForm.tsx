"use client";

import { useState } from "react";
import { signup } from "@/lib/content";

type State = "idle" | "sending" | "done" | "error";

export function SignupForm() {
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    setState("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          // Bots fill every field they find; people never see this one.
          website: form.get("website") ?? "",
        }),
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        setState("error");
        setMessage(body.error ?? "That did not go through. Try again.");
        return;
      }

      setState("done");
    } catch {
      setState("error");
      setMessage("No connection to the server. Check your network and try again.");
    }
  }

  if (state === "done") {
    return (
      <p
        className="text-lg text-parchment/90 max-w-md"
        role="status"
        aria-live="polite"
      >
        <span className="text-gilt">✓</span> {signup.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md" noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          className="flex-1 min-w-0 rounded-sm border border-parchment/25 bg-transparent px-4 py-3
                     font-[family-name:var(--font-utility)] text-[0.95rem] text-parchment
                     placeholder:text-parchment/35
                     focus:border-parchment/60 focus:outline-none
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parchment"
        />

        {/* Honeypot. Off-screen rather than display:none so bots still see it. */}
        <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-sm bg-parchment px-5 py-3 font-[family-name:var(--font-utility)]
                     text-[0.95rem] font-medium text-ink whitespace-nowrap
                     transition-opacity hover:opacity-85 disabled:opacity-55
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-parchment"
        >
          {state === "sending" ? signup.buttonBusy : signup.buttonIdle}
        </button>
      </div>

      <p
        className="mt-3 font-[family-name:var(--font-utility)] text-[0.78rem] text-parchment/45"
        role={state === "error" ? "alert" : undefined}
      >
        {state === "error" ? message : signup.fineprint}
      </p>
    </form>
  );
}
