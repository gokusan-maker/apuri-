import { beforeEach, describe, expect, it } from 'vitest'
import { BOSS_HP, BOSSES, bossUnlocked, critDamage, dailyBossLevel, damage, isCritical, loadBoss, saveBoss } from './boss'
import { LEVELS } from './words'
import { stagesOf } from './stages'

describe('ボス', () => {
  beforeEach(() => localStorage.clear())

  it('全ステージをクリアすると挑戦できる', () => {
    const list = stagesOf('高校基礎')
    const all = Object.fromEntries(list.map((s) => [s.id, 1]))
    expect(bossUnlocked('高校基礎', all)).toBe(true)
    expect(bossUnlocked('高校基礎', { ...all, [list[0].id]: 0 })).toBe(false)
  })

  it('連続正解でダメージが増え（最大10）、20問中ほぼ6割強の正解で倒せる', () => {
    expect(damage(1)).toBe(6)
    expect(damage(5)).toBe(10)
    expect(damage(9)).toBe(10)
    // 全問正解なら12問以内に倒せる
    let hp = BOSS_HP
    let n = 0
    while (hp > 0) hp -= damage(++n)
    expect(n).toBeLessThanOrEqual(12)
  })

  it('保存と読み込み', () => {
    saveBoss({ 中1: '2026-10-20' })
    expect(loadBoss()).toEqual({ 中1: '2026-10-20' })
  })
})

it('単語帳ごとにボスがいて、名前は重複しない', () => {
  const names = Object.values(BOSSES).map((b) => b.name)
  expect(names).toHaveLength(LEVELS.length)
  expect(new Set(names).size).toBe(names.length)
})

it('すべてのボスに説明がある', () => {
  for (const b of Object.values(BOSSES)) expect(b.desc, b.name).toBeTruthy()
})

it('今日のボスは日付で決まる', () => {
  expect(dailyBossLevel(['中1', '中2', '中3'], '2026-10-20')).toBe(dailyBossLevel(['中1', '中2', '中3'], '2026-10-20'))
  expect(dailyBossLevel([], '2026-10-20')).toBeUndefined()
})

it('3秒以内の正解は会心の一撃でダメージ1.5倍', () => {
  expect(isCritical(0)).toBe(true)
  expect(isCritical(3000)).toBe(true)
  expect(isCritical(3001)).toBe(false)
  expect(critDamage(damage(1))).toBe(9)
  expect(critDamage(damage(5))).toBe(15)
})
