import { useState } from 'react'
import type { CSSProperties } from 'react'
import { ARENA_TOP, arenaCourse, arenaFloor, arenaLook, arenaNext, arenaQuestion, loadArenaBest, recordArenaBest } from './arena'
import { BossArena } from './BossArenaView'
import { BossFigure } from './BossView'
import { playCorrect, playWrong } from './sound'

// 闘技場：エンドレスで戦う。正解でレベルアップ、まちがいでレベルダウン。「終了」で、いまのレベルを階で伝える
export function Arena({ start, onExit }: { start: number; onExit: () => void }) {
  const [lv, setLv] = useState(start)
  const [q, setQ] = useState(() => arenaQuestion(start))
  const [picked, setPicked] = useState<number | null>(null)
  const [count, setCount] = useState(0)
  const [right, setRight] = useState(0)
  const [streak, setStreak] = useState(0)
  const [top, setTop] = useState(start)
  const [ended, setEnded] = useState<{ newBest: boolean; best: number } | null>(null)
  const [prevBest] = useState(loadArenaBest)
  const look = arenaLook(lv)
  const correct = picked !== null && picked === q.answer
  const nextLv = picked === null ? lv : arenaNext(lv, correct)

  function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    setCount(count + 1)
    if (i === q.answer) {
      setRight(right + 1)
      setStreak(streak + 1)
      setTop(Math.max(top, arenaNext(lv, true)))
      playCorrect()
    } else {
      setStreak(0)
      playWrong()
    }
  }
  function next() {
    setLv(nextLv)
    setQ(arenaQuestion(nextLv, Math.random, q.word.id))
    setPicked(null)
  }
  function finish() {
    const best = Math.max(top, prevBest ?? 0)
    setEnded({ newBest: recordArenaBest(top), best })
  }

  if (ended)
    return (
      <section className="card boss battle-v2 arena-result" style={{ '--boss': look.color } as CSSProperties} aria-label="闘技場の結果">
        <p className="arena-result-title">🏟 闘技場 おつかれさま！</p>
        <p className="arena-result-floor" role="status">
          いまのあなたは <strong>{arenaFloor(lv)}</strong>
        </p>
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
        <BossFigure hit={correct} look={look} />
      </div>
      <div className="boss-plate">
        <p className="boss-name">{look.name}</p>
        <p className="boss-hp-num">{streak >= 2 ? `🔥${streak}連続` : `${count}問`}</p>
        {/* 闘技場の階（中1＝1階 〜 ネイティブ＝15階） */}
        <div className="boss-hp arena-meter" role="progressbar" aria-label="闘技場の階" aria-valuemin={1} aria-valuemax={ARENA_TOP + 1} aria-valuenow={lv + 1}>
          <div className="boss-hp-fill" style={{ width: `${((lv + 1) / (ARENA_TOP + 1)) * 100}%` }} />
        </div>
      </div>
      <p className="en">{q.word.en}</p>
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
            {correct ? (nextLv > lv ? `⬆ レベルアップ！ ${arenaFloor(nextLv)}へ` : '👑 いちばん上の階！') : `${nextLv < lv ? `⬇ レベルダウン… ${arenaFloor(nextLv)}へ　` : ''}正解は「${q.choices[q.answer]}」`}
          </p>
          <button className="good next-unit-btn" onClick={next}>
            次へ（{arenaCourse(nextLv).label}）
          </button>
        </>
      )}
    </section>
  )
}
