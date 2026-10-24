import { BOSSES } from './boss'
import { formOf, levelInfo, speciesOf, type MonsterState } from './monster'
import { SKILL_LV_USES, skillLevel, skillOf, specialOf, weakOf } from './partner'
import { UNIV_BOSSES } from './univ'

// 相棒のステータス：特技とレベル・必殺技・得意なボス（弱点をつけるボス）
export function PartnerStatus({ monster }: { monster: MonsterState }) {
  const f = formOf(monster)
  const sp = monster.species ?? 'mochi'
  const skill = skillOf(monster.species)
  const uses = monster.skillUses ?? 0
  const lv = skillLevel(uses)
  const next = SKILL_LV_USES[lv]
  const good = [...Object.values(BOSSES), ...UNIV_BOSSES].filter((b) => weakOf(b.name) === sp).map((b) => b.name)
  return (
    <div className="partner-status">
      <h3>📋 {monster.name ?? f.name}のステータス</h3>
      <dl>
        <dt>キャラクター</dt>
        <dd>
          {speciesOf(sp).name}・Lv.{levelInfo(monster.xp).level}
        </dd>
        <dt>特技</dt>
        <dd title={`${skill.desc}${next !== undefined ? `・あと${next - uses}回使うと Lv${lv + 1}` : ''}${f.stage === 0 ? '・生まれると使える' : ''}`}>
          {skill.name} Lv{lv}
          {next !== undefined && <small className="skill-next" aria-label={`あと${next - uses}回使うと Lv${lv + 1}`}>　あと{next - uses}回</small>}
        </dd>
        <dt>必殺技</dt>
        <dd style={{ color: specialOf(monster.species).color }}>{specialOf(monster.species).name}</dd>
        <dt>得意なボス</dt>
        <dd>{good.length > 0 ? good.join('・') : 'なし'}</dd>
      </dl>
    </div>
  )
}
