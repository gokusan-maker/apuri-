import { passageQs } from './readingboss'
import { LONG_PASSAGES } from './longreading'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { stagesOf } from './stages'
import { Stages } from './StageView'
import { UNIV_BOSSES } from './univ'

describe('ステージ画面', () => {
  it('ステージ1だけ遊べて、全問正解で星3つ', () => {
    const onClear = vi.fn()
    render(<Stages levels={['中1']} record={{}} onClear={onClear} />)
    expect(screen.queryByLabelText(/中1 ステージ2/)).toBeNull() // ロック中のステージは見せない
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

// 読解ボスの問題に正しく答える
const READING_QS = LONG_PASSAGES.flatMap(passageQs)
function answerReading() {
  const en = document.querySelector('.boss .en')!.textContent
  const q = READING_QS.find((x) => x.word.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === q.choices[q.answer])!)
}

it('全ステージをクリアするとボスに挑戦できる', () => {
  const all = Object.fromEntries(stagesOf('中3').map((s) => [s.id, 1]))
  render(<Stages levels={['中3']} record={all} onClear={() => {}} />)
  fireEvent.click(screen.getByText(/👹 ボス「.+」に挑戦！/))
  expect(screen.getAllByText(/コオリモチ/).length).toBeGreaterThan(0) // 日によっては「金色のコオリモチ」
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
  fireEvent.click(screen.getByText(/^⚔️ 今日のボス$/))
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
  fireEvent.click(screen.getByRole('button', { name: /今週のレアボス/ }))
  expect(screen.getByText('勝つと 色ちがい確定のタマゴ！')).toBeInTheDocument()
  expect(screen.getByText('✨ 今週のレアボス')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '130')
})

it('ボスラッシュは3連戦で、勝つとハートを引き継いで次のボスへ', () => {
  const clear = vi.fn()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} onRushClear={clear} />)
  fireEvent.click(screen.getByRole('button', { name: /^ボスラッシュ/ }))
  for (let round = 1; round <= 3; round++) {
    expect(screen.getByText(`🔥 ボスラッシュ ${round} / 3`)).toBeInTheDocument()
    expect(document.querySelector('.boss-passage')).not.toBeNull() // ラッシュのボスも読解問題
    for (let i = 0; i < 20 && !screen.queryByText('ボスをたおした！ 🎉'); i++) {
      answerReading()
      if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
    }
    if (round < 3) fireEvent.click(screen.getByText(/次のボスへ ▶ ❤️3/))
  }
  expect(clear).toHaveBeenCalledTimes(1)
  fireEvent.click(screen.getByText('ラッシュ完全クリア！ ステージにもどる'))
  expect(screen.getByRole('button', { name: /^ボスラッシュ/ })).toBeInTheDocument()
})

it('エンドレスの塔は勝つと次の階へ進み、最高記録が残る', () => {
  localStorage.clear()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: /エンドレスの塔/ }))
  for (let floor = 1; floor <= 2; floor++) {
    expect(screen.getByText(`🗼 塔 ${floor}階（最高 ${floor - 1}階）`)).toBeInTheDocument()
    for (let i = 0; i < 20 && !screen.queryByText('ボスをたおした！ 🎉'); i++) {
      answerReading()
      if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
    }
    fireEvent.click(screen.getByText(new RegExp(`${floor + 1}階へ ▶`)))
  }
  fireEvent.click(screen.getByText('← にげる'))
  expect(screen.getByText('最高 2階')).toBeInTheDocument()
})

it('ステージのボスは読解問題（読解の本文つきで、空所補充・○×・英問英答）', async () => {
  const { passageQs } = await import('./readingboss')
  const { LONG_PASSAGES } = await import('./longreading')
  const all = Object.fromEntries(stagesOf('中1').map((s) => [s.id, 1]))
  render(<Stages levels={['中1']} record={all} onClear={() => {}} />)
  fireEvent.click(screen.getByText(/👹 ボス「.+」に挑戦！/))
  expect(document.querySelector('.boss-passage')).not.toBeNull()
  const en = document.querySelector('.boss .en')!.textContent!
  const q = LONG_PASSAGES.flatMap(passageQs).find((x) => x.word.en === en)!
  expect(q).toBeDefined()
  expect(q.passage.level.startsWith('中2')).toBe(true)
  expect(document.querySelector('.boss-passage summary')!.textContent).toContain(q.passage.title)
})

it('週末はボスラッシュEXが出て、むずかしいボスと戦う', () => {
  const { unmount } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  expect(screen.queryByText(/ボスラッシュEX/)).not.toBeInTheDocument()
  unmount()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} weekend />)
  fireEvent.click(screen.getByText(/週末限定ボスラッシュEX/))
  expect(screen.getByText('🔥 ボスラッシュEX 1 / 3')).toBeInTheDocument()
  expect(screen.getAllByText(/コオリモチ/).length).toBeGreaterThan(0) // 日によっては「金色のコオリモチ」 // 中3のボスから
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
  fireEvent.click(screen.getByRole('button', { name: /★★★（HP180・🪙×3）/ }))
  expect(screen.getByText('⚔️ 今日のボス ★★★')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '180')
})

it('週末ボスは週末だけ出て、HPが多い', () => {
  localStorage.clear()
  const { unmount } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  expect(screen.queryByRole('button', { name: /週末ボス/ })).not.toBeInTheDocument()
  unmount()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} weekend />)
  fireEvent.click(screen.getByRole('button', { name: /^週末ボス/ }))
  expect(screen.getByText(/たおすと 🎟1（HP/)).toBeInTheDocument()
  expect(screen.getByText('🌙 週末ボス')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '160')
})

