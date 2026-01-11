#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#cetz.canvas({
  import cetz.draw: *

  set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

  rect((0, 0), (6, 6), stroke: none, fill: gradient.conic(
    palette.green.transparentize(30%),
    palette.green.transparentize(30%),
    palette.text.transparentize(70%),
    palette.red.transparentize(30%),
    palette.red.transparentize(30%),
    center: (50%, 50%),
  ))
  rect((0, 0), (6, 6), stroke: 3pt)
  line((-2, 3), (3, 3), stroke: (dash: (1pt, 6pt), thickness: 3pt))
})
