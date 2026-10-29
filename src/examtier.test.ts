import { expect, it } from 'vitest'
import { ADV_PASSAGES } from './advreading'
import { EXAM_TIERS, passageStats, passagesForTier, tierOf } from './examtier'

it('大学入試のレベル：共通テスト・私立難関大・私立医学部・国公立大・旧帝大・国立医学部', () => {
  expect(EXAM_TIERS.map((t) => t.label)).toEqual(['すべて', '高校基礎', '共通テスト', '私立難関大', '私立医学部', '国公立大', '旧帝大', '国立医学部'])
})

it('難関大の長文はどれか1つのレベルに入り、どのレベルにも長文が2本以上ある', () => {
  const univ = ADV_PASSAGES.filter((p) => p.level.startsWith('難関大'))
  expect(passagesForTier('all')).toHaveLength(univ.length)
  const sum = EXAM_TIERS.filter((t) => t.id !== 'all').reduce((n, t) => n + passagesForTier(t.id).length, 0)
  expect(sum).toBe(univ.length)
  for (const t of EXAM_TIERS) expect(passagesForTier(t.id).length, t.label).toBeGreaterThanOrEqual(2)
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

it('レベルの下限：本文が下限にとどかない長文は、とどくレベルまで下がる（実際の入試の語数・1文の長さが目安）', async () => {
  const { tierOf, meetsTier, passageStats, TIER_FLOOR } = await import('./examtier')
  const univ = ADV_PASSAGES.filter((p) => p.level.startsWith('難関大'))
  for (const p of univ) expect(meetsTier(p, tierOf(p)), p.id).toBe(true)
  // 共通テストの評論は1文15語以上・200語以上、旧帝大は1文17.5語以上
  for (const p of passagesForTier('kyotsu').filter((x) => !/メール|お知らせ/.test(x.level))) {
    expect(passageStats(p).wps, p.id).toBeGreaterThanOrEqual(TIER_FLOOR.kyotsu.wps)
    expect(passageStats(p).words, p.id).toBeGreaterThanOrEqual(TIER_FLOOR.kyotsu.words)
  }
  for (const p of passagesForTier('kyutei')) expect(passageStats(p).wps, p.id).toBeGreaterThanOrEqual(TIER_FLOOR.kyutei.wps)
  // 1文が短くやさしい長文（例：ミツオシエ）は共通テストではなく高校基礎に入る
  expect(tierOf(univ.find((p) => p.id === 'adv-honeyguide')!)).toBe('kiso')
})

it('本番の長さの長文：共通テスト評論のヒートアイランドは350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-heat-island')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(15)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：私大・国公立の「眠っている脳」は500語以上・1文17語以上で私大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'shiritsu-sleeping-brain')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(500)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(17)
  expect(tierOf(p)).toBe('shiritsu')
})

it('本番の長さの長文：IELTS のコンテナの長文は700語以上で TRUE／FALSE／NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-shipping-container')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.some((x) => x.answer === 2)).toBe(true)
})

it('本番の長さの長文：共通テスト評論のデジタル地図は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-digital-maps')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：私大・国公立の「おとなの言語学習」は500語以上・1文17語以上で私大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'shiritsu-late-learners')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(500)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(17)
  expect(tierOf(p)).toBe('shiritsu')
})

it('本番の長さの長文：IELTS の動物の寿命の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-animal-lifespan')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「知らない人と話す」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-talking-strangers')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})
