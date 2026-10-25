// 入試レベルの文法（共通テスト〜国立医学部）。問題・解説はすべて自作。まちがいの選択肢は文法的に入らないもの
import type { GrammarUnit } from './grammar'

const RAW: GrammarUnit[] = [
  {
    id: 'exam-kyotsu',
    title: '共通テストの文法（時制・関係詞・分詞）',
    points: ['時制は「いつの話か」を表す語（by the time ～ / already）で決める。', '関係副詞 where は「場所＋そこで～」、関係代名詞なら前置詞が必要（in which）。'],
    examples: [
      { en: 'By the time we got to the station, the train had left.', ja: '私たちが駅に着いたときには、電車は出てしまっていた。' },
      { en: 'This is the house where my grandfather grew up.', ja: 'これは祖父が育った家だ。' },
    ],
    questions: [
      { sentence: 'By the time we arrived, the movie ___ already started.', choices: ['had', 'has', 'have', 'having'], answer: 0, why: '過去の時点（arrived）までに完了していたので過去完了 had started。' },
      { sentence: 'I am looking forward to ___ you again.', choices: ['seeing', 'see', 'saw', 'seen'], answer: 0, why: 'look forward to の to は前置詞なので後ろは動名詞 seeing。' },
      { sentence: 'This is the town ___ my father was born.', choices: ['where', 'which', 'what', 'who'], answer: 0, why: 'was born は目的語をとらないので、場所を表す関係副詞 where（= in which）。' },
      { sentence: 'If it ___ tomorrow, we will stay home.', choices: ['rains', 'will rain', 'rained', 'raining'], answer: 0, why: '条件を表す if 節では、未来のことも現在形 rains で表す。' },
      { sentence: 'She made her brother ___ the dishes.', choices: ['wash', 'to wash', 'washed', 'washing'], answer: 0, why: '使役の make ＋人＋動詞の原形。' },
      { sentence: 'Neither Tom nor his sisters ___ coming to the party.', choices: ['are', 'is', 'be', 'being'], answer: 0, why: 'neither A nor B は動詞を B（his sisters＝複数）に合わせて are。' },
      { sentence: 'The book ___ on the desk belongs to Ken.', choices: ['lying', 'lay', 'lain', 'lies'], answer: 0, why: '動詞は belongs。名詞 the book を「机の上にある」とうしろから説明する現在分詞 lying。' },
      { sentence: 'It was so cold ___ the lake froze.', choices: ['that', 'which', 'as', 'what'], answer: 0, why: 'so ～ that … で「とても～なので…」。' },
      { sentence: 'You had better not ___ out tonight.', choices: ['go', 'to go', 'going', 'went'], answer: 0, why: 'had better (not) のあとは動詞の原形。' },
      { sentence: 'He is the tallest ___ the three boys.', choices: ['of', 'in', 'than', 'at'], answer: 0, why: '最上級で「〇人の中で」は of ＋数・複数名詞。' },
    ],
  },
  {
    id: 'exam-shiritsu',
    title: '私立難関大の文法（倒置・仮定法・慣用表現）',
    points: ['否定の語句（Not until / No sooner / Little）が文頭に来ると、うしろは疑問文の語順（倒置）になる。', 'if を使わない仮定法：Had I known ～ / Were I ～ の形。'],
    examples: [
      { en: 'Not until I got home did I notice the mistake.', ja: '家に帰って初めて、私はまちがいに気づいた。' },
      { en: 'Had I left earlier, I would have caught the bus.', ja: 'もっと早く出ていたら、バスに間に合っていただろう。' },
    ],
    questions: [
      { sentence: 'Not until he lost his job ___ how lucky he had been.', choices: ['did he realize', 'he realized', 'he did realize', 'realized he'], answer: 0, why: 'Not until ～ が文頭なので、主節は did he realize の倒置。' },
      { sentence: 'It is high time you ___ to bed.', choices: ['went', 'going', 'gone', 'to go'], answer: 0, why: 'It is (high) time ＋主語＋過去形で「もう～してよいころだ」。' },
      { sentence: 'Had I known about the test, I ___ harder.', choices: ['would have studied', 'will study', 'have studied', 'am studying'], answer: 0, why: 'Had I known（= If I had known）は仮定法過去完了。主節は would have ＋過去分詞。' },
      { sentence: 'The novel is worth ___ twice.', choices: ['reading', 'to read', 'read', 'reads'], answer: 0, why: 'be worth ～ing で「～する価値がある」。' },
      { sentence: 'She is not so much a singer ___ an actress.', choices: ['as', 'than', 'but', 'that'], answer: 0, why: 'not so much A as B で「A というよりむしろ B」。' },
      { sentence: '___ the weather been fine, we would have gone hiking.', choices: ['Had', 'If', 'Has', 'Were'], answer: 0, why: 'If the weather had been fine の if を省いた倒置 Had the weather been。' },
      { sentence: 'No sooner had I sat down ___ the phone rang.', choices: ['than', 'when', 'then', 'as'], answer: 0, why: 'No sooner ～ than … で「～するとすぐに…」。' },
      { sentence: 'I would rather you ___ smoke here.', choices: ["didn't", 'not', "won't", 'not to'], answer: 0, why: 'would rather ＋主語＋過去形（仮定法）で「～してほしい」。' },
      { sentence: 'All you have to do ___ sign your name here.', choices: ['is', 'are', 'be', 'being'], answer: 0, why: '主語は All you have to do（単数あつかい）。All you have to do is (to) ～。' },
      { sentence: 'The problem is ___ to solve than we thought.', choices: ['far more difficult', 'very more difficult', 'much difficult', 'more much difficult'], answer: 0, why: '比較級を強めるのは far / much（very は使えない）。' },
    ],
  },
  {
    id: 'exam-shiritsu-med',
    title: '私立医学部の文法（医療の英文で）',
    points: ['「要求・提案」の that 節（recommend / insist / essential）では動詞は原形（should の省略）。', 'the 比較級, the 比較級 で「～すればするほど…」。'],
    examples: [
      { en: 'The doctor recommended that he rest for a week.', ja: '医師は彼に1週間休むようすすめた。' },
      { en: 'The earlier the disease is found, the easier it is to treat.', ja: '病気は早く見つかるほど治療しやすい。' },
    ],
    questions: [
      { sentence: 'The patient, ___ condition had worsened overnight, was moved to intensive care.', choices: ['whose', 'who', 'which', 'that'], answer: 0, why: '「その患者の容体」なので所有格の関係代名詞 whose。' },
      { sentence: 'The new drug is said ___ fewer side effects than the old one.', choices: ['to have', 'having', 'that it has', 'has'], answer: 0, why: 'S is said to ～ で「S は～だと言われている」。' },
      { sentence: '___ properly, this vaccine can be stored for six months.', choices: ['Kept', 'Keep', 'To keeping', 'Keeps'], answer: 0, why: 'ワクチンは「保管される」側なので過去分詞の分詞構文 Kept（= If it is kept）。' },
      { sentence: 'Doctors recommend that every child ___ vaccinated before entering school.', choices: ['be', 'to be', 'being', 'been'], answer: 0, why: 'recommend that ～ の中は動詞の原形（should be の should の省略）。' },
      { sentence: 'The more you exercise, ___ your heart becomes.', choices: ['the stronger', 'stronger', 'the strong', 'more strong'], answer: 0, why: 'the 比較級, the 比較級 の形。' },
      { sentence: 'It was not until the 19th century ___ doctors began to wash their hands before surgery.', choices: ['that', 'when', 'which', 'what'], answer: 0, why: 'It was not until ～ that … で「～になって初めて…」（強調構文）。' },
      { sentence: 'Without regular sleep, our ability to concentrate ___ decline.', choices: ['would', 'will to', 'would to', 'is'], answer: 0, why: 'Without ～ が「もし～がなければ」の仮定。助動詞のあとは原形 decline。' },
      { sentence: 'The doctor, along with two nurses, ___ visiting the village next week.', choices: ['is', 'are', 'be', 'being'], answer: 0, why: 'along with ～ は主語に入らない。主語は the doctor（単数）なので is。' },
      { sentence: 'Hardly ___ the ambulance arrived when the patient stopped breathing.', choices: ['had', 'has', 'did', 'was'], answer: 0, why: 'Hardly had S 過去分詞 when … で「～するとすぐに…」。' },
      { sentence: 'Blood pressure tends to rise ___ people get older.', choices: ['as', 'while that', 'during', 'since that'], answer: 0, why: '「～するにつれて」は接続詞 as。during は前置詞なので文は続けられない。' },
    ],
  },
  {
    id: 'exam-kokkoritsu',
    title: '国公立大の文法（関係詞・準動詞・倒置）',
    points: ['The reason that S V … の that は関係代名詞（gave の目的語がない）。why は文が完全なときだけ。', 'deny / avoid / mind などは目的語に動名詞をとる。'],
    examples: [
      { en: 'Little did I expect to meet him there.', ja: 'まさかそこで彼に会うとは思わなかった。' },
      { en: 'She denied having seen the letter.', ja: '彼女はその手紙を見たことを否定した。' },
    ],
    questions: [
      { sentence: 'The reason ___ he gave for being late was not convincing.', choices: ['that', 'why', 'because', 'for'], answer: 0, why: 'gave の目的語が欠けているので関係代名詞 that（関係副詞 why は使えない）。' },
      { sentence: 'There is no point ___ about the past.', choices: ['in worrying', 'to worry', 'worrying of', 'for worry'], answer: 0, why: 'There is no point (in) ～ing で「～してもむだだ」。' },
      { sentence: 'She was seen ___ the building at midnight.', choices: ['to enter', 'enter', 'entered', 'enters'], answer: 0, why: 'see O do の受け身は be seen to do（to が必要）。' },
      { sentence: 'It goes without ___ that health is more important than wealth.', choices: ['saying', 'say', 'to say', 'said'], answer: 0, why: 'It goes without saying that ～ で「～は言うまでもない」。' },
      { sentence: '___ I to win the lottery, I would travel around the world.', choices: ['Were', 'Was', 'Am', 'If'], answer: 0, why: 'If I were to ～ の if を省いた倒置 Were I to ～。' },
      { sentence: 'The number of students who study abroad ___ increasing.', choices: ['is', 'are', 'be', 'have'], answer: 0, why: 'the number of ～（～の数）は単数あつかいなので is。' },
      { sentence: 'He denied ___ the window.', choices: ['having broken', 'to have broken', 'to break', 'broke'], answer: 0, why: 'deny は動名詞を目的語にとる。割ったのは否定より前なので完了形 having broken。' },
      { sentence: 'This is the same watch ___ I lost last year.', choices: ['that', 'what', 'whom', 'whose'], answer: 0, why: 'the same ～ that … で「…と同じ～」。lost の目的語が欠けているので関係代名詞 that。' },
      { sentence: 'Little ___ that his decision would change the company forever.', choices: ['did he know', 'he knew', 'he did know', 'knew he'], answer: 0, why: '否定の Little が文頭なので疑問文の語順 did he know。' },
      { sentence: 'Seldom ___ such a beautiful sunset.', choices: ['have I seen', 'I have seen', 'I saw', 'saw I'], answer: 0, why: '否定の Seldom が文頭なので倒置 have I seen。' },
    ],
  },
  {
    id: 'exam-kyutei',
    title: '旧帝大の文法（倒置・強調・同格）',
    points: ['Such is ～ that … / So ＋副詞 ＋ 助動詞 ＋ S … で強調の倒置。', '同格の that：the idea that S V（「～という考え」）。うしろは完全な文。'],
    examples: [
      { en: 'Such was his anger that he could not speak.', ja: '彼の怒りはあまりに大きく、口もきけなかった。' },
      { en: 'The fact that she lied surprised everyone.', ja: '彼女がうそをついたという事実はみんなを驚かせた。' },
    ],
    questions: [
      { sentence: 'Such ___ his influence that no one dared to disagree.', choices: ['was', 'did', 'had', 'being'], answer: 0, why: 'His influence was such that ～ の倒置 Such was his influence that ～。' },
      { sentence: 'It is not what you say ___ how you say it that matters.', choices: ['but', 'and', 'or', 'than'], answer: 0, why: 'not A but B を It is ～ that の強調構文に入れた形。' },
      { sentence: 'The data, ___ carefully, may reveal a different pattern.', choices: ['examined', 'examining', 'examine', 'to examining'], answer: 0, why: 'データは「調べられる」側なので過去分詞 examined（if they are examined carefully）。' },
      { sentence: '___ it not been for her advice, I would have failed.', choices: ['Had', 'If', 'Were', 'Has'], answer: 0, why: 'If it had not been for ～ の倒置 Had it not been for ～（～がなかったら）。' },
      { sentence: 'Only when the experiment was repeated ___ the error.', choices: ['did they notice', 'they noticed', 'they did notice', 'noticed they'], answer: 0, why: 'Only when ～ が文頭なので主節は倒置 did they notice。' },
      { sentence: 'He is the last person ___ a lie.', choices: ['to tell', 'telling', 'tells', 'told'], answer: 0, why: 'the last person to do で「最も～しそうにない人」。' },
      { sentence: 'However hard you ___, you cannot finish it in a day.', choices: ['may try', 'may trying', 'tried to', 'trying'], answer: 0, why: 'However ＋副詞 ＋ S (may) V で「どんなに～しても」。' },
      { sentence: 'The idea ___ the earth goes around the sun was once considered dangerous.', choices: ['that', 'which', 'what', 'of'], answer: 0, why: 'うしろが完全な文なので同格の that（「～という考え」）。' },
      { sentence: 'So rapidly ___ the city grown that the old maps are useless.', choices: ['has', 'is', 'did', 'does'], answer: 0, why: 'The city has grown so rapidly that ～ の倒置。grown に合うのは has。' },
      { sentence: 'I object ___ treated like a child.', choices: ['to being', 'to be', 'being', 'for being'], answer: 0, why: 'object to ～ing の to は前置詞。受け身の動名詞 being treated。' },
    ],
  },
  {
    id: 'exam-kokuritsu-med',
    title: '国立医学部の文法（医療・研究の英文で）',
    points: ['if left untreated（治療しないでおくと）のように、if ＋過去分詞で主語と be 動詞を省ける。', '否定の語句（Not only / Under no circumstances）が文頭だと倒置。'],
    examples: [
      { en: 'If left untreated, the infection can spread.', ja: '治療しないでおくと、感染は広がるおそれがある。' },
      { en: 'Not only does exercise strengthen muscles, but it also improves mood.', ja: '運動は筋肉を強くするだけでなく、気分もよくする。' },
    ],
    questions: [
      { sentence: 'The symptoms, ___ left untreated, can lead to serious complications.', choices: ['if', 'unless that', 'despite', 'so that'], answer: 0, why: 'if (they are) left untreated で「治療しないでおくと」。despite は前置詞、so that のあとは文が必要。' },
      { sentence: 'Not only ___ the treatment reduce pain, but it also shortens recovery time.', choices: ['does', 'is', 'has', 'do'], answer: 0, why: 'Not only が文頭なので倒置。一般動詞 reduce なので does the treatment reduce。' },
      { sentence: 'The number of cells ___ by the virus doubled within a day.', choices: ['infected', 'infecting', 'infect', 'to infect'], answer: 0, why: '細胞は「ウイルスに感染させられる」側（by the virus）なので過去分詞 infected。' },
      { sentence: '___ the risks involved, the surgeons decided to operate.', choices: ['Despite', 'Although', 'Even though', 'In spite'], answer: 0, why: 'うしろは名詞句（the risks involved）なので前置詞 despite。although は接続詞、in spite には of が必要。' },
      { sentence: 'It is essential that the patient ___ the medicine at the same time every day.', choices: ['take', 'takes to', 'taking', 'to take'], answer: 0, why: 'It is essential that ～ の中は動詞の原形（should の省略）。' },
      { sentence: 'Were the heart ___ beating, the brain would be damaged within minutes.', choices: ['to stop', 'stop', 'stops', 'to stopping'], answer: 0, why: 'If the heart were to stop の倒置 Were the heart to stop。' },
      { sentence: 'The researchers attribute the improvement ___ a change in diet.', choices: ['to', 'for', 'with', 'by'], answer: 0, why: 'attribute A to B で「A を B のせいにする・B に帰する」。' },
      { sentence: 'What the study shows ___ that sleep affects memory.', choices: ['is', 'are', 'being', 'be'], answer: 0, why: '主語は What the study shows（名詞節は単数あつかい）なので is。' },
      { sentence: 'Patients ___ blood type is O can donate to anyone.', choices: ['whose', 'who', 'which', 'that'], answer: 0, why: '「その患者の血液型」なので所有格の関係代名詞 whose。' },
      { sentence: 'Under no circumstances ___ this drug be given to children.', choices: ['should', 'it should', 'does', 'is'], answer: 0, why: '否定の Under no circumstances が文頭なので倒置 should this drug be given。' },
    ],
  },
]

// 正解の位置がかたよらないよう、問題ごとに選択肢をずらす（正解は書いた順のいちばん前）
export const EXAM_GRAMMAR: GrammarUnit[] = RAW.map((u) => ({
  ...u,
  questions: u.questions.map((q, i) => {
    const k = (i * 3 + 1) % q.choices.length
    const choices = [...q.choices.slice(k), ...q.choices.slice(0, k)]
    return { ...q, choices, answer: choices.indexOf(q.choices[q.answer]) }
  }),
}))
