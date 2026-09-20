#import "../config.typ": *
#import "../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#cetz.canvas(
  length: 2cm,
  {
    import cetz.draw: *

    set-style(stroke: (paint: palette.foreground, cap: "round", join: "round", thickness: 3pt))

    line((-0.5, 0), (3, 0), mark: (end: ">"))
    line((0, -0.5), (0, 3), mark: (end: ">"))

    content((3.2, 0), anchor: "north", [👥])
    content((-0.1, 3), anchor: "east", [💪])

    intersections("i", {
      line((0, 1.5), (3, 1.5), stroke: (dash: (2pt, 5pt), paint: palette.subtext0))
      bezier((0, 0), (2.5, 1.8), (1.5, 1.5), stroke: (paint: palette.red))
      bezier((0, 0), (2.5, 2.8), (1.5, 2.5), stroke: (paint: palette.blue))
    })
    for-each-anchor("i", name => {
      if name != "2" {
        circle("i." + name, radius: .05, fill: none)
        on-layer(-1, {
          line("i." + name, (rel: (0, -1.5)), stroke: (dash: (0.1pt, 5pt), paint: palette.subtext0))
        })
      }
    })

    content((2.5, 2), anchor: "south", text(palette.red)[\- 🦾])
    content((1.5, 2.5), anchor: "south", text(palette.blue)[\+ 🦾])
  },
)
