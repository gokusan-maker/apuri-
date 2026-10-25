import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { buildQueue, dayKey } from './srs'
import { pickWordOfDay } from './wordOfDay'
import { souvenirFor } from './souvenir'
import { LEVELS, WORDS, wordsOf } from './words'
import { SPECIES } from './monster'

// 今日の新しい単語の順（日によって変わる）
const FIRST = () => buildQueue(WORDS, {}, dayKey(), 0)

// はじめの単語帳（ビジネスは社会人をえらんだときだけ）の語数
const DEFAULT_N = wordsOf(LEVELS.filter((l) => l !== 'ビジネス')).length
const navTo = (name: string) => fireEvent.click(within(screen.getByRole('navigation', { name: '画面の切り替え' })).getByText(name))
const goMini = () => {
  navTo('単語ゲーム')
  fireEvent.click(screen.getByRole('tab', { name: '🎮 ミニゲーム' }))
}
// ミニゲームはえらぶ画面が先。「▶ 〇〇 をはじめる」で問題だけの画面へ
const playMini = () => {
  goMini()
  fireEvent.click(screen.getByRole('button', { name: /をはじめる$/ }))
}
// 今日のミニゲームの1つ目（単語カードのつぎ）のゲームの名前
const game1 = () => document.querySelectorAll('[aria-label="今日のミニゲーム"] .game-tile .game-tile-name, [aria-label="今日のミニゲーム"] .game-tile .gt-name')[1]?.textContent ?? ''
// 問題の画面の上の「← ほかの問題をえらぶ」
const backToPick = () => fireEvent.click(screen.getByRole('button', { name: /ほかの問題をえらぶ/ }))
// 単語カード（単語ゲームの「🃏 単語カード」のタイルから）
const goCards = () => {
  goMini()
  fireEvent.click(screen.getAllByRole('button', { name: /単語カード/ })[0])
}


