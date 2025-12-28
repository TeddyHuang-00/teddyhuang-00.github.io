#import "../../../config.typ": *
#import "@preview/cetz:0.4.2"

#show: typst-image
#let palette = get-theme-palette()

#grid(
  columns: 2,
  column-gutter: 2em,
  cetz.canvas({
    import cetz.draw: *

    set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

    compound-path(
      {
        rect((1, 1), (7, 7))
        rect((3, 3), (5, 5))
        line((3, 5), (3, 7))
      },
      fill: palette.text.transparentize(50%),
      fill-rule: "even-odd",
      stroke: 3pt,
      name: "area",
    )
    ((1, 1), (7, 1), (7, 7), (3, 7), (3, 5), (5, 5), (5, 3), (3, 3), (1, 7))
      .map(pos => circle(pos, radius: 0.2, fill: palette.text, stroke: none))
      .flatten()

    bezier(
      (4, 4),
      (4, 8),
      (3.5, 5.5),
      (5, 6.5),
      stroke: (
        dash: "dashed",
        thickness: 3pt,
        paint: gradient.linear(
          dir: btt,
          ..range(2).map(_ => palette.overlay0),
          ..range(3).map(_ => palette.blue),
          ..range(2).map(_ => palette.overlay0),
        ),
      ),
      name: "path",
    )
    circle(
      (4, 4),
      radius: 0.125,
      fill: palette.overlay0,
      stroke: none,
    )
    mark(
      (4, 8),
      120deg,
      symbol: ">>",
      anchor: "center",
      scale: 2.5,
      fill: palette.overlay0,
      stroke: palette.overlay0,
    )

    intersections("i", "area", "path")
    for-each-anchor("i", name => {
      hide(circle("i." + name, radius: 0.25, fill: palette.red, stroke: none, name: "aux-" + name))
      line("aux-" + name + ".south-east", "aux-" + name + ".north-west", stroke: (
        thickness: 2pt,
        paint: palette.red,
      ))
      line("aux-" + name + ".south-west", "aux-" + name + ".north-east", stroke: (
        thickness: 2pt,
        paint: palette.red,
      ))
    })
  }),
  cetz.canvas({
    import cetz.draw: *

    set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

    line(
      (1, 1),
      (7, 1),
      (7, 7),
      (5, 7),
      (5, 3),
      (3, 3),
      (3, 7),
      (1, 7),
      close: true,
      fill: palette.text.transparentize(50%),
      stroke: 3pt,
    )
    ((1, 1), (7, 1), (7, 7), (5, 7), (5, 3), (3, 3), (3, 7), (1, 7))
      .map(pos => circle(pos, radius: 0.2, fill: palette.text, stroke: none))
      .flatten()

    rect(
      (1, 1),
      (7, 7),
      stroke: (
        thickness: 3pt,
        paint: gradient
          .conic(
            angle: -90deg,
            center: (50%, 60%),
            ..range(5).map(_ => palette.green),
            ..range(1).map(_ => palette.red),
            ..range(5).map(_ => palette.green),
          )
          .sharp(11, smoothness: 50%),
      ),
      fill: gradient
        .conic(
          angle: -90deg,
          center: (50%, 60%),
          ..range(5).map(_ => palette.green.transparentize(30%)),
          ..range(1).map(_ => palette.red.transparentize(30%)),
          ..range(5).map(_ => palette.green.transparentize(30%)),
        )
        .sharp(11, smoothness: 50%),
      name: "rect",
    )
    ((1, 1), (7, 7)).map(pos => circle(pos, radius: 0.2, fill: palette.green, stroke: none)).flatten()

    bezier(
      (4, 4),
      (4, 8),
      (3.5, 5.5),
      (5, 6.5),
      stroke: (
        dash: "dashed",
        thickness: 3pt,
        paint: palette.overlay0,
      ),
      name: "path",
    )
    circle(
      (4, 4),
      radius: 0.125,
      fill: palette.overlay0,
      stroke: none,
    )
    mark(
      (4, 8),
      120deg,
      symbol: ">>",
      anchor: "center",
      scale: 2.5,
      fill: palette.overlay0,
      stroke: palette.overlay0,
    )
    intersections("i", "path", "rect")
    circle("i.0", radius: 0.5, stroke: (paint: palette.blue, thickness: 3pt))
  }),
)
