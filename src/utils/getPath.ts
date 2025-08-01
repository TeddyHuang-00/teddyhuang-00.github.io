import { BLOG_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";

/**
 * Get full path of a blog post
 * @param translationId - i18n normalized id of the blog post (aka slug)
 * @param filePath - the blog post full file location
 * @param includeBase - whether to include `/posts` in return value
 * @returns blog post path
 */
export const getPath = (
  translationId: string,
  filePath: string | undefined,
  includeBase = true
) => {
  const pathSegments = filePath
    ?.replace(BLOG_PATH, "")
    .split("/")
    .filter((path) => path !== "") // remove empty string in the segments ["", "other-path"] <- empty string will be removed
    .filter((path) => !path.startsWith("_")) // exclude directories start with underscore "_"
    .slice(0, -1) // remove the last segment _file name_ since it's unnecessary
    .map((segment) => slugifyStr(segment)); // slugify each segment path

  const basePath = includeBase ? "/posts" : "";

  // Making sure `id` does not contain the directory
  const blogId = translationId.split("/");
  const slug = (blogId.length > 1 ? blogId.slice(-1) : blogId).map(
    // Remove the file extension if exists
    (segment) => segment.replace(/\.(md|mdx)$/, "")
  );

  // If not inside the sub-dir, simply return the file path
  if (!pathSegments || pathSegments.length < 1) {
    return [basePath, slug].join("/");
  }

  return [basePath, ...pathSegments, slug].join("/");
};
