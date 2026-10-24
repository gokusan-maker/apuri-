import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

// キャラクターは横に動くだけ。裏返し（scaleX(-1)・rotateY）は平たい紙のように見えるので使わない（オーナーの要望）
it('相棒のひとり歩きは左右反転・回転をしない', () => {
  const css = readFileSync('src/index.css', 'utf8') + readFileSync('src/polish.css', 'utf8')
  const walk = css.match(/@keyframes idle-walk \{[\s\S]*?\n\}/)![0]
  expect(walk).toMatch(/translate\(-20px/)
  expect(walk).not.toMatch(/scaleX\(-|rotate/)
  expect(css).not.toMatch(/rotateY|scaleX\(-1\)/)
})
