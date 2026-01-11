#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#let example = ((0, 0), (5, 0), (5, 3), (3, 3), (3, 2), (2, 2), (2, 3), (0, 3))

#grid(
  columns: 3,
  column-gutter: 1em,
  cetz.canvas({
    import cetz.draw: *

    set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

    line(..example, close: true, fill: palette.text.transparentize(70%), stroke: 3pt)
    example.map(pos => circle(pos, radius: 0.15, fill: palette.text, stroke: none)).flatten()

    let valid = ((0, 0), (3, 2))
    rect(..valid, stroke: (paint: palette.green, thickness: 3pt), fill: palette.green.transparentize(30%))
    valid.map(pos => circle(pos, radius: 0.2, fill: palette.green, stroke: none)).flatten()
  }),
  cetz.canvas({
    import cetz.draw: *

    set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

    line(..example, close: true, fill: palette.text.transparentize(70%), stroke: 3pt)
    example.map(pos => circle(pos, radius: 0.15, fill: palette.text, stroke: none)).flatten()

    let invalid = ((0, 0), (5, 3))
    rect(..invalid, stroke: (paint: palette.red, thickness: 3pt), fill: palette.red.transparentize(30%))
    invalid.map(pos => circle(pos, radius: 0.2, fill: palette.red, stroke: none)).flatten()
  }),
  cetz.canvas({
    import cetz.draw: *

    set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

    line(..example, close: true, fill: palette.text.transparentize(70%), stroke: 3pt)
    example.map(pos => circle(pos, radius: 0.15, fill: palette.text, stroke: none)).flatten()

    let invalid = ((2, 2), (3, 3))
    rect(..invalid, stroke: (paint: palette.red, thickness: 3pt), fill: palette.red.transparentize(30%))
    invalid.map(pos => circle(pos, radius: 0.2, fill: palette.red, stroke: none)).flatten()
  }),
)

