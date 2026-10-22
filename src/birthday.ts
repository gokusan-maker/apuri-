// 相棒のおたんじょう日：タマゴからかえった日（はじめてかえった姿を見た日）を覚えて、1年ごとにお祝い（🎟1）
const KEY = 'eitan:partner-birthday'
export type Birthday = { day: string; lastYear: number } // day は 'YYYY-MM-DD'。lastYear はお祝いした年

export function loadBirthday(): Birthday {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<Birthday> | null
    if (v && typeof v.day === 'string') return { day: v.day, lastYear: typeof v.lastYear === 'number' ? v.lastYear : 0 }
  } catch {
    // こわれていたらはじめから
  }
  return { day: '', lastYear: 0 }
}

export function saveBirthday(b: Birthday): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(b))
  } catch {
    // 保存できなくても続ける
  }
}

// かえっていて、まだ誕生日がなければ今日を誕生日にする
export const registerBirthday = (b: Birthday, today: string, hatched: boolean): Birthday => (!b.day && hatched ? { day: today, lastYear: 0 } : b)

const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0

// 今日がお祝いできる誕生日なら何才か（1以上）。ちがえば 0。2/29生まれは、うるう年でない年は2/28
export function birthdayAge(b: Birthday, today: string): number {
  if (!b.day) return 0
  const y = Number(today.slice(0, 4))
  const age = y - Number(b.day.slice(0, 4))
  if (age < 1 || b.lastYear === y) return 0
  let md = b.day.slice(5)
  if (md === '02-29' && !isLeap(y)) md = '02-28'
  return today.slice(5) === md ? age : 0
}

export const BIRTHDAY_TICKETS = 1
