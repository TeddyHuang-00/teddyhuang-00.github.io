import type { CollectionEntry } from "astro:content";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import * as postFunction from "./post";
import * as siteFunction from "./site";

const CACHE_DIR = ".cache/og-images";
const CACHE_VERSION = "v1";

// Ensure cache directory exists (will be called lazily)
const ensureCacheDir = async () => {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }
};

/**
 * Generate a stable hash for content-based cache invalidation
 */
const generateHash = async (
  content: Record<string, unknown>
): Promise<string> => {
  const stringifiedContent = {} as Record<string, string | number>;
  for (const key of Object.keys(content)) {
    // Stringify nested objects and functions
    if (typeof content[key] === "object" && content[key] !== null) {
      stringifiedContent[key] = JSON.stringify(content[key]);
    } else if (typeof content[key] === "function") {
      // Convert functions to their string representation
      stringifiedContent[key] = content[key].toString();
    } else if (
      typeof content[key] === "number" ||
      typeof content[key] === "string"
    ) {
      stringifiedContent[key] = content[key] as string | number;
    }
  }
  const contentString = JSON.stringify(
    stringifiedContent,
    Object.keys(stringifiedContent).sort()
  );

  return createHash("sha256").update(contentString).digest("hex").slice(0, 16);
};

/**
 * Generate cache key for site OG image
 */
export const getSiteOgCacheKey = async (): Promise<string> => {
  const siteData = {
    version: CACHE_VERSION,
    // The following fields are commented out since they are not used in the current implementation, uncomment if they are included in the future
    // title: SITE.title,
    // author: SITE.author,
    // desc: SITE.desc,
  };
  const contentHash = await generateHash(siteData);
  const functionHash = await generateHash(siteFunction);
  return `site-${contentHash}-${functionHash}`;
};

/**
 * Generate cache key for post OG image
 */
export const getPostOgCacheKey = async (
  post: CollectionEntry<"blog">
): Promise<string> => {
  const postData = {
    version: CACHE_VERSION,
    title: post.data.title,
    author: post.data.author,
    locale: post.data.locale,
    // The following fields are commented out since they are not used in the current implementation, uncomment if they are included in the future
    // pubDatetime: post.data.pubDatetime?.toISOString(),
    // modDatetime: post.data.modDatetime?.toISOString(),
    // tags: post.data.tags,
  };
  const contentHash = await generateHash(postData);
  const functionHash = await generateHash(postFunction);
  return `post-${contentHash}-${functionHash}`;
};

/**
 * Get cached OG image if it exists and is valid
 */
export const getCachedOgImage = async (
  cacheKey: string
): Promise<Buffer | null> => {
  try {
    const cacheFilePath = join(CACHE_DIR, `${cacheKey}.png`);

    if (!existsSync(cacheFilePath)) {
      return null;
    }

    console.log(`Using cache: ${cacheKey}`);
    return readFileSync(cacheFilePath);
  } catch (error) {
    console.warn(`Failed to read cache: ${cacheKey}`, error);
    return null;
  }
};

/**
 * Cache OG image buffer with content-based key
 */
export const setCachedOgImage = async (
  cacheKey: string,
  imageBuffer: Buffer
): Promise<void> => {
  try {
    await ensureCacheDir();
    const cacheFilePath = join(CACHE_DIR, `${cacheKey}.png`);
    writeFileSync(cacheFilePath, new Uint8Array(imageBuffer));
    console.log(`Cached image: ${cacheKey}`);
  } catch (error) {
    console.error(`Failed to cache image: ${cacheKey}`, error);
  }
};

/**
 * Wrapper function for cached OG image generation
 */
export const withOgImageCache = async <T>(
  cacheKey: string,
  generator: () => Promise<T>
): Promise<T> => {
  // Try to get from cache first
  const cached = await getCachedOgImage(cacheKey);
  if (cached) {
    return cached as T;
  }

  // Generate new image
  console.log(`Generating image: ${cacheKey}`);
  const result = await generator();

  // Cache the result if it's a Buffer
  if (result instanceof Buffer) {
    await setCachedOgImage(cacheKey, result);
  }

  return result;
};
