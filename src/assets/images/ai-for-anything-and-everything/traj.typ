#import "../config.typ": *
#import "../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

#cetz.canvas(
  length: 2cm,
  {
    import cetz.draw: *

    set-style(stroke: (paint: palette.foreground, cap: "round", join: "round", thickness: 2.5pt))

    // 同一段工作里真实发生过、却没被记录下来的尝试：
    // 断头的、绕回原地的、走到一半就停下的灰虚线，彼此纠缠。
    // 涂鸦与主路径共用同一张具名结点表：每个结点只写一次，形状由结点之间的连线决定。
    let ghost = (dash: (2pt, 5pt), paint: palette.subtext0, thickness: 2pt)

    let junctions = (
      // 主路径（论文里那条）的落脚点：起点藏在一堆虚线结点里，不作任何标记。
      p0: (1.6, 1.45),
      p1: (2.15, 1.95),
      p2: (2.65, 1.6),
      p3: (3.15, 2.4),
      // 涂鸦的拐点：断头路与绕行路共用，坐标只写这一遍。
      g0: (1.9, 0.15),
      g1: (1.4, 0.4),
      g2: (1.6, 0.45),
      g3: (0.25, 0.5),
      g4: (2.9, 0.55),
      g5: (0.9, 0.75),
      g6: (1.0, 0.75),
      g7: (3.35, 0.85),
      g8: (2.3, 0.9),
      g9: (1.35, 1.0),
      g10: (1.0, 1.05),
      g11: (2.6, 1.1),
      g12: (0.3, 1.15),
      g13: (1.75, 1.15),
      g14: (0.5, 1.2),
      g15: (3.05, 1.3),
      g16: (2.0, 1.35),
      g17: (2.4, 1.55),
      g18: (1.05, 1.6),
      g19: (1.45, 1.75),
      g20: (2.75, 1.85),
      g21: (0.25, 1.9),
      g22: (3.3, 1.9),
      g23: (0.85, 2.15),
      g24: (0.9, 2.2),
      g25: (1.5, 2.2),
      g26: (2.6, 2.2),
      g27: (2.35, 2.4),
      g28: (3.0, 2.45),
      g29: (0.6, 2.5),
      g30: (1.7, 2.6),
      g31: (0.6, 2.75),
      g32: (1.15, 2.85),
      g33: (2.75, 2.95),
      g34: (0.4, 3.0),
      g35: (2.1, 3.05),
      g36: (1.35, 3.25),
    )
    for (name, pos) in junctions { anchor(name, pos) }

    // 一次尝试的形状都一样：一串具名结点连成灰色虚线；绕圈的版本两端各多一个控制点。
    let stray(..nodes) = line(..nodes, stroke: ghost)
    let loop-back(..nodes) = bezier(..nodes, stroke: ghost)

    for attempt in (
      ("g3", "g5", "g1"),
      ("g12", "g10", "p0"),
      ("g21", "g23", "g31"),
      ("g34", "g32", "g36"),
      ("g6", "g18"),
      ("g2", "g13"),
      ("g24", "g30", "g27"),
      ("g9", "g16", "g8"),
      ("g30", "g35", "g33"),
      ("g8", "g4", "g7"),
      ("g27", "g20", "g22"),
      ("g13", "g17"),
      ("g23", "g19"),
      ("g4", "g15"),
      ("g20", "g26", "g28"),
      ("g32", "g25"),
    ) { stray(..attempt) }

    loop-back("g10", "g0", "g11", "p0")
    loop-back("g19", "g29", "g14", "g10")

    // 终点：方形节点 + 光环共用同一个中心；主路径最后一段由锚点停在光环外沿。
    let goal = (3.75, 2.95)
    let node-half = 0.11
    let halo-radius = 0.3
    let corner = (dx, dy) => (goal.at(0) + dx, goal.at(1) + dy)
    content(goal, name: "goal", pad(left: 2pt, bottom: 4pt)[📜])
    // rect(corner(-node-half, -node-half), corner(node-half, node-half), name: "goal", fill: palette.red, stroke: none)
    circle("goal.center", radius: halo-radius, name: "halo", stroke: (paint: palette.text, thickness: 1.5pt))

    let approach = junctions.p3
    // 注意 typst 的 calc.atan2 是 (x, y)，与 C/Python 的 (y, x) 相反
    let aim = calc.atan2(approach.at(0) - goal.at(0), approach.at(1) - goal.at(1))
    line("p0", "p1", "p2", "p3", (name: "halo", anchor: aim), stroke: (paint: palette.red))
  },
)
