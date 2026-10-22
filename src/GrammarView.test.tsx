import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GRAMMAR } from './grammar'
import { Grammar } from './GrammarView'

describe('文法ミニ解説', () => {
  it('解説を読んで3問に答え、全問正解で記録が残る', () => {
    localStorage.clear()
    const onAnswer = vi.fn()
    render(<Grammar onAnswer={onAnswer} />)
    expect(screen.getByText(`全問正解 0 / ${GRAMMAR.length} 単元`)).toBeInTheDocument()
    expect(screen.getByText('見習い')).toBeInTheDocument()
    const unit = GRAMMAR[0]
    fireEvent.click(screen.getByText(unit.title))
    expect(screen.getByText(unit.points[0])).toBeInTheDocument()
    fireEvent.click(screen.getByText('確認問題へ（3問）'))
    for (const q of unit.questions) {
      fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
      expect(screen.getByText(q.why)).toBeInTheDocument()
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('3 / 3 問正解')).toBeInTheDocument()
    expect(onAnswer).toHaveBeenCalledTimes(3)
    expect(JSON.parse(localStorage.getItem('eitan:grammar')!)).toEqual({ [unit.id]: 3 })
    fireEvent.click(screen.getByText('← 単元一覧'))
    expect(screen.getByText('3 / 3 👑')).toBeInTheDocument()
    expect(screen.getByText(`全問正解 1 / ${GRAMMAR.length} 単元`)).toBeInTheDocument()
  })
})

it('まとめテストは全単元からランダムに10問', () => {
  render(<Grammar />)
  fireEvent.click(screen.getByText('まとめテスト'))
  expect(document.querySelector('.grammar-progress')!.textContent).toBe('1 / 10 問目')
  expect(screen.getByRole('progressbar', { name: '確認問題の進み具合' })).toHaveAttribute('aria-valuemax', '10')
})

it('スタンプが10個になるとガチャチケットのお知らせが呼ばれる', () => {
  localStorage.clear()
  const nine = Object.fromEntries(GRAMMAR.slice(1, 10).map((u) => [u.id, u.questions.length]))
  localStorage.setItem('eitan:grammar', JSON.stringify(nine))
  const ticket = vi.fn()
  render(<Grammar onStampTicket={ticket} />)
  expect(screen.getByLabelText('文法スタンプ 9個')).toBeInTheDocument()
  const u = GRAMMAR[0]
  fireEvent.click(screen.getByText(u.title))
  fireEvent.click(screen.getByText(/問題にチャレンジ|確認問題へ|問題へ/))
  for (const q of u.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    const next = screen.queryByText('次へ') ?? screen.queryByText('結果を見る')
    if (next) fireEvent.click(next)
  }
  expect(ticket).toHaveBeenCalledTimes(1)
})

