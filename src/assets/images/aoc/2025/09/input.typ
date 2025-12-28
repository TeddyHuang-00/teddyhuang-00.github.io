#import "../../../config.typ": *
#import "@preview/cetz:0.4.2"

#show: typst-image
#let palette = get-theme-palette()

#let width = 0.5 / 2

#cetz.canvas({
  import cetz.draw: *

  set-style(stroke: (paint: palette.foreground, cap: "round", join: "round"))

  merge-path(fill: palette.foreground.transparentize(50%), stroke: 3pt, {
    line((0, -width), (9, -width), (9, width), (0, width), close: false)
    arc-through((0, width), (10, 0), (0, -width))
  })
})
