import { act, fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { wordCastleFloors, WC_GAME_LABEL } from './wordcastle'
import { WordCastle } from './WordCastleView'

it('単語の城：2・3階目は単元ごとにちがうミニゲーム', () => {
  const fl = wordCastleFloors(['中1'])
  expect(fl[0].direction).toBe('en-ja')
  const games = new Set(fl.filter((f) => f.floor > 0).map((f) => f.direction))
  expect(games.size).toBeGreaterThanOrEqual(5)
  expect(fl[1].sub).toBe(WC_GAME_LABEL[fl[1].direction])
})

it('スペルの階：5語を書いて4問以上でクリア', () => {
  vi.useFakeTimers()
  localStorage.clear()
  const fl = wordCastleFloors(['中1'])
  const f = fl.find((x) => x.direction === 'spell')!
  const before = fl.slice(0, fl.indexOf(f)).map((x) => x.id)
  localStorage.setItem('eitan:wcastle', JSON.stringify(before))
  render(<WordCastle levels={['中1']} />)
  fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${fl.indexOf(f) + 1}階：`) }))
  expect(screen.getByText(WC_GAME_LABEL.spell)).toBeInTheDocument()
  for (let i = 0; i < f.words.length; i++) {
    const w = f.words.find((x) => screen.queryAllByText(x.ja).length > 0)!
    fireEvent.change(screen.getByLabelText('英単語を入力'), { target: { value: w.en } })
    fireEvent.click(screen.getByText('こたえる'))
    if (i < f.words.length - 1) fireEvent.click(screen.getByText(/次へ|つぎへ/))
  }
  act(() => vi.advanceTimersByTime(1500))
  expect(screen.getByText(/クリア！ 5\/5問正解/)).toBeInTheDocument()
  expect(screen.getByText('🎉 階クリア！')).toBeInTheDocument() // 紙ふぶきのお祝い
  expect(screen.getByText(/のとびらがひらいた！/)).toBeInTheDocument()
  expect(JSON.parse(localStorage.getItem('eitan:wcastle')!)).toContain(f.id)
  // 3階目をクリアするとミニボス出現。押すとこの単元の10語で勝負
  expect(f.floor).toBe(2)
  fireEvent.click(screen.getByRole('button', { name: /ミニボス「.+」出現！/ }))
  expect(screen.getByText(/8問以上でたおせ！/)).toBeInTheDocument()
  expect(screen.getByText(/1 \/ 10/)).toBeInTheDocument()
  vi.useRealTimers()
})
