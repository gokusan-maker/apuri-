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
