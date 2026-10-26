import { beforeEach, describe, expect, it } from 'vitest'
import { BADGES, loadEarned, loadTotals, newlyEarned, saveEarned, saveTotals, type BadgeStats } from './badges'

const zero: BadgeStats = { answers: 0, correct: 0, streak: 0, learned: 0, level: 1, perfect: 0, bestTime: 0, goals: 0 }

describe('バッジ', () => {
  beforeEach(() => localStorage.clear())

  it('id は重複しない', () => {
    expect(new Set(BADGES.map((b) => b.id)).size).toBe(BADGES.length)
  })

  it('最初は何ももらえない', () => {
    expect(newlyEarned(zero, {})).toEqual([])
  })

  it('条件を満たすともらえ、持っているものは二度ともらえない', () => {
    const s = { ...zero, correct: 10, answers: 10, streak: 3 }
    const ids = newlyEarned(s, {}).map((b) => b.id)
    expect(ids).toEqual(['first-correct', 'correct-10', 'streak-3'])
    expect(newlyEarned(s, { 'first-correct': '2026-10-20' }).map((b) => b.id)).toEqual(['correct-10', 'streak-3'])
  })

  it('保存と読み込み（古いデータに totals が無くても0から）', () => {
    expect(loadTotals()).toEqual({ answers: 0, correct: 0, perfect: 0, goals: 0 })
    saveTotals({ answers: 5, correct: 3, perfect: 0, goals: 1 })
    expect(loadTotals().answers).toBe(5)
    saveEarned({ perfect: '2026-10-20' })
    expect(loadEarned()).toEqual({ perfect: '2026-10-20' })
    localStorage.setItem('eitan:badges', '[]')
    expect(loadEarned()).toEqual({})
  })
})

it('ボス・コイン・なかまのバッジ', () => {
  const ids = newlyEarned({ ...zero, bosses: 1, coins: 100, members: 2 }, {}).map((b) => b.id)
  expect(ids).toEqual(expect.arrayContaining(['boss-1', 'coins-100', 'members-2']))
  expect(ids).not.toContain('boss-all')
})

it('単語帳を1冊完全制覇でバッジ', () => {
  expect(newlyEarned({ ...zero, completeBooks: 1 }, {}).map((b) => b.id)).toContain('complete-1')
})

it('300語・500語定着と100日学習のバッジ', () => {
  const ids = newlyEarned({ ...zero, learned: 500, studyDays: 100 }, {}).map((b) => b.id)
  expect(ids).toEqual(expect.arrayContaining(['learned-300', 'learned-500', 'days-100']))
  expect(newlyEarned({ ...zero, studyDays: 99 }, {}).map((b) => b.id)).not.toContain('days-100')
})

it('100日連続と5000問のバッジ', () => {
  const ids = newlyEarned({ ...zero, streak: 100, answers: 5000 }, {}).map((b) => b.id)
  expect(ids).toEqual(expect.arrayContaining(['streak-100', 'answers-5000']))
  expect(newlyEarned({ ...zero, streak: 99, answers: 4999 }, {}).map((b) => b.id)).not.toContain('streak-100')
})

it('図鑑のすがたを全部見るとバッジ', () => {
  expect(newlyEarned({ ...zero, formsSeen: 12, formsTotal: 12 }, {}).map((b) => b.id)).toContain('zukan-all')
  expect(newlyEarned({ ...zero, formsSeen: 11, formsTotal: 12 }, {}).map((b) => b.id)).not.toContain('zukan-all')
  expect(newlyEarned({ ...zero }, {}).map((b) => b.id)).not.toContain('zukan-all')
})

it('おみやげを全種類集めるとバッジ', () => {
  expect(newlyEarned({ ...zero, souvenirs: 10, souvenirsTotal: 10 }, {}).map((b) => b.id)).toContain('souvenir-all')
  expect(newlyEarned({ ...zero, souvenirs: 9, souvenirsTotal: 10 }, {}).map((b) => b.id)).not.toContain('souvenir-all')
})

it('1000語定着のバッジ', () => {
  expect(newlyEarned({ ...zero, learned: 1000 }, {}).map((b) => b.id)).toContain('learned-1000')
  expect(newlyEarned({ ...zero, learned: 999 }, {}).map((b) => b.id)).not.toContain('learned-1000')
})

it('クイズの種類を15種類遊ぶとバッジ', () => {
  expect(newlyEarned({ ...zero, modesPlayed: 15 }, {}).map((b) => b.id)).toContain('modes-15')
  expect(newlyEarned({ ...zero, modesPlayed: 14 }, {}).map((b) => b.id)).not.toContain('modes-15')
})

it('英語日記を7日分書くとバッジ', () => {
  expect(newlyEarned({ ...zero, diaryDays: 7 }, {}).map((b) => b.id)).toContain('diary-7')
  expect(newlyEarned({ ...zero, diaryDays: 6 }, {}).map((b) => b.id)).not.toContain('diary-7')
})

it('大学入試の塔とキャラクター集めのバッジ', async () => {
  const { BADGES } = await import('./badges')
  const base = { answers: 0, correct: 0, streak: 0, learned: 0, level: 1, perfect: 0, bestTime: 0, goals: 0 }
  const ok = (id: string, s: object) => BADGES.find((b) => b.id === id)!.check({ ...base, ...s })
  expect([ok('tower-1', { towerFloors: 1 }), ok('tower-all', { towerFloors: 8 }), ok('tower-all', { towerFloors: 9 })]).toEqual([true, false, true])
  expect([ok('species-all', { species: 5 }), ok('species-all', { species: 6 })]).toEqual([false, true])
})

