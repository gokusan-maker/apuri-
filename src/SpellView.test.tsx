import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Spell } from './SpellView'
import { WORDS } from './words'

function current() {
  const ja = document.querySelector('.spell .en')!.textContent
  return WORDS.find((w) => w.ja === ja)!
}

describe('Spell', () => {
  it('正しく入力すると正解、ヒントで1文字ずつ見える', () => {
    const onAnswer = vi.fn()
    render(<Spell words={WORDS.slice(0, 5)} count={2} onAnswer={onAnswer} />)
    const w = current()
    fireEvent.click(screen.getByText('1文字ヒント'))
    expect(screen.getByLabelText('ヒント').textContent!.startsWith(w.en[0] + ' ')).toBe(true)
    fireEvent.change(screen.getByLabelText('英単語を入力'), { target: { value: w.en.toUpperCase() } })
    fireEvent.click(screen.getByText('こたえる'))
    expect(screen.getByText('正解！')).toBeInTheDocument()
    expect(onAnswer).toHaveBeenCalledWith(true, 8, w.id)
  })

  it('まちがえると正しいつづりを見せ、最後に結果', () => {
    render(<Spell words={WORDS.slice(0, 5)} count={1} />)
    const w = current()
    fireEvent.change(screen.getByLabelText('英単語を入力'), { target: { value: 'zzz' } })
    fireEvent.click(screen.getByText('こたえる'))
    expect(screen.getByText(`正解は「${w.en}」`)).toBeInTheDocument()
    fireEvent.click(screen.getByText('次へ'))
    expect(screen.getByText('0 / 1 問正解')).toBeInTheDocument()
  })
})
