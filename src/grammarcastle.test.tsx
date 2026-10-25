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

it('文法のレベル：単語・読解と同じ15レベル（中1〜高3・私学〜東大・TOEIC・TOEFL/IELTS・ネイティブ）', async () => {
  const { levelUnits } = await import('./grammarcastle')
  localStorage.clear()
  expect(GC_LEVELS.map((l) => l.label)).toEqual(['中1', '中2', '中3', '高1', '高2', '高3', '私学', '私学難関', '国公立', '旧帝大', '京大', '東大', 'TOEIC', 'TOEFL・IELTS', 'ネイティブ'])
  for (const l of GC_LEVELS) expect(gcFloorsFor(l.id).length, l.id).toBeGreaterThanOrEqual(3)
  expect(loadGcLevel('j3')).toBe('中3')
  // 高校の単元は高1・高2・高3に分かれ、重ならない
  const hs = ['高1', '高2', '高3'].flatMap((l) => levelUnits(l).map((u) => u.id))
  expect(new Set(hs).size).toBe(hs.length)
  expect(levelUnits('高3').some((u) => u.title.includes('仮定法'))).toBe(true)
  expect(levelUnits('高1').some((u) => u.title.includes('仮定法'))).toBe(false)
  // まえのレベル（高校・入試）は新しいレベルへ
  localStorage.setItem('eitan:grammar-castle', 'exam-kyutei')
  expect(loadGcLevel('')).toBe('旧帝大')
  render(<Grammar castleLevel="東大" />)
  expect(screen.getByRole('region', { name: '東大の文法の森' })).toBeInTheDocument()
})

it('文法の城の階をクリアしたら、その階の単元の「よくあるまちがい」を1つ見せる', async () => {
  const { floorMistake, gcFloorsFor } = await import('./grammarcastle')
  for (const lv of ['中1', '高2', '高3']) {
    const m = floorMistake(gcFloorsFor(lv)[0].questions)
    expect(m, lv).toBeDefined()
    expect(m!.wrong).not.toBe(m!.right)
  }
  expect(floorMistake([])).toBeUndefined()
})

it('入試・試験レベルの文法の城でも、階ごとにちがう「よくあるまちがい」を見せる', async () => {
  const { floorMistake, gcFloorsFor, GC_LEVELS } = await import('./grammarcastle')
  const { EXAM_MISTAKES } = await import('./grammarmistake')
  for (const lv of GC_LEVELS.filter((l) => l.unit)) {
    const fl = gcFloorsFor(lv.id)
    const a = floorMistake(fl[0].questions)
    const b = floorMistake(fl[1].questions)
    expect(a, lv.id).toBeDefined()
    expect(a!.wrong, lv.id).not.toBe(b!.wrong)
  }
  for (const list of Object.values(EXAM_MISTAKES)) for (const m of list) {
    expect(m.wrong).not.toBe(m.right)
    expect(m.why.length).toBeGreaterThan(5)
  }
})
