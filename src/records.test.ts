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

it('記録の部屋にスペル・数の聞き取り・書き取りの自己ベストも出る', () => {
  localStorage.setItem('eitan:spell-best-streak', '7')
  localStorage.setItem('eitan:numbers-best', '9')
  localStorage.setItem('eitan:dict-best-streak', '3')
  const rows = collectRecords()
  const v = (l: string) => rows.find((r) => r.label === l)!.value
  expect(v('スペル連続正解')).toBe('7問')
  expect(v('数の聞き取り')).toBe('9 / 10問')
  expect(v('書き取り連続')).toBe('3文')
  localStorage.setItem('eitan:castle-chests', JSON.stringify({ a: [10, 20] }))
  expect(collectRecords().find((r) => r.label === 'あけた宝箱')!.value).toBe('2個')
  expect(collectRecords().find((r) => r.label === '制覇した城')!.value).toMatch(/^\d+ \/ \d+$/)
  localStorage.clear()
})
