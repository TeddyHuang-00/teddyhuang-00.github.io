#import "../config.typ": *
#import "../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#let work = () => cetz.canvas(
  length: 2cm,
  {
    import cetz.draw: *

    set-style(stroke: (paint: palette.foreground, cap: "round", join: "round", thickness: 3pt))

    line((-0.5, 0), (3, 0), mark: (end: ">"))
    line((0, -0.5), (0, 3), mark: (end: ">"))

    content((3.2, 0), anchor: "north", [👥])
    content((-0.1, 3), anchor: "east", [💪])

    merge-path(fill: palette.red.transparentize(50%), stroke: none, {
      bezier((0, 0), (2.5, 1.8), (1.5, 1.5), stroke: none)
      line((2.5, 2.5), (0, 0), stroke: none)
    })
    line((0, 0), (2.7, 2.7), stroke: (dash: (2pt, 5pt), paint: palette.subtext0))
    bezier((0, 0), (2.5, 1.8), (1.5, 1.5), stroke: (paint: palette.red))
  },
)


#let efficiency = () => cetz.canvas(
  length: 2cm,
  {
    import cetz.draw: *

    set-style(stroke: (paint: palette.foreground, cap: "round", join: "round", thickness: 3pt))

    line((-0.5, 0), (3, 0), mark: (end: ">"))
    line((0, -0.5), (0, 3), mark: (end: ">"))

    content((3.2, 0), anchor: "north", [👥])
    content((-0.1, 3), anchor: "east", [💪/👥])

    line((0, 2), (3, 2), stroke: (dash: (2pt, 5pt), paint: palette.subtext0))
    bezier((0, 2), (2.5, 1.5), (1.5, 2), stroke: (paint: palette.red))
  },
)

#grid(
  columns: (8cm, 8cm),
  gutter: 1cm,
  align: center + horizon,
  work(), efficiency(),
)
