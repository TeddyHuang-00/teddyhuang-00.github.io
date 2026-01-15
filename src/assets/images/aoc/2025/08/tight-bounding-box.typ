#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#let points = (
  ((1, 3), (2, 2)),
  ((5, 3), (5, 2)),
  ((2, 5), (3, 7)),
  ((7, 6), (6, 6)),
)
#let colors = (
  palette.red,
  palette.green,
  palette.blue,
  palette.peach,
)

#grid(
  columns: 2,
  column-gutter: 2em,
  align: center + horizon,
  cetz.canvas({
    import cetz.draw: *

    set-style(stroke: (paint: palette.foreground, cap: "round", join: "round"))

    grid(
      (0, 0),
      (8, 8),
      step: 4,
      stroke: (thickness: 3pt),
    )
    for (quad, color) in points.zip(colors) {
      for p in quad {
        circle(
          p,
          radius: 0.2,
          fill: color,
          stroke: none,
        )
      }
    }
  }),
  cetz.canvas({
    import cetz.draw: *

    set-style(stroke: (paint: palette.foreground, cap: "round", join: "round"))

    for (i, (quad, color)) in points.zip(colors).enumerate() {
      for (j, p) in quad.enumerate() {
        circle(
          p,
          radius: 0.2,
          fill: color,
          stroke: none,
          name: "p-" + str(i) + "-" + str(j),
        )
      }
      rect-around(
        ..range(quad.len()).map(j => "p-" + str(i) + "-" + str(j)),
        padding: 0.2,
        stroke: (paint: color, thickness: 2pt),
        name: "box-" + str(i),
      )
    }
    rect-around(
      ..range(points.len()).map(i => "box-" + str(i)),
      padding: 0.2,
      stroke: (paint: palette.foreground, thickness: 3pt),
    )
  }),
)
