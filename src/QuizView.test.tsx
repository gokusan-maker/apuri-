import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Quiz } from './QuizView'
import { VERBS } from './irregular'
import { toEnglish } from './numbers'
import { WORDS } from './words'

beforeEach(() => localStorage.clear()) // 最後に遊んだ種類を持ちこさない

// クイズの種類はメニューから選ぶ
function pickMode(label: string) {
  if (!screen.queryByRole('group', { name: 'ミニゲームの種類' })) fireEvent.click(screen.getByText(/ミニゲームをえらぶ/))
  fireEvent.click(screen.getByText(label))
}

describe('Quiz', () => {
  it('正解を選ぶと「正解！」、最後に結果と「もう1回」が出る', () => {
    const words = WORDS.slice(0, 6)
    render(<Quiz words={words} count={2} />)
    for (let n = 0; n < 2; n++) {
      const en = screen.getByText(/^[a-z]+$/).textContent
      const word = words.find((w) => w.en === en)!
      fireEvent.click(screen.getByRole('button', { name: word.ja }))
      expect(screen.getByText(/正解！/)).toBeInTheDocument()
      if (n === 1) expect(screen.getByText('🔥2 コンボ！')).toBeInTheDocument()
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('2 / 2 問正解')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('+22')).toBeInTheDocument() // 10 + 12（2コンボ目はボーナス+2）
    expect(screen.getByText('パーフェクト！すごい！')).toBeInTheDocument()
    fireEvent.click(screen.getByText('もう1回'))
    expect(screen.getByText('1 / 2')).toBeInTheDocument()
  })

  it('間違えると正しい答えを見せる', () => {
    const words = WORDS.slice(0, 6)
    render(<Quiz words={words} count={1} />)
    const en = screen.getByText(/^[a-z]+$/).textContent
    const word = words.find((w) => w.en === en)!
    const wrong = [...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent !== word.ja)!
    fireEvent.click(wrong)
    expect(screen.getByText(`正解は「${word.ja}」`)).toBeInTheDocument()
    // 間違えたときは例文と訳も見せる
    expect(screen.getByText(word.exampleJa)).toBeInTheDocument()
  })
})

describe('コンボ', () => {
  it('間違えるとコンボが切れ、正答率と最大コンボが結果に出る', () => {
    const words = WORDS.slice(0, 6)
    render(<Quiz words={words} count={3} />)
    const answerCorrect = () => {
      const en = document.querySelector('.quiz .en')!.textContent
      const word = words.find((w) => w.en === en)!
      fireEvent.click(screen.getByRole('button', { name: word.ja }))
      fireEvent.click(screen.getByText('次へ'))
    }
    answerCorrect()
    answerCorrect()
    const en = document.querySelector('.quiz .en')!.textContent
    const word = words.find((w) => w.en === en)!
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent !== word.ja)!)
    expect(screen.queryByText(/コンボ！/)).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('次へ'))
    expect(screen.getByText('67%')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})

describe('逆方向クイズ', () => {
  it('日→英では日本語が出て、英単語を選ぶ', () => {
    const words = WORDS.slice(0, 8)
    render(<Quiz words={words} count={1} />)
    pickMode('日→英')
    const ja = document.querySelector('.quiz .en')!.textContent
    const word = words.find((w) => w.ja === ja)!
    expect(word).toBeDefined()
    const buttons = screen.getAllByRole('button').filter((b) => b.className.includes('choice'))
    expect(buttons.map((b) => b.textContent).every((t) => words.some((w) => w.en === t))).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: word.en }))
    expect(screen.getByText(/正解！/)).toBeInTheDocument()
  })

  it('向きを切り替えると最初から', () => {
    const words = WORDS.slice(0, 8)
    render(<Quiz words={words} count={3} />)
    const en = document.querySelector('.quiz .en')!.textContent
    fireEvent.click(screen.getByRole('button', { name: words.find((w) => w.en === en)!.ja }))
    fireEvent.click(screen.getByText('次へ'))
    expect(screen.getByText(/^2 \/ 3/)).toBeInTheDocument()
    pickMode('日→英')
    expect(screen.getByText(/^1 \/ 3/)).toBeInTheDocument()
  })
})