it('文法モンスターを全問正解でたおすとごほうび', () => {
  localStorage.clear()
  const win = vi.fn()
  render(<Grammar onMonsterWin={win} />)
  const u = GRAMMAR[0]
  fireEvent.click(screen.getByText(u.title))
  fireEvent.click(screen.getByText(/文法モンスター「be動詞モンスター」と戦う/))
  expect(screen.getByRole('progressbar', { name: '文法モンスターのHP' })).toHaveAttribute('aria-valuenow', '3')
  for (const q of u.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(win).toHaveBeenCalledTimes(1)
  expect(screen.getByText(/be動詞モンスターをたおした！/)).toBeInTheDocument()
})

it('まとめテストを全問正解するとSランクでベストが残る', () => {
  localStorage.clear()
  render(<Grammar />)
  fireEvent.click(screen.getByText('まとめテスト'))
  const all = GRAMMAR.flatMap((u) => u.questions)
  for (let i = 0; i < 10; i++) {
    const text = document.querySelector('.blank-sentence')!.textContent!
    const q = all.find((x) => x.sentence.replace('___', '　　　') === text)!
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByLabelText('ランク S')).toBeInTheDocument()
  fireEvent.click(screen.getByText('← 単元一覧'))
  expect(screen.getByText(/ベスト 10\/10・S/)).toBeInTheDocument()
})

it('苦手な文法の復習は、まちがえた単元の問題だけが出る', () => {
  localStorage.clear()
  const u = GRAMMAR[2]
  localStorage.setItem('eitan:grammar', JSON.stringify({ [u.id]: 1 }))
  render(<Grammar />)
  fireEvent.click(screen.getByText('🔁 苦手な文法の復習（1単元）'))
  const text = document.querySelector('.blank-sentence')!.textContent!
  expect(u.questions.some((q) => q.sentence.replace('___', '　　　') === text)).toBe(true)
})

it('今日の文法を全問正解すると1日1回ボーナス', async () => {
  localStorage.clear()
  const { dailyGrammar } = await import('./grammar')
  const { dayKey } = await import('./srs')
  const u = dailyGrammar(dayKey())
  const bonus = vi.fn()
  render(<Grammar onDailyBonus={bonus} />)
  fireEvent.change(screen.getByLabelText('単元をさがす'), { target: { value: u.title } })
  fireEvent.click(within(document.querySelector('.grammar-list') as HTMLElement).getByText(u.title, { exact: false }))
  fireEvent.click(screen.getByText(/確認問題へ/))
  for (const q of u.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(bonus).toHaveBeenCalledTimes(1)
})

it('学年のタブで単元をしぼりこめる', () => {
  localStorage.clear()
  render(<Grammar />)
  fireEvent.click(screen.getByRole('tab', { name: '高校' }))
  expect(screen.getAllByText(/過去完了/).length).toBeGreaterThan(0)
  expect(screen.queryByText('be動詞（am / is / are）')).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('tab', { name: 'すべて' }))
  expect(screen.getByText('be動詞（am / is / are）')).toBeInTheDocument()
})

it('文法モンスターラッシュを3連勝するとごほうび', () => {
  localStorage.clear()
  const rushWin = vi.fn()
  render(<Grammar onRushWin={rushWin} />)
  fireEvent.click(screen.getByText('モンスターラッシュ'))
  const all = GRAMMAR.flatMap((u) => u.questions)
  for (let round = 0; round < 3; round++) {
    for (let i = 0; i < 3; i++) {
      const text = document.querySelector('.blank-sentence')!.textContent!
      const q = all.find((x) => x.sentence.replace('___', '　　　') === text)!
      fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
      fireEvent.click(screen.getByText('次へ'))
    }
    if (round < 2) fireEvent.click(screen.getByText(/次の文法モンスターへ/))
  }
  expect(screen.getByText(/ラッシュ完全クリア！/)).toBeInTheDocument()
  expect(rushWin).toHaveBeenCalledTimes(1)
})

it('ヒントでまちがいの選択肢を1つ消せる', () => {
  localStorage.clear()
  const spend = vi.fn(() => true)
  render(<Grammar onSpend={spend} />)
  const u = GRAMMAR[0]
  fireEvent.click(screen.getByText(u.title))
  fireEvent.click(screen.getByText(/確認問題へ/))
  expect(document.querySelectorAll('.choices .choice')).toHaveLength(3)
  fireEvent.click(screen.getByText(/ヒント：1つ消す/))
  expect(spend).toHaveBeenCalledWith(5)
  expect(document.querySelectorAll('.choices .choice')).toHaveLength(2)
  expect(screen.getByRole('button', { name: u.questions[0].choices[u.questions[0].answer] })).toBeInTheDocument()
})

it('学年ごとの全問正解の進みぐあいがバーで出る', () => {
  localStorage.clear()
  const u = GRAMMAR.find((x) => x.id === 'be')!
  localStorage.setItem('eitan:grammar', JSON.stringify({ be: u.questions.length }))
  render(<Grammar />)
  expect(screen.getByRole('progressbar', { name: '中1の全問正解' })).toHaveAttribute('aria-valuenow', '1')
  expect(screen.getByRole('progressbar', { name: '高校の全問正解' })).toHaveAttribute('aria-valuenow', '0')
})

it('確認問題の連続正解を数え、ベストを記録する', () => {
  localStorage.clear()
  localStorage.setItem('eitan:grammar-streak', JSON.stringify({ now: 0, best: 5 }))
  render(<Grammar />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  unit.questions.forEach((q, i) => {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    if (i >= 1) expect(screen.getByText(`🔥 連続正解 ${i + 1}`, { exact: false })).toBeInTheDocument()
    fireEvent.click(screen.getByText('次へ'))
  })
  expect(JSON.parse(localStorage.getItem('eitan:grammar-streak')!)).toEqual({ now: 3, best: 5 })
  fireEvent.click(screen.getByText('← 単元一覧'))
  expect(screen.getByText('🔥 確認問題の連続正解ベスト 5問')).toBeInTheDocument()
})

it('結果画面でシェア用の文をコピーできる', async () => {
  localStorage.clear()
  const writeText = vi.fn(() => Promise.resolve())
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
  render(<Grammar />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  fireEvent.click(screen.getByText('📋 結果をコピー（シェア用）'))
  expect(writeText).toHaveBeenCalledWith(expect.stringContaining(`「${unit.title}」に挑戦！ 3 / 3 問正解`))
  expect(await screen.findByText('✅ コピーしました')).toBeInTheDocument()
})

it('単元に★をつけると一覧の上に来る', () => {
  localStorage.clear()
  render(<Grammar />)
  const last = GRAMMAR[GRAMMAR.length - 1]
  fireEvent.click(screen.getByRole('button', { name: `${last.title}をお気に入りにする` }))
  const items = [...document.querySelectorAll('.grammar-list li')]
  expect(items[0].textContent).toContain(last.title)
  expect(JSON.parse(localStorage.getItem('eitan:grammar-fav')!)).toEqual([last.id])
  fireEvent.click(screen.getAllByRole('button', { name: `${last.title}をお気に入りからはずす` })[0])
  expect(document.querySelectorAll('.grammar-list li')[0].textContent).toContain(GRAMMAR[0].title)
})

it('単元をはじめて全問正解するとXPボーナス（2回目はなし）', () => {
  localStorage.clear()
  const onFirstClear = vi.fn()
  render(<Grammar onFirstClear={onFirstClear} />)
  const unit = GRAMMAR[0]
  const solve = () => {
    fireEvent.click(screen.getByText(unit.title))
    fireEvent.click(screen.getByText('確認問題へ（3問）'))
    for (const q of unit.questions) {
      fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
      fireEvent.click(screen.getByText('次へ'))
    }
  }
  solve()
  expect(onFirstClear).toHaveBeenCalledTimes(1)
  expect(screen.getByText('🌟 はじめての全問正解！ モンスターに XP+30')).toBeInTheDocument()
  fireEvent.click(screen.getByText('もう一度'))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(onFirstClear).toHaveBeenCalledTimes(1)
  expect(screen.queryByText(/はじめての全問正解/)).toBeNull()
})

it('今週の目標を決めて、達成するとチケットのお知らせ', () => {
  localStorage.clear()
  const onWeeklyGoal = vi.fn()
  render(<Grammar onWeeklyGoal={onWeeklyGoal} />)
  fireEvent.click(screen.getByRole('button', { name: '3単元' }))
  for (const unit of GRAMMAR.slice(0, 3)) {
    fireEvent.click(screen.getByText(unit.title))
    fireEvent.click(screen.getByText('確認問題へ（3問）'))
    for (const q of unit.questions) {
      fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
      fireEvent.click(screen.getByText('次へ'))
    }
    if (unit !== GRAMMAR[2]) fireEvent.click(screen.getByText('← 単元一覧'))
  }
  expect(onWeeklyGoal).toHaveBeenCalledTimes(1)
  expect(screen.getByText(/今週の目標たっせい/)).toBeInTheDocument()
  fireEvent.click(screen.getByText('← 単元一覧'))
  expect(screen.getByText(/全問正解 3 \/ 3 単元 ✅ たっせい/)).toBeInTheDocument()
})

it('解説の下によくあるまちがいが出る', () => {
  localStorage.clear()
  render(<Grammar />)
  const unit = GRAMMAR.find((u) => u.id === 'third')!
  fireEvent.click(screen.getByText(unit.title))
  expect(screen.getByText('⚠ よくあるまちがい')).toBeInTheDocument()
  expect(screen.getByText('✕ He play soccer every day.')).toBeInTheDocument()
  expect(screen.getByText('○ He plays soccer every day.')).toBeInTheDocument()
})

it('まちがえた問題はまちがいノートに入り、正解すると消える', () => {
  localStorage.clear()
  render(<Grammar />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  unit.questions.forEach((q, i) => {
    fireEvent.click(screen.getByRole('button', { name: q.choices[i === 0 ? (q.answer + 1) % q.choices.length : q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  })
  fireEvent.click(screen.getByText('← 単元一覧'))
  fireEvent.click(screen.getByText('📓 まちがいノート（1問）'))
  const q = unit.questions[0]
  fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
  expect(JSON.parse(localStorage.getItem('eitan:grammar-notebook')!)).toEqual([])
})

it('学年まとめテストはその学年の問題だけで、ベストが残る', async () => {
  const { gradeOf } = await import('./grammar')
  localStorage.clear()
  render(<Grammar />)
  fireEvent.click(screen.getByRole('button', { name: /📝 中1まとめ/ }))
  const pool = GRAMMAR.filter((u) => gradeOf(u.id) === '中1').flatMap((u) => u.questions)
  for (let i = 0; i < 10; i++) {
    const text = document.querySelector('.blank-sentence')!.textContent!
    const shown = [...document.querySelectorAll('.choice')].map((b) => b.textContent)
    const q = pool.find((x) => text.startsWith(x.sentence.split('___')[0]) && text.endsWith(x.sentence.split('___')[1]) && x.choices.every((c) => shown.includes(c)))!
    expect(q).toBeDefined()
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(JSON.parse(localStorage.getItem('eitan:grammar-mix-best') ?? '{}')['grade:中1']).toBe(10)
})

it('全問正解すると単元に★がつく', () => {
  localStorage.clear()
  localStorage.setItem('eitan:grammar-clears', JSON.stringify({ [GRAMMAR[0].id]: 2 }))
  render(<Grammar />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  fireEvent.click(screen.getByText('← 単元一覧'))
  expect(screen.getByLabelText('レベル ★2')).toBeInTheDocument()
})

it('単元さがしでしぼりこめる', () => {
  localStorage.clear()
  render(<Grammar />)
  fireEvent.change(screen.getByLabelText('単元をさがす'), { target: { value: 'whose' } })
  const items = [...document.querySelectorAll('.grammar-list li')]
  expect(items.length).toBeGreaterThan(0)
  expect(items.length).toBeLessThan(GRAMMAR.length)
  fireEvent.change(screen.getByLabelText('単元をさがす'), { target: { value: 'zzzz' } })
  expect(screen.getByText('見つかりませんでした')).toBeInTheDocument()
})

it('おすすめ単元から単元を開ける', () => {
  localStorage.clear()
  render(<Grammar />)
  expect(screen.getByText('🌟 おすすめ単元')).toBeInTheDocument()
  fireEvent.click(screen.getByText(`👉 ${GRAMMAR[0].title}`))
  expect(screen.getByText(GRAMMAR[0].points[0])).toBeInTheDocument()
})

it('全問正解すると相棒がほめてくれる', async () => {
  const { praiseOf, praiseEnOf } = await import('./grammar')
  localStorage.clear()
  render(<Grammar partnerName="モチ" />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText(new RegExp(`🐣 モチ「${praiseEnOf(unit.id).replace(/[!?.]/g, '.')}」`))).toBeInTheDocument()
  expect(screen.getByText(`（${praiseOf(unit.id)}）`)).toBeInTheDocument()
})

it('文法を3日続けた日にボーナス', () => {
  localStorage.clear()
  localStorage.setItem('eitan:grammar-days', JSON.stringify({ last: '2026-10-19', streak: 2 }))
  const onStreakBonus = vi.fn()
  render(<Grammar onStreakBonus={onStreakBonus} />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  fireEvent.click(screen.getByRole('button', { name: unit.questions[0].choices[0] }))
  expect(onStreakBonus).toHaveBeenCalledTimes(1)
})

it('まとめテストでは「もっとくわしく」でその問題の単元へ行ける', async () => {
  const { unitOfQuestion } = await import('./grammar')
  localStorage.clear()
  render(<Grammar />)
  fireEvent.click(screen.getByText('まとめテスト'))
  const all = GRAMMAR.flatMap((u) => u.questions)
  const text = document.querySelector('.blank-sentence')!.textContent!
  const shown = [...document.querySelectorAll('.choice')].map((b) => b.textContent)
  // 同じ形の問題が複数の単元にあることもあるので、当てはまる問題を全部候補にする
  const cands = all.filter((x) => text.startsWith(x.sentence.split('___')[0]) && text.endsWith(x.sentence.split('___')[1]) && x.choices.every((c) => shown.includes(c)))
  const q = cands[0]
  fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
  fireEvent.click(screen.getByText(/もっとくわしく/))
  expect(cands.some((c) => screen.queryByText(unitOfQuestion(c)!.points[0]) !== null)).toBe(true)
})

it('学年をえらぶとタイムアタックもその学年の問題になる', async () => {
  const { gradeOf } = await import('./grammar')
  localStorage.clear()
  render(<Grammar />)
  fireEvent.click(screen.getByRole('tab', { name: '中1' }))
  expect(screen.getByText('60秒・中1')).toBeInTheDocument()
  fireEvent.click(screen.getByText('タイムアタック'))
  const pool = GRAMMAR.filter((u) => gradeOf(u.id) === '中1').flatMap((u) => u.questions)
  const text = document.querySelector('.blank-sentence')!.textContent!
  expect(pool.some((x) => text.startsWith(x.sentence.split('___')[0]) && text.endsWith(x.sentence.split('___')[1]))).toBe(true)
})

it('最後の単元を全問正解すると文法マスター', () => {
  localStorage.clear()
  const rec = Object.fromEntries(GRAMMAR.slice(1).map((u) => [u.id, u.questions.length]))
  localStorage.setItem('eitan:grammar', JSON.stringify(rec))
  const onMaster = vi.fn()
  render(<Grammar onMaster={onMaster} />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(onMaster).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByText('← 単元一覧'))
  expect(screen.getByText('🏅 称号「文法マスター」')).toBeInTheDocument()
})

it('学年をえらぶと要点カードもその学年の単元だけになる', async () => {
  const { gradeOf } = await import('./grammar')
  localStorage.clear()
  render(<Grammar />)
  fireEvent.click(screen.getByRole('tab', { name: '中2' }))
  expect(screen.getByText('中2の単元だけ')).toBeInTheDocument()
  fireEvent.click(screen.getByText('要点カード'))
  const n = GRAMMAR.filter((u) => gradeOf(u.id) === '中2').length
  expect(screen.getByText(new RegExp(`要点カード 1 / ${n}`))).toBeInTheDocument()
})

it('きのうまちがえた問題があると「きのうの復習」が出る', () => {
  localStorage.clear()
  const q = GRAMMAR[0].questions[0]
  localStorage.setItem('eitan:grammar-wrong-days', JSON.stringify({ [q.sentence]: '2026-10-19' }))
  render(<Grammar />)
  fireEvent.click(screen.getByText(/きのうの復習（きのうまちがえた問題 1問）/))
  expect(screen.getByRole('button', { name: q.choices[q.answer] })).toBeInTheDocument()
})

it('100単元を全問正解すると記念メダル', () => {
  localStorage.clear()
  localStorage.setItem('eitan:grammar', JSON.stringify(Object.fromEntries(GRAMMAR.slice(0, 100).map((u) => [u.id, u.questions.length]))))
  render(<Grammar />)
  expect(screen.getByText(/💯 100単元クリア記念メダル/)).toBeInTheDocument()
})

it('3問連続正解すると相棒がひとことほめる', () => {
  localStorage.clear()
  render(<Grammar partnerName="モチ" />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  unit.questions.forEach((q, i) => {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    if (i === 2) expect(screen.getByText('🐣 モチ「3問連続正解！ その調子！」')).toBeInTheDocument()
    fireEvent.click(screen.getByText('次へ'))
  })
})

it('正解した単元が「今月のチャンピオン単元」に出る', () => {
  localStorage.clear()
  render(<Grammar />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  fireEvent.click(screen.getByText('← 単元一覧'))
  expect(screen.getByText(`🏆 今月のチャンピオン単元：${unit.title}（3問正解）`)).toBeInTheDocument()
})

it('確認問題のあとに「もう1問」（正しい文はどれ？）がとける', async () => {
  localStorage.clear()
  const { MISTAKES } = await import('./grammarmistake')
  const onAnswer = vi.fn()
  render(<Grammar onAnswer={onAnswer} />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  fireEvent.click(screen.getByText('➕ もう1問（正しい文はどれ？）'))
  fireEvent.click(screen.getByRole('button', { name: MISTAKES[unit.id].right }))
  expect(screen.getByText(/⭕ 正解！/)).toBeInTheDocument()
  expect(onAnswer).toHaveBeenCalledTimes(4)
})

it('文法の一覧に学年別クリア率が出る', () => {
  localStorage.clear()
  render(<Grammar />)
  const list = screen.getByRole('list', { name: '学年別クリア率' })
  expect(list.querySelectorAll('li')).toHaveLength(4)
  expect(list.textContent).toMatch(/中1.*0\/\d+/)
})

it('文法の一覧は「すぐ練習」と文法ゲームのタイルが上、記録はいちばん下', () => {
  localStorage.clear()
  render(<Grammar />)
  expect(screen.queryByText('💬 今日のひとこと例文')).toBeNull()
  expect(screen.queryByText(/📅 今日の文法/)).toBeNull()
  const grid = screen.getByLabelText('文法ゲーム')
  expect(grid.querySelectorAll('.game-tile')).toHaveLength(12)
  const sec = document.querySelector('section.grammar')!
  const kids = [...sec.children]
  expect(kids.indexOf(grid)).toBeLessThan(kids.indexOf(sec.querySelector('.grammar-records')!))
  expect(sec.lastElementChild!.className).toBe('grammar-records')
  fireEvent.click(screen.getByText('✏️ すぐ練習（5問）'))
  expect(screen.getByText(/ 5 問目/)).toBeInTheDocument()
})

it('文法の単元一覧は学年ごとに折りたたまれている', () => {
  localStorage.clear()
  render(<Grammar />)
  const folds = [...document.querySelectorAll<HTMLDetailsElement>('details.grammar-grade-fold')]
  expect(folds.map((d) => d.querySelector('summary')!.textContent!.slice(0, 2))).toEqual(['中1', '中2', '中3', '高校'])
  expect(folds.every((d) => !d.open)).toBe(true)
  expect(folds.reduce((a, d) => a + d.querySelectorAll('li').length, 0)).toBe(GRAMMAR.length)
})

it('「ランダム1問」で全単元から1問だけとける', () => {
  localStorage.clear()
  const rnd = vi.spyOn(Math, 'random').mockReturnValue(0)
  render(<Grammar />)
  fireEvent.click(screen.getByText('ランダム1問'))
  rnd.mockRestore()
  const q = GRAMMAR[0].questions[0]
  fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
  fireEvent.click(screen.getByText('次へ'))
  expect(screen.getByText('1 / 1 問正解')).toBeInTheDocument()
})

it('確認問題のあとに「次の単元へ ▶」で次の単元を開ける', async () => {
  localStorage.clear()
  const { nextUnit } = await import('./grammar')
  render(<Grammar />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  const nx = nextUnit(unit.id)!
  fireEvent.click(screen.getByText(`次の単元へ ▶ ${nx.title}`))
  expect(screen.getByText(nx.points[0])).toBeInTheDocument()
})

it('文法の一覧に「時制まとめ表」がある', async () => {
  localStorage.clear()
  const { TENSE_TABLE } = await import('./grammar')
  render(<Grammar />)
  expect(screen.getByText(/🕰 時制まとめ表/)).toBeInTheDocument()
  expect(document.querySelectorAll('.tense-table tr')).toHaveLength(TENSE_TABLE.length)
  expect(screen.getByText('I have played tennis for three years.')).toBeInTheDocument()
})

it('確認問題でまちがえると「要点を見る」でその場で要点が出る（次の問題では閉じる）', () => {
  localStorage.clear()
  render(<Grammar />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  const q = unit.questions[0]
  fireEvent.click(screen.getByRole('button', { name: q.choices[(q.answer + 1) % q.choices.length] }))
  fireEvent.click(screen.getByText(`📌 要点を見る（${unit.title}）`))
  expect(screen.getByRole('list', { name: '単元の要点' }).textContent).toContain(unit.points[0])
  fireEvent.click(screen.getByText('次へ'))
  expect(screen.queryByRole('list', { name: '単元の要点' })).toBeNull()
})

it('学年の単元をすべて全問正解すると、その学年の賞状が出る', async () => {
  localStorage.clear()
  const { gradeOf } = await import('./grammar')
  const rec = Object.fromEntries(GRAMMAR.filter((u) => gradeOf(u.id) === '中1').map((u) => [u.id, u.questions.length]))
  localStorage.setItem('eitan:grammar', JSON.stringify(rec))
  render(<Grammar />)
  expect(screen.getByLabelText('中1の賞状')).toBeInTheDocument()
  expect(screen.queryByLabelText('中2の賞状')).toBeNull()
})

it('まちがえたことがある単元には一覧と要点カードで⚠印がつく', () => {
  localStorage.clear()
  const unit = GRAMMAR[0]
  localStorage.setItem('eitan:grammar-notebook', JSON.stringify([unit.questions[0].sentence]))
  render(<Grammar />)
  expect(screen.getAllByLabelText('まちがえたことがある単元').length).toBeGreaterThan(0)
})

it('答えあわせで「🔊 正しい英文を聞く」が出る', async () => {
  localStorage.clear()
  const { correctSentence } = await import('./grammar')
  render(<Grammar />)
  const unit = GRAMMAR.find((u) => correctSentence(u.questions[0]))!
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  const q = unit.questions[0]
  fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
  expect(screen.getByText(`🔊 正しい英文を聞く：${correctSentence(q)}`)).toBeInTheDocument()
})

it('文法の一覧に「今週の成績」が出て、正解すると今日の数がふえる', () => {
  localStorage.clear()
  render(<Grammar />)
  expect(screen.getByRole('img', { name: '今週の文法の正解数 0問' })).toBeInTheDocument()
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  fireEvent.click(screen.getByText('← 単元一覧'))
  expect(screen.getByRole('img', { name: '今週の文法の正解数 3問' })).toBeInTheDocument()
})

it('確認問題を全問正解すると紙ふぶきが出る（まちがえたら出ない）', () => {
  localStorage.clear()
  const { unmount } = render(<Grammar />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(document.querySelectorAll('.grammar-confetti i')).toHaveLength(14)
  unmount()
  localStorage.clear()
  render(<Grammar />)
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  unit.questions.forEach((q, i) => {
    fireEvent.click(screen.getByRole('button', { name: q.choices[i === 0 ? (q.answer + 1) % q.choices.length : q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  })
  expect(document.querySelector('.grammar-confetti')).toBeNull()
})

it('「あと1問で全問正解」の単元が一覧の上に出て、開ける', () => {
  localStorage.clear()
  const u = GRAMMAR[1]
  localStorage.setItem('eitan:grammar', JSON.stringify({ [u.id]: u.questions.length - 1 }))
  render(<Grammar />)
  fireEvent.click(screen.getByText(`👉 ${u.title}（${u.questions.length - 1} / ${u.questions.length}）`))
  expect(screen.getByText(u.points[0])).toBeInTheDocument()
})

it('まちがえた問題があると「まちがえた問題だけもう一度」で、その問題だけ解き直せる', () => {
  localStorage.clear()
  render(<Grammar />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  unit.questions.forEach((q, i) => {
    fireEvent.click(screen.getByRole('button', { name: q.choices[i === 1 ? (q.answer + 1) % q.choices.length : q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  })
  fireEvent.click(screen.getByText('🔁 まちがえた問題だけもう一度（1問）'))
  const q = unit.questions[1]
  expect(document.querySelector('.grammar-progress')!.textContent).toBe('1 / 1 問目')
  fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
  fireEvent.click(screen.getByText('次へ'))
  expect(screen.getByText('1 / 1 問正解')).toBeInTheDocument()
  expect(screen.queryByText(/まちがえた問題だけもう一度/)).toBeNull()
})

it('★をつけた単元だけから「お気に入り単元テスト」ができる', () => {
  localStorage.clear()
  const u = GRAMMAR[3]
  localStorage.setItem('eitan:grammar-fav', JSON.stringify([u.id]))
  render(<Grammar />)
  fireEvent.click(screen.getByText('★ お気に入り単元テスト（★1単元から最大10問）'))
  expect(document.querySelector('.grammar-progress')!.textContent).toBe(`1 / ${u.questions.length} 問目`)
  const shown = document.querySelector('.quiz.grammar')!.textContent!
  expect(u.questions.some((q) => q.choices.every((c) => shown.includes(c)))).toBe(true)
})

it('結果画面に「この回の正しい英文」がまとめて出る', async () => {
  localStorage.clear()
  const { correctSentence } = await import('./grammar')
  render(<Grammar />)
  const unit = GRAMMAR.find((u) => u.questions.every((q) => correctSentence(q)))!
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText('📖 この回の正しい英文（3文）')).toBeInTheDocument()
  for (const q of unit.questions) expect(screen.getByLabelText(`${correctSentence(q)} を聞く`)).toBeInTheDocument()
})

it('単元の要点画面から「関連する単元」へ行ける', async () => {
  localStorage.clear()
  const { relatedUnits } = await import('./grammar')
  render(<Grammar />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  const r = relatedUnits(unit.id)[0]
  fireEvent.click(screen.getAllByRole('button', { name: r.title }).at(-1)!)
  expect(screen.getByText(r.points[0])).toBeInTheDocument()
})

it('単元一覧を「まだの単元から」ならべかえられる', async () => {
  localStorage.clear()
  const { gradeOf } = await import('./grammar')
  const first = GRAMMAR.filter((u) => gradeOf(u.id) === '中1')[0]
  localStorage.setItem('eitan:grammar', JSON.stringify({ [first.id]: first.questions.length }))
  render(<Grammar />)
  const firstItem = () => document.querySelector('details.grammar-grade-fold li')!.textContent!
  expect(firstItem()).toContain(first.title)
  fireEvent.click(screen.getByRole('button', { name: 'まだの単元から' }))
  expect(firstItem()).not.toContain(first.title)
})

it('すぐ練習の5問を全問正解するとコインのごほうび', () => {
  localStorage.clear()
  const perfect = vi.fn()
  const rnd = vi.spyOn(Math, 'random').mockReturnValue(0)
  render(<Grammar quickStart onQuickPerfect={perfect} />)
  rnd.mockRestore()
  const all = GRAMMAR.flatMap((u) => u.questions)
  for (let i = 0; i < 5; i++) {
    const text = document.querySelector('.blank-sentence')!.textContent!
    const q = all.find((x) => x.sentence.replace('___', '　　　') === text)!
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(perfect).toHaveBeenCalledTimes(1)
  expect(screen.getByText(/すぐ練習 5問全問正解！/)).toBeInTheDocument()
})

it('すぐ練習は学年をえらぶと、その学年の問題だけになる', async () => {
  const { quickPractice, gradeOf } = await import('./grammar')
  const u = quickPractice({}, () => 0.5, 5, '中3')
  const ids = new Set(GRAMMAR.filter((g) => gradeOf(g.id) === '中3').flatMap((g) => g.questions))
  expect(u.questions.every((q) => ids.has(q))).toBe(true)
  localStorage.clear()
  render(<Grammar />)
  fireEvent.click(within(screen.getByRole('group', { name: 'すぐ練習の学年' })).getByText('中2'))
  expect(screen.getByText('✏️ すぐ練習（5問・中2）')).toBeInTheDocument()
})

it('連続正解チャレンジは、まちがえるまで続いてベスト記録が残る', () => {
  localStorage.clear()
  const best = vi.fn()
  render(<Grammar onRunBest={best} />)
  fireEvent.click(screen.getByText('連続正解'))
  const all = GRAMMAR.flatMap((u) => u.questions)
  const cur = () => all.find((x) => x.sentence.replace('___', '　　　') === document.querySelector('.blank-sentence')!.textContent)!
  for (let i = 0; i < 3; i++) {
    const q = cur()
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(document.querySelector('.grammar-progress')!.textContent).toContain('連続 3 問')
  const q = cur()
  fireEvent.click(screen.getByRole('button', { name: q.choices[(q.answer + 1) % q.choices.length] }))
  fireEvent.click(screen.getByText('次へ'))
  expect(screen.getByText('🔥 3問 連続正解！（ベスト 3問）')).toBeInTheDocument()
  expect(localStorage.getItem('eitan:grammar-run-best')).toBe('3')
  expect(best).toHaveBeenCalledTimes(1) // 3問以上でベスト更新 → 文法のなかまにボーナス
  expect(screen.getByText(/ベスト更新！ 文法のなかまに/)).toBeInTheDocument()
})

it('文法ゲームのタイルは、まだ遊んでいないゲームに NEW 印がつき、遊ぶと消える', () => {
  localStorage.clear()
  const { unmount } = render(<Grammar />)
  const grid = screen.getByLabelText('文法ゲーム')
  expect(grid.querySelectorAll('.game-tile-new')).toHaveLength(12)
  fireEvent.click(screen.getByText('要点カード'))
  unmount()
  render(<Grammar />)
  expect(screen.getByLabelText('文法ゲーム').querySelectorAll('.game-tile-new')).toHaveLength(11)
  expect(screen.getByText('要点カード').closest('button')!.querySelector('.game-tile-new')).toBeNull()
})

it('文法ゲーム「語順ならべかえ」は全単元の例文から出て、もどると一覧に帰る', () => {
  localStorage.clear()
  render(<Grammar />)
  fireEvent.click(screen.getByText('語順ならべかえ'))
  expect(screen.queryByLabelText('文法ゲーム')).toBeNull()
  fireEvent.click(screen.getAllByRole('button').find((b) => /もどる|←/.test(b.textContent ?? ''))!)
  expect(screen.getByLabelText('文法ゲーム')).toBeInTheDocument()
})

it('まちがいノートに問題があると、文法ゲームに「まちがいノート」タイルが出て、とき直せる', () => {
  localStorage.clear()
  const q = GRAMMAR[0].questions[0]
  localStorage.setItem('eitan:grammar-notebook', JSON.stringify([q.sentence]))
  render(<Grammar />)
  const grid = screen.getByLabelText('文法ゲーム')
  fireEvent.click(within(grid).getByText('まちがいノート'))
  expect(screen.getByRole('button', { name: q.choices[q.answer] })).toBeInTheDocument()
})

it('すぐ練習でまちがえると、結果に「まちがいノートに入れたよ」と出る', () => {
  localStorage.clear()
  render(<Grammar quickStart />)
  const all = GRAMMAR.flatMap((u) => u.questions)
  for (let i = 0; i < 5; i++) {
    const text = document.querySelector('.blank-sentence')!.textContent!
    const q = all.find((x) => x.sentence.replace('___', '　　　') === text)!
    const pick = i === 0 ? (q.answer + 1) % q.choices.length : q.answer
    fireEvent.click(screen.getByRole('button', { name: q.choices[pick] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText(/まちがえた1問をまちがいノートに入れたよ/)).toBeInTheDocument()
})

it('文法の単元一覧で、まだ開いていない単元に NEW 印がつき、開くと消える', () => {
  localStorage.clear()
  const { unmount } = render(<Grammar />)
  const u = GRAMMAR[0]
  const item = () => screen.getAllByText(u.title)[0].closest('button')!
  expect(item().textContent).toContain('NEW')
  fireEvent.click(item())
  unmount()
  render(<Grammar />)
  expect(item().textContent).not.toContain('NEW')
})
