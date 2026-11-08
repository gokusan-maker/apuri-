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

it('誤文訂正⑨：語順・語法の難問の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-9')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[5].choices[u.questions[5].answer]).toBe('lend me')
})

it('正誤問題⑯：受け身・時制の一致の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-passive')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('(B) spoken')
})

it('誤文訂正⑩：TOEFL・IELTS のつなぎ言葉の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-10')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('However')
})

it('正誤問題⑰：形容詞・副詞の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-adj')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) good')
})

it('誤文訂正⑪：数字・グラフの説明の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-11')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('rose')
})

it('正誤問題⑱：仮定法・助動詞の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-subj')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[2].choices[u.questions[2].answer]).toBe('(A) have')
})

it('誤文訂正⑫：意見を述べる表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-12')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('with')
})

it('正誤問題⑲：比較の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-compare2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[7].choices[u.questions[7].answer]).toBe('(A) less')
})

it('誤文訂正⑬：原因と結果の表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-13')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('resulted in')
})

it('正誤問題⑳：主語と動詞の一致の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-agree2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) live')
})

it('誤文訂正⑭：くだけすぎた表現を書き言葉にする単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-14')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('are going to')
})

it('正誤問題㉑：不定詞の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-inf')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[5].choices[u.questions[5].answer]).toBe('(B) to be')
})

it('誤文訂正⑮：関係詞の難問②の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-15')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('which')
})

it('正誤問題㉒：時制の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-tense2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[4].choices[u.questions[4].answer]).toBe('(A) am knowing')
})

it('誤文訂正⑯：名詞・冠詞の難問の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-16')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('a university')
})

it('正誤問題㉓：make/let/allow・rise/raise・lie/lay の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-usage2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('(A) lay down')
})

it('誤文訂正⑰：前置詞の難問②の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-17')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[6].choices[u.questions[6].answer]).toBe('by')
})

it('正誤問題㉔：代名詞の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-pronoun')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[2].choices[u.questions[2].answer]).toBe('(D) my')
})

it('誤文訂正⑱：くり返しをさける言いかえの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-18')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('that of India')
})

it('正誤問題㉕：分詞構文・接続詞の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-partconj')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[8].choices[u.questions[8].answer]).toBe('(A) Seeing')
})

it('誤文訂正⑲：並列の形をそろえる単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-19')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('cooking')
})

it('正誤問題㉖：倒置・強調の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-invert')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('(B) which')
})

it('誤文訂正⑳：医学部・難関大レベル②の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-20')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[5].choices[u.questions[5].answer]).toBe('than')
})

it('正誤問題㉗：医学部・難関大レベルの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-hard')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[2].choices[u.questions[2].answer]).toBe('(B) takes')
})

it('誤文訂正㉑：数えられる名詞・数えられない名詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-21')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[2].choices[u.questions[2].answer]).toBe('progress')
})

it('正誤問題㉘：関係詞・名詞節の難問の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-clause')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[7].choices[u.questions[7].answer]).toBe('(A) where')
})

it('誤文訂正㉒：動詞の語法の難問③の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-22')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('robbed me')
})

it('正誤問題㉙：冠詞と数の一致の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-article')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('(B) an another')
})

it('誤文訂正㉓：時制をそろえる単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-23')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[2].choices[u.questions[2].answer]).toBe('has increased')
})

it('正誤問題㉚：総合（大学入試の頻出ミス）の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-mix')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('(B) gone to')
})

it('誤文訂正㉔：TOEFL・IELTS の書き言葉のまとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-24')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('will discuss')
})

it('正誤問題㉛：医学部・難関大レベル②の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-hard2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[6].choices[u.questions[6].answer]).toBe('(A) which')
})

it('誤文訂正㉕：共通テストレベルの総復習の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-25')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('went')
})

it('正誤問題㉜：共通テストレベル（高2の総復習）の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-review2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('(B) to smoke')
})

it('誤文訂正㉖：国公立二次レベルの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-26')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('that')
})

it('正誤問題㉝：国公立二次レベルの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-national')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('(B) than')
})

it('誤文訂正㉗：私大難関レベルの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-27')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('senior to')
})

it('正誤問題㉞：私大難関レベルの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-private')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[6].choices[u.questions[6].answer]).toBe('(A) are')
})

it('誤文訂正㉘：主語のわかりにくい長い文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-28')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('show')
})

it('正誤問題㉟：長い主語と動詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-longsubj')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('(D) are the castle')
})

it('誤文訂正㉙：関係詞と前置詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-29')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('to whom')
})

it('正誤問題㊱：関係詞と前置詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-relprep')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[6].choices[u.questions[6].answer]).toBe('(A) for whom')
})

it('誤文訂正㉚：まぎらわしい語の使い分けの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-30')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('affect')
})

it('正誤問題㊲：まぎらわしい語の使い分けの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-confusing')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[9].choices[u.questions[9].answer]).toBe('(A) principle')
})

it('誤文訂正㉛：共通テストレベル（語法の総復習）の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-31')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('listened to')
})

it('正誤問題㊳：共通テストレベル（語法の総復習）の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-usage3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[8].choices[u.questions[8].answer]).toBe('(A) spent')
})

it('誤文訂正㉜：医学部・難関大レベル③の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-32')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[7].choices[u.questions[7].answer]).toBe('lay down')
})

it('正誤問題㊴：医学部・難関大レベル③の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-hard3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) so')
})

it('誤文訂正㉝：比べる・対比する表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-33')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[2].choices[u.questions[2].answer]).toBe('superior')
})

it('正誤問題㊵：比べる・対比する表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-compare3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[2].choices[u.questions[2].answer]).toBe('(A) is more superior')
})

it('誤文訂正㉞：時制と仮定法の総復習の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-34')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('were')
})

it('正誤問題㊶：時制と仮定法の総復習の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-tense3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('(D) am you')
})

it('誤文訂正㉟：原因と結果をあらわす表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-35')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('resulted in')
})

it('正誤問題㊷：原因と結果をあらわす表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-cause')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('(A) resulted from')
})

it('誤文訂正㊱：関係詞と接続詞のまとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-36')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('where')
})

it('正誤問題㊸：関係詞と接続詞のまとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-relconj2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[4].choices[u.questions[4].answer]).toBe('(B) which roof')
})

