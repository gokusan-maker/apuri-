// スペル入力モードの判定とヒント
export function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function isCorrectSpelling(input: string, answer: string): boolean {
  return normalize(input) === normalize(answer)
}

// 先頭から shown 文字だけ見せ、残りは「_」。最後の1文字は見せない。
export function hintText(answer: string, shown: number): string {
  const n = Math.min(Math.max(shown, 0), Math.max(answer.length - 1, 0))
  return [...answer].map((c, i) => (i < n ? c : '_')).join(' ')
}

export const XP_SPELL = 15
export const XP_SPELL_HINT = 8 // ヒントを使ったとき

export function spellXp(hints: number): number {
  return hints > 0 ? XP_SPELL_HINT : XP_SPELL
}
