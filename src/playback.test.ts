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

it('長文の並べかえの「やりなおす」は青の小さなボタン', () => {
  expect(readFileSync('src/LongReadingView.tsx', 'utf8').match(/list-link redo-pill/g)).toHaveLength(3)
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.list-link\.redo-pill \{[^}]*#2563eb/)
})

it('文法カードの「覚えた・まだ・まえ・つぎ」は色つきのゲームボタン、文法の結果コピーは水色', () => {
  const src = readFileSync('src/GrammarCardsView.tsx', 'utf8')
  for (const c of ['gc-know', 'gc-again', 'gc-step']) expect(src).toContain(`list-link ${c}`)
  expect(readFileSync('src/GrammarView.tsx', 'utf8')).toContain('list-link share-go')
})

it('上にはりつくバーはうしろを四角くぬらない（ダークの黒い帯をなくす）', () => {
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.play-bar \{ background: transparent;/)
})

it('ガチャ・単語一覧・パズル・すごろくの素の文字ボタンは、役割の色の丸いゲームボタン', () => {
  const has = (f: string, c: string) => expect(readFileSync(`src/${f}`, 'utf8')).toContain(`list-link pill-btn ${c}`)
  has('GachaView.tsx', 'pill-blue')
  has('GachaView.tsx', 'pill-gold')
  has('WordListView.tsx', 'pill-orange')
  has('PuzzleView.tsx', 'pill-purple')
  has('SugorokuView.tsx', 'pill-start')
  for (const f of ['GachaView.tsx', 'WordListView.tsx', 'PuzzleView.tsx', 'SugorokuView.tsx']) expect(readFileSync(`src/${f}`, 'utf8')).not.toMatch(/className="list-link"/)
})

it('文法ページの素の文字ボタンはなくなり、色つきの丸いゲームボタン', () => {
  const src = readFileSync('src/GrammarView.tsx', 'utf8')
  expect(src).not.toMatch(/className="list-link"/)
  for (const c of ['pill-start', 'pill-orange', 'pill-pink', 'pill-green', 'pill-cyan', 'pill-purple']) expect(src).toContain(`list-link pill-btn ${c}`)
})

it('時制まとめ表の色ボタンは横ならび（アイコン・名前・右に ›）', () => {
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.tense-table\.game-fold > summary \{ display: flex;/)
})

it('聞く・ゆっくり（水色）、音読（オレンジ赤）・読めた（緑）、和訳（むらさき）、とじる（青）も色つきの丸いボタン', () => {
  const has = (f: string, c: string) => expect(readFileSync(`src/${f}`, 'utf8')).toContain(`list-link pill-btn ${c}`)
  has('GrammarDictView.tsx', 'pill-cyan')
  has('GrammarShadowView.tsx', 'pill-cyan')
  has('LongReadingView.tsx', 'pill-start')
  has('LongReadingView.tsx', 'pill-purple')
  has('WalkQuizView.tsx', 'pill-blue')
  has('HideSeekView.tsx', 'pill-green')
})
