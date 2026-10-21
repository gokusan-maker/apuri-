// まちがえやすい単語（解説・例文・問題はすべて自作）。文法ミニ解説と同じ形で使う
import type { GrammarUnit } from './grammar'

export const CONFUSING: GrammarUnit[] = [
  {
    id: 'borrow-lend',
    title: 'borrow と lend',
    points: ['borrow は「借りる」（自分が受け取る）。lend は「貸す」（相手にわたす）。'],
    examples: [
      { en: 'Can I borrow your pen?', ja: 'ペンを借りてもいい？' },
      { en: 'Can you lend me your pen?', ja: 'ペンを貸してくれる？' },
    ],
    questions: [
      { sentence: 'I ___ a book from the library.', choices: ['borrowed', 'lent'], answer: 0, why: '図書館から「借りた」ので borrow。' },
      { sentence: 'Could you ___ me your umbrella?', choices: ['borrow', 'lend'], answer: 1, why: '「私に貸して」なので lend me。' },
      { sentence: 'She ___ her bike to her brother.', choices: ['borrowed', 'lent'], answer: 1, why: '弟に「貸した」ので lend の過去形 lent。' },
    ],
  },
  {
    id: 'see-look-watch',
    title: 'see・look・watch',
    points: ['see は「自然に目に入る・見える」、look (at) は「目を向けて見る」、watch は「動くものをじっと見る」（テレビ・試合など）。'],
    examples: [
      { en: 'Look at the board.', ja: '黒板を見て。' },
      { en: 'I watch TV after dinner.', ja: '夕食のあとテレビを見る。' },
    ],
    questions: [
      { sentence: 'We ___ a soccer game on TV last night.', choices: ['saw', 'looked', 'watched'], answer: 2, why: '試合をじっと見るのは watch。' },
      { sentence: '___ at this picture!', choices: ['See', 'Look', 'Watch'], answer: 1, why: '「〜を見て」と目を向けさせるのは Look at。' },
      { sentence: 'I can ___ Mt. Fuji from my window.', choices: ['see', 'look', 'watch'], answer: 0, why: '自然に「見える」のは see。' },
    ],
  },
  {
    id: 'hear-listen',
    title: 'hear と listen',
    points: ['hear は「（自然に）聞こえる」、listen (to) は「耳をかたむけて聞く」。'],
    examples: [
      { en: 'I can hear a bird.', ja: '鳥の声が聞こえる。' },
      { en: 'I listen to music every night.', ja: '毎晩音楽を聞く。' },
    ],
    questions: [
      { sentence: 'Please ___ to me carefully.', choices: ['hear', 'listen'], answer: 1, why: '耳をかたむけて聞くのは listen to。' },
      { sentence: 'Did you ___ that strange sound?', choices: ['hear', 'listen'], answer: 0, why: '自然に「聞こえた」のは hear。' },
      { sentence: 'He likes ___ to the radio.', choices: ['hearing', 'listening'], answer: 1, why: 'ラジオを（意識して）聞くのは listen to。' },
    ],
  },
  {
    id: 'say-tell',
    title: 'say と tell',
    points: ['say は「（ことばを）言う」。tell は「（人に）伝える・話す」で、tell ＋ 人 の形が多い。'],
    examples: [
      { en: 'She said, "Good morning."', ja: '彼女は「おはよう」と言った。' },
      { en: 'Please tell me your name.', ja: 'あなたの名前を教えてください。' },
    ],
    questions: [
      { sentence: 'Can you ___ me the way to the station?', choices: ['say', 'tell'], answer: 1, why: '「人に教える」は tell ＋ 人。' },
      { sentence: 'He ___ "Thank you" and smiled.', choices: ['said', 'told'], answer: 0, why: 'ことばをそのまま「言った」は said。' },
      { sentence: 'My mother ___ me a funny story.', choices: ['said', 'told'], answer: 1, why: '人に話を「話した」は told ＋ 人。' },
    ],
  },
  {
    id: 'bring-take',
    title: 'bring と take',
    points: ['bring は「（話し手のいる所へ）持ってくる」、take は「（ほかの所へ）持っていく」。'],
    examples: [
      { en: 'Bring your textbook tomorrow.', ja: '明日は教科書を持ってきて。' },
      { en: 'Take an umbrella with you.', ja: 'かさを持っていきなさい。' },
    ],
    questions: [
      { sentence: 'Please ___ your lunch to school tomorrow.', choices: ['bring', 'take'], answer: 0, why: '（先生がいる）学校へ「持ってくる」は bring。' },
      { sentence: '___ this letter to the post office.', choices: ['Bring', 'Take'], answer: 1, why: '郵便局へ「持っていく」は take。' },
      { sentence: 'Can you ___ me a glass of water?', choices: ['bring', 'take'], answer: 0, why: '私の所へ「持ってくる」は bring。' },
    ],
  },
  {
    id: 'come-go',
    title: 'come と go',
    points: ['go は「（話し手から離れて）行く」。come は「（話し手・相手の所へ）来る・行く」。呼ばれて「今行くよ」は I\'m coming。'],
    examples: [
      { en: "Let's go to the park.", ja: '公園へ行こう。' },
      { en: 'Come to my house.', ja: 'うちに来て。' },
    ],
    questions: [
      { sentence: '"Dinner is ready!" "I\'m ___!"', choices: ['going', 'coming'], answer: 1, why: '相手の所へ向かうので coming。' },
      { sentence: 'I want to ___ to Hokkaido someday.', choices: ['go', 'come'], answer: 0, why: '自分から離れた所へ「行く」は go。' },
      { sentence: 'Can you ___ to my party on Sunday?', choices: ['go', 'come'], answer: 1, why: '話し手の所（パーティー）へ「来る」は come。' },
    ],
  },
  {
    id: 'many-much',
    title: 'many と much',
    points: ['many は数えられるもの（books, people）に、much は数えられないもの（water, money, time）に使う。'],
    examples: [
      { en: 'I have many books.', ja: '本をたくさん持っている。' },
      { en: "I don't have much time.", ja: 'あまり時間がない。' },
    ],
    questions: [
      { sentence: 'How ___ students are there in your class?', choices: ['many', 'much'], answer: 0, why: '生徒は数えられるので many。' },
      { sentence: 'How ___ water do you drink a day?', choices: ['many', 'much'], answer: 1, why: '水は数えられないので much。' },
      { sentence: 'There are ___ cars on the road.', choices: ['many', 'much'], answer: 0, why: '車は数えられるので many。' },
    ],
  },
  {
    id: 'few-little',
    title: 'a few と a little',
    points: ['a few は数えられるものが「少し」、a little は数えられないものが「少し」。'],
    examples: [
      { en: 'I have a few friends in Osaka.', ja: '大阪に友だちが少しいる。' },
      { en: 'Add a little salt.', ja: '塩を少し入れて。' },
    ],
    questions: [
      { sentence: 'Wait ___ minutes, please.', choices: ['a few', 'a little'], answer: 0, why: '分（minutes）は数えられるので a few。' },
      { sentence: 'I can speak ___ French.', choices: ['a few', 'a little'], answer: 1, why: '言語は数えられないので a little。' },
      { sentence: 'There is ___ milk in the bottle.', choices: ['a few', 'a little'], answer: 1, why: '牛乳は数えられないので a little。' },
    ],
  },
  {
    id: 'make-do',
    title: 'make と do',
    points: ['make は「作る・生み出す」（cake, friends, a mistake）。do は「（行動・作業を）する」（homework, my best）。'],
    examples: [
      { en: 'Let\'s make a cake.', ja: 'ケーキを作ろう。' },
      { en: 'I do my homework after dinner.', ja: '夕食後に宿題をする。' },
    ],
    questions: [
      { sentence: 'Did you ___ your homework?', choices: ['make', 'do'], answer: 1, why: '宿題を「する」は do。' },
      { sentence: 'Don\'t be afraid of ___ mistakes.', choices: ['making', 'doing'], answer: 0, why: 'まちがいを「する」は make a mistake。' },
      { sentence: 'I will ___ my best in the game.', choices: ['make', 'do'], answer: 1, why: '「全力をつくす」は do my best。' },
    ],
  },
  {
    id: 'wear-puton',
    title: 'wear と put on',
    points: ['wear は「身につけている（状態）」、put on は「身につける（動作）」。'],
    examples: [
      { en: 'She wears glasses.', ja: '彼女はメガネをかけている。' },
      { en: 'Put on your shoes.', ja: 'くつをはきなさい。' },
    ],
    questions: [
      { sentence: 'He always ___ a red cap.', choices: ['wears', 'puts on'], answer: 0, why: 'いつも「かぶっている」状態は wear。' },
      { sentence: 'It\'s cold. ___ your jacket.', choices: ['Wear', 'Put on'], answer: 1, why: '今「着なさい」という動作は put on。' },
      { sentence: 'Students ___ uniforms at my school.', choices: ['wear', 'put on'], answer: 0, why: '制服を「着ている」状態は wear。' },
    ],
  },
  {
    id: 'house-home',
    title: 'house と home',
    points: ['house は「建物としての家」、home は「（自分が住む）家・家庭」。go home のように home は前に to をつけない。'],
    examples: [
      { en: 'They built a new house.', ja: '彼らは新しい家を建てた。' },
      { en: 'I went home early.', ja: '早く家に帰った。' },
    ],
    questions: [
      { sentence: 'Let\'s go ___ now.', choices: ['home', 'house', 'to home'], answer: 0, why: '「家に帰る」は go home（to はつけない）。' },
      { sentence: 'There is a big ___ on the hill.', choices: ['home', 'house'], answer: 1, why: '建物としての家は house。' },
      { sentence: 'I stayed at ___ all day.', choices: ['house', 'home'], answer: 1, why: '「家にいる」は stay at home。' },
    ],
  },
  {
    id: 'trip-travel',
    title: 'trip と travel',
    points: ['trip は「（行って帰ってくる）旅行」で名詞として使う。travel は「旅をする」と動詞で使うことが多い。'],
    examples: [
      { en: 'We went on a school trip.', ja: '修学旅行に行った。' },
      { en: 'I want to travel around the world.', ja: '世界中を旅したい。' },
    ],
    questions: [
      { sentence: 'How was your ___ to Kyoto?', choices: ['trip', 'travel'], answer: 0, why: '1回の「旅行」は trip。' },
      { sentence: 'She likes to ___ by train.', choices: ['trip', 'travel'], answer: 1, why: '「旅をする」と動詞なら travel。' },
      { sentence: 'We took a day ___ to the beach.', choices: ['trip', 'travel'], answer: 0, why: '日帰り旅行は a day trip。' },
    ],
  },
  {
    id: 'job-work',
    title: 'job と work',
    points: ['job は「（数えられる）仕事・職」、work は「（数えられない）仕事・作業」や「働く」。'],
    examples: [
      { en: 'My sister got a new job.', ja: '姉は新しい仕事についた。' },
      { en: 'I have a lot of work today.', ja: '今日はやることがたくさんある。' },
    ],
    questions: [
      { sentence: 'He is looking for a ___.', choices: ['job', 'work'], answer: 0, why: 'a がつく数えられる「職」は job。' },
      { sentence: 'My father goes to ___ by bus.', choices: ['job', 'work'], answer: 1, why: '「仕事に行く」は go to work。' },
      { sentence: 'Good ___!', choices: ['job', 'work'], answer: 0, why: '「よくやったね」は Good job!' },
    ],
  },
  {
    id: 'look-find',
    title: 'look for と find',
    points: ['look for は「さがす（さがしている途中）」、find は「見つける（見つかった結果）」。'],
    examples: [
      { en: 'I am looking for my key.', ja: '鍵をさがしている。' },
      { en: 'I found my key under the bed.', ja: 'ベッドの下で鍵を見つけた。' },
    ],
    questions: [
      { sentence: 'What are you ___ for?', choices: ['looking', 'finding'], answer: 0, why: '「何をさがしているの？」は look for。' },
      { sentence: 'I ___ my wallet in the car.', choices: ['looked', 'found'], answer: 1, why: '「見つけた」という結果は found。' },
      { sentence: 'She couldn\'t ___ her cat.', choices: ['look', 'find'], answer: 1, why: '「見つけられなかった」は find。' },
    ],
  },
  {
    id: 'speak-talk',
    title: 'speak と talk',
    points: ['speak は「（言語を）話す・（一方的に）話す」、talk は「（相手と）おしゃべりする・話し合う」。'],
    examples: [
      { en: 'She can speak Chinese.', ja: '彼女は中国語を話せる。' },
      { en: 'Let\'s talk about the trip.', ja: '旅行について話そう。' },
    ],
    questions: [
      { sentence: 'Do you ___ English?', choices: ['speak', 'talk'], answer: 0, why: '言語を話すのは speak。' },
      { sentence: 'We ___ on the phone for an hour.', choices: ['spoke', 'talked'], answer: 1, why: '電話でおしゃべりするのは talk。' },
      { sentence: 'Can I ___ to you for a minute?', choices: ['speak', 'tell'], answer: 0, why: '「ちょっと話してもいい？」は speak to you（talk to you でも可）。tell は後ろに人＋内容が必要。' },
    ],
  },
  {
    id: 'teach-learn',
    title: 'teach と learn',
    points: ['teach は「教える」（相手に知識をわたす）。learn は「学ぶ・身につける」（自分が受け取る）。'],
    examples: [
      { en: 'My aunt teaches English.', ja: 'おばは英語を教えている。' },
      { en: 'I learned how to swim last summer.', ja: '去年の夏に泳ぎ方を覚えた。' },
    ],
    questions: [
      { sentence: 'Mr. Sato ___ us math.', choices: ['teaches', 'learns'], answer: 0, why: '私たちに「教える」ので teach。' },
      { sentence: 'I want to ___ Spanish.', choices: ['teach', 'learn'], answer: 1, why: '自分が「学びたい」ので learn。' },
      { sentence: 'Can you ___ me this game?', choices: ['teach', 'learn'], answer: 0, why: '「私に教えて」なので teach me。' },
    ],
  },
  {
    id: 'during-while',
    title: 'during と while',
    points: ['during のあとは名詞（the summer など）。while のあとは「主語＋動詞」の文が続く。どちらも「〜の間」。'],
    examples: [
      { en: 'I visited Kyoto during the summer.', ja: '夏の間に京都を訪れた。' },
      { en: 'I listen to music while I study.', ja: '勉強している間、音楽を聞く。' },
    ],
    questions: [
      { sentence: 'Please be quiet ___ the movie.', choices: ['during', 'while'], answer: 0, why: 'the movie は名詞なので during。' },
      { sentence: 'He called me ___ I was eating dinner.', choices: ['during', 'while'], answer: 1, why: 'あとに I was eating（主語＋動詞）が続くので while。' },
      { sentence: 'We sang songs ___ the bus trip.', choices: ['during', 'while'], answer: 0, why: 'the bus trip は名詞なので during。' },
    ],
  },
  {
    id: 'already-yet',
    title: 'already と yet',
    points: ['already は肯定文で「もう・すでに」。yet は疑問文で「もう」、否定文で「まだ（〜ない）」。yet はふつう文の最後に置く。'],
    examples: [
      { en: 'I have already finished my homework.', ja: 'もう宿題を終えた。' },
      { en: 'Have you eaten lunch yet?', ja: 'もうお昼を食べた？' },
    ],
    questions: [
      { sentence: 'The train has ___ left.', choices: ['already', 'yet'], answer: 0, why: '肯定文の「もう」なので already。' },
      { sentence: 'I haven\'t read the letter ___.', choices: ['already', 'yet'], answer: 1, why: '否定文の「まだ〜ない」なので yet。' },
      { sentence: 'Has the movie started ___?', choices: ['already', 'yet'], answer: 1, why: '疑問文の文末の「もう」なので yet。' },
    ],
  },
  {
    id: 'by-until',
    title: 'by と until',
    points: ['by は「〜までに」（その時までに1回やればよい・しめきり）。until は「〜まで（ずっと）」（その時まで続く）。'],
    examples: [
      { en: 'Please come back by five.', ja: '5時までに帰ってきてね。' },
      { en: 'I waited for her until five.', ja: '5時まで彼女を待った。' },
    ],
    questions: [
      { sentence: 'Finish the report ___ Friday.', choices: ['by', 'until'], answer: 0, why: '金曜日「までに」終える（しめきり）なので by。' },
      { sentence: 'The shop is open ___ nine tonight.', choices: ['by', 'until'], answer: 1, why: '夜9時「まで（ずっと）」開いているので until。' },
      { sentence: 'We played soccer ___ it got dark.', choices: ['by', 'until'], answer: 1, why: '暗くなる「まで」続けたので until。' },
    ],
  },
  {
    id: 'win-beat',
    title: 'win と beat',
    points: ['win のあとは試合・賞（the game, a prize）。beat のあとは相手（チーム・人）。「相手に勝つ」は beat。'],
    examples: [
      { en: 'Our team won the game.', ja: '私たちのチームは試合に勝った。' },
      { en: 'Our team beat the Tigers.', ja: '私たちのチームはタイガースに勝った。' },
    ],
    questions: [
      { sentence: 'She ___ first prize in the contest.', choices: ['won', 'beat'], answer: 0, why: '賞を「勝ち取った」ので win（過去形 won）。' },
      { sentence: 'I ___ my brother at chess.', choices: ['won', 'beat'], answer: 1, why: '相手（兄）に勝ったので beat。' },
      { sentence: 'Do you think we can ___ the match?', choices: ['win', 'beat'], answer: 0, why: '試合（the match）に勝つので win。' },
    ],
  },
  {
    id: 'arrive-reach',
    title: 'arrive と reach',
    points: ['どちらも「着く」。arrive はあとに at（せまい場所）か in（広い場所）が必要。reach はすぐあとに場所を置く。'],
    examples: [
      { en: 'We arrived at the station.', ja: '私たちは駅に着いた。' },
      { en: 'We reached the station.', ja: '私たちは駅に着いた。' },
    ],
    questions: [
      { sentence: 'The plane ___ in London at noon.', choices: ['arrived', 'reached'], answer: 0, why: 'あとに in があるので arrive。' },
      { sentence: 'They ___ the top of the mountain.', choices: ['arrived', 'reached'], answer: 1, why: 'すぐあとに場所があるので reach。' },
      { sentence: 'What time did you ___ at school?', choices: ['arrive', 'reach'], answer: 0, why: 'あとに at があるので arrive。' },
    ],
  },
  {
    id: 'lose-miss',
    title: 'lose と miss',
    points: ['lose は「なくす・負ける」。miss は「（乗り物に）乗りおくれる・のがす・いなくてさびしく思う」。'],
    examples: [
      { en: 'I lost my wallet.', ja: 'さいふをなくした。' },
      { en: 'I missed the bus.', ja: 'バスに乗りおくれた。' },
    ],
    questions: [
      { sentence: 'Hurry up, or you will ___ the train.', choices: ['lose', 'miss'], answer: 1, why: '電車に「乗りおくれる」は miss。' },
      { sentence: 'Our team ___ the game 2 to 3.', choices: ['lost', 'missed'], answer: 0, why: '試合に「負けた」は lose の過去形 lost。' },
      { sentence: 'I will ___ you when you move away.', choices: ['lose', 'miss'], answer: 1, why: 'いなくて「さびしく思う」は miss。' },
    ],
  },
  {
    id: 'hope-wish',
    title: 'hope と wish',
    points: ['hope は「（実現しそうなことを）望む」。wish は「（実現がむずかしいことを）願う」で、あとの文は過去形になる（仮定法）。'],
    examples: [
      { en: 'I hope it will be sunny tomorrow.', ja: '明日晴れるといいな。' },
      { en: 'I wish I could fly.', ja: '空を飛べたらいいのに。' },
    ],
    questions: [
      { sentence: 'I ___ you get well soon.', choices: ['hope', 'wish'], answer: 0, why: 'よくなることは実現しそうなので hope。' },
      { sentence: 'I ___ I were taller.', choices: ['hope', 'wish'], answer: 1, why: 'あとが過去形 were（事実とちがう願い）なので wish。' },
      { sentence: 'We ___ to see you again.', choices: ['hope', 'wish'], answer: 0, why: '「また会いたい」は実現しそうな望みなので hope to。' },
    ],
  },
  {
    id: 'another-other',
    title: 'another と other',
    points: ['another は「もう1つの・別の1つの」で、あとは単数の名詞。other は「ほかの」で、あとはふつう複数の名詞（other students）。'],
    examples: [
      { en: 'Can I have another cookie?', ja: 'クッキーをもう1つもらえる？' },
      { en: 'Some students walk, and other students ride bikes.', ja: '歩く生徒もいれば、自転車に乗る生徒もいる。' },
    ],
    questions: [
      { sentence: 'Would you like ___ cup of tea?', choices: ['another', 'other'], answer: 0, why: 'あとが単数 cup で「もう1杯」なので another。' },
      { sentence: 'Do you have any ___ questions?', choices: ['another', 'other'], answer: 1, why: 'あとが複数 questions なので other。' },
      { sentence: 'This shirt is too small. Show me ___ one.', choices: ['another', 'other'], answer: 0, why: '「別の1つ」なので another one。' },
    ],
  },
  {
    id: 'use-borrow',
    title: 'use と borrow（その場で使う）',
    points: ['borrow は「借りて持っていく」。トイレや電話など、その場で使わせてもらうときは use を使う。'],
    examples: [
      { en: 'May I use your bathroom?', ja: 'お手洗いをお借りしてもいいですか。' },
      { en: 'May I borrow this book until Friday?', ja: 'この本を金曜日まで借りてもいいですか。' },
    ],
    questions: [
      { sentence: 'Can I ___ your phone for a minute?', choices: ['use', 'borrow'], answer: 0, why: 'その場でちょっと使わせてもらうので use。' },
      { sentence: 'Can I ___ your umbrella? I\'ll return it tomorrow.', choices: ['use', 'borrow'], answer: 1, why: '持っていって明日返すので borrow。' },
      { sentence: 'May I ___ the bathroom?', choices: ['use', 'borrow'], answer: 0, why: 'トイレは持っていけないので use。' },
    ],
  },
  {
    id: 'sound-voice',
    title: 'sound と voice',
    points: ['sound は「音」全般（物音・楽器の音など）。voice は「人の声」。'],
    examples: [
      { en: 'I heard a strange sound.', ja: '変な音が聞こえた。' },
      { en: 'She has a beautiful voice.', ja: '彼女はきれいな声をしている。' },
    ],
    questions: [
      { sentence: 'The singer has a soft ___.', choices: ['voice', 'sound'], answer: 0, why: '人の「声」なので voice。' },
      { sentence: 'I like the ___ of the rain.', choices: ['voice', 'sound'], answer: 1, why: '雨の「音」なので sound。' },
      { sentence: 'Please speak in a loud ___.', choices: ['voice', 'sound'], answer: 0, why: '話す「声」なので voice。' },
    ],
  },
  {
    id: 'fun-funny',
    title: 'fun と funny',
    points: ['fun は「楽しい」（楽しいこと）。funny は「おかしい・笑える」。'],
    examples: [
      { en: 'The trip was fun.', ja: '旅行は楽しかった。' },
      { en: 'His joke was funny.', ja: '彼の冗談はおもしろかった。' },
    ],
    questions: [
      { sentence: 'We had a lot of ___ at the party.', choices: ['fun', 'funny'], answer: 0, why: '「楽しいこと」は fun。have fun で「楽しむ」。' },
      { sentence: 'That movie was so ___. I laughed a lot.', choices: ['fun', 'funny'], answer: 1, why: '笑えるので funny。' },
      { sentence: 'Playing soccer is ___.', choices: ['fun', 'funny'], answer: 0, why: '「楽しい」は fun。' },
    ],
  },
  {
    id: 'clothes-cloth',
    title: 'clothes と cloth',
    points: ['clothes は「服」（いつも複数あつかい）。cloth は「布」。'],
    examples: [
      { en: 'I bought new clothes.', ja: '新しい服を買った。' },
      { en: 'Clean the table with a cloth.', ja: '布でテーブルをふいて。' },
    ],
    questions: [
      { sentence: 'Put your ___ in the closet.', choices: ['clothes', 'cloth'], answer: 0, why: '「服」は clothes。' },
      { sentence: 'This bag is made of ___.', choices: ['clothes', 'cloth'], answer: 1, why: '「布」は cloth。' },
      { sentence: 'My ___ are wet.', choices: ['clothes', 'cloth'], answer: 0, why: 'are と複数なので「服」の clothes。' },
    ],
  },
  {
    id: 'remember-remind',
    title: 'remember と remind',
    points: ['remember は「覚えている・思い出す」（自分が）。remind は「（人に）思い出させる」。remind 人 of / to 〜。'],
    examples: [
      { en: 'I remember your name.', ja: 'あなたの名前を覚えています。' },
      { en: 'Please remind me to call him.', ja: '彼に電話するよう私に言ってね。' },
    ],
    questions: [
      { sentence: 'Do you ___ me? We met last year.', choices: ['remember', 'remind'], answer: 0, why: '自分が「覚えている」かなので remember。' },
      { sentence: 'This song ___ me of summer.', choices: ['remembers', 'reminds'], answer: 1, why: '「（私に）夏を思い出させる」なので remind 人 of。' },
      { sentence: 'Can you ___ me to bring my book?', choices: ['remember', 'remind'], answer: 1, why: '人に「〜するよう思い出させる」は remind 人 to。' },
    ],
  },
  {
    id: 'tall-high',
    title: 'tall と high',
    points: ['tall は細長く背が高いもの（人・木・ビル）。high は高い位置・高さ（山・かべ・天井・値段）。'],
    examples: [
      { en: 'My brother is tall.', ja: '兄は背が高い。' },
      { en: 'Mt. Fuji is very high.', ja: '富士山はとても高い。' },
    ],
    questions: [
      { sentence: 'He is the ___ boy in our class.', choices: ['tallest', 'highest'], answer: 0, why: '人の背の高さは tall。' },
      { sentence: 'The prices here are too ___.', choices: ['tall', 'high'], answer: 1, why: '値段が高いは high。' },
      { sentence: 'The bird is flying ___ in the sky.', choices: ['tall', 'high'], answer: 1, why: '空の高い所は high。' },
    ],
  },
  {
    id: 'lie-lay',
    title: 'lie と lay',
    points: ['lie は「横になる」（目的語なし）。lay は「（物を）横たえる・置く」（目的語あり）。lie の過去形は lay なので注意。'],
    examples: [
      { en: 'I lie on the sofa after dinner.', ja: '夕食のあとソファーに横になる。' },
      { en: 'Lay the baby on the bed.', ja: '赤ちゃんをベッドに寝かせて。' },
    ],
    questions: [
      { sentence: 'My cat likes to ___ in the sun.', choices: ['lie', 'lay'], answer: 0, why: '自分が「横になる」ので lie。' },
      { sentence: 'Please ___ the book on the desk.', choices: ['lie', 'lay'], answer: 1, why: '本を「置く」（目的語あり）ので lay。' },
      { sentence: 'Yesterday I ___ down because I was tired.', choices: ['lay', 'laid'], answer: 0, why: 'lie（横になる）の過去形は lay。' },
    ],
  },
  {
    id: 'rise-raise',
    title: 'rise と raise',
    points: ['rise は「上がる・のぼる」（目的語なし）。raise は「（〜を）上げる」（目的語あり）。'],
    examples: [
      { en: 'The sun rises in the east.', ja: '太陽は東からのぼる。' },
      { en: 'Raise your hand if you know the answer.', ja: '答えがわかったら手をあげて。' },
    ],
    questions: [
      { sentence: 'Prices ___ every year.', choices: ['rise', 'raise'], answer: 0, why: '値段が「上がる」（目的語なし）ので rise。' },
      { sentence: '___ your hand, please.', choices: ['Rise', 'Raise'], answer: 1, why: '手を「上げる」（目的語あり）ので raise。' },
      { sentence: 'The balloon ___ into the sky.', choices: ['rose', 'raised'], answer: 0, why: '風船が「上がった」ので rise の過去形 rose。' },
    ],
  },
  {
    id: 'rent-borrow',
    title: 'rent と borrow',
    points: ['rent は「お金をはらって借りる（貸す）」。borrow は「（ふつうは無料で）借りる」。'],
    examples: [
      { en: 'We rented a car in Hawaii.', ja: 'ハワイでレンタカーを借りた。' },
      { en: 'Can I borrow your pencil?', ja: 'えんぴつを借りてもいい？' },
    ],
    questions: [
      { sentence: 'They ___ an apartment near the station.', choices: ['rent', 'borrow'], answer: 0, why: 'お金をはらって借りるので rent。' },
      { sentence: 'May I ___ your eraser?', choices: ['rent', 'borrow'], answer: 1, why: '友だちから無料で借りるので borrow。' },
      { sentence: 'We ___ bikes at the park for 300 yen.', choices: ['rented', 'borrowed'], answer: 0, why: 'お金をはらって借りたので rent。' },
    ],
  },
  {
    id: 'speak-say',
    title: 'speak と say',
    points: ['speak は「（言語を）話す・話をする」。say は「（ことばを）言う」で、あとに言った内容がくる。'],
    examples: [
      { en: 'She speaks three languages.', ja: '彼女は3か国語を話す。' },
      { en: 'He said, "Good morning."', ja: '彼は「おはよう」と言った。' },
    ],
    questions: [
      { sentence: 'Can you ___ Chinese?', choices: ['speak', 'say'], answer: 0, why: '言語を話すのは speak。' },
      { sentence: 'What did she ___?', choices: ['speak', 'say'], answer: 1, why: '「何と言ったか」は say。' },
      { sentence: 'Please ___ more slowly.', choices: ['speak', 'say'], answer: 0, why: '「話す」動作そのものは speak。' },
    ],
  },
  {
    id: 'early-soon',
    title: 'early と soon',
    points: ['early は「（時間的に）早く・早い時間に」。soon は「まもなく・すぐに」（今からあまり時間がたたないうちに）。'],
    examples: [
      { en: 'I got up early this morning.', ja: '今朝は早起きした。' },
      { en: 'The bus will come soon.', ja: 'バスはまもなく来る。' },
    ],
    questions: [
      { sentence: 'Go to bed ___ tonight.', choices: ['early', 'soon'], answer: 0, why: '「早い時間に」寝るので early。' },
      { sentence: 'See you ___!', choices: ['early', 'soon'], answer: 1, why: '「またすぐに」は soon。' },
      { sentence: 'The movie will start ___.', choices: ['early', 'soon'], answer: 1, why: '「まもなく」始まるので soon。' },
    ],
  },
  {
    id: 'ago-before',
    title: 'ago と before',
    points: ['ago は「（今から）〜前に」で、two days ago のように期間のあとに置き、過去の文で使う。', 'before は「以前に」「〜の前に」。現在完了の文でも使える。'],
    examples: [
      { en: 'I visited Kyoto three years ago.', ja: '私は3年前に京都を訪れた。' },
      { en: 'Wash your hands before lunch.', ja: '昼ごはんの前に手を洗いなさい。' },
    ],
    questions: [
      { sentence: 'My cat was born two years ___.', choices: ['ago', 'before'], answer: 0, why: '「（今から）2年前に」なので ago。' },
      { sentence: 'Have you seen this movie ___?', choices: ['ago', 'before'], answer: 1, why: '現在完了の「以前に」は before。' },
      { sentence: 'Brush your teeth ___ you go to bed.', choices: ['ago', 'before'], answer: 1, why: '「寝る前に」は before。' },
    ],
  },
  {
    id: 'interesting-interested',
    title: 'interesting と interested',
    points: ['interesting は「（物事が）おもしろい・興味をひく」。', 'interested は「（人が）興味をもっている」で、be interested in 〜 の形でよく使う。'],
    examples: [
      { en: 'This book is very interesting.', ja: 'この本はとてもおもしろい。' },
      { en: 'I am interested in space.', ja: '私は宇宙に興味がある。' },
    ],
    questions: [
      { sentence: 'The science class was ___.', choices: ['interesting', 'interested'], answer: 0, why: '授業（物事）がおもしろいので interesting。' },
      { sentence: 'My brother is ___ in old cars.', choices: ['interesting', 'interested'], answer: 1, why: '兄（人）が興味をもっているので interested。' },
      { sentence: 'Are you ___ in Japanese history?', choices: ['interesting', 'interested'], answer: 1, why: 'be interested in 〜 で「〜に興味がある」。' },
    ],
  },
  {
    id: 'between-among',
    title: 'between と among',
    points: ['between は「（2つ・2人）の間に」。between A and B の形が多い。', 'among は「（3つ以上・大勢）の中で・間で」。'],
    examples: [
      { en: 'The bank is between the park and the station.', ja: '銀行は公園と駅の間にある。' },
      { en: 'This song is popular among young people.', ja: 'この歌は若い人たちの間で人気がある。' },
    ],
    questions: [
      { sentence: 'I sat ___ Ken and Yumi.', choices: ['between', 'among'], answer: 0, why: 'ケンとユミの2人の間なので between。' },
      { sentence: 'The cat was hiding ___ the flowers.', choices: ['between', 'among'], answer: 1, why: 'たくさんの花の中なので among。' },
      { sentence: 'Let\'s share the cake ___ the two of us.', choices: ['between', 'among'], answer: 0, why: '2人の間なので between。' },
    ],
  },
  {
    id: 'alone-lonely',
    title: 'alone と lonely',
    points: ['alone は「ひとりで」（ほかに人がいない）という状態。気持ちは表さない。', 'lonely は「さびしい」という気持ち。'],
    examples: [
      { en: 'I like to walk alone in the morning.', ja: '私は朝ひとりで歩くのが好きだ。' },
      { en: 'She felt lonely after her friend moved away.', ja: '友だちが引っこしたあと、彼女はさびしく感じた。' },
    ],
    questions: [
      { sentence: 'My grandfather lives ___ in the country.', choices: ['alone', 'lonely'], answer: 0, why: '「ひとりで」暮らしているので alone。' },
      { sentence: 'I was ___ because nobody talked to me.', choices: ['alone', 'lonely'], answer: 1, why: '「さびしい」気持ちなので lonely。' },
      { sentence: 'Can you do your homework ___?', choices: ['alone', 'lonely'], answer: 0, why: '「ひとりで」宿題をするので alone。' },
    ],
  },
  {
    id: 'quite-quiet',
    title: 'quite と quiet',
    points: ['quite（クワイト）は「かなり・とても」。', 'quiet（クワイエット）は「静かな」。つづりがにているので注意。'],
    examples: [
      { en: 'The test was quite easy.', ja: 'テストはかなりやさしかった。' },
      { en: 'Please be quiet in the hospital.', ja: '病院では静かにしてください。' },
    ],
    questions: [
      { sentence: 'The library is very ___.', choices: ['quite', 'quiet'], answer: 1, why: '「静かな」は quiet。' },
      { sentence: 'It was ___ cold this morning.', choices: ['quite', 'quiet'], answer: 0, why: '「かなり」寒いので quite。' },
      { sentence: 'Be ___! The baby is sleeping.', choices: ['quite', 'quiet'], answer: 1, why: '「静かにして」は Be quiet。' },
    ],
  },
  {
    id: 'bored-boring',
    title: 'bored と boring',
    points: ['boring は「（物事が）退屈な・つまらない」。', 'bored は「（人が）退屈している」。interesting / interested と同じ考え方。'],
    examples: [
      { en: 'The speech was boring.', ja: 'そのスピーチは退屈だった。' },
      { en: 'I was bored, so I took a walk.', ja: '退屈だったので散歩した。' },
    ],
    questions: [
      { sentence: 'This game is ___. Let\'s play something else.', choices: ['bored', 'boring'], answer: 1, why: 'ゲーム（物事）がつまらないので boring。' },
      { sentence: 'The children got ___ during the long drive.', choices: ['bored', 'boring'], answer: 0, why: '子ども（人）が退屈したので bored。' },
      { sentence: 'Are you ___? Let\'s go outside.', choices: ['bored', 'boring'], answer: 0, why: 'あなた（人）が退屈しているかなので bored。' },
    ],
  },
  {
    id: 'cook-cooker',
    title: 'cook と cooker',
    points: ['cook は「料理する」のほかに「料理人・コック」という意味もある。', 'cooker は「調理器具（なべ・コンロなど）」。料理する人ではない。'],
    examples: [
      { en: 'My father is a good cook.', ja: '父は料理が上手だ。' },
      { en: 'We bought a new rice cooker.', ja: '新しい炊飯器を買った。' },
    ],
    questions: [
      { sentence: 'She works as a ___ at a hotel.', choices: ['cook', 'cooker'], answer: 0, why: '料理人は cook。' },
      { sentence: 'Put the rice in the rice ___.', choices: ['cook', 'cooker'], answer: 1, why: '炊飯器は rice cooker。' },
      { sentence: 'My grandmother is a great ___.', choices: ['cook', 'cooker'], answer: 0, why: '「料理上手な人」は a great cook。' },
    ],
  },
  {
    id: 'buy-pay',
    title: 'pay と buy',
    points: ['buy は「（物を）買う」。buy ＋物。', 'pay は「（お金を）払う」。pay ＋お金、pay for ＋物 の形で使う。'],
    examples: [
      { en: 'I bought a new pen.', ja: '新しいペンを買った。' },
      { en: 'I paid 200 yen for the pen.', ja: 'そのペンに200円払った。' },
    ],
    questions: [
      { sentence: 'I want to ___ a new bike.', choices: ['buy', 'pay'], answer: 0, why: '自転車（物）を買うので buy。' },
      { sentence: 'How much did you ___ for the ticket?', choices: ['buy', 'pay'], answer: 1, why: 'pay for ＋物で「〜の代金を払う」。' },
      { sentence: 'Can I ___ by card?', choices: ['buy', 'pay'], answer: 1, why: '「カードで払う」は pay by card。' },
    ],
  },
  {
    id: 'kitchen-chicken',
    title: 'kitchen と chicken',
    points: ['kitchen（キッチン）は「台所」。', 'chicken（チキン）は「ニワトリ・とり肉」。つづりも音もにているので注意。'],
    examples: [
      { en: 'My mother is cooking in the kitchen.', ja: '母は台所で料理している。' },
      { en: 'I like fried chicken.', ja: '私はフライドチキンが好きだ。' },
    ],
    questions: [
      { sentence: 'Please wash the dishes in the ___.', choices: ['kitchen', 'chicken'], answer: 0, why: 'お皿を洗うのは台所 kitchen。' },
      { sentence: 'We had ___ curry for dinner.', choices: ['kitchen', 'chicken'], answer: 1, why: 'とり肉のカレーは chicken curry。' },
      { sentence: 'The ___ laid an egg.', choices: ['kitchen', 'chicken'], answer: 1, why: '卵を産んだのはニワトリ chicken。' },
    ],
  },
  {
    id: 'lose-loose',
    title: 'lose と loose',
    points: ['lose（ルーズ、濁る音）は「なくす・負ける」という動詞。', 'loose（ルース、濁らない音）は「ゆるい」という形容詞。'],
    examples: [
      { en: 'Don\'t lose your key.', ja: 'かぎをなくさないでね。' },
      { en: 'These pants are a little loose.', ja: 'このズボンは少しゆるい。' },
    ],
    questions: [
      { sentence: 'I don\'t want to ___ the game.', choices: ['lose', 'loose'], answer: 0, why: '「試合に負ける」は lose。' },
      { sentence: 'My shoes are too ___.', choices: ['lose', 'loose'], answer: 1, why: '「ゆるい」は loose。' },
      { sentence: 'Be careful not to ___ your wallet.', choices: ['lose', 'loose'], answer: 0, why: '「なくす」は lose。' },
    ],
  },
  {
    id: 'hard-hardly',
    title: 'hard と hardly',
    points: ['hard は「一生けんめいに・熱心に」（副詞）や「かたい・難しい」（形容詞）。', 'hardly は「ほとんど〜ない」。意味がまったくちがうので注意。'],
    examples: [
      { en: 'She studies hard every day.', ja: '彼女は毎日一生けんめい勉強する。' },
      { en: 'I could hardly sleep last night.', ja: 'ゆうべはほとんど眠れなかった。' },
    ],
    questions: [
      { sentence: 'The players practiced ___ for the game.', choices: ['hard', 'hardly'], answer: 0, why: '「一生けんめいに」練習したので hard。' },
      { sentence: 'It was so dark that I could ___ see anything.', choices: ['hard', 'hardly'], answer: 1, why: '「ほとんど見えなかった」は hardly。' },
      { sentence: 'This math problem is very ___.', choices: ['hard', 'hardly'], answer: 0, why: '「難しい」は形容詞 hard。' },
    ],
  },
  {
    id: 'late-lately',
    title: 'late と lately',
    points: ['late は「遅く・遅れて」。', 'lately は「最近」（現在完了の文でよく使う）。'],
    examples: [
      { en: 'I got up late this morning.', ja: '今朝は遅く起きた。' },
      { en: 'Have you seen Ken lately?', ja: '最近ケンに会った？' },
    ],
    questions: [
      { sentence: 'Don\'t stay up ___.', choices: ['late', 'lately'], answer: 0, why: '「遅くまで」起きているは late。' },
      { sentence: 'I haven\'t been to the library ___.', choices: ['late', 'lately'], answer: 1, why: '「最近」は lately。' },
      { sentence: 'The bus came ten minutes ___.', choices: ['late', 'lately'], answer: 0, why: '「10分遅れて」来たので late。' },
    ],
  },
  {
    id: 'shade-shadow',
    title: 'shade と shadow',
    points: ['shade は「日かげ」（日光が当たらない場所）。', 'shadow は「影」（物や人の形をした暗い部分）。'],
    examples: [
      { en: 'Let\'s rest in the shade of the tree.', ja: '木の日かげで休もう。' },
      { en: 'My shadow is long in the evening.', ja: '夕方は私の影が長い。' },
    ],
    questions: [
      { sentence: 'It\'s hot. Let\'s sit in the ___.', choices: ['shade', 'shadow'], answer: 0, why: '暑いので「日かげ」にすわる＝ shade。' },
      { sentence: 'The cat was playing with its own ___.', choices: ['shade', 'shadow'], answer: 1, why: '自分の「影」は shadow。' },
      { sentence: 'The ___ of the building fell on the street.', choices: ['shade', 'shadow'], answer: 1, why: '建物の形の「影」は shadow。' },
    ],
  },
  {
    id: 'hear-here',
    title: 'hear と here',
    points: ['hear（聞こえる）と here（ここに）は同じ発音でつづりがちがう。', 'hear は動詞、here は場所を表す副詞。'],
    examples: [
      { en: 'Can you hear the birds?', ja: '鳥の声が聞こえる？' },
      { en: 'Come here, please.', ja: 'ここに来てください。' },
    ],
    questions: [
      { sentence: 'I can\'t ___ you. Please speak louder.', choices: ['hear', 'here'], answer: 0, why: '「聞こえない」は hear。' },
      { sentence: 'Put your bag ___.', choices: ['hear', 'here'], answer: 1, why: '「ここに」置くので here。' },
      { sentence: 'Did you ___ the news?', choices: ['hear', 'here'], answer: 0, why: '「ニュースを聞いた？」は hear。' },
    ],
  },
  {
    id: 'price-prize',
    title: 'price と prize',
    points: ['price は「値段・価格」。', 'prize は「賞・賞品」。つづりが1文字ちがうだけなので注意。'],
    examples: [
      { en: 'The price of this book is 800 yen.', ja: 'この本の値段は800円だ。' },
      { en: 'She won first prize in the contest.', ja: '彼女はコンテストで1等賞をとった。' },
    ],
    questions: [
      { sentence: 'The ___ of vegetables went up.', choices: ['price', 'prize'], answer: 0, why: '野菜の「値段」は price。' },
      { sentence: 'He got a ___ for his painting.', choices: ['price', 'prize'], answer: 1, why: '絵で「賞」をもらったので prize。' },
      { sentence: 'What is the ___ of this bag?', choices: ['price', 'prize'], answer: 0, why: 'かばんの「値段」は price。' },
    ],
  },
  {
    id: 'desert-dessert',
    title: 'desert と dessert',
    points: ['desert（デザート、前を強く）は「砂漠」。', 'dessert（ディザート、後ろを強く）は「デザート（食後のあまいもの）」。s が2つ＝もう1回おかわりしたいデザート、と覚えよう。'],
    examples: [
      { en: 'Camels can live in the desert.', ja: 'ラクダは砂漠で生きられる。' },
      { en: 'We had ice cream for dessert.', ja: 'デザートにアイスクリームを食べた。' },
    ],
    questions: [
      { sentence: 'It hardly rains in the ___.', choices: ['desert', 'dessert'], answer: 0, why: '「砂漠」は desert。' },
      { sentence: 'What would you like for ___?', choices: ['desert', 'dessert'], answer: 1, why: '食後の「デザート」は dessert。' },
      { sentence: 'The Sahara is a large ___.', choices: ['desert', 'dessert'], answer: 0, why: 'サハラは「砂漠」なので desert。' },
    ],
  },
  {
    id: 'affect-effect',
    title: 'affect と effect',
    points: ['affect は「影響を与える」という動詞。', 'effect は「影響・効果」という名詞（have an effect on ～）。'],
    examples: [
      { en: 'The weather affects my mood.', ja: '天気は私の気分に影響する。' },
      { en: 'The medicine had a good effect.', ja: 'その薬はよく効いた。' },
    ],
    questions: [
      { sentence: 'Lack of sleep can ___ your health.', choices: ['affect', 'effect'], answer: 0, why: '動詞「影響を与える」は affect。' },
      { sentence: 'Music has a calming ___ on babies.', choices: ['affect', 'effect'], answer: 1, why: '名詞「効果」は effect。' },
      { sentence: 'The rain did not ___ the game.', choices: ['affect', 'effect'], answer: 0, why: '動詞なので affect。' },
    ],
  },
  {
    id: 'twice-second',
    title: 'twice と second time',
    points: ['twice は「2回」（回数）。', 'the second time は「2回目」（順番）。'],
    examples: [
      { en: 'I have been to Kyoto twice.', ja: '京都には2回行ったことがある。' },
      { en: 'This is my second time in Kyoto.', ja: '京都は今回が2回目だ。' },
    ],
    questions: [
      { sentence: 'I brush my teeth ___ a day.', choices: ['twice', 'the second time'], answer: 0, why: '「1日2回」は回数なので twice。' },
      { sentence: 'This is ___ I have seen this movie.', choices: ['twice', 'the second time'], answer: 1, why: '「2回目」は順番なので the second time。' },
      { sentence: 'She called me ___ yesterday.', choices: ['twice', 'the second time'], answer: 0, why: '「2回」電話したので twice。' },
    ],
  },
  {
    id: 'sleep-asleep',
    title: 'sleep と asleep',
    points: ['sleep は「眠る」（動詞）。', 'asleep は「眠っている」（状態）。be asleep / fall asleep の形で使う。'],
    examples: [
      { en: 'I sleep eight hours every night.', ja: '私は毎晩8時間眠る。' },
      { en: 'The baby is asleep now.', ja: '赤ちゃんは今眠っている。' },
    ],
    questions: [
      { sentence: 'The cat is ___ on the sofa.', choices: ['sleep', 'asleep'], answer: 1, why: 'be ＋ asleep で「眠っている」。' },
      { sentence: 'I couldn\'t ___ last night.', choices: ['sleep', 'asleep'], answer: 0, why: 'could のあとは動詞の原形 sleep。' },
      { sentence: 'He fell ___ during the movie.', choices: ['sleep', 'asleep'], answer: 1, why: 'fall asleep で「眠りこむ」。' },
    ],
  },
  {
    id: 'alive-live',
    title: 'alive と live',
    points: ['alive は「生きている」（状態）。名詞の前には置かず、be alive の形が多い。', 'live（ライブ）は「生きている・生の」で名詞の前に置く（a live fish / live music）。動詞の live（リブ）は「住む・生きる」。'],
    examples: [
      { en: 'The fish is still alive.', ja: 'その魚はまだ生きている。' },
      { en: 'We listened to live music.', ja: '私たちは生演奏を聞いた。' },
    ],
    questions: [
      { sentence: 'Is the bug still ___?', choices: ['alive', 'live'], answer: 0, why: 'be ＋「生きている」は alive。' },
      { sentence: 'The band played ___ music in the park.', choices: ['alive', 'live'], answer: 1, why: '名詞 music の前は live（生の）。' },
      { sentence: 'Plants need water to stay ___.', choices: ['alive', 'live'], answer: 0, why: 'stay alive で「生きたままでいる」。' },
    ],
  },
  {
    id: 'close-closed',
    title: 'close と closed',
    points: ['close は「閉める」（動詞）や「近い」（形容詞、クロース）。', 'closed は「閉まっている」（状態）。お店の「準備中・閉店」も closed。'],
    examples: [
      { en: 'Please close the door.', ja: 'ドアを閉めてください。' },
      { en: 'The shop is closed on Mondays.', ja: 'その店は月曜日は閉まっている。' },
    ],
    questions: [
      { sentence: 'The museum is ___ today.', choices: ['close', 'closed'], answer: 1, why: '「閉まっている」状態は closed。' },
      { sentence: 'Can you ___ the window?', choices: ['close', 'closed'], answer: 0, why: '「閉める」動作は close。' },
      { sentence: 'My house is ___ to the station.', choices: ['close', 'closed'], answer: 0, why: '「近い」は close（クロース）。' },
    ],
  },
  {
    id: 'sound-soundlike',
    title: 'sound と sound like',
    points: ['sound ＋形容詞で「〜に聞こえる・思える」（That sounds fun.）。', 'sound like ＋名詞で「〜のように聞こえる・思える」（That sounds like a good idea.）。'],
    examples: [
      { en: 'That sounds great!', ja: 'それはすてきだね！' },
      { en: 'That sounds like a plan.', ja: 'それはいい計画だね。' },
    ],
    questions: [
      { sentence: 'Your idea sounds ___.', choices: ['interesting', 'like interesting'], answer: 0, why: 'sound ＋形容詞なので interesting。' },
      { sentence: 'That sounds ___ a lot of fun.', choices: ['like', 'as'], answer: 0, why: 'sound like ＋名詞。' },
      { sentence: 'It sounds ___ rain outside.', choices: ['like', 'to'], answer: 0, why: '「雨のような音」は sounds like rain。' },
    ],
  },
  {
    id: 'which-what',
    title: 'what と which',
    points: ['what は「何」（選ぶものが決まっていないとき）。', 'which は「どちら・どれ」（決まった中から選ぶとき）。'],
    examples: [
      { en: 'What do you want for your birthday?', ja: '誕生日に何がほしい？' },
      { en: 'Which do you like, cats or dogs?', ja: 'ネコとイヌ、どちらが好き？' },
    ],
    questions: [
      { sentence: '___ is your favorite food?', choices: ['What', 'Which'], answer: 0, why: '決まっていない中からなので What。' },
      { sentence: '___ bag is yours, the red one or the blue one?', choices: ['What', 'Which'], answer: 1, why: '2つの中から選ぶので Which。' },
      { sentence: '___ season do you like better, summer or winter?', choices: ['What', 'Which'], answer: 1, why: '夏か冬かを選ぶので Which。' },
    ],
  },
  {
    id: 'other-others',
    title: 'other と others',
    points: ['other は名詞の前に置く（other people / other books）。', 'others は「ほかの人たち・ほかのもの」と名詞なしで使う。'],
    examples: [
      { en: 'Some students walk, and others take the bus.', ja: '歩く生徒もいれば、バスに乗る生徒もいる。' },
      { en: 'Do you have other colors?', ja: 'ほかの色はありますか。' },
    ],
    questions: [
      { sentence: 'Be kind to ___.', choices: ['other', 'others'], answer: 1, why: '名詞なしで「ほかの人たち」は others。' },
      { sentence: 'I visited ___ cities in Europe.', choices: ['other', 'others'], answer: 0, why: '名詞 cities の前なので other。' },
      { sentence: 'Some like tea, and ___ like coffee.', choices: ['other', 'others'], answer: 1, why: 'Some ～, others … で「〜な人もいれば…な人もいる」。' },
    ],
  },
  {
    id: 'last-latest',
    title: 'last と latest',
    points: ['last は「最後の・この前の」（last week / the last train）。', 'latest は「最新の」（the latest news）。'],
    examples: [
      { en: 'This is the last train tonight.', ja: 'これが今夜の最終電車だ。' },
      { en: 'Have you seen the latest movie?', ja: '最新の映画を見た？' },
    ],
    questions: [
      { sentence: 'I want the ___ model of this phone.', choices: ['last', 'latest'], answer: 1, why: '「最新の」は latest。' },
      { sentence: 'We went to the beach ___ summer.', choices: ['last', 'latest'], answer: 0, why: '「この前の夏」は last summer。' },
      { sentence: 'Did you hear the ___ news?', choices: ['last', 'latest'], answer: 1, why: '「最新の」ニュースは latest。' },
    ],
  },
]

// 単語id（例：borrow）が出てくる「まちがえやすい単語」の単元
export function confusingFor(id: string): GrammarUnit | undefined {
  return CONFUSING.find((u) => u.id.split('-').includes(id))
}
