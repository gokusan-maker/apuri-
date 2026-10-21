import { expect, it } from 'vitest'
import { grammarTags } from './longgrammar'
import { LONG_PASSAGES } from './longreading'

it('本文の形から文法の単元を見つける', () => {
  const p = { ...LONG_PASSAGES[0], paragraphs: ['I have a friend who lives in Kyoto. This book was written by him. It is bigger than mine.'] }
  const ids = grammarTags(p).map((t) => t.id)
  expect(ids).toContain('relative')
  expect(ids).toContain('passive')
  expect(ids).toContain('compare')
  expect(ids).not.toContain('there')
  for (const x of LONG_PASSAGES) expect(grammarTags(x).every((t) => t.title.length > 0)).toBe(true)
})
