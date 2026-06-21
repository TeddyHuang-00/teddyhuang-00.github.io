import type { APIRoute } from "astro";

import { generateOgImageForSite } from "@/utils/generateOgImages";

export const GET: APIRoute = async () =>
  // oxlint-disable-next-line no-unsafe-type-assertion
  new Response((await generateOgImageForSite()).buffer as ArrayBuffer, {
    headers: { "Content-Type": "image/png" },
  });
