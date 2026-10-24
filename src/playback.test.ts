import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

it('問題の画面（上のバーあり）では、ボス戦の中のもどるボタンをかくす（もどるは1つ）', () => {
  const css = readFileSync('src/polish.css', 'utf8')
  expect(css).toMatch(/\.play-bar ~ \.boss > \.stage-head \.stage-back, \.play-bar ~ \* \.boss > \.stage-head \.stage-back \{ display: none; \}/)
})
