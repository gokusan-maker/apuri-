import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
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
