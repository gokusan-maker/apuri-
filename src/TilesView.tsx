import { useState } from 'react'
import type { Source } from './monster'
import { shuffle } from './quiz'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'
import { spellXp } from './spell'
import type { Word } from './words'

type Props = {
  words: Word[]
  count?: number
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
}

type Tile = { id: number; ch: string }

// 単語の文字（空白以外）をバラバラにしたタイル。元と同じ並びにはしない
function tilesFor(en: string): Tile[] {
  const letters = [...en.replace(/\s/g, '')]
  let s = shuffle(letters)
  for (let i = 0; i < 5 && s.join('') === letters.join('') && new Set(letters).size > 1; i++) s = shuffle(letters)
  return s.map((ch, id) => ({ id, ch }))
}

const norm = (x: string) => x.replace(/\s/g, '').toLowerCase()

export function Tiles({ words, count = 10, onAnswer }: Props) {
  const [list, setList] = useState(() => shuffle(words.filter((w) => norm(w.en).length <= 12)).slice(0, count))
  const [index, setIndex] = useState(0)
  const [pool, setPool] = useState<Tile[]>(() => (list[0] ? tilesFor(list[0].en) : []))
  const [built, setBuilt] = useState<Tile[]>([])
  const [result, setResult] = useState<'ok' | 'ng' | null>(null)
  const [score, setScore] = useState(0)
  const w = list[index]

  function go(i: number, l = list) {
    setIndex(i)
    setPool(l[i] ? tilesFor(l[i].en) : [])
    setBuilt([])
    setResult(null)
  }

  function place(t: Tile) {
    if (result) return
    const nextBuilt = [...built, t]
    const nextPool = pool.filter((x) => x.id !== t.id)
    setBuilt(nextBuilt)
    setPool(nextPool)
    if (nextPool.length === 0) {
      const ok = nextBuilt.map((x) => x.ch).join('').toLowerCase() === norm(w.en)
      setResult(ok ? 'ok' : 'ng')
      if (ok) {
        setScore(score + 1)
        playCorrect()
      } else playWrong()
      onAnswer?.(ok, ok ? spellXp(0) : 0, w.id, 'ear')
      speak(w.en)
    }
  }

  if (!w) {
    return (
      <section className="card result">
        <p className="result-score">
          {score} / {list.length} 問正解
        </p>
        <button
          className="flip"
          onClick={() => {
            const l = shuffle(words.filter((x) => norm(x.en).length <= 12)).slice(0, count)
            setList(l)
            setScore(0)
            go(0, l)
          }}
        >
          もう1回
        </button>
      </section>
    )
  }

  return (
    <section className="card quiz tiles" aria-live="polite">
      <p className="progress">
        {index + 1} / {list.length}
      </p>
      <p className="en ja-prompt">{w.ja}</p>
      <div className="tile-built" aria-label="つくった単語">
        {built.map((t) => (
          <button
            key={t.id}
            className="tile"
            disabled={!!result}
            onClick={() => {
              setBuilt(built.filter((x) => x.id !== t.id))
              setPool([...pool, t])
            }}
          >
            {t.ch}
          </button>
        ))}
      </div>
      <div className="tile-pool" aria-label="文字">
        {pool.map((t) => (
          <button key={t.id} className="tile" onClick={() => place(t)}>
            {t.ch}
          </button>
        ))}
      </div>
      {result && (
        <>
          <p className="feedback">{result === 'ok' ? '正解！' : `正解は「${w.en}」`}</p>
          <button className="flip" onClick={() => go(index + 1)}>
            次へ
          </button>
        </>
      )}
    </section>
  )
}
