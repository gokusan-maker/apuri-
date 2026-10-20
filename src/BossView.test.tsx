import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Boss } from './BossView'
import { wordsOf } from './words'

function answer(correct: boolean) {
  const words = wordsOf(['中1'])
  const en = document.querySelector('.boss .en')!.textContent
  const w = words.find((x) => x.en === en)!
  const btns = [...document.querySelectorAll<HTMLButtonElement>('.choice')]
  fireEvent.click(btns.find((b) => (correct ? b.textContent === w.ja : b.textContent !== w.ja))!)
}

describe('ボス戦', () => {
  it('正解を続けるとボスをたおせる', () => {
    const onWin = vi.fn()
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={onWin} onExit={() => {}} />)
    for (let i = 0; i < 20 && !screen.queryByText('ボスをたおした！ 🎉'); i++) {
      answer(true)
      if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('ボスをたおした！ 🎉')).toBeInTheDocument()
    expect(onWin).toHaveBeenCalledTimes(1)
  })

  it('3回まちがえると負け、もう一度挑戦できる', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
    for (let i = 0; i < 3; i++) {
      answer(false)
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('まけてしまった…')).toBeInTheDocument()
    fireEvent.click(screen.getByText('もう一度挑戦'))
    expect(screen.getByLabelText('のこりハート 3')).toBeInTheDocument()
  })
})
