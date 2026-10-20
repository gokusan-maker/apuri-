import { describe, expect, it } from 'vitest'
import { EGG_LINE, LINES, LONELY_LINE, pickLine } from './talk'

describe('相棒のひとこと', () => {
  it('タマゴのとき・さみしいときは決まったひとこと', () => {
    expect(pickLine(0, false, 0.5)).toBe(EGG_LINE)
    expect(pickLine(2, true, 0.5)).toBe(LONELY_LINE)
  })

  it('ふだんは一覧からえらぶ（範囲外にならない）', () => {
    expect(pickLine(2, false, 0)).toBe(LINES[0])
    expect(pickLine(2, false, 0.9999)).toBe(LINES[LINES.length - 1])
    expect(pickLine(2, false, 1)).toBe(LINES[0])
  })
})
