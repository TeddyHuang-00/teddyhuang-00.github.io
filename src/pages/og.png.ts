import type { APIRoute } from "astro";

import { generateOgImageForSite } from "@/utils/generateOgImages";

export const GET: APIRoute = async () => {
  const png = await generateOgImageForSite();
  const buf = png.buffer;
  if (buf instanceof ArrayBuffer) {
    return new Response(buf, { headers: { "Content-Type": "image/png" } });
  }
  return new Response(null, { status: 500 });
};
