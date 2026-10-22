// 難関大（京大レベル）・TOEFL/IELTS レベルの読解。本文・訳・設問・解説はすべて自作
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
]
