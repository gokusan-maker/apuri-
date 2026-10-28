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

it('相棒をなでても、なでた回数（なでなで10回！など）はふえていく数として出さない', () => {
  render(<Monster monster={{ xp: 500 } as never} />)
  for (let i = 0; i < 10; i++) fireEvent.click(screen.getByLabelText('相棒にさわる'))
  expect(screen.queryByText(/なでなで\d+回/)).toBeNull()
})

it('相棒：レベルアップまであと少し（8割以上）だと経験値のバーがきらきら光る', () => {
  const { unmount } = render(<Monster monster={{ xp: 17 } as never} />)
  expect(document.querySelector('.xp-bar.almost')).not.toBeNull()
  unmount()
  render(<Monster monster={{ xp: 5 } as never} />)
  expect(document.querySelector('.xp-bar')).not.toBeNull()
  expect(document.querySelector('.xp-bar.almost')).toBeNull()
})

it('相棒の画面：コインの数が変わると、数字が作りなおされて下からすっと入れかわる', () => {
  const r = render(<Monster monster={{ xp: 0 } as never} coins={10} />)
  const before = document.querySelector('.coin-num')!
  expect(screen.getByLabelText('コイン 10枚・ショップを開く').textContent).toBe('🪙 10')
  r.rerender(<Monster monster={{ xp: 0 } as never} coins={15} />)
  expect(document.querySelector('.coin-num')).not.toBe(before)
  expect(document.querySelector('.coin-num')!.textContent).toBe('15')
})
