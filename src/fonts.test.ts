import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

// 漢字が中国語の字形で表示されないように（文字化けのように見える）
it('ページは日本語指定で、フォントは日本語フォントを system-ui より先に指定する', () => {
  expect(readFileSync('index.html', 'utf8')).toContain('<html lang="ja">')
  const css = readFileSync('src/index.css', 'utf8')
  const root = css.match(/:root \{[^}]*font-family: ([^;]+);/)![1]
  const fonts = root.split(',').map((f) => f.trim().replace(/'/g, ''))
  expect(fonts[0]).toBe('Hiragino Sans')
  expect(fonts.indexOf('Noto Sans JP')).toBeLessThan(fonts.indexOf('system-ui'))
  expect(fonts.indexOf('Yu Gothic')).toBeLessThan(fonts.indexOf('system-ui'))
})
