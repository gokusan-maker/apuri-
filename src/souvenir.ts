// おみやげ：1日の目標を達成すると、相棒がおでかけして見つけてくる（日付で決まる）
export type Souvenir = { id: string; icon: string; name: string; coins: number }

export const SOUVENIRS: Souvenir[] = [
  { id: 'shell', icon: '🐚', name: 'きれいな貝がら', coins: 5 },
  { id: 'acorn', icon: '🌰', name: 'どんぐり', coins: 5 },
  { id: 'clover', icon: '🍀', name: '四つ葉のクローバー', coins: 8 },
  { id: 'feather', icon: '🪶', name: 'ふわふわの羽', coins: 6 },
  { id: 'leaf', icon: '🍁', name: 'まっかな葉っぱ', coins: 5 },
  { id: 'stone', icon: '🪨', name: 'まるい石', coins: 5 },
  { id: 'mushroom', icon: '🍄', name: 'ふしぎなキノコ', coins: 7 },
  { id: 'star', icon: '🌟', name: '星のかけら', coins: 10 },
  { id: 'gem', icon: '💎', name: '小さな宝石', coins: 15 },
  { id: 'letter', icon: '💌', name: 'だれかの手紙', coins: 8 },
]

export function souvenirFor(day: string): Souvenir {
  let h = 17
  for (const c of day) h = (h * 37 + c.charCodeAt(0)) >>> 0
  return SOUVENIRS[h % SOUVENIRS.length]
}
