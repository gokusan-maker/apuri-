export type Word = {
  id: string
  en: string
  ja: string
  example: string
  exampleJa: string
}

// 中学〜高校基礎レベルの基本語（例文はオリジナル）
export const WORDS: Word[] = [
  { id: 'apple', en: 'apple', ja: 'りんご', example: 'I eat an apple every morning.', exampleJa: '私は毎朝りんごを食べる。' },
  { id: 'borrow', en: 'borrow', ja: '借りる', example: 'Can I borrow your pen?', exampleJa: 'ペンを借りてもいい？' },
  { id: 'decide', en: 'decide', ja: '決める', example: 'She decided to study abroad.', exampleJa: '彼女は留学することに決めた。' },
  { id: 'early', en: 'early', ja: '早く・早い', example: 'He gets up early on weekdays.', exampleJa: '彼は平日は早起きする。' },
  { id: 'forget', en: 'forget', ja: '忘れる', example: "Don't forget your umbrella.", exampleJa: '傘を忘れないでね。' },
  { id: 'important', en: 'important', ja: '大切な', example: 'Sleep is important for your health.', exampleJa: '睡眠は健康にとって大切だ。' },
  { id: 'invite', en: 'invite', ja: '招待する', example: 'They invited me to the party.', exampleJa: '彼らは私をパーティーに招待した。' },
  { id: 'library', en: 'library', ja: '図書館', example: 'I study at the library after school.', exampleJa: '放課後は図書館で勉強する。' },
  { id: 'medicine', en: 'medicine', ja: '薬', example: 'Take this medicine after meals.', exampleJa: 'この薬は食後に飲んでください。' },
  { id: 'neighbor', en: 'neighbor', ja: '隣人', example: 'Our neighbor has a friendly dog.', exampleJa: '隣の人は人なつっこい犬を飼っている。' },
  { id: 'practice', en: 'practice', ja: '練習する', example: 'I practice the piano every day.', exampleJa: '毎日ピアノを練習している。' },
  { id: 'quiet', en: 'quiet', ja: '静かな', example: 'Please be quiet in the classroom.', exampleJa: '教室では静かにしてください。' },
  { id: 'remember', en: 'remember', ja: '覚えている・思い出す', example: 'I remember his name.', exampleJa: '彼の名前を覚えている。' },
  { id: 'several', en: 'several', ja: 'いくつかの', example: 'I have visited Kyoto several times.', exampleJa: '京都には何度か行ったことがある。' },
  { id: 'travel', en: 'travel', ja: '旅行する', example: 'We want to travel around Hokkaido.', exampleJa: '北海道をあちこち旅行したい。' },
  { id: 'understand', en: 'understand', ja: '理解する', example: 'Do you understand this question?', exampleJa: 'この問題がわかりますか？' },
  { id: 'weather', en: 'weather', ja: '天気', example: 'The weather is nice today.', exampleJa: '今日は天気がいい。' },
  { id: 'worry', en: 'worry', ja: '心配する', example: "Don't worry about the test.", exampleJa: 'テストのことは心配しないで。' },
  { id: 'arrive', en: 'arrive', ja: '到着する', example: 'The train arrived on time.', exampleJa: '電車は時間どおりに着いた。' },
  { id: 'choose', en: 'choose', ja: '選ぶ', example: 'Choose one card from the box.', exampleJa: '箱からカードを1枚選んで。' },
]
