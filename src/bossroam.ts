// ボスのエリアの地図で、ふつうのボスがうろうろする位置：日ごとに場所が入れかわる（同じ日は同じ）
export const ROAM_SPOTS = [
  { x: 18, y: 18 },
  { x: 50, y: 14 },
  { x: 82, y: 18 },
  { x: 50, y: 46 },
  { x: 18, y: 88 },
  { x: 50, y: 88 },
  { x: 82, y: 88 },
]

function hash(s: string): number {
  let h = 7
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

// n 体のボスの位置（重ならない）
export function roamSpots(n: number, day: string): { x: number; y: number }[] {
  const order = ROAM_SPOTS.map((p, i) => ({ p, k: hash(`${day}:${i}`) })).sort((a, b) => a.k - b.k)
  return order.slice(0, Math.min(n, ROAM_SPOTS.length)).map((o) => o.p)
}
