// Color definitions for light and dark themes.
// Use if the image needs to adapt to different themes.
#let site-colors = (
  light: (
    background: rgb("#eaedf3"),
    foreground: rgb("#000123"),
    accent: rgb("#2346f7"),
    muted: rgb("#c5cbe9"),
    border: rgb("#1f318e"),
  ),
  dark: (
    background: rgb("#000123"),
    foreground: rgb("#eaedf3"),
    accent: rgb("#617bff"),
    muted: rgb("#0c0e4f"),
    border: rgb("#303f8a"),
  ),
)

// Get the color palette based on the current theme (light or dark).
#let get-theme-palette = () => {
  let theme = sys.inputs.at("theme", default: "light")
  if not ("dark", "light").contains(theme) {
    theme = "light"
  }
  site-colors.at(theme)
}

// A style definition for typst images.
//
// MUST USE.
#let typst-image = content => {
  let palette = get-theme-palette()
  set page(width: auto, height: auto, margin: 10pt)
  set text(size: 20pt, fill: palette.foreground)

  content
}

// Limit the page width to 736pt.
//
// OPTIONAL. RECOMMENDED if the image is too wide.
#let limit-page-width = content => {
  set page(width: 736pt)
  content
}
