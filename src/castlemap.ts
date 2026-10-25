// 城の地図の位置：3つずつ横にならべ、行ごとに向きを変えて（へび道）つなぐ。x は %、y は px
export const MAP_COLS = 3
export const MAP_ROW_H = 118
export function mapSpots(n: number): { x: number; y: number }[] {
  return Array.from({ length: n }, (_, i) => {
    const row = Math.floor(i / MAP_COLS)
    const col = i % MAP_COLS
    const c = row % 2 === 0 ? col : MAP_COLS - 1 - col
    return { x: 18 + c * 32, y: 44 + row * MAP_ROW_H + (c === 1 ? 12 : 0) }
  })
}
