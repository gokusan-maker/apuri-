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

// 正解したときの追加ダメージ（n は何問目の正解か）
export function skillDamage(skill: SkillId, n: number): number {
  if (skill === 'fire') return 3
  if (skill === 'foxfire' && n % 3 === 0) return 5
  return 0
}

// 正解したときの追加ゲージ
export const skillGauge = (skill: SkillId, n: number) => (skill === 'cheer' && n % 2 === 0 ? 1 : 0)

// 会心の一撃が出る時間（ミリ秒）
export const skillCritMs = (skill: SkillId, base: number) => (skill === 'claw' ? 5000 : base)
