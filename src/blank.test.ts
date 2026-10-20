import { describe, expect, it } from 'vitest'
import { blankOut, canBlank } from './blank'
import { WORDS } from './words'

describe('穴埋め', () => {
  it('見出し語そのままの形を空欄にする', () => {
    expect(blankOut('I eat an apple every morning.', 'apple')).toEqual({
      before: 'I eat an ',
      answer: 'apple',
      after: ' every morning.',
    })
  })

  it('変化形（-ed, -s, -ied など）も見つける', () => {
    expect(blankOut('She decided to study abroad.', 'decide')?.answer).toBe('decided')
    expect(blankOut('The train arrived on time.', 'arrive')?.answer).toBe('arrived')
    expect(blankOut('Reading every day will improve your English.', 'improve')?.answer).toBe('improve')
  })

  it('見つからない（不規則変化など）ときは null', () => {
    expect(blankOut('I bought a new bag yesterday.', 'buy')).toBeNull()
  })

  it('単語帳の大半は穴埋めにできる', () => {
    const n = WORDS.filter(canBlank).length
    expect(n / WORDS.length).toBeGreaterThan(0.8)
  })
})
