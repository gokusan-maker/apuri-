import type { MapTheme } from './castle'

// 地図のゾーン：ステージを進むと景色が変わる（1つの地図に5つのゾーン）。ステージごとに目印のアイコンも変わる
export type MapFx = 'sparkle' | 'bubbles' | 'rain' | 'leaves' | 'sunrays' | 'spores' | 'fireflies' | 'clouds' | 'snow' | 'blizzard'
export type MapZone = {
  name: string
  icon: string
  sky: [string, string, string] // 空（上・まん中・下）
  far: string // 遠くの景色
  mid: string // まん中の景色
  near: string // 手前の景色
  road: string // 道
  edge: string // 道のふち
  accent: string // ステージの印の色
  sun: string // 太陽・月の色
  night?: boolean
  fx: MapFx // ゾーンのうごく演出
  node: string[] // ステージの目印（ステージごとに順番に変わる）
  deco: string[] // まわりの生きものなど
}

export const MAP_ZONES: Record<MapTheme, MapZone[]> = {
  sea: [
    { name: 'さざなみの浜', icon: '🐚', sky: ['#7dd3fc', '#bae6fd', '#fef3c7'], far: '#38bdf8', mid: '#0ea5e9', near: '#fde68a', road: '#fffbeb', edge: '#b45309', accent: '#f59e0b', sun: '#fde047', fx: 'sparkle', node: ['🐚', '🦀', '⛱️', '🌴'], deco: ['🦀', '🐚', '🕊️'] },
    { name: 'さんごの浅瀬', icon: '🪸', sky: ['#22d3ee', '#67e8f9', '#cffafe'], far: '#06b6d4', mid: '#0891b2', near: '#f472b6', road: '#ecfeff', edge: '#0e7490', accent: '#ec4899', sun: '#fef9c3', fx: 'bubbles', node: ['🪸', '🐠', '🐡', '🐢'], deco: ['🐠', '🐢', '🪼'] },
    { name: '大海原', icon: '⛵', sky: ['#1d4ed8', '#3b82f6', '#bfdbfe'], far: '#1e40af', mid: '#1e3a8a', near: '#60a5fa', road: '#e0f2fe', edge: '#172554', accent: '#38bdf8', sun: '#fef08a', fx: 'sparkle', node: ['⛵', '🐋', '🐬', '⚓'], deco: ['🐋', '🐬', '🕊️'] },
    { name: '嵐の海', icon: '🌀', sky: ['#1e1b4b', '#334155', '#475569'], far: '#1e293b', mid: '#0f172a', near: '#94a3b8', road: '#cbd5e1', edge: '#020617', accent: '#a78bfa', sun: '#e2e8f0', night: true, fx: 'rain', node: ['🌀', '⚡', '🏴‍☠️', '🌊'], deco: ['⚡', '🦈', '🏴‍☠️'] },
    { name: '宝の島', icon: '🏝', sky: ['#f97316', '#fb923c', '#fde68a'], far: '#9a3412', mid: '#0369a1', near: '#fcd34d', road: '#fffbeb', edge: '#92400e', accent: '#facc15', sun: '#fef08a', fx: 'sparkle', node: ['🏝', '💎', '🗝️', '👑'], deco: ['💰', '🦜', '💎'] },
  ],
  forest: [
    { name: 'はじまりの草原', icon: '🌼', sky: ['#93c5fd', '#bfdbfe', '#dcfce7'], far: '#86efac', mid: '#4ade80', near: '#22c55e', road: '#fef3c7', edge: '#a16207', accent: '#facc15', sun: '#fde047', fx: 'leaves', node: ['🌼', '🐇', '🌷', '🦋'], deco: ['🦋', '🐇', '🌻'] },
    { name: 'こもれびの森', icon: '🌳', sky: ['#86efac', '#22c55e', '#14532d'], far: '#166534', mid: '#15803d', near: '#14532d', road: '#fde68a', edge: '#713f12', accent: '#a3e635', sun: '#fef9c3', fx: 'sunrays', node: ['🌳', '🐿️', '🦔', '🍃'], deco: ['🐿️', '🦉', '🍂'] },
    { name: 'きのこの谷', icon: '🍄', sky: ['#0f766e', '#134e4a', '#3b0764'], far: '#115e59', mid: '#581c87', near: '#3b0764', road: '#f5d0fe', edge: '#4a044e', accent: '#e879f9', sun: '#f0abfc', fx: 'spores', node: ['🍄', '🐸', '🐌', '🍄'], deco: ['🐸', '🐛', '🍄'] },
    { name: 'ほたるの夜の森', icon: '🌙', sky: ['#020617', '#0f172a', '#1e3a8a'], far: '#0f172a', mid: '#052e16', near: '#022c22', road: '#fef9c3', edge: '#020617', accent: '#fde047', sun: '#fef9c3', night: true, fx: 'fireflies', node: ['🌙', '🦉', '🦊', '✨'], deco: ['🦉', '🦊', '🌙'] },
    { name: '大樹の神殿', icon: '🏛', sky: ['#fde68a', '#bbf7d0', '#4ade80'], far: '#65a30d', mid: '#3f6212', near: '#365314', road: '#fef3c7', edge: '#78350f', accent: '#fbbf24', sun: '#fffbeb', fx: 'sparkle', node: ['🌲', '🏛️', '🦌', '🌟'], deco: ['🦌', '🕊️', '🌟'] },
  ],
  mountain: [
    { name: 'ふもとの里', icon: '🏡', sky: ['#7dd3fc', '#e0f2fe', '#fef3c7'], far: '#a8a29e', mid: '#84cc16', near: '#65a30d', road: '#fef3c7', edge: '#92400e', accent: '#f97316', sun: '#fde047', fx: 'leaves', node: ['🏡', '🐄', '🌾', '🐓'], deco: ['🐄', '🌾', '🐓'] },
    { name: '岩の小道', icon: '🪨', sky: ['#94a3b8', '#cbd5e1', '#e7e5e4'], far: '#78716c', mid: '#57534e', near: '#44403c', road: '#e7e5e4', edge: '#1c1917', accent: '#f59e0b', sun: '#fef3c7', fx: 'clouds', node: ['🪨', '🐐', '⛏️', '🌋'], deco: ['🐐', '🦅', '🪨'] },
    { name: '雪の峠', icon: '❄️', sky: ['#93c5fd', '#dbeafe', '#f8fafc'], far: '#94a3b8', mid: '#cbd5e1', near: '#f1f5f9', road: '#64748b', edge: '#1e293b', accent: '#38bdf8', sun: '#fffbeb', fx: 'snow', node: ['❄️', '⛷️', '☃️', '🏂'], deco: ['☃️', '🐇', '❄️'] },
    { name: 'ふぶきの尾根', icon: '🌨', sky: ['#0f172a', '#334155', '#64748b'], far: '#475569', mid: '#94a3b8', near: '#e2e8f0', road: '#334155', edge: '#020617', accent: '#7dd3fc', sun: '#e0f2fe', night: true, fx: 'blizzard', node: ['🌨️', '🧊', '🐺', '⛺'], deco: ['🐺', '🧊', '⛺'] },
    { name: '天空の頂', icon: '🏔', sky: ['#f472b6', '#fb923c', '#fde68a'], far: '#6d28d9', mid: '#a78bfa', near: '#ede9fe', road: '#fffbeb', edge: '#5b21b6', accent: '#facc15', sun: '#fef08a', fx: 'sunrays', node: ['🏔️', '🦅', '🌄', '🏆'], deco: ['🦅', '☁️', '🌈'] },
  ],
}

export const ZONES_PER_MAP = 5
// i 番目（0から）のステージは、どのゾーンか（地図のステージ数を5つに分ける）
export function zoneIndex(i: number, total: number): number {
  if (total <= 1) return 0
  return Math.max(0, Math.min(ZONES_PER_MAP - 1, Math.floor((i * ZONES_PER_MAP) / total)))
}
export const zoneOf = (theme: MapTheme, i: number, total: number): MapZone => MAP_ZONES[theme][zoneIndex(i, total)]
// ステージの目印：ゾーンの目印をステージごとに順番に
export const stageIcon = (theme: MapTheme, i: number, total: number): string => {
  const z = zoneOf(theme, i, total)
  return z.node[i % z.node.length]
}
// そのゾーンのステージの範囲（1から数える）
export function zoneRange(z: number, total: number): [number, number] {
  let from = -1
  let to = -1
  for (let i = 0; i < total; i++)
    if (zoneIndex(i, total) === z) {
      if (from < 0) from = i
      to = i
    }
  return [from + 1, to + 1]
}