it('誤文訂正㊲：数や量をあらわす表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-37')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('is')
})

it('正誤問題㊹：数や量をあらわす表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-quantity')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) are')
})

it('誤文訂正㊳：熟語・語法の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-38')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('opening')
})

it('正誤問題㊺：熟語・語法の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-idiom2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('(C) to open')
})

it('誤文訂正㊴：意見を述べる・ゆずる表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-39')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('Despite')
})

it('正誤問題㊻：意見を述べる・ゆずる表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-opinion')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) opinions')
})

it('誤文訂正㊵：分詞構文・強調構文・同格の that の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-40')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Seen')
})

it('正誤問題㊼：分詞構文・強調構文・同格の that の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-hard4')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Seeing from the plane')
})

it('誤文訂正㊶：前置詞の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-41')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('on')
})

it('正誤問題㊽：前置詞の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-prep2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[8].choices[u.questions[8].answer]).toBe('(D) by foot')
})

it('誤文訂正㊷：つなぎのことばの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-42')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[3].choices[u.questions[3].answer]).toBe('or')
})

it('正誤問題㊾：つなぎのことばの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-linking')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) however')
})

it('誤文訂正㊸：名詞・冠詞・代名詞の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-43')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('some advice')
})

it('正誤問題㊿：名詞・冠詞・代名詞の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-noun3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[6].choices[u.questions[6].answer]).toBe('(C) my')
})

it('誤文訂正㊹：受け身と無生物主語の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-44')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('is spoken')
})

it('正誤問題〈51〉：受け身と無生物主語の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-passive3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('(A) speaks')
})

it('誤文訂正㊺：比較の慣用表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-45')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('no more than')
})

it('正誤問題〈52〉：比較の慣用表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-compare4')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) than')
})

it('誤文訂正㊻：不定詞と動名詞の使い分けの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-46')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('swimming')
})

it('正誤問題〈53〉：不定詞と動名詞の使い分けの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-infger')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) to swim')
})

it('誤文訂正㊼：グラフ・表を説明する表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-47')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('rose')
})

it('正誤問題〈54〉：グラフ・表を説明する表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-graph')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) raised')
})

it('誤文訂正㊽：形容詞・副詞の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-48')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('well')
})

it('正誤問題〈55〉：形容詞・副詞の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-adjadv')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) good')
})

it('誤文訂正㊾：倒置・省略・挿入の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-49')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('have I seen')
})

it('正誤問題〈56〉：倒置・省略・挿入の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-hard5')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) I have seen')
})

it('誤文訂正㊿：関係代名詞と関係副詞の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-50')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('which')
})

it('正誤問題〈57〉：関係代名詞と関係副詞の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-rel3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) where')
})

it('誤文訂正〈51〉：問題と解決を述べる表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-51')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('is to improve')
})

it('正誤問題〈58〉：問題と解決を述べる表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-solution')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) is improve')
})

it('誤文訂正〈52〉：まぎらわしい動詞の語法の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-52')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('rises')
})

it('正誤問題〈59〉：まぎらわしい動詞の語法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-verbs')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) raises')
})

it('誤文訂正〈53〉：仮定法の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-53')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('were')
})

it('正誤問題〈60〉：仮定法の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-subj2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) am taller')
})

it('誤文訂正〈54〉：例をあげる・言いかえる表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-54')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('For example')
})

it('正誤問題〈61〉：例をあげる・言いかえる表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-example')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) For example of')
})

it('誤文訂正〈55〉：時制と一致の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-55')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('was')
})

it('正誤問題〈62〉：時制と一致の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-tense4')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[2].choices[u.questions[2].answer]).toBe('(C) moved')
})

it('誤文訂正〈56〉：名詞構文・無生物主語・強調の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-56')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('death')
})

it('正誤問題〈63〉：名詞構文・無生物主語・強調の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-hard6')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) died')
})

it('誤文訂正〈57〉：助動詞の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-57')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('had better not')
})

it('正誤問題〈64〉：助動詞の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-modal2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) had better not to')
})

it('誤文訂正〈58〉：前置詞をふくむ熟語の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-58')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('of')
})

it('正誤問題〈65〉：前置詞をふくむ熟語の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-prepidiom')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) proud about')
})

it('誤文訂正〈59〉：結論・まとめの表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-59')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('In conclusion')
})

it('正誤問題〈66〉：結論・まとめの表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-conclusion')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) In conclude')
})

it('誤文訂正〈60〉：比較の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-60')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('tallest')
})

it('正誤問題〈67〉：比較の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-compare5')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) the most tallest')
})

it('誤文訂正〈61〉：前置詞＋関係代名詞・複合関係詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-61')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('in which')
})

it('正誤問題〈68〉：前置詞＋関係代名詞・複合関係詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-hard7')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) with that')
})

it('誤文訂正〈62〉：受け身の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-62')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('loved')
})

it('正誤問題〈69〉：受け身の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-passive4')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) is loving')
})

it('誤文訂正〈63〉：名詞の数と冠詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-63')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('research suggests')
})

it('正誤問題〈70〉：名詞の数と冠詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-noun4')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) a lot of researches')
})

it('誤文訂正〈64〉：分詞の形容詞用法の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-64')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('boring')
})

it('正誤問題〈71〉：主語と動詞の一致の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-agree3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) is')
})

it('誤文訂正〈65〉：主語と動詞の一致の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-65')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('are')
})

it('正誤問題〈72〉：分詞の形容詞用法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-participle3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) bored that')
})

it('誤文訂正〈66〉：比較の慣用表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-66')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('the better')
})

it('正誤問題〈73〉：比較の慣用表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-compare6')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) the most')
})

it('誤文訂正〈67〉：つなぎのことばの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-67')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Despite')
})

it('正誤問題〈74〉：つなぎのことばの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-linking3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Although')
})

it('誤文訂正〈68〉：仮定法の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-68')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('were')
})

it('正誤問題〈75〉：仮定法の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-subj3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) am')
})

it('誤文訂正〈69〉：代名詞の一致の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-69')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('its')
})

it('正誤問題〈76〉：代名詞の一致の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-pronoun3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) their new plan')
})

it('誤文訂正〈70〉：関係詞の総まとめの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-70')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('where')
})

it('正誤問題〈77〉：関係詞の総まとめの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-rel4')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) which I')
})

