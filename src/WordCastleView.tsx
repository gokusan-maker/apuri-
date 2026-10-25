import { useEffect, useState } from 'react'
import { Castle } from './CastleView'
import type { Source } from './monster'
import { usePlaying } from './playing'
import { Quiz } from './QuizView'
import { speak } from './speech'
import { loadWcClears, saveWcClears, WC_PASS, WC_QS, wordCastleFloors, type WcFloor } from './wordcastle'
import { wordsOf, type Level } from './words'

// 単語の城：単元（10語）ごとに 5問×3階 で登る。1階目は単語の解説から
export function WordCastle({ levels, name = '単語の城', onAnswer, onChest, onSpend, onPlay }: { levels: Level[]; name?: string; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void; onChest?: (coins: number) => void; onSpend?: (n: number) => boolean; onPlay?: (on: boolean) => void }) {
  const floors = wordCastleFloors(levels)
  const [clears, setClears] = useState(loadWcClears)
  const [floor, setFloor] = useState<WcFloor | null>(null)
  const [phase, setPhase] = useState<'explain' | 'quiz' | 'done'>('quiz')
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const leave = () => {
    setFloor(null)
    onPlay?.(false)
  }
  usePlaying(!!floor, leave)
  useEffect(() => () => onPlay?.(false), []) // eslint-disable-line react-hooks/exhaustive-deps
  const start = (f: WcFloor) => {
    onPlay?.(true)
    setFloor(f)
    setPhase(f.floor === 0 ? 'explain' : 'quiz')
    setRound((r) => r + 1)
    window.scrollTo?.({ top: 0 })
  }
  if (!floor)
    return (
      <Castle
        name={name}
        theme="purple"
        onChest={onChest}
        floors={floors.map((f) => ({ id: f.id, label: f.label, sub: f.sub, cleared: clears.includes(f.id) }))}
        onOpen={(id) => {
          const f = floors.find((x) => x.id === id)
          if (f) start(f)
        }}
      />
    )
  const next = floors[floors.findIndex((x) => x.id === floor.id) + 1]
  return (
    <section className="card wc-play" aria-label={`単語の城 ${floor.label}`}>
      <h2 className="wc-title">🏰 {floor.label}</h2>
      {phase === 'explain' && (
        <>
          <p className="stats-note">まずはこの単元の10語をチェック。🔊で発音も聞けるよ</p>
          <ul className="wc-words">
            {floor.stage.words.map((w) => (
              <li key={w.id}>
                <button className="speak small" aria-label={`${w.en}を聞く`} onClick={() => speak(w.en)}>
                  🔊
                </button>
                <span className="wc-en">{w.en}</span>
                <span className="wc-ja">{w.ja}</span>
                {w.example && <small className="wc-ex">{w.example}</small>}
              </li>
            ))}
          </ul>
          <button className="good next-unit-btn" onClick={() => setPhase('quiz')}>
            ⚔ {WC_QS}問に挑戦
          </button>
        </>
      )}
      {phase === 'quiz' && (
        <Quiz
          key={round}
          words={wordsOf([floor.stage.level])}
          targets={floor.words}
          count={floor.words.length}
          direction={floor.direction}
          lockDirection
          onAnswer={onAnswer}
          onSpend={onSpend}
          onFinish={(s) => {
            setScore(s)
            setPhase('done')
            if (s >= Math.min(WC_PASS, floor.words.length) && !clears.includes(floor.id)) {
              const c = [...clears, floor.id]
              setClears(c)
              saveWcClears(c)
            }
          }}
        />
      )}
      {phase === 'done' && (
        <div className="wc-result" role="status">
          <p className={`stage-result${score >= Math.min(WC_PASS, floor.words.length) ? ' clear' : ''}`}>
            {score >= Math.min(WC_PASS, floor.words.length) ? `🏰 クリア！ ${score}/${floor.words.length}問正解` : `あと少し！ ${score}/${floor.words.length}問（${WC_PASS}問以上でクリア）`}
          </p>
          {score >= Math.min(WC_PASS, floor.words.length) && next && (
            <button className="good next-unit-btn" onClick={() => start(next)}>
              🏰 次の階へ ▶ {next.label}
            </button>
          )}
          <button className="list-link pill-btn pill-blue" onClick={() => start(floor)}>
            🔁 もう一度
          </button>
          <button className="list-link pill-btn pill-blue" onClick={leave}>
            城にもどる
          </button>
        </div>
      )}
    </section>
  )
}
