import { playChirp } from './sound'
import { bondHearts, bondLevel, daysToNext } from './bond'
import { useEffect, useState, type FormEvent } from 'react'
import { FORM_DESC, FORMS, formOf, levelInfo, levelsToNextStage, NAME_MAX, seenForms, type Form, type MonsterState } from './monster'
import { EGG_MILESTONES, type Party as PartyState } from './party'
import { speak } from './speech'
import { pickLineNow, type Line } from './talk'

type Mood = 'normal' | 'happy' | 'lonely'

type Props = {
  monster: MonsterState
  onRename?: (name: string) => void
  coins?: number
  onShop?: () => void
  room?: string
  title?: string // 称号
  cheer?: Line | null // 外から見せるひとこと（応援）
  feeling?: { icon: string; text: string } // ごきげん
  gain?: { amount: number; key: number } | null // もらったXP（ふわっと浮かぶ）
  mood?: Mood
  leveledUp?: boolean
  evolved?: boolean
  deco?: string // 季節のイベントの飾り（🎃 など）
  shelf?: string[] // 部屋にかざるおみやげ（絵文字）
  sleepy?: boolean // 夜おそく（💤 を出す）
}

// 相棒は完全オリジナルのモチ型モンスター。段階と系統で色と飾りが変わる。
function Face({ mood }: { mood: Mood }) {
  if (mood === 'lonely') {
    return (
      <>
        <path d="M33 58 q5 -4 10 0" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M57 58 q5 -4 10 0" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 74 Q50 69 56 74" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M70 60 q2 5 0 8 q-2 -3 0 -8" fill="#60a5fa" />
      </>
    )
  }
  return (
    <>
      <circle cx="38" cy="56" r="5" fill="#1f2937" />
      <circle cx="62" cy="56" r="5" fill="#1f2937" />
      <circle cx="30" cy="68" r="5" fill="#fca5a5" opacity="0.7" />
      <circle cx="70" cy="68" r="5" fill="#fca5a5" opacity="0.7" />
      {mood === 'happy' ? (
        <path d="M42 68 Q50 78 58 68" fill="#1f2937" />
      ) : (
        <path d="M44 70 Q50 74 56 70" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      )}
    </>
  )
}

// 飾り（タマゴのときは着られない）
export function Wear({ id }: { id?: string }) {
  switch (id) {
    case 'ribbon':
      return <path d="M62 30 L54 22 L54 38 Z M62 30 L70 22 L70 38 Z" fill="#f472b6" stroke="#9d174d" strokeWidth="2" />
    case 'glasses':
      return (
        <g fill="none" stroke="#1f2937" strokeWidth="2.5">
          <circle cx="38" cy="56" r="9" />
          <circle cx="62" cy="56" r="9" />
          <path d="M47 56 L53 56" />
        </g>
      )
    case 'scarf':
      return (
        <g fill="#ef4444" stroke="#991b1b" strokeWidth="2">
          <path d="M20 76 Q50 86 80 76 L80 82 Q50 92 20 82 Z" />
          <path d="M62 84 L66 98 L74 96 L70 82 Z" />
        </g>
      )
    case 'hat':
      return (
        <g fill="#1f2937" stroke="#000" strokeWidth="1.5">
          <rect x="32" y="22" width="36" height="6" rx="2" />
          <rect x="38" y="4" width="24" height="20" rx="2" />
          <rect x="38" y="17" width="24" height="4" fill="#dc2626" />
        </g>
      )
    case 'flower':
      return (
        <g stroke="#a16207" strokeWidth="1">
          {[30, 40, 50, 60, 70].map((x, i) => (
            <circle key={x} cx={x} cy={i % 2 ? 26 : 30} r="5" fill={i % 2 ? '#fde047' : '#f9a8d4'} />
          ))}
        </g>
      )
    case 'bowtie':
      return (
        <g fill="#7c3aed" stroke="#4c1d95" strokeWidth="2">
          <path d="M50 80 L38 72 L38 88 Z M50 80 L62 72 L62 88 Z" />
          <circle cx="50" cy="80" r="3.5" />
        </g>
      )
    case 'catears':
      return (
        <g stroke="#78350f" strokeWidth="2">
          <path d="M24 34 L28 10 L44 26 Z" fill="#fbbf24" />
          <path d="M76 34 L72 10 L56 26 Z" fill="#fbbf24" />
          <path d="M29 28 L31 17 L38 25 Z M71 28 L69 17 L62 25 Z" fill="#f9a8d4" stroke="none" />
        </g>
      )
    case 'witchhat':
      return (
        <g stroke="#1f2937" strokeWidth="2">
          <path d="M28 28 L72 28 L60 22 L54 2 L40 22 Z" fill="#7c3aed" />
          <rect x="40" y="20" width="20" height="4" fill="#f59e0b" stroke="none" />
        </g>
      )
    case 'santahat':
      return (
        <g stroke="#7f1d1d" strokeWidth="1.5">
          <path d="M30 28 Q48 0 70 14 L68 28 Z" fill="#dc2626" />
          <rect x="28" y="24" width="44" height="7" rx="3" fill="#fff" />
          <circle cx="71" cy="14" r="4" fill="#fff" />
        </g>
      )
    case 'crown':
      return (
        <g fill="#facc15" stroke="#a16207" strokeWidth="2">
          <path d="M32 28 L32 12 L41 20 L50 8 L59 20 L68 12 L68 28 Z" />
          <circle cx="50" cy="22" r="2.5" fill="#ef4444" stroke="none" />
        </g>
      )
    case 'headphones':
      return (
        <g>
          <path d="M18 56 Q18 18 50 18 Q82 18 82 56" fill="none" stroke="#1f2937" strokeWidth="4" />
          <rect x="10" y="50" width="12" height="18" rx="5" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
          <rect x="78" y="50" width="12" height="18" rx="5" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
        </g>
      )
    default:
      return null
  }
}

