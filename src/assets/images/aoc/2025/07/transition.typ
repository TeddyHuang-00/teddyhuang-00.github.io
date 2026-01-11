#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#cetz.canvas(length: 4em, {
  import cetz.draw: *

  set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

  grid(
    (0, 1),
    (3, 2),
    stroke: (paint: palette.overlay0),
  )
  grid(
    (1, 0),
    (2, 1),
    stroke: (paint: palette.overlay0),
  )
  (
    ($S_(x-1,y-1)$, $S_(x,y-1)$, $S_(x+1,y-1)$),
    ($...$, $S_(x,y)$, $...$),
  )
    .enumerate()
    .map(((i, row)) => row
      .enumerate()
      .map(((j, t)) => {
        let (x, y) = (j + 0.5, 1 - i + 0.5)
        hide(rect((x - 0.4, y - 0.2), (x + 0.4, y + 0.2), name: "x" + str(i) + "y" + str(j)))
        content((x, y), t)
      }))
    .flatten()

  range(3)
    .map(i => line(
      "x0y" + str(i),
      "x1y1",
      stroke: (paint: palette.accent, thickness: 3pt, dash: if calc.rem(i, 2) == 0 { (1pt, 5pt) }),
      mark: (end: "straight", scale: 2),
    ))
    .flatten()

  content((0.55, 0.8), text(palette.accent)[$delta_(x-1,y-1)$])
  content((2.45, 0.8), text(palette.accent)[$delta_(x+1,y-1)$])
})
