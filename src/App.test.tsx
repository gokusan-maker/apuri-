import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { dayKey } from './srs'
import { missionsFor } from './missions'
import { pickWordOfDay } from './wordOfDay'
import { souvenirFor } from './souvenir'
import { WORDS, wordsOf } from './words'

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

  it('カードをめくって「覚えた」で次の単語に進む', () => {
    render(<App />)
    expect(screen.getByText(`今日の残り 10 語 ・ 定着 0 / ${WORDS.length} 語`)).toBeInTheDocument()
    expect(screen.getByText(WORDS[0].en)).toBeInTheDocument()

    fireEvent.click(screen.getByText('意味を見る'))
    expect(screen.getByText(WORDS[0].ja)).toBeInTheDocument()

    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText(WORDS[1].en)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`今日の残り 9 語`))).toBeInTheDocument()
  })

  it('「覚えた」でモンスターにXPが入り、保存される', () => {
    render(<App />)
    expect(screen.getByText('XP 0 / 20')).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText('XP 5 / 20')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(5)
  })

  it('クイズで正解するとXP+10、タマゴがかえる', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 15 }))
    render(<App />)
    fireEvent.click(screen.getByText('クイズ'))
    const en = document.querySelector('.quiz .en')!.textContent
    const word = WORDS.find((w) => w.en === en)!
    fireEvent.click(screen.getByRole('button', { name: word.ja }))
    expect(screen.getAllByText('タマゴがかえった！').length).toBeGreaterThan(0)
    expect(screen.getByRole('dialog', { name: '進化' })).toBeInTheDocument()
    expect(document.querySelector('.monster-name')!.textContent).toContain('ちびモチ')
  })

  it('しばらくぶりだと「さみしそう」が出て、学習すると元気になる', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 30, lastDay: '2000-01-01' }))
    render(<App />)
    expect(screen.getByText(/さみしそう/)).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.queryByText(/さみしそう/)).not.toBeInTheDocument()
  })

  it('学習すると連続日数の🔥が1日になる', () => {
    render(<App />)
    expect(screen.getByLabelText('連続学習 0 日')).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(screen.getByLabelText('連続学習 1 日')).toBeInTheDocument()
  })

  it('画面下のタブで カード／クイズ／タイム／記録 を切り替えられる', () => {
    render(<App />)
    const tab = (name: string) => within(screen.getByRole('navigation', { name: '画面の切り替え' })).getByRole('button', { name: new RegExp(name) })
    expect(tab('カード')).toHaveAttribute('aria-current', 'page')
    fireEvent.click(tab('クイズ'))
    expect(document.querySelector('.quiz')).not.toBeNull()
    expect(tab('クイズ')).toHaveAttribute('aria-current', 'page')
    fireEvent.click(tab('タイム'))
    expect(screen.getByText('スタート')).toBeInTheDocument()
    fireEvent.click(tab('記録'))
    expect(screen.getByRole('heading', { name: '記録' })).toBeInTheDocument()
    fireEvent.click(tab('カード'))
    expect(screen.getByText('意味を見る')).toBeInTheDocument()
  })

  it('記録画面に連続日数・今日の学習数・定着語数が出る（クイズの不正解も学習数に入る）', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    fireEvent.click(screen.getByRole('button', { name: /クイズ/ }))
    const en = document.querySelector('.quiz .en')!.textContent
    const word = WORDS.find((w) => w.en === en)!
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent !== word.ja)!)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    expect(screen.getByText('1日')).toBeInTheDocument()
    expect(document.querySelector('.result-list')!.textContent).toContain('2問')
    expect(screen.getByText(`0 / ${WORDS.length}`)).toBeInTheDocument()
  })

  it('単語帳を中1だけにすると、定着の母数が中1の語数になる', () => {
    render(<App />)
    fireEvent.click(screen.getByText(/📚 単語帳：/))
    for (const l of ['中2', '中3', '高校基礎', '熟語', '曜日・月', 'テーマ別', '数', '色・形', '会話']) fireEvent.click(screen.getByRole('button', { name: l }))
    const n = wordsOf(['中1']).length
    expect(screen.getByText(new RegExp(`定着 0 / ${n} 語`))).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:levels')!)).toEqual(['中1'])
  })

  it('まちがえた単語が記録の「苦手な単語」に出て、苦手だけ復習できる', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    expect(screen.getByText('×1')).toBeInTheDocument()
    fireEvent.click(screen.getByText('クイズで復習'))
    expect(screen.getByText(/苦手だけ復習中（1語）/)).toBeInTheDocument()
    expect(document.querySelector('.quiz .en')!.textContent).toBe(WORDS[0].en)
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
    fireEvent.click(screen.getByText('端末に合わせる'))
    expect(document.documentElement.dataset.theme).toBeUndefined()
  })

  it('今日の目標に届いた瞬間にお祝いが出て、閉じられる', () => {
    localStorage.setItem('eitan:settings', JSON.stringify({ dailyGoal: 10 }))
    localStorage.setItem('eitan:today-count', JSON.stringify({ day: dayKey(), count: 9 }))
    render(<App />)
    expect(screen.getByText('🎯 今日の目標 9 / 10 問')).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText('今日の目標達成！')).toBeInTheDocument()
    fireEvent.click(screen.getByText('やったね'))
    expect(screen.queryByText('今日の目標達成！')).not.toBeInTheDocument()
    expect(screen.getByText('🎯 目標達成！')).toBeInTheDocument()
    expect(toast('🎒 おみやげ')).toBeInTheDocument()
    expect(screen.getByText(new RegExp(souvenirFor(dayKey()).name))).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:souvenirs')!)).toEqual([souvenirFor(dayKey()).id])
    expect(screen.getByLabelText('かざってあるおみやげ 1こ').textContent).toBe(souvenirFor(dayKey()).icon)
    // もう一度答えてもお祝いは出ない
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.queryByText('今日の目標達成！')).not.toBeInTheDocument()
  })

  it('初めて正解するとバッジ獲得のお知らせが出て、記録画面のバッジ一覧に並ぶ', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText('バッジ獲得！')).toBeInTheDocument()
    expect(screen.getByText('はじめの一歩')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
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
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    fireEvent.click(screen.getByRole('tab', { name: 'あいぼう' }))
    const picks = document.querySelectorAll<HTMLButtonElement>('.party-member')
    expect(picks).toHaveLength(2)
    fireEvent.click(picks[1])
    expect(document.querySelector('.monster-name')!.textContent).toContain('ふしぎなタマゴ')
    expect(JSON.parse(localStorage.getItem('eitan:party')!).active).toBe(1)
  })

  it('マイ単語帳に追加して選ぶと、カードの母数に入る', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    fireEvent.click(screen.getByRole('tab', { name: 'データ' }))
    fireEvent.change(screen.getByLabelText('英語'), { target: { value: 'sunflower' } })
    fireEvent.change(screen.getByLabelText('意味'), { target: { value: 'ひまわり' } })
    fireEvent.click(screen.getByText('追加する'))
    expect(screen.getByText('マイ単語帳（1語）')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /カード/ }))
    fireEvent.click(screen.getByText(/📚 単語帳：/))
    fireEvent.click(screen.getByRole('button', { name: 'マイ単語帳' }))
    expect(screen.getByText(new RegExp(`定着 0 / ${WORDS.length + 1} 語`))).toBeInTheDocument()
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
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
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
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByLabelText('例文を聞く'))
    expect(spoken).toEqual([WORDS[0].example])
  })

  it('「まだ」にした単語はすぐには出ず、次の単語に進む', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(document.querySelector('.card .en')!.textContent).toBe(WORDS[1].en)
  })

  it('ミッションを達成すると、お知らせとボーナスXP（日付を固定して確認）', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    // 「答える／正解」系のミッションがある日を探して固定する
    let day = new Date(2026, 9, 1)
    let m = undefined as ReturnType<typeof missionsFor>[number] | undefined
    for (let i = 0; i < 60 && !m; i++) {
      day = new Date(2026, 9, 1 + i)
      if (day.getDay() === 0 || day.getDay() === 6) continue // 週末はXP2倍なので平日で
      m = missionsFor(dayKey(day)).find((x) => x.counter === 'answers' || x.counter === 'correct' || x.counter === 'cardGood')
    }
    vi.setSystemTime(day)
    const today = dayKey()
    localStorage.setItem('eitan:lucky', today)
    localStorage.setItem('eitan:missions', JSON.stringify({ day: today, counts: { [m!.counter]: m!.target - 1 }, claimed: [] }))
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(toast(/ミッション達成！ \+30XP/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(35)
    expect(JSON.parse(localStorage.getItem('eitan:missions')!).claimed).toContain(m!.id)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    expect(screen.getByText(/今日のミッション 1 \/ 3/)).toBeInTheDocument()
    vi.useRealTimers()
  })

  it('単語一覧で検索でき、タップで例文が見える', () => {
    render(<App />)
    fireEvent.click(screen.getByText('📚 単語一覧・さがす'))
    fireEvent.change(screen.getByLabelText('単語をさがす'), { target: { value: 'library' } })
    expect(screen.getByText('1語')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /library/ }))
    expect(document.querySelector('.word-detail .example')?.textContent).toBe('I study at the library after school.')
    fireEvent.click(screen.getByText('← カードにもどる'))
    expect(screen.getByText('意味を見る')).toBeInTheDocument()
  })

  it('単語一覧から1語だけカードで練習できる', () => {
    render(<App />)
    fireEvent.click(screen.getByText('📚 単語一覧・さがす'))
    fireEvent.change(screen.getByLabelText('単語をさがす'), { target: { value: 'library' } })
    fireEvent.click(screen.getByRole('button', { name: /library/ }))
    fireEvent.click(screen.getByText('🃏 この単語をカードで練習'))
    expect(document.querySelector('.card .en')?.textContent).toContain('library')
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText(/カードを一周しました/)).toBeInTheDocument()
  })

  it('苦手単語をカードで復習でき、「覚えた」で苦手から外れる', () => {
    localStorage.setItem('eitan:mistakes', JSON.stringify({ [WORDS[3].id]: 1, [WORDS[5].id]: 2 }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
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
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 24, owned: [] })) // +1（正解）+5（ログインボーナス）で30
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    fireEvent.click(screen.getByLabelText('コイン 30枚・ショップを開く'))
    fireEvent.click(screen.getByText('🪙30で買う'))
    expect(screen.getByText(/いまのコイン：🪙 0/)).toBeInTheDocument()
    fireEvent.click(screen.getByText('つける'))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].wear).toBe('ribbon')
    fireEvent.click(screen.getByText('はずす'))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].wear).toBeUndefined()
    fireEvent.click(screen.getByText('← もどる'))
    expect(screen.getByText('意味を見る')).toBeInTheDocument()
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
    expect(screen.getByText('💕 きょうの好物 XP2倍！')).toBeInTheDocument() // テストの日はクッキーが好物
    fireEvent.click(screen.getByText(/サクサククッキン/))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(40)
    expect(screen.getByText('おやつ（今日あと2回）')).toBeInTheDocument()
    expect(screen.getByText('😋 もぐもぐ')).toBeInTheDocument()
    expect(screen.getAllByText(/サクサク/).length).toBeGreaterThanOrEqual(2) // ボタンとひとこと
  })

  it('おみくじが大吉の日はガチャが🪙5安い', () => {
    const was = Date.now()
    vi.setSystemTime(new Date(2026, 9, 21, 10, 0)) // この日は大吉
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 60, owned: [] }))
    render(<App />)
    expect(screen.getByText('大吉')).toBeInTheDocument()
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
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
    fireEvent.click(screen.getByRole('tab', { name: 'あいぼう' }))
    fireEvent.click(screen.getByLabelText(/とおわかれする/))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members).toHaveLength(1)
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(12)
  })

  it('まだ生まれていない仲間をあたためるとXPが入る', () => {
    localStorage.setItem('eitan:party', JSON.stringify({ members: [{ xp: 500 }, { xp: 0 }], active: 0 }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
    fireEvent.click(screen.getByRole('tab', { name: 'あいぼう' }))
    fireEvent.click(screen.getByLabelText(/をあたためる/))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[1].xp).toBe(2)
    expect(screen.getByText(/今日あと4回/)).toBeInTheDocument()
  })

  it('金の宝箱をあけるとチケットとコイン', () => {
    localStorage.setItem('eitan:keys', '3')
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /ステージ/ }))
    fireEvent.click(screen.getByText(/金の宝箱をあける/))
    const w = JSON.parse(localStorage.getItem('eitan:wallet')!)
    expect(w.coins).toBe(30)
    expect(w.tickets).toBe(1)
    expect(localStorage.getItem('eitan:keys')).toBe('0')
  })

  it('スーパーレア以上の仲間は一覧で光る', () => {
    localStorage.setItem('eitan:party', JSON.stringify({ members: [{ xp: 0 }, { xp: 0, kind: 'niji' }, { xp: 0, kind: 'sakura' }], active: 0 }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
    fireEvent.click(screen.getByRole('tab', { name: 'あいぼう' }))
    expect(document.querySelectorAll('.party li.shine')).toHaveLength(1)
    expect(document.querySelector('.party li.shine.r-UR')).not.toBeNull()
  })

  it('記録の部屋に自己ベストが出る', () => {
    localStorage.setItem('eitan:endless', '7')
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
    fireEvent.click(screen.getByRole('tab', { name: 'コレクション' }))
    expect(screen.getByText('🏆 記録の部屋')).toBeInTheDocument()
    expect(screen.getByText('7階')).toBeInTheDocument()
  })

  it('ボスをたおした回数で相棒に二つ名がつく', () => {
    localStorage.setItem('eitan:boss-book', JSON.stringify({ ヤミモチ: { wins: 10, best: 'A', first: '2026-10-01', look: { name: 'ヤミモチ', color: '#000', line: '#000', eye: '#fff' } } }))
    render(<App />)
    expect(screen.getByText('⚔️ ボスハンター')).toBeInTheDocument()
  })

  it('なでるとごきげんがたまる', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 10, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByLabelText('相棒にさわる'))
    expect(screen.getByLabelText('ごきげん 1 / 20')).toBeInTheDocument()
  })

  it('ごきげんMAXの日はXPが1.2倍', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 10, owned: [] }))
    localStorage.setItem('eitan:mood-meter', JSON.stringify({ day: dayKey(), points: 20 }))
    render(<App />)
    expect(screen.getByText('💗 ごきげんMAX！ 今日はXP1.2倍')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('コイン 10枚・ショップを開く'))
    fireEvent.click(screen.getByText(/サクサククッキン/))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(48) // 好物40×1.2
  })

  it('3連ガチャで仲間が3匹ふえ、コインが3回分へる', () => {
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

  it('おさんぽは1日1回で、単語を拾ってきて🪙3', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /おさんぽに行く/ }))
    expect(screen.getByText(/を拾ってきた！ 🪙3/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /おさんぽに行く/ })).toBeNull()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(3)
    expect(localStorage.getItem('eitan:walk')).toBe('2026-10-20')
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
    fireEvent.click(screen.getByText('📋 結果をコピー（シェア用）'))
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('イングリッシュモンスターのガチャで'))
  })

  it('相棒をタップするとポーズがかわり、全部見ると称号', () => {
    render(<App />)
    for (let i = 0; i < 6; i++) fireEvent.click(screen.getByLabelText('相棒にさわる'))
    expect(screen.getByText(/ポーズ 6 \/ 6/)).toBeInTheDocument()
    expect(screen.getByText(/称号「ポーズマスター」/)).toBeInTheDocument()
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
    expect(screen.getByLabelText('なでなでスタンプ 0 / 10')).toBeInTheDocument()
  })

  it('おるすばん中の仲間がかえると知らせが出る', () => {
    localStorage.setItem('eitan:party', JSON.stringify({ active: 0, gacha: 1, members: [{ xp: 0 }, { xp: 19, name: 'タマ' }] }))
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[1].xp).toBe(20)
    for (let i = 0; i < 6 && !screen.queryByText('おるすばん中のタマが「ちびモチ」にかえった！'); i++) {
      const t = document.querySelector('.mission-toast')
      if (t) fireEvent.click(t)
    }
    expect(screen.getByText('おるすばん中のタマが「ちびモチ」にかえった！')).toBeInTheDocument()
  })

  it('3問続けて正解すると相棒が顔を出して励ましてくれる（小さいうちは日本語）', () => {
    render(<App />)
    for (let i = 0; i < 3; i++) {
      expect(document.querySelector('.pet-cheer')).toBeNull()
      fireEvent.click(screen.getByText('意味を見る'))
      fireEvent.click(screen.getByText('覚えた'))
    }
    const c = document.querySelector('.pet-cheer')!
    expect(c).not.toBeNull()
    expect(c.querySelector('.pet-cheer-text')!.textContent).toMatch(/[ぁ-んァ-ン]/)
  })

  it('今日のチャレンジ：5問クリアでコインがもらえ、ボタンがクリアずみになる', () => {
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 0, owned: [] }))
    render(<App />)
    fireEvent.click(screen.getByText(/今日のチャレンジ：/))
    fireEvent.click(screen.getByText('チャレンジ開始！'))
    for (let i = 0; i < 5; i++) {
      const en = document.querySelector('.challenge .en')!.textContent!
      const ja = WORDS.find((w) => w.en === en)!.ja
      fireEvent.click(screen.getByRole('button', { name: ja }))
      const next = screen.queryByText(/次へ|つぎへ/)
      if (next) fireEvent.click(next)
    }
    expect(screen.getByText('チャレンジ成功！')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBeGreaterThanOrEqual(10)
    expect(localStorage.getItem('eitan:challenge')).toBe('2026-10-20')
    expect(localStorage.getItem('eitan:challenge-streak')).toBe('1')
  })

  it('ドラゴンのタマゴがかえると、進化の画面にドラゴンの名前が出る', () => {
    localStorage.setItem('eitan:party', JSON.stringify({ active: 0, gacha: 1, members: [{ xp: 18, species: 'dragon' }] }))
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByRole('dialog', { name: '進化' })).toHaveTextContent('ちびドラ')
  })

  it('記録画面に復習の予定が出る（「覚えた」の単語は明日）', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    expect(screen.getByText('明日 1語')).toBeInTheDocument()
  })

  it('カードの☆でお気に入りにして、記録画面からお気に入りだけ復習できる', () => {
    render(<App />)
    fireEvent.click(screen.getByLabelText('お気に入り'))
    expect(JSON.parse(localStorage.getItem('eitan:favorites')!)).toEqual([WORDS[0].id])
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    expect(screen.getByText('★ お気に入り（1語）')).toBeInTheDocument()
    const favSection = screen.getByText('★ お気に入り（1語）').nextElementSibling!
    fireEvent.click(favSection.querySelector('button')!) // カードで復習
    expect(screen.getByText(/お気に入りカードで復習中/)).toBeInTheDocument()
    expect(document.querySelector('.card .en')!.textContent).toBe(WORDS[0].en)
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
    expect(screen.getByText('今日の学習は完了です 🎉 また明日！')).toBeInTheDocument()
    fireEvent.click(screen.getByText('もう5語おぼえる'))
    expect(screen.getByText(/今日の残り 5 語/)).toBeInTheDocument()
    expect(screen.getByText('意味を見る')).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText(/今日の残り 4 語/)).toBeInTheDocument()
  })

  it('設定で1日の新しい単語の数を変えられる', () => {
    localStorage.setItem('eitan:settings', JSON.stringify({ newPerDay: 15 }))
    localStorage.setItem('eitan:daily-new', JSON.stringify({ day: dayKey(), count: 10 }))
    render(<App />)
    expect(screen.queryByText('今日の学習は完了です 🎉 また明日！')).not.toBeInTheDocument()
    expect(screen.getByText(/今日の残り 5 語/)).toBeInTheDocument()
  })

  it('記録画面に「今日はじめて学んだ単語」が出る', () => {
    render(<App />)
    const en = document.querySelector('.card .en')!.textContent!
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    expect(screen.getByText('🌱 今日はじめて学んだ単語（1語）')).toBeInTheDocument()
    expect(screen.getByRole('list', { name: '今日はじめて学んだ単語' }).textContent).toContain(en.replace(/[🔊🐢]/gu, '').trim())
  })

  it('今週学んだ単語をクイズでおさらいできる', () => {
    const p = Object.fromEntries(WORDS.slice(0, 5).map((w) => [w.id, { box: 1, due: '2099-01-01', first: '2026-10-19' }]))
    localStorage.setItem('eitan:progress', JSON.stringify(p))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    fireEvent.click(screen.getByText('🗓 今週学んだ単語をクイズでおさらい（5語）'))
    expect(screen.getByText(/今週学んだ単語だけ復習中（5語）/)).toBeInTheDocument()
  })

  it('1週間前に学んだ単語をクイズでたしかめられる', () => {
    const p = Object.fromEntries(WORDS.slice(0, 4).map((w) => [w.id, { box: 2, due: '2099-01-01', first: '2026-10-13' }]))
    localStorage.setItem('eitan:progress', JSON.stringify(p))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    fireEvent.click(screen.getByText('📅 1週間前に学んだ単語をクイズでたしかめる（4語）'))
    expect(screen.getByText(/1週間前に学んだ単語だけ復習中（4語）/)).toBeInTheDocument()
  })

  it('記録画面の「テーマで練習」で、その仲間の単語をカードで練習できる', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    fireEvent.click(screen.getByText('🗂 テーマで練習'))
    fireEvent.click(screen.getByRole('button', { name: '動物' }))
    expect(screen.getByText(/選んだ単語のカードで復習中/)).toBeInTheDocument()
  })

  it('「テーマで練習」はクイズでもできる', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    fireEvent.click(screen.getByText('🗂 テーマで練習'))
    fireEvent.click(screen.getByRole('button', { name: '問題をとく' }))
    fireEvent.click(screen.getByRole('button', { name: '動物' }))
    expect(screen.getByText(/選んだ単語だけ復習中/)).toBeInTheDocument()
  })

  it('記録画面に、定着した単語の数のグラフが出る', () => {
    const p = Object.fromEntries(WORDS.slice(0, 7).map((w) => [w.id, { box: 3, due: '2099-01-01' }]))
    localStorage.setItem('eitan:progress', JSON.stringify(p))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    expect(screen.getByRole('img', { name: '定着した単語の数のグラフ（今日 7語）' })).toBeInTheDocument()
  })

  it('記録画面のカレンダーに今日の学習が印される', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
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
    expect(screen.getByText(/高校生向けの単語帳にしました/)).toBeInTheDocument()
  })

  it('お休みチケットを買うと、1日休んでも連続日数がつながる', () => {
    const d = new Date()
    d.setDate(d.getDate() - 2)
    localStorage.setItem('eitan:streak', JSON.stringify({ last: dayKey(d), count: 4 }))
    localStorage.setItem('eitan:wallet', JSON.stringify({ coins: 60, owned: [] }))
    render(<App />)
    expect(screen.getByLabelText('連続学習 0 日')).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText('コイン 60枚・ショップを開く'))
    fireEvent.click(screen.getByText('🎫 🪙50で買う'))
    expect(screen.getByLabelText('連続学習 4 日')).toBeInTheDocument()
    fireEvent.click(screen.getByText('← もどる'))
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
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(toast(/週間チャレンジ達成！/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(55) // 50 + ログインボーナス5
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(61)
  })

  it('記録画面に単語帳ごとの定着が出る', () => {
    localStorage.setItem('eitan:progress', JSON.stringify({ [WORDS[0].id]: { box: 3, due: '2099-01-01' } }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    expect(screen.getByLabelText('中1の定着')).toHaveAttribute('aria-valuenow', '1')
  })

  it('記録画面に相棒のプロフィール（出会った日・学び方の割合）', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    fireEvent.click(screen.getByRole('tab', { name: 'あいぼう' }))
    expect(screen.getByText('相棒のプロフィール')).toBeInTheDocument()
    const prof = document.querySelector('.profile')!
    expect(prof.textContent).toContain(dayKey())
    expect(prof.textContent).toContain('100%')
  })

  it('その日はじめての学習でログインボーナス🪙5（2回目からはなし）', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(screen.getByText('ログインボーナス')).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(5)
  })

  it('朝5〜10時にその日はじめて学習すると早起きボーナス🪙3', () => {
    vi.setSystemTime(new Date(2026, 9, 20, 7))
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(screen.getByText(/早起きえらい！ 🪙8/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(8)
  })

  it('単語帳の選択はふだんたたまれていて、タップで開く', () => {
    render(<App />)
    expect(screen.queryByRole('group', { name: '単語帳' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByText(/📚 単語帳：/))
    expect(screen.getByRole('group', { name: '単語帳' })).toBeInTheDocument()
  })

  it('単語帳ボタンに定着率が出る', () => {
    const p = Object.fromEntries(wordsOf(['曜日・月']).map((w) => [w.id, { box: 3, due: '2099-01-01' }]))
    localStorage.setItem('eitan:progress', JSON.stringify(p))
    render(<App />)
    fireEvent.click(screen.getByText(/📚 単語帳：/))
    expect(screen.getByRole('group', { name: '単語帳' }).textContent).toContain('曜日・月 100%')
  })

  it('ハロウィンの期間はイベントのバナーが出る', () => {
    vi.setSystemTime(new Date(2026, 9, 27, 10))
    render(<App />)
    expect(screen.getByText(/ハロウィンウィーク/)).toBeInTheDocument()
    expect(screen.getByLabelText('飾り 🎃')).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(screen.getByText(/ハロウィンボーナスつき！ 今日もえらい！ 🪙15/)).toBeInTheDocument()
  })

  it('夕方にまだ学習していないと、連続日数が途切れないよう知らせる', () => {
    vi.setSystemTime(new Date(2026, 9, 20, 19))
    localStorage.setItem('eitan:streak', JSON.stringify({ last: '2026-10-19', count: 5 }))
    render(<App />)
    expect(screen.getByText(/連続5日をつなげよう/)).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
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
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(10)
  })

  it('学習した日数で称号が出る', () => {
    localStorage.setItem('eitan:totals', JSON.stringify({ answers: 0, correct: 0, perfect: 0, goals: 0, studyDays: 2 }))
    render(<App />)
    expect(document.querySelector('.title-badge')!.textContent).toContain('🎖 見習い')
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
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
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(screen.getByText('Great job!')).toBeInTheDocument()
  })

  it('図鑑で出会った姿をタップすると説明文が出る', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 100 }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    fireEvent.click(screen.getByRole('tab', { name: 'コレクション' }))
    fireEvent.click(document.querySelector('.zukan-pick')!)
    expect(screen.getByText(/ふしぎな模様のタマゴ/)).toBeInTheDocument()
  })

  it('ボス図鑑にたおしたボスが載る', () => {
    localStorage.setItem('eitan:boss', JSON.stringify({ 中1: '2026-10-19' }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
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
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    expect(document.querySelector('.by-level')!.textContent).toContain('👑曜日・月')
  })

  it('記録画面に今日のまとめ（問題数・XP・新しい単語）', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    expect(document.querySelector('.today-summary')!.textContent).toContain('1問・+5XP・新しい単語 1語')
  })

  it('定期テストの日を入れるとカウントダウンが出る', () => {
    localStorage.setItem('eitan:settings', JSON.stringify({ testDate: '2026-10-30' }))
    render(<App />)
    expect(document.querySelector('.exam')!.textContent).toContain('テストまであと 10日')
  })

  it('カードの進み具合バー', () => {
    render(<App />)
    expect(screen.getByLabelText('今日のカード 0 / 10')).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByLabelText('今日のカード 1 / 10')).toBeInTheDocument()
  })

  it('XPを受け取ると相棒のそばに +XP が浮かぶ', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
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
    const first = document.querySelector('.card .en')!.textContent
    fireEvent.click(screen.getByText('⏭ あとで'))
    expect(document.querySelector('.card .en')!.textContent).not.toBe(first)
    expect(screen.getByText(/今日の残り 10 語/)).toBeInTheDocument()
  })

  it('設定画面に見出しがある', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /設定/ }))
    for (const h of ['📚 学習', '🔊 音声', '🎨 見た目', '💾 データ']) expect(screen.getByRole('heading', { name: h })).toBeInTheDocument()
  })

  it('設定画面で新しくなったことを見られる', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /設定/ }))
    expect(screen.getByText('🆕 新しくなったこと')).toBeInTheDocument()
    const items = document.querySelectorAll('.whats-new:not(.help) li')
    expect(items.length).toBeGreaterThan(0)
    expect(items.length).toBeLessThanOrEqual(10)
    expect(screen.getByText('❔ 遊び方')).toBeInTheDocument()
  })

  it('今日の復習を全部終えると🪙10（1日1回）', () => {
    localStorage.setItem('eitan:progress', JSON.stringify({ [WORDS[0].id]: { box: 1, due: dayKey() } }))
    render(<App />)
    expect(document.querySelector('.card .en')?.textContent).toContain(WORDS[0].en)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(toast('📚 復習コンプリート！')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(16)
    expect(localStorage.getItem('eitan:review-done')).toBe(dayKey())
  })

  it('学習した日数でなつき度が上がると、相棒がお礼を言う', () => {
    localStorage.setItem('eitan:totals', JSON.stringify({ answers: 0, correct: 0, perfect: 0, studyDays: 2 }))
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(toast('💕 なつき度アップ！')).toBeInTheDocument()
  })

  it('学習した日数で称号が上がった日はお知らせが出る', () => {
    localStorage.setItem('eitan:totals', JSON.stringify({ answers: 0, correct: 0, perfect: 0, studyDays: 6 }))
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(toast('🎖 称号アップ')).toBeInTheDocument()
    expect(screen.getByText('称号が「がんばり屋」になった！（学習7日）')).toBeInTheDocument()
  })

  it('お知らせが重なると順番に出る', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText('ログインボーナス')).toBeInTheDocument()
    fireEvent.click(document.querySelector('.mission-toast')!)
    expect(screen.queryByText('ログインボーナス')).not.toBeInTheDocument()
  })

  it('ラッキー単語に正解すると1日1回+20XP', () => {
    localStorage.removeItem('eitan:lucky')
    const lucky = pickWordOfDay(WORDS, dayKey())!
    localStorage.setItem('eitan:favorites', JSON.stringify([lucky.id]))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: '記録' }))
    const fav = screen.getByText('★ お気に入り（1語）').nextElementSibling!
    fireEvent.click(fav.querySelector('button')!)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
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
