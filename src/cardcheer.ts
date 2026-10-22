// 単語カードを10枚めくるごとに、モチが英語でひとことほめる
export const CHEER_EVERY = 10

export const CARD_CHEERS: { en: string; ja: string }[] = [
  { en: 'Ten cards done! You are on fire!', ja: '10枚クリア！ 絶好調だね！' },
  { en: 'Wow, your brain is growing!', ja: 'わあ、頭がどんどん育ってるよ！' },
  { en: 'Keep going. I believe in you!', ja: 'その調子。きみならできるよ！' },
  { en: 'So many new words. Great job!', ja: '新しい単語がいっぱい。すごいね！' },
  { en: 'You never give up. I like that!', ja: 'あきらめないところ、大好き！' },
]

// めくった枚数がちょうど10の倍数のときだけ、ひとことを返す
export function cardCheer(done: number): { en: string; ja: string } | null {
  if (done <= 0 || done % CHEER_EVERY !== 0) return null
  return CARD_CHEERS[(done / CHEER_EVERY - 1) % CARD_CHEERS.length]
}
