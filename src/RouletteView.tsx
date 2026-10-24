import { useState } from 'react'
import { ROULETTE, spinRoulette, type RoulettePrize } from './roulette'

const rand = () => Math.random()

type Props = { done: boolean; onPrize: (p: RoulettePrize) => void }

export function Roulette({ done, onPrize }: Props) {
  const [hit, setHit] = useState<number | null>(null)
  if (done && hit === null) return null
  return (
    <div className="roulette">
      <ul className={`roulette-wheel${hit !== null ? ' spun' : ''}`} aria-label="ルーレット">
        {ROULETTE.map((p, i) => (
          <li key={i} className={hit === i ? 'hit' : undefined}>
            {p.label}
          </li>
        ))}
      </ul>
      {hit === null ? (
        <button
          className="challenge-btn"
          onClick={() => {
            const i = spinRoulette(rand())
            setHit(i)
            onPrize(ROULETTE[i])
          }}
        >
          🎡 今日のルーレットをまわす
        </button>
      ) : (
        <p className="level-up" role="status">
          🎉 {ROULETTE[hit].label} が当たった！
        </p>
      )}
    </div>
  )
}
