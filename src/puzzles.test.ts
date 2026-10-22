import { describe, expect, it } from 'vitest'
import { wasWereQ, ordinalQ, muchManyQ, pronounQ, modalQ, placePrepQ, HOMOPHONES, homophoneQ, abcQ, alphabetQ, articleQ, beQ, grammarMixQ, negQ, RIDDLES, riddleQ, timePrepQ, whQ, calcQ, ingQ, INGS, thirdQ, THIRDS, COMPARES, compareQ, PASTS, pastQ, PLURALS, pluralQ, clockQ, colorQ, COLOR_SQUARES, countQ, GROUPS, oddQ, OPPOSITES, oppositeQ } from './puzzles'
import { ordinal } from './numbers'
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

  it('be動詞・a と an：正解が合う', () => {
    for (let i = 0; i < 50; i++) {
      const q = beQ()
      const subj = q.prompt.split(' ___ ')[0]
      const want = subj === 'I' ? 'am' : /^(You|We|They)$|and | books$| friends$/.test(subj) ? 'are' : 'is'
      expect(q.choices[q.answer]).toBe(want)
      const a = articleQ()
      expect(['a', 'an']).toContain(a.choices[a.answer])
    }
    const seq = (xs: number[]) => () => xs.shift() ?? 0
    expect(articleQ(seq([0])).choices[articleQ(seq([0])).answer]).toBe('an')
  })

  it('時の前置詞・疑問詞：選択肢がそろい、正解がある', () => {
    for (let i = 0; i < 50; i++) {
      const t = timePrepQ()
      expect(t.choices).toEqual(['in', 'on', 'at'])
      const w = whQ()
      expect(new Set(w.choices).size).toBe(4)
      expect(w.answer).toBeGreaterThanOrEqual(0)
    }
    const seq = (xs: number[]) => () => xs.shift() ?? 0
    const q = timePrepQ(seq([0]))
    expect(q.choices[q.answer]).toBe('on')
  })

  it('文法ミックス：いろいろな種類が出る', () => {
    const prompts = new Set(Array.from({ length: 200 }, () => grammarMixQ().prompt.slice(0, 3)))
    expect(prompts.size).toBeGreaterThan(5)
  })

  it('なぞなぞ：答えが合い、選択肢は4つでちがう', () => {
    for (let i = 0; i < 40; i++) {
      const q = riddleQ()
      expect(RIDDLES.filter((r) => r.q === q.prompt).map((r) => r.a)).toContain(q.choices[q.answer])
      expect(new Set(q.choices).size).toBe(4)
    }
  })

  it('否定文：時や主語に合う答え', () => {
    for (let i = 0; i < 40; i++) {
      const q = negQ()
      const a = q.choices[q.answer]
      if (/yesterday|last /.test(q.prompt)) expect(a).toBe("didn't")
      else if (/^(I|You|We|They|Tom and Ken) /.test(q.prompt)) expect(a).toBe("don't")
      else expect(a).toBe("doesn't")
    }
  })
})

it('同じ発音の単語：答えは組になった相手で、選択肢は重ならない', () => {
  const all = HOMOPHONES.flatMap((h) => [h[0], h[2]])
  expect(new Set(all).size).toBe(all.length)
  for (let i = 0; i < 40; i++) {
    const q = homophoneQ()
    const ask = q.prompt.match(/「(\w+)（/)![1]
    const pair = HOMOPHONES.find((h) => h[0] === ask || h[2] === ask)!
    expect(q.choices[q.answer]).toBe(pair[0] === ask ? pair[2] : pair[0])
    expect(new Set(q.choices).size).toBe(4)
  }
})

it('場所の前置詞：4つの選択肢から理由に合う答え', () => {
  for (let i = 0; i < 30; i++) {
    const q = placePrepQ()
    expect(q.choices).toEqual(['in', 'on', 'under', 'by'])
    expect(q.why).toContain(q.choices[q.answer])
    expect(q.prompt).toContain('___')
  }
})

it('助動詞：ヒントの意味に合う can・must・should', () => {
  for (let i = 0; i < 30; i++) {
    const q = modalQ()
    const a = q.choices[q.answer].toLowerCase()
    if (/できる|ひけ|話せ|飛べ/.test(q.prompt)) expect(a).toBe('can')
    else if (/なければ/.test(q.prompt)) expect(a).toBe('must')
    else expect(a).toBe('should')
  }
})

it('代名詞：答えが選択肢にあり、理由に答えが書いてある', () => {
  for (let i = 0; i < 30; i++) {
    const q = pronounQ()
    expect(q.answer).toBeGreaterThanOrEqual(0)
    expect(q.why).toContain(q.choices[q.answer])
  }
})

it('much と many：複数形の名詞には many', () => {
  for (let i = 0; i < 30; i++) {
    const q = muchManyQ()
    expect(q.choices[q.answer]).toBe(q.why.includes('複数形') ? 'many' : 'much')
  }
})

it('序数：数字に合う〜番目の英語', () => {
  for (let i = 0; i < 30; i++) {
    const q = ordinalQ()
    const n = Number(q.prompt.match(/「(\d+)番目」/)![1])
    expect(q.choices[q.answer]).toBe(ordinal(n))
    expect(new Set(q.choices).size).toBe(4)
  }
})

it('was と were：主語に合う答え', () => {
  for (let i = 0; i < 30; i++) {
    const q = wasWereQ()
    expect(q.why).toContain(q.choices[q.answer])
    expect(q.choices[q.answer]).toBe(/複数|You|2人/.test(q.why) ? 'were' : 'was')
  }
})

it('英語なぞなぞは20問以上あり、訳・答えの意味・英語のしかけの解説がつく', () => {
  expect(RIDDLES.length).toBeGreaterThanOrEqual(20)
  expect(new Set(RIDDLES.map((r) => r.q)).size).toBe(RIDDLES.length)
  for (const r of RIDDLES) expect(r.ja && r.aja && r.trick).toBeTruthy()
  const q = riddleQ(() => 0)
  expect(q.explain).toHaveLength(3)
  expect(q.explain![2]).toMatch(/^【英語のしかけ】/)
})
