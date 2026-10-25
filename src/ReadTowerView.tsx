import type { LongPassage, LongRecord } from './longreading'
import { towerCleared, towerFloor } from './readtower'

// 読解の塔：下の階から1本ずつクリアしてのぼっていく（先は1階だけカギつきで見せる）
export function ReadTower({ list, record, titleOf, onOpen }: { list: LongPassage[]; record: LongRecord; titleOf: (p: LongPassage) => string; onOpen: (p: LongPassage) => void }) {
  if (list.length === 0) return null
  const now = towerFloor(list, record)
  const top = now >= list.length
  const shown = [...list.keys()].filter((i) => i >= now - 2 && i <= now + 1).reverse() // カギつきの次の階・いまの階・クリアした2階
  return (
    <section className="read-tower" aria-label="読解の塔">
      <p className="read-tower-head">
        🗼 読解の塔 <b>{top ? '🏆 てっぺん制覇！' : `${now + 1}階に挑戦中`}</b>
        <span className="read-tower-count" aria-label={`${now} / ${list.length} 階クリア`}>
          {now}/{list.length}階
        </span>
      </p>
      <div className="read-tower-body">
        <div className="read-tower-roof" aria-hidden="true" />
        <ol className="read-tower-floors">
          {shown.map((i) => {
            const p = list[i]
            const cleared = towerCleared(p, record)
            if (i > now)
              return (
                <li key={p.id} className="locked" aria-label={`${i + 1}階（まだ）`}>
                  <span className="rt-no">{i + 1}F</span>
                  <span className="rt-lock">🔒 つぎの階</span>
                </li>
              )
            return (
              <li key={p.id} className={i === now ? 'now' : cleared ? 'cleared' : ''}>
                <span className="rt-no">{i + 1}F</span>
                <button className="rt-btn" aria-label={`${i + 1}階：${titleOf(p)}${cleared ? '（クリア）' : ''}`} onClick={() => onOpen(p)}>
                  <span className="rt-title">{titleOf(p)}</span>
                  <span className="rt-state">{i === now ? '▶ のぼる' : '✅ クリア'}</span>
                </button>
              </li>
            )
          })}
        </ol>
        {now > 2 && <p className="read-tower-below">⬇ ここまで {now - 2}階クリアずみ</p>}
        <div className="read-tower-gate" aria-hidden="true" />
      </div>
    </section>
  )
}
