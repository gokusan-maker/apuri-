import { describe, expect, it } from 'vitest'
import { CONFUSING } from './confusing'

describe('まちがえやすい単語', () => {
  it('15組、各3問、空欄は1つで正解が選択肢にある', () => {
    expect(CONFUSING).toHaveLength(20)
    for (const u of CONFUSING) {
      expect(u.questions).toHaveLength(3)
      for (const q of u.questions) {
        expect(q.sentence.split('___')).toHaveLength(2)
        expect(q.choices[q.answer]).toBeDefined()
      }
    }
  })
})
