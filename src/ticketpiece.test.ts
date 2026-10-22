import { expect, it } from 'vitest'
import { addPiece, loadPieces, PIECES_FOR_TICKET, savePieces } from './ticketpiece'

it('チケットのかけらは5こでチケット1まいにかわる', () => {
  let n = 0
  for (let i = 1; i < PIECES_FOR_TICKET; i++) {
    const r = addPiece(n)
    expect(r).toEqual({ pieces: i, ticket: false })
    n = r.pieces
  }
  expect(addPiece(n)).toEqual({ pieces: 0, ticket: true })
  localStorage.clear()
  expect(loadPieces()).toBe(0)
  savePieces(3)
  expect(loadPieces()).toBe(3)
  localStorage.setItem('eitan:ticket-pieces', 'x')
  expect(loadPieces()).toBe(0)
})
