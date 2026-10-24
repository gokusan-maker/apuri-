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
  for (const sel of ['.stamp-card', '.gold-chest', '.omikuji', '.univ-floors li', '.boss-book-list li', '.boss-ally', '.boss-partner', '.evo-preview', '.partner-status', '.warm-btn', '.roulette-wheel li:not(.hit)', '.vs-p1 .vs-score', '.vs-p2 .vs-score', '.daily-grammar span', '.long-review-title', '.gacha-pity', '.gacha-pickup', '.univ-tower', '.missed-list::before', '.spell-ng', '.long-evidence', '.long-recommend', '.gacha .gacha-event']) {
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

it('今日のことばの訳は英語と同じ1行に置く', () => {
  expect(css).toContain('.wotd .wotd-ja { display: inline;')
})

it('背景を持たない部品の濃い文字色にも、ダークモードの明るい色がある（自動で作った一覧）', () => {
  expect(css).toContain(':root[data-theme="dark"] .golden-boss-note')
  expect(css).toContain(':root:not([data-theme="light"]) .long-evidence-note')
})

it('中央ぞろえの短い文は text-wrap: balance で1文字だけ改行されないようにする', () => {
  expect(css).toMatch(/\.boss-intro-ja[^{]*.result-message[^{]*\{ text-wrap: balance; word-break: auto-phrase; \}/)
})

it('文法ページの今日の文法は1画面に収まるよう、選択肢を横にならべてつめる', () => {
  expect(css).toContain('.today-grammar .choices { grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));')
  expect(css).toContain('.today-grammar .flip { margin-top: 8px;')
})

it('ボス部屋のモード一覧は1行ずつ色つきのゲームボタン', () => {
  expect(css).toMatch(/\.boss-modes \.boss-btn \{ padding: 14px 40px 14px 16px; border: none; border-radius: 16px; background: linear-gradient/)
})

it('設定のスイッチは1枚のカードにまとまり、見出しは色つきの札', () => {
  expect(css).toContain('.settings .setting.toggle + .setting.toggle { padding-block: 10px;')
  expect(css).toMatch(/\.settings \.settings-h \{[^}]*background: var\(--accent-grad\)/)
})

it('文法の学年・読解のジャンルの行は game-fold の色つきボタン', () => {
  expect(css).toMatch(/\.game-fold > summary \{ gap: 10px;[^}]*linear-gradient/)
})

it('文法のおすすめ単元は金色のゲームボタン', () => {
  expect(css).toMatch(/\.grammar-recommend \.rec-unit \{[^}]*linear-gradient\(135deg, #fde047, #f59e0b\)/)
})

it('文法の学年まとめテストは学年の色のゲームボタン', () => {
  expect(css).toMatch(/\.grade-tests \.list-link \{ --gt-h: 160;[^}]*linear-gradient/)
})

it('単語のおさらいのボタンとテーマで練習は色つきのゲームボタン', () => {
  expect(css).toMatch(/\.word-review > \.list-link \{ --wr-h: 225;[^}]*linear-gradient/)
  expect(css).toContain('.word-review > .theme-practice.game-fold { margin: 0 0 10px;')
})

it('ボス図鑑と大学入試の塔も色つきのゲームボタン', () => {
  expect(css).toContain('.boss-book.game-fold { --lg-h: 350;')
  expect(css).toContain('.univ-tower.game-fold { --lg-h: 265;')
})

it('ボタン・一覧の文字は1行（題名・タイルの説明・むずかしさタブ・ショップの名前）', () => {
  expect(css).toContain('.short-title, .long-item-title { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }')
  expect(css).toMatch(/\.game-tile-sub \{[^}]*white-space: nowrap/)
  expect(css).toMatch(/\.read-levels button strong, \.read-levels small \{ white-space: nowrap;/)
  expect(css).toMatch(/\.snacks \.item-name, \.snacks \.item-meta \{[^}]*white-space: nowrap/)
})

it('ボス部屋のボタンは同じ形（アイコンの箱・名前・バッジ・丸い ›）でそろえる', () => {
  expect(css).toMatch(/\.boss-modes \.boss-btn \.lg-icon, \.gold-chest \.lg-icon \{/)
  expect(css).toMatch(/\.gold-chest \{ display: flex;[^}]*linear-gradient\(135deg, #fde047, #f59e0b\)/)
  expect(css).toMatch(/\.daily-stars \.star-3 \{/)
})

it('ホームの今日の目標は太い緑のゲージ', () => {
  expect(css).toMatch(/\.goal \.goal-fill \{[^}]*linear-gradient\(90deg, #4ade80, #16a34a\)/)
})
