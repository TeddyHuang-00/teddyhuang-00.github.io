import type { CollectionEntry } from "astro:content";
import satori from "satori";
import type { SITE } from "@/config";
import { useTranslations } from "@/i18n/utils";
import loadCustomFonts from "../loadCustomFont";
import { seedRng } from "../randomNumber";

export const width = 1200;
export const height = 630;
export const mosaicSize = 15; // Size of each mosaic tile

export const generateMosaic = (string: string) => {
  const random = seedRng(string);
  const sample = () => (
    <span
      style={{
        width: `${mosaicSize}pt`,
        height: `${mosaicSize}pt`,
        padding: `${Math.floor(random() * 5) + 1}px`,
      }}
    >
      <span
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "2pt",
          background: `hsl(${Math.floor(random() * 90) + 150}, 100%, ${Math.floor(random() * 50) + 10}%)`,
        }}
      />
    </span>
  );
  const row = () => (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {Array.from({ length: width / mosaicSize }, sample)}
    </div>
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
      }}
    >
      {Array.from({ length: height / mosaicSize }, row)}
    </div>
  );
};

export default async (post: CollectionEntry<"blog">) => {
  const localeString = useTranslations(
    post.data.locale as keyof typeof SITE.locales
  );
  const siteTitle = localeString("site.title");
  return satori(
    <div
      style={{
        display: "flex",
        background: "#0e0b0b",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {generateMosaic(post.data.title + post.data.author + siteTitle)}

      <div
        style={{
          display: "flex",
          background: "rgba(0, 0, 0, 0.9)",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
          justifyContent: "center",
          margin: "2rem",
          width: "88%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px",
            width: "90%",
            height: "90%",
            color: "white",
            fontFamily: "Maple Mono",
          }}
        >
          <p
            style={{
              flex: "auto",
              fontSize: 72,
              fontWeight: "bold",
              maxHeight: "84%",
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {post.data.title}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: "8px",
              fontSize: 28,
            }}
          >
            <span>
              by <span style={{ color: "transparent" }}>"</span>
              <span style={{ fontStyle: "italic" }}>{post.data.author}</span>
            </span>
            <span style={{ fontWeight: "bold" }}>{siteTitle}</span>
          </div>
        </div>
      </div>
    </div>,
    {
      width,
      height,
      embedFont: true,
      fonts: loadCustomFonts(),
    }
  );
};
