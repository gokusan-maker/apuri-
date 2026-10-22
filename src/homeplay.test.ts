import { expect, it } from 'vitest'
import { loadPlayOpen, savePlayOpen } from './homeplay'

it('「きょうのあそび」の開閉を覚える（はじめは閉じている）', () => {
  localStorage.clear()
  expect(loadPlayOpen()).toBe(false)
  savePlayOpen(true)
  expect(loadPlayOpen()).toBe(true)
  savePlayOpen(false)
  expect(loadPlayOpen()).toBe(false)
})
