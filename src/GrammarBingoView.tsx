import { useState } from 'react'
import { BINGO_COINS, bingoCount, makeBingo } from './grammarbingo'
import { playCorrect, playWrong } from './sound'

const rand = () => Math.random()

type Props = { onBack: () => void; onBingo?: () => void }

export function GrammarBingo({ onBack, onBingo }: Props) {
  const [qs] = useState(() => makeBingo(rand))
  const [cells, setCells] = useState<(boolean | null)[]>(() => Array(9).fill(null))
  const [open, setOpen] = useState<number | null>(null)
  const ok = cells.map((c) => c === true)
  const lines = bingoCount(ok)
  const q = open !== null ? qs[open] : null
  return (
    <section className="card grammar grammar-bingo">
      <button className="stage-back" onClick={onBack}>
        ← 単元一覧
      </button>
      <h2>🎯 文法ビンゴ</h2>
      <p className="stats-note">マスをタップして問題に答えよう。正解のマスが1列そろうとビンゴ！ 🪙{BINGO_COINS}</p>
      <div className="bingo-grid">
        {qs.map((_, i) => (
          <button key={i} className={`bingo-cell${cells[i] === true ? ' ok' : cells[i] === false ? ' ng' : ''}`} disabled={cells[i] !== null} onClick={() => setOpen(i)} aria-label={`マス ${i + 1}${cells[i] === true ? ' 正解' : cells[i] === false ? ' まちがい' : ''}`}>
            {cells[i] === true ? '⭕' : cells[i] === false ? '❌' : i + 1}
          </button>
        ))}
      </div>
      {lines > 0 && <p className="level-up">🎉 ビンゴ！ {lines}列そろった（🪙{BINGO_COINS}）</p>}
      {q && open !== null && (
        <div className="bingo-q">
          <p className="example blank-sentence">{q.sentence.replace('___', '（　　）')}</p>
          <div className="choices">
            {q.choices.map((c, i) => (
              <button
                key={c}
                className="choice"
                onClick={() => {
                  const right = i === q.answer
                  const next = cells.map((x, k) => (k === open ? right : x))
                  if (right) playCorrect()
                  else playWrong()
                  if (bingoCount(next.map((x) => x === true)) > 0 && lines === 0) onBingo?.()
                  setCells(next)
                  setOpen(null)
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      {cells.every((c) => c !== null) && <p className="result-message">全部のマスに答えた！ {lines > 0 ? 'ナイス！' : 'つぎはビンゴをねらおう'}</p>}
    </section>
  )
}
