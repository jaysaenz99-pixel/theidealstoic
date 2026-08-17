import Image from "next/image";
import chiRho from "@/public/assets/chi-rho.png";

/** The book's actual chapters, in order, from the interior proof. */
const CHAPTERS = [
  "The Stoic Ideal of the Wise Man",
  "The Work of Growth",
  "Wisdom & the Work of Judgment",
  "Temperance",
  "The Discipline of Courage",
  "Emotional Equilibrium & Inner Peace",
  "The Work of Humility",
  "The Paradox of Joy",
  "The Highest & Hardest Calling",
];

export default function VirtuesIndex() {
  return (
    <section className="section virtues">
      <div className="container">
        <div className="virtues__head" data-reveal>
          <Image
            className="virtues__mark"
            src={chiRho}
            alt=""
            aria-hidden="true"
            width={58}
            height={58}
          />
          <p className="label">II &middot; Contents</p>
          <h2 className="virtues__title">The virtues, embodied.</h2>
          <p className="virtues__lede">
            Nine chapters examine the virtues the Stoics most revered, and show
            how they find their clearest and highest expression in Christ.
          </p>
        </div>

        <ol className="virtues__list">
          {CHAPTERS.map((chapter, index) => (
            <li className="virtue" key={chapter}>
              <span className="virtue__n" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="virtue__name">{chapter}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
