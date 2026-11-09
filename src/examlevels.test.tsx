import { expect, it } from 'vitest'
import { EXAM_ERROR, EXAM_FIX, randomErrorUnit } from './examerror'
import { ERROR_LEVELS, errorLevelOf, hasErrorLevel } from './examerrorlevel'
import { examSections } from './examlevels'

it('入試の正誤問題・誤文訂正は、全単元に問題そのものの実際のレベルがついている', () => {
  for (const u of [...EXAM_ERROR, ...EXAM_FIX]) {
    expect(hasErrorLevel(u.id), u.id).toBe(true)
    expect(ERROR_LEVELS).toContain(errorLevelOf(u.id))
  }
})

it('単元のタイトルには、実際のレベルとちがう「東大レベル」などの表示がない', () => {
  for (const u of [...EXAM_ERROR, ...EXAM_FIX]) expect(u.title, u.id).not.toMatch(/レベル|難問/)
})

it('レベルごとのまとまりは、やさしいレベルから順で、東大には東大の単元だけが入る', () => {
  const s = examSections()
  const order = s.map((x) => ERROR_LEVELS.indexOf(x.level as (typeof ERROR_LEVELS)[number]))
  expect(order).toEqual([...order].sort((a, b) => a - b))
  const todai = s.find((x) => x.level === '東大')!
  expect(todai.units.map((u) => u.id)).toEqual(['exam-todai', 'exam-error-lv-todai-1', 'exam-error-lv-todai-2', 'exam-error-lv-todai-3', 'exam-error-lv-todai-4', 'exam-error-lv-todai-5', 'exam-error-lv-todai-6', 'exam-error-lv-todai-7', 'exam-error-lv-todai-8', 'exam-error-lv-todai-9', 'exam-error-lv-todai-10', 'exam-error-lv-todai-11', 'exam-error-lv-todai-12', 'exam-error-lv-todai-13', 'exam-error-lv-todai-14', 'exam-error-lv-todai-15', 'exam-error-lv-todai-16', 'exam-error-lv-todai-17', 'exam-error-lv-todai-18', 'exam-error-lv-todai-19', 'exam-error-lv-todai-20', 'exam-error-lv-todai-21', 'exam-error-lv-todai-22', 'exam-error-lv-todai-23', 'exam-error-lv-todai-24', 'exam-error-lv-todai-25', 'exam-error-lv-todai-26', 'exam-error-lv-todai-27', 'exam-error-lv-todai-28', 'exam-error-lv-todai-29', 'exam-error-lv-todai-30', 'exam-error-lv-todai-31', 'exam-error-lv-todai-32', 'exam-error-lv-todai-33', 'exam-error-lv-todai-34', 'exam-error-lv-todai-35', 'exam-error-lv-todai-36', 'exam-error-lv-todai-37', 'exam-error-lv-todai-38', 'exam-error-lv-todai-39', 'exam-error-lv-todai-40', 'exam-error-lv-todai-41', 'exam-error-lv-todai-42', 'exam-error-lv-todai-43', 'exam-error-lv-todai-44', 'exam-error-lv-todai-45', 'exam-error-lv-todai-46', 'exam-error-lv-todai-47', 'exam-error-lv-todai-48', 'exam-error-lv-todai-49', 'exam-error-lv-todai-50', 'exam-error-lv-todai-51', 'exam-fix-lv-todai-1', 'exam-fix-lv-todai-2', 'exam-fix-lv-todai-3', 'exam-fix-lv-todai-4', 'exam-fix-lv-todai-5', 'exam-fix-lv-todai-6', 'exam-fix-lv-todai-7', 'exam-fix-lv-todai-8', 'exam-fix-lv-todai-9', 'exam-fix-lv-todai-10', 'exam-fix-lv-todai-11', 'exam-fix-lv-todai-12', 'exam-fix-lv-todai-13', 'exam-fix-lv-todai-14', 'exam-fix-lv-todai-15', 'exam-fix-lv-todai-16', 'exam-fix-lv-todai-17', 'exam-fix-lv-todai-18', 'exam-fix-lv-todai-19', 'exam-fix-lv-todai-20', 'exam-fix-lv-todai-21', 'exam-fix-lv-todai-22', 'exam-fix-lv-todai-23', 'exam-fix-lv-todai-24', 'exam-fix-lv-todai-25', 'exam-fix-lv-todai-26', 'exam-fix-lv-todai-27', 'exam-fix-lv-todai-28', 'exam-fix-lv-todai-29', 'exam-fix-lv-todai-30', 'exam-fix-lv-todai-31', 'exam-fix-lv-todai-32', 'exam-fix-lv-todai-33', 'exam-fix-lv-todai-34', 'exam-fix-lv-todai-35', 'exam-fix-lv-todai-36', 'exam-fix-lv-todai-37', 'exam-fix-lv-todai-38', 'exam-fix-lv-todai-39', 'exam-fix-lv-todai-40', 'exam-fix-lv-todai-41', 'exam-fix-lv-todai-42', 'exam-fix-lv-todai-43', 'exam-fix-lv-todai-44', 'exam-fix-lv-todai-45', 'exam-fix-lv-todai-46', 'exam-fix-lv-todai-47', 'exam-fix-lv-todai-48', 'exam-fix-lv-todai-49', 'exam-fix-lv-todai-50', 'exam-fix-lv-todai-51'])
  // 句動詞だけの短い文の単元（pick up・look into）は東大・京大に入らない
  for (const lv of ['東大', '京大']) for (const u of s.find((x) => x.level === lv)!.units) expect(u.title).not.toMatch(/pick up|look into/)
})

