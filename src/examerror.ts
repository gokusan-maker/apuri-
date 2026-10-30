// 入試の正誤問題：文の4か所（A〜D）のうち、まちがっている1か所を選ぶ。問題・解説はすべて自作
import type { GrammarUnit } from './grammar'

export const EXAM_ERROR: GrammarUnit[] = [
  {
    id: 'exam-error-tense',
    title: '入試の正誤問題①（時制・態）',
    points: [
      '文の (A)〜(D) のうち、文法的にまちがっている1か所を選ぶ。入試の正誤問題と同じ形。',
      '時制は「いつの話か」を表す語（ago・since・by the time・the day before）、態は「する側かされる側か」に注目する。',
    ],
    examples: [
      { en: 'I lost the key that I had bought the day before.', ja: '前の日に買ったかぎをなくした。（なくした時点より前なので過去完了）' },
      { en: 'This song is loved by people all over the world.', ja: 'この歌は世界中の人々に愛されている。（歌は「愛される」側）' },
    ],
    questions: [
      { sentence: 'My brother (A) has lived in Osaka (B) since he (C) has graduated from college (D) five years ago.', choices: ['(A) has lived', '(B) since', '(C) has graduated', '(D) five years ago'], answer: 2, why: 'five years ago は過去の一点を表すので、since のあとは過去形 graduated。現在完了は ago といっしょに使えない。' },
      { sentence: 'When I (A) arrived at the station, the last train (B) has already (C) left, so I (D) took a taxi.', choices: ['(A) arrived', '(B) has already', '(C) left', '(D) took'], answer: 1, why: '駅に着いた（過去）より前に出てしまっていたので、過去完了 had already left。' },
      { sentence: 'This bridge (A) was built (B) in 1970 and (C) has been repaired (D) since three times.', choices: ['(A) was built', '(B) in 1970', '(C) has been repaired', '(D) since three times'], answer: 3, why: '回数は three times、そのあとに since（それ以来）を置く：has been repaired three times since。' },
      { sentence: 'The letter (A) was written (B) by my grandfather (C) is (D) kept in a small box.', choices: ['(A) was written', '(B) by my grandfather', '(C) is', '(D) kept'], answer: 0, why: '文の動詞は is kept。The letter をうしろから説明するのは過去分詞 written だけで、was はいらない。' },
      { sentence: 'If it (A) will rain tomorrow, the game (B) will be (C) put off (D) until next week.', choices: ['(A) will rain', '(B) will be', '(C) put off', '(D) until'], answer: 0, why: '条件を表す if の中は、未来のことでも現在形 rains。' },
      { sentence: 'By the time you (A) get home, I (B) will finish (C) cleaning (D) the whole house.', choices: ['(A) get', '(B) will finish', '(C) cleaning', '(D) the whole house'], answer: 1, why: '「帰ってくるまでには終えているだろう」と未来のある時点までの完了なので、未来完了 will have finished。' },
      { sentence: 'A lot of English (A) is spoken (B) in this city, and many tourists (C) are visited it (D) every year.', choices: ['(A) is spoken', '(B) in this city', '(C) are visited', '(D) every year'], answer: 2, why: '観光客は「訪れる」側で、うしろに目的語 it があるので能動の visit。' },
      { sentence: 'I (A) have been waiting (B) here (C) for an hour, but she (D) doesn\'t come yet.', choices: ['(A) have been waiting', '(B) here', '(C) for an hour', "(D) doesn't come"], answer: 3, why: 'yet「まだ」とともに「まだ来ていない」は現在完了の否定 hasn\'t come。' },
      { sentence: 'The new library, (A) which (B) opened last month, (C) is visiting by (D) many students.', choices: ['(A) which', '(B) opened', '(C) is visiting by', '(D) many students'], answer: 2, why: '図書館は「訪れられる」側なので受け身 is visited by。' },
      { sentence: 'She (A) was surprised (B) at the news that her favorite singer (C) has died (D) the day before.', choices: ['(A) was surprised', '(B) at', '(C) has died', '(D) the day before'], answer: 2, why: 'the day before「その前日に」は過去のある時点よりさらに前なので、過去完了 had died。' },
    ],
  },
  {
    id: 'exam-error-relative',
    title: '入試の正誤問題②（関係詞・分詞）',
    points: [
      '文の (A)〜(D) のうち、文法的にまちがっている1か所を選ぶ。',
      '関係詞は「先行詞が人か物か」「うしろの文に何が欠けているか」「コンマのあとか」、分詞は「する側（-ing）か、される側（過去分詞）か」に注目する。',
    ],
    examples: [
      { en: 'This is the house where my grandmother was born.', ja: 'これは祖母が生まれた家だ。（was born は目的語をとらないので where）' },
      { en: 'The picture painted by my sister won a prize.', ja: '姉がかいた絵が賞をとった。（絵は「かかれた」側なので過去分詞）' },
    ],
    questions: [
      { sentence: 'The man (A) who (B) lives next door (C) have a big dog (D) named Max.', choices: ['(A) who', '(B) lives next door', '(C) have a big dog', '(D) named Max'], answer: 2, why: '文の主語は The man（1人）なので動詞は has。who lives next door は The man を説明する部分。' },
      { sentence: 'This is the town (A) which my father (B) was born (C) and (D) grew up.', choices: ['(A) which my father', '(B) was born', '(C) and', '(D) grew up'], answer: 0, why: 'was born も grew up も目的語をとらないので、場所を表す関係副詞 where（または in which）。' },
      { sentence: 'Do you know the girl (A) whose (B) is talking (C) with our teacher (D) over there?', choices: ['(A) whose', '(B) is talking', '(C) with our teacher', '(D) over there'], answer: 0, why: 'うしろに主語が欠けていて（is talking）、先行詞は人なので who。whose のあとには名詞が必要。' },
      { sentence: 'The book (A) that I (B) bought it yesterday (C) is (D) very interesting.', choices: ['(A) that I', '(B) bought it yesterday', '(C) is', '(D) very interesting'], answer: 1, why: 'that が bought の目的語の役わりをしているので、it はいらない：that I bought yesterday。' },
      { sentence: 'I received a letter (A) from a friend (B) in Canada, (C) which was (D) wrote in English.', choices: ['(A) from a friend', '(B) in Canada', '(C) which was', '(D) wrote in English'], answer: 3, why: '手紙は「書かれた」側なので受け身 was written。wrote は過去形で、was のあとには置けない。' },
      { sentence: 'The children (A) playing in the park (B) looks (C) very happy (D) today.', choices: ['(A) playing in the park', '(B) looks', '(C) very happy', '(D) today'], answer: 1, why: '主語は The children（複数）なので動詞は look。playing in the park は children を説明する部分。' },
      { sentence: 'What I want to say (A) is (B) that we should (C) protect (D) the environment which we live.', choices: ['(A) is', '(B) that we should', '(C) protect', '(D) the environment which we live'], answer: 3, why: 'live は目的語をとらないので、the environment in which we live（または where we live）。' },
      { sentence: 'Kyoto, (A) that I visited (B) last year, (C) is famous (D) for its old temples.', choices: ['(A) that I visited', '(B) last year', '(C) is famous', '(D) for its old temples'], answer: 0, why: 'コンマのあと（非制限用法）では that は使えないので which I visited。' },
      { sentence: '(A) Seen from the top of the hill, the town (B) looked (C) likely (D) a toy.', choices: ['(A) Seen', '(B) looked', '(C) likely', '(D) a toy'], answer: 2, why: '「～のように見えた」は looked like ＋名詞。likely は「ありそうな」という形容詞で、名詞の前に置けない。' },
      { sentence: 'There were many people (A) waiting (B) for the bus, (C) most of them (D) were students.', choices: ['(A) waiting', '(B) for the bus', '(C) most of them', '(D) were students'], answer: 2, why: '2つの文をコンマだけでつなぐことはできないので、関係代名詞を使って most of whom were students。' },
    ],
  },
  {
    id: 'exam-error-compare',
    title: '入試の正誤問題③（比較・仮定法）',
    points: [
      '文の (A)〜(D) のうち、文法的にまちがっている1か所を選ぶ。',
      '比較は「何と何をくらべているか」「比較級を強める語（much・far）」、仮定法は「今の反対は過去形、過去の反対は had ＋過去分詞」に注目する。',
    ],
    examples: [
      { en: 'The climate of Kyoto is hotter than that of Sapporo.', ja: '京都の気候は札幌の気候より暑い。（くらべるのは気候どうしなので that of）' },
      { en: 'If I had known the answer, I would have told you.', ja: '答えを知っていたら、教えたのに。（過去の反対は had ＋過去分詞）' },
    ],
    questions: [
      { sentence: 'This is (A) the most (B) beautiful lake (C) that I have (D) never seen.', choices: ['(A) the most', '(B) beautiful lake', '(C) that I have', '(D) never seen'], answer: 3, why: '最上級のあとの「今まで見た中で」は that I have ever seen。never だと意味が通らない。' },
      { sentence: 'Tom is (A) much (B) taller (C) than (D) any boy in his class.', choices: ['(A) much', '(B) taller', '(C) than', '(D) any boy'], answer: 3, why: 'Tom もクラスの男の子なので、自分をのぞいて any other boy にする。' },
      { sentence: 'If I (A) were you, I (B) will (C) apologize to her (D) right away.', choices: ['(A) were', '(B) will', '(C) apologize to her', '(D) right away'], answer: 1, why: '今の事実と反対の仮定（If I were you）なので、後半は would ＋原形。' },
      { sentence: 'I wish I (A) can (B) speak French (C) as well (D) as you.', choices: ['(A) can', '(B) speak French', '(C) as well', '(D) as you'], answer: 0, why: 'I wish のあとの今かなわない願いは過去形：I wish I could speak。' },
      { sentence: 'The population of Tokyo is (A) much (B) larger (C) than (D) Osaka.', choices: ['(A) much', '(B) larger', '(C) than', '(D) Osaka'], answer: 3, why: 'くらべるのは「人口」どうしなので than that of Osaka。' },
      { sentence: 'If she (A) had taken the train, she (B) would not (C) miss (D) the meeting yesterday.', choices: ['(A) had taken', '(B) would not', '(C) miss', '(D) the meeting yesterday'], answer: 2, why: '過去の事実と反対の仮定なので、後半は would not have missed（would ＋ have ＋過去分詞）。' },
      { sentence: 'This problem is (A) more (B) easier (C) than (D) the last one.', choices: ['(A) more', '(B) easier', '(C) than', '(D) the last one'], answer: 0, why: 'easier はすでに比較級なので more はつけない。強めるなら much easier。' },
      { sentence: '(A) The more you (B) practice, (C) the better (D) can you play.', choices: ['(A) The more you', '(B) practice', '(C) the better', '(D) can you play'], answer: 3, why: 'the 比較級 ～, the 比較級 … のうしろはふつうの語順：the better you can play。' },
      { sentence: 'It is (A) high time you (B) go (C) to bed, (D) Ken.', choices: ['(A) high time', '(B) go', '(C) to bed', '(D) Ken'], answer: 1, why: 'It is (high) time ＋主語＋過去形「もう～する時間だ」：you went to bed。' },
      { sentence: 'She speaks English (A) as (B) fluent (C) as (D) a native speaker.', choices: ['(A) as', '(B) fluent', '(C) as', '(D) a native speaker'], answer: 1, why: '動詞 speaks を説明するので副詞 fluently：as fluently as。' },
    ],
  },
  {
    id: 'exam-error-verbal',
    title: '入試の正誤問題④（不定詞・動名詞・接続詞）',
    points: [
      '文の (A)〜(D) のうち、文法的にまちがっている1か所を選ぶ。',
      '動詞のあとが to ～ か ～ing か（decide to / give up ～ing）、前置詞のあとは ～ing、接続詞は1つの文に1つ（though と but を重ねない）に注目する。',
    ],
    examples: [
      { en: 'She gave up eating sweets to stay healthy.', ja: '彼女は健康でいるためにあまいものを食べるのをやめた。（give up ～ing）' },
      { en: 'We went out for a walk though it was raining hard.', ja: '雨が強くふっていたが、私たちは散歩に出かけた。' },
    ],
    questions: [
      { sentence: 'I (A) am looking forward (B) to (C) see you (D) again soon.', choices: ['(A) am looking forward', '(B) to', '(C) see you', '(D) again soon'], answer: 2, why: 'look forward to の to は前置詞なので、うしろは動名詞 seeing。' },
      { sentence: 'She (A) stopped (B) to eat sweets (C) because she wanted (D) to lose weight.', choices: ['(A) stopped', '(B) to eat sweets', '(C) because she wanted', '(D) to lose weight'], answer: 1, why: '「やせたいので、あまいものを食べるのをやめた」なので stop ～ing：stopped eating sweets。stop to eat は「食べるために立ち止まる」。' },
      { sentence: 'We went out (A) for a walk (B) though it (C) was raining (D) hardly.', choices: ['(A) for a walk', '(B) though it', '(C) was raining', '(D) hardly'], answer: 3, why: '「激しく」は hard。hardly は「ほとんど～ない」という別の意味の副詞。' },
      { sentence: 'Would you mind (A) to open (B) the window? It is (C) very hot (D) in here.', choices: ['(A) to open', '(B) the window', '(C) very hot', '(D) in here'], answer: 0, why: 'mind のあとは動名詞：Would you mind opening ～?' },
      { sentence: 'He decided (A) studying abroad (B) after he (C) graduated (D) from high school.', choices: ['(A) studying abroad', '(B) after he', '(C) graduated', '(D) from high school'], answer: 0, why: 'decide のあとは不定詞：decided to study abroad。' },
      { sentence: 'The game (A) was put off (B) until Sunday (C) because of (D) it was raining.', choices: ['(A) was put off', '(B) until Sunday', '(C) because of', '(D) it was raining'], answer: 2, why: 'うしろが主語＋動詞の文（it was raining）なので接続詞 because。because of のあとは名詞。' },
      { sentence: 'It is (A) kind (B) for you (C) to help me (D) with my homework.', choices: ['(A) kind', '(B) for you', '(C) to help me', '(D) with my homework'], answer: 1, why: 'kind のように人の性質を表す形容詞では of 人：It is kind of you to ～。' },
      { sentence: 'My father (A) has given up (B) smoking (C) when I (D) was born.', choices: ['(A) has given up', '(B) smoking', '(C) when I', '(D) was born'], answer: 0, why: 'when I was born は過去のある時点なので、現在完了ではなく過去形 gave up。' },
      { sentence: 'I remember (A) visiting (B) this museum (C) when I was a child, (D) so I know it very good.', choices: ['(A) visiting', '(B) this museum', '(C) when I was a child', '(D) so I know it very good'], answer: 3, why: '動詞 know を説明するのは副詞 well：know it very well。' },
      { sentence: 'Please call me (A) as soon as you (B) will arrive (C) at the station (D) tomorrow.', choices: ['(A) as soon as you', '(B) will arrive', '(C) at the station', '(D) tomorrow'], answer: 1, why: '時を表す as soon as の中は、未来のことでも現在形 arrive。' },
    ],
  },
  {
    id: 'exam-error-noun',
    title: '入試の正誤問題⑤（前置詞・代名詞・名詞）',
    points: [
      '文の (A)〜(D) のうち、文法的にまちがっている1か所を選ぶ。',
      '数えられない名詞（advice・furniture・news）、前置詞のいらない動詞（discuss・marry）、所有代名詞（mine・hers）、時の前置詞に注目する。',
    ],
    examples: [
      { en: 'My teacher gave me some useful advice.', ja: '先生は私に役に立つ助言をくれた。（advice は数えられないので a をつけない）' },
      { en: 'We discussed the plan after school.', ja: '私たちは放課後その計画について話し合った。（discuss は about をつけない）' },
    ],
    questions: [
      { sentence: 'I (A) gave him (B) an advice (C) about (D) his future.', choices: ['(A) gave him', '(B) an advice', '(C) about', '(D) his future'], answer: 1, why: 'advice は数えられない名詞なので an をつけない：some advice / a piece of advice。' },
      { sentence: '(A) Every students in (B) this class (C) has (D) a tablet.', choices: ['(A) Every students in', '(B) this class', '(C) has', '(D) a tablet'], answer: 0, why: 'every のあとは単数の名詞：Every student。' },
      { sentence: 'We (A) discussed (B) about the problem (C) for (D) two hours.', choices: ['(A) discussed', '(B) about the problem', '(C) for', '(D) two hours'], answer: 1, why: 'discuss は「～について話し合う」という意味の他動詞なので about をつけない：discussed the problem。' },
      { sentence: 'She got married (A) to a doctor (B) whom she (C) met him (D) in London.', choices: ['(A) to a doctor', '(B) whom she', '(C) met him', '(D) in London'], answer: 2, why: 'whom が met の目的語の役わりをしているので him はいらない：whom she met。' },
      { sentence: 'This room has (A) too (B) many furnitures (C) for (D) such a small space.', choices: ['(A) too', '(B) many furnitures', '(C) for', '(D) such a small space'], answer: 1, why: 'furniture は数えられない名詞なので複数形にせず、much を使う：too much furniture。' },
      { sentence: 'I am going to visit my grandparents (A) in (B) next week (C) with (D) my sister.', choices: ['(A) in', '(B) next week', '(C) with', '(D) my sister'], answer: 0, why: 'next week・last year・this morning などの前には前置詞をつけない。' },
      { sentence: 'Please (A) call me (B) at seven o’clock (C) in (D) Monday morning.', choices: ['(A) call me', '(B) at seven o’clock', '(C) in', '(D) Monday morning'], answer: 2, why: '曜日がつくと朝でも on：on Monday morning。' },
      { sentence: 'This book is (A) mine, and that one (B) on the desk (C) is (D) her.', choices: ['(A) mine', '(B) on the desk', '(C) is', '(D) her'], answer: 3, why: '「彼女のもの」は所有代名詞 hers。her だけでは名詞の代わりにならない。' },
      { sentence: 'He (A) arrived (B) to Tokyo (C) late (D) last night.', choices: ['(A) arrived', '(B) to Tokyo', '(C) late', '(D) last night'], answer: 1, why: 'arrive は to をとらない。都市など広い場所には arrive in、駅など地点には arrive at。' },
      { sentence: 'The news (A) were (B) so shocking (C) that nobody (D) said a word.', choices: ['(A) were', '(B) so shocking', '(C) that nobody', '(D) said a word'], answer: 0, why: 'news は -s で終わるが数えられない名詞で、単数あつかい：The news was ～。' },
    ],
  },
  {
    id: 'exam-error-agree',
    title: '入試の正誤問題⑥（一致・語順・助動詞）',
    points: [
      '文の (A)〜(D) のうち、文法的にまちがっている1か所を選ぶ。',
      '主語と動詞の一致（neither A nor B・everyone・the number of）、間接疑問の語順（疑問詞＋主語＋動詞）、助動詞のあとは原形、に注目する。',
    ],
    examples: [
      { en: 'Could you tell me where the station is?', ja: '駅がどこにあるか教えていただけますか。（文の中の疑問は主語＋動詞の順）' },
      { en: 'Everyone in my class likes music.', ja: 'クラスのみんなが音楽が好きだ。（everyone は単数あつかい）' },
    ],
    questions: [
      { sentence: 'Neither my brother nor my parents (A) is (B) going to (C) attend (D) the meeting.', choices: ['(A) is', '(B) going to', '(C) attend', '(D) the meeting'], answer: 0, why: 'neither A nor B の動詞は B（my parents＝複数）に合わせて are。' },
      { sentence: 'Could you tell me (A) where (B) is the station (C) near (D) here?', choices: ['(A) where', '(B) is the station', '(C) near', '(D) here'], answer: 1, why: '文の中に入った疑問（間接疑問）は疑問詞＋主語＋動詞の順：where the station is。' },
      { sentence: 'You (A) must not (B) to use your phone (C) during (D) the test.', choices: ['(A) must not', '(B) to use your phone', '(C) during', '(D) the test'], answer: 1, why: '助動詞 must のあとは to をつけない原形：must not use。' },
      { sentence: 'She (A) asked me (B) what time (C) did the meeting (D) start.', choices: ['(A) asked me', '(B) what time', '(C) did the meeting', '(D) start'], answer: 2, why: '間接疑問なので did を使わず主語＋動詞の順：what time the meeting started。' },
      { sentence: 'You (A) had better (B) not (C) going out (D) tonight.', choices: ['(A) had better', '(B) not', '(C) going out', '(D) tonight'], answer: 2, why: 'had better (not) のあとは動詞の原形：had better not go out。' },
      { sentence: 'Everyone in my family (A) like (B) to watch (C) soccer (D) on TV.', choices: ['(A) like', '(B) to watch', '(C) soccer', '(D) on TV'], answer: 0, why: 'everyone は単数あつかいなので likes。' },
      { sentence: 'He (A) needs not (B) worry about (C) the test (D) tomorrow.', choices: ['(A) needs not', '(B) worry about', '(C) the test', '(D) tomorrow'], answer: 0, why: '助動詞の need には -s をつけない：He need not worry。一般動詞なら He doesn’t need to worry。' },
      { sentence: 'This bag is (A) too heavy (B) for me (C) to carry (D) it.', choices: ['(A) too heavy', '(B) for me', '(C) to carry', '(D) it'], answer: 3, why: 'too ～ to … の文では、主語（This bag）が carry の目的語にあたるので it はいらない。' },
      { sentence: 'I don’t know (A) how old (B) is she, (C) but she looks (D) very young.', choices: ['(A) how old', '(B) is she', '(C) but she looks', '(D) very young'], answer: 1, why: '間接疑問は疑問詞＋主語＋動詞の順：how old she is。' },
      { sentence: 'It (A) is (B) about time (C) we (D) leave.', choices: ['(A) is', '(B) about time', '(C) we', '(D) leave'], answer: 3, why: 'It is (about / high) time ＋主語＋過去形「もう～してもよいころだ」：we left。' },
    ],
  },
  {
    id: 'exam-error-advanced',
    title: '入試の正誤問題⑦（総合・難関大）',
    points: [
      '文の (A)〜(D) のうち、文法的にまちがっている1か所を選ぶ。難関大でよく出る倒置・分詞構文・仮定法・付加疑問をまぜた総合問題。',
      '否定語が文の最初に出ると倒置（Hardly had I ～）、分詞構文の意味上の主語は文の主語と同じ、suggest that のあとは原形、に注目する。',
    ],
    examples: [
      { en: 'No sooner had she left than the phone rang.', ja: '彼女が出て行くとすぐに電話が鳴った。（No sooner ～ than の倒置）' },
      { en: 'After I had finished my homework, my mother let me watch TV.', ja: '宿題を終えたあと、母がテレビを見させてくれた。' },
    ],
    questions: [
      { sentence: '(A) Hardly (B) I had arrived (C) when it (D) began to rain.', choices: ['(A) Hardly', '(B) I had arrived', '(C) when it', '(D) began to rain'], answer: 1, why: '否定の Hardly が文の最初に出ると倒置になる：Hardly had I arrived when ～「着くとすぐに～」。' },
      { sentence: 'The doctor (A) suggested that he (B) stops (C) smoking (D) immediately.', choices: ['(A) suggested that he', '(B) stops', '(C) smoking', '(D) immediately'], answer: 1, why: 'suggest that のあとは動詞の原形（または should ＋原形）：he stop smoking。' },
      { sentence: '(A) Having finished (B) my homework, (C) my mother let me (D) watch TV.', choices: ['(A) Having finished', '(B) my homework', '(C) my mother let me', '(D) watch TV'], answer: 0, why: '分詞構文の意味上の主語は文の主語（my mother）になるが、宿題を終えたのは「私」。After I had finished とする。' },
      { sentence: 'Not until (A) he lost his job (B) he realized (C) how important (D) health was.', choices: ['(A) he lost his job', '(B) he realized', '(C) how important', '(D) health was'], answer: 1, why: 'Not until ～ が文の最初に出ると、主節は倒置：did he realize。' },
      { sentence: 'I (A) would rather (B) stay home (C) than (D) going out tonight.', choices: ['(A) would rather', '(B) stay home', '(C) than', '(D) going out'], answer: 3, why: 'would rather A than B の A・B はどちらも動詞の原形：than go out。' },
      { sentence: '(A) No sooner (B) had she left (C) when (D) the phone rang.', choices: ['(A) No sooner', '(B) had she left', '(C) when', '(D) the phone rang'], answer: 2, why: 'No sooner は than と組む：No sooner had she left than ～。when は Hardly / Scarcely と組む。' },
      { sentence: 'Hardly anyone (A) came (B) to the party, (C) didn’t (D) they?', choices: ['(A) came', '(B) to the party', '(C) didn’t', '(D) they'], answer: 2, why: 'hardly anyone は否定の意味なので、付加疑問は肯定の did they?' },
      { sentence: 'The house (A) whose roof (B) is red (C) belongs to (D) my uncle’s.', choices: ['(A) whose roof', '(B) is red', '(C) belongs to', '(D) my uncle’s'], answer: 3, why: 'belong to のあとは「人」：belongs to my uncle。my uncle’s（おじのもの）は使わない。' },
      { sentence: '(A) Were I (B) you, I (C) will accept (D) the offer at once.', choices: ['(A) Were I', '(B) you', '(C) will accept', '(D) the offer at once'], answer: 2, why: 'Were I you は If I were you の倒置（仮定法過去）なので、後半は would accept。' },
      { sentence: 'She is one of (A) the (B) most talented (C) pianist (D) in Japan.', choices: ['(A) the', '(B) most talented', '(C) pianist', '(D) in Japan'], answer: 2, why: 'one of the ＋最上級のあとの名詞は複数形：one of the most talented pianists。' },
    ],
  },
  {
    id: 'exam-error-medical',
    title: '入試の正誤問題⑧（総合・医学部）',
    points: [
      '文の (A)〜(D) のうち、文法的にまちがっている1か所を選ぶ。医学部の入試によく出る医療・健康の話題の文で、総合的に確かめる。',
      '長い主語の中心の名詞と動詞の一致、仮定法の倒置、分詞の向き（involved / developed）、前置詞と接続詞のちがい（despite / although）に注目する。',
    ],
    examples: [
      { en: 'The number of patients with diabetes has increased.', ja: '糖尿病の患者の数はふえている。（主語の中心は The number なので単数）' },
      { en: 'Despite the doctor’s warning, he continued to smoke.', ja: '医師の警告にもかかわらず、彼はたばこを吸い続けた。（despite のあとは名詞）' },
    ],
    questions: [
      { sentence: 'The patient, (A) whose symptoms (B) had worsened overnight, (C) were taken (D) to the ICU.', choices: ['(A) whose symptoms', '(B) had worsened overnight', '(C) were taken', '(D) to the ICU'], answer: 2, why: '文の主語は The patient（1人）なので was taken。コンマのあいだは説明の部分。' },
      { sentence: '(A) Unless the infection (B) is treated promptly, it (C) may spread (D) rapid.', choices: ['(A) Unless the infection', '(B) is treated promptly', '(C) may spread', '(D) rapid'], answer: 3, why: '動詞 spread を説明するので副詞 rapidly。' },
      { sentence: 'The number of people (A) suffering from allergies (B) have increased (C) markedly (D) in recent decades.', choices: ['(A) suffering from allergies', '(B) have increased', '(C) markedly', '(D) in recent decades'], answer: 1, why: '主語の中心は The number（数）なので単数あつかい：has increased。' },
      { sentence: '(A) Had the tumor (B) been detected earlier, the patient (C) might survive (D) the operation.', choices: ['(A) Had the tumor', '(B) been detected earlier', '(C) might survive', '(D) the operation'], answer: 2, why: 'Had the tumor been detected は If the tumor had been detected の倒置（過去の反対）なので、後半は might have survived。' },
      { sentence: 'The drug (A) was found (B) to be effective, (C) but its side effects (D) was serious.', choices: ['(A) was found', '(B) to be effective', '(C) but its side effects', '(D) was serious'], answer: 3, why: 'its side effects（複数）が主語なので were serious。' },
      { sentence: 'Researchers (A) have been studying (B) the disease (C) since (D) more than ten years.', choices: ['(A) have been studying', '(B) the disease', '(C) since', '(D) more than ten years'], answer: 2, why: '「10年以上のあいだ」と期間を表すので for。since は始まった時点を表す。' },
      { sentence: '(A) Although (B) the doctor’s warning, he (C) continued (D) to smoke.', choices: ['(A) Although', '(B) the doctor’s warning', '(C) continued', '(D) to smoke'], answer: 0, why: 'うしろが名詞（the doctor’s warning）なので前置詞 Despite。although のあとには主語＋動詞が必要。' },
      { sentence: 'The vaccine, (A) which (B) developed in 2020, (C) has saved (D) many lives.', choices: ['(A) which', '(B) developed in 2020', '(C) has saved', '(D) many lives'], answer: 1, why: 'ワクチンは「開発された」側なので受け身 which was developed。' },
      { sentence: '(A) Few patients (B) were aware (C) of the risks (D) involving in the treatment.', choices: ['(A) Few patients', '(B) were aware', '(C) of the risks', '(D) involving in the treatment'], answer: 3, why: 'the risks involved in ～「～にともなう危険」。be involved in の過去分詞を使う。' },
      { sentence: 'Not only (A) does smoking damage the lungs, (B) but it also (C) increase (D) the risk of heart disease.', choices: ['(A) does smoking damage the lungs', '(B) but it also', '(C) increase', '(D) the risk of heart disease'], answer: 2, why: '後半の主語 it（smoking）は3人称単数なので increases。' },
    ],
  },
  {
    id: 'exam-error-usage',
    title: '入試の正誤問題⑩（使役・知覚・動詞の語法）',
    points: [
      '文の (A)〜(D) のうち、文法的にまちがっている1か所を選ぶ。',
      'make / let / have ＋人＋原形、知覚動詞（see / hear）＋人＋原形、get ＋人＋ to ～、allow ＋人＋ to ～ のように、動詞ごとのうしろの形に注目する。',
    ],
    examples: [
      { en: 'My father let me use his camera.', ja: '父は私にカメラを使わせてくれた。（let ＋人＋原形）' },
      { en: 'My parents allow me to stay up late on Saturdays.', ja: '両親は土曜日には私が夜おそくまで起きているのを許してくれる。（allow ＋人＋ to ～）' },
    ],
    questions: [
      { sentence: 'My mother (A) made me (B) to clean (C) my room (D) before dinner.', choices: ['(A) made me', '(B) to clean', '(C) my room', '(D) before dinner'], answer: 1, why: '使役の make ＋人＋動詞の原形：made me clean。' },
      { sentence: 'Yesterday my father (A) let (B) my sister and me (C) to use (D) his computer.', choices: ['(A) let', '(B) my sister and me', '(C) to use', '(D) his computer'], answer: 2, why: 'let ＋人＋動詞の原形：let my sister and me use。' },
      { sentence: 'We (A) heard (B) someone (C) to call (D) our names.', choices: ['(A) heard', '(B) someone', '(C) to call', '(D) our names'], answer: 2, why: '知覚動詞 hear ＋人＋原形（または -ing）：heard someone call。' },
      { sentence: 'She (A) let to (B) her son (C) play (D) video games.', choices: ['(A) let to', '(B) her son', '(C) play', '(D) video games'], answer: 0, why: 'let のあとにすぐ人を置く：let her son play。to はいらない。' },
      { sentence: 'I (A) got my hair (B) cut (C) at a new salon (D) in last week.', choices: ['(A) got my hair', '(B) cut', '(C) at a new salon', '(D) in last week'], answer: 3, why: 'last week の前には前置詞をつけない。get ＋物＋過去分詞（cut）は正しい。' },
      { sentence: 'She (A) seems (B) to be tired, so let her (C) to rest (D) for a while.', choices: ['(A) seems', '(B) to be tired', '(C) to rest', '(D) for a while'], answer: 2, why: 'let ＋人＋原形：let her rest。' },
      { sentence: 'I (A) saw a man (B) to enter (C) the building (D) through the back door.', choices: ['(A) saw a man', '(B) to enter', '(C) the building', '(D) through the back door'], answer: 1, why: '知覚動詞 see ＋人＋原形（または -ing）：saw a man enter。' },
      { sentence: 'He (A) is said (B) that he (C) is (D) a good doctor.', choices: ['(A) is said', '(B) that he', '(C) is', '(D) a good doctor'], answer: 1, why: '人が主語なら He is said to be ～。that を使うなら It is said that he is ～。' },
      { sentence: 'Mr. Sato (A) suggested (B) me (C) that I should (D) see a doctor.', choices: ['(A) suggested', '(B) me', '(C) that I should', '(D) see a doctor'], answer: 1, why: 'suggest は人をすぐあとに置けない：suggested (to me) that I should ～。' },
      { sentence: '(A) It (B) took (C) three hours (D) for me to finishing the report.', choices: ['(A) It', '(B) took', '(C) three hours', '(D) for me to finishing the report'], answer: 3, why: 'It takes ＋時間＋ for 人 to ＋原形：for me to finish。' },
    ],
  },
  {
    id: 'exam-error-words',
    title: '入試の正誤問題⑪（make/do・say/tell など語法）',
    points: [
      '文の (A)〜(D) のうち、まちがっている1か所を選ぶ。',
      'make（作る）と do（する）、say（言う）と tell（人に伝える）、explain・marry のように前置詞や人の置き方がまぎらわしい動詞に注目する。TOEFL・IELTS の書き言葉でもよくまちがえる。',
    ],
    examples: [
      { en: 'I have to do my homework before dinner.', ja: '夕食前に宿題をしなければならない。（do one’s homework）' },
      { en: 'Could you tell me the way to the station?', ja: '駅への道を教えていただけますか。（tell ＋人＋物）' },
    ],
    questions: [
      { sentence: 'Could you (A) say me (B) the way (C) to (D) the station?', choices: ['(A) say me', '(B) the way', '(C) to', '(D) the station'], answer: 0, why: '「人に道を教える」は tell ＋人＋物：tell me the way。say は人を目的語にとらない。' },
      { sentence: 'I (A) have to (B) make (C) my homework (D) before dinner.', choices: ['(A) have to', '(B) make', '(C) my homework', '(D) before dinner'], answer: 1, why: '「宿題をする」は do my homework。make は「作る」。' },
      { sentence: 'He (A) told (B) that he (C) would (D) be late.', choices: ['(A) told', '(B) that he', '(C) would', '(D) be late'], answer: 0, why: 'tell は「だれに」が必要：told me that ～。人を言わないなら said that ～。' },
      { sentence: 'Please (A) don’t (B) forget (C) to make (D) the shopping.', choices: ['(A) don’t', '(B) forget', '(C) to make', '(D) the shopping'], answer: 2, why: '「買い物をする」は do the shopping。' },
      { sentence: 'The teacher (A) explained (B) us (C) the meaning (D) of the word.', choices: ['(A) explained', '(B) us', '(C) the meaning', '(D) of the word'], answer: 1, why: 'explain は人をすぐあとに置けない：explained the meaning of the word to us。' },
      { sentence: 'I (A) look forward (B) to (C) see (D) you again.', choices: ['(A) look forward', '(B) to', '(C) see', '(D) you again'], answer: 2, why: 'look forward to の to は前置詞なので動名詞：look forward to seeing。' },
      { sentence: 'She (A) married (B) with (C) a doctor (D) last year.', choices: ['(A) married', '(B) with', '(C) a doctor', '(D) last year'], answer: 1, why: 'marry は他動詞で with はいらない：married a doctor（get married to ～ も可）。' },
      { sentence: 'The doctor (A) advised (B) him (C) to give up (D) to smoke.', choices: ['(A) advised', '(B) him', '(C) to give up', '(D) to smoke'], answer: 3, why: 'give up のうしろは動名詞：give up smoking。' },
      { sentence: 'Let’s (A) make (B) a decision (C) after we (D) will hear his opinion.', choices: ['(A) make', '(B) a decision', '(C) after we', '(D) will hear his opinion'], answer: 3, why: '時を表す after の節では未来のことも現在形：after we hear。' },
      { sentence: 'He (A) lay (B) the book (C) on the desk and (D) went out.', choices: ['(A) lay', '(B) the book', '(C) on the desk and', '(D) went out'], answer: 0, why: '「（物を）置く」は他動詞 lay の過去形 laid。lay は lie（横になる）の過去形。' },
    ],
  },
  {
    id: 'exam-error-prep',
    title: '入試の正誤問題⑫（前置詞・冠詞の難問）',
    points: [
      '文の (A)〜(D) のうち、まちがっている1か所を選ぶ。',
      'arrive in / at、for と since、an honest、by bus（冠詞なし）、Mt. ～（the なし）、時刻の at など、前置詞と冠詞のこまかいきまりに注目する。',
    ],
    examples: [
      { en: 'She arrived in Tokyo late last night.', ja: '彼女は昨夜おそく東京に着いた。（arrive in ＋都市）' },
      { en: 'We usually go to school by bus.', ja: '私たちはふだんバスで学校へ行く。（by ＋乗り物に冠詞なし）' },
    ],
    questions: [
      { sentence: 'She (A) arrived (B) to (C) Tokyo (D) late last night.', choices: ['(A) arrived', '(B) to', '(C) Tokyo', '(D) late last night'], answer: 1, why: 'arrive のあとは到着する場所に合わせて in（都市・国）や at（駅など）：arrived in Tokyo。to は使わない。' },
      { sentence: 'I (A) have lived (B) in this town (C) since (D) five years.', choices: ['(A) have lived', '(B) in this town', '(C) since', '(D) five years'], answer: 2, why: '期間（five years）は for で表す。since は「～以来」で起点に使う。' },
      { sentence: 'He (A) is (B) a honest man who (C) works (D) at a bank.', choices: ['(A) is', '(B) a honest man who', '(C) works', '(D) at a bank'], answer: 1, why: 'honest は h を発音せず母音で始まるので an honest man。' },
      { sentence: 'We (A) usually go (B) to school (C) by the bus (D) every day.', choices: ['(A) usually go', '(B) to school', '(C) by the bus', '(D) every day'], answer: 2, why: '交通手段の by のあとは冠詞をつけない：by bus。' },
      { sentence: '(A) The water (B) in this river (C) is very clean, so we can swim (D) at it.', choices: ['(A) The water', '(B) in this river', '(C) is very clean, so we can swim', '(D) at it'], answer: 3, why: '川の「中で」泳ぐので in：swim in it。' },
      { sentence: '(A) The Mt. Fuji is (B) the highest mountain (C) in (D) Japan.', choices: ['(A) The Mt. Fuji is', '(B) the highest mountain', '(C) in', '(D) Japan'], answer: 0, why: '山の名前（Mt. ～）には the をつけない：Mt. Fuji is ～。' },
      { sentence: '(A) On the morning (B) of May 5, he (C) left home (D) in seven o’clock.', choices: ['(A) On the morning', '(B) of May 5, he', '(C) left home', '(D) in seven o’clock'], answer: 3, why: '時刻には at：at seven o’clock。特定の日の朝は on the morning of ～ で正しい。' },
      { sentence: 'He (A) apologized (B) to me (C) for (D) to be late.', choices: ['(A) apologized', '(B) to me', '(C) for', '(D) to be late'], answer: 3, why: '前置詞 for のあとは動名詞：for being late。' },
      { sentence: 'I (A) discussed about (B) the plan (C) with (D) my teacher.', choices: ['(A) discussed about', '(B) the plan', '(C) with', '(D) my teacher'], answer: 0, why: 'discuss は他動詞で about はいらない：discussed the plan。' },
      { sentence: 'Please (A) wait (B) for me (C) at front of (D) the station.', choices: ['(A) wait', '(B) for me', '(C) at front of', '(D) the station'], answer: 2, why: '「～の前で」は in front of：in front of the station。' },
    ],
  },
]

