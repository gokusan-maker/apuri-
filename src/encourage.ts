// 相棒の励まし：ペットのように声をかけてくれる。小さいうちは日本語、Lv15（進化の系統が決まるころ）からは英語になる
export type Cheer = { text: string; ja: string; lang: 'ja' | 'en' }
export type CheerEvent = 'streak' | 'wrong'

const JA: Record<CheerEvent, string[]> = {
  streak: ['いい調子だよ！', 'すごいすごい！', 'その調子でいこう！', 'ぼくまでうれしくなっちゃう！'],
  wrong: ['だいじょうぶ、つぎがあるよ！', 'おしい！もう少し！', 'まちがえて覚えるんだよ！', 'ゆっくりでいいよ！'],
}
const JA_DRAGON: Record<CheerEvent, string[]> = {
  streak: ['がおー！いい調子！', 'ぼくの火みたいに燃えてるね！'],
  wrong: ['がおー、まけないで！', 'ちいさなドラゴンもがんばってるよ！'],
}
const EN: Record<CheerEvent, [string, string][]> = {
  streak: [
    ["You're on a roll!", '絶好調だね！'],
    ['Amazing work!', 'すばらしい！'],
    ['Keep it up!', 'その調子！'],
    ['Nice combo!', 'ナイスコンボ！'],
  ],
  wrong: [
    ["Don't give up!", 'あきらめないで！'],
    ['Almost! Try again!', 'おしい！もう一回！'],
    ['Mistakes help you learn!', 'まちがいは学びのもと！'],
    ['Take your time.', 'ゆっくりでいいよ。'],
  ],
}
const EN_DRAGON: Record<CheerEvent, [string, string][]> = {
  streak: [
    ["Roar! You're on fire!", 'ガオー！燃えてるね！'],
    ['Fly higher with English!', '英語でもっと高く飛ぼう！'],
  ],
  wrong: [
    ['Even dragons miss sometimes!', 'ドラゴンだってまちがえるよ！'],
    ['Rise again, my friend!', 'もう一度はばたこう、友よ！'],
  ],
}

export function encourage(species: string | undefined, stage: number, event: CheerEvent, r: number): Cheer {
  const dragon = species === 'dragon'
  if (stage < 3) {
    const list = dragon ? [...JA_DRAGON[event], ...JA[event]] : JA[event]
    const t = list[Math.floor(r * list.length)]
    return { text: t, ja: t, lang: 'ja' }
  }
  const list = dragon ? [...EN_DRAGON[event], ...EN[event]] : EN[event]
  const [text, ja] = list[Math.floor(r * list.length)]
  return { text, ja, lang: 'en' }
}

// 励ますタイミング：連続正解 3・5・10 回目、または2回続けてまちがえたとき
export function cheerEvent(correctRun: number, wrongRun: number): CheerEvent | null {
  if ([3, 5, 10].includes(correctRun)) return 'streak'
  if (wrongRun === 2) return 'wrong'
  return null
}
