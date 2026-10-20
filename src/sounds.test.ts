import { describe, expect, it } from 'vitest'
import { GRAMMAR } from './grammar'
import { SOUNDS } from './sounds'

describe('発音のコツ', () => {
  it('6単元、各3問。正解が選択肢にあり、文法とidが重ならない', () => {
    expect(SOUNDS).toHaveLength(6)
    for (const u of SOUNDS) {
      expect(GRAMMAR.some((g) => g.id === u.id)).toBe(false)
      expect(u.questions).toHaveLength(3)
      for (const q of u.questions) {
        expect(q.sentence.split('___')).toHaveLength(2)
        expect(q.choices[q.answer]).toBeDefined()
        expect(new Set(q.choices).size).toBe(q.choices.length)
      }
    }
  })
})
