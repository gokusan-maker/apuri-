import { slotOf, wearList } from './shop'
import { playChirp } from './sound'
import { bondHearts, bondLevel, daysToNext } from './bond'
import { useEffect, useId, useState, type FormEvent } from 'react'
import { FORM_DESC, FORMS, formOf, levelInfo, levelsToNextStage, NAME_MAX, seenForms, type Form, type MonsterState } from './monster'
import { EGG_MILESTONES, type Party as PartyState } from './party'
import { speak } from './speech'
import { shade } from './color'
import { RoomScene } from './RoomSceneView'
import { pickLineNow, rememberLine, type Line } from './talk'

type Mood = 'normal' | 'happy' | 'lonely' | 'wink' | 'star' | 'wow'
// さわったときの表情（順番に変わる）
const REACTIONS: Mood[] = ['happy', 'wink', 'star', 'wow']

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
  learned?: { en: string; ja: string }[] // 覚えた単語（ときどき話題にする）
}

// 相棒は完全オリジナルのモチ型モンスター。段階と系統で色と飾りが変わる。
function Face({ mood }: { mood: Mood }) {
  if (mood === 'lonely') {
    return (
      <g className="monster-face">
        <path d="M31 54 l10 3" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M69 54 l-10 3" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M33 61 q5 -4 10 0" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M57 61 q5 -4 10 0" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 75 Q50 70 56 75" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path className="monster-tear" d="M68 64 q3 6 0 9 q-3 -3 0 -9" fill="#60a5fa" />
      </g>
    )
  }
  if (mood === 'wink' || mood === 'star' || mood === 'wow') {
    const star = 'M0 -7 l2 5 l5.5 0.5 l-4.2 3.6 l1.4 5.4 l-4.7 -3 l-4.7 3 l1.4 -5.4 l-4.2 -3.6 l5.5 -0.5 Z'
    return (
      <g className={`monster-face face-${mood}`}>
        {mood === 'star' ? (
          <g fill="#facc15" stroke="#a16207" strokeWidth="1.2">
            <path transform="translate(38 57)" d={star} />
            <path transform="translate(62 57)" d={star} />
          </g>
        ) : mood === 'wow' ? (
          <g fill="#1f2937">
            <circle cx="38" cy="56" r="5" />
            <circle cx="62" cy="56" r="5" />
            <circle cx="39.5" cy="54.5" r="1.6" fill="#fff" />
            <circle cx="63.5" cy="54.5" r="1.6" fill="#fff" />
          </g>
        ) : (
          <>
            <ellipse cx="38" cy="57" rx="6" ry="7.5" fill="#1f2937" />
            <circle cx="40" cy="54" r="2.4" fill="#fff" />
            <path d="M55 58 Q62 52 69 58" fill="none" stroke="#1f2937" strokeWidth="3.5" strokeLinecap="round" />
          </>
        )}
        <ellipse cx="28" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.55" />
        <ellipse cx="72" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.55" />
        {mood === 'wow' ? (
          <ellipse cx="50" cy="73" rx="4.5" ry="5.5" fill="#7f1d1d" stroke="#1f2937" strokeWidth="2" />
        ) : mood === 'wink' ? (
          <>
            <path d="M43 69 Q50 76 57 69" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M52 72 q3 5 6 1" fill="#fb7185" stroke="#1f2937" strokeWidth="1.5" />
          </>
        ) : (
          <path d="M42 68 Q50 80 58 68 Z" fill="#7f1d1d" stroke="#1f2937" strokeWidth="2" strokeLinejoin="round" />
        )}
      </g>
    )
  }
  return (
    <g className={mood === 'normal' ? 'monster-face glance' : 'monster-face'}>
      {mood === 'happy' ? (
        <>
          <path d="M31 59 Q38 49 45 59" fill="none" stroke="#1f2937" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M55 59 Q62 49 69 59" fill="none" stroke="#1f2937" strokeWidth="3.5" strokeLinecap="round" />
        </>
      ) : (
        <g className="monster-eyes">
          <ellipse cx="38" cy="57" rx="6" ry="7.5" fill="#1f2937" />
          <ellipse cx="62" cy="57" rx="6" ry="7.5" fill="#1f2937" />
          <circle cx="40" cy="54" r="2.4" fill="#fff" />
          <circle cx="64" cy="54" r="2.4" fill="#fff" />
          <circle cx="36" cy="60" r="1.1" fill="#fff" opacity="0.8" />
          <circle cx="60" cy="60" r="1.1" fill="#fff" opacity="0.8" />
        </g>
      )}
      <ellipse cx="28" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.45" />
      <ellipse cx="72" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.45" />
      {mood === 'happy' ? (
        <>
          <path d="M42 68 Q50 80 58 68 Z" fill="#7f1d1d" stroke="#1f2937" strokeWidth="2" strokeLinejoin="round" />
          <path d="M45.5 72.5 Q50 77 54.5 72.5 Q50 70.5 45.5 72.5 Z" fill="#fb7185" />
        </>
      ) : (
        <path d="M44 70 Q47 73 50 70 Q53 73 56 70" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
      )}
    </g>
  )
}

