export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__rule" aria-hidden="true" />
        <div className="site-footer__row">
          <div>
            <p className="site-footer__title">Christ the Ideal Stoic</p>
            <p className="site-footer__author">Jay Saenz, MD</p>
            <p className="site-footer__imprint">
              Groundmark Press &middot; Memphis, Tennessee
            </p>
          </div>
          <div className="site-footer__meta">
            <a className="site-footer__link" href="https://theidealstoic.com">
              theidealstoic.com
            </a>
            <p className="site-footer__copy">&copy; 2026</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
