import type { ReactElement } from 'react'
import type { SpecialEventId } from './bossevent'

// ボス部屋の「その日のイベント」の絵：イベントごとにちがう景色（城とはちがう見た目）
const W = 320
const H = 104

// ボスのシルエット（ボスラッシュ用）
const bossShape = (x: number, y: number, s: number) =>
  `M${x - 22 * s} ${y} Q ${x - 24 * s} ${y - 34 * s} ${x} ${y - 36 * s} Q ${x + 24 * s} ${y - 34 * s} ${x + 22 * s} ${y} Z M${x - 16 * s} ${y - 28 * s} L${x - 22 * s} ${y - 46 * s} L${x - 6 * s} ${y - 34 * s} Z M${x + 16 * s} ${y - 28 * s} L${x + 22 * s} ${y - 46 * s} L${x + 6 * s} ${y - 34 * s} Z`

function Endless() {
  // 雲の上までつづく塔：下から上へ、だんだん細く。てっぺんは「？」
  const floors = [0, 1, 2, 3, 4, 5]
  return (
    <g>
      {floors.map((k) => {
        const w = 74 - k * 9
        const y = H - 16 - k * 15
        return (
          <g key={k} className="es-floor" style={{ animationDelay: `${k * 0.25}s` }}>
            <rect x={160 - w / 2} y={y - 14} width={w} height="15" rx="2" fill={k % 2 ? '#4338ca' : '#4f46e5'} stroke="#1e1b4b" strokeWidth="2" />
            <rect x={154} y={y - 11} width="12" height="9" rx="4" fill="#fde68a" className="es-window" />
          </g>
        )
      })}
      <path d={`M160 ${H - 106} L160 ${H - 120} L174 ${H - 115} L160 ${H - 110}`} fill="#fde047" stroke="#fde047" strokeWidth="1.5" />
      <ellipse cx="90" cy="42" rx="40" ry="10" fill="#fff" opacity="0.25" className="es-cloud" />
      <ellipse cx="236" cy="28" rx="46" ry="11" fill="#fff" opacity="0.22" className="es-cloud c2" />
      <path d="M40 92 l10 -14 l10 14 M260 90 l8 -12 l8 12" stroke="#a5b4fc" strokeWidth="2" fill="none" />
    </g>
  )
}

