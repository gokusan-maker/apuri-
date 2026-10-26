import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Spell } from './SpellView'
import { WORDS } from './words'

// 文字のボタンを押して、つづりをつくる
function tapSpelling(en: string) {
  for (const c of [...en].filter((x) => x !== ' ')) {
    const b = screen.getAllByRole('button', { name: `文字 ${c}` }).find((x) => !(x as HTMLButtonElement).disabled)!
    fireEvent.click(b)
  }
}


function current() {
  const ja = document.querySelector('.spell .en')!.textContent
  return WORDS.find((w) => w.ja === ja)!
}

describe('Spell', () => {
  it('正しく入力すると正解、ヒントで1文字ずつ見える', () => {
    const onAnswer = vi.fn()
    render(<Spell words={WORDS.slice(0, 5)} count={2} onAnswer={onAnswer} />)
    const w = current()
    fireEvent.click(screen.getByText('1文字ヒント'))
    expect(screen.getByLabelText('ヒント').textContent!.startsWith(w.en[0] + ' ')).toBe(true)
    tapSpelling(w.en)
    fireEvent.click(screen.getByText('こたえる'))
    expect(screen.getByText('正解！')).toBeInTheDocument()
    expect(onAnswer).toHaveBeenCalledWith(true, 8, w.id, 'ear')
  })

  it('まちがえると正しいつづりを見せ、最後に結果', () => {
    render(<Spell words={WORDS.slice(0, 5)} count={1} />)
    const w = current()
    // 最後の文字から押して、まちがったつづりにする
    const wrong = [...w.en].filter((c) => c !== ' ').reverse().join('')
    const ng = wrong === w.en.replace(/ /g, '') ? `${w.en}`.slice(1) : wrong
    tapSpelling(ng)
    fireEvent.click(screen.getByText('こたえる'))
    expect(screen.getByText(`正解は「${w.en}」`)).toBeInTheDocument()
    expect(screen.getByLabelText('あなたの答え').querySelectorAll('.spell-ng').length).toBeGreaterThan(0)
    fireEvent.click(screen.getByText('次へ'))
    expect(screen.getByText('0 / 1 問正解')).toBeInTheDocument()
  })
})

describe('ディクテーション', () => {
  it('音声で出題され、同音異義語で迷わないよう意味もヒントで出る', () => {
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
    const words = WORDS.slice(0, 3)
    render(<Spell words={words} count={1} byEar />)
    expect(spoken).toHaveLength(1)
    const w = words.find((x) => x.en === spoken[0])!
    expect(screen.getByText(`聞こえた英単語を、文字のボタンでつくろう（意味：${w.ja}）`)).toBeInTheDocument()
    expect(screen.queryByText(w.en)).not.toBeInTheDocument()
    tapSpelling(w.en)
    fireEvent.click(screen.getByText('こたえる'))
    expect(screen.getByText('正解！')).toBeInTheDocument()
  })
})

it('かんたんモードでは日→英スペルに絵文字のヒント', () => {
  localStorage.setItem('eitan:settings', JSON.stringify({ easy: true }))
  const w = WORDS.find((x) => x.id === 'apple')!
  render(<Spell words={[w]} count={1} />)
  expect(document.querySelector('.ja-prompt')!.textContent).toContain('🍎')
  localStorage.clear()
})

it('キーボードで打たず、答えの文字のボタンを押してつづる（消すボタンつき）', () => {
  const w = WORDS.find((x) => x.id === 'apple')!
  render(<Spell words={[w]} count={1} />)
  expect(document.querySelector('.spell input')).toBeNull()
  expect(screen.getAllByRole('button', { name: /^文字 / })).toHaveLength(w.en.length)
  fireEvent.click(screen.getAllByRole('button', { name: '文字 a' })[0])
  expect(screen.getByLabelText('あなたのつづり').textContent).toBe('a____')
  fireEvent.click(screen.getByText('⌫ 1文字消す'))
  expect(screen.getByLabelText('あなたのつづり').textContent).toBe('_____')
})

it('熟語は単語の区切りの空白が自動で入る', async () => {
  const { builtSpelling } = await import('./spell')
  expect(builtSpelling('look for', [...'lookf'])).toBe('look f')
  expect(builtSpelling('look for', [...'lookfor'])).toBe('look for')
})

it('スペルも2問続けて正解すると連続正解のコンボが出る', () => {
  const ws = WORDS.slice(0, 2)
  render(<Spell words={ws} count={2} />)
  for (let i = 0; i < 2; i++) {
    const w = current()
    tapSpelling(w.en)
    fireEvent.click(screen.getByText('こたえる'))
    if (i === 0) fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText('🔥 2連続正解！')).toBeInTheDocument()
})
