import { expect, it } from 'vitest'
import { LONG_PASSAGES, levelVerdict } from './longreading'

it('読解のレベル判定：8割以上で「〇〇レベル合格」、足りなければあと何点か', () => {
  const p = { ...LONG_PASSAGES[0], level: '中3（物語）' }
  expect(levelVerdict(p, 8, 10)).toEqual({ pass: true, text: '🎖 中3レベル合格！' })
  expect(levelVerdict(p, 6, 10)).toEqual({ pass: false, text: '中3レベル合格まであと2点' })
  expect(levelVerdict({ ...p, level: '高校入試' }, 10, 10).text).toBe('🎖 高校入試レベル合格！')
})
