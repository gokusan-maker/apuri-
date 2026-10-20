import { describe, expect, it } from 'vitest'
import { EGG_LINE, LINES, LONELY_LINE, pickLine, rememberLine, seasonLine, TIME_LINES } from './talk'

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

describe('時間帯・季節のひとこと', () => {
  it('夜おそくは寝ようと言い、ときどき朝や季節のひとこと', () => {
    expect(pickLine(2, false, 0.5, new Date(2026, 9, 20, 23))).toBe(TIME_LINES.night)
    expect(pickLine(2, false, 0.05, new Date(2026, 9, 20, 7))).toBe(TIME_LINES.morning)
    expect(pickLine(2, false, 0.15, new Date(2026, 9, 20, 15)).en).toContain('Autumn')
    expect(LINES).toContain(pickLine(2, false, 0.5, new Date(2026, 9, 20, 15)))
    expect(pickLine(0, false, 0.5, new Date(2026, 9, 20, 23))).toBe(EGG_LINE)
  })
  it('季節は月で決まる', () => {
    expect([1, 4, 7, 10, 12].map((m) => seasonLine(m).ja.slice(0, 2))).toEqual(['寒い', '春だ', '暑い', '秋は', '寒い'])
  })
})

it('新しいクイズを案内するひとことがある', () => {
  expect(LINES.some((l) => l.ja.includes('2人対戦'))).toBe(true)
  expect(LINES.some((l) => l.ja.includes('絵文字'))).toBe(true)
})

it('覚えた単語で話しかける', () => {
  expect(rememberLine({ en: 'apple', ja: 'りんご' }).ja).toBe('「apple」っておぼえてる？（りんご）')
})

it('2000語の記念のひとことがある', () => {
  expect(LINES.some((l) => l.ja.includes('2000語'))).toBe(true)
})
