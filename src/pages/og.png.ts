import type { APIRoute } from "astro";
import { generateOgImageForSite } from "@/utils/generateOgImages";

export const GET: APIRoute = async () =>
  new Response((await generateOgImageForSite()).buffer as ArrayBuffer, {
    headers: { "Content-Type": "image/png" },
  });
