import { describe, expect, it } from 'vitest'
import { swipeResult } from './swipe'

describe('スワイプ', () => {
  it('右で覚えた、左でまだ、少しだけ・縦の動きは無視', () => {
    expect(swipeResult(120, 10)).toBe('good')
    expect(swipeResult(-100, 0)).toBe('again')
    expect(swipeResult(30, 0)).toBeNull()
    expect(swipeResult(90, 150)).toBeNull()
  })
})