it('誤文訂正〈71〉：時制の一致と話法の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-71')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('was')
})

it('正誤問題〈78〉：時制の一致と話法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-speech2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) is')
})

it('誤文訂正〈72〉：並列の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-72')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('cooking')
})

it('正誤問題〈79〉：並列の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-parallel2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) to cook')
})

it('誤文訂正〈73〉：不定詞と動名詞の使い分けの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-73')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('talking')
})

it('正誤問題〈80〉：不定詞と動名詞の使い分けの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-infger2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) to talk')
})

it('誤文訂正〈74〉：語の形の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-74')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('economic')
})

it('正誤問題〈81〉：語の形の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-wordform2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) economical')
})

it('誤文訂正〈75〉：助動詞＋have ＋過去分詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-75')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('must have rained')
})

it('正誤問題〈82〉：助動詞＋have ＋過去分詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-modalpast')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) must rain')
})

it('誤文訂正〈76〉：まぎらわしい動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-76')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('risen')
})

it('正誤問題〈83〉：まぎらわしい動詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-verbs2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) raised')
})

it('誤文訂正〈77〉：まぎらわしい前置詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-77')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('by')
})

it('正誤問題〈84〉：まぎらわしい前置詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-prep3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) until')
})

it('誤文訂正〈78〉：倒置の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-78')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('have I seen')
})

it('正誤問題〈85〉：倒置の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-inversion2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) I have')
})

it('誤文訂正〈79〉：使役動詞と知覚動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-79')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('clean')
})

it('正誤問題〈86〉：使役動詞と知覚動詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-causative2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) to clean')
})

it('誤文訂正〈80〉：分詞構文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-80')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Walking')
})

it('正誤問題〈87〉：分詞構文の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-participle4')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Walked along the beach,')
})

it('誤文訂正〈81〉：冠詞 a／the／なしの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-81')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('The cat')
})

it('正誤問題〈88〉：冠詞 a／the／なしの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-article2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) A cat')
})

it('誤文訂正〈82〉：強調構文と it の用法の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-82')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('that')
})

it('正誤問題〈89〉：強調構文と it の用法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-itcleft')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) which')
})

it('誤文訂正〈83〉：数量の表し方の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-83')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('many')
})

it('正誤問題〈90〉：数量の表し方の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-quantity2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) much people')
})

it('誤文訂正〈84〉：接続詞の使い分けの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-84')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('unless')
})

it('正誤問題〈91〉：接続詞の使い分けの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-conj3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) if you')
})

it('誤文訂正〈85〉：名詞節の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-85')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Whether')
})

it('正誤問題〈92〉：名詞節の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-nounclause')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) If the plan')
})

it('誤文訂正〈86〉：同格の that と名詞＋to 不定詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-86')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('that')
})

it('正誤問題〈93〉：同格の that と名詞＋to 不定詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-appositive')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) which the team')
})

it('誤文訂正〈87〉：受け身の書き言葉の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-87')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('is believed')
})

it('正誤問題〈94〉：受け身の書き言葉の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-passive5')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) believes')
})

it('誤文訂正〈88〉：再帰代名詞と相互代名詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-88')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('myself')
})

it('正誤問題〈95〉：再帰代名詞と相互代名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-reflexive')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Myself')
})

it('誤文訂正〈89〉：比較の書き言葉の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-89')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('from')
})

it('正誤問題〈96〉：比較の書き言葉の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-compare7')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) than')
})

it('誤文訂正〈90〉：仮定法の発展の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-90')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Were I')
})

it('正誤問題〈97〉：仮定法の発展の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-subj4')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) I were you,')
})

it('誤文訂正〈91〉：前置詞のつく動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-91')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('on')
})

it('正誤問題〈98〉：前置詞のつく動詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-prepverbs')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) of')
})

it('誤文訂正〈92〉：不定詞の意味上の主語と完了不定詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-92')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('for')
})

it('正誤問題〈99〉：不定詞の意味上の主語と完了不定詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-infsubject')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) of me')
})

it('誤文訂正〈93〉：書き言葉のまとめ問題①の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-93')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('research shows')
})

it('正誤問題〈100〉：書き言葉のまとめ問題②の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-review1')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) researches')
})

it('誤文訂正〈94〉：まとめ問題③の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-94')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('have lived')
})

it('正誤問題〈101〉：まとめ問題④の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-review4')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) live')
})

it('誤文訂正〈95〉：まぎらわしい形容詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-95')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('sensible')
})

it('正誤問題〈102〉：まぎらわしい形容詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-adjectives')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) a sensitive decision')
})

it('誤文訂正〈96〉：TOEFL・IELTS のまとめ問題⑤が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-96')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[1].choices[u.questions[1].answer]).toBe('has')
})

it('正誤問題〈103〉：TOEFL・IELTS のまとめ問題⑥の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-review5')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) shows that')
})

it('誤文訂正〈97〉：まぎらわしい動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-97')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('lay')
})

it('正誤問題〈104〉：まぎらわしい動詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-confverbs')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) laid down')
})

it('誤文訂正〈98〉：比較の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-98')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('that of Osaka')
})

it('正誤問題〈105〉：TOEFL・IELTS の比較の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-compare8')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) Norway')
})

it('誤文訂正〈99〉：まぎらわしい名詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-99')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('fare')
})

it('正誤問題〈106〉：まぎらわしい名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-nouns')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) price from Tokyo')
})

it('誤文訂正〈100〉：京大レベルの長い文の一致の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-100')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('suggests')
})

it('正誤問題〈107〉：京大レベルの長い文の構造の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) it was announced')
})

it('誤文訂正〈101〉：東大レベルの時制・仮定法の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-101')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('had begun')
})

it('正誤問題〈108〉：東大レベルの時制・仮定法・譲歩の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) If the scientists would have')
})

it('誤文訂正〈102〉：まぎらわしい副詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-102')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('hard')
})

it('正誤問題〈109〉：まぎらわしい副詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-adverbs')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) hardly all night')
})

it('誤文訂正〈103〉：旧帝大レベルの分詞構文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-103')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Written')
})

it('正誤問題〈110〉：旧帝大レベルの分詞構文の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-participle5')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Writing in simple language,')
})

it('誤文訂正〈104〉：時と場所の前置詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-104')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('at')
})

it('正誤問題〈111〉：時と場所の前置詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-timeprep')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) on three')
})

