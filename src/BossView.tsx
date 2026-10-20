import { useState } from 'react'
import { BOSS_HP, BOSS_QUESTIONS, damage, HEARTS } from './boss'
import { quizXp, type Source } from './monster'
import { makeQuiz } from './quiz'
import { playCorrect, playWrong } from './sound'
import { WORDS, type Level, type Word } from './words'

type Props = {
  level: Level
  words: Word[]
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onWin: () => void
  onExit: () => void
}

// オリジナルのボス「ヤミモチ」
function BossFigure({ hit }: { hit: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={`boss-svg${hit ? ' hit' : ''}`} aria-hidden="true">
      <path d="M30 30 L24 8 L40 24 Z M70 30 L76 8 L60 24 Z" fill="#7c3aed" stroke="#3b0764" strokeWidth="3" />
      <path d="M12 72 Q12 24 50 22 Q88 24 88 72 Q88 92 50 92 Q12 92 12 72 Z" fill="#6d28d9" stroke="#3b0764" strokeWidth="3" />
      <path d="M30 50 L44 56 M70 50 L56 56" stroke="#fde047" strokeWidth="4" strokeLinecap="round" />
      <circle cx="38" cy="58" r="4" fill="#fde047" />
      <circle cx="62" cy="58" r="4" fill="#fde047" />
      <path d="M38 74 L44 70 L50 74 L56 70 L62 74" fill="none" stroke="#f5f3ff" strokeWidth="3" />
    </svg>
  )
}

export function Boss({ level, words, onAnswer, onWin, onExit }: Props) {
  const [qs, setQs] = useState(() => makeQuiz(WORDS, (w) => w.ja, BOSS_QUESTIONS, Math.random, words))
  const [index, setIndex] = useState(0)
  const [hp, setHp] = useState(BOSS_HP)
  const [hearts, setHearts] = useState(HEARTS)
  const [combo, setCombo] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [hit, setHit] = useState(false)

  const won = hp <= 0
  const lost = !won && (hearts <= 0 || index >= qs.length)
  const q = qs[index]

  function pick(i: number) {
    if (picked !== null || won || lost) return
    setPicked(i)
    if (i === q.answer) {
      const c = combo + 1
      setCombo(c)
      const nextHp = hp - damage(c)
      setHp(Math.max(0, nextHp))
      setHit(true)
      playCorrect()
      onAnswer?.(true, quizXp(c), q.word.id, 'quiz')
      if (nextHp <= 0) onWin()
    } else {
      setCombo(0)
      setHearts(hearts - 1)
      playWrong()
      onAnswer?.(false, 0, q.word.id, 'quiz')
    }
  }

  function next() {
    setPicked(null)
    setHit(false)
    setIndex(index + 1)
  }

  function retry() {
    setQs(makeQuiz(WORDS, (w) => w.ja, BOSS_QUESTIONS, Math.random, words))
    setIndex(0)
    setHp(BOSS_HP)
    setHearts(HEARTS)
    setCombo(0)
    setPicked(null)
    setHit(false)
  }

  return (
    <section className="card quiz boss">
      <div className="stage-head">
        <button className="stage-back" onClick={onExit}>
          ← にげる
        </button>
        <span>{level} のボス</span>
      </div>
      <div className="boss-figure">
        <BossFigure hit={hit} />
      </div>
      <p className="boss-name">ヤミモチ</p>
      <div className="boss-hp" role="progressbar" aria-label="ボスのHP" aria-valuemin={0} aria-valuemax={BOSS_HP} aria-valuenow={hp}>
        <div className="boss-hp-fill" style={{ width: `${(hp / BOSS_HP) * 100}%` }} />
      </div>
      <p className="boss-status">
        <span aria-label={`のこりハート ${hearts}`}>{'❤️'.repeat(hearts) + '🤍'.repeat(HEARTS - hearts)}</span>
        {combo >= 2 && <span className="combo">🔥{combo}</span>}
      </p>

      {won ? (
        <>
          <p className="level-up boss-result">ボスをたおした！ 🎉</p>
          <p className="result-message">ボーナス +100XP</p>
          <button className="flip" onClick={onExit}>
            ステージにもどる
          </button>
        </>
      ) : lost && picked === null ? (
        <>
          <p className="boss-result">まけてしまった…</p>
          <p className="result-message">苦手な単語を復習して、もう一度挑戦しよう！</p>
          <button className="flip" onClick={retry}>
            もう一度挑戦
          </button>
        </>
      ) : (
        <>
          <p className="en">{q.word.en}</p>
          <div className="choices">
            {q.choices.map((c, i) => {
              let cls = 'choice'
              if (picked !== null && i === q.answer) cls += ' correct'
              else if (picked === i) cls += ' wrong'
              return (
                <button key={c} className={cls} onClick={() => pick(i)} disabled={picked !== null}>
                  {c}
                </button>
              )
            })}
          </div>
          {picked !== null && (
            <>
              <p className="feedback">
                {picked === q.answer ? `${damage(combo)} ダメージ！` : `正解は「${q.choices[q.answer]}」`}
              </p>
              <button className="flip" onClick={next}>
                次へ
              </button>
            </>
          )}
        </>
      )}
    </section>
  )
}
