import { Plate } from "@/components/Plate";
import { SignupForm } from "@/components/SignupForm";
import { author, book, images, signup, site } from "@/lib/content";

/**
 * Sets the book's title in italic wherever it appears in running prose, the way
 * a printed page would. Keeps lib/content.ts free of markup.
 */
function prose(text: string) {
  const parts = text.split(book.title);
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <em key={i} className="quiet-italic">
            {book.title}
          </em>,
          part,
        ],
  );
}

export default function Home() {
  return (
    <>
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
          <span className="eyebrow text-ink">{site.name}</span>
          <a
            href="#notify"
            className="eyebrow text-ink-soft underline decoration-gilt/60 underline-offset-4 transition-colors hover:text-rubric"
          >
            Hear when it&rsquo;s out
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/*
          The hero is set as a title page facing a frontispiece — the arrangement
          a reader meets on opening the book. Title, rule and byline on the
          recto; the cover and the author's portrait on the verso.

          The three blocks are placed explicitly on the grid so the order can
          differ by screen: side by side on a desktop, but on a phone the cover
          comes directly after the title, ahead of the summary, so the book is
          the first thing seen rather than the first thing scrolled past.
        */}
        <section className="mx-auto max-w-6xl px-6 pt-14 pb-20 lg:px-10 lg:pt-24 lg:pb-28">
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10">
            <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:pt-6">
              <p className="eyebrow settle" style={{ animationDelay: "60ms" }}>
                {book.status}
              </p>

              <h1
                className="display settle mt-6 text-[clamp(2.9rem,8.5vw,5.5rem)]"
                style={{ animationDelay: "140ms" }}
              >
                {book.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              {book.subtitle && (
                <p
                  className="quiet-italic settle mt-6 text-[clamp(1.15rem,2.3vw,1.45rem)] text-ink-soft"
                  style={{ animationDelay: "200ms" }}
                >
                  {book.subtitle}
                </p>
              )}

              <div
                className="settle mt-8 flex items-center gap-5"
                style={{ animationDelay: "260ms" }}
              >
                <hr className="rule w-16 shrink-0" />
                <p className="eyebrow text-ink-soft">{author.name}</p>
              </div>

            </div>

            <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
              <figure
                className="settle max-w-[21rem] lg:max-w-none"
                style={{ animationDelay: "220ms" }}
              >
                <Plate
                  path={images.cover.path}
                  local={images.cover.local}
                  width={images.cover.width}
                  height={images.cover.height}
                  alt={images.cover.alt}
                  displayWidth={430}
                  sizes="(min-width: 1024px) 430px, (min-width: 640px) 336px, 100vw"
                  priority
                  className="w-full shadow-[0_20px_55px_-24px_rgba(26,41,70,0.6)]"
                />

                <figcaption className="mt-7 flex items-center gap-4">
                  <Plate
                    path={images.portrait.path}
                    local={images.portrait.local}
                    width={images.portrait.width}
                    height={images.portrait.height}
                    alt={images.portrait.alt}
                    displayWidth={112}
                    sizes="112px"
                    className="w-[112px] shrink-0"
                  />
                  <span className="min-w-0">
                    <span className="block font-[family-name:var(--font-display)] text-[1.05rem] leading-tight">
                      {author.name}
                    </span>
                    {author.role && (
                      <span className="eyebrow mt-1.5 block">{author.role}</span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-7 lg:col-start-1 lg:row-start-2">
              <div
                className="settle measure space-y-5 text-[1.15rem] leading-[1.72] text-ink/90"
                style={{ animationDelay: "340ms" }}
              >
                {book.summary.map((paragraph, i) => (
                  <p key={i} className={i === 0 ? "dropcap" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {book.retailers.length > 0 && (
                <div
                  className="settle mt-9 flex flex-wrap gap-x-7 gap-y-3"
                  style={{ animationDelay: "400ms" }}
                >
                  {book.retailers.map((r) => (
                    <a
                      key={r.href}
                      href={r.href}
                      className="eyebrow text-ink underline decoration-gilt/60 underline-offset-4 transition-colors hover:text-rubric"
                    >
                      {r.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10 bg-vellum/50">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-24">
            <h2 className="eyebrow pilcrow">About the book</h2>
            <div className="measure mt-8 space-y-5 text-[1.1rem] leading-[1.75] text-ink/90">
              {book.description.map((paragraph, i) => (
                <p key={i}>{prose(paragraph)}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/10">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-24">
            <h2 className="eyebrow pilcrow">About the author</h2>
            <div className="measure mt-8 space-y-5 text-[1.1rem] leading-[1.75] text-ink/90">
              {author.bio.map((paragraph, i) => (
                <p key={i}>{prose(paragraph)}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="notify" className="scroll-mt-4 bg-ink text-parchment">
          <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-32">
            <h2 className="eyebrow pilcrow pilcrow-light text-parchment/45">
              {signup.eyebrow}
            </h2>
            <p className="display mt-7 text-[clamp(2rem,4.5vw,3.25rem)]">
              {signup.heading}
            </p>
            <p className="mt-6 max-w-lg text-[1.08rem] leading-[1.7] text-parchment/70">
              {signup.blurb}
            </p>
            <div className="mt-10">
              <SignupForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-9 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-[family-name:var(--font-utility)] text-[0.8rem] text-ink-faint">
            {book.title} — {author.name}
          </p>
          <p className="font-[family-name:var(--font-utility)] text-[0.8rem] text-ink-faint">
            {site.domain}
          </p>
        </div>
      </footer>
    </>
  );
}
