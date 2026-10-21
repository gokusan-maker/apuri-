import { useState } from 'react'
import { BOSSES, type BossLook } from './boss'
import { loadBook } from './bossbook'
import { BossFigure } from './BossView'
import { UNIV_BOSSES } from './univ'

const GRAY = { color: '#9ca3af', line: '#6b7280', eye: '#e5e7eb' }

// ボス図鑑：ステージのボス・大学入試の塔のボス・倒したレアボスを並べる。まだ倒していないボスはシルエット
export function BossBook() {
  const [book] = useState(loadBook)
  const base: BossLook[] = [...Object.values(BOSSES), ...UNIV_BOSSES]
  const extra = Object.values(book)
    .map((e) => e.look)
    .filter((l) => !base.some((b) => b.name === l.name))
  const all = [...base, ...extra]
  const beaten = all.filter((b) => book[b.name]).length
  return (
    <details className="boss-book">
      <summary>
        📕 ボス図鑑（{beaten} / {all.length}体）
      </summary>
      <ul className="boss-book-list">
        {all.map((b) => {
          const e = book[b.name]
          return (
            <li key={b.name} className={e ? 'got' : 'locked'}>
              <span className="boss-book-fig">
                <BossFigure hit={false} look={e ? b : { ...b, ...GRAY }} />
              </span>
              <span className="badge-name">{e ? b.name : '？？？'}</span>
              {e && (
                <span className="badge-desc">
                  {e.wins}回たおした・最高 <strong className={`rank-mini rank-${e.best}`}>{e.best}</strong>
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </details>
  )
}
