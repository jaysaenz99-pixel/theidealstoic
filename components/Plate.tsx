"use client";

import NextImage from "next/image";
import { Image as IKImage } from "@imagekit/next";

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

type PlateProps = {
  /** Path inside the ImageKit media library, e.g. "/book-cover.jpg". */
  path: string;
  /** File in /public used until ImageKit is connected, e.g. "/book-cover.jpg". */
  local: string;
  width: number;
  height: number;
  alt: string;
  /** Rendered width on a large screen, in px. Drives the ImageKit transform. */
  displayWidth: number;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * An image plate.
 *
 * Serves through ImageKit once NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is set and the
 * file has been uploaded; until then it serves the copy in /public through
 * Next's own optimiser. Both paths are real images, so the page never shows a
 * placeholder to a visitor.
 */
export function Plate({
  path,
  local,
  width,
  height,
  alt,
  displayWidth,
  sizes,
  priority = false,
  className = "",
}: PlateProps) {
  const shared = { alt, width, height, sizes, priority, className };

  if (urlEndpoint && path) {
    return (
      <IKImage
        urlEndpoint={urlEndpoint}
        src={path}
        transformation={[{ width: displayWidth * 2, quality: 82 }]}
        {...shared}
      />
    );
  }

  return <NextImage src={local} {...shared} />;
}
