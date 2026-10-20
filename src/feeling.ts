// 相棒のごきげん：今日の学習数で変わる（夜おそくは寝ようと言う）
export function feelingFor(studiedToday: number, hour = 12): { icon: string; text: string } {
  if (hour >= 22 || hour < 5) return { icon: '🌙', text: 'もう夜だよ。そろそろ寝よう' }
  if (studiedToday >= 20) return { icon: '🤩', text: 'さいこうの気分！' }
  if (studiedToday >= 10) return { icon: '😊', text: 'ごきげん' }
  if (studiedToday >= 1) return { icon: '🙂', text: 'ふつう' }
  return { icon: '😪', text: 'ねむそう…いっしょに勉強しよう' }
}
