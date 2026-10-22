import { useState } from 'react'
import { BuddyFigure } from './BuddyFigureView'
import { BUDDY_FORMS, buddyForm, buddyLevel, TRACK_LABEL, type Buddies, type Track } from './buddies'

type Props = { buddies: Buddies; onRename: (track: Track, name: string) => void }

// 文法のことばモンスター・読解の竜のくわしい画面：名前・次の進化まで・進化の一覧
export function BuddyDetail({ buddies, onRename }: Props) {
  const [editing, setEditing] = useState<Track | null>(null)
  const [draft, setDraft] = useState('')
  return (
    <div className="buddy-detail">
      {(['grammar', 'reading'] as Track[]).map((t) => {
        const b = buddies[t]
        const f = buddyForm(t, b)
        const lv = buddyLevel(b)
        const next = BUDDY_FORMS[t].find((x) => x.minLv > lv.level)
        return (
          <section key={t} className={`buddy-box b-${t}`} aria-label={`${TRACK_LABEL[t]}のなかま`}>
            <h3>
              {TRACK_LABEL[t]}のなかま <BuddyFigure track={t} buddy={b} size={64} />
            </h3>
            {editing === t ? (
              <form
                className="buddy-rename"
                onSubmit={(e) => {
                  e.preventDefault()
                  onRename(t, draft.trim().slice(0, 10))
                  setEditing(null)
                }}
              >
                <input aria-label="なかまの名前" value={draft} maxLength={10} onChange={(e) => setDraft(e.target.value)} />
                <button type="submit">決定</button>
              </form>
            ) : (
              <p>
                <strong>{b.name ?? f.name}</strong>（{f.name}）Lv.{lv.level}
                <button
                  className="list-link"
                  onClick={() => {
                    setDraft(b.name ?? '')
                    setEditing(t)
                  }}
                >
                  ✏️ 名前をつける
                </button>
              </p>
            )}
            <p className="stats-note">
              次のレベルまで あと {lv.need - lv.into} XP{next ? `・Lv.${next.minLv}で「${next.name}」に進化` : '・さいごの姿！'}
            </p>
            <ol className="buddy-forms">
              {BUDDY_FORMS[t].map((x) => (
                <li key={x.name} className={lv.level >= x.minLv ? 'got' : 'locked'}>
                  <span aria-hidden="true">{lv.level >= x.minLv ? x.icon : '❔'}</span>
                  {lv.level >= x.minLv ? x.name : '？？？'}（Lv.{x.minLv}〜）
                </li>
              ))}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
