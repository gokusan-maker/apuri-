import { expect, it } from 'vitest'
import { ADV_PASSAGES } from './advreading'
import { EXAM_TIERS, passagesForTier } from './examtier'

it('大学入試のレベル：共通テスト・私立難関大・私立医学部・国公立大・旧帝大・国立医学部', () => {
  expect(EXAM_TIERS.map((t) => t.label)).toEqual(['すべて', '共通テスト', '私立難関大', '私立医学部', '国公立大', '旧帝大', '国立医学部'])
})

it('難関大の長文はどれか1つのレベルに入り、どのレベルにも長文が2本以上ある', () => {
  const univ = ADV_PASSAGES.filter((p) => p.level.startsWith('難関大'))
  expect(passagesForTier('all')).toHaveLength(univ.length)
  const sum = EXAM_TIERS.filter((t) => t.id !== 'all').reduce((n, t) => n + passagesForTier(t.id).length, 0)
  expect(sum).toBe(univ.length)
  for (const t of EXAM_TIERS) expect(passagesForTier(t.id).length, t.label).toBeGreaterThanOrEqual(2)
  expect(passagesForTier('kyotsu').every((p) => p.paragraphs.join(' ').split(/\s+/).length < 220)).toBe(true) // 共通テストは長すぎない
})
