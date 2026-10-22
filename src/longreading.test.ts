import { beforeEach, expect, it } from 'vitest'
import { LONG_PASSAGES, loadLongRecord, saveLongRecord, scoreLong } from './longreading'

beforeEach(() => localStorage.clear())

it('長文は3本以上で、空所が本文にあり、選択肢は4つで正解がその中にある', () => {
  expect(LONG_PASSAGES.length).toBeGreaterThanOrEqual(73)
  expect(new Set(LONG_PASSAGES.map((p) => p.id)).size).toBe(LONG_PASSAGES.length)
  for (const p of LONG_PASSAGES) {
    const text = p.paragraphs.join(' ')
    const words = text.split(/\s+/).length
    expect(words, p.id).toBeGreaterThanOrEqual(120)
    expect(p.ja).toHaveLength(p.paragraphs.length)
    for (const b of p.blanks) {
      expect(text.split(`( ${b.id} )`), `${p.id} ${b.id}`).toHaveLength(2)
      expect(b.choices).toHaveLength(4)
      expect(new Set(b.choices).size).toBe(4)
      expect(b.choices[b.answer]).toBeDefined()
    }
    expect(p.tf.length).toBeGreaterThanOrEqual(4)
    expect(p.tf.some((t) => t.answer) && p.tf.some((t) => !t.answer)).toBe(true)
    if (p.pick2) {
      expect(p.pick2.statements).toHaveLength(6)
      expect(new Set(p.pick2.answers).size).toBe(2)
    }
  }
  expect(LONG_PASSAGES.filter((p) => p.pick2).length).toBeGreaterThanOrEqual(2)
})

it('採点と最高点の保存', () => {
  const p = LONG_PASSAGES[0]
  const allRight = Object.fromEntries(p.blanks.map((b) => [b.id, b.answer]))
  const tfRight = Object.fromEntries(p.tf.map((t, i) => [i, t.answer]))
  const qaRight = Object.fromEntries(p.qa!.map((x, i) => [i, x.answer]))
  expect(scoreLong(p, allRight, tfRight, p.pick2!.answers, { qa: qaRight })).toEqual({ score: 14, total: 14 })
  expect(scoreLong(p, allRight, tfRight, [p.pick2!.answers[0], 5]).score).toBe(11) // 英問英答は未回答
  expect(scoreLong(p, {}, {}).score).toBe(0)
  saveLongRecord({ [p.id]: 8 })
  expect(loadLongRecord()).toEqual({ [p.id]: 8 })
})

it('下線部の語句は本文にあり、並べかえの語は正解の文と同じ語でできている', () => {
  const withExtra = LONG_PASSAGES.filter((p) => p.underline || p.order)
  expect(withExtra.length).toBeGreaterThanOrEqual(2)
  for (const p of withExtra) {
    if (p.underline) {
      expect(p.paragraphs.join(' '), p.id).toContain(p.underline.phrase)
      expect(p.underline.choices).toHaveLength(4)
    }
    if (p.order) expect([...p.order.words].sort().join(' ')).toBe(p.order.answer.split(' ').sort().join(' '))
  }
  const p = LONG_PASSAGES.find((x) => x.id === 'no-phone-trip')!
  expect(scoreLong(p, {}, {}, [], { underline: p.underline!.answer, order: p.order!.answer }).score).toBe(2)
})

it('まちがえた問題の根拠の段落がわかる', async () => {
  const { evidenceParas } = await import('./longreading')
  const p = LONG_PASSAGES.find((x) => x.id === 'library-cat')!
  expect(evidenceParas(p, ['A', 'D'], [])).toEqual([0, 1])
  expect(evidenceParas(p, [], [0])).toEqual([0]) // 「第1段落に…」
  expect(evidenceParas(p, [], [])).toEqual([])
  const q = LONG_PASSAGES.find((x) => x.id === 'no-phone-trip')!
  expect(evidenceParas(q, [], [], true)).toEqual([3])
})