it('誤文訂正〈105〉：国公立レベルの関係詞の発展の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-105')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('What')
})

it('正誤問題〈112〉：国公立レベルの関係詞の発展の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-rel5')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) That')
})

it('誤文訂正〈106〉：京大レベルの無生物主語・名詞構文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-106')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('from reaching')
})

it('正誤問題〈113〉：自動詞と他動詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-transitive')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) We discussed about the plan')
})

it('誤文訂正〈107〉：東大レベルの要約・英作文の接続語の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-107')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Although')
})

it('正誤問題〈114〉：東大レベルの接続語の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-connectives')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Despite the team practiced hard,')
})

it('誤文訂正〈108〉：旧帝大レベルの倒置・強調構文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-108')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('have I seen')
})

it('正誤問題〈115〉：旧帝大レベルの倒置・強調構文の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-inversion3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Never I have')
})

it('誤文訂正〈109〉：数えられる名詞・数えられない名詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-109')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('some advice')
})

it('正誤問題〈116〉：数えられる名詞・数えられない名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-countable')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) an useful advice')
})

it('誤文訂正〈110〉：京大レベルの省略と代用の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-110')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('to')
})

it('正誤問題〈117〉：京大レベルの省略と代用の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-ellipsis')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) to it')
})

it('誤文訂正〈111〉：使役動詞・知覚動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-111')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('write')
})

it('正誤問題〈118〉：使役動詞・知覚動詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-causative3')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) to run')
})

it('誤文訂正〈112〉：東大レベルの英作文の語法の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-112')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('suggested that I read')
})

it('正誤問題〈119〉：東大レベルの英作文の語法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-usage-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) suggested me')
})

it('誤文訂正〈113〉：不定詞と動名詞の使い分けの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-113')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('smoking')
})

it('正誤問題〈120〉：不定詞と動名詞の使い分けの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-toing')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) to drink coffee')
})

it('誤文訂正〈114〉：旧帝大レベルの仮定法の発展の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-114')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('were')
})

it('正誤問題〈121〉：旧帝大レベルの仮定法の発展の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-subj5')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) is not for')
})

it('誤文訂正〈115〉：比較の発展の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-115')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('quickly as possible')
})

it('正誤問題〈122〉：比較の発展の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-compare9')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) possibly')
})

it('誤文訂正〈116〉：京大レベルの what の慣用表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-116')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('what we call')
})

it('正誤問題〈123〉：京大レベルの what の慣用表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-what')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) that we call')
})

it('誤文訂正〈117〉：時制 現在完了と過去の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-117')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('visited')
})

it('正誤問題〈124〉：時制 現在完了と過去の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-tense5')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) I have visited')
})

it('誤文訂正〈118〉：東大レベル 英作文の冠詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-118')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Smartphones have')
})

it('正誤問題〈125〉：東大レベル 英作文の冠詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-article-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Smartphone')
})

it('誤文訂正〈119〉：旧帝大レベル 比較の慣用表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-119')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('The more you read')
})

it('正誤問題〈126〉：旧帝大レベル 比較の慣用表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-compare-idiom')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) More you practice,')
})

it('誤文訂正〈120〉：国公立レベル 関係詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-120')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('which')
})

it('正誤問題〈127〉：国公立レベル 関係詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-relative-koku')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) what my uncle')
})

it('誤文訂正〈121〉：京大レベル 分詞構文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-121')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Seen')
})

it('正誤問題〈128〉：京大レベル 分詞構文の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-participle-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Seeing from')
})

it('誤文訂正〈122〉：東大レベル 仮定法の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-122')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('knew')
})

it('正誤問題〈129〉：東大レベル 仮定法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-subjunctive-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) know')
})

it('誤文訂正〈123〉：旧帝大レベル 主語と動詞の一致の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-123')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('is')
})

it('正誤問題〈130〉：旧帝大レベル 主語と動詞の一致の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-agreement-kyutei')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) are')
})

it('誤文訂正〈124〉：京大レベル 強調構文と倒置の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-124')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('have I seen')
})

it('正誤問題〈131〉：京大レベル 強調構文と倒置の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-inversion-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) I have')
})

it('誤文訂正〈125〉：国公立レベル 不定詞と動名詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-125')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('seeing')
})

it('正誤問題〈132〉：国公立レベル 不定詞と動名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-gerund-koku')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) see')
})

it('誤文訂正〈126〉：東大レベル 英作文の語法の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-126')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('discussed')
})

it('正誤問題〈133〉：東大レベル 英作文の語法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-usage-todai2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) about')
})

it('誤文訂正〈127〉：旧帝大レベル 数量の言い方の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-127')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('much')
})

it('正誤問題〈134〉：旧帝大レベル 数量の言い方の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-quantity-kyutei')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) many')
})

it('誤文訂正〈128〉：京大レベル 時制の一致と話法の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-128')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('was')
})

it('正誤問題〈135〉：京大レベル 時制の一致と話法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-speech-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) is')
})

it('誤文訂正〈129〉：国公立レベル 前置詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-129')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('at')
})

it('正誤問題〈136〉：国公立レベル 前置詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-prep-koku')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) on')
})

it('誤文訂正〈130〉：東大レベル まぎらわしい動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-130')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('made')
})

it('正誤問題〈137〉：東大レベル まぎらわしい動詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-verbs-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) did')
})

it('誤文訂正〈131〉：旧帝大レベル 代名詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-131')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('one')
})

it('正誤問題〈138〉：旧帝大レベル 代名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-pronoun-kyutei')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) it')
})

it('誤文訂正〈132〉：京大レベル 接続詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-132')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('unless you hurry')
})

it('正誤問題〈139〉：京大レベル 接続詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-conj-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) you do not')
})

it('誤文訂正〈133〉：国公立レベル 受動態の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-133')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('of')
})

it('正誤問題〈140〉：国公立レベル 受動態の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-passive-koku')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) from')
})

it('誤文訂正〈134〉：東大レベル 形容詞と副詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-134')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('hard')
})

it('正誤問題〈141〉：東大レベル 形容詞と副詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-adverb-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) hardly')
})

it('誤文訂正〈135〉：旧帝大レベル 使役動詞と知覚動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-135')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('write')
})

it('正誤問題〈142〉：旧帝大レベル 使役動詞と知覚動詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-causative-kyutei')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) to run')
})

