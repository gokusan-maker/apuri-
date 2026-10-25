// 読解の城：構文（分詞構文・強調構文・分裂文・倒置・仮定法など）ごとに、その構文が入った長文を3階ずつ登る。
// テーマの1階目のはじめに構文の解説と、その長文に出てくる例文
import { splitSentences, type LongPassage } from './longreading'

export type ReadTheme = { id: string; name: string; points: string[]; examples: { en: string; ja: string }[]; re: RegExp }

export const READ_THEMES: ReadTheme[] = [
  {
    id: 'participle',
    name: '分詞構文',
    points: ['文の頭（または後ろ）の -ing / 過去分詞のかたまりが、「～して・～しながら・～なので」と主節に情報をそえる。', '主語は主節と同じ。-ing は「～する側」、過去分詞は「～される側」。'],
    examples: [
      { en: 'Walking along the beach, we found a small crab.', ja: '浜辺を歩いていると、私たちは小さなカニを見つけた。' },
      { en: 'Seen from the hill, the town looked tiny.', ja: '丘から見ると、町はとても小さく見えた。' },
    ],
    re: /^(Having [a-z]+|(?!According|During|Nothing|Something|Everything|Morning|Evening|Spring|Swimming|Reading|Writing|Speaking)[A-Z][a-z]+ing\b[^,.]{3,60},|(Seen|Built|Written|Made|Surrounded|Given|Left|Compared|Faced|Born|Found|Used|Shocked|Encouraged|Inspired|Asked) [^,.]{2,60},)/,
  },
  {
    id: 'cleft',
    name: '強調構文（It is ～ that）',
    points: ['It is / was ＋ 強調したい語句 ＋ that（who）… で「…なのは～だ」。', 'It is と that を取りのぞいても文が成り立つのが見分け方。'],
    examples: [
      { en: 'It was my grandmother who taught me to cook.', ja: '私に料理を教えてくれたのは祖母だった。' },
      { en: 'It is not money but time that we need most.', ja: '私たちがいちばん必要としているのは、お金ではなく時間だ。' },
    ],
    re: /\bIt (is|was) (not until|only|not|in |because|this|these|the |his |her |their |our |my |what )[^.]{0,50}\b(that|who) /,
  },
  {
    id: 'pseudo-cleft',
    name: '分裂文（What ～ is …）',
    points: ['What ～ is … で「～なのは…だ」。言いたいこと（…）を文の後ろに置いて目立たせる。', 'What のかたまり全体が主語（単数あつかい）。'],
    examples: [
      { en: 'What surprised me most was his calm voice.', ja: '私がいちばんおどろいたのは、彼の落ち着いた声だった。' },
      { en: 'What matters is how you use your time.', ja: '大切なのは、時間をどう使うかだ。' },
    ],
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
    re: /^(Never|Rarely|Seldom|Little|Not only|Not until|Only (when|after|by|then|in)|Hardly|Scarcely|No sooner|So [a-z]+ (was|were|did|is|has))\b/,
  },
  {
    id: 'subjunctive',
    name: '仮定法',
    points: ['事実とちがうことは時制を1つ過去にずらす：If S 過去形, S would 原形（今の反対）／If S had 過去分詞, S would have 過去分詞（過去の反対）。', 'I wish / as if / without ～ も仮定法の仲間。'],
    examples: [
      { en: 'If I had more time, I would learn the piano.', ja: 'もっと時間があれば、ピアノを習うのに。' },
      { en: 'If she had left earlier, she would have caught the train.', ja: 'もっと早く出ていたら、彼女は電車に間に合っていただろう。' },
    ],
    re: /\b(If [^.]{0,60}\b(would|could|might)( have)?\b|were to\b|I wish\b|as if\b|as though\b)/,
  },
  {
    id: 'what',
    name: '関係代名詞 what',
    points: ['what ＝ the thing(s) which。「～すること・～するもの」というまとまりを作る。', 'うしろの文には、目的語や主語が1つ欠けている。'],
    examples: [
      { en: 'This is what I wanted for my birthday.', ja: 'これが、私が誕生日にほしかったものだ。' },
      { en: 'Do what you think is right.', ja: '正しいと思うことをしなさい。' },
    ],
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
