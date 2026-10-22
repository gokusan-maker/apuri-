// 相棒のきもち日記：今日の学習量で変わる相棒のひとこと
export function kimochiDiary(studied: number): { icon: string; text: string } {
  if (studied <= 0) return { icon: '🥺', text: '今日はまだいっしょに勉強していないな…。ちょっとさみしい。' }
  if (studied < 10) return { icon: '🙂', text: '少しだけ勉強できた！ もうちょっとがんばろうね。' }
  if (studied < 30) return { icon: '😊', text: 'たくさん勉強できた！ ごはんがおいしい日だ。' }
  return { icon: '🤩', text: '今日は最高の1日！ きみといっしょだと強くなれる気がする！' }
}
