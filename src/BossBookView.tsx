import { loadProverbs, PROVERBS } from './proverbs'
import { useState } from 'react'
import { BOSSES, BOSS_TRAITS, bossBgOf, formatSec, loadBossTimes, traitOf, type BossLook } from './boss'
import { BossArena } from './BossArenaView'
import { loadBook, SECRET_WINS, secretOf } from './bossbook'
import { BossFigure } from './BossView'
import { UNIV_BOSSES } from './univ'

const GRAY = { color: '#9ca3af', line: '#6b7280', eye: '#e5e7eb' }
// 図鑑のカードの背景：そのボスと戦った舞台（単語帳のボスはレベルの舞台、それ以外は城）
const arenaOf = (name: string) => {
  const lv = (Object.keys(BOSSES) as (keyof typeof BOSSES)[]).find((k) => BOSSES[k].name === name)
  return lv ? bossBgOf(lv) : 'castle'
}

// ボス図鑑：ステージのボス・大学入試の塔のボス・倒したレアボスを並べる。まだ倒していないボスはシルエット
// onFight：たおしたことのある単語帳のボスと再戦する（名前で知らせる）
export function BossBook({ onFight }: { onFight?: (name: string) => void } = {}) {
  const [book] = useState(loadBook)
  const [times] = useState(loadBossTimes)
  const [only, setOnly] = useState<keyof typeof BOSS_TRAITS | null>(null) // とくぎでしぼりこむ
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
      <details className="trait-guide chip-fold cf-1">
        <summary>🔮 とくぎのしくみ（4しゅるい）</summary>
        <ul>
          {(Object.keys(BOSS_TRAITS) as (keyof typeof BOSS_TRAITS)[]).map((t) => (
            <li key={t}>
              <strong>
                {BOSS_TRAITS[t].icon} {BOSS_TRAITS[t].name}
              </strong>
              ：{BOSS_TRAITS[t].desc}
              <small>（{all.filter((b) => traitOf(b.name) === t).length}体）</small>
            </li>
          ))}
          <li>🔒 とくぎを1回も発動させずに勝つと「とくぎ封じ」で🪙ボーナス</li>
        </ul>
      </details>
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
      {beaten > 0 && (
        <div className="trait-filter" role="group" aria-label="とくぎでしぼる">
          <button className={only === null ? 'on' : ''} aria-pressed={only === null} onClick={() => setOnly(null)}>
            すべて
          </button>
          {(Object.keys(BOSS_TRAITS) as (keyof typeof BOSS_TRAITS)[]).map((t) => (
            <button key={t} className={only === t ? 'on' : ''} aria-pressed={only === t} aria-label={BOSS_TRAITS[t].name} onClick={() => setOnly(only === t ? null : t)}>
              {BOSS_TRAITS[t].icon}
            </button>
          ))}
        </div>
      )}
      <ul className="boss-book-list">
        {all.filter((b) => book[b.name] && (only === null || traitOf(b.name) === only)).map((b) => {
          const e = book[b.name]
          return (
            <li key={b.name} className={e ? 'got' : 'locked'}>
              <span className="boss-book-fig">
                {e && <BossArena bg={arenaOf(b.name)} color={b.color} />}
                <BossFigure hit={false} look={e ? b : { ...b, ...GRAY }} />
              </span>
              <span className="badge-name">{e ? b.name : '？？？'}</span>
              {e && (
                <span className="badge-desc">
                  {e.wins}回たおした・最高 <strong className={`rank-mini rank-${e.best}`}>{e.best}</strong>
                  {times[b.name] !== undefined && <>・⏱ 最短 {formatSec(times[b.name])}{times[b.name] < 60 && <strong className="speed-clear"> ⚡ スピードクリア</strong>}</>}
                </span>
              )}
              {e && (
                <span className="boss-book-trait" title={BOSS_TRAITS[traitOf(b.name)].desc}>
                  とくぎ：{BOSS_TRAITS[traitOf(b.name)].icon} {BOSS_TRAITS[traitOf(b.name)].name}
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
