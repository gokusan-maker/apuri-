import { beforeEach, describe, expect, it } from 'vitest'
import { levelInfo, loadMonster, saveMonster, xpToNext } from './monster'

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
