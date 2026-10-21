// バトルアイテム：ショップで買って、ボス戦で1戦に1回ずつ使える
export type BattleItemId = 'bomb' | 'charm'
export type BattleItem = { id: BattleItemId; name: string; icon: string; price: number; desc: string }
export type BattleBag = Record<BattleItemId, number>

export const BATTLE_ITEMS: BattleItem[] = [
  { id: 'bomb', name: 'どっかんボンバー', icon: '💣', price: 30, desc: 'ボスに20ダメージ' },
  { id: 'charm', name: 'まもりのおまもりん', icon: '🧿', price: 25, desc: 'ハートを1つ回復' },
]
export const BOMB_DAMAGE = 20
export const BAG_MAX = 9

const KEY = 'eitan:battle-items'

export function loadBag(): BattleBag {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<BattleBag>
    const n = (x: unknown) => (typeof x === 'number' && x > 0 ? Math.min(Math.floor(x), BAG_MAX) : 0)
    return { bomb: n(v.bomb), charm: n(v.charm) }
  } catch {
    return { bomb: 0, charm: 0 }
  }
}

export function saveBag(b: BattleBag): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(b))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

export const addItem = (b: BattleBag, id: BattleItemId): BattleBag => ({ ...b, [id]: Math.min(BAG_MAX, b[id] + 1) })
export const spendItem = (b: BattleBag, id: BattleItemId): BattleBag => ({ ...b, [id]: Math.max(0, b[id] - 1) })
