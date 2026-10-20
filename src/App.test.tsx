import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { WORDS } from './words'

describe('App', () => {
  beforeEach(() => localStorage.clear())

  it('カードをめくって「覚えた」で次の単語に進む', () => {
    render(<App />)
    expect(screen.getByText(`今日の残り ${WORDS.length} 語 ・ 定着 0 / ${WORDS.length} 語`)).toBeInTheDocument()
    expect(screen.getByText(WORDS[0].en)).toBeInTheDocument()

    fireEvent.click(screen.getByText('意味を見る'))
    expect(screen.getByText(WORDS[0].ja)).toBeInTheDocument()

    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText(WORDS[1].en)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`今日の残り ${WORDS.length - 1} 語`))).toBeInTheDocument()
  })
})
