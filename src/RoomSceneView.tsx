// 部屋の背景のイラスト（相棒のうしろに敷く）。文字が読めるよう下と横のはしに寄せて描く
// align：どこを見せるか（ホームの相棒のうしろの小さな四角では、絵のある右はしを見せる）
export function RoomScene({ room, align = 'xMidYMax' }: { room?: string; align?: 'xMidYMax' | 'xMaxYMax' }) {
  const art = SCENES[room ?? '']
  if (!art) return null
  return (
    <svg className={`room-scene scene-${room}`} viewBox="0 0 320 100" preserveAspectRatio={`${align} slice`} aria-hidden="true">
      <g opacity="0.8">{art}</g>
    </svg>
  )
}

const SCENES: Record<string, React.ReactNode> = {
  meadow: (
    <>
      <path d="M0 86 Q60 62 130 82 T320 76 L320 100 L0 100 Z" fill="#4ade80" opacity="0.7" />
      <path d="M0 94 Q90 78 180 92 T320 88 L320 100 L0 100 Z" fill="#22c55e" opacity="0.8" />
      {[150, 190, 250, 290].map((x, i) => (
        <g key={x} transform={`translate(${x} ${88 - (i % 2) * 6})`}>
          <path d="M0 0 L0 8" stroke="#15803d" strokeWidth="1.5" />
          <circle r="3.5" fill={i % 2 ? '#fde047' : '#f9a8d4'} />
          <circle r="1.3" fill="#fff" />
        </g>
      ))}
      <circle cx="295" cy="18" r="10" fill="#fde047" opacity="0.8" />
      <path d="M230 22 q8 -8 16 0 q8 -6 14 2 q-15 4 -30 -2 Z" fill="#fff" opacity="0.9" />
    </>
  ),
  ocean: (
    <>
      <path d="M0 80 Q20 74 40 80 T80 80 T120 80 T160 80 T200 80 T240 80 T280 80 T320 80 L320 100 L0 100 Z" fill="#0ea5e9" opacity="0.5" />
      <path d="M0 90 Q25 84 50 90 T100 90 T150 90 T200 90 T250 90 T300 90 T350 90 L320 100 L0 100 Z" fill="#0284c7" opacity="0.6" />
      {[[200, 60, 4], [215, 48, 2.5], [280, 66, 3], [300, 40, 2]].map(([x, y, r]) => (
        <circle key={x} className="scene-bubble" cx={x} cy={y} r={r} fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.8" />
      ))}
      <path d="M250 74 q10 -8 20 0 q-10 8 -20 0 Z M270 74 l7 -5 l0 10 Z" fill="#f97316" opacity="0.9" />
    </>
  ),
  space: (
    <>
      <g transform="translate(320 100) scale(0.7) translate(-320 -100)">
      <circle cx="285" cy="26" r="13" fill="#f59e0b" opacity="0.85" />
      <ellipse cx="285" cy="26" rx="22" ry="5" fill="none" stroke="#fde68a" strokeWidth="2" opacity="0.8" />
      <circle cx="220" cy="84" r="7" fill="#60a5fa" opacity="0.7" />
      {[[140, 12], [180, 40], [240, 14], [310, 60], [160, 80], [260, 92]].map(([x, y]) => (
        <path key={x} className="scene-twinkle" d={`M${x} ${y - 4} l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 l3 -1 Z`} fill="#fef9c3" />
      ))}
      </g>
    </>
  ),
  school: (
    <>
      <g transform="translate(320 100) scale(0.5) translate(-320 -100)">
      <rect x="190" y="10" width="120" height="56" rx="3" fill="#166534" stroke="#92400e" strokeWidth="4" opacity="0.85" />
      <text x="250" y="34" textAnchor="middle" fontSize="11" fill="#f9fafb" opacity="0.9">
        ABC
      </text>
      <text x="250" y="52" textAnchor="middle" fontSize="9" fill="#f9fafb" opacity="0.8">
        Hello!
      </text>
      <rect x="0" y="92" width="320" height="8" fill="#b45309" opacity="0.5" />
      </g>
    </>
  ),
  night: (
    <>
      <g transform="translate(320 100) scale(0.5) translate(-320 -100)">
      <circle cx="292" cy="20" r="11" fill="#fef08a" />
      <circle cx="298" cy="16" r="10" fill="#1e3a8a" opacity="0.9" />
      {[[150, 58, 26], [180, 44, 22], [206, 64, 30], [240, 50, 24], [268, 70, 28], [300, 56, 20]].map(([x, y, w]) => (
        <g key={x}>
          <rect x={x} y={y} width={w} height={100 - y} fill="#0f172a" opacity="0.85" />
          <rect x={x + 5} y={y + 8} width="4" height="4" fill="#fde047" opacity="0.8" />
          <rect x={x + w - 9} y={y + 18} width="4" height="4" fill="#fde047" opacity="0.6" />
        </g>
      ))}
      </g>
    </>
  ),
  sakura: (
    <>
      <path d="M320 0 Q280 20 250 18 Q270 30 320 34 Z" fill="#f9a8d4" opacity="0.8" />
      <path d="M300 0 L320 40" stroke="#78350f" strokeWidth="3" />
      {[[200, 30], [230, 60], [270, 50], [160, 70], [300, 80]].map(([x, y], i) => (
        <ellipse key={x} className="scene-petal" cx={x} cy={y} rx="3" ry="2" fill="#f472b6" opacity="0.8" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
    </>
  ),
  bookroom: (
    <>
      <g transform="translate(320 100) scale(0.5) translate(-320 -100)">
      {[0, 1].map((r) => (
        <g key={r}>
          <rect x="196" y={20 + r * 38} width="120" height="4" fill="#78350f" />
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={198 + i * 10} y={r * 38 + 2 + (i % 3) * 2} width="8" height={18 - (i % 3) * 2} fill={['#ef4444', '#3b82f6', '#22c55e', '#f59e0b'][(i + r) % 4]} opacity="0.75" />
          ))}
        </g>
      ))}
      </g>
    </>
  ),
  royal: (
    <>
      <g transform="translate(320 100) scale(0.55) translate(-320 -100)">
      <g fill="#a5b4fc" stroke="#4338ca" strokeWidth="1.5" opacity="0.9">
        <rect x="220" y="40" width="70" height="60" />
        <rect x="210" y="26" width="18" height="74" />
        <rect x="282" y="26" width="18" height="74" />
        <path d="M206 26 L219 8 L232 26 Z M278 26 L291 8 L304 26 Z" fill="#6366f1" />
        <path d="M245 100 L245 78 Q255 66 265 78 L265 100 Z" fill="#4338ca" />
      </g>
      <path d="M219 8 L219 0 L228 3 L219 6" fill="#ef4444" />
      </g>
    </>
  ),
  snowy: (
    <>
      <path d="M150 100 L210 30 L240 62 L265 40 L320 100 Z" fill="#cbd5e1" opacity="0.7" />
      <path d="M210 30 L196 47 L204 45 L212 52 L220 42 L226 46 Z M265 40 L256 51 L264 50 L272 55 L276 51 Z" fill="#fff" />
      <path d="M0 92 Q80 82 160 94 T320 90 L320 100 L0 100 Z" fill="#fff" />
      {[[130, 20], [170, 50], [290, 20], [240, 80], [110, 70], [200, 10]].map(([x, y], i) => (
        <circle key={x} className="scene-snow" cx={x} cy={y} r="2" fill="#fff" style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
    </>
  ),
  forest: (
    <>
      {[[250, 0.45], [272, 0.6], [296, 0.5], [314, 0.4]].map(([x, k]) => (
        <g key={x} transform={`translate(${x} 100) scale(${k})`}>
          <rect x="-3" y="-16" width="6" height="16" fill="#78350f" />
          <path d="M0 -70 L-18 -36 L-8 -36 L-22 -14 L22 -14 L8 -36 L18 -36 Z" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
        </g>
      ))}
      <path d="M0 96 Q160 88 320 96 L320 100 L0 100 Z" fill="#65a30d" opacity="0.7" />
      <g transform="translate(170 92)">
        <rect x="-1.5" y="-6" width="3" height="6" fill="#fef3c7" />
        <path d="M-7 -6 Q0 -14 7 -6 Z" fill="#ef4444" />
        <circle cx="-2" cy="-9" r="1" fill="#fff" />
      </g>
    </>
  ),
}
