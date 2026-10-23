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
// 段落内の文の並べかえ：第 at 段落（0から）の3つの文を、shown の順にア〜ウで見せて正しい順に並べる（本文のその段落は答えるまでかくす）
export type ParaSeq = { at: number; shown: number[]; why: string }
export type VocabQ = { word: string; choices: string[]; answer: number; why: string }
export type SummaryQ = { text: string; blanks: { choices: string[]; answer: number; why: string }[] }
export type InsertQ = { sentence: string; after: number[]; answer: number; why: string }
export type EnglishQA = { q: string; choices: string[]; answer: number; why: string } // 英問英答（complete では q が文の前半）
export type LongPassage = { id: string; title: string; level: string; paragraphs: string[]; ja: string[]; blanks: Blank[]; tf: TrueFalse[]; pick2?: PickTwo; underline?: Underline; order?: Ordering; sentences?: SentenceBlank[]; qa?: EnglishQA[]; table?: string[][]; refer?: Refer; gist?: Gist[]; titleQ?: TitleQ; complete?: EnglishQA[]; insert?: InsertQ; summary?: SummaryQ; vocab?: VocabQ[]; seq?: SeqQ; paraSeq?: ParaSeq }

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
    paraSeq: { at: 2, shown: [2, 0, 1], why: '「海の動物がプラスチックを食べてしまう」→「それ（This）で病気になる」→「人が食べる魚の中からも見つかる（also）」の順。This は前の文を指す。' },
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
    paraSeq: { at: 1, shown: [1, 2, 0], why: '「ねている間に体は自分を修復する」→「筋肉が休み、体が成長する」→「だから若い人には特に十分な睡眠が必要」の順。That is why は最後。' },
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
    pick2: {
      statements: ['Some vending machines sell umbrellas.', 'Vending machines sell only cold drinks in winter.', 'People often break vending machines in Japan.', 'Some vending machines show news on a screen.', 'Vending machines do not use electricity.', 'There are no vending machines at stations.'],
      answers: [0, 3],
      why: '第2段落「かさを売るものもある」、第4段落「画面にニュースを表示するものもある」。',
    },
    paraSeq: { at: 2, shown: [1, 2, 0], why: '「なぜ多いのか？」と問いかけ →「理由の1つは安全だから」→「ほかの国では…」と説明が続く。' },
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
    pick2: {
      statements: ['Penguins use their wings to fly over the sea.', 'Some penguins live in warm places.', 'Penguins have thin feathers.', 'Penguins stand close together to stay warm.', 'Penguins eat only plants.', 'All kinds of penguins are safe today.'],
      answers: [1, 3],
      why: '第2段落「あたたかい場所にすむものもいる」、第3段落「寄りそって立つ」。羽毛は厚く、魚を食べ、危機にある種類もいる。',
    },
    titleQ: { choices: ['How to Catch Fish', 'The Coldest Place on Earth', 'Birds That Cannot Fly', 'Animals That Live in Trees'], answer: 2, why: '飛べないけれど泳ぎが得意なペンギンについての文章。' },
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
    pick2: {
      statements: ['Amsterdam has many roads only for bicycles.', 'Riding a bicycle is more expensive than using a car.', 'The land of Amsterdam is flat.', 'There are no problems with bicycles.', 'Bicycles make the air dirty.', 'Nobody rides too fast.'],
      answers: [0, 2],
      why: '第2段落「土地が平ら」「自転車専用の広い道がたくさん」。自転車は車より安く、空気をよごさず、問題もある。',
    },
    paraSeq: { at: 3, shown: [1, 2, 0], why: '「しかし問題もある」→「大都市では自転車が多すぎて止める場所がない」→「スピードを出しすぎる人もいる（also）」の順。' },
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
    order: { words: ['you', 'Buy', 'need', 'what', 'only'], rest: 'when you go shopping.', answer: 'Buy only what you need', ja: '買い物に行くときは、必要なものだけを買いなさい。' },
    paraSeq: { at: 2, shown: [1, 2, 0], why: '「家で買いすぎて食べわすれる」→「ほかの人（Others）は作りすぎる」→「期限をすぎただけですてる人もいる（also）」の順。' },
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
    order: { words: ['gave', 'Ren', 'some', 'it', 'warm'], rest: 'milk.', answer: 'Ren gave it some warm', ja: 'レンはそれ（子ねこ）にあたたかいミルクをあげた。' },
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
    pick2: {
      statements: ['We should wash our hands for about twenty seconds.', 'Germs are easy to see.', 'We do not need to wash between our fingers.', 'Washing hands before eating is important.', 'Washing hands is expensive.', 'Only adults can wash their hands well.'],
      answers: [0, 3],
      why: '第3段落「20秒くらい」、第4段落「食べる前に手をあらうことは大切」。細菌は見えず、指の間もあらい、お金はかからず、だれでもできる。',
    },
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
    paraSeq: { at: 3, shown: [2, 1, 0], why: '「3時に審査員が来た」→「（審査員たちは）全部の雪だるまを見て、2位をくれた」→「1位は小さな子どものチームだった」の順。They は審査員を指す。' },
    tf: [
      { statement: 'Aya\'s school was closed because of the snow.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Aya made the snowman alone.', answer: false, why: '友だちといっしょにつくった。' },
      { statement: 'The snowman was taller than Aya\'s father.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Aya\'s team won first prize.', answer: false, why: '2位だった。' },
      { statement: 'A team of little children made a snowman family.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'moon-facts',
    title: 'Our Neighbor, the Moon',
    level: '中3（説明文）',
    paragraphs: [
      'The moon is the closest natural object ( A ) the Earth in space. It is about 380,000 kilometers away. If you could drive a car there, it would take about half a year.',
      'The moon does not make its own light. It looks bright because it reflects the light of the sun. The shape of the moon seems to change ( B ) about a month, from a thin line to a full circle and back again.',
      'There is no air or water on the moon, so nothing can live there. Because there is no wind, the footprints left by astronauts in 1969 are probably still there today.',
      'The moon also affects our life on the Earth. It pulls the water of the sea, and this causes the tides. Without the moon, the sea ( C ) be very different.',
      'Today, many countries are planning to send people to the moon again. Some scientists hope to build a base there in the future. Maybe someday you will be able to travel ( D ) the moon.',
    ],
    ja: [
      '月は、宇宙で地球にいちばん近い自然の天体です。約38万キロメートルはなれています。もし車で行けるとしたら、半年くらいかかるでしょう。',
      '月は自分で光を出していません。太陽の光を反射しているので明るく見えるのです。月の形は約1か月で、細い線から満月まで変わって、またもとにもどるように見えます。',
      '月には空気も水もないので、何も生きられません。風がないので、1969年に宇宙飛行士が残した足あとは、おそらく今もそこに残っています。',
      '月は地球の私たちの生活にも影響をあたえています。月は海の水を引っぱっていて、これが潮の満ち引きを起こします。月がなければ、海はずいぶんちがったものになるでしょう。',
      '今日、多くの国がふたたび月に人を送ることを計画しています。将来、そこに基地をつくりたいと考えている科学者もいます。いつかあなたも月へ旅行できるようになるかもしれません。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'close to 〜 で「〜に近い」。' },
      { id: 'B', choices: ['at', 'in', 'on', 'since'], answer: 1, why: 'in about a month で「約1か月で（かかって）」。' },
      { id: 'C', choices: ['can', 'must', 'should', 'would'], answer: 3, why: '「もし月がなければ〜だろう」という仮定なので would。' },
      { id: 'D', choices: ['at', 'for', 'in', 'to'], answer: 3, why: 'travel to 〜 で「〜へ旅行する」。' },
    ],
    vocab: [{ word: 'reflects', choices: ['反射する', '食べる', 'かくす', 'こわす'], answer: 0, why: '「自分で光を出していないのに明るく見える」理由なので、太陽の光を「反射する」。' }],
    summary: {
      text: 'The moon shines because it reflects the light of the ( 1 ). It also pulls the water of the sea and causes the ( 2 ).',
      blanks: [
        { choices: ['stars', 'sun', 'Earth', 'cities'], answer: 1, why: '第2段落「太陽の光を反射している」。' },
        { choices: ['tides', 'clouds', 'winds', 'rains'], answer: 0, why: '第4段落「これが潮の満ち引きを起こす」。' },
      ],
    },
    pick2: {
      statements: ['The moon is very far, so it would take ten years to drive there.', 'The moon looks bright because of the light of the sun.', 'Many animals live on the moon.', 'There is no wind on the moon.', 'The moon has no effect on the sea.', 'No one has ever walked on the moon.'],
      answers: [1, 3],
      why: '第2段落「太陽の光を反射」、第3段落「風がない」。車で半年、生き物はいない、潮を起こす、宇宙飛行士の足あとがある。',
    },
    titleQ: { choices: ['Life on Mars', 'How to Become an Astronaut', 'The Sun and Its Light', 'Our Neighbor, the Moon'], answer: 3, why: '月のきょり、光、環境、潮への影響、これからの計画について書かれている。' },
    order: { words: ['looks', 'because', 'It', 'bright'], rest: 'it reflects the light of the sun.', answer: 'It looks bright because', ja: '太陽の光を反射しているので、明るく見える。' },
    tf: [
      { statement: 'The moon is about 380,000 kilometers away from the Earth.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'The moon makes its own light.', answer: false, why: '自分で光を出していない。' },
      { statement: 'There is a lot of water on the moon.', answer: false, why: '空気も水もない。' },
      { statement: 'The footprints of astronauts may still be on the moon.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'No country is planning to send people to the moon.', answer: false, why: '多くの国が計画している。' },
    ],
  },
  {
    id: 'talk-weekend',
    title: 'Plans for the Weekend',
    level: '中2（会話文）',
    paragraphs: [
      'Mike: Hi, Rina. Do you have any plans ( A ) this weekend?',
      'Rina: Yes. On Saturday, I\'m going to help my grandmother in her garden. How about you?',
      'Mike: I\'m going to watch a soccer game with my father on Saturday. But I\'m free on Sunday.',
      'Rina: Really? A new bakery opened near the station last week. Its melon bread is very popular. Shall we go there ( B ) Sunday morning?',
      'Mike: Sounds great! I love melon bread. What time should we meet?',
      'Rina: The bakery opens at nine, but there is always a long line. Let\'s meet at the station at eight forty.',
      'Mike: That\'s early, but OK. I\'ll set my alarm. If it rains, should we change our plan?',
      'Rina: No, it\'s only five minutes ( C ) the station. We can bring umbrellas. See you ( D ) Sunday!',
    ],
    ja: [
      'マイク：やあ、リナ。今週末は何か予定がある？',
      'リナ：うん。土曜日はおばあちゃんの庭仕事を手伝う予定なの。あなたは？',
      'マイク：土曜日はお父さんとサッカーの試合を見に行くんだ。でも日曜日はひまだよ。',
      'リナ：本当？ 先週、駅の近くに新しいパン屋さんができたの。そこのメロンパンがすごく人気なのよ。日曜日の朝、行ってみない？',
      'マイク：いいね！ メロンパン大好きなんだ。何時に会う？',
      'リナ：パン屋さんは9時に開くけど、いつも長い列ができてるの。8時40分に駅で会いましょう。',
      'マイク：早いけど、わかった。目覚ましをかけておくよ。もし雨がふったら、予定を変えたほうがいいかな？',
      'リナ：ううん、駅から5分だけだもの。かさを持って行けばいいわ。日曜日にね！',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', 'of'], answer: 1, why: 'plans for 〜 で「〜の予定」。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 2, why: '特定の曜日の朝は on（on Sunday morning）。' },
      { id: 'C', choices: ['at', 'by', 'from', 'to'], answer: 2, why: 'five minutes from 〜 で「〜から5分」。' },
      { id: 'D', choices: ['at', 'in', 'on', 'to'], answer: 2, why: '曜日の前は on（See you on Sunday!）。' },
    ],
    qa: [{ q: 'What time will Mike and Rina meet?', choices: ['At eight forty.', 'At nine.', 'At eight.', 'At ten.'], answer: 0, why: 'リナの4つ目の発言「8時40分に駅で会いましょう」。' }],
    tf: [
      { statement: 'Rina will help her grandmother on Saturday.', answer: true, why: 'リナの1つ目の発言と合う。' },
      { statement: 'Mike is free on Saturday.', answer: false, why: '土曜日はサッカーを見に行く。ひまなのは日曜日。' },
      { statement: 'The new bakery is near the station.', answer: true, why: 'リナの2つ目の発言と合う。' },
      { statement: 'The bakery opens at eight.', answer: false, why: '9時に開く。' },
      { statement: 'They will change their plan if it rains.', answer: false, why: '雨でもかさを持って行く。' },
    ],
  },
  {
    id: 'speech-grandfather',
    title: 'My Grandfather\'s Words (Speech)',
    level: '中3（スピーチ）',
    paragraphs: [
      'Good morning, everyone. Today I\'d like to tell you about my grandfather. He is eighty years old, and he has been a carpenter ( A ) more than sixty years.',
      'When I was small, I often watched him work. He always measured the wood very carefully before cutting it. One day, I asked him, "Why do you measure so many times?" He answered, "Measure twice, cut once. If you are careful at the start, you will not waste anything."',
      'At that time, I did not understand his words. But last year, I failed a math test because I did not check my answers. Then I remembered what my grandfather said.',
      'Since then, I have tried to be careful ( B ) the beginning in everything I do. I read questions twice before answering them. I also plan my day before I start it. My grades have improved, and I make ( C ) mistakes than before.',
      'My grandfather taught me that being careful is a kind of kindness to yourself and to others. I want to be someone who does things carefully, just like him. Thank you ( D ) listening.',
    ],
    ja: [
      'みなさん、おはようございます。今日は私の祖父についてお話ししたいと思います。祖父は80歳で、60年以上大工をしています。',
      '小さいころ、私はよく祖父が仕事をするのを見ていました。祖父はいつも、木を切る前にとても注意深く寸法をはかっていました。ある日私は「どうしてそんなに何度もはかるの？」とたずねました。祖父は「2度はかって、1度で切る。最初に注意深くすれば、何もむだにしないんだよ」と答えました。',
      'そのときは、祖父の言葉がわかりませんでした。でも去年、答えを見直さなかったせいで数学のテストに失敗しました。そのとき、祖父が言ったことを思い出したのです。',
      'それ以来、私は何をするときも最初から注意深くするようにしてきました。問題は答える前に2回読みます。1日を始める前に計画も立てます。成績は上がり、まちがいも前より少なくなりました。',
      '祖父は、注意深くすることは自分にも人にもやさしくすることだと教えてくれました。私も祖父のように、物事をていねいにする人になりたいです。ご清聴ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['during', 'for', 'in', 'since'], answer: 1, why: '「60年以上（の間）」のように期間の長さは for。' },
      { id: 'B', choices: ['at', 'by', 'from', 'to'], answer: 2, why: 'from the beginning で「最初から」。' },
      { id: 'C', choices: ['fewer', 'less', 'many', 'much'], answer: 0, why: 'mistakes は数えられる名詞なので fewer（より少ない）。' },
      { id: 'D', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'Thank you for 〜ing で「〜してくれてありがとう」。' },
    ],
    underline: { phrase: 'Measure twice, cut once', choices: ['切る前に注意深く確かめなさい', '木はたくさん切りなさい', '2回切ってから1回はかりなさい', '大工になりなさい'], answer: 0, why: '「最初に注意深くすれば、何もむだにしない」と続くので、切る前によく確かめよという意味。' },
    tf: [
      { statement: "The speaker's grandfather is a carpenter.", answer: true, why: '第1段落の内容と合う。' },
      { statement: 'The grandfather never measured the wood.', answer: false, why: 'いつも注意深くはかっていた。' },
      { statement: 'The speaker understood the words right away.', answer: false, why: 'そのときはわからなかった。' },
      { statement: 'The speaker failed a math test last year.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'The speaker now reads questions twice before answering.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'trees-city',
    title: 'Why Cities Need Trees',
    level: '中3（説明文）',
    paragraphs: [
      'In summer, have you ever felt cooler ( A ) you walked into a park full of trees? This is not just your imagination. Trees really help to make cities cooler.',
      'Trees give us shade, so the ground under them does not get very hot. Their leaves also release water into the air. This works like a natural air conditioner.',
      'Trees are good for the air, too. They take in carbon dioxide and give out oxygen. Some trees can also catch dust ( B ) their leaves and keep the air cleaner.',
      'In addition, many studies show that green places make people feel relaxed. People who live near parks often walk more and feel less stressed.',
      'For these reasons, many cities are planting more trees along streets and on the roofs of buildings. If you have a chance, why don\'t you plant a tree in your town? It will keep growing ( C ) many years and help people who live there ( D ) the future.',
    ],
    ja: [
      '夏に、木がたくさんある公園に入ったとき、すずしく感じたことはありませんか。これは気のせいではありません。木は本当に町をすずしくする助けになっているのです。',
      '木は日かげをつくってくれるので、木の下の地面はあまり熱くなりません。また、葉は空気中に水を出します。これは自然のエアコンのようなはたらきをします。',
      '木は空気にとってもよいのです。二酸化炭素を取りこんで、酸素を出します。また、葉でほこりをとらえて、空気をきれいに保つ木もあります。',
      'さらに、多くの研究によると、緑のある場所は人をリラックスさせます。公園の近くに住む人は、よく歩き、ストレスが少ないことが多いのです。',
      'こうした理由から、多くの町が通りぞいや建物の屋上に木をふやしています。機会があれば、あなたの町に木を植えてみませんか。木は何年も育ちつづけ、将来そこに住む人たちを助けてくれるでしょう。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'so', 'until', 'when'], answer: 3, why: '「公園に入ったとき」なので when。' },
      { id: 'B', choices: ['at', 'by', 'for', 'with'], answer: 3, why: 'with their leaves で「葉で（使って）」。' },
      { id: 'C', choices: ['during', 'for', 'in', 'since'], answer: 1, why: '「何年も（の間）」は for many years。' },
      { id: 'D', choices: ['at', 'in', 'on', 'to'], answer: 1, why: 'in the future で「将来」。' },
    ],
    vocab: [{ word: 'shade', choices: ['日かげ', '雨', '風', '花びら'], answer: 0, why: '木があると地面が熱くならない理由なので、日光をさえぎってできる「日かげ」。' }],
    summary: {
      text: 'Trees make cities ( 1 ) by giving shade and releasing water. They also make the air cleaner and help people feel ( 2 ).',
      blanks: [
        { choices: ['cooler', 'hotter', 'noisier', 'darker'], answer: 0, why: '第1・2段落「木は町をすずしくする」。' },
        { choices: ['relaxed', 'angry', 'hungry', 'lonely'], answer: 0, why: '第4段落「緑のある場所は人をリラックスさせる」。' },
      ],
    },
    titleQ: { choices: ['How to Build a Park', 'Why Cities Need Trees', 'The Tallest Tree in the World', 'Air Conditioners in Summer'], answer: 1, why: '木が町をすずしくし、空気をきれいにし、人をリラックスさせる理由が書かれている。' },
    order: { words: ['help', 'to', 'Trees', 'make', 'really'], rest: 'cities cooler.', answer: 'Trees really help to make', ja: '木は本当に町をすずしくする助けになる。' },
    refer: { phrase: 'This works like a natural air conditioner', word: 'This', choices: ['leaves releasing water into the air', 'the hot ground', 'a big park', 'the sun'], answer: 0, why: '直前の「葉が空気中に水を出すこと」を指している。' },
    tf: [
      { statement: 'Trees can make cities cooler.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Trees take in oxygen and give out carbon dioxide.', answer: false, why: '二酸化炭素を取りこんで酸素を出す。' },
      { statement: 'Some trees catch dust with their leaves.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'People who live near parks walk less.', answer: false, why: 'よく歩くことが多い。' },
      { statement: 'Some cities are planting trees on the roofs of buildings.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'lost-key-story',
    title: 'The Key under the Mat',
    level: '中2〜中3（物語）',
    paragraphs: [
      'When Sho came home from school, nobody was at home. His parents were working, and his sister was at her piano lesson. He looked in his bag for his house key, but it was not there. He must have left it ( A ) his desk that morning.',
      'It was getting cold, and Sho did not know what to do. Then he remembered his neighbor, Mrs. Ota. She was an old woman who lived alone ( B ) her cat. Sho knocked on her door.',
      '"Oh, Sho! Come in. It\'s cold outside," she said with a smile. She gave him hot tea and some cookies. While they were waiting for his mother, Mrs. Ota showed him old photos of the town. Sho was surprised to see that there was a rice field where his house is now.',
      'At six o\'clock, his mother came home. She thanked Mrs. Ota many times. Before Sho left, Mrs. Ota said, "Please come and visit me again. It was fun to talk ( C ) you."',
      'Now Sho visits Mrs. Ota every Saturday. He helps her carry heavy things, and she tells him stories about the old days. Sho thinks that losing his key was the luckiest mistake ( D ) his life.',
    ],
    ja: [
      'ショウが学校から帰ると、家にはだれもいませんでした。両親は仕事中で、姉はピアノのレッスンに行っていました。かばんの中のかぎをさがしましたが、ありませんでした。その朝、机の上に置いてきてしまったにちがいありません。',
      '寒くなってきて、ショウはどうしたらいいかわかりませんでした。そのとき、となりの家の太田さんを思い出しました。太田さんはねこといっしょに1人でくらしているおばあさんでした。ショウは太田さんの家のドアをノックしました。',
      '「あら、ショウくん！ お入りなさい。外は寒いでしょう」と太田さんはにっこりして言いました。太田さんはあたたかいお茶とクッキーを出してくれました。お母さんを待つ間、太田さんは町の古い写真を見せてくれました。ショウは、今自分の家があるところが田んぼだったのを見ておどろきました。',
      '6時に、お母さんが帰ってきました。お母さんは太田さんに何度もお礼を言いました。ショウが帰る前に、太田さんは「また遊びに来てね。あなたと話せて楽しかったわ」と言いました。',
      '今では、ショウは毎週土曜日に太田さんをたずねています。重いものを運ぶのを手伝い、太田さんは昔の話をしてくれます。ショウは、かぎをわすれたことは人生でいちばん幸運なまちがいだったと思っています。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'to'], answer: 2, why: 'on his desk で「机の上に」。' },
      { id: 'B', choices: ['by', 'for', 'of', 'with'], answer: 3, why: 'with her cat で「ねこといっしょに」。' },
      { id: 'C', choices: ['at', 'for', 'of', 'with'], answer: 3, why: 'talk with 人 で「人と話す」。' },
      { id: 'D', choices: ['at', 'for', 'in', 'on'], answer: 2, why: '最上級のあとで範囲を表す in（the luckiest mistake in his life）。' },
    ],
    seq: { events: ['Sho\'s mother came home at six.', 'Sho knocked on Mrs. Ota\'s door.', 'Sho found that his key was not in his bag.', 'Mrs. Ota showed Sho old photos of the town.'], answer: [2, 1, 3, 0], why: 'かぎがない → 太田さんのドアをノック → 古い写真を見る → お母さんが帰る。' },
    tf: [
      { statement: 'Sho\'s sister was at home when he came back.', answer: false, why: '姉はピアノのレッスンに行っていた。' },
      { statement: 'Mrs. Ota lives with her cat.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'There was a rice field where Sho\'s house is now.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Sho\'s mother came home at eight.', answer: false, why: '6時に帰ってきた。' },
      { statement: 'Sho visits Mrs. Ota every Saturday now.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'email-pen-pal',
    title: 'An Email from a Pen Pal',
    level: '中2〜中3（メール）',
    paragraphs: [
      'Hi Mao,',
      'Thank you for your last email. I enjoyed reading about your school trip to Nara. The photo of the deer was so cute! I want to see them someday.',
      'Now let me tell you about my town. I live in a small town ( A ) the coast in New Zealand. It is summer here now, so I go to the beach almost every weekend. In New Zealand, Christmas is in summer, so we sometimes have a barbecue ( B ) Christmas Day.',
      'Last week, I started learning Japanese at school. It is difficult, but fun. I can write my name in katakana now! Could you teach me some easy Japanese words? I will teach you some Maori words ( C ) return. Maori is one of the languages of New Zealand.',
      'I am looking forward to hearing from you. Please write ( D ) me soon!',
      'Your friend,\nEmma',
    ],
    ja: [
      'マオへ',
      'この前のメールをありがとう。奈良への修学旅行の話、楽しく読みました。シカの写真がとってもかわいかった！ いつか見てみたいな。',
      '今度は私の町のことを話すね。私はニュージーランドの海岸ぞいの小さな町に住んでいます。こちらは今夏なので、ほとんど毎週末ビーチに行っています。ニュージーランドではクリスマスが夏なので、クリスマスの日にバーベキューをすることもあるんだよ。',
      '先週、学校で日本語を習いはじめました。難しいけど楽しいです。今ではカタカナで自分の名前が書けるよ！ かんたんな日本語の言葉を教えてくれる？ お返しにマオリ語の言葉を教えるね。マオリ語はニュージーランドの言語の1つです。',
      'お返事を楽しみにしています。すぐに書いてね！',
      'あなたの友だち、エマより',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'on', 'under'], answer: 2, why: 'on the coast で「海岸ぞいに」。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 2, why: '特定の日（Christmas Day）の前は on。' },
      { id: 'C', choices: ['at', 'for', 'in', 'on'], answer: 2, why: 'in return で「お返しに」。' },
      { id: 'D', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'write to 人 で「人に手紙（メール）を書く」。' },
    ],
    qa: [{ q: 'What can Emma write in katakana now?', choices: ['Her name.', 'A long letter.', 'The name of her town.', 'Nothing.'], answer: 0, why: '第4段落「カタカナで自分の名前が書ける」。' }],
    tf: [
      { statement: 'Mao went to Nara on a school trip.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Emma lives in a big city in New Zealand.', answer: false, why: '海岸ぞいの小さな町に住んでいる。' },
      { statement: 'Christmas is in winter in New Zealand.', answer: false, why: 'ニュージーランドではクリスマスは夏。' },
      { statement: 'Emma started learning Japanese last week.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Maori is one of the languages of New Zealand.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'animal-sleep',
    title: 'Sleep of Animals',
    level: '中3（説明文）',
    paragraphs: [
      'All animals need to rest, but they sleep in very different ways. Some animals sleep for many hours, and others sleep only ( A ) a short time.',
      'Koalas are famous ( B ) sleeping a lot. They sleep about twenty hours a day. Their food, eucalyptus leaves, gives them very little energy, so they need to save it by sleeping.',
      'On the other hand, giraffes sleep only a few hours a day. They often sleep standing up, because lying down makes it hard to run away from dangerous animals.',
      'Some sea animals, such as dolphins, have a special way of sleeping. Only half of their brain sleeps at one time. This way, they can keep swimming and come up to the surface ( C ) breathe.',
      'Scientists are still studying why sleep is so important. One thing is clear: just like us, animals cannot live well ( D ) enough rest.',
    ],
    ja: [
      'すべての動物には休むことが必要ですが、そのねむり方はとてもさまざまです。長い時間ねむる動物もいれば、短い時間しかねむらない動物もいます。',
      'コアラはよくねむることで有名です。1日に約20時間ねむります。えさのユーカリの葉からはほんの少しのエネルギーしかとれないので、ねむってエネルギーを節約する必要があるのです。',
      'いっぽう、キリンは1日に数時間しかねむりません。横になると危険な動物からにげにくくなるので、立ったままねむることがよくあります。',
      'イルカなどの海の動物には、特別なねむり方があります。脳の半分ずつしかねむらないのです。こうすることで、泳ぎつづけて、息をするために水面に上がってくることができます。',
      'なぜすいみんがそんなに大切なのか、科学者たちは今も研究しています。1つはっきりしているのは、私たちと同じように、動物も十分な休みがなければ元気に生きられないということです。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', 'since'], answer: 1, why: 'for a short time で「短い時間」。' },
      { id: 'B', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'be famous for 〜 で「〜で有名だ」。' },
      { id: 'C', choices: ['for', 'of', 'to', 'with'], answer: 2, why: '「息をするために」なので目的の不定詞 to。' },
      { id: 'D', choices: ['by', 'for', 'with', 'without'], answer: 3, why: '「十分な休みがなければ」なので without。' },
    ],
    insert: { sentence: 'Because of this, they can fall asleep quickly and wake up quickly, too.', after: [0, 1, 2, 3], answer: 2, why: '立ったままねむり、すぐにげられるようにするキリンの説明（第3段落）のあとに入る。' },
    tf: [
      { statement: 'Koalas sleep about twenty hours a day.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Eucalyptus leaves give koalas a lot of energy.', answer: false, why: 'ほんの少しのエネルギーしかとれない。' },
      { statement: 'Giraffes often sleep standing up.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Dolphins sleep with their whole brain at one time.', answer: false, why: '脳の半分ずつねむる。' },
      { statement: 'Scientists already know everything about sleep.', answer: false, why: '今も研究している。' },
    ],
  },
  {
    id: 'talk-shopping',
    title: 'At a Clothes Shop',
    level: '中2（会話文）',
    paragraphs: [
      'Clerk: Hello. May I help you?',
      'Yuna: Yes, please. I\'m looking ( A ) a T-shirt for my brother. It\'s his birthday next week.',
      'Clerk: How about this blue one? It\'s very popular ( B ) young people.',
      'Yuna: It looks nice. Do you have it in a smaller size? My brother is only twelve.',
      'Clerk: Yes, we have a small one. Here you are. It\'s 2,000 yen.',
      'Yuna: Hmm, that\'s a little expensive. Do you have a cheaper one?',
      'Clerk: This green one is 1,500 yen. It\'s on sale this week.',
      'Yuna: Great! Green is his favorite color. I\'ll take it. Could you wrap it ( C ) a present?',
      'Clerk: Of course. Please wait ( D ) a moment.',
    ],
    ja: [
      '店員：いらっしゃいませ。何かおさがしですか。',
      'ユナ：はい。弟にTシャツをさがしているんです。来週が誕生日なので。',
      '店員：この青いのはいかがですか。若い人にとても人気がありますよ。',
      'ユナ：すてきですね。もっと小さいサイズはありますか。弟はまだ12歳なんです。',
      '店員：はい、小さいサイズがあります。どうぞ。2,000円です。',
      'ユナ：うーん、ちょっと高いですね。もっと安いのはありますか。',
      '店員：この緑のは1,500円です。今週はセール中なんですよ。',
      'ユナ：いいですね！ 緑は弟の好きな色なんです。これにします。プレゼント用につつんでもらえますか。',
      '店員：もちろんです。少々お待ちください。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'into', 'like'], answer: 1, why: 'look for 〜 で「〜をさがす」。' },
      { id: 'B', choices: ['among', 'between', 'of', 'to'], answer: 0, why: 'popular among 〜 で「〜の間で人気がある」。' },
      { id: 'C', choices: ['as', 'by', 'in', 'with'], answer: 0, why: 'as a present で「プレゼントとして」。' },
      { id: 'D', choices: ['at', 'for', 'in', 'on'], answer: 1, why: 'wait for a moment で「少し待つ」。' },
    ],
    qa: [{ q: 'How much is the green T-shirt?', choices: ['1,500 yen.', '2,000 yen.', '1,000 yen.', '2,500 yen.'], answer: 0, why: '店員の4つ目の発言「緑のは1,500円」。' }],
    tf: [
      { statement: 'Yuna is looking for a present for her brother.', answer: true, why: 'ユナの1つ目の発言と合う。' },
      { statement: "Yuna's brother is twenty years old.", answer: false, why: '12歳。' },
      { statement: 'The blue T-shirt is 2,000 yen.', answer: true, why: '店員の3つ目の発言と合う。' },
      { statement: 'Blue is her brother\'s favorite color.', answer: false, why: '好きな色は緑。' },
      { statement: 'Yuna buys the green T-shirt.', answer: true, why: '「これにします」と言っている。' },
    ],
  },
  {
    id: 'bus-seat',
    title: 'A Seat on the Bus',
    level: '中2〜中3（物語）',
    paragraphs: [
      'Every morning, Kenji takes a bus to school. One rainy morning, the bus was very crowded. Kenji was lucky ( A ) find a seat near the door.',
      'At the next stop, an old man with a cane got on. He looked tired, and he held the strap tightly. Kenji wanted to give him his seat, but he felt shy. "What if he says no?" he thought.',
      'Then a little girl standing next to Kenji said ( B ) a loud voice, "Please sit here!" She pointed at Kenji\'s seat. Kenji\'s face turned red, but he quickly stood up and said, "Please take my seat."',
      'The old man smiled and said, "Thank you, young man. You are very kind." Kenji felt a little sorry because the girl had helped him, not the other way around.',
      'Since that day, Kenji has never waited ( C ) someone else to act first. When he sees someone who needs help, he speaks up right away. He learned that a small action needs only a little courage, and it can make someone\'s day better ( D ) a long time.',
    ],
    ja: [
      'ケンジは毎朝バスで学校に通っています。ある雨の朝、バスはとても混んでいました。ケンジは運よくドアの近くの席を見つけることができました。',
      '次のバス停で、つえをついたおじいさんが乗ってきました。おじいさんはつかれているようで、つり革をしっかりにぎっていました。ケンジは席をゆずりたいと思いましたが、はずかしく感じました。「ことわられたらどうしよう」と思ったのです。',
      'そのとき、ケンジのとなりに立っていた小さな女の子が大きな声で「ここにすわってください！」と言いました。女の子はケンジの席を指さしていました。ケンジは顔が赤くなりましたが、すぐに立ち上がって「どうぞ、すわってください」と言いました。',
      'おじいさんはほほえんで「ありがとう、お兄さん。とても親切だね」と言いました。ケンジは、自分が女の子を助けたのではなく、女の子に助けられたので、少し申しわけなく思いました。',
      'その日から、ケンジはほかの人が先に動くのを待つことがなくなりました。助けが必要な人を見かけたら、すぐに声をかけます。小さな行動に必要なのはほんの少しの勇気で、それがだれかの1日を長い間よいものにできるのだと学んだのです。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'of', 'to', 'with'], answer: 2, why: 'be lucky to 〜 で「運よく〜する」（感情・判断の原因の不定詞）。' },
      { id: 'B', choices: ['at', 'by', 'in', 'with'], answer: 2, why: 'in a loud voice で「大きな声で」。' },
      { id: 'C', choices: ['at', 'for', 'on', 'to'], answer: 1, why: 'wait for 人 to 〜 で「人が〜するのを待つ」。' },
      { id: 'D', choices: ['during', 'for', 'in', 'since'], answer: 1, why: 'for a long time で「長い間」。' },
    ],
    seq: { events: ['An old man with a cane got on the bus.', 'Kenji found a seat near the door.', 'Kenji stood up and gave his seat.', 'A little girl said, "Please sit here!"'], answer: [1, 0, 3, 2], why: '席を見つける → おじいさんが乗る → 女の子が声をかける → ケンジが席をゆずる。' },
    tf: [
      { statement: 'It was raining on the morning of the story.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Kenji gave his seat to the old man as soon as he got on.', answer: false, why: 'はずかしくてすぐにはゆずれなかった。' },
      { statement: 'A little girl spoke first.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'The old man was angry with Kenji.', answer: false, why: 'ほほえんでお礼を言った。' },
      { statement: 'Now Kenji speaks up right away when someone needs help.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'braille-blocks',
    title: 'The Yellow Blocks on the Sidewalk',
    level: '中3（説明文）',
    paragraphs: [
      'Have you ever noticed yellow blocks on sidewalks and train station floors? They are called tactile paving. They help people who cannot see well ( A ) walk safely.',
      'These blocks were first made in Japan in 1967 by a man named Seiichi Miyake. Now they are used in many countries ( B ) the world.',
      'There are two main kinds of blocks. Blocks with long lines show the direction to walk. Blocks with small dots mean "stop" or "be careful." You can find them in front of stairs and at the edge of train platforms.',
      'People with poor eyesight feel the blocks with their feet or a white cane. Yellow is used because it is easy to see for people who can see a little.',
      'However, some people put bikes or bags on the blocks without thinking. This can be very dangerous. We should keep the blocks clear so that everyone can walk ( C ) worry. Small actions like this make our town kinder ( D ) everyone.',
    ],
    ja: [
      '歩道や駅のゆかにある黄色いブロックに気づいたことはありますか。これは点字ブロック（視覚障害者誘導用ブロック）と呼ばれています。目がよく見えない人が安全に歩くのを助けています。',
      'このブロックは1967年に、三宅精一という人によって日本で初めてつくられました。今では世界中の多くの国で使われています。',
      'ブロックには主に2つの種類があります。長い線のあるブロックは、歩く方向を示しています。小さな点のあるブロックは「止まれ」や「注意」を意味します。階段の前や駅のホームのはしで見つけることができます。',
      '目の不自由な人は、足や白いつえでブロックを感じとります。少し見える人にとって見えやすいので、黄色が使われています。',
      'しかし、何も考えずにブロックの上に自転車やかばんを置いてしまう人もいます。これはとても危険です。だれもが心配なく歩けるように、ブロックの上には物を置かないようにしましょう。このような小さな行動が、町をすべての人にやさしくするのです。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'for', 'of', 'to'], answer: 3, why: 'help 人 (to) 〜 で「人が〜するのを助ける」。' },
      { id: 'B', choices: ['across', 'among', 'between', 'into'], answer: 0, why: 'across the world で「世界中で」。' },
      { id: 'C', choices: ['by', 'for', 'with', 'without'], answer: 3, why: 'without worry で「心配なく」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 1, why: 'kinder for everyone で「すべての人にとってやさしい」。' },
    ],
    pick2: {
      statements: ['The blocks were first made in Japan.', 'Blocks with long lines mean "stop."', 'The blocks are used only in Japan.', 'Blocks with small dots are found in front of stairs.', 'Yellow is hard to see.', 'Putting bikes on the blocks is safe.'],
      answers: [0, 3],
      why: '第2段落「日本で初めてつくられた」、第3段落「点のブロックは階段の前にある」。',
    },
    titleQ: { choices: ['How to Ride a Bike Safely', 'The Yellow Blocks on the Sidewalk', 'Train Stations in Japan', 'The History of the White Cane'], answer: 1, why: '歩道や駅にある黄色い点字ブロックについての文章。' },
    tf: [
      { statement: 'Seiichi Miyake made the first blocks in 1967.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'There are two main kinds of blocks.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Blocks with small dots show the direction to walk.', answer: false, why: '方向を示すのは長い線のブロック。' },
      { statement: 'People feel the blocks with their hands.', answer: false, why: '足や白いつえで感じとる。' },
      { statement: 'The writer says we should keep the blocks clear.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'speech-phone',
    title: 'My Smartphone Rules (Speech)',
    level: '中3（スピーチ）',
    paragraphs: [
      'Hello, everyone. Last year, I got my first smartphone. I was so happy that I used it all the time. I watched videos until late at night and checked messages ( A ) meals.',
      'After a few months, I noticed some problems. I was always sleepy in class, and my grades went down. I also talked ( B ) my family less than before.',
      'So I decided to make my own rules. First, I put my phone in the living room at nine p.m. Second, I don\'t use it while I am eating. Third, I turn off notifications when I study.',
      'At first, it was hard to follow the rules. But after two weeks, I started to sleep better, and I could focus on my studies. Now I enjoy talking with my family ( C ) dinner again.',
      'Smartphones are very useful, but we should control them. I don\'t want them to control me. I hope you will think about your own rules, too. Thank you ( D ) listening.',
    ],
    ja: [
      'みなさん、こんにちは。去年、私は初めてのスマートフォンを手に入れました。とてもうれしかったので、いつも使っていました。夜おそくまで動画を見て、食事中もメッセージを確認していました。',
      '数か月たつと、いくつか問題に気づきました。授業中はいつもねむく、成績も下がりました。また、前より家族と話さなくなっていました。',
      'そこで、自分のルールをつくることにしました。1つ目に、夜9時にはスマートフォンを居間に置きます。2つ目に、食べている間は使いません。3つ目に、勉強するときは通知を切ります。',
      '最初はルールを守るのが大変でした。でも2週間たつと、よくねむれるようになり、勉強に集中できるようになりました。今ではまた、夕食の間に家族と話すのを楽しんでいます。',
      'スマートフォンはとても便利ですが、私たちが使い方をコントロールするべきです。スマートフォンに自分がコントロールされたくはありません。みなさんも自分のルールについて考えてみてください。ご清聴ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['during', 'for', 'since', 'while'], answer: 0, why: '後ろが名詞（meals）なので前置詞 during。' },
      { id: 'B', choices: ['about', 'at', 'for', 'with'], answer: 3, why: 'talk with 人 で「人と話す」。' },
      { id: 'C', choices: ['at', 'during', 'since', 'until'], answer: 1, why: '「夕食の間に」なので during dinner。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 1, why: 'Thank you for 〜ing で「〜してくれてありがとう」。' },
    ],
    qa: [{ q: 'What does the speaker do at nine p.m.?', choices: ['Puts the phone in the living room.', 'Watches videos.', 'Goes to bed.', 'Checks messages.'], answer: 0, why: '第3段落「夜9時にはスマートフォンを居間に置く」。' }],
    order: { words: ['decided', 'my', 'to', 'I', 'make'], rest: 'own rules.', answer: 'I decided to make my', ja: '私は自分のルールをつくることにした。' },
    tf: [
      { statement: 'The speaker got a first smartphone last year.', answer: true, why: '第1段落の内容と合う。' },
      { statement: "The speaker's grades went up after getting the phone.", answer: false, why: '成績は下がった。' },
      { statement: 'The speaker made three rules.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'It was easy to follow the rules from the first day.', answer: false, why: '最初は大変だった。' },
      { statement: 'The speaker now enjoys talking with family at dinner.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'email-recipe',
    title: 'An Email with a Recipe',
    level: '中2〜中3（メール）',
    paragraphs: [
      'Hi Anna,',
      'Thank you for the cookies you sent me! They were delicious. In return, I\'d like to share a recipe for a Japanese dish called onigiri. It\'s very easy to make.',
      'First, wash your hands and wet them ( A ) a little water. Then put some salt on your hands. Take some warm rice and put a filling in the middle. Popular fillings are salmon, tuna, and umeboshi, a kind of pickled plum.',
      'Next, cover the filling with rice and press it gently ( B ) your hands to make a triangle. Don\'t press too hard, or the rice will become hard. Finally, wrap it ( C ) a sheet of nori.',
      'Onigiri are perfect for lunch boxes and picnics. Please try making them with your family and tell me ( D ) they taste!',
      'Best,\nRiko',
    ],
    ja: [
      'アンナへ',
      '送ってくれたクッキーをありがとう！ とてもおいしかったです。お返しに、おにぎりという日本の料理のつくり方を教えたいと思います。とてもかんたんにつくれます。',
      'まず、手を洗って、少しの水で手をぬらします。それから手に塩をつけます。あたたかいご飯をとって、真ん中に具を入れます。人気の具は、さけ、ツナ、そして梅干し（梅のつけもの）です。',
      '次に、具をご飯でつつんで、手でやさしくにぎって三角形にします。強くにぎりすぎないでね。ご飯がかたくなってしまうから。最後に、のりを1まいまきます。',
      'おにぎりはお弁当やピクニックにぴったりです。家族といっしょにつくってみて、どんな味だったか教えてね！',
      'それでは。リコより',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'for', 'with'], answer: 3, why: 'wet A with B で「A を B でぬらす」。' },
      { id: 'B', choices: ['at', 'by', 'of', 'with'], answer: 3, why: 'with your hands で「手で（道具）」。' },
      { id: 'C', choices: ['at', 'in', 'on', 'to'], answer: 1, why: 'wrap A in B で「A を B でつつむ」。' },
      { id: 'D', choices: ['how', 'what', 'when', 'where'], answer: 0, why: 'tell me how they taste で「どんな味か教えて」。' },
    ],
    seq: { events: ['Wrap the onigiri in nori.', 'Wet your hands with water.', 'Put a filling in the middle of the rice.', 'Press the rice into a triangle.'], answer: [1, 2, 3, 0], why: '手をぬらす → 具を入れる → 三角ににぎる → のりをまく。' },
    tf: [
      { statement: 'Anna sent Riko some cookies.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Riko says onigiri are hard to make.', answer: false, why: 'とてもかんたんにつくれる。' },
      { statement: 'Umeboshi is a kind of pickled plum.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'You should press the rice very hard.', answer: false, why: '強くにぎりすぎないように言っている。' },
      { statement: 'Riko wants Anna to make onigiri with her family.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'rainbow-science',
    title: 'How a Rainbow Appears',
    level: '中3（説明文）',
    paragraphs: [
      'Have you ever seen a rainbow after the rain? Rainbows are beautiful, but do you know how they appear? A rainbow appears when sunlight passes ( A ) small drops of water in the air.',
      'Sunlight looks white, but it is really made of many colors. When the light goes into a drop of water, it bends. Each color bends a little differently, so the colors separate from each other.',
      'To see a rainbow, the sun must be ( B ) you, and the rain must be in front of you. That is why rainbows often appear in the morning or late afternoon, when the sun is low in the sky.',
      'In Japan, people usually say that a rainbow has seven colors. However, in some other countries, people say it has six or even fewer colors. The number depends ( C ) the culture and language.',
      'You can also make a small rainbow by yourself. On a sunny day, stand with your back to the sun and spray water ( D ) a hose. If you are lucky, you will see a rainbow in the water.',
    ],
    ja: [
      '雨のあとににじを見たことがありますか。にじは美しいですが、どのようにしてできるか知っていますか。にじは、日光が空気中の小さな水のつぶを通りぬけるときにあらわれます。',
      '日光は白く見えますが、本当はたくさんの色でできています。光が水のつぶに入ると、曲がります。それぞれの色は少しずつちがう曲がり方をするので、色が分かれるのです。',
      'にじを見るには、太陽が自分のうしろにあり、雨が自分の前になければなりません。だから、にじは太陽が空の低いところにある朝や夕方によくあらわれます。',
      '日本では、ふつうにじは7色だと言われます。しかし、ほかのいくつかの国では、6色かそれより少ないと言われています。色の数は文化や言語によってちがうのです。',
      '自分で小さなにじをつくることもできます。晴れた日に、太陽に背を向けて立ち、ホースで水をまいてみましょう。運がよければ、水の中ににじが見えるでしょう。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'over', 'through', 'under'], answer: 2, why: 'pass through 〜 で「〜を通りぬける」。' },
      { id: 'B', choices: ['above', 'behind', 'in front of', 'under'], answer: 1, why: '雨が前にあるので、太陽は「うしろに（behind）」。' },
      { id: 'C', choices: ['at', 'for', 'in', 'on'], answer: 3, why: 'depend on 〜 で「〜によって決まる」。' },
      { id: 'D', choices: ['at', 'by', 'of', 'with'], answer: 3, why: 'with a hose で「ホースで（道具）」。' },
    ],
    vocab: [{ word: 'separate', choices: ['分かれる', 'まざる', '消える', '光る'], answer: 0, why: '色ごとに曲がり方がちがうので、色どうしが「分かれる」。' }],
    pick2: {
      statements: ['Sunlight is made of only one color.', 'Light bends when it goes into a drop of water.', 'Rainbows often appear at noon.', 'You need the sun behind you to see a rainbow.', 'Everyone in the world says a rainbow has seven colors.', 'You cannot make a rainbow by yourself.'],
      answers: [1, 3],
      why: '第2段落「光が水のつぶに入ると曲がる」、第3段落「太陽がうしろに」。',
    },
    titleQ: { choices: ['Why It Rains in June', 'Colors of Flowers', 'How a Rainbow Appears', 'How to Use a Hose'], answer: 2, why: 'にじができるしくみと、見え方、色の数について書かれている。' },
    paraSeq: { at: 1, shown: [2, 0, 1], why: '「日光は白く見えるが多くの色でできている」→「水のつぶに入ると曲がる」→「色ごとに曲がり方がちがうので分かれる」の順。' },
    tf: [
      { statement: 'A rainbow appears when sunlight passes through drops of water.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Each color bends in exactly the same way.', answer: false, why: '少しずつちがう曲がり方をする。' },
      { statement: 'Rainbows often appear when the sun is low.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'People in all countries agree on the number of colors.', answer: false, why: '文化や言語によってちがう。' },
      { statement: 'You can make a rainbow with a hose.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'talk-hospital',
    title: 'At the Doctor\'s',
    level: '中2（会話文）',
    paragraphs: [
      'Doctor: Good morning. What\'s wrong?',
      'Takumi: I have a headache, and I feel very tired. I also have a little fever, and my throat hurts.',
      'Doctor: I see. When did it start?',
      'Takumi: It started ( A ) yesterday evening. I couldn\'t sleep well last night.',
      'Doctor: Let me check. ... You have a cold. It\'s not serious, but you should rest at home ( B ) a few days.',
      'Takumi: Can I go to soccer practice on Saturday?',
      'Doctor: I\'m afraid not. You need to rest. Drink a lot of water and take this medicine ( C ) every meal.',
      'Takumi: OK. Thank you, doctor.',
      'Doctor: You\'re welcome. If you don\'t get better ( D ) three days, please come back.',
    ],
    ja: [
      '医者：おはようございます。どうしましたか。',
      'タクミ：頭がいたくて、とてもだるいです。それに少し熱もあって、のどもいたいです。',
      '医者：なるほど。いつからですか。',
      'タクミ：きのうの夕方からです。昨夜はよくねむれませんでした。',
      '医者：みてみましょう。……かぜですね。重くはありませんが、数日は家で休んだほうがいいですよ。',
      'タクミ：土曜日のサッカーの練習には行けますか。',
      '医者：残念ですが、だめです。休む必要があります。水をたくさん飲んで、毎食後にこの薬を飲んでください。',
      'タクミ：わかりました。ありがとうございます、先生。',
      '医者：どういたしまして。3日たってもよくならなければ、また来てください。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', '（何も入らない）'], answer: 3, why: 'yesterday evening の前には前置詞をつけない（It started yesterday evening.）。' },
      { id: 'B', choices: ['during', 'for', 'in', 'since'], answer: 1, why: '「数日（の間）」は for a few days。' },
      { id: 'C', choices: ['after', 'before', 'during', 'until'], answer: 0, why: '「毎食後に」なので after every meal。' },
      { id: 'D', choices: ['at', 'for', 'in', 'since'], answer: 2, why: 'in three days で「3日たって（3日のうちに）」。' },
    ],
    qa: [{ q: 'What does the doctor say about soccer practice?', choices: ['Takumi should not go.', 'Takumi can go.', 'Takumi should go early.', 'The doctor will go with him.'], answer: 0, why: '医者は「残念ですが、だめです。休む必要があります」と言っている。' }],
    tf: [
      { statement: 'Takumi has a headache.', answer: true, why: 'タクミの1つ目の発言と合う。' },
      { statement: 'Takumi slept well last night.', answer: false, why: 'よくねむれなかった。' },
      { statement: 'The doctor says Takumi has a serious illness.', answer: false, why: '重くはないかぜ。' },
      { statement: 'Takumi should drink a lot of water.', answer: true, why: '医者の4つ目の発言と合う。' },
      { statement: 'Takumi should come back if he does not get better in three days.', answer: true, why: '最後の発言と合う。' },
    ],
  },
  {
    id: 'old-camera',
    title: 'Grandma\'s Old Camera',
    level: '中2〜中3（物語）',
    paragraphs: [
      'While cleaning the closet, Yuto found an old camera in a box. It was heavy and had no screen. "That was my camera," his grandmother said. "I took pictures with it ( A ) I was young."',
      'Yuto was curious. "How can you see the pictures?" he asked. His grandmother smiled. "You have to wait until the film is developed. You can\'t see them ( B ) away."',
      'They bought a roll of film at a camera shop and went for a walk in the park. Yuto could take only twenty-four pictures, so he thought carefully before each one. He took pictures of flowers, a river, and his grandmother on a bench.',
      'A week later, they picked up the printed photos. Some were dark, and one was blurry. But Yuto liked them very much. "I remember every moment ( C ) these photos," he said.',
      'Now Yuto still uses his smartphone, but he sometimes uses the old camera, too. He has learned that taking fewer pictures can make each one more special. His grandmother is happy that her camera is being used ( D ).',
    ],
    ja: [
      'クローゼットをそうじしていたとき、ユウトは箱の中に古いカメラを見つけました。重くて画面がありませんでした。「それはおばあちゃんのカメラよ」とおばあさんは言いました。「若いころ、それで写真をとっていたの」。',
      'ユウトは興味をもちました。「どうやって写真を見るの？」とたずねました。おばあさんはほほえみました。「フィルムを現像するまで待たないといけないの。すぐには見られないのよ」。',
      '2人はカメラ屋さんでフィルムを1本買って、公園へ散歩に行きました。ユウトは24まいしかとれないので、1まいずつよく考えてからとりました。花や川、ベンチにすわるおばあさんの写真をとりました。',
      '1週間後、2人は印刷された写真を受け取りました。暗いものもあり、1まいはぼやけていました。でもユウトはとても気に入りました。「この写真の1まい1まいの瞬間を覚えているよ」と彼は言いました。',
      '今もユウトはスマートフォンを使っていますが、ときどき古いカメラも使います。とる写真が少ないほうが、1まい1まいが特別になると学んだのです。おばあさんは、自分のカメラがまた使われているのを喜んでいます。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'if', 'until', 'when'], answer: 3, why: '「若いころに」なので when。' },
      { id: 'B', choices: ['away', 'off', 'out', 'right'], answer: 3, why: 'right away で「すぐに」（文の形は see them right away）。' },
      { id: 'C', choices: ['at', 'for', 'in', 'on'], answer: 2, why: 'in these photos で「これらの写真の中の」。' },
      { id: 'D', choices: ['again', 'ago', 'before', 'yet'], answer: 0, why: '「また使われている」なので again。' },
    ],
    seq: { events: ['Yuto took pictures in the park.', 'Yuto found an old camera in a box.', 'They picked up the printed photos.', 'They bought a roll of film.'], answer: [1, 3, 0, 2], why: 'カメラを見つける → フィルムを買う → 公園で写真をとる → 写真を受け取る。' },
    tf: [
      { statement: "The old camera had a screen.", answer: false, why: '画面がなかった。' },
      { statement: 'Yuto could take only twenty-four pictures.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'All the photos were clear and bright.', answer: false, why: '暗いものやぼやけたものもあった。' },
      { statement: 'Yuto liked the photos very much.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Yuto never uses his smartphone now.', answer: false, why: '今もスマートフォンを使っている。' },
    ],
  },
  {
    id: 'volcano-japan',
    title: 'Living with Volcanoes',
    level: '中3（説明文）',
    paragraphs: [
      'Japan has more than one hundred active volcanoes. Mt. Fuji, the highest mountain in Japan, is also a volcano. It last erupted ( A ) 1707, more than three hundred years ago.',
      'Volcanoes can be dangerous. When they erupt, hot rocks and ash can fall on towns and damage houses and farms. That is why scientists watch active volcanoes ( B ) day and night.',
      'However, volcanoes also give us many good things. Hot springs, or onsen, are heated by the heat from deep under the ground. Many people visit onsen towns to relax and enjoy the views.',
      'Volcanic soil is also good for growing some kinds of vegetables and fruit. In addition, some areas use the heat from the ground to make electricity. This is called geothermal power, and it does not produce much carbon dioxide.',
      'People in Japan have lived ( C ) volcanoes for a long time. It is important to know what to do if an eruption happens and to enjoy the gifts that volcanoes give ( D ) us.',
    ],
    ja: [
      '日本には100以上の活火山があります。日本でいちばん高い山である富士山も火山です。最後に噴火したのは1707年で、300年以上前のことです。',
      '火山は危険なこともあります。噴火すると、熱い岩や灰が町にふってきて、家や畑に被害をあたえることがあります。だから科学者たちは昼も夜も活火山を観測しているのです。',
      'しかし、火山は私たちにたくさんのよいものもあたえてくれます。温泉は、地下深くの熱によってあたためられています。多くの人が、くつろいだり景色を楽しんだりするために温泉町をおとずれます。',
      '火山の土は、ある種類の野菜や果物を育てるのにも向いています。さらに、地面の熱を使って電気をつくっている地域もあります。これは地熱発電と呼ばれ、二酸化炭素をあまり出しません。',
      '日本の人々は長い間、火山とともにくらしてきました。噴火が起きたときにどうすればよいかを知り、火山が私たちにあたえてくれるめぐみを楽しむことが大切です。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'since'], answer: 1, why: '年の前は in（in 1707）。' },
      { id: 'B', choices: ['all', 'both', 'each', 'every'], answer: 1, why: 'both day and night で「昼も夜も」。' },
      { id: 'C', choices: ['by', 'for', 'of', 'with'], answer: 3, why: 'live with 〜 で「〜とともにくらす」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'give 物 to 人 の形（the gifts that volcanoes give to us）。' },
    ],
    vocab: [{ word: 'erupted', choices: ['噴火した', 'くずれた', 'こおった', 'しずんだ'], answer: 0, why: '火山について「最後に〜したのは1707年」とあるので「噴火した」。' }],
    summary: {
      text: 'Volcanoes can be ( 1 ), but they also give us hot springs, good soil, and a way to make ( 2 ).',
      blanks: [
        { choices: ['dangerous', 'boring', 'cheap', 'quiet'], answer: 0, why: '第2段落「火山は危険なこともある」。' },
        { choices: ['electricity', 'clothes', 'paper', 'music'], answer: 0, why: '第4段落「地面の熱を使って電気をつくる」。' },
      ],
    },
    refer: { phrase: 'It last erupted', word: 'It', choices: ['Mt. Fuji', 'Japan', 'a hot spring', 'the sea'], answer: 0, why: '直前の文の Mt. Fuji を指している。' },
    paraSeq: { at: 2, shown: [2, 0, 1], why: '「しかし火山はよいものもくれる」→「温泉は地下の熱であたためられる」→「多くの人が温泉町を訪れる」の順。However で話題が変わる文が最初。' },
    tf: [
      { statement: 'Mt. Fuji is a volcano.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Mt. Fuji erupted last year.', answer: false, why: '最後の噴火は1707年。' },
      { statement: 'Scientists watch active volcanoes only during the day.', answer: false, why: '昼も夜も観測している。' },
      { statement: 'Onsen are heated by heat from under the ground.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Geothermal power produces a lot of carbon dioxide.', answer: false, why: '二酸化炭素をあまり出さない。' },
    ],
  },
  {
    id: 'speech-club',
    title: 'What My Club Taught Me (Speech)',
    level: '中3（スピーチ）',
    paragraphs: [
      'Hello, everyone. I have been a member of the brass band ( A ) three years. Today I want to talk about what I learned from it.',
      'When I joined the club, I could not play the trumpet at all. I practiced every day, but I often made mistakes. Some days, I wanted to quit because I thought I was not good ( B ) music.',
      'One day, our club leader told me, "Our music is not made by one person. Everyone helps each other." After that, I started to listen ( C ) the other members more carefully when we played together.',
      'Last summer, we joined a big contest. We did not win first prize, but many people in the audience stood up and clapped for us. I was so moved that I almost cried.',
      'From my club, I learned that working together is more important than being the best alone. I will remember this lesson ( D ) high school. Thank you for listening.',
    ],
    ja: [
      'みなさん、こんにちは。私は3年間吹奏楽部に入っています。今日は、そこから学んだことをお話ししたいと思います。',
      '入部したとき、私はトランペットがまったくふけませんでした。毎日練習しましたが、よくまちがえました。自分は音楽が得意ではないと思って、やめたくなる日もありました。',
      'ある日、部長が私に「私たちの音楽は1人でつくるものじゃない。みんなで助け合うんだよ」と言いました。それから、いっしょに演奏するときに、ほかの部員の音をもっと注意して聞くようになりました。',
      '去年の夏、私たちは大きなコンクールに出ました。1位にはなれませんでしたが、客席の多くの人が立ち上がって拍手してくれました。私はとても感動して、泣きそうになりました。',
      '部活から、1人でいちばんになることよりも、力を合わせることのほうが大切だと学びました。高校に行ってもこの教えをわすれません。ご清聴ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['during', 'for', 'in', 'since'], answer: 1, why: '「3年間」のように期間の長さは for。' },
      { id: 'B', choices: ['at', 'for', 'in', 'of'], answer: 0, why: 'be good at 〜 で「〜が得意だ」。' },
      { id: 'C', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'listen to 〜 で「〜を聞く」。' },
      { id: 'D', choices: ['at', 'by', 'in', 'on'], answer: 2, why: 'in high school で「高校で（高校に入っても）」。' },
    ],
    gist: [{ para: 2, choices: ['部長の言葉で考えが変わったこと', 'トランペットの値段', 'コンクールの結果', '部活をやめた理由'], answer: 0, why: '第3段落は、部長の言葉をきっかけにほかの部員の音を聞くようになった話。' }],
    tf: [
      { statement: 'The speaker has been in the brass band for three years.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'The speaker could play the trumpet well from the start.', answer: false, why: 'まったくふけなかった。' },
      { statement: 'The club leader said music is made by one person.', answer: false, why: '1人でつくるものではないと言った。' },
      { statement: 'The band won first prize last summer.', answer: false, why: '1位にはなれなかった。' },
      { statement: 'The speaker learned that working together is important.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'lost-glove',
    title: 'The Little Red Glove',
    level: '中2〜中3（物語）',
    paragraphs: [
      'On a snowy morning, Hina found a little red glove ( A ) the path to the station. It was very small, so she thought it belonged to a child.',
      'Hina did not want the child to have cold hands, so she put the glove on top of a fence where people could see it easily. Then she went ( B ) school.',
      'On her way home, Hina saw that the glove was still on the fence. She felt a little sad. "Maybe nobody noticed it," she thought.',
      'The next morning, the glove was gone. Instead, there was a small piece of paper ( C ) the fence. It said, "Thank you for finding my glove! My hands are warm now." Next to the words, there was a drawing of a smiling girl and a red glove.',
      'Hina smiled and kept the paper in her notebook. She learned that a small kind action can make someone happy, even ( D ) you never meet that person.',
    ],
    ja: [
      '雪の朝、ヒナは駅へ行く道で小さな赤い手ぶくろを見つけました。とても小さかったので、子どものものだと思いました。',
      'ヒナはその子の手が冷たくならないようにと思い、人が見つけやすいように手ぶくろをフェンスの上に置きました。それから学校へ行きました。',
      '帰り道、ヒナは手ぶくろがまだフェンスの上にあるのを見ました。少し悲しくなりました。「だれも気づかなかったのかな」と思いました。',
      '次の朝、手ぶくろはなくなっていました。かわりに、フェンスに小さな紙がついていました。「手ぶくろを見つけてくれてありがとう！ もう手があたたかいよ」と書いてありました。言葉のとなりには、笑っている女の子と赤い手ぶくろの絵がかいてありました。',
      'ヒナはほほえんで、その紙をノートにはさんでとっておきました。小さな親切は、たとえその人に一度も会わなくても、だれかを幸せにできるのだと学びました。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'on', 'under'], answer: 2, why: 'on the path で「道の上で」。' },
      { id: 'B', choices: ['at', 'for', 'in', 'to'], answer: 3, why: 'go to school で「学校へ行く」。' },
      { id: 'C', choices: ['by', 'in', 'of', 'on'], answer: 3, why: 'on the fence で「フェンス（の表面）に」。' },
      { id: 'D', choices: ['because', 'if', 'so', 'when'], answer: 1, why: 'even if 〜 で「たとえ〜でも」。' },
    ],
    seq: { events: ['Hina saw the glove was still on the fence.', 'Hina found a little red glove.', 'Hina found a piece of paper on the fence.', 'Hina put the glove on top of a fence.'], answer: [1, 3, 0, 2], why: '手ぶくろを見つける → フェンスに置く → 帰りにまだある → 次の朝メモがある。' },
    refer: { phrase: 'It said', word: 'It', choices: ['the paper', 'the glove', 'the fence', 'the notebook'], answer: 0, why: '「〜と書いてあった」のは小さな紙。' },
    tf: [
      { statement: 'Hina found the glove on a rainy morning.', answer: false, why: '雪の朝。' },
      { statement: 'Hina put the glove on top of a fence.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'The glove was gone when Hina came home that day.', answer: false, why: '帰り道ではまだあった。' },
      { statement: 'The paper had a drawing of a smiling girl.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Hina threw the paper away.', answer: false, why: 'ノートにはさんでとっておいた。' },
    ],
  },
  {
    id: 'water-saving',
    title: 'Every Drop Counts',
    level: '中3（説明文）',
    paragraphs: [
      'Water covers about seventy percent of the Earth, but most of it is salt water in the sea. Only a small part of the water on the Earth is fresh water that people can drink ( A ) use for farming.',
      'In Japan, we can get clean water easily by turning on a tap. However, in some parts of the world, people have to walk ( B ) hours every day to get water. Many children cannot go to school because they have to carry water for their families.',
      'We use a lot of water in our daily lives. For example, a shower of five minutes uses about sixty liters of water. If we leave the water running while we brush our teeth, we waste even more.',
      'There are easy ways to save water. Turn off the tap while you brush your teeth or wash dishes. Use the water from the bath to wash clothes or water plants. Fix taps that drip as soon ( C ) possible.',
      'Water is not endless. If everyone saves a little, it can make a big difference ( D ) people around the world and for the future.',
    ],
    ja: [
      '水は地球の約70パーセントをおおっていますが、そのほとんどは海の塩水です。人が飲んだり農業に使ったりできる淡水は、地球の水のほんの一部にすぎません。',
      '日本では、蛇口をひねれば、きれいな水がかんたんに手に入ります。しかし、世界のいくつかの地域では、水を手に入れるために毎日何時間も歩かなければならない人たちがいます。家族のために水を運ばなければならないので、学校に行けない子どもたちもたくさんいます。',
      '私たちは毎日の生活でたくさんの水を使っています。たとえば、5分間のシャワーで約60リットルの水を使います。歯をみがいている間に水を出しっぱなしにすると、さらに多くの水をむだにしてしまいます。',
      '水を節約するかんたんな方法があります。歯をみがいたり皿を洗ったりするときは、蛇口をしめましょう。おふろの残り湯を、洗たくや植物の水やりに使いましょう。水もれしている蛇口は、できるだけ早く直しましょう。',
      '水はかぎりなくあるわけではありません。みんなが少しずつ節約すれば、世界中の人々や未来にとって大きなちがいを生むことができます。',
    ],
    blanks: [
      { id: 'A', choices: ['and', 'but', 'or', 'so'], answer: 2, why: '「飲んだり、または農業に使ったり」なので or。' },
      { id: 'B', choices: ['at', 'for', 'in', 'since'], answer: 1, why: 'for hours で「何時間も」。' },
      { id: 'C', choices: ['as', 'so', 'than', 'that'], answer: 0, why: 'as soon as possible で「できるだけ早く」。' },
      { id: 'D', choices: ['at', 'by', 'for', 'of'], answer: 2, why: 'make a difference for 〜 で「〜にとってちがいを生む」。' },
    ],
    vocab: [{ word: 'drip', choices: ['（水が）ぽたぽた落ちる', 'こおる', '光る', '大きくなる'], answer: 0, why: '直すべき蛇口の様子なので、水が「ぽたぽた落ちる（水もれする）」。' }],
    pick2: {
      statements: ['Most of the water on the Earth is fresh water.', 'Some children cannot go to school because they carry water.', 'A five-minute shower uses about six liters of water.', 'We can use bath water to water plants.', 'Water is endless.', 'Everyone in the world can get water easily.'],
      answers: [1, 3],
      why: '第2段落「水を運ぶので学校に行けない子どもがいる」、第4段落「残り湯を植物の水やりに」。',
    },
    refer: { phrase: 'it can make a big difference', word: 'it', choices: ['saving a little water', 'the sea', 'the Earth', 'the tap'], answer: 0, why: '「みんなが少しずつ節約すれば、それが大きなちがいを生む」。' },
    tf: [
      { statement: 'Water covers about seventy percent of the Earth.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Most of the water on the Earth is fresh water.', answer: false, why: 'ほとんどは海の塩水。' },
      { statement: 'People in some places walk for hours to get water.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'We should leave the water running while brushing our teeth.', answer: false, why: '蛇口をしめるように言っている。' },
      { statement: 'Saving a little water can make a big difference.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'talk-presentation',
    title: 'Preparing a Presentation',
    level: '中2（会話文）',
    paragraphs: [
      'Ms. Kato: Hi, Rin. Are you ready ( A ) your presentation tomorrow?',
      'Rin: Not yet. I\'m going to talk about recycling, but I\'m worried about my English.',
      'Ms. Kato: Don\'t worry. Your topic is interesting. Have you practiced in front ( B ) anyone?',
      'Rin: Only in front of my cat. She fell asleep!',
      'Ms. Kato: Ha ha! Then why don\'t you practice in front of me now? I can give you some advice.',
      'Rin: Really? Thank you. ... How was it?',
      'Ms. Kato: Very good! But you spoke a little too fast. Try to speak slowly and look at the audience, not ( C ) your paper.',
      'Rin: I see. I\'ll practice again tonight. Can I also use pictures?',
      'Ms. Kato: Of course. Pictures will help the audience understand your ideas. Good luck ( D ) tomorrow!',
    ],
    ja: [
      '加藤先生：こんにちは、リン。明日の発表の準備はできた？',
      'リン：まだです。リサイクルについて話すつもりなんですが、英語が心配で。',
      '加藤先生：心配しないで。テーマはおもしろいわよ。だれかの前で練習した？',
      'リン：ねこの前でだけです。ねむっちゃいました！',
      '加藤先生：あはは！ じゃあ、今私の前で練習してみたら？ アドバイスできるわよ。',
      'リン：本当ですか。ありがとうございます。……どうでしたか。',
      '加藤先生：とてもよかったわ！ でも、少し速く話しすぎね。ゆっくり話して、紙じゃなくて聞いている人を見るようにしてね。',
      'リン：わかりました。今夜もう一度練習します。写真も使っていいですか。',
      '加藤先生：もちろん。写真は聞いている人があなたの考えを理解する助けになるわ。明日がんばってね！',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'of', 'to'], answer: 1, why: 'be ready for 〜 で「〜の準備ができている」。' },
      { id: 'B', choices: ['at', 'for', 'of', 'to'], answer: 2, why: 'in front of 〜 で「〜の前で」。' },
      { id: 'C', choices: ['at', 'for', 'in', 'on'], answer: 0, why: 'look at 〜 の at（not at your paper）。' },
      { id: 'D', choices: ['at', 'for', 'of', 'with'], answer: 3, why: 'Good luck with 〜 で「〜がうまくいきますように」。' },
    ],
    qa: [{ q: 'What advice did Ms. Kato give Rin?', choices: ['Speak slowly and look at the audience.', 'Speak faster.', 'Read the paper all the time.', 'Do not use pictures.'], answer: 0, why: '加藤先生の4つ目の発言。' }],
    tf: [
      { statement: 'Rin will talk about recycling.', answer: true, why: 'リンの1つ目の発言と合う。' },
      { statement: 'Rin practiced in front of her classmates.', answer: false, why: 'ねこの前でだけ練習した。' },
      { statement: 'Ms. Kato listened to Rin practice.', answer: true, why: '加藤先生の前で練習した。' },
      { statement: 'Ms. Kato said Rin spoke too slowly.', answer: false, why: '少し速すぎると言った。' },
      { statement: 'Ms. Kato said pictures will help the audience.', answer: true, why: '最後の発言と合う。' },
    ],
  },
  {
    id: 'email-sports-day',
    title: 'Sports Day Report',
    level: '中2〜中3（メール）',
    paragraphs: [
      'Dear Grandpa,',
      'How are you? Yesterday we had our sports day ( A ) school. I want to tell you about it.',
      'In the morning, I ran in the 100-meter race. I was nervous ( B ) the start, but I did my best and finished third. In the afternoon, our class did the tug of war. We pulled very hard and won!',
      'The best part of the day was the class relay. I was the last runner. When I got the baton, we were in fourth place. I ran as fast as I could and passed two runners. We finished second. Everyone in my class was cheering ( C ) me.',
      'Mom took a lot of pictures. I\'ll send some of them to you. Next year, I want to win first place in the relay. Please come and watch me ( D ) you can.',
      'Love,\nShota',
    ],
    ja: [
      'おじいちゃんへ',
      '元気ですか。きのう学校で運動会がありました。そのことを話したいと思います。',
      '午前中、ぼくは100メートル走に出ました。スタートのときは緊張したけど、ベストをつくして3位でした。午後には、クラスでつな引きをしました。とても強く引いて、勝ちました！',
      'いちばんよかったのはクラス対抗リレーです。ぼくはアンカーでした。バトンを受け取ったとき、ぼくたちは4位でした。できるだけ速く走って、2人をぬきました。2位でゴールしました。クラスのみんなが応援してくれていました。',
      'お母さんが写真をたくさんとってくれました。何まいか送るね。来年はリレーで1位になりたいです。来られたら見に来てね。',
      '大好きなおじいちゃんへ　ショウタより',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'for', 'to'], answer: 0, why: 'at school で「学校で」。' },
      { id: 'B', choices: ['at', 'by', 'for', 'on'], answer: 0, why: 'at the start で「スタートのときに」。' },
      { id: 'C', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'cheer for 人 で「人を応援する」。' },
      { id: 'D', choices: ['because', 'if', 'so', 'than'], answer: 1, why: '「来られたら」なので if you can。' },
    ],
    seq: { events: ['Shota ran in the 100-meter race.', 'Shota\'s class did the tug of war.', 'Shota ran as the last runner in the relay.', 'Shota wrote an email to his grandfather.'], answer: [0, 1, 2, 3], why: '午前の100メートル走 → 午後のつな引き → リレー → 次の日にメールを書いた。' },
    tf: [
      { statement: 'Shota finished first in the 100-meter race.', answer: false, why: '3位だった。' },
      { statement: "Shota's class won the tug of war.", answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Shota passed two runners in the relay.', answer: true, why: '第4段落の内容と合う。' },
      { statement: "Shota's class finished first in the relay.", answer: false, why: '2位だった。' },
      { statement: "Shota's mother took a lot of pictures.", answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'octopus-smart',
    title: 'Eight Arms, Many Talents',
    level: '中3（説明文）',
    paragraphs: [
      'Octopuses are sea animals with eight arms. They may look strange, but scientists say they are among the most intelligent animals ( A ) the sea.',
      'Octopuses can solve problems. In some experiments, they learned how to open a jar to get the food inside. Some octopuses even remembered the way ( B ) a long time.',
      'They are also masters of hiding. An octopus can change the color of its skin in less than a second. It can look like a rock or sand, so its enemies cannot find it easily.',
      'Another surprising fact is that an octopus has three hearts and blue blood. Also, if it loses an arm, a new one can grow back.',
      'Octopuses usually live alone, and most of them live only one or two years. Even so, they are full ( C ) amazing abilities. The more we learn about them, the more we want ( D ) know.',
    ],
    ja: [
      'タコは8本のうでをもつ海の生き物です。ふしぎな姿に見えるかもしれませんが、科学者によると、海でもっとも頭のよい動物の一つです。',
      'タコは問題を解くことができます。いくつかの実験では、中のえさを取るためにびんのふたを開ける方法を覚えました。長い間その方法を覚えていたタコさえいました。',
      'タコはかくれる名人でもあります。1秒もかからずに皮ふの色を変えることができます。岩や砂のように見えるので、敵はかんたんには見つけられません。',
      'もう一つのおどろくべき事実は、タコには心臓が3つあり、血が青いことです。また、うでを1本失っても、新しいうでが生えてきます。',
      'タコはふつう1ぴきでくらし、ほとんどは1、2年しか生きません。それでも、すばらしい能力にあふれています。タコについて知れば知るほど、もっと知りたくなります。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'of', 'on'], answer: 1, why: '最上級の範囲を表す in（in the sea）。' },
      { id: 'B', choices: ['during', 'for', 'in', 'since'], answer: 1, why: 'for a long time で「長い間」。' },
      { id: 'C', choices: ['at', 'by', 'of', 'with'], answer: 2, why: 'be full of 〜 で「〜でいっぱいだ」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'want to 〜 で「〜したい」（want to know）。' },
    ],
    vocab: [{ word: 'intelligent', choices: ['頭のよい', '大きな', 'こわい', 'おそい'], answer: 0, why: 'すぐあとで「問題を解ける」と説明しているので「頭のよい」。' }],
    pick2: {
      statements: ['Octopuses have ten arms.', 'Some octopuses learned how to open a jar.', 'Octopuses cannot change the color of their skin.', 'An octopus has three hearts.', 'Most octopuses live for twenty years.', 'Octopuses always live in large groups.'],
      answers: [1, 3],
      why: '第2段落「びんの開け方を覚えた」、第4段落「心臓が3つ」。',
    },
    refer: { phrase: 'cannot find it easily', word: 'it', choices: ['the octopus', 'its enemy', 'a rock', 'the sand'], answer: 0, why: '敵が見つけられないのは、岩や砂のように見えるタコ。' },
    tf: [
      { statement: 'Octopuses have eight arms.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Octopuses can change color in less than a second.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Octopuses have red blood.', answer: false, why: '血は青い。' },
      { statement: 'A lost arm can grow back.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Octopuses usually live with their families.', answer: false, why: 'ふつう1ぴきでくらす。' },
    ],
  },
  {
    id: 'paper-plane',
    title: 'The Paper Plane Contest',
    level: '中2〜中3（物語）',
    paragraphs: [
      'There was a paper plane contest at Kaito\'s school. The plane that flew the farthest would win. Kaito really wanted to win, so he made his plane ( A ) the thickest paper he could find.',
      'On the day of the contest, his plane went straight down. Everyone laughed, and Kaito felt embarrassed. His friend Mia\'s plane, made of thin paper, flew ( B ) the other side of the gym.',
      'After the contest, Kaito asked Mia how she made her plane. "Light paper flies better," she explained. "And the wings must be the same size on both sides." Kaito was surprised. He had thought heavier was stronger.',
      'Kaito and Mia started to practice together after school. They tried many shapes and wrote down how far each plane flew. Kaito learned that testing ideas is more useful ( C ) just guessing.',
      'The next year, Kaito\'s plane flew twenty meters and won second place. Mia won first again, but Kaito was happy. "We both won," he said, "because we learned ( D ) each other."',
    ],
    ja: [
      'カイトの学校で紙飛行機コンテストがありました。いちばん遠くまで飛んだ飛行機が優勝です。カイトはどうしても勝ちたかったので、見つけられるいちばん厚い紙で飛行機をつくりました。',
      'コンテストの日、カイトの飛行機はまっすぐ下に落ちてしまいました。みんなが笑い、カイトははずかしくなりました。友だちのミアのうすい紙の飛行機は、体育館の反対側まで飛んでいきました。',
      'コンテストのあと、カイトはミアにどうやって飛行機をつくったのか聞きました。「軽い紙のほうがよく飛ぶの」とミアは説明しました。「それに、つばさは両側で同じ大きさにしないといけないの」。カイトはおどろきました。重いほうが強いと思っていたのです。',
      'カイトとミアは放課後いっしょに練習するようになりました。いろいろな形を試して、それぞれの飛行機がどこまで飛んだかを書き留めました。カイトは、ただ予想するよりも、アイデアを試すことのほうが役に立つと学びました。',
      '次の年、カイトの飛行機は20メートル飛んで2位になりました。ミアはまた優勝しましたが、カイトはうれしく思いました。「ぼくたち2人とも勝ったんだ。おたがいから学んだからね」と彼は言いました。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'for', 'of', 'to'], answer: 2, why: 'make A of 材料 で「材料でAをつくる」（紙の形が残る）。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 3, why: 'fly to 〜 で「〜まで飛ぶ」。' },
      { id: 'C', choices: ['as', 'for', 'than', 'that'], answer: 2, why: 'more useful than 〜 で「〜より役に立つ」。' },
      { id: 'D', choices: ['by', 'from', 'of', 'to'], answer: 1, why: 'learn from 〜 で「〜から学ぶ」。' },
    ],
    seq: { events: ['Kaito\'s plane flew twenty meters.', 'Kaito made a plane with thick paper.', 'Kaito and Mia practiced after school.', 'Kaito asked Mia how she made her plane.'], answer: [1, 3, 2, 0], why: '厚い紙でつくる → ミアに聞く → いっしょに練習 → 次の年に20メートル飛ぶ。' },
    refer: { phrase: 'his plane went straight down', word: 'his', choices: ['Kaito', 'Mia', 'the teacher', 'everyone'], answer: 0, why: 'まっすぐ落ちたのはカイトの飛行機。' },
    tf: [
      { statement: 'Kaito made his plane with thick paper.', answer: true, why: '第1段落の内容と合う。' },
      { statement: "Kaito's plane flew to the other side of the gym.", answer: false, why: 'まっすぐ下に落ちた。反対側まで飛んだのはミアの飛行機。' },
      { statement: 'Mia said light paper flies better.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Kaito won first place the next year.', answer: false, why: '2位だった。' },
      { statement: 'Kaito thought they both won.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'speech-dream-chef',
    title: 'My Dream to Be a Chef (Speech)',
    level: '中3（スピーチ）',
    paragraphs: [
      'Hello, everyone. My dream is to become a chef and open my own restaurant someday.',
      'I became interested ( A ) cooking when I was eight. My father was sick, and my mother had to work late. So I started to make simple dishes like rice balls and miso soup for my family.',
      'At first, my food did not taste good. But my father always ate everything and said, "Thank you. This is delicious." His words made me want to cook ( B ) and better.',
      'Now I cook dinner for my family twice a week. I also watch cooking videos and try recipes from other countries. Last month, I made a Thai curry, and my sister asked ( C ) a second plate!',
      'A chef does not only make food. A chef makes people happy. I want to make a restaurant where people can smile ( D ) eating my food. Thank you for listening.',
    ],
    ja: [
      'みなさん、こんにちは。私の夢は、料理人になって、いつか自分のレストランを開くことです。',
      '私が料理に興味をもったのは8歳のときでした。父が病気で、母は夜おそくまで働かなければなりませんでした。そこで、家族のためにおにぎりやみそしるのようなかんたんな料理をつくりはじめました。',
      '最初、私の料理はおいしくありませんでした。でも、父はいつも全部食べて「ありがとう。おいしいよ」と言ってくれました。その言葉で、私はもっと料理がうまくなりたいと思いました。',
      '今では週に2回、家族の夕食をつくっています。料理の動画を見たり、ほかの国のレシピに挑戦したりもしています。先月はタイカレーをつくって、妹がおかわりをたのんでくれました！',
      '料理人は料理をつくるだけではありません。人を幸せにします。私は、私の料理を食べながら人が笑顔になれるレストランをつくりたいです。ご清聴ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', 'on'], answer: 2, why: 'become interested in 〜 で「〜に興味をもつ」。' },
      { id: 'B', choices: ['better', 'good', 'more', 'well'], answer: 0, why: 'better and better で「ますますうまく」。' },
      { id: 'C', choices: ['at', 'for', 'of', 'to'], answer: 1, why: 'ask for 〜 で「〜をたのむ・求める」。' },
      { id: 'D', choices: ['during', 'since', 'until', 'while'], answer: 3, why: 'while eating で「食べながら」（while ＋ -ing）。' },
    ],
    gist: [{ para: 2, choices: ['父の言葉でもっとうまくなりたいと思ったこと', 'レストランの名前', '母の仕事', 'タイカレーのつくり方'], answer: 0, why: '第3段落は、父の「おいしいよ」という言葉が料理をがんばるきっかけになった話。' }],
    tf: [
      { statement: 'The speaker wants to become a chef.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'The speaker started cooking at the age of twelve.', answer: false, why: '8歳のとき。' },
      { statement: "The speaker's first dishes tasted very good.", answer: false, why: '最初はおいしくなかった。' },
      { statement: 'The speaker cooks dinner twice a week now.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'The speaker made a Thai curry last month.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'penguins-warm',
    title: 'How Penguins Stay Warm',
    level: '中2',
    paragraphs: [
      'Emperor penguins live in Antarctica, one of the coldest places ( A ) the earth. In winter, the temperature there can fall below minus forty degrees, and strong winds blow almost every day. How can these birds stay alive in such a place?',
      'First, penguins have a thick layer of fat under their skin. This fat keeps the heat inside their bodies. They also have many short feathers that are packed closely together. The feathers stop cold water and wind ( B ) reaching their skin.',
      'Second, penguins help each other. On very cold days, hundreds of them stand close together in a large group called a huddle. The birds inside the huddle stay warm, and the birds on the outside slowly move ( C ) the center. In this way, every penguin gets a turn to be warm.',
      'Scientists say that the temperature in the middle of a huddle can rise to more than twenty degrees. Penguins show us that working together is one of the best ways to survive ( D ) a hard environment.',
    ],
    ja: [
      'コウテイペンギンは、地球上でもっとも寒い場所のひとつである南極に住んでいます。冬には気温がマイナス40度より下がることもあり、ほとんど毎日強い風がふきます。この鳥たちは、そんな場所でどうやって生きていけるのでしょうか。',
      'まず、ペンギンは皮ふの下に厚い脂肪の層をもっています。この脂肪が体の中の熱をにがしません。また、すきまなくびっしり生えた短い羽がたくさんあります。この羽が、冷たい水や風が皮ふにとどくのをふせぎます。',
      '次に、ペンギンはおたがいに助け合います。とても寒い日には、何百羽もが「ハドル」とよばれる大きな集団になって、身を寄せ合って立ちます。ハドルの内側の鳥は暖かくすごし、外側の鳥は少しずつ中心に向かって移動します。こうして、どのペンギンにも暖かくなる順番が回ってくるのです。',
      '科学者によると、ハドルの真ん中の温度は20度以上にまで上がることがあります。ペンギンは、力を合わせることが、きびしい環境で生きのびるための最もよい方法のひとつだと教えてくれます。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'to'], answer: 2, why: 'on the earth で「地球上で」。' },
      { id: 'B', choices: ['by', 'for', 'from', 'with'], answer: 2, why: 'stop A from -ing で「Aが〜するのをふせぐ」。' },
      { id: 'C', choices: ['across', 'toward', 'under', 'without'], answer: 1, why: 'move toward 〜 で「〜のほうへ移動する」。' },
      { id: 'D', choices: ['at', 'by', 'in', 'of'], answer: 2, why: 'survive in 〜 で「（環境）の中で生きのびる」。' },
    ],
    tf: [
      { statement: 'Emperor penguins live in a very cold place.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Penguins have long feathers that are far apart.', answer: false, why: '短い羽がびっしり生えている。' },
      { statement: 'In a huddle, the penguins on the outside move toward the center little by little.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Only the strongest penguins can stand in the middle of a huddle.', answer: false, why: 'どのペンギンにも暖かくなる順番が回ってくる。' },
      { statement: 'The middle of a huddle can be warmer than twenty degrees.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'talk-gift',
    title: 'Choosing a Gift (会話文)',
    level: '中2（会話文）',
    paragraphs: [
      "Aya: Hi, Tom. Next Sunday is my mother's birthday, but I don't know what to give her. Can you help me?",
      'Tom: Sure. What does she like to do ( A ) her free time?',
      'Aya: She likes gardening. She spends hours in our garden every weekend.',
      'Tom: Then how about a new pair of gloves for gardening? Or some flower seeds?',
      "Aya: That's a good idea, but she already has many gloves. I think seeds would be better. She is always looking ( B ) new kinds of flowers.",
      'Tom: There is a flower shop near the station. It sells seeds from many countries. I went there with my sister last month.',
      'Aya: Really? Is it open on Saturdays?',
      'Tom: Yes. It opens ( C ) ten in the morning. I can go with you if you want.',
      'Aya: Thank you! I also want to write a card. Can you help me write it in English? My mother is studying English these days.',
      'Tom: Of course. She will be happy ( D ) get a card in English.',
    ],
    ja: [
      'アヤ：こんにちは、トム。今度の日曜日はお母さんの誕生日なんだけど、何をあげたらいいかわからないの。手伝ってくれる？',
      'トム：いいよ。お母さんはひまなときに何をするのが好きなの？',
      'アヤ：ガーデニングが好きなの。毎週末、何時間も庭ですごしているわ。',
      'トム：それなら、ガーデニング用の新しい手ぶくろはどう？それとも花の種とか？',
      'アヤ：いい考えね。でも手ぶくろはもうたくさん持っているの。種のほうがいいと思う。お母さんはいつも新しい種類の花をさがしているから。',
      'トム：駅の近くに花屋さんがあるよ。いろいろな国の種を売っているんだ。先月、姉といっしょに行ったよ。',
      'アヤ：本当？土曜日は開いている？',
      'トム：うん。朝10時に開くよ。よかったらいっしょに行くよ。',
      'アヤ：ありがとう！カードも書きたいの。英語で書くのを手伝ってくれる？お母さんは最近英語を勉強しているの。',
      'トム：もちろん。英語のカードをもらったらお母さんはよろこぶよ。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'with'], answer: 1, why: 'in one\'s free time で「ひまなときに」。' },
      { id: 'B', choices: ['for', 'of', 'on', 'to'], answer: 0, why: 'look for 〜 で「〜をさがす」。' },
      { id: 'C', choices: ['at', 'in', 'on', 'to'], answer: 0, why: '時刻の前は at（at ten）。' },
      { id: 'D', choices: ['for', 'of', 'to', 'with'], answer: 2, why: 'be happy to 〜 で「〜してうれしい」。' },
    ],
    tf: [
      { statement: "Aya's mother's birthday is next Sunday.", answer: true, why: 'アヤの最初の発言と合う。' },
      { statement: "Aya's mother doesn't have any gloves for gardening.", answer: false, why: '手ぶくろはもうたくさん持っている。' },
      { statement: 'Tom went to the flower shop with his sister.', answer: true, why: 'トムの発言と合う。' },
      { statement: 'The flower shop is closed on Saturdays.', answer: false, why: '土曜日も開いていて、朝10時に開く。' },
      { statement: "Aya's mother is studying English these days.", answer: true, why: 'アヤの最後の発言と合う。' },
    ],
  },
  {
    id: 'lost-notebook',
    title: 'The Lost Notebook',
    level: '中2（物語）',
    paragraphs: [
      'One afternoon, Haruto found a small blue notebook ( A ) a bench in the park. There was no name on the cover. He opened it and saw many beautiful drawings of birds. Under each picture, someone had written the date and the place.',
      'Haruto wanted to return the notebook to its owner, but he did not know ( B ) to find the person. Then he noticed that many drawings were made in this park, early in the morning. He decided to come back the next day.',
      'At six the next morning, Haruto came to the park. An old woman was sitting on the same bench with a pair of binoculars. She looked worried and was searching ( C ) her bag. "Excuse me," Haruto said. "Is this yours?" The woman smiled with joy.',
      'Her name was Mrs. Kimura. She had drawn birds in the park for ten years. "This notebook is very important to me," she said. "Thank you so much." Since that day, Haruto has watched birds with Mrs. Kimura every Sunday, and now he is drawing birds in ( D ) own notebook.',
    ],
    ja: [
      'ある日の午後、ハルトは公園のベンチの上で小さな青いノートを見つけました。表紙には名前がありませんでした。開いてみると、鳥の美しい絵がたくさんかいてありました。それぞれの絵の下には、だれかが日付と場所を書いていました。',
      'ハルトはノートを持ち主に返したいと思いましたが、どうやってその人をさがせばいいのかわかりませんでした。そのとき、多くの絵がこの公園で、朝早くにかかれていることに気づきました。彼は次の日にまた来ることにしました。',
      '次の朝6時、ハルトは公園に来ました。年配の女性が双眼鏡を持って同じベンチにすわっていました。彼女は心配そうな様子で、かばんの中をさがしていました。「すみません。これはあなたのものですか」とハルトは言いました。女性はうれしそうにほほえみました。',
      '彼女の名前は木村さんでした。木村さんは10年間、この公園で鳥の絵をかいてきたのです。「このノートは私にとってとても大切なの。本当にありがとう」と彼女は言いました。その日から、ハルトは毎週日曜日に木村さんといっしょに鳥を観察していて、今では自分のノートに鳥の絵をかいています。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'of', 'on', 'to'], answer: 2, why: 'on a bench で「ベンチの上で」。' },
      { id: 'B', choices: ['how', 'what', 'which', 'who'], answer: 0, why: 'how to 〜 で「どうやって〜すればよいか」。' },
      { id: 'C', choices: ['at', 'in', 'of', 'to'], answer: 1, why: 'search in 〜 で「〜の中をさがす」。' },
      { id: 'D', choices: ['her', 'his', 'its', 'their'], answer: 1, why: 'ハルト（男の子）自身のノートなので his own。' },
    ],
    tf: [
      { statement: 'Haruto found the notebook in the park.', answer: true, why: '第1段落の内容と合う。' },
      { statement: "The owner's name was written on the cover.", answer: false, why: '表紙に名前はなかった。' },
      { statement: 'Haruto went back to the park at six the next morning.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Mrs. Kimura had drawn birds in the park for twenty years.', answer: false, why: '10年間。' },
      { statement: 'Haruto watches birds with Mrs. Kimura on Sundays.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'leap-year',
    title: 'Why Do We Have Leap Years?',
    level: '中2',
    paragraphs: [
      'Most years have 365 days, but every four years we have a year with 366 days. This is called a leap year. In a leap year, February has twenty-nine days ( A ) of twenty-eight. Why do we need this extra day?',
      'It takes the earth about 365 days and six hours to go around the sun. Those six extra hours do not seem very important. However, after four years, they add up ( B ) about twenty-four hours, or one full day.',
      'If we did not add this day, our calendar would slowly move away from the seasons. After several hundred years, July in Japan could even ( C ) a winter month. A leap year keeps the calendar and the seasons together.',
      'People who were born on February 29 have a special problem. Their real birthday comes only once every four years. Many of them celebrate on February 28 or March 1 in other years, so they do not have to wait so long ( D ) a party.',
    ],
    ja: [
      'たいていの年は365日ですが、4年ごとに366日の年があります。これをうるう年といいます。うるう年には、2月が28日ではなく29日になります。なぜこの1日が必要なのでしょうか。',
      '地球が太陽のまわりを1周するには、およそ365日と6時間かかります。その6時間はそれほど大事には思えません。しかし4年たつと、合わせておよそ24時間、つまりまる1日分になるのです。',
      'もしこの1日を足さなければ、こよみは少しずつ季節からずれていってしまいます。数百年たつと、日本の7月が冬の月になってしまうことさえありえます。うるう年は、こよみと季節がずれないようにしているのです。',
      '2月29日に生まれた人には、ちょっとした悩みがあります。本当の誕生日が4年に1度しか来ないのです。その人たちの多くは、ほかの年には2月28日か3月1日にお祝いをするので、パーティーをそんなに長く待たなくてもすみます。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'in spite', 'instead', 'out'], answer: 2, why: 'instead of 〜 で「〜のかわりに」。' },
      { id: 'B', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'add up to 〜 で「合計で〜になる」。' },
      { id: 'C', choices: ['became', 'become', 'becoming', 'to become'], answer: 1, why: '助動詞 could のあとは動詞の原形 become。' },
      { id: 'D', choices: ['at', 'for', 'on', 'to'], answer: 1, why: 'wait for 〜 で「〜を待つ」。' },
    ],
    tf: [
      { statement: 'In a leap year, February has twenty-nine days.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'It takes the earth exactly 365 days to go around the sun.', answer: false, why: 'およそ365日と6時間かかる。' },
      { statement: 'The extra hours add up to about one day after four years.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Without leap years, the calendar would always match the seasons.', answer: false, why: 'こよみが季節からずれていく。' },
      { statement: 'People born on February 29 have their real birthday only once every four years.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'email-borrowed-book',
    title: 'An Email about a Borrowed Book',
    level: '中2（メール）',
    paragraphs: [
      'Dear Ms. Green, Thank you for lending me your book about Japanese castles last month. I finished reading it last week, and I enjoyed it very much.',
      'I was especially interested ( A ) the chapter about Himeji Castle. I did not know that it has stood for more than four hundred years. After reading the book, I really wanted to see the castle with my own eyes.',
      'So last Sunday, I went there with my family. It took about two hours ( B ) train. The white walls were even more beautiful than the pictures in your book. I took a lot of photos, and I will show them to you next time.',
      'I am sorry, but I have one problem. My little brother spilled some juice on the cover of your book. I tried to clean it, but a small stain is still there. I would like to buy a new copy ( C ) you. Please tell me what you think.',
      'I am looking forward ( D ) hearing from you. Best wishes, Kenta',
    ],
    ja: [
      'グリーン先生へ。先月は日本の城についての本を貸してくださってありがとうございました。先週読み終わり、とても楽しく読みました。',
      'とくに姫路城についての章に興味をもちました。400年以上も建ち続けているとは知りませんでした。本を読んでから、自分の目でその城を見たくてたまらなくなりました。',
      'そこで先週の日曜日、家族といっしょに行ってきました。電車で2時間ほどかかりました。白いかべは、先生の本の写真よりもさらに美しかったです。写真をたくさんとったので、今度お見せします。',
      '申しわけないのですが、ひとつ困ったことがあります。弟が先生の本の表紙にジュースをこぼしてしまいました。きれいにしようとしたのですが、小さなしみが残っています。先生のために新しい本を買いたいと思っています。どうお考えか教えてください。',
      'お返事を楽しみにしています。ケンタより',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', 'on'], answer: 2, why: 'be interested in 〜 で「〜に興味がある」。' },
      { id: 'B', choices: ['by', 'in', 'on', 'with'], answer: 0, why: '交通手段は by（by train で「電車で」）。' },
      { id: 'C', choices: ['at', 'for', 'of', 'to'], answer: 1, why: 'buy A for 人 で「人のためにAを買う」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'look forward to -ing で「〜するのを楽しみにする」。' },
    ],
    tf: [
      { statement: 'Kenta borrowed a book about Japanese castles from Ms. Green.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Kenta went to Himeji Castle alone.', answer: false, why: '家族といっしょに行った。' },
      { statement: 'It took about two hours to get to the castle by train.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Kenta spilled juice on the book.', answer: false, why: 'ジュースをこぼしたのは弟。' },
      { statement: 'Kenta wants to buy a new copy of the book for Ms. Green.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'speech-thank-you',
    title: 'Two Small Words (Speech)',
    level: '中3（スピーチ）',
    paragraphs: [
      'Good morning, everyone. Today I want to talk about two small words that can change a day: "thank you."',
      'Last year, I joined the school cleaning volunteers. Every morning, we picked up trash ( A ) the school gate. At first, nobody said anything to us, and I often felt that our work was not important.',
      'One cold morning, a first-year student stopped and said, "Thank you for keeping our school clean." It was a very short message, but it made me feel warm ( B ) day.',
      'After that, I decided to say "thank you" more often: to the cafeteria staff, to the bus driver, and to my family. I noticed something interesting. When I thanked people, they smiled, and I felt happier ( C ).',
      'Saying "thank you" does not cost anything, and it takes only a second. However, it can make both the speaker and the listener happy. Why don\'t you start ( D ) today? Thank you for listening.',
    ],
    ja: [
      'みなさん、おはようございます。今日は、1日を変えることができる2つの小さな言葉、「ありがとう」についてお話しします。',
      '去年、私は学校の清掃ボランティアに入りました。毎朝、校門のまわりのごみを拾いました。最初はだれも何も言ってくれず、自分たちの仕事は大切ではないのだと感じることがよくありました。',
      'ある寒い朝、1年生が立ち止まって「学校をきれいにしてくれてありがとうございます」と言ってくれました。とても短い言葉でしたが、私はその日1日中、心が温かくなりました。',
      'それから私は、もっと「ありがとう」を言うことにしました。食堂の人に、バスの運転手さんに、そして家族に。すると、おもしろいことに気づきました。人にお礼を言うと、相手が笑顔になり、私もうれしい気持ちになったのです。',
      '「ありがとう」を言うのにお金はかからず、ほんの1秒しかかかりません。けれども、言う人と聞く人の両方を幸せにすることができます。今日から始めてみませんか。ご清聴ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['around', 'between', 'during', 'since'], answer: 0, why: 'around 〜 で「〜のまわりで」。' },
      { id: 'B', choices: ['all', 'any', 'both', 'much'], answer: 0, why: 'all day で「1日中」。' },
      { id: 'C', choices: ['either', 'neither', 'so', 'too'], answer: 3, why: '肯定文の「〜も」は文の終わりに too。' },
      { id: 'D', choices: ['at', 'for', 'from', 'in'], answer: 2, why: 'start from today で「今日から始める」。' },
    ],
    tf: [
      { statement: 'The speaker joined the cleaning volunteers last year.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Many students thanked the volunteers from the first day.', answer: false, why: '最初はだれも何も言わなかった。' },
      { statement: 'A first-year student thanked the speaker on a cold morning.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'The speaker stopped saying "thank you" to the bus driver.', answer: false, why: 'バスの運転手さんにもお礼を言うようにした。' },
      { statement: 'The speaker says that saying "thank you" costs nothing.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'fireflies',
    title: 'How Do Fireflies Glow?',
    level: '中2',
    paragraphs: [
      'On early summer nights in Japan, you can sometimes see small lights flying ( A ) rivers. These lights come from fireflies. Many people go out to watch them every June.',
      'How do fireflies make light? Inside their bodies, special chemicals mix with oxygen. This makes light, but it makes very ( B ) heat. Because of this, the light is sometimes called "cold light."',
      'Fireflies use their lights to talk to each other. A male flies around and flashes his light. When a female sees it, she answers ( C ) her own light. In this way, they can find each other in the dark.',
      'Fireflies need clean water. Their young live in rivers and eat small snails. Today, the number of fireflies is going down in many places because rivers are getting dirty. Some towns are working hard to clean their rivers so that fireflies can come ( D ).',
    ],
    ja: [
      '日本では、初夏の夜に川の上を小さな光が飛んでいるのが見えることがあります。この光はホタルが出しているものです。毎年6月には、たくさんの人がホタルを見に出かけます。',
      'ホタルはどうやって光をつくるのでしょうか。体の中で、特別な物質が酸素とまざります。これによって光が生まれますが、熱はほとんど出ません。そのため、この光は「冷たい光」とよばれることもあります。',
      'ホタルは光を使っておたがいに話をします。オスは飛びまわりながら光を点滅させます。メスはそれを見ると、自分の光で答えます。こうして、暗やみの中でもおたがいを見つけることができるのです。',
      'ホタルにはきれいな水が必要です。ホタルの幼虫は川に住み、小さな巻き貝を食べます。今、川がよごれてきているために、多くの場所でホタルの数がへっています。ホタルがもどってこられるように、川をきれいにしようとがんばっている町もあります。',
    ],
    blanks: [
      { id: 'A', choices: ['during', 'over', 'since', 'until'], answer: 1, why: 'over 〜 で「〜の上を」。' },
      { id: 'B', choices: ['few', 'little', 'many', 'more'], answer: 1, why: '数えられない名詞 heat には little（very little で「ほとんどない」）。' },
      { id: 'C', choices: ['at', 'for', 'of', 'with'], answer: 3, why: 'with 〜 で「〜を使って」。' },
      { id: 'D', choices: ['back', 'down', 'off', 'up'], answer: 0, why: 'come back で「もどってくる」。' },
    ],
    tf: [
      { statement: 'Many people watch fireflies in June in Japan.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'The light of fireflies is very hot.', answer: false, why: '熱はほとんど出ない「冷たい光」。' },
      { statement: 'Female fireflies answer males with their own light.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Young fireflies live in trees and eat leaves.', answer: false, why: '幼虫は川に住み、巻き貝を食べる。' },
      { statement: 'Some towns are cleaning their rivers for fireflies.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'talk-library-card',
    title: 'Making a Library Card (会話文)',
    level: '中2（会話文）',
    paragraphs: [
      'Librarian: Good afternoon. How can I help you?',
      "Mika: Hi. I want to borrow some books, but I don't have a library card yet.",
      'Librarian: No problem. Do you live ( A ) this city?',
      'Mika: Yes. I moved here last month.',
      'Librarian: Then please write your name, address, and phone number ( B ) this form.',
      'Mika: OK. Here you are.',
      'Librarian: Thank you. Here is your card. You can borrow up ( C ) ten books for two weeks.',
      'Mika: Ten books! That\'s great. Do you have any books about cooking?',
      'Librarian: Yes, they are on the second floor, next ( D ) the magazines.',
      'Mika: Thank you. Can I also use the computers here?',
      'Librarian: Yes. Students can use them for free for one hour a day. Also, if you return a book late, you cannot borrow new books for a week, so please be careful.',
      'Mika: I see. I will remember that.',
    ],
    ja: [
      '司書：こんにちは。どうなさいましたか。',
      'ミカ：こんにちは。本を何冊か借りたいのですが、まだ図書館カードを持っていないんです。',
      '司書：だいじょうぶですよ。この市に住んでいますか。',
      'ミカ：はい。先月引っこしてきました。',
      '司書：では、この用紙に名前と住所と電話番号を書いてください。',
      'ミカ：わかりました。はい、どうぞ。',
      '司書：ありがとうございます。こちらがカードです。2週間、10冊まで借りられますよ。',
      'ミカ：10冊も！うれしいです。料理の本はありますか。',
      '司書：はい、2階の雑誌のとなりにありますよ。',
      'ミカ：ありがとうございます。ここのコンピューターも使えますか。',
      '司書：はい。学生は1日1時間、無料で使えます。それと、本を返すのがおくれると1週間新しい本を借りられなくなるので、気をつけてくださいね。',
      'ミカ：わかりました。おぼえておきます。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'to'], answer: 1, why: '市や町に「住む」は live in 〜。' },
      { id: 'B', choices: ['at', 'for', 'on', 'with'], answer: 2, why: '用紙「に」書くは on this form。' },
      { id: 'C', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'up to 〜 で「（最大）〜まで」。' },
      { id: 'D', choices: ['by', 'for', 'of', 'to'], answer: 3, why: 'next to 〜 で「〜のとなりに」。' },
    ],
    tf: [
      { statement: 'Mika already had a library card.', answer: false, why: 'まだ図書館カードを持っていなかった。' },
      { statement: 'Mika moved to the city last month.', answer: true, why: 'ミカの発言と合う。' },
      { statement: 'Mika can borrow ten books for two weeks.', answer: true, why: '司書の発言と合う。' },
      { statement: 'The cooking books are on the first floor.', answer: false, why: '2階にある。' },
      { statement: 'Students can use the computers for one hour a day for free.', answer: true, why: '司書の発言と合う。' },
    ],
  },
  {
    id: 'broken-vase',
    title: 'The Broken Vase',
    level: '中2（物語）',
    paragraphs: [
      'When Sota was ten, he was playing ( A ) a ball in the living room. His mother had told him many times not to play there. Suddenly, the ball hit a blue vase, and it fell to the floor and broke.',
      'Sota was scared. The vase was a present from his grandmother. He quickly picked up the pieces and hid them in a box under his bed. When his mother came home, he said nothing.',
      'That night, Sota could not sleep. He kept thinking ( B ) the vase. The next morning, he took the box to his mother and said, "I\'m sorry. I broke it. I was playing with a ball."',
      'His mother was quiet for a moment. Then she smiled and said, "Thank you for telling me the truth. A vase can be fixed, but trust is hard to fix ( C ) it is broken." They glued the pieces together, and the vase is still on the shelf today, with thin lines on it.',
      'Every time Sota sees those lines, he remembers how important it is ( D ) be honest.',
    ],
    ja: [
      'ソウタが10歳のとき、彼は居間でボールで遊んでいました。お母さんからは、そこで遊ばないようにと何度も言われていました。とつぜん、ボールが青い花びんに当たり、花びんは床に落ちて割れてしまいました。',
      'ソウタはこわくなりました。その花びんはおばあちゃんからの贈り物だったのです。彼は急いでかけらを拾い、ベッドの下の箱にかくしました。お母さんが帰ってきても、何も言いませんでした。',
      'その夜、ソウタはねむれませんでした。花びんのことを考え続けていたのです。次の朝、彼は箱をお母さんのところへ持っていき、「ごめんなさい。ぼくが割ったんだ。ボールで遊んでいたんだ」と言いました。',
      'お母さんはしばらくだまっていました。それからほほえんで言いました。「本当のことを話してくれてありがとう。花びんは直せるけれど、信頼は一度こわれると直すのがむずかしいのよ」。2人はかけらを接着剤でくっつけ、その花びんは細い線が入ったまま、今も棚の上にあります。',
      'その線を見るたびに、ソウタは正直でいることがどれほど大切かを思い出すのです。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'for', 'with'], answer: 3, why: 'play with 〜 で「〜で遊ぶ」。' },
      { id: 'B', choices: ['about', 'at', 'for', 'on'], answer: 0, why: 'think about 〜 で「〜について考える」。keep -ing で「〜し続ける」。' },
      { id: 'C', choices: ['once', 'since', 'until', 'while'], answer: 0, why: 'once ＋文 で「いったん〜すると」。' },
      { id: 'D', choices: ['for', 'of', 'that', 'to'], answer: 3, why: 'it is 〜 to ＋動詞 で「…することは〜だ」。' },
    ],
    tf: [
      { statement: 'Sota broke the vase while he was playing with a ball.', answer: true, why: '第1段落の内容と合う。' },
      { statement: "The vase was a present from Sota's grandfather.", answer: false, why: 'おばあちゃんからの贈り物。' },
      { statement: 'Sota told his mother the truth that night.', answer: false, why: '話したのは次の朝。' },
      { statement: 'Sota and his mother glued the pieces together.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'The vase is not in the house anymore.', answer: false, why: '今も棚の上にある。' },
    ],
  },
  {
    id: 'camels',
    title: 'How Do Camels Live in the Desert?',
    level: '中2',
    paragraphs: [
      'Camels live in deserts, where it is very hot during the day and there is little water. They are sometimes called "ships of the desert" because people have used them ( A ) carry things for a long time.',
      'Many people think that camels keep water in their humps, but that is not true. A hump is full ( B ) fat. When a camel cannot find food, it uses this fat for energy.',
      'Camels can go without water for many days. When they find water, however, they can drink more than 100 liters in a short time. Their bodies are also good ( C ) keeping water, so they do not lose much of it.',
      'Camels have other ways to live in the desert, too. Their long eyelashes protect their eyes from sand, and they can close their noses ( D ) strong winds blow.',
    ],
    ja: [
      'ラクダは砂漠に住んでいます。砂漠は昼間とても暑く、水がほとんどありません。人々が長いあいだラクダを使って荷物を運んできたので、ラクダは「砂漠の船」とよばれることもあります。',
      'ラクダはこぶに水をためていると思っている人が多いですが、それは本当ではありません。こぶの中は脂肪でいっぱいです。食べ物が見つからないとき、ラクダはこの脂肪をエネルギーにします。',
      'ラクダは何日も水を飲まずにすごすことができます。けれども水を見つけると、短い時間で100リットル以上も飲むことができます。また、体が水をたくわえるのが得意なので、あまり水分を失いません。',
      'ラクダには、砂漠で生きるためのほかの工夫もあります。長いまつげが砂から目を守り、強い風がふくときには鼻をとじることができるのです。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'in', 'on', 'to'], answer: 3, why: 'use A to 〜 で「Aを使って〜する」（to ＋動詞の原形）。' },
      { id: 'B', choices: ['by', 'for', 'of', 'with'], answer: 2, why: 'be full of 〜 で「〜でいっぱいだ」。' },
      { id: 'C', choices: ['at', 'in', 'on', 'to'], answer: 0, why: 'be good at 〜 で「〜が得意だ」。' },
      { id: 'D', choices: ['how', 'what', 'when', 'which'], answer: 2, why: 'when ＋文 で「〜するときに」。' },
    ],
    qa: [
      { q: 'What is inside a camel\'s hump?', choices: ['Water.', 'Fat.', 'Sand.', 'Milk.'], answer: 1, why: 'A hump is full of fat. とある。' },
      { q: 'Why can camels close their noses?', choices: ['To keep sand out when strong winds blow.', 'To stop drinking water.', 'To sleep well at night.', 'To smell food better.'], answer: 0, why: '強い風がふくときに鼻をとじられる、とある（砂から身を守るため）。' },
    ],
    tf: [
      { statement: 'Camels keep water in their humps.', answer: false, why: 'こぶの中は脂肪でいっぱい。' },
      { statement: 'A camel uses the fat in its hump when it cannot find food.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Camels can drink more than 100 liters of water in a short time.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Camels have short eyelashes.', answer: false, why: '長いまつげがある。' },
      { statement: 'Camels can close their noses.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'email-cooking-class',
    title: 'An Email about a Cooking Class',
    level: '中2（メール）',
    paragraphs: [
      'Hi Lucas, How are you? I have some exciting news. Next Saturday, there will be a cooking class ( A ) the community center near my house.',
      'A cook from Italy will teach us how to make pizza from the beginning. We will make the dough, put on the sauce and cheese, and bake it in a big oven. The class starts at ten and lasts ( B ) two hours.',
      'It costs 500 yen for students. You need to bring an apron and a towel. If you want to come, please tell me ( C ) Wednesday, because I have to tell the teacher how many people will join.',
      'I know you like Italian food, so I thought ( D ) you first. I hope we can cook together! Your friend, Aoi',
    ],
    ja: [
      'こんにちは、ルーカス。元気？うれしいお知らせがあるの。今度の土曜日、家の近くの公民館で料理教室があるんだ。',
      'イタリア出身の料理人が、ピザを一から作る方法を教えてくれるの。生地を作って、ソースとチーズをのせて、大きなオーブンで焼くんだよ。教室は10時に始まって2時間あるよ。',
      '学生は500円。エプロンとタオルを持ってくる必要があるよ。来たかったら、水曜日までに教えてね。何人参加するか先生に伝えないといけないから。',
      'ルーカスはイタリア料理が好きだから、まっ先にあなたのことを思いうかべたの。いっしょに料理できたらいいな！あなたの友だち、アオイより',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'for', 'to'], answer: 0, why: '場所「〜で」は at（at the community center）。' },
      { id: 'B', choices: ['at', 'for', 'in', 'since'], answer: 1, why: 'last for 〜 で「〜のあいだ続く」。' },
      { id: 'C', choices: ['by', 'for', 'from', 'until'], answer: 0, why: '期限「〜までに」は by。until は「〜までずっと」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'with'], answer: 2, why: 'think of 〜 で「〜のことを思いうかべる」。' },
    ],
    tf: [
      { statement: 'The cooking class will be held next Saturday.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'A cook from France will teach the class.', answer: false, why: 'イタリア出身の料理人。' },
      { statement: 'The class lasts for two hours.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Students do not have to pay for the class.', answer: false, why: '学生は500円かかる。' },
      { statement: 'Aoi wants Lucas to answer by Wednesday.', answer: true, why: '第3段落の内容と合う。' },
    ],
  },
  {
    id: 'morning-greeting',
    title: 'Good Morning, Mr. Oda',
    level: '中2（物語）',
    paragraphs: [
      'Every morning on her way to school, Rina walked past a small bread shop. An old man named Mr. Oda worked there. He always looked serious, and he never smiled ( A ) anyone.',
      'One day, Rina decided to say "Good morning" to him. Mr. Oda looked surprised, but he said nothing. Rina felt a little sad, but she kept saying "Good morning" every day.',
      'A month later, Rina got sick and could not go to school ( B ) three days. When she walked past the shop again, Mr. Oda came out and said, "Good morning! I was worried about you." He was smiling.',
      'He told her that his wife had died the year before, and he had felt lonely ( C ) then. "Your greeting made my mornings brighter," he said. He gave her a warm melon bun.',
      'Now Rina and Mr. Oda talk every morning. Rina learned that a small word can be a big present ( D ) someone.',
    ],
    ja: [
      '毎朝、学校へ行くとちゅう、リナは小さなパン屋さんの前を通りました。そこでは小田さんというおじいさんが働いていました。彼はいつもむずかしい顔をしていて、だれにもほほえみかけることはありませんでした。',
      'ある日、リナは彼に「おはようございます」と言ってみることにしました。小田さんはおどろいた様子でしたが、何も言いませんでした。リナは少しさびしくなりましたが、毎日「おはようございます」と言い続けました。',
      '1か月後、リナは病気になって3日間学校を休みました。またお店の前を通ると、小田さんが出てきて「おはよう！心配していたんだよ」と言いました。彼はほほえんでいました。',
      '小田さんは、前の年に奥さんを亡くし、それからずっとさびしかったのだと話してくれました。「きみのあいさつで、朝が明るくなったんだ」と彼は言いました。そして、温かいメロンパンをくれました。',
      '今では、リナと小田さんは毎朝おしゃべりをします。リナは、小さなひとことがだれかにとって大きな贈り物になることを学んだのです。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'of', 'to'], answer: 0, why: 'smile at 〜 で「〜にほほえみかける」。' },
      { id: 'B', choices: ['during', 'for', 'in', 'since'], answer: 1, why: '期間の長さ「3日間」は for three days。' },
      { id: 'C', choices: ['ago', 'before', 'since', 'until'], answer: 2, why: '過去完了 had felt と since then で「それ以来ずっと」。' },
      { id: 'D', choices: ['at', 'for', 'in', 'with'], answer: 1, why: 'a present for 〜 で「〜への贈り物」。' },
    ],
    tf: [
      { statement: 'Mr. Oda worked at a bread shop.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Mr. Oda said "Good morning" back the first time Rina greeted him.', answer: false, why: '最初は何も言わなかった。' },
      { statement: 'Rina could not go to school for three days.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Mr. Oda gave Rina a cake.', answer: false, why: 'もらったのはメロンパン。' },
      { statement: 'Rina and Mr. Oda talk every morning now.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'talk-lost-wallet',
    title: 'At the Police Box (会話文)',
    level: '中2（会話文）',
    paragraphs: [
      'Officer: Hello. What happened?',
      'Ken: I think I lost my wallet. I had it ( A ) I got on the bus this morning.',
      'Officer: I see. What does it look like?',
      'Ken: It is small and brown. My name is written ( B ) the inside.',
      'Officer: How much money was in it?',
      'Ken: About 2,000 yen. My student ID card was also in it.',
      'Officer: Please wait a moment. Actually, someone brought a brown wallet here an hour ago. Is this yours?',
      "Ken: Yes! That's mine! Thank you so much.",
      'Officer: You should thank the person ( C ) found it. She was a high school student.',
      'Ken: I wish I could thank her. Did she leave her name?',
      'Officer: No, she didn\'t. She just said, "I hope the owner finds it soon."',
      'Ken: She is so kind. Someday, I will try to help someone ( D ) need, too.',
    ],
    ja: [
      '警察官：こんにちは。どうしましたか。',
      'ケン：さいふをなくしてしまったみたいなんです。けさバスに乗ったときには持っていました。',
      '警察官：なるほど。どんなさいふですか。',
      'ケン：小さくて茶色です。内側にぼくの名前が書いてあります。',
      '警察官：お金はいくら入っていましたか。',
      'ケン：2,000円くらいです。学生証も入っていました。',
      '警察官：少しお待ちください。じつは、1時間前にだれかが茶色のさいふをここに届けてくれたんです。これはあなたのものですか。',
      'ケン：はい！ぼくのです！本当にありがとうございます。',
      '警察官：見つけてくれた人にお礼を言うべきですね。高校生の女の子でしたよ。',
      'ケン：お礼が言えたらいいのに。名前は残していきましたか。',
      '警察官：いいえ。「持ち主が早く見つかるといいですね」とだけ言っていました。',
      'ケン：とても親切な人ですね。いつか、ぼくも困っている人を助けるようにします。',
    ],
    blanks: [
      { id: 'A', choices: ['what', 'when', 'where', 'which'], answer: 1, why: 'when ＋文 で「〜したときに」。' },
      { id: 'B', choices: ['at', 'for', 'on', 'to'], answer: 2, why: '「内側に」は on the inside。' },
      { id: 'C', choices: ['what', 'which', 'who', 'whose'], answer: 2, why: '人（the person）を説明する関係代名詞は who。' },
      { id: 'D', choices: ['at', 'for', 'in', 'on'], answer: 2, why: 'someone in need で「困っている人」。' },
    ],
    tf: [
      { statement: 'Ken lost his wallet.', answer: true, why: 'ケンの発言と合う。' },
      { statement: "Ken's wallet is big and black.", answer: false, why: '小さくて茶色。' },
      { statement: 'There was about 2,000 yen in the wallet.', answer: true, why: 'ケンの発言と合う。' },
      { statement: 'A police officer found the wallet on the bus.', answer: false, why: '高校生が見つけて届けてくれた。' },
      { statement: 'The high school student did not leave her name.', answer: true, why: '警察官の発言と合う。' },
    ],
  },
  {
    id: 'origami-science',
    title: 'Origami and Science',
    level: '中3',
    paragraphs: [
      'Origami is a traditional Japanese art of folding paper. Many children learn ( A ) to make cranes and frogs at school. But did you know that origami ideas are also used in science?',
      'A Japanese scientist named Koryo Miura created a special way of folding a large sheet. It is called "Miura-ori." A sheet folded this way can be opened and closed very ( B ) by pulling its two corners.',
      'This idea is useful in space. Rockets do not have much room, so large things such as solar panels must be folded small ( C ) they are sent into space. Miura-ori has been used to fold solar panels for a satellite.',
      'Today, scientists are also using origami ideas to make tiny tools for doctors and safer cars. A simple art for children may help us ( D ) a better future.',
    ],
    ja: [
      '折り紙は、紙を折る日本の伝統的な芸術です。多くの子どもが学校でツルやカエルの折り方を習います。でも、折り紙の考え方が科学でも使われていることを知っていましたか。',
      '日本の科学者、三浦公亮さんは、大きなシートを折る特別な方法を考え出しました。それは「ミウラ折り」とよばれています。この方法で折ったシートは、2つのかどを引っぱるだけで、とてもかんたんに開いたり閉じたりできます。',
      'この考え方は宇宙で役に立ちます。ロケットの中にはあまりスペースがないので、太陽電池パネルのような大きなものは、宇宙に送られる前に小さく折りたたまなければなりません。ミウラ折りは、人工衛星の太陽電池パネルを折りたたむのに使われてきました。',
      '今では科学者たちは、医者が使う小さな道具や、より安全な車を作るのにも折り紙の考え方を使っています。子どもの遊びのような芸術が、よりよい未来を作る手助けをしてくれるかもしれません。',
    ],
    blanks: [
      { id: 'A', choices: ['how', 'what', 'where', 'which'], answer: 0, why: 'how to 〜 で「〜のしかた」。' },
      { id: 'B', choices: ['ease', 'easier', 'easily', 'easy'], answer: 2, why: '動詞 opened and closed を説明するのは副詞 easily。' },
      { id: 'C', choices: ['after', 'before', 'since', 'until'], answer: 1, why: '宇宙に送られる「前に」小さく折る。' },
      { id: 'D', choices: ['build', 'built', 'building', 'to building'], answer: 0, why: 'help 人 ＋動詞の原形 で「人が〜するのを助ける」。' },
    ],
    tf: [
      { statement: 'Origami is an art of folding paper.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Koryo Miura was an American scientist.', answer: false, why: '日本の科学者。' },
      { statement: 'A sheet folded in Miura-ori is hard to open.', answer: false, why: 'とてもかんたんに開いたり閉じたりできる。' },
      { statement: 'Large solar panels must be folded small before they go into space.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Origami ideas are used only for toys.', answer: false, why: '医療の道具や車にも使われている。' },
    ],
  },
  {
    id: 'speech-farm',
    title: 'What I Learned on a Farm (Speech)',
    level: '中2（スピーチ）',
    paragraphs: [
      "Hello, everyone. Last summer, I stayed at my uncle's farm in Hokkaido ( A ) a week.",
      "Every day, I got up at five o'clock and helped him feed the cows. The work was much harder ( B ) I expected. By the end of the first day, my arms and legs hurt a lot.",
      'One evening, my uncle said, "The milk you drink every day comes from this hard work. Farmers never take a day off, ( C ) the cows need us every day."',
      'Since then, I have never left any milk in my glass. When I eat or drink something, I try to think about the people who made it. I am now interested ( D ) farming, and I want to visit the farm again next summer.',
      'Thank you for listening.',
    ],
    ja: [
      'みなさん、こんにちは。去年の夏、私は北海道のおじの牧場に1週間泊まりました。',
      '毎日5時に起きて、おじが牛にえさをやるのを手伝いました。仕事は思っていたよりずっと大変でした。1日目が終わるころには、うでも足もとても痛くなりました。',
      'ある晩、おじが言いました。「きみが毎日飲んでいる牛乳は、この大変な仕事から生まれるんだよ。牛は毎日ぼくたちを必要としているから、農家は1日も休まないんだ」。',
      'それ以来、私はコップの牛乳を一度も残していません。何かを食べたり飲んだりするときは、それを作った人のことを考えるようにしています。今は農業に興味があり、次の夏もまた牧場に行きたいと思っています。',
      'ご清聴ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['during', 'for', 'in', 'since'], answer: 1, why: '期間の長さ「1週間」は for a week。' },
      { id: 'B', choices: ['as', 'than', 'that', 'then'], answer: 1, why: '比較級 harder のあとは than。' },
      { id: 'C', choices: ['because', 'but', 'if', 'or'], answer: 0, why: '休まない「理由」をあとにつなぐので because。' },
      { id: 'D', choices: ['at', 'for', 'in', 'on'], answer: 2, why: 'be interested in 〜 で「〜に興味がある」。' },
    ],
    tf: [
      { statement: 'The speaker stayed at a farm for a week.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'The speaker got up at seven every day.', answer: false, why: '5時に起きた。' },
      { statement: 'The work on the farm was easier than the speaker expected.', answer: false, why: '思っていたよりずっと大変だった。' },
      { statement: "The speaker's uncle said that farmers never take a day off.", answer: true, why: '第3段落の内容と合う。' },
      { statement: 'The speaker wants to visit the farm again.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'snow-monkeys',
    title: 'Monkeys in Hot Springs',
    level: '中3',
    paragraphs: [
      'In Nagano, there is a famous park ( A ) wild monkeys take baths in a hot spring. In winter, the area is covered with deep snow, and many tourists come to see the monkeys.',
      'These monkeys are Japanese macaques. They live farther north than any other kind of monkey ( B ) the world. Their thick fur helps them stay warm in the cold winter.',
      'Scientists say that not all of the monkeys use the hot spring. It is mostly the young ones and the females ( C ) enjoy the warm water. A study also found that monkeys in the hot water feel less stress.',
      'The monkeys did not always take baths. About sixty years ago, a young monkey jumped into the water ( D ) get some food, and soon others began to copy it.',
    ],
    ja: [
      '長野県には、野生のサルが温泉に入ることで有名な公園があります。冬になるとあたりは深い雪におおわれ、サルを見に多くの観光客がやってきます。',
      'このサルはニホンザルです。世界のどの種類のサルよりも北に住んでいます。厚い毛が、寒い冬でも体を温かく保つのに役立っています。',
      '科学者によると、すべてのサルが温泉に入るわけではありません。温かいお湯を楽しむのは、おもに子ザルやメスです。また、お湯に入っているサルはストレスが少ないこともある研究でわかりました。',
      'サルたちはむかしからお風呂に入っていたわけではありません。60年ほど前、1匹の子ザルが食べ物をとろうとしてお湯にとびこみ、まもなくほかのサルもそれをまねするようになったのです。',
    ],
    blanks: [
      { id: 'A', choices: ['what', 'when', 'where', 'which'], answer: 2, why: '場所（a famous park）を説明する関係副詞 where。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 1, why: '「世界で」は in the world。' },
      { id: 'C', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: 'It is 〜 that … で「…するのは〜だ」（強調の形）。' },
      { id: 'D', choices: ['for', 'in', 'of', 'to'], answer: 3, why: '目的「〜するために」は to ＋動詞の原形。' },
    ],
    tf: [
      { statement: 'The monkeys in the park take baths in a hot spring.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Japanese macaques live farther south than any other kind of monkey.', answer: false, why: 'どのサルよりも北に住んでいる。' },
      { statement: 'All the monkeys in the park use the hot spring.', answer: false, why: 'すべてのサルが入るわけではない。' },
      { statement: 'Monkeys in the hot water feel less stress.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'The monkeys began bathing about sixty years ago.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'talk-new-student',
    title: 'A New Student (会話文)',
    level: '中2（会話文）',
    paragraphs: [
      'Ms. Kato: Everyone, this is Emma. She came ( A ) Australia last week.',
      "Emma: Hello, everyone. Nice to meet you. I'm happy to be here.",
      "Haruki: Hi, Emma. I'm Haruki. What do you like to do?",
      'Emma: I like playing tennis. I was on the tennis team at my school ( B ) Australia.',
      "Haruki: Really? I'm in the tennis club! We practice every day after school. Why don't you join us?",
      "Emma: I'd love to! But I don't have a racket here. I left it in Australia.",
      "Haruki: Don't worry. You can use mine ( C ) you get a new one.",
      "Emma: Thank you! You're very kind. By the way, is it cold here in winter?",
      'Haruki: Yes, it sometimes snows in January. Is it cold in Australia now?',
      "Emma: No. The seasons are opposite there, so it is spring now. It's getting warmer and ( D ).",
    ],
    ja: [
      '加藤先生：みなさん、こちらはエマさんです。先週オーストラリアから来ました。',
      'エマ：みなさん、こんにちは。はじめまして。ここに来られてうれしいです。',
      'ハルキ：やあ、エマ。ぼくはハルキ。何をするのが好き？',
      'エマ：テニスをするのが好きなの。オーストラリアの学校ではテニス部に入っていたわ。',
      'ハルキ：本当？ぼくはテニス部だよ！毎日放課後に練習しているんだ。入らない？',
      'エマ：ぜひ入りたい！でもここにはラケットがないの。オーストラリアに置いてきちゃった。',
      'ハルキ：心配いらないよ。新しいのを買うまで、ぼくのを使っていいよ。',
      'エマ：ありがとう！とても親切ね。ところで、ここは冬は寒いの？',
      'ハルキ：うん、1月にはときどき雪がふるよ。オーストラリアは今寒いの？',
      'エマ：ううん。あちらでは季節が逆だから、今は春なの。どんどん暖かくなっているわ。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'from', 'to'], answer: 2, why: 'come from 〜 で「〜から来る」。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 1, why: '国の中の場所は in（in Australia）。' },
      { id: 'C', choices: ['by', 'for', 'since', 'until'], answer: 3, why: 'until ＋文 で「〜するまで（ずっと）」。' },
      { id: 'D', choices: ['warm', 'warmer', 'warmest', 'warmly'], answer: 1, why: '比較級 and 比較級 で「ますます〜」（warmer and warmer）。' },
    ],
    tf: [
      { statement: 'Emma came from Australia last week.', answer: true, why: '加藤先生の発言と合う。' },
      { statement: 'Emma was on the soccer team in Australia.', answer: false, why: 'テニス部だった。' },
      { statement: 'Haruki is in the tennis club.', answer: true, why: 'ハルキの発言と合う。' },
      { statement: 'Emma brought her racket to Japan.', answer: false, why: 'オーストラリアに置いてきた。' },
      { statement: 'It is spring in Australia now.', answer: true, why: 'エマの最後の発言と合う。' },
    ],
  },
  {
    id: 'old-bicycle',
    title: 'The Old Bicycle',
    level: '中2（物語）',
    paragraphs: [
      'Kenta wanted a new bicycle, but his family could not buy one. One day, his neighbor, Mr. Hara, said, "I have an old bicycle that I don\'t use anymore. Do you want it?"',
      'The bicycle was old and dirty. The tires were flat, and the chain was too rusty ( A ) move. Kenta was disappointed, but his grandfather said, "Let\'s fix it together. It will be fun."',
      'For two weeks, they worked on the bicycle every weekend. They cleaned it, changed the tires, and painted it blue. Kenta learned ( B ) to use many tools.',
      'When it was finished, Kenta rode it to Mr. Hara\'s house. Mr. Hara was very surprised. "It looks ( C ) new!" he said.',
      'Now Kenta rides the blue bicycle to the library every Saturday. He thinks it is better than a new one, because he made it special ( D ) his own hands.',
    ],
    ja: [
      'ケンタは新しい自転車がほしかったのですが、家族には買うことができませんでした。ある日、となりの原さんが言いました。「もう使っていない古い自転車があるんだ。いるかい？」',
      'その自転車は古くてよごれていました。タイヤはパンクしていて、チェーンはさびすぎて動きませんでした。ケンタはがっかりしましたが、おじいちゃんが言いました。「いっしょに直そう。きっと楽しいぞ」。',
      '2週間のあいだ、2人は週末ごとに自転車の修理をしました。そうじをして、タイヤを取りかえて、青くぬりました。ケンタはたくさんの道具の使い方を覚えました。',
      'できあがると、ケンタはそれに乗って原さんの家に行きました。原さんはとてもおどろきました。「新品みたいだ！」と彼は言いました。',
      '今ではケンタは、毎週土曜日にその青い自転車で図書館へ行きます。自分の手で特別なものにしたので、新品よりもいいと思っているのです。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'of', 'that', 'to'], answer: 3, why: 'too 〜 to … で「〜すぎて…できない」。' },
      { id: 'B', choices: ['how', 'what', 'which', 'who'], answer: 0, why: 'how to 〜 で「〜のしかた」。' },
      { id: 'C', choices: ['as', 'for', 'like', 'to'], answer: 2, why: 'look like 〜 で「〜のように見える」（look like new「新品みたい」）。' },
      { id: 'D', choices: ['by', 'for', 'in', 'with'], answer: 3, why: 'with one\'s own hands で「自分の手で」。' },
    ],
    tf: [
      { statement: "Kenta's family bought him a new bicycle.", answer: false, why: '家族は買えなかった。' },
      { statement: 'Mr. Hara gave Kenta an old bicycle.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Kenta fixed the bicycle with his father.', answer: false, why: 'いっしょに直したのはおじいちゃん。' },
      { statement: 'They painted the bicycle blue.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Kenta thinks his bicycle is better than a new one.', answer: true, why: '第5段落の内容と合う。' },
    ],
  },
  {
    id: 'salty-sea',
    title: 'Why Is the Sea Salty?',
    level: '中2',
    paragraphs: [
      'If you have ever swum in the sea, you know that sea water tastes salty. But river water and rain are not salty. So where does the salt in the sea come ( A )?',
      'The answer is rocks. When rain falls, it slowly breaks ( B ) rocks on the land and takes tiny pieces of salt and other minerals into rivers. Then the rivers carry them to the sea.',
      'In the sea, the sun heats the water, and some of it goes up into the air. However, the salt cannot go up with the water, so it stays ( C ) the sea. This has happened for millions of years.',
      'Today, about 3.5 percent of sea water is salt. That may not sound like much, but if we took all the salt out of the sea, it could cover all the land on the earth ( D ) a thick layer.',
    ],
    ja: [
      '海で泳いだことがあれば、海の水がしょっぱいことを知っているでしょう。でも、川の水や雨はしょっぱくありません。では、海の塩はどこから来るのでしょうか。',
      '答えは岩です。雨がふると、陸の岩を少しずつくだき、塩などの小さなつぶを川へ運びます。そして川がそれを海まで運んでいくのです。',
      '海では、太陽が水を温め、その一部が空気中へのぼっていきます。しかし、塩は水といっしょにのぼることができないので、海に残ります。これが何百万年もくり返されてきたのです。',
      '今では、海の水のおよそ3.5パーセントが塩です。それほど多くないように聞こえるかもしれませんが、もし海の塩を全部取り出したら、地球の陸地全体を厚い層でおおうことができるほどなのです。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'from', 'with'], answer: 2, why: 'come from 〜 で「〜から来る」。疑問詞 where とセットで文の最後に from が残る。' },
      { id: 'B', choices: ['down', 'off', 'out', 'over'], answer: 0, why: 'break down 〜 で「〜をくだく・分解する」。' },
      { id: 'C', choices: ['at', 'in', 'on', 'to'], answer: 1, why: 'stay in 〜 で「〜の中にとどまる」。' },
      { id: 'D', choices: ['by', 'for', 'in', 'with'], answer: 3, why: 'cover A with B で「AをBでおおう」。' },
    ],
    qa: [
      { q: 'What carries salt to the sea?', choices: ['Rivers.', 'Fish.', 'The wind.', 'People.'], answer: 0, why: 'the rivers carry them to the sea とある。' },
      { q: 'What happens to the salt when sea water goes up into the air?', choices: ['It goes up too.', 'It becomes rain.', 'It stays in the sea.', 'It turns into rocks.'], answer: 2, why: '塩は水といっしょにのぼれず、海に残る。' },
    ],
    gist: [{ para: 2, choices: ['海の水が空気中へのぼっても塩は残ること', '川がしょっぱくない理由', '海の塩の量', '海で泳ぐときの注意'], answer: 0, why: '第3段落は、水は空気中へのぼるが塩はのぼれず海に残る、という話。' }],
    tf: [
      { statement: 'River water is as salty as sea water.', answer: false, why: '川の水はしょっぱくない。' },
      { statement: 'Rain slowly breaks down rocks on the land.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Salt goes up into the air with the water.', answer: false, why: '塩は水といっしょにのぼれず、海に残る。' },
      { statement: 'About 3.5 percent of sea water is salt.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'The salt in the sea came from rocks.', answer: true, why: '第2段落の内容と合う。' },
    ],
  },
  {
    id: 'lucky-stone',
    title: 'The Lucky Stone',
    level: '中2（物語）',
    paragraphs: [
      'The night before her piano contest, Mai was so nervous that she could not eat dinner. Her grandmother gave her a small, smooth stone. "This is a lucky stone," she said. "Keep it ( A ) your pocket tomorrow."',
      'The next day, Mai held the stone tightly before she went on the stage. She took a deep breath and started to play. Her fingers moved smoothly, and she did not make a single mistake.',
      'Mai won second prize. After the contest, she thanked her grandmother. "The stone really worked!" she said. Her grandmother laughed. "Actually, I found it ( B ) our garden this morning."',
      'Mai was surprised. "Then why did I play so well?" she asked. "Because you practiced every day for three months," her grandmother answered. "The stone only helped you believe ( C ) yourself."',
      'Mai still keeps the stone on her desk. When she feels nervous, she looks at it and remembers that hard work is the real key ( D ) success.',
    ],
    ja: [
      'ピアノのコンクールの前の晩、マイはとても緊張していて夕ごはんを食べられませんでした。おばあちゃんが小さくてすべすべした石をくれました。「これは幸運の石よ。明日はポケットに入れておきなさい」とおばあちゃんは言いました。',
      '次の日、マイはステージに上がる前に石をぎゅっとにぎりました。深呼吸をして、ひきはじめました。指はなめらかに動き、1つもまちがえませんでした。',
      'マイは2位になりました。コンクールのあと、マイはおばあちゃんにお礼を言いました。「あの石、本当にきいたよ！」。おばあちゃんは笑いました。「じつはね、けさ庭で見つけた石なのよ」。',
      'マイはおどろきました。「じゃあ、どうしてあんなにうまくひけたの？」とたずねると、おばあちゃんは答えました。「3か月のあいだ毎日練習したからよ。石は、あなたが自分を信じる手助けをしただけ」。',
      'マイは今もその石を机の上に置いています。緊張したときはその石を見て、努力こそが成功への本当のかぎだと思い出すのです。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'with'], answer: 1, why: '「ポケットの中に」は in your pocket。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 1, why: '「庭で」は in the garden。' },
      { id: 'C', choices: ['at', 'for', 'in', 'of'], answer: 2, why: 'believe in 〜 で「〜（の力）を信じる」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'the key to 〜 で「〜へのかぎ（秘けつ）」。' },
    ],
    qa: [
      { q: 'What did Mai\'s grandmother give her?', choices: ['A piano.', 'A small stone.', 'Some dinner.', 'A prize.'], answer: 1, why: 'gave her a small, smooth stone とある。' },
      { q: 'Why did Mai play so well?', choices: ['Because the stone was magic.', 'Because the contest was easy.', 'Because she practiced every day for three months.', 'Because her grandmother played with her.'], answer: 2, why: 'おばあちゃんが「3か月毎日練習したから」と答えている。' },
    ],
    tf: [
      { statement: 'Mai was nervous the night before the contest.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Mai made some mistakes in the contest.', answer: false, why: '1つもまちがえなかった。' },
      { statement: 'Mai won first prize.', answer: false, why: '2位だった。' },
      { statement: "Mai's grandmother found the stone in the garden.", answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Mai practiced every day for three months.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'email-school-trip',
    title: 'An Email about a School Trip',
    level: '中2（メール）',
    paragraphs: [
      'Dear Sam, Thank you for your last email. I enjoyed reading about your trip to the mountains. This time, I want to tell you ( A ) my school trip to Kyoto.',
      'We visited many old temples. The most famous one was Kinkakuji, ( B ) is covered with gold. It shines beautifully in the sun. I have attached a photo of it to this email.',
      'On the second day, we wore kimonos and walked around Gion. I had never worn a kimono before, ( C ) it was hard to walk in it. But my friends and I took many fun pictures together.',
      'Have you ever visited an old city like Kyoto? If you come to Japan someday, I would like to show you around. Please write back ( D ) you have time. Your friend, Daichi',
    ],
    ja: [
      'サムへ。この前はメールをありがとう。山への旅行の話、楽しく読んだよ。今回は、京都への修学旅行のことを話したいな。',
      'たくさんの古いお寺に行ったよ。いちばん有名なのは金閣寺で、金でおおわれているんだ。日の光を受けて美しくかがやくよ。このメールに写真をつけておいたね。',
      '2日目は着物を着て祇園を歩いたよ。着物を着るのははじめてだったから、着物で歩くのは大変だった。でも友だちといっしょに楽しい写真をたくさんとったよ。',
      'サムは京都のような古い町に行ったことはある？いつか日本に来たら、案内したいな。時間があるときに返事をちょうだいね。きみの友だち、ダイチより',
    ],
    blanks: [
      { id: 'A', choices: ['about', 'for', 'of', 'with'], answer: 0, why: 'tell 人 about 〜 で「人に〜について話す」。' },
      { id: 'B', choices: ['what', 'where', 'which', 'who'], answer: 2, why: 'もの（Kinkakuji）を説明する関係代名詞 which（コンマのあとの説明）。' },
      { id: 'C', choices: ['because', 'but', 'if', 'so'], answer: 3, why: '「一度も着たことがなかった → だから大変だった」なので so。' },
      { id: 'D', choices: ['what', 'when', 'where', 'which'], answer: 1, why: 'when ＋文 で「〜するときに」。' },
    ],
    tf: [
      { statement: 'Sam wrote about his trip to the mountains in his last email.', answer: true, why: '第1段落の内容と合う。' },
      { statement: "Daichi's school trip was to Nara.", answer: false, why: '京都への修学旅行。' },
      { statement: 'Daichi attached a photo of Kinkakuji.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Daichi had worn a kimono many times before.', answer: false, why: '着物を着るのははじめてだった。' },
      { statement: 'Daichi wants to show Sam around if he comes to Japan.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'cat-sleep',
    title: 'Why Do Cats Sleep So Much?',
    level: '中2',
    paragraphs: [
      'If you have a cat, you may notice that it sleeps most of the day. In fact, many cats sleep ( A ) twelve to sixteen hours a day. Why do they need so much sleep?',
      'One reason is that cats are hunters. In the wild, they have to run fast and jump high ( B ) catch small animals. These actions use a lot of energy, so cats rest to save their power.',
      'Cats are also most active early in the morning and in the evening. This is the time when the small animals they hunt come out. That is why your cat may wake you up ( C ) the sun rises!',
      'However, cats do not sleep deeply all the time. Most of their sleep is light, so they can wake up quickly ( D ) they hear a sound.',
    ],
    ja: [
      'ねこを飼っていると、ねこが1日のほとんどをねてすごしていることに気づくかもしれません。じっさい、多くのねこは1日に12〜16時間ねます。なぜそんなにたくさんの睡眠が必要なのでしょうか。',
      '理由のひとつは、ねこが狩りをする動物だということです。野生では、小さな動物をつかまえるために速く走り、高くとばなければなりません。こうした動きはたくさんのエネルギーを使うので、ねこは休んで力をたくわえるのです。',
      'また、ねこは朝早くと夕方にいちばん活発になります。それは、ねこがねらう小さな動物が出てくる時間です。だから、あなたのねこは日がのぼる前にあなたを起こすかもしれないのです！',
      'けれども、ねこはいつもぐっすりねむっているわけではありません。ねむりのほとんどは浅いので、音が聞こえるとすぐに目をさますことができます。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', 'since'], answer: 1, why: '時間の長さ「〜のあいだ」は for。' },
      { id: 'B', choices: ['by', 'for', 'of', 'to'], answer: 3, why: '目的「〜するために」は to ＋動詞の原形。' },
      { id: 'C', choices: ['before', 'since', 'though', 'unless'], answer: 0, why: '「日がのぼる前に」は before the sun rises。' },
      { id: 'D', choices: ['how', 'what', 'when', 'which'], answer: 2, why: 'when ＋文 で「〜するときに」。' },
    ],
    titleQ: { choices: ['How to Train Your Cat', 'Why Do Cats Sleep So Much?', 'Cats and Dogs Are Friends', 'The Best Food for Cats'], answer: 1, why: 'ねこがたくさんねる理由（狩り・活動する時間・浅いねむり）が書かれている。' },
    tf: [
      { statement: 'Many cats sleep twelve to sixteen hours a day.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Hunting uses only a little energy.', answer: false, why: 'たくさんのエネルギーを使う。' },
      { statement: 'Cats are most active in the middle of the day.', answer: false, why: '朝早くと夕方にいちばん活発。' },
      { statement: "Most of a cat's sleep is light.", answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Cats can wake up quickly when they hear a sound.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'talk-garbage',
    title: 'Sorting the Garbage (会話文)',
    level: '中2（会話文）',
    paragraphs: [
      'Lucy: Ms. Tanaka, where should I put this plastic bottle?',
      "Ms. Tanaka: Oh, please don't put it ( A ) the burnable garbage. Plastic bottles go in the blue box.",
      'Lucy: I see. In my country, we put everything in one bag.',
      'Ms. Tanaka: In Japan, we sort garbage into many groups. It can be difficult at first, but you will get used ( B ) it soon.',
      'Lucy: Which day can I put out burnable garbage?',
      'Ms. Tanaka: On Mondays and Thursdays. You have to put it out ( C ) eight in the morning.',
      'Lucy: What about cans?',
      'Ms. Tanaka: Cans are collected every other Wednesday. There is a calendar on the fridge, so please check it.',
      'Lucy: Thank you. Why do Japanese people sort garbage so carefully?',
      'Ms. Tanaka: Because many things can be recycled. For example, plastic bottles can be made ( D ) clothes.',
      "Lucy: That's amazing! I'll be careful from now on.",
    ],
    ja: [
      'ルーシー：田中さん、このペットボトルはどこに入れればいいですか。',
      '田中さん：あら、燃えるごみには入れないでね。ペットボトルは青い箱に入れるのよ。',
      'ルーシー：わかりました。私の国では、全部1つのふくろに入れるんです。',
      '田中さん：日本では、ごみをたくさんの種類に分けるの。最初はむずかしいかもしれないけど、すぐに慣れるわよ。',
      'ルーシー：燃えるごみは何曜日に出せますか。',
      '田中さん：月曜日と木曜日よ。朝8時までに出さないといけないの。',
      'ルーシー：缶はどうですか。',
      '田中さん：缶は1週おきの水曜日に集められるの。冷蔵庫にカレンダーがはってあるから、見てね。',
      'ルーシー：ありがとうございます。どうして日本の人はそんなにていねいにごみを分けるんですか。',
      '田中さん：たくさんのものがリサイクルできるからよ。たとえば、ペットボトルは服に作りかえることができるの。',
      'ルーシー：すごいですね！これから気をつけます。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'to'], answer: 1, why: '「燃えるごみ（の中）に入れる」は put it in 〜。' },
      { id: 'B', choices: ['at', 'for', 'to', 'with'], answer: 2, why: 'get used to 〜 で「〜に慣れる」。' },
      { id: 'C', choices: ['by', 'for', 'in', 'until'], answer: 0, why: '期限「〜までに」は by。' },
      { id: 'D', choices: ['by', 'from', 'into', 'of'], answer: 2, why: 'make A into B で「AをBに作りかえる」（受け身で A can be made into B）。' },
    ],
    tf: [
      { statement: 'Lucy should put the plastic bottle in the blue box.', answer: true, why: '田中さんの発言と合う。' },
      { statement: "In Lucy's country, people sort garbage into many groups.", answer: false, why: '全部1つのふくろに入れる。' },
      { statement: 'Burnable garbage is collected on Mondays and Thursdays.', answer: true, why: '田中さんの発言と合う。' },
      { statement: 'Cans are collected every Wednesday.', answer: false, why: '1週おきの水曜日。' },
      { statement: 'Plastic bottles can be made into clothes.', answer: true, why: '田中さんの発言と合う。' },
    ],
  },
  {
    id: 'missed-bus',
    title: 'The Missed Bus',
    level: '中2（物語）',
    paragraphs: [
      "One afternoon, Yuto missed the bus home from his grandmother's village. The next bus would come ( A ) two hours. His house was only five kilometers away, so he decided to walk.",
      'At first, he was ( B ) tired to enjoy the walk. But soon he started to notice things he had never seen from the bus window: a small waterfall, a field full of sunflowers, and an old stone bridge.',
      'Near the bridge, he met an old farmer. The farmer gave him a cold tomato and said, "Not many young people walk ( C ) here these days. Enjoy the view!"',
      'When Yuto got home, the sun was setting. His legs were tired, but he felt happy. The next week, he told his friends about the walk, and they all wanted ( D ) it, too.',
    ],
    ja: [
      'ある日の午後、ユウトはおばあちゃんの村から家に帰るバスに乗りおくれてしまいました。次のバスは2時間後です。家はたった5キロ先だったので、歩いて帰ることにしました。',
      '最初は、つかれすぎていて歩くのを楽しめませんでした。でもすぐに、バスのまどからは一度も見たことがなかったものに気づきはじめました。小さな滝、ひまわりでいっぱいの畑、そして古い石の橋です。',
      '橋の近くで、ユウトは年配の農家の人に会いました。その人は冷えたトマトをくれて、「最近はこのあたりを歩く若い人はあまりいないんだ。景色を楽しんでおいで！」と言いました。',
      'ユウトが家に着いたとき、日がしずむところでした。足はつかれていましたが、幸せな気持ちでした。次の週、友だちにその道のことを話すと、みんな自分も歩いてみたいと言いました。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', 'on'], answer: 2, why: 'in ＋時間 で「（今から）〜後に」。' },
      { id: 'B', choices: ['much', 'so', 'too', 'very'], answer: 2, why: 'too 〜 to … で「〜すぎて…できない」。' },
      { id: 'C', choices: ['around', 'between', 'during', 'since'], answer: 0, why: 'around here で「このあたりを」。' },
      { id: 'D', choices: ['to try', 'tried', 'try', 'trying'], answer: 0, why: 'want to ＋動詞の原形 で「〜したい」。' },
    ],
    tf: [
      { statement: 'Yuto missed the bus home.', answer: true, why: '第1段落の内容と合う。' },
      { statement: "Yuto's house was fifty kilometers away.", answer: false, why: '5キロ先だった。' },
      { statement: 'Yuto saw a field full of sunflowers on the way.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'An old farmer gave Yuto a cold tomato.', answer: true, why: '第3段落の内容と合う。' },
      { statement: "Yuto's friends did not want to walk the same way.", answer: false, why: 'みんな歩いてみたがった。' },
    ],
  },
  {
    id: 'plants-water',
    title: 'How Do Plants Drink Water?',
    level: '中2',
    paragraphs: [
      'Plants cannot walk to a river to drink water. So how do they get the water they need? The answer is ( A ) their roots.',
      'Roots spread out under the ground and take in water from the soil. The water then moves up ( B ) the stem, just like juice going up a straw.',
      'When the water reaches the leaves, some of it goes out into the air through very small holes. Scientists call this "transpiration." As water leaves the plant, more water is pulled up ( C ) the roots.',
      'This is why plants need water every day, especially on hot days. If you forget to water a plant, its leaves will soon ( D ) soft and weak.',
    ],
    ja: [
      '植物は川まで歩いていって水を飲むことはできません。では、必要な水をどうやって手に入れているのでしょうか。答えは根にあります。',
      '根は地面の下に広がり、土から水を取りこみます。その水は、ストローでジュースがのぼっていくように、くきの中を上へと進んでいきます。',
      '水が葉にとどくと、その一部はとても小さなあなから空気中へ出ていきます。科学者はこれを「蒸散」とよびます。水が植物から出ていくと、根からさらに水が引き上げられるのです。',
      'だから植物には毎日、特に暑い日には水が必要なのです。植物に水をあげわすれると、葉はすぐにやわらかく弱々しくなってしまいます。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'with'], answer: 1, why: 'The answer is in 〜 で「答えは〜にある」。' },
      { id: 'B', choices: ['across', 'between', 'through', 'under'], answer: 2, why: 'through 〜 で「〜の中を通って」。' },
      { id: 'C', choices: ['for', 'from', 'of', 'with'], answer: 1, why: '「根から」引き上げられるので from。' },
      { id: 'D', choices: ['become', 'became', 'becoming', 'to become'], answer: 0, why: '助動詞 will のあとは動詞の原形 become。' },
    ],
    titleQ: { choices: ['How Do Plants Drink Water?', 'The Biggest Tree in Japan', 'Why Leaves Are Green', 'How to Grow Tomatoes'], answer: 0, why: '根から水を取りこみ、くきを通って葉から出ていくしくみが書かれている。' },
    tf: [
      { statement: 'Plants take in water through their roots.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Water moves down from the leaves to the roots.', answer: false, why: '水は根からくきを通って上へ進む。' },
      { statement: 'Some water goes out of the leaves into the air.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Plants need water only in winter.', answer: false, why: '毎日、特に暑い日に必要。' },
      { statement: 'Leaves become soft when a plant does not get water.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'talk-movie',
    title: 'Going to the Movies (会話文)',
    level: '中2（会話文）',
    paragraphs: [
      'Sora: Hey, Mia. Are you free ( A ) Saturday?',
      'Mia: Yes, I am. Why?',
      'Sora: There is a new animated movie at the theater. Do you want to see it with me?',
      'Mia: Sounds great! What time does it start?',
      'Sora: There are two shows. One starts at ten in the morning, and the ( B ) starts at two in the afternoon.',
      'Mia: I have a piano lesson in the morning, so the afternoon show is better ( C ) me.',
      "Sora: OK. Let's meet in front of the station at one thirty.",
      'Mia: Sure. How much is the ticket?',
      "Sora: It's 1,000 yen for students. I'll buy the tickets online tonight.",
      "Mia: Thank you! I'll bring some snacks. I'm looking forward ( D ) it.",
      "Sora: Me too. But don't forget that we can't eat outside food inside the theater.",
      "Mia: Oh, really? Then let's eat them in the park after the movie.",
    ],
    ja: [
      'ソラ：ねえ、ミア。土曜日はひま？',
      'ミア：うん、ひまだよ。どうして？',
      'ソラ：映画館で新しいアニメ映画をやっているんだ。いっしょに見に行かない？',
      'ミア：いいね！何時に始まるの？',
      'ソラ：2回あるんだ。1回目は午前10時、もう1回は午後2時に始まるよ。',
      'ミア：午前中はピアノのレッスンがあるから、午後の回のほうがいいな。',
      'ソラ：わかった。1時半に駅の前で会おう。',
      'ミア：うん。チケットはいくら？',
      'ソラ：学生は1,000円だよ。今夜インターネットでチケットを買っておくね。',
      'ミア：ありがとう！おかしを持っていくね。楽しみにしているよ。',
      'ソラ：ぼくも。でも、映画館の中では持ちこんだ食べ物は食べられないから気をつけてね。',
      'ミア：え、そうなの？じゃあ、映画のあとで公園で食べよう。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'on', 'to'], answer: 2, why: '曜日の前は on（on Saturday）。' },
      { id: 'B', choices: ['another', 'one', 'other', 'others'], answer: 2, why: '2つのうちの「もう一方」は the other。' },
      { id: 'C', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'better for 〜 で「〜にとってよりよい」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 3, why: 'look forward to 〜 で「〜を楽しみに待つ」。' },
    ],
    tf: [
      { statement: 'Sora invites Mia to see a movie.', answer: true, why: 'ソラの発言と合う。' },
      { statement: 'Mia has a piano lesson in the afternoon.', answer: false, why: 'レッスンは午前中。' },
      { statement: 'They will meet in front of the station at one thirty.', answer: true, why: 'ソラの発言と合う。' },
      { statement: 'The ticket is 1,000 yen for adults.', answer: false, why: '学生が1,000円。' },
      { statement: 'They cannot eat outside food inside the theater.', answer: true, why: 'ソラの最後の発言と合う。' },
    ],
  },
  {
    id: 'sunflower-seeds',
    title: 'The Sunflower Seeds',
    level: '中2（物語）',
    paragraphs: [
      'In spring, Hana\'s teacher gave each student three sunflower seeds. "Plant them and take care of them," she said. "Let\'s see whose sunflower grows the ( A )."',
      'Hana planted her seeds in a pot on her balcony. She watered them every morning before school. After a week, two small green leaves came ( B ) of the soil.',
      'In summer, a big storm hit the town. Hana was worried about her sunflower, so she brought the pot ( C ) the house. The next morning, her sunflower was safe, but many plants outside were broken.',
      'At the end of summer, Hana\'s sunflower was taller ( D ) her father. It was not the tallest in her class, but her teacher said, "Your sunflower is the healthiest of all. You took very good care of it."',
    ],
    ja: [
      '春に、ハナの先生は生徒一人ひとりにひまわりの種を3つずつくれました。「植えて、お世話をしてね。だれのひまわりがいちばん高くなるか見てみよう」と先生は言いました。',
      'ハナはベランダの植木ばちに種を植えました。毎朝、学校へ行く前に水をあげました。1週間後、小さな緑の葉が2まい、土から出てきました。',
      '夏、大きなあらしが町をおそいました。ハナはひまわりが心配になって、植木ばちを家の中に入れました。次の朝、ハナのひまわりは無事でしたが、外の植物の多くは折れていました。',
      '夏の終わりには、ハナのひまわりはお父さんよりも高くなっていました。クラスでいちばん高いわけではありませんでしたが、先生は「あなたのひまわりはみんなの中でいちばん元気ね。とてもよくお世話をしたのね」と言いました。',
    ],
    blanks: [
      { id: 'A', choices: ['most tall', 'tall', 'taller', 'tallest'], answer: 3, why: 'the ＋最上級 で「いちばん〜」（the tallest）。' },
      { id: 'B', choices: ['in', 'off', 'out', 'up'], answer: 2, why: 'come out of 〜 で「〜から出てくる」。' },
      { id: 'C', choices: ['into', 'onto', 'out', 'over'], answer: 0, why: '「家の中へ」は into the house。' },
      { id: 'D', choices: ['as', 'than', 'that', 'then'], answer: 1, why: '比較級 taller のあとは than。' },
    ],
    tf: [
      { statement: 'Each student got three sunflower seeds.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Hana watered her seeds every evening.', answer: false, why: '毎朝、学校へ行く前に水をあげた。' },
      { statement: 'Hana brought her pot into the house during the storm.', answer: true, why: '第3段落の内容と合う。' },
      { statement: "Hana's sunflower was the tallest in her class.", answer: false, why: 'クラスでいちばん高いわけではなかった。' },
      { statement: "Hana's sunflower was taller than her father.", answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'fingerprints',
    title: 'Your Special Fingerprints',
    level: '中2',
    paragraphs: [
      'Look at the tips of your fingers. You can see many thin lines. These lines are called fingerprints, and no two people in the world have ( A ) same ones.',
      'Even twins who look exactly alike have different fingerprints. This is because fingerprints are formed ( B ) we are born, and small differences during that time make each pattern special.',
      'Scientists think fingerprints help us hold things. The lines may make it ( C ) for us to pick up small or wet objects. Our fingertips can also feel things better because of them.',
      "Because everyone's fingerprints are different, they are used ( D ) many places. For example, some smartphones can be opened with a fingerprint instead of a password.",
    ],
    ja: [
      '指先を見てください。細い線がたくさん見えるでしょう。この線は指紋とよばれ、世界に同じ指紋をもつ人は2人といません。',
      'そっくりなふたごでさえ、指紋はちがいます。それは、指紋が生まれる前にでき、そのときの小さなちがいがそれぞれのもようを特別なものにするからです。',
      '科学者は、指紋が物を持つのに役立っていると考えています。この線のおかげで、小さなものやぬれたものを拾いやすくなっているのかもしれません。また、指紋があることで指先がものをよりよく感じとれるとも考えられています。',
      'みんなの指紋がちがうので、指紋はいろいろなところで使われています。たとえば、パスワードのかわりに指紋で開けられるスマートフォンもあります。',
    ],
    blanks: [
      { id: 'A', choices: ['a', 'an', 'some', 'the'], answer: 3, why: 'the same 〜 で「同じ〜」（same の前は the）。' },
      { id: 'B', choices: ['after', 'before', 'since', 'until'], answer: 1, why: '「生まれる前に」は before we are born。' },
      { id: 'C', choices: ['easier', 'easiest', 'easily', 'easy'], answer: 0, why: 'make it 〜 for 人 to … で「人が…するのを〜にする」。ここは比較級 easier。' },
      { id: 'D', choices: ['at', 'for', 'in', 'on'], answer: 2, why: '「多くの場所で」は in many places。' },
    ],
    qa: [
      { q: 'Do twins have the same fingerprints?', choices: ['Yes, they do.', 'No, they don\'t.', 'Yes, only on one hand.', 'No, they have no fingerprints.'], answer: 1, why: 'Even twins … have different fingerprints. とある。' },
      { q: 'What can some smartphones use instead of a password?', choices: ['A voice.', 'A photo.', 'A fingerprint.', 'A key.'], answer: 2, why: 'some smartphones can be opened with a fingerprint とある。' },
    ],
    tf: [
      { statement: 'No two people have the same fingerprints.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Twins have the same fingerprints.', answer: false, why: 'ふたごでも指紋はちがう。' },
      { statement: 'Fingerprints are formed after we are born.', answer: false, why: '生まれる前にできる。' },
      { statement: 'Fingerprints may help us pick up small objects.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Some smartphones can be opened with a fingerprint.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'email-grandma-sports',
    title: 'An Email to Grandma',
    level: '中2（メール）',
    paragraphs: [
      'Dear Grandma, How are you? It is getting colder here. Next month, we will have our sports day at school, and I want you ( A ) come and watch.',
      'This year, I will run in the relay race. I am the last runner for my team, so I am a little nervous. I practice running ( B ) the river every evening with my father. I hope our team can win this year.',
      "Sports day will be held on Saturday, November 7. It starts at nine o'clock. If it rains, it will be held ( C ) next day.",
      "Mom will make lunch for everyone, so please come hungry! I can't wait ( D ) see you. Love, Riku",
    ],
    ja: [
      'おばあちゃんへ。元気ですか。こちらはだんだん寒くなってきました。来月、学校で運動会があるので、見に来てほしいです。',
      '今年、ぼくはリレーに出ます。チームのアンカーなので、少し緊張しています。毎晩、お父さんといっしょに川ぞいを走って練習しています。今年はチームが勝てるといいな。',
      '運動会は11月7日の土曜日にあります。9時に始まります。雨がふったら、次の日になります。',
      'お母さんがみんなのお弁当を作るので、おなかをすかせて来てね！会えるのがとても楽しみです。リクより',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'of', 'that', 'to'], answer: 3, why: 'want 人 to 〜 で「人に〜してほしい」。' },
      { id: 'B', choices: ['along', 'between', 'during', 'until'], answer: 0, why: 'along 〜 で「〜にそって」。' },
      { id: 'C', choices: ['a', 'an', 'the', 'this'], answer: 2, why: 'the next day で「次の日」。' },
      { id: 'D', choices: ['at', 'for', 'of', 'to'], answer: 3, why: "can't wait to 〜 で「〜するのが待ちきれない」。" },
    ],
    tf: [
      { statement: 'Riku wants his grandmother to watch his sports day.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Riku will be the first runner in the relay.', answer: false, why: 'アンカー（最後の走者）。' },
      { statement: 'Riku practices running with his father every evening.', answer: true, why: '第2段落の内容と合う。' },
      { statement: "Sports day will start at ten o'clock.", answer: false, why: '9時に始まる。' },
      { statement: "Riku's mother will make lunch.", answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'library-letter',
    title: 'A Letter in the Library Book',
    level: '中2（物語）',
    paragraphs: [
      'One day, Saki borrowed an old book from the school library. When she opened it at home, a small piece of paper fell ( A ) of it.',
      'It was a letter. It said, "To the person who reads this book next: This story helped me when I was sad. I hope it helps you, too." At the bottom, there was a date. The letter was written thirty years ( B ).',
      "Saki read the book that night. It was about a girl ( C ) moved to a new town and slowly made friends. Saki had also moved to a new school that spring, so she understood the girl's feelings.",
      'Before Saki returned the book, she put the old letter back and added her own note: "Thank you. It helped me, too." She hoped the next reader would ( D ) both letters.',
    ],
    ja: [
      'ある日、サキは学校の図書館で古い本を借りました。家で開くと、小さな紙が1まい、本からひらりと落ちました。',
      'それは手紙でした。「この本を次に読む人へ。この物語は、悲しかったときの私を助けてくれました。あなたのことも助けてくれますように」と書いてありました。下には日付があり、その手紙は30年前に書かれたものでした。',
      'サキはその夜、その本を読みました。新しい町に引っこして、少しずつ友だちをつくっていく女の子の物語でした。サキもその春に新しい学校に転校してきたばかりだったので、女の子の気持ちがよくわかりました。',
      '本を返す前に、サキは古い手紙をもとにもどし、自分のメモを書きたしました。「ありがとう。私も助けられました」。次に読む人が、2つの手紙を見つけてくれることをサキは願いました。',
    ],
    blanks: [
      { id: 'A', choices: ['down', 'off', 'out', 'up'], answer: 2, why: 'fall out of 〜 で「〜から落ちる・こぼれ出る」。' },
      { id: 'B', choices: ['after', 'ago', 'before', 'since'], answer: 1, why: '今から数えて「30年前に」は thirty years ago。' },
      { id: 'C', choices: ['what', 'which', 'who', 'whose'], answer: 2, why: '人（a girl）を説明する関係代名詞は who。' },
      { id: 'D', choices: ['find', 'finding', 'found', 'to find'], answer: 0, why: '助動詞 would のあとは動詞の原形 find。' },
    ],
    qa: [
      { q: 'Where did Saki find the letter?', choices: ['In her desk.', 'In an old library book.', 'In her bag.', 'Under the door.'], answer: 1, why: '図書館で借りた古い本から紙が落ちた。' },
      { q: 'What did Saki do before she returned the book?', choices: ['She threw the letter away.', 'She bought a new book.', 'She added her own note.', 'She gave the letter to a teacher.'], answer: 2, why: 'she put the old letter back and added her own note とある。' },
    ],
    tf: [
      { statement: 'Saki borrowed an old book from the school library.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'The letter was written three years ago.', answer: false, why: '30年前に書かれた。' },
      { statement: 'The story was about a boy who moved to a new town.', answer: false, why: '新しい町に引っこした女の子の物語。' },
      { statement: 'Saki had moved to a new school that spring.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Saki added her own note before she returned the book.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'owls-night',
    title: 'How Owls Hunt at Night',
    level: '中2',
    paragraphs: [
      'Owls are birds that hunt mainly at night. To catch mice and other small animals in the dark, they need special eyes and ears. Their eyes are very large ( A ) the size of their heads.',
      'Owls cannot move their eyes like we can. Instead, they turn their heads. An owl can turn its head about 270 degrees, so it can look ( B ) without moving its body.',
      'Owls also have amazing ears. Some kinds of owls have one ear a little higher ( C ) the other. This helps them find exactly where a sound is coming from.',
      'Their feathers are soft, so they can fly very quietly. A mouse often cannot hear an owl ( D ) it is too late.',
    ],
    ja: [
      'フクロウは、おもに夜に狩りをする鳥です。暗やみでネズミなどの小さな動物をつかまえるために、特別な目と耳が必要です。フクロウの目は、頭の大きさのわりにとても大きいのです。',
      'フクロウは私たちのように目を動かすことができません。そのかわりに首を回します。フクロウは首を約270度回せるので、体を動かさずに後ろを見ることができます。',
      'フクロウの耳もすばらしいものです。片方の耳がもう片方より少し高い位置にある種類もいます。これによって、音がどこから聞こえてくるのかを正確に見つけられるのです。',
      'フクロウの羽はやわらかいので、とても静かに飛ぶことができます。ネズミは、手おくれになるまでフクロウの音に気づかないことが多いのです。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'for', 'of', 'with'], answer: 1, why: 'large for 〜 で「〜のわりに大きい」。' },
      { id: 'B', choices: ['behind', 'below', 'beside', 'between'], answer: 0, why: '首を270度回せるので「後ろを」見られる（look behind）。' },
      { id: 'C', choices: ['as', 'than', 'that', 'then'], answer: 1, why: '比較級 higher のあとは than。' },
      { id: 'D', choices: ['by', 'since', 'until', 'while'], answer: 2, why: 'not 〜 until … で「…まで〜しない」。' },
    ],
    qa: [
      { q: 'What do owls do instead of moving their eyes?', choices: ['They close their eyes.', 'They turn their heads.', 'They fly higher.', 'They listen to music.'], answer: 1, why: 'Instead, they turn their heads. とある。' },
      { q: 'Why can owls fly very quietly?', choices: ['Because their feathers are soft.', 'Because they are very small.', 'Because they fly slowly.', 'Because they sleep in the day.'], answer: 0, why: 'Their feathers are soft, so they can fly very quietly. とある。' },
    ],
    gist: [{ para: 2, choices: ['フクロウの耳のすばらしさ', 'フクロウの大きな目', 'フクロウのやわらかい羽', 'フクロウの食べ物'], answer: 0, why: '第3段落は、片方の耳が高い位置にあり、音の場所を正確に見つけられるという耳の話。' }],
    tf: [
      { statement: 'Owls mainly hunt during the day.', answer: false, why: 'おもに夜に狩りをする。' },
      { statement: 'Owls can move their eyes freely.', answer: false, why: '目は動かせず、首を回す。' },
      { statement: 'An owl can turn its head about 270 degrees.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Some owls have ears at different heights.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Owls make a lot of noise when they fly.', answer: false, why: 'とても静かに飛ぶ。' },
    ],
  },
  {
    id: 'talk-surprise-party',
    title: 'Planning a Surprise Party (会話文)',
    level: '中2（会話文）',
    paragraphs: [
      "Yui: Ken, next Friday is Ms. Hill's last day at our school. Let's have a surprise party ( A ) her.",
      'Ken: Good idea! What should we do?',
      'Yui: How about making a big card? Everyone in our class can write a message ( B ) English.',
      'Ken: She will like that. We can also sing her favorite song. She often plays it ( C ) the guitar in class.',
      'Yui: Great. When should we practice?',
      'Ken: We can practice during lunch break on Monday and Wednesday.',
      "Yui: OK. I'll ask the class to keep it a secret. We don't want her ( D ) about it before Friday.",
      "Ken: Right. I can't wait to see her surprised face!",
      "Yui: Me too. I'll bring some colored pens for the card tomorrow.",
    ],
    ja: [
      'ユイ：ケン、来週の金曜日はヒル先生がこの学校にいる最後の日だよ。先生のためにサプライズパーティーをしようよ。',
      'ケン：いい考えだね！何をしようか。',
      'ユイ：大きなカードを作るのはどう？クラスのみんなで英語でメッセージを書くの。',
      'ケン：先生はよろこぶよ。先生の好きな歌も歌えるね。授業でよくギターでひいているから。',
      'ユイ：いいね。いつ練習しようか。',
      'ケン：月曜日と水曜日の昼休みに練習できるよ。',
      'ユイ：わかった。クラスのみんなにはひみつにしておくように言うね。金曜日より前に先生に知られたくないから。',
      'ケン：そうだね。先生のおどろく顔を見るのが楽しみだな！',
      'ユイ：私も。明日、カード用のカラーペンを持ってくるね。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'of', 'to'], answer: 1, why: '「〜のために」は for。' },
      { id: 'B', choices: ['by', 'in', 'on', 'with'], answer: 1, why: '「英語で（書く）」は in English。' },
      { id: 'C', choices: ['at', 'by', 'on', 'with'], answer: 2, why: '楽器を「ひく」ときは play 〜 on the guitar。' },
      { id: 'D', choices: ['knew', 'know', 'knowing', 'to know'], answer: 3, why: 'want 人 to 〜 で「人に〜してほしい」（否定で「〜してほしくない」）。' },
    ],
    tf: [
      { statement: "Next Friday is Ms. Hill's last day at the school.", answer: true, why: 'ユイの最初の発言と合う。' },
      { statement: 'The class will write messages in Japanese.', answer: false, why: '英語でメッセージを書く。' },
      { statement: 'Ms. Hill often plays the guitar in class.', answer: true, why: 'ケンの発言と合う。' },
      { statement: 'They will practice after school on Monday.', answer: false, why: '昼休みに練習する。' },
      { statement: 'Yui will bring some colored pens.', answer: true, why: 'ユイの最後の発言と合う。' },
    ],
  },
  {
    id: 'kite-tree',
    title: 'The Kite in the Tree',
    level: '中2（物語）',
    paragraphs: [
      'On a windy Sunday, Taiga and his little sister Momo went to the park ( A ) fly a kite.',
      'The kite flew higher and higher. Momo laughed and clapped her hands. But suddenly, a strong wind blew, and the kite got caught in a tall tree. It was too high ( B ) them to reach.',
      'Momo started to cry. Taiga did not know ( C ) to do. Then an old man with a long stick walked over. "Let me help," he said, and he carefully pulled the kite down.',
      'The kite had a small hole, but it could still fly. "Thank you very much!" Taiga said. The old man smiled. "When I was young, my kite got stuck in the same tree, and a kind woman helped me. Now it\'s my turn ( D ) help."',
    ],
    ja: [
      '風の強い日曜日、タイガと妹のモモはたこあげをしに公園へ行きました。',
      'たこはどんどん高くあがりました。モモは笑って手をたたきました。でもとつぜん強い風がふいて、たこが高い木に引っかかってしまいました。高すぎて、2人には手がとどきませんでした。',
      'モモは泣きだしました。タイガはどうしたらいいのかわかりませんでした。そのとき、長い棒を持ったおじいさんが歩いてきました。「手伝ってあげよう」と言って、おじいさんはたこをそっと引きおろしてくれました。',
      'たこには小さなあながあいていましたが、まだあげることができました。「ありがとうございます！」とタイガは言いました。おじいさんはほほえみました。「わたしが子どものころ、たこが同じ木に引っかかって、親切な女の人が助けてくれたんだ。今度はわたしが助ける番だよ」。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'in', 'of', 'to'], answer: 3, why: '目的「〜するために」は to ＋動詞の原形。' },
      { id: 'B', choices: ['by', 'for', 'of', 'with'], answer: 1, why: 'too 〜 for 人 to … で「〜すぎて人には…できない」。' },
      { id: 'C', choices: ['how', 'what', 'where', 'which'], answer: 1, why: 'what to do で「何をすればよいか」。' },
      { id: 'D', choices: ['for', 'of', 'that', 'to'], answer: 3, why: "it's my turn to 〜 で「わたしが〜する番だ」。" },
    ],
    underline: { phrase: 'walked over', choices: ['歩いて近づいてきた', '歩いて通りすぎた', '歩いて帰った', 'たおれた'], answer: 0, why: 'walk over は「（こちらへ）歩いてやってくる」。このあと「手伝ってあげよう」と言っている。' },
    tf: [
      { statement: 'Taiga went to the park with his little sister.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'The kite got caught in a tall tree.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Taiga pulled the kite down by himself.', answer: false, why: 'おじいさんが棒で引きおろしてくれた。' },
      { statement: 'The kite had a big hole and could not fly anymore.', answer: false, why: '小さなあなで、まだあげられた。' },
      { statement: 'A kind woman once helped the old man.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'bones',
    title: 'Why Do We Need Bones?',
    level: '中2',
    paragraphs: [
      'Your body has about 206 bones. They hold your body up and protect important parts ( A ) your brain and heart. Without bones, you could not stand or walk.',
      'Babies are born with about 300 bones. As they grow, some of these bones join together, so adults have ( B ) bones than babies.',
      'Bones are alive and keep changing. Old parts are broken down, and new parts are made every day. They need calcium to stay strong. Milk, fish, and green vegetables are good ( C ) your bones.',
      'Exercise also makes bones stronger. When you run or jump, your bones get a little stronger ( D ) a result. So eating well and moving your body are both important.',
    ],
    ja: [
      'あなたの体にはおよそ206個の骨があります。骨は体をささえ、脳や心臓のような大切な部分を守っています。骨がなければ、立つことも歩くこともできません。',
      '赤ちゃんはおよそ300個の骨をもって生まれてきます。成長するにつれて、骨のいくつかがくっついていくので、大人の骨は赤ちゃんより少なくなるのです。',
      '骨は生きていて、ずっと変わり続けています。毎日、古い部分がこわされ、新しい部分が作られているのです。じょうぶでいるためにはカルシウムが必要です。牛乳や魚、緑の野菜は骨によいのです。',
      '運動も骨を強くします。走ったりジャンプしたりすると、その結果として骨は少しずつ強くなります。だから、よく食べることと体を動かすことはどちらも大切なのです。',
    ],
    blanks: [
      { id: 'A', choices: ['as well', 'like that', 'so as', 'such as'], answer: 3, why: 'such as 〜 で「〜のような」（例をあげる）。' },
      { id: 'B', choices: ['few', 'fewer', 'less', 'little'], answer: 1, why: '数えられる名詞（bones）の「より少ない」は fewer。less は数えられない名詞に使う。' },
      { id: 'C', choices: ['at', 'for', 'of', 'with'], answer: 1, why: 'be good for 〜 で「〜によい」。be good at 〜 は「〜が得意」。' },
      { id: 'D', choices: ['as', 'by', 'for', 'with'], answer: 0, why: 'as a result で「その結果」。' },
    ],
    gist: [{ para: 1, choices: ['赤ちゃんと大人の骨の数のちがい', 'カルシウムの多い食べ物', '骨を強くする運動', '骨が体を守るしくみ'], answer: 0, why: '第2段落は、赤ちゃんは約300個の骨をもち、成長するとくっついて大人は少なくなる、という話。' }],
    tf: [
      { statement: 'Adults have about 206 bones.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Babies have fewer bones than adults.', answer: false, why: '赤ちゃんのほうが多い（約300個）。' },
      { statement: 'Bones need calcium to stay strong.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Milk is bad for your bones.', answer: false, why: '牛乳は骨によい。' },
      { statement: 'Exercise can make bones stronger.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'talk-curry',
    title: 'Making Curry Together (会話文)',
    level: '中2（会話文）',
    paragraphs: [
      'Mom: Akira, can you help me make curry for dinner?',
      'Akira: Sure. What should I do first?',
      'Mom: Please wash the potatoes and carrots. Then cut them ( A ) small pieces.',
      'Akira: OK. How big should the pieces be?',
      'Mom: About the size of your thumb. Be careful not ( B ) cut your fingers.',
      'Akira: I will. Should I cook the onions now?',
      'Mom: Yes. Cook them until they turn brown. That makes the curry ( C ) sweet.',
      'Akira: Wow, it smells good already!',
      'Mom: Now add the meat and water, and wait ( D ) about twenty minutes.',
      'Akira: Can I add some apple, too? My friend says it is a secret ingredient.',
      "Mom: Good idea. Let's try it!",
      "Akira: I can't wait to eat it. Next time, I want to make curry by myself.",
    ],
    ja: [
      'お母さん：アキラ、夕ごはんのカレーを作るのを手伝ってくれる？',
      'アキラ：いいよ。最初に何をすればいい？',
      'お母さん：じゃがいもとにんじんを洗ってね。それから小さく切ってちょうだい。',
      'アキラ：わかった。どのくらいの大きさにすればいい？',
      'お母さん：親指くらいの大きさね。指を切らないように気をつけて。',
      'アキラ：うん。玉ねぎはもういためていい？',
      'お母さん：ええ。茶色になるまでいためてね。そうするとカレーがあまくなるのよ。',
      'アキラ：わあ、もういいにおいがする！',
      'お母さん：じゃあ、お肉と水を入れて、20分くらい待ってね。',
      'アキラ：りんごも入れていい？友だちがかくし味だって言ってたんだ。',
      'お母さん：いい考えね。やってみましょう！',
      'アキラ：食べるのが待ちきれないな。次は自分だけでカレーを作ってみたい。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'by', 'into', 'on'], answer: 2, why: 'cut A into 〜 で「Aを〜に切る」。' },
      { id: 'B', choices: ['for', 'in', 'of', 'to'], answer: 3, why: 'be careful not to 〜 で「〜しないように気をつける」。' },
      { id: 'C', choices: ['taste', 'tastes', 'tasting', 'to taste'], answer: 0, why: 'make ＋人・もの＋動詞の原形 で「〜に…させる」。' },
      { id: 'D', choices: ['at', 'for', 'in', 'since'], answer: 1, why: 'wait for ＋時間 で「〜のあいだ待つ」。' },
    ],
    underline: { phrase: 'a secret ingredient', choices: ['かくし味', 'ひみつのレシピ本', '高いお肉', 'あまいおかし'], answer: 0, why: 'ingredient は「材料」。secret ingredient は「ひみつの材料」＝かくし味。' },
    tf: [
      { statement: 'Akira helps his mother make curry.', answer: true, why: 'お母さんの最初の発言と合う。' },
      { statement: 'Akira cuts the vegetables into big pieces.', answer: false, why: '小さく（親指くらいに）切る。' },
      { statement: 'They cook the onions until they turn brown.', answer: true, why: 'お母さんの発言と合う。' },
      { statement: 'They wait for about two hours.', answer: false, why: '20分くらい待つ。' },
      { statement: 'Akira wants to make curry by himself next time.', answer: true, why: 'アキラの最後の発言と合う。' },
    ],
  },
  {
    id: 'night-sky',
    title: 'The Night Sky',
    level: '中2（物語）',
    paragraphs: [
      'Mei lives in a big city. At night, the city is so bright ( A ) she can see only a few stars in the sky.',
      'Last summer, she visited her grandfather in the mountains. After dinner, he said, "Let\'s go outside. I want to show you something." When Mei looked up, she could not believe her eyes. The sky was full ( B ) stars.',
      '"Why can we see so many stars here?" Mei asked. "Because there are few lights," her grandfather answered. "In the city, the stars are still there, but the bright lights make them hard ( C ) see."',
      'That night, her grandfather taught her the names of some stars. Mei decided to become a scientist ( D ) studies space someday.',
    ],
    ja: [
      'メイは大きな都会に住んでいます。夜、町がとても明るいので、空には星が少ししか見えません。',
      '去年の夏、メイは山にいるおじいちゃんをたずねました。夕ごはんのあと、おじいちゃんは「外に出よう。見せたいものがあるんだ」と言いました。見上げたメイは、自分の目が信じられませんでした。空は星でいっぱいだったのです。',
      '「どうしてここではこんなにたくさん星が見えるの？」とメイはたずねました。「明かりが少ないからだよ」とおじいちゃんは答えました。「都会でも星はちゃんとそこにあるんだ。でも、明るい光のせいで見えにくくなっているんだよ」。',
      'その夜、おじいちゃんはメイにいくつかの星の名前を教えてくれました。メイは、いつか宇宙を研究する科学者になろうと決めました。',
    ],
    blanks: [
      { id: 'A', choices: ['as', 'than', 'that', 'when'], answer: 2, why: 'so 〜 that … で「とても〜なので…」。' },
      { id: 'B', choices: ['by', 'for', 'of', 'with'], answer: 2, why: 'be full of 〜 で「〜でいっぱいだ」。' },
      { id: 'C', choices: ['for', 'of', 'that', 'to'], answer: 3, why: 'hard to 〜 で「〜しにくい」（make them hard to see）。' },
      { id: 'D', choices: ['what', 'which', 'who', 'whose'], answer: 2, why: '人（a scientist）を説明する関係代名詞は who。' },
    ],
    underline: { phrase: 'could not believe her eyes', choices: ['とてもおどろいた', '目が見えなかった', 'ねむくなった', 'こわくなった'], answer: 0, why: 'can\'t believe one\'s eyes は「自分の目が信じられない（ほどおどろく）」。直後に空が星でいっぱいだったとある。' },
    tf: [
      { statement: 'Mei can see many stars in the city.', answer: false, why: '星は少ししか見えない。' },
      { statement: 'Mei visited her grandfather last summer.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'The sky in the mountains was full of stars.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'There are no stars above the city.', answer: false, why: '星はあるが、明るい光で見えにくいだけ。' },
      { statement: 'Mei wants to study space in the future.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'onion-tears',
    title: 'Why Do Onions Make Us Cry?',
    level: '中2（説明文）',
    paragraphs: [
      'Have you ever cried while you were cutting an onion? Many people have. But onions do not make us cry because they are sad. There is a scientific reason ( A ) it.',
      'An onion is made of many small cells. When you cut it, you break these cells, and some chemicals inside them mix together. They make a special gas. This gas goes up into the air and reaches your eyes.',
      'When the gas touches your eyes, they feel a little pain. Your eyes then make tears ( B ) wash the gas away. So crying is a way to protect your eyes.',
      'There are some ways to cry less. For example, you can put the onion in the refrigerator before you cut it. A cold onion makes less gas. Using a sharp knife also helps, because it breaks ( C ) cells. Next time you cook, try one of these ideas.',
    ],
    ja: [
      'たまねぎを切っているときに泣いたことはありますか。多くの人があるでしょう。でも、たまねぎが悲しいから泣くわけではありません。それには科学的な理由があります。',
      'たまねぎはたくさんの小さな細胞でできています。切ると、その細胞がこわれて、中にあるいくつかの物質がまざり合います。それらが特別な気体をつくります。この気体が空気中にのぼって、目にとどくのです。',
      'その気体が目にふれると、目は少しいたみを感じます。すると目は、気体を洗い流すために涙をつくります。つまり、泣くことは目を守る方法なのです。',
      '泣くのを少なくする方法もあります。たとえば、切る前にたまねぎを冷蔵庫に入れておくことができます。冷たいたまねぎは気体を出す量が少なくなります。よく切れる包丁を使うのも役に立ちます。こわす細胞が少なくてすむからです。次に料理をするときは、これらのアイデアの一つをためしてみてください。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'for', 'in', 'on'], answer: 1, why: 'a reason for 〜 で「〜の理由」。' },
      { id: 'B', choices: ['for', 'of', 'that', 'to'], answer: 3, why: '目的「〜するために」は to ＋動詞の原形（to wash）。' },
      { id: 'C', choices: ['fewer', 'less', 'many', 'more'], answer: 0, why: 'よく切れる包丁は、こわす細胞が「より少ない」。cells は数えられる名詞なので fewer。' },
    ],
    underline: { phrase: 'wash the gas away', choices: ['気体を洗い流す', '気体をつくる', '気体を集める', '気体をあたためる'], answer: 0, why: 'wash 〜 away は「〜を洗い流す」。目は涙で気体を流して目を守る。' },
    tf: [
      { statement: 'Onions make us cry because they are sad.', answer: false, why: '第1段落：悲しいからではなく、科学的な理由がある。' },
      { statement: 'Cutting an onion breaks its cells.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Tears help protect our eyes.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'A warm onion makes less gas than a cold one.', answer: false, why: '冷たいたまねぎのほうが気体が少ない。' },
      { statement: 'Using a sharp knife can help us cry less.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'hiccups',
    title: 'What Are Hiccups?',
    level: '中2（説明文）',
    paragraphs: [
      'Almost everyone has had hiccups. They can start suddenly, and they can be ( A ) hard to stop. But what are they?',
      'Under your lungs, there is a large muscle called the diaphragm. It moves down when you breathe in. Sometimes this muscle moves suddenly by itself. Air rushes into your body, and a part of your throat closes very quickly. This makes the "hic" sound.',
      'Hiccups often start when people eat too fast or drink fizzy drinks. A full stomach can push ( B ) the diaphragm and make it move strangely.',
      'Most hiccups stop by themselves after a few minutes. Some people drink a glass of water slowly, and others hold their breath for a short time. Nobody knows ( C ) way works best, but you can try them next time.',
    ],
    ja: [
      'ほとんどだれもが、しゃっくりをしたことがあります。しゃっくりはとつぜん始まり、止めるのがとてもむずかしいことがあります。でも、しゃっくりとは何なのでしょうか。',
      '肺の下には、横隔膜とよばれる大きな筋肉があります。息をすうとき、それは下に動きます。ときどき、この筋肉がひとりでにとつぜん動くことがあります。空気が体の中に急に入り、のどの一部がとてもすばやく閉じます。これが「ヒック」という音を出すのです。',
      'しゃっくりは、早く食べすぎたり、炭酸飲料を飲んだりしたときによく始まります。いっぱいになった胃が横隔膜をおして、おかしな動きをさせることがあるのです。',
      'ほとんどのしゃっくりは、数分たつと自然に止まります。水をゆっくり1ぱい飲む人もいれば、少しのあいだ息を止める人もいます。どの方法が一番きくのかはだれにもわかりませんが、次のときにためしてみてもいいでしょう。',
    ],
    blanks: [
      { id: 'A', choices: ['much', 'very', 'many', 'more'], answer: 1, why: '形容詞 hard を強めるのは very（とても）。' },
      { id: 'B', choices: ['at', 'in', 'on', 'to'], answer: 2, why: 'push on 〜 で「〜をおす（〜に力をかける）」。' },
      { id: 'C', choices: ['what', 'which', 'who', 'whose'], answer: 1, why: 'which way で「どの方法」。いくつかの中から選ぶので which。' },
    ],
    underline: { phrase: 'by themselves', choices: ['自然に（何もしなくても）', 'ほかの人といっしょに', '薬を飲んだあとに', '大きな音で'], answer: 0, why: 'by themselves は「ひとりでに・自然に」。数分たつと止まると書いてある。' },
    tf: [
      { statement: 'The diaphragm is a muscle under the lungs.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'The "hic" sound comes from the stomach.', answer: false, why: 'のどの一部がすばやく閉じて音が出る。' },
      { statement: 'Eating too fast can start hiccups.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Most hiccups last for many hours.', answer: false, why: 'ほとんどは数分で止まる。' },
      { statement: 'Scientists know the best way to stop hiccups.', answer: false, why: 'どの方法が一番きくかはだれにもわからない。' },
    ],
  },
  {
    id: 'goosebumps',
    title: 'Why Do We Get Goosebumps?',
    level: '中2（説明文）',
    paragraphs: [
      'On a cold morning, or when you watch a scary movie, small bumps sometimes appear on your arms. In English, they are ( A ) "goosebumps" because your skin looks like the skin of a goose.',
      'Each hair on your body has a very small muscle at its root. When you feel cold or afraid, these muscles pull, and the hairs stand up. The skin around each hair is pushed up, too. That is how the bumps are made.',
      'For animals with a lot of fur, this is very useful. When their fur stands up, it keeps warm air close to their bodies. It also makes them look bigger, so enemies may be ( B ) to attack them.',
      'Humans do not have much hair, so goosebumps do not help us very much. Scientists think that they are something left from our ancestors, who had more hair. Even today, our bodies still remember this old way ( C ) staying safe and warm.',
    ],
    ja: [
      '寒い朝や、こわい映画を見ているとき、うでに小さなぶつぶつができることがあります。英語では、皮ふががちょうの皮のように見えるので、それは「グースバンプ（がちょうのぶつぶつ）」とよばれます。',
      '体のそれぞれの毛には、根もとにとても小さな筋肉があります。寒さやこわさを感じると、これらの筋肉が引っぱられて、毛が立ちます。それぞれの毛のまわりの皮ふもおし上げられます。こうしてぶつぶつができるのです。',
      'たくさんの毛におおわれた動物にとって、これはとても役に立ちます。毛が立つと、あたたかい空気を体の近くにとどめておけます。また体が大きく見えるので、敵はおそいかかるのをこわがるかもしれません。',
      '人間には毛があまりないので、鳥はだはあまり役に立ちません。科学者たちは、それはもっと毛の多かった祖先から残ったものだと考えています。今でも私たちの体は、安全とあたたかさを守るこの古いやり方をおぼえているのです。',
    ],
    blanks: [
      { id: 'A', choices: ['called', 'calling', 'call', 'to call'], answer: 0, why: '受け身 be called 〜「〜とよばれる」。' },
      { id: 'B', choices: ['afraid', 'happy', 'able', 'glad'], answer: 0, why: 'be afraid to 〜「こわくて〜できない」。大きく見えると敵はこわがる。' },
      { id: 'C', choices: ['of', 'to', 'at', 'by'], answer: 0, why: 'a way of -ing「〜する方法」。' },
    ],
    underline: { phrase: 'something left from our ancestors', choices: ['祖先から残ったもの', '祖先が捨てたもの', '祖先が作った道具', '祖先がこわがったもの'], answer: 0, why: 'left は leave（残す）の過去分詞で「残されたもの」。直前に、毛の多かった祖先とある。' },
    tf: [
      { statement: 'Goosebumps can appear when we feel cold.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'There is a small muscle at the root of each hair.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Standing fur makes animals look smaller.', answer: false, why: '体が大きく見える。' },
      { statement: 'Goosebumps help humans a lot because we have a lot of hair.', answer: false, why: '人間は毛が少ないので、あまり役に立たない。' },
      { statement: 'Our ancestors had more hair than we do.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'zebra-stripes',
    title: 'Why Do Zebras Have Stripes?',
    level: '中2（説明文）',
    paragraphs: [
      'Zebras are famous for their black and white stripes. No two zebras have exactly the same pattern, just ( A ) no two people have the same fingerprints.',
      'For a long time, people wondered why zebras have stripes. Some thought the stripes helped zebras hide in tall grass. Others thought they helped zebras stay cool under the hot sun.',
      'Today, many scientists believe that the stripes protect zebras from biting flies. In one study, researchers put striped coats on horses. Flies flew near the horses, but far fewer of them landed on the striped coats. The stripes seem to make it hard ( B ) flies to land.',
      'There is one more surprising fact. Under their hair, zebras have dark skin. So, are zebras white animals with black stripes, or black animals with white stripes? Scientists say the ( C ) is "black with white stripes."',
    ],
    ja: [
      'シマウマは白と黒のしまもようで有名です。2人の人が同じ指紋をもたないのとちょうど同じように、2頭のシマウマがまったく同じもようをもつことはありません。',
      '長いあいだ、人々はシマウマになぜしまがあるのかふしぎに思ってきました。しまは背の高い草の中にかくれるのに役立つと考える人もいました。暑い日ざしの下で体をすずしく保つのに役立つと考える人もいました。',
      '今では多くの科学者が、しまはシマウマを血をすうハエから守っていると考えています。ある研究で、研究者たちは馬にしまもようのコートを着せました。ハエは馬の近くを飛びましたが、しまもようのコートにとまったハエはずっと少なかったのです。しまはハエがとまるのをむずかしくしているようです。',
      'もう一つおどろくべき事実があります。毛の下のシマウマの皮ふは黒っぽい色をしています。では、シマウマは黒いしまのある白い動物なのでしょうか、それとも白いしまのある黒い動物なのでしょうか。科学者たちは、答えは「白いしまのある黒」だと言っています。',
    ],
    blanks: [
      { id: 'A', choices: ['as', 'like', 'so', 'than'], answer: 0, why: 'just as ＋ 主語 ＋ 動詞「ちょうど〜と同じように」。あとに文が続くので as。' },
      { id: 'B', choices: ['for', 'of', 'to', 'with'], answer: 0, why: 'make it hard for 人 to 〜「人が〜するのをむずかしくする」。' },
      { id: 'C', choices: ['answer', 'question', 'problem', 'color'], answer: 0, why: '直前の問いへの「答え（answer）」。' },
    ],
    underline: { phrase: 'far fewer of them', choices: ['それらのずっと少ない数', 'それらのずっと遠く', 'それらのほとんど全部', 'それらの少し多い数'], answer: 0, why: 'far は比較級を強めて「ずっと」。fewer は few の比較級で「より少ない数」。' },
    tf: [
      { statement: 'Every zebra has a different pattern.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Everyone has always agreed about why zebras have stripes.', answer: false, why: 'いろいろな考えがあった。' },
      { statement: 'In the study, more flies landed on the striped coats.', answer: false, why: 'しまもようのコートにとまったハエはずっと少なかった。' },
      { statement: 'Zebras have dark skin under their hair.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Scientists say zebras are white with black stripes.', answer: false, why: '「白いしまのある黒」と言っている。' },
    ],
  },
  {
    id: 'yawning',
    title: 'Why Do We Yawn?',
    level: '中2（説明文）',
    paragraphs: [
      'Everyone yawns. Babies yawn even before they are born, and many animals, such as dogs and cats, yawn too. But do you know ( A ) we yawn?',
      'For a long time, many people believed that we yawn because our bodies need more air. However, in some studies, giving people more air did not stop them from yawning. So scientists now have other ideas. One idea is that yawning helps cool down the brain when it gets a little warm.',
      'Yawning is also "catching." When you see someone yawn, you often start to yawn, too. Even reading ( B ) yawning can make some people yawn! Interestingly, people yawn more easily when they see their family or close friends yawn than when they see strangers do it.',
      'Scientists are still studying yawning, and there is a lot that we do not know. So the next time you yawn in class, you can say that your brain is just ( C ) to cool down!',
    ],
    ja: [
      'だれでもあくびをします。赤ちゃんは生まれる前からあくびをしますし、犬やねこのような多くの動物もあくびをします。でも、私たちがなぜあくびをするのか知っていますか。',
      '長いあいだ、多くの人々は、体がもっと空気を必要とするからあくびをするのだと信じていました。しかし、いくつかの研究では、人により多くの空気をあたえても、あくびは止まりませんでした。そこで今、科学者たちは別の考えをもっています。その一つは、あくびは脳が少しあたたかくなったときに、脳を冷やすのに役立つという考えです。',
      'あくびは「うつる」ものでもあります。だれかがあくびをするのを見ると、自分もあくびを始めることがよくあります。あくびについて読むだけで、あくびをしてしまう人もいるのです！ おもしろいことに、人は知らない人のあくびを見たときよりも、家族や仲のよい友だちのあくびを見たときのほうが、あくびがうつりやすいのです。',
      '科学者たちは今もあくびの研究を続けていて、わかっていないことがたくさんあります。だから次に授業中にあくびが出たら、脳がちょっと冷えようとしているだけだと言えるかもしれませんね！',
    ],
    blanks: [
      { id: 'A', choices: ['why', 'what', 'which', 'who'], answer: 0, why: '「なぜあくびをするのか」なので why（間接疑問）。' },
      { id: 'B', choices: ['about', 'at', 'on', 'from'], answer: 0, why: 'read about 〜「〜について読む」。' },
      { id: 'C', choices: ['trying', 'tried', 'try', 'tries'], answer: 0, why: 'is trying で現在進行形「〜しようとしているところ」。' },
    ],
    underline: { phrase: 'catching', choices: ['人から人へうつる', 'つかまえやすい', 'すぐ止まる', 'とても大きい'], answer: 0, why: 'このあと、だれかのあくびを見ると自分もあくびをすると説明されている。' },
    tf: [
      { statement: 'Babies can yawn before they are born.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Giving people more air always stops their yawning.', answer: false, why: '空気をあたえても止まらなかった研究がある。' },
      { statement: 'One idea is that yawning helps cool down the brain.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'People catch yawns more easily from strangers than from family.', answer: false, why: '家族や友だちのほうがうつりやすい。' },
      { statement: 'Scientists know everything about yawning now.', answer: false, why: 'わかっていないことがたくさんある。' },
    ],
  },
  {
    id: 'thunder-lightning',
    title: 'Lightning and Thunder',
    level: '中2（説明文）',
    paragraphs: [
      'During a storm, you first see a flash of lightning, and a few seconds later you hear thunder. Have you ever wondered ( A ) the sound always comes after the light?',
      'Lightning is a huge spark of electricity. It makes the air around it very hot, much hotter than the surface of the sun. The hot air spreads out very quickly, and this makes a loud sound. That sound is thunder.',
      'Light travels much faster ( B ) sound. So we see the flash almost at once, but the sound needs more time to reach us. You can use this to guess how far away the storm is. Count the seconds between the flash and the thunder, and divide the number by three. The answer is about the distance in kilometers.',
      'If you hear thunder, the storm is close enough to be dangerous. Go inside a building or a car, and stay away from tall trees. It is better to be safe ( C ) sorry!',
    ],
    ja: [
      'あらしのとき、まず稲光が見えて、数秒後に雷の音が聞こえます。なぜいつも光のあとに音が来るのか、ふしぎに思ったことはありますか。',
      '稲妻は電気の巨大な火花です。それはまわりの空気をとても熱くします。太陽の表面よりもずっと熱くなるのです。熱くなった空気はとても速く広がり、それが大きな音を出します。その音が雷鳴です。',
      '光は音よりずっと速く進みます。だから光はほとんどすぐに見えますが、音は私たちのところに届くまでにもっと時間が必要です。これを使って、あらしがどのくらい遠くにあるかを推測できます。光ってから雷が鳴るまでの秒数を数えて、その数を3でわってください。その答えが、だいたいのきょり（キロメートル）です。',
      '雷の音が聞こえたら、あらしは危険なほど近くにいます。建物や車の中に入って、高い木からはなれてください。あとで後悔するより、安全でいるほうがいいのです！',
    ],
    blanks: [
      { id: 'A', choices: ['why', 'what', 'who', 'which'], answer: 0, why: '「なぜ音がいつも光のあとに来るのか」なので why。' },
      { id: 'B', choices: ['than', 'as', 'then', 'for'], answer: 0, why: '比較級 faster のあとは than。' },
      { id: 'C', choices: ['than', 'as', 'or', 'so'], answer: 0, why: 'better safe than sorry「後悔するより安全なほうがいい」。better 〜 than … の形。' },
    ],
    underline: { phrase: 'divide the number by three', choices: ['その数を3でわる', 'その数に3をかける', 'その数に3をたす', 'その数から3をひく'], answer: 0, why: 'divide A by B は「A を B でわる」。' },
    tf: [
      { statement: 'We usually hear thunder before we see lightning.', answer: false, why: '光が先に見え、あとで音が聞こえる。' },
      { statement: 'Lightning makes the air very hot.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Sound travels faster than light.', answer: false, why: '光のほうがずっと速い。' },
      { statement: 'If the thunder comes 6 seconds after the flash, the storm is about 2 kilometers away.', answer: true, why: '6 ÷ 3 ＝ 2 キロメートル。' },
      { statement: 'It is safe to stand under a tall tree during a storm.', answer: false, why: '高い木からはなれるように書いてある。' },
    ],
  },
  {
    id: 'ears-pop',
    title: 'Why Do Our Ears Pop on Planes?',
    level: '中2（説明文）',
    paragraphs: [
      'When an airplane goes up or comes down, your ears may feel strange. Sometimes they hurt a little, and then you hear a small "pop." Why ( A ) this happen?',
      'The air around us pushes on everything. This push is called air pressure. High in the sky, the air pressure is lower than on the ground. When a plane goes up or down quickly, the air pressure inside the plane changes, too.',
      'Inside your ear, there is a thin skin called the eardrum. There is also some air behind it. When the air pressure outside changes but the air behind the eardrum does not, the eardrum is pushed in or out. That is ( B ) your ears feel strange.',
      'A small tube connects your ear to the back of your throat. When you swallow or yawn, this tube opens, and air moves in or out. Then the pressure on both sides becomes the same, and you hear the "pop." So on your next flight, try chewing gum or drinking some water. It will help your ears feel ( C ).',
    ],
    ja: [
      '飛行機が上がったり下がったりするとき、耳がへんな感じになることがあります。少しいたくなって、そのあと小さく「ポン」と聞こえることもあります。なぜこうなるのでしょうか。',
      '私たちのまわりの空気は、あらゆるものをおしています。このおす力は気圧とよばれます。空の高いところでは、気圧は地上より低くなっています。飛行機がすばやく上がったり下がったりすると、機内の気圧も変わります。',
      '耳の中には、鼓膜とよばれるうすい膜があります。そのおくにも空気があります。外の気圧が変わったのに鼓膜のおくの空気が変わらないと、鼓膜は内側か外側におされます。だから耳がへんな感じになるのです。',
      '耳とのどのおくは、小さな管でつながっています。つばを飲みこんだりあくびをしたりすると、この管が開いて、空気が出たり入ったりします。すると両側の気圧が同じになり、「ポン」と聞こえるのです。だから次に飛行機に乗るときは、ガムをかんだり水を飲んだりしてみてください。耳が楽になるのに役立ちますよ。',
    ],
    blanks: [
      { id: 'A', choices: ['does', 'is', 'do', 'are'], answer: 0, why: '主語 this（3人称単数）の一般動詞の疑問文なので does。' },
      { id: 'B', choices: ['why', 'what', 'which', 'who'], answer: 0, why: 'That is why 〜「そういうわけで〜」。' },
      { id: 'C', choices: ['better', 'well', 'good', 'best'], answer: 0, why: 'feel better「（前より）楽になる」。比較級 better。' },
    ],
    underline: { phrase: 'the pressure on both sides becomes the same', choices: ['鼓膜の内と外の気圧が同じになる', '両方の耳がいたくなる', '飛行機の左右がゆれる', 'のどが空気でいっぱいになる'], answer: 0, why: '鼓膜の外側（機内）とおく（耳の中）の気圧がそろうことを言っている。' },
    tf: [
      { statement: 'Air pressure is higher high in the sky than on the ground.', answer: false, why: '空の高いところでは気圧は低い。' },
      { statement: 'The eardrum is a thin skin inside the ear.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'A small tube connects the ear to the back of the throat.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Swallowing can help open the tube.', answer: true, why: 'つばを飲みこむと管が開く。' },
      { statement: 'Chewing gum makes your ears hurt more.', answer: false, why: 'ガムは耳を楽にするのに役立つ。' },
    ],
  },
  {
    id: 'chameleon',
    title: 'How Do Chameleons Change Color?',
    level: '中2（説明文）',
    paragraphs: [
      'Chameleons are famous for changing color. Many people think they do this to hide from their enemies. That is partly true, but it is not the ( A ) reason.',
      'Under a chameleon\'s skin, there are special cells with very tiny crystals inside. When the chameleon relaxes or gets excited, the space between these crystals changes. This changes the way light is reflected, so we see a different color.',
      'Scientists have found that chameleons often change color to send messages to other chameleons. For example, a male may turn bright colors when he wants to look strong. They also change color when they feel hot or cold. A darker color takes in ( B ) heat from the sun.',
      'So, a chameleon\'s color shows how it is feeling and what it wants to say. It is like a body ( C ) that uses colors instead of words!',
    ],
    ja: [
      'カメレオンは色を変えることで有名です。多くの人は、敵からかくれるために色を変えると思っています。それは一部は正しいのですが、ただ一つの理由ではありません。',
      'カメレオンの皮ふの下には、中にとても小さな結晶をもつ特別な細胞があります。カメレオンがリラックスしたり興奮したりすると、これらの結晶のあいだのすき間が変わります。それによって光のはね返り方が変わり、ちがう色に見えるのです。',
      '科学者たちは、カメレオンがほかのカメレオンにメッセージを送るために色を変えることが多いとわかってきました。たとえば、オスは強く見せたいとき、あざやかな色になることがあります。また、暑いときや寒いときにも色を変えます。こい色は日光の熱をより多く取りこむのです。',
      'つまり、カメレオンの色は、どう感じているか、何を伝えたいかを表しているのです。ことばのかわりに色を使う、ボディーランゲージのようなものですね！',
    ],
    blanks: [
      { id: 'A', choices: ['only', 'last', 'same', 'other'], answer: 0, why: 'the only reason「ただ一つの理由」。ほかにも理由があることが続く。' },
      { id: 'B', choices: ['more', 'many', 'much', 'most'], answer: 0, why: '「より多くの熱」なので比較級 more。' },
      { id: 'C', choices: ['language', 'part', 'size', 'heat'], answer: 0, why: 'body language「身ぶり・ボディーランゲージ」。ことばのかわりに色で気持ちを伝える。' },
    ],
    underline: { phrase: 'send messages to other chameleons', choices: ['ほかのカメレオンに気持ちや合図を伝える', 'ほかのカメレオンに手紙を書く', 'ほかのカメレオンから逃げる', 'ほかのカメレオンに食べ物をあげる'], answer: 0, why: 'このあと、強く見せたいときに色を変える例が出てくる。' },
    tf: [
      { statement: 'Chameleons change color only to hide from enemies.', answer: false, why: 'それだけが理由ではない。' },
      { statement: 'There are cells with tiny crystals under a chameleon\'s skin.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'A male chameleon may turn bright colors to look strong.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'A darker color takes in less heat.', answer: false, why: 'こい色はより多くの熱を取りこむ。' },
      { statement: 'A chameleon\'s color can show how it feels.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'snowflakes',
    title: 'Letters from the Sky',
    level: '中2（説明文）',
    paragraphs: [
      'Have you ever looked at a snowflake closely? If you have, you may know that most snowflakes have six sides. But why are they shaped ( A ) that?',
      'Snowflakes begin high in the clouds. When the air is very cold, water vapor freezes on a tiny piece of dust and becomes a small ice crystal. Because of the way water freezes, the crystal grows into a shape with six sides.',
      'As the crystal falls, it passes through air of different temperatures. Each change makes it grow in a slightly different way. That is ( B ) people say that no two snowflakes are exactly the same.',
      'A Japanese scientist named Ukichiro Nakaya studied snow crystals for many years. In 1936, he became the first person to make snow crystals in a laboratory. He said that snow crystals are "letters sent from the sky," because their shapes tell us ( C ) the air was like high above us.',
    ],
    ja: [
      '雪の結晶をじっくり見たことはありますか。見たことがあれば、ほとんどの雪の結晶は六角形をしていることを知っているかもしれません。でも、なぜそのような形をしているのでしょうか。',
      '雪の結晶は雲の高いところで生まれます。空気がとても冷たいと、水蒸気が小さなちりのつぶの上でこおり、小さな氷の結晶になります。水がこおるときのしくみのために、結晶は六角形に育っていくのです。',
      '結晶は落ちていくあいだに、温度のちがう空気の中を通ります。変化のたびに、少しずつちがうふうに育ちます。だから、まったく同じ雪の結晶は2つとないと言われるのです。',
      '中谷宇吉郎という日本の科学者は、何年も雪の結晶を研究しました。1936年、彼は実験室で雪の結晶を作った最初の人になりました。彼は雪の結晶を「天から送られた手紙」だと言いました。その形が、私たちのはるか上空の空気がどんなようすだったかを教えてくれるからです。',
    ],
    blanks: [
      { id: 'A', choices: ['like', 'as', 'for', 'with'], answer: 0, why: 'shaped like that「そのような形の」。like は「〜のような」。' },
      { id: 'B', choices: ['why', 'what', 'how', 'when'], answer: 0, why: 'That is why 〜「そういうわけで〜」。' },
      { id: 'C', choices: ['what', 'how', 'which', 'who'], answer: 0, why: 'what 〜 was like「〜がどんなようすだったか」。like の目的語になる what。' },
    ],
    underline: { phrase: 'letters sent from the sky', choices: ['空から届いた手紙', '空に送る手紙', '空の色の文字', '空を飛ぶ鳥'], answer: 0, why: 'sent は send の過去分詞で「送られた」。雪の形が上空のようすを伝えることを「手紙」にたとえている。' },
    tf: [
      { statement: 'Most snowflakes have six sides.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Snowflakes start on the ground.', answer: false, why: '雲の高いところで生まれる。' },
      { statement: 'Changes in temperature make each snowflake grow differently.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Nakaya made snow crystals in a laboratory in 1936.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Nakaya thought snow crystals tell us nothing about the sky.', answer: false, why: '上空の空気のようすを教えてくれると言った。' },
    ],
  },
  {
    id: 'sloths',
    title: 'The Slowest Animal in the Forest',
    level: '中2（説明文）',
    paragraphs: [
      'Sloths live in the rainforests of Central and South America. They are famous for being very slow. A sloth moves so slowly ( A ) green plants can grow on its fur!',
      'Why are sloths so slow? They mainly eat leaves, and leaves do not give them much energy. So sloths save energy by moving very little. They also sleep for many hours a day, hanging upside down from tree branches.',
      'Being slow can help sloths stay safe. Many animals that hunt notice things that move quickly. Because sloths hardly move, and the green plants on their fur make them look like part of the tree, it is difficult for enemies ( B ) find them.',
      'Surprisingly, sloths are good swimmers. In the water, they can move about three times faster than on the ground. So the next time someone calls you "slow," remember that being slow is ( C ) always a bad thing!',
    ],
    ja: [
      'ナマケモノは中央アメリカと南アメリカの熱帯雨林に住んでいます。とてもゆっくりなことで有名です。ナマケモノはとてもゆっくり動くので、毛に緑の植物が育つほどです！',
      'なぜナマケモノはそんなにゆっくりなのでしょうか。ナマケモノは主に葉を食べますが、葉からはあまりエネルギーが得られません。そこでナマケモノは、ほとんど動かないことでエネルギーを節約しているのです。また、木の枝にさかさまにぶら下がって、1日に何時間もねむります。',
      'ゆっくりなことは、ナマケモノが安全でいるのに役立つことがあります。えものをねらう動物の多くは、すばやく動くものに気づきます。ナマケモノはほとんど動かず、毛の緑の植物のせいで木の一部のように見えるので、敵がナマケモノを見つけるのはむずかしいのです。',
      'おどろいたことに、ナマケモノは泳ぎがじょうずです。水の中では、地上より3倍ほど速く動けます。だから、次にだれかに「ゆっくりだね」と言われたら、ゆっくりなのはいつも悪いことではないと思い出してください！',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'as', 'than', 'when'], answer: 0, why: 'so 〜 that …「とても〜なので…」。' },
      { id: 'B', choices: ['to', 'for', 'of', 'at'], answer: 0, why: 'it is difficult for 人 to 〜「人が〜するのはむずかしい」。' },
      { id: 'C', choices: ['not', 'no', 'never', "don't"], answer: 0, why: 'not always「いつも〜とはかぎらない」（部分否定）。' },
    ],
    underline: { phrase: 'hanging upside down', choices: ['さかさまにぶら下がって', '木にのぼって', '地面にねころんで', '水にうかんで'], answer: 0, why: 'hang は「ぶら下がる」、upside down は「さかさまに」。' },
    tf: [
      { statement: 'Sloths live in the rainforests of Africa.', answer: false, why: '中央アメリカと南アメリカの熱帯雨林に住む。' },
      { statement: 'Leaves do not give sloths much energy.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Green plants on their fur help sloths hide.', answer: true, why: '木の一部のように見える。' },
      { statement: 'Sloths cannot swim.', answer: false, why: '泳ぎがじょうず。' },
      { statement: 'Sloths move faster in water than on the ground.', answer: true, why: '水の中では約3倍速い。' },
    ],
  },
  {
    id: 'pill-bugs',
    title: 'The Little Ball Under the Stone',
    level: '中2（説明文）',
    paragraphs: [
      'If you lift a stone in a garden, you may find small gray animals called pill bugs. When you touch one, it rolls up ( A ) a tiny ball. This helps protect its soft body from enemies.',
      'Many people think pill bugs are insects, but they are not. Insects have six legs, while pill bugs have fourteen. In fact, pill bugs are more closely related to shrimp and crabs than to insects.',
      'Like their relatives in the sea, pill bugs need water to breathe. That is ( B ) they live in dark, wet places, such as under stones and fallen leaves. If the air becomes too dry, they cannot live long.',
      'Pill bugs eat dead leaves and other old plants. By doing this, they help turn them into good soil. So the next time you see a pill bug, remember that this little animal is quietly ( C ) the garden healthy.',
    ],
    ja: [
      '庭の石を持ち上げると、ダンゴムシとよばれる小さな灰色の生き物が見つかるかもしれません。さわると、小さなボールのように丸まります。こうして、やわらかい体を敵から守っているのです。',
      '多くの人はダンゴムシをこん虫だと思っていますが、そうではありません。こん虫にはあしが6本ありますが、ダンゴムシには14本あります。実はダンゴムシは、こん虫よりもエビやカニに近い仲間なのです。',
      '海にいる仲間と同じように、ダンゴムシは呼吸するのに水分が必要です。だから、石や落ち葉の下のような暗くてしめった場所に住んでいるのです。空気がかわきすぎると、長くは生きられません。',
      'ダンゴムシはかれ葉やほかの古い植物を食べます。そうすることで、それらをよい土に変える手助けをしています。だから次にダンゴムシを見かけたら、この小さな生き物が静かに庭を元気に保っているのだと思い出してください。',
    ],
    blanks: [
      { id: 'A', choices: ['into', 'on', 'at', 'from'], answer: 0, why: 'roll up into 〜「丸まって〜になる」。into は変化の結果を表す。' },
      { id: 'B', choices: ['why', 'what', 'how', 'when'], answer: 0, why: 'That is why 〜「そういうわけで〜」。' },
      { id: 'C', choices: ['keeping', 'keeps', 'kept', 'to keep'], answer: 0, why: 'is keeping で現在進行形。keep 〜 healthy「〜を元気に保つ」。' },
    ],
    underline: { phrase: 'more closely related to shrimp and crabs', choices: ['エビやカニにより近い仲間', 'エビやカニを食べる', 'エビやカニより大きい', 'エビやカニといっしょに住む'], answer: 0, why: 'be related to 〜「〜と関係がある・〜の仲間だ」。more closely で「より近い」。' },
    tf: [
      { statement: 'A pill bug rolls up into a ball when you touch it.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Pill bugs are insects.', answer: false, why: 'こん虫ではない。' },
      { statement: 'Pill bugs have fourteen legs.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Pill bugs like dry and sunny places.', answer: false, why: '暗くてしめった場所に住む。' },
      { statement: 'Pill bugs help make good soil.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'dog-tails',
    title: 'What Is a Dog Saying with Its Tail?',
    level: '中2（説明文）',
    paragraphs: [
      'Many people think that a dog wags its tail only when it is happy. This is sometimes true, but not always. Dogs cannot talk like us, so they use their tails ( A ) send different messages to people and other dogs.',
      'To understand a dog, look at how high its tail is. When a dog feels relaxed, its tail is usually at a natural height. When it holds its tail high, it may be excited or ready to defend itself. A tail held low or between the back legs often means that the dog is afraid or nervous.',
      'The speed of the wag is also important. A slow wag may show that the dog is not sure about something. A fast, wide wag that moves the whole body usually means the dog is glad to see you. However, a quick, stiff wag with the tail held high can be a warning, ( B ) be careful.',
      'Of course, a tail is only one part of the message. Dogs also use their ears, eyes, and the way they stand. If you watch all of these signs together, you will be able to understand a dog much ( C ) than before.',
    ],
    ja: [
      '多くの人は、犬がしっぽをふるのはうれしいときだけだと思っています。それは正しいこともありますが、いつもではありません。犬は私たちのように話すことができないので、しっぽを使って人やほかの犬にさまざまなメッセージを送っているのです。',
      '犬を理解するには、しっぽの高さを見てみましょう。犬がリラックスしているとき、しっぽはたいてい自然な高さにあります。しっぽを高く上げているときは、興奮しているか、身を守ろうとしているのかもしれません。しっぽが低かったり後ろ足のあいだに入っていたりするときは、たいてい犬がこわがっているか、不安になっていることを意味します。',
      'しっぽをふる速さも大切です。ゆっくりふるのは、犬が何かについて自信がないことを示しているのかもしれません。体全体がゆれるほど速く大きくふるのは、たいていあなたに会えてうれしいという意味です。しかし、しっぽを高く上げたまま、すばやくかたくふるのは警告のことがあるので、気をつけましょう。',
      'もちろん、しっぽはメッセージの一部にすぎません。犬は耳や目、立ち方も使います。これらのサインをすべていっしょに見れば、前よりもずっとよく犬のことがわかるようになるでしょう。',
    ],
    blanks: [
      { id: 'A', choices: ['to', 'for', 'at', 'by'], answer: 0, why: '不定詞の副詞的用法「〜するために」。use 〜 to send「送るために〜を使う」。' },
      { id: 'B', choices: ['so', 'but', 'or', 'because'], answer: 0, why: '「警告のことがある、だから気をつけて」と結果を表すので so。' },
      { id: 'C', choices: ['better', 'well', 'best', 'more good'], answer: 0, why: 'than があるので比較級。well の比較級は better。much は比較級を強める。' },
    ],
    underline: { phrase: 'ready to defend itself', choices: ['身を守る準備ができている', '遊ぶ準備ができている', '眠る準備ができている', '食べる準備ができている'], answer: 0, why: 'be ready to do「〜する準備ができている」、defend itself「自分の身を守る」。' },
    tf: [
      { statement: 'Dogs wag their tails only when they are happy.', answer: false, why: '第1段落 This is sometimes true, but not always。' },
      { statement: 'A tail between the back legs often shows fear.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'A fast, wide wag usually means the dog is glad to see you.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Dogs use only their tails to send messages.', answer: false, why: '第4段落 Dogs also use their ears, eyes, and the way they stand。' },
      { statement: 'A slow wag may mean the dog is not sure about something.', answer: true, why: '第3段落の内容と合う。' },
    ],
  },
  {
    id: 'blue-sky',
    title: 'Why Is the Sky Blue?',
    level: '中2（説明文）',
    paragraphs: [
      'On a sunny day, the sky looks bright blue. But at sunset, the same sky can turn orange and red. Why does the sky change its color like this? The answer has to ( A ) with sunlight and the air around the Earth.',
      'Sunlight looks white, but it is really made of many colors, such as red, yellow, green, and blue. When sunlight comes into the air, it hits very small pieces of gas. These tiny pieces send blue light in every direction much more than red light. So when we look up, blue light comes to our eyes from all over the sky.',
      'In the evening, the sun is low. Its light has to travel through much more air ( B ) it reaches us. On the way, most of the blue light is sent away in other directions. Only red and orange light can get through, so the sky near the sun looks red.',
      'If there were no air, the sky would look black even during the day. In fact, astronauts on the Moon see a black sky because the Moon has almost no air. The next time you see a blue sky or a red sunset, remember that the air is ( C ) the colors for you.',
    ],
    ja: [
      '晴れた日、空は明るい青色に見えます。でも夕方には、同じ空がオレンジ色や赤色に変わることがあります。空はなぜこのように色を変えるのでしょうか。その答えは、日光と地球をとりまく空気に関係があります。',
      '日光は白く見えますが、実は赤、黄、緑、青などたくさんの色からできています。日光が空気の中に入ると、気体のとても小さなつぶに当たります。この小さなつぶは、赤い光よりも青い光をずっと多く、あらゆる方向に送り出します。だから私たちが見上げると、空全体から青い光が目に届くのです。',
      '夕方には太陽が低くなります。その光は、私たちに届くまでにずっと多くの空気の中を通らなければなりません。そのとちゅうで、青い光のほとんどはほかの方向へ送り出されてしまいます。赤やオレンジの光だけが通りぬけられるので、太陽の近くの空は赤く見えるのです。',
      'もし空気がなければ、昼間でも空は黒く見えるでしょう。実際、月にいる宇宙飛行士には黒い空が見えます。月にはほとんど空気がないからです。今度青い空や赤い夕焼けを見たら、空気があなたのために色を作ってくれているのだと思い出してください。',
    ],
    blanks: [
      { id: 'A', choices: ['do', 'make', 'take', 'get'], answer: 0, why: 'have to do with 〜「〜と関係がある」。' },
      { id: 'B', choices: ['before', 'after', 'because', 'while'], answer: 0, why: '「私たちに届く前に」なので before。' },
      { id: 'C', choices: ['making', 'made', 'makes', 'to make'], answer: 0, why: 'is making で現在進行形「作ってくれている」。' },
    ],
    underline: { phrase: 'Only red and orange light can get through', choices: ['赤とオレンジの光だけが通りぬけられる', '赤とオレンジの光だけが消えてしまう', '赤とオレンジの光は通りぬけられない', '赤とオレンジの光だけが空にとどまる'], answer: 0, why: 'get through「通りぬける」。Only 〜 can …「〜だけが…できる」。' },
    tf: [
      { statement: 'Sunlight is made of only one color.', answer: false, why: '第2段落 it is really made of many colors。' },
      { statement: 'Small pieces of gas send blue light in every direction more than red light.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'In the evening, sunlight travels through less air.', answer: false, why: '第3段落 much more air。' },
      { statement: 'The sky on the Moon looks black because there is almost no air.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'Most of the blue light reaches us at sunset.', answer: false, why: '第3段落 most of the blue light is sent away。' },
    ],
  },
  {
    id: 'fish-breathe',
    title: 'How Do Fish Breathe Underwater?',
    level: '中2（説明文）',
    paragraphs: [
      'People and other land animals need air to breathe. We cannot stay under water for a long time. But fish live in water all their lives. How ( A ) they get the oxygen they need?',
      'Water has a little oxygen in it. Fish take in water through their mouths, and the water goes over their gills on both sides of their heads. The gills have many thin parts with a lot of blood in them. When the water passes over these parts, oxygen goes from the water into the blood. Then the water goes out of the body through openings behind the head.',
      'Some fish, such as certain kinds of sharks, have to keep swimming all the time. When they swim forward, water goes into their mouths and over their gills. If they stopped swimming, they could not get ( B ) oxygen.',
      'Dolphins and whales also live in the sea, but they are not fish. They do not have gills, so they must come up to the surface to breathe air. Fish and dolphins look similar, but their bodies work in very ( C ) ways.',
    ],
    ja: [
      '人やほかの陸上の動物は、呼吸するのに空気が必要です。私たちは長いあいだ水中にいることはできません。でも魚は一生を水の中ですごします。魚はどうやって必要な酸素を手に入れているのでしょうか。',
      '水には少しだけ酸素がふくまれています。魚は口から水をとり入れ、その水は頭の両側にあるえらの上を流れていきます。えらには、血液がたくさん流れているうすい部分がたくさんあります。水がこの部分の上を通るとき、酸素が水から血液の中へ移ります。そして水は、頭のうしろにある開いた部分から体の外へ出ていきます。',
      'ある種のサメのように、いつも泳ぎつづけなければならない魚もいます。前へ泳ぐと、水が口に入ってえらの上を流れます。もし泳ぐのをやめたら、十分な酸素を得られなくなってしまうのです。',
      'イルカやクジラも海に住んでいますが、魚ではありません。えらがないので、空気を吸うために水面に上がってこなければなりません。魚とイルカは見た目は似ていますが、体のしくみはまったくちがうのです。',
    ],
    blanks: [
      { id: 'A', choices: ['do', 'does', 'are', 'is'], answer: 0, why: '一般動詞 get の疑問文。主語 they は複数なので do。' },
      { id: 'B', choices: ['enough', 'many', 'a few', 'few'], answer: 0, why: 'oxygen は数えられない名詞。enough oxygen「十分な酸素」。many・a few・few は数えられる名詞に使う。' },
      { id: 'C', choices: ['different', 'same', 'similar', 'differently'], answer: 0, why: '「見た目は似ているが、しくみはちがう」という対比。ways を修飾する形容詞 different。' },
    ],
    underline: { phrase: 'they must come up to the surface to breathe air', choices: ['空気を吸うために水面に上がってこなければならない', '水面で泳いではいけない', '空気を吸うと水中にもぐる', '水面の近くでえらを使う'], answer: 0, why: 'must「～しなければならない」、come up to the surface「水面に上がる」、to breathe「吸うために」。' },
    tf: [
      { statement: 'Water has a little oxygen in it.', answer: true, why: '第2段落の最初の文と合う。' },
      { statement: 'Fish have gills on the top of their heads.', answer: false, why: 'えらは頭の両側（on both sides of their heads）。' },
      { statement: 'Some sharks must keep swimming to get oxygen.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Dolphins breathe with gills.', answer: false, why: '第4段落 They do not have gills。' },
      { statement: 'Dolphins and whales are fish.', answer: false, why: '第4段落 they are not fish。' },
    ],
  },
  {
    id: 'cat-purr',
    title: 'Why Do Cats Purr?',
    level: '中2（説明文）',
    paragraphs: [
      'If you pet a cat, you may hear a soft, low sound like a small engine. This sound is called purring. Many people think that cats purr only when they are happy. That is often true, but cats also purr at other times.',
      'How do cats make this sound? Muscles in the throat move very quickly, ( A ) the air shakes when the cat breathes in and out. Because of this, cats can purr for a long time without stopping, even while they are breathing.',
      'Kittens begin to purr when they are only a few days old. They cannot see or hear well yet, so purring ( B ) them tell their mother that they are safe and drinking milk. Later, adult cats sometimes purr when they are sick, hurt, or nervous. Scientists think that purring may help them calm down.',
      'Some scientists also believe that the low sound of purring may help a cat\'s body heal, but this idea has not been proved yet. There is still a lot we do not know ( C ) this familiar sound. The next time your cat purrs, try to guess what it is telling you.',
    ],
    ja: [
      'ネコをなでると、小さなエンジンのような、やわらかく低い音が聞こえるかもしれません。この音はゴロゴロとよばれます。多くの人は、ネコはうれしいときだけゴロゴロ鳴らすと思っています。それはたいてい正しいのですが、ネコはほかのときにもゴロゴロ鳴らします。',
      'ネコはどうやってこの音を出しているのでしょうか。のどの筋肉がとても速く動くので、ネコが息を吸ったりはいたりするときに空気がふるえるのです。このため、ネコは息をしながらでも、止まらずに長いあいだゴロゴロ鳴らすことができます。',
      '子ネコは生まれてほんの数日でゴロゴロ鳴らしはじめます。まだよく見たり聞いたりできないので、ゴロゴロ鳴らすことで、自分が安全でミルクを飲んでいることを母ネコに伝えるのに役立ちます。のちに、おとなのネコは病気のときやけがをしたとき、不安なときにもゴロゴロ鳴らすことがあります。科学者たちは、ゴロゴロ鳴らすことで気持ちを落ち着けているのかもしれないと考えています。',
      'ゴロゴロという低い音がネコの体を治すのに役立つのかもしれないと考える科学者もいますが、この考えはまだ証明されていません。このよく知られた音について、私たちが知らないことはまだたくさんあります。今度あなたのネコがゴロゴロ鳴らしたら、何を伝えようとしているのか想像してみてください。',
    ],
    blanks: [
      { id: 'A', choices: ['and', 'but', 'or', 'if'], answer: 0, why: '「筋肉が速く動き、そして空気がふるえる」とつながるので and。' },
      { id: 'B', choices: ['helps', 'help', 'helping', 'to help'], answer: 0, why: '主語 purring（動名詞）は単数あつかいなので helps。help 人 do「人が～するのを助ける」。' },
      { id: 'C', choices: ['about', 'with', 'for', 'at'], answer: 0, why: 'know about ～「～について知っている」。' },
    ],
    underline: { phrase: 'this idea has not been proved yet', choices: ['この考えはまだ証明されていない', 'この考えはもう証明された', 'この考えはまちがいだとわかった', 'この考えはだれも知らない'], answer: 0, why: 'has not been proved yet は現在完了の受け身の否定「まだ証明されていない」。' },
    tf: [
      { statement: 'Cats purr only when they are happy.', answer: false, why: '第1段落 cats also purr at other times。' },
      { statement: 'Cats can purr while they are breathing.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Kittens start to purr when they are a few days old.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Scientists have proved that purring heals a cat\'s body.', answer: false, why: '第4段落 this idea has not been proved yet。' },
      { statement: 'Adult cats sometimes purr when they are nervous.', answer: true, why: '第3段落の内容と合う。' },
    ],
  },
  {
    id: 'bread-rise',
    title: 'Why Does Bread Rise?',
    level: '中2（説明文）',
    paragraphs: [
      'Have you ever made bread at home? At first, the dough is small and heavy. But after an hour or two, it becomes much ( A ). Why does this happen? The secret is a tiny living thing called yeast.',
      'Yeast is a kind of fungus. It is so small that we cannot see it without a microscope. When yeast is mixed with flour, water, and a little sugar, it starts to eat the sugar. As it eats, it gives off a gas. This gas makes many small bubbles in the dough, and the dough grows bigger and softer.',
      'Yeast likes warm places. If the room is too cold, the dough rises very slowly. But if the water is too hot, the yeast can die. That is why bakers use warm water, not boiling water. When the bread goes into the oven, the heat makes the bubbles bigger, and then the yeast stops working.',
      'Look closely at a slice of bread. You can see many small holes in it. Each hole was once a bubble ( B ) by yeast. People have used yeast to make bread for thousands of years, ( C ) they could not see it.',
    ],
    ja: [
      '家でパンを作ったことはありますか。はじめ、生地は小さくて重いです。でも1、2時間たつと、ずっと大きくなります。なぜこうなるのでしょうか。そのひみつは、イーストとよばれる小さな生き物です。',
      'イーストは菌のなかまです。とても小さいので、けんび鏡なしでは見ることができません。イーストを小麦粉や水、少しの砂糖とまぜると、イーストは砂糖を食べはじめます。食べながら、イーストは気体を出します。この気体が生地の中にたくさんの小さなあわを作り、生地は大きく、やわらかくなるのです。',
      'イーストはあたたかい場所が好きです。部屋が寒すぎると、生地はとてもゆっくりふくらみます。でも水が熱すぎると、イーストは死んでしまうことがあります。だからパン職人は、ふっとうしたお湯ではなく、ぬるま湯を使うのです。パンがオーブンに入ると、熱であわがさらに大きくなり、そしてイーストははたらくのをやめます。',
      'パンの切れはしをよく見てください。小さな穴がたくさん見えるでしょう。それぞれの穴は、かつてイーストが作ったあわだったのです。人々は、目に見えなかったにもかかわらず、何千年ものあいだイーストを使ってパンを作ってきました。',
    ],
    blanks: [
      { id: 'A', choices: ['bigger', 'big', 'biggest', 'more big'], answer: 0, why: 'much は比較級を強める。big の比較級は bigger。' },
      { id: 'B', choices: ['made', 'making', 'make', 'makes'], answer: 0, why: 'a bubble made by yeast「イーストによって作られたあわ」。過去分詞の後置修飾。' },
      { id: 'C', choices: ['though', 'because', 'so', 'until'], answer: 0, why: '「見えなかったけれども使ってきた」という逆接なので though。' },
    ],
    underline: { phrase: 'it gives off a gas', choices: ['気体を出す', '気体を吸いこむ', '気体をこわす', '気体を止める'], answer: 0, why: 'give off ～「（においや気体など）を出す」。' },
    tf: [
      { statement: 'We can see yeast without a microscope.', answer: false, why: '第2段落 we cannot see it without a microscope。' },
      { statement: 'Yeast eats sugar and gives off a gas.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Bakers use boiling water to make the dough rise faster.', answer: false, why: '第3段落 bakers use warm water, not boiling water。' },
      { statement: 'The small holes in bread were once bubbles.', answer: true, why: '第4段落の内容と合う。' },
      { statement: 'People started using yeast only a hundred years ago.', answer: false, why: '第4段落 for thousands of years。' },
    ],
  },
  {
    id: 'seed-travel',
    title: 'How Do Seeds Travel?',
    level: '中2（説明文）',
    paragraphs: [
      'Plants cannot walk, but their seeds often travel far from the parent plant. Why is this important? If all the seeds fell right under the parent, the young plants would have to share the same water, sunlight, and soil. By traveling, seeds can find new places ( A ) grow.',
      'Some seeds travel by wind. A dandelion seed has a soft white part like a tiny parachute, so it can fly a long way on a windy day. Maple seeds have wings, and they spin like helicopters as they fall.',
      'Other seeds travel with animals. Some seeds have small hooks that stick to the fur of animals or to people\'s clothes. Long ago, a man in Switzerland noticed these seeds on his dog after a walk. This gave him the idea for a new kind of fastener, ( B ) we now use on shoes and bags. Birds and other animals also eat fruit, and the seeds come out later in a different place.',
      'Coconuts can even travel by water. They are light enough to float, so they can be carried by the sea to another island. Next time you see a plant growing in a strange place, think about the long journey its seed ( C ) have taken.',
    ],
    ja: [
      '植物は歩けませんが、その種は親の植物から遠くへ旅することがよくあります。なぜそれが大切なのでしょうか。もし種が全部親のすぐ下に落ちたら、若い植物は同じ水や日光、土を分け合わなければならなくなります。旅をすることで、種は育つための新しい場所を見つけられるのです。',
      '風で旅をする種もあります。タンポポの種には小さなパラシュートのような白くてやわらかい部分があるので、風の強い日には遠くまで飛ぶことができます。カエデの種には羽があり、落ちるときにヘリコプターのようにくるくる回ります。',
      '動物といっしょに旅をする種もあります。小さなかぎがあって、動物の毛や人の服にくっつく種があるのです。むかし、スイスのある男性が散歩のあとで自分の犬にこのような種がついているのに気づきました。これが新しい種類の留め具のアイデアになり、それを今私たちはくつやかばんに使っています。また、鳥やほかの動物が果物を食べると、種はあとで別の場所に出てきます。',
      'ココナツは水で旅をすることさえあります。浮かぶほど軽いので、海に運ばれて別の島へ行くことができるのです。今度、ふしぎな場所に植物が生えているのを見たら、その種がたどってきたかもしれない長い旅のことを考えてみてください。',
    ],
    blanks: [
      { id: 'A', choices: ['to', 'for', 'at', 'by'], answer: 0, why: 'new places to grow「育つための新しい場所」（不定詞の形容詞的用法）。' },
      { id: 'B', choices: ['which', 'that', 'what', 'who'], answer: 0, why: 'コンマのあとで a new kind of fastener を説明する非制限用法の which。that はコンマのあとに使えない。' },
      { id: 'C', choices: ['may', 'must not', 'should not', 'cannot'], answer: 0, why: 'may have ＋ 過去分詞「～したかもしれない」。' },
    ],
    underline: { phrase: 'light enough to float', choices: ['浮かぶほど軽い', '軽すぎて浮かばない', '浮かぶと軽くなる', '重すぎて沈む'], answer: 0, why: '形容詞 ＋ enough to ～「～するほど…」。' },
    tf: [
      { statement: 'It is better for all seeds to fall right under the parent plant.', answer: false, why: '第1段落：親の下に落ちると水や日光を分け合わなければならない。' },
      { statement: 'Dandelion seeds can fly far on the wind.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Some seeds have hooks that stick to animal fur.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Coconuts are too heavy to float.', answer: false, why: '第4段落 They are light enough to float。' },
      { statement: 'Seeds in fruit eaten by birds can come out in a different place.', answer: true, why: '第3段落の最後の文と合う。' },
    ],
  },
  {
    id: 'why-sneeze',
    title: 'Why Do We Sneeze?',
    level: '中2（説明文）',
    paragraphs: [
      'Ah-choo! Everyone sneezes sometimes. It may feel strange, but a sneeze is actually one of the ways your body protects you. When dust, pollen, or germs get inside your nose, the nose sends a message to the brain. Then the brain makes your body push the air out ( A ) and strongly.',
      'A sneeze happens very fast, and you cannot easily stop it. Many muscles work together, from your chest to your throat. Your eyes also close by themselves. Because the air comes out so strongly, a sneeze can carry tiny drops of water a long way.',
      'Some people sneeze when they suddenly look at bright sunlight. Scientists are still not sure why this happens, but it seems to run in families. If your parents sneeze in the sun, you may do the ( B ).',
      'When you have a cold, sneezing can spread germs to other people. So it is important to cover your mouth and nose. Doctors say that using your elbow is better than using your hands, ( C ) your hands touch many things, such as doors and desks.',
    ],
    ja: [
      'ハクション！ だれでもときどきくしゃみをします。ふしぎな感じがするかもしれませんが、くしゃみは実は体があなたを守る方法の一つなのです。ほこりや花粉、ばい菌が鼻の中に入ると、鼻は脳に知らせを送ります。すると脳は、体に空気をすばやく強くはき出させるのです。',
      'くしゃみはとても速く起こり、かんたんには止められません。胸からのどまで、たくさんの筋肉がいっしょにはたらきます。目も自然に閉じます。空気がとても強く出るので、くしゃみは小さな水のつぶを遠くまで運ぶことがあります。',
      '急に明るい日光を見たときにくしゃみをする人もいます。なぜそうなるのか科学者たちにもまだはっきりわかっていませんが、家族で似ることが多いようです。もしあなたの親が日光でくしゃみをするなら、あなたもそうなるかもしれません。',
      'かぜをひいているとき、くしゃみはばい菌をほかの人に広げることがあります。だから口と鼻をおおうことが大切です。医者によると、手よりもひじを使うほうがよいそうです。手はドアや机など、いろいろなものにさわるからです。',
    ],
    blanks: [
      { id: 'A', choices: ['quickly', 'quick', 'quicker than', 'quickness'], answer: 0, why: 'push the air out を修飾するので副詞 quickly。and strongly と副詞どうしで並ぶ。' },
      { id: 'B', choices: ['same', 'similar', 'like', 'alike'], answer: 0, why: 'do the same「同じことをする」。' },
      { id: 'C', choices: ['because', 'but', 'so', 'if'], answer: 0, why: 'ひじのほうがよい理由を述べるので because。' },
    ],
    underline: { phrase: 'it seems to run in families', choices: ['家族で似ることが多いようだ', '家族で走るのが好きなようだ', '家族の中で一人だけに起こる', '家族といると止まるようだ'], answer: 0, why: 'run in the family / run in families「（性質が）家族に受けつがれる」。seem to ～「～のようだ」。' },
    tf: [
      { statement: 'A sneeze helps protect your body.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'It is easy to stop a sneeze.', answer: false, why: '第2段落 you cannot easily stop it。' },
      { statement: 'Your eyes stay open when you sneeze.', answer: false, why: '第2段落 Your eyes also close by themselves。' },
      { statement: 'Scientists know exactly why some people sneeze in bright sunlight.', answer: false, why: '第3段落 Scientists are still not sure why。' },
      { statement: 'Doctors say it is better to cover a sneeze with your elbow.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
  {
    id: 'banana-ripen',
    title: 'How Do Bananas Get Sweet?',
    level: '中2（説明文）',
    paragraphs: [
      'Bananas are usually picked while they are still green and hard. They are then carried on ships to many countries. By the time they arrive at stores, ( A ) of them have turned yellow. How does this happen?',
      'Bananas give off a natural gas called ethylene. This gas helps the fruit become ripe. As a banana ripens, the starch inside it slowly changes into sugar. That is why a yellow banana tastes much sweeter than a green one. Later, small brown spots appear on the skin, and the banana becomes even softer and sweeter.',
      'You can use this gas to your advantage. If you want green bananas to ripen faster, put them in a paper bag. The gas stays inside the bag, so the bananas ripen ( B ). Putting an apple in the bag also helps, because apples give off the same gas.',
      'What happens if you put bananas in the refrigerator? The cold makes the skin turn dark, but the fruit inside is still good to eat. So do not throw a banana away just ( C ) its skin is dark.',
    ],
    ja: [
      'バナナはふつう、まだ緑色でかたいうちに収穫されます。そして船でいろいろな国へ運ばれます。お店に着くころには、その多くが黄色くなっています。どうしてこうなるのでしょうか。',
      'バナナはエチレンという自然の気体を出しています。この気体は果物が熟すのを助けます。バナナが熟すにつれて、中のでんぷんが少しずつ糖に変わります。だから黄色いバナナは緑のバナナよりずっとあまいのです。そのあと皮に小さな茶色い点があらわれ、バナナはさらにやわらかく、あまくなります。',
      'この気体をうまく利用することもできます。緑のバナナを早く熟させたいなら、紙ぶくろに入れてみましょう。気体がふくろの中にとどまるので、バナナは早く熟します。ふくろにりんごを入れるのも効果があります。りんごも同じ気体を出すからです。',
      'バナナを冷蔵庫に入れるとどうなるでしょうか。冷たさで皮は黒っぽくなりますが、中の実はまだおいしく食べられます。だから、皮が黒いというだけでバナナを捨てないでください。',
    ],
    blanks: [
      { id: 'A', choices: ['most', 'much', 'each', 'every'], answer: 0, why: 'most of them「それらのほとんど」。much は数えられない名詞、every は of them の前に置けない。each of them は単数あつかいなので have と合わない。' },
      { id: 'B', choices: ['faster', 'fast', 'fastest', 'more fast'], answer: 0, why: '「（ふくろに入れないときより）早く熟す」なので比較級 faster。' },
      { id: 'C', choices: ['because', 'so', 'if', 'though'], answer: 0, why: 'just because ～「～というだけの理由で」。' },
    ],
    underline: { phrase: 'You can use this gas to your advantage', choices: ['この気体をうまく利用できる', 'この気体はあぶないので使えない', 'この気体を作ることができる', 'この気体を止めることができる'], answer: 0, why: 'use ～ to one\'s advantage「～をうまく利用する」。' },
    tf: [
      { statement: 'Bananas are usually picked when they are yellow.', answer: false, why: '第1段落 picked while they are still green。' },
      { statement: 'As a banana ripens, its starch changes into sugar.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'Putting bananas in a paper bag makes them ripen more slowly.', answer: false, why: '第3段落 the bananas ripen faster。' },
      { statement: 'Apples give off the same gas as bananas.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'A banana with a dark skin from the refrigerator cannot be eaten.', answer: false, why: '第4段落 the fruit inside is still good to eat。' },
    ],
  },
  {
    id: 'shadow-clock',
    title: 'A Clock Made of Shadows',
    level: '中2（説明文）',
    paragraphs: [
      'On a sunny day, your shadow follows you everywhere. A shadow is made when something blocks light. Your body stops the sunlight, so a dark shape appears on the ground ( A ) the sun.',
      'Have you ever noticed that your shadow changes during the day? In the morning, when the sun is low in the east, your shadow is long and points to the west. Around noon, the sun is high in the sky, so your shadow becomes very short. In the evening, it grows long again and points to the east.',
      'Long ago, people used these changes to tell the time. Thousands of years ago, people in ancient Egypt used shadow clocks. Later, sundials became common in many parts of the world. A sundial has a stick or a thin plate in the middle. As the sun moves across the sky, the shadow of the stick moves around the dial, ( B ) shows the time.',
      'Of course, a sundial does not work at night or on cloudy days. Still, you can make a simple one ( C ). Put a stick in the ground on a sunny morning and mark the end of its shadow every hour. You will have your own clock made of shadows.',
    ],
    ja: [
      '晴れた日には、かげがどこへでもついてきます。かげは、何かが光をさえぎるとできます。体が日光を止めるので、太陽と反対側の地面に暗い形があらわれるのです。',
      '一日のあいだにかげが変わることに気づいたことはありますか。朝、太陽が東の低いところにあるとき、かげは長く、西を向いています。正午ごろには太陽が空の高いところにあるので、かげはとても短くなります。夕方には、かげはまた長くなり、東を向きます。',
      'むかしの人々は、この変化を使って時刻を知りました。何千年も前、古代エジプトの人々はかげ時計を使っていました。のちに、日時計が世界の多くの場所で使われるようになりました。日時計のまん中には棒やうすい板があります。太陽が空を動くにつれて、棒のかげが文字盤の上を回り、それが時刻を示すのです。',
      'もちろん、日時計は夜やくもりの日には使えません。それでも、自分でかんたんな日時計を作ることができます。晴れた日の朝に地面に棒を立て、1時間ごとにかげの先に印をつけてみましょう。かげでできた自分だけの時計ができあがります。',
    ],
    blanks: [
      { id: 'A', choices: ['opposite', 'next to', 'among', 'inside'], answer: 0, why: 'opposite ～「～の反対側に」。かげは太陽と反対側にできる。' },
      { id: 'B', choices: ['which', 'what', 'who', 'where'], answer: 0, why: 'コンマのあとで前の内容（かげが動くこと）を受ける非制限用法の which。' },
      { id: 'C', choices: ['yourself', 'yours', 'your', 'you'], answer: 0, why: 'make ～ yourself「自分で～を作る」。' },
    ],
    underline: { phrase: 'mark the end of its shadow every hour', choices: ['1時間ごとにかげの先に印をつける', '1時間ずっとかげを見ている', 'かげが消えるまで待つ', '毎朝かげの長さをはかる'], answer: 0, why: 'mark「印をつける」、the end of its shadow「かげの先」、every hour「1時間ごとに」。' },
    tf: [
      { statement: 'A shadow is made when something blocks light.', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'Your shadow is the longest around noon.', answer: false, why: '第2段落 Around noon ... your shadow becomes very short。' },
      { statement: 'In the morning, your shadow points to the west.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'People in ancient Egypt used shadow clocks.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'A sundial works well on cloudy days.', answer: false, why: '第4段落 a sundial does not work at night or on cloudy days。' },
    ],
  },
  {
    id: 'popcorn',
    title: 'Why Does Popcorn Pop?',
    level: '中2（説明文）',
    paragraphs: [
      'Popcorn is a popular snack at movie theaters and parties. But have you ever wondered why a small, hard corn kernel suddenly turns into a big, white, fluffy snack? The secret is ( A ) inside the kernel.',
      'Each kernel of popcorn has a hard outer shell. Inside the shell, there is soft starch and a tiny amount of water. When the kernel is heated, the water turns into steam. The steam cannot escape because the shell is so hard, so the pressure inside becomes higher and higher.',
      'When the temperature reaches about 180 degrees Celsius, the shell finally breaks open with a loud pop. At that moment, the hot, soft starch inside spreads out quickly and then cools down. That is ( B ) popcorn becomes light and full of air.',
      'Not every kind of corn can pop. The corn we usually eat at dinner has a softer shell, so the steam escapes before the pressure gets high enough. That is why farmers grow a special kind of corn just for popcorn. Next time you eat popcorn, think ( C ) the tiny explosion inside each kernel.',
    ],
    ja: [
      'ポップコーンは映画館やパーティーで人気のおやつです。でも、小さくてかたいトウモロコシのつぶが、なぜ急に大きくて白い、ふわふわのおやつに変わるのか、ふしぎに思ったことはありますか。そのひみつは、つぶの中の水です。',
      'ポップコーンのつぶには、かたい外側のからがあります。からの中には、やわらかいでんぷんとほんの少しの水があります。つぶを熱すると、水は水蒸気に変わります。からがとてもかたいので水蒸気はにげることができず、中の圧力がどんどん高くなっていきます。',
      '温度がおよそ180度に達すると、からはついに大きなポンという音を立てて割れます。その瞬間、中の熱くてやわらかいでんぷんが急に広がり、そして冷えて固まります。だからポップコーンは軽くて、空気がたくさん入っているのです。',
      'どんなトウモロコシでもはじけるわけではありません。夕食でふつう食べるトウモロコシは、からがやわらかいので、圧力が十分に高くなる前に水蒸気がにげてしまいます。そのため農家の人は、ポップコーン用の特別なトウモロコシを育てているのです。今度ポップコーンを食べるときは、ひとつぶひとつぶの中で起きている小さな爆発のことを考えてみてください。',
    ],
    blanks: [
      { id: 'A', choices: ['water', 'sugar', 'air', 'oil'], answer: 0, why: '第2段落：つぶの中の少しの水が水蒸気になることが「ひみつ」。' },
      { id: 'B', choices: ['why', 'what', 'where', 'when'], answer: 0, why: 'That is why ～「そういうわけで～」。' },
      { id: 'C', choices: ['about', 'with', 'for', 'at'], answer: 0, why: 'think about ～「～について考える」。' },
    ],
    underline: { phrase: 'the steam escapes before the pressure gets high enough', choices: ['圧力が十分に高くなる前に水蒸気がにげてしまう', '水蒸気がにげたあとに圧力が高くなる', '圧力が高すぎて水蒸気がこおる', '水蒸気が圧力を下げずにとどまる'], answer: 0, why: 'escape「にげる」、before ～「～する前に」、high enough「十分に高い」。' },
    tf: [
      { statement: 'A popcorn kernel has a hard outer shell.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'There is no water inside a popcorn kernel.', answer: false, why: '第2段落 a tiny amount of water。' },
      { statement: 'The shell breaks open at about 180 degrees Celsius.', answer: true, why: '第3段落の内容と合う。' },
      { statement: 'Any kind of corn can become popcorn.', answer: false, why: '第4段落 Not every kind of corn can pop。' },
      { statement: 'Farmers grow special corn for popcorn.', answer: true, why: '第4段落の内容と合う。' },
    ],
  },
]

export const XP_LONG_ITEM = 5 // 1問正解ごと

// 採点：空所と内容一致の正解数
export const seqRight = (q: SeqQ, a: number[] | undefined) => !!a && a.length === q.answer.length && a.every((x, i) => x === q.answer[i])
export const splitSentences = (t: string) => t.split(/(?<=[.!?]["”]?)\s+(?=[A-Z"“])/)
// 段落の並べかえを「出来事の順番」と同じ形（events と answer）にする
export function paraSeqQ(p: LongPassage): SeqQ | null {
  if (!p.paraSeq) return null
  const parts = splitSentences(p.paragraphs[p.paraSeq.at])
  return { events: p.paraSeq.shown.map((i) => parts[i]), answer: parts.map((_, k) => p.paraSeq!.shown.indexOf(k)), why: p.paraSeq.why }
}

export function scoreLong(p: LongPassage, blanks: Record<string, number>, tf: Record<number, boolean>, picks: number[] = [], extra: { underline?: number; order?: string; sentences?: Record<string, number>; qa?: Record<number, number>; refer?: number; gist?: Record<number, number>; title?: number; complete?: Record<number, number>; insert?: number; summary?: Record<number, number>; vocab?: Record<number, number>; seq?: number[]; pseq?: number[] } = {}): { score: number; total: number } {
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
  const ps = p.paraSeq && seqRight(paraSeqQ(p)!, extra.pseq) ? 1 : 0
  return { score: b + t + k + u + o + se + qa + rf + gi + ti + co + ins + su + vo + sq + ps, total: totalOf(p) }
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
export const totalOf = (p: LongPassage) => p.blanks.length + p.tf.length + (p.pick2 ? 2 : 0) + (p.underline ? 1 : 0) + (p.order ? 1 : 0) + (p.sentences?.length ?? 0) + (p.qa?.length ?? 0) + (p.refer ? 1 : 0) + (p.gist?.length ?? 0) + (p.titleQ ? 1 : 0) + (p.complete?.length ?? 0) + (p.insert ? 1 : 0) + (p.summary?.blanks.length ?? 0) + (p.vocab?.length ?? 0) + (p.seq ? 1 : 0) + (p.paraSeq ? 1 : 0)

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
export const TYPE_LABEL = { pseq: '文の並べかえ（段落）', seq: '出来事の順番', vocab: '語句の意味', summary: '要約文の完成', insert: '文を入れる位置', complete: '英文の完成', title: 'タイトル選択', gist: '段落の要旨', refer: '指示語', blank: '空所補充（語句）', sentence: '会話の文補充', tf: '内容一致（○×）', pick2: '内容一致（2つ選ぶ）', qa: '英問英答', underline: '下線部の意味', order: '語句整序' } as const
export type QType = keyof typeof TYPE_LABEL
export type TypeStats = Partial<Record<QType, [number, number]>>

export function typeResults(
  p: LongPassage,
  a: { blanks: Record<string, number>; tf: Record<number, boolean>; picks: number[]; underline?: number; order?: string; sentences?: Record<string, number>; qa?: Record<number, number>; refer?: number; gist?: Record<number, number>; title?: number; complete?: Record<number, number>; insert?: number; summary?: Record<number, number>; vocab?: Record<number, number>; seq?: number[]; pseq?: number[] },
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
  if (p.paraSeq) out.pseq = [seqRight(paraSeqQ(p)!, a.pseq) ? 1 : 0, 1]
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
export const shownTitle = (p: LongPassage, n: number) => (p.titleQ ? `タイトルを当てる読解 No.${n + 1}` : p.title)

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
    pseq: !!p.paraSeq,
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
  pseq?: number[]
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
    return { blanks: numMap(d.blanks), tf, picks: nums(d.picks), under: opt(d.under), order: nums(d.order), sents: numMap(d.sents), qa: numMap(d.qa), refer: opt(d.refer), gist: numMap(d.gist), title: opt(d.title), comp: numMap(d.comp), insert: opt(d.insert), summary: numMap(d.summary), vocab: numMap(d.vocab), seq: nums(d.seq), pseq: nums(d.pseq) }
  } catch {
    return null
  }
}

// 1問も答えていなければ消す
export const draftEmpty = (d: LongDraft) =>
  [d.blanks, d.tf, d.sents, d.qa, d.gist, d.comp, d.summary ?? {}, d.vocab ?? {}].every((m) => Object.keys(m).length === 0) && d.picks.length === 0 && d.order.length === 0 && d.under === undefined && d.refer === undefined && d.title === undefined && d.insert === undefined && (d.seq ?? []).length === 0 && (d.pseq ?? []).length === 0

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
  pseq: 'First / Then / But / So などのつなぎの語や、it / they が前の文の何を指すかを手がかりに並べよう。',
}

// レベル別おすすめ：初級なら中2向け、中級なら中3向け、上級なら高校入試向けの、まだ解いていない長文
export function levelPick(level: '初級' | '中級' | '上級', record: Record<string, number>, list: LongPassage[] = LONG_PASSAGES): LongPassage | null {
  const tag = level === '初級' ? '中2' : level === '中級' ? '中3' : '高校入試'
  const pool = list.filter((p) => p.level.includes(tag))
  return pool.find((p) => record[p.id] === undefined) ?? pool[0] ?? null
}

// 音読タイム：1分あたりの語数（WPM）
export const wpmOf = (words: number, sec: number) => (sec > 0 ? Math.round((words * 60) / sec) : 0)

// ジャンルごとの正答率：［正解数, 問題数］
const GENRE_KEY = 'eitan:long-genre'
export function loadGenreStats(): Partial<Record<Genre, [number, number]>> {
  try {
    const v = JSON.parse(localStorage.getItem(GENRE_KEY) ?? '{}') as unknown
    if (!isObj(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([k, x]) => (GENRES as readonly string[]).includes(k) && Array.isArray(x) && x.length === 2 && x.every((n) => typeof n === 'number'))) as Partial<Record<Genre, [number, number]>>
  } catch {
    return {}
  }
}
export function addGenreStats(g: Genre, ok: number, n: number): Partial<Record<Genre, [number, number]>> {
  const all = loadGenreStats()
  const [a, b] = all[g] ?? [0, 0]
  const next = { ...all, [g]: [a + ok, b + n] as [number, number] }
  try {
    localStorage.setItem(GENRE_KEY, JSON.stringify(next))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return next
}

// しおり：★をつけた長文（一覧の上にまとめる）
const BOOKMARK_KEY = 'eitan:long-bookmarks'
export function loadBookmarks(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(BOOKMARK_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveBookmarks(ids: string[]): void {
  try {
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(ids))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 全部制覇チャレンジ：解いた本数と記念バッジ（10・30・50本、全部）
export function solvedBadges(solved: number, total: number): string[] {
  const out: string[] = []
  if (solved >= 10) out.push('🥉10本')
  if (solved >= 30) out.push('🥈30本')
  if (solved >= 50) out.push('🥇50本')
  if (total > 0 && solved >= total) out.push('🏆全部制覇')
  return out
}

// 今週の長文ランキング：今週解いた長文の点数（正答率）ベスト3
export type WeekResult = { id: string; pct: number; day: string }
const WEEK_KEY = 'eitan:long-week'
export function loadWeekResults(): WeekResult[] {
  try {
    const v = JSON.parse(localStorage.getItem(WEEK_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is WeekResult => isObj(x) && typeof x.id === 'string' && typeof x.pct === 'number' && typeof x.day === 'string') : []
  } catch {
    return []
  }
}
export function pushWeekResult(r: WeekResult): WeekResult[] {
  const list = [...loadWeekResults(), r].slice(-100)
  try {
    localStorage.setItem(WEEK_KEY, JSON.stringify(list))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return list
}
// 週はじめ（月曜日）が同じ結果だけ。同じ長文はいちばんよい点
export function weekTop(list: WeekResult[], week: string, weekOf: (day: string) => string, n = 3): WeekResult[] {
  const best = new Map<string, WeekResult>()
  for (const r of list) if (weekOf(r.day) === week && (best.get(r.id)?.pct ?? -1) < r.pct) best.set(r.id, r)
  return [...best.values()].sort((a, b) => b.pct - a.pct).slice(0, n)
}

// むずかしさ★1〜3：本文の語数と設問の数から自動で決める
export function difficultyOf(p: LongPassage): 1 | 2 | 3 {
  const v = wordCount(p) / 60 + totalOf(p) / 5
  return v < 5.5 ? 1 : v < 7 ? 2 : 3
}

// キーセンテンス：○×の文といちばん多く語が重なる本文の文（根拠の文の目安）
export function keySentence(p: LongPassage, statement: string): string {
  const words = (t: string) => new Set(t.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').split(/\s+/).filter((w) => w.length > 3))
  const target = words(statement)
  const sentences = p.paragraphs.flatMap((t) => t.split(/(?<=[.!?])\s+/)).filter((t) => t.trim().length > 0)
  let best = sentences[0] ?? ''
  let bestScore = -1
  for (const t of sentences) {
    const score = [...words(t)].filter((w) => target.has(w)).length
    if (score > bestScore) {
      best = t
      bestScore = score
    }
  }
  return best
}

// 次の長文：今の長文のあとから順に、まだ解いていない長文（全部解いていたら次の長文）
export function nextLong(id: string, record: Record<string, number>, list: LongPassage[] = LONG_PASSAGES): LongPassage {
  const i = list.findIndex((x) => x.id === id)
  for (let k = 1; k < list.length; k++) {
    const x = list[(i + k) % list.length]
    if (record[x.id] === undefined) return x
  }
  return list[(i + 1) % list.length]
}

// レベル判定：8割以上で「中2レベル合格」など。レベルは level の最初の部分（中2・中3・高校入試）
export function levelVerdict(p: LongPassage, score: number, total: number): { pass: boolean; text: string } {
  const lv = p.level.replace(/（.*）/, '')
  const pass = total > 0 && score / total >= 0.8
  return { pass, text: pass ? `🎖 ${lv}レベル合格！` : `${lv}レベル合格まであと${Math.ceil(total * 0.8) - score}点` }
}

// 学年チャレンジ：その学年（中2・中3・高校入試）の長文のうち、まだ解いていない最初の1本と、解いた本数
export function gradeChallenge(tag: string, record: Record<string, number>, list: LongPassage[] = LONG_PASSAGES) {
  const ps = list.filter((x) => x.level.startsWith(tag))
  return { next: ps.find((x) => record[x.id] === undefined) ?? null, done: ps.filter((x) => record[x.id] !== undefined).length, total: ps.length }
}

// 長文をこの本数解くと記念メダル
export const LONG_MEDAL = 100

// NEW マーク：いちばん新しく追加した6本のうち、まだ解いていない長文
export const NEW_LONG_COUNT = 6
export const isNewLong = (p: LongPassage, record: Record<string, number>, list: LongPassage[] = LONG_PASSAGES) => record[p.id] === undefined && list.indexOf(p) >= list.length - NEW_LONG_COUNT
