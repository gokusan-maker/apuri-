import { formOf, type MonsterState } from './monster'
import { MonsterFigure } from './MonsterView'
import { ITEMS, type Wallet } from './shop'

type Props = {
  wallet: Wallet
  monster: MonsterState
  onBuy: (id: string) => void
  onWear: (id: string | undefined) => void
  onClose: () => void
}

export function Shop({ wallet, monster, onBuy, onWear, onClose }: Props) {
  const form = formOf(monster)
  const canWear = form.stage > 0
  return (
    <section className="card shop">
      <button className="stage-back" onClick={onClose}>
        ← もどる
      </button>
      <h2>ショップ・着せ替え</h2>
      <p className="stats-note">正解1問で🪙1枚。いまのコイン：🪙 {wallet.coins}</p>
      <div className="shop-preview">
        <MonsterFigure form={form} wear={monster.wear} mood="happy" />
      </div>
      {!canWear && <p className="stats-note">タマゴがかえると着せ替えできるよ。</p>}
      <ul className="badge-grid">
        {ITEMS.map((it) => {
          const owned = wallet.owned.includes(it.id)
          const wearing = monster.wear === it.id
          return (
            <li key={it.id} className={owned ? 'got' : wallet.coins >= it.price ? 'got' : 'locked'}>
              <span className="badge-icon" aria-hidden="true">
                {it.icon}
              </span>
              <span className="badge-name">{it.name}</span>
              {owned ? (
                <button className="shop-btn" disabled={!canWear} onClick={() => onWear(wearing ? undefined : it.id)}>
                  {wearing ? 'はずす' : 'つける'}
                </button>
              ) : (
                <button className="shop-btn" disabled={wallet.coins < it.price} onClick={() => onBuy(it.id)}>
                  🪙{it.price}で買う
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
