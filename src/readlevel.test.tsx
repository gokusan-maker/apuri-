import { describe, expect, it } from 'vitest'
import { ADV_PASSAGES } from './advreading'
import { loadReadLevel, passagesFor, READ_LEVELS, saveReadLevel } from './readlevel'

describe('読解のむずかしさ', () => {
  it('かんたん〜TOEFL・IELTS まで5段階あり、かんたん以外は長文がある', () => {
    expect(READ_LEVELS.map((l) => l.label)).toEqual(['かんたん', 'ふつう', '高校入試', '難関大', 'TOEFL・IELTS'])
    for (const l of READ_LEVELS.filter((x) => x.id !== 'easy')) expect(passagesFor(l.id).length, l.id).toBeGreaterThanOrEqual(14)
    expect(passagesFor('univ').every((p) => p.level.startsWith('難関大'))).toBe(true)
  })

  it('えらんだむずかしさを覚える（はじめは かんたん）', () => {
    localStorage.clear()
    expect(loadReadLevel()).toBe('easy')
    saveReadLevel('toefl')
    expect(loadReadLevel()).toBe('toefl')
  })
})

describe('難関大・TOEFL/IELTS の長文', () => {
  it('空所が本文にあり、訳は段落と同じ数、選択肢の答えは範囲内', () => {
    const ids = new Set<string>()
    for (const p of ADV_PASSAGES) {
      expect(ids.has(p.id)).toBe(false)
      ids.add(p.id)
      expect(p.ja.length).toBe(p.paragraphs.length)
      const text = p.paragraphs.join(' ')
      for (const b of p.blanks) {
        expect(text).toContain(`( ${b.id} )`)
        expect(b.answer).toBeLessThan(b.choices.length)
        expect(new Set(b.choices).size).toBe(b.choices.length)
      }
      for (const q of p.qa ?? []) expect(q.answer).toBeLessThan(q.choices.length)
      const words = text.split(/\s+/).length
      expect(words, p.id).toBeGreaterThanOrEqual(150)
    }
  })
})

describe('むずかしさごとに解いた本数', () => {
  it('そのレベルで解いた本数と全部の本数（かんたんは数えない）', async () => {
    const { solvedOf } = await import('./readlevel')
    expect(solvedOf('easy', {}, ['cat'])!.done).toBe(1)
    const ps = passagesFor('univ')
    expect(solvedOf('univ', { [ps[0].id]: 5, 'cat': 3 })).toEqual({ done: 1, total: ps.length })
  })
})

describe('むずかしさごとの今日のおすすめ', () => {
  it('そのレベルの中から日ごとに1本（同じ日は同じ）', async () => {
    const { dailyPick } = await import('./readlevel')
    const list = passagesFor('toefl')
    const p = dailyPick(list, '2026-10-22')!
    expect(list).toContain(p)
    expect(dailyPick(list, '2026-10-22')).toBe(p)
    expect(dailyPick([], '2026-10-22')).toBeUndefined()
    const seen = new Set(Array.from({ length: 30 }, (_, i) => dailyPick(list, `2026-11-${i + 1}`)!.id))
    expect(seen.size).toBeGreaterThan(2)
  })
})

describe('かんたんの短い読解も解いた本数を数える', () => {
  it('全部答えた話が✅になり、本数がふえる', async () => {
    const { render, screen, fireEvent } = await import('@testing-library/react')
    const { Reading } = await import('./ReadingView')
    const { PASSAGES } = await import('./reading')
    localStorage.clear()
    const p = PASSAGES[0]
    render(<Reading start={p} />)
    for (const q of p.questions) {
      fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
      fireEvent.click(screen.getByText('次へ'))
    }
    fireEvent.click(screen.getByText('ほかの話を読む'))
    expect(screen.getByText(`✅ ${p.title}`)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`解いた話 1 / ${PASSAGES.length}本`))).toBeInTheDocument()
  })
})

describe('次のレベルへのちょうせん印', () => {
  it('1つ下のレベルを半分以上解くと、そのレベルに⭐ちょうせん', async () => {
    const { readyFor } = await import('./readlevel')
    const univ = passagesFor('univ')
    expect(readyFor('toefl', {})).toBe(false)
    const half = Object.fromEntries(univ.slice(0, Math.ceil(univ.length / 2)).map((p) => [p.id, 5]))
    expect(readyFor('toefl', half)).toBe(true)
    expect(readyFor('easy', half)).toBe(false) // いちばん下には出ない
  })
})

describe('高校入試レベルの追加読解', () => {
  it('高校入試のむずかしさに、新しい自作の読解が入っている', () => {
    const ids = passagesFor('exam').map((p) => p.id)
    expect(ids).toContain('exam-radio')
    expect(ids).toContain('exam-wheelchair')
    expect(passagesFor('univ').some((p) => p.id.startsWith('exam-'))).toBe(false)
  })
})
