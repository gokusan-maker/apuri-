// 長文読解（私立高校入試の形式）：200語前後の長文＋空所補充（前置詞・語句の記号選択）＋内容一致（○×）
// 本文・問題・解説はすべて自作。空所は本文中で「( A )」のように書く
export type Blank = { id: string; choices: string[]; answer: number; why: string }
export type TrueFalse = { statement: string; answer: boolean; why: string }
export type PickTwo = { statements: string[]; answers: [number, number]; why: string } // 本文と合うものを2つ選ぶ（ア〜カ）
export type Underline = { phrase: string; choices: string[]; answer: number; why: string } // 下線部の意味に近いもの
export type Ordering = { words: string[]; rest: string; answer: string; ja: string } // 語句整序：words を並べて answer に（rest は後ろに続く語）
export type SentenceBlank = { id: string; choices: string[]; answer: number; why: string } // 会話文の [ 1 ] に入る文
export type TitleQ = { choices: string[]; answer: number; why: string } // 本文全体に合うタイトル（このときは一覧や見出しにタイトルを出さない）
export type Gist = { para: number; choices: string[]; answer: number; why: string } // 段落の要旨（見出し）：para は0から
export type Refer = { phrase: string; word: string; choices: string[]; answer: number; why: string } // 指示語：phrase の中の word が指すもの
// 文を入れる位置：ぬけている1文が入る場所を、段落のあとの［ア］〜［エ］から選ぶ（after は段落の番号）
// 要約文の完成：本文をまとめた英文の ( 1 ) ( 2 ) … に入る語を選ぶ
// 語句の意味：本文中の語の意味を前後から推測して選ぶ
// 出来事の順番：ア〜エ の出来事を起きた順に並べる（answer は起きた順の番号の並び）
export type SeqQ = { events: string[]; answer: number[]; why: string }
export type VocabQ = { word: string; choices: string[]; answer: number; why: string }
export type SummaryQ = { text: string; blanks: { choices: string[]; answer: number; why: string }[] }
export type InsertQ = { sentence: string; after: number[]; answer: number; why: string }
export type EnglishQA = { q: string; choices: string[]; answer: number; why: string } // 英問英答（complete では q が文の前半）
export type LongPassage = { id: string; title: string; level: string; paragraphs: string[]; ja: string[]; blanks: Blank[]; tf: TrueFalse[]; pick2?: PickTwo; underline?: Underline; order?: Ordering; sentences?: SentenceBlank[]; qa?: EnglishQA[]; table?: string[][]; refer?: Refer; gist?: Gist[]; titleQ?: TitleQ; complete?: EnglishQA[]; insert?: InsertQ; summary?: SummaryQ; vocab?: VocabQ[]; seq?: SeqQ }

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
    qa: [
      { q: 'Why do many children visit the library?', choices: ['To buy new books.', 'To see Pepper.', 'To meet the librarian.', 'To read old newspapers.'], answer: 1, why: 'Many children visit the library just to see her. とある。' },
      { q: 'What rule did the library make?', choices: ['Pepper must stay outside.', 'Children cannot touch Pepper.', 'Pepper cannot enter the room with the oldest books.', 'Visitors must bring food for Pepper.'], answer: 2, why: '第3段落に、いちばん古い本の部屋には入れないというきまりがある。' },
    ],
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
    underline: {
      phrase: 'none of them were important',
      choices: ['all the messages were important', 'no message was important', 'some of the messages were important', 'the messages were from his friends'],
      answer: 1,
      why: 'none of 〜 は「〜のどれも…ない」。「大事なメッセージはひとつもなかった」の意味。',
    },
    order: {
      words: ['phone', 'I', 'not', 'check', 'to', 'do', 'my', 'have'],
      rest: 'all the time.',
      answer: 'I do not have to check my phone',
      ja: '私はいつもスマホを確認しなくてもいい。（don\'t have to ＝〜しなくてもよい）',
    },
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
    underline: {
      phrase: 'take care of',
      choices: ['look after', 'sell', 'stay away from', 'draw pictures of'],
      answer: 0,
      why: 'take care of 〜 は「〜の世話をする」。同じ意味は look after 〜。',
    },
    order: {
      words: ['how', 'grow', 'them', 'to', 'taught'],
      rest: 'vegetables.',
      answer: 'taught them how to grow',
      ja: '（お年寄りは）子どもたちに野菜の育て方を教えた。（teach 人 how to 〜）',
    },
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
    refer: {
      phrase: 'This helps many plants',
      word: 'This',
      choices: ['bees carrying pollen from flower to flower', 'the food we eat', 'a special dance', 'chemicals used on farms'],
      answer: 0,
      why: 'This は直前の文「花から花へ飛ぶとき花粉を運ぶ」ことを指す。',
    },
    gist: [
      { para: 1, choices: ['ミツバチが情報を伝え合う方法', 'ミツバチが減っている理由', '私たちにできること', 'ミツバチが運ぶ花粉'], answer: 0, why: '第2段落はダンスで花の場所を伝える話。' },
      { para: 2, choices: ['ダンスのしくみ', 'ミツバチが減っていることとその原因', '花の育て方', 'ハチミツの作り方'], answer: 1, why: '第3段落はミツバチの数が減っていることと、考えられる原因の話。' },
    ],
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
  {
    id: 'plastic-ocean',
    title: 'Plastic in the Ocean',
    level: '高校入試（環境）',
    paragraphs: [
      'Every year, millions of tons of plastic end up in the ocean. Much of it comes ( A ) things we use only once, such as bottles, bags, and straws. Plastic does not disappear easily. It breaks into very small pieces called microplastics, and sea animals often mistake them ( B ) food.',
      'Some countries have started to take action. In some places, shops are not allowed to give plastic bags to customers ( C ) free. As a result, more people now bring their own bags when they go shopping.',
      'Young people are also making a difference. A group of high school students in one town started cleaning a beach every month. At first, there were only ten members, but the group has grown ( D ) more than one hundred people. They also make posters to tell others about the problem.',
      'Each of us can do something. If we choose to use less plastic, the ocean will be cleaner ( E ) the animals that live in it.',
    ],
    ja: [
      '毎年、何百万トンものプラスチックが海に流れ着いています。その多くは、ペットボトルやふくろ、ストローのように一度しか使わない物から来ています。プラスチックはかんたんにはなくなりません。マイクロプラスチックとよばれるとても小さなかけらにくだけ、海の生き物はよくそれをえさとまちがえます。',
      '対策を始めた国もあります。ある地域では、店がお客さんにレジぶくろを無料でわたすことが認められていません。その結果、今では買い物に行くときに自分のふくろを持っていく人がふえました。',
      '若い人たちも変化を生み出しています。ある町の高校生のグループは、毎月浜辺のそうじを始めました。はじめはメンバーが10人しかいませんでしたが、グループは100人以上にまでふえました。彼らはこの問題をほかの人に知らせるためのポスターも作っています。',
      '私たち一人ひとりにできることがあります。プラスチックを使うのを減らすことを選べば、海はそこにすむ生き物たちにとってもっときれいになるでしょう。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'from', 'into', 'over'], answer: 1, why: 'come from 〜 で「〜から来る・〜に由来する」。' },
      { id: 'B', choices: ['at', 'for', 'to', 'with'], answer: 1, why: 'mistake A for B で「A を B とまちがえる」。' },
      { id: 'C', choices: ['by', 'for', 'in', 'on'], answer: 1, why: 'for free で「無料で」。' },
      { id: 'D', choices: ['at', 'on', 'to', 'with'], answer: 2, why: 'grow to 〜 で「（数が）〜にまでふえる」。to は到達点。' },
      { id: 'E', choices: ['at', 'by', 'for', 'of'], answer: 2, why: '「生き物たちにとって」は for 〜。' },
    ],
    refer: {
      phrase: 'mistake them',
      word: 'them',
      choices: ['very small pieces of plastic', 'sea animals', 'bottles and bags', 'countries'],
      answer: 0,
      why: 'them は直前の microplastics（とても小さなプラスチックのかけら）を指す。',
    },
    titleQ: { choices: ['A Day at the Beach', 'How to Make Plastic', 'Plastic in the Ocean', 'Sea Animals and Their Food'], answer: 2, why: '海のプラスチックの問題と、その対策について書かれている。' },
    tf: [
      { statement: 'Plastic disappears quickly in the ocean.', answer: false, why: 'Plastic does not disappear easily. とある。' },
      { statement: 'Sea animals sometimes eat small pieces of plastic by mistake.', answer: true, why: 'えさとまちがえる（mistake them for food）とある。' },
      { statement: 'In some places, shops cannot give plastic bags to customers for free.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'The beach-cleaning group has always had more than one hundred members.', answer: false, why: 'はじめは10人だけだった。' },
      { statement: 'The students make posters to tell people about the problem.', answer: true, why: '第3段落の最後の文と合う。' },
    ],
  },
  {
    id: 'octopus',
    title: 'The Clever Octopus',
    level: '高校入試（科学）',
    paragraphs: [
      'The octopus is one of the most surprising animals in the sea. It has eight arms, three hearts, and blue blood. Its blood is blue because it uses copper, not iron, to carry oxygen.',
      'Octopuses are also very clever. In some aquariums, they have learned to open jars ( A ) get the food inside. Some have even escaped ( B ) their tanks at night and come back before morning.',
      'Another amazing ability is changing color. An octopus can change the color of its skin in less than a second. It does this to hide ( C ) enemies or to catch its food.',
      'However, octopuses do not live long. Most of them live ( D ) only one or two years. Scientists are still studying how such a short-lived animal can become so intelligent. The octopus may teach us that being smart does not depend ( E ) how long you live.',
    ],
    ja: [
      'タコは海でいちばんおどろくべき動物の1つです。8本のうで、3つの心臓、そして青い血を持っています。血が青いのは、酸素を運ぶのに鉄ではなく銅を使っているからです。',
      'タコはとてもかしこくもあります。水族館では、中のえさを取るためにびんのふたを開けることを覚えたタコもいます。夜に水そうからにげ出し、朝までにもどってきたタコさえいます。',
      'もう1つのおどろくべき能力は、色を変えることです。タコは1秒もかからずに皮ふの色を変えられます。敵から身をかくしたり、えさをつかまえたりするためにそうするのです。',
      'しかし、タコは長くは生きません。ほとんどのタコは1〜2年しか生きないのです。科学者たちは、こんなに命の短い動物がどうしてこれほどかしこくなれるのかを今も研究しています。タコは、かしこさはどれだけ長く生きるかによって決まるのではないと、私たちに教えてくれるのかもしれません。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'of', 'to'], answer: 3, why: '「えさを取るために」は to ＋動詞の原形（目的を表す不定詞）。' },
      { id: 'B', choices: ['at', 'from', 'into', 'with'], answer: 1, why: 'escape from 〜 で「〜からにげ出す」。' },
      { id: 'C', choices: ['at', 'from', 'to', 'with'], answer: 1, why: 'hide from 〜 で「〜から身をかくす」。' },
      { id: 'D', choices: ['by', 'for', 'since', 'until'], answer: 1, why: '「1〜2年（の間）」は期間の for。' },
      { id: 'E', choices: ['at', 'in', 'on', 'with'], answer: 2, why: 'depend on 〜 で「〜によって決まる・〜しだいだ」。' },
    ],
    qa: [
      { q: 'Why is octopus blood blue?', choices: ['Because it eats blue fish.', 'Because it uses copper to carry oxygen.', 'Because it lives in deep water.', 'Because it has three hearts.'], answer: 1, why: '第1段落に、鉄ではなく銅を使って酸素を運ぶからとある。' },
      { q: 'Why does an octopus change its color?', choices: ['To hide from enemies or to catch food.', 'To make friends.', 'To keep warm.', 'To show it is sick.'], answer: 0, why: '第3段落の最後の文。' },
    ],
    titleQ: { choices: ['How to Cook Seafood', 'The Clever Octopus', 'Life in an Aquarium', 'Animals with Blue Eyes'], answer: 1, why: '体のつくり・かしこさ・色を変える力・寿命など、タコのふしぎ全体について書かれている。' },
    tf: [
      { statement: 'An octopus has three hearts.', answer: true, why: '第1段落に three hearts とある。' },
      { statement: 'Octopus blood is blue because it uses iron to carry oxygen.', answer: false, why: '鉄ではなく銅を使っている。' },
      { statement: 'Some octopuses in aquariums have learned to open jars.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'An octopus needs about ten minutes to change its color.', answer: false, why: '1秒もかからずに色を変えられる。' },
      { statement: 'Most octopuses live for more than ten years.', answer: false, why: 'ほとんどは1〜2年しか生きない。' },
    ],
  },
  {
    id: 'homestay-letter',
    title: 'A Letter to Emma',
    level: '高校入試（手紙）',
    paragraphs: [
      'Dear Emma,',
      'Thank you very much ( A ) letting me stay with your family last month. I had a wonderful time in Canada. I will never forget the trip to the lake and the pancakes your father made every Sunday.',
      'Before I went to Canada, I was worried ( B ) my English. I was afraid that I would not be able to understand anyone. But your family always spoke slowly and helped me when I was in trouble. Little by little, I became able to talk with people ( C ) being afraid.',
      'Now I am studying English harder than before. I want to become an interpreter in the future so that I can help people ( D ) different countries understand each other.',
      'Next summer, it is your turn to visit Japan. I want to show you my town and take you to a summer festival. Please write back ( E ) you have time.',
      'Your friend, Haruka',
    ],
    ja: [
      'エマへ',
      '先月はあなたの家族のところにとめてくれて本当にありがとう。カナダではすばらしい時間を過ごしました。湖への旅行と、毎週日曜日にあなたのお父さんが作ってくれたパンケーキのことは決して忘れません。',
      'カナダに行く前、私は自分の英語が心配でした。だれの言うこともわからないのではないかとこわかったのです。でも、あなたの家族はいつもゆっくり話してくれて、私が困っているときには助けてくれました。少しずつ、こわがらずに人と話せるようになりました。',
      '今、私は前よりも一生けんめい英語を勉強しています。将来は通訳になって、ちがう国の人たちがおたがいに理解し合えるように手助けしたいです。',
      '来年の夏は、あなたが日本に来る番です。私の町を案内して、夏祭りに連れていきたいです。時間があるときに返事を書いてね。',
      'あなたの友だち　ハルカより',
    ],
    blanks: [
      { id: 'A', choices: ['about', 'for', 'to', 'with'], answer: 1, why: 'Thank you for 〜ing で「〜してくれてありがとう」。' },
      { id: 'B', choices: ['about', 'for', 'in', 'with'], answer: 0, why: 'be worried about 〜 で「〜を心配している」。' },
      { id: 'C', choices: ['by', 'for', 'into', 'without'], answer: 3, why: 'without 〜ing で「〜せずに」。' },
      { id: 'D', choices: ['at', 'by', 'from', 'on'], answer: 2, why: 'people from different countries で「ちがう国から来た（出身の）人々」。' },
      { id: 'E', choices: ['because', 'but', 'so', 'when'], answer: 3, why: '「時間があるときに」なので when。' },
    ],
    tf: [
      { statement: "Haruka stayed with Emma's family last month.", answer: true, why: '第2段落の最初の文と合う。' },
      { statement: "Emma's mother made pancakes every Sunday.", answer: false, why: 'パンケーキを作ったのはお父さん。' },
      { statement: 'Before the trip, Haruka was not worried about her English at all.', answer: false, why: '英語が心配だった。' },
      { statement: 'Haruka wants to become an interpreter.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Emma is going to visit Japan next winter.', answer: false, why: '日本に来るのは来年の夏。' },
    ],
  },
  {
    id: 'shopping-dialogue',
    title: 'At a Sports Shop (会話文)',
    level: '中2〜中3（会話文）',
    paragraphs: [
      'Clerk: Good afternoon. May I help you?',
      "Mika: Yes, please. I'm looking ( A ) a present for my brother. His birthday is next week.",
      'Clerk: How old will he be?',
      "Mika: He'll be ten. He likes soccer very much.",
      'Clerk: [ 1 ]',
      "Mika: It looks nice, but I think it's a little too expensive for me. [ 2 ]",
      "Clerk: Sure. This one is ( B ) half the price. It's a little smaller, but it's good for children.",
      "Mika: Great. I'll take it. Can you wrap it ( C ) me?",
      'Clerk: Of course. [ 3 ]',
      "Mika: Blue, please. It's his favorite color.",
      'Clerk: Here you are. I hope your brother likes it.',
      "Mika: Thank you. I'm sure he will be glad ( D ) get it.",
    ],
    ja: [
      '店員：こんにちは。いらっしゃいませ。',
      'ミカ：はい、お願いします。弟へのプレゼントをさがしているんです。来週が誕生日なんです。',
      '店員：何歳になるんですか。',
      'ミカ：10歳になります。サッカーが大好きなんです。',
      '店員：［ 1 ］',
      'ミカ：すてきですね。でも、私には少し高すぎると思います。［ 2 ］',
      '店員：もちろんです。こちらはおよそ半分のお値段です。少し小さめですが、子どもにはぴったりですよ。',
      'ミカ：いいですね。それにします。私のために包んでもらえますか。',
      '店員：もちろんです。［ 3 ］',
      'ミカ：青をお願いします。弟の大好きな色なんです。',
      '店員：どうぞ。弟さんが気に入るといいですね。',
      'ミカ：ありがとうございます。きっと喜んでくれると思います。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'into', 'with'], answer: 1, why: 'look for 〜 で「〜をさがす」。' },
      { id: 'B', choices: ['about', 'by', 'for', 'in'], answer: 0, why: 'about は「およそ・約」。about half the price で「およそ半額」。' },
      { id: 'C', choices: ['at', 'for', 'to', 'with'], answer: 1, why: 'wrap it for me で「私のために包む」。for は「〜のために」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'be glad to ＋動詞の原形で「〜してうれしい」（感情の原因の不定詞）。' },
    ],
    sentences: [
      { id: '1', choices: ["I'm sorry, but we are closed today.", "Then how about this soccer ball? It's very popular.", 'He is good at playing the piano.', 'Your brother is younger than you.'], answer: 1, why: 'サッカー好きと聞いて、サッカーボールをすすめている。次にミカが「すてきですね」と答えている。' },
      { id: '2', choices: ['Do you have a cheaper one?', 'Can I try it on?', 'Where is the station?', "I'll take three of them."], answer: 0, why: '「高すぎる」のあとで、店員が「およそ半額」のものを出しているので、安いものをたずねている。' },
      { id: '3', choices: ['How much is it?', "It's sunny today.", 'Which color of paper would you like, blue or red?', 'Here is your change.'], answer: 2, why: '次にミカが「青をお願いします」と色を答えている。' },
    ],
    tf: [
      { statement: 'Mika is looking for a present for her brother.', answer: true, why: "I'm looking for a present for my brother. とある。" },
      { statement: "Mika's brother will be twelve years old.", answer: false, why: '10歳になる。' },
      { statement: 'Mika buys the first soccer ball the clerk shows her.', answer: false, why: '最初のボールは高すぎたので、安いほうを買った。' },
      { statement: "Mika chooses blue paper because it is her brother's favorite color.", answer: true, why: '青は弟の大好きな色だと言っている。' },
    ],
  },
  {
    id: 'library-diary',
    title: "Riku's Diary",
    level: '中2（日記）',
    paragraphs: [
      'Saturday, May 10',
      'Today I went to the city library ( A ) my friend Rin. We wanted to find some books for our science report. The library was much bigger than I expected. There were more than ten floors, and each floor had a different theme.',
      'We spent two hours ( B ) the fifth floor, where all the science books are. Rin found a book about stars, and I chose one about the human body. A kind librarian showed us how to use the computer to search ( C ) books.',
      'After that, we had lunch at a small cafe next to the library. Rin said, "Let\'s come here again next week." I agreed ( D ) her because there were still many books I wanted to read.',
      'I was tired when I got home, but it was a great day. I want to finish my report ( E ) the end of this month.',
    ],
    ja: [
      '5月10日（土）',
      '今日、友だちのリンといっしょに市立図書館に行った。理科のレポートのための本をさがしたかったのだ。図書館は思っていたよりずっと大きかった。10階以上あって、階ごとにちがうテーマがあった。',
      '私たちは、理科の本がすべてそろっている5階で2時間過ごした。リンは星についての本を見つけ、私は人間の体についての本を選んだ。親切な司書さんが、コンピューターで本をさがす方法を教えてくれた。',
      'そのあと、図書館のとなりの小さなカフェでお昼を食べた。リンが「来週もまた来よう」と言った。読みたい本がまだたくさんあったので、私は賛成した。',
      '家に帰ったときはつかれていたけれど、すばらしい1日だった。今月の終わりまでにレポートを仕上げたい。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'to', 'with'], answer: 3, why: '「友だちといっしょに」は with my friend。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 2, why: '建物の「〜階で」は on the fifth floor。' },
      { id: 'C', choices: ['at', 'for', 'on', 'to'], answer: 1, why: 'search for 〜 で「〜をさがす」。' },
      { id: 'D', choices: ['at', 'on', 'to', 'with'], answer: 3, why: '「人（の意見）に賛成する」は agree with 人。' },
      { id: 'E', choices: ['by', 'for', 'since', 'until'], answer: 0, why: '「〜までに（仕上げる）」と期限を表すのは by。until は「〜までずっと」。' },
    ],
    tf: [
      { statement: 'The writer went to the library alone.', answer: false, why: '友だちのリンといっしょに行った。' },
      { statement: 'The library had more than ten floors.', answer: true, why: '第2段落に more than ten floors とある。' },
      { statement: 'Rin chose a book about the human body.', answer: false, why: 'リンは星の本。人間の体の本を選んだのは筆者。' },
      { statement: 'They had lunch at a cafe next to the library.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'The writer wants to finish the report by the end of the month.', answer: true, why: '最後の文と合う。' },
    ],
  },
  {
    id: 'camp-notice',
    title: 'Summer English Camp (お知らせ)',
    level: '中3（お知らせ）',
    paragraphs: [
      'Summer English Camp for Junior High School Students',
      'Do you want to improve your English ( A ) having fun? Join our three-day English Camp at Green Hill Nature Center! Date: August 5 to August 7. Cost: 12,000 yen (meals included).',
      'At the camp, you will speak only English ( B ) morning to night. Teachers from five different countries will lead games, cooking lessons, and a short drama. On the last night, there will be a campfire party.',
      'To join, please send an e-mail to the City Education Office ( C ) July 20. Only forty students can join, so please apply early. Students who join ( D ) the first time will get a free T-shirt.',
      'If you have any questions, please call us. We are looking forward to ( E ) you at the camp!',
    ],
    ja: [
      '中学生のための夏の英語キャンプ',
      '楽しみながら英語を上達させたいと思いませんか。グリーンヒル自然センターでの3日間の英語キャンプに参加しよう！ 日程：8月5日〜8月7日。費用：12,000円（食事つき）。',
      'キャンプでは、朝から夜まで英語だけを話します。5つのちがう国から来た先生たちが、ゲームや料理教室、短い劇を進めてくれます。最後の夜にはキャンプファイヤーのパーティーがあります。',
      '参加するには、7月20日までに市の教育事務所にメールを送ってください。参加できるのは40人だけなので、早めに申しこんでください。はじめて参加する人には、Tシャツを無料でプレゼントします。',
      '質問があれば、お電話ください。キャンプでみなさんに会えるのを楽しみにしています！',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'so', 'until', 'while'], answer: 3, why: 'while 〜ing で「〜しながら」。' },
      { id: 'B', choices: ['at', 'for', 'from', 'since'], answer: 2, why: 'from A to B で「A から B まで」。' },
      { id: 'C', choices: ['by', 'for', 'in', 'until'], answer: 0, why: '「7月20日までに（送る）」と期限を表すのは by。' },
      { id: 'D', choices: ['at', 'for', 'in', 'on'], answer: 1, why: 'for the first time で「はじめて」。' },
      { id: 'E', choices: ['saw', 'see', 'seeing', 'to see'], answer: 2, why: 'look forward to のあとは 〜ing（to は前置詞）。' },
    ],
    qa: [
      { q: 'How can students join the camp?', choices: ['By calling a teacher.', 'By visiting the nature center.', 'By sending an e-mail to the City Education Office.', 'By writing a letter to the school.'], answer: 2, why: 'To join, please send an e-mail to the City Education Office とある。' },
      { q: 'What will happen on the last night of the camp?', choices: ['A cooking contest.', 'A campfire party.', 'A short drama.', 'A soccer game.'], answer: 1, why: 'On the last night, there will be a campfire party. とある。' },
    ],
    tf: [
      { statement: 'The camp is held for three days.', answer: true, why: 'three-day English Camp、8月5日〜7日。' },
      { statement: 'Students have to pay for their meals separately.', answer: false, why: '費用は食事つき（meals included）。' },
      { statement: 'The teachers come from five different countries.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Any number of students can join the camp.', answer: false, why: '参加できるのは40人だけ。' },
      { statement: 'Students who join for the first time will get a free T-shirt.', answer: true, why: '第4段落の最後の文と合う。' },
    ],
  },
  {
    id: 'email-script',
    title: 'An E-mail to Mr. Brown',
    level: '中3（メール）',
    paragraphs: [
      'Hi Mr. Brown,',
      "This is Daiki from your Tuesday English class. I'm writing to ask you ( A ) some help.",
      'Our class is going to make a short video ( B ) our town for the school festival. We want to introduce popular places and foods to visitors from other countries. Could you check our English script? We wrote it ( C ) ourselves, but we are not sure if it is correct.',
      'The script is attached to this e-mail. It is about two pages long. If possible, could you send it back to us ( D ) next Friday? We will start filming on Saturday.',
      'Thank you for always helping us. We are excited to show you the video ( E ) it is finished.',
      'Best wishes, Daiki',
    ],
    ja: [
      'ブラウン先生へ',
      '火曜日の英語のクラスのダイキです。少し助けていただきたくてメールを書いています。',
      '私たちのクラスは、文化祭のために町についての短い動画を作ります。外国から来た人たちに、人気の場所や食べ物をしょうかいしたいのです。英語の台本を確認していただけませんか。自分たちだけで書いたのですが、正しいかどうか自信がありません。',
      '台本はこのメールにつけてあります。2ページくらいの長さです。できれば、来週の金曜日までに送り返していただけますか。土曜日に撮影を始める予定です。',
      'いつも助けてくださってありがとうございます。動画ができあがったら、先生に見ていただくのが楽しみです。',
      'よろしくお願いします。ダイキより',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'to', 'with'], answer: 1, why: 'ask 人 for 〜 で「人に〜を求める」。' },
      { id: 'B', choices: ['about', 'at', 'by', 'with'], answer: 0, why: '「町についての動画」なので about。' },
      { id: 'C', choices: ['at', 'by', 'of', 'with'], answer: 1, why: 'by ourselves で「自分たちだけで」。' },
      { id: 'D', choices: ['by', 'during', 'since', 'until'], answer: 0, why: '「来週の金曜日までに」と期限を表すのは by。' },
      { id: 'E', choices: ['because', 'but', 'so', 'when'], answer: 3, why: '「できあがったら（できあがったときに）」なので when。' },
    ],
    tf: [
      { statement: "Daiki is a student in Mr. Brown's Tuesday English class.", answer: true, why: '第2段落の最初の文と合う。' },
      { statement: 'The class is making the video for sports day.', answer: false, why: '動画は文化祭（school festival）のため。' },
      { statement: 'Mr. Brown wrote the English script for the class.', answer: false, why: '台本はクラスの生徒が自分たちで書いた。' },
      { statement: 'The script is about two pages long.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'The class will start filming on Sunday.', answer: false, why: '撮影を始めるのは土曜日。' },
    ],
  },
  {
    id: 'lost-dog',
    title: 'Coco Goes Home',
    level: '中2〜中3（物語）',
    paragraphs: [
      'One cold evening, Sora found a small brown dog sitting alone ( A ) the park gate. It had a red collar, but there was no name on it. The dog was shaking, so Sora wrapped it in his scarf and took it home.',
      'His mother said, "Its family must be worried. Let\'s look ( B ) them tomorrow." The next morning, Sora made posters with a picture of the dog and put them up around the town.',
      'Two days passed, but nobody called. Sora was starting to think that he could keep the dog. Then one afternoon, the phone rang. It was an old woman who lived ( C ) the other side of the river. "That\'s my Coco!" she cried.',
      'When she came to Sora\'s house, Coco ran to her ( D ) soon as it saw her. The woman thanked Sora many times. Although Sora felt a little sad, he was glad that Coco was back ( E ) her family.',
    ],
    ja: [
      'ある寒い夕方、ソラは公園の門のところに1ぴきで座っている小さな茶色の犬を見つけました。赤い首輪をしていましたが、名前は書いてありませんでした。犬がふるえていたので、ソラは自分のマフラーで包んで家に連れて帰りました。',
      'お母さんは「家族がきっと心配しているわ。明日さがしてみましょう」と言いました。次の朝、ソラは犬の写真入りのポスターを作り、町のあちこちにはりました。',
      '2日が過ぎましたが、だれからも電話はありませんでした。ソラは、この犬を飼えるかもしれないと思いはじめていました。そんなある日の午後、電話が鳴りました。川の向こう側に住むおばあさんでした。「それはうちのココよ！」と彼女はさけびました。',
      'おばあさんがソラの家に来ると、ココは彼女を見るとすぐにかけ寄りました。おばあさんは何度もソラにお礼を言いました。ソラは少しさびしかったけれど、ココが家族のもとにもどれたことがうれしかったのです。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'from', 'into', 'over'], answer: 0, why: '「門のところに」と場所の一点を表すのは at。' },
      { id: 'B', choices: ['at', 'for', 'into', 'on'], answer: 1, why: 'look for 〜 で「〜をさがす」。' },
      { id: 'C', choices: ['at', 'in', 'on', 'to'], answer: 2, why: 'on the other side of 〜 で「〜の向こう側に」。' },
      { id: 'D', choices: ['as', 'so', 'too', 'very'], answer: 0, why: 'as soon as 〜 で「〜するとすぐに」。' },
      { id: 'E', choices: ['at', 'by', 'to', 'with'], answer: 3, why: 'back with her family で「家族のもとにもどって」。' },
    ],
    tf: [
      { statement: 'Sora found the dog on a cold evening.', answer: true, why: '第1段落の最初の文と合う。' },
      { statement: "The dog's name was written on its collar.", answer: false, why: '首輪に名前はなかった。' },
      { statement: "Sora's mother wanted to keep the dog.", answer: false, why: 'お母さんは家族をさがそうと言った。' },
      { statement: 'The old woman lived on the other side of the river.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Sora felt only happy when Coco went back home.', answer: false, why: '少しさびしかったが、うれしかった。' },
    ],
  },
  {
    id: 'autumn-leaves',
    title: 'Why Do Leaves Change Color?',
    level: '中3（説明文）',
    paragraphs: [
      'In autumn, many trees change the color of their leaves from green ( A ) red or yellow. Why does this happen?',
      'Leaves are green because they have a lot of chlorophyll. Chlorophyll helps trees make food ( B ) sunlight. In autumn, the days get shorter and the air becomes colder, so trees stop making so much food. As the chlorophyll breaks down, the green color disappears.',
      'Then the yellow and orange colors, which were hidden ( C ) the green, can be seen. Some trees, like maples, also make a new red color in autumn. Sunny days and cool nights help make this red color brighter.',
      'So, the beautiful colors of autumn are not just for us to enjoy. They are a sign that trees are getting ready ( D ) the long, cold winter. Next time you see red leaves, think about what is happening ( E ) the tree.',
    ],
    ja: [
      '秋になると、多くの木が葉の色を緑から赤や黄色に変えます。どうしてこうなるのでしょうか。',
      '葉が緑なのは、葉緑素をたくさん持っているからです。葉緑素は、木が日光から栄養を作るのを助けます。秋になると日が短くなり空気が冷たくなるので、木はあまり栄養を作らなくなります。葉緑素がこわれていくにつれて、緑色が消えていきます。',
      'すると、緑にかくれていた黄色やオレンジ色が見えるようになります。カエデのように、秋に新しく赤い色を作る木もあります。晴れた日と涼しい夜が、この赤い色をよりあざやかにします。',
      'つまり、秋の美しい色は、私たちが楽しむためだけのものではないのです。それは、木が長く寒い冬にそなえている合図です。今度赤い葉を見たら、木の中で何が起きているのか考えてみてください。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'from A to B で「A から B へ」。' },
      { id: 'B', choices: ['about', 'from', 'into', 'of'], answer: 1, why: 'make A from B で「B から A を作る」。' },
      { id: 'C', choices: ['at', 'by', 'for', 'to'], answer: 1, why: '受け身 be hidden by 〜 で「〜によってかくされる」。' },
      { id: 'D', choices: ['at', 'for', 'in', 'with'], answer: 1, why: 'get ready for 〜 で「〜の準備をする」。' },
      { id: 'E', choices: ['between', 'inside', 'over', 'under'], answer: 1, why: '「木の中で」なので inside。' },
    ],
    gist: [
      { para: 1, choices: ['葉が緑の理由と、秋に緑が消えるわけ', 'カエデの赤い色', '冬のすごし方', '紅葉の名所'], answer: 0, why: '第2段落は葉緑素の話と、秋に緑が消えるしくみ。' },
      { para: 3, choices: ['木の育て方', '紅葉は木が冬にそなえる合図', '葉の数え方', '秋の天気'], answer: 1, why: '第4段落は、紅葉が冬への準備の合図だというまとめ。' },
    ],
    titleQ: { choices: ['Why Do Leaves Change Color?', 'How to Grow Maple Trees', 'The Best Places to See Snow', 'Colors of the Sea'], answer: 0, why: '秋に葉の色が変わるしくみを説明している。' },
    tf: [
      { statement: 'Leaves are green because of chlorophyll.', answer: true, why: '第2段落の最初の文と合う。' },
      { statement: 'In autumn, trees make more food than in summer.', answer: false, why: '秋はあまり栄養を作らなくなる。' },
      { statement: 'The yellow colors were hidden by the green color.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Maples make a new blue color in autumn.', answer: false, why: '新しく作るのは赤い色。' },
      { statement: 'Sunny days and cool nights make the red color brighter.', answer: true, why: '第3段落の最後の文と合う。' },
    ],
  },
  {
    id: 'sports-center',
    title: 'New Classes at Green City Sports Center (表)',
    level: '中3〜高校入試（表を読む）',
    paragraphs: [
      'Green City Sports Center has started new classes for children this spring. Look ( A ) the table below and choose a class that is right for you.',
      'All classes are for children from six ( B ) fifteen years old. If you have never taken a class before, please start with a Beginners class. The center is open from 9:00 a.m. to 8:00 p.m. every day except Tuesday.',
      'You can join only one class a week. To join, fill out the form at the front desk ( C ) the end of April. Classes start on May 7.',
      'Students who join with a brother or sister can get 500 yen off the monthly fee. Please bring your own towel ( D ) water bottle. If you have any questions, please call the front desk.',
    ],
    ja: [
      'グリーン市スポーツセンターでは、この春から子ども向けの新しい教室を始めました。下の表を見て、自分に合った教室を選んでください。',
      'どの教室も6歳から15歳までの子どもが対象です。はじめて教室に参加する人は、初級クラスから始めてください。センターは火曜日以外の毎日、午前9時から午後8時まで開いています。',
      '参加できるのは週に1つの教室だけです。参加するには、4月末までに受付で申込用紙に記入してください。教室は5月7日に始まります。',
      'きょうだいといっしょに参加する人は、月謝が500円引きになります。自分のタオルと水筒を持ってきてください。質問があれば、受付に電話してください。',
    ],
    table: [
      ['Class', 'Day', 'Time', 'Monthly fee'],
      ['Swimming (Beginners)', 'Monday', '4:00–5:00 p.m.', '3,000 yen'],
      ['Swimming (Advanced)', 'Wednesday', '5:00–6:30 p.m.', '4,000 yen'],
      ['Dance', 'Friday', '4:30–5:30 p.m.', '3,500 yen'],
      ['Tennis', 'Saturday', '9:00–11:00 a.m.', '4,500 yen'],
    ],
    blanks: [
      { id: 'A', choices: ['after', 'at', 'for', 'into'], answer: 1, why: 'look at 〜 で「〜を見る」。' },
      { id: 'B', choices: ['at', 'by', 'in', 'to'], answer: 3, why: 'from A to B で「A から B まで」。' },
      { id: 'C', choices: ['by', 'for', 'since', 'until'], answer: 0, why: '「4月末までに（記入する）」と期限を表すのは by。' },
      { id: 'D', choices: ['and', 'but', 'or', 'so'], answer: 0, why: '「タオルと水筒」の両方を持ってくるので and。' },
    ],
    qa: [
      { q: 'Ken wants to take a class on the weekend. Which class can he join?', choices: ['Swimming (Beginners)', 'Swimming (Advanced)', 'Dance', 'Tennis'], answer: 3, why: '表で週末（土曜日）にあるのはテニスだけ。' },
      { q: 'Aya will join the Dance class with her brother. How much will Aya pay a month?', choices: ['500 yen', '3,000 yen', '3,500 yen', '4,000 yen'], answer: 1, why: 'ダンスは月3,500円。きょうだいで参加すると500円引きなので3,000円。' },
    ],
    tf: [
      { statement: 'The Dance class is on Friday.', answer: true, why: '表のとおり。' },
      { statement: 'The Tennis class is held in the afternoon.', answer: false, why: 'テニスは午前9時〜11時。' },
      { statement: 'Children who have never taken a class should start with a Beginners class.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Students can join two classes a week.', answer: false, why: '週に1つの教室だけ。' },
      { statement: 'The Advanced Swimming class costs 4,000 yen a month.', answer: true, why: '表のとおり。' },
    ],
  },
  {
    id: 'trip-dialogue',
    title: 'Planning the Class Trip (会話文)',
    level: '中2〜中3（会話文）',
    paragraphs: [
      "Mr. Ito: Our class trip is next month. Today, let's decide where to go.",
      'Yui: How about the science museum? It has a new space exhibition.',
      'Taku: [ 1 ]',
      'Mr. Ito: I see. Does anyone have another idea?',
      'Taku: What about the zoo? We can learn ( A ) animals from all over the world.',
      'Yui: I like animals, too. But it may rain that day. [ 2 ]',
      'Mr. Ito: Good point. The zoo has a large indoor area, so we can stay there ( B ) it rains.',
      'Taku: Great! Then the zoo is better ( C ) the museum for everyone.',
      'Mr. Ito: OK. [ 3 ]',
      'Yui: I agree. Everyone, raise your hand ( D ) you want to go to the zoo.',
    ],
    ja: [
      '伊藤先生：クラス旅行は来月です。今日はどこに行くか決めましょう。',
      'ユイ：科学博物館はどうですか。新しい宇宙の展示があるんです。',
      'タク：［ 1 ］',
      '伊藤先生：なるほど。ほかに案がある人はいますか。',
      'タク：動物園はどうですか。世界中の動物について学べます。',
      'ユイ：私も動物は好きです。でも、その日は雨がふるかもしれません。［ 2 ］',
      '伊藤先生：いいところに気がつきましたね。動物園には広い屋内のエリアがあるので、雨がふったらそこにいられますよ。',
      'タク：よかった！ それならみんなにとって博物館より動物園のほうがいいですね。',
      '伊藤先生：わかりました。［ 3 ］',
      'ユイ：賛成です。みんな、動物園に行きたい人は手をあげてください。',
    ],
    blanks: [
      { id: 'A', choices: ['about', 'at', 'to', 'with'], answer: 0, why: 'learn about 〜 で「〜について学ぶ」。' },
      { id: 'B', choices: ['but', 'if', 'so', 'until'], answer: 1, why: '「もし雨がふったら」なので if。' },
      { id: 'C', choices: ['as', 'for', 'than', 'to'], answer: 2, why: '比較級 better のあとは than。' },
      { id: 'D', choices: ['because', 'if', 'or', 'that'], answer: 1, why: '「行きたいなら手をあげて」なので if。' },
    ],
    sentences: [
      { id: '1', choices: ['Yes, I can play the piano.', 'That sounds interesting, but I went there last week.', "No, thank you. I'm full.", "I'll call you tomorrow."], answer: 1, why: '先生が「ほかに案は？」と聞いているので、博物館に反対する理由が入る。' },
      { id: '2', choices: ['What will we do if it rains?', 'How many animals do you have?', 'Where did you buy that umbrella?', 'Who is your favorite teacher?'], answer: 0, why: '次に先生が「雨なら屋内にいられる」と答えている。' },
      { id: '3', choices: ["I'm sorry I'm late.", 'See you tomorrow.', "Let's take a vote.", 'Here you are.'], answer: 2, why: '次にユイが「行きたい人は手をあげて」と言っているので、多数決をとる。' },
    ],
    tf: [
      { statement: 'Yui wanted to go to the science museum.', answer: true, why: 'ユイは科学博物館を提案した。' },
      { statement: 'Taku went to the science museum last week.', answer: true, why: '［ 1 ］に入る文の内容と合う。' },
      { statement: 'The zoo has no indoor area.', answer: false, why: '広い屋内のエリアがある。' },
      { statement: 'Mr. Ito decided the place without asking the students.', answer: false, why: '生徒の意見を聞いて、多数決をとろうとしている。' },
    ],
  },
  {
    id: 'phone-dialogue',
    title: 'An Invitation on the Phone (会話文)',
    level: '中2〜中3（会話文）',
    paragraphs: [
      'Kenji: Hello, Lisa. This is Kenji. Are you free ( A ) Sunday?',
      "Lisa: Hi, Kenji. I have a piano lesson in the morning, but I'm free in the afternoon. Why?",
      "Kenji: There's a fireworks festival by the river. [ 1 ]",
      'Lisa: That sounds great! What time does it start?',
      "Kenji: It starts ( B ) seven, but it will be very crowded. Let's meet at the station at six.",
      'Lisa: OK. [ 2 ]',
      'Kenji: Maybe something to sit on. My mother will make some rice balls ( C ) us.',
      "Lisa: That's so kind of her. I'll bring some drinks, then.",
      'Kenji: Thanks. Oh, and the weather report says it might be cool at night. [ 3 ]',
      "Lisa: Good idea. I'm looking forward ( D ) it. See you on Sunday!",
    ],
    ja: [
      'ケンジ：もしもし、リサ。ケンジだよ。日曜日はひま？',
      'リサ：こんにちは、ケンジ。午前中はピアノのレッスンがあるけど、午後はあいているよ。どうして？',
      'ケンジ：川のそばで花火大会があるんだ。［ 1 ］',
      'リサ：いいね！ 何時に始まるの？',
      'ケンジ：7時に始まるけど、すごく混むと思う。6時に駅で会おう。',
      'リサ：わかった。［ 2 ］',
      'ケンジ：すわるものがあるといいかな。お母さんがぼくたちにおにぎりを作ってくれるよ。',
      'リサ：やさしいお母さんだね。じゃあ、私は飲み物を持っていくね。',
      'ケンジ：ありがとう。あ、天気予報だと夜は涼しくなるかもしれないって。［ 3 ］',
      'リサ：そうだね。楽しみにしてる。日曜日に会おうね！',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', 'on'], answer: 3, why: '曜日の前は on。' },
      { id: 'B', choices: ['at', 'for', 'in', 'on'], answer: 0, why: '時刻の前は at。' },
      { id: 'C', choices: ['by', 'for', 'to', 'with'], answer: 1, why: 'make A for 人 で「人のために A を作る」。' },
      { id: 'D', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'look forward to 〜 で「〜を楽しみにする」。' },
    ],
    sentences: [
      { id: '1', choices: ["I can't swim well.", 'Would you like to go with me?', 'It was very boring.', 'I went there with my family last year.'], answer: 1, why: 'リサが「いいね！」と答えているので、さそう文が入る。' },
      { id: '2', choices: ['How much is it?', 'Where do you live?', 'Can you play the piano?', 'Should I bring anything?'], answer: 3, why: 'ケンジが「すわるもの」と持ち物を答えている。' },
      { id: '3', choices: ['You should bring a jacket.', "You don't have to come.", 'It will be very hot.', "Let's go swimming."], answer: 0, why: '夜は涼しいので、上着を持ってくるようにすすめている。' },
    ],
    tf: [
      { statement: 'Lisa has a piano lesson on Sunday morning.', answer: true, why: '午前中にピアノのレッスンがある。' },
      { statement: 'The fireworks start at six.', answer: false, why: '始まるのは7時。6時は待ち合わせの時刻。' },
      { statement: "Kenji's mother will make rice balls.", answer: true, why: 'お母さんがおにぎりを作ってくれる。' },
      { statement: 'Lisa will bring some food.', answer: false, why: 'リサが持っていくのは飲み物。' },
    ],
  },
  {
    id: 'shinkansen',
    title: 'The Shinkansen and Its Seven-Minute Team',
    level: '中3〜高校入試（説明文）',
    paragraphs: [
      "The Shinkansen, Japan's famous high-speed train, started running ( A ) 1964. The first line connected Tokyo and Shin-Osaka, just before the Tokyo Olympics. Since then, it has carried billions of people.",
      'The Shinkansen is known ( B ) being on time. On average, its trains arrive less than one minute late. This is possible because many workers check the tracks and the trains every night.',
      'Another surprising thing is the cleaning team at Tokyo Station. When a train arrives, they have only about seven minutes to clean all the cars before the next passengers get on. They turn the seats around, pick up garbage, and check ( C ) anything left behind. Their fast and careful work is so famous that people from other countries come to see it.',
      'The Shinkansen shows that great service depends not only on technology but also ( D ) the people who work hard behind the scenes.',
    ],
    ja: [
      '日本の有名な高速鉄道である新幹線は、1964年に走りはじめました。最初の路線は東京と新大阪を結び、東京オリンピックの直前に開業しました。それ以来、何十億人もの人を運んできました。',
      '新幹線は時間に正確なことで知られています。平均すると、列車の遅れは1分未満です。これが可能なのは、毎晩たくさんの作業員が線路と車両を点検しているからです。',
      'もう1つおどろくべきことは、東京駅の清掃チームです。列車が着くと、次の乗客が乗る前に、およそ7分ですべての車両をそうじしなければなりません。座席の向きを変え、ごみを拾い、忘れ物がないか確かめます。そのすばやくていねいな仕事はとても有名で、外国から見に来る人もいるほどです。',
      '新幹線は、すばらしいサービスが技術だけでなく、目に見えないところで一生けんめい働く人々にもかかっていることを示しています。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', 'on'], answer: 2, why: '年の前は in。' },
      { id: 'B', choices: ['as', 'for', 'to', 'with'], answer: 1, why: 'be known for 〜 で「〜で知られている」。' },
      { id: 'C', choices: ['at', 'for', 'in', 'with'], answer: 1, why: 'check for 〜 で「〜がないか確かめる」。' },
      { id: 'D', choices: ['at', 'for', 'in', 'on'], answer: 3, why: 'not only on A but also on B で「A だけでなく B にもよる」（depend on）。' },
    ],
    underline: {
      phrase: 'behind the scenes',
      choices: ['where people cannot easily see them', 'in front of many people', 'on a stage', 'after a show'],
      answer: 0,
      why: 'behind the scenes は「舞台裏で・人目につかないところで」。',
    },
    refer: {
      phrase: 'it has carried',
      word: 'it',
      choices: ['the Shinkansen', 'the station', 'Tokyo', 'the Olympics'],
      answer: 0,
      why: '「それ以来、何十億人もの人を運んできた」のは新幹線。',
    },
    complete: [
      { q: 'The Shinkansen can be on time because ...', choices: ['it runs only at night.', 'many workers check the tracks and trains every night.', 'it has no passengers.', 'it is the fastest train in the world.'], answer: 1, why: '第2段落：毎晩作業員が線路と車両を点検しているから。' },
    ],
    tf: [
      { statement: 'The first Shinkansen line connected Tokyo and Shin-Osaka.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Shinkansen trains are usually more than ten minutes late.', answer: false, why: '平均の遅れは1分未満。' },
      { statement: 'The cleaning team has about seven minutes to clean a train.', answer: true, why: '第3段落の内容と合う。' },
      { statement: "Nobody is interested in the cleaning team's work.", answer: false, why: '外国から見に来る人もいるほど有名。' },
      { statement: 'The writer says that only technology makes great service.', answer: false, why: '技術だけでなく、働く人々にもよると言っている。' },
    ],
  },
  {
    id: 'uniform-opinion',
    title: 'Should Schools Keep Uniforms? (意見文)',
    level: '中3〜高校入試（意見文）',
    paragraphs: [
      'Many junior high schools in Japan have school uniforms. Some people think uniforms are a good idea, but others do not. In my opinion, schools should keep uniforms ( A ) three reasons.',
      'First, uniforms save time. Students do not have to think about what to wear every morning. They can use that time ( B ) eat breakfast or check their homework.',
      'Second, uniforms help students feel like members of the same team. When everyone wears the same clothes, it is easier to feel proud ( C ) our school. Third, uniforms can save money for families, because buying many different clothes for school can be expensive.',
      'Of course, some students want to show their own style. I understand their feelings. So, I think schools should let students choose ( D ) a skirt and pants, or wear a sweater on cold days. In this way, we can enjoy both the good points of uniforms and some freedom.',
    ],
    ja: [
      '日本の多くの中学校には制服があります。制服はよい考えだと思う人もいれば、そうでない人もいます。私の意見では、3つの理由から、学校は制服を続けるべきです。',
      '1つ目に、制服は時間の節約になります。生徒は毎朝何を着るか考えなくてすみます。その時間を、朝ごはんを食べたり宿題を確認したりするのに使えます。',
      '2つ目に、制服は生徒が同じチームの一員だと感じる助けになります。みんなが同じ服を着ていると、自分の学校をほこりに思いやすくなります。3つ目に、学校用にいろいろな服を買うのはお金がかかるので、制服は家庭のお金の節約になります。',
      'もちろん、自分らしさを出したい生徒もいます。その気持ちはわかります。だから、学校はスカートとズボンのどちらかを選べたり、寒い日にはセーターを着られたりするようにするべきだと思います。そうすれば、制服のよい点と少しの自由の両方を楽しめます。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'for', 'in', 'with'], answer: 1, why: 'for 〜 reasons で「〜の理由から」。' },
      { id: 'B', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'use A to ＋原形で「〜するために A を使う」。' },
      { id: 'C', choices: ['at', 'for', 'of', 'with'], answer: 2, why: 'be / feel proud of 〜 で「〜をほこりに思う」。' },
      { id: 'D', choices: ['among', 'between', 'from', 'with'], answer: 1, why: 'choose between A and B で「A と B のどちらかを選ぶ」。' },
    ],
    gist: [{ para: 3, choices: ['制服のよい点と少しの自由を両立させる提案', '制服をなくすべき理由', '制服の値段', '朝ごはんの大切さ'], answer: 0, why: '第4段落は、自分らしさも大事にしながら制服を続ける提案。' }],
    tf: [
      { statement: 'The writer thinks schools should stop using uniforms.', answer: false, why: '制服を続けるべきだという意見。' },
      { statement: 'The writer says uniforms save time in the morning.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'According to the writer, uniforms make families spend more money.', answer: false, why: '家庭のお金の節約になると言っている。' },
      { statement: 'The writer understands students who want to show their own style.', answer: true, why: 'I understand their feelings. とある。' },
      { statement: 'The writer thinks students should not wear sweaters.', answer: false, why: '寒い日にはセーターを着られるようにするべきだと言っている。' },
    ],
  },
  {
    id: 'library-notice',
    title: 'Notice from the School Library (お知らせ)',
    level: '中2〜中3（お知らせ）',
    paragraphs: [
      'Notice from the School Library',
      'The school library will be closed ( A ) December 20 to January 7 for the winter holidays. During this time, you cannot borrow or return books.',
      'Before the holidays, you can borrow up to five books. Please return them ( B ) January 10. If you return books late, you cannot borrow new books for one week.',
      'We will also hold a "Book Bingo" event in January. Read books from different groups, such as science, history, and stories, and fill ( C ) your bingo card. Students who get a bingo will receive a special bookmark.',
      'New books have arrived! You can find them on the shelf ( D ) the entrance. If there are any books you want the library to buy, please write the titles on the request paper at the counter.',
    ],
    ja: [
      '学校図書館からのお知らせ',
      '学校図書館は冬休みのため、12月20日から1月7日まで閉館します。この期間は本を借りたり返したりできません。',
      '冬休みの前は、5冊まで本を借りられます。1月10日までに返してください。返すのが遅れると、1週間新しい本を借りられません。',
      '1月には「本のビンゴ」のイベントも行います。科学、歴史、物語など、ちがうジャンルの本を読んで、ビンゴカードをうめてください。ビンゴになった人には、特別なしおりをプレゼントします。',
      '新しい本が入りました！ 入口の近くのたなにあります。図書館に買ってほしい本があれば、カウンターのリクエスト用紙に題名を書いてください。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'from', 'in', 'since'], answer: 1, why: 'from A to B で「A から B まで」。' },
      { id: 'B', choices: ['by', 'for', 'since', 'until'], answer: 0, why: '「1月10日までに（返す）」と期限を表すのは by。' },
      { id: 'C', choices: ['at', 'in', 'on', 'with'], answer: 1, why: 'fill in 〜 で「（用紙など）をうめる・記入する」。' },
      { id: 'D', choices: ['near', 'of', 'to', 'with'], answer: 0, why: '「入口の近くの」なので near。' },
    ],
    qa: [{ q: 'When will the library open again after the winter holidays?', choices: ['On December 20.', 'On January 7.', 'On January 8.', 'On January 10.'], answer: 2, why: '1月7日まで閉館なので、開くのは1月8日。' }],
    tf: [
      { statement: 'Students can return books during the winter holidays.', answer: false, why: '閉館中は借りることも返すこともできない。' },
      { statement: 'Students can borrow up to five books before the holidays.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'If students return books late, they cannot borrow books for one month.', answer: false, why: '借りられないのは1週間。' },
      { statement: 'Students who get a bingo will receive a special bookmark.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'New books are on the shelf near the entrance.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'robot-pon',
    title: 'Grandpa and Pon',
    level: '中3（物語）',
    paragraphs: [
      'Mika\'s grandfather lived alone in the countryside. Last year, Mika\'s parents gave him a small robot ( A ) a present. At first, he did not like it. "I don\'t need a machine to talk to," he said.',
      'The robot could tell the weather, play music, and remind him to take his medicine. Little by little, he started to talk to it every morning. He even gave it a name: Pon.',
      'One day, Mika visited him and was surprised. Her grandfather was teaching Pon old songs ( B ) his childhood. "Pon is a good student," he said with a smile. "It never gets tired ( C ) my stories."',
      'Mika was happy to see her grandfather smiling. But she also thought, "Pon can listen to him, but it can\'t give him a hug." Since then, Mika has called her grandfather every weekend, and she visits him ( D ) often as she can.',
    ],
    ja: [
      'ミカのおじいさんは田舎でひとりでくらしていました。去年、ミカの両親はおじいさんに小さなロボットをプレゼントしました。はじめ、おじいさんはそれが気に入りませんでした。「話し相手の機械なんていらないよ」と言いました。',
      'ロボットは天気を教えたり、音楽をかけたり、薬を飲むのを思い出させたりできました。少しずつ、おじいさんは毎朝ロボットに話しかけるようになりました。名前までつけました。ポンです。',
      'ある日、ミカがたずねていくとおどろきました。おじいさんがポンに子どものころの古い歌を教えていたのです。「ポンはいい生徒だよ」とおじいさんはほほえんで言いました。「わしの話にちっともあきないんだ」。',
      'ミカはおじいさんが笑っているのを見てうれしくなりました。でも同時に「ポンはおじいちゃんの話を聞けるけど、だきしめることはできない」とも思いました。それ以来、ミカは毎週末おじいさんに電話をかけ、できるだけよく会いに行っています。',
    ],
    blanks: [
      { id: 'A', choices: ['as', 'at', 'by', 'with'], answer: 0, why: 'as a present で「プレゼントとして」（as ＝〜として）。' },
      { id: 'B', choices: ['at', 'by', 'from', 'to'], answer: 2, why: 'songs from his childhood で「子どものころの（から伝わる）歌」。' },
      { id: 'C', choices: ['at', 'for', 'in', 'of'], answer: 3, why: 'get tired of 〜 で「〜にあきる」。' },
      { id: 'D', choices: ['as', 'so', 'too', 'very'], answer: 0, why: 'as often as 人 can で「できるだけよく」。' },
    ],
    refer: { phrase: 'It never gets tired', word: 'It', choices: ['Pon', 'the song', 'Mika', 'the countryside'], answer: 0, why: 'おじいさんの話にあきないのはロボットのポン。' },
    tf: [
      { statement: "Mika's grandfather liked the robot from the beginning.", answer: false, why: 'はじめは気に入らなかった。' },
      { statement: 'The robot reminded him to take his medicine.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'The grandfather named the robot Pon.', answer: true, why: 'He even gave it a name: Pon. とある。' },
      { statement: 'Pon taught the grandfather old songs.', answer: false, why: '歌を教えていたのはおじいさん。' },
      { statement: 'Mika now calls her grandfather every weekend.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'teen-sleep',
    title: 'Are You Getting Enough Sleep?',
    level: '中3（説明文）',
    paragraphs: [
      'How many hours do you sleep every night? Doctors say that teenagers need ( A ) eight to ten hours of sleep. However, many students in Japan sleep less than seven hours.',
      'Why is sleep so important? While we sleep, our brains sort the things we learned during the day. So, if you sleep well, it becomes easier to remember what you studied. Sleep also helps our bodies grow and fight ( B ) illness.',
      'One reason students do not get enough sleep is their smartphones. The light from screens can make it harder ( C ) fall asleep. Some students also keep checking messages late at night.',
      'Here are some tips. Stop using your phone at least one hour before bed. Try to go to bed and get up ( D ) the same time every day, even on weekends. Small changes like these can make a big difference.',
    ],
    ja: [
      'あなたは毎晩何時間ねていますか。医者によると、10代の人には8〜10時間くらいのすいみんが必要です。しかし、日本の多くの生徒は7時間未満しかねていません。',
      'なぜすいみんはそんなに大切なのでしょうか。ねている間に、脳はその日に学んだことを整理します。だから、よくねると、勉強したことを覚えやすくなります。すいみんは、体が成長したり病気とたたかったりするのも助けます。',
      '生徒がじゅうぶんにねていない理由の1つは、スマートフォンです。画面の光は、ねむりにつくのを難しくすることがあります。夜おそくまでメッセージを確認しつづける生徒もいます。',
      'いくつかのコツをしょうかいします。ねる少なくとも1時間前にはスマホを使うのをやめましょう。週末でも、毎日同じ時刻にねて起きるようにしましょう。こうした小さな変化が、大きなちがいを生むのです。',
    ],
    blanks: [
      { id: 'A', choices: ['about', 'by', 'for', 'on'], answer: 0, why: 'about は「およそ・約」。' },
      { id: 'B', choices: ['against', 'at', 'for', 'to'], answer: 0, why: 'fight against 〜 で「〜とたたかう」。' },
      { id: 'C', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'make it 形容詞 to ＋原形で「〜するのを…にする」（it は to 以下を指す）。' },
      { id: 'D', choices: ['at', 'by', 'in', 'on'], answer: 0, why: 'at the same time で「同じ時刻に」。' },
    ],
    gist: [{ para: 2, choices: ['生徒がねぶそくになる理由の1つ', 'よくねるためのコツ', 'ねむりのしくみ', '医者の意見'], answer: 0, why: '第3段落は、スマホがねぶそくの原因の1つだという話。' }],
    complete: [
      { q: 'If you sleep well, ...', choices: ['you will forget everything.', 'it becomes easier to remember what you studied.', 'you do not need to eat breakfast.', 'your phone will work better.'], answer: 1, why: '第2段落：よくねると勉強したことを覚えやすくなる。' },
      { q: 'The writer says that we should stop using our phones ...', choices: ['at least one hour before bed.', 'only on weekends.', 'after we go to bed.', 'when we wake up.'], answer: 0, why: '第4段落：ねる少なくとも1時間前にはやめよう。' },
    ],
    tf: [
      { statement: 'Doctors say teenagers need about eight to ten hours of sleep.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Many students in Japan sleep more than nine hours.', answer: false, why: '多くの生徒は7時間未満。' },
      { statement: 'Sleep helps us remember what we studied.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'The writer says students should use their phones right before bed.', answer: false, why: 'ねる1時間前にはやめようと言っている。' },
      { statement: 'The writer suggests going to bed at the same time even on weekends.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'bakery',
    title: "A Week at Grandma's Bakery",
    level: '中2〜中3（物語）',
    paragraphs: [
      "Haruto's grandmother runs a small bakery. Last summer, Haruto helped her ( A ) a week. He had to wake up at five every morning.",
      'On the first day, he dropped a tray of bread on the floor. He felt terrible. But his grandmother only said, "Everyone makes mistakes. Let\'s make some more." She showed him how to hold the tray ( B ) both hands.',
      'By the end of the week, Haruto could shape bread rolls by himself. Customers smiled when they bought the rolls he made. One little girl said, "These are the best rolls ( C ) the world!"',
      'On his last day, his grandmother gave him an envelope. Inside, there was some money and a note: "Thank you for your hard work. You were a great help." Haruto decided to use the money ( D ) buy a cookbook. He wants to bake bread for his family at home.',
    ],
    ja: [
      'ハルトのおばあさんは小さなパン屋をやっています。去年の夏、ハルトは1週間おばあさんを手伝いました。毎朝5時に起きなければなりませんでした。',
      '1日目、彼はパンののったトレーを床に落としてしまいました。とてもつらい気持ちになりました。でもおばあさんは「だれでもまちがえるものよ。また作りましょう」と言っただけでした。そして、トレーを両手で持つ方法を教えてくれました。',
      'その週の終わりには、ハルトはひとりでロールパンの形を作れるようになりました。お客さんは彼が作ったパンを買うとき、にっこりしました。ある小さな女の子は「世界でいちばんおいしいパンだね！」と言いました。',
      '最後の日、おばあさんは彼にふうとうをわたしました。中にはお金と、「よくがんばってくれてありがとう。とても助かったよ」というメモが入っていました。ハルトはそのお金で料理の本を買うことにしました。家で家族のためにパンを焼きたいのです。',
    ],
    blanks: [
      { id: 'A', choices: ['during', 'for', 'in', 'since'], answer: 1, why: '「1週間」のように期間の長さは for。' },
      { id: 'B', choices: ['by', 'in', 'to', 'with'], answer: 3, why: 'with both hands で「両手で」。' },
      { id: 'C', choices: ['at', 'in', 'of', 'on'], answer: 1, why: '最上級＋in the world で「世界でいちばん〜」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'use A to ＋原形で「〜するために A を使う」。' },
    ],
    order: { words: ['bake', 'He', 'bread', 'to', 'wants', 'for'], rest: 'his family at home.', answer: 'He wants to bake bread for', ja: '彼は家で家族のためにパンを焼きたい。（want to ＋原形）' },
    complete: [
      { q: 'When Haruto dropped the bread, his grandmother ...', choices: ['told him to go home.', 'was very angry.', 'said that everyone makes mistakes.', 'cried in the kitchen.'], answer: 2, why: '第2段落：Everyone makes mistakes. と言った。' },
      { q: 'Haruto decided to use the money ...', choices: ['to buy a cookbook.', 'to buy a new bike.', 'to open his own bakery.', 'to take a trip.'], answer: 0, why: '第4段落：料理の本を買うことにした。' },
    ],
    tf: [
      { statement: 'Haruto helped at the bakery for a week.', answer: true, why: '第1段落の内容と合う。' },
      { statement: "Haruto's grandmother got angry when he dropped the bread.", answer: false, why: 'だれでもまちがえると言っただけで、おこらなかった。' },
      { statement: 'By the end of the week, Haruto could shape bread rolls by himself.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'A little girl did not like the rolls.', answer: false, why: '世界でいちばんおいしいと言った。' },
      { statement: 'Haruto wants to use the money to buy a cookbook.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'restaurant-dialogue',
    title: 'At a Restaurant (会話文)',
    level: '中2〜中3（会話文）',
    paragraphs: [
      'Waiter: Good evening. Are you ready ( A ) order?',
      "Emily: Yes. I'd like the tomato pasta, please.",
      'Waiter: Sure. [ 1 ]',
      "Emily: Orange juice, please. Oh, does the pasta have any meat in it? I don't eat meat.",
      "Waiter: No, it doesn't. It's made ( B ) only vegetables and cheese.",
      'Emily: Great. [ 2 ]',
      'Waiter: About fifteen minutes. We make it fresh.',
      "Emily: That's fine. I'm not in a hurry today.",
      'Emily: Excuse me. This cheese is really good. Where is it from?',
      "Waiter: It's from a small farm near this town. Many people ask about it.",
      'Emily: I see. Could I have the check, please?',
      'Waiter: Of course. [ 3 ]',
      "Emily: Here you are. The pasta was delicious. I'll come back ( C ) my friends next time.",
      "Waiter: Thank you very much. We're looking forward ( D ) seeing you again.",
    ],
    ja: [
      '店員：こんばんは。ご注文はお決まりですか。',
      'エミリー：はい。トマトパスタをお願いします。',
      '店員：かしこまりました。［ 1 ］',
      'エミリー：オレンジジュースをお願いします。あ、パスタにお肉は入っていますか。私はお肉を食べないんです。',
      '店員：いいえ、入っていません。野菜とチーズだけで作っています。',
      'エミリー：よかった。［ 2 ］',
      '店員：15分くらいです。できたてをお作りしますので。',
      'エミリー：大丈夫です。今日は急いでいないので。',
      'エミリー：すみません。このチーズ、とてもおいしいですね。どこのものですか。',
      '店員：この町の近くの小さな牧場のものです。よく聞かれるんですよ。',
      'エミリー：そうなんですね。お会計をお願いできますか。',
      '店員：もちろんです。［ 3 ］',
      'エミリー：はい、どうぞ。パスタ、とてもおいしかったです。次は友だちといっしょに来ますね。',
      '店員：ありがとうございます。またのお越しをお待ちしております。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'be ready to ＋原形で「〜する準備ができている」。' },
      { id: 'B', choices: ['at', 'by', 'to', 'with'], answer: 3, why: 'be made with 〜 で「（材料）〜を使って作られている」。' },
      { id: 'C', choices: ['at', 'for', 'to', 'with'], answer: 3, why: '「友だちといっしょに」なので with。' },
      { id: 'D', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'look forward to 〜ing で「〜を楽しみにする」。' },
    ],
    sentences: [
      { id: '1', choices: ['How about going shopping?', 'Where are you from?', 'Would you like something to drink?', 'What time is it?'], answer: 2, why: 'エミリーが「オレンジジュースを」と飲み物を答えている。' },
      { id: '2', choices: ['How long will it take?', 'How many brothers do you have?', 'Can I use your pen?', 'What did you do yesterday?'], answer: 0, why: '店員が「15分くらい」と時間を答えている。' },
      { id: '3', choices: ['Here is the menu.', 'That will be 1,500 yen.', 'Please wait outside.', 'We are closed today.'], answer: 1, why: 'お会計なので金額を伝えている。次にエミリーが Here you are. とお金をわたしている。' },
    ],
    tf: [
      { statement: 'Emily orders tomato pasta.', answer: true, why: "I'd like the tomato pasta とある。" },
      { statement: 'The pasta has some meat in it.', answer: false, why: '野菜とチーズだけで作っている。' },
      { statement: 'The pasta takes about thirty minutes.', answer: false, why: '15分くらい。' },
      { statement: 'Emily wants to come back with her friends.', answer: true, why: '次は友だちと来ると言っている。' },
    ],
  },
  {
    id: 'chopsticks',
    title: 'Chopsticks Around Asia',
    level: '中3（説明文）',
    paragraphs: [
      'Chopsticks are used in many countries in Asia, ( A ) as Japan, China, and Korea. However, chopsticks are not the same in every country.',
      'In China, chopsticks are usually long. This is because people often share dishes ( B ) the center of a big table. Long chopsticks make it easy to reach the food.',
      'In Korea, many people use metal chopsticks. They are flat and a little heavy, so it takes some time to get used ( C ) them.',
      'Japanese chopsticks are usually shorter and have pointed ends. They are good for picking out small bones from fish. In Japan, each person often has his or her own pair of chopsticks at home.',
      "Chopsticks may look simple, but their shapes are closely connected ( D ) each country's food and way of eating.",
    ],
    ja: [
      'はしは、日本や中国、韓国など、アジアの多くの国で使われています。しかし、はしはどの国でも同じというわけではありません。',
      '中国では、はしはふつう長いです。これは、大きなテーブルの真ん中にある料理をみんなで分け合うことが多いからです。長いはしだと料理に手がとどきやすいのです。',
      '韓国では、多くの人が金属のはしを使います。平たくて少し重いので、なれるまで少し時間がかかります。',
      '日本のはしは、ふつう短めで、先がとがっています。魚から小さな骨を取りのぞくのに向いています。日本では、家で自分専用のはしを持っていることがよくあります。',
      'はしは単純に見えるかもしれませんが、その形はそれぞれの国の料理や食べ方と深く結びついているのです。',
    ],
    blanks: [
      { id: 'A', choices: ['as', 'like', 'so', 'such'], answer: 3, why: 'such as 〜 で「（たとえば）〜のような」。' },
      { id: 'B', choices: ['by', 'in', 'on', 'to'], answer: 1, why: 'in the center of 〜 で「〜の真ん中に」。' },
      { id: 'C', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'get used to 〜 で「〜になれる」。' },
      { id: 'D', choices: ['at', 'by', 'for', 'to'], answer: 3, why: 'be connected to 〜 で「〜と結びついている」。' },
    ],
    insert: { sentence: 'Because they are made of metal, they also last a long time.', after: [0, 1, 2, 3], answer: 2, why: '「金属でできているので」とあるので、韓国の金属のはしを説明した第3段落のあとに入る。' },
    summary: {
      text: 'Chopsticks are used in many Asian countries, but their ( 1 ) is different in each country. For example, Chinese chopsticks are usually ( 2 ).',
      blanks: [
        { choices: ['shape', 'price', 'color', 'name'], answer: 0, why: '第5段落「形はそれぞれの国の料理や食べ方と結びついている」。' },
        { choices: ['short', 'long', 'heavy', 'cheap'], answer: 1, why: '第2段落「中国では、はしはふつう長い」。' },
      ],
    },
    tf: [
      { statement: 'Chopsticks are used only in Japan.', answer: false, why: 'アジアの多くの国で使われている。' },
      { statement: 'Chinese chopsticks are usually long.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Many people in Korea use metal chopsticks.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Japanese chopsticks are usually longer than Chinese ones.', answer: false, why: '日本のはしは短め、中国のはしは長い。' },
      { statement: 'Japanese chopsticks are good for picking out small fish bones.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'lost-wallet',
    title: "Nana's Little Hero Story",
    level: '中2〜中3（物語）',
    paragraphs: [
      'On her way home from school, Nana found a wallet ( A ) the sidewalk. Inside, there was some money, a train pass, and a photo of a little boy.',
      'She thought about taking it to the police station, but it was getting dark. Then she noticed a card ( B ) a phone number in the wallet. She called the number with her phone.',
      'A man answered. "Oh, thank you! I\'ve been looking for it all afternoon," he said. Thirty minutes later, he came to the place ( C ) Nana was waiting. He was the father of the boy in the photo.',
      'He tried to give Nana some money as a thank-you, but she said no. "I just did the right thing," she said. The next week, Nana received a letter ( D ) the boy. It said, "Thank you for finding my dad\'s wallet. You are a hero!" Nana keeps the letter on her desk.',
    ],
    ja: [
      '学校から家に帰るとちゅう、ナナは歩道でさいふを見つけました。中にはお金と定期券、そして小さな男の子の写真が入っていました。',
      '交番に届けようかと考えましたが、暗くなってきていました。そのとき、さいふの中に電話番号の書かれたカードがあるのに気づきました。彼女は自分の電話でその番号にかけました。',
      '男の人が出ました。「ああ、ありがとう！ 午後じゅうずっとさがしていたんです」と彼は言いました。30分後、彼はナナが待っている場所に来ました。写真の男の子のお父さんでした。',
      '彼はお礼にナナにお金をわたそうとしましたが、ナナはことわりました。「当たり前のことをしただけです」と彼女は言いました。次の週、ナナはその男の子から手紙をもらいました。「パパのさいふを見つけてくれてありがとう。お姉さんはヒーローだよ！」と書いてありました。ナナはその手紙を机の上にかざっています。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'to'], answer: 2, why: '「歩道の上で」は on the sidewalk。' },
      { id: 'B', choices: ['at', 'by', 'of', 'with'], answer: 3, why: 'a card with a phone number で「電話番号の書かれたカード」（with ＝〜のついた）。' },
      { id: 'C', choices: ['when', 'where', 'which', 'who'], answer: 1, why: 'the place（場所）を説明するので where。' },
      { id: 'D', choices: ['at', 'by', 'from', 'to'], answer: 2, why: 'receive a letter from 人 で「人から手紙を受け取る」。' },
    ],
    refer: { phrase: 'It said', word: 'It', choices: ['the letter', 'the wallet', 'the photo', 'the phone'], answer: 0, why: '「〜と書いてあった」のは男の子からの手紙。' },
    seq: { events: ['Nana called the number on the card.', 'Nana found a wallet on the sidewalk.', 'Nana received a letter from the boy.', 'The man came to the place where Nana was waiting.'], answer: [1, 0, 3, 2], why: 'さいふを見つける → カードの番号に電話 → 男の人が来る → 次の週に手紙が届く。' },
    tf: [
      { statement: 'Nana found the wallet on her way to school.', answer: false, why: '学校から家に帰るとちゅうに見つけた。' },
      { statement: 'There was a photo of a little boy in the wallet.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Nana took the wallet to the police station.', answer: false, why: 'カードの電話番号に電話した。' },
      { statement: 'The man gave Nana a lot of money.', answer: false, why: 'ナナはお金をことわった。' },
      { statement: 'Nana received a letter from the boy.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'speech-nurse',
    title: 'My Dream (Speech)',
    level: '中3（スピーチ）',
    paragraphs: [
      "Good morning, everyone. Today I'd like to talk about my dream. I want to become a nurse in the future.",
      'When I was ten, I was in the hospital ( A ) two weeks because I broke my leg. I was scared and lonely at night. One nurse always came to my room and talked with me before I went to sleep. Her kind words made me feel better.',
      'Since then, I have wanted to help sick people like she did. To become a nurse, I need to study science hard. I also want to learn how to talk ( B ) people who are worried or in pain.',
      'Now, I am trying to do small things. For example, I help my grandmother when she goes to the hospital, and I listen ( C ) her carefully. I believe that listening is the first step to helping someone.',
      'My dream is not easy, but I will keep trying. Thank you ( D ) listening.',
    ],
    ja: [
      'みなさん、おはようございます。今日は私の夢についてお話ししたいと思います。私は将来、看護師になりたいです。',
      '10歳のとき、足を骨折して2週間入院しました。夜はこわくてさびしかったです。ある看護師さんが、私がねる前にいつも部屋に来て話をしてくれました。そのやさしい言葉で、私は元気になれました。',
      'それ以来、私も彼女のように病気の人を助けたいと思ってきました。看護師になるには、理科を一生けんめい勉強する必要があります。また、心配をかかえていたり痛みがあったりする人と、どう話せばいいかも学びたいです。',
      '今は、小さなことをやってみています。たとえば、祖母が病院に行くときに手伝ったり、祖母の話をしっかり聞いたりしています。話を聞くことが、だれかを助ける第一歩だと私は信じています。',
      '私の夢はかんたんではありませんが、がんばりつづけます。ご清聴ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['during', 'for', 'in', 'since'], answer: 1, why: '「2週間」のように期間の長さは for。' },
      { id: 'B', choices: ['at', 'by', 'for', 'to'], answer: 3, why: 'talk to 人 で「人に話しかける・人と話す」。' },
      { id: 'C', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'listen to 人 で「人の話を聞く」。' },
      { id: 'D', choices: ['at', 'for', 'to', 'with'], answer: 1, why: 'Thank you for 〜ing で「〜してくれてありがとう」。' },
    ],
    gist: [{ para: 2, choices: ['看護師になるためにがんばりたいこと', '病院でのこわい思い出', '祖母の病気のこと', '理科のテストの結果'], answer: 0, why: '第3段落は、看護師になるために必要なことと学びたいことの話。' }],
    tf: [
      { statement: 'The speaker wants to become a doctor.', answer: false, why: 'なりたいのは看護師。' },
      { statement: 'The speaker was in the hospital because of a broken leg.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'A nurse talked with the speaker before the speaker went to sleep.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'The speaker thinks science is not important for nurses.', answer: false, why: '理科を一生けんめい勉強する必要があると言っている。' },
      { statement: 'The speaker helps her grandmother when she goes to the hospital.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'bees',
    title: 'Small Bees, Big Jobs',
    level: '中3（説明文）',
    paragraphs: [
      'Bees are small, but they do a very important job for people. When bees fly from flower to flower to collect food, they carry pollen ( A ) one flower to another. This helps plants make fruit and seeds.',
      'Many of the foods we eat, such as apples, strawberries, and pumpkins, depend ( B ) this work. Without bees, it would be much harder for farmers to grow them.',
      'However, the number of bees is getting smaller in some parts of the world. One reason is that there are fewer flowers in cities and on farms. Some chemicals used on farms are also harmful ( C ) bees.',
      'There are things that we can do to help. For example, we can plant flowers in our gardens or on our balconies. Some schools even keep bees and teach students about them.',
      'Next time you see a bee, please remember that it is working hard ( D ) us.',
    ],
    ja: [
      'ハチは小さいですが、人間にとってとても大切な仕事をしています。ハチが食べ物を集めるために花から花へと飛ぶとき、ハチは花粉をある花から別の花へと運びます。これが、植物が実や種をつくる助けになります。',
      'リンゴ、イチゴ、カボチャなど、私たちが食べる食べ物の多くは、この働きにたよっています。ハチがいなければ、農家の人がそれらを育てるのはずっと難しくなるでしょう。',
      'しかし、世界のいくつかの地域では、ハチの数がへってきています。理由の1つは、都市や農場の花が少なくなっていることです。農場で使われるいくつかの薬品も、ハチにとって害があります。',
      '私たちにもできることがあります。たとえば、庭やベランダに花を植えることができます。ハチを飼って、生徒にハチについて教えている学校さえあります。',
      '今度ハチを見かけたら、ハチが私たちのために一生けんめい働いていることを思い出してください。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'from', 'in'], answer: 2, why: 'from A to B で「A から B へ」。' },
      { id: 'B', choices: ['at', 'in', 'on', 'with'], answer: 2, why: 'depend on 〜 で「〜にたよる」。' },
      { id: 'C', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'be harmful to 〜 で「〜にとって害がある」。' },
      { id: 'D', choices: ['by', 'for', 'of', 'with'], answer: 1, why: 'for us で「私たちのために」。' },
    ],
    vocab: [{ word: 'pollen', choices: ['花粉', '花びら', 'はちみつ', '種'], answer: 0, why: 'ハチが花から花へ運び、植物が実や種をつくる助けになるもの＝花粉。' }],
    tf: [
      { statement: 'Bees carry pollen from one flower to another.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Apples and strawberries do not need bees at all.', answer: false, why: 'ハチの働きにたよっている食べ物の例として出ている。' },
      { statement: 'The number of bees is getting larger everywhere in the world.', answer: false, why: 'いくつかの地域でへってきている。' },
      { statement: 'Planting flowers is one way to help bees.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'No schools keep bees.', answer: false, why: 'ハチを飼っている学校もある。' },
    ],
    insert: { sentence: 'These are some of the reasons why bees are in danger.', after: [0, 1, 2, 3], answer: 2, why: '第3段落でハチがへっている理由（花が少ない・薬品）を説明したあとに、「これらが理由だ」とまとめる文が入る。' },
  },
  {
    id: 'email-homestay',
    title: 'An Email from a Host Family',
    level: '中2〜中3（メール）',
    paragraphs: [
      'Dear Riku,',
      "Hello! I'm Karen Brown. I'm writing ( A ) you because you will stay with our family in Canada next month. We are all very excited to meet you.",
      'Let me tell you about our family. My husband, Tom, is a teacher. We have two children. Emma is fourteen, and she is interested ( B ) Japanese anime. Ben is ten, and he loves playing hockey. We also have a big dog named Max.',
      'It will be cold here in March, so please bring a warm coat. You will go to school with Emma ( C ) Monday to Friday. On weekends, we are planning to take you to a lake near our house.',
      'If you have any questions, please feel free to ask. We are looking forward ( D ) seeing you soon!',
      'Best wishes,\nKaren',
    ],
    ja: [
      'リクへ',
      'こんにちは！ カレン・ブラウンです。来月あなたがカナダの私たちの家にホームステイするので、このメールを書いています。家族みんな、あなたに会えるのをとても楽しみにしています。',
      '家族のことを話しますね。夫のトムは先生です。子どもが2人います。エマは14歳で、日本のアニメに興味があります。ベンは10歳で、ホッケーをするのが大好きです。マックスという名前の大きな犬もいます。',
      '3月のこちらは寒いので、あたたかいコートを持ってきてください。月曜日から金曜日まではエマといっしょに学校に行きます。週末には、家の近くの湖に連れて行く予定です。',
      '何か質問があれば、遠りょなく聞いてください。もうすぐ会えるのを楽しみにしています！',
      'それでは。カレンより',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'for', 'to'], answer: 3, why: 'write to 人 で「人に手紙（メール）を書く」。' },
      { id: 'B', choices: ['at', 'for', 'in', 'on'], answer: 2, why: 'be interested in 〜 で「〜に興味がある」。' },
      { id: 'C', choices: ['between', 'from', 'on', 'since'], answer: 1, why: 'from Monday to Friday で「月曜日から金曜日まで」。' },
      { id: 'D', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'look forward to 〜ing で「〜するのを楽しみにする」。' },
    ],
    tf: [
      { statement: 'Riku will stay with the Brown family in Canada.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Tom is a doctor.', answer: false, why: 'トムは先生。' },
      { statement: 'Emma is interested in Japanese anime.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Karen says it will be warm in March.', answer: false, why: '3月は寒いのでコートを持ってくるように言っている。' },
      { statement: 'The family is planning to take Riku to a lake on weekends.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'last-runner',
    title: 'The Last Runner',
    level: '中2〜中3（物語）',
    paragraphs: [
      'Haruto was the slowest runner in his class. When his teacher chose him for the relay race at the sports festival, he was very worried. "I will make our team lose," he thought.',
      'His friend Sota said, "Let\'s practice together." So every morning ( A ) two weeks, they ran in the park before school. Haruto was tired, but he did not give up.',
      'On the day of the sports festival, Haruto was the last runner. When he got the baton, his team was in second place. He ran as fast ( B ) he could. Everyone was shouting his name.',
      'In the end, he could not catch the runner in front of him, and his team finished second. Haruto felt sorry, but his classmates ran to him with big smiles. "You were great! You ran faster than ever," Sota said.',
      'Haruto learned that doing your best is more important ( C ) winning. Now he runs ( D ) the park every morning because he enjoys it.',
    ],
    ja: [
      'ハルトはクラスでいちばん足がおそい子でした。先生が彼を体育祭のリレーの選手に選んだとき、彼はとても心配になりました。「ぼくのせいでチームが負けてしまう」と彼は思いました。',
      '友だちのソウタが「いっしょに練習しよう」と言いました。そこで2週間、毎朝、2人は学校の前に公園で走りました。ハルトはつかれましたが、あきらめませんでした。',
      '体育祭の日、ハルトはアンカーでした。バトンを受け取ったとき、チームは2位でした。彼はできるだけ速く走りました。みんなが彼の名前をさけんでいました。',
      '結局、彼は前の走者に追いつけず、チームは2位でゴールしました。ハルトは申しわけなく思いましたが、クラスメートたちは満面の笑顔で彼のところへかけよりました。「すごかったよ！ 今までで一番速かった」とソウタは言いました。',
      'ハルトは、勝つことよりもベストをつくすことのほうが大切だと学びました。今では、楽しいので毎朝公園を走っています。',
    ],
    blanks: [
      { id: 'A', choices: ['during', 'for', 'in', 'since'], answer: 1, why: '「2週間」のように期間の長さは for。' },
      { id: 'B', choices: ['as', 'so', 'than', 'that'], answer: 0, why: 'as fast as he could で「できるだけ速く」。' },
      { id: 'C', choices: ['as', 'for', 'than', 'to'], answer: 2, why: 'more important than 〜 で「〜より大切」。' },
      { id: 'D', choices: ['at', 'in', 'on', 'to'], answer: 1, why: 'run in the park で「公園（の中）を走る」。' },
    ],
    refer: { phrase: 'he enjoys it', word: 'it', choices: ['running', 'the relay race', 'the park', 'the baton'], answer: 0, why: 'ハルトが楽しんでいるのは、毎朝走ること。' },
    seq: { events: ['Haruto got the baton in second place.', 'The teacher chose Haruto for the relay race.', 'Haruto and Sota practiced in the park.', 'Haruto\'s classmates ran to him with big smiles.'], answer: [1, 2, 0, 3], why: '選手に選ばれる → 公園で練習 → 2位でバトンを受け取る → クラスメートがかけよる。' },
    tf: [
      { statement: 'Haruto was the fastest runner in his class.', answer: false, why: 'クラスでいちばん足がおそかった。' },
      { statement: 'Haruto and Sota practiced every morning before school.', answer: true, why: '第2段落の内容と合う。' },
      { statement: "Haruto's team was in first place when he got the baton.", answer: false, why: 'バトンを受け取ったときは2位だった。' },
      { statement: "Haruto's team won the relay race.", answer: false, why: 'チームは2位でゴールした。' },
      { statement: "Haruto's classmates were happy with his running.", answer: true, why: '第4段落で笑顔でかけより、ほめている。' },
    ],
  },
  {
    id: 'recycle-plastic',
    title: 'Where Does Plastic Go?',
    level: '中3（説明文）',
    paragraphs: [
      'Plastic is used for many things around us, such as bottles, bags, and food boxes. It is light, strong, and cheap, so it is very useful. However, it has become a big problem ( A ) the environment.',
      'Most plastic does not break down easily. Some plastic stays in nature for hundreds of years. When people throw plastic away on the street, rain and wind can carry it into rivers and then ( B ) the sea.',
      'In the sea, animals such as turtles and birds sometimes eat plastic because they think it is food. This can make them sick. Small pieces of plastic are also found inside fish that people eat.',
      'To solve this problem, many countries are trying to use less plastic. In Japan, stores started charging money for plastic bags in 2020. Many people now carry their own bags ( C ) they go shopping.',
      'We can also help by sorting our trash correctly so that more plastic can be recycled. Small actions like these are important ( D ) protecting the sea and the animals living there.',
    ],
    ja: [
      'プラスチックは、ボトルや袋、食品の容器など、身のまわりの多くのものに使われています。軽くて丈夫で安いので、とても便利です。しかし、それは環境にとって大きな問題になっています。',
      'ほとんどのプラスチックはかんたんには分解されません。何百年も自然の中に残るものもあります。人々が道にプラスチックを捨てると、雨や風がそれを川へ、そして海へと運ぶことがあります。',
      '海では、カメや鳥などの動物が、食べ物だと思ってプラスチックを食べてしまうことがあります。そのせいで病気になることもあります。人間が食べる魚の体内からも、小さなプラスチックのかけらが見つかっています。',
      'この問題を解決するために、多くの国がプラスチックを使う量をへらそうとしています。日本では、2020年に店がレジ袋を有料にしはじめました。今では、買い物に行くときに自分の袋を持っていく人がたくさんいます。',
      'ごみを正しく分別して、より多くのプラスチックがリサイクルされるようにすることでも、私たちは協力できます。こうした小さな行動が、海とそこにすむ動物を守るために大切なのです。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'from', 'with'], answer: 1, why: 'a problem for 〜 で「〜にとっての問題」。' },
      { id: 'B', choices: ['at', 'into', 'on', 'over'], answer: 1, why: 'carry it into rivers and then into the sea で「川へ、そして海の中へ」。' },
      { id: 'C', choices: ['because', 'but', 'until', 'when'], answer: 3, why: '「買い物に行くときに」なので when。' },
      { id: 'D', choices: ['at', 'by', 'for', 'of'], answer: 2, why: 'be important for 〜ing で「〜するために大切だ」。' },
    ],
    insert: { sentence: 'In this way, plastic from the land ends up in the ocean.', after: [0, 1, 2, 3], answer: 1, why: '第2段落の「雨や風がプラスチックを川へ、そして海へと運ぶ」のまとめとして入る。' },
    summary: {
      text: 'Plastic is useful, but most of it does not break down ( 1 ). To protect the sea, many countries are trying to use ( 2 ) plastic.',
      blanks: [
        { choices: ['easily', 'loudly', 'kindly', 'late'], answer: 0, why: '第2段落「ほとんどのプラスチックはかんたんには分解されない」。' },
        { choices: ['more', 'less', 'new', 'colorful'], answer: 1, why: '第4段落「プラスチックを使う量をへらそうとしている」。' },
      ],
    },
    vocab: [{ word: 'charging', choices: ['（お金を）とる', '電気をためる', 'すてる', 'くばる'], answer: 0, why: 'レジ袋の話で charging money for 〜 なので「〜にお金をとる（有料にする）」。' }],
    tf: [
      { statement: 'Plastic is light, strong, and cheap.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'All plastic breaks down in a few weeks.', answer: false, why: '何百年も残るものもある。' },
      { statement: 'Some sea animals eat plastic because they think it is food.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Stores in Japan started charging for plastic bags in 2010.', answer: false, why: '2020年から。' },
      { statement: 'Sorting trash correctly helps more plastic get recycled.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'talk-library',
    title: 'At the School Library',
    level: '中2（会話文）',
    paragraphs: [
      'Mika: Hi, Mr. Lee. I am looking ( A ) a book about space. Do you have any?',
      'Mr. Lee: Yes, we have many. They are on the shelf ( B ) the window. Are you doing a report?',
      'Mika: Yes. I have to write a report about the moon by next Friday.',
      'Mr. Lee: Then this book will help you. It has a lot of pictures, and it is easy to read. You can borrow it ( C ) two weeks.',
      'Mika: Great! Can I also borrow this magazine?',
      'Mr. Lee: Sorry, you cannot take magazines home. But you can read them here in the library ( D ) five o\'clock.',
      'Mika: OK. I will read it here after I finish my homework. Thank you, Mr. Lee.',
    ],
    ja: [
      'ミカ：こんにちは、リー先生。宇宙についての本をさがしています。ありますか？',
      'リー先生：うん、たくさんあるよ。窓のそばの棚にあるよ。レポートを書いているのかい？',
      'ミカ：はい。来週の金曜日までに月についてのレポートを書かないといけないんです。',
      'リー先生：それならこの本が役に立つよ。写真がたくさんのっていて、読みやすいんだ。2週間借りられるよ。',
      'ミカ：よかった！ この雑誌も借りられますか？',
      'リー先生：ごめんね、雑誌は家に持って帰れないんだ。でも、5時までならここ図書館で読めるよ。',
      'ミカ：わかりました。宿題が終わってから、ここで読みます。ありがとうございます、リー先生。',
    ],
    blanks: [
      { id: 'A', choices: ['after', 'at', 'for', 'like'], answer: 2, why: 'look for 〜 で「〜をさがす」。' },
      { id: 'B', choices: ['by', 'in', 'of', 'under'], answer: 0, why: 'by the window で「窓のそばに」。' },
      { id: 'C', choices: ['during', 'for', 'in', 'since'], answer: 1, why: '「2週間」のように期間の長さは for。' },
      { id: 'D', choices: ['at', 'by', 'from', 'until'], answer: 3, why: '5時「まで（ずっと）」読めるので until。' },
    ],
    tf: [
      { statement: 'Mika wants a book about space.', answer: true, why: '最初の発言と合う。' },
      { statement: 'Mika has to write a report about the sun.', answer: false, why: '月についてのレポート。' },
      { statement: 'The book Mr. Lee shows Mika has a lot of pictures.', answer: true, why: 'リー先生の2つ目の発言と合う。' },
      { statement: 'Mika can take the magazine home.', answer: false, why: '雑誌は家に持って帰れない。' },
      { statement: 'Mika will read the magazine in the library after her homework.', answer: true, why: '最後の発言と合う。' },
    ],
  },
  {
    id: 'grandpa-garden',
    title: "Grandpa's Tomatoes",
    level: '中2〜中3（物語）',
    paragraphs: [
      'Every summer, Yui visited her grandfather in the country. He had a small garden ( A ) his house, and he grew many vegetables there.',
      'One day, he gave Yui a little tomato plant. "If you take care of it every day, it will give you sweet tomatoes," he said. Yui was excited and took the plant home to the city.',
      'At first, she watered it every morning. But after a few weeks, she got busy ( B ) club activities and sometimes forgot. The leaves started to look weak. Yui felt bad and called her grandfather.',
      '"Plants are like friends," he said. "They need you to come and see them." From that day, Yui checked her plant every morning before school, even ( C ) she was tired.',
      'At the end of August, the plant had five red tomatoes. Yui picked one and ate it. It was the sweetest tomato she had ever eaten. She took a picture of the tomatoes and sent it ( D ) her grandfather. He replied, "Now you are a real gardener!"',
    ],
    ja: [
      '毎年夏、ユイはいなかに住むおじいさんをたずねていました。おじいさんは家のうらに小さな畑を持っていて、そこでたくさんの野菜を育てていました。',
      'ある日、おじいさんはユイに小さなトマトのなえをくれました。「毎日世話をすれば、あまいトマトがなるよ」とおじいさんは言いました。ユイはわくわくして、そのなえを都会の家に持ち帰りました。',
      '最初、ユイは毎朝水をやりました。でも数週間たつと、部活でいそがしくなり、ときどきわすれるようになりました。葉が弱っているように見えはじめました。ユイは悪いことをしたと思い、おじいさんに電話しました。',
      '「植物は友だちのようなものなんだ」とおじいさんは言いました。「会いに来てもらうことが必要なんだよ」。その日から、ユイはつかれているときでも、毎朝学校に行く前になえを見るようにしました。',
      '8月の終わりには、なえに赤いトマトが5つなりました。ユイは1つつんで食べました。それは今まで食べた中でいちばんあまいトマトでした。ユイはトマトの写真をとって、おじいさんに送りました。おじいさんは「これでりっぱな園芸家だね！」と返事をくれました。',
    ],
    blanks: [
      { id: 'A', choices: ['behind', 'between', 'during', 'since'], answer: 0, why: 'behind his house で「家のうらに」。' },
      { id: 'B', choices: ['at', 'by', 'on', 'with'], answer: 3, why: 'be (get) busy with 〜 で「〜でいそがしい」。' },
      { id: 'C', choices: ['because', 'if', 'though', 'when'], answer: 2, why: 'even though 〜 で「〜だけれども」。' },
      { id: 'D', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'send 物 to 人 で「人に物を送る」。' },
    ],
    refer: { phrase: 'sent it', word: 'it', choices: ['the picture', 'the tomato', 'the plant', 'the garden'], answer: 0, why: 'おじいさんに送ったのはトマトの写真。' },
    seq: { events: ['Yui called her grandfather.', 'Yui got a tomato plant from her grandfather.', 'Yui ate the sweetest tomato.', 'The leaves started to look weak.'], answer: [1, 3, 0, 2], why: 'なえをもらう → 葉が弱る → おじいさんに電話 → いちばんあまいトマトを食べる。' },
    tf: [
      { statement: "Yui's grandfather lived in the city.", answer: false, why: 'おじいさんはいなかに住んでいた。' },
      { statement: 'Yui got a tomato plant from her grandfather.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Yui never forgot to water the plant.', answer: false, why: '部活でいそがしくなり、ときどきわすれた。' },
      { statement: 'The plant had five red tomatoes at the end of August.', answer: true, why: '第5段落の内容と合う。' },
      { statement: "Yui's grandfather was happy with her tomatoes.", answer: true, why: '「りっぱな園芸家だね」と返事をした。' },
    ],
  },
  {
    id: 'sleep-science',
    title: 'Why Do We Need Sleep?',
    level: '中3（説明文）',
    paragraphs: [
      'Many students go to bed late because they are busy ( A ) homework, club activities, or their smartphones. But sleep is very important for both our bodies and our minds.',
      'While we are sleeping, our bodies repair themselves. Our muscles rest, and our bodies grow. That is why young people especially need enough sleep.',
      'Sleep is also important for learning. During sleep, our brains organize the things we learned during the day. If you study hard but do not sleep well, it may be difficult ( B ) you to remember what you studied.',
      'Not getting enough sleep can cause problems. People who do not sleep well often feel tired and find it hard to focus in class. They may also get angry more easily.',
      'So, what can we do to sleep better? First, try to go to bed and get up at the same time every day. Second, stop using your phone about an hour ( C ) going to bed, because its light can keep your brain awake. Good sleep is one of the best presents you can give ( D ) yourself.',
    ],
    ja: [
      '宿題や部活、スマートフォンでいそがしいせいで、おそくねる生徒がたくさんいます。しかし、すいみんは体にとっても心にとってもとても大切です。',
      'ねている間に、体は自分で自分を修復します。筋肉は休み、体は成長します。だから、特に若い人たちには十分なすいみんが必要なのです。',
      'すいみんは学習にとっても大切です。ねている間に、脳はその日に学んだことを整理します。一生けんめい勉強しても、よくねむらなければ、勉強したことを覚えるのが難しくなるかもしれません。',
      '十分にねむらないと、問題が起こることがあります。よくねむれていない人は、つかれを感じやすく、授業に集中するのが難しいと感じることがよくあります。また、おこりやすくなることもあります。',
      'では、よくねむるために何ができるでしょうか。まず、毎日同じ時間にねて、同じ時間に起きるようにしましょう。次に、ねる1時間くらい前にはスマートフォンを使うのをやめましょう。その光が脳を起きたままにしてしまうことがあるからです。よいすいみんは、自分自身にあげられる最高のプレゼントの1つなのです。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'on', 'with'], answer: 3, why: 'be busy with 〜 で「〜でいそがしい」。' },
      { id: 'B', choices: ['for', 'of', 'to', 'with'], answer: 0, why: 'It is difficult for 人 to 〜 で「人が〜するのは難しい」。' },
      { id: 'C', choices: ['after', 'before', 'during', 'since'], answer: 1, why: '「ねる前に」なので before going to bed。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'give 物 to 人 で「人に物をあげる」。' },
    ],
    summary: {
      text: 'Sleep is important for our bodies and for ( 1 ). To sleep better, we should go to bed at the same time every day and stop using our phones ( 2 ) going to bed.',
      blanks: [
        { choices: ['learning', 'eating', 'shopping', 'running'], answer: 0, why: '第3段落「すいみんは学習にとっても大切」。' },
        { choices: ['after', 'before', 'while', 'since'], answer: 1, why: '第5段落「ねる1時間くらい前にはスマートフォンをやめる」。' },
      ],
    },
    insert: { sentence: 'In other words, sleep helps you keep your memories.', after: [0, 1, 2, 3], answer: 2, why: '第3段落の「ねている間に脳が学んだことを整理する」という説明を、「言いかえると記憶を保つ助けになる」とまとめる文。' },
    vocab: [{ word: 'repair', choices: ['修復する', 'こわす', '数える', '売る'], answer: 0, why: 'ねている間に筋肉が休み体が成長する、という流れから「（自分を）なおす・修復する」。' }],
    tf: [
      { statement: 'Our bodies repair themselves while we are sleeping.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Our brains stop working completely during sleep.', answer: false, why: 'ねている間に脳は学んだことを整理している。' },
      { statement: 'People who do not sleep well may get angry more easily.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'The writer says we should use our phones just before going to bed.', answer: false, why: 'ねる1時間くらい前にはやめるように言っている。' },
      { statement: 'Going to bed at the same time every day is one way to sleep better.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'speech-elderly-home',
    title: 'What I Learned from Volunteering (Speech)',
    level: '中3（スピーチ）',
    paragraphs: [
      'Hello, everyone. Last summer, I joined a volunteer activity ( A ) a home for elderly people in my town. Today, I want to tell you what I learned there.',
      'On the first day, I was very nervous. I did not know what to talk about with the elderly people. I just stood in the corner of the room. Then, a woman named Mrs. Sato smiled at me and asked me to sit ( B ) her.',
      'She told me about her childhood. She said that when she was young, there were no TVs or video games, so she played outside with her friends every day. Her stories were so interesting that I forgot the time.',
      'After that, I visited the home every week. I sang songs and played games with the people there. They always looked forward ( C ) my visits, and I looked forward to seeing them, too.',
      'Through this experience, I learned that listening to others is a way to make them happy. I also learned that we can learn a lot ( D ) older people. I want to continue this activity. Thank you.',
    ],
    ja: [
      'みなさん、こんにちは。去年の夏、私は町の老人ホームでのボランティア活動に参加しました。今日は、そこで学んだことをお話ししたいと思います。',
      '初日、私はとても緊張していました。お年寄りの方々と何を話せばいいのかわかりませんでした。ただ部屋のすみに立っていました。すると、佐藤さんという女性が私にほほえみかけ、となりにすわるように言ってくれました。',
      '佐藤さんは子どものころの話をしてくれました。若いころはテレビもテレビゲームもなかったので、毎日友だちと外で遊んでいたそうです。その話がとてもおもしろくて、私は時間をわすれてしまいました。',
      'それから、私は毎週ホームをたずねました。そこにいる人たちと歌を歌ったり、ゲームをしたりしました。みなさんはいつも私が来るのを楽しみにしてくれて、私もみなさんに会うのを楽しみにしていました。',
      'この経験を通して、人の話を聞くことは人を幸せにする方法の1つだと学びました。また、年上の人から多くのことを学べることも学びました。私はこの活動を続けたいです。ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'of', 'to'], answer: 0, why: 'at a home で「ホームで」（場所の一点）。' },
      { id: 'B', choices: ['at', 'between', 'next to', 'under'], answer: 2, why: 'sit next to 人 で「人のとなりにすわる」。' },
      { id: 'C', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'look forward to 〜 で「〜を楽しみにする」。' },
      { id: 'D', choices: ['for', 'from', 'on', 'to'], answer: 1, why: 'learn 〜 from 人 で「人から〜を学ぶ」。' },
    ],
    gist: [{ para: 2, choices: ['佐藤さんの子どものころの話', '老人ホームの場所', 'ゲームのルール', 'テレビの歴史'], answer: 0, why: '第3段落は、佐藤さんが話してくれた子どものころの思い出。' }],
    insert: { sentence: 'I was happy that she spoke to me first.', after: [0, 1, 2, 3], answer: 1, why: '佐藤さんが先に声をかけてくれた第2段落のあとに入る。' },
    tf: [
      { statement: 'The speaker joined the volunteer activity last winter.', answer: false, why: '去年の夏に参加した。' },
      { statement: 'The speaker was nervous on the first day.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Mrs. Sato played video games when she was young.', answer: false, why: '若いころはテレビゲームはなく、外で遊んでいた。' },
      { statement: 'The speaker visited the home every week after the first day.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'The speaker wants to stop the activity.', answer: false, why: '活動を続けたいと言っている。' },
    ],
  },
  {
    id: 'umbrella-day',
    title: 'The Red Umbrella',
    level: '中2〜中3（物語）',
    paragraphs: [
      'It was raining hard when school finished. Kenta did not have an umbrella, so he waited ( A ) the entrance. Most of his classmates had already gone home.',
      'Then a first-year student he did not know came up to him. She was holding a red umbrella. "Do you live near the park?" she asked. Kenta said yes. "Me, too. Let\'s go together," she said.',
      'The umbrella was small, so both of them got a little wet. On the way, they talked ( B ) their favorite books. Kenta found out that she liked the same writer as he did.',
      'When they arrived ( C ) the park, the rain stopped. Kenta thanked her, and she said, "See you tomorrow!" Kenta realized that he had not asked her name.',
      'The next morning, Kenta brought a book by their favorite writer to school. He went to the first-year classroom and found the girl. "Thank you for yesterday. This is ( D ) you," he said. That was the beginning of their friendship.',
    ],
    ja: [
      '学校が終わったとき、雨が強くふっていました。ケンタはかさを持っていなかったので、げんかんで待っていました。クラスメートのほとんどはもう帰ってしまっていました。',
      'すると、知らない1年生の女の子が近づいてきました。赤いかさを持っていました。「公園の近くに住んでいますか？」と彼女はたずねました。ケンタは「うん」と答えました。「私もです。いっしょに帰りましょう」と彼女は言いました。',
      'かさは小さかったので、2人とも少しぬれてしまいました。帰り道、2人は好きな本について話しました。ケンタは、彼女が自分と同じ作家を好きだとわかりました。',
      '公園に着いたとき、雨がやみました。ケンタがお礼を言うと、彼女は「また明日！」と言いました。ケンタは、彼女の名前を聞いていなかったことに気づきました。',
      '次の朝、ケンタは2人の好きな作家の本を学校に持ってきました。1年生の教室に行って、その女の子を見つけました。「きのうはありがとう。これ、きみにあげる」と彼は言いました。それが2人の友情の始まりでした。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'on', 'to'], answer: 0, why: 'wait at the entrance で「げんかんで待つ」。' },
      { id: 'B', choices: ['about', 'at', 'for', 'to'], answer: 0, why: 'talk about 〜 で「〜について話す」。' },
      { id: 'C', choices: ['at', 'for', 'on', 'to'], answer: 0, why: 'arrive at 〜 で「〜に着く」（arrive to は×）。' },
      { id: 'D', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'This is for you. で「これはあなたにです（あげます）」。' },
    ],
    refer: { phrase: 'that she liked', word: 'she', choices: ['the girl with the red umbrella', "Kenta's classmate", "Kenta's mother", 'the writer'], answer: 0, why: '帰り道にいっしょに話していた、赤いかさの1年生の女の子のこと。' },
    tf: [
      { statement: 'Kenta had an umbrella that day.', answer: false, why: 'かさを持っていなかった。' },
      { statement: 'The girl was a first-year student.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Kenta and the girl liked the same writer.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Kenta asked the girl her name at the park.', answer: false, why: '名前を聞いていなかったことに気づいた。' },
      { statement: 'Kenta gave the girl a book the next morning.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'emoji-history',
    title: 'Small Pictures, Big Messages',
    level: '中3（説明文）',
    paragraphs: [
      'Today, many people around the world use emoji when they send messages. Emoji are small pictures, such as smiling faces, hearts, and food. They help us show our feelings ( A ) using many words.',
      'Did you know that emoji were first made in Japan? In the late 1990s, a Japanese phone company created a set of small pictures for its mobile phones. The word "emoji" comes ( B ) the Japanese words "e" (picture) and "moji" (character).',
      'Later, emoji were added to smartphones all over the world, and they became very popular. Now there are thousands of emoji, and new ones are added almost every year.',
      'However, we should be careful when we use emoji. The same emoji can have different meanings in different countries. For example, a picture that means "OK" in one country may be rude ( C ) another.',
      'Emoji are a fun and useful way to communicate. But it is also important to use words carefully, especially when you write ( D ) someone you do not know well.',
    ],
    ja: [
      '今日、世界中の多くの人がメッセージを送るときに絵文字を使います。絵文字は、笑顔やハート、食べ物などの小さな絵です。たくさんの言葉を使わずに、気持ちを表すのに役立ちます。',
      '絵文字が最初に日本でつくられたことを知っていましたか。1990年代の終わりに、日本の携帯電話会社が自社の携帯電話のために小さな絵のセットをつくりました。「emoji」という言葉は、日本語の「絵」と「文字」から来ています。',
      'その後、絵文字は世界中のスマートフォンに入れられ、とても人気になりました。今では何千もの絵文字があり、ほぼ毎年新しいものが追加されています。',
      'しかし、絵文字を使うときは注意が必要です。同じ絵文字でも、国によってちがう意味をもつことがあるのです。たとえば、ある国で「オーケー」を意味する絵が、別の国では失礼になることがあります。',
      '絵文字は楽しくて便利なコミュニケーションの方法です。でも、特によく知らない人に何かを書くときには、言葉を注意深く使うことも大切です。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'for', 'with', 'without'], answer: 3, why: 'without 〜ing で「〜せずに」。' },
      { id: 'B', choices: ['at', 'from', 'on', 'to'], answer: 1, why: 'come from 〜 で「〜から来ている」。' },
      { id: 'C', choices: ['at', 'in', 'on', 'to'], answer: 1, why: 'in another (country) で「別の国では」。' },
      { id: 'D', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'write to 人 で「人に書く（手紙・メッセージを送る）」。' },
    ],
    summary: {
      text: 'Emoji were first made in ( 1 ), and now people all over the world use them. But the same emoji can have ( 2 ) meanings in different countries.',
      blanks: [
        { choices: ['America', 'China', 'Japan', 'France'], answer: 2, why: '第2段落「絵文字は最初に日本でつくられた」。' },
        { choices: ['different', 'same', 'easy', 'short'], answer: 0, why: '第4段落「国によってちがう意味をもつことがある」。' },
      ],
    },
    tf: [
      { statement: 'Emoji help us show our feelings.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Emoji were first made in the 2010s.', answer: false, why: '1990年代の終わりにつくられた。' },
      { statement: 'The word "emoji" comes from Japanese words.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'No new emoji are added these days.', answer: false, why: 'ほぼ毎年新しいものが追加されている。' },
      { statement: 'An emoji always has the same meaning in every country.', answer: false, why: '国によってちがう意味をもつことがある。' },
    ],
  },
  {
    id: 'email-festival',
    title: 'An Email about the School Festival',
    level: '中2〜中3（メール）',
    paragraphs: [
      'Hi Sam,',
      'How are you? I am writing to tell you about our school festival. It will be held ( A ) Saturday, November 8. My class is going to open a small café, and I will make cookies with my friends.',
      'There will also be a music show in the gym. My brother will play the drums ( B ) his band. It starts at 1:00 p.m., so please come early if you want a good seat.',
      'The festival is open from 10:00 a.m. to 3:00 p.m. You do not need a ticket, but please show this email ( C ) the gate. My school is about ten minutes from the station on foot.',
      'I really hope you can come. Please let me know ( D ) Wednesday if you are coming.',
      'Your friend,\nAoi',
    ],
    ja: [
      'サムへ',
      '元気？ 学校の文化祭のことを伝えたくてメールしています。11月8日の土曜日に開かれます。私のクラスは小さなカフェを開く予定で、私は友だちとクッキーをつくります。',
      '体育館では音楽ショーもあります。兄がバンドといっしょにドラムをえんそうします。午後1時に始まるので、いい席がほしかったら早めに来てね。',
      '文化祭は午前10時から午後3時までです。チケットはいらないけれど、門でこのメールを見せてください。私の学校は駅から歩いて10分くらいです。',
      'ぜひ来てくれるとうれしいです。来られるかどうか、水曜日までに教えてね。',
      'あなたの友だち、アオイより',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'to'], answer: 2, why: '日付・曜日の前は on。' },
      { id: 'B', choices: ['at', 'for', 'of', 'with'], answer: 3, why: 'with his band で「バンドといっしょに」。' },
      { id: 'C', choices: ['at', 'by', 'for', 'of'], answer: 0, why: 'at the gate で「門で」（場所の一点）。' },
      { id: 'D', choices: ['by', 'for', 'in', 'until'], answer: 0, why: '「水曜日までに（締め切り）」なので by。' },
    ],
    qa: [
      { q: 'What will Aoi make at the festival?', choices: ['Cookies.', 'Cakes.', 'Drinks.', 'Sandwiches.'], answer: 0, why: '第2段落「友だちとクッキーをつくる」。' },
    ],
    tf: [
      { statement: 'The school festival will be held on a Sunday.', answer: false, why: '土曜日に開かれる。' },
      { statement: "Aoi's brother will play the drums in the gym.", answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Sam needs to buy a ticket for the festival.', answer: false, why: 'チケットはいらない。' },
      { statement: 'The festival ends at 3:00 p.m.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Aoi wants Sam to answer by Wednesday.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'lost-dog-story',
    title: 'Coco Comes Home',
    level: '中2〜中3（物語）',
    paragraphs: [
      'One Sunday morning, Riko found that her dog, Coco, was not in the yard. The gate was open. Riko and her parents looked ( A ) Coco everywhere near their house, but they could not find her.',
      'Riko was so sad that she could not eat lunch. Her father said, "Let\'s make posters with Coco\'s picture." They put the posters up ( B ) the station and the supermarket.',
      'That evening, the phone rang. A woman said, "I think I saw your dog near the river." Riko and her father ran to the river. It was getting dark, and they were worried.',
      'Then Riko heard a small bark. Coco was sitting under a bench, and she was shaking. When she saw Riko, she ran to her and jumped ( C ) her arms. Riko held Coco tightly and cried.',
      'The next day, Riko visited the woman to say thank you. She also checked the gate every morning ( D ) that day.',
    ],
    ja: [
      'ある日曜日の朝、リコは飼い犬のココが庭にいないことに気づきました。門が開いていました。リコと両親は家の近くをあちこちさがしましたが、ココは見つかりませんでした。',
      'リコはとても悲しくて、お昼ごはんを食べられませんでした。お父さんが「ココの写真でポスターをつくろう」と言いました。2人は駅とスーパーの近くにポスターをはりました。',
      'その夜、電話が鳴りました。女の人が「川の近くでお宅の犬を見たと思います」と言いました。リコとお父さんは川へ走りました。暗くなってきていて、2人は心配でした。',
      'そのとき、リコは小さなほえ声を聞きました。ココがベンチの下にすわって、ふるえていました。リコを見ると、ココは走ってきてリコのうでの中にとびこみました。リコはココをぎゅっとだきしめて泣きました。',
      '次の日、リコはお礼を言いにその女の人をたずねました。また、その日から毎朝門をたしかめるようにしました。',
    ],
    blanks: [
      { id: 'A', choices: ['after', 'at', 'for', 'like'], answer: 2, why: 'look for 〜 で「〜をさがす」。' },
      { id: 'B', choices: ['between', 'near', 'since', 'during'], answer: 1, why: 'near 〜 で「〜の近くに」。' },
      { id: 'C', choices: ['at', 'into', 'on', 'over'], answer: 1, why: 'jump into her arms で「うでの中にとびこむ」。' },
      { id: 'D', choices: ['by', 'for', 'from', 'until'], answer: 2, why: 'from that day で「その日から」。' },
    ],
    refer: { phrase: 'she was shaking', word: 'she', choices: ['Coco', 'Riko', 'the woman', "Riko's mother"], answer: 0, why: 'ベンチの下でふるえていたのは犬のココ。' },
    summary: {
      text: "Riko's dog Coco ran away, but a woman saw her near the ( 1 ). After that day, Riko checked the ( 2 ) every morning.",
      blanks: [
        { choices: ['station', 'river', 'school', 'supermarket'], answer: 1, why: '第3段落「川の近くで犬を見た」。' },
        { choices: ['gate', 'posters', 'phone', 'bench'], answer: 0, why: '第5段落「毎朝門をたしかめるようにした」。' },
      ],
    },
    seq: { events: ['Riko heard a small bark near the river.', 'Riko and her father put up posters.', 'A woman called Riko\'s family.', 'Riko found that Coco was not in the yard.'], answer: [3, 1, 2, 0], why: 'ココがいないと気づく → ポスターをはる → 女の人から電話 → 川の近くでほえ声を聞く。' },
    tf: [
      { statement: 'Coco was in the yard on Sunday morning.', answer: false, why: '庭にいなかった。' },
      { statement: 'Riko and her father made posters with Coco\'s picture.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'A man called Riko\'s family in the evening.', answer: false, why: '電話をくれたのは女の人。' },
      { statement: 'Coco was found near the river.', answer: true, why: '第3・4段落の内容と合う。' },
      { statement: 'Riko started to check the gate every morning.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'vending-machines',
    title: 'Vending Machines in Japan',
    level: '中3（説明文）',
    paragraphs: [
      'If you walk around a town in Japan, you will see many vending machines. They are on the streets, at stations, and even ( A ) the mountains. Many visitors from other countries are surprised to see so many of them.',
      'Most vending machines sell drinks, but some sell other things, such as ice cream, rice, or umbrellas. In winter, many machines sell hot drinks, so you can buy a warm drink ( B ) a cold day.',
      'Why are there so many vending machines in Japan? One reason is that Japan is a safe country. In some countries, people might break machines to steal money, but this rarely happens in Japan.',
      'Vending machines can also help people when a disaster happens. Some of them can give out free drinks ( C ) an earthquake. Others show news on a screen.',
      'However, vending machines use a lot of electricity. Companies are now making new machines that use ( D ) energy than before. These machines are better for the environment.',
    ],
    ja: [
      '日本の町を歩くと、たくさんの自動販売機を見かけるでしょう。道ばたや駅、さらには山の中にもあります。外国から来た多くの人は、その多さにおどろきます。',
      'ほとんどの自動販売機は飲み物を売っていますが、アイスクリームやお米、かさなど、ほかのものを売っているものもあります。冬には多くの機械があたたかい飲み物を売るので、寒い日にあたたかい飲み物を買うことができます。',
      'なぜ日本にはこんなに自動販売機が多いのでしょうか。理由の1つは、日本が安全な国だということです。国によっては、お金をぬすむために機械をこわす人もいるかもしれませんが、日本ではそういうことはめったに起こりません。',
      '自動販売機は、災害が起きたときに人々を助けることもできます。地震のあとに無料で飲み物を出せるものもあります。画面にニュースを表示するものもあります。',
      'しかし、自動販売機はたくさんの電気を使います。今、会社は以前より使うエネルギーが少ない新しい機械をつくっています。こうした機械は環境にとってよりよいのです。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'to'], answer: 1, why: 'in the mountains で「山の中に」。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 2, why: '特定の日は on（on a cold day）。' },
      { id: 'C', choices: ['after', 'before', 'since', 'until'], answer: 0, why: '「地震のあとに」なので after。' },
      { id: 'D', choices: ['less', 'little', 'more', 'much'], answer: 0, why: '後ろに than があり「より少ない」なので less。' },
    ],
    vocab: [{ word: 'rarely', choices: ['めったに〜ない', 'いつも', 'すぐに', 'ときどき'], answer: 0, why: '日本は安全な国だという説明なので、機械がこわされることは「めったにない」。' }],
    insert: { sentence: 'So it is easy to keep them outside all day and night.', after: [0, 1, 2, 3], answer: 2, why: '「日本は安全なので機械がこわされることがめったにない」という第3段落の理由のあとに、「だから一日中外に置いておける」と続く。' },
    tf: [
      { statement: 'There are vending machines even in the mountains in Japan.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'All vending machines in Japan sell only drinks.', answer: false, why: 'アイスクリームやお米、かさを売るものもある。' },
      { statement: 'People often break vending machines in Japan.', answer: false, why: '日本ではめったに起こらない。' },
      { statement: 'Some vending machines can give out free drinks after an earthquake.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'New vending machines use more energy than old ones.', answer: false, why: '以前より使うエネルギーが少ない。' },
    ],
  },
  {
    id: 'talk-birthday',
    title: 'A Birthday Plan',
    level: '中2（会話文）',
    paragraphs: [
      'Kaito: Hey, Lisa. Next Friday is Ms. Mori\'s birthday. Why don\'t we do something ( A ) her?',
      'Lisa: That\'s a nice idea! She always helps us with our English. What should we do?',
      'Kaito: How about writing messages to her? Everyone in our class can write a short message on a card.',
      'Lisa: Great. We can put all the cards ( B ) a big album. I\'m good at drawing, so I will make the cover.',
      'Kaito: Thanks! I will ask our classmates to write their messages ( C ) Wednesday.',
      'Lisa: OK. When should we give it to her?',
      'Kaito: Let\'s give it to her at the end of her class on Friday. I\'m sure she will be surprised.',
      'Lisa: I can\'t wait ( D ) see her face!',
    ],
    ja: [
      'カイト：ねえ、リサ。来週の金曜日は森先生の誕生日だよ。先生のために何かしない？',
      'リサ：いい考えね！ 先生はいつも英語で私たちを助けてくれるもの。何をしたらいいかな？',
      'カイト：先生にメッセージを書くのはどう？ クラスのみんながカードに短いメッセージを書けるよ。',
      'リサ：いいね。全部のカードを大きなアルバムに入れられるね。私は絵をかくのが得意だから、表紙をつくるよ。',
      'カイト：ありがとう！ ぼくは、水曜日までにメッセージを書くようにクラスのみんなにたのむよ。',
      'リサ：わかった。いつ先生にわたそうか？',
      'カイト：金曜日の先生の授業の最後にわたそう。きっとおどろくよ。',
      'リサ：先生の顔を見るのが待ちきれないわ！',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'do something for 人 で「人のために何かする」。' },
      { id: 'B', choices: ['at', 'into', 'on', 'over'], answer: 1, why: 'put A into B で「A を B の中に入れる」。' },
      { id: 'C', choices: ['by', 'for', 'since', 'until'], answer: 0, why: '「水曜日までに（締め切り）」なので by。' },
      { id: 'D', choices: ['for', 'to', 'with', 'at'], answer: 1, why: "can't wait to 〜 で「〜するのが待ちきれない」。" },
    ],
    qa: [{ q: 'What will Lisa make?', choices: ['The cover of the album.', 'A birthday cake.', 'A card for Kaito.', 'A song.'], answer: 0, why: 'リサは「表紙をつくる」と言っている。' }],
    tf: [
      { statement: "Ms. Mori's birthday is next Friday.", answer: true, why: '最初の発言と合う。' },
      { statement: 'Ms. Mori is their math teacher.', answer: false, why: '英語で助けてくれる先生（英語の先生）。' },
      { statement: 'Only Kaito and Lisa will write messages.', answer: false, why: 'クラスのみんなが書く。' },
      { statement: 'Lisa is good at drawing.', answer: true, why: 'リサの2つ目の発言と合う。' },
      { statement: 'They will give the album to Ms. Mori on Wednesday.', answer: false, why: 'わたすのは金曜日の授業の最後。' },
    ],
  },
  {
    id: 'piano-contest',
    title: 'The Wrong Note',
    level: '中2〜中3（物語）',
    paragraphs: [
      'Mei had practiced the piano for three months for the music contest. She played the same song every day ( A ) she could play it without looking at the music.',
      'On the day of the contest, her hands were cold and shaking. When she started to play, everything went well at first. But in the middle of the song, she played a wrong note. The hall was very quiet, and Mei almost stopped.',
      'Then she remembered her teacher\'s words: "If you make a mistake, just keep playing. Nobody will remember one small mistake ( B ) you continue with a smile." Mei took a deep breath and kept playing until the end.',
      'She did not win a prize. She was disappointed, but after the contest, an old man came up ( C ) her. "Your music made me happy," he said. "You did not give up even after the mistake. That was wonderful."',
      'Mei smiled. She learned that music is not only about being perfect. Now she enjoys playing the piano more ( D ) before.',
    ],
    ja: [
      'メイは音楽コンクールのために3か月間ピアノを練習してきました。楽譜を見なくてもひけるようになるまで、毎日同じ曲をひきました。',
      'コンクールの日、メイの手は冷たくふるえていました。ひきはじめたときは、最初はすべてうまくいきました。でも曲のとちゅうで、まちがった音をひいてしまいました。ホールはとても静かで、メイはあやうく止まりそうになりました。',
      'そのとき、先生の言葉を思い出しました。「まちがえても、そのままひき続けなさい。笑顔で続ければ、小さなまちがい1つなんてだれも覚えていないよ」。メイは深呼吸をして、最後までひき続けました。',
      'メイは賞をとれませんでした。がっかりしましたが、コンクールのあと、1人のおじいさんが近づいてきました。「きみの音楽で幸せな気持ちになったよ」と彼は言いました。「まちがえたあともあきらめなかった。すばらしかったよ」。',
      'メイはほほえみました。音楽は完ぺきであることだけではないと学んだのです。今では、以前よりもピアノをひくのを楽しんでいます。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'if', 'until', 'while'], answer: 2, why: '「ひけるようになるまで」なので until。' },
      { id: 'B', choices: ['but', 'if', 'or', 'so'], answer: 1, why: '「笑顔で続ければ」なので if。' },
      { id: 'C', choices: ['at', 'for', 'on', 'to'], answer: 3, why: 'come up to 人 で「人に近づいてくる」。' },
      { id: 'D', choices: ['as', 'so', 'than', 'that'], answer: 2, why: 'more 〜 than before で「以前より〜」。' },
    ],
    vocab: [{ word: 'disappointed', choices: ['がっかりした', 'うれしい', 'ねむい', 'いそがしい'], answer: 0, why: '賞をとれなかったあとの気持ちで、but のあとに明るい出来事が続くので「がっかりした」。' }],
    summary: {
      text: 'Mei made a ( 1 ) during the contest, but she did not stop. She did not win a prize, but she learned that music is not only about being ( 2 ).',
      blanks: [
        { choices: ['mistake', 'friend', 'cake', 'promise'], answer: 0, why: '第2段落「まちがった音をひいてしまった」。' },
        { choices: ['famous', 'perfect', 'rich', 'tall'], answer: 1, why: '第5段落「音楽は完ぺきであることだけではない」。' },
      ],
    },
    seq: { events: ['An old man talked to Mei.', 'Mei played a wrong note.', 'Mei practiced the same song every day.', 'Mei remembered her teacher\'s words.'], answer: [2, 1, 3, 0], why: '毎日練習 → まちがった音をひく → 先生の言葉を思い出す → おじいさんが話しかける。' },
    tf: [
      { statement: 'Mei practiced the piano for three months.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Mei played without any mistakes in the contest.', answer: false, why: 'とちゅうでまちがった音をひいた。' },
      { statement: 'Mei stopped playing in the middle of the song.', answer: false, why: '最後までひき続けた。' },
      { statement: 'Mei won first prize in the contest.', answer: false, why: '賞はとれなかった。' },
      { statement: 'An old man said that her music made him happy.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'penguins',
    title: 'Birds That Cannot Fly',
    level: '中3（説明文）',
    paragraphs: [
      'Penguins are birds, but they cannot fly. Instead, they are very good ( A ) swimming. Their wings work like the fins of a fish, and they can swim very fast under the water.',
      'Most penguins live in the southern part of the world. Some of them live in very cold places like Antarctica, but others live in warmer places, ( B ) South Africa and the Galapagos Islands.',
      'Penguins have thick feathers and a layer of fat under their skin. These keep their bodies warm in cold water. In the coldest places, penguins also stand close ( C ) each other in large groups to stay warm.',
      'Penguins eat fish and other small sea animals. Some kinds of penguins can dive more than 500 meters deep to catch food.',
      'Today, some kinds of penguins are in danger because the sea is getting warmer and there is less food for them. Protecting the sea is important ( D ) penguins to survive.',
    ],
    ja: [
      'ペンギンは鳥ですが、飛ぶことができません。そのかわり、泳ぐのがとても得意です。つばさは魚のひれのようにはたらき、水の中をとても速く泳ぐことができます。',
      'ほとんどのペンギンは、地球の南のほうにすんでいます。南極のようなとても寒い場所にすむものもいれば、南アフリカやガラパゴス諸島のような、もっとあたたかい場所にすむものもいます。',
      'ペンギンには厚い羽毛と、皮ふの下の脂肪の層があります。これらが冷たい水の中で体をあたたかく保ちます。いちばん寒い場所では、ペンギンはあたたかさを保つために、大きな群れでおたがいに寄りそって立ちもします。',
      'ペンギンは魚やほかの小さな海の動物を食べます。えさをとるために500メートル以上の深さまでもぐれる種類もいます。',
      '今日、海があたたかくなり、えさが少なくなっているため、いくつかの種類のペンギンが危機にあります。ペンギンが生きのびるためには、海を守ることが大切なのです。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', 'on'], answer: 0, why: 'be good at 〜ing で「〜するのが得意だ」。' },
      { id: 'B', choices: ['as', 'like', 'such', 'so'], answer: 1, why: 'like 〜 で「〜のような（たとえば）」。such なら such as が必要。' },
      { id: 'C', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'close to 〜 で「〜の近くに」。' },
      { id: 'D', choices: ['at', 'by', 'for', 'of'], answer: 2, why: 'It is important for 人 to 〜 の形で「人が〜するために大切」。' },
    ],
    vocab: [{ word: 'survive', choices: ['生きのびる', '飛び立つ', 'ねむる', '旅をする'], answer: 0, why: '危機にあるペンギンのために海を守る、という流れなので「生きのびる」。' }],
    insert: { sentence: 'Thanks to them, penguins can live even in icy water.', after: [0, 1, 2, 3], answer: 2, why: '「厚い羽毛と脂肪（them）のおかげで」なので、それらを説明した第3段落のあとに入る。' },
    qa: [{ q: 'Why are some kinds of penguins in danger today?', choices: ['Because the sea is getting warmer and there is less food.', 'Because they cannot swim well.', 'Because people eat too many penguins.', 'Because it is too cold in Antarctica.'], answer: 0, why: '第5段落「海があたたかくなり、えさが少なくなっている」。' }],
    tf: [
      { statement: 'Penguins can fly very high.', answer: false, why: 'ペンギンは飛べない。' },
      { statement: 'All penguins live in very cold places.', answer: false, why: 'あたたかい場所にすむものもいる。' },
      { statement: 'Penguins have a layer of fat under their skin.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Some penguins can dive more than 500 meters deep.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'The writer says the warmer sea is good for penguins.', answer: false, why: '海があたたかくなり、えさが少なくなっている。' },
    ],
  },
  {
    id: 'speech-reading',
    title: 'Why I Love Reading (Speech)',
    level: '中3（スピーチ）',
    paragraphs: [
      'Good afternoon, everyone. Do you like reading books? I didn\'t like it ( A ) I was in elementary school. I thought reading was boring.',
      'But two years ago, I broke my arm and had to stay home ( B ) a month. I could not play sports, so my mother gave me a book about a boy who traveled around the world. I could not stop reading it.',
      'Through that book, I visited many countries in my mind. I learned about different cultures and people. I realized that books can take us ( C ) places we have never been.',
      'Since then, I have read more than fifty books. Now I always carry a book in my bag. When I have free time, I read it on the train or during lunch break.',
      'Reading is like traveling without a ticket. I hope you will find a book you love, too. Thank you ( D ) listening.',
    ],
    ja: [
      'みなさん、こんにちは。本を読むのは好きですか。私は小学生のころ、読書が好きではありませんでした。読書はつまらないと思っていました。',
      'でも2年前、うでを骨折して、1か月家にいなければなりませんでした。スポーツができなかったので、母が世界中を旅した男の子についての本をくれました。私は読むのをやめられませんでした。',
      'その本を通して、私は心の中でたくさんの国をおとずれました。ちがう文化や人々について学びました。本は、行ったことのない場所に私たちを連れて行ってくれるのだと気づきました。',
      'それ以来、私は50さつ以上の本を読みました。今ではいつもかばんに本を入れています。ひまな時間があると、電車の中や昼休みに読みます。',
      '読書は、切符のいらない旅のようなものです。みなさんも好きな本が見つかるといいなと思います。ご清聴ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'if', 'until', 'when'], answer: 3, why: '「小学生だったころ」なので when。' },
      { id: 'B', choices: ['during', 'for', 'in', 'since'], answer: 1, why: '「1か月（の間）」のように期間の長さは for。' },
      { id: 'C', choices: ['at', 'for', 'in', 'to'], answer: 3, why: 'take 人 to 場所 で「人を場所へ連れて行く」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'Thank you for 〜ing で「〜してくれてありがとう」。' },
    ],
    summary: {
      text: 'The speaker did not like reading at first. But after reading a book about a boy who ( 1 ) around the world, the speaker started to love books. Now the speaker always ( 2 ) a book.',
      blanks: [
        { choices: ['traveled', 'cooked', 'slept', 'studied'], answer: 0, why: '第2段落「世界中を旅した男の子についての本」。' },
        { choices: ['sells', 'carries', 'writes', 'loses'], answer: 1, why: '第4段落「いつもかばんに本を入れている」。' },
      ],
    },
    tf: [
      { statement: 'The speaker loved reading in elementary school.', answer: false, why: '小学生のころは好きではなかった。' },
      { statement: 'The speaker broke an arm two years ago.', answer: true, why: '第2段落の内容と合う。' },
      { statement: "The speaker's father gave the speaker a book.", answer: false, why: '本をくれたのは母。' },
      { statement: 'The speaker has read more than fifty books.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'The speaker reads books on the train.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'email-thanks',
    title: 'A Thank-You Email',
    level: '中2〜中3（メール）',
    paragraphs: [
      'Dear Mr. and Mrs. Green,',
      'Thank you very much ( A ) letting me stay at your house last week. I had a wonderful time in Australia.',
      'I will never forget the day we went to the beach. It was my first time to see kangaroos in the wild. I also enjoyed the dinner you made for me ( B ) my last night. The meat pie was delicious!',
      'Before I came to Australia, I was worried ( C ) my English. But you always spoke slowly and listened to me kindly, so I became more confident. Now I want to study English harder.',
      'I am sending you some photos I took during my stay. I hope you can visit Japan someday. I would like to show you around my town. Please say hello ( D ) Lucy and her cat, Milo.',
      'With love,\nHaruka',
    ],
    ja: [
      'グリーンさんご夫妻へ',
      '先週はお家に泊めてくださって、本当にありがとうございました。オーストラリアでとてもすばらしい時間を過ごしました。',
      'みんなで海に行った日のことは決してわすれません。野生のカンガルーを見たのは初めてでした。最後の夜につくってくださった夕食も楽しかったです。ミートパイがとてもおいしかったです！',
      'オーストラリアに来る前、私は自分の英語が心配でした。でも、いつもゆっくり話してくださり、やさしく話を聞いてくださったので、自信がつきました。今は英語をもっとがんばって勉強したいと思っています。',
      '滞在中にとった写真を何まいか送ります。いつか日本に来ていただけたらうれしいです。私の町を案内したいです。ルーシーとねこのマイロによろしく伝えてください。',
      '心をこめて　ハルカより',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'of', 'to'], answer: 1, why: 'Thank you for 〜ing で「〜してくれてありがとう」。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 2, why: '特定の日（夜）は on（on my last night）。' },
      { id: 'C', choices: ['about', 'at', 'for', 'with'], answer: 0, why: 'be worried about 〜 で「〜を心配している」。' },
      { id: 'D', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'say hello to 人 で「人によろしく伝える」。' },
    ],
    vocab: [{ word: 'confident', choices: ['自信のある', 'つかれた', 'はずかしい', 'さびしい'], answer: 0, why: '英語が心配だったが、やさしく聞いてもらえたので「自信がついた」という流れ。' }],
    tf: [
      { statement: 'Haruka stayed with the Green family last week.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Haruka saw kangaroos in the wild for the first time.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Haruka did not like the meat pie.', answer: false, why: 'とてもおいしかったと言っている。' },
      { statement: 'Haruka was confident in her English before the trip.', answer: false, why: '来る前は英語が心配だった。' },
      { statement: 'Haruka wants to show the Greens around her town.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'bicycle-city',
    title: 'Cities for Bicycles',
    level: '中3（説明文）',
    paragraphs: [
      'In some cities around the world, many people go to work or school ( A ) bicycle. Amsterdam in the Netherlands is one famous example. There are more bicycles than people in the city.',
      'Why do people there ride bicycles so much? One reason is that the land is flat, so riding is easy. Another reason is that the city has many wide roads only for bicycles. Riders do not have to worry ( B ) cars.',
      'Riding a bicycle has many good points. It does not make the air dirty, and it is good for our health. It is also cheaper than using a car or a train.',
      'However, there are some problems, too. In big cities, there are so many bicycles that it is sometimes hard to find a place to park them. Some people also ride too fast and cause accidents.',
      'More and more cities are now trying to make roads that are safe ( C ) bicycles. If we follow the rules and ride carefully, bicycles can make our cities cleaner ( D ) healthier.',
    ],
    ja: [
      '世界のいくつかの都市では、多くの人が自転車で仕事や学校に行きます。オランダのアムステルダムは有名な例の1つです。その都市には、人よりも多くの自転車があります。',
      'なぜそこの人たちはそんなに自転車に乗るのでしょうか。理由の1つは、土地が平らなので、乗るのが楽だということです。もう1つの理由は、その都市には自転車専用の広い道がたくさんあることです。自転車に乗る人は車を心配する必要がありません。',
      '自転車に乗ることにはよい点がたくさんあります。空気をよごさないし、健康にもよいです。車や電車を使うより安くもあります。',
      'しかし、問題もあります。大きな都市では自転車がとても多いので、とめる場所を見つけるのが難しいことがあります。また、スピードを出しすぎて事故を起こす人もいます。',
      '今、ますます多くの都市が、自転車にとって安全な道をつくろうとしています。ルールを守って注意して乗れば、自転車は私たちの町をよりきれいで、より健康的にしてくれるでしょう。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'in', 'on', 'with'], answer: 0, why: 'by bicycle で「自転車で」（交通手段の by。a / the はつけない）。' },
      { id: 'B', choices: ['about', 'at', 'for', 'to'], answer: 0, why: 'worry about 〜 で「〜を心配する」。' },
      { id: 'C', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'safe for 〜 で「〜にとって安全な」。' },
      { id: 'D', choices: ['and', 'but', 'or', 'so'], answer: 0, why: 'cleaner and healthier で「よりきれいで、より健康的に」。' },
    ],
    insert: { sentence: 'For these reasons, many people choose bicycles instead of cars.', after: [0, 1, 2, 3], answer: 2, why: '第3段落で自転車のよい点（空気・健康・安い）を説明したあとに「これらの理由で」と続く。' },
    tf: [
      { statement: 'There are more bicycles than people in Amsterdam.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'The land of Amsterdam has many mountains.', answer: false, why: '土地は平ら。' },
      { statement: 'Riding a bicycle makes the air dirty.', answer: false, why: '空気をよごさない。' },
      { statement: 'It is sometimes hard to find a place to park bicycles in big cities.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'More cities are trying to make roads safe for bicycles.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'talk-lost-way',
    title: 'Asking the Way',
    level: '中2（会話文）',
    paragraphs: [
      'Tourist: Excuse me. Could you tell me how to get ( A ) the city museum?',
      'Sora: Sure. Go straight along this street and turn left at the second corner.',
      'Tourist: The second corner. OK. Is it far ( B ) here?',
      'Sora: No, it takes about ten minutes on foot. You will see a big park on your right. The museum is next ( C ) the park.',
      'Tourist: Thank you. Do you know what time it closes?',
      'Sora: I think it closes at five. You still have two hours. Oh, and there is a nice café in the museum. You should try their cake.',
      'Tourist: That sounds great! You are very kind. Thank you ( D ) your help.',
      'Sora: You\'re welcome. Enjoy your visit!',
    ],
    ja: [
      '観光客：すみません。市立博物館への行き方を教えていただけますか。',
      'ソラ：いいですよ。この通りをまっすぐ行って、2つ目の角を左に曲がってください。',
      '観光客：2つ目の角ですね。わかりました。ここから遠いですか。',
      'ソラ：いいえ、歩いて10分くらいです。右側に大きな公園が見えます。博物館は公園のとなりです。',
      '観光客：ありがとう。何時に閉まるか知っていますか。',
      'ソラ：5時に閉まると思います。まだ2時間ありますよ。あ、それから博物館の中にすてきなカフェがあります。そこのケーキをぜひ食べてみてください。',
      '観光客：それはいいですね！ とても親切ですね。助けてくれてありがとう。',
      'ソラ：どういたしまして。楽しんでください！',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', 'to'], answer: 3, why: 'get to 〜 で「〜に着く」。' },
      { id: 'B', choices: ['at', 'from', 'of', 'to'], answer: 1, why: 'far from 〜 で「〜から遠い」。' },
      { id: 'C', choices: ['at', 'by', 'for', 'to'], answer: 3, why: 'next to 〜 で「〜のとなりに」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'Thank you for 〜 で「〜をありがとう」。' },
    ],
    qa: [{ q: 'How long does it take to walk to the museum?', choices: ['About ten minutes.', 'About two hours.', 'About five minutes.', 'About an hour.'], answer: 0, why: 'ソラの2つ目の発言「歩いて10分くらい」。' }],
    tf: [
      { statement: 'The tourist wants to go to the city museum.', answer: true, why: '最初の発言と合う。' },
      { statement: 'The tourist should turn right at the second corner.', answer: false, why: '2つ目の角を左に曲がる。' },
      { statement: 'The museum is next to a park.', answer: true, why: 'ソラの2つ目の発言と合う。' },
      { statement: 'The museum closes at seven.', answer: false, why: '5時に閉まると思うと言っている。' },
      { statement: 'There is a café in the museum.', answer: true, why: 'ソラの3つ目の発言と合う。' },
    ],
  },
  {
    id: 'origami-crane',
    title: 'A Thousand Paper Cranes',
    level: '中2〜中3（物語）',
    paragraphs: [
      'When Taku\'s grandmother went into the hospital, he wanted to do something ( A ) her. His mother told him about senbazuru, a set of one thousand paper cranes. People make them to wish for someone\'s good health.',
      'Taku did not know how to fold a crane, so he watched a video and practiced. His first cranes did not look good, but after a while, he could fold one in two minutes.',
      'One thousand was a big number. Taku folded cranes every day after school. His friends at school heard about his plan and began to help him. Some of them stayed after class ( B ) fold cranes together.',
      'After three weeks, they finally had one thousand cranes. Taku put them on strings and took them to the hospital. When his grandmother saw them, she was so happy that she cried. "Thank you. I feel stronger already," she said.',
      'A month later, his grandmother left the hospital. She keeps the cranes in her living room. Taku learned that people can do big things ( C ) they work together. He also found that small actions can give someone hope ( D ) a hard time.',
    ],
    ja: [
      'タクのおばあさんが入院したとき、タクはおばあさんのために何かしたいと思いました。お母さんが千羽鶴のことを教えてくれました。だれかの健康をねがってつくる、千羽の折り鶴のことです。',
      'タクは鶴の折り方を知らなかったので、動画を見て練習しました。最初の鶴はうまくできませんでしたが、しばらくすると2分で1羽折れるようになりました。',
      '千は大きな数でした。タクは毎日放課後に鶴を折りました。学校の友だちがタクの計画を聞いて、手伝いはじめました。授業のあとに残って、いっしょに鶴を折ってくれる友だちもいました。',
      '3週間後、ついに千羽の鶴ができました。タクはそれらを糸に通して病院に持って行きました。おばあさんはそれを見て、うれしくて泣いてしまいました。「ありがとう。もう強くなった気がするよ」とおばあさんは言いました。',
      '1か月後、おばあさんは退院しました。おばあさんは居間に鶴をかざっています。タクは、みんなで力を合わせれば大きなことができると学びました。また、小さな行動が、つらいときにだれかに希望をあたえられることにも気づきました。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'do something for 人 で「人のために何かする」。' },
      { id: 'B', choices: ['for', 'of', 'to', 'with'], answer: 2, why: '「鶴を折るために」残ったので、目的を表す不定詞 to。' },
      { id: 'C', choices: ['because', 'but', 'if', 'or'], answer: 2, why: '「力を合わせれば」なので if。' },
      { id: 'D', choices: ['during', 'for', 'since', 'while'], answer: 0, why: '後ろが名詞（a hard time）なので前置詞 during。' },
    ],
    seq: { events: ['Taku took the cranes to the hospital.', 'Taku watched a video to learn how to fold a crane.', "Taku's grandmother left the hospital.", "Taku's friends began to help him."], answer: [1, 3, 0, 2], why: '動画で練習 → 友だちが手伝う → 病院に持って行く → おばあさんが退院。' },
    qa: [{ q: 'Who helped Taku fold the cranes?', choices: ['His friends at school.', 'His grandmother.', 'A doctor.', 'Nobody.'], answer: 0, why: '第3段落「学校の友だちが手伝いはじめた」。' }],
    tf: [
      { statement: "Taku's mother told him about senbazuru.", answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Taku could fold cranes well from the beginning.', answer: false, why: '最初の鶴はうまくできなかった。' },
      { statement: 'Taku made all the cranes by himself.', answer: false, why: '友だちも手伝った。' },
      { statement: 'It took three weeks to make one thousand cranes.', answer: true, why: '第4段落の内容と合う。' },
      { statement: "Taku's grandmother keeps the cranes in her living room.", answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'food-loss',
    title: 'Food We Throw Away',
    level: '中3（説明文）',
    paragraphs: [
      'Every day, a lot of food is thrown away ( A ) it can still be eaten. This is called "food loss." In Japan, millions of tons of food are wasted every year.',
      'Where does food loss come from? Some of it comes from stores and restaurants. For example, stores throw away bread and lunch boxes that are not sold ( B ) the end of the day. But a large part also comes from our homes.',
      'At home, people often buy too much food and forget to eat it. Others cook more than they need and throw away the rest. Some people also throw food away just because it is past the "best before" date, even though it is still safe.',
      'There are simple ways to reduce food loss. Before shopping, check what is already in your fridge. Buy only what you need. If you cannot finish a meal at a restaurant, ask if you can take the rest home.',
      'Some stores and groups are also working hard. They give food that is not sold ( C ) people who need it. If each of us is careful about the food we buy and cook, we can make a big difference ( D ) the future.',
    ],
    ja: [
      '毎日、まだ食べられるのにたくさんの食べ物が捨てられています。これは「食品ロス」と呼ばれています。日本では毎年、何百万トンもの食べ物がむだになっています。',
      '食品ロスはどこから出るのでしょうか。一部はお店やレストランから出ます。たとえば、お店は1日の終わりに売れなかったパンやお弁当を捨てます。しかし、大部分は私たちの家庭からも出ているのです。',
      '家では、食べ物を買いすぎて、食べるのをわすれてしまうことがよくあります。必要以上に料理をつくって、残りを捨ててしまう人もいます。また、まだ安全なのに「賞味期限」が過ぎたというだけで食べ物を捨ててしまう人もいます。',
      '食品ロスをへらすかんたんな方法があります。買い物の前に、冷蔵庫にもう何があるか確かめましょう。必要なものだけを買いましょう。レストランで食事を食べきれないときは、残りを持ち帰ってよいか聞いてみましょう。',
      'お店や団体も努力しています。売れなかった食べ物を、それを必要としている人たちにわたしているのです。一人ひとりが買う食べ物や料理する食べ物に気をつければ、未来に向けて大きなちがいを生むことができます。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'if', 'so', 'though'], answer: 3, why: '「まだ食べられるのに（捨てられる）」なので though。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 0, why: 'at the end of 〜 で「〜の終わりに」。' },
      { id: 'C', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'give 物 to 人 で「人に物をあたえる」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'for the future で「未来のために・未来に向けて」。' },
    ],
    summary: {
      text: 'Food loss comes from stores and also from our ( 1 ). To reduce it, we should buy only the food we ( 2 ).',
      blanks: [
        { choices: ['homes', 'schools', 'cars', 'parks'], answer: 0, why: '第2段落「大部分は家庭からも出ている」。' },
        { choices: ['need', 'sell', 'grow', 'draw'], answer: 0, why: '第4段落「必要なものだけを買いましょう」。' },
      ],
    },
    vocab: [{ word: 'reduce', choices: ['へらす', 'ふやす', '売る', '運ぶ'], answer: 0, why: '買い物の前に冷蔵庫を確かめる、必要なものだけ買う、という方法の説明なので「へらす」。' }],
    qa: [{ q: 'What should you do before shopping?', choices: ['Check what is already in your fridge.', 'Throw away old food.', 'Cook a lot of food.', 'Go to a restaurant.'], answer: 0, why: '第4段落「買い物の前に冷蔵庫に何があるか確かめる」。' }],
    tf: [
      { statement: 'Food loss means throwing away food that can still be eaten.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'All food loss comes from stores and restaurants.', answer: false, why: '家庭からも多く出ている。' },
      { statement: 'Some people throw away food that is still safe.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'The writer says we should buy a lot of food at once.', answer: false, why: '必要なものだけを買うように言っている。' },
      { statement: 'Some stores give unsold food to people who need it.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'speech-mistakes',
    title: "Don't Be Afraid of Mistakes (Speech)",
    level: '中3（スピーチ）',
    paragraphs: [
      'Hello, everyone. Today I want to talk about mistakes. When I entered junior high school, I was afraid ( A ) making mistakes in English class. I never raised my hand because I did not want other students to laugh at me.',
      'One day, our ALT, Ms. Brown, told us a story. When she came to Japan, she wanted to say "kawaii" to a baby, but she said "kowai" ( B ) mistake. The baby\'s mother laughed, and they became good friends after that.',
      'Ms. Brown said, "Mistakes are a part of learning. If you never make mistakes, you are not trying anything new." Her words changed my mind.',
      'Since then, I have tried to speak English as much as possible. I still make many mistakes, but I learn something from each one. Last month, I even talked with a tourist ( C ) English at the station.',
      'So, my message is this: don\'t be afraid of mistakes. They will help you grow. Thank you ( D ) listening.',
    ],
    ja: [
      'みなさん、こんにちは。今日はまちがいについてお話ししたいと思います。中学校に入ったとき、私は英語の授業でまちがえるのがこわかったです。ほかの生徒に笑われたくなかったので、手をあげたことがありませんでした。',
      'ある日、ALTのブラウン先生がある話をしてくれました。先生が日本に来たとき、赤ちゃんに「かわいい」と言いたかったのに、まちがえて「こわい」と言ってしまったそうです。赤ちゃんのお母さんは笑い、そのあと2人は仲のよい友だちになりました。',
      'ブラウン先生は「まちがいは学びの一部です。まちがえないなら、新しいことに何も挑戦していないということです」と言いました。その言葉で私の考えは変わりました。',
      'それ以来、私はできるだけ英語を話すようにしてきました。今でもたくさんまちがえますが、1つ1つから何かを学んでいます。先月は、駅で観光客と英語で話すこともできました。',
      'だから、私が伝えたいのはこれです。まちがいをおそれないでください。まちがいはみなさんを成長させてくれます。ご清聴ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'of', 'with'], answer: 2, why: 'be afraid of 〜ing で「〜するのがこわい」。' },
      { id: 'B', choices: ['at', 'by', 'in', 'on'], answer: 1, why: 'by mistake で「まちがえて」。' },
      { id: 'C', choices: ['by', 'in', 'on', 'with'], answer: 1, why: 'in English で「英語で」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 1, why: 'Thank you for 〜ing で「〜してくれてありがとう」。' },
    ],
    gist: [{ para: 1, choices: ['ブラウン先生のまちがいの話', 'ブラウン先生の家族', '赤ちゃんの育て方', '日本語のテスト'], answer: 0, why: '第2段落は、ブラウン先生が「かわいい」と「こわい」をまちがえた話。' }],
    qa: [{ q: 'What did Ms. Brown want to say to the baby?', choices: ['"Kawaii."', '"Kowai."', '"Hello."', '"Thank you."'], answer: 0, why: '第2段落「かわいいと言いたかったのに、こわいと言ってしまった」。' }],
    tf: [
      { statement: 'The speaker often raised a hand in English class in the first year.', answer: false, why: '笑われたくなくて手をあげたことがなかった。' },
      { statement: 'Ms. Brown said "kowai" to a baby by mistake.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Ms. Brown thinks mistakes are a part of learning.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'The speaker never makes mistakes now.', answer: false, why: '今でもたくさんまちがえている。' },
      { statement: 'The speaker talked with a tourist at the station last month.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'stray-kitten',
    title: 'The Kitten in the Rain',
    level: '中2〜中3（物語）',
    paragraphs: [
      'On a rainy afternoon, Ren was walking home when he heard a small sound ( A ) a box near the road. He looked inside and found a tiny kitten. It was wet and shaking.',
      'Ren took the kitten home and dried it with a towel. His mother was surprised, but she said, "We can take care of it ( B ) we find a family for it." Ren gave it some warm milk, and the kitten fell asleep.',
      'The next day, Ren and his mother took the kitten to an animal doctor. The doctor said the kitten was healthy. Ren made posters to find a new family for it and put them up at school.',
      'A week passed, but nobody called. Ren began to love the kitten more and more. He named her Mocha because of her brown fur. One evening, he asked his parents, "Can we keep Mocha?"',
      'His father thought for a while and said, "OK. But you have to take care of her every day." Ren was very happy. Now Mocha sleeps ( C ) his bed every night, and Ren never forgets to give her food ( D ) going to school.',
    ],
    ja: [
      '雨の午後、レンは家に帰るとちゅう、道のそばの箱から小さな音が聞こえました。中をのぞくと、小さな子ねこがいました。ぬれて、ふるえていました。',
      'レンは子ねこを家に連れて帰り、タオルでふいてあげました。お母さんはおどろきましたが、「家族が見つかるまでは世話をしてあげられるわね」と言いました。レンがあたたかいミルクをあげると、子ねこはねむってしまいました。',
      '次の日、レンとお母さんは子ねこを動物のお医者さんに連れて行きました。お医者さんは子ねこは健康だと言いました。レンは新しい家族を見つけるためのポスターをつくって、学校にはりました。',
      '1週間たちましたが、だれからも電話はありませんでした。レンはどんどん子ねこが好きになりました。茶色の毛だったので、モカと名前をつけました。ある晩、レンは両親に「モカを飼ってもいい？」とたずねました。',
      'お父さんはしばらく考えて、「いいよ。でも毎日世話をしないといけないよ」と言いました。レンはとても喜びました。今ではモカは毎晩レンのベッドの上でねていて、レンは学校に行く前にえさをあげるのを決してわすれません。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'from', 'on', 'to'], answer: 1, why: 'a sound from 〜 で「〜からの音」。' },
      { id: 'B', choices: ['by', 'since', 'until', 'while'], answer: 2, why: '「家族が見つかるまで（ずっと）」なので until。' },
      { id: 'C', choices: ['at', 'in', 'on', 'to'], answer: 2, why: 'on his bed で「ベッドの上で」。' },
      { id: 'D', choices: ['after', 'before', 'during', 'until'], answer: 1, why: '「学校に行く前に」なので before going。' },
    ],
    seq: { events: ['Ren named the kitten Mocha.', 'Ren found a kitten in a box.', 'Ren\'s father said Ren could keep Mocha.', 'Ren took the kitten to an animal doctor.'], answer: [1, 3, 0, 2], why: '箱で子ねこを見つける → 動物のお医者さん → モカと名づける → お父さんが飼ってよいと言う。' },
    qa: [{ q: 'Where did Ren find the kitten?', choices: ['In a box near the road.', 'At the animal doctor.', 'In his school.', 'Under his bed.'], answer: 0, why: '第1段落「道のそばの箱の中」。' }],
    tf: [
      { statement: 'Ren found the kitten on a sunny day.', answer: false, why: '雨の午後に見つけた。' },
      { statement: "Ren's mother said they could take care of the kitten for a while.", answer: true, why: '第2段落の内容と合う。' },
      { statement: 'The doctor said the kitten was sick.', answer: false, why: '健康だと言った。' },
      { statement: 'Ren named the kitten Mocha because of her brown fur.', answer: true, why: '第4段落の内容と合う。' },
      { statement: "Ren's father said Ren had to take care of Mocha every day.", answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'hand-washing',
    title: 'The Power of Washing Hands',
    level: '中3（説明文）',
    paragraphs: [
      'Washing your hands may seem like a small thing, but it is one of the easiest ways to protect yourself ( A ) getting sick. Our hands touch many things every day, such as door handles, phones, and money.',
      'Germs that we cannot see are on many of these things. When we touch our eyes, nose, or mouth with dirty hands, the germs can enter our bodies.',
      'To wash your hands well, use soap and wash for about twenty seconds. Do not forget to wash between your fingers and under your nails. Then dry your hands ( B ) a clean towel.',
      'It is especially important to wash your hands before eating, after using the bathroom, and when you come home ( C ) outside. Many schools in Japan put up posters to remind students to do this.',
      'Washing hands does not cost much money, and anyone can do it. If everyone does it carefully, we can stop many illnesses ( D ) spreading.',
    ],
    ja: [
      '手をあらうことは小さなことに思えるかもしれませんが、病気になるのを防ぐいちばんかんたんな方法の1つです。私たちの手は、ドアの取っ手や電話、お金など、毎日たくさんのものにさわっています。',
      'これらのものの多くには、目に見えない細菌がついています。よごれた手で目や鼻、口にさわると、細菌が体の中に入ってしまうことがあります。',
      '手をしっかりあらうには、せっけんを使って20秒くらいあらいましょう。指の間やつめの下をあらうのもわすれないでください。それから、清潔なタオルで手をふきましょう。',
      '食べる前、トイレを使ったあと、外から帰ったときに手をあらうことは特に大切です。日本の多くの学校では、生徒にこのことを思い出させるためのポスターをはっています。',
      '手あらいはあまりお金がかからず、だれにでもできます。みんながていねいにすれば、多くの病気が広がるのを止めることができます。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'from', 'of', 'with'], answer: 1, why: 'protect A from 〜ing で「A を〜から守る」。' },
      { id: 'B', choices: ['at', 'by', 'for', 'with'], answer: 3, why: 'with a towel で「タオルで（道具）」。' },
      { id: 'C', choices: ['at', 'from', 'in', 'to'], answer: 1, why: 'come home from outside で「外から帰る」。' },
      { id: 'D', choices: ['at', 'for', 'from', 'to'], answer: 2, why: 'stop A from 〜ing で「A が〜するのを止める」。' },
    ],
    vocab: [{ word: 'Germs', choices: ['細菌', '宝石', '野菜', '雨つぶ'], answer: 0, why: '目に見えず、体に入ると病気の原因になるもの＝細菌。' }],
    insert: { sentence: 'So it is easy for germs to get on our hands.', after: [0, 1, 2, 3], answer: 0, why: '第1段落の「手は毎日たくさんのものにさわる」から「だから細菌が手につきやすい」と続く。' },
    tf: [
      { statement: 'Washing hands is a difficult way to protect ourselves.', answer: false, why: 'いちばんかんたんな方法の1つ。' },
      { statement: 'Germs can enter our bodies when we touch our mouth with dirty hands.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'The writer says we should wash our hands for about five seconds.', answer: false, why: '20秒くらい。' },
      { statement: 'It is important to wash hands before eating.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Washing hands costs a lot of money.', answer: false, why: 'あまりお金がかからない。' },
    ],
  },
  {
    id: 'email-club',
    title: 'Join Our Science Club!',
    level: '中2〜中3（メール）',
    paragraphs: [
      'Hi everyone,',
      'This is Daichi from the science club. We are looking ( A ) new members! Our club meets every Tuesday and Thursday after school in Science Room 2.',
      'In our club, we do many kinds of experiments. Last month, we made slime and tried to make a small rocket ( B ) water and air. It flew more than twenty meters!',
      'You do not need to be good at science to join. Many of our members joined just because they thought experiments looked fun. Our teacher, Mr. Ito, will help you if you have any questions.',
      'If you are interested, please come to Science Room 2 ( C ) next Tuesday. You can watch our activities before you decide. Please reply ( D ) this email if you have any questions.',
      'Hope to see you soon!\nDaichi',
    ],
    ja: [
      'みなさん、こんにちは。',
      '科学部のダイチです。新しい部員をさがしています！ 部活は毎週火曜日と木曜日の放課後に、第2理科室で活動しています。',
      '科学部では、いろいろな実験をします。先月は、スライムをつくったり、水と空気で小さなロケットをつくってみたりしました。ロケットは20メートル以上飛びました！',
      '入部するのに理科が得意である必要はありません。部員の多くは、実験がおもしろそうだと思ったという理由だけで入りました。わからないことがあれば、顧問の伊藤先生が助けてくれます。',
      '興味があれば、次の火曜日に第2理科室に来てください。決める前に活動を見学できます。質問があれば、このメールに返信してください。',
      'もうすぐ会えるといいな！ ダイチより',
    ],
    blanks: [
      { id: 'A', choices: ['after', 'at', 'for', 'like'], answer: 2, why: 'look for 〜 で「〜をさがす」。' },
      { id: 'B', choices: ['at', 'by', 'of', 'with'], answer: 3, why: 'with water and air で「水と空気を使って」。' },
      { id: 'C', choices: ['at', 'in', 'on', '（何も入らない）'], answer: 3, why: 'next Tuesday の前には前置詞をつけない。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'reply to 〜 で「〜に返信する」。' },
    ],
    qa: [{ q: 'How far did the small rocket fly?', choices: ['More than twenty meters.', 'About two meters.', 'One hundred meters.', 'It did not fly.'], answer: 0, why: '第3段落「20メートル以上飛んだ」。' }],
    tf: [
      { statement: 'The science club meets every Monday and Friday.', answer: false, why: '火曜日と木曜日。' },
      { statement: 'The club made slime last month.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'You have to be good at science to join the club.', answer: false, why: '得意である必要はない。' },
      { statement: 'Mr. Ito helps the members.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'You can watch the club activities before you decide.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'snow-day',
    title: 'The Snowman Contest',
    level: '中2〜中3（物語）',
    paragraphs: [
      'One morning in January, Aya woke up and looked out of the window. Everything was white! It had snowed a lot ( A ) the night, and the school was closed.',
      'Aya called her friends, and they met in the park. There was a sign that said, "Snowman Contest Today! Prizes for the best three." Aya and her friends decided to make the biggest snowman ( B ) the park.',
      'They worked hard for two hours. Their hands got cold, but they kept rolling the snow. When the snowman was finished, it was taller ( C ) Aya\'s father. They used stones for its eyes and a carrot for its nose.',
      'At three o\'clock, the judges came. They looked at all the snowmen and gave Aya\'s team second prize. The first prize went to a team of little children who made a snowman family.',
      'Aya was a little disappointed, but she said, "Their snowmen were really cute. I\'m glad we made ours together." That night, she drank hot chocolate and looked at the photos ( D ) a smile.',
    ],
    ja: [
      '1月のある朝、アヤは目を覚まして窓の外を見ました。一面まっ白でした！ 夜の間に雪がたくさんふって、学校は休みになりました。',
      'アヤが友だちに電話して、みんなで公園に集まりました。「本日雪だるまコンテスト！ 上位3チームに賞品」という看板がありました。アヤと友だちは、公園でいちばん大きな雪だるまをつくることにしました。',
      'みんなは2時間がんばりました。手は冷たくなりましたが、雪を転がしつづけました。できあがった雪だるまは、アヤのお父さんより背が高くなりました。目には石を、鼻にはにんじんを使いました。',
      '3時に審査員が来ました。審査員はすべての雪だるまを見て、アヤのチームに2位の賞をくれました。1位は、雪だるまの家族をつくった小さな子どもたちのチームでした。',
      'アヤは少しがっかりしましたが、「あの子たちの雪だるま、本当にかわいかったね。みんなでいっしょにつくれてよかった」と言いました。その夜、アヤはホットチョコレートを飲みながら、笑顔で写真をながめました。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'during', 'for', 'while'], answer: 1, why: '後ろが名詞（the night）で「夜の間に」なので during。' },
      { id: 'B', choices: ['at', 'in', 'of', 'on'], answer: 1, why: '最上級のあとで場所の範囲を表すときは in（the biggest in the park）。' },
      { id: 'C', choices: ['as', 'than', 'that', 'then'], answer: 1, why: '比較級 taller のあとは than。' },
      { id: 'D', choices: ['at', 'by', 'in', 'with'], answer: 3, why: 'with a smile で「笑顔で」。' },
    ],
    seq: { events: ['The judges gave Aya\'s team second prize.', 'Aya saw that everything was white.', 'Aya drank hot chocolate.', 'Aya and her friends made a big snowman.'], answer: [1, 3, 0, 2], why: '雪の朝 → 雪だるまをつくる → 2位をもらう → ホットチョコレートを飲む。' },
    tf: [
      { statement: 'Aya\'s school was closed because of the snow.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Aya made the snowman alone.', answer: false, why: '友だちといっしょにつくった。' },
      { statement: 'The snowman was taller than Aya\'s father.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Aya\'s team won first prize.', answer: false, why: '2位だった。' },
      { statement: 'A team of little children made a snowman family.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
]

export const XP_LONG_ITEM = 5 // 1問正解ごと

// 採点：空所と内容一致の正解数
export const seqRight = (q: SeqQ, a: number[] | undefined) => !!a && a.length === q.answer.length && a.every((x, i) => x === q.answer[i])

export function scoreLong(p: LongPassage, blanks: Record<string, number>, tf: Record<number, boolean>, picks: number[] = [], extra: { underline?: number; order?: string; sentences?: Record<string, number>; qa?: Record<number, number>; refer?: number; gist?: Record<number, number>; title?: number; complete?: Record<number, number>; insert?: number; summary?: Record<number, number>; vocab?: Record<number, number>; seq?: number[] } = {}): { score: number; total: number } {
  const b = p.blanks.filter((x) => blanks[x.id] === x.answer).length
  const t = p.tf.filter((x, i) => tf[i] === x.answer).length
  const k = p.pick2 ? picks.filter((i) => p.pick2!.answers.includes(i)).length : 0
  const u = p.underline && extra.underline === p.underline.answer ? 1 : 0
  const o = p.order && extra.order === p.order.answer ? 1 : 0
  const se = (p.sentences ?? []).filter((x) => extra.sentences?.[x.id] === x.answer).length
  const qa = (p.qa ?? []).filter((x, i) => extra.qa?.[i] === x.answer).length
  const rf = p.refer && extra.refer === p.refer.answer ? 1 : 0
  const gi = (p.gist ?? []).filter((x, i) => extra.gist?.[i] === x.answer).length
  const ti = p.titleQ && extra.title === p.titleQ.answer ? 1 : 0
  const co = (p.complete ?? []).filter((x, i) => extra.complete?.[i] === x.answer).length
  const ins = p.insert && extra.insert === p.insert.answer ? 1 : 0
  const su = (p.summary?.blanks ?? []).filter((x, i) => extra.summary?.[i] === x.answer).length
  const vo = (p.vocab ?? []).filter((x, i) => extra.vocab?.[i] === x.answer).length
  const sq = p.seq && seqRight(p.seq, extra.seq) ? 1 : 0
  return { score: b + t + k + u + o + se + qa + rf + gi + ti + co + ins + su + vo + sq, total: totalOf(p) }
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

// 長文の点数の合計（一覧に出す）
export const totalOf = (p: LongPassage) => p.blanks.length + p.tf.length + (p.pick2 ? 2 : 0) + (p.underline ? 1 : 0) + (p.order ? 1 : 0) + (p.sentences?.length ?? 0) + (p.qa?.length ?? 0) + (p.refer ? 1 : 0) + (p.gist?.length ?? 0) + (p.titleQ ? 1 : 0) + (p.complete?.length ?? 0) + (p.insert ? 1 : 0) + (p.summary?.blanks.length ?? 0) + (p.vocab?.length ?? 0) + (p.seq ? 1 : 0)

// まちがえた問題の根拠の段落（0から数える）。空所・下線部は本文の位置から、内容一致は解説の「第N段落」から
export function evidenceParas(p: LongPassage, wrongBlanks: string[], wrongTf: number[], underlineWrong = false): number[] {
  const out = new Set<number>()
  for (const id of wrongBlanks) {
    const i = p.paragraphs.findIndex((t) => t.includes(`( ${id} )`))
    if (i >= 0) out.add(i)
  }
  for (const n of wrongTf) {
    const m = p.tf[n]?.why.match(/第(\d)段落/)
    if (m) out.add(Number(m[1]) - 1)
  }
  if (underlineWrong && p.underline) {
    const i = p.paragraphs.findIndex((t) => t.includes(p.underline!.phrase))
    if (i >= 0) out.add(i)
  }
  return [...out].sort((a, b) => a - b)
}

// 本文の語数
export const wordCount = (p: LongPassage) => p.paragraphs.join(' ').replace(/\(\s*[A-Z]\s*\)/g, ' ').split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length

// 目安時間（分）：本文の語数（1分60語）＋設問1つにつき20秒
export function targetMinutes(p: LongPassage): number {
  return Math.ceil(wordCount(p) / 60 + totalOf(p) / 3)
}

// これまでに読んだ語数の合計（答え合わせのたびに足す）
const READ_WORDS_KEY = 'eitan:long-words'
export function loadReadWords(): number {
  try {
    const n = Number(localStorage.getItem(READ_WORDS_KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}
export function addReadWords(n: number): number {
  const total = loadReadWords() + Math.max(0, Math.floor(n))
  try {
    localStorage.setItem(READ_WORDS_KEY, String(total))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return total
}

export const formatTime = (sec: number) => `${Math.floor(sec / 60)}分${String(sec % 60).padStart(2, '0')}秒`

// 苦手タイプ分析：設問のタイプごとの［正解数, 問題数］
export const TYPE_LABEL = { seq: '出来事の順番', vocab: '語句の意味', summary: '要約文の完成', insert: '文を入れる位置', complete: '英文の完成', title: 'タイトル選択', gist: '段落の要旨', refer: '指示語', blank: '空所補充（語句）', sentence: '会話の文補充', tf: '内容一致（○×）', pick2: '内容一致（2つ選ぶ）', qa: '英問英答', underline: '下線部の意味', order: '語句整序' } as const
export type QType = keyof typeof TYPE_LABEL
export type TypeStats = Partial<Record<QType, [number, number]>>

export function typeResults(
  p: LongPassage,
  a: { blanks: Record<string, number>; tf: Record<number, boolean>; picks: number[]; underline?: number; order?: string; sentences?: Record<string, number>; qa?: Record<number, number>; refer?: number; gist?: Record<number, number>; title?: number; complete?: Record<number, number>; insert?: number; summary?: Record<number, number>; vocab?: Record<number, number>; seq?: number[] },
): TypeStats {
  const out: TypeStats = {}
  out.blank = [p.blanks.filter((x) => a.blanks[x.id] === x.answer).length, p.blanks.length]
  out.tf = [p.tf.filter((x, i) => a.tf[i] === x.answer).length, p.tf.length]
  if (p.pick2) out.pick2 = [a.picks.filter((i) => p.pick2!.answers.includes(i)).length, 2]
  if (p.sentences) out.sentence = [p.sentences.filter((x) => a.sentences?.[x.id] === x.answer).length, p.sentences.length]
  if (p.qa) out.qa = [p.qa.filter((x, i) => a.qa?.[i] === x.answer).length, p.qa.length]
  if (p.underline) out.underline = [a.underline === p.underline.answer ? 1 : 0, 1]
  if (p.order) out.order = [a.order === p.order.answer ? 1 : 0, 1]
  if (p.refer) out.refer = [a.refer === p.refer.answer ? 1 : 0, 1]
  if (p.gist) out.gist = [p.gist.filter((x, i) => a.gist?.[i] === x.answer).length, p.gist.length]
  if (p.titleQ) out.title = [a.title === p.titleQ.answer ? 1 : 0, 1]
  if (p.complete) out.complete = [p.complete.filter((x, i) => a.complete?.[i] === x.answer).length, p.complete.length]
  if (p.insert) out.insert = [a.insert === p.insert.answer ? 1 : 0, 1]
  if (p.seq) out.seq = [seqRight(p.seq, a.seq) ? 1 : 0, 1]
  if (p.vocab) out.vocab = [p.vocab.filter((x, i) => a.vocab?.[i] === x.answer).length, p.vocab.length]
  if (p.summary) out.summary = [p.summary.blanks.filter((x, i) => a.summary?.[i] === x.answer).length, p.summary.blanks.length]
  return out
}

export function mergeTypes(base: TypeStats, add: TypeStats): TypeStats {
  const out: TypeStats = { ...base }
  for (const k of Object.keys(add) as QType[]) {
    const [a, b] = add[k]!
    const [c, d] = base[k] ?? [0, 0]
    out[k] = [a + c, b + d]
  }
  return out
}

const TYPE_KEY = 'eitan:long-types'
export function loadTypeStats(): TypeStats {
  try {
    const v = JSON.parse(localStorage.getItem(TYPE_KEY) ?? '{}') as Record<string, unknown>
    return Object.fromEntries(Object.entries(v).filter(([k, x]) => k in TYPE_LABEL && Array.isArray(x) && x.length === 2 && x.every((n) => typeof n === 'number'))) as TypeStats
  } catch {
    return {}
  }
}
export function saveTypeStats(s: TypeStats): void {
  try {
    localStorage.setItem(TYPE_KEY, JSON.stringify(s))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 一覧・見出しに出す名前（タイトル選択の問題がある長文はタイトルをかくす）
export const shownTitle = (p: LongPassage, n: number) => (p.titleQ ? `タイトルを当てる長文 No.${n + 1}` : p.title)

// 苦手な設問タイプ（正答率60%未満）がある長文のうち、まだ満点でないものをおすすめする
export function hasType(p: LongPassage, k: QType): boolean {
  const map: Record<QType, boolean> = {
    blank: p.blanks.length > 0,
    tf: p.tf.length > 0,
    pick2: !!p.pick2,
    sentence: !!p.sentences,
    qa: !!p.qa,
    underline: !!p.underline,
    order: !!p.order,
    refer: !!p.refer,
    gist: !!p.gist,
    title: !!p.titleQ,
    complete: !!p.complete,
    insert: !!p.insert,
    summary: !!p.summary,
    vocab: !!p.vocab,
    seq: !!p.seq,
  }
  return map[k]
}

export function weakTypes(t: TypeStats): QType[] {
  return (Object.keys(t) as QType[]).filter((k) => t[k]![1] > 0 && t[k]![0] / t[k]![1] < 0.6)
}

export function recommendLong(t: TypeStats, record: LongRecord): { passage: LongPassage; type: QType } | null {
  for (const k of weakTypes(t)) {
    const p = LONG_PASSAGES.find((x) => hasType(x, k) && (record[x.id] ?? -1) < totalOf(x))
    if (p) return { passage: p, type: k }
  }
  return null
}

// 本ごとの★（最高点の正答率）：満点で★3、7割以上で★2、それ以外は★1
export function longStars(best: number | undefined, total: number): number {
  if (best === undefined || total <= 0) return 0
  if (best >= total) return 3
  return best / total >= 0.7 ? 2 : 1
}

// ランダム挑戦：まだ解いていない長文から1本（全部解いていたら全体から）。r は 0〜1 の乱数
export function randomLong(record: Record<string, number>, r: number, list: LongPassage[] = LONG_PASSAGES): LongPassage {
  const fresh = list.filter((x) => record[x.id] === undefined)
  const pool = fresh.length > 0 ? fresh : list
  return pool[Math.min(pool.length - 1, Math.floor(r * pool.length))]
}

// とちゅうから：答えかけの内容（長文ごと）
export type LongDraft = {
  blanks: Record<string, number>
  tf: Record<number, boolean>
  picks: number[]
  under?: number
  order: number[]
  sents: Record<string, number>
  qa: Record<number, number>
  refer?: number
  gist: Record<number, number>
  title?: number
  comp: Record<number, number>
  insert?: number
  summary?: Record<number, number>
  vocab?: Record<number, number>
  seq?: number[]
}
const DRAFT_KEY = 'eitan:long-draft'
const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)
const numMap = (v: unknown) => (isObj(v) ? Object.fromEntries(Object.entries(v).filter(([, x]) => typeof x === 'number')) : {}) as Record<string, number>
const nums = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is number => typeof x === 'number') : [])
const opt = (v: unknown) => (typeof v === 'number' ? v : undefined)

export function loadLongDraft(id: string): LongDraft | null {
  try {
    const all = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? '{}') as unknown
    const d = isObj(all) ? all[id] : null
    if (!isObj(d)) return null
    const tf = isObj(d.tf) ? (Object.fromEntries(Object.entries(d.tf).filter(([, x]) => typeof x === 'boolean')) as Record<number, boolean>) : {}
    return { blanks: numMap(d.blanks), tf, picks: nums(d.picks), under: opt(d.under), order: nums(d.order), sents: numMap(d.sents), qa: numMap(d.qa), refer: opt(d.refer), gist: numMap(d.gist), title: opt(d.title), comp: numMap(d.comp), insert: opt(d.insert), summary: numMap(d.summary), vocab: numMap(d.vocab), seq: nums(d.seq) }
  } catch {
    return null
  }
}

// 1問も答えていなければ消す
export const draftEmpty = (d: LongDraft) =>
  [d.blanks, d.tf, d.sents, d.qa, d.gist, d.comp, d.summary ?? {}, d.vocab ?? {}].every((m) => Object.keys(m).length === 0) && d.picks.length === 0 && d.order.length === 0 && d.under === undefined && d.refer === undefined && d.title === undefined && d.insert === undefined && (d.seq ?? []).length === 0

export function saveLongDraft(id: string, d: LongDraft | null): void {
  try {
    const raw = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? '{}') as unknown
    const all = isObj(raw) ? { ...raw } : {}
    if (!d || draftEmpty(d)) delete all[id]
    else all[id] = d
    localStorage.setItem(DRAFT_KEY, JSON.stringify(all))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 長文の種類（level の（ ）の中から決める。書いていないものは身近な話＝物語）
export const GENRES = ['説明文', '物語', '会話文', '手紙・メール', 'スピーチ'] as const
export type Genre = (typeof GENRES)[number]
export function genreOf(p: LongPassage): Genre {
  const tag = /（(.+)）/.exec(p.level)?.[1] ?? ''
  if (tag === '会話文') return '会話文'
  if (tag === 'スピーチ') return 'スピーチ'
  if (['メール', '手紙', 'お知らせ'].includes(tag)) return '手紙・メール'
  if (['物語', '日記', ''].includes(tag)) return '物語'
  return '説明文'
}

// 最短タイム：満点をとったときのかかった秒数（長文ごと）
const TIME_KEY = 'eitan:long-best-time'
export function loadLongTimes(): Record<string, number> {
  try {
    const v = JSON.parse(localStorage.getItem(TIME_KEY) ?? '{}') as unknown
    return isObj(v) ? (Object.fromEntries(Object.entries(v).filter(([, n]) => typeof n === 'number' && n > 0)) as Record<string, number>) : {}
  } catch {
    return {}
  }
}
// 更新したら true
export function recordLongTime(id: string, sec: number): boolean {
  const all = loadLongTimes()
  if (all[id] !== undefined && all[id] <= sec) return false
  try {
    localStorage.setItem(TIME_KEY, JSON.stringify({ ...all, [id]: sec }))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return true
}

// 今日の1本：日替わりのおすすめ長文。その日に満点をとると🪙10（1日1回）
export const DAILY_LONG_COINS = 10
export function dailyLong(day: string, list: LongPassage[] = LONG_PASSAGES): LongPassage {
  let h = 5
  for (const c of `long-${day}`) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return list[h % list.length]
}
const DAILY_KEY = 'eitan:long-daily'
export function loadDailyLongDay(): string {
  try {
    return localStorage.getItem(DAILY_KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveDailyLongDay(day: string): void {
  try {
    localStorage.setItem(DAILY_KEY, day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 読解レベル：直近5本の正答率の平均で「初級・中級・上級」
const HIST_KEY = 'eitan:long-history'
export function loadLongHistory(): number[] {
  try {
    const v = JSON.parse(localStorage.getItem(HIST_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is number => typeof x === 'number' && x >= 0 && x <= 1).slice(-5) : []
  } catch {
    return []
  }
}
export function pushLongHistory(rate: number): number[] {
  const h = [...loadLongHistory(), Math.max(0, Math.min(1, rate))].slice(-5)
  try {
    localStorage.setItem(HIST_KEY, JSON.stringify(h))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return h
}
export function readingLevel(h: number[]): { name: '初級' | '中級' | '上級'; pct: number } | null {
  if (h.length === 0) return null
  const pct = Math.round((h.reduce((a, b) => a + b, 0) / h.length) * 100)
  return { name: pct >= 85 ? '上級' : pct >= 60 ? '中級' : '初級', pct }
}

// つまずき解説：まちがえた設問の種類ごとの、解き方のコツ
export const TYPE_TIPS: Record<QType, string> = {
  blank: '空所の前後の語（動詞・形容詞）とセットになる前置詞や熟語を思い出そう。',
  tf: '選択肢の英文と同じ内容を本文からさがし、数字・人物・否定語（not / never）のちがいを確かめよう。',
  pick2: '1つずつ○×をつけてから、○を2つ選ぼう。本文にない内容は×。',
  underline: '下線部の前後の文を読み、言いかえている部分をさがそう。',
  order: 'まず主語と動詞を決めてから、残りの語をつなげよう。',
  sentence: '空所の次の人の返事に合う文を選ぼう。',
  qa: '質問の疑問詞（What / Why / How long など）に合う答えの形を選ぼう。',
  refer: '指示語（it / they / she など）の直前の文から、同じ数（単数・複数）の名詞をさがそう。',
  gist: '段落の最初と最後の文に、その段落の言いたいことが書かれていることが多い。',
  title: '全体を通して何度も出てくる話題をつかもう。一部の段落だけの内容はタイトルにならない。',
  complete: '文の前半のキーワードを本文でさがし、その近くを読もう。',
  insert: '入れる文の this / these / So などのつなぎの語が、どの段落の内容を指すか考えよう。',
  summary: '要約文の空所の前後と同じ内容を本文でさがし、言いかえの語を選ぼう。',
  vocab: '知らない語は、前後の文の流れ（理由・例・反対の内容）から意味を考えよう。',
  seq: 'when / after / then / the next day など時を表す語に印をつけながら読もう。',
}
