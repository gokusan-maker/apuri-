import { useState } from 'react'
import { ATTR_LABEL, BUDDY_FORMS, claimZukanComp, loadZukanComp, xpForLevel, zukanOf, type Buddies, type BuddyBox, type Track } from './buddies'
import { BuddyFigure } from './BuddyFigureView'

// 文法・読解のなかま図鑑：種類ごとに、会えた姿だけ絵と名前。まだの姿は ？。まだ会っていない種類は数だけ（？？？の行をならべない）
export function BuddyZukan({ buddies, box, onComp }: { buddies: Buddies; box: BuddyBox; onComp?: () => void }) {
  const [picked, setPicked] = useState('') // タップした姿の名前
  const [comp, setComp] = useState(loadZukanComp) // コンプボーナスを受け取った種類
  return (
    <section className="buddy-zukan" aria-label="なかま図鑑">
      <h3>📖 なかま図鑑（文法・読解）</h3>
      {picked && (
        <p className="level-up zukan-picked" role="status">
          {picked}
        </p>
      )}
      {(['grammar', 'reading'] as Track[]).map((t) => {
        const rows = zukanOf(t, buddies, box)
        const seen = rows.reduce((a, r) => a + r.seen, 0)
        const total = rows.length * BUDDY_FORMS[t].length
        return (
          <div key={t} className="buddy-zukan-track">
            <p className="stats-note">
              <span className={`attr-badge attr-${t}`}>属性：{ATTR_LABEL[t]}</span> 会えた姿 {seen} / {total}
            </p>
            {rows.filter((r) => r.level > 0).map((r) => (
              <div key={r.sp.id} className="buddy-zukan-row" aria-label={`${r.sp.label}の図鑑`}>
                <p className="buddy-zukan-name">
                  {r.sp.label}
                  {r.seen === BUDDY_FORMS[t].length &&
                    (comp.includes(`${t}:${r.sp.id}`) ? (
                      <span className="zukan-comp"> 🏆 コンプ！</span>
                    ) : (
                      onComp && (
                        <button
                          className="zukan-comp-btn"
                          onClick={() => {
                            setComp(claimZukanComp(`${t}:${r.sp.id}`))
                            onComp()
                          }}
                        >
                          🎁 コンプボーナス🎟を受け取る
                        </button>
                      )
                    ))}
                </p>
                <ul>
                  {BUDDY_FORMS[t].map((f) =>
                    r.level >= f.minLv ? (
                      <li key={f.name} title={r.sp.prefix + f.name}>
                        <button className="zukan-fig" aria-label={`${r.sp.prefix + f.name}（Lv.${f.minLv}〜）`} onClick={() => setPicked(`${r.sp.prefix + f.name}（Lv.${f.minLv}〜）`)}>
                          <BuddyFigure track={t} buddy={{ xp: xpForLevel(f.minLv), species: r.sp.id }} size={36} />
                        </button>
                      </li>
                    ) : (
                      <li key={f.name} className="locked" aria-label="まだ会っていない姿">
                        ？
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
            {rows.some((r) => r.level === 0) && (
              <p className="buddy-zukan-more" aria-label={`まだ会っていない種類 ${rows.filter((r) => r.level === 0).length}`}>
                🔒 ？？？ ×{rows.filter((r) => r.level === 0).length}
              </p>
            )}
          </div>
        )
      })}
    </section>
  )
}
