// スペル入力モードの判定とヒント
export function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ')
}

export function isCorrectSpelling(input: string, answer: string): boolean {
  return normalize(input) === normalize(answer)
}

// 先頭から shown 文字だけ見せ、残りは「_」。最後の1文字は見せない。
// 熟語の単語の区切り（空白）はそのまま見せ、文字数にも数えない
export function hintText(answer: string, shown: number): string {
  const n = Math.min(Math.max(shown, 0), Math.max(letterCount(answer) - 1, 0))
  let seen = 0
  return answer
    .split(' ')
    .map((word) => [...word].map((c) => (seen++ < n ? c : '_')).join(' '))
    .join('   ')
}

export function letterCount(answer: string): number {
  return answer.replace(/\s/g, '').length
}

export const XP_SPELL = 15
export const XP_SPELL_HINT = 8 // ヒントを使ったとき

export function spellXp(hints: number): number {
  return hints > 0 ? XP_SPELL_HINT : XP_SPELL
}

// 押した文字を、答えの空白の位置に空白をはさんでならべる（熟語は単語の区切りを自動で入れる）
export function builtSpelling(answer: string, letters: string[]): string {
  let k = 0
  let out = ''
  for (const c of answer) {
    if (k >= letters.length) break
    out += c === ' ' ? ' ' : letters[k++]
  }
  return out
}
