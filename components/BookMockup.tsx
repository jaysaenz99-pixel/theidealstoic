"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import cover from "@/public/assets/book-cover.jpg";

const REST = "rotateY(-15deg) rotateX(2deg)";

export default function BookMockup() {
  const scene = useRef<HTMLDivElement>(null);
  const book = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sceneEl = scene.current;
    const bookEl = book.current;
    if (!sceneEl || !bookEl) return;

    // Turning the cover is a nicety for pointer users only.
    if (
      window.matchMedia("(prefers-reduced-motion:reduce)").matches ||
      !window.matchMedia("(hover:hover) and (pointer:fine)").matches
    ) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const rect = sceneEl.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      bookEl.style.transform = `rotateY(${-15 + x * -6}deg) rotateX(${2 + y * 4}deg)`;
    };

    const onLeave = () => {
      bookEl.style.transform = REST;
    };

    sceneEl.addEventListener("pointermove", onMove);
    sceneEl.addEventListener("pointerleave", onLeave);
    return () => {
      sceneEl.removeEventListener("pointermove", onMove);
      sceneEl.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="book-scene" ref={scene}>
      <div className="book" ref={book}>
        <div className="book__pages" aria-hidden="true" />
        <Image
          className="book__cover"
          src={cover}
          alt="Front cover of Christ the Ideal Stoic by Jay Saenz, MD: a Chi-Rho mosaic in gold and red on a deep navy field"
          sizes="(max-width: 900px) 72vw, 340px"
          placeholder="blur"
          priority
        />
        <div className="book__spine" aria-hidden="true" />
        <div className="book__shadow" aria-hidden="true" />
      </div>
    </div>
  );
}
