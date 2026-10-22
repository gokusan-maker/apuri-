// 単語カードを10枚めくるごとに、モチが英語でひとことほめる
export const CHEER_EVERY = 10

export const CARD_CHEERS: { en: string; ja: string }[] = [
  { en: 'Ten cards done! You are on fire!', ja: '10枚クリア！ 絶好調だね！' },
  { en: 'Wow, your brain is growing!', ja: 'わあ、頭がどんどん育ってるよ！' },
  { en: 'Keep going. I believe in you!', ja: 'その調子。きみならできるよ！' },
  { en: 'So many new words. Great job!', ja: '新しい単語がいっぱい。すごいね！' },
  { en: 'You never give up. I like that!', ja: 'あきらめないところ、大好き！' },
  { en: 'Every card makes you a little stronger.', ja: '1枚ごとに、きみは少しずつ強くなっているよ。' },
  { en: 'Wow, you remembered so many!', ja: 'わあ、こんなにたくさん覚えたね！' },
  { en: 'Your hard work is paying off.', ja: 'がんばりが実を結んでいるよ。' },
  { en: "Let's take a deep breath and keep going.", ja: '深呼吸して、続けよう。' },
  { en: 'You are a word master in the making!', ja: 'きみは単語マスターへの道を進んでいるよ！' },
]

// めくった枚数がちょうど10の倍数のときだけ、ひとことを返す
export function cardCheer(done: number): { en: string; ja: string } | null {
  if (done <= 0 || done % CHEER_EVERY !== 0) return null
  return CARD_CHEERS[(done / CHEER_EVERY - 1) % CARD_CHEERS.length]
}

// 1日に50枚めくるごとに、モチからコインのごほうび
export const CARD_BONUS_EVERY = 50
export const CARD_BONUS_COINS = 5
export const isCardBonus = (done: number) => done > 0 && done % CARD_BONUS_EVERY === 0
