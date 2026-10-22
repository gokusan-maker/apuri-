import { PIECES_FOR_EGG } from './buddies'
import { useEffect, useState } from 'react'
import { BAG_MAX, BATTLE_ITEMS, type BattleBag, type BattleItemId } from './battleitems'
import { formOf, type MonsterState, type Species } from './monster'
import { MonsterFigure } from './MonsterView'
import { RoomScene } from './RoomSceneView'
import { Gacha } from './GachaView'
import { pityLeft } from './gacha'
import type { GachaResult } from './GachaView'
import { loadOutfits, saveOutfits, FREEZE_MAX, FREEZE_PRICE, priceWith, wearList, ROOMS, shopItems, SNACKS, type Wallet } from './shop'

type Props = {
  initialTab?: ShopTab // はじめに開く売り場
  wallet: Wallet
  monster: MonsterState
  onBuy: (id: string) => void
  onWear: (id: string | undefined) => void
  onSetWear?: (wear: string | undefined) => void // 保存したコーデに切りかえる
  onClose: () => void
  snacksLeft: number
  onEat: (id: string) => void
  eventId?: string // 今の季節のイベント（限定の着せ替えを出す）
  onBuyFreeze?: () => void
  onRoom?: (id: string | undefined) => void
  members?: number // 仲間の数（ガチャ用）
  onGacha?: (ticket: boolean) => GachaResult | null
  onRaiseNew?: () => void
  dragonUp?: boolean
  pickup?: Species // 日替わりピックアップ
  gachaPrice?: number // ガチャの値段
  gachaPoints?: number // ガチャポイント
  stickers?: string[] // 集めたシール
  boostColor?: string // 今日のおすすめ色の名前
  luckyBag?: boolean // 今月の福袋が買える
  onLuckyBag?: () => GachaResult[]
  onExchange?: () => GachaResult | null // ポイントでスーパーレア以上と交換
  onGachaMulti?: (n: number) => GachaResult[] // まとめて引く
  stepLeft?: number // ステップアップ：あと何回でレア以上確定
  bag?: BattleBag // 持っているバトルアイテム
  onBuyBattle?: (id: BattleItemId) => void
  favSnack?: string // 相棒のきょうの好物（おやつのid）
  attrEgg?: { price: number; left: number; pieces?: number; onBuy: () => string | null } // 属性のタマゴ（文法・読解のなかま）。pieces：タマゴのかけら
}

export type ShopTab = 'gacha' | 'snack' | 'item' | 'wear'
const SHOP_TABS: { id: ShopTab; label: string }[] = [
  { id: 'gacha', label: '🎰 ガチャ' },
  { id: 'snack', label: '🍪 おやつ' },
  { id: 'wear', label: '👗 きせかえ' },
  { id: 'item', label: '🎒 アイテム' },
]

