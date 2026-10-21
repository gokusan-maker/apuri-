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
  expect(screen.getByRole('button', { name: /のこり 14問/ })).toBeDisabled()
  for (const b of p.blanks) {
    const label = `${MARKS[b.answer]} ${b.choices[b.answer]}`
    const btn = screen.getAllByRole('button', { name: label }).find((x) => x.closest('.long-item')!.textContent!.includes(`( ${b.id} )`))!
    fireEvent.click(btn)
  }
  p.tf.forEach((t, i) => fireEvent.click(screen.getByRole('button', { name: `(${i + 1}) ${i === 0 ? '×' : t.answer ? '○' : '×'}` })))
  for (const i of p.pick2!.answers) fireEvent.click(screen.getByRole('button', { name: `${MARKS[i]} ${p.pick2!.statements[i]}` }))
  p.qa!.forEach((x) => fireEvent.click(screen.getByRole('button', { name: `${MARKS[x.answer]} ${x.choices[x.answer]}` })))
  vi.setSystemTime(Date.now() + 125000)
  fireEvent.click(screen.getByRole('button', { name: '採点する' }))
  expect(screen.getByText(/13 \/ 14 点/)).toBeInTheDocument()
  expect(screen.getByText(/かかった時間 2分05秒/)).toBeInTheDocument()
  expect(screen.getAllByText(/⭕/).length).toBe(11)
  expect(onAnswer).toHaveBeenCalledTimes(14)
  fireEvent.click(screen.getByText('← 長文の一覧'))
  expect(screen.getByText(/最高 13点/)).toBeInTheDocument()
  expect(screen.getByText(/内容一致（○×）：80%（4\/5）/)).toBeInTheDocument()
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
  p.qa!.forEach((x) => fireEvent.click(screen.getByRole('button', { name: `${MARKS[x.answer]} ${x.choices[x.answer]}` })))
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

it('表を読みとる長文では表が出る', () => {
  render(<LongReading />)
  fireEvent.click(screen.getByText(/Green City Sports Center/))
  expect(document.querySelectorAll('.long-table tbody tr')).toHaveLength(4)
  expect(screen.getByText('Tennis', { selector: 'td' })).toBeInTheDocument()
})

it('段落ごとに英語で読み上げられる（空所は読まない）', () => {
  const spoken: string[] = []
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: { cancel() {}, speak: (u: { text: string }) => spoken.push(u.text), getVoices: () => [] } })
  ;(globalThis as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance = class {
    text: string
    constructor(t: string) {
      this.text = t
    }
  }
  render(<LongReading />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getByText(new RegExp(p.title)))
  fireEvent.click(screen.getByLabelText('第1段落を聞く'))
  expect(spoken[0]).toContain('There is a small library')
  expect(spoken[0]).not.toContain('( A )')
})

it('指示語の問題では二重下線の語が出る', () => {
  render(<LongReading />)
  fireEvent.click(screen.getByText(/The Shinkansen and Its Seven-Minute Team/))
  expect(document.querySelector('.long-text .long-refer')!.textContent).toBe('it')
  fireEvent.click(screen.getByRole('button', { name: 'ア the Shinkansen' }))
  expect(screen.getByRole('button', { name: 'ア the Shinkansen' })).toHaveAttribute('aria-pressed', 'true')
})
