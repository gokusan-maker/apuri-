import { expect, it } from 'vitest'
import { EXAM_GRAMMAR } from './examgrammar'

it('入試の文法：共通テスト〜国立医学部の6レベル、それぞれ20問。答えは選択肢の中、選択肢は4つでかぶらない', () => {
  expect(EXAM_GRAMMAR.map((u) => u.title.split('の文法')[0])).toEqual(['共通テスト', '私立難関大', '私立医学部', '国公立大', '旧帝大', '国立医学部'])
  for (const u of EXAM_GRAMMAR) {
    expect(u.questions).toHaveLength(20)
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
