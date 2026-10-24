import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

it('ショップのアイテムの説明は1行（はみ出たら … で切る）', () => {
  const css = readFileSync('src/polish.css', 'utf8')
  expect(css).toMatch(/\.shop \.item-meta, \.shop > \.stats-note \{[^}]*white-space: nowrap;[^}]*text-overflow: ellipsis/)
})
