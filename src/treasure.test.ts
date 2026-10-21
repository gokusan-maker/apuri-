import { expect, it } from 'vitest'
import { openTreasure, TICKET_CHANCE, XP_CHANCE } from './treasure'

it('宝箱はコインが多め、ときどきおやつ、★3のときだけまれにチケット', () => {
  expect(openTreasure(3, 0)).toEqual({ kind: 'ticket', amount: 1, text: '🎟 ガチャチケット！' })
  expect(openTreasure(1, 0).kind).toBe('xp') // ★3でなければチケットは出ない
  expect(openTreasure(2, TICKET_CHANCE + 0.01)).toEqual({ kind: 'xp', amount: 20, text: '🍪 おやつ（XP+20）' })
  expect(openTreasure(3, TICKET_CHANCE + XP_CHANCE)).toEqual({ kind: 'coins', amount: 8, text: '🪙 コイン 8まい' })
  expect(openTreasure(1, 0.99).amount).toBe(4)
})

it('金の宝箱の鍵は保存できる', async () => {
  const { loadKeys, saveKeys } = await import('./treasure')
  localStorage.clear()
  expect(loadKeys()).toBe(0)
  saveKeys(4)
  expect(loadKeys()).toBe(4)
})
