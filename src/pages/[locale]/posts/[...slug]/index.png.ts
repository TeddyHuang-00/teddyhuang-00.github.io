import type { APIRoute } from "astro";
import { type CollectionEntry, getCollection } from "astro:content";

import { SITE } from "@/config";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { getPath } from "@/utils/getPath";

export const getStaticPaths = async () => {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const posts = await getCollection("blog").then((p) =>
    p.filter(({ data }) => !(data.draft ?? false) && data.ogImage === undefined)
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
    // oxlint-disable-next-line no-unsafe-type-assertion
    (await generateOgImageForPost(props as CollectionEntry<"blog">)).buffer as ArrayBuffer,
    {
      headers: { "Content-Type": "image/png" },
    }
  );
};
