// 相棒のなつき度：学習した日数（連続でなくてよい）で ❤️ がふえる（最大5）
export const BOND_DAYS = [1, 3, 7, 14, 30]

export function bondLevel(studyDays: number): number {
  return BOND_DAYS.filter((d) => studyDays >= d).length
}

export function bondHearts(level: number): string {
  return '❤️'.repeat(level) + '🤍'.repeat(BOND_DAYS.length - level)
}

// 次の ❤️ まであと何日（最大なら null）
export function daysToNext(studyDays: number): number | null {
  const next = BOND_DAYS.find((d) => studyDays < d)
  return next === undefined ? null : next - studyDays
}
