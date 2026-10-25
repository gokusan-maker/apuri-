// 読解の城：構文（分詞構文・強調構文・分裂文・倒置・仮定法など）ごとに、その構文が入った長文を3階ずつ登る。
// テーマの1階目のはじめに構文の解説と、その長文に出てくる例文
import { splitSentences, type LongPassage } from './longreading'
import { GRAMMAR_FIGS, type FigChip, type GrammarFig } from './grammarfig'

const k = (t: string): FigChip => ({ t, c: 'k' })
const s = (t: string): FigChip => ({ t, c: 's' })
const v = (t: string): FigChip => ({ t, c: 'v' })
const o = (t: string): FigChip => ({ t, c: 'o' })
const x = (t: string): FigChip => ({ t, c: 'x' })

export type ReadTheme = { id: string; name: string; points: string[]; examples: { en: string; ja: string }[]; re: RegExp; fig: GrammarFig }

export const READ_THEMES: ReadTheme[] = [
  {
    id: 'participle',
    name: '分詞構文',
    points: ['文の頭（または後ろ）の -ing / 過去分詞のかたまりが、「～して・～しながら・～なので」と主節に情報をそえる。', '主語は主節と同じ。-ing は「～する側」、過去分詞は「～される側」。'],
    examples: [
      { en: 'Walking along the beach, we found a small crab.', ja: '浜辺を歩いていると、私たちは小さなカニを見つけた。' },
      { en: 'Seen from the hill, the town looked tiny.', ja: '丘から見ると、町はとても小さく見えた。' },
    ],
    fig: { formula: [k('-ing / 過去分詞 ～'), x(','), s('S'), v('V')], uses: [{ icon: '⏰', name: '～すると（時）', ex: 'Hearing the news, she cried.', ja: '知らせを聞いて泣いた' }, { icon: '💡', name: '～なので（理由）', ex: 'Tired from work, he slept early.', ja: '仕事で疲れて早く寝た' }, { icon: '🎵', name: '～しながら', ex: 'He sat there, reading a book.', ja: '本を読みながら座っていた' }], tip: '-ing は「～する側」、過去分詞は「～される側」' },
    re: /^(Having [a-z]+ed|(?!During|According|Nothing|Something|Everything|Anything|Morning|Evening|Spring|Building|Ceiling|Thing)[A-Z][a-z]+ing|Seen|Built|Written|Made|Surrounded|Given|Left|Compared|Faced|Born|Found|Used|Shocked|Encouraged|Inspired|Asked|Located|Viewed|Taken)\b[^,.;]{2,60}, (however, |then, )?(the|a|an|I|we|he|she|they|it|you|his|her|their|our|my|this|these|those|many|most|some|people|scientists|researchers|[A-Z][a-z]+)\b(?! seems| turns out)/,
  },
  {
    id: 'cleft',
    name: '強調構文（It is ～ that）',
    points: ['It is / was ＋ 強調したい語句 ＋ that（who）… で「…なのは～だ」。', 'It is と that を取りのぞいても文が成り立つのが見分け方。'],
    examples: [
      { en: 'It was my grandmother who taught me to cook.', ja: '私に料理を教えてくれたのは祖母だった。' },
      { en: 'It is not money but time that we need most.', ja: '私たちがいちばん必要としているのは、お金ではなく時間だ。' },
    ],
    fig: { formula: [k('It is / was'), o('強調する語句'), k('that / who'), s('のこりの文')], uses: [{ icon: '🧑', name: '人を強調', ex: 'It was Ken who called me.', ja: '電話してきたのはケンだった' }, { icon: '📅', name: '時を強調', ex: 'It was in 1990 that he left.', ja: '彼が去ったのは1990年だった' }, { icon: '⏳', name: 'not until', ex: 'It was not until noon that I woke.', ja: '正午になってやっと起きた' }], tip: 'It is と that を消しても文が成り立てば強調構文' },
    re: /\bIt (is|was) (not until|only|not|in |on |at |because|during )[^.]{0,60}\b(that|who) /,
  },
  {
    id: 'pseudo-cleft',
    name: '分裂文（What ～ is …）',
    points: ['What ～ is … で「～なのは…だ」。言いたいこと（…）を文の後ろに置いて目立たせる。', 'What のかたまり全体が主語（単数あつかい）。'],
    examples: [
      { en: 'What surprised me most was his calm voice.', ja: '私がいちばんおどろいたのは、彼の落ち着いた声だった。' },
      { en: 'What matters is how you use your time.', ja: '大切なのは、時間をどう使うかだ。' },
    ],
    fig: { formula: [k('What'), s('～'), v('is / was'), o('言いたいこと')], uses: [{ icon: '🛌', name: 'ほしいのは', ex: 'What I want is rest.', ja: '私がほしいのは休みだ' }, { icon: '⭐', name: '大切なのは', ex: 'What matters is effort.', ja: '大切なのは努力だ' }, { icon: '😲', name: 'おどろいたのは', ex: 'What surprised me was his voice.', ja: 'おどろいたのは彼の声だった' }], tip: '言いたいことを文の最後において目立たせる' },
    re: /(^|\b)What [a-z ,']{2,50} (is|was|are|were) /,
  },
  {
    id: 'inversion',
    name: '倒置（否定語が文頭）',
    points: ['Never / Rarely / Little / Not until / Only when などの否定・限定の語句が文頭に来ると、うしろが疑問文の語順になる。', 'Not only A but also B の Not only が文頭に来ても倒置。'],
    examples: [
      { en: 'Never have I seen such a beautiful sky.', ja: 'こんなに美しい空は見たことがない。' },
      { en: 'Only when it rained did the farmers relax.', ja: '雨が降ってはじめて、農家の人たちはほっとした。' },
    ],
    fig: { formula: [k('否定語'), v('助動詞'), s('S'), v('V')], uses: [{ icon: '🚫', name: 'Never', ex: 'Never have I seen it.', ja: '一度も見たことがない' }, { icon: '🤏', name: 'Little', ex: 'Little did he know the truth.', ja: '彼は真実を知るよしもなかった' }, { icon: '☝️', name: 'Only then', ex: 'Only then did I understand.', ja: 'そのときやっとわかった' }], tip: '否定語が前に出ると、うしろは疑問文の語順' },
    re: /^(Never|Rarely|Seldom|Hardly|Scarcely|No sooner|Little|Not only|Not until [^,]{1,60}|Only (in|when|after|by|then|at|through|once|recently|later)\b[^,]{0,60}?) (did|do|does|have|has|had|is|are|was|were|can|could|would|will)\b/,
  },
  {
    id: 'subjunctive',
    name: '仮定法',
    points: ['事実とちがうことは時制を1つ過去にずらす：If S 過去形, S would 原形（今の反対）／If S had 過去分詞, S would have 過去分詞（過去の反対）。', 'I wish / as if / without ～ も仮定法の仲間。'],
    examples: [
      { en: 'If I had more time, I would learn the piano.', ja: 'もっと時間があれば、ピアノを習うのに。' },
      { en: 'If she had left earlier, she would have caught the train.', ja: 'もっと早く出ていたら、彼女は電車に間に合っていただろう。' },
    ],
    fig: GRAMMAR_FIGS['仮定法'],
    re: /\b(If [^.,]{0,60}\b(were|had|could|did|[a-z]+ed|went|knew|sank|fell|came|took|ran)\b[^.]{0,60}\b(would|could|might)\b(?! like)|I wish\b|as if\b|as though\b|were to\b)/,
  },
  {
    id: 'what',
    name: '関係代名詞 what',
    points: ['what ＝ the thing(s) which。「～すること・～するもの」というまとまりを作る。', 'うしろの文には、目的語や主語が1つ欠けている。'],
    examples: [
      { en: 'This is what I wanted for my birthday.', ja: 'これが、私が誕生日にほしかったものだ。' },
      { en: 'Do what you think is right.', ja: '正しいと思うことをしなさい。' },
    ],
    fig: { formula: [k('what'), s('S'), v('V'), x('＝ the thing(s) which')], uses: [{ icon: '🗣', name: '～すること', ex: 'I believe what I said.', ja: '自分が言ったことを信じる' }, { icon: '🎁', name: '～するもの', ex: 'This is what she needs.', ja: 'これが彼女に必要なものだ' }, { icon: '👍', name: '命令文で', ex: 'Do what you like.', ja: '好きなことをしなさい' }], tip: 'うしろの文には目的語や主語が1つ欠けている' },
    re: /\b(is|was|do|does|did|know|knows|understand|said|say|see|sees|change|changes|on|of|about|to|with|from) what (we|they|you|he|she|people|I|it|our|their|scientists|many)\b/,
  },
  {
    id: 'appositive',
    name: '同格の that（the fact that ～）',
    points: ['the fact / idea / belief / news ＋ that ＋ 完全な文 で「～という事実・考え」。', '関係代名詞の that とちがい、うしろの文に欠けた部分がない。'],
    examples: [
      { en: 'The news that the team had won spread quickly.', ja: 'チームが勝ったという知らせはすぐに広まった。' },
      { en: 'I like the idea that everyone can help.', ja: 'みんなが手伝えるという考えが好きだ。' },
    ],
    fig: { formula: [o('the fact / idea'), k('that'), s('完全な文')], uses: [{ icon: '📰', name: 'the news that', ex: 'the news that it snowed', ja: '雪がふったという知らせ' }, { icon: '💭', name: 'the idea that', ex: 'the idea that we can win', ja: '勝てるという考え' }, { icon: '📌', name: 'the fact that', ex: 'the fact that he lied', ja: '彼がうそをついたという事実' }], tip: 'that のうしろは欠けたところのない文（関係代名詞とのちがい）' },
    re: /\bthe (fact|idea|belief|news|possibility|view|claim|feeling|hope|thought|evidence|sense) that\b/,
  },
  {
    id: 'the-more',
    name: 'the 比較級, the 比較級',
    points: ['The 比較級 ～, the 比較級 … で「～すればするほど、ますます…」。', '後ろの部分の be 動詞などは省かれることがある（The sooner, the better）。'],
    examples: [
      { en: 'The more you practice, the better you become.', ja: '練習すればするほど、うまくなる。' },
      { en: 'The longer we waited, the colder it got.', ja: '待てば待つほど、寒くなった。' },
    ],
    fig: { formula: [k('The 比較級'), s('S V'), x(','), k('the 比較級'), s('S V')], uses: [{ icon: '⏩', name: '早いほど', ex: 'The sooner, the better.', ja: '早ければ早いほどよい' }, { icon: '📚', name: '読むほど', ex: 'The more you read, the more you know.', ja: '読めば読むほど知ることがふえる' }, { icon: '🦉', name: '年をとるほど', ex: 'The older he got, the wiser he became.', ja: '年をとるほど賢くなった' }], tip: '「～すればするほど、ますます…」' },
    re: /\b[Tt]he (more|less|[a-z]+er) [^.;]{0,50}, the (more|less|[a-z]+er)\b/,
  },
]

// 構文が出てくる文（なければ null）
export function themeSentence(p: LongPassage, t: ReadTheme): string | null {
  for (const para of p.paragraphs) for (const s of splitSentences(para)) if (t.re.test(s.trim())) return s.trim()
  return null
}

export type RcFloor = { id: string; theme: ReadTheme; passage: LongPassage; floor: number; sentence: string }

// テーマごとに、その構文が入った長文を最大3本（3階）
export function readCastleFloors(list: LongPassage[], per = 3): RcFloor[] {
  return READ_THEMES.flatMap((t) =>
    list
      .map((p) => ({ p, s: themeSentence(p, t) }))
      .filter((x): x is { p: LongPassage; s: string } => x.s !== null)
      .slice(0, per)
      .map(({ p, s }, i) => ({ id: `rc:${t.id}:${p.id}`, theme: t, passage: p, floor: i, sentence: s })),
  )
}
