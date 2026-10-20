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
]
