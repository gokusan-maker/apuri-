// 城の塔：いま挑む階と、見せる階（クリアした2階・いまの階・カギつきの次の1階。上の階ほど上に）
export const castleNow = (floors: { cleared: boolean }[]) => {
  const i = floors.findIndex((f) => !f.cleared)
  return i < 0 ? floors.length : i
}

export function castleShown(total: number, now: number): number[] {
  return Array.from({ length: total }, (_, i) => i)
    .filter((i) => i >= now - 2 && i <= now + 1)
    .reverse()
}
