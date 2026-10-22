// 項目ごとに育てるなかま：単語は相棒（モチなど）、文法はことばのモンスター（文房具・魔法の本など。動物ではない）、長文は竜（ドラゴン）
// 単語の相棒はこれまでどおり party / monster。文法と長文のなかまはここで別に育てる
import { levelInfo, xpToNext } from './monster'

export type Track = 'grammar' | 'reading'
export type Buddy = { xp: number; name?: string; species?: string } // species：なかまの種類（なければその項目の最初の種類）
export type Buddies = Record<Track, Buddy>

export type BuddyForm = { minLv: number; icon: string; name: string }
// レベルで姿がかわる（Lv.1 はタマゴ。XP がたまってLv.2になるとかえる）。進化のあいだも1レベルごとに見た目が少しずつ育つ（BuddyFigure の星）
export const BUDDY_FORMS: Record<Track, BuddyForm[]> = {
  // 文法：ことばと文房具のふしぎなモンスター（動物ではない）
  grammar: [
    { minLv: 1, icon: '🥚', name: 'ことばのタマゴ' },
    { minLv: 2, icon: '💧', name: 'インクぷる' },
    { minLv: 4, icon: '✏️', name: 'ペンボウ' },
    { minLv: 6, icon: '🧽', name: 'けしゴーン' },
    { minLv: 9, icon: '📓', name: 'ノートン' },
    { minLv: 13, icon: '💎', name: 'ルーンゴーレム' },
    { minLv: 20, icon: '🛡️', name: 'まどうしょナイト' },
    { minLv: 30, icon: '👑', name: 'ブンポウキング' },
  ],
  // 長文（読解）：ドラゴン・神秘系
  reading: [
    { minLv: 1, icon: '🥚', name: 'りゅうのタマゴ' },
    { minLv: 2, icon: '🦎', name: 'ちびドラ' },
    { minLv: 4, icon: '🐲', name: 'ベビードラゴン' },
    { minLv: 6, icon: '🐲', name: 'はばたきドラゴン' },
    { minLv: 9, icon: '🐉', name: 'ドラゴン' },
    { minLv: 13, icon: '🐉', name: 'ほしよみドラゴン' },
    { minLv: 20, icon: '🐉', name: 'せいりゅう（聖竜）' },
    { minLv: 30, icon: '🐉', name: 'つきのしんりゅう（月の神竜）' },
  ],
}
// 新しい姿に進化したときのお祝いコイン
export const EVO_COINS = 10
export const TRACK_LABEL: Record<Track, string> = { grammar: '文法', reading: '読解' }

export const buddyLevel = (b: Buddy) => levelInfo(b.xp)
export function buddyForm(track: Track, b: Buddy): BuddyForm {
  const lv = buddyLevel(b).level
  return [...BUDDY_FORMS[track]].reverse().find((f) => lv >= f.minLv)!
}

const KEY = 'eitan:buddies'
const clean = (v: unknown): Buddy => {
  const o = (v && typeof v === 'object' ? v : {}) as Partial<Buddy>
  return { xp: typeof o.xp === 'number' && o.xp >= 0 ? Math.floor(o.xp) : 0, ...(typeof o.name === 'string' && o.name ? { name: o.name } : {}), ...(typeof o.species === 'string' && o.species ? { species: o.species } : {}) }
}

export function loadBuddies(): Buddies {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, unknown>
    return { grammar: clean(v?.grammar), reading: clean(v?.reading) }
  } catch {
    return { grammar: { xp: 0 }, reading: { xp: 0 } }
  }
}

export function saveBuddies(b: Buddies): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(b))
  } catch {
    // 保存できなくても続ける
  }
}

// XP をあげる。レベルアップ・進化したかも返す
export function feedBuddy(b: Buddies, track: Track, amount: number): { buddies: Buddies; levelUp: boolean; evolved: BuddyForm | null } {
  const before = b[track]
  const after = { ...before, xp: before.xp + Math.max(0, Math.round(amount)) }
  const f0 = buddyForm(track, before)
  const f1 = buddyForm(track, after)
  return { buddies: { ...b, [track]: after }, levelUp: buddyLevel(after).level > buddyLevel(before).level, evolved: f1 !== f0 ? f1 : null }
}

