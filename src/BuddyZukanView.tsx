import { useState } from 'react'
import { ATTR_LABEL, BUDDY_FORMS, xpForLevel, zukanOf, type Buddies, type BuddyBox, type Track } from './buddies'
import { BuddyFigure } from './BuddyFigureView'

// 文法・読解のなかま図鑑：種類ごとに、会えた姿だけ絵と名前。まだの姿は ？？？
export function BuddyZukan({ buddies, box }: { buddies: Buddies; box: BuddyBox }) {
  const [picked, setPicked] = useState('') // タップした姿の名前
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
            {rows.map((r) => (
              <div key={r.sp.id} className="buddy-zukan-row" aria-label={`${r.sp.label}の図鑑`}>
                <p className="buddy-zukan-name">{r.level > 0 ? r.sp.label : '？？？'}</p>
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
          </div>
        )
      })}
    </section>
  )
}
