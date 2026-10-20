import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Placement } from './PlacementView'
import { WORDS } from './words'

it('16問答えると、おすすめの単語帳が出て切りかえられる', () => {
  let set: string[] = []
  render(<Placement onSetLevels={(l) => (set = l)} />)
  for (let i = 0; i < 16; i++) {
    const en = document.querySelector('.quiz .en')!.textContent
    const w = WORDS.find((x) => x.en === en)!
    // 中1・中2だけ正解する
    const right = i < 8
    const btns = [...document.querySelectorAll<HTMLButtonElement>('.choice')]
    fireEvent.click(right ? btns.find((b) => b.textContent === w.ja)! : btns.find((b) => b.textContent !== w.ja)!)
  }
  expect(screen.getByText('おすすめの単語帳：中3')).toBeInTheDocument()
  fireEvent.click(screen.getByText('「中3」で学習する'))
  expect(set).toEqual(['中3'])
})
