// Morton code interleaving with specified number of bits
#let interleave = (a, b, c, nbits: 3) => {
  let z = 0
  for i in range(0, nbits) {
    let mask = 1.bit-lshift(i)
    z = z
      .bit-or(a.bit-and(mask).bit-lshift(2 * i))
      .bit-or(b.bit-and(mask).bit-lshift(2 * i + 1))
      .bit-or(c.bit-and(mask).bit-lshift(2 * i + 2))
  }
  z
}

// Morton code deinterleaving with specified number of bits
#let deinterleave = (z, nbits: 3) => {
  let a = 0
  let b = 0
  let c = 0
  for i in range(0, nbits) {
    let mask = 1.bit-lshift(3 * i)
    a = a.bit-or(z.bit-and(mask).bit-rshift(2 * i))
    b = b.bit-or(z.bit-and(mask.bit-lshift(1)).bit-rshift(2 * i + 1))
    c = c.bit-or(z.bit-and(mask.bit-lshift(2)).bit-rshift(2 * i + 2))
  }
  (a, b, c)
}

// Display number n in binary with a fixed number of bits
#let display-bits = (n, bits) => {
  let s = str(n, base: 2)
  "0" * (bits - s.len()) + s
}
