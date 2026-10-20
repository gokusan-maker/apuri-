import { useState } from 'react'
import { searchWords } from './search'
import { speak } from './speech'
import type { ProgressMap } from './srs'
import { levelOf, type Word } from './words'

type Props = {
  words: Word[]
  progress: ProgressMap
  onClose: () => void
}

function status(box: number | undefined): string {
  if (box === undefined) return 'まだ'
  if (box >= 3) return '定着'
  return '学習中'
}

export function WordList({ words, progress, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  const hits = searchWords(words, query)

  return (
    <section className="card word-list">
      <button className="stage-back" onClick={onClose}>
        ← カードにもどる
      </button>
      <h2>単語一覧</h2>
      <input
        className="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="英語か日本語でさがす"
        aria-label="単語をさがす"
        autoCapitalize="none"
      />
      <p className="stats-note">{hits.length}語</p>
      <ul className="words">
        {hits.map((w) => {
          const box = progress[w.id]?.box
          return (
            <li key={w.id}>
              <button className="word-row" onClick={() => setOpen(open === w.id ? null : w.id)} aria-expanded={open === w.id}>
                <span className="weak-en">{w.en}</span>
                <span className="weak-ja">{w.ja}</span>
                <span className={`word-status s-${status(box)}`}>{status(box)}</span>
              </button>
              {open === w.id && (
                <div className="word-detail">
                  <button className="speak small" onClick={() => speak(w.en)} aria-label={`${w.en}の発音を聞く`}>
                    🔊
                  </button>
                  <span className="word-level">{w.id.startsWith('my:') ? 'マイ単語帳' : levelOf(w)}</span>
                  {w.example && (
                    <>
                      <p className="example">{w.example}</p>
                      <p className="example-ja">{w.exampleJa}</p>
                    </>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