it('会話文の [ n ] は本文にあり、選択肢は4つ', () => {
  const ds = LONG_PASSAGES.filter((p) => p.sentences)
  expect(ds.length).toBeGreaterThanOrEqual(1)
  for (const p of ds) {
    const text = p.paragraphs.join(' ')
    for (const sb of p.sentences!) {
      expect(text.split(`[ ${sb.id} ]`)).toHaveLength(2)
      expect(sb.choices).toHaveLength(4)
    }
    const right = Object.fromEntries(p.sentences!.map((x) => [x.id, x.answer]))
    expect(scoreLong(p, {}, {}, [], { sentences: right }).score).toBe(p.sentences!.length)
  }
})

it('目安時間は語数と設問数で決まり、時間は分と秒で表示', async () => {
  const { targetMinutes, formatTime } = await import('./longreading')
  for (const p of LONG_PASSAGES) {
    expect(targetMinutes(p), p.id).toBeGreaterThanOrEqual(3)
    expect(targetMinutes(p), p.id).toBeLessThanOrEqual(15)
  }
  expect(formatTime(125)).toBe('2分05秒')
})

it('英問英答は選択肢4つで、3本以上にある', () => {
  const qs = LONG_PASSAGES.filter((p) => p.qa)
  expect(qs.length).toBeGreaterThanOrEqual(3)
  for (const p of qs) for (const x of p.qa!) expect(x.choices).toHaveLength(4)
})

it('設問タイプ別の正答率を集計する', async () => {
  const { typeResults, mergeTypes, loadTypeStats, saveTypeStats } = await import('./longreading')
  const p = LONG_PASSAGES.find((x) => x.id === 'library-cat')!
  const r = typeResults(p, { blanks: { A: p.blanks[0].answer }, tf: {}, picks: p.pick2!.answers, qa: {} })
  expect(r.blank).toEqual([1, 5])
  expect(r.pick2).toEqual([2, 2])
  expect(r.qa).toEqual([0, 2])
  const m = mergeTypes(r, r)
  expect(m.blank).toEqual([2, 10])
  localStorage.clear()
  saveTypeStats(m)
  expect(loadTypeStats()).toEqual(m)
})

it('指示語の語句は本文にあり、正解すると1点', () => {
  const rs = LONG_PASSAGES.filter((p) => p.refer)
  expect(rs.length).toBeGreaterThanOrEqual(3)
  for (const p of rs) {
    const text = p.paragraphs.join(' ')
    expect(text, p.id).toContain(p.refer!.phrase)
    expect(p.refer!.phrase).toContain(p.refer!.word)
    expect(scoreLong(p, {}, {}, [], { refer: p.refer!.answer }).score).toBe(1)
  }
})

it('段落の要旨の問題は、本文にある段落を指している', () => {
  const gs = LONG_PASSAGES.filter((p) => p.gist)
  expect(gs.length).toBeGreaterThanOrEqual(2)
  for (const p of gs) for (const g of p.gist!) {
    expect(g.para).toBeLessThan(p.paragraphs.length)
    expect(g.choices).toHaveLength(4)
  }
  const p = gs[0]
  expect(scoreLong(p, {}, {}, [], { gist: Object.fromEntries(p.gist!.map((g, i) => [i, g.answer])) }).score).toBe(p.gist!.length)
})

it('タイトル選択の問題がある長文は、一覧でタイトルをかくす', async () => {
  const { shownTitle } = await import('./longreading')
  const ts = LONG_PASSAGES.filter((p) => p.titleQ)
  expect(ts.length).toBeGreaterThanOrEqual(3)
  for (const p of ts) {
    expect(p.titleQ!.choices[p.titleQ!.answer]).toBe(p.title)
    expect(shownTitle(p, 0)).not.toContain(p.title)
  }
})

it('英文の完成の問題は選択肢4つで、3本以上にある', () => {
  const cs = LONG_PASSAGES.filter((p) => p.complete)
  expect(cs.length).toBeGreaterThanOrEqual(3)
  for (const p of cs) {
    for (const x of p.complete!) expect(x.choices).toHaveLength(4)
    expect(scoreLong(p, {}, {}, [], { complete: Object.fromEntries(p.complete!.map((x, i) => [i, x.answer])) }).score).toBe(p.complete!.length)
  }
})

