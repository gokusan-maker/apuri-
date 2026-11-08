// 相棒モンスター：学習で得た XP（エサ）で育つ。
// XP の出どころ。Lv15 の進化先を決めるのに使う。
export type Source = 'card' | 'quiz' | 'ear'
export const SOURCES: Source[] = ['card', 'quiz', 'ear']

export type MonsterState = {
  xp: number // 累計XP
  lastDay?: string // 最後にXPをもらった日（YYYY-MM-DD）。古い保存データには無い
  src?: Partial<Record<Source, number>> // 出どころ別のXP
  branch?: Source // Lv15 で決まった進化の系統
  seen?: string[] // 出会った姿（図鑑）
  name?: string // 自分でつけた名前
  wear?: string // 着ている飾り（ショップのアイテムid）
  born?: string // 最初にXPをもらった日（出会った日）
  kind?: string // 色ちがい（ガチャのタマゴ）。無いときはふつうの色
  species?: string // キャラクターの種類（ガチャのタマゴ）。無いときはモチ
  fav?: boolean // おきにいり（なかま一覧の先頭に並ぶ）
  skillUses?: number // ボス戦で特技が出た回数（特技レベル）
}

export const XP_QUIZ_CORRECT = 10
export const XP_CARD_GOOD = 5
export const XP_CARD_AGAIN = 1 // 「まだ」でも頑張った分だけ少しもらえる

const STORAGE_KEY = 'eitan:monster'

// レベル n → n+1 に必要なXP。最初は早く上がり、だんだん必要量が増える。
export function xpToNext(level: number): number {
  return 20 + (level - 1) * 10
}

export type LevelInfo = {
  level: number
  into: number // 今のレベルに入ってからのXP
  need: number // 次のレベルまでに必要な量
}

export function levelInfo(totalXp: number): LevelInfo {
  let level = 1
  let rest = Math.max(0, Math.floor(totalXp))
  while (rest >= xpToNext(level)) {
    rest -= xpToNext(level)
    level++
  }
  return { level, into: rest, need: xpToNext(level) }
}

// 保存データを検証して整える（壊れた値は捨てる）
export function sanitizeMonster(v: unknown): MonsterState {
  const m = (v && typeof v === 'object' ? v : {}) as Partial<MonsterState>
  const xp = typeof m.xp === 'number' && m.xp >= 0 ? m.xp : 0
  const out: MonsterState = { xp }
  if (typeof m.lastDay === 'string') out.lastDay = m.lastDay
  if (m.src && typeof m.src === 'object') {
    out.src = Object.fromEntries(SOURCES.filter((k) => typeof m.src?.[k] === 'number').map((k) => [k, m.src![k]]))
  }
  if (m.branch && SOURCES.includes(m.branch)) out.branch = m.branch
  if (Array.isArray(m.seen)) out.seen = m.seen.filter((x): x is string => typeof x === 'string')
  if (typeof m.name === 'string' && m.name) out.name = cleanName(m.name)
  if (!out.name) delete out.name
  if (typeof m.wear === 'string') out.wear = m.wear
  if (typeof m.born === 'string') out.born = m.born
  if (typeof m.kind === 'string' && KINDS.some((k) => k.id === m.kind)) out.kind = m.kind
  if (typeof m.species === 'string' && m.species !== 'mochi' && SPECIES.some((k) => k.id === m.species)) out.species = m.species
  if (m.fav === true) out.fav = true
  if (typeof m.skillUses === 'number' && m.skillUses > 0) out.skillUses = Math.floor(m.skillUses)
  return out
}

export function loadMonster(): MonsterState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return sanitizeMonster(raw ? JSON.parse(raw) : null)
  } catch {
    return { xp: 0 }
  }
}

export function saveMonster(m: MonsterState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(m))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 進化段階。レベル2で生まれ、5・15・30で進化する。
export type Stage = { index: number; name: string; minLevel: number }

export const STAGES: Stage[] = [
  { index: 0, name: 'ふしぎなタマゴ', minLevel: 1 },
  { index: 1, name: 'ちびモチ', minLevel: 2 },
  { index: 2, name: 'モチまる', minLevel: 5 },
  { index: 3, name: 'モチノスケ', minLevel: 15 },
  { index: 4, name: 'オオモチ', minLevel: 30 },
  { index: 5, name: 'デンセツモチ', minLevel: 50 },
  { index: 6, name: 'シンワモチ', minLevel: 70 },
]

export function stageOf(level: number): Stage {
  let s = STAGES[0]
  for (const st of STAGES) if (level >= st.minLevel) s = st
  return s
}

// 今のすがたになってから上がったレベルの数（1レベルごとに星がふえ、少し大きくなる）
export function growthOf(level: number): number {
  return Math.max(0, level - stageOf(level).minLevel)
}
// 成長の星の表示（5こまでは★をならべ、それより多いと ★×数）
export const growthText = (n: number) => (n <= 0 ? '' : n <= 5 ? '★'.repeat(n) : `★×${n}`)
// 成長による大きさ（1レベルで +1%、最大 +15%）
export const growthScale = (n: number) => 1 + Math.min(15, n) / 100

export const LONELY_DAYS = 3

function daysBetween(a: string, b: string): number {
  const [y1, m1, d1] = a.split('-').map(Number)
  const [y2, m2, d2] = b.split('-').map(Number)
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000)
}

// しばらく学習していないと「さみしそう」。弱ったりはしない。
export function isLonely(m: MonsterState, today: string): boolean {
  return !!m.lastDay && daysBetween(m.lastDay, today) >= LONELY_DAYS
}

// クイズ正解のXP。連続正解（コンボ）が続くほどボーナス（最大+10）。
export function quizXp(combo: number): number {
  return XP_QUIZ_CORRECT + Math.min(Math.max(combo - 1, 0), 5) * 2
}

// 図鑑に載る姿。Lv15 からは学び方（系統）で姿が分かれる。
export type Form = {
  id: string
  name: string
  stage: number
  branch?: Source
  color: string
  line: string
  hint: string // 図鑑で未発見のときのヒント
  species?: string // キャラクターの種類（無いときはモチ）
}

// 図鑑の説明文
export const FORM_DESC: Record<string, string> = {
  egg: 'ふしぎな模様のタマゴ。英単語を聞かせると、中からコトコト音がする。',
  chibi: '生まれたばかりのモチ。覚えたての単語をうれしそうにくり返す。',
  mochimaru: 'ぷにぷにの体で、毎日新しい単語を食べて大きくなる。',
  mori: 'カードで学ぶのが好きなモチ。頭の葉っぱは覚えた単語の数だけしげる。',
  inazuma: 'クイズが大好きなモチ。正解すると頭のイナズマがピカッと光る。',
  sora: '耳がよいモチ。英語の音を聞くと、つばさを広げて空を飛ぶ。',
  'mori-king': '森の王さま。木の実のかわりに英単語を集めているという。',
  'inazuma-king': 'カミナリの王さま。早押しなら、だれにも負けない。',
  'sora-king': '空の王さま。世界中の英語を聞き分けられる。',
  'mori-legend': '伝説の森のモチ。そのまわりでは、本がよく読まれるという。',
  'inazuma-legend': '伝説のイナズマモチ。100問連続正解したという言い伝えがある。',
  'sora-legend': '伝説の空のモチ。聞いた英語を一度で覚えてしまう。',
  'mori-myth': '神話にうたわれる森のモチ。世界中の単語の木を育てているという。',
  'inazuma-myth': '神話にうたわれる雷のモチ。どんな問題も一瞬で答えてしまう。',
  'sora-myth': '神話にうたわれる空のモチ。世界中のことばの歌を聞いている。',
}

export const FORMS: Form[] = [
  { id: 'egg', name: 'ふしぎなタマゴ', stage: 0, color: '#fde68a', line: '#d97706', hint: 'はじめから' },
  { id: 'chibi', name: 'ちびモチ', stage: 1, color: '#bbf7d0', line: '#15803d', hint: 'Lv2' },
  { id: 'mochimaru', name: 'モチまる', stage: 2, color: '#86efac', line: '#15803d', hint: 'Lv5' },
  { id: 'mori', name: 'モリモチ', stage: 3, branch: 'card', color: '#4ade80', line: '#166534', hint: 'Lv15・カード中心' },
  { id: 'inazuma', name: 'イナズマモチ', stage: 3, branch: 'quiz', color: '#fde047', line: '#a16207', hint: 'Lv15・クイズ中心' },
  { id: 'sora', name: 'ソラモチ', stage: 3, branch: 'ear', color: '#7dd3fc', line: '#0369a1', hint: 'Lv15・リスニング/スペル中心' },
  { id: 'mori-king', name: 'モリノオオモチ', stage: 4, branch: 'card', color: '#22c55e', line: '#14532d', hint: 'Lv30・カード中心' },
  { id: 'inazuma-king', name: 'カミナリオオモチ', stage: 4, branch: 'quiz', color: '#facc15', line: '#854d0e', hint: 'Lv30・クイズ中心' },
  { id: 'sora-king', name: 'ソラノオオモチ', stage: 4, branch: 'ear', color: '#38bdf8', line: '#075985', hint: 'Lv30・リスニング/スペル中心' },
  { id: 'mori-legend', name: 'デンセツノモリモチ', stage: 5, branch: 'card', color: '#15803d', line: '#052e16', hint: 'Lv50・カード中心' },
  { id: 'inazuma-legend', name: 'デンセツノイナズマモチ', stage: 5, branch: 'quiz', color: '#eab308', line: '#713f12', hint: 'Lv50・クイズ中心' },
  { id: 'sora-legend', name: 'デンセツノソラモチ', stage: 5, branch: 'ear', color: '#0284c7', line: '#082f49', hint: 'Lv50・リスニング/スペル中心' },
  { id: 'mori-myth', name: 'シンワノモリモチ', stage: 6, branch: 'card', color: '#a3e635', line: '#365314', hint: 'Lv70・カード中心' },
  { id: 'inazuma-myth', name: 'シンワノイナズマモチ', stage: 6, branch: 'quiz', color: '#fb923c', line: '#7c2d12', hint: 'Lv70・クイズ中心' },
  { id: 'sora-myth', name: 'シンワノソラモチ', stage: 6, branch: 'ear', color: '#c4b5fd', line: '#4c1d95', hint: 'Lv70・リスニング/スペル中心' },
]

// いちばん多くXPをもらった学び方（同点ならカード→クイズ→耳の順）
export function dominant(src: MonsterState['src']): Source {
  let best: Source = 'card'
  for (const k of SOURCES) if ((src?.[k] ?? 0) > (src?.[best] ?? 0)) best = k
  return best
}

export function formOf(m: MonsterState): Form {
  const stage = stageOf(levelInfo(m.xp).level).index
  const base = stage < 3 ? FORMS.find((f) => f.stage === stage)! : FORMS.find((f) => f.stage === stage && f.branch === (m.branch ?? dominant(m.src)))!
  return withSpecies(base, m.species)
}

// XP をあげる。Lv15 に届いた時点の学び方で系統が決まり、以後は変わらない。
// source が null のとき（ミッションのごほうびなど）は系統の判定に数えない
export function feed(m: MonsterState, amount: number, source: Source | null, today: string): MonsterState {
  const src = source ? { ...m.src, [source]: (m.src?.[source] ?? 0) + amount } : { ...m.src }
  const next: MonsterState = { ...m, xp: m.xp + amount, lastDay: today, src, born: m.born ?? today }
  if (!next.branch && stageOf(levelInfo(next.xp).level).index >= 3) next.branch = dominant(src)
  next.seen = seenForms(next)
  return next
}

// 今の姿までに通ってきた姿（＋これまでに記録した姿）。古いデータでも途中の姿が図鑑に載る。
export function seenForms(m: MonsterState): string[] {
  const now = formOf(m)
  const passed = FORMS.filter((f) => f.stage <= now.stage && (!f.branch || f.branch === now.branch)).map((f) => f.id)
  const all = new Set([...(m.seen ?? []), ...passed])
  return FORMS.filter((f) => all.has(f.id)).map((f) => f.id)
}

export const NAME_MAX = 10

// 前後の空白を取り、10文字まで（絵文字なども1文字として数える）
export function cleanName(name: string): string {
  return [...name.trim()].slice(0, NAME_MAX).join('')
}

export function rename(m: MonsterState, name: string): MonsterState {
  const n = cleanName(name)
  const next = { ...m }
  if (n) next.name = n
  else delete next.name
  return next
}

// 次の進化までのレベル（最後のすがたなら null）
// 次の進化の姿（予想）：Lv15 で系統が決まる前は、今いちばん多い学び方の系統で予想する
export function nextFormOf(m: MonsterState): { form: Form; levels: number } | null {
  const level = levelInfo(m.xp).level
  const next = STAGES.findIndex((s) => s.minLevel > level)
  if (next < 0) return null
  const base = next < 3 ? FORMS.find((f) => f.stage === next)! : FORMS.find((f) => f.stage === next && f.branch === (m.branch ?? dominant(m.src)))!
  return { form: withSpecies(base, m.species), levels: STAGES[next].minLevel - level }
}

export function levelsToNextStage(level: number): { name: string; levels: number } | null {
  const next = STAGES.find((s) => s.minLevel > level)
  return next ? { name: next.name, levels: next.minLevel - level } : null
}

// 色ちがい（タマゴガチャで出る）。color/line が姿の色の代わりになる
export type Kind = { id: string; name: string; rarity: 'N' | 'R' | 'SR' | 'UR'; color: string; line: string }

export const KINDS: Kind[] = [
  { id: 'normal', name: 'ふつう', rarity: 'N', color: '', line: '' },
  { id: 'sakura', name: 'さくら色', rarity: 'R', color: '#f9a8d4', line: '#9d174d' },
  { id: 'umi', name: 'うみ色', rarity: 'R', color: '#5eead4', line: '#115e59' },
  { id: 'yoru', name: 'よる色', rarity: 'R', color: '#a5b4fc', line: '#3730a3' },
  { id: 'kin', name: 'きんいろ', rarity: 'SR', color: '#f59e0b', line: '#78350f' },
  { id: 'niji', name: 'にじいろ', rarity: 'UR', color: '#f0abfc', line: '#6b21a8' },
  // 季節限定（その時期のガチャだけで出る）
  { id: 'pumpkin', name: 'かぼちゃ色', rarity: 'R', color: '#fb923c', line: '#7c2d12' },
  { id: 'snow', name: 'ゆき色', rarity: 'R', color: '#e0f2fe', line: '#0369a1' },
]

export const RARITY_LABEL = { N: 'ノーマル', R: 'レア', SR: 'スーパーレア', UR: 'ウルトラレア' } as const

export const kindOf = (id: string | undefined): Kind => KINDS.find((k) => k.id === id) ?? KINDS[0]

// 0〜1の乱数から色ちがいを決める：ノーマル60%・レア30%・スーパーレア9%・ウルトラレア1%
export function rollKind(r: number): Kind {
  if (r < 0.6) return KINDS[0]
  if (r < 0.9) return KINDS[1 + Math.min(2, Math.floor(((r - 0.6) / 0.3) * 3))]
  if (r < 0.99) return kindOf('kin')
  return kindOf('niji')
}

// 色ちがいをあてた姿（ふつうはそのまま）
export function withKind(form: Form, kind: string | undefined): Form {
  const k = kindOf(kind)
  return k.color ? { ...form, color: k.color, line: k.line } : form
}

// キャラクターの種類（タマゴガチャで出る）。名前の「モチ」が種類ごとの呼び名に変わる
export type Species = {
  id: string
  name: string
  egg: string // タマゴの名前
  token: string // 小さいうちの呼び名（ちび〇〇・〇〇まる）
  bigToken: string // Lv15 からの呼び名
  color: string // 小さいうち（Lv15まで）の体の色
  line: string
  rate: number // ガチャで出る割合
  desc: string
}

