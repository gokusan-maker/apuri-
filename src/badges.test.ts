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