function Rush({ ex }: { ex?: boolean }) {
  return (
    <g>
      {[60, 160, 260].map((x, k) => (
        <g key={x} className="es-boss" style={{ animationDelay: `${k * 0.3}s` }}>
          <path d={`M${x - 26} ${H} Q ${x - 30} ${H - 40} ${x - 10} ${H - 54} Q ${x} ${H - 30} ${x + 6} ${H - 62} Q ${x + 24} ${H - 40} ${x + 26} ${H} Z`} fill={ex ? '#a855f7' : '#f97316'} opacity="0.55" className="es-flame" />
          <path d={bossShape(x, H - 6, k === 1 ? 1.15 : 0.9)} fill="#1c1917" />
          <path d={`M${x - 10} ${H - 26} l7 3 M${x + 10} ${H - 26} l-7 3`} stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <text x="160" y="20" textAnchor="middle" fontSize="16" fontWeight="900" fill="#fff" className="es-vs">
        {ex ? '3連戦 EX' : '3連戦'}
      </text>
    </g>
  )
}

function Night() {
  const bld = [
    [10, 50],
    [44, 70],
    [78, 40],
    [108, 62],
    [146, 34],
    [176, 74],
    [212, 46],
    [244, 64],
    [278, 38],
    [300, 56],
  ]
  return (
    <g>
      <path d="M266 9 A 13 13 0 1 0 266 35 A 10 13 0 1 1 266 9 Z" fill="#fef9c3" className="es-moon" />
      {[30, 90, 140, 200, 230, 300].map((x, k) => (
        <circle key={x} cx={x} cy={10 + ((k * 13) % 30)} r="1.3" fill="#fff" className="es-star" />
      ))}
      {bld.map(([x, h], k) => (
        <g key={k}>
          <rect x={x} y={H - h} width="30" height={h} fill={k % 2 ? '#1e293b' : '#0f172a'} />
          {[0, 1, 2].map((r) => (
            <rect key={r} x={x + 6 + (r % 2) * 10} y={H - h + 8 + r * 12} width="5" height="6" fill="#fde047" opacity={(k + r) % 3 ? 0.9 : 0.2} />
          ))}
        </g>
      ))}
    </g>
  )
}

function Weekend() {
  return (
    <g>
      <path d="M150 14 A 26 26 0 1 0 176 56 A 20 20 0 1 1 150 14 Z" fill="#fde68a" className="es-moon" />
      {[40, 80, 230, 270, 300, 110].map((x, k) => (
        <path key={x} d={`M${x} ${14 + (k % 3) * 12} l2 5 l5 0 l-4 3 l2 5 l-5 -3 l-5 3 l2 -5 l-4 -3 l5 0 Z`} fill="#fff" className="es-star" />
      ))}
      <path d={`M0 ${H} L0 ${H - 26} Q 80 ${H - 52} 160 ${H - 30} T ${W} ${H - 40} L ${W} ${H} Z`} fill="#4c1d95" />
      <path d={`M0 ${H} L0 ${H - 12} Q 100 ${H - 30} 200 ${H - 14} T ${W} ${H - 18} L ${W} ${H} Z`} fill="#2e1065" />
    </g>
  )
}

function Clock() {
  return (
    <g>
      <circle cx="160" cy="54" r="40" fill="#ecfeff" stroke="#0e7490" strokeWidth="5" />
      {Array.from({ length: 12 }, (_, k) => (
        <rect key={k} x="158.5" y="18" width="3" height={k % 3 ? 5 : 9} fill="#0e7490" transform={`rotate(${k * 30} 160 54)`} />
      ))}
      <rect x="158" y="30" width="4" height="26" rx="2" fill="#0f172a" className="es-hand" />
      <rect x="159" y="40" width="2" height="16" rx="1" fill="#dc2626" className="es-hand fast" />
      <circle cx="160" cy="54" r="4" fill="#0f172a" />
      <text x="60" y="64" textAnchor="middle" fontSize="22" fontWeight="900" fill="#fff" className="es-vs">30</text>
      <text x="60" y="80" textAnchor="middle" fontSize="10" fontWeight="800" fill="#cffafe">びょう</text>
      <path d="M232 40 l20 0 M226 54 l30 0 M232 68 l20 0" stroke="#a5f3fc" strokeWidth="4" strokeLinecap="round" className="es-speed" />
    </g>
  )
}

function Rare() {
  return (
    <g>
      {[
        [70, 60, 1],
        [160, 50, 1.5],
        [250, 62, 1.1],
      ].map(([x, y, s], k) => (
        <g key={k} className="es-gem" style={{ animationDelay: `${k * 0.4}s` }}>
          <path d={`M${x - 16 * s} ${y - 6 * s} L${x - 8 * s} ${y - 16 * s} L${x + 8 * s} ${y - 16 * s} L${x + 16 * s} ${y - 6 * s} L${x} ${y + 16 * s} Z`} fill={['#f472b6', '#facc15', '#38bdf8'][k]} stroke="#fff" strokeWidth="2" />
          <path d={`M${x - 16 * s} ${y - 6 * s} L${x + 16 * s} ${y - 6 * s} M${x - 8 * s} ${y - 16 * s} L${x - 4 * s} ${y - 6 * s} L${x} ${y + 16 * s} M${x + 8 * s} ${y - 16 * s} L${x + 4 * s} ${y - 6 * s}`} stroke="#fff" strokeWidth="1.2" opacity="0.7" fill="none" />
        </g>
      ))}
      {[30, 110, 205, 290].map((x, k) => (
        <path key={x} d={`M${x} ${20 + (k % 2) * 50} l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z`} fill="#fff" className="es-star" />
      ))}
    </g>
  )
}

function Quest() {
  return (
    <g>
      <path d={`M110 ${H} L110 40 Q 160 10 210 40 L210 ${H} Z`} fill="#450a0a" stroke="#fbbf24" strokeWidth="3" />
      <rect x="128" y="62" width="64" height="20" rx="4" fill="#7f1d1d" />
      <path d="M136 50 L144 30 L152 44 L160 24 L168 44 L176 30 L184 50 Z" fill="#facc15" stroke="#92400e" strokeWidth="2" className="es-crown" />
      <circle cx="160" cy="34" r="3" fill="#ef4444" />
      {[60, 260].map((x) => (
        <g key={x}>
          <rect x={x - 4} y="50" width="8" height="54" fill="#292524" />
          <path d={`M${x} 34 q -10 10 0 18 q 10 -8 0 -18`} fill="#f97316" className="es-flame" />
        </g>
      ))}
    </g>
  )
}

const SCENE: Partial<Record<SpecialEventId, () => ReactElement>> = {
  endless: Endless,
  rush: () => <Rush />,
  'rush-ex': () => <Rush ex />,
  night: Night,
  weekend: Weekend,
  time: Clock,
  rare: Rare,
  quest: Quest,
}

export function EventScene({ id }: { id: SpecialEventId }) {
  const Scene = SCENE[id]
  if (!Scene) return null
  return (
    <svg className={`event-scene es-${id}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Scene />
    </svg>
  )
}
