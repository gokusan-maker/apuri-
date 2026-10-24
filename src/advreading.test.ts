import { expect, it } from 'vitest'
import { ADV_PASSAGES } from './advreading'

it('高校入試の長文はどれも150語以上（空所は1語と数える）', () => {
  const short = ADV_PASSAGES.filter((p) => p.level.startsWith('高校入試')).filter((p) => p.paragraphs.join(' ').split(/\s+/).filter((w) => /[A-Za-z]/.test(w)).length < 150)
  expect(short.map((p) => p.id)).toEqual([])
})