// なかまに名前をつける（空なら名前を消す）
export const renameBuddy = (b: Buddies, track: Track, name: string): Buddies => {
  const { name: _old, ...rest } = b[track]
  void _old
  return { ...b, [track]: name ? { ...rest, name } : rest }
}

// 今の姿になってから何レベル上がったか（1レベルごとに星がふえて、育っているのが見える）
export function growthStars(track: Track, b: Buddy): number {
  return Math.min(5, buddyLevel(b).level - buddyForm(track, b).minLv)
}

// なかまの種類（属性ごと）。属性が「文法」のなかまは文法のわくにだけ、「読解」のなかまは読解のわくにだけおける。
// 同じ属性の中で入れかえられて、それぞれのなかまが自分の XP を持つ。2・3体目はその属性のなかまを育てると仲間になる
export type BuddySpecies = { id: string; label: string; prefix: string; hue: number; unlockLv: number }
export const BUDDY_SPECIES: Record<Track, BuddySpecies[]> = {
  grammar: [
    { id: 'kotoba', label: 'ことばモンスター', prefix: '', hue: 0, unlockLv: 1 },
    { id: 'hoshi', label: 'ほしのことばモンスター', prefix: 'ほしの', hue: 180, unlockLv: 5 },
    { id: 'honoo', label: 'ほのおのことばモンスター', prefix: 'ほのおの', hue: 300, unlockLv: 12 },
  ],
  reading: [
    { id: 'sora', label: 'そらの竜', prefix: '', hue: 0, unlockLv: 1 },
    { id: 'koori', label: 'こおりの竜', prefix: 'こおりの', hue: 160, unlockLv: 5 },
    { id: 'mori', label: 'もりの竜', prefix: 'もりの', hue: 250, unlockLv: 12 },
  ],
}
export const ATTR_LABEL: Record<Track | 'word', string> = { word: '単語', grammar: '文法', reading: '読解' }

export function speciesOf(track: Track, b: Buddy): BuddySpecies {
  return BUDDY_SPECIES[track].find((x) => x.id === b.species) ?? BUDDY_SPECIES[track][0]
}
// 姿の名前（種類つき：ほしのインクぷる など）
export const formName = (track: Track, b: Buddy) => speciesOf(track, b).prefix + buddyForm(track, b).name
// 名前（つけた名前があればそれ）
export const buddyName = (track: Track, b: Buddy) => b.name ?? formName(track, b)

// ベンチ（入れかえて休んでいるなかま）：属性ごとに 種類id → なかま
export type BuddyBox = Record<Track, Record<string, Buddy>>
const BOX_KEY = 'eitan:buddy-box'
export function loadBuddyBox(): BuddyBox {
  try {
    const v = JSON.parse(localStorage.getItem(BOX_KEY) ?? '{}') as Record<string, Record<string, unknown>>
    const side = (t: Track): Record<string, Buddy> => Object.fromEntries(Object.entries(v?.[t] ?? {}).filter(([id]) => BUDDY_SPECIES[t].some((x) => x.id === id)).map(([id, b]) => [id, { ...clean(b), species: id }]))
    return { grammar: side('grammar'), reading: side('reading') }
  } catch {
    return { grammar: {}, reading: {} }
  }
}
export function saveBuddyBox(box: BuddyBox): void {
  try {
    localStorage.setItem(BOX_KEY, JSON.stringify(box))
  } catch {
    // 保存できなくても続ける
  }
}

// その属性で育てたなかまのいちばん高いレベル（2・3体目が仲間になる条件）
export function bestLevel(track: Track, buddies: Buddies, box: BuddyBox): number {
  return Math.max(buddyLevel(buddies[track]).level, ...Object.values(box[track]).map((b) => buddyLevel(b).level))
}
// 仲間になっているか（その属性のなかまを育てる・属性のタマゴからかえる・いま出ている）
export const isUnlocked = (track: Track, sp: BuddySpecies, buddies: Buddies, box: BuddyBox) =>
  bestLevel(track, buddies, box) >= sp.unlockLv || box[track][sp.id] !== undefined || speciesOf(track, buddies[track]).id === sp.id

