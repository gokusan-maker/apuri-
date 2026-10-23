import { speak } from './speech'
import type { Word } from './words'

export function WordOfDay({ word, claimed = false }: { word: Word | undefined; claimed?: boolean }) {
  if (!word) return null
  return (
    <section className="card wotd">
      <p className="wotd-label">今日のことば</p>
      <p className="wotd-word">
        {word.en}
        <button className="speak small" onClick={() => speak(word.en)} aria-label="今日のことばを聞く">
          🔊
        </button>
        <span className="wotd-ja">{word.ja}</span>
      </p>
      <p className="example">{word.example}</p>
      <p className="example-ja">{word.exampleJa}</p>
      <p className="lucky">{claimed ? '🍀 ラッキーボーナス獲得ずみ！' : '🍀 ラッキー単語：正解で +20XP'}</p>
    </section>
  )
}