it('図鑑のコンプリート報酬：6種でチケット、36マスでチケット3枚と200コイン', async () => {
  const { BADGES, rewardOf } = await import('./badges')
  const base = { answers: 0, correct: 0, streak: 0, learned: 0, level: 1, perfect: 0, bestTime: 0, goals: 0 }
  const ok = (id: string, s: object) => BADGES.find((b) => b.id === id)!.check({ ...base, ...s })
  expect([ok('collect-all', { collection: 35 }), ok('collect-all', { collection: 36 })]).toEqual([false, true])
  expect(rewardOf(['species-all'])).toEqual({ tickets: 1, coins: 0 })
  expect(rewardOf(['species-all', 'collect-all', 'answers-100'])).toEqual({ tickets: 4, coins: 200 })
})

it('ボス図鑑の基本のボスを全部たおすとボス図鑑マスター', async () => {
  const { BADGES, rewardOf } = await import('./badges')
  const base = { answers: 0, correct: 0, streak: 0, learned: 0, level: 1, perfect: 0, bestTime: 0, goals: 0 }
  const ok = (s: object) => BADGES.find((b) => b.id === 'bossbook-all')!.check({ ...base, ...s })
  expect(ok({ bossBook: 15, bossTotal: 16 })).toBe(false)
  expect(ok({ bossBook: 16, bossTotal: 16 })).toBe(true)
  expect(ok({})).toBe(false)
  expect(rewardOf(['bossbook-all']).tickets).toBe(3)
})

it('城を制覇するとバッジ（1つ・5つ・15）', async () => {
  const { BADGES } = await import('./badges')
  const base = { answers: 0, correct: 0, streak: 0, learned: 0, level: 1, perfect: 0, bestTime: 0, goals: 0 }
  const ids = (n: number) => BADGES.filter((b) => b.id.startsWith('castle-') && b.check({ ...base, castles: n })).map((b) => b.id)
  expect(ids(0)).toEqual([])
  expect(ids(1)).toEqual(['castle-1'])
  expect(ids(15)).toEqual(['castle-1', 'castle-5', 'castle-15'])
})

it('パーフェクトを10回・50回でバッジ（パーフェクト職人・完ぺき王）', () => {
  const base = { answers: 0, correct: 0, streak: 0, learned: 0, level: 1, perfect: 9, bestTime: 0, goals: 0 }
  const p10 = BADGES.find((b) => b.id === 'perfect-10')!
  const p50 = BADGES.find((b) => b.id === 'perfect-50')!
  expect(p10.check(base)).toBe(false)
  expect(p10.check({ ...base, perfect: 10 })).toBe(true)
  expect(p50.check({ ...base, perfect: 49 })).toBe(false)
  expect(p50.check({ ...base, perfect: 50 })).toBe(true)
})

it('スペル10連続正解で「つづりの達人」、数の聞き取り10問全問正解で「聞き取り名人」', () => {
  const sp = BADGES.find((b) => b.id === 'spell-10')!
  const nm = BADGES.find((b) => b.id === 'numbers-10')!
  expect(sp.check({ ...zero, spellStreak: 9 })).toBe(false)
  expect(sp.check({ ...zero, spellStreak: 10 })).toBe(true)
  expect(nm.check(zero)).toBe(false)
  expect(nm.check({ ...zero, numbersBest: 10 })).toBe(true)
})

it('文法のディクテーションで5文連続正解すると「書き取り名人」', () => {
  const b = BADGES.find((x) => x.id === 'dict-5')!
  expect(b.check({ ...zero, dictStreak: 4 })).toBe(false)
  expect(b.check({ ...zero, dictStreak: 5 })).toBe(true)
})

it('宝箱を5個・20個あけるとバッジ（宝箱ハンター・宝箱コレクター）', async () => {
  const { chestsOpened } = await import('./castle')
  expect(chestsOpened({ a: [10, 20], b: [10] })).toBe(3)
  const h = BADGES.find((b) => b.id === 'chest-5')!
  const c = BADGES.find((b) => b.id === 'chest-20')!
  expect(h.check({ ...zero, chests: 4 })).toBe(false)
  expect(h.check({ ...zero, chests: 5 })).toBe(true)
  expect(c.check({ ...zero, chests: 20 })).toBe(true)
})

it('長文読解の満点1本で「読解の満点」、20本で「読解マスター」', () => {
  const a = BADGES.find((b) => b.id === 'long-1')!
  const b = BADGES.find((x) => x.id === 'long-20')!
  expect(a.check(zero)).toBe(false)
  expect(a.check({ ...zero, longPerfect: 1 })).toBe(true)
  expect(b.check({ ...zero, longPerfect: 19 })).toBe(false)
  expect(b.check({ ...zero, longPerfect: 20 })).toBe(true)
})

it('今日の課題3つを3日・7日続けてクリアするとバッジ', () => {
  const a = BADGES.find((b) => b.id === 'trio-3')!
  const b = BADGES.find((x) => x.id === 'trio-7')!
  expect(a.check({ ...zero, trioStreak: 2 })).toBe(false)
  expect(a.check({ ...zero, trioStreak: 3 })).toBe(true)
  expect(b.check({ ...zero, trioStreak: 7 })).toBe(true)
})
