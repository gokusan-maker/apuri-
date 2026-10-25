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

it('国公立大より上のレベルは「段落の和訳をえらぶ」難しい問題がつく（正解は本文の和訳、選択肢は4つでかぶらない）', async () => {
  const { tierOf } = await import('./examtier')
  for (const tier of ['kokkoritsu', 'kyutei', 'kokuritsu-med'] as const) {
    for (const p of passagesForTier(tier)) {
      expect(p.gistKind, p.id).toBe('transl')
      for (const g of p.gist!) {
        expect(g.choices[g.answer]).toBe(p.ja[g.para])
        expect(new Set(g.choices).size).toBe(4)
      }
    }
  }
  expect(passagesForTier('kyotsu').every((p) => p.gistKind === undefined)).toBe(true)
  expect(tierOf(passagesForTier('kyutei')[0])).toBe('kyutei')
})
