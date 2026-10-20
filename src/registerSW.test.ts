import { describe, expect, it, vi } from 'vitest'
import sw from '../public/sw.js?raw'
import { registerSW } from './registerSW'

describe('オフライン対応', () => {
  it('本番では読み込み後に ./sw.js を登録する', () => {
    const register = vi.fn(() => Promise.resolve())
    const nav = { serviceWorker: { register } } as unknown as Navigator
    expect(registerSW(nav, true)).toBe(true)
    window.dispatchEvent(new Event('load'))
    expect(register).toHaveBeenCalledWith('./sw.js')
  })

  it('開発中や非対応ブラウザでは登録しない', () => {
    const register = vi.fn()
    expect(registerSW({ serviceWorker: { register } } as unknown as Navigator, false)).toBe(false)
    expect(registerSW({} as Navigator, true)).toBe(false)
    expect(register).not.toHaveBeenCalled()
  })

  it('sw.js はアプリ本体をキャッシュし、オフライン時は index.html を返す', () => {
    expect(sw).toContain("'./index.html'")
    expect(sw).toContain("addEventListener('fetch'")
    expect(sw).toContain(".catch(() => caches.match('./index.html'))")
  })
})
