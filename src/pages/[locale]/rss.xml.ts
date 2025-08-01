import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIRoute, GetStaticPaths } from "astro";
import { SITE } from "@/config";
import { useTranslations } from "@/i18n/utils";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";

export const getStaticPaths = (async () => {
  return Object.keys(SITE.locales).map((lang) => ({
    params: { locale: lang as keyof typeof SITE.locales },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const locale = (params.locale || "en") as keyof typeof SITE.locales;
  const localeString = useTranslations(locale);

  const posts = await getCollection(
    "blog",
    ({ data }) => data.locale === locale
  );
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
