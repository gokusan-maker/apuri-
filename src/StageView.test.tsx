import { passageQs } from './readingboss'
import { LONG_PASSAGES } from './longreading'
import { fireEvent, render, screen, within } from '@testing-library/react'
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
  fireEvent.click(screen.getByText('📖 予習'))
  expect(got).toEqual(stagesOf('中1')[0].words.map((w) => w.id))
})

it('定着率でメダルが出る', () => {
  render(<Stages levels={['数']} record={{}} onClear={() => {}} learnedPct={{ 数: 85 }} />)
  expect(screen.getByRole('img', { name: 'メダル（定着率85%）' }).textContent).toBe('🥈')
})

it('今日のボスに勝つと onDailyWin が呼ばれる', () => {
  let won = 0
  render(<Stages levels={['数']} record={{}} onClear={() => {}} onDailyWin={() => won++} />)
  fireEvent.click(screen.getByText(/^⚔️ 今日のボス：/))
  expect(screen.getByText('← にげる')).toBeInTheDocument()
  // ボスを最後までたおすのは BossView のテストで確かめているので、ここでは出現だけ確認
  expect(won).toBe(0)
})

it('大学入試の塔を全階制覇すると合格証書が出る', () => {
  const rec = Object.fromEntries(UNIV_BOSSES.map((b, i) => [b.id, `2026-10-${String(10 + i).padStart(2, '0')}`]))
  localStorage.setItem('eitan:univ', JSON.stringify(rec))
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="univ" />)
  expect(screen.getByText('🎓 合格証書')).toBeInTheDocument()
  expect(screen.getByText(/2026\/10\/18/)).toBeInTheDocument()
  localStorage.removeItem('eitan:univ')
})

it('まだ制覇していなければ合格証書は出ない', () => {
  localStorage.setItem('eitan:univ', JSON.stringify({ gate: '2026-10-20' }))
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="univ" />)
  expect(screen.queryByText('🎓 合格証書')).not.toBeInTheDocument()
  localStorage.removeItem('eitan:univ')
})

it('今週のレアボスに挑戦できる', () => {
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="rare" />)
  fireEvent.click(screen.getByRole('button', { name: /今週のレアボス/ }))
  expect(screen.getByText('勝つと 色ちがい確定のタマゴ！')).toBeInTheDocument()
  expect(screen.getByText('✨ 今週のレアボス')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '200')
})

it('ボスラッシュは3連戦で、勝つとハートを引き継いで次のボスへ', () => {
  const clear = vi.fn()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} onRushClear={clear} event="rush" />)
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
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="endless" />)
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
  const { unmount } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="rush" />)
  expect(screen.queryByText(/ボスラッシュEX/)).not.toBeInTheDocument()
  unmount()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} weekend event="rush-ex" />)
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
  fireEvent.click(screen.getByRole('button', { name: /★★★（HP360・🪙×3）/ }))
  expect(screen.getByText('⚔️ 今日のボス ★★★')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '360')
})

it('週末ボスは週末だけ出て、HPが多い', () => {
  localStorage.clear()
  const { unmount } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="rush" />)
  expect(screen.queryByRole('button', { name: /週末ボス/ })).not.toBeInTheDocument()
  unmount()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} weekend event="weekend" />)
  fireEvent.click(screen.getByRole('button', { name: /^週末ボス/ }))
  expect(screen.getByText(/たおすと 🎟1（HP/)).toBeInTheDocument()
  expect(screen.getByText('🌙 週末ボス')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '240')
})

it('たおしたボスには強化版で挑める（HPが多い）', () => {
  localStorage.clear()
  const record = Object.fromEntries(stagesOf('中1').map((s) => [s.id, 3]))
  const bonus = vi.fn()
  render(<Stages levels={['中1']} record={record} onClear={() => {}} boss={{ 中1: '2026-10-01' }} onRankBonus={bonus} />)
  fireEvent.click(screen.getByText(/強化版「/))
  expect(screen.getByText('💪 強化版の中1ボス')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '360')
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
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} hour={20} onRankBonus={bonus} event="night" />)
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
  const { container } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="univ" />)
  expect(container.querySelector('.univ-meter i')?.getAttribute('style')).toContain('width: 0%')
})

