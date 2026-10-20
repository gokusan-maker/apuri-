export type Habit = {
  id: string
  name: string
  doneDates: string[]
}

const STORAGE_KEY = 'mainichi-shukan:habits'

export function todayKey(date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Habit[]) : []
  } catch {
    return []
  }
}

export function saveHabits(habits: Habit[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

export function toggleDone(habit: Habit, day: string): Habit {
  const done = habit.doneDates.includes(day)
  return {
    ...habit,
    doneDates: done ? habit.doneDates.filter((d) => d !== day) : [...habit.doneDates, day],
  }
}