// 属性のタマゴ（ショップ）：まだ仲間でない文法・読解のなかまから1体（なにが出るかはお楽しみ）
export const ATTR_EGG_PRICE = 120
export function lockedSpecies(buddies: Buddies, box: BuddyBox): { track: Track; sp: BuddySpecies }[] {
  return (['grammar', 'reading'] as Track[]).flatMap((t) => BUDDY_SPECIES[t].filter((sp) => !isUnlocked(t, sp, buddies, box)).map((sp) => ({ track: t, sp })))
}
export function hatchAttrEgg(buddies: Buddies, box: BuddyBox, r: number): { box: BuddyBox; track: Track; sp: BuddySpecies } | null {
  const list = lockedSpecies(buddies, box)
  if (list.length === 0) return null
  const { track, sp } = list[Math.floor(r * list.length)]
  return { box: { ...box, [track]: { ...box[track], [sp.id]: { xp: 0, species: sp.id } } }, track, sp }
}

// 同じ属性のなかまと入れかえる（今のなかまはベンチへ。はじめての種類はタマゴから）
export function switchBuddy(buddies: Buddies, box: BuddyBox, track: Track, speciesId: string): { buddies: Buddies; box: BuddyBox } {
  const cur = buddies[track]
  const curId = speciesOf(track, cur).id
  if (curId === speciesId || !BUDDY_SPECIES[track].some((x) => x.id === speciesId)) return { buddies, box }
  const rest = { ...box[track], [curId]: { ...cur, species: curId } }
  const picked = rest[speciesId] ?? { xp: 0, species: speciesId }
  delete rest[speciesId]
  return { buddies: { ...buddies, [track]: { ...picked, species: speciesId } }, box: { ...box, [track]: rest } }
}

// そのレベルになるのに必要な XP（図鑑で、その姿の絵を出すため）
export function xpForLevel(lv: number): number {
  let xp = 0
  for (let l = 1; l < lv; l++) xp += xpToNext(l)
  return xp
}

// なかま図鑑：種類ごとに、いちばん育てたレベル（まだ会っていなければ 0）と、会えた姿の数
export function zukanOf(track: Track, buddies: Buddies, box: BuddyBox): { sp: BuddySpecies; level: number; seen: number }[] {
  return BUDDY_SPECIES[track].map((sp) => {
    const mate = speciesOf(track, buddies[track]).id === sp.id ? buddies[track] : box[track][sp.id]
    const level = mate ? buddyLevel(mate).level : 0
    return { sp, level, seen: BUDDY_FORMS[track].filter((f) => level >= f.minLv).length }
  })
}

// チームレベル：単語・文法・読解の3体のレベルの合計と、その称号
export const TEAM_TITLES: { min: number; name: string }[] = [
  { min: 0, name: 'かけだしチーム' },
  { min: 10, name: 'なかよしチーム' },
  { min: 30, name: 'がんばりチーム' },
  { min: 60, name: 'つわものチーム' },
  { min: 100, name: 'でんせつのチーム' },
]
export function teamOf(wordLevel: number, buddies: Buddies): { level: number; title: string; next: number | null; progress: number } {
  const level = wordLevel + buddyLevel(buddies.grammar).level + buddyLevel(buddies.reading).level
  const t = [...TEAM_TITLES].reverse().find((x) => level >= x.min)!
  const n = TEAM_TITLES.find((x) => x.min > level)
  // progress：今の称号から次の称号までのうち、どこまで来たか（0〜1。さいごの称号なら1）
  return { level, title: t.name, next: n ? n.min - level : null, progress: n ? (level - t.min) / (n.min - t.min) : 1 }
}

