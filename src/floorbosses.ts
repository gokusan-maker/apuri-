import type { BossLook } from './boss'
import type { CourseId } from './wordcourse'

// ボスの城の1〜4階を守る「階のボス」（15レベル×4体＝60体。オーナーの要望：ボスの数を増やす）
// 順番は 1階 単語・2階 文法・3階 読解・4階 ミックス。レベルが上がるほど色は暗く、こわくなる
export const FLOOR_BOSSES: Record<CourseId, BossLook[]> = {
  '中1': [
    { name: 'ツヅリケシモチ', desc: 'appleのつづりをこっそり消して、文字をバラバラにするぞ', color: '#e86247', line: '#872411', eye: '#fcf0ee', taunt: { en: 'I will eat all your words!', ja: 'おまえの単語、ぜんぶ食べちゃうぞ！' } },
    { name: 'ビードウシマゼモチ', desc: 'I am play みたいに、be動詞と一般動詞をまぜこぜにする', color: '#44a314', line: '#22520a', eye: '#f2fcee', deco: 'leaf', taunt: { en: 'I am Mochi, and I play tricks!', ja: 'ぼくはモチ。いたずらが大好きだ！' } },
    { name: 'ヨコガキメマワシモチ', desc: '短い英語の自己紹介文をぐるぐる回して、目を回させる', color: '#179db8', line: '#0b4e5c', eye: '#eefafc', taunt: { en: 'Read this. Who is Ken?', ja: 'これを読んで。ケンってだれ？' } },
    { name: 'ハジメテオドカシモチ', desc: '単語も文法も読解も、初めての英語をまとめてぶつけてくる', color: '#b753ea', line: '#64118d', eye: '#f7eefc', deco: 'antenna', taunt: { en: 'Welcome to English. Can you beat me?', ja: '英語の世界へようこそ。ぼくに勝てるかな？' } },
  ],
  '中2': [
    { name: 'フキソクカクシモチ', desc: 'went や saw の元の形をかくして、思い出せなくする', color: '#cb7c1c', line: '#653e0e', eye: '#fcf6ee', deco: 'leaf', taunt: { en: 'Go, went, gone. Did you forget?', ja: 'go、went、gone。忘れちゃった？' } },
    { name: 'ミライネジマゲモチ', desc: 'will と be going to をねじって、未来の文をこんがらせる', color: '#17a71e', line: '#0b530f', eye: '#eefcee', taunt: { en: 'Tomorrow you will lose to me.', ja: '明日、おまえはぼくに負けるだろう' } },
    { name: 'テガミマギレモチ', desc: '英語の手紙やメールに、知らない単語をまぎれこませる', color: '#458ee6', line: '#124584', eye: '#eef4fc', deco: 'speaker', taunt: { en: 'Can you find the answer in my letter?', ja: 'ぼくの手紙の中に答えを見つけられるかな？' } },
    { name: 'ヒカクグルグルモチ', desc: '比較級と不定詞と単語問題を、ぐるぐる交互に出してくる', color: '#e543dd', line: '#82127d', eye: '#fceefb', taunt: { en: 'I am bigger and stronger than you.', ja: 'ぼくはおまえより大きくて強いのだ' } },
  ],
  '中3': [
    { name: 'ジュクゴバラシモチ', desc: 'look for や take care of の熟語をバラバラにしちゃう', color: '#9d9417', line: '#4e4a0c', eye: '#fcfbee', taunt: { en: 'Take care of your idioms, little one.', ja: '熟語には気をつけな、ちびっこ' } },
    { name: 'カンケイモツレモチ', desc: 'who と which をもつれさせて、関係代名詞で迷わせる', color: '#19a556', line: '#0c532b', eye: '#eefcf4', deco: 'antenna', taunt: { en: 'The boss who guards this floor is me.', ja: 'この階を守るボス、それはぼくだ' } },
    { name: 'チョウブンアクビモチ', desc: '入試に出る長めの英文で、あくびを止まらなくさせる', color: '#3d48e2', line: '#131a7d', eye: '#eeeffc', taunt: { en: 'This story has been going on for hours.', ja: 'この話、もう何時間も続いているぞ' } },
    { name: 'ジュケンカベモチ', desc: '高校入試レベルの総合問題で、行く手に高い壁をつくる', color: '#e23d9b', line: '#7d134f', eye: '#fceef6', deco: 'mortarboard', taunt: { en: 'Have you studied enough for the exam?', ja: '試験勉強はもう十分したのか？' } },
  ],
  '高1': [
    { name: 'タギゴマドワシモチ', desc: 'run や book に別の意味をこっそり足して、まどわせる', color: '#749e1a', line: '#3a4f0d', eye: '#f7fcee', deco: 'helmet', taunt: { en: 'A word can have many faces, you know.', ja: '単語にはいくつもの顔があるんだよ' } },
    { name: 'ブンケイクズシモチ', desc: 'SVOC の順番をくずして、文の骨組みを見えなくする', color: '#1aa289', line: '#0d5145', eye: '#eefcf9', taunt: { en: 'Subject, verb, object... which one is which?', ja: '主語、動詞、目的語…どれがどれだ？' } },
    { name: 'パラグラフメイロモチ', desc: '段落の要点をかくして、英文の中で迷子にさせる', color: '#6933de', line: '#321375', eye: '#f2eefc', deco: 'scholar', taunt: { en: 'Where is the main idea hiding now?', ja: '要点はいまどこに隠れているかな？' } },
    { name: 'モンダイキリカエモチ', desc: '単語・文法・長文を次々に切りかえて、頭を休ませない', color: '#de3352', line: '#751325', eye: '#fceef0', taunt: { en: 'Next question! Do not stop thinking!', ja: '次の問題！考えるのをやめるな！' } },
  ],
  '高2': [
    { name: 'ハセイゴフヤシモチ', desc: '名詞・動詞・形容詞の派生語をどんどん増やして混乱させる', color: '#45a31d', line: '#22510e', eye: '#f2fcee', deco: 'speaker', taunt: { en: 'Decide, decision, decisive. Choose wisely.', ja: 'decide、decision、decisive。よく選べ' } },
    { name: 'カテイホウユガメモチ', desc: '仮定法の時制をゆがめて、もしもの世界に閉じこめる', color: '#219ab9', line: '#104d5c', eye: '#eef9fc', taunt: { en: 'If I were you, I would give up.', ja: 'ぼくがおまえなら、あきらめるね' } },
    { name: 'ロンセツカクランモチ', desc: '論説文の but や however を隠して、筆者の主張をぼかす', color: '#a429d9', line: '#53136e', eye: '#f8eefc', deco: 'scholar', taunt: { en: 'However, the writer meant something else entirely.', ja: 'しかし、筆者の言いたいことはまったく別なのだ' } },
    { name: 'ニタクジゴクモチ', desc: 'どれも正しそうな選択肢を並べて、最後の二択で迷わせる', color: '#d94c29', line: '#6e2513', eye: '#fcf1ee', deco: 'helmet', taunt: { en: 'Both answers look right, but only one is.', ja: 'どちらも正解に見えるが、正解は一つだけだ' } },
  ],
  '高3': [
    { name: 'タンゴナダレモチ', desc: '入試の重要単語を雪崩のように落として、記憶を埋めつくす', color: '#20a62b', line: '#105315', eye: '#eefcef', deco: 'thunder', taunt: { en: 'Thousands of words are falling upon you.', ja: '何千もの単語がおまえに降りそそぐ' } },
    { name: 'ブンシコウブンモチ', desc: '分詞構文の主語を消して、だれが何をしたか分からなくする', color: '#276ccc', line: '#133666', eye: '#eef4fc', taunt: { en: 'Having lost your way, you will surely fail.', ja: '道に迷った以上、おまえは必ず失敗する' } },
    { name: 'ジカンドロボウモチ', desc: '共通テストの長文で、試験時間をこっそりぬすんでいく', color: '#cc27bf', line: '#66135f', eye: '#fceefb', deco: 'mortarboard', taunt: { en: 'The clock is ticking faster than you think.', ja: '時計はおまえが思うより速く進んでいるぞ' } },
    { name: 'ゼンハンイモチ', desc: '高校3年間の全範囲から、容赦なく総合問題を浴びせる', color: '#c28025', line: '#614012', eye: '#fcf6ee', taunt: { en: 'Everything you learned will be tested today.', ja: '学んだすべてが今日試される' } },
  ],
  '私学': [
    { name: 'ドウギゴスリカエモチ', desc: '似た意味の単語をすり替えて、同意語選択でひっかける', color: '#21a05c', line: '#10502e', eye: '#dcf9ea', taunt: { en: 'Similar words are not always the same word.', ja: '似た単語がいつも同じとは限らない' } },
    { name: 'セイゴシテキモチ', desc: '正しそうな英文に一か所だけミスを仕込み、見逃させる', color: '#272cbe', line: '#13165f', eye: '#dcddf9', deco: 'mask', taunt: { en: 'One mistake hides somewhere in this sentence.', ja: 'この文のどこかに、ミスが一つ隠れている' } },
    { name: 'ナイヨウフイッチモチ', desc: '本文と少しだけ違う選択肢で、内容一致問題を惑わせる', color: '#be2777', line: '#5f133c', eye: '#f9dcec', taunt: { en: 'Read carefully. The details will betray you.', ja: 'よく読め。細部がおまえを裏切るぞ' } },
    { name: 'ナラベカエアラシモチ', desc: '整序問題の語句をかき回し、文法も単語も同時に試す', color: '#96921f', line: '#4b490f', eye: '#f9f8dc', deco: 'thunder', taunt: { en: 'Put these words in order, if you can.', ja: 'できるものなら、この語句を並べてみろ' } },
  ],
  '私学難関': [
    { name: 'ゴイノウミモチ', desc: '難関私大レベルの難単語の海に、受験生をしずめてしまう', color: '#229d8a', line: '#114e45', eye: '#dcf9f5', deco: 'wings', taunt: { en: 'Drown in an ocean of obscure vocabulary.', ja: '難解な語彙の海でおぼれるがいい' } },
    { name: 'トウチサカサマモチ', desc: 'Never have I のような倒置で、語順をさかさまにする', color: '#5727b0', line: '#2b1358', eye: '#e6dcf9', taunt: { en: 'Never have I met so weak a challenger.', ja: 'これほど弱い挑戦者には会ったことがない' } },
    { name: 'ヒニクマジリモチ', desc: '皮肉や比喩だらけの英文で、筆者の本音を読ませない', color: '#b0273b', line: '#58131e', eye: '#f9dce1', deco: 'mask', taunt: { en: 'Oh, what a brilliant reader you are, indeed.', ja: 'おやおや、なんと優秀な読み手だこと' } },
    { name: 'ヒッカケダラケモチ', desc: '語彙にも文法にも長文にも、すべてにひっかけを仕込む', color: '#709b22', line: '#384d11', eye: '#eff9dc', deco: 'horns', taunt: { en: 'Every choice here is a clever trap.', ja: 'ここにある選択肢はすべて巧妙なワナだ' } },
  ],
  '国公立': [
    { name: 'ミチゴフウインモチ', desc: '未知語を本文にばらまき、文脈から意味を推測させる', color: '#2685a2', line: '#134251', eye: '#dcf2f9', taunt: { en: 'Guess the meaning from the context, scholar.', ja: '文脈から意味を推測せよ、学者くん' } },
    { name: 'ワヤクシバリモチ', desc: '入り組んだ構文の下線部和訳で、文の構造をつかませない', color: '#8126a2', line: '#401351', eye: '#f1dcf9', deco: 'scholar', taunt: { en: 'Translate this sentence, and keep it natural.', ja: 'この文を訳せ。ただし自然な日本語でな' } },
    { name: 'ジユウキジュツモチ', desc: '記述式の説明問題で、答案の字数をぎりぎり足りなくさせる', color: '#a24326', line: '#512113', eye: '#f9e3dc', deco: 'mortarboard', taunt: { en: 'Explain in your own words, within eighty characters.', ja: '八十字以内で、自分の言葉で説明せよ' } },
    { name: 'イケンクミタテモチ', desc: '意見を述べる英文の語句をバラバラにして、組み立てさせる', color: '#459e25', line: '#234f12', eye: '#e4f9dc', deco: 'crown', taunt: { en: 'Build your argument, one word at a time.', ja: '一語ずつ、議論を組み立ててみせよ' } },
  ],
  '旧帝大': [
    { name: 'チュウショウウズモチ', desc: '抽象的な学術語をうずまきにして、意味をつかませない', color: '#255094', line: '#13284a', eye: '#dce7f9', deco: 'wings', taunt: { en: 'Abstraction is merely the beginning of confusion.', ja: '抽象とは、混乱の始まりにすぎない' } },
    { name: 'ムセイブツシュゴモチ', desc: '無生物主語の構文で、だれが何をしたのかを見失わせる', color: '#942587', line: '#4a1344', eye: '#f9dcf6', taunt: { en: 'This tower leads you to inevitable defeat.', ja: 'この塔に入れば、おまえは必ず敗北する' } },
    { name: 'ギロンメイキュウモチ', desc: '段落ごとに論点が変わる評論文で、議論の迷宮に閉じこめる', color: '#946925', line: '#4a3513', eye: '#f9eedc', deco: 'scholar', taunt: { en: 'Follow the argument, or be lost forever.', ja: '議論についてこい。さもなくば永遠に迷え' } },
    { name: 'テイダイモンバンモチ', desc: '語彙・構文・長文の総合力で、難関の門を守り続ける', color: '#259432', line: '#134a19', eye: '#dcf9e0', deco: 'horns', taunt: { en: 'Only true scholars may pass this gate.', ja: '真の学者のみがこの門を通れる' } },
  ],
  '京大': [
    { name: 'ヒョウゲンヒネリモチ', desc: '辞書にない言い回しをひねり出し、訳語を決めさせない', color: '#242487', line: '#121243', eye: '#dcdcf9', taunt: { en: 'No dictionary will save you here.', ja: 'ここではどんな辞書も役に立たない' } },
    { name: 'ソウニュウメイロモチ', desc: '挿入句をいくつも重ねて、文の主語と動詞を引き離す', color: '#872455', line: '#43122b', eye: '#f9dceb', deco: 'mask', taunt: { en: 'The verb, which you seek, lies far away.', ja: 'おまえが探す動詞は、はるか遠くにある' } },
    { name: 'ズイヒツユウゲンモチ', desc: '味わい深い随筆を和訳させ、行間の心まで問いつめる', color: '#878724', line: '#434312', eye: '#f9f9dc', deco: 'wings', taunt: { en: 'Translate not the words, but the heart.', ja: '言葉ではなく、心を訳してみせよ' } },
    { name: 'ワブンエイヤクモチ', desc: 'あいまいな日本文を英訳させ、表現の壁で立ちふさがる', color: '#248755', line: '#12432b', eye: '#dcf9eb', deco: 'flame', taunt: { en: 'Express the inexpressible in plain English.', ja: '言い表せぬものを、平易な英語で表してみよ' } },
  ],
  '東大': [
    { name: 'イミノフカミモチ', desc: '簡単な単語に深い意味を潜ませ、文脈での判断を迫る', color: '#44227a', line: '#22113d', eye: '#e7dcf9', taunt: { en: 'Even simple words conceal profound meanings.', ja: '簡単な単語でさえ、深い意味を隠している' } },
    { name: 'ゴブンテイセイモチ', desc: '五つの下線から誤りを探させ、精密な文法感覚を試す', color: '#7a222c', line: '#3d1116', eye: '#f9dce0', deco: 'mask', taunt: { en: 'Precision separates the worthy from the rest.', ja: '精密さこそが、ふさわしき者を分ける' } },
    { name: 'ヨウヤクシボリモチ', desc: '長く抽象的な評論文を、七十字の要約にしぼらせる', color: '#587a22', line: '#2c3d11', eye: '#eef9dc', deco: 'wings', taunt: { en: 'Condense this abstract essay into seventy characters.', ja: 'この抽象的な評論を七十字に凝縮せよ' } },
    { name: 'ソウリョクセンモチ', desc: '要約も英作文も長文も一気に浴びせる、最難関の総力戦', color: '#227a6f', line: '#113d38', eye: '#dcf9f6', deco: 'crown', taunt: { en: 'Show me everything you have ever learned.', ja: 'これまで学んだすべてを見せてみろ' } },
  ],
  'TOEIC': [
    { name: 'ビジネスゴイモチ', desc: 'invoice や quarterly などのビジネス語で、会議を混乱させる', color: '#5b216d', line: '#2e1036', eye: '#f2dcf9', deco: 'speaker', taunt: { en: 'Please submit the invoice by Friday.', ja: '金曜日までに請求書を提出してください' } },
    { name: 'ヒンシエラビモチ', desc: '空所に入る品詞を一瞬で選ばせ、時間切れに追いこむ', color: '#6d3521', line: '#361a10', eye: '#f9e4dc', taunt: { en: 'Noun or adverb? You have three seconds.', ja: '名詞か副詞か？三秒で決めろ' } },
    { name: 'ダブルパッセージモチ', desc: 'メールと広告を何枚も読ませ、情報の照らし合わせで迷わせる', color: '#326d21', line: '#193610', eye: '#e3f9dc', deco: 'mask', taunt: { en: 'The answer is hidden in the second email.', ja: '答えは二通目のメールに隠されている' } },
    { name: 'ニヒャクモンモチ', desc: '二時間で二百問を浴びせ、集中力をじわじわ削っていく', color: '#21586d', line: '#102c36', eye: '#dcf1f9', deco: 'flame', taunt: { en: 'Two hundred questions, and no time to rest.', ja: '二百問だ。休むひまなどない' } },
  ],
  'TOEFL・IELTS': [
    { name: 'ガクジュツゴイモチ', desc: 'photosynthesis など大学講義の学術語で、理解の壁をつくる', color: '#601e56', line: '#300f2b', eye: '#f9dcf5', deco: 'horns', taunt: { en: 'Photosynthesis is just the first lecture.', ja: '光合成なんて最初の講義にすぎない' } },
    { name: 'メイシカカタメモチ', desc: '動詞を名詞化した硬い学術英語で、文の意味を閉ざす', color: '#60491e', line: '#30250f', eye: '#f9efdc', taunt: { en: 'The implementation of this policy requires careful consideration.', ja: 'この政策の実施には慎重な検討が必要である' } },
    { name: 'ロンブンヤマヅミモチ', desc: '専門分野の論文を大量に読ませ、要旨をつかむ前に時間を奪う', color: '#1e6028', line: '#0f3014', eye: '#dcf9e1', deco: 'wings', taunt: { en: 'Summarize the findings of this research article.', ja: 'この研究論文の結果を要約せよ' } },
    { name: 'ヨンギノウセメモチ', desc: '読む・聞く・話す・書くの四技能を、休みなく同時に攻める', color: '#1e3560', line: '#0f1b30', eye: '#dce6f9', deco: 'flame', taunt: { en: 'Reading, listening, speaking, writing. Bring them all.', ja: '読む、聞く、話す、書く。全部持ってこい' } },
  ],
  'ネイティブ': [
    { name: 'スラングマミレモチ', desc: '辞書にのらないスラングを連発して、会話から置いていく', color: '#541c36', line: '#2a0e1b', eye: '#f9dcea', deco: 'speaker', taunt: { en: 'That ship has sailed, buddy.', ja: 'もう手遅れだよ、相棒' } },
    { name: 'ショウリャクグセモチ', desc: '主語も助動詞も省いた会話文で、文法の手がかりを消す', color: '#52541c', line: '#292a0e', eye: '#f8f9dc', deco: 'mask', taunt: { en: 'Gotta go. Wanna come or not?', ja: 'もう行かなきゃ。来るの、来ないの？' } },
    { name: 'ジョークカクシモチ', desc: '新聞コラムやジョークの裏の意味を、まったく読み取らせない', color: '#1c543a', line: '#0e2a1d', eye: '#dcf9ec', deco: 'horns', taunt: { en: 'If you get the joke, you might win.', ja: 'このジョークが分かれば、勝てるかもな' } },
    { name: 'エイゴノキワミモチ', desc: '単語も文法も読解も、ネイティブの速さで次々と襲いかかる', color: '#1e1c54', line: '#0f0e2a', eye: '#dddcf9', deco: 'crown', taunt: { en: 'Speak like a native, or fall like a mortal.', ja: 'ネイティブのように話せ。さもなくば凡人として散れ' } },
  ],
}
