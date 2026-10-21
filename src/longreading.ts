// 長文読解（私立高校入試の形式）：200語前後の長文＋空所補充（前置詞・語句の記号選択）＋内容一致（○×）
// 本文・問題・解説はすべて自作。空所は本文中で「( A )」のように書く
export type Blank = { id: string; choices: string[]; answer: number; why: string }
export type TrueFalse = { statement: string; answer: boolean; why: string }
export type PickTwo = { statements: string[]; answers: [number, number]; why: string } // 本文と合うものを2つ選ぶ（ア〜カ）
export type Underline = { phrase: string; choices: string[]; answer: number; why: string } // 下線部の意味に近いもの
export type Ordering = { words: string[]; rest: string; answer: string; ja: string } // 語句整序：words を並べて answer に（rest は後ろに続く語）
export type SentenceBlank = { id: string; choices: string[]; answer: number; why: string } // 会話文の [ 1 ] に入る文
export type LongPassage = { id: string; title: string; level: string; paragraphs: string[]; ja: string[]; blanks: Blank[]; tf: TrueFalse[]; pick2?: PickTwo; underline?: Underline; order?: Ordering; sentences?: SentenceBlank[] }

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
]

export const XP_LONG_ITEM = 5 // 1問正解ごと

// 採点：空所と内容一致の正解数
export function scoreLong(p: LongPassage, blanks: Record<string, number>, tf: Record<number, boolean>, picks: number[] = [], extra: { underline?: number; order?: string; sentences?: Record<string, number> } = {}): { score: number; total: number } {
  const b = p.blanks.filter((x) => blanks[x.id] === x.answer).length
  const t = p.tf.filter((x, i) => tf[i] === x.answer).length
  const k = p.pick2 ? picks.filter((i) => p.pick2!.answers.includes(i)).length : 0
  const u = p.underline && extra.underline === p.underline.answer ? 1 : 0
  const o = p.order && extra.order === p.order.answer ? 1 : 0
  const se = (p.sentences ?? []).filter((x) => extra.sentences?.[x.id] === x.answer).length
  return { score: b + t + k + u + o + se, total: totalOf(p) }
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
export const totalOf = (p: LongPassage) => p.blanks.length + p.tf.length + (p.pick2 ? 2 : 0) + (p.underline ? 1 : 0) + (p.order ? 1 : 0) + (p.sentences?.length ?? 0)

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
