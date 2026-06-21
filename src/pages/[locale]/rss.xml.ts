import rss from "@astrojs/rss";
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";

import { SITE } from "@/config";
import { getTranslations } from "@/i18n/utils";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";

export const getStaticPaths = (() => {
  return Object.keys(SITE.locales).map((lang) => ({
    params: { locale: lang },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const locale = params.locale ?? SITE.defaultLocale;
  const localeString = getTranslations(locale);

  const posts = await getCollection("blog", ({ data }) => data.locale === locale);
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: localeString("site.title"),
    description: localeString("site.description"),
    site: SITE.website,
    items: sortedPosts.map(({ data, filePath }) => ({
      link: getPath(data.translationId, filePath),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
};
