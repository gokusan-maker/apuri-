import { useId } from 'react'
import { BUDDY_FORMS, buddyForm, buddyLevel, formName, growthStars, speciesOf, type Buddy, type Track } from './buddies'

// 文法のことばモンスター・長文の竜のオリジナルの絵（SVG）。姿（何番目の形か）で色・頭のかざり・つばさがかわる。
// 進化のあいだも、1レベル上がるごとに星がふえて少しずつ大きくなる
type Look = {
  body: string
  belly: string
  head: 'none' | 'drop' | 'pencil' | 'eraser' | 'gem' | 'helmet' | 'horns'
  wings?: string // 竜のつばさ
  pages?: string // 本のページのつばさ（文法）
  crown?: boolean
  fangs?: boolean
  tail?: boolean
  spikes?: string // 背中のとげ
  sparkle?: string // まわりのきらきら
}

// 文法：ことば・文房具・魔法の本のモンスター（動物ではない）
const WORD: Look[] = [
  { body: '#fde68a', belly: '#fef3c7', head: 'none' }, // ことばのタマゴ
  { body: '#60a5fa', belly: '#dbeafe', head: 'drop' }, // インクぷる
  { body: '#fbbf24', belly: '#fef3c7', head: 'pencil' }, // ペンボウ
  { body: '#f9a8d4', belly: '#fdf2f8', head: 'eraser', fangs: true }, // けしゴーン
  { body: '#a5b4fc', belly: '#eef2ff', head: 'pencil', pages: '#ffffff', fangs: true }, // ノートン
  { body: '#94a3b8', belly: '#e2e8f0', head: 'gem', spikes: '#64748b', fangs: true }, // ルーンゴーレム
  { body: '#6366f1', belly: '#e0e7ff', head: 'helmet', pages: '#fef9c3', fangs: true, sparkle: '#a5b4fc' }, // まどうしょナイト
  { body: '#7c3aed', belly: '#ede9fe', head: 'gem', pages: '#fde68a', crown: true, fangs: true, sparkle: '#fbbf24' }, // ブンポウキング
]
const DRAGON: Look[] = [
  { body: '#c4b5fd', belly: '#ede9fe', head: 'none' }, // タマゴ
  { body: '#86efac', belly: '#dcfce7', head: 'none', tail: true }, // ちびドラ
  { body: '#5eead4', belly: '#ccfbf1', head: 'horns', tail: true }, // ベビードラゴン
  { body: '#2dd4bf', belly: '#ccfbf1', head: 'horns', wings: '#14b8a6', tail: true }, // はばたきドラゴン
  { body: '#60a5fa', belly: '#dbeafe', head: 'horns', wings: '#3b82f6', tail: true, spikes: '#1d4ed8' }, // ドラゴン
  { body: '#1e3a8a', belly: '#bfdbfe', head: 'horns', wings: '#6366f1', tail: true, spikes: '#facc15', sparkle: '#fde68a' }, // ほしよみドラゴン
  { body: '#f0f9ff', belly: '#fef9c3', head: 'horns', wings: '#fde047', tail: true, spikes: '#fbbf24', sparkle: '#fde047' }, // せいりゅう
  { body: '#6d28d9', belly: '#ddd6fe', head: 'horns', wings: '#fbbf24', tail: true, spikes: '#fde68a', crown: true, sparkle: '#c4b5fd' }, // つきのしんりゅう
]

