import Image from "next/image";
import portrait from "@/public/assets/author-portrait.jpg";

export default function AuthorSection() {
  return (
    <section id="author" className="section">
      <div className="container container--wide author__grid">
        <figure className="author__figure" data-reveal>
          <div className="author__frame">
            <Image
              className="author__portrait"
              src={portrait}
              alt="Jay Saenz, MD, author of Christ the Ideal Stoic"
              sizes="(max-width: 820px) 100vw, 40vw"
              placeholder="blur"
            />
          </div>
          <hr className="rule" />
          <figcaption className="author__caption">
            Jay Saenz, MD &middot; Memphis, Tennessee
          </figcaption>
        </figure>

        <div>
          <p className="label" data-reveal>
            III &middot; The Author
          </p>
          <h2 className="author__name" data-reveal>
            Jay Saenz, MD
          </h2>

          <div className="prose">
            <p data-reveal>
              Jay Saenz is a practicing orthopedic surgeon in Memphis,
              Tennessee, and an entrepreneur. He is fifty-three, has been
              married for thirty years, and is the father of three.
            </p>
            <p data-reveal>
              Alongside his practice he has spent years reading in philosophy
              and theology, with a long attachment to the Stoics.{" "}
              <em>Christ the Ideal Stoic</em> grew out of that reading &mdash;
              and out of{" "}
              <span className="author__settled">
                the places where its questions get settled rather than argued:{" "}
                <em>
                  an operating room, a business, a marriage, three children.
                </em>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
