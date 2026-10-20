// 発音のコツ（解説・例・問題はすべて自作）。文法ミニ解説と同じ形で使う
import type { GrammarUnit } from './grammar'

export const SOUNDS: GrammarUnit[] = [
  {
    id: 'snd-th',
    title: 'th の音（think と sink）',
    points: ['th は舌の先を上の歯に軽く当てて息を出す音。「ス」や「ズ」とはちがう。think（思う）と sink（しずむ）、thank（感謝する）と sank は別の単語になる。'],
    examples: [
      { en: 'Thank you.', ja: 'ありがとう。' },
      { en: 'I think so.', ja: 'そう思う。' },
    ],
    questions: [
      { sentence: 'I ___ you are right.（思う）', choices: ['think', 'sink'], answer: 0, why: '「思う」は th で始まる think。sink は「しずむ」。' },
      { sentence: 'The ship began to ___.（しずむ）', choices: ['think', 'sink'], answer: 1, why: '「しずむ」は s で始まる sink。' },
      { sentence: 'There are ___ cats.（3びき）', choices: ['three', 'tree'], answer: 0, why: '「3」は th の three。tree は「木」。' },
    ],
  },
  {
    id: 'snd-lr',
    title: 'l と r（light と right）',
    points: ['l は舌の先を上の歯の裏につけて出す音。r は舌をどこにもつけず、少し奥に引いて出す音。light（光）と right（右・正しい）、glass（コップ・ガラス）と grass（草）、play（遊ぶ）と pray（祈る）もちがう単語。'],
    examples: [
      { en: 'Turn right at the corner.', ja: '角を右に曲がって。' },
      { en: 'Turn on the light.', ja: '電気をつけて。' },
    ],
    questions: [
      { sentence: "Let's ___ soccer.（する・遊ぶ）", choices: ['play', 'pray'], answer: 0, why: '「遊ぶ・（スポーツを）する」は l の play。pray は「祈る」。' },
      { sentence: 'Your answer is ___.（正しい）', choices: ['light', 'right'], answer: 1, why: '「正しい」は r の right。' },
      { sentence: 'Can I have a ___ of water?（コップ）', choices: ['glass', 'grass'], answer: 0, why: '「コップ」は l の glass。grass は「草」。' },
    ],
  },
  {
    id: 'snd-vb',
    title: 'v と b（very と berry）',
    points: ['v は上の歯を下くちびるに軽く当てて出す音。b は両くちびるを閉じてから出す音。vest（ベスト・チョッキ）と best（いちばんよい）はちがう単語。'],
    examples: [
      { en: 'Thank you very much.', ja: 'どうもありがとう。' },
      { en: 'You are my best friend.', ja: 'きみは親友だよ。' },
    ],
    questions: [
      { sentence: 'Do your ___.（ベストをつくして）', choices: ['vest', 'best'], answer: 1, why: '「いちばんよい」は b の best。' },
      { sentence: 'This cake is ___ good.（とても）', choices: ['very', 'berry'], answer: 0, why: '「とても」は v の very。berry は「ベリー（果物）」。' },
      { sentence: 'We crossed the lake by ___.（ボート）', choices: ['boat', 'vote'], answer: 0, why: '「ボート」は b の boat。vote は「投票する」。' },
    ],
  },
  {
    id: 'snd-ed',
    title: '-ed の読み方（3通り）',
    points: ['過去形の -ed は3通りに読む。t・d で終わる動詞は「イド」（wanted, needed）。p・k・s・sh・ch などで終わる動詞は「ト」（helped, looked）。それ以外は「ド」（played, lived）。'],
    examples: [
      { en: 'I wanted a new bike.', ja: '新しい自転車がほしかった。' },
      { en: 'She helped me.', ja: '彼女が手伝ってくれた。' },
    ],
    questions: [
      { sentence: '-ed を「イド」と読むのは ___', choices: ['wanted', 'played'], answer: 0, why: 'want は t で終わるので wanted は「ウォンティド」。' },
      { sentence: '-ed を「ト」と読むのは ___', choices: ['looked', 'needed'], answer: 0, why: 'look は k で終わるので looked は「ルックト」。' },
      { sentence: '-ed を「ド」と読むのは ___', choices: ['visited', 'lived'], answer: 1, why: 'live は v の音で終わるので lived は「リヴド」。visited は「イド」。' },
    ],
  },
  {
    id: 'snd-silent',
    title: '読まない文字（knife の k）',
    points: ['つづりにあっても読まない文字がある。kn の k（know, knife）、wr の w（write）、hour・honest の h、climb の b、listen の t など。'],
    examples: [
      { en: 'I know the answer.', ja: '答えを知っている。' },
      { en: 'Wait an hour.', ja: '1時間待って。' },
    ],
    questions: [
      { sentence: 'k を読まないのは ___', choices: ['knife', 'kind'], answer: 0, why: 'kn で始まる knife は k を読まない（ナイフ）。' },
      { sentence: 'h を読まないのは ___', choices: ['hour', 'house'], answer: 0, why: 'hour は h を読まず「アワー」。だから an hour になる。' },
      { sentence: 't を読まないのは ___', choices: ['listen', 'little'], answer: 0, why: 'listen は t を読まず「リスン」。' },
    ],
  },
]
