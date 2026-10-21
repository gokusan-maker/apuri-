import { describe, expect, it } from 'vitest'
import { CONFUSING, confusingFor } from './confusing'

describe('まちがえやすい単語', () => {
  it('15組、各3問、空欄は1つで正解が選択肢にある', () => {
    expect(CONFUSING).toHaveLength(65)
    for (const u of CONFUSING) {
      expect(u.questions).toHaveLength(3)
      for (const q of u.questions) {
        expect(q.sentence.split('___')).toHaveLength(2)
        expect(q.choices[q.answer]).toBeDefined()
      }
    }
  })

  it('単語idから「まちがえやすい単語」の単元を探す', () => {
    expect(confusingFor('borrow')?.id).toBe('borrow-lend')
    expect(confusingFor('watch')?.id).toBe('see-look-watch')
    expect(confusingFor('apple')).toBeUndefined()
  })
})
