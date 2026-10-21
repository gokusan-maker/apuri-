import { beforeEach, expect, it } from 'vitest'
import { loadUniv, saveUniv, UNIV_BOSSES, univUnlocked } from './univ'

beforeEach(() => localStorage.clear())

it('大学入試の塔は9階、上の階ほど強い', () => {
  expect(UNIV_BOSSES).toHaveLength(9)
  expect(new Set(UNIV_BOSSES.map((b) => b.id)).size).toBe(9)
  const hp = UNIV_BOSSES.map((b) => b.hp)
  expect(hp).toEqual([...hp].sort((a, b) => a - b))
  expect(UNIV_BOSSES.at(-1)!.name).toBe('アカモンドラゴン')
})

it('下の階を倒すと次の階が開く。記録は保存できる', () => {
  expect(univUnlocked(0, {})).toBe(true)
  expect(univUnlocked(1, {})).toBe(false)
  expect(univUnlocked(1, { gate: '2026-10-20' })).toBe(true)
  saveUniv({ gate: '2026-10-20', bad: 1 } as never)
  expect(loadUniv()).toEqual({ gate: '2026-10-20' })
})

it('塔のボスはそれぞれちがう飾りをつけている', async () => {
  const { render } = await import('@testing-library/react')
  const { createElement } = await import('react')
  const { BossFigure } = await import('./BossView')
  const sizes = UNIV_BOSSES.map((b) => render(createElement(BossFigure, { hit: false, look: b })).container.innerHTML)
  expect(new Set(sizes).size).toBe(UNIV_BOSSES.length)
  expect(UNIV_BOSSES.every((b) => b.deco === b.id)).toBe(true)
})

it('塔のボス戦は4問に1問が文法問題', async () => {
  const { bossQuestions } = await import('./boss')
  const { wordsOf } = await import('./words')
  const qs = bossQuestions(wordsOf(['高校基礎']), true)
  expect(qs.filter((q) => q.word.id === '')).toHaveLength(5)
  expect(qs[3].choices[qs[3].answer]).toBe(qs[3].word.ja)
  expect(bossQuestions(wordsOf(['中1']), false).every((q) => q.word.id)).toBe(true)
})
