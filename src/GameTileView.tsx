// ゲームをえらぶタイル（大きな絵文字＋名前＋ひとこと）。いろんなゲームがあることがひと目でわかるように
type Props = { icon: string; name: string; sub?: string; on?: boolean; onClick: () => void }

export function GameTile({ icon, name, sub, on = false, onClick }: Props) {
  return (
    <button className={on ? 'game-tile on' : 'game-tile'} aria-pressed={on || undefined} onClick={onClick}>
      <span className="game-tile-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="game-tile-name">{name}</span>
      {sub && <small className="game-tile-sub">{sub}</small>}
    </button>
  )
}
