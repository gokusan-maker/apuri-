// 難関大（大学入試レベル）・TOEFL/IELTS レベル（と一部の高校入試レベル）の読解。本文・訳・設問・解説はすべて自作
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
      "The most famous example is the projection created by Gerardus Mercator in 1569. His map kept the angles between directions correct, which made it extremely useful for sailors steering across the ocean. The price, however, was that areas far from the equator appear much larger than they really are. On such a map, Greenland looks roughly the same size as Africa, ( B ) is in fact about fourteen times larger.",
      "Such distortions are not merely technical details. Because many people grow up seeing one kind of map, it can quietly shape their sense of which regions of the world are large and important. None of this means that maps are useless or dishonest. It means that a map answers a particular question, and that we should ask what question it was designed to answer before ( C ) the picture it gives us.",
    ],
    ja: [
      '私たちは地図を、世界をかたよりなく写した絵、つまり実際にあるものの単純な写しだと考えがちである。しかし地球の平らな地図はどれも、ある種の妥協をふくんでいる。地球は丸いので、どこかを引きのばしたり切りさいたりせずに平らな面に広げることはできないのだ。したがって地図を作る人は、どの特徴を正確に保ち、どれをぎせいにするかを決めなければならない。',
      'もっとも有名な例は、1569年にゲラルドゥス・メルカトルが考えた投影法である。彼の地図は方角どうしの角度を正しく保っていたため、海を進む船乗りにとってきわめて役に立った。しかしその代償として、赤道から遠い地域が実際よりずっと大きく見えてしまう。そのような地図では、グリーンランドはアフリカとほぼ同じ大きさに見えるが、実際にはアフリカのほうが約14倍も大きいのである。',
      'こうしたゆがみは単なる技術的な細かい点ではない。多くの人はある一種類の地図を見て育つため、それが世界のどの地域が大きくて重要かという感覚を、知らないうちに形づくってしまうことがある。だからといって、地図が役に立たないとか不正直だというわけではない。地図はある特定の問いに答えるものであり、私たちはそれがえがく姿を受け入れる前に、その地図がどんな問いに答えるために作られたのかを問うべきだということなのである。',
    ],
    blanks: [
      { id: 'A', choices: ['somewhere', 'nowhere', 'anyhow', 'already'], answer: 0, why: '「どこかを引きのばしたり切りさいたりせずには」なので somewhere。' },
      { id: 'B', choices: ['which', 'what', 'who', 'it'], answer: 0, why: 'コンマのあとで Africa を説明し、あとに動詞 is が続くので関係代名詞 which（非制限用法）。what は先行詞をとらない、who は人、it では文が接続詞なしでつながってしまう。' },
      { id: 'C', choices: ['accepting', 'accept', 'accepted', 'to accept'], answer: 0, why: '前置詞 before のあとは動名詞（～ing）。before accepting「受け入れる前に」。' },
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
    id: 'adv-microbiome',
    title: 'The Hidden Population Inside Us',
    level: '難関大（評論）',
    paragraphs: [
      "Each of us carries trillions of microorganisms, most of them living in the large intestine. For a long time, these bacteria were regarded mainly as passengers, or ( A ) as a source of disease. Over the past two decades, however, new techniques for reading the genetic material of entire microbial communities have shown that this hidden population, now called the gut microbiome, plays a far more active role in human health than anyone had imagined.",
      "Gut bacteria break down fibers that our own enzymes cannot digest, producing compounds that nourish the cells lining the intestine. They also appear to train the immune system. Mice raised in completely sterile conditions, ( B ) any microbes at all, develop immune systems that are poorly regulated, and they respond abnormally to infections. Some researchers suspect that the rise of allergies in wealthy countries may be linked to reduced contact with a wide range of microbes in early childhood, although this idea, often called the hygiene hypothesis, remains controversial.",
      "Such findings have encouraged enthusiasm, and sometimes exaggeration. Products ( C ) to improve the microbiome are now sold widely, yet for most of them there is little solid evidence of benefit. One treatment, however, has proved remarkably effective: transferring stool from a healthy donor to patients who suffer from a severe intestinal infection that keeps coming back. Its success shows that the microbiome can be deliberately reshaped. The challenge for medicine is to learn which changes help, for whom, and why, before promises run far ahead of proof.",
    ],
    ja: [
      '私たちはだれもが何兆もの微生物をかかえており、そのほとんどは大腸にすんでいる。長いあいだ、これらの細菌は主に「乗客」、悪くすれば病気の原因と見なされていた。しかしこの20年ほどで、微生物の集団全体の遺伝物質を読み取る新しい技術によって、いまでは腸内細菌叢（マイクロバイオーム）とよばれるこのかくれた集団が、だれも想像しなかったほど積極的な役割を人間の健康で果たしていることが明らかになった。',
      '腸内細菌は、私たち自身の酵素では消化できない食物繊維を分解し、腸の内側をおおう細胞に栄養をあたえる物質をつくる。また、免疫のしくみをきたえているようでもある。微生物がまったくいない完全な無菌の環境で育てられたマウスは、うまく調節されない免疫のしくみをもつようになり、感染に対して異常な反応をする。豊かな国でアレルギーが増えているのは、幼いころにさまざまな微生物とふれる機会が減ったことと関係があるのではないかと考える研究者もいるが、衛生仮説とよばれることの多いこの考えは、いまも議論が分かれている。',
      'こうした発見は熱狂を、そしてときには誇張を生んできた。腸内細菌叢をよくするとうたう製品がいまでは広く売られているが、そのほとんどには効果を示す確かな証拠がほとんどない。しかし、ある治療法はめざましい効果をあげている。くり返しぶり返す重い腸の感染症に苦しむ患者に、健康な提供者の便を移すという方法だ。その成功は、腸内細菌叢を意図して作りかえられることを示している。医学にとっての課題は、約束が証拠よりはるか先に走ってしまう前に、どんな変化が、だれに、なぜ役立つのかを明らかにすることである。',
    ],
    blanks: [
      { id: 'A', choices: ['at worst', 'at worse', 'worst at', 'the worst at'], answer: 0, why: 'at worst で「悪くすれば・最悪の場合」。at worse・worst at という言い方はない。' },
      { id: 'B', choices: ['without', 'unless', 'except that', 'lacked'], answer: 0, why: 'うしろが名詞（any microbes）なので前置詞 without。unless・except that のあとには文が必要で、lacked では文の形にならない。' },
      { id: 'C', choices: ['claiming', 'claim', 'claims', 'to claiming'], answer: 0, why: '動詞は are sold。名詞 products を「～とうたう」とうしろから説明する現在分詞 claiming。' },
    ],
    tf: [
      { statement: 'かつて腸内細菌は、主に体に乗っているだけのものと考えられていた。', answer: true, why: '第1段落 regarded mainly as passengers。' },
      { statement: '無菌の環境で育てたマウスは、感染症にふつうより強い免疫をもつ。', answer: false, why: '第2段落 develop immune systems that are poorly regulated, and they respond abnormally to infections。' },
      { statement: '腸内細菌叢をよくするとうたう製品の多くは、効果の確かな証拠が少ない。', answer: true, why: '第3段落 for most of them there is little solid evidence of benefit。' },
    ],
    qa: [
      { q: 'What do gut bacteria do with fibers that our enzymes cannot digest?', choices: ['They break them down into compounds that feed intestinal cells.', 'They turn them into new enzymes for the stomach.', 'They send them back to the small intestine.', 'They change them into antibiotics.'], answer: 0, why: '第2段落 break down fibers … producing compounds that nourish the cells lining the intestine。' },
      { q: 'What does the success of transferring stool show?', choices: ['The microbiome can be deliberately reshaped.', 'All microbiome products are effective.', 'Allergies are caused by gut bacteria.', 'Mice should be raised in sterile conditions.'], answer: 0, why: '第3段落 Its success shows that the microbiome can be deliberately reshaped。' },
    ],
  },
  {
    id: 'adv-fever',
    title: 'Why We Run a Temperature',
    level: '難関大（評論）',
    paragraphs: [
      "When we catch a cold or the flu, one of the first signs is often a rise in body temperature. Because fever makes us feel miserable, many people reach for medicine to bring it down as soon as possible. Yet fever is not simply a symptom of illness; in many cases it is part of the body's defense, a response ( A ) by the immune system itself.",
      "Chemical signals released during an infection act on the part of the brain that controls temperature, raising its target setting by a degree or two. The body then produces and keeps more heat, ( B ) shivering. Higher temperatures appear to slow the growth of some bacteria and viruses and to make certain immune cells work faster. Animals as different as lizards and fish, which cannot produce much heat of their own, move to warmer places when they are infected, suggesting that this strategy is very old.",
      "This does not mean that fever should always be left alone. A very high temperature can be dangerous, especially for young children and older adults, and reducing it can make patients more comfortable and help them sleep. Most doctors therefore advise ( C ) a fever mainly when it causes real distress or rises above a certain level. The aim is not to fight the body's response but to keep it within safe limits.",
    ],
    ja: [
      'かぜやインフルエンザにかかると、最初のしるしの1つは体温が上がることが多い。熱が出るとつらいので、多くの人はできるだけ早く下げようと薬に手をのばす。しかし熱はたんなる病気の症状ではない。多くの場合、それは体の防御の一部、つまり免疫のしくみそのものが引き起こす反応なのである。',
      '感染のあいだに放出される化学的な信号は、体温を調節する脳の部分にはたらきかけ、目標の設定を1、2度上げる。すると体は、たとえば体をふるわせることで、より多くの熱をつくって保つ。体温が高くなると、ある種の細菌やウイルスの増殖がおそくなり、特定の免疫細胞のはたらきが速くなるようだ。自分ではあまり熱をつくれないトカゲや魚のようにまったくちがう動物も、感染するとあたたかい場所へ移動する。このことは、この戦略がとても古いものであることを示している。',
      'だからといって、熱はいつでもほうっておくべきだということにはならない。とても高い熱は、とくに幼い子どもや高齢者にとって危険なことがあり、熱を下げると患者は楽になり、眠りやすくなる。そのため多くの医師は、熱が本当につらいときや一定の高さをこえたときを中心に熱の治療をすすめる。ねらいは体の反応と戦うことではなく、それを安全なはんいにおさえることなのである。',
    ],
    blanks: [
      { id: 'A', choices: ['triggered', 'triggering', 'trigger', 'triggers'], answer: 0, why: '反応は免疫に「引き起こされる」側（by the immune system）なので過去分詞 triggered。' },
      { id: 'B', choices: ['for example by', 'for example to', 'for example of', 'for example that'], answer: 0, why: '「～によって」と手段を表すのは by ＋動名詞（by shivering）。to・of・that のあとに shivering だけを置くことはできない。' },
      { id: 'C', choices: ['treating', 'to treat', 'treat', 'treated'], answer: 0, why: 'advise は目的語（人）がないとき動名詞をとる（advise ～ing）。advise to do は人を入れて advise 人 to do の形。' },
    ],
    tf: [
      { statement: '筆者によれば、熱は多くの場合、体の防御の一部である。', answer: true, why: '第1段落 in many cases it is part of the body\'s defense。' },
      { statement: 'トカゲや魚は感染すると、すずしい場所へ移動する。', answer: false, why: '第2段落 move to warmer places when they are infected。' },
      { statement: '筆者は、熱はどんなときも下げてはいけないと主張している。', answer: false, why: '第3段落 This does not mean that fever should always be left alone。' },
    ],
    qa: [
      { q: 'How can a higher body temperature help fight an infection?', choices: ['It can slow the growth of some germs and speed up certain immune cells.', 'It kills every virus in the body at once.', 'It stops the brain from sending chemical signals.', 'It makes the body produce more medicine.'], answer: 0, why: '第2段落 slow the growth of some bacteria and viruses and to make certain immune cells work faster。' },
    ],
  },
  {
    id: 'adv-language-loss',
    title: 'When a Language Falls Silent',
    level: '難関大（評論）',
    paragraphs: [
      "Of the roughly seven thousand languages spoken in the world today, linguists estimate that around half may no longer be spoken by the end of this century. A language rarely disappears in a single dramatic event. More often, parents ( A ) the language at home stop passing it on to their children, usually because another language seems to offer better jobs and a brighter future. Within a few generations, the only fluent speakers left are elderly.",
      "Why should this loss matter to anyone who has never heard of these languages? One answer is that each language preserves a particular way of organizing experience. Some languages describe directions only in terms of north and south, never left and right; others have words for kinds of snow, plants, or family relations ( B ) no simple translation exists in English. When such a language disappears, knowledge built up over centuries, from medicine to local ecology, can vanish with it.",
      "Yet it would be a mistake to treat endangered languages merely as museum pieces to be recorded before they die. Recordings and dictionaries are valuable, but a language lives only when people use it in daily life. Some communities have shown that decline can be reversed: in New Zealand, schools in which young children are taught entirely in Maori have helped revive a language that was once rarely heard. Such efforts suggest that the fate of a language depends less on its number of speakers than on ( C ) its speakers believe it has a future.",
    ],
    ja: [
      '今日世界で話されているおよそ7000の言語のうち、今世紀の終わりまでに約半分が話されなくなるかもしれないと言語学者は見積もっている。言語がひとつの劇的な出来事で消えることはめったにない。多くの場合、家庭でその言語を話す親が、子どもにそれを受けつがなくなるのだ。たいていは、別の言語のほうがよい仕事や明るい未来をもたらしてくれそうに思えるからである。数世代のうちに、のこった流ちょうな話し手は高齢者だけになる。',
      'こうした言語を聞いたこともない人にとって、なぜこの喪失が問題なのだろうか。1つの答えは、それぞれの言語が経験を整理する独自のしかたを保存しているということだ。方角を左右ではなく、北と南だけで表す言語もあれば、雪や植物、親族関係の種類を表す、英語にかんたんな訳語のないことばをもつ言語もある。そうした言語が消えるとき、薬から地域の生態系まで、何世紀にもわたって積み上げられた知識もいっしょに消えてしまうことがある。',
      'しかし、消えそうな言語を、なくなる前に記録しておくべき博物館の展示品としてだけあつかうのはまちがいだろう。録音や辞書は貴重だが、言語は人々が日々の生活で使うときにだけ生きている。言語のおとろえは逆転できることを示した地域社会もある。ニュージーランドでは、幼い子どもがすべてマオリ語で教わる学校が、かつてはめったに聞かれなかった言語の復活を助けてきた。こうした取り組みは、言語の運命が話し手の数よりも、話し手たちがその言語に未来があると信じているかどうかにかかっていることを示している。',
    ],
    blanks: [
      { id: 'A', choices: ['who speak', 'whom speak', 'which speaks', 'speaks'], answer: 0, why: '名詞 parents（人・複数）を説明する主格の関係代名詞 who ＋ speak。whom は主語になれず、which は人に使わない。' },
      { id: 'B', choices: ['for which', 'which', 'what', 'in that'], answer: 0, why: 'no simple translation exists for the words の for が前に出た形。うしろは文として完全なので前置詞＋関係代名詞 for which。' },
      { id: 'C', choices: ['whether', 'that', 'what', 'if or not'], answer: 0, why: '前置詞 on の目的語になり「～かどうか」を表すのは whether。前置詞のあとに that 節は置けず、what のうしろには欠けた部分が必要。' },
    ],
    tf: [
      { statement: '言語は多くの場合、ひとつの劇的な出来事で突然消える。', answer: false, why: '第1段落 A language rarely disappears in a single dramatic event。' },
      { statement: '筆者によれば、言語が消えると、何世紀もかけて積み上げた知識も失われることがある。', answer: true, why: '第2段落 knowledge built up over centuries … can vanish with it。' },
      { statement: '筆者は、消えそうな言語は録音して保存すればそれで十分だと考えている。', answer: false, why: '第3段落 a language lives only when people use it in daily life。' },
    ],
    qa: [
      { q: 'According to the passage, what usually causes a language to decline?', choices: ['Parents stop passing it on because another language seems more useful.', 'A war destroys the people who speak it.', 'The government bans it in schools.', 'Linguists stop recording it.'], answer: 0, why: '第1段落 parents … stop passing it on to their children, usually because another language seems to offer better jobs。' },
    ],
  },
  {
    id: 'adv-body-clock',
    title: 'The Clock Inside Every Cell',
    level: '難関大（評論）',
    paragraphs: [
      "Almost every cell in the human body keeps time. A small group of nerve cells deep in the brain acts as a master clock, coordinating cycles of roughly twenty-four hours ( A ) are known as circadian rhythms. These rhythms influence when we feel sleepy, when our body temperature rises and falls, and even when certain hormones are released into the blood.",
      "The master clock is reset each day mainly by light. When light enters the eyes in the morning, signals travel to the brain and shift the clock slightly ( B ) it stays in step with the sun. This is why people who fly across several time zones suffer from jet lag: their internal clock still follows the old schedule, and it can take several days to adjust. Shift workers face an even more serious problem, ( C ) their clocks may never fully adapt to working at night.",
      "Doctors are now paying attention to timing as well as to dosage. Some studies suggest that certain medicines work better, or cause fewer side effects, when ( D ) at a particular time of day. Research on long-term night workers has also linked disturbed rhythms to a higher risk of conditions such as obesity and heart disease. Although much remains uncertain, the idea that when we do something can matter as much as what we do is changing how scientists think about health.",
    ],
    ja: [
      '人間の体のほとんどすべての細胞は時を刻んでいる。脳の奥深くにある小さな神経細胞の集まりが親時計としてはたらき、概日リズムとして知られる、およそ24時間の周期をまとめている。こうしたリズムは、私たちがいつ眠くなるか、体温がいつ上がり下がりするか、さらには特定のホルモンがいつ血液中に放出されるかにまで影響している。',
      '親時計は、主に光によって毎日合わせ直される。朝、光が目に入ると、信号が脳に伝わり、時計が太陽と歩調を合わせたままでいられるように少しずらす。いくつもの時間帯をこえて飛行機で移動した人が時差ぼけになるのはこのためだ。体内の時計はまだ以前のスケジュールにしたがっていて、合わせるのに数日かかることがある。交代勤務で働く人は、さらに深刻な問題に直面する。夜に働くことに、時計が完全には慣れないかもしれないからである。',
      '医師たちはいま、薬の量だけでなくタイミングにも注目している。ある種の薬は、1日の特定の時間に飲むと、よく効いたり副作用が少なくなったりすることを示す研究もある。長年夜に働いてきた人々についての研究は、乱れたリズムを、肥満や心臓病といった病気のリスクの高さとも結びつけている。まだわからないことは多いが、何をするかと同じくらい、いつするかが大切になりうるという考えは、科学者の健康の考え方を変えつつある。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'who', 'they'], answer: 0, why: '名詞 cycles を説明する主格の関係代名詞 that。what は先行詞をとらず、who は人だけ、they では文がつながらない。' },
      { id: 'B', choices: ['so that', 'in order to', 'such that a', 'so as'], answer: 0, why: 'うしろが文（it stays …）なので、目的を表す接続詞 so that。in order to・so as のあとは動詞の原形。' },
      { id: 'C', choices: ['since', 'because of', 'due to', 'owing to'], answer: 0, why: 'うしろが文（their clocks may …）なので理由を表す接続詞 since。because of・due to・owing to のあとは名詞。' },
      { id: 'D', choices: ['taken', 'taking', 'take', 'they taken'], answer: 0, why: '薬は「飲まれる」側なので when (they are) taken。when のあとの主語と be 動詞が省かれた形。' },
    ],
    tf: [
      { statement: '概日リズムは、眠気や体温の変化に影響している。', answer: true, why: '第1段落 These rhythms influence when we feel sleepy, when our body temperature rises and falls。' },
      { statement: '親時計は、主に食事の時間によって毎日合わせ直される。', answer: false, why: '第2段落 The master clock is reset each day mainly by light。' },
      { statement: '筆者によれば、薬を飲む時間によって効き方が変わる可能性がある。', answer: true, why: '第3段落 certain medicines work better … when taken at a particular time of day。' },
    ],
    qa: [
      { q: 'Why do people who fly across several time zones suffer from jet lag?', choices: ['Their internal clock still follows the old schedule.', 'The air in planes is too dry.', 'They take medicine at the wrong dose.', 'Light cannot enter their eyes on the plane.'], answer: 0, why: '第2段落 their internal clock still follows the old schedule。' },
    ],
  },
  {
    id: 'adv-transplant',
    title: 'The Gift That Saves Lives',
    level: '難関大（評論）',
    paragraphs: [
      "The first successful kidney transplant was carried out in 1954 between identical twins. Doctors chose twins deliberately: because the donor and the patient had the same genes, the patient's immune system did not treat the new kidney as an invader. In most later cases, ( A ), the donor was not a perfect genetic match, and the body's defenses attacked the transplanted organ.",
      "This reaction, known as rejection, remained the greatest obstacle for years. The breakthrough came with drugs that weaken the immune response just enough to protect the new organ. These medicines have saved hundreds of thousands of lives, but they come at a price: patients must take them for the rest of their lives, ( B ) leaves them more vulnerable to infections and some types of cancer.",
      "Today the main problem is not surgery but supply. In many countries, the number of patients ( C ) for an organ far exceeds the number of available donors. Some governments have adopted an opt-out system, in which everyone is considered a donor unless they have said otherwise; others rely on campaigns that encourage people to register. Meanwhile, researchers are exploring alternatives, such as growing tissue from a patient's own cells, which the immune system would recognize as its own. ( D ) these efforts succeed, the long wait for a matching donor may one day become a thing of the past.",
    ],
    ja: [
      '最初に成功した腎臓移植は、1954年に一卵性双生児の間で行われた。医師たちはあえて双子を選んだ。提供者と患者が同じ遺伝子をもっていたので、患者の免疫のしくみは新しい腎臓を侵入者としてあつかわなかったのである。しかし、その後のほとんどの場合、提供者は遺伝的に完全には一致せず、体の防御のしくみが移植された臓器を攻撃した。',
      '拒絶反応として知られるこの反応は、何年ものあいだ最大の障害でありつづけた。突破口となったのは、新しい臓器を守るのにちょうど足りるだけ免疫の反応を弱める薬だった。こうした薬は何十万人もの命を救ってきたが、代償もある。患者は一生その薬を飲みつづけなければならず、そのせいで感染症や一部のがんにかかりやすくなるのだ。',
      '今日の主な問題は手術ではなく供給である。多くの国で、臓器を待っている患者の数は、提供できる人の数をはるかに上回っている。本人がことわらないかぎり全員を提供者とみなす「オプトアウト」方式を取り入れた政府もあれば、人々に登録をすすめる運動にたよる政府もある。そのあいだにも研究者たちは、患者自身の細胞から組織を育てるといった代わりの方法を探っている。そうした組織なら、免疫のしくみは自分のものと認識するだろう。もしこうした取り組みが成功すれば、合う提供者を長く待つことは、いつか過去のものになるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['however', 'but', 'although', 'despite'], answer: 0, why: '文の途中にコンマではさんで入れられる副詞は however（しかし）。but・although は文の頭に置く接続詞、despite のうしろには名詞が必要。' },
      { id: 'B', choices: ['which', 'that', 'what', 'who'], answer: 0, why: '前の内容（薬を一生飲みつづけること）を受ける非制限用法の which。コンマのあとに that は使えず、what は先行詞をとらない。' },
      { id: 'C', choices: ['waiting', 'waited', 'wait', 'to waiting'], answer: 0, why: '動詞は exceeds。名詞 patients を「待っている」とうしろから説明する現在分詞 waiting。' },
      { id: 'D', choices: ['If', 'Despite', 'Because of', 'In case of'], answer: 0, why: 'うしろが文（these efforts succeed）なので接続詞 If。despite・because of・in case of のうしろは名詞。' },
    ],
    tf: [
      { statement: '最初に成功した腎臓移植は、遺伝子がちがう二人の間で行われた。', answer: false, why: '第1段落 between identical twins … had the same genes。' },
      { statement: '免疫を弱める薬を飲みつづける患者は、感染症にかかりやすくなる。', answer: true, why: '第2段落 leaves them more vulnerable to infections。' },
      { statement: '筆者によれば、今日の移植医療の最大の問題は手術の技術である。', answer: false, why: '第3段落 Today the main problem is not surgery but supply。' },
    ],
    qa: [
      { q: "Why would tissue grown from a patient's own cells be useful?", choices: ['The immune system would recognize it as its own.', 'It can be grown in a single day.', 'It does not need any surgery.', 'It is cheaper than all medicine.'], answer: 0, why: '第3段落 which the immune system would recognize as its own。' },
    ],
  },
  {
    id: 'adv-notice-volunteers',
    title: 'Notice: Volunteers Wanted for Family Science Day',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "Riverside Science Museum is looking for volunteers to help at our Family Science Day on Saturday, July 20. No special knowledge is required, ( A ) all volunteers must attend a one-hour training session on July 13.",
      "Volunteers will guide visitors, help children with simple experiments, and answer questions at the information desk. Each volunteer will work a four-hour shift, either in the morning (9:00-13:00) or in the afternoon (13:00-17:00). Lunch will be provided for everyone ( B ) works the morning shift. Please wear comfortable shoes, as you will be on your feet for most of the day.",
      "To apply, please fill out the form on our website by June 30. Applicants under 16 must have permission from a parent or guardian. As a thank-you, every volunteer will receive a free one-year museum pass. If you have any questions, please contact Ms. Ellis at the front desk or send an email to the address ( C ) below.",
    ],
    ja: [
      'リバーサイド科学館では、7月20日（土）の「家族の科学の日」を手伝ってくださるボランティアをさがしています。特別な知識は必要ありませんが、ボランティアの方は全員、7月13日の1時間の研修に参加しなければなりません。',
      'ボランティアの方には、来館者の案内、子どもたちのかんたんな実験の手伝い、案内所での質問への対応をしていただきます。各ボランティアは、午前（9時〜13時）か午後（13時〜17時）のどちらかの4時間のシフトで働きます。午前のシフトで働く方には全員に昼食をご用意します。ほとんどの時間立っていることになるので、はきなれた靴でお越しください。',
      '応募するには、6月30日までに当館のウェブサイトのフォームに記入してください。16歳未満の方は、保護者の許可が必要です。お礼として、ボランティアの方には全員、1年間の無料入館パスをさしあげます。ご質問があれば、受付のエリスまでお問い合わせいただくか、下に示したアドレスにメールをお送りください。',
    ],
    blanks: [
      { id: 'A', choices: ['but', 'despite', 'although of', 'in spite'], answer: 0, why: 'うしろが文（all volunteers must …）なので接続詞 but。despite のうしろは名詞、although of・in spite（of がない）という形はない。' },
      { id: 'B', choices: ['who', 'which', 'whom', 'whose'], answer: 0, why: 'everyone（人）を説明し、works の主語になる関係代名詞 who。' },
      { id: 'C', choices: ['shown', 'showing', 'shows', 'to showing'], answer: 0, why: 'アドレスは「示される」側なので過去分詞 shown（the address shown below＝下に示したアドレス）。' },
    ],
    tf: [
      { statement: 'ボランティアをするには、特別な知識が必要だ。', answer: false, why: '第1段落 No special knowledge is required。' },
      { statement: '午前のシフトで働くボランティアには昼食が出る。', answer: true, why: '第2段落 Lunch will be provided for everyone who works the morning shift。' },
      { statement: '16歳未満の人は応募できない。', answer: false, why: '第3段落 Applicants under 16 must have permission from a parent or guardian（許可があれば応募できる）。' },
    ],
    qa: [
      { q: 'What will every volunteer receive?', choices: ['A free one-year museum pass.', 'Lunch every day for a year.', 'A science textbook.', 'Money for transportation.'], answer: 0, why: '第3段落 every volunteer will receive a free one-year museum pass。' },
    ],
  },
  {
    id: 'adv-false-news',
    title: 'Why False Stories Travel Fast',
    level: '難関大（評論）',
    paragraphs: [
      "A false story can travel around the world while the truth is still putting on its shoes, as an old saying goes. Studies of social media suggest that the saying contains more than a grain of truth. One large study found that false news spread farther and faster than true news, and that this was ( A ) because of automated accounts than because of ordinary people sharing it.",
      "Why should this be so? One explanation is novelty. False stories are often surprising, and surprising information feels worth passing on. Another is emotion: stories that make us angry or afraid are shared more readily than calm, accurate reports. We also tend to believe information ( B ) fits what we already think, a habit known as confirmation bias.",
      "Correcting false stories is harder than it seems. Simply repeating a false claim in order to deny it can make it more familiar, and familiar statements feel truer. Some researchers therefore recommend ( C ) with the accurate information rather than the myth, and then explaining why the false version is wrong. Others argue that the best defense is to encourage people to pause for a moment before sharing anything, since even a brief pause makes us more likely to notice ( D ) a headline sounds doubtful.",
    ],
    ja: [
      '古いことわざにあるように、うその話は、真実がまだ靴をはいているあいだに世界を一周してしまう。ソーシャルメディアの研究は、このことわざにかなりの真実がふくまれていることを示している。ある大規模な研究によると、うそのニュースは本当のニュースより遠く、速く広まり、それは自動アカウントのせいというよりも、ふつうの人々が共有したせいだった。',
      'なぜそうなるのだろうか。1つの説明は目新しさである。うその話はおどろくような内容であることが多く、おどろくような情報は人に伝える価値があるように感じられる。もう1つは感情だ。私たちを怒らせたりこわがらせたりする話は、落ち着いた正確な報道よりも気軽に共有される。また私たちには、すでに考えていることに合う情報を信じやすい傾向があり、これは確証バイアスとして知られている。',
      'うその話を正すのは、思うよりむずかしい。うその主張を否定するためにそれをくり返すだけで、その主張がなじみ深くなってしまうことがあり、なじみのある言葉は本当らしく感じられる。そのため、うわさではなく正確な情報から話しはじめ、そのあとでうその内容がなぜまちがっているかを説明することをすすめる研究者もいる。何かを共有する前に少し立ち止まるよう人々にうながすのが最善の防御だと主張する人もいる。ほんの短い間でも立ち止まると、見出しがあやしく聞こえるときに気づきやすくなるからだ。',
    ],
    blanks: [
      { id: 'A', choices: ['less', 'fewer', 'least', 'little'], answer: 0, why: 'あとの than と組む比較級。less A than B で「B ほど A ではない（A というより B）」。fewer は数えられる名詞にだけ使い、least・little は than と組めない。' },
      { id: 'B', choices: ['that', 'what', 'who', 'it'], answer: 0, why: '名詞 information（物）を説明し fits の主語になる関係代名詞 that。what は先行詞をとらず、who は人だけ。' },
      { id: 'C', choices: ['starting', 'to start', 'start', 'started'], answer: 0, why: 'recommend は（人を入れないとき）動名詞を目的語にとる。recommend starting で「始めることをすすめる」。' },
      { id: 'D', choices: ['when', 'what', 'that which', 'during'], answer: 0, why: 'うしろが完全な文（a headline sounds doubtful）なので、notice の目的語になる when 節。what のうしろには欠けた部分が必要で、during のうしろは名詞。' },
    ],
    tf: [
      { statement: 'ある研究によると、うその情報が広まったのは主に自動アカウントのせいだった。', answer: false, why: '第1段落 less because of automated accounts than because of ordinary people sharing it。' },
      { statement: '人は、すでに考えていることに合う情報を信じやすい。', answer: true, why: '第2段落 We also tend to believe information that fits what we already think。' },
      { statement: 'うその主張を否定するためにくり返すと、かえってその主張が本当らしく感じられることがある。', answer: true, why: '第3段落 repeating a false claim … can make it more familiar, and familiar statements feel truer。' },
    ],
    qa: [
      { q: 'What do some researchers recommend when correcting false stories?', choices: ['Starting with the accurate information rather than the myth.', 'Repeating the false claim many times.', 'Stopping the use of social media completely.', 'Sharing stories faster than other people.'], answer: 0, why: '第3段落 recommend starting with the accurate information rather than the myth。' },
    ],
  },
  {
    id: 'adv-appendix',
    title: 'The Organ We Thought Was Useless',
    level: '難関大（評論）',
    paragraphs: [
      "For much of the twentieth century, the appendix, a small finger-shaped pouch attached to the large intestine, was described in textbooks as a useless leftover of evolution. Because it can become infected and must sometimes be removed in an emergency, many people regarded it ( A ) nothing more than a source of trouble.",
      "Recent research has challenged this view. The appendix contains a large amount of tissue belonging to the immune system, and some scientists believe it serves as a safe house for helpful gut bacteria. After a severe illness such as cholera has flushed the intestine of its bacteria, the appendix may help restore them ( B ) releasing the microbes it has been storing. Supporting this idea, the appendix appears to have evolved independently more than thirty times in different groups of mammals, which would be surprising for a structure with no function.",
      "None of this means that an inflamed appendix should be left alone; appendicitis can be life-threatening if the organ bursts. ( C ), some doctors now treat mild cases with antibiotics instead of surgery, and studies suggest that many patients recover without losing the organ. The story of the appendix is a reminder that ( D ) we do not yet understand the purpose of a body part does not prove that it has none.",
    ],
    ja: [
      '20世紀の大半のあいだ、大腸につながった指のような形の小さなふくろである虫垂は、教科書で進化の役に立たない名残だと説明されていた。感染を起こすことがあり、ときには緊急に取りのぞかなければならないので、多くの人は虫垂をやっかいのもとにすぎないと考えていた。',
      '最近の研究は、この見方に疑問を投げかけている。虫垂には免疫のしくみに属する組織がたくさんふくまれており、役に立つ腸内細菌の避難所の役目を果たしていると考える科学者もいる。コレラのような重い病気で腸の細菌が洗い流されたあと、虫垂はたくわえていた微生物を放出することで、細菌をもとにもどす手助けをするのかもしれない。この考えを裏づけるように、虫垂はほ乳類のさまざまなグループで30回以上もそれぞれ独立に進化したようだ。はたらきのない構造なら、これはおどろくべきことだろう。',
      'だからといって、炎症を起こした虫垂をほうっておいてよいわけではない。虫垂炎は、虫垂が破れると命にかかわることがある。しかし、軽い場合には手術ではなく抗生物質で治療する医師もいまはいて、多くの患者が虫垂を失わずに回復することを示す研究もある。虫垂の話は、体の部分の目的を私たちがまだ理解していないという事実が、その部分に目的がないことの証明にはならない、ということを思い出させてくれる。',
    ],
    blanks: [
      { id: 'A', choices: ['as', 'for being', 'to be as', 'like as'], answer: 0, why: 'regard A as B で「A を B と見なす」。' },
      { id: 'B', choices: ['by', 'with that', 'in order', 'so as'], answer: 0, why: '手段を表す by ＋動名詞（by releasing＝放出することによって）。in order・so as のあとは to が必要。' },
      { id: 'C', choices: ['However', 'Although', 'Despite', 'Even though'], answer: 0, why: '文頭でコンマを置いて「しかし」とつなぐ副詞 However。Although・Even though のあとには文が続き、Despite のあとには名詞が必要。' },
      { id: 'D', choices: ['the fact that', 'what', 'that of', 'which'], answer: 0, why: 'うしろが完全な文なので、同格の that を使った the fact that ～（～という事実）が主語になる。what・which のうしろには欠けた部分が必要。' },
    ],
    tf: [
      { statement: '昔の教科書では、虫垂は役に立たないものとされていた。', answer: true, why: '第1段落 was described in textbooks as a useless leftover of evolution。' },
      { statement: '虫垂は、ほ乳類のうちひとつのグループにしか見られない。', answer: false, why: '第2段落 evolved independently more than thirty times in different groups of mammals。' },
      { statement: '筆者は、炎症を起こした虫垂はほうっておいてよいと述べている。', answer: false, why: '第3段落 None of this means that an inflamed appendix should be left alone。' },
    ],
    qa: [
      { q: 'What role do some scientists think the appendix plays?', choices: ['It is a safe house for helpful gut bacteria.', 'It is where food is digested first.', 'It stores extra blood for emergencies.', 'It produces the bacteria that cause cholera.'], answer: 0, why: '第2段落 it serves as a safe house for helpful gut bacteria。' },
    ],
  },
  {
    id: 'adv-handwashing',
    title: 'The Doctor Who Asked Doctors to Wash',
    level: '難関大（評論）',
    paragraphs: [
      "In the 1840s, a Hungarian doctor named Ignaz Semmelweis noticed something disturbing at the hospital in Vienna ( A ) he worked. In one of its two maternity wards, where babies were delivered by doctors and medical students, many more mothers died of fever after giving birth than in the other ward, which was run by midwives.",
      "Semmelweis searched for the cause. The turning point came when a colleague died of a similar illness after being cut by a student's knife during an autopsy. Semmelweis realized that the doctors, who often went straight from examining dead bodies to delivering babies, might be carrying something deadly on their hands. He ordered them to wash their hands in a chlorine solution before entering the ward, and the death rate fell sharply, ( B ) to roughly the level of the midwives' ward.",
      "Remarkably, his idea was largely rejected. The germ theory of disease had not yet been accepted, so Semmelweis could not explain ( C ) handwashing worked, and many doctors were offended by the suggestion that they themselves were causing deaths. Only in the years after his death in 1865 did germ theory, supported by scientists such as Louis Pasteur and Robert Koch, become widely accepted and provide the explanation he had lacked. His story is often told as a warning: evidence alone is not always enough to change practice, especially when it ( D ) experts to admit that they have been wrong.",
    ],
    ja: [
      '1840年代、イグナーツ・ゼンメルワイスというハンガリーの医師は、自分が働いていたウィーンの病院で気がかりなことに気づいた。病院の2つの産科病棟のうち、医師や医学生がお産を担当する病棟では、助産師が運営するもう一方の病棟よりもはるかに多くの母親が出産後に熱で亡くなっていたのである。',
      'ゼンメルワイスは原因をさがした。転機となったのは、同僚が解剖中に学生のメスで切られたあと、同じような病気で亡くなったことだった。ゼンメルワイスは、遺体を調べたあとそのままお産に向かうことの多い医師たちが、手に何か命取りになるものをつけているのかもしれないと気づいた。彼は病棟に入る前に塩素の溶液で手を洗うよう命じ、死亡率は急激に下がって、助産師の病棟とほぼ同じ水準になった。',
      'おどろくべきことに、彼の考えはほとんど受け入れられなかった。病気の細菌説はまだ受け入れられていなかったので、ゼンメルワイスは手洗いがなぜ効くのかを説明できず、多くの医師は自分たちこそが死をもたらしているという指摘に気分を害した。1865年に彼が亡くなったあとの数年でようやく、ルイ・パスツールやロベルト・コッホらに支えられた細菌説が広く受け入れられ、彼に欠けていた説明をあたえた。彼の物語は警告としてよく語られる。証拠だけでは、やり方を変えるのに十分とはかぎらない。とくに、専門家に自分がまちがっていたと認めさせる必要があるときには。',
    ],
    blanks: [
      { id: 'A', choices: ['where', 'which', 'what', 'that'], answer: 0, why: 'worked は目的語をとらないので、場所（the hospital）を受ける関係副詞 where（= in which）。' },
      { id: 'B', choices: ['dropping', 'dropped it', 'drop', 'to dropping'], answer: 0, why: '前の文に続けて「（そして）～まで下がった」と付け加える分詞構文 dropping。drop だけでは文がつながらない。' },
      { id: 'C', choices: ['why', 'what', 'which', 'that of'], answer: 0, why: 'うしろが完全な文（handwashing worked）なので、間接疑問の why（なぜ～か）。what・which のうしろには欠けた部分が必要。' },
      { id: 'D', choices: ['requires', 'requiring', 'require', 'is required'], answer: 0, why: 'when 節の主語は it（単数）なので動詞は requires。require 人 to do で「人に～することを求める」。' },
    ],
    tf: [
      { statement: '医師や医学生がお産を担当する病棟のほうが、母親の死亡が多かった。', answer: true, why: '第1段落 many more mothers died … than in the other ward, which was run by midwives。' },
      { statement: 'ゼンメルワイスの考えは、すぐに多くの医師に受け入れられた。', answer: false, why: '第3段落 his idea was largely rejected。' },
      { statement: '手を洗うようになると、死亡率は大きく下がった。', answer: true, why: '第2段落 the death rate fell sharply。' },
    ],
    qa: [
      { q: 'Why could Semmelweis not explain why handwashing worked?', choices: ['The germ theory of disease had not yet been accepted.', 'He did not keep any records of deaths.', 'The midwives refused to help him.', 'Chlorine was not available in Vienna.'], answer: 0, why: '第3段落 The germ theory of disease had not yet been accepted, so Semmelweis could not explain why handwashing worked。' },
    ],
  },
  {
    id: 'adv-cashless',
    title: 'The Disappearing Coin',
    level: '難関大（評論）',
    paragraphs: [
      "In many countries, cash is quietly disappearing. In Sweden, for example, only around one in ten purchases in shops is now paid for with notes or coins, and some cafés no longer accept them at all. Card and phone payments are fast and convenient, and they leave a record that makes theft and tax evasion ( A ) difficult.",
      "Yet the shift has costs that are easy to overlook. Older people, people with disabilities, and those ( B ) have no bank account may find it hard to pay for everyday things. A cashless system also depends entirely on electricity and networks; when either fails, buying even a loaf of bread can become impossible. Some critics also worry about privacy, since every digital payment can be tracked.",
      "For these reasons, several governments have begun to protect the right to pay in cash, ( C ) shops to accept notes and coins for basic goods. The debate is not really about money itself but about ( D ) kind of society we want: one that values speed and efficiency above all, or one that makes sure nobody is left behind.",
    ],
    ja: [
      '多くの国で、現金が静かに姿を消しつつある。たとえばスウェーデンでは、店での買い物のうち紙幣や硬貨で支払われるのはいまやおよそ10回に1回にすぎず、現金をまったく受けつけないカフェもある。カードやスマートフォンでの支払いは速くて便利で、記録が残るので、盗みや脱税がよりむずかしくなる。',
      'しかしこの変化には、見落としやすい代償もある。高齢者や障害のある人、銀行口座をもたない人は、日々のものの支払いに苦労するかもしれない。また、現金を使わないしくみは電気と通信網に完全にたよっている。どちらかが止まれば、パン1斤を買うことさえできなくなることがある。デジタルの支払いはすべて追跡できるので、プライバシーを心配する批判者もいる。',
      'こうした理由から、いくつかの政府は現金で支払う権利を守りはじめ、店に生活必需品の代金として紙幣や硬貨を受けつけるよう求めている。この議論は、本当はお金そのものではなく、私たちがどんな社会を望むのかについての議論である。何よりも速さと効率を大切にする社会か、それとも、だれも取り残されないようにする社会か。',
    ],
    blanks: [
      { id: 'A', choices: ['more', 'much', 'the more', 'very more'], answer: 0, why: 'make O C の C に比較級 more difficult（よりむずかしく）。much difficult・very more という言い方はなく、the more はここでは使えない。' },
      { id: 'B', choices: ['who', 'which', 'whom', 'whose'], answer: 0, why: 'those（人々）を説明し have の主語になる関係代名詞 who。' },
      { id: 'C', choices: ['requiring', 'required', 'require', 'to requiring'], answer: 0, why: '前の文に「そして～を求めている」と付け加える分詞構文 requiring（政府が求める側なので現在分詞）。' },
      { id: 'D', choices: ['what', 'whose', 'which of', 'how'], answer: 0, why: 'about のあとの名詞節「どんな種類の社会を～か」は what kind of ～。how kind of という形はない。' },
    ],
    tf: [
      { statement: 'スウェーデンでは、店での買い物の大半がいまも現金で支払われている。', answer: false, why: '第1段落 only around one in ten purchases in shops is now paid for with notes or coins。' },
      { statement: '現金を使わない社会では、電気や通信が止まると買い物ができなくなることがある。', answer: true, why: '第2段落 when either fails, buying even a loaf of bread can become impossible。' },
      { statement: 'いくつかの政府は、現金で支払う権利を守ろうとしている。', answer: true, why: '第3段落 several governments have begun to protect the right to pay in cash。' },
    ],
    qa: [
      { q: 'According to the passage, what is the debate really about?', choices: ['What kind of society people want.', 'How to print more money.', 'Which bank is the safest.', 'How quickly cards can be made.'], answer: 0, why: '第3段落 not really about money itself but about what kind of society we want。' },
    ],
  },
  {
    id: 'adv-new-words',
    title: 'Words for New Ideas',
    level: '難関大（評論）',
    paragraphs: [
      "When Japan opened its doors to the West in the second half of the nineteenth century, scholars faced a problem that is easy to overlook: many Western ideas had no names in Japanese. How could one discuss philosophy, society, or individual rights ( A ) words for them existed?",
      "Their solution was to build new words out of Chinese characters. The scholar Nishi Amane, for example, created tetsugaku as a translation of 'philosophy,' combining characters ( B ) meanings suggested wisdom and learning. Other new terms, such as the words for 'society' and 'science,' spread through newspapers and schools until they seemed as if they had always existed. Remarkably, many of these words later traveled to China and Korea, where they are still used today.",
      "Yet a translated word is never a perfect copy. Each new term carried associations that the original lacked, and some carried ( C ) than their translators intended. Debates continue, for instance, about whether the Japanese word chosen for 'rights' fully captures the moral weight of the English term. The history of these words shows that translation is not simply a matter of exchanging one label for another; it is a creative act that shapes how an idea will ( D ) understood in its new home.",
    ],
    ja: [
      '19世紀の後半に日本が西洋に門を開いたとき、学者たちは見落とされがちな問題に直面した。西洋の考えの多くには、日本語の名前がなかったのである。それを表すことばがないのに、どうやって哲学や社会、個人の権利について論じることができただろうか。',
      '彼らの解決策は、漢字を組み合わせて新しいことばを作ることだった。たとえば学者の西周は、知恵と学問を思わせる意味をもつ文字を組み合わせて、「philosophy」の訳語として「哲学」を作った。「社会」や「科学」を表すことばのような、ほかの新しいことばも、新聞や学校を通じて広まり、まるで昔からあったかのように思われるまでになった。おどろくべきことに、こうしたことばの多くはのちに中国や韓国へと伝わり、今日でもそこで使われている。',
      'しかし、翻訳されたことばは決して完全な写しではない。新しいことばはそれぞれ、もとのことばにはない連想をともなっており、訳した人の意図以上のものをになったことばもあった。たとえば、「rights」に選ばれた日本語が、英語のもつ道徳的な重みを十分にとらえているかどうかについては、いまも議論がつづいている。こうしたことばの歴史は、翻訳とは1つのラベルを別のラベルととりかえるだけの作業ではないことを示している。翻訳は、ある考えが新しい土地でどのように理解されるかを形づくる、創造的な行為なのである。',
    ],
    blanks: [
      { id: 'A', choices: ['when no', 'without', 'despite', 'because of'], answer: 0, why: 'うしろが文（words … existed）なので接続詞 when（～のときに）＋ no words。without・despite・because of のうしろには名詞しか置けない。' },
      { id: 'B', choices: ['whose', 'which', 'what', 'that its'], answer: 0, why: '「その文字の意味」なので所有格の関係代名詞 whose（characters whose meanings …）。' },
      { id: 'C', choices: ['more', 'much', 'most', 'many'], answer: 0, why: 'あとの than と組むのは比較級 more（～以上のもの）。much・most・many は than と組めない。' },
      { id: 'D', choices: ['be', 'being', 'been', 'to be'], answer: 0, why: '助動詞 will のあとは原形。受け身なので will be understood。' },
    ],
    tf: [
      { statement: '西洋の考えの多くには、当時日本語の名前がなかった。', answer: true, why: '第1段落 many Western ideas had no names in Japanese。' },
      { statement: '明治の新しいことばは、中国や韓国には伝わらなかった。', answer: false, why: '第2段落 many of these words later traveled to China and Korea。' },
      { statement: '筆者によれば、翻訳とはことばのラベルをとりかえるだけの作業である。', answer: false, why: '第3段落 translation is not simply a matter of exchanging one label for another。' },
    ],
    qa: [
      { q: 'What did Nishi Amane do?', choices: ['He created a Japanese word for philosophy.', 'He opened Japan to the West.', 'He started the first newspaper in Japan.', 'He taught English in China.'], answer: 0, why: '第2段落 Nishi Amane … created tetsugaku as a translation of philosophy。' },
    ],
  },
  {
    id: 'adv-phantom-limb',
    title: 'Pain Without a Body Part',
    level: '難関大（評論）',
    paragraphs: [
      "Many people who lose an arm or a leg continue to feel it long after it is gone. They may sense that the missing hand is clenched into a fist or that the missing foot is itching. For a large majority, these phantom sensations include pain, which can be severe and ( A ) to treat.",
      "For centuries, doctors suspected that such patients were imagining things. Today the phenomenon is understood as a product of the brain rather than of damaged nerves alone. The brain contains a kind of map of the body, and when signals from a limb suddenly stop, neighboring areas of the map may take over the silent region. The brain may then misread signals from these neighboring areas ( B ) they came from the lost limb.",
      "One surprisingly simple treatment was developed by the neuroscientist V. S. Ramachandran in the 1990s. A patient places the remaining arm beside a mirror ( C ) that its reflection appears where the missing arm would be. When the patient moves the real arm, the brain sees the missing arm moving too, and in some patients the pain eases. Mirror therapy does not work for everyone, but it shows that what we feel depends not only on our bodies but also on ( D ) our brains make of the information they receive.",
    ],
    ja: [
      '腕や脚を失った多くの人は、それがなくなってからずっとあとも、まだそれを感じつづける。ないはずの手がにぎりこぶしになっているように感じたり、ないはずの足がかゆく感じたりすることがある。大多数の人にとって、こうした幻の感覚には痛みもふくまれ、それははげしく、治療がむずかしいことがある。',
      '何世紀ものあいだ、医師たちはこうした患者は思いこんでいるだけではないかと疑っていた。今日ではこの現象は、傷ついた神経だけでなく、脳が生み出すものだと理解されている。脳には体の地図のようなものがあり、手足からの信号が急にとだえると、地図のとなりの領域が、静かになった部分を乗っとることがある。すると脳は、こうしたとなりの領域からの信号を、まるで失った手足から来たかのように読みちがえることがあるのだ。',
      'おどろくほどかんたんな治療法が、1990年代に神経科学者の V・S・ラマチャンドランによって考え出された。患者は、のこっている腕を鏡のそばに置き、その鏡像がないはずの腕の場所に見えるようにする。患者が本物の腕を動かすと、脳には失った腕も動いているように見え、一部の患者では痛みがやわらぐ。ミラー療法はだれにでも効くわけではないが、私たちが感じるものは体だけでなく、脳が受けとった情報をどう解釈するかにも左右されることを示している。',
    ],
    blanks: [
      { id: 'A', choices: ['difficult', 'difficulty', 'difficultly', 'to difficult'], answer: 0, why: 'severe and ～ と形容詞を並べ、～ to treat（治療するのが～）の形にするので形容詞 difficult。' },
      { id: 'B', choices: ['as if', 'even', 'so as', 'in case of'], answer: 0, why: 'うしろが文（they came from …）で「まるで～かのように」なので as if。so as のあとは to、in case of のあとは名詞。' },
      { id: 'C', choices: ['so', 'for', 'because of', 'due'], answer: 0, why: 'so that ～ で「～するように」（目的）。for that・because of that・due that という形はない。' },
      { id: 'D', choices: ['what', 'that', 'which', 'how'], answer: 0, why: 'make of の目的語が欠けているので、先行詞をふくむ関係代名詞 what（脳が情報をどう受けとめるか）。前置詞 on のあとに that は置けず、how のうしろには完全な文が必要。' },
    ],
    tf: [
      { statement: '手足を失った人の中には、もうない手足を感じる人がいる。', answer: true, why: '第1段落 continue to feel it long after it is gone。' },
      { statement: '筆者によれば、幻の痛みは傷ついた神経だけが原因だとわかっている。', answer: false, why: '第2段落 a product of the brain rather than of damaged nerves alone。' },
      { statement: 'ミラー療法は、だれにでも効く。', answer: false, why: '第3段落 Mirror therapy does not work for everyone。' },
    ],
    qa: [
      { q: 'What happens in mirror therapy?', choices: ['The reflection of the remaining arm makes the missing arm seem to move.', 'The patient looks at photos of the lost arm.', 'Doctors attach a new arm with a mirror.', 'The patient sleeps in front of a mirror.'], answer: 0, why: '第3段落 When the patient moves the real arm, the brain sees the missing arm moving too。' },
    ],
  },
{
    id: 'adv-immune-memory',
    title: 'How the Body Remembers Germs',
    level: '難関大（評論）',
    paragraphs: [
      "The first time the body meets a new germ, the immune system needs time to respond. It must find, among millions of cells, the few that can recognize the invader, and then multiply them into an army large enough to fight back. This process can take a week or more, ( A ) the germ may already have caused serious illness.",
      "After the infection is over, most of these defenders die off, but a small number remain in the body for years as memory cells, much like veterans who still remember the face of an enemy they once defeated. If the same germ appears again, these cells recognize it at once and launch an attack so quickly that the person often never notices ( B ) ill at all. This is why people who have had measles almost never catch it a second time.",
      "Vaccines make use of this memory. By introducing a harmless form of a germ, or only one of its parts, a vaccine allows the immune system to practice without the risk of the disease itself. For some diseases the memory fades over time, so extra doses, called boosters, are needed to remind the body ( C ) the enemy looks like. When enough people in a community are protected, a germ has difficulty spreading from person to person, which also shields those who cannot be vaccinated, such as newborn babies.",
    ],
    ja: [
      '体が新しい病原体にはじめて出会うとき、免疫のしくみが反応するには時間がかかる。何百万もの細胞の中から、侵入者を見分けられるわずかな細胞を見つけ出し、反撃できるほど大きな軍隊になるまで増やさなければならないのだ。この過程には1週間以上かかることがあり、そのあいだに病原体がすでに重い病気を引き起こしているかもしれない。',
      '感染が終わると、こうした防衛役の細胞のほとんどは死んでいくが、少数は、かつて打ち負かした敵の顔をいまもおぼえている古参兵のように、記憶細胞として何年も体内に残る。同じ病原体がふたたびあらわれると、これらの細胞はすぐにそれを見分け、とても速く攻撃を始めるので、本人は具合が悪くなったことにまったく気づかないことも多い。はしかにかかったことのある人が、2度目にかかることがほとんどないのはこのためである。',
      'ワクチンはこの記憶を利用している。病原体の害のない形、あるいはその一部だけを体に入れることで、ワクチンは病気そのものの危険なしに免疫のしくみに練習をさせる。病気によっては時間がたつと記憶がうすれるので、敵がどんな姿をしているかを体に思い出させるために、追加接種とよばれる追加の接種が必要になる。地域社会で十分に多くの人が守られていると、病原体は人から人へ広がりにくくなり、それは生まれたばかりの赤ちゃんのように、ワクチンを受けられない人たちを守ることにもなる。',
    ],
    blanks: [
      { id: 'A', choices: ['during which', 'which', 'what', 'during that'], answer: 0, why: '「その（1週間以上の）期間のあいだに」は during the process の during が前に出た前置詞＋関係代名詞 during which。うしろは文として完全なので which だけ・what は入らず、during that ではコンマのあとで前の文につなげられない。' },
      { id: 'B', choices: ['being', 'to be', 'be', 'been'], answer: 0, why: 'notice は目的語に動名詞をとる（notice being ill「具合が悪いことに気づく」）。notice to be の形はなく、原形 be・過去分詞 been は目的語になれない。' },
      { id: 'C', choices: ['what', 'that', 'how', 'which'], answer: 0, why: 'look like の like の目的語が欠けているので、「敵が何に似ているか＝どんな姿か」の what。how ～ looks like とは言わず、that・which では remind の2つ目の目的語になる節がつくれない。' },
    ],
    tf: [
      { statement: '体がはじめての病原体に反応するには、時間がかかることがある。', answer: true, why: '第1段落 the immune system needs time to respond … can take a week or more。' },
      { statement: '感染が終わると、病原体と戦った細胞はすべて体の中に残る。', answer: false, why: '第2段落 most of these defenders die off, but a small number remain。' },
      { statement: '十分に多くの人がワクチンで守られると、ワクチンを受けられない人も守られる。', answer: true, why: '第3段落 which also shields those who cannot be vaccinated。' },
    ],
    qa: [
      { q: 'Why do people who have had measles almost never catch it again?', choices: ['Memory cells recognize the virus and attack it very quickly.', 'The measles virus disappears from the world after one infection.', 'Their bodies become too warm for the virus to live.', 'They always receive a booster dose after getting sick.'], answer: 0, why: '第2段落 these cells recognize it at once and launch an attack so quickly … This is why people who have had measles almost never catch it a second time。' },
    ],
  },
  {
    id: 'adv-brain-cleaning',
    title: 'Cleaning the Brain While We Sleep',
    level: '難関大（評論）',
    paragraphs: [
      "For a long time, scientists struggled to explain why animals spend so much of their lives asleep. An animal that is sleeping cannot look for food or watch for enemies, so sleep must provide a benefit large enough to outweigh these dangers. One possible answer has come from studies of how the brain gets rid of its waste.",
      "Every organ produces waste as its cells work. In most of the body, a network of vessels called the lymphatic system carries this waste away, but the brain has almost none of these vessels inside it. Experiments with mice have suggested that it relies instead on the fluid that surrounds the brain, ( A ) flows through narrow spaces between cells and washes the waste out. Remarkably, these spaces appeared to widen during sleep, allowing the fluid to flow much more freely than when the animals were awake.",
      "Among the substances removed in this way is a protein ( B ) build-up in the brain is linked to Alzheimer's disease. This has led some researchers to suggest that poor sleep over many years might raise the risk of the disease, although whether one actually causes the other has not been proven. Studies in humans are far more difficult to carry out, and results from mice do not always apply to people. Even so, the idea offers a new reason to take sleep seriously: rather than simply resting, the sleeping brain may be busy ( C ) itself.",
    ],
    ja: [
      '長いあいだ、科学者たちは、動物がなぜ一生のうちこれほど多くの時間を眠ってすごすのかを説明するのに苦労してきた。眠っている動物はえさをさがすことも敵を見張ることもできないので、睡眠にはこうした危険を上まわるほど大きな利点があるはずだ。1つの答えになりそうなものが、脳がどのように老廃物をとりのぞいているかについての研究から出てきた。',
      'どの器官も、細胞がはたらくにつれて老廃物を出す。体のほとんどの部分では、リンパ系とよばれる管の網がこの老廃物を運び去るが、脳の内部にはこうした管がほとんどない。マウスを使った実験は、脳がそのかわりに脳のまわりの液体にたよっていることを示している。その液体が細胞のあいだのせまいすき間を流れ、老廃物を洗い流すのだ。おどろくべきことに、このすき間は睡眠中に広がるようで、動物が起きているときよりもずっと自由に液体が流れるようになった。',
      'このようにしてとりのぞかれる物質の中には、脳にたまるとアルツハイマー病と関係があるタンパク質がある。このことから一部の研究者は、何年にもわたる睡眠不足がこの病気の危険を高めるかもしれないと考えるようになった。もっとも、一方が実際にもう一方の原因になるのかどうかは証明されていない。人間での研究はずっと行いにくく、マウスの結果がいつも人にあてはまるとはかぎらない。それでも、この考えは睡眠を大切にする新しい理由を示している。眠っている脳はただ休んでいるのではなく、自分自身をそうじするのにいそがしいのかもしれないのだ。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'it', 'where'], answer: 0, why: '先行詞 the fluid を説明し、flows の主語になる非制限用法の関係代名詞 which。what は先行詞をとらず、コンマのあとに it だけでは2つの文をつなげず、where は主語になれない。' },
      { id: 'B', choices: ['whose', 'which', 'that', 'of which its'], answer: 0, why: '「そのタンパク質の（脳での）蓄積が」と所有を表すので whose build-up。which・that のあとに名詞 build-up をそのまま続けることはできない。' },
      { id: 'C', choices: ['cleaning', 'to clean', 'cleaned', 'clean'], answer: 0, why: 'be busy ～ing で「～するのにいそがしい」。be busy to do の形はなく、過去分詞・原形も入らない。' },
    ],
    tf: [
      { statement: '脳の内部には、体のほかの部分のようなリンパ系の管がほとんどない。', answer: true, why: '第2段落 the brain has almost none of these vessels inside it。' },
      { statement: 'マウスの実験では、細胞のあいだのすき間は起きているときに広がった。', answer: false, why: '第2段落 these spaces appeared to widen during sleep。' },
      { statement: '睡眠不足がアルツハイマー病の原因になることは、すでに証明されている。', answer: false, why: '第3段落 whether one actually causes the other has not been proven。' },
    ],
    qa: [
      { q: 'According to the passage, what may the brain be doing while we sleep?', choices: ['Washing out waste with the fluid that surrounds it.', 'Growing new lymphatic vessels.', 'Producing the protein linked to Alzheimer\'s disease.', 'Looking for food and watching for enemies.'], answer: 0, why: '第2・3段落 the fluid … washes the waste out … the sleeping brain may be busy cleaning itself。' },
    ],
  },
  {
    id: 'adv-wobbly-bridge',
    title: 'The Bridge That Walkers Shook',
    level: '難関大（評論）',
    paragraphs: [
      "When the Millennium Bridge, a footbridge across the River Thames in London, opened in June 2000, thousands of people crowded onto it to enjoy the view. Within minutes, the bridge began to sway from side to side, and many walkers had to hold on to the railings. Only two days later the bridge was closed, ( A ) its engineers puzzled about what had gone wrong.",
      "The cause turned out to be the walkers themselves. When we walk, our bodies push slightly to the left and to the right with each step. At first the people on the bridge stepped at different moments, so these small sideways forces cancelled one another out. Once the bridge began to move a little, however, walkers unconsciously adjusted their steps to keep their balance, and in doing so they fell into step with the bridge's motion. The more people walked in time with the swaying, the stronger it became, which in turn made even more people ( B ) their steps to it.",
      "Engineers solved the problem by adding devices called dampers, which absorb the energy of the movement, and the bridge reopened in 2002. The episode taught a lesson that reaches far beyond engineering: a system can behave in ways that none of its parts intend. No single walker was trying to shake the bridge, yet together they produced an effect that no one ( C ) predicted.",
    ],
    ja: [
      'ロンドンのテムズ川にかかる歩行者専用の橋、ミレニアム・ブリッジが2000年6月に開通したとき、何千人もの人がながめを楽しもうと橋の上に集まった。数分のうちに橋は左右にゆれはじめ、多くの歩行者は手すりにつかまらなければならなかった。わずか2日後に橋は閉鎖され、技術者たちは何がまちがっていたのかと首をかしげることになった。',
      '原因は、歩いている人たち自身だとわかった。歩くとき、私たちの体は一歩ごとに少しだけ左右に力をかける。はじめのうち、橋の上の人々はばらばらのタイミングで足をふみ出していたので、こうした小さな横向きの力はたがいに打ち消しあっていた。しかし橋が少し動きはじめると、歩行者たちはバランスをたもとうと無意識に歩き方を調整し、そうすることで橋の動きに歩調を合わせてしまった。ゆれに合わせて歩く人が多くなるほどゆれは強くなり、それがさらに多くの人に歩調をゆれに合わせさせたのである。',
      '技術者たちは、動きのエネルギーを吸収するダンパーとよばれる装置をとりつけることでこの問題を解決し、橋は2002年にふたたび開通した。この出来事は、工学をはるかにこえる教訓を残した。あるしくみは、その部分のどれもが意図しないふるまいをすることがある、ということだ。橋をゆらそうとしていた歩行者は1人もいなかったが、全員がいっしょになって、だれも予想していなかった結果を生み出したのである。',
    ],
    blanks: [
      { id: 'A', choices: ['leaving', 'left', 'leave', 'leaves'], answer: 0, why: 'コンマのあとで「そして（その結果）技術者たちを当惑させたままにした」と結果をそえる分詞構文 leaving ＋ O ＋ C。主語のない left・leave・leaves は文をつなげない。' },
      { id: 'B', choices: ['match', 'to match', 'matching', 'matched'], answer: 0, why: '使役の make ＋ 人 ＋ 動詞の原形（make people match）。能動の make のあとに to 不定詞・-ing・過去分詞は置けない。' },
      { id: 'C', choices: ['had', 'have', 'been', 'being'], answer: 0, why: '「（それまでに）だれも予想していなかった」過去完了 had predicted。no one は単数あつかいなので have は不可、been・being だけでは動詞の形にならない。' },
    ],
    tf: [
      { statement: 'ミレニアム・ブリッジは、開通してから数日で閉鎖された。', answer: true, why: '第1段落 Only two days later the bridge was closed。' },
      { statement: '橋がゆれた原因は、川の上をふく強い風だった。', answer: false, why: '第2段落 The cause turned out to be the walkers themselves。' },
      { statement: '筆者によれば、橋をゆらそうとしていた歩行者がいた。', answer: false, why: '第3段落 No single walker was trying to shake the bridge。' },
    ],
    qa: [
      { q: 'How did the engineers solve the problem with the bridge?', choices: ['They added dampers that absorb the energy of the movement.', 'They allowed only a few people to cross at a time.', 'They asked walkers to keep in step with one another.', 'They built a completely new bridge in 2002.'], answer: 0, why: '第3段落 by adding devices called dampers, which absorb the energy of the movement。' },
    ],
  },
  {
    id: 'adv-container',
    title: 'The Box That Changed Trade',
    level: '難関大（評論）',
    paragraphs: [
      "For centuries, loading a ship was slow and expensive work. Goods arrived at the port in sacks, barrels, and boxes of every shape, and teams of dockworkers carried them on board one by one. A ship could spend more time ( A ) in port than travelling at sea, and goods were often damaged or stolen along the way.",
      "In 1956 an American trucking businessman named Malcolm McLean tried a different idea. He loaded fifty-eight large metal boxes onto an old tanker, the Ideal X, and sent it from New Jersey to Texas. Because the boxes were all the same size, they could be lifted by cranes straight from trucks onto the ship, and work that had once taken days could be finished in hours.",
      "Standard containers soon spread around the world. As the cost of moving goods fell sharply, companies found it worth ( B ) parts and products across oceans, and many port cities had to change as cranes replaced crowds of workers. Today almost everything we buy, from clothes to phones, has spent part of its journey inside a steel box ( C ) basic design has hardly changed since the 1950s.",
    ],
    ja: [
      '何世紀ものあいだ、船に荷物を積むのは時間もお金もかかる仕事だった。品物は袋やたる、さまざまな形の箱に入って港にとどき、港湾労働者のチームがそれを1つずつ船に運び入れた。船は海を航海しているよりも港で待っている時間のほうが長いこともあり、品物はとちゅうでいたんだり、ぬすまれたりすることも多かった。',
      '1956年、マルコム・マクリーンというアメリカのトラック運送業者が、ちがう考えをためした。彼は58個の大きな金属の箱を古いタンカー、アイデアルX号に積み、ニュージャージーからテキサスへ送ったのだ。箱はすべて同じ大きさだったので、クレーンでトラックから船へそのままつり上げることができ、かつては何日もかかった作業が数時間で終わるようになった。',
      '規格化されたコンテナはまもなく世界中に広まった。品物を運ぶ費用が大きく下がるにつれて、企業は部品や製品を海の向こうへ運ぶ価値があると考えるようになり、クレーンが大勢の労働者にとってかわったことで、多くの港町は変わらざるをえなかった。今日、服から電話まで、私たちが買うほとんどすべての物は、基本の設計が1950年代からほとんど変わっていない鋼鉄の箱の中で、旅の一部をすごしてきたのである。',
    ],
    blanks: [
      { id: 'A', choices: ['waiting', 'to wait', 'waited', 'wait'], answer: 0, why: 'spend ＋ 時間 ＋ ～ing で「～して時間をすごす」。spend time to do の形はなく、過去分詞・原形も入らない。' },
      { id: 'B', choices: ['shipping', 'to ship', 'ship', 'shipped'], answer: 0, why: 'worth は前置詞のようにはたらき、うしろに動名詞をとる（worth ～ing「～する価値がある」）。worth to do の形はない。' },
      { id: 'C', choices: ['whose', 'which', 'that', 'its'], answer: 0, why: '「その（箱の）基本の設計が」と所有を表すので whose basic design。which・that のあとに名詞をそのまま続けられず、its では2つの文をつなげない。' },
    ],
    tf: [
      { statement: 'コンテナが使われる前は、船に荷物を積むのに時間がかかった。', answer: true, why: '第1段落 loading a ship was slow and expensive work。' },
      { statement: 'マクリーンは最初の航海で、600個の箱を運んだ。', answer: false, why: '第2段落 He loaded fifty-eight large metal boxes。' },
      { statement: 'コンテナの基本の設計は、1950年代から大きく変わった。', answer: false, why: '第3段落 basic design has hardly changed since the 1950s。' },
    ],
    qa: [
      { q: 'Why could McLean\'s boxes be loaded so quickly?', choices: ['They were all the same size and could be lifted by cranes.', 'They were carried on board one by one by many workers.', 'They were made of light wood instead of metal.', 'They were loaded while the ship was at sea.'], answer: 0, why: '第2段落 Because the boxes were all the same size, they could be lifted by cranes。' },
    ],
  },
  {
    id: 'adv-blood-types',
    title: 'Why Blood Must Be Matched',
    level: '難関大（評論）',
    paragraphs: [
      "For centuries, doctors dreamed of saving patients who had lost large amounts of blood by giving them blood from someone else. In the seventeenth century, a few physicians even tried giving patients the blood of animals such as lambs. Early attempts, however, often ended in disaster. Some patients recovered, but others became seriously ill or died soon after the transfusion, and no one could explain ( A ) the results were so different.",
      "The answer came in 1901, when the Austrian scientist Karl Landsteiner mixed blood samples taken from different people. He noticed that in some combinations the red blood cells clumped together, while in others they did not. From these observations he identified the groups we now call A, B, and O, and a fourth group, AB, was found soon afterwards. A transfusion was dangerous, he realized, whenever the patient's blood ( B ) the donor's cells as foreign and attacked them.",
      "Landsteiner's discovery made blood transfusion far safer and earned him a Nobel Prize in 1930. Today, donated blood is carefully tested and matched before it is given, and blood banks store donations so that they are ready when emergencies occur. Many operations that would once have been impossible now depend on a simple rule: blood can be shared, but only between people ( C ) blood types are compatible. Giving blood is therefore one of the simplest ways for healthy people to save lives.",
    ],
    ja: [
      '何世紀ものあいだ、医師たちは、大量の血液を失った患者をほかの人の血液をあたえることで救うことを夢見てきた。17世紀には、子羊のような動物の血液を患者にあたえようとした医師さえいた。しかし初期のこころみは、しばしば悲惨な結果に終わった。回復する患者もいれば、輸血のすぐあとに重い病気になったり亡くなったりする患者もいて、なぜ結果がそれほどちがうのかをだれも説明できなかった。',
      '答えが出たのは1901年、オーストリアの科学者カール・ランドシュタイナーが、ちがう人からとった血液のサンプルをまぜたときだった。彼は、ある組み合わせでは赤血球がかたまりあうのに、別の組み合わせではかたまらないことに気づいた。こうした観察から、彼は今日A型・B型・O型とよばれる血液型を見つけ、4つ目のAB型もそのすぐあとに見つかった。患者の血液が提供者の細胞を異物としてあつかい攻撃するときはいつでも、輸血は危険なのだと彼は気づいたのである。',
      'ランドシュタイナーの発見によって輸血ははるかに安全になり、彼は1930年にノーベル賞を受けた。今日、提供された血液はあたえる前に注意深く検査され、型が合わせられる。また血液バンクは、緊急のときにそなえて提供された血液を保管している。かつては不可能だった多くの手術が、いまではかんたんな決まりにもとづいている。血液は分けあうことができるが、それは血液型が適合する人どうしのあいだだけなのである。だから献血は、健康な人が命を救うためのもっともかんたんな方法の1つなのである。',
    ],
    blanks: [
      { id: 'A', choices: ['why', 'what', 'which', 'whom'], answer: 0, why: 'explain の目的語になる間接疑問で「なぜ～か」。うしろの the results were so different は欠けたところのない文なので、what・which・whom は入らない。' },
      { id: 'B', choices: ['treated', 'treating', 'to treat', 'treat'], answer: 0, why: 'whenever 節の主語 the patient\'s blood（単数）に続く動詞。過去の話なので treated。-ing・to 不定詞だけでは動詞にならず、treat は三人称単数の形ではない。' },
      { id: 'C', choices: ['whose', 'who', 'which', 'that'], answer: 0, why: '「その人たちの血液型が」と所有を表すので whose blood types。who・which・that のあとに名詞をそのまま続けることはできない。' },
    ],
    tf: [
      { statement: '輸血の初期のこころみは、いつもうまくいった。', answer: false, why: '第1段落 Early attempts, however, often ended in disaster。' },
      { statement: 'ランドシュタイナーは、赤血球がかたまる組み合わせと、かたまらない組み合わせがあることに気づいた。', answer: true, why: '第2段落 in some combinations the red blood cells clumped together, while in others they did not。' },
      { statement: 'AB型は、A型・B型・O型と同時に見つかった。', answer: false, why: '第2段落 a fourth group, AB, was found soon afterwards。' },
    ],
    qa: [
      { q: 'According to Landsteiner, when was a transfusion dangerous?', choices: ['When the patient\'s blood treated the donor\'s cells as foreign.', 'When the donor had lost a large amount of blood.', 'When the blood had been stored in a blood bank.', 'When the patient and the donor had the same blood type.'], answer: 0, why: '第2段落 whenever the patient\'s blood treated the donor\'s cells as foreign and attacked them。' },
    ],
  },
  {
    id: 'adv-qwerty',
    title: 'The Keyboard Nobody Chose',
    level: '難関大（評論）',
    paragraphs: [
      "The arrangement of letters on most English keyboards, known as QWERTY after its first six letters, dates back to typewriters of the 1870s. Few people today know why the letters were placed this way, and fewer still have stopped to ask ( A ) a better arrangement might exist.",
      "A popular story claims that the layout was designed to slow typists down. Historians, however, suggest a different purpose: early machines tended to jam when keys next to each other were struck in quick succession, so letters often used together were separated. Once thousands of typists had been trained on the layout, schools, offices, and manufacturers all had reasons to keep it, even ( B ) new machines no longer jammed.",
      "Later designs, such as one introduced in the 1930s by August Dvorak, placed the most common letters where the fingers rest. Some studies reported faster typing with these layouts, but others found the advantages small, and none came close to replacing QWERTY. Economists use the keyboard as an example of 'lock-in': once a standard is widely shared, the cost of changing it can matter more than ( C ) the alternative is better.",
    ],
    ja: [
      '英語のキーボードの多くに見られる文字の配列は、最初の6文字からQWERTYとよばれ、1870年代のタイプライターにまでさかのぼる。今日、なぜ文字がこのように置かれたのかを知る人はほとんどおらず、もっとよい配列があるかどうかと立ち止まって考えた人はさらに少ない。',
      'よく知られた話では、この配列はタイピストの速度を落とすために考えられたとされる。しかし歴史家たちは、ちがう目的を示している。初期の機械は、となりあうキーをすばやく続けて打つと動かなくなりがちだったので、いっしょによく使われる文字がはなされたというのである。何千人ものタイピストがこの配列で訓練されると、学校も会社も製造業者も、新しい機械が動かなくならなくなったあとでさえ、それを使い続ける理由をもつことになった。',
      'のちの配列、たとえば1930年代にオーガスト・ドボラックが考えたものは、もっともよく使われる文字を指を置く位置に配置した。こうした配列で速く打てたと報告する研究もあったが、利点は小さいとする研究もあり、どれもQWERTYにとってかわるにはほど遠かった。経済学者はこのキーボードを「ロックイン」の例として使う。ある標準が広く共有されると、それを変える費用のほうが、ほかの案がどれほどすぐれているかよりも大きな意味をもちうるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['whether', 'what', 'which', 'who'], answer: 0, why: 'ask の目的語で「～かどうか」。うしろの a better arrangement might exist は欠けたところのない文なので、what・which・who は入らない。' },
      { id: 'B', choices: ['after', 'despite', 'during', 'since then'], answer: 0, why: 'うしろに文（new machines no longer jammed）が続くので接続詞 after。despite・during は前置詞、since then は副詞なので、文をつなげない。' },
      { id: 'C', choices: ['how much', 'what', 'which', 'that'], answer: 0, why: 'than のあとに「ほかの案がどれほどすぐれているか」という間接疑問 how much ～。what・which のうしろには欠けた部分が必要で、than のあとに that 節は置けない。' },
    ],
    tf: [
      { statement: 'QWERTY という名前は、配列の最初の6文字からきている。', answer: true, why: '第1段落 known as QWERTY after its first six letters。' },
      { statement: '歴史家たちは、この配列はタイピストの速度を落とすために考えられたと考えている。', answer: false, why: '第2段落 Historians, however, suggest a different purpose。' },
      { statement: 'ドボラックの配列は、やがて QWERTY にとってかわった。', answer: false, why: '第3段落 none came close to replacing QWERTY。' },
    ],
    qa: [
      { q: 'Why has the QWERTY layout survived for so long?', choices: ['So many people and organizations already used it that changing was costly.', 'It has been proven to be the fastest layout for typing.', 'Modern keyboards still jam with other layouts.', 'August Dvorak recommended it in the 1930s.'], answer: 0, why: '第2・3段落 Once thousands of typists had been trained on the layout … the cost of changing it can matter more。' },
    ],
  },
  {
    id: 'todai-dialects',
    title: 'Why Dialects Survive',
    level: '難関大（評論）',
    paragraphs: [
      "When radio and television spread across the world in the twentieth century, many people predicted that local dialects would soon disappear. Hearing the same standard form of a language every day, they argued, listeners would gradually abandon the way their grandparents spoke. Yet in many countries, regional speech has proved far more durable than these predictions suggested, ( A ) it has changed in other ways.",
      "One reason is that a way of speaking does more than carry information. It also signals ( B ) we belong. A teenager who adopts the accent of a distant city may sound fashionable on television, but at home the same accent can suggest that the speaker has turned away from friends and family. Linguists have found that some speakers, especially in close-knit communities, keep local features precisely because they express loyalty to a place.",
      "This does not mean that dialects are frozen. Words connected with old ways of farming or fishing disappear when those jobs disappear, and young speakers often mix local and national forms depending on ( C ) they are talking to. What survives is not a fixed list of words but a flexible resource: people move between ways of speaking much as they move between formal and casual clothes. Seen in this light, the standard language and local dialects are less rivals than tools for different occasions.",
    ],
    ja: [
      '20世紀にラジオとテレビが世界中に広まったとき、多くの人は地域の方言はまもなく消えるだろうと予想した。毎日同じ標準的な言葉を聞いていれば、聞き手は祖父母の話し方を少しずつ捨てていくだろうと彼らは主張したのである。しかし多くの国で、地域の言葉はこうした予想よりもずっと長持ちすることがわかった。もっとも、ほかの点では変わってきたのだが。',
      '1つの理由は、話し方が情報を運ぶ以上のことをしているということだ。話し方は、私たちがどこに属しているかも示すのである。遠い都会のなまりをまねる10代の若者は、テレビの中ではおしゃれに聞こえるかもしれないが、地元では同じなまりが、その人が友人や家族に背を向けたことを示しうる。言語学者たちは、とくに結びつきの強い地域社会では、まさにその土地への忠誠を表すからこそ、地域の特徴を保つ話し手がいることを見いだしてきた。',
      'だからといって、方言が固まって動かないわけではない。昔の農業や漁業に関係する言葉は、その仕事がなくなると消えていくし、若い話し手は、だれと話しているかによって地域の言い方と全国共通の言い方をまぜることが多い。生き残るのは決まった単語の一覧ではなく、柔軟に使える資源なのだ。人々は、改まった服とふだん着を着がえるのと同じように、話し方を行き来する。このように見ると、標準語と地域の方言は、ライバルというよりも、ちがう場面のための道具なのである。',
    ],
    blanks: [
      { id: 'A', choices: ['although', 'despite', 'in spite of', 'because of'], answer: 0, why: 'うしろに文（it has changed in other ways）が続き「～ではあるが」と譲歩を加えるので接続詞 although。despite・in spite of・because of は前置詞の働きで、文を続けられない。' },
      { id: 'B', choices: ['where', 'what', 'which', 'whose'], answer: 0, why: 'signals の目的語の間接疑問「どこに属しているか」。belong は自動詞で、うしろに欠けた目的語がないので where。what・which のうしろには欠けた部分が必要で、whose のうしろには名詞が必要。' },
      { id: 'C', choices: ['who', 'whose', 'where', 'that'], answer: 0, why: 'depending on のあとの間接疑問「だれと話しているか」。to の目的語が欠けているので who。where・that ではつながらず、whose のうしろには名詞が必要。' },
    ],
    tf: [
      { statement: '20世紀には、方言はすぐに消えると予想する人が多かった。', answer: true, why: '第1段落 many people predicted that local dialects would soon disappear。' },
      { statement: '筆者によれば、話し方は情報を伝えるためだけのものである。', answer: false, why: '第2段落 a way of speaking does more than carry information。' },
      { statement: '筆者は、方言は昔のまま少しも変わらないと述べている。', answer: false, why: '第3段落 This does not mean that dialects are frozen。' },
    ],
    qa: [
      { q: 'According to the passage, why do some speakers keep local features of their speech?', choices: ['To express loyalty to the place they come from.', 'Because they cannot understand the standard language.', 'Because television uses local dialects.', 'To sound fashionable to people in distant cities.'], answer: 0, why: '第2段落 keep local features precisely because they express loyalty to a place。' },
    ],
  },
  {
    id: 'kyodai-ruins',
    title: 'The Power of Ruins',
    level: '難関大（評論）',
    paragraphs: [
      "There is something strange about the way people travel long distances to look at ruins. A broken wall or a temple without a roof is, in practical terms, less useful than the building it once was. Yet visitors often find such places more moving than buildings that are complete and still in use, as if ( A ) is missing spoke more powerfully than what remains.",
      "One explanation is that a ruin invites the imagination to work. A finished building tells us exactly how it looks; a ruin asks us to picture the rooms, the voices, and the daily routines that once filled it. Many travelers say that the silence of an empty courtyard tells them more about the past than a crowded museum ever could. In this sense the visitor becomes a partner in completing the scene, ( B ) the pleasure is partly a pleasure in one's own creativity.",
      "Ruins also remind us of time in a way that is both sad and comforting. They show that even the strongest works of human hands will eventually give way to wind and rain. At the same time, they suggest that something of human effort can outlast the people who made it. Standing among old stones, we are reminded that our own lives are short, ( C ) not without meaning.",
    ],
    ja: [
      '人々が遠くまで旅をして廃墟を見に行くことには、どこか奇妙なところがある。こわれた壁や屋根のない寺は、実用的に言えば、かつてそうであった建物よりも役に立たない。それなのに訪れる人は、こうした場所を、完成していていまも使われている建物よりも心を動かされるものと感じることが多い。まるで、なくなっているもののほうが、残っているものよりも力強く語りかけてくるかのように。',
      '1つの説明は、廃墟が想像力をはたらかせるよう誘うということだ。完成した建物は、それがどう見えるかを正確に教えてくれる。一方、廃墟は、かつてそこを満たしていた部屋や声や日々の営みを思いえがくよう私たちに求める。多くの旅行者は、人のいない中庭の静けさのほうが、混みあった博物館よりもずっと多くのことを過去について語ってくれると言う。この意味で、訪れる人はその情景を完成させる協力者となり、その喜びは、一部には自分自身の創造力による喜びなのである。',
      '廃墟はまた、悲しくもあり、なぐさめにもなるしかたで、時間を思い出させる。人の手によるもっとも頑丈な作品でさえ、いつかは風雨に屈することを示すのだ。同時に廃墟は、人の努力の何かが、それを作った人々よりも長く残りうることを示している。古い石のあいだに立つと、私たちは自分の人生が短いこと、しかし意味がないわけではないことを思い出すのである。',
    ],
    blanks: [
      { id: 'A', choices: ['what', 'that', 'which', 'it'], answer: 0, why: 'as if のあとの主語になる「なくなっているもの」は先行詞をふくむ関係代名詞 what（what is missing）。that・which は先行詞が必要で、it is missing では spoke とつながらない。' },
      { id: 'B', choices: ['and', 'despite', 'because of', 'in order'], answer: 0, why: 'コンマのあとに文（the pleasure is …）を続けて「そして～」とつなぐ接続詞 and。despite・because of は前置詞の働きで、in order は to 不定詞と使うので文は続けられない。' },
      { id: 'C', choices: ['but', 'nor', 'unless', 'or so'], answer: 0, why: '「短いが、意味がないわけではない」と対比する but（short, but not without meaning）。nor・unless・or so ではこの形を作れない。' },
    ],
    tf: [
      { statement: '筆者によれば、廃墟は実用的にはもとの建物より役に立たない。', answer: true, why: '第1段落 in practical terms, less useful than the building it once was。' },
      { statement: '筆者は、完成した建物のほうが想像力をはたらかせると述べている。', answer: false, why: '第2段落 a ruin invites the imagination to work。' },
      { statement: '筆者によれば、廃墟は人の努力の何かが作った人より長く残りうることを示す。', answer: true, why: '第3段落 something of human effort can outlast the people who made it。' },
    ],
    qa: [
      { q: 'According to the writer, why can a ruin be more moving than a complete building?', choices: ['It invites visitors to imagine what is missing.', 'It is more useful than the original building.', 'It tells visitors exactly how it once looked.', 'It is protected from wind and rain.'], answer: 0, why: '第2段落 a ruin invites the imagination to work … asks us to picture the rooms。' },
    ],
  },
  {
    id: 'toeic-office-move',
    title: 'Notice: Our Office Is Moving',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "To all staff: As announced at last month's meeting, our office will move to the Harbor View Building on Saturday, March 14. The new office is a five-minute walk from Central Station, and all departments will be located on the eighth floor.",
      "Please pack the items on your desk into the boxes provided by Wednesday, March 11. Each box should be labeled with your name and department. Computers and printers will be moved by the moving company, so please do not pack them yourself. Items ( A ) are not labeled may be left behind.",
      "The office will be closed on Friday, March 13, so that the moving company can prepare. Employees who need to work that day are asked to work from home. Please make sure that you have saved all necessary files ( B ) leaving the office on Thursday.",
      "We will begin working in the new office on Monday, March 16. Your new security card will be placed on your desk. If you have any questions about the move, please contact Ms. Tanaka in the General Affairs Department ( C ) the end of this week.",
    ],
    ja: [
      '全社員のみなさんへ：先月の会議でお知らせしたとおり、当社のオフィスは3月14日（土）にハーバービュー・ビルへ移転します。新しいオフィスはセントラル駅から歩いて5分で、すべての部署が8階に入ります。',
      '3月11日（水）までに、机の上の物を用意された箱につめてください。箱にはそれぞれ名前と部署を書いてください。コンピューターとプリンターは引っ越し業者が運ぶので、自分でつめないでください。名前の書かれていない物は置いていかれることがあります。',
      '引っ越し業者が準備できるように、3月13日（金）はオフィスを閉めます。その日に仕事をする必要がある社員は、在宅で仕事をしてください。木曜日にオフィスを出る前に、必要なファイルはすべて保存しておいてください。',
      '3月16日（月）から新しいオフィスで仕事を始めます。新しいセキュリティカードは机の上に置いておきます。移転について質問があれば、今週末までに総務部のタナカさんに連絡してください。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'who', 'whose'], answer: 0, why: '先行詞 Items（物）を説明し、are not labeled の主語になる関係代名詞 that。what は先行詞をとらず、who は人に使い、whose のうしろには名詞が必要。' },
      { id: 'B', choices: ['before', 'during', 'until when', 'since then'], answer: 0, why: 'うしろが動名詞 leaving で「オフィスを出る前に」なので before。during のうしろは期間の名詞、until when・since then はこの形にならない。' },
      { id: 'C', choices: ['by', 'until', 'since', 'for'], answer: 0, why: '「今週末までに（連絡する）」とし切りを表すのは by。until は「～までずっと」で、1回の連絡には使わない。' },
    ],
    tf: [
      { statement: '新しいオフィスでは、すべての部署が8階に入る。', answer: true, why: '第1段落 all departments will be located on the eighth floor。' },
      { statement: '社員は自分のコンピューターを箱につめなければならない。', answer: false, why: '第2段落 Computers and printers will be moved by the moving company, so please do not pack them yourself。' },
      { statement: '3月13日（金）に仕事が必要な社員は、在宅で仕事をする。', answer: true, why: '第3段落 Employees who need to work that day are asked to work from home。' },
    ],
    qa: [
      { q: 'When will employees start working in the new office?', choices: ['On Monday, March 16.', 'On Saturday, March 14.', 'On Friday, March 13.', 'On Wednesday, March 11.'], answer: 0, why: '第4段落 We will begin working in the new office on Monday, March 16。' },
    ],
  },
  {
    id: 'native-small-talk',
    title: 'In Defense of Small Talk',
    level: '難関大（評論）',
    paragraphs: [
      "For years I thought small talk was a waste of time. Chatting about the weather or the traffic seemed like a polite way of saying nothing at all, and at parties I would much rather have been at home with a good book. If someone asked how my weekend went, I gave the shortest answer I could get away ( A ).",
      "What changed my mind was a year I spent working in a small office where nobody knew each other well. The colleagues who seemed to get things done were not always the most talented ones but the ones who took a minute to ask about your kids or your cold. Those tiny conversations broke the ice, and when a real problem came up, people were far more willing to ( B ) in and help.",
      "Sociologists have a name for this: small talk builds what they call 'weak ties,' the casual connections that link us to people outside our closest circle. Weak ties, it turns out, are often where new information and opportunities come from. So these days, when someone mentions the weather, I try to play along instead of ( C ) my eyes. You never know where a two-minute chat about the rain might lead.",
    ],
    ja: [
      '何年ものあいだ、私は世間話は時間のむだだと思っていた。天気や道の混みぐあいについておしゃべりするのは、何も言わないことのていねいな言い方のように思えたし、パーティーではよい本を持って家にいるほうがずっとよかった。週末はどうだったかと聞かれると、許されるかぎりいちばん短い答えをしていた。',
      '私の考えを変えたのは、だれもおたがいをよく知らない小さな会社で働いた1年だった。物事をちゃんと進めているように見えた同僚は、必ずしもいちばん才能のある人ではなく、子どものことや風邪のことを1分かけてたずねてくれる人たちだった。そうした小さな会話が場をなごませ、本当の問題が起きたとき、人々はずっと進んで協力してくれたのである。',
      '社会学者はこれに名前をつけている。世間話は「弱いつながり」とよばれるもの、つまり、いちばん親しい仲間の外にいる人たちと私たちを結ぶ、気軽なつながりをつくるのだ。弱いつながりこそが、新しい情報や機会のもとになることが多いとわかっている。だから最近は、だれかが天気の話をしたら、あきれた顔をするかわりに話に乗るようにしている。雨についての2分のおしゃべりがどこへつながるかは、わからないのだから。',
    ],
    blanks: [
      { id: 'A', choices: ['with', 'from', 'by', 'to'], answer: 0, why: 'get away with ～ で「（大目に見られて）～ですませる」。the shortest answer I could get away with で「許されるかぎりいちばん短い答え」。' },
      { id: 'B', choices: ['pitch', 'pitches', 'pitching', 'pitched'], answer: 0, why: 'be willing to ＋原形。pitch in で「（みんなで）手を貸す」。to のあとなので原形 pitch。' },
      { id: 'C', choices: ['rolling', 'roll', 'rolled', 'to roll'], answer: 0, why: 'instead of は前置詞なので動名詞 rolling。roll one\'s eyes で「（あきれて）目を上に向ける」。' },
    ],
    tf: [
      { statement: '筆者は以前、世間話は時間のむだだと思っていた。', answer: true, why: '第1段落 For years I thought small talk was a waste of time。' },
      { statement: '筆者によれば、小さな会社で物事を進めていたのは、いちばん才能のある人たちだった。', answer: false, why: '第2段落 not always the most talented ones but the ones who took a minute to ask。' },
      { statement: '「弱いつながり」は、新しい情報や機会のもとになることが多い。', answer: true, why: '第3段落 Weak ties … are often where new information and opportunities come from。' },
    ],
    qa: [
      { q: 'What made the writer change their mind about small talk?', choices: ['Working in an office where small chats made people more willing to help.', 'Reading a good book at home during a party.', 'Learning that the weather is an interesting topic.', 'Meeting the most talented people in the office.'], answer: 0, why: '第2段落 What changed my mind was a year I spent working in a small office … people were far more willing to pitch in and help。' },
    ],
  },
  {
    id: 'todai-imitation',
    title: 'The Myth of the Original Genius',
    level: '難関大（評論）',
    paragraphs: [
      "We like to imagine that great artists and inventors create something out of nothing. The picture of the lonely genius, struck by an idea that no one has ever had before, is so familiar that we rarely question it. Yet when historians look closely at almost any famous work, they find that it grew out of a long chain of borrowing, copying, and small changes ( A ) by many hands.",
      "Consider how young painters were trained for centuries. Before they were allowed to paint anything of their own, they spent years copying the works of their teachers, sometimes so carefully that experts today cannot tell the copy from the original. This was not seen as cheating. On the contrary, it was believed that only by imitating masters could a beginner learn to see as they saw, and only after seeing in that way could he or she begin to see with his or her ( B ) eyes.",
      "The same pattern appears in science and technology. Many inventions were developed at almost the same time by people working in different countries, ( C ) suggests that the ideas were already 'in the air,' waiting for someone to combine them. What we call originality, then, may be less a matter of creating from nothing than of rearranging what already exists in a way that nobody had tried.",
      "If this is true, it has an important lesson for education. Students are often told to be creative and original, but they are given few chances to imitate good models first. Perhaps the road to originality does not avoid imitation but passes straight through it.",
    ],
    ja: [
      '私たちは、偉大な芸術家や発明家が無から何かを生み出すと想像したがる。だれも思いついたことのない考えにふいに打たれる孤独な天才という姿はあまりになじみ深いので、私たちはそれを疑うことがめったにない。しかし歴史家がほぼどんな有名な作品をくわしく調べても、それは多くの人の手によって加えられた、借用や模倣や小さな変更の長い連なりから生まれてきたものだとわかる。',
      '何世紀ものあいだ、若い画家がどのように訓練されてきたかを考えてみよう。自分自身の作品をえがくことを許される前に、彼らは何年も師の作品を写し続けた。ときには、今日の専門家が写しと原画を見分けられないほど注意深く写したのである。これはずるいこととは見なされなかった。それどころか、名人をまねることによってのみ、初心者は名人が見たように見ることを学べるのであり、そのように見られるようになってはじめて、自分の目で見はじめることができると信じられていたのである。',
      '同じ型は科学や技術にも見られる。多くの発明は、ちがう国で研究していた人々によってほぼ同じ時期に開発された。このことは、その考えがすでに「空気中にただよって」いて、だれかがそれを組み合わせるのを待っていたことを示している。そうだとすると、私たちが独創性とよぶものは、無から生み出すことというよりも、すでにあるものを、だれも試したことのないしかたで並べかえることなのかもしれない。',
      'もしこれが正しいなら、教育にとって大切な教訓がある。生徒はよく、創造的で独創的であれと言われるが、まずよい手本をまねる機会はほとんど与えられない。独創性への道は、模倣をさけて通るのではなく、まっすぐその中を通っていくのかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['made', 'making', 'to make', 'makes'], answer: 0, why: 'small changes を後ろから説明する過去分詞 made（多くの人の手によって加えられた変更）。changes は「加えられる」側なので過去分詞。making は「加える側」になり by many hands と合わない。makes は動詞で文が成り立たない。' },
      { id: 'B', choices: ['own', 'self', 'alone', 'oneself'], answer: 0, why: 'with one\'s own eyes で「自分自身の目で」。所有格のあとで名詞 eyes を修飾できるのは own だけ。self・oneself は名詞・代名詞で eyes の前に置けず、alone は名詞の前に置けない。' },
      { id: 'C', choices: ['which', 'what', 'that', 'it'], answer: 0, why: 'コンマのあとで前の文全体を受ける非制限用法の関係代名詞 which。that は非制限用法で使えず、what は先行詞をとらない。it では接続詞がなく2つの文をつなげない。' },
    ],
    tf: [
      { statement: '筆者によれば、有名な作品の多くは、借用や模倣の長い連なりから生まれた。', answer: true, why: '第1段落 it grew out of a long chain of borrowing, copying, and small changes。' },
      { statement: 'かつて、師の作品を写すことはずるいことと見なされていた。', answer: false, why: '第2段落 This was not seen as cheating。' },
      { statement: '筆者は、生徒にはまずよい手本をまねる機会が必要かもしれないと考えている。', answer: true, why: '第4段落 they are given few chances to imitate good models first … the road to originality … passes straight through it。' },
    ],
    qa: [
      { q: 'What does the fact that many inventions appeared at almost the same time suggest?', choices: ['The ideas were already available and waiting to be combined.', 'Inventors in different countries copied each other directly.', 'Only lonely geniuses can create something new.', 'Science develops more slowly than art.'], answer: 0, why: '第3段落 suggests that the ideas were already "in the air," waiting for someone to combine them。' },
    ],
  },
  {
    id: 'kyodai-waiting',
    title: 'The Pleasure of Waiting',
    level: '難関大（評論）',
    paragraphs: [
      "When I was a child, the week before a school trip always felt longer than the trip itself. I would lie awake at night imagining the bus, the mountains, and the food we would eat, and by the time the day finally came, I had already enjoyed it a dozen times in my head. Looking back, I am not sure the trip was ever quite as wonderful as the days I spent ( A ) for it.",
      "This experience is far from unusual. Researchers who have asked people about their holidays report that the happiness people feel tends to rise in the weeks before they leave, and often fades soon after they return. It seems that much of the pleasure we take in good things lies not in having them but in looking forward to ( B ).",
      "Modern life, however, is designed to remove waiting wherever possible. We can watch a film the moment it is released, order a book and receive it the next morning, and send a message that arrives in less than a second. These conveniences are real, and few of us would give them up. Yet by making everything available at once, we may be losing a quiet kind of happiness that only time can produce.",
      "None of this means that we should make our lives harder on purpose. But it may be worth leaving a little space between wanting something and getting it, ( C ) our imagination has room to prepare the pleasure in advance.",
    ],
    ja: [
      '子どものころ、遠足の前の1週間は、いつも遠足そのものよりも長く感じられた。夜はねむれずに横になって、バスや山や、食べるはずのごちそうを思いうかべ、ようやくその日が来たころには、頭の中ですでに何十回もそれを楽しんでいた。ふり返ってみると、遠足が、それを待ちながら過ごした日々ほどすばらしかったことがあったかどうか、自信がない。',
      'このような経験は決してめずらしいものではない。人々に休暇についてたずねた研究者たちは、人が感じる幸福は出発前の数週間に高まる傾向があり、帰ってくるとすぐに薄れることが多いと報告している。私たちがよいものから得る喜びの多くは、それを手にすることではなく、それを楽しみに待つことにあるようだ。',
      'しかし現代の生活は、できるかぎり待つことをなくすように作られている。私たちは映画を公開されたその瞬間に見ることができるし、本を注文して翌朝には受け取れるし、1秒もかからずに届くメッセージを送れる。こうした便利さは本物であり、それを手放す人はほとんどいないだろう。けれども、あらゆるものをすぐに手に入るようにすることで、私たちは時間だけが生み出せる、静かな種類の幸福を失いつつあるのかもしれない。',
      'これは、わざと生活を不便にすべきだということではない。しかし、何かをほしいと思うことと、それを手に入れることのあいだに少しの余白を残しておくのは、価値があるかもしれない。そうすれば、私たちの想像力が前もって喜びを準備するゆとりができるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['waiting', 'waited', 'to wait', 'wait'], answer: 0, why: 'spend ＋時間＋ -ing で「～して（時間を）過ごす」。the days I spent waiting for it で「それを待ちながら過ごした日々」。spend のあとに to 不定詞や原形・過去分詞は続かない。' },
      { id: 'B', choices: ['them', 'have', 'it is', 'what'], answer: 0, why: 'look forward to の to は前置詞なので、うしろは名詞・代名詞か動名詞。good things を受ける代名詞 them。have（原形）や it is（文）は前置詞のあとに置けず、what のうしろには文が必要。' },
      { id: 'C', choices: ['so that', 'in case of', 'because of', 'such'], answer: 0, why: 'うしろに文（our imagination has room …）が続き「～するように・そうすれば」と目的を表すのは so that。in case of・because of のうしろは名詞で、such だけでは文をつなげない。' },
    ],
    tf: [
      { statement: '筆者は子どものころ、遠足の前の週のほうが遠足そのものより長く感じた。', answer: true, why: '第1段落 the week before a school trip always felt longer than the trip itself。' },
      { statement: '研究によれば、休暇の幸福感は帰ってきたあとに最も高まる。', answer: false, why: '第2段落 happiness … tends to rise in the weeks before they leave, and often fades soon after they return。' },
      { statement: '筆者は、わざと生活を不便にすべきだと主張している。', answer: false, why: '第4段落 None of this means that we should make our lives harder on purpose。' },
    ],
    qa: [
      { q: 'What may we be losing by making everything available at once?', choices: ['A quiet kind of happiness that comes from waiting.', 'The ability to watch films and read books.', 'Our interest in school trips and holidays.', 'The speed of sending messages.'], answer: 0, why: '第3段落 we may be losing a quiet kind of happiness that only time can produce。' },
    ],
  },
  {
    id: 'toeic-conference-email',
    title: 'An Email About a Conference Booking',
    level: '難関大（メール文）',
    paragraphs: [
      "Dear Mr. Lopez, Thank you for registering for the Pacific Retail Conference, which will be held at the Grand Lake Hotel from June 4 to June 6. This email confirms your registration for all three days, including the welcome dinner on the first evening.",
      "We noticed that you also requested a room at the conference hotel. Unfortunately, the Grand Lake Hotel is now fully booked for the night of June 3. We have therefore reserved a room for you at the Riverside Inn, ( A ) is located just across the street, for that night only. From June 4, you will stay at the Grand Lake Hotel as planned. The conference will cover the cost of the extra night.",
      "Please note that the workshop on online marketing that you selected has been moved from Room B to the main hall because of the large number of participants. If you would like to change to a different workshop, please let us know ( B ) May 25.",
      "Your name badge and conference program will be ready at the registration desk in the hotel lobby. We recommend arriving ( C ) least thirty minutes before the opening speech, which begins at 9:00 a.m. on June 4. We look forward to seeing you. Sincerely, Emily Chen, Conference Coordinator",
    ],
    ja: [
      'ロペス様　パシフィック小売業カンファレンスにご登録いただき、ありがとうございます。カンファレンスは6月4日から6日まで、グランドレイク・ホテルで開かれます。このメールは、初日の夜の歓迎ディナーをふくむ3日間すべてへのご登録を確認するものです。',
      'また、カンファレンス会場のホテルのお部屋もご希望とうかがっています。あいにく、グランドレイク・ホテルは6月3日の夜はすでに満室です。そのため、その夜だけ、通りのすぐ向かいにあるリバーサイド・インにお部屋を予約しました。6月4日からは、予定どおりグランドレイク・ホテルにお泊まりいただけます。追加の1泊の費用はカンファレンスが負担します。',
      'なお、お選びいただいたオンライン・マーケティングのワークショップは、参加者が多いため、B室から大ホールに移りました。別のワークショップに変更をご希望の場合は、5月25日までにお知らせください。',
      '名札とカンファレンスのプログラムは、ホテルのロビーにある受付でご用意しています。6月4日午前9時に始まる開会のあいさつの少なくとも30分前にお越しになることをおすすめします。お会いできるのを楽しみにしています。カンファレンス・コーディネーター　エミリー・チェン',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'where', 'it'], answer: 0, why: 'コンマのあとで the Riverside Inn を説明し、is located の主語になる非制限用法の関係代名詞 which。where のうしろには主語のそろった文が必要で、what は先行詞をとらず、it では2つの文をつなげない。' },
      { id: 'B', choices: ['by', 'until', 'since', 'during'], answer: 0, why: '「5月25日までに（知らせる）」としめ切りを表すのは by。until は「～までずっと」で1回の連絡には使わず、since・during は意味が合わない。' },
      { id: 'C', choices: ['at', 'in', 'on', 'by'], answer: 0, why: 'at least で「少なくとも」。at least thirty minutes before ～ で「～の少なくとも30分前に」。in・on・by は least と結びつかない。' },
    ],
    tf: [
      { statement: 'ロペスさんは、6月3日の夜はリバーサイド・インに泊まる。', answer: true, why: '第2段落 reserved a room for you at the Riverside Inn … for that night only。' },
      { statement: '追加の1泊の費用は、ロペスさんが自分で払う。', answer: false, why: '第2段落 The conference will cover the cost of the extra night。' },
      { statement: 'オンライン・マーケティングのワークショップは、大ホールで行われる。', answer: true, why: '第3段落 has been moved from Room B to the main hall。' },
    ],
    qa: [
      { q: 'Why was the workshop moved to the main hall?', choices: ['Because many people will take part in it.', 'Because Room B is being repaired.', 'Because Mr. Lopez asked for a change.', 'Because the hotel is fully booked.'], answer: 0, why: '第3段落 because of the large number of participants。' },
    ],
  },
  {
    id: 'native-beginner',
    title: 'Being Bad at Something Again',
    level: '難関大（評論）',
    paragraphs: [
      "Last spring, at the age of forty-two, I signed up for a beginners' pottery class. I had spent twenty years getting good at my job, and I had almost forgotten what it felt like to be truly terrible at something. On the first night, my bowl collapsed three times, and the twenty-year-old next to me had to show me how to keep the clay ( A ) spinning off the wheel.",
      "It was embarrassing, but it was also strangely freeing. At work, people expect me to know the answers, and I feel the pressure to look competent all the time. In the pottery studio, nobody expected anything of me, so I could make mistakes without worrying about what anyone thought. For two hours a week, I was allowed to be clumsy, curious, and slow.",
      "I have come to think that adults avoid new skills not because they lack time but because they are afraid of looking foolish. We get used to being good at things, and the thought of starting from zero feels like a step backward. Yet being a beginner is ( B ) teaches us patience, and it reminds us how much effort it took to learn everything we now take for granted.",
      "My bowls are still a little lopsided, but I have stopped minding. If anything, I would recommend that everyone find one thing they are bad at and keep doing it. It is a small, cheap way of staying humble, and you might even end up ( C ) something useful to put your cereal in.",
    ],
    ja: [
      '去年の春、42歳で、私は初心者向けの陶芸教室に申しこんだ。20年かけて仕事がうまくなってきた私は、何かが本当にへたであるというのがどんな感じなのか、ほとんど忘れていた。最初の夜、私の器は3回つぶれ、となりの20歳の人が、粘土がろくろから飛んでいかないようにする方法を教えてくれなければならなかった。',
      'はずかしかったが、ふしぎと解放された気分でもあった。職場では、人は私が答えを知っていることを期待し、私はいつも有能に見せなければという重圧を感じている。陶芸の工房では、だれも私に何も期待していなかったので、だれにどう思われるかを気にせずに失敗できた。週に2時間、私は不器用で、好奇心いっぱいで、のろくてもよかったのである。',
      '大人が新しい技術をさけるのは、時間がないからではなく、ばかに見えるのがこわいからだと私は考えるようになった。私たちは物事がうまいことに慣れてしまい、ゼロから始めると考えると後もどりのように感じる。しかし、初心者であることこそが私たちに忍耐を教えてくれるのであり、いまでは当たり前と思っているあらゆることを身につけるのに、どれほどの努力が必要だったかを思い出させてくれるのだ。',
      '私の器はまだ少しゆがんでいるが、もう気にしなくなった。むしろ、だれもが自分のへたなことを1つ見つけて、それを続けることをすすめたい。それは小さくてお金のかからない、謙虚でいるための方法であり、ひょっとしたら、シリアルを入れるのに役立つ物を作ることになるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['from', 'of', 'at', 'to'], answer: 0, why: 'keep A from -ing で「A が～しないようにする」。keep the clay from spinning off the wheel で「粘土がろくろから飛んでいかないようにする」。of・at・to ではこの形にならない。' },
      { id: 'B', choices: ['what', 'that', 'which', 'it'], answer: 0, why: 'is のあとで「～するもの」という補語のかたまりを作り、teaches の主語にもなる関係代名詞 what（being a beginner is what teaches us patience）。that・which は先行詞が必要で、it では is と teaches の2つの動詞をつなげない。' },
      { id: 'C', choices: ['making', 'make', 'made', 'to make'], answer: 0, why: 'end up ＋ -ing で「最後には～することになる」。end up のあとに原形・過去分詞・to 不定詞は続かない。' },
    ],
    tf: [
      { statement: '筆者は42歳で陶芸教室に通いはじめた。', answer: true, why: '第1段落 at the age of forty-two, I signed up for a beginners\' pottery class。' },
      { statement: '筆者は陶芸の工房でも、有能に見せなければという重圧を感じていた。', answer: false, why: '第2段落 In the pottery studio, nobody expected anything of me。' },
      { statement: '筆者によれば、大人が新しい技術をさけるおもな理由は時間がないことだ。', answer: false, why: '第3段落 not because they lack time but because they are afraid of looking foolish。' },
    ],
    qa: [
      { q: 'What does the writer recommend at the end of the essay?', choices: ['Finding one thing you are bad at and continuing to do it.', 'Quitting a hobby when you are not good at it.', 'Spending more time getting good at your job.', 'Buying better bowls for your cereal.'], answer: 0, why: '第4段落 I would recommend that everyone find one thing they are bad at and keep doing it。' },
    ],
  },
  {
    id: 'todai-tourism',
    title: 'The Tourist Paradox',
    level: '難関大（評論）',
    paragraphs: [
      "Travelers often say that they want to see the 'real' life of a place: the small cafés where local people meet, the markets where farmers sell their vegetables, the quiet streets ( A ) children play after school. Yet the more travelers come looking for this kind of authenticity, the harder it becomes to find.",
      "The reason is simple. When a quiet neighborhood becomes popular with visitors, rents begin to rise. Cafés that once served the same customers every morning start to offer menus in several languages, and shops selling everyday goods are replaced by shops selling souvenirs. Many residents, unable to pay the higher rents, move away. In the end, the visitors find a neighborhood that looks very much like the one they came to see, ( B ) the people who gave it its character are no longer there.",
      "Some cities have responded by limiting the number of tourists or by charging a fee to enter the busiest areas. Such measures can reduce crowding, but they raise a difficult question: who has the right to enjoy a place? Residents argue that a city is first of all a home, while business owners point out that tourism provides jobs that many families depend ( C ).",
      "There is probably no perfect answer. But it may help if travelers think of themselves not simply as consumers of experiences but as guests in someone else's home, with all the responsibilities that this implies.",
    ],
    ja: [
      '旅行者はよく、その土地の「本当の」暮らしを見たいと言う。地元の人々が集まる小さなカフェ、農家が野菜を売る市場、放課後に子どもたちが遊ぶ静かな通りなどである。しかし、旅行者がこの種の本物らしさを求めてやって来れば来るほど、それを見つけるのはむずかしくなる。',
      'その理由は単純だ。静かな地区が観光客に人気になると、家賃が上がりはじめる。かつては毎朝同じ客に料理を出していたカフェは、いくつもの言語のメニューを出すようになり、日用品を売る店はみやげ物を売る店に取ってかわられる。多くの住民は、高くなった家賃を払えずに引っこしていく。結局、観光客は自分たちが見に来たものによく似た地区を目にするが、そこに個性を与えていた人々はもういないのである。',
      'いくつかの都市は、観光客の数を制限したり、いちばん混みあう地域に入るのに料金を取ったりすることで対応してきた。こうした対策は混雑を減らせるが、むずかしい問いを投げかける。ある場所を楽しむ権利はだれにあるのか、という問いだ。住民は、都市は何よりもまず家だと主張し、一方で事業者は、観光が多くの家族の頼りにしている仕事を生み出していると指摘する。',
      'おそらく完璧な答えはない。しかし、旅行者が自分自身を、単に体験を消費する人としてではなく、だれか別の人の家に招かれた客として考えれば、助けになるかもしれない。それにともなうあらゆる責任をふくめて。',
    ],
    blanks: [
      { id: 'A', choices: ['where', 'which', 'what', 'when'], answer: 0, why: '先行詞 the quiet streets（場所）を説明し、うしろが主語・動詞のそろった文（children play after school）なので関係副詞 where。which は主語か目的語が欠けた文が続き、what は先行詞をとらず、when は時を表す先行詞に使う。' },
      { id: 'B', choices: ['but', 'despite', 'because of', 'instead of'], answer: 0, why: '「よく似た地区を目にするが、人々はもういない」と、うしろの文（the people … are no longer there）をつなぐ接続詞 but。despite・because of・instead of は前置詞の働きで、うしろに文を続けられない。' },
      { id: 'C', choices: ['on', 'at', 'in', 'with'], answer: 0, why: 'depend on ～ で「～に頼る」。jobs that many families depend on で「多くの家族が頼りにしている仕事」。at・in・with は depend と結びつかない。' },
    ],
    underline: {
      phrase: 'unable to pay the higher rents',
      choices: ['because they cannot pay the higher rents', 'although they can pay the higher rents', 'after paying the higher rents', 'so that they can pay the higher rents'],
      answer: 0,
      why: '形容詞 unable で始まる分詞構文のような形で、理由「高くなった家賃を払えないので」を表す。',
    },
    order: {
      words: ['when', 'a', 'quiet', 'neighborhood', 'becomes', 'popular', 'with', 'visitors'],
      rest: ', rents begin to rise.',
      answer: 'when a quiet neighborhood becomes popular with visitors',
      ja: '静かな地区が観光客に人気になると、家賃が上がりはじめる。（become popular with ～＝～に人気になる）',
    },
    tf: [
      { statement: '筆者によれば、旅行者が本物らしさを求めるほど、それは見つけにくくなる。', answer: true, why: '第1段落 the more travelers come looking for this kind of authenticity, the harder it becomes to find。' },
      { statement: '筆者は、観光客の数を制限すれば問題はすべて解決すると述べている。', answer: false, why: '第3段落 Such measures can reduce crowding, but they raise a difficult question／第4段落 There is probably no perfect answer。' },
      { statement: '筆者は、旅行者を住民の家に招かれた客と考えることを提案している。', answer: true, why: '第4段落 think of themselves … as guests in someone else\'s home。' },
    ],
    qa: [
      { q: 'Why do many residents move away from popular neighborhoods?', choices: ['They cannot pay the higher rents.', 'They want to open souvenir shops.', 'They dislike the menus in several languages.', 'The city charges them a fee to live there.'], answer: 0, why: '第2段落 Many residents, unable to pay the higher rents, move away。' },
    ],
  },
  {
    id: 'kyodai-mending',
    title: 'On Mending Things',
    level: '難関大（評論）',
    paragraphs: [
      "My grandmother never threw anything away if it could be mended. Socks with holes in them were sewn, broken chairs were glued, and a teapot whose handle had cracked was carefully tied with wire. As a child, I found this habit slightly embarrassing; ( A ) seemed to me that she simply could not afford new things. Only much later did I understand that mending was, for her, a way of thinking about the world.",
      "To mend something is to pay attention to it. Before you can repair a chair, you have to look closely at how it was made, which joints carry the weight, and where it is likely to fail again. In this sense, repair is a form of learning. A person who has fixed a clock understands it far better ( B ) someone who has only looked at the time on it.",
      "Mending also changes our relationship with objects. A mended cup is no longer just one cup among thousands made in a factory; it carries the story of the accident that broke it and the care that saved it. Such things are often loved more, not less, because of their scars.",
      "Today it is usually cheaper to replace than to repair, and few people have the time or skill to do otherwise. Yet I sometimes wonder whether, in ( C ) the habit of mending, we have also lost a certain patience with things, and perhaps with people, that are not quite perfect.",
    ],
    ja: [
      '祖母は、直せるものは決して捨てなかった。穴のあいた靴下はぬわれ、こわれたいすは接着され、取っ手にひびの入ったティーポットは針金でていねいにしばられた。子どものころ、私はこの習慣を少しはずかしく思っていた。祖母はただ新しい物を買う余裕がないのだと思えたのである。ずっとあとになってはじめて、直すことは祖母にとって世界についての1つの考え方だったのだと理解した。',
      '何かを直すことは、それに注意を向けることである。いすを修理できるようになるには、それがどう作られているか、どの継ぎ目が重さを支えているか、そしてどこがまたこわれそうかを、よく見なければならない。この意味で、修理は学びの1つの形である。時計を直したことのある人は、時計で時刻を見たことしかない人よりも、はるかによく時計を理解している。',
      '直すことはまた、物との関係を変える。直したカップは、もはや工場で作られた何千ものカップのうちの1つにすぎないものではない。それは、カップをこわした事故と、それを救った心づかいの物語を背負っている。そうした物は、その傷あとがあるからこそ、かえってより愛されることが多いのである。',
      '今日では、たいてい修理するより取りかえるほうが安く、そうしないだけの時間や技術がある人はほとんどいない。それでも私はときどき、直すという習慣を失うことで、私たちは完全とは言えない物に対する、そしておそらく人に対する、ある種の忍耐も失ってしまったのではないかと思うのである。',
    ],
    blanks: [
      { id: 'A', choices: ['it', 'what', 'which', 'that is'], answer: 0, why: 'it seems to me that ～ で「私には～と思える」。形式主語の it が入る。what・which では文にならず、that is のうしろに seemed は続かない。' },
      { id: 'B', choices: ['than', 'then', 'as', 'that'], answer: 0, why: '比較級 far better のあとで比べる相手を示すのは than。then は「そのとき」、as は as ～ as の形で使い、that では比較の文にならない。' },
      { id: 'C', choices: ['losing', 'lose', 'lost', 'to lose'], answer: 0, why: '前置詞 in のうしろは動名詞。in losing ～ で「～を失うことで」。原形・過去分詞・to 不定詞は前置詞のあとに置けない。' },
    ],
    underline: {
      phrase: 'could not afford new things',
      choices: ['did not have enough money to buy new things', 'did not like new things', 'could not find new things in the shops', 'did not need anything new'],
      answer: 0,
      why: 'cannot afford ～ は「～を買う（お金の）余裕がない」。',
    },
    order: {
      words: ['to', 'mend', 'something', 'is', 'to', 'pay', 'attention', 'to', 'it'],
      rest: '',
      answer: 'to mend something is to pay attention to it',
      ja: '何かを直すことは、それに注意を向けることである。（To ～ is to …＝～することは…することだ）',
    },
    tf: [
      { statement: '筆者は子どものころ、祖母の直す習慣を少しはずかしく思っていた。', answer: true, why: '第1段落 As a child, I found this habit slightly embarrassing。' },
      { statement: '筆者によれば、直したカップは傷があるため、あまり愛されなくなる。', answer: false, why: '第3段落 Such things are often loved more, not less, because of their scars。' },
      { statement: '筆者は、今日では修理するより取りかえるほうがふつう安いと述べている。', answer: true, why: '第4段落 Today it is usually cheaper to replace than to repair。' },
    ],
    qa: [
      { q: 'Why does the writer call repair "a form of learning"?', choices: ['Because you must study closely how a thing is made in order to fix it.', 'Because repairing things is taught in schools.', 'Because new things are too expensive to buy.', 'Because clocks are difficult to read.'], answer: 0, why: '第2段落 you have to look closely at how it was made … In this sense, repair is a form of learning。' },
    ],
  },
  {
    id: 'toeic-job-ad',
    title: 'Notice: Job Opening at Greenfield Foods',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "Greenfield Foods, a fast-growing supplier of fresh vegetables to restaurants across the region, is looking for a full-time Customer Service Representative to join our team at our main office in Westport.",
      "The successful candidate will answer calls and emails from restaurant owners, handle orders and changes to deliveries, and work closely with our drivers to make sure ( A ) every order arrives on time. Occasional weekend work may be required during busy seasons.",
      "Applicants should have at least two years of experience in customer service and be comfortable using spreadsheets. Experience in the food industry is preferred but not required. Above all, we are looking for someone who stays calm under pressure and enjoys ( B ) problems.",
      "We offer a competitive salary, paid holidays, and free lunches made with our own produce. New employees will receive two weeks of training before they begin working with customers on their own.",
      "To apply, please send your résumé and a short cover letter to jobs@greenfieldfoods.example no later than April 30. Only candidates ( C ) are selected for an interview will be contacted.",
    ],
    ja: [
      '地域全体のレストランに新鮮な野菜を届け、急成長している卸売業者グリーンフィールド・フーズは、ウエストポートの本社で私たちのチームに加わる、正社員の顧客サービス担当者を募集しています。',
      '採用された方には、レストランの経営者からの電話やメールに対応し、注文や配達の変更を処理し、すべての注文が時間どおりに届くようにドライバーと密に協力していただきます。繁忙期には、ときどき週末の勤務が必要になることがあります。',
      '応募者は、顧客サービスの経験が少なくとも2年あり、スプレッドシートを問題なく使えることが必要です。食品業界での経験があれば望ましいですが、必須ではありません。何よりも、重圧の中でも落ち着いていられ、問題を解決することを楽しめる人を求めています。',
      '他社に負けない給与、有給休暇、そして自社の農産物で作った無料の昼食を用意しています。新しい社員は、ひとりでお客様の対応を始める前に、2週間の研修を受けます。',
      '応募するには、履歴書と短い添え状を、4月30日までに jobs@greenfieldfoods.example へ送ってください。面接に選ばれた応募者にのみご連絡します。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'which', 'whether to'], answer: 0, why: 'make sure (that) ＋文 で「必ず～するようにする」。うしろが完全な文（every order arrives on time）なので接続詞 that。what・which のうしろは欠けた文になり、whether to のうしろは動詞の原形。' },
      { id: 'B', choices: ['solving', 'to solve', 'solve', 'solved'], answer: 0, why: 'enjoy は動名詞を目的語にとる。enjoy solving で「解決することを楽しむ」。enjoy のあとに to 不定詞・原形・過去分詞は続かない。' },
      { id: 'C', choices: ['who', 'whom', 'whose', 'what'], answer: 0, why: '先行詞 candidates（人）を説明し、are selected の主語になる関係代名詞 who。whom は目的語、whose のうしろには名詞が必要で、what は先行詞をとらない。' },
    ],
    tf: [
      { statement: 'この仕事は、ときどき週末の勤務が必要になることがある。', answer: true, why: '第2段落 Occasional weekend work may be required during busy seasons。' },
      { statement: '応募には、食品業界での経験が必須である。', answer: false, why: '第3段落 Experience in the food industry is preferred but not required。' },
      { statement: '応募者は全員、会社から連絡を受ける。', answer: false, why: '第5段落 Only candidates who are selected for an interview will be contacted。' },
    ],
    qa: [
      { q: 'What will new employees do before working with customers alone?', choices: ['Receive two weeks of training.', 'Visit restaurants in the region.', 'Work with drivers on weekends.', 'Send a cover letter to the company.'], answer: 0, why: '第4段落 New employees will receive two weeks of training before they begin working with customers on their own。' },
    ],
  },
  {
    id: 'native-long-way',
    title: 'Taking the Long Way',
    level: '難関大（評論）',
    paragraphs: [
      "A couple of years ago, my bus company changed its route, and the stop near my apartment disappeared overnight. Grumbling, I started walking the forty minutes to work, fully intending to buy a bike as soon as I got around ( A ) it. I never did. Somewhere along the way, the walk stopped being a chore and turned into the best part of my day.",
      "On the bus, I used to spend the whole ride staring at my phone, and I would arrive at the office already worn out by the news. On foot, there is not much to do except notice things: the bakery that opens at seven sharp, the old man who waters his roses in his pajamas, the way the river looks different every single morning. By the time I sit down at my desk, my head feels clear, and I have usually worked out whatever problem was ( B ) me the night before.",
      "I am not going to pretend that walking is always pleasant. There are days when it pours and I show up looking like a drowned rat. But I have come to think that the time we spend getting from one place to another does not have to be dead time. ( C ) we treat it as something to rush through, it can become a small daily gift that nobody else can take away.",
    ],
    ja: [
      '2年ほど前、私が使っていたバス会社が路線を変え、アパートの近くの停留所がひと晩でなくなった。ぶつぶつ言いながら、私は職場まで40分歩くようになった。そのうち手が空いたらすぐに自転車を買うつもりでいたのである。けれども、結局買わなかった。いつのまにか、歩くことはいやな仕事ではなくなり、1日でいちばんよい時間に変わっていたのだ。',
      'バスでは、乗っているあいだずっとスマホを見つめて過ごし、ニュースのせいで、会社に着くころにはもうくたくたになっていた。歩いていると、物事に気づくこと以外にはあまりすることがない。7時ちょうどに開くパン屋、パジャマ姿でバラに水をやるおじいさん、毎朝ちがって見える川のようす。机に座るころには頭がすっきりしていて、たいてい前の晩に悩んでいた問題がなんであれ、解決できている。',
      '歩くのがいつも楽しいふりをするつもりはない。どしゃぶりの日もあり、ずぶぬれのネズミのような姿で着くこともある。それでも私は、ある場所から別の場所へ移動するのにかける時間は、むだな時間である必要はないと考えるようになった。急いで通りすぎるべきものとしてあつかうのでなければ、それはだれにもうばえない、毎日の小さな贈り物になりうるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['to', 'with', 'at', 'for'], answer: 0, why: 'get around to ～ で「（のびのびになっていたことに）やっと手をつける」。as soon as I got around to it で「手が空いたらすぐに」。with・at・for ではこの意味にならない。' },
      { id: 'B', choices: ['bugging', 'bugged', 'bug', 'bugs'], answer: 0, why: 'was ＋ -ing の過去進行形で「（ずっと）悩ませていた」。bug は口語で「悩ませる・いらいらさせる」。うしろに目的語 me があるので受け身の was bugged は使えず、was のあとに原形 bug や bugs は置けない。work out は「（問題を）解決する」。' },
      { id: 'C', choices: ['Unless', 'Despite', 'Without', 'Instead of'], answer: 0, why: 'うしろに文（we treat it as …）が続き「～しないかぎり」を表す接続詞 Unless。Despite・Without・Instead of は前置詞の働きで、うしろに文を続けられない。' },
    ],
    tf: [
      { statement: '筆者は、バス停がなくなったあと自転車を買った。', answer: false, why: '第1段落 fully intending to buy a bike … I never did。' },
      { statement: '筆者はバスに乗っていたころ、会社に着くまでにニュースで疲れていた。', answer: true, why: '第2段落 I would arrive at the office already worn out by the news。' },
      { statement: '筆者は、歩くのはいつも楽しいと述べている。', answer: false, why: '第3段落 I am not going to pretend that walking is always pleasant。' },
    ],
    qa: [
      { q: 'What does the writer mainly do while walking to work?', choices: ['Notice small things along the way.', 'Read the news on a phone.', 'Water roses in the morning.', 'Ride a bike part of the way.'], answer: 0, why: '第2段落 On foot, there is not much to do except notice things。' },
    ],
  },
  {
    id: 'adv-food-waste',
    title: 'Where Does Our Leftover Food Go?',
    level: '難関大（評論）',
    paragraphs: [
      "Every day, large amounts of food that is still safe to eat are thrown away. Supermarkets remove bread and rice balls from their shelves when the 'best before' date gets close, restaurants throw out what customers leave on their plates, and families forget about vegetables ( A ) at the back of the refrigerator.",
      "Food waste is a problem for several reasons. First, it wastes money. Second, the water, energy, and labor used to grow and transport the food are wasted too. Third, food that is buried in the ground produces gases that contribute to global warming.",
      "Some companies have started to take action. One convenience store chain now sells items that are close to their date at lower prices, and a few restaurants let customers take home what they cannot finish. There are also smartphone apps that tell users ( B ) nearby shops have extra food to sell cheaply at the end of the day.",
      "However, businesses cannot solve the problem alone. Each of us can help by buying only what we need, checking the refrigerator before shopping, and ( C ) that 'best before' does not mean 'dangerous after.' Small changes at home, repeated by millions of people, can make a real difference.",
    ],
    ja: [
      '毎日、まだ安全に食べられる大量の食べ物が捨てられている。スーパーは「賞味期限」が近づくとパンやおにぎりを棚から下げ、レストランは客が皿に残したものを捨て、家庭では冷蔵庫の奥に残った野菜のことを忘れてしまう。',
      '食品ロスはいくつかの理由で問題である。第一に、お金のむだになる。第二に、食べ物を育て運ぶのに使われた水やエネルギーや労働もむだになる。第三に、地面にうめられた食べ物は、地球温暖化の原因となるガスを出す。',
      '行動を始めた企業もある。あるコンビニのチェーンは、期限の近い商品を安い値段で売るようになり、食べきれなかったものを客が持ち帰れるようにしているレストランもいくつかある。また、近くの店が1日の終わりに安く売れる余った食べ物をもっているかどうかを、利用者に知らせてくれるスマホのアプリもある。',
      'しかし、企業だけでこの問題を解決することはできない。私たち一人ひとりが、必要なものだけを買い、買い物の前に冷蔵庫を確かめ、「賞味期限」が「過ぎたら危険」という意味ではないことを覚えておくことで、手助けできる。何百万人もの人がくり返す家庭での小さな変化が、本当のちがいを生むことができるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['left', 'leaving', 'leave', 'leaves'], answer: 0, why: 'vegetables を後ろから説明する過去分詞 left（冷蔵庫の奥に残された野菜）。野菜は「残される」側なので過去分詞。leave・leaves は動詞で、forget about のあとに文は続かない。' },
      { id: 'B', choices: ['whether', 'what', 'unless', 'that if'], answer: 0, why: 'tell 人 whether ～ で「～かどうかを人に知らせる」。うしろが完全な文なので what は入らず、unless は tell の目的語になれず、that if の形はない。' },
      { id: 'C', choices: ['remembering', 'remember', 'remembered', 'to remembering'], answer: 0, why: 'by buying …, checking …, and remembering … と、前置詞 by のあとの動名詞を3つ並べている。' },
    ],
    tf: [
      { statement: '筆者によれば、うめられた食べ物は地球温暖化の原因となるガスを出す。', answer: true, why: '第2段落 food that is buried in the ground produces gases that contribute to global warming。' },
      { statement: 'あるコンビニのチェーンは、期限の近い商品を無料で配っている。', answer: false, why: '第3段落 sells items that are close to their date at lower prices（安く売っている）。' },
      { statement: '筆者は、食品ロスは企業だけで解決できると考えている。', answer: false, why: '第4段落 businesses cannot solve the problem alone。' },
    ],
    qa: [
      { q: 'What does the writer suggest individuals do?', choices: ['Buy only what they need and check the refrigerator before shopping.', 'Stop eating at restaurants.', 'Throw away food after the "best before" date.', 'Use apps to order more food.'], answer: 0, why: '第4段落 buying only what we need, checking the refrigerator before shopping。' },
    ],
  },
  {
    id: 'adv-four-day-week',
    title: 'Should We Work Four Days a Week?',
    level: '難関大（評論）',
    paragraphs: [
      "In recent years, a number of companies around the world have tried a four-day working week. Employees work four days instead of five but ( A ) the same salary. The results of these trials have been discussed widely, and opinions are divided.",
      "Supporters say that the change makes workers happier and healthier. With an extra day off, people have more time for their families, hobbies, and rest. Several companies reported that their employees took fewer sick days and that the amount of work they finished did not go down. Some workers said they had learned to waste less time in long meetings.",
      "Critics, however, point out that a four-day week does not suit every job. Hospitals, schools, and stores need people to be there every day, so it is difficult for them to give all their staff an extra day off. Others worry that people will simply try to fit five days of work into four, ( B ) could make them more stressed, not less.",
      "Perhaps the most important lesson from these trials is not the number of days itself. It is that the way we work can be changed, and that companies should think carefully about ( C ) their employees really need in order to do their best.",
    ],
    ja: [
      '近年、世界中のいくつもの会社が週4日勤務を試してきた。社員は5日ではなく4日働くが、同じ給料を受け取る。こうした試みの結果は広く議論されており、意見は分かれている。',
      '支持する人々は、この変化によって働く人はより幸せで健康になると言う。休みが1日増えれば、家族や趣味や休息にあてる時間が増える。いくつかの会社は、社員が病気で休む日が減り、仕上げる仕事の量も減らなかったと報告した。長い会議で時間をむだにしないことを学んだと言う社員もいた。',
      'しかし批判する人々は、週4日勤務はすべての仕事に合うわけではないと指摘する。病院や学校や店は毎日人がいる必要があるので、すべての職員に休みをもう1日与えるのはむずかしい。また、人々が5日分の仕事をただ4日につめこもうとするだけになり、そのせいでストレスが減るどころか増えるかもしれないと心配する人もいる。',
      'おそらく、これらの試みから得られるいちばん大切な教訓は、日数そのものではない。それは、働き方は変えられるということ、そして会社は、社員が最善をつくすのに本当に必要なものは何かを、よく考えるべきだということである。',
    ],
    blanks: [
      { id: 'A', choices: ['receive', 'receiving', 'to receive', 'receives'], answer: 0, why: 'Employees work … but receive … と、主語 Employees（複数）に続く2つ目の動詞を but で並べている。複数の主語なので receives ではなく receive。' },
      { id: 'B', choices: ['which', 'what', 'that', 'it'], answer: 0, why: 'コンマのあとで前の内容全体（5日分の仕事を4日につめこむこと）を受ける非制限用法の which。that は非制限用法で使えず、what は先行詞をとらず、it では文をつなげない。' },
      { id: 'C', choices: ['what', 'that', 'which', 'whether'], answer: 0, why: 'need の目的語が欠けているので「～するもの」を表す what。前置詞 about のあとに that 節は置けず、which・whether のうしろは欠けたところのない文になる。' },
    ],
    tf: [
      { statement: '週4日勤務の試みでは、社員の給料は減らされた。', answer: false, why: '第1段落 receive the same salary。' },
      { statement: 'いくつかの会社では、社員が病気で休む日が減った。', answer: true, why: '第2段落 their employees took fewer sick days。' },
      { statement: '筆者によれば、いちばん大切な教訓は働く日数そのものである。', answer: false, why: '第4段落 the most important lesson … is not the number of days itself。' },
    ],
    qa: [
      { q: 'Why is a four-day week difficult for hospitals and stores?', choices: ['They need people to be there every day.', 'Their workers do not want an extra day off.', 'They have too many long meetings.', 'Their salaries are too low.'], answer: 0, why: '第3段落 Hospitals, schools, and stores need people to be there every day。' },
    ],
  },
  {
    id: 'adv-esports-club',
    title: 'Is Esports a Real Club Activity?',
    level: '難関大（評論）',
    paragraphs: [
      "More and more high schools have started esports clubs, where students compete against other schools in video games. When a school near my town announced that it would open one, many parents ( A ) surprised. Some asked whether playing games could really be called a club activity.",
      "Teachers who support the clubs say that esports teaches many of the same things as traditional sports. Members must practice regularly, study their opponents, and above all work as a team. In a match, a player who ignores teammates usually loses, no matter how skillful he or she is. Some students who had never joined any club before have found a place where they feel they belong.",
      "On the other hand, there are real concerns. Sitting in front of a screen for long hours is not good for the eyes or the body, and some students may find it hard to stop ( B ) once they start. For this reason, many clubs set strict rules about practice time and include stretching or light exercise in their schedule.",
      "Whether esports should be treated in the same way as baseball or soccer is still debated. What seems clear, however, is that the answer depends less on the game itself ( C ) on how the club is run.",
    ],
    ja: [
      'ビデオゲームでほかの学校と競いあうeスポーツ部を始める高校がますます増えている。私の町の近くの学校が部を作ると発表したとき、多くの保護者はおどろいた。ゲームをすることが本当に部活動とよべるのかとたずねる人もいた。',
      'この部を支持する先生たちは、eスポーツは従来のスポーツと同じことを多く教えてくれると言う。部員は定期的に練習し、相手を研究し、そして何よりもチームとして動かなければならない。試合では、仲間を無視する選手は、どんなにうまくても、たいてい負ける。それまでどの部にも入ったことのなかった生徒の中には、自分の居場所だと感じられる場所を見つけた人もいる。',
      'その一方で、本当の心配もある。長い時間画面の前に座っているのは目にも体にもよくないし、一度始めるとやめるのがむずかしいと感じる生徒もいるかもしれない。このため、多くの部は練習時間について厳しいルールを決め、予定にストレッチや軽い運動を入れている。',
      'eスポーツを野球やサッカーと同じようにあつかうべきかどうかは、いまも議論されている。しかし、はっきりしていると思われるのは、その答えはゲームそのものよりも、部がどのように運営されるかによるということである。',
    ],
    blanks: [
      { id: 'A', choices: ['were', 'was', 'did', 'being'], answer: 0, why: 'be surprised で「おどろく」。主語 many parents は複数で過去の話なので were。was は単数の主語に使い、did のうしろは原形、being だけでは文の動詞にならない。' },
      { id: 'B', choices: ['playing', 'play', 'played', 'plays'], answer: 0, why: 'stop ～ing で「～するのをやめる」。stop のあとに原形・過去分詞・3人称単数の形は続かない。' },
      { id: 'C', choices: ['than', 'as', 'that', 'then'], answer: 0, why: 'less A than B で「A よりも B による」。比較級 less と組み合わせるのは than。' },
    ],
    tf: [
      { statement: '筆者の町の近くの学校がeスポーツ部を作ると、多くの保護者がおどろいた。', answer: true, why: '第1段落 many parents were surprised。' },
      { statement: '筆者によれば、試合では仲間を無視しても、うまい選手なら勝てる。', answer: false, why: '第2段落 a player who ignores teammates usually loses, no matter how skillful he or she is。' },
      { statement: '多くの部は、練習時間について厳しいルールを決めている。', answer: true, why: '第3段落 many clubs set strict rules about practice time。' },
    ],
    qa: [
      { q: 'According to supporters, what does esports teach?', choices: ['Regular practice and teamwork.', 'How to sit for long hours.', 'How to beat other schools without practice.', 'How to become a professional player quickly.'], answer: 0, why: '第2段落 Members must practice regularly … and above all work as a team。' },
    ],
  },
  {
    id: 'toeic-fitness-ad',
    title: 'Notice: Grand Opening of Peak Fitness',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "Peak Fitness is proud to announce the grand opening of our newest location on Maple Avenue, just two blocks from City Hall. The center will open on Monday, September 2, and will be open from 6:00 a.m. to 11:00 p.m. every day of the week.",
      "Our new facility features modern exercise machines, a 25-meter indoor pool, and three studios for yoga and dance classes. Free parking is available for members in the building's underground garage.",
      "To celebrate the opening, we are offering a special discount. Anyone who signs up ( A ) the end of September will pay no joining fee and will receive 30 percent off the monthly price for the first three months. Members who bring a friend ( B ) also joins will get one additional month free.",
      "Personal trainers are available to help you create an exercise plan that suits your goals. The first session is free for all new members; additional sessions can be booked at the front desk or through our app.",
      "Space in our group classes is limited, so we recommend ( C ) early. For more information, visit our website or call 555-0147.",
    ],
    ja: [
      'ピーク・フィットネスは、市役所から2ブロックのメープル通りに、最新の店舗をグランドオープンすることをお知らせいたします。センターは9月2日（月）に開業し、毎日午前6時から午後11時まで営業します。',
      '新しい施設には、最新の運動マシン、25メートルの屋内プール、ヨガやダンスのクラス用のスタジオが3つあります。会員はビルの地下駐車場を無料で利用できます。',
      '開業を記念して、特別割引を行っています。9月末までに入会した方は入会金が無料になり、最初の3か月は月会費が30パーセント引きになります。いっしょに入会する友だちを連れてきた会員は、さらに1か月無料になります。',
      '目標に合った運動の計画を作るお手伝いをするパーソナルトレーナーもいます。初回のセッションは新しい会員全員が無料です。2回目以降のセッションは、受付かアプリで予約できます。',
      'グループクラスの定員にはかぎりがあるので、早めの予約をおすすめします。くわしくはウェブサイトをご覧いただくか、555-0147 までお電話ください。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'until', 'since', 'during'], answer: 0, why: '「9月末までに（入会する）」としめ切りを表すのは by。until は「～までずっと」で1回の入会には使わない。' },
      { id: 'B', choices: ['who', 'whom', 'whose', 'which'], answer: 0, why: '先行詞 a friend（人）を説明し、also joins の主語になる関係代名詞 who。whom は目的語、whose のうしろには名詞が必要、which は物に使う。' },
      { id: 'C', choices: ['registering', 'to register', 'register', 'registered'], answer: 0, why: 'recommend は（人を入れないとき）動名詞を目的語にとる。recommend registering で「登録することをすすめる」。' },
    ],
    tf: [
      { statement: '新しいセンターは毎日営業する。', answer: true, why: '第1段落 open from 6:00 a.m. to 11:00 p.m. every day of the week。' },
      { statement: '9月末までに入会すると、最初の3か月は月会費が無料になる。', answer: false, why: '第3段落 will receive 30 percent off the monthly price for the first three months（30パーセント引き）。' },
      { statement: 'パーソナルトレーナーの初回のセッションは、新しい会員なら無料である。', answer: true, why: '第4段落 The first session is free for all new members。' },
    ],
    qa: [
      { q: 'What will members get if they bring a friend who also joins?', choices: ['One additional month free.', 'A free parking space.', 'A free personal training session.', 'No joining fee.'], answer: 0, why: '第3段落 Members who bring a friend who also joins will get one additional month free。' },
    ],
  },
  {
    id: 'adv-left-handed',
    title: 'Living in a Right-Handed World',
    level: '難関大（評論）',
    paragraphs: [
      "About one in ten people around the world is left-handed, a proportion that seems to have stayed roughly the same for thousands of years. Researchers have found evidence of this even in ancient tools, ( A ) show wear patterns that suggest they were held in the left hand.",
      "Despite being a natural variation, left-handedness was once treated as something to be corrected. In many countries, children who wrote with their left hand were forced to switch, sometimes by having their left hand tied behind their back. Today we know that forcing a child to change hands brings no benefit and may even cause stress.",
      "Still, left-handed people face small difficulties every day. Scissors, can openers, and many kitchen tools are designed for right-handed users. Writing from left to right can cause a left-handed person's hand to rub against the ink, ( B ) smudges the words. Even the location of the buttons on a camera can be inconvenient.",
      "Interestingly, being left-handed can be an advantage in some sports. In tennis, baseball, and fencing, left-handed players are found at the top level more often than their share of the population would suggest. One explanation is that opponents are simply less used to ( C ) against them, so their moves are harder to predict.",
      "As more products are designed with both groups in mind, life in a right-handed world is slowly becoming easier for the left-handed minority.",
    ],
    ja: [
      '世界中のおよそ10人に1人は左ききであり、その割合は何千年もほぼ変わっていないようだ。研究者は古代の道具の中にもその証拠を見つけている。それらの道具には、左手で持たれていたことを示すすりへり方が見られるのだ。',
      '左ききは自然な個人差であるにもかかわらず、かつては直すべきものとしてあつかわれていた。多くの国で、左手で字を書く子どもは右手に変えるよう強いられ、ときには左手を背中にしばられることさえあった。今日では、子どもにきき手を変えさせても何の利点もなく、むしろストレスの原因になりうることがわかっている。',
      'それでも、左ききの人は毎日小さな不便に出会う。はさみや缶切り、多くの台所の道具は右ききの人向けに作られている。左から右へ字を書くと、左ききの人の手がインクにこすれ、そのせいで字がにじむことがある。カメラのボタンの位置でさえ不便なことがある。',
      'おもしろいことに、スポーツによっては左ききが有利になることがある。テニスや野球、フェンシングでは、左ききの選手が、人口にしめる割合から考えられるよりも多くトップレベルに見られる。1つの説明は、相手が左ききの選手と対戦することに単に慣れていないので、その動きが読みにくいということである。',
      '両方の人を考えて設計される製品が増えるにつれて、右ききの世界での暮らしは、少数派である左ききの人にとって少しずつ楽になりつつある。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'that', 'where'], answer: 0, why: 'コンマのあとで ancient tools を説明し、show の主語になる非制限用法の関係代名詞 which。that は非制限用法で使えず、what は先行詞をとらず、where のうしろには主語のそろった文が必要。' },
      { id: 'B', choices: ['which', 'what', 'who', 'it'], answer: 0, why: 'コンマのあとで前の内容（手がインクにこすれること）を受ける非制限用法の which。what は先行詞をとらず、who は人に使い、it では2つの文をつなげない。' },
      { id: 'C', choices: ['playing', 'play', 'played', 'plays'], answer: 0, why: 'be used to ～ing で「～することに慣れている」。to は前置詞なので動名詞 playing。' },
    ],
    tf: [
      { statement: '左ききの人の割合は、何千年もほぼ変わっていないようだ。', answer: true, why: '第1段落 a proportion that seems to have stayed roughly the same for thousands of years。' },
      { statement: '筆者によれば、子どもにきき手を変えさせると、よい効果がある。', answer: false, why: '第2段落 forcing a child to change hands brings no benefit and may even cause stress。' },
      { statement: 'テニスでは、左ききの選手がトップレベルに比較的多く見られる。', answer: true, why: '第4段落 left-handed players are found at the top level more often than their share of the population would suggest。' },
    ],
    qa: [
      { q: 'Why might left-handed players have an advantage in some sports?', choices: ['Opponents are less used to playing against them.', 'They practice more than right-handed players.', 'Sports equipment is designed for them.', 'They are stronger than right-handed players.'], answer: 0, why: '第4段落 opponents are simply less used to playing against them, so their moves are harder to predict。' },
    ],
  },
  {
    id: 'adv-daylight-saving',
    title: 'Changing the Clocks',
    level: '難関大（評論）',
    paragraphs: [
      "Twice a year, people in many countries change their clocks. In spring they move them forward by one hour, and in autumn they move them back again. This system, known as daylight saving time, was introduced in several countries during the First World War. The idea was to make better use of natural light in the evening and ( A ) save fuel.",
      "Supporters argue that longer evenings encourage people to spend time outdoors, to shop, and to play sports after work. Some studies have also suggested that there are fewer traffic accidents when it is still light during the evening rush hour.",
      "However, the benefits are now widely questioned. Modern buildings use electricity all day, so the amount of energy saved is small, if there is any at all. More seriously, the sudden change in spring can disturb people's sleep. In the days ( B ) the clocks go forward, some researchers have reported a rise in heart problems and workplace accidents, perhaps because people are tired.",
      "For these reasons, a number of countries have stopped changing their clocks, and others are debating whether to do the same. The difficulty is deciding which time to keep permanently. Choosing summer time would mean darker mornings in winter, ( C ) choosing standard time would mean losing the long summer evenings that many people enjoy.",
      "The story of daylight saving time shows how a policy that made sense in one period can become harder to justify as society changes.",
    ],
    ja: [
      '年に2回、多くの国の人々は時計を変える。春には1時間進め、秋にはまたもどす。サマータイムとして知られるこの制度は、第一次世界大戦中にいくつかの国で導入された。夕方の自然の光をよりよく使い、燃料を節約するという考えだった。',
      '支持する人々は、夕方が長くなると、人々は仕事のあとに外で過ごしたり、買い物をしたり、スポーツをしたりするようになると主張する。夕方のラッシュアワーにまだ明るいと、交通事故が減ることを示した研究もある。',
      'しかし、その利点はいまでは広く疑われている。現代の建物は1日じゅう電気を使うので、節約されるエネルギーの量は、たとえあったとしてもわずかである。より深刻なのは、春の急な変化が人々の睡眠を乱しうることだ。時計が進められたあとの数日間に、心臓の病気や職場の事故が増えたと報告している研究者もいる。おそらく人々が疲れているからだろう。',
      'こうした理由から、時計を変えるのをやめた国もいくつかあり、同じようにするかどうか議論している国もある。むずかしいのは、どちらの時間をずっと使い続けるかを決めることだ。夏時間を選べば冬の朝が暗くなり、一方で標準時間を選べば、多くの人が楽しんでいる夏の長い夕方を失うことになる。',
      'サマータイムの歴史は、ある時代には理にかなっていた政策が、社会が変わるにつれて正当化しにくくなりうることを示している。',
    ],
    blanks: [
      { id: 'A', choices: ['so', 'such', 'too', 'very'], answer: 0, why: 'make better use … and so save fuel で「そうして燃料を節約する」。to make … and (so) save と to のあとの原形を and でつないでいる。such・too・very は動詞の前に置けない。' },
      { id: 'B', choices: ['after', 'during', 'despite', 'because of'], answer: 0, why: 'うしろが文（the clocks go forward）なので接続詞として使える after「時計が進められたあとの数日間に」。during・despite・because of は前置詞の働きで、うしろに文を続けられない。' },
      { id: 'C', choices: ['while', 'despite', 'instead of', 'in spite of'], answer: 0, why: '「～である一方で」と対比する接続詞 while。うしろが文（choosing standard time would mean …）なので、前置詞の despite・instead of・in spite of は入らない。' },
    ],
    tf: [
      { statement: 'サマータイムは第一次世界大戦中にいくつかの国で導入された。', answer: true, why: '第1段落 was introduced in several countries during the First World War。' },
      { statement: '筆者によれば、現代ではサマータイムで大量のエネルギーが節約される。', answer: false, why: '第3段落 the amount of energy saved is small, if there is any at all。' },
      { statement: '夏時間を一年じゅう使うと、冬の朝が暗くなる。', answer: true, why: '第4段落 Choosing summer time would mean darker mornings in winter。' },
    ],
    qa: [
      { q: 'Why might heart problems and accidents increase after the clocks go forward?', choices: ['Because people may be tired from disturbed sleep.', 'Because buildings use more electricity.', 'Because evenings become darker.', 'Because people play more sports.'], answer: 0, why: '第3段落 the sudden change in spring can disturb people\'s sleep … perhaps because people are tired。' },
    ],
  },
  {
    id: 'adv-overconfidence',
    title: 'Knowing What We Do Not Know',
    level: '難関大（評論）',
    paragraphs: [
      "Most of us believe that we are better than average at many things, from driving a car to judging other people's character. Of course, this cannot be true for everyone. ( A ) is more surprising is that, according to a well-known line of research, the people who perform worst on a task are often the ones who overestimate their ability the most.",
      "The explanation offered by the researchers is simple but uncomfortable. The skills that are needed to do something well are often the same skills that are needed to recognize what doing it well looks like. A person who does not understand the rules of grammar, for example, may not notice the mistakes in his or her own writing, and therefore has no reason to doubt it. In other words, a lack of knowledge can hide ( B ).",
      "Later studies have shown that the effect is not as large as early reports suggested, and that experts, too, can misjudge themselves, often by underestimating how difficult a task is for others. Nevertheless, the basic point remains useful. Confidence is not a reliable sign of competence, either in ourselves or in the people we choose to listen to.",
      "What, then, can we do? One practical answer is to seek feedback regularly and to treat it as information rather than as a personal attack. Another is to cultivate the habit of asking, 'How would I know ( C ) I were wrong?' Learning to live with this question may be one of the most valuable results of a good education.",
    ],
    ja: [
      '私たちのほとんどは、車の運転から他人の性格を見ぬくことまで、多くのことで自分は平均より上だと信じている。もちろん、これが全員にあてはまるはずはない。もっとおどろくべきなのは、よく知られた一連の研究によれば、ある課題でもっとも成績の悪い人々が、しばしば自分の能力をもっとも過大評価する人々だということである。',
      '研究者たちが示す説明は、単純だが居心地の悪いものである。何かをうまくやるのに必要な技能は、うまくやるとはどういうことかを見分けるのに必要な技能と同じであることが多い。たとえば文法の規則を理解していない人は、自分の書いた文の誤りに気づかないかもしれず、それゆえそれを疑う理由がない。言いかえれば、知識の不足はそれ自体を隠してしまうことがあるのだ。',
      'その後の研究では、この効果は初期の報告が示したほど大きくはないこと、そして専門家もまた、多くの場合ある課題がほかの人にとってどれほどむずかしいかを低く見積もることで、自分を見誤りうることがわかっている。それでも、基本的な論点は役に立つ。自信は、自分自身においても、私たちが耳をかたむけるとえらぶ人々においても、能力の信頼できるしるしではないのである。',
      'では、私たちに何ができるのか。1つの実際的な答えは、定期的に意見を求め、それを個人への攻撃ではなく情報としてあつかうことだ。もう1つは、「もし自分がまちがっていたら、どうすればそれがわかるだろうか」と問う習慣を身につけることである。この問いとともに生きることを学ぶのは、よい教育がもたらすもっとも価値ある成果の1つなのかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['What', 'That', 'Which', 'It'], answer: 0, why: '「もっとおどろくべきこと」と主語のかたまりを作る関係代名詞 What（What is more surprising is that …）。That・Which は先行詞が必要で、It では is が2つ並んでしまう。' },
      { id: 'B', choices: ['itself', 'its', "it's", 'itselves'], answer: 0, why: '主語 a lack of knowledge 自身を目的語にするので再帰代名詞 itself「知識の不足はそれ自体を隠す」。its は所有格で目的語になれず、it\'s は it is の短縮形、itselves という形はない。' },
      { id: 'C', choices: ['if', 'that', 'what', 'whom'], answer: 0, why: 'How would I know if I were wrong? で「もし自分がまちがっていたら、どうしてそれがわかるだろうか」。仮定法の if。that のうしろに仮定法の were は使えず、what・whom のうしろには欠けた部分のある文が必要。' },
    ],
    tf: [
      { statement: '一連の研究によれば、成績のもっとも悪い人が能力をもっとも過大評価することが多い。', answer: true, why: '第1段落 the people who perform worst … overestimate their ability the most。' },
      { statement: 'その後の研究では、この効果は初期の報告よりも大きいことがわかった。', answer: false, why: '第3段落 the effect is not as large as early reports suggested。' },
      { statement: '筆者によれば、自信は能力の信頼できるしるしである。', answer: false, why: '第3段落 Confidence is not a reliable sign of competence。' },
    ],
    qa: [
      { q: 'According to the passage, why might a person with poor grammar not doubt his or her writing?', choices: ['He or she cannot notice the mistakes in it.', 'He or she has already received feedback.', 'He or she is an expert writer.', 'He or she writes very slowly.'], answer: 0, why: '第2段落 may not notice the mistakes in his or her own writing, and therefore has no reason to doubt it。' },
    ],
  },
  {
    id: 'adv-second-hand',
    title: 'The New Popularity of Second-Hand Goods',
    level: '難関大（評論）',
    paragraphs: [
      "Not long ago, many people felt a little embarrassed about buying used clothes or furniture. Today, however, second-hand shopping has become popular, especially among young people. Smartphone apps make it easy to sell things you no longer need and ( A ) items that other people have used.",
      "There are several reasons for this change. The most obvious one is price: a used jacket or bicycle often costs less than half of what a new one would. Another reason is the environment. Making new products uses large amounts of water and energy, so giving an item a second life helps reduce waste. Some young people also say they enjoy finding unique things ( B ) cannot be bought in ordinary stores.",
      "Of course, second-hand shopping has its problems. Buyers cannot always check the condition of an item before paying, and sometimes the product that arrives is different from the one in the photo. To avoid trouble, it is wise to read the seller's reviews carefully and to ask questions before ( C ) a decision.",
      "Still, the trend seems likely to continue. As people become more aware of the cost of throwing things away, buying second-hand may soon be seen not as something to hide but as a smart choice.",
    ],
    ja: [
      '少し前まで、多くの人は古着や中古の家具を買うことを少しはずかしく感じていた。しかし今日では、中古品の買い物は、とくに若い人々のあいだで人気になっている。スマホのアプリを使えば、もういらなくなった物を売ったり、ほかの人が使った品物を買ったりするのがかんたんにできる。',
      'この変化にはいくつかの理由がある。もっとも明らかなのは値段だ。中古のジャケットや自転車は、新品の半分以下の値段であることが多い。もう1つの理由は環境である。新しい製品を作るには大量の水やエネルギーが使われるので、品物に2度目の命を与えることはごみを減らす助けになる。ふつうの店では買えない、ほかにない物を見つけるのが楽しいと言う若い人もいる。',
      'もちろん、中古品の買い物には問題もある。買う人は支払う前に品物の状態をいつも確かめられるわけではなく、届いた品物が写真のものとちがうこともある。トラブルをさけるには、売り手の評価をよく読み、決める前に質問するのが賢明だ。',
      'それでも、この流れは続きそうだ。物を捨てることのコストに人々がより気づくようになるにつれて、中古品を買うことは、隠すべきことではなく賢い選択だと、まもなく見なされるようになるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['to buy', 'buying', 'bought', 'buys'], answer: 0, why: 'make it easy to sell … and to buy … と、形式目的語 it の中身になる to 不定詞を and で2つ並べている。' },
      { id: 'B', choices: ['that', 'what', 'who', 'where'], answer: 0, why: '先行詞 unique things（物）を説明し、cannot be bought の主語になる関係代名詞 that。what は先行詞をとらず、who は人に使い、where のうしろには主語のそろった文が必要。' },
      { id: 'C', choices: ['making', 'make', 'made', 'to make'], answer: 0, why: '前置詞 before のあとは動名詞 making。make a decision で「決める」。' },
    ],
    tf: [
      { statement: '少し前まで、中古品を買うのを少しはずかしく感じる人が多かった。', answer: true, why: '第1段落 many people felt a little embarrassed about buying used clothes or furniture。' },
      { statement: '筆者によれば、中古品の買い物にはまったく問題がない。', answer: false, why: '第3段落 second-hand shopping has its problems。' },
      { statement: '筆者は、中古品の人気は続きそうだと考えている。', answer: true, why: '第4段落 the trend seems likely to continue。' },
    ],
    qa: [
      { q: 'What does the writer recommend to avoid trouble when buying second-hand goods?', choices: ["Read the seller's reviews and ask questions first.", 'Buy only items that are new.', 'Pay before checking the photo.', 'Shop only in ordinary stores.'], answer: 0, why: "第3段落 read the seller's reviews carefully and to ask questions before making a decision。" },
    ],
  },
  {
    id: 'toeic-invoice-email',
    title: 'An Email About an Invoice Error',
    level: '難関大（メール文）',
    paragraphs: [
      "Dear Ms. Patel, Thank you for your recent order of office chairs from Brightline Furniture. I am writing to let you know about an error on the invoice ( A ) we sent you on October 3.",
      "Our records show that you ordered twelve chairs, but the invoice charged you for fifteen. This mistake was caused by a problem with our new billing system, which has since been fixed. We sincerely apologize for any confusion this may have caused.",
      "A corrected invoice is attached to this email. The total amount has been reduced from $2,250 to $1,800. If you have already paid the original amount, the difference of $450 will be returned to your account ( B ) five business days. You do not need to take any action.",
      "As a way of thanking you for your patience, we would like to offer you a 10 percent discount on your next order. Simply enter the code THANKS10 when you order through our website before the end of the year.",
      "If you have any questions about the corrected invoice, please feel free to contact me directly at 555-0182. We value your business and look forward to ( C ) you again. Best regards, Daniel Wright, Customer Accounts Manager",
    ],
    ja: [
      'パテル様　先日はブライトライン家具にオフィス用のいすをご注文いただき、ありがとうございました。10月3日にお送りした請求書の誤りについてお知らせするため、ご連絡しております。',
      '当社の記録では、いすを12脚ご注文いただいていますが、請求書では15脚分が請求されていました。この誤りは当社の新しい請求システムの問題によるもので、その後修正されております。ご迷惑をおかけしたことを心よりおわびいたします。',
      '訂正した請求書をこのメールに添付しております。合計金額は2,250ドルから1,800ドルに減額されました。すでにもとの金額をお支払いいただいている場合は、差額の450ドルを5営業日以内に口座へお返しいたします。お客様のほうで何かしていただく必要はございません。',
      'お待たせしたことへの感謝のしるしとして、次回のご注文を10パーセント割引させていただきます。年末までに当社のウェブサイトからご注文の際、コード THANKS10 を入力してください。',
      '訂正した請求書についてご質問があれば、555-0182 まで私に直接お気軽にご連絡ください。お取引に感謝するとともに、またお役に立てることを楽しみにしております。顧客経理担当マネージャー　ダニエル・ライト',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'whose', 'who'], answer: 0, why: '先行詞 the invoice（物）を説明し、sent の目的語になる関係代名詞 that。what は先行詞をとらず、whose のうしろには名詞が必要、who は人に使う。' },
      { id: 'B', choices: ['within', 'until', 'since', 'by the time'], answer: 0, why: 'within ＋期間 で「～以内に」。until は「～までずっと」、since は起点、by the time のうしろには文が必要。' },
      { id: 'C', choices: ['serving', 'serve', 'served', 'to serve'], answer: 0, why: 'look forward to の to は前置詞なので動名詞 serving。serve 人 で「人のお役に立つ・人に応対する」。' },
    ],
    tf: [
      { statement: 'パテルさんは、いすを15脚注文した。', answer: false, why: '第2段落 you ordered twelve chairs, but the invoice charged you for fifteen。' },
      { statement: '請求書の誤りは、新しい請求システムの問題が原因だった。', answer: true, why: '第2段落 This mistake was caused by a problem with our new billing system。' },
      { statement: 'すでに支払っている場合、パテルさんは差額の返金を申しこまなければならない。', answer: false, why: '第3段落 You do not need to take any action。' },
    ],
    qa: [
      { q: 'What is offered to Ms. Patel as a thank-you?', choices: ['A 10 percent discount on her next order.', 'Three free chairs.', 'A refund of $2,250.', 'Free delivery for a year.'], answer: 0, why: '第4段落 we would like to offer you a 10 percent discount on your next order。' },
    ],
  },
  {
    id: 'toeic-survey-notice',
    title: 'Notice: Customer Survey at Harbor Hotel',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "Dear Guests, Thank you for choosing Harbor Hotel. We are always looking for ways to make your stay more comfortable, and we would greatly appreciate your opinions about our services.",
      "Before you check out, please take a few minutes to complete the short survey ( A ) in your room. It asks about the cleanliness of your room, the quality of our breakfast, and the helpfulness of our staff. You may also complete the survey online by scanning the code on the back of your room key.",
      "All guests who complete the survey will receive a voucher for a free drink at our rooftop café. In addition, one guest will be chosen at random each month to win a free two-night stay. Winners will be contacted by email, so please make sure that the address you provide ( B ) correct.",
      "Your answers will be used only to improve our services and will not be shared with any other companies. If you prefer not to give your name, you may leave that part blank.",
      "Completed paper surveys can be left at the front desk or placed in the box ( C ) to the elevators on the first floor. We hope you have enjoyed your stay, and we look forward to welcoming you again soon. The Management",
    ],
    ja: [
      'お客様各位　ハーバー・ホテルをお選びいただき、ありがとうございます。私どもはつねに、皆様のご滞在をより快適にする方法を探しており、当ホテルのサービスについてご意見をいただければ大変ありがたく存じます。',
      'チェックアウトの前に、お部屋に置いてある短いアンケートに数分でお答えください。お部屋の清潔さ、朝食の質、スタッフの対応についてうかがうものです。ルームキーの裏のコードを読みとって、オンラインでお答えいただくこともできます。',
      'アンケートにお答えいただいたお客様全員に、屋上カフェのドリンク1杯無料券を差し上げます。さらに、毎月お1人を抽選で選び、2泊の無料宿泊をプレゼントします。当選者にはメールでご連絡しますので、ご記入のアドレスが正しいことをお確かめください。',
      'ご回答はサービスの改善にのみ使わせていただき、ほかの会社と共有することはありません。お名前を書きたくない場合は、その欄を空けておいてかまいません。',
      '記入したアンケート用紙は、フロントにお渡しいただくか、1階のエレベーターのとなりにある箱に入れてください。ご滞在をお楽しみいただけたことを願うとともに、またのお越しを心よりお待ちしております。支配人',
    ],
    blanks: [
      { id: 'A', choices: ['provided', 'providing', 'provides', 'to providing'], answer: 0, why: 'the short survey を後ろから説明する過去分詞 provided（部屋に用意されたアンケート）。アンケートは「用意される」側。provides は動詞で、すでに文の動詞 complete があるので入らない。' },
      { id: 'B', choices: ['is', 'are', 'be', 'being'], answer: 0, why: 'make sure that ＋文。その文の主語 the address（単数）に対応する動詞 is。' },
      { id: 'C', choices: ['next', 'beside', 'besides', 'nearby'], answer: 0, why: 'next to ～ で「～のとなりに」。beside・besides・nearby のうしろに to は続かない。' },
    ],
    tf: [
      { statement: 'アンケートはオンラインでも答えられる。', answer: true, why: '第2段落 You may also complete the survey online by scanning the code。' },
      { statement: 'アンケートに答えた人は全員、2泊の無料宿泊がもらえる。', answer: false, why: '第3段落 one guest will be chosen at random each month to win a free two-night stay（毎月1人）。' },
      { statement: '回答はほかの会社と共有される。', answer: false, why: '第4段落 will not be shared with any other companies。' },
    ],
    qa: [
      { q: 'What will every guest who completes the survey receive?', choices: ['A voucher for a free drink.', 'A free two-night stay.', 'A discount on breakfast.', 'A new room key.'], answer: 0, why: '第3段落 All guests who complete the survey will receive a voucher for a free drink。' },
    ],
  },
  {
    id: 'adv-part-time-job',
    title: 'Should High School Students Work Part-Time?',
    level: '難関大（評論）',
    paragraphs: [
      "In many countries, it is common for high school students to have part-time jobs. They work in cafés, supermarkets, and convenience stores after school or on weekends. Some schools, however, do not allow students to work, ( A ) that it takes time away from their studies.",
      "Those who support part-time work say that it teaches lessons that are hard to learn in a classroom. Students learn how to be on time, how to speak politely to customers, and how to cooperate with adults they have never met before. Earning their own money also helps them understand ( B ) hard it is to make a living, and many become more careful about how they spend.",
      "On the other hand, working too many hours can cause problems. Students who come home late may be too tired to do their homework or may not get enough sleep. Some studies suggest that grades tend to fall when students work more than about fifteen hours a week.",
      "It seems, then, that the question is not simply whether students should work, but how much. A few hours a week may bring real benefits, ( C ) long shifts every day are likely to harm both health and learning. Students, parents, and schools should talk together to find the right balance.",
    ],
    ja: [
      '多くの国では、高校生がアルバイトをするのはふつうのことだ。彼らは放課後や週末に、カフェやスーパーやコンビニで働く。しかし、勉強の時間がうばわれると主張して、生徒が働くことを認めていない学校もある。',
      'アルバイトを支持する人々は、教室では学びにくいことを教えてくれると言う。生徒は時間を守る方法、お客さんにていねいに話す方法、そして会ったことのない大人と協力する方法を学ぶ。また、自分でお金をかせぐことは、生活費をかせぐのがどれほど大変かを理解する助けになり、多くの生徒はお金の使い方に慎重になる。',
      'その一方で、働く時間が長すぎると問題が起こりうる。帰りがおそくなる生徒は、つかれて宿題ができなかったり、十分にねむれなかったりするかもしれない。生徒が週におよそ15時間以上働くと成績が下がる傾向があることを示す研究もある。',
      'そうすると、問題は単に生徒が働くべきかどうかではなく、どれだけ働くかであるようだ。週に数時間なら本当の利点がありうるが、一方で毎日の長いシフトは健康にも学習にも害をおよぼしやすい。生徒・保護者・学校がいっしょに話しあって、ちょうどよいバランスを見つけるべきである。',
    ],
    blanks: [
      { id: 'A', choices: ['arguing', 'argue', 'argued them', 'to arguing'], answer: 0, why: '付帯状況・理由を表す分詞構文 arguing that ～（～と主張して）。主語 Some schools は「主張する」側なので現在分詞。' },
      { id: 'B', choices: ['how', 'what', 'that', 'which'], answer: 0, why: 'how ＋形容詞（hard）で「どれほど～か」。what・that・which は形容詞の前に置いてこの意味を作れない。' },
      { id: 'C', choices: ['while', 'despite', 'because of', 'instead of'], answer: 0, why: 'うしろが文（long shifts … are likely to harm …）なので、対比を表す接続詞 while「～である一方で」。ほかは前置詞の働きでうしろに文を続けられない。' },
    ],
    tf: [
      { statement: '生徒がアルバイトをするのを認めていない学校もある。', answer: true, why: '第1段落 Some schools, however, do not allow students to work。' },
      { statement: '研究によれば、週15時間以上働くと成績が上がる傾向がある。', answer: false, why: '第3段落 grades tend to fall when students work more than about fifteen hours a week。' },
      { statement: '筆者は、大切なのはどれだけ働くかだと考えている。', answer: true, why: '第4段落 the question is not simply whether students should work, but how much。' },
    ],
    qa: [
      { q: 'What does the writer suggest at the end of the passage?', choices: ['Students, parents, and schools should talk together to find a balance.', 'All students should work long shifts every day.', 'Schools should ban part-time jobs completely.', 'Students should stop doing homework.'], answer: 0, why: '第4段落 Students, parents, and schools should talk together to find the right balance。' },
    ],
  },
  {
    id: 'adv-phones-class',
    title: 'Smartphones in the Classroom',
    level: '難関大（評論）',
    paragraphs: [
      "Should students be allowed to use smartphones at school? This question has become an important issue in many countries. Some schools ask students to hand in their phones every morning, while others let them use phones freely during lessons as ( A ) as they are used for study.",
      "Those in favor of a ban point out that phones are a constant source of distraction. Even when a phone is turned off, simply having it on the desk may make it harder for students to concentrate. Teachers also worry that messages and social media during breaks can lead to bullying that is difficult for adults to notice.",
      "Others argue that banning phones is not realistic. Phones can be useful tools for looking up words, taking photos of the board, or checking the schedule for the next train home. They believe it is better to teach students ( B ) to use phones responsibly than to simply take them away.",
      "In practice, many schools are now trying a middle path. Phones must stay in bags during lessons unless the teacher gives permission, ( C ) students may use them during lunch breaks. Whichever rule a school chooses, it is important to explain the reasons clearly so that students understand and accept it.",
    ],
    ja: [
      '生徒は学校でスマホを使うことを許されるべきだろうか。この問いは多くの国で重要な問題になっている。毎朝スマホを預けるよう生徒に求める学校もあれば、勉強のために使うかぎり、授業中に自由に使わせる学校もある。',
      '禁止に賛成する人々は、スマホがたえず気を散らすもとになると指摘する。スマホの電源が切れているときでさえ、ただ机の上にあるだけで、生徒が集中しにくくなるかもしれない。先生たちはまた、休み時間のメッセージやSNSが、大人には気づきにくいいじめにつながりうることも心配している。',
      '一方で、スマホを禁止するのは現実的ではないと主張する人々もいる。スマホは、単語を調べたり、黒板の写真をとったり、帰りの電車の時刻を確かめたりするのに役立つ道具になりうる。彼らは、ただ取り上げるよりも、責任をもって使う方法を生徒に教えるほうがよいと考えている。',
      '実際には、いま多くの学校が中間の道を試している。授業中は、先生が許可しないかぎりスマホはかばんに入れておかなければならないが、一方で昼休みには使ってもよい。学校がどちらのルールを選ぶにしても、生徒が理解して受け入れられるよう、理由をはっきり説明することが大切である。',
    ],
    blanks: [
      { id: 'A', choices: ['long', 'longer', 'longest', 'length'], answer: 0, why: 'as long as ～ で「～するかぎり」。as ～ as のあいだには形容詞・副詞の原級が入るので long。比較級・最上級・名詞は入らない。' },
      { id: 'B', choices: ['how', 'what', 'that', 'which'], answer: 0, why: 'how to ～ で「～のしかた」。use の目的語 phones があるので what・which は入らず、that のうしろに to 不定詞は続かない。' },
      { id: 'C', choices: ['but', 'despite', 'because of', 'instead of'], answer: 0, why: 'うしろが文（students may use them …）なので接続詞 but。ほかは前置詞の働きでうしろに文を続けられない。' },
    ],
    tf: [
      { statement: '毎朝スマホを預けさせる学校もある。', answer: true, why: '第1段落 Some schools ask students to hand in their phones every morning。' },
      { statement: '筆者によれば、電源の切れたスマホは集中のさまたげにならない。', answer: false, why: '第2段落 Even when a phone is turned off, simply having it on the desk may make it harder for students to concentrate。' },
      { statement: '中間の道をとる学校では、昼休みにスマホを使ってもよい。', answer: true, why: '第4段落 students may use them during lunch breaks。' },
    ],
    qa: [
      { q: 'What do people who oppose a ban believe?', choices: ['It is better to teach students to use phones responsibly.', 'Phones should be used only during lessons.', 'Teachers should check students\' messages.', 'Phones are never useful at school.'], answer: 0, why: '第3段落 it is better to teach students how to use phones responsibly than to simply take them away。' },
    ],
  },
  {
    id: 'adv-deja-vu',
    title: 'The Strange Feeling of Déjà Vu',
    level: '難関大（評論）',
    paragraphs: [
      "Have you ever walked into a room for the first time and suddenly felt that you had been there before? This feeling is called déjà vu, a French expression meaning 'already seen.' Surveys suggest that about two-thirds of people experience it at least once in ( A ) lives, and it seems to be most common among young adults.",
      "For a long time, déjà vu was linked to mysterious ideas, such as memories from a past life. Scientists, however, have offered more ordinary explanations. One theory is that the brain sometimes sends a feeling of familiarity ( B ) the actual memory is not found. In other words, we feel that something is familiar without being able to say why.",
      "Researchers have even tried to create déjà vu in the laboratory. In one type of experiment, people were shown pictures of places whose layout was similar to that of places they had seen earlier but had forgotten. Many of them reported a sense of familiarity they could not explain, which suggests that a forgotten but similar experience may be the source of the feeling.",
      "Interestingly, déjà vu is usually not a sign of any problem. Some scientists think it may even show that the brain is checking its memories carefully, noticing that the feeling of familiarity does not match ( C ) it actually knows. Seen in this way, déjà vu is not a mistake but a small window into how memory works.",
    ],
    ja: [
      'はじめて部屋に入ったのに、前にもそこにいたことがあるとふいに感じたことはないだろうか。この感覚は「デジャヴ」とよばれ、「すでに見た」という意味のフランス語の表現である。調査によると、およそ3人に2人が人生で少なくとも1度はこれを経験し、若い大人にもっとも多いようだ。',
      '長いあいだ、デジャヴは前世の記憶のような神秘的な考えと結びつけられていた。しかし科学者たちは、もっとふつうの説明を示してきた。1つの説は、実際の記憶が見つからないのに、脳がときどき「なじみがある」という感覚を送ってしまうというものだ。言いかえれば、私たちは、なぜかを言えないまま何かをなじみ深いと感じるのである。',
      '研究者たちは、実験室でデジャヴを作り出そうとさえしてきた。ある種の実験では、人々は、以前見たが忘れてしまった場所と配置が似ている場所の絵を見せられた。その多くが、説明できないなじみの感覚を報告した。このことは、忘れてしまったが似ている経験がその感覚のもとかもしれないことを示している。',
      '興味深いことに、デジャヴはふつう何かの問題のしるしではない。それは脳が記憶をていねいに点検し、なじみの感覚が実際に知っていることと合わないことに気づいているしるしでさえあるかもしれない、と考える科学者もいる。このように見ると、デジャヴはまちがいではなく、記憶のしくみをのぞく小さな窓なのである。',
    ],
    blanks: [
      { id: 'A', choices: ['their', 'they', 'them', 'theirs'], answer: 0, why: '名詞 lives の前には所有格 their「（その人たちの）人生で」。' },
      { id: 'B', choices: ['even though', 'despite', 'in spite of', 'regardless of'], answer: 0, why: 'うしろが文（the actual memory is not found）なので接続詞 even though「～なのに」。ほかは前置詞の働きでうしろに文を続けられない。' },
      { id: 'C', choices: ['what', 'that', 'which', 'it'], answer: 0, why: 'match の目的語で、knows の目的語が欠けたかたまり「（脳が）実際に知っていること」を作る関係代名詞 what。that・which は先行詞が必要で、it では文がつながらない。' },
    ],
    tf: [
      { statement: '調査によれば、およそ3人に2人がデジャヴを経験する。', answer: true, why: '第1段落 about two-thirds of people experience it at least once。' },
      { statement: '科学者たちは、デジャヴは前世の記憶だと考えている。', answer: false, why: '第2段落 Scientists, however, have offered more ordinary explanations。' },
      { statement: '筆者によれば、デジャヴはふつう何かの問題のしるしである。', answer: false, why: '第4段落 déjà vu is usually not a sign of any problem。' },
    ],
    qa: [
      { q: 'What did the laboratory experiments suggest about déjà vu?', choices: ['A forgotten but similar experience may cause it.', 'It happens only to older people.', 'It is caused by memories from a past life.', 'It cannot be studied scientifically.'], answer: 0, why: '第3段落 a forgotten but similar experience may be the source of the feeling。' },
    ],
  },
  {
    id: 'adv-car-free',
    title: 'Giving the Streets Back to People',
    level: '難関大（評論）',
    paragraphs: [
      "During the twentieth century, cities around the world were redesigned with the car at their center. Wide roads were built through old neighborhoods, and large areas of land were turned into parking lots. Today, a growing number of cities are trying to reverse this trend by ( A ) some of their central streets to cars.",
      "When these plans are first announced, they often meet strong opposition. Shop owners fear that customers who usually arrive by car will stop coming, and drivers complain that traffic will simply move to other roads. Yet in many cases, the results have been surprisingly positive. After streets were closed to traffic, the number of people walking in the area increased, and many shops reported higher sales than before. Air pollution and noise also decreased, making the streets more pleasant places ( B ) time.",
      "Of course, such changes do not work everywhere. They depend on good public transport, so that people who live far from the center can still reach it easily. Delivery trucks, ambulances, and people with disabilities must also be considered.",
      "What these experiments show, however, is that the shape of a city is not fixed. The streets we take for granted were designed by people, and they can be redesigned ( C ) the needs of those who use them change.",
    ],
    ja: [
      '20世紀のあいだに、世界中の都市は車を中心にすえて作りかえられた。古い地区をつらぬいて広い道路が作られ、広大な土地が駐車場に変えられた。今日、ますます多くの都市が、中心部の通りのいくつかを車に対して閉鎖することで、この流れを逆にしようとしている。',
      'こうした計画が最初に発表されると、しばしば強い反対にあう。店の経営者は、ふだん車で来る客が来なくなることをおそれ、ドライバーは、交通がただほかの道路に移るだけだと不満を言う。しかし多くの場合、結果はおどろくほどよいものだった。通りが車に対して閉鎖されたあと、その地域を歩く人の数は増え、多くの店が以前より売り上げが増えたと報告した。大気汚染や騒音も減り、通りは時間を過ごすのにより快適な場所になった。',
      'もちろん、こうした変化はどこでもうまくいくわけではない。中心部から遠くに住む人々も簡単に行けるように、よい公共交通が必要になる。配達のトラックや救急車、そして障がいのある人々のことも考えなければならない。',
      'しかし、こうした試みが示しているのは、都市の形は固定されたものではないということだ。私たちが当たり前だと思っている通りは人によって設計されたものであり、それを使う人々の必要が変わるにつれて、設計しなおすことができるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['closing', 'close', 'closed', 'to close'], answer: 0, why: '前置詞 by のあとは動名詞 closing。by ～ing で「～することによって」。close A to cars は「A を車に対して閉鎖する」。' },
      { id: 'B', choices: ['to spend', 'spending', 'spend', 'spent'], answer: 0, why: 'places を後ろから説明する形容詞的用法の to 不定詞「時間を過ごすための場所」。原形・過去分詞・-ing ではこの意味にならない。' },
      { id: 'C', choices: ['as', 'during', 'despite', 'because of'], answer: 0, why: 'うしろが文（the needs … change）なので、「～するにつれて」を表す接続詞 as。ほかは前置詞の働きでうしろに文を続けられない。' },
    ],
    underline: {
      phrase: 'meet strong opposition',
      choices: ['face strong disagreement', 'meet strong people', 'win strong support', 'hold a strong meeting'],
      answer: 0,
      why: 'meet opposition は「反対にあう」。meet は「（困難・反対など）に出あう」の意味。',
    },
    order: {
      words: ['air', 'pollution', 'and', 'noise', 'also', 'decreased'],
      rest: '',
      answer: 'air pollution and noise also decreased',
      ja: '大気汚染や騒音も減った。',
    },
    tf: [
      { statement: '20世紀の都市は、車を中心に作りかえられた。', answer: true, why: '第1段落 cities around the world were redesigned with the car at their center。' },
      { statement: '通りを閉鎖すると、多くの店で売り上げが減った。', answer: false, why: '第2段落 many shops reported higher sales than before。' },
      { statement: '筆者によれば、車を入れない通りはよい公共交通がなくてもうまくいく。', answer: false, why: '第3段落 They depend on good public transport。' },
    ],
    qa: [
      { q: 'What is the main point of the last paragraph?', choices: ['Cities can be redesigned as people\'s needs change.', 'Cars should be banned from all cities.', 'Streets should never be changed.', 'Public transport is too expensive.'], answer: 0, why: '第4段落 the shape of a city is not fixed … they can be redesigned as the needs of those who use them change。' },
    ],
  },
  {
    id: 'adv-bilingual',
    title: 'Two Languages, One Mind',
    level: '難関大（評論）',
    paragraphs: [
      "For much of the twentieth century, many parents and teachers believed that raising a child with two languages would cause confusion. Children, it was thought, would mix the languages and fall behind their classmates in both. As a result, families who had moved to a new country were sometimes advised to speak only the new language at home, even if they could not speak it well.",
      "Research since then has largely rejected this view. Young children turn out to be remarkably good at keeping two languages apart, and while bilingual children may know fewer words in each language at first, the total number of words they know is usually similar to ( A ) of children who speak only one. Mixing words from two languages in a single sentence, once seen as a sign of confusion, is now understood as a normal and often skillful way of communicating.",
      "Some studies have gone further, claiming that switching between languages trains the brain to control attention and that bilingual people therefore perform better on certain tasks. These claims have proved more controversial. Later studies with larger groups have often failed to find the same advantage, and researchers continue to debate ( B ) the effect is real.",
      "Even if the hidden mental benefits turn out to be small, however, the practical and cultural value of speaking two languages is clear. A second language allows people to communicate with relatives, to read literature in the original, and to see the world from more than one point of view. Perhaps that is reason enough ( C ) encourage it.",
    ],
    ja: [
      '20世紀の大半のあいだ、多くの親や教師は、子どもを2つの言語で育てると混乱が起きると信じていた。子どもは2つの言語をまぜてしまい、どちらの言語でもクラスメートに遅れをとるだろうと考えられていたのである。その結果、新しい国に移り住んだ家族は、たとえ上手に話せなくても、家では新しい言語だけを話すよう勧められることがあった。',
      'その後の研究は、この考えをほぼ否定している。幼い子どもは2つの言語を区別しておくのが驚くほど得意だとわかっており、バイリンガルの子どもは最初はそれぞれの言語で知っている単語が少ないかもしれないが、知っている単語の総数は、ふつう1つの言語だけを話す子どもの総数と同じくらいである。1つの文の中で2つの言語の単語をまぜることは、かつては混乱のしるしと見られていたが、いまでは普通の、しばしば巧みな伝え方だと理解されている。',
      'さらに進んで、言語を切りかえることで脳が注意をコントロールするよう鍛えられ、そのためバイリンガルの人はある種の課題でよい成績をあげると主張する研究もある。こうした主張は、より議論をよぶものであることがわかってきた。より大きな集団を対象にしたその後の研究では、同じ利点が見つからないことが多く、研究者たちはその効果が本当にあるのかどうかをいまも議論している。',
      'しかし、たとえ目に見えない知的な利点が小さいとわかったとしても、2つの言語を話すことの実際的・文化的な価値は明らかである。第二の言語によって、人は親類と話したり、文学を原文で読んだり、世界を2つ以上の視点から見たりすることができる。おそらく、それだけでもそれを勧める十分な理由になるだろう。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'this', 'it', 'one'], answer: 0, why: 'the total number of words のくり返しをさけ、of ～ が後ろにつく代名詞 that（that of children = the total number of words of children）。this・it・one は of ～ をつけてこの意味では使えない。' },
      { id: 'B', choices: ['whether', 'that if', 'what', 'unless'], answer: 0, why: 'debate の目的語になる「～かどうか」の whether。what のうしろは欠けた文になり、that if の形はなく、unless は目的語になれない。' },
      { id: 'C', choices: ['to', 'for', 'of', 'that'], answer: 0, why: 'reason enough to ～ で「～するのに十分な理由」。うしろが動詞の原形 encourage なので to 不定詞の to。' },
    ],
    underline: {
      phrase: 'fall behind',
      choices: ['make slower progress than', 'sit behind', 'fall down in front of', 'become more popular than'],
      answer: 0,
      why: 'fall behind ～ は「～に遅れをとる」。2つの言語のどちらでもクラスメートより進み方が遅くなる、という意味。',
    },
    order: {
      words: ['turn', 'out', 'to', 'be', 'remarkably', 'good', 'at', 'keeping', 'two', 'languages', 'apart'],
      rest: '',
      answer: 'turn out to be remarkably good at keeping two languages apart',
      ja: '（幼い子どもは）2つの言語を区別しておくのがおどろくほど得意だとわかる。（turn out to be ～＝～だとわかる）',
    },
    tf: [
      { statement: 'かつては、2つの言語で子どもを育てると混乱すると信じられていた。', answer: true, why: '第1段落 many parents and teachers believed that raising a child with two languages would cause confusion。' },
      { statement: 'バイリンガルの子どもが知っている単語の総数は、ふつう1つの言語の子どもよりずっと少ない。', answer: false, why: '第2段落 the total number of words they know is usually similar。' },
      { statement: 'バイリンガルの人が注意のコントロールにすぐれるという主張は、いまも議論されている。', answer: true, why: '第3段落 researchers continue to debate whether the effect is real。' },
    ],
    qa: [
      { q: 'How is mixing two languages in one sentence understood today?', choices: ['As a normal and often skillful way of communicating.', 'As a clear sign of confusion.', 'As a reason to stop learning a second language.', 'As something only adults can do.'], answer: 0, why: '第2段落 is now understood as a normal and often skillful way of communicating。' },
    ],
  },
  {
    id: 'adv-library-change',
    title: 'Libraries in the Digital Age',
    level: '難関大（評論）',
    paragraphs: [
      "When information can be found online in seconds, some people wonder whether public libraries are still necessary. In fact, the number of books borrowed from libraries has fallen in many places over the past twenty years. Yet libraries have not disappeared. Instead, many of them are changing the way they serve their communities.",
      "One change is the kind of space a library offers. Quiet reading rooms remain, but many libraries now also have areas ( A ) people can talk, work together, or join events. Others lend not only books but also tools, musical instruments, and even fishing rods.",
      "Libraries also play an important role for people who do not have internet access at home. For them, the library is a place to apply for jobs, contact government offices, or help their children with homework. Librarians, ( B ) are trained to find reliable information, can help users tell the difference between trustworthy sources and false ones.",
      "In this sense, the purpose of a library has not changed as much as it might seem. Its goal has always been to give everyone equal access to knowledge. What is changing is simply the form that this access takes, and libraries that adapt to these changes are likely to remain ( C ) for many years to come.",
    ],
    ja: [
      '情報がネットで数秒で見つかる時代に、公共図書館はまだ必要なのだろうかと思う人もいる。実際、図書館で借りられる本の数は、多くの地域でこの20年のあいだに減っている。しかし図書館は消えてはいない。それどころか、多くの図書館は地域の人々への役立ち方を変えつつある。',
      '1つの変化は、図書館が提供する空間の種類である。静かな閲覧室は残っているが、いまでは多くの図書館に、人々が話したり、いっしょに作業したり、イベントに参加したりできる場所もある。本だけでなく、道具や楽器、さらには釣りざおまで貸し出しているところもある。',
      '図書館はまた、家でインターネットを使えない人々にとって大切な役割を果たしている。そうした人にとって、図書館は仕事に応募したり、役所に連絡したり、子どもの宿題を手伝ったりする場所である。信頼できる情報を見つける訓練を受けた司書は、利用者が信頼できる情報源とうその情報源を見分ける手助けもできる。',
      'この意味で、図書館の目的は、見かけほどには変わっていない。その目的はいつも、すべての人に知識への平等な機会を与えることだった。変わりつつあるのは、その機会がとる形だけであり、こうした変化に合わせていく図書館は、この先何年も役に立ち続けるだろう。',
    ],
    blanks: [
      { id: 'A', choices: ['where', 'which', 'what', 'whose'], answer: 0, why: '先行詞 areas（場所）を説明し、うしろが主語・動詞のそろった文（people can talk …）なので関係副詞 where。which のうしろは欠けた文、what は先行詞をとらず、whose のうしろには名詞が必要。' },
      { id: 'B', choices: ['who', 'that', 'which', 'whom'], answer: 0, why: 'コンマのあとで Librarians（人）を説明し、are trained の主語になる非制限用法の who。that は非制限用法で使えず、which は物に使い、whom は目的語。' },
      { id: 'C', choices: ['useful', 'use', 'uses', 'usefulness of'], answer: 0, why: 'remain ＋形容詞 で「～のままである」。動詞の use・uses や、うしろに名詞が必要な usefulness of はこの位置に置けない。' },
    ],
    tf: [
      { statement: '多くの地域で、図書館で借りられる本の数は減っている。', answer: true, why: '第1段落 the number of books borrowed from libraries has fallen in many places。' },
      { statement: '筆者によれば、図書館には静かな閲覧室がもうない。', answer: false, why: '第2段落 Quiet reading rooms remain。' },
      { statement: '筆者は、図書館の目的は大きく変わったと述べている。', answer: false, why: '第4段落 the purpose of a library has not changed as much as it might seem。' },
    ],
    qa: [
      { q: 'How do libraries help people who do not have internet access at home?', choices: ['They provide a place to apply for jobs and contact government offices.', 'They sell computers at low prices.', 'They lend fishing rods to everyone.', 'They close their reading rooms.'], answer: 0, why: '第3段落 the library is a place to apply for jobs, contact government offices, or help their children with homework。' },
    ],
  },
  {
    id: 'adv-emoji',
    title: 'Are Emoji a New Language?',
    level: '難関大（評論）',
    paragraphs: [
      "Every day, billions of small pictures are sent around the world in text messages: smiling faces, hearts, thumbs-up signs, and countless others. These symbols, known as emoji, were first designed in Japan in the late 1990s and have since spread to almost every country ( A ) mobile phones are used.",
      "Some people claim that emoji are becoming a new universal language. After all, a picture of a crying face seems to mean the same thing whether you live in Tokyo or Toronto. Emoji can also add feelings to a message that might otherwise sound cold. A short reply such as 'OK' can seem unfriendly, but the same reply followed by a smile feels much warmer.",
      "Linguists, however, point out that emoji lack many features of a true language. They have no grammar ( B ) would allow them to express complex ideas, such as 'If it had not rained, we would have gone to the beach.' Moreover, their meanings are not as universal as they seem. A symbol that looks friendly in one culture may be read as rude or sarcastic in another, and even people of different ages sometimes understand the same emoji differently.",
      "It may be more accurate, then, to see emoji not as a replacement for words but as a modern form of tone of voice and facial expression. In face-to-face conversation, we rely on smiles and gestures to show how we feel. In writing, where these signals are missing, emoji help to fill the gap. They do not replace language; they ( C ) it.",
    ],
    ja: [
      '毎日、何十億もの小さな絵がメッセージで世界中に送られている。笑顔、ハート、親指を立てた手、そのほか数えきれないほどの絵である。絵文字として知られるこうした記号は、1990年代の終わりに日本で最初にデザインされ、それ以来、携帯電話が使われているほとんどすべての国に広まった。',
      '絵文字は新しい世界共通語になりつつあると主張する人もいる。なんといっても、泣いている顔の絵は、東京に住んでいてもトロントに住んでいても、同じことを意味するように思える。絵文字は、そうでなければ冷たく聞こえるかもしれないメッセージに気持ちを加えることもできる。「OK」のような短い返事は無愛想に思えることがあるが、同じ返事に笑顔がつくとずっと温かく感じられる。',
      'しかし言語学者たちは、絵文字には本当の言語がもつ多くの特徴が欠けていると指摘する。絵文字には、「雨が降らなかったら、海に行っていただろう」のような複雑な考えを表せるようにする文法がない。さらに、その意味は見かけほど世界共通ではない。ある文化では親しげに見える記号が、別の文化では失礼だったり皮肉だったりすると受けとられることがあり、年齢のちがう人々が同じ絵文字を別の意味に理解することさえある。',
      'そうすると、絵文字は言葉にとってかわるものではなく、声の調子や表情の現代版と見るほうが正確かもしれない。顔をあわせた会話では、私たちは気持ちを示すのに笑顔や身ぶりにたよる。こうした合図が欠けている書き言葉では、絵文字がそのすきまをうめる助けになる。絵文字は言語にとってかわるのではなく、言語をおぎなうのである。',
    ],
    blanks: [
      { id: 'A', choices: ['where', 'which', 'what', 'whose'], answer: 0, why: '先行詞 every country（場所）を説明し、うしろが欠けたところのない文（mobile phones are used）なので関係副詞 where。which は used in のように前置詞が必要で、what は先行詞をとらず、whose のうしろには名詞が必要。' },
      { id: 'B', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 grammar を説明し、would allow の主語になる関係代名詞 that。what は先行詞をとらず、where のうしろには主語のそろった文が必要で、whose のうしろには名詞が必要。' },
      { id: 'C', choices: ['complement', 'complements', 'complementing', 'complementary'], answer: 0, why: '主語 they（複数）に続く現在形の動詞 complement「おぎなう」。complements は3人称単数、complementing は動詞だけでは使えず、complementary は形容詞。' },
    ],
    tf: [
      { statement: '絵文字は1990年代の終わりに日本で最初にデザインされた。', answer: true, why: '第1段落 were first designed in Japan in the late 1990s。' },
      { statement: '言語学者によれば、絵文字には複雑な考えを表す文法がある。', answer: false, why: '第3段落 They have no grammar that would allow them to express complex ideas。' },
      { statement: '同じ絵文字でも、文化や年齢によって受けとり方がちがうことがある。', answer: true, why: '第3段落 may be read as rude or sarcastic in another … people of different ages sometimes understand the same emoji differently。' },
    ],
    qa: [
      { q: 'According to the last paragraph, how should emoji be seen?', choices: ['As a modern form of tone of voice and facial expression.', 'As a complete replacement for words.', 'As a language with its own grammar.', 'As a sign that people no longer write well.'], answer: 0, why: '第4段落 see emoji not as a replacement for words but as a modern form of tone of voice and facial expression。' },
    ],
  },
  {
    id: 'adv-gratitude',
    title: 'The Underrated Power of Saying Thank You',
    level: '難関大（評論）',
    paragraphs: [
      "Most of us were taught as children to say 'thank you,' yet as adults we often forget to express gratitude, especially to people we see every day. We may feel thankful toward a teacher who once helped us or a friend who supported us through a hard time, but we rarely tell them so. Psychologists have recently begun to ask why this is ( A ) and what we lose as a result.",
      "In one series of studies, participants were asked to write a short letter of thanks to someone who had made a difference in their lives. Before sending it, they predicted how the receiver would feel. Most of them expected that the letter would make the person only slightly happy and that the person might even feel awkward. In reality, the receivers reported feeling far happier ( B ) the writers had imagined, and very few felt uncomfortable.",
      "Why do we underestimate the effect of our thanks? One explanation is that we focus too much on how well we express ourselves. We worry that our words will sound clumsy, while the receiver pays attention mainly to the warmth behind them.",
      "The lesson is simple. A few sincere words of thanks cost almost nothing, yet they can brighten someone's day and strengthen the relationship. If someone comes to mind as you read this, it might be worth ( C ) them a short message today.",
    ],
    ja: [
      '私たちのほとんどは子どものころ「ありがとう」と言うように教わったが、大人になると、とくに毎日会う人に対して、感謝を伝えるのを忘れがちだ。かつて助けてくれた先生や、つらい時期を支えてくれた友人に感謝の気持ちをいだいていても、それを伝えることはめったにない。心理学者たちは最近、なぜそうなるのか、そしてその結果私たちが何を失っているのかを問いはじめた。',
      'ある一連の研究で、参加者は、自分の人生に大きな影響を与えてくれた人に短い感謝の手紙を書くよう求められた。送る前に、彼らは受けとった人がどう感じるかを予想した。そのほとんどは、手紙で相手はほんの少しうれしくなるだけで、気まずく感じるかもしれないとさえ予想した。実際には、受けとった人は書いた人が想像していたよりもはるかにうれしく感じたと答え、居心地悪く感じた人はほとんどいなかった。',
      'なぜ私たちは自分の感謝の効果を低く見積もるのだろうか。1つの説明は、私たちが自分の気持ちをどれほどうまく表現できるかに気をとられすぎるということだ。私たちは自分の言葉がぎこちなく聞こえることを心配するが、受けとる側はおもに言葉のうしろにある温かさに注意を向けているのである。',
      '教訓は単純だ。心からの感謝の言葉はほとんど何も費用がかからないのに、だれかの1日を明るくし、関係を強めることができる。これを読みながらだれかの顔が思いうかんだなら、今日その人に短いメッセージを送ってみる価値があるかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['so', 'such', 'that', 'very'], answer: 0, why: 'why this is so で「なぜそうなのか」。so は前の内容を受けて補語になる。such・very は形容詞や名詞の前で使い、that だけでは補語にならない。' },
      { id: 'B', choices: ['than', 'as', 'that', 'then'], answer: 0, why: '比較級 far happier のあとで比べる相手を示すのは than。' },
      { id: 'C', choices: ['sending', 'to send', 'send', 'sent'], answer: 0, why: 'be worth ～ing で「～する価値がある」。worth のあとは動名詞。' },
    ],
    tf: [
      { statement: '研究の参加者の多くは、手紙で相手がとても喜ぶと予想した。', answer: false, why: '第2段落 Most of them expected that the letter would make the person only slightly happy。' },
      { statement: '実際には、手紙を受けとった人の多くは予想以上に喜んだ。', answer: true, why: '第2段落 the receivers reported feeling far happier than the writers had imagined。' },
      { statement: '筆者によれば、受けとる側はおもに言葉のうまさに注意を向ける。', answer: false, why: '第3段落 the receiver pays attention mainly to the warmth behind them。' },
    ],
    qa: [
      { q: 'Why do people underestimate the effect of their thanks, according to the passage?', choices: ['They focus too much on how well they express themselves.', 'They think thank-you letters are too expensive.', 'They believe receivers do not read letters.', 'They forget the names of the people who helped them.'], answer: 0, why: '第3段落 we focus too much on how well we express ourselves。' },
    ],
  },
  {
    id: 'toeic-recycling-memo',
    title: 'Notice: New Recycling Program',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "To all employees: Starting on Monday, June 1, our company will begin a new recycling program at all three of our offices. The goal of the program is to reduce the amount of waste we send to landfills by half within the next two years.",
      "Over the weekend, new recycling stations will be installed on every floor. Each station has four bins: blue for paper, yellow for plastic bottles, green for cans, and gray for general waste. Please make sure that bottles and cans are empty ( A ) you put them in the bins.",
      "In addition, we will no longer provide paper cups in the break rooms. Instead, each employee will receive a free reusable mug with the company logo. Mugs will be handed out by the General Affairs Department on May 29. Employees who are away on that day can ( B ) up their mugs at the front desk the following week.",
      "To encourage participation, the office that reduces its waste the most by the end of the year will receive a prize of $1,000 to spend on a team event. Monthly results will be shared in the company newsletter.",
      "We appreciate your cooperation. Questions about the program should be ( C ) to Ms. Garcia in General Affairs.",
    ],
    ja: [
      '全社員のみなさんへ：6月1日（月）から、当社は3つのオフィスすべてで新しいリサイクルの取り組みを始めます。この取り組みの目標は、今後2年以内に、埋め立て地に送るごみの量を半分に減らすことです。',
      '週末のあいだに、各階に新しいリサイクルステーションが設置されます。それぞれのステーションには4つの箱があります。青は紙、黄色はペットボトル、緑は缶、灰色は一般ごみです。ペットボトルと缶は、箱に入れる前に必ず空にしてください。',
      'また、休憩室での紙コップの提供をやめます。そのかわりに、社員一人ひとりに会社のロゴ入りのくり返し使えるマグカップを無料でお配りします。マグカップは5月29日に総務部から配られます。その日に不在の社員は、翌週に受付で受け取ることができます。',
      '参加をうながすため、年末までにごみをもっとも減らしたオフィスには、チームのイベントに使える1,000ドルの賞金がおくられます。毎月の結果は社内報でお知らせします。',
      'ご協力に感謝します。この取り組みについての質問は、総務部のガルシアさんにお寄せください。',
    ],
    blanks: [
      { id: 'A', choices: ['before', 'during', 'by', 'until then'], answer: 0, why: 'うしろが文（you put them in the bins）なので、接続詞として使える before「～する前に」。during・by は前置詞の働きで、until then は副詞句なので、うしろに文を続けられない。' },
      { id: 'B', choices: ['pick', 'picked', 'picking', 'to pick'], answer: 0, why: '助動詞 can のあとは動詞の原形。pick up ～ で「～を受け取る」。' },
      { id: 'C', choices: ['directed', 'directing', 'direct', 'directs'], answer: 0, why: 'should be ＋過去分詞 の受け身。direct A to B で「A を B に向ける」。質問は「向けられる」側なので directed。' },
    ],
    tf: [
      { statement: 'この取り組みは、2年以内にごみを半分に減らすことを目標にしている。', answer: true, why: '第1段落 reduce the amount of waste … by half within the next two years。' },
      { statement: '休憩室では、これからも紙コップが使える。', answer: false, why: '第3段落 we will no longer provide paper cups in the break rooms。' },
      { statement: 'ごみをもっとも減らしたオフィスには、1,000ドルの賞金がおくられる。', answer: true, why: '第4段落 will receive a prize of $1,000。' },
    ],
    qa: [
      { q: 'What should employees who are away on May 29 do?', choices: ['Pick up their mugs at the front desk the following week.', 'Buy their own paper cups.', 'Contact the newsletter editor.', 'Install a recycling station.'], answer: 0, why: '第3段落 Employees who are away on that day can pick up their mugs at the front desk the following week。' },
    ],
  },
  {
    id: 'kyodai-listening',
    title: 'The Difficult Art of Listening',
    level: '難関大（評論）',
    paragraphs: [
      "We tend to think of conversation as a matter of speaking well. Schools hold speech contests, and books on communication are filled with advice on how to express ourselves clearly. Listening, by contrast, is rarely taught, perhaps because it seems to require no skill at all. After all, as long as our ears work, we cannot help ( A ) what others say.",
      "Yet hearing and listening are not the same. Much of the time, while another person is talking, we are not really attending to their words but preparing our own reply. We wait for a pause so that we can tell a similar story about ourselves, or offer advice that nobody asked for. The speaker, sensing this, often stops before reaching what he or she most wanted to say.",
      "To listen in the true sense is to put our own concerns aside for a while and to let the other person's thoughts take shape. This is harder than it sounds, because it requires us to tolerate silence and uncertainty. A good listener does not rush to fill every gap; he or she allows the speaker time to find the right words, ( B ) they come slowly.",
      "Those who have been listened to in this way often say that they understood their own feelings better afterward. In this sense, listening is not a passive act but a quiet form of generosity, ( C ) gift lies in the attention we give rather than in the words we speak.",
    ],
    ja: [
      '私たちは会話を、上手に話すことの問題だと考えがちだ。学校ではスピーチコンテストが開かれ、コミュニケーションについての本は、自分をはっきり表現する方法についての助言であふれている。それにひきかえ、聞くことはめったに教えられない。おそらく、まったく技術がいらないように思えるからだろう。なにしろ、耳がはたらいているかぎり、私たちは他人の言うことを聞かずにはいられないのだから。',
      'しかし、耳に入ることと聞くことは同じではない。たいていの場合、相手が話しているあいだ、私たちは本当はその言葉に注意を向けておらず、自分の返事を準備している。自分についての似た話をするために、あるいはだれも求めていない助言をするために、話がとぎれるのを待っているのだ。話し手はそれを感じとり、いちばん言いたかったことに行きつく前に話すのをやめてしまうことが多い。',
      '本当の意味で聞くとは、しばらくのあいだ自分の関心をわきに置き、相手の考えが形になるのを待つことである。これは思ったよりむずかしい。沈黙や不確かさにたえることを求められるからだ。よい聞き手は、すべてのすきまを急いでうめようとはしない。たとえ言葉がゆっくりとしか出てこなくても、話し手がふさわしい言葉を見つける時間を与えるのである。',
      'このように聞いてもらった人は、そのあとで自分自身の気持ちがよくわかったとよく言う。この意味で、聞くことは受け身の行為ではなく、静かな形の思いやりであり、その贈り物は、私たちが話す言葉ではなく、私たちが向ける注意にあるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['hearing', 'hears', 'to hearing', 'heard'], answer: 0, why: 'cannot help ～ing で「～せずにはいられない」。help のあとに3人称単数の形や過去分詞は続かず、to hearing の形もない。' },
      { id: 'B', choices: ['even if', 'despite', 'in spite of', 'regardless of'], answer: 0, why: 'うしろが文（they come slowly）なので接続詞 even if「たとえ～でも」。ほかは前置詞の働きで、うしろに文を続けられない。' },
      { id: 'C', choices: ['whose', 'which', 'that', 'its'], answer: 0, why: '「その（思いやりの）贈り物は」と、うしろの名詞 gift につく所有格の関係代名詞 whose。which・that のうしろに無冠詞の gift lies … は続かず、its では2つの文をつなげない。' },
    ],
    tf: [
      { statement: '筆者によれば、聞くことは学校であまり教えられない。', answer: true, why: '第1段落 Listening, by contrast, is rarely taught。' },
      { statement: '筆者は、耳に入ることと聞くことは同じだと述べている。', answer: false, why: '第2段落 hearing and listening are not the same。' },
      { statement: 'よい聞き手は、話のすきまをすぐにうめようとする。', answer: false, why: '第3段落 A good listener does not rush to fill every gap。' },
    ],
    qa: [
      { q: 'What do we often do while another person is talking, according to the writer?', choices: ['Prepare our own reply instead of attending to their words.', 'Take notes on everything they say.', 'Stay completely silent and patient.', 'Ask them to speak more slowly.'], answer: 0, why: '第2段落 we are not really attending to their words but preparing our own reply。' },
    ],
  },
  {
    id: 'adv-minimalism',
    title: 'The Appeal of Owning Less',
    level: '難関大（評論）',
    paragraphs: [
      "In recent years, a lifestyle known as minimalism has attracted attention in many countries. Minimalists try to own only the things they truly need or love, and they give away or sell the rest. Books and videos showing nearly empty rooms have become popular, and many people say that clearing out their homes ( A ) them feel lighter and calmer.",
      "Part of the appeal is practical. Fewer possessions mean less time spent cleaning, searching for lost items, and deciding what to wear. There is also a financial benefit: people who stop buying things they do not need often find that they can save more money. But many minimalists describe the change in deeper terms. They say that by letting go of objects, they have learned to value experiences and relationships more ( B ) things.",
      "Critics, however, point out that minimalism is easier for some people than for others. Those with enough money can throw things away, knowing they can buy them again if necessary; people with less money may need to keep items just in case. Others note that the movement can turn into another form of consumption, ( C ) people buy expensive, carefully designed products in order to look minimalist.",
      "Perhaps the most useful idea behind minimalism is not the number of things we own but the question it asks: what really makes our lives better? The answer will be different for each person, and finding it may require less shopping and more thinking.",
    ],
    ja: [
      '近年、ミニマリズムとして知られる生活スタイルが多くの国で注目を集めている。ミニマリストは、本当に必要なものや大好きなものだけを持とうとし、残りは人にゆずったり売ったりする。ほとんど空っぽの部屋を見せる本や動画が人気になり、家の中を片づけると身も心も軽く落ち着いた気分になると言う人も多い。',
      'その魅力の一部は実用的なものだ。持ち物が少なければ、そうじをしたり、なくしたものを探したり、何を着るか決めたりする時間が減る。お金の面での利点もある。必要のないものを買うのをやめた人は、より多くのお金をためられることに気づくことが多い。しかし多くのミニマリストは、その変化をもっと深い言葉で語る。物を手放すことで、物よりも経験や人間関係を大切にすることを学んだと言うのである。',
      'しかし批判する人々は、ミニマリズムはある人にとってはほかの人よりも簡単だと指摘する。十分なお金のある人は、必要ならまた買えるとわかっているので物を捨てられるが、お金の少ない人は、念のために物をとっておく必要があるかもしれない。また、この運動が別の形の消費に変わりうると指摘する人もいる。その場合、人々はミニマリストらしく見せるために、高価で念入りにデザインされた製品を買うのである。',
      'おそらく、ミニマリズムのうしろにあるもっとも役に立つ考えは、持ち物の数ではなく、それが投げかける問い、つまり、何が本当に私たちの生活をよくするのか、という問いである。その答えは人によってちがい、それを見つけるには、買い物を減らして、もっと考えることが必要なのかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['makes', 'make', 'making', 'to make'], answer: 0, why: 'that 節の主語は動名詞のかたまり clearing out their homes（単数あつかい）なので makes。make 人 ＋形容詞 で「人を～にする」。' },
      { id: 'B', choices: ['than', 'as', 'then', 'that'], answer: 0, why: 'value A more than B で「B よりも A を大切にする」。比較級 more と組み合わせるのは than。' },
      { id: 'C', choices: ['in which', 'which', 'what', 'whose'], answer: 0, why: 'コンマのあとで another form of consumption を説明し、うしろが欠けたところのない文（people buy …）なので「前置詞＋関係代名詞」の in which。which・what のうしろは欠けた文になり、whose のうしろには名詞が必要。' },
    ],
    underline: {
      phrase: 'letting go of objects',
      choices: ['giving up things they own', 'throwing objects into the air', 'letting objects go to waste', 'buying new objects'],
      answer: 0,
      why: 'let go of ～ は「～を手放す」。物を手放すこと、つまり持ち物を手放すという意味。',
    },
    order: {
      words: ['fewer', 'possessions', 'mean', 'less', 'time', 'spent', 'cleaning'],
      rest: '',
      answer: 'fewer possessions mean less time spent cleaning',
      ja: '持ち物が少なければ、そうじに使う時間が減る。（time spent ～ing＝～するのに使う時間）',
    },
    tf: [
      { statement: 'ミニマリストは、本当に必要なものや大好きなものだけを持とうとする。', answer: true, why: '第1段落 Minimalists try to own only the things they truly need or love。' },
      { statement: '批判する人々によれば、ミニマリズムはだれにとっても同じように簡単だ。', answer: false, why: '第3段落 minimalism is easier for some people than for others。' },
      { statement: '筆者は、もっとも大切なのは持ち物の数だと考えている。', answer: false, why: '第4段落 the most useful idea behind minimalism is not the number of things we own but the question it asks。' },
    ],
    qa: [
      { q: 'Why might people with less money find minimalism difficult?', choices: ['They may need to keep items just in case.', 'They cannot find books about minimalism.', 'They spend too much time cleaning.', 'They prefer expensive products.'], answer: 0, why: '第3段落 people with less money may need to keep items just in case。' },
    ],
  },
  {
    id: 'adv-sleepwalking',
    title: 'Walking in Our Sleep',
    level: '難関大（評論）',
    paragraphs: [
      "Imagine waking up in the morning and being told that you walked into the kitchen in the middle of the night, opened the refrigerator, and then went back to bed, all without ( A ) anything. This is what happens to people who sleepwalk. Sleepwalking is surprisingly common in children; experts estimate that a large proportion of children do it at least once, though most grow out of it by their teenage years.",
      "Sleepwalking usually happens during the deepest stage of sleep, early in the night. In this state, part of the brain that controls movement is active, while the parts responsible for memory and judgment remain largely asleep. That is why sleepwalkers can perform fairly complex actions, such as opening doors or even getting dressed, but rarely remember anything the next day.",
      "A popular belief says that you should never wake a sleepwalker because the shock could be dangerous. In fact, waking someone is not harmful, although the person may feel confused for a few moments. Experts usually recommend gently ( B ) the sleepwalker back to bed rather than trying to wake him or her suddenly.",
      "Lack of sleep, stress, and an irregular schedule can make sleepwalking more likely. For most people, the best prevention is simple: go to bed at the same time every night and get enough rest. If sleepwalking happens often or leads to injuries, however, it is wise ( C ) a doctor.",
    ],
    ja: [
      '朝起きたら、夜中に台所まで歩いていって冷蔵庫をあけ、それからベッドにもどったと聞かされたと想像してみてほしい。しかも、そのことを何も覚えていないのだ。これが夢遊病の人に起こることである。夢遊病は子どもにおどろくほど多い。専門家は、かなりの割合の子どもが少なくとも1度はそれを経験すると見積もっているが、ほとんどは10代までにおさまる。',
      '夢遊病はふつう、夜の早い時間の、もっとも深いねむりの段階で起こる。この状態では、体の動きをつかさどる脳の部分ははたらいているが、記憶や判断を受けもつ部分はおおむねねむったままである。だから夢遊病の人は、ドアをあけたり、服を着たりといったかなり複雑な動作さえできるのに、翌日にはほとんど何も覚えていないのである。',
      '夢遊病の人を決して起こしてはいけない、そのショックは危険だから、という俗説がある。実際には、起こしても害はないが、その人はしばらくのあいだ混乱するかもしれない。専門家はふつう、急に起こそうとするよりも、そっとベッドへ連れもどすことをすすめている。',
      'ねむり不足、ストレス、不規則な生活は、夢遊病を起こりやすくすることがある。ほとんどの人にとって、いちばんの予防は簡単だ。毎晩同じ時間にねて、十分に休むことである。しかし、夢遊病がひんぱんに起こったり、けがにつながったりするなら、医者にみてもらうのが賢明だ。',
    ],
    blanks: [
      { id: 'A', choices: ['remembering', 'remember', 'remembered', 'to remember'], answer: 0, why: '前置詞 without のあとは動名詞 remembering「何も覚えずに」。' },
      { id: 'B', choices: ['guiding', 'guide', 'guided', 'guides'], answer: 0, why: 'recommend は（人を入れないとき）動名詞を目的語にとる。recommend guiding で「連れもどすことをすすめる」。gently は guiding を修飾する副詞。' },
      { id: 'C', choices: ['to see', 'seeing', 'see', 'seen'], answer: 0, why: 'it is wise to 原形 で「～するのが賢明だ」（it は形式主語）。see a doctor で「医者にみてもらう」。' },
    ],
    tf: [
      { statement: '夢遊病はふつう、夜の遅い時間の浅いねむりのときに起こる。', answer: false, why: '第2段落 usually happens during the deepest stage of sleep, early in the night。' },
      { statement: '夢遊病の人は、翌日にはほとんど何も覚えていない。', answer: true, why: '第2段落 rarely remember anything the next day。' },
      { statement: '筆者によれば、夢遊病の人を起こすと危険である。', answer: false, why: '第3段落 In fact, waking someone is not harmful。' },
    ],
    qa: [
      { q: 'What do experts usually recommend doing when someone is sleepwalking?', choices: ['Gently guide the person back to bed.', 'Wake the person up with a loud noise.', 'Lock the person in the bedroom.', 'Give the person something to eat.'], answer: 0, why: '第3段落 Experts usually recommend gently guiding the sleepwalker back to bed。' },
    ],
  },
  {
    id: 'adv-marshmallow',
    title: 'What the Marshmallow Test Really Tells Us',
    level: '難関大（評論）',
    paragraphs: [
      "In a famous series of experiments begun in the 1960s, young children were offered a choice. They could eat one marshmallow right away, or, if they waited alone in a room for several minutes, they would receive two. Years later, the researchers followed up with some of the children and found that those who had waited longer tended to do better at school. The result was widely reported as proof ( A ) self-control in early childhood predicts success in life.",
      "The story was attractive because it seemed to offer a simple lesson: teach children to wait, and they will succeed. Later research, however, has made the picture more complicated. When a larger and more varied group of children was studied, the link between waiting and later achievement became much weaker once factors such as family income and the home environment were taken into account.",
      "This suggests that a child's decision to wait may depend not only on inner willpower but also on experience. A child who has learned that adults keep their promises has good reason to wait for the second marshmallow. A child ( B ) daily life is less predictable may reasonably decide that the treat in front of him or her is the safer choice.",
      "None of this means that self-control is unimportant. But it reminds us that behavior which looks like a personal quality can also be a sensible response to circumstances, and that changing those circumstances may matter as much as ( C ) children to try harder.",
    ],
    ja: [
      '1960年代に始まった有名な一連の実験で、幼い子どもたちはある選択をせまられた。マシュマロを1つすぐに食べてもよいし、部屋でひとりで数分待てば2つもらえる。何年もあとに研究者たちが一部の子どもたちを追跡調査したところ、長く待てた子どもほど学校の成績がよい傾向があることがわかった。この結果は、幼いころの自制心が人生の成功を予測するという証拠として広く報じられた。',
      'この話は、単純な教訓を与えてくれるように思えたので魅力的だった。子どもに待つことを教えれば成功する、というのである。しかし、その後の研究は、話をもっと複雑にした。より大きく多様な子どもの集団を調べると、家庭の収入や家庭環境のような要因を考えに入れたとたん、待つことと後の成績とのつながりはずっと弱くなったのである。',
      'このことは、子どもが待つかどうかの決定は、内面の意志の力だけでなく経験にもよるかもしれないことを示している。大人は約束を守るものだと学んできた子どもには、2つ目のマシュマロを待つ十分な理由がある。毎日の生活が予測しにくい子どもは、目の前のお菓子のほうが安全な選択だと判断するのも無理はないだろう。',
      'これは、自制心が大切でないという意味ではない。しかしそれは、個人の性質のように見える行動が、状況に対する理にかなった反応でもありうること、そしてその状況を変えることが、子どもにもっとがんばるよう教えるのと同じくらい大切かもしれないことを思い出させてくれる。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'which', 'what', 'whose'], answer: 0, why: 'proof that ～ で「～という証拠」（同格の that）。うしろが欠けたところのない文なので which・what は入らず、whose のうしろには名詞が必要。' },
      { id: 'B', choices: ['whose', 'who', 'which', 'that'], answer: 0, why: '「その子どもの毎日の生活が」と、うしろの名詞 daily life につく所有格の関係代名詞 whose。who・which・that のうしろに daily life is … と続けると主語が2つになってしまう。' },
      { id: 'C', choices: ['teaching', 'teach', 'taught', 'teaches'], answer: 0, why: 'as much as のあとで、主語の changing those circumstances と比べる動名詞 teaching「（子どもに）教えること」。' },
    ],
    tf: [
      { statement: '実験では、部屋でひとりで待てばマシュマロが2つもらえた。', answer: true, why: '第1段落 if they waited alone in a room for several minutes, they would receive two。' },
      { statement: 'その後の研究で、待つことと後の成績のつながりはさらに強くなった。', answer: false, why: '第2段落 the link … became much weaker。' },
      { statement: '筆者は、自制心はまったく大切ではないと述べている。', answer: false, why: '第4段落 None of this means that self-control is unimportant。' },
    ],
    qa: [
      { q: 'Why might a child decide to eat the marshmallow right away?', choices: ['Because his or her daily life is less predictable.', 'Because he or she does not like marshmallows.', 'Because adults always keep their promises.', 'Because the room is too small.'], answer: 0, why: '第3段落 A child whose daily life is less predictable may reasonably decide that the treat in front of him or her is the safer choice。' },
    ],
  },
  {
    id: 'toeic-interview-email',
    title: 'An Email About an Interview Schedule',
    level: '難関大（メール文）',
    paragraphs: [
      "Dear Mr. Nakamura, Thank you for applying for the position of Sales Assistant at Clearwater Office Supplies. We were impressed by your application and would like to invite you to an interview.",
      "Your interview was originally scheduled for Tuesday, April 8, at 10:00 a.m. Unfortunately, our sales manager, who will be conducting the interview, has to attend an urgent meeting at our head office that day. We would therefore like to ask ( A ) you could come on Thursday, April 10, at the same time instead.",
      "The interview will take about forty-five minutes. Please bring a copy of your résumé and a list of two people we may contact as references. Our office is on the third floor of the Lakeside Building. When you arrive, please check in at the reception desk, ( B ) a staff member will show you to the meeting room.",
      "If Thursday is not convenient for you, please reply to this email by Friday, April 4, and let us know ( C ) days you are available next week. We apologize for any inconvenience and look forward to meeting you. Sincerely, Laura Kim, Human Resources",
    ],
    ja: [
      'ナカムラ様　クリアウォーター事務用品の営業アシスタントの職にご応募いただき、ありがとうございます。応募書類を拝見して感銘を受け、面接にお招きしたいと考えております。',
      '面接は当初、4月8日（火）午前10時に予定しておりました。あいにく、面接を担当する営業部長がその日、本社での急な会議に出席しなければならなくなりました。そのため、かわりに4月10日（木）の同じ時間にお越しいただけるかどうか、おうかがいしたいと存じます。',
      '面接は45分ほどかかります。履歴書を1部と、当社が照会先として連絡できる方2名のリストをお持ちください。当社のオフィスはレイクサイド・ビルの3階にあります。到着されましたら受付でお申し出ください。スタッフが会議室へご案内いたします。',
      '木曜日がご都合が悪い場合は、4月4日（金）までにこのメールにご返信いただき、来週ご都合のよい日をお知らせください。ご不便をおかけして申し訳ございません。お会いできるのを楽しみにしております。人事部　ローラ・キム',
    ],
    blanks: [
      { id: 'A', choices: ['whether', 'what', 'that if', 'which'], answer: 0, why: 'ask whether ～ で「～かどうかをたずねる」。うしろは完全な文なので what・which は入らず、that if の形はない。' },
      { id: 'B', choices: ['where', 'which', 'what', 'whose'], answer: 0, why: 'コンマのあとで the reception desk（場所）を説明し、うしろが完全な文（a staff member will show you …）なので関係副詞 where。' },
      { id: 'C', choices: ['which', 'that', 'whether', 'if'], answer: 0, why: 'which ＋名詞（which days）で「どの日」。うしろの you are available と合わせて「どの日が都合がよいか」。that・whether・if のうしろに名詞 days だけを置いて文を始めることはできない。' },
    ],
    tf: [
      { statement: '面接はもともと4月10日に予定されていた。', answer: false, why: '第2段落 originally scheduled for Tuesday, April 8。' },
      { statement: 'ナカムラさんは面接に履歴書を持っていく必要がある。', answer: true, why: '第3段落 Please bring a copy of your résumé。' },
      { statement: '木曜日の都合が悪い場合は、4月4日までに返信する。', answer: true, why: '第4段落 please reply to this email by Friday, April 4。' },
    ],
    qa: [
      { q: 'Why was the interview date changed?', choices: ['The sales manager has to attend an urgent meeting.', 'Mr. Nakamura asked for a different day.', 'The office will be closed on April 8.', 'The reception desk is being repaired.'], answer: 0, why: '第2段落 our sales manager … has to attend an urgent meeting at our head office that day。' },
    ],
  },
  {
    id: 'adv-school-start',
    title: 'Should School Start Later?',
    level: '難関大（評論）',
    paragraphs: [
      "Many teenagers find it very hard to get up in the morning. Parents often think this is simply laziness, but scientists say there is a biological reason. During adolescence, the body's internal clock shifts, so teenagers naturally feel sleepy later at night and want to wake up later in the morning.",
      "Because of this, some schools have tried starting classes later, for example at 8:30 or 9:00 instead of 7:45. In several of these schools, students got more sleep, were late ( A ) often, and said they felt more awake during morning lessons. Some schools also reported fewer car accidents among teenage drivers.",
      "However, changing the start time is not easy. If school starts later, it also ends later, which can leave less time for club activities and part-time jobs. Parents who need to drop off their children on the way to work may find the new schedule difficult. Bus companies may also have to change their timetables, ( B ) can be expensive.",
      "Even so, many experts believe the benefits are worth the effort. They argue that a school schedule should be designed around ( C ) students actually learn best, not only around what is convenient for adults.",
    ],
    ja: [
      '多くの10代の若者は、朝起きるのがとてもつらい。親はそれをただのなまけだと思いがちだが、科学者たちは生物学的な理由があると言う。思春期のあいだに体内時計がずれるので、10代の若者は自然と夜おそくにねむくなり、朝おそくに起きたくなるのだ。',
      'このため、たとえば7時45分ではなく8時30分や9時に授業を始めることを試した学校もある。そうした学校のいくつかでは、生徒のすいみん時間が増え、遅刻が減り、朝の授業でより目がさえていると感じると答えた。10代のドライバーの交通事故が減ったと報告した学校もある。',
      'しかし、始業時間を変えるのは簡単ではない。学校の始まりがおそくなれば終わりもおそくなり、部活動やアルバイトの時間が減るかもしれない。仕事に行くとちゅうで子どもを送っていく必要がある親は、新しい時間割を不便に感じるかもしれない。バス会社も時刻表を変えなければならないかもしれず、それには費用がかかることがある。',
      'それでも、多くの専門家はその利点は努力に見あうと考えている。学校の時間割は、大人にとって便利なことだけでなく、生徒が実際にいちばんよく学べるのはいつかを中心に考えて作られるべきだと彼らは主張している。',
    ],
    blanks: [
      { id: 'A', choices: ['less', 'least', 'fewer', 'little'], answer: 0, why: '副詞 often を修飾して「より少なく（遅刻した）」を表す比較級 less。least は最上級、fewer は数えられる名詞の前で使い、little often という形はない。' },
      { id: 'B', choices: ['which', 'what', 'that', 'it'], answer: 0, why: 'コンマのあとで前の内容（時刻表を変えること）を受ける非制限用法の which。that は非制限用法で使えず、what は先行詞をとらず、it では文をつなげない。' },
      { id: 'C', choices: ['when', 'that', 'which', 'whose'], answer: 0, why: '前置詞 around の目的語になる「いつ～か」の名詞のかたまり when students actually learn best。うしろが完全な文なので which は入らず、that のかたまりは前置詞のあとに置けず、whose のうしろには名詞が必要。' },
    ],
    tf: [
      { statement: '科学者によれば、10代の若者が朝起きにくいのにはなまけ以外の理由がある。', answer: true, why: '第1段落 scientists say there is a biological reason。' },
      { statement: '始業をおそくした学校では、生徒のすいみん時間が減った。', answer: false, why: '第2段落 students got more sleep。' },
      { statement: '始業がおそくなると、部活動の時間が減るかもしれない。', answer: true, why: '第3段落 can leave less time for club activities。' },
    ],
    qa: [
      { q: 'Why do teenagers naturally want to wake up later?', choices: ['Their internal clock shifts during adolescence.', 'They stay up late playing games.', 'Their schools start too late.', 'They have too many club activities.'], answer: 0, why: '第1段落 During adolescence, the body\'s internal clock shifts。' },
    ],
  },
  {
    id: 'adv-mosquito',
    title: 'Why Mosquitoes Prefer Some People',
    level: '難関大（評論）',
    paragraphs: [
      "Have you ever noticed that at a summer barbecue, some people are covered in mosquito bites while others hardly get any? This is not just bad luck. Scientists have found that mosquitoes are attracted to certain people more than others, and they use several clues ( A ) find their targets.",
      "First of all, only female mosquitoes bite. They need the protein in blood to produce their eggs, while males feed only on plant juices. To find a meal, a female mosquito first detects carbon dioxide, the gas we breathe out. People who breathe out more of it, such as larger adults or people who have been exercising, are easier for mosquitoes to find.",
      "As a mosquito gets closer, it also uses body heat and the smell of the skin. Our skin is home to millions of tiny bacteria, and the chemicals they produce give each person a slightly different smell. Studies suggest that this smell, ( B ) depends partly on our genes, is one of the main reasons why some people are bitten much more often than others.",
      "So what can you do? Wearing light-colored clothes, staying in a breeze, and getting rid of standing water where mosquitoes lay their eggs can all help. Unfortunately, there is little you can do to change the smell of your skin, so if you are one ( C ) the unlucky ones, insect repellent may be your best friend on summer evenings.",
    ],
    ja: [
      '夏のバーベキューで、蚊にたくさん刺される人もいれば、ほとんど刺されない人もいることに気づいたことはないだろうか。これはただの運の悪さではない。科学者たちは、蚊がほかの人よりも特定の人に引きつけられること、そして獲物を見つけるためにいくつかの手がかりを使っていることを発見した。',
      'まず、刺すのはメスの蚊だけである。メスは卵を作るために血の中のタンパク質を必要とするが、オスは植物の汁だけを吸う。食事を見つけるために、メスの蚊はまず、私たちがはき出す気体である二酸化炭素を感知する。体の大きい大人や運動をしていた人のように、二酸化炭素を多くはき出す人は、蚊に見つけられやすいのである。',
      '近づくにつれて、蚊は体温や皮ふのにおいも使う。私たちの皮ふには何百万もの小さな細菌がすんでおり、それらが作る化学物質によって、人はそれぞれ少しずつちがうにおいをもつ。研究によると、遺伝子にも一部左右されるこのにおいが、ほかの人よりずっとよく刺される人がいるおもな理由の1つであるらしい。',
      'では、どうすればよいのだろうか。明るい色の服を着ること、風の通るところにいること、蚊が卵を産むたまり水をなくすことは、どれも役に立つ。残念ながら、皮ふのにおいを変えるためにできることはほとんどないので、もしあなたが運の悪い一人なら、夏の夕方には虫よけがいちばんの味方かもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['to', 'for', 'so', 'in'], answer: 0, why: '目的を表す to 不定詞「獲物を見つけるために」。for・so・in のうしろに動詞の原形 find は続かない。' },
      { id: 'B', choices: ['which', 'what', 'that', 'who'], answer: 0, why: 'コンマのあとで this smell を説明し、depends の主語になる非制限用法の which。that は非制限用法で使えず、what は先行詞をとらず、who は人に使う。' },
      { id: 'C', choices: ['of', 'in', 'at', 'with'], answer: 0, why: 'one of the ＋複数名詞 で「～のうちの1人（1つ）」。in・at・with ではこの意味にならない。' },
    ],
    tf: [
      { statement: '血を吸うのはメスの蚊だけである。', answer: true, why: '第2段落 only female mosquitoes bite。' },
      { statement: '運動したばかりの人は、蚊に見つけられにくい。', answer: false, why: '第2段落 people who have been exercising, are easier for mosquitoes to find。' },
      { statement: '筆者によれば、皮ふのにおいは簡単に変えられる。', answer: false, why: '第4段落 there is little you can do to change the smell of your skin。' },
    ],
    qa: [
      { q: 'Why do female mosquitoes need blood?', choices: ['To get protein for producing eggs.', 'To keep their bodies warm.', 'To find carbon dioxide.', 'To feed on plant juices.'], answer: 0, why: '第2段落 They need the protein in blood to produce their eggs。' },
    ],
  },
  {
    id: 'native-houseplants',
    title: 'Confessions of a Plant Killer',
    level: '難関大（評論）',
    paragraphs: [
      "I have a confession to make: I am a serial plant killer. Over the years, I have managed to kill cacti, which supposedly thrive on neglect, and a bamboo plant that the shop assistant swore was 'impossible to kill.' Every time I bring a new plant home, I promise myself that this one will be different, and every time, a few weeks later, I find myself staring at a sad brown stick ( A ) used to be a living thing.",
      "For a long time I blamed bad luck. Then a friend who grows vegetables on her tiny balcony asked me a simple question: how often did I water them? The honest answer was 'whenever I remembered,' which turned out to mean either never or far too much. Plants, she explained, don't need grand gestures of love. They need small, boring routines.",
      "So I tried something new. I chose one easygoing plant, put it by the kitchen window where I would see it every morning, and set a reminder on my phone. Watering it became part of my routine, ( B ) brushing my teeth.",
      "Six months later, the plant is not just alive but actually growing. I am almost embarrassingly proud of it. More than that, it has taught me that most things worth caring for, from friendships to fitness, depend less on big efforts than on showing up regularly. It's a lesson I wish I ( C ) learned a few dozen plants earlier.",
    ],
    ja: [
      '告白しなければならないことがある。私は植物を次々と枯らしてしまう人間なのだ。これまでに、放っておくほどよく育つはずのサボテンや、店員が「絶対に枯れない」と断言した竹まで枯らしてきた。新しい植物を家に持ち帰るたびに、今度こそちがうと自分に約束するのだが、そのたびに数週間後、かつて生き物だった、しょんぼりした茶色い棒を見つめることになる。',
      '長いあいだ、私は運が悪いせいにしていた。そんなとき、小さなベランダで野菜を育てている友人が、ひとつ簡単な質問をした。どれくらいの頻度で水をやっていたのか、と。正直な答えは「思い出したとき」で、それは結局、まったくやらないか、やりすぎるかのどちらかを意味していた。植物には大げさな愛情表現はいらないのだと彼女は説明した。必要なのは、小さくて退屈な習慣なのだ。',
      'そこで私は新しいことを試した。手のかからない植物を1つ選び、毎朝目に入る台所の窓辺に置き、スマホにリマインダーを設定した。水やりは、歯みがきと同じように、私の日課の一部になった。',
      '6か月たった今、その植物は生きているどころか、ちゃんと育っている。自分でもはずかしいくらい誇らしい。それ以上に、この植物は、友情から体力づくりまで、大切にする価値のあるほとんどのことは、大きな努力よりも、きちんと続けることにかかっていると教えてくれた。何十本か植物を枯らす前に学べていればよかったのに、と思う教訓である。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 a sad brown stick を説明し、used to be の主語になる関係代名詞 that。what は先行詞をとらず、where のうしろは主語のそろった文、whose のうしろには名詞が必要。' },
      { id: 'B', choices: ['just like', 'as if', 'so that', 'even though'], answer: 0, why: 'うしろが動名詞のかたまり（brushing my teeth）なので、前置詞として使える just like「～とまったく同じように」。as if・so that・even though のうしろには主語と動詞のそろった文が必要。' },
      { id: 'C', choices: ['had', 'have', 'would', 'was'], answer: 0, why: 'I wish ＋仮定法過去完了（had ＋過去分詞）で「（過去に）～していればよかったのに」。I wish のあとに現在完了 have learned は使えず、would・was のうしろに learned は続かない。' },
    ],
    tf: [
      { statement: '筆者はサボテンを枯らしたことがある。', answer: true, why: '第1段落 I have managed to kill cacti。' },
      { statement: '筆者は以前、決まった日に水をやっていた。', answer: false, why: '第2段落 The honest answer was "whenever I remembered"。' },
      { statement: '筆者によれば、大切なことの多くは大きな努力よりも続けることにかかっている。', answer: true, why: '第4段落 depend less on big efforts than on showing up regularly。' },
    ],
    qa: [
      { q: 'What did the writer do to keep the new plant alive?', choices: ['Put it where he or she would see it and set a reminder.', 'Bought a more expensive plant.', 'Asked the shop assistant to water it.', 'Moved it to a friend\'s balcony.'], answer: 0, why: '第3段落 put it by the kitchen window where I would see it every morning, and set a reminder on my phone。' },
    ],
  },
  {
    id: 'kyodai-diary',
    title: 'On Keeping a Diary',
    level: '難関大（評論）',
    paragraphs: [
      "When I was fifteen, I began keeping a diary, and I have written in it, with long gaps, ever since. Reading the early pages now is an odd experience. The worries that once seemed enormous, a quarrel with a friend or a poor test score, now look small, while things I mentioned only in passing, such as a walk with my grandfather, have become ( A ) I treasure most.",
      "This suggests that a diary is not simply a record of what happened. It is also a record of what we thought was important at the time, and the gap between the two can be surprising. We are poor judges of which moments will matter to our future selves.",
      "There is another, quieter benefit. Writing forces us to slow down. In conversation, we can hide vague feelings behind quick words, but on the page, a sentence that does not say what we mean looks clumsy and unfinished. In searching for the right word, we often discover ( B ) we actually feel, which may differ from what we assumed.",
      "Some people worry that a diary encourages too much attention to oneself. Yet the opposite may be true. A diary kept honestly over many years shows us how often we were mistaken, how quickly our moods passed, and how much we depended on others. Few things teach humility ( C ) effectively as the voice of one's younger self.",
    ],
    ja: [
      '15歳のとき、私は日記をつけはじめ、長い空白をはさみながらも、それ以来ずっと書き続けている。いま最初のほうのページを読むのは奇妙な体験だ。かつてはとても大きく思えた悩み、たとえば友だちとのけんかや悪いテストの点は、いまでは小さく見える。一方で、ついでにふれただけのこと、たとえば祖父との散歩のようなことが、いまでは私がもっとも大切にしているものになっている。',
      'このことは、日記が単に起きたことの記録ではないことを示している。それは、私たちがその時に何を大切だと思っていたかの記録でもあり、その2つのずれはおどろくほど大きいことがある。私たちは、どの瞬間が未来の自分にとって大切になるかを、うまく判断できないのである。',
      'もう1つ、もっと静かな利点がある。書くことは、私たちに速度を落とさせる。会話では、あいまいな気持ちを手早い言葉のうしろに隠すことができるが、紙の上では、言いたいことを言えていない文はぎこちなく、未完成に見える。ふさわしい言葉を探すうちに、私たちは自分が実際に何を感じているかに気づくことが多く、それは思いこんでいたこととちがうかもしれない。',
      '日記は自分自身に注意を向けすぎることにつながると心配する人もいる。しかし、その逆が正しいのかもしれない。何年も正直につけた日記は、私たちがどれほどしばしばまちがっていたか、気分がどれほど早く過ぎ去ったか、そしてどれほど他人にたよっていたかを示してくれる。若いころの自分の声ほど、効果的に謙虚さを教えてくれるものはほとんどない。',
    ],
    blanks: [
      { id: 'A', choices: ['what', 'that', 'which', 'it'], answer: 0, why: 'have become の補語で、treasure の目的語が欠けたかたまり「私がもっとも大切にしているもの」を作る関係代名詞 what。that・which は先行詞が必要で、it では文がつながらない。' },
      { id: 'B', choices: ['what', 'that', 'which', 'whom'], answer: 0, why: 'discover の目的語で、feel の目的語が欠けたかたまり「実際に感じていること」を作る関係代名詞 what。that のうしろは欠けたところのない文が必要で、which・whom は先行詞が必要（whom は人にしか使わない）。' },
      { id: 'C', choices: ['as', 'so', 'than', 'more'], answer: 0, why: 'few things teach … as effectively as ～ で「～ほど効果的に…するものはほとんどない」。as ～ as の形なので最初も as。' },
    ],
    underline: {
      phrase: 'in passing',
      choices: ['briefly, without paying much attention', 'while walking past someone', 'after passing a test', 'in great detail'],
      answer: 0,
      why: 'mention ～ in passing は「（話の）ついでにちょっとふれる」。',
    },
    order: {
      words: ['writing', 'forces', 'us', 'to', 'slow', 'down'],
      rest: '',
      answer: 'writing forces us to slow down',
      ja: '書くことは私たちに速度を落とさせる。（force 人 to ～＝人に～させる・無生物主語）',
    },
    tf: [
      { statement: '筆者は15歳のときから日記をつけている。', answer: true, why: '第1段落 When I was fifteen, I began keeping a diary。' },
      { statement: '筆者によれば、私たちはどの瞬間が将来大切になるかをうまく判断できる。', answer: false, why: '第2段落 We are poor judges of which moments will matter to our future selves。' },
      { statement: '筆者は、日記は自分に注意を向けすぎることにつながると結論づけている。', answer: false, why: '第4段落 Yet the opposite may be true。' },
    ],
    qa: [
      { q: 'According to the writer, why does writing help us understand our feelings?', choices: ['Because searching for the right word makes us discover what we actually feel.', 'Because writing is faster than speaking.', 'Because other people read our diaries.', 'Because diaries only record important events.'], answer: 0, why: '第3段落 In searching for the right word, we often discover what we actually feel。' },
    ],
  },
  {
    id: 'adv-citizen-science',
    title: 'Science by Everyone',
    level: '難関大（評論）',
    paragraphs: [
      "For most of history, scientific research was carried out by a small number of trained experts. Today, however, millions of ordinary people around the world are taking part in what is known as citizen science. They count birds in their gardens, photograph insects with their smartphones, and even help classify images of distant galaxies from their living rooms.",
      "The benefits for science are clear. Many research projects require far more data than professional scientists could ever collect ( A ) their own. A single team cannot watch every river or forest, but thousands of volunteers spread across a country can. In several cases, amateurs have even made important discoveries, such as new species or unusual objects in space.",
      "Citizen science also benefits the volunteers themselves. Participants often report that they pay more attention to the natural world around them and understand better how scientists work. In this way, the projects help close the gap between researchers and the public, a gap ( B ) has sometimes led to distrust of science.",
      "Of course, data collected by non-experts can contain mistakes. To deal with this problem, many projects ask several volunteers to check the same observation, or use computer programs to identify results that look unusual. With such safeguards, researchers have found that the data are often surprisingly reliable.",
      "Citizen science suggests that curiosity, not a degree, is the most basic requirement for ( C ) part in the search for knowledge.",
    ],
    ja: [
      '歴史の大部分において、科学研究は少数の訓練を受けた専門家によって行われてきた。しかし今日では、世界中の何百万もの一般の人々が、市民科学として知られるものに参加している。彼らは庭で鳥を数え、スマホで昆虫の写真をとり、さらには居間から遠くの銀河の画像の分類を手伝ったりもしている。',
      '科学にとっての利点は明らかだ。多くの研究計画には、専門の科学者が自分たちだけでとうてい集めきれないほど多くのデータが必要である。1つのチームですべての川や森を見守ることはできないが、国じゅうに散らばった何千人ものボランティアならそれができる。アマチュアが新種や宇宙の変わった天体のような重要な発見をしたことさえ、いくつかある。',
      '市民科学はボランティア自身にも利益をもたらす。参加者は、身のまわりの自然により注意を向けるようになり、科学者がどのように研究するかをよりよく理解するようになったとよく報告している。このようにして、こうした計画は研究者と一般の人々とのへだたりをうめる助けになる。そのへだたりは、ときに科学への不信をまねいてきたのである。',
      'もちろん、専門家でない人が集めたデータには誤りがふくまれることがある。この問題に対処するため、多くの計画は複数のボランティアに同じ観察を確認してもらったり、コンピューターのプログラムで変わった結果を見つけたりしている。そうした安全策があれば、データはおどろくほど信頼できることが多いと研究者たちは気づいている。',
      '市民科学は、知識の探求に参加するためのもっとも基本的な条件は、学位ではなく好奇心であることを示している。',
    ],
    blanks: [
      { id: 'A', choices: ['on', 'in', 'at', 'with'], answer: 0, why: 'on one\'s own で「自分（たち）だけで」。in・at・with ではこの意味にならない。' },
      { id: 'B', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 a gap を説明し、has led の主語になる関係代名詞 that。what は先行詞をとらず、where のうしろは主語のそろった文、whose のうしろには名詞が必要。' },
      { id: 'C', choices: ['taking', 'take', 'took', 'taken'], answer: 0, why: '前置詞 for のあとは動名詞。take part in ～ で「～に参加する」。' },
    ],
    underline: {
      phrase: 'close the gap',
      choices: ['reduce the distance', 'shut the door', 'end the project', 'make a new gap'],
      answer: 0,
      why: 'close the gap between A and B は「A と B のへだたりをうめる・差を縮める」。',
    },
    order: {
      words: ['they', 'count', 'birds', 'in', 'their', 'gardens'],
      rest: '',
      answer: 'they count birds in their gardens',
      ja: '彼らは庭で鳥を数える。',
    },
    tf: [
      { statement: '市民科学では、一般の人が鳥を数えたり昆虫の写真をとったりする。', answer: true, why: '第1段落 They count birds in their gardens, photograph insects。' },
      { statement: 'アマチュアが重要な発見をしたことは一度もない。', answer: false, why: '第2段落 amateurs have even made important discoveries。' },
      { statement: '研究者によれば、安全策があればボランティアのデータは信頼できることが多い。', answer: true, why: '第4段落 the data are often surprisingly reliable。' },
    ],
    qa: [
      { q: 'How do many projects deal with mistakes in data collected by volunteers?', choices: ['They ask several volunteers to check the same observation.', 'They only accept data from professional scientists.', 'They stop collecting data from the public.', 'They pay volunteers to work more slowly.'], answer: 0, why: '第4段落 many projects ask several volunteers to check the same observation。' },
    ],
  },
  {
    id: 'adv-open-office',
    title: 'The Trouble with Open Offices',
    level: '難関大（評論）',
    paragraphs: [
      "In the past few decades, many companies have torn down the walls between their employees' desks and created large open-plan offices. The idea seemed persuasive: without walls, people would talk more freely, share ideas, and work together more closely. Open offices were also cheaper, since more workers could fit into the same space.",
      "Research, however, has produced results that few designers expected. In one well-known study, researchers measured how often employees spoke to each other face to face before and after their company moved into an open office. Far from increasing, face-to-face conversation fell sharply, while the number of emails and messages rose. It appears that when everyone can see and hear everyone else, people protect their privacy by ( A ) into their screens and headphones.",
      "Noise is another problem. Work that requires deep concentration, such as writing or analyzing data, is easily disturbed by nearby conversations and ringing phones. Some workers report that they get their most important work done only early in the morning or at home, ( B ) the office is quiet or they are alone.",
      "None of this means that open spaces have no value. Casual meetings and quick questions are easier when colleagues sit nearby. The lesson may be that no single design suits every task. Many companies are now creating a mix of spaces, including quiet rooms for focused work and open areas for collaboration, so that employees can choose the environment ( C ) fits what they are doing.",
    ],
    ja: [
      'この数十年のあいだに、多くの会社が社員の机のあいだの壁を取りはらい、広いオープンプランのオフィスを作った。その考えは説得力があるように思えた。壁がなければ、人々はもっと自由に話し、考えを共有し、より密接に協力するだろうというのである。オープンなオフィスは、同じ広さにより多くの社員を入れられるので、安上がりでもあった。',
      'しかし研究は、設計者がほとんど予想しなかった結果を生んだ。よく知られたある研究で、研究者たちは、会社がオープンなオフィスに移る前とあとで、社員が直接顔をあわせて話す頻度を測った。増えるどころか、対面の会話は大きく減り、メールやメッセージの数は増えた。だれもがほかの全員を見たり聞いたりできると、人々は画面やヘッドホンの中に引きこもることで、自分のプライバシーを守るようである。',
      '騒音も問題である。文章を書いたりデータを分析したりといった、深い集中が必要な仕事は、近くの会話や鳴りひびく電話にすぐにさまたげられる。オフィスが静かなときやひとりのとき、つまり早朝や家でしか、いちばん大切な仕事を終えられないと言う社員もいる。',
      'これは、オープンな空間に価値がないという意味ではない。気軽な打ち合わせやちょっとした質問は、同僚が近くに座っているほうがしやすい。教訓は、どの仕事にも合う1つの設計などないということなのかもしれない。いま多くの会社が、集中して作業するための静かな部屋や協力のための開かれた場所などをとりまぜた空間を作り、社員が自分のしていることに合った環境をえらべるようにしている。',
    ],
    blanks: [
      { id: 'A', choices: ['withdrawing', 'withdraw', 'withdrew', 'withdrawn'], answer: 0, why: '前置詞 by のあとは動名詞。by ～ing で「～することによって」。withdraw into ～ で「～の中に引きこもる」。' },
      { id: 'B', choices: ['when', 'which', 'what', 'whose'], answer: 0, why: 'early in the morning or at home（時・場合）を受けて、うしろが完全な文（the office is quiet …）なので関係副詞 when「～するとき」。which・what のうしろは欠けた文、whose のうしろには名詞が必要。' },
      { id: 'C', choices: ['that', 'what', 'where', 'whom'], answer: 0, why: '先行詞 the environment を説明し、fits の主語になる関係代名詞 that。what は先行詞をとらず、where のうしろは主語のそろった文、whom は人で目的語。' },
    ],
    underline: {
      phrase: 'Far from increasing',
      choices: ['Instead of increasing', 'Increasing a little', 'Increasing in a faraway place', 'After increasing quickly'],
      answer: 0,
      why: 'far from ～ing は「～するどころか」。対面の会話は増えるどころか大きく減った、という意味。',
    },
    order: {
      words: ['quick', 'questions', 'are', 'easier', 'when', 'colleagues', 'sit', 'nearby'],
      rest: '',
      answer: 'quick questions are easier when colleagues sit nearby',
      ja: '（気軽な打ち合わせや）ちょっとした質問は、同僚が近くに座っているほうがしやすい。（when ＋文＝～するとき）',
    },
    tf: [
      { statement: 'オープンなオフィスは、同じ広さにより多くの社員を入れられた。', answer: true, why: '第1段落 more workers could fit into the same space。' },
      { statement: 'ある研究では、オープンなオフィスに移ると対面の会話が増えた。', answer: false, why: '第2段落 Far from increasing, face-to-face conversation fell sharply。' },
      { statement: '筆者は、オープンな空間にはまったく価値がないと述べている。', answer: false, why: '第4段落 None of this means that open spaces have no value。' },
    ],
    qa: [
      { q: 'What are many companies doing now, according to the last paragraph?', choices: ['Creating a mix of quiet rooms and open areas.', 'Building walls around every desk.', 'Asking all employees to work from home.', 'Banning emails in the office.'], answer: 0, why: '第4段落 Many companies are now creating a mix of spaces。' },
    ],
  },
  {
    id: 'adv-comets',
    title: 'Visitors from the Edge of the Solar System',
    level: 'TOEFL・IELTS（天文学）',
    paragraphs: [
      "Comets are among the most spectacular objects in the night sky, yet at their core they are surprisingly small and dark. A typical comet nucleus is a mixture of ice, dust, and rock only a few kilometers across. For most of its long orbit, it travels far from the Sun, where it is frozen and almost invisible.",
      "Everything changes as a comet approaches the Sun. The increasing heat turns some of its ice directly into gas, a process ( A ) releases large amounts of dust as well. The gas and dust form a glowing cloud, called the coma, around the nucleus. Pressure from sunlight and the solar wind then pushes this material outward, creating one or more long tails. Interestingly, a comet's tail always points away from the Sun, ( B ) the comet is moving toward it or away from it.",
      "Astronomers believe that many comets come from two distant regions. Short-period comets, which return within about 200 years, are thought to originate in a belt of icy objects beyond Neptune. Long-period comets may come from a much more distant cloud of icy bodies surrounding the solar system. Halley's Comet, perhaps the most famous example, returns roughly every 76 years.",
      "Because comets have changed little since the solar system formed, scientists study them ( C ) clues about its early history. Some researchers even suggest that comets may have delivered part of Earth's water.",
    ],
    ja: [
      'すい星は夜空でもっとも壮観な天体の1つだが、その中心はおどろくほど小さく暗い。典型的なすい星の核は、さしわたしわずか数キロメートルの、氷とちりと岩のまざりあったものである。長い軌道のほとんどのあいだ、すい星は太陽から遠く離れたところを進んでおり、そこでは凍っていてほとんど見えない。',
      'すい星が太陽に近づくと、すべてが変わる。強まる熱によって氷の一部が直接気体に変わり、その過程で大量のちりも放出される。気体とちりは核のまわりに、コマとよばれる輝く雲をつくる。そして太陽光の圧力と太陽風がこの物質を外へ押し出し、1本以上の長い尾をつくる。おもしろいことに、すい星の尾は、すい星が太陽に向かっていても遠ざかっていても、つねに太陽と反対の方向を向いている。',
      '天文学者たちは、多くのすい星が2つの遠い領域からやって来ると考えている。およそ200年以内にもどってくる短周期すい星は、海王星の外側にある氷の天体の帯で生まれると考えられている。長周期すい星は、太陽系を取り囲む、はるかに遠い氷の天体の雲から来るのかもしれない。おそらくもっとも有名な例であるハレーすい星は、およそ76年ごとにもどってくる。',
      'すい星は太陽系ができたころからほとんど変わっていないので、科学者たちは太陽系の初期の歴史についての手がかりを求めてすい星を研究している。すい星が地球の水の一部を運んできたのかもしれないと考える研究者さえいる。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 a process を説明し、releases の主語になる関係代名詞 that。what は先行詞をとらず、where のうしろは主語のそろった文、whose のうしろには名詞が必要。' },
      { id: 'B', choices: ['whether', 'despite', 'because of', 'in spite of'], answer: 0, why: 'whether A or B で「A であろうと B であろうと」。うしろが文（the comet is moving …）なので、前置詞の働きをする despite・because of・in spite of は入らない。' },
      { id: 'C', choices: ['for', 'by', 'at', 'of'], answer: 0, why: 'study A for clues で「手がかりを求めて A を研究する」。目的・追求を表す for。' },
    ],
    tf: [
      { statement: 'すい星の核は、ふつう数キロメートルほどの大きさである。', answer: true, why: '第1段落 only a few kilometers across。' },
      { statement: 'すい星の尾は、つねにすい星の進む方向の後ろにのびる。', answer: false, why: '第2段落 a comet\'s tail always points away from the Sun（太陽と反対方向）。' },
      { statement: 'ハレーすい星はおよそ76年ごとにもどってくる。', answer: true, why: '第3段落 returns roughly every 76 years。' },
    ],
    qa: [
      { q: 'What happens when a comet approaches the Sun?', choices: ['Its ice turns into gas and forms a glowing cloud and tails.', 'It becomes completely frozen and invisible.', 'It stops moving along its orbit.', 'It breaks into many small planets.'], answer: 0, why: '第2段落 The increasing heat turns some of its ice directly into gas … The gas and dust form a glowing cloud … creating one or more long tails。' },
    ],
  },
  {
    id: 'adv-sand-dunes',
    title: 'How Sand Dunes Move',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "Sand dunes are among the most striking landforms on Earth. They are found not only in deserts but also along coastlines and even on Mars. Although they may look permanent, dunes are constantly changing shape and, in many cases, slowly moving across the landscape.",
      "A dune begins to form when wind carries loose grains of sand and drops them behind an obstacle, such as a rock or a bush. As more sand collects, the pile grows and starts to influence the wind itself. The side facing the wind, known as the windward slope, is usually long and gentle. Wind pushes sand grains up this slope in a series of short jumps. When the grains reach the top, they fall down the other side, ( A ) is called the slip face. Because the slip face is much steeper, the sand there often slides down in small avalanches.",
      "This continuous process of sand being removed from one side and added to the other causes the entire dune to move in the direction ( B ) the wind blows. Some dunes travel several meters a year, which can create serious problems for nearby roads and villages.",
      "The shape of a dune depends largely on the supply of sand and on how steady the wind is. Where sand is limited and the wind blows mainly from one direction, crescent-shaped dunes tend to form, ( C ) their tips pointing downwind.",
    ],
    ja: [
      '砂丘は地球上でもっとも印象的な地形の1つである。砂丘は砂漠だけでなく、海岸ぞいや、さらには火星にも見られる。変わらないものに見えるかもしれないが、砂丘はたえず形を変えており、多くの場合、ゆっくりと地表を移動している。',
      '砂丘は、風がばらばらの砂つぶを運び、岩やしげみのような障害物のうしろに落とすところから形づくられはじめる。砂がたまるにつれて山は大きくなり、風そのものに影響を与えはじめる。風を受ける側は風上斜面とよばれ、ふつう長くゆるやかである。風は砂つぶを短いジャンプのくり返しでこの斜面の上へと押し上げる。てっぺんに達すると、つぶは反対側に落ちる。そちらは滑落面とよばれる。滑落面はずっと急なので、そこの砂はしばしば小さななだれのようにすべり落ちる。',
      '一方の側から砂がとりのぞかれ、もう一方の側に加わるというこのたえまない過程によって、砂丘全体が風のふく方向へと動いていく。1年に数メートル進む砂丘もあり、近くの道路や村に深刻な問題を引き起こすことがある。',
      '砂丘の形は、おもに砂の量と、風がどれだけ一定であるかによって決まる。砂が少なく、風がおもに一方向からふく場所では、三日月の形をした砂丘ができやすく、その両はしは風下を向いている。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'what', 'that', 'it'], answer: 0, why: 'コンマのあとで the other side を説明し、is called の主語になる非制限用法の関係代名詞 which。that は非制限用法で使えず、what は先行詞をとらず、it では文をつなげない。' },
      { id: 'B', choices: ['in which', 'which', 'what', 'whose'], answer: 0, why: 'the direction in which the wind blows「風がふく方向」。うしろが完全な文（the wind blows）なので「前置詞＋関係代名詞」の in which。which・what のうしろは欠けた文、whose のうしろには名詞が必要。' },
      { id: 'C', choices: ['with', 'for', 'by', 'from'], answer: 0, why: '付帯状況の with ＋名詞＋ -ing「～が…した状態で」。with their tips pointing downwind で「両はしが風下を向いた状態で」。' },
    ],
    tf: [
      { statement: '砂丘は砂漠にしか見られない。', answer: false, why: '第1段落 found not only in deserts but also along coastlines and even on Mars。' },
      { statement: '風上斜面は、ふつう滑落面よりもゆるやかである。', answer: true, why: '第2段落 the windward slope, is usually long and gentle … the slip face is much steeper。' },
      { statement: '1年に数メートル移動する砂丘もある。', answer: true, why: '第3段落 Some dunes travel several meters a year。' },
    ],
    qa: [
      { q: 'Why does a whole dune move?', choices: ['Sand is removed from one side and added to the other.', 'Earthquakes push it across the land.', 'Rivers carry it downstream.', 'Plants grow under it and lift it.'], answer: 0, why: '第3段落 This continuous process of sand being removed from one side and added to the other causes the entire dune to move。' },
    ],
  },
  {
    id: 'adv-study-music',
    title: 'Should You Study with Music?',
    level: '難関大（評論）',
    paragraphs: [
      "Many students put on headphones as soon as they sit down to study. Some say that music helps them relax and concentrate, while others cannot work unless the room is completely silent. Who is right? According to researchers, the answer depends on both the kind of music and the kind of task.",
      "Several studies have found that songs with lyrics tend to interfere with reading and writing. This is probably because the brain has to process two sets of words at once: the words on the page and the words in the song. When students listen to music with lyrics, they often remember less of what they have read, even if they feel ( A ) they are working well.",
      "Instrumental music seems to cause fewer problems. For simple, repetitive tasks, such as copying notes or solving easy calculations, calm music without words may even improve mood and help people keep going. Loud or fast music, however, can be distracting regardless of ( B ) it has lyrics.",
      "Personal differences also matter. People who are used to studying with music may be less disturbed by it than those who rarely listen. The best approach, then, may be to experiment. Try studying the same kind of material with and without music, and compare how much you actually remember, ( C ) how productive you feel.",
    ],
    ja: [
      '多くの生徒は、勉強しようと座るとすぐにヘッドホンをつける。音楽のおかげでリラックスして集中できると言う人もいれば、部屋が完全に静かでないと勉強できない人もいる。どちらが正しいのだろうか。研究者によれば、その答えは音楽の種類と作業の種類の両方によって決まる。',
      'いくつかの研究で、歌詞のある歌は読んだり書いたりする作業をさまたげやすいことがわかっている。これはおそらく、脳がページ上の言葉と歌の言葉という2組の言葉を同時に処理しなければならないからだろう。歌詞のある音楽を聞いていると、生徒は、自分ではうまく勉強できていると感じていても、読んだ内容を覚えている量が少なくなることが多い。',
      '歌詞のない音楽は、問題を起こしにくいようだ。ノートを写したりやさしい計算を解いたりといった単純なくり返しの作業では、言葉のない落ち着いた音楽が、気分をよくし、作業を続ける助けになることさえある。しかし、大きな音やテンポの速い音楽は、歌詞があるかどうかに関係なく気を散らすことがある。',
      '個人差も重要である。音楽を聞きながら勉強するのに慣れている人は、めったに聞かない人よりも、音楽にじゃまされにくいかもしれない。そうすると、いちばんよい方法は試してみることなのかもしれない。同じ種類の教材を、音楽ありとなしで勉強してみて、どれだけはかどったと感じるかではなく、実際にどれだけ覚えているかを比べてみよう。',
    ],
    blanks: [
      { id: 'A', choices: ['as if', 'despite', 'because of', 'in spite of'], answer: 0, why: 'feel as if ～ で「まるで～のように感じる」。うしろが文（they are working well）なので、前置詞の働きをする despite・because of・in spite of は入らない。' },
      { id: 'B', choices: ['whether', 'that', 'what', 'which'], answer: 0, why: 'regardless of whether ～「～かどうかに関係なく」。前置詞 of のあとに that 節は置けず、what・which のうしろは欠けた文になる。' },
      { id: 'C', choices: ['not', 'no', 'nor', 'none'], answer: 0, why: 'A, not B で「B ではなく A」。how much you actually remember, not how productive you feel「どれだけはかどったと感じるかではなく、実際にどれだけ覚えているか」。' },
    ],
    tf: [
      { statement: '研究によれば、歌詞のある歌は読み書きの作業をさまたげやすい。', answer: true, why: '第2段落 songs with lyrics tend to interfere with reading and writing。' },
      { statement: '大きな音の音楽は、歌詞がなければ気を散らさない。', answer: false, why: '第3段落 Loud or fast music … can be distracting regardless of whether it has lyrics。' },
      { statement: '筆者は、音楽ありとなしで試して比べることをすすめている。', answer: true, why: '第4段落 Try studying the same kind of material with and without music, and compare。' },
    ],
    qa: [
      { q: 'Why might songs with lyrics make reading harder?', choices: ['The brain must process two sets of words at once.', 'The music is always too loud.', 'Students stop reading to sing along.', 'Headphones make the room too quiet.'], answer: 0, why: '第2段落 the brain has to process two sets of words at once。' },
    ],
  },
  {
    id: 'adv-power-nap',
    title: 'The Power of a Short Nap',
    level: '難関大（評論）',
    paragraphs: [
      "In some countries, taking a nap in the middle of the day is seen as a sign of laziness. However, a growing number of schools and companies are now encouraging short naps. Why are they doing this?",
      "Research suggests that a nap of about fifteen to twenty minutes can improve attention and memory for the rest of the afternoon. Many people feel sleepy after lunch, and a short rest helps them ( A ) more clearly afterward. Some schools in Japan have introduced a short 'nap time' after lunch, and teachers report that students seem more focused in their afternoon classes.",
      "The length of the nap is important, though. If you sleep for more than about thirty minutes, you may fall into deep sleep. Waking up from deep sleep can leave you feeling heavy and confused, ( B ) is the opposite of what you want. Long naps late in the day can also make it harder to fall asleep at night.",
      "Experts give a few simple tips. Nap early in the afternoon, set an alarm, and find a quiet place. Even if you cannot fall asleep, simply closing your eyes and resting ( C ) help you recharge.",
    ],
    ja: [
      '国によっては、日中に昼寝をすることはなまけているしるしと見られる。しかし、短い昼寝をすすめる学校や会社がますます増えている。なぜそうしているのだろうか。',
      '研究によると、15〜20分ほどの昼寝は、その日の午後の注意力や記憶力を高めることができる。昼食のあとにねむくなる人は多く、短い休けいをとると、そのあと頭がすっきりして考えられるようになる。日本のある学校では昼食のあとに短い「お昼寝タイム」を取り入れ、先生たちは、生徒が午後の授業でより集中しているようだと報告している。',
      'ただし、昼寝の長さは大切だ。30分ほどより長くねむると、深いねむりに入ってしまうかもしれない。深いねむりから目覚めると、体が重く、ぼんやりした感じが残ることがあり、それはのぞんでいることとは正反対である。夕方おそくの長い昼寝は、夜にねつきにくくすることもある。',
      '専門家はいくつかの簡単なコツをあげている。午後の早い時間に昼寝をすること、アラームをセットすること、静かな場所を見つけることだ。たとえねむれなくても、ただ目を閉じて休むだけで、元気を取りもどす助けになりうる。',
    ],
    blanks: [
      { id: 'A', choices: ['think', 'thinking', 'thought', 'thinks'], answer: 0, why: 'help ＋人＋動詞の原形 で「人が～するのを助ける」。help them think で「彼らが考える助けになる」。' },
      { id: 'B', choices: ['which', 'what', 'that', 'it'], answer: 0, why: 'コンマのあとで前の内容（体が重くぼんやりすること）を受ける非制限用法の which。that は非制限用法で使えず、what は先行詞をとらず、it では文をつなげない。' },
      { id: 'C', choices: ['can', 'is', 'are', 'to'], answer: 0, why: '主語は simply closing your eyes and resting（動名詞のかたまり）。うしろの動詞の原形 help と結びつくのは助動詞 can。is・are・to のうしろに原形 help は続かない。' },
    ],
    tf: [
      { statement: '研究によれば、15〜20分ほどの昼寝は午後の注意力を高める。', answer: true, why: '第2段落 a nap of about fifteen to twenty minutes can improve attention and memory。' },
      { statement: '30分より長い昼寝は、いつも目覚めをよくする。', answer: false, why: '第3段落 Waking up from deep sleep can leave you feeling heavy and confused。' },
      { statement: '専門家は、昼寝のときにアラームをセットすることをすすめている。', answer: true, why: '第4段落 set an alarm。' },
    ],
    qa: [
      { q: 'Why can long naps late in the day be a problem?', choices: ['They can make it harder to fall asleep at night.', 'They make people hungry.', 'They are not allowed at school.', 'They improve memory too much.'], answer: 0, why: '第3段落 Long naps late in the day can also make it harder to fall asleep at night。' },
    ],
  },
  {
    id: 'toeic-cafeteria-notice',
    title: 'Notice: Changes to the Staff Cafeteria',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "To all employees: Starting Monday, May 6, the staff cafeteria on the second floor will introduce several changes based on the results of last month's survey.",
      "First, the cafeteria will open earlier. Breakfast will now be served from 7:30 a.m., ( A ) of 8:00 a.m., for employees who start work early. Lunch hours will remain the same, from 11:30 a.m. to 2:00 p.m.",
      "Second, a new healthy menu will be added. Each day, at least one dish under 600 calories will be available, and the calorie count of every dish will be shown on the menu board. Vegetarian options will also be offered every day.",
      "Third, payment will become easier. In addition to cash, employees will be able to pay with their ID cards. The amount will be deducted from their monthly salary. Employees who wish to use this service must register at the General Affairs Department ( B ) May 3.",
      "The cafeteria will be closed on Saturday, May 4, so that the new equipment can be installed. We apologize for any inconvenience. Suggestions about the menu are always welcome and can ( C ) placed in the box near the entrance.",
    ],
    ja: [
      '全社員のみなさんへ：5月6日（月）から、2階の社員食堂は、先月のアンケートの結果をもとにいくつかの変更を行います。',
      'まず、食堂の開店時間を早めます。朝早くから仕事を始める社員のために、朝食は午前8時ではなく午前7時30分から出します。昼食の時間は午前11時30分から午後2時までで変わりません。',
      '次に、新しく健康メニューを加えます。毎日少なくとも1品は600キロカロリー以下の料理を用意し、すべての料理のカロリーをメニューボードに表示します。ベジタリアン向けの料理も毎日用意します。',
      'さらに、支払いが簡単になります。現金に加えて、社員証で支払えるようになります。金額は毎月の給料から差し引かれます。このサービスを利用したい社員は、5月3日までに総務部で登録してください。',
      '新しい設備を取りつけるため、5月4日（土）は食堂を閉めます。ご不便をおかけして申し訳ありません。メニューについてのご意見はいつでも歓迎しますので、入り口近くの箱に入れてください。',
    ],
    blanks: [
      { id: 'A', choices: ['instead', 'rather', 'even', 'unless'], answer: 0, why: 'instead of ～ で「～のかわりに」。rather は rather than の形で使い、even・unless のうしろに of は続かない。' },
      { id: 'B', choices: ['by', 'until', 'since', 'during'], answer: 0, why: '「5月3日までに（登録する）」としめ切りを表すのは by。until は「～までずっと」で、1回の登録には使わない。' },
      { id: 'C', choices: ['be', 'being', 'been', 'to be'], answer: 0, why: '助動詞 can のあとは動詞の原形。can be placed で「入れることができる（入れられる）」。' },
    ],
    tf: [
      { statement: '朝食は午前7時30分から出されるようになる。', answer: true, why: '第2段落 Breakfast will now be served from 7:30 a.m.' },
      { statement: '昼食の時間は短くなる。', answer: false, why: '第2段落 Lunch hours will remain the same。' },
      { statement: '5月4日（土）は食堂が閉まる。', answer: true, why: '第5段落 The cafeteria will be closed on Saturday, May 4。' },
    ],
    qa: [
      { q: 'What must employees do to pay with their ID cards?', choices: ['Register at the General Affairs Department by May 3.', 'Fill out a survey at the cafeteria.', 'Pay in cash first.', 'Bring a new ID card on May 6.'], answer: 0, why: '第4段落 must register at the General Affairs Department by May 3。' },
    ],
  },
  {
    id: 'adv-qr-code',
    title: 'From Barcodes to QR Codes',
    level: '難関大（評論）',
    paragraphs: [
      "Every time you buy something at a supermarket, a small pattern of black lines makes the checkout quick and accurate. This pattern, called a barcode, stores a number in the widths of its bars and spaces. When a scanner shines light on it, the reflected pattern is turned into the number, and the computer instantly knows ( A ) product it is and how much it costs. Barcodes began to be used in stores in the 1970s, and they soon spread around the world.",
      "However, ordinary barcodes have a limit: they can hold only a small amount of information. In 1994, engineers at a Japanese company that made parts for cars developed a solution. Their new code stored information both horizontally and vertically in a square pattern of small black and white blocks. It was called the QR code, from the words 'quick response,' because it could be read very fast.",
      "A QR code can hold far more data than a barcode, including website addresses and text. It also has a clever feature: even if part of the code is dirty or damaged, it can often still be read, ( B ) extra information is built into the pattern to correct errors.",
      "Today, QR codes are used for everything from paying in shops to checking in at airports. A tool ( C ) was first designed to track car parts has become part of everyday life.",
    ],
    ja: [
      'スーパーで何かを買うたびに、黒い線の小さな模様がレジでの会計を速く正確にしてくれる。バーコードとよばれるこの模様は、線とすき間の幅に数字をたくわえている。スキャナーが光を当てると、はね返った模様が数字に変えられ、コンピューターはそれがどの商品で、いくらなのかをすぐに知るのである。バーコードは1970年代に店で使われはじめ、すぐに世界中に広まった。',
      'しかし、ふつうのバーコードには限界がある。わずかな情報しかたくわえられないのだ。1994年、自動車の部品を作っていた日本のある会社の技術者たちが、解決策を生み出した。その新しいコードは、小さな白黒のマスを四角くならべた模様の中に、横方向と縦方向の両方で情報をたくわえた。とても速く読みとれることから、「クイック・レスポンス」という言葉からとって QR コードと名づけられた。',
      'QR コードは、ウェブサイトのアドレスや文章をふくめ、バーコードよりもはるかに多くのデータをたくわえられる。また、巧妙な特徴もある。コードの一部が汚れていたりこわれていたりしても、読みとれることが多いのだ。誤りを訂正するための余分な情報が模様の中に組みこまれているからである。',
      '今日、QR コードは店での支払いから空港での搭乗手続きまで、あらゆることに使われている。もともと自動車の部品を追跡するために作られた道具が、毎日の暮らしの一部になったのである。',
    ],
    blanks: [
      { id: 'A', choices: ['which', 'if', 'that', 'whether'], answer: 0, why: 'which ＋名詞（which product）で「どの商品」。knows の目的語になる疑問詞のかたまり。if・that・whether のうしろに名詞 product だけを置いて文を始めることはできない。' },
      { id: 'B', choices: ['because', 'because of', 'despite', 'due to'], answer: 0, why: 'うしろが文（extra information is built into …）なので接続詞 because。because of・despite・due to は前置詞の働きでうしろに文を続けられない。' },
      { id: 'C', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 A tool を説明し、was designed の主語になる関係代名詞 that。what は先行詞をとらず、where のうしろは主語のそろった文、whose のうしろには名詞が必要。' },
    ],
    tf: [
      { statement: 'バーコードは1970年代に店で使われはじめた。', answer: true, why: '第1段落 Barcodes began to be used in stores in the 1970s。' },
      { statement: 'QR コードは、アメリカの自動車会社によって作られた。', answer: false, why: '第2段落 engineers at a Japanese company that made parts for cars。' },
      { statement: 'QR コードは、一部がこわれていても読みとれることが多い。', answer: true, why: '第3段落 even if part of the code is dirty or damaged, it can often still be read。' },
    ],
    qa: [
      { q: 'Why was the code named "QR"?', choices: ['Because it could be read very quickly.', 'Because it was square and red.', 'Because it was first used in Queensland.', 'Because it stored questions and replies.'], answer: 0, why: '第2段落 It was called the QR code, from the words "quick response," because it could be read very fast。' },
    ],
  },
  {
    id: 'adv-escalator',
    title: 'Walk or Stand on the Escalator?',
    level: '難関大（評論）',
    paragraphs: [
      "In many cities, there is an unwritten rule on escalators: people who want to stand keep to one side, leaving the other side open for those in a hurry. Interestingly, the side differs from place to place. In some cities, people stand on the left, while in others, they stand on the right.",
      "Recently, however, railway companies in several countries have been asking passengers to stand on both sides and not to walk. The main reason is safety. Escalators are not designed for walking, and people who rush up the steps can trip or bump into others. Older people and those ( A ) cannot hold the handrail on one side because of an injury may also feel uncomfortable standing in a fixed position.",
      "Surprisingly, standing on both sides may also move more people. Tests at some busy stations have shown that on long escalators, few people actually choose to walk. As a result, the walking side is often half empty while a long line forms for the standing side. When everyone stands, the escalator carries ( B ) people overall, and the line at the bottom becomes shorter.",
      "Changing a long-standing habit is not easy, and many passengers still walk out of habit. Even so, some stations have reported gradual progress by ( C ) up signs and making repeated announcements.",
    ],
    ja: [
      '多くの都市で、エスカレーターには暗黙のルールがある。立って乗りたい人は片側に寄り、急いでいる人のためにもう片側を空けておくのだ。おもしろいことに、その側は場所によってちがう。左側に立つ都市もあれば、右側に立つ都市もある。',
      'しかし最近、いくつかの国の鉄道会社は、乗客に両側に立って歩かないようにとよびかけている。おもな理由は安全である。エスカレーターは歩くように設計されておらず、段をかけ上がる人はつまずいたり、ほかの人にぶつかったりすることがある。高齢の人や、けがのせいで片側の手すりをつかめない人も、決まった位置に立つことに不安を感じるかもしれない。',
      'おどろいたことに、両側に立つほうが、より多くの人を運べるかもしれない。混雑するいくつかの駅での試験では、長いエスカレーターでは、実際に歩くことをえらぶ人は少ないことがわかった。その結果、歩く側はしばしば半分空いているのに、立つ側には長い列ができる。全員が立つと、エスカレーターは全体としてより多くの人を運び、下の列は短くなるのである。',
      '長年の習慣を変えるのは簡単ではなく、多くの乗客はいまも習慣で歩いている。それでも、表示をかかげたり、くり返し案内放送をしたりすることで、少しずつ成果が出ていると報告している駅もある。',
    ],
    blanks: [
      { id: 'A', choices: ['who', 'whom', 'whose', 'which'], answer: 0, why: '先行詞 those（人）を説明し、cannot hold の主語になる関係代名詞 who。whom は目的語、whose のうしろには名詞が必要、which は物に使う。' },
      { id: 'B', choices: ['more', 'much', 'very', 'a lot'], answer: 0, why: '可算名詞 people の前で「より多くの」を表す比較級 more。much は数えられない名詞に使い、very は名詞を修飾できず、a lot は a lot of の形が必要。' },
      { id: 'C', choices: ['putting', 'put', 'puts', 'to put'], answer: 0, why: '前置詞 by のあとは動名詞。by ～ing で「～することによって」。put up a sign で「表示をかかげる」。' },
    ],
    tf: [
      { statement: 'エスカレーターで立つ側は、どこでも同じである。', answer: false, why: '第1段落 the side differs from place to place。' },
      { statement: '鉄道会社が両側に立つようよびかける主な理由は安全である。', answer: true, why: '第2段落 The main reason is safety。' },
      { statement: '長いエスカレーターでは、歩くことをえらぶ人が多い。', answer: false, why: '第3段落 on long escalators, few people actually choose to walk。' },
    ],
    qa: [
      { q: 'Why can standing on both sides move more people?', choices: ['Few people walk, so the walking side is often half empty.', 'Escalators move faster when people stand.', 'People take up less space when walking.', 'Stations add more escalators.'], answer: 0, why: '第3段落 few people actually choose to walk … the walking side is often half empty。' },
    ],
  },
  {
    id: 'adv-tipping',
    title: 'Should We Tip?',
    level: '難関大（評論）',
    paragraphs: [
      "Travelers are often confused by the custom of tipping. In some countries, customers are expected to leave an extra fifteen to twenty percent of the bill for restaurant staff, and failing to do so is considered rude. In others, such as Japan, tipping is rare, and an attempt to leave extra money may even cause embarrassment.",
      "Supporters of tipping argue that it rewards good service. Because servers' income depends partly on customers' satisfaction, they have a reason to be attentive and friendly. Some customers also enjoy being able to show their appreciation ( A ) a way that feels personal.",
      "Critics, however, point out several problems. In places where tips make up a large part of workers' pay, their income can change greatly from week to week, ( B ) makes it hard to plan their lives. Studies have also suggested that the size of a tip often depends less on the quality of the service than on factors such as the weather or the customer's mood. As a result, workers may be paid unfairly for the same effort.",
      "For these reasons, some restaurants have replaced tipping with higher menu prices and fixed wages. Whether this approach will spread remains to be seen. What is clear is that a small custom ( C ) many people never think about raises large questions about fairness and the value of work.",
    ],
    ja: [
      '旅行者はしばしばチップの習慣にとまどう。国によっては、客は飲食店の従業員のために請求額の15〜20パーセントを余分に置いていくことが期待され、そうしないと失礼だと考えられる。日本のような国ではチップはめったになく、余分なお金を置こうとすると、相手を困らせてしまうことさえある。',
      'チップを支持する人々は、それがよいサービスに報いると主張する。給仕係の収入の一部が客の満足度にかかっているので、彼らには気配りがよく親しみやすくする理由がある。個人的だと感じられる方法で感謝を示せることを楽しむ客もいる。',
      'しかし批判する人々は、いくつかの問題を指摘する。チップが働く人の給料の大部分をしめる場所では、収入が週ごとに大きく変わることがあり、そのせいで生活の計画を立てにくくなる。また研究によると、チップの額はサービスの質よりも、天気や客の気分のような要因によって決まることが多いらしい。その結果、同じ努力に対して不公平な支払いを受けることがある。',
      'こうした理由から、チップのかわりにメニューの値段を上げ、決まった給料を払うようにしたレストランもある。このやり方が広まるかどうかは、まだわからない。はっきりしているのは、多くの人が考えたこともない小さな習慣が、公平さや働くことの価値についての大きな問いを投げかけているということである。',
    ],
    blanks: [
      { id: 'A', choices: ['in', 'by', 'at', 'on'], answer: 0, why: 'in a way that ～ で「～な方法で」。方法・やり方を表す way の前は in。' },
      { id: 'B', choices: ['which', 'what', 'that', 'it'], answer: 0, why: 'コンマのあとで前の内容（収入が大きく変わること）を受ける非制限用法の which。that は非制限用法で使えず、what は先行詞をとらず、it では文をつなげない。' },
      { id: 'C', choices: ['that', 'what', 'whose', 'where'], answer: 0, why: '先行詞 a small custom を説明し、think about の目的語が欠けたかたまりを作る関係代名詞 that。what は先行詞をとらず、whose のうしろには名詞が必要、where のうしろは欠けたところのない文。' },
    ],
    underline: {
      phrase: 'remains to be seen',
      choices: ['is not known yet', 'has already been decided', 'cannot be seen clearly', 'is clearly impossible'],
      answer: 0,
      why: 'remain to be seen は「まだわからない・今後を見なければならない」。',
    },
    order: {
      words: ['the', 'size', 'of', 'a', 'tip', 'often', 'depends', 'less'],
      rest: 'on the quality of the service.',
      answer: 'the size of a tip often depends less',
      ja: 'チップの額は、サービスの質によって決まる度合いが小さいことが多い。（depend less on A than on B＝A より B による）',
    },
    tf: [
      { statement: '日本ではチップはめったにない。', answer: true, why: '第1段落 In others, such as Japan, tipping is rare。' },
      { statement: '研究によれば、チップの額はおもにサービスの質で決まる。', answer: false, why: '第3段落 depends less on the quality of the service than on factors such as the weather。' },
      { statement: 'チップのかわりに決まった給料を払うようにしたレストランもある。', answer: true, why: '第4段落 some restaurants have replaced tipping with higher menu prices and fixed wages。' },
    ],
    qa: [
      { q: 'Why can tipping make it hard for workers to plan their lives?', choices: ['Their income can change greatly from week to week.', 'They have to work longer hours.', 'Customers never leave tips.', 'Menu prices are too high.'], answer: 0, why: '第3段落 their income can change greatly from week to week, which makes it hard to plan their lives。' },
    ],
  },
  {
    id: 'adv-automation-paradox',
    title: 'The Paradox of Automation',
    level: '難関大（評論）',
    paragraphs: [
      "Automation is meant to make our lives safer and easier. Modern airplanes can fly themselves for most of a journey, and many cars can now keep their lane and brake on their own. Yet researchers have noticed a strange problem, often called the paradox of automation: the more reliable an automated system becomes, the less prepared humans are to take over ( A ) it fails.",
      "The reason is simple. Skills that are not practiced fade. A pilot who rarely flies the plane by hand may find it difficult to do so in an emergency, precisely when manual flying matters most. Moreover, people who spend long periods simply watching a machine tend to lose attention. Monitoring a system that almost never goes wrong ( B ), after all, extremely boring.",
      "This does not mean that automation should be avoided. On the whole, it has greatly reduced accidents and errors. Rather, the paradox suggests that the role of humans must be designed as carefully as the machines themselves. Some airlines, for example, require pilots to practice manual flying regularly, and some car makers check whether drivers are still paying attention.",
      "The lesson extends beyond transport. As we rely more on calculators, navigation apps, and translation software, we may want to ask which skills we can safely hand over to machines and which we should keep ( C ) alive ourselves.",
    ],
    ja: [
      '自動化は、私たちの生活をより安全に、より楽にするためのものである。現代の飛行機は飛行のほとんどを自動で行うことができ、いまでは多くの車が自分で車線を保ち、ブレーキをかけることができる。しかし研究者たちは、しばしば「自動化のパラドックス」とよばれる奇妙な問題に気づいている。自動化されたシステムが信頼できるものになればなるほど、それが故障したときに人間が引き継ぐ準備ができていなくなる、というものだ。',
      'その理由は単純だ。練習しない技術はおとろえる。めったに手動で飛行機を操縦しないパイロットは、緊急時に、つまりまさに手動の操縦がもっとも重要なときに、それがむずかしいと感じるかもしれない。さらに、長い時間ただ機械を見ているだけの人は、注意力を失いがちである。ほとんど故障しないシステムを見守るのは、なんといっても、ひどく退屈なのだ。',
      'これは、自動化をさけるべきだという意味ではない。全体として見れば、自動化は事故やまちがいを大きく減らしてきた。むしろこのパラドックスは、人間の役割も機械そのものと同じくらい注意深く設計しなければならないことを示している。たとえば、パイロットに定期的に手動の操縦を練習させる航空会社もあれば、運転する人がまだ注意を向けているかを確認する自動車メーカーもある。',
      'この教訓は交通にとどまらない。電卓やナビアプリや翻訳ソフトにますますたよるようになるにつれて、どの技術なら安全に機械にまかせられ、どの技術は自分で生かし続けるべきかを問う必要があるのかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['when', 'which', 'what', 'during'], answer: 0, why: 'うしろが完全な文（it fails）で「～するときに」を表す接続詞 when。which・what のうしろは欠けた文になり、during は前置詞なので文を続けられない。' },
      { id: 'B', choices: ['is', 'are', 'being', 'to be'], answer: 0, why: '主語は動名詞のかたまり Monitoring a system … （単数あつかい）なので is。after all は「なんといっても」。' },
      { id: 'C', choices: ['them', 'it', 'they', 'their'], answer: 0, why: 'keep them alive で「それら（の技術）を生かし続ける」。which が指す skills は複数なので them。it は単数、they は主語の形、their は所有格で目的語になれない。' },
    ],
    underline: {
      phrase: 'take over',
      choices: ['take control', 'go home', 'give up', 'look around'],
      answer: 0,
      why: 'take over は「（仕事・操作を）引き継ぐ」。システムが故障したときに人間が操作を引き継ぐ、という意味。',
    },
    order: {
      words: ['skills', 'that', 'are', 'not', 'practiced', 'fade'],
      rest: '',
      answer: 'skills that are not practiced fade',
      ja: '練習されない技術はおとろえる。（that は主格の関係代名詞。主語は skills that are not practiced）',
    },
    tf: [
      { statement: '自動化のパラドックスとは、システムが信頼できるほど人間が引き継ぐ準備ができなくなることだ。', answer: true, why: '第1段落 the more reliable an automated system becomes, the less prepared humans are to take over。' },
      { statement: '筆者は、自動化はさけるべきだと主張している。', answer: false, why: '第3段落 This does not mean that automation should be avoided。' },
      { statement: 'パイロットに定期的に手動の操縦を練習させる航空会社もある。', answer: true, why: '第3段落 Some airlines … require pilots to practice manual flying regularly。' },
    ],
    qa: [
      { q: 'Why might a pilot find manual flying difficult in an emergency?', choices: ['Because skills that are not practiced fade.', 'Because planes cannot be flown by hand.', 'Because emergencies never happen.', 'Because automation increases accidents.'], answer: 0, why: '第2段落 Skills that are not practiced fade。' },
    ],
  },
  {
    id: 'native-phone-free',
    title: 'Two Days Without My Phone',
    level: '難関大（評論）',
    paragraphs: [
      "Last month, on a whim, I locked my phone in a drawer on Friday night and promised myself I wouldn't touch it until Monday morning. I told my family and close friends in advance, partly so they wouldn't panic and partly so I couldn't back out.",
      "The first few hours were rough. I kept reaching for my pocket, and every time I sat down, my hand went looking for something to scroll. I hadn't realized how often I checked my phone out of pure habit, not ( A ) I actually needed anything. By Saturday afternoon, though, the itch had mostly worn off.",
      "What surprised me most was how long the weekend felt. Without the constant stream of notifications, the hours stretched out. I finished a novel I had been meaning to read for months, cooked a proper dinner instead of grabbing takeout, and went for a long walk without once wondering what I was missing online. I even struck up a conversation with a neighbor I'd been nodding to for years.",
      "I'm not going to pretend I've given up my phone for good. It's far too useful for that. But I now leave it in another room when I'm eating or reading, and I've turned off almost all notifications. If you've ever felt that your phone is running your life rather than the other way around, I'd recommend ( B ) it a try. You might be surprised by how much time you ( C ) back.",
    ],
    ja: [
      '先月、思いつきで、金曜の夜にスマホを引き出しにしまってかぎをかけ、月曜の朝までさわらないと自分に約束した。家族と親しい友人には前もって伝えておいた。ひとつにはみんなをあわてさせないため、ひとつには自分が途中でやめられないようにするためだ。',
      '最初の数時間はつらかった。ついポケットに手がのび、座るたびに、手がスクロールするものを探してしまうのだ。実際に何かが必要だったからではなく、ただの習慣でどれほどしょっちゅうスマホを見ていたか、それまで気づいていなかった。それでも、土曜の午後には、そのむずむずした感じはほとんどおさまっていた。',
      'いちばんおどろいたのは、週末がとても長く感じられたことだ。たえまなく届く通知がないと、時間がのびていった。何か月も読もうと思っていた小説を読み終え、テイクアウトですませるかわりにちゃんとした夕食を作り、ネットで何を見のがしているかを一度も気にせずに長い散歩に出かけた。何年も会釈するだけだった近所の人と話しこみさえした。',
      'スマホを永久にやめたふりをするつもりはない。そうするには便利すぎるのだ。でも今は、食事や読書のときは別の部屋に置いておき、通知もほとんど切ってある。もし、自分がスマホを使っているのではなくスマホに生活を動かされていると感じたことがあるなら、ためしてみることをすすめたい。どれほど多くの時間を取りもどせるか、おどろくかもしれない。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'because of', 'despite', 'due to'], answer: 0, why: 'not A but … の形で「～だからではなく」。うしろが文（I actually needed anything）なので接続詞 because。because of・despite・due to は前置詞の働きでうしろに文を続けられない。' },
      { id: 'B', choices: ['giving', 'give', 'to giving', 'gave'], answer: 0, why: 'recommend は（人を入れないとき）動名詞を目的語にとる。give it a try で「ためしてみる」。' },
      { id: 'C', choices: ['get', 'getting', 'to get', 'gotten'], answer: 0, why: 'how much time you get back で「どれほどの時間を取りもどすか」。主語 you に続く動詞の現在形 get。' },
    ],
    tf: [
      { statement: '筆者は、スマホを使わないことを前もって家族や友人に伝えた。', answer: true, why: '第1段落 I told my family and close friends in advance。' },
      { statement: '筆者によれば、週末はとても短く感じられた。', answer: false, why: '第3段落 What surprised me most was how long the weekend felt。' },
      { statement: '筆者は今では、スマホを永久に使わなくなった。', answer: false, why: '第4段落 I\'m not going to pretend I\'ve given up my phone for good。' },
    ],
    qa: [
      { q: 'What does the writer do differently now?', choices: ['Leaves the phone in another room while eating or reading.', 'Uses the phone only on weekends.', 'Has stopped reading novels.', 'Checks notifications more often.'], answer: 0, why: '第4段落 I now leave it in another room when I\'m eating or reading。' },
    ],
  },
  {
    id: 'toeic-fire-drill',
    title: 'Notice: Fire Drill on Thursday',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "To all tenants of the Riverside Office Tower: A fire drill will be held on Thursday, October 17, at 10:30 a.m. All employees in the building are required to take part.",
      "When the alarm sounds, please stop what you are doing, leave your belongings at your desk, and walk calmly to the nearest emergency exit. Do not use the elevators ( A ) any circumstances. Staff members wearing orange vests will guide you down the stairs and out to the parking lot behind the building.",
      "Once outside, please gather with the other members of your company at the area marked with your company's name. Each company's safety officer will check that everyone is present and report to the building manager. The drill is expected to last about twenty minutes.",
      "Visitors who are in the building at the time of the drill should follow the instructions of the staff. Employees ( B ) cannot use the stairs because of an injury or disability should inform their safety officer by Tuesday, so that special arrangements can be made.",
      "Thank you for your cooperation. Regular drills help ensure that everyone knows ( C ) to do in a real emergency. Building Management Office",
    ],
    ja: [
      'リバーサイド・オフィスタワーの入居者のみなさまへ：10月17日（木）午前10時30分に避難訓練を行います。ビル内のすべての従業員は参加してください。',
      '警報が鳴ったら、作業をやめ、持ち物は机に置いたまま、最寄りの非常口へ落ち着いて歩いてください。どのような場合でもエレベーターは使わないでください。オレンジ色のベストを着た係員が、階段を下りてビルの裏の駐車場まで誘導します。',
      '外に出たら、自社の名前が表示された場所に、同じ会社の人たちと集まってください。各社の安全担当者が全員そろっているかを確認し、ビルの管理者に報告します。訓練はおよそ20分かかる予定です。',
      '訓練の時間にビル内にいる来訪者は、係員の指示に従ってください。けがや障がいのために階段を使えない従業員は、特別な手配ができるよう、火曜日までに安全担当者に知らせてください。',
      'ご協力ありがとうございます。定期的な訓練は、本当の緊急時に何をすべきかを全員が確実にわかっているようにするのに役立ちます。ビル管理事務所',
    ],
    blanks: [
      { id: 'A', choices: ['under', 'on', 'at', 'with'], answer: 0, why: 'under any circumstances で「どんな状況でも」（否定文で「決して～ない」）。circumstances の前は under。' },
      { id: 'B', choices: ['who', 'whom', 'whose', 'which'], answer: 0, why: '先行詞 Employees（人）を説明し、cannot use の主語になる関係代名詞 who。whom は目的語、whose のうしろには名詞が必要、which は物に使う。' },
      { id: 'C', choices: ['what', 'that', 'if', 'whether'], answer: 0, why: '疑問詞＋to 不定詞 what to do「何をすべきか」。do の目的語が欠けているので what。that・if は to 不定詞を続けられず、whether to do では do の目的語が欠けたままになる。' },
    ],
    tf: [
      { statement: '避難訓練では、エレベーターを使ってもよい。', answer: false, why: '第2段落 Do not use the elevators under any circumstances。' },
      { statement: '訓練はおよそ20分かかる予定だ。', answer: true, why: '第3段落 The drill is expected to last about twenty minutes。' },
      { statement: '階段を使えない従業員は、火曜日までに安全担当者に知らせる。', answer: true, why: '第4段落 should inform their safety officer by Tuesday。' },
    ],
    qa: [
      { q: 'Where should employees gather after leaving the building?', choices: ['At the area marked with their company\'s name.', 'In the lobby near the elevators.', 'At their desks.', 'In the building manager\'s office.'], answer: 0, why: '第3段落 gather with the other members of your company at the area marked with your company\'s name。' },
    ],
  },
  {
    id: 'adv-reminiscence-bump',
    title: 'Why the Songs of Our Youth Stay with Us',
    level: '難関大（評論）',
    paragraphs: [
      "Ask older adults to describe the most memorable events of their lives, and something interesting happens. A surprisingly large share of the memories they mention come from roughly the ages of ten to thirty. Psychologists call this pattern the 'reminiscence bump.' The same pattern appears when people are asked about their favorite songs, books, and films: many of them date from their teens and early twenties.",
      "Several explanations have been offered. One is that this period is full of 'firsts': the first day at a new school, the first job, the first time living away from home. New experiences tend to be stored more vividly than routine ones, ( A ) they stand out from everyday life.",
      "Another explanation focuses on identity. During adolescence and early adulthood, people are forming a sense of who they are. Memories from this time become part of the life story they tell about themselves, and they are recalled and retold ( B ) often that they become especially strong.",
      "The reminiscence bump may explain why a song from high school can instantly bring back the smell of a classroom or the face of an old friend. It also suggests something hopeful for young people today: the experiences they are having now may well become ( C ) they treasure most decades from now.",
    ],
    ja: [
      '高齢の人に人生でもっとも心に残る出来事をあげてもらうと、興味深いことが起こる。あげられる思い出のおどろくほど多くが、だいたい10歳から30歳ごろのものなのだ。心理学者はこのパターンを「レミニセンス・バンプ」とよんでいる。同じパターンは、好きな歌や本や映画をたずねたときにも見られ、その多くは10代から20代前半のころのものである。',
      'いくつかの説明が示されている。1つは、この時期が「はじめて」に満ちているということだ。新しい学校の初日、はじめての仕事、はじめての一人暮らし。新しい経験は、日々の生活の中で目立つので、決まりきった経験よりも鮮やかに記憶されやすい。',
      'もう1つの説明は、アイデンティティに注目する。思春期から大人になりはじめのころ、人は自分がだれなのかという感覚をつくっている。この時期の記憶は、自分について語る人生の物語の一部になり、何度も思い出され語り直されるので、とりわけ強くなるのである。',
      'レミニセンス・バンプは、高校時代の歌が、教室のにおいや昔の友だちの顔を一瞬でよみがえらせる理由を説明しているのかもしれない。それはまた、今の若い人たちにとって希望のあることも示している。彼らがいましている経験は、何十年もたってから、いちばん大切にするものになるかもしれないのだ。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'despite', 'because of', 'instead of'], answer: 0, why: 'うしろが文（they stand out from everyday life）なので接続詞 because。despite・because of・instead of は前置詞の働きで文を続けられない。' },
      { id: 'B', choices: ['so', 'such', 'too', 'very'], answer: 0, why: 'so ＋副詞（often）＋ that … で「とても～なので…」。such は名詞の前、too・very は that と組めない。' },
      { id: 'C', choices: ['what', 'that', 'which', 'those'], answer: 0, why: 'become の補語で、treasure の目的語が欠けたかたまり「いちばん大切にするもの」を作る関係代名詞 what。that・which は先行詞が必要で、those のうしろに主語と動詞を直接続けられない。' },
    ],
    underline: {
      phrase: 'stand out from everyday life',
      choices: ['are clearly different from ordinary days', 'happen outside the house', 'are forgotten quickly', 'make everyday life boring'],
      answer: 0,
      why: 'stand out from ～ は「～の中で目立つ・きわだつ」。ふだんの日々とはっきりちがうので記憶に残る、という意味。',
    },
    order: {
      words: ['tend', 'to', 'be', 'stored', 'more', 'vividly', 'than', 'routine', 'ones'],
      rest: '',
      answer: 'tend to be stored more vividly than routine ones',
      ja: '（新しい経験は）決まりきった経験よりも鮮やかに記憶されやすい。（tend to ～＝～しがちだ、受け身 be stored）',
    },
    tf: [
      { statement: 'レミニセンス・バンプによれば、思い出の多くはだいたい10歳から30歳ごろのものだ。', answer: true, why: '第1段落 come from roughly the ages of ten to thirty。' },
      { statement: '筆者によれば、決まりきった経験は新しい経験より鮮やかに記憶される。', answer: false, why: '第2段落 New experiences tend to be stored more vividly than routine ones。' },
      { statement: '好きな歌や本も、10代から20代前半のころのものが多い。', answer: true, why: '第1段落 many of them date from their teens and early twenties。' },
    ],
    qa: [
      { q: 'According to the identity explanation, why are memories from this period strong?', choices: ['They become part of the life story people tell and are retold often.', 'People have more free time when they are young.', 'Young people listen to more music.', 'Older adults forget recent events.'], answer: 0, why: '第3段落 Memories from this time become part of the life story … recalled and retold so often。' },
    ],
  },
  {
    id: 'adv-loss-aversion',
    title: 'Why Losing Hurts More Than Winning Feels Good',
    level: '難関大（評論）',
    paragraphs: [
      "Imagine finding a 1,000-yen note on the street. You would probably feel pleased. Now imagine losing a 1,000-yen note from your pocket. Many people say the second experience would upset them more than the first would please them, even though the amount of money is exactly the same. Researchers call this tendency 'loss aversion.'",
      "Loss aversion helps explain many everyday behaviors. Shops know that customers react strongly to the idea of missing out, so they advertise offers as 'only until Sunday' or 'while stocks last.' People also tend to keep things they no longer use, ( A ) throwing them away feels like a loss. In experiments, participants often demanded more money to give up an object they had just been given than they were willing to pay to buy the same object.",
      "Some scientists have suggested that this tendency once helped our ancestors survive. For people living close to the edge, losing food or shelter could be far more dangerous than gaining a little extra was helpful.",
      "Being aware of loss aversion can help us make better decisions. When we feel reluctant to change, it may be worth asking whether we are judging the options fairly or simply fearing the loss of ( B ) we already have. Sometimes the small risk of losing is ( C ) taking for a much larger gain.",
    ],
    ja: [
      '道で1000円札を拾ったと想像してみよう。おそらくうれしく感じるだろう。今度は、ポケットから1000円札を落としたと想像してみよう。多くの人は、金額はまったく同じなのに、あとの経験のほうが、前の経験がうれしいよりもずっといやだと言う。研究者はこの傾向を「損失回避」とよんでいる。',
      '損失回避は、日々の多くのふるまいを説明する助けになる。店は、客がのがすという考えに強く反応することを知っているので、特売を「日曜日まで」や「在庫がなくなりしだい終了」と宣伝する。人はまた、もう使わない物をとっておきがちだ。捨てることが損失のように感じられるからである。実験では、参加者は、もらったばかりの物を手放すのに、同じ物を買うために払ってもよいと思う額よりも多くのお金を求めることが多かった。',
      'この傾向は、かつて私たちの祖先が生きのびる助けになったのではないかと考える科学者もいる。ぎりぎりの暮らしをしていた人々にとって、食べ物やすみかを失うことは、少し余分に手に入れることが役に立つよりも、はるかに危険だったのかもしれない。',
      '損失回避を意識することは、よりよい決定をする助けになる。変化をためらうとき、選択肢を公平に判断しているのか、それともすでにもっているものを失うことをただおそれているだけなのかを自問してみる価値がある。ときには、ずっと大きな利益のためなら、失う小さな危険はおかす価値があるのだ。',
    ],
    blanks: [
      { id: 'A', choices: ['because', 'because of', 'despite', 'in spite of'], answer: 0, why: 'うしろが文（throwing them away feels like a loss）なので接続詞 because。because of・despite・in spite of は前置詞の働きで文を続けられない。' },
      { id: 'B', choices: ['what', 'that', 'which', 'whose'], answer: 0, why: '前置詞 of の目的語で、have の目的語が欠けたかたまり「すでにもっているもの」を作る関係代名詞 what。that は前置詞のあとに置けず、which は先行詞が必要、whose のうしろには名詞が必要。' },
      { id: 'C', choices: ['worth', 'worthy', 'value', 'valuable'], answer: 0, why: 'be worth ～ing で「～する価値がある」。worth は前置詞のように動名詞 taking を目的語にとる。worthy は worthy of の形、value は名詞・動詞、valuable は形容詞で -ing を続けられない。' },
    ],
    underline: {
      phrase: 'people living close to the edge',
      choices: ['people who had barely enough to survive', 'people who lived near high cliffs', 'people who were very brave', 'people who lived by the sea'],
      answer: 0,
      why: 'close to the edge は「（生活が）ぎりぎりの状態で」。直後の losing food or shelter could be far more dangerous から、生きるのにやっとの人々を指す。',
    },
    order: {
      words: ['losing', 'food', 'or', 'shelter', 'could', 'be', 'far', 'more', 'dangerous'],
      rest: 'than gaining a little extra was helpful.',
      answer: 'losing food or shelter could be far more dangerous',
      ja: '食べ物やすみかを失うことは、少し余分に手に入れることが役に立つよりも、はるかに危険だったかもしれない。（動名詞 losing ～ が主語・far ＋比較級）',
    },
    tf: [
      { statement: '損失回避とは、同じ額でも失うほうが得るより強く感じられる傾向だ。', answer: true, why: '第1段落 the second experience would upset them more than the first would please them … loss aversion。' },
      { statement: '実験では、参加者は物を手放すのに、それを買う額より少ないお金で満足した。', answer: false, why: '第2段落 demanded more money to give up an object … than they were willing to pay。' },
      { statement: '筆者は、損失回避を意識することはよりよい決定の助けになると考えている。', answer: true, why: '第4段落 Being aware of loss aversion can help us make better decisions。' },
    ],
    qa: [
      { q: 'Why do shops advertise offers as "only until Sunday"?', choices: ['Because customers react strongly to the idea of missing out.', 'Because shops are closed on Sundays.', 'Because customers prefer to shop on weekends.', 'Because prices always rise on Monday.'], answer: 0, why: '第2段落 customers react strongly to the idea of missing out。' },
    ],
  },
  {
    id: 'exam-paper-plane',
    title: 'The Paper Airplane Contest',
    level: '高校入試（体験文）',
    paragraphs: [
      "Last fall, our science teacher held a paper airplane contest. The rule was simple: each student could use only one sheet of paper, and the plane that flew the farthest would win. At first, I thought it would be easy. However, my first plane fell to the floor after ( A ) two meters.",
      "I decided to study why some planes fly better than others. I learned that the shape of the wings and the balance of the plane are very important. If the front is too light, the plane goes up quickly and then falls. So I folded the front part a few more times to make it heavier.",
      "On the day of the contest, my plane flew almost fifteen meters. It did not win first prize, but it came in third. More importantly, I learned that ( B ) why something fails is the first step to making it better. Now I am interested in how real airplanes fly, and I want to learn more ( C ) science in high school.",
    ],
    ja: [
      '去年の秋、理科の先生が紙飛行機コンテストを開きました。ルールは簡単で、生徒はそれぞれ紙を1枚しか使えず、いちばん遠くまで飛んだ飛行機が優勝です。最初は簡単だと思っていました。しかし、私の最初の飛行機はわずか2メートルで床に落ちてしまいました。',
      '私は、なぜよく飛ぶ飛行機とそうでない飛行機があるのかを調べることにしました。つばさの形と飛行機のバランスがとても大切だとわかりました。前が軽すぎると、飛行機はすぐに上がって、それから落ちてしまいます。そこで、前の部分をさらに何回か折って重くしました。',
      'コンテストの日、私の飛行機はほぼ15メートル飛びました。1位にはなれませんでしたが、3位に入りました。それより大切なのは、なぜ何かがうまくいかないのかを知ることが、それをよくするための第一歩だと学んだことです。今、私は本物の飛行機がどうやって飛ぶのかに興味があり、高校で理科についてもっと学びたいと思っています。',
    ],
    blanks: [
      { id: 'A', choices: ['only', 'alone', 'single', 'once'], answer: 0, why: 'only ＋数量で「わずか～・たった～」。after only two meters「わずか2メートルで」。alone・single・once は数量の前に置いてこの意味にならない。' },
      { id: 'B', choices: ['knowing', 'know', 'knew', 'known'], answer: 0, why: 'that 節の主語になる動名詞 knowing「知ること」。knowing why something fails がまとまって主語。' },
      { id: 'C', choices: ['about', 'to', 'at', 'into'], answer: 0, why: 'learn about ～「～について学ぶ」。to・at・into は learn more と結びつかない。' },
    ],
    tf: [
      { statement: 'コンテストでは、紙を何枚でも使うことができた。', answer: false, why: '第1段落 each student could use only one sheet of paper。' },
      { statement: '筆者は飛行機の前の部分を重くした。', answer: true, why: '第2段落 I folded the front part a few more times to make it heavier。' },
      { statement: '筆者の飛行機は1位になった。', answer: false, why: '第3段落 It did not win first prize, but it came in third。' },
    ],
    qa: [
      { q: 'What did the writer learn from the contest?', choices: ['Knowing why something fails is the first step to improving it.', 'Paper airplanes cannot fly far.', 'Science is too difficult.', 'Winning first prize is the most important thing.'], answer: 0, why: '第3段落 knowing why something fails is the first step to making it better。' },
    ],
  },
  {
    id: 'exam-library-volunteer',
    title: 'Reading to Children at the Library',
    level: '高校入試（体験文）',
    paragraphs: [
      "Every Saturday morning, I volunteer at the city library. My job is to read picture books to small children. When I started, I was very nervous because I had never read aloud to anyone ( A ) my little sister.",
      "On my first day, I read a story about a lost bear. I read too quickly, and the children soon started talking to each other. After that, the librarian gave me some advice. She told me to read slowly, change my voice for each character, and show the pictures to everyone.",
      "The next week, I tried her advice. When I used a low voice for the big bear, the children laughed. When the bear finally found his home, a small girl clapped her hands. After the story, she asked me, 'Will you read another one next week?' I was so happy ( B ) I almost cried.",
      "Through this experience, I learned that reading aloud is not just reading words. It is a way of sharing feelings with others. I want to keep ( C ) this activity next year, too.",
    ],
    ja: [
      '毎週土曜日の朝、私は市の図書館でボランティアをしています。私の仕事は小さな子どもたちに絵本を読むことです。始めたときは、妹以外のだれにも声に出して読んであげたことがなかったので、とても緊張しました。',
      '最初の日、私は迷子のクマのお話を読みました。速く読みすぎて、子どもたちはすぐにおたがいに話しはじめてしまいました。そのあと、図書館の司書さんがアドバイスをくれました。ゆっくり読むこと、登場人物ごとに声を変えること、そして絵をみんなに見せることを教えてくれたのです。',
      '次の週、私はそのアドバイスをためしました。大きなクマのところで低い声を使うと、子どもたちは笑いました。クマがついに家を見つけると、小さな女の子が手をたたきました。お話のあと、その子は「来週もまた読んでくれる？」とたずねました。私はとてもうれしくて、泣きそうになりました。',
      'この経験を通して、声に出して読むことは、ただ言葉を読むことではないと学びました。それはほかの人と気持ちを分かちあう方法なのです。来年もこの活動を続けたいと思っています。',
    ],
    blanks: [
      { id: 'A', choices: ['except', 'unless', 'during', 'among'], answer: 0, why: 'anyone except ～「～以外のだれにも」。unless のうしろには文が必要で、during・among は意味が合わない。' },
      { id: 'B', choices: ['that', 'what', 'which', 'whose'], answer: 0, why: 'so ～ that …「とても～なので…」。前に so happy があるので that。' },
      { id: 'C', choices: ['doing', 'do', 'to do', 'done'], answer: 0, why: 'keep ～ing「～し続ける」。keep のあとは動名詞。' },
    ],
    tf: [
      { statement: '筆者は毎週土曜日の朝に図書館でボランティアをしている。', answer: true, why: '第1段落 Every Saturday morning, I volunteer at the city library。' },
      { statement: '最初の日、子どもたちは静かに話を聞いていた。', answer: false, why: '第2段落 the children soon started talking to each other。' },
      { statement: '司書さんは、ゆっくり読むようにとアドバイスした。', answer: true, why: '第2段落 She told me to read slowly。' },
    ],
    qa: [
      { q: 'What did the writer learn through this experience?', choices: ['Reading aloud is a way of sharing feelings.', 'Children do not like picture books.', 'Reading quickly is the best way.', 'Librarians should read to children.'], answer: 0, why: '第4段落 It is a way of sharing feelings with others。' },
    ],
  },
  {
    id: 'toeic-system-maintenance',
    title: 'Email: Ordering System Maintenance',
    level: '難関大（メール文）',
    paragraphs: [
      "Dear colleagues, This is to let you know that our online ordering system will be unavailable from 9:00 p.m. on Friday, November 8, ( A ) 6:00 a.m. on Saturday, November 9. During this time, our technical team will install new software that will make the system faster and more secure.",
      "Customers will not be able to place orders online while the work is being done. If a customer calls to place an order during this period, please write down the details and enter them into the system ( B ) it is available again.",
      "Please make sure that all your work ( C ) before 8:45 p.m. on Friday. Anything you have not saved by then may be lost. Printers and email will not be affected.",
      "If you have any questions, please contact the IT help desk at extension 204. We apologize for any inconvenience and thank you for your patience. Mark Ellis, IT Department",
    ],
    ja: [
      'みなさまへ。オンライン注文システムが、11月8日（金）午後9時から11月9日（土）午前6時まで使えなくなることをお知らせします。この間に技術チームが、システムをより速く、より安全にする新しいソフトウェアを導入します。',
      '作業中、お客さまはオンラインで注文できません。この時間にお客さまから電話で注文があった場合は、内容を書きとめておき、システムがまた使えるようになったら入力してください。',
      '金曜日の午後8時45分までに、すべての作業を必ず保存してください。それまでに保存していないものは、消えてしまうおそれがあります。プリンターとメールには影響ありません。',
      'ご質問があれば、内線204のITヘルプデスクにご連絡ください。ご不便をおかけしますが、ご理解とご協力をお願いします。IT部 マーク・エリス',
    ],
    blanks: [
      { id: 'A', choices: ['until', 'by', 'since', 'during'], answer: 0, why: 'from A until B で「A から B まで」（期間の終わり）。by は「～までに」（期限）で from と組めず、since・during はうしろに終わりの時刻をとれない。' },
      { id: 'B', choices: ['once', 'during', 'despite', 'because of'], answer: 0, why: 'うしろが文（it is available again）なので、接続詞 once「いったん～したら」。during・despite・because of は前置詞の働きで文を続けられない。' },
      { id: 'C', choices: ['is saved', 'saving', 'to save', 'been saved'], answer: 0, why: 'that 節の中には述語動詞が必要。work は「保存される」側なので受け身 is saved。saving・to save は述語にならず、been saved は be 動詞（has など）がないと使えない。' },
    ],
    underline: {
      phrase: 'thank you for your patience',
      choices: ['thank you for waiting without complaining', 'thank you for your hard work', 'thank you for your many orders', 'thank you for your questions'],
      answer: 0,
      why: 'patience は「がまん強さ・しんぼう」。thank you for your patience は「（待たせて不便をかけるが）がまんして待ってくれてありがとう」という決まり文句。',
    },
    order: {
      words: ['make', 'the', 'system', 'faster', 'and', 'more', 'secure'],
      rest: '',
      answer: 'make the system faster and more secure',
      ja: 'システムをより速く、より安全にする。（make A B＝A を B にする、比較級 faster / more secure）',
    },
    tf: [
      { statement: 'システムは土曜日の午前6時まで使えない。', answer: true, why: '第1段落 from 9:00 p.m. on Friday … until 6:00 a.m. on Saturday。' },
      { statement: '作業中も、お客さまはオンラインで注文できる。', answer: false, why: '第2段落 Customers will not be able to place orders online while the work is being done。' },
      { statement: '保存していない作業は、消えてしまうおそれがある。', answer: true, why: '第3段落 Anything you have not saved by then may be lost。' },
    ],
    qa: [
      { q: 'What should employees do if a customer calls to order during the maintenance?', choices: ['Write down the details and enter them later.', 'Tell the customer to call back next week.', 'Enter the order into the system right away.', 'Contact the IT help desk immediately.'], answer: 0, why: '第2段落 please write down the details and enter them into the system once it is available again。' },
    ],
  },
  {
    id: 'adv-learning-by-teaching',
    title: 'Learning by Teaching',
    level: '難関大（評論）',
    paragraphs: [
      "Have you ever noticed that you understand something better after explaining it to a friend? Many teachers believe that teaching is one of the best ways to learn, and research supports this idea.",
      "In one kind of experiment, students study the same material, but some are told they will take a test, ( A ) others are told they will have to teach it to someone else. The students who expect to teach often remember more and organize the information better. Preparing to teach seems to make people look for the main points and the connections between ideas.",
      "Actually explaining the material helps, too. When we try to put an idea into our own words, we quickly discover the parts we do not really understand. A question from a listener can show us a gap ( B ) we did not know existed.",
      "You do not need a classroom to use this method. You can explain a lesson to a family member, or even pretend to teach it to an empty chair. The important thing is to explain the ideas clearly enough ( C ) someone else could understand them.",
    ],
    ja: [
      '友だちに説明したあとで、そのことがよくわかるようになったと気づいたことはないだろうか。教えることは学ぶための最もよい方法の1つだと考える先生は多く、研究もこの考えを支持している。',
      'ある種類の実験では、学生たちが同じ内容を勉強するが、一部はテストを受けると言われ、ほかの学生はそれをだれかに教えなければならないと言われる。教えるつもりの学生のほうが、多くを覚えていて、情報をうまく整理していることが多い。教える準備をすると、人は要点や考えどうしのつながりをさがすようになるらしい。',
      '実際に説明することも役に立つ。考えを自分のことばで言いかえようとすると、本当はわかっていない部分にすぐ気づく。聞き手からの質問が、あるとは知らなかった理解の穴を教えてくれることもある。',
      'この方法を使うのに教室はいらない。家族にその日の授業を説明してもいいし、だれもいないいすに教えるふりをしてもよい。大切なのは、ほかの人がわかるくらいはっきりと考えを説明することだ。',
    ],
    blanks: [
      { id: 'A', choices: ['while', 'during', 'despite', 'because of'], answer: 0, why: 'うしろが文（others are told …）なので、対比の接続詞 while「一方で」。during・despite・because of は前置詞の働きで文を続けられない。' },
      { id: 'B', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 a gap を説明する関係代名詞 that（we did not know ＿ existed で existed の主語が欠けている）。what は先行詞をとらず、where のうしろは欠けのない文、whose のうしろには名詞が必要。' },
      { id: 'C', choices: ['that', 'what', 'which', 'because of'], answer: 0, why: '副詞＋enough that ～「～なくらい十分に…」。what・which は先行詞や欠けた部分がないので入らず、because of のうしろに文は続かない。' },
    ],
    underline: {
      phrase: 'put an idea into our own words',
      choices: ['explain an idea in our own way', 'write an idea down in a notebook', 'translate an idea into English', 'repeat an idea exactly as it is written'],
      answer: 0,
      why: 'put ～ into one\'s own words は「～を自分のことばで言いかえる」。教科書の文をそのままくり返すのではなく、自分なりに説明すること。',
    },
    order: {
      words: ['look', 'for', 'the', 'main', 'points', 'and', 'the', 'connections', 'between', 'ideas'],
      rest: '',
      answer: 'look for the main points and the connections between ideas',
      ja: '要点と、考えどうしのつながりをさがす。（look for ～＝～をさがす、between ～＝～の間の）',
    },
    tf: [
      { statement: '教えるつもりで勉強した学生のほうが、多くを覚えていることが多い。', answer: true, why: '第2段落 The students who expect to teach often remember more。' },
      { statement: '考えを自分のことばで言いかえると、わかっていない部分に気づける。', answer: true, why: '第3段落 we quickly discover the parts we do not really understand。' },
      { statement: '筆者は、この方法は教室でしか使えないと言っている。', answer: false, why: '第4段落 You do not need a classroom to use this method。' },
    ],
    qa: [
      { q: 'What does the writer suggest you can do without a classroom?', choices: ['Explain a lesson to a family member or an empty chair.', 'Take more tests at home.', 'Read the textbook many times silently.', 'Ask a teacher to explain everything again.'], answer: 0, why: '第4段落 You can explain a lesson to a family member, or even pretend to teach it to an empty chair。' },
    ],
  },
  {
    id: 'toeic-parking-repair',
    title: 'Notice: Parking Lot Repairs',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "To all staff: The employee parking lot on the east side of our building will be repaved next week. The work will begin on Monday, March 3, and is expected to be completed ( A ) Friday, March 7, if the weather stays dry.",
      "While the lot is closed, staff who usually drive to work may park at the Greenview Shopping Center on Hill Street. The center's manager has kindly agreed to let us use the upper level of its garage at no cost. A free shuttle bus will run between the shopping center and our main entrance every fifteen minutes from 7:00 a.m. to 7:00 p.m.",
      "To use the garage, you will need a temporary parking pass. Passes can be picked up at the reception desk starting this Wednesday. Please display the pass on your dashboard ( B ) that security staff can see it clearly.",
      "We also encourage employees to consider ( C ) public transportation or sharing rides with coworkers during this period. We understand that this change may be inconvenient, and we appreciate your understanding. Facilities Management",
    ],
    ja: [
      '従業員のみなさまへ：ビルの東側にある従業員用駐車場を、来週舗装し直します。工事は3月3日（月）に始まり、天気がよければ3月7日（金）までに終わる予定です。',
      '駐車場が使えない間、ふだん車で通勤している人は、ヒル通りのグリーンビュー・ショッピングセンターに駐車できます。センターの支配人が、立体駐車場の上の階を無料で使わせてくれることに快く同意してくれました。ショッピングセンターと当社の正面入口の間には、午前7時から午後7時まで15分おきに無料のシャトルバスが運行します。',
      '立体駐車場を使うには、臨時の駐車券が必要です。駐車券は今週の水曜日から受付で受け取れます。警備員がはっきり見えるように、駐車券はダッシュボードの上に置いてください。',
      'この期間は、公共交通機関を使ったり、同僚と車に乗り合わせたりすることもぜひ考えてください。この変更でご不便をおかけしますが、ご理解に感謝します。施設管理部',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'since', 'among', 'along'], answer: 0, why: 'by ＋ 時「～までに」（期限）。be completed by Friday で「金曜日までに完了する」。since は過去からの起点で未来の予定に使えず、among・along は時を表さない。' },
      { id: 'B', choices: ['so', 'because', 'although', 'even'], answer: 0, why: 'so that S can ～「S が～できるように」（目的）。because・although・even のうしろに that 節を続ける形はない。' },
      { id: 'C', choices: ['using', 'to use', 'use', 'used'], answer: 0, why: 'consider は動名詞を目的語にとる（consider -ing「～することを考える」）。to 不定詞や原形・過去分詞は続かない。' },
    ],
    underline: {
      phrase: 'at no cost',
      choices: ['for free', 'at a low price', 'for a short time', 'with some difficulty'],
      answer: 0,
      why: 'at no cost は「費用なしで」＝ for free「無料で」。cost は「費用」。',
    },
    order: {
      words: ['will', 'run', 'between', 'the', 'shopping', 'center', 'and', 'our', 'main', 'entrance'],
      rest: '',
      answer: 'will run between the shopping center and our main entrance',
      ja: '（シャトルバスが）ショッピングセンターと当社の正面入口の間を運行する。（between A and B＝A と B の間）',
    },
    tf: [
      { statement: '工事は天気がよければ金曜日までに終わる予定だ。', answer: true, why: '第1段落 is expected to be completed by Friday, March 7, if the weather stays dry。' },
      { statement: 'ショッピングセンターの駐車場は、1日ごとに料金がかかる。', answer: false, why: '第2段落 let us use the upper level of its garage at no cost。' },
      { statement: '臨時の駐車券は受付で受け取れる。', answer: true, why: '第3段落 Passes can be picked up at the reception desk。' },
    ],
    qa: [
      { q: 'How can employees get from the shopping center to the office?', choices: ['By taking a free shuttle bus.', 'By renting a bicycle at the center.', 'By walking through a new tunnel.', 'By calling a taxi paid for by the company.'], answer: 0, why: '第2段落 A free shuttle bus will run between the shopping center and our main entrance。' },
    ],
  },
  {
    id: 'adv-goosebumps',
    title: 'Why Do We Get Goosebumps?',
    level: '難関大（評論）',
    paragraphs: [
      "When you feel cold or hear a moving piece of music, tiny bumps may suddenly appear on your arms. These are called goosebumps, because the skin begins to look like that of a bird ( A ) feathers have been removed.",
      "Goosebumps are caused by very small muscles attached to the base of each hair. When these muscles tighten, the hairs stand up and the skin around them is pushed up into little bumps. For our furry ancestors, this reaction was useful. Raised hair traps a layer of air near the skin, which helps keep the body warm. It also makes an animal look bigger, ( B ) may frighten away an enemy. You can see the same thing when a cat's fur stands up as it faces a dog.",
      "Humans have lost most of their body hair, so goosebumps no longer keep us warm. Yet the reaction has survived. Interestingly, it is linked not only to cold and fear but also to strong emotions such as awe. Some scientists think goosebumps are simply a leftover from our past, while others believe they may still ( C ) a role in how we experience powerful feelings.",
    ],
    ja: [
      '寒さを感じたり、心を動かす音楽を聞いたりすると、うでに小さなぶつぶつが急に出てくることがある。これは「鳥はだ」とよばれる。皮ふが、羽をむしられた鳥の皮ふのように見えはじめるからだ。',
      '鳥はだは、1本1本の毛の根もとについているとても小さな筋肉によって起こる。この筋肉がちぢむと毛が立ち、そのまわりの皮ふがおし上げられて小さなぶつぶつになる。毛におおわれていた私たちの祖先にとって、この反応は役に立った。立った毛は皮ふの近くに空気の層をとじこめ、それが体をあたたかく保つのに役立つ。また、動物を大きく見せ、それが敵をおどして追いはらうこともある。犬と向き合ったねこの毛が逆立つときにも、同じことが見られる。',
      '人間は体の毛のほとんどを失ったので、鳥はだはもう体をあたためてはくれない。それでも、この反応は残った。おもしろいことに、鳥はだは寒さや恐怖だけでなく、畏敬の念のような強い感情とも結びついている。鳥はだは過去のなごりにすぎないと考える科学者もいれば、強い感情の感じ方に今も役割を果たしているかもしれないと考える科学者もいる。',
    ],
    blanks: [
      { id: 'A', choices: ['whose', 'which', 'that', 'what'], answer: 0, why: 'a bird と feathers の関係は「鳥の羽」なので所有格の関係代名詞 whose。うしろの文（feathers have been removed）に欠けた部分がないので which・that・what は入らない。' },
      { id: 'B', choices: ['which', 'that', 'what', 'it'], answer: 0, why: 'コンマのあとで前の内容（大きく見えること）を受け、may frighten の主語になる非制限用法の which。that はコンマのあとに使えず、what は先行詞をとらず、it では接続詞がなく2つの文がつながらない。' },
      { id: 'C', choices: ['play', 'playing', 'played', 'to play'], answer: 0, why: '助動詞 may のあとは動詞の原形。play a role in ～「～で役割を果たす」。' },
    ],
    underline: {
      phrase: 'frighten away an enemy',
      choices: ['scare an enemy so that it leaves', 'make friends with an enemy', 'fight an enemy for a long time', 'hide quietly from an enemy'],
      answer: 0,
      why: 'frighten away ～ は「～をおどして追いはらう」。frighten は「こわがらせる」、away は「はなれて」。',
    },
    order: {
      words: ['helps', 'keep', 'the', 'body', 'warm'],
      rest: '',
      answer: 'helps keep the body warm',
      ja: '体をあたたかく保つのに役立つ。（help ＋ 原形＝～するのに役立つ、keep O C＝O を C に保つ）',
    },
    tf: [
      { statement: '鳥はだは、毛の根もとの小さな筋肉がちぢむことで起こる。', answer: true, why: '第2段落 Goosebumps are caused by very small muscles … When these muscles tighten。' },
      { statement: '鳥はだは今でも人間の体をあたためるのに役立っている。', answer: false, why: '第3段落 goosebumps no longer keep us warm。' },
      { statement: '鳥はだは、寒さや恐怖のときだけに出る。', answer: false, why: '第3段落 not only to cold and fear but also to strong emotions such as awe。' },
    ],
    qa: [
      { q: 'How did raised hair help our furry ancestors?', choices: ['It kept them warm and made them look bigger.', 'It helped them hear music better.', 'It made their feathers grow faster.', 'It allowed them to run away quickly.'], answer: 0, why: '第2段落 helps keep the body warm … makes an animal look bigger。' },
    ],
  },
  {
    id: 'toeic-damaged-order',
    title: 'Email: Your Damaged Order',
    level: '難関大（メール文）',
    paragraphs: [
      "Dear Ms. Patel, Thank you for contacting Brightline Home Goods. We are sorry to hear that the table lamp you ordered arrived with a cracked base. We understand how disappointing it is to receive a damaged item, especially one ( A ) was meant as a gift.",
      "We have already sent a replacement lamp by express delivery at no extra charge. It should arrive within two business days. You do not need to return the damaged lamp; please feel free to recycle it or throw it away.",
      "In addition, we have added a 15 percent discount to your account, which can be used on your next purchase. The discount will be applied automatically when you check out, ( B ) there is no need to enter a code.",
      "We have also shared your report with our packing team so that we can prevent similar problems in the future. If the new lamp does not arrive by Friday, please do not hesitate ( C ) reply to this email. Sincerely, Daniel Kim, Customer Service",
    ],
    ja: [
      'パテル様。ブライトライン・ホームグッズにご連絡いただきありがとうございます。ご注文の卓上ランプが、台の部分が割れた状態で届いたとのこと、申し訳ございません。こわれた品物を受け取るのがどれほど残念なことか、とくに贈り物のつもりだった品物ならなおさらだと、よくわかります。',
      'すでに代わりのランプを、追加料金なしの速達でお送りしました。2営業日以内に届くはずです。こわれたランプを返品していただく必要はありません。リサイクルするか処分するか、ご自由にどうぞ。',
      'さらに、次回のお買い物で使える15パーセントの割引をお客さまのアカウントに追加しました。割引はお会計のときに自動で適用されるので、コードを入力する必要はありません。',
      'また、同じような問題を今後防げるよう、ご報告を梱包チームにも伝えました。新しいランプが金曜日までに届かない場合は、遠慮なくこのメールに返信してください。カスタマーサービス ダニエル・キム',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'whose', 'where'], answer: 0, why: '先行詞 one（＝ item）を説明し、was meant の主語になる関係代名詞 that。what は先行詞をとらず、whose のうしろには名詞が必要、where のうしろは欠けのない文。' },
      { id: 'B', choices: ['so', 'because of', 'despite', 'during'], answer: 0, why: 'コンマのあとで「だから～」と結果を続ける接続詞 so。because of・despite・during は前置詞の働きで、うしろに文（there is …）を続けられない。' },
      { id: 'C', choices: ['to', 'of', 'on', 'at'], answer: 0, why: 'hesitate to 原形「～するのをためらう」。do not hesitate to ～ で「遠慮なく～してください」。' },
    ],
    underline: {
      phrase: 'feel free to recycle it',
      choices: ['recycle it if you like', 'be sure to recycle it today', 'pay a fee to recycle it', 'never recycle it'],
      answer: 0,
      why: 'feel free to ～ は「自由に～してよい・遠慮なく～してください」。リサイクルしてもかまわない、という許可の言い方。',
    },
    order: {
      words: ['prevent', 'similar', 'problems', 'in', 'the', 'future'],
      rest: '',
      answer: 'prevent similar problems in the future',
      ja: '同じような問題を今後防ぐ。（prevent ～＝～を防ぐ、in the future＝今後）',
    },
    tf: [
      { statement: 'パテルさんは、こわれたランプを店に送り返さなければならない。', answer: false, why: '第2段落 You do not need to return the damaged lamp。' },
      { statement: '割引を使うには、コードを入力する必要がある。', answer: false, why: '第3段落 there is no need to enter a code。' },
      { statement: '代わりのランプには追加料金がかからない。', answer: true, why: '第2段落 at no extra charge。' },
    ],
    qa: [
      { q: 'What should Ms. Patel do if the new lamp does not arrive by Friday?', choices: ['Reply to the email.', 'Visit the store in person.', 'Return the damaged lamp.', 'Place a new order online.'], answer: 0, why: '第4段落 If the new lamp does not arrive by Friday, please do not hesitate to reply to this email。' },
    ],
  },
  {
    id: 'adv-spicy',
    title: 'Why Spicy Food Feels Hot',
    level: '難関大（評論）',
    paragraphs: [
      "Bite into a hot chili pepper and your mouth may feel as if it were on fire. Yet the pepper is not actually hot at all; its temperature is the same as that of the room. The burning feeling is ( A ) by a chemical called capsaicin.",
      "Our mouths contain nerve cells with special receptors that normally respond to dangerous heat, such as a sip of very hot tea. Capsaicin happens to switch on these same receptors. The nerves then send a message to the brain, ( B ) interprets it as burning heat. This is why people eating spicy food often sweat and turn red, just as they would on a hot day.",
      "Why would a plant produce such a chemical? One explanation involves the spreading of seeds. Mammals, whose teeth can crush seeds, are put off by capsaicin. Birds, however, are not sensitive to it, so they eat the peppers and carry the undamaged seeds far away in their droppings. In this way, the plant protects its seeds from animals that would destroy them while still getting help from animals that spread them.",
      "If you ever eat something too spicy, drinking cold water may not help much. Capsaicin does not dissolve well in water, so the water simply spreads it around your mouth. A glass of milk is a better choice, ( C ) proteins in milk help wash the capsaicin away.",
    ],
    ja: [
      '辛いとうがらしをかじると、口の中が燃えているように感じることがある。しかし、とうがらしは実際にはまったく熱くない。その温度は部屋の温度と同じだ。焼けるような感じは、カプサイシンという化学物質によって引き起こされている。',
      '私たちの口には、ふつうはとても熱いお茶をすすったときのような危険な熱に反応する、特別な受容体をもつ神経細胞がある。カプサイシンは、たまたまこれと同じ受容体のスイッチを入れてしまう。すると神経が脳に信号を送り、脳はそれを焼けるような熱だと解釈する。辛いものを食べる人が、暑い日と同じように汗をかいたり顔が赤くなったりすることが多いのは、このためである。',
      'なぜ植物はこんな化学物質をつくるのだろうか。1つの説明は、種をまき散らすことにかかわっている。歯で種をかみくだける哺乳類は、カプサイシンをいやがる。しかし鳥はカプサイシンを感じにくいので、とうがらしを食べ、傷ついていない種をふんにまじえて遠くまで運ぶ。このようにして植物は、種をこわしてしまう動物から種を守りつつ、種を広げてくれる動物の助けは得ているのである。',
      'もし辛すぎるものを食べてしまったら、冷たい水を飲んでもあまり効かないかもしれない。カプサイシンは水にとけにくいので、水はそれを口の中に広げるだけだ。牛乳を1杯飲むほうがよい。牛乳のたんぱく質がカプサイシンを洗い流すのを助けるからである。',
    ],
    blanks: [
      { id: 'A', choices: ['caused', 'causing', 'cause', 'to cause'], answer: 0, why: 'The burning feeling is ＿ by ～ で「～によって引き起こされる」受け身。be ＋ 過去分詞 caused。' },
      { id: 'B', choices: ['which', 'that', 'what', 'it'], answer: 0, why: 'コンマのあとで the brain を受け、interprets の主語になる非制限用法の which。that はコンマのあとに使えず、what は先行詞をとらず、it では2つの文がつながらない。' },
      { id: 'C', choices: ['because', 'because of', 'due to', 'despite'], answer: 0, why: 'うしろが文（proteins in milk help …）なので接続詞 because。because of・due to・despite は前置詞の働きで文を続けられない。' },
    ],
    underline: {
      phrase: 'are put off by capsaicin',
      choices: ['dislike capsaicin and avoid it', 'are strongly attracted to capsaicin', 'are not affected by capsaicin at all', 'are made sleepy by capsaicin'],
      answer: 0,
      why: 'be put off by ～ は「～でいやになる・～に興味をなくす」。哺乳類はカプサイシンをいやがって、とうがらしを食べなくなるということ。',
    },
    order: {
      words: ['carry', 'the', 'undamaged', 'seeds', 'far', 'away'],
      rest: '',
      answer: 'carry the undamaged seeds far away',
      ja: '傷ついていない種を遠くまで運ぶ。（far away＝遠くへ）',
    },
    tf: [
      { statement: 'とうがらしは、実際に部屋よりも温度が高い。', answer: false, why: '第1段落 its temperature is the same as that of the room。' },
      { statement: 'カプサイシンは、熱に反応するのと同じ受容体のスイッチを入れる。', answer: true, why: '第2段落 Capsaicin happens to switch on these same receptors。' },
      { statement: '鳥はカプサイシンを感じにくいので、とうがらしを食べる。', answer: true, why: '第3段落 Birds, however, are not sensitive to it, so they eat the peppers。' },
      { statement: '辛すぎるときは、牛乳より冷たい水のほうが効く。', answer: false, why: '第4段落 drinking cold water may not help much … A glass of milk is a better choice。' },
    ],
    qa: [
      { q: 'According to the passage, how does capsaicin help the pepper plant?', choices: ['It keeps away mammals that would crush the seeds.', 'It makes the peppers grow faster.', 'It attracts mammals that plant the seeds.', 'It keeps the plant warm in winter.'], answer: 0, why: '第3段落 Mammals, whose teeth can crush seeds, are put off by capsaicin … protects its seeds from animals that would destroy them。' },
    ],
  },
  {
    id: 'adv-shifting-baseline',
    title: 'Forgetting What Nature Used to Be',
    level: '難関大（評論）',
    paragraphs: [
      "In 1995, the marine biologist Daniel Pauly described a problem he called 'shifting baseline syndrome.' Each generation of scientists, he argued, tends to accept the state of nature ( A ) they first encountered at the start of their careers as normal. When fish populations decline further, they measure the loss against this starting point, not against the much richer seas of earlier times.",
      "The same thing happens to ordinary people. A child who grows up near a river with few birds may think that is simply how rivers are. The child's grandparents might remember the same river full of life, but such memories are often dismissed as exaggeration. As a result, each generation's sense of what is 'natural' becomes a little poorer, and the gradual loss goes largely unnoticed.",
      "Shifting baselines matter because what we notice shapes what we try to protect. If people do not realize how much has been lost, they are unlikely to demand that it ( B ) restored. Targets for conservation may also be set too low, aiming only to return to the recent past rather than to a healthier state.",
      "To fight this tendency, researchers have turned to unusual sources of information, such as old photographs, fishing records, and even restaurant menus, ( C ) reveal which species were once common. Listening carefully to the memories of older people can help too. By recovering a longer view of the past, we can better judge how much nature has changed and what is worth restoring.",
    ],
    ja: [
      '1995年、海洋生物学者のダニエル・ポーリーは「シフティング・ベースライン症候群」とよぶ問題を説明した。彼によれば、科学者の各世代は、研究を始めたころにはじめて目にした自然の状態を、ふつうのものとして受け入れがちだという。魚の数がさらに減ると、彼らはその損失を、昔のもっと豊かな海とではなく、この出発点とくらべて測ってしまうのである。',
      '同じことは、ふつうの人にも起こる。鳥の少ない川の近くで育った子どもは、川とはそういうものだと思うかもしれない。その子の祖父母は、同じ川が生き物でいっぱいだったことを覚えているかもしれないが、そうした記憶は大げさだとして相手にされないことが多い。その結果、各世代の「自然な状態」の感覚は少しずつ貧しくなり、ゆるやかな損失はほとんど気づかれないままになる。',
      'ベースラインの移り変わりが重要なのは、何に気づくかが、何を守ろうとするかを左右するからだ。どれほど多くが失われたかに気づかなければ、人々はそれをもとにもどすよう求めることはまずないだろう。また、保全の目標が低く設定されすぎ、より健全な状態ではなく、最近の過去にもどることしか目指さないこともある。',
      'この傾向に対抗するため、研究者たちは、古い写真や漁業の記録、さらにはレストランのメニューといった、かつてどの種がふつうにいたかを明らかにしてくれる変わった情報源に目を向けてきた。お年寄りの記憶に注意深く耳をかたむけることも役に立つ。過去をもっと長い目で取りもどすことで、自然がどれほど変わったか、そして何をもとにもどす価値があるかを、よりよく判断できるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 the state of nature を説明し、encountered の目的語が欠けているので関係代名詞 that。what は先行詞をとらず、where のうしろは欠けのない文、whose のうしろには名詞が必要。' },
      { id: 'B', choices: ['be', 'being', 'to be', 'been'], answer: 0, why: 'demand that S (should) 原形。要求を表す動詞のあとの that 節では原形 be を使う（受け身 be restored）。' },
      { id: 'C', choices: ['which', 'that', 'what', 'they'], answer: 0, why: 'コンマのあとで前の情報源を受け、reveal の主語になる非制限用法の which。that はコンマのあとに使えず、what は先行詞をとらず、they では2つの文がつながらない。' },
    ],
    underline: {
      phrase: 'goes largely unnoticed',
      choices: ['is mostly not noticed by people', 'is quickly reported in the news', 'is completely stopped', 'is noticed by almost everyone'],
      answer: 0,
      why: 'go unnoticed は「気づかれないままである」、largely は「大部分は・ほとんど」。損失がほとんどだれにも気づかれない、ということ。',
    },
    order: {
      words: ['measure', 'the', 'loss', 'against', 'this', 'starting', 'point'],
      rest: '',
      answer: 'measure the loss against this starting point',
      ja: 'その損失を、この出発点とくらべて測る。（measure A against B＝A を B とくらべて測る）',
    },
    tf: [
      { statement: 'ポーリーによれば、科学者は研究を始めたころの自然の状態をふつうだと考えがちだ。', answer: true, why: '第1段落 tends to accept the state of nature that they first encountered … as normal。' },
      { statement: '祖父母の記憶は、いつも正確なものとして大切にされている。', answer: false, why: '第2段落 such memories are often dismissed as exaggeration。' },
      { statement: '研究者は、レストランのメニューも情報源として使っている。', answer: true, why: '第4段落 old photographs, fishing records, and even restaurant menus。' },
      { statement: '筆者は、保全の目標は最近の過去にもどることで十分だと考えている。', answer: false, why: '第3段落 Targets … may also be set too low, aiming only to return to the recent past。' },
    ],
    qa: [
      { q: 'Why does the writer think shifting baselines matter?', choices: ['Because what we notice shapes what we try to protect.', 'Because fish are becoming more common.', 'Because old photographs are often fake.', 'Because children do not like rivers.'], answer: 0, why: '第3段落 Shifting baselines matter because what we notice shapes what we try to protect。' },
    ],
  },
  {
    id: 'adv-matthew-effect',
    title: 'Why Small Advantages Grow',
    level: '難関大（評論）',
    paragraphs: [
      "In 1968, the sociologist Robert K. Merton noticed a curious pattern in science. When a famous researcher and an unknown one made similar discoveries, the famous researcher usually received most of the credit. Merton named this the 'Matthew effect,' after a line in the Bible suggesting that those who already have will be given more.",
      "The effect is not limited to science. Consider youth sports. In many countries, children are grouped by the year in which they were born. A child born early in the year may be almost twelve months older than a teammate born late in the year, and at the age of eight, that difference can make the older child noticeably bigger and stronger. Coaches, seeing this, tend to select the older children for special teams, ( A ) they receive better training and more practice. Over time, a small early advantage grows into a real difference in skill. Studies of ice hockey players in Canada, for example, have found that a disproportionate number of professionals were born in the first few months of the year.",
      "What makes the Matthew effect troubling is that the initial advantage often has little to do with talent. A slightly older child or a researcher at a well-known university gets more opportunities, and those opportunities then produce the success ( B ) seems to justify the original choice.",
      "Recognizing the effect allows us to reduce it. Some sports clubs now take birth dates into account ( C ) selecting players, and some journals hide authors' names from reviewers. Such measures cannot remove every unfair advantage, but they can help ensure that rewards depend more on ability than on luck.",
    ],
    ja: [
      '1968年、社会学者のロバート・K・マートンは、科学の世界にある奇妙なパターンに気づいた。有名な研究者と無名の研究者がにたような発見をすると、たいてい有名な研究者のほうが手柄のほとんどを得るのだ。マートンはこれを、すでに持っている者はさらに与えられるという聖書の一節にちなんで、「マタイ効果」と名づけた。',
      'この効果は科学にかぎらない。子どものスポーツを考えてみよう。多くの国では、子どもは生まれた年ごとに分けられる。年のはじめに生まれた子は、年の終わりに生まれたチームメイトより、ほぼ12か月年上のこともあり、8歳では、その差によって年上の子のほうがはっきりと体が大きく力も強くなりうる。これを見たコーチは、年上の子を選抜チームに選びがちで、そこで彼らはよりよい指導とより多くの練習を受ける。やがて、はじめの小さな有利さは、技術の本当の差へと育っていく。たとえばカナダのアイスホッケー選手の研究では、プロ選手のうち年のはじめの数か月に生まれた人が、割合から考えられるよりずっと多いことがわかっている。',
      'マタイ効果がやっかいなのは、はじめの有利さが、才能とはほとんど関係ないことが多い点だ。少し年上の子や、有名な大学の研究者は、より多くの機会を得る。そしてその機会が成功を生み、その成功がもとの選択を正しかったように見せてしまうのである。',
      'この効果に気づけば、それを小さくすることができる。選手を選ぶときに生まれた月を考えに入れるスポーツクラブや、審査する人に著者の名前をかくす学術誌も出てきている。こうした対策で不公平な有利さをすべてなくすことはできないが、報いが運よりも能力によって決まるようにする助けにはなるのである。',
    ],
    blanks: [
      { id: 'A', choices: ['where', 'which', 'that', 'what'], answer: 0, why: 'コンマのあとで special teams（場所）を受け、うしろが欠けのない文（they receive …）なので関係副詞 where。which・that・what のうしろには欠けた部分が必要で、that はコンマのあとにも使えない。' },
      { id: 'B', choices: ['that', 'what', 'where', 'whose'], answer: 0, why: '先行詞 the success を説明し、seems の主語になる関係代名詞 that。what は先行詞をとらず、where のうしろは欠けのない文、whose のうしろには名詞が必要。' },
      { id: 'C', choices: ['when', 'during', 'among', 'between'], answer: 0, why: 'when ＋ -ing「～するときに」（when they select の they are が省略された形）。during・among・between のうしろに -ing のかたまりは続かない。' },
    ],
    underline: {
      phrase: 'a disproportionate number of professionals',
      choices: ['more professionals than would be expected', 'very few professionals', 'exactly half of the professionals', 'professionals of the same height'],
      answer: 0,
      why: 'disproportionate は「つり合いのとれない・不釣り合いに多い（少ない）」。ここでは、年のはじめに生まれたプロが、ふつう予想されるよりずっと多いという意味。',
    },
    order: {
      words: ['grows', 'into', 'a', 'real', 'difference', 'in', 'skill'],
      rest: '',
      answer: 'grows into a real difference in skill',
      ja: '（小さな有利さが）技術の本当の差へと育つ。（grow into ～＝育って～になる）',
    },
    tf: [
      { statement: 'マートンによれば、有名な研究者と無名の研究者は、同じように手柄を得る。', answer: false, why: '第1段落 the famous researcher usually received most of the credit。' },
      { statement: '8歳では、生まれた月のちがいで体の大きさに差が出ることがある。', answer: true, why: '第2段落 at the age of eight, that difference can make the older child noticeably bigger and stronger。' },
      { statement: '筆者によれば、はじめの有利さは才能と強く結びついていることが多い。', answer: false, why: '第3段落 the initial advantage often has little to do with talent。' },
      { statement: '審査する人に著者の名前をかくす学術誌がある。', answer: true, why: '第4段落 some journals hide authors\' names from reviewers。' },
    ],
    qa: [
      { q: 'Why do older children in youth sports often become more skilled?', choices: ['They are chosen for special teams and get more training.', 'They are always more talented from birth.', 'They practice alone more often.', 'They are given easier games to play.'], answer: 0, why: '第2段落 Coaches … tend to select the older children for special teams, where they receive better training and more practice。' },
    ],
  },
  {
    id: 'adv-fermentation',
    title: 'Fermentation: Cooking with Invisible Helpers',
    level: '難関大（評論）',
    paragraphs: [
      "Long before anyone knew that microorganisms existed, people around the world were using them to make food. Bread, cheese, yogurt, soy sauce, and kimchi all depend on fermentation, a process in which tiny living things such as bacteria and yeasts break down sugars in food. Our ancestors did not understand what was happening, but they noticed ( A ) certain conditions turned milk into yogurt or cabbage into a sour, long-lasting dish.",
      "Fermentation was valuable mainly because it helped food last longer. When lactic acid bacteria ferment vegetables or milk, they produce acid, which makes it difficult for harmful bacteria to grow. In a world without refrigerators, this was one of the few ways to store food through a long winter. Fermentation can also change flavors and textures, ( B ) explains why the same cabbage can taste completely different after a few weeks in a jar.",
      "Today, scientists are studying fermented foods for another reason. Some fermented foods contain live bacteria, and researchers are investigating whether these microbes might affect the community of bacteria living in our digestive system. The results so far are promising but not yet conclusive, and experts warn against believing every claim made on product labels.",
      "Whatever science eventually discovers, fermentation remains a remarkable example of human creativity. Without understanding the biology, people learned to work with invisible organisms, ( C ) foods that are still enjoyed by millions of people every day.",
    ],
    ja: [
      '微生物が存在することをだれも知らなかったずっと前から、世界中の人々は微生物を使って食べ物をつくっていた。パン、チーズ、ヨーグルト、しょうゆ、キムチは、どれも発酵にたよっている。発酵とは、細菌や酵母のような小さな生き物が食べ物の糖を分解するはたらきのことだ。祖先たちは何が起きているのかわかっていなかったが、ある条件のもとで、牛乳がヨーグルトに、キャベツがすっぱくて長もちする料理に変わることに気づいていた。',
      '発酵が貴重だったのは、おもに食べ物を長もちさせたからである。乳酸菌が野菜や牛乳を発酵させると酸ができ、それが有害な細菌をふえにくくする。冷蔵庫のない世界では、これは長い冬のあいだ食べ物をたくわえる数少ない方法の1つだった。発酵は味や食感を変えることもあり、それが、同じキャベツがびんの中で数週間たつとまったくちがう味になる理由である。',
      '今日、科学者たちは別の理由で発酵食品を研究している。発酵食品の中には生きた細菌をふくむものがあり、研究者は、こうした微生物が私たちの消化管にすむ細菌の集まりに影響するかどうかを調べている。これまでの結果は有望だが、まだ決定的ではなく、専門家は商品のラベルに書かれた主張をすべて信じないよう注意している。',
      '科学が最終的に何を明らかにするにせよ、発酵は人間の創意工夫のすばらしい例であることに変わりはない。生物学を理解しないまま、人々は目に見えない生き物と協力することを学び、今も毎日何百万もの人に楽しまれている食べ物を生み出してきたのである。',
    ],
    blanks: [
      { id: 'A', choices: ['that', 'what', 'which', 'whose'], answer: 0, why: 'noticed の目的語になる名詞節を作る接続詞 that。うしろの文（certain conditions turned …）に欠けた部分がないので、what・which・whose は入らない。' },
      { id: 'B', choices: ['which', 'that', 'what', 'it'], answer: 0, why: 'コンマのあとで前の文の内容を受け、explains の主語になる非制限用法の which。that はコンマのあとに使えず、what は先行詞をとらず、it では2つの文がつながらない。' },
      { id: 'C', choices: ['producing', 'produced', 'produce', 'to producing'], answer: 0, why: 'コンマのあとに「そして～を生み出した」と結果をそえる分詞構文 producing。produced・produce では接続詞なしで動詞が2つ並び、to producing という形もない。' },
    ],
    underline: {
      phrase: 'not yet conclusive',
      choices: ['not yet certain enough to be accepted as fact', 'already completely proven', 'clearly wrong', 'not interesting to scientists'],
      answer: 0,
      why: 'conclusive は「決定的な・結論を出せる」。not yet conclusive で「まだはっきりした結論は出ていない」という意味。',
    },
    order: {
      words: ['helped', 'food', 'last', 'longer'],
      rest: '',
      answer: 'helped food last longer',
      ja: '食べ物を長もちさせた。（help O 原形＝O が～するのを助ける、last＝もつ・続く）',
    },
    tf: [
      { statement: '昔の人は、微生物のはたらきを理解したうえで発酵食品をつくっていた。', answer: false, why: '第1段落 Our ancestors did not understand what was happening。' },
      { statement: '乳酸菌がつくる酸は、有害な細菌をふえにくくする。', answer: true, why: '第2段落 they produce acid, which makes it difficult for harmful bacteria to grow。' },
      { statement: '発酵食品が体によいことは、すでに完全に証明されている。', answer: false, why: '第3段落 The results so far are promising but not yet conclusive。' },
    ],
    qa: [
      { q: 'Why was fermentation especially valuable in the past?', choices: ['It helped people store food through long winters.', 'It made food cheaper to buy.', 'It removed all bacteria from food.', 'It made cooking faster.'], answer: 0, why: '第2段落 In a world without refrigerators, this was one of the few ways to store food through a long winter。' },
    ],
  },
  {
    id: 'kyodai-recipe',
    title: 'My Grandmother\'s "Enough"',
    level: '難関大（評論）',
    paragraphs: [
      "My grandmother never used a recipe. When I asked her how much salt to put in the soup, she would say, 'Enough,' and when I asked how long to cook the beans, she would answer, 'Until they are ready.' At the time, these replies seemed to me ( A ) more than a way of avoiding the question.",
      "Only years later, standing in my own kitchen, did I begin to understand what she meant. Her knowledge was not stored in numbers but in her eyes, her hands, and her nose. She knew the soup had enough salt by tasting it, and she knew the beans were ready by the way they gave way under a spoon. Such knowledge cannot easily be written down, ( B ) it was acquired through thousands of repetitions rather than through instruction.",
      "Philosophers sometimes call this 'tacit knowledge': knowledge that we have but cannot fully put into words. Most cyclists cannot explain exactly how they keep their balance, yet they do not fall. An experienced doctor may sense that something is wrong before any test confirms it. In each case, the knowledge lives in practice, not in rules.",
      "Recipes and manuals are valuable, of course; they allow knowledge to travel far beyond the person who first had it. But they also tempt us to believe that everything worth knowing can be reduced to instructions. My grandmother's 'Enough' was not a refusal to teach. It was an invitation to learn in the same way ( C ) she had learned: by paying attention, again and again, until the knowledge became my own.",
    ],
    ja: [
      '祖母はレシピを使ったことがなかった。スープに塩をどれくらい入れるのかとたずねると「ちょうどいいだけ」と言い、豆をどれくらい煮るのかとたずねると「できあがるまで」と答えるのだった。当時の私には、こうした返事は質問をはぐらかすやり方にすぎないように思えた。',
      '何年もたって、自分の台所に立ってはじめて、祖母の言いたかったことがわかりはじめた。祖母の知識は、数字ではなく、目や手や鼻の中にたくわえられていた。スープの塩かげんは味見をしてわかり、豆が煮えたことは、スプーンでおしたときのくずれ方でわかったのだ。こうした知識は、教わることではなく何千回ものくり返しによって身についたものなので、かんたんには書きとめられない。',
      '哲学者はこれを「暗黙知」とよぶことがある。もっているのに、ことばでは完全に言いあらわせない知識のことだ。たいていの自転車に乗る人は、どうやってバランスをとっているのかを正確には説明できないが、それでもたおれない。経験をつんだ医師は、どんな検査で確かめるよりも前に、何かがおかしいと感じとることがある。どの場合も、知識は規則の中ではなく、実践の中に生きているのである。',
      'もちろん、レシピや手引き書には価値がある。知識を、それを最初にもっていた人のはるか先まで伝えてくれるからだ。しかし同時に、知る価値のあることはすべて手順にまとめられると、私たちに思いこませもする。祖母の「ちょうどいいだけ」は、教えるのをことわったのではなかった。それは、祖母自身が学んだのと同じやり方で、つまり、何度も何度も注意をはらい、その知識が自分のものになるまで続けることで学びなさい、というさそいだったのである。',
    ],
    blanks: [
      { id: 'A', choices: ['little', 'few', 'fewer', 'a few'], answer: 0, why: 'little more than ～「～にすぎない」。way は単数なので、数を表す few・fewer・a few は使えない。' },
      { id: 'B', choices: ['because', 'because of', 'despite', 'during'], answer: 0, why: 'うしろが文（it was acquired …）なので接続詞 because。because of・despite・during は前置詞の働きで文を続けられない。' },
      { id: 'C', choices: ['that', 'what', 'whose', 'who'], answer: 0, why: 'the same way that S V「S が V したのと同じやり方で」。先行詞 way のあとに関係副詞の働きをする that。what は先行詞をとらず、whose のうしろには名詞が必要、who は人に使う。' },
    ],
    underline: {
      phrase: 'gave way under a spoon',
      choices: ['became soft and broke apart when pressed with a spoon', 'stuck firmly to the spoon', 'jumped out of the pot', 'changed color when touched'],
      answer: 0,
      why: 'give way は「（力におされて）くずれる・へこむ」。豆をスプーンでおすと、やわらかくくずれることで煮えたとわかった、ということ。',
    },
    order: {
      words: ['knowledge', 'cannot', 'easily', 'be', 'written', 'down'],
      rest: '',
      answer: 'knowledge cannot easily be written down',
      ja: '（こうした）知識はかんたんには書きとめられない。（助動詞の受け身 cannot be written down）',
    },
    tf: [
      { statement: '祖母は、塩の量を数字で正確に教えてくれた。', answer: false, why: '第1段落 she would say, \'Enough,\'。' },
      { statement: '筆者は子どものころから、祖母の返事の意味をよく理解していた。', answer: false, why: '第2段落 Only years later … did I begin to understand what she meant。' },
      { statement: '暗黙知とは、もっていてもことばで完全には言いあらわせない知識のことだ。', answer: true, why: '第3段落 knowledge that we have but cannot fully put into words。' },
      { statement: '筆者は、レシピや手引き書には価値がないと考えている。', answer: false, why: '第4段落 Recipes and manuals are valuable, of course。' },
    ],
    qa: [
      { q: 'What did the writer finally understand about the grandmother\'s answer "Enough"?', choices: ['It was an invitation to learn through repeated attention.', 'It was a way of refusing to teach.', 'It meant she had forgotten the recipe.', 'It showed that salt was not important.'], answer: 0, why: '第4段落 My grandmother\'s \'Enough\' was not a refusal to teach. It was an invitation to learn …。' },
    ],
  },
  {
    id: 'toeic-expense-app',
    title: 'Notice: New Expense App',
    level: '難関大（お知らせ文）',
    paragraphs: [
      "To all employees: Starting on June 1, all business expenses must be submitted through the new ExpenseEasy app ( A ) of on paper forms. The app can be downloaded to your smartphone from the company intranet.",
      "With the app, you simply take a photo of your receipt, choose a category such as travel or meals, and press 'Submit.' Your manager will receive a notification and can approve the request from any device. Most requests are expected to be approved within three business days, ( B ) is much faster than under the current system.",
      "To help everyone get used to the app, the IT Department will hold short training sessions in Meeting Room 4 on May 20 and May 22. Each session will last about thirty minutes. Please sign up for one of the sessions by May 15 ( C ) the online calendar.",
      "Paper forms will still be accepted until May 31. After that date, only expenses submitted through the app will be paid back. Questions may be sent to Lisa Moreno in the Accounting Department.",
    ],
    ja: [
      '従業員のみなさまへ：6月1日から、すべての業務上の経費は、紙の用紙ではなく新しいアプリ「エクスペンスイージー」で申請してください。アプリは社内ネットからスマートフォンにダウンロードできます。',
      'アプリでは、領収書の写真をとり、出張や食事などの区分をえらんで「送信」を押すだけです。上司に通知が届き、どの機器からでも申請を承認できます。ほとんどの申請は3営業日以内に承認される見こみで、これは今のやり方よりずっと速くなります。',
      'みなさんがアプリに慣れられるよう、IT部が5月20日と5月22日に第4会議室で短い講習会を開きます。各回およそ30分です。5月15日までに、オンラインのカレンダーを使ってどちらかの回に申しこんでください。',
      '紙の用紙は5月31日まではまだ受けつけます。その日を過ぎると、アプリで申請された経費だけが支払われます。ご質問は経理部のリサ・モレノまでお送りください。',
    ],
    blanks: [
      { id: 'A', choices: ['instead', 'rather', 'because', 'in spite'], answer: 0, why: 'instead of ～「～ではなく・～の代わりに」。rather of という形はなく、because of・in spite of では「紙の用紙のせいで・にもかかわらず」となり、うしろの on paper forms とつながらない。' },
      { id: 'B', choices: ['which', 'that', 'what', 'it'], answer: 0, why: 'コンマのあとで前の内容（3営業日以内に承認されること）を受け、is の主語になる非制限用法の which。that はコンマのあとに使えず、what は先行詞をとらず、it では2つの文がつながらない。' },
      { id: 'C', choices: ['using', 'to using', 'used', 'use'], answer: 0, why: '「～を使って」と手段をそえる分詞 using。to using という形はなく、used・use では文の形がこわれる。' },
    ],
    underline: {
      phrase: 'get used to the app',
      choices: ['become comfortable using the app', 'stop using the app', 'pay money for the app', 'design a new app'],
      answer: 0,
      why: 'get used to ～ は「～に慣れる」。to のうしろは名詞（the app）。used to 原形「以前は～した」とはちがう。',
    },
    order: {
      words: ['take', 'a', 'photo', 'of', 'your', 'receipt'],
      rest: '',
      answer: 'take a photo of your receipt',
      ja: '領収書の写真をとる。（take a photo of ～＝～の写真をとる）',
    },
    tf: [
      { statement: '6月1日からは、経費はアプリで申請する。', answer: true, why: '第1段落 Starting on June 1, all business expenses must be submitted through the new ExpenseEasy app。' },
      { statement: '講習会は1回およそ2時間かかる。', answer: false, why: '第3段落 Each session will last about thirty minutes。' },
      { statement: '紙の用紙は6月以降も受けつけられる。', answer: false, why: '第4段落 Paper forms will still be accepted until May 31。' },
    ],
    qa: [
      { q: 'By when should employees sign up for a training session?', choices: ['May 15', 'May 20', 'May 31', 'June 1'], answer: 0, why: '第3段落 Please sign up for one of the sessions by May 15。' },
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
      { q: 'According to the passage, why might starting a task for just five minutes help?', choices: ['The feeling that it is unfinished may encourage you to come back to it.', 'Five minutes is enough to finish any task.', 'It makes you forget the task completely.', 'Waiters always work for five minutes.'], answer: 0, why: '第4段落 the feeling that it is unfinished may encourage you to come back to it。' },
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
      { q: 'Why would a shock-absorbing head be a disadvantage for a woodpecker?', choices: ['The bird would have to hit harder to make holes, wasting energy.', 'The bird would lose its long tongue.', 'The bird could not see insects clearly.', 'The bird would become too heavy to fly.'], answer: 0, why: '第2段落 the bird would have to hit even harder to make holes, which would waste energy。' },
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
      { q: 'Why do scientists use lichens to judge air quality?', choices: ['Because they take in most of what they need directly from the air.', 'Because they grow very fast in cities.', 'Because they need thick layers of soil.', 'Because reindeer eat them in winter.'], answer: 0, why: '第4段落 Since lichens take in most of what they need directly from the air, they are highly sensitive to air pollution。' },
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
      { q: 'According to the passage, why might heavy use of navigation apps weaken our mental maps?', choices: ['We no longer need to notice landmarks or track our direction.', 'The apps often show the wrong route.', 'We walk faster when we use the apps.', 'The apps only work in emergencies.'], answer: 0, why: '第2段落 we no longer need to notice landmarks, estimate distances, or keep track of our direction。' },
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
      { q: 'What have researchers studied about skilled soroban users?', choices: ['How practice can change the way the brain handles numbers.', 'Why calculators became cheap.', 'How beads are made in factories.', 'Why Rome stopped using the abacus.'], answer: 0, why: '第3段落 as an example of how practice can change the way the brain handles numbers。' },
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
      { q: 'According to some researchers, why might experiences slow adaptation?', choices: ['They are varied and become part of the stories we tell about ourselves.', 'They are always cheaper than possessions.', 'They make us forget our old possessions.', 'They stop us from feeling any loss.'], answer: 0, why: '第3段落 because experiences are varied and become part of the stories we tell about ourselves。' },
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
      { q: 'Why can desalination increase carbon emissions?', choices: ['It needs a lot of energy, which may come from fossil fuels.', 'It releases salt into the air.', 'It uses oil to make the membranes.', 'It heats the whole ocean.'], answer: 0, why: '第3段落 increase carbon emissions if the power comes from fossil fuels。' },
    ],
  },
]