// ガチャで出る割合（合計1）。週末のドラコ2倍・ピックアップの上乗せはモチの分からまわすので、モチは0.18以上にしておく
export const SPECIES: Species[] = [
  { id: 'mochi', name: 'モチ', egg: 'ふしぎなタマゴ', token: 'モチ', bigToken: 'モチ', color: '', line: '', rate: 0.18, desc: 'ぷにぷにのなかよしモンスター。カードで単語をコツコツ覚えるのが好き。' },
  { id: 'fox', name: 'コンコン', egg: 'こがねのタマゴ', token: 'コン', bigToken: 'コンコ', color: '#fdba74', line: '#c2410c', rate: 0.02, desc: 'ふさふさしっぽのかしこいキツネ。文法のきまりを見ぬくのが得意。' },
  { id: 'penguin', name: 'ペンペン', egg: 'こおりのタマゴ', token: 'ペン', bigToken: 'ペンギ', color: '#93c5fd', line: '#1e3a8a', rate: 0.02, desc: 'よちよち歩きのペンギン。ばらばらの単語をきれいに並べるのが好き。' },
  { id: 'rabbit', name: 'ウサピョン', egg: 'つきのタマゴ', token: 'ピョン', bigToken: 'ピョンタ', color: '#fbcfe8', line: '#9d174d', rate: 0.02, desc: '長い耳のウサギ。どんな小さな英語の音も聞きのがさない。' },
  { id: 'cat', name: 'ニャンタ', egg: 'しましまのタマゴ', token: 'ニャン', bigToken: 'ニャンタ', color: '#cbd5e1', line: '#475569', rate: 0.02, desc: '気まぐれなネコ。日本語を英語に言いかえるのが得意。' },
  { id: 'dragon', name: 'ドラコ', egg: 'ほのおのタマゴ', token: 'ドラ', bigToken: 'ドラゴ', color: '#fca5a5', line: '#b91c1c', rate: 0.03, desc: 'めったに出会えない小さなドラゴン。育つと英語で話しはじめ、英文の意味を読みとくのが得意。' },
  { id: 'owl', name: 'ホーホー', egg: 'もりのタマゴ', token: 'ホー', bigToken: 'ホーホ', color: '#d6b88f', line: '#78350f', rate: 0.02, desc: '大きな目のものしりフクロウ。長い英文も夜おそくまで読みつづけられる。' },
  { id: 'turtle', name: 'カメスケ', egg: 'こうらのタマゴ', token: 'カメ', bigToken: 'カメスケ', color: '#5eead4', line: '#0f766e', rate: 0.02, desc: 'かたいこうらのカメ。ゆっくりでも毎日コツコツ単語を覚える。' },
  { id: 'hamster', name: 'ハムリン', egg: 'ひまわりのタマゴ', token: 'ハム', bigToken: 'ハムリ', color: '#fcd34d', line: '#b45309', rate: 0.02, desc: 'ほっぺに何でもつめこむハムスター。たくさんの単語をほっぺにためて覚える。' },
  { id: 'sheep', name: 'モコリ', egg: 'わたぐものタマゴ', token: 'モコ', bigToken: 'モコリ', color: '#f1f5f9', line: '#64748b', rate: 0.02, desc: 'もこもこの毛のヒツジ。ねむくなるまで単語を数えるのが日課。' },
  { id: 'squirrel', name: 'クルミン', egg: 'どんぐりのタマゴ', token: 'クル', bigToken: 'クルミ', color: '#d6a77a', line: '#7c2d12', rate: 0.02, desc: 'ふさふさしっぽのリス。覚えた単語をどんぐりみたいに頭の中にしまっておく。' },
  { id: 'panda', name: 'ササパン', egg: 'たけのこのタマゴ', token: 'パン', bigToken: 'ササパ', color: '#f8fafc', line: '#1f2937', rate: 0.02, desc: '白と黒のパンダ。ササを食べながら、のんびり文法のきまりを考える。' },
  { id: 'lion', name: 'ガオラ', egg: 'たいようのタマゴ', token: 'ガオ', bigToken: 'ガオラ', color: '#fbbf24', line: '#92400e', rate: 0.02, desc: 'りっぱなたてがみのライオン。どんなむずかしい長文にも、こわがらずに立ち向かう。' },
  { id: 'elephant', name: 'パオン', egg: 'みずうみのタマゴ', token: 'パオ', bigToken: 'パオン', color: '#a8b3c4', line: '#4b5563', rate: 0.02, desc: '大きな耳のゾウ。一度覚えた単語はぜったいにわすれない。' },
  { id: 'koala', name: 'ユーカ', egg: 'ユーカリのタマゴ', token: 'ユー', bigToken: 'ユーカ', color: '#9ca3af', line: '#374151', rate: 0.02, desc: 'ふわふわの耳のコアラ。のんびりねむりながらも、聞いた英語はちゃんと覚えている。' },
  { id: 'hedgehog', name: 'ハリポン', egg: 'トゲトゲのタマゴ', token: 'ハリ', bigToken: 'ハリポン', color: '#b45309', line: '#451a03', rate: 0.02, desc: '背中がトゲトゲのハリネズミ。こわがりだけど、まちがえた単語にはトゲのように何度もささって覚える。' },
  { id: 'pelican', name: 'ペリッチ', egg: 'みなとのタマゴ', token: 'ペリ', bigToken: 'ペリッチ', color: '#f8fafc', line: '#475569', rate: 0.02, desc: '大きなくちばしのペリカン。のどのふくろに、聞いた英単語をたっぷりためこむ。' },
  { id: 'seal', name: 'アザラン', egg: 'りゅうひょうのタマゴ', token: 'アザ', bigToken: 'アザラン', color: '#cbd5e1', line: '#334155', rate: 0.02, desc: 'まるまるとしたアザラシ。氷の上でごろごろしながら、英語のリズムに合わせてヒレをたたく。' },
  { id: 'flamingo', name: 'フラミン', egg: 'さくら色のタマゴ', token: 'フラ', bigToken: 'フラミン', color: '#f9a8d4', line: '#9d174d', rate: 0.02, desc: 'ピンクのフラミンゴ。かた足で立ったまま、じっと英語を聞いて集中する。' },
  { id: 'otter', name: 'カワッチ', egg: 'かわらのタマゴ', token: 'カワ', bigToken: 'カワッチ', color: '#a16207', line: '#422006', rate: 0.02, desc: '川であそぶカワウソ。お気に入りの小石をおなかにのせて、覚えた単語をかぞえている。' },
  { id: 'bear', name: 'ベアボン', egg: 'はちみつのタマゴ', token: 'ベア', bigToken: 'ベアボン', color: '#92400e', line: '#3b1d06', rate: 0.02, desc: '森にすむ子グマ。はちみつが大好きで、あまい単語ほどよく覚える。' },
  { id: 'giraffe', name: 'ジラフィ', egg: 'サバンナのタマゴ', token: 'ジラ', bigToken: 'ジラフィ', color: '#facc15', line: '#713f12', rate: 0.02, desc: '首の長いキリン。高いところから、むずかしい単語も見のがさない。' },
  { id: 'frog', name: 'ピョコタ', egg: 'はすの葉のタマゴ', token: 'ピョコ', bigToken: 'ピョコタ', color: '#4ade80', line: '#14532d', rate: 0.02, desc: 'はすの葉の上のカエル。雨の日がすきで、正解するとケロッと高くジャンプする。' },
  { id: 'raccoon', name: 'アライッチ', egg: 'せせらぎのタマゴ', token: 'アラ', bigToken: 'アライッチ', color: '#a8a29e', line: '#292524', rate: 0.02, desc: 'しましまのしっぽのアライグマ。なんでも川でていねいに洗うように、単語も一つずつていねいに覚える。' },
  { id: 'sloth', name: 'ノンビリン', egg: 'ジャングルのタマゴ', token: 'ノン', bigToken: 'ノンビリン', color: '#d6d3d1', line: '#57534e', rate: 0.02, desc: '木にぶら下がるナマケモノ。動きはゆっくりだけど、一度覚えた単語はずっとわすれない。' },
  { id: 'alpaca', name: 'モフパカ', egg: 'アンデスのタマゴ', token: 'モフ', bigToken: 'モフパカ', color: '#fef3c7', line: '#78350f', rate: 0.02, desc: 'もこもこの毛のアルパカ。ふわふわの毛の中に、覚えた単語をいっぱいしまっている。' },
  { id: 'mole', name: 'モグッチ', egg: 'つちの中のタマゴ', token: 'モグ', bigToken: 'モグッチ', color: '#57534e', line: '#1c1917', rate: 0.02, desc: '土の中をほり進むモグラ。目はちいさいけれど、耳と鼻で英語の音をしっかりつかまえる。' },
  { id: 'dolphin', name: 'ドルフィ', egg: 'さんごのタマゴ', token: 'ドル', bigToken: 'ドルフィ', color: '#60a5fa', line: '#1e3a8a', rate: 0.02, desc: '海をとびはねるイルカ。音で仲間と話すので、英語の発音を聞き分けるのが得意。' },
  { id: 'hippo', name: 'カバッチ', egg: 'どろんこのタマゴ', token: 'カバ', bigToken: 'カバッチ', color: '#c4b5fd', line: '#4c1d95', rate: 0.02, desc: '大きな口のカバ。水の中でのんびりしながら、大きな口で長い文もまるごと覚える。' },
  { id: 'crab', name: 'チョッキン', egg: 'すなはまのタマゴ', token: 'チョキ', bigToken: 'チョッキン', color: '#f87171', line: '#7f1d1d', rate: 0.02, desc: '大きなハサミのカニ。横歩きしながら、まちがえた単語をチョキンと切って覚えなおす。' },
  { id: 'tiger', name: 'シマトラ', egg: 'たけやぶのタマゴ', token: 'トラ', bigToken: 'シマトラ', color: '#fb923c', line: '#7c2d12', rate: 0.02, desc: 'しましまのトラ。ねらった単語にそっと近づいて、一気にがぶっと覚える。' },
  { id: 'chameleon', name: 'イロカメ', egg: 'このはのタマゴ', token: 'イロ', bigToken: 'イロカメ', color: '#86efac', line: '#14532d', rate: 0.02, desc: '体の色をかえるカメレオン。単語の意味によって、くるくる色をかえて覚える。' },
  { id: 'swan', name: 'シラトリ', egg: 'みずべのタマゴ', token: 'シラ', bigToken: 'シラトリ', color: '#f1f5f9', line: '#334155', rate: 0.02, desc: '湖をすべるハクチョウ。水の上ではしずかだけど、水の下では足をいっしょうけんめい動かして練習している。' },
  { id: 'peacock', name: 'クジャラン', egg: 'はなぞののタマゴ', token: 'クジャ', bigToken: 'クジャラン', color: '#2dd4bf', line: '#134e4a', rate: 0.02, desc: 'きれいな羽のクジャク。正解するたびに、羽を大きく広げてみせてくれる。' },
  { id: 'wolf', name: 'ウルフィ', egg: 'つきよのタマゴ', token: 'ウル', bigToken: 'ウルフィ', color: '#94a3b8', line: '#1e293b', rate: 0.02, desc: '月夜にほえるオオカミ。なかまといっしょに、声をそろえて英語を読みあげる。' },
  { id: 'parrot', name: 'オウムン', egg: 'ねったいのタマゴ', token: 'オウ', bigToken: 'オウムン', color: '#4ade80', line: '#166534', rate: 0.02, desc: 'カラフルなオウム。聞いた英語をそのまままねして、発音の練習をてつだってくれる。' },
  { id: 'bat', name: 'コウモン', egg: 'どうくつのタマゴ', token: 'コウ', bigToken: 'コウモン', color: '#a78bfa', line: '#3b0764', rate: 0.02, desc: 'どうくつにすむコウモリ。小さな音のはねかえりで、英語の音のちがいを聞き分ける。' },
  { id: 'seahorse', name: 'タツノン', egg: 'うみくさのタマゴ', token: 'タツ', bigToken: 'タツノン', color: '#fcd34d', line: '#92400e', rate: 0.02, desc: '海草につかまるタツノオトシゴ。小さな体でも、しっぽでしっかり単語をつかんではなさない。' },
  { id: 'camel', name: 'ラクダン', egg: 'さばくのタマゴ', token: 'ラク', bigToken: 'ラクダン', color: '#d6a35c', line: '#78350f', rate: 0.02, desc: 'さばくを歩くラクダ。こぶに覚えた単語をたくわえて、長い道のりもへっちゃら。' },
  { id: 'polarbear', name: 'シロクマン', egg: 'ほっきょくのタマゴ', token: 'シロ', bigToken: 'シロクマン', color: '#f8fafc', line: '#475569', rate: 0.03, desc: '氷の上のシロクマ。寒さにも負けず、毎日こつこつ英語を続ける力もち。' },
  { id: 'duck', name: 'アヒルン', egg: 'いけのタマゴ', token: 'アヒ', bigToken: 'アヒルン', color: '#fde047', line: '#a16207', rate: 0.02, desc: '池をすいすい泳ぐアヒル。ガーガー大きな声で、英語を元気に読みあげる。' },
  { id: 'squid', name: 'イカッチ', egg: 'しんかいのタマゴ', token: 'イカ', bigToken: 'イカッチ', color: '#e9d5ff', line: '#6b21a8', rate: 0.02, desc: '深い海を泳ぐイカ。10本の足で、10個の単語をいっぺんにつかまえる。' },
  { id: 'chicken', name: 'コケッコ', egg: 'わらのタマゴ', token: 'コケ', bigToken: 'コケッコ', color: '#fef2f2', line: '#991b1b', rate: 0.02, desc: '朝一番に鳴くニワトリ。毎朝早起きして、その日の英単語をみんなに知らせる。' },
  { id: 'pig', name: 'ブタッチ', egg: 'こやのタマゴ', token: 'ブタ', bigToken: 'ブタッチ', color: '#fbcfe8', line: '#9d174d', rate: 0.02, desc: 'ピンクのブタ。鼻がきくので、においをかぐように正しい答えを見つけだす。' },
  { id: 'beaver', name: 'ビバッチ', egg: 'ダムのタマゴ', token: 'ビバ', bigToken: 'ビバッチ', color: '#a16207', line: '#422006', rate: 0.02, desc: '川にダムを作るビーバー。木を一本ずつ運ぶように、単語を一つずつ積み上げていく。' },
  { id: 'deer', name: 'シカノン', egg: 'もみじのタマゴ', token: 'シカ', bigToken: 'シカノン', color: '#d97706', line: '#78350f', rate: 0.02, desc: '森にすむシカ。耳をぴんと立てて、遠くの小さな英語の音も聞きのがさない。' },
  { id: 'goat', name: 'ヤギッチ', egg: 'まきばのタマゴ', token: 'ヤギ', bigToken: 'ヤギッチ', color: '#e7e5e4', line: '#44403c', rate: 0.02, desc: 'けわしい山も登るヤギ。むずかしい問題でも、ひょいひょいと上っていく。' },
  { id: 'mouse', name: 'チュータ', egg: 'チーズのタマゴ', token: 'チュー', bigToken: 'チュータ', color: '#d4d4d8', line: '#3f3f46', rate: 0.02, desc: '小さなネズミ。すばしっこく動き回って、小さな単語のちがいも見つけだす。' },
  { id: 'snail', name: 'カタツン', egg: 'あじさいのタマゴ', token: 'カタ', bigToken: 'カタツン', color: '#c4b5fd', line: '#5b21b6', rate: 0.02, desc: 'あじさいの葉の上のカタツムリ。ゆっくりでも、毎日少しずつ前へ進むのが得意。' },
  { id: 'badger', name: 'アナグー', egg: 'ねぐらのタマゴ', token: 'アナ', bigToken: 'アナグー', color: '#78716c', line: '#1c1917', rate: 0.02, desc: '白と黒の顔のアナグマ。穴をほるように、単語の意味を深くまでほり下げる。' },
  { id: 'jellyfish', name: 'クラリン', egg: 'なみまのタマゴ', token: 'クラ', bigToken: 'クラリン', color: '#bae6fd', line: '#0369a1', rate: 0.02, desc: 'ふわふわただようクラゲ。波にゆられながら、のんびり英語のリズムを楽しむ。' },
  { id: 'whale', name: 'クジラン', egg: 'おおうなばらのタマゴ', token: 'クジ', bigToken: 'クジラン', color: '#60a5fa', line: '#1e3a8a', rate: 0.02, desc: '大きな海を旅するクジラ。遠くまでとどく歌声で、英語の歌もじょうずに歌う。' },
  { id: 'hummingbird', name: 'ハチドリン', egg: 'あさつゆのタマゴ', token: 'ハチ', bigToken: 'ハチドリン', color: '#34d399', line: '#065f46', rate: 0.02, desc: 'とても小さなハチドリ。目にも止まらぬ速さで羽ばたいて、花から花へ単語を集める。' },
  { id: 'ostrich', name: 'ダチョラン', egg: 'だいちのタマゴ', token: 'ダチョ', bigToken: 'ダチョラン', color: '#a8a29e', line: '#292524', rate: 0.02, desc: '世界一大きな鳥、ダチョウ。空は飛べないけれど、だれよりも速く走って答えにたどりつく。' },
  { id: 'woodpecker', name: 'キツツキン', egg: 'こだまのタマゴ', token: 'キツ', bigToken: 'キツツキン', color: '#fca5a5', line: '#7f1d1d', rate: 0.02, desc: '赤いぼうしのキツツキ。コンコンと木をたたくリズムで、英単語を一つずつ頭にきざむ。' },
  { id: 'banteng', name: 'バンテッコ', egg: 'ジャワのしろあしタマゴ', token: 'バンテン', bigToken: 'バンテッコ', color: '#6b3f22', line: '#2a170b', rate: 0.02, desc: '東南アジアの森にすむ野生のウシ、バンテン。メスは明るい赤茶色、オスは黒っぽい色になる。足の下のほうとおしりが白いのが目じるし。森と草原のあいだを行き来しながら、むれでくらす。' },
  { id: 'gaur', name: 'ガウルン', egg: 'インドのもりタマゴ', token: 'ガウル', bigToken: 'ガウルン', color: '#2f2320', line: '#120c0a', rate: 0.02, desc: 'インドや東南アジアの森にすむ、世界でいちばん大きな野生のウシ、ガウル。体はこげ茶色から黒で、4本の足の先だけが白く、くつ下をはいているように見える。肩が大きくもり上がり、トラもめったにおそわないほどのつよさ。' },
  { id: 'anoa', name: 'アノアン', egg: 'ジャングルのちびタマゴ', token: 'アノア', bigToken: 'アノアン', color: '#3e3833', line: '#171412', rate: 0.02, desc: 'インドネシアのスラウェシ島の森にすむ、世界でいちばん小さな野生のスイギュウ、アノア。体の高さは1メートルほどで、黒っぽい体にまっすぐな短いツノをもつ。ふだんは森の奥でひっそりとくらし、水辺で泥あびをするのが好き。' },
  { id: 'tamaraw', name: 'タマラオン', egg: 'ミンドロのしまタマゴ', token: 'タマラオ', bigToken: 'タマラオン', color: '#4a3b32', line: '#1c1410', rate: 0.02, desc: 'フィリピンのミンドロ島だけにすむ、小さな野生のウシ、タマラオ。こげ茶色から黒っぽい体で、まっすぐ後ろへのびる短いV字形のツノをもつ。森や草原でくらし、とても数が少ないので、島の人々が大切に守っている。' },
  { id: 'bharal', name: 'バーラルン', egg: 'あおいいわばタマゴ', token: 'バーラル', bigToken: 'バーラルン', color: '#8a8f99', line: '#2f3238', rate: 0.02, desc: 'ヒマラヤやチベットの高い山の岩場にすむ、ヒツジとヤギの中間のような動物、バーラル。毛は青みがかった灰色で、ブルーシープともよばれる。岩の色にまぎれて身をかくし、オスは横に大きく広がるツノをもつ。けわしいがけを身軽にかけ上がる。' },
  { id: 'urial', name: 'ウリアルン', egg: 'あれちのひげタマゴ', token: 'ウリアル', bigToken: 'ウリアルン', color: '#a07850', line: '#3c2a16', rate: 0.02, desc: '中央アジアから南アジアのかわいた丘や山にすむ野生のヒツジ、ウリアル。赤茶色の体で、オスはのどから胸にかけて長い黒い毛がたれ、ひげのように見える。オスは大きく弧をえがくツノをもつ。草の少ない土地で、むれをつくって移動しながらくらす。' },
  { id: 'argali', name: 'アルガリン', egg: 'こうげんのうずまきヅノタマゴ', token: 'アルガリ', bigToken: 'アルガリン', color: '#9b7b55', line: '#3a2a18', rate: 0.02, desc: '中央アジアの高原や山にすむ、世界でいちばん大きな野生のヒツジ、アルガリ。オスは顔のまわりにうずを巻く、とても大きく重いツノをもつ。茶色い体に白っぽいおしりと足をもち、寒くかわいた高い土地で、むれをつくって草を食べてくらす。' },
  { id: 'goral', name: 'ゴーラルン', egg: 'いわやまのはいいろタマゴ', token: 'ゴーラル', bigToken: 'ゴーラルン', color: '#8b8070', line: '#33302a', rate: 0.02, desc: 'ヒマラヤから東アジアの岩の多い山にすむ、ヤギに近いなかまのゴーラル。灰色がかった茶色の毛と、のどの白いもようをもつ。オスもメスも短く後ろへ曲がったツノがある。けわしい岩場を身軽に動き、とくに朝早くや夕方に草や木の葉を食べる。' },
  { id: 'tahr', name: 'タールン', egg: 'ヒマラヤのたてがみタマゴ', token: 'タール', bigToken: 'タールン', color: '#7a5a3a', line: '#2e2014', rate: 0.02, desc: 'ヒマラヤの山やまのけわしい斜面にすむ、ヤギに近いなかまのヒマラヤタール。オスは冬になると首や肩に長くふさふさした毛がのび、たてがみのように見える。ひづめのうらがゴムのようにやわらかく、岩をしっかりとらえてがけをのぼる。短く曲がったツノをもつ。' },
  { id: 'muntjac', name: 'ホエジカン', egg: 'ほえるこじかタマゴ', token: 'ホエジカ', bigToken: 'ホエジカン', color: '#a0522d', line: '#3b1d0e', rate: 0.02, desc: 'アジアの森にすむ小さなシカのなかま、ホエジカ（キョンのなかま）。危険を感じると、イヌのような「ワン」という声で鳴くことから、この名前がついた。オスは短いツノと、口から少し見える小さなキバをもつ。森の下草のあいだを、背中を丸めてすばやく動く。' },
  { id: 'gazelle', name: 'ガゼルン', egg: 'さばくのかるあしタマゴ', token: 'ガゼル', bigToken: 'ガゼルン', color: '#d1a46b', line: '#5a3c18', rate: 0.02, desc: 'アフリカ北部からアジアのかわいた土地にすむ、ほっそりしたアンテロープのなかま、ドルカスガゼル。うすい砂色の体で、わき腹に茶色いすじ、顔に白いもようがある。暑くかわいた場所でもくらせ、食べる植物から水分をとる。走るのがとても速く、竪琴のような形のツノをもつ。' },
  { id: 'chiru', name: 'チルーン', egg: 'こうげんのやわげタマゴ', token: 'チルー', bigToken: 'チルーン', color: '#c8a77a', line: '#4a3820', rate: 0.02, desc: 'チベットの高原にすむアンテロープのなかま、チルー（チベットアンテロープ）。寒さから身を守る、とても細くやわらかい毛をもつ。その毛をねらった密猟で数がへったが、保護が進んで少しずつふえてきた。オスは細長くまっすぐにのびたツノをもち、夏には長い距離を移動する。' },
  { id: 'grysbok', name: 'グリスボックン', egg: 'よるのしもふりタマゴ', token: 'グリスボック', bigToken: 'グリスボックン', color: '#9c4a2a', line: '#3a170a', rate: 0.02, desc: 'アフリカ南部のしげみや低い木のある土地にすむ小さなアンテロープのなかま、グリスボック。赤茶色の毛に白い毛がまじり、しもがふったようなまだらに見える。おもに夜に出てきて草や葉を食べ、昼はしげみの中にかくれている。ふだんは一頭でくらし、オスは短いツノをもつ。' },
  { id: 'suni', name: 'スニーン', egg: 'もりのちいさなタマゴ', token: 'スニ', bigToken: 'スニーン', color: '#a8673a', line: '#3e2210', rate: 0.02, desc: 'アフリカ東部から南部の海に近い森やしげみにすむ、とても小さなアンテロープのなかま、スニ。背の高さは30〜40センチほどで、赤茶色の体に白い点のある黒っぽいしっぽをもつ。しっぽをいつもふるように動かし、しげみの中をすばやくかけぬける。オスは短いツノをもつ。' },
  { id: 'puku', name: 'プクン', egg: 'きんいろのみずべタマゴ', token: 'プク', bigToken: 'プクン', color: '#d4882b', line: '#5a3410', rate: 0.02, desc: 'アフリカ南部の川や湿地の近くの草原にすむアンテロープのなかま、プク。金色がかったオレンジ色の毛が特ちょうで、顔やおなかは明るい色をしている。水べから遠くはなれずにくらし、危険を感じると口笛のような声でなかまに知らせる。オスは短く太いツノをもつ。' },
  { id: 'reedbuck', name: 'リードバックン', egg: 'あしはらのくちぶえタマゴ', token: 'リードバック', bigToken: 'リードバックン', color: '#b7955f', line: '#4a3518', rate: 0.02, desc: 'アフリカの水べに近い背の高い草原やアシのしげみにすむアンテロープのなかま、リードバック。黄色っぽい茶色の体で、耳の下に毛のない小さな灰色のもようがある。危険を感じると鼻からピーッと口笛のような音を出してなかまに知らせる。オスは前へ曲がったツノをもつ。' },
  { id: 'oribi', name: 'オリビン', egg: 'くさはらのほそあしタマゴ', token: 'オリビ', bigToken: 'オリビン', color: '#c9925a', line: '#4a3015', rate: 0.02, desc: 'アフリカの草原にすむ小さくほっそりしたアンテロープのなかま、オリビ。明るい茶色の体に白いおなかをもち、耳の下に黒いまるいもようがある。おどろくと、足をのばしたまま真上にぴょんとはね上がってから走ってにげる。オスは短くまっすぐなツノをもつ。' },
  { id: 'waterbuck', name: 'ウォーターバックン', egg: 'みずべのしろわタマゴ', token: 'ウォーターバック', bigToken: 'ウォーターバックン', color: '#78624b', line: '#2e2418', rate: 0.02, desc: 'アフリカの川や湖の近くにすむ大型のアンテロープ、ウォーターバック。灰色がかった茶色のごわごわした毛は油をふくみ、水をはじく。おしりに白い輪のもようがあるのが目じるし。危険を感じると水の中へにげこむことがある。オスは前へ曲がった長いツノをもつ。' },
  { id: 'roan', name: 'ローアン', egg: 'くりげのおおツノタマゴ', token: 'ローンアンテロープ', bigToken: 'ローアン', color: '#a0745a', line: '#3b2416', rate: 0.02, desc: 'アフリカの木のまばらな草原にすむ大型のアンテロープ、ローンアンテロープ。赤みがかった灰色の体に、白黒のおめんのような顔のもようがある。先にふさのある長い耳と、うしろへ曲がったツノが目じるし。アンテロープのなかでもとくに大きく、力も強い。' },
  { id: 'lechwe', name: 'リーチュン', egg: 'しっちのはねあしタマゴ', token: 'リーチュエ', bigToken: 'リーチュン', color: '#c46b2a', line: '#4a2208', rate: 0.02, desc: 'アフリカ南部の湿地にすむアンテロープのなかま、リーチュエ。うしろ足が前足より長く、浅い水の中をはねるように速く走れる。敵におわれると水の中へにげこむことが多い。オスは竪琴のような形のツノをもつ。ひづめが長く、ぬかるんだ地面でも歩きやすい。' },
  { id: 'eland', name: 'エランドン', egg: 'いちばんおおきなタマゴ', token: 'エランド', bigToken: 'エランドン', color: '#a3734a', line: '#3f2a16', rate: 0.02, desc: 'アフリカ東部と南部の草原や林にすむ、世界でいちばん大きなアンテロープ、エランド。うすい茶色の体に白い細いすじがあり、オスもメスもねじれたまっすぐなツノをもつ。大きな体なのに、高い木のさくもとびこえるほどジャンプがうまい。オスは歩くとカチカチという音がすることで知られる。' },
  { id: 'nilgai', name: 'ニルガイン', egg: 'あおいうしのタマゴ', token: 'ニルガイ', bigToken: 'ニルガイン', color: '#64748b', line: '#1e293b', rate: 0.02, desc: 'インドやネパールの草原や林にすむ、アジアでいちばん大きなアンテロープのなかま、ニルガイ。名前は「青いウシ」という意味で、オスは青みがかった灰色、メスは黄みがかった茶色をしている。オスはのどにひげのような毛のふさと、短いツノをもつ。' },
  { id: 'sable', name: 'セーブルン', egg: 'ゆみなりづのタマゴ', token: 'セーブルアンテロープ', bigToken: 'セーブルン', color: '#1f1a17', line: '#000000', rate: 0.02, desc: 'アフリカ東部から南部の木のまばらな林にすむ大型のアンテロープ、セーブルアンテロープ。オスはつやのある黒い体に白いおなかと顔の白いもようをもち、メスは茶色っぽい。うしろへ弓なりに曲がった長いツノが目じるしで、ライオンにおそわれてもツノで立ち向かうことがある。' },
  { id: 'impala', name: 'インパラン', egg: 'サバンナのたかとびタマゴ', token: 'インパラ', bigToken: 'インパラン', color: '#b8763e', line: '#4a2c12', rate: 0.02, desc: 'アフリカ東部と南部のサバンナにすむアンテロープのなかま、インパラ。つやのある赤茶色の体で、おしりに黒いすじがある。おどろくと、高さ3メートルほども大きくジャンプしながらにげ、むれがいっせいにはねるようすはとても目立つ。オスは竪琴のような形の長いツノをもつ。' },
  { id: 'bushbuck', name: 'ブッシュバックン', egg: 'やぶかげのてんてんタマゴ', token: 'ブッシュバック', bigToken: 'ブッシュバックン', color: '#7c4a1e', line: '#2f1a08', rate: 0.02, desc: 'アフリカの森のはしや川ぞいのしげみにすむアンテロープのなかま、ブッシュバック。赤茶色の体に、白い点々やうすいすじのもようがある。ふだんは一頭ですごし、しげみの中にかくれて、おもに夜明けや夕方に葉や芽を食べる。オスはまっすぐに近い短いツノをもつ。' },
  { id: 'kob', name: 'コブン', egg: 'なわばりのおどりタマゴ', token: 'コブ', bigToken: 'コブン', color: '#c2793a', line: '#4a2a10', rate: 0.02, desc: 'アフリカ中部の川の近くの草原にすむアンテロープのなかま、コブ。明るい赤茶色の体に、のどや目のまわりの白いもようがある。オスはたてごとのように曲がったツノをもち、小さななわばりを守って、そこでメスに自分を見せる。水べからあまり遠くはなれずにくらす。' },
  { id: 'topi', name: 'トピン', egg: 'シロアリづかのみはりタマゴ', token: 'トピ', bigToken: 'トピン', color: '#9a3412', line: '#431407', rate: 0.02, desc: 'アフリカ東部の草原にすむアンテロープのなかま、トピ。つやのある赤茶色の体に、肩や足のむらさきがかった黒いもようが目立つ。シロアリの塚の上に立って、まわりに敵がいないかを見はることがよくある。すずしい時間に草を食べ、走るのもとても速い。' },
  { id: 'bontebok', name: 'ボンテボクン', egg: 'みなみのしろがおタマゴ', token: 'ボンテボック', bigToken: 'ボンテボクン', color: '#6b2e1f', line: '#2a120c', rate: 0.02, desc: '南アフリカの南西部の草原にすむアンテロープのなかま、ボンテボック。むらさきがかったこげ茶色のつやのある体に、顔の白いすじとおしりの白いもようが目立つ。かりすぎで一時はとても少なくなったが、保護されて数がふえた。走るのは速いが、ジャンプはあまりとくいではない。' },
  { id: 'hartebeest', name: 'ハーテビーストン', egg: 'そうげんのながかおタマゴ', token: 'ハーテビースト', bigToken: 'ハーテビーストン', color: '#b45309', line: '#451a03', rate: 0.02, desc: 'アフリカの草原にすむアンテロープのなかま、ハーテビースト。細長い顔と、肩が高く腰が低い体つきが特ちょうで、オスもメスも曲がったツノをもつ。持久力があり、長い距離を速く走りつづけられる。シロアリの塚の上に立って、まわりを見はることもある。' },
  { id: 'blackbuck', name: 'ブラックバックン', egg: 'インドのらせんづのタマゴ', token: 'ブラックバック', bigToken: 'ブラックバックン', color: '#292524', line: '#0c0a09', rate: 0.02, desc: 'インドやネパールの草原にすむアンテロープのなかま、ブラックバック。オスはこげ茶から黒っぽい背中に白いおなかと目のまわりの白いわを持ち、らせん形にねじれた長いツノがある。メスは明るい茶色でツノがない。とても足が速く、高くはねながら走ることもある。' },
  { id: 'chamois', name: 'シャモアン', egg: 'アルプスのがけっぷちタマゴ', token: 'シャモア', bigToken: 'シャモアン', color: '#57534e', line: '#1c1917', rate: 0.02, desc: 'ヨーロッパのアルプスなどの高い山にすむ、ヤギに近いなかまのシャモア。先がうしろへかぎのように曲がった短いツノと、顔の白黒のもようが目じるし。ひづめのうらのやわらかい部分で岩をしっかりとらえ、けわしいがけも身軽にかけ上がる。夏は茶色、冬は黒っぽい毛になる。' },
  { id: 'steenbok', name: 'スティーンボクン', egg: 'そうげんのおおみみタマゴ', token: 'スティーンボック', bigToken: 'スティーンボクン', color: '#c2410c', line: '#431407', rate: 0.02, desc: 'アフリカ東部と南部の草原にすむ小さなアンテロープのなかま、スティーンボック。明るい赤茶色の体に、内側に線もようのある大きな耳が目立つ。危険を感じると草の中に体をぴったりふせてかくれ、ぎりぎりまで動かない。ほとんど水を飲まず、草や葉から水分をとる。' },
  { id: 'duiker', name: 'ダイカーン', egg: 'しげみのもぐりタマゴ', token: 'ダイカー', bigToken: 'ダイカーン', color: '#92400e', line: '#3b1a05', rate: 0.02, desc: 'アフリカの森や草原にすむ小さなアンテロープのなかま、ダイカー。名前はアフリカの言葉で「もぐる者」という意味で、危険を感じるとしげみの中へさっともぐりこんでかくれる。せなかが丸く、短いツノをもつ。草や木の葉のほか、落ちた果物もよく食べる。' },
  { id: 'sitatunga', name: 'シタツンガン', egg: 'ぬまちのながあしタマゴ', token: 'シタツンガ', bigToken: 'シタツンガン', color: '#6b4f2a', line: '#2a1d0f', rate: 0.02, desc: 'アフリカ中部の沼地にすむアンテロープのなかま、シタツンガ。細長いひづめが大きく開くので、やわらかいぬかるみの上でもしずまずに歩ける。泳ぎがとくいで、敵がくると水にもぐり、鼻先だけを出してかくれることもある。オスはねじれたツノをもつ。' },
  { id: 'klipspringer', name: 'クリップスプリンガン', egg: 'いわやまのつまさきタマゴ', token: 'クリップスプリンガー', bigToken: 'クリップスプリンガン', color: '#a16207', line: '#3f2a0a', rate: 0.02, desc: 'アフリカ東部から南部の岩山にすむ小さなアンテロープのなかま、クリップスプリンガー。かたいひづめの先だけで、つまさき立ちのように岩の上に立つ。ごわごわした毛が体を守り、岩から岩へ身軽にとびうつる。オスとメスがペアでなわばりを見はることが多い。' },
  { id: 'addax', name: 'アダックスン', egg: 'さばくのうずまきタマゴ', token: 'アダックス', bigToken: 'アダックスン', color: '#c9b79c', line: '#4a3b2a', rate: 0.02, desc: 'サハラ砂漠のおくにすむアンテロープのなかま、アダックス。白っぽい体に、らせん形にねじれた長いツノと、おでこの茶色いまき毛が目じるし。食べる草から水分をとるので、ほとんど水を飲まずにくらせる。はばの広いひづめで、やわらかい砂の上もしずまずに歩く。' },
  { id: 'nyala', name: 'ニアラン', egg: 'もりのしまもようタマゴ', token: 'ニアラ', bigToken: 'ニアラン', color: '#5b4a3d', line: '#211913', rate: 0.02, desc: 'アフリカ南東部の川ぞいの林にすむアンテロープのなかま、ニアラ。オスはこい灰色の体に長い毛のたてがみと、ねじれたツノをもち、メスは明るい赤茶色で体にくっきりした白いすじがある。オスとメスで見た目がとてもちがうのが特ちょう。夜明けや夕方にそっと水を飲みにあらわれる。' },
  { id: 'bongo', name: 'ボンゴン', egg: 'しまもようのもりタマゴ', token: 'ボンゴ', bigToken: 'ボンゴン', color: '#a2441c', line: '#3d1708', rate: 0.02, desc: 'アフリカ中部や東部の深い森にすむ大きなアンテロープのなかま、ボンゴ。あざやかな赤茶色の体に、白いたてじまが10本ほど入っているのが目印。オスにもメスにもゆるくねじれたツノがある。とても用心深く、大きな耳で音を聞きわけ、森の奥や竹やぶにひっそりとくらす。' },
  { id: 'springbok', name: 'スプリングボクン', egg: 'ぴょんぴょんタマゴ', token: 'スプリングボック', bigToken: 'スプリングボクン', color: '#c08a4e', line: '#3e2810', rate: 0.02, desc: 'アフリカ南部のかわいた草原にすむアンテロープのなかま、スプリングボック。茶色の背中と白いおなかのあいだに、こい茶色の帯が入っているのが目印。足をそろえたまま、せなかを丸めて何度も高くとびはねる「プロンキング」という動きで知られ、2メートル以上の高さまで上がることもある。' },
  { id: 'kudu', name: 'クーズーン', egg: 'らせんのツノタマゴ', token: 'クーズー', bigToken: 'クーズーン', color: '#9c8466', line: '#3a2e20', rate: 0.02, desc: 'アフリカ東部や南部の林にすむ大きなアンテロープのなかま、グレータークーズー。オスには、ねじれたらせん形の長いツノがあり、1メートルをこえることもある。体の横に何本も入った白いすじと、大きな耳が目印。とても用心深く、しげみにかくれるのがうまい。' },
  { id: 'dikdik', name: 'ディクディクン', egg: 'ちいさなアンテロープタマゴ', token: 'ディクディク', bigToken: 'ディクディクン', color: '#b08354', line: '#4a3018', rate: 0.02, desc: 'アフリカ東部や南西部のかわいた林にすむ、とても小さなアンテロープのなかま、ディクディク。体の高さは40センチほどで、大きな目と、少しのびた鼻先が目印。オスとメスの夫婦でなわばりをもってくらす。危険を感じると、ジグザグに走ってにげ、そのときの鳴き声が名前の由来といわれる。' },
  { id: 'weka', name: 'ウェカン', egg: 'こうきしんタマゴ', token: 'ウェカ', bigToken: 'ウェカン', color: '#8a6a45', line: '#33240f', rate: 0.02, desc: 'ニュージーランドにだけすむ、とべない鳥、ウェカ（ニュージーランドクイナ）。茶色いまだらもようの体と、じょうぶな足とくちばしが目印。とても好奇心が強く、人のキャンプ場にやって来て、ぴかぴか光る小物をくわえて持ち去ってしまうことがあるといわれる。' },
  { id: 'sunbird', name: 'タイヨウチョウン', egg: 'みつすいタマゴ', token: 'タイヨウチョウ', bigToken: 'タイヨウチョウン', color: '#0e7490', line: '#082f49', rate: 0.02, desc: 'アフリカやアジアのあたたかい地域にすむ小さな鳥、タイヨウチョウ。オスは金属のように光る緑や青、むらさきの羽が目印。細く曲がったくちばしと長い舌で花のみつをすう。ハチドリに似ているが、ふつうは空中でとまらず、枝にとまってみつをすうことが多い。' },
  { id: 'emu', name: 'エミューン', egg: 'おおきなあしあとタマゴ', token: 'エミュー', bigToken: 'エミューン', color: '#6b5a48', line: '#2a2018', rate: 0.02, desc: 'オーストラリアの草原や林にすむ、とべない大きな鳥、エミュー。背の高さは人間の大人ほどもあり、ダチョウについで世界で2番目に背の高い鳥。長くじょうぶな足で、時速50キロメートルほどで走れるといわれる。卵はこい緑色で、オスが卵をあたため、ひなを育てる。' },
  { id: 'weaver', name: 'ハタオリドリン', egg: 'あみあみタマゴ', token: 'ハタオリドリ', bigToken: 'ハタオリドリン', color: '#facc15', line: '#713f12', rate: 0.02, desc: 'アフリカのサバンナなどにすむ小鳥、ハタオリドリ（メンガタハタオリ）。オスはあざやかな黄色の体と黒い顔が目印。くちばしと足を使って細長い草の葉を結んだり通したりして、木の枝からぶらさがる丸い巣を器用にあみ上げる。気に入ってもらえないと、巣をこわしてまた作りなおすこともある。' },
  { id: 'roadrunner', name: 'ミチバシリン', egg: 'あれのはしりタマゴ', token: 'ミチバシリ', bigToken: 'ミチバシリン', color: '#a68a64', line: '#3b2d1c', rate: 0.02, desc: 'アメリカ南西部やメキシコのかわいた土地にすむカッコウのなかまの鳥、オオミチバシリ。とぶこともできるが、ほとんど地面を走ってくらし、時速30キロメートルほどで走れるといわれる。長いしっぽでバランスをとり、トカゲや虫、ときには小さなヘビもつかまえて食べる。' },
  { id: 'quetzal', name: 'ケツァールン', egg: 'くものもりのはねタマゴ', token: 'ケツァール', bigToken: 'ケツァールン', color: '#059669', line: '#064e3b', rate: 0.02, desc: '中米の山の、霧がかかる森にすむ鳥、カザリキヌバネドリ（ケツァール）。オスはエメラルドのように光る緑の羽と赤いおなか、体より長くのびる尾のかざり羽が目印。古くから美しい鳥として大切にされ、グアテマラでは国の鳥にもなっている。野生のアボカドのなかまの実が好物。' },
  { id: 'bowerbird', name: 'ニワシドリン', egg: 'あおいかざりタマゴ', token: 'ニワシドリ', bigToken: 'ニワシドリン', color: '#1e2a5a', line: '#0a0f24', rate: 0.02, desc: 'オーストラリアの森にすむ鳥、アオアズマヤドリ（ニワシドリのなかま）。オスは青むらさき色に光る羽と、むらさき色の目が目印。小枝を組んで「あずまや」とよばれる通り道をつくり、そのまわりに青い花や実、羽などを集めてならべ、メスをさそう。' },
  { id: 'saki', name: 'サキン', egg: 'ふさふさがおタマゴ', token: 'サキ', bigToken: 'サキン', color: '#2a2622', line: '#0b0a09', rate: 0.02, desc: '南米の熱帯の森にすむサルのなかま、シロガオサキ。オスは黒い体に、お面をかぶったような白っぽい顔が目印で、メスは茶色っぽい。ふさふさの長いしっぽをもつが、枝にまきつけることはできない。木の上で暮らし、かたい皮の果物や種を強い歯でわって食べる。' },
  { id: 'indri', name: 'インドリン', egg: 'もりのうたごえタマゴ', token: 'インドリ', bigToken: 'インドリン', color: '#f1ede4', line: '#1f1d1a', rate: 0.02, desc: 'アフリカのマダガスカル島の森にだけすむキツネザルのなかま、インドリ。白と黒のもようの体と、丸い耳が目印で、キツネザルのなかまではいちばん大きい。しっぽはとても短い。家族で歌うように長く高い声を出し、その声は森の遠くまでひびく。木から木へ、後ろ足で力強くジャンプする。' },
  { id: 'langur', name: 'ラングールン', egg: 'はっぱたべタマゴ', token: 'ラングール', bigToken: 'ラングールン', color: '#c9c3b6', line: '#26221d', rate: 0.02, desc: 'インドやネパールなど南アジアにすむサルのなかま、ハヌマンラングール。灰色の体と黒い顔と手足、体より長いしっぽが目印。主に木の葉を食べ、葉を消化するための特別な胃をもっている。インドでは古い物語の神さまと結びつけられ、寺のまわりでくらすむれもいる。' },
  { id: 'titi', name: 'ティティン', egg: 'なかよしタマゴ', token: 'ティティ', bigToken: 'ティティン', color: '#a0704a', line: '#3e2614', rate: 0.02, desc: '南米アマゾンの森にすむ小さなサルのなかま、ティティ。ふわふわの毛と長いしっぽが目印。オスとメスの夫婦が長くいっしょにくらし、枝にならんですわるとき、たがいのしっぽをくるくるとからめ合うことで知られる。朝には夫婦で声を合わせて歌い、なわばりを知らせる。' },
  { id: 'capuchin', name: 'オマキザルン', egg: 'どうぐつかいタマゴ', token: 'オマキザル', bigToken: 'オマキザルン', color: '#7a5230', line: '#2b1a0c', rate: 0.02, desc: '中南米の森にすむサルのなかま、オマキザル。頭の上の黒っぽい毛と、枝にまきつけられるしっぽが目印。とてもかしこく、一部のなかまは石を道具にして、かたい木の実を台の上でたたきわって食べることが知られている。むれでくらし、親のやり方を見て道具の使い方をおぼえる。' },
  { id: 'uakari', name: 'ウアカリン', egg: 'あかがおタマゴ', token: 'ウアカリ', bigToken: 'ウアカリン', color: '#e2c9a6', line: '#7f1d1d', rate: 0.02, desc: '南米アマゾンの、雨の季節に水びたしになる森にすむサルのなかま、ウアカリ（アカウアカリ）。毛のない真っ赤な顔と、長い毛の体、とても短いしっぽが目印。顔の赤さは健康のしるしと考えられている。木の上でくらし、かたい木の実を強いあごでわって食べる。' },
  { id: 'gibbon', name: 'テナガザルン', egg: 'うたうえだわたりタマゴ', token: 'テナガザル', bigToken: 'テナガザルン', color: '#3f3a36', line: '#151210', rate: 0.02, desc: '東南アジアの熱帯の森にすむ類人猿のなかま、テナガザル。体よりずっと長いうでを使い、枝から枝へふりこのようにぶらさがって、すばやく森の中を移動する。家族で決まったなわばりをもち、朝になるとオスとメスがいっしょに大きな声で歌い合うことで知られる。' },
  { id: 'squirrelmonkey', name: 'リスザルン', egg: 'もりのちびザルタマゴ', token: 'リスザル', bigToken: 'リスザルン', color: '#e0a43a', line: '#5a3a0e', rate: 0.02, desc: '南米の熱帯の森にすむ小さなサルのなかま、リスザル。黄色っぽい手足と、白い顔に黒い口元のもようが目印。体重は1キログラムほどで、数十ぴきから時には100ぴき近くの大きなむれでくらす。木から木へすばやくとびうつり、果物や虫を食べる。' },
  { id: 'howler', name: 'ホエザルン', egg: 'もりのおおごえタマゴ', token: 'ホエザル', bigToken: 'ホエザルン', color: '#4a2c17', line: '#1c0f06', rate: 0.02, desc: '中南米の熱帯の森にすむサルのなかま、ホエザル。のどの骨が大きくふくらんでいて、朝や夕方に出す声は数キロメートル先まで届くといわれ、陸の動物の中でも特に大きな声の持ち主。長いしっぽを枝にまきつけて体をささえ、主に木の葉を食べてのんびりくらす。' },
  { id: 'gerbil', name: 'スナネズン', egg: 'さばくのあなほりタマゴ', token: 'スナネズミ', bigToken: 'スナネズン', color: '#d6a96b', line: '#6b4a1f', rate: 0.02, desc: 'モンゴルや中国北部のかわいた草原にすむネズミのなかま、スナネズミ（モンゴルスナネズミ）。毛の生えた長いしっぽと、ジャンプの得意な後ろ足が目印。家族で地面の下に何本ものトンネルをほってくらす。きけんを感じると、後ろ足で地面をトントンたたいて仲間に知らせる。' },
  { id: 'mountainhare', name: 'ユキウサギン', egg: 'ゆきいろタマゴ', token: 'ユキウサギ', bigToken: 'ユキウサギン', color: '#f8fafc', line: '#64748b', rate: 0.02, desc: '北海道やヨーロッパ北部、シベリアなどの寒い土地にすむノウサギのなかま、ユキウサギ。夏は茶色い毛だが、冬になると耳の先だけを黒く残して真っ白な毛に生えかわり、雪の中で見つかりにくくなる。大きな後ろ足は雪の上でしずみにくく、かんじきのように役立つ。' },
  { id: 'dormouse', name: 'ヤマネン', egg: 'ふゆごもりタマゴ', token: 'ヤマネ', bigToken: 'ヤマネン', color: '#c9a36b', line: '#5a3d1a', rate: 0.02, desc: '日本の山の森にすむ小さなネズミのなかま、ニホンヤマネ。体は手のひらにのるほど小さく、背中に1本の黒いすじがあるのが目印。夜に木の上を動きまわり、花のみつや虫や木の実を食べる。冬は木のうろや落ち葉の下でボールのように丸くなって、半年近く冬眠する。国の天然記念物。' },
  { id: 'paca', name: 'パカラン', egg: 'もようのみずべタマゴ', token: 'パカ', bigToken: 'パカラン', color: '#7c4a21', line: '#2e1a0a', rate: 0.02, desc: '中南米の熱帯の森の川の近くにすむ大きなネズミのなかま、パカ。茶色の体の横に、白い点のもようが何列もならんでいるのが目印。夜に落ちた果物や木の実をさがして食べる。泳ぎがとてもうまく、あぶないときは水にとびこんでにげる。' },
  { id: 'marmot', name: 'マーモン', egg: 'ねぼすけタマゴ', token: 'マーモット', bigToken: 'マーモン', color: '#8b6b47', line: '#3b2a17', rate: 0.02, desc: 'ヨーロッパのアルプスの高い草原にすむリスのなかま、アルプスマーモット。ずんぐりした体と短いしっぽが目印。家族でくらし、地面の下に長い巣あなをほる。ワシやキツネが近づくと、見はり役が高い口笛のような声で仲間に知らせる。冬は半年近く巣あなで冬眠する。' },
  { id: 'mongoose', name: 'マングーン', egg: 'すばやいヘビよけタマゴ', token: 'マングース', bigToken: 'マングーン', color: '#9c8b74', line: '#3f3527', rate: 0.02, desc: '南アジアの草原や畑のまわりにすむ、インドマングース。灰色がかった茶色の細長い体と、ふさふさのしっぽが目印。とても動きがすばやく、毒ヘビにおそわれても身をかわして立ち向かうことで知られる。毛を逆立てて体を大きく見せ、相手をおどろかせることもある。' },
  { id: 'olinguito', name: 'オリンギン', egg: 'くものもりタマゴ', token: 'オリンギート', bigToken: 'オリンギン', color: '#b5672e', line: '#4a2510', rate: 0.02, desc: '南米のアンデス山脈の、霧がかかる「雲霧林」にすむアライグマのなかま、オリンギート。オレンジがかった茶色のふわふわの毛と、丸い顔が目印。夜に木の上で果物を食べてくらす。長いあいだ別の動物とまちがえられていて、新しい種として発表されたのは2013年のこと。' },
  { id: 'ibex', name: 'アイベクスン', egg: 'がけのぼりタマゴ', token: 'アイベクス', bigToken: 'アイベクスン', color: '#a8865c', line: '#4a3620', rate: 0.02, desc: 'ヨーロッパのアルプスの高い山にすむヤギのなかま、アルプスアイベックス。オスには、ふしのある大きく弓なりのツノがある。けわしいがけを、ひづめで小さな出っぱりをつかみながら平気でのぼりおりする。ダムのほぼまっすぐなかべをのぼって、塩をなめることもあるといわれる。' },
  { id: 'pudu', name: 'プードン', egg: 'ちびシカタマゴ', token: 'プーズ', bigToken: 'プードン', color: '#9a6b45', line: '#3d2817', rate: 0.02, desc: '南米チリやアルゼンチンの森にすむ、世界でいちばん小さいシカのなかま、プーズー。体の高さはおよそ40センチで、ずんぐりした体と短い足が目印。オスには小さなとがったツノがある。シダや竹のしげみにかくれてくらし、あぶないときはジグザグに走ってにげる。' },
  { id: 'oryx', name: 'オリクスン', egg: 'さばくのツノタマゴ', token: 'オリクス', bigToken: 'オリクスン', color: '#efe6d8', line: '#5b4636', rate: 0.02, desc: 'アラビア半島の砂ばくにすむウシのなかま、アラビアオリックス。白い体と、まっすぐにのびた長い2本のツノが目印。何週間も水を飲まずに、植物の水分や朝つゆでくらせるといわれる。一度は野生で姿を消したが、人の手で育てられ、ふたたび砂ばくにもどされた。' },
  { id: 'tayra', name: 'タイラン', egg: 'もりのすばしこタマゴ', token: 'タイラ', bigToken: 'タイラン', color: '#2b2118', line: '#0d0906', rate: 0.02, desc: '中南米の熱帯の森にすむイタチのなかま、タイラ。こげ茶色の長い体と、のどの黄色いもようが目印。木登りがとてもうまく、枝から枝へすばやくかけまわる。果物や小さな動物を食べ、まだ熟していない果物をかくしておき、熟してから食べにもどることがあるといわれる。' },
  { id: 'hutia', name: 'フチアン', egg: 'カリブのしまタマゴ', token: 'フチア', bigToken: 'フチアン', color: '#6b5a44', line: '#1f1810', rate: 0.02, desc: 'カリブ海のキューバなどの島にすむネズミのなかま、フチア。大きいものは体重が7キロほどになり、がっしりした体とするどいつめで木に登る。キューバの森やマングローブで、葉や果物や木の皮を食べる。島ごとにちがう種類がいて、なかには絶滅のおそれがあるものもいる。' },
  { id: 'springhare', name: 'トビウサギン', egg: 'サバンナのとびあしタマゴ', token: 'トビウサギ', bigToken: 'トビウサギン', color: '#c49a62', line: '#2a1d0c', rate: 0.02, desc: 'アフリカ南部や東部のかわいた草原にすむネズミのなかま、トビウサギ。名前にウサギとつくが、ウサギのなかまではない。長い後ろ足でカンガルーのようにはね、一度に2メートル以上とぶこともある。昼は巣あなでねむり、夜に草や根を食べに出てくる。ライトを当てると目が光る。' },
  { id: 'pacarana', name: 'パカラナン', egg: 'アンデスのまぼろしタマゴ', token: 'パカラナ', bigToken: 'パカラナン', color: '#5c4630', line: '#1c140b', rate: 0.02, desc: '南アメリカのアンデス山脈のふもとの森にすむ大きなネズミのなかま、パカラナ。黒っぽい毛に白いはん点のならぶもようがあり、体重は10キロをこえることもある。動きがとてもゆっくりで、のっしのっしと歩く。めったに姿を見せないため、くわしいくらしはまだよくわかっていない。' },
  { id: 'agouti', name: 'アグーチン', egg: 'ジャングルのたねまきタマゴ', token: 'アグーチ', bigToken: 'アグーチン', color: '#a0703a', line: '#2a1a0a', rate: 0.02, desc: '中南米の熱帯の森にすむネズミのなかま、アグーチ。とても強い歯をもち、ブラジルナッツのようなかたい実のからもかじって開けられる。食べきれない実を地面にうめてたくわえ、わすれたものから芽が出て、森の木がふえる手助けをしている。' },
  { id: 'degu', name: 'デグーン', egg: 'チリのおしゃべりタマゴ', token: 'デグー', bigToken: 'デグーン', color: '#9a7b52', line: '#251a0e', rate: 0.02, desc: '南アメリカのチリの乾いた丘にすむネズミのなかま、デグー。群れでくらし、20種類以上の鳴き声を使い分けてなかまと話すといわれる。昼に活動し、草や木の皮や種を食べる。しっぽの先にふさふさの毛があり、体をきれいに保つために砂あびをする。' },
  { id: 'mara', name: 'マーラン', egg: 'パタゴニアのはやあしタマゴ', token: 'パタゴニアマーラ', bigToken: 'マーラン', color: '#a8865f', line: '#2a1f12', rate: 0.02, desc: 'アルゼンチンの草原パンパスやパタゴニアにすむ大きなネズミのなかま、マーラ。長い足と耳をもち、ウサギやシカのような姿で、時速40キロ以上で走ることができる。一度つがいになると一生いっしょにくらすといわれる。子どもたちは共同の巣あなでまとめて育てられる。' },
  { id: 'viscacha', name: 'ビスカーチャン', egg: 'アンデスのいわばタマゴ', token: 'ビスカーチャ', bigToken: 'ビスカーチャン', color: '#b6aa98', line: '#2a241c', rate: 0.02, desc: '南アメリカのアンデス山脈の岩場にすむチンチラのなかま、ヤマビスカーチャ。ウサギのような長い耳と、くるりと巻いたふさふさのしっぽをもつ。朝や夕方に岩の上で日光浴をし、岩から岩へ身軽にとびうつる。高い山の草やこけを食べて、群れでくらす。' },
  { id: 'kagu', name: 'カグーン', egg: 'ニューカレドニアのはいいろタマゴ', token: 'カグー', bigToken: 'カグーン', color: '#d6d3d1', line: '#292524', rate: 0.02, desc: '南太平洋のニューカレドニア島だけにすむ鳥、カグー。全身がうすい灰色で、頭にかんむりのような長い羽がある。ほとんど飛べないが、森の地面をすばやく走って虫やミミズをつかまえる。朝には子犬がほえるような声で鳴く。島の国の鳥として大切にされている。' },
  { id: 'angwantibo', name: 'アンワンティボン', egg: 'カメルーンのそろりタマゴ', token: 'アンワンティボ', bigToken: 'アンワンティボン', color: '#c9a25a', line: '#2a1f0c', rate: 0.02, desc: 'アフリカ中西部の熱帯の森にすむ小さなサルのなかま、アンワンティボ（ゴールデンポットー）。金色がかった毛と大きな目をもち、夜に低い木の枝の上をゆっくりと動く。毛虫などの虫を好んで食べる。おどろくと体を丸め、頭を前足の間にかくして身を守る。' },
  { id: 'sunbittern', name: 'ジャノメドリン', egg: 'かわべのはねもようタマゴ', token: 'ジャノメドリ', bigToken: 'ジャノメドリン', color: '#8a7357', line: '#231a10', rate: 0.02, desc: '中南米の熱帯の森の川べりにすむ鳥、ジャノメドリ。ふだんは地味な茶色だが、つばさを広げると夕日のようなオレンジ色の大きな目玉もようが現れ、敵をおどろかせる。浅い水の中をそっと歩き、くちばしで魚や虫をすばやくつかまえる。' },
  { id: 'ringtail', name: 'カコミスルン', egg: 'こうやのしましっぽタマゴ', token: 'カコミスル', bigToken: 'カコミスルン', color: '#b59a74', line: '#2a2014', rate: 0.02, desc: '北アメリカ西部やメキシコのかわいた岩場にすむアライグマのなかま、カコミスル（リングテイル）。体と同じくらい長いしっぽに、白黒のわっかもようが十数本ある。後ろ足の足首を回せるので、岩のすきまやがけをすいすい上り下りできる。夜に活動し、虫やネズミや木の実を食べる。' },
  { id: 'zorilla', name: 'ゾリラン', egg: 'さばくのしましまタマゴ', token: 'ゾリラ', bigToken: 'ゾリラン', color: '#1c1917', line: '#0a0908', rate: 0.02, desc: 'アフリカのかわいた草原にすむイタチのなかま、ゾリラ。黒い体に白いしまもようがあり、スカンクによく似ている。おそわれると、おしりからとてもくさいにおいの液を出して身を守る。夜に活動し、虫やネズミなどを食べる。' },
  { id: 'potto', name: 'ポットン', egg: 'アフリカのしずかタマゴ', token: 'ポットー', bigToken: 'ポットン', color: '#8a6a4a', line: '#241a10', rate: 0.02, desc: 'アフリカ中部や西部の熱帯の森にすむサルのなかま、ポットー。夜に木の上をとてもゆっくり、しずかに動き、虫や果物や木のやにを食べる。手足の力がとても強く、枝をにぎったらなかなかはなさない。首の後ろには骨がとび出た部分があり、身を守るのに使うといわれる。' },
  { id: 'olingo', name: 'オリンゴン', egg: 'くものもりのよるタマゴ', token: 'オリンゴ', bigToken: 'オリンゴン', color: '#b07a45', line: '#2a1a0c', rate: 0.02, desc: '南アメリカのアンデス山脈の雲霧林にすむアライグマのなかま、オリンギート（オリンゴのなかま）。2013年に新しい種として発表されたばかり。ふわふわの毛と大きな目をもち、夜に木の上をとびうつって果物を食べる。昼は葉のしげみでねむっている。' },
  { id: 'possum', name: 'フクロギツネン', egg: 'ユーカリのふくろタマゴ', token: 'フクロギツネ', bigToken: 'フクロギツネン', color: '#8e8a86', line: '#22201e', rate: 0.02, desc: 'オーストラリアやニュージーランドにすむ有袋類のなかま、フクロギツネ（ブラシテイルポッサム）。ふさふさの太いしっぽと大きな耳をもち、夜になると木の上で葉や花や果物を食べる。人の住む町にもよく現れ、屋根うらにすみつくこともある。子どもはおなかの袋で育ち、そのあと親の背中に乗って移動する。' },
  { id: 'cuscus', name: 'クスクスン', egg: 'しまじまのまるめタマゴ', token: 'クスクス', bigToken: 'クスクスン', color: '#e9e2d0', line: '#2b2418', rate: 0.02, desc: 'ニューギニアやオーストラリア北部の熱帯の森にすむ、カンガルーと同じ有袋類のなかまクスクス。まるい顔と大きな目をもち、長いしっぽを枝にまきつけて体を支える。動きはゆっくりで、夜になると木の上で葉や果物を食べる。おなかの袋で子どもを育てる。' },
  { id: 'tuatara', name: 'ムカシトカン', egg: 'ニュージーランドのいにしえタマゴ', token: 'ムカシトカゲ', bigToken: 'ムカシトカン', color: '#6b7a4a', line: '#1a2010', rate: 0.02, desc: 'ニュージーランドの島々だけにすむ、トカゲに似た爬虫類ムカシトカゲ（トゥアタラ）。恐竜の時代から姿をあまり変えずに生きのびてきたなかまで「生きた化石」とよばれる。子どものころは頭のてっぺんに「第三の目」とよばれる光を感じる部分が見える。寒さに強く、100年近く生きることもある。' },
  { id: 'cassowary', name: 'ヒクイドラン', egg: 'ねったいりんのあおくびタマゴ', token: 'ヒクイドリ', bigToken: 'ヒクイドラン', color: '#1f2937', line: '#0b0f14', rate: 0.02, desc: 'オーストラリア北部やニューギニアの熱帯の森にすむ、飛べない大きな鳥ヒクイドリ。頭にかぶとのような「とさか」があり、首はあざやかな青と赤。足が強く、森の中を時速50キロ近くで走れる。果物を丸のみして種をふんで運び、森を育てる役目もしている。' },
  { id: 'tamarin', name: 'タマリーン', egg: 'ジャングルのひげタマゴ', token: 'タマリン', bigToken: 'タマリーン', color: '#3a2c22', line: '#120c08', rate: 0.02, desc: '南アメリカの熱帯の森にすむ小さなサルのなかま、タマリン。白く長い口ひげのように見える毛をもつ種類（エンペラータマリン）もいる。体重は数百グラムほどで、枝から枝へすばやくかけまわり、果物や虫を食べる。家族の群れで子育てを手伝い合う。' },
  { id: 'genet', name: 'ジェネッタ', egg: 'よるのもりのはんてんタマゴ', token: 'ジェネット', bigToken: 'ジェネッタ', color: '#d8c7a6', line: '#1c140b', rate: 0.02, desc: 'アフリカやヨーロッパ南西部の森や草原にすむジャコウネコのなかま、ジェネット。体には黒いはんてん、長いしっぽにはしまもようがある。体がやわらかく、せまいすきまもするりと通りぬける。夜に木の上をしなやかに動き、虫や小さな動物をとらえる。' },
  { id: 'aardwolf', name: 'アードン', egg: 'サバンナのシロアリタマゴ', token: 'アードウルフ', bigToken: 'アードン', color: '#d6b57a', line: '#2b1f0e', rate: 0.02, desc: 'アフリカの草原にすむハイエナのなかま、アードウルフ。ハイエナににているが、おもにシロアリを食べ、長くねばねばした舌で一晩に何万びきもなめとる。おどろくと背中のたてがみを立てて体を大きく見せる。昼は巣あなでねむり、夜に活動する。' },
  { id: 'saola', name: 'サオラン', egg: 'ベトナムのかくれタマゴ', token: 'サオラ', bigToken: 'サオラン', color: '#7a4e2d', line: '#1f130a', rate: 0.02, desc: 'ベトナムとラオスの山の森にすむウシのなかま、サオラ。1992年に見つかったばかりで、まっすぐ長い2本のつのと、顔の白いもようが目印。とても数が少なく、野生のすがたはほとんど写真に残っていないため「アジアのユニコーン」ともよばれる。' },
  { id: 'sifaka', name: 'シファカン', egg: 'マダガスカルのおどりタマゴ', token: 'シファカ', bigToken: 'シファカン', color: '#f3efe6', line: '#2b2118', rate: 0.02, desc: 'マダガスカル島の森にすむキツネザルのなかま、シファカ。長い後ろ足で木から木へ大きくとびうつる。地面におりると、両手を上げて横向きにぴょんぴょんとはねて進むので、おどっているように見える。朝は木の上で日光浴をして体をあたためる。' },
  { id: 'jerboa', name: 'ジャービン', egg: 'さばくのとびはねタマゴ', token: 'トビネズミ', bigToken: 'ジャービン', color: '#d9b77e', line: '#3a2a12', rate: 0.02, desc: 'アジアやアフリカの砂漠にすむ小さなネズミのなかま、トビネズミ（ジャーボア）。とても長い後ろ足でカンガルーのようにはねて進み、長いしっぽでバランスをとる。昼の暑さをさけて砂の中の巣ですごし、夜になると種や虫をさがしに出てくる。耳が大きい種類もいる。' },
  { id: 'hyrax', name: 'ハイラックン', egg: 'いわばのひなたタマゴ', token: 'ハイラックス', bigToken: 'ハイラックン', color: '#9c7b5a', line: '#2a1e12', rate: 0.02, desc: 'アフリカや中東の岩場にすむ小さな動物、ハイラックス。見た目はウサギやネズミに似ているが、ゾウやジュゴンに近いなかまだといわれる。体温を保つのが苦手なので、朝は群れで岩の上にならんで日光浴をする。足のうらがしめっていて、すべりやすい岩もしっかりつかめる。' },
  { id: 'fossa', name: 'フォッサン', egg: 'マダガスカルのもりタマゴ', token: 'フォッサ', bigToken: 'フォッサン', color: '#8a5a3b', line: '#24150b', rate: 0.02, desc: 'マダガスカル島だけにすむ、ネコに似た肉食の動物フォッサ。体と同じくらい長いしっぽでバランスをとり、木の上をすばやく走る。足首がよく回るので、頭を下にして木を下りることもできる。島でいちばん大きな肉食の動物で、キツネザルなどをとらえる。' },
  { id: 'dhole', name: 'ドールン', egg: 'もりのかりうどタマゴ', token: 'ドール', bigToken: 'ドールン', color: '#c2552b', line: '#2b0f05', rate: 0.02, desc: 'インドや東南アジアの森にすむイヌのなかま、ドール（アカオオカミ）。赤茶色の毛と黒いふさふさのしっぽをもつ。口笛のような声で合図をしあい、群れで力を合わせて狩りをする。子育ても群れのみんなで手伝う。' },
  { id: 'gharial', name: 'ガビアルン', egg: 'ほそながくちのワニタマゴ', token: 'インドガビアル', bigToken: 'ガビアルン', color: '#6b7f4a', line: '#1c2412', rate: 0.02, desc: 'インドやネパールの大きな川にすむワニのなかま、インドガビアル。とても細長い口に小さな歯がならび、水の中ですばやく横にふって魚をとらえる。おとなのオスは鼻の先にこぶがある。陸を歩くのは苦手で、ほとんどの時間を川ですごす。' },
  { id: 'sunbear', name: 'マレーグマン', egg: 'ねったいりんのクマタマゴ', token: 'マレーグマ', bigToken: 'マレーグマン', color: '#3b2a20', line: '#120b07', rate: 0.02, desc: '東南アジアの熱帯の森にすむ、クマのなかまでいちばん小さいマレーグマ。胸に太陽のようなオレンジ色のもようがある。とても長い舌で、木の穴からハチミツやシロアリをなめとる。長いつめで木に登り、木の上にねどこを作ることもある。' },
  { id: 'takin', name: 'ターキンボ', egg: 'たかやまのウシタマゴ', token: 'ターキン', bigToken: 'ターキンボ', color: '#c9a35a', line: '#2a1d0a', rate: 0.02, desc: 'ヒマラヤ東部や中国の山地にすむウシのなかま、ターキン。がっしりした体と太いつのをもち、けわしい岩場を上り下りする。鼻の中が広く、冷たい空気をあたためてから吸いこむ。夏は群れで高い山へ、冬は低い森へ移動する。' },
  { id: 'amurtiger', name: 'アムールトラン', egg: 'きたのもりのトラタマゴ', token: 'アムールトラ', bigToken: 'アムールトラン', color: '#e89a4a', line: '#1d1207', rate: 0.02, desc: 'ロシアの極東や中国北東部の寒い森にすむトラのなかま、アムールトラ（シベリアトラ）。トラのなかでもっとも大きく、冬には毛が長く厚くなる。広いなわばりをもち、雪の森を何十キロも歩いてシカやイノシシをさがす。数がへったが、守る取り組みで少しずつふえている。' },
  { id: 'bengaltiger', name: 'ベンガルトラン', egg: 'マングローブのトラタマゴ', token: 'ベンガル', bigToken: 'ベンガルトラン', color: '#ea8a2c', line: '#1c1005', rate: 0.02, desc: 'インドやバングラデシュなどの森や草原、マングローブの湿地にすむトラのなかま、ベンガルトラ。オレンジ色の体に黒いしまがあり、しまのもようは一頭ずつちがう。泳ぐのがとても上手で、川をわたって移動することもある。インドの国の動物としても知られる。' },
  { id: 'sumatrantiger', name: 'スマトラトラン', egg: 'ねったいのしまトラタマゴ', token: 'スマトラ', bigToken: 'スマトラトラン', color: '#e07a2b', line: '#1f1206', rate: 0.02, desc: 'インドネシアのスマトラ島の森にすむトラのなかま、スマトラトラ。トラのなかではもっとも小さく、しまもようがこく、細かい。指のあいだに水かきのような皮があり、泳ぐのが得意である。森がへったことで数がとても少なくなり、守るための取り組みが続けられている。' },
  { id: 'arabianleopard', name: 'アラビアヒョウン', egg: 'さばくのやまタマゴ', token: 'アラビア', bigToken: 'アラビアヒョウン', color: '#e2c08a', line: '#3a2610', rate: 0.02, desc: 'アラビア半島のけわしい山や岩場にすむヒョウのなかま、アラビアヒョウ。ヒョウのなかでは小さく、毛の色がうすく、かわいた土地にとけこむ。水の少ない場所で暮らし、岩のあいだをすばやく動く。数がとても少なく、守るための取り組みが続けられている。' },
  { id: 'iberianlynx', name: 'スペインオオヤマネコン', egg: 'イベリアのタマゴ', token: 'スペインリンクス', bigToken: 'スペインオオヤマネコン', color: '#b88d55', line: '#2e1d0b', rate: 0.02, desc: 'スペインとポルトガルにだけすむネコのなかま、スペインオオヤマネコ。耳の先の黒い毛のふさと、ほおのひげのような長い毛が目立つ。主にアナウサギを食べて暮らす。一時は数がとても少なくなったが、人々が力を合わせて守ったことで、少しずつふえてきている。' },
  { id: 'canadalynx', name: 'カナダオオヤマネコン', egg: 'ゆきぐつのタマゴ', token: 'カナダリンクス', bigToken: 'カナダオオヤマネコン', color: '#b8a990', line: '#2c261c', rate: 0.02, desc: 'カナダやアラスカの雪深い森にすむネコのなかま、カナダオオヤマネコ。足がとても大きく、毛でおおわれていて、かんじきのように雪にしずまずに歩ける。主にカンジキウサギを食べて暮らしていて、ウサギの数がふえたりへったりすると、この山猫の数も同じように変わる。' },
  { id: 'amurleopard', name: 'アムールヒョウン', egg: 'ゆきのもりのヒョウタマゴ', token: 'アムール', bigToken: 'アムールヒョウン', color: '#e0b77a', line: '#2e1e0c', rate: 0.02, desc: 'ロシアの極東や中国北東部の雪の多い森にすむヒョウのなかま、アムールヒョウ。寒さにそなえて、冬には毛が長く厚くなり、色もうすくなる。とても数が少ない動物の一つで、大きな梅の花のようなもようが体に広がる。一晩に何十キロも歩くことがある。' },
  { id: 'tsushimacat', name: 'ツシマヤマネコン', egg: 'こっきょうのしまタマゴ', token: 'ツシマ', bigToken: 'ツシマヤマネコン', color: '#9a7d5e', line: '#2b1e11', rate: 0.02, desc: '長崎県の対馬だけにすむネコのなかま、ツシマヤマネコ。大陸にすむベンガルヤマネコのなかまで、ひたいにたてのしまもようがあり、耳の後ろに白い点がある。森や田んぼのまわりでネズミや鳥をとって暮らす。数がとても少なく、島の人々と協力して守られている。' },
  { id: 'iriomotecat', name: 'イリオモテン', egg: 'みなみのしまのタマゴ', token: 'イリオモテ', bigToken: 'イリオモテン', color: '#8e7356', line: '#2a1d10', rate: 0.02, desc: '沖縄県の西表島だけにすむネコのなかま、イリオモテヤマネコ。体は家のネコくらいで、耳の後ろに白い点がある。川や湿地のそばで暮らし、泳ぐのも得意で、カエルやトカゲや鳥など、いろいろな生き物を食べる。数がとても少なく、大切に守られている。' },
  { id: 'puma', name: 'ピューマン', egg: 'やまなみのタマゴ', token: 'ピューマ', bigToken: 'ピューマン', color: '#c49a6c', line: '#3b2614', rate: 0.02, desc: '北アメリカから南アメリカまで、山や森や砂漠に広くすむ大きなネコのなかま、ピューマ（クーガー）。体は黄色がかった茶色で、もようはほとんどない。大きなネコだがほえることはできず、口笛や小鳥のような高い声で鳴く。後ろ足の力が強く、遠くまでとぶことができる。' },
  { id: 'bobcat', name: 'ボブキャットン', egg: 'みじかしっぽのタマゴ', token: 'ボブキャット', bigToken: 'ボブキャットン', color: '#a67c52', line: '#2f1f10', rate: 0.02, desc: '北アメリカの森や砂漠や町はずれにまで広くすむネコのなかま、ボブキャット。名前のとおり、しっぽが短く切りそろえたように見える。耳の先に短い黒い毛があり、ほおの毛がふさふさしている。いろいろな場所に合わせて暮らす、たくましいネコである。' },
  { id: 'serval', name: 'サーバルン', egg: 'サバンナのながあしタマゴ', token: 'サーバル', bigToken: 'サーバルン', color: '#d9a548', line: '#3a2508', rate: 0.02, desc: 'アフリカのサバンナや湿った草原にすむネコのなかま、サーバル。体のわりに足がとても長く、耳も大きい。その耳で草のなかを動く小さな動物の音を聞きとり、高くジャンプして上から前足でおさえこむ。黒い点やしまのもようがある。' },
  { id: 'asiangoldencat', name: 'ゴールデンネコン', egg: 'こがねいろのタマゴ', token: 'ゴールデン', bigToken: 'ゴールデンネコン', color: '#c9963f', line: '#3b2508', rate: 0.02, desc: 'ヒマラヤから東南アジアの森にすむネコのなかま、アジアゴールデンキャット。金色や赤茶色の毛をもつが、灰色や黒っぽいものや、もようのあるものもいて、色のちがいがとても大きい。地面を歩いて狩りをすることが多く、鳥や小さなシカまでつかまえる。' },
  { id: 'cloudedleopard', name: 'ウンピョウン', egg: 'くもがたもようタマゴ', token: 'ウンピョウ', bigToken: 'ウンピョウン', color: '#b59a6e', line: '#2a1f12', rate: 0.02, desc: 'ヒマラヤのふもとから東南アジアの森にすむネコのなかま、ウンピョウ。雲のような形の大きなもようがあり、体の大きさのわりにとても長いきばをもつ。木のぼりがじょうずで、枝にさかさまにぶら下がったり、頭から幹をおりたりできる。' },
  { id: 'flatheadedcat', name: 'マレーヤマネコン', egg: 'みずべのしずくタマゴ', token: 'マレー', bigToken: 'マレーヤマネコン', color: '#7a5b45', line: '#24180f', rate: 0.02, desc: '東南アジアの川や湿地のそばの森にすむ小さなネコのなかま、マレーヤマネコ（ヒラガシラヤマネコ）。頭が平たく、目が顔の前のほうについている。水がとても好きで、水辺で魚やカエルをつかまえる。とても珍しく、その暮らしはまだよくわかっていない。' },
  { id: 'marbledcat', name: 'マーブルネコン', egg: 'もりのマーブルタマゴ', token: 'マーブル', bigToken: 'マーブルネコン', color: '#9c7a55', line: '#2b1d10', rate: 0.02, desc: '東南アジアやヒマラヤのふもとの森にすむネコのなかま、マーブルドキャット。大理石のような大きなまだらもようと、体と同じくらい長いふさふさのしっぽをもつ。ほとんどの時間を木の上ですごし、そのしっぽでバランスをとりながら枝から枝へ移る。' },
  { id: 'pampascat', name: 'パンパスネコン', egg: 'くさのうみのタマゴ', token: 'パンパス', bigToken: 'パンパスネコン', color: '#c2a476', line: '#3a2a14', rate: 0.02, desc: '南アメリカの草原や高い山の草地にすむネコのなかま、パンパスネコ（コロコロ）。家のネコくらいの大きさで、ふさふさの長い毛と、足のしまもようが目立つ。おどろくと背中の毛を逆立てて体を大きく見せる。草のなかを静かに歩き、ネズミや鳥をさがす。' },
  { id: 'junglecat', name: 'ジャングルネコン', egg: 'あしはらのタマゴ', token: 'ジャングル', bigToken: 'ジャングルネコン', color: '#a8916b', line: '#2f2416', rate: 0.02, desc: '西アジアから南アジア、東南アジアの川辺や湿地のアシの原にすむネコのなかま、ジャングルキャット。足が長く、耳の先に短い毛のふさがある。名前とはちがってジャングルよりもアシの茂みを好み、昼にもよく動いて、ネズミや鳥や魚をとる。' },
  { id: 'chinesemountaincat', name: 'ハイイロネコン', egg: 'チベットこうげんタマゴ', token: 'ハイイロ', bigToken: 'ハイイロネコン', color: '#b9a888', line: '#3b3122', rate: 0.02, desc: '中国西部の高原の草地や低木林にすむネコのなかま、ハイイロネコ（ハイイロヤマネコ）。砂のような色の毛と、先が黒い太いしっぽをもつ。昼は岩のすきまや巣穴で休み、夜や明け方になると、耳をすまして地下のナキウサギやネズミをさがす。' },
  { id: 'oncilla', name: 'ジャガーネコン', egg: 'くものもりのタマゴ', token: 'ジャガネコ', bigToken: 'ジャガーネコン', color: '#c79a5a', line: '#33220f', rate: 0.02, desc: '中南米の雲がかかる山の森にすむ小さなネコのなかま、ジャガーネコ（オンシラ）。家のネコほどの大きさだが、ジャガーのような花の形のもようがある。木の上でも地面でも身軽に動き、夜に小さな動物や鳥をさがす。' },
  { id: 'baycat', name: 'ボルネオヤマネコン', egg: 'ねったいうりんのタマゴ', token: 'ボルネオ', bigToken: 'ボルネオヤマネコン', color: '#b45f3a', line: '#3a1a0c', rate: 0.02, desc: '東南アジアのボルネオ島の森だけにすむネコのなかま、ボルネオヤマネコ。赤茶色の毛と長いしっぽをもち、写真にとられたことも少ない、なぞの多いネコである。深い熱帯の森でひっそりと暮らし、その生き方はまだよくわかっていない。' },
  { id: 'andeancat', name: 'アンデスネコン', egg: 'たかねのいわタマゴ', token: 'アンデス', bigToken: 'アンデスネコン', color: '#a8a29e', line: '#292524', rate: 0.02, desc: '南アメリカのアンデス山脈の高い岩場にすむネコのなかま、アンデスネコ。めったに見られないとても珍しいネコで、灰色の毛に茶色のしまがあり、太く長いしっぽをもつ。そのしっぽでバランスをとりながら、けわしい岩の上を身軽に動き、チンチラのなかまをさがす。' },
  { id: 'geoffroycat', name: 'ジョフロイネコン', egg: 'パンパのタマゴ', token: 'ジョフロイ', bigToken: 'ジョフロイネコン', color: '#b8a07a', line: '#2e2414', rate: 0.02, desc: '南アメリカの草原や低木林にすむネコのなかま、ジョフロイネコ。家のネコくらいの大きさで、体じゅうに黒い小さな点がある。後ろ足だけで立ち上がり、しっぽでバランスをとってまわりを見わたすことがある。木のぼりも泳ぎも得意である。' },
  { id: 'kodkod', name: 'コドコドン', egg: 'しめったもりのタマゴ', token: 'コドコド', bigToken: 'コドコドン', color: '#8b6b4a', line: '#2a1c10', rate: 0.02, desc: '南アメリカのチリやアルゼンチンのしめった森にすむ、アメリカ大陸でいちばん小さいネコのなかま、コドコド。体は家のネコよりずっと小さく、茶色の毛に黒い点がちらばる。木のぼりがうまく、竹やぶや森のなかで鳥や小さなネズミをつかまえる。' },
  { id: 'rustyspotted', name: 'サビイロネコン', egg: 'さびいろぼしのタマゴ', token: 'サビイロ', bigToken: 'サビイロネコン', color: '#b98a6a', line: '#3b2416', rate: 0.02, desc: 'インドやスリランカの森にすむ、世界でもっとも小さいネコのなかまの一つ、サビイロネコ。体は家のネコの半分ほどで、灰色がかった毛にさびのような赤茶色の点がならぶ。木のぼりがとても上手で、夜になると小さな動物や虫をさがして動きまわる。' },
  { id: 'blackfootedcat', name: 'クロアシネコン', egg: 'くろいあしあとタマゴ', token: 'クロアシ', bigToken: 'クロアシネコン', color: '#c9a66b', line: '#2b1d0e', rate: 0.02, desc: 'アフリカ南部のかわいた草原にすむ、とても小さなネコのなかま、クロアシネコ。足の裏が黒い毛でおおわれている。体は小さいが、一晩に何キロも歩きまわって獲物をさがし、狩りの成功率がとても高いことで知られる。昼は巣穴やシロアリの塚のあなで休む。' },
  { id: 'jaguarundi', name: 'ジャガランディン', egg: 'ほそながのタマゴ', token: 'ジャガラ', bigToken: 'ジャガランディン', color: '#6b5a4e', line: '#1f1712', rate: 0.02, desc: '中南米の森や草原にすむネコのなかま、ジャガランディ。胴が細長く足が短いので、ネコというよりカワウソやイタチのように見える。ほかの多くの野生のネコとちがって昼間もよく動き、口笛のような声など、いろいろな鳴き声で仲間と話す。' },
  { id: 'sandcat', name: 'スナネコン', egg: 'さばくのよるタマゴ', token: 'スナネコ', bigToken: 'スナネコン', color: '#d6b98c', line: '#4a3415', rate: 0.02, desc: 'アフリカ北部や西アジアの砂漠にすむ小さなネコのなかま、スナネコ。足の裏が長い毛でおおわれていて、熱い砂の上でも歩けるうえ、足あとも残りにくい。大きな耳で砂の下を動く小さな動物の音を聞きわけ、ほとんど水を飲まずにくらせる。' },
  { id: 'fishingcat', name: 'スナドリネコン', egg: 'さかなとりのタマゴ', token: 'スナドリ', bigToken: 'スナドリネコン', color: '#8a8f7a', line: '#283023', rate: 0.02, desc: '南アジアや東南アジアの湿地や川辺にすむネコのなかま、スナドリネコ。水がこわくなく、前足の指のあいだに小さな水かきがある。水辺でじっと待ち、前足ですばやく魚をすくい上げたり、水にもぐってつかまえたりする。' },
  { id: 'ocelot', name: 'オセロッタ', egg: 'ほしかげのタマゴ', token: 'オセロ', bigToken: 'オセロッタ', color: '#d9a35b', line: '#422006', rate: 0.02, desc: '中南米の森や草地にすむネコのなかま、オセロット。体には鎖のようにつながった黒いもようがあり、一頭ずつもようがちがう。昼は木の上や草むらで休み、夜になると地面を静かに歩いて小さな動物をさがす。泳ぐのも得意である。' },
  { id: 'margay', name: 'マーゲイン', egg: '木かげのタマゴ', token: 'マーゲイ', bigToken: 'マーゲイン', color: '#b7793f', line: '#3f2a14', rate: 0.02, desc: '中南米の森にすむ小さなネコのなかま、マーゲイ。後ろ足の足首がくるりと回るので、木の幹を頭から下へかけおりることができる。夜になると枝から枝へと身軽にわたり、木の上で鳥やトカゲをさがす。' },
  { id: 'caracal', name: 'カラカルン', egg: 'とびつきのタマゴ', token: 'カラカル', bigToken: 'カラカルン', color: '#c2884f', line: '#422006', rate: 0.02, desc: 'アフリカや西アジアのかわいた土地にすむネコのなかま、カラカル。耳の先に長い黒い毛のふさがあり、その耳で小さな音も聞きのがさない。ジャンプ力がとても強く、飛び立つ鳥に向かって高くとび上がり、空中でつかまえることもある。' },
  { id: 'slowloris', name: 'ロリスン', egg: 'のんびりのタマゴ', token: 'スローロリス', bigToken: 'ロリスン', color: '#b45309', line: '#451a03', rate: 0.02, desc: '東南アジアの森にすむ、大きな目をもつ小さなサルのなかま、スローロリス。名前のとおり、木の枝をとてもゆっくり、しかし確実ににぎって移動する。夜に活動し、虫や木のしるを食べる。めずらしいことに、ひじのあたりから毒を出す、霊長類ではとても少ない毒をもつなかまである。' },
  { id: 'sugarglider', name: 'フクロモモンガン', egg: 'あまいみつのタマゴ', token: 'フクロモモンガ', bigToken: 'フクロモモンガン', color: '#9ca3af', line: '#374151', rate: 0.02, desc: 'オーストラリアやニューギニアの森にすむ、手のひらにのるほど小さな有袋類、フクロモモンガ。前あしと後ろあしのあいだの膜を広げて、木から木へ滑空する。名前のとおり、木のみつや花のみつなどあまいものが大好き。夜に活動し、仲間どうしでよりそって暮らす。' },
  { id: 'echidna', name: 'ハリモグラン', egg: 'はりまるのタマゴ', token: 'ハリモグラ', bigToken: 'ハリモグラン', color: '#78716c', line: '#292524', rate: 0.02, desc: 'オーストラリアやニューギニアにすむ、せなかにとげのある動物、ハリモグラ。カモノハシと同じく、哺乳類なのにタマゴを産むめずらしいなかま。細長い口先とねばねばの長い舌でアリやシロアリをなめとって食べる。危険を感じると体を丸めてとげの玉になり、地面にもぐって身を守る。' },
  { id: 'frogmouth', name: 'ガマグチン', egg: 'おおぐちのタマゴ', token: 'ガマグチヨタカ', bigToken: 'ガマグチン', color: '#a8a29e', line: '#292524', rate: 0.02, desc: 'オーストラリアの森にすむ鳥、オーストラリアガマグチヨタカ。カエルのような大きな口と、ふわふわの灰色の羽をもつ。昼は木の枝の上で目を細め、折れた枝そっくりに動かずにじっとしている。夜になると大きな口で虫やネズミをつかまえる。フクロウに似ているが、ちがうなかまの鳥である。' },
  { id: 'takahe', name: 'タカヘン', egg: 'まぼろしのタマゴ', token: 'タカヘ', bigToken: 'タカヘン', color: '#1d4ed8', line: '#172554', rate: 0.02, desc: 'ニュージーランドの山の草原にすむ、飛べない大きな鳥、タカヘ。青と緑のつやのある羽と、赤くて大きなくちばしをもつ。一度は絶滅したと考えられていたが、約50年後に山奥でふたたび見つかった。今は人々が大切に守り、少しずつ数をふやしている。' },
  { id: 'hoatzin', name: 'ツメバケイン', egg: 'ふしぎなにおいのタマゴ', token: 'ツメバケイ', bigToken: 'ツメバケイン', color: '#c2410c', line: '#431407', rate: 0.02, desc: '南アメリカの川ぞいの森にすむ鳥、ツメバケイ（ホアチン）。ひなのつばさには小さなつめがあり、危険がせまると水に飛びこんでにげ、あとでつめを使って枝をよじのぼって巣にもどる。木の葉を胃の中で発酵させて食べるため、体から独特のにおいがする。' },
  { id: 'potoo', name: 'タチヨタカン', egg: 'えだにばけるタマゴ', token: 'タチヨタカ', bigToken: 'タチヨタカン', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: '中央アメリカや南アメリカの森にすむ鳥、タチヨタカ（ポトゥー）。昼は折れた枝の先にじっととまり、体をまっすぐのばして枯れ枝そっくりに化ける。目をとじても、まぶたの小さなすきまからまわりを見ることができる。夜になると大きな口をあけて飛ぶ虫をつかまえ、さびしげな声で鳴く。' },
  { id: 'secretarybird', name: 'ヘビクイワシン', egg: 'けりあしのタマゴ', token: 'ヘビクイワシ', bigToken: 'ヘビクイワシン', color: '#d6d3d1', line: '#1c1917', rate: 0.02, desc: 'アフリカの草原にすむ、長い足をもつ大きなタカのなかま、ヘビクイワシ。空も飛べるが、ほとんどの時間は草原を歩いてえものを探す。ヘビを見つけると、長い足ですばやく何度もけりつけてしとめる。頭の後ろの長いかざり羽が、昔の書記が耳にはさんだペンのように見えることから英語ではセクレタリーバードと呼ばれる。' },
  { id: 'kakapo', name: 'カカポン', egg: 'こけのにおいのタマゴ', token: 'カカポ', bigToken: 'カカポン', color: '#65a30d', line: '#1a2e05', rate: 0.02, desc: 'ニュージーランドの森にすむ、飛べない大きなオウム、カカポ（フクロウオウム）。世界でいちばん重いオウムで、夜に歩きまわって草や木の実を食べる。体からはこけや花のようなあまいにおいがするといわれる。一時は数十羽まで減ったが、人々が一羽ずつ大切に守り、少しずつ数をふやしている。' },
  { id: 'kea', name: 'ケアン', egg: 'たかやまのタマゴ', token: 'ミヤマオウム', bigToken: 'ケアン', color: '#4d7c0f', line: '#1a2e05', rate: 0.02, desc: 'ニュージーランドの雪の降る高い山にすむオウム、ケア（ミヤマオウム）。緑色の羽の下はあざやかなオレンジ色。とても頭がよく好奇心が強いことで知られ、道具の使い方を覚えたり、仲間と協力してパズルを解いたりする。車のゴムやかばんをいたずらでつついてしまうこともある。' },
  { id: 'lyrebird', name: 'コトドリン', egg: 'まねっこのタマゴ', token: 'コトドリ', bigToken: 'コトドリン', color: '#78350f', line: '#292524', rate: 0.02, desc: 'オーストラリアの森にすむ、竪琴のような形の長い尾羽をもつ鳥、コトドリ。ものまねの名人で、ほかの鳥の鳴き声だけでなく、カメラのシャッター音や車の警報音まで本物そっくりにまねるといわれる。おすは尾羽を広げて歌いながら、めすに向けてダンスをひろうする。' },
  { id: 'rockhopper', name: 'イワトビン', egg: 'はねあがりのタマゴ', token: 'イワトビペンギン', bigToken: 'イワトビン', color: '#1f2937', line: '#030712', rate: 0.02, desc: '南の海の島の岩場にすむ、目の上に黄色いかざり羽をもつペンギン、イワトビペンギン。名前のとおり、両足をそろえてぴょんぴょんと岩から岩へとびうつって移動する。きびしい波にもまれながら海で魚やオキアミをとり、けわしいがけの上に巣をつくって子育てをする。' },
  { id: 'potoroo', name: 'ポトルーン', egg: 'きのこさがしのタマゴ', token: 'ポトルー', bigToken: 'ポトルーン', color: '#a8794f', line: '#4a2f1a', rate: 0.02, desc: 'オーストラリアの森にすむ、小さなカンガルーのなかま、ポトルー（ネズミカンガルー）。後ろあしでぴょんぴょんはねて移動する。地面の下にできるキノコを鼻でかぎつけてほり出して食べ、ふんといっしょにキノコの胞子を森じゅうに広げて、木の成長を助けている。' },
  { id: 'solenodon', name: 'ソレノドン', egg: 'ながばなのタマゴ', token: 'ソレノ', bigToken: 'ソレノドン', color: '#a16207', line: '#3f2a06', rate: 0.02, desc: 'カリブ海の島々の森にすむ、長くよく動く鼻をもつ小さな動物、ソレノドン。恐竜がいたころから姿をあまり変えずに生きのびてきた、とても古いなかまだといわれる。めずらしいことに、歯から毒を出して虫などをとらえる。夜に落ち葉の下を長い鼻で探りまわって食べ物を見つける。' },
  { id: 'bilby', name: 'ビルビーン', egg: 'ながみみのタマゴ', token: 'ビルビー', bigToken: 'ビルビーン', color: '#cbd5e1', line: '#334155', rate: 0.02, desc: 'オーストラリアのかわいた土地にすむ、ウサギのように長い耳をもつ有袋類、ビルビー（ミミナガバンディクート）。夜に活動し、長い耳で地中の虫の音を聞きとり、するどいつめで穴をほって食べる。昼はらせんのような深い巣あなの中で、暑さをさけてねむる。' },
  { id: 'tenrec', name: 'テンレックン', egg: 'しましまはりのタマゴ', token: 'テンレック', bigToken: 'テンレックン', color: '#facc15', line: '#1f2937', rate: 0.02, desc: 'マダガスカル島の森にすむ、黄色と黒のしまもようの小さな動物、シマテンレック。せなかには針のような毛がはえていて、それをこすり合わせて人間にはほとんど聞こえない音を出し、家族どうしで合図を送り合うといわれる。地面をほってミミズや虫を食べる。' },
  { id: 'markhor', name: 'マーコールン', egg: 'ねじれづののタマゴ', token: 'マーコール', bigToken: 'マーコールン', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: 'ヒマラヤやアフガニスタンの高い山にすむ、大きくねじれた角をもつ野生のヤギ、マーコール。おすの角はらせんのようにねじれて、1メートルをこえることもある。けわしい岩場をすいすいのぼり、高い木にまでのぼって葉を食べることもある。' },
  { id: 'saiga', name: 'サイガン', egg: 'はなでっかのタマゴ', token: 'サイガ', bigToken: 'サイガン', color: '#e7d3a8', line: '#6b4f2a', rate: 0.02, desc: '中央アジアの広い草原にすむ、大きくふくらんだ鼻をもつレイヨウのなかま、サイガ。夏はこの鼻で砂ぼこりをこしとり、冬は冷たい空気をあたためてから肺に送るといわれる。大きなむれをつくって、季節ごとに長い距離を移動する。' },
  { id: 'gerenuk', name: 'ジェレヌクン', egg: 'のびあがりのタマゴ', token: 'ジェレヌク', bigToken: 'ジェレヌクン', color: '#d6a35c', line: '#5c3d1e', rate: 0.02, desc: 'アフリカ東部のかわいた草原にすむ、とても首の長いレイヨウのなかま、ジェレヌク。後ろあしだけで立ち上がり、前あしを枝にかけて、ほかの動物がとどかない高いところの葉を食べる。食べ物の葉から水分をとるので、ほとんど水を飲まなくても生きていける。' },
  { id: 'quoll', name: 'フクロネコン', egg: 'ほしもようのタマゴ', token: 'フクロネコ', bigToken: 'フクロネコン', color: '#92400e', line: '#451a03', rate: 0.02, desc: 'オーストラリアの森にすむ、茶色い毛に白い水玉もようがちらばった有袋類、フクロネコ（クオール）。名前にネコとつくがネコのなかまではない。夜に活動し、虫やトカゲや小鳥をすばやくつかまえる。木のぼりも上手で、母親はおなかのふくろで子どもを育てる。' },
  { id: 'colugo', name: 'ヒヨケザルン', egg: 'まくひろげのタマゴ', token: 'ヒヨケザル', bigToken: 'ヒヨケザルン', color: '#78716c', line: '#292524', rate: 0.02, desc: '東南アジアの森にすむ、首から手足、しっぽまで大きな膜をもつ動物、ヒヨケザル。名前にサルとつくがサルのなかまではない。夜になると木から木へ、膜を広げてグライダーのように100メートル以上も滑空する。昼間は木のみきにぴったりはりついて、木の皮とそっくりの色で身をかくしている。' },
  { id: 'ayeaye', name: 'アイアイン', egg: 'ほそゆびのタマゴ', token: 'アイアイ', bigToken: 'アイアイン', color: '#44403c', line: '#0c0a09', rate: 0.02, desc: 'マダガスカル島の森にすむ、大きな目と耳をもつサルのなかま、アイアイ。夜に活動し、とくに細長い中指で木のみきをこつこつたたく。その音のひびきを大きな耳で聞いて、木の中にいる虫の幼虫を見つけ、するどい歯で穴をあけて、中指でかき出して食べる。' },
  { id: 'numbat', name: 'フクロアリン', egg: 'しまもようのタマゴ', token: 'フクロアリクイ', bigToken: 'フクロアリン', color: '#c2410c', line: '#431407', rate: 0.02, desc: 'オーストラリアの森にすむ、せなかに白いしまもようのある小さな動物、フクロアリクイ（ナンバット）。名前にフクロとつくが、おなかにふくろはない。細長い舌でシロアリをなめとって食べ、一日に何万びきも食べるといわれる。シロアリが活動する昼間に動きまわる、めずらしい有袋類のなかま。' },
  { id: 'kinkajou', name: 'キンカジュン', egg: 'みつあつめのタマゴ', token: 'キンカジュー', bigToken: 'キンカジュン', color: '#d97706', line: '#78350f', rate: 0.02, desc: '中央アメリカや南アメリカの森にすむ、金色の毛の動物、キンカジュー。夜になると木の上で活動し、まきつくしっぽで枝につかまる。とても長い舌をもっていて、花のみつやくだもののしるをなめとる。花から花へ移るとき顔に花粉がつくので、花のたねを作る手伝いをすることもある。' },
  { id: 'binturong', name: 'ビントロン', egg: 'ポップコーンのタマゴ', token: 'ビントロング', bigToken: 'ビントロン', color: '#57534e', line: '#1c1917', rate: 0.02, desc: '東南アジアの森の木の上にすむ、黒くてもじゃもじゃの毛の動物、ビントロング。長くて力の強いしっぽを枝にまきつけて、木の上を落ちずにゆっくり動く。体からはなぜかポップコーンのようなにおいがすることで知られる。くだものが大好きで、食べたたねをふんといっしょに森のあちこちにまき、木をふやす手伝いをしている。' },
  { id: 'lanternfish', name: 'ハダカイワシン', egg: 'ひかりつぶのタマゴ', token: 'ハダカイワシ', bigToken: 'ハダカイワシン', color: '#334155', line: '#0f172a', rate: 0.02, desc: '深い海にすむ、体に小さな光る点がならんだ魚、ハダカイワシ。昼は深さ数百メートルの暗い海にいて、夜になると食べ物のプランクトンを追って海面近くまでのぼってくる。この毎日の大移動は、地球でいちばん大きな動物の移動の一つといわれる。おなかの光で上からの光にまぎれ、下から見つかりにくくしている。' },
  { id: 'goby', name: 'ダテハゼン', egg: 'あなほりのタマゴ', token: 'ダテハゼ', bigToken: 'ダテハゼン', color: '#a3e635', line: '#365314', rate: 0.02, desc: 'あたたかい海の砂地にすむ小さな魚、ダテハゼ。目のよく見えないテッポウエビといっしょに一つの巣あなでくらす。エビはせっせと砂をほって巣あなをととのえ、ハゼは入り口で見はりをする。エビはしょっかくでハゼの体にふれていて、ハゼがあぶないと知らせると、二ひきいっしょにさっとあなにかくれる。' },
  { id: 'triggerfish', name: 'モンガラン', egg: 'もようがらのタマゴ', token: 'モンガラカワハギ', bigToken: 'モンガラン', color: '#1e3a8a', line: '#0f172a', rate: 0.02, desc: 'あたたかい海のさんご礁にすむ、白い水玉もようと黄色い口もとがはでな魚、モンガラカワハギ。せなかのとげをぴんと立てると、引き金のように「かちっ」と固定でき、岩のすきまに入ったまま引き出されなくなる。じょうぶな歯でウニや貝のからもかみくだいて食べる。' },
  { id: 'boxfish', name: 'ハコフグン', egg: 'はこいりのタマゴ', token: 'ハコフグ', bigToken: 'ハコフグン', color: '#facc15', line: '#713f12', rate: 0.02, desc: 'あたたかい海の岩場やさんご礁にすむ、四角い箱のような体の魚、ハコフグ。体はかたい骨の板でできた「よろい」に包まれていて、動かせるのはひれと目と口だけ。小さなひれをぱたぱた動かして、ヘリコプターのようにその場でくるりと向きを変える。子どものころは黄色に黒い点もようで、とてもめだつ。' },
  { id: 'shrimpfish', name: 'ヘコアユン', egg: 'さかだちのタマゴ', token: 'ヘコアユ', bigToken: 'ヘコアユン', color: '#fbbf24', line: '#78350f', rate: 0.02, desc: 'あたたかい海のさんご礁や藻場にすむ、うすくて細長い魚、ヘコアユ。いつも頭を下にした「さかだち」のしせいで、むれになっておよぐ。体はかたい板のようなうろこでおおわれ、まんなかに黒いすじがある。こわいときはウニのとげのあいだにかくれ、とげとそっくりにならんで身を守る。' },
  { id: 'parrotfish', name: 'アオブダイン', egg: 'すなをつくるタマゴ', token: 'アオブダイ', bigToken: 'アオブダイン', color: '#06b6d4', line: '#164e63', rate: 0.02, desc: 'あたたかいさんご礁にすむ、オウムのくちばしのような歯をもつ大きな魚、アオブダイ。かたい歯でさんごの表面をかじって藻を食べ、かみくだいたさんごは白い砂になって出てくる。南の島の白い砂浜の砂の一部は、ブダイのなかまが作ったものだといわれる。夜は自分で作ったねばねばの「ねぶくろ」に入ってねむる。' },
  { id: 'yellowtang', name: 'キイロハギン', egg: 'まっきいろタマゴ', token: 'キイロ', bigToken: 'キイロハギン', color: '#facc15', line: '#854d0e', rate: 0.02, desc: 'あたたかいさんご礁にすむ、全身があざやかな黄色の魚、キイロハギ。うすい円ばんのような体で、さんごのすきまをすいすい泳ぐ。しっぽのつけねには白いとげがあり、身を守るのに使う。藻を食べてさんご礁をきれいに保つはたらきもしている。明るい黄色で、みんなを元気にはげます。' },
  { id: 'stripedcatfish', name: 'ゴンズイン', egg: 'ゴンズイだまタマゴ', token: 'ゴンズイ', bigToken: 'ゴンズイン', color: '#78350f', line: '#fef3c7', rate: 0.02, desc: '日本の海の岩場にすむ、黄色いすじのあるナマズのなかま、ゴンズイ。子どものころは何十ぴきもぎゅっと集まって「ゴンズイ玉」というボールのようなむれを作り、身を守る。ひれのとげには毒があるので、さわってはいけない。なかまといっしょに力を合わせて、むずかしい問題もみんなで乗りこえる。' },
  { id: 'batfish', name: 'アカククリン', egg: 'たかいひれのタマゴ', token: 'アカククリ', bigToken: 'アカククリン', color: '#f97316', line: '#1c1917', rate: 0.02, desc: 'あたたかい海にすむ、背びれとしりびれがとても高い魚、アカククリ。子どものころは黒い体のふちがオレンジ色で、ひらひらと泳ぐすがたは、毒のあるヒラムシや落ち葉に見えるといわれる。おとなになるとひれは短くなり、銀色の体に変わる。高いひれを広げて、まちがいをしっかりブロックする。' },
  { id: 'emperorangel', name: 'タテジマン', egg: 'うずまきもようのタマゴ', token: 'タテジマ', bigToken: 'タテジマン', color: '#1d4ed8', line: '#facc15', rate: 0.02, desc: 'あたたかいさんご礁にすむ、青と黄色のしまもようが美しい魚、タテジマキンチャクダイ。子どものころは青い体に白いうずまきもようがあり、おとなになるとまったくちがうしまもように変わるので、別の魚だと思われていたこともある。成長するにつれて、ことばの使い方もがらりとレベルアップする。' },
  { id: 'moorishidol', name: 'ツノダシン', egg: 'つのとはたのタマゴ', token: 'ツノダシ', bigToken: 'ツノダシン', color: '#fde68a', line: '#1c1917', rate: 0.02, desc: 'あたたかいさんご礁にすむ、白と黒と黄色のしまもようの魚、ツノダシ。背びれが長くのびてむちのようにたなびき、おとなになると目の上に小さなつののような出っぱりができる。口先はつき出ていて、岩のすきまのえさをついばむ。くっきりしたしまもようのように、文法のちがいもはっきり見分ける。' },
  { id: 'bannerfish', name: 'ハタタテン', egg: 'はたのしっぽタマゴ', token: 'ハタタテ', bigToken: 'ハタタテン', color: '#fde047', line: '#1c1917', rate: 0.02, desc: 'あたたかいさんご礁にすむ、白と黒のしまもようの魚、ハタタテダイ。背びれの一部が旗のように長くのびていて、泳ぐとひらひらとなびく。むれを作ってゆったり泳ぐことが多い。長い旗で、ことばの正しい順番をみんなに知らせる。' },
  { id: 'bluetang', name: 'ナンヨウハギン', egg: 'あおときいろのタマゴ', token: 'ナンヨウ', bigToken: 'ナンヨウハギン', color: '#2563eb', line: '#172554', rate: 0.02, desc: 'あたたかいさんご礁にすむ、あざやかな青い体に黄色いしっぽをもつ魚、ナンヨウハギ。しっぽのつけねには、ナイフのようなするどいとげがかくれている。おどろくと、さんごのすきまにすばやくかくれる。青い体でさんご礁をすいすい泳ぎ、英語の音をしっかり聞き取る。' },
  { id: 'flatworm', name: 'ヒラムシン', egg: 'ひらひらうすいタマゴ', token: 'ヒラムシ', bigToken: 'ヒラムシン', color: '#facc15', line: '#7c2d12', rate: 0.02, desc: 'さんご礁にすむ、紙のようにうすくて平たい生き物、ヒラムシ。あざやかな色やもようをもち、体のふちをひらひらと波打たせて泳ぐ。体が切れても、ふたたび元にもどるふしぎな力をもつなかまもいる。ひらひらした体で、どんなまちがいからもしなやかに立ち直る。' },
  { id: 'eggcowry', name: 'ウミウサギン', egg: 'しろいたまごがいタマゴ', token: 'ウサギガイ', bigToken: 'ウミウサギン', color: '#fafaf9', line: '#292524', rate: 0.02, desc: 'さんご礁にすむ巻き貝のなかま、ウミウサギガイ。まっ白でつやつやした貝がらは、まるで卵のよう。生きているときは、黒い体の一部（外とう膜）で貝がらをすっぽりつつんでいる。ソフトコーラルを食べてくらす。つやつやの貝がらで、ことばをきれいにならべる。' },
  { id: 'seamoth', name: 'ウミテングン', egg: 'うみのてんぐタマゴ', token: 'テング', bigToken: 'ウミテングン', color: '#a3a3a3', line: '#525252', rate: 0.02, desc: 'あたたかい海の砂地にすむ、ふしぎな形の小さな魚、ウミテング。長くつき出た口先が天狗の鼻のように見え、大きなむなびれを広げると羽をもったガのようにも見える。砂の上を「歩く」ように進み、ときどき古い皮をぬぎすてる。長い鼻で、まちがいをかぎ分けて正しい形に直す。' },
  { id: 'stonefish', name: 'オニダルマン', egg: 'いわそっくりタマゴ', token: 'オニダル', bigToken: 'オニダルマン', color: '#78716c', line: '#44403c', rate: 0.02, desc: 'あたたかい海の岩場にすむ、岩そっくりの見た目の魚、オニダルマオコゼ。ごつごつした体でじっと動かず、まわりにとけこんでえものを待つ。背びれのとげには強い毒があるので、海で見かけてもぜったいにさわってはいけない。じっと動かずに、英語の音をしっかり聞き取る。' },
  { id: 'harlequinshrimp', name: 'フリソデン', egg: 'ふりそでもようのタマゴ', token: 'フリソデ', bigToken: 'フリソデン', color: '#f9a8d4', line: '#7e22ce', rate: 0.02, desc: 'さんご礁にすむ、ふりそでのような大きなはさみをもつ小さなエビ、フリソデエビ。白い体にむらさきやピンクの水玉もようがあり、まるで着物を着ているよう。ヒトデを食べるめずらしいエビで、いつもつがいでくらしている。はなやかなはさみで、文法のまちがいをていねいにつまみ出す。' },
  { id: 'coconutcrab', name: 'ヤシガニン', egg: 'やしのみのタマゴ', token: 'ヤシガニ', bigToken: 'ヤシガニン', color: '#b45309', line: '#451a03', rate: 0.02, desc: '南の島にすむ、陸でくらす世界最大級のカニのなかま、ヤシガニ。ヤドカリのなかまだが、大きくなると貝がらをすてて、かたいからで身を守る。とても強いはさみをもち、木にのぼることもできる。力強いはさみで、ことばをがっちりつかんで正しい順にならべる。' },
  { id: 'lionfish', name: 'ミノカサゴン', egg: 'ひらひらのとげタマゴ', token: 'ミノカサ', bigToken: 'ミノカサゴン', color: '#dc2626', line: '#7f1d1d', rate: 0.02, desc: 'あたたかい海の岩場にすむ、ひらひらした大きなむなびれをもつ魚、ミノカサゴ。赤と白のしまもようがあざやかで、ゆったり泳ぐすがたはとても優雅。でも背びれのとげには毒があるので、ぜったいにさわってはいけない。大きなひれを広げて、まちがいをしっかり通せんぼする。' },
  { id: 'seafirefly', name: 'ウミホタルン', egg: 'あおいひかりのタマゴ', token: 'ウミホタ', bigToken: 'ウミホタルン', color: '#38bdf8', line: '#0c4a6e', rate: 0.02, desc: '日本の浅い海の砂の中にすむ、3ミリほどの小さな生き物、ウミホタル。夜になると泳ぎ出し、おどろくと青白く光る液を出す。光は体の外で作られ、海の中に青い光のつぶがうかんで見える。小さな青い光で、まちがえたときもなかまを守ってくれる。' },
  { id: 'pistolshrimp', name: 'テッポウエビン', egg: 'みずでっぽうタマゴ', token: 'テッポウ', bigToken: 'テッポウエビン', color: '#ef4444', line: '#7f1d1d', rate: 0.02, desc: '片方のはさみだけがとても大きい小さなエビ、テッポウエビ。大きなはさみをすばやく閉じると、水の中に「パチン」という大きな音とあわが生まれ、えものをおどろかせる。ハゼのなかまと同じ巣あなにくらし、いっしょに助けあう。大きなはさみで、まちがいをパチンとやっつける。' },
  { id: 'mandarinfish', name: 'ニシキテグリン', egg: 'にしきもようのタマゴ', token: 'ニシキ', bigToken: 'ニシキテグリン', color: '#f97316', line: '#1e40af', rate: 0.02, desc: 'さんご礁の岩のすきまにすむ、とてもカラフルな小さな魚、ニシキテグリ。青とオレンジのうずまきもようは、まるで絵の具でえがいたよう。夕方になると、つがいでよりそって水面に向かってゆっくりのぼっていく。色とりどりのことばを、きれいにならべて英文を作る。' },
  { id: 'bluedragon', name: 'アオミノン', egg: 'うみにうかぶあおいタマゴ', token: 'アオミノ', bigToken: 'アオミノン', color: '#3b82f6', line: '#1e3a8a', rate: 0.02, desc: '海の表面にうかんでくらす、青くて小さなウミウシのなかま、アオミノウミウシ。おなかに空気をためて、さかさまになって波にただよう。毒のあるクラゲを食べて、その毒を自分のまもりに使う。青い体はまるで小さなドラゴンのよう。' },
  { id: 'cuttlefish', name: 'コウイカン', egg: 'すみはきのタマゴ', token: 'コウイカ', bigToken: 'コウイカン', color: '#c084fc', line: '#6b21a8', rate: 0.02, desc: '体の中に「甲」とよばれるかたい板をもつイカのなかま、コウイカ。体の色やもようを一瞬で変えて、まわりにとけこんだり、なかまに気持ちを伝えたりする。体の色を変えるように、ことばの形を文に合わせて正しく変えるのが得意。' },
  { id: 'blueringed', name: 'ヒョウモンダコン', egg: 'あおいわっかのタマゴ', token: 'ヒョウモン', bigToken: 'ヒョウモンダコン', color: '#eab308', line: '#1d4ed8', rate: 0.02, desc: 'あたたかい海の岩場にすむ、小さなタコ、ヒョウモンダコ。おどろくと体に青いわっかのもようがかがやいて、「近づかないで」と知らせる。強い毒をもつので、見つけてもぜったいにさわってはいけない。青いわっかを光らせて、まちがいに気づいたらすぐに知らせてくれる。' },
  { id: 'ribboneel', name: 'リボンウツボン', egg: 'はなひげのリボンタマゴ', token: 'ハナヒゲ', bigToken: 'リボンウツボン', color: '#2563eb', line: '#a16207', rate: 0.02, desc: 'さんご礁の砂地にすむ、リボンのように細長い魚、ハナヒゲウツボ。鼻の先にひらひらしたかざりがある。若いときは黒く、成長すると青と黄色に、さらに黄色へと体の色が変わっていく。巣あなから顔を出して、まわりの音にじっと耳をすませる。' },
  { id: 'searobin', name: 'ホウボッチ', egg: 'うみのそこあるきタマゴ', token: 'ホウボ', bigToken: 'ホウボッチ', color: '#f97316', line: '#9a3412', rate: 0.02, desc: '海の底を「歩く」ようにして進む魚、ホウボウ。胸びれの一部があしのように分かれていて、それで海の底をさぐりながら歩く。広げた胸びれはあざやかな青緑色で、チョウの羽のように美しい。ぐうぐうと音を出すこともある。あしのようなひれで、ことばを一つずつ正しい場所に運ぶ。' },
  { id: 'napoleonfish', name: 'メガネモッチ', egg: 'さんごしょうのこぶタマゴ', token: 'メガネ', bigToken: 'メガネモッチ', color: '#0d9488', line: '#134e4a', rate: 0.02, desc: 'あたたかいさんご礁にすむ、大きな魚、メガネモチノウオ。おでこが大きくもり上がり、「ナポレオンフィッシュ」ともよばれる。目のうしろにめがねのようなもようがある。人なつっこく、ダイバーに近づいてくることもある。めがねもようの目で、文法のまちがいをしっかり見つける。' },
  { id: 'giantisopod', name: 'グソクン', egg: 'しんかいのよろいタマゴ', token: 'グソク', bigToken: 'グソクン', color: '#a1a1aa', line: '#3f3f46', rate: 0.02, desc: '深い海の底にすむ、ダンゴムシのなかまの大きな生き物、オオグソクムシ。よろいのようなかたいからをもち、何年も食べずに生きていた記録もある。海の底に落ちてきたものを食べて、海をきれいにするはたらきもしている。かたいよろいで、まちがえたときもハートを守ってくれる。' },
  { id: 'orca', name: 'シャチオン', egg: 'うみのおうさまタマゴ', token: 'シャチ', bigToken: 'シャチオン', color: '#111827', line: '#030712', rate: 0.02, desc: '黒と白のもようをもつ、イルカのなかまでいちばん大きい動物、シャチ。家族でむれを作ってくらし、むれごとにちがう「方言」のような鳴き声で連絡をとりあう。かしこく、力をあわせて狩りをする。なかまの声を聞き分けるように、英語の音をしっかり聞き取る。' },
  { id: 'coelacanth', name: 'シーラカンスン', egg: 'いにしえのうろこタマゴ', token: 'シーラ', bigToken: 'シーラカンスン', color: '#1e3a8a', line: '#172554', rate: 0.02, desc: '「生きた化石」とよばれる魚、シーラカンス。大むかしにほろびたと考えられていたが、20世紀に生きているものが見つかって世界をおどろかせた。あしのような太いひれをもち、深い海の岩かげにひっそりとくらす。何億年もの記憶で、むずかしい文法もゆっくり思い出す。' },
  { id: 'dugong', name: 'ジュゴリン', egg: 'うみくさのやさしいタマゴ', token: 'ジュゴ', bigToken: 'ジュゴリン', color: '#a8a29e', line: '#57534e', rate: 0.02, desc: 'あたたかい浅い海にすむ、草食のほにゅう類、ジュゴン。海の底の海草を食べてくらし、日本では沖縄の近くでわずかに見られる。しっぽは三日月のような形をしている。のんびりした性格で、まちがえても気にせず、なかまをやさしくはげまし続ける。' },
  { id: 'giantsquid', name: 'ダイオウイカン', egg: 'しんかいのおおめだまタマゴ', token: 'ダイオウ', bigToken: 'ダイオウイカン', color: '#be123c', line: '#4c0519', rate: 0.02, desc: '深い海にすむ、とても大きなイカ、ダイオウイカ。長いうでをふくめると10メートルをこえることもあり、目の大きさは動物の中でもとくに大きい。生きたすがたがはじめて撮影されたのは21世紀になってからである。大きな目で、こまかい文法のちがいも見のがさない。' },
  { id: 'oarfish', name: 'リュウグウン', egg: 'ぎんいろのリボンタマゴ', token: 'リュウグウ', bigToken: 'リュウグウン', color: '#cbd5e1', line: '#475569', rate: 0.02, desc: '深い海にすむ、銀色の長い魚、リュウグウノツカイ。体の長さが数メートルになることもあり、頭には赤いかざりのようなひれがある。めったに人の前にあらわれないので、むかしから「海の使い」と言われてきた。深い海の静かな音に耳をすませて、英語の音をしっかり聞き取る。' },
  { id: 'spidercrab', name: 'タカアシガニン', egg: 'ふかいうみのながあしタマゴ', token: 'タカアシ', bigToken: 'タカアシガニン', color: '#ea580c', line: '#7c2d12', rate: 0.02, desc: '日本の深い海にすむ、世界でいちばん大きなカニのなかま、タカアシガニ。あしを広げると3メートルをこえることもある。深い海の底をゆっくり歩き、長いあいだ生きると考えられている。長いあしで、ことばをひとつずつ正しい場所に運んで英文を組み立てる。' },
  { id: 'whaleshark', name: 'ジンベエザメン', egg: 'おおうなばらタマゴ', token: 'ジンベエ', bigToken: 'ジンベエザメン', color: '#64748b', line: '#1e293b', rate: 0.02, desc: '世界でいちばん大きな魚、ジンベエザメ。体は10メートルをこえることもあるが、とてもおだやかで、大きな口を開けて小さなプランクトンを海水ごとこしとって食べる。背中の白い点もようは一ぴきずつちがう。大きな口で、たくさんの音をまるごと受けとめる。' },
  { id: 'porcupinefish', name: 'ハリセンボンボ', egg: 'ぷくぷくトゲタマゴ', token: 'ハリセ', bigToken: 'ハリセンボンボ', color: '#fde68a', line: '#78350f', rate: 0.02, desc: 'あたたかい海にすむハリセンボン。ふだんはとげをねかせてゆっくり泳ぐが、敵におそわれると水を飲みこんでぷくっとふくらみ、とげを立てたボールのようになって身を守る。大きな目で、まわりをよく見ている。まちがえそうなときも、ぷくっとふくらんでハートを守る。' },
  { id: 'gardeneel', name: 'チンアナゴン', egg: 'すなからこんにちはタマゴ', token: 'チンア', bigToken: 'チンアナゴン', color: '#fef3c7', line: '#78350f', rate: 0.02, desc: '海の底の砂から体を出してゆらゆらゆれるチンアナゴ。たくさんの仲間がならんで、流れてくるプランクトンを食べる。こわいことがあると、すぐに砂の中へひっこむ。みんなでいっしょに顔を出して、耳をすませて音を聞く。' },
  { id: 'flapjackoctopus', name: 'メンダコン', egg: 'しんかいのふわふわタマゴ', token: 'メンダ', bigToken: 'メンダコン', color: '#fb923c', line: '#9a3412', rate: 0.02, desc: '深い海の底にすむ、平たいタコのなかまメンダコ。頭の上の耳のようなひれをぱたぱた動かして、ふわふわとただよう。体はやわらかく、深海の大きな水の重さにもつぶれない。どんなに重い問題でも、ふわっと受けとめてハートを守る。' },
  { id: 'pondturtle', name: 'イシガメン', egg: 'かわらのこいしタマゴ', token: 'イシガメ', bigToken: 'イシガメン', color: '#a16207', line: '#422006', rate: 0.02, desc: '日本にしかいないカメ、ニホンイシガメ。川や池にすみ、晴れた日には石の上でこうらをかわかして日なたぼっこをする。子ガメは丸いこうらがお金に似ていることから「ゼニガメ」とよばれてきた。のんびり日を浴びながら、聞こえた音をじっくり味わう。' },
  { id: 'ratsnake', name: 'アオダイショウン', egg: 'くらのまもりタマゴ', token: 'アオダ', bigToken: 'アオダイショウン', color: '#84cc16', line: '#365314', rate: 0.02, desc: '日本でいちばん大きなヘビのなかま、アオダイショウ。毒はなく、昔は家や米ぐらのネズミをとってくれる守り神として大切にされた。木登りも得意で、体をくねらせて高いところまで上る。ことばをくねくねとつなげて、英文をじょうずに組み立てる。' },
  { id: 'seaturtle', name: 'ウミガメン', egg: 'うみべのたびタマゴ', token: 'ウミガメ', bigToken: 'ウミガメン', color: '#65a30d', line: '#1a2e05', rate: 0.02, desc: '広い海を何千キロも旅するウミガメ。地球の磁気を手がかりに道を見つけると考えられていて、大人になると自分が生まれた浜辺にもどってきてタマゴを産む。長い旅も一歩ずつ。どんなに遠い正解にも、あきらめずにたどり着く。' },
  { id: 'kajikafrog', name: 'カジカガエルン', egg: 'せせらぎタマゴ', token: 'カジカ', bigToken: 'カジカガエルン', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: '山の清流の石の上にすむカジカガエル。オスは「フィフィフィ」と鳥のように美しい声で鳴き、昔から歌や俳句によまれてきた。指先の吸ばんで、流れの速い岩の上でもすべらない。川の音にまぎれた声も聞き分け、仲間の声に合わせて歌う。' },
  { id: 'asianblackbear', name: 'ツキノワグマン', egg: 'みかづきタマゴ', token: 'ツキノワ', bigToken: 'ツキノワグマン', color: '#292524', line: '#0c0a09', rate: 0.02, desc: '日本の山にすむツキノワグマ。むねに三日月のような白いもようがある。秋にたくさん食べてたくわえ、冬はあなの中で冬ごもりをする。母グマは冬ごもりのあいだに子どもを産む。長い冬をこえて、春にまた元気に起きあがる。' },
  { id: 'japaneseserow', name: 'カモシカン', egg: 'がけのうえタマゴ', token: 'カモシカ', bigToken: 'カモシカン', color: '#78716c', line: '#292524', rate: 0.02, desc: '日本の山にすむニホンカモシカ。シカではなくウシのなかまで、国の特別天然記念物になっている。けわしい岩場でも足をすべらせずに歩き、じっと立ち止まってこちらを見つめることがある。どんなにけわしい問題でも、足元をしっかり守って進む。' },
  { id: 'japanesesquirrel', name: 'ニホンリスン', egg: 'まつぼっくりタマゴ', token: 'ニホンリ', bigToken: 'ニホンリスン', color: '#b45309', line: '#451a03', rate: 0.02, desc: '日本の森にすむニホンリス。秋になるとクルミなどの木の実を地面にうめてたくわえる。うめた場所をわすれた実の一部は、やがて芽を出して新しい木になる。正解をひとつずつたくわえるたびに、力がぐんぐん大きくなる。' },
  { id: 'harvestmouse', name: 'カヤネズミン', egg: 'くさのまりタマゴ', token: 'カヤネ', bigToken: 'カヤネズミン', color: '#d97706', line: '#78350f', rate: 0.02, desc: '日本でいちばん小さなネズミのなかま、カヤネズミ。体重は10グラムほどしかない。草の葉を細くさいてあみこみ、草のくきの上にボールのような巣を作る。しっぽをくきに巻きつけて、落ちないように体をささえる。ことばを1本ずつあみこんで、しっかりした英文を作る。' },
  { id: 'giantflyingsquirrel', name: 'ムササビン', egg: 'こずえのかぜタマゴ', token: 'ムササ', bigToken: 'ムササビン', color: '#92400e', line: '#451a03', rate: 0.02, desc: '日本の森にすむムササビ。前あしと後ろあしのあいだのまくを広げて、木から木へ100メートル以上も滑空することがある。夜に活動し、大きな目で暗い森を見わたす。ことばからことばへ、すいっと飛びうつって英文を組み立てる。' },
  { id: 'eagleowl', name: 'ミミズクン', egg: 'しずかなよぞらタマゴ', token: 'ミミズ', bigToken: 'ミミズクン', color: '#a16207', line: '#422006', rate: 0.02, desc: '頭に耳のような羽（羽角）をもつミミズク。夜の森で、とても小さな音も聞き分ける。羽のふちがやわらかいので、ほとんど音をたてずに飛ぶことができる。静かに耳をすまして、英語のかすかな音のちがいも聞きのがさない。' },
  { id: 'waterscorpion', name: 'ミズカマキリン', egg: 'みずくさのいきタマゴ', token: 'ミズカマ', bigToken: 'ミズカマキリン', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: '池の水草のあいだにひそむミズカマキリ。カマキリのようなかまの前あしをもち、おしりの先の長い管を水面に出して、シュノーケルのように息をする。水草にまぎれてじっと待ち、近づいたえものをすばやくつかまえる。正解するたびに、かまの力が強くなる。' },
  { id: 'maskedcivet', name: 'ハクビン', egg: 'よるのやねタマゴ', token: 'ハクビ', bigToken: 'ハクビン', color: '#57534e', line: '#1c1917', rate: 0.02, desc: '顔の真ん中に白いすじがあるハクビシン。夜に活動し、木登りがとても上手で、電線の上をつなわたりのように歩くこともある。高いところからまわりを見わたして、すばやく動く。ことばの順番も、高いところから見わたしてすばやく組み立てる。' },
  { id: 'mountainfrog', name: 'ヤマアカガエルン', egg: 'はるいちばんタマゴ', token: 'ヤマアカ', bigToken: 'ヤマアカガエルン', color: '#c2410c', line: '#431407', rate: 0.02, desc: '日本の山や林にすむ、赤茶色のヤマアカガエル。冬は土の中や水の底で眠り、まだ寒い早春にいちばん乗りで目をさまして、仲間と声をそろえて鳴きはじめる。みんなの声が合わさると、遠くまでひびく。' },
  { id: 'divingbeetle', name: 'ゲンゴロウン', egg: 'いけのあわタマゴ', token: 'ゲンゴ', bigToken: 'ゲンゴロウン', color: '#365314', line: '#1a2e05', rate: 0.02, desc: '池や田んぼにすむ水生昆虫ゲンゴロウ。はねの下に空気のあわをためて、水の中でも長く息ができる。毛の生えた後ろあしをオールのように動かして、力強く泳ぐ。正解するたびに、どんどん勢いをつけて進む。' },
  { id: 'giantwaterbug', name: 'タガメン', egg: 'たんぼのまもりタマゴ', token: 'タガメ', bigToken: 'タガメン', color: '#78716c', line: '#3f2a14', rate: 0.02, desc: '田んぼや池にすむ、日本最大級の水生昆虫タガメ。大きな前あしでえものをしっかりつかまえる。オスは水の上の草にうみつけられたタマゴのそばにとどまり、かわかないように水をかけて守る。大切なハートも、しっかり守ってくれる。' },
  { id: 'waterstrider', name: 'アメンボン', egg: 'みずのわタマゴ', token: 'アメン', bigToken: 'アメンボン', color: '#78716c', line: '#292524', rate: 0.02, desc: '池や川の水面をすいすい歩くアメンボ。あしの先の細かい毛が水をはじくので、しずまずに水の上に立てる。水面に落ちた虫がたてる小さな波を、あしで感じとってすばやく近づく。かすかな音のちがいも感じとって、すばやく正解に近づく。' },
  { id: 'firenewt', name: 'アカハライモリン', egg: 'あかいおなかタマゴ', token: 'イモリ', bigToken: 'アカハライモリン', color: '#44403c', line: '#1c1917', rate: 0.02, desc: '日本の田んぼや池にすむアカハライモリ。背中は黒っぽく、おなかはあざやかな赤とまだらもよう。あしやしっぽが失われても、また生えてくるふしぎな力をもっている。ピンチになってもまた立ち上がり、何度でも問題にいどむ。' },
  { id: 'molerat', name: 'ハダカデバネズミン', egg: 'ちかのトンネルタマゴ', token: 'デバ', bigToken: 'ハダカデバネズミン', color: '#fda4af', line: '#9f1239', rate: 0.02, desc: 'アフリカの地下にトンネルをほってくらすハダカデバネズミ。毛がほとんどなく、大きな前歯でほり進む。女王を中心に、ほり係や見はり係などがみんなで役わりを分けてくらす。ネズミのなかまでは長生きで、30年ほど生きるものもいる。みんなで声をかけあって、聞き取りの力をコツコツためる。' },
  { id: 'bagworm', name: 'ミノムシン', egg: 'えだのみのタマゴ', token: 'ミノ', bigToken: 'ミノムシン', color: '#a16207', line: '#422006', rate: 0.02, desc: '小枝や葉を糸でつづりあわせた「みの」にすむミノムシ。ガの幼虫で、みのにくるまって寒い冬をこす。みのの材料は、まわりにあるものを少しずつ集めてつなぎあわせる。単語をひとつずつつなぎあわせて、英文をていねいに組み立てる。' },
  { id: 'seaslug', name: 'ウミウシン', egg: 'いそのいろどりタマゴ', token: 'ウミウシ', bigToken: 'ウミウシン', color: '#c084fc', line: '#581c87', rate: 0.02, desc: '海の岩場にすむ、あざやかな色のウミウシ。貝のなかまだが、からをもたない。頭の2本の角のようなものでにおいをかぎ、なかには食べた海藻の色やしくみを体にとりこむものもいる。学んだ文法を自分のものにとりこんで、正解するたびに力をふやす。' },
  { id: 'horseshoecrab', name: 'カブトガニン', egg: 'こだいのうみタマゴ', token: 'カブトガ', bigToken: 'カブトガニン', color: '#a8a29e', line: '#3f3f46', rate: 0.02, desc: '「生きた化石」とよばれるカブトガニ。カニではなくクモやサソリに近い仲間で、およそ数億年前からほとんど姿を変えずに生きのびてきた。血は青い色をしている。何度まちがえても、あきらめずに生きのびる力で、聞き取りをねばり強く続ける。' },
  { id: 'pallascat', name: 'マヌルネコン', egg: 'こうげんのけだまタマゴ', token: 'マヌル', bigToken: 'マヌルネコン', color: '#d6d3d1', line: '#57534e', rate: 0.02, desc: '寒い高原の岩場にくらす、もこもこの野生のネコ、マヌルネコ。毛がとても長く、ひたいのしまもようと丸いひとみ、むすっとした顔が特徴。岩かげでじっと待ち、ここぞというときに一気にとびかかる。文法の見落としも、じっと見て一瞬で見ぬく。' },
  { id: 'seaotter', name: 'ラッコン', egg: 'うみのいしタマゴ', token: 'ラッコ', bigToken: 'ラッコン', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: '海にあおむけでうかぶ動物、ラッコ。おなかの上で石を使って貝をわり、お気に入りの石はわきの下のポケットにしまっておく。ねむるときは仲間と手をつないで流されないようにする。単語という石を組み合わせて、英文をじょうずに組み立てる。' },
  { id: 'easterncrownedwarbler', name: 'センダイムシクイン', egg: 'わかばのみどりタマゴ', token: 'センダ', bigToken: 'センダイムシクイン', color: '#a3e635', line: '#365314', rate: 0.02, desc: 'うすい緑色の小さな鳥、センダイムシクイ。春の林で「チヨチヨビー」と鳴き、その声は「焼酎一杯ぐいー」と聞きなされることで有名。聞きなしのように、英語の音もおぼえやすいことばに置きかえて耳に残してくれる。' },
  { id: 'asianstubtail', name: 'ヤブサメン', egg: 'したやぶのちゃいろタマゴ', token: 'ヤブサ', bigToken: 'ヤブサメン', color: '#a16207', line: '#3f2a0a', rate: 0.02, desc: '尾がとても短い、茶色の小さな鳥、ヤブサメ。森の下のやぶにすみ、「シシシシシ…」と虫の声のような、とても高い声で鳴く。その声は高すぎて、聞こえにくい人もいるほど。小さな音も聞きのがさない耳を育ててくれる。' },
  { id: 'japanesenightheron', name: 'ミゾゴイン', egg: 'たにまのくりいろタマゴ', token: 'ミゾゴ', bigToken: 'ミゾゴイン', color: '#9a3412', line: '#431407', rate: 0.02, desc: 'くり色の体をもつ、なぞの多いサギのなかま、ミゾゴイ。日本でおもに子育てをする鳥で、数が少なく、暗い森の谷間でひっそりと暮らす。危険を感じると首をのばして木の枝のようにじっと動かなくなる。あわてずじっと考えて、正しい答えを見つける。' },
  { id: 'willowtit', name: 'コガラン', egg: 'しらかばのくろぼうしタマゴ', token: 'コガ', bigToken: 'コガラン', color: '#a8a29e', line: '#0c0a09', rate: 0.02, desc: '黒いぼうしをかぶったような頭と、黒いあごをもつ小鳥、コガラ。山の林にすみ、くさった木に自分で巣穴をほる。冬に備えて木の実をあちこちにかくしておき、ちゃんと覚えていて取り出す。覚えた単語も、必要なときにきちんと思い出させてくれる。' },
  { id: 'coaltit', name: 'ヒガラン', egg: 'もみのきのちいさなタマゴ', token: 'ヒガ', bigToken: 'ヒガラン', color: '#475569', line: '#0f172a', rate: 0.02, desc: '黒い頭に小さな冠羽と、白いほおをもつ小鳥、ヒガラ。シジュウカラのなかまでいちばん小さく、モミやマツの林の高い枝先を、すばしこく動きまわる。「ツツピン、ツツピン」と高い声で鳴く。小さな体で、細かいところまでていねいに見てくれる。' },
  { id: 'eurasianhobby', name: 'チゴハヤブサン', egg: 'なつぞらのはやいタマゴ', token: 'チゴハ', bigToken: 'チゴハヤブサン', color: '#475569', line: '#0f172a', rate: 0.02, desc: '灰黒色のせなかに、赤茶色の「ももひき」のような足のはねをもつ小型のハヤブサ、チゴハヤブサ。夏に北の地方へやってきて、空を飛ぶトンボやツバメさえ空中でつかまえるほど速く飛ぶ。すばやい判断で、時間とのたたかいにも強い。' },
  { id: 'eurasiansparrowhawk', name: 'ハイタカン', egg: 'ふゆばやしのはいいろタマゴ', token: 'ハイタ', bigToken: 'ハイタカン', color: '#94a3b8', line: '#1e293b', rate: 0.02, desc: '灰色のせなかに、むねの細かいしまもようが目立つタカ、ハイタカ。むかしは鷹狩りにも使われた。冬の林のふちを低く飛び、木々のあいだをすりぬけて小鳥を追う。するどい目で、文の中のまちがいもすばやく見つけ出す。' },
  { id: 'japanesesparrowhawk', name: 'ツミン', egg: 'こだちのちいさなタマゴ', token: 'ツミ', bigToken: 'ツミン', color: '#64748b', line: '#1e293b', rate: 0.02, desc: '日本でいちばん小さいタカのなかま、ツミ。ハトほどの大きさだが、すばやく林の中を飛びぬけて小鳥をつかまえる。近年は町の公園でも子育てをするようになった。小さくてもするどく、問題のポイントをすばやくとらえる。' },
  { id: 'greyfacedbuzzard', name: 'サシバン', egg: 'わたりのたかタマゴ', token: 'サシバ', bigToken: 'サシバン', color: '#a16207', line: '#292524', rate: 0.02, desc: '茶色の体に、白いのどと黒いたてすじをもつタカ、サシバ。春に南の国から日本の里山にやってきて子育てをし、秋には何千羽もの群れが上昇気流にのって空高くうずをまきながら南へわたる。風にのるように、むずかしい問題も上手にのりこえる。' },
  { id: 'whitewagtail', name: 'ハクセキレイン', egg: 'まちかどのしろタマゴ', token: 'ハクセ', bigToken: 'ハクセキレイン', color: '#f8fafc', line: '#1e293b', rate: 0.02, desc: '白い顔と、黒い目すじをもつ鳥、ハクセキレイ。もとは北の鳥だったが、今では町の駐車場や駅前でもよく見られる。人をこわがらず、ちょこちょこ走っては立ち止まり、「チュチュン」と鳴く。町にとけこんだように、新しい単語にもすぐなじませてくれる。' },
  { id: 'greywagtail', name: 'キセキレイン', egg: 'けいりゅうのきいろタマゴ', token: 'キセキ', bigToken: 'キセキレイン', color: '#fde047', line: '#334155', rate: 0.02, desc: '灰色のせなかに、あざやかな黄色いおなかをもつ鳥、キセキレイ。山の谷川の石の上で、長い尾をせわしなく上下にふりながら、流れの近くの虫をとる。「チチン、チチン」と鳴きながら波のように飛ぶ。清流のように、すっきりと答えを流しこんでくれる。' },
  { id: 'japanesewagtail', name: 'セグロセキレイン', egg: 'かわらのしろくろタマゴ', token: 'セグロ', bigToken: 'セグロセキレイン', color: '#f1f5f9', line: '#0f172a', rate: 0.02, desc: '黒いせなかと顔に、白いまゆとおなかをもつ鳥、セグロセキレイ。日本とその周りにしかいない鳥で、川原の石の上を長い尾を上下にふりながら歩く。「ジジッ」とにごった声で鳴き、元気に石から石へとびうつる。テンポよく次の問題へ進ませてくれる。' },
  { id: 'greystreakedflycatcher', name: 'エゾビタキン', egg: 'わたりどりのまだらタマゴ', token: 'エゾビ', bigToken: 'エゾビタキン', color: '#94a3b8', line: '#1e293b', rate: 0.02, desc: '灰色の体に、白いむねの黒いたてじまが目立つ小鳥、エゾビタキ。春と秋のわたりの時期にだけ日本を通りすぎる旅の鳥で、公園の木の枝から飛び立って虫をとらえる。長い旅をする鳥のように、むずかしい単元もこつこつ乗りこえる。' },
  { id: 'asianbrownflycatcher', name: 'コサメビタキン', egg: 'あまぐものはいいろタマゴ', token: 'コサメ', bigToken: 'コサメビタキン', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: '灰色がかった茶色の小さな体に、大きな黒い目と白いアイリングをもつ鳥、コサメビタキ。枝の先にちょこんと止まり、飛んでいる虫を見つけると、さっと飛び出して空中でつかまえ、また同じ枝にもどる。チャンスをのがさず、さっと答えをつかまえる。' },
  { id: 'brownheadedthrush', name: 'アカハラン', egg: 'やまのあかむねタマゴ', token: 'アカラ', bigToken: 'アカハラン', color: '#ea580c', line: '#431407', rate: 0.02, desc: 'オレンジ色のむねと、茶色のせなかをもつツグミのなかま、アカハラ。夏は山の森で「キョロン、キョロン、ツィー」と明るくさえずり、冬は低い土地におりてくる。落ち葉の下の虫をさがすように、文の中にかくれた答えを見つけ出す。' },
  { id: 'siberianthrush', name: 'マミジロン', egg: 'しろまゆのくろタマゴ', token: 'マミジ', bigToken: 'マミジロン', color: '#334155', line: '#020617', rate: 0.02, desc: '黒っぽい体に、目の上のくっきりした白いまゆをもつ鳥、マミジロ。「眉白」という名前のとおり、白いまゆがよく目立つ。山の森で「キョロン、ツィー」とすんだ声で鳴く。くっきりしたまゆのように、大事なポイントをはっきり見せてくれる。' },
  { id: 'japanesethrush', name: 'クロツグミン', egg: 'なつやまのくろタマゴ', token: 'クロツ', bigToken: 'クロツグミン', color: '#1f2937', line: '#030712', rate: 0.02, desc: '黒いせなかに、白いおなかと黒い点々、黄色いくちばしをもつ夏の鳥、クロツグミ。森の中で、ほかの鳥の声もまねながら、変化に富んだ美しい歌をうたう。いろいろな言い方をまねて、英語の表現を豊かにしてくれる。' },
  { id: 'scalythrush', name: 'トラツグミン', egg: 'よるのとらもようタマゴ', token: 'トラツ', bigToken: 'トラツグミン', color: '#ca8a04', line: '#292524', rate: 0.02, desc: '黄色っぽい体に、黒いうろこのようなもようがある鳥、トラツグミ。夜の森で「ヒィー、ヒョー」と細く悲しげな声で鳴くので、むかしは「ぬえ」というなぞの生き物の声だと考えられていた。なぞめいた問題の正体も、しずかに明かしてくれる。' },
  { id: 'striatedheron', name: 'ササゴイン', egg: 'かわせのみどりタマゴ', token: 'ササゴ', bigToken: 'ササゴイン', color: '#64748b', line: '#1e293b', rate: 0.02, desc: '笹の葉のようなもようのつばさをもつ小さなサギ、ササゴイ。川岸でじっと待ち、虫や羽を水面に落として魚をおびきよせる「つり」をすることで知られる。くふうしだいで、むずかしい問題もうまくつり上げる。' },
  { id: 'blackwoodpigeon', name: 'カラスバトン', egg: 'しまもりのくろタマゴ', token: 'カラバ', bigToken: 'カラスバトン', color: '#334155', line: '#020617', rate: 0.02, desc: '黒い体が光に当たると緑やむらさきにかがやくハト、カラスバト。伊豆諸島や南の島々の森にすみ、「ウッウー」と牛のような低い声で鳴く。光の当たり方で色が変わるように、文の見方を変えて答えを見つける。' },
  { id: 'orientalturtledove', name: 'キジバトン', egg: 'のきしたのはいいろタマゴ', token: 'キジバ', bigToken: 'キジバトン', color: '#c4a484', line: '#3f2a1d', rate: 0.02, desc: 'うろこのようなもようのつばさと、首に青と黒のしまをもつハト、キジバト。町の公園や庭でもよく見られ、「デーデーポッポー」とのんびり鳴く。おだやかな声で、あせらず一問ずつ考える大切さを教えてくれる。' },
  { id: 'siberianrubythroat', name: 'ノゴマン', egg: 'ほっかいどうのべにタマゴ', token: 'ノゴ', bigToken: 'ノゴマン', color: '#a8a29e', line: '#292524', rate: 0.02, desc: 'のどがあざやかな赤色にかがやく小鳥、ノゴマ。夏の北海道の草原で、低い木の上に止まって、高く美しい声でさえずる。のどの赤い宝石のように、大切な答えをきらりと光らせてくれる。' },
  { id: 'whitebelliedgreenpigeon', name: 'アオバトン', egg: 'うみべのみどりタマゴ', token: 'アオバ', bigToken: 'アオバトン', color: '#4ade80', line: '#14532d', rate: 0.02, desc: 'あざやかな緑色の体をもつハト、アオバト。「アーオー、アーオー」と尺八のようなふしぎな声で鳴く。夏になると、ミネラルをとるために群れで海岸にやってきて、波をかぶりながら海水を飲む。どんな大波の問題にもひるまない。' },
  { id: 'lathamssnipe', name: 'ジシギン', egg: 'そうげんのかみなりタマゴ', token: 'ジシギ', bigToken: 'ジシギン', color: '#a16207', line: '#3f2a0a', rate: 0.02, desc: '茶色のまだらもようと長いくちばしをもつ鳥、オオジシギ。夏の草原の空で、急降下しながら尾羽を「ズビャーク」とふるわせて大きな音を出すので「かみなりしぎ」ともよばれる。いきおいよく急降下して、答えにまっすぐ飛びこむ。' },
  { id: 'ashyminivet', name: 'サンショウクイン', egg: 'さんしょうのはいいろタマゴ', token: 'サンショ', bigToken: 'サンショウクイン', color: '#94a3b8', line: '#0f172a', rate: 0.02, desc: '白と灰色と黒のすっきりした体をもつ夏の鳥、サンショウクイ。「ヒリリン、ヒリリン」と鳴く声が、山椒を食べて口がひりひりしているように聞こえることから名前がついたといわれる。ぴりっとした声で、ねむけをさまして集中させてくれる。' },
  { id: 'lessercuckoo', name: 'ホトトギスン', egg: 'うのはなのしろタマゴ', token: 'ホトト', bigToken: 'ホトトギスン', color: '#64748b', line: '#1e293b', rate: 0.02, desc: '灰色の体に、しまもようのおなかをもつ夏の鳥、ホトトギス。「トッキョキョカキョク」と聞こえる声で、夜でもよく鳴く。むかしから和歌や俳句によまれてきた鳥で、ことばの美しさを伝えてくれる。' },
  { id: 'dollarbird', name: 'ブッポウソウン', egg: 'そらいろのしんりんタマゴ', token: 'ブッポ', bigToken: 'ブッポウソウン', color: '#0e7490', line: '#164e63', rate: 0.02, desc: '青緑色の体に、赤いくちばしをもつ夏の鳥、ブッポウソウ。飛ぶとつばさに白い丸いもようが見える。空中でくるりと回って虫をつかまえる名人で、むずかしい問題もすばやくつかまえる。' },
  { id: 'bamboopartridge', name: 'コジュケイン', egg: 'たけやぶのまだらタマゴ', token: 'コジュ', bigToken: 'コジュケイン', color: '#a16207', line: '#422006', rate: 0.02, desc: 'ずんぐりした体に、だいだい色の顔をもつ鳥、コジュケイ。竹やぶや林で暮らし、「チョットコイ、チョットコイ」と聞こえる大きな声で鳴く。その声で、聞き取りの練習に「ちょっと来い」と呼んでくれる。' },
  { id: 'copperpheasant', name: 'ヤマドリン', egg: 'やまおくのあかがねタマゴ', token: 'ヤマド', bigToken: 'ヤマドリン', color: '#b45309', line: '#451a03', rate: 0.02, desc: 'あかがね色にかがやく体と、とても長い尾をもつ鳥、ヤマドリ。日本にしかすまない鳥で、山おくの森でつばさを打ち鳴らして「ドドドド」と音を出す。長い尾のように、長い文も最後までしっかり読みとおす力をくれる。' },
  { id: 'blackwoodpecker', name: 'クマゲラン', egg: 'ぶなもりのくろタマゴ', token: 'クマゲ', bigToken: 'クマゲラン', color: '#1c1917', line: '#0c0a09', rate: 0.02, desc: '体じゅうが黒く、頭のてっぺんだけが赤い大きなキツツキ、クマゲラ。北海道や東北のブナの森にすみ、太い木に大きな四角い穴をほる。力強いドラミングで、長文の読解にも大きな穴をあけて道をつくる。' },
  { id: 'lidthsjay', name: 'ルリカケスン', egg: 'あまみのるりいろタマゴ', token: 'ルリカ', bigToken: 'ルリカケスン', color: '#1e40af', line: '#1c1917', rate: 0.02, desc: 'るり色の頭とつばさに、茶色のせなかをもつ鳥、ルリカケス。奄美大島などにしかすまない、世界でここだけの鳥。どんぐりを地面にかくしてたくわえるかしこい鳥で、覚えた単語もしっかりしまっておいてくれる。' },
  { id: 'hawfinch', name: 'シメリン', egg: 'こがらしのちゃいろタマゴ', token: 'シメ', bigToken: 'シメリン', color: '#c2410c', line: '#431407', rate: 0.02, desc: '茶色の体に、とても太いくちばしをもつ冬の鳥、シメ。目のまわりの黒いもようで、いつもむすっとした顔に見える。かたい木の実のからも割る力もちで、むずかしい単語もがっちりかみくだく。' },
  { id: 'japanesegreenwoodpecker', name: 'アオゲラン', egg: 'こだまのみどりタマゴ', token: 'アオゲ', bigToken: 'アオゲラン', color: '#65a30d', line: '#1a2e05', rate: 0.02, desc: '緑色のせなかに赤い頭をもつキツツキ、アオゲラ。日本にしかすまない鳥で、森の木を「コツコツコツ」とたたいて虫をさがす。何度もたたいて、かたい問題にも穴をあけてくれる。' },
  { id: 'siskin', name: 'マヒワン', egg: 'まつぼっくりのきみどりタマゴ', token: 'マヒ', bigToken: 'マヒワン', color: '#a3e635', line: '#3f6212', rate: 0.02, desc: 'あざやかな黄緑色の小さな鳥、マヒワ。冬になると群れで山からおりてきて、マツやハンノキの実を器用についばむ。みんなでいっしょに飛ぶのが得意で、仲間と力を合わせて単語を覚えさせてくれる。' },
  { id: 'japanesegrosbeak', name: 'イカルン', egg: 'まめわりのきいろタマゴ', token: 'イカル', bigToken: 'イカルン', color: '#94a3b8', line: '#1e293b', rate: 0.02, desc: '黒い頭に、太くて黄色いくちばしをもつ鳥、イカル。かたい木の実もパチンとわって食べる。「キーコーキー」と鳴く声が「お菓子くれ」や「月日星」に聞こえるといわれる。むずかしい文も、太いくちばしでかんたんに分解してくれる。' },
  { id: 'ruddykingfisher', name: 'アカショウビン', egg: 'あまやどりのあかタマゴ', token: 'アカシ', bigToken: 'アカショウビン', color: '#ea580c', line: '#7c2d12', rate: 0.02, desc: '体じゅうが燃えるような赤だいだい色の鳥、アカショウビン。大きな赤いくちばしをもち、雨の前によく「キョロロロ…」と鳴くので「雨ごい鳥」ともよばれる。森の奥で、ふしぎな声で正しい答えを呼びよせる。' },
  { id: 'reedwarbler', name: 'ヨシキリン', egg: 'よしはらのちゃいろタマゴ', token: 'ヨシ', bigToken: 'ヨシキリン', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: '茶色のせなかに、口の中が赤い小鳥、オオヨシキリ。夏の川原のヨシ原で、ヨシのくきにつかまり「ギョギョシ、ギョギョシ」と大きな声で一日中鳴く。元気な声で、長い文も最後まで読みきる力をくれる。' },
  { id: 'bushwarbler', name: 'ウグイスン', egg: 'はるまちのうぐいす色タマゴ', token: 'ウグ', bigToken: 'ウグイスン', color: '#84cc16', line: '#365314', rate: 0.02, desc: 'うすい緑茶色の地味な小鳥、ウグイス。春になると「ホーホケキョ」と美しくさえずり、春を知らせる鳥とよばれる。すがたは目立たないが、よくとおる声で、耳から英語を覚えるのを助けてくれる。' },
  { id: 'narcissusflycatcher', name: 'キビタン', egg: 'こもれびのきいろタマゴ', token: 'キビ', bigToken: 'キビタン', color: '#facc15', line: '#1c1917', rate: 0.02, desc: '黒いせなかに、あざやかな黄色ののどとまゆをもつ小鳥、キビタキ。夏の林の木もれ日の中で「ピッコロロ」とよく通る声で歌う。明るい声で、むずかしい文の組み立ても楽しくしてくれる。' },
  { id: 'siberianblue', name: 'コルリン', egg: 'ささやぶのあおタマゴ', token: 'コル', bigToken: 'コルリン', color: '#2563eb', line: '#172554', rate: 0.02, desc: 'るり色のせなかと白いおなかの小鳥、コルリ。ササのやぶの中にかくれ、「チッチッ、ピンルルル」と美しくさえずるが、すがたはなかなか見せない。かくれた答えも、声をたよりに見つけ出す。' },
  { id: 'pitta', name: 'ヤイロチョウン', egg: 'やいろのもりタマゴ', token: 'ヤイロ', bigToken: 'ヤイロチョウン', color: '#22c55e', line: '#14532d', rate: 0.02, desc: '緑、青、赤、黄など八つの色をもつと言われる、森の宝石のような鳥、ヤイロチョウ。暗い森の地面を歩いてミミズをさがす、めったに出会えない鳥。いろいろな色の知識を組み合わせて答える。' },
  { id: 'stonechat', name: 'ノビタキン', egg: 'こうげんのくさのタマゴ', token: 'ノビ', bigToken: 'ノビタキン', color: '#fdba74', line: '#1c1917', rate: 0.02, desc: '黒い頭と、オレンジ色のむねをもつ高原の小鳥、ノビタキ。草のてっぺんにとまってあたりを見わたし、虫を見つけるとさっと飛びつく。てっぺんから全体を見て、すばやく答える。' },
  { id: 'paradiseflycatcher', name: 'サンコウチョウン', egg: 'つきひほしのタマゴ', token: 'サンコ', bigToken: 'サンコウチョウン', color: '#4c1d95', line: '#1e1b4b', rate: 0.02, desc: '目のまわりの青いリングと、オスのとても長い尾が美しい鳥、サンコウチョウ。鳴き声が「ツキ・ヒ・ホシ、ホイホイホイ」と聞こえるので「三光鳥」とよばれる。音のリズムを聞きわけて、英語の音をつかむ。' },
  { id: 'hawkeagle', name: 'クマタカン', egg: 'おくやまのそらタマゴ', token: 'クマタ', bigToken: 'クマタカン', color: '#a8a29e', line: '#292524', rate: 0.02, desc: '頭のうしろに短い冠羽、つばさに太いしまもようをもつ大きなタカ、クマタカ。深い山の森の王者で、谷の上を大きくまって全体を見わたす。長い文章も、上から全体を見わたして読みとく。' },
  { id: 'variedtit', name: 'ヤマガラン', egg: 'どんぐりのおみくじタマゴ', token: 'ヤマガ', bigToken: 'ヤマガラン', color: '#c2410c', line: '#1c1917', rate: 0.02, desc: 'オレンジ色のおなかと、黒と白の頭の小鳥、ヤマガラ。人によくなれ、木の実を足でおさえてくちばしでつつき、からを割って食べる。かたい問題も、こつこつつついて答えを取り出す。' },
  { id: 'nutcracker', name: 'ホシガラスン', egg: 'はいまつのタマゴ', token: 'ホシガ', bigToken: 'ホシガラスン', color: '#78350f', line: '#1c1917', rate: 0.02, desc: 'こげ茶色の体に、星のような白い点がちらばった高い山の鳥、ホシガラス。ハイマツの種をたくさん地面にかくし、冬になってもその場所をおぼえていて掘り出す。おぼえた単語を、必要なときにちゃんと思い出す。' },
  { id: 'yellowthroat', name: 'ミヤマホオジロン', egg: 'きいろいのどのタマゴ', token: 'ミヤマ', bigToken: 'ミヤマホオジロン', color: '#fde047', line: '#422006', rate: 0.02, desc: '黄色いのどと黄色いまゆ、黒い冠羽がかっこいい冬の小鳥、ミヤマホオジロ。林のふちで、ぴんと冠羽を立てて種をさがす。ぴんと気持ちを立てて、問題に向かう。' },
  { id: 'cattleegret', name: 'アマサギン', egg: 'たうえのあめいろタマゴ', token: 'アマサ', bigToken: 'アマサギン', color: '#fde68a', line: '#78350f', rate: 0.02, desc: '夏になると頭と首が亜麻色（だいだい色）になる白いサギ、アマサギ。田植えのころの田んぼで、トラクターや牛のあとをついて歩き、とび出した虫をとる。チャンスを見のがさず、すかさず答える。' },
  { id: 'nightheron', name: 'ゴイサギン', egg: 'よるのいけのタマゴ', token: 'ゴイ', bigToken: 'ゴイサギン', color: '#cbd5e1', line: '#1e293b', rate: 0.02, desc: '黒いせなかと赤い目、頭のうしろに白い飾り羽をもつサギ、ゴイサギ。昼は木の上で休み、夕方から夜に池や川で魚をとる。夜の静かな時間に、じっくり問題を考える。' },
  { id: 'goldcrest', name: 'キクイタダキン', egg: 'こがねのかんむりタマゴ', token: 'キクイ', bigToken: 'キクイタダキン', color: '#bef264', line: '#365314', rate: 0.02, desc: '日本でいちばん小さい鳥のなかま、キクイタダキ。頭のてっぺんに菊の花のような黄色い羽をのせている。体は小さくても、頭のかんむりのように、ひらめきはきらりと光る。' },
  { id: 'bunting', name: 'アオジン', egg: 'やぶのきみどりタマゴ', token: 'アオジ', bigToken: 'アオジン', color: '#a3b14a', line: '#3f4a1a', rate: 0.02, desc: '黄色いおなかと、オスは灰緑色の顔をもつ小鳥、アオジ。冬はやぶの中で「チッ、チッ」と小さく鳴きながら、地面の種をさがす。目立たなくても、こつこつ答えを見つける。' },
  { id: 'duskythrush', name: 'ツグミン', egg: 'ふゆのたんぼのタマゴ', token: 'ツグ', bigToken: 'ツグミン', color: '#a16207', line: '#292524', rate: 0.02, desc: '冬にシベリアからわたってくる鳥、ツグミ。田んぼや公園の地面をとっとっと走っては、ぴたりと止まってむねをはる。止まってよく考えてから、自信をもって答える。' },
  { id: 'greenfinch', name: 'カワラヒワン', egg: 'かわらのきいろタマゴ', token: 'カワラ', bigToken: 'カワラヒワン', color: '#a3a34a', line: '#3f3f1a', rate: 0.02, desc: 'オリーブ色の体に、飛ぶとつばさの黄色い帯がぱっと目立つ小鳥、カワラヒワ。川原や畑で「キリリ、コロロ」とかわいく鳴き、ヒマワリの種が大好き。ぱっと光るひらめきで答える。' },
  { id: 'goshawk', name: 'オオタカン', egg: 'はやてのタマゴ', token: 'オオタ', bigToken: 'オオタカン', color: '#64748b', line: '#0f172a', rate: 0.02, desc: '灰色のせなかと白いまゆ、するどい目をもつタカ、オオタカ。森の中を木のあいだをぬうように速く飛び、えものを追う。するどい目で、問題のポイントをすばやく見ぬく。' },
  { id: 'bulbul', name: 'ヒヨドリン', egg: 'つばきのみつのタマゴ', token: 'ヒヨ', bigToken: 'ヒヨドリン', color: '#9ca3af', line: '#1f2937', rate: 0.02, desc: '灰色の体と、ほおの茶色い点が目じるしの鳥、ヒヨドリ。「ヒーヨ、ヒーヨ」とにぎやかに鳴き、ツバキの花のみつや木の実が大好き。にぎやかに声を出して、英語の発音を楽しむ。' },
  { id: 'greattit', name: 'シジュウカラン', egg: 'すばこのタマゴ', token: 'シジュ', bigToken: 'シジュウカラン', color: '#e2e8f0', line: '#0f172a', rate: 0.02, desc: '白いほおと、むねの黒いネクタイもようが目じるしの小鳥、シジュウカラ。鳴き声を組み合わせて仲間に「気をつけて、集まれ」などと伝えると研究されている。ことばを組み合わせて、英語の文を作る。' },
  { id: 'bluetail', name: 'ルリビタキン', egg: 'やまのあおぞらタマゴ', token: 'ルリビ', bigToken: 'ルリビタキン', color: '#3b82f6', line: '#1e3a8a', rate: 0.02, desc: 'るり色のせなかと、わきのだいだい色がきれいな小鳥、ルリビタキ。夏は高い山の林で、冬は低い山や公園で見られる。季節に合わせて場所をかえるように、問題に合わせて考え方をかえる。' },
  { id: 'redstart', name: 'ジョウビタキン', egg: 'かきねのだいだいタマゴ', token: 'ジョウ', bigToken: 'ジョウビタキン', color: '#f97316', line: '#431407', rate: 0.02, desc: 'だいだい色のおなかと、つばさの白い紋が目じるしの冬の小鳥、ジョウビタキ。おじぎをしながら尾をふるわせ、「ヒッ、ヒッ、カッ、カッ」と鳴く。礼儀正しく、ていねいに答える。' },
  { id: 'pygmywoodpecker', name: 'コゲラン', egg: 'こつこつえだのタマゴ', token: 'コゲ', bigToken: 'コゲラン', color: '#a8a29e', line: '#292524', rate: 0.02, desc: '日本でいちばん小さいキツツキ、コゲラ。茶色と白のしまもようで、町の公園の木でも「コツコツ」と幹をたたいて虫をさがす。小さなくちばしでこつこつ進むように、毎日少しずつ学ぶ。' },
  { id: 'longtailedtit', name: 'エナガン', egg: 'ゆきのだいふくタマゴ', token: 'エナ', bigToken: 'エナガン', color: '#f8fafc', line: '#334155', rate: 0.02, desc: 'まるい体に長い尾、雪のように白い顔をもつ小鳥、エナガ。「雪の妖精」ともよばれ、冬は仲間とぴったりくっついてねむる。小さくても、仲間といっしょならどんな問題もこわくない。' },
  { id: 'whiteeye', name: 'メジロン', egg: 'うめのはなのタマゴ', token: 'メジ', bigToken: 'メジロン', color: '#84cc16', line: '#365314', rate: 0.02, desc: 'うぐいす色の体と、目のまわりの白い輪がかわいい小鳥、メジロ。梅や桜の花のみつが大好きで、枝にならんでとまる「目白おし」の名前のもとになった。友だちとならんで、いっしょに学ぶ。' },
  { id: 'bullfinch', name: 'ウソン', egg: 'くちぶえのタマゴ', token: 'ウソ', bigToken: 'ウソン', color: '#cbd5e1', line: '#1e293b', rate: 0.02, desc: '黒いぼうしと、オスは赤いほおをもつ小鳥、ウソ。口笛のような「フィー、フィー」というやさしい声でなく。名前はウソだけど、答えはいつもほんとう。' },
  { id: 'rosefinch', name: 'ベニマシコン', egg: 'あかいのはらのタマゴ', token: 'ベニ', bigToken: 'ベニマシコン', color: '#f9a8d4', line: '#831843', rate: 0.02, desc: 'ばら色の体に白いつばさのもようをもつ小鳥、ベニマシコ。冬の野原で草の実をついばみ、「フィッ、フィッ」とやさしく鳴く。小さな実をひとつずつ食べるように、こつこつ学ぶ。' },
  { id: 'thrush', name: 'シロハラン', egg: 'おちばのしたのタマゴ', token: 'シロハ', bigToken: 'シロハラン', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: '冬に林へやってくる、白っぽいおなかのツグミのなかま、シロハラ。落ち葉をくちばしでがさがさとかき分けて、下にかくれた虫を見つける。かくれた答えも、ていねいにさがせば見つかる。' },
  { id: 'waxwing', name: 'キレンジャクン', egg: 'ふゆのみのタマゴ', token: 'レンジ', bigToken: 'キレンジャクン', color: '#d6b48a', line: '#57351a', rate: 0.02, desc: '頭にとがった冠羽、尾の先に黄色い帯をもつ鳥、キレンジャク。冬に群れでやってきて、木の実をみんなでなかよく食べる。実をひとつずつ食べるように、単語をひとつずつおぼえる。' },
  { id: 'dunlin', name: 'ハマシギン', egg: 'ひがたのむれのタマゴ', token: 'ハマシ', bigToken: 'ハマシギン', color: '#d6d3d1', line: '#44403c', rate: 0.02, desc: '干潟で大きなむれをつくる小さな鳥、ハマシギ。何千羽もがいっせいに向きをかえて飛び、空に波のようなもようをえがく。みんなでいっしょに学べば、むずかしい問題もこわくない。' },
  { id: 'orientalcuckoo', name: 'ツツドリン', egg: 'ぽぽぽのタマゴ', token: 'ツツ', bigToken: 'ツツドリン', color: '#94a3b8', line: '#334155', rate: 0.02, desc: '「ポポ、ポポ」とつつをたたくような声でなく鳥、ツツドリ。カッコウのなかまで、夏の山の林にやってくる。つつをたたくようなリズムで、こつこつ単語をおぼえる。' },
  { id: 'crestedkingfisher', name: 'ヤマセミン', egg: 'けいりゅうのしろいタマゴ', token: 'ヤマセ', bigToken: 'ヤマセミン', color: '#e5e7eb', line: '#111827', rate: 0.02, desc: '白と黒のまだらもようで、頭にぼさぼさの冠羽をもつ大きなカワセミのなかま、ヤマセミ。山の渓流で、高い枝から水にとびこんで魚をとる。ねらいをさだめて、答えに一直線。' },
  { id: 'flycatcher', name: 'オオルリン', egg: 'たにまのあおいタマゴ', token: 'ルリ', bigToken: 'オオルリン', color: '#1d4ed8', line: '#172554', rate: 0.02, desc: 'こい青色のせなかと白いおなかの小鳥、オオルリ。春に南の国からやってきて、谷川のそばの高い木の上で、すんだ声で長くさえずる。きれいな声のように、英語をすらすら言えるようになりたい子。' },
  { id: 'jacana', name: 'レンカクン', egg: 'はすのはのタマゴ', token: 'レン', bigToken: 'レンカクン', color: '#f5f5f4', line: '#1c1917', rate: 0.02, desc: 'とても長い足のゆびで、ハスやスイレンの葉の上を歩く鳥、レンカク。夏は長い尾羽をもち、水にうかぶ葉の上をしずまずに進む。足もとが不安な問題でも、しずまずに答えまで進む。' },
  { id: 'treecreeper', name: 'キバシリン', egg: 'こけむすみきのタマゴ', token: 'キバ', bigToken: 'キバシリン', color: '#a16207', line: '#422006', rate: 0.02, desc: '木の皮そっくりのもようで、みきをらせんをえがいて上へ上へとのぼる小鳥、キバシリ。細くまがったくちばしで、すき間の虫を見つける。こつこつ上へ進んで、むずかしい問題にもたどりつく。' },
  { id: 'nightjar', name: 'ヨタカン', egg: 'よるのはらっぱのタマゴ', token: 'ヨタ', bigToken: 'ヨタカン', color: '#78716c', line: '#292524', rate: 0.02, desc: '木の皮のようなもようで、昼は枝の上でじっとかくれている鳥、ヨタカ。夜になると大きな口をあけて、飛びながら虫をとる。じっと待って、ここぞというときに答えをつかむ。' },
  { id: 'sandpiper', name: 'イソシギン', egg: 'みずぎわのタマゴ', token: 'イソ', bigToken: 'イソシギン', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: '川や池の水ぎわで、おしりを上下にふりながら歩く鳥、イソシギ。白いおなかと茶色のせなかで、すばやく飛び立つ。水ぎわのように、正解とまちがいのさかい目を見きわめる。' },
  { id: 'wagtail', name: 'セキレイン', egg: 'かわらいしのタマゴ', token: 'セキ', bigToken: 'セキレイン', color: '#e5e7eb', line: '#111827', rate: 0.02, desc: '白と黒の体で、長い尾を上下にふりながら歩く小鳥、セキレイ。川原や町の道をちょこちょこ走る。リズムよく尾をふるように、テンポよく問題に答える。' },
  { id: 'cuckoo', name: 'カッコウン', egg: 'もりのこだまのタマゴ', token: 'カッコ', bigToken: 'カッコウン', color: '#9ca3af', line: '#374151', rate: 0.02, desc: '「カッコウ」という名前どおりの声でなく鳥、カッコウ。夏のはじめに遠い南の国からわたってくる。森にひびく声のように、英語の音をはっきり聞きとる。' },
  { id: 'ptarmigan', name: 'ライチョウン', egg: 'こけももはらのタマゴ', token: 'ライチ', bigToken: 'ライチョウン', color: '#f1f5f9', line: '#475569', rate: 0.02, desc: '高い山にすむ鳥、ライチョウ。夏は茶色、冬はまっ白に羽の色をかえて、岩や雪にまぎれる。季節に合わせて変わるように、問題に合わせて考え方をかえる。' },
  { id: 'dipper', name: 'カワガラン', egg: 'かわぞこのタマゴ', token: 'カワガ', bigToken: 'カワガラン', color: '#5b4636', line: '#2b1d14', rate: 0.02, desc: 'こげ茶色の体の小鳥、カワガラス。冷たい谷川の中にもぐり、川底を歩いて虫をとる。速い流れにまけず、むずかしい問題にももぐって答えをさがす。' },
  { id: 'nuthatch', name: 'ゴジュウカラン', egg: 'さかさまのみきのタマゴ', token: 'ゴジュウ', bigToken: 'ゴジュウカラン', color: '#94a3b8', line: '#334155', rate: 0.02, desc: '青い灰色のせなかと黒い目すじをもつ小鳥、ゴジュウカラ。木のみきを頭を下にしてすいすいおりられる、めずらしい鳥。さかさまからでも答えを見つける。' },
  { id: 'harlequin', name: 'シノリガモン', egg: 'あらなみのもようタマゴ', token: 'シノリ', bigToken: 'シノリガモン', color: '#334155', line: '#0f172a', rate: 0.02, desc: '青い体に白いもようと茶色のわき腹をもつ、まるで道化師のようなカモ、シノリガモ。荒い波のうちよせる岩場がすきで、白波の中でもぐってえさをとる。' },
  { id: 'garganey', name: 'シマアジン', egg: 'しろいまゆげのたびタマゴ', token: 'シマア', bigToken: 'シマアジン', color: '#a8a29e', line: '#292524', rate: 0.02, desc: '目の上の白い長いまゆげのようなもようがめじるしのカモ、シマアジ（魚ではなく鳥）。春と秋に日本を通りすぎる旅鳥で、冬はアフリカや南アジアですごす。' },
  { id: 'scoter', name: 'クロガモン', egg: 'きいろいこぶのうみタマゴ', token: 'クロガ', bigToken: 'クロガモン', color: '#111827', line: '#030712', rate: 0.02, desc: '全身がまっ黒で、くちばしのつけねに黄色いこぶがあるカモ、クロガモ。冬の海で大きな群れになって波にゆられ、もぐって貝を食べる。' },
  { id: 'redcrest', name: 'アカハシハジロン', egg: 'オレンジあたまのふわふわタマゴ', token: 'アカハ', bigToken: 'アカハシハジロン', color: '#c2410c', line: '#1c1917', rate: 0.02, desc: 'ふわっとしたオレンジ色の頭と、まっ赤なくちばしがめじるしのカモ、アカハシハジロ。日本ではめずらしく、見られたらラッキーな冬の水鳥。' },
  { id: 'pochard', name: 'ホシハジロン', egg: 'あかいめのみずうみタマゴ', token: 'ホシハ', bigToken: 'ホシハジロン', color: '#d1d5db', line: '#111827', rate: 0.02, desc: '赤茶色の頭と赤い目、灰色の背中がめじるしのカモ、ホシハジロ。昼は水にうかんでねむり、夜になると水にもぐって水草や貝を食べる。' },
  { id: 'gadwall', name: 'オカヨシガモン', egg: 'こまかいもようのじみタマゴ', token: 'オカヨ', bigToken: 'オカヨシガモン', color: '#9ca3af', line: '#1f2937', rate: 0.02, desc: '一見じみな灰色だが、近くで見るとこまかい波のようなもようがとてもきれいなカモ、オカヨシガモ。ほかの鳥がもぐってとった水草を、そばでちゃっかりもらうこともある。' },
  { id: 'baikal', name: 'トモエガモン', egg: 'ともえもようのかおタマゴ', token: 'トモエ', bigToken: 'トモエガモン', color: '#a16207', line: '#1c1917', rate: 0.02, desc: '顔に黄色と緑のともえのようなもようがあるカモ、トモエガモ。シベリアで子育てをし、冬にはとても大きな群れで空をうずまくように飛ぶ。' },
  { id: 'falcated', name: 'ヨシガモン', egg: 'ナポレオンぼうしのタマゴ', token: 'ヨシガ', bigToken: 'ヨシガモン', color: '#6b7280', line: '#1f2937', rate: 0.02, desc: '頭のうしろの羽がたれさがり、帽子をかぶったように見えるカモ、ヨシガモ。おしりのあたりに鎌のように曲がった長い羽があり、冬の池や川で水草を食べる。' },
  { id: 'shoveler', name: 'ハシビロガモン', egg: 'しゃもじくちばしのみずべタマゴ', token: 'ハシビ', bigToken: 'ハシビロガモン', color: '#065f46', line: '#022c22', rate: 0.02, desc: 'しゃもじのように平たく広いくちばしをもつカモ、ハシビロガモ。なかまとぐるぐる回って水をかきまぜ、うかんできた小さなえさをくちばしでこしとって食べる。' },
  { id: 'wigeon', name: 'ヒドリガモン', egg: 'クリームいろのおでこタマゴ', token: 'ヒドリ', bigToken: 'ヒドリガモン', color: '#9a3412', line: '#1c1917', rate: 0.02, desc: '赤茶色の頭に、おでこのクリーム色のすじがめじるしのカモ、ヒドリガモ。「ピューウ」と笛のような声で鳴き、冬の水辺で草や海草を食べる。' },
  { id: 'pintail', name: 'オナガガモン', egg: 'ほそながしっぽのみずべタマゴ', token: 'オナガ', bigToken: 'オナガガモン', color: '#78716c', line: '#1c1917', rate: 0.02, desc: '細長くとがった尾と、すらりと長い首をもつカモ、オナガガモ。冬に日本の池や湖にたくさんやってきて、さかだちして水の底の草を食べる。' },
  { id: 'teal', name: 'コガモン', egg: 'みどりのめじりのちいさなタマゴ', token: 'コガモ', bigToken: 'コガモン', color: '#92400e', line: '#1c1917', rate: 0.02, desc: '日本でいちばん小さなカモのなかま、コガモ。くりいろの頭に、目のまわりから首へのびる緑のもようがあり、池からすばやくとび立てる。' },
  { id: 'goldeneye', name: 'ホオジロガモン', egg: 'きんいろのめのきのうろタマゴ', token: 'ホオジ', bigToken: 'ホオジロガモン', color: '#0f172a', line: '#020617', rate: 0.02, desc: '金色の目と、ほおの白い丸いもようがめじるしのカモ、ホオジロガモ。めずらしいことに木のあなに巣をつくり、ひなは高いところからぴょんととびおりて水へ向かう。' },
  { id: 'longtail', name: 'コオリガモン', egg: 'こおりのうみのながおタマゴ', token: 'コオリ', bigToken: 'コオリガモン', color: '#f8fafc', line: '#1f2937', rate: 0.02, desc: '長くとがった尾をもつ北の海のカモ、コオリガモ。とても深くまでもぐれるカモで、冬の冷たい海でも元気に貝や小さな生き物をさがす。' },
  { id: 'smew', name: 'ミコアイサン', egg: 'しろくろパンダがおタマゴ', token: 'ミコア', bigToken: 'ミコアイサン', color: '#ffffff', line: '#111827', rate: 0.02, desc: '白い体に黒いもようがあり、目のまわりが黒くてパンダのように見えるカモ、ミコアイサ。冬に日本の湖や川にやってきて、水にもぐって小魚をとる。' },
  { id: 'eider', name: 'ケワタガモン', egg: 'ふわふわはねのぶとんタマゴ', token: 'ケワタ', bigToken: 'ケワタガモン', color: '#f1f5f9', line: '#1e293b', rate: 0.02, desc: '北のこおった海でくらす大きなカモ、ケワタガモ。お母さんは自分のむねのやわらかい羽をぬいて巣にしき、タマゴをあたたかく守る。' },
  { id: 'merganser', name: 'ウミアイサン', egg: 'ぼさぼさあたまのうみタマゴ', token: 'ウミア', bigToken: 'ウミアイサン', color: '#166534', line: '#052e16', rate: 0.02, desc: '頭のうしろにぼさぼさの羽をもつカモのなかま、ウミアイサ。細いくちばしのふちにギザギザがあって、水中でつかまえた魚をすべらせずにくわえる。' },
  { id: 'grebe', name: 'カイツブリン', egg: 'みずうみのうきすタマゴ', token: 'カイツ', bigToken: 'カイツブリン', color: '#78350f', line: '#1c1917', rate: 0.02, desc: '水草で水にうかぶ巣をつくる小さな水鳥、カイツブリ。ぱっと水にもぐるのが得意で、ひなを背中にのせて泳ぐこともある。' },
  { id: 'scaup', name: 'スズガモン', egg: 'ふゆのうみのむれタマゴ', token: 'スズガ', bigToken: 'スズガモン', color: '#e5e7eb', line: '#111827', rate: 0.02, desc: '冬になると何千羽もの大きな群れで海や湾にやってくるカモ、スズガモ。水にもぐって貝や水草を食べ、黄色い目がめじるし。' },
  { id: 'petrel', name: 'ウミツバメン', egg: 'あらしのよるのちいさなタマゴ', token: 'ウミツ', bigToken: 'ウミツバメン', color: '#292524', line: '#0c0a09', rate: 0.02, desc: 'スズメほどの大きさしかない小さな海鳥、ウミツバメ。波の上で足をちょんちょんとつけながら、まるで水の上を歩くように飛んでえさをとる。' },
  { id: 'skimmer', name: 'ハサミアジン', egg: 'みずぎわのすれすれタマゴ', token: 'ハサミ', bigToken: 'ハサミアジン', color: '#1f2937', line: '#030712', rate: 0.02, desc: '下のくちばしが上より長い、ふしぎな形の水鳥、クロハサミアジサシ。水面すれすれを飛びながら下のくちばしで水を切り、ふれた魚をぱくっとつかまえる。' },
  { id: 'gull', name: 'ウミネコン', egg: 'みなとのにゃあにゃあタマゴ', token: 'ウミネ', bigToken: 'ウミネコン', color: '#f8fafc', line: '#334155', rate: 0.02, desc: 'ネコのような「ミャーオ」という声で鳴くカモメのなかま、ウミネコ。黄色いくちばしの先に赤と黒のもようがあり、尾には黒い帯がある。' },
  { id: 'auklet', name: 'ウミスズメン', egg: 'きたのしまのちびすけタマゴ', token: 'ウミス', bigToken: 'ウミスズメン', color: '#475569', line: '#0f172a', rate: 0.02, desc: '北の海にくらす小さな海鳥、エトロフウミスズメ。頭にくるんとした飾り羽があり、ミカンのようなにおいを出すといわれる。何万羽もの大きな群れで子育てをする。' },
  { id: 'tropicbird', name: 'ネッタイン', egg: 'みなみのしまのながおタマゴ', token: 'ネッタ', bigToken: 'ネッタイン', color: '#ffffff', line: '#1e293b', rate: 0.02, desc: '体より長い2本の白い尾羽をなびかせて飛ぶ南の海の鳥、ネッタイチョウ。高い空から海にとびこんで、魚やイカをつかまえる。' },
  { id: 'kittiwake', name: 'ミツユビン', egg: 'うみかぜのみつゆびタマゴ', token: 'ミツユ', bigToken: 'ミツユビン', color: '#f1f5f9', line: '#334155', rate: 0.02, desc: '後ろのゆびがほとんどなく、前の3本のゆびでがけにとまるカモメ、ミツユビカモメ。外洋でくらし、黒い足と黄色いくちばしがめじるし。' },
  { id: 'guillemot', name: 'ウミガラン', egg: 'がけっぷちのとんがりタマゴ', token: 'ウミガ', bigToken: 'ウミガラン', color: '#292524', line: '#0c0a09', rate: 0.02, desc: 'がけの細いたなに、なかまとぎっしりならんで子育てする海鳥、ウミガラス。タマゴは片方がとがっていて、ころがっても落ちにくい形をしている。' },
  { id: 'cormorant', name: 'ウミウン', egg: 'いわばのせんすいタマゴ', token: 'ウミウ', bigToken: 'ウミウン', color: '#0f172a', line: '#020617', rate: 0.02, desc: '水にもぐって魚をとるのが得意な黒い海鳥、ウミウ。もぐったあとは、岩の上で翼を広げてかわかす。日本では鵜飼いでも知られる。' },
  { id: 'albatross', name: 'アホウドリン', egg: 'しまのはるかぜタマゴ', token: 'アホウド', bigToken: 'アホウドリン', color: '#f9fafb', line: '#1f2937', rate: 0.02, desc: '鳥の中でもとくに長い翼をもつ海鳥、アホウドリ。風をうまく使って、ほとんど羽ばたかずに海の上を何千キロメートルも旅する。' },
  { id: 'frigatebird', name: 'グンカンドリン', egg: 'あかいふくろのそらタマゴ', token: 'グンカ', bigToken: 'グンカンドリン', color: '#111827', line: '#030712', rate: 0.02, desc: 'のどのまっ赤なふくろを風船のようにふくらませる海鳥、グンカンドリ。大きな翼でほとんど羽ばたかず、何日も空を飛びつづけられる。' },
  { id: 'skua', name: 'トウゾクン', egg: 'きたのうみのよこどりタマゴ', token: 'トウゾ', bigToken: 'トウゾクン', color: '#57534e', line: '#1c1917', rate: 0.02, desc: 'ほかの海鳥を追いかけて、えさを横取りすることもある力強い海鳥、トウゾクカモメ。北の海で子育てをし、冬は遠い南の海まで旅をする。' },
  { id: 'shearwater', name: 'ミズナギン', egg: 'なみのりかぜきりタマゴ', token: 'ミズナ', bigToken: 'ミズナギン', color: '#78716c', line: '#1c1917', rate: 0.02, desc: '長い翼で波の上すれすれをすべるように飛ぶ海鳥、オオミズナギドリ。陸では歩くのが苦手で、木にのぼって高いところから飛び立つ。' },
  { id: 'gannet', name: 'カツオドリン', egg: 'しおかぜのとびこみタマゴ', token: 'カツオド', bigToken: 'カツオドリン', color: '#fef3c7', line: '#1c1917', rate: 0.02, desc: '高い空から矢のように海へとびこむ海鳥、カツオドリ。とがったくちばしと、空気のクッションのある体で、深いところの魚もつかまえる。' },
  { id: 'oystercatcher', name: 'ミヤコドリン', egg: 'いそべのあかはしタマゴ', token: 'ミヤコ', bigToken: 'ミヤコドリン', color: '#1f2937', line: '#030712', rate: 0.02, desc: '黒と白の羽に、まっ赤で長いくちばしをもつ海べの鳥、ミヤコドリ。かたい貝のすきまにくちばしを差しこんで、上手にあけて食べる。' },
  { id: 'tern', name: 'アジサシン', egg: 'すなはまのたびだちタマゴ', token: 'アジサ', bigToken: 'アジサシン', color: '#e2e8f0', line: '#0f172a', rate: 0.02, desc: '細い羽とふたまたの尾をもつ海の鳥、アジサシ。空からまっすぐ水にとびこんで魚をとり、なかまには地球を半周以上わたるものもいる。' },
  { id: 'avocet', name: 'ソリハシ', egg: 'ひがたのしろくろタマゴ', token: 'ソリハ', bigToken: 'ソリハシ', color: '#f8fafc', line: '#1e293b', rate: 0.02, desc: '上にそりかえった長いくちばしをもつ水辺の鳥、ソリハシセイタカシギ。くちばしを左右にふって、浅い水の中のえさをさがす。' },
  { id: 'kestrel', name: 'チョウゲン', egg: 'がけのうえのとまりタマゴ', token: 'チョウゲ', bigToken: 'チョウゲン', color: '#c2410c', line: '#431407', rate: 0.02, desc: '空中で羽ばたきながらぴたっと止まれる小さなタカ、チョウゲンボウ。上からじっと地面を見て、ねらいをさだめる名人。' },
  { id: 'hoopoe', name: 'ヤツガシラン', egg: 'さばくのかんむりタマゴ', token: 'ヤツガ', bigToken: 'ヤツガシラン', color: '#fdba74', line: '#7c2d12', rate: 0.02, desc: '頭に大きなかんむりのような羽をもつヤツガシラ。おどろくとかんむりをぱっと広げ、長いくちばしで地面の虫をさがす。' },
  { id: 'harrier', name: 'チュウヒン', egg: 'あしはらのそよかぜタマゴ', token: 'チュウヒ', bigToken: 'チュウヒン', color: '#a8a29e', line: '#292524', rate: 0.02, desc: 'あしの原っぱの上を低くゆっくり飛ぶチュウヒ。風にのってすべるように進み、草の中の小さな動きも見のがさない。' },
  { id: 'buzzard', name: 'ノスリン', egg: 'のやまのふかふかタマゴ', token: 'ノスリ', bigToken: 'ノスリン', color: '#b45309', line: '#451a03', rate: 0.02, desc: '野原の上をゆったりとまうノスリ。高い木の上からじっとまわりを見わたし、えものを見つけるとすっとまいおりる。' },
  { id: 'kite', name: 'トビリン', egg: 'おかのうえのくるりタマゴ', token: 'トビリ', bigToken: 'トビリン', color: '#a16207', line: '#3f2a0a', rate: 0.02, desc: '空の高いところで、ぴーひょろろと鳴きながら輪をえがくトビ。風をつかまえて、ほとんど羽ばたかずに飛ぶ。' },
  { id: 'egret', name: 'シラサギン', egg: 'みずたのまっしろはねタマゴ', token: 'シラサ', bigToken: 'シラサギン', color: '#ffffff', line: '#475569', rate: 0.02, desc: '水田にすむまっ白なシラサギ。長い首をすっとのばして、水の中のえさをしずかにねらう、上品な子。' },
  { id: 'swift', name: 'アマツバン', egg: 'くもまのはやてタマゴ', token: 'アマツ', bigToken: 'アマツバン', color: '#64748b', line: '#0f172a', rate: 0.02, desc: '空の上でほとんどの時間をすごすアマツバメ。細長いつばさで風を切り、だれよりも速く空をかける。' },
  { id: 'jay', name: 'カケスン', egg: 'どんぐりやまのあおいタマゴ', token: 'カケ', bigToken: 'カケスン', color: '#93c5fd', line: '#1e3a8a', rate: 0.02, desc: 'つばさに青いもようのあるカケス。秋にどんぐりを土にうめてたくわえ、冬になるとその場所を思い出して食べる。' },
  { id: 'starling', name: 'ムクドリン', egg: 'のきしたのにぎやかタマゴ', token: 'ムク', bigToken: 'ムクドリン', color: '#57534e', line: '#1c1917', rate: 0.02, desc: '夕方になると大きな群れで空をまうムクドリ。みんなで息を合わせて、空に大きなもようをえがく。' },
  { id: 'magpie', name: 'カササギン', egg: 'さとやまのしましまタマゴ', token: 'カサ', bigToken: 'カササギン', color: '#1e293b', line: '#020617', rate: 0.02, desc: '白と黒のつばさに長いしっぽのカササギ。光るものが気になって、いろいろなものをじっと観察する、ものしりな子。' },
  { id: 'vole', name: 'ハタネン', egg: 'はたけのこっそりタマゴ', token: 'ハタネ', bigToken: 'ハタネン', color: '#b45309', line: '#431407', rate: 0.02, desc: '野原の土の中に通り道をつくるハタネズミ。草のかげからこっそり顔を出して、まわりをよく見ている。' },
  { id: 'mink', name: 'ミンクン', egg: 'かわべのつやつやタマゴ', token: 'ミンク', bigToken: 'ミンクン', color: '#78350f', line: '#1c0a00', rate: 0.02, desc: '川べりにすむミンク。つやつやの毛で水をはじき、泳ぎも木登りもじょうずなよくばりさん。' },
  { id: 'shrew', name: 'トガリン', egg: 'おちばのちくちくタマゴ', token: 'トガ', bigToken: 'トガリン', color: '#a8a29e', line: '#292524', rate: 0.02, desc: '落ち葉の下をせわしなく動くトガリネズミ。とがった鼻でにおいをかぎ、いつもいそがしく食べ物をさがしている。' },
  { id: 'marten', name: 'テンテン', egg: 'きのうろのふわふわタマゴ', token: 'テンテ', bigToken: 'テンテン', color: '#facc15', line: '#713f12', rate: 0.02, desc: '森の木の上をすばやくかけまわるテン。冬になると毛が黄色くかがやき、細い枝の上もすいすい進む。' },
  { id: 'lemming', name: 'レミンガ', egg: 'ツンドラのころりタマゴ', token: 'レミ', bigToken: 'レミンガ', color: '#d97706', line: '#451a03', rate: 0.02, desc: '寒い北の草原にすむ小さなレミング。雪の下にトンネルをほって、冬のあいだも元気に動きまわる。' },
  { id: 'ermine', name: 'オコジョン', egg: 'ゆきやまのまっしろタマゴ', token: 'オコ', bigToken: 'オコジョン', color: '#f8fafc', line: '#334155', rate: 0.02, desc: '高い山にすむ小さなオコジョ。冬になると毛がまっ白にかわり、雪の中をすばしっこく走りまわる。' },
  { id: 'bushbaby', name: 'ガラゴン', egg: 'よぞらのまんまるタマゴ', token: 'ガラ', bigToken: 'ガラゴン', color: '#d6c4a8', line: '#57442c', rate: 0.02, desc: '夜の森で木から木へとびうつる小さなガラゴ。大きな目と耳で、暗やみの中でもしっかり見て聞いている。' },
  { id: 'condor', name: 'コンドルン', egg: 'たかいがけのおおきなタマゴ', token: 'コンド', bigToken: 'コンドルン', color: '#334155', line: '#0f172a', rate: 0.02, desc: '高い山のがけにすむ大きな鳥コンドル。つばさをほとんど動かさず、上へのぼる風にのって空高く回る。' },
  { id: 'ibis', name: 'トキリン', egg: 'たんぼのももいろタマゴ', token: 'トキ', bigToken: 'トキリン', color: '#fbcfe8', line: '#9d174d', rate: 0.02, desc: '田んぼでえさをさがすトキ。つばさを広げると、うすいもも色がきらりと光る。ゆっくりでもあきらめない子。' },
  { id: 'stork', name: 'コウノトリン', egg: 'やねのうえのしろいタマゴ', token: 'コウノ', bigToken: 'コウノトリン', color: '#f1f5f9', line: '#1e293b', rate: 0.02, desc: '長い足と大きなつばさをもつコウノトリ。高い所に大きな巣をつくり、ゆったりと空をわたっていく。' },
  { id: 'finch', name: 'アトリン', egg: 'こずえのちょこんタマゴ', token: 'アト', bigToken: 'アトリン', color: '#f59e0b', line: '#78350f', rate: 0.02, desc: '冬になると群れでやってくる小鳥アトリ。小さなくちばしでかたい木の実もじょうずにわる。' },
  { id: 'lark', name: 'ヒバリン', egg: 'そらたかくのうたうタマゴ', token: 'ヒバ', bigToken: 'ヒバリン', color: '#d4a373', line: '#5c3d1e', rate: 0.02, desc: '春の畑から空高くまいあがり、歌いながら飛ぶヒバリ。高く高くのぼっていく元気な子。' },
  { id: 'wren', name: 'ミソサザン', egg: 'しげみのちいさなタマゴ', token: 'ミソ', bigToken: 'ミソサザン', color: '#a16207', line: '#422006', rate: 0.02, desc: '小さな体なのに大きな声で歌うミソサザイ。しっぽをぴんと立てて、しげみの中をすばしっこく動きまわる。' },
  { id: 'pheasant', name: 'キジリン', egg: 'やまみちのにじいろタマゴ', token: 'キジ', bigToken: 'キジリン', color: '#34d399', line: '#064e3b', rate: 0.02, desc: '山の道を力強く歩くキジ。顔は赤く、羽はみどりにかがやき、いざというときはぱっと飛び立つ。' },
  { id: 'newt', name: 'イモリン', egg: 'いずみのしっとりタマゴ', token: 'イモ', bigToken: 'イモリン', color: '#f87171', line: '#7f1d1d', rate: 0.02, desc: 'きれいな水の中にすむイモリ。おなかは赤くて、けがをしてもゆっくり体を治していく、ねばり強い子。' },
  { id: 'robin', name: 'コマドリン', egg: 'もりかげのさえずりタマゴ', token: 'コマ', bigToken: 'コマドリン', color: '#fb923c', line: '#7c2d12', rate: 0.02, desc: '森の木かげで高い声でさえずる小鳥。オレンジ色のむねをはって、毎朝いちばんに歌いはじめる。' },
  { id: 'quail', name: 'ウズラン', egg: 'のはらのころころタマゴ', token: 'ウズ', bigToken: 'ウズラン', color: '#d6b48a', line: '#78350f', rate: 0.02, desc: '草むらをちょこちょこ走る小さなウズラ。まるい体で地面をすばやく動き、こつこつ小さなたねを集めるのが得意。' },
  { id: 'heron', name: 'サギリン', egg: 'ひがたのすらりタマゴ', token: 'サギ', bigToken: 'サギリン', color: '#e2e8f0', line: '#334155', rate: 0.02, desc: '水辺に1本足で立つサギ。じっと動かずに水の中を見つめ、ここぞというときにすばやくくちばしをのばす。' },
  { id: 'dragonfly', name: 'トンボン', egg: 'みずべのすいすいタマゴ', token: 'トン', bigToken: 'トンボン', color: '#7dd3fc', line: '#075985', rate: 0.02, desc: '池の上をすいすい飛ぶトンボ。大きな目でまわりをぐるっと見わたし、空中でぴたっと止まってねらいをさだめる。' },
  { id: 'lizard', name: 'トカゲン', egg: 'いわかげのぽかぽかタマゴ', token: 'トカ', bigToken: 'トカゲン', color: '#86efac', line: '#166534', rate: 0.02, desc: 'あたたかい岩の上でひなたぼっこをするトカゲ。すばやく走ってはぴたっと止まり、まわりをよく見てから次の一歩をきめる。' },
  { id: 'shrimp', name: 'エビン', egg: 'いそべのぴちぴちタマゴ', token: 'エビ', bigToken: 'エビン', color: '#fca5a5', line: '#991b1b', rate: 0.02, desc: '岩のあいだを元気にはねるエビ。しっぽでぴょんと後ろにとぶように、まちがえてもすぐに体勢を立て直す。' },
  { id: 'moose', name: 'ヘラジカン', egg: 'きたのもりのおおつのタマゴ', token: 'ヘラ', bigToken: 'ヘラジカン', color: '#7c5a3c', line: '#3b2a1a', rate: 0.02, desc: '北の森にすむ、平たく大きなつのをもつヘラジカ。雪の中でもゆっくり力強く歩くように、どっしりとした学びを続ける。' },
  { id: 'anglerfish', name: 'チョウチンアンコン', egg: 'しんかいのあかりタマゴ', token: 'アン', bigToken: 'チョウチンアンコン', color: '#6b7280', line: '#111827', rate: 0.02, desc: 'まっくらな深海で頭の上の光でえものをさそうチョウチンアンコウ。暗い中でも小さな明かりをたよりに、正しい答えを見つける。' },
  { id: 'swallow', name: 'ツバメン', egg: 'のきさきのはるのタマゴ', token: 'ツバ', bigToken: 'ツバメン', color: '#1e3a8a', line: '#0f172a', rate: 0.02, desc: '春になると遠い南の国から海をこえてやってくるツバメ。長い旅をこなすように、毎日こつこつ英語の旅を続ける。' },
  { id: 'falcon', name: 'ハヤブサン', egg: 'がけのうえのはやてタマゴ', token: 'ハヤ', bigToken: 'ハヤブサン', color: '#94a3b8', line: '#1e293b', rate: 0.02, desc: '急降下のときには世界一速いともいわれるハヤブサ。するどい目でえものを見つけるように、問題の答えを一瞬で見ぬく。' },
  { id: 'boar', name: 'イノシシン', egg: 'やまのたきのいのししタマゴ', token: 'イノ', bigToken: 'イノシシン', color: '#a16207', line: '#422006', rate: 0.02, desc: '山を元気にかけまわるイノシシ。「猪突猛進」ということばのように、決めたらまっすぐ問題にぶつかっていく。' },
  { id: 'rhino', name: 'サイノン', egg: 'そうげんのつのタマゴ', token: 'ツノ', bigToken: 'サイノン', color: '#9ca3af', line: '#374151', rate: 0.02, desc: '大きな体と鼻の上のつのが目印のサイ。まっすぐ前に走りだすように、決めた目標に向かってぐんぐん進む。' },
  { id: 'sealion', name: 'アシカン', egg: 'みなとのいわばタマゴ', token: 'アシ', bigToken: 'アシカン', color: '#a8836a', line: '#4a3426', rate: 0.02, desc: '港の岩場で日なたぼっこをするアシカ。鼻の上でボールをのせるように、むずかしい単語もじょうずにバランスよく覚える。' },
  { id: 'gorilla', name: 'ゴリラン', egg: 'みどりのやまのたくましタマゴ', token: 'ゴリ', bigToken: 'ゴリラン', color: '#6b7280', line: '#111827', rate: 0.02, desc: '森でくらす力もちでやさしいゴリラ。むねをたたいて気持ちを伝えるように、大きな声で英語を言ってみるのが得意。' },
  { id: 'mudskipper', name: 'ムツゴロン', egg: 'ひがたのどろんこタマゴ', token: 'ムツ', bigToken: 'ムツゴロン', color: '#a3a380', line: '#4d4d26', rate: 0.02, desc: '干潟の上をむなびれではねまわるムツゴロウ。水の中でも陸でもくらせるように、どんな問題の形にもすぐなれる。' },
  { id: 'aardvark', name: 'ツチブタン', egg: 'さばんなのよるのタマゴ', token: 'ツチ', bigToken: 'ツチブタン', color: '#e7c6a5', line: '#6b4423', rate: 0.02, desc: '夜のサバンナで長い耳と鼻をつかってアリの巣を見つけるツチブタ。するどいつめで土をほるように、問題の答えをほり当てる。' },
  { id: 'clownfish', name: 'クマノミン', egg: 'いそぎんちゃくのおうちタマゴ', token: 'ノミ', bigToken: 'クマノミン', color: '#fb923c', line: '#7c2d12', rate: 0.02, desc: 'イソギンチャクの中を家にしてくらすクマノミ。なかまと助け合ってくらすように、相棒といっしょに力を合わせて問題にいどむ。' },
  { id: 'salamander', name: 'サンショウオン', egg: 'きよいかわのしずかなタマゴ', token: 'サン', bigToken: 'サンショウオン', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: 'きれいな川の底でじっとくらすオオサンショウウオ。大昔から姿をほとんど変えずに生きてきたように、こつこつ長く学びつづける。' },
  { id: 'goldfish', name: 'キンギョン', egg: 'なつまつりのすくいタマゴ', token: 'キン', bigToken: 'キンギョン', color: '#fb923c', line: '#9a3412', rate: 0.02, desc: '夏祭りでおなじみの赤い金魚。ひらひらと長いひれで水の中をおよぐように、楽しく軽やかに単語を覚える。' },
  { id: 'seaurchin', name: 'ウニン', egg: 'いわばのとげとげタマゴ', token: 'ウニ', bigToken: 'ウニン', color: '#a78bfa', line: '#3b0764', rate: 0.02, desc: '岩場でとげを立ててゆっくり動くウニ。たくさんのとげで身を守るように、まちがえやすい問題にもしっかり身がまえる。' },
  { id: 'honeybee', name: 'ミツバッチ', egg: 'はなばたけのみつタマゴ', token: 'ミツ', bigToken: 'ミツバッチ', color: '#fde047', line: '#713f12', rate: 0.02, desc: '花から花へとびまわって蜜を集めるミツバチ。仲間とダンスで花の場所を教え合うように、覚えたことをみんなと分かち合う。' },
  { id: 'sparrow', name: 'スズメン', egg: 'のきしたのちいさなタマゴ', token: 'スズ', bigToken: 'スズメン', color: '#d6a77a', line: '#57361f', rate: 0.02, desc: '町のどこにでもいる小さなスズメ。毎朝ちゅんちゅんとあいさつするように、毎日少しずつ英語にふれて習慣にする。' },
  { id: 'macaque', name: 'ニホンザルン', egg: 'ゆきやまのおんせんタマゴ', token: 'サル', bigToken: 'ニホンザルン', color: '#fbcfe8', line: '#78350f', rate: 0.02, desc: '雪の山で温泉に入ることもあるニホンザル。仲間のまねをして新しいことを覚えるように、英語もまねして楽しく身につける。' },
  { id: 'treefrog', name: 'アマガエルン', egg: 'あめあがりのはっぱタマゴ', token: 'アマ', bigToken: 'アマガエルン', color: '#86efac', line: '#14532d', rate: 0.02, desc: '雨の前によく鳴く小さなアマガエル。指の吸盤で葉にぴたっとくっつくように、覚えた単語をしっかりくっつけてはなさない。' },
  { id: 'nautilus', name: 'オウムガイン', egg: 'しんかいのうずまきタマゴ', token: 'オウ', bigToken: 'オウムガイン', color: '#fde7c8', line: '#7c2d12', rate: 0.02, desc: '大昔から姿をほとんど変えずに生きてきたオウムガイ。うずまきのからにへやを1つずつふやすように、知識を少しずつつみ重ねる。' },
  { id: 'wombat', name: 'ウォンバン', egg: 'あなぐらのころころタマゴ', token: 'ウォン', bigToken: 'ウォンバン', color: '#d6b98c', line: '#5b4636', rate: 0.02, desc: '地面に長いトンネルをほってくらすウォンバット。こつこつ穴をほりすすめるように、毎日少しずつ単語を覚えて深めていく。' },
  { id: 'skunk', name: 'スカンクン', egg: 'しましまのもりのタマゴ', token: 'スカ', bigToken: 'スカンクン', color: '#e5e7eb', line: '#111827', rate: 0.02, desc: '白と黒のしまもようが目立つスカンク。ふさふさのしっぽを立てて身を守るように、まちがえやすい問題にもしっかり立ち向かう。' },
  { id: 'beluga', name: 'シロイルン', egg: 'こおりのうみのうたタマゴ', token: 'シロ', bigToken: 'シロイルン', color: '#f1f5f9', line: '#475569', rate: 0.02, desc: '冷たい北の海にすむ白いシロイルカ。「海のカナリア」とよばれるほどいろいろな声で鳴くように、英語の音もまねして楽しく覚える。' },
  { id: 'crane', name: 'ツルリン', egg: 'しろいしっちのタマゴ', token: 'ツル', bigToken: 'ツルリン', color: '#f8fafc', line: '#334155', rate: 0.02, desc: '頭のてっぺんが赤い、白くて大きなタンチョウ。つがいで息を合わせておどるように、問題とリズムよく向き合う。' },
  { id: 'flyingfish', name: 'トビウオン', egg: 'なみのうえのつばさタマゴ', token: 'トビ', bigToken: 'トビウオン', color: '#7dd3fc', line: '#0c4a6e', rate: 0.02, desc: '大きなむなびれを広げて海の上を飛ぶトビウオ。波をこえて遠くまで飛ぶように、むずかしいレベルにもひと飛びでちょうせんする。' },
  { id: 'sunfish', name: 'マンボン', egg: 'おおうみのひなたタマゴ', token: 'マン', bigToken: 'マンボン', color: '#cbd5e1', line: '#475569', rate: 0.02, desc: '大きな海をのんびりただようマンボウ。海の表面で日なたぼっこをするように、あせらずゆっくり、自分のペースで単語を覚える。' },
  { id: 'mantis', name: 'カマキリン', egg: 'くさむらのみどりタマゴ', token: 'カマ', bigToken: 'カマキリン', color: '#86efac', line: '#166534', rate: 0.02, desc: '草むらでじっとかまえるカマキリ。大きなかまをすばやく動かすように、正しい答えをさっとつかまえる。' },
  { id: 'lynx', name: 'ヤマネコン', egg: 'ゆきのもりのみみタマゴ', token: 'ヤマ', bigToken: 'ヤマネコン', color: '#e7d3b0', line: '#5b4a33', rate: 0.02, desc: '雪の森にすむ、耳の先に黒い毛のあるオオヤマネコ。小さな音も聞きのがさない耳で、英語の音もしっかり聞き取る。' },
  { id: 'cheetah', name: 'チーターン', egg: 'ひろいそうげんのはやてタマゴ', token: 'チタ', bigToken: 'チーターン', color: '#fcd34d', line: '#78350f', rate: 0.02, desc: '草原をだれよりも速く走るチーター。一気に走りぬけるように、問題にもすばやく答えて連続正解をのばす。' },
  { id: 'pufferfish', name: 'フグリン', egg: 'ぷくぷくうみのタマゴ', token: 'フグ', bigToken: 'フグリン', color: '#fde68a', line: '#92400e', rate: 0.02, desc: 'おどろくと水をすってぷくっとふくらむフグ。体を大きくして身を守るように、まちがえてもへこまず、ふくらむ元気で次に向かう。' },
  { id: 'anteater', name: 'アリクイン', egg: 'みなみのもりのながいはなタマゴ', token: 'クイ', bigToken: 'アリクイン', color: '#d6c3a5', line: '#57442d', rate: 0.02, desc: '長い鼻と舌でアリをたくさん食べるアリクイ。小さなアリを1ぴきずつ見つけるように、小さな単語も1つずつのがさず覚える。' },
  { id: 'chinchilla', name: 'チンチラン', egg: 'たかいやまのふわふわタマゴ', token: 'チラ', bigToken: 'チンチラン', color: '#e5e7eb', line: '#4b5563', rate: 0.02, desc: '高い山の岩場にすむ、ふわふわの毛のチンチラ。砂あびで毛をきれいにするように、まちがえた単語もくり返してきれいに覚える。' },
  { id: 'shoebill', name: 'ハシビロン', egg: 'しずかなぬまのタマゴ', token: 'ハシ', bigToken: 'ハシビロン', color: '#cbd5e1', line: '#334155', rate: 0.02, desc: '沼地でじっと動かずに立つハシビロコウ。何時間でも待って一瞬で魚をつかまえるように、あわてずに問題をよく見て答える。' },
  { id: 'fireflysquid', name: 'ホタルイカン', egg: 'ふかいうみのひかりのタマゴ', token: 'イカ', bigToken: 'ホタルイカン', color: '#93c5fd', line: '#1e3a8a', rate: 0.02, desc: '春の夜の海で青く光るホタルイカ。暗い海でも光で仲間に合図を送るように、むずかしい問題でも答えの光を見つける。' },
  { id: 'coati', name: 'ハナグマン', egg: 'みなみのもりのタマゴ', token: 'ハナ', bigToken: 'ハナグマン', color: '#b45309', line: '#451a03', rate: 0.02, desc: '長い鼻としっぽをもつハナグマ。鼻で地面をかぎまわって食べ物を見つけるように、長文の中から答えのヒントをかぎ当てる。' },
  { id: 'reindeer', name: 'トナカイン', egg: 'ゆきのそりのタマゴ', token: 'トナ', bigToken: 'トナカイン', color: '#a16207', line: '#422006', rate: 0.02, desc: '雪の国で長い旅をするトナカイ。何百キロも歩きつづけるねばり強さで、毎日の単語の旅もこつこつ続ける。' },
  { id: 'phoenix', name: 'フェニックス', egg: 'ほのおのはねのタマゴ', token: 'フェ', bigToken: 'フェニックス', color: '#f97316', line: '#7c2d12', rate: 0.02, desc: '100体目の記念キャラ。伝説の火の鳥フェニックス。何度まちがえても炎の中からよみがえるように、あきらめずに単語をおぼえなおす。' },
  { id: 'flyingsquirrel', name: 'モモンガン', egg: 'よぞらのきのタマゴ', token: 'モモ', bigToken: 'モモンガン', color: '#d6d3d1', line: '#44403c', rate: 0.02, desc: '木から木へ皮のまくを広げてすべるように飛ぶモモンガ。文から文へひょいっと飛びうつるように、長文もすいすい読み進める。' },
  { id: 'stagbeetle', name: 'クワガッタ', egg: 'こならのタマゴ', token: 'クワ', bigToken: 'クワガッタ', color: '#57534e', line: '#1c1917', rate: 0.02, desc: '大きなあごをもつクワガタ。木のみきをがっちりはさんではなさないように、むずかしい熟語もがっちりつかむ。' },
  { id: 'mandarinduck', name: 'オシドリン', egg: 'いけのほとりのタマゴ', token: 'オシ', bigToken: 'オシドリン', color: '#fb923c', line: '#7c2d12', rate: 0.02, desc: 'あざやかな羽をもつオシドリ。いつもなかよく2羽で泳ぐように、英語と日本語をペアでしっかりおぼえる。' },
  { id: 'tarsier', name: 'メガネザルン', egg: 'よるのもりのタマゴ', token: 'メガ', bigToken: 'メガネザルン', color: '#d4a373', line: '#5c3d1e', rate: 0.02, desc: '体のわりにとても大きな目をもつメガネザル。暗い森でも虫を見つけるように、長い英文の中のヒントもしっかり見つける。' },
  { id: 'hornbill', name: 'サイチョーン', egg: 'ねったいりんのタマゴ', token: 'サイ', bigToken: 'サイチョーン', color: '#fde047', line: '#3f3f46', rate: 0.02, desc: '熱帯の森にすむサイチョウ。大きなくちばしで木の実を運び、森に種をまくように、おぼえた単語をあちこちで使って広げていく。' },
  { id: 'pika', name: 'ナキウサン', egg: 'がんばのタマゴ', token: 'ナキ', bigToken: 'ナキウサン', color: '#d6d3d1', line: '#57534e', rate: 0.02, desc: '高い山の岩場にすむナキウサギ。冬にそなえて草をこつこつためるように、単語も毎日少しずつためていく。' },
  { id: 'clione', name: 'クリオネン', egg: 'ひょうかいのタマゴ', token: 'クリ', bigToken: 'クリオネン', color: '#e0f2fe', line: '#0369a1', rate: 0.02, desc: '冷たい海をひらひら泳ぐクリオネ。「流氷の天使」とよばれるすきとおった体で、むずかしい英文もすっきり見通す。' },
  { id: 'molecricket', name: 'ケララ', egg: 'つちのなかのタマゴ', token: 'ケラ', bigToken: 'ケララ', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: '土の中にトンネルをほって暮らすケラ。小さな前足でどんどんほり進むように、単語の意味を深くまでほり下げる。' },
  { id: 'bison', name: 'バイソン', egg: 'だいそうげんのタマゴ', token: 'バイ', bigToken: 'バイソンキング', color: '#92400e', line: '#451a03', rate: 0.02, desc: '広い草原をむれで進むバイソン。ふぶきにも頭を向けてまっすぐ進むように、むずかしい問題にも正面から立ち向かう。' },
  { id: 'platypus', name: 'カモノハッシー', egg: 'ふしぎないずみのタマゴ', token: 'カモ', bigToken: 'カモノハッシー', color: '#a78bfa', line: '#4c1d95', rate: 0.02, desc: 'カモのようなくちばしをもつふしぎな動物カモノハシ。くちばしで水の中の小さな動きを感じとるように、文のちょっとしたちがいにも気づく。' },
  { id: 'koi', name: 'コイノボリン', egg: 'にしきいけのタマゴ', token: 'コイ', bigToken: 'コイノボリン', color: '#fb923c', line: '#7c2d12', rate: 0.02, desc: '池をゆうゆうと泳ぐニシキゴイ。滝をのぼって竜になるという言い伝えのように、むずかしい単語の滝もぐんぐんのぼる。' },
  { id: 'manta', name: 'マンタン', egg: 'さんごしょうのタマゴ', token: 'マン', bigToken: 'マンタン', color: '#60a5fa', line: '#1e3a8a', rate: 0.02, desc: '大きなひれで海をゆったり泳ぐマンタ。小さなプランクトンを大きな口でたくさん食べるように、単語もどんどん取りこむ。' },
  { id: 'walrus', name: 'セイウッチ', egg: 'きたのうみのタマゴ', token: 'セイ', bigToken: 'セイウッチ', color: '#d6a77a', line: '#5b3a1e', rate: 0.02, desc: '北の冷たい海にすむセイウチ。長いきばを氷に引っかけて体を持ち上げるように、むずかしい問題にもぐっと食らいつく。' },
  { id: 'hermitcrab', name: 'ヤドカリン', egg: 'まきがいのタマゴ', token: 'ヤド', bigToken: 'ヤドカリン', color: '#fdba74', line: '#7c2d12', rate: 0.02, desc: '貝がらを背おって暮らすヤドカリ。体が大きくなると新しい貝がらに引っこすように、おぼえた単語がふえるたびに一回り大きくなる。' },
  { id: 'ladybug', name: 'テントン', egg: 'ななほしのタマゴ', token: 'テン', bigToken: 'テントン', color: '#ef4444', line: '#450a0a', rate: 0.02, desc: '赤いせなかに黒い星のテントウムシ。草のてっぺんまでのぼってから飛び立つように、一つずつ上をめざして単語をおぼえる。' },
  { id: 'eagle', name: 'ワシーン', egg: 'たかねのタマゴ', token: 'ワシ', bigToken: 'ワシーン', color: '#d6d3d1', line: '#44403c', rate: 0.02, desc: '高い山の上を飛ぶワシ。空の上からでも小さなものを見つけるするどい目で、文の中の大事な単語を見のがさない。' },
  { id: 'beetle', name: 'カブトン', egg: 'くぬぎのタマゴ', token: 'カブ', bigToken: 'カブトン', color: '#a16207', line: '#422006', rate: 0.02, desc: '夏の森にすむカブトムシ。自分の体の何倍も重いものを持ち上げる力もちで、むずかしい単語もぐいっと持ち上げる。' },
  { id: 'kingfisher', name: 'カワセミン', egg: 'るりいろのタマゴ', token: 'カワ', bigToken: 'カワセミン', color: '#38bdf8', line: '#0c4a6e', rate: 0.02, desc: '川べりにすむ青い小鳥カワセミ。水の中の魚をねらって一直線に飛びこむように、正しい答えをすばやく見ぬく。' },
  { id: 'zebra', name: 'シマウマン', egg: 'しろくろのタマゴ', token: 'シマ', bigToken: 'シマウマン', color: '#f1f5f9', line: '#1e293b', rate: 0.02, desc: 'サバンナを走るシマウマ。しまもようは1頭ずつちがい、白と黒をきっちり見分けるように、にた単語もまちがえない。' },
  { id: 'gecko', name: 'ヤモリン', egg: 'まどべのタマゴ', token: 'ヤモ', bigToken: 'ヤモリン', color: '#86efac', line: '#166534', rate: 0.02, desc: '家を守るといわれるヤモリ。足のうらでかべにもぴたっとはりつき、一度おぼえた単語もはなさない。' },
  { id: 'yak', name: 'ヤクモ', egg: 'こうげんのタマゴ', token: 'ヤク', bigToken: 'ヤクモ', color: '#6b4f3a', line: '#2a1d14', rate: 0.02, desc: '高い山にすむ毛の長いヤク。寒さにもつかれにも強く、長い単語のリストもゆっくり一歩ずつのぼりきる。' },
  { id: 'tanuki', name: 'ポンタ', egg: 'さとやまのタマゴ', token: 'ポン', bigToken: 'ポンタ', color: '#a78b6d', line: '#3f2d1d', rate: 0.02, desc: '目のまわりが黒いタヌキ。おなかをぽんとたたいて元気を出し、むずかしい問題にもとぼけた顔で立ち向かう。' },
  { id: 'butterfly', name: 'チョウリン', egg: 'さなぎのタマゴ', token: 'チョウ', bigToken: 'チョウリン', color: '#c4b5fd', line: '#5b21b6', rate: 0.02, desc: 'あおむしからさなぎになり、羽を広げたチョウ。少しずつ変わっていく自分を楽しみながら、ひらひら英語を学ぶ。' },
  { id: 'starfish', name: 'ヒトデン', egg: 'いそだまりのタマゴ', token: 'ヒト', bigToken: 'ヒトデン', color: '#fb7185', line: '#9f1239', rate: 0.02, desc: '5本のうでの星の形のヒトデ。うでが1本とれてもまた生えてくる、あきらめない心のもちぬし。' },
  { id: 'kiwi', name: 'キウィン', egg: 'しだのもりのタマゴ', token: 'キウ', bigToken: 'キウィン', color: '#a16207', line: '#422006', rate: 0.02, desc: 'ニュージーランドの飛べない鳥キーウィ。長いくちばしの先の鼻で土の中をかぎ分けて、かくれた答えを見つけ出す。' },
  { id: 'puffin', name: 'パフィン', egg: 'がけのうえのタマゴ', token: 'パフ', bigToken: 'パフィン', color: '#f8fafc', line: '#111827', rate: 0.02, desc: 'カラフルなくちばしのツノメドリ。北の海のがけにすみ、くちばしにたくさんの魚ならぬ単語をくわえて帰ってくる。' },
  { id: 'firefly', name: 'ホタリン', egg: 'なつのよるのタマゴ', token: 'ホタ', bigToken: 'ホタリン', color: '#fef08a', line: '#3f6212', rate: 0.02, desc: 'おしりがぽわっと光るホタル。夏の夜の小川で、暗い中でも正しい答えを明るく照らしてくれる。' },
  { id: 'manatee', name: 'マナティン', egg: 'もばのタマゴ', token: 'マナ', bigToken: 'マナティン', color: '#b6c2cc', line: '#3f4a55', rate: 0.02, desc: 'あたたかい海でのんびり草を食べるマナティー。やさしい性格で、まちがえた問題もゆっくり一緒に見なおしてくれる。' },
  { id: 'fennec', name: 'フェネン', egg: 'さきゅうのタマゴ', token: 'フェネ', bigToken: 'フェネン', color: '#fde68a', line: '#92400e', rate: 0.02, desc: '大きな耳のフェネックギツネ。遠くの小さな音も聞きのがさず、英語の聞き取りが大の得意。' },
  { id: 'toucan', name: 'オオハシン', egg: 'フルーツのタマゴ', token: 'オオ', bigToken: 'オオハシン', color: '#1f2937', line: '#030712', rate: 0.02, desc: '大きなカラフルなくちばしのオニオオハシ。南の森でくだものを食べながら、明るい声で英語をくり返す。' },
  { id: 'armadillo', name: 'アルマン', egg: 'サボテンのタマゴ', token: 'アル', bigToken: 'アルマン', color: '#a8a29e', line: '#44403c', rate: 0.02, desc: 'かたいよろいのアルマジロ。くるんとボールのように丸まって、ころころ転がりながら答えにたどりつく。' },
  { id: 'snowleopard', name: 'ユキヒョン', egg: 'ゆきやまのタマゴ', token: 'ユキ', bigToken: 'ユキヒョン', color: '#e2e8f0', line: '#475569', rate: 0.02, desc: '雪山にすむユキヒョウ。ふさふさの長いしっぽでバランスをとり、むずかしい問題にもしずかにねらいをさだめる。' },
  { id: 'quokka', name: 'クオッカン', egg: 'えがおのタマゴ', token: 'クオ', bigToken: 'クオッカン', color: '#c9a27e', line: '#5a3a22', rate: 0.02, desc: '「世界一しあわせな動物」とよばれるクオッカ。いつもにっこり笑顔で、まわりのみんなを元気にする。' },
  { id: 'okapi', name: 'オカピン', egg: 'みつりんのタマゴ', token: 'オカ', bigToken: 'オカピン', color: '#7c4a32', line: '#2b1810', rate: 0.02, desc: '足にしまもようのあるオカピ。森の奥でひっそりくらす、はずかしがり屋の物知りで、むずかしい単語もこっそり知っている。' },
  { id: 'tapir', name: 'バクリン', egg: 'ゆめのタマゴ', token: 'バク', bigToken: 'バクリン', color: '#94a3b8', line: '#1e293b', rate: 0.02, desc: '白黒もようのマレーバク。こわい夢を食べてくれるといういい伝えがあり、ねる前の復習のおともが得意。' },
  { id: 'capybara', name: 'カピバン', egg: 'おんせんのタマゴ', token: 'カピ', bigToken: 'カピバン', color: '#b08968', line: '#5b3a1e', rate: 0.02, desc: 'おんせんが大好きなカピバラ。だれとでもなかよくなれて、のんびりおだやかに英語を楽しむ。' },
  { id: 'pangolin', name: 'センザン', egg: 'うろこのタマゴ', token: 'セン', bigToken: 'センザン', color: '#c8a27a', line: '#5c3d1e', rate: 0.02, desc: 'うろこのよろいを着たセンザンコウ。こまったときはくるんと丸まって、落ち着いてから考えなおす。' },
  { id: 'narwhal', name: 'イッカクン', egg: 'オーロラのタマゴ', token: 'イッカ', bigToken: 'イッカクン', color: '#cbd5e1', line: '#334155', rate: 0.02, desc: '長い1本のきばをもつイッカク。北の海の王子さまで、まっすぐなきばのように正しい答えをつらぬく。' },
  { id: 'axolotl', name: 'ウパリン', egg: 'みずくさのタマゴ', token: 'ウパ', bigToken: 'ウパリン', color: '#fbcfe8', line: '#9d174d', rate: 0.02, desc: 'えらがふさふさのウーパールーパー。いつもにこにこ顔で、まちがえてもすぐに元気をとりもどす。' },
  { id: 'lemur', name: 'ワオリン', egg: 'バオバブのタマゴ', token: 'ワオ', bigToken: 'ワオリン', color: '#d4d4d8', line: '#3f3f46', rate: 0.02, desc: 'しましまの長いしっぽのワオキツネザル。朝はみんなで日光浴をして、頭をすっきりさせてから勉強する。' },
  { id: 'redpanda', name: 'レサパン', egg: 'こずえのタマゴ', token: 'レサ', bigToken: 'レサパン', color: '#f97316', line: '#7c2d12', rate: 0.02, desc: 'しまもようのしっぽのレッサーパンダ。木の上でひなたぼっこしながら、英文をのんびり読みとく。' },
  { id: 'meerkat', name: 'ミーアン', egg: 'みはりだいのタマゴ', token: 'ミー', bigToken: 'ミーアン', color: '#e7c9a0', line: '#6b4423', rate: 0.02, desc: 'うしろ足ですっと立つミーアキャット。みんなの見はり役で、まちがいやすいところをいち早く見つける。' },
  { id: 'kangaroo', name: 'カンガルン', egg: 'ふくろのタマゴ', token: 'カン', bigToken: 'カンガルン', color: '#d6a46c', line: '#7c4a1e', rate: 0.02, desc: 'おなかのふくろに単語カードをしまうカンガルー。大きくジャンプして、むずかしい問題もひとっとび。' },
  { id: 'octopus', name: 'タコリン', egg: 'うみのタマゴ', token: 'タコ', bigToken: 'タコリ', color: '#fda4af', line: '#be123c', rate: 0.02, desc: '8本の足でいろいろできるタコ。日本語を英語に言いかえるのがすばやい。' },
]

