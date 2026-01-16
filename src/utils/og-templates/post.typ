#import "@preview/suiji:0.5.1": gen-rng-f, random-f
#import "@preview/digestify:0.1.0": md5

#let width = 1200pt
#let height = 630pt

#set page(width: width, height: height, margin: 0pt, fill: black)
#set text(font: "Maple Mono NF", fill: white, stroke: 0.5pt + white)

#let title = sys.inputs.at("title", default: "Post Title")
#let author = sys.inputs.at("author", default: "Author Name")
#let site = sys.inputs.at("site", default: "Site Name")
#let show-text = sys.inputs.at("show-text", default: "false") == "true"

#let mosaic-size = 15pt
#let dimension = (int(width / mosaic-size), int(height / mosaic-size))

#let seed = md5(bytes(title + author + site))
#let seed = range(4).fold(0, (acc, idx) => acc.bit-lshift(8).bit-or(seed.at(idx)))
#let rng = gen-rng-f(seed)
#let (rng, rns) = random-f(rng, size: dimension.at(0) * dimension.at(1) * 3)

#grid(
  columns: dimension.at(0), rows: dimension.at(1),
  ..rns
    .chunks(3)
    .map(((p, h, l)) => {
      box(
        width: mosaic-size,
        height: mosaic-size,
        inset: (calc.floor(p * 5) + 1) * 1pt,
        box(width: 100%, height: 100%, radius: 2pt, fill: color.hsl(
          (calc.floor(h * 120) + 165) * 1deg,
          100%,
          calc.floor(l * 50) * 1% + 10%,
        )),
      )
    })
)
#if show-text {
  place(top + left, box(
    width: 100%,
    height: 100%,
    inset: 5 * mosaic-size,
    box(
      width: 100%,
      height: 100%,
      radius: 20pt,
      inset: 3 * mosaic-size,
      fill: black.transparentize(10%),
      stroke: white.transparentize(90%) + 1pt,
      stack(
        v(1fr),
        box(width: 100%, align(center + horizon, text(title, size: 72pt, weight: "bold"))),
        v(1fr),
        box(width: 100%, {
          set text(size: 28pt)
          stack(dir: ltr, strong[by #emph(author)], h(1fr), [#strong(site)])
        }),
      ),
    ),
  ))
}
