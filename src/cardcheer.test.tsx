import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { CARD_BONUS_COINS, CARD_CHEERS, cardCheer, isCardBonus } from './cardcheer'

vi.mock('./speech', () => ({ speak: vi.fn() }))
import { speak } from './speech'
import { CardCheer } from './CardCheerView'

describe('cardCheer', () => {
  it('10枚ごとにだけひとことを返す', () => {
    expect(cardCheer(0)).toBeNull()
    expect(cardCheer(9)).toBeNull()
    expect(cardCheer(10)).toEqual(CARD_CHEERS[0])
    expect(cardCheer(20)).toEqual(CARD_CHEERS[1])
    expect(cardCheer(60)).toEqual(CARD_CHEERS[0])
  })
  it('表示しても勝手に音は出さず、🔊で読む', () => {
    render(<CardCheer done={10} />)
    expect(screen.getByRole('status')).toHaveTextContent(CARD_CHEERS[0].ja)
    expect(speak).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'モチのひとことを聞く' }))
    expect(speak).toHaveBeenCalledWith(CARD_CHEERS[0].en)
  })
  it('10の倍数でなければ何も出さない', () => {
    const { container } = render(<CardCheer done={3} />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('50枚ごとのごほうび', () => {
  it('50の倍数のときだけコインのごほうび', () => {
    expect(isCardBonus(0)).toBe(false)
    expect(isCardBonus(10)).toBe(false)
    expect(isCardBonus(50)).toBe(true)
    expect(isCardBonus(100)).toBe(true)
  })
  it('50枚目のひとことの横にごほうびを出す（10枚目には出さない）', () => {
    const { unmount } = render(<CardCheer done={50} />)
    expect(screen.getByRole('status')).toHaveTextContent(`+${CARD_BONUS_COINS}コインのごほうび`)
    unmount()
    render(<CardCheer done={10} />)
    expect(screen.getByRole('status')).not.toHaveTextContent('ごほうび')
  })
})
