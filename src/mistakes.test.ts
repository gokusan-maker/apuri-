import { beforeEach, describe, expect, it } from 'vitest'
import { makeQuiz } from './quiz'
import { addMistake, easeMistake, loadMistakes, saveMistakes, weakWords } from './mistakes'
import { WORDS } from './words'

describe('苦手単語', () => {
  beforeEach(() => localStorage.clear())

  it('間違えた回数が多い順、同数は元の順', () => {
    let m = {}
    m = addMistake(m, 'c')
    m = addMistake(m, 'b')
    m = addMistake(m, 'c')
    m = addMistake(m, 'a')
    const words = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }]
    expect(weakWords(words, m).map((w) => w.id)).toEqual(['c', 'a', 'b'])
  })

  it('保存と読み込み。おかしな値は捨てる', () => {
    saveMistakes({ apple: 2 })
    expect(loadMistakes()).toEqual({ apple: 2 })
    localStorage.setItem('eitan:mistakes', '{"apple":"x","early":1}')
    expect(loadMistakes()).toEqual({ early: 1 })
    localStorage.setItem('eitan:mistakes', '[1]')
    expect(loadMistakes()).toEqual({})
  })

  it('苦手だけのクイズは苦手から出題し、選択肢は4つそろう', () => {
    const targets = WORDS.slice(0, 2)
    const quiz = makeQuiz(WORDS, (w) => w.ja, 10, Math.random, targets)
    expect(quiz).toHaveLength(2)
    for (const q of quiz) {
      expect(targets).toContain(q.word)
      expect(q.choices).toHaveLength(4)
    }
  })
})

it('「覚えた」で苦手の回数が減り、0で外れる', () => {
  expect(easeMistake({ a: 2 }, 'a')).toEqual({ a: 1 })
  expect(easeMistake({ a: 1, b: 3 }, 'a')).toEqual({ b: 3 })
  expect(easeMistake({}, 'a')).toEqual({})
})
