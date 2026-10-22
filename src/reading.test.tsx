import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PASSAGES } from './reading'
import { Reading } from './ReadingView'

describe('読解ミニ', () => {
  it('90話、各3問で、正解が選択肢の中にある', () => {
    expect(PASSAGES).toHaveLength(98)
    expect(new Set(PASSAGES.map((p) => p.id)).size).toBe(PASSAGES.length)
    for (const p of PASSAGES) {
      expect(p.questions).toHaveLength(3)
      for (const q of p.questions) expect(q.choices[q.answer]).toBeDefined()
      expect(p.text.split('. ').length).toBeGreaterThanOrEqual(3)
    }
  })

  it('本文の単語をタップすると意味が出る', () => {
    render(<Reading />)
    fireEvent.click(screen.getByText(PASSAGES[0].title))
    fireEvent.click(screen.getByRole('button', { name: 'cat.' }))
    expect(screen.getByRole('status').textContent).toContain('cat：')
  })

  it('読んで3問に答え、最後に訳が出る', () => {
    render(<Reading />)
    const p = PASSAGES[0]
    fireEvent.click(screen.getByText(p.title))
    for (const q of p.questions) {
      fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('3 / 3 問正解')).toBeInTheDocument()
    expect(screen.getByText(p.ja)).toBeInTheDocument()
  })
})
