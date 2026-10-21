import { beforeEach, describe, expect, it } from 'vitest'
import { BOSS_HP, BOSSES, battleRank, bossUnlocked, critDamage, defeatLineOf, DEFEAT_LINES, isChance, isEnraged, dailyBossLevel, damage, GAUGE_MAX, gaugeAfter, isCritical, loadBoss, saveBoss } from './boss'
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

it('必殺技ゲージは正解で1、会心で2たまり、満タンで止まる', () => {
  expect(gaugeAfter(0, false)).toBe(1)
  expect(gaugeAfter(0, true)).toBe(2)
  expect(gaugeAfter(GAUGE_MAX - 1, true)).toBe(GAUGE_MAX)
})

it('バトル結果のランク', () => {
  expect(battleRank(3, 3)).toBe('S')
  expect(battleRank(3, 2)).toBe('A')
  expect(battleRank(2, 5)).toBe('A')
  expect(battleRank(1, 9)).toBe('B')
})

it('HPが半分以下でいかりモード、3問に1問がチャンス問題', () => {
  expect(isEnraged(51, 100)).toBe(false)
  expect(isEnraged(50, 100)).toBe(true)
  expect(isEnraged(0, 100)).toBe(false)
  expect(isChance(true, 2)).toBe(true)
  expect(isChance(true, 3)).toBe(false)
  expect(isChance(false, 2)).toBe(false)
})

it('ボスの撃破セリフは名前で決まり、英語と和訳がある', () => {
  expect(defeatLineOf('ヤミモチ')).toBe(defeatLineOf('ヤミモチ'))
  expect(DEFEAT_LINES.every((l) => /^[A-Z]/.test(l.en) && l.ja.length > 0)).toBe(true)
  expect(new Set(Object.values(BOSSES).map((b) => defeatLineOf(b.name).en)).size).toBeGreaterThan(1)
})

it('連勝数は保存できる', async () => {
  const { loadWinStreak, saveWinStreak } = await import('./boss')
  localStorage.clear()
  expect(loadWinStreak()).toBe(0)
  saveWinStreak(5)
  expect(loadWinStreak()).toBe(5)
})

it('今日の金色ボスは日付で決まり、名前に「金色の」がつく', async () => {
  const { goldenLevelOf, goldenLook } = await import('./boss')
  expect(goldenLevelOf(LEVELS, '2026-10-21')).toBe(goldenLevelOf(LEVELS, '2026-10-21'))
  expect(LEVELS).toContain(goldenLevelOf(LEVELS, '2026-10-21'))
  expect(goldenLook(BOSSES['中1']).name).toBe('金色のヤミモチ')
})

it('今日のボスは★が高いほどHPが多い', async () => {
  const { dailyHp } = await import('./boss')
  expect([dailyHp(1), dailyHp(2), dailyHp(3)]).toEqual([100, 140, 180])
})

it('1撃の最大ダメージ記録は、上回ったときだけ更新される', async () => {
  const { loadMaxHit, recordHit } = await import('./boss')
  localStorage.clear()
  expect(loadMaxHit()).toBe(0)
  expect(recordHit(8)).toBe(true)
  expect(loadMaxHit()).toBe(8)
  expect(recordHit(8)).toBe(false)
  expect(recordHit(5)).toBe(false)
  expect(recordHit(12)).toBe(true)
  expect(loadMaxHit()).toBe(12)
  localStorage.setItem('eitan:max-hit', 'abc')
  expect(loadMaxHit()).toBe(0)
})
