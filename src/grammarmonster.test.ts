import { expect, it } from 'vitest'
import { GRAMMAR } from './grammar'
import { monsterLook, monsterName } from './grammarmonster'

it('文法モンスターの名前は単元のタイトルから作る', () => {
  expect(monsterName(GRAMMAR.find((u) => u.id === 'be')!)).toBe('be動詞モンスター')
  for (const u of GRAMMAR) {
    expect(monsterName(u).endsWith('モンスター')).toBe(true)
    expect(monsterLook(u).color).toMatch(/^#/)
  }
})