it('誤文訂正〈136〉：京大レベル 無生物主語の構文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-136')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('from going')
})

it('正誤問題〈143〉：京大レベル 無生物主語の構文の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-inanimate-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) to play')
})

it('誤文訂正〈137〉：国公立レベル 関係副詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-137')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('where')
})

it('正誤問題〈144〉：国公立レベル 関係副詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-reladverb-kokkoritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) at')
})

it('誤文訂正〈138〉：東大レベル 英作文の数と時の表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-138')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('for the first time')
})

it('正誤問題〈145〉：京大レベル 譲歩の表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-concession-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) However you are')
})

it('誤文訂正〈139〉：国公立レベル 動名詞を目的語にとる動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-139')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('swimming')
})

it('正誤問題〈146〉：東大レベル 付帯状況の withの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-with-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) closing,')
})

it('誤文訂正〈140〉：京大レベル 名詞構文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-140')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('have')
})

it('正誤問題〈147〉：国公立レベル 形容詞の叙述用法と後置の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-adjective-kokkoritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) asleep')
})

it('誤文訂正〈141〉：東大レベル 英作文の数えられない名詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-141')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('a lot of advice')
})

it('正誤問題〈148〉：京大レベル 動名詞の意味上の主語と完了形の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-gerund-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) be')
})

it('誤文訂正〈142〉：国公立レベル 再帰代名詞と熟語の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-142')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('ourselves')
})

it('正誤問題〈149〉：東大レベル 英作文の冠詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-article2-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) the soccer')
})

it('誤文訂正〈143〉：京大レベル 使役 have／get と受け身の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-143')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('cut')
})

it('正誤問題〈150〉：国公立レベル 数量形容詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-quantity-kokkoritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) few')
})

it('誤文訂正〈144〉：東大レベル 英作文の前置詞 in／on／atの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-144')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('in')
})

it('正誤問題〈151〉：京大レベル 準否定と倒置の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-negation-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) not')
})

it('誤文訂正〈145〉：国公立レベル 比較級の強めと the＋比較級の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-145')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('much')
})

it('正誤問題〈152〉：東大レベル 英作文の現在完了と過去形の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-perfect-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) have visited')
})

it('誤文訂正〈146〉：京大レベル 感情を表す分詞形容詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-146')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('interesting')
})

it('正誤問題〈153〉：国公立レベル 接続詞と前置詞の使い分けの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-conj-kokkoritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) because of')
})

it('誤文訂正〈147〉：東大レベル 英作文の自動詞と他動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-147')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('discussed')
})

it('正誤問題〈154〉：京大レベル 仮定法の if の省略と倒置の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-inversion-if-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) know')
})

it('誤文訂正〈148〉：国公立レベル 不定詞の意味上の主語 for／ofの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-148')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('of')
})

it('正誤問題〈155〉：東大レベル 英作文の名詞の数と主語の一致の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-agreement-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) my friend')
})

it('誤文訂正〈149〉：京大レベル 関係代名詞 what と that・whichの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-149')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('what')
})

it('正誤問題〈156〉：国公立レベル 助動詞＋have＋過去分詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-modal-have-kokkoritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) came')
})

it('誤文訂正〈150〉：東大レベル 英作文の時の前置詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-150')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('by')
})

it('正誤問題〈157〉：京大レベル 強調構文と形式主語の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-cleft-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) which')
})

it('誤文訂正〈151〉：国公立レベル 使役動詞 make／let／have と getの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-151')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('clean')
})

it('正誤問題〈158〉：東大レベル 英作文の原級比較と倍数表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-asas-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) than')
})

it('誤文訂正〈152〉：京大レベル 分詞構文の完了形・否定・受け身の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-152')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Not knowing')
})

it('正誤問題〈159〉：国公立レベル It takes・It costs の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-ittakes-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) finishing')
})

it('誤文訂正〈153〉：東大レベル つなぎ語 however・therefore・moreover の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-153')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('however, the game was')
})

it('正誤問題〈160〉：京大レベル 関係副詞と前置詞＋which の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-relwhere-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) which')
})

it('誤文訂正〈154〉：国公立レベル 使役動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-154')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('clean')
})

it('正誤問題〈161〉：東大レベル 時制の一致と話法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-reported-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) next week')
})

it('誤文訂正〈155〉：京大レベル 仮定法 I wish・If only・as if の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-155')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('were')
})

it('正誤問題〈162〉：国公立レベル 不定詞の意味上の主語の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-forof-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) for you')
})

it('誤文訂正〈156〉：東大レベル 無生物主語の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-156')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('takes us to')
})

it('正誤問題〈163〉：京大レベル 強調構文と形式主語の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-emphasis-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) which')
})

it('誤文訂正〈157〉：国公立レベル 分詞形容詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-157')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('interesting')
})

it('正誤問題〈164〉：東大レベル 数えられない名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-uncountable-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) advices')
})

it('誤文訂正〈158〉：京大レベル 否定語による倒置の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-158')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('have I seen')
})

it('正誤問題〈165〉：国公立レベル 所有格の関係代名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-whose-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) who')
})

it('誤文訂正〈159〉：東大レベル 動名詞と不定詞をとる動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-159')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('playing')
})

it('正誤問題〈166〉：京大レベル 懸垂分詞と独立分詞構文の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-dangling-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) a strange noise')
})

it('誤文訂正〈160〉：国公立レベル the＋比較級, the＋比較級 の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-160')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('the better you become')
})

it('正誤問題〈167〉：東大レベル 冠詞の使い分けの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-articles-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) the tennis')
})

it('誤文訂正〈161〉：京大レベル 関係代名詞 what と which・that の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-161')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('what')
})

it('正誤問題〈168〉：国公立レベル lie・lay／rise・raise の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-lielay-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) laid')
})

it('誤文訂正〈162〉：東大レベル 時と場所の前置詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-162')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('in')
})

it('正誤問題〈169〉：京大レベル 仮定法過去完了と混合仮定法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-mixedif-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) would pass')
})

it('誤文訂正〈163〉：国公立レベル 受動態で by 以外を使う表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-163')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('in')
})

it('正誤問題〈170〉：東大レベル 代名詞 one・it・that の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-pronoun-one-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) it')
})

it('誤文訂正〈164〉：京大レベル 相関接続詞の動詞の一致の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-164')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('was')
})

