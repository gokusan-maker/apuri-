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
]