// お知らせは順番に出るので、目当てのものが出るまで前のものを閉じる
function toast(text: string | RegExp) {
  for (let i = 0; i < 5 && !screen.queryByText(text); i++) {
    const t = document.querySelector('.mission-toast')
    if (!t) break
    fireEvent.click(t)
  }
  return screen.getByText(text)
}

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('eitan:onboarded', '1') // 初回の案内は別のテストで確認
    localStorage.setItem('eitan:lucky', dayKey()) // ラッキー単語のボーナスは専用のテストだけで確かめる
  })




  it('単語・文法・読解のページは上にキャラクター、その下に今日の課題。ボス部屋のいちばん上は3体（オーナー要望）', () => {
    render(<App />)
    const before = (a: Element | null, b: Element | null) => !!a && !!b && !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING)
    navTo('単語ゲーム')
    expect(before(document.querySelector('.ally-word'), screen.getByRole('button', { name: /^今日の課題（単語）：/ }))).toBe(true)
    navTo('文法チャレンジ')
    expect(before(document.querySelector('.ally-grammar'), screen.getByRole('button', { name: /^今日の課題（文法）：/ }))).toBe(true)
    navTo('読解ステージ')
    expect(before(document.querySelector('.ally-reading'), document.querySelector('.today-read-btn'))).toBe(true)
    navTo('ボス部屋')
    expect(document.querySelector('.ally-reading')).toBeNull() // 竜だけの札ではなく
    expect(before(document.querySelector('.buddy-row, [class*="buddy-row"]'), document.querySelector('.boss-chips'))).toBe(true) // 3体ならんだ列が上
  })
  it('仲間10体で、ガチャチケット1まいと交換できる', () => {
    localStorage.setItem('eitan:party', JSON.stringify({ active: 0, gacha: 10, members: [{ xp: 200 }, ...Array.from({ length: 10 }, (_, k) => ({ xp: k * 40 }))] }))
    const ok = vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<App />)
    navTo('ホーム')
    fireEvent.click(screen.getByRole('tab', { name: 'あいぼう' }))
    fireEvent.click(screen.getByRole('button', { name: /🐾×10 → 🎟1 と交換/ }))
    ok.mockRestore()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).tickets).toBe(1)
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members).toHaveLength(1)
  })
  it('読解ステージのいちばん上に「今日の読解」があり、押すとその英文が始まる', async () => {
    const { dailyShort } = await import('./dailyread')
    render(<App />)
    navTo('読解ステージ')
    const p = dailyShort(dayKey())
    const btn = screen.getByRole('button', { name: `今日の読解：${p.title}` })
    expect(btn.compareDocumentPosition(document.querySelector('.read-levels')!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    fireEvent.click(btn)
    expect(screen.getAllByText(p.title).length).toBeGreaterThan(0)
    expect(screen.queryByRole('button', { name: `今日の読解：${p.title}` })).toBeNull()
  })
  it('カードをめくって「覚えた」で次の単語に進む', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    expect(screen.getByLabelText(`今日の残り 10 語 ・ 定着 0 / ${DEFAULT_N} 語`)).toBeInTheDocument()
    expect(screen.getByText(FIRST()[0].en)).toBeInTheDocument()

    fireEvent.click(screen.getByText('意味を見る'))
    expect(screen.getByText(FIRST()[0].ja)).toBeInTheDocument()

    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText(FIRST()[1].en)).toBeInTheDocument()
    expect(screen.getByLabelText(new RegExp(`今日の残り 9 語`))).toBeInTheDocument()
  })

  it('「覚えた」でモンスターにXPが入り、保存される', () => {
    render(<App />)
    expect(screen.getByText('XP 0 / 20')).toBeInTheDocument()
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    navTo('ホーム')
    expect(screen.getByText('XP 5 / 20')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(5)
  })

  it('クイズで正解するとXP+10、タマゴがかえる', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 15 }))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    playMini()
    const en = document.querySelector('.quiz .en:not(.today-words .en)')!.textContent
    const word = WORDS.find((w) => w.en === en)!
    fireEvent.click(within(document.querySelector<HTMLElement>('.quiz .choices')!).getByRole('button', { name: word.ja }))
    expect(screen.getAllByText('タマゴがかえった！').length).toBeGreaterThan(0)
    expect(screen.getByRole('dialog', { name: '進化' })).toBeInTheDocument()
    navTo('ホーム')
    expect(document.querySelector('.monster-name')!.textContent).toContain('ちびモチ')
  })

  it('しばらくぶりだと「さみしそう」が出て、学習すると元気になる', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 30, lastDay: '2000-01-01' }))
    render(<App />)
    expect(screen.getByText(/さみしそう/)).toBeInTheDocument()
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    navTo('ホーム')
    expect(screen.queryByText(/さみしそう/)).not.toBeInTheDocument()
  })

  it('学習すると連続日数の🔥が1日になる', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    expect(screen.getByLabelText('連続学習 0 日')).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(screen.getByLabelText('連続学習 1 日')).toBeInTheDocument()
  })

  it('今日の課題：単語は今日の単語の4択、読解は今日の単語が入った短い英文で、終わるとクリアになる', async () => {
    const { dailyShort, todayWords } = await import('./dailyread')
    const { dayKey } = await import('./srs')
    const day = dayKey()
    const ws = todayWords(day)
    const p = dailyShort(day)
    render(<App />)
    const tasks = () => screen.getByLabelText('今日の課題')
    expect(tasks().textContent).toContain(`4択で${ws.length}語`)
    expect(tasks().textContent).toContain('読解')
    expect(tasks().textContent).toContain(p.title)
    // 単語：4択で今日の単語だけが出る
    fireEvent.click(within(tasks()).getByText(/4択で/))
    // 今日の課題だけを画面いっぱいに出す（ほかの問題・タブは出さない）
    const bar = () => screen.getByRole('navigation', { name: '今日の課題の切りかえ' })
    expect(within(bar()).getByRole('button', { name: /今日の課題（単語）：いまの課題/ })).toBeDisabled()
    expect(screen.queryByRole('tablist', { name: '単語の種類' })).not.toBeInTheDocument()
    for (let i = 0; i < ws.length; i++) {
      const en = document.querySelector('.quiz .en, .quiz .word-en, .quiz h2')?.textContent ?? ''
      const w = ws.find((x) => en.includes(x.en))!
      expect(w).toBeDefined()
      fireEvent.click(within(document.querySelector<HTMLElement>('.quiz .choices')!).getByRole('button', { name: w.ja }))
      fireEvent.click(screen.getByText(/次へ|結果を見る/))
    }
    expect(localStorage.getItem('eitan:today-words')).toBe(day)
    // 終わると「次の課題へ ▶」（まだの課題）が出る
    expect(screen.getByRole('button', { name: /次の課題へ ▶ 📐文法/ })).toBeInTheDocument()
    // 読解：上のバーのボタンから、今日の英文がすぐ開く
    fireEvent.click(within(bar()).getByRole('button', { name: /今日の課題（読解）へ/ }))
    expect(screen.getByRole('heading', { name: new RegExp(p.title) })).toBeInTheDocument()
    expect(screen.queryByRole('tablist', { name: '読解のむずかしさ' })).not.toBeInTheDocument()
    expect(screen.queryByText('← 一覧')).not.toBeInTheDocument()
    for (const q of p.questions) {
      fireEvent.click(screen.getAllByRole('button', { name: q.choices[q.answer] }).find((b) => !b.closest('.today-grammar'))!) // 上の今日の文法のボタンではなく、練習の問題のボタン
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(localStorage.getItem('eitan:daily-short')).toBe(day)
    // もどると、いつもの読解ページにもどる
    fireEvent.click(within(bar()).getByRole('button', { name: '← もどる' }))
    expect(screen.queryByRole('navigation', { name: '今日の課題の切りかえ' })).not.toBeInTheDocument()
    expect(screen.getByRole('tablist', { name: '読解のむずかしさ' })).toBeInTheDocument()
    // 今日の課題クリアのごほうび（+10XP）が読解のなかまに入る：問題の正解ぶんより10多い
    const before = JSON.parse(localStorage.getItem('eitan:buddy-today')!).reading
    expect(before).toBeGreaterThanOrEqual(10 + p.questions.length)
  })

  it('ホームの単語の相棒は、進化してから上がったレベルの数だけ星が出る', async () => {
    const { levelInfo } = await import('./monster')
    let xp = 0
    while (levelInfo(xp).level < 7) xp += 5 // Lv.7（モチまる Lv.5 から2レベル）
    localStorage.setItem('eitan:monster', JSON.stringify({ xp }))
    render(<App />)
    const row = screen.getByLabelText('育てているなかま')
    expect(within(row).getByLabelText('成長の星 2').textContent).toContain('★★')
  })

  it('文法チャレンジで正解すると、上に出ている文法のなかまの経験値がふえる', async () => {
    const { GRAMMAR } = await import('./grammar')
    localStorage.clear()
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0)
    render(<App />)
    navTo('文法チャレンジ')
    const bar = () => screen.getByRole('progressbar', { name: '文法のなかまの経験値' })
    expect(bar()).toHaveAttribute('aria-valuenow', '0')
    fireEvent.click(screen.getByText('✏️ すぐ練習（5問）'))
    rnd.mockRestore()
    // 問題の画面では、なかまはかくれて問題だけ
    expect(screen.queryByRole('progressbar', { name: '文法のなかまの経験値' })).toBeNull()
    const q = GRAMMAR[0].questions[0]
    fireEvent.click(screen.getAllByRole('button', { name: q.choices[q.answer] }).find((b) => !b.closest('.today-grammar'))!) // 上の今日の文法のボタンではなく、練習の問題のボタン
    backToPick()
    expect(Number(bar().getAttribute('aria-valuenow'))).toBeGreaterThan(0)
    navTo('ホーム')
    expect(within(screen.getByLabelText('育てているなかま')).getByLabelText(/文法のなかま/).textContent).toMatch(/\+\d+/)
    expect(JSON.parse(localStorage.getItem('eitan:buddies')!).grammar.xp).toBeGreaterThan(0)
  })

  it('ホームの「なかまを入れかえる」で、属性ごとの入れかえ画面が開く', () => {
    render(<App />)
    fireEvent.click(screen.getByText('🔁 なかまを入れかえる'))
    expect(screen.getByRole('tab', { name: 'あいぼう' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByLabelText('文法のなかまを入れかえる')).toBeInTheDocument()
    expect(screen.getByLabelText('読解のなかまを入れかえる')).toBeInTheDocument()
  })

  it('ショップの「属性のタマゴ」を買うと、文法か読解のなかまが1体ふえる（なにが出るかはお楽しみ）', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 200, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 200枚・ショップを開く'))
    fireEvent.click(screen.getByText('🥚 属性のタマゴ'))
    expect(screen.queryByText(/タマゴのかけら 0 \/ 5/)).toBeNull() // 0のときは出さない
    expect(screen.getByText(/が仲間になった！/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(80)
    const box = JSON.parse(localStorage.getItem('eitan:buddy-box')!)
    expect(Object.keys(box.grammar).length + Object.keys(box.reading).length).toBe(1)
  })

  it('チームの称号が上がるとガチャチケットがもらえる', () => {
    localStorage.setItem('eitan:team-title', '0')
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [] }))
    localStorage.setItem('eitan:buddies', JSON.stringify({ grammar: { xp: 100000 }, reading: { xp: 0 } }))
    render(<App />)
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).tickets).toBeGreaterThanOrEqual(1)
    expect(Number(localStorage.getItem('eitan:team-title'))).toBeGreaterThan(0)
  })

  it('ホームのなかまを押すと、そのなかまが英語でひとこと言ってから画面へ', () => {
    render(<App />)
    fireEvent.click(within(screen.getByLabelText('育てているなかま')).getByLabelText(/読解のなかま/))
    expect(screen.getByText(/Let's read a story together\./)).toBeInTheDocument()
    expect(screen.getByRole('tablist', { name: '読解のむずかしさ' })).toBeInTheDocument()
  })

  it('トリオボーナスを受け取ると、ホームの3体がおどる', async () => {
    const { dayKey } = await import('./srs')
    const day = dayKey()
    localStorage.setItem('eitan:today-words', day)
    localStorage.setItem('eitan:grammar-daily', day)
    localStorage.setItem('eitan:daily-short', day)
    render(<App />)
    expect(document.querySelector('.buddy-row.dancing')).toBeNull()
    expect(document.querySelector('.buddy-row.crowned')).not.toBeNull() // 3つクリアの日は👑
    fireEvent.click(screen.getByText(/トリオボーナスを受け取る/))
    expect(document.querySelector('.buddy-row.dancing')).not.toBeNull()
  })

  it('単語ゲームのミニゲームは人気のゲームがタイルで見えていて、押すとそのゲームになる', () => {
    render(<App />)
    goMini()
    const strip = screen.getByLabelText('今日のミニゲーム')
    expect(strip.querySelectorAll('.game-tile')).toHaveLength(6) // 単語カード＋今日の5つ
    expect(screen.getByLabelText(/^いま：.+・全\d+種$/)).toBeInTheDocument()
    const g = game1()
    fireEvent.click(within(strip).getByText(g))
    // 問題の画面ではえらぶタイルはかくれ、上の「ほかの問題をえらぶ」でもどれる
    expect(screen.queryByLabelText('今日のミニゲーム')).toBeNull()
    expect(screen.queryByRole('tablist', { name: '単語の種類' })).toBeNull()
    backToPick()
    expect(within(screen.getByLabelText('今日のミニゲーム')).getByText(g).closest('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('単語ゲームの人気タイルにも NEW の印がつき、あそぶと「✅ 今日」になる', () => {
    localStorage.clear()
    render(<App />)
    goMini()
    const g = game1()
    const tile = within(screen.getByLabelText('今日のミニゲーム')).getByText(g).closest('button')!
    expect(within(tile).getByText('NEW')).toBeInTheDocument()
    fireEvent.click(tile)
    backToPick()
    const after = within(screen.getByLabelText('今日のミニゲーム')).getByText(g).closest('button')!
    expect(within(after).getByText('✅ 今日')).toBeInTheDocument()
  })

  it('単語ゲームを1日に5しゅるいあそぶと、ボタンでごほうびをもらえる（1日1回）', async () => {
    const { dayKey } = await import('./srs')
    localStorage.clear()
    localStorage.setItem('eitan:games-today', JSON.stringify({ day: dayKey(), keys: ['word:a', 'word:b', 'word:c', 'word:d', 'word:e'] }))
    render(<App />)
    goMini()
    fireEvent.click(screen.getByRole('button', { name: /5しゅるいあそんだごほうび/ }))
    expect(screen.queryByRole('button', { name: /5しゅるいあそんだごほうび/ })).toBeNull()
    expect(localStorage.getItem('eitan:word-games-day')).toBe(dayKey())
  })

  it('単語ゲームの「ミニゲームをえらぶ」ボタンに、今日あそんだしゅるいの数が出る', () => {
    localStorage.clear()
    render(<App />)
    goMini()
    expect(screen.queryByText(/今日 \d+ しゅるいあそんだ/)).toBeNull()
    fireEvent.click(within(screen.getByLabelText('今日のミニゲーム')).getByText(game1()))
    backToPick()
    expect(screen.getByText(/^今日 1 しゅるいあそんだ・あと4で🪙/)).toBeInTheDocument()
  })

  it('画面下のタブで ホーム／単語ゲーム／文法チャレンジ／読解ステージ／ボス部屋／設定 を切り替えられる', () => {
    render(<App />)
    const tab = (name: string) => within(screen.getByRole('navigation', { name: '画面の切り替え' })).getByRole('button', { name: new RegExp(name) })
    expect(tab('ホーム')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByText('📊 記録')).toBeInTheDocument()
    fireEvent.click(tab('単語'))
    expect(tab('単語')).toHaveAttribute('aria-current', 'page')
    // 単語ゲームはミニゲームが先。カードはミニゲームのタイルの1つ
    expect(document.querySelector('.quiz-pick')).not.toBeNull()
    expect(screen.queryByRole('tab', { name: '🃏 カード' })).toBeNull()
    fireEvent.click(within(screen.getByLabelText('今日のミニゲーム')).getByText('単語カード'))
    expect(screen.getByText('意味を見る')).toBeInTheDocument()
    backToPick() // カードも問題だけの画面。上の「← ほかの問題をえらぶ」でえらぶ画面へ
    expect(document.querySelector('.quiz-pick')).not.toBeNull()
    fireEvent.click(screen.getByRole('tab', { name: '⏱ タイムアタック' }))
    expect(screen.getByText('スタート')).toBeInTheDocument()
    fireEvent.click(tab('文法'))
    expect(document.querySelector('.grammar')).not.toBeNull()
    // 文法チャレンジは、まずゲームの種類をえらぶ画面（いきなり問題は出ない）
    expect(screen.getByLabelText('文法ゲーム')).toBeInTheDocument()
    expect(screen.getByText('✏️ すぐ練習（5問）')).toBeInTheDocument()
    expect(screen.queryByText(/\/ 5 問目/)).toBeNull()
    expect(screen.queryByText(/ミニゲームをえらぶ/)).toBeNull()
    fireEvent.click(tab('読解'))
    expect(screen.getByRole('tablist', { name: '読解のむずかしさ' })).toBeInTheDocument()
    expect(screen.queryByRole('tab', { name: '👹 ボス' })).toBeNull()
    fireEvent.click(tab('ボス部屋'))
    expect(document.querySelector('section.stages')).not.toBeNull()
    expect(tab('ボス部屋')).toHaveAttribute('aria-current', 'page')
    fireEvent.click(tab('設定'))
    expect(tab('設定')).toHaveAttribute('aria-current', 'page')
  })

  it('記録画面に連続日数・今日の学習数・定着語数が出る（クイズの不正解も学習数に入る）', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    playMini()
    const en = document.querySelector('.quiz .en:not(.today-words .en)')!.textContent
    const word = WORDS.find((w) => w.en === en)!
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent !== word.ja)!)
    navTo('ホーム')
    expect(screen.getByText('1日')).toBeInTheDocument()
    expect(document.querySelector('.result-list')!.textContent).toContain('2問')
    expect(screen.getByText(`0 / ${DEFAULT_N}`)).toBeInTheDocument()
  })

  it('単語帳の選択はホームには出さず（オーナーの要望）、設定にある', () => {
    render(<App />)
    expect(screen.queryByText(/📚 単語帳：/)).toBeNull()
    navTo('設定')
    expect(within(screen.getByRole('group', { name: '単語帳' })).getByRole('button', { name: /^中2/ })).toBeInTheDocument()
  })

  it('単語帳を中1だけにすると、定着の母数が中1の語数になる', () => {
    render(<App />)
    navTo('設定')
    for (const l of ['中2', '中3', '高校基礎', '熟語', '曜日・月', 'テーマ別', '数', '色・形', '会話']) fireEvent.click(within(screen.getByRole('group', { name: '単語帳' })).getByRole('button', { name: new RegExp('^' + l) }))
    const n = wordsOf(['中1']).length
    goCards()
    expect(screen.getByLabelText(new RegExp(`定着 0 / ${n} 語`))).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:levels')!)).toEqual(['中1'])
  })

  it('まちがえた単語が記録の「苦手な単語」に出て、苦手だけ復習できる', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    navTo('ホーム')
    expect(screen.getByText('×1')).toBeInTheDocument()
    fireEvent.click(screen.getByText('クイズで復習'))
    expect(screen.getByText(/苦手だけ復習中（1語）/)).toBeInTheDocument()
    expect(document.querySelector('.quiz .en:not(.today-words .en)')!.textContent).toBe(FIRST()[0].en)
    expect(screen.getByText('1 / 1')).toBeInTheDocument()
  })

  it('設定タブで発音の速さ・音声・画面の色・効果音を変えられ、保存される', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /設定/ }))
    fireEvent.change(screen.getByRole('slider'), { target: { value: '0.7' } })
    fireEvent.click(screen.getByText('イギリス英語'))
    fireEvent.click(screen.getByText('ダーク'))
    fireEvent.click(screen.getByRole('checkbox', { name: '効果音' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(JSON.parse(localStorage.getItem('eitan:settings')!)).toEqual({
      rate: 0.7,
      accent: 'en-GB',
      theme: 'dark',
      sound: false,
      dailyGoal: 20,
      autoSpeak: false,
      cardJaFirst: false,
      largeText: false,
      color: 'blue',
      hideExampleJa: false,
      randomNew: false,
      testDate: '',
      reviewCap: 0,
      easy: false,
      newPerDay: 10,
      voice: '',
      petVoice: true,
    })
    fireEvent.click(screen.getByText('自動'))
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('今日の目標に届いた瞬間にお祝いが出て、閉じられる', () => {
    localStorage.setItem('eitan:settings', JSON.stringify({ dailyGoal: 10 }))
    localStorage.setItem('eitan:today-count', JSON.stringify({ day: dayKey(), count: 9 }))
    render(<App />)
    expect(screen.getByText('🎯 今日の目標 9 / 10 問')).toBeInTheDocument()
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText('今日の目標達成！')).toBeInTheDocument()
    fireEvent.click(screen.getByText('やったね'))
    expect(screen.queryByText('今日の目標達成！')).not.toBeInTheDocument()
    navTo('ホーム')
    expect(screen.getByText('🎯 目標達成！')).toBeInTheDocument()
    expect(toast('🎒 おみやげ')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(souvenirFor(dayKey()).name))).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:souvenirs')!)).toEqual([souvenirFor(dayKey()).id])
    expect(screen.getByLabelText('かざってあるおみやげ 1こ').textContent).toBe(souvenirFor(dayKey()).icon)
    // もう一度答えてもお祝いは出ない
    goCards()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.queryByText('今日の目標達成！')).not.toBeInTheDocument()
  })

  it('初めて正解するとバッジ獲得のお知らせが出て、記録画面のバッジ一覧に並ぶ', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    backToPick() // お知らせは問題の画面をはなれてから出る
    expect(screen.getByText('バッジ獲得！')).toBeInTheDocument()
    expect(screen.getByText('はじめの一歩')).toBeInTheDocument()
    navTo('ホーム')
    fireEvent.click(screen.getByRole('tab', { name: 'コレクション' }))
    expect(screen.getByRole('heading', { name: /^バッジ 1 \// })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:badges')!)).toHaveProperty('first-correct')
    expect(JSON.parse(localStorage.getItem('eitan:totals')!)).toMatchObject({ answers: 1, correct: 1 })
  })

  it('節目のバッジがあるとタマゴがもらえ、相棒を切り替えられる', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 2000 }))
    localStorage.setItem('eitan:badges', JSON.stringify({ 'streak-7': '2026-10-19' }))
    render(<App />)
    expect(screen.getByText('新しい仲間！')).toBeInTheDocument()
    navTo('ホーム')
    fireEvent.click(screen.getByRole('tab', { name: 'あいぼう' }))
    const picks = document.querySelectorAll<HTMLButtonElement>('.party-member')
    expect(picks).toHaveLength(2)
    fireEvent.click(picks[1])
    navTo('ホーム')
    expect(document.querySelector('.monster-name')!.textContent).toContain('ふしぎなタマゴ')
    expect(JSON.parse(localStorage.getItem('eitan:party')!).active).toBe(1)
  })

  it('マイ単語帳に追加して選ぶと、カードの母数に入る', () => {
    render(<App />)
    navTo('ホーム')
    fireEvent.click(screen.getByRole('tab', { name: 'データ' }))
    fireEvent.change(screen.getByLabelText('英語'), { target: { value: 'sunflower' } })
    fireEvent.change(screen.getByLabelText('意味'), { target: { value: 'ひまわり' } })
    fireEvent.click(screen.getByText('追加する'))
    expect(screen.getByText('マイ単語帳（1語）')).toBeInTheDocument()
    navTo('設定')
    fireEvent.click(within(screen.getByRole('group', { name: '単語帳' })).getByRole('button', { name: 'マイ単語帳' }))
    goCards()
    expect(screen.getByLabelText(new RegExp(`定着 0 / ${DEFAULT_N + 1} 語`))).toBeInTheDocument()
  })

  it('相棒に名前をつけられ、保存される', () => {
    render(<App />)
    fireEvent.click(screen.getByLabelText('名前をつける'))
    fireEvent.change(screen.getByLabelText('名前'), { target: { value: 'もっちー' } })
    fireEvent.click(screen.getByText('決定'))
    expect(document.querySelector('.monster-name')!.textContent).toContain('もっちー（ふしぎなタマゴ）')
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].name).toBe('もっちー')
  })

  it('記録画面に直近1週間のグラフが出て、学習すると今日の棒が伸びる', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    navTo('ホーム')
    expect(screen.getByText('この1週間')).toBeInTheDocument()
    expect(screen.getByText('合計 1 問・目標達成 0 日')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:history')!)).toEqual({ [dayKey()]: 1 })
  })

  it('カードの裏で例文を読み上げられる', () => {
    const spoken: string[] = []
    Object.assign(window, {
      SpeechSynthesisUtterance: class {
        text: string
        constructor(t: string) {
          this.text = t
        }
      },
      speechSynthesis: { cancel() {}, speak: (u: { text: string }) => spoken.push(u.text), getVoices: () => [] },
    })
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByLabelText('例文を聞く'))
    expect(spoken).toEqual([FIRST()[0].example])
  })

  it('「まだ」にした単語はすぐには出ず、次の単語に進む', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(document.querySelector('.card .en')!.textContent).toBe(FIRST()[1].en)
  })

  it('単語一覧で検索でき、タップで例文が見える', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('📚 単語一覧・さがす'))
    fireEvent.change(screen.getByLabelText('単語をさがす'), { target: { value: 'library' } })
    expect(screen.getByText('1語')).toBeInTheDocument()
    fireEvent.click(within(document.querySelector('section.word-list') as HTMLElement).getByRole('button', { name: /library/ }))
    expect(document.querySelector('.word-detail .example')?.textContent).toBe('I study at the library after school.')
    fireEvent.click(screen.getByText('← カードにもどる'))
    expect(screen.getByText('意味を見る')).toBeInTheDocument()
  })

  it('単語一覧から1語だけカードで練習できる', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('📚 単語一覧・さがす'))
    fireEvent.change(screen.getByLabelText('単語をさがす'), { target: { value: 'library' } })
    fireEvent.click(within(document.querySelector('section.word-list') as HTMLElement).getByRole('button', { name: /library/ }))
    fireEvent.click(screen.getByText('🃏 この単語をカードで練習'))
    expect(document.querySelector('.card .en')?.textContent).toContain('library')
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText(/カードを一周しました/)).toBeInTheDocument()
  })

  it('苦手単語をカードで復習でき、「覚えた」で苦手から外れる', () => {
    localStorage.setItem('eitan:mistakes', JSON.stringify({ [WORDS[3].id]: 1, [WORDS[5].id]: 2 }))
    render(<App />)
    navTo('ホーム')
    fireEvent.click(screen.getByText('カードで復習'))
    expect(screen.getByText(/苦手カードで復習中（のこり 2語）/)).toBeInTheDocument()
    expect(document.querySelector('.card .en')!.textContent).toBe(WORDS[5].en)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(document.querySelector('.card .en')!.textContent).toBe(WORDS[3].en)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText('苦手カードを一周しました 💪')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:mistakes')!)).toEqual({ [WORDS[5].id]: 1 })
  })

  it('正解でコインがたまり、ショップで買って相棒に着せられる', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 100 }))
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 24, owned: [] })) // +1（正解10回め）+5（ログインボーナス）で30
    localStorage.setItem('eitan:coin-progress', '9') // あと1問で🪙1
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    navTo('ホーム')
    fireEvent.click(screen.getByLabelText('コイン 30枚・ショップを開く'))
    fireEvent.click(screen.getByRole('tab', { name: /きせかえ/ }))
    fireEvent.click(screen.getByText('🪙30で買う'))
    expect(screen.getByLabelText('いまのコイン 0枚')).toBeInTheDocument()
    fireEvent.click(screen.getByText('つける'))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].wear).toBe('ribbon')
    fireEvent.click(screen.getByText('はずす'))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].wear).toBeUndefined()
    fireEvent.click(screen.getByText('← もどる'))
    expect(screen.getByLabelText('今日の課題')).toBeInTheDocument() // ショップを閉じるとホームにもどる
  })

  it('はじめての人には3ステップの案内が出て、終わると二度と出ない', () => {
    localStorage.removeItem('eitan:onboarded')
    const { unmount } = render(<App />)
    expect(screen.getByText('イングリッシュモンスターへようこそ！')).toBeInTheDocument()
    fireEvent.click(screen.getByText('つぎへ'))
    fireEvent.click(screen.getByText('つぎへ'))
    fireEvent.click(screen.getByText('タマゴを受け取る 🥚'))
    expect(screen.queryByRole('dialog', { name: 'はじめての案内' })).not.toBeInTheDocument()
    unmount()
    render(<App />)
    expect(screen.queryByText('イングリッシュモンスターへようこそ！')).not.toBeInTheDocument()
  })

  it('すでに学習データがある人には案内を出さない', () => {
    localStorage.removeItem('eitan:onboarded')
    localStorage.setItem('eitan:progress', '{"apple":{"box":1,"due":"2026-10-21"}}')
    render(<App />)
    expect(screen.queryByText('イングリッシュモンスターへようこそ！')).not.toBeInTheDocument()
  })

  it('ホームの相棒はひとりで動いている', () => {
    render(<App />)
    expect(document.querySelector('.monster-idle')!.getAttribute('data-idle')).toMatch(/walk|sleep/)
  })

  it('秋はホームに落ち葉が舞う', () => {
    render(<App />)
    expect(screen.getByLabelText('季節の演出：落ち葉')).toBeInTheDocument()
  })

  it('相棒をタップするとひとこと話す', () => {
    render(<App />)
    fireEvent.click(screen.getByLabelText('相棒にさわる'))
    expect(screen.getByText('（タマゴの中からコトコト音がする）')).toBeInTheDocument()
  })

  it('相棒を1日5回なでるとごきげんMAXでコインがもらえる', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [] }))
    render(<App />)
    for (let i = 0; i < 5; i++) fireEvent.click(screen.getByLabelText('相棒にさわる'))
    expect(screen.getByText('だいすき！ ごきげんMAX！ 🪙3')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(3)
  })

  it('文字を大きくする設定', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /設定/ }))
    fireEvent.click(screen.getByRole('checkbox', { name: '文字を大きくする' }))
    expect(document.documentElement.style.fontSize).toBe('112.5%')
    fireEvent.click(screen.getByRole('checkbox', { name: '文字を大きくする' }))
    expect(document.documentElement.style.fontSize).toBe('')
  })

  it('ショップでおやつをあげるとXPが入る', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 10, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 10枚・ショップを開く'))
    fireEvent.click(screen.getByRole('tab', { name: /おやつ/ }))
    expect(screen.getByText('💕 好物 XP2倍！')).toBeInTheDocument() // テストの日はクッキーが好物
    fireEvent.click(screen.getByText(/サクサククッキン/))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(40)
    expect(screen.getByLabelText('今日あと2回')).toBeInTheDocument()
    expect(screen.getByText('😋 もぐもぐ')).toBeInTheDocument()
    expect(screen.getAllByText(/サクサク/).length).toBeGreaterThanOrEqual(2) // ボタンとひとこと
  })

  it('おみくじが大吉の日はガチャが🪙5安い', () => {
    const was = Date.now()
    vi.setSystemTime(new Date(2026, 9, 21, 10, 0)) // この日は大吉
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 60, owned: [] }))
    render(<App />)
    navTo('設定')
    expect(screen.getByText('大吉')).toBeInTheDocument()
    navTo('ホーム')
    fireEvent.click(screen.getByLabelText('コイン 60枚・ショップを開く'))
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.5)
    fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
    rnd.mockRestore()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(15)
    vi.setSystemTime(was)
  })

  it('ショップのガチャでタマゴを引くと仲間がふえ、コインがへる', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 60, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 60枚・ショップを開く'))
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.5) // ふつうの色・モチ以外が出る（かぶりボーナスなし）
    fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
    rnd.mockRestore()
    const party = JSON.parse(localStorage.getItem('eitan:party')!)
    expect(party.members).toHaveLength(2)
    expect(party.gacha).toBe(1)
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(10)
    expect(screen.getByText(/が仲間になった！/)).toBeInTheDocument()
    fireEvent.click(screen.getByText('🐣 この子を相棒にして育てる'))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).active).toBe(1)
  })

  it('なかま交換所でおわかれするとコインにかわる', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    localStorage.setItem('eitan:party', JSON.stringify({ members: [{ xp: 0 }, { xp: 0, species: 'fox' }], active: 0, gacha: 1 }))
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [] }))
    render(<App />)
    navTo('ホーム')
    fireEvent.click(screen.getByRole('tab', { name: 'あいぼう' }))
    fireEvent.click(screen.getByLabelText(/とおわかれする/))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members).toHaveLength(1)
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(12)
  })

  it('まだ生まれていない仲間をあたためるとXPが入る', () => {
    localStorage.setItem('eitan:party', JSON.stringify({ members: [{ xp: 500 }, { xp: 0 }], active: 0 }))
    render(<App />)
    navTo('ホーム')
    fireEvent.click(screen.getByRole('tab', { name: 'あいぼう' }))
    fireEvent.click(screen.getByLabelText(/をあたためる/))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[1].xp).toBe(2)
    expect(screen.getByText(/あたためる ×4/)).toBeInTheDocument()
  })

  it('金の宝箱をあけるとチケットとコイン', () => {
    localStorage.setItem('eitan:keys', '3')
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [] }))
    render(<App />)
    navTo('ボス部屋')
    fireEvent.click(screen.getByText(/金の宝箱をあける/))
    const w = JSON.parse(localStorage.getItem('eitan:wallet')!)
    expect(w.coins).toBe(30)
    expect(w.tickets).toBe(1)
    expect(localStorage.getItem('eitan:keys')).toBe('0')
  })

  it('スーパーレア以上の仲間は一覧で光る', () => {
    localStorage.setItem('eitan:party', JSON.stringify({ members: [{ xp: 0 }, { xp: 0, kind: 'niji' }, { xp: 0, kind: 'sakura' }], active: 0 }))
    render(<App />)
    navTo('ホーム')
    fireEvent.click(screen.getByRole('tab', { name: 'あいぼう' }))
    expect(document.querySelectorAll('.party li.shine')).toHaveLength(1)
    expect(document.querySelector('.party li.shine.r-UR')).not.toBeNull()
  })

  it('記録の部屋に自己ベストが出る', () => {
    localStorage.setItem('eitan:endless', '7')
    render(<App />)
    navTo('ホーム')
    fireEvent.click(screen.getByRole('tab', { name: 'コレクション' }))
    expect(screen.getByText('🏆 記録の部屋')).toBeInTheDocument()
    expect(screen.getByText('7階')).toBeInTheDocument()
    expect([...document.querySelectorAll('.records-value')].some((e) => /^0(\D|$)/.test(e.textContent!))).toBe(false) // まだ0の記録は出さない
  })

  it('ボスをたおした回数で相棒に二つ名がつく', () => {
    localStorage.setItem('eitan:boss-book', JSON.stringify({ ヤミモチ: { wins: 10, best: 'A', first: '2026-10-01', look: { name: 'ヤミモチ', color: '#000', line: '#000', eye: '#fff' } } }))
    render(<App />)
    expect(screen.getByText('⚔️ ボスハンター')).toBeInTheDocument()
  })

  it('あいぼうの「ごきげん」メーターは出さない（オーナーの要望）', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 10, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('相棒にさわる'))
    expect(document.querySelector('.mood-meter')).toBeNull()
    expect(screen.queryByText(/💗 ごきげん/)).toBeNull()
  })

  it('ごきげんMAXの日はXPが1.2倍', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 10, owned: [] }))
    localStorage.setItem('eitan:mood-meter', JSON.stringify({ day: dayKey(), points: 20 }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 10枚・ショップを開く'))
    fireEvent.click(screen.getByRole('tab', { name: /おやつ/ }))
    fireEvent.click(screen.getByText(/サクサククッキン/))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(48) // 好物40×1.2
  })

  it('3連ガチャで仲間が3匹ふえ、コインが3回分へる', () => {
    localStorage.setItem('eitan:gacha-trio', JSON.stringify(SPECIES.map((sp) => sp.id))) // トリオボーナスは別のテストで
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 150, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 150枚・ショップを開く'))
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.5) // ふつうの色・モチ以外（かぶりなし）
    fireEvent.click(screen.getByRole('button', { name: /3連ガチャ/ }))
    rnd.mockRestore()
    const party = JSON.parse(localStorage.getItem('eitan:party')!)
    expect(party.members).toHaveLength(4)
    expect(party.gacha).toBe(3)
    const coins = JSON.parse(localStorage.getItem('eitan:wallet')!).coins
    expect([0, 15, 30]).toContain(coins) // 2回目以降は同じ子がいるのでかぶりボーナスが入る
    expect(JSON.parse(localStorage.getItem('eitan:gacha-stats')!).total).toBe(3)
  })

  it('通算7回目のガチャはラッキーナンバーで🪙7もらえる', () => {
    localStorage.setItem('eitan:gacha-trio', JSON.stringify(SPECIES.map((sp) => sp.id))) // トリオボーナスは別のテストで
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 150, owned: [] }))
    localStorage.setItem('eitan:gacha-stats', JSON.stringify({ total: 6, N: 6, R: 0, SR: 0, UR: 0 }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 150枚・ショップを開く'))
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.5)
    fireEvent.click(screen.getByRole('button', { name: /3連ガチャ/ }))
    rnd.mockRestore()
    expect(screen.getByText(/🍀1?7回目 🪙7/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:gacha-stats')!).total).toBe(9)
    const coins = JSON.parse(localStorage.getItem('eitan:wallet')!).coins
    expect([7, 22, 37]).toContain(coins)
  })

  it('今日のルーレットは1日1回まわせて、当たりがもらえる', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [] }))
    render(<App />)
    navTo('設定')
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.8) // 🪙10
    fireEvent.click(screen.getByRole('button', { name: /今日のルーレットをまわす/ }))
    rnd.mockRestore()
    expect(screen.getByText('🎉 🪙10 が当たった！')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /今日のルーレットをまわす/ })).toBeNull()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(10)
    expect(localStorage.getItem('eitan:roulette')).toBe('2026-10-20')
  })

  it('5連ガチャはレア以上が1つ確定', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 300, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 300枚・ショップを開く'))
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.5) // ふつうなら全部ふつうの色
    fireEvent.click(screen.getByRole('button', { name: /5連ガチャ/ }))
    rnd.mockRestore()
    const st = JSON.parse(localStorage.getItem('eitan:gacha-stats')!)
    expect(st.total).toBe(5)
    expect(st.N).toBe(4)
    expect(st.R + st.SR + st.UR).toBe(1)
  })

  it('3連・5連ガチャは横にならび、5連には「レア以上1つ確定」と値段が出る', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 300, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 300枚・ショップを開く'))
    const row = document.querySelector('.gacha-multi')!
    expect(row.querySelectorAll('.gacha-btn')).toHaveLength(2)
    expect(screen.getByRole('button', { name: /5連ガチャ/ }).textContent).toMatch(/レア以上1つ確定🪙250/)
  })

  it('おさんぽは1日1回で、単語を拾ってきて🪙3', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [] }))
    render(<App />)
    navTo('設定')
    fireEvent.click(screen.getByRole('button', { name: /おさんぽに行く/ }))
    expect(screen.getByText(/を拾ってきた！ 🪙3/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /おさんぽに行く/ })).toBeNull()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(3)
    expect(localStorage.getItem('eitan:walk')).toBe('2026-10-20')
    expect(screen.getByText('📔 おさんぽ日記（1こ）')).toBeInTheDocument()
  })

  it('ガチャのスロットがそろうとおまけ🪙5', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 60, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 60枚・ショップを開く'))
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.01)
    fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
    rnd.mockRestore()
    expect(screen.getByLabelText('スロットがそろった')).toHaveTextContent('そろった！ 🪙5')
    expect(screen.getByText(/ミステリーカプセル！/)).toBeInTheDocument() // 乱数0.01なのでミステリーにもなる
    const writeText = vi.fn(() => Promise.resolve())
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
    fireEvent.click(screen.getByText('📋 結果をコピー'))
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('イングリッシュモンスターのガチャで'))
  })

  it('相棒をタップするとポーズがかわり、全部見ると称号', () => {
    render(<App />)
    for (let i = 0; i < 6; i++) fireEvent.click(screen.getByLabelText('相棒にさわる'))
    expect(JSON.parse(localStorage.getItem('eitan:poses-seen') ?? '[]')).toHaveLength(6)
    // ふえていく数（ポーズ n / N・なでなでスタンプ）は画面に出さない（オーナーの要望）
    expect(screen.queryByText(/ポーズ \d+ \/ \d+/)).toBeNull()
  })

  it('ガチャポイントが20たまるとスーパーレア以上と交換できる', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 60, owned: [] }))
    localStorage.setItem('eitan:gacha-points', '19')
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 60枚・ショップを開く'))
    expect(screen.queryByText('🎫 交換する')).toBeNull()
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.5)
    fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
    fireEvent.click(screen.getByText('🎫 交換する'))
    rnd.mockRestore()
    expect(screen.getByText(/スーパーレア！/)).toBeInTheDocument()
    expect(localStorage.getItem('eitan:gacha-points')).toBe('0')
  })

  it('シール帳が全部そろうと🎟2', async () => {
    const { STICKERS } = await import('./stickers')
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 60, owned: [] }))
    localStorage.setItem('eitan:stickers', JSON.stringify({ got: STICKERS.filter((x) => x !== '⚽'), rewarded: false }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 60枚・ショップを開く'))
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.5) // シールは ⚽
    fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
    rnd.mockRestore()
    expect(screen.getByText('🏷 おまけシール ⚽')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).tickets).toBe(2)
    expect(JSON.parse(localStorage.getItem('eitan:stickers')!).rewarded).toBe(true)
  })

  it('きのう目標を達成していたら、相棒からおみやげのシール', () => {
    localStorage.setItem('eitan:partner-gift', '2026-10-19')
    render(<App />)
    navTo('設定')
    fireEvent.click(screen.getByText(/からおみやげがとどいてる！/))
    expect(screen.getByText(/のシールをくれた！/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:stickers')!).got).toHaveLength(1)
    expect(localStorage.getItem('eitan:partner-gift')).toBe('')
  })

  it('月に1回の福袋で3連ガチャとバトルアイテムがもらえる', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 250, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 250枚・ショップを開く'))
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.5)
    fireEvent.click(screen.getByRole('button', { name: /今月の福袋/ }))
    rnd.mockRestore()
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members).toHaveLength(4)
    const bag = JSON.parse(localStorage.getItem('eitan:battle-items')!)
    expect([bag.bomb, bag.charm, bag.clock]).toEqual([1, 1, 1])
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBeLessThanOrEqual(250 - 200 + 30 + 5 * 3)
    expect(localStorage.getItem('eitan:lucky-bag')).toBe('2026-10')
    expect(screen.queryByRole('button', { name: /今月の福袋/ })).toBeNull()
  })

  it('なでなでスタンプが10こたまるとチケット', () => {
    localStorage.setItem('eitan:pet-stamps', JSON.stringify({ n: 9, last: '2026-10-19' }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('相棒にさわる'))
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).tickets).toBe(1)
    expect(screen.queryByLabelText(/なでなでスタンプ/)).toBeNull()
  })

  it('おるすばん中の仲間がかえると知らせが出る', () => {
    localStorage.setItem('eitan:party', JSON.stringify({ active: 0, gacha: 1, members: [{ xp: 0 }, { xp: 19, name: 'タマ' }] }))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[1].xp).toBe(20)
    backToPick() // お知らせは問題の画面をはなれてから出る
    for (let i = 0; i < 6 && !screen.queryByText('おるすばん中のタマが「ちびモチ」にかえった！'); i++) {
      const t = document.querySelector('.mission-toast')
      if (t) fireEvent.click(t)
    }
    expect(screen.getByText('おるすばん中のタマが「ちびモチ」にかえった！')).toBeInTheDocument()
  })

  it('3問続けて正解すると相棒が顔を出して励ましてくれる（小さいうちは日本語）', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    for (let i = 0; i < 3; i++) {
      expect(document.querySelector('.pet-cheer')).toBeNull()
      fireEvent.click(screen.getByText('意味を見る'))
      fireEvent.click(screen.getByText('覚えた'))
    }
    backToPick() // お知らせは問題の画面をはなれてから出る
    const c = document.querySelector('.pet-cheer')!
    expect(c).not.toBeNull()
    expect(c.querySelector('.pet-cheer-text')!.textContent).toMatch(/[ぁ-んァ-ン]/)
  })

  it('ステージやクイズのタブを押すと、ホームが消えてその画面だけになり、いちばん上にもどる', async () => {
    const scroll = vi.fn()
    window.scrollTo = scroll as unknown as typeof window.scrollTo
    render(<App />)
    expect(screen.getByText('🎰 ガチャをひく！')).toBeInTheDocument()
    navTo('ボス部屋')
    expect(screen.queryByText('📊 記録')).toBeNull()
    expect(screen.queryByText('🎰 ガチャをひく！')).not.toBeInTheDocument()
    await new Promise((r) => requestAnimationFrame(() => r(null)))
    expect(scroll).toHaveBeenCalledWith({ top: 0 })
    navTo('ホーム')
    expect(document.querySelector('details.home-play')).toBeNull()
  })

  it('相棒のおたんじょう日にお祝いするとガチャチケットがもらえる（1年に1回）', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 30 }))
    localStorage.setItem('eitan:partner-birthday', JSON.stringify({ day: '2025-' + dayKey().slice(5), lastYear: 0 }))
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByText(/おたんじょう日！（1さい）/))
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).tickets).toBe(1)
    expect(screen.queryByText(/おたんじょう日！（1さい）/)).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:partner-birthday')!).lastYear).toBe(Number(dayKey().slice(0, 4)))
  })

  it('問題の画面でレベルが上がると、上のバーの右はしに小さな「⬆ Lv.N」が出る（問題をかくさない）', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 45 }))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    playMini()
    const en = document.querySelector('.quiz .en:not(.today-words .en)')!.textContent
    const word = WORDS.find((w) => w.en === en)!
    // 「天気」などテーマで練習のボタンと同じ名前があるので、クイズの選択肢の中からえらぶ
    fireEvent.click(within(document.querySelector<HTMLElement>('.quiz .choices')!).getByRole('button', { name: word.ja }))
    expect(document.querySelector('.lvup-banner')).toBeNull()
    expect(document.querySelector('.play-bar .play-lvup')?.textContent).toMatch(/⬆ Lv\.\d+/)
    // 2レベルごとに攻撃力が上がる（レベル2になったら ⚔+1）
    if (document.querySelector('.play-bar .play-lvup')!.textContent!.includes('Lv.2')) expect(document.querySelector('.play-bar .play-lvup')!.textContent).toContain('⚔+1')
  })

  it('問題の画面では、お知らせ（バッジ・なつき度など）や相棒のふきだしは出さず、えらぶ画面にもどってから出す', () => {
    render(<App />)
    goCards()
    playMini()
    for (let i = 0; i < 3; i++) {
      const en = document.querySelector('.quiz .en:not(.today-words .en)')!.textContent
      const word = WORDS.find((w) => w.en === en)!
      fireEvent.click(within(document.querySelector<HTMLElement>('.quiz .choices')!).getByRole('button', { name: word.ja }))
      expect(document.querySelector('.badge-toast')).toBeNull()
      expect(document.querySelector('.pet-cheer')).toBeNull()
      fireEvent.click(screen.getByText('次へ'))
    }
  })

  it('単語のステージ（中1〜会話）は単語ゲームの「🗺 ステージ」にあり、ボス部屋にはボスだけが出る', () => {
    render(<App />)
    navTo('ボス部屋')
    expect(screen.getByRole('heading', { name: '👹 ボスに挑戦' })).toBeInTheDocument()
    expect(document.querySelector('.stage-levels')).toBeNull()
    expect(screen.queryByText(/つづきから（/)).toBeNull()
    navTo('単語ゲーム')
    fireEvent.click(screen.getByRole('tab', { name: '🗺 ステージ' }))
    expect(screen.getByRole('heading', { name: '🗺 単語ステージ' })).toBeInTheDocument()
    expect(document.querySelector('.stage-levels')).not.toBeNull()
    expect(screen.queryByRole('button', { name: /エンドレスの塔/ })).toBeNull()
  })

  it('文法ドリル（複数形など）は文法チャレンジから開けて、← 文法チャレンジで戻れる', () => {
    render(<App />)
    navTo('文法チャレンジ')
    fireEvent.click(within(screen.getByRole('group', { name: '文法ドリル' })).getByText('👥 複数形'))
    expect(screen.getByText('← 文法チャレンジ')).toBeInTheDocument()
    expect(screen.queryByRole('group', { name: '文法ドリル' })).toBeNull()
    fireEvent.click(screen.getByText('← 文法チャレンジ'))
    expect(screen.getByRole('group', { name: '文法ドリル' })).toBeInTheDocument()
  })

  it('記録の下に相棒のきもちのコメントは出さない（オーナーの要望）', () => {
    render(<App />)
    navTo('ホーム')
    expect(screen.queryByLabelText(/のきもち日記$/)).toBeNull()
    expect(screen.queryByText(/ちょっとさみしい/)).toBeNull()
  })

  it('ホームのガチャボタンには何が出るかを書かない（お楽しみ）', async () => {
    const { pickupOf } = await import('./monster')
    render(<App />)
    expect(screen.getByText('なにが出るかはお楽しみ！')).toBeInTheDocument()
    expect(screen.queryByText(new RegExp(`今日のピックアップ：${pickupOf(dayKey()).name}`))).toBeNull()
  })

  it('同じキャラが3体そろうとトリオボーナス🪙30（1回だけ）', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 150, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('コイン 150枚・ショップを開く'))
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.5)
    fireEvent.click(screen.getByRole('button', { name: /3連ガチャ/ }))
    rnd.mockRestore()
    expect(JSON.parse(localStorage.getItem('eitan:gacha-trio')!).length).toBe(1)
    expect(screen.getAllByText(/トリオボーナス 🪙30/).length).toBeGreaterThan(0)
  })

  it('ホームに「ひとこと英語日記」「今日のミッション」「おなかすいた」「今日のチャレンジ」は出さない（オーナー要望）', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 100 }))
    render(<App />)
    navTo('ホーム')
    expect(screen.queryByText(/ひとこと英語日記/)).toBeNull()
    expect(screen.queryByText(/今日のミッション/)).toBeNull()
    expect(screen.queryByText(/おなかすいた/)).toBeNull()
    expect(screen.queryByText(/今日のチャレンジ：/)).toBeNull()
    expect(document.querySelector('.boss-go-btn')!.textContent).toContain('今日のボスに挑む') // 今日のボスは強そうなボタン
    expect(document.querySelectorAll('.today-task-grid .today-task')).toHaveLength(3) // 今日の課題はゲームのタイル
  })
  it('ホームの「今日のボスに挑む」でステージ画面の今日のボス戦がすぐ始まる', () => {
    render(<App />)
    fireEvent.click(screen.getByText(/⚔ 今日のボスに挑む/))
    expect(screen.getByText(/⚔️ 今日のボス ★/)).toBeInTheDocument()
    expect(document.querySelector('.boss')).not.toBeNull()
    expect(document.querySelector('details.home-play')).toBeNull()
  })

  it('おさんぽ日記の単語が3つ以上あると「おさんぽクイズ」で3問とける', () => {
    const d = (en: string, ja: string) => ({ day: '2026-10-19', en, ja, place: '公園' })
    localStorage.setItem('eitan:walk-diary', JSON.stringify([d('dog', '犬'), d('cat', 'ねこ'), d('tree', '木')]))
    render(<App />)
    navTo('設定')
    fireEvent.click(screen.getByText('🐾 おさんぽクイズ（拾った単語から3問）'))
    const ja: Record<string, string> = { dog: '犬', cat: 'ねこ', tree: '木' }
    for (let i = 0; i < 3; i++) {
      const en = document.querySelector('.walk-quiz-q strong')!.textContent!
      fireEvent.click(screen.getByRole('button', { name: ja[en] }))
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('🐾 おさんぽクイズ 3 / 3 問正解！')).toBeInTheDocument()
  })

  it('自動発音がオンでも、アプリを開いただけではカードの音声が流れない（答えたあとの次のカードからは流れる）', () => {
    const spoken: string[] = []
    const had = 'speechSynthesis' in window
    Object.assign(window, {
      SpeechSynthesisUtterance: class {
        text: string
        constructor(t: string) {
          this.text = t
        }
      },
      speechSynthesis: { cancel() {}, speak: (u: { text: string }) => spoken.push(u.text), getVoices: () => [] },
    })
    localStorage.setItem('eitan:settings', JSON.stringify({ autoSpeak: true }))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    expect(spoken).toEqual([])
    fireEvent.click(screen.getByText('意味を見る'))
    expect(spoken.length).toBe(1)
    fireEvent.click(screen.getByText('まだ'))
    expect(spoken.length).toBe(2)
    if (!had) {
      delete (window as { speechSynthesis?: unknown }).speechSynthesis
      delete (window as { SpeechSynthesisUtterance?: unknown }).SpeechSynthesisUtterance
    }
  })

  it('ホームに単語・文法・読解の3体がいて、文法の答えは文法のなかま（動物）が育つ', async () => {
    const { GRAMMAR } = await import('./grammar')
    render(<App />)
    const row = screen.getByLabelText('育てているなかま')
    expect(row.querySelectorAll('.buddy-card')).toHaveLength(3)
    expect(screen.getByLabelText('チームレベル').textContent).toMatch(/チームLv\.\d+「.+チーム」/)
    expect(screen.getByRole('progressbar', { name: '次の称号まで' })).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('チームレベル'))
    const titles = screen.getByLabelText('チームの称号の一覧')
    expect(titles.textContent).toContain('かけだしチーム')
    expect(titles.textContent).toContain('？？？') // まだの称号はひみつ
    expect(row.textContent).toMatch(/単語.*文法.*読解/)
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0)
    fireEvent.click(within(row).getByLabelText(/文法のなかま/))
    fireEvent.click(screen.getByText('✏️ すぐ練習（5問）'))
    rnd.mockRestore()
    const q = GRAMMAR[0].questions[0]
    fireEvent.click(screen.getAllByRole('button', { name: q.choices[q.answer] }).find((b) => !b.closest('.today-grammar'))!) // 上の今日の文法のボタンではなく、練習の問題のボタン
    expect(JSON.parse(localStorage.getItem('eitan:buddies')!).grammar.xp).toBeGreaterThan(0)
    expect(JSON.parse(localStorage.getItem('eitan:party') ?? '{"members":[{"xp":0}]}').members[0].xp ?? 0).toBe(0)
  })

  it('読解ステージはむずかしさを選べて（かんたん〜京大・TOEFL/IELTS）、ミニゲームには読解がない', () => {
    localStorage.clear()
    render(<App />)
    navTo('読解ステージ')
    expect(screen.getByRole('heading', { name: /^読解ミニ/ })).toBeInTheDocument() // はじめは かんたん
    fireEvent.click(screen.getByRole('tab', { name: /^難関大/ }))
    expect(screen.getAllByText(/The Value of Boredom/).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /難関大の読解/ })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /^難関大/ }).textContent).toMatch(/0\/59本/)
    expect(screen.queryByText(/今日の1本/)).toBeNull() // むずかしさでしぼったときは、ほかのレベルの長文へのボタンを出さない
    expect(screen.queryByText(/中3チャレンジ/)).toBeNull()
    expect(within(screen.getByLabelText('読解ゲーム')).getByRole('button', { name: /おすすめ/ })).toBeInTheDocument() // そのレベルの中から日がわり（読解ゲームのタイル）
    fireEvent.click(screen.getByRole('tab', { name: /^TOEFL・IELTS/ }))
    expect(screen.getAllByText(/Partners on the Reef/).length).toBeGreaterThan(0)
    expect(screen.queryByText(/The Value of Boredom/)).toBeNull()
    expect(localStorage.getItem('eitan:read-level')).toBe('toefl')
    goMini()
    fireEvent.click(screen.getByText(/ミニゲームをえらぶ/))
    expect(screen.queryByRole('button', { name: /長文読解/ })).toBeNull()
  })

  it('文法のなかまがタマゴからかえると、全画面の進化演出が出る', async () => {
    const { GRAMMAR } = await import('./grammar')
    localStorage.setItem('eitan:buddies', JSON.stringify({ grammar: { xp: 19 }, reading: { xp: 0 } }))
    render(<App />)
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0)
    navTo('文法チャレンジ')
    fireEvent.click(screen.getByText('✏️ すぐ練習（5問）'))
    rnd.mockRestore()
    const q = GRAMMAR[0].questions[0]
    fireEvent.click(screen.getAllByRole('button', { name: q.choices[q.answer] }).find((b) => !b.closest('.today-grammar'))!) // 上の今日の文法のボタンではなく、練習の問題のボタン
    expect(screen.getByRole('dialog', { name: 'なかまの進化' }).textContent).toContain('タマゴがかえった！')
    expect(screen.getByRole('dialog', { name: 'なかまの進化' }).textContent).toContain('お祝い 🪙10')
    expect(document.querySelector('.buddy-evolve .evo-name')?.textContent).toBeTruthy()
  })

  it('ホームの目立つ「ガチャをひく」ボタンでガチャ（ショップ）が開く', () => {
    render(<App />)
    fireEvent.click(screen.getByText('🎰 ガチャをひく！'))
    expect(document.querySelector('details.home-play')).toBeNull()
    expect(screen.getAllByText(/ガチャ/).length).toBeGreaterThan(1)
  })

  it('ホームに「きょうのあそび」はなく、今日の単語と今日の文法がある（あそびは設定のいちばん下のおまけへ。ゲーム画面にも出ない）', () => {
    render(<App />)
    expect(document.querySelector('details.home-play')).toBeNull()
    expect(screen.getByLabelText('今日の課題')).toBeInTheDocument()
    expect(screen.queryByLabelText('今日の文法')).toBeNull() // 今日の文法はホームではなく文法チャレンジのいちばん上
    expect(screen.queryByText('意味を見る')).toBeNull() // 今日の単語はホームではなく単語ゲームのページ
    // ホームは今日の課題のすぐ下が記録
    expect(screen.getByLabelText('今日の課題').nextElementSibling!.textContent).toContain('📊 記録')
    goMini()
    expect(screen.getByRole('button', { name: /^今日の課題（単語）：/ })).toBeInTheDocument()
    goCards()
    expect(screen.getByText('意味を見る')).toBeInTheDocument() // 単語ゲームのいちばん上は今日の課題（単語）
    navTo('文法チャレンジ')
    fireEvent.click(screen.getByRole('button', { name: /^今日の課題（文法）：/ })) // 文法チャレンジの上は今日の課題（文法）のボタン
    expect(screen.getByLabelText('今日の文法')).toBeInTheDocument() // 押すと今日の文法の問題が出る
    navTo('単語ゲーム')
    expect(document.querySelector('details.home-play')).toBeNull()
    navTo('文法チャレンジ')
    expect(document.querySelector('details.home-play')).toBeNull()
    navTo('設定')
    const d = document.querySelector('details.home-play') as HTMLDetailsElement
    expect(d.open).toBe(false)
    expect(d.querySelector('summary')!.textContent).toMatch(/おまけのあそび/)
    expect(d.textContent).toMatch(/おみくじ/)
  })

  it('ドラゴンのタマゴがかえると、進化の画面にドラゴンの名前が出る', () => {
    localStorage.setItem('eitan:party', JSON.stringify({ active: 0, gacha: 1, members: [{ xp: 18, species: 'dragon' }] }))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByRole('dialog', { name: '進化' })).toHaveTextContent('ちびドラ')
  })

  it('記録画面に復習の予定が出る（「覚えた」の単語は明日）', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    navTo('ホーム')
    expect(screen.getByText('明日 1語')).toBeInTheDocument()
  })

  it('カードの☆でお気に入りにして、記録画面からお気に入りだけ復習できる', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByLabelText('お気に入り'))
    expect(JSON.parse(localStorage.getItem('eitan:favorites')!)).toEqual([FIRST()[0].id])
    navTo('ホーム')
    expect(screen.getByText('★ お気に入り（1語）')).toBeInTheDocument()
    const favSection = screen.getByText('★ お気に入り（1語）').nextElementSibling!
    fireEvent.click(favSection.querySelector('button')!) // カードで復習
    expect(screen.getByText(/お気に入りカードで復習中/)).toBeInTheDocument()
    expect(document.querySelector('.card .en')!.textContent).toBe(FIRST()[0].en)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText('お気に入りカードを一周しました 💪')).toBeInTheDocument()
  })

  it('テーマカラーを変えられる', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /設定/ }))
    fireEvent.click(screen.getByText('ピンク'))
    expect(document.documentElement.style.getPropertyValue('--accent')).toBe('#db2777')
    fireEvent.click(screen.getByText('あお'))
    expect(document.documentElement.style.getPropertyValue('--accent')).toBe('')
  })

  it('今日の分が終わったら「もう5語おぼえる」で新しい単語を追加できる', () => {
    localStorage.setItem('eitan:daily-new', JSON.stringify({ day: dayKey(), count: 10 }))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    expect(screen.getByText('今日の学習は完了です 🎉 また明日！')).toBeInTheDocument()
    fireEvent.click(screen.getByText('もう5語おぼえる'))
    expect(screen.getByLabelText(/今日の残り 5 語/)).toBeInTheDocument()
    expect(screen.getByText('意味を見る')).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByLabelText(/今日の残り 4 語/)).toBeInTheDocument()
  })

  it('設定で1日の新しい単語の数を変えられる', () => {
    localStorage.setItem('eitan:settings', JSON.stringify({ newPerDay: 15 }))
    localStorage.setItem('eitan:daily-new', JSON.stringify({ day: dayKey(), count: 10 }))
    render(<App />)
    expect(screen.queryByText('今日の学習は完了です 🎉 また明日！')).not.toBeInTheDocument()
    goCards()
    expect(screen.getByLabelText(/今日の残り 5 語/)).toBeInTheDocument()
  })

  it('記録画面に「今日はじめて学んだ単語」が出る', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    const en = document.querySelector('.card .en')!.textContent!
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    navTo('ホーム')
    expect(screen.getByText('🌱 今日はじめて学んだ単語（1語）')).toBeInTheDocument()
    expect(screen.getByRole('list', { name: '今日はじめて学んだ単語' }).textContent).toContain(en.replace(/[🔊🐢]/gu, '').trim())
  })

  it('今週学んだ単語をクイズでおさらいできる', () => {
    const p = Object.fromEntries(WORDS.slice(0, 5).map((w) => [w.id, { box: 1, due: '2099-01-01', first: '2026-10-19' }]))
    localStorage.setItem('eitan:progress', JSON.stringify(p))
    render(<App />)
    navTo('単語ゲーム')
    fireEvent.click(screen.getByRole('button', { name: '今週の単語5語' }))
    expect(screen.getByText(/今週学んだ単語だけ復習中（5語）/)).toBeInTheDocument()
  })

  it('1週間前に学んだ単語をクイズでたしかめられる', () => {
    const p = Object.fromEntries(WORDS.slice(0, 4).map((w) => [w.id, { box: 2, due: '2099-01-01', first: '2026-10-13' }]))
    localStorage.setItem('eitan:progress', JSON.stringify(p))
    render(<App />)
    navTo('単語ゲーム')
    fireEvent.click(screen.getByRole('button', { name: '1週間前の単語4語' }))
    expect(screen.getByText(/1週間前に学んだ単語だけ復習中（4語）/)).toBeInTheDocument()
  })

  it('単語ゲームの「テーマで練習」で、その仲間の単語をカードで練習できる', () => {
    render(<App />)
    navTo('単語ゲーム')
    fireEvent.click(screen.getByText('テーマで練習'))
    fireEvent.click(within(document.querySelector<HTMLElement>('.theme-practice')!).getByRole('button', { name: '動物' }))
    expect(screen.getByText(/選んだ単語のカードで復習中/)).toBeInTheDocument()
  })

  it('「テーマで練習」はクイズでもできる', () => {
    render(<App />)
    navTo('単語ゲーム')
    fireEvent.click(screen.getByText('テーマで練習'))
    fireEvent.click(screen.getByRole('button', { name: '問題をとく' }))
    fireEvent.click(within(document.querySelector<HTMLElement>('.theme-practice')!).getByRole('button', { name: '動物' }))
    expect(screen.getByText(/選んだ単語だけ復習中/)).toBeInTheDocument()
  })

  it('単語のおさらい（テーマで練習）は記録ではなく単語ゲームのミニゲームの下にある', () => {
    render(<App />)
    navTo('ホーム')
    expect(screen.queryByText('テーマで練習')).toBeNull()
    expect(screen.queryByRole('button', { name: '単語一覧・さがす' })).toBeNull()
    navTo('単語ゲーム')
    expect(within(screen.getByLabelText('単語のおさらい')).getByText('テーマで練習')).toBeInTheDocument()
  })

  it('記録画面に、定着した単語の数のグラフが出る', () => {
    const p = Object.fromEntries(WORDS.slice(0, 7).map((w) => [w.id, { box: 3, due: '2099-01-01' }]))
    localStorage.setItem('eitan:progress', JSON.stringify(p))
    render(<App />)
    navTo('ホーム')
    expect(screen.getByRole('img', { name: '定着した単語の数のグラフ（今日 7語）' })).toBeInTheDocument()
  })

  it('記録画面のカレンダーに今日の学習が印される', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    navTo('ホーム')
    const d = Number(dayKey().slice(8))
    expect(screen.getByLabelText(`${d}日 1問`)).toHaveClass('studied')
    expect(screen.getByText('今月 1日 学習しました')).toBeInTheDocument()
  })

  it('はじめての案内で学年を選ぶと単語帳が変わる', () => {
    localStorage.removeItem('eitan:onboarded')
    render(<App />)
    fireEvent.click(screen.getByText('つぎへ'))
    fireEvent.click(screen.getByText('中学1年'))
    expect(JSON.parse(localStorage.getItem('eitan:levels')!)).toEqual(['中1', '曜日・月', 'テーマ別', '数', '色・形', '会話'])
  })

  it('設定で学年から単語帳を選びなおせる', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /設定/ }))
    fireEvent.click(screen.getByText('高校生'))
    expect(JSON.parse(localStorage.getItem('eitan:levels')!)).toEqual(['中3', '高校基礎', '熟語'])
    expect(screen.getByText(/高校生向けにしました/)).toBeInTheDocument()
    // 学年は今日の課題・読解のむずかしさにも使う
    expect(localStorage.getItem('eitan:grade')).toBe('hs')
    expect(localStorage.getItem('eitan:read-level')).toBe('univ')
  })

  it('お休みチケットを買うと、1日休んでも連続日数がつながる', () => {
    const d = new Date()
    d.setDate(d.getDate() - 2)
    localStorage.setItem('eitan:streak', JSON.stringify({ last: dayKey(d), count: 4 }))
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 60, owned: [] }))
    render(<App />)
    expect(screen.getByLabelText('連続学習 0 日')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('コイン 60枚・ショップを開く'))
    fireEvent.click(screen.getByRole('tab', { name: /アイテム/ }))
    fireEvent.click(screen.getByText('🎫 🪙50で買う'))
    expect(screen.getByLabelText('連続学習 4 日')).toBeInTheDocument()
    fireEvent.click(screen.getByText('← もどる'))
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(screen.getByLabelText('連続学習 5 日')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).freezes).toBe(0)
  })

  it('その日はじめて開いたとき、期日の来た復習があればお知らせが出る', () => {
    localStorage.setItem('eitan:progress', JSON.stringify({ [WORDS[2].id]: { box: 1, due: '2000-01-01' } }))
    const { unmount } = render(<App />)
    expect(screen.getByText(/今日の復習が 1語 あります/)).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('とじる'))
    expect(screen.queryByText(/今日の復習が/)).not.toBeInTheDocument()
    unmount()
    render(<App />)
    expect(screen.queryByText(/今日の復習が/)).not.toBeInTheDocument()
  })

  it('週間チャレンジを達成するとコインとXP', () => {
    localStorage.setItem('eitan:history', JSON.stringify({ [dayKey()]: 99 }))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    backToPick() // お知らせは問題の画面をはなれてから出る
    expect(toast(/週間チャレンジ達成！/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(55) // 50 + ログインボーナス5
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(61)
  })

  it('記録画面に単語帳ごとの定着が出る', () => {
    localStorage.setItem('eitan:progress', JSON.stringify({ [WORDS[0].id]: { box: 3, due: '2099-01-01' } }))
    render(<App />)
    navTo('ホーム')
    expect(screen.getByLabelText('中1の定着')).toHaveAttribute('aria-valuenow', '1')
  })

  it('記録画面に相棒のプロフィール（出会った日・学び方の割合）', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    navTo('ホーム')
    fireEvent.click(screen.getByRole('tab', { name: 'あいぼう' }))
    expect(screen.getByText('相棒のプロフィール')).toBeInTheDocument()
    const prof = document.querySelector('.profile')!
    expect(prof.textContent).toContain(dayKey())
    expect(prof.textContent).toContain('100%')
  })

  it('その日はじめての学習でログインボーナス🪙5（2回目からはなし）', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    backToPick() // お知らせは問題の画面をはなれてから出る
    expect(screen.getByText('ログインボーナス')).toBeInTheDocument()
    goCards()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(5)
  })

  it('朝5〜10時にその日はじめて学習すると早起きボーナス🪙3', () => {
    vi.setSystemTime(new Date(2026, 9, 20, 7))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    backToPick() // お知らせは問題の画面をはなれてから出る
    expect(screen.getByText(/早起きえらい！ 🪙8/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(8)
  })

  it('単語帳の選択はホーム・単語ゲームにはなく、設定で選ぶ', () => {
    render(<App />)
    expect(screen.queryByRole('group', { name: '単語帳' })).not.toBeInTheDocument()
    navTo('単語ゲーム')
    expect(screen.queryByRole('group', { name: '単語帳' })).not.toBeInTheDocument()
    navTo('設定')
    expect(screen.getByRole('group', { name: '単語帳' })).toBeInTheDocument()
  })

  it('単語帳ボタンに定着率が出る', () => {
    const p = Object.fromEntries(wordsOf(['曜日・月']).map((w) => [w.id, { box: 3, due: '2099-01-01' }]))
    localStorage.setItem('eitan:progress', JSON.stringify(p))
    render(<App />)
    navTo('設定')
    expect(screen.getByRole('group', { name: '単語帳' }).textContent).toContain('曜日・月 100%')
  })

  it('ハロウィンの期間はイベントのバナーが出る', () => {
    vi.setSystemTime(new Date(2026, 9, 27, 10))
    render(<App />)
    expect(screen.getByText(/ハロウィンウィーク/)).toBeInTheDocument()
    expect(screen.getByLabelText('飾り 🎃')).toBeInTheDocument()
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    backToPick() // お知らせは問題の画面をはなれてから出る
    expect(screen.getByText(/ハロウィンボーナスつき！ 今日もえらい！ 🪙15/)).toBeInTheDocument()
  })

  it('夕方にまだ学習していないと、連続日数が途切れないよう知らせる', () => {
    vi.setSystemTime(new Date(2026, 9, 20, 19))
    localStorage.setItem('eitan:streak', JSON.stringify({ last: '2026-10-19', count: 5 }))
    render(<App />)
    expect(screen.getByText(/連続5日をつなげよう/)).toBeInTheDocument()
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    navTo('ホーム')
    expect(screen.queryByText(/連続5日をつなげよう/)).not.toBeInTheDocument()
  })

  it('夜おそくは相棒のそばに💤', () => {
    vi.setSystemTime(new Date(2026, 9, 20, 23))
    render(<App />)
    expect(screen.getByLabelText('ねむそう')).toBeInTheDocument()
  })

  it('週末は正解のXPが2倍', () => {
    vi.setSystemTime(new Date(2026, 9, 24, 10)) // 土曜
    render(<App />)
    expect(screen.getByText('🎉 週末はXP2倍！')).toBeInTheDocument()
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(10)
  })

  it('学習した日数で称号が出る', () => {
    localStorage.setItem('eitan:totals', JSON.stringify({ answers: 0, correct: 0, perfect: 0, goals: 0, studyDays: 2 }))
    render(<App />)
    expect(document.querySelector('.title-badge')!.textContent).toContain('🎖 見習い')
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    navTo('ホーム')
    expect(document.querySelector('.title-badge')!.textContent).toContain('🎖 かけだし')
  })

  it('相棒と出会って7日で記念日のお祝い（1回だけ）', () => {
    localStorage.setItem('eitan:party', JSON.stringify({ active: 0, members: [{ xp: 50, born: '2026-10-13' }] }))
    const { unmount } = render(<App />)
    expect(screen.getByText('記念日おめでとう！')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(10)
    unmount()
    render(<App />)
    expect(screen.queryByText('記念日おめでとう！')).not.toBeInTheDocument()
  })

  it('10問ごとに相棒が応援してくれる', () => {
    localStorage.setItem('eitan:today-count', JSON.stringify({ day: dayKey(), count: 9 }))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    navTo('ホーム')
    expect(screen.getByText('Great job!')).toBeInTheDocument()
  })

  it('図鑑で出会った姿をタップすると説明文が出る', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 100 }))
    render(<App />)
    navTo('ホーム')
    fireEvent.click(screen.getByRole('tab', { name: 'コレクション' }))
    fireEvent.click(document.querySelector('.zukan-pick')!)
    expect(screen.getByText(/ふしぎな模様のタマゴ/)).toBeInTheDocument()
  })

  it('ボス図鑑にたおしたボスが載る', () => {
    localStorage.setItem('eitan:boss', JSON.stringify({ 中1: '2026-10-19' }))
    render(<App />)
    navTo('ホーム')
    fireEvent.click(screen.getByRole('tab', { name: 'コレクション' }))
    expect(screen.getByText(/ボス図鑑 1 \//)).toBeInTheDocument()
    expect(screen.getByText('ヤミモチ')).toBeInTheDocument()
  })

  it('新しい週に開くと先週のふりかえりが出る（2回目は出ない）', () => {
    localStorage.setItem('eitan:history', JSON.stringify({ '2026-10-13': 20, '2026-10-15': 10 }))
    const { unmount } = render(<App />)
    expect(screen.getByText(/先週のふりかえり：30問・2日/)).toBeInTheDocument()
    unmount()
    render(<App />)
    expect(screen.queryByText(/先週のふりかえり/)).not.toBeInTheDocument()
  })

  it('設定を初期値にもどせる（学習データは残る）', () => {
    localStorage.setItem('eitan:settings', JSON.stringify({ theme: 'dark', rate: 0.7 }))
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 33, owned: [] }))
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /設定/ }))
    fireEvent.click(screen.getByText('設定を初期値にもどす'))
    expect(JSON.parse(localStorage.getItem('eitan:settings')!).theme).toBe('system')
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(33)
    vi.restoreAllMocks()
  })

  it('学習データをすべて消す：2回目の確認でやめれば消えない', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 50, owned: [] }))
    const c = vi.spyOn(window, 'confirm').mockReturnValueOnce(true).mockReturnValueOnce(false)
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /設定/ }))
    fireEvent.click(screen.getByText('学習データをすべて消す'))
    expect(c).toHaveBeenCalledTimes(2)
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(50)
    vi.restoreAllMocks()
  })

  it('単語帳をぜんぶ定着させると👑と完全制覇バッジ', () => {
    const p = Object.fromEntries(wordsOf(['曜日・月']).map((w) => [w.id, { box: 3, due: '2099-01-01' }]))
    localStorage.setItem('eitan:progress', JSON.stringify(p))
    render(<App />)
    expect(screen.getByText(/完全制覇/)).toBeInTheDocument()
    navTo('ホーム')
    expect(document.querySelector('.by-level')!.textContent).toContain('👑曜日・月')
  })

  it('記録画面に今日のまとめ（問題数・XP・新しい単語）', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    navTo('ホーム')
    expect([...document.querySelectorAll('.today-summary strong')].map((e) => e.textContent)).toEqual(['1問', '+5XP', '1語'])
  })

  it('今日まだ1問も解いていないときは、0ばかりの今日のまとめを出さない', () => {
    render(<App />)
    navTo('ホーム')
    expect(document.querySelector('.today-summary')).toBeNull()
  })

  it('定期テストの日を入れるとカウントダウンが出る', () => {
    localStorage.setItem('eitan:settings', JSON.stringify({ testDate: '2026-10-30' }))
    render(<App />)
    expect(document.querySelector('.exam')!.textContent).toContain('テストまであと 10日')
  })

  it('カードの進み具合バー', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    expect(screen.getByLabelText('今日のカード 0 / 10')).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByLabelText('今日のカード 1 / 10')).toBeInTheDocument()
  })

  it('XPを受け取ると相棒のそばに +XP が浮かぶ', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    navTo('ホーム')
    expect(document.querySelector('.xp-float')!.textContent).toBe('+5')
  })

  it('はじめての案内から「レベル診断で決める」でレベル診断が始まる', () => {
    localStorage.removeItem('eitan:onboarded')
    render(<App />)
    fireEvent.click(screen.getByText('つぎへ'))
    fireEvent.click(screen.getByText(/レベル診断で決める/))
    expect(screen.getByText(/問目（レベル診断）/)).toBeInTheDocument()
  })

  it('カードの「あとで」で、その単語を列のうしろに回せる', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    const first = document.querySelector('.card .en')!.textContent
    fireEvent.click(screen.getByText('⏭ あとで'))
    expect(document.querySelector('.card .en')!.textContent).not.toBe(first)
    expect(screen.getByLabelText(/今日の残り 10 語/)).toBeInTheDocument()
  })

  it('設定画面に見出しがある', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /設定/ }))
    for (const h of ['📚 学習', '🔊 音声', '🎨 見た目', '💾 データ']) expect(screen.getByRole('heading', { name: h })).toBeInTheDocument()
  })

  it('設定画面で新しくなったことを見られる', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /設定/ }))
    expect(screen.getByText('新しくなったこと')).toBeInTheDocument()
    const items = document.querySelectorAll('.whats-new:not(.help) li')
    expect(items.length).toBeGreaterThan(0)
    expect(items.length).toBeLessThanOrEqual(10)
    expect(screen.getByText('遊び方')).toBeInTheDocument()
  })

  it('今日の復習を全部終えると🪙10（1日1回）', () => {
    localStorage.setItem('eitan:progress', JSON.stringify({ [WORDS[0].id]: { box: 1, due: dayKey() } }))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    expect(document.querySelector('.card .en')?.textContent).toContain(WORDS[0].en)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    backToPick() // お知らせは問題の画面をはなれてから出る
    expect(toast('📚 復習コンプリート！')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(15) // 復習🪙10＋ログイン🪙5（正解のコインは10問で1まい）
    expect(localStorage.getItem('eitan:review-done')).toBe(dayKey())
  })

  it('学習した日数でなつき度が上がると、相棒がお礼を言う', () => {
    localStorage.setItem('eitan:totals', JSON.stringify({ answers: 0, correct: 0, perfect: 0, studyDays: 2 }))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    backToPick() // お知らせは問題の画面をはなれてから出る
    expect(toast('💕 なつき度アップ！')).toBeInTheDocument()
  })

  it('学習した日数で称号が上がった日はお知らせが出る', () => {
    localStorage.setItem('eitan:totals', JSON.stringify({ answers: 0, correct: 0, perfect: 0, studyDays: 6 }))
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    backToPick() // お知らせは問題の画面をはなれてから出る
    expect(toast('🎖 称号アップ')).toBeInTheDocument()
    expect(screen.getByText('称号が「がんばり屋」になった！（学習7日）')).toBeInTheDocument()
  })

  it('お知らせが重なると順番に出る', () => {
    render(<App />)
    goCards() // 単語カードは単語ゲームの「単語カード」から
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    backToPick() // お知らせは問題の画面をはなれてから出る
    expect(screen.getByText('ログインボーナス')).toBeInTheDocument()
    fireEvent.click(document.querySelector('.mission-toast')!)
    expect(screen.queryByText('ログインボーナス')).not.toBeInTheDocument()
  })

  it('ラッキー単語に正解すると1日1回+20XP', () => {
    localStorage.removeItem('eitan:lucky')
    const lucky = pickWordOfDay(WORDS, dayKey())!
    localStorage.setItem('eitan:favorites', JSON.stringify([lucky.id]))
    render(<App />)
    navTo('ホーム')
    const fav = screen.getByText('★ お気に入り（1語）').nextElementSibling!
    fireEvent.click(fav.querySelector('button')!)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    backToPick() // お知らせは問題の画面をはなれてから出る
    expect(toast('🍀 ラッキー！')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(25)
  })
})

