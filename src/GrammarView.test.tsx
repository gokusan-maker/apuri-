import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GRAMMAR } from './grammar'
import { Grammar } from './GrammarView'

describe('文法ミニ解説', () => {
  it('解説を読んで3問に答え、全問正解で記録が残る', () => {
    localStorage.clear()
    const onAnswer = vi.fn()
    render(<Grammar onAnswer={onAnswer} />)
    expect(screen.getByText(`全問正解 0 / ${GRAMMAR.length} 単元`)).toBeInTheDocument()
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
  fireEvent.click(screen.getByText('📝 まとめテスト（ランダム10問）'))
  expect(screen.getByText(/^1 \/ 10/)).toBeInTheDocument()
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
  fireEvent.click(screen.getByText(/まとめテスト（ランダム10問）/))
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
  fireEvent.click(screen.getByText(`📅 今日の文法：${u.title}`, { exact: false }))
  fireEvent.click(screen.getByText(/確認問題へ/))
  for (const q of u.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(bonus).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByText('← 単元一覧'))
  expect(screen.getByText('✅ 今日はクリアずみ')).toBeInTheDocument()
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
  fireEvent.click(screen.getByText(/文法モンスターラッシュ/))
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
  fireEvent.click(screen.getByRole('button', { name: `${last.title}をお気に入りからはずす` }))
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
    const q = pool.find((x) => text.startsWith(x.sentence.split('___')[0]) && text.endsWith(x.sentence.split('___')[1]))!
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
  const { praiseOf } = await import('./grammar')
  localStorage.clear()
  render(<Grammar partnerName="モチ" />)
  const unit = GRAMMAR[0]
  fireEvent.click(screen.getByText(unit.title))
  fireEvent.click(screen.getByText('確認問題へ（3問）'))
  for (const q of unit.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText(`🐣 モチ「${praiseOf(unit.id)}」`)).toBeInTheDocument()
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
