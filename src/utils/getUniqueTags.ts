import type { CollectionEntry } from "astro:content";

import postFilter from "./postFilter";
import { slugifyStr } from "./slugify";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
  const tags: Tag[] = posts
    .filter((post) => postFilter(post))
    .flatMap((post) => post.data.tags)
    .map((tag) => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter((value, index, self) => self.findIndex((tag) => tag.tag === value.tag) === index)
    .toSorted((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

export default getUniqueTags;
