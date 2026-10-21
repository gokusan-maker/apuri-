// 大学入試の塔：大学にちなんだ（名前をアレンジした）ボスに、下の階から順に挑戦する
import type { BossLook } from './boss'
import type { Level } from './words'

export type UnivBoss = BossLook & { id: string; floor: string; hint: string; levels: Level[]; hp: number; coins: number }

export const UNIV_BOSSES: UnivBoss[] = [
  { id: 'gate', deco: 'gate', taunt: { en: 'Only those who know their words may pass!', ja: '単語を知る者だけが通れるのだ！' }, floor: '1階', name: 'キョーツーゲートン', hint: '入試の最初の関門', desc: '全国の受験生が最初にくぐる大きな門の番人。', levels: ['中3', '高校基礎'], hp: 100, coins: 20, color: '#64748b', line: '#1e293b', eye: '#fde047' },
  { id: 'shachi', deco: 'shachi', taunt: { en: 'My golden scales shine brighter than your answers!', ja: 'わが金のうろこは、きみの答えより輝いておる！' }, floor: '2階', name: 'キンシャチホコング', hint: '金のしゃちほこの街の大学', desc: 'お城の屋根から飛び出した金色のしゃちほこの怪物。', levels: ['高校基礎'], hp: 110, coins: 25, color: '#eab308', line: '#713f12', eye: '#7f1d1d' },
  { id: 'aoba', deco: 'aoba', taunt: { en: 'Hoo! Show me your wisdom.', ja: 'ホー！きみのかしこさを見せてみよ。' }, floor: '3階', name: 'アオバフクロウル', hint: '青葉の山の大学', desc: '杜の都の山にすむ、物知りなフクロウの番人。', levels: ['高校基礎', '熟語'], hp: 115, coins: 25, color: '#16a34a', line: '#14532d', eye: '#fef9c3' },
  { id: 'clark', deco: 'clark', taunt: { en: 'Be ambitious! Can you beat me?', ja: '大志をいだけ！わしに勝てるかな？' }, floor: '4階', name: 'アンビシャスボーイズ', hint: '「大志をいだけ」の大学', desc: '北の大地で「大志をいだけ！」とさけぶ巨人。', levels: ['高校基礎', '熟語'], hp: 120, coins: 30, color: '#0ea5e9', line: '#0c4a6e', eye: '#f0f9ff' },
  { id: 'machikane', deco: 'machikane', taunt: { en: 'I have slept for a million years. Wake me with English!', ja: '百万年ねむっていた。英語で起こしてみよ！' }, floor: '5階', name: 'マチカネワニゴン', hint: 'ワニの化石が見つかった山の大学', desc: '大昔のワニの化石からよみがえった、なにわの守り神。', levels: ['高校基礎', '熟語'], hp: 125, coins: 30, color: '#a16207', line: '#422006', eye: '#fde68a' },
  { id: 'okuma', deco: 'okuma', taunt: { en: 'Ring the bell of the clock tower if you can!', ja: '時計塔の鐘を鳴らせるものなら鳴らしてみよ！' }, floor: '6階', name: 'オオクマタワーゴン', hint: '時計塔の大講堂がある大学', desc: '大講堂の時計塔にすみつく、都の西北のクマ。', levels: ['高校基礎', '熟語'], hp: 130, coins: 35, color: '#9f1239', line: '#4c0519', eye: '#fef3c7' },
  { id: 'penken', deco: 'penken', taunt: { en: 'The pen is mightier than the sword. Prove it!', ja: 'ペンは剣よりも強し。証明してみせよ！' }, floor: '7階', name: 'ペンケンナイト', hint: '「ペンは剣よりも強し」の大学', desc: 'ペンを剣のようにあやつる、三田の騎士。', levels: ['高校基礎', '熟語'], hp: 135, coins: 35, color: '#1e3a8a', line: '#172554', eye: '#fde047' },
  { id: 'tokeidai', deco: 'tokeidai', taunt: { en: 'Time is ticking. Answer quickly!', ja: '時は刻まれている。はやく答えよ！' }, floor: '8階', name: 'トケイダイオー', hint: '時計台のある古都の大学', desc: '古都の時計台にすむ、自由な学風の大王。', levels: ['高校基礎', '熟語'], hp: 145, coins: 40, color: '#7c2d12', line: '#431407', eye: '#fef08a' },
  { id: 'akamon', deco: 'akamon', taunt: { en: 'Only the best may pass the Red Gate!', ja: '赤い門を通れるのは、真の実力者だけだ！' }, floor: '最上階', name: 'アカモンドラゴン', hint: '赤い門のある大学', desc: '赤い門を守る、塔のいちばん上のドラゴン。たおせば英語の頂点！', levels: ['高校基礎', '熟語'], hp: 160, coins: 60, color: '#dc2626', line: '#450a0a', eye: '#fef9c3' },
]

export type UnivRecord = Record<string, string> // ボスid → 倒した日

// 1つ下の階のボスを倒すと次の階が開く
export function univUnlocked(i: number, rec: UnivRecord): boolean {
  return i === 0 || !!rec[UNIV_BOSSES[i - 1].id]
}

const KEY = 'eitan:univ'

export function loadUniv(): UnivRecord {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '{}') as unknown
    if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
    return Object.fromEntries(Object.entries(v).filter(([k, d]) => typeof d === 'string' && UNIV_BOSSES.some((b) => b.id === k))) as UnivRecord
  } catch {
    return {}
  }
}

export function saveUniv(r: UnivRecord): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(r))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
