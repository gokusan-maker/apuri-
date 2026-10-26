import { useId } from 'react'
import type { MapTheme } from './castle'
import { MAP_ZONES, type MapZone } from './mapzone'

// 地図の景色：空 → 遠くの景色 → まん中 → 手前 の順にかさねて奥行きを出す。ゾーンごとに色と形が変わる
const W = 360

// なみ線（左はしから右はしまで）
const wave = (y: number, amp: number, len: number) => {
  let d = `M-20 ${y}`
  for (let x = -20; x < W + 20; x += len) d += ` q ${len / 4} ${-amp} ${len / 2} 0 t ${len / 2} 0`
  return d
}
// なだらかな丘（下までぬる）
const hills = (y: number, amp: number, len: number, h: number, phase = 0) => {
  let d = `M-30 ${h} L-30 ${y}`
  for (let x = -30 + phase; x < W + 30; x += len) d += ` Q ${x + len / 2} ${y - amp} ${x + len} ${y}`
  return `${d} L${W + 30} ${h} Z`
}
// ぎざぎざの山（下までぬる）。頂上の点も返す（雪をのせる）
const peaks = (base: number, tops: [number, number][], h: number) => {
  let d = `M-10 ${h} L-10 ${base}`
  for (const [x, y] of tops) d += ` L${x - 34} ${base} L${x} ${y} L${x + 34} ${base}`
  return `${d} L${W + 10} ${base} L${W + 10} ${h} Z`
}
const snowCap = (x: number, y: number, s = 1) => `M${x} ${y} L${x - 13 * s} ${y + 18 * s} L${x - 5 * s} ${y + 14 * s} L${x} ${y + 20 * s} L${x + 6 * s} ${y + 13 * s} L${x + 13 * s} ${y + 18 * s} Z`

function Tree({ x, y, s, kind, color }: { x: number; y: number; s: number; kind: 'round' | 'pine' | 'mush'; color: string }) {
  if (kind === 'mush')
    return (
      <g className="scn-tree">
        <rect x={x - 4 * s} y={y - 16 * s} width={8 * s} height={16 * s} rx={3 * s} fill="#fdf4ff" opacity="0.9" />
        <path d={`M${x - 20 * s} ${y - 14 * s} Q ${x} ${y - 44 * s} ${x + 20 * s} ${y - 14 * s} Z`} fill={color} />
        <circle cx={x - 7 * s} cy={y - 24 * s} r={3 * s} fill="#fff" opacity="0.8" />
        <circle cx={x + 6 * s} cy={y - 28 * s} r={2.5 * s} fill="#fff" opacity="0.8" />
      </g>
    )
  if (kind === 'pine')
    return (
      <g className="scn-tree">
        <rect x={x - 3 * s} y={y - 10 * s} width={6 * s} height={10 * s} fill="#422006" />
        <path d={`M${x} ${y - 52 * s} L${x - 16 * s} ${y - 22 * s} L${x - 8 * s} ${y - 24 * s} L${x - 20 * s} ${y - 8 * s} L${x + 20 * s} ${y - 8 * s} L${x + 8 * s} ${y - 24 * s} L${x + 16 * s} ${y - 22 * s} Z`} fill={color} />
      </g>
    )
  return (
    <g className="scn-tree">
      <rect x={x - 3 * s} y={y - 14 * s} width={6 * s} height={14 * s} fill="#422006" />
      <circle cx={x} cy={y - 26 * s} r={15 * s} fill={color} />
      <circle cx={x - 10 * s} cy={y - 18 * s} r={10 * s} fill={color} />
      <circle cx={x + 10 * s} cy={y - 18 * s} r={10 * s} fill={color} />
      <circle cx={x - 4 * s} cy={y - 32 * s} r={5 * s} fill="#fff" opacity="0.12" />
    </g>
  )
}

