import { describe, expect, it } from 'vitest'
import { searchWords } from './search'

const ws = [
  { en: 'apple', ja: 'りんご' },
  { en: 'pineapple', ja: 'パイナップル' },
  { en: 'appear', ja: '現れる' },
  { en: 'library', ja: '図書館' },
]

describe('単語の検索', () => {
  it('空なら全部', () => {
    expect(searchWords(ws, ' ')).toHaveLength(4)
  })

  it('英語は前方一致が先、その後に部分一致', () => {
    expect(searchWords(ws, 'App').map((w) => w.en)).toEqual(['apple', 'appear', 'pineapple'])
  })

  it('日本語は部分一致', () => {
    expect(searchWords(ws, '図書').map((w) => w.en)).toEqual(['library'])
  })
})
