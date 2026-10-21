// 文法の「よくあるまちがい」：単元ごとに × と ○ の例を1つ
export type Mistake = { wrong: string; right: string; why: string }

export const MISTAKES: Record<string, Mistake> = {
  be: { wrong: 'I am play tennis.', right: 'I play tennis.', why: '一般動詞（play）の文に be動詞はいらない。' },
  third: { wrong: 'He play soccer every day.', right: 'He plays soccer every day.', why: '主語が三人称単数で現在の文なら、動詞に -s をつける。' },
  past: { wrong: 'I goed to the park yesterday.', right: 'I went to the park yesterday.', why: 'go の過去形は不規則に変化して went。' },
  progressive: { wrong: 'She is cook dinner now.', right: 'She is cooking dinner now.', why: '進行形は be動詞＋動詞の -ing 形。' },
  future: { wrong: 'I will goes to Tokyo.', right: 'I will go to Tokyo.', why: 'will のあとは動詞の原形。' },
  compare: { wrong: 'This box is more big than that one.', right: 'This box is bigger than that one.', why: '短い語は -er をつける。more は長い語（beautiful など）に使う。' },
  passive: { wrong: 'This song is love by many people.', right: 'This song is loved by many people.', why: '受け身は be動詞＋過去分詞。' },
  perfect: { wrong: 'I have finish my homework.', right: 'I have finished my homework.', why: 'have のあとは過去分詞。' },
  modal: { wrong: 'He can swims fast.', right: 'He can swim fast.', why: '助動詞のあとは主語に関係なく動詞の原形。' },
  infinitive: { wrong: 'I want to playing the guitar.', right: 'I want to play the guitar.', why: 'to のあとは動詞の原形（不定詞）。' },
  gerund: { wrong: 'I enjoyed to talk with her.', right: 'I enjoyed talking with her.', why: 'enjoy のあとは動名詞（-ing）。to 〜 は使えない。' },
  relative: { wrong: 'I have a friend which lives in Osaka.', right: 'I have a friend who lives in Osaka.', why: '人を説明するときは who（または that）。which は物や動物。' },
  there: { wrong: 'There is three apples on the table.', right: 'There are three apples on the table.', why: 'あとの名詞が複数なら There are。' },
  preposition: { wrong: 'I was born on 2012.', right: 'I was born in 2012.', why: '年や月には in、日付や曜日には on。' },
  imperative: { wrong: "Don't be run in the hallway.", right: "Don't run in the hallway.", why: '一般動詞の否定の命令文は Don\'t ＋動詞の原形。be はいらない。' },
  pronoun: { wrong: 'This is me bag.', right: 'This is my bag.', why: '名詞の前で「〜の」と言うときは my（所有格）。' },
  indirect: { wrong: 'I know where does he live.', right: 'I know where he lives.', why: '文の中に入る疑問文は「疑問詞＋主語＋動詞」の語順。' },
  'tag-q': { wrong: "You are a student, are you?", right: "You are a student, aren't you?", why: '肯定文のあとの付加疑問は否定の形にする。' },
  'for-since': { wrong: 'I have lived here since five years.', right: 'I have lived here for five years.', why: '期間の長さは for、始まった時点は since。' },
  'too-enough': { wrong: 'He is enough tall to reach the shelf.', right: 'He is tall enough to reach the shelf.', why: 'enough は形容詞のうしろに置く。' },
}

export const mistakeOf = (unitId: string): Mistake | undefined => MISTAKES[unitId]
