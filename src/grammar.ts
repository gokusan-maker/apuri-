// 中学文法のミニ解説と確認問題（解説・例文・問題はすべて自作）
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
      { sentence: 'I have ___ been to Hokkaido.', choices: ['never', 'yet', 'since'], answer: 0, why: '「一度も〜ない」は never。' },
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
    points: ['動詞の -ing 形は「〜すること」という名詞のはたらきもする。', 'enjoy・finish・stop のあとは -ing 形。前置詞（at, of など）のあとも -ing 形。'],
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
    points: ['「（どこどこに）〜がある・いる」は There is ＋ 1つのもの／There are ＋ 2つ以上のもの。', '過去は There was / There were。'],
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
    points: ['when「〜するとき」、if「もし〜なら」、because「〜なので（理由）」で2つの文をつなぐ。', 'when や if の文では、未来のことでも現在形を使う。'],
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
