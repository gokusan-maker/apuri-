import { expect, it } from 'vitest'
import { addTierTicket, dropsLeft, ticketDrop, TICKET_DROPS_PER_DAY } from './tickets'

it('正解したときチケットはときどき出て（出ないときもある）、レア度がわかれる', () => {
  expect(ticketDrop(0.5, 0)).toBeNull()
  expect(ticketDrop(0.01, 0.01)).toBe('sr')
  expect(ticketDrop(0.01, 0.2)).toBe('rare')
  expect(ticketDrop(0.01, 0.9)).toBe('normal')
  expect(addTierTicket({ coins: 0, owned: [] }, 'rare')).toMatchObject({ rareTickets: 1 })
  expect(addTierTicket({ coins: 0, owned: [] }, 'sr')).toMatchObject({ srTickets: 1 })
  expect(dropsLeft({ day: '2026-11-01', count: 3 }, '2026-11-01')).toBe(0)
  expect(dropsLeft({ day: '2026-10-31', count: 3 }, '2026-11-01')).toBe(TICKET_DROPS_PER_DAY)
})
