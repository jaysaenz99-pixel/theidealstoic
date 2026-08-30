"use client";

import { useEffect, useRef } from "react";

const LINKS = [
  { href: "#book", label: "The Book" },
  { href: "#argument", label: "The Argument" },
  { href: "#author", label: "Meet the Author" },
];

export default function SiteHeader() {
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        header.current?.setAttribute(
          "data-scrolled",
          String(window.scrollY > 40),
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header ref={header} className="site-header">
      <nav className="container site-header__nav" aria-label="Primary">
        <a href="#top" className="wordmark">
          The Ideal Stoic
        </a>
        <div className="site-header__right">
          <div className="site-header__links">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="navlink">
                {link.label}
              </a>
            ))}
          </div>
          <a href="#notify" className="btn btn--sm">
            Read the Introduction
          </a>
        </div>
      </nav>
    </header>
  );
}
