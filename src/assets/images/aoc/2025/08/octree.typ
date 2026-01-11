#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#cetz.canvas(length: 2cm, {
  import cetz.draw: *

  set-style(stroke: (paint: palette.foreground, cap: "round", join: "round", thickness: 3pt))

  ortho(
    x: 25deg,
    y: 30deg,
    // z: 10deg,
    {
      for (scale, color) in range(3).map(x => calc.pow(2, x - 1)).rev().zip((palette.text, palette.blue, palette.red)) {
        for (layer, offset) in (
          (on-xy, (z: 4)),
          (on-xz, (y: 4)),
          (on-yz, (x: 4)),
        ) {
          layer(
            ..offset,
            {
              if scale >= 1 {
                line(
                  (4 - 2 * scale, 4 - 2 * scale),
                  (4, 4 - 2 * scale),
                  (4, 4 - scale),
                  (4 - scale, 4 - scale),
                  (4 - scale, 4),
                  (4 - 2 * scale, 4),
                  close: true,
                  fill: color.transparentize(50%),
                  stroke: none,
                )
              } else {
                rect(
                  (4 - 2 * scale, 4 - 2 * scale),
                  (4, 4),
                  fill: color.transparentize(50%),
                  stroke: none,
                )
              }
              grid(
                (4 - 2 * scale, 4 - 2 * scale),
                (4, 4),
                stroke: (paint: color),
                step: scale,
              )
            },
          )
        }
      }
    },
  )
})
