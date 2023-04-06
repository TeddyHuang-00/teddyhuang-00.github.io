/** @type {import('tailwindcss').Config} */
export const content = [
  // You will need to specify the path to .vuepress
  // because it is a hidden directory
  "./src/.vuepress/**/*.{vue,ts,js,jsx,tsx,md,html}",
  "./src/**/*.{vue,ts,js,jsx,tsx,md,html}",
];
export const corePlugins = {
  preflight: false,
};
export const theme = {
  extend: {
    colors: {
      // These colors are set to use the palette
      // from the hope theme
      "theme-color": "var(--theme-color)",
      "bg-primary": "var(--bg-color)",
      "bg-secondary": "var(--bg-color-secondary)",
      "bg-tertiary": "var(--bg-color-tertiary)",
      "border-color": "var(--border-color)",
      "box-shadow": "var(--box-shadow)",
      "text-color": "var(--text-color)",
      "card-shadow": "var(--card-shadow)",
    },
    screens: {
      // Overwrite some breakpoint to align
      // with the hope theme
      sm: "720px",
      lg: "960px",
      xl: "1440px",
    },
  },
};
export const plugins = [];
