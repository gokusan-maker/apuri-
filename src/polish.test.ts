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

it('読解の文法タグはダークモードの色が2か所（端末の設定・手動）に書いてある', () => {
  expect(css).toContain(':root:not([data-theme="light"]) .long-gtag {')
  expect(css).toContain(':root[data-theme="dark"] .long-gtag {')
})

it('明るい背景を使う部品（スタンプカード・金の宝箱・おみくじ・塔の階・ボス図鑑）にはダークモードの色がある', () => {
  for (const sel of ['.stamp-card', '.gold-chest', '.omikuji', '.univ-floors li', '.boss-book-list li', '.boss-ally', '.boss-partner', '.evo-preview', '.partner-status', '.warm-btn', '.roulette-wheel li:not(.hit)', '.vs-p1 .vs-score', '.vs-p2 .vs-score', '.daily-grammar span', '.long-review-title', '.gacha-pity', '.gacha-pickup', '.missed-list::before', '.spell-ng', ".shop .badge-grid .room-try:not([aria-pressed='true'])"]) {
    expect(css).toContain(`:root:not([data-theme="light"]) ${sel} {`)
    expect(css).toContain(`:root[data-theme="dark"] ${sel} {`)
  }
})

it('polish.css で使う色のトークンは定義ずみのものだけ（var(--text) のような無いトークンを使わない）', () => {
  const base = readFileSync('src/index.css', 'utf8') + css
  const defined = new Set([...base.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]))
  const used = new Set([...css.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((m) => m[1]))
  expect([...used].filter((t) => !defined.has(t))).toEqual([])
})

it('汎用クラス .done に大きな余白などをつけない（クリアずみの印として多くの部品で使うため。カード一周のメッセージは .done-msg）', () => {
  const base = readFileSync('src/index.css', 'utf8')
  expect(base).not.toMatch(/^\.done\s*\{/m)
  expect(base).toMatch(/^\.done-msg\s*\{/m)
})

it('カタカナの名前（バッジ・おやつ・ボス・ガチャ結果など）は単語のとちゅうで改行しない設定がある', () => {
  expect(css).toMatch(/\.badge-name, [^{]*\.gacha-result p \{ word-break: keep-all; overflow-wrap: anywhere; \}/)
})

it('今日のことばの訳は英語の下の行に置く', () => {
  expect(css).toContain('.wotd .wotd-ja { display: block;')
})

it('背景を持たない部品の濃い文字色にも、ダークモードの明るい色がある（自動で作った一覧）', () => {
  expect(css).toContain(':root[data-theme="dark"] .golden-boss-note')
  expect(css).toContain(':root:not([data-theme="light"]) .long-evidence-note')
})
