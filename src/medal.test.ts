import { expect, it } from 'vitest'
import { medalFor } from './medal'

it('定着率でメダル', () => {
  expect([0, 49, 50, 79, 80, 99, 100].map(medalFor)).toEqual(['', '', '🥉', '🥉', '🥈', '🥈', '🥇'])
})
