import type { BossGroup } from './bossfilter'
import type { BossLook } from './boss'
import { BossFigure } from './BossView'
import { useState } from 'react'
import { AREA_CHEST_COINS, chestSpot, loadAreaChests, roamSpots, saveAreaChests } from './bossroam'
import { dayKey } from './srs'

export type AreaBoss = { id: string; name: string; look: BossLook; beaten: boolean; golden: boolean; onClick: () => void }
export type AreaSpecial = { id: string; icon: string; name: string; badge?: string; aria?: string; onClick: () => void }

// 出現位置（%）：地図の中にちらばる
const SPOTS = [
  { x: 20, y: 50 },
  { x: 80, y: 50 },
  { x: 35, y: 68 },
  { x: 66, y: 68 },
]

// ボス部屋のエリアの地図：えらんだレベルの土地に、今日の特別なボスが出現する
export function BossArea({ name, group, specials, bosses = [], onCoins }: { name: string; group: BossGroup; specials: AreaSpecial[]; bosses?: AreaBoss[]; onCoins?: (n: number) => void }) {
  const day = dayKey()
  const roam = roamSpots(bosses.length, day)
  const [opened, setOpened] = useState(() => loadAreaChests(day))
  const [got, setGot] = useState(false) // いまひろった
  const chest = chestSpot(group, day)
  return (
    <section className={`barea barea-${group}`} aria-label={`${name}のエリア`}>
      <div className="barea-land">
        <svg className="barea-bg" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true">
          <path className="barea-hill b1" d="M0 120 C 60 80, 120 90, 170 115 S 260 100, 300 85 V180 H0 Z" />
          <path className="barea-hill b2" d="M0 150 C 80 125, 150 140, 210 150 S 280 140, 300 135 V180 H0 Z" />
          <path className="barea-road" d="M10 170 C 60 140, 40 110, 110 105 S 200 120, 230 80 S 270 40, 295 30" />
        </svg>
        <span className="barea-deco d1" aria-hidden="true">{DECO[group][0]}</span>
        <span className="barea-deco d2" aria-hidden="true">{DECO[group][1]}</span>
        <span className="barea-deco d3" aria-hidden="true">{DECO[group][2]}</span>
        {onCoins && !opened.includes(group) && (
          <button
            className="barea-chest"
            style={{ left: `${chest.x}%`, top: `${chest.y}%` }}
            aria-label={`落ちている宝箱をひろう（🪙${AREA_CHEST_COINS}）`}
            onClick={() => {
              const next = [...opened, group]
              setOpened(next)
              saveAreaChests(day, next)
              setGot(true)
              onCoins(AREA_CHEST_COINS)
            }}
          >
            🎁
          </button>
        )}
        {got && (
          <p className="barea-got" role="status">
            ✨ 宝箱をひろった！ 🪙{AREA_CHEST_COINS}
          </p>
        )}
        {bosses.slice(0, roam.length).map((b, i) => (
          <button key={b.id} className={`barea-roam${b.beaten ? ' beaten' : ''}`} style={{ left: `${roam[i].x}%`, top: `${roam[i].y}%`, animationDelay: `${i * 0.4}s` }} aria-label={`うろうろしている${b.name}と戦う${b.beaten ? '（撃破ずみ）' : ''}`} onClick={b.onClick}>
            <span className="barea-roam-fig">
              <BossFigure hit={false} look={b.look} />
            </span>
            <small className="barea-roam-name">
              {b.beaten ? '👑' : ''}
              {b.golden ? '✨' : ''}
              {b.name}
            </small>
          </button>
        ))}
        {specials.length === 0 && bosses.length === 0 && <p className="barea-none">いまは特別なボスはいない…（時間や曜日で出現するよ）</p>}
        {specials.slice(0, SPOTS.length).map((s, i) => (
          <button key={s.id} className="barea-spot" style={{ left: `${SPOTS[i].x}%`, top: `${SPOTS[i].y}%` }} aria-label={s.aria} onClick={s.onClick}>
            <span className="barea-appear" aria-hidden="true">
              出現！
            </span>
            <span className="barea-icon" aria-hidden="true">
              {s.icon}
            </span>
            <strong className="barea-name">{s.name}</strong>
            {s.badge && <small className="barea-badge">{s.badge}</small>}
          </button>
        ))}
      </div>
    </section>
  )
}

const DECO: Record<BossGroup, string[]> = {
  jh: ['🦇', '💎', '🕯'],
  hs: ['🔥', '🌋', '💥'],
  adv: ['⚡', '🏯', '🌩'],
  basic: ['🍄', '🕸', '🌲'],
}
