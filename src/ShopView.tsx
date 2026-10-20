import { formOf, type MonsterState } from './monster'
import { MonsterFigure } from './MonsterView'
import { FREEZE_MAX, FREEZE_PRICE, ITEMS, SNACKS, type Wallet } from './shop'

type Props = {
  wallet: Wallet
  monster: MonsterState
  onBuy: (id: string) => void
  onWear: (id: string | undefined) => void
  onClose: () => void
  snacksLeft: number
  onEat: (id: string) => void
  onBuyFreeze?: () => void
}

export function Shop({ wallet, monster, onBuy, onWear, onClose, snacksLeft, onEat, onBuyFreeze }: Props) {
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
      <h3 className="shop-h">おやつ（今日あと{snacksLeft}回）</h3>
      <div className="actions snacks">
        {SNACKS.map((sn) => (
          <button key={sn.id} className="good" disabled={snacksLeft <= 0 || wallet.coins < sn.price} onClick={() => onEat(sn.id)}>
            {sn.icon} {sn.name} 🪙{sn.price}（+{sn.xp}XP）
          </button>
        ))}
      </div>
      <h3 className="shop-h">お休みチケット（持っている数 {wallet.freezes ?? 0} / {FREEZE_MAX}）</h3>
      <p className="stats-note">1日休んでも、連続学習日数が切れないよ（休んだ次の日に自動で使う）。</p>
      <button
        className="shop-btn freeze-btn"
        disabled={!onBuyFreeze || (wallet.freezes ?? 0) >= FREEZE_MAX || wallet.coins < FREEZE_PRICE}
        onClick={onBuyFreeze}
      >
        🎫 🪙{FREEZE_PRICE}で買う
      </button>
      <h3 className="shop-h">着せ替え</h3>
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
