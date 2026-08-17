"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "done" | "error";

export default function ReleaseSignup() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot. Bots fill it in; people never see it.
    if (data.get("company")) {
      setStatus("done");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email") }),
      });

      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(
          body.error ??
            "Something went wrong on our end. Please try again in a moment.",
        );
        return;
      }

      setStatus("done");
    } catch {
      setStatus("error");
      setMessage(
        "We could not reach the server. Please check your connection and try again.",
      );
    }
  }

  return (
    <section id="notify" className="signup">
      <div className="grain grain--section" aria-hidden="true" />
      <div className="container signup__inner">
        <p className="label label--on-dark" data-reveal>
          Before September 15
        </p>

        <h2
          className="signup__title"
          data-reveal
          style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
        >
          Read a chapter now.
        </h2>

        <p
          className="signup__lede"
          data-reveal
          style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
        >
          Leave your address and a chapter comes straight to your inbox &mdash;
          along with word when the book is published on September 15, and now
          and then afterwards.
        </p>

        <div aria-live="polite">
          {status === "done" ? (
            <p className="signup__thanks">
              Thank you &mdash; the chapter is on its way to your inbox.
            </p>
          ) : (
            <>
              <form
                className="signup__form"
                onSubmit={onSubmit}
                data-reveal
                style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
              >
                <label className="visually-hidden" htmlFor="email">
                  Email address
                </label>
                <input
                  className="signup__input"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="your@email.com"
                  disabled={status === "submitting"}
                />

                <div className="honeypot" aria-hidden="true">
                  <label>
                    Leave this field empty
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <button
                  className="btn btn--solid"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Send it to me →"}
                </button>
              </form>

              {status === "error" && (
                <p className="signup__error" role="alert">
                  {message}
                </p>
              )}

              <p
                className="signup__note"
                data-reveal
                style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
              >
                Unsubscribe in a click. Your address is never sold or passed to
                anyone else.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