export function Shop({ initialTab, wallet, monster, onBuy, onWear, onSetWear, onClose, snacksLeft, onEat, onBuyFreeze, onRoom, eventId, members = 1, onGacha, onRaiseNew, dragonUp = false, pickup, favSnack, stepLeft, bag, onBuyBattle, gachaPrice, onGachaMulti, gachaPoints, onExchange, stickers, boostColor, luckyBag, onLuckyBag, attrEgg }: Props) {
  const form = formOf(monster)
  const canWear = form.stage > 0
  const [eating, setEating] = useState<{ icon: string; key: number } | null>(null)
  const [outfits, setOutfits] = useState(loadOutfits)
  const [tab, setTab] = useState<ShopTab>(initialTab ?? (onGacha ? 'gacha' : 'snack'))
  const tabs = SHOP_TABS.filter((t) => t.id !== 'gacha' || onGacha)
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
        <RoomScene room={wallet.room} align="xMaxYMax" />
        <div className="shop-preview">
          <MonsterFigure form={form} wear={monster.wear} kind={monster.kind} mood={eating ? 'eat' : 'happy'} />
          {eating && (
            <span key={eating.key} className="snack-bite" aria-label="もぐもぐ">
              {eating.icon}
            </span>
          )}
        </div>
      </div>
      <div className="shop-tabs" role="tablist" aria-label="ショップの売り場">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} className={tab === t.id ? 'on' : undefined} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'gacha' && attrEgg && <AttrEgg {...attrEgg} coins={wallet.coins} />}
      {tab === 'gacha' && onGacha && <Gacha partnerName={monster.name ?? form.name} coins={wallet.coins} members={members} tickets={wallet.tickets} pityLeft={pityLeft(wallet)} dragonUp={dragonUp} pickup={pickup} stepLeft={stepLeft} price={gachaPrice} onDraw={onGacha} onDrawMulti={onGachaMulti} onRaise={onRaiseNew} points={gachaPoints} onExchange={onExchange} stickers={stickers} boostColor={boostColor} luckyBag={luckyBag} onLuckyBag={onLuckyBag} />}
      {tab === 'snack' && (
        <>
      <h3 className="shop-h">おやつ（今日あと{snacksLeft}回）</h3>
      <div className="actions snacks">
        {SNACKS.map((sn) => (
          <button
            key={sn.id}
            className={`good${favSnack === sn.id ? ' fav-snack' : ''}`}
            disabled={snacksLeft <= 0 || wallet.coins < sn.price}
            onClick={() => {
              onEat(sn.id)
              setEating({ icon: sn.icon, key: Date.now() })
            }}
          >
            {favSnack === sn.id && <span className="fav-snack-tag">💕 きょうの好物 XP2倍！</span>}
            {sn.icon} {sn.name} 🪙{sn.price}（+{favSnack === sn.id ? sn.xp * 2 : sn.xp}XP）
          </button>
        ))}
      </div>
        </>
      )}
      {tab === 'item' && (
        <>
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
      {bag && onBuyBattle && (
        <>
          <h3 className="shop-h">⚔️ バトルアイテム（ボス戦で1戦1回ずつ使える）</h3>
          <div className="snacks">
            {BATTLE_ITEMS.map((it) => (
              <button key={it.id} className="good" disabled={wallet.coins < it.price || bag[it.id] >= BAG_MAX} onClick={() => onBuyBattle(it.id)}>
                {it.icon} {it.name} 🪙{it.price}（{it.desc}・持っている数 {bag[it.id]}）
              </button>
            ))}
          </div>
        </>
      )}
        </>
      )}
      {tab === 'wear' && (
        <>
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
      {canWear && onSetWear && (
        <div className="outfits" role="group" aria-label="コーデ保存">
          {outfits.map((o, i) => (
            <span key={i} className="outfit">
              <button className="list-link" disabled={o === null} onClick={() => onSetWear(o || undefined)}>
                👗 コーデ{i + 1}{o === null ? '（空き）' : o ? '' : '（なし）'}
              </button>
              <button
                className="list-link"
                aria-label={`いまの着せかえをコーデ${i + 1}に保存`}
                onClick={() => {
                  const next = outfits.map((x, k) => (k === i ? (monster.wear ?? '') : x))
                  setOutfits(next)
                  saveOutfits(next)
                }}
              >
                💾
              </button>
            </span>
          ))}
        </div>
      )}
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
        </>
      )}
    </section>
  )
}

// 属性のタマゴ：文法・読解のなかまがふえる（なにが出るかはお楽しみ）
function AttrEgg({ price, left, pieces, onBuy, coins }: { price: number; left: number; pieces?: number; onBuy: () => string | null; coins: number }) {
  const [msg, setMsg] = useState('')
  return (
    <div className="attr-egg">
      <button className="attr-egg-btn" disabled={left === 0 || coins < price} onClick={() => setMsg(onBuy() ?? '')}>
        🥚 属性のタマゴ（文法・読解のなかま）🪙{price}
        <small>{left === 0 ? 'もう全員なかまになったよ！' : 'なにが生まれるかはお楽しみ！'}</small>
      </button>
      {pieces !== undefined && left > 0 && (
        <p className="stats-note">🥚 タマゴのかけら {pieces} / {PIECES_FOR_EGG}（ボス部屋で勝つと1つ。そろうと無料でかえる）</p>
      )}
      {msg && (
        <p className="level-up" role="status">
          {msg}
        </p>
      )}
    </div>
  )
}
