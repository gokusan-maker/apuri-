import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
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
