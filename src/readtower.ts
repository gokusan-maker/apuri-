// 読解の塔：長文1本が1階。6割以上とれたらクリアで次の階へ
import { totalOf, type LongPassage, type LongRecord } from './longreading'

export const TOWER_CLEAR_RATE = 0.6
export const towerCleared = (p: LongPassage, rec: LongRecord) => rec[p.id] !== undefined && rec[p.id] >= Math.ceil(totalOf(p) * TOWER_CLEAR_RATE)

// いま挑む階（0から）。全部クリアなら list.length
export function towerFloor(list: LongPassage[], rec: LongRecord): number {
  const i = list.findIndex((p) => !towerCleared(p, rec))
  return i < 0 ? list.length : i
}
