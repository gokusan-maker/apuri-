import { describe, expect, it } from 'vitest'
import { makeLookup } from './glossary'
import { WORDS } from './words'

describe('例文の単語の意味', () => {
  const look = makeLookup(WORDS)
  it('原形・変化形・記号つきでも見つける', () => {
    expect(look('apple')?.id).toBe('apple')
    expect(look('Apples.')?.id).toBe('apple')
    expect(look('decided')?.id).toBe('decide')
    expect(look('studies')?.id).toBe('study')
    expect(look('cooks')?.id).toBe('cook')
    expect(look('the')).toBeUndefined()
  })
})
