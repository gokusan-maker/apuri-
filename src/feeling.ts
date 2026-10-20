// 相棒のごきげん：今日の学習数で変わる
export function feelingFor(studiedToday: number): { icon: string; text: string } {
  if (studiedToday >= 20) return { icon: '🤩', text: 'さいこうの気分！' }
  if (studiedToday >= 10) return { icon: '😊', text: 'ごきげん' }
  if (studiedToday >= 1) return { icon: '🙂', text: 'ふつう' }
  return { icon: '😪', text: 'ねむそう…いっしょに勉強しよう' }
}
