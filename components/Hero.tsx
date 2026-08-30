import BookMockup from "./BookMockup";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__grid">
        <div>
          <p className="eyebrow" data-reveal>
            Forthcoming
          </p>

          <h1
            className="hero__title"
            data-reveal
            style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
          >
            Christ
            <br />
            the Ideal Stoic
          </h1>

          <p
            className="hero__tagline"
            data-reveal
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            Stoicism gives us a vision.
            <br />
            Christ gives us a face.
          </p>

          <p
            className="hero__author"
            data-reveal
            style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
          >
            Jay Saenz, MD
            <span className="hero__credential">
              Orthopedic surgeon
            </span>
          </p>

          <div
            className="hero__actions"
            data-reveal
            style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
          >
            <a href="#notify" className="btn">
              Read the introduction
            </a>
            <a href="#argument" className="link-quiet">
              Read the argument &darr;
            </a>
          </div>
        </div>

        <BookMockup />
      </div>
    </section>
  );
}
