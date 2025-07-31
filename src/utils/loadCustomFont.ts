import { readFileSync } from "node:fs";
import { join } from "node:path";

const fontCacheDir = join(process.cwd(), ".cache", "fonts");

async function loadCustomFont(fontPath: string): Promise<ArrayBuffer> {
  try {
    const fontBuffer = readFileSync(join(fontCacheDir, fontPath));
    return fontBuffer.buffer.slice(0) as ArrayBuffer;
  } catch (error) {
    throw new Error(`Failed to load custom font at ${fontPath}: ${error}`);
  }
}

async function loadCustomFonts(): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
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

  const fonts = await Promise.all(
    fontsConfig.map(async ({ name, path, weight, style }) => {
      const data = await loadCustomFont(path);
      return { name, data, weight, style };
    })
  );

  return fonts;
}

export default loadCustomFonts;
