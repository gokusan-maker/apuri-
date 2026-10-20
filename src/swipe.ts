// カードのスワイプ判定：一定以上動かしたら答えとみなす
export const SWIPE_DISTANCE = 80

export function swipeResult(dx: number, dy: number): 'good' | 'again' | null {
  if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dy) > Math.abs(dx)) return null
  return dx > 0 ? 'good' : 'again'
}
