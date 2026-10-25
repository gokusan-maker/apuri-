import { floorCheer } from './castle'

// 城の階をクリアしたときのお祝い：紙ふぶきと「とびらがひらいた」、なかまのひとこと（floor：何階目か）
export function FloorClear({ next, floor }: { next?: string; floor?: number }) {
  return (
    <div className="floor-clear" role="status">
      <span className="floor-clear-confetti" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 7) * 0.12}s` }} />
        ))}
      </span>
      <strong className="floor-clear-title">🎉 階クリア！</strong>
      {floor !== undefined && <span className="floor-clear-cheer">🐾 「{floorCheer(floor)}」</span>}
      <span className="floor-clear-door">{next ? `🔓 次の階「${next}」のとびらがひらいた！` : '👑 この城のてっぺんに着いた！'}</span>
    </div>
  )
}
