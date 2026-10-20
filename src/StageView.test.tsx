import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { stagesOf } from './stages'
import { Stages } from './StageView'

describe('ステージ画面', () => {
  it('ステージ1だけ遊べて、全問正解で星3つ', () => {
    const onClear = vi.fn()
    render(<Stages levels={['中1']} record={{}} onClear={onClear} />)
    expect(screen.getByLabelText('中1 ステージ2（ロック中）')).toBeDisabled()
    fireEvent.click(screen.getByLabelText('中1 ステージ1'))
    const words = stagesOf('中1')[0].words
    for (let i = 0; i < 10; i++) {
      const en = document.querySelector('.quiz .en')!.textContent
      const w = words.find((x) => x.en === en)!
      expect(w).toBeDefined()
      fireEvent.click(screen.getByRole('button', { name: w.ja }))
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(onClear).toHaveBeenCalledWith('中1-1', 3)
    expect(screen.getByText('クリア！ ★★★')).toBeInTheDocument()
    fireEvent.click(screen.getByText('もう1回'))
    expect(screen.queryByText('クリア！ ★★★')).not.toBeInTheDocument()
    expect(screen.getByText(/^1 \/ 10/)).toBeInTheDocument()
  })
})

it('全ステージをクリアするとボスに挑戦できる', () => {
  const all = Object.fromEntries(stagesOf('中3').map((s) => [s.id, 1]))
  render(<Stages levels={['中3']} record={all} onClear={() => {}} />)
  fireEvent.click(screen.getByText('👹 ボスに挑戦！'))
  expect(screen.getByText('ヤミモチ')).toBeInTheDocument()
  fireEvent.click(screen.getByText('← にげる'))
  expect(screen.getByText('ステージ')).toBeInTheDocument()
})
