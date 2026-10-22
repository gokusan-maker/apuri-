import { useState } from 'react'
import { loadPlayedGames, markPlayedGame } from './gamesplayed'

// ゲームをえらぶタイル（大きな絵文字＋名前＋ひとこと）。いろんなゲームがあることがひと目でわかるように。
// playKey をわたすと、まだ一度も遊んでいないゲームに NEW 印がつく
type Props = { icon: string; name: string; sub?: string; on?: boolean; playKey?: string; onClick: () => void }

export function GameTile({ icon, name, sub, on = false, playKey, onClick }: Props) {
  const [fresh, setFresh] = useState(() => !!playKey && !loadPlayedGames().includes(playKey))
  return (
    <button
      className={on ? 'game-tile on' : 'game-tile'}
      aria-pressed={on || undefined}
      onClick={() => {
        if (playKey && fresh) {
          markPlayedGame(playKey)
          setFresh(false)
        }
        onClick()
      }}
    >
      {fresh && <span className="game-tile-new">NEW</span>}
      <span className="game-tile-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="game-tile-name">{name}</span>
      {sub && <small className="game-tile-sub">{sub}</small>}
    </button>
  )
}
