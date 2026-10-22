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
    id: 'toefl-sleep',
    title: 'Sleep and Memory',
    level: 'TOEFL・IELTS（心理）',
    paragraphs: [
      'For a long time, sleep was thought of as a passive state in which the brain simply rested. Research over the past few decades has overturned this view. During sleep, the brain remains highly active, and much of this activity appears to play a role ( A ) the formation of memories.',
      'In one common type of experiment, participants learn a list of word pairs in the evening and are tested the next morning. Those who sleep normally tend to remember significantly more than those who are kept awake for the same period. Recordings of brain activity suggest that, during deep sleep, the brain replays patterns from the day, ( B ) new information from short-term to long-term storage.',
      'These findings have practical implications, particularly for students. Staying up all night before an exam may feel productive, but it can ( C ) the very process that turns study into lasting knowledge. A regular sleep schedule, by contrast, gives the brain the time it needs to organize what has been learned.',
    ],
    ja: [
      '長いあいだ、睡眠は脳がただ休んでいる受け身の状態だと考えられていた。ここ数十年の研究が、この考えをくつがえした。眠っているあいだも脳は活発に働いており、その活動の多くは記憶をつくることに役割を果たしているようだ。',
      'よくある実験では、参加者が夕方に単語の組み合わせのリストを覚え、翌朝テストを受ける。ふつうに眠った人は、同じ時間起きたままでいさせられた人よりも、かなり多くを覚えている傾向がある。脳の活動の記録からは、深い眠りのあいだに脳がその日のパターンを再生し、新しい情報を短期の保管から長期の保管へと移していることがうかがえる。',
      'これらの発見は、とくに学生にとって実用的な意味をもつ。試験の前に徹夜をすると、はかどっているように感じるかもしれないが、勉強を長く残る知識に変える、まさにその過程をそこなってしまうことがある。それに対して規則正しい睡眠は、学んだことを整理するのに必要な時間を脳にあたえてくれる。',
    ],
    blanks: [
      { id: 'A', choices: ['in', 'at', 'on', 'by'], answer: 0, why: 'play a role in 〜「〜において役割を果たす」。' },
      { id: 'B', choices: ['transferring', 'transferred', 'to transfer it', 'transfers'], answer: 0, why: '分詞構文。「その日のパターンを再生して、新しい情報を…へ移す」。移すのは主語の the brain なので、能動の -ing 形。' },
      { id: 'C', choices: ['undermine', 'support', 'repeat', 'create'], answer: 0, why: 'undermine「（少しずつ）そこなう・弱める」。but の前の「はかどっているように感じる」と逆の内容になる。' },
    ],
    tf: [
      { statement: 'Scientists have always believed that the brain is very active during sleep.', answer: false, why: '第1段落 For a long time, sleep was thought of as a passive state（長いあいだ受け身の状態と考えられていた）。' },
      { statement: 'In the experiments described, people who slept remembered more word pairs.', answer: true, why: '第2段落 Those who sleep normally tend to remember significantly more。' },
      { statement: 'The author recommends studying all night before an exam.', answer: false, why: '第3段落 徹夜は知識を定着させる過程をそこなうことがあると述べている。' },
    ],
    qa: [
      { q: 'According to the passage, what may happen in the brain during deep sleep?', choices: ['It replays patterns from the day.', 'It stops all activity.', 'It deletes new memories.', 'It creates new word pairs.'], answer: 0, why: '第2段落 during deep sleep, the brain replays patterns from the day。' },
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
    id: 'toefl-heat-island',
    title: 'Why Cities Are Warmer',
    level: 'TOEFL・IELTS（環境）',
    paragraphs: [
      'Cities are often several degrees warmer than the countryside around them, a phenomenon known as the urban heat island effect. The difference is usually greatest at night, ( A ) buildings and roads release the heat they have absorbed during the day.',
      'Several factors contribute to this effect. Dark surfaces such as asphalt absorb more sunlight than vegetation does, and the narrow spaces between tall buildings can trap warm air. In addition, cars, air conditioners, and factories all ( B ) heat directly into the environment.',
      'Because higher temperatures can increase energy use and threaten public health during heat waves, many cities are now looking for ways to cool down. Planting trees, which provide shade and release water vapor, is one of the most effective strategies. Some cities are also painting roofs white so that they reflect sunlight ( C ) absorbing it. Small changes like these, repeated across thousands of buildings, can make a noticeable difference to the temperature of a whole city.',
    ],
    ja: [
      '都市は、まわりの郊外より数度暖かいことが多い。これはヒートアイランド現象として知られている。その差はふつう夜にいちばん大きくなる。夜には、建物や道路が昼間に吸収した熱を放出するからだ。',
      'いくつかの要因がこの現象の原因となっている。アスファルトのような暗い色の表面は植物よりも多くの日光を吸収し、高い建物のあいだのせまい空間は暖かい空気を閉じこめることがある。さらに、車やエアコン、工場はどれも熱を直接まわりに放出する。',
      '気温が高くなると、エネルギーの使用量がふえ、熱波のときには人々の健康がおびやかされることがあるため、多くの都市が今、温度を下げる方法を探している。日かげをつくり水蒸気を出す木を植えることは、最も効果的な方法の一つだ。また、屋根を白くぬって、日光を吸収するのではなく反射させるようにしている都市もある。こうした小さな変化も、何千もの建物でくり返されれば、都市全体の気温に目に見えるちがいを生むことがある。',
    ],
    blanks: [
      { id: 'A', choices: ['when', 'which', 'what', 'whose'], answer: 0, why: '関係副詞 when。at night（夜）を受けて「そのときに〜」。後ろは主語・目的語のそろった文なので which・what は入らない。' },
      { id: 'B', choices: ['release', 'reduce', 'remove', 'receive'], answer: 0, why: 'release heat「熱を放出する」。車・エアコン・工場が熱を出す。' },
      { id: 'C', choices: ['instead of', 'in addition to', 'as well as', 'because of'], answer: 0, why: 'instead of -ing「〜する代わりに」。吸収するのではなく反射する。' },
    ],
    tf: [
      { statement: 'The urban heat island effect is usually strongest at night.', answer: true, why: '第1段落 The difference is usually greatest at night。' },
      { statement: 'Asphalt absorbs less sunlight than plants do.', answer: false, why: '第2段落 Dark surfaces such as asphalt absorb more sunlight than vegetation does。' },
      { statement: 'Some cities paint roofs white so that they absorb more sunlight.', answer: false, why: '第3段落 reflect sunlight instead of absorbing it（吸収ではなく反射）。' },
    ],
    qa: [
      { q: 'Why are trees effective at cooling cities?', choices: ['They provide shade and release water vapor.', 'They absorb heat from cars.', 'They make buildings taller.', 'They stop people from using air conditioners.'], answer: 0, why: '第3段落 Planting trees, which provide shade and release water vapor。' },
    ],
  },
  {
    id: 'toefl-bee-dance',
    title: 'The Language of Bees',
    level: 'TOEFL・IELTS（生物）',
    paragraphs: [
      'When a honeybee finds a good source of food, it returns to the hive and performs a kind of dance. This behavior, first explained in detail by the scientist Karl von Frisch, allows the bee to share information ( A ) the location of the food with its nestmates.',
      'If the food is close to the hive, the bee performs a round dance, moving in small circles. If it is farther away, the bee performs a waggle dance, running in a straight line while shaking its body and then circling back to repeat. The angle of the straight run relative to vertical indicates the direction of the food relative to the sun, ( B ) the length of the run indicates the distance.',
      'What makes this system remarkable is that it ( C ) bees to communicate about something that is not present. Few animals other than humans are known to share information about distant places in such a precise way, which is one reason the dance continues to fascinate researchers.',
    ],
    ja: [
      'ミツバチはよい食べ物のある場所を見つけると、巣にもどって一種のダンスをする。科学者カール・フォン・フリッシュがはじめてくわしく説明したこの行動によって、ハチは食べ物の場所についての情報を巣の仲間と共有することができる。',
      '食べ物が巣の近くにあれば、ハチは小さな円をえがいて動く円形ダンスをする。もっと遠くにあれば、体をふりながらまっすぐに走り、円をえがいてもどってはくり返す、尻ふりダンスをする。まっすぐに走る向きの真上からの角度は、太陽に対する食べ物の方向を表し、一方で走る長さは距離を表す。',
      'このしくみがおどろくべきなのは、目の前にないものについてハチが伝え合えることだ。人間以外で、遠くの場所についての情報をこれほど正確に共有することが知られている動物はほとんどいない。それが、このダンスが研究者たちをひきつけ続けている理由の一つである。',
    ],
    blanks: [
      { id: 'A', choices: ['about', 'to', 'by', 'into'], answer: 0, why: 'information about 〜「〜についての情報」。' },
      { id: 'B', choices: ['while', 'unless', 'because', 'until'], answer: 0, why: '対比の while「一方で」。角度は方向を、長さは距離を表す。' },
      { id: 'C', choices: ['allows', 'stops', 'makes', 'lets'], answer: 0, why: 'allow A to do「Aが〜するのを可能にする」。make・let は後ろに to をとらない（make A do / let A do）。' },
    ],
    tf: [
      { statement: 'Bees perform the same dance no matter how far away the food is.', answer: false, why: '第2段落 近ければ円形ダンス、遠ければ尻ふりダンス。' },
      { statement: 'The direction of the waggle run shows the direction of the food in relation to the sun.', answer: true, why: '第2段落 The angle of the straight run ... indicates the direction of the food relative to the sun。' },
      { statement: 'According to the passage, many animals share information about distant places as precisely as bees do.', answer: false, why: '第3段落 Few animals other than humans are known to ...（ほとんどいない）。' },
    ],
    qa: [
      { q: 'What does the length of the waggle run show?', choices: ['How far away the food is.', 'How much food there is.', 'What kind of flower it is.', 'How many bees should go.'], answer: 0, why: '第2段落 the length of the run indicates the distance。' },
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
    id: 'toefl-volcano',
    title: 'Volcanoes and Climate',
    level: 'TOEFL・IELTS（地学）',
    paragraphs: [
      "Large volcanic eruptions can affect the climate of the entire planet. When a powerful volcano erupts, it can send sulfur dioxide high into the stratosphere, where it combines with water to form tiny droplets. These droplets reflect part of the incoming sunlight back into space, ( A ) the Earth's surface to cool.",
      'A well-known example is the eruption of Mount Pinatubo in the Philippines in 1991. In the following year, average global temperatures dropped by about half a degree Celsius. The effect did not last, ( B ), because the droplets gradually fell out of the atmosphere within a few years.',
      "Even larger eruptions in the past had more dramatic results. After the eruption of Mount Tambora in Indonesia in 1815, parts of Europe and North America experienced such cold weather that 1816 became known as 'the year without a summer.' Crops failed in many regions, ( C ) food shortages and high prices. Such events remind us how closely human life depends on a stable climate.",
    ],
    ja: [
      '大きな火山の噴火は、地球全体の気候に影響をあたえることがある。強力な火山が噴火すると、二酸化硫黄を成層圏の高いところまで送りこむことがあり、そこで水と結びついて小さなしずくになる。これらのしずくは、入ってくる日光の一部を宇宙へはね返し、地表を冷やす。',
      'よく知られた例が、1991年のフィリピンのピナツボ山の噴火だ。翌年、世界の平均気温はおよそ0.5℃下がった。しかしその影響は長くは続かなかった。しずくは数年のうちに少しずつ大気から落ちていったからである。',
      '過去のさらに大きな噴火は、もっと劇的な結果をもたらした。1815年のインドネシアのタンボラ山の噴火のあと、ヨーロッパと北アメリカの一部ではとても寒い天気が続き、1816年は「夏のない年」として知られるようになった。多くの地域で作物が不作になり、食料不足と物価の高騰につながった。こうしたできごとは、人間の生活がいかに安定した気候に頼っているかを思い出させてくれる。',
    ],
    blanks: [
      { id: 'A', choices: ['causing', 'caused', 'to cause it', 'causes'], answer: 0, why: '分詞構文。「日光をはね返し、（その結果）地表を冷やす」。cause A to do「Aに〜させる」。' },
      { id: 'B', choices: ['however', 'therefore', 'for example', 'instead'], answer: 0, why: '逆接の however「しかし」。気温は下がったが、その影響は続かなかった。' },
      { id: 'C', choices: ['leading to', 'leading', 'led to', 'lead'], answer: 0, why: '分詞構文 leading to 〜「（その結果）〜につながる」。lead to 〜 で「〜につながる」。' },
    ],
    tf: [
      { statement: 'Volcanic droplets in the stratosphere reflect some sunlight back into space.', answer: true, why: '第1段落 These droplets reflect part of the incoming sunlight back into space。' },
      { statement: 'The cooling caused by Mount Pinatubo lasted for several decades.', answer: false, why: '第2段落 The effect did not last ... within a few years（数年のうちに）。' },
      { statement: 'The year without a summer happened before the eruption of Mount Tambora.', answer: false, why: '第3段落 噴火は1815年、夏のない年は1816年（噴火のあと）。' },
    ],
    qa: [
      { q: 'What happened after the eruption of Mount Tambora?', choices: ['Cold weather caused crops to fail in some regions.', 'Global temperatures rose sharply.', 'Mount Pinatubo erupted.', 'Food became cheaper in Europe.'], answer: 0, why: '第3段落 Crops failed in many regions。' },
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
    id: 'toefl-rainbow',
    title: 'How Rainbows Form',
    level: 'TOEFL・IELTS（物理）',
    paragraphs: [
      'A rainbow appears when sunlight shines through drops of water in the air. Although sunlight looks white, it is ( A ) made up of many colors mixed together. This can be shown by passing light through a glass prism, which separates it into a band of red, orange, yellow, green, blue, and violet.',
      'When light enters a raindrop, it bends, a process called refraction. Different colors bend by slightly different amounts, so they spread out. The light then reflects off the back of the drop and bends again as it leaves. As a result, each color comes out at a slightly different angle, ( B ) the band of colors we see.',
      'To see a rainbow, you must stand with the sun behind you and the rain in front of you. This is why rainbows are most common in the early morning or late afternoon, ( C ) the sun is low in the sky. Under the right conditions, a fainter second rainbow may appear above the first, with its colors in reverse order.',
    ],
    ja: [
      '虹は、空気中の水のしずくに日光が差しこむと現れる。日光は白く見えるが、実はたくさんの色が混ざり合ってできている。このことは、光をガラスのプリズムに通すと確かめられる。プリズムは光を、赤・だいだい・黄・緑・青・むらさきの帯に分けるのだ。',
      '光は雨つぶに入ると曲がる。これは屈折とよばれる現象だ。色によって曲がり方がわずかにちがうので、色が広がる。光はそれから、しずくの奥ではね返り、外に出るときにもう一度曲がる。その結果、それぞれの色が少しずつちがう角度で出てきて、私たちが見る色の帯をつくり出す。',
      '虹を見るには、太陽を背にして、雨を前にして立たなければならない。だから虹は、太陽が空の低いところにある早朝や夕方によく見られる。条件がそろうと、最初の虹の上に、色の順番が逆になった、うすい2本目の虹が現れることもある。',
    ],
    blanks: [
      { id: 'A', choices: ['actually', 'hardly', 'rarely', 'never'], answer: 0, why: 'actually「実は」。白く見えるが、実はたくさんの色でできている、という逆接の流れ。' },
      { id: 'B', choices: ['creating', 'created', 'to creating', 'creates'], answer: 0, why: '分詞構文 creating「（その結果）〜をつくり出す」。前の文全体の結果を表す。' },
      { id: 'C', choices: ['when', 'which', 'what', 'where'], answer: 0, why: '関係副詞 when。the early morning or late afternoon（時）を受けて「そのときは〜」。' },
    ],
    tf: [
      { statement: 'Sunlight is made up of only one color.', answer: false, why: '第1段落 it is actually made up of many colors mixed together。' },
      { statement: 'To see a rainbow, the sun should be behind you.', answer: true, why: '第3段落 stand with the sun behind you and the rain in front of you。' },
      { statement: 'In a second rainbow, the colors appear in the same order as in the first.', answer: false, why: '第3段落 with its colors in reverse order（逆の順番）。' },
    ],
    qa: [
      { q: 'Why are rainbows most common in the early morning or late afternoon?', choices: ['The sun is low in the sky then.', 'It rains only at those times.', 'The air is warmer then.', 'The sun is directly overhead.'], answer: 0, why: '第3段落 when the sun is low in the sky。' },
    ],
  },
]
