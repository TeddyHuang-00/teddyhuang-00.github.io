#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz
#import "util.typ": *

#show: typst-image
#let palette = get-theme-palette()

#let segments = (
  range(6)
    .rev()
    .map(i => {
      let scale = calc.pow(2, i)
      let rem = calc.rem(21, scale)
      let segments = (
        if rem > 0 {
          (rem,)
        }
          + (scale,) * calc.div-euclid(21, scale)
      )
      let spacer = (0,) * segments.len()
      ((0,) + spacer.zip(spacer, segments).flatten()).slice(-calc.div-euclid(64, scale))
    })
)
#let bit-masks = (
  segments
    .enumerate()
    .map(
      ((i, seg)) => {
        let scale = calc.pow(2, 5 - i)
        seg.fold(0, (acc, s) => {
          let acc = acc.bit-lshift(scale - s)
          for _ in range(s) {
            acc = acc.bit-lshift(1).bit-or(1)
          }
          acc
        })
      },
    )
)

#cetz.canvas(length: 0.25cm, {
  import cetz.draw: *

  set-style(stroke: (paint: palette.foreground, cap: "round", join: "round"))

  for (i, seg) in segments.enumerate() {
    let scale = calc.pow(2, 5 - i)
    let baseline = -i * 5
    let mask = (
      "0x"
        + str(
          seg.fold(0, (acc, s) => {
            let acc = acc.bit-lshift(scale - s)
            for _ in range(s) {
              acc = acc.bit-lshift(1).bit-or(1)
            }
            acc
          }),
          base: 16,
        )
    )
    for (j, seg) in seg.enumerate() {
      grid(
        (j * scale, baseline),
        ((j + 1) * scale - seg, baseline - 1),
      )
      if seg > 0 {
        let idx = calc.div-euclid(64 / scale - j, 3)
        rect(
          ((j + 1) * scale - seg, baseline),
          ((j + 1) * scale, baseline - 1),
          fill: palette.blue.transparentize(80%),
          stroke: none,
          name: "seg-" + str(i) + "-" + str(idx),
        )
        on-layer(1, {
          grid(
            ((j + 1) * scale - seg, baseline),
            ((j + 1) * scale, baseline - 1),
            stroke: (paint: palette.blue),
          )
        })
        if i > 0 {
          line(
            "seg-" + str(i) + "-" + str(idx) + ".north",
            (rel: (calc.rem(idx, 2) * 2 * scale, 4)),
            stroke: (paint: palette.blue, dash: (2pt, 3pt), thickness: 1pt),
          )
        }
      }
      content(
        (65, baseline),
        anchor: "west",
        mask
        // if i == 0 {
        //   $"x" <- "x" "&" #mask$
        // } else {
        //   $"x" <- ("x" | ("x" << #{ scale * 2 })) "&" #mask$
        // },
      )
    }
  }
})
