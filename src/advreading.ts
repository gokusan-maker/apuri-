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
      'In health class, our teacher showed us how much sugar is in one bottle of a popular soft drink. It was more than ten sugar cubes! I was shocked because I usually drank ( A ) bottles a day.',
      'I decided to try an experiment: for one week, I would drink only water and tea. The first three days were hard. I kept thinking about soft drinks, especially after club practice. On the fourth day, however, I noticed that I was not as tired in the afternoon ( B ) before. I also started to enjoy the taste of cold green tea.',
      'By the end of the week, I had saved the money I usually spent on drinks, and I felt better. I have not stopped drinking soft drinks completely, but now I have one only on weekends. Small changes in our daily habits can make a big ( C ) to our health.',
    ],
    ja: [
      '保健の授業で、先生が人気のある清涼飲料水1本にどれだけ砂糖が入っているかを見せてくれました。角砂糖10個以上でした！ 私はふだん1日に2本飲んでいたので、ショックを受けました。',
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
      "Now the water is much cleaner, and we can see small fish swimming again. This project taught me that one person cannot change much alone, but when people work together, they can make a big difference. Why don't you join us next Sunday? We would be very happy ( C ) you there. Thank you for listening.",
    ],
    ja: [
      'みなさん、おはようございます。今日は、私たちの学校の裏を流れる小さな川についてお話ししたいと思います。2年前、その川はビニールぶくろや空きかんでいっぱいで、だれも近づこうとしませんでした。',
      '私たちの科学部は、何かしようと決めました。1週間おきの日曜日に、手ぶくろをして大きなふくろを持ち、川ぞいのごみを拾いました。はじめは部員が5人しか来ませんでしたが、町にポスターをはると、たくさんの人が参加してくれるようになりました。この春には、子どもやお年寄りをふくめ、50人以上が参加しました。',
      '今では水はずっときれいになり、また小さな魚が泳いでいるのが見られます。この活動から、一人では大きくは変えられないけれど、みんなで力を合わせれば大きなちがいを生むことができると学びました。次の日曜日、いっしょに参加しませんか。そこで会えたら、私たちはとてもうれしいです。ご清聴ありがとうございました。',
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
      { id: 'C', choices: ['rather', 'better', 'more', 'sooner'], answer: 0, why: 'A rather than B「BではなくA」。友情へのおどしではなく、考えるための道具。' },
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
      { id: 'B', choices: ['if', 'though', 'because', 'so'], answer: 0, why: 'as if ＋ 過去形（were）で「まるで〜であるかのように」。' },
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
      { id: 'A', choices: ['as', 'so', 'too', 'very'], answer: 0, why: 'not as 〜 as …「…ほど〜ではない」。' },
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
]
