import { loadProverbs, PROVERBS } from './proverbs'
import { useState } from 'react'
import { BOSSES, BOSS_TRAITS, bossBgOf, formatSec, loadBossTimes, loadNoMissBosses, loadSealTraits, traitOf, type BossLook } from './boss'
import { BossArena } from './BossArenaView'
import { loadBook, loadLastBoss, SECRET_WINS, secretOf } from './bossbook'
import { BossFigure } from './BossView'
import { dayKey } from './srs'
import { UNIV_BOSSES } from './univ'

// デザイン194：YYYY-MM-DD の2つの日の差（日数）
const daysSince = (from: string, to: string) => Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000)

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
  const [lastBoss] = useState(loadLastBoss) // デザイン154：いちばん最近たおしたボス
  const [times] = useState(loadBossTimes)
  const [noMiss] = useState(loadNoMissBosses) // デザイン94：ノーミスでたおしたボス
  const [byWins, setByWins] = useState(false) // デザイン118：勝った回数の多い順に並べる
  const [cleanOnly, setCleanOnly] = useState(false) // デザイン109：ノーミスでたおしたボスだけ見る
  const [notSOnly, setNotSOnly] = useState(false) // デザイン192：まだランクSを取っていないボスだけ見る
  const [traitOpen, setTraitOpen] = useState<string | null>(null) // デザイン106：とくぎの説明を開いているボス
  const [only, setOnly] = useState<keyof typeof BOSS_TRAITS | null>(null) // とくぎでしぼりこむ
  const [sealT] = useState(loadSealTraits) // とくぎごとの、封じて勝った回数
  const [today] = useState(() => dayKey()) // デザイン194：はじめて勝ってから何日かを出すための今日
  const base: BossLook[] = [...Object.values(BOSSES), ...UNIV_BOSSES]
  const extra = Object.values(book)
    .map((e) => e.look)
    .filter((l) => !base.some((b) => b.name === l.name))
  const all = [...base, ...extra]
  const beaten = all.filter((b) => book[b.name]).length
  const speedy = all.filter((b) => book[b.name] && (times[b.name] ?? Infinity) < 60).length
  // デザイン129：いちばん早くたおしたボス（タイムのあるボスが2体以上のとき）
  const timed = all.filter((b) => book[b.name] && times[b.name] !== undefined)
  const fastest = timed.length >= 2 ? timed.reduce((x, y) => (times[y.name] < times[x.name] ? y : x)).name : null
  // デザイン117：いちばんたくさん勝ったボス（2回以上のときだけ。同じ回数なら先にあるほう）
  const topWins = Math.max(0, ...all.map((b) => book[b.name]?.wins ?? 0))
  const topName = topWins >= 2 ? all.find((b) => book[b.name]?.wins === topWins)?.name : undefined
  // デザイン170：いちばん最初にたおしたボス（はじめて勝った日がいちばん早いボス。同じ日なら図鑑で先のボス。2体以上たおしたときだけ）
  const dated = all.filter((b) => /^\d{4}-\d{2}-\d{2}$/.test(book[b.name]?.first ?? ''))
  const firstWin = dated.length >= 2 ? dated.reduce((x, y) => (book[y.name].first < book[x.name].first ? y : x)).name : null
  const clean = all.filter((b) => book[b.name] && noMiss.includes(b.name)).length // デザイン108：ノーミスでたおしたボスの数
  const rankS = all.filter((b) => book[b.name]?.best === 'S').length // デザイン180：ランクSで勝ったボスの数
  return (
    <details className="boss-book game-fold">
      <summary>
        <span className="lg-icon" aria-hidden="true">📕</span>ボス図鑑
        {speedy > 0 && <span className="fold-meta" aria-label={`スピードクリア ${speedy}体`}>⚡{speedy}</span>}
        {clean > 0 && <span className="fold-meta" aria-label={`ノーミス ${clean}体`}>✨{clean}</span>}
        {clean > 0 && <span className="fold-meta" aria-label={`ノーミス率 ${Math.round((clean / beaten) * 100)}%`}>（{Math.round((clean / beaten) * 100)}%）</span>} {/* デザイン135 */}
        {rankS > 0 && <span className="fold-meta" aria-label={`ランクS ${rankS}体`}>🏅 S {rankS}体</span>}
        {/* デザイン205：ボスに勝った回数の合計 */}
        {beaten > 0 && <span className="fold-meta" aria-label={`のべ ${Object.values(book).reduce((n, e) => n + e.wins, 0)}勝`}>⚔のべ{Object.values(book).reduce((n, e) => n + e.wins, 0)}勝</span>}
        <span className="fold-meta" aria-label={`ボス図鑑 ${beaten} / ${all.length}体`}>
          {beaten}/{all.length}
        </span>
        {beaten < all.length && (
          // デザイン124：まだ勝っていないボスの数
          <span className="fold-meta" aria-label={`まだ勝っていないボス ${all.length - beaten}体`}>
            あと{all.length - beaten}体
          </span>
        )}
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
              {(sealT[t] ?? 0) > 0 && <span className="trait-sealed">🔒×{sealT[t]}</span>}
              {/* デザイン202：封じて勝った回数がいちばん多いとくぎ */}
              {(sealT[t] ?? 0) > 0 && (sealT[t] ?? 0) === Math.max(...Object.values(sealT)) && <span aria-label="いちばん封じたとくぎ"> 👑</span>}
              <span className="trait-tip">🔑 封じのコツ：{BOSS_TRAITS[t].tip}</span>
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
          <button className={byWins ? 'on' : ''} aria-pressed={byWins} onClick={() => setByWins(!byWins)}>
            🏆 勝った回数順
          </button>
          {clean > 0 && (
            <button className={cleanOnly ? 'on' : ''} aria-pressed={cleanOnly} onClick={() => setCleanOnly(!cleanOnly)}>
              ✨ノーミスだけ
            </button>
          )}
          {all.some((b) => book[b.name] && book[b.name].best !== 'S') && (
            <button className={notSOnly ? 'on' : ''} aria-pressed={notSOnly} onClick={() => setNotSOnly(!notSOnly)}>
              🎯 まだSじゃない
            </button>
          )}
        </div>
      )}
      {(() => {
        // デザイン138：まだ勝っていないステージのボスを1体だけ「つぎのめあて」に（名前はまだひみつ）
        const next = Object.entries(BOSSES).find(([, l]) => !book[l.name])
        return next ? (
          <p className="boss-next-goal" aria-label="つぎのめあて">
            🎯 つぎのめあて：{next[0]}のボス
          </p>
        ) : (
          // デザイン158：ステージのボスにぜんぶ勝った
          <p className="boss-next-goal" aria-label="ステージのボス制覇">
            👑 ステージのボス制覇！
          </p>
        )
      })()}
      {beaten > 0 && (
        // デザイン144：とくぎの種類ごとに、勝ったボスの数
        <p className="boss-trait-counts" aria-label="とくぎごとに勝ったボスの数">
          {(Object.keys(BOSS_TRAITS) as (keyof typeof BOSS_TRAITS)[]).map((t) => (
            // デザイン175：タップするとそのとくぎのボスだけにしぼる
            <button key={t} className="list-link" aria-pressed={only === t} aria-label={`${BOSS_TRAITS[t].name}のボスだけ見る`} onClick={() => setOnly(only === t ? null : t)} style={{ padding: '0 0.25rem' }}>
              {BOSS_TRAITS[t].icon}
              {all.filter((b) => book[b.name] && traitOf(b.name) === t).length}
              {/* デザイン185：そのとくぎのボスにランクSで勝った数 */}
              {all.some((b) => book[b.name]?.best === 'S' && traitOf(b.name) === t) && (
                <small className="trait-rank-s" aria-label={`${BOSS_TRAITS[t].name}のボスにランクS ${all.filter((b) => book[b.name]?.best === 'S' && traitOf(b.name) === t).length}体`}>
                  （S{all.filter((b) => book[b.name]?.best === 'S' && traitOf(b.name) === t).length}）
                </small>
              )}
            </button>
          ))}
        </p>
      )}
      <ul className="boss-book-list">
        {all.filter((b) => book[b.name] && (only === null || traitOf(b.name) === only) && (!cleanOnly || noMiss.includes(b.name)) && (!notSOnly || book[b.name].best !== 'S')).sort((x, y) => (byWins ? (book[y.name]?.wins ?? 0) - (book[x.name]?.wins ?? 0) : 0)).map((b) => {
          const e = book[b.name]
          return (
            <li key={b.name} className={e ? 'got' : 'locked'}>
              <span className="boss-book-fig">
                {e && <BossArena bg={arenaOf(b.name)} color={b.color} />}
                <BossFigure hit={false} look={e ? b : { ...b, ...GRAY }} />
              </span>
              <span className="badge-name">{e ? b.name : '？？？'}</span>
              {/* デザイン197：ランクSで勝ったボスの名前に🏅 */}
              {e?.best === 'S' && <span className="boss-book-s" aria-label="ランクSで勝ったボス">🏅</span>}
              {e && (
                <span className="badge-desc">
                  {e.wins}回たおした・最高 <strong className={`rank-mini rank-${e.best}`}>{e.best}</strong>
                  {/* デザイン182：ランクSまであと何ランクか */}
                  {e.best !== 'S' && <span className="boss-book-to-s" aria-label={`ランクSまであと${e.best === 'A' ? 1 : 2}ランク`}>（Sまであと{e.best === 'A' ? 1 : 2}ランク）</span>}
                  {times[b.name] !== undefined && <>・⏱ 最短 {formatSec(times[b.name])}{times[b.name] < 60 && <strong className="speed-clear"> ⚡ スピードクリア</strong>}</>}
                  {fastest === b.name && <strong className="speed-clear" aria-label="いちばん早くたおしたボス"> ⚡最速</strong>}
                  {noMiss.includes(b.name) && <strong className="speed-clear"> ✨ ノーミス</strong>}
                  {topName === b.name && <strong className="speed-clear"> 🏆 いちばん勝った</strong>}
                  {lastBoss === b.name && <strong className="speed-clear" aria-label="いちばん最近たおしたボス"> 🆕 さいきん</strong>}
                  {firstWin === b.name && <strong className="speed-clear" aria-label="いちばん最初にたおしたボス"> 🥇 はじめての勝利</strong>}
                  {/^\d{4}-\d{2}-\d{2}$/.test(e.first ?? '') && <span className="boss-book-first">・📅 はじめて勝った日 {Number(e.first.slice(5, 7))}月{Number(e.first.slice(8, 10))}日{daysSince(e.first, today) > 0 && <span aria-label="はじめて勝ってからの日数">（{daysSince(e.first, today)}日前）</span>}</span>}
                </span>
              )}
              {e && (
                <button
                  className="boss-book-trait"
                  title={BOSS_TRAITS[traitOf(b.name)].desc}
                  aria-expanded={traitOpen === b.name}
                  onClick={() => setTraitOpen(traitOpen === b.name ? null : b.name)}
                >
                  とくぎ：{BOSS_TRAITS[traitOf(b.name)].icon} {BOSS_TRAITS[traitOf(b.name)].name}
                </button>
              )}
              {e && traitOpen === b.name && (
                <span className="boss-book-trait-desc" role="status">
                  {BOSS_TRAITS[traitOf(b.name)].desc}／🔑 {BOSS_TRAITS[traitOf(b.name)].tip}
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
