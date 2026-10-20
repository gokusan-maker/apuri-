import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { dayKey } from './srs'
import { missionsFor } from './missions'
import { WORDS, wordsOf } from './words'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('eitan:onboarded', '1') // 初回の案内は別のテストで確認
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
    const tab = (name: string) => screen.getByRole('button', { name: new RegExp(name) })
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
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
    expect(screen.getByText('1日')).toBeInTheDocument()
    expect(screen.getByText('2問')).toBeInTheDocument()
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
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
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
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
    expect(screen.getByRole('heading', { name: /^バッジ 1 \// })).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:badges')!)).toHaveProperty('first-correct')
    expect(JSON.parse(localStorage.getItem('eitan:totals')!)).toMatchObject({ answers: 1, correct: 1 })
  })

  it('節目のバッジがあるとタマゴがもらえ、相棒を切り替えられる', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 2000 }))
    localStorage.setItem('eitan:badges', JSON.stringify({ 'streak-7': '2026-10-19' }))
    render(<App />)
    expect(screen.getByText('新しい仲間！')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
    const picks = document.querySelectorAll<HTMLButtonElement>('.party-pick')
    expect(picks).toHaveLength(2)
    fireEvent.click(picks[1])
    expect(document.querySelector('.monster-name')!.textContent).toContain('ふしぎなタマゴ')
    expect(JSON.parse(localStorage.getItem('eitan:party')!).active).toBe(1)
  })

  it('マイ単語帳に追加して選ぶと、カードの母数に入る', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
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
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
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
    localStorage.setItem('eitan:missions', JSON.stringify({ day: today, counts: { [m!.counter]: m!.target - 1 }, claimed: [] }))
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    expect(screen.getByText(/ミッション達成！ \+30XP/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(35)
    expect(JSON.parse(localStorage.getItem('eitan:missions')!).claimed).toContain(m!.id)
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
    expect(screen.getByText(/今日のミッション 1 \/ 3/)).toBeInTheDocument()
    vi.useRealTimers()
  })

  it('単語一覧で検索でき、タップで例文が見える', () => {
    render(<App />)
    fireEvent.click(screen.getByText('📚 単語一覧・さがす'))
    fireEvent.change(screen.getByLabelText('単語をさがす'), { target: { value: 'librar' } })
    expect(screen.getByText('1語')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /library/ }))
    expect(screen.getByText('I study at the library after school.')).toBeInTheDocument()
    fireEvent.click(screen.getByText('← カードにもどる'))
    expect(screen.getByText('意味を見る')).toBeInTheDocument()
  })

  it('苦手単語をカードで復習でき、「覚えた」で苦手から外れる', () => {
    localStorage.setItem('eitan:mistakes', JSON.stringify({ [WORDS[3].id]: 1, [WORDS[5].id]: 2 }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
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
    expect(screen.getByText('えいたんへようこそ！')).toBeInTheDocument()
    fireEvent.click(screen.getByText('つぎへ'))
    fireEvent.click(screen.getByText('つぎへ'))
    fireEvent.click(screen.getByText('タマゴを受け取る 🥚'))
    expect(screen.queryByRole('dialog', { name: 'はじめての案内' })).not.toBeInTheDocument()
    unmount()
    render(<App />)
    expect(screen.queryByText('えいたんへようこそ！')).not.toBeInTheDocument()
  })

  it('すでに学習データがある人には案内を出さない', () => {
    localStorage.removeItem('eitan:onboarded')
    localStorage.setItem('eitan:progress', '{"apple":{"box":1,"due":"2026-10-21"}}')
    render(<App />)
    expect(screen.queryByText('えいたんへようこそ！')).not.toBeInTheDocument()
  })

  it('相棒をタップするとひとこと話す', () => {
    render(<App />)
    fireEvent.click(screen.getByLabelText('相棒にさわる'))
    expect(screen.getByText('（タマゴの中からコトコト音がする）')).toBeInTheDocument()
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
    fireEvent.click(screen.getByText(/クッキー/))
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(20)
    expect(screen.getByText('おやつ（今日あと2回）')).toBeInTheDocument()
  })

  it('記録画面に復習の予定が出る（「覚えた」の単語は明日）', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
    expect(screen.getByText('明日 1語')).toBeInTheDocument()
  })

  it('カードの☆でお気に入りにして、記録画面からお気に入りだけ復習できる', () => {
    render(<App />)
    fireEvent.click(screen.getByLabelText('お気に入り'))
    expect(JSON.parse(localStorage.getItem('eitan:favorites')!)).toEqual([WORDS[0].id])
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
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

  it('記録画面のカレンダーに今日の学習が印される', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
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
    expect(screen.getByText(/週間チャレンジ達成！/)).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('eitan:wallet')!).coins).toBe(55) // 50 + ログインボーナス5
    expect(JSON.parse(localStorage.getItem('eitan:party')!).members[0].xp).toBe(61)
  })

  it('記録画面に単語帳ごとの定着が出る', () => {
    localStorage.setItem('eitan:progress', JSON.stringify({ [WORDS[0].id]: { box: 3, due: '2099-01-01' } }))
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
    expect(screen.getByLabelText('中1の定着')).toHaveAttribute('aria-valuenow', '1')
  })

  it('記録画面に相棒のプロフィール（出会った日・学び方の割合）', () => {
    render(<App />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('覚えた'))
    fireEvent.click(screen.getByRole('button', { name: /記録/ }))
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

  it('単語帳の選択はふだんたたまれていて、タップで開く', () => {
    render(<App />)
    expect(screen.queryByRole('group', { name: '単語帳' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByText(/📚 単語帳：/))
    expect(screen.getByRole('group', { name: '単語帳' })).toBeInTheDocument()
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
    expect(screen.getByText('🎖 見習い')).toBeInTheDocument()
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('まだ'))
    expect(screen.getByText('🎖 かけだし')).toBeInTheDocument()
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
})
