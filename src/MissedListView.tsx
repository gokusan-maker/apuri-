import type { Word } from './words'

// 結果画面の「まちがえた単語」一覧
export function MissedList({ words, label = 'まちがえた単語' }: { words: Word[]; label?: string }) {
  if (words.length === 0) return null
  return (
    <ul className="missed-list" aria-label={label}>
      {words.map((w, i) => (
        <li key={i}>
          <strong>{w.en}</strong> {w.ja}
        </li>
      ))}
    </ul>
  )
}
