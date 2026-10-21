import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { LONG_PASSAGES, MARKS } from './longreading'
import { LongReading } from './LongReadingView'

it('長文を読んで記号で答え、採点すると点数と解説が出る', () => {
  localStorage.clear()
  const onAnswer = vi.fn()
  render(<LongReading onAnswer={onAnswer} />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getByText(new RegExp(p.title)))
  expect(screen.getAllByText('( A )').length).toBeGreaterThan(0)
  expect(screen.getByRole('button', { name: /のこり 12問/ })).toBeDisabled()
  for (const b of p.blanks) {
    const label = `${MARKS[b.answer]} ${b.choices[b.answer]}`
    const btn = screen.getAllByRole('button', { name: label }).find((x) => x.closest('.long-item')!.textContent!.includes(`( ${b.id} )`))!
    fireEvent.click(btn)
  }
  p.tf.forEach((t, i) => fireEvent.click(screen.getByRole('button', { name: `(${i + 1}) ${i === 0 ? '×' : t.answer ? '○' : '×'}` })))
  for (const i of p.pick2!.answers) fireEvent.click(screen.getByRole('button', { name: `${MARKS[i]} ${p.pick2!.statements[i]}` }))
  fireEvent.click(screen.getByRole('button', { name: '採点する' }))
  expect(screen.getByText(/11 \/ 12 点/)).toBeInTheDocument()
  expect(screen.getAllByText(/⭕/).length).toBe(9)
  expect(onAnswer).toHaveBeenCalledTimes(12)
  fireEvent.click(screen.getByText('← 長文の一覧'))
  expect(screen.getByText(/最高 11点/)).toBeInTheDocument()
})
