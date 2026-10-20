import { useState } from 'react'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect } from './sound'
import { makeSearch, matchWord, type Puzzle } from './wordsearch'
import type { Word } from './words'

type Props = {
  words: Word[]
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onClear?: () => void
  initial?: Puzzle // テスト用
}

// ことばさがし：意味を見て、かくれた英単語の文字を順にタップする
export function WordSearch({ words, onAnswer, onClear, initial }: Props) {
  const [hard, setHard] = useState(false)
  const [p, setP] = useState(() => initial ?? makeSearch(words))
  const SIZE = p.size
  const [picked, setPicked] = useState<number[]>([])
  const [found, setFound] = useState<string[]>([])
  const done = found.length === p.placed.length

  function tap(k: number) {
    if (done || picked.includes(k)) return
    const next = [...picked, k]
    const hit = matchWord(p, next)
    if (hit && !found.includes(hit.word.id)) {
      playCorrect()
      const f = [...found, hit.word.id]
      setFound(f)
      setPicked([])
      onAnswer?.(true, XP_QUIZ_CORRECT, hit.word.id, 'quiz')
      if (f.length === p.placed.length) onClear?.()
      return
    }
    setPicked(next.length > SIZE ? [k] : next)
  }

  const foundCells = new Set(p.placed.filter((x) => found.includes(x.word.id)).flatMap((x) => x.cells))

  return (
    <section className="card quiz wordsearch">
      <ul className="ws-hints" aria-label="さがす単語">
        {p.placed.map((x) => (
          <li key={x.word.id} className={found.includes(x.word.id) ? 'found' : ''}>
            {found.includes(x.word.id) ? `✅ ${x.word.en}（${x.word.ja}）` : `${x.word.ja}（${x.word.en.length}文字）`}
          </li>
        ))}
      </ul>
      <div className="counts" role="group" aria-label="むずかしさ">
        {[false, true].map((h) => (
          <button
            key={String(h)}
            aria-pressed={hard === h}
            onClick={() => {
              setHard(h)
              setP(h ? makeSearch(words, 5, Math.random, 8) : makeSearch(words))
              setFound([])
              setPicked([])
            }}
          >
            {h ? 'むずかしい（8×8）' : 'ふつう（6×6）'}
          </button>
        ))}
      </div>
      <div className="ws-grid" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}>
        {p.grid.map((ch, k) => (
          <button key={k} className={`ws-cell${foundCells.has(k) ? ' found' : ''}${picked.includes(k) ? ' picked' : ''}`} onClick={() => tap(k)} aria-label={`${Math.floor(k / SIZE) + 1}行${(k % SIZE) + 1}列 ${ch}`}>
            {ch}
          </button>
        ))}
      </div>
      <p className="stats-note">
        えらんだ文字：{picked.map((k) => p.grid[k]).join('') || '—'}
        {picked.length > 0 && (
          <button className="note-btn" onClick={() => setPicked([])}>
            けす
          </button>
        )}
      </p>
      {done && (
        <>
          <p className="level-up">ぜんぶ見つけた！</p>
          <button
            className="flip"
            onClick={() => {
              setP(hard ? makeSearch(words, 5, Math.random, 8) : makeSearch(words))
              setFound([])
              setPicked([])
            }}
          >
            もう1回
          </button>
        </>
      )}
    </section>
  )
}
