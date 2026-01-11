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

  line(
    "x0y0",
    "x1y1",
    stroke: (paint: palette.accent, thickness: 3pt, dash: (1pt, 5pt)),
    mark: (end: "straight", scale: 2),
  )
  line(
    "x0y1",
    "x1y1",
    stroke: (paint: palette.accent, thickness: 3pt),
    mark: (end: "straight", scale: 2),
  )
  line(
    "x0y2",
    "x1y1",
    stroke: (paint: palette.accent, thickness: 3pt, dash: (1pt, 5pt)),
    mark: (end: "straight", scale: 2),
  )

  content((0.55, 0.8), text(palette.accent)[$delta_(x-1,y-1)$])
  content((2.45, 0.8), text(palette.accent)[$delta_(x+1,y-1)$])
})
