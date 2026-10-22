import { act, fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { BossTime } from './BossTimeView'
import { wordsOf } from './words'

it('30秒で正解するたびにダメージがたまり、ベストが残る', async () => {
  localStorage.clear()
  const words = wordsOf(['中1'])
  render(<BossTime words={words} onBack={() => {}} />)
  fireEvent.click(screen.getByText('スタート'))
  for (let k = 0; k < 2; k++) {
    const en = document.querySelector('.boss-ta .en')!.textContent
    const w = words.find((x) => x.en === en)!
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.boss-ta .choice')].find((b) => b.textContent === w.ja)!)
  }
  expect(screen.getByText(/💥 13ダメージ/)).toBeInTheDocument() // 6 + 7
  vi.setSystemTime(Date.now() + 31000)
  await act(async () => {
    await new Promise((r) => setTimeout(r, 300))
  })
  expect(screen.getByText(/13ダメージ！ 🏆 ベスト記録！/)).toBeInTheDocument()
  expect(localStorage.getItem('eitan:boss-ta-best')).toBe('13')
})
