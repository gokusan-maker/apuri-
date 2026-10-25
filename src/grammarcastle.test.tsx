import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { GRAMMAR } from './grammar'
import { FLOOR_QS, grammarCastleFloors, topicOf } from './grammarcastle'
import { Grammar } from './GrammarView'

it('文法の城：同じ項目（不定詞など）を5問×3階で登り、1階目は解説から', () => {
  const floors = grammarCastleFloors(GRAMMAR)
  expect(floors[0].label).toBe('時制①　1/3')
  expect(floors[0].explain!.points.length).toBeGreaterThan(0)
  expect(floors[1].explain).toBeNull()
  for (const f of floors) expect(f.questions.length).toBeGreaterThanOrEqual(FLOOR_QS)
  // 同じまとまりの3階は同じ項目
  expect(new Set(floors.slice(0, 3).map((f) => f.topic)).size).toBe(1)
  expect(topicOf(GRAMMAR.find((u) => u.id === 'gerund')!)).toBe('動名詞')
})

it('城の1階：解説 → 5問 → 4問以上正解でクリアして「次の階へ」', () => {
  localStorage.clear()
  render(<Grammar />)
  const castle = screen.getByRole('region', { name: '文法の城' })
  fireEvent.click(within(castle).getByRole('button', { name: /^1階：時制①　1\/3/ }))
  expect(screen.getByText(/時制①（5単元）/)).toBeInTheDocument()
  fireEvent.click(screen.getByText(/問題に挑戦/))
  const f = grammarCastleFloors(GRAMMAR)[0]
  for (const q of f.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    const next = screen.queryByText(/次の問題|次へ|結果を見る/)
    if (next) fireEvent.click(next)
  }
  expect(screen.getByRole('button', { name: /🏰 次の階へ ▶ 時制①　2\/3/ })).toBeInTheDocument()
  expect(JSON.parse(localStorage.getItem('eitan:gcastle')!)).toContain(f.id)
})
