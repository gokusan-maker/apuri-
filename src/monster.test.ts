import { beforeEach, describe, expect, it } from 'vitest'
import { isLonely, quizXp, levelInfo, loadMonster, saveMonster, stageOf, xpToNext } from './monster'

describe('monster', () => {
  beforeEach(() => localStorage.clear())

  it('XP 0 はレベル1（タマゴ）', () => {
    expect(levelInfo(0)).toEqual({ level: 1, into: 0, need: 20 })
  })

  it('必要量に達するとレベルが上がり、余りは持ち越す', () => {
    expect(levelInfo(19).level).toBe(1)
    expect(levelInfo(20)).toEqual({ level: 2, into: 0, need: 30 })
    expect(levelInfo(55)).toEqual({ level: 3, into: 5, need: 40 })
  })

  it('必要XPはレベルが上がるほど増える', () => {
    expect(xpToNext(2)).toBeGreaterThan(xpToNext(1))
  })

  it('保存と読み込み。壊れたデータは0に戻す', () => {
    saveMonster({ xp: 42 })
    expect(loadMonster()).toEqual({ xp: 42 })
    localStorage.setItem('eitan:monster', '{"xp":-3}')
    expect(loadMonster()).toEqual({ xp: 0 })
    localStorage.setItem('eitan:monster', 'broken')
    expect(loadMonster()).toEqual({ xp: 0 })
  })
})

describe('進化と表情', () => {
  it('レベル2で誕生、5・15・30で進化する', () => {
    expect(stageOf(1).name).toBe('ふしぎなタマゴ')
    expect(stageOf(2).index).toBe(1)
    expect(stageOf(4).index).toBe(1)
    expect(stageOf(5).index).toBe(2)
    expect(stageOf(15).index).toBe(3)
    expect(stageOf(29).index).toBe(3)
    expect(stageOf(30).index).toBe(4)
    expect(stageOf(99).index).toBe(4)
  })

  it('3日以上あくと「さみしそう」。記録が無い古いデータはさみしくない', () => {
    expect(isLonely({ xp: 10 }, '2026-10-20')).toBe(false)
    expect(isLonely({ xp: 10, lastDay: '2026-10-18' }, '2026-10-20')).toBe(false)
    expect(isLonely({ xp: 10, lastDay: '2026-10-17' }, '2026-10-20')).toBe(true)
    expect(isLonely({ xp: 10, lastDay: '2026-09-30' }, '2026-10-03')).toBe(true)
  })

  it('lastDay も保存・読み込みできる', () => {
    saveMonster({ xp: 3, lastDay: '2026-10-20' })
    expect(loadMonster()).toEqual({ xp: 3, lastDay: '2026-10-20' })
  })
})

it('コンボボーナスは1コンボ+0、以降+2ずつ、最大+10', () => {
  expect(quizXp(1)).toBe(10)
  expect(quizXp(2)).toBe(12)
  expect(quizXp(6)).toBe(20)
  expect(quizXp(20)).toBe(20)
})
