import { useId } from 'react'
import type { BossBg } from './boss'

// ボス戦の舞台：ボスのうしろの景色（ステージごと）と、ボスの色のオーラ・足もとの台
const W = 320
const H = 140
type Arena = BossBg | 'gold'
const SKY: Record<Arena, [string, string]> = {
  field: ['#7dd3fc', '#bbf7d0'],
  forest: ['#166534', '#4ade80'],
  mountain: ['#475569', '#cbd5e1'],
  night: ['#020617', '#312e81'],
  castle: ['#3b0764', '#a21caf'],
  sea: ['#0c4a6e', '#22d3ee'],
  gold: ['#78350f', '#fbbf24'],
}

function Scenery({ bg }: { bg: Arena }) {
  switch (bg) {
    case 'field':
      return (
        <g>
          <path d={`M0 ${H} L0 96 Q 80 70 160 92 T ${W} 86 L ${W} ${H} Z`} fill="#4ade80" />
          <path d={`M0 ${H} L0 112 Q 100 96 200 110 T ${W} 104 L ${W} ${H} Z`} fill="#22c55e" />
          <circle cx="40" cy="30" r="14" fill="#fde047" opacity="0.9" />
        </g>
      )
    case 'forest':
      return (
        <g fill="#14532d">
          {[20, 60, 260, 300].map((x, k) => (
            <path key={x} d={`M${x} ${40 + (k % 2) * 10} L${x - 22} 110 L${x + 22} 110 Z`} />
          ))}
          <rect x="0" y="108" width={W} height={H - 108} fill="#15803d" />
        </g>
      )
    case 'mountain':
      return (
        <g>
          <path d={`M0 110 L50 40 L90 90 L140 30 L190 96 L240 36 L290 84 L${W} 50 L${W} ${H} L0 ${H} Z`} fill="#64748b" />
          <path d="M140 30 L128 48 L152 48 Z M240 36 L228 54 L252 54 Z M50 40 L40 54 L60 54 Z" fill="#f8fafc" />
          <rect x="0" y="112" width={W} height={H - 112} fill="#475569" />
        </g>
      )
    case 'night':
      return (
        <g>
          {[20, 60, 110, 210, 250, 290, 170].map((x, k) => (
            <circle key={x} cx={x} cy={14 + ((k * 19) % 50)} r={k % 2 ? 1 : 1.6} fill="#fff" className="arena-star" />
          ))}
          <path d="M280 14 A 14 14 0 1 0 280 42 A 11 14 0 1 1 280 14 Z" fill="#fef9c3" />
          <rect x="0" y="112" width={W} height={H - 112} fill="#1e1b4b" />
        </g>
      )
    case 'castle':
      return (
        <g fill="#2e1065">
          {[30, 80, 240, 290].map((x) => (
            <g key={x}>
              <rect x={x - 9} y="34" width="18" height="80" />
              <rect x={x - 13} y="28" width="26" height="8" />
              <path d={`M${x} 46 q -6 8 0 14 q 6 -6 0 -14`} fill="#f97316" className="arena-flame" />
            </g>
          ))}
          <rect x="0" y="112" width={W} height={H - 112} fill="#4c1d95" />
        </g>
      )
    case 'sea':
      return (
        <g>
          {[70, 88, 104, 120].map((y, k) => (
            <path key={y} d={`M-10 ${y} q 20 -6 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0`} stroke="#fff" strokeOpacity={0.25 + k * 0.05} strokeWidth="2" fill="none" className="arena-wave" />
          ))}
          <rect x="0" y="112" width={W} height={H - 112} fill="#0e7490" />
        </g>
      )
    default:
      return (
        <g>
          {[30, 90, 230, 290, 160].map((x, k) => (
            <path key={x} d={`M${x} ${20 + (k % 3) * 24} l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z`} fill="#fff" className="arena-star" />
          ))}
          <rect x="0" y="112" width={W} height={H - 112} fill="#b45309" />
        </g>
      )
  }
}

export function BossArena({ bg, color }: { bg: Arena; color: string }) {
  const id = useId().replace(/:/g, '')
  const [a, b] = SKY[bg]
  return (
    <svg className={`boss-arena arena-${bg}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
        <radialGradient id={`${id}-aura`}>
          <stop offset="0" stopColor={color} stopOpacity="0.85" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      <Scenery bg={bg} />
      {/* ボスの色のオーラと、足もとの台 */}
      <circle cx={W / 2} cy="66" r="70" fill={`url(#${id}-aura)`} className="arena-aura" />
      <ellipse cx={W / 2} cy="124" rx="70" ry="12" fill="#0f172a" opacity="0.35" />
      <ellipse cx={W / 2} cy="120" rx="62" ry="10" fill={color} opacity="0.55" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" />
    </svg>
  )
}
