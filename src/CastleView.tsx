import type { ReactNode } from 'react'
import { castleNow, castleShown } from './castle'

export type CastleFloor = { id: string; label: string; sub?: string; fig?: ReactNode; cleared: boolean }

// 城の塔：1階ずつクリアしてのぼる。夜空・月・山・天守の屋根・旗・石の壁・たいまつ・門と堀
export function Castle({ name, floors, onOpen, theme = 'blue', unit = '階', goLabel = '⚔ のぼる', againLabel = '✅ もう一度' }: { name: string; floors: CastleFloor[]; onOpen: (id: string) => void; theme?: 'blue' | 'red' | 'green' | 'purple'; unit?: string; goLabel?: string; againLabel?: string }) {
  if (floors.length === 0) return null
  const now = castleNow(floors)
  const top = now >= floors.length
  return (
    <section className={`castle castle-${theme}`} aria-label={name}>
      <svg className="castle-sky" viewBox="0 0 360 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle className="castle-moon" cx="236" cy="34" r="13" />
        <path d="M0 120 L40 70 L80 100 L130 55 L180 95 L230 60 L280 100 L320 75 L360 105 L360 120 Z" className="castle-mount" />
      </svg>
      <p className="castle-head">
        <span className="castle-name">🏰 {name}</span>
        <span className="castle-count" aria-label={`${now} / ${floors.length} ${unit}クリア`}>
          {now}/{floors.length}
          {unit}
        </span>
      </p>
      {top && <p className="castle-top">👑 てっぺん制覇！ 城の主になった</p>}
      <div className="castle-body">
        <svg className="castle-roof" viewBox="0 0 320 110" aria-hidden="true">
          {/* 左右の小さな塔 */}
          <g className="castle-turret">
            <rect x="14" y="58" width="44" height="52" />
            <path d="M8 60 L36 14 L64 60 Z" className="castle-cone" />
            <path d="M36 14 L36 2" className="castle-pole" />
            <path className="castle-flag" d="M36 2 L54 7 L36 12 Z" />
            <rect x="31" y="72" width="10" height="16" rx="5" className="castle-slit" />
          </g>
          <g className="castle-turret">
            <rect x="262" y="58" width="44" height="52" />
            <path d="M256 60 L284 14 L312 60 Z" className="castle-cone" />
            <path d="M284 14 L284 2" className="castle-pole" />
            <path className="castle-flag" d="M284 2 L302 7 L284 12 Z" />
            <rect x="279" y="72" width="10" height="16" rx="5" className="castle-slit" />
          </g>
          {/* まん中の天守 */}
          <rect x="98" y="46" width="124" height="64" className="castle-keep" />
          <path d="M90 50 L160 4 L230 50 Z" className="castle-cone big" />
          <path d="M160 4 L160 -10" className="castle-pole" />
          <path className="castle-flag big" d="M160 -10 L188 -3 L160 4 Z" />
          <circle cx="160" cy="34" r="8" className="castle-crest" />
          <rect x="146" y="64" width="28" height="30" rx="14" className="castle-window lit" />
          {/* 城壁のぎざぎざ */}
          <path d="M0 110 V96 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h12 V110 Z" className="castle-battle" />
        </svg>
        <ol className="castle-floors">
          {castleShown(floors.length, now).map((i) => {
            const f = floors[i]
            if (i > now)
              return (
                <li key={f.id} className="locked" aria-label={`${i + 1}${unit}（まだ）`}>
                  <span className="castle-plate">{i + 1}</span>
                  <span className="castle-gate-lock">🔒 とびらはまだ閉じている</span>
                </li>
              )
            const isNow = i === now
            return (
              <li key={f.id} className={isNow ? 'now' : 'cleared'}>
                {isNow && <span className="castle-torch l" aria-hidden="true" />}
                {isNow && <span className="castle-torch r" aria-hidden="true" />}
                {isNow && <span className="castle-ribbon" aria-hidden="true">いまここ</span>}
                <span className="castle-plate">{i + 1}</span>
                {f.fig && <span className="castle-arch">{f.fig}</span>}
                <button className="castle-btn" aria-label={`${i + 1}${unit}：${f.label}${f.cleared ? '（クリア）' : ''}`} onClick={() => onOpen(f.id)}>
                  <span className="castle-label">{f.label}</span>
                  {f.sub && <small className="castle-sub">{f.sub}</small>}
                  <span className="castle-go">{isNow ? goLabel : againLabel}</span>
                </button>
              </li>
            )
          })}
        </ol>
        {now > 2 && <p className="castle-below">⬇ {now - 2}{unit}ぶん、制覇ずみ</p>}
        <div className="castle-gate" aria-hidden="true">
          <span className="castle-door">
            <i />
          </span>
        </div>
        <div className="castle-moat" aria-hidden="true" />
      </div>
    </section>
  )
}
