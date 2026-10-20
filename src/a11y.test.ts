/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/index.css', 'utf8')

describe('見やすさ', () => {
  it('キーボード操作のフォーカス枠を表示する', () => {
    expect(css).toContain(':focus-visible { outline: 3px solid var(--accent)')
  })

  it('動きを減らす設定の端末ではアニメーションを止める', () => {
    expect(css).toContain('prefers-reduced-motion: reduce')
  })
})