it('ボス部屋の塔・ラッシュなどは横にならべず、とくべつイベントとして1つだけ出る', () => {
  const { container, unmount } = render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="endless" />)
  expect(container.querySelector('.special-event .endless-boss')).not.toBeNull()
  expect(container.querySelectorAll('.boss-modes .boss-btn')).toHaveLength(1)
  expect(screen.getByText(/とくべつイベント出現中！/)).toBeInTheDocument()
  unmount()
  const r = render(<Stages levels={['中1']} record={{}} onClear={() => {}} event={null} />)
  expect(r.container.querySelector('.special-event')).toBeNull()
  expect(r.container.querySelector('.boss-modes')).toBeNull()
})

it('ボス部屋のボタンは題名だけで、くわしい説明は戦いの画面の最初に出る', () => {
  localStorage.removeItem('eitan:endless-best')
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="endless" />)
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



it('特別クエストでは攻略のむずかしい強いボス（HP360）と戦える', () => {
  localStorage.clear()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} event="quest" />)
  fireEvent.click(screen.getByRole('button', { name: /特別クエスト：/ }))
  expect(screen.getByText(/^👑 特別クエスト：/)).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuemax', '360')
})





it('ボス部屋は城：地図はなく、中1〜ネイティブの15レベルのボスが下から順に。1〜4階は問題、5階でボス', async () => {
  const { bossFloorQs, bossCastleFloors } = await import('./bosscastle')
  expect(bossCastleFloors()).toHaveLength(75)
  expect(bossFloorQs('中1', 0).every((q) => q.team === 'word')).toBe(true)
  expect(bossFloorQs('中1', 0)).toHaveLength(10)
  expect(new Set(bossFloorQs('東大', 0).map((q) => q.word.en)).size).toBe(10)
  expect(bossFloorQs('中1', 1)).toHaveLength(5)
  expect(bossFloorQs('東大', 1).every((q) => q.team === 'grammar')).toBe(true)
  expect(bossFloorQs('中1', 2).every((q) => q.team === 'reading')).toBe(true)
  localStorage.clear()
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  expect(screen.queryByRole('region', { name: 'ボスの世界地図' })).toBeNull()
  const castle = screen.getByRole('region', { name: '中1のボスの城' })
  fireEvent.click(within(castle).getByRole('button', { name: /^1階：中1　単語/ }))
  expect(screen.getByText(/中1のボスの階/)).toBeInTheDocument()
  expect(screen.getByText('1 / 10')).toBeInTheDocument() // 単語の階は10問（オーナーの要望）
  for (let n = 0; n < 10; n++) {
    fireEvent.click(document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')[0])
    if (n === 9) expect(screen.getByText('🔁 すぐに再チャレンジ')).toBeInTheDocument()
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  }
  // 結果のあと、すぐに同じ階をもう一度（新しい10問）
  fireEvent.click(screen.getByText('🔁 再チャレンジ（10問）'))
  expect(screen.getByText('1 / 10')).toBeInTheDocument()
  for (let n = 0; n < 10; n++) {
    fireEvent.click(document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')[0])
    if (n < 9) fireEvent.click(screen.getByText('次へ'))
  }
  // 最後の問題に答えたらすぐ再チャレンジ
  fireEvent.click(screen.getByText('🔁 すぐに再チャレンジ'))
  expect(screen.getByText('1 / 10')).toBeInTheDocument()
  fireEvent.click(screen.getByText('← 城にもどる'))
  expect(screen.getByRole('region', { name: '中1のボスの城' })).toBeInTheDocument()
})

it('ボス部屋もキャラの下でレベルをえらべ、レベルごとに5階の城とそのボスがある', () => {
  localStorage.clear()
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: /^ボスのレベル：中1/ }))
  fireEvent.click(screen.getByRole('option', { name: /東大/ }))
  const castle = screen.getByRole('region', { name: '東大のボスの城' })
  expect(within(castle).getByRole('button', { name: /^1階：東大　単語/ })).toBeInTheDocument()
  expect(localStorage.getItem('eitan:boss-level')).toBe('東大')
})

