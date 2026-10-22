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
      { id: 'A', choices: ['rather', 'better', 'more', 'other'], answer: 0, why: 'A rather than B「BではなくA」。特におもしろいことではなく、ふつうの発言のあと。' },
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
      'The longest ice cores collected so far cover roughly 800,000 years. Throughout that entire period, carbon dioxide levels never ( C ) the levels measured in the air today. This comparison is one of the reasons many scientists regard current changes in the atmosphere as unusual.',
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
      'At my school, the broadcasting club makes a short radio show every Wednesday at lunchtime. Last spring, I joined the club because I wanted to get better ( A ) speaking in front of people.',
      'My first show was a disaster. I spoke too fast, and I forgot to turn on the microphone for the first minute. Some students in the cafeteria laughed. After that, I practiced reading the script aloud every day and asked an older member ( B ) give me advice. She told me to imagine that I was talking to just one friend.',
      "Two months later, I introduced a song that a classmate had requested. After the show, a first-year student came up to me and said, 'Your voice helped me feel less lonely at lunch.' I was so happy. Now I know that what we say can reach people we have never ( C ).",
    ],
    ja: [
      '私の学校では、放送部が毎週水曜日の昼休みに短いラジオ番組をつくっています。去年の春、私は人前で話すのが上手になりたくて、放送部に入りました。',
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
      'Moving the wheelchair and holding the ball at the same time was very difficult. I could not even get close to the basket. A player on the local team, Mr. Sato, showed me how to turn quickly by pushing only one wheel. He has used a wheelchair ( B ) a car accident twenty years ago.',
      "At the end of the day, we played a short game together. Mr. Sato moved so fast that nobody could stop him. He told me, 'People often see only what I cannot do. I want them to see what I ( C ) do.' Since that day, I have tried to look at people in a different way, paying attention to their strengths first.",
    ],
    ja: [
      '去年の夏、私たちの町で、だれでも車いすバスケットボールを体験できるスポーツイベントが開かれました。私はバスケットボールを3年間やっていたので、かんたんだろうと思っていました。でも、それはまちがいでした。',
      '車いすを動かしながらボールを持つのは、とても難しかったです。ゴールに近づくことさえできませんでした。地元チームの選手の佐藤さんが、片方の車輪だけをおしてすばやく回る方法を教えてくれました。佐藤さんは20年前の交通事故以来、車いすを使っています。',
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
      "After that, I became interested in sign language. I borrowed a book from the library and practiced simple words like 'thank you' and 'delicious' every night. At first my hands moved slowly, but little by little I got ( B ) at it.",
      "A month later, I visited the cafe again and signed 'thank you' to the staff member. Her face lit up, and she signed something back. I did not understand everything, but I felt that we were really talking. I learned that communication is not only about the words we ( C ) with our mouths. Now I want to learn more signs.",
    ],
    ja: [
      '私の町には、耳の聞こえない店員さんが何人かはたらいているカフェがあります。はじめて行ったとき、私は注文のしかたがわかりませんでした。店員さんがほほえんで、写真つきのメニューを指さしてくれたので、何の問題もなく注文することができました。',
      'それから私は手話に興味をもちました。図書館で本を借りて、「ありがとう」や「おいしい」のような簡単なことばを毎晩練習しました。はじめは手がゆっくりとしか動きませんでしたが、少しずつ上手になりました。',
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
      { id: 'C', choices: ['bring', 'keep', 'break', 'send'], answer: 0, why: 'bring people together「人々を結びつける」。' },
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
]
