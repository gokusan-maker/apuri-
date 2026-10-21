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

export const SPECIES: Species[] = [
  { id: 'mochi', name: 'モチ', egg: 'ふしぎなタマゴ', token: 'モチ', bigToken: 'モチ', color: '', line: '', rate: 0.3, desc: 'ぷにぷにのなかよしモンスター。カードで単語をコツコツ覚えるのが好き。' },
  { id: 'fox', name: 'コンコン', egg: 'こがねのタマゴ', token: 'コン', bigToken: 'コンコ', color: '#fdba74', line: '#c2410c', rate: 0.16, desc: 'ふさふさしっぽのかしこいキツネ。文法のきまりを見ぬくのが得意。' },
  { id: 'penguin', name: 'ペンペン', egg: 'こおりのタマゴ', token: 'ペン', bigToken: 'ペンギ', color: '#93c5fd', line: '#1e3a8a', rate: 0.16, desc: 'よちよち歩きのペンギン。ばらばらの単語をきれいに並べるのが好き。' },
  { id: 'rabbit', name: 'ウサピョン', egg: 'つきのタマゴ', token: 'ピョン', bigToken: 'ピョンタ', color: '#fbcfe8', line: '#9d174d', rate: 0.16, desc: '長い耳のウサギ。どんな小さな英語の音も聞きのがさない。' },
  { id: 'cat', name: 'ニャンタ', egg: 'しましまのタマゴ', token: 'ニャン', bigToken: 'ニャンタ', color: '#cbd5e1', line: '#475569', rate: 0.12, desc: '気まぐれなネコ。日本語を英語に言いかえるのが得意。' },
  { id: 'dragon', name: 'ドラコ', egg: 'ほのおのタマゴ', token: 'ドラ', bigToken: 'ドラゴ', color: '#fca5a5', line: '#b91c1c', rate: 0.1, desc: 'めったに出会えない小さなドラゴン。育つと英語で話しはじめ、英文の意味を読みとくのが得意。' },
]

export const speciesOf = (id: string | undefined): Species => SPECIES.find((x) => x.id === id) ?? SPECIES[0]

// 0〜1の乱数から種類を決める（割合は SPECIES の rate）
// dragonUp（週末）のときはドラコが2倍、そのぶんモチが少なくなる
export const DRAGON_UP = 0.1

export const PICKUP_UP = 0.08 // 日替わりピックアップの上乗せ（モチの分からまわす）

export function speciesRate(sp: Species, dragonUp = false, pickup?: string): number {
  const up = (id: string) => (dragonUp && id === 'dragon' ? DRAGON_UP : 0) + (pickup && pickup !== 'mochi' && id === pickup ? PICKUP_UP : 0)
  if (sp.id === 'mochi') return sp.rate - SPECIES.reduce((a, x) => a + up(x.id), 0)
  return sp.rate + up(sp.id)
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
