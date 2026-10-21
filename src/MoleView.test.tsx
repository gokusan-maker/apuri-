import { act, fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { Mole } from './MoleView'
import { wordsOf } from './words'

it('正しいもぐらをたたくと数がふえ、30秒で終わる', async () => {
  localStorage.clear()
  const words = wordsOf(['中1'])
  const onAnswer = vi.fn()
  render(<Mole words={words} onAnswer={onAnswer} />)
  fireEvent.click(screen.getByText('スタート'))
  const ja = document.querySelector('.mole-target')!.textContent!.replace(/[「」]/g, '')
  const right = [...document.querySelectorAll<HTMLButtonElement>('.mole-hole.up')].find((b) => words.find((w) => w.en === b.getAttribute('aria-label'))!.ja === ja)!
  fireEvent.click(right)
  expect(screen.getByText(/🔨 1匹/)).toBeInTheDocument()
  expect(onAnswer).toHaveBeenCalledWith(true, expect.any(Number), expect.any(String), 'quiz')
  vi.setSystemTime(Date.now() + 31000)
  await act(async () => {
    await new Promise((r) => setTimeout(r, 300))
  })
  expect(screen.getByText(/1匹たたいた！ 🏆 ベスト記録！/)).toBeInTheDocument()
  expect(localStorage.getItem('eitan:best-mole')).toBe('1')
})
