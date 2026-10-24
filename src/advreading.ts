// 難関大（京大レベル）・TOEFL/IELTS レベル（と一部の高校入試レベル）の読解。本文・訳・設問・解説はすべて自作
import type { LongPassage } from './longreading'

export const ADV_PASSAGES: LongPassage[] = [
  {
    id: 'adv-boredom',
    title: 'The Value of Boredom',
    level: '難関大（評論）',
    paragraphs: [
      'We tend to regard boredom as an enemy to be defeated as quickly as possible. The moment we have nothing to do, we reach for our phones, ( A ) a few seconds of empty time were somehow dangerous. Yet psychologists have begun to suggest that this reflex may cost us more than we realize.',
      'Boredom, it turns out, is not simply the absence of stimulation. It is a signal that our current situation fails to engage us, and in that sense it pushes us to look for something more meaningful. When the mind is left without external input, it begins to wander, connecting memories and ideas that would otherwise remain ( B ). Many people report that their best ideas arrive not at their desks but in the shower or on a long walk.',
      'The problem is that constant connection leaves little room for this kind of wandering. If every gap in the day is filled with short videos and messages, the mind never has the chance to ( C ) its own resources. The point is not that we should seek out boredom for its own sake, but that we should stop treating every quiet moment as a problem to be solved.',
    ],
    ja: [
      '私たちは退屈を、できるだけ早く打ち負かすべき敵とみなしがちだ。することがなくなったとたん、まるで数秒の空いた時間が危険であるかのように、スマートフォンに手をのばす。しかし心理学者たちは、この反射的な行動が、私たちが思っている以上に大きな代償をともなうかもしれないと言い始めている。',
      '退屈とは、単に刺激がない状態ではないことがわかってきた。それは今の状況が自分を夢中にさせていないというサインであり、その意味で、もっと意味のあるものを探すよう私たちを後押しする。外からの情報がないと、心はさまよい始め、そうでなければ別々のままだったはずの記憶や考えを結びつける。最高のアイデアは机の前ではなく、シャワーの最中や長い散歩のときにやって来る、と言う人は多い。',
      '問題は、いつもつながっている状態では、こうしたさまよいの余地がほとんど残らないことだ。一日のすき間がすべて短い動画やメッセージでうめられていれば、心は自分自身の力を活用する機会を持てない。退屈そのものを目的として求めるべきだということではなく、静かなひとときをすべて解決すべき問題として扱うのをやめるべきだ、ということである。',
    ],
    blanks: [
      { id: 'A', choices: ['as if', 'even if', 'only if', 'unless'], answer: 0, why: 'as if ＋過去形（were）で「まるで〜であるかのように」。数秒の空き時間を危険なものであるかのように扱う、という意味。' },
      { id: 'B', choices: ['separate', 'famous', 'visible', 'useful'], answer: 0, why: 'connecting（結びつける）と対になるのは separate（別々の）。「そうでなければ別々のままだった記憶や考えを結びつける」。' },
      { id: 'C', choices: ['draw on', 'give up', 'run out of', 'look down on'], answer: 0, why: 'draw on 〜 は「〜を活用する・〜に頼る」。心が自分の力を使う機会がない、という文脈。' },
    ],
    tf: [
      { statement: '筆者は、暇な時間ができるとすぐスマートフォンを手に取る習慣には、思った以上の代償があるかもしれないと述べている。', answer: true, why: '第1段落 this reflex may cost us more than we realize。' },
      { statement: '退屈とは、単に刺激が欠けている状態にすぎない。', answer: false, why: '第2段落 Boredom ... is not simply the absence of stimulation と否定している。' },
      { statement: '筆者は、退屈そのものを目的として求めるべきだと主張している。', answer: false, why: '第3段落 The point is not that we should seek out boredom for its own sake と述べている。' },
    ],
    qa: [
      { q: 'According to the passage, what happens when the mind receives no external input?', choices: ['It begins to wander and link ideas together.', 'It immediately becomes tired.', 'It focuses only on the present task.', 'It forgets old memories.'], answer: 0, why: '第2段落 When the mind is left without external input, it begins to wander, connecting memories and ideas ...' },
    ],
  },
  {
    id: 'adv-translation',
    title: 'Lost in Translation?',
    level: '難関大（評論）',
    paragraphs: [
      'It is often said that something is always lost in translation. A joke that makes one audience laugh may leave another completely silent, not because the words are wrong but because the ( A ) behind them is missing. Language, in other words, does not float freely; it is rooted in the shared experience of the people who speak it.',
      "Consider the Japanese word 'mottainai'. It is usually translated as 'wasteful', but this misses an important part of its meaning. The word expresses a sense of regret that something valuable has not been used to its full potential, and it ( B ) a respect for objects that has deep roots in Japanese culture. A single English word cannot carry all of this at once.",
      'However, it would be a mistake to conclude that translation is therefore impossible. Good translators do not simply replace one word with another; they rebuild the meaning for a new audience, sometimes adding a short explanation, sometimes choosing a different image ( C ) the same effect. Seen this way, translation is less a loss than a creative act that allows ideas to travel across cultures.',
    ],
    ja: [
      '翻訳では何かが必ず失われる、とよく言われる。ある聞き手を笑わせる冗談が、別の聞き手をまったく黙らせてしまうことがあるが、それは言葉がまちがっているからではなく、その裏にある背景が欠けているからだ。つまり言語は自由にただよっているのではなく、それを話す人々が共有する経験に根ざしているのである。',
      '日本語の「もったいない」という言葉を考えてみよう。ふつうは wasteful（むだな）と訳されるが、それでは意味の大切な部分がぬけ落ちる。この言葉は、価値あるものが十分に生かされなかったことへの残念な気持ちを表し、日本の文化に深く根ざした、物を大切にする気持ちを反映している。英語の1語でそのすべてを一度に運ぶことはできない。',
      'しかし、だから翻訳は不可能だと結論づけるのはまちがいだろう。すぐれた翻訳者は、単に語を別の語に置きかえるのではない。新しい読み手のために意味を組み立て直し、ときには短い説明を加え、ときには同じ効果を生む別のイメージを選ぶ。このように見れば、翻訳は損失というより、考えが文化をこえて旅をすることを可能にする創造的な行為なのである。',
    ],
    blanks: [
      { id: 'A', choices: ['background', 'grammar', 'sound', 'spelling'], answer: 0, why: '「言葉がまちがっているのではなく、その裏にある background（背景・前提となる知識）が欠けている」。直後の rooted in the shared experience ともつながる。' },
      { id: 'B', choices: ['reflects', 'prevents', 'denies', 'replaces'], answer: 0, why: 'reflects 〜「〜を反映している・表している」。物を大切にする気持ちを表している、という意味。' },
      { id: 'C', choices: ['that produces', 'that prevents', 'which loses', 'who makes'], answer: 0, why: '「同じ効果を生む（produces）別のイメージを選ぶ」。image は人ではないので who は使えず、意味からも produces が合う。' },
    ],
    tf: [
      { statement: '筆者によれば、冗談が別の聞き手に通じないのは、訳した言葉がまちがっているからだ。', answer: false, why: '第1段落 not because the words are wrong but because the background behind them is missing。' },
      { statement: '「もったいない」は、英語の wasteful だけでは意味をすべて表せないと筆者は考えている。', answer: true, why: '第2段落 this misses an important part of its meaning / A single English word cannot carry all of this。' },
      { statement: '筆者は、翻訳は不可能だと結論づけている。', answer: false, why: '第3段落 it would be a mistake to conclude that translation is therefore impossible。' },
    ],
    qa: [
      { q: 'How does the author describe good translators?', choices: ['They rebuild the meaning for a new audience.', 'They translate every word exactly.', 'They avoid difficult words.', 'They never add explanations.'], answer: 0, why: '第3段落 they rebuild the meaning for a new audience。' },
    ],
  },
  {
    id: 'toefl-coral',
    title: 'Partners on the Reef',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      'Coral reefs cover less than one percent of the ocean floor, yet they support roughly a quarter of all known marine species. This remarkable diversity depends ( A ) a partnership between corals and tiny algae that live inside their tissues.',
      "The algae carry out photosynthesis, producing sugars that provide most of the coral's energy. In return, the coral offers the algae a protected home along with the carbon dioxide and nutrients they need. This exchange is so efficient that reefs can thrive in clear tropical waters, ( B ) are typically poor in nutrients.",
      'The relationship, however, is fragile. When water temperatures stay even slightly above normal for several weeks, the stressed corals expel the algae. Without them, the corals lose their color, a process known as bleaching. Bleached corals are not dead, but if the stress ( C ), they may starve. Scientists are therefore studying whether some corals can host more heat-tolerant algae, a possibility that could help reefs survive a warming ocean.',
    ],
    ja: [
      'サンゴ礁は海底の1パーセントにも満たない広さしかないが、知られている海の生物の種のおよそ4分の1を支えている。このおどろくべき多様性は、サンゴと、その組織の中にすむ小さな藻類との協力関係にかかっている。',
      '藻類は光合成を行い、サンゴのエネルギーの大部分となる糖をつくる。そのお返しに、サンゴは藻類に守られたすみかと、藻類が必要とする二酸化炭素や栄養分をあたえる。このやりとりはとても効率がよいので、サンゴ礁は、ふつうは栄養分の少ない、すんだ熱帯の海でもさかえることができる。',
      'しかし、この関係はこわれやすい。水温が数週間、ふだんよりわずかでも高いままだと、ストレスを受けたサンゴは藻類を追い出してしまう。藻類がいなくなるとサンゴは色を失う。これは白化とよばれる現象だ。白化したサンゴは死んでいるわけではないが、ストレスが続くと飢えてしまうことがある。そのため科学者たちは、一部のサンゴが暑さに強い藻類をすまわせられるかどうかを研究している。それが、温暖化する海でサンゴ礁が生きのびる助けになるかもしれないのだ。',
    ],
    blanks: [
      { id: 'A', choices: ['on', 'for', 'with', 'at'], answer: 0, why: 'depend on 〜「〜にかかっている・〜に頼る」。' },
      { id: 'B', choices: ['which', 'what', 'where', 'who'], answer: 0, why: 'コンマのあとの関係代名詞 which（非制限用法）。先行詞は waters（もの）で、後ろの are の主語がないので which。' },
      { id: 'C', choices: ['continues', 'disappears', 'decreases', 'begins'], answer: 0, why: 'if the stress continues「ストレスが続けば」飢えてしまう。but の前の「白化しても死んではいない」との対比。' },
    ],
    tf: [
      { statement: 'Coral reefs occupy a large part of the ocean floor.', answer: false, why: '第1段落 Coral reefs cover less than one percent of the ocean floor（海底の1％未満）。' },
      { statement: "The algae living inside corals supply most of the corals' energy.", answer: true, why: "第2段落 producing sugars that provide most of the coral's energy。" },
      { statement: 'Bleached corals are always already dead.', answer: false, why: '第3段落 Bleached corals are not dead。' },
    ],
    qa: [
      { q: 'Why are scientists interested in heat-tolerant algae?', choices: ['They might help reefs survive warmer oceans.', 'They make corals more colorful.', 'They produce more food for fish.', 'They stop ocean currents from changing.'], answer: 0, why: '第3段落 a possibility that could help reefs survive a warming ocean。' },
    ],
    vocab: [{ word: 'expel', choices: ['force out', 'take in', 'grow', 'protect'], answer: 0, why: 'expel は「追い出す」。直後に Without them（藻類がいなくなると）とあることからもわかる。' }],
  },
  {
    id: 'toefl-writing',
    title: 'The Origins of Writing',
    level: 'TOEFL・IELTS（歴史）',
    paragraphs: [
      "Writing is often regarded as one of humanity's greatest inventions, but it did not appear suddenly. In ancient Mesopotamia, the earliest written records were not poems or histories but simple accounts of goods such as grain and livestock. Officials needed a reliable way to keep track ( A ) what had been stored and traded.",
      'At first, these records used small pictures to represent objects. Over time, the symbols became simpler and more abstract, and scribes began to use some of them to stand for sounds ( B ) whole words. This shift was crucial, because it allowed writers to record names and ideas that were difficult to draw.',
      'Interestingly, writing seems to have developed independently in several places, including China and Mesoamerica. ( C ) the systems differed greatly in appearance, each arose in a society that had grown large and complex enough to need permanent records. This suggests that writing was less a stroke of individual genius than a response to practical social needs.',
    ],
    ja: [
      '文字はしばしば人類の最も偉大な発明の一つとみなされるが、とつぜん現れたわけではない。古代メソポタミアで最も古い文字の記録は、詩や歴史ではなく、穀物や家畜などの品物の簡単な記録だった。役人たちには、何が保管され取り引きされたかを把握しておく、たしかな方法が必要だったのである。',
      'はじめ、これらの記録は物を表すのに小さな絵を使っていた。時がたつにつれて記号はより簡単で抽象的になり、書記たちはその一部を、単語全体ではなく音を表すのに使い始めた。この変化は決定的だった。絵にしにくい名前や考えを書き記せるようになったからだ。',
      '興味深いことに、文字は中国やメソアメリカなど、いくつかの場所でそれぞれ別々に発達したようだ。それらの文字は見た目こそ大きくちがっていたが、どれも、永続的な記録が必要になるほど大きく複雑になった社会で生まれた。このことは、文字が一人の天才のひらめきというより、社会の実際的な必要にこたえたものであったことを示している。',
    ],
    blanks: [
      { id: 'A', choices: ['of', 'on', 'from', 'with'], answer: 0, why: 'keep track of 〜「〜を把握しておく・記録しておく」。' },
      { id: 'B', choices: ['rather than', 'because of', 'as well', 'such as'], answer: 0, why: 'A rather than B「BではなくA」。単語全体ではなく音を表すようになった、という意味。' },
      { id: 'C', choices: ['Although', 'Because', 'Unless', 'Until'], answer: 0, why: 'Although「〜だけれども」。「見た目は大きくちがっていたが、どれも〜」という逆接。' },
    ],
    tf: [
      { statement: 'The first written records in Mesopotamia were mainly poems.', answer: false, why: '第1段落 not poems or histories but simple accounts of goods。' },
      { statement: 'Using symbols for sounds made it easier to write down names.', answer: true, why: '第2段落 it allowed writers to record names and ideas that were difficult to draw。' },
      { statement: 'According to the passage, writing was invented only once and then spread around the world.', answer: false, why: '第3段落 writing seems to have developed independently in several places。' },
    ],
    qa: [
      { q: 'What is the main idea of the last paragraph?', choices: ['Writing developed in response to the needs of complex societies.', 'Chinese writing was copied from Mesopotamia.', 'Writing was created by a single genius.', 'Early writing systems all looked the same.'], answer: 0, why: '第3段落最後 writing was less a stroke of individual genius than a response to practical social needs。' },
    ],
  },
  {
    id: 'adv-science-doubt',
    title: 'Science and Changing Minds',
    level: '難関大（評論）',
    paragraphs: [
      'Many people expect science to provide final answers. When experts change their advice, the public often feels betrayed, as though the earlier claims had been lies. This reaction, though understandable, ( A ) a misunderstanding of how science actually works.',
      'Scientific knowledge is built by testing ideas against evidence, and new evidence can always appear. A good theory is therefore not one that can never be wrong, but one that makes clear predictions which could, in principle, be shown to be false. It is precisely this openness to revision ( B ) gives science its strength.',
      'None of this means that every claim is equally uncertain. Some conclusions rest on so much evidence that doubting them would be unreasonable, while others are still being tested. The challenge for both scientists and citizens is to tell these apart, and to treat a change of mind not as a failure ( C ) as a sign that the process is working.',
    ],
    ja: [
      '多くの人は、科学が最終的な答えをあたえてくれると期待している。専門家が助言を変えると、人々はまるで以前の主張がうそだったかのように、裏切られたと感じることが多い。この反応は理解できるものではあるが、科学が実際にどのように進むのかについての誤解を示している。',
      '科学の知識は、考えを証拠に照らして確かめることで築かれ、新しい証拠はいつでも現れうる。したがって、よい理論とは決してまちがうことのない理論ではなく、原理的にはまちがいだと示されうる、はっきりとした予測をする理論である。科学に力をあたえているのは、まさにこの修正に開かれた姿勢なのだ。',
      'だからといって、あらゆる主張が同じ程度に不確かだということではない。ある結論は非常に多くの証拠に支えられていて、それを疑うのは理にかなわないが、別の結論はまだ検証の途中である。科学者にとっても市民にとっても大切なのは、これらを見分けること、そして考えが変わることを失敗としてではなく、その過程がうまく働いているしるしとして受けとめることである。',
    ],
    blanks: [
      { id: 'A', choices: ['reveals', 'hides', 'solves', 'follows'], answer: 0, why: 'reveals 〜「〜を明らかにする・示す」。この反応は、科学についての誤解を示している。' },
      { id: 'B', choices: ['that', 'what', 'which it', 'where'], answer: 0, why: '強調構文 It is ... that 〜「〜なのは、まさに…だ」。this openness to revision を強調している。' },
      { id: 'C', choices: ['but', 'or', 'so', 'nor'], answer: 0, why: 'not A but B「AではなくB」。失敗としてではなく、うまく働いているしるしとして。' },
    ],
    tf: [
      { statement: '専門家が助言を変えると、人々はだまされたように感じることが多い、と筆者は述べている。', answer: true, why: '第1段落 the public often feels betrayed, as though the earlier claims had been lies。' },
      { statement: '筆者によれば、よい理論とは決してまちがうことのない理論である。', answer: false, why: '第2段落 A good theory is therefore not one that can never be wrong と否定している。' },
      { statement: '筆者は、すべての主張は同じ程度に不確かだと考えている。', answer: false, why: '第3段落 None of this means that every claim is equally uncertain。' },
    ],
    qa: [
      { q: 'What does the author say about changes of mind in science?', choices: ['They can show that the process is working.', 'They prove that scientists were lying.', 'They should be avoided at all costs.', 'They happen only with poor theories.'], answer: 0, why: '第3段落最後 a sign that the process is working。' },
    ],
  },
  {
    id: 'toefl-laughter',
    title: 'Why We Laugh',
    level: 'TOEFL・IELTS（心理）',
    paragraphs: [
      'Laughter is often thought of as a response to jokes, but studies of everyday conversation tell a different story. Researchers who recorded people talking found that most laughter followed ordinary comments ( A ) than anything particularly funny.',
      'This suggests that laughter is mainly a social signal. People are about thirty times more likely to laugh when they are with others than when they are alone. By laughing together, we show friendliness and agreement, ( B ) helps build trust within a group. In fact, friends often laugh at things that strangers would not find funny at all.',
      'Laughter also seems to be contagious. Hearing someone laugh activates areas of the brain that prepare us to laugh ( C ) well. This is why some comedy shows add recorded laughter. Far from being a simple reaction to humor, laughter may be one of the oldest tools humans have for connecting with one another.',
    ],
    ja: [
      '笑いは冗談への反応だと思われがちだが、ふだんの会話の研究からは、ちがう姿が見えてくる。人々の会話を録音した研究者たちは、笑いの多くが、特におもしろいことではなく、ありふれた発言のあとに起きていることを発見した。',
      'このことは、笑いが主に社会的な合図であることを示している。人は、ひとりでいるときより、ほかの人といっしょにいるときのほうが、およそ30倍笑いやすい。いっしょに笑うことで、私たちは親しみや同意を示し、そのことが集団の中の信頼を築く助けになる。実際、友だちどうしは、知らない人なら少しもおもしろいと思わないようなことでも、よく笑い合う。',
      '笑いはまた、うつるもののようだ。だれかの笑い声を聞くと、自分も笑う準備をする脳の部分が働く。だからお笑い番組の中には、録音した笑い声を加えるものがある。笑いはユーモアへの単なる反応どころか、人間がたがいにつながるための、最も古い道具の一つなのかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['rather', 'better', 'much', 'other'], answer: 0, why: 'A rather than B「BではなくA」。特におもしろいことではなく、ふつうの発言のあと。' },
      { id: 'B', choices: ['which', 'what', 'who', 'where'], answer: 0, why: 'コンマのあとの which は前の内容全体（いっしょに笑って親しみを示すこと）を指す。' },
      { id: 'C', choices: ['as', 'so', 'too', 'very'], answer: 0, why: 'as well「〜もまた」。自分も笑う準備をする。' },
    ],
    tf: [
      { statement: 'Most laughter in everyday conversation follows jokes.', answer: false, why: '第1段落 most laughter followed ordinary comments rather than anything particularly funny。' },
      { statement: 'People laugh more often when they are with others.', answer: true, why: '第2段落 about thirty times more likely to laugh when they are with others。' },
      { statement: 'Some comedy shows add recorded laughter because laughter is contagious.', answer: true, why: '第3段落 Laughter also seems to be contagious ... This is why some comedy shows add recorded laughter。' },
    ],
    qa: [
      { q: 'According to the passage, what is laughter mainly?', choices: ['A social signal.', 'A reaction to jokes only.', 'A sign of tiredness.', 'A way to show anger.'], answer: 0, why: '第2段落 laughter is mainly a social signal。' },
    ],
  },
  {
    id: 'adv-choice',
    title: 'Too Many Choices',
    level: '難関大（評論）',
    paragraphs: [
      'It seems obvious that having more options should make us happier. If a shop offers fifty kinds of jam ( A ) of five, surely every customer is more likely to find exactly what they want. Yet research on consumer behavior suggests that the relationship between choice and satisfaction is far from simple.',
      'When faced with too many alternatives, people often find it harder to decide at all, and those who do choose tend to feel less satisfied afterwards. One explanation is that each option we reject leaves behind a trace of regret: the more possibilities there were, the easier it is to imagine that ( B ) would have been better.',
      'This does not mean that choice is bad in itself. Rather, it suggests that freedom is most valuable when it is accompanied by some kind of structure. A carefully limited menu, a trusted recommendation, or simply a personal rule can ( C ) us from the burden of endless comparison, leaving more energy for enjoying what we have chosen.',
    ],
    ja: [
      '選択肢が多いほど幸せになれるのは、当たり前のように思える。店が5種類ではなく50種類のジャムを置いていれば、どの客も自分がほしいものをぴったり見つけやすくなるはずだ。しかし消費者行動の研究によれば、選択と満足の関係はまったく単純ではない。',
      '選択肢が多すぎると、人はそもそも決めること自体が難しくなることが多く、選んだ人もあとで満足しにくい傾向がある。一つの説明は、選ばなかった選択肢の一つ一つが後悔のあとを残すということだ。可能性が多ければ多いほど、ほかの何かのほうがよかっただろうと想像しやすくなるのである。',
      'これは、選択そのものが悪いということではない。むしろ、自由は何らかの枠組みがともなうときに最も価値がある、ということを示している。よく考えてしぼられたメニューや、信頼できるおすすめ、あるいは単に自分なりのルールがあれば、終わりのない比較という重荷から解放され、選んだものを楽しむための力をより多く残せる。',
    ],
    blanks: [
      { id: 'A', choices: ['instead', 'because', 'in spite', 'regardless'], answer: 0, why: 'instead of 〜「〜の代わりに」。5種類ではなく50種類。ほかの選択肢も of をとるが、意味が合わない。' },
      { id: 'B', choices: ['something else', 'nothing', 'everything', 'the same'], answer: 0, why: '「ほかの何か（something else）のほうがよかっただろう」と想像しやすくなる。後悔の話なので something else。' },
      { id: 'C', choices: ['free', 'fill', 'bring', 'make'], answer: 0, why: 'free A from B「AをBから解放する」。比較という重荷から解放する。' },
    ],
    tf: [
      { statement: '筆者は、選択肢が多いほど人は必ず満足すると考えている。', answer: false, why: '第1段落 the relationship between choice and satisfaction is far from simple。' },
      { statement: '選択肢が多すぎると、決めること自体が難しくなることがある。', answer: true, why: '第2段落 people often find it harder to decide at all。' },
      { statement: '筆者は、選択の自由そのものが悪いと主張している。', answer: false, why: '第3段落 This does not mean that choice is bad in itself。' },
    ],
    qa: [
      { q: 'According to the author, when is freedom of choice most valuable?', choices: ['When it comes with some kind of structure.', 'When there are unlimited options.', 'When nobody gives any advice.', 'When every option is compared carefully.'], answer: 0, why: '第3段落 freedom is most valuable when it is accompanied by some kind of structure。' },
    ],
  },
  {
    id: 'adv-language-thought',
    title: 'Does Language Shape Thought?',
    level: '難関大（評論）',
    paragraphs: [
      'Does the language we speak shape the way we think? The strong version of this idea, which claims that language ( A ) the limits of thought, has few supporters today. After all, people can clearly think about things for which they have no word, as anyone who has struggled to describe a new feeling knows.',
      'A weaker version, however, has found considerable support. Some languages, for example, describe locations using fixed directions such as north and south rather than left and right. Speakers of these languages tend to keep track of direction with remarkable accuracy, even indoors, ( B ) their language constantly requires them to know where north is.',
      'What such findings suggest is not that language imprisons thought, but that it trains attention. The habits our language demands of us, repeated thousands of times a day, gradually make certain distinctions feel natural. Learning a new language, then, may offer more than a new set of words; it may offer a slightly different way of ( C ) the world.',
    ],
    ja: [
      '私たちが話す言語は、ものの考え方を形づくるのだろうか。言語が思考の限界を決めるというこの考えの強い形は、今日ではほとんど支持されていない。なにしろ人は、言葉のないものについてもはっきり考えることができる。新しい気持ちを言い表そうと苦労したことのある人なら、だれでも知っていることだ。',
      'しかし、もっと弱い形の考えは、かなりの支持を得ている。たとえばある言語では、場所を右や左ではなく、北や南のような決まった方角で表す。こうした言語を話す人は、北がどちらかをいつも知っていることを言語が求めるので、屋内にいても、おどろくほど正確に方角を把握している傾向がある。',
      'こうした発見が示しているのは、言語が思考を閉じこめるということではなく、注意の向け方をきたえるということである。言語が求める習慣は一日に何千回もくり返され、ある区別を少しずつ自然なものに感じさせる。だとすれば、新しい言語を学ぶことは、新しい単語の組み合わせ以上のものをあたえてくれるかもしれない。それは、世界の気づき方を少しちがったものにしてくれるかもしれないのだ。',
    ],
    blanks: [
      { id: 'A', choices: ['sets', 'breaks', 'hides', 'follows'], answer: 0, why: 'set the limits of 〜「〜の限界を定める」。言語が思考の限界を決める、という強い考え方。' },
      { id: 'B', choices: ['because', 'although', 'unless', 'so that'], answer: 0, why: '理由を表す because。「北がどちらかを知っていることを言語がいつも求めるから」方角に正確になる。' },
      { id: 'C', choices: ['noticing', 'forgetting', 'leaving', 'buying'], answer: 0, why: '「世界に気づく（notice）方法」。注意の向け方をきたえる、という前の文とつながる。' },
    ],
    tf: [
      { statement: '言語が思考の限界を決めるという強い考え方は、今日では支持する人が少ない。', answer: true, why: '第1段落 has few supporters today。' },
      { statement: '北や南など決まった方角で場所を表す言語の話し手は、屋内に入ると方角がわからなくなる。', answer: false, why: '第2段落 even indoors（屋内でも）正確に方角を把握している。' },
      { statement: '筆者は、新しい言語を学ぶことには、単語を覚える以上の意味があるかもしれないと述べている。', answer: true, why: '第3段落 may offer more than a new set of words。' },
    ],
    qa: [
      { q: 'What do the findings suggest about language, according to the author?', choices: ['It trains what we pay attention to.', 'It completely controls our thoughts.', 'It has no effect on thinking.', 'It makes learning new words difficult.'], answer: 0, why: '第3段落 not that language imprisons thought, but that it trains attention。' },
    ],
  },
  {
    id: 'toefl-vertical-farm',
    title: 'Farms That Grow Upward',
    level: 'TOEFL・IELTS（農業）',
    paragraphs: [
      "As the world's population grows and more people move to cities, finding enough land to grow food is becoming a serious challenge. One possible solution is vertical farming, in which crops are grown indoors on shelves stacked ( A ) top of one another.",
      'Instead of sunlight, vertical farms use LED lights, and instead of soil, many use water containing nutrients. Because conditions are carefully controlled, crops can be grown all year round without pesticides. These farms can also use far less water than traditional fields, ( B ) the water is collected and reused.',
      'However, vertical farming has its own problems. The lights and climate controls require large amounts of electricity, which makes the food expensive to produce. At present, most vertical farms grow leafy greens and herbs rather than staple crops like rice or wheat. Whether they can play a ( C ) role in feeding the world may depend on the development of cheaper, cleaner energy.',
    ],
    ja: [
      '世界の人口がふえ、都市に移り住む人が多くなるにつれて、食べ物を育てるのに十分な土地を見つけることが大きな課題になっている。解決策の一つとして考えられているのが垂直農業だ。これは、屋内で、上へと積み重ねたたなで作物を育てる方法である。',
      '垂直農場では、日光のかわりにLEDの光を使い、土のかわりに栄養分をふくんだ水を使うところが多い。環境が注意深く管理されているので、農薬を使わずに一年じゅう作物を育てられる。また、水を集めて再利用するので、ふつうの畑よりずっと少ない水ですむ。',
      'しかし、垂直農業にも問題がある。照明や温度の管理には大量の電気が必要で、そのため食べ物をつくる費用が高くなる。今のところ、ほとんどの垂直農場が育てているのは、米や小麦のような主食の作物ではなく、葉物野菜やハーブだ。垂直農業が世界の食料をまかなううえで大きな役割を果たせるかどうかは、より安くてクリーンなエネルギーの開発しだいかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['on', 'in', 'at', 'over'], answer: 0, why: 'on top of 〜「〜の上に」。たなを上へ上へと積み重ねる。' },
      { id: 'B', choices: ['since', 'unless', 'although', 'until'], answer: 0, why: '理由の since「〜なので」。水を集めて再利用するから少なくてすむ。' },
      { id: 'C', choices: ['major', 'minor', 'late', 'single'], answer: 0, why: 'play a major role「大きな役割を果たす」。世界の食料をまかなえるかどうかの話なので major。' },
    ],
    tf: [
      { statement: 'Vertical farms grow crops indoors on stacked shelves.', answer: true, why: '第1段落 crops are grown indoors on shelves stacked on top of one another。' },
      { statement: 'Vertical farms usually need more water than traditional fields.', answer: false, why: '第2段落 use far less water than traditional fields。' },
      { statement: 'Most vertical farms today grow rice and wheat.', answer: false, why: '第3段落 most vertical farms grow leafy greens and herbs rather than staple crops like rice or wheat。' },
    ],
    qa: [
      { q: 'What is one problem with vertical farming?', choices: ['It uses a lot of electricity.', 'It needs many pesticides.', 'It can grow crops only in summer.', 'It uses too much land.'], answer: 0, why: '第3段落 The lights and climate controls require large amounts of electricity。' },
    ],
  },
  {
    id: 'toefl-fungi',
    title: 'The Hidden Network Under the Forest',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      'Beneath the floor of a forest lies a hidden network that connects many of the trees above. It is made of fungi, whose thin threads spread through the soil and attach ( A ) the roots of plants.',
      'This partnership benefits both sides. The fungi help trees absorb water and nutrients such as phosphorus from the soil, while the trees supply the fungi with sugars produced through photosynthesis. Some researchers believe that these networks can even move resources from one tree to ( B ), for example from a large tree in the sun to a young one in the shade.',
      'Not all scientists agree about how much trees actually share through these networks, and research is still ( C ). What is clear, however, is that a healthy forest depends not only on what we can see above the ground but also on the life hidden below it, in the dark soil beneath our feet.',
    ],
    ja: [
      '森の地面の下には、上に立つ多くの木をつなぐ、かくれたネットワークがある。それは菌類でできていて、その細い糸が土の中に広がり、植物の根にくっついている。',
      'この協力関係は、両方にとって得になる。菌類は木が土から水やリンなどの栄養分を吸収するのを助け、一方で木は光合成でつくった糖を菌類にあたえる。このネットワークは、たとえば日なたの大きな木から日かげの若い木へと、ある木から別の木へ養分を運ぶことさえできると考える研究者もいる。',
      '木がこのネットワークを通して実際にどれだけ分け合っているかについては、すべての科学者の意見が一致しているわけではなく、研究はまだ続いている。しかしはっきりしているのは、健康な森は、地上に見えるものだけでなく、その下、私たちの足もとの暗い土の中にかくれた命にも支えられているということだ。',
    ],
    blanks: [
      { id: 'A', choices: ['to', 'from', 'with', 'by'], answer: 0, why: 'attach to 〜「〜にくっつく」。' },
      { id: 'B', choices: ['another', 'other', 'others', 'the others'], answer: 0, why: 'from one 〜 to another「ある〜から別の〜へ」。' },
      { id: 'C', choices: ['continuing', 'finishing', 'stopping', 'forgetting'], answer: 0, why: '意見が一致していないので、研究はまだ「続いている（continuing）」。' },
    ],
    tf: [
      { statement: 'The fungal network connects many trees through the soil.', answer: true, why: '第1段落 a hidden network that connects many of the trees above。' },
      { statement: 'Trees give fungi water, and fungi give trees sugar.', answer: false, why: '第2段落 逆。菌類が水や栄養分の吸収を助け、木が糖をあたえる。' },
      { statement: 'All scientists agree that trees share large amounts of resources.', answer: false, why: '第3段落 Not all scientists agree about how much trees actually share。' },
    ],
    qa: [
      { q: 'What do trees provide to the fungi?', choices: ['Sugars made through photosynthesis.', 'Water from the soil.', 'Phosphorus from rocks.', 'Shade from the sun.'], answer: 0, why: '第2段落 the trees supply the fungi with sugars produced through photosynthesis。' },
    ],
  },
  {
    id: 'adv-kindness',
    title: 'Why Do We Help Strangers?',
    level: '難関大（評論）',
    paragraphs: [
      'Economists once assumed that people act mainly to benefit themselves. Yet everyday life is full of small kindnesses that bring no obvious reward: we give directions to lost tourists, return wallets we find on the street, and hold doors open for people we will never see again. Such behavior is difficult to explain ( A ) we assume that humans are purely selfish.',
      'One explanation is that helping others is, in the long run, good for the helper. In small communities where people meet repeatedly, a reputation for kindness can bring future benefits. Another is that cooperation has been so important to human survival that a desire to help may have become part of our nature. Studies show that even very young children, ( B ) have not yet learned many social rules, often help adults who drop things.',
      'Neither explanation, however, fully accounts for the satisfaction people feel when they help someone anonymously. Perhaps the most honest conclusion is that human motives are mixed. We are neither saints nor ( C ) calculators, and the interesting question is not whether we are selfish, but under what conditions our kinder impulses come to the surface.',
    ],
    ja: [
      'かつて経済学者たちは、人は主に自分の利益のために行動すると考えていた。しかし日々の生活は、はっきりした見返りのない小さな親切に満ちている。道に迷った旅行者に道を教え、道で拾った財布を届け、二度と会うことのない人のためにドアを押さえておく。人間が完全に利己的だと仮定すると、こうした行動は説明しにくい。',
      '一つの説明は、人を助けることは長い目で見れば助ける側のためになる、というものだ。人がくり返し顔を合わせる小さな共同体では、親切だという評判が将来の利益をもたらしうる。もう一つは、協力は人類が生きのびるうえでとても重要だったので、人を助けたいという気持ちが人間の性質の一部になったのかもしれない、という説明である。研究によれば、まだ社会のルールをあまり学んでいないとても小さな子どもでさえ、物を落とした大人をよく手助けする。',
      'しかし、どちらの説明も、名前を明かさずにだれかを助けたときに人が感じる満足感を十分には説明できない。最も正直な結論は、人間の動機は入りまじっているということかもしれない。私たちは聖人でもなければ冷たい計算機でもない。興味深い問いは、私たちが利己的かどうかではなく、どんな条件のもとでより親切な気持ちが表に出てくるのか、ということなのである。',
    ],
    blanks: [
      { id: 'A', choices: ['if', 'unless', 'until', 'since'], answer: 0, why: 'if「もし〜と仮定すれば」。人間が完全に利己的だと仮定すると説明しにくい。' },
      { id: 'B', choices: ['who', 'which', 'whose', 'whom'], answer: 0, why: 'コンマのあとの関係代名詞 who（非制限用法）。先行詞は children（人）で、後ろの have の主語がないので who。' },
      { id: 'C', choices: ['cold', 'warm', 'kind', 'honest'], answer: 0, why: 'saints（聖人）と対になる「冷たい計算機（損得だけで動く人）」。' },
    ],
    tf: [
      { statement: 'かつて経済学者は、人は主に自分の利益のために行動すると考えていた。', answer: true, why: '第1段落 Economists once assumed that people act mainly to benefit themselves。' },
      { statement: '筆者によれば、とても小さな子どもは、社会のルールを学ぶまで人を助けない。', answer: false, why: '第2段落 ルールをあまり学んでいない小さな子どもでも、物を落とした大人をよく助ける。' },
      { statement: '筆者は、人は完全に利己的だと結論づけている。', answer: false, why: '第3段落 human motives are mixed（動機は入りまじっている）。' },
    ],
    qa: [
      { q: 'What does the author think is the more interesting question?', choices: ['Under what conditions people act kindly.', 'Whether humans are completely selfish.', 'How economists predict prices.', 'Why children drop things.'], answer: 0, why: '第3段落最後 not whether we are selfish, but under what conditions our kinder impulses come to the surface。' },
    ],
  },
  {
    id: 'toefl-penicillin',
    title: 'A Lucky Accident',
    level: 'TOEFL・IELTS（科学史）',
    paragraphs: [
      'In 1928, the Scottish scientist Alexander Fleming returned from a vacation to find that one of his dishes of bacteria had been contaminated by mold. Around the mold, the bacteria had died. Instead of throwing the dish away, Fleming studied it carefully, ( A ) that the mold produced a substance that could kill bacteria.',
      'He named the substance penicillin, but he struggled to produce it in large amounts. For more than ten years, it attracted little attention. It was not until the early 1940s that a team of researchers at Oxford found a way to purify it ( B ) quantities large enough to treat patients.',
      'During the Second World War, penicillin saved the lives of many soldiers with infected wounds, and it soon became widely available. Today, however, doctors warn that bacteria can become resistant to antibiotics if these drugs are ( C ). Fleming himself gave a similar warning in 1945.',
    ],
    ja: [
      '1928年、スコットランドの科学者アレクサンダー・フレミングは、休暇からもどると、細菌を育てていた皿の一つにカビが生えているのを見つけた。カビのまわりでは、細菌が死んでいた。フレミングはその皿を捨てずに注意深く調べ、そのカビが細菌を殺す物質をつくっていることに気づいた。',
      '彼はその物質をペニシリンと名づけたが、たくさんつくることには苦労した。10年以上のあいだ、ペニシリンはほとんど注目されなかった。1940年代のはじめになってようやく、オックスフォードの研究チームが、患者の治療に使えるほどの量でそれを精製する方法を見つけた。',
      '第二次世界大戦中、ペニシリンは傷が化のうした多くの兵士の命を救い、まもなく広く使えるようになった。しかし今日、医師たちは、抗生物質を使いすぎると細菌がそれに強くなってしまうことがあると警告している。フレミング自身も、1945年に同じような警告をしていた。',
    ],
    blanks: [
      { id: 'A', choices: ['realizing', 'realized', 'to realize', 'realizes'], answer: 0, why: '分詞構文 realizing「（調べて）気づいた」。主語の Fleming が気づくので能動の -ing 形。' },
      { id: 'B', choices: ['in', 'on', 'at', 'by'], answer: 0, why: 'in 〜 quantities「〜の量で」。in large quantities のように量を表すときは in。' },
      { id: 'C', choices: ['overused', 'discovered', 'invented', 'produced'], answer: 0, why: 'overuse「使いすぎる」。使いすぎると細菌が抵抗力をもつ（耐性）。' },
    ],
    tf: [
      { statement: 'Fleming discovered penicillin while he was on vacation.', answer: false, why: '第1段落 returned from a vacation to find（休暇からもどって見つけた）。' },
      { statement: 'Penicillin was widely used soon after 1928.', answer: false, why: '第2段落 For more than ten years, it attracted little attention。' },
      { statement: 'Using antibiotics too much can make bacteria resistant.', answer: true, why: '第3段落 bacteria can become resistant to antibiotics if these drugs are overused。' },
    ],
    qa: [
      { q: 'What did the Oxford team achieve?', choices: ['They found a way to purify penicillin in large amounts.', 'They discovered the mold for the first time.', 'They ended the Second World War.', 'They proved antibiotics were useless.'], answer: 0, why: '第2段落 found a way to purify it in quantities large enough to treat patients。' },
    ],
  },
  {
    id: 'adv-multitasking',
    title: 'The Myth of Multitasking',
    level: '難関大（評論）',
    paragraphs: [
      'Many of us take pride in our ability to do several things at once, such as answering messages during a meeting or studying with the television on. ( A ), research suggests that what we call multitasking is usually something quite different. In most cases, the brain does not perform two demanding tasks at the same time; it switches rapidly between them.',
      'Each switch carries a small cost. The mind needs a moment to put one task aside and recall where it was in the other, and these moments add up. As a result, people who constantly switch between tasks often take longer to finish them and make more mistakes than those who work on one thing at a time. What feels like efficiency may in fact be a series of tiny ( B ).',
      'This is not to say that all combinations are harmful. Walking while talking, or listening to music while doing a familiar chore, causes little trouble, because at least one of the activities requires almost no conscious attention. The difficulty arises when two tasks ( C ) for the same limited resource, such as reading and listening to speech, which both depend on language.',
    ],
    ja: [
      '私たちの多くは、会議中にメッセージに返信したり、テレビをつけたまま勉強したりと、いくつものことを同時にこなせることを自慢に思っている。しかし研究によれば、私たちがマルチタスクとよんでいるものは、たいていまったくちがうものだという。ほとんどの場合、脳は2つの難しい作業を同時に行っているのではなく、その間をすばやく行き来しているのである。',
      '切りかえるたびに、小さな代償がともなう。心は一つの作業をわきに置き、もう一方の作業でどこまで進んでいたかを思い出すのに少し時間を必要とし、そうした時間が積み重なる。その結果、いつも作業を切りかえている人は、一度に一つのことに取り組む人より、終えるのに時間がかかり、まちがいも多くなりがちだ。効率的だと感じているものは、実は小さな中断の連続なのかもしれない。',
      'だからといって、あらゆる組み合わせが有害だというわけではない。話しながら歩いたり、慣れた家事をしながら音楽を聞いたりしても、ほとんど問題は起きない。少なくとも一方の活動が、意識的な注意をほとんど必要としないからだ。難しくなるのは、2つの作業が同じ限られた力をうばい合うときである。たとえば読むことと話を聞くことは、どちらも言語に頼っている。',
    ],
    blanks: [
      { id: 'A', choices: ['However', 'Therefore', 'Moreover', 'Similarly'], answer: 0, why: '逆接の However「しかし」。「同時にこなせると自慢している」→「しかし研究では実はちがう」。' },
      { id: 'B', choices: ['interruptions', 'rewards', 'victories', 'decisions'], answer: 0, why: '切りかえのたびに作業がとぎれることを指して「小さな中断（interruptions）の連続」。' },
      { id: 'C', choices: ['compete', 'wait', 'ask', 'pay'], answer: 0, why: 'compete for 〜「〜をうばい合う」。wait for・ask for・pay for も形は正しいが、意味が合わない。' },
    ],
    tf: [
      { statement: 'マルチタスクとは、多くの場合、脳が2つの難しい作業を同時に行っていることである。', answer: false, why: '第1段落 the brain does not perform two demanding tasks at the same time; it switches rapidly。' },
      { statement: '作業を切りかえるたびに、少しずつ時間のロスが生じる。', answer: true, why: '第2段落 Each switch carries a small cost ... these moments add up。' },
      { statement: '筆者は、どんな組み合わせの「ながら作業」も有害だと述べている。', answer: false, why: '第3段落 This is not to say that all combinations are harmful。' },
    ],
    qa: [
      { q: 'Why does walking while talking cause little trouble?', choices: ['One of the activities needs almost no conscious attention.', 'Both activities depend on language.', 'People walk more slowly when they talk.', 'The brain stops switching between tasks.'], answer: 0, why: '第3段落 because at least one of the activities requires almost no conscious attention。' },
    ],
  },
  {
    id: 'toefl-silk-road',
    title: 'The Silk Road',
    level: 'TOEFL・IELTS（歴史）',
    paragraphs: [
      'The Silk Road was not a single road but a vast network of trade routes that connected China with Central Asia, the Middle East, and Europe. Although it was named after the silk that traveled west from China, many other goods, ( A ) spices, paper, and precious metals, moved along these routes.',
      'Few merchants traveled the entire distance. Instead, goods usually passed from trader to trader, ( B ) in price each time they changed hands. A piece of silk that was relatively cheap in China could become extremely expensive by the time it reached Rome.',
      'Perhaps more important than the goods, however, were the ideas that traveled with them. Religions such as Buddhism spread along the routes, as did technologies like papermaking. In this sense, the Silk Road ( C ) not only an economic link but also a channel through which cultures influenced one another for centuries.',
    ],
    ja: [
      'シルクロードは1本の道ではなく、中国と中央アジア、中東、ヨーロッパを結ぶ、交易路の広大な網の目だった。中国から西へ運ばれた絹にちなんで名づけられたが、香辛料や紙、貴金属など、ほかにも多くの品物がこれらの道を行き来した。',
      '全行程を旅した商人はほとんどいなかった。そのかわり、品物はふつう商人から商人へと受けわたされ、人の手をわたるたびに値段が上がっていった。中国では比較的安かった絹の布も、ローマに着くころにはとても高価になることがあった。',
      'しかし、品物よりも大切だったのは、それといっしょに伝わった考えかもしれない。仏教のような宗教がこの道にそって広まり、紙づくりのような技術も同じように広まった。この意味で、シルクロードは経済的なつながりであるだけでなく、何世紀にもわたって文化がたがいに影響し合う通り道でもあったのである。',
    ],
    blanks: [
      { id: 'A', choices: ['such as', 'because of', 'instead of', 'in spite of'], answer: 0, why: 'such as 〜「〜のような（例を挙げる）」。many other goods の例として spices, paper, precious metals。' },
      { id: 'B', choices: ['rising', 'falling', 'to fall', 'risen'], answer: 0, why: '分詞構文 rising in price「値段が上がって」。次の文で、ローマでは高価になったと説明している。' },
      { id: 'C', choices: ['was', 'were', 'has', 'being'], answer: 0, why: '主語は the Silk Road（単数）で、過去の話なので was。not only A but also B「AだけでなくBも」。' },
    ],
    tf: [
      { statement: 'The Silk Road was one long road from China to Rome.', answer: false, why: '第1段落 not a single road but a vast network of trade routes。' },
      { statement: 'Most merchants carried their goods along the whole route themselves.', answer: false, why: '第2段落 Few merchants traveled the entire distance。' },
      { statement: 'Buddhism and papermaking spread along the Silk Road.', answer: true, why: '第3段落 Religions such as Buddhism spread ... as did technologies like papermaking。' },
    ],
    qa: [
      { q: 'Why did silk become expensive by the time it reached Rome?', choices: ['Its price rose each time it passed to a new trader.', 'It was damaged on the way.', 'Rome produced its own silk.', 'Merchants traveled very quickly.'], answer: 0, why: '第2段落 rising in price each time they changed hands。' },
    ],
  },
  {
    id: 'adv-repair',
    title: 'The Value of Repair',
    level: '難関大（評論）',
    paragraphs: [
      'For most of human history, repairing broken objects was simply common sense. Clothes were patched, shoes were resoled, and tools were sharpened ( A ) than thrown away. Today, however, many products are designed in ways that make repair difficult or even impossible.',
      'Some argue that this shift is simply the price of progress: modern devices are cheaper and more powerful than ever, so replacing them makes economic sense. Yet this argument ignores costs that do not appear on the price tag. Producing a new phone, for instance, requires mining metals and consuming energy, ( B ) a discarded one often ends up as hazardous waste.',
      "In response, a growing number of people are calling for a 'right to repair', which would require manufacturers to make spare parts and repair manuals available. Supporters see repair not as a step backward but as a way of ( C ) a more thoughtful relationship with the things we own, one in which an object's value is measured not only by its newness but by the care invested in it.",
    ],
    ja: [
      '人類の歴史の大半において、こわれた物を修理するのは、ただの常識だった。服はつぎを当てられ、くつは底を張りかえられ、道具は捨てられるのではなく研がれた。しかし今日では、多くの製品が、修理を難しくしたり、不可能にさえしたりするように作られている。',
      'この変化は単なる進歩の代償だと言う人もいる。最新の機器はかつてないほど安く高性能なので、買いかえるほうが経済的に理にかなっている、というわけだ。しかしこの主張は、値札には表れない費用を無視している。たとえば新しい電話を作るには金属を採掘しエネルギーを使う必要があり、一方で捨てられた電話は有害な廃棄物になることが多い。',
      'これに対して、「修理する権利」を求める人がふえている。これは、製造業者に交換部品や修理マニュアルを手に入れられるようにすることを義務づけるものだ。支持する人々は、修理を後退ではなく、自分の持ち物とのより思慮深い関係を築く方法だと考えている。そこでは物の価値が、新しさだけでなく、そこにそそがれた手間によってもはかられるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['rather', 'better', 'more', 'sooner'], answer: 0, why: 'A rather than B「BではなくA」。捨てられるのではなく研がれた。' },
      { id: 'B', choices: ['while', 'unless', 'until', 'so'], answer: 0, why: '対比の while「一方で」。作るときの費用と、捨てたあとの問題を並べている。' },
      { id: 'C', choices: ['building', 'losing', 'avoiding', 'ending'], answer: 0, why: 'build a relationship「関係を築く」。修理は物とのよりよい関係を築く方法。' },
    ],
    tf: [
      { statement: '人類の歴史の大半において、こわれた物を修理するのは当たり前のことだった。', answer: true, why: '第1段落 repairing broken objects was simply common sense。' },
      { statement: '筆者は、新しい製品に買いかえる費用は値札にすべて表れていると考えている。', answer: false, why: '第2段落 this argument ignores costs that do not appear on the price tag。' },
      { statement: '「修理する権利」を支持する人は、修理を時代に逆行するものだと考えている。', answer: false, why: '第3段落 Supporters see repair not as a step backward。' },
    ],
    qa: [
      { q: 'What would a "right to repair" require manufacturers to do?', choices: ['Make spare parts and repair manuals available.', 'Stop producing new phones.', 'Lower the price of all devices.', 'Collect all hazardous waste.'], answer: 0, why: '第3段落 which would require manufacturers to make spare parts and repair manuals available。' },
    ],
  },
  {
    id: 'toefl-ice-cores',
    title: 'Messages in the Ice',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "Deep beneath the surface of Antarctica lies a record of Earth's past climate. As snow falls year after year, it is gradually compressed into ice, trapping tiny bubbles of air. By drilling long cylinders of ice, known as ice cores, scientists can examine air that is hundreds of thousands of years ( A ).",
      'These air bubbles reveal how much carbon dioxide the atmosphere contained at different times. In addition, the chemical composition of the ice itself provides clues about past temperatures. ( B ) together, these two kinds of evidence show that carbon dioxide levels and temperatures have risen and fallen together over many cycles of ice ages and warmer periods.',
      'The longest continuous ice-core records studied in detail so far cover roughly 800,000 years. Throughout that entire period, carbon dioxide levels never ( C ) the levels measured in the air today. This comparison is one of the reasons many scientists regard current changes in the atmosphere as unusual.',
    ],
    ja: [
      '南極の地表の深くには、地球の過去の気候の記録がねむっている。毎年雪がふり積もると、それは少しずつ押し固められて氷になり、小さな空気のあわを閉じこめる。氷床コアとよばれる長い円柱形の氷をほり出すことで、科学者たちは何十万年も前の空気を調べることができる。',
      'これらの空気のあわは、さまざまな時代に大気がどれだけの二酸化炭素をふくんでいたかを明らかにする。さらに、氷そのものの化学的な成分は、過去の気温の手がかりをあたえてくれる。この2種類の証拠を合わせて考えると、二酸化炭素の量と気温は、氷河期と温暖な時期の何度ものくり返しの中で、いっしょに上がったり下がったりしてきたことがわかる。',
      'これまでに集められた最も長い氷床コアは、およそ80万年分にわたる。その期間全体を通して、二酸化炭素の量が、今日の空気で測られる量に達したことは一度もなかった。この比較が、多くの科学者が現在の大気の変化をふつうではないと考える理由の一つである。',
    ],
    blanks: [
      { id: 'A', choices: ['old', 'older', 'oldest', 'age'], answer: 0, why: '〜 years old「〜年前の・〜年たった」。hundreds of thousands of years old で「何十万年も前の」。' },
      { id: 'B', choices: ['Taken', 'Taking', 'To take', 'Take'], answer: 0, why: 'Taken together「合わせて考えると」。証拠は「考えられる」側なので、過去分詞の分詞構文。' },
      { id: 'C', choices: ['reached', 'lowered', 'missed', 'avoided'], answer: 0, why: 'reach「〜に達する」。80万年のあいだ、今日の量に達したことは一度もなかった。' },
    ],
    tf: [
      { statement: 'Ice cores contain small bubbles of ancient air.', answer: true, why: '第1段落 trapping tiny bubbles of air。' },
      { statement: 'According to the passage, carbon dioxide levels and temperatures have usually changed in opposite directions.', answer: false, why: '第2段落 have risen and fallen together（いっしょに上がり下がりした）。' },
      { statement: 'Carbon dioxide levels in the past 800,000 years were often higher than they are today.', answer: false, why: '第3段落 never reached the levels measured in the air today。' },
    ],
    qa: [
      { q: 'How do scientists learn about past temperatures from ice cores?', choices: ['By studying the chemical composition of the ice.', 'By counting the bubbles in the ice.', 'By measuring how deep the snow is today.', 'By observing animals living in the ice.'], answer: 0, why: '第2段落 the chemical composition of the ice itself provides clues about past temperatures。' },
    ],
  },
  {
    id: 'adv-mistakes',
    title: 'Learning from Mistakes',
    level: '難関大（評論）',
    paragraphs: [
      'In many schools, mistakes are treated as something to be avoided at all costs. Students who answer incorrectly may feel embarrassed, and over time some stop raising their hands ( A ). Yet a growing body of research suggests that making errors can be one of the most effective ways to learn.',
      'When we try to answer a question before being taught and get it wrong, the correct answer tends to stick more firmly once we hear it. Researchers believe that the effort of searching our memory prepares the mind to ( B ) new information. In other words, the mistake is not wasted; it opens a space that the right answer can fill.',
      'Of course, not every mistake is equally useful. Errors help most when learners receive feedback quickly and have a chance to think about why they went wrong. A classroom that ( C ) mistakes as part of learning, rather than as a sign of failure, may therefore produce students who are not only more knowledgeable but also more willing to take on difficult problems.',
    ],
    ja: [
      '多くの学校では、まちがいはなんとしても避けるべきものとして扱われている。まちがえた生徒ははずかしく感じることがあり、やがてすっかり手を挙げなくなる生徒もいる。しかし、まちがえることは最も効果的な学び方の一つになりうる、という研究がふえてきている。',
      '教わる前に問題に答えようとしてまちがえると、正しい答えを聞いたときに、それがよりしっかりと記憶に残る傾向がある。研究者たちは、記憶をさがす努力が、新しい情報を吸収する準備を心にさせるのだと考えている。つまり、まちがいはむだではない。それは正しい答えが入ることのできる場所をあけるのだ。',
      'もちろん、すべてのまちがいが同じように役に立つわけではない。まちがいが最も役に立つのは、学ぶ人がすぐにフィードバックを受け、なぜまちがえたのかを考える機会があるときだ。したがって、まちがいを失敗のしるしではなく学びの一部として扱う教室は、知識が多いだけでなく、難しい問題にもすすんで取り組む生徒を育てるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['altogether', 'together', 'already', 'instead'], answer: 0, why: 'altogether「すっかり・まったく」。手を挙げるのをすっかりやめてしまう。together は「いっしょに」で意味が合わない。' },
      { id: 'B', choices: ['absorb', 'ignore', 'forget', 'refuse'], answer: 0, why: 'absorb「吸収する」。記憶をさがす努力が、新しい情報を受け入れる準備になる。' },
      { id: 'C', choices: ['treats', 'avoids', 'hides', 'punishes'], answer: 0, why: 'treat A as B「AをBとして扱う」。まちがいを学びの一部として扱う教室。' },
    ],
    tf: [
      { statement: '多くの学校では、まちがいは避けるべきものとして扱われている。', answer: true, why: '第1段落 mistakes are treated as something to be avoided at all costs。' },
      { statement: '筆者によれば、教わる前に答えようとしてまちがえると、正しい答えが覚えにくくなる。', answer: false, why: '第2段落 the correct answer tends to stick more firmly（よりしっかり残る）。' },
      { statement: 'まちがいは、すぐにフィードバックを受けて理由を考えるときに最も役に立つ。', answer: true, why: '第3段落 Errors help most when learners receive feedback quickly and have a chance to think about why they went wrong。' },
    ],
    qa: [
      { q: 'According to the passage, what does the effort of searching our memory do?', choices: ['It prepares the mind to take in new information.', 'It makes students feel embarrassed.', 'It replaces the need for feedback.', 'It causes students to stop raising their hands.'], answer: 0, why: '第2段落 the effort of searching our memory prepares the mind to absorb new information。' },
    ],
  },
  {
    id: 'toefl-migration',
    title: 'How Birds Find Their Way',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      'Every year, billions of birds travel thousands of kilometers between their breeding grounds and the places where they spend the winter. Some species fly ( A ) the night, resting and feeding during the day.',
      "How do they find their way? Scientists have discovered that birds use several sources of information. Many species can sense the Earth's magnetic field, which works like an internal compass. Others rely on the position of the sun during the day and on patterns of stars at night. ( B ), birds also seem to recognize landmarks such as coastlines and mountain ranges.",
      'Migration is extremely demanding. Before departure, some small birds nearly double their body weight by storing fat, which serves as fuel for the journey. Because of these long trips, the loss of habitat at even a single stopover site can ( C ) the survival of an entire population. For this reason, conservation groups are working with many countries to protect important resting places along migration routes.',
    ],
    ja: [
      '毎年、何十億羽もの鳥が、ひなを育てる場所と冬をすごす場所のあいだを何千キロメートルも移動する。一晩じゅう飛び続け、昼間に休んでえさを食べる種もいる。',
      '鳥たちはどうやって道を見つけるのだろうか。科学者たちは、鳥がいくつかの情報源を使っていることを発見した。多くの種は地球の磁場を感じとることができ、それが体の中の方位磁石のように働く。昼は太陽の位置を、夜は星の並びを頼りにする種もいる。さらに、鳥は海岸線や山脈などの目印も見分けているようだ。',
      'わたりはとても体に負担がかかる。出発の前に、脂肪をたくわえて体重をほぼ2倍にする小鳥もいる。脂肪は旅の燃料になるのだ。こうした長い旅をするため、たった一つの中継地のすみかが失われるだけでも、群れ全体の生存がおびやかされることがある。そのため自然保護団体は、多くの国と協力して、わたりの道すじにある大切な休み場所を守ろうとしている。',
    ],
    blanks: [
      { id: 'A', choices: ['through', 'across', 'along', 'over'], answer: 0, why: 'through the night「一晩じゅう」。夜のあいだずっと飛ぶ。' },
      { id: 'B', choices: ['In addition', 'However', 'Instead', 'Otherwise'], answer: 0, why: 'In addition「さらに」。磁場・太陽・星に加えて、目印も使うと情報を付け加えている。' },
      { id: 'C', choices: ['threaten', 'support', 'improve', 'follow'], answer: 0, why: 'threaten「おびやかす」。中継地のすみかを失うことは、生存をおびやかす。' },
    ],
    tf: [
      { statement: 'Some birds fly at night and rest during the day.', answer: true, why: '第1段落 Some species fly through the night, resting and feeding during the day。' },
      { statement: 'Birds use only the sun to find their way.', answer: false, why: '第2段落 磁場・太陽・星・目印など、いくつもの情報を使う。' },
      { statement: 'Losing a single stopover site has no effect on migrating birds.', answer: false, why: '第3段落 can threaten the survival of an entire population。' },
    ],
    qa: [
      { q: 'Why do some small birds gain weight before migration?', choices: ['The fat provides fuel for the long journey.', 'It helps them sense the magnetic field.', 'It keeps them warm only in winter.', 'It makes them fly faster at night.'], answer: 0, why: '第3段落 storing fat, which serves as fuel for the journey。' },
    ],
  },
  {
    id: 'adv-stories',
    title: 'Why We Tell Stories',
    level: '難関大（評論）',
    paragraphs: [
      'Every known human culture tells stories. Long before writing existed, people gathered around fires to share tales of heroes, ( A ) creatures, and distant journeys. This universality suggests that storytelling is not merely entertainment but something deeply connected to how our minds work.',
      'One reason may be that stories help us understand other people. When we follow a character through difficulties, we imagine their thoughts and feelings, practicing a kind of empathy that is useful in real life. Stories also make information easier to remember, ( B ) facts presented as a simple list are often quickly forgotten.',
      'In the digital age, stories have not disappeared; they have simply taken new forms, from video games to short online videos. What remains constant is our desire to ( C ) meaning in events by arranging them into a beginning, a middle, and an end. Perhaps that is why a good story can still hold our attention in a world full of distractions.',
    ],
    ja: [
      '知られているすべての人間の文化は物語を語る。文字が生まれるずっと前から、人々は火のまわりに集まり、英雄や不思議な生き物、遠くへの旅の話を分かち合ってきた。この普遍性は、物語を語ることが単なる娯楽ではなく、私たちの心の働き方と深く結びついたものであることを示している。',
      '一つの理由は、物語が他人を理解する助けになるからかもしれない。困難を乗りこえていく登場人物を追いかけるとき、私たちはその人の考えや気持ちを想像し、現実の生活でも役に立つ一種の共感を練習しているのだ。また、物語は情報を覚えやすくする。それに対して、ただの箇条書きで示された事実は、すぐに忘れられてしまうことが多い。',
      'デジタル時代になっても、物語は消えてはいない。テレビゲームから短いネット動画まで、ただ新しい形をとっただけである。変わらないのは、できごとを始まり・中ほど・終わりに並べることで、そこに意味を見いだしたいという私たちの欲求だ。だからこそ、気を散らすものであふれた世界でも、よい物語は今なお私たちの注意をひきつけるのかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['strange', 'strangely', 'strangeness', 'stranger to'], answer: 0, why: '名詞 creatures を説明するので形容詞 strange「不思議な」。heroes, strange creatures, distant journeys と並んでいる。' },
      { id: 'B', choices: ['whereas', 'because', 'unless', 'so that'], answer: 0, why: '対比の whereas「〜なのに対して」。物語は覚えやすいが、箇条書きの事実は忘れやすい。' },
      { id: 'C', choices: ['find', 'lose', 'hide', 'spend'], answer: 0, why: 'find meaning in 〜「〜に意味を見いだす」。' },
    ],
    tf: [
      { statement: '文字ができるずっと前から、人々は物語を語り合っていた。', answer: true, why: '第1段落 Long before writing existed, people gathered around fires to share tales。' },
      { statement: '筆者は、物語は単なる娯楽にすぎないと考えている。', answer: false, why: '第1段落 not merely entertainment but something deeply connected to how our minds work。' },
      { statement: 'デジタル時代になって、物語はなくなってしまった。', answer: false, why: '第3段落 stories have not disappeared; they have simply taken new forms。' },
    ],
    qa: [
      { q: 'According to the passage, how do stories help us understand other people?', choices: ['We imagine the thoughts and feelings of characters.', 'We memorize long lists of facts.', 'We learn how to write well.', 'We avoid difficult situations.'], answer: 0, why: '第2段落 we imagine their thoughts and feelings, practicing a kind of empathy。' },
    ],
  },
  {
    id: 'toefl-glaciers',
    title: 'Rivers of Ice',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      'Glaciers are huge bodies of ice that form in places where more snow falls in winter than melts in summer. Over many years, the snow is pressed into thick ice, which becomes so heavy that it begins to move slowly downhill ( A ) its own weight.',
      'As a glacier moves, it acts like a giant piece of sandpaper. Rocks frozen into the bottom of the ice scrape the ground, carving deep valleys with a U-shaped cross-section. Many famous landscapes, such as the fjords of Norway, were shaped ( B ) this way during past ice ages.',
      'Today, most glaciers around the world are shrinking. This matters because glaciers store fresh water. In many mountain regions, people depend on meltwater from glaciers for drinking water and farming during dry seasons. If the glaciers ( C ), these communities may face serious water shortages in the future. Scientists are therefore watching glaciers closely from space.',
    ],
    ja: [
      '氷河は、冬にふる雪の量が夏にとける量より多い場所でできる、巨大な氷のかたまりである。長い年月のあいだに雪は押し固められて厚い氷になり、それがとても重くなるので、自らの重みでゆっくりと坂を下りはじめる。',
      '氷河は動きながら、巨大な紙やすりのような働きをする。氷の底にこおりついた岩が地面をけずり、断面がU字形の深い谷をきざむ。ノルウェーのフィヨルドのような有名な景色の多くは、過去の氷河期にこのようにして形づくられた。',
      '今日、世界中のほとんどの氷河は小さくなっている。氷河は淡水をたくわえているので、これは重大なことだ。多くの山岳地域では、人々はかわいた季節に、飲み水や農業のために氷河のとけ水に頼っている。もし氷河が消えてしまえば、こうした地域は将来、深刻な水不足に直面するかもしれない。そのため科学者たちは、宇宙から氷河を注意深く見守っている。',
    ],
    blanks: [
      { id: 'A', choices: ['under', 'over', 'beside', 'against'], answer: 0, why: 'under its own weight「自らの重みで」。重さの力を受けて動く。' },
      { id: 'B', choices: ['in', 'by', 'at', 'for'], answer: 0, why: 'in this way「このようにして」。' },
      { id: 'C', choices: ['disappear', 'grow', 'freeze', 'return'], answer: 0, why: '氷河が小さくなっている話の流れなので「消える（disappear）」と水不足になる。' },
    ],
    tf: [
      { statement: 'Glaciers form where more snow melts in summer than falls in winter.', answer: false, why: '第1段落 more snow falls in winter than melts in summer（冬にふる量のほうが多い）。' },
      { statement: 'U-shaped valleys can be created by moving glaciers.', answer: true, why: '第2段落 carving deep valleys with a U-shaped cross-section。' },
      { statement: 'Some people rely on glacier meltwater for farming.', answer: true, why: '第3段落 people depend on meltwater from glaciers for drinking water and farming。' },
    ],
    qa: [
      { q: 'Why does the shrinking of glaciers matter?', choices: ['Glaciers store fresh water that people need.', 'Glaciers make the air warmer.', 'Glaciers create new mountains.', 'Glaciers stop rain from falling.'], answer: 0, why: '第3段落 This matters because glaciers store fresh water。' },
    ],
  },
  {
    id: 'exam-radio',
    title: 'Our Lunchtime Radio Show',
    level: '高校入試（体験文）',
    paragraphs: [
      'At my school, the broadcasting club makes a short radio show every Wednesday at lunchtime. Last spring, I joined the club because I wanted to get better ( A ) speaking in front of people. Our shows include school news, song requests, and interviews with teachers.',
      'My first show was a disaster. I spoke too fast, and I forgot to turn on the microphone for the first minute. Some students in the cafeteria laughed. After that, I practiced reading the script aloud every day and asked an older member ( B ) give me advice. She told me to imagine that I was talking to just one friend.',
      "Two months later, I introduced a song that a classmate had requested. After the show, a first-year student came up to me and said, 'Your voice helped me feel less lonely at lunch.' I was so happy. Now I know that what we say can reach people we have never ( C ).",
    ],
    ja: [
      '私の学校では、放送部が毎週水曜日の昼休みに短いラジオ番組をつくっています。去年の春、私は人前で話すのが上手になりたくて、放送部に入りました。番組では、学校のニュースやリクエスト曲、先生へのインタビューを放送しています。',
      '私の最初の放送はさんざんでした。早口で話しすぎたうえ、最初の1分間マイクのスイッチを入れわすれました。食堂にいた何人かの生徒が笑いました。それから私は毎日原稿を声に出して読む練習をし、先輩にアドバイスをしてくれるようたのみました。先輩は、友だち一人だけに話しかけていると想像するように言ってくれました。',
      '2か月後、私はクラスメートがリクエストした曲を紹介しました。放送のあと、1年生の生徒が私のところに来て「あなたの声のおかげで、お昼にさびしくなくなりました」と言いました。私はとてもうれしかったです。今では、私たちの言葉は、会ったこともない人にも届くのだとわかります。',
    ],
    blanks: [
      { id: 'A', choices: ['at', 'in', 'for', 'with'], answer: 0, why: 'get better at 〜「〜が上手になる」。be good at 〜 と同じく at を使う。' },
      { id: 'B', choices: ['to', 'for', 'that', 'and'], answer: 0, why: 'ask 人 to 〜「人に〜するようたのむ」。' },
      { id: 'C', choices: ['met', 'meet', 'meeting', 'to meet'], answer: 0, why: 'have never met「一度も会ったことがない」（現在完了の経験）。have のあとは過去分詞。' },
    ],
    tf: [
      { statement: '放送部は毎週水曜日の昼休みにラジオ番組を放送している。', answer: true, why: '第1段落 every Wednesday at lunchtime。' },
      { statement: '筆者の最初の放送はうまくいった。', answer: false, why: '第2段落 My first show was a disaster（さんざんだった）。' },
      { statement: '1年生の生徒が、筆者の声のおかげで昼休みにさびしくなくなったと言った。', answer: true, why: "第3段落 'Your voice helped me feel less lonely at lunch.'" },
    ],
    qa: [
      { q: 'Why did the writer join the broadcasting club?', choices: ['To get better at speaking in front of people.', 'To listen to more songs.', 'To meet first-year students.', 'To eat lunch in the cafeteria.'], answer: 0, why: '第1段落 because I wanted to get better at speaking in front of people。' },
    ],
  },
  {
    id: 'exam-wheelchair',
    title: 'Wheelchair Basketball',
    level: '高校入試（随筆）',
    paragraphs: [
      'Last summer, our town held a sports event where anyone could try wheelchair basketball. I thought it would be easy ( A ) I had played basketball for three years. I was wrong.',
      'Moving the wheelchair and holding the ball at the same time was very difficult. I could not even get close to the basket. A player on the local team, Mr. Sato, showed me how to turn quickly by pushing only one wheel. He has used a wheelchair ( B ) a car accident twenty years ago. After many tries, I finally scored my first basket.',
      "At the end of the day, we played a short game together. Mr. Sato moved so fast that nobody could stop him. He told me, 'People often see only what I cannot do. I want them to see what I ( C ) do.' Since that day, I have tried to look at people in a different way, paying attention to their strengths first.",
    ],
    ja: [
      '去年の夏、私たちの町で、だれでも車いすバスケットボールを体験できるスポーツイベントが開かれました。私はバスケットボールを3年間やっていたので、かんたんだろうと思っていました。でも、それはまちがいでした。',
      '車いすを動かしながらボールを持つのは、とても難しかったです。ゴールに近づくことさえできませんでした。地元チームの選手の佐藤さんが、片方の車輪だけをおしてすばやく回る方法を教えてくれました。佐藤さんは20年前の交通事故以来、車いすを使っています。何度も挑戦して、ついに初めてシュートを決めました。',
      'その日の最後に、いっしょに短い試合をしました。佐藤さんはとても速く動くので、だれも止められませんでした。佐藤さんは私に「人はよく、ぼくができないことばかりを見るんだ。ぼくは、ぼくにできることを見てほしい」と言いました。その日から私は、まず相手の得意なことに目を向けて、人をちがう見方で見るようにしています。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'although', 'unless', 'until'], answer: 0, why: '理由の because。「3年間バスケをやっていたので、かんたんだと思った」。' },
      { id: 'B', choices: ['since', 'for', 'during', 'from'], answer: 0, why: 'since 〜「〜以来」。過去のできごと（20年前の事故）から今まで続いている。for のあとは期間。' },
      { id: 'C', choices: ['can', 'cannot', 'must', 'should'], answer: 0, why: '前の what I cannot do と対比して what I can do「ぼくにできること」。' },
    ],
    tf: [
      { statement: '筆者はバスケットボールを3年間やっていた。', answer: true, why: '第1段落 I had played basketball for three years。' },
      { statement: '筆者は車いすバスケットボールをすぐに上手にできた。', answer: false, why: '第2段落 very difficult / could not even get close to the basket。' },
      { statement: '佐藤さんは20年前から車いすを使っている。', answer: true, why: '第2段落 since a car accident twenty years ago。' },
    ],
    qa: [
      { q: 'What did Mr. Sato want people to see?', choices: ['What he can do.', 'What he cannot do.', 'How to drive a car.', 'How to play the piano.'], answer: 0, why: "第3段落 'I want them to see what I can do.'" },
    ],
  },
  {
    id: 'exam-sign-language',
    title: 'Thank You in Sign Language',
    level: '高校入試（体験文）',
    paragraphs: [
      'In our town, there is a cafe where some of the staff cannot hear. The first time I went there, I did not know how to order. A staff member smiled and pointed to a menu with pictures, so I was able to order ( A ) any problems.',
      "After that, I became interested in sign language. I borrowed a book from the library and practiced simple words like 'thank you' and 'delicious' every night. I also watched videos online to see how people moved their hands. At first my hands moved slowly, but little by little I got ( B ) at it.",
      "A month later, I visited the cafe again and signed 'thank you' to the staff member. Her face lit up, and she signed something back. I did not understand everything, but I felt that we were really talking. I learned that communication is not only about the words we ( C ) with our mouths. Now I want to learn more signs.",
    ],
    ja: [
      '私の町には、耳の聞こえない店員さんが何人かはたらいているカフェがあります。はじめて行ったとき、私は注文のしかたがわかりませんでした。店員さんがほほえんで、写真つきのメニューを指さしてくれたので、何の問題もなく注文することができました。',
      'それから私は手話に興味をもちました。図書館で本を借りて、「ありがとう」や「おいしい」のような簡単なことばを毎晩練習しました。はじめは手がゆっくりとしか動きませんでしたが、少しずつ上手になりました。手の動かし方を見るために、インターネットの動画も見ました。',
      '1か月後、私はまたそのカフェに行き、店員さんに手話で「ありがとう」と伝えました。店員さんの顔がぱっと明るくなり、手話で何かを返してくれました。全部はわかりませんでしたが、本当に話をしていると感じました。コミュニケーションは、口で言うことばだけではないのだと学びました。今では、もっと手話を覚えたいと思っています。',
    ],
    blanks: [
      { id: 'A', choices: ['without', 'with', 'for', 'by'], answer: 0, why: 'without any problems「何の問題もなく」。' },
      { id: 'B', choices: ['better', 'worse', 'more', 'most'], answer: 0, why: 'get better at 〜「〜が上手になる」。少しずつ上達した。' },
      { id: 'C', choices: ['say', 'hear', 'eat', 'close'], answer: 0, why: '「口で言う（say）ことば」。手話のように手で伝える方法と対比している。' },
    ],
    tf: [
      { statement: 'カフェの店員はみな耳が聞こえない。', answer: false, why: '第1段落 some of the staff cannot hear（何人かは）。' },
      { statement: '筆者は図書館で本を借りて手話を練習した。', answer: true, why: '第2段落 I borrowed a book from the library and practiced simple words。' },
      { statement: '1か月後、筆者は店員の手話をすべて理解できた。', answer: false, why: '第3段落 I did not understand everything。' },
    ],
    qa: [
      { q: 'What did the writer learn?', choices: ['Communication is not only about spoken words.', 'Sign language is too difficult to learn.', 'Cafes should use more pictures.', 'Libraries have few books about sign language.'], answer: 0, why: '第3段落最後 communication is not only about the words we say with our mouths。' },
    ],
  },
  {
    id: 'exam-town-clock',
    title: 'The Old Clock Tower',
    level: '高校入試（随筆）',
    paragraphs: [
      'In the center of my town, there is an old clock tower. It was built about one hundred years ago, and for a long time it was the only way many people knew the time. Last year, however, the clock stopped, and the town did not have enough money ( A ) it.',
      "Some people said, 'We all have phones. We don't need the clock anymore.' But my grandfather disagreed. He said the clock was a symbol of the town's history. He and his friends started collecting money ( B ) the station and in front of the supermarket every weekend.",
      "Many people who had grown up hearing the clock's bell gave money, and even children brought coins from their piggy banks. After six months, the clock was finally fixed. When it rang again, many people stopped walking and looked up. I realized that some things are important not because they are useful, but because they ( C ) people together.",
    ],
    ja: [
      '私の町の中心には古い時計台があります。それはおよそ100年前に建てられ、長いあいだ、多くの人々にとって時刻を知るただ一つの方法でした。しかし去年、時計が止まってしまい、町にはそれを直すためのお金が足りませんでした。',
      '「みんなスマホを持っている。もう時計はいらない」と言う人もいました。でも祖父は反対しました。時計は町の歴史のしるしだと言ったのです。祖父と友だちは、毎週末、駅とスーパーの前でお金を集め始めました。',
      '時計の鐘を聞いて育った多くの人がお金を出し、子どもたちまでちょ金箱から小銭を持ってきました。6か月後、時計はついに直りました。ふたたび鐘が鳴ったとき、多くの人が足を止めて見上げました。役に立つからではなく、人々を結びつけるから大切なものもあるのだと、私は気づきました。',
    ],
    blanks: [
      { id: 'A', choices: ['to repair', 'repairing', 'repaired', 'repair'], answer: 0, why: '不定詞の形容詞的用法 money to repair it「それを直すためのお金」。' },
      { id: 'B', choices: ['at', 'on', 'to', 'of'], answer: 0, why: 'at the station「駅で」。場所の一点を表す at。' },
      { id: 'C', choices: ['bring', 'make', 'break', 'send'], answer: 0, why: 'bring people together「人々を結びつける」。' },
    ],
    tf: [
      { statement: '時計台はおよそ100年前に建てられた。', answer: true, why: '第1段落 It was built about one hundred years ago。' },
      { statement: '筆者の祖父は、時計はもう必要ないと言った。', answer: false, why: '第2段落 my grandfather disagreed（反対した）。' },
      { statement: '時計は1か月で直った。', answer: false, why: '第3段落 After six months, the clock was finally fixed（6か月後）。' },
    ],
    qa: [
      { q: 'Why did the writer think the clock was important?', choices: ['It brings people together.', 'It is the most accurate clock.', 'It is very useful for telling the time.', 'It was cheap to repair.'], answer: 0, why: '第3段落最後 not because they are useful, but because they bring people together。' },
    ],
  },
  {
    id: 'adv-procrastination',
    title: 'Why We Put Things Off',
    level: '難関大（評論）',
    paragraphs: [
      'Almost everyone has put off an important task until the last minute. We often blame laziness, but psychologists suggest that procrastination is less about managing time ( A ) about managing emotions.',
      'When a task makes us feel anxious or bored, avoiding it brings immediate relief. Checking messages or tidying a desk feels better in the moment, even though we know the task will still be waiting for us. In this sense, procrastination is a short-term solution that ( B ) a long-term problem.',
      'If this view is correct, simply making a stricter schedule may not help much. A more effective approach may be to make the first step of a task so small that it feels ( C ) to begin, or to be kind to ourselves when we fall behind, since guilt tends to make us avoid the task even more. Understanding why we delay, in other words, may be the first step toward finally getting started.',
    ],
    ja: [
      'ほとんどだれもが、大切な作業をぎりぎりまで先延ばしにしたことがある。私たちはよくそれをなまけぐせのせいにするが、心理学者たちは、先延ばしは時間の管理というよりむしろ感情の管理の問題だと指摘している。',
      'ある作業が不安や退屈を感じさせるとき、それを避けるとすぐに気持ちが楽になる。メッセージを確認したり机を片づけたりすることは、その作業がまだ待っているとわかっていても、その場では気分がよい。この意味で、先延ばしは長い目で見た問題を生み出す、目先の解決策なのである。',
      'この考えが正しいなら、もっときびしい予定を立てるだけではあまり役に立たないかもしれない。より効果的なのは、作業の最初の一歩を、始めやすいと感じるほど小さくすること、あるいは遅れてしまったときに自分にやさしくすることかもしれない。罪悪感は、その作業をさらに避けさせる傾向があるからだ。言いかえれば、なぜ先延ばしにするのかを理解することが、ついに取りかかるための第一歩になるのかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['than', 'as', 'then', 'that'], answer: 0, why: 'less A than B「AというよりむしろB」。時間の管理というより感情の管理。' },
      { id: 'B', choices: ['creates', 'solves', 'prevents', 'removes'], answer: 0, why: '目先の解決策が長い目で見た問題を「生み出す（creates）」。' },
      { id: 'C', choices: ['easy', 'hard', 'late', 'wrong'], answer: 0, why: '最初の一歩をとても小さくすれば、始めるのが easy（かんたん）に感じられる。' },
    ],
    tf: [
      { statement: '心理学者によれば、先延ばしは主に時間の管理の問題である。', answer: false, why: '第1段落 less about managing time than about managing emotions（時間より感情）。' },
      { statement: '不安や退屈を感じる作業を避けると、すぐに気分が楽になる。', answer: true, why: '第2段落 avoiding it brings immediate relief。' },
      { statement: '筆者は、遅れたときに自分を責めると、その作業をさらに避けやすくなると述べている。', answer: true, why: '第3段落 guilt tends to make us avoid the task even more。' },
    ],
    qa: [
      { q: 'What does the author suggest as a more effective approach?', choices: ['Making the first step of a task very small.', 'Making a stricter schedule.', 'Checking messages before starting.', 'Working only at the last minute.'], answer: 0, why: '第3段落 make the first step of a task so small that it feels easy to begin。' },
    ],
  },
  {
    id: 'toefl-printing',
    title: 'The Printing Revolution',
    level: 'TOEFL・IELTS（歴史）',
    paragraphs: [
      'Before the fifteenth century, books in Europe were copied by hand, a slow process that made them rare and expensive. Around 1450, Johannes Gutenberg developed a printing press that used movable metal type, ( A ) books to be produced far more quickly.',
      'The effects were dramatic. Within a few decades, printing shops had spread to many European cities, and millions of books were in circulation. As books became cheaper, more people learned to read, and ideas could travel ( B ) than ever before. Newspapers and pamphlets also appeared, giving ordinary people new ways to learn about events in other places.',
      'Historians often link the printing press to major changes such as the spread of scientific knowledge. Scientists could share their findings with others in distant places, who could then check and build on each other\'s work. For this reason, some historians consider it ( C ) of the most important inventions in human history.',
    ],
    ja: [
      '15世紀より前、ヨーロッパの本は手で書き写されていた。それは時間のかかる作業で、本はめずらしく高価なものだった。1450年ごろ、ヨハネス・グーテンベルクが動かせる金属の活字を使った印刷機を開発し、本をはるかに速く作れるようにした。',
      'その影響は劇的だった。数十年のうちに印刷所はヨーロッパの多くの都市に広がり、何百万冊もの本が出回るようになった。本が安くなるにつれて、字を読めるようになる人がふえ、考えがかつてないほど速く広まるようになった。新聞や小冊子も現れ、ふつうの人々がほかの土地のできごとを知る新しい手段となった。',
      '歴史家はよく、印刷機を、科学的な知識の広まりのような大きな変化と結びつける。科学者は遠くにいる人々と発見を共有でき、その人々がたがいの研究を確かめ、それをもとにさらに研究を進めることができた。このため、印刷機を人類の歴史で最も重要な発明の一つと考える歴史家もいる。',
    ],
    blanks: [
      { id: 'A', choices: ['allowing', 'allowed', 'to allow', 'allows'], answer: 0, why: '分詞構文 allowing books to be produced「（その結果）本が作られるのを可能にした」。allow A to do。' },
      { id: 'B', choices: ['faster', 'fast', 'fastest', 'more fast'], answer: 0, why: 'あとに than があるので比較級 faster。fast の比較級は more fast ではなく faster。' },
      { id: 'C', choices: ['one', 'some', 'any', 'none'], answer: 0, why: 'one of the 最上級 ＋ 複数名詞「最も〜な…の一つ」。' },
    ],
    tf: [
      { statement: 'Before Gutenberg, books in Europe were copied by hand.', answer: true, why: '第1段落 books in Europe were copied by hand。' },
      { statement: 'After printing spread, books became more expensive.', answer: false, why: '第2段落 As books became cheaper（安くなった）。' },
      { statement: 'The printing press helped scientists share their findings.', answer: true, why: '第3段落 Scientists could share their findings with others in distant places。' },
    ],
    qa: [
      { q: 'What happened as books became cheaper?', choices: ['More people learned to read.', 'Fewer books were printed.', 'Printing shops closed down.', 'Scientists stopped writing.'], answer: 0, why: '第2段落 As books became cheaper, more people learned to read。' },
    ],
  },
  {
    id: 'adv-advertising',
    title: 'What Advertisements Really Sell',
    level: '難関大（評論）',
    paragraphs: [
      'Advertisements rarely tell us only what a product does. More often, they suggest who we might become if we owned it: more attractive, more successful, or more popular. In this way, advertising sells not just objects ( A ) also images of ourselves.',
      'Critics argue that this strategy can create dissatisfaction. By constantly showing us ideal lives, advertisements may make our own lives seem lacking, ( B ) encourages us to buy more in the hope of closing the gap. Yet the satisfaction that comes from a new purchase often fades quickly, and the cycle begins again.',
      'Others point out that advertising also has useful functions: it informs us about new products and helps pay for free services such as online videos and newspapers. Perhaps the most practical response is not to avoid advertisements entirely, which is nearly impossible, but to become more aware of the messages they ( C ) send.',
    ],
    ja: [
      '広告が、商品が何をするかだけを伝えることはめったにない。それよりも多いのは、その商品を持てば自分がどんな人になれるか、つまり、もっとすてきで、もっと成功して、もっと人気者になれることをほのめかすものだ。このように、広告は物だけでなく、私たち自身のイメージも売っているのである。',
      'この戦略は不満を生みうる、と批判する人々もいる。理想の暮らしをたえず見せることで、広告は自分の暮らしを物足りなく感じさせることがあり、そのことが、その差をうめようとして私たちにもっと買わせるのだ。しかし、新しい買い物から得られる満足は、すぐに薄れてしまうことが多く、そしてまた同じことがくり返される。',
      '一方で、広告には役に立つ働きもあると指摘する人々もいる。新しい商品について知らせてくれるし、ネット動画や新聞のような無料のサービスの費用をまかなう助けにもなっている。おそらく最も現実的な対応は、ほとんど不可能な、広告を完全にさけることではなく、広告がひそかに送ってくるメッセージにもっと気づけるようになることだろう。',
    ],
    blanks: [
      { id: 'A', choices: ['but', 'and', 'or', 'so'], answer: 0, why: 'not just A but also B「AだけでなくBも」。' },
      { id: 'B', choices: ['which', 'what', 'that', 'who'], answer: 0, why: 'コンマのあとの which は前の内容全体（自分の暮らしを物足りなく感じさせること）を指す。that はコンマのあとに使えない。' },
      { id: 'C', choices: ['quietly', 'loudly', 'never', 'rarely'], answer: 0, why: '「ひそかに（quietly）送ってくるメッセージ」。気づきにくいメッセージだから、気づけるようになることが大切。' },
    ],
    tf: [
      { statement: '筆者によれば、広告は商品の機能だけを伝えることが多い。', answer: false, why: '第1段落 Advertisements rarely tell us only what a product does。' },
      { statement: '新しい買い物から得られる満足は、すぐに薄れることが多い。', answer: true, why: '第2段落 the satisfaction that comes from a new purchase often fades quickly。' },
      { statement: '筆者は、広告を完全にさけるべきだと主張している。', answer: false, why: '第3段落 not to avoid advertisements entirely, which is nearly impossible。' },
    ],
    qa: [
      { q: 'According to the passage, what is one useful function of advertising?', choices: ['It helps pay for free services.', 'It makes people dissatisfied.', 'It shows ideal lives.', 'It stops people from buying things.'], answer: 0, why: '第3段落 helps pay for free services such as online videos and newspapers。' },
    ],
  },
  {
    id: 'toefl-tea',
    title: 'How Tea Traveled the World',
    level: 'TOEFL・IELTS（歴史）',
    paragraphs: [
      'Tea was first drunk in China, where, according to legend, it was discovered thousands of years ago when leaves fell into a pot of boiling water. Whether or not this story is true, tea had become a popular drink in China by the eighth century, ( A ) a famous book about how to prepare it was written.',
      'From China, tea spread to Japan and Korea, where it became connected with religious and social customs. It reached Europe in the seventeenth century, carried by Dutch and Portuguese traders. At first it was expensive, so only wealthy people could afford ( B ).',
      'In Britain, tea gradually became an everyday drink for people of all classes. Today, it is one of the most widely consumed drinks in the world, second only to water. The journey of tea shows how a single plant can ( C ) the daily habits of people across many cultures.',
    ],
    ja: [
      'お茶が最初に飲まれたのは中国で、言い伝えによれば、何千年も前に、わかしたお湯のなべに葉が落ちたことで見つかったという。この話が本当かどうかはともかく、お茶は8世紀までには中国で人気のある飲み物になっており、そのころ、お茶のいれ方についての有名な本が書かれた。',
      'お茶は中国から日本や朝鮮半島へ広まり、そこで宗教や社会の習慣と結びついた。ヨーロッパには17世紀に、オランダやポルトガルの商人によって運ばれた。はじめは高価だったので、裕福な人しか買うことができなかった。',
      'イギリスでは、お茶はしだいに、あらゆる階級の人々の日常の飲み物になった。今日、お茶は世界で最も広く飲まれている飲み物の一つで、水につぐ2番目である。お茶の旅は、たった一つの植物が、多くの文化の人々の日々の習慣をいかに形づくりうるかを示している。',
    ],
    blanks: [
      { id: 'A', choices: ['when', 'which', 'where', 'what'], answer: 0, why: '関係副詞 when。the eighth century（時）を受けて「そのころ〜」。後ろは完全な文なので which・what は入らない。' },
      { id: 'B', choices: ['it', 'them', 'its', 'one'], answer: 0, why: 'it は tea を指す。afford it「それを買う余裕がある」。tea は数えられない名詞なので them ではない。' },
      { id: 'C', choices: ['shape', 'break', 'hide', 'forget'], answer: 0, why: 'shape「形づくる」。一つの植物が人々の習慣を形づくった。' },
    ],
    tf: [
      { statement: 'According to legend, tea was discovered when leaves fell into hot water.', answer: true, why: '第1段落 when leaves fell into a pot of boiling water。' },
      { statement: 'Tea reached Europe before it spread to Japan.', answer: false, why: '第2段落 中国から日本・朝鮮へ広まり、ヨーロッパに届いたのは17世紀。' },
      { statement: 'Tea is drunk more widely than water.', answer: false, why: '第3段落 second only to water（水につぐ2番目）。' },
    ],
    qa: [
      { q: 'Why could only wealthy people drink tea at first in Europe?', choices: ['It was expensive.', 'It was not allowed by law.', 'It was sold only in China.', 'It tasted too bitter.'], answer: 0, why: '第2段落 At first it was expensive, so only wealthy people could afford it。' },
    ],
  },
  {
    id: 'exam-shamisen',
    title: "My Grandmother's Shamisen",
    level: '高校入試（随筆）',
    paragraphs: [
      'When I was in the second year of junior high school, my grandmother gave me her old shamisen, a traditional Japanese instrument with three strings. She had played it since she was a girl, but her fingers had become ( A ) weak to press the strings.',
      'At first I did not want to learn it. Most of my friends liked pop music, and I thought the shamisen was old-fashioned. However, when I heard a recording of my grandmother playing at a festival fifty years ago, I was moved ( B ) its powerful sound.',
      "I started taking lessons every Saturday. My fingers hurt, and it took me three months to play one short song. Last month, I played that song for my grandmother on her birthday. She closed her eyes and listened, and then she said, 'Now my shamisen has a new voice.' I want to keep playing it so that its sound will ( C ) for many more years.",
    ],
    ja: [
      '中学2年生のとき、祖母が古い三味線をくれました。三味線は糸が3本ある日本の伝統的な楽器です。祖母は女の子のころからひいてきましたが、指が弱くなって糸をおさえられなくなっていました。',
      'はじめ、私は習いたくありませんでした。友だちのほとんどはポップスが好きで、私は三味線は古くさいと思っていたのです。しかし、祖母が50年前のお祭りでひいている録音を聞いたとき、その力強い音に心を動かされました。',
      '私は毎週土曜日にけいこに通い始めました。指が痛くなり、短い曲を1曲ひけるようになるまで3か月かかりました。先月、祖母の誕生日に、その曲をひいてあげました。祖母は目を閉じて聞き、それから「これでわたしの三味線に新しい声ができたね」と言いました。私は、その音がこれから何年も続いていくように、三味線をひき続けたいです。',
    ],
    blanks: [
      { id: 'A', choices: ['too', 'so', 'very', 'enough'], answer: 0, why: 'too 〜 to …「…するには〜すぎる」。指が弱すぎて糸をおさえられない。' },
      { id: 'B', choices: ['by', 'at', 'in', 'for'], answer: 0, why: 'be moved by 〜「〜に心を動かされる・感動する」。' },
      { id: 'C', choices: ['continue', 'stop', 'break', 'fall'], answer: 0, why: '「音がこれからも続く（continue）ように」。ひき続けたい理由。' },
    ],
    tf: [
      { statement: '祖母は指が弱くなって、三味線の糸をおさえられなくなった。', answer: true, why: '第1段落 her fingers had become too weak to press the strings。' },
      { statement: '筆者ははじめから三味線を習いたいと思っていた。', answer: false, why: '第2段落 At first I did not want to learn it。' },
      { statement: '筆者は1か月で短い曲をひけるようになった。', answer: false, why: '第3段落 it took me three months to play one short song（3か月）。' },
    ],
    qa: [
      { q: 'What made the writer want to learn the shamisen?', choices: ["Hearing a recording of the grandmother's playing.", 'A request from a music teacher.', 'A pop song on TV.', 'A festival at school.'], answer: 0, why: '第2段落 when I heard a recording of my grandmother playing ... I was moved by its powerful sound。' },
    ],
  },
  {
    id: 'exam-sweet-drinks',
    title: 'A Week Without Sweet Drinks',
    level: '高校入試（体験文）',
    paragraphs: [
      'In health class, our teacher showed us how much sugar is in one bottle of a popular soft drink. It was more than ten sugar cubes! I was shocked because I usually drank ( A ) bottles a day. I wanted to know how all that sugar was affecting my body.',
      'I decided to try an experiment: for one week, I would drink only water and tea. The first three days were hard. I kept thinking about soft drinks, especially after club practice. On the fourth day, however, I noticed that I was not as tired in the afternoon ( B ) before. I also started to enjoy the taste of cold green tea.',
      'By the end of the week, I had saved the money I usually spent on drinks, and I felt better. I have not stopped drinking soft drinks completely, but now I have one only on weekends. Small changes in our daily habits can make a big ( C ) to our health.',
    ],
    ja: [
      '保健の授業で、先生が人気のある清涼飲料水1本にどれだけ砂糖が入っているかを見せてくれました。角砂糖10個以上でした！ 私はふだん1日に2本飲んでいたので、ショックを受けました。その砂糖が自分の体にどんな影響をあたえているのか知りたいと思いました。',
      '私は実験をしてみることにしました。1週間、水とお茶だけを飲むのです。最初の3日間はつらかったです。特に部活のあとは、ジュースのことばかり考えていました。しかし4日目に、午後になっても前ほどつかれていないことに気づきました。冷たい緑茶の味も好きになってきました。',
      '1週間が終わるころには、ふだん飲み物に使っていたお金がたまり、体の調子もよくなっていました。ジュースを飲むのを完全にやめたわけではありませんが、今は週末にだけ1本飲むようにしています。毎日の習慣を少し変えるだけでも、健康に大きなちがいが生まれるのです。',
    ],
    blanks: [
      { id: 'A', choices: ['two', 'second', 'twice', 'double'], answer: 0, why: '「1日に2本」は two bottles a day。second は「2番目の」、twice は「2回・2倍」。' },
      { id: 'B', choices: ['as', 'than', 'so', 'like'], answer: 0, why: 'not as 〜 as …「…ほど〜ない」。前ほどつかれていない。' },
      { id: 'C', choices: ['difference', 'different', 'differ', 'differently'], answer: 0, why: 'make a difference「ちがいを生む・効果がある」。a big のあとなので名詞 difference。' },
    ],
    tf: [
      { statement: '1本の清涼飲料水に、角砂糖10個以上の砂糖が入っていた。', answer: true, why: '第1段落 It was more than ten sugar cubes。' },
      { statement: '最初の3日間はかんたんだった。', answer: false, why: '第2段落 The first three days were hard。' },
      { statement: '筆者は今はまったくジュースを飲まない。', answer: false, why: '第3段落 now I have one only on weekends（週末にだけ飲む）。' },
    ],
    qa: [
      { q: 'How does the writer drink soft drinks now?', choices: ['Only on weekends.', 'Every day after practice.', 'Never.', 'Two bottles a day.'], answer: 0, why: '第3段落 now I have one only on weekends。' },
    ],
  },
  {
    id: 'adv-self-driving',
    title: 'Who Is Driving?',
    level: '難関大（評論）',
    paragraphs: [
      'Self-driving cars promise to make roads safer, since most traffic accidents are caused by human error. Machines do not get tired, look at their phones, or drive after drinking late at night. ( A ), even supporters admit that no technology can remove every risk.',
      'This raises a difficult question: when a self-driving car is involved in an accident, who is responsible? The passenger was not driving, the programmers could not predict every situation, and the car itself cannot be punished. Our legal systems were designed for a world in which a human was always ( B ) control.',
      'Some experts argue that manufacturers should take responsibility, as they do when other products fail. Others worry that this would slow the development of a technology that could save many lives. Whichever view prevails, the debate shows that new technologies often force us to ( C ) ideas we once took for granted.',
    ],
    ja: [
      '自動運転車は、道路をより安全にすると約束している。交通事故の多くは人のミスが原因だからだ。機械はつかれないし、スマートフォンを見ることも、夜おそくにお酒を飲んで運転することもない。それでも、支持する人々でさえ、どんな技術もあらゆる危険をなくすことはできないと認めている。',
      'ここで難しい問いが生まれる。自動運転車が事故にかかわったとき、だれに責任があるのか。乗っていた人は運転していなかったし、プログラマーはあらゆる状況を予測できたわけではない。そして車そのものを罰することはできない。私たちの法律のしくみは、いつも人間が運転を管理している世界のために作られたのである。',
      '製造業者が責任を負うべきだと主張する専門家もいる。ほかの製品が故障したときと同じように、というわけだ。一方で、そうすると多くの命を救うかもしれない技術の発展がおくれてしまうと心配する人もいる。どちらの考えが優勢になるにせよ、この議論は、新しい技術がしばしば、かつて当然だと思っていた考えを見直すことを私たちにせまるということを示している。',
    ],
    blanks: [
      { id: 'A', choices: ['Nevertheless', 'Therefore', 'For example', 'In addition'], answer: 0, why: 'Nevertheless「それでもなお」。安全になると言われるが、それでも危険はゼロにならない、という逆接。' },
      { id: 'B', choices: ['in', 'on', 'at', 'under'], answer: 0, why: 'in control「管理している・運転している」。under control は「（物が）管理されている」。' },
      { id: 'C', choices: ['rethink', 'reuse', 'record', 'recall'], answer: 0, why: 'rethink「考え直す」。当然だと思っていた考えを見直す。' },
    ],
    tf: [
      { statement: '交通事故の多くは人のミスが原因である。', answer: true, why: '第1段落 most traffic accidents are caused by human error。' },
      { statement: '自動運転車を支持する人は、どんな危険もなくせると考えている。', answer: false, why: '第1段落 even supporters admit that no technology can remove every risk。' },
      { statement: '筆者は、製造業者が責任を負うべきだと結論づけている。', answer: false, why: '第3段落 両方の意見を紹介し、どちらかに決めてはいない（Whichever view prevails）。' },
    ],
    qa: [
      { q: 'Why is it difficult to decide who is responsible?', choices: ['Our laws assumed that a human was always driving.', 'Self-driving cars are too expensive.', 'Programmers are always to blame.', 'Passengers drive the car themselves.'], answer: 0, why: '第2段落 Our legal systems were designed for a world in which a human was always in control。' },
    ],
  },
  {
    id: 'toefl-vaccines',
    title: 'How Vaccines Train the Body',
    level: 'TOEFL・IELTS（医学）',
    paragraphs: [
      'When harmful germs enter the body, the immune system fights them, but this response can take days to build up. During that time, a person may become seriously ill. Vaccines work by giving the immune system a chance to practice ( A ) a real infection occurs.',
      'A vaccine contains a weakened or inactive form of a germ, or just a harmless piece of it. Although it cannot cause the disease, the immune system still recognizes it as foreign and produces antibodies. More importantly, the body creates memory cells that ( B ) how to fight that particular germ.',
      'If the real germ appears later, these memory cells can respond quickly, often stopping the infection before symptoms appear. When enough people in a community are vaccinated, germs have fewer chances to spread, which also protects people who cannot receive vaccines, such as newborn babies. This effect is ( C ) as herd immunity.',
    ],
    ja: [
      '有害な病原体が体に入ると、免疫のしくみがそれとたたかうが、この反応が十分に強くなるまでには何日もかかることがある。そのあいだに、重い病気になってしまうこともある。ワクチンは、本当の感染が起こる前に、免疫のしくみに練習する機会をあたえることで働く。',
      'ワクチンには、弱めたり働かなくしたりした病原体、あるいはその無害な一部だけが入っている。病気を起こすことはできないが、免疫のしくみはそれでも外から来たものだと見分け、抗体をつくる。さらに大切なことに、体はその病原体とのたたかい方を覚えておく記憶細胞をつくる。',
      'あとで本物の病原体が入ってくると、これらの記憶細胞がすばやく反応し、症状が出る前に感染を止めることも多い。地域で十分に多くの人がワクチンを受けると、病原体が広がる機会が少なくなり、生まれたばかりの赤ちゃんのようにワクチンを受けられない人も守られる。この効果は集団免疫として知られている。',
    ],
    blanks: [
      { id: 'A', choices: ['before', 'after', 'while', 'since'], answer: 0, why: '「本当の感染が起こる前に（before）」練習する。' },
      { id: 'B', choices: ['remember', 'forget', 'ignore', 'create'], answer: 0, why: 'memory cells（記憶細胞）は、たたかい方を「覚えている（remember）」。' },
      { id: 'C', choices: ['known', 'knowing', 'knew', 'know'], answer: 0, why: 'be known as 〜「〜として知られている」。' },
    ],
    tf: [
      { statement: 'Vaccines usually cause the disease in a mild form.', answer: false, why: '第2段落 it cannot cause the disease。' },
      { statement: 'Memory cells help the body respond quickly to a germ later.', answer: true, why: '第3段落 these memory cells can respond quickly。' },
      { statement: 'Herd immunity can protect people who cannot be vaccinated.', answer: true, why: '第3段落 which also protects people who cannot receive vaccines ... This effect is known as herd immunity。' },
    ],
    qa: [
      { q: 'What does a vaccine contain?', choices: ['A weakened or inactive germ, or a harmless part of it.', 'Antibodies from other people.', 'Memory cells from animals.', 'A stronger form of the germ.'], answer: 0, why: '第2段落 A vaccine contains a weakened or inactive form of a germ, or just a harmless piece of it。' },
    ],
  },
  {
    id: 'exam-time-capsule',
    title: 'A Letter from My Younger Self',
    level: '高校入試（随筆）',
    paragraphs: [
      'When I was in the sixth grade, my class buried a time capsule under the cherry tree in the schoolyard. Each of us put in a letter to our future selves. Our teacher told us that we would open it ( A ) we turned fifteen.',
      "Last month, my old classmates and I gathered at the school to dig it up. The box was a little rusty, but the letters inside were safe. In my letter, I had written, 'I want to be a soccer player. Are you still practicing every day?' I laughed, because I quit the soccer team last year ( B ) join the science club.",
      "At first I felt a little sorry for my younger self. But then I read the last line: 'Whatever you are doing now, I hope you love it.' I realized that my dream had changed, but my wish to do something I love ( C ) the same. I am going to write a new letter to myself at twenty.",
    ],
    ja: [
      '小学6年生のとき、私たちのクラスは校庭の桜の木の下にタイムカプセルをうめました。一人ひとりが未来の自分にあてた手紙を入れました。先生は、15さいになったら開けようと言いました。',
      '先月、昔のクラスメートと私は学校に集まり、それをほり出しました。箱は少しさびていましたが、中の手紙は無事でした。私の手紙には「サッカー選手になりたい。今も毎日練習している？」と書いてありました。私は笑ってしまいました。去年、科学部に入るためにサッカー部をやめていたからです。',
      'はじめは、小さいころの自分に少し悪い気がしました。でも、最後の一行を読みました。「今何をしていても、それを好きでいてほしい」。私は、夢は変わったけれど、好きなことをしたいという願いは変わっていなかったのだと気づきました。20さいの自分に、新しい手紙を書くつもりです。',
    ],
    blanks: [
      { id: 'A', choices: ['when', 'what', 'which', 'where'], answer: 0, why: '時を表す接続詞 when「15さいになったときに」。' },
      { id: 'B', choices: ['to', 'for', 'and', 'so'], answer: 0, why: '目的を表す不定詞 to join「入るために」。' },
      { id: 'C', choices: ['had stayed', 'staying', 'to stay', 'stayed to'], answer: 0, why: 'realized（過去）の時点までずっと「変わらずにいた」ので過去完了 had stayed。前の had changed と対になっている。' },
    ],
    tf: [
      { statement: 'タイムカプセルは校庭の桜の木の下にうめられた。', answer: true, why: '第1段落 under the cherry tree in the schoolyard。' },
      { statement: '筆者は今もサッカー部で毎日練習している。', answer: false, why: '第2段落 I quit the soccer team last year（去年やめた）。' },
      { statement: '筆者は20さいの自分に新しい手紙を書くつもりだ。', answer: true, why: '第3段落 I am going to write a new letter to myself at twenty。' },
    ],
    qa: [
      { q: 'What did the writer realize after reading the letter?', choices: ['The wish to do something loved had not changed.', 'Soccer is more fun than science.', 'The letter had been lost.', 'Dreams never change.'], answer: 0, why: '第3段落 my wish to do something I love had stayed the same。' },
    ],
  },
  {
    id: 'exam-bookstore',
    title: 'The Old Bookstore',
    level: '高校入試（体験文）',
    paragraphs: [
      'Near my house, there is a small used bookstore run by an old man named Mr. Kato. I often stopped there on my way home from school, but I was too shy ( A ) talk to him.',
      "One day, I was looking for a book about space for my science report. Mr. Kato noticed me and asked what I was interested in. When I told him, he went to the back of the store and came back ( B ) three old books about the planets. 'These were my favorites when I was your age,' he said.",
      "My report was the best in the class, and I went to the store to thank him. Since then, we have talked about books every week. Last week, he told me that he would close the store next spring. I was sad, but he said, 'Books don't need a store. They just need someone who ( C ) them.' I will never forget his words.",
    ],
    ja: [
      '家の近くに、加藤さんというおじいさんがやっている小さな古本屋があります。私は学校の帰りによく立ち寄っていましたが、はずかしくて話しかけられませんでした。',
      'ある日、私は理科のレポートのために宇宙についての本をさがしていました。加藤さんが私に気づいて、何に興味があるのかとたずねました。私が答えると、加藤さんは店の奥へ行き、惑星についての古い本を3冊持ってもどってきました。「わたしが君くらいの年のころ、大好きだった本だよ」と言いました。',
      '私のレポートはクラスでいちばんになり、お礼を言いにお店に行きました。それ以来、毎週本の話をしています。先週、加藤さんは来年の春にお店を閉めると教えてくれました。私は悲しくなりましたが、加藤さんは「本にお店はいらない。読んでくれる人がいればいいんだ」と言いました。私はその言葉を決してわすれません。',
    ],
    blanks: [
      { id: 'A', choices: ['to', 'for', 'that', 'so'], answer: 0, why: 'too 〜 to …「〜すぎて…できない」。はずかしすぎて話しかけられなかった。' },
      { id: 'B', choices: ['with', 'by', 'for', 'in'], answer: 0, why: 'come back with 〜「〜を持ってもどる」。' },
      { id: 'C', choices: ['reads', 'read', 'reading', 'to read'], answer: 0, why: '関係代名詞 who の先行詞 someone は三人称単数なので reads。' },
    ],
    tf: [
      { statement: '加藤さんは古本屋をやっている。', answer: true, why: '第1段落 a small used bookstore run by an old man named Mr. Kato。' },
      { statement: '筆者ははじめから加藤さんとよく話していた。', answer: false, why: '第1段落 I was too shy to talk to him。' },
      { statement: '加藤さんは来年の春に店を閉めるつもりだ。', answer: true, why: '第3段落 he would close the store next spring。' },
    ],
    qa: [
      { q: 'What did Mr. Kato bring for the writer?', choices: ['Old books about the planets.', 'A new science textbook.', 'A map of the town.', 'A letter from his son.'], answer: 0, why: '第2段落 came back with three old books about the planets。' },
    ],
  },
  {
    id: 'adv-nostalgia',
    title: 'The Uses of Nostalgia',
    level: '難関大（評論）',
    paragraphs: [
      'Nostalgia, the warm and slightly sad feeling we have when we remember the past, was once considered a kind of illness. In the seventeenth century, a Swiss doctor used the word to describe soldiers who became sick ( A ) they missed their homes so much.',
      'Today, psychologists see it very differently. Studies suggest that recalling meaningful memories can make people feel more connected to others and more confident about the future. Nostalgia seems to remind us that our lives have ( B ), especially when we feel lonely or uncertain about what lies ahead.',
      'Of course, nostalgia can also be a trap if we spend so much time looking back that we ( C ) to live in the present. Used wisely, however, memories of the past can serve as a source of strength rather than an escape, helping us face new challenges with the knowledge that we have overcome difficulties before.',
    ],
    ja: [
      'ノスタルジア、つまり過去を思い出すときに感じる、あたたかくて少し悲しい気持ちは、かつて一種の病気だと考えられていた。17世紀、スイスのある医師は、ふるさとが恋しすぎて病気になった兵士たちを表すのにこの言葉を使った。',
      '今日、心理学者たちはそれをまったくちがうふうに見ている。研究によれば、意味のある思い出をふり返ると、人は他人とのつながりをより強く感じ、未来に対してより自信がもてるようになるという。ノスタルジアは、特にさびしいときや先が見えず不安なときに、自分の人生には意味があることを思い出させてくれるようだ。',
      'もちろん、過去をふり返ることに時間を使いすぎて、今を生きることをわすれてしまうなら、ノスタルジアはわなにもなりうる。しかし上手に使えば、過去の思い出は逃げ場ではなく力のみなもととなり、以前にも困難を乗りこえてきたのだという自覚とともに、新しい挑戦に向き合う助けになるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'although', 'unless', 'until'], answer: 0, why: '理由の because。ふるさとが恋しかったので病気になった。' },
      { id: 'B', choices: ['meaning', 'meant', 'mean', 'meaningful'], answer: 0, why: 'have のあとには名詞が必要なので meaning「意味」。meaningful は形容詞。' },
      { id: 'C', choices: ['forget', 'remember', 'decide', 'hope'], answer: 0, why: 'forget to 〜「〜するのをわすれる」。過去ばかり見て、今を生きるのをわすれる。' },
    ],
    tf: [
      { statement: 'かつてノスタルジアは一種の病気と考えられていた。', answer: true, why: '第1段落 was once considered a kind of illness。' },
      { statement: '心理学者によれば、思い出をふり返ると人はより孤独になる。', answer: false, why: '第2段落 feel more connected to others（つながりを強く感じる）。' },
      { statement: '筆者は、過去ばかりふり返るのは危険なこともあると述べている。', answer: true, why: '第3段落 nostalgia can also be a trap。' },
    ],
    qa: [
      { q: 'According to the passage, how can nostalgia help people?', choices: ['It can make them feel more connected and confident.', 'It can cure physical illnesses.', 'It helps them forget the past.', 'It stops them from thinking about the future.'], answer: 0, why: '第2段落 feel more connected to others and more confident about the future。' },
    ],
  },
  {
    id: 'toefl-bats',
    title: 'Seeing with Sound',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      'Most bats hunt at night, when it is too dark for them to see their prey clearly. To find insects in the darkness, many species use echolocation. They make high-pitched sounds, most of ( A ) are too high for humans to hear.',
      "When these sounds hit an object, such as a flying moth, they bounce back as echoes. By listening to the echoes, a bat can tell how far away the object is, how big it is, and even which direction it is moving. As the bat gets closer to its prey, it makes sounds more ( B ), allowing it to track the insect's exact position.",
      'Some insects have developed ways to escape. Certain moths can hear bat calls and drop suddenly to the ground, while others produce their own clicking sounds that may confuse the bats. This competition between hunters and prey has continued ( C ) millions of years.',
    ],
    ja: [
      'ほとんどのコウモリは、暗くてえものがよく見えない夜に狩りをする。暗やみの中で昆虫を見つけるために、多くの種は反響定位（エコーロケーション）を使う。コウモリは高い音を出すが、そのほとんどは人間には高すぎて聞こえない。',
      'これらの音が、飛んでいるガのような物に当たると、こだまとしてはね返ってくる。こだまを聞くことで、コウモリは物がどれくらい遠くにあるか、どれくらいの大きさか、さらにはどの方向に動いているかまでわかる。えものに近づくにつれて、コウモリはより頻繁に音を出し、昆虫の正確な位置を追いかけられるようにする。',
      '逃げる方法を発達させた昆虫もいる。あるガはコウモリの声を聞くと急に地面へ落ち、また自分でカチカチという音を出して、コウモリを混乱させるかもしれないガもいる。狩る側と狩られる側のこの競争は、何百万年ものあいだ続いてきた。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'them', 'that', 'what'], answer: 0, why: 'most of which「そのほとんどは」。コンマのあとで前の sounds を受ける関係代名詞 which。them では文がつながらない。' },
      { id: 'B', choices: ['frequently', 'frequent', 'frequency', 'frequents'], answer: 0, why: '動詞 makes を説明するので副詞 frequently「頻繁に」。more frequently で比較級。' },
      { id: 'C', choices: ['for', 'since', 'during', 'by'], answer: 0, why: 'for ＋ 期間「〜のあいだ」。for millions of years。since のあとは始まった時点。' },
    ],
    tf: [
      { statement: 'Humans can easily hear most of the sounds bats make.', answer: false, why: '第1段落 most of which are too high for humans to hear。' },
      { statement: 'Bats can learn the size of an object from echoes.', answer: true, why: '第2段落 a bat can tell ... how big it is。' },
      { statement: 'Some moths drop to the ground when they hear bat calls.', answer: true, why: '第3段落 Certain moths can hear bat calls and drop suddenly to the ground。' },
    ],
    qa: [
      { q: 'Why do bats make sounds more frequently as they get closer to prey?', choices: ["To track the insect's exact position.", 'To warn other bats.', 'To scare the insect away.', 'To rest their wings.'], answer: 0, why: "第2段落 allowing it to track the insect's exact position。" },
    ],
  },
  {
    id: 'exam-pottery',
    title: 'The Crooked Cup',
    level: '高校入試（体験文）',
    paragraphs: [
      'During the summer vacation, I joined a one-day pottery class at a small studio in the mountains. The teacher, Ms. Mori, showed us how to shape clay on a spinning wheel. She made it look so easy that I thought I could do it ( A ) any trouble.',
      "I was wrong. Each time I tried, the clay leaned to one side and fell. After many attempts, I finally made a cup, but it was crooked. I was embarrassed and wanted to throw it ( B ). Ms. Mori stopped me and said, 'A cup does not have to be perfect to be loved.'",
      'A month later, the studio sent me my cup after it had been fired in the kiln. Its blue color was more beautiful than I ( C ). Now I drink milk from it every morning. Whenever I see its crooked shape, I remember that mistakes can become part of something special.',
    ],
    ja: [
      '夏休みに、私は山の中の小さな工房で、1日だけの陶芸教室に参加しました。森先生が、回るろくろの上で粘土の形を作る方法を見せてくれました。先生があまりにもかんたんそうにやるので、私も何の苦労もなくできると思いました。',
      'それはまちがいでした。やってみるたびに、粘土はかたむいてたおれてしまいました。何度も挑戦して、やっとカップができましたが、ゆがんでいました。私ははずかしくて、それを捨ててしまいたくなりました。森先生は私を止めて「カップは、完ぺきでなくても愛されるのよ」と言いました。',
      '1か月後、かまで焼かれた私のカップが工房から送られてきました。その青い色は、私が思っていたよりもずっときれいでした。今では毎朝、そのカップで牛乳を飲んでいます。ゆがんだ形を見るたびに、失敗も特別なものの一部になりうるのだと思い出します。',
    ],
    blanks: [
      { id: 'A', choices: ['without', 'with', 'for', 'by'], answer: 0, why: 'without any trouble「何の苦労もなく」。' },
      { id: 'B', choices: ['away', 'off', 'out of', 'down'], answer: 0, why: 'throw 〜 away「〜を捨てる」。' },
      { id: 'C', choices: ['had expected', 'expect', 'expecting', 'to expect'], answer: 0, why: 'カップがとどいた（過去）ときより前に「予想していた」ので過去完了 had expected。than I had expected「思っていたより」。' },
    ],
    tf: [
      { statement: '森先生はろくろの使い方を見せてくれた。', answer: true, why: '第1段落 showed us how to shape clay on a spinning wheel。' },
      { statement: '筆者は1回目でまっすぐなカップを作れた。', answer: false, why: '第2段落 何度も失敗し、やっとできたカップもゆがんでいた。' },
      { statement: '筆者は今、そのカップで毎朝牛乳を飲んでいる。', answer: true, why: '第3段落 Now I drink milk from it every morning。' },
    ],
    qa: [
      { q: 'What did Ms. Mori say to the writer?', choices: ['A cup does not have to be perfect to be loved.', 'Throw it away and make a new one.', 'Pottery is very easy.', 'The cup is too small.'], answer: 0, why: "第2段落 'A cup does not have to be perfect to be loved.'" },
    ],
  },
  {
    id: 'exam-river-project',
    title: 'Our River Project (Speech)',
    level: '高校入試（スピーチ）',
    paragraphs: [
      'Good morning, everyone. Today I want to talk about the small river that runs behind our school. Two years ago, it was full of plastic bags and cans, and nobody wanted to go ( A ) it.',
      'Our science club decided to do something. Every other Sunday, we picked up trash along the river, wearing gloves and carrying large bags. At first only five members came, but after we put up posters in town, many people started to join us. Last spring, more than fifty people, ( B ) children and elderly people, took part.',
      "Now the water is much cleaner, and we can see small fish swimming again. Some families even come to walk along the river on weekends. This project taught me that one person cannot change much alone, but when people work together, they can make a big difference. Why don't you join us next Sunday? We would be very happy ( C ) you there. Thank you for listening.",
    ],
    ja: [
      'みなさん、おはようございます。今日は、私たちの学校の裏を流れる小さな川についてお話ししたいと思います。2年前、その川はビニールぶくろや空きかんでいっぱいで、だれも近づこうとしませんでした。',
      '私たちの科学部は、何かしようと決めました。1週間おきの日曜日に、手ぶくろをして大きなふくろを持ち、川ぞいのごみを拾いました。はじめは部員が5人しか来ませんでしたが、町にポスターをはると、たくさんの人が参加してくれるようになりました。この前の春には、子どもやお年寄りをふくめ、50人以上が参加しました。',
      '今では水はずっときれいになり、また小さな魚が泳いでいるのが見られます。この活動から、一人では大きくは変えられないけれど、みんなで力を合わせれば大きなちがいを生むことができると学びました。次の日曜日、いっしょに参加しませんか。そこで会えたら、私たちはとてもうれしいです。ご清聴ありがとうございました。週末には川ぞいを散歩しに来る家族もいます。',
    ],
    blanks: [
      { id: 'A', choices: ['near', 'next', 'close', 'beside to'], answer: 0, why: 'go near 〜「〜に近づく」。close は close to 〜、next は next to 〜 の形で使う。' },
      { id: 'B', choices: ['including', 'included', 'include', 'includes'], answer: 0, why: 'including 〜「〜をふくめて」（前置詞のように使う）。' },
      { id: 'C', choices: ['to see', 'seeing', 'see', 'seen'], answer: 0, why: 'be happy to 〜「〜してうれしい」。' },
    ],
    tf: [
      { statement: '2年前、学校の裏の川はごみでいっぱいだった。', answer: true, why: '第1段落 it was full of plastic bags and cans。' },
      { statement: '最初から50人以上が参加していた。', answer: false, why: '第2段落 At first only five members came。' },
      { statement: '今では川に小さな魚が見られる。', answer: true, why: '第3段落 we can see small fish swimming again。' },
    ],
    qa: [
      { q: 'What did the club do to get more people to join?', choices: ['They put up posters in town.', 'They paid people money.', 'They cleaned the school.', 'They bought new bags.'], answer: 0, why: '第2段落 after we put up posters in town, many people started to join us。' },
    ],
  },
  {
    id: 'adv-disagreement',
    title: 'The Value of Disagreement',
    level: '難関大（評論）',
    paragraphs: [
      "Many of us try to avoid disagreement. Arguments can feel uncomfortable, and we may worry that challenging someone's opinion will damage our relationship with them. As a result, groups often reach decisions ( A ) anyone seriously questioning them, even when some members have doubts.",
      "Research on group decision-making, however, suggests that this comfort comes at a cost. When everyone agrees too quickly, important risks may be ignored, a problem sometimes called 'groupthink.' Teams that include members willing to raise objections tend to consider a ( B ) range of possibilities and make fewer serious mistakes.",
      'The key is to separate disagreement about ideas from conflict between people. When criticism is aimed at a plan rather than at the person who proposed it, disagreement can become a tool for thinking ( C ) than a threat to friendship. Learning to disagree well may therefore be as important as learning to agree.',
    ],
    ja: [
      '私たちの多くは、意見がくいちがうことを避けようとする。言い合いは気まずく感じられるし、だれかの意見に異をとなえると、その人との関係がこわれるのではないかと心配になるかもしれない。その結果、グループはしばしば、たとえ心の中で疑問をもつメンバーがいても、だれも本気で疑問をなげかけないまま物事を決めてしまう。',
      'しかし、集団での意思決定についての研究は、この居心地のよさには代償があることを示している。全員があまりにも早く賛成すると、大切な危険が見のがされることがある。これは「集団浅慮（グループシンク）」とよばれることもある問題だ。すすんで反対意見を出すメンバーがいるチームのほうが、より広い範囲の可能性を考え、重大なまちがいが少なくなる傾向がある。',
      '大切なのは、考えについての意見のちがいと、人どうしのあらそいを分けて考えることだ。批判が、それを提案した人ではなく計画に向けられているとき、意見のくいちがいは友情をおびやかすものではなく、考えるための道具になりうる。したがって、上手に反対することを学ぶのは、賛成することを学ぶのと同じくらい大切なのかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['without', 'with', 'for', 'by'], answer: 0, why: 'without anyone 〜ing「だれも〜しないまま」。' },
      { id: 'B', choices: ['wider', 'wide', 'widest', 'widely'], answer: 0, why: '反対意見がないチームとくらべて「より広い」範囲なので比較級 wider。a wide range of 〜 の比較級。' },
      { id: 'C', choices: ['rather', 'better', 'much', 'sooner'], answer: 0, why: 'A rather than B「BではなくA」。友情へのおどしではなく、考えるための道具。' },
    ],
    tf: [
      { statement: '意見がくいちがうことを、気まずく感じる人は多い。', answer: true, why: '第1段落 Arguments can feel uncomfortable。' },
      { statement: '研究によれば、全員がすぐに賛成するグループのほうがまちがいが少ない。', answer: false, why: '第2段落 反対意見を出すメンバーがいるチームのほうがまちがいが少ない。' },
      { statement: '筆者は、計画ではなく人を批判することが大切だと述べている。', answer: false, why: '第3段落 criticism is aimed at a plan rather than at the person（人ではなく計画に向ける）。' },
    ],
    qa: [
      { q: 'What is the key to useful disagreement, according to the author?', choices: ['Separating ideas from people.', 'Avoiding all arguments.', 'Agreeing quickly.', 'Criticizing the person who made the plan.'], answer: 0, why: '第3段落 The key is to separate disagreement about ideas from conflict between people。' },
    ],
  },
  {
    id: 'toefl-spider-silk',
    title: 'The Strength of Spider Silk',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      'Spider silk is one of the most remarkable materials in nature. For its weight, some types of silk are stronger than steel, and they can stretch much further ( A ) breaking. This rare combination of strength and flexibility has fascinated scientists for decades.',
      'Spiders produce silk in special glands and can make several different kinds, each with its own purpose. Some silk is sticky and used to catch insects, ( B ) other kinds are used to build the frame of a web or to wrap eggs.',
      'Because of these properties, scientists have long wanted to produce spider silk in large amounts. Farming spiders is difficult, however, since many species are territorial and may attack one another. Researchers are therefore trying to create similar fibers using bacteria or other organisms, hoping to use them in products such as medical threads and light, strong clothing. If they ( C ), spider silk could become part of everyday life.',
    ],
    ja: [
      'クモの糸は、自然界で最もおどろくべき材料の一つだ。重さのわりに、ある種類の糸ははがねより強く、切れるまでにずっと長くのびることができる。この強さとしなやかさのめずらしい組み合わせは、何十年も科学者たちの心をとらえてきた。',
      'クモは特別な腺で糸をつくり、いくつかの種類の糸をつくり分けることができる。それぞれに目的がある。ある糸はねばねばしていて虫をつかまえるのに使われ、一方でほかの種類の糸は巣のわく組みをつくったり、卵をくるんだりするのに使われる。',
      'こうした性質があるため、科学者たちはずっと前からクモの糸を大量につくりたいと考えてきた。しかしクモを飼って育てるのは難しい。多くの種はなわばり意識が強く、たがいにおそい合うことがあるからだ。そこで研究者たちは、細菌などの生き物を使って似たせんいをつくろうとしており、医療用の糸や、軽くてじょうぶな服などの製品に使いたいと考えている。もし成功すれば、クモの糸は日常生活の一部になるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['before', 'after', 'while', 'since'], answer: 0, why: 'stretch further before breaking「切れるまでにもっとのびる」。' },
      { id: 'B', choices: ['while', 'because', 'unless', 'until'], answer: 0, why: '対比の while「一方で」。ねばねばの糸と、ほかの用途の糸をくらべている。' },
      { id: 'C', choices: ['succeed', 'fail', 'stop', 'wait'], answer: 0, why: 'If they succeed「もし成功すれば」、日常生活の一部になる。' },
    ],
    tf: [
      { statement: 'Some spider silk is stronger than steel for its weight.', answer: true, why: '第1段落 For its weight, some types of silk are stronger than steel。' },
      { statement: 'Spiders produce only one kind of silk.', answer: false, why: '第2段落 can make several different kinds。' },
      { statement: 'Farming spiders is easy because they live peacefully together.', answer: false, why: '第3段落 many species are territorial and may attack one another。' },
    ],
    qa: [
      { q: 'Why are researchers using bacteria to make silk-like fibers?', choices: ['Because farming spiders is difficult.', 'Because bacteria are stronger than steel.', 'Because spiders cannot make silk.', 'Because silk is too cheap.'], answer: 0, why: '第3段落 Farming spiders is difficult ... Researchers are therefore trying to create similar fibers using bacteria。' },
    ],
  },
  {
    id: 'exam-bonsai',
    title: 'A Lesson from a Small Tree',
    level: '高校入試（随筆）',
    paragraphs: [
      'Our neighbor, Mr. Ueda, has more than thirty bonsai trees in his garden. Some of them are older than my parents. When I first saw them, I asked him how long it takes ( A ) a bonsai. He smiled and said, "A lifetime."',
      'Last year, he gave me a small pine tree and taught me how to take care of it. I had to water it every morning and cut only a few branches at a time. I wanted it to look beautiful quickly, so one day I cut ( B ) many branches. The tree became weak, and I was very worried.',
      "Mr. Ueda told me not to give up. 'Trees, like people, need time to recover,' he said. After three months, new green needles appeared. Now I check my tree every morning before school. Taking care of it has taught me that some of the most important things in life cannot ( C ).",
    ],
    ja: [
      '近所の上田さんは、庭に30本以上の盆栽を持っています。中には私の両親より年上のものもあります。はじめてそれを見たとき、私は盆栽を育てるのにどれくらいかかるのかたずねました。上田さんはほほえんで「一生だよ」と言いました。',
      '去年、上田さんは私に小さな松の木をくれて、世話のしかたを教えてくれました。毎朝水をやり、一度に少しの枝だけを切らなければなりませんでした。私は早くきれいな形にしたくて、ある日、枝を切りすぎてしまいました。木は弱ってしまい、私はとても心配しました。',
      '上田さんは、あきらめないようにと言いました。「木も人と同じで、元気になるには時間がいるんだよ」。3か月後、新しい緑の葉が出てきました。今では毎朝、学校に行く前に自分の木を見ています。盆栽の世話を通して、人生で最も大切なものの中には、急いではいけないものがあるのだと学びました。',
    ],
    blanks: [
      { id: 'A', choices: ['to grow', 'growing', 'grew', 'grown'], answer: 0, why: 'It takes 時間 to 〜「〜するのに（時間が）かかる」。' },
      { id: 'B', choices: ['too', 'very', 'so', 'much'], answer: 0, why: 'too many 〜「〜が多すぎる」。切りすぎて木が弱った。' },
      { id: 'C', choices: ['be rushed', 'rush', 'rushing', 'rushed'], answer: 0, why: '大切なものは「急がされる」側なので受け身 be rushed。cannot be rushed「急いではいけない・急がせられない」。' },
    ],
    tf: [
      { statement: '上田さんの盆栽の中には、筆者の両親より年上のものもある。', answer: true, why: '第1段落 Some of them are older than my parents。' },
      { statement: '筆者は枝を少しずつ切って、すぐにきれいな形にできた。', answer: false, why: '第2段落 one day I cut too many branches. The tree became weak。' },
      { statement: '3か月後、木に新しい葉が出てきた。', answer: true, why: '第3段落 After three months, new green needles appeared。' },
    ],
    qa: [
      { q: 'What did Mr. Ueda say about trees?', choices: ['Like people, they need time to recover.', 'They should be cut every day.', 'They grow very quickly.', 'They do not need water.'], answer: 0, why: "第3段落 'Trees, like people, need time to recover.'" },
    ],
  },
  {
    id: 'exam-lighthouse',
    title: 'The Lighthouse on the Cape',
    level: '高校入試（物語）',
    paragraphs: [
      'On a school trip, our class visited an old lighthouse on a rocky cape. A man named Mr. Nakano, who had worked there for many years, showed us around. He told us that before modern machines, a keeper had to climb the stairs every evening ( A ) light the lamp.',
      "One night, during a terrible storm, the power in the town went out. Mr. Nakano's teacher, the old keeper at that time, stayed awake all night to keep the light ( B ). Early the next morning, a small fishing boat that had been lost in the storm came safely back to the harbor.",
      "Today the lighthouse works automatically, and no keeper lives there anymore. But Mr. Nakano still visits it every week. 'Machines can keep the light on,' he said, 'but people must keep the story alive.' As we walked down the stairs, I understood why he ( C ) so proud of this place.",
    ],
    ja: [
      '修学旅行で、私たちのクラスは岩の多いみさきにある古い灯台をおとずれました。長年そこではたらいていた中野さんという男性が案内してくれました。中野さんは、今のような機械がなかったころ、灯台守は毎晩階段をのぼって明かりをつけなければならなかったと話してくれました。',
      'ある晩、ひどいあらしで町の電気が止まりました。そのころの年老いた灯台守で、中野さんの先生だった人は、明かりを消さないように一晩じゅう起きていました。次の日の朝早く、あらしで行方がわからなくなっていた小さな漁船が、無事に港にもどってきました。',
      '今では灯台は自動で動き、灯台守はもうそこに住んでいません。それでも中野さんは、今も毎週灯台をおとずれています。「明かりは機械がつけていられる。でも物語は、人が伝えていかなければならないんだ」と中野さんは言いました。階段を下りながら、私は中野さんがなぜこの場所をそんなにほこりに思っているのかがわかりました。',
    ],
    blanks: [
      { id: 'A', choices: ['to', 'for', 'and', 'so'], answer: 0, why: '目的を表す不定詞 to light「明かりをつけるために」。' },
      { id: 'B', choices: ['on', 'in', 'up', 'off'], answer: 0, why: 'keep the light on「明かりをつけたままにする」。' },
      { id: 'C', choices: ['was', 'is being', 'were', 'be'], answer: 0, why: '主語 he、過去の文（understood）なので was。be proud of 〜「〜をほこりに思う」。' },
    ],
    tf: [
      { statement: '中野さんは長年その灯台ではたらいていた。', answer: true, why: '第1段落 who had worked there for many years。' },
      { statement: 'あらしの夜、漁船は行方がわからなくなったまま帰ってこなかった。', answer: false, why: '第2段落 came safely back to the harbor（無事に港にもどった）。' },
      { statement: '今でも灯台守が灯台に住んでいる。', answer: false, why: '第3段落 no keeper lives there anymore。' },
    ],
    qa: [
      { q: 'What does Mr. Nakano think people must do?', choices: ['Keep the story of the lighthouse alive.', 'Turn on the light every night.', 'Fix the machines every week.', 'Build a new lighthouse.'], answer: 0, why: "第3段落 'people must keep the story alive.'" },
    ],
  },
  {
    id: 'exam-lost-found',
    title: 'The Lost-and-Found Box',
    level: '高校入試（体験文）',
    paragraphs: [
      'At our school, there is a big box near the entrance for things that students have lost. When I became a member of the student council, I was surprised to see how full it was. There were umbrellas, pencil cases, gloves, and even a pair of new shoes. Many of these things had been there ( A ) months.',
      "I wanted to return them to their owners, so I talked with the other members. We decided to take photos of the items and put them on the school board every Monday. We also wrote a short message: 'Is this yours? Please come to the student council room.' At first only a few students came, but after a month, more than half of the things ( B ) returned.",
      "One day, a first-year student came to get a small key holder. She said, 'My grandmother made this for me. I thought I had lost it forever.' She smiled and thanked us again and again. Through this activity, I learned that even a small idea can ( C ) someone happy. Now I want to find other ways to help people at our school.",
    ],
    ja: [
      '私たちの学校には、生徒が落とした物を入れる大きな箱が入り口の近くにあります。生徒会のメンバーになったとき、その箱がどれほどいっぱいかを見ておどろきました。かさ、筆箱、手ぶくろ、そして新しいくつまでありました。これらの物の多くは、何か月もそこにあったのです。',
      '私は持ち主に返したいと思い、ほかのメンバーと話し合いました。私たちは、落とし物の写真をとって、毎週月曜日に学校の掲示板にはることに決めました。また「これはあなたのものですか？ 生徒会室に来てください」という短いメッセージも書きました。最初は数人の生徒しか来ませんでしたが、1か月後には半分以上の物が持ち主に返されました。',
      'ある日、1年生の女の子が小さなキーホルダーを取りに来ました。彼女は「これは祖母が作ってくれたものなんです。もう二度と見つからないと思っていました」と言いました。彼女はほほえんで、何度も何度もお礼を言いました。この活動を通して、私は小さなアイデアでもだれかを幸せにできることを学びました。今は、学校の人たちを助けるほかの方法を見つけたいと思っています。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'since', 'during', 'by'], answer: 0, why: 'for months「何か月も（の間）」。期間の長さは for。' },
      { id: 'B', choices: ['had been', 'have', 'were being', 'has'], answer: 0, why: '「1か月後には返されていた」。過去のある時点までの完了・受け身なので had been returned。' },
      { id: 'C', choices: ['make', 'makes', 'making', 'to make'], answer: 0, why: '助動詞 can のあとは原形。make 人 happy「人を幸せにする」。' },
    ],
    tf: [
      { statement: '落とし物の箱には、新しいくつもあった。', answer: true, why: '第1段落 even a pair of new shoes。' },
      { statement: '生徒会は落とし物の写真を毎日掲示板にはった。', answer: false, why: '第2段落 every Monday（毎週月曜日）。' },
      { statement: '1年生の女の子のキーホルダーは祖母が作ったものだった。', answer: true, why: "第3段落 'My grandmother made this for me.'" },
    ],
    qa: [
      { q: 'What did the writer learn through the activity?', choices: ['Even a small idea can make someone happy.', 'The box should be thrown away.', 'Students never lose things.', 'Photos are too expensive to take.'], answer: 0, why: '第3段落 even a small idea can make someone happy。' },
    ],
  },
  {
    id: 'adv-forgetting',
    title: 'In Praise of Forgetting',
    level: '難関大（評論）',
    paragraphs: [
      'We usually treat forgetting as a failure of memory, something to be fought with notes, reminders, and endless review. Yet a growing number of researchers suggest that forgetting is not merely a weakness of the brain ( A ) one of its essential functions. A mind that kept every detail of every day would not be more powerful; it would be buried under its own records.',
      'Consider what memory is for. Its purpose is not to preserve the past exactly but to help us act wisely in the future. To do this, the brain must separate what is likely to matter again from what is not. Details that are never used gradually fade, while patterns that appear repeatedly are strengthened. Forgetting, in this sense, is a kind of editing, and good editing depends as much on what is cut as on what is ( B ).',
      'This view has practical consequences. Students who try to remember everything often end up understanding little, because they give equal weight to the important and the trivial. Those who learn well tend to focus on the structure of a subject and allow minor facts to slip away. The lesson is not that we should stop trying to remember, but that we should stop ( C ) every lost detail as a defeat.',
    ],
    ja: [
      '私たちはふつう、忘れることを記憶の失敗とみなし、メモや通知や終わりのない復習で戦うべきものだと考えている。しかし、忘却は脳の弱点にすぎないのではなく、その欠かせない働きの一つなのだと主張する研究者がふえている。毎日のあらゆる細部を保ち続ける心は、より強力になるのではなく、自らの記録の下にうもれてしまうだろう。',
      '記憶が何のためにあるのかを考えてみよう。その目的は過去を正確に保存することではなく、未来において賢く行動する助けとなることだ。そのために脳は、また重要になりそうなものとそうでないものを分けなければならない。一度も使われない細部はしだいに薄れ、くり返し現れるパターンは強められる。この意味で忘却は一種の編集であり、よい編集は、何を残すかと同じくらい、何を削るかにかかっている。',
      'この見方には実際的な意味がある。すべてを覚えようとする学生は、重要なこととささいなことに同じ重みを与えてしまうため、結局ほとんど理解できないことが多い。よく学ぶ人は、科目の構造に集中し、細かな事実がこぼれ落ちるのを許す傾向がある。教訓は、覚えようとするのをやめるべきだということではなく、失われた細部の一つ一つを敗北とみなすのをやめるべきだということである。',
    ],
    blanks: [
      { id: 'A', choices: ['but', 'and', 'or', 'so'], answer: 0, why: 'not merely A but B「単に A ではなく B」。' },
      { id: 'B', choices: ['kept', 'lost', 'printed', 'sold'], answer: 0, why: 'cut（削る）と対になるのは kept（残す）。' },
      { id: 'C', choices: ['treating', 'to treat', 'treat', 'treated'], answer: 0, why: 'stop -ing「〜するのをやめる」。treat A as B「A を B とみなす」。' },
    ],
    tf: [
      { statement: '筆者は、あらゆる細部を覚えている心はより強力になると考えている。', answer: false, why: '第1段落 would not be more powerful; it would be buried。' },
      { statement: '記憶の目的は、未来に賢く行動する助けとなることだとされている。', answer: true, why: '第2段落 to help us act wisely in the future。' },
      { statement: '筆者は、覚えようとすること自体をやめるべきだと主張している。', answer: false, why: '第3段落 The lesson is not that we should stop trying to remember。' },
    ],
    qa: [
      { q: 'Why do students who try to remember everything often understand little?', choices: ['They give equal weight to important and trivial things.', 'They do not take enough notes.', 'They forget the structure of every subject.', 'They review too little.'], answer: 0, why: '第3段落 because they give equal weight to the important and the trivial。' },
    ],
  },
  {
    id: 'toefl-tides',
    title: 'What Causes the Tides?',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "Twice a day, the level of the sea along most coasts rises and falls. These regular changes, known as tides, are caused mainly by the Moon's gravity. Because the side of the Earth facing the Moon is closer to it, the water there is pulled slightly more strongly ( A ) the Earth as a whole, creating a bulge of water.",
      'Surprisingly, a second bulge forms on the opposite side of the planet. There, the water is pulled less strongly than the solid Earth, so it is effectively left behind. As the Earth rotates, a given coastline passes through both bulges each day, which is ( B ) most places experience two high tides and two low tides roughly every twenty-four hours.',
      "The Sun also affects the tides, although its influence is less than half that of the Moon because it is so much farther away. When the Sun, Moon, and Earth line up, at new moon and full moon, their effects combine to produce especially large 'spring tides.' When the Sun and Moon pull at right angles, the result is weaker 'neap tides.' The shape of the coast and the depth of the sea can also ( C ) the size of tides, which is why some bays see differences of more than ten meters.",
    ],
    ja: [
      'ほとんどの海岸では、1日に2回、海面が上がったり下がったりする。潮の満ち引きとして知られるこの規則的な変化は、主に月の引力によって起こる。地球の月に面した側は月により近いため、そこの水は地球全体よりもわずかに強く引っぱられ、水のふくらみができる。',
      'おどろくべきことに、地球の反対側にも2つ目のふくらみができる。そこでは、水は固い地球よりも弱く引っぱられるため、実質的に取り残されるのである。地球が自転するにつれて、ある海岸は1日のうちに両方のふくらみを通過する。これが、ほとんどの場所で約24時間ごとに満潮と干潮が2回ずつ起こる理由である。',
      '太陽も潮に影響を与えるが、ずっと遠くにあるため、その影響は月の半分にも満たない。新月と満月のとき、太陽・月・地球が一直線にならぶと、それぞれの効果が合わさって、とくに大きな「大潮」が生じる。太陽と月が直角の方向に引っぱるときは、弱い「小潮」となる。海岸の形や海の深さも潮の大きさを変えることがあり、そのため10メートル以上の差が見られる湾もある。',
    ],
    blanks: [
      { id: 'A', choices: ['than', 'as', 'by', 'from'], answer: 0, why: 'more strongly than 〜「〜より強く」。比較級 ＋ than。' },
      { id: 'B', choices: ['why', 'what', 'because', 'how much'], answer: 0, why: 'which is why 〜「そしてそれが〜の理由だ」。' },
      { id: 'C', choices: ['change', 'changes', 'changing', 'to change'], answer: 0, why: '助動詞 can のあとは原形。' },
    ],
    tf: [
      { statement: '潮の満ち引きは、主に太陽の引力によって起こる。', answer: false, why: "第1段落 caused mainly by the Moon's gravity。" },
      { statement: '月と反対側の地球にも、水のふくらみができる。', answer: true, why: '第2段落 a second bulge forms on the opposite side。' },
      { statement: '大潮は、太陽と月が直角の方向に引っぱるときに起こる。', answer: false, why: '第3段落 直角のときは neap tides（小潮）。大潮は一直線にならぶとき。' },
    ],
    qa: [
      { q: "Why is the Sun's effect on the tides smaller than the Moon's?", choices: ['The Sun is much farther away.', 'The Sun is smaller than the Moon.', 'The Sun has no gravity.', 'The Sun moves too fast.'], answer: 0, why: '第3段落 because it is so much farther away。' },
    ],
  },
  {
    id: 'exam-video-call',
    title: "Grandpa's First Video Call",
    level: '高校入試（体験文）',
    paragraphs: [
      "My grandfather lives alone in a small town far from our city. Last spring, my parents gave him a tablet so that we could see each other more often. However, he did not use it at all. When I called him, he said, 'These machines are too difficult ( A ) old people like me.'",
      "During summer vacation, I stayed at his house for a week and decided to teach him. First, I wrote the steps on a large card with big letters. Then we practiced together every evening. He made many mistakes, but I never laughed at him. On the fifth day, he ( B ) a video call to my mother by himself. When her face appeared on the screen, he shouted, 'I did it!'",
      "Now he calls us almost every Sunday. He even shows us the vegetables he grows in his garden. Teaching him was not easy, but I learned something important. When we try to help someone, being patient is as important ( C ) knowing the answer. I am glad that the distance between us feels much shorter now.",
    ],
    ja: [
      '私の祖父は、私たちの住む町から遠くはなれた小さな町に一人で住んでいます。去年の春、両親は私たちがもっと会えるように、祖父にタブレットをおくりました。しかし、祖父はまったく使いませんでした。電話をすると、祖父は「こういう機械は、わしのような年寄りにはむずかしすぎる」と言いました。',
      '夏休みに、私は祖父の家に1週間とまり、使い方を教えることにしました。まず、大きな文字で手順を大きなカードに書きました。それから毎晩いっしょに練習しました。祖父はたくさんまちがえましたが、私は決して笑いませんでした。5日目に、祖父は自分だけで母にビデオ通話をかけました。画面に母の顔が映ると、祖父は「できたぞ！」とさけびました。',
      '今では祖父はほとんど毎週日曜日に電話をくれます。庭で育てている野菜まで見せてくれます。教えるのは簡単ではありませんでしたが、私は大切なことを学びました。だれかを助けようとするとき、がまん強くあることは、答えを知っていることと同じくらい大切なのです。私たちのあいだの距離が、今ではずっと短く感じられることをうれしく思います。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'of', 'at', 'with'], answer: 0, why: 'too 〜 for 人「人にとって〜すぎる」。' },
      { id: 'B', choices: ['made', 'did', 'took', 'got'], answer: 0, why: 'make a call「電話をかける」。過去の文なので made。' },
      { id: 'C', choices: ['as', 'than', 'so', 'like'], answer: 0, why: 'as 〜 as …「…と同じくらい〜」。' },
    ],
    tf: [
      { statement: '祖父はタブレットをもらってすぐに使いはじめた。', answer: false, why: '第1段落 he did not use it at all。' },
      { statement: '筆者は手順を大きな文字でカードに書いた。', answer: true, why: '第2段落 I wrote the steps on a large card with big letters。' },
      { statement: '祖父は今、ほとんど毎週日曜日に電話をくれる。', answer: true, why: '第3段落 he calls us almost every Sunday。' },
    ],
    qa: [
      { q: 'What did the writer learn?', choices: ['Being patient is as important as knowing the answer.', 'Tablets are too difficult for everyone.', 'Video calls are better than visiting.', 'Grandparents should not live alone.'], answer: 0, why: '第3段落 being patient is as important as knowing the answer。' },
    ],
  },
  {
    id: 'toefl-aurora',
    title: 'Lights in the Polar Sky',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "On dark nights in places such as northern Norway, Canada, and Alaska, curtains of green and red light sometimes move slowly across the sky. These displays, called auroras, begin about 150 million kilometers away, at the Sun. The Sun constantly releases a stream of electrically charged particles known as the solar wind, ( A ) travels through space toward the Earth.",
      "Most of these particles never reach the ground, because the Earth is surrounded by a magnetic field that acts like an invisible shield. However, the field guides some of the particles toward the regions around the North and South Poles. There, high in the atmosphere, they crash into atoms of oxygen and nitrogen. The energy from these collisions is ( B ) as light.",
      "The color of an aurora depends on which gas is hit and at what height. Oxygen usually produces green light, the most common color, while oxygen at greater heights can give off red. Nitrogen tends to create blue or purple edges. When the Sun is especially active, stronger streams of particles can push auroras far from the poles, and on rare occasions they have even ( C ) seen in Hokkaido.",
    ],
    ja: [
      'ノルウェー北部、カナダ、アラスカなどの暗い夜には、緑や赤の光のカーテンがゆっくりと空を動くことがある。オーロラとよばれるこの光の現象は、約1億5000万キロメートルはなれた太陽から始まる。太陽は、太陽風として知られる電気をおびた粒子の流れをたえず放出しており、それが宇宙を通って地球へ向かう。',
      'これらの粒子のほとんどは地上にとどかない。地球は目に見えない盾のように働く磁場に囲まれているからである。しかし磁場は、粒子の一部を北極と南極のまわりの地域へとみちびく。そこで、大気の高いところで、粒子は酸素や窒素の原子にぶつかる。この衝突によるエネルギーが光として放たれるのである。',
      'オーロラの色は、どの気体にどの高さでぶつかるかによって決まる。酸素はふつう、もっともよく見られる色である緑の光を出し、さらに高いところの酸素は赤い光を出すことがある。窒素は青や紫のふちをつくりやすい。太陽がとくに活発なときには、より強い粒子の流れがオーロラを極から遠くまでおし出し、まれに北海道で見られたことさえある。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'where', 'who'], answer: 0, why: '先行詞 the solar wind（もの）を受けてコンマのあとで説明する関係代名詞 which。' },
      { id: 'B', choices: ['released', 'stopped', 'hidden', 'cooled'], answer: 0, why: '衝突のエネルギーが光として「放たれる（released）」。' },
      { id: 'C', choices: ['been', 'be', 'being', 'was'], answer: 0, why: 'have ＋ been ＋ 過去分詞（seen）で完了形の受け身。' },
    ],
    tf: [
      { statement: 'オーロラのもとになる粒子は太陽から来る。', answer: true, why: '第1段落 begin ... at the Sun / the solar wind。' },
      { statement: '太陽風の粒子のほとんどは地上までとどく。', answer: false, why: '第2段落 Most of these particles never reach the ground。' },
      { statement: 'もっともよく見られるオーロラの色は青である。', answer: false, why: '第3段落 green light, the most common color。' },
    ],
    qa: [
      { q: "What does the Earth's magnetic field do, according to the passage?", choices: ['It guides some particles toward the polar regions.', 'It creates the solar wind.', 'It changes nitrogen into oxygen.', 'It makes auroras appear only in the day.'], answer: 0, why: '第2段落 the field guides some of the particles toward the regions around the North and South Poles。' },
    ],
  },
  {
    id: 'adv-measure-target',
    title: 'When Numbers Become Goals',
    level: '難関大（評論）',
    paragraphs: [
      'Modern organizations love numbers. Schools count test scores, hospitals count waiting times, and companies count sales. Numbers seem objective, and they allow us to compare performance across places and years. Yet there is a hidden danger in relying on them too heavily: once a number is used to judge people, it often stops telling us what we ( A ) wanted to know.',
      'The reason is simple. A number is usually chosen because it reflects something we care about, such as learning or health. But when people are rewarded or punished according to that number, they naturally look for the fastest way to raise it, which is not always the same as improving the thing it was meant to reflect. A school under pressure may spend weeks practicing test questions instead of developing real understanding. The score rises, ( B ) the learning it was supposed to show may not.',
      'None of this means that we should abandon measurement. Without numbers, it would be hard to notice problems or to see whether our efforts are working. The lesson is rather that a measure is a tool for thinking, not a ( C ) for it. Wise organizations use several indicators, look at them together, and remember that what cannot be counted easily may still be what matters most.',
    ],
    ja: [
      '現代の組織は数字を好む。学校はテストの点数を、病院は待ち時間を、企業は売り上げを数える。数字は客観的に見え、場所や年をこえて成果を比べることを可能にする。しかし、数字に頼りすぎることには隠れた危険がある。ある数字が人を評価するために使われると、それはしばしば、私たちが本来知りたかったことを教えてくれなくなるのだ。',
      '理由は単純である。数字はふつう、学びや健康のような、私たちが大切に思う何かを反映するから選ばれる。しかし人々がその数字によって報われたり罰せられたりすると、人は当然それを上げるもっとも早い方法をさがすが、それはその数字が反映するはずだったものを改善することと、いつも同じとはかぎらない。圧力を受けた学校は、本当の理解を育てるかわりに、何週間もテストの問題の練習に費やすかもしれない。点数は上がるが、それが示すはずだった学びは上がらないかもしれない。',
      'だからといって、測ることをやめるべきだというわけではない。数字がなければ、問題に気づいたり、努力が実を結んでいるかを確かめたりするのはむずかしいだろう。むしろ教訓は、指標は考えるための道具であって、考えることの代わりではないということだ。賢い組織はいくつかの指標を使い、それらをいっしょに見て、簡単には数えられないものこそが、もっとも大切なものかもしれないことを忘れない。',
    ],
    blanks: [
      { id: 'A', choices: ['originally', 'never', 'hardly', 'recently'], answer: 0, why: '「本来（もともと）知りたかったこと」なので originally。' },
      { id: 'B', choices: ['but', 'so', 'because', 'unless'], answer: 0, why: '「点数は上がる、しかし学びは上がらないかもしれない」という対比なので but。' },
      { id: 'C', choices: ['substitute', 'reason', 'result', 'chance'], answer: 0, why: 'a tool for thinking, not a substitute for it「考えるための道具であり、考えることの代わりではない」。' },
    ],
    tf: [
      { statement: '筆者は、数字で人を評価すると、その数字が本来の目的を反映しなくなることがあると述べている。', answer: true, why: '第1段落 it often stops telling us what we originally wanted to know。' },
      { statement: '筆者は、組織は測ることをやめるべきだと主張している。', answer: false, why: '第3段落 None of this means that we should abandon measurement。' },
      { statement: '筆者は、指標は一つだけにしぼって見るのがよいと考えている。', answer: false, why: '第3段落 Wise organizations use several indicators。' },
    ],
    qa: [
      { q: 'Why might a school under pressure spend weeks practicing test questions?', choices: ['To raise the score quickly, even if real understanding does not improve.', 'Because students prefer tests to lessons.', 'Because tests are the only way to learn.', 'To reduce the number of teachers.'], answer: 0, why: '第2段落 they naturally look for the fastest way to raise it。' },
    ],
  },
  {
    id: 'exam-chorus',
    title: 'Our Class Chorus Contest',
    level: '高校入試（体験文）',
    paragraphs: [
      "Every autumn, our school holds a chorus contest. This year, I was chosen as the conductor of my class. I was happy, but I was also worried because I had never ( A ) a group before. At our first practice, many students were talking, and only a few were singing seriously.",
      "I did not know what to do, so I asked our music teacher for advice. She said, 'Don't try to control everyone. First, tell them why you want to sing this song.' The next day, I told my classmates that the song was about friends who support each other, and that I wanted to make it our song. After that, the classroom became quiet, and everyone began to listen ( B ) each other's voices.",
      "On the day of the contest, we did not win first prize. But when we finished singing, the audience clapped for a long time. Some of my classmates were crying with joy. I learned that a leader does not have to be the strongest person. A good leader is someone who can ( C ) a goal with others.",
    ],
    ja: [
      '毎年秋に、私たちの学校では合唱コンクールが開かれます。今年、私はクラスの指揮者に選ばれました。うれしかったのですが、それまで一度もグループをまとめたことがなかったので心配でもありました。最初の練習では、多くの生徒がおしゃべりをしていて、真剣に歌っていたのは数人だけでした。',
      'どうしたらいいかわからなかったので、私は音楽の先生にアドバイスを求めました。先生は「みんなを思いどおりにしようとしないで。まず、なぜこの歌を歌いたいのかを伝えなさい」と言いました。次の日、私はクラスのみんなに、この歌はささえ合う友だちについての歌で、これを私たちの歌にしたいと伝えました。そのあと教室は静かになり、みんながおたがいの声に耳をかたむけはじめました。',
      'コンクールの日、私たちは1位にはなれませんでした。でも歌い終わると、観客は長いあいだ拍手をしてくれました。クラスの何人かはうれしくて泣いていました。私は、リーダーは一番強い人である必要はないことを学びました。よいリーダーとは、目標をほかの人と分かち合える人なのです。',
    ],
    blanks: [
      { id: 'A', choices: ['led', 'lead', 'leading', 'to lead'], answer: 0, why: 'had never ＋ 過去分詞（過去完了の経験）。lead の過去分詞は led。' },
      { id: 'B', choices: ['to', 'at', 'for', 'on'], answer: 0, why: 'listen to 〜「〜を聞く」。' },
      { id: 'C', choices: ['share', 'shares', 'shared', 'sharing'], answer: 0, why: '助動詞 can のあとは原形。share 〜 with 人「〜を人と分かち合う」。' },
    ],
    tf: [
      { statement: '筆者は以前にもグループをまとめたことがあった。', answer: false, why: '第1段落 I had never led a group before。' },
      { statement: '音楽の先生は、まず歌いたい理由を伝えるように言った。', answer: true, why: "第2段落 'First, tell them why you want to sing this song.'" },
      { statement: '筆者のクラスはコンクールで1位になった。', answer: false, why: '第3段落 we did not win first prize。' },
    ],
    qa: [
      { q: 'What did the writer learn about leaders?', choices: ['A good leader can share a goal with others.', 'A leader must be the strongest person.', 'A leader should control everyone.', 'A leader must sing better than others.'], answer: 0, why: '第3段落 A good leader is someone who can share a goal with others。' },
    ],
  },
  {
    id: 'toefl-bamboo',
    title: 'The Fastest-Growing Plant',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      'Although bamboo can grow as tall as a tree, it is actually a type of grass. Some species are among the fastest-growing plants on Earth: under ideal conditions, a single stem can grow almost a meter in one day. This remarkable speed has made bamboo the subject of much scientific interest, ( A ) as a building material and as a model for understanding plant growth.',
      'The secret lies partly in how a bamboo stem is built. A young shoot already contains all of its sections, packed tightly together like a folded telescope. Rather than producing large numbers of new cells, the plant mainly lengthens the cells it already has by filling them with water. In addition, the shoot does not need to collect all of its energy by itself, ( B ) it is connected to an underground network of stems that stores food made by older plants.',
      'Bamboo is also unusual in the way it reproduces. Many species flower only once every several decades, and when they do, all the plants of the same species in a wide area tend to flower at the same time and then die. Scientists are still not sure what ( C ) this timing, but one idea is that producing a huge number of seeds at once means that animals cannot eat them all.',
    ],
    ja: [
      '竹は木と同じくらい高く育つことがあるが、実はイネ科の草の一種である。いくつかの種は地球上でもっとも成長の速い植物の一つで、理想的な条件のもとでは、1本の茎が1日でほぼ1メートルのびることがある。このおどろくべき速さによって、竹は建築材料としても、植物の成長を理解するための手本としても、多くの科学的関心の対象となってきた。',
      'その秘密の一部は、竹の茎のつくりにある。若いたけのこは、すでにすべての節を、たたんだ望遠鏡のようにぎっしりつめた形でふくんでいる。竹は新しい細胞を大量につくるよりも、主にすでにある細胞に水をみたしてのばしている。さらに、たけのこは自分だけでエネルギーをすべて集める必要がない。古い竹がつくった養分をたくわえている地下茎のネットワークにつながっているからである。',
      '竹は子孫の残し方も変わっている。多くの種は数十年に一度しか花をさかせず、さかせるときには、広い地域の同じ種の竹がいっせいに花をさかせ、そのあとかれてしまう傾向がある。科学者たちは何がこの時期を決めているのかをまだはっきりとは知らないが、一つの考えは、一度に大量の種をつくれば、動物がそのすべてを食べることはできないというものである。',
    ],
    blanks: [
      { id: 'A', choices: ['both', 'either', 'neither', 'not'], answer: 0, why: 'both A and B「A も B も」。as a building material and as a model と and でつながっている。' },
      { id: 'B', choices: ['because', 'although', 'unless', 'so that'], answer: 0, why: '「地下茎につながっているから」エネルギーを全部自分で集める必要がない、という理由。' },
      { id: 'C', choices: ['controls', 'control', 'controlling', 'to control'], answer: 0, why: '疑問詞 what が主語の間接疑問。what controls this timing「何がこの時期を決めているか」。' },
    ],
    tf: [
      { statement: '竹は木の一種である。', answer: false, why: '第1段落 it is actually a type of grass。' },
      { statement: '竹は主に、すでにある細胞に水をみたしてのびる。', answer: true, why: '第2段落 lengthens the cells it already has by filling them with water。' },
      { statement: '竹がいっせいに花をさかせる理由は、すでに完全にわかっている。', answer: false, why: '第3段落 Scientists are still not sure。' },
    ],
    qa: [
      { q: 'According to one idea, why might bamboo produce many seeds at once?', choices: ['So that animals cannot eat all of them.', 'Because the plants need more water.', 'So that the stems grow taller.', 'Because the underground stems die first.'], answer: 0, why: '第3段落 animals cannot eat them all。' },
    ],
  },
  {
    id: 'exam-kindergarten',
    title: 'Three Days at a Kindergarten',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last June, I took part in a work experience program and spent three days at a kindergarten near my school. I chose this place because I like small children, but I soon found that taking care of them was much harder ( A ) I had imagined.",
      "On the first day, I tried to read a picture book to a group of children. However, they did not listen to me at all. Some ran around the room, and others started to play with blocks. I felt sad. Then one of the teachers, Ms. Kato, gave me some advice. 'Children can tell whether you are enjoying the story or not,' she said. 'Try reading it as ( B ) you were one of the characters.'",
      "On the last day, I read the same book again. This time, I changed my voice for each animal and moved my hands a lot. The children laughed and asked me to read it again. When I said goodbye, a boy gave me a drawing of me holding the book. I learned that to ( C ) others interested, we must first enjoy what we are doing ourselves.",
    ],
    ja: [
      'この前の6月、私は職場体験のプログラムに参加し、学校の近くの幼稚園で3日間をすごしました。小さな子どもが好きなのでこの場所を選びましたが、子どもたちの世話をするのは想像していたよりずっと大変だとすぐにわかりました。',
      '1日目、私は子どもたちのグループに絵本を読もうとしました。しかし、子どもたちはまったく聞いてくれませんでした。部屋を走り回る子もいれば、積み木で遊びはじめる子もいました。私は悲しくなりました。そのとき、先生の一人の加藤先生がアドバイスをくれました。「子どもたちには、あなたがお話を楽しんでいるかどうかがわかるのよ。登場人物の一人になったつもりで読んでごらん」と先生は言いました。',
      '最終日、私はもう一度同じ本を読みました。今度は動物ごとに声を変えて、手をたくさん動かしました。子どもたちは笑って、もう一度読んでとたのみました。さよならを言うとき、ある男の子が、本を持った私の絵をくれました。私は、ほかの人に興味をもってもらうには、まず自分がしていることを自分で楽しまなければならないのだと学びました。',
    ],
    blanks: [
      { id: 'A', choices: ['than', 'as', 'that', 'then'], answer: 0, why: '比較級 harder のあとは than。much harder than I had imagined「想像していたよりずっと大変」。' },
      { id: 'B', choices: ['if', 'that', 'because', 'so'], answer: 0, why: 'as if ＋ 過去形（were）で「まるで〜であるかのように」。' },
      { id: 'C', choices: ['make', 'makes', 'made', 'making'], answer: 0, why: '不定詞 to のあとは原形。make 人 interested「人に興味をもたせる」。' },
    ],
    tf: [
      { statement: '筆者は小さな子どもが好きなので幼稚園を選んだ。', answer: true, why: '第1段落 I chose this place because I like small children。' },
      { statement: '1日目、子どもたちは筆者の読む絵本を静かに聞いた。', answer: false, why: '第2段落 they did not listen to me at all。' },
      { statement: '最終日、筆者は動物ごとに声を変えて読んだ。', answer: true, why: '第3段落 I changed my voice for each animal。' },
    ],
    qa: [
      { q: 'What did the writer learn?', choices: ['We must enjoy what we are doing to make others interested.', 'Children do not like picture books.', 'Teachers should not give advice.', 'Reading quietly is the best way.'], answer: 0, why: '第3段落最後の文。' },
    ],
  },
  {
    id: 'adv-curiosity',
    title: 'The Discomfort of Curiosity',
    level: '難関大（評論）',
    paragraphs: [
      'Curiosity is usually described as a pleasant feeling, the spark that makes children ask endless questions and scientists stay late in their laboratories. Yet curiosity begins with a small discomfort: the awareness that there is a gap between what we know and what we would like to know. It is precisely ( A ) this gap is uncomfortable that we feel driven to close it.',
      'Interestingly, curiosity seems to be strongest not when we know nothing about a subject, but when we know a little. A person who has never heard of black holes is unlikely to wonder about them, while someone who has read a short article may suddenly find the topic impossible to ignore. Knowledge, in other words, does not satisfy curiosity so much as ( B ) it, by revealing how much remains unknown.',
      'This has an important consequence for education. If teachers present only finished answers, students may never experience the useful tension of not knowing. A better approach may be to give learners just enough information to notice a gap and then let them search for the rest. Curiosity, from this point of view, is not a gift that some people have and others lack, but a state that can be ( C ) by the way questions are asked.',
    ],
    ja: [
      '好奇心はふつう、子どもに果てしなく質問させたり、科学者を研究室に遅くまで残らせたりする火花のような、心地よい感情として語られる。しかし好奇心は、ちょっとした居心地の悪さから始まる。自分が知っていることと知りたいことのあいだにすき間があるという自覚である。まさにこのすき間が居心地悪いからこそ、私たちはそれをうめようとかり立てられるのだ。',
      '興味深いことに、好奇心がもっとも強くなるのは、ある話題について何も知らないときではなく、少し知っているときであるらしい。ブラックホールについて聞いたことのない人がそれについて考えることはまずないが、短い記事を読んだ人は、急にその話題を無視できなくなるかもしれない。つまり知識は、好奇心を満たすというよりも、まだ知られていないことがどれほど多いかを明らかにすることで、好奇心をかき立てるのである。',
      'このことは教育にとって重要な意味をもつ。教師が完成した答えだけを示せば、生徒は知らないことの有益な緊張感を一度も味わわないかもしれない。よりよいやり方は、学ぶ人にすき間に気づくのにちょうど十分な情報を与え、残りは自分でさがさせることかもしれない。この見方からすれば、好奇心は一部の人にはあってほかの人にはない才能ではなく、問いの立て方によって生み出すことのできる状態なのである。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'although', 'unless', 'whether'], answer: 0, why: 'It is precisely because 〜 that …「まさに〜だからこそ…」（強調構文）。' },
      { id: 'B', choices: ['stimulates', 'ends', 'hides', 'forgets'], answer: 0, why: 'not satisfy 〜 so much as stimulate「満たすというよりかき立てる」。主語 Knowledge なので -s。' },
      { id: 'C', choices: ['created', 'creating', 'create', 'creates'], answer: 0, why: 'can be ＋ 過去分詞（受け身）「生み出されうる」。' },
    ],
    tf: [
      { statement: '筆者は、好奇心は居心地の悪さから始まると述べている。', answer: true, why: '第1段落 curiosity begins with a small discomfort。' },
      { statement: '好奇心は、何も知らないときにもっとも強くなる。', answer: false, why: '第2段落 not when we know nothing ... but when we know a little。' },
      { statement: '筆者は、好奇心は生まれつきの才能で、育てることはできないと考えている。', answer: false, why: '第3段落 not a gift ... but a state that can be created。' },
    ],
    qa: [
      { q: 'What does the writer suggest teachers should do?', choices: ['Give learners just enough information to notice a gap.', 'Present only finished answers.', 'Avoid asking any questions.', 'Tell students everything about a topic.'], answer: 0, why: '第3段落 give learners just enough information to notice a gap。' },
    ],
  },
  {
    id: 'toefl-caffeine',
    title: 'How Caffeine Keeps Us Awake',
    level: 'TOEFL・IELTS（医学）',
    paragraphs: [
      "Millions of people start their day with a cup of coffee or tea, relying on the caffeine it contains to feel alert. To understand how caffeine works, we first need to understand why we become sleepy. While we are awake, our brain cells use energy, and in the process a substance called adenosine gradually builds up. When adenosine attaches to special receptors on brain cells, it slows their activity, ( A ) makes us feel tired.",
      "Caffeine has a shape very similar to that of adenosine. As a result, it can fit into the same receptors, but it does not activate them. Instead, it simply blocks them, so adenosine can no longer deliver its message. The tiredness has not disappeared; it has only been ( B ). This is why people often feel suddenly exhausted when the effect of caffeine wears off.",
      "In most adults, about half of the caffeine in a drink is still in the body around five hours later, although this varies greatly from person to person. For this reason, a cup of coffee in the late afternoon can make it difficult to fall asleep at night. In addition, people who drink coffee every day may find that it seems to work less well over time, partly because the brain ( C ) by producing more adenosine receptors.",
    ],
    ja: [
      '何百万もの人々が、1ぱいのコーヒーや紅茶で一日を始め、それにふくまれるカフェインにたよって目をさましている。カフェインがどのように働くかを理解するには、まずなぜ私たちが眠くなるのかを理解する必要がある。起きているあいだ、脳の細胞はエネルギーを使い、その過程でアデノシンとよばれる物質がしだいにたまっていく。アデノシンが脳の細胞にある特別な受容体にくっつくと、細胞の活動がおそくなり、それによって私たちは疲れを感じる。',
      'カフェインはアデノシンととてもよく似た形をしている。そのため、同じ受容体にはまりこむことができるが、受容体を働かせることはない。かわりに受容体をふさぐだけなので、アデノシンはもうその信号を伝えられなくなる。疲れが消えたわけではなく、かくされているだけなのである。カフェインの効果が切れると急にひどく疲れを感じることが多いのはそのためだ。',
      'たいていの大人では、飲み物にふくまれるカフェインのおよそ半分が、5時間ほどたってもまだ体の中に残っているが、これは人によって大きくちがう。そのため、夕方近くに飲む1ぱいのコーヒーで、夜ねむりにつきにくくなることがある。さらに、毎日コーヒーを飲む人は、時間がたつにつれてききめが弱くなっていくように感じることがあるが、その理由の一つは、脳がアデノシンの受容体をふやして順応するからである。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'who', 'where'], answer: 0, why: '前の内容（活動がおそくなること）全体を受ける関係代名詞 which（, which 〜「そしてそれが〜」）。' },
      { id: 'B', choices: ['hidden', 'cured', 'doubled', 'shared'], answer: 0, why: '「疲れは消えたのではなく、かくされた（hidden）だけ」。' },
      { id: 'C', choices: ['adapts', 'sleeps', 'stops', 'forgets'], answer: 0, why: '受容体をふやして「順応する（adapts）」。' },
    ],
    tf: [
      { statement: 'アデノシンは起きているあいだにしだいにたまる。', answer: true, why: '第1段落 adenosine gradually builds up。' },
      { statement: 'カフェインはアデノシンの受容体を働かせて目をさまさせる。', answer: false, why: '第2段落 it does not activate them. Instead, it simply blocks them。' },
      { statement: 'カフェインが体に残る時間は、だれでも同じである。', answer: false, why: '第3段落 this varies greatly from person to person。' },
    ],
    qa: [
      { q: 'Why might coffee seem to work less well for people who drink it every day?', choices: ['The brain produces more adenosine receptors.', 'Their coffee contains less caffeine.', 'Adenosine disappears from their brains.', 'They sleep too much at night.'], answer: 0, why: '第3段落 the brain adapts by producing more adenosine receptors。' },
    ],
  },
  {
    id: 'exam-drill',
    title: 'The Town Evacuation Drill',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last November, my town held an evacuation drill, and our school asked students to join it. Before the drill, I thought it would be easy. I just had to walk to the elementary school, which is used ( A ) a shelter when there is a disaster.",
      "On the day of the drill, I walked with an old woman who lives alone next to my house. She walks with a cane, so we moved very slowly. On the way, we found that a narrow road was blocked by a broken wall. We had to choose another way, and it took us almost forty minutes to arrive. I was surprised. If a real earthquake happened, I might not be able to help her ( B ) enough.",
      "After the drill, I talked about my experience in class. My classmates and I decided to make a map of safe roads for people who cannot walk fast. We checked the roads one by one and gave the map to our neighbors. Through this experience, I learned that preparing for disasters is not something we can do alone. It is important ( C ) everyone in the town to think about each other.",
    ],
    ja: [
      'この前の11月、私の町で避難訓練が行われ、学校から生徒にも参加するようにと言われました。訓練の前、私はかんたんだろうと思っていました。災害のときに避難所として使われる小学校まで歩けばいいだけだったからです。',
      '訓練の日、私はとなりに一人で住んでいるおばあさんといっしょに歩きました。おばあさんはつえをついて歩くので、私たちはとてもゆっくり進みました。とちゅうで、せまい道がこわれたへいでふさがれているのを見つけました。別の道を選ばなければならず、着くまでに40分近くかかりました。私はおどろきました。本当の地震が起きたら、私はおばあさんを十分に早く助けられないかもしれません。',
      '訓練のあと、私はクラスで自分の体験を話しました。クラスメートと私は、速く歩けない人のための安全な道の地図を作ることに決めました。私たちは道を一つずつ確かめ、その地図を近所の人たちにくばりました。この経験を通して、私は災害への備えは一人でできるものではないと学びました。町のみんながおたがいのことを考えることが大切なのです。',
    ],
    blanks: [
      { id: 'A', choices: ['as', 'for', 'by', 'to'], answer: 0, why: 'be used as 〜「〜として使われる」。' },
      { id: 'B', choices: ['quickly', 'quick', 'quicker', 'quickest'], answer: 0, why: 'help を説明するのは副詞。quickly enough「十分に早く」（enough は形容詞・副詞のあと）。' },
      { id: 'C', choices: ['for', 'of', 'to', 'with'], answer: 0, why: 'It is important for 人 to 〜「人が〜することは大切だ」。' },
    ],
    tf: [
      { statement: '筆者は訓練の前、訓練はかんたんだろうと思っていた。', answer: true, why: '第1段落 I thought it would be easy。' },
      { statement: '筆者とおばあさんは10分ほどで避難所に着いた。', answer: false, why: '第2段落 it took us almost forty minutes。' },
      { statement: '筆者たちは安全な道の地図を作って近所の人にくばった。', answer: true, why: '第3段落 gave the map to our neighbors。' },
    ],
    qa: [
      { q: 'Why did it take a long time to get to the shelter?', choices: ['They walked slowly and had to choose another road.', 'They got lost in the school.', 'The drill started late.', 'The weather was very bad.'], answer: 0, why: '第2段落 we moved very slowly / We had to choose another way。' },
    ],
  },
  {
    id: 'adv-zoo',
    title: 'Rethinking the Zoo',
    level: '難関大（評論）',
    paragraphs: [
      'For most of their history, zoos existed mainly to entertain. Animals from distant lands were displayed in small cages so that city dwellers could stare at creatures they would otherwise never see. Today, many people find this idea uncomfortable, and some argue that zoos should be closed altogether. Yet the question is not ( A ) simple as it first appears.',
      "Supporters of modern zoos point out that their role has changed. Many zoos now take part in breeding programs for endangered species, and a few animals that had disappeared from the wild have been returned to their natural habitats thanks to such efforts. Zoos also fund research and education, and for many children a visit to the zoo is their first encounter with wildlife. In this view, closing zoos would ( B ) the very animals that critics hope to protect.",
      "Critics reply that only a small number of species benefit from these programs, and that large, intelligent animals such as elephants often suffer in captivity no matter how well they are cared for. Perhaps the most reasonable position lies between the two extremes: zoos should be judged not by how many visitors they attract, but by how much they ( C ) to the survival of species in the wild.",
    ],
    ja: [
      '動物園はその歴史の大部分において、主に人々を楽しませるために存在してきた。遠い国の動物が小さなおりに展示され、都会に住む人々は、そうでなければ決して見ることのない生き物をじっと見つめることができた。今日では多くの人がこの考えに居心地の悪さを感じ、動物園は完全に閉鎖すべきだと主張する人もいる。しかし、この問題は最初に思えるほど単純ではない。',
      '現代の動物園を支持する人々は、その役割が変わったと指摘する。今では多くの動物園が絶滅危惧種の繁殖計画に参加しており、そうした努力のおかげで、野生から姿を消していたいくつかの動物が本来のすみかにもどされた。動物園はまた研究や教育に資金を出し、多くの子どもたちにとって動物園に行くことは野生動物との最初の出会いでもある。この見方からすれば、動物園を閉鎖することは、批判する人々が守りたいと願っているまさにその動物たちを傷つけることになるだろう。',
      '批判する人々は、こうした計画の恩恵を受けるのはごく一部の種だけであり、ゾウのような大きく知能の高い動物は、どれほど大切に世話をされても、とらわれの身で苦しむことが多いと反論する。おそらくもっとも筋の通った立場は、この二つの極端のあいだにあるだろう。動物園は、どれだけ多くの来園者を集めるかではなく、野生の種の存続にどれだけ貢献するかによって評価されるべきなのである。',
    ],
    blanks: [
      { id: 'A', choices: ['as', 'such', 'too', 'very'], answer: 0, why: 'not as 〜 as …「…ほど〜ではない」。' },
      { id: 'B', choices: ['harm', 'help', 'feed', 'find'], answer: 0, why: '閉鎖すれば、守りたいはずの動物を「傷つける（harm）」ことになる、という逆説。' },
      { id: 'C', choices: ['contribute', 'belong', 'refer', 'object'], answer: 0, why: 'contribute to 〜「〜に貢献する」。' },
    ],
    tf: [
      { statement: '動物園はかつて、主に娯楽のために存在していた。', answer: true, why: '第1段落 zoos existed mainly to entertain。' },
      { statement: '支持する人々は、動物園の役割は昔と変わっていないと言う。', answer: false, why: '第2段落 their role has changed。' },
      { statement: '筆者は、動物園は来園者の数で評価されるべきだと考えている。', answer: false, why: '第3段落 not by how many visitors they attract。' },
    ],
    qa: [
      { q: 'According to critics, what is one problem with zoos?', choices: ['Large, intelligent animals often suffer in captivity.', 'Zoos do not attract enough visitors.', 'Breeding programs help too many species.', 'Children are afraid of wild animals.'], answer: 0, why: '第3段落 large, intelligent animals ... often suffer in captivity。' },
    ],
  },
  {
    id: 'toefl-tardigrade',
    title: 'The Toughest Animal on Earth',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "If you collect a little wet moss from a garden and look at it under a microscope, you may find a tiny creature slowly walking on eight short legs. This animal, known as a tardigrade or 'water bear,' is usually less than one millimeter long. Despite its size, it is famous among scientists ( A ) its astonishing ability to survive conditions that would kill almost any other animal.",
      "The secret lies in a state called the 'tun.' When its environment dries out, a tardigrade pulls in its legs, loses almost all the water in its body, and curls into a small, dry ball. In this state, its metabolism slows to an extremely low level, so that it appears to be dead. Yet when water returns, it can rehydrate and become active again, sometimes after many years. Researchers believe that special proteins ( B ) its cells from damage while they are dry.",
      "In laboratory experiments, tardigrades in the tun state have survived temperatures far below freezing, very high pressure, and strong radiation. In 2007, some were even sent into space and exposed to its vacuum, and a number of them survived after returning to Earth. Scientists hope that studying these animals will help them develop new ways to ( C ) medicines and other biological materials without refrigeration.",
    ],
    ja: [
      '庭から少しぬれたコケを集めて顕微鏡でのぞくと、8本の短いあしでゆっくり歩く小さな生き物が見つかるかもしれない。クマムシ（英語では「水のクマ」）として知られるこの動物は、ふつう体長1ミリメートルにも満たない。その小ささにもかかわらず、ほかのほとんどすべての動物が死んでしまうような環境を生きのびるおどろくべき能力で、科学者のあいだで有名である。',
      'その秘密は「樽（たる）」とよばれる状態にある。まわりが乾燥すると、クマムシはあしを引っこめ、体の水分をほとんどすべて失い、小さな乾いた玉のように丸まる。この状態では代謝がきわめて低いレベルまで落ちるため、死んでいるように見える。しかし水がもどると、ふたたび水分を取りこんで動きだすことができ、それが何年もたってからのこともある。研究者たちは、乾いているあいだ、特別なたんぱく質が細胞を損傷から守っていると考えている。',
      '実験室での実験では、樽の状態のクマムシは、氷点よりはるかに低い温度や、非常に高い圧力、強い放射線にもたえた。2007年には宇宙に送られて真空にさらされたものもあり、地球にもどったあとに生きのびていたものもいた。科学者たちは、この動物を研究することで、薬やそのほかの生物由来の物質を冷蔵せずに保存する新しい方法を開発できるのではないかと期待している。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'by', 'to', 'with'], answer: 0, why: 'be famous for 〜「〜で有名だ」。' },
      { id: 'B', choices: ['protect', 'protects', 'protecting', 'to protect'], answer: 0, why: 'that 節の主語 special proteins（複数）に対する動詞なので protect。' },
      { id: 'C', choices: ['store', 'stores', 'stored', 'storing'], answer: 0, why: 'ways to ＋ 動詞の原形「〜する方法」。' },
    ],
    tf: [
      { statement: 'クマムシはふつう体長1ミリメートルより小さい。', answer: true, why: '第1段落 usually less than one millimeter long。' },
      { statement: '樽の状態のクマムシは、体の水分を多くたくわえている。', answer: false, why: '第2段落 loses almost all the water in its body。' },
      { statement: '宇宙に送られたクマムシはすべて死んでしまった。', answer: false, why: '第3段落 a number of them survived。' },
    ],
    qa: [
      { q: 'What happens to a tardigrade when its environment dries out?', choices: ['It curls into a small, dry ball and slows its metabolism.', 'It grows larger and searches for food.', 'It lays eggs and dies.', 'It swims to deeper water.'], answer: 0, why: '第2段落 curls into a small, dry ball ... its metabolism slows。' },
    ],
  },
  {
    id: 'exam-penpal',
    title: 'My Pen Pal in Vietnam',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last year, our English teacher introduced a pen pal program, and I started writing to a girl named Linh in Vietnam. At first, I was nervous because my English was not very good. I spent almost an hour ( A ) my first letter, checking every word in my dictionary.",
      "In her reply, Linh told me about her school and her family. She also asked many questions about Japan. One of them surprised me: 'Why do Japanese students clean their own classrooms?' I had never thought about it before, because it was ( B ) natural for me. I asked my classmates and teachers, and I learned that cleaning teaches us to take care of the places we use every day.",
      "Through our letters, I started to see my own country in a new way. I also found that we have many things in common. We both like music and want to travel around the world someday. This spring, Linh's class plans to visit Japan. I am looking forward to ( C ) her for the first time. I want to show her our classroom and clean it together with her.",
    ],
    ja: [
      '去年、英語の先生が文通のプログラムを紹介してくれて、私はベトナムのリンという女の子に手紙を書きはじめました。最初は、自分の英語があまりじょうずでないので緊張していました。最初の手紙を書くのに1時間近くかかり、辞書で一語一語確かめました。',
      'リンは返事の中で、学校や家族のことを教えてくれました。日本についての質問もたくさんしてくれました。そのうちの一つに私はおどろきました。「なぜ日本の生徒は自分たちで教室をそうじするの？」それまで考えたこともありませんでした。私にとってはとても当たり前のことだったからです。クラスメートや先生にたずねてみて、そうじは毎日使う場所を大切にすることを教えてくれるのだと知りました。',
      '手紙を通して、私は自分の国を新しい見方で見るようになりました。また、私たちには共通点がたくさんあることもわかりました。2人とも音楽が好きで、いつか世界中を旅したいと思っています。この春、リンのクラスが日本をおとずれる予定です。私は初めて彼女に会えるのを楽しみにしています。彼女に私たちの教室を見せて、いっしょにそうじをしたいと思っています。',
    ],
    blanks: [
      { id: 'A', choices: ['writing', 'to write', 'write', 'wrote'], answer: 0, why: 'spend ＋ 時間 ＋ -ing「〜するのに時間を使う」。' },
      { id: 'B', choices: ['so', 'such', 'too', 'very much'], answer: 0, why: '形容詞 natural を強めるのは so（とても）。such は名詞の前に使う。' },
      { id: 'C', choices: ['meeting', 'meet', 'met', 'to meet'], answer: 0, why: 'look forward to のあとは -ing（to は前置詞）。' },
    ],
    tf: [
      { statement: '筆者は最初の手紙を書くのに1時間近くかかった。', answer: true, why: '第1段落 I spent almost an hour writing my first letter。' },
      { statement: 'リンは、日本の生徒が教室をそうじすることを知っていて当然だと思っていた。', answer: false, why: '第2段落 リンはその理由をたずねている。' },
      { statement: '筆者とリンはもう何度も会ったことがある。', answer: false, why: '第3段落 meeting her for the first time（初めて会う）。' },
    ],
    qa: [
      { q: 'What did the writer learn about cleaning classrooms?', choices: ['It teaches students to take care of the places they use.', 'It is done only in Vietnam.', 'It is a waste of time.', 'Teachers clean the classrooms for students.'], answer: 0, why: '第2段落 cleaning teaches us to take care of the places we use every day。' },
    ],
  },
  {
    id: 'adv-tourism',
    title: 'Loving a Place Too Much',
    level: '難関大（評論）',
    paragraphs: [
      'Travel has never been easier. Cheap flights, online maps, and photo-sharing apps allow millions of people to visit places that once seemed impossibly far away. Yet this freedom has produced an unexpected problem. In some famous towns, the number of visitors has grown so large that the very qualities that attracted them in the first place are ( A ) to disappear.',
      'Consider a small historic village known for its quiet streets. As more tourists arrive, shops selling daily necessities are replaced by souvenir stores, and rising rents push local residents to move elsewhere. Eventually, the village may become little more than a stage set: beautiful to look at, but no longer a living community. Tourists then complain that the place feels "too touristy," ( B ) realizing that they themselves are part of the cause.',
      'Some cities have responded by limiting the number of visitors, charging entrance fees, or encouraging travel during less popular seasons. Such measures are often criticized as unfair, since they seem to turn travel back into a privilege of the wealthy. Still, the underlying question remains: how can we enjoy a place without destroying what makes it worth visiting? Perhaps the answer begins with seeing ourselves not merely as consumers of a destination but as temporary ( C ) of it.',
    ],
    ja: [
      '旅行がこれほど簡単になったことはない。安い航空便、オンラインの地図、写真共有アプリのおかげで、何百万もの人が、かつてはとても遠く思えた場所をおとずれることができる。しかしこの自由は、思いがけない問題を生んだ。いくつかの有名な町では、訪問者の数があまりにも多くなり、そもそも人々をひきつけた特徴そのものが消えはじめているのだ。',
      '静かな通りで知られる小さな歴史ある村を考えてみよう。観光客がふえるにつれて、日用品を売る店はみやげもの店にかわり、上がる家賃のせいで地元の住民はほかの場所へ引っこしていく。やがてその村は、舞台のセットとほとんど変わらないものになるかもしれない。見た目は美しいが、もはや人々が暮らす共同体ではない。すると観光客は、その場所が「観光地化しすぎている」と不満を言う。自分たちこそがその原因の一部だと気づかずに。',
      'いくつかの都市は、訪問者の数を制限したり、入場料をとったり、人気の少ない季節の旅行をすすめたりして対応してきた。こうした対策は、旅行を再びお金持ちの特権にしてしまうように思えるため、不公平だと批判されることが多い。それでも根本の問いは残る。ある場所を、そこをおとずれる価値のあるものにしているものをこわさずに、どうすれば楽しめるのだろうか。その答えはおそらく、自分たちを単なる目的地の消費者としてではなく、一時的なその場所の守り手として見ることから始まるのだろう。',
    ],
    blanks: [
      { id: 'A', choices: ['beginning', 'refusing', 'pretending', 'failing'], answer: 0, why: 'are beginning to disappear「消えはじめている」。' },
      { id: 'B', choices: ['without', 'despite', 'by', 'for'], answer: 0, why: 'without -ing「〜せずに」。自分が原因だと気づかずに不満を言う。' },
      { id: 'C', choices: ['guardians', 'owners', 'enemies', 'sellers'], answer: 0, why: 'consumers（消費する人）と対比して、場所を守る guardians（守り手）。' },
    ],
    tf: [
      { statement: '筆者は、旅行が簡単になったことで予想外の問題が生まれたと述べている。', answer: true, why: '第1段落 this freedom has produced an unexpected problem。' },
      { statement: '観光客がふえると、地元の住民が村にもどってくる。', answer: false, why: '第2段落 push local residents to move elsewhere。' },
      { statement: '訪問者を制限する対策は、だれからも公平だと受け入れられている。', answer: false, why: '第3段落 often criticized as unfair。' },
    ],
    qa: [
      { q: 'Why might a village become "little more than a stage set"?', choices: ['Local shops and residents are replaced as tourism grows.', 'The government builds a theater there.', 'Tourists stop visiting the village.', 'The village becomes too quiet.'], answer: 0, why: '第2段落 shops ... are replaced by souvenir stores ... push local residents to move elsewhere。' },
    ],
  },
  {
    id: 'toefl-drift',
    title: 'The Moving Continents',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "Look at a world map, and you may notice that the east coast of South America and the west coast of Africa seem to fit together like pieces of a puzzle. In 1912, a German scientist named Alfred Wegener suggested that this was no coincidence. He proposed that the continents had once been joined in a single huge landmass and had slowly drifted apart ( A ) millions of years.",
      "Wegener collected impressive evidence. Fossils of the same ancient reptile, an animal that could not have swum across a wide ocean, were found in both South America and Africa. Similar types of rock also appeared on coasts now separated by thousands of kilometers. Nevertheless, most scientists rejected his idea, mainly because he could not explain ( B ) force was strong enough to move entire continents.",
      "The answer came decades later, after Wegener's death. In the 1950s and 1960s, studies of the ocean floor revealed that new crust is constantly forming along underwater mountain ranges and spreading outward. This discovery led to the theory of plate tectonics, which states that the Earth's surface is divided into large plates that move a few centimeters each year, roughly as fast as fingernails grow. Wegener's once-rejected idea had ( C ) to be largely correct.",
    ],
    ja: [
      '世界地図を見ると、南アメリカの東海岸とアフリカの西海岸が、パズルのピースのようにぴったり合いそうなことに気づくかもしれない。1912年、アルフレッド・ウェゲナーというドイツの科学者は、これは偶然ではないと主張した。彼は、大陸はかつて一つの巨大な陸地としてつながっていて、何百万年もかけてゆっくりはなれていったのだと提唱した。',
      'ウェゲナーは説得力のある証拠を集めた。同じ古代のは虫類の化石が南アメリカとアフリカの両方で見つかったが、それは広い海を泳いでわたれたはずのない動物だった。また、今では何千キロメートルもはなれた海岸に、似た種類の岩石が見られた。それにもかかわらず、多くの科学者は彼の考えを受け入れなかった。主な理由は、大陸全体を動かすほど強い力が何なのかを、彼が説明できなかったからである。',
      'その答えが出たのは何十年もあと、ウェゲナーの死後だった。1950年代から1960年代にかけて、海底の研究によって、新しい地殻が海底の山脈にそってたえず生まれ、外側へ広がっていることが明らかになった。この発見がプレートテクトニクスの理論につながった。それは、地球の表面がいくつもの大きなプレートに分かれていて、それらが1年に数センチメートル、およそつめがのびるくらいの速さで動いているという理論である。かつて否定されたウェゲナーの考えは、大部分が正しかったとわかったのだ。',
    ],
    blanks: [
      { id: 'A', choices: ['over', 'since', 'until', 'among'], answer: 0, why: 'over millions of years「何百万年もかけて」。期間全体にわたることを表す over。' },
      { id: 'B', choices: ['what', 'that', 'which of', 'how much'], answer: 0, why: '疑問詞 what が主語の間接疑問「何の力が〜か」。' },
      { id: 'C', choices: ['turned out', 'turned up', 'turned down', 'turned off'], answer: 0, why: 'turn out to be 〜「〜だとわかる」。had turned out to be correct。' },
    ],
    tf: [
      { statement: 'ウェゲナーは、大陸はかつて一つにつながっていたと考えた。', answer: true, why: '第1段落 the continents had once been joined in a single huge landmass。' },
      { statement: '多くの科学者は、ウェゲナーの考えをすぐに受け入れた。', answer: false, why: '第2段落 most scientists rejected his idea。' },
      { statement: 'プレートは1年に数メートルの速さで動いている。', answer: false, why: '第3段落 a few centimeters each year。' },
    ],
    qa: [
      { q: 'Why did most scientists reject Wegener\'s idea at first?', choices: ['He could not explain what force moved the continents.', 'He had no fossils as evidence.', 'He said the continents never moved.', 'He studied only the ocean floor.'], answer: 0, why: '第2段落 he could not explain what force was strong enough to move entire continents。' },
    ],
  },
  {
    id: 'exam-bakery',
    title: 'The Bakery on My Street',
    level: '高校入試（随筆）',
    paragraphs: [
      "There is a small bakery on my street. An old couple, Mr. and Mrs. Mori, have run it for over forty years. When I was little, I often bought a melon bun there on my way home from kindergarten. Mrs. Mori always remembered my name and asked ( A ) my day had been.",
      "Last winter, I heard that the bakery might close. A big supermarket had opened near the station, and fewer people were coming to the shop. Mr. Mori said, 'We are getting old. Maybe it's time to stop.' I felt very sad. The bakery was not just a place to buy bread. It was a place ( B ) people in our town could talk and smile.",
      "I talked with my friends, and we decided to do something. We made posters about the bakery and asked the shops on our street to put them up. We also wrote a short article for our school newspaper. Little by little, more customers came back. Now the bakery is still open. Mrs. Mori told me, 'You gave us the energy to ( C ) going.' I learned that even students can help protect the things we love in our town.",
    ],
    ja: [
      '私の家の通りには小さなパン屋があります。森さんというお年寄りの夫婦が、40年以上お店を続けています。小さいころ、私は幼稚園の帰りによくそこでメロンパンを買いました。森さんの奥さんはいつも私の名前を覚えていて、その日はどうだったかとたずねてくれました。',
      'この前の冬、そのパン屋が閉店するかもしれないと聞きました。駅の近くに大きなスーパーができて、お店に来る人が少なくなっていたのです。森さんのご主人は「わしらも年をとった。そろそろやめる時かもしれない」と言いました。私はとても悲しくなりました。そのパン屋はただパンを買う場所ではありませんでした。町の人々が話したり笑ったりできる場所だったのです。',
      '友だちと話し合い、私たちは何かをしようと決めました。パン屋についてのポスターを作り、通りのお店にはってくれるようたのみました。また、学校新聞に短い記事も書きました。少しずつ、お客さんがもどってきました。今もパン屋は開いています。森さんの奥さんは「あなたたちが、続けていく元気をくれたのよ」と言ってくれました。私は、中学生でも町の大好きなものを守る手助けができるのだと学びました。',
    ],
    blanks: [
      { id: 'A', choices: ['how', 'what', 'which', 'who'], answer: 0, why: 'how my day had been「その日がどうだったか」（間接疑問）。' },
      { id: 'B', choices: ['where', 'which', 'what', 'when'], answer: 0, why: '場所（a place）を説明し、あとに完全な文（people could talk）が続くので関係副詞 where。' },
      { id: 'C', choices: ['keep', 'keeps', 'kept', 'keeping'], answer: 0, why: '不定詞 to のあとは原形。keep -ing「〜し続ける」。' },
    ],
    tf: [
      { statement: '森さん夫婦は40年以上パン屋を続けている。', answer: true, why: '第1段落 have run it for over forty years。' },
      { statement: 'パン屋のお客さんが減ったのは、近くに大きなスーパーができたからだ。', answer: true, why: '第2段落 A big supermarket had opened near the station。' },
      { statement: 'パン屋は結局閉店してしまった。', answer: false, why: '第3段落 Now the bakery is still open。' },
    ],
    qa: [
      { q: 'What did the writer and friends do to help the bakery?', choices: ['They made posters and wrote an article.', 'They worked at the bakery every day.', 'They opened a new bakery.', 'They asked the supermarket to close.'], answer: 0, why: '第3段落 We made posters ... wrote a short article。' },
    ],
  },
  {
    id: 'adv-handwriting',
    title: 'The Slow Hand',
    level: '難関大（評論）',
    paragraphs: [
      'In many classrooms, the sound of pens moving across paper has been replaced by the quiet tapping of keyboards. Typing is faster, neater, and easier to edit, so it seems obvious that it should be the better way to take notes. Some researchers, however, have suggested that the very slowness of handwriting may be ( A ) its greatest advantages.',
      'The reasoning is as follows. Because most people can type almost as fast as a teacher speaks, students using laptops tend to record lectures word for word. Those writing by hand cannot keep up, so they are forced to decide what is important and to express it in their own words. This process of selecting and summarizing requires them to think about the material ( B ) they are still listening to it, and such thinking may lead to deeper understanding.',
      'It would be a mistake, however, to conclude that keyboards are harmful. Later studies have produced mixed results, and typed notes can be searched, shared, and reorganized with ease. The real lesson may be that what matters is not the tool itself but how actively we use it. A student who types thoughtfully may learn more than one who copies by hand without thinking. Efficiency, in learning, is not ( C ) the same thing as effectiveness.',
    ],
    ja: [
      '多くの教室で、紙の上をペンが走る音は、キーボードを打つ静かな音にとってかわられた。タイピングはより速く、よりきれいで、修正も簡単なので、それがノートをとるよりよい方法であるのは当然のように思える。しかし一部の研究者は、手書きの遅さこそが、その最大の利点の一つかもしれないと示している。',
      'その理由は次のとおりだ。たいていの人は先生が話すのとほぼ同じ速さでタイピングできるため、ノートパソコンを使う学生は講義を一語一語記録しがちである。手で書く学生は追いつけないので、何が大切かを決め、それを自分のことばで表現せざるをえない。この選び、まとめるという過程では、まだ話を聞いているあいだに内容について考える必要があり、そうした思考がより深い理解につながるのかもしれない。',
      'しかし、キーボードは有害だと結論づけるのはまちがいだろう。その後の研究ではさまざまな結果が出ており、タイピングしたノートは簡単に検索したり、共有したり、整理し直したりできる。本当の教訓は、大切なのは道具そのものではなく、それをどれだけ能動的に使うかだということかもしれない。考えながらタイピングする学生は、何も考えずに手で写す学生より多くを学ぶかもしれない。学習において、効率は必ずしも効果と同じものではないのだ。',
    ],
    blanks: [
      { id: 'A', choices: ['one of', 'none of', 'instead of', 'because of'], answer: 0, why: 'one of its greatest advantages「その最大の利点の一つ」。one of ＋ 最上級 ＋ 複数名詞。' },
      { id: 'B', choices: ['while', 'unless', 'until', 'though'], answer: 0, why: '「まだ聞いているあいだに」なので while。' },
      { id: 'C', choices: ['necessarily', 'never', 'hardly', 'rarely'], answer: 0, why: 'not necessarily「必ずしも〜ではない」（部分否定）。' },
    ],
    tf: [
      { statement: 'ノートパソコンを使う学生は、講義を一語一語記録しがちだとされている。', answer: true, why: '第2段落 tend to record lectures word for word。' },
      { statement: '手で書く学生は、何が大切かを選ばなくてもよい。', answer: false, why: '第2段落 they are forced to decide what is important。' },
      { statement: '筆者は、キーボードは学習に有害だと結論づけている。', answer: false, why: '第3段落 It would be a mistake ... to conclude that keyboards are harmful。' },
    ],
    qa: [
      { q: 'According to the writer, what matters most in taking notes?', choices: ['How actively we use the tool.', 'Whether we use a pen or a keyboard.', 'How fast we can write.', 'How neat our notes look.'], answer: 0, why: '第3段落 what matters is not the tool itself but how actively we use it。' },
    ],
  },
  {
    id: 'toefl-hibernation',
    title: 'The Long Winter Sleep',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "For many animals, winter is a time of hardship. Food becomes scarce, and staying warm requires a great deal of energy. Some species solve this problem by migrating to warmer places, but others remain where they are and enter a state known as hibernation. During hibernation, an animal's body temperature, heart rate, and breathing all drop dramatically, ( A ) it to survive for months on the fat it stored during the autumn.",
      "The degree of this slowdown varies widely. In some small mammals, such as ground squirrels, body temperature can fall to just a few degrees above freezing, and the heart may beat only a handful of times per minute. Curiously, these animals do not stay in this state continuously. Every week or two, they briefly warm up again before returning to their deep sleep. Scientists are still debating ( B ) these costly awakenings are necessary.",
      "Bears are often described as hibernators, but their winter sleep is different. Their body temperature falls by only a few degrees, and they can wake up relatively quickly if disturbed. Remarkably, female bears may even give birth during this period. Researchers are studying how bears avoid losing muscle and bone strength despite months of inactivity, in the hope that the findings could one day help patients ( C ) must stay in bed for long periods.",
    ],
    ja: [
      '多くの動物にとって、冬はつらい時期である。食べ物は少なくなり、体を温かく保つには多くのエネルギーが必要になる。暖かい場所へ移動することでこの問題を解決する種もいるが、その場にとどまって冬眠として知られる状態に入る種もいる。冬眠中は、動物の体温、心拍、呼吸がすべて大きく下がり、そのおかげで秋のあいだにたくわえた脂肪で何か月も生きのびることができる。',
      'この活動の低下の度合いは種によって大きくちがう。ジリスのような小型のほ乳類では、体温が氷点よりほんの数度高いところまで下がることがあり、心臓は1分間にほんの数回しか打たないこともある。ふしぎなことに、こうした動物はずっとこの状態でいるわけではない。1〜2週間ごとに一時的に体温を上げてから、再び深いねむりにもどるのである。こうしたエネルギーのかかる目覚めがなぜ必要なのかについて、科学者たちは今も議論している。',
      'クマはよく冬眠する動物だと言われるが、その冬のねむりはちがっている。体温は数度しか下がらず、じゃまされると比較的すぐに目を覚ますことができる。おどろくべきことに、メスのクマはこの期間に子どもを産むことさえある。研究者たちは、何か月も動かないにもかかわらず、クマがどのようにして筋肉や骨の強さを失わずにいるのかを研究しており、その成果がいつか長いあいだベッドにいなければならない患者の助けになることを期待している。',
    ],
    blanks: [
      { id: 'A', choices: ['allowing', 'allowed', 'allows', 'to allow'], answer: 0, why: '分詞構文 allowing it to 〜「そしてそれによって〜できる」。前の文全体の結果を表す。' },
      { id: 'B', choices: ['why', 'what', 'which', 'who'], answer: 0, why: '「なぜ目覚めが必要なのか」なので why（間接疑問）。' },
      { id: 'C', choices: ['who', 'which', 'whose', 'what'], answer: 0, why: '先行詞 patients（人）を説明する関係代名詞 who。' },
    ],
    tf: [
      { statement: '冬眠中は、体温・心拍・呼吸が大きく下がる。', answer: true, why: '第1段落 body temperature, heart rate, and breathing all drop dramatically。' },
      { statement: 'ジリスは冬眠のあいだ、一度も目を覚まさない。', answer: false, why: '第2段落 Every week or two, they briefly warm up again。' },
      { statement: 'クマは冬のねむりの間、体温が氷点近くまで下がる。', answer: false, why: '第3段落 Their body temperature falls by only a few degrees。' },
    ],
    qa: [
      { q: 'Why are researchers studying bears during their winter sleep?', choices: ['To learn how they keep muscle and bone strength.', 'To find out where they migrate.', 'To make bears sleep longer.', 'To study how they find food in winter.'], answer: 0, why: '第3段落 how bears avoid losing muscle and bone strength。' },
    ],
  },
  {
    id: 'exam-kendo',
    title: 'What the Kendo Club Taught Me',
    level: '高校入試（体験文）',
    paragraphs: [
      "When I entered junior high school, I joined the kendo club. I chose it because it looked cool, but the first month was very hard. We did not even hold a bamboo sword. Instead, we practiced bowing, walking, and cleaning the floor of the dojo. I wondered ( A ) we had to do such boring things.",
      "One day, I asked our coach, Mr. Hayashi. He smiled and said, 'In kendo, we bow before and after every match. We show respect to our partner, because without a partner, we cannot ( B ) stronger. Cleaning the dojo is also a way to say thank you to the place where we practice.' After hearing this, I started to see the club in a different way.",
      "Now I am in my third year. I have won some matches and lost many others. When I lose, I still bow to my partner and say, 'Thank you.' At first, it was difficult, but now I understand its meaning. Kendo taught me that being strong is not only about winning. It is also about respecting others, ( C ) when things do not go well.",
    ],
    ja: [
      '中学校に入学したとき、私は剣道部に入りました。かっこよく見えたので選んだのですが、最初の1か月はとても大変でした。竹刀を持つことさえしませんでした。そのかわりに、礼のしかたや歩き方、道場のゆかそうじを練習しました。なぜこんなにつまらないことをしなければならないのか、私はふしぎに思いました。',
      'ある日、私は顧問の林先生にたずねました。先生はほほえんで言いました。「剣道では、試合の前と後に必ず礼をする。相手に敬意を示すんだ。相手がいなければ、強くなれないからね。道場をそうじするのも、練習する場所にありがとうと言う方法なんだよ」。これを聞いてから、私は部活動をちがった見方で見るようになりました。',
      '今、私は3年生です。いくつかの試合に勝ち、それ以上に多くの試合に負けてきました。負けたときも、私は相手に礼をして「ありがとうございました」と言います。最初はむずかしかったけれど、今はその意味がわかります。剣道は、強いということは勝つことだけではないと教えてくれました。うまくいかないときでも、ほかの人を尊重することでもあるのです。',
    ],
    blanks: [
      { id: 'A', choices: ['why', 'what', 'which', 'who'], answer: 0, why: '「なぜ〜しなければならないのか」なので why（間接疑問）。' },
      { id: 'B', choices: ['become', 'becomes', 'became', 'becoming'], answer: 0, why: '助動詞 cannot のあとは原形。become stronger「より強くなる」。' },
      { id: 'C', choices: ['even', 'only', 'still', 'already'], answer: 0, why: 'even when 〜「〜のときでさえ」。' },
    ],
    tf: [
      { statement: '筆者は剣道部に入ってすぐ竹刀を持って練習した。', answer: false, why: '第1段落 We did not even hold a bamboo sword。' },
      { statement: '林先生は、道場のそうじは場所への感謝を表すと言った。', answer: true, why: '第2段落 a way to say thank you to the place where we practice。' },
      { statement: '筆者は3年間、一度も試合に負けなかった。', answer: false, why: '第3段落 lost many others。' },
    ],
    qa: [
      { q: 'What did kendo teach the writer?', choices: ['Being strong also means respecting others.', 'Winning is the only important thing.', 'Cleaning is a waste of time.', 'Bowing is only for teachers.'], answer: 0, why: '第3段落 being strong is not only about winning. It is also about respecting others。' },
    ],
  },
  {
    id: 'adv-silence',
    title: 'What Silence Says',
    level: '難関大（評論）',
    paragraphs: [
      'In many classrooms and meetings, silence is treated as a problem to be solved. When a question is met with no reply, the speaker rushes to fill the gap, as if a few seconds without words were a sign of failure. Yet silence is not simply the absence of communication; it is often a form of communication ( A ).',
      'The meaning of silence, however, depends heavily on culture and context. In some societies, a pause before answering shows that the listener is taking the question seriously, while in others the same pause may be interpreted as hesitation, disagreement, or even rudeness. Misunderstandings in international settings frequently arise ( B ) people read silence through the rules of their own culture without realizing that others follow different ones.',
      'Teachers who allow a little more waiting time after asking a question often find that students give longer and more thoughtful answers. The silence that once seemed uncomfortable turns out to be the space in which thinking actually happens. Learning to tolerate such pauses, rather than hurrying to end them, may therefore be ( C ) an important communication skill as learning to speak well.',
    ],
    ja: [
      '多くの教室や会議では、沈黙は解決すべき問題としてあつかわれる。質問に返事がないと、話し手はまるで言葉のない数秒が失敗のしるしであるかのように、あわててその間をうめようとする。しかし沈黙は、単にコミュニケーションがないことではない。それ自体が一つのコミュニケーションの形であることが多いのだ。',
      'しかし、沈黙の意味は文化や状況に大きく左右される。ある社会では、答える前の間は聞き手が質問を真剣に受け止めていることを示すが、別の社会では同じ間が、ためらいや反対、さらには失礼だと受け取られることもある。国際的な場での誤解は、人々が他者はちがうルールに従っていることに気づかずに、自分の文化のルールで沈黙を読むことから生じることが多い。',
      '質問をしたあと少し長めに待つ時間をとる教師は、生徒がより長く、よく考えられた答えを返すことに気づくことが多い。かつては居心地悪く思えた沈黙が、実は思考が起こる場所なのだとわかるのである。したがって、そうした間を急いで終わらせるのではなく、それにたえられるようになることは、うまく話せるようになることと同じくらい大切なコミュニケーションの技術なのかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['in itself', 'by itself alone', 'for nothing', 'at least'], answer: 0, why: 'in itself「それ自体」。沈黙それ自体がコミュニケーションの形だということ。' },
      { id: 'B', choices: ['when', 'unless', 'although', 'whether'], answer: 0, why: '「〜するときに誤解が生じる」なので when。' },
      { id: 'C', choices: ['as', 'so', 'more', 'such'], answer: 0, why: 'as important ... as learning to speak well「うまく話すことと同じくらい大切」。as 〜 as の前の as。' },
    ],
    tf: [
      { statement: '筆者は、沈黙は単にコミュニケーションがないことだと考えている。', answer: false, why: '第1段落 silence is not simply the absence of communication。' },
      { statement: '沈黙の意味は、文化や状況によって変わる。', answer: true, why: '第2段落 depends heavily on culture and context。' },
      { statement: '待つ時間を長くとると、生徒の答えは短くなる傾向がある。', answer: false, why: '第3段落 students give longer and more thoughtful answers。' },
    ],
    qa: [
      { q: 'Why do misunderstandings about silence often occur in international settings?', choices: ['People interpret silence by the rules of their own culture.', 'People speak too slowly.', 'Silence has the same meaning everywhere.', 'Teachers do not ask enough questions.'], answer: 0, why: '第2段落 people read silence through the rules of their own culture。' },
    ],
  },
  {
    id: 'exam-recipe-notebook',
    title: "Grandma's Recipe Notebook",
    level: '高校入試（随筆）',
    paragraphs: [
      "When my grandmother moved into our house last year, she brought an old notebook with her. Its cover was brown and soft, and many of its pages had stains. It was full of recipes she ( A ) written by hand over fifty years. Some recipes had small notes like 'Your father loved this' or 'Use less salt next time.'",
      "One Sunday, my grandmother caught a cold and could not cook. I decided to make her favorite miso soup by following the notebook. However, some words were hard to read, and one page said only 'a little' instead of an exact amount. I tasted the soup again and again ( B ) it was just right. When I brought it to her, she smiled and said, 'This tastes like my mother's soup.'",
      "After that day, I started to cook with my grandmother every weekend. She tells me stories about each dish while we cook together. Now I am typing the recipes into a computer so that our family can keep them forever. But I will never throw the notebook away, because it holds more ( C ) recipes. It holds the memories of my family.",
    ],
    ja: [
      '去年祖母が私たちの家にうつってきたとき、祖母は古いノートを持ってきました。表紙は茶色くてやわらかく、多くのページにしみがありました。そこには祖母が50年以上にわたって手で書いてきたレシピがいっぱいでした。「お父さんはこれが大好きだった」や「次は塩を少なめに」といった小さなメモがついたレシピもありました。',
      'ある日曜日、祖母がかぜをひいて料理ができませんでした。私はノートを見ながら、祖母の大好きなみそ汁を作ることにしました。しかし、読みにくい字もあり、あるページには正確な量ではなく「少し」とだけ書いてありました。私はちょうどよくなるまで、何度も何度も味見をしました。それを持っていくと、祖母はほほえんで「私の母のみそ汁の味がする」と言いました。',
      'その日から、私は毎週末祖母といっしょに料理をするようになりました。いっしょに料理をしながら、祖母はそれぞれの料理にまつわる話をしてくれます。今、私は家族がずっと残しておけるように、レシピをコンピューターに打ちこんでいます。でも、ノートは決して捨てません。そこにはレシピ以上のものがつまっているからです。家族の思い出がつまっているのです。',
    ],
    blanks: [
      { id: 'A', choices: ['had', 'has', 'have', 'was'], answer: 0, why: '去年持ってきた時点までに「書いてきた」ので過去完了 had written。' },
      { id: 'B', choices: ['until', 'since', 'unless', 'because'], answer: 0, why: '「ちょうどよくなるまで」なので until。' },
      { id: 'C', choices: ['than', 'as', 'then', 'that'], answer: 0, why: 'more than 〜「〜以上のもの」。' },
    ],
    tf: [
      { statement: '祖母のノートには、手書きのレシピがたくさん書かれていた。', answer: true, why: '第1段落 full of recipes she had written by hand。' },
      { statement: 'ノートのレシピには、すべて正確な量が書いてあった。', answer: false, why: '第2段落 one page said only "a little" instead of an exact amount。' },
      { statement: '筆者はレシピをコンピューターに打ちこんだら、ノートを捨てるつもりだ。', answer: false, why: '第3段落 I will never throw the notebook away。' },
    ],
    qa: [
      { q: 'Why will the writer keep the notebook?', choices: ['It holds the memories of the family.', 'The computer is broken.', 'The recipes are easy to read.', 'Grandmother asked the writer to sell it.'], answer: 0, why: '第3段落 It holds the memories of my family。' },
    ],
  },
  {
    id: 'toefl-monarch',
    title: 'The Butterflies That Cross a Continent',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Every autumn, millions of monarch butterflies leave Canada and the northern United States and fly south to the mountain forests of central Mexico, a journey that can exceed 4,000 kilometers. What makes this migration remarkable is that no single butterfly completes the round trip. The insects that arrive in Mexico have never been there before, yet they find the same small groups of trees ( A ) their great-grandparents used.",
      "The explanation lies partly in the butterflies' life cycle. Monarchs born in early summer usually live for only a few weeks. However, the generation that emerges at the end of summer is different: these butterflies delay reproduction and can survive for as long as eight months, long enough to fly to Mexico, spend the winter there, and begin the return trip in spring. Their children and grandchildren then ( B ) the journey north.",
      "To find their way, monarchs appear to use the position of the sun, adjusting for its movement across the sky with an internal clock, part of which is located in their antennae. Some evidence suggests they may also sense the Earth's magnetic field. Unfortunately, the number of migrating monarchs has fallen sharply in recent decades, largely because the milkweed plants their caterpillars depend on have ( C ) in many areas.",
    ],
    ja: [
      '毎年秋、何百万匹ものオオカバマダラ（チョウ）がカナダやアメリカ北部を出発し、メキシコ中部の山の森へと南に飛んでいく。その旅は4,000キロメートルをこえることもある。この渡りがおどろくべきなのは、1匹のチョウが往復を最後までやりとげることはないという点である。メキシコに着くチョウはそこに来たことが一度もないのに、ひいおじいさんやひいおばあさんの世代が使ったのと同じ小さな木の群れを見つけるのだ。',
      'その説明の一部は、このチョウの一生のしくみにある。初夏に生まれたオオカバマダラは、ふつう数週間しか生きない。しかし、夏の終わりに羽化する世代はちがう。このチョウたちは繁殖を遅らせ、8か月も生きることができる。メキシコまで飛び、そこで冬をこし、春に帰りの旅を始めるのに十分な長さである。そして、その子や孫たちが北への旅を続けるのである。',
      '道を見つけるために、オオカバマダラは太陽の位置を使っているらしい。太陽が空を動くのを体内時計で補正していて、その時計の一部は触角にある。地球の磁場を感じとっている可能性を示す証拠もある。残念なことに、渡りをするオオカバマダラの数はここ数十年で大きく減っている。その主な理由は、幼虫がたよっているトウワタという植物が多くの地域で減ってしまったことである。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'who', 'what', 'where'], answer: 0, why: '先行詞 the same small groups of trees（もの）を受ける関係代名詞 that（used の目的語）。' },
      { id: 'B', choices: ['continue', 'continues', 'continuing', 'to continue'], answer: 0, why: '主語 Their children and grandchildren（複数）に対する現在形の動詞なので continue。' },
      { id: 'C', choices: ['declined', 'grown', 'risen', 'arrived'], answer: 0, why: 'トウワタが「減った（declined）」ので数が減った、という因果関係。' },
    ],
    tf: [
      { statement: '1匹のオオカバマダラが、メキシコとの往復を最後までやりとげる。', answer: false, why: '第1段落 no single butterfly completes the round trip。' },
      { statement: '夏の終わりに生まれる世代は、8か月も生きることがある。', answer: true, why: '第2段落 can survive for as long as eight months。' },
      { statement: '渡りをするオオカバマダラの数は、ここ数十年でふえている。', answer: false, why: '第3段落 has fallen sharply in recent decades。' },
    ],
    qa: [
      { q: 'How do monarchs appear to find their way?', choices: ['By using the sun and an internal clock.', 'By following older butterflies.', 'By smelling the forests in Mexico.', 'By flying only at night.'], answer: 0, why: '第3段落 use the position of the sun ... with an internal clock。' },
    ],
  },
  {
    id: 'adv-crowds',
    title: 'When Many Minds Are Better Than One',
    level: '難関大（評論）',
    paragraphs: [
      "In 1906, the British scientist Francis Galton visited a country fair where visitors were invited to guess the weight of an ox. Around eight hundred people took part, most of them with no special knowledge of animals. Galton expected their guesses to be poor, ( A ) when he examined the results, he found that the middle value of all the guesses was within about one percent of the true weight.",
      "This phenomenon, later called 'the wisdom of crowds,' shows that a group can sometimes judge more accurately than its individual members. The reason is that individual errors tend to point in different directions. Some people guess too high and others too low, so when the guesses are combined, many of the errors ( B ) each other out.",
      "However, the effect works only under certain conditions. The members of the group must think independently and bring different kinds of information. If people can see each other's answers, or if one confident voice persuades the rest, their errors begin to move in the same direction, and the group may become ( C ) wiser than a single person. A crowd is wise, in other words, not simply because it is large, but because it is diverse and independent.",
    ],
    ja: [
      '1906年、イギリスの科学者フランシス・ゴルトンはある地方の品評会をおとずれた。そこでは来場者が雄牛の重さを当てるよう呼びかけられていた。約800人が参加したが、そのほとんどは動物について特別な知識をもっていなかった。ゴルトンは彼らの推測は不正確だろうと予想していたが、結果を調べてみると、すべての推測のまん中の値が、本当の重さとの差わずか1パーセントほどにおさまっていたことがわかった。',
      'のちに「群衆の知恵」とよばれるこの現象は、集団がときにその個々のメンバーより正確に判断できることを示している。その理由は、個人のまちがいがばらばらの方向を向きやすいことにある。高すぎる推測をする人もいれば低すぎる人もいるため、推測を合わせると、多くのまちがいがおたがいに打ち消し合うのである。',
      'しかし、この効果は一定の条件のもとでしか働かない。集団のメンバーはそれぞれ独立して考え、さまざまな種類の情報をもちよらなければならない。もし人々がたがいの答えを見られたり、自信たっぷりの一人の声がほかの人々を説得したりすると、まちがいが同じ方向に動きはじめ、集団は一人の人間より賢いとはいえなくなるかもしれない。つまり群衆が賢いのは、単に大きいからではなく、多様で独立しているからなのである。',
    ],
    blanks: [
      { id: 'A', choices: ['but', 'so', 'because', 'or'], answer: 0, why: '「不正確だと予想していたが、実際は正確だった」という逆接なので but。' },
      { id: 'B', choices: ['cancel', 'carry', 'find', 'give'], answer: 0, why: 'cancel each other out「たがいに打ち消し合う」。' },
      { id: 'C', choices: ['no', 'much', 'even', 'far'], answer: 0, why: 'become no wiser than 〜「〜より少しも賢くない」。no ＋ 比較級で「少しも〜ない」。' },
    ],
    tf: [
      { statement: 'ゴルトンは、来場者の推測は正確だろうと最初から予想していた。', answer: false, why: '第1段落 Galton expected their guesses to be poor。' },
      { statement: '個人のまちがいがばらばらの方向を向くことが、群衆の知恵の理由とされている。', answer: true, why: '第2段落 individual errors tend to point in different directions。' },
      { statement: '筆者は、集団は大きければ大きいほど必ず賢くなると述べている。', answer: false, why: '第3段落 not simply because it is large, but because it is diverse and independent。' },
    ],
    qa: [
      { q: 'What can make a group lose its wisdom?', choices: ['Members seeing each other\'s answers or following one confident voice.', 'Having too many members.', 'Members thinking independently.', 'Bringing different kinds of information.'], answer: 0, why: '第3段落 If people can see each other\'s answers, or if one confident voice persuades the rest。' },
    ],
  },
  {
    id: 'toefl-cactus',
    title: 'How Cacti Survive the Desert',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Deserts may receive less than 250 millimeters of rain in a year, and daytime temperatures can be extremely high. For most plants, such conditions would be deadly. Cacti, however, have developed a set of features that allow them not only to survive ( A ) to thrive in these harsh environments.",
      "One of the most obvious features is the absence of ordinary leaves. In cacti, leaves have been reduced to spines, which lose far less water than broad, flat leaves would. The spines also protect the plant from thirsty animals and provide a little shade. Instead of leaves, the thick green stem carries out photosynthesis and stores large amounts of water. Many cacti have ribbed stems that can expand like an accordion when it rains and shrink as the water is used ( B ).",
      "Cacti also save water through an unusual timing strategy. Most plants open small pores on their surfaces during the day to take in carbon dioxide, but doing so in the desert heat would cause heavy water loss. Cacti open these pores at night, when the air is cooler, and store the carbon dioxide until sunlight is available for photosynthesis the next day. Their wide, shallow roots, meanwhile, can quickly absorb rainwater ( C ) it evaporates or sinks deep into the ground.",
    ],
    ja: [
      '砂漠では年間の雨量が250ミリメートルに満たないこともあり、昼間の気温はきわめて高くなることがある。ほとんどの植物にとって、そのような条件は命にかかわるだろう。しかしサボテンは、このきびしい環境で生きのびるだけでなく、さかえることさえできる一連の特徴を発達させてきた。',
      'もっとも目立つ特徴の一つは、ふつうの葉がないことである。サボテンでは葉がとげに変化しており、とげは広く平たい葉よりもはるかに水を失いにくい。とげはまた、のどのかわいた動物から植物を守り、少しの日かげも作る。葉のかわりに、太い緑の茎が光合成を行い、大量の水をたくわえる。多くのサボテンはひだのある茎をもち、雨がふるとアコーディオンのようにふくらみ、水が使われるにつれてちぢむ。',
      'サボテンはまた、ふつうとはちがうタイミングの作戦で水を節約している。ほとんどの植物は二酸化炭素を取りこむために昼間に表面の小さな穴を開けるが、砂漠の暑さの中でそうすると多くの水が失われてしまう。サボテンは空気がすずしい夜にこの穴を開け、次の日に日光が使えるようになるまで二酸化炭素をたくわえておく。一方、広く浅い根は、雨水が蒸発したり地中深くしみこんだりする前に、すばやく吸収することができる。',
    ],
    blanks: [
      { id: 'A', choices: ['but', 'and', 'or', 'so'], answer: 0, why: 'not only A but (also) B「A だけでなく B も」。' },
      { id: 'B', choices: ['up', 'down', 'over', 'off'], answer: 0, why: 'use up「使い切る・使ってへらす」。' },
      { id: 'C', choices: ['before', 'after', 'unless', 'since'], answer: 0, why: '「蒸発したりしみこんだりする前に」なので before。' },
    ],
    tf: [
      { statement: 'サボテンのとげは、葉が変化したものである。', answer: true, why: '第2段落 leaves have been reduced to spines。' },
      { statement: 'サボテンでは、葉が主に光合成を行う。', answer: false, why: '第2段落 the thick green stem carries out photosynthesis。' },
      { statement: 'サボテンは昼間に表面の穴を開けて二酸化炭素を取りこむ。', answer: false, why: '第3段落 Cacti open these pores at night。' },
    ],
    qa: [
      { q: 'Why do cacti open their pores at night?', choices: ['To avoid losing too much water in the heat.', 'To catch more sunlight.', 'To protect themselves from animals.', 'To grow deeper roots.'], answer: 0, why: '第3段落 doing so in the desert heat would cause heavy water loss。' },
    ],
  },
  {
    id: 'exam-farewell',
    title: 'A Farewell Gift for Ms. Green',
    level: '高校入試（体験文）',
    paragraphs: [
      "Ms. Green came to our school from New Zealand two years ago to teach English. She was always cheerful, and her classes were full of games and songs. Last month, we heard that she was going to ( A ) Japan at the end of March. Everyone in my class felt sad, and we decided to give her a special present.",
      "At first, we wanted to buy something, but we did not have much money. Then my friend Haruto said, 'Why don't we make a video? We can show her how much we have learned.' Each student chose a favorite memory from her classes and practiced explaining it in English. Some students were shy and did not want to be filmed, so we let them draw pictures ( B ).",
      "On her last day, we played the video in the classroom. When it ended, Ms. Green had tears in her eyes. She said, 'This is the best gift I have ever ( C ). Keep using English, and someday come and visit me in New Zealand.' I realized that a gift does not have to be expensive. What matters most is the feeling we put into it.",
    ],
    ja: [
      'グリーン先生は2年前に英語を教えるためにニュージーランドから私たちの学校に来ました。先生はいつも明るく、授業はゲームや歌でいっぱいでした。先月、私たちは先生が3月の終わりに日本をはなれることを聞きました。クラスのみんなが悲しくなり、私たちは先生に特別なプレゼントをおくることにしました。',
      '最初は何かを買おうと思いましたが、あまりお金がありませんでした。すると友だちのハルトが「動画を作ろうよ。どれだけ学んだかを先生に見せられるよ」と言いました。生徒はそれぞれ先生の授業でいちばんの思い出を選び、それを英語で説明する練習をしました。はずかしがって撮影されたくない生徒もいたので、その人たちにはかわりに絵をかいてもらいました。',
      '先生の最後の日、私たちは教室で動画を流しました。終わると、グリーン先生の目にはなみだがうかんでいました。先生は「これは今までにもらった中で最高のプレゼントです。英語を使い続けてね。そして、いつかニュージーランドに会いに来てね」と言いました。私は、プレゼントは高価である必要はないのだと気づきました。いちばん大切なのは、そこにこめる気持ちなのです。',
    ],
    blanks: [
      { id: 'A', choices: ['leave', 'leaves', 'left', 'leaving'], answer: 0, why: 'be going to のあとは動詞の原形。leave「〜をはなれる」。' },
      { id: 'B', choices: ['instead', 'yet', 'again', 'already'], answer: 0, why: '撮影のかわりに絵をかいてもらった、なので instead「かわりに」。' },
      { id: 'C', choices: ['received', 'receive', 'receiving', 'to receive'], answer: 0, why: 'the best 〜 I have ever ＋ 過去分詞「今までに〜した中でいちばん」。' },
    ],
    tf: [
      { statement: 'グリーン先生はニュージーランドから来た。', answer: true, why: '第1段落 from New Zealand。' },
      { statement: '生徒たちは高価なプレゼントを買った。', answer: false, why: '第2段落 we did not have much money / 動画を作った。' },
      { statement: 'はずかしがりの生徒は、かわりに絵をかいた。', answer: true, why: '第2段落 we let them draw pictures instead。' },
    ],
    qa: [
      { q: 'What did the writer realize?', choices: ['The feeling put into a gift matters most.', 'Gifts should always be expensive.', 'Videos are easy to make.', 'Ms. Green did not like the gift.'], answer: 0, why: '第3段落 What matters most is the feeling we put into it。' },
    ],
  },
  {
    id: 'toefl-termite',
    title: 'Air Conditioning Built by Insects',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "In parts of Africa, the landscape is dotted with tall towers of hardened soil, some of them several meters high. These structures are built by termites, small insects that live in colonies of up to a few million individuals. Strangely, most of the termites do not live inside the towers at all. The colony lives in a nest below the ground, and the tower above it serves ( A ) a kind of giant lung.",
      "A large colony produces a great deal of heat and carbon dioxide. Without a way to remove them, the nest would quickly become too hot and the air unhealthy. The walls of the tower are full of tiny holes and channels. As the temperature outside rises and falls during the day, air moves through these channels, carrying stale air out of the nest and ( B ) fresh air in. In this way, the mound helps keep conditions inside the nest relatively stable.",
      "Engineers have studied termite mounds for ideas about how to cool buildings without using much electricity. One well-known office complex in Zimbabwe, designed with such mounds in mind, uses natural airflow through chimneys and channels to stay cool. While scientists now think the real mounds work in a more complicated way than first believed, the insects have clearly inspired designs that ( C ) energy.",
    ],
    ja: [
      'アフリカの一部の地域では、固まった土でできた高い塔が点々と見られ、その中には高さ数メートルになるものもある。これらの建造物を作るのはシロアリで、最大で数百万匹にもなるコロニー（集団）で暮らす小さな昆虫である。ふしぎなことに、ほとんどのシロアリは塔の中にはまったく住んでいない。コロニーは地下の巣で暮らしており、その上にある塔は一種の巨大な肺として働いているのである。',
      '大きなコロニーは大量の熱と二酸化炭素を出す。それらを取りのぞく方法がなければ、巣はすぐに暑くなりすぎ、空気も体に悪くなってしまうだろう。塔のかべは小さな穴と通り道でいっぱいである。1日のうちに外の気温が上がったり下がったりするにつれて、空気がこれらの通り道を動き、巣からよごれた空気を運び出し、新鮮な空気を運びこむ。こうして塚は、巣の中の状態を比較的一定に保つのに役立っている。',
      '技術者たちは、多くの電気を使わずに建物を冷やす方法のヒントを得るために、シロアリの塚を研究してきた。ジンバブエにあるよく知られたオフィスビルは、こうした塚を参考に設計され、煙突や通り道を通る自然の空気の流れを使って涼しさを保っている。今では科学者たちは、本物の塚は最初に考えられていたよりも複雑なしくみで働いていると考えているが、この昆虫がエネルギーを節約するデザインにヒントをあたえてきたことは明らかである。',
    ],
    blanks: [
      { id: 'A', choices: ['as', 'for', 'by', 'with'], answer: 0, why: 'serve as 〜「〜として働く・〜の役目をする」。' },
      { id: 'B', choices: ['bringing', 'brings', 'brought', 'to bring'], answer: 0, why: 'carrying 〜 and bringing 〜 と、分詞を and で並べている。' },
      { id: 'C', choices: ['save', 'waste', 'need', 'cost'], answer: 0, why: '多くの電気を使わずに冷やす＝エネルギーを「節約する（save）」デザイン。' },
    ],
    tf: [
      { statement: 'ほとんどのシロアリは、地上の塔の中で暮らしている。', answer: false, why: '第1段落 most of the termites do not live inside the towers at all。' },
      { statement: '塔のかべには小さな穴と通り道がたくさんある。', answer: true, why: '第2段落 The walls of the tower are full of tiny holes and channels。' },
      { statement: '科学者たちは、塚のしくみは最初に考えられていたより単純だと考えている。', answer: false, why: '第3段落 in a more complicated way than first believed。' },
    ],
    qa: [
      { q: 'Why have engineers studied termite mounds?', choices: ['To learn how to cool buildings using little electricity.', 'To find new kinds of soil.', 'To protect buildings from insects.', 'To make towers taller.'], answer: 0, why: '第3段落 for ideas about how to cool buildings without using much electricity。' },
    ],
  },
  {
    id: 'exam-shelter-dog',
    title: 'Our New Family Member',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last summer, my family decided to get a dog. I wanted to buy a puppy at a pet shop, but my mother suggested visiting an animal shelter first. At the shelter, we learned that many dogs there had been left by their owners. Some of them had waited for a new family ( A ) more than a year.",
      "One small brown dog stayed in the corner of its cage and did not come to us. The staff member said, 'His name is Kuri. He was afraid of people at first, but he is very gentle.' I sat down quietly near the cage and waited. After about ten minutes, Kuri slowly walked to me and smelled my hand. At that moment, I knew he was the dog ( B ) we wanted.",
      "Now Kuri lives with us. At first, he hid under the table whenever the doorbell rang, but little by little he has become braver. Every morning, he waits for me at the door with his tail moving. Through Kuri, I learned that every animal has its own story. If more people ( C ) adopting animals from shelters, more dogs like Kuri could find a happy home.",
    ],
    ja: [
      '去年の夏、私の家族は犬を飼うことに決めました。私はペットショップで子犬を買いたいと思いましたが、母がまず動物の保護施設に行ってみようと言いました。施設で、そこにいる犬の多くが飼い主に置いていかれたのだと知りました。新しい家族を1年以上待っている犬もいました。',
      '茶色い小さな犬が1匹、おりのすみにいて、私たちのところに来ませんでした。職員さんは「この子の名前はクリです。最初は人をこわがっていたけれど、とてもおとなしい子なんですよ」と言いました。私はおりの近くに静かにすわって待ちました。10分ほどすると、クリはゆっくりと私のほうへ歩いてきて、私の手のにおいをかぎました。その瞬間、私はこの子こそ私たちがほしかった犬だとわかりました。',
      '今、クリは私たちといっしょに暮らしています。最初はげんかんのチャイムが鳴るたびにテーブルの下にかくれていましたが、少しずつ勇気が出てきました。毎朝、クリはしっぽをふりながらドアのところで私を待っています。クリを通して、私はどの動物にもそれぞれの物語があることを学びました。もっと多くの人が保護施設から動物を引き取ることを考えれば、クリのような犬がもっと幸せな家を見つけられるでしょう。',
    ],
    blanks: [
      { id: 'A', choices: ['for', 'since', 'during', 'by'], answer: 0, why: 'for more than a year「1年以上の間」。期間の長さは for。' },
      { id: 'B', choices: ['that', 'who', 'what', 'where'], answer: 0, why: '先行詞 the dog を受ける関係代名詞 that（wanted の目的語）。' },
      { id: 'C', choices: ['considered', 'consider', 'considering', 'to consider'], answer: 0, why: 'If ＋ 過去形 …, could 〜（仮定法過去）。consider -ing「〜することを考える」。' },
    ],
    tf: [
      { statement: '母は最初にペットショップへ行こうと言った。', answer: false, why: '第1段落 my mother suggested visiting an animal shelter first。' },
      { statement: 'クリは最初、人をこわがっていた。', answer: true, why: "第2段落 'He was afraid of people at first'。" },
      { statement: 'クリは今でもチャイムが鳴るたびにかくれている。', answer: false, why: '第3段落 At first ... but little by little he has become braver。' },
    ],
    qa: [
      { q: 'What did the writer do to make Kuri come closer?', choices: ['Sat down quietly and waited.', 'Called his name loudly.', 'Gave him some food.', 'Opened the cage door.'], answer: 0, why: '第2段落 I sat down quietly near the cage and waited。' },
    ],
  },
  {
    id: 'adv-maps',
    title: 'Every Map Is a Choice',
    level: '難関大（評論）',
    paragraphs: [
      "We tend to think of maps as neutral pictures of the world, simple copies of what is really there. Yet every flat map of the Earth involves a compromise. Because the planet is round, it cannot be spread onto a flat surface without stretching or tearing it ( A ). Mapmakers must therefore decide which features to keep accurate and which to sacrifice.",
      "The most famous example is the projection created by Gerardus Mercator in 1569. His map kept the angles between directions correct, which made it extremely useful for sailors steering across the ocean. The price, however, was that areas far from the equator appear much larger than they really are. On such a map, Greenland looks roughly the same size as Africa, ( B ) Africa is in fact about fourteen times larger.",
      "Such distortions are not merely technical details. Because many people grow up seeing one kind of map, it can quietly shape their sense of which regions of the world are large and important. None of this means that maps are useless or dishonest. It means that a map answers a particular question, and that we should ask what question it was designed to answer ( C ) we accept the picture it gives us.",
    ],
    ja: [
      '私たちは地図を、世界をかたよりなく写した絵、つまり実際にあるものの単純な写しだと考えがちである。しかし地球の平らな地図はどれも、ある種の妥協をふくんでいる。地球は丸いので、どこかを引きのばしたり切りさいたりせずに平らな面に広げることはできないのだ。したがって地図を作る人は、どの特徴を正確に保ち、どれをぎせいにするかを決めなければならない。',
      'もっとも有名な例は、1569年にゲラルドゥス・メルカトルが考えた投影法である。彼の地図は方角どうしの角度を正しく保っていたため、海を進む船乗りにとってきわめて役に立った。しかしその代償として、赤道から遠い地域が実際よりずっと大きく見えてしまう。そのような地図では、グリーンランドはアフリカとほぼ同じ大きさに見えるが、実際にはアフリカのほうが約14倍も大きいのである。',
      'こうしたゆがみは単なる技術的な細かい点ではない。多くの人はある一種類の地図を見て育つため、それが世界のどの地域が大きくて重要かという感覚を、知らないうちに形づくってしまうことがある。だからといって、地図が役に立たないとか不正直だというわけではない。地図はある特定の問いに答えるものであり、私たちはそれがえがく姿を受け入れる前に、その地図がどんな問いに答えるために作られたのかを問うべきだということなのである。',
    ],
    blanks: [
      { id: 'A', choices: ['somewhere', 'nowhere', 'anyhow', 'already'], answer: 0, why: '「どこかを引きのばしたり切りさいたりせずには」なので somewhere。' },
      { id: 'B', choices: ['although', 'because', 'unless', 'so that'], answer: 0, why: '「同じ大きさに見えるが、実際は14倍大きい」という逆接なので although。' },
      { id: 'C', choices: ['before', 'after', 'since', 'until'], answer: 0, why: '「受け入れる前に問うべきだ」なので before。' },
    ],
    tf: [
      { statement: '筆者は、平らな地図はどれも何らかの妥協をふくんでいると述べている。', answer: true, why: '第1段落 every flat map of the Earth involves a compromise。' },
      { statement: 'メルカトルの地図では、赤道から遠い地域が実際より小さく見える。', answer: false, why: '第2段落 appear much larger than they really are。' },
      { statement: '筆者は、地図は不正直なので使うべきではないと主張している。', answer: false, why: '第3段落 None of this means that maps are useless or dishonest。' },
    ],
    qa: [
      { q: 'Why was the Mercator projection useful for sailors?', choices: ['It kept the angles between directions correct.', 'It showed the true size of every country.', 'It was printed on a round globe.', 'It made Greenland look smaller.'], answer: 0, why: '第2段落 His map kept the angles between directions correct。' },
    ],
  },
  {
    id: 'toefl-roman-concrete',
    title: 'The Secret of Roman Concrete',
    level: 'TOEFL・IELTS（科学史）',
    paragraphs: [
      "Many modern concrete structures begin to crack and crumble within a century, yet some buildings constructed by the ancient Romans have survived for nearly two thousand years. The Pantheon in Rome, for example, still has an enormous concrete dome that has never been reinforced with steel. For a long time, scientists wondered ( A ) Roman concrete could last so long.",
      "Part of the answer lies in its ingredients. Roman builders mixed lime with volcanic ash, which reacts with lime and water to form strong mineral bonds. Harbor walls made this way even seem to have grown stronger over time, ( B ) seawater seeping into the concrete encouraged the growth of new crystals inside it.",
      "More recent research has suggested another clue. Small white lumps of lime, long dismissed as a sign of careless mixing, may actually have helped the concrete repair itself. When cracks formed and water entered, these lumps could dissolve and then harden again, filling the gaps. Engineers are now studying such ideas in the hope of developing modern materials that last longer and ( C ) less frequent replacement.",
    ],
    ja: [
      '現代のコンクリート建造物の多くは1世紀もたたないうちにひびが入り、くずれはじめるが、古代ローマ人が建てた建物の中には2000年近くも残っているものがある。たとえばローマのパンテオンには、鉄で補強されたことのない巨大なコンクリートのドームが今もある。長いあいだ、科学者たちはなぜローマのコンクリートがそれほど長もちするのかふしぎに思ってきた。',
      'その答えの一部は材料にある。ローマの建築家は石灰を火山灰とまぜた。火山灰は石灰や水と反応して強い鉱物の結びつきを作る。こうして作られた港のかべは、時間がたつにつれてかえって強くなったようにさえ見える。コンクリートにしみこんだ海水が、内部で新しい結晶が育つのをうながしたからである。',
      'より最近の研究は、もう一つの手がかりを示している。長いあいだ雑なまぜ方のしるしとして見すごされてきた小さな白い石灰のかたまりが、実はコンクリートが自分で修復するのを助けていたのかもしれないのだ。ひびができて水が入ると、これらのかたまりがとけてから再び固まり、すき間をうめることができた。技術者たちは今、より長もちし、取りかえの回数が少なくてすむ現代の材料を開発しようと、こうした考えを研究している。',
    ],
    blanks: [
      { id: 'A', choices: ['why', 'what', 'which', 'whose'], answer: 0, why: '「なぜそんなに長もちするのか」なので why（間接疑問）。' },
      { id: 'B', choices: ['because', 'although', 'unless', 'until'], answer: 0, why: '強くなった理由（海水が結晶の成長をうながした）を表すので because。' },
      { id: 'C', choices: ['require', 'requires', 'required', 'requiring'], answer: 0, why: 'materials that last longer and require 〜。that 節の動詞を and で並べる。主語 materials は複数なので require。' },
    ],
    tf: [
      { statement: 'パンテオンのドームは鉄で補強されている。', answer: false, why: '第1段落 has never been reinforced with steel。' },
      { statement: 'ローマの建築家は石灰と火山灰をまぜた。', answer: true, why: '第2段落 Roman builders mixed lime with volcanic ash。' },
      { statement: '白い石灰のかたまりは、雑なまぜ方による欠点でしかないことがわかった。', answer: false, why: '第3段落 may actually have helped the concrete repair itself。' },
    ],
    qa: [
      { q: 'How might the lime lumps have helped the concrete?', choices: ['They dissolved and hardened again to fill cracks.', 'They made the concrete lighter.', 'They kept water out completely.', 'They replaced the volcanic ash.'], answer: 0, why: '第3段落 these lumps could dissolve and then harden again, filling the gaps。' },
    ],
  },
{
    id: 'toefl-salmon-home',
    title: 'How Salmon Find Their Way Home',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Many salmon begin life in small freshwater streams, travel down rivers to the ocean, and spend several years feeding far out at sea. Then, ( A ) they are ready to reproduce, a large number of them return to the very stream in which they hatched. This journey can cover hundreds or even thousands of kilometers.",
      "Scientists believe that salmon rely on different senses at different stages of the trip. In the open ocean, where there are few landmarks, they may use the Earth's magnetic field as a kind of map. Studies of young salmon kept in tanks have shown that they respond to small changes in magnetic conditions ( B ) they would meet along their migration route.",
      "Once salmon reach the coast, smell appears to take over. While they are young, salmon seem to memorize the particular mixture of chemicals in the water of their home stream. Years later, they follow this familiar scent upstream, choosing the correct branch at each fork in the river. Because of this, changes to rivers, such as pollution or dams, can make it ( C ) for salmon to complete their journey.",
    ],
    ja: [
      '多くのサケは小さな淡水の川で生まれ、川を下って海へ行き、数年間を沖合で食べ物をとってすごす。そして、子孫を残す準備ができると、その多くが自分の生まれたまさにその川へもどってくる。この旅は数百キロ、ときには数千キロにもなる。',
      '科学者たちは、サケは旅の段階ごとにちがう感覚にたよっていると考えている。目印のほとんどない外洋では、地球の磁場を一種の地図として使っているのかもしれない。水そうで育てた若いサケの研究では、回遊の道すじで出会うような磁気の小さな変化に反応することが示されている。',
      'サケが沿岸にたどり着くと、においが主役になるようだ。サケは若いうちに、ふるさとの川の水にふくまれる化学物質の独特なまざり方を覚えているらしい。何年もあとに、サケはこのなじみのにおいをたどって川をさかのぼり、川の分かれ道ごとに正しい支流を選ぶ。そのため、よごれやダムといった川の変化は、サケが旅を終えるのをむずかしくすることがある。',
    ],
    blanks: [
      { id: 'A', choices: ['when', 'unless', 'although', 'whether'], answer: 0, why: '「子孫を残す準備ができると」なので時を表す when。' },
      { id: 'B', choices: ['that', 'who', 'where', 'what'], answer: 0, why: '先行詞 changes in magnetic conditions を説明する目的格の関係代名詞 that（they would meet 〜 の目的語）。' },
      { id: 'C', choices: ['harder', 'hardly', 'hard to', 'hardest'], answer: 0, why: 'make it 〜 for A to do「A が…するのを〜にする」。比較級 harder「よりむずかしく」。' },
    ],
    tf: [
      { statement: '多くのサケは、生まれた川とは別の川で子孫を残す。', answer: false, why: '第1段落 return to the very stream in which they hatched。' },
      { statement: '外洋では、サケは地球の磁場を手がかりにしているかもしれない。', answer: true, why: '第2段落 they may use the Earth\'s magnetic field as a kind of map。' },
      { statement: 'サケはふるさとの川のにおいを、海に出てから初めて覚える。', answer: false, why: '第3段落 While they are young, salmon seem to memorize 〜。' },
    ],
    qa: [
      { q: 'What helps salmon choose the right branch of a river?', choices: ['The familiar scent of their home stream.', 'The position of the sun.', 'The sound of other salmon.', 'The temperature of the ocean.'], answer: 0, why: '第3段落 they follow this familiar scent upstream, choosing the correct branch。' },
    ],
  },
{
    id: 'hs-book-box',
    title: 'The Book Box at the Bus Stop',
    level: '高校入試（体験文）',
    paragraphs: [
      "Near my house, there is a bus stop where many people wait every morning. Last spring, I noticed that most of them were just looking at their phones. I love reading, so I wondered ( A ) I could share some of my old books with them.",
      "With my father's help, I made a small wooden box with a roof and put it next to the bench. I put ten books inside and wrote a sign: \"Take a book, or leave a book. It's free.\" For the first week, nobody touched the box, and I felt a little sad. Then one morning, two books were gone, and a picture book I had never ( B ) before was there instead.",
      "Now the box is almost always full. Some people leave short notes in the books, such as \"This story made me cry\" or \"Please read chapter three!\" An old man told me that he had not read a novel for twenty years, but he now reads one every week. I learned that a small idea can connect people who would never talk to ( C ) otherwise.",
    ],
    ja: [
      '私の家の近くには、毎朝多くの人が待つバス停がある。去年の春、私はほとんどの人がただスマートフォンを見ていることに気づいた。私は読書が大好きなので、自分の古い本をその人たちと分かち合えないだろうかと思った。',
      '父に手伝ってもらって、私は屋根のついた小さな木の箱を作り、ベンチのとなりに置いた。中に本を10冊入れ、「本を1冊持っていくか、1冊置いていってください。無料です。」と看板に書いた。最初の1週間はだれも箱にさわらず、私は少し悲しくなった。ところがある朝、本が2冊なくなっていて、代わりに私が一度も見たことのない絵本が入っていた。',
      '今では、箱はほとんどいつもいっぱいだ。本の中に「この話で泣きました」や「ぜひ第3章を読んで！」のような短いメモを残していく人もいる。あるお年寄りの男性は、20年間小説を読んでいなかったが、今では毎週1冊読んでいると話してくれた。小さなアイデアが、そうでなければ決して話すことのない人どうしをつなげられるのだと、私は学んだ。',
    ],
    blanks: [
      { id: 'A', choices: ['if', 'that', 'what', 'because'], answer: 0, why: 'wondered if 〜「〜かどうかと思った」。' },
      { id: 'B', choices: ['seen', 'saw', 'see', 'seeing'], answer: 0, why: 'had never seen「一度も見たことがなかった」（過去完了の経験）。' },
      { id: 'C', choices: ['each other', 'themselves', 'anyone', 'it'], answer: 0, why: 'talk to each other「おたがいに話す」。' },
    ],
    tf: [
      { statement: '筆者は父親といっしょに本の箱を作った。', answer: true, why: "第2段落 With my father's help, I made a small wooden box。" },
      { statement: '箱を置いた最初の日から、多くの人が本を持っていった。', answer: false, why: '第2段落 For the first week, nobody touched the box。' },
      { statement: 'あるお年寄りの男性は、今では毎週小説を読んでいる。', answer: true, why: '第3段落 he now reads one every week。' },
    ],
    qa: [
      { q: 'Why did the writer start the book box?', choices: ['To share books with people waiting for the bus.', 'To sell old books for money.', 'To stop people from using phones at school.', 'To find a lost picture book.'], answer: 0, why: '第1段落 I wondered if I could share some of my old books with them。' },
    ],
  },
{
    id: 'adv-curse-knowledge',
    title: 'Why Experts Explain Badly',
    level: '難関大（評論）',
    paragraphs: [
      "It seems natural to assume that the people who know a subject best are also the best at teaching it. Experience, however, often suggests otherwise. A brilliant scientist may give a lecture that leaves students more confused than before, ( A ) a graduate student who learned the material only recently explains it with surprising clarity.",
      "Psychologists call one reason for this the \"curse of knowledge.\" Once we understand something, it becomes remarkably difficult to imagine what it was like not to understand it. Experts skip steps that seem obvious to them, use terms they no longer notice are technical, and underestimate how long a beginner needs. Their knowledge, in other words, hides from them the very gaps they ought to be filling.",
      "The curse cannot simply be removed by trying harder, since it works without our noticing it. What helps is to test our explanations against real learners: asking them to restate an idea in their own words, or watching where they hesitate. Seen in this light, a confused listener is not a failure ( B ) valuable evidence. Good teaching depends less on how much we know than on how willing we are to see our subject through ( C ) eyes.",
    ],
    ja: [
      'ある分野をいちばんよく知っている人が、それを教えるのもいちばんうまいと考えるのは自然なことに思える。しかし経験は、しばしばそうではないことを示している。すぐれた科学者が、学生を前よりもかえって混乱させる講義をする一方で、その内容を最近学んだばかりの大学院生が、おどろくほどわかりやすく説明することがある。',
      '心理学者は、その理由の一つを「知識の呪い」とよぶ。いったん何かを理解すると、それを理解していなかったときにどうだったかを想像するのが非常にむずかしくなる。専門家は自分には当たり前に思える手順を飛ばし、もはや専門用語だと気づかない言葉を使い、初心者に必要な時間を少なく見積もる。言いかえれば、専門家の知識そのものが、本来うめるべきまさにそのすき間を本人から見えなくしてしまうのである。',
      'この呪いは、気づかないうちに働くので、がんばるだけではとりのぞけない。役に立つのは、実際の学習者を相手に自分の説明をためしてみることだ。考えを自分の言葉で言い直してもらったり、どこで言葉につまるかを観察したりするのである。このように考えると、とまどっている聞き手は失敗ではなく、貴重な証拠である。よい教え方は、どれだけ多くを知っているかよりも、自分の分野を他人の目を通して見ようとする気持ちがどれだけあるかにかかっている。',
    ],
    blanks: [
      { id: 'A', choices: ['while', 'because', 'unless', 'so that'], answer: 0, why: '「科学者は混乱させる一方で、大学院生はわかりやすく説明する」という対比なので while。' },
      { id: 'B', choices: ['but', 'and', 'or', 'nor'], answer: 0, why: 'not A but B「A ではなく B」。' },
      { id: 'C', choices: ["others'", "other's", 'another', 'the other'], answer: 0, why: "through others' eyes「他人の目を通して」。複数の他人の所有格 others'。" },
    ],
    tf: [
      { statement: '筆者は、ある分野にいちばんくわしい人が、いつもいちばんよい教え手だと述べている。', answer: false, why: '第1段落 Experience, however, often suggests otherwise。' },
      { statement: '「知識の呪い」とは、理解していなかったころの状態を想像しにくくなることである。', answer: true, why: '第2段落 it becomes remarkably difficult to imagine what it was like not to understand it。' },
      { statement: '筆者は、この呪いは努力すれば簡単にとりのぞけると考えている。', answer: false, why: '第3段落 The curse cannot simply be removed by trying harder。' },
    ],
    qa: [
      { q: 'According to the writer, what can help reduce the curse of knowledge?', choices: ['Testing explanations with real learners.', 'Using more technical terms.', 'Studying the subject for a longer time.', 'Giving shorter lectures.'], answer: 0, why: '第3段落 What helps is to test our explanations against real learners。' },
    ],
  },
{
    id: 'toefl-heat-island',
    title: 'Why Cities Stay Warm at Night',
    level: 'TOEFL・IELTS（環境）',
    paragraphs: [
      "On a summer evening, a person driving from the countryside into a large city may notice that the air becomes warmer, even ( A ) the sun has already set. This difference, known as the urban heat island effect, can make a city several degrees warmer than the rural areas around it, and it is usually strongest at night.",
      "Several features of cities work together to produce this effect. Dark surfaces such as asphalt roads and roofs absorb a large share of the sunlight that falls on them during the day. After sunset, they slowly release this stored heat into the air. In addition, cities have fewer trees and fields. Plants cool their surroundings by releasing water vapor from their leaves, ( B ) concrete and stone provide no such cooling. Heat from cars, factories, and air conditioners adds even more warmth.",
      "Because higher temperatures can harm health and increase energy use, many cities are looking for solutions. Some are planting more trees along streets, while others encourage \"green roofs\" covered with plants. Painting roofs in light colors that reflect sunlight is another simple method. Although none of these steps can remove the effect completely, together they can make city life noticeably ( C ) comfortable in hot weather.",
    ],
    ja: [
      '夏の夕方、いなかから大都市へ車で入っていくと、太陽がもうしずんでいるのに空気があたたかくなることに気づくかもしれない。この差は都市のヒートアイランド現象として知られ、都市をまわりの農村部より数度あたたかくすることがあり、ふつうは夜にいちばん強くなる。',
      '都市のいくつかの特徴が組み合わさって、この現象を生み出す。アスファルトの道路や屋根のような色のこい表面は、昼のあいだに当たる日光の大部分を吸収する。日がしずんだあと、それらはたくわえた熱を少しずつ空気中に放出する。さらに、都市には木や畑が少ない。植物は葉から水蒸気を出すことでまわりを冷やすが、コンクリートや石にはそのような冷やすはたらきがない。車や工場、エアコンから出る熱が、さらにあたたかさを加える。',
      '気温が高くなると健康がそこなわれたり、エネルギーの使用がふえたりするので、多くの都市が解決策をさがしている。通りぞいに木をふやしている都市もあれば、植物でおおわれた「屋上緑化」をすすめている都市もある。日光を反射する明るい色で屋根をぬるのも、もう一つの簡単な方法だ。これらの対策のどれも現象を完全になくすことはできないが、組み合わせれば、暑い時期の都市の生活をはっきりと快適にすることができる。',
    ],
    blanks: [
      { id: 'A', choices: ['though', 'because', 'so', 'until'], answer: 0, why: 'even though 〜「〜なのに」。日がしずんだのにあたたかい、という逆接。' },
      { id: 'B', choices: ['whereas', 'because', 'so', 'unless'], answer: 0, why: '植物は冷やす、コンクリートは冷やさない、という対比なので whereas「〜であるのに対して」。' },
      { id: 'C', choices: ['more', 'most', 'much', 'very'], answer: 0, why: 'comfortable の比較級は more comfortable。noticeably は比較級を強める副詞。' },
    ],
    tf: [
      { statement: 'ヒートアイランド現象は、ふつう昼の正午ごろにいちばん強くなる。', answer: false, why: '第1段落 it is usually strongest at night。' },
      { statement: '色のこい表面は、昼に吸収した熱を日没後に放出する。', answer: true, why: '第2段落 After sunset, they slowly release this stored heat into the air。' },
      { statement: '筆者は、対策を組み合わせればヒートアイランド現象を完全になくせると述べている。', answer: false, why: '第3段落 none of these steps can remove the effect completely。' },
    ],
    qa: [
      { q: 'How do plants help cool their surroundings?', choices: ['By releasing water vapor from their leaves.', 'By absorbing heat from cars.', 'By reflecting all sunlight.', 'By making the soil darker.'], answer: 0, why: '第2段落 Plants cool their surroundings by releasing water vapor from their leaves。' },
    ],
  },
{
    id: 'hs-wrong-train',
    title: 'The Wrong Train',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last summer, I went to see my aunt in Nagoya by myself. It was my first time traveling alone, so I was excited but also nervous. At the big station, I got on a train that was leaving soon. After a few minutes, I looked at the screen above the door and realized that I was going the wrong ( A ).",
      "I did not know what to do, and I almost started to cry. Then an old woman sitting next to me asked, \"Are you all right?\" I showed her the name of my aunt's station. She smiled and said, \"Don't worry. Get off at the next station and take the train on the other side.\" She even wrote the time of the next train on a piece of paper ( B ) me.",
      "Thanks to her, I arrived at my aunt's house only thirty minutes late. I did not ask the woman's name, so I cannot thank her now. However, I decided one thing on that day. When I see someone ( C ) is in trouble, I will be the first person to say, \"Are you all right?\"",
    ],
    ja: [
      '去年の夏、私はひとりで名古屋のおばに会いに行った。ひとり旅は初めてだったので、わくわくしていたが、不安でもあった。大きな駅で、私はもうすぐ出発する電車に乗った。数分後、ドアの上の画面を見て、逆の方向に向かっていることに気づいた。',
      'どうすればいいのかわからず、私は泣きだしそうになった。そのとき、となりにすわっていたおばあさんが「だいじょうぶ？」と聞いてくれた。私がおばの家の最寄り駅の名前を見せると、彼女はほほえんで「心配しないで。次の駅で降りて、反対側のホームの電車に乗りなさい」と言った。彼女は私のために、次の電車の時刻を紙に書いてくれさえした。',
      '彼女のおかげで、私はたった30分おくれただけでおばの家に着いた。その女性の名前を聞かなかったので、今お礼を言うことはできない。けれども、その日私はひとつのことを決めた。困っている人を見かけたら、自分が最初に「だいじょうぶですか？」と声をかける人になろう、と。',
    ],
    blanks: [
      { id: 'A', choices: ['way', 'road', 'side', 'line'], answer: 0, why: 'go the wrong way「逆の方向に行く・道をまちがえる」。' },
      { id: 'B', choices: ['for', 'to', 'with', 'from'], answer: 0, why: 'for me「私のために」。' },
      { id: 'C', choices: ['who', 'which', 'what', 'whose'], answer: 0, why: '先行詞 someone（人）を説明する主格の関係代名詞 who。' },
    ],
    tf: [
      { statement: '筆者は家族といっしょに名古屋へ行った。', answer: false, why: '第1段落 by myself（ひとりで）。' },
      { statement: 'おばあさんは、次の電車の時刻を紙に書いてくれた。', answer: true, why: '第2段落 She even wrote the time of the next train on a piece of paper for me。' },
      { statement: '筆者はおばあさんの名前を知っているので、あとでお礼を言った。', answer: false, why: '第3段落 I did not ask the woman\'s name, so I cannot thank her now。' },
    ],
    qa: [
      { q: 'What did the writer decide after this experience?', choices: ['To be the first to help people in trouble.', 'To never travel alone again.', 'To live with the aunt in Nagoya.', 'To learn the names of all stations.'], answer: 0, why: '第3段落 I will be the first person to say, "Are you all right?"' },
    ],
  },
{
    id: 'adv-commons',
    title: 'Can We Share Without Ruining?',
    level: '難関大（評論）',
    paragraphs: [
      "Imagine a pasture that is open to every farmer in a village. Each farmer gains by adding one more cow, while the damage caused by overgrazing is spread among everyone. Acting sensibly from his or her own point of view, each farmer keeps adding animals, ( A ) the grass is gone and all of them suffer. In 1968, the ecologist Garrett Hardin called this situation \"the tragedy of the commons,\" and argued that shared resources would inevitably be destroyed unless they were either divided into private property or strictly controlled by the state.",
      "The idea proved influential, but it was not the whole story. The political economist Elinor Ostrom spent years studying real communities that had managed forests, fisheries, and irrigation systems for generations without exhausting them. What she found was that the tragedy is not inevitable. Where users could communicate, agree on their own rules, watch for cheating, and punish it fairly, shared resources were often maintained successfully. Her work earned her the Nobel Prize in Economics in 2009.",
      "Ostrom's findings matter today, ( B ) many of our most serious problems, from overfishing to climate change, involve resources that no single owner controls. They suggest that the choice is not simply between the market and the government. Trust, local knowledge, and rules that people regard as fair can sometimes achieve ( C ) neither private ownership nor distant authorities could.",
    ],
    ja: [
      '村のすべての農民に開かれた牧草地を想像してほしい。牛を1頭ふやせば、その農民は得をするが、牧草の食べすぎによる損害はみんなに分散される。自分の立場から見れば分別のある行動として、それぞれの農民は家畜をふやしつづけ、ついには草がなくなり、全員が苦しむことになる。1968年、生態学者ギャレット・ハーディンはこの状況を「共有地の悲劇」とよび、共有の資源は、私有財産に分けるか、国家がきびしく管理しないかぎり、必ずほろびると主張した。',
      'この考えは大きな影響力をもったが、それですべてが説明できるわけではなかった。政治経済学者エリノア・オストロムは、森林や漁場、かんがい施設を、使いつくすことなく何世代にもわたって管理してきた実際の共同体を何年もかけて調べた。彼女がわかったのは、悲劇は避けられないものではないということだった。使う人どうしが話し合い、自分たちでルールを決め、ずるをする人を見張り、公正に罰することができるところでは、共有の資源はしばしばうまく保たれていた。この研究で、彼女は2009年にノーベル経済学賞を受けた。',
      'オストロムの発見は今日も重要である。というのも、魚のとりすぎから気候変動まで、私たちのもっとも深刻な問題の多くは、ただ一人の持ち主が管理しているのではない資源にかかわっているからだ。彼女の発見は、選択肢が単に市場か政府かというものではないことを示している。信頼や地域の知識、人々が公正だと考えるルールは、私的所有も遠くの権力もなしとげられないことを、ときになしとげることができるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['until', 'unless', 'since', 'whether'], answer: 0, why: '「草がなくなるまで家畜をふやしつづける」なので until。' },
      { id: 'B', choices: ['because', 'although', 'unless', 'so that'], answer: 0, why: '今日も重要である理由を述べているので because。' },
      { id: 'C', choices: ['what', 'that', 'which', 'it'], answer: 0, why: 'achieve の目的語になる名詞節「～するもの・こと」なので関係代名詞 what。' },
    ],
    tf: [
      { statement: 'ハーディンは、共有の資源は私有化か国家の管理がなければほろびると主張した。', answer: true, why: '第1段落 unless they were either divided into private property or strictly controlled by the state。' },
      { statement: 'オストロムは、共有地の悲劇は必ず起こることを確かめた。', answer: false, why: '第2段落 the tragedy is not inevitable。' },
      { statement: '筆者は、選択肢は市場か政府かの2つしかないと述べている。', answer: false, why: '第3段落 the choice is not simply between the market and the government。' },
    ],
    qa: [
      { q: 'According to Ostrom, what helped communities maintain shared resources?', choices: ['Making and enforcing their own fair rules.', 'Selling the resources to one owner.', 'Letting each person take as much as they want.', 'Asking a distant government to decide everything.'], answer: 0, why: '第2段落 agree on their own rules, watch for cheating, and punish it fairly。' },
    ],
  },
{
    id: 'toefl-mangroves',
    title: 'Forests That Grow in the Sea',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      "Along many tropical and subtropical coasts, there are forests whose trees stand directly in salty water. These are mangroves, a group of trees and shrubs that have adapted to conditions that would kill most other plants. Twice a day, the tide covers their roots with seawater, and the soft mud ( A ) they grow contains very little oxygen.",
      "Mangroves cope with these challenges in remarkable ways. Some species block most of the salt at their roots, while others take it in and then release it through special glands on their leaves. To get oxygen, many mangroves send up small roots that stick out of the mud like pencils, allowing air to reach the parts of the root system buried below. Others are supported by curved roots that arch above the water, ( B ) the trees look as if they are standing on stilts.",
      "These forests are valuable to people as well as to wildlife. Their dense roots slow down waves and help protect coastal communities from storms and erosion. The calm, shaded water among the roots provides a safe place for young fish to grow. Mangrove soils also store large amounts of carbon. Unfortunately, many mangrove forests have been cleared for farms and coastal development, ( C ) has led a number of countries to begin replanting them.",
    ],
    ja: [
      '熱帯や亜熱帯の多くの海岸ぞいには、木々が塩水の中に直接立っている森がある。これがマングローブで、ほかのほとんどの植物なら枯れてしまうような環境に適応した木や低木のなかまである。1日に2回、潮が根を海水でおおい、マングローブが育つやわらかい泥にはほとんど酸素がふくまれていない。',
      'マングローブは、おどろくべき方法でこうした困難に対処している。根で塩分の大部分をさえぎる種類もあれば、塩分をとりこんでから葉にある特別な腺から出す種類もある。酸素を得るために、多くのマングローブは鉛筆のように泥から突き出る小さな根をのばし、地中にうまった根の部分まで空気が届くようにしている。また、水面より上に弓のようにまがった根に支えられている種類もあり、そのため木々はまるで竹馬に乗って立っているように見える。',
      'これらの森は、野生生物だけでなく人間にとっても価値がある。密集した根は波の勢いを弱め、海岸ぞいの地域を嵐や浸食から守るのに役立つ。根のあいだのおだやかで日かげになった水は、若い魚が育つ安全な場所になる。マングローブの土は大量の炭素もたくわえている。残念なことに、多くのマングローブ林が農地や沿岸の開発のために切りひらかれてきた。そのことがきっかけとなって、いくつかの国はマングローブを植えなおしはじめている。',
    ],
    blanks: [
      { id: 'A', choices: ['in which', 'which', 'what', 'where in'], answer: 0, why: 'they grow in the mud の in が関係代名詞の前に出た形で in which。' },
      { id: 'B', choices: ['making', 'made', 'to make', 'makes'], answer: 0, why: '分詞構文「そして～させる」。主節の内容が木々を～のように見せる、という結果を表すので making。' },
      { id: 'C', choices: ['which', 'that', 'what', 'it'], answer: 0, why: '前の文の内容全体を受ける非制限用法の which。コンマのあとに that は使えない。' },
    ],
    tf: [
      { statement: 'マングローブが育つ泥には、酸素がたくさんふくまれている。', answer: false, why: '第1段落 contains very little oxygen。' },
      { statement: '塩分を葉から出すマングローブもある。', answer: true, why: '第2段落 release it through special glands on their leaves。' },
      { statement: 'マングローブの根は、嵐から海岸の地域を守るのに役立つ。', answer: true, why: '第3段落 help protect coastal communities from storms and erosion。' },
    ],
    qa: [
      { q: 'Why do some mangroves have roots that stick out of the mud?', choices: ['To let air reach the roots below.', 'To catch fish for food.', 'To store salt for later.', 'To keep birds away.'], answer: 0, why: '第2段落 allowing air to reach the parts of the root system buried below。' },
    ],
  },
{
    id: 'hs-classmate-brazil',
    title: 'Words in Two Languages',
    level: '高校入試（体験文）',
    paragraphs: [
      "In April, a new student named Lucas joined our class. He came from Brazil, and he could speak only a little Japanese. On his first day, he sat quietly and did not talk to anyone. I wanted to talk with him, but I did not know ( A ) to begin.",
      "One day during lunch, I showed him a notebook. On each page, I wrote a Japanese word with a picture, and I asked him to write the same word in Portuguese. Lucas smiled for the first time. Soon our notebook was full of words like \"bread,\" \"rain,\" and \"friend.\" Other classmates became interested and joined us. Lucas taught us how to say \"Good morning\" in Portuguese, and we taught him words we use at school.",
      "By summer, Lucas was talking with everyone. He told me, \"Your notebook was the key that opened the door.\" I learned that we don't need perfect language to make friends. What is important ( B ) to try to understand each other. Now I am studying Portuguese, and Lucas is studying for the Japanese test he will take ( C ) year.",
    ],
    ja: [
      '4月、ルーカスという新しい生徒が私たちのクラスに入った。彼はブラジルから来て、日本語は少ししか話せなかった。最初の日、彼は静かにすわっていて、だれとも話さなかった。私は彼と話したかったが、どうやって始めればいいのかわからなかった。',
      'ある日の昼休み、私は彼に1冊のノートを見せた。各ページに日本語の単語を絵といっしょに書き、同じ単語をポルトガル語で書いてくれるようたのんだ。ルーカスは初めてほほえんだ。まもなく私たちのノートは「パン」「雨」「友だち」のような言葉でいっぱいになった。ほかのクラスメートも興味をもって加わった。ルーカスはポルトガル語で「おはよう」の言い方を教えてくれ、私たちは学校で使う言葉を彼に教えた。',
      '夏までに、ルーカスはみんなと話すようになった。彼は私に「きみのノートは、ドアを開けるかぎだったよ」と言った。友だちになるのに完ぺきな言葉はいらないのだと私は学んだ。大切なのは、おたがいを理解しようとすることだ。今、私はポルトガル語を勉強していて、ルーカスは来年受ける日本語の試験に向けて勉強している。',
    ],
    blanks: [
      { id: 'A', choices: ['how', 'what', 'which', 'who'], answer: 0, why: 'how to begin「どうやって始めればよいか」（疑問詞＋to）。' },
      { id: 'B', choices: ['is', 'are', 'was', 'be'], answer: 0, why: '主語 What is important（大切なこと）は単数あつかいで、現在の一般的な考えなので is。' },
      { id: 'C', choices: ['next', 'last', 'every', 'past'], answer: 0, why: 'will take（未来）なので next year「来年」。' },
    ],
    tf: [
      { statement: 'ルーカスは、日本に来たときすでに日本語を上手に話せた。', answer: false, why: '第1段落 he could speak only a little Japanese。' },
      { statement: '筆者はノートを使ってルーカスと言葉を教え合った。', answer: true, why: '第2段落の内容と合う。' },
      { statement: '筆者は、友だちになるには完ぺきな言葉が必要だと考えている。', answer: false, why: "第3段落 we don't need perfect language to make friends。" },
    ],
    qa: [
      { q: 'What did Lucas mean by "the key that opened the door"?', choices: ['The notebook helped him make friends.', 'He found a real key in the notebook.', 'The notebook had the classroom key.', 'He wanted to go home to Brazil.'], answer: 0, why: '第3段落：ノートがきっかけでみんなと話せるようになった、というたとえ。' },
    ],
  },
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
      { q: 'What did some small studies find about placebos?', choices: ['They can help even when patients know the pill has no active ingredients.', 'They only work when doctors lie to patients.', 'They are more effective than real drugs.', 'They have no effect on pain at all.'], answer: 0, why: '第3段落 placebos can help even when patients are told openly 〜。' },
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
      "After the match, I sat alone in the corner of the gym and could not stop crying. Then the girl who beat me came over. She said, \"Your smash was really strong. I was afraid of it the whole time.\" I was surprised. I had thought only about my mistakes, but she had seen my strong point. We talked for a while, and she told me how she practiced her footwork every morning ( B ) school.",
      "Since that day, I have started practicing footwork, too. I still lose sometimes, but I am not afraid of losing anymore. A match I lose can teach me more than a match I win. Next summer, I want to play against her again and show her ( C ) much I have improved.",
    ],
    ja: [
      '私はバドミントン部に入って2年になる。去年の夏、市の大会に出場した。だれよりも一生けんめい練習していたので、1回戦は勝てると信じていた。しかし、相手は私よりずっと動きの速い1年生だった。私はたった20分で試合に負けた。',
      '試合のあと、私は体育館のすみにひとりですわり、涙が止まらなかった。そのとき、私に勝った女の子がやって来た。彼女は「あなたのスマッシュ、本当に強かった。ずっとこわかったよ」と言った。私はおどろいた。私は自分のミスのことばかり考えていたのに、彼女は私の長所を見ていたのだ。私たちはしばらく話し、彼女は毎朝学校の前にフットワークの練習をしていると教えてくれた。',
      'その日から、私もフットワークの練習を始めた。今でもときどき負けるが、もう負けることはこわくない。負けた試合は、勝った試合よりも多くのことを教えてくれることがある。来年の夏、もう一度彼女と対戦して、私がどれだけ上達したかを見せたい。',
    ],
    blanks: [
      { id: 'A', choices: ['faster', 'fast', 'fastest', 'more fast'], answer: 0, why: 'than があるので比較級。fast の比較級は faster。much は比較級を強める。' },
      { id: 'B', choices: ['before', 'during', 'between', 'since'], answer: 0, why: '「学校の前に（登校前に）」なので before。' },
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
      "Like human farmers, the ants must protect their crop from pests. A harmful fungus can invade the gardens and destroy them. Researchers have found that many leafcutter ants carry bacteria on their bodies that produce chemicals able to stop the growth of this invader. In other words, the ants appear to have been using a kind of natural antibiotic long ( C ) humans discovered such medicines.",
    ],
    ja: [
      '中南米の森では、自分の頭の何倍も大きい葉のかけらを運ぶアリの長い列が見られる。これがハキリアリだ。アリが葉を食べると考えるのは自然に思えるかもしれないが、そうではない。アリは葉を使って菌を育て、その菌がコロニーの主な食べ物になるのである。',
      '地下の巣の中で、働きアリは葉のかけらをかんでやわらかいペースト状にし、特別な部屋に広げる。菌はこのペーストの上で育ち、アリはその一部を食べる。仕事は大きさのちがう働きアリのあいだで分担されている。いちばん大きいアリはコロニーを守り、中くらいのアリは葉を切って運び、いちばん小さいアリはこわれやすい菌の畑の世話をする。成熟したコロニーには何百万もの個体がいることがあり、そのためハキリアリは動物の世界でもっとも複雑な社会の一つとなっている。',
      '人間の農家と同じように、アリも作物を害虫から守らなければならない。有害な菌が畑に入りこみ、畑をだめにしてしまうことがあるのだ。研究者たちは、多くのハキリアリが、この侵入者の成長を止める化学物質を作る細菌を体につけていることを発見した。つまり、アリは人間がそのような薬を発見するずっと前から、一種の天然の抗生物質を使ってきたらしいのである。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'that', 'what', 'it'], answer: 0, why: 'コンマのあとで a fungus を説明する非制限用法の which。that はコンマのあとに使えない。' },
      { id: 'B', choices: ['making', 'made', 'to make', 'makes'], answer: 0, why: '分詞構文「そしてそれは～にする」。前の内容の結果を表すので making。' },
      { id: 'C', choices: ['before', 'after', 'since', 'until'], answer: 0, why: 'long before ～「～するずっと前に」。' },
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
      { q: 'What kind of evidence would be needed to support the learning-styles theory?', choices: ['That each type of learner learns more when taught in the matching way.', 'That people prefer some ways of learning.', 'That teachers like using pictures.', 'That music is easier than maps.'], answer: 0, why: '第2段落 a study would need to show that visual learners do better with pictures 〜, and not just that people have preferences。' },
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
      { q: 'Why is the sea otter called a "keystone species"?', choices: ['Its effect on its environment is much greater than its numbers suggest.', 'It is the largest animal in the kelp forest.', 'It builds homes out of stones.', 'It eats kelp more than any other animal.'], answer: 0, why: '第3段落 whose effect on its environment is far greater than its numbers would suggest。' },
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
      { q: 'Why do engineers sometimes raise buildings on posts in permafrost regions?', choices: ['To keep heat from the buildings from reaching the frozen ground.', 'To let more sunlight reach the ground.', 'To make the active layer thicker.', 'To collect methane from the soil.'], answer: 0, why: '第3段落 so that heat from inside does not reach the frozen ground。' },
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
      { q: 'What allows a gecko to stick to smooth surfaces?', choices: ['Weak forces between molecules, multiplied by millions of tiny hair tips.', 'A sticky liquid produced by its feet.', 'Suction cups on the bottom of its toes.', 'Sharp claws that dig into the surface.'], answer: 0, why: '第2段落 van der Waals forces ... because there are so many of them。' },
    ],
  },
]
