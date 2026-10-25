// ボス部屋の「とくべつイベント」：塔・ボスラッシュなどは横にならべず、日によって1つだけ出現する（出ない日もある）
import { isNightTime } from './rareboss'

export type SpecialEventId = 'gold' | 'night' | 'rush-ex' | 'weekend' | 'endless' | 'rush' | 'time' | 'rare' | 'univ'

// ふだんの日のまわり順（null はイベントのない日）
const DAILY: (SpecialEventId | null)[] = ['endless', 'rush', null, 'time', 'rare', 'univ', null]

const dayNumber = (day: string) => {
  const [y, m, d] = day.split('-').map(Number)
  return Math.floor(Date.UTC(y, (m || 1) - 1, d || 1) / 86400000)
}

// 金の宝箱があけられるときはそれを最優先。週末は週末イベント。ふだんの日は日がわり、イベントのない日の夜はナイトボス
export function specialEventOf(day: string, opts: { hour: number; weekend: boolean; goldReady: boolean }): SpecialEventId | null {
  if (opts.goldReady) return 'gold'
  const n = dayNumber(day)
  if (opts.weekend) return n % 2 === 0 ? 'rush-ex' : 'weekend'
  const ev = DAILY[((n % DAILY.length) + DAILY.length) % DAILY.length]
  if (ev === null && isNightTime(opts.hour)) return 'night'
  return ev
}

// イベントの見出し（いつまでか）
export const SPECIAL_EVENT_NOTE: Record<SpecialEventId, string> = {
  gold: '鍵がそろった！',
  night: '夜10時まで',
  'rush-ex': '週末だけ',
  weekend: '週末だけ',
  endless: '今日だけ',
  rush: '今日だけ',
  time: '今日だけ',
  rare: '今日だけ',
  univ: '今日だけ',
}