it('苦手な設問タイプがある長文をおすすめする', async () => {
  const { recommendLong, weakTypes, hasType } = await import('./longreading')
  expect(weakTypes({ tf: [1, 5], blank: [9, 10] })).toEqual(['tf'])
  const r = recommendLong({ refer: [0, 2] }, {})!
  expect(hasType(r.passage, 'refer')).toBe(true)
  expect(r.type).toBe('refer')
  expect(recommendLong({ blank: [10, 10] }, {})).toBeNull()
})

it('長文の語数を数え、読んだ語数の合計をためられる', async () => {
  const { addReadWords, loadReadWords, wordCount } = await import('./longreading')
  localStorage.clear()
  const p = { ...LONG_PASSAGES[0], paragraphs: ['I like ( A ) cats.', 'They are cute!'] }
  expect(wordCount(p)).toBe(6)
  expect(loadReadWords()).toBe(0)
  expect(addReadWords(120)).toBe(120)
  expect(addReadWords(80)).toBe(200)
  expect(loadReadWords()).toBe(200)
  for (const x of LONG_PASSAGES) expect(wordCount(x)).toBeGreaterThan(0)
})

it('長文の最高点から★1〜3をつける', async () => {
  const { longStars } = await import('./longreading')
  expect(longStars(undefined, 10)).toBe(0)
  expect(longStars(10, 10)).toBe(3)
  expect(longStars(7, 10)).toBe(2)
  expect(longStars(6, 10)).toBe(1)
  expect(longStars(0, 10)).toBe(1)
})

it('ランダム挑戦はまだ解いていない長文からえらぶ', async () => {
  const { randomLong } = await import('./longreading')
  const done = Object.fromEntries(LONG_PASSAGES.slice(1).map((x) => [x.id, 1]))
  expect(randomLong(done, 0.99).id).toBe(LONG_PASSAGES[0].id)
  const all = Object.fromEntries(LONG_PASSAGES.map((x) => [x.id, 1]))
  expect(randomLong(all, 0.999).id).toBe(LONG_PASSAGES[LONG_PASSAGES.length - 1].id)
  expect(randomLong({}, 0).id).toBe(LONG_PASSAGES[0].id)
})

it('長文の答えかけを保存して読みもどせる', async () => {
  const { loadLongDraft, saveLongDraft } = await import('./longreading')
  localStorage.clear()
  expect(loadLongDraft('x')).toBeNull()
  const empty = { blanks: {}, tf: {}, picks: [], order: [], sents: {}, qa: {}, gist: {}, comp: {} }
  saveLongDraft('x', { ...empty, blanks: { A: 2 }, tf: { 0: true }, under: 1 })
  expect(loadLongDraft('x')).toEqual({ ...empty, blanks: { A: 2 }, tf: { 0: true }, under: 1, refer: undefined, title: undefined, insert: undefined, summary: {}, vocab: {}, seq: [] })
  saveLongDraft('x', empty)
  expect(loadLongDraft('x')).toBeNull()
  saveLongDraft('y', { ...empty, picks: [1] })
  saveLongDraft('y', null)
  expect(loadLongDraft('y')).toBeNull()
  localStorage.setItem('eitan:long-draft', '[1,2]')
  expect(loadLongDraft('x')).toBeNull()
})

it('長文の種類を見分ける', async () => {
  const { genreOf, GENRES } = await import('./longreading')
  const at = (id: string) => LONG_PASSAGES.find((x) => x.id === id)!
  expect(genreOf(at('chopsticks'))).toBe('説明文')
  expect(genreOf(at('lost-wallet'))).toBe('物語')
  expect(genreOf(at('speech-nurse'))).toBe('スピーチ')
  expect(genreOf(at('email-homestay'))).toBe('手紙・メール')
  expect(genreOf(at('talk-library'))).toBe('会話文')
  for (const g of GENRES) expect(LONG_PASSAGES.some((x) => genreOf(x) === g)).toBe(true)
})

