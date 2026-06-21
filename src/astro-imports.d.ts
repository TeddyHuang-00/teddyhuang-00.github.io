// Add this declaration so that tsgolint can parse *.astro modules.
declare module "*.astro" {
  import type { AstroComponentFactory } from "astro";
  const component: AstroComponentFactory;
  export default component;
}
