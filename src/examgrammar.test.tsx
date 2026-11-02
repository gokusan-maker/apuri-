import { expect, it } from 'vitest'
import { EXAM_GRAMMAR } from './examgrammar'

it('入試の文法：共通テスト〜国立医学部の6レベル、20問以上（共通テスト・私立難関大・国公立大・旧帝大は30問）。答えは選択肢の中、選択肢は4つでかぶらない', () => {
  expect(EXAM_GRAMMAR.map((u) => u.title.split('の文法')[0])).toEqual(['共通テスト', '私立難関大', '私立医学部', '国公立大', '旧帝大', '国立医学部'])
  for (const u of EXAM_GRAMMAR) {
    expect(u.questions).toHaveLength(['exam-kyotsu', 'exam-shiritsu', 'exam-kokkoritsu', 'exam-kyutei'].includes(u.id) ? 30 : 20)
    for (const q of u.questions) {
      expect(q.sentence.match(/___/g)).toHaveLength(1)
      expect(q.choices).toHaveLength(4)
      expect(new Set(q.choices).size).toBe(4)
      expect(q.choices[q.answer]).toBeDefined()
    }
  }
})

it('正解の位置がかたよらない（どの位置も正解になる）', () => {
  const pos = new Set(EXAM_GRAMMAR.flatMap((u) => u.questions.map((q) => q.answer)))
  expect(pos.size).toBe(4)
  // 例：共通テストの1問目は had
  const q = EXAM_GRAMMAR[0].questions[0]
  expect(q.choices[q.answer]).toBe('had')
})

it('文法ページの「🎓 入試の文法」から、レベルをえらんで解ける', async () => {
  const { render, screen, fireEvent, within } = await import('@testing-library/react')
  const { Grammar } = await import('./GrammarView')
  render(<Grammar />)
  fireEvent.click(within(screen.getByRole('group', { name: '入試の文法' })).getByRole('button', { name: /国立医学部/ }))
  expect(screen.getAllByText(/国立医学部の文法/).length).toBeGreaterThan(0)
})

it('京大の文法：長い文の骨組みを見ぬく本番レベルの問題（平均15語以上・高2レベルの決まり文句は出さない）', async () => {
  const { LEVEL_GRAMMAR } = await import('./examgrammar2')
  const u = LEVEL_GRAMMAR.find((x) => x.id === 'exam-kyodai')!
  expect(u.questions).toHaveLength(25)
  const words = u.questions.map((q) => q.sentence.split(/\s+/).length)
  expect(words.reduce((a, b) => a + b, 0) / words.length).toBeGreaterThanOrEqual(15)
  for (const q of u.questions) {
    expect(q.sentence).not.toMatch(/spilt milk|goes without|the town ___ I was born/)
    expect(new Set(q.choices).size).toBe(4)
  }
})

it('東大の文法：長い主語・挿入・仮定法の発展など本番レベルの問題（平均15語以上・高校基礎の短い文は出さない）', async () => {
  const { LEVEL_GRAMMAR } = await import('./examgrammar2')
  const u = LEVEL_GRAMMAR.find((x) => x.id === 'exam-todai')!
  expect(u.questions).toHaveLength(25)
  const words = u.questions.map((q) => q.sentence.split(/\s+/).length)
  expect(words.reduce((a, b) => a + b, 0) / words.length).toBeGreaterThanOrEqual(15)
  for (const q of u.questions) {
    expect(q.sentence).not.toMatch(/It is high time we|All you have to do|I have no idea ___ to do/)
    expect(new Set(q.choices).size).toBe(4)
  }
})
