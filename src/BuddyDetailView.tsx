import { useState } from 'react'
import { BuddyFigure } from './BuddyFigureView'
import { speak } from './speech'
import { dayMedal, nextDayMedal, SPECIES_PROFILE, evoDayLabel, loadEvoLog, loadBuddyDays, ATTR_LABEL, BUDDY_FORMS, BUDDY_SPECIES, buddyLevel, buddyName, formName, isUnlocked, speciesOf, TRACK_LABEL, type Buddies, type BuddyBox, type Track } from './buddies'

type Props = {
  buddies: Buddies
  onRename: (track: Track, name: string) => void
  box?: BuddyBox // 入れかえて休んでいるなかま
  onSwitch?: (track: Track, speciesId: string) => void // 同じ属性のなかまと入れかえる
}

// 文法のことばモンスター・読解の竜のくわしい画面：名前・次の進化まで・進化の一覧
export function BuddyDetail({ buddies, onRename, box = { grammar: {}, reading: {} }, onSwitch }: Props) {
  const [editing, setEditing] = useState<Track | null>(null)
  const [draft, setDraft] = useState('')
  const [days] = useState(loadBuddyDays)
  const [evoLog] = useState(loadEvoLog)
  return (
    <div className="buddy-detail">
      {(['grammar', 'reading'] as Track[]).map((t) => {
        const b = buddies[t]
        const lv = buddyLevel(b)
        const next = BUDDY_FORMS[t].find((x) => x.minLv > lv.level)
        return (
          <section key={t} className={`buddy-box b-${t}`} aria-label={`${TRACK_LABEL[t]}のなかま`}>
            <h3>
              {TRACK_LABEL[t]}のなかま <BuddyFigure track={t} buddy={b} size={64} />
              <span className={`attr-badge attr-${t}`}>属性：{ATTR_LABEL[t]}</span>
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
                <strong>{buddyName(t, b)}</strong>{buddyName(t, b) !== formName(t, b) && `（${formName(t, b)}）`} Lv.{lv.level}
                <button
                  className="list-link buddy-rename-btn"
                  onClick={() => {
                    setDraft(b.name ?? '')
                    setEditing(t)
                  }}
                >
                  ✏️ 名前をつける
                </button>
              </p>
            )}
            <p className="stats-note buddy-next">
              あと {lv.need - lv.into}XP で Lv.{lv.level + 1}{next ? `・Lv.${next.minLv}で ？？？` : '・さいごの姿！'}
            </p>
            <div className="buddy-xpbar" aria-hidden="true">
              <i style={{ width: `${Math.min(100, Math.round((lv.into / Math.max(1, lv.need)) * 100))}%` }} />
            </div>
            {SPECIES_PROFILE[speciesOf(t, b).id] && (
              <p className="buddy-profile">
                <span className="ally-line">{SPECIES_PROFILE[speciesOf(t, b).id].en}</span>
                <span className="muted">{SPECIES_PROFILE[speciesOf(t, b).id].ja}</span>
                <button className="speak small" onClick={() => speak(SPECIES_PROFILE[speciesOf(t, b).id].en)} aria-label={`${TRACK_LABEL[t]}のなかまのプロフィールを聞く`}>
                  🔊
                </button>
              </p>
            )}
            <p className="buddy-chips">
              <span aria-label={`いっしょに学んだ日 ${days[t]}日`}>
                🗓 {days[t]}日{dayMedal(days[t]) && ` ${dayMedal(days[t])}`}
                {nextDayMedal(days[t]) && <small>あと{nextDayMedal(days[t])!.days - days[t]}日で{nextDayMedal(days[t])!.icon}</small>}
              </span>
              <span aria-label={`これまでの経験値 ${b.xp} XP`}>✨ {b.xp}XP</span>
            </p>
            {onSwitch && (
              <div className="buddy-switch" role="group" aria-label={`${TRACK_LABEL[t]}のなかまを入れかえる`}>
                <p className="stats-note">🔁 入れかえ（{ATTR_LABEL[t]}のなかまだけ）</p>
                {BUDDY_SPECIES[t].map((sp) => {
                  const on = speciesOf(t, b).id === sp.id
                  const open = isUnlocked(t, sp, buddies, box)
                  const mate = on ? b : (box[t][sp.id] ?? { xp: 0, species: sp.id })
                  return (
                    <button key={sp.id} className="buddy-switch-item" aria-pressed={on} disabled={!open || on} title={open ? undefined : 'ショップの属性のタマゴでも仲間にできる'} onClick={() => onSwitch(t, sp.id)}>
                      {open ? <BuddyFigure track={t} buddy={mate} size={40} /> : <span className="buddy-lock">🔒</span>}
                      <span>
                        {sp.label}
                        <small>{on ? '（いまのなかま）' : open ? `Lv.${buddyLevel(mate).level}` : `🔓 Lv.${sp.unlockLv} で仲間に`}</small>
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
            <ol className="buddy-forms">
              {BUDDY_FORMS[t].map((x) => (
                <li key={x.name} className={lv.level >= x.minLv ? 'got' : 'locked'}>
                  <span aria-hidden="true">{lv.level >= x.minLv ? x.icon : '❔'}</span>
                  {lv.level >= x.minLv ? x.name : '？？？'}（Lv.{x.minLv}〜）
                  {lv.level >= x.minLv && evoLog[t][x.name] && <small className="evo-day">・{evoDayLabel(evoLog[t][x.name])}</small>}
                </li>
              ))}
            </ol>
          </section>
        )
      })}
    </div>
  )
}
