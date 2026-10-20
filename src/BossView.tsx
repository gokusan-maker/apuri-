import { useState } from 'react'
import { BOSS_HP, BOSS_QUESTIONS, BOSSES, damage, HEAL_COST, HEARTS, type BossLook } from './boss'
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
  bonus?: number
  onSpend?: (coins: number) => boolean
}

// オリジナルのボス。単語帳ごとに色と名前が変わる
function BossFigure({ hit, look }: { hit: boolean; look: BossLook }) {
  return (
    <svg viewBox="0 0 100 100" className={`boss-svg${hit ? ' hit' : ''}`} aria-hidden="true">
      <path d="M30 30 L24 8 L40 24 Z M70 30 L76 8 L60 24 Z" fill={look.color} stroke={look.line} strokeWidth="3" />
      <path d="M12 72 Q12 24 50 22 Q88 24 88 72 Q88 92 50 92 Q12 92 12 72 Z" fill={look.color} stroke={look.line} strokeWidth="3" />
      <path d="M30 50 L44 56 M70 50 L56 56" stroke={look.eye} strokeWidth="4" strokeLinecap="round" />
      <circle cx="38" cy="58" r="4" fill={look.eye} />
      <circle cx="62" cy="58" r="4" fill={look.eye} />
      <path d="M38 74 L44 70 L50 74 L56 70 L62 74" fill="none" stroke="#f5f3ff" strokeWidth="3" />
    </svg>
  )
}

export function Boss({ level, words, onAnswer, onWin, onExit, bonus = 100, onSpend }: Props) {
  const [qs, setQs] = useState(() => makeQuiz(WORDS, (w) => w.ja, BOSS_QUESTIONS, Math.random, words))
  const [index, setIndex] = useState(0)
  const [hp, setHp] = useState(BOSS_HP)
  const [hearts, setHearts] = useState(HEARTS)
  const [combo, setCombo] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [hit, setHit] = useState(false)
  const [healed, setHealed] = useState(false) // 回復は1戦1回まで

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
    setHealed(false)
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
        <BossFigure hit={hit} look={BOSSES[level]} />
      </div>
      <p className="boss-name">{BOSSES[level].name}</p>
      <div className="boss-hp" role="progressbar" aria-label="ボスのHP" aria-valuemin={0} aria-valuemax={BOSS_HP} aria-valuenow={hp}>
        <div className="boss-hp-fill" style={{ width: `${(hp / BOSS_HP) * 100}%` }} />
      </div>
      <p className="boss-status">
        <span aria-label={`のこりハート ${hearts}`}>{'❤️'.repeat(hearts) + '🤍'.repeat(HEARTS - hearts)}</span>
        {combo >= 2 && <span className="combo">🔥{combo}</span>}
        {onSpend && !healed && !won && hearts > 0 && hearts < HEARTS && (
          <button
            className="hint-5050"
            onClick={() => {
              if (!onSpend(HEAL_COST)) return
              setHearts(hearts + 1)
              setHealed(true)
            }}
          >
            ❤️+1（🪙{HEAL_COST}）
          </button>
        )}
      </p>

      {won ? (
        <>
          <p className="level-up boss-result">ボスをたおした！ 🎉</p>
          <p className="result-message">ボーナス +{bonus}XP</p>
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
