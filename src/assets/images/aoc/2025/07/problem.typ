#import "../../../config.typ": *
#import "@preview/cetz:0.4.2"

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
    .fold((), (acc, x) => (
      acc
        + x.at(1).enumerate().filter(cell => cell.at(1) == "^" or cell.at(1) == "+").map(cell => (x.at(0), cell.at(0)))
    ))
)

#let light-thickness = 0.1

#cetz.canvas({
  import cetz.draw: *

  set-style(stroke: (paint: palette.text, cap: "round", join: "round"))

  grid(
    (0, 0),
    (width, height),
    stroke: (paint: palette.overlay0),
  )

  set-style(stroke: (thickness: light-thickness, cap: "butt"))
  for (i, row) in space.enumerate() {
    for (j, cell) in row.enumerate() {
      let (x, y) = (j + 0.5, height - 1 - i + 0.5)
      if cell == "S" {
        line((x, y), (x, y - 1))
        circle((x, y), radius: 0.3, fill: palette.blue, stroke: none)
      } else if cell == "|" {
        line((x, y), (x, y - 1))
      } else if cell == "+" {
        bezier((x, y + 0.1), (x - 1, y), (x - 0.1, y + 0.3), (x - 1, y + 0.3))
        bezier((x, y + 0.1), (x + 1, y), (x + 0.1, y + 0.3), (x + 1, y + 0.3))
        polygon((x, y - 0.1), 3, angle: 90deg, radius: 0.4, fill: palette.green, stroke: none)
      } else if cell == "^" {
        polygon((x, y - 0.1), 3, angle: 90deg, radius: 0.4, fill: palette.red, stroke: none)
      }
    }
  }
})