it('レベルのボスをたおすと、そのレベルの城は5階までクリアあつかい。ボス部屋にボスの一覧は出さない（オーナーの要望）', () => {
  localStorage.clear()
  localStorage.setItem('eitan:lboss', JSON.stringify({ 中1: '2026-10-01' }))
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  expect(screen.queryByRole('group', { name: 'ボスをえらぶ' })).toBeNull()
  expect(screen.getByRole('region', { name: '中1のボスの城' })).toHaveTextContent('5/5')
})

it('ボスの城のボスをたおしたら「次のレベルのボスの城へ」で次のレベルの城にかわる', () => {
  localStorage.clear()
  localStorage.setItem('eitan:lboss', JSON.stringify({ 中2: '2026-10-01' }))
  localStorage.setItem('eitan:boss-level', '中2')
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: /次は「中3」のボスの城へ/ }))
  expect(screen.getByRole('region', { name: '中3のボスの城' })).toBeInTheDocument()
  expect(screen.queryByRole('button', { name: /のボスの城へ/ })).toBeNull()
})

it('ボスの城の問題の階をクリアすると、上で待つボスがひとこと（のこりの階数つき）', async () => {
  const { bossTaunt } = await import('./bosscastle')
  expect(bossTaunt('ドラゴン', 0)).toContain('あと3階')
  expect(bossTaunt('ドラゴン', 2)).toContain('あと1階')
  expect(bossTaunt('ドラゴン', 3)).toContain('次の階で待っているぞ')
})

it('15レベルのボスを全部たおすと、ごほうびのガチャチケットは1回だけもらえる', () => {
  localStorage.clear()
  const all = Object.fromEntries(['中1', '中2', '中3', '高1', '高2', '高3', '私学', '私学難関', '国公立', '旧帝大', '京大', '東大', 'TOEIC', 'TOEFL・IELTS', 'ネイティブ'].map((id) => [id, '2026-10-01']))
  localStorage.setItem('eitan:lboss', JSON.stringify(all))
  let got = 0
  const { unmount } = render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} onCastleReward={(n) => (got += n)} />)
  fireEvent.click(screen.getByRole('button', { name: /全レベルのボス制覇のごほうび/ }))
  expect(got).toBe(3)
  unmount()
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} onCastleReward={(n) => (got += n)} />)
  expect(screen.queryByRole('button', { name: /全レベルのボス制覇のごほうび/ })).toBeNull()
})

it('レベルのボスをはじめてたおすと、負けおしみのひとこと（次のレベルの予告つき）', async () => {
  const { bossFarewell } = await import('./bosscastle')
  expect(bossFarewell('ドラゴン', '京大')).toContain('京大の力、みとめてやる')
  expect(bossFarewell('ドラゴン', '京大')).toContain('次のレベル')
})

it('ボスの城の問題の階をはじめてクリアすると、コインがもらえる（結果にも表示）', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs, BC_FLOOR_COINS } = await import('./bosscastle')
  const qs = bossFloorQs('中1', 0)
  render(<BossFloor title="t" qs={qs} reward={BC_FLOOR_COINS} onDone={() => {}} onBack={() => {}} />)
  for (const q of qs) {
    const btn = [...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent === q.choices[q.answer])!
    fireEvent.click(btn)
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  }
  expect(screen.getByText(`🪙 ${BC_FLOOR_COINS}コイン ゲット！`)).toBeInTheDocument()
})

