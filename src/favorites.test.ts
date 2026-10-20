import { beforeEach, describe, expect, it } from 'vitest'
import { loadFavorites, saveFavorites, toggleFavorite } from './favorites'

describe('お気に入り', () => {
  beforeEach(() => localStorage.clear())

  it('つけたり外したりできる', () => {
    expect(toggleFavorite([], 'a')).toEqual(['a'])
    expect(toggleFavorite(['a', 'b'], 'a')).toEqual(['b'])
  })

  it('保存と読み込み', () => {
    saveFavorites(['apple'])
    expect(loadFavorites()).toEqual(['apple'])
    localStorage.setItem('eitan:favorites', '{"x":1}')
    expect(loadFavorites()).toEqual([])
  })
})
