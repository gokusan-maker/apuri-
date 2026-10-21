// 長文読解（私立高校入試の形式）：200語前後の長文＋空所補充（前置詞・語句の記号選択）＋内容一致（○×）
// 本文・問題・解説はすべて自作。空所は本文中で「( A )」のように書く
export type Blank = { id: string; choices: string[]; answer: number; why: string }
export type TrueFalse = { statement: string; answer: boolean; why: string }
export type PickTwo = { statements: string[]; answers: [number, number]; why: string } // 本文と合うものを2つ選ぶ（ア〜カ）
export type LongPassage = { id: string; title: string; level: string; paragraphs: string[]; ja: string[]; blanks: Blank[]; tf: TrueFalse[]; pick2?: PickTwo }

export const MARKS = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ']

export const LONG_PASSAGES: LongPassage[] = [
  {
    id: 'library-cat',
    title: 'The Library Cat',
    level: '中2〜中3',
    paragraphs: [
      'There is a small library ( A ) the station in my town. For more than five years, a gray cat named Pepper has lived there. Nobody knows ( B ) she came from. One rainy morning, the librarian found her sleeping ( C ) a pile of old newspapers, and she has stayed ever since.',
      'Pepper has become very popular. Many children visit the library just to see her. While they are waiting ( D ) her to wake up, they often pick up a book and start reading. The librarian says that the number of young visitors has doubled since Pepper came.',
      'However, not everyone was happy at first. Some people were worried that the cat would damage the books. So the library made a rule: Pepper is not allowed to enter the room ( E ) the oldest books are kept. Now both the cat and the books are safe, and the library is busier than ever.',
    ],
    ja: [
      '私の町には、駅の近くに小さな図書館があります。5年以上前から、ペッパーという名前の灰色のねこがそこに住んでいます。彼女がどこから来たのかはだれも知りません。ある雨の朝、司書さんが古新聞の山の上で眠っている彼女を見つけ、それ以来ずっといるのです。',
      'ペッパーはとても人気者になりました。たくさんの子どもたちが彼女に会うためだけに図書館に来ます。彼女が起きるのを待っている間に、子どもたちはよく本を手に取って読みはじめます。司書さんは、ペッパーが来てから若い来館者の数が2倍になったと言います。',
      'しかし、はじめはみんなが喜んでいたわけではありません。ねこが本をいためてしまうのではと心配する人もいました。そこで図書館はきまりを作りました。ペッパーは、いちばん古い本が保管されている部屋には入ってはいけないのです。今ではねこも本も安全で、図書館はかつてないほどにぎわっています。',
    ],
    blanks: [
      { id: 'A', choices: ['near', 'of', 'to', 'with'], answer: 0, why: '「駅の近くに」は near the station。' },
      { id: 'B', choices: ['what', 'where', 'who', 'which'], answer: 1, why: '「どこから来たのか」なので where（間接疑問）。' },
      { id: 'C', choices: ['for', 'from', 'on', 'to'], answer: 2, why: '「古新聞の山の上で」なので on。' },
      { id: 'D', choices: ['at', 'for', 'in', 'of'], answer: 1, why: 'wait for 人 to 〜 で「人が〜するのを待つ」。' },
      { id: 'E', choices: ['what', 'when', 'where', 'who'], answer: 2, why: 'the room（場所）を説明する関係副詞 where。' },
    ],
    pick2: {
      statements: [
        'Pepper came to the library with the librarian.',
        'The librarian found Pepper on a rainy morning.',
        'Children often start reading books while they wait for Pepper.',
        'The library has fewer visitors now than before.',
        'Pepper damaged many of the oldest books.',
        'Everyone was happy about Pepper from the beginning.',
      ],
      answers: [1, 2],
      why: 'イは第1段落、ウは第2段落の内容と合う。アはどこから来たかだれも知らない、エは来館者が増えた、オは心配されただけ、カははじめは心配する人もいた。',
    },
    tf: [
      { statement: 'Pepper has lived in the library for more than five years.', answer: true, why: '第1段落に「5年以上前からそこに住んでいる」とある。' },
      { statement: 'The librarian brought Pepper from her own house.', answer: false, why: 'どこから来たかはだれも知らず、雨の朝に図書館で見つかった。' },
      { statement: 'Some children come to the library only to see Pepper.', answer: true, why: '第2段落に just to see her（彼女に会うためだけに）とある。' },
      { statement: 'There are fewer young visitors now than before Pepper came.', answer: false, why: '若い来館者は2倍になった。' },
      { statement: 'Pepper can go into every room in the library.', answer: false, why: 'いちばん古い本の部屋には入ってはいけない。' },
    ],
  },
  {
    id: 'no-phone-trip',
    title: 'A Trip Without Phones',
    level: '中3',
    paragraphs: [
      'Last summer, my family decided to take a trip ( A ) using our smartphones. My father said, "Let\'s put our phones in a box ( B ) three days." At first, my sister and I didn\'t like the idea.',
      'On the first day, we got lost because we could not check the map on our phones. We had to ask an old man ( C ) help. He was very kind and even told us about a beautiful waterfall ( D ) only local people know.',
      'On the second day, we visited the waterfall. Instead of taking pictures, I drew it in my notebook. It took a long time, but I still remember every color of the water.',
      'When we got home, I opened the box and looked at my phone. There were many messages, but none of them were important. I learned that I do not have to check my phone all the time. Now I sometimes leave it at home ( E ) I go for a walk.',
    ],
    ja: [
      '去年の夏、私の家族はスマートフォンを使わずに旅行をすることにしました。父は「3日間、スマホを箱に入れておこう」と言いました。はじめ、姉と私はその考えが気に入りませんでした。',
      '1日目、スマホで地図を確かめられなかったので、私たちは道に迷いました。おじいさんに助けを求めなければなりませんでした。彼はとても親切で、地元の人しか知らない美しい滝のことまで教えてくれました。',
      '2日目、私たちはその滝を訪れました。写真をとるかわりに、私はノートに滝の絵をかきました。時間はかかりましたが、今でも水のひとつひとつの色をおぼえています。',
      '家に帰ってから、私は箱を開けてスマホを見ました。メッセージはたくさん来ていましたが、大事なものはひとつもありませんでした。いつもスマホを確認しなくてもいいのだとわかりました。今では散歩に行くとき、ときどき家に置いていきます。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'into', 'with', 'without'], answer: 3, why: '「スマホを使わずに」なので without ＋ 〜ing。' },
      { id: 'B', choices: ['during', 'for', 'since', 'until'], answer: 1, why: '「3日間」のように期間の長さは for。during は during the trip のように使う。' },
      { id: 'C', choices: ['at', 'for', 'of', 'to'], answer: 1, why: 'ask 人 for help で「人に助けを求める」。' },
      { id: 'D', choices: ['that', 'what', 'where', 'who'], answer: 0, why: 'know の目的語が欠けているので、関係代名詞 that（which も可）。where は使えない。' },
      { id: 'E', choices: ['because', 'but', 'so', 'when'], answer: 3, why: '「散歩に行くとき」なので when。' },
    ],
    tf: [
      { statement: "At first, the writer's sister liked her father's idea.", answer: false, why: '姉と私は、はじめその考えが気に入らなかった。' },
      { statement: 'The family got lost because they could not use the map on their phones.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'An old man told the family about a waterfall.', answer: true, why: '親切なおじいさんが美しい滝のことを教えてくれた。' },
      { statement: 'The writer took a lot of pictures of the waterfall.', answer: false, why: '写真のかわりにノートに絵をかいた。' },
      { statement: 'After the trip, the writer found many important messages.', answer: false, why: 'メッセージは多かったが、大事なものはなかった。' },
    ],
  },
  {
    id: 'community-garden',
    title: 'The Garden Between the Buildings',
    level: '中3〜高校入試',
    paragraphs: [
      'In our neighborhood, there was an empty space ( A ) two tall buildings. For a long time, people threw garbage there, and nobody wanted to walk ( B ) it at night.',
      'Three years ago, Ms. Tanaka, a woman who lives in one of the buildings, had an idea. She asked her neighbors to help her make a garden. At first, only four people came. They picked up the garbage and planted some tomatoes and flowers.',
      'Soon, other people became interested ( C ) the garden. Children came after school to give water to the plants, and older people taught them how to grow vegetables. Now more than thirty people take care of the garden together.',
      'Every autumn, they hold a small festival and share the vegetables they have grown. Ms. Tanaka says, "The garden gave us more than vegetables. It gave us a chance ( D ) talk with each other." Many people in the neighborhood agree ( E ) her.',
    ],
    ja: [
      '私たちの近所には、2つの高いビルの間に空き地がありました。長い間、人々はそこにごみを捨て、夜にそのそばを歩きたがる人はいませんでした。',
      '3年前、ビルの1つに住む田中さんという女性が、あることを思いつきました。近所の人たちに、庭づくりを手伝ってほしいとたのんだのです。はじめは4人しか来ませんでした。彼らはごみを拾い、トマトや花を植えました。',
      'まもなく、ほかの人たちもその庭に興味を持つようになりました。子どもたちは放課後に植物に水をやりに来て、お年寄りは子どもたちに野菜の育て方を教えました。今では30人以上がいっしょに庭の世話をしています。',
      '毎年秋には小さなお祭りを開き、育てた野菜を分け合います。田中さんは「この庭は野菜以上のものをくれました。おたがいに話すきっかけをくれたのです」と言います。近所の多くの人が彼女の言葉に賛成しています。',
    ],
    blanks: [
      { id: 'A', choices: ['among', 'between', 'over', 'under'], answer: 1, why: '「2つのものの間」は between。3つ以上の間は among。' },
      { id: 'B', choices: ['about', 'into', 'past', 'with'], answer: 2, why: 'walk past 〜 で「〜のそばを通り過ぎる」。' },
      { id: 'C', choices: ['at', 'for', 'in', 'with'], answer: 2, why: 'be / become interested in 〜 で「〜に興味がある（を持つ）」。' },
      { id: 'D', choices: ['for', 'of', 'to', 'with'], answer: 2, why: 'a chance to ＋動詞の原形で「〜する機会」（不定詞の形容詞的用法）。' },
      { id: 'E', choices: ['at', 'on', 'to', 'with'], answer: 3, why: '「人（の意見）に賛成する」は agree with 人。' },
    ],
    tf: [
      { statement: 'The empty space was clean and safe before the garden was made.', answer: false, why: 'ごみが捨てられ、夜はだれも近くを歩きたがらなかった。' },
      { statement: 'Ms. Tanaka lives in one of the tall buildings.', answer: true, why: 'a woman who lives in one of the buildings とある。' },
      { statement: 'Only four people came to help at first.', answer: true, why: 'At first, only four people came. とある。' },
      { statement: 'Children taught older people how to grow vegetables.', answer: false, why: '教えたのはお年寄りで、教わったのが子どもたち。' },
      { statement: 'They share their vegetables at a festival every spring.', answer: false, why: 'お祭りは毎年秋。' },
    ],
  },
  {
    id: 'honeybees',
    title: 'Little Helpers: Honeybees',
    level: '中3（説明文）',
    paragraphs: [
      'Honeybees are small, but they are very important ( A ) our lives. When they fly from flower to flower, they carry pollen. This helps many plants produce fruit and seeds. In fact, about one third of the food we eat depends ( B ) insects like bees.',
      'Bees also have an interesting way of sharing information. When a bee finds a good place ( C ) a lot of flowers, it goes back to the hive and does a special "dance." The direction and speed of the dance tell the other bees where the flowers are.',
      'Sadly, the number of bees is getting smaller in many parts of the world. Some scientists think this is ( D ) of chemicals used on farms. Others say that changes in the weather are also a problem.',
      'We can help bees in simple ways. For example, we can grow flowers on our balconies or in our gardens. If more people do this, bees will have more places ( E ) find food.',
    ],
    ja: [
      'ミツバチは小さいですが、私たちの生活にとってとても大切です。花から花へと飛ぶとき、ミツバチは花粉を運びます。これによって多くの植物が実や種をつけられるのです。実は、私たちが食べる食べ物のおよそ3分の1は、ミツバチのような昆虫にたよっています。',
      'ミツバチには、情報を伝え合うおもしろい方法もあります。花がたくさんあるよい場所を見つけると、ミツバチは巣にもどって特別な「ダンス」をします。ダンスの向きと速さで、ほかのハチたちに花がどこにあるかを伝えるのです。',
      '悲しいことに、世界の多くの地域でミツバチの数が減ってきています。農場で使われる薬品のせいだと考える科学者もいます。天気の変化も問題だと言う人もいます。',
      '私たちはかんたんな方法でミツバチを助けることができます。たとえば、ベランダや庭で花を育てることです。もっと多くの人がこうすれば、ミツバチは食べ物を見つけられる場所がふえるでしょう。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'from', 'to'], answer: 3, why: 'be important to 〜 で「〜にとって大切だ」。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 2, why: 'depend on 〜 で「〜にたよる」。' },
      { id: 'C', choices: ['at', 'by', 'of', 'with'], answer: 3, why: '「花がたくさんある場所」は a place with a lot of flowers（with ＝〜がある）。' },
      { id: 'D', choices: ['because', 'in front', 'instead', 'out'], answer: 0, why: 'because of 〜 で「〜のせいで・〜が原因で」。' },
      { id: 'E', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'places to find food で「食べ物を見つける（ための）場所」（不定詞の形容詞的用法）。' },
    ],
    pick2: {
      statements: [
        'Bees carry pollen when they fly from flower to flower.',
        'Bees tell each other about flowers by singing.',
        'The number of bees is growing all over the world.',
        'Some scientists think chemicals used on farms are a problem for bees.',
        'The writer says that we should buy more honey.',
        'Bees do not need flowers to find food.',
      ],
      answers: [0, 3],
      why: 'アは第1段落、エは第3段落の内容と合う。イは歌ではなくダンス、ウは数が減っている、オは花を育てようと言っている、カは花で食べ物を見つける。',
    },
    tf: [
      { statement: 'Bees help many plants make fruit and seeds.', answer: true, why: '第1段落に「多くの植物が実や種をつけるのを助ける」とある。' },
      { statement: 'All of the food we eat depends on insects.', answer: false, why: 'たよっているのは「およそ3分の1」。' },
      { statement: 'A bee dances to tell other bees where flowers are.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Every scientist agrees that chemicals are the only problem for bees.', answer: false, why: '天気の変化も問題だと言う人もいる。' },
      { statement: 'The writer says that growing flowers can help bees.', answer: true, why: '第4段落で、花を育てることをすすめている。' },
    ],
  },
  {
    id: 'last-match',
    title: 'The Last Pass',
    level: '中3（物語）',
    paragraphs: [
      'Yuta was the shortest player on his basketball team. He practiced harder than anyone else, but he was rarely chosen ( A ) the games.',
      'Before the last match of the year, the coach said, "Yuta, you will start today." Yuta could not believe his ears. He was so nervous that he could not eat lunch.',
      'The match was close. With ten seconds left, Yuta\'s team was losing ( B ) one point. Yuta got the ball, but a tall player stood in front ( C ) him. Instead of shooting, he passed the ball to his friend Ken. Ken scored, and the team won.',
      'After the game, a reporter asked Yuta, "Why didn\'t you shoot?" Yuta smiled and answered, "Ken was in a better position. Winning ( D ) a team is more important than scoring by myself." The coach was proud of him. He said that he had chosen Yuta ( E ) of his hard work and his kindness to others.',
    ],
    ja: [
      'ユウタはバスケットボール部でいちばん背の低い選手でした。だれよりも一生けんめい練習しましたが、試合に選ばれることはめったにありませんでした。',
      'その年の最後の試合の前、コーチは「ユウタ、今日は先発だ」と言いました。ユウタは自分の耳が信じられませんでした。あまりに緊張して、お昼ごはんが食べられませんでした。',
      '試合は接戦でした。残り10秒で、ユウタのチームは1点差で負けていました。ユウタはボールを取りましたが、背の高い選手が目の前に立ちはだかりました。シュートするかわりに、彼は友だちのケンにパスしました。ケンが得点し、チームは勝ちました。',
      '試合のあと、記者がユウタに「どうしてシュートしなかったの？」とたずねました。ユウタはほほえんで答えました。「ケンのほうがいい位置にいたんです。自分ひとりで点をとるより、チームとして勝つことのほうが大切です」。コーチは彼をほこりに思いました。ユウタを選んだのは、彼の努力とほかの人へのやさしさのためだと言いました。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'for', 'on', 'with'], answer: 1, why: 'be chosen for 〜 で「〜に（出る選手として）選ばれる」。' },
      { id: 'B', choices: ['by', 'for', 'in', 'with'], answer: 0, why: '差を表す by。losing by one point で「1点差で負けている」。' },
      { id: 'C', choices: ['at', 'of', 'on', 'to'], answer: 1, why: 'in front of 〜 で「〜の前に」。' },
      { id: 'D', choices: ['as', 'at', 'from', 'to'], answer: 0, why: 'as a team で「チームとして」（as ＝〜として）。' },
      { id: 'E', choices: ['because', 'in spite', 'instead', 'out'], answer: 0, why: 'because of 〜 で「〜のために・〜が理由で」。努力ややさしさが選んだ理由。' },
    ],
    tf: [
      { statement: 'Yuta was the tallest player on the team.', answer: false, why: 'いちばん背が低い（shortest）選手だった。' },
      { statement: 'Yuta was too nervous to eat lunch before the match.', answer: true, why: 'so nervous that he could not eat lunch とある。' },
      { statement: 'Yuta scored the last point of the game.', answer: false, why: '最後に得点したのはケン。' },
      { statement: "Yuta's team won the last match.", answer: true, why: 'Ken scored, and the team won. とある。' },
      { statement: 'The coach chose Yuta only because he was a good shooter.', answer: false, why: '理由は努力とほかの人へのやさしさ。' },
    ],
  },
  {
    id: 'speech-volunteer',
    title: 'My Saturdays with Mrs. Sato (Speech)',
    level: '中3（スピーチ）',
    paragraphs: [
      'Hello, everyone. Today I\'d like to talk ( A ) my experience as a volunteer at a home for elderly people.',
      'Last spring, I visited the home every Saturday ( B ) three months. At first, I didn\'t know what to say to the people there. I was afraid of making mistakes. But one woman, Mrs. Sato, always welcomed me with a big smile. She told me stories about her childhood and taught me ( C ) to fold paper cranes.',
      'One day, she said, "Your visits are the most enjoyable part of my week." I was surprised to hear that. I had thought that I was not ( D ) any help, but just being there and listening was important.',
      'Through this experience, I learned that we can make someone happy without doing anything special. I want to keep visiting the home, and I hope some of you will join me. Thank you ( E ) listening.',
    ],
    ja: [
      'みなさん、こんにちは。今日は、お年寄りのための施設でボランティアをした経験についてお話ししたいと思います。',
      '去年の春、私は3か月間、毎週土曜日にその施設を訪れました。はじめは、そこにいる人たちに何を話せばよいかわかりませんでした。まちがえるのがこわかったのです。でも、佐藤さんという女性が、いつも満面の笑みでむかえてくれました。彼女は子どものころの話をしてくれたり、折り鶴の折り方を教えてくれたりしました。',
      'ある日、彼女は「あなたが来てくれるのが、1週間でいちばん楽しい時間なのよ」と言いました。私はそれを聞いておどろきました。自分は何の役にも立っていないと思っていましたが、ただそこにいて話を聞くことが大切だったのです。',
      'この経験を通して、特別なことをしなくても人を幸せにできるのだと学びました。私はこれからも施設を訪れたいと思っていますし、みなさんの中から何人かいっしょに来てくれるとうれしいです。ご清聴ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['about', 'for', 'in', 'to'], answer: 0, why: 'talk about 〜 で「〜について話す」。' },
      { id: 'B', choices: ['for', 'in', 'since', 'until'], answer: 0, why: '「3か月間」のように期間の長さは for。' },
      { id: 'C', choices: ['how', 'what', 'when', 'which'], answer: 0, why: 'how to ＋動詞の原形で「〜のしかた」。fold の目的語 paper cranes があるので what は入らない。' },
      { id: 'D', choices: ['in', 'of', 'to', 'with'], answer: 1, why: 'be of help で「役に立つ」（of ＋名詞＝形容詞のはたらき）。' },
      { id: 'E', choices: ['at', 'for', 'to', 'with'], answer: 1, why: 'Thank you for 〜ing で「〜してくれてありがとう」。' },
    ],
    tf: [
      { statement: 'The speaker visited the home every Saturday for three months.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'At first, the speaker was nervous about talking with the people there.', answer: true, why: '何を話せばよいかわからず、まちがえるのがこわかった。' },
      { statement: 'Mrs. Sato taught the speaker how to cook.', answer: false, why: '教えてくれたのは折り鶴の折り方。' },
      { statement: "Mrs. Sato said that the speaker's visits were boring.", answer: false, why: '1週間でいちばん楽しい時間だと言った。' },
      { statement: 'The speaker wants to stop visiting the home.', answer: false, why: 'これからも訪れたいと言っている。' },
    ],
  },
]

export const XP_LONG_ITEM = 5 // 1問正解ごと

// 採点：空所と内容一致の正解数
export function scoreLong(p: LongPassage, blanks: Record<string, number>, tf: Record<number, boolean>, picks: number[] = []): { score: number; total: number } {
  const b = p.blanks.filter((x) => blanks[x.id] === x.answer).length
  const t = p.tf.filter((x, i) => tf[i] === x.answer).length
  const k = p.pick2 ? picks.filter((i) => p.pick2!.answers.includes(i)).length : 0
  return { score: b + t + k, total: p.blanks.length + p.tf.length + (p.pick2 ? 2 : 0) }
}

export type LongRecord = Record<string, number> // 長文id → 最高点
const KEY = 'eitan:long-reading'

export function loadLongRecord(): LongRecord {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '{}') as unknown
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([, n]) => typeof n === 'number')) as LongRecord
  } catch {
    return {}
  }
}

export function saveLongRecord(r: LongRecord): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(r))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