it('キャラクターを6種そろえるとバッジとガチャチケットがもらえる', () => {
  const members = ['mochi', 'fox', 'penguin', 'rabbit', 'cat', 'dragon'].map((sp) => ({ xp: 0, ...(sp === 'mochi' ? {} : { species: sp }) }))
  localStorage.setItem('eitan:party', JSON.stringify({ members, active: 0 }))
  localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [] }))
  render(<App />)
  expect(JSON.parse(localStorage.getItem('eitan:wallet')!).tickets).toBe(1)
})

it('記録：まだ0ばかりの「この1週間」と「復習の予定」は出さない', () => {
  localStorage.clear()
  render(<App />)
  expect(screen.queryByText('この1週間')).toBeNull()
  expect(screen.queryByText('復習の予定')).toBeNull()
})

it('記録：まだ0の学習時間・コンボ・正答率の行は出さない', () => {
  localStorage.clear()
  render(<App />)
  expect(screen.queryByText(/学習時間：/)).toBeNull()
  expect(screen.queryByText(/コンボの自己ベスト/)).toBeNull()
  expect(screen.queryByText(/今日の正答率/)).toBeNull()
})

it('記録：今週まだ0問なら、今週のレポートのシェアと今週の比較は出さない', () => {
  localStorage.clear()
  render(<App />)
  expect(screen.queryByText('📤 今週のレポートをシェア')).toBeNull()
  expect(document.querySelector('.week-compare')).toBeNull()
})