it('正誤問題〈171〉：国公立レベル 接続詞 unless・once・as long as・in case の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-conj-unless-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) do not hurry,')
})

it('誤文訂正〈165〉：東大レベル few・a few・little・a little の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-165')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('little')
})

it('正誤問題〈172〉：京大レベル 同格の that と関係代名詞の that の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-doukaku-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) which')
})

it('誤文訂正〈166〉：国公立レベル 付加疑問文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-166')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('aren’t you')
})

it('正誤問題〈173〉：東大レベル 比較の対象をそろえる単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-compare-obj-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) Japan')
})

it('誤文訂正〈167〉：京大レベル 前置詞＋関係代名詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-167')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('in which')
})

it('正誤問題〈174〉：国公立レベル 使役・知覚動詞の受け身の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-passive-make-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) wash')
})

it('誤文訂正〈168〉：東大レベル 再帰代名詞と each other の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-168')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('himself')
})

it('正誤問題〈175〉：京大レベル 慣用的な分詞構文と独立分詞構文の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-idiomatic-participle-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Frankly speak,')
})

it('誤文訂正〈169〉：国公立レベル 比較の as ～ as と倍数表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-169')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('as heavy as')
})

it('正誤問題〈176〉：東大レベル 仮定法 I wish・as if の時制の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-wish-asif-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) can speak')
})

it('誤文訂正〈170〉：京大レベル 関係副詞と関係代名詞の使い分けの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-170')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('which')
})

it('正誤問題〈177〉：京大レベル 助動詞の慣用表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-modal-idioms-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) to be')
})

it('誤文訂正〈171〉：東大レベル 名詞＋前置詞の結びつきの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-171')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('on')
})

it('正誤問題〈178〉：国公立レベル 形容詞＋前置詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-adj-prep-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) by')
})

it('誤文訂正〈172〉：京大レベル 不定詞の形容詞的用法と前置詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-172')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('to live in')
})

it('正誤問題〈179〉：東大レベル 数量表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-quantity-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) was absent')
})

it('誤文訂正〈173〉：国公立レベル 部分否定の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-173')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Not all students')
})

it('正誤問題〈180〉：京大レベル 複合関係詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-whatever-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) careful')
})

it('誤文訂正〈174〉：東大レベル 分数と割合の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-174')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Two thirds')
})

it('正誤問題〈181〉：国公立レベル 関係代名詞の非制限用法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-nonrestrictive-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) that lives')
})

it('誤文訂正〈175〉：京大レベル 比較の慣用の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-175')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('no more than')
})

it('正誤問題〈182〉：東大レベル It is said that と be said to の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-said-to-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) being')
})

it('誤文訂正〈176〉：国公立レベル too ～ to と enough to の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-176')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('old enough')
})

it('正誤問題〈183〉：京大レベル seem to と完了不定詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-seem-to-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) being')
})

it('誤文訂正〈177〉：東大レベル 目的表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-177')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('so that she could catch')
})

it('正誤問題〈184〉：国公立レベル 間接疑問の語順の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-indirect-q-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) does he')
})

it('誤文訂正〈178〉：京大レベル 副詞の位置の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-178')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Even a child')
})

it('正誤問題〈185〉：東大レベル if と whether の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-if-whether-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) If')
})

it('誤文訂正〈179〉：京大レベル 二重目的語の書きかえの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-179')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('explain the rules to me')
})

it('正誤問題〈186〉：国公立レベル There is 構文の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-there-is-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) is many')
})

it('誤文訂正〈180〉：東大レベル 感嘆文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-180')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('What a beautiful day')
})

it('正誤問題〈187〉：国公立レベル either・neither と動詞の一致の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-either-neither-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) are')
})

it('誤文訂正〈181〉：京大レベル 形容詞の順序の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-181')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('a beautiful old wooden')
})

it('正誤問題〈188〉：東大レベル 代名詞の格の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-pronoun-case-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) me')
})

it('誤文訂正〈182〉：国公立レベル ago・before・since の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-182')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('met')
})

it('正誤問題〈189〉：京大レベル keep・leave・find＋O＋C の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-svoc-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) closing')
})

it('誤文訂正〈183〉：東大レベル many・much・a few・a little の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-183')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('many')
})

it('正誤問題〈190〉：京大レベル 条件の接続詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-conditional-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) you will return')
})

it('誤文訂正〈184〉：国公立レベル 命令文＋and／or の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-184')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('or')
})

it('正誤問題〈191〉：東大レベル 未来完了の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-future-perfect-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) ate')
})

it('誤文訂正〈185〉：京大レベル 分詞構文 Having done の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-185')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Having finished')
})

it('正誤問題〈192〉：国公立レベル the 比較級, the 比較級の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-the-more-kokkou')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) the best')
})

it('誤文訂正〈186〉：東大レベル so that・in order to の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-186')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('in order to catch')
})

it('正誤問題〈193〉：京大レベル what と which の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-what-which-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) what')
})

it('誤文訂正〈187〉：国公立レベル 使役動詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-187')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('clean')
})

it('正誤問題〈194〉：東大レベル no sooner／hardly の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-no-sooner-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) when')
})

it('誤文訂正〈188〉：京大レベル It is ～ that 強調構文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-188')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('that')
})

it('正誤問題〈195〉：国公立レベル lie・lay・rise・raise の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-lie-lay-kokkou')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) lie')
})

it('誤文訂正〈189〉：東大レベル what を使った名詞節の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-189')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('What')
})

it('正誤問題〈196〉：京大レベル 独立分詞構文と with の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-absolute-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) permitted,')
})

it('誤文訂正〈190〉：国公立レベル to のあとの ing の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-190')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('seeing')
})

it('正誤問題〈197〉：東大レベル I wish・as if の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-wish-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) can speak')
})

it('誤文訂正〈191〉：京大レベル 部分否定の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-191')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Not all rich people are')
})

it('正誤問題〈198〉：国公立レベル 数えられない名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-uncountable-kokkou')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) advices')
})

it('誤文訂正〈192〉：東大レベル so ～ that・such ～ that の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-192')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('such')
})

it('正誤問題〈199〉：京大レベル 関係副詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-rel-adverb-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) which')
})

it('誤文訂正〈193〉：国公立レベル hard・hardly・late・lately の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-193')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('hard')
})

