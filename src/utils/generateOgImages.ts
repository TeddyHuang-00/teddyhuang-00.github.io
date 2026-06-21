import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
import type { CollectionEntry } from "astro:content";
import sharp from "sharp";

import { getTranslations } from "@/i18n/utils";

import {
  getPostOgCacheKey,
  getSiteOgCacheKey,
  withOgImageCache,
} from "./og-templates/ogImageCache";
import postTemplate from "./og-templates/post.typ?raw";
import siteTemplate from "./og-templates/site.typ?raw";

const showText = false;

const compiler = NodeCompiler.create({
  workspace: ".",
  fontArgs: showText ? [{ fontPaths: [".cache/fonts"] }] : undefined,
});

const svgToPngBuffer = (svg: string) => {
  const ppi = 72;
  return sharp(Buffer.from(svg), { density: ppi })
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer();
};

export const generateOgImageForPost = (post: CollectionEntry<"blog">) => {
  const cacheKey = getPostOgCacheKey(post, showText);

  return withOgImageCache(cacheKey, () => {
    const localeString = getTranslations(post.data.locale);
    const svg = compiler.plainSvg({
      mainFileContent: postTemplate,
      inputs: {
        title: post.data.title,
        author: post.data.author,
        site: localeString("site.title"),
        "show-text": String(showText),
      },
    });
    return svgToPngBuffer(svg);
  });
};

export const generateOgImageForSite = () => {
  const cacheKey = getSiteOgCacheKey(showText);

  return withOgImageCache(cacheKey, () => {
    const svg = compiler.plainSvg({ mainFileContent: siteTemplate });
    return svgToPngBuffer(svg);
  });
};
