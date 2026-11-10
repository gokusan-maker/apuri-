import type { ReactNode } from 'react'
import { BossFigure } from './BossView'
import type { BossLook } from './boss'
import { castleNow } from './castle'

export type TowerFloor = { id: string; label: string; sub?: string; look: BossLook; cleared: boolean; extra?: ReactNode }

// 闇にまぎれたシルエット：体は黒く、目だけが赤く光る（まだ挑めない階のボス）
const shadowOf = (look: BossLook): BossLook => ({ ...look, color: '#0b0a14', line: '#000000', eye: '#ff2d55' })

// ボスの塔：赤い月・稲妻・霧の中にそびえる塔。どの階にもボスが窓ごしに見えている（オーナーの要望）
// たおした階のボスは「撃破」の札つきで色あせ、いまの階のボスはたいまつに照らされ、上の階はシルエットで待ちかまえる。
// てっぺんにはレベルのボスが、オーラをまとって玉座にいる。
export function BossTower({ name, floors, onOpen }: { name: string; floors: TowerFloor[]; onOpen: (id: string) => void }) {
  if (floors.length === 0) return null
  const now = castleNow(floors)
  const top = now >= floors.length
  const last = floors.length - 1
  return (
    <section className={`btower${top ? ' conquered' : ''}`} aria-label={name}>
      <div className="btower-sky" aria-hidden="true">
        <span className="btower-moon" />
        <svg className="btower-bolt" viewBox="0 0 40 120">
          <path d="M24 0 L8 52 L20 52 L6 120 L34 40 L21 40 L32 0 Z" />
        </svg>
        <svg className="btower-bats" viewBox="0 0 120 40">
          <path d="M10 20 q6 -8 12 0 q6 -8 12 0 q-6 2 -12 6 q-6 -4 -12 -6 Z" />
          <path d="M70 10 q4 -6 8 0 q4 -6 8 0 q-4 1 -8 4 q-4 -3 -8 -4 Z" />
          <path d="M96 28 q3 -5 6 0 q3 -5 6 0 q-3 1 -6 3 q-3 -2 -6 -3 Z" />
        </svg>
        <span className="btower-fog f1" />
        <span className="btower-fog f2" />
      </div>
      <p className="btower-head">
        <span className="btower-name">🏯 {name}</span>
        <span className="btower-count" aria-label={`${now} / ${floors.length} 階クリア`}>
          {now}/{floors.length}階
        </span>
      </p>
      {top && <p className="btower-top">👑 てっぺん制覇！ この塔のボスは全員たおした</p>}
      <div className="btower-spire" aria-hidden="true">
        <svg viewBox="0 0 200 70">
          <path d="M100 0 L112 30 L88 30 Z" className="bt-tip" />
          <path d="M60 70 L100 18 L140 70 Z" className="bt-cone" />
          <path d="M20 70 L40 40 L60 70 Z M140 70 L160 40 L180 70 Z" className="bt-cone side" />
          <circle cx="100" cy="50" r="7" className="bt-eye" />
        </svg>
      </div>
      <ol className="btower-floors">
        {floors
          .map((f, i) => ({ f, i }))
          .reverse()
          .map(({ f, i }) => {
            const locked = i > now
            const isNow = i === now
            const boss = i === last
            const state = locked ? 'locked' : isNow ? 'now' : 'cleared'
            return (
              <li key={f.id} className={`bt-floor ${state}${boss ? ' boss' : ''}`}>
                <span className="bt-plate" aria-hidden="true">
                  {boss ? '👑' : `${i + 1}F`}
                </span>
                <span className="bt-window" aria-hidden="true">
                  {boss && <span className="bt-aura" />}
                  {isNow && <span className="bt-torch l" />}
                  {isNow && <span className="bt-torch r" />}
                  <span className="bt-fig">
                    <BossFigure hit={false} look={locked ? shadowOf(f.look) : f.look} />
                  </span>
                  {!locked && !isNow && <span className="bt-stamp">撃破</span>}
                  {locked && <span className="bt-bars" />}
                </span>
                {locked ? (
                  <span className="bt-info" aria-label={`${i + 1}階（まだ）`}>
                    <span className="bt-label">{boss ? '？？？（この塔の主）' : '？？？'}</span>
                    <small className="bt-sub">🔒 下の階のボスをたおすと、とびらが開く</small>
                  </span>
                ) : (
                  <button className="bt-btn" aria-label={`${i + 1}階：${f.label}${f.cleared ? '（クリア）' : ''}`} onClick={() => onOpen(f.id)}>
                    <span className="bt-label">{f.label}</span>
                    {f.sub && <small className="bt-sub">{f.sub}</small>}
                    {f.extra}
                    <span className="bt-go">{isNow ? (boss ? '⚔ 決戦にいどむ' : '⚔ のぼる') : '✅ もう一度'}</span>
                  </button>
                )}
              </li>
            )
          })}
      </ol>
      <div className="btower-gate" aria-hidden="true">
        <span className="bt-door" />
      </div>
    </section>
  )
}
