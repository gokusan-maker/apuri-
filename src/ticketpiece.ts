// チケットのかけら：ボスをたおすたびに1こ。5こ集まるとガチャチケット1まい
const KEY = 'eitan:ticket-pieces'
export const PIECES_FOR_TICKET = 5

export function loadPieces(): number {
  try {
    const n = Number(localStorage.getItem(KEY) ?? 0)
    return Number.isInteger(n) && n >= 0 && n < PIECES_FOR_TICKET ? n : 0
  } catch {
    return 0
  }
}

export function savePieces(n: number): void {
  try {
    localStorage.setItem(KEY, String(n))
  } catch {
    // 保存できなくても続ける
  }
}

// 1こ足す。5こになったらチケットにかえて0にもどす
export const addPiece = (n: number) => (n + 1 >= PIECES_FOR_TICKET ? { pieces: 0, ticket: true } : { pieces: n + 1, ticket: false })
