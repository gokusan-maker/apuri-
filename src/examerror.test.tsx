import { expect, it } from 'vitest'
import { EXAM_ERROR } from './examerror'

it('入試の正誤問題：(A)〜(D) の4か所が文の中にあり、選択肢は4つ、答えはそのうち1つ', () => {
  for (const u of EXAM_ERROR) {
    expect(u.questions.length).toBeGreaterThanOrEqual(10)
    for (const q of u.questions) {
      expect(q.choices).toHaveLength(4)
      q.choices.forEach((c, i) => {
        const mark = `(${'ABCD'[i]})`
        expect(c.startsWith(mark), c).toBe(true)
        expect(q.sentence, c).toContain(`${mark} ${c.slice(4)}`)
      })
      expect(q.choices[q.answer]).toBeDefined()
    }
    expect(new Set(u.questions.map((q) => q.answer)).size).toBe(4) // 答えの位置がかたよらない
  }
})

it('文法ページの「🎓 入試の文法」から正誤問題を開くと、空欄のない文が出る', async () => {
  const { render, screen, fireEvent, within } = await import('@testing-library/react')
  const { Grammar } = await import('./GrammarView')
  render(<Grammar />)
  fireEvent.click(within(screen.getByRole('group', { name: '入試の文法' })).getByRole('button', { name: /正誤問題①/ }))
  fireEvent.click(screen.getByText(/確認問題へ/))
  expect(document.querySelector('.blank-sentence')!.textContent).toContain('(A)')
  expect(document.querySelector('.blank-sentence .blank')).toBeNull()
})

it('正誤問題のランダム10問：ちがう問題が10問、どれも正誤問題の単元から出る', async () => {
  const { randomErrorUnit } = await import('./examerror')
  const u = randomErrorUnit(10, () => 0.3)
  expect(u.questions).toHaveLength(10)
  expect(new Set(u.questions.map((q) => q.sentence)).size).toBe(10)
  const all = new Set(EXAM_ERROR.flatMap((x) => x.questions.map((q) => q.sentence)))
  for (const q of u.questions) expect(all.has(q.sentence)).toBe(true)
})

it('文法ページの「🎲 正誤問題ランダム」から10問を解ける', async () => {
  const { render, screen, fireEvent, within } = await import('@testing-library/react')
  const { Grammar } = await import('./GrammarView')
  render(<Grammar />)
  fireEvent.click(within(screen.getByRole('group', { name: '入試の文法' })).getByRole('button', { name: /正誤問題ランダム/ }))
  fireEvent.click(screen.getByText(/確認問題へ/))
  expect(document.querySelector('.blank-sentence')!.textContent).toContain('(A)')
})