it('たおしたレベルのボスが5・10レベルになると、記念のコインを1回ずつ', async () => {
  const { newBossMilestones } = await import('./bosscastle')
  expect(newBossMilestones(4, [])).toEqual([])
  expect(newBossMilestones(5, [])).toEqual([5])
  expect(newBossMilestones(10, [5])).toEqual([10])
  expect(newBossMilestones(12, [5, 10])).toEqual([])
})

it('ボス部屋のレベルえらびに、そのレベルのボスの最短タイムを表示', async () => {
  const { BOSSES } = await import('./boss')
  const { LEVEL_BOSS_LOOK } = await import('./bosscastle')
  localStorage.clear()
  localStorage.setItem('eitan:boss-times', JSON.stringify({ [BOSSES[LEVEL_BOSS_LOOK['中2']].name]: 95 }))
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: /^ボスのレベル：/ }))
  expect(screen.getByRole('option', { name: /中2/ })).toHaveTextContent('⏱ 1分35秒')
})

it('ボスの城のいちばん上の階に、そのボスのとくぎ（2つ）のアイコンが出る', async () => {
  const { bossTraits, BOSS_TRAITS, BOSSES } = await import('./boss')
  const { LEVEL_BOSS_LOOK } = await import('./bosscastle')
  localStorage.clear()
  localStorage.setItem('eitan:lboss', JSON.stringify({ 中1: '2026-10-01' }))
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  const icons = bossTraits(BOSSES[LEVEL_BOSS_LOOK['中1']].name, true).map((t) => BOSS_TRAITS[t].icon).join('')
  expect(screen.getByRole('region', { name: '中1のボスの城' })).toHaveTextContent(`中1のボス・とくぎ ${icons}`)
})

it('今日のボスのボタンに、そのボスのとくぎが出る', async () => {
  const { bossTraits, BOSS_TRAITS, BOSSES, dailyBossLevel } = await import('./boss')
  const { dayKey } = await import('./srs')
  localStorage.clear()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  const lv = dailyBossLevel(['中1'], dayKey())!
  const t = BOSS_TRAITS[bossTraits(BOSSES[lv as keyof typeof BOSSES].name)[0]]
  expect(document.querySelector('.boss-go-trait')?.textContent).toBe(`とくぎ ${t.icon} ${t.name}`)
})

it('今日のボスのボタンの丸に、そのボスの舞台が出る', () => {
  localStorage.clear()
  render(<Stages levels={['中1']} record={{}} onClear={() => {}} />)
  expect(document.querySelector('.boss-go-fig .boss-arena')).not.toBeNull()
})

it('ボスの城の単語の階は10問で8問以上正解でクリア（ほかの階は5問で4問）', async () => {
  const { bcPassOf } = await import('./bosscastle')
  expect(bcPassOf(10)).toBe(8)
  expect(bcPassOf(5)).toBe(4)
})

it('ボスの城の問題の階に、クリアまでの正解数（星）が出る', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs } = await import('./bosscastle')
  const qs = bossFloorQs('中1', 0)
  render(<BossFloor title="t" qs={qs} onDone={() => {}} onBack={() => {}} />)
  expect(screen.getByLabelText('正解 0問 ／ クリアは8問')).toHaveTextContent('☆☆☆☆☆☆☆☆ あと8問正解でクリア')
  const btn = [...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent === qs[0].choices[qs[0].answer])!
  fireEvent.click(btn)
  expect(screen.getByLabelText('正解 1問 ／ クリアは8問')).toHaveTextContent('★☆☆☆☆☆☆☆ あと7問正解でクリア')
})

