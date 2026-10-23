import { beforeEach, describe, expect, it } from 'vitest'
import { GRAMMAR, loadGrammar, saveGrammar } from './grammar'

describe('文法', () => {
  beforeEach(() => localStorage.clear())

  it('46単元、各3問。空欄は1つ、正解が選択肢に含まれ、選択肢は重複しない', () => {
    expect(GRAMMAR).toHaveLength(208)
    expect(new Set(GRAMMAR.map((u) => u.id)).size).toBe(208)
    for (const u of GRAMMAR) {
      expect(u.questions, u.id).toHaveLength(3)
      expect(u.points.length).toBeGreaterThan(0)
      for (const q of u.questions) {
        expect(q.sentence.split('___'), q.sentence).toHaveLength(2)
        expect(q.choices[q.answer], q.sentence).toBeDefined()
        expect(new Set(q.choices).size).toBe(q.choices.length)
        expect(q.why).not.toBe('')
      }
    }
  })

  it('記録の保存と読み込み', () => {
    saveGrammar({ be: 3 })
    expect(loadGrammar()).toEqual({ be: 3 })
  })
})

it('全問正解の単元がスタンプになる', async () => {
  const { GRAMMAR, grammarStamps } = await import('./grammar')
  const r = Object.fromEntries(GRAMMAR.slice(0, 3).map((u) => [u.id, u.questions.length]))
  expect(grammarStamps({ ...r, [GRAMMAR[3].id]: 1 })).toBe(3)
  expect(grammarStamps({ 'borrow-lend': 3 })).toBe(0) // まちがえやすい単語は数えない
})

it('まとめテストのランクとベスト記録', async () => {
  const { mixRank, loadMixBest, saveMixBest } = await import('./grammar')
  expect([mixRank(10, 10), mixRank(8, 10), mixRank(7, 10)]).toEqual(['S', 'A', 'B'])
  localStorage.clear()
  saveMixBest({ 文法ミニ解説: 9 })
  expect(loadMixBest()).toEqual({ 文法ミニ解説: 9 })
})

it('全問正解していない単元が苦手な単元', async () => {
  const { GRAMMAR, weakUnits } = await import('./grammar')
  const r = { [GRAMMAR[0].id]: 1, [GRAMMAR[1].id]: GRAMMAR[1].questions.length }
  expect(weakUnits(r).map((u) => u.id)).toEqual([GRAMMAR[0].id])
  expect(weakUnits({})).toEqual([])
})

it('今日の文法は日付で決まる', async () => {
  const { dailyGrammar, GRAMMAR } = await import('./grammar')
  expect(dailyGrammar('2026-10-21')).toBe(dailyGrammar('2026-10-21'))
  const ids = new Set(['2026-10-20', '2026-10-21', '2026-10-22', '2026-10-23', '2026-10-24'].map((d) => dailyGrammar(d).id))
  expect(ids.size).toBeGreaterThan(1)
  expect(GRAMMAR).toContain(dailyGrammar('2026-10-21'))
})

it('すべての文法単元に学年の目安がある', async () => {
  const { GRAMMAR, gradeOf } = await import('./grammar')
  const { gradeListed } = await import('./grammar')
  for (const u of GRAMMAR) expect(gradeListed(u.id), u.id).toBe(true)
  expect(gradeOf('be')).toBe('中1')
  expect(gradeOf('past-perfect')).toBe('高校')
  const counts = new Map<string, number>()
  for (const u of GRAMMAR) counts.set(gradeOf(u.id), (counts.get(gradeOf(u.id)) ?? 0) + 1)
  expect(counts.size).toBe(4)
})

