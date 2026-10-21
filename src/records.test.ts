import { beforeEach, expect, it } from 'vitest'
import { collectRecords } from './records'

beforeEach(() => localStorage.clear())

it('自己ベストをまとめる', () => {
  localStorage.setItem('eitan:endless', '12')
  localStorage.setItem('eitan:boss-book', JSON.stringify({ ヤミモチ: { wins: 3, best: 'S', first: '2026-10-01', look: { name: 'ヤミモチ', color: '#000', line: '#000', eye: '#fff' } } }))
  const rows = collectRecords()
  const v = (label: string) => rows.find((r) => r.label === label)!.value
  expect(v('エンドレスの塔 最高到達')).toBe('12階')
  expect(v('ボスをたおした回数')).toBe('3回')
  expect(v('Sランクを取ったボス')).toBe('1体')
  expect(v('文法スタンプ')).toBe('0個')
})
