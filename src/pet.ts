// 相棒をなでた回数（1日ごと）。5回目は「ごきげんMAX」でコインのおまけ、なですぎるとくすぐったがる
export type PetLog = { day: string; count: number }
export type PetReaction = 'normal' | 'max' | 'tickle'

export const PET_MAX_AT = 5
export const PET_TICKLE_FROM = 15
export const PET_BONUS = 3 // ごきげんMAX のコイン（1日1回）

const KEY = 'eitan:pet'

export function loadPetLog(): PetLog {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? 'null') as PetLog | null
    return v && typeof v.day === 'string' && typeof v.count === 'number' ? v : { day: '', count: 0 }
  } catch {
    return { day: '', count: 0 }
  }
}

export function savePetLog(l: PetLog): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(l))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 1回なでたあとの記録（日がかわったら数えなおし）
export function nextPet(l: PetLog, today: string): PetLog {
  return { day: today, count: l.day === today ? l.count + 1 : 1 }
}

export function petReaction(count: number): PetReaction {
  if (count === PET_MAX_AT) return 'max'
  if (count >= PET_TICKLE_FROM) return 'tickle'
  return 'normal'
}

// なでなでスタンプカード：なでた日に1スタンプ。10個たまるごとに🎟1
export const PET_STAMPS_FOR_TICKET = 10
export type PetStamps = { n: number; last: string }
const STAMP_KEY = 'eitan:pet-stamps'
export function loadPetStamps(): PetStamps {
  try {
    const v = JSON.parse(localStorage.getItem(STAMP_KEY) ?? 'null') as Partial<PetStamps> | null
    return { n: typeof v?.n === 'number' && v.n > 0 ? Math.floor(v.n) : 0, last: typeof v?.last === 'string' ? v.last : '' }
  } catch {
    return { n: 0, last: '' }
  }
}
// その日はじめてなでたらスタンプ。チケットの日なら ticket が true
export function stampPet(s: PetStamps, today: string): { stamps: PetStamps; ticket: boolean } {
  if (s.last === today) return { stamps: s, ticket: false }
  const n = s.n + 1
  const stamps = { n, last: today }
  try {
    localStorage.setItem(STAMP_KEY, JSON.stringify(stamps))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return { stamps, ticket: n % PET_STAMPS_FOR_TICKET === 0 }
}
