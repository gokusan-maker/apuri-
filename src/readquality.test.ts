import { expect, it } from 'vitest'
import { ADV_PASSAGES } from './advreading'
import { passageStats } from './examtier'

const top = ADV_PASSAGES.filter((p) => /^(todai|kyodai)-/.test(p.id))

it('東大・京大の長文：空所の答えが Although ばかりにならない（作り直した長文は別の語の空所）', () => {
  const although = top.filter((p) => p.blanks.some((b) => b.choices[b.answer] === 'Although'))
  expect(although.length).toBeLessThanOrEqual(322)
  for (const id of ['kyodai-hope', 'kyodai-metaphor', 'kyodai-forgiveness']) {
    const p = top.find((x) => x.id === id)!
    expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
    expect(p.paragraphs.join(' ').match(/\( A \)/g)).toHaveLength(1)
  }
})

it('作り直した内容一致は、4つの選択肢が同じくらいの長さ（正解だけ長くない）', () => {
  const p = top.find((x) => x.id === 'kyodai-hope')!
  for (const q of p.qa ?? []) {
    const n = q.choices.map((c) => c.split(/\s+/).length)
    expect(Math.max(...n) - Math.min(...n)).toBeLessThanOrEqual(3)
  }
})

it('本文の語数は、空所に答えの語を入れて数える', () => {
  const p = { id: 'x', title: 'x', level: 'x', paragraphs: ['It is a form ( A ) a content.'], ja: [''], blanks: [{ id: 'A', choices: ['rather than', 'as', 'by', 'of'], answer: 0, why: '' }], tf: [] }
  expect(passageStats(p).words).toBe(8)
})