it('記録：今月まだ学習0日ならカレンダーを出さず、定着0なら定着のバーも出さない', () => {
  localStorage.clear()
  render(<App />)
  expect(document.querySelector('.calendar')).toBeNull()
  expect(screen.queryByRole('progressbar', { name: '定着の割合' })).toBeNull()
})

it('音読・読み上げは、ページ（下のタブ）が変わると止まる', () => {
  let cancels = 0
  Object.defineProperty(window, 'speechSynthesis', { value: { cancel: () => cancels++, speak() {}, getVoices: () => [] }, configurable: true })
  render(<App />)
  const before = cancels
  navTo('読解ステージ')
  expect(cancels).toBeGreaterThan(before)
  const mid = cancels
  navTo('文法チャレンジ')
  expect(cancels).toBeGreaterThan(mid)
  delete (window as { speechSynthesis?: unknown }).speechSynthesis
})

it('学年が中3なら、今日の課題の読解は高校入試レベルの長文がその場で開く', async () => {
  const { todayReading, todayReadingTitle } = await import('./todayread')
  const { dayKey } = await import('./srs')
  localStorage.clear()
  localStorage.setItem('eitan:grade', 'j3')
  render(<App />)
  const r = todayReading(dayKey())
  expect(r.kind).toBe('long')
  fireEvent.click(within(screen.getByLabelText('今日の課題')).getByText(todayReadingTitle(dayKey())))
  expect(screen.getByRole('navigation', { name: '今日の課題の切りかえ' })).toBeInTheDocument()
  expect(document.querySelector('.long-para')).not.toBeNull()
  expect(screen.queryByText('← 読解の一覧')).toBeNull()
})

