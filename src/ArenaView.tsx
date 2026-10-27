import { useState } from 'react'
import type { CSSProperties } from 'react'
import { ARENA_BEST_COINS, ARENA_TOP, arenaCourse, arenaFloor, arenaNextTitle, arenaTitle, arenaLook, arenaNext, isArenaJump, arenaQuestionAt, isArenaGrammar, loadArenaBest, recordArenaBest } from './arena'
import { BossArena } from './BossArenaView'
import { BossFigure } from './BossView'
import { playCorrect, playWrong } from './sound'

// 闘技場：エンドレスで戦う。正解でレベルアップ、まちがいでレベルダウン。「終了」で、いまのレベルを階で伝える
export function Arena({ start, onExit, onCoins }: { start: number; onExit: () => void; onCoins?: (n: number) => void }) {
  const [lv, setLv] = useState(start)
  const [q, setQ] = useState(() => arenaQuestionAt(start, 0))
  const [picked, setPicked] = useState<number | null>(null)
  const [count, setCount] = useState(0)
  const [right, setRight] = useState(0)
  const [streak, setStreak] = useState(0)
  const [top, setTop] = useState(start)
  const [ended, setEnded] = useState<{ newBest: boolean; best: number } | null>(null)
  const [prevBest, setPrevBest] = useState(loadArenaBest)
  // いままでの最高（はじめてなら、スタートの階）。これより上に着くと記録更新でコイン
  const [record, setRecord] = useState(() => Math.max(prevBest ?? start, start))
  const [newRecord, setNewRecord] = useState(false)
  const [moved, setMoved] = useState<'up' | 'down' | null>(null) // 階が変わった直後：新しい相手が登場
  const look = arenaLook(lv)
  const correct = picked !== null && picked === q.answer
  const jump = picked !== null && isArenaJump(correct, streak)
  const nextLv = picked === null ? lv : arenaNext(lv, correct, correct ? streak : 0)

  function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    setCount(count + 1)
    if (i === q.answer) {
      setRight(right + 1)
      setStreak(streak + 1)
      const up = arenaNext(lv, true, streak + 1)
      setTop(Math.max(top, up))
      if (up > record) {
        setRecord(up)
        setNewRecord(true)
        recordArenaBest(up)
        onCoins?.(ARENA_BEST_COINS)
      } else setNewRecord(false)
      playCorrect()
    } else {
      setStreak(0)
      setNewRecord(false)
      playWrong()
    }
  }
  function next() {
    setMoved(nextLv > lv ? 'up' : nextLv < lv ? 'down' : null)
    setLv(nextLv)
    setQ(arenaQuestionAt(nextLv, count, Math.random, q.word.id))
    setPicked(null)
  }
  function finish() {
    const best = Math.max(top, prevBest ?? 0)
    recordArenaBest(top)
    setEnded({ newBest: prevBest === null || top > prevBest, best })
    setPrevBest(best)
  }

  if (ended)
    return (
      <section className="card boss battle-v2 arena-result" style={{ '--boss': look.color } as CSSProperties} aria-label="闘技場の結果">
        <p className="arena-result-title">🏟 闘技場 おつかれさま！</p>
        <p className="arena-result-floor" role="status">
          いまのあなたは <strong>{arenaFloor(lv)}</strong>
        </p>
        <p className="arena-title-badge">称号：{arenaTitle(lv)}</p>
        {arenaNextTitle(lv) && (
          <p className="arena-next-title">
            次の称号「{arenaNextTitle(lv)!.title}」まで あと{arenaNextTitle(lv)!.floors}階
          </p>
        )}
        <p className="arena-result-sub">
          {count}問中 {right}問正解・きょういちばん上は {arenaFloor(top)}
        </p>
        <p className="arena-result-best">{ended.newBest ? `🏅 最高記録 更新！ ${arenaFloor(top)}` : `最高記録 ${arenaFloor(ended.best)}`}</p>
        <button
          className="good next-unit-btn"
          onClick={() => {
            setEnded(null)
            setCount(0)
            setRight(0)
            setStreak(0)
            setTop(lv)
          }}
        >
          ⚔ 続きから戦う
        </button>
        <button className="list-link" onClick={onExit}>
          ← 城にもどる
        </button>
      </section>
    )

  return (
    <section className="card boss battle-v2 arena" style={{ '--boss': look.color } as CSSProperties} aria-label="闘技場">
      <div className="stage-head">
        <button className="stage-back" onClick={finish}>
          🏁 終了
        </button>
        <span>🏟 {arenaFloor(lv)}</span>
      </div>
      <div className="boss-figure">
        <BossArena bg="castle" color={look.color} />
        <span key={lv} className={`arena-foe${moved ? ` enter-${moved}` : ''}`}>
          <BossFigure hit={correct} look={look} />
        </span>
        {moved && picked === null && (
          <span key={`b${lv}`} className={`arena-banner ${moved}`} aria-hidden="true">
            {moved === 'up' ? `⬆ ${lv + 1}階` : `⬇ ${lv + 1}階`}
          </span>
        )}
      </div>
      <div className="boss-plate">
        <p className="boss-name">{look.name}</p>
        <p className="boss-hp-num">{streak >= 2 ? `🔥${streak}連続` : `${count}問`}</p>
        {/* 闘技場の階（中1＝1階 〜 ネイティブ＝15階） */}
        <div className="boss-hp arena-meter" role="progressbar" aria-label="闘技場の階" aria-valuemin={1} aria-valuemax={ARENA_TOP + 1} aria-valuenow={lv + 1}>
          <div className="boss-hp-fill" style={{ width: `${((lv + 1) / (ARENA_TOP + 1)) * 100}%` }} />
        </div>
      </div>
      <p className={`en${isArenaGrammar(q) ? ' boss-sentence-q' : ''}`}>{q.word.en}</p>
      <div className="choices">
        {q.choices.map((c, i) => (
          <button key={c} className={`choice${picked !== null && i === q.answer ? ' correct' : ''}${picked === i && i !== q.answer ? ' wrong' : ''}`} disabled={picked !== null} onClick={() => pick(i)}>
            {c}
          </button>
        ))}
      </div>
      {picked !== null && (
        <>
          <p className={`arena-move ${correct ? 'up' : 'down'}`} role="status">
            {correct ? (nextLv > lv ? `${jump && nextLv - lv === 2 ? `🚀 ${streak}連続！ 2階ジャンプ！` : '⬆ レベルアップ！'} ${arenaFloor(nextLv)}へ` : '👑 いちばん上の階！') : `${nextLv < lv ? `⬇ レベルダウン… ${arenaFloor(nextLv)}へ　` : ''}正解は「${q.choices[q.answer]}」`}
          </p>
          {correct && newRecord && (
            <p className="arena-record" role="status">
              🆕 最高記録！ 🪙{ARENA_BEST_COINS}
            </p>
          )}
          <button className="good next-unit-btn" onClick={next}>
            次へ（{arenaCourse(nextLv).label}）
          </button>
        </>
      )}
    </section>
  )
}