// 系統ごとの頭の飾り。段階が上がるほど立派になる
function Crest({ form, line }: { form: Form; line: string }) {
  const st = form.stage
  if (form.branch === 'card') {
    const leaves = st >= 5 ? [-40, -15, 15, 40] : st >= 4 ? [-28, 0, 28] : [-14, 14]
    return (
      <g>
        {leaves.map((r) => (
          <path key={r} transform={`rotate(${r} 50 28)`} d="M50 28 Q38 10 50 0 Q62 10 50 28 Z" fill="#22c55e" stroke="#14532d" strokeWidth="2" />
        ))}
        {leaves.map((r) => (
          <path key={`v${r}`} transform={`rotate(${r} 50 28)`} d="M50 26 L50 6" stroke="#14532d" strokeWidth="1.2" opacity="0.6" />
        ))}
        {st >= 6 && [30, 50, 70].map((x) => <circle key={x} cx={x} cy={x === 50 ? 4 : 12} r="3.5" fill="#f472b6" stroke="#9d174d" strokeWidth="1" />)}
      </g>
    )
  }
  if (form.branch === 'quiz') {
    const bolt = 'M0 0 L-8 14 L-2 14 L-6 26 L8 8 L2 8 Z'
    return (
      <g fill="#facc15" stroke="#a16207" strokeWidth="2" strokeLinejoin="round">
        <path transform="translate(54 2)" d={bolt} />
        {st >= 4 && <path transform="translate(30 12) scale(0.7)" d={bolt} />}
        {st >= 4 && <path transform="translate(74 12) scale(0.7)" d={bolt} />}
        {st >= 5 && (
          <g className="sparks" stroke="#fde047" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M8 50 l6 4 l-4 4 l6 4" />
            <path d="M92 50 l-6 4 l4 4 l-6 4" />
          </g>
        )}
      </g>
    )
  }
  if (form.branch === 'ear') {
    return <path d="M40 30 Q44 12 50 22 Q56 12 60 30" fill={shade(form.color, 0.3)} stroke={line} strokeWidth="2.5" />
  }
  if (st >= 2) return <path d="M50 27 Q46 14 52 10 Q50 18 56 20 Q52 22 50 27 Z" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
  return null
}

// 系統ごとにまわりをただようもの（Lv15〜）。葉っぱ・音符・火花
function Particles({ form }: { form: Form }) {
  const spots = form.stage >= 5 ? [[10, 40], [88, 34], [14, 84], [90, 80]] : [[12, 44], [88, 38]]
  return (
    <g className="particles">
      {spots.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} style={{ animationDelay: `${i * 0.6}s` }}>
          {form.branch === 'card' ? (
            <path d="M0 0 Q-5 -6 0 -10 Q5 -6 0 0 Z" fill="#4ade80" stroke="#15803d" strokeWidth="1" />
          ) : form.branch === 'ear' ? (
            <text fontSize="10" fill="#0369a1" textAnchor="middle">
              {i % 2 ? '♪' : '♫'}
            </text>
          ) : (
            <path d="M0 -6 l1.6 4.4 l4.4 1.6 l-4.4 1.6 l-1.6 4.4 l-1.6 -4.4 l-4.4 -1.6 l4.4 -1.6 Z" fill="#facc15" />
          )}
        </g>
      ))}
    </g>
  )
}

