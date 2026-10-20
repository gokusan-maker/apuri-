import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

// 日付で結果が変わらないよう、テストの「今日」は平日（2026-10-20 火曜）に固定する
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'], now: new Date(2026, 9, 20, 10, 0, 0) })
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})
