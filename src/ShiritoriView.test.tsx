import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Shiritori } from './ShiritoriView'

describe('しりとりのチェーン表示', () => {
  it('いまの単語の最後の文字を強調し、問いの頭文字と一致する', () => {
    const { container } = render(<Shiritori />)
    const now = container.querySelector('.chain-now')!
    const tail = now.querySelector('.chain-tail')!.textContent
    expect(tail).toHaveLength(1)
    expect(container.querySelector('.verb-ask strong')?.textContent).toBe(tail)
    expect(container.querySelector('.shiritori-chain')?.getAttribute('aria-label')).toBe(now.textContent)
  })
})