it('ボスの城の問題の階：最高得点を記録し、城の階にも出す', async () => {
  const { loadBcBest, recordBcBest } = await import('./bosscastle')
  localStorage.clear()
  expect(recordBcBest('lb:中1:1', 6)).toBe(true)
  expect(recordBcBest('lb:中1:1', 5)).toBe(false)
  expect(loadBcBest()).toEqual({ 'lb:中1:1': 6 })
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  const castle = screen.getByRole('region', { name: '中1のボスの城' })
  expect(within(castle).getByText(/10問・最高 6問/)).toBeInTheDocument()
  fireEvent.click(within(castle).getByRole('button', { name: /^1階：中1　単語/ }))
  for (let n = 0; n < 10; n++) {
    fireEvent.click(document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')[0])
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  }
  expect(loadBcBest()['lb:中1:1']).toBeGreaterThanOrEqual(6)
})

it('ボスの城の問題の階：全問正解でパーフェクト、前の最高より上なら自己ベスト更新', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs } = await import('./bosscastle')
  const qs = bossFloorQs('中1', 1)
  render(<BossFloor title="t" qs={qs} best={3} onDone={() => {}} onBack={() => {}} />)
  for (const q of qs) {
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent === q.choices[q.answer])!)
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  }
  expect(screen.getByText('💯 パーフェクト！')).toBeInTheDocument()
  expect(screen.getByText('🏅 自己ベスト更新！（前回まで 3問）')).toBeInTheDocument()
})

it('ボスの城の問題の階も、ボス戦と同じ暗いゲーム画面（battle-v2）', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs } = await import('./bosscastle')
  render(<BossFloor title="t" qs={bossFloorQs('中1', 1)} onDone={() => {}} onBack={() => {}} />)
  expect(document.querySelector('.card.bfloor')!.classList.contains('battle-v2')).toBe(true)
})

it('城はどの階にもボスがいる：1〜4階は階のボス（レベルのボスとは別）。正解するとHPが減り、クリアでたおせる', async () => {
  const { floorBossLook, LEVEL_BOSS_LOOK, bossFloorQs } = await import('./bosscastle')
  const { BOSSES } = await import('./boss')
  const { COURSES } = await import('./wordcourse')
  for (const c of COURSES) {
    const names = [0, 1, 2, 3].map((f) => floorBossLook(c.id, f).name)
    expect(new Set(names).size).toBe(4)
    expect(names).not.toContain(BOSSES[LEVEL_BOSS_LOOK[c.id]].name)
  }
  localStorage.clear()
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  const castle = screen.getByRole('region', { name: '中1のボスの城' })
  expect(within(castle).getByText(new RegExp(`👾 ${floorBossLook('中1', 0).name}・10問`))).toBeInTheDocument()
  const { BossFloor } = await import('./BossFloorView')
  const qs = bossFloorQs('中1', 1)
  render(<BossFloor title="t" qs={qs} boss={floorBossLook('中1', 1)} onDone={() => {}} onBack={() => {}} />)
  const hp = () => screen.getByRole('progressbar', { name: '階のボスのHP' })
  expect(hp()).toHaveAttribute('aria-valuenow', '4')
  for (const q of qs) {
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent === q.choices[q.answer])!)
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  }
  expect(hp()).toHaveAttribute('aria-valuenow', '0')
  expect(screen.getByText(`${floorBossLook('中1', 1).name}をたおした！`)).toBeInTheDocument()
})

