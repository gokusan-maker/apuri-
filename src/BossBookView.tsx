import { loadProverbs, PROVERBS } from './proverbs'
import { useState } from 'react'
import { BOSSES, formatSec, loadBossTimes, type BossLook } from './boss'
import { loadBook, SECRET_WINS, secretOf } from './bossbook'
import { BossFigure } from './BossView'
import { UNIV_BOSSES } from './univ'

const GRAY = { color: '#9ca3af', line: '#6b7280', eye: '#e5e7eb' }

// ボス図鑑：ステージのボス・大学入試の塔のボス・倒したレアボスを並べる。まだ倒していないボスはシルエット
// onFight：たおしたことのある単語帳のボスと再戦する（名前で知らせる）
export function BossBook({ onFight }: { onFight?: (name: string) => void } = {}) {
  const [book] = useState(loadBook)
  const [times] = useState(loadBossTimes)
  const base: BossLook[] = [...Object.values(BOSSES), ...UNIV_BOSSES]
  const extra = Object.values(book)
    .map((e) => e.look)
    .filter((l) => !base.some((b) => b.name === l.name))
  const all = [...base, ...extra]
  const beaten = all.filter((b) => book[b.name]).length
  const speedy = all.filter((b) => book[b.name] && (times[b.name] ?? Infinity) < 60).length
  return (
    <details className="boss-book game-fold">
      <summary>
        <span className="lg-icon" aria-hidden="true">📕</span>ボス図鑑
        {speedy > 0 && <span className="fold-meta" aria-label={`スピードクリア ${speedy}体`}>⚡{speedy}</span>}
        <span className="fold-meta" aria-label={`ボス図鑑 ${beaten} / ${all.length}体`}>
          {beaten}/{all.length}
        </span>
      </summary>
      {loadProverbs().length > 0 && (
        <details className="proverb-book chip-fold cf-2">
          <summary>
            📜 ことわざ帳 {loadProverbs().length} / {PROVERBS.length}
          </summary>
          <ul>
            {loadProverbs().map((i) => (
              <li key={i}>
                <strong>{PROVERBS[i].en}</strong> {PROVERBS[i].ja}
              </li>
            ))}
          </ul>
        </details>
      )}
      <ul className="boss-book-list">
        {all.filter((b) => book[b.name]).map((b) => {
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
                  {times[b.name] !== undefined && <>・⏱ 最短 {formatSec(times[b.name])}{times[b.name] < 60 && <strong className="speed-clear"> ⚡ スピードクリア</strong>}</>}
                </span>
              )}
              {e && onFight && Object.values(BOSSES).some((x) => x.name === b.name) && (
                <button className="shop-btn boss-rematch" onClick={() => onFight(b.name)}>
                  ⚔ 再戦する
                </button>
              )}
              {e && (
                <span className="boss-secret">{e.wins >= SECRET_WINS ? `🔓 ひみつ：${secretOf(b.name)}` : `🔒 あと${SECRET_WINS - e.wins}回たおすとひみつが読める`}</span>
              )}
            </li>
          )
        })}
        {/* まだたおしていないボスは1マスの「？×N」にまとめる */}
        {all.some((b) => !book[b.name]) && (
          <li className="locked zukan-more" aria-label={`まだたおしていないボス ${all.filter((b) => !book[b.name]).length}`}>
            ？×{all.filter((b) => !book[b.name]).length}
          </li>
        )}
      </ul>
    </details>
  )
}
