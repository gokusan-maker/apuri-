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
