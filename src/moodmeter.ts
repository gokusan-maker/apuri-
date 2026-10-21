// 相棒のごきげんメーター：なでる(+1)・おやつ(+3)・正解(+1)で1日ごとにたまり、満タンの日は XP 1.2倍
export const MOOD_MAX = 20
export const MOOD_BOOST = 1.2
export type MoodMeter = { day: string; points: number }

export const moodNow = (m: MoodMeter, today: string) => (m.day === today ? m.points : 0)
export const addMood = (m: MoodMeter, today: string, n: number): MoodMeter => ({ day: today, points: Math.min(MOOD_MAX, moodNow(m, today) + n) })
export const moodFull = (m: MoodMeter, today: string) => moodNow(m, today) >= MOOD_MAX
export const boosted = (amount: number, full: boolean) => (full && amount > 0 ? Math.round(amount * MOOD_BOOST) : amount)

const KEY = 'eitan:mood-meter'

export function loadMood(): MoodMeter {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as MoodMeter | null
    return v && typeof v.day === 'string' && typeof v.points === 'number' ? v : { day: '', points: 0 }
  } catch {
    return { day: '', points: 0 }
  }
}

export function saveMood(m: MoodMeter): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(m))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
