import { describe, expect, it } from 'vitest'
import { levelOf, LEVELS, WORDS, wordsOf } from './words'

describe('WORDS', () => {
  it('中学2033語＋高校基礎680語＋熟語280＋曜日・月25＋テーマ別544＋数44＋色・形24＋会話190＋ビジネス71＋英検2級101＋英検準1級100＋英検1級100＋ネイティブ100あり、id が重複しない', () => {
    expect(WORDS).toHaveLength(15347) // 2026-11-10 に分野別の語⑭〜㉒を450語、 TOEFL・IELTS の学術語を48語、東大・京大の評論語を34語、旧帝大・国公立・高3の語を42語、私学難関・私学の語を50語、TOEFL の学術語をさらに50語、東大・京大・旧帝大の語句を50足した
    expect(WORDS.filter((w) => levelOf(w) === 'ネイティブ')).toHaveLength(300)
    expect(WORDS.filter((w) => levelOf(w) === '英検1級')).toHaveLength(3301) // 2026-11-10 に分野別の語⑱を20語、東大・京大の評論語を34語、さらに語句を34足した。単語のレベルの見直しで、京大から私学難関・国公立へ移した語は近い級も変わる
    expect(WORDS.filter((w) => levelOf(w) === '英検準1級')).toHaveLength(6528) // 11-10 に分野別の語⑭〜⑱を161語、2026-11-08 に国公立・旧帝大の単語を93語、11-10 に TOEFL の48語、旧帝大・国公立の29語を足した（pessimistic は高3へ）、TOEFL の50語、旧帝大の語句16を足した
    expect(WORDS.filter((w) => levelOf(w) === '英検2級')).toHaveLength(1190) // 2026-11-10 に私学難関・私学の語を50語、分野別の語⑭〜⑰を69語足した（レベル判定で1語が準1級から2級へ）
    expect(new Set(WORDS.map((w) => w.en.toLowerCase())).size).toBe(WORDS.length) // 同じ英単語を2回入れない
    expect(new Set(WORDS.map((w) => w.id)).size).toBe(WORDS.length)
    expect(WORDS.filter((w) => levelOf(w) === '高校基礎')).toHaveLength(861) // CEFR-J で見直して中学から103語移した。2026-11-10 に高3の語を18語足した
  })

  it('すべての単語に訳と例文があり、例文に見出し語（またはその変化形）が含まれる', () => {
    for (const w of WORDS) {
      expect(w.ja, w.id).not.toBe('')
      expect(w.exampleJa, w.id).not.toBe('')
      const head = w.en.startsWith('be ') ? w.en.slice(3) : w.en // be 動詞の熟語は変化するので後ろで見る
      expect(w.example.toLowerCase(), w.id).toContain(head.slice(0, 3).toLowerCase())
    }
  })

  it('どのレベルにも単語があり、レベルで絞り込める', () => {
    for (const l of LEVELS) expect(wordsOf([l]).length, l).toBeGreaterThanOrEqual(19)
    expect(wordsOf(['中1']).length).toBeGreaterThanOrEqual(100)
    expect(wordsOf(['中2']).length).toBeGreaterThanOrEqual(100)
    expect(wordsOf(['中3']).length).toBeGreaterThanOrEqual(100)
    expect(wordsOf([...LEVELS])).toHaveLength(WORDS.length)
    expect(wordsOf(['中1']).every((w) => levelOf(w) === '中1')).toBe(true)
  })

  it('意味（ja）が重ならない（4択で同じ選択肢が出ないように）', () => {
    expect(new Set(WORDS.map((w) => w.ja)).size).toBe(WORDS.length)
  })

  it('例文は大文字（か数字）で始まり . ! ? で終わり、訳は 。！？ などで終わる', () => {
    for (const w of WORDS) {
      expect(w.example, w.id).toMatch(/^[A-Z0-9"'“‘]/)
      expect(w.example, w.id).toMatch(/[.!?"”’]$/)
      expect(w.exampleJa, w.id).toMatch(/[。！？）」]$/)
    }
  })
})

it('例文に見出し語（またはその変化形）が入っている', () => {
  const SKIP = new Set(['be', 'oneself', "one's", '...'])
  const IRREGULAR = new Set(['overcome']) // 例文が不規則な過去形
  const bad = WORDS.filter((w) => {
    if (!w.example || IRREGULAR.has(w.id)) return false
    const ex = w.example.toLowerCase()
    const parts = w.en.toLowerCase().replace(/[.?!]/g, '').split(/\s+/).filter((p) => p && !SKIP.has(p))
    return !parts.every((p) => ex.includes(p.slice(0, Math.max(3, p.length - 2))))
  })
  expect(bad.map((w) => w.id)).toEqual([])
})

it('単語のレベルの見直し：CEFR-J で上級・使用頻度も低い語は中学から上の学年へ。基本語は中1のまま', () => {
  const lv = (en: string) => levelOf(WORDS.find((w) => w.en === en)!)
  expect(lv('seldom')).toBe('高校基礎')
  expect(lv('tolerate')).toBe('高校基礎')
  expect(lv('kitten')).toBe('中2')
  expect(lv('sometimes')).toBe('中1')
  expect(lv('season')).toBe('中1')
})
