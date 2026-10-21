// 相棒がいっしょに戦う：キャラクターごとの特技（タマゴのうちは応援だけ）
export type SkillId = 'fire' | 'guard' | 'foxfire' | 'cheer' | 'claw' | 'revive'
export type Skill = { id: SkillId; name: string; desc: string }

export const PARTNER_SKILLS: Record<string, Skill> = {
  dragon: { id: 'fire', name: '火の息', desc: '正解するたびに +3 ダメージ' },
  penguin: { id: 'guard', name: 'ペンギンガード', desc: '1回だけ、まちがえてもハートを守る' },
  fox: { id: 'foxfire', name: 'きつね火', desc: '3問正解ごとに +5 ダメージ' },
  rabbit: { id: 'cheer', name: 'ぴょんぴょん応援', desc: '2問正解ごとに必殺技ゲージ +1' },
  cat: { id: 'claw', name: 'ねこの目', desc: '会心の一撃が5秒以内まで出る' },
  mochi: { id: 'revive', name: 'もちもち根性', desc: '1回だけ、ハートが0になってもハート1でふんばる' },
}

export const skillOf = (species: string | undefined): Skill => PARTNER_SKILLS[species ?? 'mochi'] ?? PARTNER_SKILLS.mochi

// 特技レベル：ボス戦で特技が出た回数で上がる（Lv1→Lv2：10回、Lv3：30回）。Lv3で効果アップ
export const SKILL_LV_USES = [0, 10, 30]
export const skillLevel = (uses: number) => SKILL_LV_USES.filter((u) => uses >= u).length

// 正解したときの追加ダメージ（n は何問目の正解か）
export function skillDamage(skill: SkillId, n: number, lv = 1): number {
  if (skill === 'fire') return lv >= 3 ? 5 : 3
  if (skill === 'foxfire' && n % 3 === 0) return lv >= 3 ? 8 : 5
  return 0
}

// 正解したときの追加ゲージ（Lv3の応援は毎回）
export const skillGauge = (skill: SkillId, n: number, lv = 1) => (skill === 'cheer' && (lv >= 3 || n % 2 === 0) ? 1 : 0)

// 会心の一撃が出る時間（ミリ秒）
export const skillCritMs = (skill: SkillId, base: number, lv = 1) => (skill === 'claw' ? (lv >= 3 ? 6000 : 5000) : base)

// ガード・根性が1戦で使える回数
export const skillSaves = (skill: SkillId, lv = 1) => (skill === 'guard' && lv >= 3 ? 2 : 1)

// 相棒ごとの必殺技名と演出の色（必殺技ゲージが満タンのとき）
export const SPECIAL_MOVES: Record<string, { name: string; color: string }> = {
  mochi: { name: 'もちもちメテオプレス', color: '#22c55e' },
  fox: { name: 'きつね火ランページ', color: '#f97316' },
  penguin: { name: 'こおりのスライディング', color: '#0ea5e9' },
  rabbit: { name: 'ムーンジャンプキック', color: '#ec4899' },
  cat: { name: 'ねこパンチ百連発', color: '#a855f7' },
  dragon: { name: 'ドラゴンブレス・ゼロ', color: '#ef4444' },
}
export const specialOf = (species: string | undefined) => SPECIAL_MOVES[species ?? 'mochi'] ?? SPECIAL_MOVES.mochi

// ボスの弱点：ボスごとに弱点のキャラクターが決まっていて、その相棒だと正解ごとに追加ダメージ
export const WEAK_BONUS = 4
const WEAK_ORDER = ['mochi', 'fox', 'penguin', 'rabbit', 'cat', 'dragon']
export function weakOf(bossName: string): string {
  const n = [...bossName].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 9973, 3)
  return WEAK_ORDER[n % WEAK_ORDER.length]
}

// ボスのセリフへの相棒の返しセリフ（キャラクターごと）
export const PARTNER_REPLIES: Record<string, { en: string; ja: string }> = {
  mochi: { en: "We won't lose!", ja: 'ぼくたちは負けないよ！' },
  fox: { en: 'Too easy for us!', ja: 'そんなの、かんたんだよ！' },
  penguin: { en: 'Stay cool and do our best!', ja: 'おちついて、がんばろう！' },
  rabbit: { en: "Let's jump right in!", ja: 'さあ、とびこもう！' },
  cat: { en: 'I am not afraid of you.', ja: 'きみなんか、こわくないにゃ。' },
  dragon: { en: 'Feel the power of words!', ja: 'ことばの力を見せてやる！' },
}
export const replyOf = (species: string | undefined) => PARTNER_REPLIES[species ?? 'mochi'] ?? PARTNER_REPLIES.mochi