it('正誤問題〈200〉：東大レベル It takes・It costs の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-it-takes-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) walking to the station')
})

it('誤文訂正〈194〉：京大レベル 付加疑問と否定疑問の答えの単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-194')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('don’t')
})

it('正誤問題〈201〉：国公立レベル 時・条件の副詞節の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-time-clause-kokkou')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) will arrive')
})

it('誤文訂正〈195〉：東大レベル the reason why・the way の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-195')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('the reason why')
})

it('正誤問題〈202〉：京大レベル 前置詞＋関係代名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-prep-relative-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) in that')
})

it('誤文訂正〈196〉：国公立レベル 感嘆文の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-196')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('What')
})

it('正誤問題〈203〉：東大レベル of・with ＋抽象名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-abstract-noun-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) great important')
})

it('誤文訂正〈197〉：京大レベル 無生物主語の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-197')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('prevented us from going')
})

it('正誤問題〈204〉：国公立レベル 再帰代名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-reflexive-kokkou')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) her')
})

it('誤文訂正〈198〉：東大レベル 倍数表現の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-198')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('twice as large')
})

it('正誤問題〈205〉：京大レベル no more than・no less than の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-no-more-than-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) no less than')
})

it('誤文訂正〈199〉：国公立レベル make と do の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-199')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('made a mistake')
})

it('正誤問題〈206〉：東大レベル It is said that・be said to の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-said-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) to be')
})

it('誤文訂正〈200〉：東大レベル every time・whenever の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-200')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Every time')
})

it('正誤問題〈207〉：京大レベル 部分否定の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-partial-negation-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) so money is everything')
})

it('誤文訂正〈201〉：国公立レベル remember・forget・stop の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-201')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('meeting')
})

it('正誤問題〈208〉：東大レベル 数えられない名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-uncountable-todai2')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) useful advices')
})

it('誤文訂正〈202〉：京大レベル 否定語の倒置の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-202')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('did he notice')
})

it('正誤問題〈209〉：国公立レベル 分詞形容詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-participle-adj-kokkou')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) excited')
})

it('誤文訂正〈203〉：国公立レベル used to・be used to の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-203')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('am used to getting')
})

it('正誤問題〈210〉：東大レベル would rather・had better の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-rather-better-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) to leave')
})

it('誤文訂正〈204〉：京大レベル because of・due to の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-204')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('because of')
})

it('正誤問題〈211〉：京大レベル the same ～ as・such ～ as の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-same-such-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) than')
})

it('誤文訂正〈205〉：東大レベル during・while・for の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-205')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('during')
})

it('正誤問題〈212〉：国公立レベル look・sound・feel ＋形容詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-linking-verbs-kokkou')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) happily')
})

it('誤文訂正〈206〉：国公立レベル worth ～ing の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-206')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('reading')
})

it('正誤問題〈213〉：京大レベル 名詞と前置詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-noun-prep-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) for')
})

it('誤文訂正〈207〉：東大レベル so・such・too・enough の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-207')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('such a hot day')
})

it('正誤問題〈214〉：東大レベル 形式目的語の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-formal-object-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) difficult')
})

it('誤文訂正〈208〉：国公立レベル 他動詞と前置詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-208')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('reached')
})

it('正誤問題〈215〉：京大レベル 分詞の後置修飾の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-participle-postmod-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) stood')
})

it('誤文訂正〈209〉：京大レベル It is not until ～ that の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-209')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('that he noticed')
})

it('正誤問題〈216〉：国公立レベル 前置詞＋動名詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-prep-gerund-kokkou')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) say')
})

it('誤文訂正〈210〉：東大レベル 比較の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-210')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('in')
})

it('正誤問題〈217〉：京大レベル 分詞構文の否定の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-negative-participle-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Knowing not')
})

it('誤文訂正〈211〉：国公立レベル come・go・bring・take の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-211')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('coming')
})

it('正誤問題〈218〉：東大レベル the ＋形容詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-the-adjective-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) is not')
})

it('誤文訂正〈212〉：京大レベル 数字＋名詞の形容詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-212')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('ten-year-old')
})

it('正誤問題〈219〉：国公立レベル 副詞節の時制の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-adverb-clause-tense-kokkou')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) I will arrive')
})

it('誤文訂正〈213〉：東大レベル one of・each・every の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-213')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('lives')
})

it('正誤問題〈220〉：京大レベル that・those の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-that-those-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) Osaka')
})

it('誤文訂正〈214〉：国公立レベル まぎらわしい形容詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-214')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('sensible')
})

it('正誤問題〈221〉：東大レベル 名詞＋ to 不定詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-noun-to-infinitive-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) climbing')
})

it('誤文訂正〈215〉：京大レベル despite・in spite of・although の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-215')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Despite')
})

it('正誤問題〈222〉：国公立レベル almost・most・most of の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-almost-most-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(A) Almost')
})

it('誤文訂正〈216〉：東大レベル regret・stop・try の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-216')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('telling')
})

it('正誤問題〈223〉：京大レベル by the time ～ と完了形の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-by-the-time-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) already started')
})

it('誤文訂正〈217〉：国公立レベル besides・except・between・among の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-217')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('Besides')
})

it('正誤問題〈224〉：東大レベル prefer・would rather の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-prefer-rather-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) than')
})

it('誤文訂正〈218〉：京大レベル It is no use ～ing の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-218')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('crying')
})

it('正誤問題〈225〉：国公立レベル have trouble ～ing・spend 時間 ～ing の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-trouble-spend-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) to find')
})

it('誤文訂正〈219〉：東大レベル provide A with B・rob A of B の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-219')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('with')
})

it('正誤問題〈226〉：京大レベル suggest・insist・demand that ＋原形の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-suggest-that-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) stops smoking')
})

it('誤文訂正〈220〉：国公立レベル as soon as・the moment の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-220')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('get')
})

it('正誤問題〈227〉：東大レベル recently・these days・nowadays の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-recently-nowadays-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) worked')
})

it('誤文訂正〈221〉：京大レベル anything but・nothing but・all but の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-221')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('anything but')
})

it('正誤問題〈228〉：国公立レベル used to と would の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-used-to-would-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) would be')
})

it('誤文訂正〈222〉：東大レベル 形容詞＋前置詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-222')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('to')
})