export function MonsterFigure({
  form,
  mood = 'normal',
  hidden = false,
  wear,
}: {
  form: Form
  mood?: Mood
  hidden?: boolean
  wear?: string
}) {
  const fill = hidden ? '#9ca3af' : form.color
  const line = hidden ? '#6b7280' : form.line
  if (form.stage === 0) {
    return (
      <svg viewBox="0 0 100 100" className="monster-svg" aria-hidden="true">
        <ellipse cx="50" cy="56" rx="30" ry="38" fill={fill} stroke={line} strokeWidth="3" />
        <path d="M30 50 l8 -6 l8 6 l8 -6 l8 6 l8 -6" fill="none" stroke={line} strokeWidth="3" />
        {!hidden && (
          <>
            <circle cx="40" cy="70" r="4" fill="#f59e0b" />
            <circle cx="60" cy="78" r="3" fill="#f59e0b" />
          </>
        )}
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 100 100" className="monster-svg" aria-hidden="true">
      {form.stage >= 5 && !hidden && (
        <g className="aura">
          <circle cx="50" cy="56" r="46" fill="none" stroke="#fde047" strokeWidth="3" strokeDasharray="4 6" />
          <path d="M14 30 l3 -7 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 Z M80 14 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 Z" fill="#fde047" />
        </g>
      )}
      {form.branch === 'ear' && (
        <>
          <path d="M18 60 Q2 46 8 32 Q18 44 24 50 Z" fill={fill} stroke={line} strokeWidth="3" />
          <path d="M82 60 Q98 46 92 32 Q82 44 76 50 Z" fill={fill} stroke={line} strokeWidth="3" />
        </>
      )}
      <path d="M18 70 Q18 28 50 26 Q82 28 82 70 Q82 88 50 88 Q18 88 18 70 Z" fill={fill} stroke={line} strokeWidth="3" />
      {form.stage >= 2 && form.branch !== 'quiz' && form.branch !== 'card' && (
        <path d="M38 28 Q42 14 50 22 Q58 14 62 28" fill={fill} stroke={line} strokeWidth="3" />
      )}
      {form.branch === 'card' && (
        <path d="M50 27 Q38 8 54 4 Q62 18 50 27 Z M50 27 L54 10" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
      )}
      {form.branch === 'quiz' && <path d="M54 2 L40 22 L50 22 L44 34 L62 14 L52 14 Z" fill="#facc15" stroke="#a16207" strokeWidth="2" />}
      {form.stage >= 4 && <path d="M30 34 L33 24 L40 30 L50 20 L60 30 L67 24 L70 34 Z" fill="#fbbf24" stroke="#a16207" strokeWidth="2" />}
      {form.stage >= 6 && <ellipse cx="50" cy="12" rx="20" ry="5" fill="none" stroke="#fde047" strokeWidth="3" opacity="0.9" />}
      {hidden ? <text x="50" y="66" textAnchor="middle" fontSize="22" fill="#f3f4f6">？</text> : <Face mood={mood} />}
      {!hidden && <Wear id={wear} />}
    </svg>
  )
}

export function Monster({ monster, onRename, coins, onShop, room, title, cheer, feeling, gain, mood = 'normal', leveledUp = false, evolved = false, deco, shelf = [], sleepy = false }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [line, setLine] = useState<Line | null>(null)
  const [poke, setPoke] = useState(0)
  useEffect(() => {
    if (!line) return
    const id = window.setTimeout(() => setLine(null), 3500)
    return () => window.clearTimeout(id)
  }, [line])
  const { level, into, need } = levelInfo(monster.xp)
  const form = formOf(monster)
  const cls = mood === 'happy' ? ' bounce' : mood === 'lonely' ? ' droop' : ''
  return (
    <section className={`monster${room ? ` room-${room}` : ''}`} aria-label="相棒モンスター">
      {sleepy && (
        <span className="monster-zzz" aria-label="ねむそう">
          💤
        </span>
      )}
      {shelf.length > 0 && (
        <span className="monster-shelf" aria-label={`かざってあるおみやげ ${shelf.length}こ`}>
          {shelf.join('')}
        </span>
      )}
      {deco && (
        <span className="monster-deco" aria-label={`飾り ${deco}`}>
          {deco}
        </span>
      )}
      <button
        key={poke}
        className={`monster-body${cls}${evolved ? ' evolve' : ''}${poke ? ' bounce' : ''}`}
        aria-label="相棒にさわる"
        onClick={() => {
          const l = pickLineNow(form.stage, mood === 'lonely', Math.random())
          setLine(l)
          playChirp(form.stage)
          setPoke(poke + 1)
          if (form.stage > 0) speak(l.en)
        }}
      >
        <MonsterFigure form={form} mood={line ? 'happy' : mood} wear={monster.wear} />
        {gain && gain.amount > 0 && (
          <span key={gain.key} className="xp-float" aria-hidden="true">
            +{gain.amount}
          </span>
        )}
      </button>
      {(line ?? cheer) && (
        <div className="bubble" role="status" onClick={() => setLine(null)}>
          <span className="bubble-en">
            {(line ?? cheer)!.en}
            <button
              className="speak small"
              aria-label="ひとことを聞く"
              onClick={(e) => {
                e.stopPropagation()
                speak((line ?? cheer)!.en)
              }}
            >
              🔊
            </button>
          </span>
          <span className="bubble-ja">{(line ?? cheer)!.ja}</span>
        </div>
      )}
      <div className="monster-info">
        {editing ? (
          <form
            className="rename"
            onSubmit={(e: FormEvent) => {
              e.preventDefault()
              onRename?.(draft)
              setEditing(false)
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={NAME_MAX * 2}
              placeholder={form.name}
              aria-label="名前"
              autoFocus
            />
            <button type="submit">決定</button>
          </form>
        ) : (
          <p className="monster-name">
            {monster.name ? (
              <>
                {monster.name}
                <span className="monster-kind">（{form.name}）</span>
              </>
            ) : (
              form.name
            )}{' '}
            <span className="monster-level">Lv.{level}</span>
            {onRename && (
              <button
                className="rename-btn"
                aria-label="名前をつける"
                onClick={() => {
                  setDraft(monster.name ?? '')
                  setEditing(true)
                }}
              >
                ✏️
              </button>
            )}
          </p>
        )}
        {(title || feeling) && (
          <p className="title-badge">
            {title && `🎖 ${title}`}
            {feeling && <span className="feeling">{` ${feeling.icon} ${feeling.text}`}</span>}
          </p>
        )}
        <div className="xp-bar" role="progressbar" aria-valuemin={0} aria-valuemax={need} aria-valuenow={into}>
          <div className="xp-fill" style={{ width: `${(into / need) * 100}%` }} />
        </div>
        <p className="xp-text">
          XP {into} / {need}
          {coins !== undefined && (
            <button className="coins" onClick={onShop} aria-label={`コイン ${coins}枚・ショップを開く`}>
              🪙 {coins}
            </button>
          )}
        </p>
        {evolved ? (
          <p className="level-up">{form.stage === 1 ? 'タマゴがかえった！' : `${form.name}に進化した！`}</p>
        ) : leveledUp ? (
          <p className="level-up">レベルアップ！</p>
        ) : mood === 'lonely' ? (
          <p className="lonely">さみしそう… また一緒に勉強しよう</p>
        ) : null}
      </div>
    </section>
  )
}

export function Zukan({ monsters }: { monsters: MonsterState[] }) {
  const seen = new Set(monsters.flatMap(seenForms))
  const [detail, setDetail] = useState<Form | null>(null)
  return (
    <div className="zukan">
      <h2>
        モンスター図鑑 {seen.size} / {FORMS.length}
      </h2>
      <p className="stats-note">Lv15 からは、いちばん多く使った学び方で進化先が変わるよ。</p>
      <ul className="badge-grid">
        {FORMS.map((f) => (
          <li key={f.id} className={seen.has(f.id) ? 'got' : 'locked'}>
            <button
              className="party-pick zukan-pick"
              aria-label={seen.has(f.id) ? `${f.name}の説明` : 'まだ出会っていない姿'}
              disabled={!seen.has(f.id)}
              onClick={() => setDetail(detail?.id === f.id ? null : f)}
            >
              <span className="zukan-figure">
                <MonsterFigure form={f} hidden={!seen.has(f.id)} />
              </span>
              <span className="badge-name">{seen.has(f.id) ? f.name : '？？？'}</span>
              <span className="badge-desc">{f.hint}</span>
            </button>
          </li>
        ))}
      </ul>
      {detail && (
        <p className="zukan-detail" role="status">
          <strong>{detail.name}</strong>：{FORM_DESC[detail.id]}
        </p>
      )}
    </div>
  )
}

export function Party({ party, onSelect }: { party: PartyState; onSelect: (i: number) => void }) {
  const locked = EGG_MILESTONES.slice(party.members.length - 1)
  return (
    <div className="party">
      <h2>なかま</h2>
      <ul className="badge-grid">
        {party.members.map((m, i) => {
          const f = formOf(m)
          const active = i === party.active
          return (
            <li key={i} className={active ? 'got active' : 'got'}>
              <button className="party-pick party-member" onClick={() => onSelect(i)} aria-pressed={active}>
                <span className="zukan-figure">
                  <MonsterFigure form={f} wear={m.wear} />
                </span>
                <span className="badge-name">{m.name ?? f.name}</span>
                <span className="badge-desc">{active ? '相棒' : `Lv.${levelInfo(m.xp).level}`}</span>
              </button>
            </li>
          )
        })}
        {locked.map((m) => (
          <li key={m.badge} className="locked">
            <span className="badge-icon" aria-hidden="true">
              🥚
            </span>
            <span className="badge-name">？？？</span>
            <span className="badge-desc">{m.label}でタマゴ</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const SRC_LABEL = { card: 'カード', quiz: 'クイズ', ear: 'リスニング・スペル' } as const

export function Profile({ monster, studyDays = 0 }: { monster: MonsterState; studyDays?: number }) {
  const form = formOf(monster)
  const total = (monster.src?.card ?? 0) + (monster.src?.quiz ?? 0) + (monster.src?.ear ?? 0)
  return (
    <div className="profile">
      <h2>相棒のプロフィール</h2>
      <dl>
        <dt>名前</dt>
        <dd>{monster.name ?? form.name}</dd>
        <dt>すがた</dt>
        <dd>
          {form.name}（Lv.{levelInfo(monster.xp).level}）
        </dd>
        <dt>出会った日</dt>
        <dd>{monster.born ?? '記録なし'}</dd>
        <dt>累計XP</dt>
        <dd>{monster.xp}</dd>
        <dt>次の進化</dt>
        <dd>{levelsToNextStage(levelInfo(monster.xp).level) ? `あと ${levelsToNextStage(levelInfo(monster.xp).level)!.levels} レベル` : 'さいごのすがた！'}</dd>
        <dt>なつき度</dt>
        <dd aria-label={`なつき度 ${bondLevel(studyDays)}`}>
          {bondHearts(bondLevel(studyDays))}
          {daysToNext(studyDays) !== null && <small>（あと{daysToNext(studyDays)}日学習で❤️）</small>}
        </dd>
      </dl>
      <p className="stats-note">学び方の割合（Lv15 の進化先に影響）</p>
      {(['card', 'quiz', 'ear'] as const).map((k) => {
        const n = monster.src?.[k] ?? 0
        const pct = total ? Math.round((n / total) * 100) : 0
        return (
          <div key={k} className="by-level-row">
            <span className="by-level-name">{SRC_LABEL[k]}</span>
            <div className="goal-bar">
              <div className="goal-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="by-level-num">{pct}%</span>
          </div>
        )
      })}
    </div>
  )
}
