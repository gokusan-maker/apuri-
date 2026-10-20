import { beforeEach, describe, expect, it } from 'vitest'
import { addMyWord, loadMyWords, loadUseMy, removeMyWord, saveMyWords, saveUseMy, validate } from './myWords'

describe('マイ単語帳', () => {
  beforeEach(() => localStorage.clear())

  it('入力チェック', () => {
    expect(validate({ en: '', ja: 'x' }, [])).toBe('英語を入力してください')
    expect(validate({ en: 'ひまわり', ja: 'x' }, [])).toBe('英語はアルファベットで入力してください')
    expect(validate({ en: 'sunflower', ja: ' ' }, [])).toBe('意味を入力してください')
    expect(validate({ en: 'ice cream', ja: 'アイス' }, [])).toBeNull()
    const list = addMyWord([], { en: 'Sunflower', ja: 'ひまわり' }, 1)
    expect(validate({ en: 'sunflower', ja: 'ひまわり' }, list)).toBe('その単語はもう入っています')
  })

  it('追加・削除・保存・読み込み', () => {
    let list = addMyWord([], { en: ' sunflower ', ja: 'ひまわり', example: 'I like sunflowers.' }, 100)
    expect(list).toEqual([{ id: 'my:100', en: 'sunflower', ja: 'ひまわり', example: 'I like sunflowers.', exampleJa: '' }])
    saveMyWords(list)
    expect(loadMyWords()).toEqual(list)
    list = removeMyWord(list, 'my:100')
    expect(list).toEqual([])
    localStorage.setItem('eitan:my-words', '[{"id":"apple","en":"a","ja":"b"},{"id":"my:1","en":"cat","ja":"ねこ"}]')
    expect(loadMyWords()).toEqual([{ id: 'my:1', en: 'cat', ja: 'ねこ', example: '', exampleJa: '' }])
  })

  it('使う／使わないの保存', () => {
    expect(loadUseMy()).toBe(false)
    saveUseMy(true)
    expect(loadUseMy()).toBe(true)
  })
})
