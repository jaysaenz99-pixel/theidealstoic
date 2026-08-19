import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Christ the Ideal Stoic — Jay Saenz, MD";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#0e1826";
const IVORY = "#f7f4ec";
const GOLD = "#c3a45e";
const STONE = "#a9a293";

/**
 * Google serves TrueType rather than woff2 to older user agents, and Satori
 * can only use the former. If anything here fails we fall back to the default
 * face rather than failing the build.
 */
async function serif(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500",
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } },
    ).then((r) => r.text());

    const url = css.match(/src:\s*url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) return null;

    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const [cover, font] = await Promise.all([
    readFile(path.join(process.cwd(), "public/assets/book-cover.jpg")),
    serif(),
  ]);

  const coverSrc = `data:image/jpeg;base64,${cover.toString("base64")}`;
  const family = font ? "Cormorant Garamond" : "serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: NAVY,
          padding: "0 84px",
          gap: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Forthcoming · September 29, 2026
          </div>

          <div
            style={{
              width: 64,
              height: 2,
              background: GOLD,
              margin: "34px 0",
            }}
          />

          <div
            style={{
              fontFamily: family,
              fontSize: 88,
              lineHeight: 1,
              color: IVORY,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Christ</span>
            <span>the Ideal Stoic</span>
          </div>

          <div
            style={{
              fontFamily: family,
              fontSize: 34,
              lineHeight: 1.3,
              color: GOLD,
              marginTop: 34,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Stoicism gives us a vision.</span>
            <span>Christ gives us a face.</span>
          </div>

          <div
            style={{
              fontSize: 20,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: STONE,
              marginTop: 44,
            }}
          >
            Jay Saenz, MD
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverSrc}
          alt=""
          width={344}
          height={500}
          style={{
            objectFit: "cover",
            borderRadius: 4,
            boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Cormorant Garamond", data: font, style: "normal", weight: 500 }]
        : [],
    },
  );
}
