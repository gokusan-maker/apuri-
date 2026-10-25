import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { evidenceOf, maskAnswer } from './readhint'
import { LongReading } from './LongReadingView'
import { Reading } from './ReadingView'
import { LONG_PASSAGES } from './longreading'
import { PASSAGES } from './reading'

it('ヒントは答えをかくして、根拠・考え方を見せる', () => {
  expect(maskAnswer('「駅の近くに」は near the station。', 'near')).toBe('「駅の近くに」は ＿＿ the station。')
  expect(maskAnswer('wait for 人 to 〜 で「人が〜するのを待つ」。', 'for')).toBe('wait ＿＿ 人 to 〜 で「人が〜するのを待つ」。')
  const p = PASSAGES.find((x) => x.id === 'cat')!
  expect(evidenceOf(p, 0)).toBe('She is white and very small.')
  expect(evidenceOf(p, 1)).toBe('Momo likes to sleep by the window.')
})

it('かんたん読解：💡ヒントで、答えの根拠になる英文が出る（選択肢は消さない）', () => {
  const p = PASSAGES.find((x) => x.id === 'cat')!
  render(<Reading start={p} />)
  fireEvent.click(screen.getByRole('button', { name: /💡 ヒント/ }))
  expect(screen.getByText(/この文に答えがあるよ：「She is white and very small.」/)).toBeInTheDocument()
  expect(p.questions[0].choices.every((c) => (screen.getByRole('button', { name: c }) as HTMLButtonElement).disabled === false)).toBe(true)
})

it('長文読解：空所の💡ヒントは解説の答えの語をかくして出す。○×・英問英答には根拠の文', () => {
  const p = LONG_PASSAGES[0]
  render(<LongReading start={p} passages={[p]} />)
  const b = p.blanks[0]
  fireEvent.click(screen.getByRole('button', { name: `( ${b.id} ) のヒント` }))
  const hint = document.querySelector('.read-hint-text')!.textContent!
  expect(hint).toContain('＿＿')
  expect(hint).not.toMatch(/\bnear\b/)
  fireEvent.click(screen.getByRole('button', { name: '(1) のヒント' }))
  expect(screen.getByText(/根拠になる文：/)).toBeInTheDocument()
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

it('今日の読解の課題は2問まで：空所2つだけで、ほかの空所は本文にうめる', async () => {
  const { trimForToday } = await import('./todayread')
  const p = LONG_PASSAGES.find((x) => x.blanks.length >= 4)!
  const t = trimForToday(p)
  expect(t.blanks.length + t.tf.length).toBe(2)
  expect(t.qa).toBeUndefined()
  const text = t.paragraphs.join(' ')
  expect(text).toContain(`( ${p.blanks[0].id} )`)
  expect(text).not.toContain(`( ${p.blanks[3].id} )`)
  expect(text).toContain(p.blanks[3].choices[p.blanks[3].answer])
})
