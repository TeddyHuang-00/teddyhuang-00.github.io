import type { CollectionEntry } from "astro:content";
import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
import { Resvg } from "@resvg/resvg-js";
import type { SITE } from "@/config";
import { useTranslations } from "@/i18n/utils";
import {
  getPostOgCacheKey,
  getSiteOgCacheKey,
  withOgImageCache,
} from "./og-templates/ogImageCache";
import postTemplate from "./og-templates/post.typ?raw";
import siteTemplate from "./og-templates/site.typ?raw";

const svgBufferToPngBuffer = (svg: string) => {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
};

export const generateOgImageForPost = async (post: CollectionEntry<"blog">) => {
  const cacheKey = await getPostOgCacheKey(post);

  return withOgImageCache(cacheKey, async () => {
    const compiler = NodeCompiler.create({
      workspace: ".",
      fontArgs: [{ fontPaths: [".cache/fonts"] }],
    });
    const localeString = useTranslations(
      post.data.locale as keyof typeof SITE.locales
    );
    const svg = compiler.svg({
      mainFileContent: postTemplate,
      inputs: {
        title: post.data.title,
        author: post.data.author,
        site: localeString("site.title"),
      },
    });
    return svgBufferToPngBuffer(svg);
  });
};

export const generateOgImageForSite = async () => {
  const cacheKey = await getSiteOgCacheKey();

  return withOgImageCache(cacheKey, async () => {
    const compiler = NodeCompiler.create({
      workspace: ".",
      fontArgs: [{ fontPaths: [".cache/fonts"] }],
    });
    const svg = compiler.svg({
      mainFileContent: siteTemplate,
    });
    return svgBufferToPngBuffer(svg);
  });
};
