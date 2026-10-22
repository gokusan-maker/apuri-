// レビューで見つかった不具合の再発防止テスト
import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { BOSS_XP } from './boss'
import { LONG_PASSAGES } from './longreading'
import { passageQs } from './readingboss'
import { loadBuddies } from './buddies'
import { loadMissions, missionsFor } from './missions'
import { quizXp } from './monster'
import { loadParty } from './party'
import { Pronounce } from './PronounceView'
import { Quiz } from './QuizView'
import { dayKey, loadProgress } from './srs'
import { stagesOf } from './stages'
import { Stages } from './StageView'
import { WORDS } from './words'

const navTo = (name: string) => fireEvent.click(within(screen.getByRole('navigation', { name: '画面の切り替え' })).getByText(name))


describe('再発防止', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('eitan:onboarded', '1')
  })

  it('ボスをたおした最後の一撃のXPも、ボーナスと一緒にちゃんと入る', () => {
    // ステージのボス（読解問題）で確かめる
    const today = dayKey()
    localStorage.setItem('eitan:levels', JSON.stringify(['熟語']))
    localStorage.setItem('eitan:lucky', dayKey()) // ラッキー単語のボーナスが入らないように
    localStorage.setItem('eitan:stages', JSON.stringify(Object.fromEntries(stagesOf('熟語').map((s) => [s.id, 1]))))
    // ミッションのボーナスが混ざらないよう、今日の分は受け取り済みにしておく
    localStorage.setItem('eitan:missions', JSON.stringify({ day: today, counts: {}, claimed: missionsFor(today).map((m) => m.id) }))
    render(<App />)
    navTo('長文')
    fireEvent.click(screen.getByText(/👹 ボス「.+」に挑戦！/))
    // ステージのボスは読解問題なので、長文の問題から正解をさがして答える
    const all = LONG_PASSAGES.flatMap(passageQs)
    let expected = BOSS_XP
    for (let c = 1; c <= 20 && !screen.queryByText('ボスをたおした！ 🎉'); c++) {
      const en = document.querySelector('.boss .en')!.textContent
      const q = all.find((x) => x.word.en === en)!
      fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === q.choices[q.answer])!)
      expected += quizXp(c)
      if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('ボスをたおした！ 🎉')).toBeInTheDocument()
    expect(loadBuddies().reading.xp).toBe(expected) // 読解ボスの XP は長文のなかま（竜）へ
  })

  it('発音練習は同じ単語で何度言っても記録は1回だけ', () => {
    let last: { onresult: ((e: unknown) => void) | null; onerror: ((e: unknown) => void) | null } = {
      onresult: null,
      onerror: null,
    }
    class Rec {
      lang = ''
      maxAlternatives = 1
      interimResults = false
      onresult = null
      onerror = null
      onend = null
      constructor() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        last = this
      }
      start() {}
      abort() {
        last.onerror?.({ error: 'aborted' })
      }
    }
    Object.assign(window, { webkitSpeechRecognition: Rec })
    const onAnswer = vi.fn()
    render(<Pronounce words={WORDS.slice(0, 2)} count={2} onAnswer={onAnswer} />)
    const en = document.querySelector('.pronounce .en')!.textContent!
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByLabelText('話す'))
      act(() => last.onresult!({ results: [[{ transcript: en }]] }))
    }
    expect(onAnswer).toHaveBeenCalledTimes(1)
    // 聞いている途中で次へ進んでも、次の単語にエラーが出ない
    fireEvent.click(screen.getByLabelText('話す'))
    fireEvent.click(screen.getByText('次の単語'))
    expect(screen.queryByText('うまく聞き取れませんでした')).not.toBeInTheDocument()
    delete (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
  })

  it('壊れた保存データやおかしなバックアップでもアプリが落ちない', () => {
    localStorage.setItem('eitan:progress', '[1,2]')
    expect(loadProgress()).toEqual({})
    localStorage.setItem('eitan:progress', '{"apple":null,"early":{"box":1,"due":"2026-10-21"}}')
    expect(Object.keys(loadProgress())).toEqual(['early'])
    localStorage.setItem('eitan:missions', JSON.stringify({ day: dayKey(), counts: null, claimed: [] }))
    expect(loadMissions(dayKey()).counts).toEqual({})
    localStorage.setItem('eitan:party', JSON.stringify({ active: 0, members: [{ xp: 99999, branch: 'magic', seen: 'x' }] }))
    expect(loadParty().members[0]).toEqual({ xp: 99999 })
    render(<App />)
    expect(document.querySelector('.monster-name')).not.toBeNull()
  })

  it('ステージ中は出題の向きを切り替えられない', () => {
    render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
    fireEvent.click(screen.getByLabelText('中1 ステージ1'))
    expect(screen.queryByText('✏️ スペル')).not.toBeInTheDocument()
  })

  it('穴埋めにできない単語だけでも NaN にならず、ふつうの単語から出題する', () => {
    const my = { id: 'my:1', en: 'sunflower', ja: 'ひまわり', example: '', exampleJa: '' }
    render(<Quiz words={[...WORDS, my]} targets={[my]} direction="blank" count={3} />)
    expect(document.querySelector('.blank-sentence')).not.toBeNull()
    expect(screen.queryByText(/NaN/)).not.toBeInTheDocument()
  })
})