it('私学難関〜東大の新しい単元は、そのレベルの長さの文（京大・東大は25語以上）', () => {
  const min: Record<string, number> = { 私学難関: 15, 国公立: 18, 旧帝大: 22, 京大: 25, 東大: 25 }
  for (const u of [...EXAM_ERROR, ...EXAM_FIX].filter((x) => x.id.includes('-lv-'))) {
    expect(u.questions).toHaveLength(10)
    for (const q of u.questions) expect(q.sentence.replace(/\([A-D]\) |\[|\]/g, '').split(/\s+/).length, q.sentence).toBeGreaterThanOrEqual(min[errorLevelOf(u.id)])
  }
})

it('正誤問題のランダムは、レベルをえらぶとそのレベルの問題だけから出る', () => {
  const lv = errorLevelOf(EXAM_ERROR[0].id)
  const pool = new Set(EXAM_ERROR.filter((u) => errorLevelOf(u.id) === lv).flatMap((u) => u.questions.map((q) => q.sentence)))
  const u = randomErrorUnit(10, () => 0.4, lv)
  expect(u.questions).toHaveLength(10)
  for (const q of u.questions) expect(pool.has(q.sentence)).toBe(true)
  expect(u.title).toContain(lv)
})

it('文法ページの「入試の文法」でレベルをえらぶと、そのレベルの単元だけが見える', async () => {
  const { render, screen, fireEvent, within } = await import('@testing-library/react')
  const { Grammar } = await import('./GrammarView')
  render(<Grammar />)
  fireEvent.click(within(screen.getByRole('group', { name: '入試の文法のレベル' })).getByRole('button', { name: '東大' }))
  const g = within(screen.getByRole('group', { name: '入試の文法' }))
  expect(g.getByText(/^東大/, { selector: '.exam-lv-head' })).toBeTruthy()
  expect(g.queryByText(/^中3/, { selector: '.exam-lv-head' })).toBeNull()
  fireEvent.click(g.getByRole('button', { name: /東大①：論説文/ }))
  fireEvent.click(screen.getByText(/確認問題へ/))
  expect(document.querySelector('.blank-sentence')!.textContent).toContain('(A)')
})
