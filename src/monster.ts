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
