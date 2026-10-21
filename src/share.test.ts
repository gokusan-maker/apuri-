import { describe, expect, it } from 'vitest'
import { makeShareImage, shareLines, shareText } from './share'

const s = { name: 'モチまる', level: 6, streak: 3, learned: 12, badges: 4 }

describe('記録の共有', () => {
  it('共有する文と画像の行', () => {
    expect(shareLines(s)).toEqual(['モチまる Lv.6', '🔥 連続 3日', '📚 定着 12語', '🏅 バッジ 4個'])
    expect(shareText(s)).toContain('イングリッシュモンスター')
    expect(shareText(s)).toContain('定着 12語')
  })

  it('canvas が使えない環境では null を返す', async () => {
    expect(await makeShareImage(s, null)).toBeNull()
  })
})
