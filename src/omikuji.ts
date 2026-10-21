// 毎日のおみくじ：日付で決まる（1日のうちは同じ）。大吉の日はガチャが安くなる
export const OMIKUJI = [
  { id: 'daikichi', name: '大吉', text: 'ガチャが🪙5引き！ 新しい単語もどんどん覚えられそう' },
  { id: 'chukichi', name: '中吉', text: '復習がはかどる日。苦手な単語に挑戦しよう' },
  { id: 'kichi', name: '吉', text: 'こつこつ続けるといいことがあるよ' },
  { id: 'shokichi', name: '小吉', text: '1問ずつでOK。モンスターがおうえんしてるよ' },
] as const
export type Omikuji = (typeof OMIKUJI)[number]
export const OMIKUJI_DISCOUNT = 5

// 大吉 1/4、中吉 1/4、吉 1/4、小吉 1/4
export function omikujiOf(day: string): Omikuji {
  let h = 7
  for (const c of `omikuji-${day}`) h = (h * 33 + c.charCodeAt(0)) >>> 0
  return OMIKUJI[h % OMIKUJI.length]
}

export const omikujiDiscount = (day: string) => (omikujiOf(day).id === 'daikichi' ? OMIKUJI_DISCOUNT : 0)
