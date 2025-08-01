import { type CollectionEntry, getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { SITE } from "@/config";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { getPath } from "@/utils/getPath";

export const getStaticPaths = async () => {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const posts = await getCollection("blog").then((p) =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map((post) => ({
    params: {
      slug: getPath(post.data.translationId, post.filePath, false),
      locale: post.data.locale,
    },
    props: post,
  }));
};

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(
    await generateOgImageForPost(props as CollectionEntry<"blog">),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
};
