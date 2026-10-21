import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { Training } from './TrainingView'
import { wordsOf } from './words'

it('5問全問正解でちからが上がり、その日はおわり', () => {
  localStorage.clear()
  const words = wordsOf(['中1'])
  const onChange = vi.fn()
  render(<Training day="2026-10-20" words={words} name="モチ" onChange={onChange} />)
  fireEvent.click(screen.getByText(/モチとトレーニング/))
  for (let i = 0; i < 5; i++) {
    const en = /「(.+)」の意味は/.exec(document.querySelector('.training-title')!.textContent!)![1]
    fireEvent.click(screen.getByRole('button', { name: words.find((w) => w.en === en)!.ja }))
  }
  expect(onChange).toHaveBeenCalledWith({ power: 1, day: '2026-10-20' })
  expect(screen.getByText(/ちからが 1 になった/)).toBeInTheDocument()
})
