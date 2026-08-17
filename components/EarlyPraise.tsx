/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ▲ THESE QUOTES ARE NOT REAL. DO NOT PUBLISH THIS SECTION AS IT STANDS.
 *
 *  They are the placeholder lines from the project brief, kept here so the
 *  section can be built and reviewed. Invented praise attributed to readers
 *  who never said it is a fabricated endorsement, whatever the intention, so
 *  the section is deliberately left out of app/page.tsx until real blurbs
 *  arrive.
 *
 *  To go live: replace all three quotes AND their sources with what real
 *  readers actually wrote, then add <EarlyPraise /> to app/page.tsx between
 *  <AuthorSection /> and <ReleaseSignup />.
 *
 *  A source needs a name. "Advance reader" alone is not attribution — it is
 *  an unverifiable claim wearing the costume of one.
 * ─────────────────────────────────────────────────────────────────────────────
 */

type Blurb = {
  quote: string;
  /** Name, and the thing that makes the name worth reading. */
  source: string;
};

const BLURBS: Blurb[] = [
  {
    quote: "A rare book that honors the Stoics even as it moves beyond them.",
    source: "Placeholder — replace with a real name",
  },
  {
    quote:
      "Saenz writes with the steadiness of a surgeon and the warmth of a believer.",
    source: "Placeholder — replace with a real name",
  },
  {
    quote: "It gave me a new way to see a life I thought I already knew.",
    source: "Placeholder — replace with a real name",
  },
];

export default function EarlyPraise() {
  return (
    <section className="section praise">
      <div className="grain grain--section" aria-hidden="true" />
      <div className="container">
        <div className="praise__head" data-reveal>
          <p className="label">Early Praise</p>
          <h2 className="praise__title">What readers are saying.</h2>
        </div>

        <div className="praise__grid">
          {BLURBS.map((blurb, index) => (
            <figure
              className="praise__item"
              key={blurb.quote}
              data-reveal
              style={
                { "--reveal-delay": `${index * 90}ms` } as React.CSSProperties
              }
            >
              <blockquote className="praise__quote">{blurb.quote}</blockquote>
              <figcaption className="praise__source">{blurb.source}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
