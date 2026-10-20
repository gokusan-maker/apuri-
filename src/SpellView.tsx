import { useState, type FormEvent } from 'react'
import type { Source } from './monster'
import { shuffle } from './quiz'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'
import { hintText, isCorrectSpelling, spellXp } from './spell'
import type { Word } from './words'

type Props = {
  words: Word[]
  count?: number
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
}

export function Spell({ words, count = 10, onAnswer }: Props) {
  const [list, setList] = useState(() => shuffle(words).slice(0, count))
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [hints, setHints] = useState(0)
  const [result, setResult] = useState<'ok' | 'ng' | null>(null)
  const [score, setScore] = useState(0)

  const w = list[index]

  function submit(e: FormEvent) {
    e.preventDefault()
    if (result || !input.trim()) return
    if (isCorrectSpelling(input, w.en)) {
      setResult('ok')
      setScore(score + 1)
      playCorrect()
      onAnswer?.(true, spellXp(hints), w.id, 'ear')
    } else {
      setResult('ng')
      playWrong()
      onAnswer?.(false, 0, w.id, 'ear')
    }
    speak(w.en)
  }

  function next() {
    setIndex(index + 1)
    setInput('')
    setHints(0)
    setResult(null)
  }

  function restart() {
    setList(shuffle(words).slice(0, count))
    setIndex(0)
    setInput('')
    setHints(0)
    setResult(null)
    setScore(0)
  }

  if (!w) {
    return (
      <section className="card result">
        <p className="result-title">結果</p>
        <p className="result-score">
          {score} / {list.length} 問正解
        </p>
        <button className="flip" onClick={restart}>
          もう1回
        </button>
      </section>
    )
  }

  return (
    <section className="card quiz spell" aria-live="polite">
      <p className="progress">
        {index + 1} / {list.length}
      </p>
      <p className="en ja-prompt">{w.ja}</p>
      <p className="hint" aria-label="ヒント">
        {hintText(w.en, hints)}
      </p>
      <form onSubmit={submit}>
        <input
          className={`spell-input${result ? ` ${result}` : ''}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="英単語を入力"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          readOnly={result !== null}
          autoFocus
        />
        {result === null ? (
          <div className="actions">
            <button
              type="button"
              className="again hint-btn"
              onClick={() => setHints(hints + 1)}
              disabled={hints >= w.en.length - 1}
            >
              1文字ヒント
            </button>
            <button type="submit" className="good">
              こたえる
            </button>
          </div>
        ) : null}
      </form>
      {result && (
        <>
          <p className="feedback">{result === 'ok' ? '正解！' : `正解は「${w.en}」`}</p>
          <button className="flip" onClick={next}>
            次へ
          </button>
        </>
      )}
    </section>
  )
}
