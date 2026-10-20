import { act, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OfflineStatus } from './OfflineView'

describe('オフライン表示', () => {
  it('準備中の表示と、オフラインになったときの表示', () => {
    render(<OfflineStatus />)
    expect(screen.getByText(/まだ準備中です/)).toBeInTheDocument()
    act(() => {
      window.dispatchEvent(new Event('offline'))
    })
    expect(screen.getByText(/いまはオフラインです/)).toBeInTheDocument()
  })
})
