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

it('「まだ」だけめくる・まちがいをお気に入り（ピンク）、もう一度診断（青）、コーデ（むらさき・保存は緑）も色つき', () => {
  const has = (f: string, c: string) => expect(readFileSync(`src/${f}`, 'utf8')).toContain(`list-link pill-btn ${c}`)
  has('GrammarCardsView.tsx', 'pill-pink')
  has('QuizView.tsx', 'pill-pink')
  has('PlacementView.tsx', 'pill-blue')
  has('ShopView.tsx', 'pill-purple')
  has('ShopView.tsx', 'pill-green')
})

it('おさんぽクイズ（緑）・単語一覧（青）のボタンも色つき', () => {
  const src = readFileSync('src/App.tsx', 'utf8')
  expect(src).toContain('list-link pill-btn pill-green" onClick={() => setWalkQuizOpen(true)}')
  expect(src).toContain('list-link pill-btn pill-blue" onClick={() => setShowList(true)}')
})

it('今日の文法・トレーニングの選択肢は白い丸ボタン、もう一度ときたい長文はピンク、レベル診断はむらさき', () => {
  const has = (f: string, c: string) => expect(readFileSync(`src/${f}`, 'utf8')).toContain(`list-link pill-btn ${c}`)
  has('DailyGrammarQView.tsx', 'pill-choice')
  has('TrainingView.tsx', 'pill-choice')
  has('LongReadingView.tsx', 'pill-pink')
  has('OnboardingView.tsx', 'pill-purple')
})

it('記録の「単語帳ごとの定着」は色ボタン、今日のことばの「例文を見る」はむらさきの丸ボタン', () => {
  expect(readFileSync('src/StatsView.tsx', 'utf8')).toContain('by-level game-fold lg-3')
  expect(readFileSync('src/WordOfDayView.tsx', 'utf8')).toContain('wotd-ex-btn')
})

it('おさんぽ日記・まだのバッジ・ことわざ帳・英語日記・重要語句などのたたみは、色つきの丸いボタン（chip-fold）', () => {
  for (const f of ['App.tsx', 'BadgesView.tsx', 'BossBookView.tsx', 'DiaryView.tsx', 'LongReadingView.tsx', 'GrammarView.tsx', 'RiddleBookView.tsx', 'MonsterView.tsx']) expect(readFileSync(`src/${f}`, 'utf8')).toMatch(/chip-fold cf-\d/)
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.chip-fold > summary \{[^}]*white-space: nowrap/)
})

it('まちがえやすい（ピンク）・今日の文法のポイント（むらさき）・まとめて追加（青）のたたみも色つきの丸いボタン', () => {
  expect(readFileSync('src/CardView.tsx', 'utf8')).toContain('confusing-tip chip-fold cf-5')
  expect(readFileSync('src/TodayGrammarView.tsx', 'utf8')).toContain('today-grammar-point chip-fold cf-1')
  expect(readFileSync('src/MyWordsView.tsx', 'utf8')).toContain('bulk chip-fold cf-4')
})

it('今日はじめての単語・ボス戦の本文・つまずき解説のたたみも色つきの丸いボタン', () => {
  expect(readFileSync('src/App.tsx', 'utf8')).toContain('first-today chip-fold')
  expect(readFileSync('src/BossView.tsx', 'utf8')).toContain('boss-passage chip-fold')
  expect(readFileSync('src/LongReadingView.tsx', 'utf8')).toContain('long-tips chip-fold')
})

it('ガチャのシール帳も色つきの丸いボタン', () => {
  expect(readFileSync('src/GachaView.tsx', 'utf8')).toContain('sticker-book chip-fold cf-2')
})

it('設定以外のチェックも、オン／オフのスイッチの形', () => {
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/:where\(input\[type='checkbox'\]:not\(\.setting\.toggle input\)\)::after \{ content: ''; position: absolute;/)
})

it('設定のえらぶボタンは、下に影のあるぷっくりしたゲームボタン', () => {
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.settings \.levels button\[aria-pressed='true'\] \{ box-shadow: 0 3px 0/)
})

it('ガチャの「最近のガチャ・ガチャの記録・〇〇の仲間だ！」も色つきの丸いボタン', () => {
  const src = readFileSync('src/GachaView.tsx', 'utf8')
  for (const c of ['gacha-log chip-fold', 'gacha-stats chip-fold', 'gacha-species chip-fold']) expect(src).toContain(c)
})

it('ミニゲームの「はじめる」は ▶ が1つだけ（CSS で付ける）、おさらいの色ボタンにも右に ›', () => {
  expect(readFileSync('src/QuizView.tsx', 'utf8')).not.toContain('▶ {now.label} をはじめる')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.word-review > \.list-link::after \{ content: '›'/)
})

it('単語ステージのタイルは単語帳ごとに色がちがう', () => {
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.stage-levels > \.stage-level \.stage-btn:not\(:disabled\):not\(\.cleared\) \{[^}]*hsl\(var\(--st-h\)/)
})

it('タイムアタックの「スタート」はオレンジ〜赤（結果画面のオレンジに負けない）', () => {
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/section\.result\.ta-ready > \.flip\.ta-start \{ background: linear-gradient\(135deg, #fb923c, #ef4444\)/)
})

it('ボス部屋のとくべつイベントは光るわく・リボンつき', () => {
  const css = readFileSync('src/polish.css', 'utf8')
  expect(css).toMatch(/\.special-event \{[^}]*animation: se-glow/)
  expect(css).toMatch(/\.special-event-ribbon \{[^}]*white-space: nowrap/)
})