// 色を明るく（amt>0）・暗く（amt<0）する（立体感のグラデーション用）
function tone(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16)
  const ch = (v: number) => Math.round(amt >= 0 ? v + (255 - v) * amt : v * (1 + amt))
  const r = ch((n >> 16) & 255)
  const g = ch((n >> 8) & 255)
  const b = ch(n & 255)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export function BuddyFigure({ track, buddy, size = 56 }: { track: Track; buddy: Buddy; size?: number }) {
  const form = buddyForm(track, buddy)
  const i = BUDDY_FORMS[track].indexOf(form)
  const l = (track === 'grammar' ? WORD : DRAGON)[i]
  const egg = i === 0
  const stars = growthStars(track, buddy)
  // 1レベルごとに少しずつ大きく（最大 +12%）
  const grow = 1 + Math.min(12, buddyLevel(buddy).level - 1) / 100
  const spot = track === 'grammar' ? '#fb923c' : '#8b5cf6'
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const bodyFill = `url(#bb${uid})`
  return (
    <svg className="buddy-svg" width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={formName(track, buddy)} data-stars={stars} style={speciesOf(track, buddy).hue ? { filter: `hue-rotate(${speciesOf(track, buddy).hue}deg)` } : undefined}>
      <defs>
        {/* 立体感：左上が明るく、右下が暗い体と、つや・足もとの影 */}
        <radialGradient id={`bb${uid}`} cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor={tone(l.body, 0.5)} />
          <stop offset="0.55" stopColor={l.body} />
          <stop offset="1" stopColor={tone(l.body, -0.22)} />
        </radialGradient>
        <radialGradient id={`bg${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="91" rx={egg ? 24 : 28} ry="4" fill="#0f172a" opacity="0.14" />
      <g transform={`translate(50 60) scale(${grow}) translate(-50 -60)`}>
        {egg ? (
          <>
            <ellipse cx="50" cy="56" rx="30" ry="38" fill={bodyFill} stroke="#00000022" strokeWidth="2" />
            <ellipse cx="38" cy="34" rx="9" ry="12" fill={`url(#bg${uid})`} transform="rotate(-20 38 34)" />
            <circle cx="40" cy="45" r="5" fill={spot} opacity="0.6" />
            <circle cx="60" cy="62" r="7" fill={spot} opacity="0.5" />
            <circle cx="47" cy="75" r="4" fill={spot} opacity="0.5" />
            <path d="M33 34 L42 42 L50 34 L58 42 L67 34" stroke={track === 'grammar' ? '#ea580c' : '#7c3aed'} strokeWidth="2" fill="none" opacity="0.5" />
          </>
        ) : (
          <>
            {l.sparkle && (
              <>
                <path d="M12 20 L14 26 L20 28 L14 30 L12 36 L10 30 L4 28 L10 26 Z" fill={l.sparkle} />
                <path d="M88 16 L89.5 21 L94 22.5 L89.5 24 L88 29 L86.5 24 L82 22.5 L86.5 21 Z" fill={l.sparkle} />
              </>
            )}
            {l.wings && (
              <>
                <path d="M24 52 L4 32 L10 58 L2 62 L22 66 Z" fill={l.wings} stroke="#00000022" />
                <path d="M76 52 L96 32 L90 58 L98 62 L78 66 Z" fill={l.wings} stroke="#00000022" />
              </>
            )}
            {l.pages && (
              <>
                <path d="M22 50 Q8 36 4 44 L8 66 Q14 60 24 64 Z" fill={l.pages} stroke="#64748b" strokeWidth="1.2" />
                <path d="M78 50 Q92 36 96 44 L92 66 Q86 60 76 64 Z" fill={l.pages} stroke="#64748b" strokeWidth="1.2" />
                <path d="M10 48 L18 54 M9 54 L18 59 M90 48 L82 54 M91 54 L82 59" stroke="#94a3b8" strokeWidth="1" />
              </>
            )}
            {l.tail && <path d="M70 78 Q92 82 90 64 Q86 74 72 70 Z" fill={bodyFill} stroke="#00000022" />}
            {l.spikes && <path d="M30 38 L34 28 L40 34 L46 24 L52 32 L58 24 L64 34 L70 28 L72 40 Z" fill={l.spikes} opacity="0.9" />}
            {l.head === 'drop' && <path d="M50 8 Q60 24 50 34 Q40 24 50 8 Z" fill={l.body} stroke="#00000022" />}
            {l.head === 'pencil' && (
              <>
                <path d="M38 34 L50 6 L62 34 Z" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M46 15 L50 6 L54 15 Z" fill="#1f2937" />
              </>
            )}
            {l.head === 'eraser' && <rect x="36" y="16" width="28" height="18" rx="4" fill="#ffffff" stroke="#db2777" strokeWidth="2" />}
            {l.head === 'gem' && <path d="M50 14 L60 24 L50 38 L40 24 Z" fill="#22d3ee" stroke="#0e7490" strokeWidth="1.5" />}
            {l.head === 'helmet' && (
              <>
                <path d="M28 40 Q50 6 72 40 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                <path d="M50 10 L50 2" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
              </>
            )}
            {l.head === 'horns' && (
              <>
                <path d="M34 30 L28 10 L42 26 Z" fill="#fef3c7" stroke="#00000022" />
                <path d="M66 30 L72 10 L58 26 Z" fill="#fef3c7" stroke="#00000022" />
              </>
            )}
            <ellipse cx="50" cy="58" rx="30" ry="28" fill={bodyFill} stroke="#00000022" strokeWidth="2" />
            <ellipse cx="50" cy="66" rx="17" ry="14" fill={l.belly} />
            <ellipse cx="36" cy="42" rx="11" ry="6" fill={`url(#bg${uid})`} transform="rotate(-25 36 42)" />
            {track === 'grammar' && (
              // おなかに ABC の文字（ことばのモンスターのしるし）
              <text x="50" y="72" textAnchor="middle" fontSize="9" fontWeight="700" fill="#475569">
                ABC
              </text>
            )}
            <circle cx="40" cy="52" r="4.5" fill="#1f2937" />
            <circle cx="60" cy="52" r="4.5" fill="#1f2937" />
            <circle cx="41.5" cy="50.5" r="1.5" fill="#fff" />
            <circle cx="61.5" cy="50.5" r="1.5" fill="#fff" />
            <circle cx="32" cy="60" r="4" fill="#fb7185" opacity="0.45" />
            <circle cx="68" cy="60" r="4" fill="#fb7185" opacity="0.45" />
            <path d="M45 60 Q50 65 55 60" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />
            {l.fangs && (
              <>
                <path d="M45.5 61 L47 66 L49 62.2 Z" fill="#ffffff" stroke="#1f2937" strokeWidth="0.8" />
                <path d="M54.5 61 L53 66 L51 62.2 Z" fill="#ffffff" stroke="#1f2937" strokeWidth="0.8" />
              </>
            )}
            {l.crown && <path d="M38 24 L42 12 L50 20 L58 12 L62 24 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />}
          </>
        )}
      </g>
      {/* 今の姿になってから上がったレベルの数だけ星（1レベルごとの成長） */}
      {Array.from({ length: stars }, (_, k) => (
        <text key={k} x={50 + (k - (stars - 1) / 2) * 11} y="98" textAnchor="middle" fontSize="9" className="buddy-star">
          ★
        </text>
      ))}
    </svg>
  )
}
