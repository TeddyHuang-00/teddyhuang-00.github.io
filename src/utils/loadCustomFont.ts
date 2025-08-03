import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Font } from "satori";

const fontCacheDir = join(process.cwd(), ".cache", "fonts");

const loadCustomFont = (fontPath: string): ArrayBuffer => {
  try {
    const fontBuffer = readFileSync(join(fontCacheDir, fontPath));
    return fontBuffer.buffer.slice(0) as ArrayBuffer;
  } catch (error) {
    throw new Error(`Failed to load custom font at ${fontPath}: ${error}`);
  }
};

const loadCustomFonts = (): Array<Font> => {
  const fontsConfig = [
    {
      name: "Maple Mono",
      path: "MapleMono-NF-CN-Regular.ttf",
      weight: 400,
      style: "normal",
    },
    {
      name: "Maple Mono",
      path: "MapleMono-NF-CN-Bold.ttf",
      weight: 700,
      style: "bold",
    },
    {
      name: "Maple Mono",
      path: "MapleMono-NF-CN-Italic.ttf",
      weight: 400,
      style: "italic",
    },
  ];

  const fonts = fontsConfig.map(({ name, path, weight, style }) => {
    const data = loadCustomFont(path);
    return { name, data, weight, style } as Font;
  });

  return fonts;
};

export const getFontVersion = (): string => {
  try {
    const configPath = join(fontCacheDir, "config.json");
    const config = JSON.parse(readFileSync(configPath, "utf-8"));
    const family = config.family_name || "Maple Mono";
    const version = config.version || "unknown";
    return `${family} ${version}`;
  } catch (error) {
    throw new Error(`Failed to read font config: ${error}`);
  }
};

export default loadCustomFonts;
