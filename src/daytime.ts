// 夜かどうか（19時〜翌5時）。相棒の部屋を暗くするのに使う
export const isNight = (hour: number) => hour >= 19 || hour < 5
// 時間帯：朝（5〜10時）・昼（10〜16時）・夕方（16〜19時）・夜。相棒の部屋の背景の色を変える（オーナーの依頼：デザインを高める）
export type Daypart = 'morning' | 'day' | 'evening' | 'night'
export function daypartOf(hour: number): Daypart {
  if (isNight(hour)) return 'night'
  if (hour < 10) return 'morning'
  if (hour < 16) return 'day'
  return 'evening'
}
