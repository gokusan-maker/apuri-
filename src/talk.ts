// 相棒のひとこと（英語＋日本語訳）
export type Line = { en: string; ja: string }

export const LINES: Line[] = [
  { en: "Let's study together!", ja: 'いっしょに勉強しよう！' },
  { en: 'You can do it!', ja: 'きみならできる！' },
  { en: 'Good job today!', ja: '今日もよくがんばったね！' },
  { en: "I'm hungry for new words!", ja: '新しい単語が食べたいな！' },
  { en: 'One more question?', ja: 'もう1問どう？' },
  { en: 'Practice makes perfect.', ja: '練習あるのみ！' },
  { en: 'I like learning with you.', ja: 'きみと勉強するのが好きだよ。' },
  { en: 'Never give up!', ja: 'あきらめないで！' },
  { en: 'Little by little, every day.', ja: '毎日少しずつね。' },
  { en: 'Mistakes help us learn.', ja: 'まちがいは学びのもとだよ。' },
  { en: 'Can you say it out loud?', ja: '声に出して言ってみよう！' },
  { en: 'Words are like treasure.', ja: '単語は宝物みたいだね。' },
  { en: 'Try the emoji quiz!', ja: '絵文字クイズもやってみてね！' },
  { en: 'Play a quiz with a friend!', ja: '友だちと2人対戦してみよう！' },
  { en: 'Can you find the odd one out?', ja: '仲間はずれ、見つけられるかな？' },
]

// 時間帯のひとこと
export const TIME_LINES: Record<'morning' | 'night', Line> = {
  morning: { en: 'Good morning! Ready to learn?', ja: 'おはよう！今日も勉強しよう？' },
  night: { en: "It's late. Let's sleep soon.", ja: 'もう遅いね。そろそろ寝よう。' },
}

// 季節のひとこと（月 1〜12）
export function seasonLine(month: number): Line {
  if (month >= 3 && month <= 5) return { en: 'Spring is here! Flowers are blooming.', ja: '春だね！花がさいてるよ。' }
  if (month >= 6 && month <= 8) return { en: "It's hot! Drink some water.", ja: '暑いね！水を飲んでね。' }
  if (month >= 9 && month <= 11) return { en: 'Autumn is a good time to read.', ja: '秋は読書にぴったりだね。' }
  return { en: "It's cold. Stay warm!", ja: '寒いね。あたたかくしてね。' }
}

export const EGG_LINE: Line = { en: '...knock, knock.', ja: '（タマゴの中からコトコト音がする）' }
export const LONELY_LINE: Line = { en: 'I missed you!', ja: '会いたかったよ！' }

export function pickLine(stage: number, lonely: boolean, r: number, now?: Date): Line {
  if (stage === 0) return EGG_LINE
  if (lonely) return LONELY_LINE
  if (now) {
    const h = now.getHours()
    if (h >= 22 || h < 5) return TIME_LINES.night
    // ときどき（2割）朝のあいさつや季節のひとこと
    if (r < 0.1) return h < 10 ? TIME_LINES.morning : seasonLine(now.getMonth() + 1)
    if (r < 0.2) return seasonLine(now.getMonth() + 1)
  }
  return LINES[Math.floor(r * LINES.length) % LINES.length]
}

// 学習中の応援（10問ごと）
export const CHEERS: Line[] = [
  { en: 'Great job!', ja: 'その調子！' },
  { en: "You're doing well!", ja: 'よくできてるよ！' },
  { en: 'Keep going!', ja: 'まだまだいけるよ！' },
  { en: 'Wow, ten more!', ja: 'また10問！すごい！' },
  { en: "I'm proud of you!", ja: 'きみはぼくのじまんだよ！' },
]

export function cheerFor(count: number): Line {
  return CHEERS[Math.floor(count / 10 - 1) % CHEERS.length]
}

// 今の時刻・季節でひとことを選ぶ
export function pickLineNow(stage: number, lonely: boolean, r: number): Line {
  return pickLine(stage, lonely, r, new Date())
}

// おやつをあげたときのひとこと
export const SNACK_LINES: Record<string, Line> = {
  cookie: { en: 'Crunchy! Thank you!', ja: 'サクサク！ありがとう！' },
  pudding: { en: 'So soft and sweet!', ja: 'ぷるぷるで甘い！' },
  cake: { en: 'Wow, a cake! I love it!', ja: 'わあ、ケーキ！大好き！' },
  onigiri: { en: 'Rice balls give me energy!', ja: 'おにぎりで元気が出る！' },
}

export function snackLine(id: string): Line {
  return SNACK_LINES[id] ?? { en: 'Yummy!', ja: 'おいしい！' }
}

// 覚えた単語で話しかける
export function rememberLine(w: { en: string; ja: string }): Line {
  return { en: `Do you remember "${w.en}"?`, ja: `「${w.en}」っておぼえてる？（${w.ja}）` }
}
