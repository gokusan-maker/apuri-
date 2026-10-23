import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

const css = readFileSync('src/polish.css', 'utf8')

it('どのボタンにも押した感じがある（:where で一番弱い指定にして、専用の :active を上書きしない）', () => {
  expect(css).toContain(':where(button:not(:disabled)):active { transform: scale(0.97); }')
  expect(css).toMatch(/prefers-reduced-motion: reduce\) \{ :where\(button:not\(:disabled\)\):active \{ transform: none; \} \}/)
})

it('バトルアイテムの名前は1行（アイコンが上）', () => {
  expect(css).toContain('.battle-item .bi-name { flex: none; white-space: nowrap;')
})

it('単語のおさらいのテーマのボタンは3列', () => {
  expect(css).toContain('.word-review .theme-practice .levels { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));')
})
