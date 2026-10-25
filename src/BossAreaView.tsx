import type { BossGroup } from './bossfilter'

export type AreaSpecial = { id: string; icon: string; name: string; badge?: string; aria?: string; onClick: () => void }

// 出現位置（%）：地図の中にちらばる
const SPOTS = [
  { x: 22, y: 58 },
  { x: 74, y: 40 },
  { x: 48, y: 76 },
  { x: 80, y: 78 },
]

// ボス部屋のエリアの地図：えらんだレベルの土地に、今日の特別なボスが出現する
export function BossArea({ name, group, specials }: { name: string; group: BossGroup; specials: AreaSpecial[] }) {
  return (
    <section className={`barea barea-${group}`} aria-label={`${name}のエリア`}>
      <p className="barea-title">🗺 {name}のエリア</p>
      <div className="barea-land">
        <svg className="barea-bg" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true">
          <path className="barea-hill b1" d="M0 120 C 60 80, 120 90, 170 115 S 260 100, 300 85 V180 H0 Z" />
          <path className="barea-hill b2" d="M0 150 C 80 125, 150 140, 210 150 S 280 140, 300 135 V180 H0 Z" />
          <path className="barea-road" d="M10 170 C 60 140, 40 110, 110 105 S 200 120, 230 80 S 270 40, 295 30" />
        </svg>
        <span className="barea-deco d1" aria-hidden="true">{DECO[group][0]}</span>
        <span className="barea-deco d2" aria-hidden="true">{DECO[group][1]}</span>
        <span className="barea-deco d3" aria-hidden="true">{DECO[group][2]}</span>
        {specials.length === 0 && <p className="barea-none">いまは特別なボスはいない…（時間や曜日で出現するよ）</p>}
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
  jh: ['🌳', '🏫', '🌸'],
  hs: ['🌵', '🏜', '🦂'],
  adv: ['⛄', '❄️', '🌌'],
  basic: ['🌷', '🍄', '🐣'],
}
