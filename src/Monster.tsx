import { levelInfo, stageOf } from './monster'

type Mood = 'normal' | 'happy' | 'lonely'

type Props = {
  xp: number
  mood?: Mood
  leveledUp?: boolean
  evolved?: boolean
}

// 相棒は完全オリジナルのモチ型モンスター。段階ごとに色と飾りが増える。
const COLORS = ['#fde68a', '#bbf7d0', '#86efac', '#7dd3fc', '#c4b5fd']
const LINES = ['#d97706', '#15803d', '#15803d', '#0369a1', '#6d28d9']

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

function Body({ stage, mood }: { stage: number; mood: Mood }) {
  if (stage === 0) {
    return (
      <svg viewBox="0 0 100 100" className="monster-svg" aria-hidden="true">
        <ellipse cx="50" cy="56" rx="30" ry="38" fill={COLORS[0]} stroke={LINES[0]} strokeWidth="3" />
        <path d="M30 50 l8 -6 l8 6 l8 -6 l8 6 l8 -6" fill="none" stroke={LINES[0]} strokeWidth="3" />
        <circle cx="40" cy="70" r="4" fill="#f59e0b" />
        <circle cx="60" cy="78" r="3" fill="#f59e0b" />
      </svg>
    )
  }
  const fill = COLORS[stage]
  const line = LINES[stage]
  return (
    <svg viewBox="0 0 100 100" className="monster-svg" aria-hidden="true">
      {stage >= 3 && (
        <>
          <path d="M18 60 Q2 46 8 32 Q18 44 24 50 Z" fill={fill} stroke={line} strokeWidth="3" />
          <path d="M82 60 Q98 46 92 32 Q82 44 76 50 Z" fill={fill} stroke={line} strokeWidth="3" />
        </>
      )}
      <path d="M18 70 Q18 28 50 26 Q82 28 82 70 Q82 88 50 88 Q18 88 18 70 Z" fill={fill} stroke={line} strokeWidth="3" />
      {stage >= 2 && <path d="M38 28 Q42 14 50 22 Q58 14 62 28" fill={fill} stroke={line} strokeWidth="3" />}
      {stage >= 4 && <path d="M36 18 L40 6 L50 14 L60 6 L64 18 Z" fill="#facc15" stroke="#a16207" strokeWidth="2" />}
      <Face mood={mood} />
    </svg>
  )
}

export function Monster({ xp, mood = 'normal', leveledUp = false, evolved = false }: Props) {
  const { level, into, need } = levelInfo(xp)
  const stage = stageOf(level)
  const cls = mood === 'happy' ? ' bounce' : mood === 'lonely' ? ' droop' : ''
  return (
    <section className="monster" aria-label="相棒モンスター">
      <div className={`monster-body${cls}${evolved ? ' evolve' : ''}`}>
        <Body stage={stage.index} mood={mood} />
      </div>
      <div className="monster-info">
        <p className="monster-name">
          {stage.name} <span className="monster-level">Lv.{level}</span>
        </p>
        <div className="xp-bar" role="progressbar" aria-valuemin={0} aria-valuemax={need} aria-valuenow={into}>
          <div className="xp-fill" style={{ width: `${(into / need) * 100}%` }} />
        </div>
        <p className="xp-text">
          XP {into} / {need}
        </p>
        {evolved ? (
          <p className="level-up">{stage.index === 1 ? 'タマゴがかえった！' : `${stage.name}に進化した！`}</p>
        ) : leveledUp ? (
          <p className="level-up">レベルアップ！</p>
        ) : mood === 'lonely' ? (
          <p className="lonely">さみしそう… また一緒に勉強しよう</p>
        ) : null}
      </div>
    </section>
  )
}
