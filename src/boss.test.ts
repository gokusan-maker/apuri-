import { beforeEach, describe, expect, it } from 'vitest'
import { BOSS_HP, BOSS_QUESTIONS, BOSSES, battleRank, bossUnlocked, critDamage, defeatLineOf, DEFEAT_LINES, isChance, isEnraged, dailyBossLevel, damage, GAUGE_MAX, gaugeAfter, isCritical, loadBoss, saveBoss } from './boss'
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

  it('連続正解でダメージが増え（最大10）、ボーナスなしだと36問中25問の正解が必要（負けそうで勝てる）', () => {
    expect(damage(1)).toBe(6)
    expect(damage(5)).toBe(10)
    expect(damage(9)).toBe(10)
    // 全問正解でも25問かかる（体力240）。会心・合体技・必殺技・なかまのレベルでもっと早く倒せる
    let hp = BOSS_HP
    let n = 0
    while (hp > 0) hp -= damage(++n)
    expect(n).toBe(25)
    expect(BOSS_QUESTIONS).toBe(36)
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
  expect([dailyHp(1), dailyHp(2), dailyHp(3)]).toEqual([240, 300, 360])
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

it('ボスの登場セリフは名前ごとに決まる', async () => {
  const { INTRO_LINES, introLineOf } = await import('./boss')
  for (const b of Object.values(BOSSES)) {
    expect(INTRO_LINES).toContain(introLineOf(b.name))
    expect(introLineOf(b.name)).toBe(introLineOf(b.name))
  }
})

it('ボス戦の背景は単語帳のレベルごとに変わる', async () => {
  const { bossBgOf, BOSS_BGS } = await import('./boss')
  expect(bossBgOf('中1')).toBe('field')
  expect(bossBgOf('高校基礎')).toBe('night')
  expect(bossBgOf('会話')).toBe('sea')
  for (const l of LEVELS) expect(Object.keys(BOSS_BGS)).toContain(bossBgOf(l))
})

it('ためこうげきは5問に1問で、チャンス問題とは重ならない', async () => {
  const { isCharge } = await import('./boss')
  expect(isCharge(false, 4)).toBe(true)
  expect(isCharge(false, 3)).toBe(false)
  expect(isCharge(false, 9)).toBe(true)
  expect(isCharge(true, 14)).toBe(false) // 14 はチャンス問題
  for (let i = 0; i < 30; i++) expect(isCharge(true, i) && isChance(true, i)).toBe(false)
})

it('ボスの最短タイムは短くなったときだけ更新', async () => {
  const { formatSec, loadBossTimes, recordBossTime } = await import('./boss')
  localStorage.clear()
  expect(recordBossTime('モチ', 90)).toBe(true)
  expect(recordBossTime('モチ', 120)).toBe(false)
  expect(recordBossTime('モチ', 60)).toBe(true)
  expect(loadBossTimes()).toEqual({ モチ: 60 })
  expect(formatSec(65)).toBe('1分05秒')
})

it('Sランクのルーレットはコインかアイテム', async () => {
  const { sRouletteOf, S_ROULETTE } = await import('./boss')
  expect(sRouletteOf(0)).toBe(S_ROULETTE[0])
  expect(sRouletteOf(0.999)).toBe(S_ROULETTE[S_ROULETTE.length - 1])
  expect(S_ROULETTE.some((p) => p.kind === 'item')).toBe(true)
})

it('ボスの口ぐせは正解するたびにかわる', async () => {
  const { hurtLineOf, HURT_LINES } = await import('./boss')
  const a = hurtLineOf('モチ', 1)
  const b = hurtLineOf('モチ', 2)
  expect(a).not.toBe(b)
  expect(hurtLineOf('モチ', 1 + HURT_LINES.length)).toBe(a)
})

it('ボスは7問ごとに2問ねむり、ためこうげきとは重ならない', async () => {
  const { isAsleep, isCharge } = await import('./boss')
  expect(isAsleep(false, 5)).toBe(true)
  expect(isAsleep(false, 6)).toBe(true)
  expect(isAsleep(false, 7)).toBe(false)
  for (let i = 0; i < 40; i++) expect(isAsleep(false, i) && isCharge(false, i)).toBe(false)
})

it('おうえんスタンプは5種類を順番に', async () => {
  const { cheerStampOf, CHEER_STAMPS } = await import('./boss')
  expect(cheerStampOf(1)).toBe(CHEER_STAMPS[0])
  expect(cheerStampOf(5)).toBe(CHEER_STAMPS[4])
  expect(cheerStampOf(6)).toBe(CHEER_STAMPS[0])
})

it('英検2級〜ネイティブのボスは、色ちがいではなく形のちがう飾りをもつ', () => {
  const decos = (['英検2級', '英検準1級', '英検1級', 'ネイティブ'] as const).map((l) => BOSSES[l].deco)
  expect(decos).toEqual(['mortarboard', 'scholar', 'lastboss', 'speaker'])
})

it('ボスのこうげきの属性は色で決まる（赤＝炎・青＝氷・黄＝いなずま・緑＝どく・灰色＝やみ）', async () => {
  const { attackElemOf } = await import('./boss')
  expect(['#dc2626', '#0ea5e9', '#eab308', '#16a34a', '#334155', '#7c3aed'].map((c) => attackElemOf(c).id)).toEqual(['fire', 'ice', 'thunder', 'poison', 'dark', 'dark'])
})

describe('ボスのとくぎ', () => {
  it('ボスごとに名前で決まり、4種類がそろっている', async () => {
    const { BOSSES, BOSS_TRAITS, traitOf } = await import('./boss')
    const names = Object.values(BOSSES).map((b) => b.name)
    expect(traitOf(names[0])).toBe(traitOf(names[0]))
    expect(new Set(names.map(traitOf)).size).toBeGreaterThanOrEqual(3)
    for (const t of Object.values(BOSS_TRAITS)) expect(t.desc.length).toBeLessThan(25)
  })
  it('かたいウロコはダメージ-2（最低1）、さいせいは半分を切ったら1回だけ回復', async () => {
    const { traitAfterHit } = await import('./boss')
    expect(traitAfterHit('armor', 100, 90, 100, false)).toEqual({ hp: 92, blocked: 2, healed: 0 })
    expect(traitAfterHit('armor', 100, 99, 100, false).hp).toBe(99) // 最低1ダメージ
    expect(traitAfterHit('armor', 10, 0, 100, false).hp).toBe(0) // たおす一撃はふせがない
    expect(traitAfterHit('regen', 60, 45, 100, false)).toEqual({ hp: 60, blocked: 0, healed: 15 })
    expect(traitAfterHit('regen', 60, 45, 100, true).hp).toBe(45) // 2回目はない
    expect(traitAfterHit('regen', 10, 0, 100, false).hp).toBe(0)
    expect(traitAfterHit('quick', 60, 45, 100, false).hp).toBe(45)
  })
})
