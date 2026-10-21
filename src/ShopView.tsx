import { useEffect, useState } from 'react'
import { formOf, type MonsterState } from './monster'
import { MonsterFigure } from './MonsterView'
import { RoomScene } from './RoomSceneView'
import { Gacha } from './GachaView'
import type { Kind } from './monster'
import { FREEZE_MAX, FREEZE_PRICE, priceWith, wearList, ROOMS, shopItems, SNACKS, type Wallet } from './shop'

type Props = {
  wallet: Wallet
  monster: MonsterState
  onBuy: (id: string) => void
  onWear: (id: string | undefined) => void
  onClose: () => void
  snacksLeft: number
  onEat: (id: string) => void
  eventId?: string // 今の季節のイベント（限定の着せ替えを出す）
  onBuyFreeze?: () => void
  onRoom?: (id: string | undefined) => void
  members?: number // 仲間の数（ガチャ用）
  onGacha?: () => Kind | null
  onRaiseNew?: () => void
}

export function Shop({ wallet, monster, onBuy, onWear, onClose, snacksLeft, onEat, onBuyFreeze, onRoom, eventId, members = 1, onGacha, onRaiseNew }: Props) {
  const form = formOf(monster)
  const canWear = form.stage > 0
  const [eating, setEating] = useState<{ icon: string; key: number } | null>(null)
  useEffect(() => {
    if (!eating) return
    const t = window.setTimeout(() => setEating(null), 1800)
    return () => window.clearTimeout(t)
  }, [eating])
  return (
    <section className="card shop">
      <button className="stage-back" onClick={onClose}>
        ← もどる
      </button>
      <h2>ショップ・着せ替え</h2>
      <p className="stats-note">正解1問で🪙1枚。いまのコイン：🪙 {wallet.coins}</p>
      <div className={`shop-stage${wallet.room ? ` room-${wallet.room}` : ''}`}>
        <RoomScene room={wallet.room} />
        <div className="shop-preview">
          <MonsterFigure form={form} wear={monster.wear} kind={monster.kind} mood={eating ? 'eat' : 'happy'} />
          {eating && (
            <span key={eating.key} className="snack-bite" aria-label="もぐもぐ">
              {eating.icon}
            </span>
          )}
        </div>
      </div>
      {onGacha && <Gacha coins={wallet.coins} members={members} onDraw={onGacha} onRaise={onRaiseNew} />}
      <h3 className="shop-h">おやつ（今日あと{snacksLeft}回）</h3>
      <div className="actions snacks">
        {SNACKS.map((sn) => (
          <button
            key={sn.id}
            className="good"
            disabled={snacksLeft <= 0 || wallet.coins < sn.price}
            onClick={() => {
              onEat(sn.id)
              setEating({ icon: sn.icon, key: Date.now() })
            }}
          >
            {sn.icon} {sn.name} 🪙{sn.price}（+{sn.xp}XP）
          </button>
        ))}
      </div>
      <h3 className="shop-h">
        お休みチケット（持っている数 {wallet.freezes ?? 0} / {FREEZE_MAX}）
      </h3>
      <p className="stats-note">1日休んでも、連続学習日数が切れないよ（休んだ次の日に自動で使う）。</p>
      <button
        className="shop-btn freeze-btn"
        disabled={!onBuyFreeze || (wallet.freezes ?? 0) >= FREEZE_MAX || wallet.coins < FREEZE_PRICE}
        onClick={onBuyFreeze}
      >
        🎫 🪙{FREEZE_PRICE}で買う
      </button>
      <h3 className="shop-h">相棒の部屋</h3>
      <ul className="badge-grid">
        {ROOMS.map((r) => {
          const owned = wallet.owned.includes(r.id)
          const using = wallet.room === r.id
          return (
            <li key={r.id} className={`got room-${r.id} room-sample`}>
              <span className="badge-icon" aria-hidden="true">
                {r.icon}
              </span>
              <span className="badge-name">{r.name}</span>
              {owned ? (
                <button className="shop-btn" onClick={() => onRoom?.(using ? undefined : r.id)}>
                  {using ? 'もとにもどす' : 'この部屋にする'}
                </button>
              ) : (
                <button className="shop-btn" disabled={wallet.coins < priceWith(wallet, r.price)} onClick={() => onBuy(r.id)}>
                  🪙{priceWith(wallet, r.price)}で買う
                </button>
              )}
            </li>
          )
        })}
      </ul>
      {(wallet.coupons ?? 0) > 0 && <p className="weekend">🎟 割引券 {wallet.coupons}枚：次の着せ替え・部屋が半額！</p>}
      <h3 className="shop-h">着せ替え</h3>
      {!canWear && <p className="stats-note">タマゴがかえると着せ替えできるよ。</p>}
      <ul className="badge-grid">
        {shopItems(eventId, wallet.owned).map((it) => {
          const owned = wallet.owned.includes(it.id)
          const wearing = wearList(monster.wear).includes(it.id)
          return (
            <li key={it.id} className={owned ? 'got' : wallet.coins >= priceWith(wallet, it.price) ? 'got' : 'locked'}>
              <span className="badge-icon" aria-hidden="true">
                {it.icon}
              </span>
              <span className="badge-name">{it.name}</span>
              {owned ? (
                <button className="shop-btn" disabled={!canWear} onClick={() => onWear(it.id)}>
                  {wearing ? 'はずす' : 'つける'}
                </button>
              ) : (
                <button className="shop-btn" disabled={wallet.coins < priceWith(wallet, it.price)} onClick={() => onBuy(it.id)}>
                  🪙{priceWith(wallet, it.price)}で買う
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
