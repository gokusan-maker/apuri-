import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import { GRAMMAR } from './grammar'
import { FLOOR_QS, gcFloorsFor, GC_LEVELS, grammarCastleFloors, loadGcLevel, topicOf } from './grammarcastle'
import { Grammar } from './GrammarView'

it('文法の城：同じ項目（不定詞など）を5問×3階で登り、1階目は解説から', () => {
  const floors = grammarCastleFloors(GRAMMAR)
  expect(floors[0].label).toBe('時制①　1/3')
  expect(floors[0].explain!.points.length).toBeGreaterThan(0)
  expect(floors[1].explain).toBeNull()
  for (const f of floors) expect(f.questions.length).toBeGreaterThanOrEqual(FLOOR_QS)
  // 同じまとまりの3階は同じ項目
  expect(new Set(floors.slice(0, 3).map((f) => f.topic)).size).toBe(1)
  expect(topicOf(GRAMMAR.find((u) => u.id === 'gerund')!)).toBe('動名詞')
})

it('城の1階：解説 → 5問 → 4問以上正解でクリアして「次の階へ」', () => {
  localStorage.clear()
  render(<Grammar />)
  const f = gcFloorsFor('中1')[0]
  const castle = screen.getByRole('region', { name: '中1の文法の森' })
  fireEvent.click(within(castle).getByRole('button', { name: new RegExp(`^1階：${f.label}`) }))
  expect(screen.getByText(new RegExp(f.explain!.title.replace(/[()（）]/g, '.')))).toBeInTheDocument()
  fireEvent.click(screen.getByText(/問題に挑戦/))
  for (const q of f.questions) {
    fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
    const next = screen.queryByText(/次の問題|次へ|結果を見る/)
    if (next) fireEvent.click(next)
  }
  expect(screen.getByRole('button', { name: `🏰 次の階へ ▶ ${gcFloorsFor('中1')[1].label}` })).toBeInTheDocument()
  expect(JSON.parse(localStorage.getItem('eitan:gcastle')!)).toContain(f.id)
  expect(screen.getByText('🎉 階クリア！')).toBeInTheDocument()
})

it('城の地図：学年と入試レベルの城。学年の城は学年の単元だけ、入試の城は1階目に解説', () => {
  localStorage.clear()
  expect(GC_LEVELS.map((l) => l.label)).toEqual(['中1', '中2', '中3', '高校', '共通テスト', '私立難関大', '私立医学部', '国公立大', '旧帝大', '国立医学部'])
  expect(loadGcLevel('j3')).toBe('中3')
  const ex = gcFloorsFor('exam-kyutei')
  expect(ex.length).toBe(4)
  expect(ex[0].explain).not.toBeNull()
  expect(new Set([...gcFloorsFor('中1'), ...gcFloorsFor('中2')].map((f) => f.id)).size).toBe(gcFloorsFor('中1').length + gcFloorsFor('中2').length)
  render(<Grammar castleLevel="exam-kyutei" />)
  expect(screen.getByRole('region', { name: '旧帝大の文法の森' })).toBeInTheDocument()
})
