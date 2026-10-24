import { useState, type CSSProperties } from 'react'
import { dayKey } from './srs'
import { loadPlayedGames, loadTodayGames, markPlayedGame, markTodayGame } from './gamesplayed'

// ゲームをえらぶタイル（大きな絵文字＋名前＋ひとこと）。いろんなゲームがあることがひと目でわかるように。
// playKey をわたすと、まだ一度も遊んでいないゲームに NEW 印がつく
type Props = { icon: string; name: string; sub?: string; on?: boolean; playKey?: string; onClick: () => void }

// タイルの色：ゲームの名前ごとに決まる6色（ゲームのボタンらしく、いろいろな色が並ぶように）
const TILE_HUES = [330, 275, 225, 195, 150, 25]
const tileHue = (name: string) => TILE_HUES[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % TILE_HUES.length]

export function GameTile({ icon, name, sub, on = false, playKey, onClick }: Props) {
  const [fresh, setFresh] = useState(() => !!playKey && !loadPlayedGames().includes(playKey))
  const [played, setPlayed] = useState(() => !!playKey && loadTodayGames(dayKey()).includes(playKey))
  return (
    <button
      className={on ? 'game-tile on' : 'game-tile'}
      style={{ '--tile-h': tileHue(name) } as CSSProperties}
      aria-pressed={on || undefined}
      onClick={() => {
        if (playKey && fresh) {
          markPlayedGame(playKey)
          setFresh(false)
        }
        if (playKey && !played) {
          markTodayGame(playKey, dayKey())
          setPlayed(true)
        }
        onClick()
      }}
    >
      {fresh && <span className="game-tile-new">NEW</span>}
      {!fresh && played && <span className="game-tile-today">✅ 今日</span>}
      <span className="game-tile-icon" aria-hidden="true">
        {icon}
      </span>
      <span className={name.length >= 8 ? 'game-tile-name long' : 'game-tile-name'}>{name}</span>
      {sub && <small className="game-tile-sub">{sub}</small>}
    </button>
  )
}
