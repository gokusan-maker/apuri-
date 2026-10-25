import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, expect, it } from 'vitest'
import { Stages } from './StageView'

beforeEach(() => localStorage.clear())

it('大学入試の塔：1階だけ挑戦でき、上の階はまだ見えない', () => {
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="univ" />)
  expect(screen.getByLabelText('0 / 9 階クリア')).toBeInTheDocument()
  expect(screen.getByTitle('1階 キョーツーゲートン')).toBeInTheDocument()
  expect(document.querySelector('.univ-floors')!.textContent).not.toContain('？？？') // まだの階は名前を見せない
  expect(document.querySelectorAll('.univ-floors li')).toHaveLength(2) // 1階と、カギつきの2階だけ
  expect(screen.getByLabelText('2階（まだ）')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: '⚔ 挑戦' }))
  expect(screen.getByText('🏯 大学入試の塔 1階')).toBeInTheDocument()
  expect(screen.getByLabelText('ボスのHP')).toHaveAttribute('aria-valuemax', '150')
  expect(screen.getByText(/Only those who know their words may pass!/)).toBeInTheDocument()
})

it('倒した階の次の階が開く', () => {
  localStorage.setItem('eitan:univ', JSON.stringify({ gate: '2026-10-20' }))
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="univ" />)
  expect(screen.getByTitle('2階 キンシャチホコング')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '👑 もう一度' })).toBeInTheDocument()
})

it('入試の塔は入試レベル：文法は高校の単元だけ、長文は1〜3階が高校入試、4階からは難関大', async () => {
  const { univExam } = await import('./univ')
  const { gradeOf } = await import('./grammar')
  expect(univExam(0).units.every((u) => gradeOf(u.id) === '高校')).toBe(true)
  expect(univExam(0).passages.every((p) => /中3|高校入試/.test(p.level))).toBe(true)
  expect(univExam(5).passages.length).toBeGreaterThanOrEqual(2)
  expect(univExam(5).passages.every((p) => p.level.startsWith('難関大'))).toBe(true)
})
