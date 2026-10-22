import { BUDDY_FORMS, buddyForm, type Buddy, type Track } from './buddies'

// 文法のペット・長文の竜のオリジナルの絵（SVG）。姿（何番目の形か）でからだの色・耳・つばさがかわる
type Look = { body: string; belly: string; ears: 'none' | 'round' | 'long' | 'floppy' | 'pointy' | 'crest' | 'horns'; wings?: string; beak?: boolean; crown?: boolean }

const PET: Look[] = [
  { body: '#fde68a', belly: '#fef3c7', ears: 'none' }, // タマゴ
  { body: '#fdba74', belly: '#fff7ed', ears: 'round' }, // ハムすけ
  { body: '#f5f5f4', belly: '#ffffff', ears: 'long' }, // ピョンた
  { body: '#d6a26b', belly: '#fde7c8', ears: 'floppy' }, // ワンまる
  { body: '#9ca3af', belly: '#f3f4f6', ears: 'pointy' }, // ニャンきち
  { body: '#4ade80', belly: '#fef08a', ears: 'crest', beak: true, crown: true }, // インコはかせ
]
const DRAGON: Look[] = [
  { body: '#c4b5fd', belly: '#ede9fe', ears: 'none' }, // タマゴ
  { body: '#86efac', belly: '#dcfce7', ears: 'none' }, // ちびドラ
  { body: '#5eead4', belly: '#ccfbf1', ears: 'horns', wings: '#2dd4bf' }, // ベビードラゴン
  { body: '#60a5fa', belly: '#dbeafe', ears: 'horns', wings: '#3b82f6' }, // ドラゴン
  { body: '#f0f9ff', belly: '#fef9c3', ears: 'horns', wings: '#fde047' }, // せいりゅう
  { body: '#6d28d9', belly: '#ddd6fe', ears: 'horns', wings: '#fbbf24', crown: true }, // つきのしんりゅう
]

export function BuddyFigure({ track, buddy, size = 56 }: { track: Track; buddy: Buddy; size?: number }) {
  const form = buddyForm(track, buddy)
  const i = BUDDY_FORMS[track].indexOf(form)
  const l = (track === 'grammar' ? PET : DRAGON)[i]
  const egg = i === 0
  return (
    <svg className="buddy-svg" width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={form.name}>
      {egg ? (
        <>
          <ellipse cx="50" cy="56" rx="30" ry="38" fill={l.body} stroke="#00000022" strokeWidth="2" />
          <circle cx="40" cy="45" r="5" fill={track === 'grammar' ? '#fb923c' : '#8b5cf6'} opacity="0.6" />
          <circle cx="60" cy="62" r="7" fill={track === 'grammar' ? '#fb923c' : '#8b5cf6'} opacity="0.5" />
          <circle cx="47" cy="75" r="4" fill={track === 'grammar' ? '#fb923c' : '#8b5cf6'} opacity="0.5" />
          {track === 'reading' && <path d="M35 30 L45 38 L52 30 L60 40" stroke="#7c3aed" strokeWidth="2" fill="none" opacity="0.5" />}
        </>
      ) : (
        <>
          {l.wings && (
            <>
              <path d="M24 52 L4 32 L10 58 L2 62 L22 66 Z" fill={l.wings} stroke="#00000022" />
              <path d="M76 52 L96 32 L90 58 L98 62 L78 66 Z" fill={l.wings} stroke="#00000022" />
            </>
          )}
          {track === 'reading' && <path d="M70 78 Q92 82 90 64 Q86 74 72 70 Z" fill={l.body} stroke="#00000022" />}
          {l.ears === 'round' && (
            <>
              <circle cx="30" cy="30" r="9" fill={l.body} />
              <circle cx="70" cy="30" r="9" fill={l.body} />
              <circle cx="30" cy="30" r="5" fill="#fda4af" />
              <circle cx="70" cy="30" r="5" fill="#fda4af" />
            </>
          )}
          {l.ears === 'long' && (
            <>
              <ellipse cx="38" cy="18" rx="7" ry="20" fill={l.body} stroke="#00000018" />
              <ellipse cx="62" cy="18" rx="7" ry="20" fill={l.body} stroke="#00000018" />
              <ellipse cx="38" cy="18" rx="3.5" ry="14" fill="#fda4af" />
              <ellipse cx="62" cy="18" rx="3.5" ry="14" fill="#fda4af" />
            </>
          )}
          {l.ears === 'floppy' && (
            <>
              <ellipse cx="24" cy="44" rx="9" ry="17" fill="#92400e" transform="rotate(20 24 44)" />
              <ellipse cx="76" cy="44" rx="9" ry="17" fill="#92400e" transform="rotate(-20 76 44)" />
            </>
          )}
          {l.ears === 'pointy' && (
            <>
              <path d="M24 38 L30 14 L44 30 Z" fill={l.body} stroke="#00000018" />
              <path d="M76 38 L70 14 L56 30 Z" fill={l.body} stroke="#00000018" />
              <path d="M29 32 L31 21 L38 29 Z" fill="#fda4af" />
              <path d="M71 32 L69 21 L62 29 Z" fill="#fda4af" />
            </>
          )}
          {l.ears === 'crest' && <path d="M44 22 Q50 2 56 22 Q52 14 50 24 Q48 14 44 22 Z" fill="#facc15" />}
          {l.ears === 'horns' && (
            <>
              <path d="M34 30 L28 10 L42 26 Z" fill="#fef3c7" stroke="#00000022" />
              <path d="M66 30 L72 10 L58 26 Z" fill="#fef3c7" stroke="#00000022" />
            </>
          )}
          <ellipse cx="50" cy="58" rx="30" ry="28" fill={l.body} stroke="#00000022" strokeWidth="2" />
          <ellipse cx="50" cy="66" rx="17" ry="14" fill={l.belly} />
          <circle cx="40" cy="52" r="4.5" fill="#1f2937" />
          <circle cx="60" cy="52" r="4.5" fill="#1f2937" />
          <circle cx="41.5" cy="50.5" r="1.5" fill="#fff" />
          <circle cx="61.5" cy="50.5" r="1.5" fill="#fff" />
          <circle cx="32" cy="60" r="4" fill="#fb7185" opacity="0.45" />
          <circle cx="68" cy="60" r="4" fill="#fb7185" opacity="0.45" />
          {l.beak ? <path d="M45 58 L55 58 L50 66 Z" fill="#f97316" /> : <path d="M45 60 Q50 65 55 60" stroke="#1f2937" strokeWidth="2" fill="none" strokeLinecap="round" />}
          {l.crown && <path d="M38 24 L42 14 L50 22 L58 14 L62 24 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1" />}
        </>
      )}
    </svg>
  )
}
