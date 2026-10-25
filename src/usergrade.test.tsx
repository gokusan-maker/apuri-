import { courseWords } from './wordcourse'
import { beforeEach, expect, it } from 'vitest'
import { todayWords } from './dailyread'
import { dailyGrammar, gradeOf, GRAMMAR } from './grammar'
import { passagesFor } from './readlevel'
import { todayReading } from './todayread'
import { saveGrade } from './usergrade'

// 設定の学年・レベルに合わせて、今日の課題のむずかしさが変わる（オーナーの要望）
beforeEach(() => localStorage.clear())

it('学年をえらんでいなければ、これまでどおり（文法は全単元・読解はかんたんな短い英文）', () => {
  const days = ['2026-10-01', '2026-10-02', '2026-10-03']
  expect(days.map((d) => GRAMMAR.includes(dailyGrammar(d)))).toEqual([true, true, true])
  expect(todayReading('2026-10-01').kind).toBe('short')
})

it('中1なら今日の文法は中1の単元、読解はかんたんな英文', () => {
  saveGrade('j1')
  for (let i = 1; i <= 20; i++) expect(gradeOf(dailyGrammar(`2026-10-${String(i).padStart(2, '0')}`).id)).toBe('中1')
  expect(todayReading('2026-10-01').kind).toBe('short')
})

it('中2なら今日の単語は中2のレベルの単語から5語', () => {
  saveGrade('j2')
  const ws = todayWords('2026-10-07')
  expect(ws).toHaveLength(5)
  expect(ws.every((w) => courseWords('中2').includes(w))).toBe(true)
})

it('中3なら今日の単語は中3の単語帳から5語、読解は高校入試レベルの長文', () => {
  saveGrade('j3')
  const ws = todayWords('2026-10-05')
  expect(ws).toHaveLength(5)
  expect(ws.every((w) => courseWords('中3').includes(w))).toBe(true)
  const r = todayReading('2026-10-05')
  expect(r.kind).toBe('long')
  expect(passagesFor('exam').map((p) => p.id)).toContain(r.p.id)
})

it('社会人なら文法は中3〜高校、単語はビジネス・高校基礎、読解は大学入試レベル', () => {
  saveGrade('adult')
  for (let i = 1; i <= 20; i++) expect(['中3', '高校']).toContain(gradeOf(dailyGrammar(`2026-11-${String(i).padStart(2, '0')}`).id))
  expect(todayWords('2026-11-01').every((w) => w.level === 'ビジネス' || w.level === '高校基礎' || w.level === '熟語')).toBe(true)
  expect(passagesFor('univ').map((p) => p.id)).toContain(todayReading('2026-11-01').p.id)
})

it('今日の課題の読解の題名は、タイトルを当てる問題があるときは答えをかくす', async () => {
  const { todayReadingTitle } = await import('./todayread')
  saveGrade('j3')
  for (let i = 1; i <= 28; i++) {
    const day = `2026-02-${String(i).padStart(2, '0')}`
    const r = todayReading(day)
    if (r.kind === 'long' && r.p.titleQ) expect(todayReadingTitle(day)).not.toBe(r.p.title)
    else expect(todayReadingTitle(day)).toBe(r.p.title)
  }
})

it('学年をえらぶと、ホームの今日の課題の見出しに学年が出る', async () => {
  const { render, screen } = await import('@testing-library/react')
  const { TodayTasks } = await import('./TodayTasksView')
  saveGrade('j2')
  render(<TodayTasks today="2026-10-01" onGo={() => {}} />)
  expect(screen.getByText('中学2年')).toBeInTheDocument()
})

it('高校生なら今日の単語は高1のレベルの単語から、まだ覚えていない語を先に5語（その日は変わらない）', () => {
  saveGrade('hs')
  const first = todayWords('2026-12-01')
  expect(first).toHaveLength(5)
  expect(first.every((w) => courseWords('高1').includes(w))).toBe(true)
  // 覚えた語にしても、その日の5語は変わらない
  localStorage.setItem('eitan:progress', JSON.stringify(Object.fromEntries(first.map((w) => [w.id, { box: 5, due: '2099-01-01' }]))))
  expect(todayWords('2026-12-01').map((w) => w.id)).toEqual(first.map((w) => w.id))
  // 次の日は、覚えた語をさけてえらぶ
  expect(todayWords('2026-12-02').some((w) => first.includes(w))).toBe(false)
})

it('今日の5語の保存は、今日の単語のクリアの記録（eitan:today-words）をこわさない', async () => {
  const { saveTodayWordsDay, loadTodayWordsDay } = await import('./dailyread')
  saveGrade('hs')
  saveTodayWordsDay('2026-12-05')
  todayWords('2026-12-05')
  expect(loadTodayWordsDay()).toBe('2026-12-05')
})
