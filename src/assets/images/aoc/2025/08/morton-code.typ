#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz
#import "util.typ": *

#show: typst-image
#let palette = get-theme-palette()

#let x = 13
#let y = 11
#let z = 5
#let morton-code = interleave(x, y, z, nbits: 4)

#cetz.canvas({
  import cetz.draw: *

  set-style(stroke: (paint: palette.foreground, cap: "round", join: "round"))

  for (offset, (label, color, value)) in ($x$, $y$, $z$)
    .zip((palette.green, palette.red, palette.blue), (x, y, z))
    .enumerate() {
    content((offset * 5, 5.5), $#label.body=#value$, anchor: "west")
    rect((0 + offset * 5, 4), (4 + offset * 5, 5), fill: color.transparentize(80%), stroke: none)
    grid(
      (0 + offset * 5, 4),
      (4 + offset * 5, 5),
      stroke: (paint: color),
    )
    let bits = display-bits(value, 4)
    for (i, b) in bits.split("").slice(1, bits.len() + 1).enumerate() {
      content((i + 0.5 + offset * 5, 4.5), $#b$)
    }
  }

  let x-bits = display-bits(x, 4)
  let y-bits = display-bits(y, 4)
  let z-bits = display-bits(z, 4)
  let morton-bits = display-bits(morton-code, 12)
  content((0, 2.5), $M(x,y,z) = #morton-code$, anchor: "west")
  grid(
    (0, 1),
    (12, 2),
    stroke: (paint: palette.text),
  )
  for i in range(12) {
    let color = if calc.rem(i, 3) == 0 {
      palette.blue
    } else if calc.rem(i, 3) == 1 {
      palette.red
    } else {
      palette.green
    }
    rect((i, 1), (i + 1, 2), fill: color.transparentize(80%), stroke: color)
    content((i + 0.5, 1.5), $#morton-bits.at(i)$)
    if i < 11 {
      on-layer(1, {
        line((i + 1, 1), (i + 1, 2), stroke: (paint: color, dash: (3pt, 3pt), thickness: 1pt, cap: "butt"))
      })
    }
  }
})
