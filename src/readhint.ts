// 読解のヒント：まちがいの選択肢を消して2択にしぼる（答えは見せない）
export function hintHidden(n: number, answer: number): number[] {
  if (n <= 2) return []
  const keep = (answer + 1) % n // のこす、まちがいの選択肢1つ
  return Array.from({ length: n }, (_, i) => i).filter((i) => i !== answer && i !== keep)
}
