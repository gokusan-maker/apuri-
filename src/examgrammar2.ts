// 文法のレベル（京大・東大・TOEIC・TOEFL/IELTS・ネイティブ）。問題・解説はすべて自作。まちがいの選択肢は文法的に入らないもの
import type { GrammarUnit } from './grammar'

const q = (sentence: string, choices: string[], why: string) => ({ sentence, choices, answer: 0, why })

const RAW: GrammarUnit[] = [
  {
    id: 'exam-kyodai',
    title: '京大の文法（精読：同格・倒置・関係詞の発展）',
    points: ['京大は和訳が中心。what のかたまり・同格の that・倒置など、文の骨組みを見ぬく文法が問われる。', '無生物主語（The rain prevented us from ～）は「～のせいで…できない」と訳す。'],
    examples: [
      { en: 'What little money he had was spent on books.', ja: '彼はわずかなお金を、すべて本に使った。' },
      { en: 'So absorbed was he in the book that he did not hear the bell.', ja: '彼は本にとても夢中だったので、ベルが聞こえなかった。' },
    ],
    questions: [
      q('What little money he had ___ spent on books.', ['was', 'were', 'been', 'being'], 'what little money he had（彼がもっていたわずかなお金のすべて）が主語で単数なので was。been・being だけでは動詞にならない。'),
      q('The reason ___ he gave for being late sounded strange.', ['that', 'why', 'where', 'what'], 'gave の目的語が欠けているので目的格の関係代名詞 that。why・where は欠けた目的語をおぎなえず、what は先行詞をとらない。'),
      q('He is not ___ he was ten years ago.', ['what', 'that', 'which', 'who'], 'what he was で「昔の彼」。先行詞がないので that・which・who は入らない。'),
      q('Had it not been for your advice, I ___ failed.', ['would have', 'would', 'will', 'having'], 'If it had not been for の倒置。過去の反対なので would have ＋過去分詞。'),
      q('The news ___ she had won the prize spread quickly.', ['that', 'which', 'what', 'whose'], 'うしろが欠けたところのない文なので、同格の that（～という知らせ）。'),
      q('This medicine will make you ___ better.', ['feel', 'to feel', 'feeling', 'felt'], '無生物主語＋使役の make 人 原形「この薬で気分がよくなる」。'),
      q('The heavy rain prevented us ___ going out.', ['from', 'to', 'of', 'against'], 'prevent A from ～ing で「A が～するのをさまたげる」。'),
      q('It is not until we lose our health ___ we realize its value.', ['that', 'when', 'which', 'what'], 'It is not until ～ that … の強調構文「～してはじめて…する」。'),
      q('Seldom ___ such a beautiful sunset.', ['have I seen', 'I have seen', 'I seen', 'seen I have'], '否定の副詞 Seldom が文頭に出ると、うしろは疑問文の語順（have I seen）。'),
      q('So absorbed ___ in the book that he didn\'t hear the bell.', ['was he', 'he was', 'he', 'did he'], 'So ＋形容詞が文頭に出た倒置で was he。absorbed は形容詞なので did he は使えない。'),
      q('There is no rule ___ has some exceptions.', ['but', 'what', 'whom', 'whose'], 'no ～ but … で「…しない～はない」（but＝that … not）。what・whom・whose は主語にならない。'),
      q('The house, ___ roof was damaged in the storm, has been repaired.', ['whose', 'which', 'that', 'its'], '「その家の屋根が」なので所有格の関係代名詞 whose。コンマのあとに that は使えない。'),
      q('He talks as if he ___ everything about the city.', ['knew', 'known', 'knowing', 'to know'], 'as if のあとは仮定法過去 knew（実際は知らないのに）。'),
      q('The more I learned about her, ___ I liked her.', ['the more', 'more', 'the most', 'most'], 'The 比較級 ～, the 比較級 … で「～すればするほど…」。'),
      q('Nothing is ___ precious than time.', ['more', 'most', 'much', 'very'], 'Nothing is 比較級 than ～ で「～ほど…なものはない」。than があるので比較級 more。'),
    ],
  },
  {
    id: 'exam-todai',
    title: '東大の文法（要約・英作文：時制の一致・譲歩・強調）',
    points: ['東大は要約と英作文が中心。時制の一致・譲歩（however / whatever）・強調構文を正しく書けることが大切。', '比較（twice as ～ as）や that of のくり返しの代名詞にも注意。'],
    examples: [
      { en: 'However hard you try, you cannot finish it in a day.', ja: 'どんなにがんばっても、1日では終わらない。' },
      { en: 'The population of Tokyo is larger than that of Osaka.', ja: '東京の人口は大阪の人口より多い。' },
    ],
    questions: [
      q('She said that she ___ to Paris the year before.', ['had been', 'has been', 'have been', 'being'], '過去（said）より前のこと（the year before）なので過去完了 had been。'),
      q('___ hard you try, you can\'t finish it in a day.', ['However', 'Whatever', 'Whenever', 'Although'], 'However ＋形容詞・副詞 ＋ S V で「どんなに～しても」。'),
      q('It was not the price but the design ___ attracted me.', ['that', 'what', 'where', 'when'], 'It was ～ that … の強調構文。強調されているのは not the price but the design。'),
      q('___ the weather, the event will be held as planned.', ['Whatever', 'However', 'Whoever', 'Wherever'], 'Whatever the weather (is) で「天気がどうであれ」。'),
      q('It is high time we ___ home.', ['went', 'go', 'going', 'to go'], 'It is (high) time ＋仮定法過去 で「もう～してもいいころだ」。'),
      q('No sooner had he arrived ___ it began to rain.', ['than', 'then', 'that', 'as'], 'No sooner A than B で「A するとすぐに B」。'),
      q('This room is twice as large ___ that one.', ['as', 'than', 'so', 'of'], '倍数 ＋ as ～ as で「…の2倍～」。'),
      q('Not a single word ___ he say during the meeting.', ['did', 'was', 'had', 'is'], '否定語（Not a single word）が文頭に出た倒置。say は原形なので did。'),
      q('The population of Tokyo is larger than ___ of Osaka.', ['that', 'this', 'it', 'one'], 'くり返しをさける the population の代わりは that（of 句が続く）。population は数えられないので one は使えない。'),
      q('He denied ___ the window.', ['having broken', 'to have broken', 'to break', 'broke'], 'deny は動名詞を目的語にとる。過去のことなので完了形の動名詞 having broken。'),
      q('Whether you like it ___ not, you have to go.', ['or', 'nor', 'and', 'but'], 'whether A or not で「A であろうとなかろうと」。'),
      q('She is the last person ___ would tell a lie.', ['who', 'whom', 'which', 'whose'], 'the last person who … で「最も…しそうにない人」。would tell の主語になる who。'),
      q('All you have to do ___ wait here.', ['is', 'are', 'were', 'being'], 'All you have to do（あなたがしなければならないすべて）は単数あつかいで is (to) wait。'),
      q('What do you think ___ in this box?', ['is', 'it is', 'is it', 'that is'], 'do you think が間に入った疑問文。What が主語なので What … is in this box。'),
      q('Little ___ that he would become a famous writer.', ['did he dream', 'he dreamed', 'he did dream', 'dreamed he'], '否定の副詞 Little が文頭に出ると疑問文の語順（did he dream）。'),
    ],
  },
  {
    id: 'exam-toeic',
    title: 'TOEICの文法（ビジネスの英文で：品詞・時制・前置詞）',
    points: ['TOEIC の文法問題（Part 5）は品詞・動詞の形・前置詞と接続詞の区別が中心。', 'Despite（前置詞）＋名詞、Although（接続詞）＋文 のように、うしろの形で選ぶ。'],
    examples: [
      { en: 'Please submit the report by Friday.', ja: '金曜日までに報告書を提出してください。' },
      { en: 'Despite the bad weather, the flight left on time.', ja: '悪天候にもかかわらず、飛行機は時間どおりに出発した。' },
    ],
    questions: [
      q('Please submit the report ___ Friday.', ['by', 'since', 'during', 'among'], '「～までに」とし切りを表すのは by。'),
      q('The meeting has been ___ until next week.', ['postponed', 'postpone', 'postponing', 'postpones'], 'has been ＋過去分詞の受け身「延期された」。'),
      q('All employees are required ___ the training session.', ['to attend', 'attending', 'attend', 'attended'], 'be required to do で「～することを求められる」。'),
      q('Ms. Lee is ___ for the new marketing project.', ['responsible', 'responsibility', 'responsibly', 'respond'], 'be 動詞のあとで「責任がある」と主語を説明するのは形容詞 responsible。'),
      q('We look forward to ___ with you.', ['working', 'work', 'worked', 'be working'], 'look forward to の to は前置詞なので動名詞 working。'),
      q('The new policy will take effect ___ April 1.', ['on', 'in', 'at', 'for the'], '特定の日付の前は on。'),
      q('The price includes ___ shipping and handling.', ['both', 'either', 'neither', 'each'], 'both A and B で「A と B の両方」。either は or、neither は nor と組む。'),
      q('If you have any questions, please do not hesitate ___ us.', ['to contact', 'contacting', 'contact', 'contacted'], 'hesitate to do で「～するのをためらう」。'),
      q('The documents ___ you requested are attached.', ['that', 'what', 'whose', 'who'], 'requested の目的語が欠けているので関係代名詞 that。what は先行詞をとらない。'),
      q('Our office will be closed ___ the holidays.', ['during', 'while', 'until when', 'since'], '「休暇のあいだ」と名詞が続くので前置詞 during。while は接続詞なのでうしろに文が必要。'),
      q('The manager asked that the report ___ revised.', ['be', 'being', 'to be', 'been'], '要求を表す ask that のあとは（should ＋）原形 be。'),
      q('___ the bad weather, the flight left on time.', ['Despite', 'Although', 'Because', 'Even'], 'うしろが名詞（the bad weather）なので前置詞 Despite。Although・Because は接続詞。'),
      q('This product is ___ more expensive than that one.', ['much', 'very', 'more', 'most'], '比較級を強めるのは much。very は比較級を強められない。'),
      q('Each of the participants ___ a certificate.', ['receives', 'receive', 'receiving', 'have received'], 'Each of ～ は単数あつかいなので receives。'),
      q('Sales have increased ___ the new product was launched.', ['since', 'for', 'during', 'from'], 'うしろに文が続き「～して以来」なので接続詞 since。for・during・from は前置詞。'),
    ],
  },
  {
    id: 'exam-toefl',
    title: 'TOEFL・IELTSの文法（アカデミックな英文で）',
    points: ['留学の試験は、学術的な英文を正確に読み書きする文法が大切。主語と動詞の一致・関係詞・分詞が多い。', 'The number of ～ is（数は）／A number of ～ are（たくさんの）のような一致に注意。'],
    examples: [
      { en: 'The results suggest that sleep improves memory.', ja: '結果は、睡眠が記憶をよくすることを示している。' },
      { en: 'Plants convert sunlight into energy, which allows them to grow.', ja: '植物は日光をエネルギーに変え、それによって成長できる。' },
    ],
    questions: [
      q('The results ___ that sleep improves memory.', ['suggest', 'suggests', 'suggesting', 'to suggest'], '主語 The results は複数なので suggest。'),
      q('Water is composed ___ hydrogen and oxygen.', ['of', 'in', 'at', 'for'], 'be composed of ～ で「～からできている」。'),
      q('The theory, ___ was proposed in 1905, changed physics.', ['which', 'that', 'what', 'who'], 'コンマのある非制限用法なので which。that はコンマのあとに使えない。'),
      q('___ by scientists for decades, the disease remains a mystery.', ['Studied', 'Studying', 'Study', 'To study'], '病気は「研究される」側なので過去分詞で始まる分詞構文 Studied。'),
      q('Not until the 19th century ___ the cause of the disease discovered.', ['was', 'did', 'had', 'it was'], 'Not until が文頭に出た倒置。受け身（was discovered）なので was が前に出る。'),
      q('The number of species ___ declining rapidly.', ['is', 'are', 'be', 'were'], 'The number of ～（～の数）は単数あつかいで is。'),
      q('Plants convert sunlight into energy, ___ allows them to grow.', ['which', 'that', 'what', 'it'], '前の内容全体を受ける非制限用法の which。it ではコンマで2つの文をつなげない。'),
      q('The data ___ in this study came from three countries.', ['used', 'using', 'uses', 'to using'], 'data は「使われる」側なので過去分詞 used がうしろから説明する。'),
      q('Unlike mammals, reptiles cannot keep ___ bodies warm.', ['their', 'its', 'them', 'they'], '主語 reptiles（複数）の「からだ」なので their。'),
      q('It is estimated ___ the ice will melt by 2100.', ['that', 'what', 'which', 'whether it'], 'It is estimated that ～ で「～と見積もられている」。'),
      q('The experiment was repeated ___ the results were reliable.', ['so that', 'so as', 'in order', 'because of'], 'うしろに文が続き「～するように」なので so that。so as・in order は to 不定詞と、because of は名詞と使う。'),
      q('Neither of the two methods ___ perfect.', ['is', 'are being', 'be', 'were being'], 'Neither of ～ はふつう単数あつかいで is。'),
      q('Bees play a key role ___ pollinating crops.', ['in', 'to', 'at', 'on'], 'play a role in ～ で「～において役割を果たす」。'),
      q('The more complex a system becomes, ___ it is to control.', ['the harder', 'harder', 'the hardest', 'hardest'], 'The 比較級 ～, the 比較級 … で「複雑になるほど制御はむずかしい」。'),
      q('Such a theory is difficult ___.', ['to prove', 'proving', 'prove', 'proved it'], '難易を表す形容詞 difficult ＋ to do で「証明するのがむずかしい」。'),
    ],
  },
  {
    id: 'exam-native',
    title: 'ネイティブの文法（会話でよく使う形）',
    points: ['会話では I\'d rather / had better / I wish / tag question（～, isn\'t it?）などが自然に使われる。', '短い言い方でも、動詞の形（原形・-ing・過去形）の決まりは同じ。'],
    examples: [
      { en: "You'd better leave now, or you'll miss the bus.", ja: 'もう出たほうがいいよ、でないとバスに乗りおくれるよ。' },
      { en: "I've been meaning to call you.", ja: 'ずっと電話しようと思っていたんだ。' },
    ],
    questions: [
      q("I'm used to ___ up early.", ['getting', 'get', 'got', 'gets'], 'be used to ～ing で「～するのに慣れている」（to は前置詞）。'),
      q("You'd better ___ now, or you'll miss the bus.", ['leave', 'to leave', 'leaving', 'left'], 'had better（\'d better）のあとは原形。'),
      q('I wish I ___ go to the party tonight.', ['could', 'can', 'will', 'am'], 'I wish のあとは仮定法過去 could（実際は行けない）。'),
      q("He's tired, ___ he?", ['isn\'t', 'doesn\'t', 'wasn\'t', 'hasn\'t'], "He's＝He is なので付加疑問は isn't he。"),
      q("Let's go for a walk, ___ we?", ['shall', 'do', "don't", 'are'], "Let's ～ の付加疑問は shall we。"),
      q("I'd rather ___ at home tonight.", ['stay', 'to stay', 'staying', 'stayed'], "would rather（I'd rather）のあとは原形。"),
      q("It's no use ___ about it now.", ['worrying', 'worry', 'worried', 'worries'], "It's no use ～ing で「～してもむだだ」。"),
      q("I can't help ___ when I see that video.", ['laughing', 'laugh', 'to laugh', 'laughed'], "can't help ～ing で「～せずにいられない」。"),
      q('You should have ___ me earlier!', ['told', 'tell', 'telling', 'to tell'], 'should have ＋過去分詞で「～すべきだったのに」。'),
      q('Would you mind if I ___ the window?', ['opened', 'opening', 'to open', 'opens'], 'Would you mind if I ～ は過去形 opened でていねいにたのむ。主語 I に opens は合わない。'),
      q("I've been meaning ___ you.", ['to call', 'calling', 'call', 'called'], 'mean to do で「～するつもりだ」。have been meaning to call で「ずっと～しようと思っていた」。'),
      q('How come you ___ at the meeting yesterday?', ["weren't", "didn't", 'not were', "wasn't you"], 'How come のあとはふつうの語順（S V）。you weren\'t at ～ で「なぜ～にいなかったの？」。'),
      q("It's about time you ___ a new phone.", ['got', 'get', 'getting', 'to get'], "It's about time ＋仮定法過去 で「そろそろ～してもいいころだ」。"),
      q('A: I love pizza.  B: So ___ I.', ['do', 'am', 'have', 'love'], 'So ＋ do ＋ I で「私も」。love は一般動詞なので do で受ける。'),
      q('There was nobody ___ to help me.', ['around', 'arounding', 'was around', 'arounds'], 'nobody around で「まわりにだれも」。副詞 around がうしろから説明する。'),
    ],
  },
]

// 正解の位置がかたよらないよう、問題ごとに選択肢をずらす（正解は書いた順のいちばん前）
export const LEVEL_GRAMMAR: GrammarUnit[] = RAW.map((u) => ({
  ...u,
  questions: u.questions.map((x, i) => {
    const k = (i * 3 + 2) % x.choices.length
    const choices = [...x.choices.slice(k), ...x.choices.slice(0, k)]
    return { ...x, choices, answer: choices.indexOf(x.choices[x.answer]) }
  }),
}))
