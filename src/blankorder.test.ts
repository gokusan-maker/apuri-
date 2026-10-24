import { expect, it } from 'vitest'
import { ADV_PASSAGES } from './advreading'
import { LONG_PASSAGES } from './longreading'

it('長文の空所は本文に出てくる順（A→B→C…）にならび、設問も同じ順', () => {
  const bad: string[] = []
  for (const p of [...LONG_PASSAGES, ...ADV_PASSAGES]) {
    const inText = [...p.paragraphs.join(' ').matchAll(/\( ([A-Z]) \)/g)].map((m) => m[1])
    const ids = p.blanks.map((b) => b.id)
    if (inText.join('') !== ids.join('')) bad.push(`${p.id}: 本文 ${inText.join('')} / 設問 ${ids.join('')}`)
  }
  expect(bad).toEqual([])
})
