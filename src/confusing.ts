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
]