it('ボス部屋の城の下に闘技場：正解で上の階、まちがいで下の階。終了でいまの階を伝え、最高記録を残す', async () => {
  const { arenaNext, arenaFloor, arenaStart, loadArenaBest, ARENA_TOP } = await import('./arena')
  expect(arenaNext(3, true)).toBe(4)
  expect(arenaNext(3, false)).toBe(2)
  expect(arenaNext(0, false)).toBe(0)
  expect(arenaNext(ARENA_TOP, true)).toBe(ARENA_TOP)
  expect(arenaFloor(0)).toBe('1階（中1レベル）')
  expect(arenaStart('中2')).toBe(1)
  localStorage.clear()
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  const entry = screen.getByRole('region', { name: '闘技場' })
  fireEvent.click(within(entry).getByRole('button', { name: /闘技場で戦う/ }))
  const arena = screen.getByRole('region', { name: '闘技場' })
  expect(within(arena).getByText('1階（中1レベル）')).toBeInTheDocument()
  const floor = () => Number(screen.getByRole('progressbar', { name: '闘技場の階' }).getAttribute('aria-valuenow'))
  const { courseWords } = await import('./wordcourse')
  const pickAnswer = (correct: boolean) => {
    const en = document.querySelector('.arena .en')!.textContent
    const w = [...courseWords('中1'), ...courseWords('中2')].find((x) => x.en === en)!
    const btns = [...document.querySelectorAll<HTMLButtonElement>('.arena .choice')]
    fireEvent.click(btns.find((b) => (correct ? b.textContent === w.ja : b.textContent !== w.ja))!)
  }
  pickAnswer(true)
  expect(screen.getByText('⬆ レベルアップ！ 2階（中2レベル）へ')).toBeInTheDocument()
  expect(floor()).toBe(2) // 答えたらすぐに塔の階が上がる
  expect(document.querySelector('.arena-shaft')!.classList.contains('move-up')).toBe(true)
  fireEvent.click(screen.getByText('次へ（中2）'))
  expect(floor()).toBe(2)
  expect(document.querySelector('.arena .boss-figure')).toBeNull() // ボスは出さない
  expect(document.querySelector('.arena-floor.here')!.textContent).toContain('2階')
  pickAnswer(false)
  expect(screen.getByRole('status')).toHaveTextContent('⬇ レベルダウン… 1階（中1レベル）へ')
  fireEvent.click(screen.getByText('次へ（中1）'))
  expect(floor()).toBe(1)
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.getByRole('status')).toHaveTextContent('いまのあなたは 1階（中1レベル）')
  expect(screen.getByText('称号：🌱 見習い')).toBeInTheDocument()
  expect(screen.getByText(/2問中 1問正解（正答率 50%）/)).toBeInTheDocument()
  expect(screen.getByText('次の称号「🗡 戦士」まで あと3階')).toBeInTheDocument()
  expect(screen.getByText('🏅 最高記録 更新！ 2階（中2レベル）')).toBeInTheDocument()
  expect(loadArenaBest()).toBe(1)
  fireEvent.click(screen.getByText('← 城にもどる'))
  expect(within(screen.getByRole('region', { name: '闘技場' })).getByText(/最高 2階（中2レベル）/)).toBeInTheDocument()
})

it('闘技場：いままでの最高より上の階に着くたびに🪙5（最高記録はその場で保存）', async () => {
  const { Arena } = await import('./ArenaView')
  const { ARENA_BEST_COINS, loadArenaBest } = await import('./arena')
  const { courseWords } = await import('./wordcourse')
  localStorage.clear()
  localStorage.setItem('eitan:arena-best', '1') // 最高は2階
  const coins = vi.fn()
  render(<Arena start={0} onExit={() => {}} onCoins={coins} />)
  const pickRight = () => {
    const en = document.querySelector('.arena .en')!.textContent
    const w = [...courseWords('中1'), ...courseWords('中2'), ...courseWords('中3')].find((x) => x.en === en)!
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.arena .choice')].find((b) => b.textContent === w.ja)!)
  }
  pickRight() // 1階→2階：最高と同じなのでなし
  expect(coins).not.toHaveBeenCalled()
  fireEvent.click(screen.getByText(/^次へ/))
  pickRight() // 2階→3階：記録更新
  expect(coins).toHaveBeenCalledWith(ARENA_BEST_COINS)
  expect(screen.getByText(`🆕 最高記録！ 🪙${ARENA_BEST_COINS}`)).toBeInTheDocument()
  expect(loadArenaBest()).toBe(2)
})

it('闘技場の階ごとの称号', async () => {
  const { arenaTitle, ARENA_TOP } = await import('./arena')
  expect(arenaTitle(0)).toBe('🌱 見習い')
  expect(arenaTitle(3)).toBe('🗡 戦士')
  expect(arenaTitle(9)).toBe('⚔ 勇者')
  expect(arenaTitle(ARENA_TOP)).toBe('👑 伝説の英語王')
  const { arenaNextTitle } = await import('./arena')
  expect(arenaNextTitle(4)).toEqual({ title: '🛡 騎士', floors: 2 })
  expect(arenaNextTitle(ARENA_TOP)).toBeNull()
})

