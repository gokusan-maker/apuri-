// 文法の城の解説図：項目ごとに「かたち（式）」と「使い方3つ（絵・意味・短い例）」
// 色：s=主語 v=動詞 o=目的語・補語 k=カギになる語 x=そのほか
export type FigChip = { t: string; c: 's' | 'v' | 'o' | 'k' | 'x' }
export type FigUse = { icon: string; name: string; ex: string; ja: string }
export type GrammarFig = { formula: FigChip[]; uses: FigUse[]; tip: string }

const k = (t: string): FigChip => ({ t, c: 'k' })
const s = (t: string): FigChip => ({ t, c: 's' })
const v = (t: string): FigChip => ({ t, c: 'v' })
const o = (t: string): FigChip => ({ t, c: 'o' })
const x = (t: string): FigChip => ({ t, c: 'x' })

export const GRAMMAR_FIGS: Record<string, GrammarFig> = {
  仮定法: {
    formula: [k('If'), s('S'), v('過去形'), x(','), s('S'), k('would'), v('原形')],
    uses: [
      { icon: '💭', name: '今の反対', ex: 'If I were a bird, I would fly.', ja: '鳥なら飛ぶのに' },
      { icon: '⏪', name: '過去の反対', ex: 'If I had run, I would have won.', ja: '走っていたら勝てたのに' },
      { icon: '🌠', name: 'I wish', ex: 'I wish I had a dog.', ja: '犬がいたらなあ' },
    ],
    tip: '事実とちがう話は、時制を1つ過去へずらす',
  },
  分詞構文: {
    formula: [v('-ing / 過去分詞 ～'), x(','), s('S'), v('V')],
    uses: [
      { icon: '⏰', name: '～すると（時）', ex: 'Opening the box, I smiled.', ja: '箱を開けると笑顔に' },
      { icon: '💡', name: '～なので（理由）', ex: 'Feeling tired, he slept.', ja: '疲れたので寝た' },
      { icon: '🎵', name: '～しながら', ex: 'She walked, singing a song.', ja: '歌いながら歩いた' },
    ],
    tip: '接続詞と主語を消して -ing にしたかたち',
  },
  '倒置・強調': {
    formula: [k('Never'), v('have'), s('I'), v('seen'), x('～')],
    uses: [
      { icon: '🔄', name: '否定語が文頭', ex: 'Never have I seen it.', ja: '見たことがない' },
      { icon: '🔦', name: 'It is ～ that', ex: 'It was Ken that won.', ja: '勝ったのはケンだ' },
      { icon: '🧩', name: '同格の that', ex: 'the fact that he lied', ja: '彼がうそをついた事実' },
    ],
    tip: '目立たせたい語を前に出すと、語順が変わる',
  },
  関係詞: {
    formula: [o('名詞'), k('who / which / that'), v('説明')],
    uses: [
      { icon: '🧑', name: '人 → who', ex: 'a boy who runs fast', ja: '速く走る少年' },
      { icon: '📦', name: 'もの → which', ex: 'a book which I read', ja: '私が読んだ本' },
      { icon: '📍', name: '場所 → where', ex: 'the town where I live', ja: '私が住む町' },
    ],
    tip: '名詞のうしろから、文で説明をつけ足す',
  },
  '現在完了・完了形': {
    formula: [s('S'), k('have / has'), v('過去分詞')],
    uses: [
      { icon: '✅', name: '完了（もう～した）', ex: 'I have just eaten.', ja: 'ちょうど食べた' },
      { icon: '🌍', name: '経験（～したことがある）', ex: 'I have been to Kyoto.', ja: '京都に行ったことがある' },
      { icon: '⏳', name: '継続（ずっと～）', ex: 'I have lived here for years.', ja: '何年も住んでいる' },
    ],
    tip: '過去から今へつながる線のイメージ',
  },
  受け身: {
    formula: [s('S'), k('be'), v('過去分詞'), x('(by 人)')],
    uses: [
      { icon: '🏯', name: '～される', ex: 'This castle was built long ago.', ja: 'この城はずっと前に建てられた' },
      { icon: '🗣', name: 'by ～（だれに）', ex: 'It was painted by Ann.', ja: 'アンによって描かれた' },
      { icon: '👶', name: 'be born', ex: 'I was born in May.', ja: '5月に生まれた' },
    ],
    tip: 'する側ではなく、される側が主語',
  },
  比較: {
    formula: [s('A'), v('is'), k('-er / more'), k('than'), o('B')],
    uses: [
      { icon: '⚖️', name: '同じくらい', ex: 'as tall as Tom', ja: 'トムと同じくらい高い' },
      { icon: '📈', name: 'より～', ex: 'taller than Tom', ja: 'トムより高い' },
      { icon: '🏆', name: 'いちばん～', ex: 'the tallest in the class', ja: 'クラスでいちばん高い' },
    ],
    tip: '2つなら -er、3つ以上の中で1番なら the -est',
  },
  動名詞: {
    formula: [v('動詞'), k('-ing'), x('＝ ～すること')],
    uses: [
      { icon: '🎯', name: '主語になる', ex: 'Swimming is fun.', ja: '泳ぐことは楽しい' },
      { icon: '🎒', name: '動詞の目的語', ex: 'I enjoy reading.', ja: '読書を楽しむ' },
      { icon: '🔗', name: '前置詞のあと', ex: 'thank you for coming', ja: '来てくれてありがとう' },
    ],
    tip: 'enjoy / finish / stop のあとは -ing',
  },
  不定詞: {
    formula: [k('to'), v('動詞の原形')],
    uses: [
      { icon: '📦', name: '～すること', ex: 'I want to swim.', ja: '泳ぎたい' },
      { icon: '🏷', name: '～するための', ex: 'something to drink', ja: '飲むためのもの' },
      { icon: '🎯', name: '～するために', ex: 'I went there to study.', ja: '勉強するために行った' },
    ],
    tip: 'to のあとは、いつも動詞の原形',
  },
  分詞: {
    formula: [o('名詞'), k('-ing / 過去分詞'), x('～')],
    uses: [
      { icon: '🏃', name: '-ing＝している', ex: 'a running dog', ja: '走っている犬' },
      { icon: '🔧', name: '過去分詞＝された', ex: 'a broken cup', ja: '割れたカップ' },
      { icon: '➡️', name: 'うしろから説明', ex: 'the boy playing soccer', ja: 'サッカーをしている少年' },
    ],
    tip: '1語なら名詞の前、2語以上なら名詞のうしろ',
  },
  助動詞: {
    formula: [s('S'), k('can / must / may'), v('原形')],
    uses: [
      { icon: '💪', name: 'can できる', ex: 'I can swim.', ja: '泳げる' },
      { icon: '❗', name: 'must ～しなければ', ex: 'You must stop.', ja: '止まらなければ' },
      { icon: '🤔', name: 'may ～かもしれない', ex: 'It may rain.', ja: '雨かもしれない' },
    ],
    tip: '助動詞のあとは、いつも動詞の原形',
  },
  動詞の使い方: {
    formula: [s('S'), v('V'), o('人'), o('もの')],
    uses: [
      { icon: '🎁', name: 'give 人 もの', ex: 'I gave her a pen.', ja: '彼女にペンをあげた' },
      { icon: '😊', name: 'make A B', ex: 'The song made me happy.', ja: '歌で幸せになった' },
      { icon: '👉', name: 'have 人 原形', ex: 'I had him wait.', ja: '彼に待ってもらった' },
    ],
    tip: '動詞ごとに、うしろに来るかたちが決まっている',
  },
  時制: {
    formula: [s('S'), v('過去・現在・未来')],
    uses: [
      { icon: '🙋', name: 'be動詞', ex: 'I am a student.', ja: '私は生徒だ' },
      { icon: '⏮', name: '過去', ex: 'I played tennis.', ja: 'テニスをした' },
      { icon: '⏭', name: '未来', ex: 'I will play tomorrow.', ja: '明日する' },
    ],
    tip: 'いつのことか（時を表す語）で形を決める',
  },
  文の基本: {
    formula: [k('There is / are'), o('もの'), x('場所')],
    uses: [
      { icon: '🐱', name: '～がある', ex: 'There is a cat here.', ja: 'ここにネコがいる' },
      { icon: '🍎', name: 'a / the', ex: 'an apple / the sun', ja: 'ひとつのリンゴ／太陽' },
      { icon: '🔢', name: '複数形', ex: 'two boxes', ja: '箱2つ' },
    ],
    tip: 'There is のあとの名詞で is と are を決める',
  },
  '疑問文・命令文': {
    formula: [k('疑問詞'), v('do / be'), s('S'), v('～?')],
    uses: [
      { icon: '❓', name: '疑問詞で聞く', ex: 'Where do you live?', ja: 'どこに住んでいる？' },
      { icon: '📢', name: '命令文', ex: 'Open the door.', ja: 'ドアを開けて' },
      { icon: '😲', name: '感嘆文', ex: 'What a big dog!', ja: 'なんて大きな犬！' },
    ],
    tip: '疑問詞はいつも文の先頭',
  },
  否定の表現: {
    formula: [s('S'), k("don't / never"), v('V')],
    uses: [
      { icon: '🚫', name: 'never 一度も～ない', ex: 'I never lie.', ja: 'うそはつかない' },
      { icon: '🙅', name: 'neither どちらも～ない', ex: 'Neither is right.', ja: 'どちらも正しくない' },
      { icon: '🔀', name: 'not A but B', ex: 'not red but blue', ja: '赤ではなく青' },
    ],
    tip: 'not のかかる範囲に注意',
  },
  接続詞: {
    formula: [s('文A'), k('because / if / when'), s('文B')],
    uses: [
      { icon: '💡', name: 'because 理由', ex: 'I stayed home because it rained.', ja: '雨なので家にいた' },
      { icon: '🔀', name: 'if もし', ex: 'If it rains, I will stay.', ja: '雨なら家にいる' },
      { icon: '⏰', name: 'when ～とき', ex: 'When I came, he left.', ja: '来たとき彼は帰った' },
    ],
    tip: '文と文をつなぐ。if / when の中は未来でも現在形',
  },
  前置詞: {
    formula: [k('前置詞'), o('名詞')],
    uses: [
      { icon: '📦', name: 'in 中に', ex: 'in the box', ja: '箱の中に' },
      { icon: '🧱', name: 'on 接して', ex: 'on the wall', ja: 'かべに' },
      { icon: '📍', name: 'at 一点', ex: 'at the station', ja: '駅で' },
    ],
    tip: '場所のイメージ：in は中、on はくっつく、at は点',
  },
  '名詞・代名詞': {
    formula: [k('a few / a little'), o('名詞')],
    uses: [
      { icon: '🍪', name: '数えられる', ex: 'a few cookies', ja: 'クッキー少し' },
      { icon: '💧', name: '数えられない', ex: 'a little water', ja: '水少し' },
      { icon: '🔁', name: 'another / other', ex: 'another cup', ja: 'もう1杯' },
    ],
    tip: '数えられるか、数えられないかで語を選ぶ',
  },
  '形容詞・副詞': {
    formula: [k('形容詞'), o('名詞'), x('／'), v('動詞'), k('副詞')],
    uses: [
      { icon: '🌸', name: '形容詞→名詞', ex: 'a beautiful flower', ja: 'きれいな花' },
      { icon: '🏃', name: '副詞→動詞', ex: 'run quickly', ja: '速く走る' },
      { icon: '🔝', name: 'too / also', ex: 'I like it, too.', ja: '私も好き' },
    ],
    tip: '形容詞は名詞、副詞は動詞をくわしくする',
  },
}

const FALLBACK: GrammarFig = { formula: [s('S'), v('V'), o('O')], uses: [], tip: '主語・動詞・目的語の順番が基本' }

// 城の解説の単元 id（gc:名前:1）から図を引く（①②… は取りのぞく）
export function figOf(name: string): GrammarFig {
  const base = name.replace(/^gc:/, '').replace(/:\d+$/, '').replace(/[①-⑩]$|\d+$/, '')
  return GRAMMAR_FIGS[base] ?? FALLBACK
}
