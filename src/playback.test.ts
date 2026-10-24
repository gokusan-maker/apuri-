import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

it('問題の画面（上のバーあり）では、ボス戦の中のもどるボタンをかくす（もどるは1つ）', () => {
  const css = readFileSync('src/polish.css', 'utf8')
  expect(css).toMatch(/\.play-bar ~ \.boss > \.stage-head \.stage-back, \.play-bar ~ \* \.boss > \.stage-head \.stage-back \{ display: none; \}/)
})

it('シェアのボタンは水色のゲームボタン（ダークは2スコープ）', () => {
  const css = readFileSync('src/polish.css', 'utf8')
  expect(css).toMatch(/\.list-link\.share-go \{[^}]*linear-gradient\(180deg, #22d3ee, #0891b2\)/)
  expect(css).toMatch(/:root:not\(\[data-theme='light'\]\) \.list-link\.share-go/)
  expect(css).toMatch(/:root\[data-theme='dark'\] \.list-link\.share-go/)
  for (const f of ['src/App.tsx', 'src/QuizView.tsx', 'src/ShareView.tsx']) expect(readFileSync(f, 'utf8')).toMatch(/list-link share-go/)
})
