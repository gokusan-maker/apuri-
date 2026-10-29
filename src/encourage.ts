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
  seal: { streak: ['ヒレでぱちぱち、大正解！', 'つるつる、すべるように正解！'], wrong: ['氷ですべっただけ、もう一回！', 'ごろんとひと休みして、次いこう！'] },
  flamingo: { streak: ['かた足でも、ぴたっと正解！', 'ピンクにかがやく連続正解！'], wrong: ['ぐらっとしたけど、立てなおそう！', 'バランスをとって、もう一回！'] },
  otter: { streak: ['ぷかぷか、いい調子！', '小石がまたふえたよ、正解！'], wrong: ['川の流れにのって、もう一回！', '小石をなくしただけ、だいじょうぶ！'] },
  bear: { streak: ['はちみつみたいにあまい正解！', 'のっしのっし、連続正解！'], wrong: ['くまった…でも、もう一回！', 'ひとなめして、気をとりなおそう！'] },
  giraffe: { streak: ['首をのばして、大正解！', '高いところから見ると、全部わかる！'], wrong: ['首をひっこめて、もう一回！', '目線をかえて、次いこう！'] },
  frog: { streak: ['ケロッと大正解！', 'ぴょんぴょん、連続ジャンプ！'], wrong: ['雨のあとは晴れるよ、もう一回！', 'ひとジャンプして、気をとりなおそう！'] },
  raccoon: { streak: ['ていねいに洗って、ぴかぴか正解！', 'ごしごし、連続正解！'], wrong: ['まちがいは洗い流して、もう一回！', 'もういちどていねいにやってみよう！'] },
  sloth: { streak: ['ゆ〜っくり、でも正解！', 'のんびり連続正解！'], wrong: ['あせらない、あせらない。もう一回！', 'ぶら〜んとひと休みして、次いこう！'] },
  alpaca: { streak: ['もこもこ、ふわふわ正解！', 'もふもふパワーで連続正解！'], wrong: ['ふわっと気をとりなおそう！', 'もこもこの毛でつつんで、もう一回！'] },
  mole: { streak: ['ほりあてた、大正解！', 'もぐもぐ、どんどん正解！'], wrong: ['もう少しほってみよう！', '土の中で、もう一回考えよう！'] },
  dolphin: { streak: ['波にのって、大正解！', 'ざっぶーん、連続正解！'], wrong: ['もう一回、耳をすましてみよう！', '深呼吸して、もう一回もぐろう！'] },
  hippo: { streak: ['大きな口で、ぱくっと正解！', 'どっしり、連続正解！'], wrong: ['水につかって、ひと休み。もう一回！', 'のんびりいこう、次はできるよ！'] },
  crab: { streak: ['チョッキン、大正解！', '横歩きでも、まっすぐ正解！'], wrong: ['まちがいはチョキンと切って、もう一回！', '横にずれただけ、次いこう！'] },
  tiger: { streak: ['がおっ、大正解！', 'しましまパワーで連続正解！'], wrong: ['ねらいなおして、もう一回！', 'そっと近づいて、次はつかまえよう！'] },
  chameleon: { streak: ['色がかわるほど、大正解！', 'くるくる、連続正解！'], wrong: ['色をかえて、もう一回！', 'まわりをよく見て、次いこう！'] },
  swan: { streak: ['すいすい、大正解！', 'しずかに、でも確実に正解！'], wrong: ['水の下でがんばれば、次はできるよ！', '羽をととのえて、もう一回！'] },
  peacock: { streak: ['羽を広げて、大正解！', 'きらきら、連続正解！'], wrong: ['羽をたたんで、もう一回！', 'ひと休みして、また広げよう！'] },
  wolf: { streak: ['わお〜ん、大正解！', 'むれのリーダーみたいに連続正解！'], wrong: ['月を見上げて、もう一回！', 'なかまがいるよ、次いこう！'] },
  parrot: { streak: ['せいかい！ せいかい！', 'まねっこじょうず、連続正解！'], wrong: ['もう一回、もう一回！', 'まねして、次はできるよ！'] },
  bat: { streak: ['音をキャッチ、大正解！', 'ぱたぱた、連続正解！'], wrong: ['もう一回、耳をすませて！', 'さかさまにぶら下がって、考えなおそう！'] },
  seahorse: { streak: ['しっぽでしっかり、大正解！', 'ゆらゆら、連続正解！'], wrong: ['波にゆられて、もう一回！', 'しっぽでつかみなおそう！'] },
  camel: { streak: ['一歩ずつ、大正解！', 'こぶにためて、連続正解！'], wrong: ['さばくの道は長いよ、もう一回！', 'ひと休みして、また歩こう！'] },
  polarbear: { streak: ['氷の上でも、大正解！', 'のっしのっし、連続正解！'], wrong: ['ひえても負けない、もう一回！', '氷をわって、また進もう！'] },
  duck: { streak: ['ガーガー、大正解！', 'すいすい、連続正解！'], wrong: ['水をはじいて、もう一回！', 'ぷかぷかうかんで、次いこう！'] },
  squid: { streak: ['10本足で、大正解！', 'すいすい、連続正解！'], wrong: ['すみをはいて、気をとりなおそう！', '深い海でもう一回考えよう！'] },
  chicken: { streak: ['コケコッコー、大正解！', '朝から絶好調、連続正解！'], wrong: ['早起きして、もう一回！', 'つつきなおして、次いこう！'] },
  pig: { streak: ['くんくん、大正解！', 'ブーブー、連続正解！'], wrong: ['においをかぎなおして、もう一回！', 'どろんこになっても、次いこう！'] },
  beaver: { streak: ['かじかじ、大正解！', 'こつこつ積んで、連続正解！'], wrong: ['もう一本運んで、もう一回！', 'ダムは一日でできないよ、次いこう！'] },
  deer: { streak: ['ぴょんととんで、大正解！', '森をかけぬけて、連続正解！'], wrong: ['耳をすまして、もう一回！', 'ひと休みして、また走ろう！'] },
  goat: { streak: ['ひょいひょい、大正解！', '山のてっぺんまで、連続正解！'], wrong: ['足をすべらせただけ、もう一回！', 'ゆっくり登りなおそう！'] },
  mouse: { streak: ['チューッと大正解！', 'ちょこまか、連続正解！'], wrong: ['チーズを食べて、もう一回！', '小さな穴から、もう一度のぞいてみよう！'] },
  snail: { streak: ['ゆっくり、でも大正解！', 'にょろにょろ、連続正解！'], wrong: ['からにこもって、もう一回！', 'あじさいの葉で、ひと休み！'] },
  badger: { streak: ['ほりあてた、大正解！', 'ざくざく、連続正解！'], wrong: ['もう少し深くほってみよう！', '穴でひと休みして、次いこう！'] },
  jellyfish: { streak: ['ふわふわ、大正解！', 'ゆらゆら、連続正解！'], wrong: ['波にまかせて、もう一回！', 'ぷかぷかうかんで、気をとりなおそう！'] },
  whale: { streak: ['しおをふいて、大正解！', '大海原を、連続正解！'], wrong: ['深くもぐって、もう一回！', '波にのって、次いこう！'] },
  hummingbird: { streak: ['目にも止まらぬ大正解！', 'ぶんぶん、連続正解！'], wrong: ['花のみつを飲んで、もう一回！', 'ホバリングして、ひと休み！'] },
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
  seal: { streak: [['Clap, clap! Great!', 'ぱちぱち！ すごい！']], wrong: [['Just a slip. Try again!', 'ちょっとすべっただけ。もう一回！']] },
  flamingo: { streak: [['Perfect balance!', 'かんぺきなバランス！']], wrong: [['Find your balance and try again.', 'バランスをとって、もう一回。']] },
  otter: { streak: [['You’re on a roll!', '波にのってるね！']], wrong: [['Go with the flow and try again.', '流れにのって、もう一回。']] },
  bear: { streak: [['Sweet as honey!', 'はちみつみたいにあまい！']], wrong: [['Bear with it and try again.', 'がまんして、もう一回。']] },
  giraffe: { streak: [['Head and shoulders above the rest!', 'ずばぬけてるね！']], wrong: [['Look again from up high.', '高いところから、もう一度見てみよう。']] },
  frog: { streak: [['Hop to it! Great job!', 'その調子でぴょん！']], wrong: [['Jump back in and try again.', 'またとびこんで、もう一回。']] },
  raccoon: { streak: [['Squeaky clean answers!', 'ぴかぴかの答え！']], wrong: [['Wash it off and try again.', '洗い流して、もう一回。']] },
  sloth: { streak: [['Slowly but surely!', 'ゆっくり、でも確実に！']], wrong: [['No rush. Try again.', 'あわてないで、もう一回。']] },
  alpaca: { streak: [['Soft and smart!', 'やわらかくて、かしこい！']], wrong: [['Fluff it off and try again.', 'ふわっとはらって、もう一回。']] },
  mole: { streak: [['You dug deep!', '深くほりあてたね！']], wrong: [['Dig a little more.', 'もう少しほってみよう。']] },
  dolphin: { streak: [['Riding the wave!', '波にのってるね！']], wrong: [['Listen closely and try again.', 'よく聞いて、もう一回。']] },
  hippo: { streak: [['That was a big bite!', '大きなひと口だったね！']], wrong: [['Take a dip and try again.', 'ひと休みして、もう一回。']] },
  crab: { streak: [['Sharp as a claw!', 'ハサミみたいにするどい！']], wrong: [['Snip it and try again.', 'チョキンと切って、もう一回。']] },
  tiger: { streak: [['Fierce and focused!', 'するどくて集中してる！']], wrong: [['Take aim and try again.', 'ねらいなおして、もう一回。']] },
  chameleon: { streak: [['Showing your true colors!', '本当の力が出てるね！']], wrong: [['Change and try again.', '気分をかえて、もう一回。']] },
  swan: { streak: [['Smooth and graceful!', 'なめらかで美しい！']], wrong: [['Keep paddling and try again.', 'こぎ続けて、もう一回。']] },
  peacock: { streak: [['What a show!', 'みごとなショー！']], wrong: [['Fold your wings and try again.', '羽をたたんで、もう一回。']] },
  wolf: { streak: [['Leader of the pack!', 'むれのリーダーだね！']], wrong: [['Howl and try again.', 'ほえて、もう一回。']] },
  parrot: { streak: [['Great job! Great job!', 'すごい！ すごい！']], wrong: [['Again! Again!', 'もう一回！ もう一回！']] },
  bat: { streak: [['Great ears!', 'すごい耳だね！']], wrong: [['Listen again.', 'もう一度聞いてみよう。']] },
  seahorse: { streak: [['You held on tight!', 'しっかりつかんだね！']], wrong: [['Hold on and try again.', 'しっかりつかんで、もう一回。']] },
  camel: { streak: [['Going the distance!', '遠くまで進んでるね！']], wrong: [['One more step. Try again.', 'もう一歩。もう一回。']] },
  polarbear: { streak: [['Cool and strong!', 'クールで力強い！']], wrong: [['Stay warm and try again.', 'あたたかくして、もう一回。']] },
  duck: { streak: [['Quack-tastic!', 'ガーッとすごい！']], wrong: [['Shake it off and try again.', 'ぶるっとはらって、もう一回。']] },
  squid: { streak: [['Ten out of ten!', '10点満点！']], wrong: [['Swim back and try again.', '泳いでもどって、もう一回。']] },
  chicken: { streak: [['Early bird wins!', '早起きは得をするね！']], wrong: [['Wake up and try again.', '目をさまして、もう一回。']] },
  pig: { streak: [['You sniffed it out!', 'かぎつけたね！']], wrong: [['Sniff again and try.', 'もう一度かいでみよう。']] },
  beaver: { streak: [['Busy as a beaver!', 'よく働くね！']], wrong: [['Build it again.', 'また積み上げよう。']] },
  deer: { streak: [['Quick as a deer!', 'シカみたいにすばやい！']], wrong: [['Listen closely and try again.', 'よく聞いて、もう一回。']] },
  goat: { streak: [['On top of the mountain!', '山のてっぺんだ！']], wrong: [['Climb again and try.', 'もう一度登ってみよう。']] },
  mouse: { streak: [['Quick as a mouse!', 'ネズミみたいにすばやい！']], wrong: [['Squeak! Try again.', 'チュー！ もう一回。']] },
  snail: { streak: [['Little by little!', '少しずつ、確実に！']], wrong: [['Take your time and try again.', 'ゆっくりでいいよ、もう一回。']] },
  badger: { streak: [['You dug it out!', 'ほり出したね！']], wrong: [['Dig a little deeper.', 'もう少し深くほろう。']] },
  jellyfish: { streak: [['Going with the flow!', '流れにのってるね！']], wrong: [['Float back and try again.', 'ふわっともどって、もう一回。']] },
  whale: { streak: [['A whale of a job!', 'すごい大仕事だ！']], wrong: [['Dive back in and try again.', 'またもぐって、もう一回。']] },
  hummingbird: { streak: [['Lightning fast!', 'いなずまみたいに速い！']], wrong: [['Hover and try again.', 'ホバリングして、もう一回。']] },
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