it('文を入れる位置の問題は1点で、正しい位置なら正解', () => {
  const p = LONG_PASSAGES.find((x) => x.insert)!
  expect(p.insert!.after).toHaveLength(4)
  for (const i of p.insert!.after) expect(i).toBeLessThan(p.paragraphs.length)
  const right = scoreLong(p, {}, {}, [], { insert: p.insert!.answer })
  const wrong = scoreLong(p, {}, {}, [], { insert: (p.insert!.answer + 1) % 4 })
  expect(right.score - wrong.score).toBe(1)
})

it('要約文の完成は空所の数だけ点があり、本文に ( 1 ) がある', () => {
  const p = LONG_PASSAGES.find((x) => x.summary)!
  const s = p.summary!
  s.blanks.forEach((b, i) => {
    expect(s.text).toContain(`( ${i + 1} )`)
    expect(b.choices).toHaveLength(4)
  })
  const all = Object.fromEntries(s.blanks.map((b, i) => [i, b.answer]))
  const none = Object.fromEntries(s.blanks.map((b, i) => [i, (b.answer + 1) % 4]))
  expect(scoreLong(p, {}, {}, [], { summary: all }).score - scoreLong(p, {}, {}, [], { summary: none }).score).toBe(s.blanks.length)
})

it('要約文の完成と文を入れる位置の設問はそれぞれ5本以上', () => {
  expect(LONG_PASSAGES.filter((x) => x.summary).length).toBeGreaterThanOrEqual(5)
  expect(LONG_PASSAGES.filter((x) => x.insert).length).toBeGreaterThanOrEqual(5)
  for (const p of LONG_PASSAGES.filter((x) => x.insert)) {
    expect(p.insert!.after).toHaveLength(4)
    expect(p.insert!.answer).toBeLessThan(4)
    for (const i of p.insert!.after) expect(i).toBeLessThan(p.paragraphs.length)
  }
})

it('語句の意味の設問は本文にある語で、選択肢は4つ', () => {
  const ps = LONG_PASSAGES.filter((x) => x.vocab)
  expect(ps.length).toBeGreaterThanOrEqual(3)
  for (const p of ps) {
    for (const v of p.vocab!) {
      expect(p.paragraphs.join(' ')).toContain(v.word)
      expect(v.choices).toHaveLength(4)
    }
    const right = Object.fromEntries(p.vocab!.map((v, i) => [i, v.answer]))
    expect(scoreLong(p, {}, {}, [], { vocab: right }).score).toBe(p.vocab!.length)
  }
})

it('出来事の順番は全部の順番が合って1点', async () => {
  const { seqRight } = await import('./longreading')
  const ps = LONG_PASSAGES.filter((x) => x.seq)
  expect(ps.length).toBeGreaterThanOrEqual(5)
  for (const p of ps) {
    const q = p.seq!
    expect(q.events).toHaveLength(4)
    expect([...q.answer].sort()).toEqual([0, 1, 2, 3])
    expect(seqRight(q, q.answer)).toBe(true)
    expect(seqRight(q, [...q.answer].reverse())).toBe(false)
    expect(seqRight(q, q.answer.slice(0, 3))).toBe(false)
    expect(scoreLong(p, {}, {}, [], { seq: q.answer }).score).toBe(1)
  }
})

it('長文の最短タイムは短くなったときだけ更新', async () => {
  const { loadLongTimes, recordLongTime } = await import('./longreading')
  localStorage.clear()
  expect(recordLongTime('a', 300)).toBe(true)
  expect(recordLongTime('a', 400)).toBe(false)
  expect(recordLongTime('a', 250)).toBe(true)
  expect(loadLongTimes()).toEqual({ a: 250 })
})

it('今日の1本は日付で決まる', async () => {
  const { dailyLong, loadDailyLongDay, saveDailyLongDay } = await import('./longreading')
  expect(dailyLong('2026-10-20')).toBe(dailyLong('2026-10-20'))
  const ids = new Set(Array.from({ length: 30 }, (_, i) => dailyLong(`2026-11-${String(i + 1).padStart(2, '0')}`).id))
  expect(ids.size).toBeGreaterThan(5)
  localStorage.clear()
  expect(loadDailyLongDay()).toBe('')
  saveDailyLongDay('2026-10-20')
  expect(loadDailyLongDay()).toBe('2026-10-20')
})

