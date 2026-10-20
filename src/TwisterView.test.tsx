import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { TWISTERS } from './twisters'
import { Twisters } from './TwisterView'

it('早口ことばを順に見られ、言えたら XP（同じものは1回だけ）', () => {
  const got: number[] = []
  render(<Twisters onAnswer={(_c, xp) => got.push(xp)} />)
  expect(screen.getByText(TWISTERS[0].en)).toBeInTheDocument()
  fireEvent.click(screen.getByText('🗣 まねして言えた！'))
  expect(screen.getByText('✅ 言えた！')).toBeDisabled()
  fireEvent.click(screen.getByText('次の早口ことば'))
  expect(screen.getByText(TWISTERS[1].en)).toBeInTheDocument()
  expect(got).toEqual([5])
})