it('闘技場は3問に1問、そのレベルの文法の問題が出る', async () => {
  const { arenaQuestionAt, isArenaGrammar } = await import('./arena')
  expect(isArenaGrammar(arenaQuestionAt(0, 0))).toBe(false)
  expect(isArenaGrammar(arenaQuestionAt(0, 1))).toBe(false)
  const g = arenaQuestionAt(0, 2)
  expect(isArenaGrammar(g)).toBe(true)
  expect(g.word.en).toContain('___')
  expect(g.choices[g.answer]).toBe(g.word.ja)
  expect(isArenaGrammar(arenaQuestionAt(9, 5))).toBe(true)
})

it('闘技場：3連続正解ごとに2階ジャンプ', async () => {
  const { arenaNext, isArenaJump } = await import('./arena')
  expect(arenaNext(2, true, 1)).toBe(3)
  expect(arenaNext(2, true, 3)).toBe(4)
  expect(arenaNext(2, true, 6)).toBe(4)
  expect(arenaNext(2, false, 3)).toBe(1)
  expect(isArenaJump(true, 2)).toBe(false)
  const { Arena } = await import('./ArenaView')
  const { courseWords } = await import('./wordcourse')
  const { levelUnits } = await import('./grammarcastle')
  const { COURSES } = await import('./wordcourse')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  const pickRight = () => {
    const en = document.querySelector('.arena .en')!.textContent!
    const w = COURSES.slice(0, 5).flatMap((c) => courseWords(c.id)).find((x) => x.en === en)
    const g = COURSES.slice(0, 5).flatMap((c) => levelUnits(c.id)).flatMap((u) => u.questions).find((x) => x.sentence === en)
    const right = w ? w.ja : g!.choices[g!.answer]
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.arena .choice')].find((b) => b.textContent === right)!)
  }
  pickRight()
  fireEvent.click(screen.getByText(/^次へ/))
  pickRight()
  fireEvent.click(screen.getByText(/^次へ/))
  pickRight()
  expect(document.querySelector('.arena-move')).toHaveTextContent('🚀 3連続！ 2階ジャンプ！ 5階（高2レベル）へ')
})

it('闘技場：最高記録で新しい称号に上がると、ガチャチケット1枚（称号ごとに1回）', async () => {
  const { Arena } = await import('./ArenaView')
  const { COURSES, courseWords } = await import('./wordcourse')
  const { levelUnits } = await import('./grammarcastle')
  localStorage.clear()
  localStorage.setItem('eitan:arena-best', '1')
  const ticket = vi.fn()
  render(<Arena start={1} onExit={() => {}} onTicket={ticket} />)
  const pick = (right: boolean) => {
    const en = document.querySelector('.arena .en')!.textContent!
    const w = COURSES.slice(0, 6).flatMap((c) => courseWords(c.id)).find((x) => x.en === en)
    const g = COURSES.slice(0, 6).flatMap((c) => levelUnits(c.id)).flatMap((u) => u.questions).find((x) => x.sentence === en)
    const ans = w ? w.ja : g!.choices[g!.answer]
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.arena .choice')].find((b) => (right ? b.textContent === ans : b.textContent !== ans))!)
  }
  pick(true) // 2階→3階（見習いのまま）
  expect(ticket).not.toHaveBeenCalled()
  fireEvent.click(screen.getByText(/^次へ/))
  pick(true) // 3階→4階：戦士に上がる
  expect(ticket).toHaveBeenCalledWith(1)
  expect(screen.getByText('🎖 新しい称号「🗡 戦士」！ 🎟ガチャチケット×1')).toBeInTheDocument()
  fireEvent.click(screen.getByText(/^次へ/))
  pick(false) // 4階→3階
  fireEvent.click(screen.getByText(/^次へ/))
  pick(true) // また4階：記録更新ではないのでチケットなし
  expect(ticket).toHaveBeenCalledTimes(1)
})