function Sea({ z, zi, h, id }: { z: MapZone; zi: number; h: number; id: string }) {
  const hz = Math.round(h * 0.3)
  return (
    <>
      <rect x="-20" y={hz} width={W + 40} height={h - hz} fill={`url(#${id}-sea)`} />
      {/* 遠くの島 */}
      {zi !== 3 && <path d={`M210 ${hz} q 24 -14 50 -4 q 16 -8 30 4 Z`} fill={z.far} opacity="0.7" />}
      {zi === 4 && (
        <g>
          <path d={`M150 ${hz + 2} q 60 -40 120 0 Z`} fill="#65a30d" />
          <path d={`M206 ${hz - 18} q -2 -16 4 -28`} stroke="#713f12" strokeWidth="4" fill="none" />
          <path d={`M210 ${hz - 46} q -16 -2 -24 10 M210 ${hz - 46} q 16 -4 24 8 M210 ${hz - 46} q -4 -12 -16 -14 M210 ${hz - 46} q 8 -12 20 -10`} stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      )}
      {[0, 1, 2, 3, 4].map((k) => (
        <path key={k} className={`scn-wave w${k % 2}`} d={wave(hz + 18 + k * ((h - hz) / 5), zi === 3 ? 7 : 4, 46 + k * 6)} stroke={k % 2 ? '#fff' : z.near} strokeOpacity={0.35 - k * 0.03} strokeWidth="2.5" fill="none" />
      ))}
      {zi === 0 && <path d={`M-20 ${h} L-20 ${h - 38} Q 80 ${h - 64} 170 ${h - 34} T ${W + 20} ${h - 46} L ${W + 20} ${h} Z`} fill={z.near} />}
      {zi === 0 && <path d={`M-20 ${h - 38} Q 80 ${h - 64} 170 ${h - 34} T ${W + 20} ${h - 46}`} stroke="#fff" strokeWidth="3" strokeOpacity="0.7" fill="none" className="scn-foam" />}
      {zi === 1 && (
        <g fill={z.near} opacity="0.9">
          {[18, 64, 290, 334].map((x, k) => (
            <path key={x} d={`M${x} ${h} q -4 -26 -14 -34 M${x} ${h} q 2 -30 -2 -46 M${x} ${h} q 6 -22 16 -32`} stroke={k % 2 ? z.near : '#fb923c'} strokeWidth="6" strokeLinecap="round" fill="none" />
          ))}
        </g>
      )}
      {zi === 3 && <path className="scn-bolt" d="M262 6 L246 44 L258 44 L240 84 L276 36 L262 36 L276 6 Z" fill="#fef08a" />}
    </>
  )
}

function Forest({ z, zi, h }: { z: MapZone; zi: number; h: number }) {
  const kind = zi === 2 ? 'mush' : zi === 4 ? 'pine' : 'round'
  const tc = zi === 2 ? z.accent : z.mid
  return (
    <>
      <path d={hills(h * 0.34, 26, 120, h, -10)} fill={z.far} />
      <path d={hills(h * 0.52, 20, 90, h, 20)} fill={z.mid} opacity="0.95" />
      {zi === 4 && (
        <g className="scn-temple" fill="#fef3c7" opacity="0.85">
          <path d={`M250 ${h * 0.34} l 30 -16 l 30 16 Z`} />
          <rect x="254" y={h * 0.34} width="52" height="5" />
          {[258, 272, 286, 300].map((x) => (
            <rect key={x} x={x - 2} y={h * 0.34 + 5} width="4" height="22" />
          ))}
        </g>
      )}
      {/* 左右の木（道はまん中なので、はしにならべる） */}
      {[
        [10, 0.44, 1],
        [44, 0.3, 0.8],
        [318, 0.36, 0.9],
        [350, 0.6, 1.1],
        [6, 0.8, 1.2],
        [300, 0.9, 1],
      ].map(([x, y, s], k) => (
        <Tree key={k} x={x} y={h * y} s={s} kind={kind} color={k % 2 ? tc : z.near} />
      ))}
      <path d={hills(h - 18, 8, 60, h, 0)} fill={z.near} />
      {zi === 1 && (
        <g className="scn-rays" fill="#fef9c3">
          <path d={`M40 0 L90 0 L170 ${h} L100 ${h} Z`} />
          <path d={`M140 0 L170 0 L250 ${h} L210 ${h} Z`} />
        </g>
      )}
    </>
  )
}

