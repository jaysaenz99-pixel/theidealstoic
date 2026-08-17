export default function BookThesis() {
  return (
    <section id="argument" className="thesis">
      <div className="grain grain--section" aria-hidden="true" />
      <div className="container container--narrow thesis__inner">
        <p className="label label--on-dark" data-reveal>
          The Central Claim
        </p>

        <p
          className="thesis__lede"
          data-reveal
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        >
          The Stoics taught that wisdom, courage, temperance, and justice could
          anchor the soul through any storm &mdash; yet they were describing an
          ideal they could never fully embody.
        </p>

        <p
          className="thesis__claim"
          data-reveal
          style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
        >
          What Marcus Aurelius, Seneca, and Epictetus described in fragments,{" "}
          <em>Christ embodied completely.</em>
        </p>
      </div>
    </section>
  );
}
