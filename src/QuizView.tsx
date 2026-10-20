import { useEffect, useState } from 'react'
import { blankOut, canBlank } from './blank'
import { quizXp, type Source } from './monster'
import { makeQuiz } from './quiz'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'
import { Spell } from './SpellView'
import { Irregular } from './IrregularView'
import { getRecognition } from './pronounce'
import { Pronounce } from './PronounceView'
import type { Word } from './words'

// listen：音声だけ聞いて日本語の意味を選ぶ
// spell：日本語を見て英単語を入力
// blank：例文の空欄に入る単語を選ぶ
// irregular：不規則動詞の活用ドリル
// speak：発音練習（音声認識が使える端末のみ表示）
export type Direction = 'en-ja' | 'ja-en' | 'listen' | 'spell' | 'blank' | 'irregular' | 'speak'

const prompt = (w: Word, d: Direction) => (d === 'ja-en' ? w.ja : w.en)
const label = (d: Direction) => (d === 'ja-en' || d === 'blank' ? (w: Word) => w.en : (w: Word) => w.ja)
const pool = (d: Direction, ws: Word[]) => (d === 'blank' ? ws.filter(canBlank) : ws)

const DIRECTIONS: { id: Direction; label: string }[] = [
  { id: 'en-ja', label: '英→日' },
  { id: 'ja-en', label: '日→英' },
  { id: 'listen', label: '🎧 リスニング' },
  { id: 'spell', label: '✏️ スペル' },
  { id: 'blank', label: '📝 穴埋め' },
  { id: 'irregular', label: '🔁 不規則動詞' },
  { id: 'speak', label: '🎤 発音' },
]

type Props = {
  words: Word[]
  targets?: Word[] // 出題する単語（省略時は words 全部）
  direction?: Direction
  count?: number
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onFinish?: (score: number, total: number) => void
  onRestart?: () => void // 指定すると「もう1回」でこれを呼ぶ（ステージ用）
}

export function Quiz({ words, targets, direction: initial = 'en-ja', count = 10, onAnswer, onFinish, onRestart }: Props) {
  const [direction, setDirection] = useState<Direction>(initial)
  const [questions, setQuestions] = useState(() => makeQuiz(words, label(initial), count, Math.random, pool(initial, targets ?? words)))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [earned, setEarned] = useState(0)
  const [lastXp, setLastXp] = useState(0)

  const q = questions[index]

  // リスニングは問題が変わるたびに自動で読み上げる
  useEffect(() => {
    if (direction === 'listen' && q) speak(q.word.en)
  }, [direction, q])

  function pick(i: number) {
    if (picked !== null) return
    setPicked(i)
    if (i === q.answer) {
      const c = combo + 1
      const xp = quizXp(c)
      setScore(score + 1)
      setCombo(c)
      setMaxCombo(Math.max(maxCombo, c))
      setEarned(earned + xp)
      setLastXp(xp)
      playCorrect()
      onAnswer?.(true, xp, q.word.id, direction === 'listen' ? 'ear' : 'quiz')
    } else {
      setCombo(0)
      setLastXp(0)
      playWrong()
      onAnswer?.(false, 0, q.word.id, direction === 'listen' ? 'ear' : 'quiz')
    }
  }

  function next() {
    setPicked(null)
    setIndex(index + 1)
    if (index + 1 === questions.length) onFinish?.(score, questions.length)
  }

  function restart(d: Direction = direction) {
    setDirection(d)
    setQuestions(makeQuiz(words, label(d), count, Math.random, pool(d, targets ?? words)))
    setIndex(0)
    setPicked(null)
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    setEarned(0)
  }

  const toggle = (
    <div className="direction" role="group" aria-label="出題の向き">
      {DIRECTIONS.filter((d) => d.id !== 'speak' || getRecognition()).map((d) => (
        <button key={d.id} aria-pressed={direction === d.id} onClick={() => restart(d.id)}>
          {d.label}
        </button>
      ))}
    </div>
  )

  if (direction === 'speak') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Pronounce words={targets ?? words} count={count} onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'irregular') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Irregular count={count} onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'spell') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Spell words={targets ?? words} count={count} onAnswer={onAnswer} />
      </>
    )
  }

  if (!q) {
    const rate = Math.round((score / questions.length) * 100)
    return (
      <section className="card result">
        <p className="result-title">結果</p>
        <p className="result-score">
          {score} / {questions.length} 問正解
        </p>
        <dl className="result-list">
          <div>
            <dt>正答率</dt>
            <dd>{rate}%</dd>
          </div>
          <div>
            <dt>獲得XP</dt>
            <dd>+{earned}</dd>
          </div>
          <div>
            <dt>最大コンボ</dt>
            <dd>{maxCombo}</dd>
          </div>
        </dl>
        <p className="result-message">
          {rate === 100 ? 'パーフェクト！すごい！' : rate >= 70 ? 'いい調子！' : 'もう1回で覚えちゃおう！'}
        </p>
        <button className="flip" onClick={() => (onRestart ? onRestart() : restart())}>
          もう1回
        </button>
      </section>
    )
  }

  return (
    <section className="card quiz" aria-live="polite">
      {toggle}
      <p className="progress">
        {index + 1} / {questions.length}
        {combo >= 2 && (
          <span key={combo} className="combo">
            🔥{combo} コンボ！
          </span>
        )}
      </p>
      {direction === 'blank' ? (
        <BlankPrompt word={q.word} revealed={picked !== null} />
      ) : direction === 'listen' ? (
        <>
          <button className="listen" onClick={() => speak(q.word.en)} aria-label="もう一度聞く">
            🔊
          </button>
          <p className="en listen-word">{picked !== null ? q.word.en : '？'}</p>
        </>
      ) : (
        <p className={direction === 'en-ja' ? 'en' : 'en ja-prompt'}>{prompt(q.word, direction)}</p>
      )}
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
            {picked === q.answer ? (
              <>
                正解！ <span className="xp-gain">+{lastXp} XP</span>
              </>
            ) : (
              `正解は「${q.choices[q.answer]}」`
            )}
          </p>
          <button className="flip" onClick={next}>
            次へ
          </button>
        </>
      )}
    </section>
  )
}

function BlankPrompt({ word, revealed }: { word: Word; revealed: boolean }) {
  const b = blankOut(word.example, word.en)
  if (!b) return null
  return (
    <div className="blank-prompt">
      <p className="example blank-sentence">
        {b.before}
        <span className={`blank${revealed ? ' filled' : ''}`}>{revealed ? b.answer : '\u3000\u3000\u3000'}</span>
        {b.after}
      </p>
      <p className="example-ja">{word.exampleJa}</p>
    </div>
  )
}
