import { beforeEach, describe, expect, it } from 'vitest'
import { addMany, addMyWord, exportText, loadMyWords, loadUseMy, parseBulk, removeMyWord, saveMyWords, saveUseMy, validate } from './myWords'

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

describe('まとめて追加', () => {
  it('1行に「英語,意味」。区切りはカンマ・タブ・全角カンマ。おかしな行は数える', () => {
    const r = parseBulk('sunflower,ひまわり\nice cream\tアイス\nsky，空\nnomeaning\n\n')
    expect(r.words).toEqual([
      { en: 'sunflower', ja: 'ひまわり' },
      { en: 'ice cream', ja: 'アイス' },
      { en: 'sky', ja: '空' },
    ])
    expect(r.errors).toBe(1)
  })

  it('同じ単語や英語でないものはとばす', () => {
    const r = addMany([], [
      { en: 'cat', ja: 'ねこ' },
      { en: 'Cat', ja: 'ネコ' },
      { en: 'ねこ', ja: 'x' },
    ], 1)
    expect(r.added).toBe(1)
    expect(r.skipped).toBe(2)
  })
})

it('書き出したテキストは、まとめて追加でそのまま読みこめる', () => {
  const list = addMany([], [{ en: 'sunflower', ja: 'ひまわり' }, { en: 'look up', ja: '調べる' }], 1).list
  const text = exportText(list)
  expect(text).toBe('sunflower,ひまわり\nlook up,調べる')
  expect(parseBulk(text).words).toEqual([{ en: 'sunflower', ja: 'ひまわり' }, { en: 'look up', ja: '調べる' }])
})
