import { levelInfo } from './monster'

type Props = {
  xp: number
  happy?: boolean
  leveledUp?: boolean
}

// オリジナルの相棒「モチまる」。レベル1はタマゴ、レベル2で生まれる。
function Body({ level, happy }: { level: number; happy: boolean }) {
  if (level < 2) {
    return (
      <svg viewBox="0 0 100 100" className="monster-svg" aria-hidden="true">
        <ellipse cx="50" cy="56" rx="30" ry="38" fill="#fde68a" stroke="#d97706" strokeWidth="3" />
        <path d="M30 50 l8 -6 l8 6 l8 -6 l8 6 l8 -6" fill="none" stroke="#d97706" strokeWidth="3" />
        <circle cx="40" cy="70" r="4" fill="#f59e0b" />
        <circle cx="60" cy="78" r="3" fill="#f59e0b" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 100 100" className="monster-svg" aria-hidden="true">
      <path d="M18 70 Q18 28 50 26 Q82 28 82 70 Q82 88 50 88 Q18 88 18 70 Z" fill="#86efac" stroke="#15803d" strokeWidth="3" />
      <path d="M38 28 Q42 14 50 22 Q58 14 62 28" fill="#86efac" stroke="#15803d" strokeWidth="3" />
      <circle cx="38" cy="56" r="5" fill="#1f2937" />
      <circle cx="62" cy="56" r="5" fill="#1f2937" />
      <circle cx="30" cy="68" r="5" fill="#fca5a5" opacity="0.7" />
      <circle cx="70" cy="68" r="5" fill="#fca5a5" opacity="0.7" />
      {happy ? (
        <path d="M42 68 Q50 78 58 68" fill="#1f2937" />
      ) : (
        <path d="M44 70 Q50 74 56 70" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      )}
    </svg>
  )
}

export function Monster({ xp, happy = false, leveledUp = false }: Props) {
  const { level, into, need } = levelInfo(xp)
  return (
    <section className="monster" aria-label="相棒モンスター">
      <div className={`monster-body${happy ? ' bounce' : ''}`}>
        <Body level={level} happy={happy} />
      </div>
      <div className="monster-info">
        <p className="monster-name">
          {level < 2 ? 'ふしぎなタマゴ' : 'モチまる'} <span className="monster-level">Lv.{level}</span>
        </p>
        <div className="xp-bar" role="progressbar" aria-valuemin={0} aria-valuemax={need} aria-valuenow={into}>
          <div className="xp-fill" style={{ width: `${(into / need) * 100}%` }} />
        </div>
        <p className="xp-text">
          XP {into} / {need}
        </p>
        {leveledUp && <p className="level-up">レベルアップ！</p>}
      </div>
    </section>
  )
}
