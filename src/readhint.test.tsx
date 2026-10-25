import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { hintHidden } from './readhint'
import { LongReading } from './LongReadingView'
import { Reading } from './ReadingView'
import { LONG_PASSAGES } from './longreading'
import { PASSAGES } from './reading'

it('ヒントは、まちがいの選択肢を消して2択にする（答えは消さない）', () => {
  for (let a = 0; a < 4; a++) {
    const h = hintHidden(4, a)
    expect(h).toHaveLength(2)
    expect(h).not.toContain(a)
  }
  expect(hintHidden(2, 0)).toEqual([])
})

it('かんたん読解：💡ヒントで選択肢が2つにしぼられる', () => {
  const p = PASSAGES.find((x) => x.questions[0].choices.length > 2)!
  render(<Reading start={p} />)
  fireEvent.click(screen.getByRole('button', { name: /💡 ヒント/ }))
  const q = p.questions[0]
  const btns = q.choices.map((c) => screen.getByRole('button', { name: c }))
  expect(btns.filter((b) => !(b as HTMLButtonElement).disabled)).toHaveLength(2)
  expect(btns[q.answer]).toBeEnabled()
  expect(screen.queryByRole('button', { name: /💡 ヒント/ })).toBeNull()
})

it('長文読解：空所ごとに💡ヒントで2択にしぼれる', () => {
  const p = LONG_PASSAGES[0]
  render(<LongReading start={p} passages={[p]} />)
  const b = p.blanks[0]
  fireEvent.click(screen.getByRole('button', { name: `( ${b.id} ) のヒント` }))
  const item = screen.getAllByText(`( ${b.id} )`).map((e) => e.closest('.long-item')).find(Boolean)!
  const btns = [...item.querySelectorAll<HTMLButtonElement>('.long-choice')]
  expect(btns.filter((x) => !x.disabled)).toHaveLength(2)
  expect(btns[b.answer].disabled).toBe(false)
})

it('長文読解：本文ははじめから上に固定（問題といっしょに見られる）。ボタンで固定をやめられる', () => {
  localStorage.removeItem('eitan:long-pin')
  const p = LONG_PASSAGES[0]
  render(<LongReading start={p} passages={[p]} />)
  expect(document.querySelector('.long-text')!.classList.contains('pinned')).toBe(true)
  fireEvent.click(screen.getByRole('button', { name: /本文を上に固定/ }))
  expect(document.querySelector('.long-text')!.classList.contains('pinned')).toBe(false)
  expect(localStorage.getItem('eitan:long-pin')).toBe('0')
  localStorage.removeItem('eitan:long-pin')
})