it('ボス部屋でボスをえらぶと戦いだけの画面になり、上の「ほかの問題をえらぶ」でボスの一覧にもどる', () => {
  localStorage.clear()
  localStorage.setItem('eitan:onboarded', '1')
  render(<App />)
  navTo('ボス部屋')
  fireEvent.click(screen.getByRole('button', { name: /中1のボス「.+」に挑戦/ }))
  expect(screen.queryByLabelText('育てているなかま')).toBeNull()
  expect(screen.queryByRole('group', { name: 'ボスをえらぶ' })).toBeNull()
  expect(screen.getByRole('group', { name: 'チーム' })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /ほかの問題をえらぶ/ }))
  expect(screen.getByRole('group', { name: 'ボスをえらぶ' })).toBeInTheDocument()
})

it('問題の画面で、いまのタブ（文法チャレンジ）をもう一度おすと、えらぶ画面にもどる', () => {
  localStorage.clear()
  localStorage.setItem('eitan:onboarded', '1')
  render(<App />)
  navTo('文法チャレンジ')
  fireEvent.click(screen.getByText('✏️ すぐ練習（5問）'))
  expect(screen.getByRole('button', { name: /ほかの問題をえらぶ/ })).toBeInTheDocument()
  navTo('文法チャレンジ')
  expect(screen.queryByRole('button', { name: /ほかの問題をえらぶ/ })).toBeNull()
  expect(screen.getByText('✏️ すぐ練習（5問）')).toBeInTheDocument()
})

