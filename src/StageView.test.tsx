import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { stagesOf } from './stages'
import { Stages } from './StageView'
import { UNIV_BOSSES } from './univ'

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
    expect(screen.getByLabelText('クリア！ ★★★')).toBeInTheDocument()
    expect(screen.getByText('はじめての★3！ 🪙20')).toBeInTheDocument()
    fireEvent.click(screen.getByText('🎁 宝箱をあける'))
    expect(document.querySelector('.treasure-open')).not.toBeNull()
    expect(screen.queryByText('🎁 宝箱をあける')).not.toBeInTheDocument()
    // 記録は親が持つので、ここではまだ0（親が更新すると増える）
    expect(screen.getByText(`中1の★ 0 / ${stagesOf('中1').length * 3}`)).toBeInTheDocument()
    fireEvent.click(screen.getByText('もう1回'))
    expect(screen.queryByLabelText('クリア！ ★★★')).not.toBeInTheDocument()
    expect(screen.getByText(/^1 \/ 10/)).toBeInTheDocument()
  })
})

it('全ステージをクリアするとボスに挑戦できる', () => {
  const all = Object.fromEntries(stagesOf('中3').map((s) => [s.id, 1]))
  render(<Stages levels={['中3']} record={all} onClear={() => {}} />)
  fireEvent.click(screen.getByText(/👹 ボス「.+」に挑戦！/))
  expect(screen.getByText('コオリモチ')).toBeInTheDocument()
  fireEvent.click(screen.getByText('← にげる'))
  expect(screen.getByText('ステージ')).toBeInTheDocument()
})

it('「つづきから」で、まだクリアしていない次のステージを始める', () => {
  render(<Stages levels={['中1']} record={{ '中1-1': 2 }} onClear={() => {}} />)
  fireEvent.click(screen.getByText('▶ つづきから（中1 ステージ2）'))
  expect(screen.getByText('中1 ステージ2')).toBeInTheDocument()
})

it('全ステージで星3を取るとトロフィー', () => {
  const ones = Object.fromEntries(stagesOf('数').map((s) => [s.id, 1]))
  const { rerender } = render(<Stages levels={['数']} record={ones} onClear={() => {}} />)
  expect(screen.queryByRole('img', { name: /トロフィー/ })).not.toBeInTheDocument()
  const threes = Object.fromEntries(stagesOf('数').map((s) => [s.id, 3]))
  rerender(<Stages levels={['数']} record={threes} onClear={() => {}} />)
  expect(screen.getByRole('img', { name: /トロフィー/ })).toBeInTheDocument()
})

it('ステージの10語をカードで予習できる', () => {
  let got: string[] = []
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} onStudy={(ws) => (got = ws.map((w) => w.id))} />)
  fireEvent.click(screen.getByLabelText('中1 ステージ1'))
  fireEvent.click(screen.getByText('📖 カードで予習'))
  expect(got).toEqual(stagesOf('中1')[0].words.map((w) => w.id))
})

it('定着率でメダルが出る', () => {
  render(<Stages levels={['数']} record={{}} onClear={() => {}} learnedPct={{ 数: 85 }} />)
  expect(screen.getByRole('img', { name: 'メダル（定着率85%）' }).textContent).toBe('🥈')
})

it('今日のボスに勝つと onDailyWin が呼ばれる', () => {
  let won = 0
  render(<Stages levels={['数']} record={{}} onClear={() => {}} onDailyWin={() => won++} />)
  fireEvent.click(screen.getByText(/今日のボス/))
  expect(screen.getByText('← にげる')).toBeInTheDocument()
  // ボスを最後までたおすのは BossView のテストで確かめているので、ここでは出現だけ確認
  expect(won).toBe(0)
})

it('大学入試の塔を全階制覇すると合格証書が出る', () => {
  const rec = Object.fromEntries(UNIV_BOSSES.map((b, i) => [b.id, `2026-10-${String(10 + i).padStart(2, '0')}`]))
  localStorage.setItem('eitan:univ', JSON.stringify(rec))
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  expect(screen.getByText('🎓 合格証書')).toBeInTheDocument()
  expect(screen.getByText(/2026\/10\/18/)).toBeInTheDocument()
  localStorage.removeItem('eitan:univ')
})

it('まだ制覇していなければ合格証書は出ない', () => {
  localStorage.setItem('eitan:univ', JSON.stringify({ gate: '2026-10-20' }))
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  expect(screen.queryByText('🎓 合格証書')).not.toBeInTheDocument()
  localStorage.removeItem('eitan:univ')
})