export const speciesOf = (id: string | undefined): Species => SPECIES.find((x) => x.id === id) ?? SPECIES[0]

// 0〜1の乱数から種類を決める（割合は SPECIES の rate）
// dragonUp（週末）のときはドラコが2倍、そのぶんモチが少なくなる
export const DRAGON_UP = 0.1

export const PICKUP_UP = 0.08 // 日替わりピックアップの上乗せ（モチの分からまわす）

// モチ以外の rate は「出やすさの重み」。モチの rate はそのまま、のこり（1 − モチ）を重みの割合で分ける。
// こうしておくと、キャラを足してもほかの子の rate を下げなくてよい（合計はいつも100%）
export function baseRate(sp: Species): number {
  const mochi = SPECIES[0].rate
  if (sp.id === 'mochi') return mochi
  const others = SPECIES.reduce((a, x) => (x.id === 'mochi' ? a : a + x.rate), 0)
  return (sp.rate / others) * (1 - mochi)
}

export function speciesRate(sp: Species, dragonUp = false, pickup?: string): number {
  const up = (id: string) => (dragonUp && id === 'dragon' ? DRAGON_UP : 0) + (pickup && pickup !== 'mochi' && id === pickup ? PICKUP_UP : 0)
  if (sp.id === 'mochi') return baseRate(sp) - SPECIES.reduce((a, x) => a + up(x.id), 0)
  return baseRate(sp) + up(sp.id)
}