it('今日の課題が3つともクリアなら、課題の画面に「🎉 ぜんぶクリア！ ホームへ ▶」が出て、ホームにもどれる', async () => {
  const { dayKey } = await import('./srs')
  const day = dayKey()
  localStorage.clear()
  localStorage.setItem('eitan:onboarded', '1')
  localStorage.setItem('eitan:today-words', day)
  localStorage.setItem('eitan:grammar-daily', day)
  localStorage.setItem('eitan:daily-short', day)
  render(<App />)
  fireEvent.click(within(screen.getByLabelText('今日の課題')).getByRole('button', { name: /^文法/ }))
  fireEvent.click(screen.getByRole('button', { name: '🎉 ぜんぶクリア！ ホームへ ▶' }))
  expect(screen.getByText('📊 記録')).toBeInTheDocument()
})

it('単語のタイムアタックも、スタートしたら問題だけの画面になり、上のバーで最初の画面にもどる', () => {
  localStorage.clear()
  localStorage.setItem('eitan:onboarded', '1')
  render(<App />)
  navTo('単語ゲーム')
  fireEvent.click(screen.getByRole('tab', { name: '⏱ タイムアタック' }))
  fireEvent.click(screen.getByText('スタート'))
  expect(screen.queryByRole('tablist', { name: '単語の種類' })).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: /ほかの問題をえらぶ/ }))
  expect(screen.getByText('スタート')).toBeInTheDocument()
})