it('英問英答のある長文は13本以上で、選択肢は4つ', () => {
  const ps = LONG_PASSAGES.filter((x) => x.qa)
  expect(ps.length).toBeGreaterThanOrEqual(13)
  for (const p of ps) for (const q of p.qa!) expect(q.choices).toHaveLength(4)
})

it('直近5本の正答率で読解レベルが決まる', async () => {
  const { loadLongHistory, pushLongHistory, readingLevel } = await import('./longreading')
  localStorage.clear()
  expect(readingLevel([])).toBeNull()
  expect(readingLevel([0.5])).toEqual({ name: '初級', pct: 50 })
  expect(readingLevel([0.6, 0.7])).toEqual({ name: '中級', pct: 65 })
  expect(readingLevel([0.9, 0.8])).toEqual({ name: '上級', pct: 85 })
  for (let i = 0; i < 7; i++) pushLongHistory(i / 10)
  expect(loadLongHistory()).toEqual([0.2, 0.3, 0.4, 0.5, 0.6])
})

it('すべての設問の種類につまずき解説がある', async () => {
  const { TYPE_LABEL, TYPE_TIPS } = await import('./longreading')
  for (const k of Object.keys(TYPE_LABEL)) expect((TYPE_TIPS as Record<string, string>)[k]).toBeTruthy()
})

it('読解レベルに合った、まだ解いていない長文をすすめる', async () => {
  const { levelPick } = await import('./longreading')
  const a = levelPick('上級', {})!
  expect(a.level).toContain('高校入試')
  expect(levelPick('初級', {})!.level).toContain('中2')
  const b = levelPick('中級', { [levelPick('中級', {})!.id]: 5 })!
  expect(b.level).toContain('中3')
  expect(b.id).not.toBe(levelPick('中級', {})!.id)
})

it('内容に合うものを2つ選ぶ設問は7本以上', () => {
  const ps = LONG_PASSAGES.filter((x) => x.pick2)
  expect(ps.length).toBeGreaterThanOrEqual(7)
  for (const p of ps) {
    expect(p.pick2!.statements).toHaveLength(6)
    expect(p.pick2!.answers[0]).not.toBe(p.pick2!.answers[1])
  }
})

it('音読スピードは1分あたりの語数', async () => {
  const { wpmOf } = await import('./longreading')
  expect(wpmOf(120, 60)).toBe(120)
  expect(wpmOf(150, 90)).toBe(100)
  expect(wpmOf(100, 0)).toBe(0)
})

it('ジャンルごとの正答率をためる', async () => {
  const { addGenreStats, loadGenreStats } = await import('./longreading')
  localStorage.clear()
  addGenreStats('物語', 8, 10)
  expect(addGenreStats('物語', 9, 10)).toEqual({ 物語: [17, 20] })
  addGenreStats('説明文', 5, 10)
  expect(loadGenreStats()).toEqual({ 物語: [17, 20], 説明文: [5, 10] })
})

it('解いた本数で記念バッジがふえる', async () => {
  const { solvedBadges } = await import('./longreading')
  expect(solvedBadges(9, 70)).toEqual([])
  expect(solvedBadges(30, 70)).toEqual(['🥉10本', '🥈30本'])
  expect(solvedBadges(70, 70)).toEqual(['🥉10本', '🥈30本', '🥇50本', '🏆全部制覇'])
})

it('タイトル選択の設問は8本以上で、正解は本当のタイトル', () => {
  const ps = LONG_PASSAGES.filter((x) => x.titleQ)
  expect(ps.length).toBeGreaterThanOrEqual(8)
  for (const p of ps) expect(p.titleQ!.choices).toHaveLength(4)
})

it('語句整序は8本以上で、並べる語と答えの語が同じ', () => {
  const ps = LONG_PASSAGES.filter((x) => x.order)
  expect(ps.length).toBeGreaterThanOrEqual(8)
  for (const p of ps) expect([...p.order!.words].sort()).toEqual(p.order!.answer.split(' ').sort())
})
