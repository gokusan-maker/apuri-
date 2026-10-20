// 季節のイベント（期間は月日で決まる）
export type SeasonEvent = { id: string; name: string; icon: string; text: string; from: string; to: string }

export const EVENTS: SeasonEvent[] = [
  { id: 'newyear', name: 'お正月', icon: '🎍', text: 'Happy New Year! 今年もいっしょにがんばろう', from: '01-01', to: '01-07' },
  { id: 'tanabata', name: '七夕', icon: '🎋', text: '願いごとは英語で書けるかな？ I wish ...', from: '07-01', to: '07-07' },
  { id: 'halloween', name: 'ハロウィン', icon: '🎃', text: 'Trick or treat! ハロウィンウィーク', from: '10-24', to: '10-31' },
  { id: 'christmas', name: 'クリスマス', icon: '🎄', text: 'Merry Christmas! クリスマスウィーク', from: '12-18', to: '12-25' },
]

// day は YYYY-MM-DD
export function eventFor(day: string): SeasonEvent | null {
  const md = day.slice(5)
  return EVENTS.find((e) => e.from <= md && md <= e.to) ?? null
}
