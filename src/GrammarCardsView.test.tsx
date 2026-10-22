import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { GRAMMAR } from './grammar'
import { GrammarCards } from './GrammarCardsView'

it('要点カードはタップでめくれて、つぎ・まえに進める', () => {
  render(<GrammarCards units={GRAMMAR.slice(0, 3)} onBack={() => {}} />)
  expect(screen.getByText(GRAMMAR[0].title)).toBeInTheDocument()
  fireEvent.click(screen.getByLabelText('カードをめくる'))
  expect(screen.getByText(`・${GRAMMAR[0].points[0]}`)).toBeInTheDocument()
  fireEvent.click(screen.getByText('つぎ ▶'))
  expect(screen.getByText(GRAMMAR[1].title)).toBeInTheDocument()
  fireEvent.click(screen.getByText('◀ まえ'))
  fireEvent.click(screen.getByText('◀ まえ'))
  expect(screen.getByText(GRAMMAR[2].title)).toBeInTheDocument() // 先頭からまえは最後へ
})

it('「覚えた／まだ」を記録して、まだのカードだけめくれる', () => {
  localStorage.clear()
  render(<GrammarCards units={GRAMMAR.slice(0, 3)} onBack={() => {}} />)
  fireEvent.click(screen.getByLabelText('カードをめくる'))
  fireEvent.click(screen.getByText('⭕ 覚えた'))
  expect(screen.getByText(/覚えた 1 \/ 3/)).toBeInTheDocument()
  expect(screen.getByText(GRAMMAR[1].title)).toBeInTheDocument()
  fireEvent.click(screen.getByLabelText('カードをめくる'))
  fireEvent.click(screen.getByText('🔁 まだ'))
  expect(JSON.parse(localStorage.getItem('eitan:grammar-cards-known')!)).toEqual([GRAMMAR[0].id])
  fireEvent.click(screen.getByText('🔁 「まだ」のカードだけめくる'))
  expect(screen.getByText(/要点カード 1 \/ 2/)).toBeInTheDocument()
  expect(screen.getByText(GRAMMAR[1].title)).toBeInTheDocument()
  fireEvent.click(screen.getByText('📚 全部のカードにもどす'))
  expect(screen.getByText(/要点カード 1 \/ 3/)).toBeInTheDocument()
})

it('全部覚えると「まだ」だけの山札は空になる', () => {
  localStorage.setItem('eitan:grammar-cards-known', JSON.stringify(GRAMMAR.slice(0, 2).map((u) => u.id)))
  render(<GrammarCards units={GRAMMAR.slice(0, 2)} onBack={() => {}} />)
  fireEvent.click(screen.getByText('🔁 「まだ」のカードだけめくる'))
  expect(screen.getByText('🎉 全部のカードを覚えた！')).toBeInTheDocument()
})

it('自動読み上げをオンにすると、めくったときに例文を読む', async () => {
  localStorage.clear()
  const speech = await import('./speech')
  const sp = vi.spyOn(speech, 'speak').mockImplementation(() => {})
  render(<GrammarCards units={GRAMMAR.slice(0, 2)} onBack={() => {}} />)
  fireEvent.click(screen.getByLabelText('カードをめくる'))
  expect(sp).not.toHaveBeenCalled()
  fireEvent.click(screen.getByLabelText('カードの表を見る'))
  fireEvent.click(screen.getByLabelText(/めくったら例文を読み上げる/))
  fireEvent.click(screen.getByLabelText('カードをめくる'))
  expect(sp).toHaveBeenCalledWith(GRAMMAR[0].examples[0].en)
  expect(localStorage.getItem('eitan:cards-auto-read')).toBe('1')
  sp.mockRestore()
})
