import { describe, expect, it } from 'vitest'
import { sortWords } from './wordSort'
import type { Word } from './words'

const w = (id: string) => ({ id, en: id, ja: id, example: '', exampleJa: '' }) as Word

describe('sortWords', () => {
  const ws = [w('cat'), w('apple'), w('bird')]
  it('ABC順', () => {
    expect(sortWords(ws, 'abc', {}).map((x) => x.id)).toEqual(['apple', 'bird', 'cat'])
  })
  it('最近学んだ順（日付なしはうしろ）', () => {
    const p = { cat: { box: 1, due: 'x', first: '2026-10-01' }, bird: { box: 1, due: 'x', first: '2026-10-05' } }
    expect(sortWords(ws, 'recent', p).map((x) => x.id)).toEqual(['bird', 'cat', 'apple'])
  })
  it('もとの順', () => {
    expect(sortWords(ws, 'none', {})).toBe(ws)
  })
})
