import { defineCollection, z } from "astro:content";
import { extendI18nLoaderSchema, i18nLoader } from "astro-loader-i18n";
import { SITE } from "@/config";

export const BLOG_PATH = "content/posts";
export const ABOUT_PATH = "content/about";

const blog = defineCollection({
  loader: i18nLoader({ pattern: "**/[^_]*.{md,mdx}", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    extendI18nLoaderSchema(
      z.object({
        title: z.string(),
        author: z.string().default(SITE.author),
        pubDatetime: z.date(),
        modDatetime: z.date().optional().nullable(),
        featured: z.boolean().optional(),
        draft: z.boolean().optional(),
        tags: z.array(z.string()).default(["others"]),
        ogImage: image().or(z.string()).optional(),
        description: z.string(),
        canonicalURL: z.string().optional(),
        hideEditPost: z.boolean().optional(),
        timezone: z.string().optional(),
      })
    ),
});

const about = defineCollection({
  loader: i18nLoader({ pattern: "**/[^_]*.{md,mdx}", base: `./${ABOUT_PATH}` }),
  schema: ({ image }) =>
    extendI18nLoaderSchema(
      z.object({
        title: z.string(),
        ogImage: image().or(z.string()).optional(),
      })
    ),
});

export const collections = { blog, about };
