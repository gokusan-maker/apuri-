import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ErrorBoundary } from './ErrorBoundary'

function Boom(): never {
  throw new Error('boom')
}

describe('エラー表示', () => {
  it('エラーが起きても「もう一度読み込む」画面を出す', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    )
    expect(screen.getByText('もう一度読み込む')).toBeInTheDocument()
    spy.mockRestore()
  })
})