export function rollSpecies(r: number, dragonUp = false, pickup?: string): Species {
  let acc = 0
  for (const sp of SPECIES) {
    acc += speciesRate(sp, dragonUp, pickup)
    if (r < acc) return sp
  }
  return SPECIES[SPECIES.length - 1]
}

// 日替わりピックアップのキャラクター（モチ以外から、日付で決まる）
export function pickupOf(day: string): Species {
  const others = SPECIES.filter((sp) => sp.id !== 'mochi')
  const n = [...day].reduce((a, c) => a + c.charCodeAt(0), 0)
  return others[n % others.length]
}

// 種類をあてた姿：名前の「モチ」を種類の呼び名に、小さいうちは体の色も種類の色に
export function withSpecies(form: Form, species: string | undefined): Form {
  const sp = speciesOf(species)
  if (sp.id === 'mochi') return form
  const name = form.stage === 0 ? sp.egg : form.name.replace(/モチ/g, form.stage >= 3 ? sp.bigToken : sp.token)
  return form.stage < 3 ? { ...form, name, species: sp.id, color: sp.color, line: sp.line } : { ...form, name, species: sp.id }
}

// レベルの節目：10・50・100 になったらお祝い（🎟1）
export const LEVEL_MILESTONES = [10, 50, 100]
export const milestonesBetween = (from: number, to: number) => LEVEL_MILESTONES.filter((m) => from < m && m <= to)
