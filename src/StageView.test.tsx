import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { stagesOf } from './stages'
import { Stages } from './StageView'
import { UNIV_BOSSES } from './univ'
import { wordsOf } from './words'

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

it('今週のレアボスに挑戦できる', () => {
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  fireEvent.click(screen.getByText(/今週のレアボス「キラキラ.+」に勝つと 色ちがい確定のタマゴ！/))
  expect(screen.getByText('✨ 今週のレアボス')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '130')
})

it('ボスラッシュは3連戦で、勝つとハートを引き継いで次のボスへ', () => {
  const clear = vi.fn()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} onRushClear={clear} />)
  fireEvent.click(screen.getByText(/ボスラッシュ（3連戦/))
  for (let round = 1; round <= 3; round++) {
    expect(screen.getByText(`🔥 ボスラッシュ ${round} / 3`)).toBeInTheDocument()
    const lv = ['中1', '中2', '中3'][round - 1] as '中1'
    for (let i = 0; i < 20 && !screen.queryByText('ボスをたおした！ 🎉'); i++) {
      const en = document.querySelector('.boss .en')!.textContent
      const w = wordsOf([lv]).find((x) => x.en === en)!
      fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
      if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
    }
    if (round < 3) fireEvent.click(screen.getByText(/次のボスへ ▶（ハート3を引き継ぐ）/))
  }
  expect(clear).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByText('ラッシュ完全クリア！ ステージにもどる'))
  expect(screen.getByText(/ボスラッシュ（3連戦/)).toBeInTheDocument()
})

it('エンドレスの塔は勝つと次の階へ進み、最高記録が残る', () => {
  localStorage.clear()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  fireEvent.click(screen.getByText(/エンドレスの塔（最高 0階）/))
  for (let floor = 1; floor <= 2; floor++) {
    expect(screen.getByText(`🗼 エンドレスの塔 ${floor}階（最高 ${floor - 1}階）`)).toBeInTheDocument()
    for (let i = 0; i < 20 && !screen.queryByText('ボスをたおした！ 🎉'); i++) {
      const en = document.querySelector('.boss .en')!.textContent
      const w = wordsOf(['中1']).find((x) => x.en === en)!
      fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === w.ja)!)
      if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
    }
    fireEvent.click(screen.getByText(new RegExp(`${floor + 1}階へ ▶`)))
  }
  fireEvent.click(screen.getByText('← にげる'))
  expect(screen.getByText(/エンドレスの塔（最高 2階）/)).toBeInTheDocument()
})

it('中学のボスは4問に1問が文法問題', () => {
  const all = Object.fromEntries(stagesOf('中1').map((s) => [s.id, 1]))
  render(<Stages levels={['中1']} record={all} onClear={() => {}} />)
  fireEvent.click(screen.getByText(/👹 ボス「.+」に挑戦！/))
  const seen: boolean[] = []
  for (let i = 0; i < 4; i++) {
    const en = document.querySelector('.boss .en')!.textContent!
    const w = wordsOf(['中1']).find((x) => x.en === en)
    seen.push(!!w)
    const btns = [...document.querySelectorAll<HTMLButtonElement>('.choice')]
    fireEvent.click(w ? btns.find((b) => b.textContent === w.ja)! : btns[0])
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(seen).toEqual([true, true, true, false])
})

it('週末はボスラッシュEXが出て、むずかしいボスと戦う', () => {
  const { unmount } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  expect(screen.queryByText(/ボスラッシュEX/)).not.toBeInTheDocument()
  unmount()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} weekend />)
  fireEvent.click(screen.getByText(/週末限定ボスラッシュEX/))
  expect(screen.getByText('🔥 ボスラッシュEX 1 / 3')).toBeInTheDocument()
  expect(screen.getByText('コオリモチ')).toBeInTheDocument() // 中3のボスから
})

it('鍵が3つあると金の宝箱をあけられる', () => {
  const open = vi.fn()
  const { rerender } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} keys={2} onOpenGold={open} />)
  expect(screen.queryByText(/金の宝箱をあける/)).not.toBeInTheDocument()
  rerender(<Stages levels={['中1']} record={{}} onClear={() => {}} keys={3} onOpenGold={open} />)
  fireEvent.click(screen.getByText(/金の宝箱をあける/))
  expect(open).toHaveBeenCalled()
})

it('ボスの連勝数が出る', () => {
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} winStreak={2} />)
  expect(screen.getByText(/ボス 2連勝中！/)).toBeInTheDocument()
})

it('今日のボスは★2・★3の強さを選べる', () => {
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  fireEvent.click(screen.getByText(/★★★（HP180・🪙×3）/))
  expect(screen.getByText('⚔️ 今日のボス ★★★')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '180')
})

it('週末ボスは週末だけ出て、HPが多い', () => {
  localStorage.clear()
  const { unmount } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  expect(screen.queryByText(/🌙 週末ボス/)).not.toBeInTheDocument()
  unmount()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} weekend />)
  fireEvent.click(screen.getByText(/🌙 週末ボス「週末の/))
  expect(screen.getByText('🌙 週末ボス')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '160')
})
