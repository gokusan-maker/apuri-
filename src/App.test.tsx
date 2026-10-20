import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'
import { dayKey } from './srs'
import { WORDS, wordsOf } from './words'

describe('App', () => {
  beforeEach(() => localStorage.clear())

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
    expect(JSON.parse(localStorage.getItem('eitan:monster')!).xp).toBe(5)
  })

  it('クイズで正解するとXP+10、タマゴがかえる', () => {
    localStorage.setItem('eitan:monster', JSON.stringify({ xp: 15 }))
    render(<App />)
    fireEvent.click(screen.getByText('クイズ'))
    const en = document.querySelector('.quiz .en')!.textContent
    const word = WORDS.find((w) => w.en === en)!
    fireEvent.click(screen.getByRole('button', { name: word.ja }))
    expect(screen.getByText('タマゴがかえった！')).toBeInTheDocument()
    expect(screen.getByText(/ちびモチ/)).toBeInTheDocument()
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
    for (const l of ['中2', '中3', '高校基礎']) fireEvent.click(screen.getByRole('button', { name: l }))
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
    fireEvent.click(screen.getByText('苦手だけ復習する'))
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
    fireEvent.click(screen.getByRole('checkbox'))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(JSON.parse(localStorage.getItem('eitan:settings')!)).toEqual({
      rate: 0.7,
      accent: 'en-GB',
      theme: 'dark',
      sound: false,
      dailyGoal: 20,
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
})
