import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { WordList } from './WordListView'
import { WORDS } from './words'

describe('単語一覧の絞り込み', () => {
  it('まだ／学習中／定着／★で絞りこめる', () => {
    const words = WORDS.slice(0, 5)
    const progress = { [words[0].id]: { box: 1, due: '2099-01-01' }, [words[1].id]: { box: 4, due: '2099-01-01' } }
    render(<WordList words={words} progress={progress} onClose={() => {}} favorites={[words[2].id]} />)
    expect(screen.getByText('5語')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '学習中' }))
    expect(screen.getByText('1語')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '定着' }))
    expect(screen.getByText(words[1].en)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'まだ' }))
    expect(screen.getByText('3語')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '★' }))
    expect(screen.getByText(words[2].en)).toBeInTheDocument()
  })
})

it('🖨 で印刷できる', () => {
  const print = vi.spyOn(window, 'print').mockImplementation(() => {})
  render(<WordList words={WORDS.slice(0, 3)} progress={{}} onClose={() => {}} />)
  fireEvent.click(screen.getByText('🖨 印刷・PDF'))
  expect(print).toHaveBeenCalled()
  print.mockRestore()
})

it('絵文字のある単語は一覧にも絵文字が出る', () => {
  const words = WORDS.filter((w) => w.id === 'apple' || w.id === 'borrow')
  render(<WordList words={words} progress={{}} onClose={() => {}} />)
  expect(screen.getByRole('button', { name: /apple/ }).textContent).toContain('🍎')
  expect(screen.getByRole('button', { name: /borrow/ }).textContent).not.toMatch(/\p{Extended_Pictographic}/u)
})

it('詳細に「はじめて学んだ日」が出る', () => {
  const w = WORDS[0]
  render(<WordList words={[w]} progress={{ [w.id]: { box: 1, due: '2099-01-01', first: '2026-10-18' } }} onClose={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: new RegExp(w.en) }))
  expect(screen.getByText('はじめて学んだ日 10/18')).toBeInTheDocument()
})

it('メモのある単語だけにしぼりこめる', () => {
  const words = WORDS.slice(0, 3)
  render(<WordList words={words} progress={{}} onClose={() => {}} notes={{ [words[1].id]: 'にている単語に注意' }} />)
  fireEvent.click(screen.getByRole('button', { name: '📝メモ' }))
  expect(screen.getByText('1語')).toBeInTheDocument()
  expect(screen.getByText(words[1].en)).toBeInTheDocument()
})

it('詳細に反対の意味・同じ発音の単語が出る', () => {
  const w = WORDS.find((x) => x.en === 'sea')!
  render(<WordList words={[w]} progress={{}} onClose={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: /sea/ }))
  expect(screen.getByText('👂 同じ発音：see（見る）')).toBeInTheDocument()
})

it('多いときは100語ずつ表示し、「もっと見る」で続きが出る', () => {
  render(<WordList words={WORDS.slice(0, 150)} progress={{}} onClose={() => {}} />)
  expect(document.querySelectorAll('.word-row')).toHaveLength(100)
  fireEvent.click(screen.getByText('もっと見る（あと50語）'))
  expect(document.querySelectorAll('.word-row')).toHaveLength(150)
})
