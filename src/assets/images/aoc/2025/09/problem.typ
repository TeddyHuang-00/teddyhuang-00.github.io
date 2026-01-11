#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#let example = ((7, 1), (11, 1), (11, 7), (9, 7), (9, 6), (5, 6), (5, 7), (2, 7), (2, 3), (7, 3))
#let valid = ((2, 3), (5, 7))
#let invalid = ((7, 1), (11, 7))

#grid(
  columns: 2,
  column-gutter: 1em,
  cetz.canvas({
    import cetz.draw: *

    set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

    grid(
      (1, 0),
      (12, 8),
      stroke: (paint: palette.overlay0),
    )
    line(..example, close: true, fill: palette.text.transparentize(70%), stroke: 3pt)
    example.map(pos => circle(pos, radius: 0.2, fill: palette.blue, stroke: none)).flatten()
  }),
  cetz.canvas({
    import cetz.draw: *

    set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

    grid(
      (1, 0),
      (12, 8),
      stroke: (paint: palette.overlay0),
    )
    line(..example, close: true, fill: palette.text.transparentize(70%), stroke: 3pt)
    example.map(pos => circle(pos, radius: 0.15, fill: palette.text, stroke: none)).flatten()

    rect(..valid, fill: palette.green.transparentize(30%), stroke: (paint: palette.green, thickness: 3pt))
    valid.map(pos => circle(pos, radius: 0.2, fill: palette.green, stroke: none)).flatten()

    rect(..invalid, fill: palette.red.transparentize(30%), stroke: (paint: palette.red, thickness: 3pt))
    invalid.map(pos => circle(pos, radius: 0.2, fill: palette.red, stroke: none)).flatten()
  }),
)