it('連続正解はまちがえると0にもどり、ベストは残る', async () => {
  const { loadGrammarStreak, saveGrammarStreak, streakAfter } = await import('./grammar')
  localStorage.clear()
  let s = loadGrammarStreak()
  expect(s).toEqual({ now: 0, best: 0 })
  s = streakAfter(streakAfter(s, true), true)
  expect(s).toEqual({ now: 2, best: 2 })
  s = streakAfter(s, false)
  expect(s).toEqual({ now: 0, best: 2 })
  saveGrammarStreak(s)
  expect(loadGrammarStreak()).toEqual({ now: 0, best: 2 })
  localStorage.setItem('eitan:grammar-streak', '{"now":4,"best":1}')
  expect(loadGrammarStreak()).toEqual({ now: 4, best: 4 })
})

it('文法クイズの結果をシェア用の文にできる', async () => {
  const { grammarShareText } = await import('./grammar')
  expect(grammarShareText('過去形', 3, 3)).toBe('イングリッシュモンスターで文法「過去形」に挑戦！ 3 / 3 問正解 👑 全問正解！')
  expect(grammarShareText('過去形', 2, 3)).toContain('👍')
  expect(grammarShareText('過去形', 0, 3)).toContain('もう一度がんばる')
})

it('お気に入りの単元を先に並べられる', async () => {
  const { favFirst, loadGrammarFav, saveGrammarFav, toggleGrammarFav } = await import('./grammar')
  localStorage.clear()
  expect(loadGrammarFav()).toEqual([])
  let f = toggleGrammarFav([], 'b')
  f = toggleGrammarFav(f, 'c')
  expect(f).toEqual(['b', 'c'])
  expect(toggleGrammarFav(f, 'b')).toEqual(['c'])
  saveGrammarFav(f)
  expect(loadGrammarFav()).toEqual(['b', 'c'])
  const us = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }]
  expect(favFirst(us, ['c']).map((u) => u.id)).toEqual(['c', 'a', 'b', 'd'])
  localStorage.setItem('eitan:grammar-fav', '{"x":1}')
  expect(loadGrammarFav()).toEqual([])
})

it('要点カードの覚えた記録をつけ外しできる', async () => {
  const { loadCardsKnown, markKnown, saveCardsKnown } = await import('./grammar')
  localStorage.clear()
  expect(loadCardsKnown()).toEqual([])
  expect(markKnown(['a'], 'a', true)).toEqual(['a'])
  expect(markKnown(['a'], 'b', true)).toEqual(['a', 'b'])
  expect(markKnown(['a', 'b'], 'a', false)).toEqual(['b'])
  saveCardsKnown(['b'])
  expect(loadCardsKnown()).toEqual(['b'])
})

it('まちがいノートはまちがえた問題を先頭に入れ、正解すると消す', async () => {
  const { loadNotebook, noteAfter, notebookQuestions, saveNotebook, NOTE_MAX } = await import('./grammar')
  localStorage.clear()
  const [a, b] = GRAMMAR[0].questions.map((q) => q.sentence)
  let n = noteAfter([], a, false)
  n = noteAfter(n, b, false)
  n = noteAfter(n, a, false)
  expect(n).toEqual([a, b])
  n = noteAfter(n, b, true)
  expect(n).toEqual([a])
  saveNotebook([...n, 'なくなった問題'])
  expect(notebookQuestions(loadNotebook())).toEqual([GRAMMAR[0].questions[0]])
  let big: string[] = []
  for (let i = 0; i < NOTE_MAX + 5; i++) big = noteAfter(big, `q${i}`, false)
  expect(big).toHaveLength(NOTE_MAX)
})

it('全問正解の回数で単元の★がふえる', async () => {
  const { loadClears, saveClears, unitStars } = await import('./grammar')
  expect([0, 1, 2, 3, 4, 5, 9].map(unitStars)).toEqual([0, 1, 1, 2, 2, 3, 3])
  localStorage.clear()
  expect(loadClears()).toEqual({})
  saveClears({ be: 2 })
  expect(loadClears()).toEqual({ be: 2 })
})

