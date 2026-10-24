import { speak } from './speech'
import type { Word } from './words'

// 今日のことば：単語・意味・🔊を1行に、例文はタップで開く（文字を少なく）
export function WordOfDay({ word, claimed = false }: { word: Word | undefined; claimed?: boolean }) {
  if (!word) return null
  return (
    <section className="card wotd">
      <p className="wotd-label">
        🍀 今日のことば
        <span className={claimed ? 'wotd-lucky got' : 'wotd-lucky'} title={claimed ? 'ラッキーボーナス獲得ずみ' : 'ラッキー単語：正解で +20XP'}>
          {claimed ? '✅ ゲット' : '正解で +20XP'}
        </span>
      </p>
      <p className="wotd-word">
        <span className="wotd-en">{word.en}</span>
        <span className="wotd-ja">{word.ja}</span>
        <button className="speak small" onClick={() => speak(word.en)} aria-label="今日のことばを聞く">
          🔊
        </button>
      </p>
      {word.example && (
        <details className="wotd-ex">
          <summary>例文</summary>
          <p className="example">{word.example}</p>
          <p className="example-ja">{word.exampleJa}</p>
        </details>
      )}
    </section>
  )
}