it('闘技場の単語の答えは学習の記録になり、正解で相棒に XP（文法の問題は記録しない）', async () => {
  const { Arena } = await import('./ArenaView')
  const { courseWords } = await import('./wordcourse')
  localStorage.clear()
  const ans = vi.fn()
  render(<Arena start={0} onExit={() => {}} onAnswer={ans} />)
  const en = document.querySelector('.arena .en')!.textContent
  const w = courseWords('中1').find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.arena .choice')].find((b) => b.textContent === w.ja)!)
  expect(ans).toHaveBeenCalledWith(true, expect.any(Number), w.id, 'quiz')
  expect(ans.mock.calls[0][1]).toBeGreaterThan(0)
})

it('闘技場：5階・10階・15階に上がるとお祝い', async () => {
  const { isArenaMilestone } = await import('./arena')
  expect(isArenaMilestone(3, 4)).toBe(true) // 4→5階
  expect(isArenaMilestone(2, 4)).toBe(true) // ジャンプで5階
  expect(isArenaMilestone(4, 5)).toBe(false)
  expect(isArenaMilestone(5, 4)).toBe(false) // 下がったときはなし
  expect(isArenaMilestone(8, 10)).toBe(true) // 10階をとびこえても
  expect(isArenaMilestone(13, 14)).toBe(true)
})

it('闘技場の塔に、いままでの最高の階の🚩が出る', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  localStorage.setItem('eitan:arena-best', '5') // 最高は6階
  render(<Arena start={4} onExit={() => {}} />)
  const flag = document.querySelector('.af-best')!
  expect(flag.closest('.arena-floor')!.textContent).toContain('6階')
})

it('闘技場：3連続正解から、いまの階が燃える（🔥）', async () => {
  const { Arena } = await import('./ArenaView')
  const { COURSES, courseWords } = await import('./wordcourse')
  const { levelUnits } = await import('./grammarcastle')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  const pickRight = () => {
    const en = document.querySelector('.arena .en')!.textContent!
    const w = COURSES.slice(0, 6).flatMap((c) => courseWords(c.id)).find((x) => x.en === en)
    const g = COURSES.slice(0, 6).flatMap((c) => levelUnits(c.id)).flatMap((u) => u.questions).find((x) => x.sentence === en)
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.arena .choice')].find((b) => b.textContent === (w ? w.ja : g!.choices[g!.answer]))!)
  }
  for (let k = 0; k < 2; k++) {
    pickRight()
    fireEvent.click(screen.getByText(/^次へ/))
  }
  expect(document.querySelector('.arena-floor.on-fire')).toBeNull()
  pickRight()
  expect(document.querySelector('.arena-floor.here.on-fire')).not.toBeNull()
})

it('闘技場の文法の問題には「📐 文法」の札が出る', async () => {
  const { Arena } = await import('./ArenaView')
  const { COURSES, courseWords } = await import('./wordcourse')
  const { levelUnits } = await import('./grammarcastle')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  const pick = () => {
    const en = document.querySelector('.arena .en')!.textContent!
    const w = COURSES.slice(0, 3).flatMap((c) => courseWords(c.id)).find((x) => x.en === en)
    const g = COURSES.slice(0, 3).flatMap((c) => levelUnits(c.id)).flatMap((u) => u.questions).find((x) => x.sentence === en)
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.arena .choice')].find((b) => b.textContent !== (w ? w.ja : g!.choices[g!.answer]))!)
    fireEvent.click(screen.getByText(/^次へ/))
  }
  expect(screen.queryByText('📐 文法')).toBeNull()
  pick()
  pick()
  expect(screen.getByText('📐 文法')).toBeInTheDocument() // 3問め
})
