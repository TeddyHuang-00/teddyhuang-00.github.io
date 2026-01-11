#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz
#import "util.typ": *

#show: typst-image
#let palette = get-theme-palette()

#let rainbow = (palette.red, palette.peach, palette.yellow, palette.green, palette.sky, palette.blue, palette.mauve)
#let coords = (
  range(4)
    .map(x => range(4).map(y => range(4).map(z => (x, y, z))))
    .flatten()
    .chunks(3)
    .sorted(key: ((x, y, z)) => interleave(x, z, y))
)
#let add-3d = (p, q) => p.zip(q).map(((a, b)) => a + b)
#let mul-3d = (p, scalar) => p.map(a => a * scalar)

#cetz.canvas(length: 3cm, {
  import cetz.draw: *

  set-style(stroke: (paint: palette.foreground, cap: "round", join: "round"))

  ortho(
    x: 25deg,
    y: 30deg,
    // z: 10deg,
    {
      let x-axis = ((0, 0, 4), (4, 0, 4))
      let z-axis = ((0, 0, 4), (0, 4, 4))
      let y-axis = ((4, 0, 0), (4, 0, 4))
      on-xy(z: 0, {
        grid(
          (0, 0),
          (4, 4),
          stroke: (paint: palette.surface0),
        )
      })
      on-xz(y: 0, {
        grid(
          (0, 0),
          (4, 4),
          stroke: (paint: palette.surface0),
        )
      })
      on-yz(x: 0, {
        grid(
          (0, 0),
          (4, 4),
          stroke: (paint: palette.surface0),
        )
      })
      line(..x-axis, stroke: (paint: palette.green, thickness: 5pt), name: "x-axis")
      line(..z-axis, stroke: (paint: palette.red, thickness: 5pt), name: "z-axis")
      line(..y-axis, stroke: (paint: palette.blue, thickness: 5pt), name: "y-axis")

      on-layer(999, {
        let (_, xz, xy) = x-axis.at(0)
        let (yx, yz, _) = y-axis.at(0)
        let (zx, _, zy) = z-axis.at(0)
        for tick in range(5) {
          content(add-3d((tick, xz, xy), (0, 0, 0.5)), text(0.8em)[$#tick$])
          content(add-3d((yx, yz, tick), (0.5, 0, 0)), text(0.8em)[$#tick$])
          content(add-3d((zx, tick, zy), (0, 0, 0.5)), text(0.8em)[$#tick$])
        }
        content(add-3d(mul-3d(x-axis.reduce(add-3d), 0.5), (0, 0, 1)), $x$)
        content(add-3d(mul-3d(y-axis.reduce(add-3d), 0.5), (1, 0, 0)), $y$)
        content(add-3d(mul-3d(z-axis.reduce(add-3d), 0.5), (0, 0, 1)), $z$)
        for (i, (p1, p2)) in coords.windows(2).enumerate() {
          let color = gradient.linear(..rainbow).sample(i / (coords.len() - 2) * 100%)
          line(p1, p2, stroke: (paint: color, thickness: 3pt))
        }
      })
    },
  )
})