describe('リスニング', () => {
  it('単語は隠れていて読み上げられ、答えると単語が見える', () => {
    const spoken: string[] = []
    class FakeUtterance {
      text: string
      lang = ''
      constructor(t: string) {
        this.text = t
      }
    }
    Object.assign(window, {
      SpeechSynthesisUtterance: FakeUtterance,
      speechSynthesis: { cancel() {}, speak: (u: FakeUtterance) => spoken.push(u.text) },
    })
    const words = WORDS.slice(0, 8)
    render(<Quiz words={words} count={1} direction="listen" />)
    expect(screen.getByText('？')).toBeInTheDocument()
    expect(spoken).toHaveLength(1)
    const word = words.find((w) => w.en === spoken[0])!
    fireEvent.click(screen.getByLabelText('もう一度聞く'))
    expect(spoken).toEqual([word.en, word.en])
    fireEvent.click(screen.getByRole('button', { name: word.ja }))
    expect(screen.getByText(/正解！/)).toBeInTheDocument()
    expect(screen.getByText(word.en)).toBeInTheDocument()
  })
})

it('クイズの「✏️ スペル」でスペル入力に切り替わる', () => {
  render(<Quiz words={WORDS.slice(0, 8)} count={2} />)
  pickMode('✏️ スペル')
  expect(screen.getByLabelText('英単語を入力')).toBeInTheDocument()
  pickMode('英→日')
  expect(document.querySelector('.choice')).not.toBeNull()
})

it('📝 穴埋めでは例文の空欄に入る単語を選び、答えると空欄が埋まる', () => {
  const words = WORDS.slice(0, 10)
  render(<Quiz words={words} count={1} direction="blank" />)
  const sentence = document.querySelector('.blank-sentence')!.textContent!
  const word = words.find((w) => w.example.startsWith(sentence.split('　')[0]) && sentence.endsWith(w.example.slice(-6)))!
  expect(word).toBeDefined()
  fireEvent.click(screen.getByRole('button', { name: word.en }))
  expect(screen.getByText(/正解！/)).toBeInTheDocument()
  expect(document.querySelector('.blank-sentence')!.textContent).toBe(word.example)
})

it('🔁 不規則動詞ドリルで活用を答えられる', () => {
  render(<Quiz words={WORDS.slice(0, 8)} count={1} />)
  pickMode('🔁 不規則動詞')
  const base = document.querySelector('.irregular .en')!.textContent!
  const tense = document.querySelector('.verb-ask strong')!.textContent
  const v = VERBS.find((x) => x.base === base)!
  fireEvent.click(screen.getByRole('button', { name: tense === '過去形' ? v.past : v.pp }))
  expect(screen.getByText('正解！')).toBeInTheDocument()
  expect(screen.getByText(`${v.base} – ${v.past} – ${v.pp}`)).toBeInTheDocument()
})

it('キーボード：数字キーで選び、Enter で次へ', () => {
  const words = WORDS.slice(0, 8)
  render(<Quiz words={words} count={2} />)
  const en = document.querySelector('.quiz .en')!.textContent
  const w = words.find((x) => x.en === en)!
  const idx = [...document.querySelectorAll('.choice')].findIndex((b) => b.textContent === w.ja)
  fireEvent.keyDown(window, { key: String(idx + 1) })
  expect(screen.getByText(/正解！/)).toBeInTheDocument()
  fireEvent.keyDown(window, { key: 'Enter' })
  expect(screen.getByText(/^2 \/ 2/)).toBeInTheDocument()
})

it('🗣 例文リスニング：例文を読み上げ、訳を選ぶ', () => {
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
  const words = WORDS.slice(0, 8)
  render(<Quiz words={words} count={1} direction="sentence" />)
  const w = words.find((x) => x.example === spoken[0])!
  expect(w).toBeDefined()
  fireEvent.click(screen.getByRole('button', { name: w.exampleJa }))
  expect(screen.getByText(/正解！/)).toBeInTheDocument()
  expect(screen.getByText(w.example)).toBeInTheDocument()
})

it('🎲 ミックス：1問ごとに英→日・日→英・リスニングのどれかが出る', () => {
  const words = WORDS.slice(0, 12)
  render(<Quiz words={words} count={5} />)
  pickMode('🎲 ミックス')
  for (let i = 0; i < 5; i++) {
    expect(document.querySelectorAll('.choice')).toHaveLength(4)
    fireEvent.click(document.querySelector<HTMLButtonElement>('.choice')!)
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText(/問正解/)).toBeInTheDocument()
})

