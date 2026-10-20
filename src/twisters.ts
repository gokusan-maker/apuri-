// 早口ことば（昔から言い伝えられている英語の早口ことば）
export type Twister = { en: string; ja: string; tip: string }

export const TWISTERS: Twister[] = [
  { en: 'She sells seashells by the seashore.', ja: '彼女は海辺で貝がらを売っている。', tip: 's と sh の言い分け' },
  { en: 'Peter Piper picked a peck of pickled peppers.', ja: 'ピーター・パイパーはピクルスにしたトウガラシをたくさんつんだ。', tip: 'p の音（くちびるを閉じてから）' },
  { en: 'How much wood would a woodchuck chuck if a woodchuck could chuck wood?', ja: 'ウッドチャックが木を投げられたら、どのくらい投げるだろう？', tip: 'w の音（くちびるを丸める）' },
  { en: 'Red lorry, yellow lorry.', ja: '赤いトラック、黄色いトラック。', tip: 'l と r の言い分け' },
  { en: 'Unique New York.', ja: 'ユニークなニューヨーク。', tip: 'ユとニュをはっきり' },
  { en: 'A big black bug bit a big black bear.', ja: '大きな黒い虫が大きな黒いクマをかんだ。', tip: 'b の音' },
  { en: 'I scream, you scream, we all scream for ice cream.', ja: 'ぼくもきみも、みんなアイスクリームがほしいとさけぶ。', tip: 'I scream と ice cream は同じように聞こえる' },
  { en: 'Fred fed Ted bread, and Ted fed Fred bread.', ja: 'フレッドはテッドにパンを食べさせ、テッドはフレッドにパンを食べさせた。', tip: 'f と t と br の音' },
]
