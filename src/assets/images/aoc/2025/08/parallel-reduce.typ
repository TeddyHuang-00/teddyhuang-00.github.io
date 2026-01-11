#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#cetz.canvas({
  import cetz.draw: *

  set-style(stroke: (paint: palette.text, cap: "round", join: "round", thickness: 2pt))

  for i in range(8) {
    circle((2 * i, 0), radius: 0.8, name: "task-" + str(i) + "-0")
    content((2 * i, 0), $m_#i$)
    for offset in range(1, 4) {
      if i.bit-and(1.bit-lshift(offset - 1)) > 0 {
        circle((2 * i, -offset * 3), radius: 0.6, name: "task-" + str(i) + "-" + str(offset))
        content((2 * i, -offset * 3), $+$)
        line(
          "task-" + str(i) + "-" + str(offset - 1),
          "task-" + str(i) + "-" + str(offset),
          stroke: (dash: (1pt, 4pt), thickness: 1pt),
        )
        line(
          "task-" + str(i - 1.bit-lshift(offset - 1)) + "-" + str(offset - 1),
          "task-" + str(i) + "-" + str(offset),
          stroke: (dash: (1pt, 4pt), thickness: 1pt),
        )
      } else {
        break
      }
    }
  }
})
