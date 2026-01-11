#import "../../../config.typ": *
#import "../../../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#let space = (
  read("./example.txt").split().map(line => line.split("").slice(1, line.len() + 1))
)
#let height = space.len()
#let width = space.at(0).len()
#let start = {
  let row = space.position(row => row.contains("S"))
  (row, space.at(row).position(ch => ch == "S"))
}
#let splitters = (
  space
    .enumerate()
    .fold((), (acc, (x, row)) => (
      acc + row.enumerate().filter(((_, cell)) => cell == "^" or cell == "+").map(((idx, _)) => (x, idx))
    ))
)

#let precomputation = (
  space
    .rev()
    .fold((range(width).map(_ => 0),), (acc, x) => {
      let row = acc
        .last()
        .zip(x)
        .map(((idx, cell)) => if cell == "^" or cell == "+" {
          0
        } else {
          idx + 1
        })
      acc.push(row)
      acc
    })
    .rev()
)

#let heatmap = val => (
  gradient.linear(..(palette.green, palette.yellow, palette.red).map(c => c.transparentize(50%))).sample(val * 10%)
)

#cetz.canvas({
  import cetz.draw: *

  set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

  for (i, row) in space.enumerate() {
    for (j, cell) in row.enumerate() {
      let (x, y) = (j + 0.5, height - 1 - i + 0.5)
      rect(
        (x - 0.5, y - 0.5),
        (rel: (1, 1)),
        fill: heatmap(precomputation.at(i).at(j)),
        stroke: none,
      )
      if cell == "S" {
        circle((x, y), radius: 0.3, fill: palette.surface0, stroke: none)
      } else if cell == "^" or cell == "+" {
        polygon((x, y - 0.1), 3, angle: 90deg, radius: 0.4, fill: palette.surface0, stroke: none)
      }
      content((x, y), [#precomputation.at(i).at(j)])
    }
  }

  grid(
    (0, 0),
    (width, height),
    stroke: (paint: palette.overlay0),
  )
})