function Mountain({ z, zi, h }: { z: MapZone; zi: number; h: number }) {
  const far: [number, number][] = [
    [40, h * 0.2],
    [130, h * 0.08],
    [230, h * 0.16],
    [320, h * 0.06],
  ]
  const snow = zi >= 2
  return (
    <>
      <path d={peaks(h * 0.42, far, h)} fill={z.far} />
      {(snow || zi === 1) && far.map(([x, y]) => <path key={x} d={snowCap(x, y, 0.9)} fill="#f8fafc" opacity={snow ? 0.95 : 0.6} />)}
      <path d={hills(h * 0.58, 30, 140, h, -40)} fill={z.mid} />
      {zi === 0 && (
        <g>
          {[
            [30, 0.62],
            [320, 0.66],
          ].map(([x, y]) => (
            <g key={x}>
              <rect x={x - 12} y={h * y - 12} width="24" height="14" fill="#fef3c7" />
              <path d={`M${x - 16} ${h * y - 11} L${x} ${h * y - 24} L${x + 16} ${h * y - 11} Z`} fill="#b91c1c" />
              <rect x={x - 3} y={h * y - 6} width="6" height="8" fill="#78350f" />
            </g>
          ))}
        </g>
      )}
      {zi === 1 && (
        <g fill="#44403c">
          <ellipse cx="24" cy={h * 0.8} rx="22" ry="12" />
          <ellipse cx="336" cy={h * 0.72} rx="26" ry="14" />
          <ellipse cx="316" cy={h * 0.95} rx="20" ry="10" />
        </g>
      )}
      <path d={hills(h - 16, 12, 80, h, 10)} fill={z.near} />
      {zi === 4 && (
        <g className="scn-cloudsea" fill="#fff" opacity="0.85">
          <ellipse cx="40" cy={h - 8} rx="60" ry="18" />
          <ellipse cx="150" cy={h} rx="70" ry="18" />
          <ellipse cx="280" cy={h - 6} rx="80" ry="20" />
        </g>
      )}
      {zi === 4 && (
        <g className="scn-rays" fill="#fef9c3">
          <path d={`M300 30 L360 0 L360 40 Z`} />
          <path d={`M300 30 L230 0 L270 0 Z`} />
        </g>
      )}
    </>
  )
}

// うごく演出のつぶ（位置は固定の表から。毎回同じ場所）
const SPOTS = [
  [8, 20],
  [22, 64],
  [36, 12],
  [50, 80],
  [62, 34],
  [74, 70],
  [88, 18],
  [94, 56],
  [14, 44],
  [44, 50],
  [80, 88],
  [30, 92],
]

export function MapScenery({ theme, zone, h }: { theme: MapTheme; zone: number; h: number }) {
  const id = useId().replace(/:/g, '')
  const z = MAP_ZONES[theme][zone]
  const sx = theme === 'sea' ? 300 : 286
  const sy = theme === 'mountain' ? 26 : 30
  return (
    <>
      <svg className="smap-scene" viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={z.sky[0]} />
            <stop offset="0.55" stopColor={z.sky[1]} />
            <stop offset="1" stopColor={z.sky[2]} />
          </linearGradient>
          <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={z.far} />
            <stop offset="1" stopColor={z.mid} />
          </linearGradient>
          <radialGradient id={`${id}-sun`}>
            <stop offset="0.45" stopColor={z.sun} />
            <stop offset="1" stopColor={z.sun} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="-20" y="-20" width={W + 40} height={h + 40} fill={`url(#${id}-sky)`} />
        {z.night && [20, 70, 120, 200, 250, 300, 340, 160].map((x, k) => <circle key={x} className="scn-star" cx={x} cy={8 + ((k * 37) % 60)} r={k % 3 ? 1 : 1.6} fill="#fff" />)}
        {z.night ? (
          <g className="scn-moon">
            <circle cx={sx} cy={sy} r="26" fill={`url(#${id}-sun)`} opacity="0.35" />
            {/* 三日月：外がわの大きな弧と、内がわの小さな弧 */}
            <path d={`M${sx + 4} ${sy - 12} A 12 12 0 1 0 ${sx + 4} ${sy + 12} A 9 12 0 1 1 ${sx + 4} ${sy - 12} Z`} fill={z.sun} />
          </g>
        ) : (
          <circle cx={sx} cy={sy} r="30" fill={`url(#${id}-sun)`} className="scn-sun" />
        )}
        {theme === 'sea' ? <Sea z={z} zi={zone} h={h} id={id} /> : theme === 'forest' ? <Forest z={z} zi={zone} h={h} /> : <Mountain z={z} zi={zone} h={h} />}
      </svg>
      <div className={`smap-fx fx-${z.fx}`} aria-hidden="true">
        {SPOTS.map(([x, y], k) => (
          <i key={k} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(k * 0.37) % 3}s` }} />
        ))}
      </div>
    </>
  )
}
