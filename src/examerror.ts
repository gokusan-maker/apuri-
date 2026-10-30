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
]
