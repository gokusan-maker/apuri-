// 中学文法のミニ解説と確認問題（解説・例文・問題はすべて自作）
import { GRAMMAR_GRADES_FOR, loadGrade, type GradeId } from './usergrade'
export type GrammarQuestion = {
  sentence: string // ___ が空欄
  choices: string[]
  answer: number
  why: string
}

export type GrammarUnit = {
  id: string
  title: string
  points: string[] // 解説（短く）
  examples: { en: string; ja: string }[]
  questions: GrammarQuestion[]
}

export const GRAMMAR: GrammarUnit[] = [
  {
    id: 'be',
    title: 'be動詞（am / is / are）',
    points: ['「〜です」「〜にいる」を表す動詞。', '主語が I なら am、he / she / it や1人・1つなら is、you や複数なら are。'],
    examples: [
      { en: 'I am a junior high school student.', ja: '私は中学生です。' },
      { en: 'They are in the music room.', ja: '彼らは音楽室にいます。' },
    ],
    questions: [
      { sentence: 'My brother ___ a high school student.', choices: ['am', 'is', 'are'], answer: 1, why: '主語 my brother は1人なので is。' },
      { sentence: 'You and I ___ good friends.', choices: ['am', 'is', 'are'], answer: 2, why: '「あなたと私」は2人（複数）なので are。' },
      { sentence: 'I ___ hungry now.', choices: ['am', 'is', 'are'], answer: 0, why: '主語が I のときは am。' },
    ],
  },
  {
    id: 'third',
    title: '三人称単数の -s',
    points: ['主語が he / she / it や1人・1つ（I と you 以外）で現在の文なら、一般動詞に -s / -es をつける。', 'have は has になる。'],
    examples: [
      { en: 'My sister plays the guitar.', ja: '姉はギターをひく。' },
      { en: 'He has two cats.', ja: '彼はねこを2匹飼っている。' },
    ],
    questions: [
      { sentence: 'She ___ tennis every Sunday.', choices: ['play', 'plays', 'playing'], answer: 1, why: '主語 she ＋現在の文なので plays。' },
      { sentence: 'My father ___ coffee in the morning.', choices: ['drink', 'drinks', 'drinking'], answer: 1, why: '主語 my father は1人なので drinks。' },
      { sentence: 'Ken ___ a big dog.', choices: ['have', 'has', 'haves'], answer: 1, why: 'have は三人称単数で has になる。' },
    ],
  },
  {
    id: 'past',
    title: '過去形',
    points: ['過去のことは動詞を過去形にする。多くは -ed をつける（visit → visited）。', 'go → went のような不規則動詞もある。否定・疑問は did を使い、動詞は原形に戻す。'],
    examples: [
      { en: 'I watched a movie last night.', ja: '昨夜映画を見た。' },
      { en: 'Did you eat breakfast?', ja: '朝ごはんを食べましたか？' },
    ],
    questions: [
      { sentence: 'I ___ my grandmother last week.', choices: ['visit', 'visited', 'visiting'], answer: 1, why: 'last week（先週）なので過去形 visited。' },
      { sentence: 'We ___ to the zoo yesterday.', choices: ['go', 'went', 'gone'], answer: 1, why: 'go の過去形は went（不規則動詞）。' },
      { sentence: 'She ___ not come to school yesterday.', choices: ['does', 'did', 'is'], answer: 1, why: '過去の否定は did not ＋動詞の原形。' },
    ],
  },
  {
    id: 'progressive',
    title: '進行形（be動詞 ＋ -ing）',
    points: ['「（今）〜しているところ」は be動詞 ＋ 動詞の -ing 形。', '過去の「〜していた」は was / were ＋ -ing。'],
    examples: [
      { en: 'My mother is cooking dinner now.', ja: '母は今夕食を作っている。' },
      { en: 'We were talking about the game.', ja: '私たちは試合の話をしていた。' },
    ],
    questions: [
      { sentence: 'Look! The cat ___ sleeping on the sofa.', choices: ['is', 'are', 'does'], answer: 0, why: 'the cat は1匹なので is ＋ sleeping。' },
      { sentence: 'They are ___ soccer in the park now.', choices: ['play', 'playing', 'played'], answer: 1, why: 'be動詞のあとは -ing 形。' },
      { sentence: 'I was ___ a bath when you called me.', choices: ['take', 'taking', 'took'], answer: 1, why: '過去進行形は was ＋ -ing。' },
    ],
  },
  {
    id: 'future',
    title: '未来（will / be going to）',
    points: ['これからのことは will ＋ 動詞の原形。', '予定していることは be going to ＋ 動詞の原形 もよく使う。'],
    examples: [
      { en: 'It will be sunny tomorrow.', ja: '明日は晴れるだろう。' },
      { en: 'I am going to visit Kyoto next month.', ja: '来月京都を訪れる予定だ。' },
    ],
    questions: [
      { sentence: 'It ___ rain tomorrow.', choices: ['will', 'is', 'does'], answer: 0, why: '未来のことなので will ＋ 原形 rain。' },
      { sentence: 'I am going ___ visit my uncle.', choices: ['to', 'for', 'at'], answer: 0, why: 'be going to ＋ 動詞の原形。' },
      { sentence: 'Will you ___ free this evening?', choices: ['are', 'be', 'is'], answer: 1, why: 'will のあとは原形なので be。' },
    ],
  },
  {
    id: 'compare',
    title: '比較（-er / -est / as 〜 as）',
    points: ['2つを比べて「より〜」は -er ＋ than、長い語は more 〜。', '3つ以上で「いちばん〜」は the -est、長い語は the most 〜。「同じくらい〜」は as 〜 as（形は変えない）。'],
    examples: [
      { en: 'This river is longer than that one.', ja: 'この川はあの川より長い。' },
      { en: 'This is the most popular game in my class.', ja: 'これは私のクラスでいちばん人気のゲームだ。' },
    ],
    questions: [
      { sentence: 'This bag is ___ than that one.', choices: ['big', 'bigger', 'biggest'], answer: 1, why: 'than があるので比較級 bigger。' },
      { sentence: 'This is the ___ interesting book of all.', choices: ['more', 'most', 'much'], answer: 1, why: 'interesting は長い語なので the most interesting。' },
      { sentence: 'Tom runs as ___ as Ken.', choices: ['fast', 'faster', 'fastest'], answer: 0, why: 'as 〜 as の間は形を変えない。' },
    ],
  },
  {
    id: 'passive',
    title: '受け身（be動詞 ＋ 過去分詞）',
    points: ['「〜される」は be動詞 ＋ 過去分詞。', '「〜によって」と言うときは by 〜 をつける。'],
    examples: [
      { en: 'This song is loved by many people.', ja: 'この歌は多くの人に愛されている。' },
      { en: 'The bridge was built ten years ago.', ja: 'その橋は10年前に建てられた。' },
    ],
    questions: [
      { sentence: 'This room is ___ every day.', choices: ['clean', 'cleaned', 'cleaning'], answer: 1, why: '「掃除される」なので be動詞 ＋ 過去分詞 cleaned。' },
      { sentence: 'English is ___ in many countries.', choices: ['speak', 'spoke', 'spoken'], answer: 2, why: 'speak の過去分詞は spoken。' },
      { sentence: 'The letter was written ___ my sister.', choices: ['by', 'of', 'to'], answer: 0, why: '「〜によって」は by。' },
    ],
  },
  {
    id: 'perfect',
    title: '現在完了（have ＋ 過去分詞）',
    points: ['「（今までに）〜したことがある」「ずっと〜している」「もう〜した」を表す。', '「〜から（ずっと）」は since、「〜の間」は for を使う。'],
    examples: [
      { en: 'I have visited Okinawa twice.', ja: '沖縄には2回行ったことがある。' },
      { en: 'She has lived in this town for five years.', ja: '彼女はこの町に5年間住んでいる。' },
    ],
    questions: [
      { sentence: 'I have ___ this movie three times.', choices: ['see', 'saw', 'seen'], answer: 2, why: 'have のあとは過去分詞 seen。' },
      { sentence: 'She has lived here ___ 2020.', choices: ['for', 'since', 'from'], answer: 1, why: '「2020年から（ずっと）」は since。' },
      { sentence: 'I have ___ been to Hokkaido.', choices: ['never', 'yet', 'ago'], answer: 0, why: '「一度も〜ない」は never。' },
    ],
  },
  {
    id: 'modal',
    title: '助動詞（can / must / should）',
    points: ['動詞の前に置いて意味を足す。助動詞のあとの動詞は必ず原形。', 'can「〜できる」、must「〜しなければならない」、should「〜したほうがいい」。'],
    examples: [
      { en: 'She can play the violin.', ja: '彼女はバイオリンをひくことができる。' },
      { en: 'You should go to bed early.', ja: '早く寝たほうがいいよ。' },
    ],
    questions: [
      { sentence: 'My brother can ___ very fast.', choices: ['swim', 'swims', 'swimming'], answer: 0, why: '助動詞 can のあとは原形 swim。' },
      { sentence: 'You ___ wash your hands before lunch.', choices: ['must', 'are', 'do'], answer: 0, why: '「〜しなければならない」は must ＋ 原形。' },
      { sentence: 'It is cold. You ___ wear a coat.', choices: ['should', 'can’t', 'were'], answer: 0, why: '「〜したほうがいい」は should。' },
    ],
  },
  {
    id: 'infinitive',
    title: '不定詞（to ＋ 動詞の原形）',
    points: ['to ＋ 原形 で「〜すること」「〜するために」「〜するための」を表す。', 'want to 〜「〜したい」、go 〜 to buy …「…を買いに行く」などでよく使う。'],
    examples: [
      { en: 'I want to be a teacher.', ja: '私は先生になりたい。' },
      { en: 'He went to the store to buy milk.', ja: '彼は牛乳を買いに店へ行った。' },
    ],
    questions: [
      { sentence: 'I want ___ visit Canada someday.', choices: ['to', 'for', 'in'], answer: 0, why: 'want to ＋ 原形で「〜したい」。' },
      { sentence: 'She went to the library to ___ some books.', choices: ['borrow', 'borrowed', 'borrowing'], answer: 0, why: 'to のあとは原形。' },
      { sentence: 'I have a lot of homework ___ do today.', choices: ['to', 'at', 'of'], answer: 0, why: '「するべき宿題」は homework to do。' },
    ],
  },
  {
    id: 'gerund',
    title: '動名詞（動詞の -ing 形で「〜すること」）',
    points: ['動詞の -ing 形は「〜すること」という名詞のはたらきもする。', 'enjoy・finish・stop（〜するのをやめる）のあとは -ing 形。前置詞（at, of など）のあとも -ing 形。'],
    examples: [
      { en: 'I enjoy reading comics.', ja: '私はまんがを読むのを楽しむ。' },
      { en: 'She is good at drawing.', ja: '彼女は絵をかくのが得意だ。' },
    ],
    questions: [
      { sentence: 'We enjoyed ___ at the beach.', choices: ['swim', 'swimming', 'to swim'], answer: 1, why: 'enjoy のあとは -ing 形。' },
      { sentence: 'Did you finish ___ your report?', choices: ['write', 'writing', 'wrote'], answer: 1, why: 'finish のあとは -ing 形。' },
      { sentence: 'Thank you for ___ me.', choices: ['help', 'helped', 'helping'], answer: 2, why: '前置詞 for のあとは -ing 形。' },
    ],
  },
  {
    id: 'relative',
    title: '関係代名詞（who / which / that）',
    points: ['名詞にくわしい説明をつなぐことば。人なら who、物や動物なら which、どちらにも that が使える。', '「名詞 ＋ who / which ＋ 説明」の順に並べる。'],
    examples: [
      { en: 'I have a friend who lives in Osaka.', ja: '私には大阪に住んでいる友だちがいる。' },
      { en: 'This is the bike which my father gave me.', ja: 'これは父がくれた自転車だ。' },
    ],
    questions: [
      { sentence: 'The girl ___ is singing is my sister.', choices: ['who', 'which', 'what'], answer: 0, why: '「歌っている女の子」は人なので who。' },
      { sentence: 'I lost the pen ___ I bought yesterday.', choices: ['who', 'which', 'where'], answer: 1, why: 'pen は物なので which。' },
      { sentence: 'He has a dog ___ runs very fast.', choices: ['who', 'that', 'what'], answer: 1, why: '動物には that（または which）。' },
    ],
  },
  {
    id: 'there',
    title: 'There is / There are（〜がある・いる）',
    points: ['「（どこどこに）〜がある・いる」は There is ＋ 1つのもの・数えられない名詞／There are ＋ 2つ以上のもの。', '過去は There was / There were。'],
    examples: [
      { en: 'There is a cat under the table.', ja: 'テーブルの下にねこがいる。' },
      { en: 'There are three parks in my town.', ja: '私の町には公園が3つある。' },
    ],
    questions: [
      { sentence: 'There ___ a big tree in the garden.', choices: ['is', 'are', 'be'], answer: 0, why: 'a big tree は1本なので is。' },
      { sentence: 'There ___ many people at the station.', choices: ['is', 'are', 'was'], answer: 1, why: 'many people は複数なので are。' },
      { sentence: 'There ___ a festival last Sunday.', choices: ['is', 'are', 'was'], answer: 2, why: '過去（last Sunday）で1つなので was。' },
    ],
  },
  {
    id: 'preposition',
    title: '前置詞 in / on / at（時と場所）',
    points: ['時：at ＋ 時刻、on ＋ 曜日・日付、in ＋ 月・季節・年。', '場所：at ＋ 地点、on ＋ 面の上、in ＋ 中・広い場所。'],
    examples: [
      { en: 'School starts at eight thirty.', ja: '学校は8時30分に始まる。' },
      { en: 'My birthday is in July.', ja: '私の誕生日は7月だ。' },
    ],
    questions: [
      { sentence: 'I get up ___ six every day.', choices: ['at', 'on', 'in'], answer: 0, why: '時刻は at。' },
      { sentence: 'We have no school ___ Sunday.', choices: ['at', 'on', 'in'], answer: 1, why: '曜日は on。' },
      { sentence: 'It snows a lot ___ winter.', choices: ['at', 'on', 'in'], answer: 2, why: '季節は in。' },
    ],
  },
  {
    id: 'conjunction',
    title: '接続詞（when / if / because）',
    points: ['when「〜するとき」、if「もし〜なら」、because「〜なので（理由）」で2つの文をつなぐ。', '「時」の when や「条件」の if の文では、未来のことでも現在形を使う（「〜かどうか」の if や「いつ〜か」の when は別）。'],
    examples: [
      { en: 'I was reading when you called.', ja: 'あなたが電話したとき、私は本を読んでいた。' },
      { en: 'If it rains, we will stay home.', ja: 'もし雨なら、家にいます。' },
    ],
    questions: [
      { sentence: 'I stayed home ___ I had a cold.', choices: ['because', 'if', 'but'], answer: 0, why: '「かぜをひいていたので」理由は because。' },
      { sentence: '___ you are free, let\'s play tennis.', choices: ['Because', 'If', 'So'], answer: 1, why: '「もしひまなら」は If。' },
      { sentence: 'Call me ___ you get home.', choices: ['when', 'because', 'or'], answer: 0, why: '「家に着いたとき」は when。' },
    ],
  },
  {
    id: 'imperative',
    title: '命令文（〜しなさい・〜しないで・〜しよう）',
    points: ['主語を言わずに動詞の原形で始めると「〜しなさい」。ていねいにするときは please をつける。', 'Don\'t ＋ 原形「〜しないで」、Let\'s ＋ 原形「〜しよう」。'],
    examples: [
      { en: 'Open the window, please.', ja: '窓を開けてください。' },
      { en: "Let's play soccer after school.", ja: '放課後サッカーをしよう。' },
    ],
    questions: [
      { sentence: '___ quiet in the library.', choices: ['Be', 'Are', 'Is'], answer: 0, why: 'be動詞の命令文は原形の Be で始める。' },
      { sentence: "___ run in the hallway.", choices: ["Don't", "Doesn't", 'Not'], answer: 0, why: '「〜しないで」は Don’t ＋ 原形。' },
      { sentence: "Let's ___ lunch together.", choices: ['eat', 'eats', 'eating'], answer: 0, why: "Let's のあとは原形。" },
    ],
  },
  {
    id: 'wh',
    title: '疑問詞（what / who / where / when / how）',
    points: ['what「何」、who「だれ」、where「どこ」、when「いつ」、how「どうやって・どのくらい」。', '疑問詞を文の最初に置き、そのあとはふつうの疑問文の形。'],
    examples: [
      { en: 'Where do you live?', ja: 'どこに住んでいますか？' },
      { en: 'How do you go to school?', ja: 'どうやって学校へ行きますか？' },
    ],
    questions: [
      { sentence: '___ is your birthday? — It is May 5.', choices: ['When', 'Where', 'Who'], answer: 0, why: '日付を答えているので「いつ」の When。' },
      { sentence: '___ is that girl? — She is my cousin.', choices: ['What', 'Who', 'How'], answer: 1, why: '人をたずねるので Who。' },
      { sentence: '___ many brothers do you have?', choices: ['What', 'Which', 'How'], answer: 2, why: '数をたずねる「いくつ」は How many。' },
    ],
  },
  {
    id: 'pronoun',
    title: '代名詞（I / my / me / mine）',
    points: ['「〜は」I・he・she、「〜の」my・his・her、「〜を・に」me・him・her、「〜のもの」mine・his・hers。'],
    examples: [
      { en: 'This is my bag. It is mine.', ja: 'これは私のかばんです。それは私のものです。' },
      { en: 'Do you know him?', ja: '彼を知っていますか？' },
    ],
    questions: [
      { sentence: 'Please help ___.', choices: ['I', 'my', 'me'], answer: 2, why: '「私を」は me。' },
      { sentence: 'That is ___ bike.', choices: ['she', 'her', 'hers'], answer: 1, why: '名詞の前の「彼女の」は her。' },
      { sentence: 'Is this pen yours? — Yes, it\'s ___.', choices: ['my', 'me', 'mine'], answer: 2, why: '「私のもの」は mine。' },
    ],
  },
  {
    id: 'tag-exclaim',
    title: '付加疑問・感嘆文',
    points: [
      '付加疑問「〜ですよね」：肯定文には否定の形、否定文には肯定の形を文末につける（It is hot, isn\'t it?）。',
      '感嘆文「なんて〜！」：How＋形容詞（＋主語＋動詞）! / What＋a＋形容詞＋名詞（＋主語＋動詞）!',
    ],
    examples: [
      { en: 'You like dogs, don\'t you?', ja: '犬が好きですよね？' },
      { en: 'What a beautiful sunset!', ja: 'なんてきれいな夕日でしょう！' },
    ],
    questions: [
      { sentence: 'She is your sister, ___?', choices: ['is she', 'isn\'t she', 'doesn\'t she'], answer: 1, why: 'be動詞の肯定文なので isn\'t she。' },
      { sentence: 'You didn\'t go there, ___?', choices: ['did you', 'didn\'t you', 'do you'], answer: 0, why: '過去の否定文なので肯定の did you。' },
      { sentence: '___ tall this tree is!', choices: ['What', 'How', 'Very'], answer: 1, why: '形容詞 tall だけが続くので How。' },
    ],
  },
  {
    id: 'indirect',
    title: '間接疑問（I know where he lives）',
    points: ['疑問詞の疑問文を文の中に入れるときは「疑問詞＋主語＋動詞」の順にする（Where does he live? → I know where he lives.）。'],
    examples: [
      { en: 'Do you know what time it is?', ja: '今何時か知っていますか？' },
      { en: 'Tell me why you were late.', ja: 'なぜ遅れたのか教えて。' },
    ],
    questions: [
      { sentence: 'I don\'t know where ___.', choices: ['does she live', 'she lives', 'lives she'], answer: 1, why: '文の中では「疑問詞＋主語＋動詞」なので where she lives。' },
      { sentence: 'Can you tell me what ___?', choices: ['this is', 'is this', 'this'], answer: 0, why: '主語 this ＋動詞 is の順。' },
      { sentence: 'I wonder when ___ back.', choices: ['will he come', 'he will come', 'comes he'], answer: 1, why: '主語 he ＋ will come の順。' },
    ],
  },
  {
    id: 'participle',
    title: '分詞（a running boy / a broken cup）',
    points: [
      '動詞の ing 形は「〜している」、過去分詞は「〜された」の意味で名詞を説明できる。',
      '1語なら名詞の前（a sleeping cat）、2語以上なら名詞のうしろ（the boy playing tennis）に置く。',
    ],
    examples: [
      { en: 'Look at the sleeping baby.', ja: '眠っている赤ちゃんを見て。' },
      { en: 'This is a car made in Japan.', ja: 'これは日本で作られた車です。' },
    ],
    questions: [
      { sentence: 'The boy ___ by the door is my brother.', choices: ['standing', 'stood', 'stands'], answer: 0, why: '「立っている」男の子なので ing 形の standing。' },
      { sentence: 'I found a ___ window.', choices: ['breaking', 'broken', 'break'], answer: 1, why: '「割られた」窓なので過去分詞の broken。' },
      { sentence: 'English is a language ___ all over the world.', choices: ['speaking', 'spoke', 'spoken'], answer: 2, why: '「話されている」言語なので過去分詞の spoken。' },
    ],
  },
  {
    id: 'subjunctive',
    title: '仮定法（I wish / If I were）',
    points: [
      '今の事実とちがうことを願ったり想像したりするときは、動詞を過去形にする。be動詞はふつう主語に関係なく were を使う。',
      'I wish ＋ 主語 ＋ 過去形「〜ならいいのに」。If ＋ 主語 ＋ 過去形, 主語 ＋ would ＋ 動詞の原形「もし〜なら、…だろうに」。',
    ],
    examples: [
      { en: 'I wish I had a dog.', ja: '犬を飼っていたらいいのに。' },
      { en: 'If I were you, I would ask the teacher.', ja: '私があなたなら、先生に聞くだろう。' },
    ],
    questions: [
      { sentence: 'I wish I ___ fly like a bird.', choices: ['can', 'could', 'will'], answer: 1, why: '今できないことを願うので can の過去形 could。' },
      { sentence: 'If I ___ rich, I would travel around the world.', choices: ['am', 'were', 'be'], answer: 1, why: '事実とちがう想像なので were。' },
      { sentence: 'If it were sunny, we ___ go to the beach.', choices: ['will', 'would', 'are'], answer: 1, why: '仮定法の文の後半は would ＋ 動詞の原形。' },
    ],
  },
  {
    id: 'that-clause',
    title: '接続詞 that（I think that …）',
    points: ['think・know・hope・say などのあとに「that ＋ 主語 ＋ 動詞」を続けると「〜ということ」を表せる。この that はよく省略される。'],
    examples: [
      { en: 'I think that English is fun.', ja: '英語は楽しいと思う。' },
      { en: 'I know he is busy.', ja: '彼がいそがしいことは知っている。（that の省略）' },
    ],
    questions: [
      { sentence: 'I hope ___ you will come to the party.', choices: ['that', 'what', 'if'], answer: 0, why: '「〜ということを望む」は hope that 〜。' },
      { sentence: 'She says that the test ___ easy.', choices: ['was', 'be', 'being'], answer: 0, why: 'that のあとは「主語＋動詞」。the test was easy。' },
      { sentence: 'I think ___ is a good idea.', choices: ['it', 'to', 'for'], answer: 0, why: 'that が省略された形。I think (that) it is a good idea。' },
    ],
  },
  {
    id: 'wh-to',
    title: '疑問詞＋to（how to など）',
    points: ['how to ＋ 動詞の原形「〜のしかた」、what to 〜「何を〜すべきか」、where to 〜「どこで〜すべきか」、when to 〜「いつ〜すべきか」。'],
    examples: [
      { en: 'I know how to swim.', ja: '泳ぎ方を知っている。' },
      { en: "I don't know what to say.", ja: '何と言えばいいかわからない。' },
    ],
    questions: [
      { sentence: 'Can you tell me ___ to get to the station?', choices: ['how', 'what', 'who'], answer: 0, why: '「駅への行き方」は how to get to 〜。' },
      { sentence: "I don't know ___ to buy for her birthday.", choices: ['what', 'how', 'where'], answer: 0, why: '「何を買えばいいか」は what to buy。' },
      { sentence: 'Please tell me ___ to put this box.', choices: ['where', 'what', 'how'], answer: 0, why: '「どこに置けばいいか」は where to put。' },
    ],
  },
  {
    id: 'svoo-svoc',
    title: 'give 人 物・make A B',
    points: [
      'give・show・tell・send・buy などは「動詞＋人＋物」で「人に物を〜する」（give me a book）。',
      'make・call・name は「動詞＋A＋B」で「AをBにする／AをBと呼ぶ」（The news made me happy）。',
    ],
    examples: [
      { en: 'My father gave me a watch.', ja: '父は私に腕時計をくれた。' },
      { en: 'We call the cat Tama.', ja: '私たちはその猫をタマと呼ぶ。' },
    ],
    questions: [
      { sentence: 'Please show ___ your notebook.', choices: ['me', 'I', 'my'], answer: 0, why: '「私に見せて」は show me ＋ 物。' },
      { sentence: 'The movie made ___ sad.', choices: ['her', 'she', 'hers'], answer: 0, why: 'make A B の A は「〜を」の形。her。' },
      { sentence: 'My friends call ___ Ken.', choices: ['me', 'my', 'I'], answer: 0, why: 'call A B「AをBと呼ぶ」。A は me。' },
    ],
  },
  {
    id: 'it-for-to',
    title: 'It is … for 人 to ～',
    points: ['「（人が）〜することは…だ」は It is ＋ 形容詞 ＋ (for 人) ＋ to ＋ 動詞の原形。It は「to 以下」を指す。'],
    examples: [
      { en: 'It is easy for me to swim.', ja: '私にとって泳ぐことはかんたんだ。' },
      { en: 'It is important to sleep well.', ja: 'よく眠ることは大切だ。' },
    ],
    questions: [
      { sentence: 'It is hard ___ me to get up early.', choices: ['for', 'to', 'of'], answer: 0, why: '「私にとって」は for me。' },
      { sentence: 'It is fun to ___ new words.', choices: ['learn', 'learning', 'learned'], answer: 0, why: 'to のあとは動詞の原形。' },
      { sentence: '___ is dangerous to swim here.', choices: ['It', 'This', 'There'], answer: 0, why: 'It is … to ～ の形。It を使う。' },
    ],
  },
  {
    id: 'past-progressive',
    title: '過去進行形（was / were ＋ ing）',
    points: ['「（そのとき）〜していた」は was / were ＋ 動詞の ing 形。I・he・she・it は was、you・we・they は were。'],
    examples: [
      { en: 'I was sleeping at ten last night.', ja: '昨夜10時には寝ていた。' },
      { en: 'They were playing soccer when it started to rain.', ja: '雨がふりだしたとき、彼らはサッカーをしていた。' },
    ],
    questions: [
      { sentence: 'She ___ cooking when I came home.', choices: ['was', 'were', 'is'], answer: 0, why: 'she で過去のことなので was。' },
      { sentence: 'We were ___ TV at that time.', choices: ['watch', 'watching', 'watched'], answer: 1, why: 'were のあとは ing 形。' },
      { sentence: 'What ___ you doing then?', choices: ['was', 'were', 'did'], answer: 1, why: 'you なので were。' },
    ],
  },
  {
    id: 'perfect-progressive',
    title: '現在完了進行形（have been ＋ ing）',
    points: ['「（ずっと）〜し続けている」は have / has been ＋ 動詞の ing 形。for（〜の間）や since（〜から）といっしょによく使う。'],
    examples: [
      { en: 'I have been studying for two hours.', ja: '2時間ずっと勉強している。' },
      { en: 'It has been raining since morning.', ja: '朝からずっと雨が降っている。' },
    ],
    questions: [
      { sentence: 'He has ___ waiting for an hour.', choices: ['been', 'be', 'being'], answer: 0, why: 'has been ＋ ing の形。' },
      { sentence: 'We have been playing ___ noon.', choices: ['since', 'for', 'at'], answer: 0, why: '「正午から」は since noon。' },
      { sentence: 'They ___ been talking for thirty minutes.', choices: ['have', 'has', 'are'], answer: 0, why: 'they なので have。' },
    ],
  },
  {
    id: 'countable',
    title: '数えられる名詞・数えられない名詞',
    points: [
      'book や apple のように1つ、2つと数えられる名詞は、2つ以上なら複数形（books）にする。',
      'water・money・time などは数えられない名詞で、複数形にせず a / an もつけない。',
      '「たくさんの」は、数えられる名詞なら many、数えられない名詞なら much（a lot of はどちらにも使える）。',
    ],
    examples: [
      { en: 'I have many comic books.', ja: '私はたくさんマンガを持っている。' },
      { en: 'We don\'t have much milk in the fridge.', ja: '冷蔵庫に牛乳があまりない。' },
    ],
    questions: [
      { sentence: 'How ___ brothers do you have?', choices: ['much', 'many'], answer: 1, why: 'brothers は数えられる名詞の複数形なので many。' },
      { sentence: 'Can I have some ___?', choices: ['water', 'a water', 'waters'], answer: 0, why: 'water は数えられないので a もつけず、複数形にもしない。' },
      { sentence: 'There isn\'t ___ time before the bus comes.', choices: ['many', 'much'], answer: 1, why: 'time（時間）は数えられない名詞なので much。' },
    ],
  },
  {
    id: 'frequency',
    title: '頻度を表す副詞（always / usually / sometimes / never）',
    points: [
      'どのくらいよくするかを表す。always（いつも）＞ usually（ふつうは）＞ often（よく）＞ sometimes（ときどき）＞ never（一度も〜ない）。',
      '一般動詞の前、be動詞のあとに置く。',
    ],
    examples: [
      { en: 'I usually walk to school.', ja: '私はふだん歩いて学校に行く。' },
      { en: 'My father is always busy.', ja: '父はいつも忙しい。' },
    ],
    questions: [
      { sentence: 'She ___ eats breakfast. She eats it every day.', choices: ['always', 'never', 'sometimes'], answer: 0, why: '毎日食べるので always（いつも）。' },
      { sentence: 'I have ___ been to Hokkaido. I want to go someday.', choices: ['always', 'never', 'often'], answer: 1, why: '「いつか行きたい」ので一度も行ったことがない＝ never。' },
      { sentence: 'Ken is ___ late for school.', choices: ['sometimes', 'sometime', 'some times'], answer: 0, why: '「ときどき」は sometimes。be動詞 is のあとに置く。' },
    ],
  },
  {
    id: 'adverb',
    title: '形容詞と副詞（quick / quickly）',
    points: ['形容詞は名詞を説明する（a quick answer）。be動詞のあとにも置く。', '副詞は動詞などを説明する（answer quickly）。多くは形容詞に -ly をつけてつくる。', 'good の副詞は well、fast・hard は形が変わらない。'],
    examples: [
      { en: 'She is a careful driver.', ja: '彼女は注意深い運転手だ。' },
      { en: 'She drives carefully.', ja: '彼女は注意深く運転する。' },
    ],
    questions: [
      { sentence: 'Please speak ___. The baby is sleeping.', choices: ['quiet', 'quietly'], answer: 1, why: '動詞 speak を説明するので副詞 quietly。' },
      { sentence: 'Ken is a very ___ runner.', choices: ['fast', 'fastly'], answer: 0, why: 'fast は形容詞も副詞も fast。fastly という語はない。' },
      { sentence: 'My sister plays the piano very ___.', choices: ['good', 'well'], answer: 1, why: '動詞 plays を説明するので good の副詞 well。' },
    ],
  },
  {
    id: 'too-enough',
    title: 'too ～ to … / ～ enough to …',
    points: ['too ＋形容詞＋ to ～ で「あまりに…なので～できない」。', '形容詞＋ enough to ～ で「～できるほど（十分）…」。enough は形容詞のあとに置く。'],
    examples: [
      { en: 'This box is too heavy to carry.', ja: 'この箱は重すぎて運べない。' },
      { en: 'He is old enough to drive a car.', ja: '彼は車を運転できる年れいだ。' },
    ],
    questions: [
      { sentence: 'The soup is ___ hot to eat now.', choices: ['too', 'enough', 'very'], answer: 0, why: '「熱すぎて食べられない」なので too ～ to。' },
      { sentence: 'She is tall ___ to reach the top shelf.', choices: ['too', 'enough', 'so'], answer: 1, why: '「届くほど背が高い」なので形容詞のあとに enough。' },
      { sentence: 'I was ___ tired to finish my homework.', choices: ['too', 'enough', 'much'], answer: 0, why: '「疲れすぎて終えられなかった」なので too ～ to。' },
    ],
  },
  {
    id: 'want-to',
    title: 'want to ～ / want 人 to ～',
    points: ['want to ～ で「～したい」。', 'want ＋人＋ to ～ で「（人）に～してほしい」。tell 人 to ～（～するように言う）、ask 人 to ～（～するようにたのむ）も同じ形。'],
    examples: [
      { en: 'I want to be a pilot.', ja: '私はパイロットになりたい。' },
      { en: 'My mother wants me to clean my room.', ja: '母は私に部屋をそうじしてほしいと思っている。' },
    ],
    questions: [
      { sentence: 'I want ___ a new bike.', choices: ['buy', 'to buy', 'buying'], answer: 1, why: '「～したい」は want to ＋動詞の原形。' },
      { sentence: 'The teacher told us ___ quiet.', choices: ['be', 'to be', 'being'], answer: 1, why: 'tell ＋人＋ to ～で「～するように言う」。' },
      { sentence: 'I want ___ to help me.', choices: ['you', 'your', 'yours'], answer: 0, why: 'want ＋人＋ to ～。人の部分は目的格 you。' },
    ],
  },
  {
    id: 'reflexive',
    title: '再帰代名詞（myself / yourself など）',
    points: ['「自分自身を・に」は -self（複数は -selves）を使う：myself, yourself, himself, herself, itself, ourselves, themselves。', 'enjoy oneself（楽しむ）、by oneself（ひとりで）、help yourself（自由に取って）などの決まった言い方が多い。'],
    examples: [
      { en: 'We enjoyed ourselves at the party.', ja: '私たちはパーティーで楽しんだ。' },
      { en: 'He made the cake by himself.', ja: '彼はひとりでケーキを作った。' },
    ],
    questions: [
      { sentence: 'Please help ___ to the cookies.', choices: ['you', 'yourself', 'your'], answer: 1, why: 'help yourself で「自由に取って食べてね」。' },
      { sentence: 'She looked at ___ in the mirror.', choices: ['hers', 'herself', 'she'], answer: 1, why: '主語と同じ人（自分自身）を見るので herself。' },
      { sentence: 'The children enjoyed ___ at the beach.', choices: ['themselves', 'them', 'their'], answer: 0, why: 'enjoy oneself で「楽しむ」。主語が複数なので themselves。' },
    ],
  },
  {
    id: 'used-to',
    title: 'used to ～（以前は～だった）',
    points: ['used to ＋動詞の原形 で「以前は～していた（今はちがう）」。', 'be used to ～ing（～に慣れている）とはちがうので注意。'],
    examples: [
      { en: 'I used to live in Hokkaido.', ja: '私は以前北海道に住んでいた。' },
      { en: 'There used to be a big tree here.', ja: '以前ここに大きな木があった。' },
    ],
    questions: [
      { sentence: 'My father used to ___ soccer.', choices: ['play', 'playing', 'played'], answer: 0, why: 'used to のあとは動詞の原形。' },
      { sentence: 'I ___ to be afraid of dogs, but now I love them.', choices: ['use', 'used', 'using'], answer: 1, why: '「以前は～だった」は used to。' },
      { sentence: 'There ___ to be a bookstore near the station.', choices: ['used', 'uses', 'use'], answer: 0, why: 'There used to be ～で「以前は～があった」。' },
    ],
  },
  {
    id: 'if-present',
    title: '条件の if（もし～なら）',
    points: ['if ～ で「もし～なら」。未来のことでも if の中は現在形を使う。', 'if の文が先なら、うしろにコンマを打つ。'],
    examples: [
      { en: 'If it rains tomorrow, we will stay home.', ja: 'もし明日雨なら、家にいます。' },
      { en: 'Call me if you need help.', ja: '助けが必要なら電話してね。' },
    ],
    questions: [
      { sentence: 'If it ___ sunny tomorrow, let\'s go to the beach.', choices: ['is', 'will be', 'was'], answer: 0, why: '未来のことでも if の中は現在形 is。' },
      { sentence: 'If you hurry, you ___ catch the bus.', choices: ['can', 'are', 'were'], answer: 0, why: '「急げばバスに間に合う」は can。' },
      { sentence: '___ you are tired, take a rest.', choices: ['If', 'But', 'So'], answer: 0, why: '「もし疲れているなら」は If。' },
    ],
  },
  {
    id: 'for-since',
    title: 'for と since（現在完了の「〜の間」「〜から」）',
    points: ['for ＋期間で「〜の間」（for three years）。', 'since ＋始まった時で「〜から（ずっと）」（since 2020 / since I was ten）。'],
    examples: [
      { en: 'I have lived here for five years.', ja: '私はここに5年間住んでいる。' },
      { en: 'She has played tennis since she was eight.', ja: '彼女は8歳のときからテニスをしている。' },
    ],
    questions: [
      { sentence: 'We have known each other ___ ten years.', choices: ['for', 'since'], answer: 0, why: '「10年間」は期間なので for。' },
      { sentence: 'It has been raining ___ this morning.', choices: ['for', 'since'], answer: 1, why: '「今朝から」は始まった時なので since。' },
      { sentence: 'He has been sick ___ last Monday.', choices: ['for', 'since'], answer: 1, why: '「この前の月曜日から」なので since。' },
    ],
  },
  {
    id: 'it-takes',
    title: 'It takes ＋時間＋ to ～（～するのに…かかる）',
    points: ['It takes ＋時間＋ to ～ で「～するのに（時間が）かかる」。', 'だれにとってかを言うときは It takes ＋人＋時間＋ to ～。たずねるときは How long does it take to ～?'],
    examples: [
      { en: 'It takes ten minutes to walk to school.', ja: '学校まで歩いて10分かかる。' },
      { en: 'How long does it take to get to the station?', ja: '駅までどのくらいかかりますか。' },
    ],
    questions: [
      { sentence: 'It ___ an hour to finish my homework.', choices: ['takes', 'spends', 'has'], answer: 0, why: '「時間がかかる」は It takes。' },
      { sentence: 'How long does it take ___ to Osaka by train?', choices: ['go', 'to go', 'going'], answer: 1, why: 'It takes ～ to ＋動詞の原形。' },
      { sentence: 'It took ___ three hours to clean the room.', choices: ['me', 'my', 'I'], answer: 0, why: 'It takes ＋人（目的格）＋時間。' },
    ],
  },
  {
    id: 'so-that',
    title: 'so ～ that …（とても～なので…）',
    points: ['so ＋形容詞・副詞＋ that ～ で「とても…なので～」。', 'that のあとに結果（どうなったか）を書く。'],
    examples: [
      { en: 'It was so hot that we went swimming.', ja: 'とても暑かったので泳ぎに行った。' },
      { en: 'He ran so fast that nobody could catch him.', ja: '彼はとても速く走ったので、だれも追いつけなかった。' },
    ],
    questions: [
      { sentence: 'The box was ___ heavy that I couldn\'t carry it.', choices: ['so', 'too', 'very'], answer: 0, why: 'so ～ that … で「とても～なので…」。' },
      { sentence: 'She was so tired ___ she went to bed early.', choices: ['that', 'than', 'then'], answer: 0, why: 'so ～ that の that。' },
      { sentence: 'The movie was so funny that we ___ a lot.', choices: ['laughed', 'laugh', 'laughing'], answer: 0, why: '過去の話なので laughed。' },
    ],
  },
  {
    id: 'polite-request',
    title: '間接的なお願い（Could you ～? / Would you mind ～ing?）',
    points: ['Could you ～? で「～していただけますか」（ていねいなお願い）。', 'Would you mind ～ing? は「～していただけませんか」。答えが「いいですよ」なら No, not at all.'],
    examples: [
      { en: 'Could you open the window?', ja: '窓を開けていただけますか。' },
      { en: 'Would you mind closing the door?', ja: 'ドアを閉めていただけませんか。' },
    ],
    questions: [
      { sentence: '___ you tell me the way to the station?', choices: ['Could', 'Must', 'Should'], answer: 0, why: 'ていねいなお願いは Could you ～?' },
      { sentence: 'Would you mind ___ a little?', choices: ['wait', 'waiting', 'to wait'], answer: 1, why: 'mind のあとは ～ing。' },
      { sentence: '"Would you mind helping me?" "No, not at ___."', choices: ['all', 'once', 'last'], answer: 0, why: '「いいですよ」は No, not at all.' },
    ],
  },
  {
    id: 'too-also-either',
    title: 'too / also / either（〜も）',
    points: ['肯定文の「〜も」は too（文の最後）や also（一般動詞の前・be動詞のあと）。', '否定文の「〜も（〜ない）」は either（文の最後）。'],
    examples: [
      { en: 'I like cats. My sister likes cats, too.', ja: '私はネコが好きだ。姉もネコが好きだ。' },
      { en: "I don't eat meat. My brother doesn't eat meat, either.", ja: '私は肉を食べない。兄も食べない。' },
    ],
    questions: [
      { sentence: 'Ken can swim. Aki can swim, ___.', choices: ['too', 'either'], answer: 0, why: '肯定文の「〜も」は too。' },
      { sentence: "I can't sing well. My father can't sing well, ___.", choices: ['too', 'either'], answer: 1, why: '否定文の「〜も」は either。' },
      { sentence: 'She ___ plays the piano.', choices: ['also', 'either'], answer: 0, why: '一般動詞の前に置くのは also。' },
    ],
  },
  {
    id: 'each-every',
    title: 'each / every / all',
    points: ['each と every のあとは単数形の名詞で、動詞も3人称単数（Every student has ～）。', 'all のあとは複数形の名詞か数えられない名詞（all students / all the water）。'],
    examples: [
      { en: 'Every student has a tablet.', ja: 'どの生徒もタブレットを持っている。' },
      { en: 'All the students were happy.', ja: '生徒たちはみんな喜んでいた。' },
    ],
    questions: [
      { sentence: 'Every ___ in this class is kind.', choices: ['student', 'students'], answer: 0, why: 'every のあとは単数形。' },
      { sentence: 'Each person ___ a name card.', choices: ['has', 'have'], answer: 0, why: 'each ＋単数なので has。' },
      { sentence: 'All the ___ were ready.', choices: ['player', 'players'], answer: 1, why: 'all のあとは複数形。' },
    ],
  },
  {
    id: 'had-better',
    title: 'had better / had to（〜したほうがいい／〜しなければならなかった）',
    points: ['had better ＋動詞の原形で「〜したほうがいい（しないとよくない）」。強めのアドバイス。', 'had to ＋動詞の原形は must の過去「〜しなければならなかった」。'],
    examples: [
      { en: 'You had better take an umbrella.', ja: 'かさを持っていったほうがいいよ。' },
      { en: 'I had to wait for an hour.', ja: '1時間待たなければならなかった。' },
    ],
    questions: [
      { sentence: 'It\'s late. You had better ___ home.', choices: ['go', 'going', 'to go'], answer: 0, why: 'had better のあとは動詞の原形。' },
      { sentence: 'Yesterday I ___ to clean my room.', choices: ['must', 'had', 'have'], answer: 1, why: '過去の「〜しなければならなかった」は had to。' },
      { sentence: 'You had better ___ eat too much candy.', choices: ['not', 'no', "don't"], answer: 0, why: '否定は had better not ＋原形。' },
    ],
  },
  {
    id: 'tag-q',
    title: '付加疑問（〜ですよね？）',
    points: ['文の最後に「〜ですよね？」をつける。肯定文には否定の形、否定文には肯定の形をつける。', '主語は代名詞にする（Ken → he）。'],
    examples: [
      { en: "It's hot today, isn't it?", ja: '今日は暑いですよね？' },
      { en: "You don't like carrots, do you?", ja: 'ニンジンは好きじゃないよね？' },
    ],
    questions: [
      { sentence: 'Ken is your friend, ___ he?', choices: ["isn't", 'is', "doesn't"], answer: 0, why: '肯定の be動詞の文なので isn\'t he?' },
      { sentence: 'You can swim, ___ you?', choices: ["can't", 'can', "don't"], answer: 0, why: 'can の肯定文なので can\'t you?' },
      { sentence: "She didn't come, ___ she?", choices: ['did', "didn't", 'does'], answer: 0, why: '否定文なので肯定の did she?' },
    ],
  },
  {
    id: 'what-a',
    title: '感嘆文（What a 〜! / How 〜!）',
    points: ['What a ＋形容詞＋名詞！で「なんて〜な…だろう！」（What a big dog!）。', 'How ＋形容詞（副詞）！で「なんて〜だろう！」（How big!）。'],
    examples: [
      { en: 'What a beautiful sunset!', ja: 'なんて美しい夕日だろう！' },
      { en: 'How fast he runs!', ja: '彼はなんて速く走るんだろう！' },
    ],
    questions: [
      { sentence: '___ a nice day!', choices: ['What', 'How'], answer: 0, why: '後ろに a ＋名詞があるので What。' },
      { sentence: '___ cute!', choices: ['What', 'How'], answer: 1, why: '形容詞だけなので How。' },
      { sentence: 'What ___ interesting book!', choices: ['a', 'an'], answer: 1, why: 'interesting は母音で始まるので an。' },
    ],
  },
  {
    id: 'as-as',
    title: 'as 〜 as …（…と同じくらい〜）',
    points: ['as ＋形容詞・副詞の原級＋ as で「…と同じくらい〜」。', 'not as 〜 as … で「…ほど〜ではない」。'],
    examples: [
      { en: 'Ken is as tall as his father.', ja: 'ケンはお父さんと同じくらいの背の高さだ。' },
      { en: 'This bag is not as heavy as that one.', ja: 'このかばんはあのかばんほど重くない。' },
    ],
    questions: [
      { sentence: 'My cat is as ___ as your dog.', choices: ['big', 'bigger', 'biggest'], answer: 0, why: 'as と as の間は原級。' },
      { sentence: 'I can run as fast ___ Aki.', choices: ['as', 'than', 'so'], answer: 0, why: 'as 〜 as の形。' },
      { sentence: 'Math is not as ___ as English for me.', choices: ['easy', 'easier', 'easiest'], answer: 0, why: 'not as 〜 as でも原級。' },
    ],
  },
  {
    id: 'past-perfect',
    title: '過去完了（had ＋過去分詞）',
    points: ['過去のある時点より前に「もう〜していた」「（それまでずっと）〜していた」ことを表す。', '形は had ＋過去分詞。主語が何でも had を使う。'],
    examples: [
      { en: 'When I got to the station, the train had already left.', ja: '私が駅に着いたとき、電車はもう出発していた。' },
      { en: 'She had never seen snow before she moved to Hokkaido.', ja: '彼女は北海道に引っ越すまで、雪を見たことがなかった。' },
    ],
    questions: [
      { sentence: 'When we arrived, the movie ___ already started.', choices: ['has', 'had', 'have'], answer: 1, why: '着いた（過去）より前に始まっていたので had ＋過去分詞。' },
      { sentence: 'I had ___ my homework before dinner.', choices: ['finish', 'finishing', 'finished'], answer: 2, why: 'had のあとは過去分詞 finished。' },
      { sentence: 'He ___ lived in Osaka for ten years before he came here.', choices: ['had', 'has', 'was'], answer: 0, why: 'ここに来た（過去）までの10年間なので had lived。' },
    ],
  },
  {
    id: 'relative-adverb',
    title: '関係副詞（where / when）',
    points: ['where は「場所」を表す名詞のあとに置き、「〜する（場所）」と説明を足す。', 'when は「時」を表す名詞のあとに置き、「〜する（時・日）」と説明を足す。'],
    examples: [
      { en: 'This is the park where I played as a child.', ja: 'ここは私が子どものころに遊んだ公園です。' },
      { en: 'I remember the day when we first met.', ja: '私たちがはじめて会った日をおぼえています。' },
    ],
    questions: [
      { sentence: 'That is the house ___ my grandmother lives.', choices: ['where', 'when', 'which'], answer: 0, why: 'the house（場所）のあとで「住んでいる」と続くので where。' },
      { sentence: 'Summer is the season ___ we can swim in the sea.', choices: ['where', 'when', 'who'], answer: 1, why: 'the season（時）を説明するので when。' },
      { sentence: 'Do you know a shop ___ I can buy cheap shoes?', choices: ['where', 'when', 'what'], answer: 0, why: 'a shop（場所）で「買える」と続くので where。' },
    ],
  },
  {
    id: 'feeling-to',
    title: '感情の原因の不定詞（glad to 〜）',
    points: ['be glad / happy / sad / sorry / surprised ＋ to ＋動詞の原形で、「〜して（うれしい・悲しい・おどろいた）」と感情の原因を表す。', 'to のあとは必ず動詞の原形。'],
    examples: [
      { en: 'I was glad to see my old friend.', ja: '私は昔の友だちに会えてうれしかった。' },
      { en: 'She was surprised to hear the news.', ja: '彼女はその知らせを聞いておどろいた。' },
    ],
    questions: [
      { sentence: 'I am happy ___ you again.', choices: ['meet', 'to meet', 'meeting'], answer: 1, why: '「会えてうれしい」は happy to ＋原形。' },
      { sentence: 'We were sad ___ goodbye to our teacher.', choices: ['to say', 'said', 'says'], answer: 0, why: '感情（sad）の原因は to ＋原形。' },
      { sentence: 'He was surprised to ___ the big dog.', choices: ['saw', 'seeing', 'see'], answer: 2, why: 'to のあとは動詞の原形 see。' },
    ],
  },
  {
    id: 'imperative-and-or',
    title: '命令文＋and / or（〜しなさい、そうすれば／さもないと）',
    points: ['命令文, and …「〜しなさい、そうすれば…」（よい結果）。', '命令文, or …「〜しなさい、さもないと…」（よくない結果）。'],
    examples: [
      { en: 'Get up now, and you will catch the first train.', ja: '今起きなさい、そうすれば始発電車に乗れるよ。' },
      { en: 'Hurry up, or you will be late for school.', ja: '急ぎなさい、さもないと学校に遅れるよ。' },
    ],
    questions: [
      { sentence: 'Study hard, ___ you will pass the test.', choices: ['and', 'or', 'but'], answer: 0, why: '「そうすれば合格する」とよい結果なので and。' },
      { sentence: 'Take an umbrella, ___ you will get wet.', choices: ['and', 'or', 'so'], answer: 1, why: '「さもないとぬれる」とよくない結果なので or。' },
      { sentence: 'Turn right at the corner, ___ you will see the station.', choices: ['or', 'and', 'but'], answer: 1, why: '「そうすれば駅が見える」なので and。' },
    ],
  },
  {
    id: 'one-of-the',
    title: '最上級 one of the 〜（もっとも〜なものの1つ）',
    points: ['one of the ＋最上級＋名詞の複数形で「もっとも〜な…の1つ（1人）」。', '名詞は必ず複数形にする（one of the best players）。'],
    examples: [
      { en: 'Kyoto is one of the most famous cities in Japan.', ja: '京都は日本でもっとも有名な都市の1つです。' },
      { en: 'He is one of the fastest runners on our team.', ja: '彼は私たちのチームでもっとも足の速い選手の1人です。' },
    ],
    questions: [
      { sentence: 'This is one of the ___ books in the library.', choices: ['more old', 'much old', 'oldest'], answer: 2, why: 'one of the ＋最上級。' },
      { sentence: 'She is one of the best ___ in our class.', choices: ['singer', 'singers', 'singing'], answer: 1, why: 'one of the 〜 のあとの名詞は複数形。' },
      { sentence: 'Soccer is one of the ___ popular sports in the world.', choices: ['mostly', 'most', 'much'], answer: 1, why: 'popular の最上級は most popular。' },
    ],
  },
  {
    id: 'perfect-experience',
    title: '現在完了の経験（ever / never / have been to）',
    points: ['Have you ever ＋過去分詞 〜? で「今までに〜したことがありますか」。', 'have never ＋過去分詞で「一度も〜したことがない」。「〜に行ったことがある」は have been to 〜。'],
    examples: [
      { en: 'Have you ever seen a rainbow at night?', ja: '今までに夜のにじを見たことがありますか。' },
      { en: 'I have never been to a foreign country.', ja: '私は一度も外国に行ったことがありません。' },
    ],
    questions: [
      { sentence: 'Have you ___ eaten Thai food?', choices: ['ever', 'never', 'yet'], answer: 0, why: '「今までに〜したことがありますか」は Have you ever 〜?。' },
      { sentence: 'I have ___ climbed Mt. Fuji. I want to try it someday.', choices: ['ever', 'never', 'already'], answer: 1, why: '「一度も〜ない（いつか挑戦したい）」なので never。' },
      { sentence: 'My sister has ___ to London three times.', choices: ['gone', 'been', 'went'], answer: 1, why: '「〜に行ったことがある」は have been to。has gone to は「行ってしまった（今いない）」。' },
    ],
  },
  {
    id: 'passive-q-neg',
    title: '受け身の疑問文・否定文（Is it made 〜? / It is not 〜）',
    points: ['受け身の疑問文は be動詞を主語の前に出す：Is this room cleaned every day?', '否定文は be動詞のあとに not：This song is not known in Japan.'],
    examples: [
      { en: 'Was this picture painted by your grandfather?', ja: 'この絵はあなたのおじいさんによってかかれたのですか。' },
      { en: 'These cookies are not sold at the supermarket.', ja: 'このクッキーはスーパーでは売られていません。' },
    ],
    questions: [
      { sentence: '___ English spoken in Australia?', choices: ['Does', 'Is', 'Do'], answer: 1, why: '受け身（be ＋過去分詞）の疑問文は be動詞を前に出す。主語 English は単数なので Is。' },
      { sentence: 'The window was ___ broken by the wind.', choices: ['not', "don't", "didn't"], answer: 0, why: '受け身の否定文は be動詞のあとに not。' },
      { sentence: 'Were these photos ___ in Hokkaido?', choices: ['take', 'took', 'taken'], answer: 2, why: '受け身なので過去分詞 taken。' },
    ],
  },
  {
    id: 'gerund-idioms',
    title: '動名詞を使う表現（look forward to 〜ing など）',
    points: ['look forward to 〜ing「〜するのを楽しみにする」、How about 〜ing?「〜するのはどう？」、be good at 〜ing「〜するのが得意だ」。', '前置詞（to / about / at など）のあとに動詞が来るときは 〜ing の形にする。'],
    examples: [
      { en: 'I am looking forward to seeing you again.', ja: 'またあなたに会えるのを楽しみにしています。' },
      { en: 'How about going to the zoo this weekend?', ja: '今週末、動物園に行くのはどう？' },
    ],
    questions: [
      { sentence: 'We are looking forward to ___ the concert.', choices: ['go', 'going', 'went'], answer: 1, why: 'look forward to のあとは 〜ing（to は前置詞）。' },
      { sentence: 'How about ___ lunch together?', choices: ['having', 'have', 'to have'], answer: 0, why: 'How about のあとは 〜ing。' },
      { sentence: 'My sister is good at ___ pictures.', choices: ['draw', 'drew', 'drawing'], answer: 2, why: '前置詞 at のあとなので drawing。' },
    ],
  },
  {
    id: 'causative',
    title: '使役（make / let / help ＋人＋動詞の原形）',
    points: ['make ＋人＋原形「（むりやり）〜させる」、let ＋人＋原形「（自由に）〜させてあげる」、help ＋人＋原形「人が〜するのを手伝う」。', '人のあとの動詞は to をつけない原形（help だけは help 人 to 〜 も使える）。'],
    examples: [
      { en: 'My mother made me clean my room.', ja: '母は私に部屋をそうじさせた。' },
      { en: 'Let me carry your bag.', ja: 'あなたのかばんを運ばせてください。' },
    ],
    questions: [
      { sentence: 'My father let me ___ his camera.', choices: ['use', 'to use', 'using'], answer: 0, why: 'let ＋人＋動詞の原形。' },
      { sentence: 'The sad movie made her ___.', choices: ['cried', 'cry', 'to cry'], answer: 1, why: 'make ＋人＋動詞の原形で「〜させる」。' },
      { sentence: 'Can you help me ___ this box?', choices: ['moving', 'moved', 'move'], answer: 2, why: 'help ＋人＋動詞の原形で「人が〜するのを手伝う」。' },
    ],
  },
  {
    id: 'wh-do-you-think',
    title: '疑問詞＋do you think 〜?（だれ・何だと思いますか）',
    points: ['「だれが〜すると思いますか」は Who do you think ＋動詞 〜? のように、疑問詞を文の先頭に出す。', 'do you think のあとはふつうの文の語順（主語＋動詞）になる。Yes / No では答えない。'],
    examples: [
      { en: 'What do you think he wants for his birthday?', ja: '彼は誕生日に何がほしいと思いますか。' },
      { en: 'Who do you think will win the game?', ja: 'だれが試合に勝つと思いますか。' },
    ],
    questions: [
      { sentence: 'Where do you think ___?', choices: ['she lives', 'does she live', 'lives she'], answer: 0, why: 'do you think のあとは主語＋動詞の語順。' },
      { sentence: '___ do you think is the best player on the team?', choices: ['Who', 'Does', 'Are'], answer: 0, why: '疑問詞 who を文の先頭に出す。' },
      { sentence: 'How old do you think ___?', choices: ['is this tree', 'this tree is', 'does this tree'], answer: 1, why: 'do you think のあとはふつうの語順 this tree is。' },
    ],
  },
  {
    id: 'if-whether',
    title: 'if / whether「〜かどうか」',
    points: ['I don\'t know if 〜. / I wonder whether 〜. で「〜かどうか（わからない・と思う）」。', 'このときの if のあとは、未来のことでも will を使って言える（「もし〜なら」の if とはちがう）。'],
    examples: [
      { en: "I don't know if he will come to the party.", ja: '彼がパーティーに来るかどうかわからない。' },
      { en: 'Can you check whether the store is open?', ja: 'その店が開いているかどうか確かめてくれる？' },
    ],
    questions: [
      { sentence: 'I wonder ___ it will rain tomorrow.', choices: ['if', 'that', 'what'], answer: 0, why: '「〜かどうか」は if（whether）。' },
      { sentence: "I'm not sure ___ she likes cats.", choices: ['whether', 'which', 'who'], answer: 0, why: '「好きかどうか」なので whether。' },
      { sentence: 'Please ask him if he ___ us tomorrow.', choices: ['help', 'will help', 'helping'], answer: 1, why: '「〜かどうか」の if のあとは、未来なら will を使う。' },
    ],
  },
  {
    id: 'relative-omit',
    title: '関係代名詞の省略（the book I read）',
    points: ['目的語になる関係代名詞（which / that / who）は省略できる：the book (that) I read。', '名詞のすぐあとに「主語＋動詞」が続いたら、関係代名詞が省略されていると考える。'],
    examples: [
      { en: 'This is the cake my grandmother made.', ja: 'これは祖母が作ったケーキです。' },
      { en: 'The boy I met yesterday was very kind.', ja: '昨日私が会った男の子はとても親切だった。' },
    ],
    questions: [
      { sentence: 'The movie we ___ last night was exciting.', choices: ['saw', 'seeing', 'see'], answer: 0, why: 'the movie (that) we saw ＝「私たちが昨夜見た映画」。過去なので saw。' },
      { sentence: 'Is this the bag ___ you lost?', choices: ['who', 'you', '（何も入らない）'], answer: 2, why: '目的語の関係代名詞は省略できるので、the bag you lost でよい。' },
      { sentence: 'The song she sang ___ beautiful.', choices: ['were', 'was', 'be'], answer: 1, why: '主語は the song（単数）、過去なので was。' },
    ],
  },
  {
    id: 'it-of-to',
    title: 'It is 〜 of 人 to …（…するとは人は〜だ）',
    points: ['kind / nice / careless など「人の性質」を表す形容詞のときは、It is 〜 of 人 to ＋原形 を使う。', 'easy / difficult など「物事の性質」のときは for 人（It is easy for me to …）。'],
    examples: [
      { en: 'It is very kind of you to help me.', ja: '手伝ってくれるなんて、あなたはとても親切ですね。' },
      { en: 'It was careless of him to leave his bag on the train.', ja: '電車にかばんを置き忘れるなんて、彼は不注意だった。' },
    ],
    questions: [
      { sentence: 'It is nice ___ you to say so.', choices: ['for', 'of', 'to'], answer: 1, why: 'nice は人の性質なので of 人。' },
      { sentence: 'It is difficult ___ me to get up early.', choices: ['of', 'for', 'with'], answer: 1, why: 'difficult は物事の性質なので for 人。' },
      { sentence: 'It was brave of her ___ the child.', choices: ['save', 'saving', 'to save'], answer: 2, why: 'of 人 のあとは to ＋原形。' },
    ],
  },
  {
    id: 'nobody-nothing',
    title: '否定の nobody / nothing / never',
    points: ['nobody「だれも〜ない」、nothing「何も〜ない」、never「一度も〜ない」は、それだけで否定の意味になる。', 'not といっしょには使わない（× I don\'t know nothing.）。nobody / nothing は3人称単数あつかい。'],
    examples: [
      { en: 'Nobody knows the answer.', ja: 'だれもその答えを知らない。' },
      { en: 'There is nothing in the box.', ja: '箱の中には何もない。' },
    ],
    questions: [
      { sentence: 'Nobody ___ his phone number.', choices: ['know', 'knows', 'knowing'], answer: 1, why: 'nobody は3人称単数あつかいなので knows。' },
      { sentence: 'I had ___ to eat this morning.', choices: ['nothing', 'anything', 'no'], answer: 0, why: '「何も食べるものがなかった」は had nothing to eat（not がないので nothing）。' },
      { sentence: "I don't have ___ money with me.", choices: ['no', 'any', 'nothing'], answer: 1, why: "not があるときは any（don't have any 〜 ＝ 少しも〜ない）。" },
    ],
  },
  {
    id: 'though',
    title: 'though / although（〜だけれども）',
    points: ['though / although ＋文で「〜だけれども・〜なのに」。although のほうが少しかたい言い方。', 'but とちがい、文の前半にも後半にも置ける（Though it was cold, we went out. ＝ We went out though it was cold.）。'],
    examples: [
      { en: 'Although he was tired, he finished his homework.', ja: '彼はつかれていたけれど、宿題を終わらせた。' },
      { en: "We enjoyed the trip though it rained every day.", ja: '毎日雨がふったけれど、私たちは旅行を楽しんだ。' },
    ],
    questions: [
      { sentence: '___ it was very hot, they played soccer outside.', choices: ['Because', 'Although', 'So'], answer: 1, why: '「とても暑かったけれど」なので Although。' },
      { sentence: 'She went to school ___ she had a slight cold.', choices: ['though', 'because of', 'so'], answer: 0, why: '「少しかぜぎみだったのに」なので though（あとに文が続く）。' },
      { sentence: 'Though the test was difficult, ___', choices: ['I got a good score.', 'but I got a good score.', 'so I got a good score.'], answer: 0, why: 'though のある文には but や so を重ねない。' },
    ],
  },
  {
    id: 'prep-relative',
    title: '前置詞＋関係代名詞（the house in which 〜）',
    points: ['関係代名詞 which / whom の前に前置詞を置くことがある：the town in which I live ＝ the town which I live in。', '前置詞のあとの関係代名詞は that を使えない（× in that）。'],
    examples: [
      { en: 'This is the box in which I keep my letters.', ja: 'これは私が手紙をしまっている箱です。' },
      { en: 'The girl with whom I talked was from Canada.', ja: '私が話した女の子はカナダ出身だった。' },
    ],
    questions: [
      { sentence: 'This is the town in ___ my father was born.', choices: ['that', 'which', 'what'], answer: 1, why: '前置詞 in のあとは which（that は使えない）。' },
      { sentence: 'The friend ___ whom I went to the concert is Ken.', choices: ['for', 'with', 'by'], answer: 1, why: 'go to the concert with 人 なので with whom。' },
      { sentence: 'The chair on which you are ___ is very old.', choices: ['sit', 'sitting', 'sat'], answer: 1, why: 'you are sitting on the chair の形。are のあとなので sitting。' },
    ],
  },
  {
    id: 'some-any',
    title: 'some と any の使い分け',
    points: ['肯定文では some「いくつか・いくらか」、疑問文・否定文では any を使う。', 'ただし、人に物をすすめたり、たのんだりする疑問文では some を使う（Would you like some tea?）。'],
    examples: [
      { en: 'I have some questions about the homework.', ja: '宿題についていくつか質問があります。' },
      { en: "There aren't any eggs in the fridge.", ja: '冷蔵庫には卵が1つもない。' },
    ],
    questions: [
      { sentence: 'Do you have ___ pets?', choices: ['much', 'any', 'a'], answer: 1, why: 'ふつうの疑問文なので any。' },
      { sentence: 'Would you like ___ cookies?', choices: ['some', 'much', 'a'], answer: 0, why: '人にすすめる疑問文なので some。' },
      { sentence: "We didn't see ___ birds in the park.", choices: ['some', 'any', 'no'], answer: 1, why: "否定文（didn't）なので any。" },
    ],
  },
  {
    id: 'not-only',
    title: 'not only A but also B（A だけでなく B も）',
    points: ['not only A but also B で「A だけでなく B も」。B のほうに重点がある。', '主語に使うと、動詞は B に合わせる（Not only my sister but also I am 〜）。'],
    examples: [
      { en: 'She can speak not only English but also Chinese.', ja: '彼女は英語だけでなく中国語も話せる。' },
      { en: 'This park is popular not only with children but also with adults.', ja: 'この公園は子どもだけでなく大人にも人気がある。' },
    ],
    questions: [
      { sentence: 'He is not only kind ___ also funny.', choices: ['and', 'but', 'or'], answer: 1, why: 'not only A but also B の形。' },
      { sentence: 'Not only Ken but also his parents ___ coming to the party.', choices: ['is', 'are', 'am'], answer: 1, why: '動詞は B（his parents）に合わせるので are。' },
      { sentence: 'This app is useful not ___ for students but also for teachers.', choices: ['only', 'just a', 'very'], answer: 0, why: 'not only 〜 but also … の形。' },
    ],
  },
  {
    id: 'emotion-participle',
    title: '感情を表す分詞（surprising / surprised）',
    points: ['-ing の形は「（人を）〜させるような」：ものごとの性質を表す（The news was surprising.）。', '-ed の形は「（人が）〜させられた＝〜した気持ち」：人の気持ちを表す（I was surprised.）。'],
    examples: [
      { en: 'The movie was exciting.', ja: 'その映画はわくわくするものだった。' },
      { en: 'I was excited about the movie.', ja: '私はその映画にわくわくした。' },
    ],
    questions: [
      { sentence: 'The story was very ___.', choices: ['interesting', 'interested', 'interest'], answer: 0, why: '話が「おもしろい（興味をひく）」性質なので -ing。' },
      { sentence: 'I was ___ to hear the news.', choices: ['surprising', 'surprised', 'surprise'], answer: 1, why: '私が「おどろいた」気持ちなので -ed。' },
      { sentence: 'She felt ___ after the long walk.', choices: ['tiring', 'tired', 'tire'], answer: 1, why: '彼女が「つかれた」気持ちなので -ed。' },
    ],
  },
  {
    id: 'perception',
    title: '知覚動詞（see / hear ＋人＋動詞の原形・-ing）',
    points: ['see / hear / watch ＋人（もの）＋動詞の原形で「人が〜するのを見る・聞く」（最初から最後まで）。', '動詞の原形のかわりに -ing を使うと「人が〜しているところを見る・聞く」（とちゅうの一部）。'],
    examples: [
      { en: 'I saw him cross the street.', ja: '私は彼が通りをわたるのを見た。' },
      { en: 'We heard the birds singing.', ja: '私たちは鳥がさえずっているのを聞いた。' },
    ],
    questions: [
      { sentence: 'I heard someone ___ my name.', choices: ['call', 'to call', 'called'], answer: 0, why: 'hear ＋人＋動詞の原形。to はつけない。' },
      { sentence: 'She saw a cat ___ on the roof.', choices: ['sleeping', 'to sleep', 'slept'], answer: 0, why: '「ねているところを見た」なので -ing。' },
      { sentence: 'We watched the children ___ soccer.', choices: ['to play', 'play', 'played'], answer: 1, why: 'watch ＋人＋動詞の原形。' },
    ],
  },
  {
    id: 'to-adjective',
    title: '不定詞の形容詞用法（something to drink）',
    points: ['名詞（代名詞）のあとに to ＋動詞の原形を置くと、「〜するための・〜すべき」と前の名詞を説明できる。', 'something / anything / nothing のあとにもよく使う（something to eat ＝何か食べるもの）。'],
    examples: [
      { en: 'I want something to drink.', ja: '何か飲むものがほしい。' },
      { en: 'She has a lot of homework to do today.', ja: '彼女は今日やるべき宿題がたくさんある。' },
    ],
    questions: [
      { sentence: 'Do you have anything ___ eat?', choices: ['to', 'for', 'of'], answer: 0, why: 'anything to eat で「何か食べるもの」。' },
      { sentence: 'There are many places to ___ in Kyoto.', choices: ['visiting', 'visit', 'visited'], answer: 1, why: 'to のあとは動詞の原形 visit。' },
      { sentence: 'I had no time ___ breakfast this morning.', choices: ['eat', 'eating', 'to eat'], answer: 2, why: 'time to eat で「食べる時間」。' },
    ],
  },
  {
    id: 'by-until',
    title: 'by と until（〜までに・〜まで）',
    points: ['by は「〜までに」：その時までに1回終わればよい（締め切り）。', 'until（till）は「〜まで（ずっと）」：その時まで同じ状態や動作が続く。'],
    examples: [
      { en: 'Please finish this report by Friday.', ja: '金曜日までにこのレポートを終えてください。' },
      { en: 'I waited for him until six.', ja: '私は6時まで彼を待った。' },
    ],
    questions: [
      { sentence: 'You must come home ___ seven o\'clock.', choices: ['by', 'until', 'for'], answer: 0, why: '7時「までに」帰る（締め切り）なので by。' },
      { sentence: 'It rained ___ noon.', choices: ['by', 'until', 'since'], answer: 1, why: '正午「まで（ずっと）」雨が続いたので until。' },
      { sentence: 'Can you return the book ___ next Monday?', choices: ['until', 'by', 'during'], answer: 1, why: '次の月曜日「までに」返すので by。' },
    ],
  },
  {
    id: 'whose',
    title: '関係代名詞 whose（〜の…が）',
    points: ['whose ＋名詞で、前の人やものを「その〜が（を）…する」と説明できる。', 'whose は his / her / its / their の代わりになる（a girl whose father is a doctor ＝お父さんが医者の女の子）。'],
    examples: [
      { en: 'I have a friend whose sister is a singer.', ja: '私にはお姉さんが歌手の友だちがいる。' },
      { en: 'Look at the house whose roof is red.', ja: '屋根が赤いあの家を見て。' },
    ],
    questions: [
      { sentence: 'He is the boy ___ bike was stolen.', choices: ['who', 'whose', 'which'], answer: 1, why: '「その子の自転車が」なので whose ＋名詞。' },
      { sentence: 'I know a woman whose son ___ in Canada.', choices: ['live', 'lives', 'living'], answer: 1, why: 'whose son（その息子が）が主語なので三人称単数の lives。' },
      { sentence: 'This is a dog ___ eyes are blue.', choices: ['whose', 'that', 'what'], answer: 0, why: '「その犬の目が」なので whose。' },
    ],
  },
  {
    id: 'relative-what',
    title: '関係代名詞 what（〜するもの・こと）',
    points: ['what は「〜するもの・こと」という意味で、the thing(s) which と同じはたらきをする。', 'what の前には名詞を置かない（the thing what は×）。'],
    examples: [
      { en: 'What he said was true.', ja: '彼が言ったことは本当だった。' },
      { en: 'This is what I wanted.', ja: 'これは私がほしかったものだ。' },
    ],
    questions: [
      { sentence: 'Please show me ___ you bought.', choices: ['whose', 'that', 'what'], answer: 2, why: '前に名詞がなく「買ったもの」なので what。' },
      { sentence: 'I could not understand ___ the teacher said.', choices: ['what', 'who', 'whose'], answer: 0, why: '「先生が言ったこと」なので what。' },
      { sentence: 'This is the book ___ I wanted.', choices: ['what', 'which', 'whose'], answer: 1, why: '前に名詞 the book があるので which（what は使えない）。' },
    ],
  },
  {
    id: 'times-as',
    title: '倍数表現（twice as 〜 as …）',
    points: ['twice as 〜 as … で「…の2倍〜」。3倍以上は three times as 〜 as … のように「数＋times」を使う。', '「半分」は half as 〜 as …。as と as の間は形容詞・副詞の原級（もとの形）。'],
    examples: [
      { en: 'This bridge is twice as long as that one.', ja: 'この橋はあの橋の2倍の長さだ。' },
      { en: 'My father has three times as many books as I do.', ja: '父は私の3倍の本を持っている。' },
    ],
    questions: [
      { sentence: 'This box is ___ as heavy as that one.', choices: ['two', 'twice', 'second'], answer: 1, why: '「2倍」は twice as 〜 as。' },
      { sentence: 'Her room is three ___ as large as mine.', choices: ['times', 'time', 'twice'], answer: 0, why: '3倍以上は「数＋times」。' },
      { sentence: 'The new train is twice as ___ as the old one.', choices: ['faster', 'fastest', 'fast'], answer: 2, why: 'as と as の間は原級 fast。' },
    ],
  },
  {
    id: 'while',
    title: '接続詞 while（〜している間に）',
    points: ['while ＋主語＋動詞で「〜している間に」。進行形といっしょによく使う（while I was reading）。', 'during は前置詞なので後ろは名詞（during the summer）、while は後ろに主語と動詞が来る。'],
    examples: [
      { en: 'Someone called me while I was taking a bath.', ja: 'おふろに入っている間に、だれかが電話をくれた。' },
      { en: 'Please wait here while I get my bag.', ja: 'かばんを取ってくる間、ここで待っていてください。' },
    ],
    questions: [
      { sentence: 'I fell asleep ___ I was watching TV.', choices: ['during', 'while', 'for'], answer: 1, why: '後ろに主語と動詞（I was watching）があるので while。' },
      { sentence: 'We visited many temples ___ our trip to Kyoto.', choices: ['while', 'during', 'when'], answer: 1, why: '後ろが名詞（our trip）なので前置詞 during。' },
      { sentence: 'While my mother ___ dinner, I set the table.', choices: ['was cooking', 'cooking', 'cook'], answer: 0, why: '過去の「〜している間」なので過去進行形 was cooking。' },
    ],
  },
  {
    id: 'perfect-done',
    title: '現在完了の完了（just / already / yet）',
    points: ['have（has）＋過去分詞で「（ちょうど・もう）〜してしまった」と、終わったことを表す。', 'just（ちょうど）・already（もう）は have と過去分詞の間。yet は文の最後で、疑問文では「もう」、否定文では「まだ」。'],
    examples: [
      { en: 'I have just finished my homework.', ja: '私はちょうど宿題を終えたところだ。' },
      { en: 'Has the bus left yet? — No, it has not left yet.', ja: 'バスはもう出発しましたか。—いいえ、まだ出発していません。' },
    ],
    questions: [
      { sentence: 'She has ___ cleaned her room.', choices: ['yet', 'already', 'ever'], answer: 1, why: '肯定文で「もう〜した」は already（have と過去分詞の間）。' },
      { sentence: 'Have you eaten lunch ___?', choices: ['still', 'just', 'yet'], answer: 2, why: '疑問文の「もう」は文の最後に yet。' },
      { sentence: 'I have not read the letter ___.', choices: ['yet', 'already', 'just'], answer: 0, why: '否定文の「まだ（〜していない）」は yet。' },
    ],
  },
  {
    id: 'shall',
    title: 'Shall I 〜? / Shall we 〜?',
    points: ['Shall I 〜? は「（私が）〜しましょうか」と申し出る言い方。', 'Shall we 〜? は「（いっしょに）〜しましょうか」とさそう言い方。答えは Yes, let\'s. / No, let\'s not. など。'],
    examples: [
      { en: 'Shall I open the window? — Yes, please.', ja: '窓を開けましょうか。—はい、お願いします。' },
      { en: "Shall we go to the movies? — Yes, let's.", ja: '映画に行きましょうか。—ええ、そうしましょう。' },
    ],
    questions: [
      { sentence: 'Your bag looks heavy. ___ I carry it for you?', choices: ['Shall', 'Will', 'Do'], answer: 0, why: '「（私が）〜しましょうか」は Shall I 〜?。' },
      { sentence: "Shall we play tennis after school? — Yes, ___.", choices: ['we shall', "let's", 'please'], answer: 1, why: 'Shall we 〜? には Yes, let\'s. と答える。' },
      { sentence: 'Shall I ___ you with your homework?', choices: ['help', 'helping', 'to help'], answer: 0, why: 'Shall I のあとは動詞の原形。' },
    ],
  },
  {
    id: 'as-soon-as',
    title: '接続詞 as soon as（〜するとすぐに）',
    points: ['as soon as ＋主語＋動詞で「〜するとすぐに」。', '未来のことでも、as soon as の中は現在形を使う（as soon as I get home）。'],
    examples: [
      { en: 'I will call you as soon as I arrive.', ja: '着いたらすぐにあなたに電話します。' },
      { en: 'As soon as the bell rang, the students ran outside.', ja: 'ベルが鳴るとすぐに、生徒たちは外へかけ出した。' },
    ],
    questions: [
      { sentence: 'Please text me as soon ___ you get home.', choices: ['as', 'so', 'than'], answer: 0, why: 'as soon as 〜 の形。' },
      { sentence: 'I will start my homework as soon as dinner ___.', choices: ['will end', 'ends', 'ended'], answer: 1, why: '未来のことでも as soon as の中は現在形 ends。' },
      { sentence: 'As soon as she ___ the news, she began to cry.', choices: ['hears', 'heard', 'hearing'], answer: 1, why: '過去の話なので過去形 heard。' },
    ],
  },
  {
    id: 'prep-phrase',
    title: '前置詞のまとまりで名詞を説明（the book on the desk）',
    points: ['前置詞＋名詞のまとまりを名詞のうしろに置くと、「〜にある・〜の」と前の名詞を説明できる。', 'the girl with long hair（長いかみの女の子）のように、人の様子も表せる。'],
    examples: [
      { en: 'The book on the desk is mine.', ja: '机の上の本は私のものだ。' },
      { en: 'Do you know the boy with a red cap?', ja: '赤いぼうしをかぶった男の子を知っていますか。' },
    ],
    questions: [
      { sentence: 'The pictures ___ the wall are beautiful.', choices: ['on', 'of', 'to'], answer: 0, why: '「かべに（かかっている）」は on the wall。' },
      { sentence: 'The girl ___ glasses is my sister.', choices: ['at', 'with', 'by'], answer: 1, why: '「メガネをかけた」は with glasses。' },
      { sentence: 'The cat under the table ___ sleeping.', choices: ['are', 'is', 'am'], answer: 1, why: '主語は The cat（単数）なので is。under the table は説明の部分。' },
    ],
  },
  {
    id: 'few-little',
    title: 'a few / a little（少しの）',
    points: ['a few ＋数えられる名詞の複数形、a little ＋数えられない名詞で「少しの〜（がある）」。', 'a をとった few / little は「ほとんど〜ない」という意味になる。'],
    examples: [
      { en: 'I have a few friends in Canada.', ja: '私にはカナダに少し友だちがいる。' },
      { en: 'There is a little milk in the bottle.', ja: 'びんに牛乳が少し入っている。' },
    ],
    questions: [
      { sentence: 'I bought a ___ apples at the store.', choices: ['few', 'little', 'much'], answer: 0, why: 'apples は数えられる名詞の複数形なので a few。' },
      { sentence: 'Can I have a ___ water, please?', choices: ['few', 'little', 'many'], answer: 1, why: 'water は数えられない名詞なので a little。' },
      { sentence: 'He was sad because he had ___ friends at his new school.', choices: ['a few', 'few', 'a little'], answer: 1, why: '「ほとんどいない（だから悲しい）」なので a のない few。' },
    ],
  },
  {
    id: 'prep-gerund',
    title: '前置詞＋動名詞（without 〜ing / before 〜ing）',
    points: ['前置詞のあとに動詞を置くときは -ing 形（動名詞）にする。', 'without 〜ing（〜しないで）、before 〜ing（〜する前に）、after 〜ing（〜したあとで）、by 〜ing（〜することによって）などがよく使われる。'],
    examples: [
      { en: 'He left without saying goodbye.', ja: '彼はさよならを言わずに去った。' },
      { en: 'Wash your hands before eating.', ja: '食べる前に手を洗いなさい。' },
    ],
    questions: [
      { sentence: 'She went out without ___ breakfast.', choices: ['eat', 'eating', 'to eat'], answer: 1, why: '前置詞 without のあとは動名詞 eating。' },
      { sentence: 'Brush your teeth before ___ to bed.', choices: ['going', 'go', 'went'], answer: 0, why: '前置詞 before のあとは動名詞 going。' },
      { sentence: 'You can learn English ___ watching movies.', choices: ['by', 'with', 'of'], answer: 0, why: 'by 〜ing で「〜することによって」。' },
    ],
  },
  {
    id: 'good-better',
    title: 'good / well の比較（better・best）',
    points: ['good（よい）・well（じょうずに）は、比較級が better、最上級が best と形が変わる。', 'like A better than B で「B より A が好き」、like A the best で「A がいちばん好き」。'],
    examples: [
      { en: 'Your idea is better than mine.', ja: 'あなたの考えは私のよりよい。' },
      { en: 'I like summer the best of all seasons.', ja: '私はすべての季節の中で夏がいちばん好きだ。' },
    ],
    questions: [
      { sentence: 'She sings ___ than her sister.', choices: ['more well', 'better', 'gooder'], answer: 1, why: 'well の比較級は better。' },
      { sentence: 'This is the ___ movie I have ever seen.', choices: ['best', 'better', 'most good'], answer: 0, why: 'good の最上級は best。' },
      { sentence: 'Which do you like ___, cats or dogs?', choices: ['good', 'better', 'well'], answer: 1, why: '2つをくらべるので better。' },
    ],
  },
  {
    id: 'possessive',
    title: '名詞の所有格（Ken\'s / the name of 〜）',
    points: ['人や動物には \'s をつけて「〜の」を表す（Ken\'s bag、my mother\'s car）。-s で終わる複数形は \' だけ（my parents\' room）。', 'ものには of を使うことが多い（the name of this flower、the top of the mountain）。'],
    examples: [
      { en: "This is my brother's bike.", ja: 'これは兄の自転車だ。' },
      { en: 'Do you know the name of this song?', ja: 'この歌の名前を知っていますか。' },
    ],
    questions: [
      { sentence: 'That is ___ umbrella.', choices: ["Yuki's", 'Yuki', 'Yukis'], answer: 0, why: '人の「〜の」は \'s をつける。' },
      { sentence: 'The ___ room is on the second floor.', choices: ["boys's", "boys'", "boy's s"], answer: 1, why: '-s で終わる複数形（boys）には \' だけをつける。' },
      { sentence: 'We climbed to the top ___ the mountain.', choices: ['of', 'in', 'at'], answer: 0, why: 'もの（山）の「〜の」は the top of 〜。' },
    ],
  },
  {
    id: 'both-either',
    title: 'both A and B / either A or B',
    points: ['both A and B で「A と B の両方」。主語にすると複数あつかい（are など）。', 'either A or B で「A か B のどちらか」。neither A nor B は「A も B も〜ない」。'],
    examples: [
      { en: 'Both Ken and Yumi are good at math.', ja: 'ケンもユミも数学が得意だ。' },
      { en: 'You can have either tea or coffee.', ja: '紅茶かコーヒーのどちらかを飲めます。' },
    ],
    questions: [
      { sentence: 'Both my father ___ my mother like cooking.', choices: ['or', 'and', 'but'], answer: 1, why: 'both A and B の形。' },
      { sentence: 'We can go there either by bus ___ by train.', choices: ['or', 'and', 'nor'], answer: 0, why: 'either A or B の形。' },
      { sentence: 'Both Tom and Lisa ___ from Canada.', choices: ['is', 'are', 'am'], answer: 1, why: 'both A and B が主語なので複数あつかいで are。' },
    ],
  },
  {
    id: 'how-adj',
    title: 'How ＋形容詞（How tall / How old / How far）',
    points: ['How ＋形容詞・副詞で「どのくらい〜」と程度をたずねる。', 'How tall（背の高さ）・How old（年れい）・How far（きょり）・How long（長さ・期間）・How often（回数）など。'],
    examples: [
      { en: 'How tall is your brother? — He is 170 centimeters tall.', ja: 'お兄さんの身長はどのくらいですか。—170センチです。' },
      { en: 'How far is it from here to the station?', ja: 'ここから駅までどのくらいの距離ですか。' },
    ],
    questions: [
      { sentence: 'How ___ is your sister? — She is twelve.', choices: ['old', 'tall', 'long'], answer: 0, why: '年れいをたずねるのは How old。' },
      { sentence: 'How ___ do you go to the gym? — Twice a week.', choices: ['long', 'often', 'far'], answer: 1, why: '回数（どのくらいよく）をたずねるのは How often。' },
      { sentence: 'How ___ is Tokyo Skytree? — It is 634 meters tall.', choices: ['tall', 'old', 'many'], answer: 0, why: '高さをたずねるので How tall。' },
    ],
  },
  {
    id: 'whose-which',
    title: 'Whose 〜? / Which 〜?（だれの・どちらの）',
    points: ['Whose ＋名詞 〜? で「だれの〜ですか」。答えは It\'s mine. / It\'s Ken\'s. など。', 'Which ＋名詞 〜? で「どちらの〜ですか」。Which do you like, A or B? のように2つから選ばせる。'],
    examples: [
      { en: "Whose pen is this? — It's mine.", ja: 'これはだれのペンですか。—私のです。' },
      { en: 'Which bus goes to the station?', ja: 'どちらのバスが駅に行きますか。' },
    ],
    questions: [
      { sentence: '___ notebook is this? — It is Yumi\'s.', choices: ['Whose', 'Who', 'Whom'], answer: 0, why: '「だれの」は Whose ＋名詞。' },
      { sentence: '___ do you like better, rice or bread?', choices: ['What', 'Which', 'Whose'], answer: 1, why: '2つから選ばせるときは Which。' },
      { sentence: 'Whose bag is that? — It is ___.', choices: ['my', 'me', 'mine'], answer: 2, why: '「私のもの」は mine。' },
    ],
  },
  {
    id: 'between-among',
    title: 'between A and B / among（〜の間に）',
    points: ['between は「（2つ・2人）の間に」。between A and B の形でよく使う。', 'among は「（3つ以上・大勢）の間で・中で」（popular among students）。'],
    examples: [
      { en: 'The bank is between the post office and the park.', ja: '銀行は郵便局と公園の間にある。' },
      { en: 'This song is popular among young people.', ja: 'この歌は若い人の間で人気がある。' },
    ],
    questions: [
      { sentence: 'Sit ___ Ken and Mika, please.', choices: ['between', 'among', 'during'], answer: 0, why: '2人の間なので between A and B。' },
      { sentence: 'The singer is famous ___ teenagers.', choices: ['between', 'among', 'by'], answer: 1, why: '大勢（10代の若者）の間で人気なので among。' },
      { sentence: 'The shop is open between 10 a.m. ___ 8 p.m.', choices: ['or', 'with', 'and'], answer: 2, why: 'between A and B の形。' },
    ],
  },
  {
    id: 'have-to',
    title: "have to / don't have to（〜しなければならない・〜しなくてよい）",
    points: ['have to ＋動詞の原形で「〜しなければならない」。主語が三人称単数なら has to、過去なら had to。', "don't have to 〜 は「〜しなくてもよい（する必要がない）」。must not（〜してはいけない）とは意味がちがう。"],
    examples: [
      { en: 'I have to get up early tomorrow.', ja: '私は明日早く起きなければならない。' },
      { en: "You don't have to bring lunch today.", ja: '今日はお弁当を持ってこなくてもいいよ。' },
    ],
    questions: [
      { sentence: 'She ___ to practice the piano every day.', choices: ['have', 'has', 'having'], answer: 1, why: '主語が三人称単数（She）なので has to。' },
      { sentence: "It's Sunday. You ___ have to go to school.", choices: ["don't", "doesn't", 'not'], answer: 0, why: '「〜しなくてよい」は don\'t have to。主語は You。' },
      { sentence: 'Last night I ___ to finish my homework.', choices: ['have', 'had', 'has'], answer: 1, why: '過去の「〜しなければならなかった」は had to。' },
    ],
  },
  {
    id: 'may-might',
    title: 'may / might（〜かもしれない・〜してもよい）',
    points: ['may ＋動詞の原形で「〜かもしれない」（推量）や「〜してもよい」（許可）。', 'might は may より可能性が低い「ひょっとすると〜かもしれない」。May I 〜? は「〜してもいいですか」のていねいな言い方。'],
    examples: [
      { en: 'It may rain this afternoon.', ja: '午後は雨がふるかもしれない。' },
      { en: 'May I use your pen?', ja: 'ペンを使ってもいいですか。' },
    ],
    questions: [
      { sentence: 'Take an umbrella. It ___ rain later.', choices: ['may', 'must', 'shall'], answer: 0, why: '「雨がふるかもしれない」は may。' },
      { sentence: '___ I come in? — Sure.', choices: ['May', 'Must', 'Do'], answer: 0, why: '許可を求める「〜してもいいですか」は May I 〜?。' },
      { sentence: 'He might ___ late today.', choices: ['is', 'be', 'being'], answer: 1, why: 'might のあとは動詞の原形 be。' },
    ],
  },
  {
    id: 'be-imperative',
    title: "Be 〜 / Don't be 〜 の命令文",
    points: ['形容詞を使う命令文は Be ＋形容詞で「〜でいなさい・〜にしなさい」（Be quiet.）。', "否定は Don't be ＋形容詞で「〜しないで（〜になるな）」（Don't be late.）。"],
    examples: [
      { en: 'Be careful on the stairs.', ja: '階段では気をつけて。' },
      { en: "Don't be afraid of making mistakes.", ja: 'まちがえることをこわがらないで。' },
    ],
    questions: [
      { sentence: '___ careful when you cross the street.', choices: ['Be', 'Are', 'Do'], answer: 0, why: '形容詞（careful）の命令文は Be ＋形容詞。' },
      { sentence: "Don't ___ late for school.", choices: ['are', 'be', 'is'], answer: 1, why: "Don't be ＋形容詞で「〜しないで」。" },
      { sentence: '___ kind to your friends.', choices: ['Be', 'Being', 'To be'], answer: 0, why: '命令文は動詞の原形で始めるので Be。' },
    ],
  },
  {
    id: 'look-adj',
    title: 'look / sound / feel ＋形容詞（〜に見える・聞こえる・感じる）',
    points: ['look ＋形容詞で「〜に見える」、sound ＋形容詞で「〜に聞こえる（〜そうだ）」、feel ＋形容詞で「〜と感じる」。', 'うしろは形容詞（happy / good / tired など）。名詞を続けるときは look like 〜（〜のように見える）。'],
    examples: [
      { en: 'You look tired today.', ja: '今日はつかれているように見えるね。' },
      { en: 'That sounds interesting!', ja: 'それはおもしろそうだね！' },
    ],
    questions: [
      { sentence: 'This cake looks ___.', choices: ['delicious', 'deliciously', 'like delicious'], answer: 0, why: 'look のあとは形容詞 delicious。' },
      { sentence: 'Your idea sounds ___.', choices: ['greatly', 'great', 'like great'], answer: 1, why: 'sound のあとは形容詞 great。' },
      { sentence: 'That cloud looks ___ a cat.', choices: ['like', 'as', 'to'], answer: 0, why: '名詞（a cat）が続くときは look like 〜。' },
    ],
  },
  {
    id: 'after-before',
    title: '接続詞 after / before ＋文（〜したあとで・〜する前に）',
    points: ['after ＋主語＋動詞で「〜したあとで」、before ＋主語＋動詞で「〜する前に」。', '未来のことでも after / before の中は現在形（before it gets dark）。'],
    examples: [
      { en: 'I did my homework after I ate dinner.', ja: '私は夕食を食べたあとで宿題をした。' },
      { en: 'Let\'s go home before it gets dark.', ja: '暗くなる前に家に帰ろう。' },
    ],
    questions: [
      { sentence: 'Wash your hands ___ you eat.', choices: ['before', 'during', 'since'], answer: 0, why: '「食べる前に」なので before ＋文。' },
      { sentence: 'He went to bed ___ he finished the book.', choices: ['during', 'after', 'until'], answer: 1, why: '「本を読み終えたあとで」なので after。' },
      { sentence: 'Call me before you ___ the station.', choices: ['will leave', 'leave', 'left'], answer: 1, why: '未来のことでも before の中は現在形 leave。' },
    ],
  },
  {
    id: 'and-but-or-so',
    title: 'and / but / or / so の使い分け',
    points: ['and（そして）・but（しかし）・or（または）・so（だから）は、語と語、文と文をつなぐ。', 'so は前の文が理由で「だから〜」。because は「〜だから（理由）」で、so と同じ文にいっしょには使わない。'],
    examples: [
      { en: 'It was raining, so we stayed home.', ja: '雨がふっていたので、私たちは家にいた。' },
      { en: 'I like tea, but my sister likes coffee.', ja: '私は紅茶が好きだが、姉はコーヒーが好きだ。' },
    ],
    questions: [
      { sentence: 'I was tired, ___ I went to bed early.', choices: ['so', 'but', 'or'], answer: 0, why: '「つかれていた、だから早くねた」なので so。' },
      { sentence: 'Do you want rice ___ bread?', choices: ['but', 'or', 'so'], answer: 1, why: '「ご飯かパンか」どちらかなので or。' },
      { sentence: 'He is young, ___ he is very wise.', choices: ['so', 'or', 'but'], answer: 2, why: '「若いが、かしこい」と反対の内容なので but。' },
    ],
  },
  {
    id: 'adj-prep',
    title: '形容詞＋前置詞（be interested in / be afraid of など）',
    points: ['形容詞と前置詞がセットになった表現は、まとめて覚える（be interested in 〜・be afraid of 〜・be good at 〜・be proud of 〜・be different from 〜）。', '前置詞のあとに動詞を置くときは -ing 形（be good at swimming）。'],
    examples: [
      { en: 'I am interested in Japanese history.', ja: '私は日本の歴史に興味がある。' },
      { en: 'My little brother is afraid of dogs.', ja: '弟は犬がこわい。' },
    ],
    questions: [
      { sentence: 'She is good ___ playing the guitar.', choices: ['at', 'in', 'of'], answer: 0, why: 'be good at 〜 で「〜が得意だ」。' },
      { sentence: 'I am proud ___ my team.', choices: ['for', 'of', 'with'], answer: 1, why: 'be proud of 〜 で「〜をほこりに思う」。' },
      { sentence: 'His idea is different ___ mine.', choices: ['from', 'on', 'at'], answer: 0, why: 'be different from 〜 で「〜とちがう」。' },
    ],
  },
  {
    id: 'by-with',
    title: '手段の by と道具の with',
    points: ['by ＋乗り物・方法で「〜で（手段）」。by bus / by train / by e-mail のように a や the をつけない。', 'with ＋道具で「〜を使って」（write with a pen / eat with chopsticks）。歩いて行くときは on foot。'],
    examples: [
      { en: 'I go to school by bike.', ja: '私は自転車で学校に行く。' },
      { en: 'Please write your name with a pen.', ja: 'ペンで名前を書いてください。' },
    ],
    questions: [
      { sentence: 'They came here ___ car.', choices: ['by', 'with', 'on'], answer: 0, why: '乗り物の手段は by ＋名詞（a をつけない）。' },
      { sentence: 'He cut the paper ___ scissors.', choices: ['by', 'with', 'on'], answer: 1, why: '道具を使うときは with。' },
      { sentence: 'I usually go to the park on ___.', choices: ['walk', 'foot', 'feet'], answer: 1, why: '「歩いて」は on foot。' },
    ],
  },
  {
    id: 'not-to',
    title: 'tell 人 not to 〜（〜しないように言う）',
    points: ['不定詞を否定するときは、to の前に not を置く（not to 〜）。', 'tell 人 not to 〜「〜しないように言う」、ask 人 not to 〜「〜しないようにたのむ」。'],
    examples: [
      { en: 'My mother told me not to play games at night.', ja: '母は私に夜ゲームをしないように言った。' },
      { en: 'I asked him not to be late.', ja: '私は彼におくれないようにたのんだ。' },
    ],
    questions: [
      { sentence: 'The teacher told us ___ run in the hallway.', choices: ['not to', 'to not', "don't"], answer: 0, why: '不定詞の否定は not to 〜。' },
      { sentence: 'She asked me not ___ the door.', choices: ['open', 'to open', 'opening'], answer: 1, why: 'not to ＋動詞の原形。' },
      { sentence: 'Please tell Ken ___ worry.', choices: ['not to', 'no to', 'not'], answer: 0, why: 'tell 人 not to 〜 の形。' },
    ],
  },
  {
    id: 'stop-remember',
    title: 'stop / remember ＋ -ing と to 〜 のちがい',
    points: ['stop 〜ing は「〜するのをやめる」、stop to 〜 は「〜するために立ち止まる（手を止める）」。', 'remember 〜ing は「（過去に）〜したことを覚えている」、remember to 〜 は「（これから）わすれずに〜する」。'],
    examples: [
      { en: 'He stopped talking when the teacher came in.', ja: '先生が入ってきたので、彼は話すのをやめた。' },
      { en: 'Remember to bring your lunch tomorrow.', ja: '明日はわすれずにお弁当を持ってきてね。' },
    ],
    questions: [
      { sentence: 'Please stop ___ so loudly.', choices: ['to talk', 'talking', 'talk'], answer: 1, why: '「話すのをやめる」は stop 〜ing。' },
      { sentence: 'Remember ___ the window before you leave.', choices: ['closing', 'to close', 'closed'], answer: 1, why: '「わすれずに〜する（これから）」は remember to 〜。' },
      { sentence: 'I remember ___ him at the party last year.', choices: ['meeting', 'to meet', 'meet'], answer: 0, why: '「（過去に）会ったことを覚えている」は remember 〜ing。' },
    ],
  },
  {
    id: 'how-about',
    title: "How about 〜ing? / Why don't you 〜?（さそい・提案）",
    points: ["How about 〜ing? は「〜するのはどう？」と提案する言い方。about のあとは名詞か -ing 形。", "Why don't you 〜? は「〜したらどう？」、Why don't we 〜? は「いっしょに〜しない？」。"],
    examples: [
      { en: 'How about going to the zoo this Sunday?', ja: '今度の日曜日に動物園に行くのはどう？' },
      { en: "Why don't you ask your teacher?", ja: '先生に聞いてみたらどう？' },
    ],
    questions: [
      { sentence: 'How about ___ to the park this afternoon?', choices: ['go', 'going', 'to go'], answer: 1, why: 'How about のあとは -ing 形。' },
      { sentence: "Why don't you ___ a rest?", choices: ['take', 'taking', 'took'], answer: 0, why: "Why don't you のあとは動詞の原形。" },
      { sentence: '___ about this red one?', choices: ['What', 'Who', 'Why'], answer: 0, why: 'What about 〜? でも「〜はどう？」と言える。' },
    ],
  },
  {
    id: 'call-ab',
    title: 'call A B / What do you call 〜?（A を B とよぶ）',
    points: ['call A B で「A を B とよぶ」。A は人やもの、B はよび名。', 'What do you call 〜 in English? で「〜は英語で何といいますか」。'],
    examples: [
      { en: 'We call the dog Pochi.', ja: '私たちはその犬をポチとよぶ。' },
      { en: 'What do you call this flower in English?', ja: 'この花は英語で何といいますか。' },
    ],
    questions: [
      { sentence: 'Please ___ me Ken.', choices: ['call', 'say', 'speak'], answer: 0, why: '「私をケンとよんで」は call A B。' },
      { sentence: 'What do you call this ___ English?', choices: ['by', 'in', 'on'], answer: 1, why: 'in English で「英語で」。' },
      { sentence: 'His friends call ___ Taku.', choices: ['he', 'his', 'him'], answer: 2, why: 'call のあとの A は目的格 him。' },
    ],
  },
  {
    id: 'short-answer',
    title: "疑問文への答え方（Yes, I do. / No, it isn't.）",
    points: ['疑問文には、質問に使われた be動詞・do / does / did・助動詞を使って短く答える。', "Are you 〜? → Yes, I am. / Does he 〜? → No, he doesn't. / Can she 〜? → Yes, she can. 主語は代名詞にする。"],
    examples: [
      { en: "Do you like dogs? — Yes, I do.", ja: '犬は好きですか。—はい、好きです。' },
      { en: "Is this your bag? — No, it isn't.", ja: 'これはあなたのかばんですか。—いいえ、ちがいます。' },
    ],
    questions: [
      { sentence: 'Does your sister play the piano? — Yes, she ___.', choices: ['does', 'is', 'do'], answer: 0, why: 'Does で聞かれたら does で答える。' },
      { sentence: "Are you hungry? — No, I'___ not.", choices: ['m', 's', 're'], answer: 0, why: "Are you 〜? には I am（I'm）で答える。" },
      { sentence: 'Can Ken swim? — Yes, ___ can.', choices: ['Ken', 'he', 'him'], answer: 1, why: '答えの主語は代名詞 he にする。' },
    ],
  },
  {
    id: 'relative-that',
    title: '関係代名詞 that を使うとき（the first / the only / all）',
    points: ['先行詞に the first・the last・the only・最上級・all・everything などがつくと、関係代名詞は that がよく使われる。', '人と動物（もの）の両方を説明するときも that を使う。'],
    examples: [
      { en: 'He was the first student that came to school today.', ja: '彼は今日学校に来た最初の生徒だった。' },
      { en: 'This is all that I know.', ja: 'これが私の知っているすべてだ。' },
    ],
    questions: [
      { sentence: 'She is the only friend ___ I can trust.', choices: ['that', 'what', 'whose'], answer: 0, why: 'the only がつく先行詞には that がよく使われる。' },
      { sentence: 'This is the best movie ___ I have ever seen.', choices: ['what', 'that', 'who'], answer: 1, why: '最上級がつく先行詞には that。' },
      { sentence: 'Look at the boy and his dog ___ are running in the park.', choices: ['who', 'which', 'that'], answer: 2, why: '人と動物の両方を説明するので that。' },
    ],
  },
  {
    id: 'number-expr',
    title: '数の表現（two hundred / hundreds of）',
    points: ['具体的な数のときは hundred・thousand・million に -s をつけない（two hundred people・three thousand yen）。', '「何百もの〜」「何千もの〜」は hundreds of 〜・thousands of 〜 と -s をつけて of を使う。'],
    examples: [
      { en: 'There are three hundred students in our school.', ja: '私たちの学校には300人の生徒がいる。' },
      { en: 'Thousands of people came to the festival.', ja: '何千人もの人がお祭りに来た。' },
    ],
    questions: [
      { sentence: 'This bike costs twenty ___ yen.', choices: ['thousand', 'thousands', 'thousands of'], answer: 0, why: '具体的な数（20）のあとは -s をつけない thousand。' },
      { sentence: '___ of birds fly to this lake every winter.', choices: ['Hundred', 'Hundreds', 'A hundreds'], answer: 1, why: '「何百もの」は Hundreds of 〜。' },
      { sentence: 'Five ___ people live in this town.', choices: ['million', 'millions', 'millions of'], answer: 0, why: '具体的な数（5）のあとは million。' },
    ],
  },
  {
    id: 'the-more',
    title: 'the ＋比較級, the ＋比較級（〜すればするほど…）',
    points: ['The ＋比較級 〜, the ＋比較級 … で「〜すればするほど、ますます…」。', '形容詞・副詞を比較級にして文の先頭に出す（The more you practice, the better you get.）。'],
    examples: [
      { en: 'The more you read, the more you learn.', ja: '読めば読むほど、多くを学ぶ。' },
      { en: 'The older he got, the kinder he became.', ja: '彼は年をとるにつれて、ますますやさしくなった。' },
    ],
    questions: [
      { sentence: 'The more you practice, the ___ you will play.', choices: ['good', 'better', 'best'], answer: 1, why: 'the ＋比較級なので better。' },
      { sentence: '___ sooner, the better.', choices: ['The', 'A', 'More'], answer: 0, why: 'The sooner, the better.（早ければ早いほどよい）' },
      { sentence: 'The higher we climbed, the ___ it became.', choices: ['cold', 'coldest', 'colder'], answer: 2, why: 'the ＋比較級なので colder。' },
    ],
  },
  {
    id: 'ing-two',
    title: '-ing の見分け（進行形・動名詞・分詞）',
    points: ['be動詞＋ -ing は進行形「〜している」（He is swimming.）。', '主語・目的語・前置詞のあとの -ing は動名詞「〜すること」（Swimming is fun.）。名詞を説明する -ing は分詞「〜している…」（the swimming boy）。'],
    examples: [
      { en: 'Reading books is my hobby.', ja: '本を読むことは私のしゅみだ。（動名詞）' },
      { en: 'The girl reading a book is my sister.', ja: '本を読んでいる女の子は私の姉だ。（分詞）' },
    ],
    questions: [
      { sentence: '___ English is interesting.', choices: ['Learn', 'Learning', 'Learns'], answer: 1, why: '主語になる「〜すること」は動名詞 Learning。' },
      { sentence: 'Look at the ___ baby.', choices: ['sleeping', 'sleep', 'sleeps'], answer: 0, why: '名詞 baby を説明する分詞「眠っている」。' },
      { sentence: 'The boy ___ soccer over there is Ken.', choices: ['plays', 'is playing', 'playing'], answer: 2, why: 'The boy を後ろから説明する分詞 playing。文の動詞は is。' },
    ],
  },
  {
    id: 'because-of',
    title: 'because と because of のちがい',
    points: ['because のあとは主語＋動詞の文（because it rained）。', 'because of のあとは名詞（because of the rain）。意味はどちらも「〜なので・〜のために」。'],
    examples: [
      { en: 'The game was stopped because it rained.', ja: '雨がふったので試合は中止になった。' },
      { en: 'The game was stopped because of the rain.', ja: '雨のために試合は中止になった。' },
    ],
    questions: [
      { sentence: 'We stayed home ___ the storm.', choices: ['because', 'because of', 'so'], answer: 1, why: 'あとが名詞（the storm）なので because of。' },
      { sentence: 'I was late ___ I missed the bus.', choices: ['because', 'because of', 'for'], answer: 0, why: 'あとが文（I missed the bus）なので because。' },
      { sentence: 'The trains stopped because of ___.', choices: ['it snowed', 'the snow', 'snowed'], answer: 1, why: 'because of のあとは名詞 the snow。' },
    ],
  },
  {
    id: 'ago-before',
    title: 'ago と before のちがい',
    points: ['〜 ago は「今から〜前に」。過去の文で使う（three days ago）。', 'before は「（以前に）前に」。現在完了で「前に〜したことがある」（I have seen it before.）や、before ＋名詞・文でも使う。'],
    examples: [
      { en: 'I came to this town five years ago.', ja: '私は5年前にこの町に来た。' },
      { en: 'I have heard this song before.', ja: '私はこの歌を前に聞いたことがある。' },
    ],
    questions: [
      { sentence: 'I visited Kyoto three years ___.', choices: ['ago', 'before', 'since'], answer: 0, why: '今から数えて「3年前に」は three years ago。' },
      { sentence: 'I have been to Okinawa ___.', choices: ['ago', 'last', 'before'], answer: 2, why: '現在完了で「前に」は before。ago は現在完了では使えない。' },
      { sentence: 'How long ___ did you start learning English?', choices: ['ago', 'before', 'since'], answer: 0, why: 'How long ago 〜? で「どのくらい前に〜したか」。' },
    ],
  },
  {
    id: 'so-such',
    title: 'so と such のちがい',
    points: ['so ＋形容詞・副詞（so hot / so fast）。', 'such a ＋形容詞＋名詞（such a hot day）。名詞があるときは such。どちらも that … をつけると「とても〜なので…」。'],
    examples: [
      { en: 'The test was so easy.', ja: 'テストはとてもかんたんだった。' },
      { en: 'It was such an easy test.', ja: 'それはとてもかんたんなテストだった。' },
    ],
    questions: [
      { sentence: 'It was ___ a hot day that we went swimming.', choices: ['so', 'such', 'very'], answer: 1, why: 'a hot day（名詞）があるので such。' },
      { sentence: 'The movie was ___ exciting that I watched it twice.', choices: ['so', 'such', 'such a'], answer: 0, why: '形容詞 exciting だけなので so。' },
      { sentence: 'She is ___ kind girl.', choices: ['so', 'such a', 'such'], answer: 1, why: '名詞 girl があるので such a kind girl。' },
    ],
  },
  {
    id: 'help-do',
    title: 'help ＋人＋動詞の原形',
    points: ['help ＋人＋動詞の原形 で「人が〜するのを手伝う」（help me carry）。', 'help ＋人＋ with ＋もの で「人の〜を手伝う」（help me with my homework）。'],
    examples: [
      { en: 'Can you help me carry this box?', ja: 'この箱を運ぶのを手伝ってくれる？' },
      { en: 'My sister helped me with my homework.', ja: '姉が宿題を手伝ってくれた。' },
    ],
    questions: [
      { sentence: 'Please help me ___ the dishes.', choices: ['wash', 'washed', 'washing'], answer: 0, why: 'help ＋人のあとは動詞の原形 wash。' },
      { sentence: 'He helped his mother ___ her work.', choices: ['with', 'for', 'to'], answer: 0, why: 'help 人 with もの で「人の〜を手伝う」。' },
      { sentence: 'Could you help ___ find my key?', choices: ['I', 'my', 'me'], answer: 2, why: 'help のあとの「人」は目的格 me。' },
    ],
  },
  {
    id: 'spend-ing',
    title: 'spend ＋時間＋ -ing',
    points: ['spend ＋時間＋ -ing で「〜して（時間）を過ごす」（spend an hour reading）。', 'spend ＋お金＋ on ＋もの で「〜にお金を使う」。'],
    examples: [
      { en: 'I spent two hours playing games.', ja: '私はゲームをして2時間過ごした。' },
      { en: 'She spends a lot of money on books.', ja: '彼女は本にたくさんのお金を使う。' },
    ],
    questions: [
      { sentence: 'We spent the afternoon ___ in the park.', choices: ['walk', 'walking', 'to walk'], answer: 1, why: 'spend 時間 のあとは -ing 形 walking。' },
      { sentence: 'He spent 1,000 yen ___ a new pen.', choices: ['in', 'on', 'to'], answer: 1, why: 'spend お金 on もの で「〜にお金を使う」。' },
      { sentence: 'How much time do you spend ___ English every day?', choices: ['study', 'studying', 'studied'], answer: 1, why: 'spend 時間 のあとは -ing 形 studying。' },
    ],
  },
  {
    id: 'keep-ing',
    title: 'keep ＋ -ing・keep A ＋形容詞',
    points: ['keep ＋ -ing で「〜し続ける」（keep running）。', 'keep ＋A＋形容詞 で「Aを〜にしておく」（keep the room clean）。'],
    examples: [
      { en: 'He kept talking for an hour.', ja: '彼は1時間話し続けた。' },
      { en: 'Please keep the door open.', ja: 'ドアを開けたままにしておいてください。' },
    ],
    questions: [
      { sentence: 'The baby kept ___ all night.', choices: ['cry', 'crying', 'to cry'], answer: 1, why: 'keep のあとは -ing 形 crying。' },
      { sentence: 'Keep your hands ___.', choices: ['clean', 'cleanly', 'cleaning'], answer: 0, why: 'keep A ＋形容詞 で「Aを〜にしておく」。' },
      { sentence: 'It kept ___ until evening.', choices: ['rain', 'rained', 'raining'], answer: 2, why: 'keep -ing で「〜し続ける」。' },
    ],
  },
  {
    id: 'seem-to',
    title: 'seem ＋形容詞・seem to ＋動詞',
    points: ['seem ＋形容詞 で「〜のように見える・思われる」（She seems happy.）。', 'seem to ＋動詞の原形 で「〜するようだ」（He seems to know the answer.）。'],
    examples: [
      { en: 'You seem tired today.', ja: '今日は疲れているようだね。' },
      { en: 'The cat seems to like you.', ja: 'そのねこはあなたのことが好きなようだ。' },
    ],
    questions: [
      { sentence: 'She seems ___ today.', choices: ['happily', 'happy', 'happiness'], answer: 1, why: 'seem のあとは形容詞 happy。' },
      { sentence: 'He seems ___ the answer.', choices: ['know', 'knowing', 'to know'], answer: 2, why: 'seem のあとに動詞を続けるときは to ＋動詞の原形。' },
      { sentence: 'They ___ to be busy now.', choices: ['seem', 'seems', 'seeming'], answer: 0, why: '主語 They は複数なので seem（-s はつけない）。' },
    ],
  },
  {
    id: 'time-no-prep',
    title: 'next week / last year（前置詞をつけない）',
    points: ['next・last・this・every がつく時の表現には in / on / at をつけない（next week / last year）。', 'yesterday・tomorrow・today にも前置詞はつけない。'],
    examples: [
      { en: 'I visited Osaka last summer.', ja: '私は去年の夏に大阪を訪れた。' },
      { en: 'We have a test next Monday.', ja: '今度の月曜日にテストがある。' },
    ],
    questions: [
      { sentence: 'I met him ___ year.', choices: ['in last', 'last', 'at last'], answer: 1, why: 'last year には前置詞をつけない。' },
      { sentence: 'We will go camping ___ weekend.', choices: ['next', 'on next', 'in next'], answer: 0, why: 'next weekend には前置詞をつけない。' },
      { sentence: 'She practices the piano ___.', choices: ['every day', 'on every day', 'in every day'], answer: 0, why: 'every day には前置詞をつけない。' },
    ],
  },
  {
    id: 'adj-order',
    title: '形容詞の順番（a big red ball）',
    points: ['名詞の前に形容詞を2つ以上ならべるときは、「数 → 感想（すてきな）→ 大きさ → 古さ・新しさ → 色 → 材料 → 名詞」の順がふつう。', 'a big red ball（大きさ → 色）、two small black dogs（数 → 大きさ → 色）。'],
    examples: [
      { en: 'She lives in a beautiful old house.', ja: '彼女は美しい古い家に住んでいる。' },
      { en: 'I bought two small black bags.', ja: '私は小さな黒いかばんを2つ買った。' },
    ],
    questions: [
      { sentence: 'He has a ___ car.', choices: ['red big', 'big red', 'bigly red'], answer: 1, why: '大きさ（big）→ 色（red）の順。' },
      { sentence: 'Look at those ___ birds.', choices: ['three little white', 'white little three', 'little three white'], answer: 0, why: '数 → 大きさ → 色 の順。' },
      { sentence: 'This is a ___ table.', choices: ['wooden new', 'new wooden', 'newly wooden'], answer: 1, why: '新しさ（new）→ 材料（wooden）の順。' },
    ],
  },
  {
    id: 'phrasal-look',
    title: 'look for / look after / look up',
    points: ['look at 〜「〜を見る」、look for 〜「〜をさがす」、look after 〜「〜の世話をする」。', 'look up 〜 は「（辞書などで）〜を調べる」。あとにつく語で意味が大きく変わる。'],
    examples: [
      { en: 'I am looking for my glasses.', ja: '私はめがねをさがしている。' },
      { en: 'She looks after her little brother.', ja: '彼女は弟の世話をしている。' },
    ],
    questions: [
      { sentence: 'I lost my key. I am looking ___ it now.', choices: ['at', 'for', 'after'], answer: 1, why: '「さがす」は look for。' },
      { sentence: 'Can you look ___ my dog while I am away?', choices: ['after', 'for', 'up'], answer: 0, why: '「世話をする」は look after。' },
      { sentence: "If you don't know the word, look it ___ in a dictionary.", choices: ['at', 'after', 'up'], answer: 2, why: '「（辞書で）調べる」は look up。' },
    ],
  },
  {
    id: 'get-uses',
    title: 'get のいろいろな意味',
    points: ['get ＋もの で「〜を手に入れる・もらう」、get to ＋場所 で「〜に着く」（home の前に to はつけない）。', 'get ＋形容詞 で「〜になる」（get tired / get dark）、get up で「起きる」。'],
    examples: [
      { en: 'I got a letter from my friend.', ja: '友だちから手紙をもらった。' },
      { en: 'It is getting dark.', ja: 'だんだん暗くなってきている。' },
    ],
    questions: [
      { sentence: 'How can I get ___ the station?', choices: ['to', 'at', 'in'], answer: 0, why: '「〜に着く」は get to 〜。' },
      { sentence: 'I usually get ___ at six.', choices: ['up', 'to', 'for'], answer: 0, why: '「起きる」は get up。' },
      { sentence: 'It got ___ in the evening.', choices: ['cold', 'coldly', 'to cold'], answer: 0, why: 'get ＋形容詞 で「〜になる」。' },
    ],
  },
  {
    id: 'another-other',
    title: 'another / the other',
    points: ['another ＋単数名詞 で「もう1つの・別の」（another cup）。', '2つのうち一方は one、もう一方は the other。3つ以上で「残り全部」は the others。'],
    examples: [
      { en: 'Can I have another cookie?', ja: 'クッキーをもう1枚もらってもいい？' },
      { en: 'I have two cats. One is white, and the other is black.', ja: 'ねこを2匹飼っている。1匹は白で、もう1匹は黒だ。' },
    ],
    questions: [
      { sentence: 'This shirt is too small. Please show me ___ one.', choices: ['another', 'other', 'the others'], answer: 0, why: '「別の1つ」は another one。' },
      { sentence: 'I have two brothers. One is ten, and ___ is seven.', choices: ['another', 'the other', 'others'], answer: 1, why: '2人のうちの「もう一方」は the other。' },
      { sentence: 'Would you like ___ cup of tea?', choices: ['another', 'other', 'others'], answer: 0, why: '「もう1杯」は another cup。' },
    ],
  },
  {
    id: 'same-different',
    title: 'the same as / different from',
    points: ['the same 〜 as … で「…と同じ〜」（the same bag as mine）。same の前には the をつける。', 'different from 〜 で「〜とちがう」（different from yours）。'],
    examples: [
      { en: 'My bag is the same as yours.', ja: '私のかばんはあなたのと同じだ。' },
      { en: 'Life in Tokyo is different from life in my town.', ja: '東京の生活は私の町の生活とちがう。' },
    ],
    questions: [
      { sentence: 'Your shoes are the same ___ mine.', choices: ['as', 'to', 'with'], answer: 0, why: 'the same as 〜 で「〜と同じ」。' },
      { sentence: 'This book is different ___ that one.', choices: ['as', 'from', 'with'], answer: 1, why: 'different from 〜 で「〜とちがう」。' },
      { sentence: 'We go to ___ school.', choices: ['same', 'a same', 'the same'], answer: 2, why: 'same の前には the をつける。' },
    ],
  },
  {
    id: 'to-or-ing',
    title: 'to か -ing か（動詞による見分け）',
    points: ['want・hope・decide・plan のあとは to ＋動詞の原形（want to go）。enjoy・finish・stop（やめる）のあとは -ing（enjoy swimming）。stop to 〜 は「〜するために立ち止まる」で意味がちがう。', 'like・love・start・begin のあとは to も -ing もどちらも使える（start to run / start running）。'],
    examples: [
      { en: 'I decided to study abroad.', ja: '私は留学することに決めた。' },
      { en: 'It started raining.', ja: '雨がふりはじめた。' },
    ],
    questions: [
      { sentence: 'We hope ___ you again soon.', choices: ['seeing', 'to see', 'see'], answer: 1, why: 'hope のあとは to ＋動詞の原形。' },
      { sentence: 'He finished ___ his homework.', choices: ['doing', 'to do', 'do'], answer: 0, why: 'finish のあとは -ing 形。' },
      { sentence: 'She decided ___ the piano.', choices: ['learning', 'to learn', 'learn'], answer: 1, why: 'decide のあとは to ＋動詞の原形。' },
    ],
  },
  {
    id: 'would-like',
    title: 'would like（〜がほしい・〜したい）',
    points: ['would like ＋もの で「〜がほしい」、would like to ＋動詞 で「〜したい」。want よりていねいな言い方。', 'Would you like 〜? で「〜はいかがですか」と人にすすめる。I\'d like は I would like の短い形。'],
    examples: [
      { en: "I'd like a glass of water.", ja: '水を1杯いただきたいです。' },
      { en: 'Would you like some cake?', ja: 'ケーキはいかがですか。' },
    ],
    questions: [
      { sentence: 'I would like ___ to the museum.', choices: ['go', 'going', 'to go'], answer: 2, why: 'would like のあとに動詞を続けるときは to ＋動詞の原形。' },
      { sentence: '___ you like some tea? — Yes, please.', choices: ['Do', 'Would', 'Are'], answer: 1, why: '人にすすめるときは Would you like 〜?' },
      { sentence: 'I would ___ a cup of coffee.', choices: ['like', 'likes', 'liking'], answer: 0, why: 'would のあとは動詞の原形 like。' },
    ],
  },
  {
    id: 'a-piece-of',
    title: '数えられない名詞の数え方（a cup of / a piece of）',
    points: ['数えられない名詞は入れ物や形を使って数える（a cup of tea / a glass of water / a piece of paper）。', '2つ以上は入れ物の語を複数形にする（two cups of tea / three pieces of cake）。'],
    examples: [
      { en: 'Could I have a glass of water?', ja: '水を1杯いただけますか。' },
      { en: 'She ate two pieces of cake.', ja: '彼女はケーキを2切れ食べた。' },
    ],
    questions: [
      { sentence: 'I drink two ___ of milk every day.', choices: ['glass', 'glasses', 'a glass'], answer: 1, why: '2つ以上なので入れ物の語を複数形に（glasses）。' },
      { sentence: 'Please give me a ___ of paper.', choices: ['piece', 'pieces', 'cup'], answer: 0, why: '紙1枚は a piece of paper。' },
      { sentence: 'He drank three cups of ___.', choices: ['coffees', 'coffee', 'a coffee'], answer: 1, why: 'coffee は数えられない名詞なので複数形にしない。' },
    ],
  },
  {
    id: 'so-do-i',
    title: 'So do I. / Neither do I.（「私も」）',
    points: ['相手と同じ（ふつうの文）なら So do I. / Me too.（私も）。動詞に合わせて So am I. / So did I. などにかえる。', '相手と同じ（否定の文）なら Neither do I. / Me neither.（私も〜ない）。'],
    examples: [
      { en: '"I like cats." "So do I."', ja: '「ねこが好き」「私も」' },
      { en: '"I can\'t swim." "Neither can I."', ja: '「泳げない」「私も泳げない」' },
    ],
    questions: [
      { sentence: '"I am hungry." "So ___ I."', choices: ['do', 'am', 'did'], answer: 1, why: 'be動詞 am の文なので So am I.' },
      { sentence: '"I don\'t like snakes." "___ do I."', choices: ['So', 'Too', 'Neither'], answer: 2, why: '否定の文に「私も」は Neither do I.' },
      { sentence: '"I went to the zoo yesterday." "So ___ I."', choices: ['do', 'did', 'was'], answer: 1, why: '過去の一般動詞（went）なので So did I.' },
    ],
  },
  {
    id: 'it-weather',
    title: '天気・時間の it（It is sunny. / It is five o\'clock.）',
    points: ['天気・時刻・曜日・寒さ暑さ・きょりを言うときは主語に it を使う（It is sunny.）。この it は「それ」と訳さない。', 'It is 〜 o\'clock.（〜時です）／ It is cold today.（今日は寒い）／ It is Monday.（月曜日です）'],
    examples: [
      { en: 'It is raining now.', ja: '今、雨がふっている。' },
      { en: "It's five o'clock.", ja: '5時です。' },
    ],
    questions: [
      { sentence: '___ is very hot today.', choices: ['It', 'There', 'They'], answer: 0, why: '暑さを言う文の主語は It。' },
      { sentence: "What time is ___? — It's ten.", choices: ['this', 'it', 'that'], answer: 1, why: '時刻をたずねるときは What time is it?' },
      { sentence: '___ snowed a lot last night.', choices: ['It', 'There', 'This'], answer: 0, why: '天気（雪がふる）の文の主語は It。' },
    ],
  },
  {
    id: 'take-uses',
    title: 'take のいろいろな意味',
    points: ['take は「持っていく・連れていく」（take an umbrella）のほか、乗り物に「乗る」（take a bus）、写真を「とる」（take a picture）にも使う。', 'take a bath（おふろに入る）、take a walk（散歩する）、take a rest（休む）など、決まった言い方も多い。'],
    examples: [
      { en: "Let's take a picture here.", ja: 'ここで写真をとろう。' },
      { en: 'I take the train to school.', ja: '私は電車で学校へ行く。' },
    ],
    questions: [
      { sentence: "Don't forget to ___ an umbrella.", choices: ['take', 'make', 'do'], answer: 0, why: '「（かさを）持っていく」は take。' },
      { sentence: 'We ___ a walk in the park every morning.', choices: ['make', 'take', 'do'], answer: 1, why: '「散歩する」は take a walk。' },
      { sentence: 'Can you ___ a picture of us?', choices: ['take', 'make', 'do'], answer: 0, why: '「写真をとる」は take a picture。' },
    ],
  },
  {
    id: 'make-do',
    title: 'make と do の使い分け',
    points: ['make は「作る・生み出す」（make a cake / make a mistake / make friends）。', 'do は「（作業・活動を）する」（do homework / do the dishes / do one\'s best）。'],
    examples: [
      { en: 'I made a mistake on the test.', ja: 'テストでまちがえてしまった。' },
      { en: "Let's do our best!", ja: 'ベストをつくそう！' },
    ],
    questions: [
      { sentence: 'I have to ___ my homework tonight.', choices: ['make', 'do', 'take'], answer: 1, why: '宿題を「する」は do my homework。' },
      { sentence: 'She ___ a lot of friends at the camp.', choices: ['made', 'did', 'took'], answer: 0, why: '「友だちをつくる」は make friends。' },
      { sentence: "Don't be afraid of ___ mistakes.", choices: ['doing', 'making', 'taking'], answer: 1, why: '「まちがえる」は make a mistake。前置詞 of のあとは -ing。' },
    ],
  },
  {
    id: 'say-tell',
    title: 'say / tell / speak / talk の使い分け',
    points: ['say は「（ことばを）言う」（say "Hello"）。tell は「（人に）伝える・話す」で、すぐあとに人がくる（tell me the story）。', 'speak は「（言語を）話す」（speak English）、talk は「（人と）おしゃべりする」（talk with friends）。'],
    examples: [
      { en: 'Can you tell me the way to the station?', ja: '駅への道を教えてくれますか。' },
      { en: 'She speaks three languages.', ja: '彼女は3か国語を話す。' },
    ],
    questions: [
      { sentence: 'Please ___ me your name.', choices: ['say', 'tell', 'speak'], answer: 1, why: '「人に〜を言う・教える」は tell ＋人＋もの。' },
      { sentence: 'He can ___ Chinese well.', choices: ['speak', 'tell', 'say'], answer: 0, why: '言語を「話す」は speak。' },
      { sentence: 'What did she ___ to you?', choices: ['tell', 'say', 'talk'], answer: 1, why: '「〜に何と言ったか」は say 〜 to 人。tell なら人がすぐあとにくる。' },
    ],
  },
  {
    id: 'be-able-to',
    title: 'be able to（〜できる）',
    points: ['be able to ＋動詞の原形 で「〜することができる」（can とほぼ同じ意味）。', 'will のあとでは can を使えないので will be able to 〜 にする。過去の「できた」は could または was / were able to（1回うまくできたことは was / were able to を使う）。'],
    examples: [
      { en: 'I will be able to swim next summer.', ja: '来年の夏には泳げるようになるだろう。' },
      { en: 'She was able to finish the work.', ja: '彼女はその仕事を終えることができた。' },
    ],
    questions: [
      { sentence: 'He will ___ to come tomorrow.', choices: ['can', 'be able', 'able'], answer: 1, why: 'will のあとは will be able to 〜。' },
      { sentence: 'We ___ able to see the mountain from here.', choices: ['are', 'is', 'can'], answer: 0, why: '主語 We に合わせて be動詞は are。' },
      { sentence: 'I ___ ride a bike when I was five.', choices: ['can', 'could', 'am able'], answer: 1, why: '過去の「できた」は could。' },
    ],
  },
  {
    id: 'how-many-much',
    title: 'How many / How much',
    points: ['How many ＋複数名詞 〜? で「いくつの〜」と数をたずねる（How many books 〜?）。', 'How much 〜? で「いくら（値段）」や、数えられない名詞の「どのくらいの量」をたずねる（How much is this? / How much water 〜?）。'],
    examples: [
      { en: 'How many students are there in your class?', ja: 'あなたのクラスには何人の生徒がいますか。' },
      { en: 'How much is this T-shirt?', ja: 'このTシャツはいくらですか。' },
    ],
    questions: [
      { sentence: 'How ___ pencils do you have?', choices: ['many', 'much', 'long'], answer: 0, why: '数えられる名詞（pencils）の数は How many。' },
      { sentence: "How ___ is this cake? — It's 300 yen.", choices: ['many', 'much', 'old'], answer: 1, why: '値段は How much。' },
      { sentence: 'How much ___ do you drink every day?', choices: ['water', 'waters', 'glass'], answer: 0, why: 'How much のあとは数えられない名詞（water）。' },
    ],
  },
  {
    id: 'participle-clause',
    title: '分詞構文（Walking along the river, …）',
    points: [
      '-ing で始まる語句を文の前や後ろにつけて、「〜しながら」「〜すると」「〜なので」などの意味を表す。これを分詞構文という。',
      '-ing の意味上の主語は文の主語と同じ。主語が「〜される」側のときは過去分詞を使う（Written in easy English, 〜「やさしい英語で書かれているので」）。',
    ],
    examples: [
      { en: 'Walking along the river, I saw a big fish.', ja: '川ぞいを歩いていると、大きな魚が見えた。' },
      { en: 'Written in easy English, this book is good for beginners.', ja: 'やさしい英語で書かれているので、この本は初心者によい。' },
    ],
    questions: [
      { sentence: '___ to music, she cleaned her room.', choices: ['Listening', 'Listened', 'Listens'], answer: 0, why: '「音楽を聞きながら」。聞くのは主語の she なので能動の -ing 形。' },
      { sentence: '___ from the hill, the town looks beautiful.', choices: ['Seen', 'Seeing', 'See'], answer: 0, why: '町は丘から「見られる」側なので過去分詞 Seen。' },
      { sentence: 'Feeling tired, he ___ to bed early.', choices: ['went', 'going', 'to go'], answer: 0, why: '分詞構文のあとには「主語＋動詞」の文が続く。he went。' },
    ],
  },
  {
    id: 'subjunctive-past-perfect',
    title: '仮定法過去完了（If I had known, …）',
    points: [
      '過去の事実とちがうことを想像するときは、If ＋ 主語 ＋ had ＋ 過去分詞, 主語 ＋ would have ＋ 過去分詞「もし（あのとき）〜だったら、…だっただろうに」。',
      'I wish ＋ 主語 ＋ had ＋ 過去分詞 で「（あのとき）〜だったらよかったのに」。',
    ],
    examples: [
      { en: 'If I had left earlier, I would have caught the train.', ja: 'もっと早く出ていたら、電車に間に合っただろうに。' },
      { en: 'I wish I had studied harder.', ja: 'もっと一生けんめい勉強していたらよかったのに。' },
    ],
    questions: [
      { sentence: 'If I ___ known the answer, I would have told you.', choices: ['had', 'have', 'would'], answer: 0, why: '過去の事実とちがう想像なので If ＋ had ＋ 過去分詞。' },
      { sentence: 'If she had taken the bus, she ___ been late.', choices: ['would not have', 'will not', 'does not'], answer: 0, why: '後半は would (not) have ＋ 過去分詞「〜しなかっただろうに」。' },
      { sentence: 'I wish I ___ the movie with you yesterday.', choices: ['had seen', 'saw', 'see'], answer: 0, why: 'yesterday（過去）のことを残念に思うので I wish ＋ had ＋ 過去分詞。' },
    ],
  },
  {
    id: 'it-cleft',
    title: '強調構文（It is … that 〜）',
    points: [
      'It is ＋ 強調したい語句 ＋ that 〜 で「〜なのは…だ」と、文の一部を強く言える。',
      '人を強調するときは that のかわりに who も使える。It is と that のあいだに入れた部分が強調される。',
    ],
    examples: [
      { en: 'It was Ken that broke the window.', ja: '窓を割ったのはケンだった。' },
      { en: 'It is in summer that this town is the busiest.', ja: 'この町がいちばんにぎわうのは夏だ。' },
    ],
    questions: [
      { sentence: 'It was yesterday ___ I met her at the station.', choices: ['that', 'what', 'which'], answer: 0, why: '強調構文 It was 〜 that …。強調しているのは yesterday（時）なので that。' },
      { sentence: 'It is my brother ___ cooks dinner on Sundays.', choices: ['who', 'which', 'what'], answer: 0, why: '人（my brother）を強調するときは that のかわりに who も使える。' },
      { sentence: '___ was in Kyoto that we first met.', choices: ['It', 'This', 'There'], answer: 0, why: '強調構文は It で始める。「私たちがはじめて会ったのは京都だった」。' },
    ],
  },
  {
    id: 'negative-inversion',
    title: '否定語の倒置（Never have I …）',
    points: [
      'Never・Little・Not only などの否定の語句を文の最初に出すと、そのあとは疑問文と同じ語順（倒置）になる。',
      'Never have I seen 〜「〜を一度も見たことがない」。Not only did he 〜, but he also …「彼は〜しただけでなく…も」。',
    ],
    examples: [
      { en: 'Never have I seen such a beautiful sunset.', ja: 'こんなに美しい夕日は一度も見たことがない。' },
      { en: 'Not only did she sing, but she also played the piano.', ja: '彼女は歌っただけでなく、ピアノもひいた。' },
    ],
    questions: [
      { sentence: 'Never ___ I heard such a strange story.', choices: ['have', 'I have', 'has'], answer: 0, why: 'Never が文の最初なので倒置して have I heard の語順になる。' },
      { sentence: 'Not only ___ he study hard, but he also helps his friends.', choices: ['does', 'is', 'do'], answer: 0, why: '現在の一般動詞の文の倒置は does ＋ 主語 ＋ 動詞の原形。主語が he なので does。' },
      { sentence: 'Little ___ she know about the surprise party.', choices: ['did', 'was', 'does she'], answer: 0, why: 'Little を文の最初に出すと倒置。過去の文なので did ＋ 主語 ＋ 原形「〜とはほとんど知らなかった」。' },
    ],
  },
  {
    id: 'compound-relative',
    title: '複合関係詞（whatever / whoever）',
    points: [
      'whatever は「〜するものは何でも」、whoever は「〜する人はだれでも」。1語で「先行詞＋関係代名詞」の働きをする。',
      '「たとえ何が〜しても」「たとえだれが〜しても」という意味でも使う：Whatever happens, I will help you.',
    ],
    examples: [
      { en: 'You can eat whatever you like.', ja: '好きなものは何でも食べていいよ。' },
      { en: 'Whoever comes first will get a prize.', ja: '最初に来た人はだれでも賞品がもらえる。' },
    ],
    questions: [
      { sentence: 'Take ___ you need from the box.', choices: ['whatever', 'whoever', 'however'], answer: 0, why: '「必要なものは何でも」。物のことなので whatever。' },
      { sentence: '___ wants to join the club is welcome.', choices: ['Whoever', 'Whatever', 'Whenever'], answer: 0, why: '「参加したい人はだれでも」。人のことなので whoever。' },
      { sentence: '___ happens, I will not give up.', choices: ['Whatever', 'Whoever', 'Wherever'], answer: 0, why: '「たとえ何が起きても」は Whatever happens。' },
    ],
  },
  {
    id: 'with-attendant',
    title: '付帯状況の with（with ＋ 名詞 ＋ 〜）',
    points: [
      'with ＋ 名詞 ＋ 分詞・形容詞・副詞 で「〜を…したままで」「〜が…の状態で」という様子を表す。',
      '名詞が「〜している」なら -ing 形、「〜される」なら過去分詞：with the engine running（エンジンをかけたまま）・with his eyes closed（目を閉じて）。',
    ],
    examples: [
      { en: 'She listened to the music with her eyes closed.', ja: '彼女は目を閉じたまま音楽を聞いた。' },
      { en: "Don't speak with your mouth full.", ja: '口に物をいっぱい入れたまま話してはいけない。' },
    ],
    questions: [
      { sentence: 'He fell asleep with the TV ___.', choices: ['on', 'in', 'at'], answer: 0, why: 'with the TV on「テレビをつけたままで」。on は「（電気などが）ついている」状態。' },
      { sentence: 'She stood there with her arms ___.', choices: ['folded', 'folding', 'fold'], answer: 0, why: '腕は「組まれる」側なので過去分詞 folded「腕を組んで」。' },
      { sentence: 'He waited in the car with the engine ___.', choices: ['running', 'run', 'to run'], answer: 0, why: 'エンジンが「動いている」ので -ing 形 running「エンジンをかけたまま」。' },
    ],
  },
  {
    id: 'modal-perfect',
    title: '助動詞＋have＋過去分詞（must have done など）',
    points: [
      'must have ＋ 過去分詞「〜したにちがいない」、can\'t have ＋ 過去分詞「〜したはずがない」、may have ＋ 過去分詞「〜したかもしれない」で、過去のことを推量する。',
      'should have ＋ 過去分詞 は「〜すべきだったのに（しなかった）」という後悔や注意を表す。',
    ],
    examples: [
      { en: 'The ground is wet. It must have rained last night.', ja: '地面がぬれている。昨夜雨がふったにちがいない。' },
      { en: 'I should have brought an umbrella.', ja: 'かさを持ってくるべきだった。' },
    ],
    questions: [
      { sentence: 'She looks very happy. She ___ passed the test.', choices: ['must have', 'should have', "can't have"], answer: 0, why: '「合格したにちがいない」という推量は must have ＋ 過去分詞。' },
      { sentence: "I'm so tired. I ___ gone to bed earlier.", choices: ['should have', 'must have', 'may have'], answer: 0, why: '「もっと早く寝るべきだった」という後悔は should have ＋ 過去分詞。' },
      { sentence: 'He was in Osaka yesterday, so he ___ seen you in Tokyo.', choices: ["can't have", 'must have', 'should have'], answer: 0, why: '大阪にいたので「東京で会ったはずがない」。can\'t have ＋ 過去分詞。' },
    ],
  },
  {
    id: 'future-perfect',
    title: '未来完了（will have ＋ 過去分詞）',
    points: [
      'will have ＋ 過去分詞 で「（未来のある時点までに）〜してしまっているだろう」を表す。by 〜（〜までに）といっしょに使うことが多い。',
      '経験や継続も表せる：By next year, I will have lived here for ten years.「来年で、ここに10年住んだことになる」。',
    ],
    examples: [
      { en: 'I will have finished my homework by six.', ja: '6時までには宿題を終えているだろう。' },
      { en: 'By next April, she will have studied English for five years.', ja: '来年の4月で、彼女は5年間英語を勉強したことになる。' },
    ],
    questions: [
      { sentence: 'By the time you arrive, we ___ dinner.', choices: ['will have finished', 'have finished', 'finished'], answer: 0, why: '「あなたが着くころ（未来）には、夕食を終えているだろう」は will have ＋ 過去分詞。' },
      { sentence: 'I will have ___ this book by tomorrow.', choices: ['read', 'reading', 'to read'], answer: 0, why: 'will have のあとは過去分詞。read の過去分詞は read（発音は [red]）。' },
      { sentence: 'Next month, he will have worked here ___ three years.', choices: ['for', 'since', 'by'], answer: 0, why: '「3年間」という期間は for ＋ 期間。since は始まった時点を表す。' },
    ],
  },
  {
    id: 'relative-nonrestrictive',
    title: '関係代名詞の非制限用法（, who / , which）',
    points: [
      '関係代名詞の前にコンマ（,）を置くと、前の名詞について「ちなみに〜」と情報を付け足す言い方になる（非制限用法）。',
      'この使い方では that は使えない。人なら who、物なら which。, which は前の文全体を指すこともある。',
    ],
    examples: [
      { en: 'My uncle, who lives in Canada, is a pilot.', ja: 'おじは、カナダに住んでいるのだが、パイロットだ。' },
      { en: 'He passed the test, which made his mother happy.', ja: '彼は試験に合格し、そのことが母親を喜ばせた。' },
    ],
    questions: [
      { sentence: 'My sister, ___ works at a hospital, is very kind.', choices: ['who', 'which', 'that'], answer: 0, why: 'コンマのあとの非制限用法では that は使えない。人（my sister）なので who。' },
      { sentence: 'I visited Kyoto, ___ has many old temples.', choices: ['which', 'who', 'that'], answer: 0, why: '物・場所（Kyoto）なので which。コンマのあとに that は使えない。' },
      { sentence: 'She smiled at me, ___ made me happy.', choices: ['which', 'who', 'what'], answer: 0, why: ', which は前の文全体（彼女がほほえんだこと）を指せる。' },
    ],
  },
  {
    id: 'so-that-purpose',
    title: 'so that（〜できるように）',
    points: [
      'so that ＋ 主語 ＋ can / will ＋ 動詞の原形 で「〜が…できるように」と目的を表す。過去の文では could / would になる。',
      '不定詞（to ＋ 動詞の原形）でも目的を表せるが、主語がちがうときは so that を使うとわかりやすい：I spoke slowly so that she could understand.',
    ],
    examples: [
      { en: 'I got up early so that I could catch the first train.', ja: '始発の電車に乗れるように早く起きた。' },
      { en: 'Speak louder so that everyone can hear you.', ja: 'みんなに聞こえるように、もっと大きな声で話して。' },
    ],
    questions: [
      { sentence: 'She studied hard ___ she could pass the exam.', choices: ['so that', 'such that', 'even if'], answer: 0, why: '「合格できるように」と目的を表すので so that。' },
      { sentence: 'I wrote it down so that I ___ forget it.', choices: ["wouldn't", "not", "doesn't"], answer: 0, why: '過去の文の目的なので would の否定 wouldn\'t「忘れないように」。' },
      { sentence: 'Turn on the light so that we ___ see the map.', choices: ['can', 'could have', 'are'], answer: 0, why: '今これからの目的なので can「地図が見えるように」。' },
    ],
  },
  {
    id: 'formal-object-it',
    title: '形式目的語 it（find it 〜 to …）',
    points: [
      'find / make / think ＋ it ＋ 形容詞 ＋ to 〜 で「〜するのは…だと思う・わかる」「〜するのを…にする」。この it は後ろの to 〜 を指す（形式目的語）。',
      '例：I found it easy to make friends.「友だちを作るのはかんたんだとわかった」。',
    ],
    examples: [
      { en: 'I found it difficult to sleep last night.', ja: '昨夜はねむるのが難しかった。' },
      { en: 'The internet makes it easy to learn new things.', ja: 'インターネットのおかげで、新しいことを学ぶのがかんたんになる。' },
    ],
    questions: [
      { sentence: 'I found ___ hard to answer the question.', choices: ['it', 'that', 'this'], answer: 0, why: 'find it ＋ 形容詞 ＋ to 〜。it が to answer the question を指す。' },
      { sentence: 'The map made it easy ___ the station.', choices: ['to find', 'finding', 'found'], answer: 0, why: 'make it ＋ 形容詞 ＋ to 〜。it の中身は to find the station。' },
      { sentence: 'Do you think it important ___ breakfast every day?', choices: ['to eat', 'eat', 'ate'], answer: 0, why: 'think it ＋ 形容詞 ＋ to 〜「〜するのは…だと思う」。' },
    ],
  },
  {
    id: 'tense-agreement',
    title: '時制の一致（He said he was 〜）',
    points: [
      'said・thought・knew など過去の動詞のあとの that 節では、ふつう動詞も過去形にそろえる（時制の一致）。will は would、can は could になる。',
      'それよりさらに前のことを言うときは、過去完了（had ＋ 過去分詞）にする。',
    ],
    examples: [
      { en: 'She said that she was tired.', ja: '彼女はつかれていると言った。' },
      { en: 'I thought he would come.', ja: '彼は来るだろうと思った。' },
    ],
    questions: [
      { sentence: 'He said that he ___ hungry.', choices: ['was', 'is', 'be'], answer: 0, why: 'said（過去）に合わせて was。' },
      { sentence: 'I knew that she ___ help me.', choices: ['would', 'will', 'can'], answer: 0, why: 'knew（過去）に合わせて will を would にする。' },
      { sentence: 'Tom told me that he ___ lost his key the day before.', choices: ['had', 'has', 'have'], answer: 0, why: '「言った」ときよりさらに前のことなので過去完了 had lost。' },
    ],
  },
  {
    id: 'partial-negation',
    title: '部分否定（not all / not always）',
    points: [
      'not ＋ all / every / always / both は「全部（いつも）〜というわけではない」という部分否定になる。',
      '全部を否定するときは none / never / neither を使う：None of them came.「だれも来なかった」。',
    ],
    examples: [
      { en: 'Not all students like math.', ja: 'すべての生徒が数学を好きなわけではない。' },
      { en: 'I am not always busy.', ja: 'いつもいそがしいわけではない。' },
    ],
    questions: [
      { sentence: '___ all birds can fly. Penguins cannot.', choices: ['Not', 'No', 'None'], answer: 0, why: '「すべての鳥が飛べるわけではない」は Not all（部分否定）。' },
      { sentence: 'He is rich, but he is not ___ happy.', choices: ['always', 'never', 'ever'], answer: 0, why: 'not always「いつも〜とはかぎらない」（部分否定）。' },
      { sentence: '___ of my friends came. I was all alone.', choices: ['None', 'Not all', 'Not'], answer: 0, why: '「ひとりぼっちだった」ので、だれも来なかった。全部を否定する None。' },
    ],
  },
  {
    id: 'gerund-subject',
    title: '動名詞の意味上の主語（my opening 〜）',
    points: [
      '動名詞の前に所有格（my / his / Tom\'s）や目的格（me / him）を置くと、「〜が…すること」と、その動作をする人を表せる。',
      'Do you mind my opening the window?「私が窓を開けてもかまいませんか」。',
    ],
    examples: [
      { en: 'Do you mind my sitting here?', ja: '私がここにすわってもかまいませんか。' },
      { en: 'I remember my father reading to me every night.', ja: '父が毎晩本を読んでくれたことを覚えている。' },
    ],
    questions: [
      { sentence: 'Do you mind ___ opening the window?', choices: ['my', 'I', 'mine'], answer: 0, why: '動名詞 opening の意味上の主語は所有格 my（または目的格 me）。I は使えない。' },
      { sentence: 'She was surprised at ___ coming so early.', choices: ['his', 'he', 'he is'], answer: 0, why: '「彼がとても早く来たこと」。動名詞の前は所有格 his。' },
      { sentence: 'I remember my mother ___ me this song.', choices: ['singing', 'sung', 'to sing'], answer: 0, why: 'remember ＋ 人 ＋ -ing「人が〜したことを覚えている」。' },
    ],
  },
  {
    id: 'have-something-done',
    title: 'have / get ＋ 物 ＋ 過去分詞（〜してもらう）',
    points: [
      'have / get ＋ 物 ＋ 過去分詞 で「（人に）〜してもらう」。I had my hair cut.「髪を切ってもらった」。',
      'よくないことにも使い「〜される」の意味になる：I had my bike stolen.「自転車をぬすまれた」。',
    ],
    examples: [
      { en: 'I had my hair cut yesterday.', ja: '昨日、髪を切ってもらった。' },
      { en: 'She got her watch repaired.', ja: '彼女は腕時計を修理してもらった。' },
    ],
    questions: [
      { sentence: 'I had my car ___ at the shop.', choices: ['washed', 'wash', 'washing'], answer: 0, why: '車は「洗われる」側なので過去分詞 washed「洗ってもらった」。' },
      { sentence: 'He ___ his bag stolen on the train.', choices: ['had', 'made', 'let'], answer: 0, why: 'have ＋ 物 ＋ 過去分詞 で「〜される」（よくないこと）。make・let はこの形では使わない。' },
      { sentence: 'Where did you get your photos ___?', choices: ['printed', 'print', 'to print'], answer: 0, why: 'get ＋ 物 ＋ 過去分詞「〜してもらう」。写真は「印刷される」側。' },
    ],
  },
  {
    id: 'not-until',
    title: 'not 〜 until …（…して初めて〜）',
    points: [
      'not 〜 until … で「…まで〜しない」、つまり「…して初めて〜する」。',
      'It was not until 〜 that … で「〜になって初めて…した」と強く言える。',
    ],
    examples: [
      { en: 'I did not know the truth until yesterday.', ja: '昨日になって初めて本当のことを知った。' },
      { en: 'It was not until I lived abroad that I understood my own culture.', ja: '外国に住んで初めて、自分の文化がわかった。' },
    ],
    questions: [
      { sentence: 'He did not start studying ___ the night before the test.', choices: ['until', 'by', 'since'], answer: 0, why: 'not 〜 until …「…まで〜しない」。テストの前の晩まで勉強を始めなかった。' },
      { sentence: 'It was not until she came home ___ she noticed the mistake.', choices: ['that', 'when', 'which'], answer: 0, why: 'It was not until 〜 that …（強調構文）「〜して初めて…した」。' },
      { sentence: "We won't leave ___ the rain stops.", choices: ['until', 'by', 'during'], answer: 0, why: '「雨がやむまで出発しない」。あとに文が続くので接続詞の until。by・during はあとに文を続けられない。' },
    ],
  },
  {
    id: 'emphatic-do',
    title: '強調の do（I do like it）',
    points: [
      '動詞の前に do / does / did を置くと「本当に〜する」と強く言える（強調の do）。あとの動詞は原形。',
      'I do like it.「本当に好きなんだ」。He did come.「彼は本当に来たんだよ」。',
    ],
    examples: [
      { en: 'I do want to see you again.', ja: '本当にまた会いたいんだ。' },
      { en: 'She did finish her homework.', ja: '彼女は本当に宿題を終わらせたんだよ。' },
    ],
    questions: [
      { sentence: 'I ___ like your new shoes. They look great!', choices: ['do', 'am', 'did to'], answer: 0, why: '「本当に好き」と強調する do。あとの動詞は原形 like。' },
      { sentence: 'He does ___ hard every day.', choices: ['study', 'studies', 'studying'], answer: 0, why: '強調の does のあとは動詞の原形。' },
      { sentence: 'I did ___ the door. I am sure.', choices: ['lock', 'locked', 'locking'], answer: 0, why: '過去を強調する did のあとも原形。「本当にかぎをかけた」。' },
    ],
  },
  {
    id: 'be-to',
    title: 'be to 不定詞（〜する予定だ・〜しなければならない）',
    points: [
      'be ＋ to ＋ 動詞の原形 で「〜することになっている（予定）」「〜しなければならない（義務）」などを表す。',
      'ニュースや正式な文でよく使う：The meeting is to be held tomorrow.「会議は明日開かれる予定だ」。',
    ],
    examples: [
      { en: 'The president is to visit Japan next month.', ja: '大統領は来月、日本を訪問する予定だ。' },
      { en: 'You are to finish this by Friday.', ja: 'これを金曜日までに終えなければならない。' },
    ],
    questions: [
      { sentence: 'The new library ___ to open in April.', choices: ['is', 'has', 'does'], answer: 0, why: 'be to 〜「〜する予定だ」。主語が単数なので is。' },
      { sentence: 'Students are ___ wear their uniforms at the ceremony.', choices: ['to', 'for', 'in'], answer: 0, why: 'be to 〜「〜しなければならない」（義務）。' },
      { sentence: 'The concert is to ___ held in the park.', choices: ['be', 'being', 'been'], answer: 0, why: 'be to のあとは原形。コンサートは「開かれる」側なので be held。' },
    ],
  },
  {
    id: 'appositive-that',
    title: '同格の that（the fact that 〜）',
    points: [
      'the fact / the news / the idea / the hope ＋ that ＋ 文 で「〜という事実（知らせ・考え・望み）」と、名詞の中身を説明できる（同格の that）。',
      '関係代名詞の that とちがい、that のあとは主語や目的語がそろった完全な文になる。',
    ],
    examples: [
      { en: 'I was surprised at the news that our team had won.', ja: '私たちのチームが勝ったという知らせにおどろいた。' },
      { en: 'She has the idea that everyone can learn English.', ja: '彼女は、だれでも英語を学べるという考えをもっている。' },
    ],
    questions: [
      { sentence: 'We heard the news ___ the school would close.', choices: ['that', 'which', 'what'], answer: 0, why: '「学校が閉校するという知らせ」。後ろが完全な文なので同格の that。' },
      { sentence: 'The fact ___ he lied made me sad.', choices: ['that', 'who', 'where'], answer: 0, why: 'the fact that 〜「〜という事実」。' },
      { sentence: 'There is no hope ___ the bus will come on time.', choices: ['that', 'what', 'how'], answer: 0, why: 'hope that 〜「〜という望み」（同格の that）。' },
    ],
  },
  {
    id: 'superlative-compare',
    title: '最上級の意味を表す比較（than any other / No other 〜）',
    points: [
      '比較級 ＋ than any other ＋ 単数名詞「ほかのどの〜よりも…」で、最上級と同じ意味を表せる。',
      'No other ＋ 単数名詞 ＋ is as 〜 as … / Nothing is 比較級 than … 「…ほど〜なものはない」も最上級の意味になる。',
    ],
    examples: [
      { en: 'Mt. Fuji is higher than any other mountain in Japan.', ja: '富士山は日本のほかのどの山よりも高い。' },
      { en: 'No other student in my class is as tall as Ken.', ja: 'クラスでケンほど背の高い生徒はいない。' },
    ],
    questions: [
      { sentence: 'This bridge is longer than any other ___ in the city.', choices: ['bridge', 'bridges', 'the bridge'], answer: 0, why: 'than any other のあとは単数名詞（bridge）。' },
      { sentence: '___ other city in Japan is as large as Tokyo.', choices: ['No', 'Not', 'None'], answer: 0, why: 'No other ＋ 名詞 ＋ is as 〜 as …「…ほど〜な―はない」。' },
      { sentence: 'Nothing is ___ important than health.', choices: ['more', 'most', 'much'], answer: 0, why: 'Nothing is 比較級 than …「…より〜なものはない」。than があるので比較級 more。' },
    ],
  },
  {
    id: 'as-if',
    title: 'as if（まるで〜のように）',
    points: [
      'as if ＋ 主語 ＋ 過去形 で「まるで〜であるかのように」（今の事実とちがう想像）。be動詞はふつう were。',
      'as if ＋ had ＋ 過去分詞 は「まるで〜したかのように」と、過去のことを想像する。',
    ],
    examples: [
      { en: 'He talks as if he knew everything.', ja: '彼はまるで何でも知っているかのように話す。' },
      { en: 'She looked as if she had seen a ghost.', ja: '彼女はまるでゆうれいを見たかのような顔をしていた。' },
    ],
    questions: [
      { sentence: 'He is only a student, but he acts as if he ___ the boss.', choices: ['were', 'been', 'be'], answer: 0, why: '本当はちがうことの想像なので、as if のあとは were。' },
      { sentence: 'She has never been abroad, but she speaks English as if she ___ in London.', choices: ['lived', 'lives', 'living'], answer: 0, why: '外国に行ったことがないので事実とちがう想像。as if ＋ 過去形 lived。' },
      { sentence: 'He looked as if he ___ not slept for days.', choices: ['had', 'has', 'was'], answer: 0, why: '「何日も寝ていなかったかのよう」と過去のことの想像なので as if ＋ had ＋ 過去分詞。' },
    ],
  },
  {
    id: 'no-matter-how',
    title: 'no matter how / however（どんなに〜でも）',
    points: [
      'no matter how ＋ 形容詞・副詞 ＋ 主語 ＋ 動詞 で「どんなに〜でも」。however ＋ 形容詞 ＋ 主語 ＋ 動詞 も同じ意味。',
      'no matter what / who / where も「何を（だれが・どこへ）〜しても」の意味になる。',
    ],
    examples: [
      { en: 'No matter how hard I try, I cannot solve this puzzle.', ja: 'どんなにがんばっても、このパズルがとけない。' },
      { en: 'However tired you are, brush your teeth before bed.', ja: 'どんなにつかれていても、寝る前に歯をみがきなさい。' },
    ],
    questions: [
      { sentence: 'No matter ___ busy he is, he always calls his mother.', choices: ['how', 'what', 'who'], answer: 0, why: '形容詞 busy の前なので no matter how「どんなにいそがしくても」。' },
      { sentence: '___ late it is, please call me.', choices: ['However', 'Whatever', 'Whenever'], answer: 0, why: 'However ＋ 形容詞（late）「どんなにおそくても」。' },
      { sentence: 'No matter ___ you go, I will find you.', choices: ['where', 'how', 'what'], answer: 0, why: '「どこへ行っても」は no matter where。' },
    ],
  },
  {
    id: 'perfect-infinitive',
    title: '完了不定詞（seem to have done）',
    points: [
      'to have ＋ 過去分詞（完了不定詞）は、文の動詞よりも前のことを表す。He seems to have been sick.「彼は（前に）病気だったようだ」。',
      'seem / appear / be said などとよくいっしょに使う。',
    ],
    examples: [
      { en: 'She seems to have lost her key.', ja: '彼女はかぎをなくしたようだ。' },
      { en: 'The castle is said to have been built 400 years ago.', ja: 'その城は400年前に建てられたと言われている。' },
    ],
    questions: [
      { sentence: 'He seems to ___ a cold last week.', choices: ['have had', 'had', 'having'], answer: 0, why: 'last week（過去）のことを今「〜したようだ」と言うので完了不定詞 to have had。' },
      { sentence: 'The bridge is said to have ___ built in 1900.', choices: ['been', 'be', 'being'], answer: 0, why: '橋は「建てられた」と受け身なので to have been built。' },
      { sentence: 'She appears ___ the news already.', choices: ['to have heard', 'to hearing', 'hear'], answer: 0, why: '「もう知らせを聞いたようだ」。前のことなので to have heard。' },
    ],
  },
  {
    id: 'negative-participle',
    title: '否定の分詞構文（Not knowing 〜）',
    points: [
      '分詞構文を否定するときは、-ing の前に not / never を置く：Not knowing what to do, 〜「どうしたらいいかわからなかったので、〜」。',
      'not の位置に注意：Not knowing は正しいが、Knowing not は使わない。',
    ],
    examples: [
      { en: 'Not knowing the way, I asked a police officer.', ja: '道がわからなかったので、警察官にたずねた。' },
      { en: 'Never having seen snow, the children were very excited.', ja: '雪を見たことがなかったので、子どもたちはとても興奮していた。' },
    ],
    questions: [
      { sentence: '___ what to say, she just smiled.', choices: ['Not knowing', 'Knowing not', "Don't know"], answer: 0, why: '否定の分詞構文は not を -ing の前に置く。' },
      { sentence: 'Not ___ the answer, he kept quiet.', choices: ['knowing', 'known', 'to know'], answer: 0, why: 'Not のあとは -ing（分詞構文）。「答えがわからなかったので」。' },
      { sentence: '___ been to Kyoto before, I was excited to visit it.', choices: ['Never having', 'Having never not', 'Not had'], answer: 0, why: '「前に行ったことがなかったので」は Never having ＋ 過去分詞。' },
    ],
  },
  {
    id: 'perfect-participle',
    title: '完了形の分詞構文（Having finished 〜）',
    points: [
      'Having ＋ 過去分詞 で始まる分詞構文は、文の動詞よりも前に起きたことを表す。Having finished my homework, I went out.「宿題を終えてから出かけた」。',
      '受け身なら Having been ＋ 過去分詞（Having been を省いて過去分詞だけにすることも多い）。',
    ],
    examples: [
      { en: 'Having finished lunch, we went for a walk.', ja: '昼食を終えてから、散歩に出かけた。' },
      { en: 'Having lived in Canada, she speaks English well.', ja: 'カナダに住んでいたので、彼女は英語を上手に話す。' },
    ],
    questions: [
      { sentence: '___ finished the test, he left the room.', choices: ['Having', 'Being', 'Had'], answer: 0, why: '「テストを終えてから」と前のことなので Having ＋ 過去分詞。' },
      { sentence: 'Having ___ the movie before, I knew the ending.', choices: ['seen', 'saw', 'seeing'], answer: 0, why: 'Having のあとは過去分詞 seen。' },
      { sentence: 'Having been ___ in old English, the letter was hard to read.', choices: ['written', 'writing', 'wrote'], answer: 0, why: '手紙は「書かれた」側なので Having been written。' },
    ],
  },
  {
    id: 'compare-emphasis',
    title: '比較級の強調（much / even / far ＋ 比較級）',
    points: [
      '比較級を強めて「ずっと〜」「さらに〜」と言うときは、much / even / far を比較級の前に置く。',
      'very は比較級には使えない：much taller は正しいが、very taller はまちがい。',
    ],
    examples: [
      { en: 'This box is much heavier than that one.', ja: 'この箱はあの箱よりずっと重い。' },
      { en: 'Today is even colder than yesterday.', ja: '今日はきのうよりさらに寒い。' },
    ],
    questions: [
      { sentence: 'My brother is ___ taller than me.', choices: ['much', 'very', 'more'], answer: 0, why: '比較級（taller）を強めるのは much。very は使えない。' },
      { sentence: 'This test was ___ easier than the last one.', choices: ['far', 'very', 'most'], answer: 0, why: 'far ＋ 比較級「ずっと〜」。' },
      { sentence: 'Your idea is ___ better than mine.', choices: ['even', 'very', 'so'], answer: 0, why: 'even ＋ 比較級「さらに・いっそう」。very・so は比較級を強められない。' },
    ],
  },
  {
    id: 'without-but-for',
    title: 'Without / But for 〜（〜がなければ）',
    points: [
      'Without 〜, / But for 〜, ＋ 主語 ＋ would（could）＋ 動詞の原形 で「〜がなければ…だろう」（仮定法）。If it were not for 〜 と同じ意味。',
      '過去のことなら would（could）have ＋ 過去分詞：Without your help, I would have failed.「あなたの助けがなかったら失敗していただろう」。',
    ],
    examples: [
      { en: 'Without water, no plants could live.', ja: '水がなければ、どんな植物も生きられないだろう。' },
      { en: 'But for your advice, I would have made a big mistake.', ja: 'あなたの助言がなかったら、大きなまちがいをしていただろう。' },
    ],
    questions: [
      { sentence: '___ the internet, our lives would be very different.', choices: ['Without', 'With', 'Unless'], answer: 0, why: '「インターネットがなければ」。Unless のあとには文（主語＋動詞）が必要。' },
      { sentence: "Without your help, I ___ finished the work yesterday.", choices: ["couldn't have", "can't", "won't"], answer: 0, why: '過去（yesterday）のことの仮定なので could have ＋ 過去分詞の否定。' },
      { sentence: 'But ___ the map, we would get lost.', choices: ['for', 'with', 'by'], answer: 0, why: 'But for 〜「〜がなければ」。' },
    ],
  },
  {
    id: 'would-rather',
    title: 'would rather / prefer A to B（〜するほうがいい）',
    points: [
      'would rather ＋ 動詞の原形（than 〜）で「（〜するより）むしろ…したい」。否定は would rather not ＋ 動詞の原形。',
      'prefer A to B で「B より A が好き」。A と B には名詞や動名詞（-ing）が入る。to は前置詞なので、あとは原形ではなく名詞・-ing。',
    ],
    examples: [
      { en: "I'd rather stay home than go out in this rain.", ja: 'この雨の中出かけるより、家にいるほうがいい。' },
      { en: 'My brother prefers reading to watching TV.', ja: '兄はテレビを見るより本を読むほうが好きだ。' },
    ],
    questions: [
      { sentence: "I'd rather ___ a bus than walk.", choices: ['take', 'to take', 'taking'], answer: 0, why: 'would rather のあとは動詞の原形。' },
      { sentence: 'She prefers tea ___ coffee.', choices: ['to', 'than', 'from'], answer: 0, why: 'prefer A to B「B より A が好き」。' },
      { sentence: "I'd rather ___ talk about it now.", choices: ['not', "don't", 'no'], answer: 0, why: 'would rather の否定は would rather not ＋ 原形。' },
    ],
  },
  {
    id: 'it-is-time',
    title: 'It is time ＋ 過去形 / cannot help -ing',
    points: [
      'It is (high) time ＋ 主語 ＋ 過去形 で「もう〜してもいいころだ（まだしていない）」。形は過去形でも意味は今のこと（仮定法）。',
      'cannot help -ing で「〜せずにはいられない」。help のあとは動名詞（-ing）。',
    ],
    examples: [
      { en: "It's time you went to bed.", ja: 'もうねる時間ですよ。' },
      { en: 'I could not help laughing at his joke.', ja: '彼の冗談に笑わずにはいられなかった。' },
    ],
    questions: [
      { sentence: 'It is time we ___ home.', choices: ['went', 'go', 'going'], answer: 0, why: 'It is time ＋ 主語 ＋ 過去形。' },
      { sentence: 'She could not help ___ when she heard the news.', choices: ['crying', 'cry', 'to cry'], answer: 0, why: 'cannot help -ing「〜せずにはいられない」。' },
      { sentence: "It's high time you ___ your room.", choices: ['cleaned', 'clean', 'will clean'], answer: 0, why: 'high time でも過去形を使う。' },
    ],
  },
  {
    id: 'as-long-as',
    title: 'as long as / as far as / in case（〜するかぎり・〜の場合に備えて）',
    points: [
      'as long as 〜「〜しさえすれば・〜するあいだは」（条件・時間）。as far as 〜「〜の範囲では」（I know / I can see などと使う）。',
      'in case 〜「〜する場合に備えて」。未来のことでも in case のあとは現在形（in case it rains）。',
    ],
    examples: [
      { en: 'You can use my bike as long as you bring it back by six.', ja: '6時までに返してくれるなら、私の自転車を使っていいよ。' },
      { en: 'Take an umbrella in case it rains.', ja: '雨がふる場合に備えて、かさを持っていきなさい。' },
    ],
    questions: [
      { sentence: '___ I know, he has never been late.', choices: ['As far as', 'As long as', 'In case'], answer: 0, why: 'As far as I know「私の知るかぎりでは」（知識の範囲）。' },
      { sentence: "Write down my number in case you ___ lost.", choices: ['get', 'will get', 'got'], answer: 0, why: 'in case のあとは未来のことでも現在形。' },
      { sentence: "I don't mind ___ you are happy.", choices: ['as long as', 'as far as', 'in case'], answer: 0, why: '「きみが幸せでありさえすれば」という条件なので as long as。' },
    ],
  },
  {
    id: 'if-inversion',
    title: 'if の省略による倒置（Had I known 〜 / Should you 〜）',
    points: [
      '仮定法の if を省くと、助動詞（had / were / should）が主語の前に出る：If I had known → Had I known「もし知っていたら」。',
      'Should you 〜「万一〜なら」（If you should 〜）、Were I 〜「もし私が〜なら」（If I were 〜）。かたい書きことばで使う。',
    ],
    examples: [
      { en: 'Had I known the truth, I would have told you.', ja: 'もし本当のことを知っていたら、あなたに話していただろう。' },
      { en: 'Should you need any help, please call me.', ja: '万一助けが必要なら、電話してください。' },
    ],
    questions: [
      { sentence: '___ I left earlier, I would have caught the train.', choices: ['Had', 'If', 'Have'], answer: 0, why: 'If I had left の if を省いて Had I left。If なら If I had left になる。' },
      { sentence: '___ you have any questions, feel free to ask.', choices: ['Should', 'Would', 'Could'], answer: 0, why: 'Should you 〜「万一〜なら」。' },
      { sentence: '___ I you, I would accept the offer.', choices: ['Were', 'Was', 'Am'], answer: 0, why: 'If I were you の倒置で Were I you。' },
    ],
  },
  {
    id: 'passive-progressive-perfect',
    title: '受け身の進行形・完了形（is being made / has been made）',
    points: [
      '進行形の受け身は be ＋ being ＋ 過去分詞「〜されているところだ」：The road is being repaired.',
      '完了形の受け身は have / has ＋ been ＋ 過去分詞「（もう）〜された・ずっと〜されている」：The letter has been sent.',
    ],
    examples: [
      { en: 'A new library is being built near the station.', ja: '駅の近くに新しい図書館が建てられているところだ。' },
      { en: 'This song has been loved for fifty years.', ja: 'この歌は50年間ずっと愛されてきた。' },
    ],
    questions: [
      { sentence: 'Dinner is ___ cooked by my father now.', choices: ['being', 'been', 'be'], answer: 0, why: '「今つくられているところ」なので is being ＋ 過去分詞。' },
      { sentence: 'The window has ___ broken.', choices: ['been', 'being', 'be'], answer: 0, why: '完了形の受け身は has been ＋ 過去分詞。' },
      { sentence: 'Many trees ___ been cut down since last year.', choices: ['have', 'are', 'were'], answer: 0, why: 'since があるので現在完了。主語が複数なので have been。' },
    ],
  },
  {
    id: 'unless',
    title: 'unless（〜しないかぎり）と if 〜 not',
    points: [
      'unless ＋ 主語 ＋ 動詞 で「〜しないかぎり・〜でなければ」。if 〜 not とほぼ同じ意味：unless you hurry ＝ if you don\'t hurry。',
      'unless のあとはふつう肯定の形（not を入れない）。未来のことでも現在形を使う：unless it rains tomorrow。',
    ],
    examples: [
      { en: "You will miss the bus unless you leave now.", ja: '今出ないと、バスに乗りおくれるよ。' },
      { en: "Unless it rains, we will play soccer.", ja: '雨がふらないかぎり、サッカーをします。' },
    ],
    questions: [
      { sentence: "I can't go ___ my homework is finished.", choices: ['unless', 'if', 'because'], answer: 0, why: '「宿題が終わらないかぎり行けない」なので unless。' },
      { sentence: 'Unless you ___ hard, you will not pass.', choices: ['study', "don't study", 'will study'], answer: 0, why: 'unless のあとは肯定の形で、未来のことでも現在形。' },
      { sentence: "If you don't hurry, you'll be late. ＝ ___ you hurry, you'll be late.", choices: ['Unless', 'If', 'When'], answer: 0, why: 'if 〜 not ＝ unless。' },
    ],
  },
  {
    id: 'the-adjective',
    title: 'the ＋ 形容詞（the young ＝ 若い人々）',
    points: [
      'the ＋ 形容詞 で「〜な人々」という意味の名詞になる：the young（若い人々）、the elderly（お年寄り）、the poor（まずしい人々）。',
      '「人々」なので複数あつかい：The young are 〜（is ではない）。s はつけない（the youngs ×）。',
    ],
    examples: [
      { en: 'This bus has special seats for the elderly.', ja: 'このバスには、お年寄りのための特別な席がある。' },
      { en: 'The rich should help the poor.', ja: 'お金持ちの人々はまずしい人々を助けるべきだ。' },
    ],
    questions: [
      { sentence: 'The young ___ often interested in new technology.', choices: ['are', 'is', 'was'], answer: 0, why: 'the young は「若い人々」なので複数あつかい。' },
      { sentence: 'We collected money for ___.', choices: ['the poor', 'the poors', 'poor'], answer: 0, why: 'the ＋ 形容詞で「〜な人々」。s はつけない。' },
      { sentence: 'Schools should be easy to use for ___ blind.', choices: ['the', 'a', 'an'], answer: 0, why: 'the blind で「目の不自由な人々」。' },
    ],
  },
  {
    id: 'no-sooner',
    title: 'no sooner 〜 than / hardly 〜 when（〜するとすぐに）',
    points: [
      'S had no sooner ＋ 過去分詞 than S ＋ 過去形 で「〜するとすぐに…した」。hardly（scarcely）〜 when（before）も同じ意味。',
      'No sooner / Hardly を文の頭に出すと倒置：No sooner had I arrived than it began to rain.（had が主語の前に出る）',
    ],
    examples: [
      { en: 'No sooner had I left home than it started to snow.', ja: '家を出るとすぐに、雪がふりはじめた。' },
      { en: 'She had hardly sat down when the phone rang.', ja: '彼女がすわったとたんに、電話が鳴った。' },
    ],
    questions: [
      { sentence: 'No sooner had he come home ___ he went to bed.', choices: ['than', 'when', 'that'], answer: 0, why: 'no sooner 〜 than の組み合わせ。' },
      { sentence: 'Hardly had we started ___ it began to rain.', choices: ['when', 'than', 'so'], answer: 0, why: 'hardly 〜 when の組み合わせ。' },
      { sentence: 'No sooner ___ the bell rung than the students ran out.', choices: ['had', 'did', 'was'], answer: 0, why: 'No sooner を文頭に出すと had ＋ 主語 ＋ 過去分詞の倒置。' },
    ],
  },
  {
    id: 'find-leave-oc',
    title: 'find / leave ＋ O ＋ C（〜が…だとわかる・〜を…のままにする）',
    points: [
      'find ＋ O ＋ 形容詞 で「O が〜だとわかる（思う）」：I found the book interesting.「その本はおもしろいと思った」。',
      'leave ＋ O ＋ 形容詞 で「O を〜のままにしておく」：Don\'t leave the window open.「窓を開けっぱなしにしないで」。',
    ],
    examples: [
      { en: 'I found the test easy.', ja: 'そのテストはかんたんだとわかった。' },
      { en: 'He left the lights on all night.', ja: '彼は一晩じゅう電気をつけっぱなしにした。' },
    ],
    questions: [
      { sentence: 'We found the movie very ___.', choices: ['exciting', 'excitingly', 'excite'], answer: 0, why: 'find ＋ O ＋ 形容詞。副詞（excitingly）は使えない。' },
      { sentence: 'Please ___ the door open. It is hot.', choices: ['leave', 'find', 'say'], answer: 0, why: '「ドアを開けたままにしておいて」なので leave ＋ O ＋ 形容詞。' },
      { sentence: 'She found ___ difficult.', choices: ['the question', 'to the question', 'of the question'], answer: 0, why: 'find のあとにすぐ O（the question）を置き、そのあとに形容詞。' },
    ],
  },
  {
    id: 'may-well',
    title: 'may well / might as well（〜するのももっともだ・〜したほうがましだ）',
    points: [
      'may well ＋ 動詞の原形 で「〜するのももっともだ」「たぶん〜だろう」：You may well be tired.「つかれているのも当然だ」。',
      'might（may）as well ＋ 動詞の原形 で「（ほかにすることもないし）〜したほうがいい・〜してもいいだろう」：We might as well go home.',
    ],
    examples: [
      { en: 'She may well be angry. You broke her cup.', ja: '彼女がおこるのももっともだ。きみは彼女のカップをわったんだから。' },
      { en: 'The bus is late. We might as well walk.', ja: 'バスがおくれている。歩いたほうがいいかもね。' },
    ],
    questions: [
      { sentence: 'You studied all night, so you may ___ be sleepy.', choices: ['well', 'good', 'as'], answer: 0, why: 'may well ＋ 原形「〜するのももっともだ」。' },
      { sentence: "There's nothing to do. We might as well ___ to bed.", choices: ['go', 'to go', 'going'], answer: 0, why: 'might as well のあとは動詞の原形。' },
      { sentence: 'It ___ well rain this afternoon. Look at those clouds.', choices: ['may', 'must', 'should'], answer: 0, why: 'may well「たぶん〜だろう」。' },
    ],
  },
  {
    id: 'in-order-to',
    title: 'in order to / so as to（〜するために）と not の位置',
    points: [
      'in order to ＋ 動詞の原形 / so as to ＋ 動詞の原形 で「〜するために」。to だけより「目的」がはっきりする。',
      '「〜しないように」は in order not to 〜 / so as not to 〜。not は to の前に置く。',
    ],
    examples: [
      { en: 'He got up early in order to catch the first train.', ja: '彼は始発電車に乗るために早起きした。' },
      { en: 'Speak quietly so as not to wake the baby.', ja: '赤ちゃんを起こさないように、静かに話して。' },
    ],
    questions: [
      { sentence: 'She saved money in order ___ a new bike.', choices: ['to buy', 'buying', 'for buy'], answer: 0, why: 'in order to ＋ 動詞の原形。' },
      { sentence: 'I wrote it down so as ___ forget it.', choices: ['not to', 'to not', 'no to'], answer: 0, why: '「忘れないように」は so as not to。not は to の前。' },
      { sentence: 'We left early ___ order to avoid the traffic.', choices: ['in', 'on', 'for'], answer: 0, why: 'in order to のまとまり。' },
    ],
  },
  {
    id: 'be-used-to',
    title: 'be used to -ing / get used to -ing（〜に慣れている・慣れる）',
    points: [
      'be used to ＋ 名詞・-ing で「〜に慣れている」（状態）、get used to ＋ 名詞・-ing で「〜に慣れる」（変化）。',
      'この to は前置詞なので、あとは動詞の原形ではなく -ing。used to ＋ 動詞の原形（以前は〜していた）と区別する。',
    ],
    examples: [
      { en: 'I am used to getting up early.', ja: '私は早起きに慣れている。' },
      { en: 'She soon got used to life in Tokyo.', ja: '彼女はすぐに東京での生活に慣れた。' },
    ],
    questions: [
      { sentence: 'My father is used to ___ long hours.', choices: ['working', 'work', 'worked'], answer: 0, why: 'be used to のあとは -ing（前置詞の to）。' },
      { sentence: 'You will soon ___ used to the new school.', choices: ['get', 'be getting to', 'use'], answer: 0, why: '「慣れる」という変化は get used to。' },
      { sentence: 'I ___ play the piano, but I stopped.', choices: ['used to', 'am used to', 'get used to'], answer: 0, why: '「以前は〜していた」は used to ＋ 動詞の原形。' },
    ],
  },
  {
    id: 'still-anymore',
    title: 'still / not 〜 anymore / no longer（まだ・もう〜ない）',
    points: [
      'still は「（今も）まだ〜」。ふつう一般動詞の前、be 動詞のあとに置く：He still lives here. / It is still raining.',
      '「もう〜ない」は not 〜 anymore（文の最後）または no longer（動詞の前）：She doesn\'t live here anymore. ＝ She no longer lives here.',
    ],
    examples: [
      { en: 'I still remember my first day at school.', ja: '学校の最初の日のことを今でもまだ覚えている。' },
      { en: 'My brother no longer plays baseball.', ja: '兄はもう野球をしていない。' },
    ],
    questions: [
      { sentence: 'Are you ___ hungry? Have some more.', choices: ['still', 'yet', 'anymore'], answer: 0, why: '「まだおなかがすいている？」は still。' },
      { sentence: "I don't use this bag ___.", choices: ['anymore', 'still', 'no longer'], answer: 0, why: 'not 〜 anymore「もう〜ない」。anymore は文の最後。' },
      { sentence: 'He ___ works at the bank. He changed jobs.', choices: ['no longer', 'still', 'not'], answer: 0, why: '仕事をかえたので「もう〜していない」no longer。' },
    ],
  },
  {
    id: 'participle-idioms',
    title: '分詞構文の決まった言い方（generally speaking / judging from 〜）',
    points: [
      '主語を言わずに使う決まった分詞構文：generally speaking「一般的に言えば」、frankly speaking「正直に言うと」、strictly speaking「厳密に言えば」。',
      'judging from 〜「〜から判断すると」、considering 〜「〜を考えると」、talking of 〜「〜と言えば」。文の頭に置いてコンマで区切ることが多い。',
    ],
    examples: [
      { en: 'Generally speaking, cats sleep more than dogs.', ja: '一般的に言えば、ねこは犬よりよくねる。' },
      { en: 'Judging from the sky, it will rain soon.', ja: '空のようすから判断すると、もうすぐ雨がふるだろう。' },
    ],
    questions: [
      { sentence: '___ speaking, I did not like the movie.', choices: ['Frankly', 'Frank', 'Franker'], answer: 0, why: 'frankly speaking「正直に言うと」。副詞 ＋ speaking の形。' },
      { sentence: '___ from his face, he is very tired.', choices: ['Judging', 'Judged', 'Judge'], answer: 0, why: 'judging from 〜「〜から判断すると」。' },
      { sentence: '___ his age, he runs very fast.', choices: ['Considering', 'Considered', 'To consider'], answer: 0, why: 'considering 〜「〜を考えると（〜のわりには）」。' },
    ],
  },
  {
    id: 'it-is-said',
    title: 'It is said that 〜 / They say 〜（〜だそうだ・〜と言われている）',
    points: [
      'It is said that ＋ 文 で「〜と言われている」。They say (that) ＋ 文 / People say 〜 もほぼ同じ意味（この they は「世間の人々」）。',
      '主語を前に出して ＜主語＞ is said to ＋ 動詞の原形 とも言える：It is said that he is rich. ＝ He is said to be rich.',
    ],
    examples: [
      { en: 'It is said that this temple is 800 years old.', ja: 'この寺は800年前からあると言われている。' },
      { en: 'They say the new shop is very popular.', ja: '新しい店はとても人気があるそうだ。' },
    ],
    questions: [
      { sentence: 'It is ___ that the lake has a monster.', choices: ['said', 'saying', 'say'], answer: 0, why: 'It is said that 〜（受け身）。' },
      { sentence: '___ say that this winter will be cold.', choices: ['They', 'It', 'There'], answer: 0, why: 'They say 〜「〜だそうだ」。' },
      { sentence: 'He is said ___ a good cook.', choices: ['to be', 'that he is', 'being'], answer: 0, why: '主語を前に出すと is said to ＋ 動詞の原形。' },
    ],
  },
  {
    id: 'strong-negation',
    title: '否定の強調（not 〜 at all / by no means / far from）',
    points: [
      'not 〜 at all「まったく〜ない」。by no means / not 〜 by any means も「決して〜ない」と強く打ち消す。',
      'far from 〜「〜からほど遠い＝少しも〜ではない」：The work is far from finished.「仕事はまったく終わっていない」。',
    ],
    examples: [
      { en: "I wasn't tired at all.", ja: '私はまったく疲れていなかった。' },
      { en: 'This puzzle is by no means easy.', ja: 'このパズルは決してかんたんではない。' },
    ],
    questions: [
      { sentence: "I don't like horror movies ___ all.", choices: ['at', 'in', 'for'], answer: 0, why: 'not 〜 at all「まったく〜ない」。' },
      { sentence: 'His answer was ___ from perfect.', choices: ['far', 'long', 'much'], answer: 0, why: 'far from 〜「少しも〜ではない」。' },
      { sentence: 'The test was by ___ means difficult.', choices: ['no', 'not', 'any'], answer: 0, why: 'by no means「決して〜ない」。' },
    ],
  },
  {
    id: 'now-that-once',
    title: 'now that / once（〜した今は・いったん〜すると）',
    points: [
      'now that ＋ 文 で「（今や）〜したので・〜した今は」：Now that I have a bike, I can go anywhere.',
      'once ＋ 文 で「いったん〜すると・〜するとすぐ」：Once you start, you can\'t stop. 未来のことでも once のあとは現在形。',
    ],
    examples: [
      { en: 'Now that summer is here, we can swim in the sea.', ja: '夏が来たので、海で泳げる。' },
      { en: 'Once you learn to ride a bike, you never forget.', ja: 'いったん自転車に乗れるようになると、決してわすれない。' },
    ],
    questions: [
      { sentence: '___ that you are a junior high student, you should get up by yourself.', choices: ['Now', 'Once', 'Since'], answer: 0, why: 'now that 〜「〜した今は」。' },
      { sentence: '___ you open the box, you will understand.', choices: ['Once', 'Now', 'Than'], answer: 0, why: 'once 〜「いったん〜すると」。' },
      { sentence: 'Once she ___ home, I will call you.', choices: ['gets', 'will get', 'got'], answer: 0, why: '未来のことでも once のあとは現在形。' },
    ],
  },
  {
    id: 'thing-adjective',
    title: '-thing ＋ 形容詞（something cold / nothing special）',
    points: [
      'something / anything / nothing / everything を形容詞で説明するときは、形容詞をうしろに置く：something cold「何か冷たいもの」（× cold something）。',
      'to 〜 もいっしょに使うときは「-thing ＋ 形容詞 ＋ to 〜」の順：something hot to drink「何か温かい飲みもの」。',
    ],
    examples: [
      { en: 'I want to eat something sweet.', ja: '何かあまいものが食べたい。' },
      { en: 'There is nothing special in the box.', ja: '箱の中には特別なものは何もない。' },
    ],
    questions: [
      { sentence: 'Did you see anything ___ at the zoo?', choices: ['interesting', 'interest', 'interestingly'], answer: 0, why: 'anything ＋ 形容詞の順。' },
      { sentence: 'I want ___ to drink.', choices: ['something cold', 'cold something', 'some cold thing'], answer: 0, why: '-thing ＋ 形容詞 ＋ to 〜 の順。' },
      { sentence: 'Nothing ___ happened today.', choices: ['new', 'news', 'newly'], answer: 0, why: 'nothing ＋ 形容詞 new「新しいことは何も」。' },
    ],
  },
  {
    id: 'whether-concession',
    title: '譲歩の whether A or B（A であろうと B であろうと）',
    points: [
      'Whether A or B, 〜 で「A であろうと B であろうと〜」。whether 〜 or not で「〜であろうとなかろうと」。',
      '「〜かどうか」（名詞節：I don\'t know whether he will come.）とちがい、文の残りを説明する副詞のまとまり。未来のことでも現在形を使う。',
    ],
    examples: [
      { en: 'Whether you like it or not, you have to go to school.', ja: '好きであろうとなかろうと、学校には行かなければならない。' },
      { en: 'Whether it is sunny or rainy, he walks his dog.', ja: '晴れでも雨でも、彼は犬の散歩をする。' },
    ],
    questions: [
      { sentence: '___ you win or lose, do your best.', choices: ['Whether', 'If', 'Unless'], answer: 0, why: 'Whether A or B「A であろうと B であろうと」。' },
      { sentence: 'Whether it ___ tomorrow or not, the game will be held.', choices: ['rains', 'will rain', 'rained'], answer: 0, why: '副詞のまとまりの中なので、未来のことでも現在形。' },
      { sentence: 'Whether you agree ___ not, we must decide today.', choices: ['or', 'and', 'nor'], answer: 0, why: 'whether 〜 or not「〜であろうとなかろうと」。' },
    ],
  },
  {
    id: 'passive-prep',
    title: 'by 以外の前置詞を使う受け身（be covered with / be known to / be made of・from）',
    points: [
      '決まった前置詞を使う受け身：be covered with 〜（〜でおおわれている）、be known to 〜（〜に知られている）、be filled with 〜（〜でいっぱいだ）。',
      'be made of 〜 は材料が見てわかるとき（木の机）、be made from 〜 は原料の形が変わるとき（ぶどうからワイン）。',
    ],
    examples: [
      { en: 'The mountain is covered with snow.', ja: 'その山は雪でおおわれている。' },
      { en: 'Cheese is made from milk.', ja: 'チーズは牛乳から作られる。' },
    ],
    questions: [
      { sentence: 'This chair is made ___ wood.', choices: ['of', 'at', 'by'], answer: 0, why: '材料（木）が見てわかるので made of。' },
      { sentence: 'His name is known ___ everyone in the town.', choices: ['to', 'at', 'for'], answer: 0, why: 'be known to 〜「〜に知られている」。' },
      { sentence: 'The box was filled ___ old letters.', choices: ['with', 'of', 'to'], answer: 0, why: 'be filled with 〜「〜でいっぱいだ」。' },
    ],
  },
  {
    id: 'appositive-comma',
    title: '同格のコンマ（Mr. Sato, our teacher, 〜）',
    points: [
      '名詞のすぐあとにコンマではさんで別の名詞を置くと、前の名詞を言いかえて説明できる：Mr. Sato, our teacher, likes jazz.「私たちの先生の佐藤先生はジャズが好きだ」。',
      'はさんだ部分を取っても文は成り立つ。動詞は最初の名詞（主語）に合わせる。',
    ],
    examples: [
      { en: 'Kyoto, an old city in Japan, has many temples.', ja: '日本の古い都市である京都には、たくさんの寺がある。' },
      { en: 'I met Emma, a student from Canada.', ja: 'カナダから来た生徒のエマに会った。' },
    ],
    questions: [
      { sentence: 'Tom, my best friend, ___ in Osaka.', choices: ['lives', 'live', 'living'], answer: 0, why: '主語は Tom（1人）なので lives。my best friend は言いかえ。' },
      { sentence: 'This is Pochi, ___ dog.', choices: ['our', 'we', 'us'], answer: 0, why: 'Pochi を言いかえる名詞のまとまり our dog。' },
      { sentence: 'Mt. Fuji, the highest mountain in Japan, ___ beautiful.', choices: ['is', 'are', 'be'], answer: 0, why: '主語は Mt. Fuji（1つ）なので is。' },
    ],
  },
  {
    id: 'one-it',
    title: '代名詞 one と it のちがい',
    points: [
      'it は「（前に出た）その物そのもの」：I bought a bag. I like it.「そのかばんが気に入っている」。',
      'one は「同じ種類のもの（別の1つ）」：I lost my umbrella. I need a new one.「新しいかさ（別のかさ）が必要だ」。複数なら ones。',
    ],
    examples: [
      { en: 'This cup is dirty. Can I have a clean one?', ja: 'このカップはよごれています。きれいなのをもらえますか。' },
      { en: 'I found my key. It was under the bed.', ja: 'かぎが見つかった。（それは）ベッドの下にあった。' },
    ],
    questions: [
      { sentence: "I don't have a pencil. Can you lend me ___?", choices: ['one', 'it', 'them'], answer: 0, why: '特定のえんぴつではなく「（どれでも）1本」なので one。' },
      { sentence: 'My father gave me a watch. I wear ___ every day.', choices: ['it', 'one', 'ones'], answer: 0, why: 'もらった「その時計」そのものなので it。' },
      { sentence: 'These shoes are too small. I want bigger ___.', choices: ['ones', 'one', 'it'], answer: 0, why: '複数の shoes の代わりなので ones。' },
    ],
  },
  {
    id: 'every-time',
    title: '接続詞の働きをする名詞（every time / the next time / the moment）',
    points: [
      'every time ＋ 文「〜するたびに」、the next time ＋ 文「次に〜するとき」、the moment ＋ 文「〜したとたん」。名詞のまとまりが接続詞のように文をつなぐ。',
      '時を表すまとまりなので、未来のことでも現在形を使う：The next time you come, I will show you.',
    ],
    examples: [
      { en: 'Every time I hear this song, I think of summer.', ja: 'この歌を聞くたびに、夏を思い出す。' },
      { en: 'The moment she saw her dog, she started to cry.', ja: '犬を見たとたん、彼女は泣きだした。' },
    ],
    questions: [
      { sentence: '___ time I visit Kyoto, I find something new.', choices: ['Every', 'All', 'Some'], answer: 0, why: 'every time 〜「〜するたびに」。' },
      { sentence: 'The next time you ___ here, call me.', choices: ['come', 'will come', 'came'], answer: 0, why: '時を表すまとまりの中は、未来のことでも現在形。' },
      { sentence: 'The ___ he got home, it began to rain.', choices: ['moment', 'minute ago', 'time ago'], answer: 0, why: 'the moment 〜「〜したとたん」。' },
    ],
  },
  {
    id: 'allow-to',
    title: 'allow / enable / encourage ＋ 人 ＋ to 〜',
    points: [
      'allow 人 to 〜「人が〜するのを許す」、enable 人 to 〜「人が〜するのを可能にする」、encourage 人 to 〜「人に〜するようはげます」。',
      '主語がものになることも多い：The bridge enables people to cross the river.「その橋のおかげで人々は川をわたれる」。受け身は be allowed to 〜「〜することを許されている」。',
    ],
    examples: [
      { en: 'My parents allowed me to keep a cat.', ja: '両親は私がねこを飼うのを許してくれた。' },
      { en: 'The coach encouraged us to keep trying.', ja: 'コーチは私たちにがんばり続けるようはげました。' },
    ],
    questions: [
      { sentence: 'The teacher allowed us ___ early.', choices: ['to leave', 'leave', 'leaving'], answer: 0, why: 'allow 人 to 〜 の形。' },
      { sentence: 'The internet ___ us to learn from anywhere.', choices: ['enables', 'makes', 'lets'], answer: 0, why: 'enable 人 to 〜。make / let は to を使わず原形（make us learn）。' },
      { sentence: 'Students are not ___ to use phones in class.', choices: ['allowed', 'allowing', 'allow'], answer: 0, why: '受け身 be allowed to 〜「〜することを許されている」。' },
    ],
  },
  {
    id: 'take-idioms',
    title: 'take の熟語（take care of / take part in / take a look at）',
    points: [
      'take care of 〜「〜の世話をする・〜を大切にする」、take part in 〜「〜に参加する」、take a look at 〜「〜をちょっと見る」。',
      '前置詞（of / in / at）までがひとまとまり。あとに動詞が来るときは -ing：take part in cleaning the park。',
    ],
    examples: [
      { en: 'I take care of my little sister after school.', ja: '放課後は妹の世話をしている。' },
      { en: 'Many students took part in the speech contest.', ja: '多くの生徒がスピーチコンテストに参加した。' },
    ],
    questions: [
      { sentence: 'Who will take care ___ the dog?', choices: ['of', 'for', 'with'], answer: 0, why: 'take care of 〜「〜の世話をする」。' },
      { sentence: 'Let\'s take part ___ the festival.', choices: ['in', 'on', 'at'], answer: 0, why: 'take part in 〜「〜に参加する」。' },
      { sentence: 'Can you take a look ___ my homework?', choices: ['at', 'to', 'of'], answer: 0, why: 'take a look at 〜「〜をちょっと見る」。' },
    ],
  },
  {
    id: 'think-so',
    title: 'so / not で文の代わり（I think so. / I hope not.）',
    points: [
      'think / hope / be afraid などのあとの so は、前の文の内容をまとめて受ける：“Will it be sunny?” “I think so.”（晴れると思う）。',
      '「そうではないと思う・そうならないといい」は not：I hope not.（そうならないといい）/ I\'m afraid not.（残念ながらちがう）。think はふつう I don\'t think so. を使う。',
    ],
    examples: [
      { en: '"Is Ken coming to the party?" "I hope so."', ja: '「ケンはパーティーに来るの？」「そうだといいね」' },
      { en: '"Will it rain tomorrow?" "I hope not."', ja: '「明日は雨かな？」「ふらないといいな」' },
    ],
    questions: [
      { sentence: '"Is this the right bus?" "I think ___."', choices: ['so', 'it', 'that'], answer: 0, why: '前の内容を受けるのは so（I think so.）。' },
      { sentence: '"Will the test be difficult?" "I hope ___."', choices: ['not', 'no', "don't"], answer: 0, why: '「そうならないといい」は I hope not.' },
      { sentence: '"Is he angry?" "I don\'t think ___."', choices: ['so', 'not', 'it'], answer: 0, why: '「そうは思わない」は I don\'t think so.' },
    ],
  },
  {
    id: 'so-as-to-degree',
    title: 'so 〜 as to … / such 〜 as to …（…するほど〜）',
    points: [
      'so ＋ 形容詞・副詞 ＋ as to ＋ 動詞の原形 で「…するほど〜」：He was so kind as to carry my bag.「親切にもかばんを運んでくれた」。',
      'such ＋（a）＋ 形容詞 ＋ 名詞 ＋ as to 〜 も同じ意味。so 〜 that … で言いかえられる：He was so kind that he carried my bag.',
    ],
    examples: [
      { en: 'She was so careless as to forget her own birthday.', ja: '彼女は自分の誕生日を忘れるほどうっかりしていた。' },
      { en: 'He is not such a fool as to believe that story.', ja: '彼はその話を信じるほどばかではない。' },
    ],
    questions: [
      { sentence: 'He was so kind ___ to show me the way.', choices: ['as', 'that', 'for'], answer: 0, why: 'so 〜 as to …「…するほど〜」。' },
      { sentence: 'She was so tired as ___ asleep on the train.', choices: ['to fall', 'falling', 'fell'], answer: 0, why: 'as to のあとは動詞の原形。' },
      { sentence: "I'm not ___ a child as to cry about it.", choices: ['such', 'so', 'very'], answer: 0, why: '名詞（a child）があるので such 〜 as to。' },
    ],
  },
  {
    id: 'adj-that',
    title: '形容詞 ＋ that 節（I\'m glad that 〜 / I\'m sure that 〜）',
    points: [
      'be glad / sorry / surprised ＋ that ＋ 主語 ＋ 動詞 で「〜ということがうれしい・残念だ・おどろいた」。that はよく省略される。',
      'be sure / afraid ＋ that 〜「きっと〜だと思う・（残念ながら）〜だと思う」。to 〜（glad to see you）は主語が同じとき、that 節は主語がちがうときにも使える。',
    ],
    examples: [
      { en: "I'm glad that you came to my party.", ja: 'あなたがパーティーに来てくれてうれしい。' },
      { en: "I'm sure that she will win the race.", ja: 'きっと彼女はレースに勝つと思う。' },
    ],
    questions: [
      { sentence: "I'm ___ that you liked the present.", choices: ['glad', 'gladly', 'gladness'], answer: 0, why: 'be glad that 〜「〜ということがうれしい」。形容詞 glad。' },
      { sentence: "I'm afraid ___ it will rain tomorrow.", choices: ['that', 'to', 'of'], answer: 0, why: 'あとに主語＋動詞（it will rain）が続くので that 節。' },
      { sentence: 'She was surprised ___ her brother passed the test.', choices: ['that', 'to', 'for'], answer: 0, why: '主語（her brother）がちがうので that 節。' },
    ],
  },
  {
    id: 'during-for',
    title: 'during と for のちがい（during the summer / for two weeks）',
    points: [
      'during ＋「いつの間か」（特定の期間）：during the summer vacation「夏休みの間に」、during the class「授業中に」。',
      'for ＋「どのくらいの長さか」（期間の長さ）：for two weeks「2週間」、for an hour「1時間」。数字といっしょならふつう for。',
    ],
    examples: [
      { en: 'I visited my grandparents during the winter vacation.', ja: '冬休みの間に祖父母をたずねた。' },
      { en: 'We stayed in Hokkaido for five days.', ja: '私たちは北海道に5日間滞在した。' },
    ],
    questions: [
      { sentence: "Don't talk ___ the test.", choices: ['during', 'for', 'while'], answer: 0, why: '「テストの間」（いつの間か）なので during。while のあとは主語＋動詞。' },
      { sentence: 'I have lived here ___ ten years.', choices: ['for', 'during', 'in'], answer: 0, why: '「10年間」（長さ）なので for。' },
      { sentence: 'It rained ___ the night.', choices: ['during', 'for', 'since'], answer: 0, why: '「夜の間に」（特定の期間）なので during。' },
    ],
  },
  {
    id: 'no-more-than',
    title: '数量の比較表現（as many as / no more than / no less than）',
    points: [
      'as many as ＋ 数（数えられる）/ as much as ＋ 量「〜も（多い）」：As many as 500 people came.「500人も来た」。',
      'no more than ＋ 数「たった〜（＝only）」、no less than ＋ 数「〜も（＝as many / much as）」。no が「差がゼロ」を表し、話し手の気持ち（少ない・多い）を伝える。',
    ],
    examples: [
      { en: 'The shop sold as many as 300 cakes in one day.', ja: 'その店は1日に300個ものケーキを売った。' },
      { en: 'I had no more than 100 yen in my wallet.', ja: 'さいふにはたった100円しかなかった。' },
    ],
    questions: [
      { sentence: 'As ___ as 2,000 people joined the marathon.', choices: ['many', 'much', 'more', 'most'], answer: 0, why: '人の数（数えられる）なので as many as。' },
      { sentence: 'The test took no ___ than ten minutes. It was very short.', choices: ['more', 'less', 'many', 'least'], answer: 0, why: '「たった10分」（少ないと感じる）は no more than。' },
      { sentence: 'He read no ___ than fifty books this summer. Amazing!', choices: ['less', 'many', 'much', 'little'], answer: 0, why: '「50冊も」（多いと感じる）は no less than。' },
    ],
  },
  {
    id: 'fractions',
    title: '分数の表現（one third / two thirds / half of）',
    points: [
      '分数は「分子（ふつうの数）＋ 分母（序数）」：1/3 ＝ one third、2/3 ＝ two thirds（分子が2以上なら分母に s）。1/2 ＝ half、1/4 ＝ a quarter。',
      '「〜の…分の1」は 分数 ＋ of ＋ 名詞。動詞は of のあとの名詞に合わせる：Two thirds of the students are girls. / Half of the cake is gone.',
    ],
    examples: [
      { en: 'About one third of the class walks to school.', ja: 'クラスの約3分の1が歩いて通学している。' },
      { en: 'Three quarters of the money was used for books.', ja: 'そのお金の4分の3が本に使われた。' },
    ],
    questions: [
      { sentence: '2/3 ＝ two ___', choices: ['thirds', 'third', 'threes'], answer: 0, why: '分子が2以上なので分母の序数に s をつける。' },
      { sentence: 'Half of the apples ___ red.', choices: ['are', 'is', 'be'], answer: 0, why: 'of のあとの apples（複数）に合わせて are。' },
      { sentence: 'A ___ of an hour is fifteen minutes.', choices: ['quarter', 'fourth of', 'half'], answer: 0, why: '1時間の4分の1 ＝ a quarter of an hour（15分）。' },
    ],
  },
  {
    id: 'tag-imperative',
    title: "命令文・Let's の付加疑問（〜, will you? / 〜, shall we?）",
    points: [
      '命令文の最後に , will you? をつけると「〜してくれる？」とやわらかいたのみ方になる：Open the window, will you?',
      "Let's 〜 の最後は , shall we?「〜しようよ、ね？」：Let's take a break, shall we?",
    ],
    examples: [
      { en: 'Pass me the salt, will you?', ja: '塩を取ってくれる？' },
      { en: "Let's walk to the park, shall we?", ja: '公園まで歩こうよ、ね？' },
    ],
    questions: [
      { sentence: 'Close the door, ___ you?', choices: ['will', 'do', 'are'], answer: 0, why: '命令文の付加疑問は , will you?' },
      { sentence: "Let's start the game, ___ we?", choices: ['shall', 'will', 'do'], answer: 0, why: "Let's 〜 の付加疑問は , shall we?" },
      { sentence: 'Be quiet, ___?', choices: ['will you', 'are you', "don't you"], answer: 0, why: 'be で始まる命令文でも , will you?' },
    ],
  },
  {
    id: 'each-other',
    title: 'each other（おたがい）と -self（自分自身）のちがい',
    points: [
      'each other「おたがい（に）」は2人以上の人が相手に同じことをするとき：Ken and Yui helped each other.「ケンとユイは助け合った」。',
      '-self / -selves は「自分自身」：They looked at themselves in the mirror.「（それぞれが）自分を見た」。each other は「相手を」、-selves は「自分を」。',
    ],
    examples: [
      { en: 'We often send each other messages.', ja: '私たちはよくおたがいにメッセージを送り合う。' },
      { en: 'The children introduced themselves.', ja: '子どもたちは自己紹介をした。' },
    ],
    questions: [
      { sentence: 'Tom and Mike are good friends. They know ___ well.', choices: ['each other', 'themselves', 'them'], answer: 0, why: '「おたがいをよく知っている」なので each other。' },
      { sentence: 'Please help ___ to some cake, everyone.', choices: ['yourselves', 'each other', 'you'], answer: 0, why: 'help yourself (yourselves) to 〜「自由に取って食べる」。自分で取るので -selves。' },
      { sentence: 'The two teams shook hands with ___ after the game.', choices: ['each other', 'themselves', 'itself'], answer: 0, why: '相手チームと握手するので each other。' },
    ],
  },
  {
    id: 'even-only',
    title: 'even / only / just の位置と意味（〜さえ・〜だけ・ちょうど）',
    points: [
      'even「〜さえ・〜でも」、only「〜だけ」は、ふつう一般動詞の前・be動詞や助動詞のあとに置く。強めたい語のすぐ前に置くこともある：Even a child can do it.「子どもでさえできる」。',
      'just は「ちょうど・ほんの・たった今」：It\'s just five o\'clock.「ちょうど5時だ」/ I just wanted to say thanks.「お礼を言いたかっただけ」。',
    ],
    examples: [
      { en: 'She can even speak Chinese.', ja: '彼女は中国語さえ話せる。' },
      { en: 'I only have ten minutes.', ja: '10分しかない。' },
    ],
    questions: [
      { sentence: '___ my little brother knows that word.', choices: ['Even', 'Ever', 'Only if', 'Ever since'], answer: 0, why: '「弟でさえ知っている」なので even を強めたい語（my little brother）の前に。' },
      { sentence: 'I ___ ate one cookie. I was not hungry.', choices: ['only', 'even', 'ever', 'yet'], answer: 0, why: '「1枚だけ食べた」なので only。一般動詞の前に置く。' },
      { sentence: 'The train left ___ now.', choices: ['just', 'only', 'even', 'still'], answer: 0, why: 'just now「たった今」。' },
    ],
  },
  {
    id: 'get-done',
    title: 'get ＋ 過去分詞（get married / get hurt / get lost）',
    points: [
      'get ＋ 過去分詞 で「〜される・〜の状態になる」という変化を表す：get hurt「けがをする」、get lost「道に迷う」、get married「結婚する」、get tired「つかれる」。',
      'be ＋ 過去分詞が「状態」なのに対して、get ＋ 過去分詞は「変化（そうなる）」：She is married.（結婚している）/ She got married last year.（去年結婚した）',
    ],
    examples: [
      { en: 'I got lost in the big station.', ja: '大きな駅で道に迷った。' },
      { en: 'Be careful not to get hurt.', ja: 'けがをしないように気をつけて。' },
    ],
    questions: [
      { sentence: 'My aunt ___ married last spring.', choices: ['got', 'was getting to', 'get'], answer: 0, why: '去年の春に「結婚した」（変化）なので got married。' },
      { sentence: "Don't go into the forest alone. You may get ___.", choices: ['lost', 'lose', 'losing'], answer: 0, why: 'get lost「道に迷う」。get ＋ 過去分詞。' },
      { sentence: 'He fell off his bike and got ___.', choices: ['hurt', 'hurting', 'to hurt'], answer: 0, why: 'get hurt「けがをする」。hurt の過去分詞は hurt。' },
    ],
  },
  {
    id: 'verb-prep',
    title: '前置詞とセットの動詞（listen to / wait for / think about）',
    points: [
      'listen to 〜「〜を聞く」、wait for 〜「〜を待つ」、think about 〜「〜について考える」、arrive at（in）〜「〜に着く」のように、決まった前置詞といっしょに使う動詞がある。',
      '前置詞を忘れやすいので注意：× listen music → ○ listen to music。疑問文では前置詞が最後に残る：What are you looking for?',
    ],
    examples: [
      { en: 'I listen to music on the train.', ja: '電車で音楽を聞く。' },
      { en: 'Who are you waiting for?', ja: 'だれを待っているの？' },
    ],
    questions: [
      { sentence: 'Please listen ___ me carefully.', choices: ['to', 'at', 'for'], answer: 0, why: 'listen to 〜「〜を聞く」。' },
      { sentence: "Let's wait ___ the next bus.", choices: ['for', 'to', 'on'], answer: 0, why: 'wait for 〜「〜を待つ」。' },
      { sentence: 'We arrived ___ the station at noon.', choices: ['at', 'to', 'for'], answer: 0, why: '駅のような地点に着くときは arrive at。arrive to とは言わない。' },
    ],
  },
  {
    id: 'of-the-two',
    title: 'the ＋ 比較級 ＋ of the two（2つのうちで〜なほう）',
    points: [
      '2つ（2人）のうちで「〜なほう」と言うときは、比較級でも the をつける：Ken is the taller of the two.「ケンは2人のうち背が高いほうだ」。',
      '3つ以上なら最上級：the tallest of the three。2つなら比較級 ＋ the、とおぼえる。',
    ],
    examples: [
      { en: 'This is the cheaper of the two bags.', ja: 'これは2つのかばんのうち安いほうだ。' },
      { en: 'Yui is the younger of the two sisters.', ja: 'ユイは姉妹2人のうち年下のほうだ。' },
    ],
    questions: [
      { sentence: 'Tom is ___ of the two boys.', choices: ['the taller', 'taller', 'the tallest', 'tall'], answer: 0, why: '2人のうちの「高いほう」なので the ＋ 比較級。' },
      { sentence: 'Which is the ___ of the two answers?', choices: ['better', 'well', 'good', 'most'], answer: 0, why: '2つのうちなので比較級 better（the better）。' },
      { sentence: 'Mt. Fuji is the highest ___ the three mountains.', choices: ['of', 'in', 'than', 'with'], answer: 0, why: '3つ以上の中では最上級 ＋ of。' },
    ],
  },
  {
    id: 'more-and-more',
    title: '比較級 and 比較級（だんだん〜・ますます〜）',
    points: [
      '比較級 and 比較級 で「だんだん〜・ますます〜」：It is getting colder and colder.「だんだん寒くなっている」。',
      'more を使う形容詞は more and more ＋ 形容詞：more and more popular。get / become / grow といっしょによく使う。',
    ],
    examples: [
      { en: 'Your English is getting better and better.', ja: 'あなたの英語はどんどん上手になっている。' },
      { en: 'The game became more and more exciting.', ja: '試合はますますおもしろくなった。' },
    ],
    questions: [
      { sentence: 'The days are getting ___ and longer.', choices: ['longer', 'long', 'longest'], answer: 0, why: '比較級 and 比較級：longer and longer。' },
      { sentence: 'This song is becoming more and more ___.', choices: ['popular', 'popularer', 'most popular'], answer: 0, why: 'more and more ＋ 形容詞の原級。' },
      { sentence: 'It got ___ and darker outside.', choices: ['darker', 'more dark', 'dark'], answer: 0, why: 'dark の比較級は darker。darker and darker。' },
    ],
  },
  {
    id: 'be-about-to',
    title: 'be about to / be likely to / be sure to',
    points: [
      'be about to ＋ 動詞の原形「まさに〜しようとしている」：The movie is about to start.「映画がまさに始まるところだ」。',
      'be likely to 〜「〜しそうだ」、be sure to 〜「きっと〜する」。どれも to のあとは動詞の原形。',
    ],
    examples: [
      { en: 'I was about to leave when you called.', ja: 'あなたが電話してきたとき、ちょうど出かけるところだった。' },
      { en: 'It is likely to snow tonight.', ja: '今夜は雪がふりそうだ。' },
    ],
    questions: [
      { sentence: 'Hurry up! The train is about ___ leave.', choices: ['to', 'for', 'of'], answer: 0, why: 'be about to ＋ 原形「まさに〜しようとしている」。' },
      { sentence: 'Our team is ___ to win. They are very strong.', choices: ['likely', 'like', 'liking'], answer: 0, why: 'be likely to 〜「〜しそうだ」。' },
      { sentence: 'You are sure to ___ the test if you study.', choices: ['pass', 'passing', 'passed'], answer: 0, why: 'be sure to のあとは動詞の原形。' },
    ],
  },
  {
    id: 'gerund-set',
    title: '動名詞の慣用表現（feel like -ing / It is no use -ing / There is no -ing）',
    points: [
      'feel like -ing「〜したい気がする」：I feel like eating ice cream.／It is no use -ing「〜してもむだだ」：It is no use crying.',
      'There is no -ing「〜することはできない」：There is no knowing what will happen.「何が起こるかわからない」。どれも -ing の形を使う。',
    ],
    examples: [
      { en: "I don't feel like going out today.", ja: '今日は出かける気分じゃない。' },
      { en: "It's no use worrying about the past.", ja: '過ぎたことを心配してもむだだ。' },
    ],
    questions: [
      { sentence: 'I feel like ___ a movie tonight.', choices: ['watching', 'to watch', 'watch', 'watched'], answer: 0, why: 'feel like のあとは -ing。' },
      { sentence: "It's no use ___ to him. He never listens.", choices: ['talking', 'talk', 'to talking', 'talked'], answer: 0, why: 'It is no use -ing「〜してもむだだ」。' },
      { sentence: 'There is no ___ what she will say.', choices: ['knowing', 'know', 'to know', 'knew'], answer: 0, why: 'There is no -ing「〜することはできない」。' },
    ],
  },
  {
    id: 'what-is-called',
    title: 'what is called / what we call（いわゆる）',
    points: [
      'what is called 〜 / what we（you, they）call 〜 で「いわゆる〜」。関係代名詞 what を使った決まった言い方。',
      '過去の文なら what was called 〜 になる：He became what is called a "YouTuber."「彼はいわゆる「ユーチューバー」になった」。',
    ],
    examples: [
      { en: 'She is what is called a walking dictionary.', ja: '彼女はいわゆる生き字引だ。' },
      { en: 'This is what we call a win-win situation.', ja: 'これがいわゆる「両者が得をする」状況だ。' },
    ],
    questions: [
      { sentence: 'He is ___ is called a genius.', choices: ['what', 'which', 'that', 'who'], answer: 0, why: 'what is called 〜「いわゆる〜」。' },
      { sentence: 'This is what we ___ "fast food."', choices: ['call', 'called', 'calling', 'calls'], answer: 0, why: 'what we call 〜「いわゆる〜」。we のあとは動詞の原形（現在形）。' },
      { sentence: 'Tokyo is what ___ called a "megacity."', choices: ['is', 'are', 'calls', 'being'], answer: 0, why: 'what is called の形。what は単数あつかい。' },
    ],
  },
  {
    id: 'hardly-seldom',
    title: '準否定の副詞 hardly / scarcely / seldom / rarely',
    points: [
      'hardly / scarcely「ほとんど〜ない」（程度）、seldom / rarely「めったに〜ない」（回数）。それだけで否定の意味なので not はつけない。',
      '一般動詞の前、be動詞・助動詞のあとに置く：I can hardly hear you.「ほとんど聞こえない」/ He seldom eats breakfast.「めったに朝食を食べない」。',
    ],
    examples: [
      { en: 'I could hardly believe my eyes.', ja: '自分の目がほとんど信じられなかった。' },
      { en: 'It rarely snows in this town.', ja: 'この町ではめったに雪がふらない。' },
    ],
    questions: [
      { sentence: 'It was so dark that I could ___ see anything.', choices: ['hardly', 'hard', 'not hardly', 'hardest'], answer: 0, why: '「ほとんど見えなかった」は hardly。hard は「一生けんめい・かたい」。' },
      { sentence: 'My father ___ watches TV. He is always busy.', choices: ['seldom', 'often', 'always', 'not seldom'], answer: 0, why: 'いつもいそがしいので「めったに見ない」seldom。' },
      { sentence: 'She ___ comes late. She is usually on time.', choices: ['rarely', 'never not', 'hardly not', 'not rarely'], answer: 0, why: 'rarely だけで否定の意味。not は重ねない。' },
    ],
  },
  {
    id: 'what-noun',
    title: 'What ＋ 名詞（What kind of 〜 / What day / What sport）',
    points: [
      'What のすぐあとに名詞を置くと「何の〜・どんな〜」とたずねられる：What sport do you like?「何のスポーツが好き？」/ What day is it today?「今日は何曜日？」。',
      'What kind of 〜?「どんな種類の〜？」：What kind of music do you listen to? 答えるときは具体的に：I listen to pop music.',
    ],
    examples: [
      { en: 'What color is your bike? — It is blue.', ja: 'あなたの自転車は何色？—青だよ。' },
      { en: 'What kind of food do you like?', ja: 'どんな種類の食べ物が好き？' },
    ],
    questions: [
      { sentence: '___ sport do you play? — I play tennis.', choices: ['What', 'Who', 'Where'], answer: 0, why: 'What ＋ 名詞「何の〜」。' },
      { sentence: 'What ___ of books do you read?', choices: ['kind', 'kinds to', 'kindly'], answer: 0, why: 'What kind of 〜?「どんな種類の〜？」。' },
      { sentence: 'What ___ is it today? — It is Friday.', choices: ['day', 'date', 'time'], answer: 0, why: '曜日をたずねるのは What day。日付なら What date。' },
    ],
  },
  {
    id: 'suggest-that',
    title: '提案・要求の that 節（suggest / insist that ＋ (should) 原形）',
    points: [
      'suggest・propose・insist・demand・recommend など「〜するように提案・要求する」動詞のあとの that 節では、動詞を原形にするか should ＋ 原形にする：I suggested that he (should) see a doctor.',
      '主語が3人称単数でも、過去の文でも原形のまま（sees・saw にしない）。It is important / necessary that 〜 の that 節も同じ形になる：It is important that she be on time.',
    ],
    examples: [
      { en: 'The coach insisted that every player (should) warm up first.', ja: 'コーチは、選手全員がまずウォーミングアップをするべきだと強く主張した。' },
      { en: 'It is necessary that the report be finished by Friday.', ja: 'その報告書は金曜日までに仕上げられる必要がある。' },
    ],
    questions: [
      { sentence: 'My teacher suggested that I ___ more books.', choices: ['read', 'reads', 'reading', 'will read'], answer: 0, why: 'suggest that 〜 の節は (should) ＋ 原形。' },
      { sentence: 'She demanded that he ___ the money back at once.', choices: ['pay', 'pays', 'paid to', 'will pay'], answer: 0, why: '過去の文でも、要求の that 節は原形 pay（should pay も可）。' },
      { sentence: 'It is important that everyone ___ the rules.', choices: ['follow', 'to follow', 'following', 'followed to'], answer: 0, why: 'It is important that 〜 の節も (should) ＋ 原形。everyone でも follow のまま。' },
    ],
  },
  {
    id: 'wh-subject',
    title: '疑問詞が主語の疑問文（Who made this? / What happened?）',
    points: [
      'Who・What が「だれが・何が」と主語になるときは、do / does / did を使わず、ふつうの文と同じ語順で〈疑問詞 ＋ 動詞〉にする：Who made this cake?「だれがこのケーキを作ったの？」',
      '疑問詞の主語は3人称単数あつかい：Who knows the answer?（know にしない）。答え方は〈主語 ＋ do / does / did〉：— Ken did.「ケンだよ」/ — Mika does.',
    ],
    examples: [
      { en: 'Who broke the window? — Tom did.', ja: 'だれが窓を割ったの？—トムだよ。' },
      { en: 'What happened to your bike?', ja: 'あなたの自転車に何があったの？' },
    ],
    questions: [
      { sentence: 'Who ___ this picture? — My sister did.', choices: ['painted', 'did she paint', 'did you paint'], answer: 0, why: 'Who が主語なので did を使わず Who painted 〜? の語順。' },
      { sentence: 'Who ___ Chinese in your class?', choices: ['speaks', 'speak', 'is speak'], answer: 0, why: '疑問詞の主語は3人称単数あつかいなので speaks。' },
      { sentence: 'Who cleaned the room? — Ken ___.', choices: ['did', 'was', 'cleaned it did'], answer: 0, why: '過去の文の答えは〈主語 ＋ did〉。' },
    ],
  },
  {
    id: 'worth-ing',
    title: 'be worth ～ing（～する価値がある）',
    points: [
      '〈A is worth ＋ 動名詞〉で「A は～する価値がある」。A は動名詞の意味上の目的語なので、うしろに it などを置かない：This book is worth reading.（× worth reading it / × worth to read）',
      '形式主語を使って It is worth ～ing A. とも言える：It is worth visiting the museum.「その博物館はおとずれる価値がある」。worth のあとに名詞を置くと「～の値打ちがある」：The ring is worth 10,000 yen.',
    ],
    examples: [
      { en: 'This movie is worth watching twice.', ja: 'この映画は2回見る価値がある。' },
      { en: 'It is worth trying, even if you fail.', ja: 'たとえ失敗しても、やってみる価値はある。' },
    ],
    questions: [
      { sentence: 'The castle is worth ___.', choices: ['visiting', 'to visit', 'visit', 'visited'], answer: 0, why: 'be worth のあとは動名詞。' },
      { sentence: 'This story is worth ___.', choices: ['reading', 'reading it', 'being read it', 'read'], answer: 0, why: '主語 This story が reading の目的語なので it は置かない。' },
      { sentence: 'It is ___ asking the teacher for advice.', choices: ['worth', 'worthy to', 'worth of', 'worthy'], answer: 0, why: 'It is worth ～ing「～する価値がある」。' },
    ],
  },
  {
    id: 'must-cant-be',
    title: "推量の must be / can't be（～にちがいない・～のはずがない）",
    points: [
      'must には「～しなければならない」のほかに「～にちがいない」という強い推量の意味がある：You must be tired.「つかれているにちがいない」。',
      "その反対「～のはずがない」は must not ではなく can't (cannot) を使う：That can't be true.「それが本当のはずがない」。今のことは〈must / can't ＋ 原形〉、過去のことは must have ＋ 過去分詞 で表す。",
    ],
    examples: [
      { en: 'Someone is at the door. It must be Mom.', ja: 'だれかが玄関にいる。お母さんにちがいない。' },
      { en: "He just ate lunch. He can't be hungry.", ja: '彼はお昼を食べたばかりだ。おなかがすいているはずがない。' },
    ],
    questions: [
      { sentence: 'You walked for five hours. You ___ be very tired.', choices: ['must', "can't", "don't have to"], answer: 0, why: '5時間歩いた → 「つかれているにちがいない」なので must。' },
      { sentence: "Ken is in London now. The boy over there ___ be Ken.", choices: ["can't", 'must', 'should'], answer: 0, why: 'ケンはロンドンにいる → 「あそこの男の子がケンのはずがない」なので can\'t。' },
      { sentence: "That ___ be Yuki's bag. It has her name on it.", choices: ['must', "can't", 'may not'], answer: 0, why: '名前が書いてある → 「ユキのかばんにちがいない」。' },
    ],
  },
  {
    id: 'prevent-from',
    title: 'prevent / keep A from ～ing（無生物主語）',
    points: [
      '〈prevent / stop / keep ＋ A ＋ from ～ing〉で「A が～するのをさまたげる・やめさせる」。from のあとは動名詞：The noise kept me from sleeping.',
      '主語がもの・出来事のとき（無生物主語）は、「〜のせいで A は…できない」と訳すと自然：Heavy snow prevented the train from running.「大雪のせいで電車が走れなかった」。',
    ],
    examples: [
      { en: 'The rain stopped us from playing soccer.', ja: '雨のせいで、私たちはサッカーができなかった。' },
      { en: 'A short nap can keep you from feeling tired.', ja: '短い昼寝をすると、つかれを感じにくくなる。' },
    ],
    questions: [
      { sentence: 'The fever prevented her ___ going to school.', choices: ['from', 'to', 'of', 'with'], answer: 0, why: 'prevent A from ～ing「A が～するのをさまたげる」。' },
      { sentence: 'The loud music kept me from ___.', choices: ['studying', 'study', 'to study', 'studied'], answer: 0, why: 'from は前置詞なので、あとは動名詞。' },
      { sentence: 'The storm ___ the plane from taking off.', choices: ['prevented', 'let', 'made', 'had'], answer: 0, why: 'A from ～ing の形をとれるのは prevent。let / make は〈A ＋ 原形〉。' },
    ],
  },
  {
    id: 'plural-forms',
    title: '複数形の作り方（-s / -es / -ies / 不規則）',
    points: [
      'ふつうは -s をつける（cats）。s・x・ch・sh で終わる語は -es（boxes・watches・dishes）。〈子音字 ＋ y〉で終わる語は y を i にかえて -es（city → cities）。ただし〈母音字 ＋ y〉は -s だけ（boy → boys）。',
      '形が大きくかわる名詞もある：child → children、man → men、woman → women、foot → feet、tooth → teeth、mouse → mice。fish・sheep は単数と複数が同じ形。',
    ],
    examples: [
      { en: 'There are three boxes and two watches on the desk.', ja: '机の上に箱が3つと腕時計が2つある。' },
      { en: 'The children are brushing their teeth.', ja: '子どもたちは歯をみがいている。' },
    ],
    questions: [
      { sentence: 'I visited two ___ in Kyushu.', choices: ['cities', 'citys', 'cityes'], answer: 0, why: '〈子音字 ＋ y〉は y を i にかえて -es。' },
      { sentence: 'Three ___ are playing in the park.', choices: ['children', 'childs', 'childrens'], answer: 0, why: 'child の複数形は children（不規則）。' },
      { sentence: 'Please wash these ___.', choices: ['dishes', 'dishs', 'dish'], answer: 0, why: 'sh で終わる語は -es。these があるので複数形。' },
    ],
  },
  {
    id: 'despite',
    title: 'despite / in spite of ＋ 名詞 と although ＋ 文',
    points: [
      'despite と in spite of は前置詞なので、あとに名詞か動名詞を置く：Despite the rain, we went out. / In spite of being tired, she kept working.（despite of とは言わない）',
      'although・though は接続詞なので、あとに〈主語 ＋ 動詞〉の文を置く：Although it was raining, we went out. 意味はどれも「～にもかかわらず」。',
    ],
    examples: [
      { en: 'Despite his injury, he finished the race.', ja: 'けがをしていたにもかかわらず、彼はレースを走りきった。' },
      { en: 'Although the test was hard, many students passed it.', ja: 'テストはむずかしかったが、多くの生徒が合格した。' },
    ],
    questions: [
      { sentence: '___ the heavy snow, the bus came on time.', choices: ['Despite', 'Although', 'Despite of', 'Though'], answer: 0, why: 'あとが名詞 the heavy snow なので前置詞 Despite。despite of とは言わない。' },
      { sentence: '___ she was sick, she went to school.', choices: ['Although', 'Despite', 'In spite of', 'Because of'], answer: 0, why: 'あとが文（she was sick）なので接続詞 Although。' },
      { sentence: 'In spite ___ the noise, the baby slept well.', choices: ['of', 'for', 'with', 'by'], answer: 0, why: 'in spite of ＋ 名詞「～にもかかわらず」。' },
    ],
  },
  {
    id: 'group-prep',
    title: '群前置詞（instead of / according to / thanks to）',
    points: [
      '2語以上で1つの前置詞のようにはたらくものを群前置詞という。あとには名詞か動名詞を置く：instead of ～「～の代わりに」、according to ～「～によれば」、thanks to ～「～のおかげで」。',
      'instead of のあとの動詞は ～ing：Instead of taking the bus, I walked.「バスに乗る代わりに歩いた」。thanks to はよい結果に、because of は良い・悪いどちらの理由にも使う。',
    ],
    examples: [
      { en: 'According to the weather report, it will snow tonight.', ja: '天気予報によれば、今夜は雪がふるそうだ。' },
      { en: 'Thanks to your help, I finished my homework early.', ja: 'あなたが手伝ってくれたおかげで、宿題が早く終わった。' },
    ],
    questions: [
      { sentence: 'Let\'s drink tea instead ___ coffee.', choices: ['of', 'to', 'for', 'with'], answer: 0, why: 'instead of ～「～の代わりに」。' },
      { sentence: 'Instead of ___ TV, he read a book.', choices: ['watching', 'watch', 'to watch', 'watched'], answer: 0, why: 'instead of は前置詞のはたらきなので、あとは動名詞。' },
      { sentence: '___ the news, the museum will open next month.', choices: ['According to', 'Thanks for', 'Instead to', 'According with'], answer: 0, why: 'According to ～「～によれば」。情報のでどころを表す。' },
    ],
  },
  {
    id: 'change-adj',
    title: '変化を表す become / get / turn / go ＋ 形容詞',
    points: [
      '〈become / get ＋ 形容詞〉で「～になる」。get は会話でよく使う：It is getting dark.「暗くなってきた」。become のあとには名詞も置ける（become a doctor）が、get のあとはふつう形容詞。',
      '決まった組み合わせも覚えよう：turn red「赤くなる」（色の変化）、go bad「（食べ物が）くさる」、fall asleep「ねむりこむ」、come true「（夢が）かなう」、grow old「年をとる」。',
    ],
    examples: [
      { en: 'The leaves turn yellow in autumn.', ja: '秋には葉が黄色くなる。' },
      { en: 'I hope your dream will come true.', ja: 'あなたの夢がかなうといいね。' },
    ],
    questions: [
      { sentence: 'It is getting ___. Let\'s go home.', choices: ['dark', 'darkly', 'darkness'], answer: 0, why: 'get ＋ 形容詞「～になる」。副詞 darkly や名詞 darkness は置けない。' },
      { sentence: 'The milk has gone ___. Don\'t drink it.', choices: ['bad', 'badly', 'worse to'], answer: 0, why: 'go bad「（食べ物が）くさる」。' },
      { sentence: 'He ___ asleep during the movie.', choices: ['fell', 'came', 'turned'], answer: 0, why: 'fall asleep「ねむりこむ」。過去形は fell。' },
    ],
  },
  {
    id: 'as-well-as',
    title: 'A as well as B（B だけでなく A も）と動詞の一致',
    points: [
      'A as well as B で「B だけでなく A も」。強調されるのは前の A：She speaks French as well as English.「英語だけでなくフランス語も話す」。not only B but also A とほぼ同じ意味だが、A と B の順番が逆になる。',
      '主語になるとき、動詞は前の A に合わせる：The teacher, as well as the students, is excited.（主語の中心は The teacher）。not only B but also A では、動詞は近い A に合わせる。',
    ],
    examples: [
      { en: 'This app is useful for adults as well as children.', ja: 'このアプリは子どもだけでなく大人にも役に立つ。' },
      { en: 'My brother, as well as my parents, likes jazz.', ja: '両親だけでなく兄もジャズが好きだ。' },
    ],
    questions: [
      { sentence: 'Tom, as well as his friends, ___ going to the concert.', choices: ['is', 'are', 'were', 'have'], answer: 0, why: 'A as well as B の主語は A（Tom）に動詞を合わせるので is。' },
      { sentence: 'He plays the guitar as well ___ the piano.', choices: ['as', 'so', 'than', 'such'], answer: 0, why: 'A as well as B「B だけでなく A も」。' },
      { sentence: 'Not only my sisters but also my mother ___ cats.', choices: ['loves', 'love', 'loving', 'is loving'], answer: 0, why: 'not only B but also A では、動詞は近い A（my mother）に合わせる。' },
    ],
  },
  {
    id: 'place-prep',
    title: '場所を表す前置詞（under / next to / in front of / behind）',
    points: [
      'under「～の下に」、next to「～のとなりに」、in front of「～の前に」、behind「～のうしろに」、near「～の近くに」。〈前置詞 ＋ 名詞〉で場所を表す：The cat is under the table.',
      'next to と in front of は2語・3語で1つの前置詞のようにはたらく。in front of は「目の前」、behind はその反対の「うしろ」。',
    ],
    examples: [
      { en: 'The bank is next to the post office.', ja: '銀行は郵便局のとなりにある。' },
      { en: 'There is a big tree behind my house.', ja: '私の家のうしろに大きな木がある。' },
    ],
    questions: [
      { sentence: 'My bag is ___ the desk. It is on the floor.', choices: ['under', 'on', 'over'], answer: 0, why: '床にある → 机の「下に」なので under。' },
      { sentence: 'Please wait in front ___ the station.', choices: ['of', 'to', 'at'], answer: 0, why: 'in front of ～「～の前で」。' },
      { sentence: 'Ken sits ___ to me in class.', choices: ['next', 'near', 'behind'], answer: 0, why: 'next to ～「～のとなりに」。near・behind は to をつけない。' },
    ],
  },
  {
    id: 'modal-passive',
    title: '助動詞の受け身（can be seen / must be done / will be held）',
    points: [
      '助動詞のあとは動詞の原形なので、受け身は〈助動詞 ＋ be ＋ 過去分詞〉になる：Stars can be seen from here.「ここから星が見られる」。',
      'will be held「行われる予定だ」、must be done「されなければならない」、should be kept「保たれるべきだ」のように使う。否定は助動詞のあとに not：It cannot be fixed.',
    ],
    examples: [
      { en: 'The concert will be held next Sunday.', ja: 'コンサートは次の日曜日に開かれる。' },
      { en: 'This homework must be finished by Friday.', ja: 'この宿題は金曜日までに終わらせなければならない。' },
    ],
    questions: [
      { sentence: 'Mt. Fuji can ___ from my room.', choices: ['be seen', 'seen', 'is seen'], answer: 0, why: '助動詞の受け身は〈can ＋ be ＋ 過去分詞〉。' },
      { sentence: 'The meeting will ___ in Room 3.', choices: ['be held', 'held', 'hold to'], answer: 0, why: '「行われる」は受け身。will のあとは原形 be ＋ held。' },
      { sentence: 'These rules must ___ by everyone.', choices: ['be followed', 'follow', 'are followed'], answer: 0, why: 'ルールは「守られる」側なので must be followed。' },
    ],
  },
  {
    id: 'as-possible',
    title: 'as ～ as possible / as ～ as ＋ 主語 ＋ can（できるだけ～）',
    points: [
      '〈as ＋ 形容詞・副詞 ＋ as possible〉で「できるだけ～」：Please come as soon as possible.「できるだけ早く来てください」。',
      '〈as ～ as ＋ 主語 ＋ can〉でも同じ意味。過去の文では could にする：I ran as fast as I could.「私はできるだけ速く走った」。as と as のあいだは原級（-er にしない）。',
    ],
    examples: [
      { en: 'Try to speak as clearly as possible.', ja: 'できるだけはっきり話すようにしなさい。' },
      { en: 'She studied as hard as she could before the test.', ja: '彼女はテストの前にできるだけ一生けんめい勉強した。' },
    ],
    questions: [
      { sentence: 'Please answer as ___ as possible.', choices: ['quickly', 'more quickly', 'quickest'], answer: 0, why: 'as と as のあいだは原級。answer を修飾するので副詞 quickly。' },
      { sentence: 'I walked as fast as I ___ to catch the bus.', choices: ['could', 'can', 'possible'], answer: 0, why: '過去の文（walked）なので could。' },
      { sentence: 'Drink as much water ___ possible on hot days.', choices: ['as', 'than', 'so'], answer: 0, why: 'as much ～ as possible「できるだけたくさんの～」。' },
    ],
  },
  {
    id: 'happen-to',
    title: 'happen to ～（たまたま～する）/ turn out to be ～（～だとわかる）',
    points: [
      '〈happen to ＋ 動詞の原形〉で「たまたま～する・偶然～する」：I happened to meet my teacher at the station.「駅でたまたま先生に会った」。',
      '〈turn out to be ～〉で「（結果として）～だとわかる」：The rumor turned out to be false.「そのうわさはうそだとわかった」。It turned out that ～ の形でも言える。',
    ],
    examples: [
      { en: 'Do you happen to know her phone number?', ja: 'ひょっとして彼女の電話番号を知っていますか。' },
      { en: 'The test turned out to be easier than I expected.', ja: 'テストは予想より簡単だとわかった。' },
    ],
    questions: [
      { sentence: 'I happened ___ an old friend in the park.', choices: ['to see', 'seeing', 'see', 'saw'], answer: 0, why: 'happen to ＋ 原形「たまたま～する」。' },
      { sentence: 'The man turned out ___ a famous singer.', choices: ['to be', 'being', 'be', 'been'], answer: 0, why: 'turn out to be ～「～だとわかる」。' },
      { sentence: 'It ___ out that he was right.', choices: ['turned', 'happened', 'took', 'fell'], answer: 0, why: 'It turned out that ～「～だとわかった」。' },
    ],
  },
  {
    id: 'if-only',
    title: 'If only ～!（～でさえあればなあ）',
    points: [
      'If only ～! は I wish ～ よりも気持ちの強い願望「～でさえあればなあ」。今の事実と反対の願いは過去形（be動詞は were がふつう）：If only I had more time!「もっと時間があればなあ」。',
      '過去の事実と反対の願い（～だったらよかったのに）は過去完了〈had ＋ 過去分詞〉：If only I had studied harder!「もっと勉強していればよかったのに」。',
    ],
    examples: [
      { en: 'If only it were Saturday today!', ja: '今日が土曜日だったらなあ。' },
      { en: 'If only I had listened to my mother!', ja: '母の言うことを聞いていればよかったのに。' },
    ],
    questions: [
      { sentence: 'If only I ___ how to swim!', choices: ['knew', 'know', 'have known', 'known'], answer: 0, why: '今の事実と反対の願いなので過去形 knew。' },
      { sentence: 'If only we ___ the earlier train yesterday!', choices: ['had taken', 'took', 'take', 'takes'], answer: 0, why: 'yesterday（過去）の事実と反対の願いなので過去完了 had taken。' },
      { sentence: '___ only he were here with us!', choices: ['If', 'Even', 'As', 'So'], answer: 0, why: 'If only ～!「～でさえあればなあ」。' },
    ],
  },
  {
    id: 'to-for-person',
    title: 'give 物 to 人 / buy 物 for 人（to と for の書きかえ）',
    points: [
      '〈動詞 ＋ 人 ＋ 物〉は〈動詞 ＋ 物 ＋ to / for ＋ 人〉に書きかえられる。give・show・send・tell・teach・lend など「相手に届ける」動詞は to：He gave a present to me.',
      'buy・make・cook・get・find など「相手のために～する」動詞は for：My father made lunch for us. 物が it・them のような代名詞のときは、ふつう〈動詞 ＋ it ＋ to / for ＋ 人〉の形を使う：Give it to me.',
    ],
    examples: [
      { en: 'Could you show your passport to me?', ja: 'パスポートを見せていただけますか。' },
      { en: 'I bought a scarf for my grandmother.', ja: '祖母にマフラーを買った。' },
    ],
    questions: [
      { sentence: 'She sent a letter ___ her friend in Canada.', choices: ['to', 'with', 'at'], answer: 0, why: 'send は相手に届ける動詞なので to。' },
      { sentence: 'My mother cooked dinner ___ us.', choices: ['for', 'to', 'of'], answer: 0, why: 'cook は「相手のために～する」動詞なので for。' },
      { sentence: 'I have a new pen. I will give ___.', choices: ['it to you', 'you it', 'to you it'], answer: 0, why: '物が代名詞 it のときは give it to you の形にする。' },
    ],
  },
  {
    id: 'infinitive-uses',
    title: '不定詞の3つの用法を見分ける（名詞的・形容詞的・副詞的）',
    points: [
      '名詞的用法「～すること」：動詞の目的語や主語・補語になる（I like to draw. / My dream is to be a pilot.）。形容詞的用法「～するための・～すべき」：すぐ前の名詞を説明する（I have a lot of homework to do.）。',
      '副詞的用法「～するために（目的）」「～して（感情の原因）」：I went to the park to play tennis. / I was happy to hear the news. 見分けるコツは、to ～ がどの語にかかっているかを見ること。',
    ],
    examples: [
      { en: 'I want something cold to drink.', ja: '何か冷たい飲み物（飲むためのもの）がほしい。' },
      { en: 'She got up early to catch the first train.', ja: '彼女は始発に乗るために早起きした。' },
    ],
    questions: [
      { sentence: 'I went to the store ___ some milk.', choices: ['to buy', 'buying', 'bought'], answer: 0, why: '「牛乳を買うために」という目的を表す副詞的用法。' },
      { sentence: 'Do you have anything ___?', choices: ['to eat', 'eating', 'eat'], answer: 0, why: 'anything を説明する形容詞的用法「何か食べるもの」。' },
      { sentence: 'My dream is ___ a doctor.', choices: ['to become', 'become', 'became'], answer: 0, why: '「医者になること」が is の補語になる名詞的用法。' },
    ],
  },
  {
    id: 'second-ever',
    title: 'the second ＋ 最上級 / 最上級 ＋ I have ever ～',
    points: [
      '〈the second / third ＋ 最上級〉で「2番目に・3番目に～な」：Ken is the second fastest runner in our class.「ケンはクラスで2番目に走るのが速い」。',
      '〈the ＋ 最上級 ＋ 名詞 ＋ (that) I have ever ＋ 過去分詞〉で「今までに～した中でいちばん…」：This is the best movie I have ever seen.「今まで見た中でいちばんいい映画だ」。',
    ],
    examples: [
      { en: 'Mt. Kita is the second highest mountain in Japan.', ja: '北岳は日本で2番目に高い山だ。' },
      { en: 'That was the most exciting game I have ever watched.', ja: 'あれは今まで見た中でいちばんわくわくする試合だった。' },
    ],
    questions: [
      { sentence: 'This is the ___ cake I have ever eaten.', choices: ['best', 'better', 'good'], answer: 0, why: '「今まで食べた中でいちばん」なので最上級 best。' },
      { sentence: 'She is the ___ tallest girl in our class.', choices: ['second', 'two', 'twice'], answer: 0, why: '「2番目に背が高い」は the second ＋ 最上級。' },
      { sentence: 'It is the most beautiful place I have ever ___.', choices: ['visited', 'visit', 'visiting'], answer: 0, why: 'I have ever ＋ 過去分詞（現在完了の経験）。' },
    ],
  },
  {
    id: 'was-were',
    title: 'be動詞の過去形（was / were）と疑問文・否定文',
    points: [
      'am・is の過去形は was、are の過去形は were。I / he / she / it などの単数には was、you と複数には were を使う：I was tired yesterday. / They were in the gym.',
      '疑問文は was / were を主語の前に出す：Were you at home last night? — Yes, I was. / No, I wasn\'t. 否定文は was / were のあとに not（wasn\'t / weren\'t）。',
    ],
    examples: [
      { en: 'It was very cold this morning.', ja: '今朝はとても寒かった。' },
      { en: 'Were your friends at the party? — No, they weren\'t.', ja: 'あなたの友だちはパーティーにいたの？—いいえ、いなかったよ。' },
    ],
    questions: [
      { sentence: 'We ___ busy last week.', choices: ['were', 'was', 'are'], answer: 0, why: '主語 We は複数で、last week（過去）なので were。' },
      { sentence: '___ she at school yesterday?', choices: ['Was', 'Were', 'Did'], answer: 0, why: '主語 she は単数で過去なので Was。be動詞の文に Did は使わない。' },
      { sentence: 'The movie ___ interesting. I fell asleep.', choices: ["wasn't", "didn't", "weren't"], answer: 0, why: 'The movie は単数。be動詞の過去の否定は wasn\'t。' },
    ],
  },
  {
    id: 'too-many-much',
    title: 'too many / too much（多すぎる）の使い分け',
    points: [
      '数えられる名詞の複数形には too many：There are too many people here.「ここは人が多すぎる」。数えられない名詞には too much：I drank too much coffee.「コーヒーを飲みすぎた」。',
      'too much は動詞のあとで「～しすぎる」の意味にもなる：You talk too much.「しゃべりすぎだよ」。「少なすぎる」は too few（数えられる）/ too little（数えられない）。',
    ],
    examples: [
      { en: 'I have too much homework today.', ja: '今日は宿題が多すぎる。' },
      { en: 'There are too many cars on this road.', ja: 'この道路は車が多すぎる。' },
    ],
    questions: [
      { sentence: 'Don\'t eat too ___ sweets.', choices: ['many', 'much', 'little'], answer: 0, why: 'sweets は数えられる名詞の複数形なので too many。' },
      { sentence: 'She spends too ___ money on clothes.', choices: ['much', 'many', 'few'], answer: 0, why: 'money は数えられない名詞なので too much。' },
      { sentence: 'There were too ___ chairs, so some people had to stand.', choices: ['few', 'many', 'much'], answer: 0, why: '「立たなければならなかった」→ いすが少なすぎた。数えられる名詞なので too few。' },
    ],
  },
  {
    id: 'why-how-relative',
    title: '関係副詞 why / how（That is why ～ / This is how ～）',
    points: [
      'why は reason（理由）のあとで「～する理由」：Tell me the reason why you were late. 先行詞の the reason を省いた That is why ～「そういうわけで～」もよく使う。',
      'how は「～する方法・やり方」。the way と how はいっしょに使わず、the way か how のどちらか一方にする：This is how I learned English. ＝ This is the way I learned English.（× the way how）',
    ],
    examples: [
      { en: 'I missed the bus. That is why I was late.', ja: 'バスに乗りおくれた。そういうわけでおくれたんだ。' },
      { en: 'This is how my grandmother makes miso soup.', ja: 'こうやって祖母はみそ汁を作るんだよ。' },
    ],
    questions: [
      { sentence: 'It rained all day. That is ___ we stayed home.', choices: ['why', 'because', 'how', 'what'], answer: 0, why: '前の文が理由で、その結果を言うので That is why ～「そういうわけで～」。' },
      { sentence: 'This is ___ I solved the problem.', choices: ['how', 'the way how', 'what', 'how the way'], answer: 0, why: '「こうやって解いた」は This is how ～。the way how とは言わない。' },
      { sentence: 'Do you know the reason ___ she left early?', choices: ['why', 'which', 'what', 'who'], answer: 0, why: 'the reason のあとに文を続けるときは関係副詞 why。' },
    ],
  },
  {
    id: 'need-to',
    title: "need to ～ / don't need to ～（～する必要がある・ない）",
    points: [
      '〈need to ＋ 動詞の原形〉で「～する必要がある」：I need to buy a new notebook. 主語が3人称単数なら needs to、過去なら needed to。',
      "「～する必要はない」は don't need to ～（＝ don't have to ～）：You don't need to bring lunch tomorrow. must not「～してはいけない」とは意味がちがうので注意。",
    ],
    examples: [
      { en: 'She needs to practice the piano every day.', ja: '彼女は毎日ピアノを練習する必要がある。' },
      { en: "We don't need to hurry. The train leaves at ten.", ja: '急ぐ必要はないよ。電車は10時に出るから。' },
    ],
    questions: [
      { sentence: 'He ___ to see a doctor.', choices: ['needs', 'need', 'needing'], answer: 0, why: '主語 He は3人称単数なので needs to。' },
      { sentence: "You ___ need to come early. The meeting starts at noon.", choices: ["don't", "mustn't", "aren't"], answer: 0, why: "「早く来る必要はない」は don't need to ～。" },
      { sentence: 'I needed ___ my homework before dinner.', choices: ['to finish', 'finish', 'finished'], answer: 0, why: 'need to ＋ 動詞の原形。過去は needed to。' },
    ],
  },
  {
    id: 'have-get-person',
    title: 'have 人 ＋ 原形 / get 人 to ＋ 原形（～してもらう）',
    points: [
      '〈have ＋ 人 ＋ 動詞の原形〉で「（仕事や役目として）人に～してもらう」：I had the mechanic check my bike.「修理の人に自転車を点検してもらった」。',
      '〈get ＋ 人 ＋ to ＋ 動詞の原形〉は「（たのんだり説得したりして）人に～してもらう」。get のときだけ to が入るので注意：I got my brother to help me with my homework.',
    ],
    examples: [
      { en: 'Our teacher had each student read a page aloud.', ja: '先生は生徒一人ひとりに1ページずつ音読させた。' },
      { en: 'Can you get your sister to call me later?', ja: 'あとでお姉さんに電話してもらえるようにたのんでくれる？' },
    ],
    questions: [
      { sentence: 'I had the clerk ___ the box for me.', choices: ['wrap', 'to wrap', 'wrapped', 'wraps'], answer: 0, why: 'have ＋ 人 ＋ 動詞の原形「人に～してもらう」。' },
      { sentence: 'She got her father ___ her to the station.', choices: ['to drive', 'drive', 'driven', 'drives'], answer: 0, why: 'get ＋ 人 ＋ to ＋ 原形。get のときは to が入る。' },
      { sentence: 'I will ___ my friend check my English essay.', choices: ['have', 'get', 'ask', 'make to'], answer: 0, why: 'あとが原形 check なので have。get と ask なら to check になる。' },
    ],
  },
  {
    id: 'do-does',
    title: "一般動詞の疑問文・否定文（Do / Does / don't / doesn't）",
    points: [
      "一般動詞の疑問文は Do を文の前に置く：Do you like soccer? — Yes, I do. / No, I don't. 主語が3人称単数なら Does を使い、動詞は原形にもどす：Does she play tennis?（× Does she plays）",
      "否定文は動詞の前に don't / doesn't：I don't have a pet. / He doesn't eat meat. doesn't のあとも動詞は原形。",
    ],
    examples: [
      { en: 'Does your brother live in Osaka? — Yes, he does.', ja: 'お兄さんは大阪に住んでいるの？—うん、住んでいるよ。' },
      { en: "My cat doesn't like water.", ja: 'うちのネコは水がきらいだ。' },
    ],
    questions: [
      { sentence: '___ your sister speak English?', choices: ['Does', 'Do', 'Is'], answer: 0, why: '主語 your sister は3人称単数で一般動詞の文なので Does。' },
      { sentence: "Ken doesn't ___ coffee.", choices: ['drink', 'drinks', 'drinking'], answer: 0, why: "doesn't のあとの動詞は原形。" },
      { sentence: 'Do they walk to school? — No, they ___.', choices: ["don't", "doesn't", "aren't"], answer: 0, why: 'Do で聞かれたら do / don\'t で答える。主語 they は複数。' },
    ],
  },
  {
    id: 'most-of',
    title: 'most / most of the ～ / all of / none of',
    points: [
      '〈most ＋ 名詞〉は「（一般に）たいていの～」：Most children like games. 決まったグループの中の「ほとんど」は〈most of the / my ＋ 名詞〉：Most of my friends live near the school.（× most of students）',
      'all of / some of / none of も、of のあとは the・my・these などのついた名詞か、us・them などの代名詞：All of us were surprised. / None of them knew the answer.',
    ],
    examples: [
      { en: 'Most of the students in our class walk to school.', ja: '私たちのクラスの生徒のほとんどは歩いて通学している。' },
      { en: 'None of us could answer the last question.', ja: '私たちのだれも最後の問題に答えられなかった。' },
    ],
    questions: [
      { sentence: 'Most ___ my classmates have a smartphone.', choices: ['of', 'in', 'the'], answer: 0, why: 'my のついた決まったグループなので most of my ～。' },
      { sentence: '___ people enjoy listening to music.', choices: ['Most', 'Most of', 'The most of'], answer: 0, why: '「たいていの人」と一般的に言うときは most ＋ 名詞。' },
      { sentence: 'I called my friends, but ___ of them answered.', choices: ['none', 'no', 'nothing'], answer: 0, why: 'none of them「彼らのだれも～ない」。no や nothing は of them の前に置けない。' },
    ],
  },
  {
    id: 'supposed-to',
    title: 'be supposed to ～（～することになっている）',
    points: [
      '〈be supposed to ＋ 動詞の原形〉で「（決まりや予定で）～することになっている・～するはずだ」：We are supposed to wear a uniform at school.「学校では制服を着ることになっている」。',
      '過去形 was / were supposed to は「～するはずだった（のにしなかった）」の意味になることが多い：The bus was supposed to come at eight.「バスは8時に来るはずだった」。否定 be not supposed to は「～してはいけないことになっている」。',
    ],
    examples: [
      { en: 'You are not supposed to use your phone in the library.', ja: '図書館ではスマートフォンを使ってはいけないことになっている。' },
      { en: 'I was supposed to call her yesterday, but I forgot.', ja: 'きのう彼女に電話するはずだったのに、忘れてしまった。' },
    ],
    questions: [
      { sentence: 'Students are supposed ___ their rooms every day.', choices: ['to clean', 'cleaning', 'clean', 'to cleaning'], answer: 0, why: 'be supposed to ＋ 動詞の原形。' },
      { sentence: 'The train ___ supposed to arrive at noon, but it was late.', choices: ['was', 'is', 'has', 'does'], answer: 0, why: '「来るはずだったのに遅れた」という過去の予定なので was supposed to。' },
      { sentence: 'You are ___ supposed to run in the hallway.', choices: ['not', 'no', "don't", 'none'], answer: 0, why: '否定は be not supposed to ～「～してはいけないことになっている」。' },
    ],
  },
  {
    id: 'future-progressive',
    title: '未来進行形 will be ～ing（～しているだろう）',
    points: [
      '〈will be ＋ ～ing〉で「（未来のある時点で）～しているだろう」：This time tomorrow, I will be flying to Hawaii.「あしたの今ごろはハワイへ飛んでいるだろう」。',
      'このまま進めば自然にそうなる予定を言うのにも使う：I will be seeing Ken at school tomorrow, so I can give him the book.「あした学校でケンに会うから、本をわたせるよ」。',
    ],
    examples: [
      { en: "Don't call me at eight. I'll be taking a bath.", ja: '8時には電話しないで。おふろに入っているから。' },
      { en: 'At noon tomorrow, we will be eating lunch in the park.', ja: 'あしたの正午には、私たちは公園でお昼を食べているだろう。' },
    ],
    questions: [
      { sentence: 'This time next week, I will ___ in Okinawa.', choices: ['be swimming', 'swimming', 'be swim', 'been swimming'], answer: 0, why: '「来週の今ごろは泳いでいるだろう」は will be ＋ ～ing。' },
      { sentence: 'At ten tonight, she will be ___ for the test.', choices: ['studying', 'study', 'studied', 'studies'], answer: 0, why: 'will be のあとは ～ing。' },
      { sentence: '___ you be using the computer this afternoon?', choices: ['Will', 'Are', 'Do', 'Did'], answer: 0, why: '未来進行形の疑問文は Will を主語の前に出す。' },
    ],
  },
  {
    id: 'reported-question',
    title: '疑問文の間接話法（He asked me where I lived / if I was tired）',
    points: [
      '人にたずねられたことを伝えるときは〈ask ＋ 人 ＋ 疑問詞 ＋ 主語 ＋ 動詞〉。語順はふつうの文と同じ：He said, "Where do you live?" → He asked me where I lived.（× where did I live）',
      'Yes / No で答える疑問文は if か whether を使う：She asked me if I was tired. 文全体が過去なので、時制も過去にずらす（are → were、can → could など）。',
    ],
    examples: [
      { en: 'The teacher asked us what we wanted to be in the future.', ja: '先生は私たちに、将来何になりたいかとたずねた。' },
      { en: 'My friend asked me if I could lend him a pen.', ja: '友だちが、ペンを貸してくれないかと私にたずねた。' },
    ],
    questions: [
      { sentence: 'She asked me where ___.', choices: ['I lived', 'did I live', 'do I live', 'lived I'], answer: 0, why: '間接疑問の語順は〈疑問詞 ＋ 主語 ＋ 動詞〉。asked に合わせて過去形 lived。' },
      { sentence: 'He asked me ___ I liked soccer.', choices: ['if', 'what', 'that', 'which'], answer: 0, why: 'Yes / No でたずねる内容なので if（〜かどうか）。' },
      { sentence: 'Mom asked me what time I ___ home.', choices: ['would come', 'will I come', 'do I come', 'came I'], answer: 0, why: '語順は〈主語 ＋ 動詞〉。過去の文なので will は would にずらす。' },
    ],
  },
  {
    id: 'almost-most',
    title: 'almost と most の使い分け（almost all / almost every）',
    points: [
      'almost は「ほとんど・もう少しで」という副詞なので、名詞の前に直接置けない：× almost students。「ほとんどの生徒」は most students か almost all (the) students と言う。',
      'almost は all・every・always・nothing などや、動詞・形容詞につける：Almost every student has a bike. / I almost forgot my homework.「もう少しで宿題を忘れるところだった」。',
    ],
    examples: [
      { en: 'Almost all of my classmates like music.', ja: 'クラスメートのほとんど全員が音楽が好きだ。' },
      { en: 'It is almost time for dinner.', ja: 'もうすぐ夕食の時間だ。' },
    ],
    questions: [
      { sentence: '___ students in this school walk to school.', choices: ['Most', 'Almost', 'The most'], answer: 0, why: '名詞の前に直接置けるのは most。almost は副詞。' },
      { sentence: 'Almost ___ student passed the test.', choices: ['every', 'all', 'most'], answer: 0, why: 'student が単数なので almost every。almost all なら students（複数）。' },
      { sentence: 'I ___ missed the bus this morning.', choices: ['almost', 'most', 'mostly'], answer: 0, why: '動詞 missed を修飾して「もう少しで乗りおくれるところだった」は almost。' },
    ],
  },
  {
    id: 'first-time',
    title: 'This is the first time I have ～ / for the first time',
    points: [
      '「～するのはこれが初めてだ」は〈This is the first time ＋ 主語 ＋ have ＋ 過去分詞〉：This is the first time I have eaten sushi.（現在完了を使う）',
      '「初めて～した」と出来事を言うだけなら for the first time を使い、動詞は過去形：I ate sushi for the first time last year. first time の前に the を忘れない。',
    ],
    examples: [
      { en: 'This is the first time I have seen snow.', ja: '雪を見るのはこれが初めてだ。' },
      { en: 'She went abroad for the first time when she was twenty.', ja: '彼女は20歳のときに初めて海外へ行った。' },
    ],
    questions: [
      { sentence: 'This is the first time I have ___ a horse.', choices: ['ridden', 'rode', 'ride'], answer: 0, why: 'This is the first time のあとは現在完了〈have ＋ 過去分詞〉。ride の過去分詞は ridden。' },
      { sentence: 'I visited Kyoto ___ the first time last spring.', choices: ['for', 'at', 'in'], answer: 0, why: 'for the first time「初めて」。' },
      { sentence: 'Is this the first time you ___ to Japan?', choices: ['have come', 'coming', 'come'], answer: 0, why: 'the first time ＋ 現在完了「～するのは初めて」。' },
    ],
  },
  {
    id: 'by-the-time',
    title: 'by the time ～（～するころには）と時制',
    points: [
      '〈by the time ＋ 主語 ＋ 動詞〉で「～するころには（もう）」。未来のことでも by the time の中は現在形にする：By the time you arrive, the movie will have started.（× will arrive）',
      '過去の話では、主節を過去完了にして「～したころには、もう…していた」：By the time we got to the station, the train had left.',
    ],
    examples: [
      { en: 'By the time I finish my homework, it will be dark.', ja: '宿題が終わるころには、暗くなっているだろう。' },
      { en: 'By the time the doctor came, the baby had fallen asleep.', ja: '医者が来たころには、赤ちゃんはもうねむっていた。' },
    ],
    questions: [
      { sentence: 'By the time you ___ home, dinner will be ready.', choices: ['get', 'will get', 'got', 'getting'], answer: 0, why: 'by the time の中は、未来のことでも現在形。' },
      { sentence: 'By the time we arrived, the concert ___ already started.', choices: ['had', 'has', 'will have', 'have'], answer: 0, why: '過去のある時点（arrived）より前に終わっていたことは過去完了 had started。' },
      { sentence: '___ the time she wakes up, I will have left.', choices: ['By', 'Until', 'For', 'Since'], answer: 0, why: 'by the time ～「～するころには」。' },
    ],
  },
  {
    id: 'make-sure',
    title: 'make sure (that) ～ / make sure to ～（必ず～するようにする）',
    points: [
      '〈make sure (that) ＋ 主語 ＋ 動詞〉で「必ず～するようにする・～か確かめる」：Make sure (that) you lock the door.「必ずかぎをかけてね」。that はよく省略される。',
      '〈make sure to ＋ 動詞の原形〉も同じ意味：Make sure to bring your textbook. 未来のことでも that 節の中はふつう現在形：Make sure you finish it before you go out.',
    ],
    examples: [
      { en: 'Make sure you drink enough water on hot days.', ja: '暑い日は必ず水を十分に飲むようにしてね。' },
      { en: 'I checked my bag twice to make sure I had my ticket.', ja: '切符を持っているか確かめるために、かばんを2回見た。' },
    ],
    questions: [
      { sentence: 'Make ___ you turn off the lights.', choices: ['sure', 'surely', 'sure to'], answer: 0, why: 'make sure (that) ＋ 主語 ＋ 動詞「必ず～するようにする」。' },
      { sentence: 'Make sure ___ your name on the paper.', choices: ['to write', 'writing', 'wrote'], answer: 0, why: 'make sure to ＋ 動詞の原形。' },
      { sentence: 'Please make sure the door ___ locked.', choices: ['is', 'being', 'be'], answer: 0, why: 'make sure の that 節の中は〈主語 ＋ 動詞〉。未来のことでもふつう現在形 is。' },
    ],
  },
  {
    id: 'trouble-ing',
    title: 'have trouble ～ing / be busy ～ing（～するのに苦労する・～するのにいそがしい）',
    points: [
      '〈have trouble (in) ～ing〉〈have difficulty (in) ～ing〉で「～するのに苦労する」：I had trouble finding the station.「駅を見つけるのに苦労した」。to ～ ではなく ～ing を使う。',
      '〈be busy ～ing〉で「～するのにいそがしい」：She is busy preparing for the trip.「彼女は旅行の準備でいそがしい」。どれも ～ing の形がポイント。',
    ],
    examples: [
      { en: 'Many students have trouble remembering new words.', ja: '新しい単語を覚えるのに苦労する生徒は多い。' },
      { en: 'My father was busy cooking dinner when I came home.', ja: '私が帰ったとき、父は夕食を作るのにいそがしかった。' },
    ],
    questions: [
      { sentence: 'I had trouble ___ my homework.', choices: ['finishing', 'to finish', 'finish', 'finished'], answer: 0, why: 'have trouble ～ing「～するのに苦労する」。' },
      { sentence: 'Mom is busy ___ the house.', choices: ['cleaning', 'to clean', 'clean', 'cleaned'], answer: 0, why: 'be busy ～ing「～するのにいそがしい」。' },
      { sentence: 'He had difficulty ___ asleep last night.', choices: ['falling', 'to fall', 'fell', 'to falling'], answer: 0, why: 'have difficulty ～ing「～するのに苦労する」。' },
    ],
  },
  {
    id: 'to-ing',
    title: '前置詞の to ＋ ～ing（when it comes to / in addition to / object to）',
    points: [
      'この to は不定詞ではなく前置詞なので、あとに動詞を置くときは ～ing にする：When it comes to cooking, my father is the best.「料理のことなら父がいちばんだ」。',
      'in addition to ～ing「～することに加えて」、object to ～ing「～することに反対する」も同じ。look forward to ～ing・be used to ～ing と同じなかまとして覚えよう。',
    ],
    examples: [
      { en: 'In addition to playing the piano, she sings in a choir.', ja: 'ピアノをひくことに加えて、彼女は合唱団で歌っている。' },
      { en: 'Some people object to building a new road here.', ja: 'ここに新しい道路を作ることに反対する人もいる。' },
    ],
    questions: [
      { sentence: 'When it comes to ___ English, Ken is very good.', choices: ['speaking', 'speak', 'spoke', 'speaks'], answer: 0, why: 'when it comes to の to は前置詞なので ～ing。' },
      { sentence: 'In addition ___ studying, he works part-time.', choices: ['to', 'for', 'of', 'with'], answer: 0, why: 'in addition to ～「～に加えて」。' },
      { sentence: 'My parents object to my ___ out late.', choices: ['staying', 'stay', 'stayed', 'stays'], answer: 0, why: 'object to のあとは名詞か ～ing。my は動名詞の意味上の主語。' },
    ],
  },
  {
    id: 'as-relative',
    title: '関係代名詞の as（such ～ as / the same ～ as / as is often the case）',
    points: [
      'such ～ as … で「…のような～」、the same ～ as … で「…と同じ～」。この as は関係代名詞のはたらきをして、うしろの文には主語や目的語が欠けている：I have never seen such a big fish as this.',
      'as is often the case (with ～) で「（～には）よくあることだが」。as は文全体の内容を受ける：As is often the case with him, he was late again.「彼にはよくあることだが、また遅刻した」。',
    ],
    examples: [
      { en: 'I want the same bag as my sister has.', ja: '姉が持っているのと同じかばんがほしい。' },
      { en: 'As is often the case with children, he got bored quickly.', ja: '子どもにはよくあることだが、彼はすぐにあきてしまった。' },
    ],
    questions: [
      { sentence: 'This is the same watch ___ I lost last month.', choices: ['as', 'than', 'so', 'what'], answer: 0, why: 'the same ～ as … で「…と同じ～」。' },
      { sentence: '___ is often the case with him, he forgot his umbrella.', choices: ['As', 'What', 'That', 'It'], answer: 0, why: 'As is often the case with ～「～にはよくあることだが」。文全体を受ける as。' },
      { sentence: 'Choose such friends ___ will help you grow.', choices: ['as', 'than', 'so', 'what'], answer: 0, why: 'such ～ as …「…のような～」。as が will help の主語のはたらき。' },
    ],
  },
  {
    id: 'were-to',
    title: '仮定法未来（If S were to ～ / If S should ～）',
    points: [
      'If S were to 原形, S would 原形 で「（ありえないことだが）もし～するとしたら」。実現の可能性がとても低いことや、仮の話をするときに使う：If the sun were to disappear, all life would end.',
      'If S should 原形 で「万一～したら」。主節には命令文や will も使える：If you should need help, call me.（Should you need help, … と倒置もできる）',
    ],
    examples: [
      { en: 'If I were to win the lottery, I would buy a house by the sea.', ja: 'もし宝くじに当たるとしたら、海辺に家を買うだろう。' },
      { en: 'If it should rain tomorrow, the game will be canceled.', ja: '万一明日雨が降ったら、試合は中止になる。' },
    ],
    questions: [
      { sentence: 'If the earth ___ to stop turning, what would happen?', choices: ['were', 'is', 'will', 'has'], answer: 0, why: 'If S were to ～「もし～するとしたら」（仮の話）。' },
      { sentence: 'If you ___ see Ken, please give him this letter.', choices: ['should', 'would', 'were', 'will to'], answer: 0, why: 'If S should ～「万一～したら」。主節は命令文。' },
      { sentence: 'If I were to live abroad, I ___ choose Canada.', choices: ['would', 'will', 'am', 'can'], answer: 0, why: 'If S were to ～ の主節は would ＋原形。' },
    ],
  },
  {
    id: 'as-concession',
    title: '譲歩の倒置（Young as he is, … / Much as I like it, …）',
    points: [
      '形容詞・副詞 ＋ as ＋ S ＋ V で「～だけれども」（＝Though S V 形容詞）：Young as he is, he is very wise.「彼は若いけれども、とても賢い」。',
      'Much as I like ～「～は大好きだけれども」、Try as he might「どんなにがんばっても」もこのなかま。文の頭に来た語が強調される。',
    ],
    examples: [
      { en: 'Tired as she was, she finished her homework.', ja: '彼女はつかれていたけれども、宿題を終えた。' },
      { en: 'Much as I like summer, I can\'t stand this heat.', ja: '夏は大好きだけれど、この暑さにはたえられない。' },
    ],
    questions: [
      { sentence: 'Small ___ it is, the room is comfortable.', choices: ['as', 'so', 'than', 'that'], answer: 0, why: '形容詞 ＋ as ＋ S V で「～だけれども」。' },
      { sentence: '___ as I like him, I can\'t agree with his idea.', choices: ['Much', 'Many', 'Very', 'Such'], answer: 0, why: 'Much as I like ～「～は好きだけれども」。' },
      { sentence: 'Rich as he is, he ___ happy.', choices: ['is not', 'not is', 'does not', 'is no'], answer: 0, why: '「金持ちだけれども幸せではない」。be 動詞の否定は is not。' },
    ],
  },
  {
    id: 'all-the-comparative',
    title: 'all the 比較級 for / because ～（～なのでいっそう…）',
    points: [
      'all the ＋ 比較級 ＋ for ～（名詞）／because S V で「～なので、それだけいっそう…」：I like him all the better for his honesty.「正直なので、彼がいっそう好きだ」。',
      'none the ＋ 比較級 で「それでも少しも…ない」：He is none the happier for his money.「お金があっても少しも幸せではない」。',
    ],
    examples: [
      { en: 'The view was all the more beautiful because of the snow.', ja: '雪のおかげで、景色はいっそう美しかった。' },
      { en: 'She studied all the harder because she had failed once.', ja: '一度失敗したので、彼女はいっそう熱心に勉強した。' },
    ],
    questions: [
      { sentence: 'I love her all the ___ for her faults.', choices: ['more', 'most', 'much', 'many'], answer: 0, why: 'all the ＋比較級 ＋ for ～「～なのでいっそう」。比較級 more。' },
      { sentence: 'He worked all the ___ because his boss praised him.', choices: ['harder', 'hardest', 'hard', 'more hard'], answer: 0, why: 'all the ＋比較級 ＋ because ～。比較級 harder。' },
      { sentence: 'He is ___ the wiser for his long experience.', choices: ['none', 'no', 'not', 'nothing'], answer: 0, why: 'none the ＋比較級「それでも少しも～ない」。' },
    ],
  },
  {
    id: 'anything-but',
    title: '否定語を使わない否定（anything but / free from / fail to）',
    points: [
      'anything but ～「少しも～ではない」：The test was anything but easy.「テストは少しもやさしくなかった」。（nothing but ～ は「～だけ」なので区別する）',
      'free from ～「～がない」、fail to ～「～しない・できない」、remain to be ～「まだ～されていない」も、not を使わずに否定の意味を表す。',
    ],
    examples: [
      { en: 'This food is free from sugar.', ja: 'この食べ物には砂糖が入っていない。' },
      { en: 'He failed to keep his promise.', ja: '彼は約束を守らなかった。' },
    ],
    questions: [
      { sentence: 'The movie was ___ but boring; I loved it.', choices: ['anything', 'any', 'anyone', 'anywhere'], answer: 0, why: 'anything but ～「少しも～ではない」。any・anyone ではこの形にならない。' },
      { sentence: 'The cause of the accident remains to ___ found.', choices: ['be', 'being', 'been', 'is'], answer: 0, why: 'remain to be ＋過去分詞「まだ～されていない」。' },
      { sentence: 'She never ___ to call her mother on Sundays.', choices: ['fails', 'misses', 'loses', 'fail'], answer: 0, why: 'never fail to ～「必ず～する」（～しないことがない）。' },
    ],
  },
  {
    id: 'what-is-more',
    title: '関係代名詞 what の慣用（what is more / what is worse / what S is）',
    points: [
      'what is more「さらに・そのうえ」、what is worse「さらに悪いことに」は、文と文のあいだに入れて情報を足す：It was cold, and what was worse, it began to rain.',
      'what S is「今の S」、what S was / used to be「昔の S」：She is not what she was ten years ago.「彼女は10年前の彼女ではない」。',
    ],
    examples: [
      { en: 'The hotel was cheap, and what is more, the food was great.', ja: 'そのホテルは安く、そのうえ料理もすばらしかった。' },
      { en: 'My hometown is very different from what it used to be.', ja: '私の故郷は昔とはずいぶんちがう。' },
    ],
    questions: [
      { sentence: 'He lost his wallet, and ___ was worse, his phone too.', choices: ['what', 'which', 'that', 'it'], answer: 0, why: 'what is (was) worse「さらに悪いことに」。' },
      { sentence: 'The town is not ___ it was twenty years ago.', choices: ['what', 'that', 'which', 'who'], answer: 0, why: 'what S was「昔の S」。' },
      { sentence: 'She is kind, and what is ___, she is very funny.', choices: ['more', 'most', 'much', 'many'], answer: 0, why: 'what is more「さらに・そのうえ」。' },
    ],
  },
  {
    id: 'past-perfect-progressive',
    title: '過去完了進行形（had been ～ing）',
    points: [
      'had been ＋ -ing で「（過去のある時まで）ずっと～し続けていた」。過去のある時点までの動作の継続を表す：I had been waiting for an hour when the bus came.',
      '現在完了進行形（have been ～ing）を、基準の時点ごと過去にずらした形。for や since とよくいっしょに使う。',
    ],
    examples: [
      { en: 'She had been studying for three hours before she took a break.', ja: '彼女は休けいする前に3時間ずっと勉強していた。' },
      { en: 'It had been raining all night, so the ground was wet.', ja: '一晩じゅう雨が降り続いていたので、地面はぬれていた。' },
    ],
    questions: [
      { sentence: 'We had been ___ for an hour when the train finally arrived.', choices: ['waiting', 'waited', 'wait', 'waits'], answer: 0, why: 'had been ＋ -ing で「（その時まで）ずっと～していた」。' },
      { sentence: 'He was tired because he ___ been running all morning.', choices: ['had', 'has', 'was', 'is'], answer: 0, why: '過去（was tired）の時点までの継続なので過去完了進行形 had been running。' },
      { sentence: 'How long had you been ___ English before you went abroad?', choices: ['learning', 'learned', 'learn', 'learns'], answer: 0, why: '過去完了進行形の疑問文。had been のあとは -ing。' },
    ],
  },
  {
    id: 'gerund-perfect-passive',
    title: '完了形・受け身の動名詞（having done / being done）',
    points: [
      'having ＋過去分詞 の動名詞は、文の動詞より前のことを表す：He is proud of having won the prize.「（以前に）賞をとったことを誇りに思っている」。',
      'being ＋過去分詞 の動名詞は「～されること」：She doesn\'t like being told what to do.「何をすべきか指図されるのが好きではない」。',
    ],
    examples: [
      { en: 'I regret having said such a thing.', ja: 'あんなことを言ったのを後悔している。' },
      { en: 'The child was afraid of being left alone.', ja: 'その子はひとりにされるのをこわがっていた。' },
    ],
    questions: [
      { sentence: 'He denied ___ seen the man before.', choices: ['having', 'to have', 'had', 'have'], answer: 0, why: 'deny は動名詞を目的語にとる。以前のことなので完了形の動名詞 having seen。' },
      { sentence: 'Nobody likes ___ laughed at.', choices: ['being', 'to being', 'been', 'be'], answer: 0, why: '「笑われること」は受け身の動名詞 being laughed at。' },
      { sentence: 'She is proud of having ___ the race.', choices: ['won', 'win', 'winning', 'wins'], answer: 0, why: 'having ＋過去分詞。win の過去分詞は won。' },
    ],
  },
  {
    id: 'for-fear-of',
    title: '否定の目的（for fear of ～ / so as not to ～）',
    points: [
      'for fear of ～ing「～しないように・～するのをおそれて」：He walked slowly for fear of slipping on the ice.',
      'so as not to ～ / in order not to ～「～しないように」は to の前に not を置く：She spoke quietly so as not to wake the baby.',
    ],
    examples: [
      { en: 'I wrote down the address for fear of forgetting it.', ja: '忘れないように住所を書きとめた。' },
      { en: 'We left early so as not to miss the bus.', ja: 'バスに乗りおくれないように早く出た。' },
    ],
    questions: [
      { sentence: 'He took a map for fear ___ getting lost.', choices: ['of', 'to', 'that', 'for'], answer: 0, why: 'for fear of ～ing「～しないように」。' },
      { sentence: 'She tiptoed so as ___ to wake her parents.', choices: ['not', 'no', 'never be', 'none'], answer: 0, why: 'so as not to ～ の語順。not は to の前。' },
      { sentence: 'Take notes in order ___ forget the main points.', choices: ['not to', 'to no', 'no to', 'not for'], answer: 0, why: 'in order not to ～「～しないように」。not を to の前に置く。no は動詞を否定できない。' },
    ],
  },
  {
    id: 'causative-passive',
    title: '使役・知覚動詞の受け身（be made to ～ / be seen to ～）',
    points: [
      'make 人 原形「人に～させる」を受け身にすると、原形の前に to がつく：He was made to clean the room.「彼は部屋をそうじさせられた」。',
      '知覚動詞も同じ：I saw him enter.→ He was seen to enter the building.「彼は建物に入るのを見られた」。-ing ならそのまま（He was seen entering）。',
    ],
    examples: [
      { en: 'The students were made to wait outside.', ja: '生徒たちは外で待たされた。' },
      { en: 'She was heard to sing in the next room.', ja: '彼女がとなりの部屋で歌うのが聞こえた。' },
    ],
    questions: [
      { sentence: 'He was made ___ the dishes.', choices: ['to wash', 'wash', 'washed', 'washing'], answer: 0, why: '使役の make の受け身は be made to 原形。' },
      { sentence: 'The man was seen ___ the shop.', choices: ['to leave', 'leave', 'left', 'leaves'], answer: 0, why: '知覚動詞の受け身は be seen to 原形（または -ing）。' },
      { sentence: 'I was made ___ my name three times.', choices: ['to write', 'write', 'writing', 'wrote'], answer: 0, why: 'be made to 原形「～させられる」。' },
    ],
  },
  {
    id: 'no-wonder',
    title: '否定の形で当然を表す（It is no wonder / needless to say）',
    points: [
      'It is no wonder (that) ～「～なのは当然だ・不思議ではない」：It is no wonder that he is tired; he worked all night.',
      'It goes without saying that ～「～は言うまでもない」、needless to say「言うまでもなく」も同じなかま。',
    ],
    examples: [
      { en: 'It is no wonder that she won; she practiced every day.', ja: '彼女が勝ったのは当然だ。毎日練習していたのだから。' },
      { en: 'Needless to say, health is more important than money.', ja: '言うまでもなく、健康はお金より大切だ。' },
    ],
    questions: [
      { sentence: 'It is no ___ that he is sleepy; he stayed up late.', choices: ['wonder', 'doubt it', 'surprised', 'wondering'], answer: 0, why: 'It is no wonder (that) ～「～なのは当然だ」。' },
      { sentence: '___ to say, we were very happy.', choices: ['Needless', 'Needed', 'Need', 'Needing'], answer: 0, why: 'needless to say「言うまでもなく」。' },
      { sentence: 'It goes without ___ that safety comes first.', choices: ['saying', 'say', 'to say', 'to saying'], answer: 0, why: 'It goes without saying that ～「～は言うまでもない」。without のあとは動名詞。' },
    ],
  },
  {
    id: 'the-very',
    title: '強調の表現（the very ～ / on earth / at all）',
    points: [
      'the very ＋名詞「まさにその～」：This is the very book I wanted.「これこそ私がほしかった本だ」。',
      '疑問詞 ＋ on earth / in the world「いったい～」、否定文の at all「まったく～ない」も強調の表現：What on earth are you doing?',
    ],
    examples: [
      { en: 'He is the very person for the job.', ja: '彼こそその仕事にうってつけの人だ。' },
      { en: 'Why in the world did you say that?', ja: 'いったいなぜそんなことを言ったの？' },
    ],
    questions: [
      { sentence: 'This is the ___ watch I lost last week.', choices: ['very', 'much', 'so', 'too'], answer: 0, why: 'the very ＋名詞「まさにその～」。' },
      { sentence: 'What on ___ is that noise?', choices: ['earth', 'world', 'ground', 'space'], answer: 0, why: '疑問詞 ＋ on earth「いったい」。in the world とも言う。' },
      { sentence: 'I am not tired ___ all.', choices: ['at', 'in', 'on', 'for'], answer: 0, why: 'not ～ at all「まったく～ない」。' },
    ],
  },
  {
    id: 'never-without',
    title: '二重否定（never ～ without ～ / no one but）',
    points: [
      'never A without B（-ing）で「A すると必ず B する」：I never see this photo without remembering my trip.「この写真を見ると必ず旅行を思い出す」。',
      'There is no one but ～ / nobody but ～ は「～しない人はいない」の意味になることもある。否定が2つ重なると強い肯定になる。',
    ],
    examples: [
      { en: 'They never meet without arguing.', ja: '彼らは会うと必ず口論する。' },
      { en: 'It never rains but it pours.', ja: '降れば必ずどしゃ降り（悪いことは重なる）。' },
    ],
    questions: [
      { sentence: 'I never hear this song ___ thinking of my grandmother.', choices: ['without', 'so', 'than', 'unless'], answer: 0, why: 'never A without B（-ing）「A すると必ず B する」。' },
      { sentence: 'She never goes out without ___ her umbrella.', choices: ['taking', 'take', 'to take', 'took'], answer: 0, why: '前置詞 without のあとは動名詞。' },
      { sentence: 'He ___ visits us without bringing a gift.', choices: ['never', 'ever', 'yet', 'not'], answer: 0, why: 'never ～ without -ing「～すると必ず…する」。ever・yet はこの位置で visits を否定できない。' },
    ],
  },
  {
    id: 'provided-that',
    title: '条件を表す接続詞（provided that / suppose / on condition that）',
    points: [
      'provided (that) ～ / providing (that) ～「～という条件で・もし～なら」：You can go out provided that you finish your homework.',
      'suppose (that) ～ / supposing ～「もし～としたら」、on condition that ～「～という条件で」も if と同じように条件を表す。',
    ],
    examples: [
      { en: 'I will lend you the book provided that you return it by Friday.', ja: '金曜日までに返すなら、その本を貸してあげよう。' },
      { en: 'Suppose you won a million yen, what would you do?', ja: 'もし100万円当たったら、どうする？' },
    ],
    questions: [
      { sentence: 'You can borrow my bike ___ that you bring it back tonight.', choices: ['provided', 'unless', 'although', 'in case'], answer: 0, why: 'provided that ～「～という条件で」。' },
      { sentence: '___ it rains tomorrow, what will you do?', choices: ['Suppose', 'Because of', 'Despite', 'In spite'], answer: 0, why: 'Suppose ～「もし～としたら」。Because of・Despite のうしろに文は続かない。' },
      { sentence: 'He agreed on ___ that his name would not be used.', choices: ['condition', 'case', 'order', 'purpose'], answer: 0, why: 'on condition that ～「～という条件で」。' },
    ],
  },
  {
    id: 'those-who',
    title: '代名詞 those who ～ と the former / the latter',
    points: [
      'those who ～「～する人々」：Heaven helps those who help themselves.「天はみずから助くる者を助く」。',
      'the former「前者」と the latter「後者」は、前に出た2つのものを指す：I have a cat and a dog; the former is white and the latter is black.',
    ],
    examples: [
      { en: 'Those who arrive early will get good seats.', ja: '早く来た人はよい席に座れる。' },
      { en: 'Tea and coffee are both popular, but I prefer the latter.', ja: '紅茶もコーヒーも人気だが、私は後者のほうが好きだ。' },
    ],
    questions: [
      { sentence: '___ who want to join the club should sign here.', choices: ['Those', 'That', 'Them', 'These'], answer: 0, why: 'those who ～「～する人々」。' },
      { sentence: 'I met Ken and Mike; the ___ is taller than the latter.', choices: ['former', 'formerly', 'formal', 'formality'], answer: 0, why: 'the former「前者」と the latter「後者」。' },
      { sentence: 'The prize goes to those ___ work the hardest.', choices: ['who', 'whom', 'whose', 'which'], answer: 0, why: 'those who ～「～する人々」。work の主語なので主格の who。' },
    ],
  },
  {
    id: 'noun-construction',
    title: '名詞構文（his arrival ＝ he arrived）',
    points: [
      '動詞や形容詞を名詞にした形で、文の内容を短く表すことがある：his sudden arrival「彼が突然着いたこと」＝ he arrived suddenly。',
      '訳すときは「～が…すること」と文に直すとわかりやすい：The discovery of oil changed the town.「石油が発見されたことがその町を変えた」。',
    ],
    examples: [
      { en: 'Her quick recovery surprised the doctors.', ja: '彼女がすぐに回復したことは医者たちをおどろかせた。' },
      { en: 'We were worried about his absence from school.', ja: '私たちは彼が学校を休んでいることを心配した。' },
    ],
    questions: [
      { sentence: 'His sudden ___ surprised everyone.', choices: ['arrival', 'arrive', 'arrived', 'arrivals'], answer: 0, why: '所有格 His ＋形容詞 sudden のあとは名詞 arrival「到着」。' },
      { sentence: 'The ___ of the new bridge took five years.', choices: ['construction', 'construct', 'constructed', 'constructive'], answer: 0, why: 'The ～ of …「…の～」。the のあとは名詞 construction。' },
      { sentence: 'I was impressed by her ___ to help others.', choices: ['willingness', 'willing', 'willingly', 'will'], answer: 0, why: '所有格 her のあとは名詞。willing（形容詞）の名詞形 willingness「進んで～する気持ち」。' },
    ],
  },
  {
    id: 'tense-agreement-exception',
    title: '時制の一致の例外（不変の真理・歴史的事実・今も続くこと）',
    points: [
      '主節が過去形でも、いつでも正しいこと（不変の真理）は現在形のまま：The teacher said that the earth goes around the sun.',
      '歴史上の出来事は過去形のまま（過去完了にしない）：We learned that the war ended in 1945. 今も変わらない習慣や事実も現在形でよい。',
    ],
    examples: [
      { en: 'He told me that water boils at 100°C.', ja: '彼は水は100度でふっとうすると私に教えてくれた。' },
      { en: 'She said that she gets up at six every day.', ja: '彼女は毎日6時に起きると言った。' },
    ],
    questions: [
      { sentence: 'Our teacher said that the sun ___ in the east.', choices: ['rises', 'rise', 'rising', 'risen'], answer: 0, why: 'いつでも正しいこと（不変の真理）は、主節が過去でも現在形 rises。' },
      { sentence: 'We learned that Columbus ___ America in 1492.', choices: ['reached', 'reach', 'reaching', 'has reached'], answer: 0, why: '歴史上の出来事は過去形のまま reached。' },
      { sentence: 'He said that light ___ faster than sound.', choices: ['travels', 'travel', 'traveling', 'to travel'], answer: 0, why: '光が音より速いのは不変の真理なので現在形 travels。' },
    ],
  },
  {
    id: 'pro-infinitive',
    title: '代不定詞（I\'d like to. ／ You don\'t have to.）',
    points: [
      'くり返しをさけるため、to のあとの動詞を省くことがある。これを代不定詞という：Would you like to come? — Yes, I\'d love to.（＝ to come）',
      'want to / have to / be going to / used to などのあとでよく使う。to は残し、そのあとだけを省く。',
    ],
    examples: [
      { en: 'You can stay if you want to.', ja: 'いたいなら、いてもいいよ。' },
      { en: 'I don\'t play the piano now, but I used to.', ja: '今はピアノをひかないが、昔はひいていた。' },
    ],
    questions: [
      { sentence: 'Do you want to join us? — Yes, I\'d love ___.', choices: ['to', 'so', 'for', 'that'], answer: 0, why: '代不定詞。I\'d love to (join you) の join you を省いて to だけ残す。' },
      { sentence: 'You don\'t have to come if you don\'t want ___.', choices: ['to', 'so', 'for', 'that'], answer: 0, why: 'want to (come) の come を省いた代不定詞。' },
      { sentence: 'I don\'t eat meat now, but I used ___.', choices: ['to', 'so', 'for', 'that'], answer: 0, why: 'used to (eat meat) の eat meat を省いた代不定詞。' },
    ],
  },
  {
    id: 'lest',
    title: '接続詞 lest（～しないように）',
    points: [
      'lest S (should) 原形 で「S が～しないように」。lest 自体に否定の意味があるので、うしろに not はつけない。',
      'かたい書きことば。ふだんは so that S won\'t ～ や for fear (that) ～ で言いかえられる。',
    ],
    examples: [
      { en: 'He set two alarms lest he should oversleep.', ja: '彼は寝すごさないように、目覚ましを2つかけた。' },
      { en: 'Speak quietly lest the baby wake up.', ja: '赤ちゃんが起きないように、静かに話して。' },
    ],
    questions: [
      { sentence: 'He wrote the number down ___ he should forget it.', choices: ['lest', 'in case of', 'despite', 'so as'], answer: 0, why: 'うしろが文（he should forget it）なので接続詞 lest「～しないように」。in case of・despite は前置詞の働きで文を続けられない。' },
      { sentence: 'Speak quietly lest the baby ___ up.', choices: ['wake', 'waking', 'to wake', 'woke'], answer: 0, why: 'lest S (should) 原形。should が省かれて原形 wake が残る。-ing や to 不定詞は述語にならない。' },
      { sentence: 'She hurried lest she ___ miss the last bus.', choices: ['should', 'to', 'being', 'would to'], answer: 0, why: 'lest S should 原形 の形。to・being のあとに原形 miss を続けて述語にすることはできない。' },
    ],
  },
  {
    id: 'might-as-well',
    title: '助動詞 might as well（～したほうがいい・～するのと同じだ）',
    points: [
      'might (may) as well 原形 で「（ほかにいい方法もないので）～したほうがいい・～してもいい」。had better より弱く、あきらめまじりの提案。',
      'might as well A as B で「B するのは A するようなものだ」（B のばからしさを強調）。A・B はどちらも動詞の原形。',
    ],
    examples: [
      { en: 'The last train has left. We might as well take a taxi.', ja: '終電が出てしまった。タクシーに乗ったほうがいいね。' },
      { en: 'You might as well talk to a wall as try to change his mind.', ja: '彼の考えを変えようとするのは、かべに話しかけるようなものだ。' },
    ],
    questions: [
      { sentence: 'The bus has already gone. We might as well ___.', choices: ['walk', 'walking', 'to walk', 'walked'], answer: 0, why: 'might as well のあとは動詞の原形 walk。' },
      { sentence: 'There is nothing to do here, so we may as ___ go home.', choices: ['well', 'good', 'better', 'best'], answer: 0, why: 'may (might) as well 原形 の決まった形。good・better は入らない。' },
      { sentence: 'You might ___ well throw your money away as spend it on that.', choices: ['as', 'so', 'too', 'very'], answer: 0, why: 'might as well A as B「B するのは A するようなものだ」。as well の前は as。' },
    ],
  },
  {
    id: 'cannot-but',
    title: '助動詞 cannot but 原形（～せずにはいられない）',
    points: [
      'cannot but 原形 で「～せずにはいられない・～するしかない」。cannot help -ing と同じ意味のかたい言い方。but のあとは原形。',
      'cannot help but 原形 という言い方もある（話しことばでよく使う）。過去なら could not but 原形。',
    ],
    examples: [
      { en: 'I could not but laugh at his funny story.', ja: '彼のおもしろい話に笑わずにはいられなかった。' },
      { en: 'We cannot help but admire her courage.', ja: '彼女の勇気には感心せずにはいられない。' },
    ],
    questions: [
      { sentence: 'I could not but ___ at his joke.', choices: ['laugh', 'laughing', 'to laugh', 'laughed'], answer: 0, why: 'cannot but のあとは動詞の原形 laugh。' },
      { sentence: 'We cannot ___ admire her courage.', choices: ['but', 'for', 'of', 'with'], answer: 0, why: 'cannot but 原形「～せずにはいられない」。for・of のあとに動詞の原形は続かない。' },
      { sentence: 'She could not help but ___ when she saw the puppy.', choices: ['smile', 'smiling', 'smiled', 'smiles'], answer: 0, why: 'cannot help but のあとも原形 smile。' },
    ],
  },
  {
    id: 'on-the-point-of',
    title: '動名詞 be on the point of -ing（今にも～しようとしている）',
    points: [
      'be on the point of -ing で「今にも～しようとしている・～するところだ」。of は前置詞なので、うしろは動名詞。',
      'be about to 原形 とほぼ同じ意味。be about to のうしろは原形、be on the point of のうしろは -ing なので注意。',
    ],
    examples: [
      { en: 'The plane was on the point of taking off.', ja: '飛行機は今にも離陸しようとしていた。' },
      { en: 'I was on the point of giving up when she helped me.', ja: 'あきらめかけていたとき、彼女が助けてくれた。' },
    ],
    questions: [
      { sentence: 'The train was on the point of ___ when we arrived.', choices: ['leaving', 'leave', 'to leave', 'left'], answer: 0, why: 'of は前置詞なので、うしろは動名詞 leaving。' },
      { sentence: 'I was on the ___ of calling you.', choices: ['point', 'top', 'end', 'way'], answer: 0, why: 'be on the point of -ing「今にも～しようとしている」の決まった形。' },
      { sentence: 'She was ___ the point of giving up.', choices: ['on', 'by', 'for', 'at'], answer: 0, why: 'be on the point of -ing。point の前は on。' },
    ],
  },
  {
    id: 'nothing-but',
    title: '否定語を使った表現 nothing but ～（～だけ）／ all but ～（ほとんど～）',
    points: [
      'nothing but ～ で「～だけ・～にすぎない」（＝ only）。but は「～以外」の意味：He ate nothing but bread.「パンしか食べなかった」。',
      'all but ～ で「ほとんど～」（＝ almost）：The work is all but finished.「仕事はほとんど終わった」。anything but ～「少しも～ない」とまちがえないように。',
    ],
    examples: [
      { en: 'She drinks nothing but water.', ja: '彼女は水しか飲まない。' },
      { en: 'It was all but impossible to find a seat.', ja: '席を見つけるのは、ほとんど不可能だった。' },
    ],
    questions: [
      { sentence: 'He ate nothing ___ bread for lunch.', choices: ['but', 'only', 'unless', 'than'], answer: 0, why: 'nothing but ～「～だけ」。nothing only・nothing unless という形はない。' },
      { sentence: 'The work is all but ___.', choices: ['finished', 'finishing', 'finish', 'finishes'], answer: 0, why: 'all but ～「ほとんど～」。仕事は「終えられる」側なので過去分詞 finished。' },
      { sentence: 'It was ___ but impossible to get tickets.', choices: ['all', 'any', 'every', 'some'], answer: 0, why: 'all but impossible「ほとんど不可能」。any but・every but という形はない（anything but なら「少しも～ない」）。' },
    ],
  },
  {
    id: 'quite-a-few',
    title: '名詞の数量の表現 quite a few ／ not a few（かなり多くの）',
    points: [
      'quite a few ＋ 数えられる名詞の複数形 で「かなり多くの」。not a few も同じ意味（かたい言い方）。a few「少しの」とは反対に近い意味になる。',
      '数えられない名詞なら quite a lot of ～ / quite a bit of ～ を使う：quite a lot of money「かなりのお金」。',
    ],
    examples: [
      { en: 'Quite a few students walk to school.', ja: 'かなり多くの生徒が歩いて通学している。' },
      { en: 'Not a few people agreed with her.', ja: '少なからぬ人が彼女に賛成した。' },
    ],
    questions: [
      { sentence: 'Quite a ___ people came to the party.', choices: ['few', 'little', 'lot', 'many'], answer: 0, why: 'people は数えられる名詞の複数なので quite a few。quite a lot なら of が必要、little は数えられない名詞に使う。' },
      { sentence: 'There were not a ___ mistakes in his report.', choices: ['few', 'little', 'much', 'lot'], answer: 0, why: 'mistakes は数えられる名詞の複数なので not a few「少なからぬ」。little・much は数えられない名詞に使う。' },
      { sentence: 'She spent quite a ___ of money on the trip.', choices: ['lot', 'few', 'many', 'much'], answer: 0, why: 'money は数えられない名詞なので quite a lot of。few・many は数えられる名詞に使い、a many という形もない。' },
    ],
  },
  {
    id: 'every-other',
    title: '数の表現 every other ～（1つおきに）／ every ＋ 数 ＋ 複数形（～ごとに）',
    points: [
      'every other day で「1日おきに」（2日に1回）。other のあとは単数形：every other week「1週おきに」。',
      'every ＋ 数 ＋ 複数形 で「～ごとに」：every three days「3日ごとに」、every ten minutes「10分ごとに」。every のうしろなのに複数形になる点に注意。',
    ],
    examples: [
      { en: 'I go to the gym every other day.', ja: '私は1日おきにジムに行く。' },
      { en: 'The train comes every fifteen minutes.', ja: '電車は15分ごとに来る。' },
    ],
    questions: [
      { sentence: 'I go swimming every ___ day.', choices: ['other', 'another', 'others', 'one'], answer: 0, why: 'every other day「1日おきに」。every another・every others という形はない。' },
      { sentence: 'The bus comes every ten ___.', choices: ['minutes', 'minute', 'of minutes', 'minutes of'], answer: 0, why: 'every ＋ 数 ＋ 複数形「～ごとに」。ten のあとは複数形 minutes。' },
      { sentence: 'She calls her parents every ___ weeks.', choices: ['two', 'second', 'twice', 'twos'], answer: 0, why: 'every ＋ 数（two）＋ 複数形 weeks。every second なら week（単数）、twice は every のあとに置けない。' },
    ],
  },
  {
    id: 'rather-than',
    title: '接続詞のように使う A rather than B（B よりむしろ A）',
    points: [
      'A rather than B で「B よりむしろ A・B ではなく A」。A と B は同じ形（名詞と名詞、原形と原形など）にそろえる。',
      'would rather A than B「B するよりむしろ A したい」とにた意味。rather than のあとが動詞のときは、原形（または -ing）を使う。',
    ],
    examples: [
      { en: 'I\'d like to walk rather than take a taxi.', ja: 'タクシーに乗るより、歩きたい。' },
      { en: 'He is a teacher rather than a scholar.', ja: '彼は学者というより、むしろ教師だ。' },
    ],
    questions: [
      { sentence: 'I\'d like to stay home rather than ___ out.', choices: ['go', 'went', 'gone', 'goes'], answer: 0, why: 'to stay と形をそろえて、rather than のあとも原形 go。過去形・過去分詞は入らない。' },
      { sentence: 'She chose to study ___ than play games.', choices: ['rather', 'more', 'better', 'most'], answer: 0, why: 'A rather than B「B よりむしろ A」。動詞の原形どうしをつなぐのは rather than。' },
      { sentence: 'He is a writer rather ___ a scientist.', choices: ['than', 'then', 'that', 'when'], answer: 0, why: 'rather than ～「～よりむしろ」。then（そのとき）とつづりがにているので注意。' },
    ],
  },
  {
    id: 'by-far',
    title: '最上級・比較級を強める by far ／ much（ずばぬけて・ずっと）',
    points: [
      '最上級を強めるときは by far / much を the の前に置く：by far the best「ずばぬけていちばんよい」。very は the very best の形で使う。',
      '比較級を強めるときは much / far / even / a lot：much cheaper「ずっと安い」。very は比較級を強められない。',
    ],
    examples: [
      { en: 'This is by far the best pizza in town.', ja: 'これは町でずばぬけていちばんおいしいピザだ。' },
      { en: 'The new phone is much lighter than the old one.', ja: '新しい電話は古いのよりずっと軽い。' },
    ],
    questions: [
      { sentence: 'This is ___ the best movie I have ever seen.', choices: ['by far', 'very', 'so', 'too'], answer: 0, why: '最上級（the best）を強めるのは by far。very・so は the の前に置けない。' },
      { sentence: 'She is much the ___ student in the class.', choices: ['tallest', 'tall', 'most tall', 'taller'], answer: 0, why: 'much the ＋ 最上級「ずばぬけて～」。tall の最上級は tallest（most tall とはしない）。' },
      { sentence: 'This bag is ___ cheaper than that one.', choices: ['much', 'very', 'more', 'too'], answer: 0, why: '比較級（cheaper）を強めるのは much。very は比較級を強められず、more cheaper は比較級が二重になる。' },
    ],
  },
  {
    id: 'so-adj-a',
    title: '形容詞の語順 so / too / as ＋形容詞＋ a ＋名詞（so nice a day）',
    points: [
      'so / too / as / how のあとは「形容詞 ＋ a ＋ 名詞」の順：so nice a day、too heavy a box。',
      'such / quite / what は「a ＋ 形容詞 ＋ 名詞」の順：such a nice day、what a nice day。語順のちがいに注意。',
    ],
    examples: [
      { en: 'It was so nice a day that we had lunch outside.', ja: 'とてもよい天気の日だったので、外で昼ごはんを食べた。' },
      { en: 'This is too difficult a book for children.', ja: 'これは子どもにはむずかしすぎる本だ。' },
    ],
    questions: [
      { sentence: 'It was ___ nice a day that we went to the beach.', choices: ['so', 'such', 'very', 'quite'], answer: 0, why: '「形容詞 ＋ a ＋ 名詞」の前に置けるのは so。such なら such a nice day の順になる。' },
      { sentence: 'It was such ___ that we went out.', choices: ['a nice day', 'nice a day', 'a day nice', 'nice day'], answer: 0, why: 'such は「a ＋ 形容詞 ＋ 名詞」の順：such a nice day。' },
      { sentence: 'This is too heavy ___ for me to carry.', choices: ['a box', 'box a', 'the box', 'boxes'], answer: 0, why: 'too ＋ 形容詞 ＋ a ＋ 名詞：too heavy a box。the は使わない。' },
    ],
  },
  {
    id: 'make-oneself-understood',
    title: '使役 make oneself understood ／ heard（自分の言うことを通じさせる）',
    points: [
      'make oneself understood で「自分の言うことを（相手に）わかってもらう」。自分が「理解される」側なので過去分詞 understood。',
      'make oneself heard「自分の声を聞いてもらう」も同じ形。oneself は主語に合わせて myself / herself / yourself などにする。',
    ],
    examples: [
      { en: 'I managed to make myself understood in Spanish.', ja: 'なんとかスペイン語で話を通じさせることができた。' },
      { en: 'She shouted to make herself heard.', ja: '彼女は声を聞いてもらおうとさけんだ。' },
    ],
    questions: [
      { sentence: 'I could not make myself ___ in English.', choices: ['understood', 'understand', 'understanding', 'to understand'], answer: 0, why: '自分が「理解される」側なので、make oneself ＋ 過去分詞 understood。' },
      { sentence: 'She spoke loudly to make herself ___ over the noise.', choices: ['heard', 'hear', 'to hear', 'hearing'], answer: 0, why: '自分の声が「聞かれる」側なので過去分詞 heard。' },
      { sentence: 'Can you make ___ understood in French?', choices: ['yourself', 'you', 'your', 'yours'], answer: 0, why: '主語 you と同じ人なので再帰代名詞 yourself。' },
    ],
  },
  {
    id: 'there-seems',
    title: '不定詞 There seems to be ～（～があるようだ）',
    points: [
      'There seems to be ～ で「～があるようだ」。There is ～ に seem to がついた形。うしろの名詞が複数なら There seem to be ～。',
      '過去のことなら There seems to have been ～「～があったようだ」（完了不定詞）。',
    ],
    examples: [
      { en: 'There seems to be something wrong with my phone.', ja: '私の電話はどこかおかしいようだ。' },
      { en: 'There seems to have been an accident on the highway.', ja: '高速道路で事故があったようだ。' },
    ],
    questions: [
      { sentence: 'There seems ___ a problem with the printer.', choices: ['to be', 'being', 'be', 'been'], answer: 0, why: 'seem to ＋ 原形。There seems to be ～「～があるようだ」。' },
      { sentence: 'There ___ to be many people in the park.', choices: ['seem', 'seems', 'seeming', 'seemingly'], answer: 0, why: 'うしろの名詞 many people が複数なので seem（三人称単数の s はつけない）。' },
      { sentence: 'There seems to have ___ an accident.', choices: ['been', 'be', 'being', 'was'], answer: 0, why: '過去のことは完了不定詞 to have been。have のあとは過去分詞 been。' },
    ],
  },
  {
    id: 'it-occurs-to',
    title: '接続詞 that を使う It occurs to 人 that ～（ふと思いつく）',
    points: [
      'It occurs to 人 that ～ で「～ということが（人の）頭にうかぶ・ふと思いつく」。It は形式主語で、本当の主語は that 以下。',
      'It occurs to 人 to 原形「～しようと思いつく」の形もある。occur のあとは to 人（for や with ではない）。',
    ],
    examples: [
      { en: 'It occurred to me that I had not eaten all day.', ja: '一日中何も食べていなかったことに、ふと気づいた。' },
      { en: 'It never occurred to him to ask for help.', ja: '助けを求めようとは、彼は思いもしなかった。' },
    ],
    questions: [
      { sentence: 'It suddenly ___ to me that I had left my keys at home.', choices: ['occurred', 'thought', 'remembered', 'realized'], answer: 0, why: 'It occurs to 人 that ～「～が頭にうかぶ」。It を主語にして to 人 を続けられるのは occur。' },
      { sentence: 'It never occurred ___ him to ask for help.', choices: ['to', 'for', 'with', 'by'], answer: 0, why: 'occur to 人「人の頭にうかぶ」。前置詞は to。' },
      { sentence: 'A good idea occurred ___ me during the walk.', choices: ['to', 'at', 'on', 'by'], answer: 0, why: '考えが「人に」うかぶので occur to 人。' },
    ],
  },
  {
    id: 'not-because',
    title: '接続詞 not because A but because B（A だからではなく B だから）',
    points: [
      'not because A but because B で「A だからではなく B だから」。理由を打ち消して、本当の理由を示す。',
      'A・B が名詞なら not because of A but because of B。because のうしろは文、because of のうしろは名詞。',
    ],
    examples: [
      { en: 'I study English not because I have to but because I enjoy it.', ja: '英語を勉強するのは、しなければならないからではなく、楽しいからだ。' },
      { en: 'He won not because of luck but because of hard work.', ja: '彼が勝ったのは運のおかげではなく、努力のおかげだ。' },
    ],
    questions: [
      { sentence: 'I study English not because I have to, ___ because I enjoy it.', choices: ['but', 'so', 'than', 'or'], answer: 0, why: 'not because A but because B「A だからではなく B だから」。' },
      { sentence: 'She left early not ___ she was tired but because she had work.', choices: ['because', 'because of', 'due to', 'because to'], answer: 0, why: 'うしろが文（she was tired）なので接続詞 because。because of・due to のうしろは名詞。' },
      { sentence: 'He was praised not because of his talent but because ___ his effort.', choices: ['of', 'for', 'by', 'with'], answer: 0, why: 'his effort は名詞なので because of。前半の because of と形をそろえる。' },
    ],
  },
  {
    id: 'whereas',
    title: '対比の接続詞 whereas ／ while（～なのに対して）',
    points: [
      'whereas / while ＋ 文 で「～なのに対して・～である一方」。2つのことを並べてちがいを示す。',
      'うしろに文が続くので接続詞。名詞だけなら unlike ～「～とちがって」を使う。',
    ],
    examples: [
      { en: 'My sister loves cats, whereas I prefer dogs.', ja: '姉はねこが大好きなのに対して、私は犬のほうが好きだ。' },
      { en: 'While some students walk to school, others take the bus.', ja: '歩いて通学する生徒もいる一方、バスで通う生徒もいる。' },
    ],
    questions: [
      { sentence: 'My brother likes sports, ___ I prefer reading.', choices: ['whereas', 'despite', 'instead of', 'because of'], answer: 0, why: 'うしろが文（I prefer reading）なので接続詞 whereas。despite・instead of は前置詞の働きで文を続けられない。' },
      { sentence: 'Some people work best in the morning, ___ others work best at night.', choices: ['while', 'during', 'unlike', 'despite'], answer: 0, why: '対比の接続詞 while「～である一方」。during・unlike のうしろは名詞。' },
      { sentence: '___ the old phone was heavy, the new one is very light.', choices: ['Whereas', 'Unlike', 'In spite of', 'Despite'], answer: 0, why: 'うしろが文（the old phone was heavy）なので接続詞 Whereas。Unlike・In spite of のうしろは名詞。' },
    ],
  },
  {
    id: 'given-that',
    title: '接続詞のように使う given (that) ～（～を考えると）',
    points: [
      'given (that) ＋ 文 で「～ということを考えると」。given ＋ 名詞 なら「～を考えると」：given her age「彼女の年を考えると」。',
      'considering (that) ～ とほぼ同じ意味。given は過去分詞の形のまま使い、giving にはしない。',
    ],
    examples: [
      { en: 'Given that it was his first try, he did very well.', ja: 'はじめての挑戦だったことを考えると、彼はとてもよくやった。' },
      { en: 'Given the weather, the event was a success.', ja: '天気を考えると、そのもよおしは成功だった。' },
    ],
    questions: [
      { sentence: '___ that he is only ten, his English is excellent.', choices: ['Given', 'Giving', 'To give', 'Gave'], answer: 0, why: 'given that ～「～を考えると」。決まった形で、giving・to give にはしない。' },
      { sentence: 'Given ___ age, she did very well in the race.', choices: ['her', 'she', 'hers', 'herself'], answer: 0, why: 'given ＋ 名詞「～を考えると」。age の前は所有格 her。' },
      { sentence: 'Given ___ it was raining, many people came.', choices: ['that', 'what', 'which', 'who'], answer: 0, why: 'given that ＋ 文（it was raining）。うしろが欠けのない文なので that。' },
    ],
  },
  {
    id: 'tend-to',
    title: '不定詞 tend to ～ ／ be bound to ～（～しがちだ・きっと～する）',
    points: [
      'tend to ＋ 原形 で「～する傾向がある・～しがちだ」：People tend to forget names.',
      'be bound to ＋ 原形 で「きっと～する・～するにちがいない」（be sure to とにた意味）。どちらも to のあとは原形。',
    ],
    examples: [
      { en: 'Children tend to learn languages quickly.', ja: '子どもは言語をはやく身につける傾向がある。' },
      { en: 'If you keep trying, you are bound to succeed.', ja: 'がんばり続ければ、きっと成功する。' },
    ],
    questions: [
      { sentence: 'People tend ___ forget names quickly.', choices: ['to', 'for', 'on', 'in'], answer: 0, why: 'tend to ＋ 原形「～しがちだ」。' },
      { sentence: 'If you keep practicing, you are bound ___ improve.', choices: ['to', 'for', 'with', 'by'], answer: 0, why: 'be bound to ＋ 原形「きっと～する」。' },
      { sentence: 'Prices tend to ___ in winter.', choices: ['rise', 'rising', 'rose', 'risen'], answer: 0, why: 'tend to のあとは動詞の原形 rise。' },
    ],
  },
  {
    id: 'what-if',
    title: '疑問文 What if ～?（もし～したらどうなる？・～したらどう？）',
    points: [
      'What if ＋ 文? で「もし～したらどうなるだろう」（心配）や「～したらどう？」（提案）。What will happen if ～? を短くした言い方。',
      '未来のことでも if のあとは現在形：What if it rains tomorrow? 提案では過去形もよく使う：What if we took a taxi?',
    ],
    examples: [
      { en: 'What if we miss the last train?', ja: 'もし終電に乗りおくれたらどうしよう。' },
      { en: 'What if we had lunch in the park?', ja: '公園でお昼を食べるのはどう？' },
    ],
    questions: [
      { sentence: '___ if it rains tomorrow?', choices: ['What', 'How', 'Why', 'Who'], answer: 0, why: 'What if ～?「もし～したらどうなる？」の決まった形。' },
      { sentence: 'What if we ___ late for the train?', choices: ['are', 'be', 'being', 'to be'], answer: 0, why: 'if のあとは未来のことでも現在形 are。be・being は述語にならない。' },
      { sentence: 'What ___ we took a taxi instead?', choices: ['if', 'when', 'that', 'how'], answer: 0, why: '提案の What if ～?「～したらどう？」。' },
    ],
  },
  {
    id: 'need-not',
    title: '助動詞 need not ～ ／ needn\'t have done（～しなくてよい・しなくてよかったのに）',
    points: [
      '助動詞の need not（needn\'t）＋ 原形 で「～する必要はない」。don\'t need to ～ / don\'t have to ～ とほぼ同じ意味。助動詞なので to はつけない。',
      'needn\'t have ＋ 過去分詞 で「～する必要はなかったのに（実際はした）」。',
    ],
    examples: [
      { en: 'You need not worry about the test.', ja: 'テストのことは心配しなくていい。' },
      { en: 'You needn\'t have bought a ticket. It was free.', ja: 'チケットを買う必要はなかったのに。無料だったんだよ。' },
    ],
    questions: [
      { sentence: 'You need not ___ today.', choices: ['come', 'to come', 'coming', 'came'], answer: 0, why: '助動詞 need not のあとは動詞の原形 come。' },
      { sentence: 'You ___ have brought an umbrella. It didn\'t rain.', choices: ['needn\'t', 'didn\'t', 'don\'t', "mustn't"], answer: 0, why: 'needn\'t have ＋ 過去分詞「～する必要はなかったのに」。didn\'t・don\'t のあとに have brought は続かない。' },
      { sentence: 'You don\'t ___ to hurry. We have plenty of time.', choices: ['need', 'needs', 'needed', 'needing'], answer: 0, why: '一般動詞の need。don\'t のあとは原形 need（don\'t need to ～「～する必要はない」）。' },
    ],
  },
  {
    id: 'ought-to',
    title: '助動詞 ought to 原形 ／ ought not to 原形（～すべきだ・～すべきでない）',
    points: [
      'ought to ＋ 原形 で「～すべきだ・～したほうがよい」（should とほぼ同じ）。to まででひとまとまりの助動詞。',
      '否定は ought not to ＋ 原形「～すべきでない」。not は ought と to の間に入る。',
    ],
    examples: [
      { en: 'You ought to apologize to her.', ja: '彼女にあやまるべきだ。' },
      { en: 'We ought not to waste water.', ja: '水をむだにすべきではない。' },
    ],
    questions: [
      { sentence: 'You ought ___ see a doctor.', choices: ['to', 'for', 'that', 'of'], answer: 0, why: 'ought to ＋ 原形「～すべきだ」。' },
      { sentence: 'You ought ___ to eat so much sugar.', choices: ['not', 'no', 'none', 'nor'], answer: 0, why: '否定は ought not to。not が ought と to の間に入る。' },
      { sentence: 'He ought to ___ more careful.', choices: ['be', 'being', 'been', 'is'], answer: 0, why: 'ought to のあとは動詞の原形 be。' },
    ],
  },
  {
    id: 'former-latter',
    title: '代名詞 the former ／ the latter（前者・後者）',
    points: [
      '2つのものが出てきたあと、先に出たほうを the former「前者」、あとに出たほうを the latter「後者」とよぶ。',
      'the latter（後者）と later（あとで）、the former（前者）と formerly（以前は）はつづりがにているので注意。',
    ],
    examples: [
      { en: 'I have a cat and a dog. The former is white, and the latter is black.', ja: 'ねこと犬を飼っている。前者（ねこ）は白く、後者（犬）は黒い。' },
      { en: 'Between trains and buses, I prefer the former.', ja: '電車とバスなら、前者（電車）のほうが好きだ。' },
    ],
    questions: [
      { sentence: 'I have a cat and a dog. The ___ is white, and the latter is black.', choices: ['former', 'formal', 'before', 'formerly'], answer: 0, why: '先に出たほう（a cat）は the former「前者」。' },
      { sentence: 'Between soccer and tennis, I prefer the ___, because I like playing alone.', choices: ['latter', 'lately', 'late', 'latest'], answer: 0, why: 'あとに出たほう（tennis）は the latter「後者」。lately は副詞「最近」。' },
      { sentence: 'The ___ plan is cheaper, but the latter is faster.', choices: ['former', 'formerly', 'formally', 'form'], answer: 0, why: '名詞 plan の前なので形容詞の former「前者の」。formerly・formally は副詞。' },
    ],
  },
  {
    id: 'up-to',
    title: '不定詞 It is up to 人 to 原形（～するのは人しだいだ）',
    points: [
      'It is up to 人 to ＋ 原形 で「～するのは（人）しだいだ・（人）が決めることだ」。It は形式主語で、本当の主語は to 以下。',
      '主語を置いて ～ is up to 人「～は（人）しだいだ」とも言える：It\'s up to you.「あなたしだいだよ」。',
    ],
    examples: [
      { en: 'It is up to you to choose the restaurant.', ja: 'レストランをえらぶのは、あなたしだいだ。' },
      { en: 'Whether we win or lose is up to us.', ja: '勝つか負けるかは、私たちしだいだ。' },
    ],
    questions: [
      { sentence: 'It\'s ___ to you to decide.', choices: ['up', 'down', 'off', 'over'], answer: 0, why: 'be up to 人「人しだいだ」。' },
      { sentence: 'It is up to the team ___ the next leader.', choices: ['to choose', 'choosing', 'chose', 'chooses'], answer: 0, why: 'It is up to 人 to ＋ 原形。本当の主語は to choose 以下。' },
      { sentence: 'Whether we go or not is up ___ you.', choices: ['to', 'for', 'at', 'with'], answer: 0, why: 'be up to 人「人しだいだ」。前置詞は to。' },
    ],
  },
  {
    id: 'absolute-participle',
    title: '独立分詞構文（It being Sunday ／ weather permitting）',
    points: [
      '分詞構文の主語が主節の主語とちがうときは、分詞の前に主語を置く。これを独立分詞構文という：It being Sunday, the bank was closed.「日曜日だったので、銀行は閉まっていた」。',
      'There being ～「～があるので」、weather permitting「天気がよければ」のような決まった言い方もある。',
    ],
    examples: [
      { en: 'It being a holiday, the streets were quiet.', ja: '祝日だったので、通りは静かだった。' },
      { en: 'Weather permitting, we will go hiking tomorrow.', ja: '天気がよければ、明日ハイキングに行きます。' },
    ],
    questions: [
      { sentence: '___ Sunday, the bank was closed.', choices: ['It being', 'Being', 'It was', 'It is'], answer: 0, why: '主節の主語（the bank）とちがう主語 It を置いた独立分詞構文。It was では接続詞がなく2つの文がつながらない。' },
      { sentence: 'Weather ___, we will have a picnic tomorrow.', choices: ['permitting', 'permitted', 'permits', 'permit'], answer: 0, why: 'weather permitting「天気がよければ」の決まった形。permits では接続詞なしに文が2つ並んでしまう。' },
      { sentence: 'There ___ no bus, we had to walk.', choices: ['being', 'been', 'be', 'is'], answer: 0, why: 'There being ～「～があるので（ないので）」の独立分詞構文。' },
    ],
  },
  {
    id: 'so-much-as',
    title: '否定の表現 without so much as ～ ／ not even ～（～さえしない）',
    points: [
      'not so much as ＋ 原形「～さえしない」、without so much as ＋ -ing「～さえせずに」。not even ～ とほぼ同じ意味。',
      'not so much A as B「A というよりむしろ B」とは形がにているが意味がちがうので注意。',
    ],
    examples: [
      { en: 'He left without so much as saying goodbye.', ja: '彼はさようならさえ言わずに去った。' },
      { en: 'She did not even look at me.', ja: '彼女は私を見さえしなかった。' },
    ],
    questions: [
      { sentence: 'He left without so much as ___ goodbye.', choices: ['saying', 'say', 'to say', 'said'], answer: 0, why: 'without は前置詞なので、うしろは動名詞 saying。' },
      { sentence: 'She did not so much ___ look at me.', choices: ['as', 'than', 'so', 'like'], answer: 0, why: 'not so much as ＋ 原形「～さえしない」。' },
      { sentence: 'He didn\'t ___ say thank you.', choices: ['even', 'either', 'neither', 'also'], answer: 0, why: 'not even ～「～さえしない」。either は文の最後、neither は not といっしょに使わない。' },
    ],
  },
  {
    id: 'come-to-do',
    title: '不定詞 come to 原形 ／ get to 原形（～するようになる）',
    points: [
      'come to ＋ 原形 で「（だんだん）～するようになる」：I came to like jazz.「ジャズが好きになった」。like / know / understand / believe など、気持ちや考えを表す動詞によく使う。',
      'get to ＋ 原形 も「～するようになる・～する機会を得る」：We got to know each other.「知り合いになった」。become to ～ とは言わない。',
    ],
    examples: [
      { en: 'I came to understand my father better as I grew older.', ja: '年をとるにつれて、父のことがよりわかるようになった。' },
      { en: 'We got to know each other at summer camp.', ja: '私たちはサマーキャンプで知り合いになった。' },
    ],
    questions: [
      { sentence: 'I came ___ like natto after living in Japan.', choices: ['to', 'for', 'into', 'at'], answer: 0, why: 'come to ＋ 原形「～するようになる」。' },
      { sentence: 'We soon got to ___ each other well.', choices: ['know', 'knowing', 'knew', 'to know'], answer: 0, why: 'get to ＋ 原形「～するようになる」。to のあとは原形 know。' },
      { sentence: 'How did you come to ___ interested in history?', choices: ['be', 'being', 'been', 'to be'], answer: 0, why: 'come to ＋ 原形。be interested in ～「～に興味がある」の be。' },
    ],
  },
  {
    id: 'all-you-have-to',
    title: '不定詞 All you have to do is (to) 原形（～しさえすればよい）',
    points: [
      'All you have to do is (to) ＋ 原形 で「あなたは～しさえすればよい・～するだけでいい」。All は「～するすべてのこと」で、単数あつかい（is）。',
      'is のあとの to はよく省かれる：All you have to do is wait.「待ってさえいればいい」。',
    ],
    examples: [
      { en: 'All you have to do is press this button.', ja: 'このボタンを押しさえすればいい。' },
      { en: 'All I could do was watch.', ja: '私にできたのは、見ていることだけだった。' },
    ],
    questions: [
      { sentence: 'All you have to do is ___ this button.', choices: ['press', 'pressing', 'pressed', 'presses'], answer: 0, why: 'All you have to do is (to) ＋ 原形。to が省かれて原形 press。' },
      { sentence: 'All you have ___ do is wait.', choices: ['to', 'for', 'that', 'of'], answer: 0, why: 'have to do「しなければならないこと」。have のあとは to。' },
      { sentence: '___ you have to do is ask.', choices: ['All', 'Every', 'Each', 'Any'], answer: 0, why: 'All you have to do「あなたがしなければならないすべてのこと」。every・each のうしろには名詞が必要。' },
    ],
  },
  {
    id: 'no-point-ing',
    title: '動名詞 There is no point in -ing（～してもむだだ）',
    points: [
      'There is no point (in) -ing で「～しても意味がない・むだだ」。in は前置詞なので、うしろは動名詞。',
      'What is the point of -ing?「～して何になるのか」という言い方もある。It is no use -ing とにた意味。',
    ],
    examples: [
      { en: 'There is no point in arguing with him.', ja: '彼と言い争ってもむだだ。' },
      { en: 'What is the point of buying a new phone every year?', ja: '毎年新しい電話を買って何になるの？' },
    ],
    questions: [
      { sentence: 'There is no point ___ worrying about it.', choices: ['in', 'to', 'for', 'at'], answer: 0, why: 'There is no point in -ing「～してもむだだ」。' },
      { sentence: 'There is no point in ___ him. He never listens.', choices: ['asking', 'ask', 'to ask', 'asked'], answer: 0, why: '前置詞 in のあとは動名詞 asking。' },
      { sentence: 'What is the point of ___ so early?', choices: ['getting up', 'get up', 'to get up', 'got up'], answer: 0, why: '前置詞 of のあとは動名詞 getting up。' },
    ],
  },
  {
    id: 'regret-ing',
    title: '動名詞と不定詞 regret -ing ／ regret to 原形（後悔する・残念ながら～する）',
    points: [
      'regret -ing は「（過去に）～したことを後悔する」：I regret saying that.「あんなことを言って後悔している」。',
      'regret to ＋ 原形 は「残念ながら～する」（これからのこと）：We regret to inform you that ～「残念ながら～をお知らせします」。',
    ],
    examples: [
      { en: 'I regret not studying harder when I was young.', ja: '若いころにもっと勉強しなかったことを後悔している。' },
      { en: 'We regret to say that the concert has been canceled.', ja: '残念ながら、コンサートは中止になりました。' },
    ],
    questions: [
      { sentence: 'I regret ___ so much money last month.', choices: ['spending', 'spend', 'spent', 'to spend'], answer: 0, why: '先月（過去）にしたことを後悔するので regret -ing。' },
      { sentence: 'We regret ___ you that the flight has been canceled.', choices: ['to inform', 'inform', 'informed', 'to informing'], answer: 0, why: '「残念ながらお知らせします」は regret to ＋ 原形。' },
      { sentence: 'He regrets not ___ harder at school.', choices: ['studying', 'study', 'studied', 'to study'], answer: 0, why: '「～しなかったことを後悔する」は regret not -ing。not は動名詞の前に置く。' },
    ],
  },
  {
    id: 'how-come',
    title: '疑問文 How come ～?（どうして～なの？）',
    points: [
      'How come ＋ 主語 ＋ 動詞 ～? で「どうして～なの？」（話しことば）。Why とちがって、うしろはふつうの文の語順のまま（疑問文の語順にしない）。',
      'Why are you late? ＝ How come you are late? do / does / did も使わない：How come you didn\'t call me?',
    ],
    examples: [
      { en: 'How come you are still awake?', ja: 'どうしてまだ起きているの？' },
      { en: 'How come she didn\'t come to the party?', ja: 'どうして彼女はパーティーに来なかったの？' },
    ],
    questions: [
      { sentence: 'How come ___ so tired?', choices: ['you are', 'are you', 'do you', 'were you'], answer: 0, why: 'How come のうしろはふつうの語順（主語 ＋ 動詞）。' },
      { sentence: '___ come you didn\'t call me?', choices: ['How', 'Why', 'What', 'Which'], answer: 0, why: 'How come ～?「どうして～なの？」の決まった形。' },
      { sentence: 'How come she ___ the party?', choices: ['missed', 'did she miss', 'does she miss', 'missing'], answer: 0, why: 'How come のうしろは疑問文の語順にせず、did も使わない：she missed。' },
    ],
  },
  {
    id: 'let-alone',
    title: '否定の表現 let alone ～（まして～ない・～はなおさらだ）',
    points: [
      '否定の文 ＋ let alone ～ で「まして～はできない・～はなおさらだ」。前にもっとかんたんなこと、うしろにもっとむずかしいことを置く。',
      'let alone のうしろは、前の部分と同じ形（動詞の原形どうし・名詞どうし）にそろえる。',
    ],
    examples: [
      { en: 'I can\'t swim, let alone dive.', ja: '私は泳げない。まして飛びこみなんてできない。' },
      { en: 'He has never been abroad, let alone to Africa.', ja: '彼は外国に行ったことがない。アフリカはなおさらだ。' },
    ],
    questions: [
      { sentence: 'I can\'t ride a bicycle, ___ drive a car.', choices: ['let alone', 'in addition', 'so as', 'as well'], answer: 0, why: '否定の文 ＋ let alone ～「まして～はできない」。in addition・so as のうしろに原形は続かない。' },
      { sentence: 'He can hardly read English, let ___ write it.', choices: ['alone', 'only', 'along', 'alike'], answer: 0, why: 'let alone ～ の決まった形。' },
      { sentence: 'She didn\'t even say hello, let alone ___ me a gift.', choices: ['give', 'giving', 'gave', 'gives'], answer: 0, why: 'let alone のうしろは前の say と同じ原形 give にそろえる。' },
    ],
  },
  {
    id: 'however-therefore',
    title: '副詞 however ／ therefore（文と文をつなぐことば）',
    points: [
      'however「しかし」、therefore「それゆえ・だから」は副詞。接続詞ではないので、コンマだけで2つの文をつなげない。ピリオドやセミコロン（;）で区切ってから使う。',
      'although / because は接続詞で、うしろにすぐ文が続く（However, … とはちがい、Although のあとにコンマは置かない）。',
    ],
    examples: [
      { en: 'It was cold. However, we went swimming.', ja: '寒かった。しかし、私たちは泳ぎに行った。' },
      { en: 'The road was closed; therefore, we took another way.', ja: '道が通行止めだった。だから、別の道を通った。' },
    ],
    questions: [
      { sentence: 'It was raining. ___, we went out.', choices: ['However', 'Although', 'Despite', 'Even though'], answer: 0, why: '文頭で前の文を受けて「しかし」とつなぐ副詞 However。Although のあとは文、Despite のあとは名詞が続く。' },
      { sentence: 'He was sick. ___, he stayed home.', choices: ['Therefore', 'Because', 'So that', 'Since'], answer: 0, why: '「だから」と前の文を受ける副詞 Therefore。Because・So that は接続詞で、うしろにすぐ文が続く。' },
      { sentence: 'I like tea; ___, my sister prefers coffee.', choices: ['however', 'despite', 'unless', 'although'], answer: 0, why: 'セミコロンのあとで「しかし」とつなぐ副詞 however。despite のあとは名詞、unless のあとにコンマは置かない。' },
    ],
  },
  {
    id: 'not-a-single',
    title: '否定の表現 not a single ～（1つも～ない）',
    points: [
      'not a single ＋ 単数名詞 で「1つ（1人）も～ない」。not any ～ / no ～ を強めた言い方。',
      '主語に使うときは Not a single ～ ＋ 単数の動詞：Not a single student was late.',
    ],
    examples: [
      { en: 'There was not a single cloud in the sky.', ja: '空には雲ひとつなかった。' },
      { en: 'Not a single person came to help.', ja: 'だれ1人、助けに来なかった。' },
    ],
    questions: [
      { sentence: 'There was not a ___ cloud in the sky.', choices: ['single', 'alone', 'only', 'lonely'], answer: 0, why: 'not a single ～「1つも～ない」。a only・a alone という形はない。' },
      { sentence: 'Not a single student ___ late today.', choices: ['was', 'were', 'being', 'are'], answer: 0, why: 'a single student は単数なので was。' },
      { sentence: 'I didn\'t make ___ mistake.', choices: ['a single', 'single', 'singles', 'singly'], answer: 0, why: 'not a single ＋ 単数名詞。a が必要。' },
    ],
  },
  {
    id: 'if-any',
    title: '否定の表現 few, if any ／ seldom, if ever（あるとしても・あったとしても）',
    points: [
      'few (little), if any, ～ で「（～は）あるとしてもほとんどない」。if any のあとに名詞の部分が省かれている。',
      'seldom (rarely), if ever, ～ で「（～することは）あったとしてもめったにない」。名詞には any、動詞（回数）には ever を使う。',
    ],
    examples: [
      { en: 'There are few, if any, mistakes in her essay.', ja: '彼女の作文には、まちがいはあるとしてもほとんどない。' },
      { en: 'He seldom, if ever, watches TV.', ja: '彼はテレビを見ることは、あったとしてもめったにない。' },
    ],
    questions: [
      { sentence: 'There are few, if ___, mistakes in this report.', choices: ['any', 'ever', 'none', 'some'], answer: 0, why: '名詞（mistakes）について「あるとしても」は if any。' },
      { sentence: 'He seldom, if ___, eats breakfast.', choices: ['ever', 'any', 'never', 'not'], answer: 0, why: '動作の回数（seldom）について「あったとしても」は if ever。' },
      { sentence: 'There is little, if ___, hope of finding it.', choices: ['any', 'ever', 'much', 'so'], answer: 0, why: '名詞（hope）について little, if any「あるとしてもほとんどない」。' },
    ],
  },
  {
    id: 'not-that',
    title: '否定の表現 Not that ～（～というわけではないが）',
    points: [
      'Not that ～ で「～というわけではないが・べつに～ではないけれど」。It is not that ～ の It is が省かれた形で、前の文の誤解をさける。',
      'Not that I mind, but ～「べつにかまわないけど」のように、話しことばでよく使う。that のうしろはふつうの文。',
    ],
    examples: [
      { en: 'I rarely go to concerts. Not that I don\'t like music.', ja: 'コンサートにはめったに行かない。音楽がきらいというわけではないのだけれど。' },
      { en: 'Not that it matters, but where did you buy that hat?', ja: 'べつにどうでもいいんだけど、その帽子どこで買ったの？' },
    ],
    questions: [
      { sentence: 'I don\'t eat much meat. ___ that I dislike it.', choices: ['Not', 'No', 'Never', 'Nor'], answer: 0, why: 'Not that ～「～というわけではないが」の決まった形。' },
      { sentence: 'Not ___ I don\'t trust you, but I want to check.', choices: ['that', 'what', 'which', 'why'], answer: 0, why: 'Not that ＋ 文。うしろは欠けのない文なので that。' },
      { sentence: 'Not that it ___, but where did you buy it?', choices: ['matters', 'matter', 'mattering', 'are mattering'], answer: 0, why: 'that のうしろはふつうの文。主語 it は三人称単数なので matters。' },
    ],
  },
  {
    id: 'as-good-as',
    title: '比較 as good as ～（～も同然・ほとんど～）',
    points: [
      'as good as ＋ 形容詞・名詞・動詞 で「～も同然・ほとんど～」（＝ almost）：The car is as good as new.「その車は新品同様だ」。',
      '「～と同じくらいよい」の as good as とは形が同じなので、文の意味で見分ける。',
    ],
    examples: [
      { en: 'After the repair, my bike is as good as new.', ja: '修理のあと、私の自転車は新品同様だ。' },
      { en: 'The match is as good as over.', ja: '試合はもう終わったも同然だ。' },
    ],
    questions: [
      { sentence: 'The car is as good ___ new.', choices: ['as', 'than', 'so', 'to'], answer: 0, why: 'as good as ～「～も同然」。' },
      { sentence: 'The game is as ___ as over.', choices: ['good', 'well', 'better', 'best'], answer: 0, why: 'as good as over「終わったも同然」の決まった形。' },
      { sentence: 'He as good as ___ he would come.', choices: ['promised', 'promise', 'promising', 'promises'], answer: 0, why: 'as good as ＋ 動詞「～したも同然」。過去の文なので promised。' },
    ],
  },
  {
    id: 'what-little',
    title: '関係詞 what little ～ ／ what few ～（少ないながらすべての）',
    points: [
      'what little ＋ 数えられない名詞 / what few ＋ 数えられる名詞 で「少ないながらもすべての～」。関係形容詞の what を使った言い方。',
      'She gave me what little money she had.「彼女はなけなしのお金をすべて私にくれた」。',
    ],
    examples: [
      { en: 'He spent what little time he had on his family.', ja: '彼はわずかな時間をすべて家族のために使った。' },
      { en: 'She read what few books there were in the village.', ja: '彼女は村にあった少ない本をすべて読んだ。' },
    ],
    questions: [
      { sentence: 'She gave me ___ little money she had.', choices: ['what', 'which', 'who', 'that'], answer: 0, why: 'what little ＋ 名詞「少ないながらすべての～」。' },
      { sentence: 'He sold what ___ books he owned.', choices: ['few', 'little', 'much', 'many'], answer: 0, why: 'books は数えられる名詞の複数なので what few。' },
      { sentence: 'I did what little I ___ to help.', choices: ['could', 'might be', 'was', 'should to'], answer: 0, why: 'what little I could (do)「できるわずかなことをすべて」。' },
    ],
  },
  {
    id: 'reason-is-that',
    title: '接続詞 The reason ～ is that …（～の理由は…だ）',
    points: [
      'The reason (why) S V is that ＋ 文 で「S が V する理由は…だ」。is のあとは that ＋ 文。',
      'The reason for ＋ 名詞 is that …「～の理由は…だ」。理由を表す名詞のあとの関係副詞は why（how・what は使わない）。',
    ],
    examples: [
      { en: 'The reason I called you is that I need your help.', ja: '電話した理由は、あなたの助けが必要だからです。' },
      { en: 'The reason for the delay was that the road was closed.', ja: 'おくれた理由は、道が通行止めだったことだ。' },
    ],
    questions: [
      { sentence: 'The reason I was late is ___ the train stopped.', choices: ['that', 'because of', 'what', 'why'], answer: 0, why: 'The reason ～ is that ＋ 文。because of のうしろは名詞、what は欠けた部分のある文をとる。' },
      { sentence: 'The reason ___ she quit is unclear.', choices: ['why', 'what', 'how', 'which'], answer: 0, why: '理由を表す reason のあとの関係副詞は why。' },
      { sentence: 'The reason for the delay ___ that a truck broke down.', choices: ['was', 'were', 'being', 'are'], answer: 0, why: '主語は The reason（単数）なので was。' },
    ],
  },
  {
    id: 'some-others',
    title: '代名詞 some ～, others … ／ the others（～もいれば…もいる・残り全部）',
    points: [
      'Some ～, others … で「～する人（もの）もいれば、…する人（もの）もいる」。others は不特定の「ほかの人たち」。',
      '全体の数が決まっていて「残り全部」なら the others：Three are red, and the others are blue.',
    ],
    examples: [
      { en: 'Some people like summer, and others like winter.', ja: '夏が好きな人もいれば、冬が好きな人もいる。' },
      { en: 'Two of the five boys stayed, and the others went home.', ja: '5人の男の子のうち2人は残り、残りの子は家に帰った。' },
    ],
    questions: [
      { sentence: 'Some students like math, and ___ like English.', choices: ['others', 'the other', 'another', 'other'], answer: 0, why: 'Some ～, others …「～もいれば…もいる」。like（複数の動詞）に合うのは others。' },
      { sentence: 'There are ten pens. Three are red, and ___ are blue.', choices: ['the others', 'the other', 'another', 'others'], answer: 0, why: '全部で10本のうち「残り全部（7本）」なので複数の the others。' },
      { sentence: 'Some people walk to work; ___ take the bus.', choices: ['others', 'other', 'the other', 'another'], answer: 0, why: '「ほかの人たち」は代名詞 others。other だけでは名詞の代わりにならない。' },
    ],
  },
  {
    id: 'as-to',
    title: '前置詞 as to ／ as for（～について・～はどうかというと）',
    points: [
      'as to ～ は「～について・～に関して」（＝ about）。うしろに whether ～ や疑問詞のかたまりがよく来る：as to whether he will come。',
      'as for ～ は文の頭で「～はどうかというと・～に関しては」と話題を示す：As for me, I prefer tea.',
    ],
    examples: [
      { en: 'There was a long discussion as to where the festival should be held.', ja: 'お祭りをどこで開くべきかについて、長い話し合いがあった。' },
      { en: 'As for the price, we will tell you later.', ja: '値段については、あとでお知らせします。' },
    ],
    questions: [
      { sentence: 'I have no idea as ___ where he went.', choices: ['to', 'for', 'of', 'by'], answer: 0, why: 'as to ～「～について」。うしろに疑問詞のかたまり where he went。' },
      { sentence: '___ for me, I prefer tea.', choices: ['As', 'So', 'Such', 'Even'], answer: 0, why: 'As for ～「～はどうかというと」。' },
      { sentence: 'There is some doubt as to ___ he will come.', choices: ['whether', 'what', 'which', 'who'], answer: 0, why: 'うしろが欠けのない文（he will come）なので whether「～かどうか」。' },
    ],
  },
  {
    id: 'it-costs',
    title: '不定詞 It costs 人 金額 to ～（～するのに人に…かかる）',
    points: [
      'It costs ＋ 人 ＋ 金額 ＋ to ＋ 原形 で「～するのに（人に）…のお金がかかる」。cost は過去形・過去分詞も cost。',
      '時間なら It takes ＋ 人 ＋ 時間 ＋ to ～。お金は cost、時間は take と覚える。',
    ],
    examples: [
      { en: 'It cost me 5,000 yen to repair my phone.', ja: '電話を直すのに5,000円かかった。' },
      { en: 'How much does it cost to send this package?', ja: 'この荷物を送るのにいくらかかりますか。' },
    ],
    questions: [
      { sentence: 'It cost me 3,000 yen ___ fix my bike.', choices: ['to', 'for', 'that', 'in'], answer: 0, why: 'It costs 人 金額 to ＋ 原形。' },
      { sentence: 'How much did it ___ you to fly to Okinawa?', choices: ['cost', 'costs', 'costing', 'to cost'], answer: 0, why: 'did のあとは原形 cost。' },
      { sentence: 'It ___ him a lot of money to build the house.', choices: ['cost', 'spent', 'used', 'paid'], answer: 0, why: 'It を主語にして「お金がかかる」は cost。spend・use は人を主語にする。' },
    ],
  },
  {
    id: 'make-use-of',
    title: '動詞の使い方 make use of ／ take advantage of ／ make the most of（～を利用する・最大限に生かす）',
    points: [
      'make use of ～「～を利用する」（make good use of ～「～をうまく使う」）、take advantage of ～「～を（うまく）利用する」。',
      'make the most of ～ は「～を最大限に生かす」。use・advantage・most は名詞なので、前に good などの形容詞や the がつく。',
    ],
    examples: [
      { en: 'Make good use of your dictionary.', ja: '辞書をうまく使いなさい。' },
      { en: 'We made the most of our short vacation.', ja: '私たちは短い休みを最大限に楽しんだ。' },
    ],
    questions: [
      { sentence: 'You should make good ___ of your free time.', choices: ['use', 'using', 'used', 'uses'], answer: 0, why: 'make good use of ～「～をうまく使う」。good のあとは名詞 use。' },
      { sentence: 'Let\'s take ___ of the nice weather and go hiking.', choices: ['advantage', 'advance', 'adventure', 'advent'], answer: 0, why: 'take advantage of ～「～を利用する」。' },
      { sentence: 'She made the ___ of her stay in London.', choices: ['most', 'more', 'much', 'many'], answer: 0, why: 'make the most of ～「～を最大限に生かす」。' },
    ],
  },
  {
    id: 'capable-of',
    title: '形容詞 be capable of -ing ／ be able to 原形（～できる）',
    points: [
      'be capable of ＋ 名詞・-ing で「～する能力がある・～できる」。of は前置詞なので、うしろは動名詞。',
      'be able to ＋ 原形 もほぼ同じ意味。able のあとは to、capable のあとは of と組み合わせを覚える。',
    ],
    examples: [
      { en: 'This robot is capable of climbing stairs.', ja: 'このロボットは階段をのぼることができる。' },
      { en: 'She is able to swim two kilometers.', ja: '彼女は2キロ泳ぐことができる。' },
    ],
    questions: [
      { sentence: 'This car is capable of ___ 200 km per hour.', choices: ['going', 'go', 'to go', 'to going'], answer: 0, why: 'of は前置詞なので、うしろは動名詞 going。' },
      { sentence: 'She is ___ of solving the problem.', choices: ['capable', 'able', 'possible', 'skillful'], answer: 0, why: '人を主語にして of -ing を続けられるのは capable。able は to ＋ 原形と組む。' },
      { sentence: 'He is able ___ speak three languages.', choices: ['to', 'of', 'for', 'at'], answer: 0, why: 'be able to ＋ 原形「～できる」。' },
    ],
  },
  {
    id: 'nothing-like',
    title: '比較 There is nothing like ～ ／ Nothing is more ～ than …（～ほどよいものはない）',
    points: [
      'There is nothing like ～ で「～ほどよいものはない」。like は前置詞「～のような」。',
      'Nothing is ＋ 比較級 ＋ than … で「…ほど～なものはない」（最上級と同じ意味）：Nothing is more important than health.',
    ],
    examples: [
      { en: 'There is nothing like a cold drink on a hot day.', ja: '暑い日の冷たい飲み物ほどよいものはない。' },
      { en: 'Nothing is more precious than time.', ja: '時間ほど貴重なものはない。' },
    ],
    questions: [
      { sentence: 'There is nothing ___ a hot bath after a long day.', choices: ['like', 'as', 'than', 'so'], answer: 0, why: 'There is nothing like ～「～ほどよいものはない」。' },
      { sentence: 'Nothing is ___ valuable than true friends.', choices: ['more', 'most', 'much', 'very'], answer: 0, why: 'Nothing is ＋ 比較級 ＋ than …。than があるので比較級 more。' },
      { sentence: 'There is nothing I like better ___ reading.', choices: ['than', 'as', 'to', 'more'], answer: 0, why: '比較級 better のあとは than。' },
    ],
  },
  {
    id: 'for-all',
    title: '前置詞 for all ／ with all（～にもかかわらず）',
    points: [
      'for all ＋ 名詞 / with all ＋ 名詞 で「～があるにもかかわらず」（＝ despite）：For all his money, he is not happy.',
      'うしろは名詞（所有格 ＋ 名詞が多い）。文を続けるなら although を使う。',
    ],
    examples: [
      { en: 'For all her talent, she never became famous.', ja: '才能があるにもかかわらず、彼女は有名にならなかった。' },
      { en: 'With all his faults, I still like him.', ja: '欠点はあるけれど、それでも私は彼が好きだ。' },
    ],
    questions: [
      { sentence: '___ all his money, he is not happy.', choices: ['For', 'By', 'In', 'On'], answer: 0, why: 'For all ～「～にもかかわらず」。' },
      { sentence: 'For all ___ efforts, she failed the test.', choices: ['her', 'she', 'hers', 'herself'], answer: 0, why: '名詞 efforts の前は所有格 her。' },
      { sentence: 'With all his faults, I still like ___.', choices: ['him', 'he', 'his', 'himself'], answer: 0, why: 'like の目的語なので目的格 him。' },
    ],
  },
  {
    id: 'not-long-before',
    title: '接続詞 It was not long before ～（まもなく～した）',
    points: [
      'It was not long before ＋ 文 で「～するまでに長くはかからなかった・まもなく～した」。',
      '未来なら It will not be long before ＋ 文（現在形）「まもなく～するだろう」。before long「まもなく」という言い方もある。',
    ],
    examples: [
      { en: 'It was not long before the two boys became friends.', ja: 'まもなく、2人の男の子は友だちになった。' },
      { en: 'It will not be long before summer vacation starts.', ja: 'もうすぐ夏休みが始まる。' },
    ],
    questions: [
      { sentence: 'It was not long ___ he got used to the new school.', choices: ['before', 'during', 'while', 'by'], answer: 0, why: 'It was not long before ～「まもなく～した」。during のうしろは名詞、while では意味がつながらない。' },
      { sentence: 'It will not be long before spring ___.', choices: ['comes', 'will come', 'came', 'had come'], answer: 0, why: '時を表す before のかたまりの中は、未来のことでも現在形 comes。' },
      { sentence: 'He will be back ___ long.', choices: ['before', 'after', 'for', 'since'], answer: 0, why: 'before long「まもなく」の決まった形。' },
    ],
  },
  {
    id: 'superior-to',
    title: '比較 superior to ／ inferior to ／ senior to（～より上・下）',
    points: [
      'superior to ～「～よりすぐれている」、inferior to ～「～よりおとっている」、senior to ～「～より年上（先輩）」、junior to ～「～より年下（後輩）」。',
      'ラテン語から来た比較の形容詞なので、than ではなく to を使う。more もつけない。',
    ],
    examples: [
      { en: 'This new camera is superior to the old one.', ja: 'この新しいカメラは、古いものよりすぐれている。' },
      { en: 'She is three years senior to me.', ja: '彼女は私より3歳年上だ。' },
    ],
    questions: [
      { sentence: 'This model is superior ___ the old one.', choices: ['to', 'than', 'from', 'for'], answer: 0, why: 'superior to ～「～よりすぐれている」。than は使わない。' },
      { sentence: 'She is two years senior ___ me.', choices: ['to', 'than', 'of', 'for'], answer: 0, why: 'senior to ～「～より年上」。' },
      { sentence: 'This product is ___ to that one in quality.', choices: ['inferior', 'worse', 'lower', 'less'], answer: 0, why: 'to と組んで「～よりおとる」のは inferior。worse・lower は than と組む。' },
    ],
  },
  {
    id: 'afford-to',
    title: '不定詞 can afford to 原形（～する余裕がある）',
    points: [
      'can afford to ＋ 原形 で「～する（お金・時間の）余裕がある」。否定 can\'t afford to ～「～する余裕がない」でよく使う。',
      'can afford ＋ 名詞 も使える：I can\'t afford a new car.「新しい車を買う余裕がない」。',
    ],
    examples: [
      { en: 'We can\'t afford to eat out every day.', ja: '毎日外食する余裕はない。' },
      { en: 'Can you afford a trip to Hawaii?', ja: 'ハワイ旅行に行く余裕はある？' },
    ],
    questions: [
      { sentence: 'I can\'t afford ___ a new car.', choices: ['to buy', 'buying', 'buy', 'to buying'], answer: 0, why: 'can afford to ＋ 原形「～する余裕がある」。' },
      { sentence: 'We cannot ___ to waste time.', choices: ['afford', 'allow', 'let', 'have'], answer: 0, why: 'can\'t afford to ～「～する余裕がない」。allow・let は「人に～させる」で、人の目的語が必要。' },
      { sentence: 'Can you afford ___ new phone?', choices: ['a', 'to', 'for', 'an'], answer: 0, why: 'afford ＋ 名詞「～を買う余裕がある」。phone の前に a。' },
    ],
  },
  {
    id: 'ever-since',
    title: '接続詞 ever since ～（～以来ずっと）',
    points: [
      'ever since ＋ 文 / 名詞 で「～以来ずっと」。since を強めた言い方で、主節はふつう現在完了形。',
      '文の最後に ever since だけを置くと「それ以来ずっと」の意味になる。',
    ],
    examples: [
      { en: 'I have loved music ever since I was a child.', ja: '子どものころからずっと音楽が大好きだ。' },
      { en: 'She moved to Kyoto, and she has lived there ever since.', ja: '彼女は京都にひっこして、それ以来ずっとそこに住んでいる。' },
    ],
    questions: [
      { sentence: 'I have lived here ever ___ I was a child.', choices: ['since', 'for', 'from', 'ago'], answer: 0, why: 'ever since ＋ 文「～以来ずっと」。' },
      { sentence: 'She has been happy ever since she ___ the job.', choices: ['got', 'gets', 'getting', 'has got'], answer: 0, why: 'since のうしろは過去の出来事なので過去形 got。' },
      { sentence: 'He moved to Osaka in 2020 and has lived there ever ___.', choices: ['since', 'before', 'ago', 'after'], answer: 0, why: '文の最後の ever since「それ以来ずっと」。' },
    ],
  },
  {
    id: 'make-it-a-rule',
    title: '形式目的語 make it a rule to 原形（～することにしている）',
    points: [
      'make it a rule to ＋ 原形 で「～することにしている・～するのを習慣にしている」。it は形式目的語で、本当の目的語は to 以下。',
      'make it a point to ～ もほぼ同じ意味。最近は always ～ / make a habit of -ing などもよく使う。',
    ],
    examples: [
      { en: 'I make it a rule to keep a diary every night.', ja: '私は毎晩日記をつけることにしている。' },
      { en: 'She makes it a rule not to eat after nine.', ja: '彼女は9時以降は食べないことにしている。' },
    ],
    questions: [
      { sentence: 'I make ___ a rule to walk for 30 minutes every day.', choices: ['it', 'that', 'this', 'what'], answer: 0, why: '形式目的語 it。本当の目的語は to walk 以下。' },
      { sentence: 'She makes it a rule ___ up early.', choices: ['to get', 'getting', 'get', 'to getting'], answer: 0, why: 'make it a rule to ＋ 原形。' },
      { sentence: 'He makes it a ___ to read the news every morning.', choices: ['rule', 'role', 'rail', 'roll'], answer: 0, why: 'make it a rule to ～「～することにしている」。role（役割）とつづりがにているので注意。' },
    ],
  },
  {
    id: 'take-for-granted',
    title: '形式目的語 take it for granted that ～（～を当然と思う）',
    points: [
      'take it for granted that ～ で「～を当然のことと思う」。it は形式目的語で、本当の目的語は that 以下。',
      'take ～ for granted は「～を当たり前と思って、ありがたみを感じない」：Don\'t take your health for granted.',
    ],
    examples: [
      { en: 'We take it for granted that the trains will run on time.', ja: '私たちは電車が時間どおりに走るのを当然と思っている。' },
      { en: 'Don\'t take your friends for granted.', ja: '友だちがいるのを当たり前だと思ってはいけない。' },
    ],
    questions: [
      { sentence: 'We take it for ___ that water is safe to drink.', choices: ['granted', 'grant', 'granting', 'grants'], answer: 0, why: 'take it for granted that ～ の決まった形。granted は過去分詞。' },
      { sentence: 'Don\'t take your parents\' help for ___.', choices: ['granted', 'given', 'sure', 'gift'], answer: 0, why: 'take ～ for granted「～を当たり前と思う」。' },
      { sentence: 'I took ___ for granted that he would come.', choices: ['it', 'that', 'this', 'what'], answer: 0, why: '形式目的語 it。本当の目的語は that he would come。' },
    ],
  },
  {
    id: 'whether-to',
    title: '不定詞 whether to 原形（～すべきかどうか）',
    points: [
      'whether to ＋ 原形 で「～すべきかどうか・～するかどうか」。decide / wonder / discuss などのあとでよく使う。',
      'if to ～ とは言わない（to 不定詞と組めるのは whether）。whether to A or B「A すべきか B すべきか」の形もある。',
    ],
    examples: [
      { en: 'I can\'t decide whether to stay or leave.', ja: '残るべきか帰るべきか決められない。' },
      { en: 'They discussed whether to cancel the game.', ja: '彼らは試合を中止するかどうかを話し合った。' },
    ],
    questions: [
      { sentence: 'I can\'t decide ___ to go or not.', choices: ['whether', 'if', 'that', 'what'], answer: 0, why: 'to 不定詞と組めるのは whether。if to ～ とは言わない。' },
      { sentence: 'She is wondering whether ___ the job.', choices: ['to take', 'taking', 'take', 'to taking'], answer: 0, why: 'whether to ＋ 原形「～すべきかどうか」。' },
      { sentence: 'We discussed whether ___ go by bus or by train.', choices: ['to', 'for', 'that', 'of'], answer: 0, why: 'whether to A or B「A すべきか B すべきか」。' },
    ],
  },
  {
    id: 'what-for',
    title: '疑問文 What ～ for?（何のために～？）',
    points: [
      'What ～ for? で「何のために～？」（目的をたずねる）。for が文の最後に残るのがポイント：What did you come here for?',
      '短く What for?「何のために？」とも言う。Why ～? とほぼ同じ意味だが、Why ～ for? とはしない。',
    ],
    examples: [
      { en: 'What are you saving money for?', ja: '何のためにお金をためているの？' },
      { en: '"I need a hammer." "What for?"', ja: '「かなづちがいるんだ」「何に使うの？」' },
    ],
    questions: [
      { sentence: 'What did you come here ___?', choices: ['for', 'of', 'at', 'to'], answer: 0, why: 'What ～ for?「何のために～？」。for が文の最後に残る。' },
      { sentence: '"I need some money." "What ___?"', choices: ['for', 'to', 'by', 'of'], answer: 0, why: 'What for?「何のために？」の決まった形。' },
      { sentence: '___ did you buy this for?', choices: ['What', 'Why', 'How', 'When'], answer: 0, why: '文の最後に for があるので What ～ for?。Why ～ for? とはしない。' },
    ],
  },
  {
    id: 'need-ing',
    title: '動名詞 need -ing ／ need to be 過去分詞（～される必要がある）',
    points: [
      '物が主語で need -ing のとき「～される必要がある」という受け身の意味になる：My bike needs repairing.「自転車は修理が必要だ」。',
      'need to be ＋ 過去分詞 も同じ意味：My bike needs to be repaired.',
    ],
    examples: [
      { en: 'The garden needs watering.', ja: '庭に水をやる必要がある。' },
      { en: 'These shoes need to be cleaned.', ja: 'このくつはみがく必要がある。' },
    ],
    questions: [
      { sentence: 'My bike needs ___.', choices: ['repairing', 'to repair', 'repaired', 'repair'], answer: 0, why: '物が主語の need -ing は「～される必要がある」。to repair だと自転車が何かを直すことになる。' },
      { sentence: 'The windows need ___ washed.', choices: ['to be', 'being', 'be', 'been'], answer: 0, why: 'need to be ＋ 過去分詞「～される必要がある」。' },
      { sentence: 'This shirt needs ___. It has a stain.', choices: ['washing', 'to wash', 'wash', 'to washing'], answer: 0, why: '物が主語の need -ing「～される必要がある」。' },
    ],
  },
  {
    id: 'otherwise',
    title: '仮定法 otherwise（そうでなければ・さもないと）',
    points: [
      'otherwise は「そうでなければ」。前の文の内容を打ち消して仮定するので、過去のことなら would have ＋ 過去分詞（仮定法過去完了）がよく続く。',
      '命令文 ＋ or ～「～しなさい、さもないと…」も同じ考え方。',
    ],
    examples: [
      { en: 'I left early; otherwise, I would have missed the train.', ja: '早く出た。そうでなければ電車に乗りおくれていただろう。' },
      { en: 'Hurry up, or you will be late.', ja: '急ぎなさい、さもないとおくれるよ。' },
    ],
    questions: [
      { sentence: 'I took a taxi; ___, I would have been late.', choices: ['otherwise', 'unless', 'without', 'if'], answer: 0, why: '「そうでなければ」は otherwise。unless のうしろには文、without のうしろには名詞が必要。' },
      { sentence: 'Hurry up, ___ you will miss the bus.', choices: ['or', 'unless', 'despite', 'and'], answer: 0, why: '命令文 ＋ or ～「さもないと～」。unless のあとに will は使わず、despite のうしろは名詞。' },
      { sentence: 'He studied hard; otherwise he ___ the test.', choices: ['would have failed', 'failing', 'fail', 'had failed'], answer: 0, why: '過去の事実（勉強した）の反対を仮定するので would have ＋ 過去分詞。' },
    ],
  },
  {
    id: 'eager-to',
    title: '不定詞 be eager to ／ be willing to ／ be anxious to（～したがる・進んで～する）',
    points: [
      'be eager to ＋ 原形「しきりに～したがる」、be willing to ＋ 原形「進んで（いやがらずに）～する」、be anxious to ＋ 原形「～したいと強く願う」。',
      'be anxious about ～ は「～を心配している」。to ＋ 原形か about ＋ 名詞かで意味が変わる。',
    ],
    examples: [
      { en: 'The children were eager to open their presents.', ja: '子どもたちはプレゼントを早く開けたがっていた。' },
      { en: 'He is always willing to help others.', ja: '彼はいつも進んで人を助ける。' },
    ],
    questions: [
      { sentence: 'She is eager ___ study abroad.', choices: ['to', 'of', 'at', 'for'], answer: 0, why: 'be eager to ＋ 原形「しきりに～したがる」。' },
      { sentence: 'He is willing ___ help us.', choices: ['to', 'for', 'with', 'of'], answer: 0, why: 'be willing to ＋ 原形「進んで～する」。' },
      { sentence: 'They were anxious ___ the results.', choices: ['about', 'to', 'with', 'at'], answer: 0, why: 'be anxious about ＋ 名詞「～を心配している」。' },
    ],
  },
  {
    id: 'what-is-worse',
    title: '関係詞 what is worse ／ to make matters worse（さらに悪いことに）',
    points: [
      'what is worse で「さらに悪いことに」。関係代名詞 what を使った決まった言い方で、過去の話なら what was worse。',
      'to make matters worse も同じ意味。どちらも文の前に置いて、悪いことを付け足す（what is more「そのうえ」の悪い版）。',
    ],
    examples: [
      { en: 'I missed the bus, and what was worse, it started to rain.', ja: 'バスに乗りおくれ、さらに悪いことに雨がふり出した。' },
      { en: 'To make matters worse, my phone battery died.', ja: 'さらに悪いことに、電話の電池が切れた。' },
    ],
    questions: [
      { sentence: 'It was raining, and what was ___, I had no umbrella.', choices: ['worse', 'badly', 'worsen', 'worst'], answer: 0, why: 'what is (was) worse「さらに悪いことに」。bad の比較級 worse。' },
      { sentence: 'To make matters ___, the bus broke down.', choices: ['worse', 'badly', 'worsen', 'worst'], answer: 0, why: 'to make matters worse「さらに悪いことに」。make O C の C に形容詞の比較級 worse。' },
      { sentence: 'I lost my wallet. What is ___, my phone was in it.', choices: ['worse', 'badly', 'more bad', 'worst'], answer: 0, why: 'What is worse の決まった形。bad の比較級は worse（more bad とは言わない）。' },
    ],
  },
  {
    id: 'conj-ing',
    title: '分詞構文 while -ing ／ when -ing（接続詞を残した分詞構文）',
    points: [
      '意味をはっきりさせるため、分詞構文の前に接続詞を残すことがある：while crossing the street「通りをわたっている間に」＝ while you are crossing。',
      '主節と主語が同じで、be 動詞が省かれた形。when -ing「～するときに」、before / after -ing もよく使う。',
    ],
    examples: [
      { en: 'Be careful while walking on the ice.', ja: '氷の上を歩くときは気をつけて。' },
      { en: 'When reading English, try to guess the meaning of new words.', ja: '英語を読むときは、知らない単語の意味を推測してみよう。' },
    ],
    questions: [
      { sentence: 'Be careful while ___ the street.', choices: ['crossing', 'cross', 'crossed', 'to cross'], answer: 0, why: 'while -ing「～している間に」。主語（you）と be 動詞が省かれている。' },
      { sentence: 'When ___ a letter, write clearly.', choices: ['writing', 'write', 'wrote', 'to write'], answer: 0, why: 'when -ing「～するときに」。' },
      { sentence: 'I met Ken while I ___ for the bus.', choices: ['was waiting', 'am waiting', 'wait', 'have waited'], answer: 0, why: '過去のある時に進行中だったことは過去進行形 was waiting。' },
    ],
  },
  {
    id: 'if-possible',
    title: '接続詞 if possible ／ if necessary（できれば・必要なら）',
    points: [
      'if possible「できれば・可能なら」、if necessary「必要なら」は if it is possible / necessary の it is が省かれた形。',
      'if のうしろは形容詞 possible / necessary（副詞 possibly / necessarily ではない）。',
    ],
    examples: [
      { en: 'Please answer by Friday, if possible.', ja: 'できれば金曜日までに返事をください。' },
      { en: 'I can stay late if necessary.', ja: '必要なら遅くまで残れます。' },
    ],
    questions: [
      { sentence: 'Please call me back today, if ___.', choices: ['possible', 'possibly', 'possibility', 'possibilities'], answer: 0, why: 'if (it is) possible「できれば」。be のあとなので形容詞 possible。' },
      { sentence: 'I will help you if ___.', choices: ['necessary', 'necessarily', 'need', 'needs'], answer: 0, why: 'if (it is) necessary「必要なら」。' },
      { sentence: 'Bring a dictionary to class if ___.', choices: ['possible', 'possibly', 'possibility', 'possibles'], answer: 0, why: 'if possible「できれば」の決まった形。' },
    ],
  },
  {
    id: 'hope-wish-subj',
    title: '仮定法 hope と wish のちがい（実現しそうか・しそうにないか）',
    points: [
      'hope は「（実現しそうなことを）望む」。うしろはふつうの時制：I hope it will be sunny tomorrow.',
      'wish は「（事実とちがう・実現しそうにないことを）願う」。うしろは仮定法（過去形・過去完了形）：I wish I had a car.',
    ],
    examples: [
      { en: 'I hope you get well soon.', ja: 'はやくよくなるといいですね。' },
      { en: 'I wish I could fly like a bird.', ja: '鳥のように飛べたらいいのに。' },
    ],
    questions: [
      { sentence: 'I ___ it will be sunny tomorrow.', choices: ['hope', 'wish', 'want', 'wonder'], answer: 0, why: '実現しそうな未来のことを望むのは hope。wish のうしろは仮定法、want のうしろに that 節は来ない。' },
      { sentence: 'I wish I ___ a car. I have to walk everywhere.', choices: ['had', 'have', 'will have', 'having'], answer: 0, why: '今の事実（車がない）とちがうことを願うので、wish のうしろは過去形 had。' },
      { sentence: 'I hope you ___ a nice trip.', choices: ['have', 'would have', 'having', 'to have'], answer: 0, why: 'hope のうしろはふつうの時制。これからの旅なので現在形 have（未来の意味）。' },
    ],
  },
  {
    id: 'insist-on',
    title: '動名詞 insist on -ing（～すると言いはる）',
    points: [
      'insist on -ing で「～すると言いはる・どうしても～すると言う」。on は前置詞なので、うしろは動名詞。',
      'insist on 人の -ing / 所有格 -ing なら「（人が）～するよう強く求める」：They insisted on my staying.',
    ],
    examples: [
      { en: 'My grandfather insisted on walking to the station.', ja: '祖父は駅まで歩くと言いはった。' },
      { en: 'She insisted on paying for the meal.', ja: '彼女は食事代をはらうと言ってゆずらなかった。' },
    ],
    questions: [
      { sentence: 'He insisted on ___ for dinner.', choices: ['paying', 'pay', 'to pay', 'paid'], answer: 0, why: '前置詞 on のあとは動名詞 paying。' },
      { sentence: 'She insisted ___ going alone.', choices: ['on', 'in', 'to', 'at'], answer: 0, why: 'insist on -ing「～すると言いはる」。' },
      { sentence: 'They insisted on my ___ with them.', choices: ['staying', 'stay', 'to stay', 'stayed'], answer: 0, why: '所有格 my は動名詞の意味上の主語。on のあとは動名詞 staying。' },
    ],
  },
  {
    id: 'known-for-as',
    title: '受け身 be known for ／ be known as（～で有名だ・～として知られる）',
    points: [
      'be known for ＋ 理由・特徴「～で有名だ」：Kyoto is known for its temples.',
      'be known as ＋ 呼び名・立場「～として知られている」：He is known as a great singer. be known to ＋ 人「～に知られている」とあわせて前置詞で使い分ける。',
    ],
    examples: [
      { en: 'This town is known for its hot springs.', ja: 'この町は温泉で有名だ。' },
      { en: 'Edison is known as a great inventor.', ja: 'エジソンは偉大な発明家として知られている。' },
    ],
    questions: [
      { sentence: 'Kyoto is known ___ its old temples.', choices: ['for', 'as', 'to', 'with'], answer: 0, why: '有名な理由・特徴（古い寺）は be known for。' },
      { sentence: 'He is known ___ the father of modern science.', choices: ['as', 'for', 'by', 'to'], answer: 0, why: '呼び名・立場（近代科学の父）は be known as。' },
      { sentence: 'This town is known ___ a center of the silk trade.', choices: ['as', 'for', 'with', 'to'], answer: 0, why: '「～として」知られているので be known as。' },
    ],
  },
  {
    id: 'familiar-with',
    title: '形容詞 be familiar with ／ be familiar to（～をよく知っている・～によく知られている）',
    points: [
      '人 ＋ be familiar with ＋ 物事「（人が）～をよく知っている」：I am familiar with this area.',
      '物事 ＋ be familiar to ＋ 人「（物事が）～によく知られている」：This song is familiar to everyone. 主語が人か物事かで前置詞が変わる。',
    ],
    examples: [
      { en: 'Are you familiar with this app?', ja: 'このアプリにくわしいですか。' },
      { en: 'Her face is familiar to me.', ja: '彼女の顔には見覚えがある。' },
    ],
    questions: [
      { sentence: 'I am familiar ___ this area.', choices: ['with', 'to', 'for', 'of'], answer: 0, why: '人が主語で「～をよく知っている」は be familiar with。' },
      { sentence: 'This song is familiar ___ many Japanese people.', choices: ['to', 'with', 'for', 'at'], answer: 0, why: '物事が主語で「（人）によく知られている」は be familiar to。' },
      { sentence: 'Are you ___ with this computer program?', choices: ['familiar', 'familiarly', 'family', 'familiarity'], answer: 0, why: 'be familiar with ～。be のあとは形容詞 familiar。' },
    ],
  },
  {
    id: 'apologize-for',
    title: '前置詞 apologize to 人 for ～ ／ thank 人 for ～（～のことで人にあやまる・感謝する）',
    points: [
      'apologize to 人 for ～「～のことで人にあやまる」。人の前は to、理由の前は for。',
      'thank 人 for ～「～のことで人に感謝する」。thank のあとはすぐ人（to はつけない）。for のあとが動詞なら -ing。',
    ],
    examples: [
      { en: 'I apologized to my teacher for forgetting my homework.', ja: '宿題をわすれたことを先生にあやまった。' },
      { en: 'Thank you for inviting me.', ja: 'さそってくれてありがとう。' },
    ],
    questions: [
      { sentence: 'I apologized ___ her for being late.', choices: ['to', 'for', 'with', 'at'], answer: 0, why: 'apologize to 人 for ～。人の前は to。' },
      { sentence: 'She thanked me ___ helping her.', choices: ['for', 'to', 'of', 'with'], answer: 0, why: 'thank 人 for ～「～のことで人に感謝する」。' },
      { sentence: 'He apologized for ___ my umbrella.', choices: ['losing', 'lose', 'to lose', 'lost'], answer: 0, why: '前置詞 for のあとは動名詞 losing。' },
    ],
  },
  {
    id: 'accuse-of',
    title: '前置詞 accuse 人 of ～ ／ blame 人 for ～（～のことで人を責める）',
    points: [
      'accuse 人 of ～「～のことで人を非難する・うったえる」、blame 人 for ～「～を人のせいにする」。動詞によって前置詞が変わる。',
      '受け身なら be accused of ～ / be blamed for ～。前置詞のあとが動詞なら -ing。',
    ],
    examples: [
      { en: 'They accused the man of lying.', ja: '彼らはその男がうそをついたと非難した。' },
      { en: 'Don\'t blame others for your own mistakes.', ja: '自分のまちがいを人のせいにしてはいけない。' },
    ],
    questions: [
      { sentence: 'They accused him ___ stealing the money.', choices: ['of', 'for', 'with', 'about'], answer: 0, why: 'accuse 人 of ～「～のことで人を非難する」。' },
      { sentence: 'Don\'t blame me ___ the mistake.', choices: ['for', 'of', 'on', 'at'], answer: 0, why: 'blame 人 for ～「～を人のせいにする」。' },
      { sentence: 'She was accused of ___ the rules.', choices: ['breaking', 'break', 'broke', 'to break'], answer: 0, why: '前置詞 of のあとは動名詞 breaking。' },
    ],
  },
  {
    id: 'consist-of',
    title: '前置詞 consist of ／ be made up of（～からなる・～で構成されている）',
    points: [
      'consist of ～「～からなる」。進行形や受け身にしない（× is consisted of）。',
      'be made up of ～ も同じ意味で、こちらは受け身の形で使う：The team is made up of ten players.',
    ],
    examples: [
      { en: 'The book consists of five chapters.', ja: 'その本は5つの章からなる。' },
      { en: 'Our class is made up of thirty students.', ja: '私たちのクラスは30人の生徒で構成されている。' },
    ],
    questions: [
      { sentence: 'The team consists ___ eleven players.', choices: ['of', 'by', 'from', 'with'], answer: 0, why: 'consist of ～「～からなる」。' },
      { sentence: 'The committee is made up ___ five members.', choices: ['of', 'by', 'from', 'with'], answer: 0, why: 'be made up of ～「～で構成されている」。' },
      { sentence: 'Japan ___ of many islands.', choices: ['consists', 'is consisted', 'consisting', 'is consisting'], answer: 0, why: 'consist は受け身にしない。主語は三人称単数なので consists。' },
    ],
  },
  {
    id: 'result-in',
    title: '前置詞 result in ／ result from（～という結果になる・～から生じる）',
    points: [
      '原因 ＋ result in ＋ 結果「～という結果になる」：Carelessness resulted in an accident.',
      '結果 ＋ result from ＋ 原因「～から生じる」。in と from で原因と結果の順番が逆になる。',
    ],
    examples: [
      { en: 'Too little sleep can result in poor grades.', ja: '睡眠が少なすぎると、成績が下がることがある。' },
      { en: 'The fire resulted from a broken heater.', ja: 'その火事はこわれたヒーターが原因で起きた。' },
    ],
    questions: [
      { sentence: 'Careless driving can result ___ accidents.', choices: ['in', 'at', 'to', 'for'], answer: 0, why: '原因 ＋ result in ＋ 結果「～という結果になる」。' },
      { sentence: 'His success resulted ___ years of hard work.', choices: ['from', 'at', 'to', 'with'], answer: 0, why: '結果 ＋ result from ＋ 原因「～から生じる」。' },
      { sentence: 'The storm resulted in ___ damage.', choices: ['serious', 'seriously', 'seriousness', 'serious of'], answer: 0, why: '名詞 damage の前なので形容詞 serious。' },
    ],
  },
  {
    id: 'agree-with-to',
    title: '前置詞 agree with 人 ／ agree to 提案 ／ agree on（賛成する・合意する）',
    points: [
      'agree with ＋ 人・意見「（人・意見）に賛成する」、agree to ＋ 提案・計画「（提案）を受け入れる」。',
      'agree on ＋ 決めること「～について意見がまとまる」：We agreed on the date.',
    ],
    examples: [
      { en: 'I agree with you about the plan.', ja: 'その計画については、あなたに賛成です。' },
      { en: 'My parents agreed to my idea.', ja: '両親は私の考えを受け入れてくれた。' },
    ],
    questions: [
      { sentence: 'I agree ___ you. That is a good idea.', choices: ['with', 'to', 'on', 'for'], answer: 0, why: '人に賛成するのは agree with 人。' },
      { sentence: 'The boss agreed ___ our plan.', choices: ['to', 'in', 'at', 'for'], answer: 0, why: '提案・計画を受け入れるのは agree to。' },
      { sentence: 'We finally agreed ___ a date for the party.', choices: ['on', 'in', 'at', 'for'], answer: 0, why: '決めること（日付）について合意するのは agree on。' },
    ],
  },
  {
    id: 'depend-on',
    title: '前置詞 depend on ／ It depends on ～（～にたよる・～しだいだ）',
    points: [
      'depend on ～「～にたよる・～しだいだ」。It depends.「場合による・時と場合しだいだ」は会話でよく使う。',
      'depend は状態を表すので、ふつう進行形にしない（× is depending）。',
    ],
    examples: [
      { en: 'Many animals depend on the forest for food.', ja: '多くの動物が食べ物を森にたよっている。' },
      { en: 'Our trip depends on the weather.', ja: '旅行は天気しだいだ。' },
    ],
    questions: [
      { sentence: 'Children depend ___ their parents.', choices: ['on', 'to', 'with', 'at'], answer: 0, why: 'depend on ～「～にたよる」。' },
      { sentence: 'Whether we go or not depends ___ the weather.', choices: ['on', 'in', 'at', 'to'], answer: 0, why: 'depend on ～「～しだいだ」。' },
      { sentence: '"Will you come?" "It ___."', choices: ['depends', 'is depending', 'depend', 'depending'], answer: 0, why: 'It depends.「場合による」。depend はふつう進行形にせず、主語 It なので depends。' },
    ],
  },
  {
    id: 'succeed-in',
    title: '動名詞 succeed in -ing ／ fail to 原形（～に成功する・～しそこなう）',
    points: [
      'succeed in -ing「～することに成功する」。in は前置詞なので、うしろは動名詞。',
      'fail to ＋ 原形「～しそこなう・～できない」。成功は in -ing、失敗は to ＋ 原形と組み合わせが変わる。',
    ],
    examples: [
      { en: 'The team succeeded in reaching the top of the mountain.', ja: 'チームは山頂にたどり着くことに成功した。' },
      { en: 'I failed to wake up on time this morning.', ja: '今朝は時間どおりに起きられなかった。' },
    ],
    questions: [
      { sentence: 'She succeeded ___ passing the exam.', choices: ['in', 'at', 'to', 'for'], answer: 0, why: 'succeed in -ing「～することに成功する」。' },
      { sentence: 'He failed ___ catch the train.', choices: ['to', 'in', 'at', 'for'], answer: 0, why: 'fail to ＋ 原形「～しそこなう」。' },
      { sentence: 'They succeeded in ___ the mountain.', choices: ['climbing', 'climb', 'to climb', 'climbed'], answer: 0, why: '前置詞 in のあとは動名詞 climbing。' },
    ],
  },
  {
    id: 'graduate-from',
    title: '前置詞 graduate from ／ complain about ／ complain to（～を卒業する・～に文句を言う）',
    points: [
      'graduate from ＋ 学校「～を卒業する」。from をわすれやすい（× graduate high school は話しことば）。',
      'complain about ＋ 事柄「～について文句を言う」、complain to ＋ 人「（人）に苦情を言う」。',
    ],
    examples: [
      { en: 'My sister graduated from university in March.', ja: '姉は3月に大学を卒業した。' },
      { en: 'He complained to the hotel about the noise.', ja: '彼は騒音のことでホテルに苦情を言った。' },
    ],
    questions: [
      { sentence: 'My brother graduated ___ high school last year.', choices: ['from', 'at', 'in', 'of'], answer: 0, why: 'graduate from ＋ 学校「～を卒業する」。' },
      { sentence: 'She often complains ___ the noise.', choices: ['about', 'to', 'at', 'on'], answer: 0, why: '文句を言う事柄の前は about。' },
      { sentence: 'He complained ___ the manager about the service.', choices: ['to', 'about', 'with', 'for'], answer: 0, why: '苦情を言う相手（人）の前は to。' },
    ],
  },
  {
    id: 'used-for',
    title: '受け身 be used for -ing ／ be used to 原形（～するのに使われる）',
    points: [
      'be used for ＋ 名詞・-ing「～のために使われる」、be used to ＋ 原形「～するのに使われる」：This knife is used for cutting bread. ＝ This knife is used to cut bread.',
      'be used to -ing「～に慣れている」や used to 原形「以前は～した」とまちがえないように。',
    ],
    examples: [
      { en: 'This room is used for meetings.', ja: 'この部屋は会議に使われる。' },
      { en: 'Salt is used to keep food fresh.', ja: '塩は食べ物を長もちさせるのに使われる。' },
    ],
    questions: [
      { sentence: 'This knife is used ___ cutting bread.', choices: ['for', 'with', 'at', 'to'], answer: 0, why: 'be used for -ing「～するのに使われる」。' },
      { sentence: 'This room is used ___ meetings.', choices: ['for', 'at', 'of', 'with'], answer: 0, why: 'be used for ＋ 名詞「～のために使われる」。' },
      { sentence: 'Bamboo is used ___ make baskets.', choices: ['to', 'for', 'by', 'with'], answer: 0, why: '原形 make が続くので be used to ＋ 原形「～するのに使われる」。' },
    ],
  },
  {
    id: 'it-is-true-but',
    title: '接続詞 It is true (that) ～, but …（たしかに～だが…）',
    points: [
      'It is true (that) ～, but …「たしかに～だが…」。いったん相手の考えを認めてから、自分の意見を言う（譲歩）。',
      '会話や作文では True, ～, but … や Of course ～, but … も同じ働き。英作文でよく使う形。',
    ],
    examples: [
      { en: 'It is true that smartphones are useful, but they can waste our time.', ja: 'たしかにスマホは便利だが、時間をむだにすることもある。' },
      { en: 'True, the trip was expensive, but it was worth it.', ja: 'たしかに旅行は高かったが、それだけの価値はあった。' },
    ],
    questions: [
      { sentence: 'It is ___ that he is young, but he is very wise.', choices: ['true', 'truth', 'truly', 'trust'], answer: 0, why: 'It is true that ～「たしかに～だ」。be のあとは形容詞 true。' },
      { sentence: 'It is true ___ this car is old, but it still runs well.', choices: ['that', 'what', 'which', 'who'], answer: 0, why: 'It is true that ＋ 文。うしろは欠けのない文なので that。' },
      { sentence: 'True, the test was hard, ___ I did my best.', choices: ['but', 'despite', 'because of', 'in spite'], answer: 0, why: 'True, ～, but …「たしかに～だが…」。despite・because of のうしろに文は続かない。' },
    ],
  },
  {
    id: 'provide-with',
    title: '前置詞 provide A with B ／ provide B for A（A に B をあたえる）',
    points: [
      'provide A（人）with B（物）＝ provide B（物）for A（人）「A に B をあたえる・用意する」。人が先なら with、物が先なら for。',
      'supply も同じ形をとる。give とちがい、provide 人 物 の形（× provide us food）はふつう使わない。',
    ],
    examples: [
      { en: 'The town provides children with free books.', ja: '町は子どもたちに無料で本を用意している。' },
      { en: 'Trees provide shade for animals.', ja: '木は動物に日かげをあたえる。' },
    ],
    questions: [
      { sentence: 'The school provides students ___ lunch.', choices: ['with', 'of', 'at', 'to'], answer: 0, why: 'provide 人 with 物「人に物をあたえる」。' },
      { sentence: 'The hotel provides towels ___ guests.', choices: ['for', 'at', 'of', 'with'], answer: 0, why: '物が先なら provide 物 for 人。' },
      { sentence: 'They ___ us with food and water.', choices: ['provided', 'gave', 'offered', 'brought'], answer: 0, why: '人 with 物 の形をとるのは provide。give・offer は give 人 物 の形で with は使わない。' },
    ],
  },
  {
    id: 'replace-with',
    title: '前置詞 replace A with B ／ compare A with B（A を B と取りかえる・くらべる）',
    points: [
      'replace A with B「A を B と取りかえる」、compare A with（to）B「A を B とくらべる」。',
      '分詞構文の compared with ～「～とくらべると」もよく使う：Compared with last year, prices are higher.',
    ],
    examples: [
      { en: 'We replaced the old lights with LED ones.', ja: '古い照明を LED のものに取りかえた。' },
      { en: 'Compared with Tokyo, this town is very quiet.', ja: '東京とくらべると、この町はとても静かだ。' },
    ],
    questions: [
      { sentence: 'I replaced the old battery ___ a new one.', choices: ['with', 'at', 'of', 'to'], answer: 0, why: 'replace A with B「A を B と取りかえる」。' },
      { sentence: 'Don\'t compare yourself ___ others.', choices: ['with', 'at', 'of', 'for'], answer: 0, why: 'compare A with B「A を B とくらべる」。' },
      { sentence: '___ with last year, sales have grown.', choices: ['Compared', 'Compare', 'Comparison', 'Comparing'], answer: 0, why: '分詞構文 Compared with ～「～とくらべると」。' },
    ],
  },
  {
    id: 'similar-to',
    title: '形容詞 be similar to ／ be responsible for ／ be aware of（形容詞と前置詞の組み合わせ）',
    points: [
      'be similar to ～「～とにている」、be responsible for ～「～に責任がある・～を担当している」、be aware of ～「～に気づいている」。',
      '形容詞ごとに組む前置詞が決まっているので、セットで覚える。',
    ],
    examples: [
      { en: 'Your bag is similar to mine.', ja: 'あなたのかばんは私のとにている。' },
      { en: 'She is responsible for the school newspaper.', ja: '彼女は学校新聞の担当だ。' },
    ],
    questions: [
      { sentence: 'My idea is similar ___ yours.', choices: ['to', 'with', 'from', 'at'], answer: 0, why: 'be similar to ～「～とにている」。' },
      { sentence: 'Who is responsible ___ this project?', choices: ['for', 'of', 'at', 'with'], answer: 0, why: 'be responsible for ～「～に責任がある」。' },
      { sentence: 'Are you aware ___ the danger?', choices: ['of', 'for', 'to', 'with'], answer: 0, why: 'be aware of ～「～に気づいている」。' },
    ],
  },
  {
    id: 'take-pride',
    title: '動詞の使い方 take pride in ／ be proud of（～をほこりに思う）',
    points: [
      'take pride in ～ ＝ be proud of ～「～をほこりに思う」。pride は名詞、proud は形容詞。',
      '名詞 pride は take ～ in、形容詞 proud は be ～ of と組む。',
    ],
    examples: [
      { en: 'The farmers take pride in their rice.', ja: '農家の人たちは自分たちの米をほこりにしている。' },
      { en: 'I am proud of my little sister.', ja: '私は妹をほこりに思う。' },
    ],
    questions: [
      { sentence: 'She takes pride ___ her work.', choices: ['in', 'of', 'on', 'at'], answer: 0, why: 'take pride in ～「～をほこりに思う」。' },
      { sentence: 'He is proud ___ his son.', choices: ['of', 'in', 'at', 'with'], answer: 0, why: 'be proud of ～「～をほこりに思う」。' },
      { sentence: 'They take great ___ in their town\'s history.', choices: ['pride', 'proud', 'proudly', 'pridefully'], answer: 0, why: 'take の目的語なので名詞 pride。' },
    ],
  },
  {
    id: 'due-to',
    title: '前置詞 due to ／ owing to（～が原因で）と be due to 原形（～する予定だ）',
    points: [
      'due to ＋ 名詞 / owing to ＋ 名詞「～が原因で・～のために」（＝ because of）。',
      'be due to ＋ 原形 は「～する予定だ」：The train is due to arrive at noon. 形は同じでも意味がちがう。',
    ],
    examples: [
      { en: 'The flight was delayed due to heavy snow.', ja: '大雪のため、飛行機はおくれた。' },
      { en: 'The new library is due to open next month.', ja: '新しい図書館は来月開館する予定だ。' },
    ],
    questions: [
      { sentence: 'The game was canceled ___ to the rain.', choices: ['due', 'because', 'since', 'for'], answer: 0, why: 'due to ＋ 名詞「～が原因で」。because to・since to という形はない。' },
      { sentence: 'The train is due ___ arrive at 3:00.', choices: ['to', 'for', 'at', 'on'], answer: 0, why: 'be due to ＋ 原形「～する予定だ」。' },
      { sentence: 'Owing ___ the strike, there were no buses.', choices: ['to', 'for', 'of', 'by'], answer: 0, why: 'owing to ～「～が原因で」。' },
    ],
  },
  {
    id: 'owe-to',
    title: '前置詞 owe A to B（A は B のおかげだ・B に A を借りている）',
    points: [
      'owe A to B で「A は B のおかげだ」：I owe my success to my parents.',
      'owe 人 お金 で「人にお金を借りている」：I owe you 500 yen. own（所有する）とつづりがにているので注意。',
    ],
    examples: [
      { en: 'I owe my good health to my grandmother\'s cooking.', ja: '私が健康なのは祖母の料理のおかげだ。' },
      { en: 'How much do I owe you for the tickets?', ja: 'チケット代、いくら借りているかな。' },
    ],
    questions: [
      { sentence: 'I owe my success ___ my teachers.', choices: ['to', 'for', 'with', 'at'], answer: 0, why: 'owe A to B「A は B のおかげだ」。' },
      { sentence: 'How much do I ___ you?', choices: ['owe', 'own', 'have', 'owed'], answer: 0, why: 'owe 人 お金「人にお金を借りている」。own は「所有する」。' },
      { sentence: 'She owes her life ___ the doctor.', choices: ['to', 'by', 'from', 'with'], answer: 0, why: 'owe A to B「A は B のおかげだ」。命があるのは医師のおかげ。' },
    ],
  },
  {
    id: 'look-up-to',
    title: '前置詞で終わる句動詞 look up to ／ look down on ／ put up with（尊敬する・見下す・がまんする）',
    points: [
      'look up to ～「～を尊敬する」、look down on ～「～を見下す」、put up with ～「～をがまんする」。3語でひとまとまりの動詞として覚える。',
      '最後の前置詞までがセット。受け身にしても前置詞は残る：He is looked up to by everyone.',
    ],
    examples: [
      { en: 'Many young players look up to her.', ja: '多くの若い選手が彼女を尊敬している。' },
      { en: 'I can\'t put up with his rude jokes.', ja: '彼の失礼な冗談にはがまんできない。' },
    ],
    questions: [
      { sentence: 'Many students look up ___ their coach.', choices: ['to', 'on', 'with', 'for'], answer: 0, why: 'look up to ～「～を尊敬する」。' },
      { sentence: 'I can\'t put up ___ this noise any longer.', choices: ['with', 'to', 'on', 'for'], answer: 0, why: 'put up with ～「～をがまんする」。' },
      { sentence: 'Don\'t look down ___ people who are different.', choices: ['on', 'to', 'with', 'for'], answer: 0, why: 'look down on ～「～を見下す」。' },
    ],
  },
  {
    id: 'get-along-with',
    title: '前置詞で終わる句動詞 get along with ／ run out of ／ come up with（仲よくする・使い切る・思いつく）',
    points: [
      'get along with ～「～と仲よくやっていく」、run out of ～「～を使い切る・～がなくなる」、come up with ～「～を思いつく」。',
      'どれも「動詞 ＋ 副詞 ＋ 前置詞」の3語で1つの意味になる。',
    ],
    examples: [
      { en: 'Do you get along with your neighbors?', ja: '近所の人たちとうまくやっていますか。' },
      { en: 'We ran out of time before the end of the test.', ja: 'テストの終わりまでに時間が足りなくなった。' },
    ],
    questions: [
      { sentence: 'I get along well ___ my classmates.', choices: ['with', 'to', 'for', 'at'], answer: 0, why: 'get along with ～「～と仲よくやっていく」。' },
      { sentence: 'We have run out ___ milk.', choices: ['of', 'from', 'with', 'for'], answer: 0, why: 'run out of ～「～を使い切る」。' },
      { sentence: 'She came up ___ a great idea.', choices: ['with', 'to', 'for', 'at'], answer: 0, why: 'come up with ～「～を思いつく」。' },
    ],
  },
  {
    id: 'phrasal-pronoun',
    title: '前置詞と副詞 句動詞と代名詞の位置（turn it on ／ pick it up）',
    points: [
      '「動詞 ＋ 副詞」の句動詞（turn on / pick up / take off など）は、目的語が名詞なら2通り：turn on the light ＝ turn the light on。',
      '目的語が代名詞（it / them など）のときは、必ず動詞と副詞の間に入れる：turn it on（× turn on it）。',
    ],
    examples: [
      { en: 'Where is the remote? I want to turn the TV off.', ja: 'リモコンはどこ？ テレビを消したいんだ。' },
      { en: 'Your hat fell. Please pick it up.', ja: '帽子が落ちたよ。拾ってね。' },
    ],
    questions: [
      { sentence: 'It\'s dark. Please turn ___.', choices: ['it on', 'on it', 'it', 'on'], answer: 0, why: '代名詞 it は動詞と副詞の間：turn it on。' },
      { sentence: 'Your coat is on the floor. Pick ___.', choices: ['it up', 'up it', 'up', 'it'], answer: 0, why: '代名詞 it は動詞と副詞の間：pick it up。' },
      { sentence: 'These shoes are too small. I\'ll take ___.', choices: ['them off', 'off them', 'off', 'them of'], answer: 0, why: '代名詞 them は動詞と副詞の間：take them off。' },
    ],
  },
  {
    id: 'carry-out',
    title: '前置詞と副詞 句動詞 carry out ／ call off ／ find out（実行する・中止する・見つけ出す）',
    points: [
      'carry out ～「～を実行する」、call off ～「～を中止する」（＝ cancel）、find out ～「～を（調べて）見つけ出す」。',
      '受け身でもよく使う：The plan was carried out. / The game was called off.',
    ],
    examples: [
      { en: 'The students carried out a survey about school lunches.', ja: '生徒たちは給食についてのアンケート調査を行った。' },
      { en: 'The concert was called off because of the storm.', ja: '嵐のため、コンサートは中止になった。' },
    ],
    questions: [
      { sentence: 'The scientists carried ___ an experiment.', choices: ['out', 'away', 'down', 'up'], answer: 0, why: 'carry out ～「～を実行する」。' },
      { sentence: 'The game was called ___ because of rain.', choices: ['off', 'out', 'up', 'down'], answer: 0, why: 'call off ～「～を中止する」の受け身。' },
      { sentence: 'I want to find ___ the truth.', choices: ['out', 'off', 'away', 'up'], answer: 0, why: 'find out ～「～を見つけ出す」。' },
    ],
  },
  {
    id: 'gerund-verbs-2',
    title: '動名詞をとる動詞 admit ／ deny ／ avoid ／ put off（-ing）',
    points: [
      'admit -ing「～したことを認める」、deny -ing「～したことを否定する」、avoid -ing「～するのをさける」、put off -ing「～するのを延期する」。',
      'これらの動詞のあとは to 不定詞ではなく動名詞（-ing）。enjoy・finish・mind・give up などと同じなかま。',
    ],
    examples: [
      { en: 'He admitted making a mistake.', ja: '彼はまちがいをしたことを認めた。' },
      { en: 'I always put off cleaning my room.', ja: '私はいつも部屋のそうじを先のばしにしてしまう。' },
    ],
    questions: [
      { sentence: 'He admitted ___ the window.', choices: ['breaking', 'to break', 'break', 'broke'], answer: 0, why: 'admit のあとは動名詞 breaking。' },
      { sentence: 'Try to avoid ___ too much sugar.', choices: ['eating', 'to eat', 'eat', 'ate'], answer: 0, why: 'avoid のあとは動名詞 eating。' },
      { sentence: 'Don\'t put off ___ your homework.', choices: ['doing', 'to do', 'do', 'did'], answer: 0, why: 'put off のあとは動名詞 doing（off は副詞だがうしろは -ing）。' },
    ],
  },
  {
    id: 'inf-verbs-2',
    title: '不定詞をとる動詞 refuse ／ promise ／ manage ／ pretend（to 原形）',
    points: [
      'refuse to ～「～するのをことわる」、promise to ～「～すると約束する」、manage to ～「なんとか～する」、pretend to ～「～するふりをする」。',
      'これからのこと・意志を表す動詞は to 不定詞をとりやすい（want・hope・decide と同じなかま）。',
    ],
    examples: [
      { en: 'She promised to call me later.', ja: '彼女はあとで電話すると約束した。' },
      { en: 'The cat pretended to be asleep.', ja: 'そのねこはねむっているふりをした。' },
    ],
    questions: [
      { sentence: 'She refused ___ the money.', choices: ['to take', 'taking', 'take', 'took'], answer: 0, why: 'refuse のあとは to 不定詞 to take。' },
      { sentence: 'We managed ___ the last train.', choices: ['to catch', 'catching', 'catch', 'caught'], answer: 0, why: 'manage to ～「なんとか～する」。' },
      { sentence: 'He pretended ___ asleep.', choices: ['to be', 'being', 'be', 'been'], answer: 0, why: 'pretend to ～「～するふりをする」。' },
    ],
  },
  {
    id: 'what-do-you-say',
    title: '疑問文 提案の表現 What do you say to -ing? ／ Why don\'t we ～?',
    points: [
      'What do you say to -ing?「～するのはどう？」。to は前置詞なので、うしろは動名詞（How about -ing? と同じ意味）。',
      'Why don\'t we ＋ 原形 ～?「（いっしょに）～しませんか」、Why don\'t you ＋ 原形 ～?「～したらどう？」。',
    ],
    examples: [
      { en: 'What do you say to going on a picnic?', ja: 'ピクニックに行くのはどう？' },
      { en: 'Why don\'t we study together after school?', ja: '放課後いっしょに勉強しない？' },
    ],
    questions: [
      { sentence: 'What do you say ___ going for a walk?', choices: ['to', 'for', 'at', 'with'], answer: 0, why: 'What do you say to -ing?「～するのはどう？」。' },
      { sentence: 'Why don\'t we ___ a break?', choices: ['take', 'taking', 'to take', 'took'], answer: 0, why: 'Why don\'t we ＋ 原形 ～?「～しませんか」。' },
      { sentence: 'What do you say to ___ out for dinner?', choices: ['eating', 'eat', 'ate', 'to eat'], answer: 0, why: 'to は前置詞なので、うしろは動名詞 eating。' },
    ],
  },
  {
    id: 'in-within',
    title: '前置詞 in ＋ 時間（～後に）／ within ＋ 時間（～以内に）',
    points: [
      'in ＋ 時間「（今から）～後に」：The train will leave in five minutes.「5分後に出発する」。',
      'within ＋ 時間「～以内に」：Please reply within three days.「3日以内に返事をください」。過去から見た「～後」は later / after。',
    ],
    examples: [
      { en: 'I\'ll call you back in ten minutes.', ja: '10分後に折り返し電話するね。' },
      { en: 'The package will arrive within a week.', ja: '荷物は1週間以内に届く。' },
    ],
    questions: [
      { sentence: 'The bus will come ___ ten minutes.', choices: ['in', 'since', 'ago', 'for'], answer: 0, why: '今から「～後に」は in ＋ 時間。' },
      { sentence: 'Please finish the report ___ a week.', choices: ['within', 'since', 'ago', 'for'], answer: 0, why: '「～以内に」は within ＋ 時間。' },
      { sentence: 'I will be back ___ an hour.', choices: ['in', 'since', 'before', 'ago'], answer: 0, why: '今から「1時間後に」は in an hour。' },
    ],
  },
  {
    id: 'uncountable',
    title: '名詞 数えられない名詞 advice ／ information ／ furniture（a piece of ～）',
    points: [
      'advice（助言）・information（情報）・furniture（家具）・baggage（荷物）・news（ニュース）は数えられない名詞。a / an をつけず、-s もつけない。',
      '数えるときは a piece of ～ / two pieces of ～：a piece of advice「1つの助言」、two pieces of furniture「家具2点」。',
    ],
    examples: [
      { en: 'My teacher gave me a useful piece of advice.', ja: '先生が役に立つ助言を1つくれた。' },
      { en: 'You can find more information on our website.', ja: 'くわしい情報はウェブサイトで見られます。' },
    ],
    questions: [
      { sentence: 'Can you give me some ___?', choices: ['advice', 'advices', 'an advice', 'advise'], answer: 0, why: 'advice は数えられない名詞なので、-s も an もつけない。' },
      { sentence: 'I need ___ about the tour.', choices: ['information', 'an information', 'informations', 'informing'], answer: 0, why: 'information は数えられない名詞。' },
      { sentence: 'She bought two ___ of furniture.', choices: ['pieces', 'piece', 'furnitures', 'piece of'], answer: 0, why: '数えるときは two pieces of furniture。piece を複数にする。' },
    ],
  },
  {
    id: 'noun-number',
    title: '名詞 people ／ police は複数あつかい・news は単数あつかい',
    points: [
      'people（人々）・police（警察）は -s がなくても複数あつかい：The police are coming.',
      'news（ニュース）は -s で終わるが単数あつかい：The news is true. mathematics（数学）も単数あつかい。',
    ],
    examples: [
      { en: 'The police are checking every car.', ja: '警察がすべての車を調べている。' },
      { en: 'No news is good news.', ja: '便りのないのはよい便り。' },
    ],
    questions: [
      { sentence: 'The police ___ looking for the thief.', choices: ['are', 'is', 'was', 'has'], answer: 0, why: 'police は複数あつかいなので are。' },
      { sentence: 'The news ___ surprising.', choices: ['was', 'were', 'are', 'have been'], answer: 0, why: 'news は単数あつかいなので was。' },
      { sentence: 'Many people ___ waiting outside.', choices: ['were', 'was', 'is', 'has'], answer: 0, why: 'people は複数あつかいなので were。' },
    ],
  },
  {
    id: 'friend-of-mine',
    title: '代名詞 a friend of mine（二重所有格）',
    points: [
      'a / this / some などと所有格（my / his）はならべて使えない。そのときは a friend of mine「私の友だちの1人」のように of ＋ 所有代名詞 を使う。',
      '人の名前なら a friend of Ken\'s / a friend of my father\'s のように \'s をつける。',
    ],
    examples: [
      { en: 'A friend of mine lives in Canada.', ja: '私の友だちの1人がカナダに住んでいる。' },
      { en: 'This old camera of my grandfather\'s still works.', ja: '祖父のこの古いカメラは今でも動く。' },
    ],
    questions: [
      { sentence: 'She is a friend of ___.', choices: ['mine', 'me', 'my', 'I'], answer: 0, why: 'a friend of mine。of のあとは所有代名詞 mine。' },
      { sentence: 'I met an old friend of ___ at the station.', choices: ['my father\'s', 'my fathers', 'my father is', 'my father'], answer: 0, why: '人のときは a friend of ～\'s の形。' },
      { sentence: 'This is ___ of mine.', choices: ['a book', 'my book', 'book', 'the book'], answer: 0, why: 'a ＋ 名詞 ＋ of mine。my と mine をいっしょには使わない。' },
    ],
  },
  {
    id: 'by-difference',
    title: '前置詞 by ＋ 差（～だけ）と 数 ＋ 比較級',
    points: [
      '差を表す by：She is older than me by two years.「彼女は私より2歳年上だ」。lose by one point「1点差で負ける」。',
      '数を比較級の前に置いても同じ意味：She is two years older than me.',
    ],
    examples: [
      { en: 'Our team won by three goals.', ja: '私たちのチームは3点差で勝った。' },
      { en: 'This bridge is ten meters longer than that one.', ja: 'この橋はあの橋より10メートル長い。' },
    ],
    questions: [
      { sentence: 'She is older than me ___ two years.', choices: ['by', 'for', 'in', 'at'], answer: 0, why: '差を表す by「～だけ」。' },
      { sentence: 'Our team lost ___ one point.', choices: ['by', 'for', 'with', 'at'], answer: 0, why: 'lose by ～「～の差で負ける」。' },
      { sentence: 'He is three years ___ than his brother.', choices: ['older', 'old', 'oldest', 'more old'], answer: 0, why: 'than があるので比較級 older。数（three years）は比較級の前に置く。' },
    ],
  },
  {
    id: 'its-its',
    title: '代名詞 its と it\'s ／ whose と who\'s のちがい',
    points: [
      'its は「それの」（所有格）、it\'s は it is / it has の短縮形。The dog wagged its tail. / It\'s raining.',
      'whose は「だれの」、who\'s は who is / who has の短縮形。Whose bag is this? / Who\'s that boy?',
    ],
    examples: [
      { en: 'The company changed its logo.', ja: 'その会社はロゴを変えた。' },
      { en: 'It\'s been a long day.', ja: '長い一日だった。（It has been）' },
    ],
    questions: [
      { sentence: 'The dog wagged ___ tail.', choices: ['its', 'it\'s', 'it', 'it is'], answer: 0, why: '「その（犬の）しっぽ」なので所有格 its。it\'s は it is の短縮形。' },
      { sentence: '___ raining outside.', choices: ['It\'s', 'Its', 'It', 'There'], answer: 0, why: 'It is raining の短縮形 It\'s。' },
      { sentence: '___ bag is this?', choices: ['Whose', 'Who\'s', 'Who', 'Whom'], answer: 0, why: '「だれのかばん」なので所有の Whose。Who\'s は Who is の短縮形。' },
    ],
  },
  {
    id: 'their-there',
    title: '代名詞 their ／ there ／ they\'re のちがい',
    points: [
      'their は「彼らの」（所有格）、there は「そこに」や There is ～ の there、they\'re は they are の短縮形。',
      '発音が同じなので、意味と文の形で見分ける。',
    ],
    examples: [
      { en: 'They\'re proud of their team.', ja: '彼らは自分たちのチームをほこりにしている。' },
      { en: 'There are many shops over there.', ja: 'あそこにはたくさんの店がある。' },
    ],
    questions: [
      { sentence: 'The students left ___ bags in the classroom.', choices: ['their', 'there', 'they\'re', 'theirs'], answer: 0, why: '「彼らのかばん」なので所有格 their。' },
      { sentence: '___ is a cat under the table.', choices: ['There', 'Their', 'They\'re', 'They'], answer: 0, why: 'There is ～「～がいる」。' },
      { sentence: '___ coming to the party tonight.', choices: ['They\'re', 'Their', 'There', 'They'], answer: 0, why: 'They are coming の短縮形 They\'re。' },
    ],
  },
  {
    id: 'lie-lay-forms',
    title: '過去形 lie（横になる）と lay（横にする）の活用',
    points: [
      'lie「横になる・ある」（自動詞）：lie – lay – lain。lay「横にする・置く」（他動詞・目的語が必要）：lay – laid – laid。',
      'lie の過去形 lay と、lay の原形 lay が同じ形なので注意。「うそをつく」の lie は lie – lied – lied。',
    ],
    examples: [
      { en: 'I lay on the grass and looked at the clouds.', ja: '私は草の上に横になって雲をながめた。' },
      { en: 'She laid the baby gently in the bed.', ja: '彼女は赤ちゃんをそっとベッドに寝かせた。' },
    ],
    questions: [
      { sentence: 'I ___ down on the sofa because I was tired.', choices: ['lay', 'laid', 'lied', 'lain'], answer: 0, why: '「横になった」は lie の過去形 lay。laid は目的語が必要、lied は「うそをついた」。' },
      { sentence: 'Please ___ the baby on the bed.', choices: ['lay', 'lie', 'lain', 'laid'], answer: 0, why: '目的語（the baby）があるので「横にする」の lay。' },
      { sentence: 'Yesterday she ___ the book on the desk.', choices: ['laid', 'lay', 'lied', 'lain'], answer: 0, why: '目的語（the book）があり過去なので lay の過去形 laid。' },
    ],
  },
  {
    id: 'rise-raise-forms',
    title: '過去形 rise（上がる）と raise（上げる）の活用',
    points: [
      'rise「上がる・のぼる」（自動詞）：rise – rose – risen。raise「上げる・育てる」（他動詞・目的語が必要）：raise – raised – raised。',
      '目的語があれば raise、なければ rise と見分ける。',
    ],
    examples: [
      { en: 'The sun rose at six this morning.', ja: '今朝は6時に日がのぼった。' },
      { en: 'Raise your hand if you know the answer.', ja: '答えがわかったら手をあげて。' },
    ],
    questions: [
      { sentence: 'Please ___ your hand if you have a question.', choices: ['raise', 'rise', 'rose', 'raised'], answer: 0, why: '目的語（your hand）があるので「上げる」の raise。' },
      { sentence: 'The sun ___ in the east.', choices: ['rises', 'raises', 'raised', 'risen'], answer: 0, why: '目的語がないので「のぼる」の rise。主語は三人称単数で rises。' },
      { sentence: 'Prices have ___ a lot this year.', choices: ['risen', 'raised', 'rose', 'rising'], answer: 0, why: '目的語がないので rise。have のあとは過去分詞 risen。' },
    ],
  },
  {
    id: 'try-ing',
    title: '動名詞と不定詞 try -ing ／ try to 原形（ためしに～する・～しようとする）',
    points: [
      'try -ing「ためしに～してみる」（実際にやってみる）、try to ＋ 原形「～しようと努力する」（できたかどうかは別）。',
      'He tried to lift the box, but he couldn\'t.「持ち上げようとしたができなかった」のように、うまくいかなかった話でよく使う。',
    ],
    examples: [
      { en: 'Try adding a little salt to the soup.', ja: 'スープに少し塩を入れてみて。' },
      { en: 'I tried to call you, but the line was busy.', ja: '電話しようとしたけど、話し中だった。' },
    ],
    questions: [
      { sentence: 'If you can\'t sleep, try ___ a glass of warm milk.', choices: ['drinking', 'drink', 'drank', 'drunk'], answer: 0, why: '「ためしに～してみる」は try -ing。' },
      { sentence: 'He tried ___ the heavy box, but he couldn\'t.', choices: ['to lift', 'lift', 'lifted', 'lifts'], answer: 0, why: '「～しようとした（けどできなかった）」は try to ＋ 原形。' },
      { sentence: 'Try ___ the computer off and on again.', choices: ['turning', 'turn', 'turned', 'turns'], answer: 0, why: 'ためしにやってみる try -ing。turn ～ off「～を切る」。' },
    ],
  },
  {
    id: 'mean-ing',
    title: '動名詞と不定詞 mean to 原形 ／ mean -ing（～するつもりだ・～することになる）',
    points: [
      'mean to ＋ 原形「～するつもりだ」（人の意図）：I didn\'t mean to hurt you.「傷つけるつもりはなかった」。',
      'mean -ing「～することになる・～を意味する」（物事が主語）：This job means working on weekends.',
    ],
    examples: [
      { en: 'I meant to buy milk, but I forgot.', ja: '牛乳を買うつもりだったのに、わすれた。' },
      { en: 'Winning the game means going to the finals.', ja: 'その試合に勝てば決勝に進むことになる。' },
    ],
    questions: [
      { sentence: 'I didn\'t mean ___ you.', choices: ['to hurt', 'hurt', 'hurts', 'hurting'], answer: 0, why: '「～するつもりだ」は mean to ＋ 原形。' },
      { sentence: 'Taking this job will mean ___ to Osaka.', choices: ['moving', 'move', 'moved', 'to move'], answer: 0, why: '物事が主語で「～することになる」は mean -ing。' },
      { sentence: 'Sorry, I meant ___ you back yesterday.', choices: ['to call', 'call', 'called', 'calling'], answer: 0, why: '「電話を返すつもりだった」は mean to ＋ 原形。' },
    ],
  },
  {
    id: 'mixed-conditional',
    title: '仮定法 過去の仮定と今の結果（If S had 過去分詞, S would 原形 now）',
    points: [
      '「（あのとき）～していたら、（今）…だろうに」は、if の中を仮定法過去完了、主節を仮定法過去にする：If I had eaten breakfast, I wouldn\'t be hungry now.',
      'now・today など「今」を表すことばが主節にあるのが目印。',
    ],
    examples: [
      { en: 'If I had gone to bed earlier, I wouldn\'t be so sleepy now.', ja: 'もっと早く寝ていたら、今こんなにねむくないのに。' },
      { en: 'If she had taken the job, she would be living in Paris now.', ja: '彼女がその仕事を受けていたら、今ごろパリに住んでいるだろう。' },
    ],
    questions: [
      { sentence: 'If I had taken the medicine, I ___ better now.', choices: ['would feel', 'would have felt', 'will feel', 'will have felt'], answer: 0, why: '結果は「今」なので主節は仮定法過去 would ＋ 原形。' },
      { sentence: 'If she ___ harder last year, she would be a college student now.', choices: ['had studied', 'studied', 'has studied', 'studies'], answer: 0, why: '仮定は「去年」の過去のことなので if の中は過去完了 had studied。' },
      { sentence: 'If I had not missed the bus, I ___ at school now.', choices: ['would be', 'would have been', 'am', 'will be'], answer: 0, why: '結果は「今」なので would be。' },
    ],
  },
  {
    id: 'were-it-not',
    title: '仮定法 If it were not for ～ ／ Were it not for ～（もし～がなければ）',
    points: [
      'If it were not for ～「（今）～がなければ」、If it had not been for ～「（あのとき）～がなかったら」。without / but for ～ と同じ意味。',
      'if を省くと倒置になる：Were it not for ～ / Had it not been for ～（かたい言い方）。',
    ],
    examples: [
      { en: 'If it were not for water, nothing could live.', ja: 'もし水がなければ、何も生きられないだろう。' },
      { en: 'Had it not been for your advice, I would have given up.', ja: 'あなたの助言がなかったら、あきらめていただろう。' },
    ],
    questions: [
      { sentence: 'If it ___ not for your help, I could not finish this.', choices: ['were', 'is', 'be', 'are'], answer: 0, why: '今の事実の反対を仮定する If it were not for ～。' },
      { sentence: '___ it not for the rain, we would go out.', choices: ['Were', 'Is', 'Be', 'Are'], answer: 0, why: 'If を省いた倒置 Were it not for ～。' },
      { sentence: 'If it had not been ___ his advice, I would have failed.', choices: ['for', 'of', 'by', 'with'], answer: 0, why: 'If it had not been for ～「～がなかったら」の決まった形。' },
    ],
  },
  {
    id: 'likely-that-to',
    title: 'It is likely that ～ ＝ 人 is likely to ～（文の書きかえ）',
    points: [
      'It is likely that S V ＝ S is likely to V「S は～しそうだ」。certain も同じ形：It is certain that he will come.＝He is certain to come.（きっと来る）',
      'ただし It is sure that ～ とは言わず、sure は He is sure to come. の形で使う。possible は人を主語にできない：×He is possible to come. → It is possible that he will come.',
    ],
    examples: [
      { en: 'It is likely that the train will be crowded. ＝ The train is likely to be crowded.', ja: '電車は混みそうだ。' },
      { en: 'He is certain to like this present.', ja: '彼はきっとこのプレゼントを気に入るだろう。' },
    ],
    questions: [
      { sentence: 'It is likely ___ he will be late again.', choices: ['that', 'to', 'for', 'which'], answer: 0, why: 'うしろが文（he will be late）なので It is likely that ～。' },
      { sentence: 'She is likely ___ the race this time.', choices: ['to win', 'that she wins', 'winning', 'to winning'], answer: 0, why: '人が主語のときは S is likely to ＋ 原形。' },
      { sentence: 'It is certain that Ken will pass. ＝ Ken is certain ___ pass.', choices: ['to', 'that', 'of', 'for'], answer: 0, why: 'It is certain that S V ＝ S is certain to V「きっと～する」。' },
    ],
  },
  {
    id: 'had-hoped',
    title: 'had hoped to ～ ／ had intended to ～（～するつもりだったのに）',
    points: [
      'had hoped（intended / expected / meant）to ～ で「～するつもりだった（のに、できなかった）」。実現しなかった望みや予定を表す。',
      'hoped to have ＋ 過去分詞 も同じ意味（かたい言い方）：I hoped to have finished it by noon.「昼までに終えたかったのだが」。',
    ],
    examples: [
      { en: 'I had hoped to see you, but I was too busy.', ja: '会いたいと思っていたのだが、いそがしすぎた。' },
      { en: 'She had intended to call him, but she forgot.', ja: '彼女は彼に電話するつもりだったが、忘れてしまった。' },
    ],
    questions: [
      { sentence: 'I ___ to visit Kyoto last spring, but I got sick.', choices: ['had hoped', 'have hoped', 'am hoping', 'hope'], answer: 0, why: 'last spring（過去）より前からの望みが実現しなかったので had hoped to ～。現在完了は過去の時を表す語といっしょに使えない。' },
      { sentence: 'We had expected ___ early, but the train was late.', choices: ['to arrive', 'arriving', 'arrive', 'for arriving'], answer: 0, why: 'expect のあとは to ＋ 原形。had expected to ～「～するはずだった」。' },
      { sentence: 'He hoped to ___ the work by noon, but he couldn\'t.', choices: ['have finished', 'finishing', 'finished', 'have finishing'], answer: 0, why: 'hoped to have ＋ 過去分詞「～したかったのだが（できなかった）」。to のあとは原形 have。' },
    ],
  },
  {
    id: 'remain-keep-participle',
    title: 'remain ／ keep ＋ 分詞（～のままでいる・～させておく）',
    points: [
      'remain ＋ 過去分詞「～されたままだ」：remain seated（すわったままでいる）、remain unsolved（解決されないままだ）。seat は「すわらせる」という意味なので、すわる側は seated になる。',
      'keep ＋ 人 ＋ -ing「人に～させたままにする」（keep you waiting）、keep ＋ 物 ＋ 過去分詞「物を～されたままにする」（keep the door locked）。する側なら -ing、される側なら過去分詞。',
    ],
    examples: [
      { en: 'Please remain seated until the plane stops.', ja: '飛行機が止まるまで、すわったままでいてください。' },
      { en: 'I\'m sorry to have kept you waiting so long.', ja: '長い間お待たせしてすみません。' },
    ],
    questions: [
      { sentence: 'Please remain ___ until the bus stops.', choices: ['seated', 'seating', 'to seat', 'seat'], answer: 0, why: 'seat は「すわらせる」。すわっている側は「すわらされた」状態なので remain seated。' },
      { sentence: 'Sorry to keep you ___.', choices: ['waiting', 'waited', 'to wait', 'wait'], answer: 0, why: 'you が「待っている」（する側）なので keep ＋ 人 ＋ -ing。' },
      { sentence: 'The window remained ___ all day.', choices: ['locked', 'locking', 'to lock', 'lock'], answer: 0, why: '窓は「かぎをかけられた」側なので remain ＋ 過去分詞。' },
    ],
  },
  {
    id: 'inanimate-subject',
    title: '無生物主語（What makes you think so? ／ This bus takes you ～）',
    points: [
      'もの・出来事が主語で「（もの）が人に～させる」という英語は、日本語では「～で・～のおかげで（人が）…」と訳すと自然になる。',
      'What makes you think so?「なぜそう思うの？」、This bus will take you to the station.「このバスに乗れば駅に行ける」、enable A to ～「（もの）のおかげで A は～できる」。make のあとは 人＋原形、enable のあとは 人＋to 原形。',
    ],
    examples: [
      { en: 'What made you choose this school?', ja: 'どうしてこの学校を選んだの？' },
      { en: 'A ten-minute walk will bring you to the park.', ja: '10分歩けば公園に着きます。' },
    ],
    questions: [
      { sentence: 'What ___ you so angry yesterday?', choices: ['made', 'did', 'was', 'let'], answer: 0, why: 'What made you ～?「何があなたを～にしたのか」＝「なぜ～だったのか」。make ＋人＋形容詞。' },
      { sentence: 'This medicine will make you ___ better.', choices: ['feel', 'to feel', 'felt', 'feeling'], answer: 0, why: 'make ＋人＋原形「人に～させる」。「この薬を飲めば気分がよくなる」。' },
      { sentence: 'The new road enables people ___ the town in ten minutes.', choices: ['to reach', 'reach', 'reaching', 'for reaching'], answer: 0, why: 'enable ＋人＋to 原形「（もの）のおかげで人は～できる」。' },
    ],
  },
  {
    id: 'it-seems-that',
    title: 'It seems that ～ ＝ 人 seems to ～（文の書きかえ）',
    points: [
      'It seems that S V ＝ S seems to V「S は～のようだ」。It appears that ～ ＝ S appears to ～ も同じ形。',
      'that のあとの時制が seems より前（過去）なら、to have ＋ 過去分詞にする：It seems that he was rich. ＝ He seems to have been rich.「彼はお金持ちだったようだ」。',
    ],
    examples: [
      { en: 'It seems that the shop is closed today. ＝ The shop seems to be closed today.', ja: 'その店は今日は閉まっているようだ。' },
      { en: 'She seems to have forgotten our plan.', ja: '彼女は私たちの計画を忘れてしまったようだ。' },
    ],
    questions: [
      { sentence: 'It seems ___ she knows the answer.', choices: ['that', 'to', 'for', 'as'], answer: 0, why: 'うしろが文（she knows …）なので It seems that ～。' },
      { sentence: 'It seems that he is sick. ＝ He seems ___ sick.', choices: ['to be', 'that he is', 'being', 'is'], answer: 0, why: '人が主語なら S seems to ＋ 原形。is → to be。' },
      { sentence: 'It seems that they lost the key. ＝ They seem to ___ the key.', choices: ['have lost', 'lost', 'losing', 'have losing'], answer: 0, why: 'lost（過去）は seem（現在）より前のことなので to have ＋ 過去分詞。' },
    ],
  },
  {
    id: 'afraid-of-to',
    title: 'be afraid of -ing ／ be afraid to ～（～しないか心配・こわくて～できない）',
    points: [
      'be afraid to ＋ 原形「こわくて～できない（する勇気がない）」：I was afraid to jump.「こわくてとべなかった」。',
      'be afraid of ＋ -ing「～するのではないかと心配する」（自分では止められないこと）：I\'m afraid of falling.「落ちないか心配だ」。of のあとは名詞か -ing。',
    ],
    examples: [
      { en: 'The child was afraid to open the door.', ja: 'その子はこわくてドアをあけられなかった。' },
      { en: 'I was afraid of being late, so I took a taxi.', ja: '遅れるのではないかと心配で、タクシーに乗った。' },
    ],
    questions: [
      { sentence: 'He was afraid ___ his parents the truth, so he said nothing.', choices: ['to tell', 'of tell', 'telling', 'for telling'], answer: 0, why: '「こわくて言えなかった」は be afraid to ＋ 原形。of のあとに原形は来ない。' },
      { sentence: 'I\'m afraid ___ the bus, so I\'ll leave now.', choices: ['of missing', 'to missing', 'miss', 'for missing'], answer: 0, why: '「乗りおくれないか心配」は be afraid of ＋ -ing。' },
      { sentence: 'Don\'t be afraid ___ mistakes.', choices: ['of making', 'to making', 'make', 'for making'], answer: 0, why: '前置詞 of のあとは動名詞 making。' },
    ],
  },
  {
    id: 'go-on-ing-to',
    title: 'go on -ing ／ go on to ～（～し続ける・続けて～する）',
    points: [
      'go on -ing「（同じことを）～し続ける」：They went on talking.「話し続けた」。go on with ～「～を続ける」。',
      'go on to ＋ 原形「（次に）続けて～する・（別のことに）進む」：She went on to study medicine.「その後、医学を学ぶことに進んだ」。',
    ],
    examples: [
      { en: 'They went on talking after the bell rang.', ja: 'ベルが鳴ったあとも、彼らは話し続けた。' },
      { en: 'After high school, she went on to study medicine.', ja: '高校のあと、彼女は医学を学ぶ道に進んだ。' },
    ],
    questions: [
      { sentence: 'He went on ___ even though he was tired.', choices: ['running', 'to running', 'run', 'for running'], answer: 0, why: '「疲れていても走り続けた」は go on -ing。' },
      { sentence: 'After explaining the rules, the teacher went on ___ us an example.', choices: ['to give', 'to giving', 'give', 'for giving'], answer: 0, why: '「ルールの説明に続けて、例を示した」は go on to ＋ 原形。' },
      { sentence: 'Please go ___ with your work.', choices: ['on', 'in', 'at', 'up'], answer: 0, why: 'go on with ～「～を続ける」。' },
    ],
  },
  {
    id: 'so-far-by-then',
    title: '完了形といっしょに使う時の言葉（so far ／ by then ／ by the end of ～）',
    points: [
      'so far / up to now「今までのところ」は、今までのことなので現在完了：So far, everything has gone well.',
      'by then（過去のある時）「その時までに」は過去完了 had ＋ 過去分詞。by the end of this year など未来の時までに終わることは、未来完了 will have ＋ 過去分詞。',
    ],
    examples: [
      { en: 'So far, I have read three of his books.', ja: '今までのところ、彼の本を3冊読んだ。' },
      { en: 'We arrived at noon. By then, the shop had already closed.', ja: '私たちは正午に着いた。その時までに、店はもう閉まっていた。' },
    ],
    questions: [
      { sentence: 'So far, we ___ three tests this term.', choices: ['have had', 'had had', 'are having', 'were having'], answer: 0, why: 'so far「今までのところ」は現在完了。' },
      { sentence: 'I arrived at nine, but by then the movie ___.', choices: ['had started', 'has started', 'starts', 'would start'], answer: 0, why: 'by then（過去の9時）までに終わっていたことは過去完了。' },
      { sentence: 'By the end of this year, I ___ here for ten years.', choices: ['will have lived', 'have lived', 'had lived', 'am living'], answer: 0, why: '未来の時（今年の終わり）までの継続は未来完了 will have ＋ 過去分詞。' },
    ],
  },
  {
    id: 'sure-of-to',
    title: 'be sure to ～ ／ be sure of -ing（きっと～する・～を確信している）',
    points: [
      'S is sure to ～「S はきっと～する」：確信しているのは話し手。It is sure to rain.「きっと雨がふる」。',
      'S is sure of -ing ／ S is sure that ～「S は～を確信している」：確信しているのは主語。He is sure of winning.＝He is sure that he will win.',
    ],
    examples: [
      { en: 'Take this map, and you are sure to find the station.', ja: 'この地図を持っていけば、きっと駅が見つかるよ。' },
      { en: 'She is sure of passing the test.', ja: '彼女はテストに合格すると確信している。' },
    ],
    questions: [
      { sentence: 'He is sure ___ the game; he has practiced very hard.', choices: ['of winning', 'to winning', 'win', 'for winning'], answer: 0, why: '「（彼自身が）勝てると確信している」は be sure of ＋ -ing。of のあとは -ing。' },
      { sentence: 'Leave now, and you are sure ___ the last train.', choices: ['to catch', 'of catch', 'catching', 'to catching'], answer: 0, why: '「（話し手から見て）きっと～する」は be sure to ＋ 原形。' },
      { sentence: 'I\'m sure ___ she will like your present.', choices: ['that', 'of', 'to', 'for'], answer: 0, why: 'うしろが文（she will like …）なので be sure that ～。' },
    ],
  },
  {
    id: 'to-ing-2',
    title: '前置詞の to ＋ ～ing ②（devote oneself to / be committed to / with a view to）',
    points: [
      'devote oneself to ～ing「～に専念する・身をささげる」、be committed to ～ing「～に全力で取り組む」、with a view to ～ing「～する目的で」。どれも to は前置詞なので、あとは名詞か ～ing。',
      'contribute to ～「～に貢献する・～の一因となる」も to のあとは名詞：Exercise contributes to good health.「運動は健康によい」。',
    ],
    examples: [
      { en: 'He devoted himself to studying medicine.', ja: '彼は医学の勉強に専念した。' },
      { en: 'She is learning Spanish with a view to working in Mexico.', ja: '彼女はメキシコで働くつもりで、スペイン語を学んでいる。' },
    ],
    questions: [
      { sentence: 'She devoted herself to ___ sick children.', choices: ['helping', 'help', 'helped', 'helps'], answer: 0, why: 'devote oneself to の to は前置詞なので ～ing。' },
      { sentence: 'He saved money with a view ___ a car.', choices: ['to buying', 'to buy', 'for buy', 'of buying'], answer: 0, why: 'with a view to ～ing「～する目的で」。to のあとは ～ing。' },
      { sentence: 'The company is committed to ___ less plastic.', choices: ['using', 'use', 'used', 'uses'], answer: 0, why: 'be committed to ～ing「～に全力で取り組む」。' },
    ],
  },
  {
    id: 'know-better-than',
    title: 'know better than to ～（～するほどばかではない）',
    points: [
      'know better than to ＋ 原形「～するほどばかではない・～しないだけの分別がある」：He knows better than to swim here.「彼はここで泳ぐようなばかなことはしない」。',
      'should have known better than to ～「～するなんてばかだった」と、過去の失敗をくやむ言い方もよく使う。You should know better.（もっと分別があるべきだ）のように than 以下を省くこともある。',
    ],
    examples: [
      { en: 'She knows better than to trust a stranger online.', ja: 'ネットの知らない人を信じるほど、彼女はばかではない。' },
      { en: 'I should have known better than to leave my bike unlocked.', ja: '自転車にかぎをかけずに置いておくなんて、ばかなことをした。' },
    ],
    questions: [
      { sentence: 'He knows better ___ to touch a hot pan.', choices: ['than', 'as', 'that', 'so'], answer: 0, why: 'know better than to ～「～するほどばかではない」。比較の than。' },
      { sentence: 'You should know better than ___ during the test.', choices: ['to talk', 'talking', 'talk', 'to talking'], answer: 0, why: 'know better than のあとは to ＋ 原形。' },
      { sentence: 'I should have known better than ___ him my password.', choices: ['to give', 'giving', 'gave', 'to giving'], answer: 0, why: 'should have known better than to ～「～するなんてばかだった」。than のあとは to ＋ 原形。' },
    ],
  },
  {
    id: 'reluctant-hesitate',
    title: 'be reluctant to ～ ／ hesitate to ～ ／ be inclined to ～（気が進まない・ためらう・～したい気がする）',
    points: [
      'be reluctant to ～「～したがらない・～する気が進まない」、hesitate to ～「～するのをためらう」。どちらも to ＋ 原形。Don\'t hesitate to ask.「えんりょなく聞いてね」はよく使う決まり文句。',
      'be inclined to ～「～したい気がする・～しがちだ」：I\'m inclined to agree.「賛成したい気持ちだ」。',
    ],
    examples: [
      { en: 'She was reluctant to speak in front of the class.', ja: '彼女はクラスの前で話すのに気が進まなかった。' },
      { en: 'If you have any questions, don\'t hesitate to ask.', ja: '質問があれば、えんりょなく聞いてください。' },
    ],
    questions: [
      { sentence: 'He was reluctant ___ his old car.', choices: ['to sell', 'selling', 'sell', 'to selling'], answer: 0, why: 'be reluctant to ＋ 原形「～したがらない」。' },
      { sentence: 'Please don\'t hesitate ___ me if you need help.', choices: ['to call', 'calling', 'call', 'for calling'], answer: 0, why: 'hesitate to ＋ 原形「～するのをためらう」。' },
      { sentence: 'I\'m ___ to agree with you, but let me think a little more.', choices: ['inclined', 'inclining', 'incline', 'to incline'], answer: 0, why: 'be inclined to ～「～したい気がする」。be のあとは形容詞のはたらきの inclined。' },
    ],
  },
  {
    id: 'end-up-ing',
    title: 'end up -ing（結局～することになる）',
    points: [
      'end up -ing「（予定とちがって）結局～することになる」：We ended up walking home.「結局歩いて帰ることになった」。to ＋ 原形は使わない。',
      'end up in / at ＋ 場所「結局～に行きつく」、end up with ～「結局～をかかえることになる」のようにも使う。',
    ],
    examples: [
      { en: 'We missed the last bus and ended up walking home.', ja: '最終バスに乗りおくれて、結局歩いて帰ることになった。' },
      { en: 'He took the wrong train and ended up in Osaka.', ja: '彼はちがう電車に乗って、結局大阪に着いてしまった。' },
    ],
    questions: [
      { sentence: 'It started to rain, so we ended up ___ the movie at home.', choices: ['watching', 'to watch', 'watched', 'to watching'], answer: 0, why: 'end up -ing「結局～することになる」。' },
      { sentence: 'I didn\'t plan to buy anything, but I ended up ___ three books.', choices: ['buying', 'to buy', 'bought', 'to buying'], answer: 0, why: 'end up のあとは -ing。to ＋ 原形は続かない。' },
      { sentence: 'She took a wrong turn and ended up ___ a small village.', choices: ['in', 'to', 'on', 'for'], answer: 0, why: 'end up in ＋ 場所「結局～に行きつく」。' },
    ],
  },
  {
    id: 'number-amount',
    title: '名詞の数と量（a large number of ／ a large amount of ／ a great deal of）',
    points: [
      'a large number of ＋ 数えられる名詞の複数形「たくさんの～（数）」：a large number of students。',
      'a large amount of ／ a great deal of ＋ 数えられない名詞「たくさんの～（量）」：a great deal of money / time。a lot of ・ plenty of はどちらにも使える。',
    ],
    examples: [
      { en: 'A large number of tourists visit this temple every year.', ja: '毎年たくさんの観光客がこの寺を訪れる。' },
      { en: 'This project needs a great deal of time.', ja: 'この計画にはたくさんの時間が必要だ。' },
    ],
    questions: [
      { sentence: 'He spent a great deal of ___ on the project.', choices: ['money', 'coins', 'dollars', 'bills'], answer: 0, why: 'a great deal of のあとは数えられない名詞。money は数えられない名詞、coins・dollars は複数形の数えられる名詞。' },
      { sentence: 'A large ___ of students joined the event.', choices: ['number', 'amount', 'deal', 'plenty'], answer: 0, why: 'students（数えられる名詞の複数形）には a large number of。amount・deal は量に使う。' },
      { sentence: 'There is a large amount of ___ in this lake.', choices: ['water', 'bottles', 'stones', 'trees'], answer: 0, why: 'a large amount of のあとは数えられない名詞。water。' },
    ],
  },
  {
    id: 'subject-verb-number',
    title: '主語と動詞の数の一致（A as well as B ／ either A or B ／ each of ～）',
    points: [
      'A as well as B が主語なら、動詞は A に合わせる：The teacher as well as the students is excited.（中心は the teacher）',
      'either A or B ・ neither A nor B ・ not only A but also B は、動詞を B（近いほう）に合わせる。each of ～・every ～ は単数あつかい：Each of the students has a tablet.',
    ],
    examples: [
      { en: 'My father, as well as my brothers, likes baseball.', ja: '兄たちだけでなく父も野球が好きだ。' },
      { en: 'Every student in this class has a dictionary.', ja: 'このクラスの生徒はみんな辞書を持っている。' },
    ],
    questions: [
      { sentence: 'The teacher, as well as the students, ___ excited about the trip.', choices: ['is', 'are', 'be', 'were'], answer: 0, why: 'A as well as B は A（the teacher）に合わせて is。' },
      { sentence: 'Either you or Ken ___ to clean the room.', choices: ['has', 'have', 'having', 'to have'], answer: 0, why: 'either A or B は近いほうの B（Ken・3人称単数）に合わせて has。' },
      { sentence: 'Each of the students ___ a tablet.', choices: ['has', 'have', 'having', 'are having'], answer: 0, why: 'each of ～ は「それぞれ」で単数あつかいなので has。' },
    ],
  },
  {
    id: 'perception-done',
    title: '知覚動詞 ＋ O ＋ 過去分詞（I heard my name called）',
    points: [
      'see / hear / feel ＋ O ＋ 過去分詞「O が～されるのを見る・聞く・感じる」：I heard my name called.「自分の名前が呼ばれるのが聞こえた」。O が「される」側なら過去分詞。',
      'O が「する」側なら原形か -ing：I heard him call my name.「彼が私の名前を呼ぶのが聞こえた」。',
    ],
    examples: [
      { en: 'I heard my name called at the station.', ja: '駅で自分の名前が呼ばれるのが聞こえた。' },
      { en: 'We saw the old building pulled down.', ja: '私たちはその古い建物が取りこわされるのを見た。' },
    ],
    questions: [
      { sentence: 'I heard my name ___ in the crowd.', choices: ['called', 'calling', 'call', 'to call'], answer: 0, why: '名前は「呼ばれる」側なので過去分詞 called。' },
      { sentence: 'She saw her bike ___ away by a stranger.', choices: ['taken', 'taking', 'take', 'to take'], answer: 0, why: '自転車は「持っていかれる」側なので過去分詞 taken。by a stranger もヒント。' },
      { sentence: 'He heard the window ___ by the strong wind.', choices: ['broken', 'breaking', 'break', 'to break'], answer: 0, why: '窓は風に「割られる」側なので過去分詞 broken。' },
    ],
  },
  {
    id: 'not-ing',
    title: '動名詞の否定 not -ing（～しないこと）',
    points: [
      '動名詞を否定するときは、-ing の直前に not（never）を置く：I\'m sorry for not calling you.「電話しなくてごめんね」。',
      '受け身の動名詞なら not being ＋ 過去分詞：She was sad about not being chosen.「選ばれなかったことが悲しかった」。不定詞の否定 not to ～ と同じく、not は打ち消したい語の前に置く。',
    ],
    examples: [
      { en: 'I\'m sorry for not answering your message.', ja: 'メッセージに返事をしなくてごめんなさい。' },
      { en: 'He is proud of never missing a practice.', ja: '彼は練習を一度も休まないことをほこりにしている。' },
    ],
    questions: [
      { sentence: 'I\'m sorry for ___ you back yesterday.', choices: ['not calling', 'calling not', "don't call", 'no calling'], answer: 0, why: '動名詞の否定は not ＋ -ing。前置詞 for のあとに don\'t call のような文の形は来ない。' },
      { sentence: 'She was angry about ___ invited to the party.', choices: ['not being', 'being not', 'not been', 'not be'], answer: 0, why: '「招待されなかったこと」は受け身の動名詞の否定 not being ＋ 過去分詞。' },
      { sentence: 'Thank you for ___ anyone about my secret.', choices: ['not telling', 'telling not', 'no telling', 'not tell'], answer: 0, why: '「だれにも言わないでくれたこと」は not ＋ -ing。' },
    ],
  },
  {
    id: 'wonder-if',
    title: 'I wonder if ～ ／ I was wondering if you could ～（～かなあ・～していただけませんか）',
    points: [
      'I wonder if (whether) ＋ 主語 ＋ 動詞「～かなあ」、I wonder ＋ 疑問詞 ＋ 主語 ＋ 動詞「～だろうか」：I wonder where he lives.（does he live の語順にしない）',
      'I was wondering if you could ～「～していただけないでしょうか」は、とてもていねいなお願い。',
    ],
    examples: [
      { en: 'I wonder if this shop is open on Sundays.', ja: 'この店は日曜日にあいているのかなあ。' },
      { en: 'I was wondering if you could check my essay.', ja: '私の作文を見ていただけないでしょうか。' },
    ],
    questions: [
      { sentence: 'I wonder ___ the museum is open on Mondays.', choices: ['if', 'what', 'who', 'that'], answer: 0, why: '「～かどうか」は if（whether）。what・who は the museum is open とつながらない。' },
      { sentence: 'I wonder where ___.', choices: ['he lives', 'does he live', 'lives he', 'does live he'], answer: 0, why: '疑問詞のあとは 主語 ＋ 動詞 の語順（間接疑問）。' },
      { sentence: 'I was wondering if you ___ help me with my report.', choices: ['could', 'can to', 'would to', 'should to'], answer: 0, why: 'I was wondering if you could ～「～していただけないでしょうか」。助動詞のあとに to は来ない。' },
    ],
  },
  {
    id: 'present-for-future',
    title: '現在進行形・現在形で未来を表す（I\'m leaving tomorrow ／ The train leaves at 7）',
    points: [
      'もう決まっている自分の予定は現在進行形で言える：I\'m meeting Ken tomorrow.「明日ケンに会う予定だ」。',
      '時刻表やカレンダーのように決まっている予定は現在形：The train leaves at 7:30.「電車は7時30分に出る」。The concert starts at six.',
    ],
    examples: [
      { en: 'We\'re having a party next Saturday.', ja: '次の土曜日にパーティーを開く予定だ。' },
      { en: 'The museum opens at nine tomorrow.', ja: '博物館は明日9時に開く。' },
    ],
    questions: [
      { sentence: 'Hurry up! The bus ___ in five minutes.', choices: ['leaves', 'left', 'has left', 'had left'], answer: 0, why: '時刻表で決まっている予定は現在形。in five minutes（5分後に）は未来なので過去形・現在完了は使えない。' },
      { sentence: 'I ___ my grandparents this weekend. I\'ve already bought the tickets.', choices: ['am visiting', 'visited', 'have visited', 'had visited'], answer: 0, why: 'this weekend（未来）の決まった予定は現在進行形。' },
      { sentence: 'What time ___ the movie start tonight?', choices: ['does', 'did', 'has', 'do'], answer: 0, why: '決まった予定は現在形。start は一般動詞なので疑問文は does。' },
    ],
  },
  {
    id: 'prep-phrases-purpose',
    title: '前置詞のまとまり（on purpose ／ by accident ／ in time ／ in advance）',
    points: [
      'on purpose「わざと」⇔ by mistake ／ by accident「まちがえて・偶然に」。前置詞をまちがえやすいので、まとまりで覚える。',
      'on time「時間どおりに」、in time (for ～)「（～に）間に合って」、in advance「前もって」。',
    ],
    examples: [
      { en: "I didn't do it on purpose. It was an accident.", ja: 'わざとやったんじゃないよ。たまたまなんだ。' },
      { en: 'We arrived just in time for the train.', ja: '私たちは電車にぎりぎり間に合った。' },
    ],
    questions: [
      { sentence: 'He broke the window ___ purpose.', choices: ['on', 'by', 'in', 'with'], answer: 0, why: 'on purpose「わざと」。by・in purpose とは言わない。' },
      { sentence: 'Sorry, I took your umbrella ___ mistake.', choices: ['by', 'on', 'in', 'with'], answer: 0, why: 'by mistake「まちがえて」。' },
      { sentence: 'Please buy your tickets ___ advance.', choices: ['in', 'on', 'by', 'at'], answer: 0, why: 'in advance「前もって」。' },
    ],
  },
  {
    id: 'linking-phrases',
    title: '接続詞のように文をつなぐ言葉（as a result ／ in fact ／ on the other hand ／ after all）',
    points: [
      'as a result「その結果」、in fact「実は・実際は」、on the other hand「一方で・その反面」、after all「結局・なんといっても」。前置詞や単数・複数をまちがえやすいので、まとまりで覚える。',
      'どれも文の最初に置いてコンマで区切ることが多い：It rained hard. As a result, the game was canceled.',
    ],
    examples: [
      { en: 'I practiced every day. As a result, I won the speech contest.', ja: '毎日練習した。その結果、スピーチコンテストで優勝した。' },
      { en: 'I thought the test would be hard. In fact, it was quite easy.', ja: 'テストは難しいと思っていた。実際は、かなりやさしかった。' },
    ],
    questions: [
      { sentence: 'It snowed all night. ___ a result, the trains stopped.', choices: ['As', 'For', 'By', 'In'], answer: 0, why: 'as a result「その結果」。for・by a result とは言わない。' },
      { sentence: 'Ken looks quiet. ___ fact, he is very funny.', choices: ['In', 'On', 'At', 'By'], answer: 0, why: 'in fact「実は」。' },
      { sentence: 'City life is exciting. On the other ___, it can be stressful.', choices: ['hand', 'hands', 'handed', 'side'], answer: 0, why: 'on the other hand「一方で」。hand は単数。' },
    ],
  },
  {
    id: 'at-first-last',
    title: '前置詞 at・in を使う時の言葉（at first ／ at last ／ in the end）',
    points: [
      'at first「最初は（あとで変わる）」：At first I was nervous, but soon I enjoyed it. first of all「まず第一に（順番に言うとき）」とはちがう。',
      'at last「（待ちに待って）ついに」、in the end「結局・最後には」。どれも the や -ly はつけない決まった形。',
    ],
    examples: [
      { en: 'At first I couldn\'t swim, but now I can swim 100 meters.', ja: '最初は泳げなかったが、今は100メートル泳げる。' },
      { en: 'After many tries, he passed the test at last.', ja: '何度も挑戦して、彼はついに合格した。' },
    ],
    questions: [
      { sentence: 'At ___, I didn\'t like natto, but now I love it.', choices: ['first', 'firstly', 'the first', 'last'], answer: 0, why: 'at first「最初は」。firstly・the first にはしない。' },
      { sentence: 'We waited for two hours, and at ___ the bus came.', choices: ['last', 'the last', 'lastly', 'first'], answer: 0, why: 'at last「ついに」。' },
      { sentence: 'We talked about it for a long time. In the ___, we chose the blue one.', choices: ['end', 'ending', 'ends', 'way'], answer: 0, why: 'in the end「結局」。' },
    ],
  },
  {
    id: 'too-to-so-that',
    title: 'too ～ to … ＝ so ～ that … can\'t（文の書きかえ）',
    points: [
      'too ～ to …「～すぎて…できない」＝ so ～ that ＋ 主語 ＋ can\'t …：This box is too heavy to carry. ＝ This box is so heavy that I can\'t carry it.（so ～ that の文では carry の目的語 it が必要）',
      '～ enough to …「…できるほど～」＝ so ～ that ＋ 主語 ＋ can …。過去の文なら could / couldn\'t にする。',
    ],
    examples: [
      { en: 'The river was too cold to swim in. ＝ The river was so cold that we couldn\'t swim in it.', ja: 'その川は冷たすぎて泳げなかった。' },
      { en: 'She is kind enough to help everyone. ＝ She is so kind that she helps everyone.', ja: '彼女はとても親切で、みんなを助ける。' },
    ],
    questions: [
      { sentence: 'The tea was so hot that I ___ drink it.', choices: ["couldn't", "can't to", 'not could', 'could not to'], answer: 0, why: '過去の文なので so ～ that ＋ 主語 ＋ couldn\'t。can\'t のあとに to は来ない。' },
      { sentence: 'This question is too difficult for me to answer. ＝ This question is so difficult that I can\'t answer ___.', choices: ['it', 'itself', 'its', 'them'], answer: 0, why: 'so ～ that の文では answer の目的語 it が必要。' },
      { sentence: 'He was rich enough to buy the house. ＝ He was so rich that he ___ buy the house.', choices: ['could', 'can to', 'could to', 'would to'], answer: 0, why: 'enough to ＝ so ～ that ＋ 主語 ＋ can（過去なら could）。助動詞のあとに to は来ない。' },
    ],
  },
  {
    id: 'want-done',
    title: '物 ＋ 過去分詞で「～してほしい」（I\'d like my hair cut short）',
    points: [
      'want ＋ 物 ＋ 過去分詞「物を～してもらいたい（～された状態にしたい）」：I want this shirt washed by tomorrow.',
      'would like ＋ 物 ＋ 過去分詞 はていねいな言い方：I\'d like my hair cut short.「髪を短く切ってほしい」。物は「される」側なので過去分詞。',
    ],
    examples: [
      { en: 'I want these photos printed by Monday.', ja: 'これらの写真を月曜日までに印刷してほしい。' },
      { en: "I'd like my steak cooked well, please.", ja: 'ステーキはよく焼いてください。' },
    ],
    questions: [
      { sentence: 'I want this letter ___ by Friday.', choices: ['sent', 'sending', 'to sending', 'to send'], answer: 0, why: '手紙は「送られる」側なので過去分詞 sent。' },
      { sentence: "I'd like my coffee ___ with milk, please.", choices: ['served', 'serving', 'serve', 'to serve'], answer: 0, why: 'コーヒーは「出される」側なので過去分詞 served。' },
      { sentence: 'She wanted her room ___ before the guests came.', choices: ['cleaned', 'cleaning', 'to cleaning', 'to clean'], answer: 0, why: '部屋は「そうじされる」側なので過去分詞 cleaned。' },
    ],
  },
  {
    id: 'negative-question',
    title: '否定疑問文と答え方（Don\'t you like ～? — No, I don\'t.）',
    points: [
      'Don\'t you ～? ／ Aren\'t you ～? ／ Can\'t you ～?「～しないの？・～ではないの？」は否定疑問文。おどろきや確認の気持ちを表す。',
      '答えは日本語の「はい・いいえ」ではなく、答えの内容が肯定なら Yes、否定なら No：Don\'t you like coffee? — No, I don\'t.「うん、好きじゃない」／ Yes, I do.「いや、好きだよ」。',
    ],
    examples: [
      { en: "Isn't this your bag? — Yes, it is. Thank you.", ja: 'これ、あなたのかばんじゃない？ — うん、そうだよ。ありがとう。' },
      { en: "Can't you swim? — No, I can't.", ja: '泳げないの？ — うん、泳げないんだ。' },
    ],
    questions: [
      { sentence: "Don't you like natto? — ___, I don't. I can't eat it.", choices: ['No', 'Yes', 'Not', 'Never'], answer: 0, why: '答えの内容が「好きではない（否定）」なので No, I don\'t.。Yes のあとに I don\'t は続かない。' },
      { sentence: "Aren't you tired? — ___, I am. I walked for three hours.", choices: ['Yes', 'No', 'Not', 'Never'], answer: 0, why: '答えの内容が「疲れている（肯定）」なので Yes, I am.。' },
      { sentence: '___ you go to the party last night?', choices: ["Didn't", "Don't", "Weren't", "Hadn't"], answer: 0, why: 'last night（過去）で、go は一般動詞なので Didn\'t you go ～?。' },
    ],
  },
  {
    id: 'some-of-whom',
    title: '関係代名詞と数の言葉（some of whom ／ most of which）',
    points: [
      '名詞のあとにコンマ ＋ some / most / all / both / none ＋ of whom（人）・of which（物）を続けて、「そのうちの～は」と説明できる：I have three brothers, all of whom live in Tokyo.',
      'of のあとなので、人は who ではなく whom、物は which（that は使えない）。コンマのあとに them / it を使うと文が2つのままつながらない。',
    ],
    examples: [
      { en: 'I have many friends, most of whom live near my house.', ja: '私にはたくさん友だちがいて、そのほとんどは家の近くに住んでいる。' },
      { en: 'He wrote five books, two of which became best sellers.', ja: '彼は本を5冊書き、そのうち2冊はベストセラーになった。' },
    ],
    questions: [
      { sentence: 'She has two sisters, both of ___ are teachers.', choices: ['whom', 'who', 'them', 'they'], answer: 0, why: '人を受けて of のあとなので whom。them だとコンマだけで文がつながってしまう。' },
      { sentence: 'I bought ten apples, some of ___ were rotten.', choices: ['which', 'that', 'what', 'them'], answer: 0, why: '物を受けて of のあとなので which。that・what はこの形では使えない。' },
      { sentence: 'There were forty students, most ___ whom passed the test.', choices: ['of', 'for', 'in', 'with'], answer: 0, why: 'most of whom「そのうちのほとんど」。' },
    ],
  },
  {
    id: 'that-of-those-of',
    title: '比較で使う that of ／ those of（名詞のくり返しをさける）',
    points: [
      '比べるものをそろえるため、前に出た名詞のくり返しに that（単数・数えられない名詞）を使う：The population of Tokyo is larger than that of Osaka.（that ＝ the population。人口と人口を比べる）',
      '複数の名詞なら those：The ears of a rabbit are longer than those of a cat.（those ＝ the ears）',
    ],
    examples: [
      { en: 'The weather in Okinawa is warmer than that in Hokkaido.', ja: '沖縄の天気は北海道の天気よりあたたかい。' },
      { en: 'The prices at this store are lower than those at the station.', ja: 'この店の値段は駅の店の値段より安い。' },
    ],
    questions: [
      { sentence: 'The climate of Japan is milder than ___ of Canada.', choices: ['that', 'those', 'it', 'one'], answer: 0, why: 'the climate（単数）のくり返しなので that。' },
      { sentence: 'The prices in this shop are lower than ___ in that shop.', choices: ['those', 'that', 'them', 'it'], answer: 0, why: 'the prices（複数）のくり返しなので those。' },
      { sentence: 'The tail of this dog is longer than that ___ my dog.', choices: ['of', 'for', 'in', 'with'], answer: 0, why: 'that of ～「～のそれ（しっぽ）」。' },
    ],
  },
  {
    id: 'something-wrong-with',
    title: 'There is something wrong with ～（～の調子がおかしい）',
    points: [
      'There is something wrong with ～「～はどこか調子がおかしい」：There is something wrong with my bike.。-thing のあとに形容詞 wrong を置く語順に注意。',
      'What\'s wrong with ～?「～はどうしたの？」、Nothing is wrong with ～「～はどこも悪くない」も同じ形。体調を心配して What\'s wrong? だけでも使う。',
    ],
    examples: [
      { en: 'There is something wrong with this printer.', ja: 'このプリンターはどこか調子がおかしい。' },
      { en: "What's wrong? You look pale.", ja: 'どうしたの？顔色が悪いよ。' },
    ],
    questions: [
      { sentence: 'There is something wrong ___ my bike.', choices: ['with', 'for', 'to', 'by'], answer: 0, why: 'something wrong with ～「～はどこかおかしい」。' },
      { sentence: '___ is wrong with you? You look tired.', choices: ['What', 'How', 'Which', 'Who'], answer: 0, why: 'What\'s wrong with ～?「～はどうしたの？」。' },
      { sentence: 'The doctor said nothing was wrong ___ my heart.', choices: ['with', 'of', 'at', 'by'], answer: 0, why: 'nothing is wrong with ～「～はどこも悪くない」。' },
    ],
  },
  {
    id: 'be-expected-to',
    title: '受け身 ＋ to 不定詞（be expected to ／ be required to ／ be forced to）',
    points: [
      'expect / require / force / allow ＋ 人 ＋ to ～ を受け身にすると、人 ＋ be expected to ～ の形になる：Students are required to wear uniforms.「生徒は制服を着ることが求められている」。',
      'be expected to ～「～すると期待されている・～する予定だ」、be required to ～「～しなければならない（決まり）」、be forced to ～「～せざるをえない」。',
    ],
    examples: [
      { en: 'The new bridge is expected to open next year.', ja: '新しい橋は来年開通する予定だ。' },
      { en: 'Because of the heavy snow, we were forced to stay home.', ja: '大雪のせいで、私たちは家にいるしかなかった。' },
    ],
    questions: [
      { sentence: 'All students are required ___ their ID cards.', choices: ['to bring', 'bringing', 'bring', 'to bringing'], answer: 0, why: 'be required to ＋ 原形「～することが求められる」。' },
      { sentence: 'The new station is expected ___ next spring.', choices: ['to open', 'opening', 'open', 'to opening'], answer: 0, why: 'be expected to ＋ 原形「～する予定だ・～すると見こまれている」。' },
      { sentence: 'Because of the storm, we were ___ to cancel the trip.', choices: ['forced', 'forcing', 'force', 'forcibly'], answer: 0, why: 'be forced to ～「～せざるをえない」。受け身なので過去分詞 forced。' },
    ],
  },
  {
    id: 'is-believed-to',
    title: 'It is believed that ～ ＝ S is believed to ～（～と考えられている）',
    points: [
      'It is believed (thought / reported) that S V ＝ S is believed (thought / reported) to V「S は～と信じられている（考えられている・報じられている）」。It is said that ～ と同じ形。',
      'that のあとの時制が前（過去）なら to have ＋ 過去分詞：It is thought that the castle was built 400 years ago. ＝ The castle is thought to have been built 400 years ago.',
    ],
    examples: [
      { en: 'It is believed that this tree is over 1,000 years old.', ja: 'この木は樹齢1000年をこえると考えられている。' },
      { en: 'The painting is thought to have been stolen in 1990.', ja: 'その絵は1990年にぬすまれたと考えられている。' },
    ],
    questions: [
      { sentence: 'It is believed ___ the city was founded 1,000 years ago.', choices: ['that', 'to', 'for', 'which'], answer: 0, why: 'うしろが文なので It is believed that ～。' },
      { sentence: 'The singer is thought ___ the best song of the year last year.', choices: ['to have written', 'to writing', 'written', 'to write'], answer: 0, why: '書いたのは過去（last year）なので to have ＋ 過去分詞。' },
      { sentence: 'Ten people are reported ___ in the accident.', choices: ['to have been hurt', 'to hurt', 'hurting', 'to be hurting'], answer: 0, why: '「けがをした（過去・受け身）と報じられている」は to have been ＋ 過去分詞。' },
    ],
  },
  {
    id: 'part-of-verb',
    title: '部分を表す言葉と動詞の形（half of ／ the rest of ／ most of ＋ 名詞）',
    points: [
      'half of ／ the rest of ／ most of ／ some of ／ all of ＋ 名詞 が主語のとき、動詞は of のあとの名詞に合わせる。',
      '数えられない名詞・単数なら単数あつかい：The rest of the money is in the bank.。複数の名詞なら複数あつかい：Half of the students were absent.',
    ],
    examples: [
      { en: 'Most of the books in this room are mine.', ja: 'この部屋の本のほとんどは私のものだ。' },
      { en: 'Half of the pizza was eaten in five minutes.', ja: 'ピザの半分は5分で食べられてしまった。' },
    ],
    questions: [
      { sentence: 'Half of the students ___ absent today.', choices: ['were', 'was', 'is', 'has been'], answer: 0, why: 'of のあとの the students（複数）に合わせて were。' },
      { sentence: 'The rest of the cake ___ in the fridge.', choices: ['is', 'are', 'were', 'have'], answer: 0, why: 'of のあとの the cake（単数）に合わせて is。' },
      { sentence: 'Most of the water in the lake ___ clean.', choices: ['is', 'are', 'were', 'are being'], answer: 0, why: 'water は数えられない名詞なので単数あつかいの is。' },
    ],
  },
  {
    id: 'easy-to-read',
    title: 'This book is easy to read の形（主語が to ～ の目的語になる）',
    points: [
      'It is easy to read this book. ＝ This book is easy to read.「この本は読みやすい」。主語の this book は read の目的語なので、read のあとに it を置かない。',
      'easy / hard / difficult / dangerous / pleasant などで使う。前置詞が必要な動詞は前置詞を残す：This river is dangerous to swim in.「この川は泳ぐと危ない」。',
    ],
    examples: [
      { en: 'This map is easy to understand.', ja: 'この地図はわかりやすい。' },
      { en: 'My teacher is easy to talk to.', ja: '私の先生は話しかけやすい。' },
    ],
    questions: [
      { sentence: 'This question is difficult ___.', choices: ['to answer', 'to answer it', 'answering it', 'to answering'], answer: 0, why: '主語の this question が answer の目的語なので、うしろに it を置かない。' },
      { sentence: 'This river is dangerous to swim ___.', choices: ['in', 'it', 'on it', 'to it'], answer: 0, why: 'swim in the river の in を残す：dangerous to swim in。' },
      { sentence: 'Ken is easy ___ with.', choices: ['to talk', 'talking', 'to talk to', 'to talk at'], answer: 0, why: 'talk with Ken の with を残す形：easy to talk with。' },
    ],
  },
  {
    id: 'reported-statement',
    title: '平叙文・命令文の間接話法（時制をずらす：He told me that he was busy）',
    points: [
      '直接話法 He said to me, "I am busy." → 間接話法 He told me (that) he was busy.。said to ＋ 人 は told ＋ 人 に、動詞の時制を1つ過去にずらし、I は he など、話した人に合わせる。will は would になる。',
      '命令文は tell ＋ 人 ＋ to ～：She said to me, "Close the door." → She told me to close the door.。否定の命令文は tell ＋ 人 ＋ not to ～。',
    ],
    examples: [
      { en: 'Mika told me that she had a cold.', ja: 'ミカは私に、かぜをひいていると言った。' },
      { en: 'The teacher told us not to run in the hall.', ja: '先生は私たちに、ろうかを走らないようにと言った。' },
    ],
    questions: [
      { sentence: 'Ken said to me yesterday, "I am tired." → Ken told me that he ___ tired.', choices: ['was', 'am', 'be', 'being'], answer: 0, why: '時制を過去にずらし、主語 he に合わせて was。' },
      { sentence: 'She said to me, "Close the window." → She told me ___ the window.', choices: ['to close', 'closing', 'closed', 'to closing'], answer: 0, why: '命令文の間接話法は tell ＋ 人 ＋ to ＋ 原形。' },
      { sentence: 'He said to us, "I will help you." → He told us that he ___ help us.', choices: ['would', 'will to', 'shall to', 'would to'], answer: 0, why: 'will を過去にずらして would。助動詞のあとに to は来ない。' },
    ],
  },
  {
    id: 'since-as-reason',
    title: '理由を表す接続詞 since ／ as（～なので）',
    points: [
      'since・as も because と同じく「～なので」と理由を表せる。相手も知っている理由を、文の最初で言うときによく使う：Since it was raining, we stayed home.',
      'since には「～以来」、as には「～するとき・～のように」の意味もあるので、文の流れで見分ける。because of ／ due to ／ despite のあとは名詞で、文は続かない。',
    ],
    examples: [
      { en: 'As it was getting dark, we decided to go home.', ja: '暗くなってきたので、私たちは家に帰ることにした。' },
      { en: 'Since you are free today, why don\'t we go shopping?', ja: '今日はひまなんだから、買い物に行かない？' },
    ],
    questions: [
      { sentence: '___ it was raining, we stayed home.', choices: ['Since', 'Because of', 'During', 'Although'], answer: 0, why: 'うしろが文（it was raining）なので接続詞 Since「～なので」。because of・during のあとは名詞。' },
      { sentence: '___ you are tired, you should go to bed early.', choices: ['As', 'Despite', 'Due to', 'Because of'], answer: 0, why: 'うしろが文なので接続詞 As「～なので」。despite・due to のあとは名詞。' },
      { sentence: 'I have lived in this town ___ 2015.', choices: ['since', 'as', 'because', 'for'], answer: 0, why: '現在完了と「2015年以来」なので since（ここは理由ではなく「～以来」）。' },
    ],
  },
  {
    id: 'go-for-on',
    title: '前置詞で決まる go のまとまり（go for a walk ／ go on a trip ／ go to bed）',
    points: [
      'go for a ＋ 名詞「～をしに出かける」：go for a walk（散歩に行く）・go for a swim・go for a drive。',
      'go on a ＋ 名詞「（旅行・遠足など）に出かける」：go on a trip・go on a picnic。go to bed（寝る）・go to school（学校へ行く）は the をつけない。',
    ],
    examples: [
      { en: "Let's go for a walk in the park.", ja: '公園に散歩に行こう。' },
      { en: 'Our class went on a trip to Kyoto.', ja: '私たちのクラスは京都へ旅行に出かけた。' },
    ],
    questions: [
      { sentence: 'Let’s go ___ a walk after lunch.', choices: ['for', 'to', 'in', 'at'], answer: 0, why: 'go for a walk「散歩に行く」。' },
      { sentence: 'Last Sunday we went ___ a picnic by the river.', choices: ['on', 'with', 'at', 'into'], answer: 0, why: 'go on a picnic「ピクニックに出かける」（go on a trip も同じ on）。' },
      { sentence: 'It’s late. You should go ___ bed now.', choices: ['to', 'for', 'on', 'in'], answer: 0, why: 'go to bed「寝る」（the はつけない）。' },
    ],
  },
  {
    id: 'regard-as',
    title: 'regard A as B と受け身 be regarded as（A を B とみなす・考える）',
    points: [
      'regard A as B ／ think of A as B ／ see A as B ／ look on A as B「A を B とみなす・考える」。as のあとは名詞か形容詞。',
      '受け身でもよく使う：He is regarded as the best player on the team.「彼はチームでいちばんの選手だとみなされている」。',
    ],
    examples: [
      { en: 'Many people regard this book as a classic.', ja: '多くの人がこの本を名作だと考えている。' },
      { en: 'I think of my coach as a second father.', ja: '私はコーチを第二の父だと思っている。' },
    ],
    questions: [
      { sentence: 'Many people regard him ___ a national hero.', choices: ['as', 'for', 'to', 'like'], answer: 0, why: 'regard A as B「A を B とみなす」（see / view / think of A as B も同じ as）。' },
      { sentence: 'I think ___ her as my own sister.', choices: ['of', 'to', 'for', 'with'], answer: 0, why: 'think of A as B「A を B だと考える」。' },
      { sentence: 'This castle is regarded ___ one of the most beautiful in Japan.', choices: ['as', 'that', 'for', 'to be as'], answer: 0, why: '受け身 be regarded as ～「～とみなされている」。' },
    ],
  },
  {
    id: 'it-is-pity-that',
    title: '接続詞 that を使う形式主語 It is ～ that …（It is a pity that ～ ／ It is natural that ～）',
    points: [
      'It is ＋ 形容詞・名詞 ＋ that ＋ 文「…ということは～だ」：It is natural that he is angry.「彼がおこるのは当然だ」。It は that 以下を指す形式主語。',
      'It is a pity that ～「～とは残念だ」、It is strange that ～「～とはふしぎだ」。おどろきや気持ちを強めて should を使うこともある：It is strange that he should say so.',
    ],
    examples: [
      { en: "It is a pity that you can't come with us.", ja: 'あなたがいっしょに来られないのは残念だ。' },
      { en: 'It is natural that parents worry about their children.', ja: '親が子どものことを心配するのは当然だ。' },
    ],
    questions: [
      { sentence: '___ is a pity that you can’t come to the party.', choices: ['It', 'This', 'There', 'That'], answer: 0, why: 'that 以下を指す形式主語は It。' },
      { sentence: 'It is natural ___ she is proud of her son.', choices: ['that', 'what', 'which', 'whether'], answer: 0, why: 'It is ～ that ＋ 完全な文。what / which はうしろに欠けた名詞が必要。' },
      { sentence: 'It is strange that he ___ say such a thing.', choices: ['should', 'shall to', 'would to', 'must to'], answer: 0, why: '感情・判断を表す It is ～ that のあとの should（意外さを強める）。助動詞のあとに to は来ない。' },
    ],
  },
  {
    id: 'these-days-tense',
    title: '時を表す言葉と時制（these days ／ in those days ／ the other day）',
    points: [
      'these days / nowadays「このごろ・最近は」は現在形・現在進行形といっしょに使う：These days many people work from home.',
      'in those days「そのころは」・the other day「先日」は過去の時なので過去形：I met Ken the other day.（現在完了は使わない）',
    ],
    examples: [
      { en: 'Nowadays, many students study with tablets.', ja: '最近は、多くの生徒がタブレットで勉強している。' },
      { en: 'In those days, my grandfather lived by the sea.', ja: 'そのころ、祖父は海のそばに住んでいた。' },
    ],
    questions: [
      { sentence: 'These days, more and more people ___ bikes to work.', choices: ['ride', 'rode', 'had ridden', 'were riding'], answer: 0, why: 'these days「このごろ」は現在のことなので現在形。' },
      { sentence: 'I ___ Ken at the station the other day.', choices: ['saw', 'have seen', 'see', 'have been seeing'], answer: 0, why: 'the other day「先日」は過去の時なので過去形。現在完了は過去の一時点を表す語といっしょに使えない（入試頻出）。' },
      { sentence: 'In those days, there ___ no smartphones.', choices: ['were', 'are', 'have been', 'will be'], answer: 0, why: 'in those days「そのころは」は過去なので were。' },
    ],
  },
  {
    id: 'prep-in-manner',
    title: '前置詞 in の使い方（in English ／ in a loud voice ／ the girl in red）',
    points: [
      'in ＋ 言語・声・道具「～で」：in English（英語で）・in a loud voice（大きな声で）・in pen（ペンで）。by English とは言わない。',
      'in ＋ 色・服「～を着た」：the girl in red（赤い服の女の子）・a man in a black suit。be dressed in ～「～を着ている」。',
    ],
    examples: [
      { en: 'Please fill out this form in pen.', ja: 'この用紙はペンで記入してください。' },
      { en: 'The woman in the blue coat is my aunt.', ja: '青いコートの女性は私のおばです。' },
    ],
    questions: [
      { sentence: 'Please write your answers ___ English, not Japanese.', choices: ['in', 'by', 'with', 'on'], answer: 0, why: '言語を表す「英語で」は in English。' },
      { sentence: 'The teacher read the story ___ a loud voice so that everyone could hear.', choices: ['in', 'by', 'with', 'on'], answer: 0, why: '「大きな声で」は in a loud voice。' },
      { sentence: 'Who is the woman ___ the red dress?', choices: ['in', 'on', 'at', 'with of'], answer: 0, why: '「赤いドレスを着た」は in the red dress（着ているものの in）。' },
    ],
  },
  {
    id: 'congratulate-on',
    title: '動詞 ＋ 人 ＋ 前置詞（congratulate A on B ／ praise A for B）',
    points: [
      'congratulate A on B「A の B を祝う」：I congratulated her on her success.。名詞の Congratulations on ～! も on。',
      'praise A for B「A を B のことでほめる」、thank A for B「A に B のお礼を言う」。前置詞のあとに動詞を置くなら -ing。',
    ],
    examples: [
      { en: 'Everyone congratulated Ken on passing the exam.', ja: 'みんながケンの合格を祝った。' },
      { en: 'The coach praised us for our teamwork.', ja: 'コーチは私たちのチームワークをほめてくれた。' },
    ],
    questions: [
      { sentence: 'We all congratulated Ken ___ winning the race.', choices: ['on', 'for', 'to', 'at'], answer: 0, why: 'congratulate 人 on ～「人の～を祝う」。praise / thank 人 for と前置詞がちがうので注意（入試頻出）。' },
      { sentence: 'The coach praised the players ___ their hard work.', choices: ['for', 'on', 'to', 'at'], answer: 0, why: 'praise 人 for ～「～のことで人をほめる」。' },
      { sentence: 'She thanked me for ___ her with her homework.', choices: ['helping', 'help', 'to help', 'helped'], answer: 0, why: '前置詞 for のあとは動名詞 helping。' },
    ],
  },
  {
    id: 'sense-like-noun',
    title: '前置詞 like を使う感覚の動詞（sound like ／ smell like ／ taste like ＋ 名詞）',
    points: [
      'look / sound / smell / taste / feel ＋ like ＋ 名詞「～のように見える・聞こえる・～のにおいがする・～の味がする・～のように感じる」：That sounds like a good idea.',
      'うしろが形容詞なら like はいらない：That sounds good. ／ It smells sweet.。like のあとは名詞、形容詞を続けるときは like をつけない。',
    ],
    examples: [
      { en: 'This tea smells like flowers.', ja: 'このお茶は花のようなにおいがする。' },
      { en: 'It sounds like fun. Can I join you?', ja: '楽しそうだね。いっしょに行ってもいい？' },
    ],
    questions: [
      { sentence: 'That ___ like a great idea!', choices: ['sounds', 'sounds to', 'is sounding to', 'hears'], answer: 0, why: 'sound like ＋ 名詞「～のように聞こえる（～みたいだね）」。hear は「聞く」側の動詞で、この形にはならない。' },
      { sentence: 'This candy tastes ___ strawberries.', choices: ['like', 'as', 'to', 'of like'], answer: 0, why: '名詞の前なので taste like ～「～の味がする」。' },
      { sentence: 'Your plan sounds ___.', choices: ['interesting', 'like interesting', 'interestingly', 'to interesting'], answer: 0, why: '形容詞なら sound ＋ 形容詞で like はつけない。副詞の interestingly は補語にならない。' },
    ],
  },
  {
    id: 'enough-position',
    title: 'enough の位置（名詞の前・形容詞のうしろ：enough money ／ old enough）',
    points: [
      '名詞には enough を前に置く：enough money / enough time。形容詞・副詞には うしろに置く：old enough / fast enough。',
      'enough ＋ 名詞 ＋ to ～「～するのに十分な…」：We have enough time to finish it.。形容詞 ＋ enough to ～：He is old enough to drive.',
    ],
    examples: [
      { en: 'Do we have enough chairs for everyone?', ja: 'みんなの分のいすは足りていますか。' },
      { en: 'She ran fast enough to catch the bus.', ja: '彼女はバスに間に合うくらい速く走った。' },
    ],
    questions: [
      { sentence: 'We don’t have ___ to buy a new car this year.', choices: ['enough money', 'money enoughly', 'enoughly money', 'money of enough'], answer: 0, why: '名詞の前に enough を置く（enough money）。' },
      { sentence: 'He isn’t ___ to drive a car yet.', choices: ['old enough', 'enough old', 'enough age', 'old as enough'], answer: 0, why: '形容詞・副詞の場合はうしろに enough を置く（old enough）。' },
      { sentence: 'The room wasn’t ___ for all the guests, so some had to stand outside.', choices: ['big enough', 'enough big', 'enough bigger', 'as big enough'], answer: 0, why: '形容詞 big のうしろに enough。' },
    ],
  },
  {
    id: 'as-as-ever',
    title: '比較 as ～ as ever ／ as ～ as any（相変わらず・どれにも負けないほど）',
    points: [
      'as ～ as ever「相変わらず～」：She is as kind as ever.「彼女は相変わらず親切だ」。',
      'as ～ as any ＋ 単数名詞 ／ as ～ as anyone「どの…にも負けないほど～」（最上級に近い意味）：He is as good a player as any on the team.（as ＋ 形容詞 ＋ a ＋ 名詞 の語順に注意）',
    ],
    examples: [
      { en: 'My grandfather is as busy as ever.', ja: '祖父は相変わらずいそがしい。' },
      { en: 'This park is as beautiful as any in the city.', ja: 'この公園は町のどの公園にも負けないほど美しい。' },
    ],
    questions: [
      { sentence: 'My grandmother is ninety, but she is as healthy as ___.', choices: ['ever', 'never', 'always', 'before of'], answer: 0, why: 'as ～ as ever「相変わらず～」。' },
      { sentence: 'He works as hard as ___ student in his class.', choices: ['any', 'all', 'each of', 'every of'], answer: 0, why: 'as ～ as any ＋ 単数名詞「どの…にも負けないほど～」（最上級に近い意味）。' },
      { sentence: 'She is as good ___ as anyone in the club.', choices: ['a singer', 'singer', 'an singer', 'the singers'], answer: 0, why: 'as ＋ 形容詞 ＋ a ＋ 名詞 ＋ as の語順。singer は数えられる名詞なので a が必要。' },
    ],
  },
  {
    id: 'judgment-to',
    title: '不定詞の「～するなんて」判断の理由（You were careless to leave it）',
    points: [
      '主語 ＋ be ＋ 人の性質の形容詞 ＋ to ～ の to ～ は「～するなんて」と、そう判断した理由を表す：You were careless to leave your bag on the train.「電車にかばんを置き忘れるなんて不注意だったね」。',
      'must be ～ to …「…するなんて～にちがいない」：He must be rich to buy such an expensive car.。It is careless of you to ～ と書きかえられる。',
    ],
    examples: [
      { en: 'You were very kind to show me the way.', ja: '道を教えてくださるなんて、とても親切ですね。' },
      { en: 'She must be clever to solve that problem so quickly.', ja: 'あの問題をあんなに速く解くなんて、彼女はかしこいにちがいない。' },
    ],
    questions: [
      { sentence: 'It was very kind of you ___ me with my heavy bag.', choices: ['to help', 'helping', 'help', 'helped'], answer: 0, why: 'It is kind of 人 to ～「～してくれるなんて人は親切だ」。' },
      { sentence: 'He must be very tired ___ asleep on the noisy train.', choices: ['to fall', 'falling', 'fall', 'fell'], answer: 0, why: 'must be ～ to …「…するなんて～にちがいない」。判断の根拠を表す不定詞。' },
      { sentence: 'She was careless ___ her umbrella on the train again.', choices: ['to leave', 'leaving', 'left', 'leaves'], answer: 0, why: '「また置き忘れるなんて不注意だった」。判断の理由の to ＋ 原形。' },
    ],
  },
  {
    id: 'adj-prep-2',
    title: '形容詞 ＋ 前置詞 ②（be fond of ／ be tired of ／ be poor at）',
    points: [
      'be fond of ～「～が好きだ」、be tired of ～「～にあきている・うんざりしている」、be poor at ～「～が苦手だ」（⇔ be good at ～）。',
      '前置詞のあとに動詞を置くなら -ing：I\'m tired of waiting.「待つのにはうんざりだ」。be tired from ～ は「～でつかれている」で意味がちがう。',
    ],
    examples: [
      { en: 'My grandfather is fond of old movies.', ja: '祖父は古い映画が好きだ。' },
      { en: "I'm poor at singing, but I love music.", ja: '私は歌うのは苦手だけど、音楽は大好きだ。' },
    ],
    questions: [
      { sentence: 'My sister is very fond ___ cats.', choices: ['of', 'with', 'to', 'for'], answer: 0, why: 'be fond of ～「～が好きだ」。' },
      { sentence: 'I’m tired ___ eating the same food every day.', choices: ['of', 'from', 'at', 'with'], answer: 0, why: 'be tired of ～「～にあきている」。be tired from ～ は「～でつかれている」で意味がちがう。' },
      { sentence: 'Ken is poor ___ drawing, but he is good at music.', choices: ['at', 'to', 'on', 'for'], answer: 0, why: 'be poor at ～「～が苦手だ」（⇔ be good at）。' },
    ],
  },
  {
    id: 'adj-prep-3',
    title: '形容詞 ＋ 前置詞 ③（be absent from ／ be late for ／ be kind to）',
    points: [
      'be absent from ～「～を休む・欠席する」、be late for ～「～に遅れる」、be kind to ～「～に親切だ」。前置詞は形容詞ごとに決まっているので、セットで覚える。',
      '前置詞のあとは名詞か -ing：Don\'t be late for the meeting.。be kind to ～ は「人に対して」、It is kind of you to ～ は「～してくれるなんて親切ですね」で形がちがう。',
    ],
    examples: [
      { en: 'Yuki was absent from school yesterday because of a cold.', ja: 'ユキはかぜで昨日学校を休んだ。' },
      { en: 'Please be kind to your little brother.', ja: '弟にやさしくしてあげてね。' },
    ],
    questions: [
      { sentence: 'Three students were absent ___ class today because of the flu.', choices: ['from', 'of', 'to', 'at'], answer: 0, why: 'be absent from ～「～を欠席する」。' },
      { sentence: 'Hurry up, or we’ll be late ___ the concert.', choices: ['for', 'of', 'at', 'with'], answer: 0, why: 'be late for ～「～に遅れる」。' },
      { sentence: 'My aunt is always kind ___ animals and often helps lost cats.', choices: ['to', 'for', 'at', 'from'], answer: 0, why: 'be kind to ～「～に親切だ」（It is kind of 人 to ～ と区別する）。' },
    ],
  },
  {
    id: 'thank-praise-for',
    title: '前置詞 for「～のことで」（thank ／ praise ／ punish 人 for ～）',
    points: [
      'thank 人 for ～「～のことで人に感謝する」、praise 人 for ～「～のことで人をほめる」、punish 人 for ～「～のことで人を罰する」。for のうしろに理由を置く。',
      'for のあとに動詞を置くなら -ing：Thank you for helping me.。受け身は be praised for ～ / be punished for ～。',
    ],
    examples: [
      { en: 'The coach praised the players for their teamwork.', ja: 'コーチはチームワークのことで選手たちをほめた。' },
      { en: 'Thank you for lending me your notebook.', ja: 'ノートを貸してくれてありがとう。' },
    ],
    questions: [
      { sentence: 'Thank you ___ inviting me to your party.', choices: ['for', 'to', 'with', 'of'], answer: 0, why: 'thank 人 for ～「～のことで人に感謝する」。' },
      { sentence: 'The teacher praised Mika ___ her kindness to the new student.', choices: ['for', 'of', 'at', 'with'], answer: 0, why: 'praise 人 for ～「～のことで人をほめる」（blame / punish 人 for と同じ for）。' },
      { sentence: 'He was punished for ___ the school rules.', choices: ['breaking', 'break', 'broke', 'to break'], answer: 0, why: '前置詞 for のあとの動詞は動名詞 breaking。' },
    ],
  },
  {
    id: 'talk-into',
    title: 'talk 人 into ～ing ／ talk 人 out of ～ing（説得して～させる・やめさせる）',
    points: [
      'talk 人 into ～ing「人を説得して～させる」、talk 人 out of ～ing「人を説得して～をやめさせる」。前置詞 into ／ out of のうしろなので動詞は -ing。',
      '同じ意味を不定詞で言うなら persuade 人 to ～「人を説得して～させる」。「やめさせる」は persuade 人 not to ～。',
    ],
    examples: [
      { en: 'My sister talked me into joining the drama club.', ja: '姉に説得されて、私は演劇部に入った。' },
      { en: 'His friends talked him out of selling his guitar.', ja: '友だちが説得して、彼にギターを売るのをやめさせた。' },
    ],
    questions: [
      { sentence: 'She finally talked her father ___ buying her a new bike.', choices: ['into', 'to', 'out', 'over'], answer: 0, why: 'talk 人 into ～ing「人を説得して～させる」。' },
      { sentence: 'My friends talked me out of ___ the team.', choices: ['quitting', 'quit', 'to quit', 'quitted'], answer: 0, why: 'talk 人 out of ～ing「人を説得して～をやめさせる」。of は前置詞なので動名詞 quitting。' },
      { sentence: 'I persuaded my grandfather ___ a doctor about his cough.', choices: ['to see', 'seeing', 'see', 'saw'], answer: 0, why: 'persuade 人 to ～「人を説得して～させる」。' },
    ],
  },
  {
    id: 'adj-prep-4',
    title: '形容詞 ＋ 前置詞 ④（be satisfied with ／ be crowded with ／ be angry with）',
    points: [
      'be satisfied with ～「～に満足している」、be crowded with ～「～で混雑している」、be angry with 人「人に腹を立てている」。どれも with を使う。',
      '腹を立てる相手が「物・こと」なら be angry about ～：He was angry about the delay.。前置詞のあとの動詞は -ing。',
    ],
    examples: [
      { en: 'The beach was crowded with families on Sunday.', ja: '日曜日、海辺は家族連れで混雑していた。' },
      { en: 'Our teacher was satisfied with our presentation.', ja: '先生は私たちの発表に満足していた。' },
    ],
    questions: [
      { sentence: 'During the holidays, the station was crowded ___ tourists.', choices: ['with', 'of', 'at', 'to'], answer: 0, why: 'be crowded with ～「～で混雑している」。' },
      { sentence: 'Are you satisfied ___ your new smartphone?', choices: ['with', 'to', 'at', 'of'], answer: 0, why: 'be satisfied with ～「～に満足している」。' },
      { sentence: 'My mother was angry ___ me because I didn’t clean my room.', choices: ['with', 'for', 'of', 'to'], answer: 0, why: 'be angry with 人「人に腹を立てている」（物事には about / at）。' },
    ],
  },
  {
    id: 'verb-prep-belong',
    title: '自動詞 ＋ 前置詞（belong to ／ reply to ／ apply for）',
    points: [
      'belong to ～「～のものだ・～に所属している」、reply to ～「～に返事をする」、apply for ～「～に応募する・申しこむ」。どれも前置詞をつけてから目的語を置く（reply this email は ×）。',
      'belong は状態を表すので進行形にしない：This bag belongs to me.（is belonging は ×）。apply to ～ は「（会社・学校）に申しこむ」で、apply for は「（仕事・奨学金など）を求めて申しこむ」。',
    ],
    examples: [
      { en: 'Does this umbrella belong to you?', ja: 'このかさはあなたのものですか。' },
      { en: 'My brother applied for a job at a bookstore.', ja: '兄は書店の仕事に応募した。' },
    ],
    questions: [
      { sentence: 'This bike doesn’t belong ___ me. It’s my cousin’s.', choices: ['to', 'for', 'with', 'of'], answer: 0, why: 'belong to ～「～のものである・～に所属する」。' },
      { sentence: 'Please reply ___ this email by Friday.', choices: ['to', 'for', 'at', 'with'], answer: 0, why: 'reply to ～「～に返事をする」（answer は他動詞なので answer this email と前置詞なし）。' },
      { sentence: 'She applied ___ a part-time job at the bakery.', choices: ['for', 'to', 'at', 'with'], answer: 0, why: 'apply for 仕事・奨学金など「～に応募する・申しこむ」。apply to は「（会社・大学など）に」申しこむ相手を表す。' },
    ],
  },
  {
    id: 'adj-prep-5',
    title: '形容詞 ＋ 前置詞 ⑤（be suitable for ／ be jealous of ／ be independent of）',
    points: [
      'be suitable for ～「～に適している・向いている」、be jealous of ～「～をうらやむ・ねたむ」、be independent of ～「～から独立している・たよらない」。',
      'be independent of ～ の反対は be dependent on ～「～にたよっている」。independent は of、dependent は on と、前置詞がちがうので注意。',
    ],
    examples: [
      { en: 'This movie is suitable for small children.', ja: 'この映画は小さな子どもに向いている。' },
      { en: 'My cousin became independent of his parents at twenty.', ja: 'いとこは20歳で親から独立した。' },
    ],
    questions: [
      { sentence: 'This textbook is suitable ___ beginners who have never studied French.', choices: ['for', 'to', 'with', 'at'], answer: 0, why: 'be suitable for ～「～に向いている・適している」。' },
      { sentence: 'He was jealous ___ his brother’s success.', choices: ['of', 'with', 'for', 'at'], answer: 0, why: 'be jealous of ～「～をうらやむ・ねたむ」（be envious of と同じ of）。' },
      { sentence: 'After she found a job, she became financially independent ___ her parents.', choices: ['of', 'on', 'from of', 'with'], answer: 0, why: 'be independent of ～「～から独立している」。dependent on（～にたよっている）と前置詞がちがうので注意。' },
    ],
  },
  {
    id: 'verb-prep-hear',
    title: '自動詞 ＋ 前置詞 ②（deal with ／ hear from ／ hear of）',
    points: [
      'deal with ～「～を処理する・～に対処する」、hear from ～「～から連絡（手紙・電話）がある」、hear of ～「～のこと（うわさ・存在）を聞く」。',
      'hear from と hear of は意味がちがう：I heard from Ken.「ケンから連絡があった」／ I have never heard of that town.「その町は聞いたこともない」。',
    ],
    examples: [
      { en: 'Our teacher dealt with the problem calmly.', ja: '先生はその問題に落ち着いて対処した。' },
      { en: 'I was happy to hear from my old classmate.', ja: '昔のクラスメートから連絡があってうれしかった。' },
    ],
    questions: [
      { sentence: 'The government must deal ___ the problem of rising prices as soon as possible.', choices: ['with', 'to', 'at', 'on'], answer: 0, why: 'deal with ～「～に対処する・～をあつかう」。' },
      { sentence: 'I haven’t heard ___ Emma since she moved to Canada. I hope she is well.', choices: ['from', 'of', 'to', 'about of'], answer: 0, why: 'hear from 人「人から連絡（手紙・メール）がある」。hear of は「～のうわさ・存在を聞く」で、連絡の意味にはならない。' },
      { sentence: 'Have you ever heard ___ this singer? She is becoming popular in Korea.', choices: ['of', 'from', 'to', 'at'], answer: 0, why: '「この歌手のことを聞いたことがあるか（存在を知っているか）」なので hear of ～。hear from は「本人から連絡がある」。' },
    ],
  },
  {
    id: 'verb-prep-across',
    title: '自動詞 ＋ 前置詞 ③（come across ／ run into ／ look into）',
    points: [
      'come across ～「～に偶然出会う・～をたまたま見つける」、run into ～「（人）にばったり会う」、look into ～「～を調べる」。前置詞までをひとまとまりの動詞として覚える。',
      '目的語は前置詞のうしろ：I ran into Ken.（ran Ken into は ×）。look into は investigate とほぼ同じ意味。',
    ],
    examples: [
      { en: 'I came across my old diary while cleaning my room.', ja: '部屋をそうじしていたら、昔の日記がたまたま見つかった。' },
      { en: 'The school is looking into the cause of the problem.', ja: '学校はその問題の原因を調べている。' },
    ],
    questions: [
      { sentence: 'While cleaning my room, I came ___ an old photo of my grandparents.', choices: ['across', 'over', 'along', 'through'], answer: 0, why: 'come across ～「～をたまたま見つける・出会う」。' },
      { sentence: 'I ran ___ my old teacher at the station yesterday.', choices: ['into', 'over', 'across of', 'out'], answer: 0, why: 'run into ～「～にばったり会う」（= bump into）。run out は「なくなる」。' },
      { sentence: 'The police are looking ___ the cause of the accident.', choices: ['into', 'after', 'forward', 'out'], answer: 0, why: 'look into ～「～を調べる」（= investigate）。look after は「世話をする」、look forward to は「楽しみにする」、look out は「気をつける」。' },
    ],
  },
  {
    id: 'verb-prep-concentrate',
    title: '自動詞 ＋ 前置詞 ④（concentrate on ／ participate in ／ care about）',
    points: [
      'concentrate on ～「～に集中する」、participate in ～「～に参加する」（= take part in ～）、care about ～「～を気にかける・大切に思う」。',
      '前置詞のあとに動詞を置くなら -ing：Concentrate on reading.。participate は join とちがって in が必要（join the club ／ participate in the club）。',
    ],
    examples: [
      { en: 'Please concentrate on the road while you are driving.', ja: '運転中は道路に集中してください。' },
      { en: 'Many people participated in the beach cleanup.', ja: 'たくさんの人が海岸のそうじに参加した。' },
    ],
    questions: [
      { sentence: 'I can’t concentrate ___ my homework with the TV on.', choices: ['on', 'in', 'to', 'at'], answer: 0, why: 'concentrate on ～「～に集中する」（= focus on）。' },
      { sentence: 'More than 200 students participated ___ the event.', choices: ['in', 'to', 'at', 'for'], answer: 0, why: 'participate in ～「～に参加する」（= take part in）。join は他動詞なので前置詞なし。' },
      { sentence: 'He really cares ___ the environment and always recycles.', choices: ['about', 'for of', 'to', 'with'], answer: 0, why: 'care about ～「～を大切に思う・気にかける」（care for は「世話をする・好む」）。' },
    ],
  },
  {
    id: 'adj-prep-6',
    title: '形容詞 ＋ 前置詞 ⑥（be short of ／ be ashamed of ／ be curious about）',
    points: [
      'be short of ～「～が足りない」、be ashamed of ～「～をはずかしく思う」、be curious about ～「～に興味しんしんだ・～を知りたがる」。',
      '前置詞のあとに動詞を置くなら -ing：He was ashamed of being late.「遅刻したことをはずかしく思った」。run short of ～ は「～が足りなくなる」。',
    ],
    examples: [
      { en: "We're short of eggs, so I'll buy some on the way home.", ja: '卵が足りないから、帰りに買ってくるね。' },
      { en: 'My little brother is curious about everything.', ja: '弟は何にでも興味しんしんだ。' },
    ],
    questions: [
      { sentence: 'We’re running short ___ time, so let’s hurry.', choices: ['of', 'in', 'at', 'with'], answer: 0, why: 'be / run short of ～「～が足りない」。' },
      { sentence: 'He was ashamed ___ having told a lie to his best friend.', choices: ['of', 'at', 'about of', 'to'], answer: 0, why: 'be ashamed of ～「～をはずかしく思う」。of のあとは動名詞 having told。' },
      { sentence: 'Young children are curious ___ everything around them.', choices: ['about', 'of', 'for', 'with'], answer: 0, why: 'be curious about ～「～に興味しんしんだ」。' },
    ],
  },
  {
    id: 'verb-prep-from',
    title: '自動詞 ＋ 前置詞 ⑤（suffer from ／ recover from ／ differ from）',
    points: [
      'suffer from ～「（病気など）に苦しむ・かかっている」、recover from ～「～から回復する」、differ from ～「～とちがう」（= be different from ～）。どれも from を使う。',
      'suffer from は進行形でもよく使う：He is suffering from a headache.。differ は動詞なので be はつけない（is differ は ×）。',
    ],
    examples: [
      { en: 'My father suffers from back pain.', ja: '父は腰痛に苦しんでいる。' },
      { en: 'It took her a week to recover from the flu.', ja: '彼女がインフルエンザから回復するのに1週間かかった。' },
    ],
    questions: [
      { sentence: 'Many people suffer ___ hay fever in spring.', choices: ['from', 'at', 'by', 'of'], answer: 0, why: 'suffer from ～「～に苦しむ・（病気に）かかっている」。' },
      { sentence: 'It took her two weeks to recover ___ the flu.', choices: ['from', 'of', 'to', 'out'], answer: 0, why: 'recover from ～「～から回復する」。' },
      { sentence: 'Japanese ___ from English in many ways.', choices: ['differs', 'is differ', 'different', 'is differing to'], answer: 0, why: 'differ from ～「～とちがう」。differ は動詞なので be をつけない（be different from ～と同じ意味）。' },
    ],
  },
  {
    id: 'verb-prep-rely',
    title: '自動詞 ＋ 前置詞 ⑥（rely on ／ respond to ／ refer to）',
    points: [
      'rely on ～「～にたよる」（= depend on ～）、respond to ～「～に答える・反応する」、refer to ～「～のことを言う・～を参照する」。',
      '長文でよく出る形：This word refers to ～「この語は～を指す」。前置詞のうしろに動詞を置くなら -ing（rely on getting）。',
    ],
    examples: [
      { en: 'Many people rely on their phones to check the time.', ja: '多くの人が時間を確かめるのにスマホにたよっている。' },
      { en: 'In this sentence, "it" refers to the old bridge.', ja: 'この文では、"it" は古い橋を指している。' },
    ],
    questions: [
      { sentence: 'You can always rely ___ me when you need help.', choices: ['on', 'to', 'in', 'with'], answer: 0, why: 'rely on ～「～にたよる」（= depend on / count on）。' },
      { sentence: 'Please respond ___ the survey by Monday.', choices: ['to', 'for', 'on', 'with'], answer: 0, why: 'respond to ～「～に答える・応じる」（= reply to）。' },
      { sentence: 'In this sentence, the word "they" refers ___ the students.', choices: ['to', 'on', 'for', 'with'], answer: 0, why: 'refer to ～「～を指す・～に言及する」。' },
    ],
  },
  {
    id: 'adj-prep-7',
    title: '形容詞 ＋ 前置詞 ⑦（be harmful to ／ be related to ／ be grateful for）',
    points: [
      'be harmful to ～「～に有害だ」、be related to ～「～と関係がある」、be grateful for ～「～に感謝している」。',
      'be grateful は、感謝する「こと」には for、感謝する「人」には to：I am grateful to you for your help.「助けてくれたことであなたに感謝している」。',
    ],
    examples: [
      { en: 'Loud music can be harmful to your ears.', ja: '大きな音の音楽は耳に有害なことがある。' },
      { en: 'I am grateful for all your support.', ja: 'あなたのすべての支えに感謝しています。' },
    ],
    questions: [
      { sentence: 'Too much sugar is harmful ___ your teeth.', choices: ['to', 'for', 'with', 'at'], answer: 0, why: 'be harmful to ～「～に有害だ」（be good for ～と前置詞がちがう）。' },
      { sentence: 'Scientists believe this problem is closely related ___ climate change.', choices: ['to', 'at', 'for', 'about'], answer: 0, why: 'be related to ～「～と関係がある」。' },
      { sentence: 'I’m very grateful ___ your kind advice.', choices: ['for', 'to', 'of', 'with'], answer: 0, why: '感謝する「こと」には for（be grateful for 物事）。感謝する「人」には to（be grateful to 人）。' },
    ],
  },
  {
    id: 'verb-prep-dream',
    title: '自動詞 ＋ 前置詞 ⑦（dream of ／ approve of ／ prepare for）',
    points: [
      'dream of ～「～を夢見る」（dream about でも可）、approve of ～「～に賛成する・～をよいと認める」、prepare for ～「～に備える・～の準備をする」。',
      'prepare for ～ は「～に向けて準備する」、prepare ～（前置詞なし）は「～を用意する」：prepare for the test ／ prepare dinner。',
    ],
    examples: [
      { en: 'He dreams of opening his own restaurant someday.', ja: '彼はいつか自分のレストランを開くことを夢見ている。' },
      { en: "My parents didn't approve of my plan at first.", ja: '両親は最初、私の計画に賛成しなかった。' },
    ],
    questions: [
      { sentence: 'As a child, she dreamed ___ becoming a pilot.', choices: ['of', 'to', 'for', 'with'], answer: 0, why: 'dream of ～ing「～することを夢見る」。' },
      { sentence: 'My parents don’t approve ___ my staying up late.', choices: ['of', 'to', 'with', 'for'], answer: 0, why: 'approve of ～「～をよいと認める・賛成する」。' },
      { sentence: 'The whole school is busy preparing ___ the festival.', choices: ['for', 'to', 'of', 'with'], answer: 0, why: 'prepare for ～「～の準備をする」。' },
    ],
  },
  {
    id: 'verb-a-into-b',
    title: '前置詞 into「～に（変える・分ける）」（divide ／ translate ／ turn A into B）',
    points: [
      'divide A into B「A を B に分ける」、translate A into B「A を B（言語）に訳す」、turn A into B「A を B に変える」。into は「～の中へ」から「～に変化して」の意味になる。',
      '受け身もよく出る：The book was translated into ten languages.「その本は10か国語に訳された」。',
    ],
    examples: [
      { en: 'The teacher divided us into groups of four.', ja: '先生は私たちを4人ずつのグループに分けた。' },
      { en: 'They turned the empty lot into a small park.', ja: '彼らは空き地を小さな公園に変えた。' },
    ],
    questions: [
      { sentence: 'The teacher divided the class ___ four groups.', choices: ['into', 'in', 'to', 'by'], answer: 0, why: 'divide A into B「A を B に分ける」。' },
      { sentence: 'This novel has been translated ___ more than thirty languages.', choices: ['into', 'to', 'in', 'for'], answer: 0, why: 'translate A into B「A を B に翻訳する」。' },
      { sentence: 'The old factory was turned ___ an art museum.', choices: ['into', 'to', 'for', 'over'], answer: 0, why: 'turn A into B の受け身「A は B に変えられる」。turn over は「ひっくり返す・ゆずる」。' },
    ],
  },
  {
    id: 'verb-a-with-b',
    title: '前置詞 with「～で（満たす・おおう）」（fill ／ cover ／ supply A with B）',
    points: [
      'fill A with B「A を B で満たす」、cover A with B「A を B でおおう」、supply A with B「A に B を供給する」（= supply B to A）。with のうしろに「中身・おおうもの・あたえるもの」を置く。',
      '受け身もよく出る：The street was covered with leaves.「通りは落ち葉でおおわれていた」。be filled with ～「～でいっぱいだ」。',
    ],
    examples: [
      { en: 'She filled the bottle with cold tea.', ja: '彼女はボトルを冷たいお茶で満たした。' },
      { en: 'The mountains were covered with snow.', ja: '山々は雪でおおわれていた。' },
    ],
    questions: [
      { sentence: 'She filled the bottle ___ cold water before the hike.', choices: ['with', 'of', 'by', 'in'], answer: 0, why: 'fill A with B「A を B で満たす」（be full of ～と混同しない）。' },
      { sentence: 'By morning, the whole town was covered ___ snow.', choices: ['with', 'of', 'from', 'at'], answer: 0, why: 'be covered with ～「～でおおわれている」（be covered in ～ も可）。' },
      { sentence: 'The farm supplies the local school ___ fresh vegetables.', choices: ['with', 'for', 'to', 'of'], answer: 0, why: 'supply A with B「A に B を供給する」（= supply B to A）。この語順では with。' },
    ],
  },
  {
    id: 'explain-to',
    title: '前置詞 to と語順（explain ／ introduce ／ suggest 物 to 人）',
    points: [
      'explain・introduce・suggest は「人」を直接2つ目の目的語にできない：explain 物 to 人「人に物を説明する」、introduce A to B「A を B に紹介する」、suggest 物 to 人「人に物を提案する」。',
      'explain me the rule は ×、explain the rule to me が ○。give や tell（give me the book）とちがうので注意。',
    ],
    examples: [
      { en: 'Could you explain this word to me?', ja: 'この単語を私に説明してくれませんか。' },
      { en: 'Let me introduce my cousin to you.', ja: 'あなたに私のいとこを紹介させてください。' },
    ],
    questions: [
      { sentence: 'Could you explain this rule ___ me?', choices: ['to', 'for', 'at', 'with'], answer: 0, why: 'explain 物 to 人「人に物を説明する」。' },
      { sentence: 'Let me introduce my friend ___ you.', choices: ['to', 'for', 'with', 'at'], answer: 0, why: 'introduce A to B「A を B に紹介する」。' },
      { sentence: 'The guide explained ___ how to use the map.', choices: ['to us', 'us', 'at us', 'for us'], answer: 0, why: 'explain は「人」を直接目的語にとれないので explain to 人 ～。explain us は不可（入試頻出のまちがい）。' },
    ],
  },
  {
    id: 'remind-warn-to',
    title: 'remind ／ warn ／ advise ＋ 人 ＋ to ～',
    points: [
      'remind 人 to ～「人に～することを思い出させる・忘れずに～するよう言う」、warn 人 to ～「人に～するよう警告する」、advise 人 to ～「人に～するよう助言する」。',
      '「～しないように」は not を to の前に：The doctor advised me not to eat too much.。',
    ],
    examples: [
      { en: 'Please remind me to call my grandmother tonight.', ja: '今夜おばあちゃんに電話するのを忘れないよう、私に言ってね。' },
      { en: 'The guide warned us not to go near the edge.', ja: 'ガイドは私たちに、はしに近づかないよう警告した。' },
    ],
    questions: [
      { sentence: 'Please remind me ___ the windows before we leave.', choices: ['to close', 'closing', 'close', 'of closing'], answer: 0, why: 'remind 人 to ～「人に忘れずに～するよう言う」。remind 人 of ～ は「人に～を思い出させる」で意味がちがう。' },
      { sentence: 'The doctor advised him ___ more vegetables and less meat.', choices: ['to eat', 'eat', 'eating', 'that eat'], answer: 0, why: 'advise 人 to ～「人に～するよう助言する」。' },
      { sentence: 'My mother warned me ___ late for school again.', choices: ['not to be', 'to not being', 'not be', 'don’t be'], answer: 0, why: '「～しないように」は not to ～（不定詞の否定は to の前に not）。' },
    ],
  },
  {
    id: 'force-require-to',
    title: 'force ／ require ／ forbid ＋ 人 ＋ to ～',
    points: [
      'force 人 to ～「人にむりやり～させる」、require 人 to ～「人に～することを求める（規則などで）」、forbid 人 to ～「人に～することを禁じる」（forbid 人 from ～ing とも言う）。',
      '受け身でよく使う：Students are required to wear a uniform.「生徒は制服を着ることになっている」／ We were forced to wait.「待たざるをえなかった」。',
    ],
    examples: [
      { en: 'The heavy snow forced the school to close early.', ja: '大雪のため、学校は早く閉まらざるをえなかった。' },
      { en: 'Visitors are required to show their tickets at the gate.', ja: '来場者は門でチケットを見せる必要がある。' },
    ],
    questions: [
      { sentence: 'The heavy rain forced the referee ___ the game.', choices: ['to stop', 'stopping', 'stop', 'stopped'], answer: 0, why: 'force 人 to ～「人にむりやり～させる」。make 人 ～（原形）と混同しない。' },
      { sentence: 'All visitors are required ___ an ID card at the entrance.', choices: ['to show', 'showing', 'show', 'shown'], answer: 0, why: 'require 人 to ～ の受け身 be required to ～「～することを求められる」。' },
      { sentence: 'The rules forbid students ___ their phones during tests.', choices: ['to use', 'use', 'from use', 'used'], answer: 0, why: 'forbid 人 to ～「人に～することを禁じる」（forbid 人 from ～ing も可だが from use は不可）。' },
    ],
  },
  {
    id: 'have-fun-ing',
    title: 'have fun ～ing ／ have a hard time ～ing（～して楽しむ・～するのに苦労する）',
    points: [
      'have fun ～ing「～して楽しむ」、have a good time ～ing「～して楽しく過ごす」、have a hard time ～ing「～するのに苦労する」。どれも時間の名詞のあとに ～ing を続ける。',
      '～ing の前に in を入れる形もあるが、ふつうは省く：We had fun playing cards.（to play は使わない）。',
    ],
    examples: [
      { en: 'We had fun making a snowman in the park.', ja: '私たちは公園で雪だるまを作って楽しんだ。' },
      { en: 'I had a hard time finding the station.', ja: '駅を見つけるのに苦労した。' },
    ],
    questions: [
      { sentence: 'The children had fun ___ in the pool all afternoon.', choices: ['swimming', 'to swim', 'swim', 'swam'], answer: 0, why: 'have fun ～ing「～して楽しむ」。' },
      { sentence: 'I had a hard time ___ asleep last night because of the noise.', choices: ['falling', 'to fall', 'fell', 'fall'], answer: 0, why: 'have a hard time ～ing「～するのに苦労する」（have difficulty / trouble ～ing も同じ形）。' },
      { sentence: 'She had trouble ___ the answer to the last question.', choices: ['finding', 'to find', 'found', 'find'], answer: 0, why: 'have trouble ～ing「～するのに苦労する」。' },
    ],
  },
  {
    id: 'beside-besides',
    title: '前置詞 beside ／ besides ／ except（～のそば・～のほかに・～を除いて）',
    points: [
      'beside ～「～のそばに・～のとなりに」（場所）、besides ～「～のほかに（加えて）」、except ～「～を除いて・～以外は」。besides は「足す」、except は「引く」と覚える。',
      'beside と besides は s があるかないかで意味がまったくちがう：Sit beside me.「となりにすわって」／ Besides English, he speaks French.「英語のほかにフランス語も話す」。',
    ],
    examples: [
      { en: 'There is a small café beside the station.', ja: '駅のそばに小さなカフェがある。' },
      { en: 'Besides tennis, she plays the piano.', ja: 'テニスのほかに、彼女はピアノもひく。' },
    ],
    questions: [
      { sentence: 'Come and sit ___ me so that we can share the book.', choices: ['beside', 'besides', 'except', 'between'], answer: 0, why: '「となりに」は場所の beside。besides は「～に加えて」。between は2つのもののあいだ。' },
      { sentence: '___ English, she speaks Chinese and Korean.', choices: ['Besides', 'Beside', 'Except', 'Without'], answer: 0, why: '「英語に加えて」は besides。except だと「英語を除いて」になり、話せる言語の説明として意味が合わない。' },
      { sentence: 'Everyone came to the party ___ Tom, who was sick in bed.', choices: ['except', 'besides', 'beside', 'with'], answer: 0, why: '「トム以外はみんな」なので except。besides では「トムに加えて」になる。' },
    ],
  },
  {
    id: 'through-toward-past',
    title: '前置詞 through ／ toward ／ past（動きを表す）',
    points: [
      'through ～「～を通りぬけて」、toward ～「～のほうへ」（towards ともつづる）、past ～「～のそばを通りすぎて」。どれも動きの向きを表す前置詞。',
      'つづりのまちがいに注意：through（前置詞）と thorough（形容詞「徹底的な」）、past（前置詞）と passed（pass の過去形）。walk past the park が ○、walk passed the park は ×。',
    ],
    examples: [
      { en: 'The train went through a long tunnel.', ja: '列車は長いトンネルを通りぬけた。' },
      { en: 'We walked past the old castle on our way home.', ja: '私たちは帰り道に古い城のそばを通りすぎた。' },
    ],
    questions: [
      { sentence: 'The cat came in ___ the open window.', choices: ['through', 'across', 'along', 'over'], answer: 0, why: '窓を「通りぬけて」入るので through。across は「横切って」、along は「～にそって」。' },
      { sentence: 'When the dog saw its owner, it ran ___ her with its tail wagging.', choices: ['toward', 'forward', 'afterward', 'backward'], answer: 0, why: '「～のほうへ」は前置詞 toward。forward・afterward・backward は副詞なので、うしろに名詞を置けない。' },
      { sentence: 'We walked ___ the museum on our way to the station.', choices: ['past', 'passed', 'pass', 'passing by of'], answer: 0, why: '「～のそばを通りすぎて」は前置詞 past。walked のあとに動詞 passed / pass は置けない。' },
    ],
  },
  {
    id: 'above-below-beyond',
    title: '前置詞 above ／ below ／ beyond（～より上・下・向こう）',
    points: [
      'above ～「～より上に（はなれて）」、below ～「～より下に」、beyond ～「～の向こうに・～をこえて」。数値や程度にも使う：above average「平均以上」、below zero「零下」。',
      'beyond は「理解・能力をこえて」の意味でもよく使う：The view was beautiful beyond words.「その景色は言葉にできないほど美しかった」。',
    ],
    examples: [
      { en: 'The plane flew above the clouds.', ja: '飛行機は雲の上を飛んだ。' },
      { en: 'The temperature dropped below zero last night.', ja: '昨夜、気温は零下まで下がった。' },
    ],
    questions: [
      { sentence: 'Our plane was flying high ___ the clouds.', choices: ['above', 'over of', 'up', 'upper'], answer: 0, why: '「～より上に」は前置詞 above。upper は形容詞、up は「上へ」で the clouds の前に置いて「～より上に」の意味にならない。' },
      { sentence: 'Last night the temperature dropped ___ zero for the first time this winter.', choices: ['below', 'under of', 'down', 'lower'], answer: 0, why: '温度・数値の「～より下に」は below（below zero「氷点下」）。' },
      { sentence: 'The small village lies just ___ the mountains, so it is hard to reach.', choices: ['beyond', 'further', 'farther', 'besides'], answer: 0, why: '「～の向こうに」は前置詞 beyond。further / farther はうしろに名詞を直接置けず、besides は「～に加えて」。' },
    ],
  },
  {
    id: 'against-throughout-unlike',
    title: '前置詞 against ／ throughout ／ unlike（～に反対して・～の間ずっと・～とちがって）',
    points: [
      'against ～「～に反対して・～にもたれて」、throughout ～「～の間ずっと・～のいたるところで」、unlike ～「～とちがって」（⇔ like ～「～のように」）。',
      'for or against ～「～に賛成か反対か」。unlike は前置詞なので、うしろに名詞を置く（Unlike my sister, I …）。dislike（動詞「きらう」）・unlikely（形容詞「ありそうにない」）とまちがえない。',
    ],
    examples: [
      { en: 'Most students voted against the new rule.', ja: 'ほとんどの生徒が新しい規則に反対の票を入れた。' },
      { en: 'Unlike her brother, Mika loves getting up early.', ja: '兄とちがって、ミカは早起きが大好きだ。' },
    ],
    questions: [
      { sentence: 'Most of the members voted ___ the proposal, so it was rejected.', choices: ['against', 'for', 'with', 'over'], answer: 0, why: '「否決された」ので vote against ～「～に反対票を投じる」。vote for は「賛成票を投じる」で逆。' },
      { sentence: 'The museum is open ___ the year, even on national holidays.', choices: ['throughout', 'through out of', 'during of', 'within of'], answer: 0, why: 'throughout the year「1年じゅうずっと」。during のあとに of は来ない。' },
      { sentence: '___ his talkative brother, Ken rarely speaks in class.', choices: ['Unlike', 'Dislike', 'Unlikely', 'Alike'], answer: 0, why: '「～とちがって」は前置詞 unlike。dislike は動詞、unlikely・alike は形容詞（副詞）で、うしろに名詞を続けて「～とちがって」の意味にならない。' },
    ],
  },
  {
    id: 'adj-prep-8',
    title: '形容詞 ＋ 前置詞 ⑧（be popular with ／ be strict with ／ be polite to）',
    points: [
      'be popular with ～「～に人気がある」（among も使う）、be strict with 人「人にきびしい」、be polite to 人「人に礼儀正しい」（⇔ be rude to 人「人に失礼だ」）。',
      '人への態度を表す形容詞は、with や to をとるものが多い。It is polite of you to ～「～してくれるなんて礼儀正しいね」とは形がちがう。',
    ],
    examples: [
      { en: 'This café is popular with students.', ja: 'このカフェは学生に人気がある。' },
      { en: 'Our coach is strict with us, but she is fair.', ja: 'コーチは私たちにきびしいが、公平だ。' },
    ],
    questions: [
      { sentence: 'This app has become very popular ___ teenagers around the world.', choices: ['with', 'for', 'of', 'to'], answer: 0, why: 'be popular with / among ～「～に人気がある」。' },
      { sentence: 'Our coach is strict ___ us about being on time, but she is always fair.', choices: ['with', 'to', 'for', 'at'], answer: 0, why: 'be strict with 人「人にきびしい」（be strict about 物事）。' },
      { sentence: 'You should be polite ___ everyone, even when you disagree with them.', choices: ['to', 'on', 'for', 'at'], answer: 0, why: 'be polite to 人「人に礼儀正しい」。kind to / rude to と同じ to。' },
    ],
  },
  {
    id: 'phrasal-down-up-on',
    title: '前置詞と副詞 句動詞 turn down ／ set up ／ put on（断る・組み立てる・身につける）',
    points: [
      'turn down ～「～を断る」、set up ～「～を組み立てる・設立する」、put on ～「～を身につける」（⇔ take off ～「～をぬぐ」）。down・up・on は副詞なので、目的語を間にはさんでもよい。',
      '目的語が代名詞（it・them など）のときは、必ず間にはさむ：put it on（put on it は ×）、turn it down（turn down it は ×）。',
    ],
    examples: [
      { en: 'She turned down the job offer because it was too far away.', ja: '遠すぎたので、彼女はその仕事の申し出を断った。' },
      { en: 'It is cold outside, so put on your coat.', ja: '外は寒いから、コートを着なさい。' },
    ],
    questions: [
      { sentence: 'She was offered the job, but she turned it ___ because the pay was too low.', choices: ['down', 'up', 'off', 'over'], answer: 0, why: 'turn down ～「～を断る」。turn up は「現れる・音量を上げる」、turn off は「消す」。' },
      { sentence: 'It took us an hour to set ___ the tent.', choices: ['up', 'down', 'off', 'out'], answer: 0, why: 'set up ～「～を組み立てる・設置する」。' },
      { sentence: 'This is a nice hat. Can I ___?', choices: ['put it on', 'put on it', 'put it', 'wear on it'], answer: 0, why: '目的語が代名詞 it のときは put it on の語順（put on it は不可）。' },
    ],
  },
  {
    id: 'group-prep-charge',
    title: '群前置詞 in charge of ／ on behalf of ／ in favor of（～を担当して・～を代表して・～に賛成して）',
    points: [
      '2語以上でひとつの前置詞のようにはたらくものを群前置詞という。in charge of ～「～を担当して」、on behalf of ～「～を代表して・～のかわりに」、in favor of ～「～に賛成して」（⇔ against ～）。',
      'まん中の名詞の形は決まっている：in charge（charges は ×）、on behalf（behave は動詞）、in favor（favorite は ×）。',
    ],
    examples: [
      { en: 'Mr. Tanaka is in charge of the school trip.', ja: '田中先生が修学旅行の担当だ。' },
      { en: 'I would like to thank you on behalf of all the students.', ja: '生徒全員を代表して、お礼を申し上げます。' },
    ],
    questions: [
      { sentence: 'Ms. Sato is ___ charge of the music club.', choices: ['in', 'on', 'at', 'under'], answer: 0, why: 'in charge of ～「～を担当して」。' },
      { sentence: 'The captain accepted the trophy on ___ of the whole team.', choices: ['behalf', 'account', 'top', 'charge'], answer: 0, why: 'on behalf of ～「～を代表して」。on account of は「～のために（理由）」で意味が合わない。' },
      { sentence: 'Most of the students voted in ___ of the new school rule.', choices: ['favor', 'charge', 'place', 'honor'], answer: 0, why: 'vote in favor of ～「～に賛成の投票をする」。in charge of は「～を担当して」。' },
    ],
  },
  {
    id: 'group-prep-regardless',
    title: '群前置詞② regardless of ／ apart from ／ for the sake of（～に関係なく・～は別として・～のために）',
    points: [
      'regardless of ～「～に関係なく」、apart from ～「～は別として・～を除けば」、for the sake of ～「～のために（利益になるように）」。',
      '形が決まっているので注意：regardless（regard は ×）、apart（part は ×）、for the sake（sakes は ×）。',
    ],
    examples: [
      { en: 'Anyone can join the club, regardless of age.', ja: '年れいに関係なく、だれでもクラブに入れる。' },
      { en: 'Apart from a few mistakes, your essay is excellent.', ja: '少しのまちがいを別にすれば、きみの作文はすばらしい。' },
    ],
    questions: [
      { sentence: 'The match will be played ___ of the weather.', choices: ['regardless', 'in spite', 'instead', 'because'], answer: 0, why: 'regardless of ～「～に関係なく」。in spite of は of が重なり、instead of / because of は意味が合わない。' },
      { sentence: '___ from a few spelling mistakes, your essay is excellent.', choices: ['Apart', 'Away', 'Except', 'Instead'], answer: 0, why: 'apart from ～「～は別として」（= aside from / except for）。Except だけなら from は続かない（except for）。' },
      { sentence: 'He moved to the countryside for the ___ of his health.', choices: ['sake', 'purpose', 'cost', 'cause'], answer: 0, why: 'for the sake of ～「～のために」。for the purpose of は「～の目的で」で、うしろは動名詞（for the purpose of improving his health）。' },
    ],
  },
  {
    id: 'group-prep-place',
    title: '群前置詞③ in place of ／ on top of ／ in the middle of（～のかわりに・～の上に・～のまん中に）',
    points: [
      'in place of ～「～のかわりに」（= instead of ～）、on top of ～「～の上に・～に加えて」、in the middle of ～「～のまん中に・～の最中に」。',
      'in the middle of は時間にも使う：in the middle of the night「真夜中に」、in the middle of class「授業の最中に」。',
    ],
    examples: [
      { en: 'You can use honey in place of sugar.', ja: '砂糖のかわりにはちみつを使ってもいい。' },
      { en: 'My phone rang in the middle of the movie.', ja: '映画の最中にスマホが鳴った。' },
    ],
    questions: [
      { sentence: 'Because the teacher was sick, Mr. Ito taught the class in ___ of her.', choices: ['place', 'case', 'spite', 'front'], answer: 0, why: 'in place of ～「～のかわりに」（= instead of）。in spite of は「～にもかかわらず」、in front of は「～の前に」。' },
      { sentence: 'He lost his job, and on ___ of that, his car broke down.', choices: ['top', 'account', 'behalf', 'end'], answer: 0, why: 'on top of ～「～に加えて・～の上に」。悪いことが重なる文脈。' },
      { sentence: 'My phone rang in the ___ of the meeting.', choices: ['middle', 'center', 'heart', 'half'], answer: 0, why: 'in the middle of ～「（時間・活動の）最中に」。center / heart は場所のまん中に使い、会議の「最中」には使わない。' },
    ],
  },
  {
    id: 'group-prep-ahead',
    title: '群前置詞④ close to ／ ahead of ／ prior to（～の近くに・～より先に・～より前に）',
    points: [
      'close to ～「～の近くに」、ahead of ～「～の前方に・～より先に」、prior to ～「～より前に」（before のかたい言い方）。',
      'ahead of は場所にも時間にも使う：ahead of schedule「予定より早く」。prior to はお知らせやメールでよく出る。',
    ],
    examples: [
      { en: 'Our school is close to the station.', ja: '私たちの学校は駅の近くにある。' },
      { en: 'The project was finished ahead of schedule.', ja: 'その計画は予定より早く終わった。' },
    ],
    questions: [
      { sentence: 'The hotel is very close ___ the beach.', choices: ['to', 'by', 'from', 'with'], answer: 0, why: 'close to ～「～の近くに」。' },
      { sentence: 'Our team is two points ___ of theirs with five minutes left.', choices: ['ahead', 'before', 'front', 'prior'], answer: 0, why: 'ahead of ～「～より先に・～をリードして」。before / prior to は時間の「前」で、得点のリードには使わない。' },
      { sentence: 'Please check in at least an hour ___ to departure.', choices: ['prior', 'ahead', 'before', 'previous of'], answer: 0, why: 'prior to ～「～より前に」（= before ～）。ahead なら ahead of、before なら before departure で to はいらない。' },
    ],
  },
  {
    id: 'group-prep-exchange',
    title: '群前置詞⑤ in exchange for ／ in response to ／ in contrast to（～と交換に・～に答えて・～と対照的に）',
    points: [
      'in exchange for ～「～と交換に・～のお礼に」、in response to ～「～に答えて・～に応じて」、in contrast to ～「～と対照的に」（= unlike ～）。',
      'まん中は名詞の形で使う：exchange・response・contrast。respond（動詞）や responsive（形容詞）は入らない。',
    ],
    examples: [
      { en: 'She taught me Spanish in exchange for English lessons.', ja: '彼女は英語のレッスンと交換に、私にスペイン語を教えてくれた。' },
      { en: 'In contrast to his quiet brother, Taro loves talking.', ja: '静かな兄とは対照的に、タロウは話すのが大好きだ。' },
    ],
    questions: [
      { sentence: 'The farmer gave us fresh vegetables in exchange ___ our help with the harvest.', choices: ['for', 'of', 'with', 'to'], answer: 0, why: 'in exchange for ～「～と交換に」。' },
      { sentence: 'In ___ to the customers’ complaints, the company changed its policy.', choices: ['response', 'return', 'addition', 'contrast'], answer: 0, why: 'in response to ～「～に応えて」。in return for は「～のお返しに」、in addition to は「～に加えて」、in contrast to は「～と対照的に」。' },
      { sentence: 'In ___ to his talkative brother, Ken is a quiet boy.', choices: ['contrast', 'addition', 'response', 'return'], answer: 0, why: '「おしゃべりな兄とは対照的に、ケンは静か」なので in contrast to ～。in addition to は「～に加えて」。' },
    ],
  },
  {
    id: 'group-prep-account',
    title: '群前置詞⑥ on account of ／ in accordance with ／ with the exception of（～のために・～に従って・～を除いて）',
    points: [
      'on account of ～「～のために（理由）」（= because of ～）、in accordance with ～「～に従って」、with the exception of ～「～を除いて」（= except ～）。どれもかたい言い方で、お知らせや説明文に出る。',
      'まん中は名詞の形：account・accordance・exception。according（according to ～ の形で使う）や except（前置詞）とまぜない。',
    ],
    examples: [
      { en: 'The game was put off on account of the heavy rain.', ja: '大雨のため、試合は延期された。' },
      { en: 'All the students, with the exception of Ken, passed the test.', ja: 'ケンを除いて、生徒全員がテストに合格した。' },
    ],
    questions: [
      { sentence: 'The outdoor concert was postponed on ___ of the heavy rain.', choices: ['account', 'behalf', 'charge', 'top'], answer: 0, why: 'on account of ～「～のために（理由）」（= because of）。on behalf of は「～を代表して」。' },
      { sentence: 'Employees must act in ___ with company rules.', choices: ['accordance', 'according', 'agreement to', 'order'], answer: 0, why: 'in accordance with ～「～に従って」。according は according to ～ の形で使い、in のあとには来ない。' },
      { sentence: 'Everyone passed the exam, with the ___ of two students.', choices: ['exception', 'except', 'excepting', 'exclusion of'], answer: 0, why: 'with the exception of ～「～を除いて」。the のあとは名詞 exception。' },
    ],
  },
  {
    id: 'group-prep-result',
    title: '群前置詞⑦ as a result of ／ in search of ／ at the risk of（～の結果・～をさがして・～の危険をおかして）',
    points: [
      'as a result of ～「～の結果として」、in search of ～「～をさがして・求めて」、at the risk of ～「～の危険をおかして」。',
      'まん中はどれも名詞：result・search・risk。resulted・searching・risky などの形は入らない。',
    ],
    examples: [
      { en: 'As a result of the storm, many trains were stopped.', ja: '嵐の結果、多くの電車が止まった。' },
      { en: 'The birds flew south in search of warmer weather.', ja: '鳥たちはもっとあたたかい気候を求めて南へ飛んでいった。' },
    ],
    questions: [
      { sentence: 'As a ___ of the heavy snow, all the trains were cancelled.', choices: ['result', 'cause', 'reason', 'effect'], answer: 0, why: 'as a result of ～「～の結果として」。the cause of / the reason for は形が合わず、as an effect of とは言わない。' },
      { sentence: 'The explorers traveled for weeks ___ search of the lost city.', choices: ['in', 'on', 'for', 'at'], answer: 0, why: 'in search of ～「～をさがして」。' },
      { sentence: 'The firefighter entered the burning house at the ___ of his own life.', choices: ['risk', 'result', 'sake', 'mercy'], answer: 0, why: 'at the risk of ～「～の危険をおかして」。at the mercy of は「～のなすがままに」で意味が合わない。' },
    ],
  },
  {
    id: 'group-prep-honor',
    title: '群前置詞⑧ in honor of ／ in need of ／ for lack of（～をたたえて・～を必要として・～が足りなくて）',
    points: [
      'in honor of ～「～をたたえて・～を記念して」、in need of ～「～を必要として」、for lack of ～「～が足りないために」。',
      'まん中はどれも名詞：honor・need・lack。honest（形容詞）・needed（過去分詞）・lacking（形容詞・-ing）などは入らない。',
    ],
    examples: [
      { en: 'A party was held in honor of the retiring teacher.', ja: '退職する先生をたたえてパーティーが開かれた。' },
      { en: 'The project stopped for lack of money.', ja: 'その計画は資金不足で止まった。' },
    ],
    questions: [
      { sentence: 'A party was held in ___ of the teacher who was retiring.', choices: ['honor', 'need', 'charge', 'favor'], answer: 0, why: 'in honor of ～「～をたたえて・～に敬意を表して」。in favor of は「～に賛成して」で、退職する先生のパーティーには合わない。' },
      { sentence: 'After years of heavy use, the old bridge is badly ___ need of repair.', choices: ['in', 'on', 'at', 'for'], answer: 0, why: 'be in need of ～「～を必要としている」。' },
      { sentence: 'The match was cancelled for ___ of players.', choices: ['lack', 'sake', 'loss', 'fear'], answer: 0, why: 'for lack of ～「～が足りないために」。for the sake of は「～のために」で the が必要、for fear of は「～をおそれて」。' },
    ],
  },
  {
    id: 'prep-idiom-chance',
    title: '前置詞の熟語 by chance ／ for free ／ at once（偶然・無料で・すぐに）',
    points: [
      'by chance「偶然に」（= by accident）、for free「無料で」（= free of charge）、at once「すぐに」（= right away）。前置詞 ＋ 名詞（副詞）で、1つの副詞のようにはたらく。',
      'at once には「同時に」の意味もある：Don\'t talk all at once.「いっせいに話さないで」。',
    ],
    examples: [
      { en: 'I met my old teacher by chance at the bookstore.', ja: '本屋で偶然、昔の先生に会った。' },
      { en: 'Children under six can enter the museum for free.', ja: '6歳未満の子どもは無料で博物館に入れる。' },
    ],
    questions: [
      { sentence: 'I met my old teacher ___ chance at the airport.', choices: ['by', 'in', 'on', 'for'], answer: 0, why: 'by chance「偶然に」（= by accident）。' },
      { sentence: 'Children under six can enter the zoo for ___.', choices: ['free', 'nothing of', 'freedom', 'freely'], answer: 0, why: 'for free「無料で」（= for nothing / free of charge）。freely は「自由に」。' },
      { sentence: 'The doctor said he needed an operation, so he went to the hospital at ___.', choices: ['once', 'first', 'last', 'times'], answer: 0, why: 'at once「すぐに」。at first は「最初は」、at last は「ついに」、at times は「ときどき」。' },
    ],
  },
  {
    id: 'prep-idiom-public',
    title: '前置詞の熟語② in public ／ in person ／ for sale（人前で・じかに・売り物の）',
    points: [
      'in public「人前で・公の場で」（⇔ in private「こっそりと」）、in person「（本人が）じかに・直接」、for sale「売り物の」（on sale は「特売中の・発売中の」）。',
      '前置詞のあとは名詞の形：public・person・sale。publicly（副詞）・personal（形容詞）・sell（動詞）は入らない。',
    ],
    examples: [
      { en: 'He is shy and does not like to speak in public.', ja: '彼ははずかしがりやで、人前で話すのが好きではない。' },
      { en: 'I would like to thank her in person.', ja: '彼女に直接お礼を言いたい。' },
    ],
    questions: [
      { sentence: 'Some people feel nervous when they have to speak ___ public.', choices: ['in', 'at', 'on', 'for'], answer: 0, why: 'in public「人前で」（⇔ in private）。' },
      { sentence: 'I’ve talked to her on the phone many times, but I’ve never met her in ___.', choices: ['person', 'public', 'private', 'secret'], answer: 0, why: '「電話では話したが、じかには会ったことがない」なので in person「じかに・本人が」。' },
      { sentence: 'The house on the corner has been ___ sale for months, but nobody has bought it.', choices: ['for', 'by', 'in', 'at'], answer: 0, why: 'for sale「売りに出されて」。' },
    ],
  },
  {
    id: 'prep-idiom-out-of',
    title: '前置詞の熟語③ out of order ／ out of breath ／ out of reach（故障して・息を切らして・手の届かない）',
    points: [
      'out of ～ で「～の状態からはずれて」：out of order「故障して」、out of breath「息を切らして」、out of reach (of ～)「（～の）手の届かないところに」。',
      'of のあとは名詞：order・breath（名詞「息」）・reach。breathe（動詞「息をする」）とつづりをまちがえない。',
    ],
    examples: [
      { en: 'The elevator is out of order, so please use the stairs.', ja: 'エレベーターが故障しているので、階段を使ってください。' },
      { en: 'Keep this medicine out of reach of children.', ja: 'この薬は子どもの手の届かないところに置いてください。' },
    ],
    questions: [
      { sentence: 'The elevator is out of ___, so we have to use the stairs.', choices: ['order', 'stock', 'date', 'breath'], answer: 0, why: '階段を使わなければならないので out of order「故障して」。' },
      { sentence: 'After running all the way to the station, I was completely out of ___.', choices: ['breath', 'order', 'reach', 'shape of'], answer: 0, why: 'out of breath「息を切らして」。' },
      { sentence: 'Keep sharp knives ___ of the reach of children.', choices: ['out', 'off', 'away', 'outside'], answer: 0, why: 'out of (the) reach of ～「～の手のとどかないところに」。' },
    ],
  },
  {
    id: 'prep-idiom-under',
    title: '前置詞の熟語④ under construction ／ under control ／ under pressure（建設中・制御されて・プレッシャーの中で）',
    points: [
      'under ～ で「～の状態・作用を受けて」：under construction「建設中で」、under control「制御されて・おさまって」、under pressure「プレッシャーを受けて」。',
      'under のあとは名詞：construction・control・pressure。construct（動詞）・controlled（過去分詞）・pressing（-ing）などは入らない。',
    ],
    examples: [
      { en: 'A new station is under construction near my house.', ja: '家の近くで新しい駅が建設中だ。' },
      { en: 'She can stay calm even under pressure.', ja: '彼女はプレッシャーの中でも落ち着いていられる。' },
    ],
    questions: [
      { sentence: 'The new library is still under ___ and will open next year.', choices: ['construction', 'control', 'pressure', 'age'], answer: 0, why: '「来年開館する」ので under construction「建設中で」。' },
      { sentence: 'After several hours, the firefighters finally brought the fire under ___.', choices: ['control', 'construction', 'pressure', 'repair'], answer: 0, why: 'bring ～ under control「～をおさえる・制御する」。' },
      { sentence: 'Good players can make calm decisions even ___ pressure.', choices: ['under', 'in', 'on', 'with'], answer: 0, why: 'under pressure「プレッシャーの中で」。' },
    ],
  },
  {
    id: 'prep-idiom-on',
    title: '前置詞の熟語⑤ on duty ／ on display ／ on board（勤務中・展示中・乗って）',
    points: [
      'on ～ で「～している最中・～の状態で」：on duty「勤務中で」（⇔ off duty「非番で」）、on display「展示中で」、on board「（乗り物に）乗って」。',
      'on のあとは名詞の単数：duty・display・board。duties・displayed・boarding などは入らない。',
    ],
    examples: [
      { en: 'Two nurses are on duty tonight.', ja: '今夜は看護師が2人勤務している。' },
      { en: 'Old maps are on display at the city museum.', ja: '市の博物館で古い地図が展示されている。' },
    ],
    questions: [
      { sentence: 'A security guard is ___ duty at the entrance 24 hours a day.', choices: ['on', 'in', 'at', 'under'], answer: 0, why: 'on duty「勤務中で」（⇔ off duty）。' },
      { sentence: 'The museum’s oldest painting is now on ___ for the first time in fifty years.', choices: ['display', 'board', 'duty', 'air'], answer: 0, why: 'on display「展示されて」。on board は「乗って」、on duty は「勤務中で」。' },
      { sentence: 'Once all the passengers were ___ board, the ship left the port.', choices: ['on', 'in', 'at', 'aboard'], answer: 0, why: 'on board「（船・飛行機などに）乗って」（= aboard。aboard board とは言わない）。' },
    ],
  },
  {
    id: 'prep-idiom-at',
    title: '前置詞の熟語⑥ at least ／ at ease ／ at a loss（少なくとも・くつろいで・とほうにくれて）',
    points: [
      'at least「少なくとも」（⇔ at most「多くても」）、at ease「くつろいで・気楽に」、at a loss「とほうにくれて・困って」（be at a loss for words「言葉が出ない」）。',
      'at のあとの形は決まっている：least（little の最上級）・ease（名詞）・a loss（名詞）。less・easy・lose などは入らない。',
    ],
    examples: [
      { en: 'You should sleep at least seven hours a night.', ja: '一晩に少なくとも7時間はねたほうがいい。' },
      { en: 'I was at a loss for words when I heard the news.', ja: 'その知らせを聞いて、言葉が出なかった。' },
    ],
    questions: [
      { sentence: 'You should sleep for at ___ seven hours a night.', choices: ['least', 'most', 'best', 'last'], answer: 0, why: '「少なくとも7時間」なので at least。at most は「多くても」で、健康のすすめとして意味が合わない。' },
      { sentence: 'The teacher’s warm smile put the nervous students at ___.', choices: ['ease', 'rest', 'peace of', 'home of'], answer: 0, why: 'put ～ at ease「～をくつろがせる・安心させる」。at rest は「休んで・静止して」で、put ～ at rest とは言わない。' },
      { sentence: 'When she was asked such a strange question, she was at a ___ for words.', choices: ['loss', 'lack', 'need', 'end'], answer: 0, why: 'be at a loss for words「言葉につまる」。at a loss「とほうにくれて」。' },
    ],
  },
  {
    id: 'prep-idiom-in-by',
    title: '前置詞の熟語⑦ in detail ／ in a hurry ／ by heart（くわしく・急いで・暗記して）',
    points: [
      'in detail「くわしく」、in a hurry「急いで」（be in a hurry「急いでいる」）、by heart「暗記して」（learn ～ by heart「～を暗記する」）。',
      '前置詞のあとは名詞：detail・a hurry・heart。detailed・hurried・hearty などの形は入らない。',
    ],
    examples: [
      { en: 'Please explain the plan in detail.', ja: 'その計画をくわしく説明してください。' },
      { en: 'We learned the short poem by heart.', ja: '私たちはその短い詩を暗記した。' },
    ],
    questions: [
      { sentence: 'The report explains the causes of the accident ___ detail.', choices: ['in', 'on', 'at', 'with'], answer: 0, why: 'in detail「くわしく」。' },
      { sentence: 'He left the house in such a ___ that he forgot his keys.', choices: ['hurry', 'detail', 'moment', 'way'], answer: 0, why: 'in a hurry「急いで」。such a hurry that ～「とても急いでいたので～」。' },
      { sentence: 'The actor had to learn all his lines ___ heart before the first rehearsal.', choices: ['by', 'at', 'in', 'with'], answer: 0, why: 'learn ～ by heart「～を暗記する」。at heart は「根は」で意味がちがう。' },
    ],
  },
  {
    id: 'prep-idiom-for-in',
    title: '前置詞の熟語⑧ for good ／ for sure ／ in vain（永久に・確かに・むだに）',
    points: [
      'for good「永久に・これを最後に」（= forever）、for sure「確かに・はっきりと」、in vain「むだに・かいなく」（try in vain「やってみたがだめだった」）。',
      '形は決まっている：for good・for sure・in vain。goodness・surely・vainly などの形は入らない。',
    ],
    examples: [
      { en: 'My uncle left Tokyo for good.', ja: 'おじは東京をはなれ、もうもどらなかった。' },
      { en: 'We looked for the key in vain.', ja: '私たちはかぎをさがしたが、見つからなかった。' },
    ],
    questions: [
      { sentence: 'He left his hometown ___ good and never came back.', choices: ['for', 'in', 'at', 'by'], answer: 0, why: 'for good「永久に・これを最後に」。' },
      { sentence: 'Nobody knows ___ sure what caused the accident.', choices: ['for', 'in', 'at', 'by'], answer: 0, why: 'for sure「確かに・はっきりと」。' },
      { sentence: 'The firefighters tried to save the old house, but all their efforts were in ___.', choices: ['vain', 'time', 'turn', 'order'], answer: 0, why: 'in vain「むだに・かいなく」。' },
    ],
  },
  {
    id: 'prep-idiom-out-at',
    title: '前置詞の熟語⑨ out of date ／ out of stock ／ at times（古い・品切れで・ときどき）',
    points: [
      'out of date「古い・時代おくれの」（⇔ up to date「最新の」）、out of stock「品切れで・在庫切れで」（⇔ in stock「在庫があって」）、at times「ときどき」（= sometimes）。',
      '形は決まっている：out of date・out of stock・at times。dated・stocks・time などの形は入らない。',
    ],
    examples: [
      { en: 'This map is out of date, so some roads are missing.', ja: 'この地図は古いので、ない道がある。' },
      { en: 'At times, I listen to music while I study.', ja: 'ときどき、勉強しながら音楽を聞く。' },
    ],
    questions: [
      { sentence: 'This map is out of ___. Many of the roads have changed.', choices: ['date', 'stock', 'order', 'shape'], answer: 0, why: '道が変わっているので out of date「時代おくれの・古い」。out of stock は「品切れで」、out of order は「故障して」。' },
      { sentence: 'I’m sorry, but that model is out of ___. We’ll get more next week.', choices: ['stock', 'date', 'order', 'sight'], answer: 0, why: '「来週入荷する」ので out of stock「品切れで」。' },
      { sentence: '___ times, my little brother can be very noisy.', choices: ['At', 'In', 'On', 'For'], answer: 0, why: 'at times「ときどき」（= sometimes）。' },
    ],
  },
  {
    id: 'prep-idiom-in-at',
    title: '前置詞の熟語⑩ in general ／ in particular ／ at random（一般に・とくに・でたらめに）',
    points: [
      'in general「一般に・ふつうは」（文頭や文末に置く）、in particular「とくに」（名詞のあとにも置ける：this book in particular「とくにこの本」）、at random「でたらめに・無作為に」。',
      '前置詞のあとは決まった形：general・particular・random。generally・particularly・randomly は副詞なので、前置詞のあとには入らない。',
    ],
    examples: [
      { en: 'In general, cats sleep more than dogs.', ja: '一般に、ねこは犬よりよくねる。' },
      { en: 'The teacher chose three students at random.', ja: '先生は生徒を3人、無作為にえらんだ。' },
    ],
    questions: [
      { sentence: 'In ___, people who exercise regularly sleep better.', choices: ['general', 'particular', 'random', 'detail'], answer: 0, why: '「一般に」は in general。in particular は「とくに」で、文頭で一般論を述べる言い方にならない。' },
      { sentence: 'I enjoy all kinds of music, but I love jazz in ___.', choices: ['particular', 'general', 'common', 'short'], answer: 0, why: '「とりわけジャズが好き」なので in particular「とくに」。' },
      { sentence: 'The winners were chosen ___ random from all the people who entered.', choices: ['at', 'in', 'by', 'on'], answer: 0, why: 'at random「無作為に」。' },
    ],
  },
  {
    id: 'prep-idiom-in-state',
    title: '前置詞の熟語⑪ in a row ／ in silence ／ in danger（連続で・だまって・危険で）',
    points: [
      'in a row「連続で・続けて」（three days in a row「3日連続で」）、in silence「だまって・静かに」、in danger「危険な状態で」（be in danger of ～ing「～するおそれがある」）。',
      '前置詞のあとは名詞：a row・silence・danger。silent・dangerous は形容詞なので、in のあとには入らない。',
    ],
    examples: [
      { en: 'Our team won five games in a row.', ja: '私たちのチームは5試合連続で勝った。' },
      { en: 'Many kinds of frogs are in danger.', ja: '多くの種類のカエルが危険な状態にある。' },
    ],
    questions: [
      { sentence: 'Our team has won five games in a ___.', choices: ['row', 'line', 'time', 'turn'], answer: 0, why: 'in a row「連続で」。in a line は「1列に」で、連続の意味にはならない。' },
      { sentence: 'The audience listened ___ silence as the old man told his story.', choices: ['in', 'with', 'on', 'at'], answer: 0, why: 'in silence「だまって」。' },
      { sentence: 'Many species are ___ danger of extinction because of climate change.', choices: ['in', 'at', 'on', 'under'], answer: 0, why: 'be in danger of ～「～の危険がある」。at risk of と前置詞がちがうので注意。' },
    ],
  },
  {
    id: 'prep-idiom-state-2',
    title: '前置詞の熟語⑫ on fire ／ in tears ／ at war（燃えて・泣いて・戦争中で）',
    points: [
      'on fire「燃えて・火事で」、in tears「泣いて・涙を流して」（burst into tears「わっと泣き出す」）、at war「戦争中で」（⇔ at peace「平和で」）。',
      '前置詞のあとは名詞：fire・tears・war。fiery・tearful・warlike などの形容詞は入らない。tears はふつう複数形。',
    ],
    examples: [
      { en: 'Look! That old house is on fire!', ja: '見て！あの古い家が燃えている！' },
      { en: 'The two countries were at war for ten years.', ja: 'その2つの国は10年間戦争をしていた。' },
    ],
    questions: [
      { sentence: 'Call the fire department! The building across the street is ___ fire!', choices: ['on', 'in', 'at', 'under'], answer: 0, why: 'be on fire「燃えている」。' },
      { sentence: 'When she heard the sad news, she burst ___ tears.', choices: ['into', 'in', 'on', 'at'], answer: 0, why: 'burst into tears「わっと泣き出す」。状態は in tears（泣いて）だが、「泣き出す」という変化は into。' },
      { sentence: 'The two countries have been ___ war for over ten years.', choices: ['at', 'in', 'on', 'under'], answer: 0, why: 'be at war「戦争中である」（⇔ at peace）。' },
    ],
  },
  {
    id: 'prep-idiom-state-3',
    title: '前置詞の熟語⑬ in secret ／ by nature ／ in fashion（こっそり・生まれつき・流行して）',
    points: [
      'in secret「こっそり・ひそかに」（= secretly）、by nature「生まれつき・もともと」、in fashion「流行して」（⇔ out of fashion「はやらなくなって」）。',
      '前置詞のあとは名詞：secret・nature・fashion。secretly・natural・fashionable は名詞ではないので入らない。',
    ],
    examples: [
      { en: 'They planned the party in secret.', ja: '彼らはこっそりパーティーを計画した。' },
      { en: 'My sister is shy by nature.', ja: '姉は生まれつき人見知りだ。' },
    ],
    questions: [
      { sentence: 'The two leaders met ___ secret to discuss the problem.', choices: ['in', 'on', 'at', 'by'], answer: 0, why: 'in secret「ひそかに・こっそり」（= secretly）。' },
      { sentence: 'My brother is optimistic by ___. He rarely worries about anything.', choices: ['nature', 'heart', 'mistake', 'chance'], answer: 0, why: 'by nature「生まれつき・もともと」。性格を言うときは by nature。by heart は「暗記して」、by chance は「偶然に」。' },
      { sentence: 'Wide trousers are ___ fashion again this year.', choices: ['in', 'on', 'at', 'with'], answer: 0, why: 'in fashion「流行して」（⇔ out of fashion）。' },
    ],
  },
  {
    id: 'prep-idiom-in-2',
    title: '前置詞の熟語⑭ in demand ／ in progress ／ in short（需要があって・進行中で・要するに）',
    points: [
      'in demand「需要があって・引っぱりだこで」、in progress「進行中で」（work in progress「作業中のもの」）、in short「要するに・手短に言えば」（話をまとめるときに文頭で使う）。',
      '前置詞のあとは名詞：demand・progress・short（in short の形で決まっている）。demanding・progressive・shortly などの形は入らない。',
    ],
    examples: [
      { en: 'Nurses are in great demand in this city.', ja: 'この市では看護師がとても求められている。' },
      { en: 'In short, we need more time.', ja: '要するに、もっと時間が必要だ。' },
    ],
    questions: [
      { sentence: 'Nurses are in great ___ as the population grows older.', choices: ['demand', 'progress', 'need of', 'request of'], answer: 0, why: 'be in demand「需要がある」。in progress は「進行中で」。' },
      { sentence: 'Please do not enter. An exam is in ___.', choices: ['progress', 'demand', 'charge', 'time'], answer: 0, why: 'in progress「進行中で」。in demand は「需要があって」、in charge は「担当して」。' },
      { sentence: 'The hotel was dirty, noisy, and expensive. In ___, it was a disaster.', choices: ['short', 'brief of', 'case', 'order'], answer: 0, why: 'in short「要するに」（= in brief / in a word）。' },
    ],
  },
  {
    id: 'prep-idiom-at-2',
    title: '前置詞の熟語⑮ in common ／ at heart ／ at a glance（共通に・根は・ひと目で）',
    points: [
      'have ～ in common「～を共通に持つ」（have a lot in common「共通点が多い」）、at heart「根は・心の底では」、at a glance「ひと目で」。',
      '前置詞のあとは名詞：common（in common の形で）・heart・a glance。commonly・hearty・glancing などの形は入らない。',
    ],
    examples: [
      { en: 'My best friend and I have a lot in common.', ja: '親友と私には共通点が多い。' },
      { en: 'He looks strict, but he is kind at heart.', ja: '彼はきびしそうに見えるが、根はやさしい。' },
    ],
    questions: [
      { sentence: 'Although they grew up in different countries, the two scientists have a lot ___ common.', choices: ['in', 'at', 'on', 'with'], answer: 0, why: 'have ～ in common「～を共通にもつ」。' },
      { sentence: 'He acts tough, but he is a kind man ___ heart.', choices: ['at', 'in', 'by', 'on'], answer: 0, why: 'at heart「根は・心の底では」。by heart は「暗記して」で意味がちがう。' },
      { sentence: 'The chart shows ___ a glance how prices have changed.', choices: ['at', 'in', 'on', 'with'], answer: 0, why: 'at a glance「ひと目で」。' },
    ],
  },
  {
    id: 'prep-idiom-time',
    title: '前置詞の熟語⑯ at present ／ in the long run ／ on the spot（現在は・長い目で見れば・その場で）',
    points: [
      'at present「現在は・今のところ」（= now）、in the long run「長い目で見れば・結局は」（⇔ in the short run「短期的には」）、on the spot「その場で・即座に」。',
      '形は決まっている：at present・in the long run・on the spot。presently・long-running・spotted などの形は入らない。',
    ],
    examples: [
      { en: 'At present, about 30 students are in the club.', ja: '現在、そのクラブには約30人の生徒がいる。' },
      { en: 'He answered the question on the spot.', ja: '彼はその場で質問に答えた。' },
    ],
    questions: [
      { sentence: '___ present, the museum is closed for repairs.', choices: ['At', 'In', 'On', 'For'], answer: 0, why: 'at present「現在は」。for the present は「当分は」で、形がちがう。' },
      { sentence: 'Exercise may feel hard at first, but it pays off in the long ___.', choices: ['run', 'time', 'way', 'term of'], answer: 0, why: 'in the long run「長い目で見れば」。' },
      { sentence: 'The man was arrested ___ the spot.', choices: ['on', 'in', 'at', 'by'], answer: 0, why: 'on the spot「その場で・即座に」。' },
    ],
  },
  {
    id: 'prep-idiom-cost',
    title: '前置詞の熟語⑰ at all costs ／ for the time being ／ in a sense（どんなことをしても・当分のあいだ・ある意味で）',
    points: [
      'at all costs「どんなことをしても・ぜひとも」、for the time being「当分のあいだ・さしあたり」、in a sense「ある意味で」（= in a way）。',
      '形は決まっている：at all costs（costs は複数）・for the time being・in a sense。cost・time be・sensible などの形は入らない。',
    ],
    examples: [
      { en: 'We must protect the forest at all costs.', ja: '私たちはどんなことをしても、その森を守らなければならない。' },
      { en: 'In a sense, mistakes are good teachers.', ja: 'ある意味で、失敗はよい先生だ。' },
    ],
    questions: [
      { sentence: 'The general told his soldiers to defend the bridge at all ___.', choices: ['costs', 'cost', 'prices', 'means'], answer: 0, why: 'at all costs「どんな犠牲をはらっても」。costs と複数形。by all means（ぜひどうぞ）と区別する。' },
      { sentence: 'The shop is closed for the time ___, but it will reopen next spring.', choices: ['being', 'present', 'now', 'moment'], answer: 0, why: 'for the time being「当分のあいだ」。' },
      { sentence: '___ a sense, every mistake is a chance to learn.', choices: ['In', 'On', 'By', 'With'], answer: 0, why: 'in a sense「ある意味で」。' },
    ],
  },
  {
    id: 'prep-idiom-way',
    title: '前置詞の熟語⑱ in the way ／ by the way ／ in return（じゃまで・ところで・お返しに）',
    points: [
      'in the way「じゃまになって」（on the way「とちゅうで」とまちがえない）、by the way「ところで」（話題を変えるとき）、in return「お返しに」（in return for ～「～のお返しに」）。',
      '形は決まっている：the way・return（名詞）。ways・returned・returning などの形は入らない。',
    ],
    examples: [
      { en: 'Sorry, am I in the way?', ja: 'ごめん、じゃまかな？' },
      { en: 'He helped me, so I bought him lunch in return.', ja: '彼が手伝ってくれたので、お返しに昼ごはんをおごった。' },
    ],
    questions: [
      { sentence: 'Could you move your bag, please? It’s ___ the way.', choices: ['in', 'on', 'by', 'out of'], answer: 0, why: 'in the way「じゃまになって」。on the way は「途中で」、by the way は「ところで」、out of the way は「じゃまにならない所に」で、どれも意味が合わない。' },
      { sentence: 'That reminds me — ___ the way, did you finish your report?', choices: ['by', 'in', 'on', 'under'], answer: 0, why: '話題を変える by the way「ところで」。' },
      { sentence: 'He helped me with my homework, and in ___ I cooked dinner for him.', choices: ['return', 'turn', 'exchange', 'place'], answer: 0, why: 'in return「お返しに」。in turn は「順番に・今度は」で、お礼の意味にはならない。in exchange は for ～ が必要。' },
    ],
  },
  {
    id: 'prep-idiom-on-at',
    title: '前置詞の熟語⑲ on average ／ at best ／ on the whole（平均して・よくても・全体として）',
    points: [
      'on average「平均して」、at best「よくても・せいぜい」（⇔ at worst「最悪の場合」）、on the whole「全体として・概して」。',
      '形は決まっている：on average・at best・on the whole。averaged・better・wholly などの形は入らない。',
    ],
    examples: [
      { en: 'On average, students here walk 20 minutes to school.', ja: 'ここの生徒は平均して20分歩いて通学する。' },
      { en: 'On the whole, the trip was a lot of fun.', ja: '全体として、その旅行はとても楽しかった。' },
    ],
    questions: [
      { sentence: '___ average, people in this town walk about 6,000 steps a day.', choices: ['On', 'In', 'At', 'By'], answer: 0, why: 'on average「平均して」。' },
      { sentence: 'The old car can only go about 60 kilometers an hour at ___.', choices: ['best', 'least', 'last', 'first'], answer: 0, why: '「せいぜい時速60キロ」なので at best「よくても・せいぜい」。at least は「少なくとも」で、only と合わない。' },
      { sentence: 'There were a few weak scenes, but on the ___, I enjoyed the film.', choices: ['whole', 'contrary', 'way', 'spot'], answer: 0, why: 'on the whole「全体として・概して」。on the contrary は「それどころか」で but とつながらない。' },
    ],
  },
  {
    id: 'prep-idiom-time-2',
    title: '前置詞の熟語⑳ at the moment ／ in no time ／ at first sight（今のところ・すぐに・ひと目で）',
    points: [
      'at the moment「今のところ・ちょうど今」、in no time「すぐに・あっという間に」、at first sight「ひと目で・ひと目見て」（love at first sight「ひと目ぼれ」）。',
      '形は決まっている：the moment・no time・first sight（単数）。moments・times・sights などの形は入らない。',
    ],
    examples: [
      { en: 'My father is busy at the moment.', ja: '父は今、手がはなせない。' },
      { en: 'The snow melted in no time.', ja: '雪はあっという間にとけた。' },
    ],
    questions: [
      { sentence: 'I’m afraid she’s busy at the ___. Can she call you back?', choices: ['moment', 'minute of', 'second of', 'hour'], answer: 0, why: 'at the moment「ちょうど今」。' },
      { sentence: 'Don’t worry, the repair is easy. It will be finished in no ___.', choices: ['time', 'moment', 'way', 'case'], answer: 0, why: 'in no time「すぐに」。in no way は「決して～ない」で意味が逆になる。' },
      { sentence: 'They fell in love ___ first sight.', choices: ['at', 'in', 'on', 'by'], answer: 0, why: 'at first sight「ひと目で」。' },
    ],
  },
  {
    id: 'freq-idioms',
    title: '前置詞・副詞の熟語㉑ now and then ／ once in a while ／ on and off（ときどき・たまに・とぎれとぎれに）',
    points: [
      '（every）now and then「ときどき」、once in a while「たまに」、on and off「とぎれとぎれに・ときどき」（off and on とも言う）。どれも sometimes に近い意味。',
      '形は決まっている：now and then・once in a while（a をわすれない）・on and off。while のかわりに time を入れたり、and を or にしたりしない。',
    ],
    examples: [
      { en: 'Every now and then, we eat out as a family.', ja: 'ときどき、家族で外食する。' },
      { en: 'It rained on and off all day.', ja: '一日じゅう雨がふったりやんだりした。' },
    ],
    questions: [
      { sentence: 'I don’t see my cousins often, but we meet now and ___.', choices: ['then', 'later', 'soon', 'ever'], answer: 0, why: 'now and then「ときどき」（= now and again / from time to time）。' },
      { sentence: 'Once in a ___, my father cooks dinner for the whole family.', choices: ['while', 'time', 'day', 'way'], answer: 0, why: 'once in a while「たまに」。' },
      { sentence: 'It rained ___ and off all day, so we stayed inside.', choices: ['on', 'in', 'up', 'out'], answer: 0, why: 'on and off（off and on）「降ったりやんだり・とぎれとぎれに」。' },
    ],
  },
  {
    id: 'prep-idiom-meantime',
    title: '前置詞の熟語㉒ in the meantime ／ by and large ／ on second thought（そのあいだに・概して・考えなおして）',
    points: [
      'in the meantime「そのあいだに・それまでは」、by and large「概して・全体的に」、on second thought「考えなおして（やっぱり）」（気持ちを変えるときに使う）。',
      '形は決まっている：the meantime（1語）・by and large・second thought。meanwhile を the のあとに置いたり、second を two に変えたりしない。',
    ],
    examples: [
      { en: 'The doctor will see you soon. In the meantime, please fill out this form.', ja: 'もうすぐ診察します。それまでのあいだ、この用紙に記入してください。' },
      { en: 'On second thought, I\'ll have tea instead of coffee.', ja: 'やっぱり、コーヒーのかわりに紅茶にします。' },
    ],
    questions: [
      { sentence: 'The doctor will see you soon. In the ___, please fill in this form.', choices: ['meantime', 'meanwhile of', 'moment', 'end'], answer: 0, why: 'in the meantime「そのあいだに」（= meanwhile）。in the end は「結局」。' },
      { sentence: 'There were a few problems, but by and ___, the event was a success.', choices: ['large', 'big', 'wide', 'far'], answer: 0, why: 'by and large「概して・全体的に」。by and big とは言わない。' },
      { sentence: 'I’ll take the bus. No, on second ___, I’ll walk.', choices: ['thought', 'idea', 'mind', 'opinion'], answer: 0, why: 'on second thought「考えなおして」（イギリス英語では on second thoughts）。' },
    ],
  },
  {
    id: 'prep-idiom-sight',
    title: '前置詞の熟語㉓ in the distance ／ out of sight ／ at hand（遠くに・見えなくなって・手元に）',
    points: [
      'in the distance「遠くに」、out of sight「見えないところに」（⇔ in sight「見えるところに」）、at hand「手元に・近くに」（close at hand「すぐ手のとどくところに」）。',
      '形は決まっている：the distance・sight・hand（どれも名詞）。distant・sighted・handy などの形は入らない。',
    ],
    examples: [
      { en: 'We could see Mt. Fuji in the distance.', ja: '遠くに富士山が見えた。' },
      { en: 'Keep a dictionary at hand when you read.', ja: '本を読むときは、辞書を手元に置いておこう。' },
    ],
    questions: [
      { sentence: 'We could see the lights of the city ___ the distance.', choices: ['in', 'at', 'on', 'by'], answer: 0, why: 'in the distance「遠くに」。at a distance は「少しはなれて」で、the distance の前は in。' },
      { sentence: 'Out of ___, out of mind.', choices: ['sight', 'eye', 'view', 'look'], answer: 0, why: 'Out of sight, out of mind.「去る者は日々にうとし（見えなくなると忘れられる）」。out of sight「見えなくなって」。' },
      { sentence: 'The exams are close ___ hand, so I must study harder.', choices: ['at', 'in', 'on', 'by'], answer: 0, why: 'at hand「すぐ近くに・間近に」。in hand は「手がけて・管理して」で意味がちがう。' },
    ],
  },
  {
    id: 'prep-idiom-the',
    title: '前置詞の熟語㉔ in the shade ／ in the dark ／ under the weather（日かげで・暗やみで（知らされずに）・体調が悪くて）',
    points: [
      'in the shade「日かげで」（in the sun「日なたで」）、in the dark「暗やみで」（keep ～ in the dark「～に知らせずにおく」）、under the weather「体調が悪くて」。',
      'どれも the ＋名詞：the shade・the dark・the weather。shady・darkness・weathers などの形は入らない。',
    ],
    examples: [
      { en: 'Cats like to sleep in the shade on hot days.', ja: 'ねこは暑い日には日かげでねるのが好きだ。' },
      { en: 'I\'m a little under the weather today.', ja: '今日は少し体調が悪い。' },
    ],
    questions: [
      { sentence: 'Let’s sit ___ the shade of that tree. It’s too hot in the sun.', choices: ['in', 'on', 'at', 'under of'], answer: 0, why: 'in the shade「日かげで」（⇔ in the sun）。' },
      { sentence: 'Nobody told me about the plan. I was completely in the ___.', choices: ['dark', 'shade', 'night', 'black'], answer: 0, why: 'be in the dark (about ～)「（～について）何も知らされていない」。in the shade は「日かげで」。' },
      { sentence: 'I think I’ll stay home today. I’m feeling a bit under the ___.', choices: ['weather', 'sky', 'rain', 'climate'], answer: 0, why: 'under the weather「体調がすぐれない」。' },
    ],
  },
  {
    id: 'prep-idiom-case',
    title: '前置詞の熟語㉕ in any case ／ in that case ／ by all means（とにかく・それなら・ぜひどうぞ）',
    points: [
      'in any case「とにかく・いずれにしても」、in that case「それなら・その場合は」、by all means「ぜひどうぞ・もちろん」（許可をもとめられて、こころよく答えるとき）。',
      '形は決まっている：any case・that case（どちらも単数）・all means（means はこの形のまま）。cases・meaning などの形は入らない。',
    ],
    examples: [
      { en: 'It may rain. In any case, we will start at nine.', ja: '雨がふるかもしれない。とにかく、9時に出発しよう。' },
      { en: '"May I use your pen?" "By all means."', ja: '「ペンを借りてもいい？」「もちろん、どうぞ。」' },
    ],
    questions: [
      { sentence: 'I’m not sure if he will come, but ___ any case, let’s start the meeting.', choices: ['in', 'at', 'on', 'by'], answer: 0, why: 'in any case「とにかく・いずれにしても」（= at any rate）。' },
      { sentence: '"The museum is closed on Mondays." "In that ___, let’s go on Tuesday."', choices: ['case', 'time', 'way', 'place'], answer: 0, why: '相手の言ったことを受けて「それなら」は in that case。' },
      { sentence: '"May I borrow your dictionary?" "___ all means."', choices: ['By', 'With', 'In', 'For'], answer: 0, why: 'By all means.「どうぞどうぞ・ぜひ」。by no means（決して～ない）と形が似ているので注意。' },
    ],
  },
  {
    id: 'prep-idiom-no-way',
    title: '前置詞の熟語㉖ in no way ／ at any rate（決して～ない・とにかく）',
    points: [
      'in no way「決して～ない・少しも～ない」（= not at all）、at any rate「とにかく・少なくとも」（= in any case）。',
      '形は決まっている：no way（単数）・any rate（単数）。ways・rates などの複数形にはしない。',
    ],
    examples: [
      { en: 'This is in no way your fault.', ja: 'これは決してあなたのせいではない。' },
      { en: 'At any rate, we finished the work on time.', ja: 'とにかく、私たちは時間どおりに仕事を終えた。' },
    ],
    questions: [
      { sentence: 'This decision is ___ no way connected with what happened last year.', choices: ['in', 'on', 'by', 'at'], answer: 0, why: 'in no way「決して～ない」（= not at all）。' },
      { sentence: 'The weather was terrible. ___ any rate, we managed to finish the race.', choices: ['At', 'In', 'On', 'By'], answer: 0, why: 'at any rate「とにかく・いずれにしても」。' },
      { sentence: 'I am ___ no means sure that he will agree.', choices: ['by', 'in', 'at', 'on'], answer: 0, why: 'by no means「決して～ない」。in no way と同じ意味だが、means の前は by。' },
    ],
  },
  {
    id: 'prep-idiom-contrary',
    title: '前置詞の熟語㉗ on the contrary ／ by contrast（それどころか・対照的に）',
    points: [
      'on the contrary「それどころか・とんでもない」（前の内容を強く打ち消して、反対のことを言う）、by contrast「対照的に・それに対して」（2つのものをくらべてちがいを言う）。',
      '形は決まっている：on the contrary（the がいる）・by contrast（the はいらない）。contrarily・contrasting などの形は入らない。',
    ],
    examples: [
      { en: '"Was the test easy?" "On the contrary, it was very hard."', ja: '「テストはかんたんだった？」「それどころか、とても難しかったよ。」' },
      { en: 'Tokyo is crowded. By contrast, my hometown is very quiet.', ja: '東京はこんでいる。それに対して、ぼくのふるさとはとても静かだ。' },
    ],
    questions: [
      { sentence: '"You must be bored." "On the ___. I’m having a wonderful time."', choices: ['contrary', 'contrast', 'other hand', 'opposite of'], answer: 0, why: '相手の言ったことを強く否定して「それどころか」は on the contrary。on the other hand は2つのことをくらべる「一方で」で、相手の発言の否定には使わない。' },
      { sentence: 'Summers here are very hot. ___ contrast, winters are mild.', choices: ['By', 'On', 'At', 'For'], answer: 0, why: 'by contrast「対照的に」（in contrast も可だが、ここに in はない）。' },
      { sentence: 'He is not lazy. ___ the contrary, he works harder than anyone.', choices: ['On', 'In', 'By', 'To'], answer: 0, why: 'on the contrary「それどころか（逆に）」。前の否定文を強く打ち消す。' },
    ],
  },
  {
    id: 'prep-idiom-place',
    title: '前置詞の熟語㉘ in the first place ／ above all（まず第一に・とりわけ）',
    points: [
      'in the first place「まず第一に・そもそも」（理由をならべるときは in the second place「第二に」と続ける）、above all「とりわけ・何よりも」（いちばん大事なことを言うとき）。',
      '形は決まっている：the first place（the がいる）・above all。firstly place・above everything of などの形にはしない。',
    ],
    examples: [
      { en: 'I can\'t go. In the first place, I have no time.', ja: '行けないよ。まず第一に、時間がないんだ。' },
      { en: 'Above all, be kind to others.', ja: '何よりも、人にやさしくしなさい。' },
    ],
    questions: [
      { sentence: 'If you didn’t like the movie, why did you go to see it in the first ___?', choices: ['place', 'time', 'case', 'way'], answer: 0, why: 'in the first place「そもそも」。for the first time（はじめて）と混同しない。' },
      { sentence: 'A good leader must be fair and, ___ all, honest.', choices: ['above', 'under', 'after', 'beyond'], answer: 0, why: 'above all「何よりも」。after all は「結局」で意味がちがう。' },
      { sentence: 'I can’t join the trip. In the first place, I have no money. In the ___ place, I have an exam.', choices: ['second', 'next', 'other', 'last'], answer: 0, why: 'in the first place … in the second place …「第一に…第二に…」。' },
    ],
  },
  {
    id: 'prep-idiom-on-the',
    title: '前置詞の熟語㉙ on the rise ／ on the decline ／ on the go（ふえて・へって・動きまわって）',
    points: [
      'on the rise「上がって・ふえて」（= increasing）、on the decline「へって・おとろえて」（= decreasing）、on the go「いそがしく動きまわって」。',
      'どれも on the ＋名詞：rise・decline・go。rising・declined・going などの形は入らない。',
    ],
    examples: [
      { en: 'The number of foreign visitors is on the rise.', ja: '外国からの観光客の数がふえている。' },
      { en: 'My mother is always on the go.', ja: '母はいつもいそがしく動きまわっている。' },
    ],
    questions: [
      { sentence: 'Crime in the city is ___ the rise, so the police have increased patrols.', choices: ['on', 'in', 'at', 'up'], answer: 0, why: 'on the rise「増加して」。' },
      { sentence: 'As fewer people buy newspapers, the industry is on the ___.', choices: ['decline', 'rise', 'go', 'way'], answer: 0, why: '購読者がへっているので on the decline「減少して・おとろえて」。on the rise は逆の意味。' },
      { sentence: 'Busy parents are on the ___ from morning till night.', choices: ['go', 'rise', 'decline', 'air'], answer: 0, why: 'on the go「いそがしく動きまわって」。' },
    ],
  },
  {
    id: 'prep-idiom-out-of-2',
    title: '前置詞の熟語㉚ out of control ／ out of work ／ out of the question（手がつけられない・失業して・ありえない）',
    points: [
      'out of control「制御できなくなって・手がつけられない」（⇔ under control）、out of work「失業して」、out of the question「問題外で・ありえない」。',
      'out of のあとは名詞：control・work・the question。controlled・working などの形は入らない。out of the question は the がいる。',
    ],
    examples: [
      { en: 'The fire was out of control for hours.', ja: '火事は何時間も手がつけられなかった。' },
      { en: 'A trip abroad this year is out of the question.', ja: '今年の海外旅行はありえない。' },
    ],
    questions: [
      { sentence: 'The fire spread quickly and was soon ___ of control.', choices: ['out', 'off', 'beyond', 'under'], answer: 0, why: 'out of control「手がつけられない」。under control は逆に「制御されて」で of が続かない。' },
      { sentence: 'Since the factory closed, many people in the town have been out of ___.', choices: ['work', 'order', 'reach', 'date'], answer: 0, why: 'out of work「失業して」。out of order は「故障して」、out of reach は「手のとどかない」、out of date は「時代おくれの」。' },
      { sentence: 'Going on a trip abroad this year is out of the ___. We don’t have enough money.', choices: ['question', 'way', 'problem', 'matter'], answer: 0, why: 'out of the question「論外で・ありえない」。out of the way は「じゃまにならない所に」。' },
    ],
  },
  {
    id: 'prep-idiom-notice',
    title: '前置詞の熟語㉛ ahead of time ／ on short notice ／ in the short term（前もって・急に・短期的には）',
    points: [
      'ahead of time「前もって・予定より早く」（= in advance）、on short notice「急に・直前の知らせで」、in the short term「短期的には」（⇔ in the long term「長期的には」）。',
      '形は決まっている：ahead of time（time は単数）・on short notice・in the short term。times・noticed・terms などの形にはしない。',
    ],
    examples: [
      { en: 'Please buy your tickets ahead of time.', ja: 'チケットは前もって買っておいてください。' },
      { en: 'Thank you for coming on such short notice.', ja: '急なお願いだったのに、来てくれてありがとう。' },
    ],
    questions: [
      { sentence: 'If you can’t come, please tell us ___ of time.', choices: ['ahead', 'before', 'front', 'early'], answer: 0, why: 'ahead of time「前もって」（= in advance）。before of / front of time とは言わない。' },
      { sentence: 'Thank you for helping us ___ such short notice.', choices: ['on', 'in', 'with', 'for'], answer: 0, why: 'on short notice「急な知らせで」（イギリス英語では at short notice）。' },
      { sentence: 'The new policy may be unpopular in the short ___, but it will benefit the country in the long run.', choices: ['term', 'time', 'way', 'length'], answer: 0, why: 'in the short term「短期的には」。in the long run（長い目で見れば）と対になる言い方。' },
    ],
  },
  {
    id: 'prep-idiom-on-trip',
    title: '前置詞の熟語㉜ on business ／ on vacation ／ on leave（仕事で・休暇で・休みをとって）',
    points: [
      'on business「仕事で」（⇔ for pleasure「遊びで」）、on vacation「休暇で」（イギリスでは on holiday）、on leave「休みをとって・休職中で」。',
      'on のあとは a をつけない名詞：business・vacation・leave。businesses・vacationing・leaving などの形は入らない。',
    ],
    examples: [
      { en: 'Are you here on business or on vacation?', ja: 'こちらへはお仕事ですか、休暇ですか。' },
      { en: 'Our teacher is on leave this month.', ja: '私たちの先生は今月、休みをとっている。' },
    ],
    questions: [
      { sentence: 'He isn’t here this week. He has gone to Seoul ___ business.', choices: ['on', 'at', 'in', 'by'], answer: 0, why: 'on business「仕事で（出張して）」。' },
      { sentence: 'The office is quiet because half the staff are on ___ this week.', choices: ['vacation', 'holiday of', 'rest', 'break of'], answer: 0, why: 'be on vacation「休暇中で」。holiday なら on holiday（of は不要）。' },
      { sentence: 'The teacher is ___ leave for three months after having a baby.', choices: ['on', 'in', 'at', 'off'], answer: 0, why: 'on leave「休暇をとって」。この leave は名詞「休暇」。' },
    ],
  },
  {
    id: 'prep-idiom-mood',
    title: '前置詞の熟語㉝ in the mood for ／ in shape ／ in trouble（～したい気分で・体調がよくて・こまって）',
    points: [
      'be in the mood for ～「～したい気分だ」、in shape「体調がよくて」（⇔ out of shape「運動不足で・体調がわるくて」）、in trouble「こまって・こまったことになって」。',
      '前置詞のあとは名詞：the mood・shape・trouble。moody・shaped・troubled などの形容詞は入らない。',
    ],
    examples: [
      { en: 'I\'m in the mood for pizza tonight.', ja: '今夜はピザが食べたい気分だ。' },
      { en: 'My grandfather walks every day to stay in shape.', ja: '祖父は体調をたもつために毎日歩いている。' },
    ],
    questions: [
      { sentence: 'I’m tired, so I’m not ___ the mood for cooking tonight.', choices: ['in', 'on', 'at', 'for'], answer: 0, why: 'be in the mood for ～「～したい気分だ」。' },
      { sentence: 'He runs every morning to stay ___ shape.', choices: ['in', 'on', 'at', 'into'], answer: 0, why: 'stay / keep in shape「体調をよくたもつ」。' },
      { sentence: 'If you don’t finish your report by tomorrow, you will be in ___ with the teacher.', choices: ['trouble', 'danger', 'mood', 'shape'], answer: 0, why: 'be in trouble with ～「～にしかられる・～ともめる」。in danger は「危険な状態で」で with ～が続かない。' },
    ],
  },
  {
    id: 'by-by-idioms',
    title: '前置詞 by の熟語 one by one ／ step by step ／ side by side（1つずつ・一歩ずつ・ならんで）',
    points: [
      '「名詞＋by＋同じ名詞」で、くり返しやならび方を表す：one by one「1つずつ」、step by step「一歩一歩・段階をふんで」、side by side「ならんで」（little by little「少しずつ」、day by day「日に日に」も同じ形）。',
      'by の前後は同じ語で、a も -s もつけない：one by one（one by ones ではない）・step by step・side by side。',
    ],
    examples: [
      { en: 'The teacher called our names one by one.', ja: '先生は私たちの名前を1人ずつよんだ。' },
      { en: 'The two friends walked side by side.', ja: '2人の友だちはならんで歩いた。' },
    ],
    questions: [
      { sentence: 'The teacher explained the math problem step ___ step.', choices: ['by', 'to', 'for', 'on'], answer: 0, why: 'step by step「一歩ずつ・段階をふんで」。' },
      { sentence: 'The students entered the exam room one ___ one.', choices: ['by', 'for', 'to', 'with'], answer: 0, why: 'one by one「1人ずつ」。' },
      { sentence: 'The two old friends walked side by ___ along the river.', choices: ['side', 'hand', 'face', 'arm'], answer: 0, why: 'side by side「ならんで」。hand in hand（手をつないで）、face to face（面と向かって）と前置詞がちがう。' },
    ],
  },
  {
    id: 'by-by-idioms-2',
    title: '前置詞 by の熟語② little by little ／ day by day ／ year by year（少しずつ・日に日に・年々）',
    points: [
      'little by little「少しずつ」、day by day「日に日に・1日ごとに」、year by year「年々・年ごとに」。どれも変化が少しずつ進むようすを表す。',
      'by の前後は同じ語で、-s も a もつけない：little by little・day by day・year by year。',
    ],
    examples: [
      { en: 'Little by little, the ice began to melt.', ja: '少しずつ氷がとけはじめた。' },
      { en: 'The baby is growing day by day.', ja: '赤ちゃんは日に日に大きくなっている。' },
    ],
    questions: [
      { sentence: 'At first the language was difficult, but ___ by little she got used to it.', choices: ['little', 'few', 'less', 'small'], answer: 0, why: 'little by little「少しずつ」。' },
      { sentence: 'The patient is getting stronger day ___ day.', choices: ['by', 'to', 'from', 'for'], answer: 0, why: 'day by day「日に日に（変化して）」。' },
      { sentence: 'The population of the village has been falling year ___ year.', choices: ['by', 'in', 'of', 'on'], answer: 0, why: 'year by year「年々」。' },
    ],
  },
  {
    id: 'pair-prep-idioms',
    title: '前置詞をはさむ熟語 face to face ／ hand in hand ／ from time to time（面と向かって・手をつないで・ときどき）',
    points: [
      '「名詞＋前置詞＋同じ名詞」の熟語：face to face「面と向かって」、hand in hand「手をつないで」（back to back「背中合わせに」も同じ形）。from time to time は「ときどき」（= sometimes）。',
      '名詞は単数のまま、a も -s もつけない：face to face（faces ではない）・hand in hand・time to time。',
    ],
    examples: [
      { en: 'I want to talk to you face to face.', ja: 'あなたと面と向かって話したい。' },
      { en: 'From time to time, I write letters to my grandmother.', ja: 'ときどき、祖母に手紙を書く。' },
    ],
    questions: [
      { sentence: 'It is better to discuss such a serious problem face ___ face rather than by email.', choices: ['to', 'by', 'in', 'with'], answer: 0, why: 'face to face「面と向かって」。' },
      { sentence: 'The couple walked along the beach hand ___ hand.', choices: ['in', 'to', 'by', 'with'], answer: 0, why: 'hand in hand「手をつないで」。face to face と前置詞がちがうので注意。' },
      { sentence: 'I don’t go to the gym often, but I go ___ time to time.', choices: ['from', 'by', 'at', 'for'], answer: 0, why: 'from time to time「ときどき」（= sometimes）。' },
    ],
  },
  {
    id: 'from-to-idioms',
    title: '前置詞 from ～ to … の熟語 from top to bottom ／ from head to toe ／ from door to door（すみずみまで・全身・一軒一軒）',
    points: [
      'from top to bottom「上から下まで・すみずみまで」、from head to toe「頭のてっぺんからつま先まで・全身」、from door to door「一軒一軒・戸口から戸口へ」。',
      'from と to のあとの名詞には the も a もつけず、単数のまま：top・bottom・head・toe・door。',
    ],
    examples: [
      { en: 'We cleaned the classroom from top to bottom.', ja: '私たちは教室をすみずみまでそうじした。' },
      { en: 'He was covered in mud from head to toe.', ja: '彼は全身どろだらけだった。' },
    ],
    questions: [
      { sentence: 'We cleaned the whole house from top to ___ before the guests arrived.', choices: ['bottom', 'end', 'foot', 'base'], answer: 0, why: 'from top to bottom「上から下まで・すみずみまで」。' },
      { sentence: 'The boy came home covered in mud from head to ___.', choices: ['toe', 'knee', 'leg', 'heel'], answer: 0, why: 'from head to toe「頭のてっぺんからつま先まで・全身」。' },
      { sentence: 'The volunteers went from door ___ door collecting money for the hospital.', choices: ['to', 'by', 'in', 'after'], answer: 0, why: 'from door to door「一軒一軒」。' },
    ],
  },
  {
    id: 'prep-idiom-under-2',
    title: '前置詞の熟語㉞ under repair ／ under discussion ／ under way（修理中で・話し合い中で・進行中で）',
    points: [
      'under ～ で「～されている最中で」：under repair「修理中で」、under discussion「話し合い中で」、under way「進行中で・始まって」（get under way「始まる」）。',
      'under のあとは名詞：repair・discussion・way。repairing・discussed・ways などの形は入らない。',
    ],
    examples: [
      { en: 'The bridge is under repair, so we have to go around.', ja: '橋が修理中なので、回り道をしなければならない。' },
      { en: 'Plans for the festival are already under way.', ja: 'お祭りの準備はもう始まっている。' },
    ],
    questions: [
      { sentence: 'Sorry, you can’t use this elevator. It is ___ repair until Friday.', choices: ['under', 'in', 'on', 'below'], answer: 0, why: 'under repair「修理中で」。under ＋名詞で「～されている最中」（under construction / under discussion）。' },
      { sentence: 'The proposal is still under ___, so no final decision has been made.', choices: ['discussion', 'control', 'pressure', 'age'], answer: 0, why: '「まだ最終決定されていない」ので under discussion「検討中で」。under control は「制御されて」、under pressure は「圧力を受けて」。' },
      { sentence: 'Preparations for the festival are already well ___ way.', choices: ['under', 'on', 'in', 'by'], answer: 0, why: 'under way「進行中で」（underway とも書く）。on the way（途中で）と混同しない。' },
    ],
  },
  {
    id: 'prep-beyond',
    title: '前置詞 beyond の熟語 beyond description ／ beyond belief ／ beyond repair（言葉にできないほど・信じられないほど・修理できないほど）',
    points: [
      'beyond ～「～の範囲をこえて・～できないほど」：beyond description「言葉で表せないほど」、beyond belief「信じられないほど」、beyond repair「修理できないほど（こわれて）」。',
      'beyond のあとは名詞：description・belief・repair。describe・believe などの動詞の形は入らない。',
    ],
    examples: [
      { en: 'The sunset was beautiful beyond description.', ja: 'その夕日は言葉にできないほど美しかった。' },
      { en: 'My old phone is broken beyond repair.', ja: '古い携帯電話は修理できないほどこわれている。' },
    ],
    questions: [
      { sentence: 'The beauty of the sunset was ___ description.', choices: ['beyond', 'within', 'under', 'against'], answer: 0, why: 'beyond description「言葉では言い表せないほど」。' },
      { sentence: 'The old bicycle was damaged beyond ___, so we had to buy a new one.', choices: ['repair', 'belief', 'control', 'doubt'], answer: 0, why: '新しいのを買ったので beyond repair「修理できないほど」。beyond belief は「信じられないほど」、beyond control は「手に負えない」、beyond doubt は「疑いなく」。' },
      { sentence: 'His guilt was proved beyond ___.', choices: ['doubt', 'repair', 'description', 'reach'], answer: 0, why: 'beyond doubt「疑いの余地なく」。' },
    ],
  },
  {
    id: 'prep-within',
    title: '前置詞 within の熟語 within walking distance ／ within reach ／ within limits（歩いて行ける・手のとどく・限度内で）',
    points: [
      'within ～「～の範囲内で」：within walking distance「歩いて行ける距離に」、within reach「手のとどくところに」（⇔ out of reach）、within limits「限度内で・ほどほどに」。',
      '形は決まっている：walking distance・reach・limits。walk distance・reaching・limit などの形にはしない。',
    ],
    examples: [
      { en: 'My school is within walking distance of my house.', ja: '学校は家から歩いて行ける距離にある。' },
      { en: 'Keep your glasses within reach.', ja: 'めがねは手のとどくところに置いておきなさい。' },
    ],
    questions: [
      { sentence: 'The station is ___ walking distance of our school, so we don’t need a bus.', choices: ['within', 'beyond', 'out of', 'under'], answer: 0, why: 'within walking distance (of ～)「（～から）歩いて行ける距離に」。バスがいらないので within。beyond / out of では「歩いて行けない」になる。' },
      { sentence: 'Keep medicines out of ___ of small children.', choices: ['reach', 'touch', 'hand', 'arm'], answer: 0, why: 'out of reach of ～「～の手のとどかないところに」（⇔ within reach）。' },
      { sentence: 'You may use your phone at night, but ___ limits.', choices: ['within', 'beyond', 'without', 'against'], answer: 0, why: 'within limits「限度内で・ほどほどに」。but と合うのは制限つきの within。' },
    ],
  },
  {
    id: 'prep-against-2',
    title: '前置詞 against の熟語 against the law ／ against the rules ／ against one’s will（法律違反で・規則違反で・意志に反して）',
    points: [
      'against ～「～に反して」：against the law「法律違反で」、against the rules「規則違反で」、against one’s will「（人の）意志に反して・むりやり」。',
      '形は決まっている：the law（単数）・the rules（複数）・one’s will（my will・his will など）。laws・rule・willing などの形にはしない。',
    ],
    examples: [
      { en: 'It is against the law to drive without a license.', ja: '免許なしで運転するのは法律違反だ。' },
      { en: 'He had to join the team against his will.', ja: '彼は気がすすまないのに、チームに入らなければならなかった。' },
    ],
    questions: [
      { sentence: 'In many countries, it is ___ the law to drive without a license.', choices: ['against', 'over', 'beyond', 'without'], answer: 0, why: 'against the law「法律に違反して」。' },
      { sentence: 'Using a phone during the exam is against the ___.', choices: ['rules', 'rule of', 'ruler', 'ruling'], answer: 0, why: 'against the rules「規則違反で」。rules と複数形。' },
      { sentence: 'He was forced to sign the paper ___ his will.', choices: ['against', 'for', 'with', 'beyond'], answer: 0, why: 'against one’s will「意志に反して」。forced（むりやり）と合う。' },
    ],
  },
  {
    id: 'group-prep-purpose-2',
    title: '群前置詞 for the purpose of ／ for the benefit of（～の目的で・～のために）',
    points: [
      'for the purpose of ～ing「～する目的で」、for the benefit of ～「～の利益のために・～のために」。どちらも3語以上で1つの前置詞のようにはたらく（群前置詞）。',
      '形は決まっている：the purpose of（of のあとは名詞か ～ing）・the benefit of（benefit は単数）。purposes・benefits などの複数にはしない。',
    ],
    examples: [
      { en: 'He went to Canada for the purpose of studying English.', ja: '彼は英語を勉強する目的でカナダへ行った。' },
      { en: 'The park was built for the benefit of local children.', ja: 'その公園は地元の子どもたちのためにつくられた。' },
    ],
    questions: [
      { sentence: 'She went to Italy for the purpose of ___ art.', choices: ['studying', 'study', 'studied', 'to study'], answer: 0, why: 'for the purpose of ～ing「～する目的で」。of は前置詞なので動名詞 studying。to study は in order to study の形で使う。' },
      { sentence: 'The concert was held for the ___ of children who had lost their homes.', choices: ['benefit', 'purpose', 'sake of', 'reason'], answer: 0, why: 'for the benefit of ～「～のために・～の利益になるように」。for the purpose of ～は「～の目的で」で、うしろに人は来ない。' },
      { sentence: 'This land may be used only ___ the purpose of farming.', choices: ['for', 'to', 'with', 'by'], answer: 0, why: 'for the purpose of ～。前置詞は for。' },
    ],
  },
  {
    id: 'group-prep-except',
    title: '群前置詞 except for ／ aside from（～をのぞいて・～は別として）',
    points: [
      'except for ～「～をのぞいて・～があるほかは」（文の初めにも置ける）、aside from ～「～は別として・～のほかに」（= apart from）。どちらも2語で1つの前置詞のようにはたらく。',
      '組み合わせは決まっている：except for（except of ではない）・aside from（aside of ではない）。',
    ],
    examples: [
      { en: 'Except for one mistake, your essay is perfect.', ja: 'まちがいが1つあるほかは、きみの作文はかんぺきだ。' },
      { en: 'Aside from the rain, we had a great trip.', ja: '雨は別として、すばらしい旅行だった。' },
    ],
    questions: [
      { sentence: 'The shop is open every day ___ for Mondays.', choices: ['except', 'besides', 'without', 'apart'], answer: 0, why: 'except for ～「～をのぞいて」。apart なら apart from。besides（～に加えて）は for が続かない。' },
      { sentence: 'Aside ___ the price, I really like this bag.', choices: ['from', 'of', 'for', 'to'], answer: 0, why: 'aside from ～「～は別として」（= apart from）。' },
      { sentence: 'Your essay is very good ___ for a few spelling mistakes.', choices: ['except', 'besides', 'including', 'beside'], answer: 0, why: 'except for ～「～があるほかは」。besides は「～に加えて」、beside は「～のそばに」で意味が合わない。' },
    ],
  },
  {
    id: 'group-prep-contrary',
    title: '群前置詞 contrary to ／ in contrast to（～に反して・～と対照的に）',
    points: [
      'contrary to ～「～に反して・～とはちがって」（contrary to my expectations「予想に反して」）、in contrast to ～「～と対照的に」（2つのものをくらべるとき）。',
      'どちらも to をとる：contrary to（contrary of ではない）・in contrast to（in contrast of ではない。in contrast with も使える）。',
    ],
    examples: [
      { en: 'Contrary to the weather report, it was sunny all day.', ja: '天気予報に反して、一日じゅう晴れていた。' },
      { en: 'In contrast to his brother, Ken is very quiet.', ja: '兄とは対照的に、ケンはとても静かだ。' },
    ],
    questions: [
      { sentence: 'Contrary ___ popular belief, bats are not blind.', choices: ['to', 'of', 'with', 'from'], answer: 0, why: 'contrary to ～「～に反して」。' },
      { sentence: 'In contrast ___ the busy city, the village is calm and quiet.', choices: ['to', 'of', 'from', 'against'], answer: 0, why: 'in contrast to / with ～「～と対照的に」。' },
      { sentence: '___ to what we had feared, the plan worked perfectly.', choices: ['Contrary', 'Opposite', 'Unlike', 'Against'], answer: 0, why: 'contrary to ～「～に反して」。unlike は前置詞なので to は続かず、opposite to は場所の「向かい側に」の意味がふつう。' },
    ],
  },
  {
    id: 'group-prep-regard',
    title: '群前置詞 with regard to ／ in terms of（～に関して・～の点で）',
    points: [
      'with regard to ～「～に関して・～について」（= about、かたい言い方）、in terms of ～「～の点で・～から見ると」。',
      '形は決まっている：with regard to（regard は単数）・in terms of（terms は複数）。regards・term などの形にはしない。',
    ],
    examples: [
      { en: 'With regard to the trip, please ask Ms. Ito.', ja: '旅行については、イトウ先生にたずねてください。' },
      { en: 'In terms of price, this phone is the best.', ja: '値段の点では、この電話がいちばんだ。' },
    ],
    questions: [
      { sentence: 'With ___ to your question, I will reply by Friday.', choices: ['regard', 'regards', 'regarding', 'respects'], answer: 0, why: 'with regard to ～「～に関して」。with のあとは単数の regard。regards は Best regards（よろしく）などの別の用法。' },
      { sentence: 'In ___ of price, this phone is the best choice, but its battery is weak.', choices: ['terms', 'term', 'view', 'spite'], answer: 0, why: 'in terms of ～「～の点で」。terms と複数形。in view of は「～を考慮して」、in spite of は「～にもかかわらず」で意味が合わない。' },
      { sentence: 'The two plans are very different ___ terms of cost.', choices: ['in', 'on', 'at', 'with'], answer: 0, why: 'in terms of ～。前置詞は in。' },
    ],
  },
  {
    id: 'group-prep-event',
    title: '群前置詞 in the event of ／ in the face of（～の場合には・～に直面して）',
    points: [
      'in the event of ～「（万一）～の場合には」（= in case of、かたい言い方）、in the face of ～「～に直面して・～にもかかわらず」。',
      '形は決まっている：in the event of・in the face of（どちらも the がいて、うしろは of ＋名詞）。in event of・in face of などとはしない。',
    ],
    examples: [
      { en: 'In the event of fire, use the stairs.', ja: '火事の場合には、階段を使ってください。' },
      { en: 'She stayed calm in the face of danger.', ja: '彼女は危険に直面しても落ち着いていた。' },
    ],
    questions: [
      { sentence: 'In the ___ of fire, do not use the elevators.', choices: ['event', 'face', 'case of', 'time'], answer: 0, why: 'in the event of ～「～の場合には」（= in case of ～）。in the face of は「～に直面して」。case of は of が重なる。' },
      { sentence: 'The team stayed calm in the ___ of strong criticism.', choices: ['face', 'event', 'front', 'eye'], answer: 0, why: 'in the face of ～「～に直面して・～にもかかわらず」。in the event of は「～が起きた場合には」で意味が合わない。' },
      { sentence: 'Classes will be cancelled ___ the event of a typhoon warning.', choices: ['in', 'at', 'on', 'by'], answer: 0, why: 'in the event of ～。前置詞は in。' },
    ],
  },
  {
    id: 'group-prep-expense',
    title: '群前置詞 at the expense of ／ at the mercy of（～をぎせいにして・～のなすがままに）',
    points: [
      'at the expense of ～「～をぎせいにして・～をそこなって」（at the cost of ～ もほぼ同じ意味）、at the mercy of ～「～のなすがままに・～にほんろうされて」。',
      '形は決まっている：at the expense of（expense は単数）・at the mercy of（mercy は単数）。expenses・merciful などの形にはしない。',
    ],
    examples: [
      { en: 'He finished the work at the expense of his sleep.', ja: '彼は睡眠をぎせいにして仕事を終えた。' },
      { en: 'The small boat was at the mercy of the waves.', ja: '小さな船は波のなすがままだった。' },
    ],
    questions: [
      { sentence: 'The factory increased its profits ___ the expense of workers’ health.', choices: ['at', 'in', 'on', 'by'], answer: 0, why: 'at the expense of ～「～をぎせいにして」。' },
      { sentence: 'Without a strong roof, the small cabin was at the ___ of the storm.', choices: ['mercy', 'expense', 'cost', 'risk'], answer: 0, why: 'at the mercy of ～「～のなすがままに」。嵐に対してなすすべがないので mercy。at the expense / cost of は「～をぎせいにして」。' },
      { sentence: 'He finished the work quickly, but at the ___ of quality.', choices: ['expense', 'mercy', 'price of', 'loss'], answer: 0, why: 'at the expense of ～「～をぎせいにして」。at the mercy of は「～のなすがままに」で意味が合わない。at the price of も「～を代償に」だが of が重なる。' },
    ],
  },
  {
    id: 'group-prep-presence',
    title: '群前置詞 in the presence of ／ in the absence of（～のいるところで・～がいないときに）',
    points: [
      'in the presence of ～「～のいるところで・～の前で」、in the absence of ～「～がいない（ない）ときに・～がないので」。',
      'presence（いること）・absence（いないこと）は名詞。present・absent（形容詞）や presents（プレゼント）は入らない。',
    ],
    examples: [
      { en: 'Please don\'t smoke in the presence of children.', ja: '子どものいるところでたばこをすわないでください。' },
      { en: 'In the absence of the captain, Yuki led the team.', ja: 'キャプテンがいないあいだ、ユキがチームを引っぱった。' },
    ],
    questions: [
      { sentence: 'The contract must be signed ___ the presence of two witnesses.', choices: ['in', 'at', 'on', 'under'], answer: 0, why: 'in the presence of ～「～のいる前で・～の立ち会いのもとで」。' },
      { sentence: 'In the ___ of the manager, her assistant made all the decisions.', choices: ['absence', 'presence', 'place', 'case'], answer: 0, why: '「部長がいないあいだ、アシスタントがすべての決定をした」なので in the absence of ～「～がいないときに」。in the presence of だと「部長の前で」になり、アシスタントがすべて決めることと合わない。' },
      { sentence: 'Never speak badly of others ___ the presence of children.', choices: ['in', 'with', 'for', 'by'], answer: 0, why: 'in the presence of ～。前置詞は in。' },
    ],
  },
  {
    id: 'group-prep-place-at',
    title: '群前置詞 at the top of ／ at the bottom of ／ at the foot of（～のいちばん上に・～の底に・～のふもとに）',
    points: [
      'at the top of ～「～のいちばん上に・頂上に」、at the bottom of ～「～のいちばん下に・底に」、at the foot of ～「（山・階段など）のふもとに・下に」。',
      'どれも at the ＋名詞＋of の形：the がいり、top・bottom・foot は単数のまま。feet・tops などにはしない。',
    ],
    examples: [
      { en: 'There is a small temple at the top of the hill.', ja: 'おかの上に小さなお寺がある。' },
      { en: 'We stayed at a hotel at the foot of the mountain.', ja: '私たちは山のふもとのホテルにとまった。' },
    ],
    questions: [
      { sentence: 'Please write your name ___ the top of the answer sheet.', choices: ['at', 'over', 'under', 'with'], answer: 0, why: 'at the top of ～「～のいちばん上に」。用紙の上の部分という「点」は at。' },
      { sentence: 'A small village lies at the ___ of the mountain, where the river begins.', choices: ['foot', 'feet', 'toe', 'knee'], answer: 0, why: 'at the foot of ～「（山の）ふもとに」。この形では feet ではなく単数の foot。' },
      { sentence: 'The ring was found at the ___ of the lake after twenty years.', choices: ['bottom', 'foot', 'top', 'end'], answer: 0, why: '湖の「底」なので at the bottom of ～。foot は山のふもと、top は上、end は「はし・終わり」。' },
    ],
  },
  {
    id: 'group-prep-means',
    title: '群前置詞 by way of ／ by means of ／ in the course of（～経由で・～によって・～のあいだに）',
    points: [
      'by way of ～「～経由で・～を通って」、by means of ～「～という手段で・～によって」、in the course of ～「～のあいだに・～のうちに」。',
      'どれもうしろは of ＋名詞：way・means（この形のまま）・the course。ways・mean・courses などにはしない。',
    ],
    examples: [
      { en: 'We flew to London by way of Paris.', ja: '私たちはパリ経由でロンドンへ飛んだ。' },
      { en: 'In the course of the trip, we made many friends.', ja: '旅のあいだに、私たちはたくさんの友だちができた。' },
    ],
    questions: [
      { sentence: 'We flew to London by ___ of Dubai, which made the journey much longer.', choices: ['way', 'means', 'course', 'help'], answer: 0, why: 'by way of ～「～経由で」。by means of は「～という手段で」で、都市名の前には来ない。' },
      { sentence: 'Ancient sailors found their way across the ocean by ___ of the stars.', choices: ['means', 'way', 'course', 'side'], answer: 0, why: 'by means of ～「～（という手段）によって」。星を使って航海したので手段の means。by way of は「経由で」。' },
      { sentence: '___ the course of the long discussion, several new ideas emerged.', choices: ['In', 'On', 'At', 'For'], answer: 0, why: 'in the course of ～「～のあいだに・～の過程で」。' },
    ],
  },
  {
    id: 'group-prep-support',
    title: '群前置詞 in support of ／ for want of（～を支持して・～が足りないので）',
    points: [
      'in support of ～「～を支持して・～に賛成して」、for want of ～「～が足りないので・～がないために」（= for lack of ～）。',
      '形は決まっている：in support of・for want of（ここでの want は「不足」という名詞）。support for・wants of などにはしない。',
    ],
    examples: [
      { en: 'The students signed a letter in support of the new library.', ja: '生徒たちは新しい図書館に賛成する手紙に署名した。' },
      { en: 'The plants died for want of water.', ja: '植物は水が足りなくてかれてしまった。' },
    ],
    questions: [
      { sentence: 'Thousands of people marched ___ support of the new law.', choices: ['in', 'on', 'at', 'for'], answer: 0, why: 'in support of ～「～を支持して」。' },
      { sentence: 'The plants died for ___ of water during the long dry summer.', choices: ['want', 'loss', 'fear', 'place'], answer: 0, why: 'for want of ～「～が足りないので」（= for lack of ～）。for fear of ～は「～をおそれて」で意味が合わない。' },
      { sentence: 'She spoke in ___ of the plan, saying it would help local farmers.', choices: ['support', 'agree', 'supporting', 'approve'], answer: 0, why: 'in support of ～「～を支持して」。in のあとは名詞 support。agree / approve は動詞なので in のあとに来ない。' },
    ],
  },
  {
    id: 'group-prep-connection',
    title: '群前置詞 in connection with ／ in line with（～に関して・～にそって）',
    points: [
      'in connection with ～「～に関して・～に関連して」、in line with ～「～にそって・～と一致して」（in line with the rules「規則にしたがって」）。',
      'どちらも with をとる：in connection with・in line with。connection to・line to などにはしない。',
    ],
    examples: [
      { en: 'The police want to talk to him in connection with the accident.', ja: '警察はその事故に関して彼と話したがっている。' },
      { en: 'Prices went up in line with the cost of oil.', ja: '石油の値段にそって物価が上がった。' },
    ],
    questions: [
      { sentence: 'The police want to speak to two men in connection ___ the robbery.', choices: ['with', 'of', 'to', 'for'], answer: 0, why: 'in connection with ～「～に関連して」。' },
      { sentence: 'The school changed its rules in ___ with the new law.', choices: ['line', 'connection', 'charge', 'favor'], answer: 0, why: 'in line with ～「～にそって・～に従って」。法律に合わせてルールを変えたので line。in connection with は「～に関連して」で、変えた方向を表さない。' },
      { sentence: 'I am writing ___ connection with the job advertised in yesterday’s newspaper.', choices: ['in', 'on', 'with', 'by'], answer: 0, why: 'in connection with ～「～に関して」。手紙・メールの書き出しでよく使う。' },
    ],
  },
  {
    id: 'group-prep-begin-end',
    title: '群前置詞 at the beginning of ／ at the end of（～の初めに・～の終わりに）',
    points: [
      'at the beginning of ～「～の初めに」、at the end of ～「～の終わりに・つきあたりに」（at the end of the street「通りのつきあたりに」）。',
      '「～の終わりに」は at the end of。in the end（of をつけない）は「結局・最後には」という別の意味なので気をつける。',
    ],
    examples: [
      { en: 'The new term starts at the beginning of April.', ja: '新学期は4月の初めに始まる。' },
      { en: 'The post office is at the end of this street.', ja: '郵便局はこの通りのつきあたりにある。' },
    ],
    questions: [
      { sentence: 'The new tax will come into effect ___ the beginning of next year.', choices: ['at', 'on', 'over', 'for'], answer: 0, why: 'at the beginning of ～「～の初めに」。' },
      { sentence: '___ the end of the film, everyone in the theater was crying.', choices: ['At', 'In', 'On', 'For'], answer: 0, why: 'at the end of ～「～の終わりに」。in the end は「結局・最後には」で of が続かない。' },
      { sentence: 'I didn’t want to go at first, but ___ the end I really enjoyed the trip.', choices: ['in', 'at', 'on', 'by'], answer: 0, why: 'in the end「結局・最後には」。at the end of ～と区別する（of がないので in the end）。' },
    ],
  },
  {
    id: 'group-prep-back',
    title: '群前置詞 at the back of ／ in the corner of（～のうしろ（おく）に・～のすみに）',
    points: [
      'at the back of ～「～のうしろのほうに・おくに」（⇔ at the front of ～「～の前のほうに」）、in the corner of ～「（部屋など）のすみに」。',
      'どちらも the がいり、名詞は単数：the back・the corner。backs・corners などにはしない。in front of（the なし）とのちがいに気をつける。',
    ],
    examples: [
      { en: 'There is a small garden at the back of the house.', ja: '家のうしろに小さな庭がある。' },
      { en: 'A tall plant stands in the corner of the room.', ja: '部屋のすみに背の高い植物が置いてある。' },
    ],
    questions: [
      { sentence: 'Tall students were asked to stand ___ the back of the group photo.', choices: ['at', 'over', 'to', 'with'], answer: 0, why: 'at the back of ～「～のうしろのほうに」。' },
      { sentence: 'There is an old piano ___ the corner of the room.', choices: ['in', 'on', 'over', 'to'], answer: 0, why: '部屋の内側のすみは in the corner of ～。通りの角（外側）は on / at the corner of ～。' },
      { sentence: 'The restaurant is on the ___ of Main Street and Second Avenue.', choices: ['corner', 'center', 'heart', 'back'], answer: 0, why: 'on the corner of A and B「A通りとB通りの角に」。' },
    ],
  },
  {
    id: 'group-prep-hope',
    title: '群前置詞 in the hope of ／ with the aim of（～を望んで・～をめざして）',
    points: [
      'in the hope of ～ing「～することを望んで・期待して」、with the aim of ～ing「～することをめざして・～の目的で」。',
      'どちらも of のあとは名詞か動名詞（～ing）。動詞の原形や to ～ は入らない。hope・aim は単数のまま。',
    ],
    examples: [
      { en: 'She wrote to the singer in the hope of getting a reply.', ja: '彼女は返事をもらえることを期待して、その歌手に手紙を書いた。' },
      { en: 'The club was started with the aim of helping old people.', ja: 'そのクラブはお年よりを助けることを目的に始められた。' },
    ],
    questions: [
      { sentence: 'I arrived early in the hope of ___ a good seat.', choices: ['getting', 'get', 'to get', 'got'], answer: 0, why: 'in the hope of ～ing「～することを望んで」。of は前置詞なので動名詞 getting。' },
      { sentence: 'They trained hard ___ the aim of winning the championship.', choices: ['with', 'in', 'for', 'on'], answer: 0, why: 'with the aim of ～ing「～することをめざして」。' },
      { sentence: 'He wrote to the company in the ___ of finding a job.', choices: ['hope', 'aim', 'wish', 'dream'], answer: 0, why: 'in the hope of ～「～を望んで」。the aim of なら with the aim of と前置詞が with になる。' },
    ],
  },
  {
    id: 'group-prep-view',
    title: '群前置詞 in view of ／ on the basis of（～を考えると・～にもとづいて）',
    points: [
      'in view of ～「～を考えると・～をふまえて」、on the basis of ～「～にもとづいて・～を根拠に」。',
      '形は決まっている：in view of（view は単数）・on the basis of（basis は単数、複数形は bases）。views・basic などにはしない。',
    ],
    examples: [
      { en: 'In view of the cold weather, we stayed inside.', ja: '寒い天気を考えて、私たちは室内にいた。' },
      { en: 'Players are chosen on the basis of skill.', ja: '選手は技術にもとづいてえらばれる。' },
    ],
    questions: [
      { sentence: '___ view of the bad weather, the outdoor concert has been cancelled.', choices: ['In', 'On', 'At', 'By'], answer: 0, why: 'in view of ～「～を考えると・～のために」。' },
      { sentence: 'Students are selected on the ___ of their test results and interviews.', choices: ['basis', 'base', 'basic', 'bases'], answer: 0, why: 'on the basis of ～「～にもとづいて」。名詞 basis。base（土台・基地）は on the base of ～とは言わない。' },
      { sentence: 'Doctors should make decisions on the basis ___ scientific evidence.', choices: ['of', 'for', 'with', 'from'], answer: 0, why: 'on the basis of ～。basis のあとは of。' },
    ],
  },
  {
    id: 'group-prep-verge',
    title: '群前置詞 on the verge of ／ on the edge of（今にも～しそうで・～のふちに）',
    points: [
      'on the verge of ～ing「今にも～しそうで・～の寸前で」、on the edge of ～「～のふちに・はしに」（on the edge of my seat「（はらはらして）身を乗り出して」）。',
      'of のあとは名詞か動名詞（～ing）。to ～ や動詞の原形は入らない。verge・edge は単数のまま。',
    ],
    examples: [
      { en: 'The little boy was on the verge of tears.', ja: '男の子は今にも泣きだしそうだった。' },
      { en: 'There is a small house on the edge of the forest.', ja: '森のはずれに小さな家がある。' },
    ],
    questions: [
      { sentence: 'Many species of frogs are on the verge of ___ out.', choices: ['dying', 'die', 'to die', 'died'], answer: 0, why: 'on the verge of ～ing「今にも～しそうで」。of は前置詞なので動名詞 dying。die out「絶滅する」。' },
      { sentence: 'She was ___ the edge of tears when she heard the sad news.', choices: ['on', 'in', 'at', 'by'], answer: 0, why: 'on the edge of ～「今にも～しそうで・～のふちに」。on the verge of と同じく on。' },
      { sentence: 'After years of losses, the company was on the ___ of collapse.', choices: ['verge', 'way', 'top', 'side'], answer: 0, why: 'on the verge of ～「今にも～しそうで」。on the way は「途中で」、on the top of は「～の上に」、on the side of は「～の味方で」。' },
    ],
  },
  {
    id: 'group-prep-wake',
    title: '群前置詞 in the light of ／ in the wake of（～をふまえて・～のあとに）',
    points: [
      'in (the) light of ～「～をふまえて・～を考えると」（the をつけないこともある）、in the wake of ～「（事件など）のあとに・～に続いて」。',
      'どちらも of のあとは名詞。light・wake は単数のまま。lights・waking などの形にはしない。',
    ],
    examples: [
      { en: 'In the light of the test results, the plan was changed.', ja: 'テストの結果をふまえて、計画が変えられた。' },
      { en: 'Prices rose in the wake of the storm.', ja: '嵐のあと、物価が上がった。' },
    ],
    questions: [
      { sentence: 'In the ___ of the new evidence, the court decided to reopen the case.', choices: ['light', 'sight', 'view', 'eye'], answer: 0, why: 'in (the) light of ～「～をふまえて・～を考慮して」。in view of も似た意味だが the をつけない。in the sight of は「～の目から見て」。' },
      { sentence: 'Tourism fell sharply in the ___ of the terrorist attacks.', choices: ['wake', 'back', 'rear', 'tail'], answer: 0, why: 'in the wake of ～「～のあとで・～の結果として」。船が通ったあとの航跡が語源。' },
      { sentence: 'Safety checks were tightened ___ the wake of the accident.', choices: ['in', 'on', 'at', 'by'], answer: 0, why: 'in the wake of ～。前置詞は in。' },
    ],
  },
  {
    id: 'group-prep-heart',
    title: '群前置詞 in the heart of ／ at the center of（～のまん中に・～の中心に）',
    points: [
      'in the heart of ～「（町・森など）のまん中に・中心部に」、at the center of ～「～の中心に」（at the center of attention「注目のまとで」）。',
      'どちらも the がいり、名詞は単数：the heart・the center。hearts・central などの形にはしない。',
    ],
    examples: [
      { en: 'There is a big park in the heart of the city.', ja: '町のまん中に大きな公園がある。' },
      { en: 'She was at the center of attention at the party.', ja: '彼女はパーティーで注目のまとだった。' },
    ],
    questions: [
      { sentence: 'The hotel is located ___ the heart of the old city, close to all the main sights.', choices: ['in', 'on', 'by', 'over'], answer: 0, why: 'in the heart of ～「～のまん中に」。' },
      { sentence: 'Climate change is now ___ the center of political debate in many countries.', choices: ['at', 'on', 'over', 'for'], answer: 0, why: 'at the center of ～「～の中心に」。議論・関心の中心にも使う。' },
      { sentence: 'The small lake lies deep in the ___ of the forest.', choices: ['heart', 'middle of', 'inside', 'core of'], answer: 0, why: 'in the heart of ～「～の奥深く・まん中に」。the のあとに of が続くので名詞1語の heart。middle of / core of は of が重なる。' },
    ],
  },
  {
    id: 'group-prep-age',
    title: '群前置詞 at the age of ／ at a speed of（～才のときに・～の速さで）',
    points: [
      'at the age of ～「～才のときに」（= when ～ was ... years old）、at a speed of ～「～の速さで」（at a speed of 60 kilometers an hour「時速60キロで」）。',
      '前置詞は at：at the age of・at a speed of。in・on は使わない。age・speed は単数のまま。',
    ],
    examples: [
      { en: 'Mozart wrote music at the age of five.', ja: 'モーツァルトは5才で曲を書いた。' },
      { en: 'The train runs at a speed of 300 kilometers an hour.', ja: 'その列車は時速300キロで走る。' },
    ],
    questions: [
      { sentence: 'Mozart is said to have written his first piece of music ___ the age of five.', choices: ['at', 'in', 'on', 'by'], answer: 0, why: 'at the age of ～「～歳のときに」。by the age of ～は「～歳までに」の意味になる。ここは5歳という一時点なので at。' },
      { sentence: 'The new train can travel at a ___ of over 300 kilometers per hour.', choices: ['speed', 'level', 'pace of', 'distance'], answer: 0, why: 'at a speed of ～「～の速さで」。km/h（時速）と結びつくのは speed。at a rate of は割合（percent など）、distance は「距離」で意味が合わない。' },
      { sentence: 'Children in Japan start elementary school ___ the age of six.', choices: ['at', 'on', 'with', 'for'], answer: 0, why: 'at the age of six「6歳で」。' },
    ],
  },
  {
    id: 'group-prep-cost',
    title: '群前置詞 at a cost of ／ at a distance of（～の費用で・～はなれたところに）',
    points: [
      'at a cost of ～「～の費用で」、at a distance of ～「～はなれたところに」（at a distance of 100 meters「100メートルはなれて」）。',
      '前置詞は at：at a cost of・at a distance of。in・on は使わない。cost・distance は単数のまま。',
    ],
    examples: [
      { en: 'The new library was built at a cost of two billion yen.', ja: '新しい図書館は20億円の費用で建てられた。' },
      { en: 'We watched the birds at a distance of fifty meters.', ja: '私たちは50メートルはなれたところから鳥を見た。' },
    ],
    questions: [
      { sentence: 'The old castle was restored ___ a cost of three billion yen.', choices: ['at', 'in', 'for', 'with'], answer: 0, why: 'at a cost of ～「～の費用で」。' },
      { sentence: 'The mountain can be seen clearly ___ a distance of fifty kilometers.', choices: ['at', 'in', 'from', 'by'], answer: 0, why: 'at a distance of ～「～はなれたところで」。from a distance は「遠くから」で、数値を続けるときは at a distance of。' },
      { sentence: 'He saved the child’s life at the ___ of his own.', choices: ['cost', 'rate', 'speed', 'level'], answer: 0, why: 'at the cost of ～「～を犠牲にして」。of his own は of his own life のこと。at the rate of は「～の割合で」で意味が合わない。' },
    ],
  },
  {
    id: 'prep-idiom-speed',
    title: '前置詞の熟語㉟ at full speed ／ at the rate of（全速力で・～の割合で）',
    points: [
      'at full speed「全速力で」（at high speed「高速で」）、at the rate of ～「～の割合で・～の速さで」（at the rate of 3 a day「1日3つの割合で」）。',
      '前置詞は at：速さ・割合を表すときは at を使う。in・on は使わない。speed・rate は単数のまま。',
    ],
    examples: [
      { en: 'The dog ran at full speed toward the ball.', ja: '犬はボールに向かって全速力で走った。' },
      { en: 'He reads at the rate of two books a week.', ja: '彼は週に2冊の割合で本を読む。' },
    ],
    questions: [
      { sentence: 'The ambulance raced to the hospital ___ full speed.', choices: ['at', 'in', 'with', 'on'], answer: 0, why: 'at full speed「全速力で」。速度・割合を表す at。' },
      { sentence: 'The population is increasing at the ___ of about one percent a year.', choices: ['rate', 'speed', 'level', 'amount'], answer: 0, why: 'at the rate of ～「～の割合で」。percent（割合）と結びつくのは rate。' },
      { sentence: 'The glaciers are melting ___ an alarming rate.', choices: ['at', 'in', 'by', 'with'], answer: 0, why: 'at a ～ rate「～な速さ・割合で」。前置詞は at。' },
    ],
  },
  {
    id: 'prep-idiom-by-2',
    title: '前置詞の熟語㊱ by birth ／ by profession ／ by name（生まれは・職業は・名前で）',
    points: [
      'by birth「生まれは・生まれながらの」、by profession「職業は」、by name「名前で」（know him by name「名前だけは知っている」）。',
      'by のあとは a も the もつけない名詞：birth・profession・name。born・professional・named などの形は入らない。',
    ],
    examples: [
      { en: 'He is Japanese by birth, but he lives in Brazil.', ja: '彼は生まれは日本人だが、ブラジルに住んでいる。' },
      { en: 'I know the singer by name, but I have never heard her songs.', ja: 'その歌手の名前は知っているが、歌は聞いたことがない。' },
    ],
    questions: [
      { sentence: 'He works as a teacher, but he is a musician ___ nature.', choices: ['by', 'in', 'of', 'for'], answer: 0, why: 'by nature「生まれつき・本来」。by birth / by profession / by name と同じ by。' },
      { sentence: 'Although she has lived in Japan for years, she is French ___ birth.', choices: ['by', 'in', 'on', 'at'], answer: 0, why: 'by birth「生まれは」。' },
      { sentence: 'The principal knows every student in the school ___ name.', choices: ['by', 'with', 'in', 'on'], answer: 0, why: 'know ～ by name「～の名前を知っている」。' },
    ],
  },
  {
    id: 'prep-idiom-schedule',
    title: '前置詞の熟語㊲ on schedule ／ behind schedule ／ out of tune（予定どおりに・予定よりおくれて・音がずれて）',
    points: [
      'on schedule「予定どおりに」、behind schedule「予定よりおくれて」（⇔ ahead of schedule「予定より早く」）、out of tune「（楽器・歌の）音がずれて」（⇔ in tune）。',
      '形は決まっている：schedule・tune は a も the もつけず単数のまま。schedules・scheduled・tuned などにはしない。',
    ],
    examples: [
      { en: 'The bus arrived on schedule.', ja: 'バスは予定どおりに着いた。' },
      { en: 'The old piano is out of tune.', ja: 'その古いピアノは音がずれている。' },
    ],
    questions: [
      { sentence: 'Despite the heavy snow, the flight left exactly ___ schedule.', choices: ['on', 'in', 'at', 'by'], answer: 0, why: 'on schedule「予定どおりに」。on time と同じく on を使う。' },
      { sentence: 'Because of the storm, the construction project is now three weeks ___ schedule.', choices: ['behind', 'after', 'below', 'late'], answer: 0, why: 'behind schedule「予定よりおくれて」。after schedule / late schedule とは言わない。' },
      { sentence: 'The piano had not been played for years, so it was badly ___ of tune.', choices: ['out', 'off', 'away', 'under'], answer: 0, why: 'out of tune「音程がずれて」（⇔ in tune）。' },
    ],
  },
  {
    id: 'prep-idiom-spirits',
    title: '前置詞の熟語㊳ in a good mood ／ in high spirits（きげんがよくて・元気いっぱいで）',
    points: [
      'in a good mood「きげんがよくて」（⇔ in a bad mood「きげんが悪くて」）、in high spirits「元気いっぱいで・上きげんで」（⇔ in low spirits「元気がなくて」）。',
      'in のあとは名詞：a good mood（mood は単数）・high spirits（spirits は複数）。moody・spirited などの形容詞は入らない。',
    ],
    examples: [
      { en: 'My father is in a good mood because his team won.', ja: '父はチームが勝ったので、きげんがいい。' },
      { en: 'The children were in high spirits on the last day of school.', ja: '学校の最後の日、子どもたちは元気いっぱいだった。' },
    ],
    questions: [
      { sentence: 'He shouted at everyone this morning. He must be ___ a bad mood.', choices: ['in', 'on', 'at', 'with'], answer: 0, why: 'in a bad mood「きげんが悪くて」。' },
      { sentence: 'After winning the final, the players returned home in high ___.', choices: ['spirits', 'spirit', 'minds', 'hearts'], answer: 0, why: 'in high spirits「上きげんで・元気いっぱいで」。spirits と複数形にする。' },
      { sentence: 'I’m not ___ the mood for a party tonight. I’d rather stay home.', choices: ['in', 'on', 'at', 'for'], answer: 0, why: 'be in the mood for ～「～する気分である」。not in the mood で「～する気になれない」。' },
    ],
  },
  {
    id: 'prep-idiom-turn',
    title: '前置詞の熟語㊴ in total ／ in turn ／ by turns（合計で・順番に・交代で）',
    points: [
      'in total「合計で・全部で」、in turn「順番に・(今度は)その結果として」、by turns「交代で・かわるがわる」（= take turns）。',
      '前置詞のあとは名詞：total・turn・turns。totally・turned などの副詞や動詞の形は入らない。by turns は複数形 turns にする。',
    ],
    examples: [
      { en: 'We collected 120 cans in total for the recycling event.', ja: 'リサイクルの行事のために、全部で120個の缶を集めた。' },
      { en: 'The two sisters washed the dishes by turns.', ja: 'ふたりの姉妹は交代で皿を洗った。' },
    ],
    questions: [
      { sentence: 'The repairs cost 50,000 yen for parts and 30,000 yen for labor, 80,000 yen ___ total.', choices: ['in', 'at', 'on', 'by'], answer: 0, why: 'in total「合計で」。' },
      { sentence: 'The children stood in a line and answered the teacher’s questions in ___.', choices: ['turn', 'total', 'time', 'case'], answer: 0, why: 'in turn「順番に」。in total は「合計で」、in time は「間に合って」で意味が合わない。' },
      { sentence: 'On the long drive, my parents took the wheel ___ turns.', choices: ['by', 'in', 'at', 'on'], answer: 0, why: 'by turns「交代で」（= in turn / take turns）。by turns の形では by を使う。' },
    ],
  },
  {
    id: 'prep-idiom-contrast',
    title: '前置詞の熟語㊵ in comparison with ／ by comparison（～とくらべると・くらべると）',
    points: [
      'in comparison with ～「～とくらべると」（= compared with ～）、by comparison「(それと)くらべると」。by comparison は文の終わりや前に置き、くらべる相手は前の文からわかる。',
      '前置詞 in・by のあとは名詞 comparison。compare・compared・comparing などの動詞の形は入らない。',
    ],
    examples: [
      { en: 'In comparison with last summer, this summer is cool.', ja: '去年の夏とくらべると、今年の夏はすずしい。' },
      { en: 'The old phone was heavy. The new one is light by comparison.', ja: '古い電話は重かった。くらべると新しいのは軽い。' },
    ],
    questions: [
      { sentence: '___ comparison with last year, sales have nearly doubled.', choices: ['In', 'At', 'On', 'For'], answer: 0, why: 'in comparison with ～「～とくらべると」（= compared with ～）。' },
      { sentence: 'Our village is quiet in comparison ___ the busy town nearby.', choices: ['with', 'than', 'for', 'over'], answer: 0, why: 'in comparison with / to ～。than は比較級のあとに使う語で、comparison のあとには来ない。' },
      { sentence: 'The first test was hard. The second, by ___, was surprisingly easy.', choices: ['comparison', 'compare', 'comparing', 'compared'], answer: 0, why: 'by comparison「くらべると」。by のあとは名詞 comparison。compared は compared with ～ の形で使い、by のあとには来ない。' },
    ],
  },
  {
    id: 'prep-idiom-theory',
    title: '前置詞の熟語㊶ in theory ／ in practice ／ in reality（理論上は・実際には・現実には）',
    points: [
      'in theory「理論上は・考えの上では」⇔ in practice「実際には・やってみると」。in reality「現実には・本当は」は、見た目や思いこみと事実がちがうときに使う。',
      'in のあとは名詞：theory・practice・reality。theoretical・practical・real などの形容詞や、really などの副詞は入らない。',
    ],
    examples: [
      { en: 'In theory, the new rule is simple, but in practice it is hard to follow.', ja: '理論上は新しいきまりは単純だが、実際には守るのがむずかしい。' },
      { en: 'She looks calm, but in reality she is very nervous.', ja: '彼女は落ち着いて見えるが、本当はとても緊張している。' },
    ],
    questions: [
      { sentence: 'In ___, the new system should save time, but nobody has tested it yet.', choices: ['theory', 'practice', 'reality', 'fact'], answer: 0, why: '「まだだれも試していない」ので in theory「理論上は」。in practice / in reality / in fact は「実際には」で、試していないことと合わない。' },
      { sentence: 'The rule looks fair on paper, but in ___ it is rarely followed.', choices: ['practice', 'theory', 'principle', 'conclusion'], answer: 0, why: 'on paper（書類の上では）と対比して in practice「実際には」。in theory / in principle は on paper と同じ側の意味になる。' },
      { sentence: 'She appears calm on stage, but in ___ she is extremely nervous.', choices: ['reality', 'theory', 'principle', 'brief'], answer: 0, why: 'appears（～に見える）と対比して in reality「現実には・本当は」。' },
    ],
  },
  {
    id: 'prep-idiom-brief',
    title: '前置詞の熟語㊷ in brief ／ in conclusion ／ as a whole（手短に言えば・結論として・全体として）',
    points: [
      'in brief「手短に言えば・要するに」（= in short）、in conclusion「最後に・結論として」、as a whole「全体として（の）」。話や作文のまとめによく使う。',
      '前置詞のあとは名詞：brief・conclusion・a whole。briefly・conclude・wholly などの副詞や動詞は入らない。as a whole は名詞のすぐうしろにも置ける（the team as a whole「チーム全体」）。',
    ],
    examples: [
      { en: 'In brief, the new library is bigger and brighter.', ja: '手短に言えば、新しい図書館はより広く、より明るい。' },
      { en: 'The school as a whole joined the clean-up day.', ja: '学校全体で清掃の日に参加した。' },
    ],
    questions: [
      { sentence: 'The report is long, but ___ brief, it recommends closing two factories.', choices: ['in', 'at', 'on', 'for'], answer: 0, why: 'in brief「手短に言えば」（= in short）。' },
      { sentence: 'Last of all, the speaker said, "In ___, I would like to thank everyone who helped."', choices: ['conclusion', 'addition', 'contrast', 'general'], answer: 0, why: 'スピーチの最後なので in conclusion「結論として・最後に」。in addition は「さらに」、in contrast は「対照的に」、in general は「一般に」で、締めくくりにならない。' },
      { sentence: 'Some members disagreed, but the team ___ a whole supported the plan.', choices: ['as', 'in', 'on', 'for'], answer: 0, why: 'as a whole「全体として」。on the whole（概して）と混同しない。on a whole とは言わない。' },
    ],
  },
  {
    id: 'prep-idiom-ages',
    title: '前置詞の熟語㊸ for now ／ for a while ／ for ages（今のところは・しばらく・長いあいだ）',
    points: [
      'for now「今のところは・とりあえず」（That’s all for now.「今日はここまで」）、for a while「しばらくのあいだ」、for ages「長いあいだ・ずっと」（話しことば）。',
      '形に注意：for a while は a ＋単数 while、for ages は複数形 ages。nowadays・whiles・age などは入らない。現在完了といっしょに使うことも多い（I haven’t eaten sushi for ages.）。',
    ],
    examples: [
      { en: 'That’s all for now. See you next week!', ja: '今日はここまで。また来週！' },
      { en: 'We waited for ages, but the bus never came.', ja: '長いあいだ待ったけれど、バスは来なかった。' },
    ],
    questions: [
      { sentence: 'You can use my pen for ___. Give it back later.', choices: ['now', 'nowadays', 'newly'], answer: 0, why: 'for now「とりあえず・今のところは」。nowadays「近ごろは」は for のあとに置かない。' },
      { sentence: 'Please sit here and rest for a ___.', choices: ['while', 'whiles', 'whilst'], answer: 0, why: 'for a while「しばらくのあいだ」。a のあとは単数の名詞 while。' },
      { sentence: 'I haven’t talked to my cousin for ___.', choices: ['ages', 'age', 'aged'], answer: 0, why: 'for ages「長いあいだ」。ages と複数形にする。' },
    ],
  },
  {
    id: 'prep-idiom-depth',
    title: '前置詞の熟語㊹ in depth ／ at length ／ in a nutshell（深く・くわしく長々と・ひとことで言えば）',
    points: [
      'in depth「深く・徹底的に」、at length「くわしく・長々と」（「ついに」の意味もある）、in a nutshell「ひとことで言えば・要するに」。',
      '前置詞のあとは名詞：depth・length・a nutshell。deep・long・lengthy などの形容詞は入らない。',
    ],
    examples: [
      { en: 'The TV program explained the history of the castle in depth.', ja: 'そのテレビ番組は、城の歴史を深くくわしく説明した。' },
      { en: 'In a nutshell, the movie is about friendship.', ja: 'ひとことで言えば、その映画は友情についての話だ。' },
    ],
    questions: [
      { sentence: 'The documentary examines the causes of the war ___ depth.', choices: ['in', 'at', 'on', 'by'], answer: 0, why: 'in depth「深く・徹底的に」。' },
      { sentence: 'The speaker talked at ___ about his childhood, and many people fell asleep.', choices: ['length', 'depth', 'once', 'last'], answer: 0, why: '「多くの人がねむってしまった」ので at length「長々と」。at once は「すぐに」、at last は「ついに」。' },
      { sentence: 'In a ___, the new plan will save money and time.', choices: ['nutshell', 'word of', 'short', 'brief of'], answer: 0, why: 'in a nutshell「ひとことで言えば・要するに」。in short / in brief は a をつけない。' },
    ],
  },
  {
    id: 'prep-idiom-pain',
    title: '前置詞の熟語㊺ in pain ／ in surprise ／ at risk（痛がって・おどろいて・危険にさらされて）',
    points: [
      'in pain「痛がって・苦しんで」、in surprise「おどろいて」、at risk「危険にさらされて」（be at risk of ～ing「～するおそれがある」）。',
      '前置詞のあとは名詞：pain・surprise・risk。painful・surprised・risky などの形容詞は入らない。',
    ],
    examples: [
      { en: 'The boy cried out in pain when he fell off his bike.', ja: '少年は自転車から落ちて、痛くてさけんだ。' },
      { en: 'Many old trees in this forest are at risk of dying.', ja: 'この森の古い木の多くは、かれるおそれがある。' },
    ],
    questions: [
      { sentence: 'The injured player lay on the ground, clearly ___ pain.', choices: ['in', 'at', 'with', 'on'], answer: 0, why: 'in pain「痛がって・苦しんで」。状態を表す in。' },
      { sentence: 'When she heard the news, she looked up from her book ___ surprise.', choices: ['in', 'at', 'by', 'on'], answer: 0, why: 'in surprise「おどろいて」。be surprised at ～と混同して at にしない。' },
      { sentence: 'Without clean water, thousands of children are ___ risk of serious illness.', choices: ['at', 'in', 'on', 'under'], answer: 0, why: 'at risk (of ～)「（～の）危険にさらされて」。前置詞は at。' },
    ],
  },
  {
    id: 'prep-idiom-condition',
    title: '前置詞の熟語㊻ in good condition ／ in good health ／ in good hands（よい状態で・健康で・安心してまかせられて）',
    points: [
      'in good condition「（ものが）よい状態で」（⇔ in bad condition）、in good health「健康で」、in good hands「信頼できる人にまかされて・安心で」。',
      'in good のあとは名詞：condition・health・hands。healthy・conditional などの形容詞は入らない。in good hands は複数形 hands にする。',
    ],
    examples: [
      { en: 'This used bike is cheap, and it is in good condition.', ja: 'この中古の自転車は安くて、状態もよい。' },
      { en: 'Don’t worry. Your cat is in good hands with my sister.', ja: '心配しないで。君のネコは姉がちゃんと世話をするから。' },
    ],
    questions: [
      { sentence: 'The house is over a hundred years old, but it is still in excellent ___.', choices: ['condition', 'situation', 'circumstance', 'position'], answer: 0, why: 'in good / excellent condition「よい状態で」。物の状態は condition。situation は「状況」、circumstance は「事情」で、物の状態には使わない。' },
      { sentence: 'Despite his age, my grandfather remains in good ___ and walks every day.', choices: ['health', 'body', 'life', 'medicine'], answer: 0, why: 'in good health「健康で」。in good body / in good life という言い方はない。' },
      { sentence: 'Don’t worry about your dog while you are away. He is in good ___.', choices: ['hands', 'hand', 'arms', 'eyes'], answer: 0, why: 'be in good hands「安心してまかせられる（よい人に世話をされている）」。hands と複数形。in good hand とは言わない。' },
    ],
  },
  {
    id: 'prep-idiom-byhand',
    title: '前置詞の熟語㊼ by hand ／ by air ／ by phone（手作業で・飛行機で・電話で）',
    points: [
      'by hand「手で・手作業で」、by air「飛行機で・航空便で」（by sea「船便で」）、by phone「電話で」（by email「メールで」）。手段を表す by。',
      'by のあとの名詞には a・the も複数の -s もつけない：by hand（× by hands）、by phone（× by a phone）。',
    ],
    examples: [
      { en: 'My grandmother still washes the dishes by hand.', ja: '祖母は今でも手で皿を洗う。' },
      { en: 'Please send the documents to Canada by air.', ja: 'その書類はカナダへ航空便で送ってください。' },
    ],
    questions: [
      { sentence: 'These cards were all written by ___.', choices: ['hand', 'hands', 'handy'], answer: 0, why: 'by hand「手で」。by のあとは -s のない単数の名詞 hand。' },
      { sentence: 'The letter will reach London in a week if you send it by ___.', choices: ['air', 'airs', 'airy'], answer: 0, why: 'by air「航空便で」。by のあとは a も -s もつけない名詞 air。' },
      { sentence: 'You can order a pizza by ___ or online.', choices: ['phone', 'phones', 'phoned'], answer: 0, why: 'by phone「電話で」。by のあとは -s のない単数の名詞 phone。' },
    ],
  },
  {
    id: 'prep-idiom-strike',
    title: '前置詞の熟語㊽ on a diet ／ on strike ／ on air（ダイエット中で・ストライキ中で・放送中で）',
    points: [
      'on a diet「ダイエット中で・食事制限をして」、on strike「ストライキ中で」（go on strike「ストライキをする」）、on air「放送中で」。「～の状態で・～中で」の on。',
      '形に注意：on a diet は a ＋単数、on strike・on air は a も -s もつけない。dieting・strikes・aired などは入らない。',
    ],
    examples: [
      { en: 'My uncle is on a diet, so he doesn’t eat sweets.', ja: 'おじはダイエット中なので、あまいものを食べない。' },
      { en: 'Our school radio show goes on air every Friday.', ja: '学校のラジオ番組は毎週金曜日に放送される。' },
    ],
    questions: [
      { sentence: 'The doctor told my father to go ___ a diet to lower his blood pressure.', choices: ['on', 'in', 'to', 'for'], answer: 0, why: 'go on a diet「ダイエットをする」。状態の on（on a diet / on strike / on air）。' },
      { sentence: 'Train services were cancelled because the workers were ___ strike.', choices: ['on', 'in', 'at', 'under'], answer: 0, why: 'be on strike「ストライキ中で」。前置詞は on。' },
      { sentence: 'Please keep quiet. We will be ___ air in thirty seconds.', choices: ['on', 'in', 'at', 'over'], answer: 0, why: 'on air「放送中で」。on the air とも言う。' },
    ],
  },
  {
    id: 'prep-idiom-onphone',
    title: '前置詞の熟語㊾ on the phone ／ on the radio ／ on TV（電話で・ラジオで・テレビで）',
    points: [
      'メディア（電話・ラジオ・テレビ・インターネット）を通して「～で」は on：talk on the phone「電話で話す」、hear on the radio「ラジオで聞く」、watch on TV「テレビで見る」、find on the internet「インターネットで見つける」。',
      'the のつけ方に注意：on the phone・on the radio・on the internet は the をつけ、on TV は the をつけない。手段の by phone（the なし）とも区別する。',
    ],
    examples: [
      { en: 'My mother is on the phone with my aunt.', ja: '母はおばと電話で話している。' },
      { en: 'We watched the soccer game on TV.', ja: '私たちはテレビでサッカーの試合を見た。' },
    ],
    questions: [
      { sentence: 'Please be quiet. Dad is talking on the ___.', choices: ['phone', 'phones', 'phoned'], answer: 0, why: 'talk on the phone「電話で話す」。the のあとは単数の名詞 phone。' },
      { sentence: 'I heard about the storm on the ___ this morning.', choices: ['radio', 'radioed', 'radioing'], answer: 0, why: 'on the radio「ラジオで」。the のあとは名詞 radio。' },
      { sentence: 'The famous chef cooked a meal ___ TV last night.', choices: ['on', 'in', 'at'], answer: 0, why: '「テレビで」は on TV。テレビやラジオなどのメディアには on を使う。' },
    ],
  },
  {
    id: 'prep-idiom-withpleasure',
    title: '前置詞の熟語㊿ with pleasure ／ with confidence ／ with patience（喜んで・自信をもって・しんぼう強く）',
    points: [
      'with ＋名詞で副詞のはたらき：with pleasure「喜んで」（= gladly）、with confidence「自信をもって」（= confidently）、with patience「しんぼう強く」（= patiently）。',
      'with のあとは名詞：pleasure・confidence・patience。pleased・confident・patient などの形容詞は入らない。「喜んで（いいですよ）」と答えるときは With pleasure. だけでもよい。',
    ],
    examples: [
      { en: '"Could you carry this box?" "With pleasure."', ja: '「この箱を運んでくれますか。」「喜んで。」' },
      { en: 'The coach explained the rules with patience.', ja: 'コーチはしんぼう強くルールを説明した。' },
    ],
    questions: [
      { sentence: '"Could you help me carry these boxes?" "___ pleasure."', choices: ['With', 'For', 'In', 'By'], answer: 0, why: 'With pleasure.「喜んで。」依頼を引き受ける決まった返事。' },
      { sentence: 'Having prepared thoroughly, she spoke ___ confidence at the interview.', choices: ['with', 'in', 'by', 'on'], answer: 0, why: 'with confidence「自信をもって」＝ confidently。with ＋抽象名詞で副詞の意味になる。in confidence は「内緒で」で意味が変わる。' },
      { sentence: 'Teaching small children requires a great deal of ___.', choices: ['patience', 'patients', 'patient', 'patiently'], answer: 0, why: '「小さい子どもを教えるには大きな忍耐が必要だ」。a great deal of のあとは不可算名詞 patience。patients（患者たち）と発音が同じなので注意。' },
    ],
  },
  {
    id: 'prep-idiom-pairs',
    title: '前置詞の熟語51 in pairs ／ in groups ／ in a circle（ふたり一組で・グループで・輪になって）',
    points: [
      'in pairs「ふたり一組で」、in groups「グループで」（in groups of four「4人ずつのグループで」）、in a circle「輪になって」、in a line「一列に」。「どんな形・まとまりで」を表す in。',
      '形に注意：in pairs・in groups は複数形、in a circle・in a line は a ＋単数。in pair・in a circles などは使わない。',
    ],
    examples: [
      { en: 'In English class, we often talk in pairs.', ja: '英語の授業では、よくふたり一組で話す。' },
      { en: 'The children sat in a circle and sang a song.', ja: '子どもたちは輪になってすわり、歌を歌った。' },
    ],
    questions: [
      { sentence: 'The teacher told us to work in ___.', choices: ['pairs', 'pair', 'paired'], answer: 0, why: 'in pairs「ふたり一組で」。pairs と複数形にする。' },
      { sentence: 'The dancers stood in a ___ around the fire.', choices: ['circle', 'circles', 'circled'], answer: 0, why: 'in a circle「輪になって」。a のあとは単数の名詞 circle。' },
      { sentence: 'The visitors walked around the museum in small ___.', choices: ['groups', 'group', 'grouped'], answer: 0, why: 'in groups「グループで」。small のあとは複数形 groups（a がないので単数 group は入らない）。' },
    ],
  },
  {
    id: 'prep-idiom-incash',
    title: '前置詞の熟語52 in pencil ／ in cash ／ in a low voice（鉛筆で・現金で・小さな声で）',
    points: [
      '「何を使って・どんな形で」の in：write in pencil「鉛筆で書く」（in ink「ペンのインクで」）、pay in cash「現金で払う」、speak in a low voice「小さな声で話す」（in English「英語で」も同じ）。',
      'カードは by を使う（pay by card）。in pencil・in cash は a をつけず、in a low voice は a ＋単数 voice。in のあとに動詞の形（penciled・cashed・voiced）は入らない。',
    ],
    examples: [
      { en: 'Please fill in this form in pencil.', ja: 'この用紙は鉛筆で書きこんでください。' },
      { en: 'The librarian asked us to talk in a low voice.', ja: '図書館の人は、小さな声で話すように私たちにたのんだ。' },
    ],
    questions: [
      { sentence: 'Write your answers in ___ so you can erase them.', choices: ['pencil', 'penciled', 'penciling'], answer: 0, why: 'write in pencil「鉛筆で書く」。in のあとは名詞 pencil。' },
      { sentence: 'This shop is small, so you have to pay in ___.', choices: ['cash', 'cashed', 'cashing'], answer: 0, why: 'pay in cash「現金で払う」。in のあとは名詞 cash。' },
      { sentence: 'The baby is sleeping, so please speak in a low ___.', choices: ['voice', 'voiced', 'voicing'], answer: 0, why: 'in a low voice「小さな声で」。a low のあとは名詞 voice。' },
    ],
  },
  {
    id: 'prep-idiom-dawn',
    title: '前置詞の熟語53 at dawn ／ at sunset ／ at midnight（夜明けに・日の入りに・真夜中に）',
    points: [
      '1日の中の「時の一点」には at：at dawn「夜明けに」、at sunrise「日の出に」、at sunset「日の入りに」、at noon「正午に」、at midnight「真夜中（午前0時）に」。',
      'in the morning・in the evening のような「時間のはば」は in だが、dawn・sunset・midnight は一点なので at。どれも the をつけない。',
    ],
    examples: [
      { en: 'The farmers start working at dawn.', ja: '農家の人たちは夜明けに働きはじめる。' },
      { en: 'We took pictures of the beach at sunset.', ja: '私たちは日の入りに浜辺の写真をとった。' },
    ],
    questions: [
      { sentence: 'The birds begin to sing ___ dawn.', choices: ['at', 'in', 'on'], answer: 0, why: 'at dawn「夜明けに」。時の一点なので at。in・on は使わない。' },
      { sentence: 'The sky turned orange ___ sunset.', choices: ['at', 'in', 'on'], answer: 0, why: 'at sunset「日の入りに」。時の一点なので at。' },
      { sentence: 'Cinderella had to leave the party ___ midnight.', choices: ['at', 'in', 'on'], answer: 0, why: 'at midnight「真夜中に」。時の一点なので at。' },
    ],
  },
  {
    id: 'prep-idiom-mondaymorning',
    title: '前置詞の熟語54 on Monday morning ／ on weekdays ／ in the 1990s（月曜の朝に・平日に・1990年代に）',
    points: [
      'in the morning は in だが、曜日や日付がつくと on：on Monday morning「月曜の朝に」、on the morning of May 5「5月5日の朝に」。on weekdays「平日に」、on weekends「週末に」も on。',
      '年代・世紀など長い期間は in：in the 1990s「1990年代に」、in the 21st century「21世紀に」。',
    ],
    examples: [
      { en: 'My brother plays soccer on Sunday afternoon.', ja: '兄は日曜日の午後にサッカーをする。' },
      { en: 'Smartphones were not common in the 1990s.', ja: '1990年代には、スマートフォンは一般的ではなかった。' },
    ],
    questions: [
      { sentence: 'We have a club meeting ___ Friday morning.', choices: ['on', 'in', 'at'], answer: 0, why: '曜日がつくと、朝でも on（on Friday morning）。' },
      { sentence: 'The museum is quiet ___ weekdays.', choices: ['on', 'in', 'at'], answer: 0, why: 'on weekdays「平日に」。曜日と同じく on を使う。' },
      { sentence: 'My parents met ___ the 1990s.', choices: ['in', 'on', 'at'], answer: 0, why: 'in the 1990s「1990年代に」。年代など長い期間は in。' },
    ],
  },
  {
    id: 'prep-idiom-intherain',
    title: '前置詞の熟語55 in the rain ／ in the snow ／ in the wind（雨の中で・雪の中で・風に）',
    points: [
      '天気の「中で」は in the ～：in the rain「雨の中で」、in the snow「雪の中で」、in the wind「風に（ふかれて）」、in the sun「日なたで」。',
      'in the のあとは名詞：rain・snow・wind。rainy・snowy・windy などの形容詞は入らない（It is rainy. のように形容詞は be 動詞のあとで使う）。',
    ],
    examples: [
      { en: 'The children played happily in the snow.', ja: '子どもたちは雪の中で楽しそうに遊んだ。' },
      { en: 'The flags were waving in the wind.', ja: '旗が風にはためいていた。' },
    ],
    questions: [
      { sentence: 'Don’t walk home in the ___ without an umbrella.', choices: ['rain', 'rainy', 'rained'], answer: 0, why: 'in the rain「雨の中で」。the のあとは名詞 rain。' },
      { sentence: 'Our dog loves to roll around in the ___.', choices: ['snow', 'snowy', 'snowed'], answer: 0, why: 'in the snow「雪の中で」。the のあとは名詞 snow。' },
      { sentence: 'The leaves were dancing in the ___.', choices: ['wind', 'windy', 'winded'], answer: 0, why: 'in the wind「風に（ふかれて）」。the のあとは名詞 wind。' },
    ],
  },
  {
    id: 'prep-idiom-bythehour',
    title: '前置詞の熟語56 by the hour ／ by the dozen ／ by the meter（1時間単位で・ダース単位で・メートル単位で）',
    points: [
      '「～単位で（売る・はらう）」は by the ＋単位：by the hour「1時間いくらで」、by the dozen「ダース（12個）単位で」、by the meter「1メートルいくらで」、by the kilo「1キロ単位で」。',
      'by と単位のあいだには the が入り、単位は単数。by hour・by the hours とはしない。',
    ],
    examples: [
      { en: 'At this shop, you can rent bikes by the hour.', ja: 'この店では、自転車を1時間単位で借りられる。' },
      { en: 'Pencils are cheaper when you buy them by the dozen.', ja: '鉛筆はダース単位で買うと安くなる。' },
    ],
    questions: [
      { sentence: 'Most part-time workers in this shop are paid ___ the hour.', choices: ['by', 'for', 'per', 'in'], answer: 0, why: 'be paid by the hour「時給で支払われる」。単位を表す by the ＋単数名詞。per は per hour で the をつけない。' },
      { sentence: 'Eggs are usually sold ___ the dozen in that market.', choices: ['by', 'in', 'for', 'at'], answer: 0, why: 'by the dozen「ダース単位で」。単位を表す by the ＋単数名詞。' },
      { sentence: 'This fabric is sold by ___ meter, not by the roll.', choices: ['the', 'a', 'one', 'each'], answer: 0, why: 'by the meter「1メートル単位で」。単位を表すときは by the ＋単数名詞で、the を使う。' },
    ],
  },
  {
    id: 'prep-idiom-inuniform',
    title: '前置詞の熟語57 in uniform ／ in black ／ in disguise（制服を着て・黒い服を着て・変装して）',
    points: [
      '「～を着て・身につけて」は in：in uniform「制服を着て」、in black「黒い服を着て」（in red・in white も同じ）、in a suit「スーツを着て」、in disguise「変装して」。',
      'the man in black「黒い服の男性」のように、名詞のうしろから説明することも多い。in のあとは名詞：uniform・disguise（uniformed・disguised は入らない）。',
    ],
    examples: [
      { en: 'The police officers were in uniform.', ja: '警察官たちは制服を着ていた。' },
      { en: 'Who is the man in black over there?', ja: 'あそこにいる黒い服の男性はだれですか。' },
    ],
    questions: [
      { sentence: 'On the first day, all the students came in school ___.', choices: ['uniform', 'uniformed', 'uniformly'], answer: 0, why: 'in uniform「制服を着て」。in school のあとは名詞 uniform。' },
      { sentence: 'The singer ___ white is very popular.', choices: ['in', 'on', 'with'], answer: 0, why: 'the singer in white「白い服の歌手」。「～を着て」は in。' },
      { sentence: 'The king walked around the town in ___.', choices: ['disguise', 'disguised', 'disguising'], answer: 0, why: 'in disguise「変装して」。in のあとは名詞 disguise。' },
    ],
  },
  {
    id: 'prep-idiom-tomysurprise',
    title: '前置詞の熟語58 to my surprise ／ to my relief ／ to my joy（おどろいたことに・ほっとしたことに・うれしいことに）',
    points: [
      'to ＋所有格＋感情の名詞で「～したことに」：to my surprise「おどろいたことに」、to my relief「ほっとしたことに」、to my joy「うれしいことに」。文の頭に置いてコンマで区切ることが多い。',
      'to のあとは「所有格（my・his・her・our など）＋名詞」。surprised・relieved などの形容詞は入らない。much を前につけると強調（Much to my surprise, ...）。',
    ],
    examples: [
      { en: 'To my surprise, the quiet boy sang very well.', ja: 'おどろいたことに、そのおとなしい少年はとても上手に歌った。' },
      { en: 'To our relief, the lost dog came home.', ja: 'ほっとしたことに、まいごの犬が家に帰ってきた。' },
    ],
    questions: [
      { sentence: 'To my ___, my little brother cooked dinner for us.', choices: ['surprise', 'surprised', 'surprising'], answer: 0, why: 'to my surprise「おどろいたことに」。my のあとは名詞 surprise。' },
      { sentence: 'To her ___, the test was easier than she thought.', choices: ['relief', 'relieved', 'relieve'], answer: 0, why: 'to her relief「ほっとしたことに」。her のあとは名詞 relief。' },
      { sentence: '___ my joy, my grandparents came to watch my game.', choices: ['To', 'For', 'With'], answer: 0, why: 'to my joy「うれしいことに」。感情を表すこの形は to を使う。' },
    ],
  },
  {
    id: 'prep-idiom-latest',
    title: '前置詞の熟語59 at the latest ／ at the earliest ／ at most（おそくとも・早くても・多くても）',
    points: [
      'at ＋最上級で「どんなに～でも」：at the latest「おそくとも」、at the earliest「早くても」、at most「多くても・せいぜい」（⇔ at least「少なくとも」）。',
      'どれも最上級を使う：latest・earliest・most。late・earlier・more などは入らない。at most には the をつけない。',
    ],
    examples: [
      { en: 'I will be home by seven at the latest.', ja: 'おそくとも7時までには家に帰ります。' },
      { en: 'The walk to the station takes ten minutes at most.', ja: '駅まで歩いても、せいぜい10分だ。' },
    ],
    questions: [
      { sentence: 'Applications must reach our office by Friday ___ the latest.', choices: ['at', 'in', 'on', 'by'], answer: 0, why: 'at the latest「おそくとも」。最上級と結びつく at（at the earliest / at most / at least）。' },
      { sentence: 'Given the repairs needed, the museum will reopen in June at the ___.', choices: ['earliest', 'latest', 'soonest', 'fastest'], answer: 0, why: '「修理が必要なので早くても6月」という文脈なので at the earliest「早くても」。at the latest だと「おそくとも6月」で、修理が必要という理由と合わない。' },
      { sentence: 'The trip should take three hours at ___, even if the traffic is heavy.', choices: ['most', 'least', 'first', 'last'], answer: 0, why: '「渋滞しても、多くても3時間」なので at most「多くても・せいぜい」。at least は「少なくとも」で逆の意味。' },
    ],
  },
  {
    id: 'prep-idiom-onthemove',
    title: '前置詞の熟語60 in a rush ／ on the move ／ on the run（急いで・動き回って・にげている）',
    points: [
      'in a rush「急いで」（= in a hurry）、on the move「動き回って・移動中で」、on the run「にげている・逃走中で」。「～の状態で」を表す in・on。',
      '前置詞のあとは名詞：a rush・the move・the run。rushing・moving・running などの -ing 形は入らない。',
    ],
    examples: [
      { en: 'Sorry, I can’t stop. I’m in a rush.', ja: 'ごめん、止まれないんだ。急いでいるから。' },
      { en: 'Our family is always on the move during the holidays.', ja: 'わが家は休みのあいだ、いつも動き回っている。' },
    ],
    questions: [
      { sentence: 'Sorry I can’t talk now. I’m ___ a rush to catch my train.', choices: ['in', 'on', 'at', 'with'], answer: 0, why: 'in a rush「急いで」（= in a hurry）。前置詞は in。' },
      { sentence: 'Every autumn, millions of birds are on the ___ toward warmer regions.', choices: ['move', 'run', 'spot', 'air'], answer: 0, why: 'on the move「移動中で」。on the run は「逃走中で」、on the spot は「その場で」、on air は「放送中で」。' },
      { sentence: 'The prisoner who escaped last week is still ___ the run.', choices: ['on', 'in', 'at', 'under'], answer: 0, why: 'on the run「逃走中で」。前置詞は on。' },
    ],
  },
  {
    id: 'prep-idiom-underage',
    title: '前置詞の熟語61 under the age of ／ over the age of ／ come of age（～歳未満の・～歳をこえた・成人する）',
    points: [
      'under the age of ～「～歳未満の」、over the age of ～「～歳をこえた」、come of age「成人する・大人になる」。年れいを表すまとまり。',
      'どれも名詞 age を使う：the age of・of age。aged・ages・aging は入らない。under・over はうしろの年れいをふくまないことに注意（under the age of 6 は「6歳未満」）。',
    ],
    examples: [
      { en: 'Children under the age of six can enter the zoo for free.', ja: '6歳未満の子どもは、無料で動物園に入れる。' },
      { en: 'In Japan, people come of age at eighteen.', ja: '日本では、18歳で成人する。' },
    ],
    questions: [
      { sentence: 'Children ___ the age of twelve are not allowed to see this film alone.', choices: ['under', 'beneath', 'down', 'behind'], answer: 0, why: 'under the age of ～「～歳未満の」。年齢・金額の「未満」は under。beneath は位置や身分の「下」で年齢には使わない。' },
      { sentence: 'This health check is recommended for adults ___ the age of fifty.', choices: ['over', 'across', 'through', 'along'], answer: 0, why: 'over the age of ～「～歳をこえた」。年齢の「以上・こえて」は over。' },
      { sentence: 'In Japan, young people now come ___ age at eighteen.', choices: ['of', 'to', 'at', 'in'], answer: 0, why: 'come of age「成人する」。of を使う決まった言い方。' },
    ],
  },
  {
    id: 'prep-idiom-inspace',
    title: '前置詞の熟語62 in space ／ on the moon ／ in the sky（宇宙で・月面で・空に）',
    points: [
      '広がりの「中」は in：in space「宇宙で」（the をつけない）、in the sky「空に」。表面の「上」は on：on the moon「月面で」、on the earth「地球上で」。',
      'sky は「空の中」と考えるので in the sky（on the sky とは言わない）。moon・earth は表面に立つので on。',
    ],
    examples: [
      { en: 'Some astronauts have lived in space for a year.', ja: '1年間宇宙で暮らした宇宙飛行士もいる。' },
      { en: 'A rainbow appeared in the sky after the rain.', ja: '雨のあと、空ににじが出た。' },
    ],
    questions: [
      { sentence: 'The astronauts did many experiments ___ space.', choices: ['in', 'on', 'at'], answer: 0, why: 'in space「宇宙で」。広がりの中なので in。' },
      { sentence: 'People first walked ___ the moon in 1969.', choices: ['on', 'in', 'at'], answer: 0, why: 'on the moon「月面で」。表面の上なので on。' },
      { sentence: 'Look! Many birds are flying ___ the sky.', choices: ['in', 'on', 'at'], answer: 0, why: 'in the sky「空に」。空は広がりの中と考えるので in。' },
    ],
  },
  {
    id: 'prep-idiom-inaminute',
    title: '前置詞の熟語63 in a minute ／ in a moment ／ in an instant（すぐに・まもなく・あっというまに）',
    points: [
      'in a minute「すぐに・もうすぐ」、in a moment「まもなく・少ししたら」、in an instant「あっというまに・一瞬で」。「これから少しのうちに」を表す in。',
      'a・an のあとは単数の名詞：minute・moment・instant。minutes・moments・instantly などは入らない。instant は母音で始まるので an。',
    ],
    examples: [
      { en: 'Dinner will be ready in a minute.', ja: '夕食はもうすぐできるよ。' },
      { en: 'The fireworks lit up the sky in an instant.', ja: '花火が一瞬で空を明るくした。' },
    ],
    questions: [
      { sentence: 'Just wait. I’ll call you back in a ___.', choices: ['minute', 'minutes', 'minutely'], answer: 0, why: 'in a minute「すぐに」。a のあとは単数の名詞 minute。' },
      { sentence: 'The train will arrive in a ___.', choices: ['moment', 'moments', 'momentary'], answer: 0, why: 'in a moment「まもなく」。a のあとは単数の名詞 moment。' },
      { sentence: 'The ice cream melted in an ___ on the hot day.', choices: ['instant', 'instants', 'instantly'], answer: 0, why: 'in an instant「あっというまに」。an のあとは単数の名詞 instant。' },
    ],
  },
  {
    id: 'prep-idiom-harmony',
    title: '前置詞の熟語64 in harmony ／ in unison ／ in chorus（調和して・声をそろえて・みんなで）',
    points: [
      'in harmony (with ～)「（～と）調和して・仲よく」、in unison「声をそろえて・いっせいに」、in chorus「みんなで声をそろえて」。いっしょに・そろってを表す in。',
      'in のあとは名詞：harmony・unison・chorus。harmonious・united・choral などの形容詞は入らない。',
    ],
    examples: [
      { en: 'The people in this village live in harmony with nature.', ja: 'この村の人々は自然と調和して暮らしている。' },
      { en: 'The children answered "Yes!" in unison.', ja: '子どもたちは声をそろえて「はい！」と答えた。' },
    ],
    questions: [
      { sentence: 'The village has tried for centuries to live in ___ with the forest around it.', choices: ['harmony', 'unison', 'chorus', 'order'], answer: 0, why: 'live in harmony with ～「～と調和して暮らす」。in unison / in chorus は「声をそろえて」、in order は「整って」で、自然と共生する意味にならない。' },
      { sentence: 'When the teacher entered, the students greeted her ___ unison.', choices: ['in', 'with', 'by', 'at'], answer: 0, why: 'in unison「声をそろえて・いっせいに」。前置詞は in。' },
      { sentence: 'When the band began the famous song, the whole audience joined in ___ chorus.', choices: ['in', 'on', 'by', 'with'], answer: 0, why: 'in chorus「声をそろえて」。in unison と同じく in を使う。' },
    ],
  },
  {
    id: 'prep-idiom-forfun',
    title: '前置詞の熟語65 for fun ／ for a change ／ for rent（楽しみで・気分転換に・貸し出し中で）',
    points: [
      'for fun「楽しみで・遊びで」、for a change「気分転換に・たまには」、for rent「貸し出し用の」（for sale「売り物の」と同じ形）。目的・用途を表す for。',
      'for のあとは名詞：fun・a change・rent。funny・changed・rented などは入らない。for a change は a をつける。',
    ],
    examples: [
      { en: 'My father bakes bread on weekends just for fun.', ja: '父は週末に、楽しみでパンを焼く。' },
      { en: 'Let’s walk to school for a change.', ja: 'たまには学校まで歩いて行こう。' },
    ],
    questions: [
      { sentence: 'She writes short stories just for ___.', choices: ['fun', 'funny', 'funnily'], answer: 0, why: 'for fun「楽しみで」。for のあとは名詞 fun。' },
      { sentence: 'We usually eat at home, but let’s eat out for a ___.', choices: ['change', 'changed', 'changing'], answer: 0, why: 'for a change「気分転換に・たまには」。a のあとは名詞 change。' },
      { sentence: 'The sign on the house says "For ___."', choices: ['Rent', 'Rented', 'Rents'], answer: 0, why: 'for rent「貸し出し用の」。for のあとは名詞 rent（a も -s もつけない）。' },
    ],
  },
  {
    id: 'prep-idiom-atwork',
    title: '前置詞の熟語66 at work ／ at sea ／ at the doctor’s（仕事中で・航海中で・医者のところで）',
    points: [
      '「場所」より「そこでしていること」を表す at：at work「仕事中で・職場で」、at sea「航海中で・海に出て」、at school「学校で（授業中で）」。at work・at sea は the をつけない。',
      'at the doctor’s「医者のところで（病院で）」は the doctor’s office を短くした言い方。「医者に行く」なら go to the doctor’s。',
    ],
    examples: [
      { en: 'Please call me later. I’m at work now.', ja: 'あとで電話してください。今は仕事中なので。' },
      { en: 'The fishermen were at sea for two weeks.', ja: '漁師たちは2週間海に出ていた。' },
    ],
    questions: [
      { sentence: 'My mother is at ___ until six o’clock.', choices: ['work', 'working', 'worked'], answer: 0, why: 'at work「仕事中で」。at のあとは名詞 work。' },
      { sentence: 'The ship has been at ___ for a month.', choices: ['sea', 'seas', 'seaside'], answer: 0, why: 'at sea「航海中で」。the も -s もつけない名詞 sea。' },
      { sentence: 'I wasn’t at school yesterday. I was ___ the doctor’s.', choices: ['at', 'on', 'to'], answer: 0, why: 'be at the doctor’s「医者のところにいる」。いる場所なので at（行くときは go to）。' },
    ],
  },
  {
    id: 'prep-idiom-inmyopinion',
    title: '前置詞の熟語67 in my opinion ／ in this way ／ in the same way（私の意見では・このようにして・同じように）',
    points: [
      'in my opinion「私の意見では」（作文で意見を言うときの決まり文句）、in this way「このようにして」、in the same way「同じように」。考え方・やり方を表す in。',
      'どれも in を使う：on my opinion・by this way などとは言わない。in my opinion の opinion は単数。',
    ],
    examples: [
      { en: 'In my opinion, students should read more books.', ja: '私の意見では、生徒はもっと本を読むべきだ。' },
      { en: 'Fold the paper in this way, and you can make a crane.', ja: 'このようにして紙を折ると、つるが作れます。' },
    ],
    questions: [
      { sentence: 'In my ___, the new library is too small.', choices: ['opinion', 'opinions', 'opine'], answer: 0, why: 'in my opinion「私の意見では」。単数の名詞 opinion を使う。' },
      { sentence: 'Mix the flour and eggs ___ this way.', choices: ['in', 'on', 'by'], answer: 0, why: 'in this way「このようにして」。やり方を表すときは in。' },
      { sentence: 'Please write your name ___ the same way as your friend.', choices: ['in', 'on', 'at'], answer: 0, why: 'in the same way「同じように」。やり方を表すときは in。' },
    ],
  },
  {
    id: 'prep-idiom-inorder',
    title: '前置詞の熟語68 in alphabetical order ／ in order of ／ in the right order（ABC順に・～の順に・正しい順に）',
    points: [
      'in alphabetical order「アルファベット順に」、in order of ～「～の順に」（in order of height「背の順に」、in order of size「大きさの順に」）、in the right order「正しい順に」。順番を表す in。',
      'in order of のあとは名詞：height・size・age。high・big・old などの形容詞は入らない。order は名詞なので ordered・orderly は入らない。',
    ],
    examples: [
      { en: 'The words in a dictionary are in alphabetical order.', ja: '辞書の単語はアルファベット順に並んでいる。' },
      { en: 'Please put these cards in the right order.', ja: 'これらのカードを正しい順に並べてください。' },
    ],
    questions: [
      { sentence: 'The students’ names are written in alphabetical ___.', choices: ['order', 'ordered', 'orderly'], answer: 0, why: 'in alphabetical order「アルファベット順に」。alphabetical のあとは名詞 order。' },
      { sentence: 'Our class lined up in order of ___.', choices: ['height', 'high', 'highly'], answer: 0, why: 'in order of height「背の順に」。of のあとは名詞 height。' },
      { sentence: 'Put the pictures of the story in the right ___.', choices: ['order', 'ordered', 'ordering'], answer: 0, why: 'in the right order「正しい順に」。the right のあとは名詞 order。' },
    ],
  },
  {
    id: 'prep-idiom-bothsides',
    title: '前置詞の熟語69 on the right ／ on the other side ／ on both sides（右側に・反対側に・両側に）',
    points: [
      '位置の「側」は on：on the right「右側に」（on your right「あなたの右手に」）、on the other side (of ～)「（～の）反対側に」、on both sides (of ～)「（～の）両側に」。',
      '形に注意：on the other side は the other ＋単数 side、on both sides は both ＋複数 sides。another・others・side などをまちがえやすい。',
    ],
    examples: [
      { en: 'Go straight, and the museum is on your right.', ja: 'まっすぐ行くと、博物館は右手にあります。' },
      { en: 'Cherry trees are planted on both sides of the river.', ja: '川の両側に桜の木が植えられている。' },
    ],
    questions: [
      { sentence: 'The bus stop is on the ___ side of the road.', choices: ['other', 'another', 'others'], answer: 0, why: 'on the other side「反対側に」。the のあとは other（another は the とつかわない）。' },
      { sentence: 'There are tall buildings on both ___ of the street.', choices: ['sides', 'side', 'sided'], answer: 0, why: 'on both sides「両側に」。both のあとは複数形 sides。' },
      { sentence: 'Turn left at the corner, and the library is on your ___.', choices: ['right', 'rightly', 'rightful'], answer: 0, why: 'on your right「あなたの右手に」。your のあとは名詞 right。' },
    ],
  },
  {
    id: 'prep-idiom-onthebus',
    title: '前置詞の熟語70 on the bus ／ in a taxi ／ on the plane（バスで・タクシーで・飛行機で）',
    points: [
      '乗り物の「中で」は2種類：中を歩ける大きな乗り物（bus・train・plane・ship）は on、座ったまま乗る小さな乗り物（car・taxi）は in。',
      '例：on the bus「バスに乗って」、on the plane「飛行機の中で」、in a taxi「タクシーに乗って」、in my father’s car「父の車で」。手段だけを言うなら by bus・by taxi（a・the なし）。',
    ],
    examples: [
      { en: 'I often listen to music on the train.', ja: '私はよく電車の中で音楽を聞く。' },
      { en: 'We were late, so we went to the station in a taxi.', ja: 'おくれていたので、駅までタクシーで行った。' },
    ],
    questions: [
      { sentence: 'There were many students ___ the bus this morning.', choices: ['on', 'at', 'to'], answer: 0, why: 'バスは中を歩ける大きな乗り物なので on the bus。' },
      { sentence: 'My aunt came to the party ___ a taxi.', choices: ['in', 'on', 'at'], answer: 0, why: 'タクシーは小さな乗り物なので in a taxi。' },
      { sentence: 'Please keep your seat belt on ___ the plane.', choices: ['on', 'at', 'to'], answer: 0, why: '飛行機は中を歩ける大きな乗り物なので on the plane。' },
    ],
  },
  {
    id: 'prep-idiom-bysubway',
    title: '前置詞の熟語71 by subway ／ by boat ／ on foot（地下鉄で・船で・歩いて）',
    points: [
      '交通の手段は by ＋乗り物（a・the・-s なし）：by subway「地下鉄で」、by boat「船で」、by bus・by plane なども同じ。',
      '「歩いて」だけは on foot。決まった言い方として覚える。my や the をつけるときは on the subway・in my car のように by を使わない。',
    ],
    examples: [
      { en: 'Many people in Tokyo go to work by subway.', ja: '東京の多くの人は地下鉄で仕事に行く。' },
      { en: 'The station is close, so I always go there on foot.', ja: '駅は近いので、私はいつも歩いて行く。' },
    ],
    questions: [
      { sentence: 'It is faster to go to the museum by ___.', choices: ['subway', 'subways', 'subwayed'], answer: 0, why: 'by subway「地下鉄で」。by のあとは -s のない名詞 subway（a・the もつけない）。' },
      { sentence: 'We crossed the lake by ___.', choices: ['boat', 'boats', 'boated'], answer: 0, why: 'by boat「船で」。by のあとは -s のない名詞 boat。' },
      { sentence: 'My grandmother goes shopping ___ foot every day.', choices: ['on', 'at', 'in'], answer: 0, why: '「歩いて」は on foot。決まった言い方。' },
    ],
  },
  {
    id: 'prep-idiom-fordessert',
    title: '前置詞の熟語72 for breakfast ／ for dessert ／ for a snack（朝ごはんに・デザートに・おやつに）',
    points: [
      '「（食事）に何を食べるか」は for：have rice for breakfast「朝ごはんにごはんを食べる」、for lunch・for dinner、for dessert「デザートに」。食事の名前には a をつけない。',
      'おやつは a をつけて for a snack。dessert「デザート」と desert「さばく」はつづりがちがうので注意。',
    ],
    examples: [
      { en: 'What did you have for breakfast this morning?', ja: '今朝は朝ごはんに何を食べましたか。' },
      { en: 'I eat a banana for a snack after school.', ja: '放課後、おやつにバナナを食べる。' },
    ],
    questions: [
      { sentence: 'We had strawberry ice cream for ___.', choices: ['dessert', 'desert', 'deserted'], answer: 0, why: 'for dessert「デザートに」。desert は「さばく」なので意味が合わない。' },
      { sentence: 'My brother ate some cookies for a ___.', choices: ['snack', 'snacks', 'snacking'], answer: 0, why: 'for a snack「おやつに」。a のあとは単数の名詞 snack。' },
      { sentence: 'What do you usually have ___ breakfast?', choices: ['for', 'on', 'to'], answer: 0, why: 'have ～ for breakfast「朝ごはんに～を食べる」。食事には for。' },
    ],
  },
  {
    id: 'prep-idiom-inthepicture',
    title: '前置詞の熟語73 in the picture ／ on the map ／ on page 10（絵の中に・地図の上で・10ページに）',
    points: [
      '写真・絵の中に写っているものは in：in the picture・in the photo「写真の中に」。',
      '平らな面の上に書かれているものは on：on the map「地図の上で」、on page 10「10ページに」、on the screen「画面に」。',
    ],
    examples: [
      { en: 'The girl in the photo is my cousin.', ja: '写真の中の女の子は私のいとこです。' },
      { en: 'You can find the answer on page 25.', ja: '答えは25ページにあります。' },
    ],
    questions: [
      { sentence: 'Who is the man ___ the picture?', choices: ['in', 'on', 'at'], answer: 0, why: '絵や写真の中に写っているものは in the picture。' },
      { sentence: 'Can you find Osaka ___ the map?', choices: ['on', 'in', 'at'], answer: 0, why: '地図の上に書かれているものは on the map。' },
      { sentence: 'The new words are listed ___ page 40.', choices: ['on', 'in', 'at'], answer: 0, why: 'ページの上に書かれているので on page 40。' },
    ],
  },
  {
    id: 'prep-idiom-inthenewspaper',
    title: '前置詞の熟語74 in the newspaper ／ in the dictionary ／ on the internet（新聞で・辞書で・インターネットで）',
    points: [
      '新聞・雑誌・本・辞書など、ページをめくる印刷物の「中に」書いてあるものは in：in the newspaper「新聞で」、in a magazine「雑誌で」、look up a word in the dictionary「辞書で単語を調べる」。',
      'インターネットやテレビなどの「メディアで」は on：on the internet「インターネットで」、on TV「テレビで」。',
    ],
    examples: [
      { en: 'There was a photo of our school in the newspaper.', ja: '新聞に私たちの学校の写真がのっていた。' },
      { en: 'You can find a lot of information on the internet.', ja: 'インターネットでたくさんの情報を見つけられる。' },
    ],
    questions: [
      { sentence: 'My father read about the game ___ the newspaper.', choices: ['in', 'on', 'at'], answer: 0, why: '新聞の中に書いてあるので in the newspaper。' },
      { sentence: 'If you don’t know the word, look it up ___ the dictionary.', choices: ['in', 'on', 'at'], answer: 0, why: '辞書の中で調べるので in the dictionary。' },
      { sentence: 'I found a good cake recipe ___ the internet.', choices: ['on', 'in', 'at'], answer: 0, why: 'インターネットはメディアなので on the internet。' },
    ],
  },
  {
    id: 'prep-idiom-atparty',
    title: '前置詞の熟語75 at a party ／ at the meeting ／ at a wedding（パーティーで・会議で・結婚式で）',
    points: [
      '人が集まる「行事・もよおし」の場では at：at a party「パーティーで」、at the meeting「会議で」、at a wedding「結婚式で」、at the concert「コンサートで」。',
      '行く先を言うときは go to a party のように to。その場に「いる・何かをする」ときは at。',
    ],
    examples: [
      { en: 'We played games at my birthday party.', ja: '私の誕生日パーティーでゲームをした。' },
      { en: 'My uncle gave a speech at my cousin’s wedding.', ja: 'おじは、いとこの結婚式でスピーチをした。' },
    ],
    questions: [
      { sentence: 'I first met Ken ___ a party last year.', choices: ['at', 'on', 'to'], answer: 0, why: '行事の場で会ったので at a party。' },
      { sentence: 'The teachers discussed the new rule ___ the meeting.', choices: ['at', 'on', 'to'], answer: 0, why: '会議の場で話し合ったので at the meeting。' },
      { sentence: 'My grandmother cried with joy ___ my sister’s wedding.', choices: ['at', 'on', 'to'], answer: 0, why: '結婚式の場で泣いたので at a wedding。' },
    ],
  },
  {
    id: 'prep-idiom-inthepast',
    title: '前置詞の熟語76 in the past ／ in the future ／ in the near future（昔は・将来・近いうちに）',
    points: [
      '時の流れのはばを表す in：in the past「昔は・これまで」、in the future「将来・これから」、in the near future「近いうちに・近い将来」。どれも the をつける。',
      'in the near future の near は形容詞（nearly・nearby は入らない）。in the past は過去形や現在完了と、in the future は will などといっしょに使うことが多い。',
    ],
    examples: [
      { en: 'In the past, people sent letters instead of emails.', ja: '昔は、人々はメールのかわりに手紙を送っていた。' },
      { en: 'Robots may do many jobs in the near future.', ja: '近いうちに、ロボットが多くの仕事をするかもしれない。' },
    ],
    questions: [
      { sentence: '___ the past, this town was a small fishing village.', choices: ['In', 'On', 'At'], answer: 0, why: 'in the past「昔は」。時のはばを表すので in。' },
      { sentence: 'What do you want to be in the ___?', choices: ['future', 'futuristic', 'forward'], answer: 0, why: 'in the future「将来」。the のあとは名詞 future。' },
      { sentence: 'We will move to a new house in the ___ future.', choices: ['near', 'nearly', 'nearby'], answer: 0, why: 'in the near future「近いうちに」。future を説明するのは形容詞 near。' },
    ],
  },
  {
    id: 'prep-idiom-inclass',
    title: '前置詞の熟語77 in class ／ after class ／ before class（授業中に・授業のあとで・授業の前に）',
    points: [
      '「授業」という活動を表す class には a・the をつけない：in class「授業中に」、after class「授業のあとで」、before class「授業の前に」（after school「放課後」と同じ考え方）。',
      'class のかわりに classy（おしゃれな）・classic（定番の）などの形容詞は入らない。ago・later は前置詞として名詞の前に置けない。',
    ],
    examples: [
      { en: 'We are not allowed to eat in class.', ja: '授業中にものを食べてはいけない。' },
      { en: 'Let’s practice soccer after class today.', ja: '今日は授業のあとでサッカーの練習をしよう。' },
    ],
    questions: [
      { sentence: 'Please turn off your phone ___ class.', choices: ['in', 'on', 'to'], answer: 0, why: 'in class「授業中に」。' },
      { sentence: 'Can you help me with my homework after ___?', choices: ['class', 'classy', 'classic'], answer: 0, why: 'after class「授業のあとで」。after のあとは名詞 class（a・the なし）。' },
      { sentence: 'We have a short meeting ___ class every morning.', choices: ['before', 'ago', 'later'], answer: 0, why: 'before class「授業の前に」。ago・later は名詞の前に置く前置詞としては使えない。' },
    ],
  },
  {
    id: 'prep-idiom-withasmile',
    title: '前置詞の熟語78 with a smile ／ with a sigh ／ with a wave（にっこりして・ため息をついて・手をふって）',
    points: [
      'with a ＋動作の名詞で「～しながら」：with a smile「にっこりして」、with a sigh「ため息をついて」（with a sigh of relief「ほっとため息をついて」）、with a wave「手をふって」。',
      'a のあとは名詞：smile・sigh・wave。smiling・sighed などの -ing 形や過去形は入らない。',
    ],
    examples: [
      { en: 'The nurse answered my question with a smile.', ja: '看護師さんはにっこりして私の質問に答えてくれた。' },
      { en: 'My friend left the station with a wave.', ja: '友だちは手をふって駅を出ていった。' },
    ],
    questions: [
      { sentence: 'Our new teacher said hello with a ___.', choices: ['smile', 'smiling', 'smiled'], answer: 0, why: 'with a smile「にっこりして」。a のあとは名詞 smile。' },
      { sentence: 'After the long test, Ken sat down with a ___ of relief.', choices: ['sigh', 'sighing', 'sighed'], answer: 0, why: 'with a sigh of relief「ほっとため息をついて」。a のあとは名詞 sigh。' },
      { sentence: 'The little girl said goodbye with a ___ of her hand.', choices: ['wave', 'waving', 'waved'], answer: 0, why: 'with a wave「手をふって」。a のあとは名詞 wave。' },
    ],
  },
  {
    id: 'prep-idiom-atspeed',
    title: '前置詞の熟語79 at a price of ／ at a cost of ／ at a temperature of（～の値段で・～の費用で・～の温度で）',
    points: [
      '値段・費用・温度などの「目もりの一点」は at：at a price of ～「～の値段で」、at a cost of ～「～の費用で」、at a temperature of ～「～の温度で」（速さの at a speed of も同じ形）。',
      'at a のあとは単数の名詞：price・cost・temperature。priced・costly・temperatures などは入らない。',
    ],
    examples: [
      { en: 'The new library was built at a cost of five billion yen.', ja: '新しい図書館は50億円の費用で建てられた。' },
      { en: 'Water boils at a temperature of 100 degrees.', ja: '水は100度の温度でふっとうする。' },
    ],
    questions: [
      { sentence: 'The new stadium was completed ___ a cost of over two billion yen.', choices: ['at', 'in', 'with', 'for'], answer: 0, why: 'at a cost of ～「～の費用で」。値段・費用・速度・温度などの「点」を表す at。' },
      { sentence: 'Used cars are often sold ___ a price well below their original value.', choices: ['at', 'on', 'in', 'by'], answer: 0, why: 'at a price「～の値段で」。値段・費用・速度などの「点」を表す at。' },
      { sentence: 'The vaccine must be stored ___ a temperature of minus seventy degrees.', choices: ['at', 'in', 'on', 'under'], answer: 0, why: 'at a temperature of ～「～の温度で」。温度・速度などの数値の前は at。' },
    ],
  },
  {
    id: 'prep-idiom-inaword',
    title: '前置詞の熟語80 in a word ／ in other words ／ that is（ひとことで言えば・言いかえれば・つまり）',
    points: [
      '言いかえ・まとめの言い方：in a word「ひとことで言えば」、in other words「言いかえれば」、that is (to say)「つまり・すなわち」。前の内容をわかりやすく言いなおすときに使う。',
      '数に注意：in a word は単数 word、in other words は複数 words。that is はコンマではさんで使うことが多い（next Monday, that is, May 5）。',
    ],
    examples: [
      { en: 'In a word, the concert was amazing.', ja: 'ひとことで言えば、コンサートはすばらしかった。' },
      { en: 'She is a vegetarian. In other words, she doesn’t eat meat.', ja: '彼女はベジタリアンだ。言いかえれば、肉を食べない。' },
    ],
    questions: [
      { sentence: 'The plan is too expensive, too slow, and too risky. ___ a word, it will not work.', choices: ['In', 'At', 'On', 'By'], answer: 0, why: 'in a word「ひとことで言えば」。前置詞は in。at a word などとは言わない。' },
      { sentence: 'He rarely spends money on anything. In other ___, he is quite stingy.', choices: ['words', 'word', 'terms', 'ways'], answer: 0, why: 'in other words「言いかえれば」。複数の words。in other terms とは言わない（in terms of ～「～の点で」と混同しない）。' },
      { sentence: 'The meeting will be held on the first Monday of next month, ___ is, May 4.', choices: ['that', 'which', 'what', 'it'], answer: 0, why: 'that is (to say)「つまり・すなわち」。直前の内容を具体的に言いかえる決まった言い方。which is では前の文全体を受ける関係詞になり、言いかえの意味にならない。' },
    ],
  },
  {
    id: 'prep-idiom-atthesametime',
    title: '前置詞の熟語81 at the same time ／ at a time ／ for the last time（同時に・一度に・最後に）',
    points: [
      'at the same time「同時に」、at a time「一度に」（one at a time「1つずつ・1人ずつ」）、for the last time「最後に・これを最後に」（⇔ for the first time「はじめて」）。',
      'a と the のちがいに注意：at the same time は the、at a time は a。for the last time の last は形容詞（latest・lately は入らない）。',
    ],
    examples: [
      { en: 'My brother and I said "Thank you!" at the same time.', ja: '兄と私は同時に「ありがとう！」と言った。' },
      { en: 'Please take the cookies one at a time.', ja: 'クッキーは1つずつとってください。' },
    ],
    questions: [
      { sentence: 'The two runners crossed the finish line at the same ___.', choices: ['time', 'timing', 'timed'], answer: 0, why: 'at the same time「同時に」。the same のあとは名詞 time。' },
      { sentence: 'The doctor can see only one patient at a ___.', choices: ['time', 'timely', 'timer'], answer: 0, why: 'at a time「一度に」。a のあとは名詞 time。' },
      { sentence: 'I visited my old school for the ___ time before it closed.', choices: ['last', 'latest', 'lately'], answer: 0, why: 'for the last time「最後に」。the のあとは形容詞 last。' },
    ],
  },
  {
    id: 'prep-idiom-bythewindow',
    title: '前置詞の熟語82 by the window ／ by the door ／ by the sea（まどのそばに・ドアのそばに・海のそばに）',
    points: [
      '「～のすぐそばに」は by（= beside）：by the window「まどのそばに」、by the door「ドアのそばに」、by the sea「海のそばに・海辺に」。',
      'on は表面にくっついている、in は中にあることを表すので、「そば」の意味にはならない。',
    ],
    examples: [
      { en: 'There is a big plant by the window.', ja: 'まどのそばに大きな植物がある。' },
      { en: 'My grandparents live in a small house by the sea.', ja: '祖父母は海のそばの小さな家に住んでいる。' },
    ],
    questions: [
      { sentence: 'I like to sit ___ the window on the train.', choices: ['by', 'on', 'to'], answer: 0, why: '「まどのそばに」は by the window。' },
      { sentence: 'Please put your umbrella ___ the door.', choices: ['by', 'on', 'to'], answer: 0, why: '「ドアのそばに」は by the door。' },
      { sentence: 'We stayed at a hotel ___ the sea last summer.', choices: ['by', 'in', 'to'], answer: 0, why: '「海のそばの」は by the sea。in the sea だと海の中になってしまう。' },
    ],
  },
  {
    id: 'prep-idiom-bymistake',
    title: '前置詞の熟語83 by mistake ／ by luck ／ for example（まちがえて・運よく・たとえば）',
    points: [
      'by mistake「まちがえて」、by luck「運よく・まぐれで」、for example「たとえば」（= for instance）。',
      '前置詞のあとは名詞：mistake・luck・example。mistaken・lucky・examples などは入らない。for example は単数 example。',
    ],
    examples: [
      { en: 'I took my sister’s bag by mistake.', ja: 'まちがえて姉のかばんを持ってきてしまった。' },
      { en: 'I like many sports. For example, I play tennis and soccer.', ja: '私はいろいろなスポーツが好きだ。たとえばテニスやサッカーをする。' },
    ],
    questions: [
      { sentence: 'Sorry, I opened your letter by ___.', choices: ['mistake', 'mistaken', 'mistook'], answer: 0, why: 'by mistake「まちがえて」。by のあとは名詞 mistake。' },
      { sentence: 'We caught the last train by ___.', choices: ['luck', 'lucky', 'luckily'], answer: 0, why: 'by luck「運よく」。by のあとは名詞 luck。' },
      { sentence: 'Some animals sleep in winter. For ___, bears do.', choices: ['example', 'examples', 'exemplary'], answer: 0, why: 'for example「たとえば」。example は単数。' },
    ],
  },
  {
    id: 'prep-idiom-underwater',
    title: '前置詞の熟語84 under water ／ under the sea ／ under a tree（水中で・海の中で・木の下で）',
    points: [
      'under は「～の真下に・～におおわれて」：under water「水中で」（underwater と1語でも書く）、under the sea「海の中で」、under a tree「木の下で」。',
      'on は表面の上、into は中へ入っていく動き。「下に・おおわれて」の意味は under で表す。',
    ],
    examples: [
      { en: 'Some turtles can stay under water for hours.', ja: '何時間も水中にいられるカメもいる。' },
      { en: 'We ate our lunch under a big tree in the park.', ja: '公園の大きな木の下でお弁当を食べた。' },
    ],
    questions: [
      { sentence: 'Fish breathe ___ water with their gills.', choices: ['under', 'on', 'above'], answer: 0, why: '水の中で呼吸するので under water。on・above だと水の上になる。' },
      { sentence: 'On hot days, we rest ___ a big tree.', choices: ['under', 'on', 'into'], answer: 0, why: '木の下でやすむので under a tree。' },
      { sentence: 'Divers can see colorful fish ___ the sea.', choices: ['under', 'on', 'to'], answer: 0, why: '海の中で見るので under the sea。' },
    ],
  },
  {
    id: 'prep-idiom-aroundtheworld',
    title: '前置詞の熟語85 around the world ／ all over the world ／ around the corner（世界中を・世界中で・角を曲がったところに）',
    points: [
      'around the world「世界中を・世界をまわって」、all over the world「世界中で」（どちらも world は単数）、around the corner「角を曲がったところに・すぐ近くに」（「もうすぐ」の意味にも使う）。',
      'among は「（3つ以上の人・ものの）あいだに」、between は「2つのあいだに」なので、「世界をまわる」には使わない。',
    ],
    examples: [
      { en: 'Pizza is eaten all over the world.', ja: 'ピザは世界中で食べられている。' },
      { en: 'The bakery is just around the corner.', ja: 'パン屋は角を曲がってすぐのところにある。' },
    ],
    questions: [
      { sentence: 'Soccer is played all over the ___.', choices: ['world', 'worlds', 'worldly'], answer: 0, why: 'all over the world「世界中で」。world は単数。' },
      { sentence: 'The post office is just around the ___.', choices: ['corner', 'corners', 'cornered'], answer: 0, why: 'around the corner「角を曲がったところに」。単数の名詞 corner。' },
      { sentence: 'My uncle sailed ___ the world on a small boat.', choices: ['around', 'among', 'between'], answer: 0, why: 'around the world「世界をまわって」。among・between は「あいだに」なので合わない。' },
    ],
  },
  {
    id: 'prep-idiom-atnight',
    title: '前置詞の熟語86 at night ／ during the night ／ all night（夜に・夜のあいだに・一晩中）',
    points: [
      'at night「夜に」（the なし）、during the night「夜のあいだに（ある時に）」、all night「一晩中」（all night long とも言う）。',
      'during のあとは名詞（during the night）。while・when のあとは文が来るので、名詞だけは置けない。all night の night は単数。',
    ],
    examples: [
      { en: 'Many stars can be seen at night in the countryside.', ja: 'いなかでは夜にたくさんの星が見える。' },
      { en: 'The baby cried all night, so I didn’t sleep well.', ja: '赤ちゃんが一晩中泣いたので、よくねむれなかった。' },
    ],
    questions: [
      { sentence: 'Bats usually fly ___ night.', choices: ['at', 'on', 'to'], answer: 0, why: '「夜に」は at night。' },
      { sentence: 'It snowed a lot ___ the night.', choices: ['during', 'while', 'when'], answer: 0, why: 'during the night「夜のあいだに」。while・when のあとには文が必要。' },
      { sentence: 'My brother played video games all ___.', choices: ['night', 'nights', 'nightly'], answer: 0, why: 'all night「一晩中」。night は単数。' },
    ],
  },
  {
    id: 'prep-idiom-onthefloor',
    title: '前置詞の熟語87 on the first floor ／ on the top floor ／ on the roof（1階に・最上階に・屋根の上に）',
    points: [
      '建物の「～階に」は on：on the first floor「1階に」、on the third floor「3階に」、on the top floor「最上階に」。階の名前は単数 floor で、the ＋序数をつける。',
      '屋根・屋上の上も on：on the roof「屋根（屋上）の上に」。in は「中に」、to は「～へ」なので、「階に・上に」の意味にはならない。',
    ],
    examples: [
      { en: 'The teachers’ room is on the second floor.', ja: '職員室は2階にある。' },
      { en: 'We watched the fireworks on the roof of the school.', ja: '学校の屋上で花火を見た。' },
    ],
    questions: [
      { sentence: 'The library is ___ the third floor.', choices: ['on', 'in', 'to'], answer: 0, why: '建物の「～階に」は on the ～ floor。' },
      { sentence: 'From our classroom on the top ___, we can see the sea.', choices: ['floor', 'floors', 'flooring'], answer: 0, why: 'on the top floor「最上階に」。floor は単数。' },
      { sentence: 'A cat is sleeping ___ the roof.', choices: ['on', 'in', 'to'], answer: 0, why: '屋根の上は on the roof。' },
    ],
  },
  {
    id: 'less-least',
    title: '「より～でない」の比較（less ～ than / the least ～）',
    points: [
      'less ＋ 形容詞・副詞の原級 ＋ than で「…ほど～でない」。This book is less interesting than that one.＝This book is not as interesting as that one.',
      'the least ＋ 原級 で「いちばん～でない」。数えられない名詞の量にも less（less time / less money）を使う。数えられる名詞なら fewer。',
    ],
    examples: [
      { en: 'This jacket is less expensive than that one.', ja: 'このジャケットはあのジャケットほど高くない。' },
      { en: 'For me, math is the least difficult subject.', ja: '私にとって、数学はいちばん難しくない教科だ。' },
    ],
    questions: [
      { sentence: 'This movie is ___ exciting than the first one.', choices: ['less', 'little', 'fewer', 'lesser'], answer: 0, why: '形容詞の前で「…ほど～でない」は less ～ than。' },
      { sentence: 'Of the three bags, this one is the ___ expensive.', choices: ['least', 'less', 'little', 'fewest'], answer: 0, why: '3つの中で「いちばん～でない」は the least。' },
      { sentence: 'I have ___ free time than last year.', choices: ['less', 'fewer', 'few', 'littler'], answer: 0, why: 'time は数えられない名詞なので less。fewer は数えられる名詞に使う。' },
    ],
  },
  {
    id: 'not-a-but-b',
    title: 'not A but B（A ではなく B）',
    points: [
      'not A but B で「A ではなく B」。A と B には同じ種類の語句（名詞と名詞、to ～ と to ～ など）を並べる。',
      'B, not A と順番を入れかえても同じ意味：The test is on Friday, not on Thursday.「テストは木曜ではなく金曜だ」。not only A but also B（A だけでなく B も）と区別しよう。',
    ],
    examples: [
      { en: 'The meeting is not on Monday but on Tuesday.', ja: '会議は月曜日ではなく火曜日だ。' },
      { en: 'What matters is not winning but doing your best.', ja: '大切なのは勝つことではなく、全力をつくすことだ。' },
    ],
    questions: [
      { sentence: 'That animal is not a cat ___ a fox.', choices: ['but', 'and', 'or'], answer: 0, why: '「ネコではなくキツネ」は not A but B。' },
      { sentence: 'He came here not to work but ___ rest.', choices: ['to', 'at', 'and'], answer: 0, why: 'not A but B の A と B は同じ形。not to work に合わせて to rest。' },
      { sentence: 'The concert is on Sunday, ___ on Saturday.', choices: ['not', 'but', 'no'], answer: 0, why: 'B, not A「A ではなく B」の形。' },
    ],
  },
  {
    id: 'this-these',
    title: 'this / that と these / those（これら・あれら）',
    points: [
      '近くの物は this（これ）、遠くの物は that（あれ）。2つ以上なら this → these、that → those にする。',
      'あとの be 動詞や名詞も数に合わせる：This is my pen. → These are my pens.／that bird → those birds。',
    ],
    examples: [
      { en: 'These are my new shoes.', ja: 'これらは私の新しいくつです。' },
      { en: 'Look at those birds over there.', ja: 'あそこにいるあの鳥たちを見て。' },
    ],
    questions: [
      { sentence: '___ are my shoes.', choices: ['These', 'This', 'It'], answer: 0, why: 'are と shoes（複数）に合わせて these。' },
      { sentence: 'Look at ___ birds over there!', choices: ['those', 'that', 'this'], answer: 0, why: '遠くの複数の物は those。birds が複数なので that・this は使えない。' },
      { sentence: 'This ___ my bag.', choices: ['is', 'are', 'am'], answer: 0, why: 'this は1つの物なので is。' },
    ],
  },
  {
    id: 'future-q-neg',
    title: '未来の否定文・疑問文（won\'t / Are you going to ～?）',
    points: [
      "will の否定は will not（短くすると won't）＋ 原形。疑問文は Will you ～? で、答えは Yes, I will. / No, I won't.",
      "be going to の否定は be 動詞のあとに not（I'm not going to ～）。疑問文は be 動詞を主語の前に出す（Are you going to ～?）。",
    ],
    examples: [
      { en: "It won't rain tomorrow.", ja: '明日は雨は降らないだろう。' },
      { en: 'Are you going to visit your grandparents this weekend?', ja: '今週末、祖父母をたずねる予定ですか。' },
    ],
    questions: [
      { sentence: "It ___ rain tomorrow, so let's go on a picnic.", choices: ["won't", "doesn't", "isn't"], answer: 0, why: "明日（未来）のことの否定は won't ＋ 原形。" },
      { sentence: '___ you going to play tennis this Sunday?', choices: ['Are', 'Do', 'Will'], answer: 0, why: 'be going to の疑問文は be 動詞を前に出す。' },
      { sentence: '"Will you come to the party?" "No, I ___."', choices: ["won't", "don't", 'am not'], answer: 0, why: "Will you ～? には will を使って答える。No, I won't." },
    ],
  },
  {
    id: 'ordinal-date',
    title: '順番と日付の言い方（first / second / March 3rd）',
    points: [
      '順番は first（1番目）、second（2番目）、third（3番目）、4番目からはふつう数に -th（fourth、fifth は f に注意）。数字で書くと 1st・2nd・3rd・4th。',
      '日付は「月＋序数」：May 5th（May fifth）。日付の前の前置詞は on（on March 3rd）。',
    ],
    examples: [
      { en: 'My birthday is May fifth.', ja: '私の誕生日は5月5日です。' },
      { en: 'This is my second visit to Kyoto.', ja: '京都に来るのはこれが2回目です。' },
    ],
    questions: [
      { sentence: 'My birthday is March ___.', choices: ['third', 'three', 'threeth'], answer: 0, why: '日付は序数を使う。3番目は third。' },
      { sentence: 'This is my ___ visit to Kyoto.', choices: ['second', 'two', 'twice'], answer: 0, why: '「2回目の訪問」は序数の second。' },
      { sentence: 'Our school festival is ___ October 10th.', choices: ['on', 'in', 'at'], answer: 0, why: '日付の前の前置詞は on。' },
    ],
  },
  {
    id: 'can-basic',
    title: 'can（～できる）の文・疑問文・否定文',
    points: [
      'can ＋ 動詞の原形 で「～できる」。主語が he / she でも can のあとは原形のまま（He can swim.）。',
      "否定文は can't（cannot）＋ 原形。疑問文は Can を主語の前に出し、答えは Yes, I can. / No, I can't.",
    ],
    examples: [
      { en: 'My sister can play the piano well.', ja: '姉はピアノを上手にひける。' },
      { en: '"Can you ride a bike?" "Yes, I can."', ja: '「自転車に乗れる？」「うん、乗れるよ。」' },
    ],
    questions: [
      { sentence: 'Ken can ___ very fast.', choices: ['run', 'runs', 'running'], answer: 0, why: 'can のあとは動詞の原形。主語が3人称単数でも -s はつけない。' },
      { sentence: '"Can you swim?" "No, I ___."', choices: ["can't", "don't", 'am not'], answer: 0, why: 'Can you ～? には can を使って答える。' },
      { sentence: '___ your father cook?', choices: ['Can', 'Is', 'Are'], answer: 0, why: 'cook は動詞なので、「～できますか」は Can を前に出す。' },
    ],
  },
  {
    id: 'remind-of',
    title: '動詞 A of B（remind A of B / rob A of B / inform A of B）',
    points: [
      'remind A of B「A に B を思い出させる」、inform A of B「A に B を知らせる」、rob A of B「A から B をうばう」。どれも A は人、of のあとに B を置く。',
      'rob は「人」が目的語（rob 人 of 物）、steal は「物」が目的語（steal 物 from 人）。Someone stole my bag. / Someone robbed me of my bag.',
    ],
    examples: [
      { en: 'This song always reminds me of my school days.', ja: 'この歌を聞くといつも学生時代を思い出す。' },
      { en: 'A man robbed her of her bag on the street.', ja: '男が通りで彼女からかばんをうばった。' },
    ],
    questions: [
      { sentence: 'This photo reminds me ___ our trip to Okinawa.', choices: ['of', 'to', 'for', 'at'], answer: 0, why: 'remind A of B「A に B を思い出させる」。' },
      { sentence: 'Please inform us ___ any changes to the plan.', choices: ['of', 'to', 'for', 'at'], answer: 0, why: 'inform A of B「A に B を知らせる」。' },
      { sentence: 'Someone ___ my bike from the station.', choices: ['stole', 'robbed', 'reminded', 'informed'], answer: 0, why: '物（my bike）が目的語で from 人・場所 が続くので steal（過去形 stole）。rob は人が目的語。' },
    ],
  },
  {
    id: 'there-q-neg',
    title: 'There is の疑問文・否定文（Is there ～? / How many ～ are there?）',
    points: [
      '疑問文は is / are を there の前に出す：Is there a park near here? 答えは Yes, there is. / No, there isn\'t.',
      '数をたずねるときは How many ＋ 複数名詞 ＋ are there ～?。否定文は There isn\'t ～ / There aren\'t ～。',
    ],
    examples: [
      { en: 'Is there a convenience store near here?', ja: 'この近くにコンビニはありますか。' },
      { en: 'How many students are there in your class?', ja: 'あなたのクラスには何人の生徒がいますか。' },
    ],
    questions: [
      { sentence: '___ there a library near your house?', choices: ['Is', 'Are', 'Do'], answer: 0, why: 'a library（単数）なので Is there ～?' },
      { sentence: 'How many cats ___ there in the park?', choices: ['are', 'is', 'do'], answer: 0, why: 'How many cats（複数）なので are there。' },
      { sentence: '"Is there a pool at your school?" "No, there ___."', choices: ["isn't", "aren't", "doesn't"], answer: 0, why: 'Is there ～? には there is / there isn\'t で答える。' },
    ],
  },
  {
    id: 'which-better',
    title: '比較の疑問文（Which do you like better, A or B?）',
    points: [
      '2つをくらべてたずねるときは Which ～ 比較級, A or B?：Which is cheaper, this bag or that one?「このかばんとあのかばんでは、どちらが安いですか」。',
      '好きなほうは Which do you like better, A or B?、いちばん好きなものは Which ～ do you like the best? と聞く。答えは I like A better. / I like A the best.',
    ],
    examples: [
      { en: 'Which do you like better, dogs or cats?', ja: '犬とねこでは、どちらが好きですか。' },
      { en: 'Which season do you like the best?', ja: 'どの季節がいちばん好きですか。' },
    ],
    questions: [
      { sentence: 'Which do you like ___, rice or bread?', choices: ['better', 'more good', 'well'], answer: 0, why: 'like の比較級は better（like A better than B）。' },
      { sentence: 'Which subject do you like the ___?', choices: ['best', 'better', 'most good'], answer: 0, why: '「いちばん好き」は like ～ the best。' },
      { sentence: 'Which is ___, this pen or that one?', choices: ['cheaper', 'cheap', 'cheapest'], answer: 0, why: '2つをくらべるので比較級 cheaper。' },
    ],
  },
  {
    id: 'not-so-much',
    title: 'not so much A as B / B rather than A（A というよりむしろ B）',
    points: [
      'not so much A as B で「A というよりむしろ B」。as の前後に同じ形の語句を置く：He is not so much a teacher as a friend.「彼は先生というよりむしろ友だちだ」。',
      'B rather than A も「A よりむしろ B」。I want to walk rather than take the bus.「バスに乗るより歩きたい」。',
    ],
    examples: [
      { en: 'He is not so much a teacher as a friend to us.', ja: '彼は私たちにとって先生というよりむしろ友だちだ。' },
      { en: 'Success depends not so much on talent as on effort.', ja: '成功は才能というよりむしろ努力しだいだ。' },
    ],
    questions: [
      { sentence: 'She is not so much a singer ___ an actor.', choices: ['as', 'than', 'but', 'so'], answer: 0, why: 'not so much A as B「A というよりむしろ B」。' },
      { sentence: 'I want to walk ___ than take the bus.', choices: ['rather', 'more', 'better', 'much'], answer: 0, why: 'B rather than A「A よりむしろ B」。' },
      { sentence: 'The trip was not so much a vacation ___ a lesson.', choices: ['as', 'than', 'so', 'but'], answer: 0, why: 'not so much A as B の形。' },
    ],
  },
  {
    id: 'when-future',
    title: '時を表す when / until / before（未来のことでも現在形）',
    points: [
      '時を表す when（～するとき）・after・before・until（～するまで）・as soon as のあとは、未来のことでも現在形を使う：Call me when you get home.「家に着いたら電話してね」。',
      'will を使うのは主節（電話する・待つ など）のほう：I will wait here until the rain stops.「雨がやむまでここで待つ」。',
    ],
    examples: [
      { en: 'Call me when you get home.', ja: '家に着いたら電話してね。' },
      { en: 'I will wait here until the rain stops.', ja: '雨がやむまでここで待ちます。' },
    ],
    questions: [
      { sentence: 'Send me a message when you ___ at the station tomorrow.', choices: ['arrive', 'will arrive', 'arrived'], answer: 0, why: '時を表す when のあとは、未来のことでも現在形。' },
      { sentence: 'Let\'s stay inside until the storm ___.', choices: ['passes', 'will pass', 'passed'], answer: 0, why: 'until のあとは、未来のことでも現在形。' },
      { sentence: 'Please brush your teeth before you ___ to bed tonight.', choices: ['go', 'will go', 'went'], answer: 0, why: 'before のあとは、未来のことでも現在形。' },
    ],
  },
  {
    id: 'even-if-though',
    title: 'even if と even though（たとえ～でも／～なのに）',
    points: [
      'even if ～ は「たとえ～でも」。本当になるかわからないこと（仮定）に使う：Even if it rains tomorrow, the game will be held.',
      'even though ～ は「～なのに」。本当にあったこと（事実）に使う：Even though she was tired, she finished her homework.',
    ],
    examples: [
      { en: 'Even if it rains tomorrow, the game will be held.', ja: 'たとえ明日雨が降っても、試合は行われる。' },
      { en: 'Even though she was tired, she finished her homework.', ja: '彼女はつかれていたのに、宿題を終わらせた。' },
    ],
    questions: [
      { sentence: '___ it snows tonight, the trains will run on time.', choices: ['Even if', 'Even though', 'Because', 'Despite'], answer: 0, why: '今夜雪が降るかはまだわからない（仮定）ので Even if。' },
      { sentence: '___ he was sick, he came to the meeting.', choices: ['Even though', 'Unless', 'So', 'Despite'], answer: 0, why: '病気だったのは事実なので「～なのに」の Even though。' },
      { sentence: 'I will keep trying even ___ I fail many times.', choices: ['if', 'so', 'but', 'as'], answer: 0, why: '「たとえ何度失敗しても」なので even if。' },
    ],
  },
  {
    id: 'been-gone',
    title: 'have been to と have gone to（行ったことがある／行ってしまった）',
    points: [
      'have been to ～ は「～に行ったことがある」（経験）や「～に行ってきたところだ」（今はもどっている）。',
      'have gone to ～ は「～に行ってしまった（今ここにいない）」。He has gone to Osaka. なら、彼は今大阪にいて、ここにはいない。',
    ],
    examples: [
      { en: 'My sister has been to London three times.', ja: '姉はロンドンに3回行ったことがある。' },
      { en: "Ken isn't here. He has gone to the library.", ja: 'ケンはここにいない。図書館に行ってしまった。' },
    ],
    questions: [
      { sentence: "Mika isn't in the classroom. She has ___ to the nurse's office.", choices: ['gone', 'been', 'went'], answer: 0, why: '今ここにいない（行ってしまった）ので has gone to。' },
      { sentence: "I have just ___ to the post office, so I'm back now.", choices: ['been', 'gone', 'go'], answer: 0, why: 'もうもどってきているので have been to「行ってきたところだ」。' },
      { sentence: '"Where ___ you been?" "I was at the park."', choices: ['have', 'did', 'are'], answer: 0, why: 'Where have you been?「どこに行っていたの？」は現在完了。' },
    ],
  },
  {
    id: 'number-of',
    title: 'a number of と the number of（たくさんの～／～の数）',
    points: [
      'a number of ＋ 複数名詞 は「たくさんの～」（＝many）。主語のとき動詞は複数に合わせる：A number of students are absent today.',
      'the number of ＋ 複数名詞 は「～の数」。主語は number（数）なので動詞は単数：The number of visitors is increasing.',
    ],
    examples: [
      { en: 'A number of students are absent today.', ja: '今日はたくさんの生徒が欠席している。' },
      { en: 'The number of visitors is increasing every year.', ja: '訪れる人の数は毎年ふえている。' },
    ],
    questions: [
      { sentence: 'A number of people ___ waiting outside the shop.', choices: ['are', 'is', 'be', 'was'], answer: 0, why: 'a number of ～「たくさんの～」は複数あつかいなので are。' },
      { sentence: 'The number of children in this town ___ getting smaller.', choices: ['is', 'are', 'be', 'were'], answer: 0, why: 'the number of ～「～の数」は数（number）が主語なので単数の is。' },
      { sentence: '___ number of cars on this road is very large.', choices: ['The', 'A', 'Many', 'Much'], answer: 0, why: '動詞が単数の is なので「～の数」の The number of。' },
    ],
  },
  {
    id: 'there-was',
    title: 'There was / There were（～があった・いた）',
    points: [
      '過去のことは There was ＋ 単数名詞（数えられない名詞も）、There were ＋ 複数名詞。There was a lot of snow. / There were many people.',
      '疑問文は Was there ～? / Were there ～? と be 動詞を前に出す。答えは Yes, there was. / No, there weren\'t. など。',
    ],
    examples: [
      { en: 'There was a lot of snow last winter.', ja: '去年の冬は雪がたくさん降った（たくさんあった）。' },
      { en: 'There were many people at the festival yesterday.', ja: '昨日のお祭りにはたくさんの人がいた。' },
    ],
    questions: [
      { sentence: 'There ___ a big earthquake in this area long ago.', choices: ['was', 'were', 'is'], answer: 0, why: 'a big earthquake（単数）で過去（long ago）なので was。' },
      { sentence: 'There ___ five eggs in the box this morning.', choices: ['were', 'was', 'are'], answer: 0, why: 'five eggs（複数）で過去（this morning）なので were。' },
      { sentence: '___ there any good shows on TV last night?', choices: ['Were', 'Was', 'Did'], answer: 0, why: 'any good shows（複数）の過去の疑問文なので Were there ～?' },
    ],
  },
  {
    id: 'like-such-as',
    title: 'like / such as / look like（～のような・～のように見える）',
    points: [
      '前置詞の like ～ は「～のような・～のように」：She sings like a professional singer.。such as ～ は例をあげて「たとえば～のような」：fruits such as apples and oranges。',
      'look like ＋ 名詞 で「～のように見える」。形容詞なら like はいらない（look happy）：That cloud looks like a fish. / You look tired.',
    ],
    examples: [
      { en: 'I like fruits such as apples and oranges.', ja: '私はりんごやオレンジのような果物が好きだ。' },
      { en: 'That cloud looks like a big fish.', ja: 'あの雲は大きな魚のように見える。' },
    ],
    questions: [
      { sentence: 'We sell vegetables ___ as carrots and onions.', choices: ['such', 'so', 'like'], answer: 0, why: '例をあげる「たとえば～のような」は such as。' },
      { sentence: 'That rock looks ___ a sleeping cat.', choices: ['like', 'as', 'such'], answer: 0, why: 'look like ＋ 名詞「～のように見える」。' },
      { sentence: 'He can swim ___ a fish.', choices: ['like', 'such', 'so'], answer: 0, why: '前置詞の like「～のように」。' },
    ],
  },
  {
    id: 'ready-willing',
    title: 'be ready to / be willing to（～する準備ができている・進んで～する）',
    points: [
      'be ready to ＋ 原形「～する準備ができている」。名詞が続くときは be ready for ～：Are you ready to go? / I\'m ready for the test.',
      'be willing to ＋ 原形「進んで～する・～してもかまわない」：He was willing to help us.',
    ],
    examples: [
      { en: 'Are you ready to go?', ja: '出かける準備はできた？' },
      { en: 'He was willing to help us with the work.', ja: '彼は進んで仕事を手伝ってくれた。' },
    ],
    questions: [
      { sentence: 'Is everyone ready ___ start the game?', choices: ['to', 'for', 'at'], answer: 0, why: 'あとに動詞の原形（start）が続くので be ready to。' },
      { sentence: 'She was willing ___ teach me how to cook.', choices: ['to', 'for', 'with'], answer: 0, why: 'be willing to ＋ 原形「進んで～する」。' },
      { sentence: 'I studied hard, so I am ready ___ tomorrow\'s exam.', choices: ['for', 'to', 'at'], answer: 0, why: 'あとが名詞（tomorrow\'s exam）なので be ready for。' },
    ],
  },
  {
    id: 'go-ing',
    title: 'go ～ing（買い物に行く・泳ぎに行く）',
    points: [
      'go shopping（買い物に行く）・go swimming（泳ぎに行く）・go fishing（つりに行く）・go camping（キャンプに行く）のように、go のあとに ～ing を置く。',
      '場所は to ではなく in / at などで表す：go shopping in Shibuya（渋谷へ買い物に行く）。過去形は went shopping。',
    ],
    examples: [
      { en: "Let's go swimming in the river this summer.", ja: '今年の夏は川へ泳ぎに行こう。' },
      { en: 'My mother went shopping at the new mall yesterday.', ja: '母は昨日、新しいショッピングモールへ買い物に行った。' },
    ],
    questions: [
      { sentence: "Let's go ___ in the sea next Sunday.", choices: ['swimming', 'swim', 'swam'], answer: 0, why: '「泳ぎに行く」は go swimming。' },
      { sentence: 'My sister went ___ in Shibuya last weekend.', choices: ['shopping', 'shop', 'shopped'], answer: 0, why: '「買い物に行った」は went shopping。' },
      { sentence: 'Did you go ___ during the summer vacation?', choices: ['camping', 'camp', 'camped'], answer: 0, why: '「キャンプに行く」は go camping。' },
    ],
  },
  {
    id: 'would-often',
    title: 'would (often) ～（よく～したものだ）',
    points: [
      'would (often) ＋ 原形 で、過去にくり返した動作「（昔は）よく～したものだ」を表す：When I was a child, I would often play in this park.',
      '状態（～があった・～だった）には would は使わず used to を使う：There used to be a big tree here.',
    ],
    examples: [
      { en: 'When I was a child, I would often play in this park.', ja: '子どものころ、私はよくこの公園で遊んだものだ。' },
      { en: 'My grandfather would tell me stories before bed.', ja: '祖父は寝る前によくお話をしてくれたものだ。' },
    ],
    questions: [
      { sentence: 'On summer evenings, we ___ often sit outside and watch the stars.', choices: ['would', 'will', 'are', 'were'], answer: 0, why: '過去によくした動作は would often ＋ 原形。' },
      { sentence: 'My grandmother would ___ cookies for us every Sunday.', choices: ['bake', 'baked', 'baking', 'bakes'], answer: 0, why: 'would のあとは動詞の原形。' },
      { sentence: 'There ___ to be a small bookstore on this corner.', choices: ['used', 'would', 'could', 'should'], answer: 0, why: '「（昔は）～があった」という状態は used to。would は状態には使わない。' },
    ],
  },
  {
    id: 'neither-nor',
    title: 'neither A nor B（A も B も～ない）',
    points: [
      'neither A nor B で「A も B も～ない」。文の中に not は入れない：I have neither time nor money.',
      '主語になるときは、動詞を近いほうの B に合わせる：Neither my brother nor my sister drinks coffee.',
    ],
    examples: [
      { en: 'This soup is neither hot nor cold.', ja: 'このスープは熱くも冷たくもない。' },
      { en: 'Neither Ken nor Mika came to the meeting.', ja: 'ケンもミカも会議に来なかった。' },
    ],
    questions: [
      { sentence: 'Our new teacher speaks ___ French nor German.', choices: ['neither', 'either', 'both', 'nor'], answer: 0, why: 'nor と組むのは neither。neither A nor B「A も B も～ない」。' },
      { sentence: 'The old man could neither read ___ write.', choices: ['nor', 'but', 'and', 'so'], answer: 0, why: 'neither A nor B の形。neither のあとは nor で受ける。' },
      { sentence: 'Neither my uncle nor my cousin ___ coffee.', choices: ['drinks', 'drink', 'drinking', 'are drinking'], answer: 0, why: '動詞は近いほうの my cousin（3人称単数）に合わせて drinks。' },
    ],
  },
  {
    id: 'the-last-to',
    title: 'the last ～ to …（最も…しそうにない）',
    points: [
      'the last ＋ 名詞 ＋ to ＋ 原形 で「最も…しそうにない～」「決して…しない～」：He is the last person to tell a lie.',
      'the last ＋ 名詞 ＋ (that) 主語 ＋ 動詞 は「まさか…とは思わない・いちばん…したくない～」：That is the last thing I want to hear.「それはいちばん聞きたくないことだ」。',
    ],
    examples: [
      { en: 'My father is the last person to break a promise.', ja: '父は決して約束をやぶるような人ではない。' },
      { en: 'This is the last place I expected to see you.', ja: 'ここできみに会うとはまったく思っていなかった。' },
    ],
    questions: [
      { sentence: 'Ken is very honest. He is the ___ person to tell a lie.', choices: ['last', 'lastly', 'at last', 'latest'], answer: 0, why: 'the last person to ～「最も～しそうにない人」。名詞 person の前なので形容詞の last。' },
      { sentence: 'Yumi works so hard. She is the last person ___ give up halfway.', choices: ['to', 'for', 'of', 'by'], answer: 0, why: 'the last ＋ 名詞 ＋ to ＋ 原形。give の前は to。' },
      { sentence: 'He is the last man ___ I want to talk to now.', choices: ['that', 'what', 'whose', 'which'], answer: 0, why: 'the last man (that) I want to talk to「今いちばん話したくない人」。先行詞のある関係代名詞 that。' },
    ],
  },
  {
    id: 'on-ing',
    title: 'On ～ing（～するとすぐに）',
    points: [
      'On ＋ ～ing で「～するとすぐに」。As soon as ～ とほぼ同じ意味：On arriving at the airport, she called me.',
      'on は前置詞なので、あとの動詞は ～ing（動名詞）にする。',
    ],
    examples: [
      { en: 'On arriving at the airport, she called me.', ja: '空港に着くとすぐに、彼女は私に電話をくれた。' },
      { en: 'On seeing the teacher, the students stood up.', ja: '先生を見るとすぐに、生徒たちは立ち上がった。' },
    ],
    questions: [
      { sentence: '___ reaching the top of the mountain, we took a lot of pictures.', choices: ['On', 'Of', 'For', 'At'], answer: 0, why: 'On ＋ ～ing「～するとすぐに」。頂上に着くとすぐに写真をとった。' },
      { sentence: 'On ___ the good news, he jumped for joy.', choices: ['hearing', 'heard', 'to hear', 'hears'], answer: 0, why: '前置詞 on のあとは動名詞 hearing。' },
      { sentence: 'On ___ home, I took a shower right away.', choices: ['getting', 'get', 'got', 'gets'], answer: 0, why: 'On getting home「家に着くとすぐに」＝ As soon as I got home。' },
    ],
  },
  {
    id: 'by-uses',
    title: 'by のいろいろな意味（手段・そば・～によって）',
    points: [
      'by ＋ 乗り物（a や the をつけない）で「～で（手段）」：by bus / by train / by bike。',
      'by ＋ 場所で「～のそばに」：a house by the river。受け身では「～によって」：written by Soseki。',
    ],
    examples: [
      { en: 'My father goes to work by train.', ja: '父は電車で仕事に行きます。' },
      { en: 'This song was written by a high school student.', ja: 'この歌は高校生によって書かれた。' },
    ],
    questions: [
      { sentence: 'I usually go to school ___ bike.', choices: ['by', 'at', 'for'], answer: 0, why: '乗り物の手段は by ＋ 乗り物（a をつけない）。by bike「自転車で」。' },
      { sentence: 'There is a small cafe ___ the station.', choices: ['by', 'from', 'into'], answer: 0, why: 'by ＋ 場所「～のそばに」。' },
      { sentence: 'This picture was painted ___ my sister.', choices: ['by', 'to', 'at'], answer: 0, why: '受け身の「～によって」は by。' },
    ],
  },
  {
    id: 'what-time',
    title: 'What time ～?（何時に～？）と時刻の at',
    points: [
      'What time ＋ 疑問文 で「何時に～しますか」：What time do you get up?',
      '答えるときの「～時に」は at ＋ 時刻：I get up at six.',
    ],
    examples: [
      { en: 'What time do you get up? — I get up at six thirty.', ja: '何時に起きますか。— 6時半に起きます。' },
      { en: 'What time does the movie start? — It starts at seven.', ja: '映画は何時に始まりますか。— 7時に始まります。' },
    ],
    questions: [
      { sentence: '___ time do you leave home in the morning?', choices: ['What', 'How', 'Who'], answer: 0, why: '「何時に」は What time。' },
      { sentence: 'What time ___ your sister go to bed?', choices: ['does', 'do', 'is'], answer: 0, why: '主語 your sister は3人称単数で、一般動詞 go の疑問文なので does。' },
      { sentence: 'We usually have dinner ___ seven.', choices: ['at', 'on', 'of'], answer: 0, why: '時刻の「～時に」は at。' },
    ],
  },
  {
    id: 'times-a-week',
    title: '回数の言い方（once / twice / three times a week）',
    points: [
      '1回は once、2回は twice、3回以上は 数 ＋ times：three times / five times。',
      '「1週間に～回」は ～ a week、「1か月に」は ～ a month（a は「～につき」）。',
    ],
    examples: [
      { en: 'I play soccer twice a week.', ja: '私は週に2回サッカーをします。' },
      { en: 'My uncle visits us three times a year.', ja: 'おじは年に3回うちに来ます。' },
    ],
    questions: [
      { sentence: 'I go swimming ___ a week.', choices: ['twice', 'two', 'second'], answer: 0, why: '「2回」は twice。two は数そのもので回数にはならない。' },
      { sentence: 'She practices the piano three ___ a week.', choices: ['times', 'time', 'timing'], answer: 0, why: '3回以上は 数 ＋ times（複数形）。' },
      { sentence: 'We visit our grandparents once ___ month.', choices: ['a', 'the', 'an'], answer: 0, why: '「1か月に1回」は once a month。a は「～につき」。month は子音で始まるので an ではない。' },
    ],
  },
  {
    id: 'famous-full-similar',
    title: 'be famous for / be full of / be similar to',
    points: [
      'be famous for ～「～で有名だ」、be full of ～「～でいっぱいだ」、be similar to ～「～に似ている」。',
      '形容詞ごとに続く前置詞が決まっているので、セットで覚える。',
    ],
    examples: [
      { en: 'This town is famous for its hot springs.', ja: 'この町は温泉で有名だ。' },
      { en: 'The station was full of people.', ja: '駅は人でいっぱいだった。' },
    ],
    questions: [
      { sentence: 'Kyoto is famous ___ its old temples.', choices: ['for', 'of', 'at'], answer: 0, why: 'be famous for ～「～で有名だ」。' },
      { sentence: 'The box was full ___ old letters.', choices: ['of', 'by', 'at'], answer: 0, why: 'be full of ～「～でいっぱいだ」。' },
      { sentence: 'Your new bag is similar ___ mine.', choices: ['to', 'from', 'at'], answer: 0, why: 'be similar to ～「～に似ている」。' },
    ],
  },
  {
    id: 'else',
    title: 'else（ほかに）：something else / What else ～?',
    points: [
      'else は「ほかの・ほかに」。something・anything・someone・anyone などのあとや、What・Who などの疑問詞のあとに置く：something else / What else?',
      'other と ちがい、else は名詞の前には置かない（× else book → other books）。',
    ],
    examples: [
      { en: 'Would you like something else?', ja: 'ほかに何かいかがですか。' },
      { en: 'Who else is coming to the party?', ja: 'ほかにだれがパーティーに来るの？' },
    ],
    questions: [
      { sentence: 'Would you like anything ___ to drink?', choices: ['else', 'other', 'another'], answer: 0, why: 'anything のあとに置いて「ほかに何か」は anything else。' },
      { sentence: 'What ___ did you buy at the store?', choices: ['else', 'other', 'another'], answer: 0, why: '疑問詞のあとに置いて「ほかに何を」は What else。' },
      { sentence: 'Is there anyone ___ in the room?', choices: ['else', 'others', 'another'], answer: 0, why: '「ほかにだれか」は anyone else。' },
    ],
  },
  {
    id: 'superlative-in-of',
    title: '最上級の in と of（～の中で）',
    points: [
      '「～の中でいちばん」の「～の中で」は、場所・グループ（クラス・家族・日本など）なら in：the tallest in my class。',
      '数（the three）や all・us など「同じ仲間の集まり」なら of：the biggest of the three / the best of all。',
    ],
    examples: [
      { en: 'Lake Biwa is the largest lake in Japan.', ja: '琵琶湖は日本でいちばん大きい湖だ。' },
      { en: 'This dog is the smallest of the five.', ja: 'この犬は5匹の中でいちばん小さい。' },
    ],
    questions: [
      { sentence: 'Ken is the tallest ___ his class.', choices: ['in', 'from', 'by'], answer: 0, why: '「クラスの中で」はグループ・場所なので in。' },
      { sentence: 'This is the biggest ___ the three boxes.', choices: ['of', 'in', 'at'], answer: 0, why: 'the three（3つ）のような数の集まりの中では of。' },
      { sentence: 'Mt. Fuji is the highest mountain ___ Japan.', choices: ['in', 'at', 'by'], answer: 0, why: '「日本で」は場所なので in。' },
    ],
  },
  {
    id: 'will-have-to',
    title: "will have to / won't have to（～しなければならないだろう）",
    points: [
      'must には未来の形がないので、未来の「～しなければならないだろう」は will have to ＋ 原形。',
      "「～しなくてよいだろう」は won't have to ＋ 原形。will must とは言わない。",
    ],
    examples: [
      { en: 'You will have to study hard for the test.', ja: 'テストのために一生けんめい勉強しなければならないだろう。' },
      { en: "We won't have to wait. The train is coming.", ja: '待たなくてよさそうだ。電車が来ている。' },
    ],
    questions: [
      { sentence: "It's going to rain, so you will ___ to take an umbrella.", choices: ['have', 'must', 'has'], answer: 0, why: 'will のあとは原形。「～しなければならないだろう」は will have to。will must とは言わない。' },
      { sentence: "Tomorrow is Sunday, so I won't ___ to get up early.", choices: ['have', 'had', 'having'], answer: 0, why: "won't のあとは原形 have。won't have to「～しなくてよいだろう」。" },
      { sentence: 'We ___ have to wait long. The bus will come soon.', choices: ["won't", "don't will", 'not will'], answer: 0, why: "未来の否定は won't ＋ 原形。won't have to「～しなくてよいだろう」。" },
    ],
  },
  {
    id: 'can-i-you',
    title: 'Can I ～? / Can you ～?（～してもいい？／～してくれる？）',
    points: [
      'Can I ＋ 原形 ～? で「～してもいいですか」（許可をもらう）：Can I use your pen?',
      'Can you ＋ 原形 ～? で「～してくれますか」（お願い）：Can you help me? 答えは Sure. / OK. / No problem. など。',
    ],
    examples: [
      { en: 'Can I open the window? — Sure.', ja: '窓を開けてもいい？— いいよ。' },
      { en: 'Can you carry this bag? — No problem.', ja: 'このかばんを運んでくれる？— いいよ。' },
    ],
    questions: [
      { sentence: '___ I use your pen? — Sure.', choices: ['Can', 'Am', 'Is'], answer: 0, why: '「～してもいい？」は Can I ＋ 原形。Am I・Is I のあとに use（原形）は続かない。' },
      { sentence: 'Can you ___ the window, please? — OK.', choices: ['close', 'closes', 'closing'], answer: 0, why: 'can のあとは動詞の原形。' },
      { sentence: 'Can you help me? — Sure. ___ problem.', choices: ['No', 'Not', 'None'], answer: 0, why: 'No problem.「いいよ・おやすいご用」。' },
    ],
  },
  {
    id: 'be-born',
    title: 'be born（生まれる）',
    points: [
      '「生まれた」は was / were born：I was born in 2012.（born だけでは動詞にならない）',
      '年・月・場所は in、日付は on：I was born in Osaka. / He was born on April 3.',
    ],
    examples: [
      { en: 'I was born in Kobe.', ja: '私は神戸で生まれました。' },
      { en: 'When were you born? — I was born on June 10.', ja: 'あなたはいつ生まれたの？— 6月10日に生まれたよ。' },
    ],
    questions: [
      { sentence: 'My little sister ___ born in 2015.', choices: ['was', 'did', 'has'], answer: 0, why: '「生まれた」は was born。did born・has born とは言わない。' },
      { sentence: 'Where were you ___? — In Sendai.', choices: ['born', 'bear', 'birth'], answer: 0, why: 'be born「生まれる」。were you のあとは過去分詞の born。birth は名詞。' },
      { sentence: 'Our teacher was born ___ March 21.', choices: ['on', 'in', 'at'], answer: 0, why: '日付（March 21）の前は on。月や年だけなら in。' },
    ],
  },
  {
    id: 'of-with-abstract',
    title: 'of ＋ 抽象名詞 / with ＋ 抽象名詞（of use＝useful、with ease＝easily）',
    points: [
      'of ＋ 抽象名詞 は形容詞の意味：of use＝useful（役に立つ）、of importance＝important（重要な）、of value＝valuable（価値のある）。great や no をつけて程度を表す：of great use／of no use。',
      'with ＋ 抽象名詞 は副詞の意味：with ease＝easily（簡単に）、with care＝carefully（注意して）。',
    ],
    examples: [
      { en: 'This dictionary is of great use to beginners.', ja: 'この辞書は初心者にとても役に立つ。' },
      { en: 'Please carry the box with care.', ja: 'その箱は注意して運んでください。' },
    ],
    questions: [
      { sentence: 'The old map was of great ___ to us during the hike.', choices: ['use', 'useful', 'usefully', 'uses'], answer: 0, why: 'of ＋ 名詞 で形容詞の意味。of great use＝very useful。of のあとに形容詞・副詞は来ない。' },
      { sentence: 'Ken answered the hard question ___ ease.', choices: ['with', 'of', 'by', 'for'], answer: 0, why: 'with ease＝easily「簡単に」。with ＋ 抽象名詞 で副詞の意味。' },
      { sentence: 'Whether he wins or not is of no ___ to me.', choices: ['importance', 'important', 'importantly', 'importances'], answer: 0, why: 'of no importance＝not important at all「まったく重要でない」。of のあとは名詞。' },
    ],
  },
  {
    id: 'give-to-for',
    title: 'give 物 to 人 / make 物 for 人（to と for の使い分け）',
    points: [
      '「動詞＋人＋物」は「動詞＋物＋to／for＋人」に言いかえられる：give me a book → give a book to me。',
      'to を使う：give・show・send・tell・teach・lend（相手に届く動作）。for を使う：make・buy・cook・find（相手のためにする動作）。',
    ],
    examples: [
      { en: 'I showed my new bag to my friend.', ja: '私は新しいかばんを友だちに見せた。' },
      { en: 'My father cooked dinner for us.', ja: '父は私たちのために夕食を作ってくれた。' },
    ],
    questions: [
      { sentence: 'Kenta gave his old bike ___ his cousin.', choices: ['to', 'at', 'of'], answer: 0, why: 'give 物 to 人「人に物をあげる」。give は to を使う。' },
      { sentence: 'My mother made a cake ___ me on my birthday.', choices: ['for', 'to', 'at'], answer: 0, why: 'make 物 for 人「人のために物を作る」。make は for を使う（to は使わない）。' },
      { sentence: 'Please show your ticket ___ the staff at the gate.', choices: ['to', 'at', 'of'], answer: 0, why: 'show 物 to 人「人に物を見せる」。show は to を使う。' },
    ],
  },
  {
    id: 'thank-sorry-for',
    title: 'Thank you for ～ / I\'m sorry for ～・to ～（お礼とおわび）',
    points: [
      'Thank you for ＋ 名詞／～ing「～をありがとう」：Thank you for the letter. / Thank you for coming.',
      'I\'m sorry for ＋ 名詞／～ing「～してごめんなさい」：I\'m sorry for being late. I\'m sorry to ＋ 原形 は「～して残念・気の毒に思う」：I\'m sorry to hear that.',
    ],
    examples: [
      { en: 'Thank you for inviting me to the party.', ja: 'パーティーに招待してくれてありがとう。' },
      { en: "I'm sorry to hear that you were sick.", ja: '具合が悪かったと聞いて気の毒に思います。' },
    ],
    questions: [
      { sentence: 'Thank you ___ the nice present.', choices: ['for', 'to', 'with'], answer: 0, why: 'Thank you for ～「～をありがとう」。お礼の理由は for で表す。' },
      { sentence: "I'm sorry ___ late this morning.", choices: ['for being', 'to being', 'being'], answer: 0, why: "I'm sorry for ～ing「～してごめんなさい」。前置詞 for のあとは ～ing。" },
      { sentence: "I'm sorry ___ hear that your dog is sick.", choices: ['to', 'for', 'of'], answer: 0, why: "I'm sorry to ＋ 原形「～して残念に思う」。hear は原形なので to。" },
    ],
  },
  {
    id: 'cannot-too',
    title: 'cannot ～ too …（いくら～してもしすぎることはない）',
    points: [
      'cannot ＋ 動詞 ＋ too ＋ 形容詞・副詞「いくら～してもしすぎることはない（とても大切だ）」：You cannot be too careful.「いくら注意してもしすぎることはない」。',
      '動詞を強めるときは too much：I cannot thank you too much.「いくら感謝してもしきれない」。enough を使って cannot ～ enough とも言える。',
    ],
    examples: [
      { en: 'You cannot be too careful when you ride a bike at night.', ja: '夜に自転車に乗るときは、いくら注意してもしすぎることはない。' },
      { en: 'We cannot praise her courage too much.', ja: '彼女の勇気はいくらほめてもほめすぎることはない。' },
    ],
    questions: [
      { sentence: 'You cannot be ___ careful when you cross this busy street.', choices: ['too', 'much', 'enough', 'very'], answer: 0, why: 'cannot be too ＋ 形容詞「いくら～でもすぎることはない」。much careful・enough careful とは言わない（enough は形容詞のあと）。' },
      { sentence: 'We cannot thank Ms. Kato ___ for her kind help.', choices: ['enough', 'too', 'such', 'very'], answer: 0, why: 'cannot thank ～ enough「いくら感謝してもしきれない」。too なら too much の形にする。such は副詞として動詞を修飾できない。' },
      { sentence: 'You cannot practice too ___ before the big concert.', choices: ['much', 'many', 'more', 'lot'], answer: 0, why: '動詞 practice を強めるのは too much。too many は数えられる名詞の前、too more とは言わない。' },
    ],
  },
  {
    id: 'a-an-the',
    title: '冠詞 a / an / the（an apple・the sun）',
    points: [
      '1つのものには a。母音（ア・イ・ウ・エ・オ）の音で始まる語の前は an：an apple / an egg / an hour（h を読まない）。つづりではなく音で決める：a uniform（ユ）。',
      'the は「その～」と相手にどれかわかるもの：前に出たもの（I have a dog. The dog is white.）や、1つしかないもの（the sun / the moon）。',
    ],
    examples: [
      { en: 'I have an umbrella and a raincoat.', ja: '私はかさとレインコートを持っている。' },
      { en: 'I saw a cat. The cat was sleeping on a car.', ja: 'ねこを見た。そのねこは車の上で寝ていた。' },
    ],
    questions: [
      { sentence: 'I eat ___ egg every morning.', choices: ['an', 'a', 'two'], answer: 0, why: 'egg は母音の音（エ）で始まるので an。two なら eggs になる。' },
      { sentence: 'We waited for ___ hour at the station.', choices: ['an', 'a', 'many'], answer: 0, why: 'hour は h を読まず「アワー」と母音の音で始まるので an。many なら hours になる。' },
      { sentence: 'Look at ___ moon. It is very bright tonight.', choices: ['the', 'an', 'two'], answer: 0, why: '空の月は1つしかないので the moon。moon は子音で始まるので an は使わない。' },
    ],
  },
  {
    id: 'as-many-much-noun',
    title: 'as many ＋ 名詞 ＋ as / as much ＋ 名詞 ＋ as（数・量をくらべる）',
    points: [
      '数をくらべるときは as many ＋ 複数名詞 ＋ as：I have as many books as Ken.「ケンと同じくらいたくさんの本」。',
      '量（数えられない名詞）は as much ＋ 名詞 ＋ as：She drinks as much water as I do. 否定 not as many / much 〜 as は「〜ほど多くない」。',
    ],
    examples: [
      { en: 'Our team scored as many goals as theirs.', ja: '私たちのチームは相手と同じ数の点を取った。' },
      { en: "I don't have as much free time as last year.", ja: '去年ほど自由な時間がない。' },
    ],
    questions: [
      { sentence: "I don't have as ___ money as my brother.", choices: ['much', 'many', 'more'], answer: 0, why: 'money は数えられない名詞なので as much 〜 as。as のあいだは比較級にしない。' },
      { sentence: 'Yuki read as ___ books as Ken last month.', choices: ['many', 'much', 'more'], answer: 0, why: 'books は数えられる名詞の複数形なので as many 〜 as。' },
      { sentence: 'There are not as many students in this class ___ in that class.', choices: ['as', 'than', 'so'], answer: 0, why: 'as many 〜 as … の形。than は比較級（more）のあとで使う。' },
    ],
  },
  {
    id: 'irregular-past',
    title: '不規則動詞の過去形（go → went・see → saw）',
    points: [
      '-ed をつけずに形が変わる動詞がある：go → went、see → saw、eat → ate、buy → bought、write → wrote、catch → caught。',
      '否定・疑問は did ＋ 原形にもどす：I didn\'t go. / Did you see it? （did のあとに went・saw は使わない）。',
    ],
    examples: [
      { en: 'I bought a new notebook yesterday.', ja: 'きのう新しいノートを買った。' },
      { en: 'Did you eat lunch? — Yes, I ate a sandwich.', ja: 'お昼を食べた？— うん、サンドイッチを食べたよ。' },
    ],
    questions: [
      { sentence: 'I ___ a big fish at the lake yesterday.', choices: ['caught', 'catched', 'catch'], answer: 0, why: 'catch の過去形は caught（不規則動詞）。catched とは言わない。' },
      { sentence: 'Mika ___ a letter to her friend last night.', choices: ['wrote', 'writed', 'writes'], answer: 0, why: 'write の過去形は wrote。last night なので過去形。' },
      { sentence: 'We ___ a rainbow after the rain this morning.', choices: ['saw', 'seed', 'see'], answer: 0, why: 'see の過去形は saw。this morning（けさ）の出来事なので過去形。' },
    ],
  },
  {
    id: 'there-will-be',
    title: 'There will be ～（～があるでしょう）',
    points: [
      '未来に「～がある・いる」は There will be ＋ 名詞：There will be a concert tomorrow. be は原形のまま（is・are にしない）。',
      '疑問文は Will there be ～? — Yes, there will. / No, there won\'t. 否定は There won\'t be ～。',
    ],
    examples: [
      { en: 'There will be a lot of people at the beach this weekend.', ja: '今週末、海辺にはたくさんの人がいるだろう。' },
      { en: 'Will there be a bus after nine? — No, there won\'t.', ja: '9時以降にバスはありますか。— いいえ、ありません。' },
    ],
    questions: [
      { sentence: 'There ___ be a festival in our town next Sunday.', choices: ['will', 'is', 'are'], answer: 0, why: '未来の「～がある」は There will be。be の前に is・are は置けない。' },
      { sentence: '___ there be enough chairs for everyone? — Yes, there will.', choices: ['Will', 'Do', 'Are'], answer: 0, why: '疑問文は Will there be ～? の語順。答えも there will。' },
      { sentence: "There ___ be any rain tomorrow, so we can go hiking.", choices: ["won't", "isn't", "doesn't"], answer: 0, why: "否定は There won't be ～。be の前に isn't・doesn't は置けない。" },
    ],
  },
  {
    id: 'progressive-q-neg',
    title: '現在進行形の疑問文・否定文（Are you ～ing? / I\'m not ～ing）',
    points: [
      '疑問文は be動詞を主語の前に出す：Are you studying? — Yes, I am. / No, I\'m not. 「何をしているの？」は What are you doing?',
      '否定文は be動詞のあとに not：He isn\'t watching TV. do・does は使わない。',
    ],
    examples: [
      { en: 'What are you doing? — I\'m making a cake.', ja: '何をしているの？— ケーキを作っているよ。' },
      { en: "My brother isn't sleeping. He's reading a book.", ja: '弟は寝ていない。本を読んでいる。' },
    ],
    questions: [
      { sentence: '___ you studying English now? — Yes, I am.', choices: ['Are', 'Do', 'Is'], answer: 0, why: '進行形の疑問文は be動詞を前に出す。主語 you なので Are。Do は一般動詞の疑問文。' },
      { sentence: "Ken ___ watching TV. He's doing his homework.", choices: ["isn't", "doesn't", "don't"], answer: 0, why: "進行形の否定文は be動詞＋not。Ken は1人なので isn't。" },
      { sentence: 'What ___ your sister doing? — She is playing the piano.', choices: ['is', 'does', 'are'], answer: 0, why: '主語 your sister は1人なので is。答えも She is playing の進行形。' },
    ],
  },
  {
    id: 'how-long-perfect',
    title: 'How long have you ～? / How many times have you ～?',
    points: [
      '「どのくらい（の間）～しているか」は How long have（has）＋ 主語 ＋ 過去分詞 ～? 答えは for ～ / since ～。',
      '「何回～したことがあるか」は How many times have（has）＋ 主語 ＋ 過去分詞 ～? 答えは once / twice / three times など。',
    ],
    examples: [
      { en: 'How long have you lived here? — For ten years.', ja: 'ここにどのくらい住んでいるの？— 10年間だよ。' },
      { en: 'How many times have you been to Kyoto? — Twice.', ja: '京都に何回行ったことがある？— 2回だよ。' },
    ],
    questions: [
      { sentence: 'How ___ have you known Ms. Ito? — Since I was ten.', choices: ['long', 'many', 'often'], answer: 0, why: '答えが since ～（期間）なので How long。How many なら times などの名詞が必要。' },
      { sentence: 'How many ___ has Ken visited the museum? — Three times.', choices: ['times', 'long', 'days'], answer: 0, why: '回数をたずねるのは How many times。答えも three times。' },
      { sentence: 'How long ___ your brother been sick? — For two days.', choices: ['has', 'have', 'is'], answer: 0, why: '主語 your brother は3人称単数なので has ＋ been（現在完了）。' },
    ],
  },
  {
    id: 'directions',
    title: '道案内の英語（How can I get to ～? / Turn left at ～）',
    points: [
      '道をたずねる：How can I get to ～?「～へはどう行けばいいですか」。Could you tell me the way to ～? もていねい。',
      '答え方は命令文：Go straight.／Turn left (right) at the second corner.「2つ目の角で左（右）に曲がって」。You\'ll see it on your left.「左手に見えます」。',
    ],
    examples: [
      { en: 'How can I get to the library? — Go straight and turn right at the bank.', ja: '図書館へはどう行けばいいですか。— まっすぐ行って、銀行のところで右に曲がってください。' },
      { en: "You'll see the station on your left.", ja: '駅は左手に見えますよ。' },
    ],
    questions: [
      { sentence: 'Excuse me. How can I ___ to the city hall?', choices: ['get', 'arrive', 'reach'], answer: 0, why: 'How can I get to ～?「～へはどう行けばいいですか」。arrive は arrive at、reach は to なしで使う。' },
      { sentence: 'Turn left ___ the second corner.', choices: ['at', 'on', 'in'], answer: 0, why: '曲がる地点（角）は at：turn left at the corner。' },
      { sentence: "Go straight, and you'll see the post office ___ your right.", choices: ['on', 'at', 'in'], answer: 0, why: '「右手に・左手に」は on your right / on your left。' },
    ],
  },
  {
    id: 'independent-infinitive',
    title: '独立不定詞（to tell the truth / to be honest など）',
    points: [
      '文全体にかかる決まった不定詞の言い方：to tell the truth「実を言うと」、to be honest「正直に言うと」、to begin with「まず第一に」、strange to say「奇妙なことに」。',
      'needless to say「言うまでもなく」、so to speak「いわば」、to make matters worse「さらに悪いことに」。文頭や文中にコンマで区切って置く。',
    ],
    examples: [
      { en: "To tell the truth, I didn't do my homework.", ja: '実を言うと、宿題をしていないんだ。' },
      { en: 'It was raining, and to make matters worse, I lost my umbrella.', ja: '雨が降っていて、さらに悪いことに、かさをなくしてしまった。' },
    ],
    questions: [
      { sentence: 'To ___ the truth, I was a little scared during the test.', choices: ['tell', 'say', 'speak', 'talk'], answer: 0, why: 'to tell the truth「実を言うと」は決まった形。say・speak は使わない。' },
      { sentence: '___ to say, health is more important than money.', choices: ['Needless', 'Unless', 'Useless', 'Needed'], answer: 0, why: 'needless to say「言うまでもなく」。' },
      { sentence: 'To begin ___, we need to decide the date of the party.', choices: ['with', 'at', 'from', 'by'], answer: 0, why: 'to begin with「まず第一に」。' },
    ],
  },
  {
    id: 'play-the',
    title: 'play the ＋ 楽器 / play ＋ スポーツ（the のあり・なし）',
    points: [
      '楽器をひく・ふくときは play the ＋ 楽器：play the piano / play the guitar（the をつける）。',
      'スポーツをするときは play ＋ スポーツ：play soccer / play tennis（the をつけない）。',
    ],
    examples: [
      { en: 'My brother plays the drums in a band.', ja: '兄はバンドでドラムをたたいている。' },
      { en: 'We play basketball after school.', ja: '私たちは放課後バスケットボールをする。' },
    ],
    questions: [
      { sentence: 'Yui can play ___ flute very well.', choices: ['the', 'a', 'to'], answer: 0, why: '楽器は play the ＋ 楽器。' },
      { sentence: 'Do you play ___ every Sunday? — Yes, I do.', choices: ['tennis', 'the tennis', 'a tennis'], answer: 0, why: 'スポーツは play ＋ スポーツで、the も a もつけない。' },
      { sentence: 'My grandfather plays ___ guitar at night.', choices: ['the', 'an', 'some'], answer: 0, why: '楽器なので play the guitar。' },
    ],
  },
  {
    id: 'result-infinitive',
    title: '結果の不定詞（only to ～ / never to ～ / grow up to be ～）',
    points: [
      '不定詞は「その結果～した」という意味も表す。〈grow up to be ～〉「成長して～になる」：She grew up to be a famous pianist.「彼女は成長して有名なピアニストになった」。',
      '〈～, only to ...〉「～したが、結局…しただけだった」（がっかりする結果）、〈～, never to ...〉「～して、二度と…しなかった」：He hurried to the station, only to miss the train.「駅へ急いだが、電車に乗りおくれただけだった」。',
    ],
    examples: [
      { en: 'The shy boy grew up to be a great speaker.', ja: '内気な少年は、成長してすばらしい話し手になった。' },
      { en: 'I opened the box, only to find it empty.', ja: '箱を開けたが、中はからっぽだった。' },
    ],
    questions: [
      { sentence: 'My cousin grew up ___ a doctor.', choices: ['to be', 'being', 'be', 'been'], answer: 0, why: 'grow up to be ～「成長して～になる」。結果を表す不定詞。' },
      { sentence: 'We ran to the shop, only ___ that it was closed.', choices: ['to find', 'finding', 'found', 'find'], answer: 0, why: '～, only to ...「～したが、結局…だった」。only のあとは to 不定詞。' },
      { sentence: 'He left his hometown, never ___ back again.', choices: ['to come', 'coming', 'came', 'come'], answer: 0, why: '～, never to ...「～して、二度と…しなかった」。never のあとは to 不定詞。' },
    ],
  },
  {
    id: 'wherever-whenever',
    title: '複合関係副詞（wherever / whenever：どこでも・いつでも）',
    points: [
      '〈wherever ～〉「～するところならどこでも」：You can sit wherever you like.「好きなところにすわっていいよ」。〈whenever ～〉「～するときはいつでも」：Call me whenever you are free.「ひまなときはいつでも電話してね」。',
      '「どこで～しても」「いつ～しても」という譲歩の意味にもなる（＝no matter where / no matter when）：Wherever you go, I will remember you.「きみがどこへ行っても、きみのことを覚えているよ」。',
    ],
    examples: [
      { en: 'Whenever I hear this song, I think of summer.', ja: 'この歌を聞くといつも、夏を思い出す。' },
      { en: 'My dog follows me wherever I go.', ja: '私の犬は、私が行くところどこへでもついてくる。' },
    ],
    questions: [
      { sentence: 'You can sit ___ you like.', choices: ['wherever', 'whatever', 'whoever', 'whom'], answer: 0, why: '「好きなところにすわる」は場所なので wherever。sit は目的語をとらないので whatever・whoever は入らない。' },
      { sentence: '___ I visit my grandmother, she makes me a cake.', choices: ['Whenever', 'Whatever', 'Which', 'Whom'], answer: 0, why: '「おばあちゃんをたずねるときはいつも」なので Whenever。I visit my grandmother は完全な文なので Whatever・Which は入らない。' },
      { sentence: 'Call me ___ you need help.', choices: ['whenever', 'whatever', 'whichever', 'whom'], answer: 0, why: '「助けが必要なときはいつでも」なので whenever。you need help は完全な文なので whatever・whichever は入らない。' },
    ],
  },
]

export type GrammarRecord = Record<string, number> // 単元id → 最高正解数

const STORAGE_KEY = 'eitan:grammar'

export function loadGrammar(): GrammarRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([, n]) => typeof n === 'number')) as GrammarRecord
  } catch {
    return {}
  }
}

export function saveGrammar(r: GrammarRecord): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(r))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 文法スタンプカード：確認問題を全問正解した単元にスタンプ。10個ごとにガチャチケット
export const STAMP_EVERY = 10
export const grammarStamps = (r: GrammarRecord) => GRAMMAR.filter((u) => r[u.id] === u.questions.length).length

// まとめテストのランク（10問中）とベスト記録
export const mixRank = (score: number, total: number): 'S' | 'A' | 'B' => (score >= total ? 'S' : score >= total * 0.8 ? 'A' : 'B')
const MIX_KEY = 'eitan:grammar-mix-best'
export function loadMixBest(): Record<string, number> {
  try {
    const v = JSON.parse(localStorage.getItem(MIX_KEY) ?? '{}') as unknown
    return v && typeof v === 'object' && !Array.isArray(v) ? (Object.fromEntries(Object.entries(v).filter(([, n]) => typeof n === 'number')) as Record<string, number>) : {}
  } catch {
    return {}
  }
}
export function saveMixBest(r: Record<string, number>): void {
  try {
    localStorage.setItem(MIX_KEY, JSON.stringify(r))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 苦手な単元：確認問題に挑戦して、まだ全問正解していない単元
export const weakUnits = (r: GrammarRecord) => GRAMMAR.filter((u) => r[u.id] !== undefined && r[u.id] < u.questions.length)

// 今日の文法：日付で1単元を選ぶ。その日に全問正解すると🪙5（1日1回）
export const DAILY_GRAMMAR_COINS = 5
export function dailyGrammar(day: string): GrammarUnit {
  const n = [...day].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 9973, 11)
  const list = grammarForGrade() // 設定の学年に合わせる（えらんでいなければ全部）
  return list[n % list.length]
}

// 設定の学年に合う文法の単元（学年をえらんでいなければ全部）
export function grammarForGrade(g: GradeId | '' = loadGrade()): GrammarUnit[] {
  if (!g) return GRAMMAR
  const list = GRAMMAR.filter((u) => GRAMMAR_GRADES_FOR[g].includes(gradeOf(u.id)))
  return list.length > 0 ? list : GRAMMAR
}
const DAILY_KEY = 'eitan:grammar-daily'
export function loadDailyGrammarDay(): string {
  try {
    return localStorage.getItem(DAILY_KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveDailyGrammarDay(d: string): void {
  try {
    localStorage.setItem(DAILY_KEY, d)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 文法タイムアタックのベスト記録
export const TA_BEST_XP = 20 // 文法タイムアタックのベスト更新で文法のなかまにあげる XP
export const TA_SECONDS = 60
const KEY = 'eitan:grammar-ta-best'

export function loadTaBest(): number {
  try {
    const n = Number(localStorage.getItem(KEY) ?? 0)
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}

export function saveTaBest(n: number): void {
  try {
    localStorage.setItem(KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}


// 学年の目安（学校の教科書の順番は会社によって少しちがうので「目安」）
export type GrammarGrade = '中1' | '中2' | '中3' | '高校'
export const GRAMMAR_GRADES: GrammarGrade[] = ['中1', '中2', '中3', '高校']
const GRADE_IDS: Record<GrammarGrade, string[]> = {
  中1: ['play-the', 'progressive-q-neg', 'irregular-past', 'a-an-the', 'can-i-you', 'times-a-week', 'what-time', 'go-ing', 'there-q-neg', 'can-basic', 'ordinal-date', 'this-these', 'do-does', 'was-were', 'place-prep', 'plural-forms', 'what-noun', 'verb-prep', 'how-many-much', 'make-do', 'it-weather', 'take-uses', 'a-piece-of', 'time-no-prep', 'short-answer', 'by-with', 'and-but-or-so', 'be-imperative', 'whose-which', 'how-adj', 'possessive', 'be', 'third', 'past', 'progressive', 'imperative', 'wh', 'pronoun', 'preposition', 'countable', 'frequency', 'adverb', 'there'],
  中2: ['prep-idiom-onthefloor', 'prep-idiom-atnight', 'prep-idiom-aroundtheworld', 'prep-idiom-underwater', 'prep-idiom-bythewindow', 'prep-idiom-inclass', 'prep-idiom-atparty', 'prep-idiom-inthenewspaper', 'prep-idiom-inthepicture', 'prep-idiom-fordessert', 'prep-idiom-bysubway', 'prep-idiom-onthebus', 'prep-idiom-bothsides', 'prep-idiom-mondaymorning', 'prep-idiom-intherain', 'prep-idiom-onphone', 'prep-idiom-inspace', 'prep-idiom-atwork', 'directions', 'there-will-be', 'thank-sorry-for', 'give-to-for', 'be-born', 'superlative-in-of', 'else', 'famous-full-similar', 'by-uses', 'like-such-as', 'there-was', 'when-future', 'which-better', 'future-q-neg', 'need-to', 'too-many-much', 'infinitive-uses', 'to-for-person', 'wh-subject', 'more-and-more', 'during-for', 'take-idioms', 'one-it', 'thing-adjective', 'be-able-to', 'say-tell', 'so-do-i', 'to-or-ing', 'would-like', 'another-other', 'same-different', 'phrasal-look', 'get-uses', 'adj-order', 'help-do', 'ago-before', 'because-of', 'number-expr', 'how-about', 'call-ab', 'adj-prep', 'after-before', 'look-adj', 'have-to', 'may-might', 'between-among', 'both-either', 'good-better', 'few-little', 'prep-gerund', 'prep-phrase', 'shall', 'to-adjective', 'by-until', 'past-progressive', 'future', 'compare', 'as-as', 'one-of-the', 'infinitive', 'gerund', 'want-to', 'conjunction', 'svoo-svoc', 'if-present', 'modal', 'polite-request', 'feeling-to', 'too-also-either', 'each-every', 'passive', 'passive-q-neg', 'gerund-idioms', 'that-clause', 'reflexive', 'some-any'],
  中3: ['prep-idiom-dawn', 'prep-idiom-inaminute', 'prep-idiom-atthesametime', 'prep-idiom-inthepast', 'prep-idiom-bymistake', 'prep-idiom-withasmile', 'prep-idiom-inorder', 'prep-idiom-inmyopinion', 'prep-idiom-forfun', 'prep-idiom-pairs', 'prep-idiom-byhand', 'prep-idiom-inuniform', 'prep-idiom-tomysurprise', 'prep-idiom-incash', 'prep-idiom-ages', 'how-long-perfect', 'as-many-much-noun', 'will-have-to', 'ready-willing', 'been-gone', 'not-a-but-b', 'make-sure', 'first-time', 'almost-most', 'most-of', 'second-ever', 'as-possible', 'modal-passive', 'change-adj', 'must-cant-be', 'be-about-to', 'get-done', 'each-other', 'tag-imperative', 'fractions', 'adj-that', 'think-so', 'passive-prep', 'it-is-said', 'still-anymore', 'find-leave-oc', 'unless', 'passive-progressive-perfect', 'compare-emphasis', 'keep-ing', 'spend-ing', 'so-such', 'ing-two', 'relative-that', 'not-to', 'as-soon-as', 'perfect-done', 'times-as', 'while', 'whose', 'relative-what', 'perfect', 'perfect-experience', 'for-since', 'perfect-progressive', 'relative', 'relative-omit', 'participle', 'indirect', 'wh-to', 'it-for-to', 'subjunctive', 'so-that', 'too-enough', 'what-a', 'tag-exclaim', 'tag-q', 'causative', 'if-whether', 'it-takes', 'imperative-and-or', 'nobody-nothing', 'though', 'not-only', 'emotion-participle', 'perception'],
  高校: ['prep-idiom-inaword', 'prep-idiom-atspeed', 'prep-idiom-harmony', 'prep-idiom-underage', 'prep-idiom-onthemove', 'prep-idiom-latest', 'prep-idiom-bythehour', 'prep-idiom-withpleasure', 'prep-idiom-strike', 'prep-idiom-condition', 'prep-idiom-pain', 'prep-idiom-depth', 'prep-idiom-brief', 'prep-idiom-theory', 'prep-idiom-contrast', 'prep-idiom-turn', 'prep-idiom-spirits', 'prep-idiom-schedule', 'prep-idiom-by-2', 'prep-idiom-speed', 'group-prep-cost', 'group-prep-age', 'group-prep-heart', 'group-prep-wake', 'group-prep-verge', 'group-prep-view', 'group-prep-hope', 'group-prep-back', 'group-prep-begin-end', 'group-prep-connection', 'group-prep-support', 'group-prep-means', 'group-prep-place-at', 'group-prep-presence', 'group-prep-expense', 'group-prep-event', 'group-prep-regard', 'group-prep-contrary', 'group-prep-except', 'group-prep-purpose-2', 'prep-against-2', 'prep-within', 'prep-beyond', 'prep-idiom-under-2', 'from-to-idioms', 'pair-prep-idioms', 'by-by-idioms-2', 'by-by-idioms', 'prep-idiom-mood', 'prep-idiom-on-trip', 'prep-idiom-notice', 'prep-idiom-out-of-2', 'prep-idiom-on-the', 'prep-idiom-place', 'prep-idiom-contrary', 'prep-idiom-no-way', 'prep-idiom-case', 'prep-idiom-the', 'prep-idiom-sight', 'prep-idiom-meantime', 'freq-idioms', 'prep-idiom-time-2', 'prep-idiom-on-at', 'prep-idiom-way', 'prep-idiom-cost', 'prep-idiom-time', 'prep-idiom-at-2', 'prep-idiom-in-2', 'prep-idiom-state-3', 'prep-idiom-state-2', 'prep-idiom-in-state', 'prep-idiom-in-at', 'prep-idiom-out-at', 'prep-idiom-for-in', 'prep-idiom-in-by', 'prep-idiom-at', 'prep-idiom-on', 'prep-idiom-under', 'prep-idiom-out-of', 'prep-idiom-public', 'prep-idiom-chance', 'group-prep-honor', 'group-prep-result', 'group-prep-account', 'group-prep-exchange', 'group-prep-ahead', 'group-prep-place', 'group-prep-regardless', 'group-prep-charge', 'phrasal-down-up-on', 'adj-prep-8', 'against-throughout-unlike', 'above-below-beyond', 'through-toward-past', 'beside-besides', 'have-fun-ing', 'force-require-to', 'remind-warn-to', 'explain-to', 'verb-a-with-b', 'verb-a-into-b', 'verb-prep-dream', 'adj-prep-7', 'verb-prep-rely', 'verb-prep-from', 'adj-prep-6', 'verb-prep-concentrate', 'verb-prep-across', 'verb-prep-hear', 'adj-prep-5', 'verb-prep-belong', 'adj-prep-4', 'talk-into', 'thank-praise-for', 'adj-prep-3', 'adj-prep-2', 'judgment-to', 'as-as-ever', 'enough-position', 'sense-like-noun', 'congratulate-on', 'prep-in-manner', 'these-days-tense', 'it-is-pity-that', 'regard-as', 'go-for-on', 'since-as-reason', 'reported-statement', 'easy-to-read', 'part-of-verb', 'is-believed-to', 'be-expected-to', 'something-wrong-with', 'that-of-those-of', 'some-of-whom', 'negative-question', 'want-done', 'too-to-so-that', 'at-first-last', 'linking-phrases', 'prep-phrases-purpose', 'present-for-future', 'wonder-if', 'not-ing', 'perception-done', 'subject-verb-number', 'number-amount', 'end-up-ing', 'reluctant-hesitate', 'know-better-than', 'to-ing-2', 'sure-of-to', 'so-far-by-then', 'afraid-of-to', 'go-on-ing-to', 'it-seems-that', 'inanimate-subject', 'remain-keep-participle', 'had-hoped', 'likely-that-to', 'mixed-conditional', 'were-it-not', 'try-ing', 'mean-ing', 'lie-lay-forms', 'rise-raise-forms', 'its-its', 'their-there', 'friend-of-mine', 'by-difference', 'uncountable', 'noun-number', 'what-do-you-say', 'in-within', 'gerund-verbs-2', 'inf-verbs-2', 'phrasal-pronoun', 'carry-out', 'look-up-to', 'get-along-with', 'due-to', 'owe-to', 'similar-to', 'take-pride', 'provide-with', 'replace-with', 'used-for', 'it-is-true-but', 'succeed-in', 'graduate-from', 'agree-with-to', 'depend-on', 'consist-of', 'result-in', 'apologize-for', 'accuse-of', 'known-for-as', 'familiar-with', 'hope-wish-subj', 'insist-on', 'conj-ing', 'if-possible', 'eager-to', 'what-is-worse', 'need-ing', 'otherwise', 'whether-to', 'what-for', 'make-it-a-rule', 'take-for-granted', 'afford-to', 'ever-since', 'not-long-before', 'superior-to', 'nothing-like', 'for-all', 'make-use-of', 'capable-of', 'as-to', 'it-costs', 'reason-is-that', 'some-others', 'as-good-as', 'what-little', 'if-any', 'not-that', 'however-therefore', 'not-a-single', 'how-come', 'let-alone', 'no-point-ing', 'regret-ing', 'come-to-do', 'all-you-have-to', 'absolute-participle', 'so-much-as', 'former-latter', 'up-to', 'need-not', 'ought-to', 'tend-to', 'what-if', 'whereas', 'given-that', 'it-occurs-to', 'not-because', 'make-oneself-understood', 'there-seems', 'by-far', 'so-adj-a', 'every-other', 'rather-than', 'nothing-but', 'quite-a-few', 'cannot-but', 'on-the-point-of', 'lest', 'might-as-well', 'noun-construction', 'tense-agreement-exception', 'pro-infinitive', 'never-without', 'provided-that', 'those-who', 'causative-passive', 'no-wonder', 'the-very', 'past-perfect-progressive', 'gerund-perfect-passive', 'for-fear-of', 'all-the-comparative', 'anything-but', 'what-is-more', 'as-relative', 'were-to', 'as-concession', 'independent-infinitive', 'result-infinitive', 'wherever-whenever', 'cannot-too', 'of-with-abstract', 'on-ing', 'the-last-to', 'neither-nor', 'would-often', 'number-of', 'even-if-though', 'not-so-much', 'remind-of', 'less-least', 'to-ing', 'trouble-ing', 'by-the-time', 'reported-question', 'future-progressive', 'supposed-to', 'have-get-person', 'why-how-relative', 'if-only', 'happen-to', 'as-well-as', 'group-prep', 'despite', 'prevent-from', 'worth-ing', 'suggest-that', 'hardly-seldom', 'what-is-called', 'gerund-set', 'of-the-two', 'even-only', 'no-more-than', 'so-as-to-degree', 'allow-to', 'every-time', 'appositive-comma', 'whether-concession', 'now-that-once', 'strong-negation', 'participle-idioms', 'be-used-to', 'in-order-to', 'may-well', 'no-sooner', 'the-adjective', 'if-inversion', 'as-long-as', 'it-is-time', 'would-rather', 'without-but-for', 'perfect-participle', 'perfect-infinitive', 'negative-participle', 'as-if', 'no-matter-how', 'superlative-compare', 'appositive-that', 'emphatic-do', 'be-to', 'have-something-done', 'not-until', 'partial-negation', 'gerund-subject', 'formal-object-it', 'tense-agreement', 'relative-nonrestrictive', 'so-that-purpose', 'modal-perfect', 'future-perfect', 'compound-relative', 'with-attendant', 'participle-clause', 'subjunctive-past-perfect', 'it-cleft', 'negative-inversion', 'seem-to', 'the-more', 'stop-remember', 'past-perfect', 'relative-adverb', 'used-to', 'had-better', 'wh-do-you-think', 'it-of-to', 'prep-relative'],
}
export const gradeListed = (id: string) => GRAMMAR_GRADES.some((g) => GRADE_IDS[g].includes(id))
export function gradeOf(id: string): GrammarGrade {
  return GRAMMAR_GRADES.find((g) => GRADE_IDS[g].includes(id)) ?? '中3'
}

// 文法のヒント（まちがいの選択肢を1つ消す）のコイン

// 確認問題の連続正解記録（単元をまたいで続く。まちがえると0にもどる）
export type GrammarStreak = { now: number; best: number }
const STREAK_KEY = 'eitan:grammar-streak'
export function loadGrammarStreak(): GrammarStreak {
  try {
    const v = JSON.parse(localStorage.getItem(STREAK_KEY) ?? 'null') as Partial<GrammarStreak> | null
    const n = (x: unknown) => (typeof x === 'number' && x > 0 ? Math.floor(x) : 0)
    const now = n(v?.now)
    return { now, best: Math.max(now, n(v?.best)) }
  } catch {
    return { now: 0, best: 0 }
  }
}
export function streakAfter(s: GrammarStreak, ok: boolean): GrammarStreak {
  const now = ok ? s.now + 1 : 0
  return { now, best: Math.max(s.best, now) }
}
export function saveGrammarStreak(s: GrammarStreak): void {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(s))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 結果をシェアするための文
export function grammarShareText(unitTitle: string, score: number, total: number): string {
  const mark = score === total ? '👑 全問正解！' : score * 2 >= total ? '👍' : '💪 もう一度がんばる！'
  return `イングリッシュモンスターで文法「${unitTitle}」に挑戦！ ${score} / ${total} 問正解 ${mark}`
}

// お気に入りの単元（★）
const FAV_KEY = 'eitan:grammar-fav'
export function loadGrammarFav(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(FAV_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveGrammarFav(ids: string[]): void {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(ids))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
export const toggleGrammarFav = (ids: string[], id: string) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id])
// ★の単元を先に、あとは元の順番
export const favFirst = <T extends { id: string }>(units: T[], fav: string[]) => [...units.filter((u) => fav.includes(u.id)), ...units.filter((u) => !fav.includes(u.id))]

// 要点カードの「覚えた」単元
const CARDS_KEY = 'eitan:grammar-cards-known'
export function loadCardsKnown(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(CARDS_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveCardsKnown(ids: string[]): void {
  try {
    localStorage.setItem(CARDS_KEY, JSON.stringify(ids))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
export const markKnown = (ids: string[], id: string, known: boolean) => (known ? (ids.includes(id) ? ids : [...ids, id]) : ids.filter((x) => x !== id))

// 単元をはじめて全問正解したときのXP
export const GRAMMAR_CLEAR_XP = 30

// まちがいノート：確認問題でまちがえた問題（問題文で覚える。正解すると消える）
const NOTE_KEY = 'eitan:grammar-notebook'
export const NOTE_MAX = 50
export function loadNotebook(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(NOTE_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function saveNotebook(list: string[]): void {
  try {
    localStorage.setItem(NOTE_KEY, JSON.stringify(list))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
export const noteAfter = (list: string[], sentence: string, ok: boolean): string[] =>
  ok ? list.filter((x) => x !== sentence) : [sentence, ...list.filter((x) => x !== sentence)].slice(0, NOTE_MAX)
// ノートの問題文から問題を取り出す（単元が消えた問題はとばす）
export const notebookQuestions = (list: string[]): GrammarQuestion[] =>
  list.map((t) => GRAMMAR.flatMap((u) => u.questions).find((q) => q.sentence === t)).filter((q): q is GrammarQuestion => !!q)

// 単元のレベル★：全問正解した回数（1回で★1、3回で★2、5回で★3）
const CLEARS_KEY = 'eitan:grammar-clears'
export function loadClears(): Record<string, number> {
  try {
    const v = JSON.parse(localStorage.getItem(CLEARS_KEY) ?? '{}') as unknown
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([, n]) => typeof n === 'number' && n > 0)) as Record<string, number>
  } catch {
    return {}
  }
}
export function saveClears(c: Record<string, number>): void {
  try {
    localStorage.setItem(CLEARS_KEY, JSON.stringify(c))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
export const unitStars = (clears: number) => (clears >= 5 ? 3 : clears >= 3 ? 2 : clears >= 1 ? 1 : 0)

// 単元さがし：タイトル・要点・例文にキーワードがふくまれる単元（大文字小文字は区別しない）
export function searchUnits<T extends GrammarUnit>(units: T[], q: string): T[] {
  const k = q.trim().toLowerCase()
  if (!k) return units
  return units.filter((u) => [u.title, ...u.points, ...u.examples.flatMap((e) => [e.en, e.ja]), ...u.questions.map((x) => x.sentence)].some((t) => t.toLowerCase().includes(k)))
}

// おすすめ単元：★が少ない順（同じなら、まだ全問正解していない・一覧の順）に3つ
export function recommendUnits(units: GrammarUnit[], clears: Record<string, number>, record: GrammarRecord, n = 3): GrammarUnit[] {
  const key = (u: GrammarUnit) => unitStars(clears[u.id] ?? 0) * 2 + (record[u.id] === u.questions.length ? 1 : 0)
  return [...units].sort((a, b) => key(a) - key(b)).slice(0, n)
}

// 全問正解のとき相棒がほめてくれるひとこと（単元ごとに決まる）
export const PRAISE_LINES = ['すごい！ 全問正解だね！', 'カンペキ！ きみは文法マスターだ！', 'やったね！ ぼくもうれしいよ！', 'その調子！ どんどん強くなってる！', 'さすが！ 次の単元もいっしょにがんばろう！']
export const praiseOf = (unitId: string) => PRAISE_LINES[[...unitId].reduce((a, c) => a + c.charCodeAt(0), 0) % PRAISE_LINES.length]
// 全問正解のとき、文法のなかまが英語でもほめる（和訳は PRAISE_LINES と同じ順）
export const PRAISE_EN = ['Amazing! You got them all right!', 'Perfect! You are a grammar master!', 'Yay! I am happy too!', 'Keep it up! You are getting stronger!', "Great job! Let's do the next unit together!"]
export const praiseEnOf = (unitId: string) => PRAISE_EN[[...unitId].reduce((a, c) => a + c.charCodeAt(0), 0) % PRAISE_EN.length]

// 苦手ランキング：まちがいノートに多い単元トップ3
export function weakRanking(list: string[], n = 3): { unit: GrammarUnit; count: number }[] {
  const counts = new Map<GrammarUnit, number>()
  for (const t of list) {
    const u = GRAMMAR.find((x) => x.questions.some((q) => q.sentence === t))
    if (u) counts.set(u, (counts.get(u) ?? 0) + 1)
  }
  return [...counts.entries()].map(([unit, count]) => ({ unit, count })).sort((a, b) => b.count - a.count).slice(0, n)
}

// ディクテーションの答えあわせ：大文字小文字・記号・空白のちがいは気にしない（’ と ' は同じ）
const norm = (t: string) => t.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim()
export const sameSentence = (a: string, b: string) => norm(a) === norm(b)
// 文法のディクテーションの連続正解の自己ベスト
const DICT_BEST_KEY = 'eitan:dict-best-streak'
export function loadDictBest(): number {
  try {
    const v = Number(localStorage.getItem(DICT_BEST_KEY) ?? '0')
    return Number.isFinite(v) ? v : 0
  } catch {
    return 0
  }
}
export function saveDictBest(n: number): void {
  try {
    localStorage.setItem(DICT_BEST_KEY, String(n))
  } catch {
    /* 保存できなくても動く */
  }
}
// ディクテーションの語のボタン：英文を語に分け、前後の記号をとる
export const dictTokens = (en: string) => en.split(/\s+/).map((t) => t.replace(/^[^A-Za-z0-9']+|[^A-Za-z0-9'%°]+$/g, '')).filter(Boolean)

// 文法の連続ボーナス：文法を3日続けるごとに🪙10
export const GRAMMAR_STREAK_DAYS = 3
export const GRAMMAR_STREAK_COINS = 10
export type GrammarDays = { last: string; streak: number }
const DAYS_KEY = 'eitan:grammar-days'
export function loadGrammarDays(): GrammarDays {
  try {
    const v = JSON.parse(localStorage.getItem(DAYS_KEY) ?? 'null') as Partial<GrammarDays> | null
    return { last: typeof v?.last === 'string' ? v.last : '', streak: typeof v?.streak === 'number' && v.streak > 0 ? Math.floor(v.streak) : 0 }
  } catch {
    return { last: '', streak: 0 }
  }
}
export function saveGrammarDays(d: GrammarDays): void {
  try {
    localStorage.setItem(DAYS_KEY, JSON.stringify(d))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
const prevDay = (day: string) => {
  const [y, m, d] = day.split('-').map(Number)
  const t = new Date(y, m - 1, d - 1)
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}
// その日はじめて文法をやったときに呼ぶ。ボーナスの日なら bonus が true
export function studyGrammarDay(d: GrammarDays, today: string): { days: GrammarDays; bonus: boolean } {
  if (d.last === today) return { days: d, bonus: false }
  const streak = d.last === prevDay(today) ? d.streak + 1 : 1
  return { days: { last: today, streak }, bonus: streak % GRAMMAR_STREAK_DAYS === 0 }
}

// 問題がのっている単元（まとめテストなどから解説へもどるため）
export const unitOfQuestion = (q: GrammarQuestion) => GRAMMAR.find((u) => u.questions.includes(q))

// 要点カードの自動読み上げ（めくったら例文を読む）
const AUTO_READ_KEY = 'eitan:cards-auto-read'
export function loadAutoRead(): boolean {
  try {
    return localStorage.getItem(AUTO_READ_KEY) === '1'
  } catch {
    return false
  }
}
export function saveAutoRead(on: boolean): void {
  try {
    localStorage.setItem(AUTO_READ_KEY, on ? '1' : '0')
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 全単元クリア記念：全単元を全問正解すると称号「文法マスター」と🎟3（1回だけ）
export const MASTER_TICKETS = 3
const MASTER_KEY = 'eitan:grammar-master'
export function loadMaster(): boolean {
  try {
    return localStorage.getItem(MASTER_KEY) === '1'
  } catch {
    return false
  }
}
export function saveMaster(): void {
  try {
    localStorage.setItem(MASTER_KEY, '1')
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
export const allCleared = (r: GrammarRecord) => GRAMMAR.every((u) => r[u.id] === u.questions.length)

// きのうの復習：まちがえた日を問題ごとに覚えておき、きのうまちがえた問題を3問出す
const WRONG_DAY_KEY = 'eitan:grammar-wrong-days'
export function loadWrongDays(): Record<string, string> {
  try {
    const v = JSON.parse(localStorage.getItem(WRONG_DAY_KEY) ?? '{}') as unknown
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([, d]) => typeof d === 'string')) as Record<string, string>
  } catch {
    return {}
  }
}
export function markWrongDay(sentence: string, day: string): Record<string, string> {
  const all = { ...loadWrongDays(), [sentence]: day }
  // 古いものはけす（200問まで）
  const kept = Object.fromEntries(Object.entries(all).slice(-200))
  try {
    localStorage.setItem(WRONG_DAY_KEY, JSON.stringify(kept))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return kept
}
export function yesterdayOf(day: string): string {
  const [y, m, d] = day.split('-').map(Number)
  const t = new Date(y, m - 1, d - 1)
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}
export const yesterdayQuestions = (days: Record<string, string>, today: string, n = 3): GrammarQuestion[] =>
  notebookQuestions(Object.entries(days).filter(([, d]) => d === yesterdayOf(today)).map(([t]) => t)).slice(0, n)

// 文法の段位：全問正解した単元の数で決まる
export const DAN_LEVELS = [
  { min: 0, name: '見習い' },
  { min: 10, name: '初段' },
  { min: 30, name: '二段' },
  { min: 60, name: '三段' },
  { min: 90, name: '達人' },
]
export function danOf(cleared: number): { name: string; next: number | null } {
  const i = DAN_LEVELS.reduce((a, d, k) => (cleared >= d.min ? k : a), 0)
  return { name: DAN_LEVELS[i].name, next: DAN_LEVELS[i + 1] ? DAN_LEVELS[i + 1].min - cleared : null }
}

// 学年別のクリア率：学年ごとの全問正解した単元の数と、全部の単元の数
export function gradeClearRates(r: GrammarRecord): { grade: GrammarGrade; cleared: number; total: number }[] {
  return GRAMMAR_GRADES.map((grade) => {
    const us = GRAMMAR.filter((u) => gradeOf(u.id) === grade)
    return { grade, cleared: us.filter((u) => r[u.id] === u.questions.length).length, total: us.length }
  })
}

// 今日のひとこと例文：全単元の例文から日替わりで1つ
const ALL_EXAMPLES = GRAMMAR.flatMap((unit) => unit.examples.map((ex) => ({ ...ex, unit })))
export function dailyExample(day: string) {
  const n = [...day].reduce((a, c) => (a * 37 + c.charCodeAt(0)) % 10007, 7)
  return ALL_EXAMPLES[n % ALL_EXAMPLES.length]
}

// ランダム1問：全単元の確認問題から1問（r は 0〜1 の乱数）
const ALL_QUESTIONS = GRAMMAR.flatMap((u) => u.questions)
export const randomQuestion = (r: number) => ALL_QUESTIONS[Math.min(ALL_QUESTIONS.length - 1, Math.floor(r * ALL_QUESTIONS.length))]

// 次の単元：同じ学年の中で次の単元（学年の最後なら次の学年の最初）。最後の単元や、ふつうの単元でなければ null
const GRADE_ORDER = GRAMMAR_GRADES.flatMap((g) => GRAMMAR.filter((u) => gradeOf(u.id) === g))
export function nextUnit(id: string): GrammarUnit | null {
  const i = GRADE_ORDER.findIndex((u) => u.id === id)
  return i >= 0 && i + 1 < GRADE_ORDER.length ? GRADE_ORDER[i + 1] : null
}

// 時制まとめ表：play を例に、時制ごとの形と例文
export const TENSE_TABLE: { name: string; form: string; en: string; ja: string }[] = [
  { name: '現在', form: '動詞（三単現は -s）', en: 'I play tennis every day.', ja: '私は毎日テニスをする。' },
  { name: '過去', form: '動詞の過去形', en: 'I played tennis yesterday.', ja: '私はきのうテニスをした。' },
  { name: '未来', form: 'will ＋原形／be going to ＋原形', en: 'I will play tennis tomorrow.', ja: '私は明日テニスをするつもりだ。' },
  { name: '現在進行形', form: 'am / is / are ＋ -ing', en: 'I am playing tennis now.', ja: '私は今テニスをしている。' },
  { name: '過去進行形', form: 'was / were ＋ -ing', en: 'I was playing tennis at five.', ja: '私は5時にテニスをしていた。' },
  { name: '現在完了', form: 'have / has ＋過去分詞', en: 'I have played tennis for three years.', ja: '私は3年間テニスをしている。' },
  { name: '過去完了', form: 'had ＋過去分詞', en: 'I had played tennis before I came here.', ja: '私はここに来る前にテニスをしたことがあった。' },
]

// まちがいノートに問題がのっている単元（まちがえたことがある単元）の id
export const weakIdsOf = (note: string[]) => GRAMMAR.filter((u) => u.questions.some((q) => note.includes(q.sentence))).map((u) => u.id)

// 答えあわせで読み上げる正しい英文（空所に正解を入れる）。日本語がまじる問題は null
export function correctSentence(q: GrammarQuestion): string | null {
  const s = q.sentence.replace(/___/, q.choices[q.answer])
  return /[ぁ-んァ-ン一-龥（→]/.test(s) ? null : s
}

// あと少しで全問正解：最高点が「全問 − 1」の単元（最大 n こ）
export const almostUnits = (r: GrammarRecord, n = 3) => GRAMMAR.filter((u) => r[u.id] === u.questions.length - 1).slice(0, n)

// 選択肢を表示する順番（元の番号の並び）。seed で何こずらすかが決まる（答えの位置を覚えないように）
export const choiceOrder = (n: number, seed: number) => Array.from({ length: n }, (_, d) => (d + (((seed * 7) % n) + n)) % n)

// 関連する単元：同じ学年の中で、前と次の単元（最大2つ）
export function relatedUnits(id: string): GrammarUnit[] {
  const g = gradeOf(id)
  const list = GRAMMAR.filter((u) => gradeOf(u.id) === g)
  const i = list.findIndex((u) => u.id === id)
  if (i < 0) return []
  return [list[i - 1], list[i + 1]].filter((u): u is GrammarUnit => !!u)
}

// すぐ練習：まだ全問正解していない単元の問題から n 問（全部クリアずみなら全部から）。r は 0〜1 の乱数
export function quickPractice(record: GrammarRecord, r: () => number, n = 5, grade: GrammarGrade | 'all' = 'all'): GrammarUnit {
  const units = grade === 'all' ? GRAMMAR : GRAMMAR.filter((u) => gradeOf(u.id) === grade)
  const todo = units.filter((u) => record[u.id] !== u.questions.length)
  const pool = (todo.length > 0 ? todo : units).flatMap((u) => u.questions)
  const picked: GrammarQuestion[] = []
  const used = new Set<number>()
  while (picked.length < Math.min(n, pool.length)) {
    let k = Math.floor(r() * pool.length)
    while (used.has(k)) k = (k + 1) % pool.length
    used.add(k)
    picked.push(pool[k])
  }
  return { id: 'quick-practice', title: '✏️ すぐ練習（5問）', points: [], examples: [], questions: picked }
}
