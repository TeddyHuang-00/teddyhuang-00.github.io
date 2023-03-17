/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // You will need to specify the path to .vuepress
    // because it is a hidden directory
    "./src/.vuepress/**/*.{vue,ts,js,jsx,tsx,md,html}",
    "./src/**/*.{vue,ts,js,jsx,tsx,md,html}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
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
    },
  },
  plugins: [],
};
