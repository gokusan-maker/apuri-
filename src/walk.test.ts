import { expect, it } from 'vitest'
import { loadWalkDay, saveWalkDay, walkFind, walkPlace, WALK_COINS } from './walk'
import { WORDS } from './words'

it('さんぽは1日1回で、単語を1つ拾ってくる', () => {
  expect(WALK_COINS).toBe(3)
  expect(walkFind(WORDS, 0)).toBe(WORDS[0])
  expect(walkFind(WORDS, 0.9999)).toBe(WORDS[WORDS.length - 1])
  expect(walkFind([], 0.5)).toBeUndefined()
  expect(walkPlace(0)).toBe('公園')
  localStorage.clear()
  expect(loadWalkDay()).toBe('')
  saveWalkDay('2026-10-20')
  expect(loadWalkDay()).toBe('2026-10-20')
})
