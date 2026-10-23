// バトルアイテム：ショップで買って、ボス戦で1戦に1回ずつ使える
export type BattleItemId = 'bomb' | 'charm' | 'clock' | 'lucky'
export type BattleItem = { id: BattleItemId; name: string; icon: string; price: number; desc: string; short: string }
export type BattleBag = Record<BattleItemId, number>

export const BATTLE_ITEMS: BattleItem[] = [
  { id: 'bomb', name: 'どっかんボンバー', icon: '💣', price: 30, desc: 'ボスに20ダメージ', short: '20ダメージ' },
  { id: 'charm', name: 'まもりのおまもりん', icon: '🧿', price: 25, desc: 'ハートを1つ回復', short: '❤️+1' },
  { id: 'clock', name: 'スローどけい', icon: '⏳', price: 20, desc: 'この戦いの間、会心の一撃の時間が2倍', short: '会心タイム×2' },
  { id: 'lucky', name: 'ラッキーコイン', icon: '🍀', price: 15, desc: 'この戦いのSランクボーナスが2倍', short: 'Sボーナス×2' },
]
export const BOMB_DAMAGE = 20
export const BAG_MAX = 9

const KEY = 'eitan:battle-items'

export function loadBag(): BattleBag {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<BattleBag>
    const n = (x: unknown) => (typeof x === 'number' && x > 0 ? Math.min(Math.floor(x), BAG_MAX) : 0)
    return { bomb: n(v.bomb), charm: n(v.charm), clock: n(v.clock), lucky: n(v.lucky) }
  } catch {
    return { bomb: 0, charm: 0, clock: 0, lucky: 0 }
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

// ボスのドロップ：3回に1回くらい、バトルアイテムをおとす
export const DROP_RATE = 1 / 3
export function dropOf(r: number): BattleItemId | null {
  if (r >= DROP_RATE) return null
  return r < DROP_RATE / 2 ? 'bomb' : 'charm'
}
