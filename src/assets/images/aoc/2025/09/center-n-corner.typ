#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#let example = ((7, 1), (11, 1), (11, 7), (9, 7), (9, 6), (5, 6), (5, 7), (2, 7), (2, 3), (7, 3))
#let corners = ((2, 3), (2, 7), (11, 7), (11, 3))

#cetz.canvas({
  import cetz.draw: *

  set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

  // grid(
  //   (1, 0),
  //   (12, 8),
  //   stroke: (paint: palette.overlay0),
  // )
  line(..example, close: true, fill: palette.text.transparentize(70%), stroke: 3pt)
  example.map(pos => circle(pos, radius: 0.15, fill: palette.text, stroke: none)).flatten()

  rect(..corners.chunks(2).map(((v, _)) => v), fill: palette.red.transparentize(30%), stroke: (
    paint: palette.red,
    thickness: 3pt,
  ))
  intersections("i", {
    line(..corners.chunks(2).map(((v, _)) => v), stroke: (dash: "dashed"))
    line(..corners.chunks(2).map(((_, v)) => v), stroke: (dash: "dashed"))
  })
  circle("i.0", radius: 0.2, fill: palette.green, stroke: none)
  corners.map(pos => circle(pos, radius: 0.2, fill: palette.green, stroke: none)).flatten()
})