it('10問つづけて正解すると特別な演出、コンボ数を知らせる', () => {
  const words = WORDS.slice(0, 20)
  const combos: number[] = []
  render(<Quiz words={words} count={10} onCombo={(c) => combos.push(c)} />)
  for (let i = 0; i < 10; i++) {
    const en = document.querySelector('.quiz .en')!.textContent
    const w = words.find((x) => x.en === en)!
    fireEvent.click(screen.getByRole('button', { name: w.ja }))
    if (i < 9) fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText('🔥10コンボ！ すごい！')).toBeInTheDocument()
  expect(combos).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})

it('結果画面から、まちがえた単語をまとめて★に入れる', () => {
  const words = WORDS.slice(0, 10)
  const got: string[][] = []
  render(<Quiz words={words} count={3} onFavorite={(ids) => got.push(ids)} />)
  const wrongs: string[] = []
  for (let i = 0; i < 3; i++) {
    const en = document.querySelector('.quiz .en')!.textContent!
    const w = words.find((x) => x.en === en)!
    if (i < 2) {
      wrongs.push(w.id)
      fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent !== w.ja)!)
    } else fireEvent.click(screen.getByRole('button', { name: w.ja }))
    fireEvent.click(screen.getByText('次へ'))
  }
  const list = screen.getByRole('list', { name: 'まちがえた単語' })
  expect(list.querySelectorAll('li')).toHaveLength(2)
  for (const id of wrongs) expect(list.textContent).toContain(words.find((w) => w.id === id)!.ja)
  fireEvent.click(screen.getByText('まちがえた単語を★お気に入りに入れる'))
  expect(got).toEqual([wrongs])
  expect(screen.getByText('★に入れました')).toBeDisabled()
})

it('結果画面から、まちがえた問題だけもう一度', () => {
  const words = WORDS.slice(0, 10)
  render(<Quiz words={words} count={3} />)
  const wrongs: string[] = []
  for (let i = 0; i < 3; i++) {
    const en = document.querySelector('.quiz .en')!.textContent!
    const w = words.find((x) => x.en === en)!
    if (i < 2) {
      wrongs.push(en)
      fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent !== w.ja)!)
    } else fireEvent.click(screen.getByRole('button', { name: w.ja }))
    fireEvent.click(screen.getByText('次へ'))
  }
  fireEvent.click(screen.getByText('まちがえた 2問だけもう一度'))
  expect(screen.getByText(/^1 \/ 2/)).toBeInTheDocument()
  expect(wrongs).toContain(document.querySelector('.quiz .en')!.textContent)
})

it('問題数を5問にでき、選んだ数は覚えておく', () => {
  localStorage.clear()
  const { unmount } = render(<Quiz words={WORDS.slice(0, 30)} />)
  fireEvent.click(screen.getByText('5問'))
  expect(screen.getByText(/^1 \/ 5/)).toBeInTheDocument()
  unmount()
  render(<Quiz words={WORDS.slice(0, 30)} />)
  expect(screen.getByText(/^1 \/ 5/)).toBeInTheDocument()
  localStorage.clear()
})

it('⏳ 10秒：時間切れはまちがい扱い、早く答えるとボーナスXP', () => {
  vi.useFakeTimers()
  const words = WORDS.slice(0, 10)
  const got: [boolean, number][] = []
  render(<Quiz words={words} count={2} direction="timed" onAnswer={(c, xp) => got.push([c, xp])} />)
  act(() => vi.advanceTimersByTime(10_000))
  expect(screen.getByText(/時間切れ！/)).toBeInTheDocument()
  fireEvent.click(screen.getByText('次へ'))
  act(() => vi.advanceTimersByTime(3_000))
  const en = document.querySelector('.quiz .en')!.textContent
  fireEvent.click(screen.getByRole('button', { name: words.find((w) => w.en === en)!.ja }))
  expect(got).toEqual([
    [false, 0],
    [true, 17],
  ])
  vi.useRealTimers()
})

