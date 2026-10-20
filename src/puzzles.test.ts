import { describe, expect, it } from 'vitest'
import { abcQ, alphabetQ, calcQ, ingQ, INGS, thirdQ, THIRDS, COMPARES, compareQ, PASTS, pastQ, PLURALS, pluralQ, clockQ, colorQ, COLOR_SQUARES, countQ, GROUPS, oddQ, OPPOSITES, oppositeQ } from './puzzles'
import { WORDS } from './words'

describe('パズル', () => {
  it('ABC順：4つとも頭文字がちがい、正解がいちばん最初', () => {
    for (let i = 0; i < 50; i++) {
      const q = abcQ()
      expect(q.choices).toHaveLength(4)
      expect(new Set(q.choices.map((c) => c[0])).size).toBe(4)
      expect(q.choices[q.answer]).toBe([...q.choices].sort()[0])
    }
  })

  it('反対の意味：どのペアも単語帳にある語をふくみ、語は重ならない', () => {
    for (const [a, b] of OPPOSITES) expect(WORDS.some((w) => w.en === a || w.en === b), a).toBe(true)
    expect(new Set(OPPOSITES.flat()).size).toBe(OPPOSITES.length * 2)
    for (let i = 0; i < 50; i++) {
      const q = oppositeQ()
      expect(new Set(q.choices).size).toBe(4)
      const ask = q.prompt.match(/「(.+)」/)![1]
      expect(OPPOSITES.some(([a, b]) => (a === ask && b === q.choices[q.answer]) || (b === ask && a === q.choices[q.answer]))).toBe(true)
      expect(q.wordId).not.toBe('')
    }
  })

  it('仲間はずれ：どの単語も単語帳にあり、正解だけ別の仲間', () => {
    for (const g of GROUPS) for (const id of g.ids) expect(WORDS.some((w) => w.id === id), id).toBe(true)
    expect(new Set(GROUPS.flatMap((g) => g.ids)).size).toBe(GROUPS.flatMap((g) => g.ids).length)
    const groupOf = (en: string) => GROUPS.find((g) => g.ids.includes(WORDS.find((w) => w.en === en)!.id))!.name
    for (let i = 0; i < 50; i++) {
      const q = oddQ()
      const names = q.choices.map(groupOf)
      const odd = names[q.answer]
      expect(names.filter((n) => n === odd)).toHaveLength(1)
      expect(new Set(names.filter((_, k) => k !== q.answer)).size).toBe(1)
      for (const c of q.choices) expect(q.why).toContain(c)
    }
  })

  it('いくつある？：絵文字の数と正解が合い、選択肢は4つ', () => {
    for (let i = 0; i < 50; i++) {
      const q = countQ()
      const n = [...q.prompt.split('\n')[0]].length
      expect(['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'][n]).toBe(q.choices[q.answer])
      expect(new Set(q.choices).size).toBe(4)
      expect(WORDS.some((w) => w.id === q.wordId)).toBe(true)
    }
  })

  it('時計を読もう：絵文字と答えが合い、選択肢は4つでちがう', () => {
    const seq = (xs: number[]) => () => xs.shift() ?? 0
    const q = clockQ(seq([6 / 12, 0.1]))
    expect(q.prompt.startsWith('🕢')).toBe(true)
    expect(q.choices[q.answer]).toBe('seven thirty')
    const q2 = clockQ(seq([0, 0.9]))
    expect(q2.prompt.startsWith('🕐')).toBe(true)
    expect(q2.choices[q2.answer]).toBe("one o'clock")
    for (let i = 0; i < 50; i++) expect(new Set(clockQ().choices).size).toBe(4)
  })

  it('色の名前：どの色も単語帳にあり、正解が合う', () => {
    for (const [, en] of COLOR_SQUARES) expect(WORDS.some((w) => w.id === en)).toBe(true)
    for (let i = 0; i < 30; i++) {
      const q = colorQ()
      const sq = q.prompt.split('\n')[0]
      expect(COLOR_SQUARES.find(([s]) => s === sq)![1]).toBe(q.choices[q.answer])
    }
  })

  it('アルファベット：大文字・小文字・次の文字', () => {
    const seq = (xs: number[]) => () => xs.shift() ?? 0
    const a = alphabetQ(seq([0, 0]))
    expect(a.prompt).toBe('「A」の小文字は？')
    expect(a.choices[a.answer]).toBe('a')
    const b = alphabetQ(seq([1 / 25, 0.5]))
    expect(b.choices[b.answer]).toBe('B')
    const c = alphabetQ(seq([24 / 25, 0.9]))
    expect(c.prompt).toBe('「y」の次の文字は？')
    expect(c.choices[c.answer]).toBe('z')
    for (let i = 0; i < 30; i++) expect(new Set(alphabetQ().choices).size).toBe(4)
  })

  it('英語で計算：答えが合い、記録用の単語は単語帳にある', () => {
    const en = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty']
    for (let i = 0; i < 80; i++) {
      const q = calcQ()
      const [a, op, b] = q.prompt.split(' ')
      const ans = op === 'plus' ? en.indexOf(a) + en.indexOf(b) : en.indexOf(a) - en.indexOf(b)
      expect(q.choices[q.answer]).toBe(en[ans])
      expect(ans).toBeGreaterThanOrEqual(0)
      expect(new Set(q.choices).size).toBe(4)
      if (q.wordId) expect(WORDS.some((w) => w.id === q.wordId), q.wordId).toBe(true)
    }
  })

  it('複数形：正解が合い、選択肢は4つでちがう', () => {
    for (let i = 0; i < 80; i++) {
      const q = pluralQ()
      const one = q.prompt.match(/「(.+)」/)![1]
      expect(PLURALS.find(([a]) => a === one)![1]).toBe(q.choices[q.answer])
      expect(new Set(q.choices).size).toBe(4)
    }
  })

  it('過去形のつづり：正解が合い、選択肢は4つでちがう', () => {
    for (let i = 0; i < 80; i++) {
      const q = pastQ()
      const base = q.prompt.match(/「(.+)」/)![1]
      expect(PASTS.find(([a]) => a === base)![1]).toBe(q.choices[q.answer])
      expect(new Set(q.choices).size).toBe(4)
    }
  })

  it('比較級・最上級：正解が合い、選択肢は4つでちがう', () => {
    for (let i = 0; i < 80; i++) {
      const q = compareQ()
      const base = q.prompt.match(/「(.+)」/)![1]
      const row = COMPARES.find(([a]) => a === base)!
      expect(q.choices[q.answer]).toBe(q.prompt.includes('最上級') ? row[2] : row[1])
      expect(new Set(q.choices).size).toBe(4)
    }
  })

  it('3単現・ing形：正解が合い、選択肢は4つでちがう', () => {
    for (let i = 0; i < 100; i++) {
      for (const [make, table] of [[thirdQ, THIRDS], [ingQ, INGS]] as const) {
        const q = make()
        const base = q.prompt.match(/「(.+)」/)![1]
        expect(table.find(([a]) => a === base)![1]).toBe(q.choices[q.answer])
        expect(new Set(q.choices).size).toBe(4)
      }
    }
  })
})
