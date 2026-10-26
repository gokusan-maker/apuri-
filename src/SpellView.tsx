import { EMOJI } from './emoji'
import { loadSettings } from './settings'
import { markSpelling } from './spellDiff'
import { useEffect, useMemo, useState } from 'react'
import type { Source } from './monster'
import { shuffle } from './quiz'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'
import { builtSpelling, hintText, isCorrectSpelling, letterCount, spellXp } from './spell'
import { starsFor } from './stages'
import type { Word } from './words'

type Props = {
  words: Word[]
  count?: number
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  byEar?: boolean // ディクテーション：日本語の代わりに音声で出題
}

export function Spell({ words, count = 10, onAnswer, byEar = false }: Props) {
  const [easy] = useState(() => loadSettings().easy)
  const [list, setList] = useState(() => shuffle(words).slice(0, count))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number[]>([]) // 押した文字のボタン（番号）
  const [hints, setHints] = useState(0)
  const [result, setResult] = useState<'ok' | 'ng' | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0) // 連続正解
  const [best, setBest] = useState(0) // 連続正解の最高

  const w = list[index]
  // 文字のボタン：答えの文字（空白はのぞく）をまぜたもの。キーボードで打たずに、ボタンを押してつづる
  const tiles = useMemo(() => (w ? shuffle([...w.en].filter((c) => c !== ' ')) : []), [w])
  const input = w ? builtSpelling(w.en, picked.map((i) => tiles[i])) : ''

  useEffect(() => {
    if (byEar && w) speak(w.en)
  }, [byEar, w])

  function submit() {
    if (result || picked.length === 0) return
    if (isCorrectSpelling(input, w.en)) {
      setResult('ok')
      setStreak(streak + 1)
      setBest(Math.max(best, streak + 1))
      setScore(score + 1)
      playCorrect()
      onAnswer?.(true, spellXp(hints), w.id, 'ear')
    } else {
      setResult('ng')
      setStreak(0)
      playWrong()
      onAnswer?.(false, 0, w.id, 'ear')
    }
    speak(w.en)
  }

  function next() {
    setIndex(index + 1)
    setPicked([])
    setHints(0)
    setResult(null)
  }

  function restart() {
    setList(shuffle(words).slice(0, count))
    setIndex(0)
    setPicked([])
    setHints(0)
    setResult(null)
    setScore(0)
    setStreak(0)
    setBest(0)
  }

  if (!w) {
    return (
      <section className="card result">
        <p className="result-title">結果</p>
        <p className="result-score">
          {score} / {list.length} 問正解
        </p>
        {score === list.length && list.length > 0 && <p className="wc-perfect">🏆 パーフェクト！ 全問正解</p>}
        {best >= 2 && <p className="num-streak">🔥 最高 {best}連続正解</p>}
        <p className="result-stars" aria-label={`星 ${starsFor(score, list.length)}`}>
          {'★'.repeat(starsFor(score, list.length))}
          {'☆'.repeat(3 - starsFor(score, list.length))}
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
      {byEar ? (
        <>
          <button className="listen" type="button" onClick={() => speak(w.en)} aria-label="もう一度聞く">
            🔊
          </button>
          <p className="example-ja">聞こえた英単語を、文字のボタンでつくろう（意味：{w.ja}）</p>
        </>
      ) : (
        <p className="en ja-prompt">
          {easy && EMOJI[w.id] && <span className="card-emoji">{EMOJI[w.id]} </span>}
          {w.ja}
        </p>
      )}
      <p className="hint" aria-label="ヒント">
        {hintText(w.en, hints)}
      </p>
      <p className={`spell-input spell-built${result ? ` ${result}` : ''}`} aria-label="あなたのつづり">
        {[...w.en].map((c, i) => (c === ' ' ? '\u00a0\u00a0' : (input[i] ?? '_')))}
      </p>
      {result === null && (
        <>
          <div className="spell-tiles" aria-label="文字のボタン">
            {tiles.map((c, i) => (
              <button key={i} type="button" className="spell-tile" aria-label={`文字 ${c}`} disabled={picked.includes(i)} onClick={() => picked.length < tiles.length && setPicked([...picked, i])}>
                {c}
              </button>
            ))}
          </div>
          <div className="actions">
            <button type="button" className="again" onClick={() => setPicked(picked.slice(0, -1))} disabled={picked.length === 0}>
              ⌫ 1文字消す
            </button>
            <button type="button" className="again hint-btn" onClick={() => setHints(hints + 1)} disabled={hints >= letterCount(w.en) - 1}>
              1文字ヒント
            </button>
            <button type="button" className="good" onClick={submit} disabled={picked.length === 0}>
              こたえる
            </button>
          </div>
        </>
      )}
      {result && (
        <>
          <p className="feedback">{result === 'ok' ? (hints === 0 ? '正解！ ✨ノーヒント' : '正解！') : `正解は「${w.en}」`}</p>
          {result === 'ok' && streak >= 2 && <p className="num-streak">🔥 {streak}連続正解！</p>}
          {result === 'ng' && (
            <p className="spell-diff" aria-label="あなたの答え">
              {markSpelling(input, w.en).map((x, i) => (
                <span key={i} className={x.ok ? '' : 'spell-ng'}>
                  {x.ch}
                </span>
              ))}
            </p>
          )}
          <button className="flip" onClick={next}>
            次へ
          </button>
        </>
      )}
    </section>
  )
}
