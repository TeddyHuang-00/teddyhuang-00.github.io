const generateHash = (content: string) => {
  let hash = 0;
  for (const char of content) {
    hash = (hash << 5) - hash + char.codePointAt(0)!;
    // Constrain to 32bit integer
    hash = Math.trunc(hash);
  }
  return hash;
};

const mulberry32 = (a: number) => {
  return () => {
    a = Math.trunc(a + 0x6d2b79f5);
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return Math.trunc(t ^ (t >>> 14)) / 4294967296;
  };
};

export const seedRng = (seed: string) => {
  const hash = generateHash(seed);
  return mulberry32(hash);
};
