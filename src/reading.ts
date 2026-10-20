// 読解ミニ：オリジナルの短い英文と、内容の3択問題
export type ReadingQ = { q: string; choices: string[]; answer: number }
export type Passage = { id: string; title: string; text: string; ja: string; questions: ReadingQ[] }

export const PASSAGES: Passage[] = [
  {
    id: 'cat',
    title: 'Momo the Cat',
    text: 'I have a cat. Her name is Momo. She is white and very small. Momo likes to sleep by the window. Every morning, she wakes me up at six.',
    ja: '私はねこを飼っています。名前はモモです。白くてとても小さいです。モモは窓のそばで寝るのが好きです。毎朝6時に私を起こします。',
    questions: [
      { q: 'モモは何色？', choices: ['白', '黒', '茶色'], answer: 0 },
      { q: 'モモはどこで寝るのが好き？', choices: ['ベッドの上', '窓のそば', '台所'], answer: 1 },
      { q: 'モモは毎朝何時に起こす？', choices: ['5時', '6時', '7時'], answer: 1 },
    ],
  },
  {
    id: 'festival',
    title: 'The School Festival',
    text: 'Our school festival was last Saturday. My class made a small cafe. We sold cookies and juice. Many people came, and all the cookies were gone by noon.',
    ja: '私たちの文化祭はこの前の土曜日でした。私のクラスは小さなカフェを開きました。クッキーとジュースを売りました。たくさんの人が来て、お昼までにクッキーは全部なくなりました。',
    questions: [
      { q: '文化祭はいつだった？', choices: ['この前の土曜日', 'この前の日曜日', '明日'], answer: 0 },
      { q: 'クラスで何をした？', choices: ['劇', 'カフェ', 'ダンス'], answer: 1 },
      { q: 'クッキーはどうなった？', choices: ['たくさん残った', '売らなかった', 'お昼までに全部なくなった'], answer: 2 },
    ],
  },
  {
    id: 'rain',
    title: 'A Rainy Day',
    text: 'It was raining this morning. I forgot my umbrella, so I waited at the station. Then my friend Ken came with a big umbrella. We walked to school together.',
    ja: '今朝は雨が降っていました。私はかさを忘れたので、駅で待っていました。すると友だちのケンが大きなかさを持って来ました。私たちはいっしょに歩いて学校へ行きました。',
    questions: [
      { q: '「私」はなぜ駅で待っていた？', choices: ['電車がおくれたから', 'かさを忘れたから', 'ケンと約束したから'], answer: 1 },
      { q: 'ケンは何を持って来た？', choices: ['大きなかさ', 'タオル', '自転車'], answer: 0 },
      { q: '2人はどうやって学校へ行った？', choices: ['バスで', '歩いて', '走って'], answer: 1 },
    ],
  },
  {
    id: 'grandma',
    title: "Grandma's Garden",
    text: 'My grandmother lives in the country. She has a big garden. She grows tomatoes, potatoes, and flowers. In summer, I help her in the garden. Her tomatoes are the best!',
    ja: '祖母はいなかに住んでいます。大きな庭（畑）があります。トマトやじゃがいも、花を育てています。夏には私も庭の手伝いをします。祖母のトマトは最高です！',
    questions: [
      { q: '祖母はどこに住んでいる？', choices: ['都会', 'いなか', '海の近く'], answer: 1 },
      { q: '祖母が育てていないものは？', choices: ['トマト', 'じゃがいも', 'いちご'], answer: 2 },
      { q: '「私」はいつ手伝う？', choices: ['春', '夏', '冬'], answer: 1 },
    ],
  },
  {
    id: 'robot',
    title: 'A Helpful Robot',
    text: 'There is a new robot at the library. It can find books for you. You just say the title, and the robot goes to the shelf. Children love it, but it cannot climb stairs.',
    ja: '図書館に新しいロボットがいます。本をさがしてくれます。題名を言うだけで、ロボットが本だなへ行きます。子どもたちに大人気ですが、階段はのぼれません。',
    questions: [
      { q: 'ロボットはどこにいる？', choices: ['学校', '図書館', '駅'], answer: 1 },
      { q: 'ロボットに何を言えばいい？', choices: ['本の題名', '自分の名前', '電話番号'], answer: 0 },
      { q: 'ロボットができないことは？', choices: ['本をさがす', '本だなへ行く', '階段をのぼる'], answer: 2 },
    ],
  },
  {
    id: 'dream',
    title: 'My Dream',
    text: 'I want to be a vet in the future. A vet is a doctor for animals. I love dogs and cats, and I want to help sick animals. So I am studying science hard now.',
    ja: '私は将来、獣医になりたいです。獣医は動物のお医者さんです。犬やねこが大好きで、病気の動物を助けたいです。だから今、理科を一生けんめい勉強しています。',
    questions: [
      { q: '「私」の夢は？', choices: ['獣医', '先生', 'パイロット'], answer: 0 },
      { q: 'なぜその仕事をしたい？', choices: ['お金持ちになりたいから', '病気の動物を助けたいから', '旅行したいから'], answer: 1 },
      { q: '今、何を一生けんめい勉強している？', choices: ['数学', '英語', '理科'], answer: 2 },
    ],
  },
]
