// 相棒の励まし：ペットのように声をかけてくれる。小さいうちは日本語、Lv15（進化の系統が決まるころ）からは英語になる
export type Cheer = { text: string; ja: string; lang: 'ja' | 'en' }
export type CheerEvent = 'streak' | 'wrong'

const JA: Record<CheerEvent, string[]> = {
  streak: ['いい調子だよ！', 'すごいすごい！', 'その調子でいこう！', 'ぼくまでうれしくなっちゃう！'],
  wrong: ['だいじょうぶ、つぎがあるよ！', 'おしい！もう少し！', 'まちがえて覚えるんだよ！', 'ゆっくりでいいよ！'],
}
// キャラクターごとの口ぐせ（小さいうち）
const JA_SPECIES: Record<string, Record<CheerEvent, string[]>> = {
  dragon: { streak: ['がおー！いい調子！', 'ぼくの火みたいに燃えてるね！'], wrong: ['がおー、まけないで！', 'ちいさなドラゴンもがんばってるよ！'] },
  fox: { streak: ['コンコン！かしこいね！', 'きまりがわかってきたコン！'], wrong: ['コン…おしい！', 'ゆっくり考えればわかるコン！'] },
  penguin: { streak: ['ペンペン！じょうずに並んだね！', 'よちよち、でも速いね！'], wrong: ['ペン…だいじょうぶ！', 'つるっとすべっただけだよ！'] },
  rabbit: { streak: ['ピョーン！耳がいいね！', 'ぴょんぴょんいい調子！'], wrong: ['ピョン…もう一回聞いてみよう！', '耳をすませばだいじょうぶ！'] },
  cat: { streak: ['ニャー！すごいニャ！', 'ごきげんだニャ！'], wrong: ['ニャ…おしいニャ！', '気にしないニャ、つぎつぎ！'] },
  owl: { streak: ['ホーホー！よく読めてるね！', 'ものしりになってきたホー！'], wrong: ['ホー…もう一度読んでみよう！', 'あわてずじっくりだホー！'] },
  hamster: { streak: ['ほっぺが単語でいっぱい！', 'チュチュッ、その調子！'], wrong: ['だいじょうぶ、ひまわりのたねを食べて元気だそう！', 'くるくる回し車で、もう一回！'] },
  sheep: { streak: ['メェ〜！もこもこ大正解！', 'ふわふわ、いい調子！'], wrong: ['だいじょうぶ、ふわっと気をとりなおそう！', 'ひつじを数えて、もう一回！'] },
  squirrel: { streak: ['どんぐりみたいに、単語がたまっていくね！', 'キキッ、その調子！'], wrong: ['だいじょうぶ、しっぽをふって気をとりなおそう！', 'もう一回、どんぐりさがし！'] },
  panda: { streak: ['ササがおいしい！じゃなくて、大正解！', 'のんびり、でも確実だね！'], wrong: ['だいじょうぶ、ササを食べてひと休み！', 'ころんでも、またおき上がろう！'] },
  lion: { streak: ['ガオー！百獣の王の大正解！', 'その調子、王さまみたい！'], wrong: ['だいじょうぶ、王さまもまちがえる！', 'ほえて気合を入れなおそう！'] },
  elephant: { streak: ['パオーン！しっかり覚えてるね！', 'ずしんずしん、いい調子！'], wrong: ['だいじょうぶ、次はわすれないよ！', '鼻で水をかけて、気をとりなおそう！'] },
  koala: { streak: ['ねむいけど、大正解！', 'ふわふわ、いい調子！'], wrong: ['だいじょうぶ、ひとねむりして気をとりなおそう！', 'ユーカリを食べて、もう一回！'] },
  hedgehog: { streak: ['トゲトゲ、するどい正解！', 'まるまって、また正解！'], wrong: ['トゲでちくっと、覚えなおそう！', 'こわくないよ、もう一回！'] },
  pelican: { streak: ['くちばしで、正解をキャッチ！', 'ぐわっ、いい調子！'], wrong: ['にがした魚は、もう一回すくおう！', 'だいじょうぶ、次はキャッチできるよ！'] },
  turtle: { streak: ['のそのそ、でも全部正解！', 'コツコツがいちばんだよ！'], wrong: ['だいじょうぶ、ゆっくりいこう！', 'こうらにこもらず、もう一回！'] },
  octopus: { streak: ['タコタコ！8本足で大かつやく！', 'ぷくぷく、いい調子！'], wrong: ['タコ…からまっちゃった！', 'すみをはいて、気をとりなおそう！'] },
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
const EN_SPECIES: Record<string, Record<CheerEvent, [string, string][]>> = {
  fox: { streak: [['Clever as a fox!', 'キツネみたいにかしこい！']], wrong: [['Think it through. You can do it!', 'よく考えて。きみならできる！']] },
  penguin: { streak: [['Waddle on! Great order!', 'すすめー！きれいに並んだ！']], wrong: [['Just a little slip!', 'ちょっとすべっただけ！']] },
  rabbit: { streak: [['Great ears! Hop hop!', 'いい耳だね！ぴょんぴょん！']], wrong: [['Listen again carefully.', 'もう一度よく聞いてみよう。']] },
  cat: { streak: [['Purr-fect!', 'カンペキだニャ！']], wrong: [['No worries, try again!', '気にしないで、もう一回！']] },
  owl: { streak: [['You read that well!', 'よく読めたね！']], wrong: [['Read it once more.', 'もう一度読んでみよう。']] },
  hamster: { streak: [['My cheeks are full of words!', 'ほっぺが単語でいっぱい！']], wrong: [['Run on the wheel and try again!', '回し車を走って、もう一回！']] },
  sheep: { streak: [['Baa! You are doing great!', 'メェ〜！すごいね！']], wrong: [['Take a deep breath and try again.', '深呼吸して、もう一回。']] },
  squirrel: { streak: [['Nuts about English!', '英語に夢中だね！']], wrong: [['Shake your tail and try again!', 'しっぽをふって、もう一回！']] },
  panda: { streak: [['Great job, my friend!', 'やったね、なかま！']], wrong: [['Relax and try again.', 'のんびり、もう一回。']] },
  lion: { streak: [['You are the king of English!', 'きみは英語の王さまだ！']], wrong: [['Be brave and try again!', '勇気を出して、もう一回！']] },
  elephant: { streak: [['You have a great memory!', 'すごい記憶力だね！']], wrong: [['Big steps, try again!', '大きな一歩で、もう一回！']] },
  koala: { streak: [['Wide awake and doing great!', '目がさめて、絶好調！']], wrong: [['No worries, try again.', '気にしないで、もう一回。']] },
  hedgehog: { streak: [['Sharp answers!', 'するどい答え！']], wrong: [['Roll up and try again.', 'まるまって、もう一回。']] },
  pelican: { streak: [['What a catch!', 'みごとなキャッチ！']], wrong: [['Scoop it up next time.', '次はすくい上げよう。']] },
  turtle: { streak: [['Slow and steady!', 'ゆっくり確実に！']], wrong: [['Keep going, step by step.', '一歩ずつ進もう。']] },
  octopus: { streak: [['All eight arms are cheering!', '8本の足でおうえん中！']], wrong: [["Shake it off and try again!", '気をとりなおして、もう一回！']] },
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
    const own = JA_SPECIES[species ?? '']
    const list = own ? [...own[event], ...JA[event]] : JA[event]
    const t = list[Math.floor(r * list.length)]
    return { text: t, ja: t, lang: 'ja' }
  }
  const own = dragon ? EN_DRAGON : EN_SPECIES[species ?? '']
  const list = own ? [...own[event], ...EN[event]] : EN[event]
  const [text, ja] = list[Math.floor(r * list.length)]
  return { text, ja, lang: 'en' }
}

// 励ますタイミング：連続正解 3・5・10 回目、または2回続けてまちがえたとき
export function cheerEvent(correctRun: number, wrongRun: number): CheerEvent | null {
  if ([3, 5, 10].includes(correctRun)) return 'streak'
  if (wrongRun === 2) return 'wrong'
  return null
}