it('💡 50:50 でコインを使って選択肢を2つ消す（足りなければ消えない）', () => {
  let coins = 6
  const spend = (n: number) => (coins >= n ? ((coins -= n), true) : false)
  render(<Quiz words={WORDS.slice(0, 10)} count={2} onSpend={spend} />)
  fireEvent.click(screen.getByText(/50:50/))
  expect(document.querySelectorAll('.choice.removed')).toHaveLength(2)
  expect(coins).toBe(1)
  const en = document.querySelector('.quiz .en')!.textContent
  const w = WORDS.find((x) => x.en === en)!
  expect(screen.getByRole('button', { name: w.ja })).not.toHaveClass('removed')
  fireEvent.click(screen.getByRole('button', { name: w.ja }))
  fireEvent.click(screen.getByText('次へ'))
  fireEvent.click(screen.getByText(/50:50/))
  expect(document.querySelectorAll('.choice.removed')).toHaveLength(0)
})

it('メニューから選んだ種類は、次に開いたときも同じ', () => {
  const { unmount } = render(<Quiz words={WORDS.slice(0, 10)} />)
  pickMode('📝 穴埋め')
  expect(document.querySelector('.blank-sentence')).not.toBeNull()
  unmount()
  render(<Quiz words={WORDS.slice(0, 10)} />)
  expect(document.querySelector('.blank-sentence')).not.toBeNull()
})

it('📄 例文の訳：例文を読んで訳を選ぶ', () => {
  const words = WORDS.slice(0, 10)
  render(<Quiz words={words} count={1} direction="sentence-read" />)
  const ex = document.querySelector('.define-prompt')!.textContent
  const w = words.find((x) => x.example === ex)!
  fireEvent.click(screen.getByRole('button', { name: w.exampleJa }))
  expect(screen.getByText(/正解！/)).toBeInTheDocument()
})

it('数の聞き取り：読み上げた数を数字で答える', () => {
  const spoken: string[] = []
  class FakeUtterance {
    text: string
    lang = ''
    constructor(t: string) {
      this.text = t
    }
  }
  Object.assign(window, {
    SpeechSynthesisUtterance: FakeUtterance,
    speechSynthesis: { cancel() {}, speak: (u: FakeUtterance) => spoken.push(u.text) },
  })
  const got: [boolean, string][] = []
  render(<Quiz words={WORDS.slice(0, 8)} onAnswer={(c, _xp, id) => got.push([c, id])} />)
  vi.spyOn(Math, 'random').mockReturnValue(0.9) // 毎回、数の問題で 902
  pickMode('🔢 数・時刻・日付の聞き取り')
  expect(spoken[spoken.length - 1]).toBe(toEnglish(902))
  for (let i = 0; i < 10; i++) {
    expect(screen.getByText(`${i + 1} / 10 問目・正解 ${i}`)).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('答え'), { target: { value: i < 9 ? '902' : '1' } })
    fireEvent.click(screen.getByText('答える'))
    fireEvent.click(screen.getByText('次へ'))
  }
  vi.restoreAllMocks()
  expect(got.filter(([c]) => c)).toHaveLength(9)
  expect(screen.getByText('9 / 10 問正解')).toBeInTheDocument()
  fireEvent.click(screen.getByText('もう1回'))
  expect(screen.getByText('1 / 10 問目・正解 0')).toBeInTheDocument()
})

it('新しく増えた種類は、遊ぶまで NEW マークが出る', () => {
  localStorage.clear()
  render(<Quiz words={WORDS.slice(0, 8)} />)
  fireEvent.click(screen.getByText(/ミニゲームをえらぶ/))
  const emojiBtn = screen.getByText('😀 絵文字クイズ').closest('button')!
  expect(emojiBtn.querySelector('.new-mark')).not.toBeNull()
  expect(screen.getByText('🎧 リスニング').closest('button')!.querySelector('.new-mark')).toBeNull()
  fireEvent.click(emojiBtn)
  fireEvent.click(screen.getByText(/ミニゲームをえらぶ/))
  const menu = screen.getByRole('group', { name: 'ミニゲームの種類' })
  expect([...menu.querySelectorAll('button')].find((b) => b.textContent?.startsWith('😀 絵文字クイズ'))!.querySelector('.new-mark')).toBeNull()
  expect(JSON.parse(localStorage.getItem('eitan:played-modes')!)).toContain('emoji')
})


it('かんたんモードでは選択肢が3つ', () => {
  localStorage.setItem('eitan:settings', JSON.stringify({ easy: true }))
  render(<Quiz words={WORDS.slice(0, 10)} direction="en-ja" />)
  expect(document.querySelectorAll('.choice')).toHaveLength(3)
  localStorage.removeItem('eitan:settings')
})