// チームの称号のごほうび：新しい称号になったら🎟1（称号ごとに1回）。はじめて記録するときは今の称号までを受け取りずみにする
const TEAM_KEY = 'eitan:team-title'
export const teamIndex = (level: number) => TEAM_TITLES.filter((x) => level >= x.min).length - 1
export function claimTeamTitle(level: number): number {
  const now = teamIndex(level)
  let saved: number | null = null
  try {
    const v = localStorage.getItem(TEAM_KEY)
    saved = v === null ? null : Number(v)
  } catch {
    return 0
  }
  if (saved !== null && now <= saved) return 0
  try {
    localStorage.setItem(TEAM_KEY, String(now))
  } catch {
    // 保存できなくても続ける
  }
  return saved === null ? 0 : now - saved // 上がった称号の数だけチケット
}

// タマゴのかけら：ボス部屋で勝つと1つ。PIECES_FOR_EGG こで属性のタマゴが無料でかえる
export const PIECES_FOR_EGG = 5
export const PIECES_FULL_COINS = 30 // もう全員なかまのときは、かわりにコイン
const PIECE_KEY = 'eitan:egg-pieces'
export function loadEggPieces(): number {
  try {
    const n = Number(localStorage.getItem(PIECE_KEY))
    return Number.isInteger(n) && n >= 0 ? n : 0
  } catch {
    return 0
  }
}
export function saveEggPieces(n: number): void {
  try {
    localStorage.setItem(PIECE_KEY, String(n))
  } catch {
    // 保存できなくても続ける
  }
}

// ホームでなかまを押したときの英語のひとこと（自作・和訳つき）
export const GO_LINES: Record<Track | 'word', { en: string; ja: string }> = {
  word: { en: "Let's learn some new words!", ja: '新しい単語を覚えよう！' },
  grammar: { en: "Grammar time! I'm ready.", ja: '文法の時間だ！ 準備オッケー。' },
  reading: { en: "Let's read a story together.", ja: 'いっしょにお話を読もう。' },
}

// 今日そのなかまが育った XP（ホームのカードに +N で出す）。日付がかわると0から
const TODAY_KEY = 'eitan:buddy-today'
export type BuddyToday = { day: string; grammar: number; reading: number }
export function loadBuddyToday(day: string): BuddyToday {
  try {
    const v = JSON.parse(localStorage.getItem(TODAY_KEY) ?? 'null') as Partial<BuddyToday> | null
    if (v && v.day === day) return { day, grammar: Number(v.grammar) || 0, reading: Number(v.reading) || 0 }
  } catch {
    // こわれていたら0から
  }
  return { day, grammar: 0, reading: 0 }
}
export function addBuddyToday(day: string, track: Track, amount: number): BuddyToday {
  const t = loadBuddyToday(day)
  const next = { ...t, [track]: t[track] + Math.max(0, Math.round(amount)) }
  try {
    localStorage.setItem(TODAY_KEY, JSON.stringify(next))
  } catch {
    // 保存できなくても続ける
  }
  return next
}

// なかま図鑑のコンプボーナス：1つの種類の姿を全部そろえると🎟（種類ごとに1回）
const COMP_KEY = 'eitan:zukan-comp'
export function loadZukanComp(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(COMP_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
export function claimZukanComp(key: string): string[] {
  const list = loadZukanComp()
  if (list.includes(key)) return list
  const next = [...list, key]
  try {
    localStorage.setItem(COMP_KEY, JSON.stringify(next))
  } catch {
    // 保存できなくても続ける
  }
  return next
}

// 文法チャレンジ・ボス部屋の上のなかまをタップしたときの英語のひとこと（自作・和訳つき）
export const TAP_LINES: Record<Track, { en: string; ja: string }[]> = {
  grammar: [
    { en: 'Every rule you learn makes me stronger!', ja: 'きみがルールを1つ覚えるたびに、ぼくは強くなるよ！' },
    { en: 'Mistakes are just practice in disguise.', ja: 'まちがいは、すがたをかえた練習なんだ。' },
    { en: "Let's try one more question!", ja: 'もう1問やってみよう！' },
  ],
  reading: [
    { en: 'I can smell a boss nearby.', ja: '近くにボスのにおいがするぞ。' },
    { en: 'Read carefully. The answer is in the story.', ja: 'よく読んで。答えはお話の中にあるよ。' },
    { en: 'Together, we can beat any boss!', ja: 'いっしょなら、どんなボスにも勝てる！' },
  ],
}