it('正誤問題〈229〉：京大レベル other・another・the other・the others の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-other-another-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) another is a teacher')
})

it('誤文訂正〈223〉：国公立レベル borrow・lend・rent の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-223')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('lend')
})

it('正誤問題〈230〉：東大レベル wear・put on・fit・suit の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-wear-fit-suit-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) is wearing')
})

it('誤文訂正〈224〉：京大レベル hope と wish の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-224')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('hope')
})

it('正誤問題〈231〉：国公立レベル see・look at・watch／hear・listen to の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-see-look-watch-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) look')
})

it('誤文訂正〈225〉：東大レベル affect と effect・expect と wait for の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-225')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('affect')
})

it('正誤問題〈232〉：京大レベル sometime・sometimes・some time と everyday・every day の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-sometime-everyday-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) everyday')
})

it('誤文訂正〈226〉：国公立レベル So do I・Neither do I の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-226')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('So do I')
})

it('正誤問題〈233〉：東大レベル explain・marry・resemble・enter の語法の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-explain-marry-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) me')
})

it('誤文訂正〈227〉：京大レベル be to 不定詞の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-227')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('visit')
})

it('正誤問題〈234〉：国公立レベル must not と don’t have to・need not の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-must-not-have-to-kokuritsu')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) must not')
})

it('誤文訂正〈228〉：東大レベル people・police・news などの単数・複数の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-228')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('are')
})

it('正誤問題〈235〉：京大レベル be made of・from・into の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-made-of-from-kyodai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) from')
})

it('誤文訂正〈229〉：国公立レベル I don’t think と I hope not の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-229')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('don’t think it will')
})

it('正誤問題〈236〉：東大レベル fewer と less・as many と as much の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-fewer-less-todai')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) less')
})

it('誤文訂正〈230〉：京大レベル 接続詞の重ね使いをさける単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-230')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('we went')
})

it('正誤問題〈237〉：国公立レベル will と be going to の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-will-going-to')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) visiting my grandmother')
})

it('誤文訂正〈231〉：東大レベル 数の言い方 hundreds of・two hundred の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-231')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('three hundred')
})

it('正誤問題〈238〉：京大レベル want・ask・tell 人 to do の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-want-ask-tell')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) want that I')
})

it('誤文訂正〈232〉：国公立レベル 形容詞をならべる順番の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-232')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('a big red')
})

it('正誤問題〈239〉：東大レベル 前置詞で終わる不定詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-infinitive-preposition')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) to talk')
})

it('誤文訂正〈233〉：国公立レベル 交通手段の by car・on foot の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-233')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('by bus')
})

it('正誤問題〈240〉：京大レベル win と beat・lose と miss の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-win-beat')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) won')
})

it('誤文訂正〈234〉：東大レベル can と be able to の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-234')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('could')
})

it('正誤問題〈241〉：国公立レベル 頻度の副詞の位置の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-frequency-adverbs')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) goes always')
})

it('誤文訂正〈235〉：京大レベル say・tell・speak・talk の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-235')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('told me')
})

it('正誤問題〈242〉：東大レベル come to do・learn to do の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-come-to-do')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) liking')
})

it('誤文訂正〈236〉：国公立レベル in time と on time の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-236')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('on time')
})

it('正誤問題〈243〉：京大レベル happen・take place・occur の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-happen-occur')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) was happened')
})

it('誤文訂正〈237〉：東大レベル alone と lonely・alive と living の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-237')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('a living fish')
})

it('正誤問題〈244〉：国公立レベル 動名詞の慣用表現の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-gerund-idioms')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) to cook')
})

it('誤文訂正〈238〉：京大レベル so far・until now と現在完了の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-238')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('have visited')
})

it('正誤問題〈245〉：東大レベル 二重所有格の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-double-possessive')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) a my friend')
})

it('誤文訂正〈239〉：国公立レベル no longer・still と yet の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-239')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('no longer lives')
})

it('正誤問題〈246〉：京大レベル make・do・take の決まった組み合わせの単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-make-do-take')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) must do')
})

it('誤文訂正〈240〉：東大レベル as ～ as possible・as ～ as one can の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-240')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('as soon as possible')
})

it('正誤問題〈247〉：国公立レベル 句動詞の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-phrasal-verbs')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) my keys')
})

it('誤文訂正〈241〉：京大レベル 手段・道具の by と with の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-241')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('with scissors')
})

it('正誤問題〈248〉：東大レベル such as・like・for example の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-such-as')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(D) apple and orange')
})

it('誤文訂正〈242〉：国公立レベル too と either・also の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-242')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('either')
})

it('正誤問題〈249〉：京大レベル when と if の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-when-if')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(B) it will rain')
})

it('誤文訂正〈243〉：東大レベル some と any の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-243')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('any')
})

it('正誤問題〈250〉：国公立レベル help 人 (to) do の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-help-do')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) doing')
})

it('誤文訂正〈244〉：京大レベル mind ～ing・Would you mind if の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-244')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('opening')
})

it('正誤問題〈251〉：東大レベル hear from・hear of・hear about の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-hear-from-of')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) of him')
})

it('誤文訂正〈245〉：国公立レベル agree with・agree to・agree on の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-245')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('agree with you')
})

it('正誤問題〈252〉：京大レベル think of・think about・think that の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-think-of-about')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) for my grandfather,')
})

it('誤文訂正〈246〉：東大レベル apologize to・complain to の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-246')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('apologized to her')
})

it('正誤問題〈253〉：国公立レベル be good at・be fond of・be afraid of の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-adj-prep')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) in')
})

it('誤文訂正〈247〉：京大レベル deal with・cope with・put up with の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-247')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('deal with the problem')
})

it('正誤問題〈254〉：東大レベル depend on・rely on・count on の単元が10問ある', async () => {
  const { EXAM_ERROR } = await import('./examerror')
  const u = EXAM_ERROR.find((x) => x.id === 'exam-error-depend-rely')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('(C) depend in')
})

it('誤文訂正〈248〉：国公立レベル succeed in・manage to・fail to の単元が10問ある', async () => {
  const { EXAM_FIX } = await import('./examerror')
  const u = EXAM_FIX.find((x) => x.id === 'exam-fix-248')!
  expect(u.questions).toHaveLength(10)
  expect(u.questions[0].choices[u.questions[0].answer]).toBe('succeeded in passing')
})
