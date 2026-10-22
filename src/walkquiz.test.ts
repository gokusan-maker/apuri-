import { expect, it } from 'vitest'
import { walkQuiz } from './walk'

it('おさんぽクイズは日記の単語から（同じ単語は1回）3問、選択肢に正解がふくまれる', () => {
  const d = (en: string, ja: string) => ({ day: '2026-10-20', en, ja, place: '公園' })
  const qs = walkQuiz([d('dog', '犬'), d('dog', '犬'), d('cat', 'ねこ'), d('tree', '木'), d('sky', '空')], ['りんご'], () => 0)
  expect(qs).toHaveLength(3)
  expect(new Set(qs.map((q) => q.en)).size).toBe(3)
  for (const q of qs) {
    expect(q.choices).toContain(q.ja)
    expect(new Set(q.choices).size).toBe(q.choices.length)
    expect(q.choices).toHaveLength(3)
  }
})