describe('ガチャは1日1回無料', () => {
  it('コイン0でも今日の無料ガチャを1回引け、引いたあとは出ない。チケットは減らない', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [], tickets: 1 }))
    render(<App />)
    expect(screen.getByText('🎁 今日1回無料')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText(/ショップを開く/))
    const before = JSON.parse(localStorage.getItem('eitan:party') ?? '{"members":[{}]}').members.length
    fireEvent.click(screen.getByRole('button', { name: /今日の無料ガチャ/ }))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members.length).toBe(before + 1)
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).tickets).toBe(1)
    expect(localStorage.getItem('eitan:gacha-free-day')).toBe(dayKey())
    expect(screen.queryByRole('button', { name: /今日の無料ガチャ/ })).toBeNull()
  })
})

describe('今日の課題の学年', () => {
  it('学年をえらんでいないときは「🎓 学年をえらぶ」で設定へ', () => {
    localStorage.removeItem('eitan:grade')
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /学年をえらぶ/ }))
    expect(screen.getByText(/学年・レベル/)).toBeInTheDocument()
  })
})

describe('苦手な単語を消す', () => {
  it('記録の苦手な単語は 🗑 で1語ずつ消せ、「ぜんぶ消す」はかくにんしてから消える', () => {
    localStorage.setItem('eitan:mistakes', JSON.stringify({ [WORDS[0].id]: 3, [WORDS[1].id]: 2 }))
    render(<App />)
    navTo('ホーム')
    fireEvent.click(screen.getByRole('button', { name: `${WORDS[0].en} を苦手から消す` }))
    expect(JSON.parse(localStorage.getItem('eitan:mistakes')!)).toEqual({ [WORDS[1].id]: 2 })
    fireEvent.click(screen.getByRole('button', { name: /苦手をぜんぶ消す/ }))
    fireEvent.click(screen.getByRole('button', { name: '消す' }))
    expect(JSON.parse(localStorage.getItem('eitan:mistakes')!)).toEqual({})
    expect(screen.queryByText('苦手な単語')).toBeNull()
  })
})

