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

it('下線部の意味と並べかえに答えられる', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES.find((x) => x.id === 'no-phone-trip')!
  fireEvent.click(screen.getByText(new RegExp(p.title)))
  expect(document.querySelector('.long-underline')!.textContent).toBe(p.underline!.phrase)
  fireEvent.click(screen.getByRole('button', { name: `${MARKS[p.underline!.answer]} ${p.underline!.choices[p.underline!.answer]}` }))
  const area = document.querySelector('.long-order-words')!
  for (const w of p.order!.answer.split(' ')) {
    const btn = [...area.querySelectorAll<HTMLButtonElement>('button')].find((b) => b.textContent === w && !b.disabled)!
    fireEvent.click(btn)
  }
  expect(screen.getByLabelText('並べた英文').textContent).toContain(p.order!.answer)
})

it('採点するとまちがえた問題の根拠の段落に色がつく', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getByText(new RegExp(p.title)))
  for (const b of p.blanks) {
    const wrong = (b.answer + 1) % 4
    const btn = screen.getAllByRole('button', { name: `${MARKS[wrong]} ${b.choices[wrong]}` }).find((x) => x.closest('.long-item')!.textContent!.includes(`( ${b.id} )`))!
    fireEvent.click(btn)
  }
  p.tf.forEach((t, i) => fireEvent.click(screen.getByRole('button', { name: `(${i + 1}) ${t.answer ? '○' : '×'}` })))
  for (const i of p.pick2!.answers) fireEvent.click(screen.getByRole('button', { name: `${MARKS[i]} ${p.pick2!.statements[i]}` }))
  fireEvent.click(screen.getByRole('button', { name: '採点する' }))
  expect(screen.getByText(/根拠がある段落に色をつけたよ/)).toBeInTheDocument()
  expect(document.querySelectorAll('.long-evidence').length).toBe(3)
})

it('会話文の空所に入る文を選べる', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES.find((x) => x.id === 'shopping-dialogue')!
  fireEvent.click(screen.getByText(new RegExp('At a Sports Shop')))
  expect(screen.getAllByText('[ 1 ]').length).toBeGreaterThan(0)
  const sb = p.sentences![0]
  fireEvent.click(screen.getByRole('button', { name: `${MARKS[sb.answer]} ${sb.choices[sb.answer]}` }))
  expect(screen.getByRole('button', { name: `${MARKS[sb.answer]} ${sb.choices[sb.answer]}` })).toHaveAttribute('aria-pressed', 'true')
})
