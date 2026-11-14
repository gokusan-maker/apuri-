// 難関大（大学入試レベル）・TOEFL/IELTS レベル（と一部の高校入試レベル）の読解。本文・訳・設問・解説はすべて自作
import type { LongPassage } from './longreading'
import { ADVREAD1 } from './advread1'
import { ADVREAD2 } from './advread2'
import { ADVREAD3 } from './advread3'

export const ADV_PASSAGES: LongPassage[] = [
  ...ADVREAD1,
  ...ADVREAD2,
  ...ADVREAD3,
  {
    id: 'adv-placebo',
    title: 'The Power of Expectation',
    level: '難関大（評論）',
    paragraphs: [
      "When researchers test a new medicine, they usually give some patients the real drug and others a sugar pill that looks exactly the same. Surprisingly, a considerable number of patients who receive the sugar pill report that they feel better. This phenomenon, known as the placebo effect, has long been treated as a nuisance, something that must be subtracted from the results ( A ) the true effect of the drug can be measured.",
      "In recent decades, however, scientists have begun to take the placebo effect seriously as a subject in its own right. Studies suggest that expectation can influence how the brain processes pain, and that the setting in which treatment is given, including the warmth and confidence of the doctor, may shape how patients feel. Even the color and price of a pill have been reported to make a difference. Such findings imply that healing is not ( B ) a matter of chemistry but also of meaning.",
      "This raises an awkward ethical question. If a harmless pill can make people feel better, may doctors prescribe one without telling the truth? Most would answer no, since deceiving patients undermines the trust on ( C ) medicine depends. Interestingly, some small studies have found that placebos can help even when patients are told openly that they are taking a pill with no active ingredients. If this proves reliable, it may be possible to use the power of expectation without sacrificing honesty.",
    ],
    ja: [
      '研究者が新しい薬を試すとき、ふつう一部の患者には本物の薬を、ほかの患者には見た目がまったく同じ砂糖の錠剤をあたえる。おどろいたことに、砂糖の錠剤をもらった患者のかなりの数が、具合がよくなったと報告する。プラセボ効果として知られるこの現象は、長いあいだやっかいなものとあつかわれてきた。つまり、薬の本当の効果を測るために、結果から差し引かなければならないものだったのである。',
      'しかしここ数十年、科学者たちはプラセボ効果をそれ自体ひとつの研究対象として真剣にとらえはじめた。研究によれば、期待は脳が痛みを処理するしかたに影響しうるし、医師のあたたかさや自信もふくめ、治療があたえられる状況が患者の感じ方を左右するかもしれない。錠剤の色や値段でさえちがいを生むと報告されている。こうした発見は、いやしが化学の問題であるだけでなく、意味の問題でもあることを示している。',
      'これは気まずい倫理的な問いを生む。害のない錠剤で人々の気分がよくなるなら、医師は本当のことを言わずにそれを処方してもよいのだろうか。たいていの人は「いいえ」と答えるだろう。患者をだますことは、医療がよりどころにしている信頼をそこなうからだ。興味深いことに、有効成分のない錠剤を飲んでいると患者にはっきり伝えた場合でも、プラセボが効くことがあると示した小規模な研究がいくつかある。もしこれが確かなものだとわかれば、正直さをぎせいにすることなく期待の力を使えるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['so that', 'even if', 'as though', 'unless'], answer: 0, why: '「薬の本当の効果を測れるように」という目的なので so that（～できるように）。' },
      { id: 'B', choices: ['only', 'never', 'hardly', 'less'], answer: 0, why: 'not only A but also B「A だけでなく B も」。' },
      { id: 'C', choices: ['which', 'that', 'what', 'whom'], answer: 0, why: 'medicine depends on the trust の on が前に出た形。前置詞のあとの関係代名詞（物）は which。that は前置詞のあとに置けない。' },
    ],
    tf: [
      { statement: 'プラセボ効果は、長いあいだ薬の研究でじゃまなものとあつかわれてきた。', answer: true, why: '第1段落 has long been treated as a nuisance。' },
      { statement: '筆者によれば、錠剤の色や値段は患者の感じ方に影響しないことがわかっている。', answer: false, why: '第2段落 Even the color and price of a pill have been reported to make a difference。' },
      { statement: '筆者は、医師が患者をだましてプラセボを処方することを強くすすめている。', answer: false, why: '第3段落 deceiving patients undermines the trust。' },
    ],
    qa: [
      { q: 'What did some small studies find about placebos?', choices: ['They only work when patients are not told the truth.', 'They work better when the pill is cheap and plain.', 'They harm the trust patients have in their doctors.', 'They may work even when patients know the pill is inactive.'], answer: 3, why: '第3段落に、有効成分がないと正直に伝えても偽薬が効くことがあるという小規模研究がある。うそをつく必要があるという選択肢は逆で、安い薬が効くとは書かれておらず、信頼を損なうのはだますことの方。' },
    ],
  },
{
    id: 'toefl-seed-vault',
    title: 'A Safe Box for the World\'s Seeds',
    level: 'TOEFL・IELTS（環境）',
    paragraphs: [
      "Deep inside a mountain on a remote Norwegian island, about 1,300 kilometers from the North Pole, there is a building that few people will ever enter. It is the Svalbard Global Seed Vault, which opened in 2008. Its purpose is to store copies of seeds from crop collections around the world, ( A ) that the genetic variety of our food plants is not lost.",
      "Why are such copies needed? Many countries keep their own seed collections, known as gene banks, but these can be damaged by war, natural disasters, or simple accidents such as a broken freezer. The vault serves as a backup. The seeds are kept at about minus eighteen degrees Celsius, a temperature at which many types of seeds can survive for a very long time. Because the vault is built into frozen ground, the seeds would stay cold for some time ( B ) the electricity failed.",
      "The vault has already proved its value. In 2015, researchers whose gene bank had been forced to move because of war in Syria withdrew some of their seeds from Svalbard in order to rebuild their collection elsewhere. Supporters argue that protecting crop diversity is essential, ( C ) plant varieties that seem unimportant today may one day help farmers deal with new diseases or a changing climate.",
    ],
    ja: [
      '北極点から約1300キロはなれた、ノルウェーの遠くの島の山の奥深くに、ほとんどの人が中に入ることのない建物がある。2008年に開設されたスヴァールバル世界種子貯蔵庫だ。その目的は、世界中の作物のコレクションから種子の複製を保管し、食用植物の遺伝的な多様性が失われないようにすることである。',
      'なぜそのような複製が必要なのだろうか。多くの国はジーンバンクとよばれる自前の種子コレクションをもっているが、これらは戦争や自然災害、あるいはこわれた冷凍庫のような単純な事故で損なわれることがある。貯蔵庫はそのバックアップの役目を果たす。種子はおよそマイナス18度で保管されている。これは多くの種類の種子がとても長いあいだ生きのびられる温度だ。貯蔵庫は凍った地面の中に作られているので、たとえ電気が止まっても、種子はしばらくのあいだ冷たいままだろう。',
      'この貯蔵庫はすでにその価値を証明している。2015年、シリアでの戦争のためにジーンバンクの移転を余儀なくされた研究者たちが、別の場所でコレクションを立て直すために、スヴァールバルから種子の一部を引き出した。支持者たちは、作物の多様性を守ることは欠かせないと主張する。今日は重要でなさそうに見える植物の品種が、いつか農家が新しい病気や変わりゆく気候に対処するのを助けるかもしれないからだ。',
    ],
    blanks: [
      { id: 'A', choices: ['so', 'very', 'as', 'unless'], answer: 0, why: 'so that ～「～するように」。目的を表す。' },
      { id: 'B', choices: ['even if', 'because', 'so that', 'unless'], answer: 0, why: '「たとえ電気が止まっても」なので even if。' },
      { id: 'C', choices: ['since', 'although', 'unless', 'until'], answer: 0, why: '作物の多様性を守るのが大切な理由を述べるので since（～なので）。' },
    ],
    tf: [
      { statement: 'スヴァールバル世界種子貯蔵庫は、2008年に開設された。', answer: true, why: '第1段落 which opened in 2008。' },
      { statement: '各国のジーンバンクは、事故や災害でこわれることはない。', answer: false, why: '第2段落 these can be damaged by war, natural disasters, or simple accidents。' },
      { statement: '2015年に、シリアの戦争の影響を受けた研究者たちが種子を引き出した。', answer: true, why: '第3段落の内容と合う。' },
    ],
    qa: [
      { q: 'Why would the seeds stay cold for some time even without electricity?', choices: ['Because the vault is built into frozen ground.', 'Because the seeds are kept in water.', 'Because the island is near the equator.', 'Because the seeds produce their own cold.'], answer: 0, why: '第2段落 Because the vault is built into frozen ground。' },
    ],
  },
{
    id: 'hs-badminton-loss',
    title: 'The Match I Lost',
    level: '高校入試（体験文）',
    paragraphs: [
      "I have been on the badminton team for two years. Last summer, I played in the city tournament. I practiced harder than anyone else, so I was sure that I would win the first match. However, my opponent was a first-year student who was much ( A ) than me. I lost the match in only twenty minutes.",
      "After the match, I sat alone in the corner of the gym and could not stop crying. Then the girl who beat me came over. She said, \"Your smash was really strong. I was afraid of it the whole time.\" I was surprised. I had thought only about my mistakes, but she had seen my strong point. We talked for a while, and she told me how she practiced her footwork every morning before ( B ) to school.",
      "Since that day, I have started practicing footwork, too. I still lose sometimes, but I am not afraid of losing anymore. A match I lose can teach me more than a match I win. Next summer, I want to play against her again and show her ( C ) much I have improved.",
    ],
    ja: [
      '私はバドミントン部に入って2年になる。去年の夏、市の大会に出場した。だれよりも一生けんめい練習していたので、1回戦は勝てると信じていた。しかし、相手は私よりずっと動きの速い1年生だった。私はたった20分で試合に負けた。',
      '試合のあと、私は体育館のすみにひとりですわり、涙が止まらなかった。そのとき、私に勝った女の子がやって来た。彼女は「あなたのスマッシュ、本当に強かった。ずっとこわかったよ」と言った。私はおどろいた。私は自分のミスのことばかり考えていたのに、彼女は私の長所を見ていたのだ。私たちはしばらく話し、彼女は毎朝学校の前にフットワークの練習をしていると教えてくれた。',
      'その日から、私もフットワークの練習を始めた。今でもときどき負けるが、もう負けることはこわくない。負けた試合は、勝った試合よりも多くのことを教えてくれることがある。来年の夏、もう一度彼女と対戦して、私がどれだけ上達したかを見せたい。',
    ],
    blanks: [
      { id: 'A', choices: ['faster', 'fast', 'fastest', 'more fast'], answer: 0, why: 'than があるので比較級。fast の比較級は faster。much は比較級を強める。' },
      { id: 'B', choices: ['going', 'go', 'went', 'to go'], answer: 0, why: '前置詞 before のあとは動名詞（～ing）。before going to school「学校に行く前に」。' },
      { id: 'C', choices: ['how', 'what', 'so', 'very'], answer: 0, why: 'how much ～「どれだけ～」。show her の目的語になる間接疑問。' },
    ],
    tf: [
      { statement: '筆者は1回戦で、1年生の選手に勝った。', answer: false, why: '第1段落 I lost the match in only twenty minutes。' },
      { statement: '相手の女の子は、筆者のスマッシュをほめた。', answer: true, why: '第2段落 Your smash was really strong。' },
      { statement: '筆者は今でも負けることをとてもこわがっている。', answer: false, why: '第3段落 I am not afraid of losing anymore。' },
    ],
    qa: [
      { q: 'What did the writer start doing after the tournament?', choices: ['Practicing footwork.', 'Quitting the badminton team.', 'Playing tennis instead.', 'Practicing only smashes.'], answer: 0, why: '第3段落 I have started practicing footwork, too。' },
    ],
  },
{
    id: 'adv-railway-time',
    title: 'When Clocks Began to Agree',
    level: '難関大（評論）',
    paragraphs: [
      "For most of human history, time was a local matter. Each town set its clocks by the position of the sun, so that noon was the moment when the sun stood highest in the sky. Because the sun appears to move from east to west, a town only a short distance to the west would be several minutes behind its neighbor. As long as people traveled slowly, ( A ) small differences caused little trouble.",
      "The railway changed this. When trains began to carry passengers between distant cities at high speed, timetables based on dozens of local times became confusing and even dangerous. In Britain, railway companies in the 1840s began to use a single standard time throughout their networks, and in 1883 railroads in the United States and Canada introduced standard time zones. The following year, an international conference recommended Greenwich in London as the starting point for measuring longitude, ( B ) laid the foundation for the global system of time zones we use today.",
      "What is striking about this history is that a technical solution also transformed how people experienced time. The hour shown on a clock was no longer tied to the sky above a particular place; it became a shared agreement, coordinated across great distances. Some critics at the time complained that \"railway time\" was artificial. Yet it is precisely this artificial agreement ( C ) allows millions of strangers to meet trains, join online meetings, and coordinate their lives.",
    ],
    ja: [
      '人類の歴史の大部分で、時刻は地域ごとのものだった。それぞれの町は太陽の位置に合わせて時計を合わせていたので、正午とは太陽が空でいちばん高くなる瞬間のことだった。太陽は東から西へ動くように見えるので、少し西にある町はとなりの町より数分おくれていた。人々がゆっくり移動しているかぎり、そのような小さなちがいはほとんど問題にならなかった。',
      '鉄道がこれを変えた。列車が遠くはなれた都市のあいだで乗客を高速で運ぶようになると、何十もの地方時にもとづく時刻表はわかりにくく、危険でさえあるものになった。イギリスでは1840年代に鉄道会社が路線網全体で1つの標準時を使いはじめ、1883年にはアメリカとカナダの鉄道が標準時間帯を導入した。翌年、国際会議がロンドンのグリニッジを経度を測る起点とするよう勧告し、それが今日私たちが使っている世界的な時間帯のしくみの土台となった。',
      'この歴史で目をひくのは、技術的な解決策が人々の時間の感じ方まで変えたことである。時計の示す時刻は、もはや特定の場所の空と結びついたものではなくなった。それは遠くはなれた場所どうしで調整される、共有された取り決めになったのだ。当時の批評家の中には「鉄道時間」は人工的だと不満を言う人もいた。しかし、何百万もの見知らぬ人どうしが列車に間に合い、オンライン会議に参加し、生活を調整できるのは、まさにこの人工的な取り決めのおかげなのである。',
    ],
    blanks: [
      { id: 'A', choices: ['such', 'so', 'much', 'too'], answer: 0, why: 'such ＋ 形容詞 ＋ 複数名詞「そのような小さなちがい」。so・too は名詞の前で形容詞を強められない。' },
      { id: 'B', choices: ['which', 'that', 'what', 'it'], answer: 0, why: '前の内容全体を受ける非制限用法の which。コンマのあとに that は使えない。' },
      { id: 'C', choices: ['that', 'what', 'where', 'how'], answer: 0, why: 'It is ～ that … の強調構文。「…するのはまさにこの取り決めだ」。' },
    ],
    tf: [
      { statement: '鉄道ができる前は、それぞれの町が太陽の位置で時計を合わせていた。', answer: true, why: '第1段落 Each town set its clocks by the position of the sun。' },
      { statement: 'アメリカとカナダの鉄道は、1840年代に標準時間帯を導入した。', answer: false, why: '第2段落 in 1883 railroads in the United States and Canada introduced standard time zones。' },
      { statement: '筆者は、鉄道時間は人工的なので役に立たないと結論づけている。', answer: false, why: '第3段落 it is precisely this artificial agreement that allows 〜。' },
    ],
    qa: [
      { q: 'Why did timetables based on local times become a problem?', choices: ['Trains carried people quickly between distant cities.', 'People stopped using clocks.', 'The sun began to move differently.', 'Towns refused to build railways.'], answer: 0, why: '第2段落 When trains began to carry passengers between distant cities at high speed 〜。' },
    ],
  },
{
    id: 'toefl-leafcutter',
    title: 'The Ants That Farm',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "In the forests of Central and South America, long lines of ants can be seen carrying pieces of leaves many times larger than their own heads. These are leafcutter ants. It might seem natural to assume that they eat the leaves, but they do not. Instead, they use the leaves to grow a fungus, ( A ) serves as the main food for the colony.",
      "Inside the underground nest, workers chew the leaf pieces into a soft paste and spread it in special chambers. The fungus grows on this paste, and the ants feed on parts of it. The work is divided among workers of different sizes. The largest ants defend the colony, medium-sized ones cut and carry leaves, and the smallest ones tend the delicate fungus gardens. A mature colony can contain millions of individuals, ( B ) it one of the most complex societies in the animal world.",
      "Like human farmers, the ants must protect their crop from pests. A harmful fungus can invade the gardens and destroy them. Researchers have found that many leafcutter ants carry bacteria on their bodies that produce chemicals able to stop the growth of this invader. In other words, the ants appear to have been using a kind of natural antibiotic long before humans ( C ) such medicines.",
    ],
    ja: [
      '中南米の森では、自分の頭の何倍も大きい葉のかけらを運ぶアリの長い列が見られる。これがハキリアリだ。アリが葉を食べると考えるのは自然に思えるかもしれないが、そうではない。アリは葉を使って菌を育て、その菌がコロニーの主な食べ物になるのである。',
      '地下の巣の中で、働きアリは葉のかけらをかんでやわらかいペースト状にし、特別な部屋に広げる。菌はこのペーストの上で育ち、アリはその一部を食べる。仕事は大きさのちがう働きアリのあいだで分担されている。いちばん大きいアリはコロニーを守り、中くらいのアリは葉を切って運び、いちばん小さいアリはこわれやすい菌の畑の世話をする。成熟したコロニーには何百万もの個体がいることがあり、そのためハキリアリは動物の世界でもっとも複雑な社会の一つとなっている。',
      '人間の農家と同じように、アリも作物を害虫から守らなければならない。有害な菌が畑に入りこみ、畑をだめにしてしまうことがあるのだ。研究者たちは、多くのハキリアリが、この侵入者の成長を止める化学物質を作る細菌を体につけていることを発見した。つまり、アリは人間がそのような薬を発見するずっと前から、一種の天然の抗生物質を使ってきたらしいのである。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'that', 'what', 'it'], answer: 0, why: 'コンマのあとで a fungus を説明する非制限用法の which。that はコンマのあとに使えない。' },
      { id: 'B', choices: ['making', 'made', 'to make', 'makes'], answer: 0, why: '分詞構文「そしてそれは～にする」。前の内容の結果を表すので making。' },
      { id: 'C', choices: ['discovered', 'discovering', 'to discover', 'discovers'], answer: 0, why: 'long before のあとは主語＋動詞の文。過去のことなので過去形 discovered。humans は複数なので discovers は使えない。' },
    ],
    tf: [
      { statement: 'ハキリアリは、運んだ葉をそのまま食べる。', answer: false, why: '第1段落 It might seem natural to assume that they eat the leaves, but they do not。' },
      { statement: 'いちばん小さい働きアリは、菌の畑の世話をする。', answer: true, why: '第2段落 the smallest ones tend the delicate fungus gardens。' },
      { statement: 'ハキリアリの体には、有害な菌の成長を止める物質を作る細菌がいる。', answer: true, why: '第3段落の内容と合う。' },
    ],
    qa: [
      { q: 'What do the largest leafcutter ants do?', choices: ['They defend the colony.', 'They grow the fungus.', 'They cut leaves.', 'They carry eggs to the surface.'], answer: 0, why: '第2段落 The largest ants defend the colony。' },
    ],
  },
{
    id: 'hs-town-guide',
    title: 'Our English Town Guide',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last year, many tourists from abroad started visiting our small town to see the old temple and the rice fields. However, there were few signs in English, and some tourists looked lost. Our English teacher asked us, \"What can we do ( A ) help them?\" After talking in groups, our class decided to make a town guide in English.",
      "We divided the work. Some students took pictures, and others interviewed shop owners. I was in charge of the page about the temple. Writing in English was harder than I thought. I had to check many words in the dictionary, and our teacher corrected my sentences again and again. When the guide was finished, the town office printed five hundred ( B ) and put them at the station.",
      "One Sunday, I saw a woman holding our guide in front of the temple. She was smiling and taking pictures. I wanted to talk to her, but I was too shy. Then she came to me and asked, \"Excuse me, is this the temple in the guide?\" I answered, \"Yes! I wrote that page.\" She looked surprised and said, \"It's very easy to understand. Thank you.\" At that moment, I felt that the English I ( C ) at school was really useful.",
    ],
    ja: [
      '去年、外国から来た多くの観光客が、古いお寺と田んぼを見に私たちの小さな町をおとずれはじめた。しかし、英語の案内表示はほとんどなく、道に迷っているように見える観光客もいた。英語の先生は私たちに「その人たちを助けるために、何ができるかな」と聞いた。グループで話し合ったあと、私たちのクラスは英語の町の案内を作ることに決めた。',
      '私たちは仕事を分担した。写真をとる生徒もいれば、お店の人にインタビューする生徒もいた。私はお寺のページの担当だった。英語で書くのは思っていたよりむずかしかった。たくさんの単語を辞書で調べなければならず、先生は私の文を何度も直してくれた。案内が完成すると、町役場が500部を印刷して駅に置いてくれた。',
      'ある日曜日、私はお寺の前で私たちの案内を持っている女性を見かけた。彼女はほほえみながら写真をとっていた。話しかけたかったが、はずかしくてできなかった。すると彼女が私のところへ来て「すみません、これが案内にあるお寺ですか」とたずねた。私は「はい！そのページは私が書きました」と答えた。彼女はおどろいた様子で「とてもわかりやすいです。ありがとう」と言った。そのとき私は、学校で学んでいる英語は本当に役に立つのだと感じた。',
    ],
    blanks: [
      { id: 'A', choices: ['to', 'for', 'by', 'with'], answer: 0, why: 'to help them「彼らを助けるために」（不定詞の副詞的用法）。' },
      { id: 'B', choices: ['copies', 'pieces', 'pages', 'papers'], answer: 0, why: '印刷物の「部」は copy で数える。five hundred copies「500部」。' },
      { id: 'C', choices: ['was learning', 'was learned', 'had learned to', 'learning'], answer: 0, why: '主節の felt（過去）に合わせて、「学校で学んでいる（最中の）英語」を過去進行形 was learning で表す。' },
    ],
    tf: [
      { statement: '町には、もともと英語の案内表示がたくさんあった。', answer: false, why: '第1段落 there were few signs in English。' },
      { statement: '筆者はお寺のページを担当した。', answer: true, why: '第2段落 I was in charge of the page about the temple。' },
      { statement: '筆者は自分から女性に話しかけた。', answer: false, why: '第3段落 I was too shy. Then she came to me。' },
    ],
    qa: [
      { q: 'Why did the class decide to make a town guide in English?', choices: ['To help tourists who looked lost.', 'To win a contest at school.', 'To sell it at the station.', 'To practice taking pictures.'], answer: 0, why: '第1段落 some tourists looked lost / What can we do to help them?' },
    ],
  },
{
    id: 'adv-learning-styles',
    title: 'Do We Have Learning Styles?',
    level: '難関大（評論）',
    paragraphs: [
      "Many people believe that each of us has a particular learning style. Some describe themselves as \"visual learners\" who learn best from pictures, while others claim to be \"auditory learners\" who prefer to listen. The idea is appealing because it seems to respect individual differences, and it has been widely promoted in schools. Teachers have sometimes been encouraged to identify each student's style and adapt their lessons ( A ).",
      "Yet when researchers have tested the idea carefully, the evidence has been disappointing. To support the theory, a study would need to show that visual learners do better with pictures and auditory learners do better with spoken explanations, and not just that people have preferences. Such results have rarely been found. People certainly have preferences, ( B ) teaching that matches those preferences does not appear to improve how much they actually learn.",
      "This does not mean that the way we teach is unimportant. On the contrary, research suggests that the best method often depends on the content rather than on the learner. A map is best understood visually, and a piece of music is best understood by listening, whoever the student is. Combining words with pictures tends to help almost everyone. The lesson, perhaps, is that we should be careful not to ( C ) ourselves by labels that may limit how we choose to learn.",
    ],
    ja: [
      '私たち一人ひとりには特定の学習スタイルがあると信じている人は多い。絵からいちばんよく学ぶ「視覚型学習者」だと自分のことを言う人もいれば、聞くほうが好きな「聴覚型学習者」だと言う人もいる。この考えは個人のちがいを尊重しているように思えるので魅力的であり、学校でも広くすすめられてきた。教師たちは、ときに生徒一人ひとりのスタイルを見きわめ、それに合わせて授業を変えるようにすすめられてきた。',
      'しかし研究者たちがこの考えを注意深く検証すると、証拠は期待はずれのものだった。この理論を裏づけるには、人に好みがあるというだけでなく、視覚型の人は絵で、聴覚型の人は話による説明で、よりよい成果をあげることを研究で示す必要がある。そのような結果はほとんど見つかっていない。人にはたしかに好みがあるが、その好みに合わせて教えても、実際に学ぶ量がふえるようには見えないのである。',
      'これは、教え方が重要でないということではない。それどころか、研究によれば、最もよい方法は学習者よりも内容によって決まることが多い。地図は目で見てこそいちばんよく理解でき、音楽は聞いてこそいちばんよく理解できる。生徒がだれであってもそうなのだ。言葉と絵を組み合わせると、ほとんどだれにとっても役に立つ傾向がある。おそらく教訓は、学び方の選択をせばめかねないレッテルで自分をしばらないよう気をつけるべきだ、ということだろう。',
    ],
    blanks: [
      { id: 'A', choices: ['accordingly', 'nevertheless', 'otherwise', 'meanwhile'], answer: 0, why: 'accordingly「それに応じて」。生徒のスタイルに合わせて授業を変える。' },
      { id: 'B', choices: ['but', 'so', 'for', 'or'], answer: 0, why: '「好みはあるが、合わせても学ぶ量はふえない」という逆接なので but。' },
      { id: 'C', choices: ['restrict', 'restricted', 'restricting', 'restriction'], answer: 0, why: 'be careful not to ＋ 動詞の原形。restrict oneself「自分を制限する」。' },
    ],
    tf: [
      { statement: '学習スタイルの考えは、個人のちがいを尊重しているように見えるので人気がある。', answer: true, why: '第1段落 it seems to respect individual differences。' },
      { statement: '研究では、好みに合わせて教えると学ぶ量が大きくふえることがくり返し示された。', answer: false, why: '第2段落 does not appear to improve how much they actually learn。' },
      { statement: '筆者によれば、最もよい教え方は内容によって決まることが多い。', answer: true, why: '第3段落 the best method often depends on the content rather than on the learner。' },
    ],
    qa: [
      { q: 'What kind of evidence would be needed to support the learning-styles theory?', choices: ['That most people prefer either pictures or listening.', 'That learners do better when taught in their own style.', 'That combining words with pictures helps almost everyone.', 'That the best method depends on the content taught.'], answer: 1, why: '第2段落に、好みがあるだけでなく、各タイプが自分に合う方法で教わると実際によく学ぶと示す必要があるとある。好みの存在だけでは不十分で、絵と言葉の組合せや内容による方法は第3段落の別の話。' },
    ],
  },
{
    id: 'toefl-quake-warning',
    title: 'Seconds Before the Shaking',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "When an earthquake occurs, it sends out several kinds of waves through the ground. The first to arrive are called P waves. They travel quickly but usually cause relatively little shaking. They are followed by S waves, which move more slowly ( A ) tend to produce the strong shaking that damages buildings. The difference in speed between these two types of waves is the key to earthquake early warning systems.",
      "Seismometers placed near the source of an earthquake can detect the P waves within moments. Computers then estimate the location and size of the earthquake and send out an alert. Because electronic signals travel far faster than seismic waves, the warning can reach places farther away before the S waves arrive. Japan began issuing such warnings to the public in 2007, and they are now sent to televisions and mobile phones across the country.",
      "The warning time is short, ranging from a few seconds to perhaps a minute, depending on how far a place is from the source. Places very close to the source may receive no warning at all. Even so, a few seconds can be ( B ) to slow down trains, stop elevators at the nearest floor, or allow people to take cover under a table. Early warning cannot prevent earthquakes, but it can reduce the harm they cause ( C ) people know how to respond quickly.",
    ],
    ja: [
      '地震が起きると、いくつかの種類の波が地面を伝わっていく。最初に届くのはP波とよばれる。P波は速く伝わるが、ふつうは比較的ゆれが小さい。そのあとにS波が続く。S波はゆっくり伝わり、建物をこわすような強いゆれを起こしやすい。この2種類の波の速さのちがいが、緊急地震速報のしくみのかぎである。',
      '震源の近くに置かれた地震計は、すぐにP波をとらえることができる。そしてコンピューターが地震の場所と規模を推定し、警報を出す。電子の信号は地震の波よりはるかに速く伝わるので、より遠くの場所には、S波が届く前に警報が届くことがある。日本は2007年にこのような警報を一般に出しはじめ、今では全国のテレビや携帯電話に送られている。',
      '警報が出てからの時間は短く、震源からどれだけはなれているかによって、数秒からおそらく1分ほどである。震源のすぐ近くでは、警報がまったく間に合わないこともある。それでも、数秒あれば列車をおそくしたり、エレベーターをいちばん近い階で止めたり、人がテーブルの下に身を守ったりするのに十分なことがある。緊急地震速報は地震を防ぐことはできないが、人々がすばやく行動するしかたを知っていれば、地震による被害を減らすことができる。',
    ],
    blanks: [
      { id: 'A', choices: ['but', 'or', 'so', 'nor'], answer: 0, why: '「ゆっくり伝わるが、強いゆれを起こしやすい」という対比なので but。' },
      { id: 'B', choices: ['enough', 'too', 'very', 'so'], answer: 0, why: 'be enough to ～「～するのに十分だ」。' },
      { id: 'C', choices: ['if', 'unless', 'although', 'before'], answer: 0, why: '「すばやく行動するしかたを知っていれば」という条件なので if。' },
    ],
    tf: [
      { statement: 'P波はS波よりおそく伝わる。', answer: false, why: '第1段落 P waves travel quickly / S waves, which move more slowly。' },
      { statement: '日本は2007年に緊急地震速報を一般に出しはじめた。', answer: true, why: '第2段落 Japan began issuing such warnings to the public in 2007。' },
      { statement: '震源のすぐ近くでは、いつも1分以上前に警報が届く。', answer: false, why: '第3段落 Places very close to the source may receive no warning at all。' },
    ],
    qa: [
      { q: 'Why can the warning reach distant places before the strong shaking?', choices: ['Electronic signals travel faster than seismic waves.', 'S waves stop before reaching cities.', 'P waves are stronger than S waves.', 'Earthquakes always happen at night.'], answer: 0, why: '第2段落 Because electronic signals travel far faster than seismic waves 〜。' },
    ],
  },
{
    id: 'adv-attention',
    title: 'The Scarcest Resource',
    level: '難関大（評論）',
    paragraphs: [
      "We often say that we live in an age of information, but information itself is no longer scarce. Every day, far more is produced than anyone could possibly read, watch, or listen to. What has become scarce is something else: our attention. As the economist and psychologist Herbert Simon observed decades ago, an abundance of information tends to create a shortage of the attention needed ( A ) it.",
      "Many online services are free to use, yet they are not free to run. Much of their income comes from advertising, and advertisers pay for the time and attention of users. As a result, these services have strong reasons to keep us engaged for as long as possible. Features such as endless feeds, automatic playback of the next video, and frequent alerts are designed, at least in part, to make it harder for us to stop.",
      "None of this means that technology is simply harmful; the same tools allow us to learn, create, and stay in touch with others. The point is that attention, once spent, cannot be recovered, and it shapes what we come to care about. Protecting it may require deliberate habits, ( B ) turning off unnecessary alerts or setting aside time without screens. In a world competing for our attention, deciding where to place it may be one of the most important choices we make, ( C ) we are aware of making it or not.",
    ],
    ja: [
      '私たちはよく情報の時代に生きていると言うが、情報そのものはもはや不足していない。毎日、だれかが読んだり見たり聞いたりできる量よりはるかに多くの情報が生み出されている。不足するようになったのは別のもの、つまり私たちの注意力である。経済学者であり心理学者でもあるハーバート・サイモンが何十年も前に指摘したように、情報があふれると、それを処理するのに必要な注意力が足りなくなりがちなのだ。',
      '多くのオンラインサービスは無料で使えるが、運営するのは無料ではない。その収入の多くは広告から来ており、広告主は利用者の時間と注意に対してお金を払う。その結果、こうしたサービスには、私たちをできるだけ長く引きつけておく強い理由がある。終わりのないフィードや次の動画の自動再生、ひんぱんな通知といった機能は、少なくとも一部は、私たちがやめにくくなるように作られているのである。',
      'このことは、技術が単に有害だということを意味するのではない。同じ道具によって、私たちは学び、創造し、他の人とつながっていられる。要点は、注意力は一度使ってしまうと取りもどせず、私たちが何を大切に思うようになるかを形づくるということだ。それを守るには、不要な通知を切ったり、画面を見ない時間をとっておいたりといった、意識的な習慣が必要かもしれない。注意を引こうと競い合う世界では、注意をどこに向けるかを決めることは、自分がそれを選んでいると気づいていようといまいと、私たちが行う最も重要な選択の一つかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['to process', 'processing', 'processed', 'process'], answer: 0, why: 'the attention needed to process it「それを処理するのに必要な注意力」。目的を表す不定詞。' },
      { id: 'B', choices: ['such as', 'as if', 'so that', 'even though'], answer: 0, why: '具体例を挙げる such as ～「たとえば～のような」。' },
      { id: 'C', choices: ['whether', 'if only', 'unless', 'as long as'], answer: 0, why: 'whether A or not「A であろうとなかろうと」（譲歩）。' },
    ],
    tf: [
      { statement: '筆者は、今の時代には情報が不足していると述べている。', answer: false, why: '第1段落 information itself is no longer scarce。' },
      { statement: '多くの無料のオンラインサービスは、広告から収入を得ている。', answer: true, why: '第2段落 Much of their income comes from advertising。' },
      { statement: '筆者は、技術は単に有害なので使うべきではないと主張している。', answer: false, why: '第3段落 None of this means that technology is simply harmful。' },
    ],
    qa: [
      { q: 'According to the passage, why do some services include features like endless feeds?', choices: ['To keep users engaged for a long time.', 'To reduce the amount of information.', 'To help users sleep better.', 'To make the services more expensive.'], answer: 0, why: '第2段落 these services have strong reasons to keep us engaged for as long as possible。' },
    ],
  },
{
    id: 'hs-care-home',
    title: 'Songs at the Care Home',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last December, our chorus club visited a care home for elderly people. Before the visit, I was worried. I did not know ( A ) to talk to people who were much older than me. I thought they might not enjoy our songs because we usually sing new pop songs.",
      "Our teacher suggested that we also sing some old Japanese songs. At the care home, when we started singing one of them, an old man in a wheelchair began to sing with us. His voice was small, but he remembered every word. After the song, a staff member told us that he usually did not talk much. \"I haven't seen him this happy ( B ) a long time,\" she said.",
      "After our performance, the man held my hand and said, \"I sang that song when I was your age.\" I realized that music can connect people of different generations. I had thought that I had nothing to give them, but I was wrong. Now our club visits the care home every month, and I always look forward ( C ) seeing him.",
    ],
    ja: [
      '去年の12月、私たちの合唱部はお年寄りのための介護施設を訪問した。訪問の前、私は不安だった。自分よりずっと年上の人たちにどうやって話しかければいいのかわからなかった。ふだんは新しいポップソングを歌っているので、私たちの歌を楽しんでもらえないかもしれないと思っていた。',
      '先生は、昔の日本の歌も歌ってはどうかと提案した。施設で私たちがその中の1曲を歌いはじめると、車いすに乗ったおじいさんがいっしょに歌いだした。声は小さかったが、歌詞を全部覚えていた。歌のあと、職員の人が、その人はふだんあまり話さないのだと教えてくれた。「あんなにうれしそうな姿は、長いあいだ見ていませんでした」と彼女は言った。',
      '発表のあと、そのおじいさんは私の手をにぎって「この歌は、きみくらいの年のころに歌ったんだよ」と言った。私は、音楽はちがう世代の人をつなげることができるのだと気づいた。自分にはあげられるものが何もないと思っていたが、それはまちがいだった。今では私たちの部は毎月その施設を訪問していて、私はいつも彼に会うのを楽しみにしている。',
    ],
    blanks: [
      { id: 'A', choices: ['how', 'what', 'which', 'who'], answer: 0, why: 'how to talk to ～「～にどうやって話しかければよいか」（疑問詞＋to）。' },
      { id: 'B', choices: ['for', 'since', 'during', 'by'], answer: 0, why: 'for a long time「長いあいだ」。現在完了の否定と使う。' },
      { id: 'C', choices: ['to', 'for', 'at', 'with'], answer: 0, why: 'look forward to ～ing「～するのを楽しみにする」。' },
    ],
    tf: [
      { statement: '筆者は訪問の前から、きっとうまくいくと自信をもっていた。', answer: false, why: '第1段落 Before the visit, I was worried。' },
      { statement: '車いすのおじいさんは、昔の歌の歌詞を全部覚えていた。', answer: true, why: '第2段落 he remembered every word。' },
      { statement: '合唱部は今、毎月その施設を訪問している。', answer: true, why: '第3段落 Now our club visits the care home every month。' },
    ],
    qa: [
      { q: 'What did the writer realize after the performance?', choices: ['Music can connect people of different generations.', 'Old songs are more difficult than pop songs.', 'Elderly people do not like music.', 'The chorus club should stop singing.'], answer: 0, why: '第3段落 I realized that music can connect people of different generations。' },
    ],
  },
{
    id: 'toefl-deep-light',
    title: 'Living Lights of the Deep Sea',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Sunlight fades quickly as it passes through seawater. By a depth of about one thousand meters, almost no sunlight remains, and the ocean is completely dark. Yet the deep sea is not entirely without light. Many of the animals that live there can produce their own light through a chemical reaction inside their bodies, a process ( A ) bioluminescence. Some studies suggest that a large majority of deep-sea animals have this ability.",
      "Light is used in several different ways. The anglerfish, for example, has a glowing lure that hangs in front of its mouth. Small animals that swim toward the light ( B ) themselves caught. Other creatures use light for protection. When some shrimp are attacked, they release a cloud of glowing liquid that confuses the predator and gives them a chance to escape.",
      "One of the most clever uses of light is a kind of camouflage. In the dim \"twilight zone,\" between about two hundred and one thousand meters deep, a predator looking up can see the dark shape of an animal against the faint light from above. Certain fish and squid solve this problem by producing a soft glow on the undersides of their bodies, ( C ) matches the light coming from above. As a result, their outline almost disappears, and they become much harder to see.",
    ],
    ja: [
      '日光は海水を通るうちにすぐに弱くなる。水深約1000メートルまでくると日光はほとんど残っておらず、海はまっ暗になる。それでも深海にまったく光がないわけではない。そこに住む動物の多くは、体内の化学反応によって自分で光を出すことができる。これは生物発光とよばれるしくみである。深海の動物の大多数がこの能力をもっていることを示す研究もある。',
      '光はいくつかの異なる方法で使われている。たとえばチョウチンアンコウには、口の前にぶら下がる光るえさのようなものがある。その光に向かって泳いでくる小さな動物は、気がつけば自分がつかまっているのである。身を守るために光を使う生き物もいる。ある種のエビは、おそわれると光る液体の雲をはき出す。それが捕食者をまどわせ、にげるチャンスをあたえるのだ。',
      '光の使い方の中でもっとも巧みなものの一つは、一種のカモフラージュである。水深およそ200〜1000メートルのうす暗い「トワイライトゾーン」では、上を見上げる捕食者には、上から届くかすかな光を背景に、動物の暗い影が見える。ある種の魚やイカは、体の下側からやわらかな光を出すことでこの問題を解決している。その光は上から届く光と同じくらいの明るさなのだ。その結果、輪郭がほとんど消え、ずっと見つけにくくなるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['known as', 'knowing as', 'knows as', 'to know'], answer: 0, why: 'a process known as ～「～として知られるしくみ」。過去分詞の後置修飾。' },
      { id: 'B', choices: ['find', 'finds', 'finding', 'to find'], answer: 0, why: '主語 Small animals（複数）に合わせた現在形 find。find oneself caught「気がつくとつかまっている」。' },
      { id: 'C', choices: ['which', 'that', 'what', 'who'], answer: 0, why: 'コンマのあとで a soft glow を説明する非制限用法の which。that はコンマのあとに使えない。' },
    ],
    tf: [
      { statement: '水深約1000メートルでは、まだたくさんの日光が届く。', answer: false, why: '第1段落 almost no sunlight remains。' },
      { statement: 'あるエビは、おそわれると光る液体を出して身を守る。', answer: true, why: '第2段落の内容と合う。' },
      { statement: '体の下側を光らせる魚は、下から見上げる捕食者に見つけにくくなる。', answer: true, why: '第3段落 their outline almost disappears。' },
    ],
    qa: [
      { q: 'How does the anglerfish use light?', choices: ['To attract small animals toward its mouth.', 'To scare away larger predators.', 'To find its way home.', 'To warm the water around it.'], answer: 0, why: '第2段落 a glowing lure that hangs in front of its mouth / Small animals that swim toward the light find themselves caught。' },
    ],
  },
{
    id: 'adv-sunk-cost',
    title: 'Why We Keep Going When We Should Stop',
    level: '難関大（評論）',
    paragraphs: [
      "Imagine that you have paid for a concert ticket, but on the day of the show you feel ill and the weather is terrible. Many people would still go, reasoning that otherwise the money would be wasted. Yet the money has already been spent and cannot be recovered ( A ) they decide. The only real question is whether the evening will be better at the concert or at home. Economists call money, time, or effort that cannot be recovered a \"sunk cost,\" and the tendency to let it guide our choices the sunk cost fallacy.",
      "The fallacy is not limited to small personal decisions. Companies continue expensive projects that are clearly failing because so much has already been invested in them, and governments sometimes pour more resources into plans that have little chance of success. In each case, the desire to justify past choices takes priority over a clear look at future costs and benefits.",
      "Why are we so easily trapped? One reason is that admitting a loss feels painful, and continuing allows us to postpone that pain. Another is that people who change course may be seen as wasteful or inconsistent. Still, recognizing the fallacy does not mean we should give up at the first difficulty; persistence is often valuable. The point is to ask the right question: not \"How much have I already put in?\" but \"Knowing what I know now, ( B ) I start this today?\" Answering it honestly is ( C ) easier said than done.",
    ],
    ja: [
      'コンサートのチケット代をはらったのに、当日になって体調が悪く、天気もひどかったとしよう。多くの人は、行かなければお金がむだになると考えて、それでも行くだろう。しかし、お金はもうはらってしまっていて、どちらに決めても取りもどすことはできない。本当に問うべきことは、その夜をコンサートですごすのと家ですごすのと、どちらがよいかということだけである。経済学者は、取りもどすことのできないお金や時間、労力を「サンクコスト（埋没費用）」とよび、それに選択を左右されてしまう傾向をサンクコストの誤りとよぶ。',
      'この誤りは、小さな個人の決定に限られない。企業は、すでに多くを投資したという理由で、明らかに失敗している費用のかかる計画を続けるし、政府もときに、成功の見こみがほとんどない計画にさらに資源をつぎこむ。どの場合も、過去の選択を正当化したいという気持ちが、将来の損得を冷静に見ることよりも優先されているのである。',
      'なぜ私たちはこれほど簡単にこのわなにはまるのだろうか。理由の一つは、損を認めるのはつらく、続けることでそのつらさを先のばしにできるからだ。もう一つは、方針を変える人はむだづかいをする人、一貫性のない人と見られるかもしれないからである。とはいえ、この誤りに気づくことは、最初の困難であきらめるべきだということではない。がんばり続けることには価値があることも多い。大切なのは、正しい問いを立てることだ。「もうどれだけつぎこんだか」ではなく、「今わかっていることをふまえて、今日これを始めるだろうか」と。正直に答えるのは、もちろん言うはやすく行うはかたしである。',
    ],
    blanks: [
      { id: 'A', choices: ['whatever', 'no matter', 'whoever', 'whenever'], answer: 0, why: 'whatever they decide「彼らが何を決めようとも」（譲歩）。' },
      { id: 'B', choices: ['would', 'am', 'have', 'was'], answer: 0, why: '仮定の問い「今日これを始めるだろうか」なので would I start。' },
      { id: 'C', choices: ['of course', 'in addition', 'for example', 'as a result'], answer: 0, why: '「もちろん言うはやすく行うはかたし」。of course で当然のことを認める。' },
    ],
    tf: [
      { statement: '筆者によれば、すでにはらったお金は、決定しだいで取りもどせる。', answer: false, why: '第1段落 cannot be recovered whatever they decide。' },
      { statement: 'サンクコストの誤りは、企業や政府の決定にも見られる。', answer: true, why: '第2段落の内容と合う。' },
      { statement: '筆者は、少しでも困難があればすぐにあきらめるべきだと主張している。', answer: false, why: '第3段落 does not mean we should give up at the first difficulty。' },
    ],
    qa: [
      { q: 'What question does the writer suggest we ask ourselves?', choices: ['Whether we would start the plan today, knowing what we know now.', 'How much money we have already spent.', 'What other people will think of us.', 'How to finish the plan as quickly as possible.'], answer: 0, why: '第3段落 "Knowing what I know now, would I start this today?"' },
    ],
  },
{
    id: 'hs-bento',
    title: 'The Lunch Box I Made',
    level: '高校入試（体験文）',
    paragraphs: [
      "Every morning, my mother gets up at five to make lunch boxes for my brother and me. I never thought much about it. One night in February, she caught a bad cold and had to stay in bed. My father had to leave early the next day, so I decided to make the lunch boxes ( A ).",
      "I set my alarm for five thirty, but it took me a long time to cook. The rice was too soft, and the eggs were a little burned. I put everything into the boxes and looked at them. They did not look as good as my mother's. When I left for school, my brother looked at his lunch box and said, \"It's OK. I'll eat it all.\"",
      "At lunchtime, I opened my box. The food was not perfect, but I ate every piece. I thought about my mother. She has done this hard work every morning for years ( B ) complaining. That evening, I told her, \"Thank you for making our lunch every day.\" She smiled and said, \"Your eggs were better than mine.\" Now I make the lunch boxes every Saturday, ( C ) she can sleep a little longer.",
    ],
    ja: [
      '毎朝、母は5時に起きて、弟と私のお弁当を作ってくれる。私はそれについてあまり考えたことがなかった。2月のある夜、母はひどいかぜをひいて、ねていなければならなくなった。次の日、父は早く出かけなければならなかったので、私は自分でお弁当を作ることにした。',
      '私は目覚ましを5時半にセットしたが、作るのにとても時間がかかった。ごはんはやわらかすぎて、卵は少しこげてしまった。全部を箱につめてながめてみた。母のお弁当ほどおいしそうには見えなかった。私が学校へ出かけるとき、弟は自分のお弁当を見て「だいじょうぶ。全部食べるよ」と言った。',
      '昼休みに、私はお弁当を開けた。料理は完ぺきではなかったが、私はひとつ残らず食べた。私は母のことを考えた。母は何年も、文句も言わずに毎朝この大変な仕事をしてきたのだ。その夜、私は母に「毎日お弁当を作ってくれてありがとう」と言った。母はほほえんで「あなたの卵のほうが私のよりおいしかったよ」と言った。今では、母が少し長くねられるように、私は毎週土曜日にお弁当を作っている。',
    ],
    blanks: [
      { id: 'A', choices: ['myself', 'me', 'mine', 'my'], answer: 0, why: 'make ～ myself「自分で～を作る」。再帰代名詞で「自分で」を表す。' },
      { id: 'B', choices: ['without', 'with', 'by', 'from'], answer: 0, why: 'without ～ing「～しないで」。without complaining「文句を言わずに」。' },
      { id: 'C', choices: ['so', 'but', 'or', 'because of'], answer: 0, why: 'so (that) ～「～できるように」。母が長くねられるように作る。' },
    ],
    tf: [
      { statement: '筆者の母は、ふだん毎朝5時に起きてお弁当を作っている。', answer: true, why: '第1段落 my mother gets up at five to make lunch boxes。' },
      { statement: '筆者が作ったお弁当は、母のものよりおいしそうに見えた。', answer: false, why: "第2段落 They did not look as good as my mother's。" },
      { statement: '筆者は今、毎週土曜日にお弁当を作っている。', answer: true, why: '第3段落 Now I make the lunch boxes every Saturday。' },
    ],
    qa: [
      { q: 'Why did the writer make the lunch boxes that day?', choices: ['The mother was sick, and the father had to leave early.', 'The writer wanted to win a cooking contest.', 'The brother asked for a special lunch.', 'There was no school lunch that day.'], answer: 0, why: '第1段落 she caught a bad cold / My father had to leave early。' },
    ],
  },
{
    id: 'adv-defaults',
    title: 'The Power of the Default',
    level: '難関大（評論）',
    paragraphs: [
      "When we fill in a form, we rarely notice which boxes are already checked. Yet these pre-selected options, known as defaults, can have an enormous influence on what we end up choosing. Studies of organ donation, for example, have found that countries where people are automatically registered as donors unless they choose otherwise tend to have far higher registration rates than countries where people must actively sign up, ( A ) attitudes toward donation are similar.",
      "Why should something as minor as a pre-checked box matter so much? One reason is inertia: changing an option requires effort, however small, and many people simply do not get around to it. Another is that a default can be read as a quiet recommendation. If an employer automatically enrolls workers in a savings plan, they may assume that the plan is a sensible choice, ( B ) they would otherwise have thought about it carefully.",
      "The economist Richard Thaler and the legal scholar Cass Sunstein used the word \"nudge\" for this kind of gentle influence, which changes behavior without forbidding any options. Supporters argue that well-designed defaults can help people act in their own long-term interest. Critics reply that whoever designs the default holds a kind of hidden power, and that such power should be used openly. Both sides agree on one point: there is no truly neutral form. Every design has to set some default, so the real question is not ( C ) to influence people, but how to do so responsibly.",
    ],
    ja: [
      '書類に記入するとき、どの欄にあらかじめチェックが入っているかに気づくことはめったにない。しかし、デフォルトとよばれるこうした初期設定の選択肢は、私たちが最終的に何を選ぶかに大きな影響をあたえうる。たとえば臓器提供に関する研究では、本人がそうしないと選ばないかぎり自動的に提供者として登録される国は、自分から申しこまなければならない国にくらべて、提供についての考え方が似ているにもかかわらず、登録率がはるかに高い傾向があることがわかっている。',
      'あらかじめチェックされた欄のような小さなことが、なぜそれほど重要なのだろうか。一つの理由は惰性である。選択肢を変えるには、どんなに小さくても手間がかかり、多くの人はただそれをしないままになる。もう一つは、デフォルトがひかえめなおすすめとして受けとられうることだ。会社が働く人を自動的に貯蓄制度に加入させると、働く人はその制度を分別のある選択だと思いこむかもしれない。そうでなければ注意深く考えたかもしれないのに、である。',
      '経済学者リチャード・セイラーと法学者キャス・サンスティーンは、どの選択肢も禁じずに行動を変えるこの種のやわらかな影響を「ナッジ」とよんだ。支持する人々は、よく考えられたデフォルトは人々が長い目で見て自分の利益になるように行動する助けになると主張する。批判する人々は、デフォルトを設計する人はある種の見えない力をもっており、その力は公然と使われるべきだと反論する。両者が一致する点が一つある。本当に中立な書類というものはない、ということだ。どんな設計でも何らかのデフォルトを決めなければならないのだから、本当の問題は人々に影響をあたえるかどうかではなく、どうすれば責任をもってそうできるかなのである。',
    ],
    blanks: [
      { id: 'A', choices: ['even when', 'as soon as', 'so that', 'in case'], answer: 0, why: '「考え方が似ているときでさえ」登録率に差が出る、という譲歩なので even when。' },
      { id: 'B', choices: ['whereas', 'because', 'so', 'unless'], answer: 0, why: '「（デフォルトがなければ）注意深く考えたかもしれないのに」という対比なので whereas。' },
      { id: 'C', choices: ['whether', 'what', 'which', 'that'], answer: 0, why: 'not whether A but how B「A かどうかではなく、どう B するか」。' },
    ],
    tf: [
      { statement: '研究によれば、自動的に提供者として登録される国では、臓器提供の登録率が高い傾向がある。', answer: true, why: '第1段落の内容と合う。' },
      { statement: '筆者によれば、デフォルトは選択肢を禁じることで人の行動を変える。', answer: false, why: '第3段落 changes behavior without forbidding any options。' },
      { statement: '筆者は、どんな書類も完全に中立に作ることができると述べている。', answer: false, why: '第3段落 there is no truly neutral form。' },
    ],
    qa: [
      { q: 'According to the passage, why might people accept a default option?', choices: ['Changing it takes effort, and it may seem like a recommendation.', 'They are not allowed to change it.', 'Default options are always the cheapest.', 'They usually read every option carefully.'], answer: 0, why: '第2段落 inertia / a default can be read as a quiet recommendation。' },
    ],
  },
{
    id: 'toefl-otters-kelp',
    title: 'Sea Otters and Underwater Forests',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Along parts of the North Pacific coast, tall seaweed called kelp forms dense underwater forests. These kelp forests provide food and shelter for many kinds of fish and other sea creatures. Surprisingly, the health of these forests depends to a large extent on a small, furry mammal: the sea otter.",
      "Sea otters eat large numbers of sea urchins, spiny animals that feed on kelp. When otters are present, they keep the number of urchins under control, ( A ) the kelp can grow. In the eighteenth and nineteenth centuries, however, sea otters were hunted for their thick fur until they had disappeared from much of their range. Without otters, urchin populations grew rapidly, and in many places they ate the kelp until little remained. Areas that had once been rich forests became bare sea floors with few other living things.",
      "After sea otters were protected by law in the twentieth century, they gradually returned to some of these coasts. Where they came back, urchin numbers fell and kelp forests began to recover. Ecologists use the term \"keystone species\" for an animal like the sea otter, whose effect on its environment is far greater than its numbers would suggest. Just as a keystone holds an arch together, removing such a species can cause the whole system ( B ) collapse. This example shows that protecting a single species can sometimes protect an entire community of life ( C ).",
    ],
    ja: [
      '北太平洋の海岸の一部では、ケルプとよばれる背の高い海藻が密集した海の中の森を作っている。このケルプの森は、多くの種類の魚やほかの海の生き物にえさとすみかをあたえている。おどろいたことに、この森の健康は、ラッコという毛におおわれた小さなほ乳類に大きくかかっている。',
      'ラッコは、ケルプを食べるとげのある動物、ウニを大量に食べる。ラッコがいると、ウニの数がおさえられるので、ケルプは育つことができる。しかし18世紀から19世紀にかけて、ラッコは厚い毛皮のために狩られ、すんでいた地域の多くから姿を消してしまった。ラッコがいなくなるとウニは急速にふえ、多くの場所でケルプがほとんど残らなくなるまで食べつくした。かつて豊かな森だった場所は、ほかの生き物がほとんどいない、むき出しの海底になってしまった。',
      '20世紀に法律でラッコが保護されると、ラッコは少しずつこうした海岸のいくつかにもどってきた。ラッコがもどった場所では、ウニの数がへり、ケルプの森が回復しはじめた。生態学者は、ラッコのように、その数から想像されるよりもはるかに大きな影響を環境にあたえる動物を「キーストーン種」とよぶ。かなめ石がアーチ全体を支えているように、そのような種をとりのぞくと、しくみ全体がくずれてしまうことがある。この例は、1つの種を守ることが、ときに生き物の共同体全体を守ることにもなることを示している。',
    ],
    blanks: [
      { id: 'A', choices: ['so', 'but', 'or', 'unless'], answer: 0, why: '「ウニがおさえられる、だからケルプが育つ」という結果なので so。' },
      { id: 'B', choices: ['to', 'for', 'of', 'from'], answer: 0, why: 'cause ＋ 目的語 ＋ to ～「…に～させる・～する原因になる」。' },
      { id: 'C', choices: ['as well', 'as if', 'as soon', 'as long'], answer: 0, why: 'as well「～も（同様に）」。文末に置いて「共同体全体も守る」。' },
    ],
    tf: [
      { statement: 'ウニはケルプを食べる。', answer: true, why: '第2段落 sea urchins, spiny animals that feed on kelp。' },
      { statement: 'ラッコがいなくなると、ケルプの森はさらに大きく育った。', answer: false, why: '第2段落 urchin populations grew rapidly, and ... they ate the kelp until little remained。' },
      { statement: 'ラッコが保護されてもどってきた場所では、ケルプの森が回復しはじめた。', answer: true, why: '第3段落の内容と合う。' },
    ],
    qa: [
      { q: 'Why is the sea otter called a "keystone species"?', choices: ['It is the most numerous animal in kelp forests.', 'Its effect is much larger than its numbers suggest.', 'It holds the kelp together like an arch.', 'It was hunted for its thick fur for centuries.'], answer: 1, why: '第3段落に、数から考えられるよりはるかに大きな影響を環境に与える動物をキーストーン種と呼ぶとある。数が多いわけではなく、アーチは生態系全体のたとえで昆布を物理的に支えるのではない。毛皮の狩猟は理由でない。' },
    ],
  },
{
    id: 'hs-lost-boy',
    title: 'A Boy at the Shopping Mall',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last Sunday, I went to a big shopping mall with my mother. While she was buying shoes, I waited near the fountain. Then I noticed a little boy standing alone. He was about four years old, and he was holding a toy car tightly. He looked around again and again, ( A ) he could not find anyone he knew.",
      "I walked over to him and said, \"Are you OK? Where is your mom?\" He did not answer and started to cry. I did not know what to do, but I remembered something my teacher had said: \"When you help a small child, get down to their eye level.\" So I sat down next to him and asked about his toy car. He stopped crying and told me it was a police car. Then I took him to the information desk, and a staff member made an announcement.",
      "A few minutes later, a woman ran to us. \"Kenta!\" she shouted. The boy jumped into her arms. She thanked me again and again. On the way home, I told my mother what had happened. She said, \"You did the right thing.\" I was glad that a small action could make someone feel safe. Since then, I have tried to notice people ( B ) need help, and to act without being ( C ).",
    ],
    ja: [
      'この前の日曜日、私は母と大きなショッピングモールへ行った。母がくつを買っているあいだ、私はふん水の近くで待っていた。そのとき、小さな男の子がひとりで立っているのに気づいた。4歳くらいで、おもちゃの車をぎゅっとにぎっていた。男の子は何度もまわりを見回していたが、知っている人を見つけられなかった。',
      '私は男の子のところへ行って「だいじょうぶ？お母さんはどこ？」と言った。男の子は答えずに泣きだした。どうしたらいいかわからなかったが、先生が言っていたことを思い出した。「小さな子を助けるときは、その子の目の高さまでしゃがみなさい」。そこで私は男の子のとなりにすわって、おもちゃの車のことを聞いた。男の子は泣きやんで、それはパトカーなんだと教えてくれた。それから私は男の子を案内所へ連れていき、係の人が呼び出しの放送をしてくれた。',
      '数分後、ひとりの女性が走ってきた。「ケンタ！」と彼女はさけんだ。男の子は彼女の腕にとびこんだ。女性は何度も何度も私にお礼を言った。帰り道、私は何があったかを母に話した。母は「正しいことをしたね」と言った。小さな行動でだれかを安心させられたことがうれしかった。それ以来、私は助けを必要としている人に気づき、はずかしがらずに行動するよう心がけている。',
    ],
    blanks: [
      { id: 'A', choices: ['but', 'so', 'because', 'if'], answer: 0, why: '「何度も見回した、しかし見つけられなかった」という逆接なので but。' },
      { id: 'B', choices: ['who', 'which', 'whose', 'what'], answer: 0, why: '先行詞 people（人）を説明する主格の関係代名詞 who。' },
      { id: 'C', choices: ['shy', 'shyly', 'shyness', 'to shy'], answer: 0, why: 'without being ～「～にならずに」。being のあとは形容詞 shy。' },
    ],
    tf: [
      { statement: '男の子は、おもちゃのパトカーを持っていた。', answer: true, why: '第1・2段落 holding a toy car / it was a police car。' },
      { statement: '筆者は男の子の前に立ったまま話しかけ続けた。', answer: false, why: '第2段落 I sat down next to him（目の高さまでしゃがんだ）。' },
      { statement: '係の人が放送をして、男の子の母親が見つかった。', answer: true, why: '第2・3段落の内容と合う。' },
    ],
    qa: [
      { q: 'What did the writer remember from the teacher?', choices: ['To get down to a small child\'s eye level.', 'To call the police right away.', 'To give the child some candy.', 'To ask the child to wait alone.'], answer: 0, why: '第2段落 get down to their eye level。' },
    ],
  },
{
    id: 'adv-survivorship',
    title: 'The Planes That Did Not Return',
    level: '難関大（評論）',
    paragraphs: [
      "A well-known story from the Second World War concerns the statistician Abraham Wald. Military officials studied the bombers that came back from missions and noted where they had been hit by enemy fire. The bullet holes were concentrated on the wings and the body, so the officials proposed adding armor to those areas. Wald argued the opposite. The planes they were examining were the ones that had survived; the places where returning planes showed no damage, ( A ) the engines, were probably the places where a hit brought a plane down.",
      "This error of reasoning is now known as survivorship bias: drawing conclusions from the examples that remain visible while ignoring those that have disappeared. It appears in many areas of life. We hear about the few people who left school and became rich, but not about the many ( B ) did the same and failed. We admire old buildings for their durability, forgetting that poorly built ones from the same period have long since collapsed.",
      "Survivorship bias is difficult to notice precisely because the missing evidence is, by definition, missing. Guarding against it therefore requires a deliberate question: what am I not seeing, and why? Asking this does not guarantee a correct answer, but it reminds us that the data in front of us may have been filtered in ways that make success look more common, or more predictable, ( C ) it really is.",
    ],
    ja: [
      '第二次世界大戦のよく知られた話に、統計学者エイブラハム・ウォールドにまつわるものがある。軍の担当者たちは任務からもどってきた爆撃機を調べ、どこに敵の弾が当たっていたかを記録した。弾の穴は翼と胴体に集中していたので、担当者たちはそうした部分に装甲を加えることを提案した。ウォールドは反対のことを主張した。彼らが調べていたのは生きのびた機体であり、もどってきた機体に損傷が見られない場所、たとえばエンジンこそ、当たると機体が墜落してしまう場所だったのだろう、と。',
      'このような推論の誤りは、今では生存者バイアスとして知られている。見えるまま残っている例から結論を引き出し、消えてしまった例を無視してしまうことである。これは生活のさまざまな場面にあらわれる。学校をやめてお金持ちになった少数の人のことは耳にするが、同じことをして失敗した多くの人のことは耳にしない。古い建物の丈夫さに感心するが、同じ時代のつくりの悪い建物はとっくにくずれ落ちていることを忘れている。',
      '生存者バイアスに気づきにくいのは、欠けている証拠が、その定義からして欠けているからにほかならない。そのため、これを防ぐには意識的な問いが必要になる。自分には何が見えていないのか、そしてそれはなぜか。この問いを立てても正しい答えが保証されるわけではないが、目の前のデータが、成功を実際よりもありふれたものに、あるいは予測しやすいものに見せるようなしかたでふるい分けられているかもしれないことを、思い出させてくれるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['such as', 'as if', 'even though', 'so that'], answer: 0, why: '具体例を挙げる such as ～「たとえば～」。' },
      { id: 'B', choices: ['who', 'which', 'whose', 'what'], answer: 0, why: '先行詞 the many (people)（人）を説明する主格の関係代名詞 who。' },
      { id: 'C', choices: ['than', 'as', 'that', 'so'], answer: 0, why: 'more common, or more predictable, than ～ と比較級に続く than。' },
    ],
    tf: [
      { statement: '担当者たちは、弾の穴が多い翼と胴体に装甲を加えることを提案した。', answer: true, why: '第1段落の内容と合う。' },
      { statement: 'ウォールドは、もどってきた機体の損傷がない場所こそ大切だと考えた。', answer: true, why: '第1段落 the places where returning planes showed no damage ... were probably the places where a hit brought a plane down。' },
      { statement: '筆者によれば、生存者バイアスは、欠けている証拠がはっきり見えるので気づきやすい。', answer: false, why: '第3段落 difficult to notice precisely because the missing evidence is ... missing。' },
    ],
    qa: [
      { q: 'What question does the writer suggest asking to guard against survivorship bias?', choices: ['What am I not seeing, and why?', 'Who is the most successful person?', 'How many planes came back?', 'Which building is the oldest?'], answer: 0, why: '第3段落 what am I not seeing, and why?' },
    ],
  },
{
    id: 'toefl-tree-rings',
    title: 'Reading the Past in Tree Rings',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "When a tree is cut down, its trunk often reveals a pattern of circles. In regions with distinct seasons, a tree typically adds one ring each year. In spring and early summer, it grows quickly and produces wide, light-colored wood; later in the year, growth slows and the wood becomes narrower and darker. ( A ) a result, each pair of light and dark bands marks a single year of the tree's life.",
      "Because growth depends on conditions such as rainfall and temperature, the width of the rings varies from year to year. Wide rings usually indicate favorable years, while narrow ones suggest drought or cold. Scientists who study tree rings, a field called dendrochronology, compare these patterns across many trees. Trees in the same region tend to show similar sequences of wide and narrow rings, ( B ) allows researchers to match the patterns of living trees with those of old timber found in buildings or buried in the ground.",
      "By linking overlapping patterns from younger and older wood, researchers have built continuous records that extend back thousands of years. These records can be used to date wooden objects precisely and to reconstruct past climates in places ( C ) no written weather records exist. In this way, a simple cross-section of a tree can become a detailed archive of the environment it lived through.",
    ],
    ja: [
      '木が切りたおされると、幹にはしばしば円のもようがあらわれる。季節がはっきりしている地域では、木はふつう1年に1つの輪をふやす。春から初夏にかけては速く育ち、幅が広く色のうすい材を作る。その年の後半になると成長がおそくなり、材は細く色がこくなる。その結果、うすい帯とこい帯の1組が、木の一生の1年を示すことになる。',
      '成長は雨の量や気温などの条件に左右されるので、年輪の幅は年ごとに変わる。幅の広い輪はふつう条件のよい年を、細い輪は干ばつや寒さを示している。年輪を研究する科学者たちは、年輪年代学とよばれるこの分野で、多くの木のもようをくらべる。同じ地域の木は、広い輪と細い輪の似た並び方を示す傾向があり、そのおかげで研究者は、生きている木のもようを、建物に使われていたり地中にうまっていたりした古い木材のもようと照らし合わせることができる。',
      '若い木と古い木の重なり合うもようをつなげることで、研究者たちは何千年も前までさかのぼる切れ目のない記録を作り上げてきた。こうした記録は、木でできた物の年代を正確に決めたり、天気の記録が書き残されていない場所の過去の気候を復元したりするのに使える。このようにして、木の単純な断面が、その木が生きた環境についてのくわしい記録保管所になりうるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['As', 'For', 'In', 'By'], answer: 0, why: 'As a result「その結果」。' },
      { id: 'B', choices: ['which', 'that', 'what', 'it'], answer: 0, why: 'コンマのあとで前の内容全体を受ける非制限用法の which。that はコンマのあとに使えない。' },
      { id: 'C', choices: ['where', 'which', 'when', 'what'], answer: 0, why: '先行詞 places（場所）のあとに文が続くので関係副詞 where。' },
    ],
    tf: [
      { statement: '季節がはっきりした地域では、木はふつう1年に1つの年輪をふやす。', answer: true, why: '第1段落 a tree typically adds one ring each year。' },
      { statement: '幅の広い年輪は、ふつう干ばつの年を示す。', answer: false, why: '第2段落 Wide rings usually indicate favorable years。' },
      { statement: '年輪の記録は、書き残された天気の記録がない場所の気候を知るのにも使える。', answer: true, why: '第3段落の内容と合う。' },
    ],
    qa: [
      { q: 'Why can researchers match living trees with old timber?', choices: ['Trees in the same region show similar ring patterns.', 'All trees grow at exactly the same speed.', 'Old timber has no rings.', 'Each tree has a written record.'], answer: 0, why: '第2段落 Trees in the same region tend to show similar sequences ... which allows researchers to match the patterns。' },
    ],
  },
{
    id: 'hs-custodian',
    title: 'The Person Who Keeps Our School Running',
    level: '高校入試（体験文）',
    paragraphs: [
      "Our class makes a school newspaper every month. Last month, I was asked to interview someone at our school. Most of my classmates chose teachers, but I decided to interview Mr. Ito, the school custodian. I saw him every day, but I knew almost nothing ( A ) him.",
      "Mr. Ito told me that he comes to school at six thirty every morning, two hours before most students arrive. He opens the gates, checks the heaters in winter, and fixes broken desks and chairs. \"Last week, I repaired five chairs in Class 2-B,\" he said with a smile. I was surprised. I had sat on one of those chairs, but I had never wondered ( B ) fixed it.",
      "At the end of the interview, I asked him what makes him happy. He answered, \"When students say 'Good morning' to me.\" My article was printed in the newspaper, and many students read it. Now, more students greet Mr. Ito in the morning. I learned that many people work hard for us where we cannot see them, and that a few kind words ( C ) make them happy.",
    ],
    ja: [
      '私たちのクラスは毎月、学校新聞を作っている。先月、私は学校のだれかにインタビューするよう頼まれた。クラスメートのほとんどは先生を選んだが、私は学校の用務員の伊藤さんにインタビューすることにした。毎日伊藤さんを見かけていたが、伊藤さんについてほとんど何も知らなかった。',
      '伊藤さんは、毎朝6時半、ほとんどの生徒が来る2時間前に学校に来ると話してくれた。門を開け、冬には暖房を点検し、こわれた机やいすを直している。「先週は2年B組のいすを5つ直したよ」と伊藤さんはほほえみながら言った。私はおどろいた。私はそのいすの1つにすわっていたのに、だれが直したのか考えたこともなかったのだ。',
      'インタビューの最後に、私は伊藤さんに何がうれしいかをたずねた。伊藤さんは「生徒が『おはようございます』と言ってくれるときだね」と答えた。私の記事は新聞にのり、多くの生徒が読んでくれた。今では、朝に伊藤さんにあいさつする生徒がふえている。私は、見えないところで私たちのために一生けんめい働いている人がたくさんいること、そして少しのやさしい言葉でその人たちをうれしい気持ちにできることを学んだ。',
    ],
    blanks: [
      { id: 'A', choices: ['about', 'with', 'for', 'at'], answer: 0, why: 'know nothing about ～「～について何も知らない」。' },
      { id: 'B', choices: ['who', 'which', 'whose', 'where'], answer: 0, why: 'wondered who fixed it「だれが直したのか」。who が主語になる間接疑問。' },
      { id: 'C', choices: ['can', 'must', 'should', 'had to'], answer: 0, why: '「うれしい気持ちにできる」という可能を表すので can。' },
    ],
    tf: [
      { statement: 'クラスメートのほとんどは、先生にインタビューした。', answer: true, why: '第1段落 Most of my classmates chose teachers。' },
      { statement: '伊藤さんは、毎朝ほとんどの生徒より2時間早く学校に来る。', answer: true, why: '第2段落 two hours before most students arrive。' },
      { statement: '記事がのったあと、伊藤さんにあいさつする生徒はへった。', answer: false, why: '第3段落 more students greet Mr. Ito in the morning。' },
    ],
    qa: [
      { q: 'What makes Mr. Ito happy?', choices: ['When students say "Good morning" to him.', 'When he gets a new chair.', 'When the school is closed.', 'When he reads the newspaper.'], answer: 0, why: '第3段落 "When students say \'Good morning\' to me."' },
    ],
  },
{
    id: 'adv-explanatory-depth',
    title: 'Do We Really Know How It Works?',
    level: '難関大（評論）',
    paragraphs: [
      "Most of us feel that we understand how everyday objects work. Ask people whether they know how a zipper or a flush toilet works, and they will probably say yes with some confidence. In studies published in the early 2000s, psychologists asked people to rate their understanding of such objects and then to write a detailed, step-by-step explanation of how each one works. ( A ) trying to explain, many participants lowered their ratings sharply. They had mistaken familiarity for knowledge.",
      "Psychologists call this the illusion of explanatory depth. It arises partly because we can see the parts of many objects, and seeing feels like understanding. It is also encouraged by the way knowledge is shared in a society: we rely on experts, manuals, and repair shops, so we rarely need to know the details ourselves. Living in such a community of knowledge is efficient, ( B ) it makes it easy to confuse what others know with what we know.",
      "The illusion matters beyond zippers. Later research found that people with strong opinions on policy questions often became less extreme after being asked to explain, step by step, how a proposed policy would actually work. Simply listing reasons for their position did not have the same effect. Explaining a mechanism, it seems, forces us to face the gaps in our own knowledge, ( C ) can make us more modest and more open to other views.",
    ],
    ja: [
      '私たちのほとんどは、身の回りの物がどう動くのかをわかっていると感じている。ファスナーや水洗トイレのしくみを知っているかとたずねれば、人はたぶん、ある程度の自信をもって「はい」と答えるだろう。2000年代の初めに発表された研究で、心理学者たちは人々に、そうした物についての自分の理解度を評価してもらい、そのあとで、それぞれがどう動くのかを順を追ってくわしく説明する文を書いてもらった。説明しようとしたあと、多くの参加者は評価を大きく下げた。見なれていることを、知っていることと取りちがえていたのである。',
      '心理学者たちは、これを「説明深度の錯覚」とよぶ。この錯覚が生じる理由の1つは、多くの物の部品が目に見えることであり、見えることは理解しているように感じさせる。また、社会の中での知識の分け合い方も、この錯覚をうながしている。私たちは専門家や説明書、修理店にたよっているので、自分でくわしいことを知る必要はめったにない。そのような知識の共同体の中で暮らすのは効率がよいが、他人が知っていることと自分が知っていることを取りちがえやすくもなる。',
      'この錯覚は、ファスナーの話にとどまらない。その後の研究では、政策の問題について強い意見をもつ人々が、提案された政策が実際にどのように働くのかを順を追って説明するよう求められると、意見が極端でなくなることが多いとわかった。自分の立場の理由を並べるだけでは、同じ効果はなかった。どうやら、しくみを説明することで、私たちは自分の知識のすき間に向き合わざるをえなくなり、それによって、より謙虚になり、ほかの考えも受け入れやすくなるようだ。',
    ],
    blanks: [
      { id: 'A', choices: ['After', 'During', 'Unless', 'Because'], answer: 0, why: 'After trying to explain「説明しようとしたあと」。During・Because のあとに動詞の ～ing は置けず、Unless では意味が通らない。' },
      { id: 'B', choices: ['but', 'so', 'unless', 'until'], answer: 0, why: '「効率がよい」と「取りちがえやすい」は反対の内容なので逆接の but。' },
      { id: 'C', choices: ['which', 'that', 'what', 'it'], answer: 0, why: 'コンマのあとで前の内容全体を受ける非制限用法の which。that はコンマのあとに使えない。' },
    ],
    tf: [
      { statement: '研究の参加者の多くは、説明を書こうとしたあとで、自分の理解度の評価を下げた。', answer: true, why: '第1段落 many participants lowered their ratings sharply。' },
      { statement: '筆者は、専門家や説明書にたよる社会のしくみは効率が悪いと述べている。', answer: false, why: '第2段落 Living in such a community of knowledge is efficient。' },
      { statement: '自分の意見の理由を並べるだけでも、意見は同じようにおだやかになった。', answer: false, why: '第3段落 Simply listing reasons ... did not have the same effect。' },
      { statement: 'しくみを説明すると、自分の知識のすき間に気づかされる。', answer: true, why: '第3段落 forces us to face the gaps in our own knowledge。' },
    ],
    qa: [
      { q: 'According to the passage, what had the participants mistaken for knowledge?', choices: ['Familiarity', 'Confidence in experts', 'Written manuals', 'Strong opinions'], answer: 0, why: '第1段落 They had mistaken familiarity for knowledge.' },
    ],
  },
{
    id: 'toefl-permafrost',
    title: 'The Ground That Never Thaws',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "In the far north of the planet, much of the ground never fully thaws. Scientists use the term permafrost for ground that remains at or below zero degrees Celsius for at least two years in a row. Permafrost lies beneath roughly a quarter of the land in the Northern Hemisphere, including large parts of Siberia, Alaska, and northern Canada. Above it lies the so-called active layer, a shallow zone of soil ( A ) thaws each summer and freezes again each winter.",
      "Because the cold slows decay, permafrost has preserved enormous quantities of organic material: the remains of plants and animals that froze before they could break down. When permafrost thaws, microbes become active and begin to decompose this material, ( B ) carbon dioxide and methane into the atmosphere. Since both are greenhouse gases, their release can contribute to further warming, which in turn causes more thawing.",
      "Thawing also causes practical problems. Much of the ground's strength comes from the ice that binds the soil together. When the ice melts, the ground can sink unevenly, damaging roads, buildings, and pipelines built on top of it. ( C ), engineers in permafrost regions sometimes raise buildings on posts so that heat from inside does not reach the frozen ground.",
    ],
    ja: [
      '地球のはるか北のほうでは、地面の多くが完全にとけることはない。科学者たちは、少なくとも2年続けて0度以下のままの地面を「永久凍土」とよぶ。永久凍土は北半球の陸地のおよそ4分の1の下に広がっており、シベリア、アラスカ、カナダ北部の広い地域もふくまれる。その上には、いわゆる活動層がある。これは毎年夏にとけ、冬にまたこおる浅い土の層である。',
      '寒さが分解をおそくするため、永久凍土には、ばく大な量の有機物、つまり分解される前にこおった植物や動物のなきがらが保存されてきた。永久凍土がとけると、微生物が活動を始め、この物質を分解しはじめて、二酸化炭素やメタンを大気中に放出する。どちらも温室効果ガスなので、それらが放出されるとさらなる温暖化につながりうる。そしてその温暖化が、さらに凍土をとかすのである。',
      'とけることは、実際的な問題も引き起こす。地面の強さの多くは、土をつなぎとめている氷から来ている。氷がとけると地面がでこぼこにしずむことがあり、その上に作られた道路や建物、パイプラインがこわれてしまう。こうした理由から、永久凍土の地域の技術者たちは、建物の中の熱がこおった地面に届かないように、建物を柱の上に高く持ち上げて建てることがある。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'where', 'what', 'whose'], answer: 0, why: '先行詞 soil を受け、あとの thaws の主語になる関係代名詞 which。where のあとには主語のある文が必要。' },
      { id: 'B', choices: ['releasing', 'released', 'release', 'releases'], answer: 0, why: 'コンマのあとで「そして～を放出する」と結果を表す分詞構文 releasing。' },
      { id: 'C', choices: ['For this reason', 'However', 'In contrast', 'Otherwise'], answer: 0, why: '「地面がしずんで建物がこわれる」→「だから建物を持ち上げる」という因果関係。' },
    ],
    tf: [
      { statement: '永久凍土とは、少なくとも2年続けて0度以下のままの地面のことである。', answer: true, why: '第1段落の定義と合う。' },
      { statement: '活動層は、1年中こおったままである。', answer: false, why: '第1段落 thaws each summer and freezes again each winter。' },
      { statement: '永久凍土がとけると、温室効果ガスが出ることがある。', answer: true, why: '第2段落 carbon dioxide and methane ... greenhouse gases。' },
      { statement: '永久凍土の地域では、建物を地面に直接建てるのがよいとされている。', answer: false, why: '第3段落 raise buildings on posts。' },
    ],
    qa: [
      { q: 'Why do engineers sometimes raise buildings on posts in permafrost regions?', choices: ['To keep greenhouse gases from entering the buildings.', 'To let the ground below thaw more evenly.', 'To make room for pipelines under the buildings.', 'To stop heat from inside reaching the frozen ground.'], answer: 3, why: '第3段落に、建物の中の熱が凍った地面に届かないように柱で持ち上げるとある。目的は地面を解かさないことなので、均一に解かすというのは逆。温室効果ガスや配管のための空間は述べられていない。' },
    ],
  },
{
    id: 'hs-homestay',
    title: 'Two Weeks in Australia',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last summer, I stayed with a host family in Australia for two weeks. Before I left Japan, I studied English very hard. But on the first night, I could not understand ( A ) my host mother said at dinner. She spoke so fast that I just smiled and said \"Yes\" to everything.",
      "The next day, my host brother Liam asked me, \"Do you want to go swimming?\" I said \"Yes\" again, but I cannot swim well! At the beach, I had to tell him the truth. Liam laughed and said, \"You should say no when you mean no.\" From then on, I tried to ask questions ( B ) I did not understand something.",
      "By the end of my stay, I could talk with my host family much more easily. My English did not become perfect in two weeks, but I learned something important. Speaking a foreign language is not about being perfect. It is about trying to understand each other. Now I am ( C ) to visiting Australia again someday.",
    ],
    ja: [
      '去年の夏、私はオーストラリアのホストファミリーの家に2週間滞在した。日本を出発する前、私は英語をとても一生けんめい勉強した。しかし最初の夜、夕食のときにホストマザーが言ったことが理解できなかった。彼女があまりに速く話すので、私はただほほえんで、何にでも「イエス」と言っていた。',
      '次の日、ホストブラザーのリアムが「泳ぎに行きたい？」とたずねた。私はまた「イエス」と言ったが、私はうまく泳げないのだ！ 浜辺で、私は本当のことを言わなければならなかった。リアムは笑って「ちがうときは『ノー』と言わなきゃ」と言った。それからは、何かわからないことがあるときは質問するようにした。',
      '滞在の終わりには、ホストファミリーとずっと楽に話せるようになっていた。私の英語は2週間で完ぺきにはならなかったが、大切なことを学んだ。外国語を話すことは、完ぺきであることではない。おたがいを理解しようとすることなのだ。今、私はいつかまたオーストラリアをおとずれるのを楽しみにしている。',
    ],
    blanks: [
      { id: 'A', choices: ['what', 'that', 'which', 'who'], answer: 0, why: '「～が言ったこと」は関係代名詞 what（＝the thing which）。' },
      { id: 'B', choices: ['when', 'so', 'but', 'than'], answer: 0, why: '「わからないことがあるときは」なので when。' },
      { id: 'C', choices: ['looking forward', 'looked forward', 'looking for', 'look forward'], answer: 0, why: 'be looking forward to ～ing「～するのを楽しみにしている」。' },
    ],
    tf: [
      { statement: '筆者はオーストラリアで2週間ホームステイをした。', answer: true, why: '第1段落 for two weeks。' },
      { statement: '最初の夜、筆者はホストマザーの話がよくわかった。', answer: false, why: '第1段落 I could not understand。' },
      { statement: '筆者は泳ぐのがとても得意だった。', answer: false, why: '第2段落 I cannot swim well。' },
      { statement: 'リアムは、ちがうときは「ノー」と言うべきだと言った。', answer: true, why: '第2段落 You should say no when you mean no.' },
    ],
    qa: [
      { q: 'What did the writer learn during the stay?', choices: ['Speaking a foreign language is about trying to understand each other.', 'You have to speak a foreign language perfectly.', 'You should always say yes to your host family.', 'Swimming is the most popular sport in Australia.'], answer: 0, why: '第3段落 It is about trying to understand each other.' },
    ],
  },
{
    id: 'adv-endowment',
    title: 'Why We Overvalue What We Own',
    level: '難関大（評論）',
    paragraphs: [
      "Imagine you are given a coffee mug as a gift. A few minutes later, someone offers to buy it from you. How much would you ask for? In a well-known series of experiments, researchers gave mugs to half of the participants and allowed the other half to buy them. The owners typically asked for roughly twice as much money as the buyers were willing to pay, ( A ) the two groups had been chosen at random.",
      "Psychologists call this tendency the endowment effect: we place a higher value on things simply because they belong to us. One explanation is that giving something up feels like a loss, and losses tend to weigh more heavily on our minds than gains of the same size. ( B ), the pain of parting with the mug outweighs the pleasure of receiving the money.",
      "The effect helps explain some everyday puzzles, such as why people keep clothes they never wear, or why homeowners often ask for prices that buyers find unrealistic. Being aware of it does not make it disappear, but it can prompt a useful question when we are deciding whether to keep something: would I buy this item today ( C ) I did not already own it?",
    ],
    ja: [
      'プレゼントとしてマグカップをもらったところを想像してほしい。数分後、だれかがそれを買い取りたいと申し出る。あなたはいくらを求めるだろうか。よく知られた一連の実験で、研究者たちは参加者の半分にマグカップをわたし、残りの半分にはそれを買えるようにした。2つのグループは無作為に選ばれていたにもかかわらず、持ち主たちはふつう、買い手が払ってもよいと思う金額のおよそ2倍を求めた。',
      '心理学者はこの傾向を「保有効果」とよぶ。私たちは、物が自分のものだというだけで、それにより高い価値をつけるのである。1つの説明は、何かを手放すことは損失のように感じられ、損失は同じ大きさの得よりも心に重くのしかかりやすい、というものだ。言いかえれば、マグカップを手放す痛みが、お金を受け取るよろこびを上回るのである。',
      'この効果は、日常のいくつかのなぞを説明する助けになる。たとえば、人がまったく着ない服を取っておく理由や、家の持ち主が買い手には非現実的だと思われる値段をつけがちな理由である。この効果を知っていてもそれが消えるわけではないが、何かを手元に残すかどうか決めるときに、役に立つ問いをうながしてくれる。「もしまだ持っていなかったとしたら、今日これを買うだろうか」という問いである。',
    ],
    blanks: [
      { id: 'A', choices: ['even though', 'because', 'so that', 'unless'], answer: 0, why: '「無作為に選ばれていた（＝差はないはず）のに、2倍の値段をつけた」という逆接なので even though。' },
      { id: 'B', choices: ['In other words', 'On the other hand', 'For example', 'Instead'], answer: 0, why: '直前の「損失は得より重く感じる」を、マグカップの例で言いかえているので In other words。' },
      { id: 'C', choices: ['if', 'unless', 'whether', 'though'], answer: 0, why: '「もし持っていなかったら」という仮定（仮定法過去）なので if。' },
    ],
    tf: [
      { statement: '実験では、マグカップの持ち主は、買い手が払ってもよいと思う金額のおよそ2倍を求めた。', answer: true, why: '第1段落 roughly twice as much money as the buyers were willing to pay。' },
      { statement: '筆者によると、損失は同じ大きさの得よりも軽く感じられやすい。', answer: false, why: '第2段落 losses tend to weigh more heavily on our minds than gains。' },
      { statement: '保有効果は、それを知るだけで消える。', answer: false, why: '第3段落 Being aware of it does not make it disappear。' },
      { statement: '筆者は、物を手元に残すか決めるときに役立つ問いを示している。', answer: true, why: '第3段落の最後の問いと合う。' },
    ],
    qa: [
      { q: 'According to the passage, why do people tend to value their own things more highly?', choices: ['Because giving something up feels like a loss.', 'Because their own things are always rarer.', 'Because buyers usually lie about prices.', 'Because owners always need more money.'], answer: 0, why: '第2段落 giving something up feels like a loss。' },
    ],
  },
{
    id: 'toefl-tsunami',
    title: 'How Tsunamis Form',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "A tsunami is a series of ocean waves usually caused by a sudden movement of the seafloor. Most tsunamis are triggered by large undersea earthquakes, ( A ) a section of the seafloor is pushed up or dropped down, moving a huge volume of water above it. Landslides and volcanic eruptions can also produce tsunamis, though less often.",
      "In the deep ocean, a tsunami can travel at roughly the speed of a jet airplane, yet its height at the surface is often less than a meter. For this reason, ships far out at sea may hardly notice it passing beneath them. ( B ), as the waves enter shallow water near the coast, they slow down and grow dramatically taller, sometimes reaching many meters in height.",
      "Before a tsunami strikes, the sea sometimes pulls back from the shore, exposing parts of the seafloor. This can be a natural warning, but people who walk out to look at the unusual sight put themselves in great danger. Today, many countries rely on warning systems that combine earthquake data with sensors on the ocean floor, ( C ) gives coastal communities valuable minutes to move to higher ground.",
    ],
    ja: [
      '津波とは、ふつう海底が急に動くことで起こる、ひと続きの海の波である。津波の多くは海底の大きな地震によって引き起こされ、そうした地震では海底の一部が押し上げられたり落ちこんだりして、その上にある大量の水が動かされる。地すべりや火山の噴火も、それほど多くはないが津波を起こすことがある。',
      '深い海では、津波はジェット機とほぼ同じくらいの速さで進むことがあるが、海面での高さは1メートルに満たないことが多い。このため、沖にいる船は、津波が下を通りすぎてもほとんど気づかないことがある。しかし、波が海岸近くの浅い海に入ると、速さがおそくなり、高さが急激に高くなって、ときには何メートルにも達する。',
      '津波が来る前に、海が岸から引いて、海底の一部があらわれることがある。これは自然の警告になりうるが、そのめずらしい光景を見に歩いて出ていく人は、自分の身を大きな危険にさらすことになる。今日、多くの国が、地震のデータと海底のセンサーを組み合わせた警報システムにたよっており、それによって沿岸の地域社会は高い場所へ移動するための貴重な数分間を得られる。',
    ],
    blanks: [
      { id: 'A', choices: ['in which', 'which', 'what', 'where it'], answer: 0, why: 'earthquakes を受けて「その地震では～」と、あとに完全な文が続くので前置詞＋関係代名詞の in which。' },
      { id: 'B', choices: ['However', 'Therefore', 'For example', 'Similarly'], answer: 0, why: '「沖では低い」→「しかし浅い海では高くなる」という逆接なので However。' },
      { id: 'C', choices: ['which', 'that', 'what', 'it'], answer: 0, why: 'コンマのあとで前の内容全体を受ける非制限用法の which。that はコンマのあとに使えない。' },
    ],
    tf: [
      { statement: '津波の多くは、海底の大きな地震によって起こる。', answer: true, why: '第1段落 Most tsunamis are triggered by large undersea earthquakes。' },
      { statement: '深い海では、津波の波はとても高い。', answer: false, why: '第2段落 its height at the surface is often less than a meter。' },
      { statement: '浅い海に入ると、津波の速さはおそくなる。', answer: true, why: '第2段落 they slow down and grow dramatically taller。' },
      { statement: '海が岸から引いたら、近くまで行って見ても安全だ。', answer: false, why: '第3段落 put themselves in great danger。' },
    ],
    qa: [
      { q: 'Why may ships far out at sea hardly notice a tsunami?', choices: ['Because its height at the surface is often small.', 'Because it moves very slowly in deep water.', 'Because ships always sail near the coast.', 'Because it only happens at night.'], answer: 0, why: '第2段落 its height at the surface is often less than a meter. For this reason, ships ... may hardly notice it。' },
    ],
  },
{
    id: 'hs-grandma-field',
    title: "My Grandmother's Vegetables (Speech)",
    level: '高校入試（スピーチ）',
    paragraphs: [
      "Hello, everyone. Today I want to talk about my grandmother and the vegetables she grows. Every summer, I visit her house in the country. She has a small field behind her house, and she grows tomatoes, cucumbers, and eggplants there. Last summer, she asked me to help her, so I worked in the field with her ( A ) a week.",
      "At first, I thought it would be easy. But it was very hot, and pulling weeds was hard work. My back hurt after only one hour. My grandmother has done this work every day for more than forty years. I was surprised and asked her, \"Why do you keep working so hard?\" She smiled and said, \"Because my vegetables make people ( B ).\"",
      "On my last day, we cooked dinner with the vegetables we picked. They were the most delicious vegetables I have ever eaten. Now, when I buy vegetables at the supermarket, I think about the people who grew them. I want to say \"thank you\" to them ( C ) I eat. Thank you for listening.",
    ],
    ja: [
      'みなさん、こんにちは。今日は、私の祖母と、祖母が育てている野菜について話したいと思います。毎年夏、私はいなかにある祖母の家をおとずれます。祖母は家の裏に小さな畑を持っていて、そこでトマトやきゅうり、なすを育てています。去年の夏、祖母に手伝ってほしいとたのまれたので、私は1週間、祖母といっしょに畑で働きました。',
      'はじめは、かんたんだろうと思っていました。でも、とても暑く、草取りは大変な仕事でした。たった1時間で腰が痛くなりました。祖母は40年以上、この仕事を毎日続けています。私はおどろいて「どうしてそんなに一生けんめい働き続けるの？」とたずねました。祖母はほほえんで「わたしの野菜で、みんながうれしくなるからだよ」と言いました。',
      '最後の日、私たちはとった野菜で夕食を作りました。それは、私が今までに食べた中でいちばんおいしい野菜でした。今では、スーパーで野菜を買うとき、それを育てた人たちのことを考えます。食べるたびに、その人たちに「ありがとう」と言いたいと思います。ご清聴ありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'since', 'until', 'by'], answer: 0, why: 'for a week「1週間」。期間の長さは for。' },
      { id: 'B', choices: ['happy', 'happily', 'happiness', 'to happy'], answer: 0, why: 'make ＋人＋形容詞「人を～にする」。' },
      { id: 'C', choices: ['whenever', 'unless', 'until', 'though'], answer: 0, why: '「食べるたびに」なので whenever。' },
    ],
    tf: [
      { statement: '筆者は毎年夏に祖母の家をおとずれる。', answer: true, why: '第1段落 Every summer, I visit her house in the country.' },
      { statement: '畑の仕事は、筆者が思っていたより楽だった。', answer: false, why: '第2段落 pulling weeds was hard work。' },
      { statement: '祖母は40年以上、毎日畑の仕事をしている。', answer: true, why: '第2段落 every day for more than forty years。' },
      { statement: '筆者はスーパーで野菜を買うのをやめた。', answer: false, why: '第3段落 when I buy vegetables at the supermarket, I think about the people who grew them。' },
    ],
    qa: [
      { q: 'Why does the grandmother keep working so hard?', choices: ['Because her vegetables make people happy.', 'Because she needs a lot of money.', 'Because she does not like cooking.', 'Because the writer asked her to.'], answer: 0, why: '第2段落 Because my vegetables make people happy.' },
    ],
  },
{
    id: 'adv-spacing',
    title: 'Why Cramming Fails',
    level: '難関大（評論）',
    paragraphs: [
      "In the 1880s, the German psychologist Hermann Ebbinghaus tested his own memory by learning long lists of meaningless syllables. He found that forgetting happens quickly at first and then more slowly. He also noticed something useful: lists that he studied over several days stayed in his memory much longer than lists he studied the same number of times ( A ) a single session.",
      "This finding, now called the spacing effect, has been confirmed in many later studies. Yet students often prefer cramming, studying intensively just before a test. Cramming can feel effective because the material seems familiar right afterward. ( B ), much of what is learned this way fades within days.",
      "Why should spacing help? One explanation is that when we return to material we have partly forgotten, recalling it takes effort, and that effort strengthens the memory. In other words, a little forgetting between study sessions is not a failure ( C ) part of the learning process itself.",
    ],
    ja: [
      '1880年代、ドイツの心理学者ヘルマン・エビングハウスは、意味のない音のつながりを並べた長いリストを覚えることで、自分自身の記憶を調べた。彼は、忘れることは最初は急速に起こり、その後はゆっくりになることを発見した。また、役に立つことにも気づいた。何日かに分けて学習したリストは、同じ回数を1回の学習でまとめて学んだリストよりも、ずっと長く記憶に残ったのである。',
      'この発見は、今では「分散効果」とよばれ、その後の多くの研究で確かめられてきた。それなのに、学生はしばしば一夜づけ、つまりテストの直前に集中して勉強することを好む。一夜づけは、学んだ直後には内容になじみがあるように感じられるため、効果的に思えることがある。残念ながら、このようにして学んだことの多くは数日のうちに消えてしまう。',
      'なぜ間をあけることが役に立つのだろうか。1つの説明は、少し忘れかけた内容にもどってくると、それを思い出すのに努力が必要になり、その努力が記憶を強めるというものだ。言いかえれば、学習と学習のあいだに少し忘れることは、失敗ではなく、学習の過程そのものの一部なのである。',
    ],
    blanks: [
      { id: 'A', choices: ['in', 'by', 'to', 'with'], answer: 0, why: 'in a single session「1回の学習で」。' },
      { id: 'B', choices: ['Unfortunately', 'Therefore', 'For instance', 'Similarly'], answer: 0, why: '「効果的に思える」→「残念ながら数日で消える」という逆の流れなので Unfortunately。' },
      { id: 'C', choices: ['but', 'or', 'so', 'nor'], answer: 0, why: 'not A but B「A ではなく B」。' },
    ],
    tf: [
      { statement: 'エビングハウスは、意味のない音のつながりを使って自分の記憶を調べた。', answer: true, why: '第1段落 learning long lists of meaningless syllables。' },
      { statement: '何日かに分けて学習したリストのほうが、早く忘れられた。', answer: false, why: '第1段落 stayed in his memory much longer。' },
      { statement: '一夜づけで学んだことの多くは、数日のうちに消えてしまう。', answer: true, why: '第2段落 much of what is learned this way fades within days。' },
      { statement: '筆者は、学習の合間に少し忘れることは学習の失敗だと述べている。', answer: false, why: '第3段落 is not a failure but part of the learning process itself。' },
    ],
    qa: [
      { q: 'According to the passage, why can cramming feel effective?', choices: ['Because the material seems familiar right afterward.', 'Because it is easier to remember meaningless syllables.', 'Because forgetting happens slowly at first.', 'Because tests are always given several days later.'], answer: 0, why: '第2段落 because the material seems familiar right afterward。' },
    ],
  },
{
    id: 'toefl-waggle',
    title: 'The Dance of the Honeybee',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Honeybees cannot speak, but they share surprisingly precise information. When a worker bee finds a good source of flowers, she returns to the hive and performs what scientists call the waggle dance. In the dark hive, other bees follow her movements ( A ) touch and vibration rather than sight.",
      "During the dance, the bee runs in a straight line while shaking her body, then circles back and repeats the run. The direction of this straight run shows where the food is: its angle relative to straight up on the honeycomb matches the angle between the food and the sun. The length of the run, meanwhile, indicates distance; the ( B ) the run lasts, the farther away the food is.",
      "The meaning of the dance was worked out by the Austrian scientist Karl von Frisch, who shared a Nobel Prize in 1973 for his studies of animal behavior. His work showed that even small insects can communicate information about places they are not currently ( C ).",
    ],
    ja: [
      'ミツバチは話すことはできないが、おどろくほど正確な情報を伝え合う。働きバチはよい花の場所を見つけると、巣にもどり、科学者たちが「8の字ダンス（尻ふりダンス）」とよぶ動きをする。暗い巣の中で、ほかのハチたちは目で見るのではなく、ふれることや振動を通して、その動きをたどる。',
      'ダンスのあいだ、ハチは体をふるわせながらまっすぐに進み、それから円をえがいてもどり、またまっすぐに進むことをくり返す。このまっすぐな進み方の向きが、えさのある場所を示している。巣板の真上の方向に対する角度が、えさと太陽のあいだの角度と一致しているのである。一方、まっすぐ進む長さは距離を示しており、それが長く続くほど、えさは遠くにある。',
      'このダンスの意味を明らかにしたのは、オーストリアの科学者カール・フォン・フリッシュであり、彼は動物の行動の研究によって1973年にノーベル賞を共同で受賞した。彼の研究は、小さな昆虫でさえ、今いない場所についての情報を伝えられることを示したのである。',
    ],
    blanks: [
      { id: 'A', choices: ['through', 'during', 'against', 'without'], answer: 0, why: 'through ～「～を通して」。ふれることや振動を通して動きをたどる。' },
      { id: 'B', choices: ['longer', 'long', 'longest', 'more'], answer: 0, why: 'the ＋ 比較級 ～, the ＋ 比較級 …「～すればするほど…」。the farther に合わせて the longer。' },
      { id: 'C', choices: ['visiting', 'visited', 'visit', 'to visit'], answer: 0, why: 'they are not currently visiting「今おとずれていない」という進行形。' },
    ],
    tf: [
      { statement: 'ミツバチは、えさのある場所を仲間に伝えるためにダンスをする。', answer: true, why: '第1段落・第2段落の内容と合う。' },
      { statement: '巣の中のハチは、おもに目で見てダンスを理解する。', answer: false, why: '第1段落 through touch and vibration rather than sight。' },
      { statement: 'まっすぐ進む時間が長いほど、えさは遠くにある。', answer: true, why: '第2段落 the longer the run lasts, the farther away the food is。' },
      { statement: 'ダンスの意味を明らかにしたのは、アメリカの科学者である。', answer: false, why: '第3段落 the Austrian scientist Karl von Frisch。' },
    ],
    qa: [
      { q: 'What does the angle of the straight run show?', choices: ['The direction of the food compared with the sun.', 'How much food the bee has carried.', 'How many bees are in the hive.', 'What time of day it is.'], answer: 0, why: '第2段落 its angle ... matches the angle between the food and the sun。' },
    ],
  },
{
    id: 'hs-english-haiku',
    title: 'A Haiku in English',
    level: '高校入試（体験文）',
    paragraphs: [
      "In our English class, our teacher, Ms. Brown, asked us to write a haiku in English. I was surprised, because I thought haiku could only be written in Japanese. Ms. Brown said that people all over the world enjoy ( A ) haiku in their own languages. She showed us some short poems written by students in other countries.",
      "In Japanese, a haiku has five, seven, and five sounds. In English, many people count syllables instead. For example, the word \"summer\" has two syllables. At first, counting syllables was difficult for me, ( B ) I clapped my hands for each one and slowly got used to it.",
      "I wrote about the cicadas I hear every summer. My classmates wrote about rain, baseball, and their pets. Ms. Brown liked my haiku and put it on the classroom wall. Now I know that a short poem can share a big feeling, ( C ) it is written in Japanese or in English.",
    ],
    ja: [
      '英語の授業で、ブラウン先生は私たちに英語で俳句を書くように言った。私はおどろいた。俳句は日本語でしか書けないと思っていたからだ。ブラウン先生は、世界中の人々が自分の言葉で俳句を書くのを楽しんでいると話した。そして、ほかの国の生徒が書いた短い詩をいくつか見せてくれた。',
      '日本語では、俳句は五・七・五の音でできている。英語では、そのかわりに音節を数える人が多い。たとえば、summer という語は2音節だ。はじめは音節を数えるのがむずかしかったが、1つごとに手をたたいて、少しずつなれていった。',
      '私は、毎年夏に聞くセミについて書いた。クラスメートは、雨や野球、自分のペットについて書いた。ブラウン先生は私の俳句を気に入って、教室のかべにはってくれた。今では、短い詩でも大きな気持ちを伝えられることがわかる。それが日本語で書かれていても、英語で書かれていても。',
    ],
    blanks: [
      { id: 'A', choices: ['writing', 'to write', 'write', 'written'], answer: 0, why: 'enjoy のあとは動名詞（～ing）。enjoy writing「書くことを楽しむ」。' },
      { id: 'B', choices: ['but', 'because', 'if', 'or'], answer: 0, why: '「むずかしかった」→「でも手をたたいてなれていった」という逆接なので but。' },
      { id: 'C', choices: ['whether', 'if', 'because', 'when'], answer: 0, why: 'whether A or B「A であっても B であっても」。' },
    ],
    tf: [
      { statement: '筆者は、俳句は日本語でしか書けないと思っていた。', answer: true, why: '第1段落 I thought haiku could only be written in Japanese。' },
      { statement: '英語では、多くの人が音節を数えて俳句を作る。', answer: true, why: '第2段落 In English, many people count syllables instead。' },
      { statement: '筆者は、はじめから音節を数えるのが得意だった。', answer: false, why: '第2段落 At first, counting syllables was difficult for me。' },
      { statement: 'ブラウン先生は、筆者の俳句を家に持って帰った。', answer: false, why: '第3段落 put it on the classroom wall。' },
    ],
    qa: [
      { q: 'What did the writer write the haiku about?', choices: ['The cicadas the writer hears every summer.', 'The writer\'s English teacher.', 'Clapping hands in class.', 'A trip to another country.'], answer: 0, why: '第3段落 I wrote about the cicadas I hear every summer.' },
    ],
  },
{
    id: 'adv-planning-fallacy',
    title: 'Why Projects Finish Late',
    level: '難関大（評論）',
    paragraphs: [
      "Why do so many projects finish late? Psychologists use the term \"planning fallacy\" for our tendency to underestimate how long a task will take, ( A ) we have experienced similar delays many times before. The term was introduced by the psychologists Daniel Kahneman and Amos Tversky in the late 1970s.",
      "In one well-known study, university students were asked to predict when they would finish their final research papers. They were also asked to estimate a \"worst-case\" date, assuming everything went badly. Remarkably, many students finished later than ( B ) their worst-case predictions. When imagining the future, people tend to focus on the specific steps of the plan and ignore the many small problems that usually appear along the way.",
      "One effective remedy is to take what researchers call an \"outside view.\" Instead of asking how long this particular task should take, we can ask how long similar tasks actually took in the past. Such records are often less optimistic, and ( C ) more accurate, than our detailed but hopeful plans.",
    ],
    ja: [
      'なぜ、これほど多くの計画が予定より遅れて終わるのだろうか。心理学者は、似たような遅れをこれまで何度も経験しているにもかかわらず、作業にかかる時間を少なく見積もってしまう傾向を「計画の錯誤」とよぶ。この用語は、1970年代の終わりに心理学者のダニエル・カーネマンとエイモス・トベルスキーによって導入された。',
      'よく知られたある研究で、大学生たちは最終研究論文をいつ書き終えるかを予想するよう求められた。また、すべてがうまくいかなかった場合を想定した「最悪の場合」の日付も見積もるよう求められた。おどろくべきことに、多くの学生は自分の最悪の場合の予想よりさえも遅れて書き終えた。未来を想像するとき、人は計画の具体的な手順に注目し、ふつう途中で起こるたくさんの小さな問題を見落としがちなのである。',
      '効果的な対策の1つは、研究者たちが「外側からの見方」とよぶものをとることだ。この作業にどれくらいかかるはずかを問うのではなく、似た作業が過去に実際にどれくらいかかったかを問うのである。そうした記録は、くわしいけれども希望的な私たちの計画よりも、楽観的でないことが多く、したがってより正確なのである。',
    ],
    blanks: [
      { id: 'A', choices: ['even though', 'because', 'unless', 'so that'], answer: 0, why: '「何度も経験しているのに、少なく見積もる」という逆接なので even though。' },
      { id: 'B', choices: ['even', 'very', 'much', 'so'], answer: 0, why: 'later than even ～「～よりさえも遅く」。even は「～でさえ」。' },
      { id: 'C', choices: ['therefore', 'however', 'instead', 'otherwise'], answer: 0, why: '「楽観的でない、だからより正確だ」という因果なので therefore。' },
    ],
    tf: [
      { statement: '計画の錯誤とは、作業にかかる時間を長く見積もりすぎる傾向のことだ。', answer: false, why: '第1段落 underestimate how long a task will take（少なく見積もる）。' },
      { statement: 'この用語は1970年代の終わりごろに導入された。', answer: true, why: '第1段落 in the late 1970s。' },
      { statement: '研究では、最悪の場合の予想よりも遅れて終えた学生が多かった。', answer: true, why: '第2段落 many students finished later than even their worst-case predictions。' },
      { statement: '筆者は、今回の計画をよりくわしく考えることを、いちばんの対策としてすすめている。', answer: false, why: '第3段落 似た作業が過去にどれくらいかかったかを問う「外側からの見方」をすすめている。' },
    ],
    qa: [
      { q: 'According to the passage, what does taking an "outside view" mean?', choices: ['Asking how long similar tasks actually took in the past.', 'Planning each step of the task in more detail.', 'Asking other people to do the task.', 'Working on the task outside the classroom.'], answer: 0, why: '第3段落 we can ask how long similar tasks actually took in the past。' },
    ],
  },
{
    id: 'toefl-rosetta',
    title: 'The Stone That Unlocked a Lost Writing',
    level: 'TOEFL・IELTS（歴史）',
    paragraphs: [
      "For more than a thousand years, no one could read the hieroglyphs of ancient Egypt. People could see the beautiful pictures carved on temples and tombs, but the meaning of the writing had been completely lost. This changed after French soldiers found a large broken stone near the town of Rashid, or Rosetta, in 1799.",
      "The stone carried the same official message written in three different scripts: hieroglyphs, a later Egyptian script called Demotic, and ancient Greek. Because scholars could still read Greek, the stone offered a rare chance to compare a known language ( A ) an unknown one. It was taken to Britain in 1802 and has been kept in the British Museum ever since.",
      "Even with this help, the work took many years. Scholars first noticed that some hieroglyphs inside oval shapes spelled the names of rulers ( B ) Ptolemy. In 1822, the French scholar Jean-François Champollion announced that he had worked out how the system functioned. He showed that hieroglyphs could stand for sounds as well as ideas, and thousands of ancient texts gradually became ( C ) once again.",
    ],
    ja: [
      '1000年以上ものあいだ、古代エジプトの象形文字（ヒエログリフ）を読める人はいなかった。人々は神殿や墓にきざまれた美しい絵を見ることはできたが、その文字の意味は完全に失われていた。この状況が変わったのは、1799年、フランスの兵士たちがラシード（ロゼッタ）という町の近くで、大きな割れた石を見つけてからである。',
      'その石には、同じ公式の文が3種類の文字で書かれていた。ヒエログリフ、デモティックとよばれるのちのエジプトの文字、そして古代ギリシャ語である。学者たちはギリシャ語ならまだ読めたので、この石は、わかっている言語とわからない言語をくらべるめったにない機会をあたえた。石は1802年にイギリスに運ばれ、それ以来大英博物館に保管されている。',
      'この手がかりがあっても、作業には何年もかかった。学者たちはまず、だ円の中のいくつかのヒエログリフが、プトレマイオスのような王の名前を表していることに気づいた。1822年、フランスの学者ジャン＝フランソワ・シャンポリオンが、その文字のしくみを解き明かしたと発表した。彼は、ヒエログリフが考えだけでなく音も表せることを示し、何千もの古代の文書が、少しずつふたたび読めるようになっていった。',
    ],
    blanks: [
      { id: 'A', choices: ['with', 'from', 'than', 'of'], answer: 0, why: 'compare A with B「A を B とくらべる」。' },
      { id: 'B', choices: ['such as', 'as if', 'so that', 'even if'], answer: 0, why: 'such as ～「～のような」。名詞 Ptolemy の前で例をあげる。as if / so that / even if のあとには文（主語＋動詞）が続く。' },
      { id: 'C', choices: ['readable', 'reading', 'readily', 'reader'], answer: 0, why: 'become ＋ 形容詞。readable「読むことのできる」。' },
    ],
    tf: [
      { statement: 'ロゼッタストーンは、フランスの兵士たちによって見つけられた。', answer: true, why: '第1段落 French soldiers found a large broken stone。' },
      { statement: '石には、3つの異なる内容の文が書かれていた。', answer: false, why: '第2段落 the same official message written in three different scripts（同じ文を3種類の文字で）。' },
      { statement: '石は現在、大英博物館にある。', answer: true, why: '第2段落 has been kept in the British Museum ever since。' },
      { statement: 'シャンポリオンは、ヒエログリフは考えだけを表すことを示した。', answer: false, why: '第3段落 hieroglyphs could stand for sounds as well as ideas。' },
    ],
    qa: [
      { q: 'Why was the stone so useful to scholars?', choices: ['It had a known language next to an unknown one.', 'It explained the grammar of Greek.', 'It was the oldest stone in Egypt.', 'It showed a map of ancient temples.'], answer: 0, why: '第2段落 a rare chance to compare a known language with an unknown one。' },
    ],
  },

{
    id: 'hs-shogi',
    title: 'Shogi with My Grandfather',
    level: '高校入試（体験文）',
    paragraphs: [
      "When I was ten, my grandfather taught me how to play shogi. At first, I lost every game, and I often wanted to quit. My grandfather always smiled and said, \"Losing is the best teacher.\" After each game, he showed me ( A ) I had made a bad move, and we played the same position again.",
      "Last spring, a student from Canada named Liam joined our class. He was interested in Japanese culture, so I invited him to my grandfather's house. My grandfather does not speak English, but he used his hands and the pieces to explain the rules. I helped by translating a few words. Liam was quick to learn, and by the end of the day he ( B ) win a game against me.",
      "Now Liam and I play shogi every week after school. Sometimes I win, and sometimes he does. Through shogi, I learned that you can communicate with people even when you do not share a language. I also understood my grandfather's words better. Each time I lose, I think about my mistakes ( C ) of feeling sad. Losing really can be a good teacher.",
    ],
    ja: [
      '10歳のとき、祖父が将棋のさし方を教えてくれた。はじめは毎回負けてしまい、何度もやめたくなった。祖父はいつもほほえんで「負けることがいちばんの先生だよ」と言った。1局終わるたびに、祖父は私がどこで悪い手をさしたのかを見せてくれ、同じ局面をもう一度さし直した。',
      'この春、カナダからリアムという生徒が私たちのクラスに入ってきた。彼は日本の文化に興味があったので、私は彼を祖父の家にさそった。祖父は英語を話さないが、手と駒を使ってルールを説明した。私はいくつかの言葉を訳して手伝った。リアムは覚えるのが早く、その日の終わりには私に1局勝つことができた。',
      '今では、リアムと私は毎週放課後に将棋をさしている。私が勝つときもあれば、彼が勝つときもある。将棋を通して、私は言葉が同じでなくても人と気持ちを通わせられることを学んだ。祖父の言葉の意味もよくわかるようになった。負けるたびに、私は悲しむかわりに自分のまちがいについて考える。負けることは、本当によい先生になりうるのだ。',
    ],
    blanks: [
      { id: 'A', choices: ['where', 'what', 'who', 'which'], answer: 0, why: '「どこで悪い手をさしたのか」という間接疑問。I had made a bad move は完全な文なので where。' },
      { id: 'B', choices: ['was able to', 'could be', 'was able', 'is able'], answer: 0, why: 'be able to ＋ 原形「～できる」。過去の文なので was able to win。' },
      { id: 'C', choices: ['instead', 'despite', 'although', 'during'], answer: 0, why: 'instead of ～ing「～するかわりに」。despite・although・during は of をとらない。' },
    ],
    tf: [
      { statement: '筆者は、はじめから将棋で祖父に勝つことができた。', answer: false, why: '第1段落 At first, I lost every game。' },
      { statement: '筆者の祖父は、英語を話さない。', answer: true, why: '第2段落 My grandfather does not speak English。' },
      { statement: 'リアムは、その日のうちに筆者に1局勝った。', answer: true, why: '第2段落 by the end of the day he was able to win a game against me。' },
      { statement: '今では、いつもリアムが勝っている。', answer: false, why: '第3段落 Sometimes I win, and sometimes he does。' },
    ],
    qa: [
      { q: 'What did the writer learn through shogi?', choices: ['People can communicate without sharing a language.', 'Shogi is easier than chess.', 'Winning is more important than practice.', 'Canada has its own kind of shogi.'], answer: 0, why: '第3段落 you can communicate with people even when you do not share a language。' },
    ],
  },
{
    id: 'adv-anchoring',
    title: 'The Power of the First Number',
    level: '難関大（評論）',
    paragraphs: [
      "When we have to guess a number, we rarely start from nothing. Instead, we tend to begin with whatever number is in front of us and then adjust. The trouble is that we usually adjust too little. Psychologists call this tendency the \"anchoring effect,\" because the first number holds our judgment in place ( A ) an anchor holds a ship.",
      "In a famous experiment published in 1974, Amos Tversky and Daniel Kahneman spun a wheel of fortune that had been set to stop at either 10 or 65. Participants were then asked whether the percentage of African countries in the United Nations was higher or lower than that number, and then to give their own estimate. Although the wheel was obviously random, it shaped their answers: people who saw 10 gave a median estimate of 25 percent, ( B ) those who saw 65 gave a median of 45 percent.",
      "Anchors influence many everyday decisions, from the prices we are willing to pay to the salaries we ask for. A high \"original price\" printed next to a discount can make the sale price seem cheap, even if it is not. Being aware of the effect does not remove it entirely, but deliberately considering reasons why the anchor might be wrong can reduce its pull. In other words, the best defense is not to ignore the first number but to question ( C ) it deserves our trust.",
    ],
    ja: [
      '数を推測しなければならないとき、私たちはゼロから考え始めることはめったにない。そうではなく、目の前にある数から始めて、それを調整しがちである。問題は、私たちがふつう調整が足りないことだ。心理学者はこの傾向を「アンカリング効果」とよぶ。いかりが船をつなぎとめるように、最初の数が私たちの判断をつなぎとめるからである。',
      '1974年に発表された有名な実験で、エイモス・トヴェルスキーとダニエル・カーネマンは、10か65のどちらかで止まるように仕組んだルーレットを回した。参加者は次に、国際連合に加盟しているアフリカの国の割合がその数より大きいか小さいかを答え、それから自分の推定値を答えるよう求められた。ルーレットが明らかに偶然であるにもかかわらず、それは答えに影響した。10を見た人々の推定値の中央値は25パーセントだったのに対し、65を見た人々の中央値は45パーセントだったのである。',
      'アンカーは、払ってもよいと思う値段から、求める給料まで、日常の多くの判断に影響をあたえる。割引価格のとなりに高い「元の値段」が書かれていると、実際にはそうでなくても、売り値が安く思えることがある。この効果を知っていても、完全に取り除けるわけではないが、アンカーがまちがっているかもしれない理由を意識して考えることで、その引っぱる力を弱めることができる。言いかえれば、最善の防ぎ方は、最初の数を無視することではなく、それが信頼に値するかどうかを問うことなのである。',
    ],
    blanks: [
      { id: 'A', choices: ['just as', 'such as', 'because of', 'in spite of'], answer: 0, why: 'just as ～「ちょうど～するように」。あとに文（an anchor holds a ship）が続くので接続詞の just as。such as・because of・in spite of のあとには文は続かない。' },
      { id: 'B', choices: ['whereas', 'despite', 'instead of', 'rather than'], answer: 0, why: 'whereas「～である一方で」。10を見た人と65を見た人の結果を、文と文で対比している。despite・instead of は前置詞なので文は続かない。' },
      { id: 'C', choices: ['whether', 'what', 'which', 'unless'], answer: 0, why: 'question whether ～「～かどうかを問う」。whether のあとに完全な文（it deserves our trust）が続く。' },
    ],
    tf: [
      { statement: 'アンカリング効果では、人は最初の数から大きく調整しすぎる傾向がある。', answer: false, why: '第1段落 we usually adjust too little（調整が足りない）。' },
      { statement: '実験のルーレットは、10か65で止まるように仕組まれていた。', answer: true, why: '第2段落 set to stop at either 10 or 65。' },
      { statement: '65を見た参加者は、10を見た参加者より高い推定をした。', answer: true, why: '第2段落 中央値 25 パーセントと 45 パーセント。' },
      { statement: '筆者は、アンカリング効果は知っているだけで完全になくせると述べている。', answer: false, why: '第3段落 Being aware of the effect does not remove it entirely。' },
    ],
    qa: [
      { q: 'According to the passage, what can reduce the anchoring effect?', choices: ['Thinking about reasons why the anchor might be wrong.', 'Looking at the first number for a longer time.', 'Choosing the highest price available.', 'Spinning a wheel before every decision.'], answer: 0, why: '第3段落 deliberately considering reasons why the anchor might be wrong can reduce its pull。' },
    ],
  },
{
    id: 'toefl-gecko',
    title: 'How Geckos Walk on Ceilings',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Geckos are small lizards that can run up smooth walls and even hang upside down from ceilings. For a long time, people assumed their feet must be sticky, like tape, or that they worked like suction cups. Neither idea turned ( A ) to be correct: gecko feet leave no glue behind, and they still stick in conditions where suction would not work.",
      "The secret lies in the structure of the toes. Each toe is covered with millions of extremely fine hairs called setae, and the tip of each seta splits into hundreds of even smaller ends. These ends are so tiny that they can come incredibly close to the surface. At that distance, weak attractive forces between molecules, known as van der Waals forces, begin to act. One tip produces only a very small force, but because there are so many of them, the total is ( B ) to hold the animal's weight.",
      "Just as remarkable is how easily a gecko lets go. By changing the angle of its toes and peeling them off from the tip, it can release its grip in a fraction of a second. Engineers have studied this system closely, and it has ( C ) the development of dry adhesives that hold firmly yet can be removed cleanly and used many times.",
    ],
    ja: [
      'ヤモリは、なめらかな壁をかけのぼり、天井からさかさまにぶら下がることさえできる小さなトカゲの仲間である。長いあいだ、人々は、ヤモリの足はテープのようにべたべたしているにちがいない、あるいは吸盤のようにはたらいているのだと思いこんでいた。どちらの考えも正しくないことがわかった。ヤモリの足はのりを残さないし、吸盤ではくっつかないような条件でもくっつくのである。',
      'そのひみつは指のつくりにある。それぞれの指は剛毛（セタ）とよばれる何百万本ものきわめて細い毛におおわれており、それぞれの毛の先はさらに小さな何百もの先端に分かれている。これらの先端はとても小さいので、表面にきわめて近づくことができる。その距離になると、ファンデルワールス力として知られる、分子どうしの弱い引き合う力がはたらき始める。1つの先端が生む力はごくわずかだが、その数がとても多いので、合計するとヤモリの体重を支えるのに十分な大きさになる。',
      '同じくらいおどろくべきなのは、ヤモリがいかにかんたんに足をはなせるかである。指の角度を変え、先のほうからはがしていくことで、ほんの一瞬でくっつく力をなくすことができる。技術者たちはこのしくみをくわしく研究してきた。そしてそれは、しっかりくっつくのにきれいにはがせて、何度も使える、のりを使わない接着材の開発につながっている。',
    ],
    blanks: [
      { id: 'A', choices: ['out', 'up', 'off', 'over'], answer: 0, why: 'turn out to be ～「～であるとわかる」。' },
      { id: 'B', choices: ['enough', 'too', 'so', 'very'], answer: 0, why: '形容詞（large など）を省いた enough to ～「～するのに十分な」。the total is enough to hold ...「合計は支えるのに十分だ」。' },
      { id: 'C', choices: ['inspired', 'inspiring', 'inspire', 'inspiration'], answer: 0, why: 'has ＋ 過去分詞の現在完了。has inspired「（開発の）きっかけになってきた」。' },
    ],
    tf: [
      { statement: 'ヤモリの足は、のりのようなものを出してくっついている。', answer: false, why: '第1段落 gecko feet leave no glue behind。' },
      { statement: 'ヤモリの指の毛の先は、さらに小さな多くの先端に分かれている。', answer: true, why: '第2段落 the tip of each seta splits into hundreds of even smaller ends。' },
      { statement: '1つの先端が生む力だけで、ヤモリの体重を支えられる。', answer: false, why: '第2段落 One tip produces only a very small force（多くの先端の合計で支える）。' },
      { statement: 'ヤモリは指を先のほうからはがして、すばやく足をはなす。', answer: true, why: '第3段落 peeling them off from the tip ... in a fraction of a second。' },
    ],
    qa: [
      { q: 'What allows a gecko to stick to smooth surfaces?', choices: ['Tiny molecular forces added up over countless hair tips.', 'A sticky substance that the toes leave behind.', 'Suction created by the shape of the feet.', 'A single strong force from each fine hair.'], answer: 0, why: '第2段落に、無数の細い毛の先で分子間の弱い力が働き、合計で体重を支えるとある。のりは残らず吸盤でもない（第1段落）。一本一本の力はとても小さいので、強い力という選択肢は本文とずれる。' },
    ],
  },
{
    id: 'adv-mere-exposure',
    title: 'Why the Familiar Feels Good',
    level: '難関大（評論）',
    paragraphs: [
      "Why do we often grow to like a song after hearing it several times, even if it did not impress us at first? One explanation is what psychologists call the \"mere exposure effect\": simply being exposed to something again and again tends to make us feel more positively ( A ) it, even when nothing else about it has changed.",
      "In a well-known series of studies published in 1968, the psychologist Robert Zajonc showed people unfamiliar items, such as made-up words and Chinese characters that the participants could not read. Some items were shown only once, while others were shown many times. Later, when asked to guess which items had pleasant meanings, participants tended to choose the ones they had seen ( B ) often, although they had been given no information about their meanings at all.",
      "The effect has clear practical consequences. Advertisers repeat the same messages, and politicians repeat their names, partly because familiarity can turn into a sense of liking or trust. The effect has limits, however: too much repetition can lead to boredom, and familiarity cannot make something good if people already dislike it strongly. Understanding the effect may help us notice when our preferences are shaped less by quality ( C ) by simple repetition.",
    ],
    ja: [
      'なぜ私たちは、最初はとくに印象に残らなかった曲でも、何度か聞くうちに好きになることが多いのだろうか。説明の1つは、心理学者が「単純接触効果」とよぶものである。ただ何度もくり返し何かにふれるだけで、ほかには何も変わっていなくても、それに対してより好意的に感じやすくなるのである。',
      '1968年に発表されたよく知られた一連の研究で、心理学者ロバート・ザイアンスは、作られた単語や参加者が読めない漢字など、なじみのないものを人々に見せた。1回しか見せないものもあれば、何度も見せるものもあった。あとで、どれがよい意味をもつと思うか推測するよう求められると、参加者は、意味についての情報をまったくあたえられていなかったにもかかわらず、より多く見たものを選ぶ傾向があった。',
      'この効果には、はっきりとした実際的な影響がある。広告主が同じメッセージをくり返し、政治家が自分の名前をくり返すのは、なじみが好意や信頼の感覚に変わりうることが理由の1つである。しかし、この効果には限界もある。くり返しが多すぎると退屈につながることがあり、人々がすでに強くきらっているものを、なじみによってよいものにすることはできない。この効果を理解すれば、自分の好みが質よりも単なるくり返しによって形づくられているときに、それに気づく助けになるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['about', 'with', 'than', 'at'], answer: 0, why: 'feel positively about ～「～について好意的に感じる」。feel ... about ～ の形。' },
      { id: 'B', choices: ['more', 'mostly', 'much', 'many'], answer: 0, why: 'more often「より多く（何度も）」。1回だけ見たものとくらべているので比較級。' },
      { id: 'C', choices: ['than', 'as', 'that', 'then'], answer: 0, why: 'less A than B「A よりむしろ B によって」。less by quality than by simple repetition。' },
    ],
    tf: [
      { statement: '単純接触効果とは、何度もふれるだけで好意的に感じやすくなる傾向のことである。', answer: true, why: '第1段落 simply being exposed to something again and again tends to make us feel more positively about it。' },
      { statement: 'ザイアンスの研究では、参加者は見せられた単語の意味を事前に教えられていた。', answer: false, why: '第2段落 they had been given no information about their meanings at all。' },
      { statement: '筆者は、くり返しはどれだけ多くても必ず好意を強めると述べている。', answer: false, why: '第3段落 too much repetition can lead to boredom。' },
      { statement: '広告や政治家のくり返しは、この効果を利用している面がある。', answer: true, why: '第3段落 Advertisers repeat ... partly because familiarity can turn into a sense of liking or trust。' },
    ],
    qa: [
      { q: 'Which items did participants tend to choose as having pleasant meanings?', choices: ['The ones they had seen more often.', 'The ones they had seen only once.', 'The ones that were easiest to read.', 'The ones explained by the researcher.'], answer: 0, why: '第2段落 participants tended to choose the ones they had seen more often。' },
    ],
  },
{
    id: 'adv-peak-end',
    title: 'How Endings Shape Memories',
    level: '難関大（評論）',
    paragraphs: [
      "When we look back on an experience, we might expect our memory to work like a careful accountant, adding up every good and bad moment. Psychologists have found that it does not. Our memory of an experience is strongly influenced by just two points: its most intense moment, or the \"peak,\" and the way it ends. This pattern is known as the \"peak-end rule,\" and it suggests that the length of an experience matters surprisingly little ( A ) how we remember it.",
      "In a well-known experiment published in 1993, Daniel Kahneman and his colleagues asked people to hold a hand in painfully cold water for 60 seconds. In another trial, the same people did this again for 60 seconds, but then kept their hand in the water for an extra 30 seconds while it was made slightly warmer. The longer trial contained more pain overall, ( B ) when participants were asked which one they would rather repeat, most chose the longer one. Its ending had been less unpleasant, and that ending shaped their memory of the whole experience.",
      "The rule has practical uses. A doctor might end a painful treatment more gently, and a teacher might finish a difficult lesson with an activity students enjoy. However, the rule also warns us about our own judgments. If we pay attention only to how an experience ended, we may make choices that are not in our best interests, such as preferring a longer period of discomfort simply ( C ) it ends better.",
    ],
    ja: [
      '経験をふり返るとき、私たちは記憶が注意深い会計係のように、よい瞬間と悪い瞬間をすべて足し合わせてくれると思うかもしれない。心理学者たちは、そうではないことを発見した。ある経験についての記憶は、たった2つの点に強く影響される。もっとも強烈な瞬間、つまり「ピーク」と、その経験の終わり方である。このパターンは「ピーク・エンドの法則」として知られており、経験の長さは、私たちがそれをどう記憶するかにとって、おどろくほど重要ではないことを示している。',
      '1993年に発表されたよく知られた実験で、ダニエル・カーネマンと同僚たちは、人々に痛いほど冷たい水に片手を60秒間つけてもらった。別の試行では、同じ人たちがもう一度60秒間これを行い、そのあと水を少しだけ温かくしながら、さらに30秒間手を水につけたままにした。長いほうの試行のほうが全体としての痛みは多かったが、どちらをくり返したいかとたずねられると、ほとんどの参加者は長いほうを選んだ。その終わりのほうが不快さが少なく、その終わり方が経験全体の記憶を形づくったのである。',
      'この法則には実際の使い道がある。医師は痛みをともなう治療をよりおだやかに終えるかもしれないし、教師はむずかしい授業を生徒が楽しめる活動で終えるかもしれない。しかし、この法則は私たち自身の判断についても注意をうながしている。経験がどう終わったかだけに注目すると、単に終わり方がよいという理由で、より長い不快な時間を選ぶといった、自分のためにならない選択をしてしまうかもしれないのである。',
    ],
    blanks: [
      { id: 'A', choices: ['to', 'by', 'at', 'from'], answer: 0, why: 'matter to ～「～にとって重要である」。the length matters surprisingly little to how we remember it「長さは、どう記憶するかにとっておどろくほど重要ではない」。' },
      { id: 'B', choices: ['yet', 'despite', 'because of', 'instead of'], answer: 0, why: '「痛みは多かった」→「それでも長いほうを選んだ」という逆接で、あとに文（most chose ...）が続くので接続詞の yet。despite・because of・instead of は前置詞なので文は続かない。' },
      { id: 'C', choices: ['because', 'because of', 'due to', 'despite'], answer: 0, why: 'simply because ＋ 主語 ＋ 動詞「単に～という理由で」。あとが it ends better という文なので接続詞の because。because of・due to・despite は前置詞。' },
    ],
    tf: [
      { statement: 'ピーク・エンドの法則によると、記憶は経験のすべての瞬間を足し合わせて決まる。', answer: false, why: '第1段落 Psychologists have found that it does not ... strongly influenced by just two points。' },
      { statement: '実験では、長いほうの試行の最後の30秒は水が少し温かくされた。', answer: true, why: '第2段落 an extra 30 seconds while it was made slightly warmer。' },
      { statement: '実験の参加者のほとんどは、短いほうの試行をくり返したいと答えた。', answer: false, why: '第2段落 most chose the longer one。' },
      { statement: '筆者は、終わり方だけで判断すると自分のためにならない選択をすることがあると述べている。', answer: true, why: '第3段落 we may make choices that are not in our best interests。' },
    ],
    qa: [
      { q: 'Why did most participants choose to repeat the longer trial?', choices: ['Because its ending was less unpleasant.', 'Because it contained less pain overall.', 'Because the water was warm from the start.', 'Because it was shorter than the other trial.'], answer: 0, why: '第2段落 Its ending had been less unpleasant, and that ending shaped their memory of the whole experience。' },
    ],
  },
{
    id: 'hs-film-camera',
    title: "My Grandfather's Film Camera",
    level: '高校入試（体験文）',
    paragraphs: [
      "Last spring, I found an old camera in a box at my grandfather's house. It was a film camera that he had used ( A ) he was young. When I asked him about it, he said, \"You can have it if you want. But you have to buy film for it.\"",
      "I bought a roll of film for 24 pictures. With my smartphone, I take hundreds of photos every week and delete most of them. But with this camera, I could take only 24, and I could not see the pictures ( B ) they were developed at a shop. So I started to think carefully before pressing the button. I walked around my town and looked for things I really wanted to keep: the cherry trees by the river, my cat sleeping in the sun, and my grandfather working in his garden.",
      "Two weeks later, I took the film to a shop. I had to wait three days for the pictures. When I finally got them, some were too dark, and one was not clear at all. But I was surprised that I remembered every moment ( C ) each picture was taken. My grandfather looked at the picture of himself in the garden and smiled. \"This is a good one,\" he said. \"You took it slowly, so it has your feelings in it.\"",
      "Now I still use my smartphone, but I take pictures in a different way. Before I take one, I ask myself, \"Do I really want to remember this?\" I learned from the old camera that taking fewer pictures can make each one more special.",
    ],
    ja: [
      'この前の春、私は祖父の家の箱の中で古いカメラを見つけました。それは祖父が若いころに使っていたフィルムカメラでした。そのことをたずねると、祖父は「ほしければあげるよ。でもフィルムは自分で買わないといけないよ」と言いました。',
      '私は24枚撮りのフィルムを1本買いました。スマートフォンだと、私は毎週何百枚も写真を撮って、そのほとんどを消します。でもこのカメラでは24枚しか撮れず、店で現像されるまで写真を見ることもできませんでした。そこで私は、シャッターを押す前によく考えるようになりました。町を歩き回り、本当に残しておきたいものをさがしました。川ぞいの桜の木、日なたで眠っている私のねこ、そして庭で作業をしている祖父です。',
      '2週間後、私はフィルムを店に持っていきました。写真ができるまで3日待たなければなりませんでした。やっと受け取ると、暗すぎる写真もあり、1枚はまったくはっきりしていませんでした。でも、それぞれの写真を撮った瞬間をすべて覚えていることにおどろきました。祖父は庭にいる自分の写真を見て、ほほえみました。「これはいい写真だね。ゆっくり撮ったから、きみの気持ちが入っているよ」と祖父は言いました。',
      '今でも私はスマートフォンを使っていますが、写真の撮り方が変わりました。1枚撮る前に、「本当にこれを覚えておきたいかな」と自分に問いかけます。私は古いカメラから、撮る写真の数を減らすことで、1枚1枚をより特別なものにできると学びました。',
    ],
    blanks: [
      { id: 'A', choices: ['when', 'during', 'for', 'about'], answer: 0, why: 'あとに he was young という文が続くので接続詞の when「～のころ」。during・for・about は前置詞なので文は続かない。' },
      { id: 'B', choices: ['until', 'by', 'during', 'despite'], answer: 0, why: 'not ～ until …「…するまで～しない」。あとに they were developed という文が続くので接続詞の until。by・during・despite は前置詞。' },
      { id: 'C', choices: ['when', 'what', 'who', 'whose'], answer: 0, why: '先行詞 moment（時）のあとに〈主語＋動詞〉が続くので関係副詞の when。every moment when each picture was taken「それぞれの写真が撮られた瞬間」。' },
    ],
    tf: [
      { statement: 'カメラは、祖父が若いころに使っていたものだった。', answer: true, why: '第1段落 a film camera that he had used when he was young。' },
      { statement: '筆者はフィルムカメラで、撮った写真をすぐにその場で確かめた。', answer: false, why: '第2段落 I could not see the pictures until they were developed at a shop。' },
      { statement: '現像された写真は、すべてきれいに写っていた。', answer: false, why: '第3段落 some were too dark, and one was not clear at all。' },
      { statement: '筆者は今、写真を撮る前に本当に覚えておきたいかを考える。', answer: true, why: '第4段落 Before I take one, I ask myself, "Do I really want to remember this?"' },
    ],
    qa: [
      { q: 'What did the writer learn from the old camera?', choices: ['Taking fewer pictures can make each one more special.', 'Smartphones take better pictures than film cameras.', 'Pictures should always be taken quickly.', 'Film is cheaper than a smartphone.'], answer: 0, why: '第4段落 taking fewer pictures can make each one more special。' },
    ],
  },
{
    id: 'toefl-honey',
    title: 'Why Honey Lasts So Long',
    level: 'TOEFL・IELTS（科学）',
    paragraphs: [
      "Most foods eventually spoil because bacteria and fungi grow ( A ) them. Honey is unusual: if it is stored properly, it can stay safe to eat for years. Scientists explain this long life by pointing to several features that work together.",
      "The first is its chemistry. Honey is mostly sugar, and it contains so little water ( B ) most microbes cannot survive in it. In fact, the sugar pulls water out of any bacterial cell that lands in the honey, causing the cell to dry out. Honey is also fairly acidic, which makes it even harder for many microbes to grow. In addition, bees add an enzyme to the nectar they collect. When honey is diluted, this enzyme helps produce hydrogen peroxide, a substance that can kill bacteria.",
      "However, honey is not completely free of living things. It can contain bacterial spores, which are inactive and very tough. Spores do not grow in honey, but they can survive in it, which is ( C ) doctors advise parents not to give honey to babies under one year old. Honey can also absorb moisture from the air if it is left uncovered, and with extra water it may begin to ferment. For this reason, honey lasts longest when it is kept in a closed container.",
    ],
    ja: [
      'ほとんどの食品は、細菌やカビがその上で増えるので、やがて腐ってしまう。はちみつは変わっていて、きちんと保存すれば、何年も安全に食べられる状態のままでいられる。科学者たちは、この長もちを、いっしょにはたらくいくつかの特徴を挙げて説明している。',
      '1つめはその化学的な性質である。はちみつはほとんどが糖で、水分がとても少ないので、ほとんどの微生物はその中で生きられない。実際、糖ははちみつに入った細菌の細胞から水を引き出し、細胞を乾かしてしまう。はちみつはまた、かなり酸性で、そのため多くの微生物にとってさらに増えにくくなっている。それに加えて、ミツバチは集めた花のみつに酵素を加える。はちみつがうすめられると、この酵素は細菌を殺すことができる物質である過酸化水素を作るのを助ける。',
      'しかし、はちみつに生き物がまったくいないわけではない。はちみつには細菌の芽胞がふくまれていることがあり、芽胞は活動していない、とてもじょうぶなものである。芽胞ははちみつの中で増えることはないが、生き残ることはできる。そのため医師は、1歳未満の赤ちゃんにはちみつをあたえないよう親に助言している。また、はちみつはふたをせずに置いておくと空気中の水分を吸うことがあり、水分が増えると発酵し始めることがある。このため、はちみつはふたをした容器に入れておくと、いちばん長もちする。',
    ],
    blanks: [
      { id: 'A', choices: ['on', 'of', 'at', 'to'], answer: 0, why: 'grow on ～「～の上で増える・生える」。細菌やカビが食品の上で増える。' },
      { id: 'B', choices: ['that', 'which', 'what', 'as'], answer: 0, why: 'so ＋ 形容詞 ＋ 名詞 ＋ that …「とても～なので…」。so little water that most microbes cannot survive。' },
      { id: 'C', choices: ['why', 'what', 'who', 'whose'], answer: 0, why: 'which is why ～「そういうわけで～」。前の内容（芽胞が生き残る）を which で受けて、その結果を why で続ける。' },
    ],
    tf: [
      { statement: 'はちみつは水分がとても少ないので、ほとんどの微生物がその中で生きられない。', answer: true, why: '第2段落 it contains so little water that most microbes cannot survive in it。' },
      { statement: 'ミツバチが加える酵素は、はちみつがうすめられると過酸化水素を作るのを助ける。', answer: true, why: '第2段落 When honey is diluted, this enzyme helps produce hydrogen peroxide。' },
      { statement: 'はちみつの中には、細菌の芽胞もふくめて生き物はまったくいない。', answer: false, why: '第3段落 honey is not completely free of living things. It can contain bacterial spores。' },
      { statement: 'はちみつは、ふたをせずに置いておくほうが長もちする。', answer: false, why: '第3段落 honey lasts longest when it is kept in a closed container。' },
    ],
    qa: [
      { q: 'Why do doctors advise parents not to give honey to babies under one year old?', choices: ['Because honey can contain bacterial spores that survive in it.', 'Because honey contains too much water.', 'Because honey is not acidic enough.', 'Because honey quickly ferments in a closed container.'], answer: 0, why: '第3段落 Spores do not grow in honey, but they can survive in it, which is why doctors advise ...。' },
    ],
  },
{
    id: 'adv-ikea-effect',
    title: 'Why We Love What We Build',
    level: '難関大（評論）',
    paragraphs: [
      "Many people feel especially proud of a bookshelf they put together themselves, even if it is a little uneven. Psychologists have found that this feeling is common: people tend to place a higher value ( A ) things they have made with their own hands. The pattern is known as the \"IKEA effect,\" named after the furniture company whose products customers usually assemble at home.",
      "In a set of studies published in 2012, researchers asked some participants to assemble simple storage boxes, while others were shown identical boxes that came already assembled. Those who did the work were willing to pay more for the boxes they had built ( B ) for the ready-made ones. In another study, people who folded paper cranes valued their own amateur work almost as highly as models made by experts, even though other people saw little value in the beginners' cranes.",
      "The effect, however, seems to depend on success. When participants built something and then took it apart, or ( C ) to finish it, the extra value largely disappeared. This suggests that effort makes us love a product mainly when it ends in a sense of achievement. Companies may use this tendency by inviting customers to take part in making things, but as buyers, we should remember that our own labor can make an ordinary object seem more valuable than it really is.",
    ],
    ja: [
      '多くの人は、自分で組み立てた本棚に、少しがたついていても特別なほこりを感じる。心理学者たちは、この感覚がよくあるものだとわかった。人は自分の手で作ったものに、より高い価値を置く傾向があるのである。このパターンは「イケア効果」として知られており、客がふつう家で組み立てる製品を売る家具会社の名前にちなんでいる。',
      '2012年に発表された一連の研究で、研究者たちは、一部の参加者には簡単な収納箱を組み立ててもらい、ほかの参加者には最初から組み立てられた同じ箱を見せた。作業をした人たちは、完成品よりも自分が組み立てた箱にお金を多くはらおうとした。別の研究では、紙で鶴を折った人たちは、自分のしろうとの作品を専門家が作った作品とほぼ同じくらい高く評価した。ほかの人たちは初心者の鶴にほとんど価値を感じなかったにもかかわらずである。',
      'しかし、この効果は成功しだいのようである。参加者が何かを作ってからこわしたり、完成させられなかったりすると、上乗せされた価値はほとんど消えた。このことは、努力が製品を好きにさせるのは、おもにそれが達成感で終わったときだということを示している。企業は客をものづくりに参加させることで、この傾向を利用するかもしれない。しかし買い手としては、自分の労力のせいで、ふつうのものが実際より価値があるように見えることがあると覚えておくべきである。',
    ],
    blanks: [
      { id: 'A', choices: ['on', 'with', 'at', 'from'], answer: 0, why: 'place (a) value on ～「～に価値を置く」。' },
      { id: 'B', choices: ['than', 'as', 'that', 'then'], answer: 0, why: 'pay more for A than for B「B より A に多くはらう」。比較級 more のあとは than。' },
      { id: 'C', choices: ['failed', 'failing', 'fail', 'to fail'], answer: 0, why: 'built … and then took … , or failed to finish と、過去形の動詞を or でならべる。fail to ～「～できない」。' },
    ],
    tf: [
      { statement: 'イケア効果とは、自分で作ったものに高い価値を置く傾向のことである。', answer: true, why: '第1段落 people tend to place a higher value on things they have made with their own hands。' },
      { statement: '研究では、組み立てた人は完成品の箱により多くはらおうとした。', answer: false, why: '第2段落 willing to pay more for the boxes they had built than for the ready-made ones。' },
      { statement: 'ほかの人たちも、初心者が折った鶴を高く評価した。', answer: false, why: '第2段落 other people saw little value in the beginners\' cranes。' },
      { statement: '作ったものをこわしたり完成させられなかったりすると、効果はほとんど消えた。', answer: true, why: '第3段落 the extra value largely disappeared。' },
    ],
    qa: [
      { q: 'According to the passage, when does effort make people value a product most?', choices: ['When the work ends in a sense of achievement.', 'When the product is made by experts.', 'When the product is already assembled.', 'When the work is taken apart afterward.'], answer: 0, why: '第3段落 effort makes us love a product mainly when it ends in a sense of achievement。' },
    ],
  },
{
    id: 'toefl-eyeshine',
    title: "Why Cats' Eyes Shine at Night",
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "If you shine a flashlight toward a cat in the dark, its eyes seem to glow green or gold. This \"eyeshine\" is not light produced by the eyes themselves. Instead, it comes from a mirror-like layer of tissue called the tapetum lucidum, which is located ( A ) the retina, the part of the eye that senses light.",
      "The layer improves vision in dim conditions. Normally, some light passes through the retina without being absorbed by its light-sensitive cells. In animals with a tapetum, this light is reflected back through the retina, giving the cells a second chance ( B ) detect it. As a result, many animals that are active at night, such as cats, deer, and raccoons, can make better use of very small amounts of light. Part of the reflected light leaves the eye again, and that is the glow we see.",
      "There is a cost, however. Because the reflected light spreads slightly, images can become a little less sharp. Humans lack this layer, ( C ) is why our eyes do not shine in the same way. The red eyes that sometimes appear in flash photographs have a different cause: the flash lights up blood vessels at the back of the eye.",
    ],
    ja: [
      '暗やみでねこに懐中電灯を向けると、その目は緑や金色に光っているように見える。この「アイシャイン」は、目そのものが出している光ではない。そうではなく、網膜（目の中で光を感じる部分）のうしろにある、タペタムとよばれる鏡のような組織の層から来ているのである。',
      'この層は、うす暗い中での見え方をよくする。ふつう、光の一部は、網膜の光を感じる細胞に吸収されないまま通りぬけてしまう。タペタムをもつ動物では、この光がはね返って網膜をもう一度通り、細胞にその光をとらえる2度目のチャンスをあたえる。その結果、ねこ、シカ、アライグマのような、夜に活動する多くの動物は、ごくわずかな光をよりうまく使える。はね返った光の一部はまた目から出ていき、それが私たちの見る光なのである。',
      'しかし、代わりに失うものもある。はね返った光が少し広がるので、像が少しぼやけることがある。人間にはこの層がなく、そのため私たちの目は同じようには光らない。フラッシュをたいた写真でときどき目が赤くなるのは、別の原因による。フラッシュが目の奥の血管を照らすのである。',
    ],
    blanks: [
      { id: 'A', choices: ['behind', 'among', 'during', 'since'], answer: 0, why: 'behind ～「～のうしろに」。層は網膜のうしろにある。among は3つ以上のものの間、during・since は時を表す。' },
      { id: 'B', choices: ['to', 'of', 'for', 'at'], answer: 0, why: 'a chance to ＋ 原形「～する機会」。あとが原形の detect なので to。of なら detecting の形になる。' },
      { id: 'C', choices: ['which', 'what', 'who', 'where'], answer: 0, why: '前の文の内容を受ける関係代名詞 which。, which is why ～「そしてそれが～の理由だ」。' },
    ],
    tf: [
      { statement: 'ねこの目の光は、目そのものが出している光である。', answer: false, why: '第1段落 This "eyeshine" is not light produced by the eyes themselves。' },
      { statement: 'タペタムは、網膜を通りぬけた光をはね返す。', answer: true, why: '第2段落 this light is reflected back through the retina。' },
      { statement: 'タペタムがあると、像がより鮮明になる。', answer: false, why: '第3段落 images can become a little less sharp。' },
      { statement: '写真で目が赤くなるのは、目の奥の血管がフラッシュで照らされるためである。', answer: true, why: '第3段落 the flash lights up blood vessels at the back of the eye。' },
    ],
    qa: [
      { q: 'What is the main benefit of the tapetum lucidum?', choices: ['It helps animals see better in dim light.', 'It makes images sharper during the day.', 'It produces its own light at night.', 'It protects the eyes from bright flashes.'], answer: 0, why: '第2段落 The layer improves vision in dim conditions。' },
    ],
  },
{
    id: 'hs-tea-ceremony',
    title: 'A Bowl of Tea for a Guest',
    level: '高校入試（スピーチ）',
    paragraphs: [
      "Hello, everyone. Last April, I joined the tea ceremony club ( A ) I wanted to try something new. At first, I was surprised that there were so many rules, for example, how to hold the bowl and how many times ( B ) turn it. My legs also hurt after sitting for a long time. I thought about quitting many times.",
      "Our teacher, Ms. Mori, told us, \"Each rule has a meaning. Every movement is a way to show respect to your guest.\" After I heard this, I began to practice more carefully. I tried to think about the guest in front of me, not about the rules.",
      "In October, our club served tea at the school festival. A woman from Australia came to our room. She looked a little nervous, so I explained the steps slowly in easy English. When she drank the tea, she smiled and said, \"I feel so calm. Thank you for your kindness.\"",
      "Her words made me very happy. From this experience, I learned that a small action can make others happy ( C ) it is done with care. I want to keep practicing and share Japanese culture with more people. Thank you for listening.",
    ],
    ja: [
      'みなさん、こんにちは。この前の4月、私は何か新しいことをやってみたかったので茶道部に入りました。はじめは、たとえば茶わんの持ち方や何回回すかなど、決まりがとても多いことにおどろきました。長い時間すわっていると足も痛くなりました。何度もやめようかと考えました。',
      '顧問のモリ先生は「どの決まりにも意味があります。一つ一つの動きは、お客さまに敬意を表す方法なのです」と教えてくれました。これを聞いてから、私はもっとていねいに練習するようになりました。決まりのことではなく、目の前のお客さまのことを考えるようにしました。',
      '10月、私たちの部は文化祭でお茶を出しました。オーストラリアから来た女性が私たちの部屋に来ました。少し緊張しているようだったので、私はかんたんな英語でゆっくり手順を説明しました。お茶を飲むと、その女性はほほえんで「とても落ち着きます。親切にしてくれてありがとう」と言いました。',
      'その言葉がとてもうれしかったです。この経験から、小さな行動でも、心をこめて行えば人を幸せにできると学びました。これからも練習を続けて、もっと多くの人に日本の文化を伝えたいと思います。聞いてくれてありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'because of', 'during', 'without'], answer: 0, why: 'あとに I wanted to … という文が続くので接続詞の because「～なので」。because of・during・without は前置詞。' },
      { id: 'B', choices: ['to', 'for', 'of', 'at'], answer: 0, why: 'how many times to ＋ 原形「何回～するか」。疑問詞＋to 不定詞の形。' },
      { id: 'C', choices: ['if', 'during', 'despite', 'because of'], answer: 0, why: 'あとに it is done with care という文が続くので接続詞の if「もし～なら」。during・despite・because of は前置詞。' },
    ],
    tf: [
      { statement: '筆者は、はじめは茶道の決まりが多いことにおどろいた。', answer: true, why: '第1段落 I was surprised that there were so many rules。' },
      { statement: 'モリ先生は、決まりにはあまり意味がないと言った。', answer: false, why: '第2段落 Each rule has a meaning。' },
      { statement: 'オーストラリアから来た女性は、お茶を飲んで落ち着くと言った。', answer: true, why: '第3段落 "I feel so calm."' },
      { statement: '筆者は、もう茶道をやめようと決めた。', answer: false, why: '第4段落 I want to keep practicing。' },
    ],
    qa: [
      { q: 'What did the writer learn from the experience at the school festival?', choices: ['A small action can make others happy if it is done with care.', 'Rules are more important than guests.', 'Tea ceremony is too difficult for foreign people.', 'Speaking English is the most important skill.'], answer: 0, why: '第4段落 a small action can make others happy if it is done with care。' },
    ],
  },
{
    id: 'adv-notice-elevator',
    title: 'Notice: Elevator Inspection',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "Notice to all residents. The elevators in this building will be inspected on Thursday, November 12, from 9:00 a.m. to 4:00 p.m. During this time, only one elevator will be in service, so you may have to wait longer ( A ) usual.",
      "Between 1:00 p.m. and 2:00 p.m., both elevators will stop completely while the workers test the safety system. If you need to move heavy items, please plan to do so before noon. The workers will also check the emergency phone inside each elevator, so you may hear a short alarm a few times during the day. Residents ( B ) have difficulty using the stairs should contact the management office in advance, and we will do our best to help.",
      "We apologize for any inconvenience. This inspection is required by law every year ( C ) keep everyone safe. If you have any questions, please call the management office between 10:00 a.m. and 6:00 p.m. on weekdays. Management Office, Green Hill Apartments",
    ],
    ja: [
      '住民のみなさまへのお知らせ。11月12日（木）午前9時から午後4時まで、この建物のエレベーターの点検を行います。この間は1台のエレベーターしか動かないため、いつもより長くお待ちいただくことがあります。',
      '午後1時から2時までは、作業員が安全装置を試験するあいだ、両方のエレベーターが完全に止まります。重い荷物を運ぶ必要がある方は、正午までにすませるようご計画ください。作業員は各エレベーター内の非常用電話も点検しますので、日中に短い警報音が何回か聞こえることがあります。階段を使うのがむずかしい方は、前もって管理事務所にご連絡ください。できるかぎりお手伝いいたします。',
      'ご不便をおかけしてもうしわけありません。この点検は、みなさまの安全を守るために、毎年法律で義務づけられているものです。ご質問があれば、平日の午前10時から午後6時までに管理事務所へお電話ください。グリーンヒル・アパート管理事務所',
    ],
    blanks: [
      { id: 'A', choices: ['than', 'as', 'then', 'that'], answer: 0, why: '比較級 longer のあとは than。longer than usual「いつもより長く」。' },
      { id: 'B', choices: ['who', 'which', 'whose', 'what'], answer: 0, why: '先行詞 Residents（人）で、あとに動詞 have が続くので主格の関係代名詞 who。which は物、whose は名詞が続く、what は先行詞をふくむ。' },
      { id: 'C', choices: ['to', 'for', 'so', 'that'], answer: 0, why: '「～するために」は to ＋ 動詞の原形（不定詞の副詞用法）。to keep everyone safe。' },
    ],
    tf: [
      { statement: '点検の日は、エレベーターが1日中まったく使えない。', answer: false, why: '第1段落 only one elevator will be in service（1台は動く）。止まるのは午後1時〜2時だけ。' },
      { statement: '午後1時から2時までは、両方のエレベーターが止まる。', answer: true, why: '第2段落 Between 1:00 p.m. and 2:00 p.m., both elevators will stop completely。' },
      { statement: '階段を使うのがむずかしい人は、前もって管理事務所に連絡するとよい。', answer: true, why: '第2段落 should contact the management office in advance。' },
      { statement: 'この点検は、住民の希望で今年だけ行われる。', answer: false, why: '第3段落 This inspection is required by law every year。' },
    ],
    qa: [
      { q: 'When should residents move heavy items on the day of the inspection?', choices: ['Before noon.', 'Between 1:00 p.m. and 2:00 p.m.', 'After 6:00 p.m.', 'On Friday morning.'], answer: 0, why: '第2段落 please plan to do so before noon。' },
    ],
  },
{
    id: 'adv-biz-meeting-email',
    title: 'An Email About the Sales Meeting',
    level: '難関大（ビジネスメール）',
    paragraphs: [
      "Dear all, thank you for your hard work this month. I am writing to let you know about some changes to next week's sales meeting. The meeting was planned for Tuesday at 10 a.m. in Room 301. However, the room will be closed for repairs, so we have decided to move the meeting to Wednesday at 2 p.m. in Room 502.",
      "Please note that this meeting will be longer than usual. In addition to the monthly sales report, we will discuss the new product ( A ) will be launched in December. Each team leader is asked to prepare a short presentation of about five minutes.",
      "If you cannot attend, please tell your team leader by Monday ( B ) someone can share the information with you later. We will also send the slides to everyone after the meeting.",
      "Lunch will not be provided, but coffee and snacks will be available in the room. If you have any questions, please contact me ( C ) extension 215. Thank you for your cooperation. Best regards, Aya Kimura, Sales Department",
    ],
    ja: [
      'みなさま、今月もお疲れさまです。来週の営業会議の変更についてお知らせします。会議は火曜日の午前10時に301号室で行う予定でした。しかし、その部屋が修理のため使えなくなるので、会議を水曜日の午後2時、502号室に変更することにしました。',
      'この会議はいつもより長くなりますので、ご注意ください。毎月の売上報告に加えて、12月に発売される新製品について話し合います。各チームリーダーは、5分ほどの短い発表を準備してください。',
      '出席できない場合は、あとでだれかが情報を伝えられるように、月曜日までにチームリーダーに知らせてください。会議のあとで、スライドも全員に送ります。',
      '昼食は出ませんが、部屋ではコーヒーと軽食をご用意しています。ご質問があれば、内線215番の私までご連絡ください。ご協力をお願いいたします。よろしくお願いいたします。営業部　木村亜矢',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'who', 'it'], answer: 0, why: '先行詞 the new product（もの）を説明する主格の関係代名詞は which。what は先行詞をふくむので名詞のあとには置けない。who は人。it では文がつながらない。' },
      { id: 'B', choices: ['so that', 'in order', 'so as', 'because of'], answer: 0, why: 'あとに someone can share … という文が続くので、so that ＋ 主語 ＋ can「～が…できるように」。in order・so as は to ＋ 原形、because of は名詞が続く。' },
      { id: 'C', choices: ['at', 'in', 'to', 'for'], answer: 0, why: '電話番号・内線番号で連絡するときは at：contact me at extension 215「内線215番で私に連絡する」。' },
    ],
    tf: [
      { statement: '会議は火曜日の午前10時に行われる。', answer: false, why: '第1段落 move the meeting to Wednesday at 2 p.m.。' },
      { statement: '会議の部屋が変わったのは、もとの部屋が修理で使えないからだ。', answer: true, why: '第1段落 the room will be closed for repairs。' },
      { statement: 'チームリーダーは5分ほどの発表を準備する。', answer: true, why: '第2段落 Each team leader is asked to prepare a short presentation of about five minutes。' },
      { statement: '会議では昼食が出る。', answer: false, why: '第4段落 Lunch will not be provided。' },
    ],
    qa: [
      { q: 'What should people do if they cannot attend the meeting?', choices: ['Tell their team leader by Monday.', 'Call extension 215 on Wednesday.', 'Prepare a five-minute presentation.', 'Send the slides to everyone.'], answer: 0, why: '第3段落 please tell your team leader by Monday。' },
    ],
  },
{
    id: 'adv-zeigarnik',
    title: 'The Task That Will Not Leave You Alone',
    level: '難関大（評論）',
    paragraphs: [
      "In the 1920s, a psychologist named Bluma Zeigarnik noticed something interesting in a restaurant. The waiters could remember long, complicated orders as long as the bills were unpaid. ( A ) the customers paid and left, however, the waiters seemed to forget the orders almost immediately.",
      "Curious about this, Zeigarnik designed experiments in which people were given simple tasks, such as solving puzzles, and were interrupted before finishing some of them. Later, the participants tended to remember the unfinished tasks better than the ones they had completed. This tendency became known as the \"Zeigarnik effect.\"",
      "Later studies have shown that the effect does not appear in every situation, but the basic idea has been influential. An unfinished task seems to stay active in our minds, ( B ) a small alarm that keeps ringing until we deal with it.",
      "Some writers use this idea to fight procrastination. If you find it hard to start a large project, they suggest simply beginning it, even for five minutes. Once a task has been started, the feeling that it is unfinished may encourage you ( C ) back to it.",
    ],
    ja: [
      '1920年代、ブルーマ・ゼイガルニクという心理学者が、あるレストランでおもしろいことに気づいた。ウェイターたちは、代金がはらわれていないあいだは、長く複雑な注文でもおぼえていられた。しかし客がお金をはらって帰ると、ウェイターはその注文をほとんどすぐに忘れてしまうようだった。',
      'これに興味をもったゼイガルニクは、人々にパズルを解くなどのかんたんな課題をあたえ、いくつかの課題は終わる前に中断させる実験を考えた。あとで、参加者は終えた課題よりも、終わっていない課題のほうをよくおぼえている傾向があった。この傾向は「ツァイガルニク効果（ゼイガルニク効果）」として知られるようになった。',
      'その後の研究で、この効果はどんな場面にも現れるわけではないことがわかっているが、基本的な考え方は大きなえいきょうをあたえてきた。終わっていない課題は、片づけるまで鳴りつづける小さな目覚まし時計のように、心の中で活動しつづけるようなのである。',
      'この考えを、先のばしと戦うのに使う書き手もいる。大きな仕事を始めるのがむずかしいときは、たとえ5分でもいいから、とにかく始めてみることをすすめるのだ。いったん始めてしまえば、まだ終わっていないという気持ちが、その仕事にもどってくるよううながしてくれるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['Once', 'Despite', 'During', 'Because of'], answer: 0, why: 'あとに the customers paid and left という文が続くので接続詞の Once「いったん～すると」。Despite・During・Because of は前置詞で、文は続かない。' },
      { id: 'B', choices: ['like', 'alike', 'likely', 'liking'], answer: 0, why: '前置詞 like「～のように」＋名詞。like a small alarm。alike・likely は形容詞（副詞）、liking は名詞・動名詞で名詞の前に置けない。' },
      { id: 'C', choices: ['to come', 'coming', 'come', 'came'], answer: 0, why: 'encourage 人 to ～「人に～するようにうながす」。encourage you to come back。' },
    ],
    tf: [
      { statement: 'ウェイターは、代金がはらわれる前の注文をよくおぼえていた。', answer: true, why: '第1段落 could remember long, complicated orders as long as the bills were unpaid。' },
      { statement: '実験では、終えた課題のほうがよく思い出された。', answer: false, why: '第2段落 remember the unfinished tasks better than the ones they had completed。' },
      { statement: 'その後の研究で、この効果はどんな場面でも必ず現れるとわかった。', answer: false, why: '第3段落 the effect does not appear in every situation。' },
      { statement: '大きな仕事は、5分だけでも始めてみるとよいと言う書き手がいる。', answer: true, why: '第4段落 they suggest simply beginning it, even for five minutes。' },
    ],
    qa: [
      { q: 'According to the passage, why might starting a task for just five minutes help?', choices: ['Small tasks are always remembered better than large ones.', 'Finishing it quickly helps you forget about it.', 'The sense that it\'s unfinished may pull you back.', 'Five minutes is enough time to complete most projects.'], answer: 2, why: '第4段落に、一度始めると未完了の感覚が作業に戻るよう促すとある。覚えやすいのは小さい作業ではなく未完了の作業で、早く終えて忘れることや5分で終わることは述べられていない。' },
    ],
  },
{
    id: 'adv-framing',
    title: 'Same Facts, Different Feelings',
    level: '難関大（評論）',
    paragraphs: [
      "Imagine that a doctor tells you that an operation has a 90 percent survival rate. Now imagine another doctor saying that the same operation has a 10 percent death rate. The two statements contain exactly the same information, but many people feel much more comfortable with the first one. This tendency to react differently to the same facts depending on how they are presented is called the \"framing effect.\"",
      "In one study, patients and even doctors were given information about treatments for a serious disease. When the results were described in terms of how many people survived, more of them chose surgery than ( A ) the same results were described in terms of how many people died.",
      "Framing appears in everyday life as well. A store may advertise meat as \"80 percent lean\" rather than \"20 percent fat,\" and a product may be described as having a \"95 percent success rate\" instead of failing in one case out of twenty. Such choices of words are not lies, ( B ) they can strongly influence how we decide.",
      "Being aware of framing can help us make better decisions. When we face an important choice, it is useful to restate the information in the opposite way, ( C ) \"90 percent survive\" becomes \"10 percent do not.\" If our feeling changes, we may be reacting to the words rather than to the facts.",
    ],
    ja: [
      '医者から、ある手術の生存率は90パーセントだと言われたと想像してほしい。次に、別の医者が、同じ手術の死亡率は10パーセントだと言うところを想像してほしい。この2つの言い方はまったく同じ情報をふくんでいるが、多くの人は最初の言い方のほうにずっと安心感をおぼえる。同じ事実でも、示され方によってちがう反応をしてしまうこの傾向は「フレーミング効果」とよばれる。',
      'ある研究では、患者や医者にさえも、重い病気の治療についての情報があたえられた。結果が何人生き残ったかという形で説明されたときは、同じ結果が何人亡くなったかという形で説明されたときよりも、手術を選ぶ人が多かった。',
      'フレーミングは日常生活にもあらわれる。店は肉を「脂肪20パーセント」ではなく「赤身80パーセント」と宣伝するかもしれないし、製品は、20回に1回失敗するのではなく「成功率95パーセント」と説明されるかもしれない。こうした言葉の選び方はうそではないが、私たちの決め方に強いえいきょうをあたえることがある。',
      'フレーミングを意識しておくと、よりよい決定をする助けになる。大切な選択をするときは、情報を逆の言い方で言い直してみるとよい。「90パーセントが生き残る」を「10パーセントは生き残らない」にするように。もし気持ちが変わるなら、私たちは事実ではなく言葉に反応しているのかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['when', 'during', 'despite', 'because of'], answer: 0, why: 'than のあとに the same results were described … という文が続くので接続詞の when「～したとき（より）」。during・despite・because of は前置詞。' },
      { id: 'B', choices: ['but', 'despite', 'because of', 'during'], answer: 0, why: '2つの文（Such choices of words are not lies／they can strongly influence …）をつなぐ接続詞 but「しかし」。despite・because of・during は前置詞。' },
      { id: 'C', choices: ['so that', 'in order', 'so as', 'such as'], answer: 0, why: 'あとに "90 percent survive" becomes … という文が続くので so that ＋ 文「～するように」。in order・so as は to ＋ 原形、such as は名詞の例が続く。' },
    ],
    tf: [
      { statement: '「生存率90％」と「死亡率10％」は、ちがう情報をふくんでいる。', answer: false, why: '第1段落 The two statements contain exactly the same information。' },
      { statement: '研究では、生き残った人数で説明されたときのほうが、手術を選ぶ人が多かった。', answer: true, why: '第2段落 more of them chose surgery than when … how many people died。' },
      { statement: '店が「赤身80％」と書くのは、うそをついていることになる。', answer: false, why: '第3段落 Such choices of words are not lies。' },
      { statement: '情報を逆の言い方にしてみると、言葉に反応しているかどうかに気づける。', answer: true, why: '第4段落 If our feeling changes, we may be reacting to the words rather than to the facts。' },
    ],
    qa: [
      { q: 'What does the author suggest doing when we face an important choice?', choices: ['Restate the information in the opposite way.', 'Always ask a doctor for advice.', 'Choose the option described with more words.', 'Avoid reading any numbers.'], answer: 0, why: '第4段落 it is useful to restate the information in the opposite way。' },
    ],
  },
{
    id: 'adv-spotlight',
    title: 'Nobody Is Watching as Closely as You Think',
    level: '難関大（評論）',
    paragraphs: [
      "Have you ever worried all day about a small stain on your shirt, sure that everyone was looking at it? Psychologists call this the \"spotlight effect\": the tendency to believe that other people notice our appearance and behavior much more ( A ) they actually do.",
      "In a well-known study, college students were asked to wear a T-shirt showing a large picture of a singer whom most of them found embarrassing, and then to walk into a room full of other students. Afterward, the wearers guessed that about half of the people in the room had noticed the shirt. In reality, only about a quarter had.",
      "Why do we overestimate how much others notice us? One reason is that we experience the world from the center of our own lives. We are so aware of our own feelings ( B ) we find it hard to remember that other people are busy thinking about themselves, not about us.",
      "Understanding the spotlight effect can reduce unnecessary worry. A mistake in a speech or a bad hair day is likely to be forgotten by others much sooner than we expect. Knowing this may give us the courage to try new things ( C ) fearing that everyone is watching.",
    ],
    ja: [
      'シャツについた小さなしみのことを、みんなに見られていると思いこんで一日じゅう気にしたことはないだろうか。心理学者はこれを「スポットライト効果」とよぶ。ほかの人が自分の見た目やふるまいに、実際よりずっと多く気づいていると思いこむ傾向である。',
      'よく知られた研究で、大学生たちは、ほとんどの学生がはずかしいと感じる歌手の大きな絵がついたTシャツを着て、ほかの学生でいっぱいの部屋に入るよう求められた。あとで、シャツを着た学生たちは、部屋にいた人のおよそ半分がシャツに気づいたと予想した。実際に気づいていたのは、およそ4分の1だけだった。',
      'なぜ私たちは、ほかの人が自分に気づく程度を大きく見積もってしまうのだろうか。1つの理由は、私たちが自分の人生の中心から世界を経験していることである。私たちは自分の気持ちをあまりに強く意識しているので、ほかの人は私たちのことではなく、自分のことを考えるのにいそがしいのだということを、思い出しにくいのである。',
      'スポットライト効果を理解すると、よけいな心配を減らすことができる。スピーチでの失敗や、髪型がうまく決まらない日のことは、思っているよりずっと早くほかの人に忘れられるだろう。このことを知っていれば、みんなに見られていると恐れずに、新しいことに挑戦する勇気がわくかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['than', 'as', 'then', 'that'], answer: 0, why: '比較級 much more のあとは than。much more than they actually do「実際よりずっと多く」。' },
      { id: 'B', choices: ['that', 'which', 'what', 'as'], answer: 0, why: 'so ～ that …「とても～なので…」。so aware of our own feelings that we find it hard …。' },
      { id: 'C', choices: ['without', 'not', 'no', 'none'], answer: 0, why: '前置詞 without ＋ 動名詞 fearing「恐れずに」。not・no・none は前置詞ではないので fearing をつなげられない。' },
    ],
    tf: [
      { statement: 'スポットライト効果とは、ほかの人が自分に気づいている程度を、実際より大きく思う傾向である。', answer: true, why: '第1段落 notice our appearance and behavior much more than they actually do。' },
      { statement: '実験でシャツに気づいた人は、着た学生の予想よりずっと多かった。', answer: false, why: '第2段落 guessed … about half … In reality, only about a quarter had。' },
      { statement: '自分の気持ちを強く意識しているため、ほかの人も自分のことで頭がいっぱいだと忘れやすい。', answer: true, why: '第3段落 We are so aware of our own feelings that we find it hard to remember …。' },
      { statement: 'スピーチでの失敗は、ほかの人にいつまでもおぼえられている。', answer: false, why: '第4段落 is likely to be forgotten by others much sooner than we expect。' },
    ],
    qa: [
      { q: 'In the study, about how many people in the room actually noticed the T-shirt?', choices: ['About a quarter of them.', 'About half of them.', 'Almost all of them.', 'Nobody at all.'], answer: 0, why: '第2段落 In reality, only about a quarter had。' },
    ],
  },
{
    id: 'adv-bystander',
    title: 'Why Crowds Hesitate',
    level: '難関大（評論）',
    paragraphs: [
      "When someone collapses on a busy street, we might expect that the more people there are nearby, the more likely it is that someone will help. Surprisingly, research suggests the opposite. Psychologists call this tendency the \"bystander effect\": people are less likely to help a person in need ( A ) many others are present.",
      "In a famous series of experiments in the 1960s, participants heard over an intercom what sounded like another person having a medical emergency. When participants believed they were the only one who could hear it, most of them went to help quickly. When they believed several other people could also hear it, they were much slower to act, and some did not act at all.",
      "One explanation is the \"diffusion of responsibility.\" When many people are present, each person feels less personally responsible, assuming that someone else will step in. People also look to others to decide whether a situation is truly an emergency. If everyone around them seems calm, they may conclude that nothing serious is happening, ( B ) help is in fact urgently needed.",
      "Knowing about the bystander effect can help us overcome it. If you ever need help in a crowd, experts suggest ( C ) to one specific person and asking that person directly, for example, \"You in the blue jacket, please call an ambulance.\" This makes it clear who is responsible.",
    ],
    ja: [
      'にぎやかな通りでだれかがたおれたとき、近くに人が多いほど、だれかが助ける可能性が高くなると思うかもしれない。おどろいたことに、研究はその逆を示している。心理学者はこの傾向を「傍観者効果」とよぶ。ほかの人がたくさんいると、人は助けを必要としている人を助けにくくなるのである。',
      '1960年代の有名な一連の実験で、参加者はインターホンごしに、別の人が急病になったように聞こえる声を聞いた。自分だけがそれを聞いていると思った参加者の多くは、すぐに助けに行った。ほかにも何人かが聞いていると思った参加者は、行動するのがずっとおそく、まったく行動しない人もいた。',
      '説明の1つは「責任の分散」である。多くの人がいると、一人ひとりが自分の責任を感じにくくなり、だれかほかの人が手を出すだろうと思いこむ。また人は、ほかの人を見て、その状況が本当に緊急かどうかを判断する。まわりのみんなが落ち着いているように見えると、実際には助けが急いで必要なのに、深刻なことは何も起きていないと結論づけてしまうことがある。',
      '傍観者効果について知っておくと、それを乗りこえる助けになる。もし人ごみで助けが必要になったら、専門家は、特定の1人を指さして、その人に直接たのむことをすすめている。たとえば、「青い上着のあなた、救急車を呼んでください」のように言うのだ。こうすれば、だれに責任があるかがはっきりする。',
    ],
    blanks: [
      { id: 'A', choices: ['when', 'during', 'despite', 'because of'], answer: 0, why: 'あとに many others are present という文が続くので接続詞の when「～するとき」。during・despite・because of は前置詞。' },
      { id: 'B', choices: ['even though', 'in spite of', 'because of', 'despite'], answer: 0, why: 'あとに help is … needed という文が続くので接続詞の even though「～にもかかわらず」。in spite of・because of・despite は前置詞で、文は続かない。' },
      { id: 'C', choices: ['pointing', 'point', 'to point', 'pointed'], answer: 0, why: 'suggest のあとは動名詞（～ing）。suggest pointing … and asking …。suggest to do の形は使わない。' },
    ],
    tf: [
      { statement: 'まわりに人が多いほど、助けてもらえる可能性が高くなると研究は示している。', answer: false, why: '第1段落 Surprisingly, research suggests the opposite。' },
      { statement: '実験で、自分だけが聞いていると思った参加者の多くは、すぐに助けに行った。', answer: true, why: '第2段落 most of them went to help quickly。' },
      { statement: 'まわりの人が落ち着いていると、深刻なことは起きていないと思ってしまうことがある。', answer: true, why: '第3段落 If everyone around them seems calm, they may conclude that nothing serious is happening。' },
      { statement: '専門家は、人ごみではまわりの全員に大声で呼びかけるのがよいとすすめている。', answer: false, why: '第4段落 pointing to one specific person and asking that person directly。' },
    ],
    qa: [
      { q: 'Why does each person feel less responsible when many others are present?', choices: ['They assume that someone else will step in.', 'They cannot hear the person who needs help.', 'They are too busy to stop.', 'They think that helping is not allowed.'], answer: 0, why: '第3段落 each person feels less personally responsible, assuming that someone else will step in。' },
    ],
  },
{
    id: 'adv-testing-effect',
    title: 'Close Your Notes',
    level: '難関大（評論）',
    paragraphs: [
      "Most students prepare for exams by reading their notes again and again. This feels productive, because the material becomes more and more familiar. However, a large body of research suggests that familiarity can be misleading. Recognizing information when we see it is very different from being able to ( A ) it when we need it.",
      "In a typical experiment, students read a short text. One group then read it several more times, while another group read it once and then tried to write down everything they could remember without looking. A week later, the second group remembered considerably more, even though they had spent less time looking at the text. This finding is often called the \"testing effect.\"",
      "Why does testing work so well? When we try to retrieve information from memory, we have to rebuild it, and this effort appears to strengthen the paths that lead back to it. Even when an attempt fails, checking the correct answer afterward can make the memory stronger than ( B ) reading it again.",
      "The effect becomes even more powerful when practice tests are spread out over several days ( C ) crowded into one evening. Taken together, these studies suggest a clear lesson: instead of reading your notes once more, close them and ask yourself what you actually remember.",
    ],
    ja: [
      'ほとんどの学生は、ノートを何度も読み返して試験の準備をする。内容にどんどん見覚えが出てくるので、これは身についているように感じられる。しかし、多くの研究は、見覚えがあるという感覚は人をあざむくことがあると示している。見たときに情報がわかることと、必要なときにそれを思い出せることとは、大きくちがうのである。',
      'よくある実験では、学生たちが短い文章を読む。一方のグループはそのあと何回か読み返し、もう一方のグループは1回だけ読んで、見ないで思い出せることをすべて書き出そうとした。1週間後、文章を見ていた時間は短かったにもかかわらず、2つ目のグループのほうがかなり多くのことを覚えていた。この発見はしばしば「テスト効果」とよばれる。',
      'なぜテストはこれほど効果があるのだろうか。記憶から情報を取り出そうとするとき、私たちはそれを組み立て直さなければならず、この努力が、その情報へもどる道すじを強めるようなのである。思い出そうとして失敗したときでさえ、あとで正しい答えを確認すれば、ただ読み返すよりも記憶を強くできることがある。',
      'この効果は、練習テストを一晩につめこむのではなく、何日かに分けて行うと、さらに強くなる。これらの研究をまとめると、はっきりした教訓が見えてくる。ノートをもう一度読むかわりに、ノートを閉じて、自分が本当に何を覚えているかを自分に問いかけてみよう。',
    ],
    blanks: [
      { id: 'A', choices: ['recall', 'recalling', 'recalled', 'to recall'], answer: 0, why: 'be able to のあとは動詞の原形。being able to recall it「それを思い出せること」。to recall だと to が2つ重なる。' },
      { id: 'B', choices: ['simply', 'simple', 'simplicity', 'simpler'], answer: 0, why: '動名詞 reading を修飾するのは副詞 simply「ただ～するだけ」。simple・simpler は形容詞、simplicity は名詞。' },
      { id: 'C', choices: ['rather than', 'instead', 'despite', 'although'], answer: 0, why: 'A rather than B「B ではなく A」。spread out over several days rather than crowded into one evening。instead は副詞（instead of なら可）、despite は前置詞で過去分詞の前に置けない、although は接続詞で文が続く。' },
    ],
    tf: [
      { statement: 'ノートを何度も読み返すと、内容に見覚えが出てくる。', answer: true, why: '第1段落 the material becomes more and more familiar。' },
      { statement: '実験では、何度も読み返したグループのほうが1週間後によく覚えていた。', answer: false, why: '第2段落 A week later, the second group remembered considerably more。' },
      { statement: '思い出そうとして失敗しても、あとで答えを確認すれば記憶が強まることがある。', answer: true, why: '第3段落 Even when an attempt fails, checking the correct answer afterward can make the memory stronger。' },
      { statement: '練習テストは、一晩にまとめてやるほうが効果が大きい。', answer: false, why: '第4段落 spread out over several days rather than crowded into one evening。' },
    ],
    qa: [
      { q: 'What does the author suggest students do instead of rereading their notes?', choices: ['Close their notes and ask themselves what they remember.', 'Read their notes more slowly.', 'Copy their notes into a new notebook.', 'Study only on the night before the exam.'], answer: 0, why: '第4段落 close them and ask yourself what you actually remember。' },
    ],
  },
{
    id: 'adv-walking-ideas',
    title: 'Ideas on Foot',
    level: '難関大（評論）',
    paragraphs: [
      "Many famous thinkers, from philosophers to scientists, were known for taking long walks. They often claimed that their best ideas came to them while they were walking. For a long time, this was only a personal impression. In recent years, however, researchers have begun to test ( A ) walking really helps people think.",
      "In one well-known set of experiments at an American university, participants were asked to think of as many creative uses as possible for everyday objects, such as a button or a tire. Some did the task while sitting, and others did it while walking on a treadmill facing a blank wall. The walkers came up with significantly more ideas ( B ) the sitters did.",
      "Interestingly, walking did not help with every kind of thinking. On tasks that required finding a single correct answer, walking gave no clear advantage. It seems that walking is most useful when we need to produce many possible ideas, not when we need to focus narrowly on one solution. Some researchers suggest that gentle, regular movement may relax the mind and allow thoughts to flow more freely.",
      "These findings point to a simple strategy. When you are stuck on a problem that needs fresh ideas, a short walk may be more useful than ( C ) at your desk. On the other hand, when you need to check details carefully, sitting quietly may still be the better choice.",
    ],
    ja: [
      '哲学者から科学者まで、多くの有名な思想家は長い散歩をすることで知られていた。彼らはよく、いちばんよいアイデアは歩いているときに浮かんだと語っていた。長いあいだ、これは個人の印象にすぎなかった。しかし近年、研究者たちは、歩くことが本当に考える助けになるのかどうかを確かめ始めている。',
      'アメリカのある大学で行われたよく知られた一連の実験では、参加者は、ボタンやタイヤのような身近な物の独創的な使い方をできるだけ多く考えるよう求められた。座ったまま課題をした人もいれば、何もない壁に向かってルームランナーの上を歩きながら課題をした人もいた。歩いた人は、座っていた人よりもかなり多くのアイデアを思いついた。',
      '興味深いことに、歩くことはあらゆる種類の思考に役立つわけではなかった。1つの正しい答えを見つける必要がある課題では、歩くことにはっきりとした利点はなかった。歩くことがもっとも役立つのは、たくさんの考えられるアイデアを生み出す必要があるときであり、1つの解決策にせまく集中する必要があるときではないようだ。おだやかで規則的な動きが心をほぐし、考えをより自由に流れさせるのかもしれないと言う研究者もいる。',
      'これらの発見は、かんたんな作戦を示している。新しいアイデアが必要な問題で行きづまったときは、机を見つめているよりも、短い散歩のほうが役立つかもしれない。その一方で、細かい点を注意深く確認する必要があるときは、やはり静かに座っているほうがよい選択かもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['whether', 'unless', 'so', 'despite'], answer: 0, why: 'test の目的語になる名詞節「～かどうか」は whether。unless「～しないかぎり」・so「だから」は名詞節をつくらない。despite は前置詞。' },
      { id: 'B', choices: ['than', 'as', 'then', 'that'], answer: 0, why: '比較級 more ideas のあとは than。more ～ than the sitters did「座っていた人より多くの～」。' },
      { id: 'C', choices: ['staring', 'stare', 'stares', 'stared'], answer: 0, why: '前置詞のはたらきをする than のあとで、a short walk と比べる名詞のかたまりなので動名詞 staring「見つめること」。' },
    ],
    tf: [
      { statement: '有名な思想家の中には、散歩中によいアイデアが浮かんだと語る人がいた。', answer: true, why: '第1段落 They often claimed that their best ideas came to them while they were walking。' },
      { statement: '実験では、歩いた人のほうが座っていた人よりアイデアが少なかった。', answer: false, why: '第2段落 The walkers came up with significantly more ideas than the sitters did。' },
      { statement: '歩くことは、どんな種類の考える作業にも役立つ。', answer: false, why: '第3段落 walking did not help with every kind of thinking。' },
      { statement: '細かい点を確認するときは、静かに座っているほうがよいこともある。', answer: true, why: '第4段落 when you need to check details carefully, sitting quietly may still be the better choice。' },
    ],
    qa: [
      { q: 'According to the passage, when is walking most useful?', choices: ['When we need to produce many possible ideas.', 'When we need to find one correct answer.', 'When we need to check details carefully.', 'When we feel very tired.'], answer: 0, why: '第3段落 walking is most useful when we need to produce many possible ideas。' },
    ],
  },
{
    id: 'adv-decoy',
    title: 'The Popcorn That Nobody Buys',
    level: '難関大（評論）',
    paragraphs: [
      "Imagine a movie theater that sells popcorn in two sizes: a small one for 300 yen and a large one for 700 yen. Many customers choose the small size. Now suppose the theater adds a medium size for 650 yen. Surprisingly, more people may start buying the large size, ( A ) almost nobody buys the medium one.",
      "Researchers call this the \"decoy effect.\" The medium size works as a decoy: it is not really meant to be chosen, but to make another option look better. Compared with the medium size, the large size seems like a bargain, because it costs only 50 yen more for much more popcorn. Without the decoy, people compare only the small and large sizes, and the difference in price looks ( B ) bigger.",
      "The decoy effect shows that our choices are not always based on the value of each option alone. Instead, we often judge an option by comparing it with ( C ) is placed beside it. Shops and online services can use this tendency to guide customers, so before you pay, it is worth asking yourself whether you really need the option you are about to choose.",
    ],
    ja: [
      '映画館が、ポップコーンを2つのサイズで売っているとしよう。小は300円、大は700円である。多くの客は小を選ぶ。ここで、映画館が650円の中サイズを加えたとする。おどろいたことに、中サイズを買う人はほとんどいないのに、大サイズを買う人がふえることがある。',
      '研究者はこれを「おとり効果」とよぶ。中サイズはおとりの役目をしている。つまり、本当に選ばれるためではなく、ほかの選択肢をよく見せるためにあるのだ。中サイズとくらべると、大サイズはたった50円高いだけでずっと多くのポップコーンが手に入るので、お買い得に見える。おとりがなければ、人々は小と大だけをくらべ、値段の差はずっと大きく見える。',
      'おとり効果は、私たちの選択がいつもそれぞれの選択肢の価値だけにもとづいているわけではないことを示している。むしろ私たちは、ある選択肢を、そのとなりに置かれているものとくらべて判断することが多い。店やオンラインのサービスはこの傾向を使って客を誘導できるので、お金をはらう前に、選ぼうとしている選択肢が本当に必要かどうか自分に問いかけてみる価値がある。',
    ],
    blanks: [
      { id: 'A', choices: ['although', 'despite', 'in spite of', 'due to'], answer: 0, why: 'あとに almost nobody buys … という文が続くので接続詞の although「～だけれども」。despite・in spite of・due to は前置詞で、文は続かない。' },
      { id: 'B', choices: ['much', 'very', 'more', 'most'], answer: 0, why: '比較級 bigger を強めるのは much「ずっと」。very・more・most は比較級の前に置けない。' },
      { id: 'C', choices: ['what', 'which', 'that', 'it'], answer: 0, why: '前置詞 with の目的語で、あとに is placed … が続くので、先行詞をふくむ関係代名詞 what「～するもの」。which・that は先行詞がないと使えない。' },
    ],
    tf: [
      { statement: '中サイズを加えると、大サイズを買う人がふえることがある。', answer: true, why: '第1段落 more people may start buying the large size。' },
      { statement: '中サイズは、いちばん多く売れるように用意されている。', answer: false, why: '第2段落 it is not really meant to be chosen。' },
      { statement: 'おとりがないと、人々は小と大だけをくらべる。', answer: true, why: '第2段落 Without the decoy, people compare only the small and large sizes。' },
      { statement: '筆者は、店がこの傾向を使うことはないと述べている。', answer: false, why: '第3段落 Shops and online services can use this tendency to guide customers。' },
    ],
    qa: [
      { q: 'Why does the large size seem like a bargain after the medium size is added?', choices: ['Because it costs only a little more than the medium size.', 'Because it becomes cheaper than the small size.', 'Because the medium size is sold out.', 'Because the theater gives free drinks with it.'], answer: 0, why: '第2段落 it costs only 50 yen more for much more popcorn。' },
    ],
  },
{
    id: 'adv-hindsight',
    title: 'I Knew It All Along',
    level: '難関大（評論）',
    paragraphs: [
      "After a sports match or an election, many people say, \"I knew that would happen.\" Often, however, they did not feel so sure before the result was known. Psychologists call this tendency \"hindsight bias\": once we know how events turned out, we tend to believe that the outcome was more predictable ( A ) it really was.",
      "In a classic study from the 1970s, researchers asked people to estimate the chances of various possible outcomes of a political event before it happened. After the event, the same people were asked to recall their earlier estimates. Many remembered giving higher chances to the outcomes that actually occurred than they had in fact given. Their memories seemed to have been quietly rewritten by the new information.",
      "Hindsight bias may seem harmless, but it can lead us to learn the wrong lessons. If a decision turns out badly, we may blame the person who made it, ( B ) the information available at the time did not point clearly to the problem. It can also make us overconfident about our ability to predict the future. One way to reduce the bias is to write down predictions ( C ) we learn the result, so that we can later compare what we actually expected with what happened.",
    ],
    ja: [
      'スポーツの試合や選挙のあとで、多くの人は「そうなると思っていた」と言う。しかし実際には、結果がわかる前はそれほど確信していなかったことが多い。心理学者はこの傾向を「後知恵バイアス」とよぶ。いったん出来事がどうなったかを知ると、私たちはその結果が実際よりも予測しやすかったと思いこみがちなのである。',
      '1970年代の古典的な研究で、研究者たちは人々に、ある政治的な出来事が起こる前に、考えられるさまざまな結果の可能性を見積もってもらった。出来事のあとで、同じ人たちに前の見積もりを思い出してもらった。多くの人は、実際に起こった結果に、本当に答えた値よりも高い可能性をつけていたと記憶していた。彼らの記憶は、新しい情報によって気づかないうちに書きかえられていたようなのである。',
      '後知恵バイアスは害がないように思えるかもしれないが、まちがった教訓を学ぶことにつながりうる。ある決定が悪い結果になると、そのとき手に入った情報ははっきりと問題を示していなかったにもかかわらず、決定した人を責めてしまうかもしれない。また、未来を予測する自分の力について自信過剰にさせることもある。このバイアスを減らす1つの方法は、結果を知る前に予測を書きとめておき、あとで実際に予想していたことと起こったことをくらべられるようにすることである。',
    ],
    blanks: [
      { id: 'A', choices: ['than', 'as', 'that', 'then'], answer: 0, why: '比較級 more predictable のあとは than。more ～ than it really was「実際よりも～」。' },
      { id: 'B', choices: ['even though', 'in spite of', 'because of', 'despite'], answer: 0, why: 'あとに the information … did not point という文が続くので接続詞の even though「～にもかかわらず」。in spite of・because of・despite は前置詞で文は続かない。' },
      { id: 'C', choices: ['before', 'during', 'until then', 'prior'], answer: 0, why: 'あとに we learn the result という文が続くので接続詞の before「～する前に」。during・prior は前置詞・形容詞、until then は副詞句で文をつなげない。' },
    ],
    tf: [
      { statement: '後知恵バイアスとは、結果を知ったあとで、それが実際より予測しやすかったと思う傾向である。', answer: true, why: '第1段落 we tend to believe that the outcome was more predictable than it really was。' },
      { statement: '研究の参加者は、自分の前の見積もりを正確に思い出せた。', answer: false, why: '第2段落 Many remembered giving higher chances … than they had in fact given。' },
      { statement: '筆者は、後知恵バイアスはまったく害がないと述べている。', answer: false, why: '第3段落 it can lead us to learn the wrong lessons。' },
      { statement: '結果を知る前に予測を書きとめることで、バイアスを減らせる。', answer: true, why: '第3段落 One way to reduce the bias is to write down predictions before we learn the result。' },
    ],
    qa: [
      { q: 'What happened to the participants\' memories in the 1970s study?', choices: ['They seemed to be changed by knowing the actual outcome.', 'They became more accurate over time.', 'They were completely forgotten.', 'They matched their earlier estimates exactly.'], answer: 0, why: '第2段落 Their memories seemed to have been quietly rewritten by the new information。' },
    ],
  },
{
    id: 'toefl-woodpecker',
    title: 'How Woodpeckers Avoid Headaches',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Woodpeckers strike tree trunks with their beaks again and again, sometimes many times per second, to find insects and to make holes for their nests. For humans, hitting our heads this hard would quickly cause injury. This has led scientists to ask ( A ) woodpeckers are able to avoid brain damage.",
      "For many years, a popular explanation was that the bird's head works like a helmet that absorbs the shock. However, a study published in 2022 suggested a different answer. Using high-speed video, researchers found that a woodpecker's head acts more like a stiff hammer than a cushion. If the head absorbed much of the shock, the bird would have to hit even harder ( B ) make holes, which would waste energy.",
      "So why is the brain safe? Part of the answer appears to be size. A woodpecker's brain is very small and light, so the forces acting on it during pecking are much lower than those that would harm a larger brain such as ours. The woodpecker also has a long tongue that wraps around the back of its skull when it is not in use. This feature, ( C ) is unusual among birds, helps the bird reach insects deep inside wood.",
    ],
    ja: [
      'キツツキは、虫を見つけたり巣の穴を作ったりするために、ときには1秒に何回もくちばしで木の幹を何度もたたく。人間なら、これほど強く頭を打てばすぐにけがをしてしまう。そのため科学者たちは、キツツキがどうやって脳のダメージを防いでいるのかを問うようになった。',
      '長年、よく知られた説明は、鳥の頭がヘルメットのように衝撃を吸収しているというものだった。しかし、2022年に発表されたある研究は、別の答えを示した。高速度ビデオを使って、研究者たちは、キツツキの頭がクッションというより、かたいハンマーのようにはたらいていることを発見した。もし頭が衝撃の多くを吸収していたら、鳥は穴をあけるためにもっと強く打たなければならず、エネルギーのむだになるだろう。',
      'では、なぜ脳は安全なのだろうか。答えの一部は大きさにあるようだ。キツツキの脳はとても小さくて軽いので、つつくときに脳にかかる力は、私たちのようなもっと大きな脳を傷つける力よりずっと小さいのである。キツツキはまた、使っていないときには頭骨のうしろに巻きついている長い舌を持っている。この特徴は鳥の中ではめずらしく、木の奥深くにいる虫にとどくのに役立っている。',
    ],
    blanks: [
      { id: 'A', choices: ['how', 'what', 'which', 'who'], answer: 0, why: 'ask how ～「どのように～かを問う」。あとが完全な文（woodpeckers are able to avoid brain damage）なので how。what・which は文の中に欠けた名詞が必要。' },
      { id: 'B', choices: ['to', 'for', 'by', 'with'], answer: 0, why: 'あとが原形の make なので目的を表す不定詞 to「～するために」。' },
      { id: 'C', choices: ['which', 'what', 'that', 'who'], answer: 0, why: 'コンマのあとの非制限用法なので which。that は非制限用法では使えず、who は人に使う。' },
    ],
    tf: [
      { statement: 'キツツキは虫を見つけたり巣の穴を作ったりするために木をたたく。', answer: true, why: '第1段落 to find insects and to make holes for their nests。' },
      { statement: '2022年の研究によると、キツツキの頭はクッションのように衝撃を吸収している。', answer: false, why: '第2段落 a woodpecker\'s head acts more like a stiff hammer than a cushion。' },
      { statement: 'キツツキの脳が安全な理由の1つは、脳が小さくて軽いことである。', answer: true, why: '第3段落 A woodpecker\'s brain is very small and light。' },
      { statement: '長い舌を持つことは、鳥の中ではふつうのことである。', answer: false, why: '第3段落 This feature, which is unusual among birds。' },
    ],
    qa: [
      { q: 'Why would a shock-absorbing head be a disadvantage for a woodpecker?', choices: ['Its small brain would then receive much stronger forces.', 'Its long tongue could no longer wrap around the skull.', 'It would need to strike harder, which wastes energy.', 'It would no longer be able to find insects.'], answer: 2, why: '第2段落に、頭が衝撃を吸収すると穴をあけるためにもっと強くたたく必要があり、エネルギーのむだになるとある。小さな脳や長い舌は第3段落の別の話で、虫が見つからなくなるとは書かれていない。' },
    ],
  },
{
    id: 'hs-taiko',
    title: 'The Beat That Brought Us Together',
    level: '高校入試（体験文）',
    paragraphs: [
      "When I entered junior high school, I joined the taiko club. I thought it would be easy ( A ) I had played the drums in a band before. But taiko was different. Each drum is very large, and we have to use our whole body to play. After the first practice, my arms hurt so much that I could not hold my chopsticks at dinner.",
      "The most difficult thing for me was playing together with the other members. I wanted to show my power, so I always hit the drum too hard and too fast. One day, our leader, Aya, stopped the practice and said, \"Kenta, taiko is not a race. Listen to everyone's sound, and then you will know when to hit.\"",
      "At first, I did not understand her words. But I started to listen carefully to the other drums while I was playing. Little by little, our sounds began to match. In autumn, we performed at the town festival. When we finished, many people stood up and clapped ( B ) a long time. An old man came to me and said, \"Your beat made my heart warm.\"",
      "From this experience, I learned that listening to others is as important ( C ) showing my own power. I will keep this lesson in mind, not only in taiko but also in my school life.",
    ],
    ja: [
      '中学校に入学したとき、私は和太鼓部に入りました。前にバンドでドラムをたたいたことがあったので、かんたんだろうと思っていました。でも、和太鼓はちがいました。それぞれの太鼓はとても大きく、体全体を使ってたたかなければなりません。最初の練習のあと、腕がとても痛くて、夕食のときにはしを持てませんでした。',
      '私にとっていちばんむずかしかったのは、ほかの部員といっしょに演奏することでした。自分の力を見せたかったので、いつも強すぎ、速すぎにたたいていました。ある日、リーダーのアヤさんが練習を止めて、「ケンタ、太鼓は競走じゃないよ。みんなの音を聞いて。そうすれば、いつたたけばいいかわかるよ」と言いました。',
      'はじめは、その言葉がわかりませんでした。でも、演奏しながらほかの太鼓をよく聞くようにしました。少しずつ、私たちの音がそろい始めました。秋に、私たちは町の祭りで演奏しました。終わると、たくさんの人が立ち上がって長い間拍手をしてくれました。1人のおじいさんが私のところに来て、「きみたちのリズムで心があたたかくなったよ」と言ってくれました。',
      'この経験から、私はほかの人の音を聞くことは、自分の力を見せることと同じくらい大切だと学びました。この教訓を、和太鼓だけでなく学校生活でも心にとめておくつもりです。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'because of', 'during', 'without'], answer: 0, why: 'あとに I had played … という文が続くので接続詞の because。because of・during・without は前置詞。' },
      { id: 'B', choices: ['for', 'since', 'during', 'by'], answer: 0, why: 'for a long time「長い間」。期間の長さは for。' },
      { id: 'C', choices: ['as', 'than', 'that', 'so'], answer: 0, why: 'as ＋ 形容詞 ＋ as …「…と同じくらい～」。as important as showing my own power。' },
    ],
    tf: [
      { statement: 'ケンタは、和太鼓はかんたんだと最初は思っていた。', answer: true, why: '第1段落 I thought it would be easy。' },
      { statement: 'アヤは、もっと強く速くたたくようにケンタに言った。', answer: false, why: '第2段落 taiko is not a race. Listen to everyone\'s sound。' },
      { statement: '祭りの演奏のあと、多くの人が立ち上がって拍手した。', answer: true, why: '第3段落 many people stood up and clapped。' },
      { statement: 'ケンタは、この教訓は和太鼓のときだけ大切だと考えている。', answer: false, why: '第4段落 not only in taiko but also in my school life。' },
    ],
    qa: [
      { q: 'What did Kenta start to do after Aya spoke to him?', choices: ['He listened carefully to the other drums while playing.', 'He practiced alone after school.', 'He played faster than the other members.', 'He stopped playing the drums in a band.'], answer: 0, why: '第3段落 I started to listen carefully to the other drums while I was playing。' },
    ],
  },
{
    id: 'toefl-pearl',
    title: 'How a Pearl Is Made',
    level: 'TOEFL・IELTS（科学）',
    paragraphs: [
      "A pearl is one of the few gems produced by a living animal. Pearls form inside mollusks such as oysters and mussels. The process begins ( A ) a small object, often a tiny piece of foreign material or a parasite, gets inside the shell and irritates the animal's soft body.",
      "To protect itself, the mollusk covers the object with layers of a substance called nacre, the same material that lines the inside of its shell. Nacre is made mostly of calcium carbonate arranged in extremely thin layers. Over months or years, thousands of these layers build up around the object. Because light reflects off the many layers in slightly different ways, a good pearl has its famous soft shine, ( B ) is known as luster.",
      "Natural pearls are very rare, ( C ) only a small number of mollusks ever produce one. In the late nineteenth century, Mikimoto Kokichi in Japan developed a way to grow pearls by placing a small object inside an oyster on purpose. These \"cultured\" pearls are formed by the same natural process, but people start it. Today, most pearls sold around the world are cultured.",
    ],
    ja: [
      '真珠は、生き物がつくる数少ない宝石の1つである。真珠はカキやイガイのような貝の中でできる。その過程は、小さな物、よくあるのは小さな異物や寄生虫が殻の中に入り、貝のやわらかい体を刺激したときに始まる。',
      '身を守るために、貝はその物を、殻の内側をおおっているのと同じ物質である真珠層でおおう。真珠層は主に炭酸カルシウムでできていて、とてもうすい層に重なっている。何か月も何年もかけて、何千ものこうした層が物のまわりに積み重なる。光がたくさんの層でそれぞれ少しずつちがうふうに反射するので、よい真珠には有名なやわらかい輝きがあり、それはラスター（照り）とよばれる。',
      '天然の真珠はとてもめずらしい。なぜなら、真珠をつくる貝はごくわずかしかいないからである。19世紀の終わりに、日本の御木本幸吉が、わざとカキの中に小さな物を入れて真珠を育てる方法を開発した。こうした「養殖」真珠は同じ自然の過程でできるが、それを始めるのは人間である。今日では、世界中で売られている真珠のほとんどが養殖真珠である。',
    ],
    blanks: [
      { id: 'A', choices: ['when', 'during', 'since then', 'among'], answer: 0, why: 'あとに a small object … gets inside という文が続くので接続詞の when「～するとき」。during・among は前置詞、since then は副詞句で文をつなげない。' },
      { id: 'B', choices: ['which', 'what', 'that', 'who'], answer: 0, why: 'コンマのあとの非制限用法で、前の a soft shine を受ける which。that は非制限用法では使えない。' },
      { id: 'C', choices: ['because', 'because of', 'despite', 'due to'], answer: 0, why: 'あとに only a small number of mollusks ever produce one という文が続くので接続詞の because。because of・despite・due to は前置詞。' },
    ],
    tf: [
      { statement: '真珠は、貝の中に入った小さな物を貝が真珠層でおおってできる。', answer: true, why: '第2段落 the mollusk covers the object with layers of a substance called nacre。' },
      { statement: '真珠層は、厚い1枚の層でできている。', answer: false, why: '第2段落 arranged in extremely thin layers。' },
      { statement: '天然の真珠はとてもめずらしい。', answer: true, why: '第3段落 Natural pearls are very rare。' },
      { statement: '養殖真珠は、天然の真珠とはまったくちがう過程でできる。', answer: false, why: '第3段落 formed by the same natural process, but people start it。' },
    ],
    qa: [
      { q: 'What gives a good pearl its soft shine?', choices: ['Light reflecting off many thin layers in slightly different ways.', 'A special paint added by people.', 'The color of the water around the oyster.', 'A single thick layer of calcium.'], answer: 0, why: '第2段落 Because light reflects off the many layers in slightly different ways。' },
    ],
  },
{
    id: 'hs-calligraphy',
    title: 'One Character a Day',
    level: '高校入試（スピーチ）',
    paragraphs: [
      "Hello, everyone. Today I want to talk about calligraphy. When I was in elementary school, I did not like it at all. My characters were always too big, and my teacher often said they were not balanced. I wanted to quit, ( A ) my grandmother, who has practiced calligraphy for fifty years, gave me some advice.",
      "She said, \"Don't try to write many characters. Write just one character every day, slowly and carefully.\" So I started writing one character after dinner each night. At first, it felt boring. But after a few months, I began to notice small changes. My lines became stronger, and I learned how to use the space on the paper.",
      "Last winter, I entered a calligraphy contest for junior high school students. I wrote the word \"future\" in Japanese. I did not win first prize, but my work was chosen ( B ) the city museum. When my grandmother saw it there, she smiled and said, \"You did not give up.\" From this experience, I learned that small efforts can lead to big results if you keep ( C ) them every day. Thank you for listening.",
    ],
    ja: [
      'みなさん、こんにちは。今日は書道について話したいと思います。小学生のころ、私は書道がまったく好きではありませんでした。私の字はいつも大きすぎて、先生にはよくバランスがよくないと言われました。やめたいと思っていましたが、50年間書道を続けている祖母がアドバイスをくれました。',
      '祖母は「たくさんの字を書こうとしないで。毎日1字だけ、ゆっくりていねいに書きなさい」と言いました。そこで私は、毎晩夕食のあとに1字書くことを始めました。はじめは退屈に感じました。でも数か月たつと、小さな変化に気づき始めました。線が力強くなり、紙の余白の使い方もわかるようになりました。',
      'この前の冬、私は中学生の書道コンテストに出品しました。「未来」という言葉を書きました。1位にはなれませんでしたが、作品が市の美術館に展示されることに選ばれました。それを美術館で見た祖母は、ほほえんで「あきらめなかったね」と言いました。この経験から、小さな努力も毎日続ければ大きな結果につながることを学びました。聞いてくれてありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['but', 'because of', 'during', 'without'], answer: 0, why: '「やめたかった」→「でも祖母がアドバイスをくれた」という逆接で、あとに文が続くので接続詞の but。because of・during・without は前置詞なので文は続かない。' },
      { id: 'B', choices: ['for', 'of', 'than', 'since'], answer: 0, why: 'be chosen for ～「～のために（～に向けて）選ばれる」。美術館（の展示）のために選ばれた。' },
      { id: 'C', choices: ['doing', 'to do', 'do', 'done'], answer: 0, why: 'keep ～ing「～し続ける」。keep のあとは動名詞。' },
    ],
    tf: [
      { statement: '筆者は小学生のころから書道が好きだった。', answer: false, why: '第1段落 I did not like it at all。' },
      { statement: '祖母は、毎日1字だけていねいに書くようにすすめた。', answer: true, why: '第2段落 Write just one character every day, slowly and carefully.' },
      { statement: '筆者はコンテストで1位になった。', answer: false, why: '第3段落 I did not win first prize。' },
      { statement: '筆者の作品は市の美術館で見ることができた。', answer: true, why: '第3段落 my work was chosen for the city museum / When my grandmother saw it there。' },
    ],
    qa: [
      { q: 'What did the writer learn from this experience?', choices: ['Small efforts can lead to big results if you continue them.', 'Calligraphy is easier than drawing pictures.', 'Big characters always look better.', 'Contests are the best way to practice.'], answer: 0, why: '第3段落 small efforts can lead to big results if you keep doing them every day。' },
    ],
  },
{
    id: 'hs-bus-driver',
    title: 'A Letter to the Bus Driver',
    level: '高校入試（体験文）',
    paragraphs: [
      "Every morning, I take the same bus to school. The driver is a quiet man with gray hair. For a long time, I never talked to him. I just showed my pass and sat down ( A ) saying anything.",
      "One rainy morning in June, I got on the bus and found that I had left my pass at home. I did not have any money, either. I did not know what to do, and my face turned red. Then the driver smiled and said, \"It's OK. You can pay me tomorrow.\" I was so surprised that I could only say, \"Thank you.\"",
      "The next morning, I paid him and thanked him again. After that, I started to say \"Good morning\" every day. He always answered with a smile. Sometimes he told me about the weather or the flowers along the road. My mornings became much brighter.",
      "Last week, I heard that he was going to retire at the end of the month. I decided to write him a letter. In the letter, I wrote that his kindness on that rainy day taught me ( B ) important a small action can be. I want to be a person who can help others ( C ) he helped me.",
    ],
    ja: [
      '毎朝、私は同じバスで学校に行きます。運転手さんは白髪まじりの物静かな男の人です。長いあいだ、私は彼と話したことがありませんでした。ただ定期券を見せて、何も言わずに座っていました。',
      '6月のある雨の朝、バスに乗ると、定期券を家に忘れてきたことに気づきました。お金も持っていませんでした。どうしたらいいかわからず、顔が赤くなりました。すると運転手さんがほほえんで、「だいじょうぶ。明日はらってくれればいいよ」と言いました。私はとてもおどろいて、「ありがとうございます」としか言えませんでした。',
      '次の朝、私はお金をはらい、もう一度お礼を言いました。それから、毎日「おはようございます」と言うようになりました。彼はいつも笑顔で返してくれました。ときどき天気や道ぞいの花の話をしてくれました。私の朝はずっと明るくなりました。',
      'この前の週、彼が月末で退職すると聞きました。私は彼に手紙を書くことにしました。手紙には、あの雨の日の彼の親切が、小さな行動がどれほど大切になりうるかを教えてくれたと書きました。私も、彼が私を助けてくれたように、ほかの人を助けられる人になりたいと思います。',
    ],
    blanks: [
      { id: 'A', choices: ['without', 'unless', 'although', 'because'], answer: 0, why: 'without ～ing「～しないで」。あとが saying（動名詞）なので前置詞の without。unless・although・because は接続詞であとに文が続く。' },
      { id: 'B', choices: ['how', 'what', 'which', 'that'], answer: 0, why: 'how ＋ 形容詞 ＋ 主語 ＋ 動詞「どれほど～か」。how important a small action can be。' },
      { id: 'C', choices: ['as', 'during', 'like a', 'such'], answer: 0, why: 'as ＋ 主語 ＋ 動詞「～のように」。as he helped me「彼が私を助けてくれたように」。' },
    ],
    tf: [
      { statement: '筆者は、はじめから運転手さんとよく話していた。', answer: false, why: '第1段落 For a long time, I never talked to him。' },
      { statement: '雨の朝、筆者は定期券もお金も持っていなかった。', answer: true, why: '第2段落 I had left my pass at home. I did not have any money, either。' },
      { statement: '運転手さんは、その日は乗らないように言った。', answer: false, why: '第2段落 You can pay me tomorrow（明日はらえばいい）。' },
      { statement: '筆者は運転手さんに手紙を書くことにした。', answer: true, why: '第4段落 I decided to write him a letter。' },
    ],
    qa: [
      { q: 'How did the writer\'s mornings change after that rainy day?', choices: ['They became much brighter.', 'They became much busier.', 'The writer started to walk to school.', 'The writer stopped taking the bus.'], answer: 0, why: '第3段落 My mornings became much brighter。' },
    ],
  },
  {
    id: 'hs-uniform-debate',
    title: 'Uniforms or Our Own Clothes?',
    level: '高校入試（会話・意見）',
    paragraphs: [
      "In our English class, we had a discussion about school uniforms. Some students wanted to keep them, ( A ) others wanted to wear their own clothes.",
      "Mika said, \"I like our uniform. In the morning, I don't have to think about what to wear, so I can save time. Also, when we go on school trips, our teachers can find us easily in a crowd.\"",
      "Kenta had a different opinion. \"Uniforms are expensive, and they are not comfortable in summer. If we could choose our own clothes, we could wear clothes that are better ( B ) the weather. We could also show our own style.\"",
      "Our teacher said that both opinions had good points. Then she asked us to think about another idea: a uniform that students can choose parts of, such as pants or skirts, and short or long sleeves. Many students liked this idea ( C ) it could solve some of the problems Kenta talked about. I learned that when people disagree, we can sometimes find a new answer together.",
    ],
    ja: [
      '英語の授業で、制服について話し合いました。制服を残したい生徒もいれば、自分の服を着たい生徒もいました。',
      'ミカは言いました。「私は制服が好きです。朝、何を着るか考えなくていいので、時間を節約できます。それに、修学旅行に行ったとき、先生が人ごみの中で私たちを見つけやすいです。」',
      'ケンタはちがう意見でした。「制服は高いし、夏は着ごこちがよくありません。自分で服をえらべたら、天気に合った服を着られます。自分らしいスタイルも見せられます。」',
      '先生は、どちらの意見にもよい点があると言いました。そして、別の案について考えるように言いました。ズボンかスカートか、半そでか長そでかなど、生徒が一部をえらべる制服です。ケンタが話した問題のいくつかを解決できるかもしれないので、多くの生徒がこの案を気に入りました。意見が分かれたときでも、いっしょに新しい答えを見つけられることがあると学びました。',
    ],
    blanks: [
      { id: 'A', choices: ['while', 'during', 'despite', 'because of'], answer: 0, why: 'あとに others wanted … という文が続くので接続詞の while「～する一方で」。during・despite・because of は前置詞。' },
      { id: 'B', choices: ['for', 'at', 'with', 'by'], answer: 0, why: 'be good（better）for ～「～に合っている・～によい」。clothes that are better for the weather。' },
      { id: 'C', choices: ['because', 'because of', 'during', 'despite'], answer: 0, why: 'あとに it could solve … という文が続くので接続詞の because。because of・during・despite は前置詞。' },
    ],
    tf: [
      { statement: 'クラスの全員が、制服をなくしたいと思っていた。', answer: false, why: '第1段落 Some students wanted to keep them。' },
      { statement: 'ミカは、制服があると朝の時間を節約できると言った。', answer: true, why: '第2段落 I don\'t have to think about what to wear, so I can save time。' },
      { statement: 'ケンタは、制服は夏に着ごこちがよいと言った。', answer: false, why: '第3段落 they are not comfortable in summer。' },
      { statement: '先生は、生徒が一部をえらべる制服という案を出した。', answer: true, why: '第4段落 a uniform that students can choose parts of。' },
    ],
    qa: [
      { q: "Why did many students like the teacher's idea?", choices: ['It could solve some of the problems Kenta talked about.', 'It was cheaper than any other clothes.', 'Mika wanted to stop wearing uniforms.', 'The teacher said uniforms were bad.'], answer: 0, why: '第4段落 it could solve some of the problems Kenta talked about。' },
    ],
  },
  {
    id: 'hs-speech-hello',
    title: 'The Power of Saying Hello',
    level: '高校入試（スピーチ）',
    paragraphs: [
      "Hello, everyone. Do you say \"Good morning\" to the people you meet on the way to school? Two years ago, I didn't. I was shy, and I thought it was strange to talk to people I didn't know. But one experience changed my mind.",
      "One winter morning, I slipped on the ice and fell near the station. My bag opened, and my books flew everywhere. Many people walked past me, but an old woman stopped and helped me pick them up. She was the woman ( A ) I saw at the bus stop every day, but I had never spoken to her.",
      "After that, I started saying \"Good morning\" to her. Soon, she began to tell me about her garden, and I told her about my club activities. Little by little, I started greeting other people in my neighborhood, too. Now I know the names of many of my neighbors, and they often ask me ( B ) my day was.",
      "Saying hello takes only a second, but it can make a big difference. It can turn strangers into friends and make our town ( C ) a warmer place. Tomorrow morning, why don't you try it? Thank you for listening.",
    ],
    ja: [
      'みなさん、こんにちは。学校へ行くとちゅうで会う人に「おはようございます」と言っていますか。2年前、私は言っていませんでした。はずかしがりやで、知らない人に話しかけるのは変だと思っていたのです。でも、ある経験が私の考えを変えました。',
      'ある冬の朝、私は駅の近くで氷ですべって転びました。かばんが開いて、本があちこちに飛び散りました。多くの人が通りすぎていきましたが、あるおばあさんが立ち止まって、本をひろうのを手伝ってくれました。それは毎日バス停で見かけていた女性でしたが、私は一度も話したことがありませんでした。',
      'それから、私はその人に「おはようございます」と言うようになりました。まもなく、その人は自分の庭の話をしてくれるようになり、私は部活動の話をしました。少しずつ、近所のほかの人にもあいさつするようになりました。今では近所の多くの人の名前を知っていて、みんなよく私に「今日はどうだった？」とたずねてくれます。',
      'あいさつはほんの一瞬ですが、大きなちがいを生むことがあります。知らない人を友だちに変え、私たちの町をもっと温かい場所のように感じさせてくれます。明日の朝、ためしてみませんか。聞いてくれてありがとうございました。',
    ],
    blanks: [
      { id: 'A', choices: ['whom', 'which', 'whose', 'what'], answer: 0, why: '先行詞 the woman（人）で、saw の目的語になる目的格の関係代名詞は whom（who・that も可）。which は物、whose は名詞が続く、what は先行詞をふくむ。' },
      { id: 'B', choices: ['how', 'what', 'which', 'who'], answer: 0, why: '「～がどうだったか」は how（間接疑問）。ask me how my day was。' },
      { id: 'C', choices: ['feel like', 'feel', 'to feel like', 'feeling'], answer: 0, why: 'make ＋ O ＋ 動詞の原形「O を～させる」。feel like ＋ 名詞「～のように感じる」。make our town feel like a warmer place。' },
    ],
    tf: [
      { statement: '筆者は2年前、知らない人に話しかけるのは変だと思っていた。', answer: true, why: '第1段落 I thought it was strange to talk to people I didn\'t know。' },
      { statement: '筆者が転んだとき、多くの人が助けてくれた。', answer: false, why: '第2段落 Many people walked past me（通りすぎた）。助けたのはおばあさん1人。' },
      { statement: '助けてくれた女性とは、前からよく話していた。', answer: false, why: '第2段落 I had never spoken to her。' },
      { statement: '今では、筆者は近所の多くの人の名前を知っている。', answer: true, why: '第3段落 Now I know the names of many of my neighbors。' },
    ],
    qa: [
      { q: 'What happened after the writer started saying "Good morning" to the woman?', choices: ['She began to tell the writer about her garden.', 'She moved to another town.', 'She gave the writer some books.', 'She stopped going to the bus stop.'], answer: 0, why: '第3段落 she began to tell me about her garden。' },
    ],
  },
  {
    id: 'hs-garden-market',
    title: 'Grown by Students',
    level: '高校入試（体験文）',
    paragraphs: [
      "Our school has a small garden behind the gym. Every spring, the students in the science club plant tomatoes, cucumbers, and eggplants there. Last year, we had so many vegetables ( A ) we could not eat all of them ourselves.",
      "Then one of the members, Riku, had an idea. \"Why don't we sell them at the Sunday market in town?\" At first, I was worried, because none of us had ever sold anything before. But our teacher said it was a good chance to learn, so we decided ( B ) it.",
      "On the day of the market, we put the vegetables on a table with a sign that said, \"Grown by students.\" Many people stopped to talk with us. An old man bought three tomatoes and told us how he grew vegetables when he was young. By noon, almost everything ( C ) sold.",
      "We used the money to buy new seeds and gave the rest to a local children's center. I learned that the things we make can connect us with many people in our town. This year, we are planning to grow pumpkins, too.",
    ],
    ja: [
      '私たちの学校には、体育館の後ろに小さな畑があります。毎年春、理科部の生徒がそこにトマトやきゅうり、なすを植えます。去年は野菜があまりにたくさんできたので、自分たちだけでは全部食べきれませんでした。',
      'すると、部員の一人のリクがアイデアを出しました。「町の日曜市で売ってみない？」はじめ、私は心配でした。だれも物を売ったことがなかったからです。でも先生が、学ぶいい機会だと言ってくれたので、私たちはやってみることにしました。',
      '市の日、私たちは「生徒が育てました」と書いた看板といっしょに、テーブルに野菜をならべました。たくさんの人が足を止めて、話しかけてくれました。あるおじいさんはトマトを3つ買って、若いころに野菜を育てていた話をしてくれました。正午までに、ほとんど全部が売れました。',
      '私たちはそのお金で新しい種を買い、残りを地元の児童館に寄付しました。自分たちが作ったものが、町のたくさんの人とつながるきっかけになることを学びました。今年は、かぼちゃも育てる予定です。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'which', 'as'], answer: 0, why: 'so many ＋ 名詞 ＋ that …「とても多くの～なので…」。so many vegetables that we could not …。' },
      { id: 'B', choices: ['to try', 'trying', 'try', 'tried'], answer: 0, why: 'decide to ～「～することに決める」。decide のあとは to ＋ 動詞の原形。' },
      { id: 'C', choices: ['was', 'were', 'been', 'being'], answer: 0, why: '主語 almost everything は単数あつかいなので、過去の受け身は was sold。' },
    ],
    tf: [
      { statement: '理科部は、体育館の後ろの畑で野菜を育てている。', answer: true, why: '第1段落 a small garden behind the gym … the students in the science club plant …。' },
      { statement: '筆者ははじめから、野菜を売ることに自信があった。', answer: false, why: '第2段落 At first, I was worried。' },
      { statement: '正午までに、ほとんどの野菜が売れた。', answer: true, why: '第3段落 By noon, almost everything was sold。' },
      { statement: '売れたお金は、すべて新しい種を買うのに使った。', answer: false, why: '第4段落 gave the rest to a local children\'s center。' },
    ],
    qa: [
      { q: 'What did the old man tell the students?', choices: ['How he grew vegetables when he was young.', 'Where to buy new seeds.', 'How much the tomatoes should cost.', 'When the market would close.'], answer: 0, why: '第3段落 told us how he grew vegetables when he was young。' },
    ],
  },
  {
    id: 'hs-nursing-home',
    title: 'Mrs. Ueno\'s Warm Hand',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last month, my class visited a nursing home near our school. Before the visit, I was nervous because I did not know ( A ) to talk to elderly people I had never met.",
      "When we arrived, a woman named Mrs. Ueno smiled and asked me to sit next to her. She was ninety-two years old. She told me about her childhood. When she was young, there were no televisions in her town, so children played outside until it got dark.",
      "Then she asked me about my school life. I showed her some photos of our sports day on my tablet. She looked at them carefully and said, \"Young people today look very happy.\" I was glad that I could make her smile. Before we left, she held my hand and said, \"Please come again.\" Her hand was small but ( B ) warm.",
      "From this experience, I learned that talking with people of different ages can teach us a lot. I am planning ( C ) the nursing home again during the winter vacation with my friends.",
    ],
    ja: [
      '先月、私のクラスは学校の近くの老人ホームをたずねました。訪問の前、会ったことのないお年寄りとどう話せばいいのかわからなかったので、私は緊張していました。',
      '着くと、上野さんという女性がほほえんで、となりにすわるように言ってくれました。上野さんは92歳でした。上野さんは子どものころの話をしてくれました。若いころ、町にはテレビがなかったので、子どもたちは暗くなるまで外で遊んだそうです。',
      'それから上野さんは、私の学校生活についてたずねました。私はタブレットで運動会の写真を何枚か見せました。上野さんはじっくり見て、「今の若い人たちは、とても楽しそうね」と言いました。上野さんを笑顔にできて、私はうれしかったです。帰る前に、上野さんは私の手をにぎって「また来てね」と言いました。その手は小さかったけれど、とても温かかったです。',
      'この経験から、ちがう年代の人と話すことで多くのことを学べると知りました。冬休みに、友だちといっしょにまた老人ホームをたずねる予定です。',
    ],
    blanks: [
      { id: 'A', choices: ['how', 'what', 'which', 'who'], answer: 0, why: 'how to ～「～のしかた・どう～すればよいか」。how to talk to elderly people。what・which・who では talk to のあとの形とつながらない。' },
      { id: 'B', choices: ['very', 'much', 'many', 'few'], answer: 0, why: '形容詞 warm を強めるのは very。much は比較級を強める語、many・few は数えられる名詞につける。' },
      { id: 'C', choices: ['to visit', 'visiting', 'visit', 'visited'], answer: 0, why: 'plan to ～「～する予定だ」。plan のあとは to ＋ 動詞の原形。' },
    ],
    tf: [
      { statement: '筆者は訪問の前、緊張していた。', answer: true, why: '第1段落 I was nervous。' },
      { statement: '上野さんは82歳だった。', answer: false, why: '第2段落 She was ninety-two years old（92歳）。' },
      { statement: '上野さんが子どものころ、町にはテレビがなかった。', answer: true, why: '第2段落 there were no televisions in her town。' },
      { statement: '筆者は、もう老人ホームに行くつもりはない。', answer: false, why: '第4段落 I am planning to visit the nursing home again。' },
    ],
    qa: [
      { q: 'What did the writer show Mrs. Ueno?', choices: ['Photos of the school sports day.', 'A video of a soccer game.', 'A letter from the teacher.', 'A picture of the nursing home.'], answer: 0, why: '第3段落 I showed her some photos of our sports day on my tablet。' },
    ],
  },
  {
    id: 'hs-drones',
    title: 'Help from the Sky',
    level: '高校入試（説明文）',
    paragraphs: [
      "Have you ever seen a drone? A drone is a small flying machine that people control from the ground ( A ) a pilot inside. Many people use drones to take photos from the sky, but drones are also starting to help people in other ways.",
      "In some countries, drones carry blood and medicine to hospitals in places that are hard to reach by car. The roads there are long and sometimes dangerous, so a trip by car can take hours. A drone can fly over mountains and rivers and arrive ( B ) a short time.",
      "In Japan, too, some towns have tried using drones to send food and daily goods to people who live on small islands or in the mountains. Many of these people are elderly, ( C ) it is not easy for them to go shopping. With drones, they can get what they need without leaving home.",
      "Of course, there are still problems. Drones cannot fly in strong wind or heavy rain, and they can carry only light things. However, many people believe that drones will become an important part of our lives in the future.",
    ],
    ja: [
      'ドローンを見たことがありますか。ドローンは、中にパイロットが乗らずに、人が地上から操縦する小さな飛ぶ機械です。多くの人が空から写真をとるのにドローンを使っていますが、ドローンはほかの方法でも人々の役に立ち始めています。',
      'ある国々では、車で行くのがむずかしい場所にある病院へ、ドローンが血液や薬を運んでいます。そこへの道は長く、ときには危険なので、車で行くと何時間もかかることがあります。ドローンなら山や川の上を飛んで、短い時間で着くことができます。',
      '日本でも、小さな島や山の中に住む人々に、ドローンで食べ物や日用品を送る試みをした町があります。こうした人々の多くはお年寄りなので、買い物に行くのはかんたんではありません。ドローンがあれば、家を出なくても必要なものを手に入れることができます。',
      'もちろん、まだ問題もあります。ドローンは強い風や大雨の中では飛べませんし、軽い物しか運べません。しかし、多くの人は、ドローンが将来、私たちの生活の大切な一部になると考えています。',
    ],
    blanks: [
      { id: 'A', choices: ['without', 'not', 'no', 'none'], answer: 0, why: '前置詞 without ＋ 名詞「～なしで」。without a pilot inside「中にパイロットが乗らずに」。not・no・none は前置詞ではない。' },
      { id: 'B', choices: ['in', 'at', 'on', 'by'], answer: 0, why: 'in a short time「短い時間で」。期間の中で終わることは in で表す。' },
      { id: 'C', choices: ['so', 'such', 'too', 'very'], answer: 0, why: 'あとに it is not easy … という文が続くので、接続詞 so「だから」。such・too・very は文と文をつなげない。' },
    ],
    tf: [
      { statement: 'ドローンは、中に乗ったパイロットが操縦する。', answer: false, why: '第1段落 people control from the ground without a pilot inside。' },
      { statement: 'ある国では、ドローンが病院に血液や薬を運んでいる。', answer: true, why: '第2段落 drones carry blood and medicine to hospitals。' },
      { statement: '日本では、島や山に住む人に、ドローンで物を送る試みがある。', answer: true, why: '第3段落 some towns have tried using drones to send food and daily goods。' },
      { statement: 'ドローンは、強い風や大雨の中でも問題なく飛べる。', answer: false, why: '第4段落 Drones cannot fly in strong wind or heavy rain。' },
    ],
    qa: [
      { q: 'Why is it hard for some people on small islands to go shopping?', choices: ['Many of them are elderly.', 'They do not have any money.', 'Drones are too expensive for them.', 'There are no stores in Japan.'], answer: 0, why: '第3段落 Many of these people are elderly, so it is not easy for them to go shopping。' },
    ],
  },
  {
    id: 'hs-lost-and-found',
    title: 'The Lost and Found Board',
    level: '高校入試（体験文）',
    paragraphs: [
      "At our school, there is a big box near the teachers' room. It is the lost and found box. Last spring, I was surprised to see how many things were in it: umbrellas, water bottles, jackets, and even a new pair of shoes. Most of the things had no names on them, so they stayed in the box ( A ) months.",
      "As a member of the student council, I wanted to solve this problem. Our council decided to take photos of the items and put them on a board in the hallway. We also made a rule: if no one comes for an item within a month, it will be given ( B ) a charity.",
      "The results were better than we expected. In the first two weeks, more than thirty items went back to their owners. One first-year student found her jacket on the board. She said, \"I thought I had lost it on the train. Thank you!\" Her smile made me happy.",
      "Now, many students write their names on their things. I learned that a small idea can change people's actions. Next, our council wants to think about how to make the box itself ( C ) to find.",
    ],
    ja: [
      '私たちの学校では、職員室の近くに大きな箱があります。落とし物の箱です。この前の春、中にあまりにたくさんの物が入っているのを見て、私はおどろきました。かさ、水とう、上着、それに新しいくつまでありました。ほとんどの物には名前が書いていなかったので、何か月も箱の中に残ったままでした。',
      '生徒会の一員として、私はこの問題を解決したいと思いました。私たちの生徒会は、落とし物の写真をとって、廊下のボードにはることにしました。また、決まりも作りました。1か月以内にだれも取りに来なければ、その物は慈善団体に寄付されるというものです。',
      '結果は、私たちが思っていたよりよいものでした。最初の2週間で、30個以上の物が持ち主のもとにもどりました。1年生のある生徒は、ボードで自分の上着を見つけました。「電車でなくしたと思っていました。ありがとうございます！」と彼女は言いました。彼女の笑顔を見て、私はうれしくなりました。',
      '今では、多くの生徒が持ち物に名前を書いています。小さなアイデアが人の行動を変えられることを学びました。次に、私たちの生徒会は、箱そのものをもっと見つけやすくする方法を考えたいと思っています。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'since', 'at', 'by'], answer: 0, why: 'for ＋ 期間「～のあいだ」。for months「何か月も」。since は起点（since April など）、at・by は期間には使わない。' },
      { id: 'B', choices: ['to', 'for', 'at', 'with'], answer: 0, why: 'give A to 人・団体「A を～にあたえる」。受け身で be given to ～「～にあたえられる」。' },
      { id: 'C', choices: ['easier', 'easily', 'ease', 'more easily'], answer: 0, why: 'make ＋ O ＋ 形容詞「O を～にする」。make the box easier to find「箱を見つけやすくする」。easily・more easily は副詞、ease は名詞。' },
    ],
    tf: [
      { statement: '落とし物の箱には、新しいくつも入っていた。', answer: true, why: '第1段落 even a new pair of shoes。' },
      { statement: '生徒会は、落とし物の写真を廊下のボードにはった。', answer: true, why: '第2段落 take photos of the items and put them on a board in the hallway。' },
      { statement: '最初の2週間で持ち主にもどった物は、10個に満たなかった。', answer: false, why: '第3段落 more than thirty items went back to their owners。' },
      { statement: '今では、持ち物に名前を書く生徒はほとんどいない。', answer: false, why: '第4段落 Now, many students write their names on their things。' },
    ],
    qa: [
      { q: 'What will happen to an item if no one comes for it within a month?', choices: ['It will be given to a charity.', 'It will be thrown away.', 'It will be sold at the school festival.', 'It will be sent to the train station.'], answer: 0, why: '第2段落 if no one comes for an item within a month, it will be given to a charity。' },
    ],
  },
  {
    id: 'hs-food-bank',
    title: 'One Can Is a Big Help',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last winter, my class visited a food bank in our city. A food bank collects food that is still safe to eat but cannot be sold, for example, cans with small dents or vegetables with strange shapes. Then it gives the food to people ( A ) need help, such as families with little money.",
      "At the food bank, a staff member named Ms. Tanaka showed us a large room full of boxes. She said, \"Every year, a lot of food is thrown away in Japan, but some people do not have enough to eat. We want to connect these two problems.\" We helped her check the dates on cans and put rice and pasta into bags.",
      "After two hours, my arms were tired, but I felt good. Ms. Tanaka told us that young people can help, too. \"You don't need to give a lot,\" she said. \"Even one can of food is a big help ( B ) many people do the same thing.\"",
      "After the visit, our class decided to start a food drive at school. We put a box near the entrance and asked students to bring food ( C ) they did not need at home. In one month, we collected more than two hundred items and sent them to the food bank.",
    ],
    ja: [
      'この前の冬、私のクラスは市のフードバンクをおとずれました。フードバンクは、まだ安全に食べられるのに売ることができない食べ物、たとえば小さなへこみのある缶づめや形の変わった野菜を集めています。そして、お金があまりない家族など、助けが必要な人々にその食べ物をわたしています。',
      'フードバンクでは、田中さんという職員の方が、箱でいっぱいの大きな部屋を見せてくれました。「日本では毎年たくさんの食べ物がすてられていますが、十分に食べられない人もいます。私たちはこの2つの問題をつなげたいのです」と田中さんは言いました。私たちは、缶づめの日付を確認したり、お米やパスタをふくろにつめたりする手伝いをしました。',
      '2時間後、うではつかれていましたが、気持ちはよかったです。田中さんは、若い人も力になれると教えてくれました。「たくさんあげる必要はありません」と田中さんは言いました。「多くの人が同じことをすれば、缶づめ1つでも大きな助けになるのです。」',
      '訪問のあと、私たちのクラスは学校で食べ物を集める活動を始めることにしました。入り口の近くに箱を置き、家でいらない食べ物を持ってきてくれるよう生徒にたのみました。1か月で200個以上の食べ物が集まり、フードバンクに送りました。',
    ],
    blanks: [
      { id: 'A', choices: ['who', 'which', 'whose', 'what'], answer: 0, why: '先行詞 people（人）で、あとに動詞 need が続くので主格の関係代名詞 who。which は物、whose は名詞が続く、what は先行詞をふくむ。' },
      { id: 'B', choices: ['if', 'because of', 'during', 'without'], answer: 0, why: 'あとに many people do the same thing という文が続くので接続詞の if「もし～すれば」。because of・during・without は前置詞。' },
      { id: 'C', choices: ['that', 'what', 'who', 'whose'], answer: 0, why: '先行詞 food（物）を説明する目的格の関係代名詞 that（which も可）。what は先行詞をふくむので food のあとには置けない。who は人、whose は名詞が続く。' },
    ],
    tf: [
      { statement: 'フードバンクは、売れなくても安全に食べられる食べ物を集めている。', answer: true, why: '第1段落 collects food that is still safe to eat but cannot be sold。' },
      { statement: '田中さんは、たくさん寄付しなければ意味がないと言った。', answer: false, why: '第3段落 You don\'t need to give a lot。' },
      { statement: '生徒たちは、缶づめの日付を確認する手伝いをした。', answer: true, why: '第2段落 We helped her check the dates on cans。' },
      { statement: 'クラスは1か月で100個未満の食べ物しか集められなかった。', answer: false, why: '第4段落 we collected more than two hundred items。' },
    ],
    qa: [
      { q: 'What did the class decide to do after the visit?', choices: ['Start a food drive at school.', 'Work at the food bank every day.', 'Sell vegetables with strange shapes.', 'Cook dinner for families.'], answer: 0, why: '第4段落 our class decided to start a food drive at school。' },
    ],
  },
  {
    id: 'hs-light-pollution',
    title: 'Where Have the Stars Gone?',
    level: '高校入試（説明文）',
    paragraphs: [
      "Have you ever looked up at night and seen only a few stars? In many cities, the sky is ( A ) bright at night that most stars cannot be seen. This problem is called light pollution. It happens when too much artificial light goes up into the sky. Many people who live in big cities have never seen the Milky Way with their own eyes.",
      "Light pollution is not only a problem for people who like stars. It also affects animals. For example, baby sea turtles usually move toward the brightest place after they come out of their eggs on the beach. In nature, that place is the sea, but bright lights from hotels and roads can lead them in the wrong direction. Some birds that fly at night also become confused by city lights.",
      "There are simple ways to reduce light pollution. We can turn off lights ( B ) we do not need them. Street lights can be covered on top so that they shine down onto the road, not up into the sky. Some towns around the world have made rules about outdoor lights, and now people come to visit them ( C ) see beautiful starry skies.",
    ],
    ja: [
      '夜に空を見上げて、星が少ししか見えなかったことはありますか。多くの都市では、夜の空がとても明るいので、ほとんどの星が見えません。この問題は光害とよばれています。人工の光が空に向かって出すぎることで起こります。大都市に住む人の多くは、天の川を自分の目で見たことがありません。',
      '光害は、星が好きな人だけの問題ではありません。動物にもえいきょうがあります。たとえば、海がめの赤ちゃんは、浜辺で卵から出てくると、ふつういちばん明るいほうへ進みます。自然の中ではそれは海ですが、ホテルや道路の明るい光が、赤ちゃんをまちがった方向へ導いてしまうことがあります。夜に飛ぶ鳥の中にも、都会の光でまよってしまうものがいます。',
      '光害を減らすかんたんな方法があります。必要ないときは明かりを消すことができます。街灯の上をおおって、空ではなく道路を照らすようにすることもできます。世界には、屋外の明かりについて決まりを作った町もあり、今では美しい星空を見るために人々がおとずれています。',
    ],
    blanks: [
      { id: 'A', choices: ['so', 'such', 'too', 'very'], answer: 0, why: 'so ＋ 形容詞 ＋ that …「とても～なので…」。so bright that。such は名詞をふくむ形、too・very は that とつながらない。' },
      { id: 'B', choices: ['when', 'during', 'without', 'because of'], answer: 0, why: 'あとに we do not need them という文が続くので接続詞の when「～するとき」。during・without・because of は前置詞。' },
      { id: 'C', choices: ['to', 'for', 'so', 'that'], answer: 0, why: '「～するために」は to ＋ 動詞の原形。come to visit them to see ～「～を見るためにおとずれる」。' },
    ],
    tf: [
      { statement: '光害は、人工の光が空に向かって出すぎることで起こる。', answer: true, why: '第1段落 It happens when too much artificial light goes up into the sky。' },
      { statement: '光害で困るのは、星を見るのが好きな人だけである。', answer: false, why: '第2段落 Light pollution is not only a problem for people who like stars。' },
      { statement: '海がめの赤ちゃんは、ふつういちばん明るいほうへ進む。', answer: true, why: '第2段落 baby sea turtles usually move toward the brightest place。' },
      { statement: '街灯は、空を照らすように上に向けるのがよい。', answer: false, why: '第3段落 so that they shine down onto the road, not up into the sky。' },
    ],
    qa: [
      { q: 'Why do people visit some towns that have rules about outdoor lights?', choices: ['To see beautiful starry skies.', 'To buy new street lights.', 'To watch baby sea turtles in hotels.', 'To work late at night.'], answer: 0, why: '第3段落 people come to visit them to see beautiful starry skies。' },
    ],
  },
  {
    id: 'hs-shoe-repair',
    title: 'Mr. Hara\'s Shoe Shop',
    level: '高校入試（物語）',
    paragraphs: [
      "My favorite sneakers were ( A ) old that the bottom of one shoe came off during soccer practice. I wanted to buy a new pair, but my father said, \"Let's take them to Mr. Hara's shop first.\"",
      "Mr. Hara's shop was small and smelled of leather. He was about seventy years old. He looked at my shoes carefully and said, \"These shoes have walked a long way. I can fix them by Saturday.\" I was surprised because I thought nobody repaired sneakers anymore.",
      "On Saturday, I went back to the shop. My sneakers looked almost new, but they still felt like my own shoes. Mr. Hara told me that he had repaired shoes in this town for fifty years. \"Some people throw their shoes away as soon as they get a small hole,\" he said. \"But a good pair of shoes can last for many years ( B ) you take care of them.\"",
      "Now I clean my shoes every Sunday. When something breaks, I first ask myself, \"Can this be fixed?\" Mr. Hara taught me that taking care of things is a way of ( C ) thanks to them.",
    ],
    ja: [
      'お気に入りのスニーカーはとても古くなっていて、サッカーの練習中に片方の靴の底がはがれてしまいました。私は新しいのを買いたかったのですが、父は「まず原さんの店に持っていこう」と言いました。',
      '原さんの店は小さくて、革のにおいがしました。原さんは70歳くらいでした。私の靴をじっくり見て、「この靴はずいぶん長い道のりを歩いてきたね。土曜日までに直せるよ」と言いました。もうスニーカーを直す人なんていないと思っていたので、私はおどろきました。',
      '土曜日、私はまた店に行きました。スニーカーはほとんど新品のように見えましたが、それでも自分の靴だという感じがしました。原さんは、この町で50年間靴を直してきたと教えてくれました。「小さな穴があくとすぐに靴を捨ててしまう人もいる」と原さんは言いました。「でも、いい靴は、手入れをすれば何年ももつんだよ。」',
      '今、私は毎週日曜日に靴をみがいています。何かがこわれたとき、まず「これは直せるかな」と自分に問いかけます。原さんは、物を大切にすることは、その物に感謝をあらわす1つの方法だと教えてくれました。',
    ],
    blanks: [
      { id: 'A', choices: ['so', 'such', 'too', 'very'], answer: 0, why: 'so ＋ 形容詞 ＋ that …「とても～なので…」。so old that。such は名詞をふくむ形（such old shoes that）、too・very は that とつながらない。' },
      { id: 'B', choices: ['if', 'because of', 'without', 'during'], answer: 0, why: 'あとに you take care of them という文が続くので接続詞の if「もし～すれば」。because of・without・during は前置詞。' },
      { id: 'C', choices: ['showing', 'show', 'to show', 'showed'], answer: 0, why: '前置詞 of のあとは動名詞（～ing）。a way of showing thanks「感謝をあらわす方法」。' },
    ],
    tf: [
      { statement: '筆者は最初、新しいスニーカーを買いたいと思った。', answer: true, why: '第1段落 I wanted to buy a new pair。' },
      { statement: '原さんは、その日のうちに靴を直してくれた。', answer: false, why: '第2段落 I can fix them by Saturday（土曜日までに）。' },
      { statement: '原さんは、この町で50年間靴を直してきた。', answer: true, why: '第3段落 he had repaired shoes in this town for fifty years。' },
      { statement: '筆者は今、毎週日曜日に新しい靴を買っている。', answer: false, why: '第4段落 Now I clean my shoes every Sunday（みがいている）。' },
    ],
    qa: [
      { q: 'What did Mr. Hara say about a good pair of shoes?', choices: ['It can last for many years if you take care of it.', 'It should be thrown away when it gets a hole.', 'It is too expensive for young people.', 'It must be washed every day.'], answer: 0, why: '第3段落 a good pair of shoes can last for many years if you take care of them。' },
    ],
  },
  {
    id: 'hs-seed-library',
    title: 'The Seed Library',
    level: '高校入試（説明文）',
    paragraphs: [
      "In our town library, there is a small wooden box next to the picture books. It looks like a box for cards, but it is full of little paper bags. Each bag has seeds in it, and the name of a plant is written on it: tomatoes, beans, sunflowers, and many others. This is our town's \"seed library.\" Anyone with a library card can borrow up to three bags ( A ) free.",
      "Borrowing seeds is a little different from borrowing books. You do not have to bring the seeds back. Instead, you plant them, take care of the plants, and at the end of the season you collect new seeds from the strongest ones. Then you bring some of those seeds back to the library ( B ) other people can use them next year.",
      "Our librarian, Ms. Ono, started the seed library five years ago. She says that seeds from local gardens grow well here ( C ) they are already used to our weather and soil. Every year, the plants become a little better for our town. \"A seed library is like a library of stories,\" she says. \"Each bag carries the work of a gardener who grew the plant before you.\"",
      "Last spring, I borrowed some bean seeds. My beans grew taller than my little brother, and we ate them for dinner many times. In autumn, I returned a bag of seeds with a note: \"These beans grew on our balcony. I hope they grow well for you, too.\" Now I feel that I am part of a long chain of gardeners in our town.",
    ],
    ja: [
      '私たちの町の図書館には、絵本のとなりに小さな木の箱があります。カードを入れる箱のように見えますが、中には小さな紙の袋がいっぱい入っています。どの袋にも種が入っていて、トマト、豆、ひまわりなど、植物の名前が書いてあります。これが私たちの町の「種の図書館」です。図書館カードを持っている人ならだれでも、3袋まで無料で借りることができます。',
      '種を借りることは、本を借りることと少しちがいます。その種を返す必要はありません。そのかわりに、種をまいて植物の世話をし、季節の終わりに、いちばんじょうぶな株から新しい種をとります。そして、次の年にほかの人が使えるように、その種の一部を図書館に返すのです。',
      '図書館司書の小野さんは、5年前に種の図書館を始めました。小野さんによると、地元の庭でとれた種は、この町の天気や土にすでに慣れているので、ここでよく育つそうです。毎年、植物はこの町に少しずつ合ったものになっていきます。「種の図書館は、物語の図書館のようなものです」と小野さんは言います。「どの袋にも、あなたより前にその植物を育てた人の努力がつまっているのです。」',
      'この前の春、私は豆の種を借りました。私の豆は弟よりも背が高くなり、私たちは何度も夕食にその豆を食べました。秋に、私はメモをそえて種を1袋返しました。「この豆はうちのベランダで育ちました。あなたのところでもよく育ちますように。」今、私は自分がこの町の、長くつながる育て手の輪の一員だと感じています。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'by', 'with', 'at'], answer: 0, why: 'for free「無料で」。by・with・at free とは言わない。' },
      { id: 'B', choices: ['so that', 'so as', 'in order', 'because of'], answer: 0, why: 'so that ＋ 主語 ＋ can ～「～が…できるように」。so as・in order のあとは to ＋ 原形、because of のあとは名詞なので、文（other people can use them）は続かない。' },
      { id: 'C', choices: ['because', 'because of', 'despite', 'during'], answer: 0, why: 'あとに文（they are already used to ～）が続くので接続詞の because。because of・despite・during は前置詞で、あとに名詞が来る。' },
    ],
    tf: [
      { statement: '種の図書館では、借りた種をそのまま返さなければならない。', answer: false, why: '第2段落 You do not have to bring the seeds back。' },
      { statement: '図書館カードを持っていれば、だれでも3袋まで借りられる。', answer: true, why: '第1段落 Anyone with a library card can borrow up to three bags。' },
      { statement: '小野さんは5年前に種の図書館を始めた。', answer: true, why: '第3段落 Ms. Ono, started the seed library five years ago。' },
      { statement: '筆者が育てた豆は、弟よりも背が低かった。', answer: false, why: '第4段落 My beans grew taller than my little brother。' },
    ],
    qa: [
      { q: 'Why do seeds from local gardens grow well in the town?', choices: ['Because they are already used to the town\'s weather and soil.', 'Because the library gives them special water.', 'Because Ms. Ono plants all of them herself.', 'Because they come from other countries.'], answer: 0, why: '第3段落 they are already used to our weather and soil。' },
    ],
  },
{
    id: 'toefl-lightning',
    title: 'What Makes Lightning and Thunder?',
    level: 'TOEFL・IELTS（気象）',
    paragraphs: [
      "Lightning is one of the most powerful events in nature. It forms inside tall storm clouds, where tiny pieces of ice and drops of water are carried up and down by strong winds. As they crash into each other, electric charges separate: the top of the cloud usually becomes positively charged, ( A ) the bottom becomes negatively charged.",
      "When the difference between these charges becomes large enough, electricity suddenly flows through the air as a bolt of lightning. A single bolt can heat the air around it to about 30,000 degrees Celsius, which is several times hotter than the surface of the sun.",
      "This sudden heating makes the air expand extremely quickly, and the result is the loud sound we call thunder. Because light travels much faster ( B ) sound, we see the flash before we hear the thunder. By counting the seconds between the two, we can estimate how far away the storm is: about three seconds for every kilometer.",
      "Contrary to a popular saying, lightning can strike the same place more than once. Tall buildings and towers are often hit many times a year. For this reason, they are usually equipped with lightning rods, ( C ) guide the electricity safely into the ground.",
    ],
    ja: [
      '雷は、自然の中でもっとも強力な現象の1つである。雷は高く発達した嵐の雲の中でできる。そこでは、小さな氷のつぶや水のしずくが強い風で上下に運ばれている。それらがぶつかり合うと、電気が分かれる。ふつう雲の上のほうはプラスの電気をおび、下のほうはマイナスの電気をおびるのである。',
      'これらの電気の差が十分に大きくなると、電気がいきなり空気の中を雷として流れる。1回の雷で、まわりの空気はおよそ3万℃まで熱せられることがある。これは太陽の表面の何倍もの熱さである。',
      'このいきなりの加熱によって空気がものすごい速さでふくらみ、その結果、雷鳴とよばれる大きな音が生まれる。光は音よりずっと速く進むので、私たちは雷鳴を聞く前に光を見る。光と音のあいだの秒数を数えれば、嵐がどれくらい遠くにあるかを見積もることができる。1キロメートルにつきおよそ3秒である。',
      'よく言われることとはちがって、雷は同じ場所に2度以上落ちることがある。高い建物や塔は、1年に何度も落雷を受けることが多い。そのため、ふつうそうした建物には避雷針がつけられていて、電気を安全に地面へと導くのである。',
    ],
    blanks: [
      { id: 'A', choices: ['while', 'during', 'despite', 'because of'], answer: 0, why: 'あとに the bottom becomes … という文が続くので、対比を表す接続詞 while「一方で」。during・despite・because of は前置詞。' },
      { id: 'B', choices: ['than', 'as', 'then', 'that'], answer: 0, why: '比較級 much faster のあとは than。faster than sound「音よりも速く」。' },
      { id: 'C', choices: ['which', 'what', 'who', 'they'], answer: 0, why: 'コンマのあとで lightning rods を説明する非制限用法の関係代名詞 which。what は先行詞をふくむ、who は人、they だとコンマだけで文がつながってしまう。' },
    ],
    tf: [
      { statement: '雷は、高く発達した嵐の雲の中でできる。', answer: true, why: '第1段落 It forms inside tall storm clouds。' },
      { statement: '雷の熱は、太陽の表面より低い温度である。', answer: false, why: '第2段落 several times hotter than the surface of the sun。' },
      { statement: '光は音より速いので、雷鳴を聞く前に光が見える。', answer: true, why: '第3段落 we see the flash before we hear the thunder。' },
      { statement: '雷は、同じ場所に2度落ちることはない。', answer: false, why: '第4段落 lightning can strike the same place more than once。' },
    ],
    qa: [
      { q: 'How can we estimate how far away a storm is?', choices: ['By counting the seconds between the flash and the thunder.', 'By measuring the size of the cloud.', 'By checking the color of the lightning.', 'By listening to the sound of the wind.'], answer: 0, why: '第3段落 By counting the seconds between the two, we can estimate how far away the storm is。' },
    ],
  },
{
    id: 'toefl-glass',
    title: 'From Sand to Glass',
    level: 'TOEFL・IELTS（科学・歴史）',
    paragraphs: [
      "Glass is so common today that we rarely think about how it is made. Its main ingredient is silica, which is found in ordinary sand. Pure silica melts only at extremely high temperatures, ( A ) makes it difficult and expensive to work with.",
      "To solve this problem, glassmakers add other materials. Soda ash lowers the melting point of the sand, and limestone makes the finished glass stronger and keeps it from dissolving in water. Most of the glass in windows and bottles today is made from this basic mixture.",
      "People have been making glass for thousands of years. Early glass objects, such as small beads, were produced in Mesopotamia. Around two thousand years ago, craftsmen in the eastern Mediterranean discovered ( B ) they could blow air into melted glass through a tube. This made it possible to create thin, hollow containers quickly and cheaply.",
      "One advantage of glass is that it can be recycled again and again ( C ) losing its quality. Used bottles are crushed, melted, and formed into new products, which saves energy and raw materials.",
    ],
    ja: [
      'ガラスは今ではとてもありふれているので、どのようにつくられるかを考えることはめったにない。主な原料はシリカで、これはふつうの砂にふくまれている。純粋なシリカはとても高い温度でしかとけないので、あつかうのがむずかしく、費用もかかる。',
      'この問題を解決するために、ガラス職人はほかの材料を加える。ソーダ灰は砂のとける温度を下げ、石灰石はできあがったガラスを強くし、水にとけないようにする。今日の窓やびんのガラスのほとんどは、この基本的な混ぜ合わせからつくられている。',
      '人々は何千年も前からガラスをつくってきた。小さなビーズのような初期のガラス製品は、メソポタミアでつくられた。約2000年前、地中海の東の地域の職人たちは、管を通してとけたガラスに息をふきこめることを発見した。これにより、うすくて中が空洞の入れ物を、すばやく安くつくれるようになった。',
      'ガラスのよい点の1つは、質を落とさずに何度でもリサイクルできることである。使い終わったびんはくだかれ、とかされ、新しい製品につくり直される。これによってエネルギーや原料が節約できる。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'that', 'it'], answer: 0, why: 'コンマのあとで前の文の内容全体を受ける非制限用法の関係代名詞は which。that はコンマのあとに使わない。what は先行詞をふくむ。it だとコンマだけで文がつながってしまう。' },
      { id: 'B', choices: ['that', 'what', 'which', 'whose'], answer: 0, why: 'discover that ＋ 文「～ということを発見する」。あとが完全な文なので that。what・which は文の一部が欠けているときに使い、whose は名詞が続く。' },
      { id: 'C', choices: ['without', 'not', 'no', 'none'], answer: 0, why: '前置詞 without ＋ 動名詞 losing「質を落とさずに」。not・no・none は前置詞ではない。' },
    ],
    tf: [
      { statement: 'ガラスの主な原料は、ふつうの砂にふくまれるシリカである。', answer: true, why: '第1段落 Its main ingredient is silica, which is found in ordinary sand。' },
      { statement: 'ソーダ灰を加えると、砂がとけにくくなる。', answer: false, why: '第2段落 Soda ash lowers the melting point of the sand（とけやすくなる）。' },
      { statement: '約2000年前、地中海の東の地域で、とけたガラスに息をふきこむ方法が見つかった。', answer: true, why: '第3段落 Around two thousand years ago, craftsmen in the eastern Mediterranean discovered …。' },
      { statement: 'ガラスは、リサイクルするたびに質が落ちていく。', answer: false, why: '第4段落 it can be recycled again and again without losing its quality。' },
    ],
    qa: [
      { q: 'Why do glassmakers add limestone?', choices: ['To make the glass stronger and keep it from dissolving in water.', 'To make the sand melt at a higher temperature.', 'To change the color of the glass.', 'To make the glass lighter.'], answer: 0, why: '第2段落 limestone makes the finished glass stronger and keeps it from dissolving in water。' },
    ],
  },
{
    id: 'toefl-camels',
    title: 'Built for the Desert',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Camels are famous for surviving in the desert, but one popular belief about them is wrong. Their humps do not store water. Instead, they store fat, ( A ) the camel can break down for energy when food is scarce.",
      "Camels have other ways of dealing with the lack of water. They can lose about a quarter of their body weight in water and still survive, which would be deadly for most other mammals. When they finally find water, they can drink more than 100 liters in a short time.",
      "Camels also save water by allowing their body temperature to change. During the hot day, a camel's temperature can rise by several degrees before it starts to sweat. At night, the camel cools down again. In this way, it loses much less water through sweating ( B ) it would otherwise.",
      "Even the camel's face is adapted to the desert. Long eyelashes protect its eyes from blowing sand, and it can close its nostrils during sandstorms. Its thick fur may seem strange in such a hot place, but it actually helps ( C ) the camel from the strong sun.",
    ],
    ja: [
      'ラクダは砂漠で生きぬくことで有名だが、ラクダについてのよく知られた考えの1つはまちがっている。こぶには水がたくわえられているわけではない。かわりにたくわえられているのは脂肪で、食べ物が少ないとき、ラクダはそれを分解してエネルギーにすることができる。',
      'ラクダには、水が足りないことに対処するほかの方法もある。体重の約4分の1にあたる水分を失っても生きのびることができるが、これはほかのほとんどの哺乳類にとっては命にかかわる量である。ようやく水を見つけると、短い時間で100リットル以上飲むことができる。',
      'ラクダはまた、体温が変わるのを許すことで水を節約している。暑い昼のあいだ、ラクダの体温は、汗をかき始める前に数度上がることがある。夜になると、ラクダの体はまた冷える。こうして、そうしなかった場合よりも、汗で失う水分がずっと少なくなるのである。',
      'ラクダの顔でさえ、砂漠に合うようになっている。長いまつげは、ふきつける砂から目を守り、砂あらしのときには鼻のあなを閉じることができる。こんなに暑い場所で厚い毛は不思議に思えるかもしれないが、実は強い日差しからラクダを守るのに役立っているのである。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'who', 'it'], answer: 0, why: 'コンマのあとで fat を説明し、break down の目的語になる非制限用法の関係代名詞 which。what は先行詞をふくむ、who は人、it では文がつながらない。' },
      { id: 'B', choices: ['than', 'as', 'then', 'that'], answer: 0, why: '比較級 much less water のあとは than。much less … than it would otherwise「そうしなかった場合よりずっと少なく」。' },
      { id: 'C', choices: ['protect', 'protecting', 'protected', 'protects'], answer: 0, why: 'help ＋（to）＋ 動詞の原形「～するのに役立つ」。helps protect the camel。' },
    ],
    tf: [
      { statement: 'ラクダのこぶには、水がたくわえられている。', answer: false, why: '第1段落 Their humps do not store water. Instead, they store fat。' },
      { statement: 'ラクダは、体重の約4分の1の水分を失っても生きのびられる。', answer: true, why: '第2段落 They can lose about a quarter of their body weight in water and still survive。' },
      { statement: 'ラクダは、暑い昼でもすぐに汗をかいて体温を一定に保つ。', answer: false, why: '第3段落 a camel\'s temperature can rise by several degrees before it starts to sweat。' },
      { statement: 'ラクダは、砂あらしのときに鼻のあなを閉じることができる。', answer: true, why: '第4段落 it can close its nostrils during sandstorms。' },
    ],
    qa: [
      { q: "How does a camel's thick fur help it?", choices: ['It protects the camel from the strong sun.', 'It stores water for the camel.', 'It keeps sand out of the camel\'s eyes.', 'It helps the camel drink faster.'], answer: 0, why: '第4段落 it actually helps protect the camel from the strong sun。' },
    ],
  },
{
    id: 'toefl-rubber',
    title: 'From Tree to Tire',
    level: 'TOEFL・IELTS（歴史・産業）',
    paragraphs: [
      "Natural rubber comes from a milky liquid called latex, which flows from cuts made in the bark of the rubber tree. The tree is native to the Amazon region of South America, where people used latex for centuries to make balls and waterproof objects.",
      "However, early rubber had serious problems. It became sticky and smelly in hot weather and hard and brittle in cold weather. In 1839, the American inventor Charles Goodyear found that heating rubber with sulfur made it strong and flexible at a wide range of temperatures. This process, ( A ) is called vulcanization, made rubber useful for countless products.",
      "As demand grew, rubber trees were planted far from their original home. In the late nineteenth century, seeds were carried from Brazil to Britain and then to British colonies in Asia. Today, most of the world's natural rubber is produced in Southeast Asia, in countries ( B ) Thailand and Indonesia.",
      "During the twentieth century, scientists also developed synthetic rubber made from petroleum. Synthetic rubber is now used more widely than natural rubber, but natural rubber is still preferred for some products, such as the large tires of airplanes and trucks, ( C ) it handles heat and stress well.",
    ],
    ja: [
      '天然ゴムは、ゴムの木の樹皮につけた切れ目から流れ出る、ラテックスとよばれる乳白色の液体からつくられる。この木は南アメリカのアマゾン地域が原産で、そこでは人々が何世紀にもわたって、ラテックスを使ってボールや水を通さない物をつくってきた。',
      'しかし、初期のゴムには深刻な問題があった。暑いとべたべたしてにおいが出て、寒いと固くもろくなったのである。1839年、アメリカの発明家チャールズ・グッドイヤーは、ゴムを硫黄といっしょに熱すると、はば広い温度で強くしなやかになることを発見した。加硫とよばれるこの方法によって、ゴムは数えきれないほどの製品に役立つようになった。',
      '需要がふえるにつれて、ゴムの木は原産地から遠くはなれた場所にも植えられるようになった。19世紀の終わりに、種がブラジルからイギリスへ、そしてアジアのイギリスの植民地へと運ばれた。今日、世界の天然ゴムの大部分は、タイやインドネシアなどの東南アジアの国々で生産されている。',
      '20世紀には、科学者たちが石油からつくる合成ゴムも開発した。現在では合成ゴムのほうが天然ゴムより広く使われているが、熱や負荷によく耐えるので、飛行機やトラックの大きなタイヤなど、一部の製品には今も天然ゴムが好まれている。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'that', 'it'], answer: 0, why: 'コンマにはさまれて This process を説明する非制限用法の関係代名詞は which。that はコンマのあとに使わない。what は先行詞をふくむ。it では文がつながらない。' },
      { id: 'B', choices: ['such as', 'as such', 'so as', 'as well'], answer: 0, why: 'such as ～「たとえば～のような」で例をあげる。countries such as Thailand and Indonesia。' },
      { id: 'C', choices: ['because', 'because of', 'due to', 'despite'], answer: 0, why: 'あとに it handles heat and stress well という文が続くので接続詞の because。because of・due to・despite は前置詞のはたらき。' },
    ],
    tf: [
      { statement: '天然ゴムは、ゴムの木の樹皮の切れ目から出る液体からつくられる。', answer: true, why: '第1段落 latex, which flows from cuts made in the bark of the rubber tree。' },
      { statement: '初期のゴムは、暑さにも寒さにも強かった。', answer: false, why: '第2段落 sticky … in hot weather and hard and brittle in cold weather。' },
      { statement: '現在、天然ゴムの大部分は南アメリカで生産されている。', answer: false, why: '第3段落 most of the world\'s natural rubber is produced in Southeast Asia。' },
      { statement: '飛行機の大きなタイヤなどには、今も天然ゴムが好まれている。', answer: true, why: '第4段落 natural rubber is still preferred for … the large tires of airplanes and trucks。' },
    ],
    qa: [
      { q: 'What did Charles Goodyear discover?', choices: ['Heating rubber with sulfur made it strong and flexible.', 'Rubber trees could grow well in Asia.', 'Rubber could be made from petroleum.', 'Latex flows from the leaves of the tree.'], answer: 0, why: '第2段落 heating rubber with sulfur made it strong and flexible。' },
    ],
  },
{
    id: 'toefl-monsoon',
    title: 'Winds That Change with the Seasons',
    level: 'TOEFL・IELTS（気象）',
    paragraphs: [
      "The word \"monsoon\" is often used to mean heavy rain, but scientists use it to describe a seasonal change in the direction of the wind. The best-known example is the South Asian monsoon, which brings most of India's yearly rainfall between June and September.",
      "Monsoons happen because land and sea heat up at different speeds. In summer, the land warms much faster than the ocean. Air above the hot land rises, and cooler, moist air from the ocean flows in to take its place. As this moist air moves over the land and rises, it cools and releases its water as rain. In winter, the pattern reverses: the land becomes cooler than the sea, ( A ) dry winds blow from the land toward the ocean.",
      "For hundreds of millions of people, the monsoon is a matter of survival. Farmers depend on its rain to grow rice and other crops, and cities depend on it to refill rivers and reservoirs. ( B ) the rains arrive late or are weak, crops may fail. When they are too strong, they can cause serious floods.",
      "Because so much depends on the monsoon, predicting it accurately is one of the most important tasks for weather scientists in the region. Today, they use satellites and computer models to forecast ( C ) the rains will begin each year.",
    ],
    ja: [
      '「モンスーン」という語は大雨の意味で使われることが多いが、科学者は季節によって風向きが変わることを表すのにこの語を使う。もっともよく知られた例は南アジアのモンスーンで、インドの1年の降水量の大部分を6月から9月のあいだにもたらす。',
      'モンスーンが起こるのは、陸と海が温まる速さがちがうからである。夏には、陸は海よりもずっと速く温まる。熱くなった陸の上の空気がのぼり、そのあとをうめるように、海からすずしくしめった空気が流れこむ。このしめった空気は陸の上を進みながらのぼると冷え、ふくんでいた水を雨として降らせる。冬にはこの流れが逆になる。陸は海より冷たくなり、乾いた風が陸から海へとふくのである。',
      '何億人もの人々にとって、モンスーンは生きるか死ぬかの問題である。農家は米やほかの作物を育てるのにその雨にたよっており、都市は川や貯水池を満たすのにその雨にたよっている。雨がおそく来たり弱かったりすると、作物がとれないこともある。雨が強すぎると、深刻な洪水を引き起こすことがある。',
      'これほど多くのことがモンスーンにかかっているので、それを正確に予測することは、その地域の気象学者にとってもっとも大切な仕事の1つである。今日では、人工衛星やコンピューターのモデルを使って、毎年いつ雨が始まるかを予報している。',
    ],
    blanks: [
      { id: 'A', choices: ['and', 'despite', 'during', 'because of'], answer: 0, why: '2つの文（the land becomes cooler … ／ dry winds blow …）をつなぐのは接続詞 and。despite・during・because of は前置詞で、あとに文は続かない。' },
      { id: 'B', choices: ['If', 'Despite', 'During', 'Without'], answer: 0, why: 'あとに the rains arrive late … という文が続くので接続詞の If「もし～なら」。Despite・During・Without は前置詞。' },
      { id: 'C', choices: ['when', 'what', 'which', 'whose'], answer: 0, why: 'forecast の目的語で「いつ～するか」は when（間接疑問）。the rains will begin は完全な文なので what・which は使えず、whose は名詞が続く。' },
    ],
    tf: [
      { statement: '科学者は「モンスーン」という語を、季節によって風向きが変わることを表すのに使う。', answer: true, why: '第1段落 scientists use it to describe a seasonal change in the direction of the wind。' },
      { statement: '夏には、海のほうが陸よりも速く温まる。', answer: false, why: '第2段落 In summer, the land warms much faster than the ocean。' },
      { statement: '冬には、乾いた風が陸から海へふく。', answer: true, why: '第2段落 dry winds blow from the land toward the ocean。' },
      { statement: 'モンスーンの雨が強すぎても、問題は起こらない。', answer: false, why: '第3段落 When they are too strong, they can cause serious floods。' },
    ],
    qa: [
      { q: 'Why does moist air from the ocean release rain over the land in summer?', choices: ['Because it rises and cools.', 'Because the ocean becomes warmer than the land.', 'Because the wind stops blowing.', 'Because farmers plant rice.'], answer: 0, why: '第2段落 As this moist air moves over the land and rises, it cools and releases its water as rain。' },
    ],
  },
{
    id: 'toefl-geysers',
    title: 'Why Geysers Erupt',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "A geyser is a rare type of hot spring that shoots water and steam into the air from time to time. Fewer than a thousand active geysers are known in the world, and about half of them are found in Yellowstone National Park in the United States. To form a geyser, nature needs three things at once: a strong source of heat, a steady supply of water, and an underground system of narrow cracks and chambers.",
      "Rainwater and melted snow sink deep into the ground, where they are heated by hot rock near magma. Because the water deep underground is under great pressure from the water above it, it can become much hotter than 100°C ( A ) boiling. When a little of the water near the top finally turns into steam, it pushes some water out and lowers the pressure below. The very hot water then changes into steam almost at once and forces everything above it out of the ground.",
      "Some geysers erupt on a fairly regular schedule. Old Faithful, the most famous geyser in Yellowstone, usually erupts roughly every 60 to 110 minutes, ( B ) visitors can often predict when to watch. Others erupt only once in several days or even years.",
      "Geysers are also very fragile. An earthquake can change their underground plumbing and stop them completely. In some places, drilling for geothermal energy nearby has caused geysers to stop erupting. For this reason, many countries now protect the areas ( C ) geysers are found.",
    ],
    ja: [
      '間欠泉は、ときどき水や蒸気を空中にふき上げる、めずらしい種類の温泉である。世界で知られている活動中の間欠泉は1000か所に満たず、その約半分はアメリカのイエローストーン国立公園にある。間欠泉ができるには、自然界に3つのものが同時に必要である。強い熱源、たえまない水の供給、そして地下のせまい割れ目と空洞のしくみである。',
      '雨水や雪どけ水は地中深くにしみこみ、マグマの近くの熱い岩によって温められる。地下深くの水は、上にある水から大きな圧力を受けているので、沸とうせずに100℃よりずっと熱くなることができる。上のほうの水が少し蒸気に変わると、その蒸気が水の一部をおし出し、下の圧力を下げる。すると、とても熱い水がほとんど一度に蒸気に変わり、上にあるものすべてを地上へとおし出すのである。',
      'かなり規則正しくふき出す間欠泉もある。イエローストーンでもっとも有名な間欠泉オールド・フェイスフルは、ふつうおよそ60分から110分ごとにふき出すので、観光客はいつ見ればよいかを予想できることが多い。ほかの間欠泉には、数日、あるいは数年に一度しかふき出さないものもある。',
      '間欠泉はとてもこわれやすくもある。地震によって地下の水の通り道が変わり、完全に止まってしまうことがある。近くで地熱エネルギーのための掘削が行われ、間欠泉がふき出さなくなった場所もある。このため、今では多くの国が、間欠泉のある地域を保護している。',
    ],
    blanks: [
      { id: 'A', choices: ['without', 'not', 'no', 'none'], answer: 0, why: '前置詞 without ＋ 動名詞 boiling「沸とうせずに」。not・no・none は前置詞ではないので、あとに boiling をつなげられない。' },
      { id: 'B', choices: ['so', 'such', 'too', 'very'], answer: 0, why: 'あとに visitors can often predict … という文が続くので、接続詞 so「だから」。such・too・very は文と文をつなげない。' },
      { id: 'C', choices: ['where', 'which', 'what', 'whose'], answer: 0, why: '先行詞 the areas（場所）で、あとに geysers are found という完全な文が続くので関係副詞 where。which は前置詞がないと使えない（in which なら可）。' },
    ],
    tf: [
      { statement: '世界の活動中の間欠泉の約半分は、イエローストーン国立公園にある。', answer: true, why: '第1段落 about half of them are found in Yellowstone National Park。' },
      { statement: '地下深くの水は、圧力のために100℃をこえても沸とうしないことがある。', answer: true, why: '第2段落 it can become much hotter than 100°C without boiling。' },
      { statement: 'すべての間欠泉は、決まった時間に必ずふき出す。', answer: false, why: '第3段落 Others erupt only once in several days or even years。' },
      { statement: '地熱エネルギーのための掘削が、間欠泉に悪いえいきょうをあたえたことはない。', answer: false, why: '第4段落 drilling for geothermal energy nearby has caused geysers to stop erupting。' },
    ],
    qa: [
      { q: 'Why can visitors often predict when Old Faithful will erupt?', choices: ['Because it erupts on a fairly regular schedule.', 'Because it erupts only once every few years.', 'Because it is the largest geyser in the world.', 'Because it never stops erupting.'], answer: 0, why: '第3段落 Some geysers erupt on a fairly regular schedule. Old Faithful … usually erupts roughly every 60 to 110 minutes。' },
    ],
  },
{
    id: 'toefl-octopus-arms',
    title: 'Thinking with Eight Arms',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Octopuses are often described as the most intelligent invertebrates. In laboratories, they have learned to open jars, find their way through simple mazes, and even escape from their tanks. What makes this especially remarkable is that their nervous system is organized very differently from that of humans.",
      "Roughly two-thirds of an octopus's neurons are located in its arms ( A ) in its central brain. As a result, each arm can taste, feel, and even make simple decisions on its own. An arm that has been separated from the body can still react to touch for a short time.",
      "Octopuses are also masters of disguise. Their skin contains thousands of special cells called chromatophores, ( B ) allow them to change color in a fraction of a second. Some species can also change the texture of their skin so that they look like rocks or seaweed.",
      "Surprisingly, these clever animals do not live long. Many species live only one or two years, and females usually die soon after their eggs hatch. Because young octopuses do not learn from their parents, scientists believe that much of their ability must come from their own experience ( C ) from instinct.",
    ],
    ja: [
      'タコは、もっとも知能の高い無脊椎動物だと言われることが多い。実験室では、びんのふたを開けたり、かんたんな迷路を通りぬけたり、水そうからにげ出したりすることさえ学んできた。これがとくにおどろくべきなのは、タコの神経系のしくみが、人間のものとはまったくちがうからである。',
      'タコの神経細胞のおよそ3分の2は、中心にある脳ではなく腕にある。そのため、それぞれの腕が、味を感じたり、さわったものを感じとったり、かんたんな判断をしたりすることさえ自分でできる。体から切りはなされた腕でも、しばらくのあいだはさわられると反応することがある。',
      'タコは変装の名人でもある。皮ふには色素胞とよばれる特別な細胞が何千もあり、それによって一瞬で体の色を変えることができる。皮ふの表面の手ざわりまで変えて、岩や海藻のように見せる種類もいる。',
      'おどろいたことに、これほどかしこい動物なのに、長くは生きない。多くの種は1〜2年しか生きず、メスはふつう卵がかえるとまもなく死んでしまう。若いタコは親から学ぶことがないので、その能力の多くは本能だけでなく、自分自身の経験から来ているにちがいないと科学者は考えている。',
    ],
    blanks: [
      { id: 'A', choices: ['rather than', 'instead', 'despite', 'although'], answer: 0, why: 'A rather than B「B ではなく A」。in its arms rather than in its central brain。instead は副詞（instead of なら可）、despite は前置詞で in ～ の前に置けない、although は接続詞で文が続く。' },
      { id: 'B', choices: ['which', 'what', 'that', 'they'], answer: 0, why: 'コンマのあとで chromatophores を説明する非制限用法の関係代名詞は which。that はコンマのあとに使わない。what は先行詞をふくむ。they だとコンマだけで文がつながってしまう。' },
      { id: 'C', choices: ['as well as', 'as long as', 'as soon as', 'as far as'], answer: 0, why: 'A as well as B「B だけでなく A も」。from their own experience as well as from instinct。as long as・as soon as・as far as は接続詞で、あとに文が続く。' },
    ],
    tf: [
      { statement: 'タコの神経細胞の大部分は、脳ではなく腕にある。', answer: true, why: '第2段落 Roughly two-thirds of an octopus\'s neurons are located in its arms。' },
      { statement: '体からはなれた腕は、すぐにまったく反応しなくなる。', answer: false, why: '第2段落 can still react to touch for a short time。' },
      { statement: '皮ふの色だけでなく、手ざわりも変えられる種類がいる。', answer: true, why: '第3段落 Some species can also change the texture of their skin。' },
      { statement: '多くのタコは10年以上生きる。', answer: false, why: '第4段落 Many species live only one or two years。' },
    ],
    qa: [
      { q: 'Why do scientists think much of an octopus\'s ability comes from its own experience?', choices: ['Because young octopuses do not learn from their parents.', 'Because octopuses live for many years.', 'Because their brains are larger than human brains.', 'Because they always live in large groups.'], answer: 0, why: '第4段落 Because young octopuses do not learn from their parents。' },
    ],
  },
{
    id: 'toefl-lichen',
    title: 'Two Lives in One: Lichens',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "At first glance, a lichen looks like a single plant: a crusty, leafy, or branching growth on a rock or a tree. In fact, a lichen is a partnership between two very different organisms. One is a fungus, and the other is a partner that can carry out photosynthesis, usually a green alga or a cyanobacterium. Neither partner looks like a lichen ( A ) it lives on its own.",
      "Each partner contributes something the other lacks. The photosynthetic partner uses sunlight to produce sugars, ( B ) feed both organisms. The fungus, in turn, forms the body of the lichen, protects its partner from strong sunlight and drying, and absorbs water and minerals from its surroundings.",
      "This cooperation allows lichens to survive in places where few other living things can, such as bare rock, Arctic tundra, and deserts. Many lichens can dry out almost completely and become active again within minutes of getting wet. Because they grow very slowly, sometimes only a few millimeters a year, some lichen colonies are thought to be hundreds of years old.",
      "Lichens also matter to ecosystems and to people. They slowly break down rock and help create the first thin layers of soil. In northern regions, reindeer depend on them for food in winter. Since lichens take in most of what they need directly from the air, they are ( C ) sensitive to air pollution. For this reason, scientists use them to judge the quality of the air in and around cities.",
    ],
    ja: [
      'ひと目見ると、地衣類は1つの植物のように見える。岩や木の上にできる、かさぶたのような、葉のような、あるいは枝分かれしたものである。実際には、地衣類はまったくちがう2つの生物の共同生活である。1つは菌類で、もう1つは光合成ができる相手で、ふつうは緑藻かシアノバクテリアである。どちらの相手も、単独で生きているときには地衣類のようには見えない。',
      'それぞれの相手は、もう一方に足りないものを提供する。光合成をする相手は日光を使って糖をつくり、その糖が両方の生物の栄養になる。一方、菌類は地衣類の体をつくり、相手を強い日光や乾燥から守り、まわりから水分や無機物を吸収する。',
      'この協力のおかげで、地衣類は、むき出しの岩や北極のツンドラ、砂漠のように、ほかの生物がほとんど生きられない場所でも生き残ることができる。多くの地衣類は、ほとんど完全に乾いても、ぬれると数分のうちにまた活動を始められる。成長がとてもおそく、1年に数ミリしかのびないこともあるので、何百年も生きていると考えられている群落もある。',
      '地衣類は、生態系や人間にとっても大切である。岩を少しずつくずし、最初のうすい土の層をつくる手助けをする。北の地域では、トナカイが冬の食べ物として地衣類にたよっている。地衣類は必要なものの大部分を空気から直接とり入れるので、大気汚染にとても敏感である。そのため、科学者は都市やその周辺の空気の質を判断するのに地衣類を使っている。',
    ],
    blanks: [
      { id: 'A', choices: ['when', 'during', 'despite', 'because of'], answer: 0, why: 'あとに it lives on its own という文が続くので接続詞の when「～するとき」。during・despite・because of は前置詞。' },
      { id: 'B', choices: ['which', 'what', 'that', 'they'], answer: 0, why: 'コンマのあとで sugars を説明する非制限用法の関係代名詞は which。that はコンマのあとに使わない。what は先行詞をふくむ。they だと文が2つコンマだけでつながってしまう。' },
      { id: 'C', choices: ['highly', 'high', 'height', 'higher'], answer: 0, why: '形容詞 sensitive を修飾するのは副詞 highly「とても」。high・higher は形容詞（または副詞「高く」）、height は名詞。' },
    ],
    tf: [
      { statement: '地衣類は1種類の植物である。', answer: false, why: '第1段落 a lichen is a partnership between two very different organisms。' },
      { statement: '光合成をする相手が、両方の生物の栄養になる糖をつくる。', answer: true, why: '第2段落 The photosynthetic partner uses sunlight to produce sugars, which feed both organisms。' },
      { statement: '多くの地衣類は、乾いたあとでも、ぬれると短い時間でまた活動できる。', answer: true, why: '第3段落 become active again within minutes of getting wet。' },
      { statement: '地衣類は大気汚染に強いので、都市でよく育つ。', answer: false, why: '第4段落 they are highly sensitive to air pollution。' },
    ],
    qa: [
      { q: 'Why do scientists use lichens to judge air quality?', choices: ['They absorb most of their needs straight from the air.', 'They grow quickly wherever the air is clean.', 'They break down rock faster in polluted cities.', 'Reindeer avoid eating them when the air is polluted.'], answer: 0, why: '第4段落に、必要なものの大半を空気から直接取り込むので汚染に敏感だとある。地衣類の成長はとても遅く（第3段落）、岩を分解する話やトナカイの話は空気の質を調べる理由ではない。' },
    ],
  },
{
    id: 'toefl-hawaii-hotspot',
    title: 'A Chain of Islands from One Hot Spot',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "Most volcanoes form near the edges of tectonic plates, where plates pull apart or push against each other. The Hawaiian Islands, however, lie in the middle of the Pacific Plate, thousands of kilometers from the nearest plate boundary. To explain their existence, geologists developed the idea of a \"hotspot\": a place where unusually hot material rises from deep inside the Earth and melts ( A ) the crust above it.",
      "The hotspot itself stays in roughly the same position, but the Pacific Plate moves slowly toward the northwest, at a rate of several centimeters per year. As the plate passes over the hotspot, magma breaks through and builds a volcano. Over time, the plate carries that volcano away from its source of magma, and a new volcano begins to form ( B ) the old one used to be.",
      "This process explains a striking pattern. The island of Hawaii, at the southeastern end of the chain, is the youngest and still has active volcanoes, while the islands become older and more worn down toward the northwest. Southeast of Hawaii, an undersea volcano is already growing and may one day ( C ) above the ocean surface as the next island.",
    ],
    ja: [
      'ほとんどの火山は、プレートが離れたり押し合ったりするプレートの境目の近くにできる。しかし、ハワイ諸島は太平洋プレートのまん中にあり、いちばん近いプレートの境目から何千キロもはなれている。その存在を説明するために、地質学者は「ホットスポット」という考えを生み出した。地球の深いところから異常に熱い物質がのぼってきて、その上の地殻をとかす場所である。',
      'ホットスポットそのものはほぼ同じ場所にとどまっているが、太平洋プレートは1年に数センチの速さで、北西に向かってゆっくり動いている。プレートがホットスポットの上を通ると、マグマが地表をつきやぶって火山をつくる。時間がたつと、プレートはその火山をマグマの源から遠くへ運び、古い火山があった場所に新しい火山ができ始める。',
      'このしくみによって、目を引く並び方が説明できる。列の南東のはしにあるハワイ島はいちばん新しく、今も活火山があるが、北西に向かうにつれて島は古くなり、けずられていく。ハワイ島の南東では、海底火山がすでに成長しており、いつか次の島として海面の上に姿をあらわすかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['through', 'among', 'during', 'since'], answer: 0, why: 'melt through ～「～をとかしてつきぬける」。地殻（the crust）をとかしてのぼってくる。' },
      { id: 'B', choices: ['where', 'which', 'whom', 'whose'], answer: 0, why: '「古い火山があった場所に」は関係副詞 where（＝at the place where）。where のあとに完全な文（the old one used to be）が続く。' },
      { id: 'C', choices: ['rise', 'raise', 'rising', 'risen'], answer: 0, why: 'may のあとは動詞の原形。rise は自動詞「のぼる・あらわれる」。raise は「～を上げる」で目的語が必要。' },
    ],
    tf: [
      { statement: 'ハワイ諸島は、プレートの境目の近くにある。', answer: false, why: '第1段落 in the middle of the Pacific Plate, thousands of kilometers from the nearest plate boundary。' },
      { statement: '太平洋プレートは北西に向かって動いている。', answer: true, why: '第2段落 the Pacific Plate moves slowly toward the northwest。' },
      { statement: 'ハワイ島は、列の中でいちばん古い島である。', answer: false, why: '第3段落 The island of Hawaii ... is the youngest。' },
      { statement: 'ハワイ島の南東では、新しい火山が海の中で成長している。', answer: true, why: '第3段落 an undersea volcano is already growing。' },
    ],
    qa: [
      { q: 'Why do the islands become older toward the northwest?', choices: ['The plate carries each volcano northwest, away from the hotspot.', 'The hotspot moves toward the southeast every year.', 'Older islands are made by bigger volcanoes.', 'The ocean is deeper in the northwest.'], answer: 0, why: '第2段落 the plate carries that volcano away from its source of magma（プレートが北西へ運ぶ）。' },
    ],
  },
  {
    id: 'adv-halo-effect',
    title: 'One Bright Feature',
    level: '難関大（評論）',
    paragraphs: [
      "When we meet someone who is attractive or confident, we tend to assume that they also possess other good qualities, such as intelligence, kindness, or honesty. Psychologists call this tendency the halo effect, ( A ) the image of a bright ring of light around a saint's head. A single positive feature seems to cast its glow over everything else we know about the person.",
      "The effect has been observed in many settings. Teachers have been found to give higher marks to essays when they believe the writer is a pleasant student, and interviewers may judge a well-dressed applicant as more capable ( B ) knowing anything about their skills. The reverse also occurs: one negative trait can make us view a person's other qualities more harshly than they deserve.",
      "Why does the mind work this way? Forming a complete and balanced judgment of another person takes time and effort, so the brain relies on a quick overall impression and uses it to fill in the gaps. This shortcut is often useful in daily life, but it can lead to unfair decisions in schools, workplaces, and courts. Being aware of the halo effect will not make it ( C ), but it can remind us to judge each quality on its own evidence.",
    ],
    ja: [
      '魅力的な人や自信のある人に会うと、私たちはその人がほかのよい性質、たとえば知性や親切さ、正直さももっていると思いこみがちである。心理学者はこの傾向をハロー効果とよぶ。聖人の頭のまわりにある、明るい光の輪のイメージにちなんだ名前である。ひとつのよい特徴が、その人について知っているほかのすべてに光を投げかけるように思えるのだ。',
      'この効果は、さまざまな場面で観察されてきた。教師は、書き手が感じのよい生徒だと思っていると作文に高い点をつけることがわかっているし、面接官は、身なりのよい応募者を、その技能について何も知らないのに、より有能だと判断することがある。逆のことも起こる。ひとつの悪い特徴のせいで、その人のほかの性質を、実際よりもきびしく見てしまうことがあるのだ。',
      'なぜ心はこのようにはたらくのだろうか。ほかの人について、完全でかたよりのない判断をするには時間と労力がかかる。そのため脳は、手早い全体の印象にたより、それを使ってすき間をうめる。この近道は日常生活ではしばしば役に立つが、学校や職場、裁判所で不公平な決定につながることがある。ハロー効果を知っていても、それが消えるわけではないが、ひとつひとつの性質をそれ自体の根拠で判断するよう、思い出させてくれるだろう。',
    ],
    blanks: [
      { id: 'A', choices: ['after', 'because', 'although', 'unless'], answer: 0, why: 'call A B, after ～「～にちなんで A を B とよぶ」。after のあとに名詞（the image）が続く。because・although・unless は接続詞で、あとに主語と動詞が必要。' },
      { id: 'B', choices: ['without', 'despite of', 'unless', 'nor'], answer: 0, why: 'without ～ing「～しないで」。despite は of をとらない。unless・nor のあとに knowing だけを置くことはできない。' },
      { id: 'C', choices: ['disappear', 'disappeared', 'to disappear', 'disappearing'], answer: 0, why: '使役の make O ＋動詞の原形「O を～させる」。to 不定詞や分詞は使えない。' },
    ],
    tf: [
      { statement: '魅力的な人は、ほかのよい性質ももっていると思われやすい。', answer: true, why: '第1段落 we tend to assume that they also possess other good qualities。' },
      { statement: 'ハロー効果は、よい印象についてだけ起こり、悪い印象では起こらない。', answer: false, why: '第2段落 The reverse also occurs: one negative trait can make us view ... more harshly。' },
      { statement: '脳は、手早い全体の印象を使って、わからないところをうめる。', answer: true, why: '第3段落 the brain relies on a quick overall impression and uses it to fill in the gaps。' },
      { statement: '筆者は、ハロー効果を知れば、その影響をまったく受けなくなると述べている。', answer: false, why: '第3段落 Being aware of the halo effect will not make it disappear。' },
    ],
    qa: [
      { q: 'What does the author suggest we do about the halo effect?', choices: ['Judge each quality on its own evidence.', 'Trust our first impressions completely.', 'Avoid meeting confident people.', 'Stop forming any opinions about others.'], answer: 0, why: '第3段落 it can remind us to judge each quality on its own evidence。' },
    ],
  },
  {
    id: 'toefl-autumn-leaves',
    title: 'Why Leaves Change Color',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "In many temperate forests, autumn turns green hillsides into shades of yellow, orange, and red. Although the change looks as if new colors were being added to the leaves, much of it is actually the result of a color being lost. During spring and summer, leaves are full of chlorophyll, the green pigment that absorbs sunlight for photosynthesis, and it is so abundant that it hides the other pigments ( A ) in the leaf.",
      "As days grow shorter and temperatures fall, trees prepare for winter by breaking down chlorophyll and moving its valuable nutrients, such as nitrogen, into their branches and roots. Once the green fades, yellow and orange pigments called carotenoids, ( B ) were there all along, finally become visible.",
      "Red colors have a different origin. In some species, leaves produce new pigments called anthocyanins in autumn, especially when days are sunny and nights are cool. Scientists are still debating why a tree would spend energy ( C ) pigments in leaves it is about to drop. One theory suggests that anthocyanins act like a sunscreen, protecting the leaf from strong light while the tree recovers its nutrients.",
    ],
    ja: [
      '多くの温帯の森では、秋になると緑の丘が黄色やオレンジ、赤の色合いに変わる。この変化は、葉に新しい色が加えられているように見えるが、その多くは実際には、ある色が失われた結果である。春と夏のあいだ、葉は光合成のために日光を吸収する緑の色素、クロロフィルでいっぱいで、その量があまりにも多いため、葉にあるほかの色素をかくしてしまう。',
      '日が短くなり気温が下がると、木はクロロフィルを分解し、窒素などの大切な栄養を枝や根に移すことで、冬にそなえる。緑が消えると、カロテノイドとよばれる黄色やオレンジの色素が、ついに見えるようになる。この色素は、ずっとそこにあったのである。',
      '赤い色は、ちがうところから生まれる。いくつかの種では、秋になると葉がアントシアニンとよばれる新しい色素をつくる。とくに、昼は晴れて夜はすずしいときによくつくられる。木が、もうすぐ落とす葉に、なぜエネルギーを使って色素をつくるのかについては、科学者のあいだで今も議論が続いている。ひとつの説では、アントシアニンが日焼け止めのようにはたらき、木が栄養を回収するあいだ、強い光から葉を守っているという。',
    ],
    blanks: [
      { id: 'A', choices: ['present', 'presence', 'presently', 'presenting'], answer: 0, why: 'the other pigments present in the leaf「葉にあるほかの色素」。形容詞 present が後ろから名詞を説明する。presence は名詞、presently は副詞、presenting は目的語が必要。' },
      { id: 'B', choices: ['which', 'what', 'who', 'where'], answer: 0, why: 'コンマのあとで pigments を説明する関係代名詞 which（主格）。what は先行詞をとらない。who は人、where はあとに完全な文が必要。' },
      { id: 'C', choices: ['making', 'make', 'made', 'makes'], answer: 0, why: 'spend ＋時間・エネルギー＋ ～ing「～するのに使う」。原形や過去形、三単現は置けない。' },
    ],
    tf: [
      { statement: '秋の葉の色の変化の多くは、緑の色素が失われることで起こる。', answer: true, why: '第1段落 much of it is actually the result of a color being lost。' },
      { statement: '黄色やオレンジの色素は、秋になって新しくつくられる。', answer: false, why: '第2段落 carotenoids, which were there all along。' },
      { statement: '木は冬にそなえて、葉の栄養を枝や根に移す。', answer: true, why: '第2段落 moving its valuable nutrients ... into their branches and roots。' },
      { statement: '赤い色素がつくられる理由は、すでにはっきりわかっている。', answer: false, why: '第3段落 Scientists are still debating why ...。' },
    ],
    qa: [
      { q: 'According to one theory, what do anthocyanins do?', choices: ['They protect the leaf from strong light while nutrients are recovered.', 'They help the leaf absorb more sunlight for photosynthesis.', 'They make the leaf fall from the tree sooner.', 'They store nitrogen in the roots for the winter.'], answer: 0, why: '第3段落 anthocyanins act like a sunscreen, protecting the leaf from strong light while the tree recovers its nutrients。' },
    ],
  },
  {
    id: 'adv-biz-delay-email',
    title: 'An Email About a Late Delivery',
    level: '難関大（ビジネスメール）',
    paragraphs: [
      "Dear Mr. Lee, thank you for your order of 500 notebooks, which we received on October 3. Unfortunately, I must inform you that the delivery will be delayed by about one week. One of our printing machines broke down last Friday, and the replacement part will not arrive until next Tuesday.",
      "We sincerely apologize for any inconvenience this may cause. To make up for the delay, we would like to offer you a 10 percent discount on this order. In addition, we can send the first 200 notebooks by express mail this Thursday, ( A ) you need some of them sooner.",
      "Please let us know by Wednesday ( B ) you would like us to send part of the order early. If we do not hear from you, we will send all 500 notebooks together on October 20.",
      "We value our relationship with your company and will do everything we can to prevent this kind of problem from ( C ) again. Thank you for your understanding. Best regards, Mika Sato, Customer Service, Nishi Paper Co.",
    ],
    ja: [
      'リー様。ノート500冊のご注文をいただき、ありがとうございます。ご注文は10月3日に受けつけました。あいにくですが、配達がおよそ1週間おくれることをお知らせしなければなりません。先週の金曜日に印刷機の1台がこわれ、交換部品が来週の火曜日まで届かないためです。',
      'ご不便をおかけし、心よりおわび申し上げます。おくれのおわびとして、このご注文を10パーセント値引きさせていただきたいと思います。さらに、一部を早くご入用の場合にそなえて、最初の200冊を今週の木曜日に速達でお送りすることもできます。',
      '注文の一部を早めに送ってほしいかどうか、水曜日までにお知らせください。ご連絡がない場合は、10月20日に500冊すべてをまとめてお送りします。',
      '私どもは貴社とのおつきあいをたいせつにしており、このような問題が二度と起こらないよう、できるかぎりのことをいたします。ご理解いただき、ありがとうございます。よろしくお願いいたします。ニシ製紙 お客様係 サトウ・ミカ',
    ],
    blanks: [
      { id: 'A', choices: ['in case', 'in spite of', 'because of', 'instead of'], answer: 0, why: 'あとに you need … という文が続くので、接続詞の in case「～する場合にそなえて」。in spite of・because of・instead of は前置詞で、文は続かない。' },
      { id: 'B', choices: ['whether', 'what', 'which', 'who'], answer: 0, why: 'let us know whether ～「～かどうか知らせる」。あとの文は send part of the order と目的語までそろっているので、what・which・who は入らない。' },
      { id: 'C', choices: ['happening', 'happen', 'happened', 'to happen'], answer: 0, why: 'prevent A from ～ing「A が～するのを防ぐ」。from は前置詞なので動名詞。' },
    ],
    tf: [
      { statement: '注文は10月3日に受けつけられた。', answer: true, why: '第1段落 which we received on October 3。' },
      { statement: '配達はおよそ1か月おくれる。', answer: false, why: '第1段落 delayed by about one week。' },
      { statement: '会社はこの注文を10パーセント値引きする。', answer: true, why: '第2段落 a 10 percent discount on this order。' },
      { statement: '返事がなければ、ノートは2回に分けて送られる。', answer: false, why: '第3段落 we will send all 500 notebooks together。' },
    ],
    qa: [
      { q: 'Why will the delivery be delayed?', choices: ['One of the printing machines broke down.', 'The customer changed the order.', 'The notebooks were sent to the wrong address.', 'The express mail service was closed.'], answer: 0, why: '第1段落 One of our printing machines broke down last Friday。' },
    ],
  },
  {
    id: 'toefl-roman-aqueducts',
    title: 'Water for an Ancient City',
    level: 'TOEFL・IELTS（歴史）',
    paragraphs: [
      "Ancient Rome grew into one of the largest cities in the world, with perhaps a million residents at its peak. Supplying so many people with clean water was an enormous challenge, because the local springs and the Tiber River could not provide enough. The Romans solved this problem by building aqueducts, channels ( A ) carried water from distant hills into the city.",
      "Although many people imagine aqueducts as tall stone bridges with rows of arches, most of their length actually ran underground. Engineers designed each channel with a very slight downward slope, so that gravity alone kept the water ( B ) for dozens of kilometers. Bridges were built only where a channel had to cross a valley.",
      "Once the water reached Rome, it was distributed to public fountains, baths, and, for those who could pay, private homes. The system was so effective that parts of it are still in use today. One ancient aqueduct, after centuries of repairs, continues to supply water to fountains in the city, ( C ) the famous Trevi Fountain.",
    ],
    ja: [
      '古代ローマは世界でもっとも大きな都市の一つに成長し、最も多いときにはおそらく100万人が住んでいた。地元の泉やテヴェレ川では足りなかったため、これほど多くの人にきれいな水を届けるのはたいへんな難題だった。ローマ人は、遠くの丘から都市の中へ水を運ぶ水路、つまり水道橋（水道）をつくることで、この問題を解決した。',
      '多くの人は、水道といえばアーチがならぶ高い石の橋を思いうかべるが、実際にはその長さの大部分は地下を通っていた。技術者はそれぞれの水路にごくわずかな下りのかたむきをつけ、重力だけで水が何十キロも流れつづけるようにした。橋がつくられたのは、水路が谷をこえなければならない場所だけだった。',
      '水はローマに着くと、公共の噴水や浴場、そしてお金をはらえる人の家へと分けられた。このしくみはとても優れていたので、その一部は今も使われている。ある古代の水道は、何世紀にもわたる修理をへて、有名なトレビの泉をふくむ市内の噴水に、今も水を送りつづけている。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 channels（もの）を説明する主格の関係代名詞 that。what は先行詞をとらない、where はあとに完全な文、whose はあとに名詞が必要。' },
      { id: 'B', choices: ['flowing', 'flow', 'flowed', 'to flow'], answer: 0, why: 'keep O ～ing「O を～しつづけさせる」。keep のあとに原形や to 不定詞は置けない。' },
      { id: 'C', choices: ['including', 'include', 'included', 'includes'], answer: 0, why: 'including ～「～をふくめて」は前置詞のようにはたらき、名詞が続く。動詞の形は文の中に入らない。' },
    ],
    tf: [
      { statement: '古代ローマでは、近くの泉と川だけで十分な水があった。', answer: false, why: '第1段落 the local springs and the Tiber River could not provide enough。' },
      { statement: '水道の大部分は地下を通っていた。', answer: true, why: '第2段落 most of their length actually ran underground。' },
      { statement: '水はポンプの力で運ばれていた。', answer: false, why: '第2段落 gravity alone kept the water flowing。' },
      { statement: '古代の水道の一部は、今も使われている。', answer: true, why: '第3段落 parts of it are still in use today。' },
    ],
    qa: [
      { q: 'Why were bridges built as part of the aqueducts?', choices: ['To carry a channel across a valley.', 'To make the water flow uphill.', 'To store water for dry seasons.', 'To connect private homes to the baths.'], answer: 0, why: '第2段落 Bridges were built only where a channel had to cross a valley。' },
    ],
  },
  {
    id: 'adv-notice-library',
    title: 'Notice: Library Renovation',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "Notice to all library users. From December 1 to January 15, the Central Library will be partly closed for renovation work. During this period, the second floor, ( A ) the study rooms and the children's section are located, will not be available.",
      "The first floor will remain open as usual, so you can still borrow and return books there. Children's events, such as the Saturday story time, will be held in the meeting room on the first floor. However, please note that the library will close at 6:00 p.m. instead of 8:00 p.m. on weekdays, as some of the work must be done in the evening. Books that are due during the closure may be kept for an extra two weeks without ( B ) a late fee.",
      "After the renovation, the second floor will have more seats, free Wi-Fi, and a new space ( C ) students can study in groups. We apologize for any inconvenience and thank you for your understanding. Central Library Management Office",
    ],
    ja: [
      '図書館をご利用のみなさまへのお知らせです。12月1日から1月15日まで、中央図書館は改装工事のため一部閉館します。この期間、学習室と児童コーナーがある2階はご利用いただけません。',
      '1階はいつもどおり開いていますので、本の貸し出しと返却はそちらでできます。土曜日のおはなし会などの子ども向けの催しは、1階の会議室で行います。ただし、工事の一部を夜に行う必要があるため、平日は午後8時ではなく午後6時に閉館しますので、ご注意ください。閉館期間中に返却期限が来る本は、延滞料なしでさらに2週間お持ちいただけます。',
      '改装後、2階には座席が増え、無料の Wi-Fi と、学生がグループで勉強できる新しいスペースができます。ご不便をおかけしますが、ご理解のほどよろしくお願いいたします。中央図書館 管理事務所',
    ],
    blanks: [
      { id: 'A', choices: ['where', 'which', 'what', 'that'], answer: 0, why: 'あとに the study rooms … are located という完全な文が続くので関係副詞 where。which だと in が必要、コンマのあとに that・what は使えない。' },
      { id: 'B', choices: ['paying', 'pay', 'paid', 'to pay'], answer: 0, why: '前置詞 without のあとは動名詞（～ing）。without paying a late fee「延滞料をはらわずに」。' },
      { id: 'C', choices: ['where', 'which', 'what', 'who'], answer: 0, why: 'あとに students can study in groups という完全な文が続くので関係副詞 where。which だと in などの前置詞が必要。' },
    ],
    tf: [
      { statement: '2階は12月1日から1月15日まで使えない。', answer: true, why: '第1段落 From December 1 to January 15 … the second floor … will not be available。' },
      { statement: '改装中は、1階でも本を借りられない。', answer: false, why: '第2段落 you can still borrow and return books there。' },
      { statement: '改装中、平日は午後8時に閉館する。', answer: false, why: '第2段落 close at 6:00 p.m. instead of 8:00 p.m.。' },
      { statement: '改装後、2階にはグループで勉強できる場所ができる。', answer: true, why: '第3段落 a new space where students can study in groups。' },
    ],
    qa: [
      { q: 'What will happen to books that are due during the closure?', choices: ['They can be kept for two more weeks without a late fee.', 'They must be returned by December 1.', 'They will be moved to the second floor.', 'They can only be returned after January 15.'], answer: 0, why: '第2段落 may be kept for an extra two weeks without paying a late fee。' },
    ],
  },
  {
    id: 'adv-comparison-trap',
    title: 'Everyday Lives and Other People\'s Highlights',
    level: '難関大（評論）',
    paragraphs: [
      "Social media allows us to see the lives of hundreds of people every day. Yet what appears on our screens is rarely a complete picture. Most people share their best moments, such as a trip abroad, a delicious meal, or a prize at a competition, while keeping their ordinary or difficult days to themselves, ( A ) means that what we see is a carefully selected version of reality.",
      "Psychologists have long known that people judge themselves by ( B ) themselves with others. When the comparison is upward, toward people who seem more successful or happier, it can motivate us, but it can also make us feel that we are falling behind. Online, upward comparisons are almost unavoidable, because the most impressive posts are the ones most likely to be shared and seen.",
      "This does not mean that we should stop using social media altogether. A more realistic approach is to remember that every post is an edited story, not the whole truth. Some researchers also suggest focusing on our own progress over time rather than on how we rank against others. Doing so may help us enjoy what we see online without ( C ) less satisfied with our own lives.",
    ],
    ja: [
      'SNS を使えば、私たちは毎日何百人もの人の生活を見ることができる。しかし、画面にあらわれるものが全体像であることはめったにない。たいていの人は、海外旅行やおいしい食事、大会での受賞といったいちばんよい場面をのせ、ふつうの日やつらい日は自分の中にしまっておく。つまり、私たちが見ているのは、注意深く選ばれた現実なのである。',
      '人が自分をほかの人とくらべることで自分を評価することは、心理学者のあいだで昔から知られている。くらべる相手が上向き、つまり自分より成功していたり幸せそうだったりする人の場合、それはやる気を生むこともあるが、自分が取り残されていると感じさせることもある。ネットでは、いちばん目を引く投稿ほど広まり見られやすいため、上向きの比較はほとんどさけられない。',
      'だからといって、SNS をまったく使わないようにすべきだというわけではない。より現実的な方法は、どの投稿も編集された物語であり、真実のすべてではないと覚えておくことだ。また、ほかの人とくらべてどの順位にいるかではなく、時間をかけた自分自身の進歩に目を向けることをすすめる研究者もいる。そうすれば、自分の生活への満足感を下げずに、ネットで見るものを楽しめるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'that', 'it'], answer: 0, why: 'コンマのあとで前の内容全体を受ける関係代名詞 which。コンマのあとに that は使えず、what は先行詞をとらない。it では文が2つ接続詞なしでつながってしまう。' },
      { id: 'B', choices: ['comparing', 'compare', 'compared', 'to compare'], answer: 0, why: '前置詞 by のあとは動名詞。by comparing A with B「A を B とくらべることによって」。' },
      { id: 'C', choices: ['feeling', 'feel', 'felt', 'to feel'], answer: 0, why: '前置詞 without のあとは動名詞（～ing）。without feeling less satisfied「満足感を下げずに」。' },
    ],
    tf: [
      { statement: 'たいていの人は、SNS に自分のいちばんよい場面をのせる。', answer: true, why: '第1段落 Most people share their best moments。' },
      { statement: '上向きの比較は、いつも人をやる気にさせるだけである。', answer: false, why: '第2段落 it can also make us feel that we are falling behind。' },
      { statement: '筆者は、SNS をまったく使わないようにすべきだと主張している。', answer: false, why: '第3段落 This does not mean that we should stop using social media altogether。' },
      { statement: 'ほかの人との順位より、自分の進歩に目を向けることがすすめられている。', answer: true, why: '第3段落 focusing on our own progress over time rather than on how we rank against others。' },
    ],
    qa: [
      { q: 'Why are upward comparisons almost unavoidable online?', choices: ['The most impressive posts are the most likely to be shared and seen.', 'People only post about their difficult days.', 'Psychologists tell people to compare themselves with others.', 'Social media hides the posts of successful people.'], answer: 0, why: '第2段落 because the most impressive posts are the ones most likely to be shared and seen。' },
    ],
  },
  {
    id: 'toefl-desert-locusts',
    title: 'When Grasshoppers Become a Swarm',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Desert locusts are a kind of grasshopper found in dry regions of Africa, the Middle East, and South Asia. For most of the time, they are insects ( A ) live alone and tend to avoid one another. In this solitary phase, they are mostly green or brown and cause little harm to crops.",
      "However, after heavy rains, plants grow quickly and locust populations increase. When the rains end and the plants begin to die, large numbers of locusts are forced ( B ) together in the few areas that still have food. Scientists have found that frequent contact between their back legs triggers a remarkable change. Within a few hours, the insects become attracted to one another, and over time they change color and shape.",
      "In this crowded phase, locusts form enormous swarms that may contain billions of insects. A swarm can travel more than 100 kilometers in a single day, and each locust can eat roughly its own body weight in plants every day. As a result, swarms can destroy farmland ( C ) feeds millions of people. For this reason, many countries monitor rainfall and plant growth in order to detect outbreaks early.",
    ],
    ja: [
      'サバクトビバッタは、アフリカや中東、南アジアの乾いた地域に見られるバッタの一種である。ふだんの多くの時期、彼らはひとりで暮らし、おたがいをさける傾向のある昆虫だ。この「孤独相」のときは、体はおもに緑か茶色で、作物にほとんど害をあたえない。',
      'しかし、大雨のあとには植物が急に育ち、バッタの数がふえる。雨がやんで植物がかれはじめると、たくさんのバッタが、まだえさの残るわずかな場所に集まらざるをえなくなる。科学者は、後ろ足どうしがひんぱんにふれあうことが、おどろくべき変化を引き起こすことを発見した。数時間のうちにバッタはおたがいに引きよせられるようになり、やがて体の色や形も変わる。',
      'この「群生相」になると、バッタは何十億匹にもなる巨大な群れをつくる。群れは1日で100キロ以上移動することがあり、1匹1匹が毎日、自分の体重とほぼ同じ量の植物を食べる。その結果、群れは何百万人もの人を養う農地をあらしてしまうことがある。そのため、多くの国が大発生を早く見つけるために、雨の量や植物の育ち方を見守っている。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 insects を説明する主格の関係代名詞 that。what は先行詞をとらない、where はあとに完全な文、whose はあとに名詞が必要。' },
      { id: 'B', choices: ['to gather', 'gathering', 'gather', 'gathered'], answer: 0, why: 'be forced to ～「～せざるをえない」。force O to ～ の受け身なので to 不定詞が続く。' },
      { id: 'C', choices: ['that', 'what', 'who', 'where'], answer: 0, why: '先行詞 farmland を説明し、あとに動詞 feeds が続くので主格の関係代名詞 that。where はあとに完全な文が必要。' },
    ],
    tf: [
      { statement: 'サバクトビバッタは、ふだんはひとりで暮らしている。', answer: true, why: '第1段落 they are insects that live alone。' },
      { statement: '大雨のあとには、バッタの数がへる。', answer: false, why: '第2段落 after heavy rains … locust populations increase。' },
      { statement: '後ろ足がふれあうことが、変化のきっかけになる。', answer: true, why: '第2段落 frequent contact between their back legs triggers a remarkable change。' },
      { statement: '群れは1日に10キロほどしか移動できない。', answer: false, why: '第3段落 more than 100 kilometers in a single day。' },
    ],
    qa: [
      { q: 'Why do many countries monitor rainfall and plant growth?', choices: ['To detect locust outbreaks early.', 'To help locusts find more food.', 'To change the color of the locusts.', 'To make the locusts live alone.'], answer: 0, why: '第3段落 in order to detect outbreaks early。' },
    ],
  },
  {
    id: 'toefl-chunking',
    title: 'Remembering More by Grouping',
    level: 'TOEFL・IELTS（心理）',
    paragraphs: [
      "In 1956, the psychologist George Miller published a famous paper suggesting that people can hold only about seven items in their short-term memory at once. Later research has suggested that the true limit may be even smaller, around four items. Yet people regularly remember long phone numbers and complex information. How is this ( A )?",
      "One important answer is a strategy called chunking: grouping individual pieces of information into larger, meaningful units. For example, the letters F, B, I, C, I, A form a string of six separate items. But someone who recognizes the abbreviations FBI and CIA needs to remember only two chunks. In the same way, a ten-digit phone number is far easier to recall when it is ( B ) into three groups.",
      "Chunking also helps explain why experts seem to have remarkable memories. In one classic study, experienced chess players looked at a board for just a few seconds and then rebuilt the positions of the pieces far more accurately than beginners. However, when the pieces were placed randomly, the experts' advantage almost disappeared. Their skill depended on recognizing familiar patterns, ( C ) allowed them to treat a group of pieces as a single unit.",
    ],
    ja: [
      '1956年、心理学者ジョージ・ミラーは、人が短期記憶に一度におけるのはおよそ7つの項目だけだと示す有名な論文を発表した。その後の研究では、本当の限界はもっと小さく、4つほどかもしれないと示されている。それでも人は、長い電話番号や複雑な情報をふつうに覚えている。どうしてそれが可能なのだろうか。',
      '重要な答えの一つは、チャンキングとよばれる方法、つまり、ばらばらの情報をより大きな意味のあるまとまりにすることである。たとえば、F、B、I、C、I、A という文字は、6つの別々の項目のならびである。しかし、FBI と CIA という略語を知っている人は、2つのかたまりを覚えるだけでよい。同じように、10けたの電話番号も、3つのグループに分けると、ずっと思い出しやすくなる。',
      'チャンキングは、専門家がおどろくほどの記憶力をもっているように見える理由の説明にもなる。ある古典的な研究で、経験豊かなチェスの選手は、盤をほんの数秒見ただけで、初心者よりはるかに正確に駒の位置を再現した。しかし、駒がでたらめに置かれていると、専門家の強みはほとんど消えた。彼らの技能は、見なれたパターンを見分けることにもとづいていて、それによって駒のまとまりを1つの単位としてあつかうことができたのである。',
    ],
    blanks: [
      { id: 'A', choices: ['possible', 'possibly', 'possibility', 'possibilities'], answer: 0, why: 'be 動詞 is のあとに置く補語は形容詞 possible。How is this possible?「どうしてそれが可能なのか」。副詞や名詞は入らない。' },
      { id: 'B', choices: ['divided', 'dividing', 'divide', 'to divide'], answer: 0, why: '電話番号は「分けられる」ので受け身 is divided。is のあとに原形や to 不定詞は置けず、dividing だと「分けている」になり目的語が必要。' },
      { id: 'C', choices: ['which', 'what', 'who', 'where'], answer: 0, why: 'コンマのあとで前の内容（パターンを見分けること）を受ける関係代名詞 which。あとに動詞 allowed が続く。' },
    ],
    tf: [
      { statement: 'ミラーは、短期記憶にはおよそ7つの項目しかおけないと述べた。', answer: true, why: '第1段落 people can hold only about seven items。' },
      { statement: 'その後の研究で、限界はもっと大きいとわかった。', answer: false, why: '第1段落 the true limit may be even smaller。' },
      { statement: '電話番号は、グループに分けると思い出しやすくなる。', answer: true, why: '第2段落 far easier to recall when it is divided into three groups。' },
      { statement: '駒がでたらめに置かれても、専門家の強みは変わらなかった。', answer: false, why: '第3段落 the experts\' advantage almost disappeared。' },
    ],
    qa: [
      { q: 'Why did the experts lose their advantage when the pieces were placed randomly?', choices: ['They could no longer recognize familiar patterns.', 'They had less time to look at the board.', 'The beginners had practiced more.', 'The random positions used more pieces.'], answer: 0, why: '第3段落 Their skill depended on recognizing familiar patterns。' },
    ],
  },
  {
    id: 'adv-navigation-apps',
    title: 'The Hidden Cost of Never Getting Lost',
    level: '難関大（評論）',
    paragraphs: [
      "Satellite navigation has made getting lost almost a thing of the past. With a smartphone, we can walk through an unfamiliar city simply by following a blue dot on a map. Yet some researchers have begun to ask ( A ) this convenience comes at a hidden cost.",
      "Studies suggest that people who rely heavily on turn-by-turn directions tend to form weaker mental maps of the places they travel through. When a device tells us exactly when to turn, we no longer need to notice landmarks, estimate distances, or keep track of our direction. The parts of the brain ( B ) are involved in these tasks may therefore receive less exercise.",
      "None of this means that we should throw away our phones. Navigation apps are extremely useful, especially in emergencies or in places where getting lost could be dangerous. However, occasionally finding our way without them, by studying a map beforehand or paying attention to the streets around us, may help keep our sense of direction ( C ). Getting lost, it turns out, can sometimes be a valuable experience.",
    ],
    ja: [
      '衛星ナビゲーションのおかげで、道に迷うことはほとんど過去のものになった。スマートフォンがあれば、地図の上の青い点を追うだけで、知らない町を歩くことができる。しかし、この便利さには見えない代償があるのではないかと問いはじめた研究者もいる。',
      '研究によると、曲がる場所を1つずつ教える案内に強くたよる人は、通った場所について頭の中の地図が弱くなりがちだという。機械がいつ曲がればよいかを正確に教えてくれると、私たちは目印に気づいたり、きょりを見積もったり、自分の向きを追ったりする必要がなくなる。そのため、こうした作業にかかわる脳の部分が、あまりきたえられなくなるかもしれない。',
      'だからといって、スマートフォンを捨てるべきだということではない。ナビのアプリは、とくに緊急のときや、迷うと危ない場所ではとても役に立つ。しかし、ときには前もって地図を調べたり、まわりの通りに注意をはらったりして、アプリなしで道を見つけることが、方向感覚をするどく保つ助けになるかもしれない。道に迷うことは、ときに価値のある経験になりうるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['whether', 'what', 'which', 'who'], answer: 0, why: 'ask whether ～「～かどうかを問う」。あとの文は this convenience comes at a hidden cost と完全なので、what・which・who は入らない。' },
      { id: 'B', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 The parts of the brain を説明し、あとに動詞 are involved が続くので主格の関係代名詞 that。where はあとに完全な文が必要。' },
      { id: 'C', choices: ['sharp', 'sharply', 'sharpness', 'sharpen'], answer: 0, why: 'keep O ＋ 形容詞「O を～の状態に保つ」。副詞・名詞・動詞は補語にならない。' },
    ],
    tf: [
      { statement: 'ナビの便利さには見えない代償があるのではと考える研究者がいる。', answer: true, why: '第1段落 some researchers have begun to ask whether this convenience comes at a hidden cost。' },
      { statement: '案内に強くたよる人ほど、頭の中の地図がしっかりできる。', answer: false, why: '第2段落 tend to form weaker mental maps。' },
      { statement: '筆者は、スマートフォンを捨てるべきだと主張している。', answer: false, why: '第3段落 None of this means that we should throw away our phones。' },
      { statement: '筆者は、ときにはアプリなしで道を見つけることをすすめている。', answer: true, why: '第3段落 occasionally finding our way without them … may help keep our sense of direction sharp。' },
    ],
    qa: [
      { q: 'According to the passage, why might heavy use of navigation apps weaken our mental maps?', choices: ['We spend more time studying maps before trips.', 'We get lost more often in unfamiliar places.', 'We use our phones mostly in emergencies.', 'We stop paying attention to landmarks and our direction.'], answer: 3, why: '第2段落に、曲がる時を機械が教えるので目印や距離、方角に注意しなくなるとある。地図を事前に見るのは第3段落の対策で、迷うことが増えるとは書かれていない。緊急時の便利さは別の話。' },
    ],
  },
  {
    id: 'toefl-limestone-caves',
    title: 'How Limestone Caves Form',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "Many of the world's largest caves are found in areas made of limestone, a type of rock formed mainly from the shells and skeletons of ancient sea creatures. Limestone may seem hard and permanent, but it can slowly be dissolved by water ( A ) contains a weak acid.",
      "Rainwater picks up carbon dioxide from the air and from the soil, forming a weak acid. As this water seeps into cracks in the limestone, it dissolves the rock little by little. Over hundreds of thousands of years, the cracks grow wider and eventually become passages and large chambers underground.",
      "Caves also contain striking formations. When water dripping from a cave's ceiling loses some of its carbon dioxide, the dissolved minerals are left behind as solid rock. Drop by drop, icicle-shaped stalactites grow downward from the ceiling, while stalagmites build up from the floor ( B ) the drops land. These formations grow extremely slowly, often only a few centimeters in a thousand years, so scientists can use them ( C ) the climates of the distant past.",
    ],
    ja: [
      '世界の大きな洞窟の多くは、石灰岩でできた地域にある。石灰岩は、おもに大昔の海の生き物の殻や骨からできた岩である。石灰岩はかたく、いつまでも変わらないように見えるかもしれないが、弱い酸をふくむ水によって少しずつとかされる。',
      '雨水は、空気や土から二酸化炭素をとりこみ、弱い酸になる。この水が石灰岩のわれ目にしみこむと、岩を少しずつとかしていく。何十万年もかけて、われ目は広がり、やがて地下の通路や大きな空間になる。',
      '洞窟には、目を見はるような形のものもある。天井からしたたる水が二酸化炭素の一部を失うと、とけていた鉱物が固い岩として残る。一滴ずつ、つららのような形の鍾乳石が天井から下へとのび、しずくが落ちる床からは石筍が積み上がっていく。これらはとてもゆっくり成長し、1000年でわずか数センチということも多いため、科学者はそれを使って遠い昔の気候を調べることができる。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'where', 'who'], answer: 0, why: '先行詞 water を説明し、あとに動詞 contains が続くので主格の関係代名詞 that。where はあとに完全な文、who は人。' },
      { id: 'B', choices: ['where', 'which', 'what', 'whose'], answer: 0, why: 'あとに the drops land という完全な文が続くので関係副詞 where「しずくが落ちる場所の」。which だと on などの前置詞が必要。' },
      { id: 'C', choices: ['to study', 'studying', 'studied', 'study'], answer: 0, why: 'use O to ～「～するために O を使う」。目的を表す to 不定詞。' },
    ],
    tf: [
      { statement: '石灰岩は、おもに大昔の海の生き物の殻や骨からできている。', answer: true, why: '第1段落 formed mainly from the shells and skeletons of ancient sea creatures。' },
      { statement: '雨水は、二酸化炭素をとりこんで弱い酸になる。', answer: true, why: '第2段落 Rainwater picks up carbon dioxide … forming a weak acid。' },
      { statement: '大きな洞窟は、数年でできる。', answer: false, why: '第2段落 Over hundreds of thousands of years。' },
      { statement: '鍾乳石は、床から上へとのびる。', answer: false, why: '第3段落 stalactites grow downward from the ceiling（床から積み上がるのは石筍）。' },
    ],
    qa: [
      { q: 'Why can scientists use cave formations to study past climates?', choices: ['They grow very slowly over long periods of time.', 'They are made of seashells.', 'They dissolve quickly in rain.', 'They are found only in cold places.'], answer: 0, why: '第3段落 These formations grow extremely slowly … so scientists can use them to study the climates of the distant past。' },
    ],
  },
  {
    id: 'toefl-abacus',
    title: 'Beads That Count',
    level: 'TOEFL・IELTS（歴史）',
    paragraphs: [
      "Long before electronic calculators, people needed reliable ways to handle large numbers for trade and taxes. One of the most successful tools for this purpose was the abacus, a frame holding rows of beads ( A ) can be slid back and forth to represent numbers.",
      "Versions of the abacus appeared in many ancient civilizations, including Rome and China. The Chinese suanpan became widely used in business, and in the sixteenth century a form of it was brought to Japan, where it developed into the soroban. Over time, Japanese makers simplified the design. The modern soroban has one bead above a bar and four below it in each column, ( B ) makes reading numbers quick.",
      "Even after calculators became cheap, the soroban did not disappear. Many Japanese children still attend soroban classes, and skilled users can calculate astonishingly fast. Some can even calculate without ( C ) a physical abacus at all, by moving imaginary beads in their minds. Researchers have studied this mental calculation as an example of how practice can change the way the brain handles numbers.",
    ],
    ja: [
      '電子式の計算機ができるずっと前から、人々は商売や税金のために大きな数をあつかう確かな方法を必要としていた。そのためにもっともよく使われた道具の一つがそろばんである。そろばんは、数を表すために前後に動かせる玉の列をおさめたわくである。',
      'そろばんのなかまは、ローマや中国など多くの古代文明にあらわれた。中国の算盤は商売で広く使われるようになり、16世紀にはその一つの形が日本に伝わって、そろばんへと発展した。時がたつにつれて、日本の職人は形を簡単にしていった。今のそろばんは、各けたに、はりの上に玉が1つ、下に4つあり、それによって数をすばやく読みとることができる。',
      '電卓が安くなったあとも、そろばんは消えなかった。今でも多くの日本の子どもがそろばん教室に通い、上手な人はおどろくほど速く計算できる。頭の中で想像の玉を動かして、本物のそろばんをまったく使わずに計算できる人もいる。研究者たちは、練習によって脳の数のあつかい方がどう変わりうるかの例として、この暗算を研究してきた。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'where', 'who'], answer: 0, why: '先行詞 rows of beads を説明し、あとに can be slid が続くので主格の関係代名詞 that。where はあとに完全な文、who は人。' },
      { id: 'B', choices: ['which', 'what', 'who', 'where'], answer: 0, why: 'コンマのあとで前の内容（玉が上に1つ・下に4つあること）を受ける関係代名詞 which。あとに動詞 makes が続く。' },
      { id: 'C', choices: ['using', 'use', 'used', 'to use'], answer: 0, why: '前置詞 without のあとは動名詞（～ing）。without using「～を使わずに」。' },
    ],
    tf: [
      { statement: 'そろばんのなかまは、日本でだけ使われてきた。', answer: false, why: '第2段落 Versions of the abacus appeared in many ancient civilizations, including Rome and China。' },
      { statement: 'そろばんのもとになる形は、16世紀に中国から日本に伝わった。', answer: true, why: '第2段落 in the sixteenth century a form of it was brought to Japan。' },
      { statement: '今のそろばんは、各けたの上に玉が1つ、下に4つある。', answer: true, why: '第2段落 one bead above a bar and four below it in each column。' },
      { statement: '電卓が安くなると、そろばんはすぐに使われなくなった。', answer: false, why: '第3段落 Even after calculators became cheap, the soroban did not disappear。' },
    ],
    qa: [
      { q: 'What have researchers studied about skilled soroban users?', choices: ['How the soroban design was simplified over time.', 'How training alters the way the brain deals with numbers.', 'Why the soroban disappeared after calculators became cheap.', 'How Chinese merchants brought the suanpan to Rome.'], answer: 1, why: '第3段落に、研究者は暗算を練習が脳の数の扱い方を変える例として研究したとある。そろばんは消えておらず逆。設計の簡略化は職人の話で研究対象ではなく、ローマへ伝えたという記述もない。' },
    ],
  },
  {
    id: 'adv-hedonic-adaptation',
    title: 'Why New Things Stop Making Us Happy',
    level: '難関大（評論）',
    paragraphs: [
      "When we buy a new phone or move into a bigger apartment, we often feel a rush of happiness. Within a few weeks or months, however, that feeling tends to fade, and the new object becomes simply part of everyday life. Psychologists call this process hedonic adaptation, ( A ) refers to our tendency to return to a fairly stable level of happiness after positive or negative changes.",
      "From an evolutionary point of view, adaptation makes sense. A mind that stayed excited about every improvement would have little reason to look for new opportunities, and a mind that stayed crushed by every loss would struggle to recover. Adaptation allows us to keep functioning ( B ) our circumstances change.",
      "Yet adaptation also explains why chasing more and more possessions rarely leads to lasting satisfaction. Some researchers suggest that spending money on experiences, such as trips or classes, may slow the process, because experiences are varied and become part of the stories we tell about ourselves. Another strategy is to pause regularly and notice what we already have. Doing so may keep familiar pleasures from ( C ) invisible.",
    ],
    ja: [
      '新しいスマートフォンを買ったり、もっと広い部屋に引っこしたりすると、私たちはしばしば幸せな気持ちがわき上がるのを感じる。しかし、数週間か数か月もすると、その気持ちはうすれていき、新しい物はただの日常の一部になる。心理学者はこの過程をヘドニック適応とよぶ。これは、よい変化や悪い変化のあとに、私たちがほぼ一定の幸福のレベルにもどっていく傾向のことである。',
      '進化の観点から見れば、適応には理にかなったところがある。あらゆる改善にずっと興奮しつづける心は、新しい機会をさがす理由をほとんどもたないだろうし、あらゆる喪失にずっと打ちひしがれる心は、立ち直るのに苦労するだろう。適応のおかげで、私たちは状況が変わっても、ふつうに生活しつづけることができるのである。',
      'しかし、適応は、物をどんどん追い求めても長続きする満足にはめったにつながらない理由も説明する。旅行や習いごとのような体験にお金を使うと、この過程がゆるやかになるかもしれないと考える研究者もいる。体験はさまざまで、私たちが自分について語る物語の一部になるからだ。もう一つの方法は、ときどき立ち止まって、すでにもっているものに目を向けることだ。そうすることで、なじみの楽しみが見えなくなるのを防げるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'that', 'it'], answer: 0, why: 'コンマのあとで hedonic adaptation を説明する関係代名詞 which。コンマのあとに that は使えず、what は先行詞をとらない。it では文が接続詞なしでつながってしまう。' },
      { id: 'B', choices: ['as', 'during', 'despite', 'because of'], answer: 0, why: 'あとに our circumstances change という文が続くので接続詞 as「～するにつれて・～するときに」。during・despite・because of は前置詞で、文は続かない。' },
      { id: 'C', choices: ['becoming', 'become', 'became', 'to become'], answer: 0, why: 'keep A from ～ing「A が～するのを防ぐ」。from は前置詞なので動名詞。' },
    ],
    tf: [
      { statement: '新しい物を買ったときの幸せな気持ちは、ふつう長く続く。', answer: false, why: '第1段落 that feeling tends to fade。' },
      { statement: 'ヘドニック適応は、よい変化のあとにも悪い変化のあとにも起こる。', answer: true, why: '第1段落 after positive or negative changes。' },
      { statement: '筆者は、適応には進化の上での意味があると説明している。', answer: true, why: '第2段落 From an evolutionary point of view, adaptation makes sense。' },
      { statement: '研究者は、体験よりも物にお金を使うことをすすめている。', answer: false, why: '第3段落 spending money on experiences … may slow the process。' },
    ],
    qa: [
      { q: 'According to some researchers, why might experiences slow adaptation?', choices: ['They cost more than phones or bigger apartments.', 'They vary and become part of our personal stories.', 'They help us return quickly to a stable happiness.', 'They make us stop noticing what we already have.'], answer: 1, why: '第3段落に、経験は変化に富み、自分について語る物語の一部になるので順応を遅らせるとある。安定した幸福にすぐ戻るのは順応そのもの、持っている物に気づかなくなるのは順応の結果で、値段の比較はない。' },
    ],
  },
  {
    id: 'toefl-little-ice-age',
    title: 'The Little Ice Age',
    level: 'TOEFL・IELTS（気象）',
    paragraphs: [
      "Between roughly the fourteenth and the nineteenth centuries, many parts of the Northern Hemisphere experienced a period of cooler temperatures now known as the Little Ice Age. It was not a true ice age, but average temperatures fell enough ( A ) noticeable effects on daily life.",
      "In Europe, glaciers in the Alps advanced and swallowed some farms and villages. Rivers that rarely freeze today, such as the Thames in London, froze over during several especially cold winters, and people held \"frost fairs\" on the ice. Shorter growing seasons led to poor harvests, ( B ) in turn caused food shortages in some regions.",
      "Scientists still debate what caused the cooling. Possible factors include a series of large volcanic eruptions, which threw ash and gases into the atmosphere and blocked some sunlight, as well as a period of reduced activity on the Sun. Many researchers believe that a combination of these factors, rather than a single cause, was responsible. Studying this period helps scientists understand how ( C ) the climate can be to natural changes.",
    ],
    ja: [
      'およそ14世紀から19世紀にかけて、北半球の多くの地域は、今では小氷期とよばれる気温の低い時代を経験した。それは本当の氷河期ではなかったが、平均気温は日々の生活にはっきりした影響が出るほど下がった。',
      'ヨーロッパでは、アルプスの氷河が前に進み、いくつかの農場や村をのみこんだ。ロンドンのテムズ川のように、今ではめったにこおらない川が、とくに寒いいくつかの冬に一面こおり、人々は氷の上で「フロスト・フェア（氷上の市）」を開いた。作物の育つ期間が短くなったことで不作になり、それがさらに一部の地域で食料不足を引き起こした。',
      'この寒冷化の原因については、科学者のあいだで今も議論が続いている。考えられる原因には、灰やガスを大気中にふき上げて日光の一部をさえぎった一連の大きな火山の噴火や、太陽の活動が弱まった時期がある。多くの研究者は、一つの原因ではなく、これらが組み合わさった結果だと考えている。この時代を研究することは、気候が自然の変化にどれほど敏感でありうるかを、科学者が理解する助けになる。',
    ],
    blanks: [
      { id: 'A', choices: ['to have', 'having', 'had', 'have'], answer: 0, why: '～ enough to …「…するほど～」。fell enough to have effects「影響が出るほど下がった」。' },
      { id: 'B', choices: ['which', 'what', 'who', 'where'], answer: 0, why: 'コンマのあとで前の内容（不作）を受ける関係代名詞 which。あとに動詞 caused が続く。where はあとに完全な文が必要。' },
      { id: 'C', choices: ['sensitive', 'sensitively', 'sensitivity', 'sense'], answer: 0, why: 'how ＋ 形容詞 ＋ S ＋ V「どれほど～か」。the climate can be のあとに来る補語なので形容詞 sensitive。' },
    ],
    tf: [
      { statement: '小氷期は本当の氷河期だった。', answer: false, why: '第1段落 It was not a true ice age。' },
      { statement: 'テムズ川がこおり、氷の上で市が開かれたことがある。', answer: true, why: '第2段落 the Thames … froze over … people held "frost fairs" on the ice。' },
      { statement: '小氷期の原因は、一つにはっきり決まっている。', answer: false, why: '第3段落 Scientists still debate what caused the cooling。' },
      { statement: '大きな火山の噴火が、日光の一部をさえぎった可能性がある。', answer: true, why: '第3段落 large volcanic eruptions … blocked some sunlight。' },
    ],
    qa: [
      { q: 'What did shorter growing seasons lead to?', choices: ['Poor harvests and food shortages in some regions.', 'More frost fairs on the rivers.', 'Larger glaciers in London.', 'Fewer volcanic eruptions.'], answer: 0, why: '第2段落 Shorter growing seasons led to poor harvests, which in turn caused food shortages。' },
    ],
  },
  {
    id: 'adv-biz-launch-invite',
    title: 'An Invitation to a Launch Event',
    level: '難関大（ビジネスメール）',
    paragraphs: [
      "Dear Ms. Park, I hope this message finds you well. I am pleased to invite you to the launch event for our new line of eco-friendly office furniture, ( A ) will be held at the Grand Hotel on Friday, November 20, from 3:00 to 5:00 p.m.",
      "During the event, our designers will explain how the products were developed using recycled materials. Guests will also be able to try the chairs and desks for themselves. Light refreshments will be served after the presentation.",
      "As space is limited, we would appreciate it if you could let us know whether you will be able to attend by November 10. If you would like to bring a colleague, please include his or her name in your reply so that we can ( B ) a name card in advance.",
      "We look forward to ( C ) you at the event. Best regards, Kenji Mori, Sales Manager, Green Office Co.",
    ],
    ja: [
      'パク様。いかがお過ごしでしょうか。このたび、環境にやさしいオフィス家具の新シリーズの発表会にご招待できることをうれしく思います。発表会は11月20日（金）午後3時から5時まで、グランドホテルで行われます。',
      '発表会では、製品がリサイクル素材を使ってどのように開発されたかを、当社のデザイナーがご説明します。また、ご来場のみなさまには、いすや机を実際にお試しいただけます。発表のあとには軽いお飲み物とお菓子をご用意しています。',
      '席にかぎりがございますので、ご出席いただけるかどうかを11月10日までにお知らせいただけるとありがたく存じます。同僚の方とごいっしょにお越しになる場合は、名札を前もってご用意できるよう、ご返信にその方のお名前をおそえください。',
      '発表会でお会いできるのを楽しみにしております。よろしくお願いいたします。グリーンオフィス社 営業部長 モリ・ケンジ',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'who', 'where'], answer: 0, why: 'コンマのあとで the launch event を説明し、あとに will be held が続くので関係代名詞 which。where はあとに完全な文が必要、who は人。' },
      { id: 'B', choices: ['prepare', 'preparing', 'prepared', 'to prepare'], answer: 0, why: 'so that ＋ 主語 ＋ can ＋ 動詞の原形「～が…できるように」。can のあとは原形。' },
      { id: 'C', choices: ['seeing', 'see', 'saw', 'seen'], answer: 0, why: 'look forward to ～ing「～を楽しみにする」。to は前置詞なので動名詞。' },
    ],
    tf: [
      { statement: '発表会は11月20日に開かれる。', answer: true, why: '第1段落 on Friday, November 20。' },
      { statement: '軽いお飲み物とお菓子は、発表の前に出される。', answer: false, why: '第2段落 after the presentation。' },
      { statement: '出席できるかどうかは、11月10日までに知らせる必要がある。', answer: true, why: '第3段落 let us know whether you will be able to attend by November 10。' },
      { statement: '発表会に同僚を連れてくることはできない。', answer: false, why: '第3段落 If you would like to bring a colleague, please include his or her name。' },
    ],
    qa: [
      { q: "Why does the writer ask guests to include a colleague's name?", choices: ['So that the company can prepare a name card in advance.', 'Because there is no limit on space.', 'So that the colleague can give a presentation.', 'Because the refreshments are only for colleagues.'], answer: 0, why: '第3段落 so that we can prepare a name card in advance。' },
    ],
  },
  {
    id: 'toefl-cane-toads',
    title: 'A Plan That Went Wrong',
    level: 'TOEFL・IELTS（環境）',
    paragraphs: [
      "An invasive species is a plant or animal ( A ) is brought into a new region and spreads quickly, often causing serious harm. Without the predators and diseases that controlled it in its original home, such a species can multiply rapidly and push out native species.",
      "One well-known example is the cane toad in Australia. In 1935, about one hundred toads were brought from Hawaii to eat beetles that were damaging sugar cane crops. The plan failed: the toads did not control the beetles, but they spread across a huge area of northern Australia. Today, their number is estimated ( B ) in the hundreds of millions.",
      "The toads also harm native animals. They carry a powerful poison in their skin, and predators such as snakes and lizards that try to eat them often die. Scientists are now testing ways to protect these predators, for example by teaching them to avoid toads. The cane toad's story shows ( C ) careful people must be before introducing a species to a new place.",
    ],
    ja: [
      '外来侵入種とは、新しい地域に持ちこまれて急速に広がり、しばしば深刻な害をもたらす植物や動物のことである。もとのすみかでその数をおさえていた天敵や病気がいないため、このような生き物は急にふえ、もともといた種を追いやってしまうことがある。',
      'よく知られた例が、オーストラリアのオオヒキガエルである。1935年、サトウキビの作物をあらしていた甲虫を食べさせるために、およそ100匹のヒキガエルがハワイから持ちこまれた。この計画は失敗した。ヒキガエルは甲虫をへらさず、オーストラリア北部の広い地域に広がってしまったのである。今では、その数は数億匹にのぼると見積もられている。',
      'オオヒキガエルは、もともといた動物にも害をあたえる。皮ふに強い毒をもっており、ヒキガエルを食べようとしたヘビやトカゲなどの捕食者は死んでしまうことが多い。科学者たちは今、ヒキガエルをさけるよう捕食者に教えるなど、捕食者を守る方法をためしている。オオヒキガエルの話は、新しい場所に生き物を持ちこむ前に、人がどれほど慎重でなければならないかを示している。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 a plant or animal を説明し、あとに動詞 is brought が続くので主格の関係代名詞 that。where はあとに完全な文、whose はあとに名詞が必要。' },
      { id: 'B', choices: ['to be', 'being', 'been', 'be'], answer: 0, why: 'be estimated to be ～「～だと見積もられている」。受け身のあとは to 不定詞。' },
      { id: 'C', choices: ['how', 'what', 'which', 'that'], answer: 0, why: 'how ＋ 形容詞 ＋ S ＋ V「どれほど～か」。how careful people must be。that では careful のあとの語順が成り立たない。' },
    ],
    tf: [
      { statement: '外来侵入種は、もとのすみかの天敵がいないため、急にふえることがある。', answer: true, why: '第1段落 Without the predators and diseases … can multiply rapidly。' },
      { statement: 'オオヒキガエルは、甲虫をへらすことに成功した。', answer: false, why: '第2段落 the toads did not control the beetles。' },
      { statement: 'オオヒキガエルは、今では数億匹いると見積もられている。', answer: true, why: '第2段落 in the hundreds of millions。' },
      { statement: 'オオヒキガエルを食べた動物は、たいてい無事である。', answer: false, why: '第3段落 predators … that try to eat them often die。' },
    ],
    qa: [
      { q: "What lesson does the cane toad's story teach?", choices: ['People must be careful before introducing a species to a new place.', 'Toads are the best way to control beetles.', 'Sugar cane cannot grow in Australia.', 'Snakes are an invasive species in Australia.'], answer: 0, why: "第3段落 The cane toad's story shows how careful people must be before introducing a species to a new place。" },
    ],
  },
  {
    id: 'adv-fast-fashion',
    title: 'The Real Price of Cheap Clothes',
    level: '難関大（評論）',
    paragraphs: [
      "Over the past few decades, clothing has become remarkably cheap. Many retailers now release new designs every few weeks, encouraging shoppers to buy more items and wear each one fewer times. This business model, often called fast fashion, ( A ) made trendy clothes available to almost everyone.",
      "The low prices, however, hide significant costs. Producing clothing requires large amounts of water and energy, and synthetic fabrics such as polyester are made from oil. Moreover, a large share of discarded garments ends up in landfills or is burned rather than recycled. Critics also point out that keeping prices low often depends on poorly paid workers ( B ) work long hours in difficult conditions.",
      "Some consumers are responding by buying second-hand clothes, repairing what they own, or choosing fewer, better-made items. Such choices cannot solve the problem on their own, since much depends on how companies design and produce their goods. Still, asking how long a piece of clothing is likely to be worn before buying it may be a simple first step toward ( C ) less waste.",
    ],
    ja: [
      'ここ数十年で、服はおどろくほど安くなった。多くの小売店は今や数週間ごとに新しいデザインを出し、買い物客により多くの服を買わせ、1着を着る回数をへらすようにうながしている。ファストファッションとよばれることの多いこの商売のやり方は、流行の服をほとんどだれもが手に入れられるものにした。',
      'しかし、その安さはかなりの代償をかくしている。服をつくるには大量の水とエネルギーが必要で、ポリエステルのような合成繊維は石油からつくられる。さらに、捨てられた服の大部分は、リサイクルされずに埋め立て地に行くか、燃やされてしまう。また、値段を低くおさえることは、むずかしい条件で長時間はたらく、賃金の安い労働者にたよっていることが多いと、批判する人たちは指摘している。',
      'これに対して、古着を買ったり、持っている服を直したり、数は少なくてもよくつくられた服を選んだりする消費者もいる。こうした選択だけで問題を解決することはできない。多くは、会社がどのように商品を設計し、つくるかにかかっているからだ。それでも、買う前にその服をどのくらい長く着そうかを考えることは、ごみをへらすための簡単な第一歩になるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['has', 'have', 'having', 'to have'], answer: 0, why: '主語 This business model（単数）の現在完了なので has made。having・to have では文の動詞にならない。' },
      { id: 'B', choices: ['who', 'which', 'whose', 'what'], answer: 0, why: '先行詞が人（workers）で、あとに動詞 work が続くので主格の who。' },
      { id: 'C', choices: ['producing', 'produce', 'produced', 'to produce'], answer: 0, why: 'toward は前置詞なので、あとは動名詞。toward producing less waste「ごみをへらすことへ向けて」。' },
    ],
    tf: [
      { statement: 'ファストファッションは、流行の服を多くの人が手に入れられるものにした。', answer: true, why: '第1段落 made trendy clothes available to almost everyone。' },
      { statement: '捨てられた服の大部分はリサイクルされている。', answer: false, why: '第2段落 ends up in landfills or is burned rather than recycled。' },
      { statement: 'ポリエステルは石油からつくられる。', answer: true, why: '第2段落 synthetic fabrics such as polyester are made from oil。' },
      { statement: '筆者は、消費者の選択だけで問題は解決できると述べている。', answer: false, why: '第3段落 Such choices cannot solve the problem on their own。' },
    ],
    qa: [
      { q: 'What does the author suggest as a simple first step?', choices: ['Asking how long a piece of clothing will be worn before buying it.', 'Buying new designs every few weeks.', 'Burning old clothes instead of throwing them away.', 'Choosing only clothes made of polyester.'], answer: 0, why: '第3段落 asking how long a piece of clothing is likely to be worn before buying it may be a simple first step。' },
    ],
  },
  {
    id: 'toefl-desalination',
    title: 'Fresh Water from the Sea',
    level: 'TOEFL・IELTS（環境）',
    paragraphs: [
      "Although about 70 percent of Earth's surface is covered by water, only a tiny fraction of it is fresh water that people can easily use. In dry regions such as the Middle East, many countries have turned to desalination, the process of removing salt from seawater to make it ( A ) for drinking and farming.",
      "The most common method today is reverse osmosis. In this process, seawater is pushed at high pressure through special membranes with extremely small holes. Water molecules can pass through the holes, but most of the salt cannot. Older plants instead heated seawater until it evaporated and then collected the steam, a method that uses even more energy.",
      "Desalination has drawbacks. It requires a great deal of energy, which can make the water expensive and increase carbon emissions if the power comes from fossil fuels. The process also produces brine, a very salty liquid ( B ) can harm marine life if it is released back into the sea carelessly. Researchers are therefore searching for ways ( C ) desalination cheaper and cleaner, for example by using solar power to run the plants.",
    ],
    ja: [
      '地球の表面のおよそ70パーセントは水におおわれているが、人がかんたんに使える淡水はそのごく一部にすぎない。中東のような乾いた地域では、多くの国が淡水化にたよるようになった。淡水化とは、海水から塩分をとりのぞいて、飲み水や農業に使えるようにすることである。',
      '今いちばん広く使われている方法は逆浸透である。この方法では、とても小さな穴のあいた特別な膜に、海水を高い圧力でおしつける。水の分子は穴を通りぬけられるが、塩分のほとんどは通りぬけられない。古い施設では、かわりに海水を熱して蒸発させ、その水蒸気を集めていたが、この方法はさらに多くのエネルギーを使う。',
      '淡水化には欠点もある。たくさんのエネルギーが必要なので、水が高くなることがあり、電気が化石燃料からつくられていれば二酸化炭素の排出もふえる。また、この過程ではブラインとよばれるとても塩からい液体が出る。これを不注意に海にもどすと、海の生き物に害をあたえることがある。そのため研究者たちは、たとえば太陽光の電気で施設を動かすなど、淡水化をもっと安く、きれいにする方法をさがしている。',
    ],
    blanks: [
      { id: 'A', choices: ['suitable', 'suitably', 'suitability', 'suit'], answer: 0, why: 'make O ＋ 形容詞「O を～にする」。補語には形容詞 suitable。副詞・名詞・動詞は補語にならない。' },
      { id: 'B', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 a very salty liquid を説明し、あとに動詞 can harm が続くので主格の関係代名詞 that。' },
      { id: 'C', choices: ['to make', 'making', 'made', 'make'], answer: 0, why: 'ways to ～「～する方法」。名詞を後ろから説明する to 不定詞。' },
    ],
    tf: [
      { statement: '地球の表面のおよそ70パーセントは水におおわれている。', answer: true, why: '第1段落 about 70 percent of Earth\'s surface is covered by water。' },
      { statement: '逆浸透では、塩分も水も膜を通りぬける。', answer: false, why: '第2段落 most of the salt cannot。' },
      { statement: '淡水化には多くのエネルギーが必要である。', answer: true, why: '第3段落 It requires a great deal of energy。' },
      { statement: 'ブラインは海の生き物に害をあたえることはない。', answer: false, why: '第3段落 can harm marine life。' },
    ],
    qa: [
      { q: 'Why can desalination increase carbon emissions?', choices: ['The brine it produces releases carbon into the sea.', 'Heating seawater releases carbon dioxide from the salt.', 'Its membranes are made from fossil fuels.', 'Its high energy use may rely on fossil fuels.'], answer: 3, why: '第3段落に、大量のエネルギーが必要で、電力が化石燃料由来なら排出が増えるとある。濃い塩水は海の生物への害の話で炭素とは無関係。塩から二酸化炭素が出る、膜が化石燃料製という記述はない。' },
    ],
  },
]
