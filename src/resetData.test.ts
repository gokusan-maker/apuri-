import { describe, expect, it } from 'vitest'
import { clearAllData } from './resetData'

describe('clearAllData', () => {
  it('eitan: のキーだけ消す', () => {
    localStorage.clear()
    localStorage.setItem('eitan:progress', '{}')
    localStorage.setItem('eitan:wallet', '{}')
    localStorage.setItem('other', 'x')
    expect(clearAllData()).toBe(2)
    expect(localStorage.getItem('eitan:progress')).toBeNull()
    expect(localStorage.getItem('other')).toBe('x')
  })
})
