#import "../config.typ": *
#import "../dependencies.typ": cetz

#show: typst-image
#let palette = get-theme-palette()

// 虚线痕迹（痕迹色的落色只有一种）：空心的来源轮廓与半途褪去的引线共用同一套线型。
#let trace = (dash: (2pt, 4pt), thickness: 1.5pt) + (paint: palette.subtext0)
#let faded-stroke(dir) = trace + (
  paint: gradient.linear(
    dir: dir,
    ..range(3).map(_ => palette.subtext0),
    ..range(2).map(_ => palette.subtext0.transparentize(100%)),
  ),
)

// 左：人与人。成果与它引用的来源之间，每一条关系都落在一个能核对的锚点上。
// 右：人与 AI。同样的布局，但来源只剩空心的痕迹，关系在半途就散了。
// 两块画布共用同一套布局与同一个关系生成方式，差别只有 faded 这一个开关。
#let panel(faded: false) = cetz.canvas(
  length: 1.6cm,
  {
    import cetz.draw: *

    set-style(stroke: (paint: palette.foreground, cap: "round", join: "round", thickness: 2pt))

    // 布局：一排来源 + 一块成果；引线的两端都由这些具名元素与常量解出。
    let source-x = (0.45, 2.0, 3.55) // 三个来源框的中心
    let source-w = 0.5 // 来源框宽
    let source-h = 0.5 // 来源框高
    let source-bottom = 0.25 // 来源框下沿
    let outcome = ((1.15, 2.9), (2.85, 3.4)) // 成果框
    let gap = 0.1 // 引线起点与来源框之间留的缝
    let spread = if faded { 0.65 } else { 0.55 } // 三条引线在成果下沿散开的距离
    let stop = if faded { 0.65 } else { 0.02 } // 引线停在成果框下沿之前的距离
    let fade-dir = (ltr, btt, rtl) // 各条虚线从来源侧开始褪去的方向

    // 成果
    rect(..outcome, radius: 0.12, fill: palette.foreground.transparentize(88%), name: "outcome")

    // 来源：照旧存在，或只剩空心的轮廓
    for (i, x) in source-x.enumerate() {
      rect(
        (x - source-w / 2, source-bottom),
        (x + source-w / 2, source-bottom + source-h),
        radius: 0.08,
        name: "source" + str(i),
        fill: if faded { none } else { palette.foreground.transparentize(88%) },
        stroke: if faded { trace } else { auto },
      )
    }

    // 角落标记：人和 AI 各挂在一个上角，符号与角落作参数；
    // 位置取「来源列的外沿 × 成果框上沿」，落在现有留白里，canvas 尺寸不变。
    let corner-mark(symbol, west: true) = floating(content(
      (horizontal: if west { "source0.west" } else { "source2.east" }, vertical: "outcome.north"),
      symbol,
      anchor: if west { "north-west" } else { "north-east" },
    ))
    corner-mark(if faded { [🤖] } else { [🙂] }, west: not faded)

    // 关系：从来源顶面外侧出发，指向成果下沿的落点
    for (i, _) in source-x.enumerate() {
      let from = (rel: (0, gap), to: "source" + str(i) + ".north")
      let aim = (rel: ((i - 1) * spread, -stop), to: "outcome.south")
      // 正中那条要精确竖直：零宽的线段会让渐隐笔触退化成不可见的变换，
      // 所以 x 取自来源锚点本身，而不是差在浮点末位的成果框下沿。
      let to = if i == 1 { (horizontal: from, vertical: aim) } else { aim }
      if faded {
        line(from, to, stroke: faded-stroke(fade-dir.at(i)))
      } else {
        line(from, to, mark: (end: ">"))
      }
    }
  },
)

#grid(
  columns: (8cm, 8cm),
  gutter: 1cm,
  align: center + horizon,
  panel(faded: false),
  panel(faded: true),
)
