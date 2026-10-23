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
      { sentence: 'She looked at ___ in the mirror.', choices: ['her', 'herself', 'she'], answer: 1, why: '主語と同じ人（自分自身）を見るので herself。' },
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
      { sentence: 'If you hurry, you ___ catch the bus.', choices: ['can', 'could', 'were'], answer: 0, why: '「急げばバスに間に合う」は can。' },
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
    points: ['each と every のあとは単数形の名詞で、動詞も3人称単数（Every student has ～）。', 'all のあとは複数形の名詞（all students）。'],
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
      { sentence: 'This is one of the ___ books in the library.', choices: ['old', 'older', 'oldest'], answer: 2, why: 'one of the ＋最上級。' },
      { sentence: 'She is one of the best ___ in our class.', choices: ['singer', 'singers', 'singing'], answer: 1, why: 'one of the 〜 のあとの名詞は複数形。' },
      { sentence: 'Soccer is one of the ___ popular sports in the world.', choices: ['more', 'most', 'much'], answer: 1, why: 'popular の最上級は most popular。' },
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
    points: ['make ＋人＋原形「（むりやり）〜させる」、let ＋人＋原形「（自由に）〜させてあげる」、help ＋人＋原形「人が〜するのを手伝う」。', '人のあとの動詞は to をつけない原形。'],
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
      { sentence: 'I had ___ to eat this morning.', choices: ['nothing', 'anything', 'something'], answer: 0, why: '「何も食べるものがなかった」は had nothing to eat（not がないので nothing）。' },
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
      { sentence: 'Do you have ___ pets?', choices: ['some', 'any', 'a'], answer: 1, why: 'ふつうの疑問文なので any。' },
      { sentence: 'Would you like ___ cookies?', choices: ['some', 'any', 'many'], answer: 0, why: '人にすすめる疑問文なので some。' },
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
      { sentence: 'Please show me ___ you bought.', choices: ['which', 'that', 'what'], answer: 2, why: '前に名詞がなく「買ったもの」なので what。' },
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
      { sentence: 'While my mother ___ dinner, I set the table.', choices: ['was cooking', 'cooks', 'cook'], answer: 0, why: '過去の「〜している間」なので過去進行形 was cooking。' },
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
      { sentence: 'Have you eaten lunch ___?', choices: ['already', 'just', 'yet'], answer: 2, why: '疑問文の「もう」は文の最後に yet。' },
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
      { sentence: 'The girl ___ glasses is my sister.', choices: ['in', 'with', 'by'], answer: 1, why: '「メガネをかけた」は with glasses。' },
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
      { sentence: 'Which do you like ___, cats or dogs?', choices: ['best', 'better', 'well'], answer: 1, why: '2つをくらべるので better。' },
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
      { sentence: '___ notebook is this? — It is Yumi\'s.', choices: ['Whose', 'Who', 'Which'], answer: 0, why: '「だれの」は Whose ＋名詞。' },
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
      { sentence: 'The shop is open between 10 a.m. ___ 8 p.m.', choices: ['or', 'to', 'and'], answer: 2, why: 'between A and B の形。' },
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
      { sentence: 'Yesterday I ___ to clean my room.', choices: ['have', 'had', 'has'], answer: 1, why: '過去の「〜しなければならなかった」は had to。' },
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
      { sentence: '___ quiet in the library.', choices: ['Be', 'Are', 'Do'], answer: 0, why: '形容詞（quiet）の命令文は Be ＋形容詞。' },
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
      { sentence: 'He went to bed ___ he finished the book.', choices: ['before', 'after', 'until'], answer: 1, why: '「本を読み終えたあとで」なので after。' },
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
      { sentence: 'Do you want rice ___ bread?', choices: ['and', 'or', 'so'], answer: 1, why: '「ご飯かパンか」どちらかなので or。' },
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
      { sentence: 'His idea is different ___ mine.', choices: ['from', 'to', 'at'], answer: 0, why: 'be different from 〜 で「〜とちがう」。' },
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
      { sentence: 'They came here ___ car.', choices: ['by', 'with', 'in a'], answer: 0, why: '乗り物の手段は by ＋名詞（a をつけない）。' },
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
      { sentence: 'How about ___ lunch together?', choices: ['have', 'having', 'to have'], answer: 1, why: 'How about のあとは -ing 形。' },
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
    points: ['want・hope・decide・plan のあとは to ＋動詞の原形（want to go）。enjoy・finish・stop のあとは -ing（enjoy swimming）。', 'like・love・start・begin のあとは to も -ing もどちらも使える（start to run / start running）。'],
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
    points: ['be able to ＋動詞の原形 で「〜することができる」（can とほぼ同じ意味）。', 'will のあとでは can を使えないので will be able to 〜 にする。過去の「できた」は could または was / were able to。'],
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
      { sentence: 'I wrote it down so that I ___ forget it.', choices: ["wouldn't", "didn't", "don't"], answer: 0, why: '過去の文の目的なので would の否定 wouldn\'t「忘れないように」。' },
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
      { sentence: 'I remember my mother ___ me this song.', choices: ['singing', 'sang', 'to sing'], answer: 0, why: 'remember ＋ 人 ＋ -ing「人が〜したことを覚えている」。' },
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
      { sentence: 'He is only a student, but he acts as if he ___ the boss.', choices: ['were', 'is being', 'be'], answer: 0, why: '本当はちがうことの想像なので、as if のあとは were。' },
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
      { sentence: 'This chair is made ___ wood.', choices: ['of', 'from', 'by'], answer: 0, why: '材料（木）が見てわかるので made of。' },
      { sentence: 'His name is known ___ everyone in the town.', choices: ['to', 'by', 'for'], answer: 0, why: 'be known to 〜「〜に知られている」。' },
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
      { sentence: 'As ___ as 2,000 people joined the marathon.', choices: ['many', 'much', 'more'], answer: 0, why: '人の数（数えられる）なので as many as。' },
      { sentence: 'The test took no ___ than ten minutes. It was very short.', choices: ['more', 'less', 'many'], answer: 0, why: '「たった10分」（少ないと感じる）は no more than。' },
      { sentence: 'He read no ___ than fifty books this summer. Amazing!', choices: ['less', 'more', 'fewer'], answer: 0, why: '「50冊も」（多いと感じる）は no less than。' },
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
      { sentence: '___ my little brother knows that word.', choices: ['Even', 'Ever', 'Only if'], answer: 0, why: '「弟でさえ知っている」なので even を強めたい語（my little brother）の前に。' },
      { sentence: 'I ___ ate one cookie. I was not hungry.', choices: ['only', 'even', 'ever'], answer: 0, why: '「1枚だけ食べた」なので only。一般動詞の前に置く。' },
      { sentence: 'The train left ___ now.', choices: ['just', 'only', 'even'], answer: 0, why: 'just now「たった今」。' },
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
  return GRAMMAR[n % GRAMMAR.length]
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
  中1: ['verb-prep', 'how-many-much', 'make-do', 'it-weather', 'take-uses', 'a-piece-of', 'time-no-prep', 'short-answer', 'by-with', 'and-but-or-so', 'be-imperative', 'whose-which', 'how-adj', 'possessive', 'be', 'third', 'past', 'progressive', 'imperative', 'wh', 'pronoun', 'preposition', 'countable', 'frequency', 'adverb', 'there'],
  中2: ['during-for', 'take-idioms', 'one-it', 'thing-adjective', 'be-able-to', 'say-tell', 'so-do-i', 'to-or-ing', 'would-like', 'another-other', 'same-different', 'phrasal-look', 'get-uses', 'adj-order', 'help-do', 'ago-before', 'because-of', 'number-expr', 'how-about', 'call-ab', 'adj-prep', 'after-before', 'look-adj', 'have-to', 'may-might', 'between-among', 'both-either', 'good-better', 'few-little', 'prep-gerund', 'prep-phrase', 'shall', 'to-adjective', 'by-until', 'past-progressive', 'future', 'compare', 'as-as', 'one-of-the', 'infinitive', 'gerund', 'want-to', 'conjunction', 'svoo-svoc', 'if-present', 'modal', 'polite-request', 'feeling-to', 'too-also-either', 'each-every', 'passive', 'passive-q-neg', 'gerund-idioms', 'that-clause', 'reflexive', 'some-any'],
  中3: ['get-done', 'each-other', 'tag-imperative', 'fractions', 'adj-that', 'think-so', 'passive-prep', 'it-is-said', 'still-anymore', 'find-leave-oc', 'unless', 'passive-progressive-perfect', 'compare-emphasis', 'keep-ing', 'spend-ing', 'so-such', 'ing-two', 'relative-that', 'not-to', 'as-soon-as', 'perfect-done', 'times-as', 'while', 'whose', 'relative-what', 'perfect', 'perfect-experience', 'for-since', 'perfect-progressive', 'relative', 'relative-omit', 'participle', 'indirect', 'wh-to', 'it-for-to', 'subjunctive', 'so-that', 'too-enough', 'what-a', 'tag-exclaim', 'tag-q', 'causative', 'if-whether', 'it-takes', 'imperative-and-or', 'nobody-nothing', 'though', 'not-only', 'emotion-participle', 'perception'],
  高校: ['even-only', 'no-more-than', 'so-as-to-degree', 'allow-to', 'every-time', 'appositive-comma', 'whether-concession', 'now-that-once', 'strong-negation', 'participle-idioms', 'be-used-to', 'in-order-to', 'may-well', 'no-sooner', 'the-adjective', 'if-inversion', 'as-long-as', 'it-is-time', 'would-rather', 'without-but-for', 'perfect-participle', 'perfect-infinitive', 'negative-participle', 'as-if', 'no-matter-how', 'superlative-compare', 'appositive-that', 'emphatic-do', 'be-to', 'have-something-done', 'not-until', 'partial-negation', 'gerund-subject', 'formal-object-it', 'tense-agreement', 'relative-nonrestrictive', 'so-that-purpose', 'modal-perfect', 'future-perfect', 'compound-relative', 'with-attendant', 'participle-clause', 'subjunctive-past-perfect', 'it-cleft', 'negative-inversion', 'seem-to', 'the-more', 'stop-remember', 'past-perfect', 'relative-adverb', 'used-to', 'had-better', 'wh-do-you-think', 'it-of-to', 'prep-relative'],
}
export const gradeListed = (id: string) => GRAMMAR_GRADES.some((g) => GRADE_IDS[g].includes(id))
export function gradeOf(id: string): GrammarGrade {
  return GRAMMAR_GRADES.find((g) => GRADE_IDS[g].includes(id)) ?? '中3'
}

// 文法のヒント（まちがいの選択肢を1つ消す）のコイン
export const GRAMMAR_HINT_COST = 5

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
