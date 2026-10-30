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

it('正誤問題でまちがえた問題は、結果画面の「🔁 まちがい○問をもう一度」でその問題だけ解き直せる', async () => {
  const { render, screen, fireEvent, within } = await import('@testing-library/react')
  const { Grammar } = await import('./GrammarView')
  localStorage.clear()
  render(<Grammar />)
  const unit = EXAM_ERROR[0]
  fireEvent.click(within(screen.getByRole('group', { name: '入試の文法' })).getByRole('button', { name: /正誤問題①/ }))
  fireEvent.click(screen.getByText(/確認問題へ/))
  unit.questions.forEach((q, i) => {
    fireEvent.click(screen.getByRole('button', { name: q.choices[i === 1 ? (q.answer + 1) % q.choices.length : q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  })
  fireEvent.click(screen.getByText('🔁 まちがい1問をもう一度'))
  expect(document.querySelector('.grammar-progress')!.textContent).toBe('1 / 1 問目')
  expect(document.querySelector('.blank-sentence')!.textContent).toBe(unit.questions[1].sentence)
})

it('誤文訂正：文に［ ］が1つあり、選択肢は4つでかぶらず、答えは［ ］の中の語とちがう', async () => {
  const { EXAM_FIX } = await import('./examerror')
  for (const u of EXAM_FIX) {
    expect(u.questions.length).toBeGreaterThanOrEqual(10)
    for (const q of u.questions) {
      const m = q.sentence.match(/\[([^\]]+)\]/g)
      expect(m, q.sentence).toHaveLength(1)
      expect(q.choices).toHaveLength(4)
      expect(new Set(q.choices).size).toBe(4)
      expect(q.choices[q.answer]).not.toBe(m![0].slice(1, -1))
    }
  }
})

it('文法ページの「🎓 入試の文法」から誤文訂正を開ける', async () => {
  const { render, screen, fireEvent, within } = await import('@testing-library/react')
  const { Grammar } = await import('./GrammarView')
  render(<Grammar />)
  fireEvent.click(within(screen.getByRole('group', { name: '入試の文法' })).getByRole('button', { name: /誤文訂正①/ }))
  fireEvent.click(screen.getByText(/確認問題へ/))
  expect(document.querySelector('.blank-sentence')!.textContent).toMatch(/\[.+\]/)
})

it('誤文訂正の正解の位置はかたよらない', async () => {
  const { EXAM_FIX } = await import('./examerror')
  expect(new Set(EXAM_FIX.flatMap((u) => u.questions.map((q) => q.answer))).size).toBe(4)
})

it('誤文訂正③：医学部・難関大レベルの単元が10問あり、答えは正しい形になっている', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('had I arrived')
  for (const q of u.questions) expect(q.choices).toHaveLength(4)
})

it('誤文訂正④：TOEFL・IELTS の書き言葉の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-4')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('discuss')
})

it('正誤問題⑪：make/do・say/tell などの語法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-words')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('(B) make')
})

it('誤文訂正⑤：時制・仮定法の難問の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-5')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[4].choices[u.questions[4].answer]).toBe('could')
})

it('正誤問題⑫：前置詞・冠詞の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-prep')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[2].choices[u.questions[2].answer]).toBe('(B) a honest man who')
})

it('誤文訂正⑥：接続詞・分詞構文の難問の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-6')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('Seen')
})

it('正誤問題⑬：名詞・代名詞の難問の単元が10問ある（単元の id はかぶらない）', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-noun2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) furnitures')
  expect(new Set(EXAM_ERROR.map((x) => x.id)).size).toBe(EXAM_ERROR.length)
})

it('誤文訂正⑦：比較・倒置の難問の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-7')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('have I seen')
  expect(new Set(EXAM_FIX.map((x) => x.id)).size).toBe(EXAM_FIX.length)
})

it('正誤問題⑭：関係詞・接続詞の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-relconj')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('(A) who father')
})

it('誤文訂正⑧：助動詞・不定詞の難問の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-8')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('had better not')
})

it('正誤問題⑮：動名詞・分詞の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-gerund')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('(D) so bored')
})
