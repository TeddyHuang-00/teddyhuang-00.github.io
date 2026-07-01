import { slugifyStr } from "./slugify";

/**
 * Produce a valid CSS <custom-ident> for view-transition-name.
 * Non-ASCII chars (Chinese etc.) are hex-encoded to avoid the
 * browser ignoring the name entirely.
 */
export const toTransitionName = (str: string): string => {
  const base = slugifyStr(str.replaceAll(".", "-"));
  let result = base
    .replaceAll(/[^\u0020-\u007F]/gu, (c) => "u" + c.codePointAt(0)!.toString(16).padStart(6, "0"))
    .replaceAll(/[^a-zA-Z0-9_-]/gu, "-")
    .replaceAll(/-+/gu, "-")
    .replaceAll(/^-+|-+$/gu, "");
  if (/^\d/u.test(result)) result = "p-" + result;
  if (!result) result = "post";
  return result;
};
