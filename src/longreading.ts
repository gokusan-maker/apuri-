// 長文読解（私立高校入試の形式）：200語前後の長文＋空所補充（前置詞・語句の記号選択）＋内容一致（○×）
// 本文・問題・解説はすべて自作。空所は本文中で「( A )」のように書く
export type Blank = { id: string; choices: string[]; answer: number; why: string }
export type TrueFalse = { statement: string; answer: boolean; why: string }
export type LongPassage = { id: string; title: string; level: string; paragraphs: string[]; ja: string[]; blanks: Blank[]; tf: TrueFalse[] }

export const MARKS = ['ア', 'イ', 'ウ', 'エ']

export const LONG_PASSAGES: LongPassage[] = [
  {
    id: 'library-cat',
    title: 'The Library Cat',
    level: '中2〜中3',
    paragraphs: [
      'There is a small library ( A ) the station in my town. For more than five years, a gray cat named Pepper has lived there. Nobody knows ( B ) she came from. One rainy morning, the librarian found her sleeping ( C ) a pile of old newspapers, and she has stayed ever since.',
      'Pepper has become very popular. Many children visit the library just to see her. While they are waiting ( D ) her to wake up, they often pick up a book and start reading. The librarian says that the number of young visitors has doubled since Pepper came.',
      'However, not everyone was happy at first. Some people were worried that the cat would damage the books. So the library made a rule: Pepper is not allowed to enter the room ( E ) the oldest books are kept. Now both the cat and the books are safe, and the library is busier than ever.',
    ],
    ja: [
      '私の町には、駅の近くに小さな図書館があります。5年以上前から、ペッパーという名前の灰色のねこがそこに住んでいます。彼女がどこから来たのかはだれも知りません。ある雨の朝、司書さんが古新聞の山の上で眠っている彼女を見つけ、それ以来ずっといるのです。',
      'ペッパーはとても人気者になりました。たくさんの子どもたちが彼女に会うためだけに図書館に来ます。彼女が起きるのを待っている間に、子どもたちはよく本を手に取って読みはじめます。司書さんは、ペッパーが来てから若い来館者の数が2倍になったと言います。',
      'しかし、はじめはみんなが喜んでいたわけではありません。ねこが本をいためてしまうのではと心配する人もいました。そこで図書館はきまりを作りました。ペッパーは、いちばん古い本が保管されている部屋には入ってはいけないのです。今ではねこも本も安全で、図書館はかつてないほどにぎわっています。',
    ],
    blanks: [
      { id: 'A', choices: ['near', 'of', 'to', 'with'], answer: 0, why: '「駅の近くに」は near the station。' },
      { id: 'B', choices: ['what', 'where', 'who', 'which'], answer: 1, why: '「どこから来たのか」なので where（間接疑問）。' },
      { id: 'C', choices: ['for', 'from', 'on', 'to'], answer: 2, why: '「古新聞の山の上で」なので on。' },
      { id: 'D', choices: ['at', 'for', 'in', 'of'], answer: 1, why: 'wait for 人 to 〜 で「人が〜するのを待つ」。' },
      { id: 'E', choices: ['what', 'when', 'where', 'who'], answer: 2, why: 'the room（場所）を説明する関係副詞 where。' },
    ],
    tf: [
      { statement: 'Pepper has lived in the library for more than five years.', answer: true, why: '第1段落に「5年以上前からそこに住んでいる」とある。' },
      { statement: 'The librarian brought Pepper from her own house.', answer: false, why: 'どこから来たかはだれも知らず、雨の朝に図書館で見つかった。' },
      { statement: 'Some children come to the library only to see Pepper.', answer: true, why: '第2段落に just to see her（彼女に会うためだけに）とある。' },
      { statement: 'There are fewer young visitors now than before Pepper came.', answer: false, why: '若い来館者は2倍になった。' },
      { statement: 'Pepper can go into every room in the library.', answer: false, why: 'いちばん古い本の部屋には入ってはいけない。' },
    ],
  },
  {
    id: 'no-phone-trip',
    title: 'A Trip Without Phones',
    level: '中3',
    paragraphs: [
      'Last summer, my family decided to take a trip ( A ) using our smartphones. My father said, "Let\'s put our phones in a box ( B ) three days." At first, my sister and I didn\'t like the idea.',
      'On the first day, we got lost because we could not check the map on our phones. We had to ask an old man ( C ) help. He was very kind and even told us about a beautiful waterfall ( D ) only local people know.',
      'On the second day, we visited the waterfall. Instead of taking pictures, I drew it in my notebook. It took a long time, but I still remember every color of the water.',
      'When we got home, I opened the box and looked at my phone. There were many messages, but none of them were important. I learned that I do not have to check my phone all the time. Now I sometimes leave it at home ( E ) I go for a walk.',
    ],
    ja: [
      '去年の夏、私の家族はスマートフォンを使わずに旅行をすることにしました。父は「3日間、スマホを箱に入れておこう」と言いました。はじめ、姉と私はその考えが気に入りませんでした。',
      '1日目、スマホで地図を確かめられなかったので、私たちは道に迷いました。おじいさんに助けを求めなければなりませんでした。彼はとても親切で、地元の人しか知らない美しい滝のことまで教えてくれました。',
      '2日目、私たちはその滝を訪れました。写真をとるかわりに、私はノートに滝の絵をかきました。時間はかかりましたが、今でも水のひとつひとつの色をおぼえています。',
      '家に帰ってから、私は箱を開けてスマホを見ました。メッセージはたくさん来ていましたが、大事なものはひとつもありませんでした。いつもスマホを確認しなくてもいいのだとわかりました。今では散歩に行くとき、ときどき家に置いていきます。',
    ],
    blanks: [
      { id: 'A', choices: ['by', 'into', 'with', 'without'], answer: 3, why: '「スマホを使わずに」なので without ＋ 〜ing。' },
      { id: 'B', choices: ['during', 'for', 'since', 'until'], answer: 1, why: '「3日間」のように期間の長さは for。during は during the trip のように使う。' },
      { id: 'C', choices: ['at', 'for', 'of', 'to'], answer: 1, why: 'ask 人 for help で「人に助けを求める」。' },
      { id: 'D', choices: ['that', 'what', 'where', 'who'], answer: 0, why: 'know の目的語が欠けているので、関係代名詞 that（which も可）。where は使えない。' },
      { id: 'E', choices: ['because', 'but', 'so', 'when'], answer: 3, why: '「散歩に行くとき」なので when。' },
    ],
    tf: [
      { statement: "At first, the writer's sister liked her father's idea.", answer: false, why: '姉と私は、はじめその考えが気に入らなかった。' },
      { statement: 'The family got lost because they could not use the map on their phones.', answer: true, why: '第2段落の内容と合う。' },
      { statement: 'An old man told the family about a waterfall.', answer: true, why: '親切なおじいさんが美しい滝のことを教えてくれた。' },
      { statement: 'The writer took a lot of pictures of the waterfall.', answer: false, why: '写真のかわりにノートに絵をかいた。' },
      { statement: 'After the trip, the writer found many important messages.', answer: false, why: 'メッセージは多かったが、大事なものはなかった。' },
    ],
  },
  {
    id: 'community-garden',
    title: 'The Garden Between the Buildings',
    level: '中3〜高校入試',
    paragraphs: [
      'In our neighborhood, there was an empty space ( A ) two tall buildings. For a long time, people threw garbage there, and nobody wanted to walk ( B ) it at night.',
      'Three years ago, Ms. Tanaka, a woman who lives in one of the buildings, had an idea. She asked her neighbors to help her make a garden. At first, only four people came. They picked up the garbage and planted some tomatoes and flowers.',
      'Soon, other people became interested ( C ) the garden. Children came after school to give water to the plants, and older people taught them how to grow vegetables. Now more than thirty people take care of the garden together.',
      'Every autumn, they hold a small festival and share the vegetables they have grown. Ms. Tanaka says, "The garden gave us more than vegetables. It gave us a chance ( D ) talk with each other." Many people in the neighborhood agree ( E ) her.',
    ],
    ja: [
      '私たちの近所には、2つの高いビルの間に空き地がありました。長い間、人々はそこにごみを捨て、夜にそのそばを歩きたがる人はいませんでした。',
      '3年前、ビルの1つに住む田中さんという女性が、あることを思いつきました。近所の人たちに、庭づくりを手伝ってほしいとたのんだのです。はじめは4人しか来ませんでした。彼らはごみを拾い、トマトや花を植えました。',
      'まもなく、ほかの人たちもその庭に興味を持つようになりました。子どもたちは放課後に植物に水をやりに来て、お年寄りは子どもたちに野菜の育て方を教えました。今では30人以上がいっしょに庭の世話をしています。',
      '毎年秋には小さなお祭りを開き、育てた野菜を分け合います。田中さんは「この庭は野菜以上のものをくれました。おたがいに話すきっかけをくれたのです」と言います。近所の多くの人が彼女の言葉に賛成しています。',
    ],
    blanks: [
      { id: 'A', choices: ['among', 'between', 'over', 'under'], answer: 1, why: '「2つのものの間」は between。3つ以上の間は among。' },
      { id: 'B', choices: ['about', 'into', 'past', 'with'], answer: 2, why: 'walk past 〜 で「〜のそばを通り過ぎる」。' },
      { id: 'C', choices: ['at', 'for', 'in', 'with'], answer: 2, why: 'be / become interested in 〜 で「〜に興味がある（を持つ）」。' },
      { id: 'D', choices: ['for', 'of', 'to', 'with'], answer: 2, why: 'a chance to ＋動詞の原形で「〜する機会」（不定詞の形容詞的用法）。' },
      { id: 'E', choices: ['at', 'on', 'to', 'with'], answer: 3, why: '「人（の意見）に賛成する」は agree with 人。' },
    ],
    tf: [
      { statement: 'The empty space was clean and safe before the garden was made.', answer: false, why: 'ごみが捨てられ、夜はだれも近くを歩きたがらなかった。' },
      { statement: 'Ms. Tanaka lives in one of the tall buildings.', answer: true, why: 'a woman who lives in one of the buildings とある。' },
      { statement: 'Only four people came to help at first.', answer: true, why: 'At first, only four people came. とある。' },
      { statement: 'Children taught older people how to grow vegetables.', answer: false, why: '教えたのはお年寄りで、教わったのが子どもたち。' },
      { statement: 'They share their vegetables at a festival every spring.', answer: false, why: 'お祭りは毎年秋。' },
    ],
  },
]

export const XP_LONG_ITEM = 5 // 1問正解ごと

// 採点：空所と内容一致の正解数
export function scoreLong(p: LongPassage, blanks: Record<string, number>, tf: Record<number, boolean>): { score: number; total: number } {
  const b = p.blanks.filter((x) => blanks[x.id] === x.answer).length
  const t = p.tf.filter((x, i) => tf[i] === x.answer).length
  return { score: b + t, total: p.blanks.length + p.tf.length }
}

export type LongRecord = Record<string, number> // 長文id → 最高点
const KEY = 'eitan:long-reading'

export function loadLongRecord(): LongRecord {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '{}') as unknown
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([, n]) => typeof n === 'number')) as LongRecord
  } catch {
    return {}
  }
}

export function saveLongRecord(r: LongRecord): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(r))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
