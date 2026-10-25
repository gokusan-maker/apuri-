import type { BossGroup } from './bossfilter'

export type WorldRegion = { id: BossGroup; name: string; sub: string; done: number; total: number }

// 地図の上の地方の位置（%）と目じるし
const PLACE: Record<BossGroup, { x: number; y: number; mark: string; land: string }> = {
  jh: { x: 28, y: 30, mark: '🦇', land: 'どうくつ' },
  hs: { x: 72, y: 30, mark: '🌋', land: '火山' },
  adv: { x: 72, y: 72, mark: '🏯', land: '魔王城' },
  basic: { x: 28, y: 72, mark: '🍄', land: 'まよいの森' },
}

// ボス部屋のさいしょ：海にうかぶ島の地図。4つの地方（中学のどうくつ・高校の火山・上級の魔王城・きほんのまよいの森）から行き先をえらぶ
export function BossWorld({ regions, onPick }: { regions: WorldRegion[]; onPick: (id: BossGroup) => void }) {
  return (
    <section className="bworld" aria-label="ボスの世界地図">
      <p className="bworld-title">🗺 ボスの世界地図</p>
      <div className="bworld-sea">
        <svg className="bworld-bg" viewBox="0 0 300 300" aria-hidden="true">
          <path className="bworld-island" d="M40 70 C 60 20, 140 15, 165 40 C 200 10, 280 30, 270 95 C 300 140, 285 230, 240 260 C 190 295, 120 290, 80 265 C 25 240, 10 160, 30 120 C 18 100, 25 85, 40 70 Z" />
          <path className="bworld-r jh" d="M40 70 C 60 20, 140 15, 150 40 L 150 150 L 25 150 C 15 120, 25 85, 40 70 Z" />
          <path className="bworld-r hs" d="M150 40 C 200 10, 280 30, 270 95 C 285 120, 285 140, 283 150 L 150 150 Z" />
          <path className="bworld-r adv" d="M150 150 L 283 150 C 280 200, 270 240, 240 260 C 200 290, 160 292, 150 290 Z" />
          <path className="bworld-r basic" d="M25 150 L 150 150 L 150 290 C 120 290, 100 280, 80 265 C 30 240, 12 190, 25 150 Z" />
          <path className="bworld-road" d="M84 90 C 150 70, 170 80, 216 90 C 230 150, 220 180, 216 216 C 160 230, 120 230, 84 216 C 70 170, 80 130, 84 90" />
          <text className="bworld-wave" x="12" y="30">〜</text>
          <text className="bworld-wave" x="262" y="290">〜</text>
          <text className="bworld-wave" x="270" y="20">〜</text>
        </svg>
        {regions.map((r) => {
          const p = PLACE[r.id]
          const full = r.total > 0 && r.done === r.total
          return (
            <button key={r.id} className={`bworld-spot bw-${r.id}${full ? ' full' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} aria-label={`${r.name}（${r.done}/${r.total}）`} onClick={() => onPick(r.id)}>
              <span className="bworld-mark" aria-hidden="true">
                {full ? '👑' : p.mark}
              </span>
              <strong className="bworld-name">
                {r.name}の{p.land}
              </strong>
              <small className="bworld-sub">
                {r.sub}・{r.done}/{r.total}
              </small>
            </button>
          )
        })}
      </div>
    </section>
  )
}
