import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { isIOS, isStandalone } from './install'
import { Install } from './InstallView'

describe('ホーム画面に追加', () => {
  it('iPhone の判定', () => {
    expect(isIOS('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)')).toBe(true)
    expect(isIOS('Mozilla/5.0 (Linux; Android 14)')).toBe(false)
  })

  it('ホーム画面から開いているかの判定', () => {
    const w = { navigator: {}, matchMedia: () => ({ matches: true }) } as unknown as Window
    expect(isStandalone(w)).toBe(true)
    const w2 = { navigator: { standalone: false }, matchMedia: () => ({ matches: false }) } as unknown as Window
    expect(isStandalone(w2)).toBe(false)
  })

  it('対応ブラウザではボタンが出て、押すとインストールの確認が出る', async () => {
    render(<Install />)
    expect(screen.queryByText('📲 ホーム画面に追加する')).not.toBeInTheDocument()
    const prompt = vi.fn(() => Promise.resolve())
    const ev = Object.assign(new Event('beforeinstallprompt'), { prompt, userChoice: Promise.resolve({ outcome: 'accepted' }) })
    act(() => {
      window.dispatchEvent(ev)
    })
    await act(async () => {
      fireEvent.click(screen.getByText('📲 ホーム画面に追加する'))
    })
    expect(prompt).toHaveBeenCalled()
    expect(screen.getByText('ホーム画面から使っています ✓')).toBeInTheDocument()
  })
})
