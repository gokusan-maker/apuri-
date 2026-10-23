import { beforeEach, expect, it } from 'vitest'
import { collectRecords } from './records'

beforeEach(() => localStorage.clear())

it('自己ベストをまとめる', () => {
  localStorage.setItem('eitan:endless', '12')
  localStorage.setItem('eitan:boss-book', JSON.stringify({ ヤミモチ: { wins: 3, best: 'S', first: '2026-10-01', look: { name: 'ヤミモチ', color: '#000', line: '#000', eye: '#fff' } } }))
  const rows = collectRecords()
  const v = (label: string) => rows.find((r) => r.label === label)!.value
  expect(v('エンドレスの塔')).toBe('12階')
  expect(v('ボス撃破')).toBe('3回')
  expect(v('Sランクのボス')).toBe('1体')
  expect(v('文法スタンプ')).toBe('0個')
  expect(v('ガチャ')).toBe('0回')
  expect(v('いまの仲間')).toMatch(/^\d+匹$/)
  expect(rows.every((r) => r.label.length <= 8)).toBe(true)
})
