import { readdirSync, readFileSync } from 'node:fs'
import { expect, it } from 'vitest'
import { JA_FONT } from './share'

// 日本語チェック：中国語の字形・文字にならないように（オーナーの要望。更新のたびにテストで確かめる）

// Shift_JIS（日本語の文字コード）にある漢字の一覧。ここにない漢字は中国語などの文字
function jisKanji(): Set<string> {
  const dec = new TextDecoder('shift_jis')
  const set = new Set<string>()
  const leads = [...Array.from({ length: 0x1f }, (_, i) => 0x81 + i), ...Array.from({ length: 0x1d }, (_, i) => 0xe0 + i)]
  for (const a of leads) {
    for (let b = 0x40; b <= 0xfc; b++) {
      if (b === 0x7f) continue
      for (const c of dec.decode(new Uint8Array([a, b]))) set.add(c)
    }
  }
  return set
}

it('画面に出る文字（src と index.html）に、日本語にない漢字（中国語の簡体字など）がない', () => {
  const jis = jisKanji()
  const files = [...readdirSync('src').filter((f) => /\.tsx?$/.test(f) && !f.endsWith('.test.ts') && !f.endsWith('.test.tsx')).map((f) => `src/${f}`), 'index.html']
  const bad: string[] = []
  for (const f of files) {
    readFileSync(f, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        // 正規表現の文字の範囲（一-龥 など）は除く
        const text = line.replace(/\[[^\]]*\]/g, '')
        for (const ch of text) {
          const o = ch.codePointAt(0)!
          if (((o >= 0x3400 && o <= 0x9fff) || (o >= 0xf900 && o <= 0xfaff)) && !jis.has(ch)) bad.push(`${f}:${i + 1} ${ch}`)
        }
      })
  }
  expect(bad).toEqual([])
})

it('ページは lang="ja" で、日本語フォント（Noto Sans JP）を読みこむ', () => {
  const html = readFileSync('index.html', 'utf8')
  expect(html).toMatch(/<html lang="ja">/)
  expect(html).toMatch(/fonts\.googleapis\.com\/css2\?family=Noto\+Sans\+JP/)
  const css = readFileSync('src/index.css', 'utf8')
  // 先頭は日本語フォント（system-ui などが先だと、端末によって中国語の字形になる）
  expect(css).toMatch(/font-family: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP'/)
})

it('共有画像の文字も日本語フォントで描く', () => {
  expect(JA_FONT).toMatch(/Noto Sans JP/)
  expect(readFileSync('src/share.ts', 'utf8')).not.toMatch(/ctx\.font = '[^']*system-ui/)
})