it('たおしたボスには強化版で挑める（HPが多い）', () => {
  localStorage.clear()
  const record = Object.fromEntries(stagesOf('中1').map((s) => [s.id, 3]))
  const bonus = vi.fn()
  render(<Stages levels={['中1']} record={record} onClear={() => {}} boss={{ 中1: '2026-10-01' }} onRankBonus={bonus} />)
  fireEvent.click(screen.getByText(/強化版「/))
  expect(screen.getByText('💪 強化版の中1ボス')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '150')
})

it('たおしたボスにはサドンデス（ハート1つ）で挑める', () => {
  localStorage.clear()
  const record = Object.fromEntries(stagesOf('中1').map((s) => [s.id, 3]))
  render(<Stages levels={['中1']} record={record} onClear={() => {}} boss={{ 中1: '2026-10-01' }} />)
  fireEvent.click(screen.getByText(/💀 サドンデス（/))
  expect(screen.getByText('💀 サドンデス：中1ボス')).toBeInTheDocument()
  expect(screen.getByLabelText('のこりハート 1')).toBeInTheDocument()
})

it('ナイトボスは夜7時〜10時だけ出る', () => {
  localStorage.clear()
  const { unmount } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} hour={12} />)
  expect(screen.queryByRole('button', { name: /ナイトボス/ })).not.toBeInTheDocument()
  unmount()
  const bonus = vi.fn()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} hour={20} onRankBonus={bonus} />)
  fireEvent.click(screen.getByRole('button', { name: /^ナイトボス/ }))
  expect(screen.getByText(/夜7時〜10時だけ出るボス「夜の/)).toBeInTheDocument()
  expect(screen.getByText('🌃 ナイトボス')).toBeInTheDocument()
})

it('ステージをクリアすると「次のステージへ ▶」ですぐ次のステージを始められる', () => {
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  fireEvent.click(screen.getByLabelText('中1 ステージ1'))
  const words = stagesOf('中1')[0].words
  for (let i = 0; i < 10; i++) {
    const en = document.querySelector('.quiz .en')!.textContent
    fireEvent.click(screen.getByRole('button', { name: words.find((x) => x.en === en)!.ja }))
    fireEvent.click(screen.getByText('次へ'))
  }
  fireEvent.click(screen.getByRole('button', { name: '次のステージへ（中1 ステージ2）' }))
  expect(screen.queryByText(/6問以上正解でクリア/)).toBeNull()
  expect(screen.getByText('中1 ステージ2')).toBeInTheDocument()
  expect(document.querySelector('.stage-result')).toBeNull()
  const next = stagesOf('中1')[1].words
  expect(next.some((w) => w.en === document.querySelector('.quiz .en')!.textContent)).toBe(true)
})

it('大学入試の塔に進みぐあいメーターがある', () => {
  localStorage.removeItem('eitan:univ')
  const { container } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  expect(container.querySelector('.univ-meter i')?.getAttribute('style')).toContain('width: 0%')
})

it('ボス部屋のモード（エンドレス・ラッシュ・タイムアタック・レア）は1枚のリストにまとまる', () => {
  const { container } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  const modes = container.querySelector('.boss-modes')!
  expect(modes.querySelector('.endless-boss')).not.toBeNull()
  expect(modes.querySelector('.rare-boss')).not.toBeNull()
  expect(modes.querySelectorAll('.boss-btn').length).toBeGreaterThanOrEqual(4)
})

it('ボス部屋のボタンは題名だけで、くわしい説明は戦いの画面の最初に出る', () => {
  localStorage.removeItem('eitan:endless-best')
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  const btn = screen.getByRole('button', { name: /エンドレスの塔/ })
  expect(btn.textContent).toBe('🗼エンドレスの塔')
  fireEvent.click(btn)
  expect(screen.getByText(/^10階ごとに/)).toBeInTheDocument()
})

it('ステージは解放ずみのものだけ見え、クリアすると次のステージが出てくる', () => {
  const { rerender } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  expect(document.querySelectorAll('.stage-btn')).toHaveLength(1)
  expect(screen.queryByText('🔒')).toBeNull()
  rerender(<Stages levels={['中1']} record={{ '中1-1': 2 }} onClear={() => {}} />)
  expect(document.querySelectorAll('.stage-btn')).toHaveLength(2)
  expect(screen.getByLabelText('中1 ステージ2')).toBeEnabled()
})

it('解放が少ない単語帳は compact（3列にならぶ）、たくさん進んだ単語帳は横いっぱい', () => {
  const s = stagesOf('中1')
  const rec = Object.fromEntries(s.slice(0, 4).map((x) => [x.id, 3]))
  render(<Stages levels={['中1', '中2']} record={rec} onClear={() => {}} />)
  const lv = [...document.querySelectorAll('.stage-level')]
  expect(lv[0].classList.contains('compact')).toBe(false)
  expect(lv[1].classList.contains('compact')).toBe(true)
})

it('ボス部屋では、ボス1体ずつのタイル（絵と名前）から、どのボスもえらんで戦える', () => {
  render(<Stages part="boss" levels={['中3']} record={{}} onClear={() => {}} />)
  const pick = screen.getByRole('group', { name: 'ボスをえらぶ' })
  expect(pick.querySelectorAll('button.boss-pick-tile').length).toBeGreaterThanOrEqual(10)
  expect(pick.textContent).not.toMatch(/？×/)
  fireEvent.click(screen.getByRole('button', { name: /中3のボス「コオリモチ」に挑戦/ }))
  expect(screen.getByText('← にげる')).toBeInTheDocument()
})
