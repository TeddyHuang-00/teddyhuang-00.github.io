import type { CollectionEntry } from "astro:content";
import { Resvg } from "@resvg/resvg-js";
import {
  getPostOgCacheKey,
  getSiteOgCacheKey,
  withOgImageCache,
} from "./og-templates/ogImageCache";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

const svgBufferToPngBuffer = (svg: string) => {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
};

export const generateOgImageForPost = async (post: CollectionEntry<"blog">) => {
  const cacheKey = await getPostOgCacheKey(post);

  return withOgImageCache(cacheKey, async () => {
    const svg = await postOgImage(post);
    return svgBufferToPngBuffer(svg);
  });
};

export const generateOgImageForSite = async () => {
  const cacheKey = await getSiteOgCacheKey();

  return withOgImageCache(cacheKey, async () => {
    const svg = await siteOgImage();
    return svgBufferToPngBuffer(svg);
  });
};
