import { describe, expect, it } from 'vitest'
import { dequeue, enqueue } from './toastQueue'

describe('toastQueue', () => {
  it('順番に並べて先頭から出す', () => {
    let q = enqueue<string>([], ['a'])
    q = enqueue(q, ['b', 'c'])
    expect(q[0]).toEqual(['a'])
    q = dequeue(q)
    expect(q[0]).toEqual(['b', 'c'])
    expect(dequeue(q)).toEqual([])
  })
  it('空のお知らせは足さない', () => {
    expect(enqueue([], [])).toEqual([])
  })
})
