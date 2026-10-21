import { beforeEach, expect, it } from 'vitest'
import { challengeOf, cleared, difficultyOf, loadChallengeDay, saveChallengeDay } from './challenge'

beforeEach(() => localStorage.clear())

it('キャラクターで問題の種類が変わる（モチ=単語・コンコン=文法・ペンペン=並べかえ・ドラコ=英文和訳）', () => {
  expect([undefined, 'fox', 'penguin', 'dragon'].map((s) => challengeOf(s).label)).toEqual(['単語', '文法', '並べかえ', '英文和訳'])
})

it('育つほど難しくなる（問題数と単語帳）', () => {
  expect(difficultyOf(1).label).toBe('やさしい')
  expect(difficultyOf(3)).toMatchObject({ label: 'ふつう', count: 8 })
  expect(difficultyOf(6).levels).toContain('高校基礎')
})

it('6割正解でクリア。1日1回の記録', () => {
  expect([cleared(3, 5), cleared(2, 5), cleared(0, 0)]).toEqual([true, false, false])
  saveChallengeDay('2026-10-20')
  expect(loadChallengeDay()).toBe('2026-10-20')
})
