#import "../../../config.typ": *
#import "@preview/cetz:0.4.2"

#show: typst-image
#let palette = get-theme-palette()

#let example = ((7, 1), (11, 1), (11, 7), (9, 7), (9, 6), (5, 6), (5, 7), (2, 7), (2, 3), (7, 3))
#let scanlines = (
  (
    (1, 6.5),
    (2, 6.5),
    (5, 6.5),
    (7, 6.5),
  ),
  (
    (1, 2),
    (7, 2),
    (9, 2),
  ),
)

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
  for sl in scanlines {
    for iseg in sl.windows(2).enumerate() {
      let (i, seg) = iseg
      let color = if calc.rem(i, 2) == 0 { palette.red } else { palette.blue }
      line(..seg, stroke: (paint: color, thickness: 3pt, cap: "round"))
    }
    mark(
      sl.last(),
      0deg,
      symbol: "o",
      anchor: "center",
      scale: 2,
      fill: if calc.rem(sl.len(), 2) == 0 { palette.red } else { palette.blue },
      stroke: if calc.rem(sl.len(), 2) == 0 { palette.red } else { palette.blue },
    )
  }
})