it('クイズの種類メニューに「パズル・ゲーム」グループがある', () => {
  render(<Quiz words={WORDS.slice(0, 8)} />)
  fireEvent.click(screen.getByText(/ミニゲームをえらぶ/))
  const g = screen.getByText(/パズル・ゲーム/).parentElement!
  expect(g.textContent).toContain('2人対戦')
  expect(g.textContent).toContain('アルファベット')
})

it('クイズの種類メニューのグループはたためて、たたんだことを覚える', () => {
  localStorage.clear()
  const { unmount } = render(<Quiz words={WORDS.slice(0, 8)} />)
  fireEvent.click(screen.getByText(/ミニゲームをえらぶ/))
  fireEvent.click(screen.getByText(/パズル・ゲーム/))
  expect(screen.queryByText('👥 2人対戦')).not.toBeInTheDocument()
  unmount()
  render(<Quiz words={WORDS.slice(0, 8)} />)
  fireEvent.click(screen.getByText(/ミニゲームをえらぶ/))
  expect(screen.getByText(/パズル・ゲーム/).getAttribute('aria-expanded')).toBe('false')
  fireEvent.click(screen.getByText(/パズル・ゲーム/))
  expect(screen.getByText('👥 2人対戦')).toBeInTheDocument()
})

it('問題数を使わない種類では問題数ボタンを出さない', () => {
  render(<Quiz words={WORDS.slice(0, 20)} direction="memory" />)
  expect(screen.queryByRole('group', { name: '問題数' })).not.toBeInTheDocument()
})

it('ふつうの種類では問題数ボタンを出す', () => {
  render(<Quiz words={WORDS.slice(0, 20)} direction="en-ja" />)
  expect(screen.getByRole('group', { name: '問題数' })).toBeInTheDocument()
})

it('しぼりこみ中は、神経衰弱もその単語で遊ぶ', () => {
  const targets = WORDS.slice(100, 106)
  render(<Quiz words={WORDS.slice(0, 50)} targets={targets} direction="memory" />)
  const cards = [...document.querySelectorAll<HTMLButtonElement>('.memory-card')]
  fireEvent.click(cards[0])
  const t = document.querySelectorAll('.memory-card')[0].textContent
  expect(targets.some((w) => w.en === t || w.ja === t)).toBe(true)
})

it('メニューの上に「さいきん遊んだ種類」が出る', () => {
  localStorage.clear()
  const { unmount } = render(<Quiz words={WORDS.slice(0, 20)} />)
  pickMode('🔠 ABC順')
  unmount()
  render(<Quiz words={WORDS.slice(0, 20)} />)
  fireEvent.click(screen.getByText(/ミニゲームをえらぶ/))
  expect(screen.getByText('↺ 🔠 ABC順')).toBeInTheDocument()
  localStorage.clear()
})

it('ミニゲームの選択ボタンに、いまのゲーム名と「🎮 ミニゲームをえらぶ」が出る', () => {
  localStorage.clear()
  render(<Quiz words={WORDS} />)
  const btn = screen.getByText(/ミニゲームをえらぶ/).closest('button')!
  expect(btn.textContent).toMatch(/いま：/)
  fireEvent.click(btn)
  expect(screen.getByRole('group', { name: 'ミニゲームの種類' })).toBeInTheDocument()
})

it('ミニゲームの結果画面から「🎮 ほかのミニゲーム」でえらびなおせる', () => {
  localStorage.clear()
  const words = WORDS.slice(0, 6)
  render(<Quiz words={words} count={1} />)
  const en = screen.getByText(/^[a-z]+$/).textContent
  fireEvent.click(screen.getByRole('button', { name: words.find((w) => w.en === en)!.ja }))
  fireEvent.click(screen.getByText('次へ'))
  fireEvent.click(screen.getByText('🎮 ほかのミニゲーム'))
  expect(screen.getByRole('group', { name: 'ミニゲームの種類' })).toBeInTheDocument()
})

it('単語ゲームの中の文法のミニゲーム（複数形など）の答えは、文法のなかま用のコールバックへ', async () => {
  const { isGrammarGame } = await import('./quizgames')
  expect(isGrammarGame('plural')).toBe(true)
  expect(isGrammarGame('be')).toBe(true)
  expect(isGrammarGame('en-ja')).toBe(false)
  expect(isGrammarGame('confusing')).toBe(false)
})
