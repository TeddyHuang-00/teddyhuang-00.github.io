#let width = 1200pt
#let height = 630pt

#set page(width: width, height: height, margin: 0pt, fill: black)

#let d = 80pt
#let a = 0.823637rad
#let w = 35%
#let l = 15
#let thickness = 2.5pt
#let spacing = 1200pt * (100% - 2 * w) / 3
#let width = 1200pt * w
#let mirror = ((x, y)) => (width - x, height - y)
#let mirror-x = ((x, y)) => (width - x, y)
#let mirror-y = ((x, y)) => (x, height - y)
#let style = i => {
  let transparency = ((1 + i) / l) * 100%
  (
    paint: color.mix(
      (color.hsl(240deg, 100%, 70%), transparency),
      (black, 100% - transparency),
      space: color.rgb,
    ),
    thickness: thickness,
    join: "round",
    cap: "round",
  )
}

#stack(
  dir: ltr,
  h(1fr),
  box(height: 100%, width: w, {
    for f in (x => x, mirror) {
      let (cx, cy) = (width - d, calc.tan(a) * (width - d - d / calc.sin(a)))
      for (i, level) in range(1, l).map(idx => (idx, d / (l - 1) * idx)) {
        let (cx, cy) = f((cx, cy))
        place(top + left, dx: cx - level, dy: cy - level, circle(radius: level, stroke: style(i)))
      }
      place(top + left, polygon(
        stroke: none,
        fill: black,
        f((0%, 0%)),
        f((cx + d * calc.cos(90deg + a), cy + d * calc.sin(90deg + a))),
        f((cx, cy)),
        f((100%, cy)),
        f((100%, 0%)),
      ))
      for (i, level) in range(1, l).map(idx => (idx, d / (l - 1) * idx)) {
        place(top + left, {
          let ang = 90deg + a
          let (dx, dy) = (level * calc.cos(ang), level * calc.sin(ang))
          let start = (-level / calc.sin(a), -d / calc.cos(a))
          line(
            stroke: style(i),
            start: f(start),
            end: f((cx + dx, cy + dy)),
          )
        })
        place(top + left, line(
          stroke: style(i),
          start: f((cx + level, 0%)),
          end: f((cx + level, cy)),
        ))
      }
      place(top + left, polygon(
        stroke: style(0),
        fill: none,
        f((0%, -d / calc.cos(a))),
        f((cx, cy)),
        f((cx, -10%)),
      ))
    }
  }),
  h(1fr),
  box(height: 100%, width: w, {
    for f in (x => x, mirror) {
      let (cx, cy) = (d, (height - spacing) / 2 - d)
      for (i, level) in range(1, l).map(idx => (idx, d / (l - 1) * idx)) {
        let (cx, cy) = f((cx, cy))
        place(top + left, dx: cx - level, dy: cy - level, circle(radius: level, stroke: style(i)))
        let (cx, cy) = mirror-x((cx, cy))
        place(top + left, dx: cx - level, dy: cy - level, circle(radius: level, stroke: style(i)))
      }
      place(top + left, polygon(
        stroke: none,
        fill: black,
        f((0%, 0%)),
        f((0%, cy)),
        f((cx, cy)),
        f((cx, cy + d)),
        f((100% - cx, cy + d)),
        f((100% - cx, cy)),
        f((100%, cy)),
        f((100%, 0%)),
      ))
      for (i, level) in range(1, l).map(idx => (idx, d / (l - 1) * idx)) {
        place(top + left, {
          line(
            stroke: style(i),
            start: f((cx - level, 0%)),
            end: f((cx - level, cy)),
          )
        })
        place(top + left, {
          line(
            stroke: style(i),
            start: mirror-x(f((cx - level, 0%))),
            end: mirror-x(f((cx - level, cy))),
          )
        })
        place(top + left, line(
          stroke: style(i),
          start: f((cx, cy + level)),
          end: mirror-x(f((cx, cy + level))),
        ))
      }
      place(top + left, polygon(
        stroke: style(0),
        fill: none,
        f((cx, -10%)),
        f((cx, cy)),
        f(mirror-x((cx, cy))),
        f(mirror-x((cx, -10%))),
      ))
    }
  }),
  h(1fr),
)