it('キーワードで単元をさがせる', async () => {
  const { searchUnits } = await import('./grammar')
  expect(searchUnits(GRAMMAR, '')).toBe(GRAMMAR)
  const r = searchUnits(GRAMMAR, '関係代名詞')
  expect(r.length).toBeGreaterThan(2)
  expect(r.every((u) => [u.title, ...u.points].some((t) => t.includes('関係代名詞')) || u.examples.some((e) => e.en.includes('関係代名詞')))).toBe(true)
  expect(searchUnits(GRAMMAR, 'WHOSE').some((u) => u.id === 'whose')).toBe(true)
  expect(searchUnits(GRAMMAR, 'zzzz')).toEqual([])
})

it('おすすめ単元は★が少なく、まだ全問正解していない単元から', async () => {
  const { recommendUnits } = await import('./grammar')
  const us = GRAMMAR.slice(0, 5)
  const clears = { [us[0].id]: 5, [us[1].id]: 1 }
  const record = { [us[2].id]: us[2].questions.length }
  const r = recommendUnits(us, clears, record).map((u) => u.id)
  expect(r).toEqual([us[3].id, us[4].id, us[2].id])
})

it('苦手ランキングはまちがいノートに多い単元から', async () => {
  const { weakRanking } = await import('./grammar')
  const a = GRAMMAR[0].questions.map((q) => q.sentence)
  const b = GRAMMAR[1].questions.map((q) => q.sentence)
  const r = weakRanking([b[0], a[0], a[1], 'なし'])
  expect(r.map((x) => [x.unit.id, x.count])).toEqual([[GRAMMAR[0].id, 2], [GRAMMAR[1].id, 1]])
})

it('ディクテーションの答えあわせは記号や大文字を気にしない', async () => {
  const { sameSentence } = await import('./grammar')
  expect(sameSentence("i don't like it", "I don't like it.")).toBe(true)
  expect(sameSentence('I don’t  like it!', "I don't like it.")).toBe(true)
  expect(sameSentence('I like it', "I don't like it.")).toBe(false)
})

it('文法を3日続けるとボーナス、1日あくと1から', async () => {
  const { studyGrammarDay } = await import('./grammar')
  let d = { last: '', streak: 0 }
  let r = studyGrammarDay(d, '2026-10-30')
  expect(r.days.streak).toBe(1)
  r = studyGrammarDay(r.days, '2026-10-31')
  r = studyGrammarDay(r.days, '2026-11-01') // 月をまたいでも続く
  expect(r).toEqual({ days: { last: '2026-11-01', streak: 3 }, bonus: true })
  expect(studyGrammarDay(r.days, '2026-11-01').bonus).toBe(false)
  d = studyGrammarDay(r.days, '2026-11-03').days
  expect(d.streak).toBe(1)
})

it('きのうまちがえた問題を3問まで出す', async () => {
  const { markWrongDay, yesterdayQuestions, yesterdayOf } = await import('./grammar')
  localStorage.clear()
  expect(yesterdayOf('2026-11-01')).toBe('2026-10-31')
  const qs = GRAMMAR.slice(0, 2).flatMap((u) => u.questions)
  let d: Record<string, string> = {}
  for (const q of qs.slice(0, 4)) d = markWrongDay(q.sentence, '2026-10-19')
  d = markWrongDay(qs[5].sentence, '2026-10-18')
  const r = yesterdayQuestions(d, '2026-10-20')
  expect(r).toHaveLength(3)
  expect(r.every((q) => qs.slice(0, 4).includes(q))).toBe(true)
})

it('全問正解した単元の数で段位が決まる', async () => {
  const { danOf } = await import('./grammar')
  expect(danOf(0)).toEqual({ name: '見習い', next: 10 })
  expect(danOf(10)).toEqual({ name: '初段', next: 20 })
  expect(danOf(65)).toEqual({ name: '三段', next: 25 })
  expect(danOf(95)).toEqual({ name: '達人', next: null })
})
