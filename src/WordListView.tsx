import { useState } from 'react'
import { searchWords } from './search'
import { speak } from './speech'
import type { ProgressMap } from './srs'
import { levelOf, type Word } from './words'
import { Note } from './NoteView'

type Props = {
  words: Word[]
  progress: ProgressMap
  onClose: () => void
  favorites?: string[]
  onToggleFavorite?: (id: string) => void
  notes?: Record<string, string>
  onNote?: (id: string, text: string) => void
}

type Filter = 'all' | 'まだ' | '学習中' | '定着' | 'fav'
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'ぜんぶ' },
  { id: 'まだ', label: 'まだ' },
  { id: '学習中', label: '学習中' },
  { id: '定着', label: '定着' },
  { id: 'fav', label: '★' },
]

function status(box: number | undefined): string {
  if (box === undefined) return 'まだ'
  if (box >= 3) return '定着'
  return '学習中'
}

export function WordList({ words, progress, onClose, favorites = [], onToggleFavorite, notes = {}, onNote }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')
  const hits = searchWords(words, query).filter((w) => {
    if (filter === 'all') return true
    if (filter === 'fav') return favorites.includes(w.id)
    return status(progress[w.id]?.box) === filter
  })

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
      <div className="levels word-filter" role="group" aria-label="しぼりこみ">
        {FILTERS.map((f) => (
          <button key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
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
                  {onToggleFavorite && (
                    <button
                      className={`fav inline${favorites.includes(w.id) ? ' on' : ''}`}
                      onClick={() => onToggleFavorite(w.id)}
                      aria-pressed={favorites.includes(w.id)}
                      aria-label={`${w.en}をお気に入り`}
                    >
                      {favorites.includes(w.id) ? '★' : '☆'}
                    </button>
                  )}
                  <span className="word-level">{w.id.startsWith('my:') ? 'マイ単語帳' : levelOf(w)}</span>
                  {w.example && (
                    <>
                      <p className="example">{w.example}</p>
                      <p className="example-ja">{w.exampleJa}</p>
                    </>
                  )}
                  {onNote && <Note text={notes[w.id]} onSave={(t) => onNote(w.id, t)} />}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
