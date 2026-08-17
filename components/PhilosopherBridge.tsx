import Image from "next/image";
import chiRho from "@/public/assets/chi-rho.png";

/**
 * "The Turn" — the three reversals from the book's Conclusion, verbatim.
 * Every line here is Jay's own text.
 */
const REVERSALS = [
  {
    from: "The Stoics tell us to become strong.",
    to: "Christ tells us, first, to become humble.",
  },
  {
    from: "They tell us to hold ourselves with dignity.",
    to: "Christ kneels to wash feet.",
  },
  {
    from: "They tell us to rise above the suffering.",
    to: "Christ enters it, and redeems it.",
  },
];

export default function PhilosopherBridge() {
  return (
    <section className="section section--dark turn">
      <Image
        className="bridge__watermark"
        src={chiRho}
        alt=""
        aria-hidden="true"
        sizes="(max-width: 720px) 120vw, 720px"
      />

      <div className="container turn__inner">
        <p className="label label--on-dark" data-reveal>
          The Turn
        </p>

        <p
          className="turn__lede"
          data-reveal
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        >
          The sage was more often described than encountered.
        </p>

        <div className="turn__list">
          {REVERSALS.map((pair, index) => (
            <div
              className="turn__pair"
              key={pair.to}
              data-reveal
              style={
                { "--reveal-delay": `${index * 90}ms` } as React.CSSProperties
              }
            >
              <p className="turn__from">{pair.from}</p>
              <p className="turn__to">{pair.to}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
