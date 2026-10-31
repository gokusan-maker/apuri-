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

it('本番の長さの長文：私大・国公立の「在宅勤務と都市」は500語以上・1文17語以上で私大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'shiritsu-remote-work')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(500)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(17)
  expect(tierOf(p)).toBe('shiritsu')
})

it('本番の長さの長文：IELTS の機械翻訳の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-machine-translation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：旧帝大の「胃潰瘍と細菌」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-ulcer-bacteria')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「1万歩」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-ten-thousand-steps')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：IELTS のコーヒーハウスの長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-coffeehouses')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：旧帝大の「言語と思考」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-language-thought')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「砂の不足」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-sand-shortage')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：IELTS のリワイルディングの長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-rewilding')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：旧帝大の「抗生物質への耐性」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-antibiotic-resistance')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「カッコウの托卵」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-cuckoo')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：IELTS の成長マインドセットの長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-growth-mindset')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「電子ごみ」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-e-waste')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大の「トロッコ問題」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-trolley-problem')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「英語のつづり」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-english-spelling')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：IELTS の宇宙ごみの長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-space-debris')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「無料の試食」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-free-samples')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大の「チューリップ・バブル」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-tulip-mania')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「電子レンジの発明」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-microwave-oven')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：IELTS のマイクロファイナンスの長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-microfinance')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「ホームアドバンテージ」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-home-advantage')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大の「脱絶滅」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-de-extinction')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「悲しい音楽」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-sad-music')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：IELTS の天然痘の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-smallpox')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「うま味」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-umami')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「冥王星」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-pluto')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「幹線道路を公園に」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-roads-to-parks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大評論の「テスト効果」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-testing-effect')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：IELTS の「都市の立地」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-city-locations')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「仮想水」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-virtual-water')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大評論の「印刷」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-printing-press')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「バーコード」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-barcode')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大評論の「衛星測位と相対性理論」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-gps-relativity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：IELTS の「傍観者効果」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-bystander-effect')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「ウォーミングアップ」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-warm-up')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大評論の「共有地の悲劇」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-tragedy-commons')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：IELTS の「お金の形の変化」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-cashless')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「会話のフィラー」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-filler-words')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大評論の「発熱」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-fever')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：IELTS の「渡り鳥」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-bird-navigation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「週末の歴史」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-weekend')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大評論の「二言語使用の利点」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-bilingual-advantage')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：IELTS の「森の学校」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-forest-school')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「玉ねぎと涙」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-onion-tears')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大評論の「大陸移動説」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-continental-drift')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：IELTS の「海水淡水化」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-desalination')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「ハチと受粉」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-bees')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大評論の「ナッジ」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-nudges')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：IELTS の「シルクロード」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-silk-road')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「セルフレジ」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-self-checkout')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大評論の「集団免疫」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-herd-immunity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：IELTS の「泥炭地」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-peatlands')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：共通テスト評論の「ケチャップ」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-ketchup')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：旧帝大評論の「うその倫理」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-is-lying-wrong')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「空が青い理由」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-blue-sky')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：IELTS の「分散効果」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-spacing-effect')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：旧帝大評論の「海の酸性化」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-ocean-acidification')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「借用語」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-loanwords')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：IELTS の「緑の屋根」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-green-roofs')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：旧帝大評論の「鉄道と標準時」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-railway-time')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「あくび」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-yawning')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：IELTS の「孤独と公衆衛生」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-loneliness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：旧帝大評論の「臨界期」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-critical-period')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「自転車シェア」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-bike-sharing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：IELTS の「太陽系外惑星」の長文は700〜950語で NOT GIVEN の設問がある', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'ielts-exoplanets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(700)
  expect(passageStats(p).words).toBeLessThanOrEqual(950)
  expect(p.tfng!.filter((x) => x.answer === 2).length).toBeGreaterThanOrEqual(2)
})

it('本番の長さの長文：旧帝大評論の「真実を伝える医療」は600語以上・1文18語以上で旧帝大のレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyutei-truth-telling')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(tierOf(p)).toBe('kyutei')
})

it('本番の長さの長文：共通テスト評論の「ストリートピアノ」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-street-pianos')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「歩くことの力」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-walking-health')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「ホタルを取りもどす」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-fireflies')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「コミュニティガーデン」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-community-gardens')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「天気予報の作られ方」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-weather-forecast')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「折り紙」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-origami')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「質問する力」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-asking-questions')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「フードトラック」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-food-trucks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「ラジオ体操」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-radio-exercises')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「身ぶりの文化差」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-gestures')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「返却できるびん」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-returnable-bottles')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「宇宙でのくらし」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-living-in-space')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「ユニバーサルデザイン」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-universal-design')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「はしの文化」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-chopsticks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「洗濯機」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-washing-machine')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「動物の擬態」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-camouflage')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「自転車の歴史」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-bicycle-history')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「空想」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-daydreaming')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「時間帯」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-time-zones')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「ストリートアート」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-street-art')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「指紋」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-fingerprints')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「ネットのまちがった情報」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-misinformation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「地熱エネルギー」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-geothermal')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「オノマトペ」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-onomatopoeia')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「冷凍食品の科学」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-frozen-food')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「空き家」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-akiya')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「雪の結晶」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-snowflakes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「おこづかい」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-pocket-money')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「プランクトン」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-plankton')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「オーディオブック」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-audiobooks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「電気自動車」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-electric-cars')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「浮世絵」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-ukiyoe')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「竹の花」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-bamboo-flowers')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「ビデオ判定」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-video-review')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})

it('本番の長さの長文：共通テスト評論の「ゆっくり食べる」は350語以上で共通テストのレベルに残る', () => {
  const p = ADV_PASSAGES.find((x) => x.id === 'kyotsu-eating-slowly')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(350)
  expect(tierOf(p)).toBe('kyotsu')
})
