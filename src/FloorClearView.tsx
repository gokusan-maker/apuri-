import { floorCheer, isMilestone, nextChestIn } from './castle'

// 城の階をクリアしたときのお祝い：紙ふぶきと「とびらがひらいた」、なかまのひとこと（floor：何階目か）
export function FloorClear({ next, floor, total }: { next?: string; floor?: number; total?: number }) {
  // 宝箱：いまクリアした階が宝箱の階なら「あけられる」、ちがえば次の宝箱まであと何階か
  const done = floor !== undefined ? floor + 1 : 0
  const chestNow = total !== undefined && floor !== undefined && isMilestone(done, total)
  const chestIn = total !== undefined && floor !== undefined ? nextChestIn(done, total) : null
  return (
    <div className="floor-clear" role="status">
      <span className="floor-clear-confetti" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 7) * 0.12}s` }} />
        ))}
      </span>
      <strong className="floor-clear-title">🎉 階クリア！</strong>
      {floor !== undefined && <span className="floor-clear-cheer">🐾 「{floorCheer(floor)}」</span>}
      {chestNow && <span className="floor-clear-chest">🎁 宝箱がひらけるよ！ 地図にもどってあけよう</span>}
      {!chestNow && chestIn !== null && <span className="floor-clear-chest">🎁 次の宝箱まで あと{chestIn}階</span>}
      <span className="floor-clear-door">{next ? `🔓 次の階「${next}」のとびらがひらいた！` : '👑 この城のてっぺんに着いた！'}</span>
    </div>
  )
}
