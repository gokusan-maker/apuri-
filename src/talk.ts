// 相棒のひとこと（英語＋日本語訳）
export type Line = { en: string; ja: string }

export const LINES: Line[] = [
  { en: "Let's study together!", ja: 'いっしょに勉強しよう！' },
  { en: 'You can do it!', ja: 'きみならできる！' },
  { en: 'Good job today!', ja: '今日もよくがんばったね！' },
  { en: "I'm hungry for new words!", ja: '新しい単語が食べたいな！' },
  { en: 'One more question?', ja: 'もう1問どう？' },
  { en: 'Practice makes perfect.', ja: '練習あるのみ！' },
  { en: 'I like learning with you.', ja: 'きみと勉強するのが好きだよ。' },
  { en: 'Never give up!', ja: 'あきらめないで！' },
]

export const EGG_LINE: Line = { en: '...knock, knock.', ja: '（タマゴの中からコトコト音がする）' }
export const LONELY_LINE: Line = { en: 'I missed you!', ja: '会いたかったよ！' }

export function pickLine(stage: number, lonely: boolean, r: number): Line {
  if (stage === 0) return EGG_LINE
  if (lonely) return LONELY_LINE
  return LINES[Math.floor(r * LINES.length) % LINES.length]
}
