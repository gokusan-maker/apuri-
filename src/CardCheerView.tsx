import { speak } from './speech'
import { CARD_BONUS_COINS, cardCheer, isCardBonus } from './cardcheer'

// 10枚ごとのモチのひとこと（音は🔊を押したときだけ）
export function CardCheer({ done }: { done: number }) {
  const line = cardCheer(done)
  if (!line) return null
  return (
    <p className="card-cheer" role="status">
      <span aria-hidden="true">🍡 </span>
      <span className="ally-line">{line.en}</span>
      <span className="muted">{line.ja}</span>
      {isCardBonus(done) && <strong className="card-bonus">🪙 +{CARD_BONUS_COINS}コインのごほうび！</strong>}
      <button className="speak small" onClick={() => speak(line.en)} aria-label="モチのひとことを聞く">
        🔊
      </button>
    </p>
  )
}