describe('正解しても苦手に入れる', () => {
  it('4択で正解したあと「苦手に入れる」をチェックすると苦手な単語に入り、はずすと元にもどる', () => {
    localStorage.removeItem('eitan:mistakes')
    render(<App />)
    goCards()
    playMini()
    const en = document.querySelector('.quiz .en:not(.today-words .en)')!.textContent
    const word = WORDS.find((w) => w.en === en)!
    fireEvent.click(within(document.querySelector<HTMLElement>('.quiz .choices')!).getByRole('button', { name: word.ja }))
    const box = screen.getByLabelText(/正解したけど苦手に入れる/)
    fireEvent.click(box)
    expect(JSON.parse(localStorage.getItem('eitan:mistakes')!)[word.id]).toBe(1)
    fireEvent.click(box)
    expect(JSON.parse(localStorage.getItem('eitan:mistakes')!)[word.id]).toBeUndefined()
  })
})

describe('今日の単語のクリア（学年をえらんだとき）', () => {
  it('高校生でも、今日の単語を最後まで答えると「単語」がクリアになる', async () => {
    const { dayKey } = await import('./srs')
    localStorage.setItem('eitan:grade', 'hs')
    render(<App />)
    fireEvent.click(within(screen.getByLabelText('今日の課題')).getByText(/4択で/))
    for (let i = 0; i < 10 && document.querySelector('.quiz .choices'); i++) {
      const en = document.querySelector('.quiz .en:not(.today-words .en)')!.textContent
      const w = WORDS.find((x) => x.en === en)!
      fireEvent.click(within(document.querySelector<HTMLElement>('.quiz .choices')!).getByRole('button', { name: w.ja }))
      fireEvent.click(screen.getByText(/次へ|結果を見る/))
    }
    expect(localStorage.getItem('eitan:today-words')).toBe(dayKey())
    localStorage.removeItem('eitan:grade')
  })
})

describe('レア度つきチケット', () => {
  it('💎レアチケットはレア以上、🌟SRチケットはスーパーレア以上が出る', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [], rareTickets: 1, srTickets: 1 }))
    localStorage.setItem('eitan:gacha-free-day', '2099-01-01')
    render(<App />)
    fireEvent.click(screen.getByLabelText(/ショップを開く/))
    fireEvent.click(screen.getByRole('button', { name: /SRチケットで引く/ }))
    const p1 = JSON.parse(localStorage.getItem('eitan:party')!)
    expect(['kin', 'niji']).toContain(p1.members[p1.members.length - 1].kind)
    fireEvent.click(screen.getByRole('button', { name: /レアチケットで引く/ }))
    const p2 = JSON.parse(localStorage.getItem('eitan:party')!)
    expect(p2.members[p2.members.length - 1].kind).toBeDefined() // レア以上は色つき（normal ではない）
    const w = JSON.parse(localStorage.getItem('eitan:wallet')!)
    expect(w.rareTickets ?? 0).toBe(0)
    expect(w.srTickets ?? 0).toBe(0)
  })
})

describe('レア保証', () => {
  it('ノーマルが4回つづくと、5回目のガチャはレア以上確定', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 999, owned: [] }))
    localStorage.setItem('eitan:gacha-free-day', '2099-01-01')
    localStorage.setItem('eitan:gacha-step', JSON.stringify({ day: '2000-01-01', count: 0 }))
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.3) // ふつうが出る値
    render(<App />)
    fireEvent.click(screen.getByLabelText(/ショップを開く/))
    localStorage.setItem('eitan:gacha-n-streak', '4')
    fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
    rnd.mockRestore()
    const p = JSON.parse(localStorage.getItem('eitan:party')!)
    expect(p.members[p.members.length - 1].kind).toBeDefined()
    expect(localStorage.getItem('eitan:gacha-n-streak')).toBe('0')
  })
})

it('キャラガチャ：🪙100で、生まれた姿の仲間が1体ふえる', async () => {
  localStorage.clear()
  localStorage.setItem('eitan:onboarded', '1')
  localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 150, owned: [] }))
  render(<App />)
  fireEvent.click(screen.getByLabelText(/ショップを開く/))
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  fireEvent.click(screen.getByRole('button', { name: /キャラガチャを引く 🪙100/ }))
  const party = JSON.parse(localStorage.getItem('eitan:party')!)
  expect(party.members).toHaveLength(2)
  expect(party.members[1].xp).toBeGreaterThanOrEqual(30)
  expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBeLessThan(100) // タマゴ1回ぶん（🪙50）より多くはらう（おまけのコインは最大40）
})
