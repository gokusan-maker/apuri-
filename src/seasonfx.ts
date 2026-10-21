// 季節の背景演出：春は桜、夏はほたる、秋は落ち葉、冬は雪がホームの相棒のまわりを舞う
export type SeasonFx = { id: 'spring' | 'summer' | 'autumn' | 'winter'; name: string; icon: string }

export const SEASON_FX: Record<SeasonFx['id'], SeasonFx> = {
  spring: { id: 'spring', name: '桜', icon: '🌸' },
  summer: { id: 'summer', name: 'ほたる', icon: '✨' },
  autumn: { id: 'autumn', name: '落ち葉', icon: '🍁' },
  winter: { id: 'winter', name: '雪', icon: '❄️' },
}

// 日付（YYYY-MM-DD）の月で季節を決める
export function seasonFxOf(day: string): SeasonFx {
  const m = Number(day.slice(5, 7))
  if (m >= 3 && m <= 5) return SEASON_FX.spring
  if (m >= 6 && m <= 8) return SEASON_FX.summer
  if (m >= 9 && m <= 11) return SEASON_FX.autumn
  return SEASON_FX.winter
}
