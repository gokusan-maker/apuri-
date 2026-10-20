import { BADGES, type Earned } from './badges'

// 思い出アルバム：もらったバッジを日付順にならべる
export function albumEntries(earned: Earned) {
  return BADGES.filter((b) => earned[b.id])
    .map((b) => ({ ...b, day: earned[b.id] }))
    .sort((a, b) => a.day.localeCompare(b.day))
}