// 系統「耳」のつばさ。段階が上がると大きくなる
function Wings({ form, fill, line }: { form: Form; fill: string; line: string }) {
  const big = form.stage >= 4 ? 1.35 : 1
  const wing = 'M0 0 Q-16 -14 -12 -32 Q-6 -22 2 -20 Q-4 -12 6 -8 Z'
  return (
    <g className="wings" fill={fill} stroke={line} strokeWidth="2.5" strokeLinejoin="round">
      <path transform={`translate(22 62) scale(${big})`} d={wing} />
      <path transform={`translate(78 62) scale(${-big} ${big})`} d={wing} />
    </g>
  )
}

// 飾り（タマゴのときは着られない）
// つけている着せ替え（いくつか重ねられる）
export function Wear({ id }: { id?: string }) {
  return (
    <>
      {wearList(id).map((x) => (
        <WearOne key={x} id={x} />
      ))}
    </>
  )
}

function WearOne({ id }: { id: string }) {
  switch (id) {
    case 'ribbon':
      return (
        <g stroke="#9d174d" strokeWidth="2" strokeLinejoin="round">
          <path d="M66 34 L60 46 L64 46 Z M70 34 L74 46 L78 44 Z" fill="#db2777" />
          <path d="M68 32 Q56 20 54 30 Q54 40 68 32 Z M68 32 Q80 20 82 30 Q82 40 68 32 Z" fill="#f472b6" />
          <circle cx="68" cy="32" r="4" fill="#ec4899" />
          <path d="M58 27 q2 -2 5 0 M74 27 q3 -2 5 0" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.8" />
        </g>
      )
    case 'glasses':
      return (
        <g>
          <g fill="#e0f2fe" fillOpacity="0.35" stroke="#1f2937" strokeWidth="2.5">
            <circle cx="38" cy="57" r="10" />
            <circle cx="62" cy="57" r="10" />
          </g>
          <path d="M48 56 Q50 53 52 56 M28 55 L20 52 M72 55 L80 52" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 52 q3 -4 7 -4 M56 52 q3 -4 7 -4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
      )
    case 'sunglasses':
      return (
        <g>
          <path d="M26 50 L48 50 Q48 64 37 64 Q26 64 26 50 Z M52 50 L74 50 Q74 64 63 64 Q52 64 52 50 Z" fill="#111827" stroke="#000" strokeWidth="2" />
          <path d="M48 52 L52 52 M26 51 L19 49 M74 51 L81 49" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M30 53 l6 0 M56 53 l6 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </g>
      )
    case 'cap':
      return (
        <g stroke="#1e3a8a" strokeWidth="2" strokeLinejoin="round">
          <path d="M66 32 Q84 30 90 36 Q80 38 66 37 Z" fill="#1d4ed8" />
          <path d="M28 36 Q28 14 50 13 Q72 14 72 36 Z" fill="#3b82f6" />
          <path d="M50 13 L50 36" stroke="#1e40af" strokeWidth="1.5" opacity="0.6" />
          <circle cx="50" cy="13" r="2.5" fill="#1d4ed8" />
          <circle cx="40" cy="27" r="5" fill="#fff" strokeWidth="1.2" />
          <text x="40" y="29.5" fontSize="7" textAnchor="middle" fill="#1d4ed8" stroke="none" fontWeight="bold">
            E
          </text>
          <path d="M33 22 q3 -6 9 -7" stroke="#fff" strokeWidth="1.8" fill="none" opacity="0.6" />
        </g>
      )
    case 'pearls':
      return (
        <g fill="#f8fafc" stroke="#94a3b8" strokeWidth="1">
          {[26, 32, 38, 44, 50, 56, 62, 68, 74].map((x) => (
            <circle key={x} cx={x} cy={80 + (12 - Math.abs(50 - x) / 2) * 0.5} r="3.2" />
          ))}
          <circle cx="50" cy="91" r="4.5" fill="#fbcfe8" stroke="#db2777" />
        </g>
      )
    case 'scarf':
      return (
        <g stroke="#991b1b" strokeWidth="2" strokeLinejoin="round">
          <path d="M60 82 L64 100 L74 98 L70 80 Z" fill="#dc2626" />
          <path d="M20 76 Q50 88 80 76 L80 84 Q50 96 20 84 Z" fill="#ef4444" />
          <path d="M28 80 L28 87 M38 83 L38 90 M50 84 L50 91 M62 83 L62 90 M72 80 L72 87" stroke="#fff" strokeWidth="2" opacity="0.6" />
        </g>
      )
    case 'hat':
      return (
        <g stroke="#000" strokeWidth="1.5">
          <ellipse cx="50" cy="31" rx="22" ry="4.5" fill="#1f2937" />
          <path d="M37 30 L38 6 Q50 3 62 6 L63 30 Q50 33 37 30 Z" fill="#1f2937" />
          <path d="M37.5 22 Q50 25 62.5 22 L62.8 27 Q50 30 37.2 27 Z" fill="#dc2626" />
          <path d="M42 9 L42 20" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )
    case 'flower':
      return (
        <g>
          <path d="M26 34 Q50 22 74 34" fill="none" stroke="#65a30d" strokeWidth="3" />
          {[26, 37, 50, 63, 74].map((x, i) => (
            <g key={x} transform={`translate(${x} ${34 - (12 - Math.abs(50 - x) / 2) * 0.9})`}>
              {[0, 72, 144, 216, 288].map((r) => (
                <ellipse key={r} transform={`rotate(${r})`} cx="0" cy="-3.5" rx="2.6" ry="3.6" fill={['#f9a8d4', '#fde047', '#c4b5fd', '#fde047', '#f9a8d4'][i]} stroke="#a16207" strokeWidth="0.6" />
              ))}
              <circle r="2" fill="#f59e0b" />
            </g>
          ))}
        </g>
      )
    case 'bowtie':
      return (
        <g stroke="#4c1d95" strokeWidth="2" strokeLinejoin="round">
          <path d="M50 82 Q40 72 34 74 Q32 82 34 90 Q40 92 50 82 Z M50 82 Q60 72 66 74 Q68 82 66 90 Q60 92 50 82 Z" fill="#7c3aed" />
          <rect x="46" y="78" width="8" height="8" rx="2.5" fill="#6d28d9" />
          <path d="M37 78 q3 -2 6 0 M57 78 q3 -2 6 0" stroke="#ddd6fe" strokeWidth="1.5" fill="none" />
        </g>
      )
    case 'catears':
      return (
        <g stroke="#78350f" strokeWidth="2" strokeLinejoin="round">
          <path d="M24 40 L26 12 L46 30 Z" fill="#fbbf24" />
          <path d="M76 40 L74 12 L54 30 Z" fill="#fbbf24" />
          <path d="M29 33 L30 20 L40 29 Z M71 33 L70 20 L60 29 Z" fill="#f9a8d4" stroke="none" />
        </g>
      )
    case 'witchhat':
      return (
        <g stroke="#1f2937" strokeWidth="2" strokeLinejoin="round">
          <ellipse cx="50" cy="32" rx="26" ry="5" fill="#6d28d9" />
          <path d="M34 31 Q40 18 46 10 Q52 2 64 4 Q56 8 58 18 L66 31 Z" fill="#7c3aed" />
          <path d="M36 26 L64 26 L65.5 30 L34.5 30 Z" fill="#f59e0b" stroke="none" />
          <path d="M52 22 l1 -3 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 Z" fill="#fde047" stroke="none" />
        </g>
      )
    case 'santahat':
      return (
        <g stroke="#7f1d1d" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M30 32 Q34 8 56 8 Q72 10 78 26 L70 30 Z" fill="#dc2626" />
          <path d="M40 16 Q48 10 58 11" stroke="#fca5a5" strokeWidth="2" fill="none" />
          <rect x="27" y="27" width="46" height="8" rx="4" fill="#fff" />
          <circle cx="78" cy="27" r="5" fill="#fff" />
        </g>
      )
    case 'crown':
      return (
        <g stroke="#a16207" strokeWidth="2" strokeLinejoin="round">
          <path d="M32 32 L30 12 L41 22 L50 7 L59 22 L70 12 L68 32 Z" fill="#facc15" />
          <path d="M32 27 L68 27" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="30" cy="11" r="2.5" fill="#fde047" />
          <circle cx="50" cy="6" r="2.5" fill="#fde047" />
          <circle cx="70" cy="11" r="2.5" fill="#fde047" />
          <circle cx="50" cy="22" r="3" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
          <circle cx="40" cy="27" r="1.8" fill="#22c55e" stroke="none" />
          <circle cx="60" cy="27" r="1.8" fill="#3b82f6" stroke="none" />
          <path d="M36 16 L37 25" stroke="#fef9c3" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )
    case 'headphones':
      return (
        <g>
          <path d="M17 58 Q16 18 50 17 Q84 18 83 58" fill="none" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" />
          <path d="M17 58 Q16 18 50 17 Q84 18 83 58" fill="none" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="9" y="50" width="14" height="20" rx="6" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
          <rect x="77" y="50" width="14" height="20" rx="6" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
          <path d="M13 54 L13 62 M81 54 L81 62" stroke="#bfdbfe" strokeWidth="2" strokeLinecap="round" />
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
  crack = 0,
}: {
  form: Form
  mood?: Mood
  hidden?: boolean
  wear?: string
  crack?: number // タマゴのひび（0〜1。かえる直前ほど大きい）
}) {
  const uid = form.id.replace(/[^a-z]/g, '') + useId().replace(/[^a-zA-Z0-9]/g, '')
  const fill = hidden ? '#9ca3af' : form.color
  const line = hidden ? '#6b7280' : form.line
  const body = hidden ? fill : `url(#b${uid})`
  const defs = (
    <defs>
      <radialGradient id={`b${uid}`} cx="0.38" cy="0.32" r="0.75">
        <stop offset="0" stopColor={shade(form.color, 0.55)} />
        <stop offset="0.55" stopColor={form.color} />
        <stop offset="1" stopColor={shade(form.color, -0.18)} />
      </radialGradient>
      <radialGradient id={`h${uid}`}>
        <stop offset="0" stopColor="#fef08a" stopOpacity="0.9" />
        <stop offset="1" stopColor="#fef08a" stopOpacity="0" />
      </radialGradient>
    </defs>
  )
  if (form.stage === 0) {
    return (
      <svg viewBox="0 0 100 100" className="monster-svg" aria-hidden="true">
        {defs}
        <ellipse cx="50" cy="95" rx="24" ry="4" fill="#000" opacity="0.12" />
        <g className={hidden ? undefined : 'egg-wobble'}>
          <ellipse cx="50" cy="56" rx="30" ry="38" fill={body} stroke={line} strokeWidth="3" />
          <path d="M22 54 l7 -6 l7 6 l7 -6 l7 6 l7 -6 l7 6 l7 -6 l6 5" fill="none" stroke={line} strokeWidth="3" strokeLinejoin="round" />
          {!hidden && (
            <>
              <circle cx="38" cy="72" r="5" fill="#f59e0b" opacity="0.8" />
              <circle cx="60" cy="80" r="3.5" fill="#f59e0b" opacity="0.8" />
              <circle cx="64" cy="66" r="2.5" fill="#f59e0b" opacity="0.8" />
              <ellipse cx="38" cy="32" rx="7" ry="10" fill="#fff" opacity="0.5" transform="rotate(-20 38 32)" />
              {crack >= 0.3 && <path className="egg-crack" d="M50 20 l-4 8 l6 5 l-5 8" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" />}
              {crack >= 0.6 && <path className="egg-crack" d="M70 40 l-6 4 l4 6 l-7 3" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" />}
              {crack >= 0.85 && <path className="egg-crack" d="M30 62 l7 -2 l-2 7 l8 -1" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" />}
            </>
          )}
        </g>
      </svg>
    )
  }
  // 生まれたては小さく、だんだん大きくなる（足もとを中心に拡大）
  const size = form.stage === 1 ? 0.78 : form.stage === 2 ? 0.9 : 1
  return (
    <svg viewBox="0 0 100 100" className="monster-svg" aria-hidden="true">
      {defs}
      {form.stage >= 5 && !hidden && <circle cx="50" cy="56" r="46" fill={`url(#h${uid})`} opacity={form.stage >= 6 ? 0.9 : 0.6} />}
      {form.stage >= 5 && !hidden && (
        <g className="aura">
          <circle cx="50" cy="56" r="46" fill="none" stroke={form.stage >= 6 ? '#c4b5fd' : '#fde047'} strokeWidth="3" strokeDasharray="4 6" />
          <path d="M14 30 l3 -7 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 Z M80 14 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 Z M86 78 l2 -4 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 Z" fill="#fde047" />
        </g>
      )}
      <ellipse cx="50" cy="94" rx={30 * size} ry="4" fill="#000" opacity="0.13" />
      {form.stage >= 3 && !hidden && <Particles form={form} />}
      <g transform={`translate(50 92) scale(${size}) translate(-50 -92)`}>
        <g className={hidden ? undefined : 'monster-breathe'}>
          {form.branch === 'ear' && <Wings form={form} fill={hidden ? fill : shade(form.color, 0.25)} line={line} />}
          {form.stage >= 2 && (
            <g fill={body} stroke={line} strokeWidth="3">
              <ellipse cx="36" cy="89" rx="9" ry="5" />
              <ellipse cx="64" cy="89" rx="9" ry="5" />
            </g>
          )}
          <path d="M18 70 Q18 28 50 26 Q82 28 82 70 Q82 90 50 90 Q18 90 18 70 Z" fill={body} stroke={line} strokeWidth="3" />
          {!hidden && <ellipse cx="50" cy="77" rx="18" ry="10" fill="#fff" opacity="0.28" />}
          {!hidden && <ellipse cx="34" cy="38" rx="8" ry="4.5" fill="#fff" opacity="0.55" transform="rotate(-25 34 38)" />}
          {form.stage >= 2 && (
            <g fill={body} stroke={line} strokeWidth="3" className="monster-arms">
              <path d="M20 66 Q8 70 12 78 Q18 80 22 74" />
              <path d="M80 66 Q92 70 88 78 Q82 80 78 74" />
            </g>
          )}
          {form.stage === 1 && !hidden && (
            <path d="M30 34 L36 26 L42 33 L50 24 L58 33 L64 26 L70 34 Q50 24 30 34 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
          )}
          {!hidden && !(form.stage <= 2 && wearList(wear).some((w) => slotOf(w) === 'head')) && <Crest form={form} line={line} />}
          {form.stage >= 4 && (
            <g stroke="#a16207" strokeWidth="2" strokeLinejoin="round">
              <path d="M30 34 L33 22 L41 30 L50 18 L59 30 L67 22 L70 34 Z" fill="#fbbf24" />
              <circle cx="50" cy="28" r="3" fill={form.stage >= 5 ? '#a855f7' : '#ef4444'} stroke="none" />
              <circle cx="38" cy="31" r="1.8" fill="#38bdf8" stroke="none" />
              <circle cx="62" cy="31" r="1.8" fill="#38bdf8" stroke="none" />
            </g>
          )}
          {form.stage >= 6 && !hidden && <path d="M50 40 l4 5 l-4 5 l-4 -5 Z" fill="#e879f9" stroke="#86198f" strokeWidth="1.2" />}
          {form.stage >= 6 && <ellipse className="halo" cx="50" cy="10" rx="20" ry="5" fill="none" stroke="#fde047" strokeWidth="3.5" />}
          {hidden ? (
            <text x="50" y="66" textAnchor="middle" fontSize="22" fill="#f3f4f6">
              ？
            </text>
          ) : (
            <Face mood={mood} />
          )}
          {!hidden && <Wear id={wear} />}
        </g>
      </g>
    </svg>
  )
}

export function Monster({ monster, onRename, coins, onShop, room, title, cheer, feeling, gain, mood = 'normal', leveledUp = false, evolved = false, deco, shelf = [], sleepy = false, learned = [] }: Props) {
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
      <RoomScene room={room} />
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
          const r = Math.random()
          const l = learned.length > 0 && form.stage > 0 && r < 0.3 ? rememberLine(learned[Math.floor(Math.random() * learned.length)]) : pickLineNow(form.stage, mood === 'lonely', Math.random())
          setLine(l)
          playChirp(form.stage)
          setPoke(poke + 1)
          if (form.stage > 0) speak(l.en)
        }}
      >
        <MonsterFigure form={form} mood={line ? REACTIONS[poke % REACTIONS.length] : mood} wear={monster.wear} crack={form.stage === 0 ? into / need : 0} />
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
        <div className="zukan-detail" role="status" style={{ background: `linear-gradient(135deg, ${detail.color}55, transparent 70%)` }}>
          <span className="zukan-big">
            <MonsterFigure form={detail} mood="happy" />
          </span>
          <span>
            <strong>{detail.name}</strong>
            <span className="zukan-stars" aria-label={`進化段階 ${detail.stage}`}>
              {'★'.repeat(detail.stage)}
              {'☆'.repeat(6 - detail.stage)}
            </span>
            <br />
            {FORM_DESC[detail.id]}
          </span>
        </div>
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
