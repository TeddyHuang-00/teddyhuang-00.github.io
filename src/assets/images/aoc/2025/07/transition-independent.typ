#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#cetz.canvas(length: 4em, {
  import cetz.draw: *

  set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

  grid(
    (1, 1),
    (4, 2),
    stroke: (paint: palette.overlay0),
  )
  grid(
    (0, 0),
    (5, 1),
    stroke: (paint: palette.overlay0),
  )
  polygon((1.5, 1.4), 3, angle: 90deg, radius: 0.5, fill: palette.surface0.transparentize(30%), stroke: none)
  polygon((3.5, 1.4), 3, angle: 90deg, radius: 0.5, fill: palette.surface0.transparentize(30%), stroke: none)
  (
    ($...$, $S_(x-1)$, $S_(x)$, $S_(x+1)$, $...$),
    ($S'_(x-2)$, $S'_(x-1)$, $S'_(x)$, $S'_(x+1)$, $S'_(x+2)$),
  )
    .enumerate()
    .map(ir => {
      let (i, row) = ir
      row
        .enumerate()
        .map(jt => {
          let (j, t) = jt
          let (x, y) = (j + 0.5, 1 - i + 0.5)
          hide(rect((x - 0.4, y - 0.2), (x + 0.4, y + 0.2), name: "x" + str(i) + "y" + str(j)))
          content((x, y), t)
        })
    })
    .flatten()

  range(2)
    .map(i => {
      let y = 2 * i + 1
      range(2).map(j => {
        let dy = 2 * j - 1
        line(
          "x0y" + str(y),
          "x1y" + str(y + dy),
          stroke: (paint: palette.accent, thickness: 3pt),
          mark: (end: "straight", scale: 2),
        )
      })
    })
    .flatten()
  range(3)
    .map(i => {
      line(
        "x0y" + str(i + 1),
        "x1y" + str(i + 1),
        stroke: (paint: palette.accent, thickness: 3pt, dash: (1pt, 5pt)),
        mark: (end: "straight", scale: 2),
      )
      if (calc.rem(i, 2) == 0) {
        hide(circle((i + 1.5, 1), radius: 0.15, fill: palette.red, stroke: none, name: "aux-" + str(i)))
        line("aux-" + str(i) + ".south-east", "aux-" + str(i) + ".north-west", stroke: (
          thickness: 2pt,
          paint: palette.red,
        ))
        line("aux-" + str(i) + ".south-west", "aux-" + str(i) + ".north-east", stroke: (
          thickness: 2pt,
          paint: palette.red,
        ))
      }
    })
    .flatten()
})
