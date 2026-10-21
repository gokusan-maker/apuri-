import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { Monster } from './MonsterView'

it('ふきだしの英語を🔊で聞ける（ふきだしは閉じない）', () => {
  const spoken: string[] = []
  class U {
    text: string
    lang = ''
    rate = 1
    constructor(t: string) {
      this.text = t
    }
  }
  Object.assign(window, { SpeechSynthesisUtterance: U, speechSynthesis: { cancel() {}, speak: (u: U) => spoken.push(u.text), getVoices: () => [] } })
  render(<Monster monster={{ xp: 500 } as never} />)
  fireEvent.click(screen.getByLabelText('相棒にさわる'))
  const before = spoken.length
  fireEvent.click(screen.getByLabelText('ひとことを聞く'))
  expect(spoken.length).toBe(before + 1)
  expect(screen.getByLabelText('ひとことを聞く')).toBeInTheDocument()
})

it('レベルアップしたときは星の目と光の輪', () => {
  render(<Monster monster={{ xp: 500 } as never} leveledUp />)
  expect(document.querySelector('.lvup-ring')).not.toBeNull()
  expect(document.querySelector('.face-star')).not.toBeNull()
})

it('夜だけ夜空が出る', () => {
  const { unmount } = render(<Monster monster={{ xp: 500 } as never} />)
  expect(document.querySelector('.night-sky')).toBeNull()
  unmount()
  render(<Monster monster={{ xp: 500 } as never} night />)
  expect(document.querySelector('.night-sky')).not.toBeNull()
})

it('相棒をさわるとハートが出る', () => {
  render(<Monster monster={{ xp: 500 } as never} />)
  expect(document.querySelector('.poke-hearts')).toBeNull()
  fireEvent.click(screen.getByLabelText('相棒にさわる'))
  expect(document.querySelectorAll('.poke-hearts i')).toHaveLength(3)
})

it('ホームの相棒の横に仲間が小さく出て、タップで交代できる', () => {
  const onSwitch = vi.fn()
  render(<Monster monster={{ xp: 500 } as never} friends={[{ m: { xp: 0, name: 'ポチ' }, i: 2 }]} onSwitch={onSwitch} />)
  fireEvent.click(screen.getByLabelText('ポチと交代'))
  expect(onSwitch).toHaveBeenCalledWith(2)
})