// 誤文訂正：［ ］の部分がまちがっている。正しい形を4択から選ぶ
const RAW_FIX: GrammarUnit[] = [
  {
    id: 'exam-fix-1',
    title: '入試の誤文訂正①（［ ］を正しい形に）',
    points: ['文の［ ］の部分はまちがっている。正しくなるものを4つから選ぶ。私大の入試によく出る「誤文訂正」の形。'],
    examples: [{ en: 'My sister went to Osaka last week.', ja: '姉は先週大阪へ行った。（last week があるので過去形）' }],
    questions: [
      { sentence: 'My sister [has went] to Osaka last week.', choices: ['went', 'has gone', 'is going', 'had go'], answer: 0, why: 'last week（過去の一点）があるので過去形 went。現在完了は使えない。' },
      { sentence: 'If I [will have] time tomorrow, I will call you.', choices: ['have', 'will have had', 'had had', 'having'], answer: 0, why: '条件を表す if の中は、未来のことでも現在形 have。' },
      { sentence: 'She is good at [play] the piano.', choices: ['playing', 'to play', 'played', 'plays'], answer: 0, why: '前置詞 at のあとは動名詞 playing。' },
      { sentence: 'The book [writing] by him is very popular.', choices: ['written', 'wrote', 'was written', 'writes'], answer: 0, why: '本は「書かれた」側。The book をうしろから説明する過去分詞 written。文の動詞は is。' },
      { sentence: 'I am looking forward to [hear] from you soon.', choices: ['hearing', 'hear', 'heard', 'be heard'], answer: 0, why: 'look forward to の to は前置詞なので動名詞 hearing。' },
      { sentence: 'This is the house [which] I was born.', choices: ['where', 'that', 'what', 'whose'], answer: 0, why: 'was born は目的語をとらないので、場所を表す関係副詞 where（in which）。' },
      { sentence: 'The doctor [suggested me to] see a specialist.', choices: ['suggested that I', 'suggested me that', 'suggested to me to', 'suggested for me'], answer: 0, why: 'suggest は suggest (to 人) that ～ の形：suggested that I (should) see。' },
      { sentence: 'Neither Tom nor I [are] ready for the test.', choices: ['am', 'is', 'are being', 'be'], answer: 0, why: 'neither A nor B の動詞は B（I）に合わせて am。' },
      { sentence: 'There [is] many people in the park today.', choices: ['are', 'is being', 'be', 'has'], answer: 0, why: 'many people（複数）なので There are。' },
      { sentence: 'I have [much] friends in Canada.', choices: ['many', 'much more', 'a little', 'few of'], answer: 0, why: 'friends は数えられる名詞の複数形なので many。' },
    ],
  },
  {
    id: 'exam-fix-2',
    title: '入試の誤文訂正②（［ ］を正しい形に）',
    points: ['文の［ ］の部分はまちがっている。正しくなるものを4つから選ぶ。関係詞・比較・数えられない名詞・語法を中心に。'],
    examples: [{ en: 'Tokyo is larger than any other city in Japan.', ja: '東京は日本のほかのどの都市よりも大きい。（東京も日本の都市なので other）' }],
    questions: [
      { sentence: 'This is the most interesting book [that I have never] read.', choices: ['that I have ever', 'that I never', 'which I have not', 'what I have ever'], answer: 0, why: '最上級のあとの「今まで～した中で」は that I have ever ＋過去分詞。' },
      { sentence: 'Tokyo is larger than [any city] in Japan.', choices: ['any other city', 'all cities', 'any cities', 'other city'], answer: 0, why: '東京も日本の都市なので、自分をのぞいて any other city（単数）。' },
      { sentence: 'The man [which] lives next door is a doctor.', choices: ['who', 'whom', 'whose', 'what'], answer: 0, why: '先行詞は人（The man）で、lives の主語になるので主格の who。' },
      { sentence: 'She speaks English [more fluent] than her brother.', choices: ['more fluently', 'most fluently', 'fluenter', 'as fluent'], answer: 0, why: '動詞 speaks を説明するので副詞の比較級 more fluently。' },
      { sentence: 'Could you give me [an information] about the tour?', choices: ['some information', 'informations', 'an informations', 'many information'], answer: 0, why: 'information は数えられない名詞なので a をつけず複数形にもしない：some information。' },
      { sentence: 'He made me [to wait] for an hour.', choices: ['wait', 'waiting', 'waited', 'be waited'], answer: 0, why: '使役の make ＋人＋動詞の原形：made me wait。' },
      { sentence: 'Do you know [where does she live]?', choices: ['where she lives', 'where lives she', 'where does she lives', 'where is she living'], answer: 0, why: '文の中の疑問（間接疑問）は疑問詞＋主語＋動詞の順：where she lives。' },
      { sentence: 'The number of tourists [have] increased recently.', choices: ['has', 'are', 'were', 'having'], answer: 0, why: '主語の中心は The number（数）なので単数あつかい：has increased。' },
      { sentence: 'I am used to [get up] early in the morning.', choices: ['getting up', 'got up', 'be getting up', 'gets up'], answer: 0, why: 'be used to の to は前置詞なので動名詞 getting up「～するのに慣れている」。' },
      { sentence: '[Although] the heavy rain, we went out for a walk.', choices: ['Despite', 'Even though', 'Because', 'However'], answer: 0, why: 'うしろが名詞（the heavy rain）なので前置詞 Despite。although・even though のあとには主語＋動詞が必要。' },
    ],
  },
  {
    id: 'exam-fix-3',
    title: '入試の誤文訂正③（医学部・難関大レベル）',
    points: ['倒置・仮定法・主語と動詞の一致・動名詞・まぎらわしい語など、難関大で出やすい誤り。［ ］の部分を正しくするものを4つから選ぶ。'],
    examples: [{ en: 'Hardly had I arrived when it began to rain.', ja: '着いたとたんに雨がふり始めた。（Hardly が文頭に出ると倒置）' }],
    questions: [
      { sentence: 'Hardly [I had arrived] at the station when it began to rain.', choices: ['had I arrived', 'I arrived', 'did I arrived', 'I have arrived'], answer: 0, why: '否定の Hardly が文頭に出ると倒置：Hardly had I arrived … when ～「～するとすぐに…」。' },
      { sentence: 'It is high time we [go] to bed.', choices: ['went', 'will go', 'have gone', 'are going'], answer: 0, why: 'It is high time ＋主語＋過去形「もう～してよいころだ」（仮定法過去）。' },
      { sentence: 'If it [were not] for your help last year, I would have failed the exam.', choices: ['had not been', 'is not', 'was not', 'has not been'], answer: 0, why: '過去の事実に反する仮定（last year・would have failed）なので仮定法過去完了：If it had not been for ～。' },
      { sentence: 'Not only [she speaks] French, but she also speaks Chinese.', choices: ['does she speak', 'she does speak', 'speaks she', 'did she speaks'], answer: 0, why: 'Not only が文頭に出ると疑問文の語順に倒置：Not only does she speak ～。' },
      { sentence: 'The doctor recommended that he [stops] smoking.', choices: ['stop', 'will stop', 'stopping', 'to stop'], answer: 0, why: 'recommend that ～ の節では動詞の原形（または should ＋原形）を使う：that he stop smoking。' },
      { sentence: 'Each of the patients [have] a private room in this hospital.', choices: ['has', 'are having', 'were', 'having'], answer: 0, why: '主語の中心は Each（それぞれ）なので単数あつかい：Each of the patients has ～。' },
      { sentence: 'She strongly objected to [be treated] like a child.', choices: ['being treated', 'treat', 'treated', 'have treated'], answer: 0, why: 'object to の to は前置詞なので動名詞。「あつかわれる」なので受け身の being treated。' },
      { sentence: 'The new medicine had [an affect] on his heart rate.', choices: ['an effect', 'an affection', 'an effective', 'affects'], answer: 0, why: '名詞「影響」は effect（have an effect on ～）。affect はふつう動詞「影響する」。' },
      { sentence: 'He is one of the doctors who [is] respected by everyone in the town.', choices: ['are', 'has', 'was', 'being'], answer: 0, why: '関係代名詞 who の先行詞は複数の the doctors なので、動詞も複数の are。' },
      { sentence: 'Neither the nurses nor the doctor [were] aware of the problem.', choices: ['was', 'have', 'are', 'being'], answer: 0, why: 'neither A nor B では動詞は B（近いほう）に合わせる。B は the doctor（単数）なので was。' },
    ],
  },
  {
    id: 'exam-fix-4',
    title: '入試の誤文訂正④（TOEFL・IELTS の書き言葉）',
    points: ['TOEFL・IELTS のライティングで、日本人がよくまちがえる形。主語と動詞の一致・数えられる名詞・前置詞のつけすぎなど。［ ］の部分を正しくするものを4つから選ぶ。'],
    examples: [{ en: 'This essay will discuss the advantages of online learning.', ja: 'この小論文では、オンライン学習の利点を論じる。（discuss は他動詞なので about はいらない）' }],
    questions: [
      { sentence: 'Recent research [show] that sleep improves memory.', choices: ['shows', 'showing', 'have shown', 'are showing'], answer: 0, why: 'research は数えられない名詞で単数あつかい：research shows。' },
      { sentence: 'There has been a significant [raise] in global temperatures.', choices: ['rise', 'raising', 'arise', 'rising'], answer: 0, why: '「上昇」という名詞は rise（a rise in ～）。raise はふつう動詞「上げる」。' },
      { sentence: 'Many people [is agree] that education is important.', choices: ['agree', 'agrees', 'agreeing', 'is agreed'], answer: 0, why: 'agree は一般動詞なので be 動詞はいらない。主語は複数の Many people なので agree。' },
      { sentence: 'This essay will [discuss about] the advantages of online learning.', choices: ['discuss', 'discuss on', 'discuss of', 'discussing about'], answer: 0, why: 'discuss は他動詞で、すぐうしろに目的語を置く：discuss the advantages。' },
      { sentence: '[Despite of] the high cost, many families choose private schools.', choices: ['Despite', 'In spite', 'Although', 'Even'], answer: 0, why: 'Despite は前置詞で of はつけない（in spite of とまぜない）。Although のあとには主語＋動詞が必要。' },
      { sentence: 'The number of cars has increased, [which cause] serious air pollution.', choices: ['which causes', 'that cause', 'which causing', 'what causes'], answer: 0, why: 'コンマのあとで前の文の内容を受ける which は単数あつかい：which causes。コンマのあとに that は使えない。' },
      { sentence: 'Young people today have [less] opportunities to play outside.', choices: ['fewer', 'little', 'least', 'much'], answer: 0, why: 'opportunities は数えられる名詞の複数形なので fewer。less は数えられない名詞に使う。' },
      { sentence: 'It is important for students [learning] how to manage their time.', choices: ['to learn', 'learn', 'learned', 'for learning'], answer: 0, why: 'It is ～ for 人 to 動詞の原形「人が…することは～だ」：for students to learn。' },
      { sentence: '[The amount of students] studying abroad has risen sharply.', choices: ['The number of students', 'The amount of student', 'A number of student', 'The many of students'], answer: 0, why: 'students は数えられる名詞なので amount ではなく number：The number of students。' },
      { sentence: 'In conclusion, the benefits of technology [outweighs] its drawbacks.', choices: ['outweigh', 'is outweighing', 'outweighing', 'has outweighed'], answer: 0, why: '主語の中心は複数の the benefits なので outweigh（三人称単数の s はつけない）。' },
    ],
  },
  {
    id: 'exam-fix-5',
    title: '入試の誤文訂正⑤（時制・仮定法の難問）',
    points: ['過去形と現在完了・過去完了のちがい、時や条件を表す節の現在形、仮定法（過去・過去完了・混合）、I wish / as if など。［ ］の部分を正しくするものを4つから選ぶ。'],
    examples: [{ en: 'If he had studied harder last year, he would be a college student now.', ja: '去年もっと勉強していたら、今ごろ大学生だろうに。（過去の仮定＋今の結果）' }],
    questions: [
      { sentence: 'I [have seen] him at the station yesterday.', choices: ['saw', 'have saw', 'had seen', 'have been seen'], answer: 0, why: 'yesterday のような過去をはっきり表す語があると現在完了は使えない：saw。' },
      { sentence: 'By the time we arrived, the movie [already started].', choices: ['had already started', 'has already started', 'already starts', 'was already start'], answer: 0, why: '着いた（過去）よりも前に始まっていたので過去完了：had already started。' },
      { sentence: 'I [know] her since I was a child.', choices: ['have known', 'knew', 'am knowing', 'had know'], answer: 0, why: 'since ～「～以来ずっと」は現在完了（継続）：have known。know は進行形にしない。' },
      { sentence: 'If I [would have] known the truth, I would have helped you.', choices: ['had', 'have', 'would', 'was'], answer: 0, why: '過去の事実に反する仮定は if 節を過去完了に：If I had known。if 節に would have は使わない。' },
      { sentence: 'I wish I [can] speak French as well as you.', choices: ['could', 'can be', 'will', 'am able'], answer: 0, why: 'I wish ＋仮定法過去「今～できればいいのに」：I wish I could speak。' },
      { sentence: 'If he [studied] harder last year, he would be a college student now.', choices: ['had studied', 'studies', 'has studied', 'would study'], answer: 0, why: 'last year の過去の仮定なので if 節は過去完了、主節は now の今の結果（混合）：If he had studied。' },
      { sentence: 'She will call you when she [will arrive] at the airport.', choices: ['arrives', 'arrived', 'will have arrived', 'is arrived'], answer: 0, why: '時を表す when の節では未来のことも現在形：when she arrives。' },
      { sentence: 'He talks as if he [knows] everything, but in fact he knows very little.', choices: ['knew', 'has known', 'is knowing', 'will know'], answer: 0, why: '事実とちがう「まるで～かのように」は as if ＋仮定法過去：as if he knew。' },
      { sentence: 'It has been ten years since my grandfather [has died].', choices: ['died', 'dies', 'has been dead', 'had died'], answer: 0, why: 'It has been ＋期間＋ since ～ の since の節は過去形：since my grandfather died。' },
      { sentence: 'I [am living] in Osaka for ten years now.', choices: ['have been living', 'was living', 'had lived', 'will live'], answer: 0, why: 'for ten years now「今まで10年間ずっと」は現在完了進行形：have been living。' },
    ],
  },
]

// 正解の位置がかたよらないよう、問題ごとに選択肢をずらす（正解は書いた順のいちばん前）
export const EXAM_FIX: GrammarUnit[] = RAW_FIX.map((u) => ({
  ...u,
  questions: u.questions.map((q, i) => {
    const k = (i * 3 + 1) % q.choices.length
    const choices = [...q.choices.slice(k), ...q.choices.slice(0, k)]
    return { ...q, choices, answer: choices.indexOf(q.choices[q.answer]) }
  }),
}))

// 正誤問題をすべての単元からランダムに n 問まとめて出す
export function randomErrorUnit(n = 10, rng: () => number = Math.random): GrammarUnit {
  const all = EXAM_ERROR.flatMap((u) => u.questions)
  const pick = [...all]
  for (let i = pick.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[pick[i], pick[j]] = [pick[j], pick[i]]
  }
  return {
    id: 'exam-error-random',
    title: '入試の正誤問題（ランダム10問）',
    points: ['いろいろな単元の正誤問題がランダムに出る。(A)〜(D) のうち、まちがっている1か所を選ぶ。'],
    examples: [],
    questions: pick.slice(0, n),
  }
}
