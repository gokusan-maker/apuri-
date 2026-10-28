import { passageQs } from './readingboss'
import { LONG_PASSAGES } from './longreading'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { stagesOf } from './stages'
import { Stages } from './StageView'
import { UNIV_BOSSES } from './univ'
import { COURSES as ALL_COURSES, courseWords as allCourseWords } from './wordcourse'
import { levelUnits as allLevelUnits } from './grammarcastle'

// ボスの城の単語の階の正しい答え
const bfPick = (right: boolean) => {
  const en = document.querySelector('.bfloor-q')!.textContent!
  const choices = [...document.querySelectorAll('.bfloor .choice')].map((b) => b.textContent)
  const ans = ALL_COURSES.flatMap((c) => allCourseWords(c.id)).filter((x) => x.en === en).map((x) => x.ja).find((ja) => choices.includes(ja))!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => (right ? b.textContent === ans : b.textContent !== ans))!)
}
// 闘技場の問題（単語・文法・読解）の正しい答え
function arenaRight(): string {
  const en = document.querySelector('.arena .en')!.textContent!
  const ws = ALL_COURSES.flatMap((c) => allCourseWords(c.id))
  // 同じ英語が別の訳で何度か出ることがあるので、選択肢にある訳をえらぶ
  const cands = [
    ...ws.filter((x) => x.en === en).map((x) => x.ja),
    ...ws.filter((x) => x.example === en).map((x) => x.exampleJa!),
    ...ALL_COURSES.flatMap((c) => allLevelUnits(c.id)).flatMap((u) => u.questions).filter((x) => x.sentence === en).map((g) => g.choices[g.answer]),
  ]
  const choices = [...document.querySelectorAll('.arena .choice')].map((b) => b.textContent)
  return cands.find((c) => choices.includes(c))!
}
const arenaPick = (right: boolean) => {
  const ans = arenaRight()
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.arena .choice')].find((b) => (right ? b.textContent === ans : b.textContent !== ans))!)
}

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
  const asked: string[] = []
  for (let n = 0; n < 10; n++) {
    asked.push(document.querySelector('.bfloor-q')!.textContent!)
    bfPick(true)
    if (n === 9) expect(screen.getByText('🔁 すぐに再チャレンジ')).toBeInTheDocument()
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  }
  // 結果のあと、すぐに同じ階をもう一度（同じ単元の同じ10問。順番は変わる）
  fireEvent.click(screen.getByText('🔁 再チャレンジ（10問）'))
  expect(screen.getByText('1 / 10')).toBeInTheDocument()
  expect(screen.getByText('🔁 2回目')).toBeInTheDocument()
  const again: string[] = []
  for (let n = 0; n < 10; n++) {
    again.push(document.querySelector('.bfloor-q')!.textContent!)
    bfPick(true)
    if (n < 9) fireEvent.click(screen.getByText('次へ'))
  }
  expect([...again].sort()).toEqual([...asked].sort())
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
    bfPick(n !== 0)
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  }
  expect(loadBcBest()['lb:中1:1']).toBe(9)
})

it('ボスの城の問題の階：まちがえると自分のライフがへり、0になったら負け', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs, bcLivesOf, retryFloorQs } = await import('./bosscastle')
  expect(bcLivesOf(10)).toBe(3)
  expect(bcLivesOf(5)).toBe(2)
  const qs = bossFloorQs('中1', 1)
  const re = retryFloorQs(qs)
  expect(re.map((q) => q.word.en).sort()).toEqual(qs.map((q) => q.word.en).sort()) // 再チャレンジは同じ問題
  for (const q of re) expect(q.choices[q.answer]).toBe(qs.find((x) => x.word.en === q.word.en)!.choices[qs.find((x) => x.word.en === q.word.en)!.answer])
  const done = vi.fn()
  render(<BossFloor title="t" qs={qs} onDone={done} onBack={() => {}} onRetry={() => {}} />)
  const life = () => screen.getByLabelText(/のこりライフ/)
  expect(life()).toHaveAccessibleName('のこりライフ 2')
  const miss = (q: (typeof qs)[number]) => fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent !== q.choices[q.answer])!)
  miss(qs[0])
  expect(life()).toHaveAccessibleName('のこりライフ 1')
  expect(document.querySelector('.bfloor-life .heart-break')).not.toBeNull()
  expect(document.querySelector('.card.bfloor')!.classList.contains('hurt')).toBe(true)
  expect(screen.queryByText(/ピンチ/)).toBeNull() // 答えたあとは出さない
  fireEvent.click(screen.getByText('次へ'))
  expect(screen.getByText('⚠ ピンチ！ あと1回まちがえると負け')).toBeInTheDocument()
  expect(document.querySelector('.card.bfloor')!.classList.contains('pinch')).toBe(true)
  miss(qs[1])
  expect(screen.getByText('💀 ライフがなくなった！')).toBeInTheDocument()
  expect(screen.getByText('🔁 すぐに再チャレンジ')).toBeInTheDocument()
  fireEvent.click(screen.getByText('結果を見る'))
  expect(done).toHaveBeenCalledWith(0)
  expect(screen.getByRole('status')).toHaveTextContent('💀 ライフがなくなった… 0/5問正解')
})

it('ボスの城の問題の階：まちがえると階のボスがこうげきしてくる', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs, floorBossLook } = await import('./bosscastle')
  const qs = bossFloorQs('中1', 1)
  const boss = floorBossLook('中1', 1)
  render(<BossFloor title="t" qs={qs} boss={boss} onDone={() => {}} onBack={() => {}} />)
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent === qs[0].choices[qs[0].answer])!)
  expect(document.querySelector('.boss-atk-fx')).toBeNull()
  fireEvent.click(screen.getByText('次へ'))
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent !== qs[1].choices[qs[1].answer])!)
  expect(document.querySelector('.boss-atk-fx')).not.toBeNull()
  expect(document.querySelector('.bfloor .boss-figure')!.classList.contains('attack')).toBe(true)
  expect(screen.getByText(`💥 ${boss.name}のこうげき！ ライフ -1`)).toBeInTheDocument()
  expect(screen.getByText(`正解は「${qs[1].choices[qs[1].answer]}」`)).toBeInTheDocument() // 正しい答えを見せる
})

it('ボスの城の問題の階：階のボスののこりHPを数字でも出す', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs, floorBossLook } = await import('./bosscastle')
  const qs = bossFloorQs('中1', 1)
  render(<BossFloor title="t" qs={qs} boss={floorBossLook('中1', 1)} onDone={() => {}} onBack={() => {}} />)
  expect(screen.getByText('のこりHP 4 / 4')).toBeInTheDocument()
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent === qs[0].choices[qs[0].answer])!)
  expect(screen.getByText('のこりHP 3 / 4')).toBeInTheDocument()
  expect(document.querySelector('.bfloor .boss-figure')!.classList.contains('weak')).toBe(false)
  expect(document.querySelector('.bfloor .boss-ko')).toBeNull()
  for (const q of qs.slice(1, 4)) {
    fireEvent.click(screen.getByText('次へ'))
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent === q.choices[q.answer])!)
    if (q === qs[2]) expect(screen.getByText(/ふらふら…あと1撃！/)).toBeInTheDocument() // HP 1 でふらふら
  }
  expect(document.querySelector('.bfloor .boss-ko')).not.toBeNull() // 4問正解でボスをたおして K.O.!
})

it('ボスの城のミックスの階では、問題の種類の札（単語・文法・読解）が出る', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs } = await import('./bosscastle')
  const mix = bossFloorQs('中2', 3)
  render(<BossFloor title="t" qs={mix} onDone={() => {}} onBack={() => {}} />)
  expect(document.querySelector('.bfloor .arena-qtag')!.textContent).toMatch(/単語|文法|読解/)
  cleanup()
  render(<BossFloor title="t" qs={bossFloorQs('中2', 1)} onDone={() => {}} onBack={() => {}} />)
  expect(document.querySelector('.bfloor .arena-qtag')).toBeNull() // 文法だけの階では出さない
})

it('ボスの城の文法の階：ヒントを見ずにクリアすると「💡 ヒントなしでクリア！」', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs } = await import('./bosscastle')
  const qs = bossFloorQs('中1', 1)
  const play = (useHint: boolean) => {
    qs.forEach((q, k) => {
      if (useHint && k === 0) fireEvent.click(screen.getByText('💡 ヒント'))
      fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent === q.choices[q.answer])!)
      fireEvent.click(screen.getByText(/次へ|結果を見る/))
    })
  }
  render(<BossFloor title="t" qs={qs} onDone={() => {}} onBack={() => {}} />)
  play(false)
  expect(screen.getByText('💡 ヒントなしでクリア！')).toBeInTheDocument()
  cleanup()
  render(<BossFloor title="t" qs={qs} onDone={() => {}} onBack={() => {}} />)
  play(true)
  expect(screen.queryByText('💡 ヒントなしでクリア！')).toBeNull()
})

it('ボスの城の問題の階：最後の問題で「🔔 ラスト1問！」', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs } = await import('./bosscastle')
  const qs = bossFloorQs('中1', 1)
  render(<BossFloor title="t" qs={qs} onDone={() => {}} onBack={() => {}} />)
  qs.forEach((q, k) => {
    if (k < qs.length - 1) expect(screen.queryByText('🔔 ラスト1問！')).toBeNull()
    else expect(screen.getByText('🔔 ラスト1問！')).toBeInTheDocument()
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent === q.choices[q.answer])!)
    if (k < qs.length - 1) fireEvent.click(screen.getByText('次へ'))
  })
  expect(screen.queryByText('🔔 ラスト1問！')).toBeNull() // 答えたら消える
})

it('ボスの城の問題の階：3連続正解から「🔥 N連続正解！」', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs } = await import('./bosscastle')
  const qs = bossFloorQs('中1', 1)
  render(<BossFloor title="t" qs={qs} onDone={() => {}} onBack={() => {}} />)
  const ans = (q: (typeof qs)[number], right: boolean) => fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => (right ? b.textContent === q.choices[q.answer] : b.textContent !== q.choices[q.answer]))!)
  ans(qs[0], true)
  fireEvent.click(screen.getByText('次へ'))
  ans(qs[1], true)
  expect(screen.queryByText(/連続正解！/)).toBeNull()
  fireEvent.click(screen.getByText('次へ'))
  ans(qs[2], true)
  expect(document.querySelector('.bfloor-combo')!.textContent).toBe('🔥 3連続正解！')
  expect(document.querySelector('.bfloor-combo .arena-flame')).not.toBeNull() // 炎がゆれる
  fireEvent.click(screen.getByText('次へ'))
  ans(qs[3], false)
  expect(screen.queryByText(/連続正解！/)).toBeNull()
  fireEvent.click(screen.getByText(/次へ|結果を見る/))
  ans(qs[4], true)
  fireEvent.click(screen.getByText('結果を見る'))
  expect(screen.getByText('🔥 いちばん長い連続正解 3問')).toBeInTheDocument()
})

it('ボスの城の問題の階の結果に、のこりライフを出す', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs } = await import('./bosscastle')
  const qs = bossFloorQs('中1', 1)
  render(<BossFloor title="t" qs={qs} onDone={() => {}} onBack={() => {}} />)
  qs.forEach((q, k) => {
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => (k === 0 ? b.textContent !== q.choices[q.answer] : b.textContent === q.choices[q.answer]))!)
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  })
  expect(screen.getByLabelText('のこりライフ 1 / 2')).toHaveTextContent('のこりライフ ❤️🤍')
  expect(screen.getByLabelText('ランク A')).toBeInTheDocument() // まちがい1つでクリアは A
  const { bcRankOf } = await import('./bosscastle')
  expect([bcRankOf(0), bcRankOf(1), bcRankOf(2)]).toEqual(['S', 'A', 'B'])
})

it('ボスの城の問題の階：全問正解でパーフェクト、前の最高より上なら自己ベスト更新', async () => {
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs } = await import('./bosscastle')
  const qs = bossFloorQs('中1', 1)
  render(<BossFloor title="t" qs={qs} best={3} onDone={() => {}} onBack={() => {}} />)
  expect(screen.getByText('🏅 これまでの最高 3 / 5問')).toBeInTheDocument() // はじめに目標として出す
  expect(document.querySelector('.bfloor .battle-start')).toHaveTextContent('⚔ スタート！')
  for (const q of qs) {
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.bfloor .choice')].find((b) => b.textContent === q.choices[q.answer])!)
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
    expect(screen.queryByText(/これまでの最高/)).toBeNull()
  }
  expect(screen.getByText('💯 パーフェクト！')).toBeInTheDocument()
  expect(screen.getByText('🏅 自己ベスト更新！（前回まで 3問）')).toBeInTheDocument()
})

it('ボスの城の問題の階：全問正解でパーフェクトボーナス🪙（何回でも）', async () => {
  const { BC_PERFECT_COINS, BC_FLOOR_COINS } = await import('./bosscastle')
  localStorage.clear()
  const bonus = vi.fn()
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} onRankBonus={bonus} />)
  fireEvent.click(within(screen.getByRole('region', { name: '中1のボスの城' })).getByRole('button', { name: /^1階：中1　単語/ }))
  for (let n = 0; n < 10; n++) {
    bfPick(true)
    fireEvent.click(screen.getByText(/次へ|結果を見る/))
  }
  expect(screen.getByText(`💯 パーフェクト！ ボーナス 🪙${BC_PERFECT_COINS}`)).toBeInTheDocument()
  expect(bonus).toHaveBeenCalledWith(BC_PERFECT_COINS)
  expect(bonus).toHaveBeenCalledWith(BC_FLOOR_COINS) // はじめてのクリア
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
  const { arenaNext, arenaFloor, loadArenaBest, ARENA_ENDLESS } = await import('./arena')
  expect(arenaNext(3, true)).toBe(4)
  expect(arenaNext(3, false)).toBe(2)
  expect(arenaNext(0, false)).toBe(0)
  expect(arenaNext(ARENA_ENDLESS + 50, true)).toBe(ARENA_ENDLESS + 51) // 上は無限
  expect(arenaFloor(0)).toBe('1階') // レベルは見せず、階だけ
  expect(arenaFloor(20)).toBe('21階')
  localStorage.clear()
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  const entry = screen.getByRole('region', { name: '闘技場' })
  fireEvent.click(within(entry).getByRole('button', { name: /闘技場で戦う/ }))
  const arena = screen.getByRole('region', { name: '闘技場' })
  expect(arena.querySelector('.arena-now strong')).toHaveTextContent('1階')
  expect(arena.textContent).not.toMatch(/レベル/)
  const floor = () => Number(screen.getByRole('progressbar', { name: '闘技場の階' }).getAttribute('aria-valuenow'))
  arenaPick(true)
  expect(screen.getByText('⬆ 1階のぼった！ 2階へ')).toBeInTheDocument()
  expect(floor()).toBe(2) // 答えたらすぐに塔の階が上がる
  expect(document.querySelector('.arena-shaft')!.classList.contains('move-up')).toBe(true)
  fireEvent.click(screen.getByText('次へ（2階）'))
  expect(floor()).toBe(2)
  expect(document.querySelector('.arena .boss-figure')).toBeNull() // ボスは出さない
  expect(document.querySelector('.arena-floor.here')!.textContent).toContain('2階')
  arenaPick(false)
  expect(screen.getByText('⬇ 1階おちた… 1階へ')).toBeInTheDocument()
  fireEvent.click(screen.getByText('次へ（1階）'))
  expect(floor()).toBe(1)
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.getByRole('status')).toHaveTextContent('いまのあなたは 1階')
  expect(screen.getByText('称号：🌱 見習い')).toBeInTheDocument()
  expect(screen.getByText(/2問中 1問正解（正答率 50%）/)).toBeInTheDocument()
  expect(screen.getByLabelText('まちがえた問題')).toHaveTextContent('📝 ふりかえり（1問）')
  expect(screen.getByText('次の称号「🔰 ルーキー」まで あと10階')).toBeInTheDocument()
  expect(screen.getByText('🏅 最高記録 更新！ 2階')).toBeInTheDocument()
  expect(loadArenaBest()).toBe(1)
  expect(screen.queryByText(/はじめの階/)).toBeNull() // いまがはじめの階なら出さない
  fireEvent.click(screen.getByText('← 城にもどる'))
  expect(within(screen.getByRole('region', { name: '闘技場' })).getByText(/最高 2階/)).toBeInTheDocument()
  expect(within(screen.getByRole('region', { name: '闘技場' })).queryByText(/最高 \d+連続/)).toBeNull() // 連続正解が1問だけなら出さない
})

it('闘技場：20階ごとの節目に着くとお祝いの演出', async () => {
  const { isArenaLevelUp, ARENA_ENDLESS } = await import('./arena')
  expect(isArenaLevelUp(18, 19)).toBe(false)
  expect(isArenaLevelUp(19, 20)).toBe(true)
  expect(isArenaLevelUp(18, 20)).toBe(true) // 一気に上がってこえても
  expect(isArenaLevelUp(20, 19)).toBe(false)
  expect(isArenaLevelUp(ARENA_ENDLESS - 1, ARENA_ENDLESS)).toBe(true) // 無限の階へ
  expect(isArenaLevelUp(ARENA_ENDLESS + 8, ARENA_ENDLESS + 9)).toBe(false)
  expect(isArenaLevelUp(ARENA_ENDLESS + 9, ARENA_ENDLESS + 10)).toBe(true) // 無限の階では10階ごと
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={19} onExit={() => {}} />)
  arenaPick(true)
  expect(document.querySelector('.arena-levelup')).toHaveTextContent('🎉 21階 到達！')
  expect(document.querySelector('.arena-confetti')).not.toBeNull() // 紙ふぶき
  expect(document.querySelector('.arena-floor.here .af-me')!.classList.contains('cheer')).toBe(true) // 相棒がとびはねる
  expect(document.querySelector('.arena-floor.here .af-say')).toHaveTextContent('やったー！')
  fireEvent.click(screen.getByText('次へ（21階）'))
  expect(document.querySelector('.arena-confetti')).toBeNull()
  expect(document.querySelector('.arena-floor.here')!.classList.contains('lv-gate')).toBe(true)
  expect(document.querySelector('.arena-floor.here .af-gate')).toHaveTextContent('⭐ 節目')
  arenaPick(false)
  expect(screen.getByText('⬇ 1階おちた… 20階へ')).toBeInTheDocument()
  expect(document.querySelector('.arena-floor.here .af-me')!.classList.contains('ouch')).toBe(true) // まちがえると相棒がよろける
})

it('闘技場：300階の上は、いろいろなむずかしさの問題がランダムに出る無限の階', async () => {
  const { ARENA_ENDLESS, arenaQuestionAt, arenaLevel, isArenaEndless, arenaTitle } = await import('./arena')
  const { COURSES, courseWords } = await import('./wordcourse')
  expect(arenaLevel(ARENA_ENDLESS - 1)).toBe(COURSES.length - 1)
  expect(isArenaEndless(ARENA_ENDLESS + 1000)).toBe(true)
  expect(arenaTitle(ARENA_ENDLESS)).toBe('👑 伝説の英語王')
  const seen = new Set<string>()
  for (let n = 0; n < 60; n += 3) {
    const q = arenaQuestionAt(ARENA_ENDLESS + 5, n)
    const c = COURSES.find((c) => courseWords(c.id).some((w) => w.id === q.word.id))
    if (c) seen.add(c.id)
  }
  expect(seen.size).toBeGreaterThan(3)
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={ARENA_ENDLESS - 1} onExit={() => {}} />)
  arenaPick(true)
  expect(document.querySelector('.arena-levelup')).toHaveTextContent('♾ 無限の階へ！')
  expect(screen.getByText(`次へ（${ARENA_ENDLESS + 1}階）`)).toBeInTheDocument()
  const q = arenaQuestionAt(ARENA_ENDLESS, 0, () => 0.99)
  expect(q.lv).toBe(COURSES.length - 1)
  expect(arenaQuestionAt(0, 0).lv).toBe(0)
})

it('闘技場の結果：はじめの階より上がれたら「📈 20階 → 22階 まで上がった！」', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={19} onExit={() => {}} />)
  arenaPick(true) // 20→21階
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(true) // 2連続で一気に2階：21→23階
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(false) // 23→22階
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.getByText('📈 20階 → 23階 まで上がった！')).toBeInTheDocument()
  fireEvent.click(screen.getByText('⚔ 続きから戦う'))
  arenaPick(false)
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.queryByText(/まで上がった！/)).toBeNull()
})

it('闘技場：5連続正解で盾をもらい、次のまちがいで1回だけ階が落ちない', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={30} onExit={() => {}} />)
  const floor = () => Number(screen.getByRole('progressbar', { name: '闘技場の階' }).getAttribute('aria-valuenow'))
  for (let k = 0; k < 4; k++) {
    arenaPick(true)
    fireEvent.click(screen.getByText(/^次へ/))
  }
  expect(document.querySelector('.arena-shield')).toBeNull()
  arenaPick(true)
  expect(screen.getByText('🛡 5連続正解！ 盾をゲット（次のまちがいで1回だけ落ちない）')).toBeInTheDocument()
  fireEvent.click(screen.getByText(/^次へ/))
  expect(document.querySelector('.arena-shield')).not.toBeNull()
  expect(document.querySelector('.arena-floor.here.shielded')).not.toBeNull() // 盾があるあいだ、いまの階が青く光る
  const at = floor()
  arenaPick(false)
  expect(screen.getByText('🛡 盾がまもった！ 階はそのまま')).toBeInTheDocument()
  expect(document.querySelector('.arena-floor.here .af-say')).toHaveTextContent('セーフ！')
  expect(floor()).toBe(at)
  fireEvent.click(screen.getByText(/^次へ/))
  expect(document.querySelector('.arena-shield')).toBeNull()
  arenaPick(false)
  expect(floor()).toBe(at - 1) // 盾は1回だけ
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.getByText('🛡 盾がまもった：1回')).toBeInTheDocument()
})

it('闘技場：この回で10階のぼるごとに「🏆 この回で10階 のぼった！」', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={40} onExit={() => {}} />)
  let seen = false
  for (let k = 0; k < 9 && !seen; k++) {
    arenaPick(true)
    seen = !!screen.queryByText('🏆 この回で 10階 のぼった！')
    fireEvent.click(screen.getByText(/^次へ/))
  }
  expect(seen).toBe(true)
  expect(Number(screen.getByRole('progressbar', { name: '闘技場の階' }).getAttribute('aria-valuenow'))).toBeGreaterThanOrEqual(51)
})

it('闘技場の結果：5問以上答えると正答率でランク（90%以上 S・70%以上 A）', async () => {
  const { arenaRank } = await import('./arena')
  expect(arenaRank(4, 4)).toBeNull()
  expect(arenaRank(9, 10)).toBe('S')
  expect(arenaRank(7, 10)).toBe('A')
  expect(arenaRank(6, 10)).toBe('B')
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  for (const r of [true, true, true, false, true]) {
    arenaPick(r)
    fireEvent.click(screen.getByText(/^次へ/))
  }
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.getByLabelText('ランク A')).toBeInTheDocument()
})

it('闘技場の結果：最高記録を更新できなかったら、あと何階で更新かを出す', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  localStorage.setItem('eitan:arena-best-floor', '10') // 最高は11階
  render(<Arena start={5} onExit={() => {}} />)
  arenaPick(true) // 6→7階
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.getByText('最高記録 11階（あと5階で更新）')).toBeInTheDocument()
})

it('闘技場：この回の目標（はじめの階から5階上）に着くと「🎯 目標達成！」', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={40} onExit={() => {}} />)
  expect(screen.getByText('🎯 この回の目標：46階')).toBeInTheDocument()
  let done = false
  for (let k = 0; k < 5 && !done; k++) {
    arenaPick(true)
    done = !!screen.queryByText('🎯 目標達成！ 46階に着いた')
    fireEvent.click(screen.getByText(/^次へ/))
  }
  expect(done).toBe(true)
  expect(screen.queryByText(/この回の目標/)).toBeNull()
  expect(screen.getByText('🎯 次の目標（2つ目）：51階')).toBeInTheDocument() // 目標は次々と出る
})

it('闘技場：10連続正解ごとに「🔥🔥 N連続正解！」', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  for (let k = 1; k <= 10; k++) {
    arenaPick(true)
    if (k === 9) expect(screen.queryByText(/すごすぎる/)).toBeNull()
    if (k < 10) fireEvent.click(screen.getByText(/^次へ/))
  }
  expect(screen.getByText('🔥🔥 10連続正解！ すごすぎる！')).toBeInTheDocument()
})

it('闘技場の結果に、単語・文法・読解それぞれの正解数を出す', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  for (const r of [true, false, true, true]) {
    arenaPick(r) // 単語→文法→読解→単語
    fireEvent.click(screen.getByText(/^次へ/))
  }
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.getByLabelText('種類ごとの正解')).toHaveTextContent('🔤 単語 2/2 📐 文法 0/1 📖 読解 1/1')
  expect(within(screen.getByLabelText('まちがえた問題')).getByLabelText('文法')).toHaveTextContent('📐') // ふりかえりに種類のしるし
})

it('闘技場の結果に、いちばん長い連続正解を出す', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  for (const right of [true, true, false, true]) {
    arenaPick(right)
    fireEvent.click(screen.getByText(/^次へ/))
  }
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.getByText('🔥 いちばん長い連続正解：2問（🆕 最高記録！）')).toBeInTheDocument()
  expect(screen.getByText('🚀 いちばん大きなジャンプ：一気に 2階')).toBeInTheDocument()
  const { loadArenaBestStreak } = await import('./arena')
  expect(loadArenaBestStreak()).toBe(2) // 連続正解の最高記録は保存される
  fireEvent.click(screen.getByText('⚔ 続きから戦う'))
  arenaPick(true)
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.queryByText(/いちばん長い連続正解/)).toBeNull() // 1問だけなら出さない
  cleanup()
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  expect(within(screen.getByRole('region', { name: '闘技場' })).getByText(/🔥最高 2連続/)).toBeInTheDocument() // 入り口にも出す
})

it('闘技場：次の節目（10階ごと）まで あと何階 かを出す', async () => {
  const { arenaToNext, ARENA_ENDLESS } = await import('./arena')
  expect(arenaToNext(0)).toEqual({ floors: 10, label: '11階', progress: 0 })
  expect(arenaToNext(15)).toEqual({ floors: 5, label: '21階', progress: 0.5 })
  expect(arenaToNext(ARENA_ENDLESS - 1).label).toBe('♾ 無限の階')
  expect(arenaToNext(ARENA_ENDLESS + 3)).toEqual({ floors: 7, label: `${ARENA_ENDLESS + 11}階`, progress: 0.3 })
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={7} onExit={() => {}} />)
  expect(screen.getByLabelText('11階まで あと3階')).toBeInTheDocument()
  expect(document.querySelector('.arena-now-title')).toHaveTextContent('🌱 見習い') // いまの称号
  arenaPick(true)
  expect(screen.getByLabelText('11階まで あと2階')).toBeInTheDocument()
})

it('闘技場：上の階ほどむずかしい問題が出る（10階ごとに1段、段の途中でも次の段がまざる）', async () => {
  const { arenaQuestionAt, ARENA_PER } = await import('./arena')
  expect(ARENA_PER).toBe(10)
  expect(arenaQuestionAt(0, 0, () => 0.5).lv).toBe(0)
  expect(arenaQuestionAt(10, 0, () => 0.5).lv).toBe(1)
  expect(arenaQuestionAt(19, 0, () => 0.5).lv).toBe(2) // 段の上のほうは次の段の問題
  expect(arenaQuestionAt(12, 0, () => 0.5).lv).toBe(1)
})

it('闘技場の無限の階：最高記録で50階ごとにガチャチケット', async () => {
  const { isArenaEndlessTicket, ARENA_ENDLESS } = await import('./arena')
  const E = ARENA_ENDLESS
  expect(isArenaEndlessTicket(E + 48, E + 49)).toBe(false)
  expect(isArenaEndlessTicket(E + 49, E + 50)).toBe(true)
  expect(isArenaEndlessTicket(E + 48, E + 50)).toBe(true)
  expect(isArenaEndlessTicket(E + 50, E + 51)).toBe(false)
  expect(isArenaEndlessTicket(E - 1, E)).toBe(false)
  expect(isArenaEndlessTicket(E + 99, E + 100)).toBe(true)
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  localStorage.setItem('eitan:arena-best-floor', String(E + 49))
  const ticket = vi.fn()
  render(<Arena start={E + 49} onExit={() => {}} onTicket={ticket} />)
  arenaPick(true)
  expect(ticket).toHaveBeenCalledWith(1)
  expect(screen.getByText(`♾ 無限の階 ${E + 51}階 到達！ 🎟ガチャチケット×1`)).toBeInTheDocument()
})

it('闘技場：前の「レベル」で保存した最高記録は、そのレベルの1階目として読む', async () => {
  const { loadArenaBest, recordArenaBest } = await import('./arena')
  localStorage.clear()
  localStorage.setItem('eitan:arena-best', '2')
  expect(loadArenaBest()).toBe(20)
  expect(recordArenaBest(21)).toBe(true)
  expect(loadArenaBest()).toBe(21)
  expect(recordArenaBest(15)).toBe(false)
})

it('闘技場：最高記録で20階ごとの節目に着いたら🪙5（最高記録はその場で保存）', async () => {
  const { Arena } = await import('./ArenaView')
  const { ARENA_BEST_COINS, loadArenaBest } = await import('./arena')
  localStorage.clear()
  localStorage.setItem('eitan:arena-best-floor', '17') // 最高は18階
  const coins = vi.fn()
  render(<Arena start={16} onExit={() => {}} onCoins={coins} />)
  arenaPick(true) // 17→18階：最高と同じなのでなし
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(true) // 2連続で一気に2階：18→20階：記録更新（節目の前なのでコインはなし）
  expect(coins).not.toHaveBeenCalled()
  expect(loadArenaBest()).toBe(19)
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(true) // 3連続で一気に3階：20→23階…21階の節目をこえる
  expect(coins).toHaveBeenCalledWith(ARENA_BEST_COINS)
  expect(screen.getByText(`🆕 最高記録！ 🪙${ARENA_BEST_COINS}`)).toBeInTheDocument()
  expect(loadArenaBest()).toBe(22)
})

it('闘技場の階ごとの称号', async () => {
  const { arenaTitle, arenaNextTitle, ARENA_ENDLESS } = await import('./arena')
  expect(arenaTitle(0)).toBe('🌱 見習い')
  expect(arenaTitle(10)).toBe('🔰 ルーキー')
  expect(arenaTitle(30)).toBe('🗡 戦士')
  expect(arenaTitle(90)).toBe('⚔ 勇者')
  expect(arenaTitle(ARENA_ENDLESS + 3)).toBe('👑 伝説の英語王')
  expect(arenaNextTitle(50)).toEqual({ title: '🛡 騎士', floors: 10 })
  expect(arenaNextTitle(ARENA_ENDLESS)).toBeNull()
})

it('闘技場は 単語→文法→読解 の順に、そのレベルの問題が出る', async () => {
  const { arenaQuestionAt, arenaKindAt, isArenaGrammar, isArenaReading } = await import('./arena')
  expect(arenaKindAt(0)).toBe('word')
  expect(arenaKindAt(4)).toBe('grammar')
  expect(arenaKindAt(5)).toBe('reading')
  const w = arenaQuestionAt(0, 0)
  expect(isArenaGrammar(w) || isArenaReading(w)).toBe(false)
  const g = arenaQuestionAt(0, 1)
  expect(isArenaGrammar(g)).toBe(true)
  expect(g.word.en).toContain('___')
  expect(g.choices[g.answer]).toBe(g.word.ja)
  const r = arenaQuestionAt(0, 2)
  expect(isArenaReading(r)).toBe(true)
  expect(r.word.en.split(' ').length).toBeGreaterThan(2) // 文で出る
  expect(r.choices[r.answer]).toBe(r.word.ja)
  expect(new Set(r.choices).size).toBe(r.choices.length)
  expect(isArenaReading(arenaQuestionAt(9, 5))).toBe(true)
})

it('闘技場：連続正解では一気に上がる（2連続で2階、3連続で3階…最大5階）', async () => {
  const { arenaNext, isArenaJump, ARENA_MAX_JUMP } = await import('./arena')
  expect(arenaNext(2, true, 1)).toBe(3)
  expect(arenaNext(2, true, 2)).toBe(4)
  expect(arenaNext(2, true, 3)).toBe(5)
  expect(arenaNext(2, true, 9)).toBe(2 + ARENA_MAX_JUMP)
  expect(arenaNext(2, false, 3)).toBe(1)
  expect(isArenaJump(true, 1)).toBe(false)
  expect(isArenaJump(true, 2)).toBe(true)
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  arenaPick(true) // 1→2階
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(true) // 2→4階
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(true) // 4→7階
  expect(document.querySelector('.arena-move')).toHaveTextContent('🚀 3連続！ 一気に3階アップ！ 7階へ')
  expect(document.querySelector('.arena-jump-pop')).toHaveTextContent('+3階') // 上がった階の数を大きく
})

it('闘技場：次の挑戦は前回の階から始まる', async () => {
  const { loadArenaLast } = await import('./arena')
  localStorage.clear()
  expect(loadArenaLast()).toBe(0)
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} />)
  fireEvent.click(within(screen.getByRole('region', { name: '闘技場' })).getByRole('button', { name: /闘技場で戦う/ }))
  arenaPick(true)
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(true) // 1→2→4階
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(loadArenaLast()).toBe(3)
  expect(screen.getByText('▶ 次はこの 4階から始まるよ')).toBeInTheDocument()
  fireEvent.click(screen.getByText('← 城にもどる'))
  expect(within(screen.getByRole('region', { name: '闘技場' })).getByText(/前回の 4階から/)).toBeInTheDocument()
  fireEvent.click(within(screen.getByRole('region', { name: '闘技場' })).getByRole('button', { name: /闘技場で戦う/ }))
  expect(screen.getByRole('progressbar', { name: '闘技場の階' })).toHaveAttribute('aria-valuenow', '4')
  expect(screen.getByText('🔁 前回の続き、4階から！')).toBeInTheDocument()
  arenaPick(true)
  expect(screen.queryByText(/前回の続き/)).toBeNull()
})

it('闘技場：最高記録で新しい称号に上がると、ガチャチケット1枚（称号ごとに1回）', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  localStorage.setItem('eitan:arena-best-floor', '8')
  const ticket = vi.fn()
  render(<Arena start={8} onExit={() => {}} onTicket={ticket} />)
  arenaPick(true) // 9→10階（見習いのまま）
  expect(ticket).not.toHaveBeenCalled()
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(true) // 2連続で一気に2階：10→12階：ルーキーに上がる
  expect(ticket).toHaveBeenCalledWith(1)
  expect(screen.getByText('🎖 新しい称号「🔰 ルーキー」！ 🎟ガチャチケット×1')).toBeInTheDocument()
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(false) // 12→11階
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(true) // また12階：記録更新ではないのでチケットなし
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
  arenaPick(true)
  expect(ans).toHaveBeenCalledWith(true, expect.any(Number), w.id, 'quiz')
  expect(ans.mock.calls[0][1]).toBeGreaterThan(0)
})

it('闘技場の塔に、いままでの最高の階の🚩が出る', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  localStorage.setItem('eitan:arena-best-floor', '5') // 最高は6階
  render(<Arena start={4} onExit={() => {}} />)
  const flag = document.querySelector('.af-best')!
  expect(flag.closest('.arena-floor')!.textContent).toContain('6階')
})

it('闘技場：3連続正解から、いまの階が燃える（🔥）', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  const pickRight = () => arenaPick(true)
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
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  const pick = () => {
    arenaPick(false)
    fireEvent.click(screen.getByText(/^次へ/))
  }
  expect(screen.queryByText('📐 文法')).toBeNull()
  pick()
  expect(screen.getByText('📐 文法')).toBeInTheDocument() // 2問め
  pick()
  expect(screen.getByText(/📖 読解/)).toBeInTheDocument() // 3問めは読解
  expect(screen.queryByRole('button', { name: '発音を聞く' })).toBeNull()
})

it('闘技場の塔で、新しい称号が始まる階にそのアイコンが出る', async () => {
  const { arenaTitleIconAt, ARENA_ENDLESS } = await import('./arena')
  expect(arenaTitleIconAt(0)).toBeNull()
  expect(arenaTitleIconAt(10)).toBe('🔰')
  expect(arenaTitleIconAt(30)).toBe('🗡')
  expect(arenaTitleIconAt(31)).toBeNull()
  expect(arenaTitleIconAt(ARENA_ENDLESS)).toBe('👑')
})

it('闘技場：3回続けてまちがえると応援が出る', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={3} onExit={() => {}} />)
  const miss = () => arenaPick(false)
  miss()
  fireEvent.click(screen.getByText(/^次へ/))
  miss()
  expect(screen.queryByText(/ドンマイ/)).toBeNull()
  fireEvent.click(screen.getByText(/^次へ/))
  miss()
  expect(screen.getByText('💪 ドンマイ！ 1問ずつ取りもどそう')).toBeInTheDocument()
  expect(document.querySelector('.arena-floor.here .af-say')).toHaveTextContent('まけないで！') // 相棒もはげます
})

it('闘技場の塔の階には、高さに合わせた飾り（木→雲→星→宇宙）', async () => {
  const { arenaDecor, ARENA_ENDLESS } = await import('./arena')
  expect(arenaDecor(0)).toBe('🌳')
  expect(arenaDecor(30)).toBe('☁️')
  expect(arenaDecor(90)).toBe('⭐')
  expect(arenaDecor(ARENA_ENDLESS)).toBe('🌌')
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={95} onExit={() => {}} />)
  expect(document.querySelector('.arena-floor.here .af-decor')).toHaveTextContent('⭐')
})

it('闘技場の塔の空は、下の階は青空・上の階は星空', async () => {
  const { arenaSky, ARENA_ENDLESS, ARENA_PER } = await import('./arena')
  expect(arenaSky(0)[0]).toBe('#0ea5e9')
  expect(arenaSky(7 * ARENA_PER)[0]).toBe('#f97316')
  expect(arenaSky(ARENA_ENDLESS + 9)[0]).toBe('#4c1d95')
  const { Arena } = await import('./ArenaView')
  render(<Arena start={ARENA_ENDLESS} onExit={() => {}} />)
  expect((document.querySelector('.arena-tower') as HTMLElement).style.getPropertyValue('--sky1')).toBe('#4c1d95')
})

it('闘技場の結果から、はじめの階にもどって戦える', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={2} onExit={() => {}} />)
  arenaPick(true)
  fireEvent.click(screen.getByText('🏁 終了'))
  fireEvent.click(screen.getByText('🔁 はじめの階（3階）から'))
  expect(screen.getByRole('progressbar', { name: '闘技場の階' })).toHaveAttribute('aria-valuenow', '3')
})

it('闘技場の塔をのぼるのは相棒のモンスター（いなければ 🦸）', async () => {
  const { FORMS } = await import('./monster')
  localStorage.clear()
  render(<Stages part="boss" levels={['中1']} record={{}} onClear={() => {}} partner={{ form: FORMS[1], name: 'モチ' }} />)
  fireEvent.click(within(screen.getByRole('region', { name: '闘技場' })).getByRole('button', { name: /闘技場で戦う/ }))
  expect(document.querySelector('.arena-floor.here .af-fig svg')).not.toBeNull()
})

it('闘技場：3秒以内に正解すると「⚡ はやい！」', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  const pickRight = () => arenaPick(true)
  pickRight() // 最初の問題は数えない
  expect(screen.queryByText('⚡ はやい！')).toBeNull()
  fireEvent.click(screen.getByText(/^次へ/))
  pickRight()
  expect(screen.getByText('⚡ はやい！')).toBeInTheDocument()
})

it('闘技場：3問続けて「はやい！」で正解すると「⚡⚡⚡ 電光石火！」', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  arenaPick(true) // 最初の問題は数えない
  fireEvent.click(screen.getByText(/^次へ/))
  // クリックはすぐなので、どれも3秒以内
  for (let k = 1; k <= 2; k++) {
    arenaPick(true)
    expect(screen.getByText('⚡ はやい！')).toBeInTheDocument()
    fireEvent.click(screen.getByText(/^次へ/))
  }
  arenaPick(true)
  expect(screen.getByText('⚡⚡⚡ 電光石火！ 3問続けて はやい！')).toBeInTheDocument()
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(false)
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(true)
  expect(screen.getByText('⚡ はやい！')).toBeInTheDocument() // まちがえたら数えなおし
})

it('闘技場の単語の問題には 🔊（発音を聞く）ボタン', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={0} onExit={() => {}} />)
  expect(screen.getByRole('button', { name: '発音を聞く' })).toBeInTheDocument()
})

it('闘技場：無限の階の入り口は金色で「♾ 無限の階」', async () => {
  const { Arena } = await import('./ArenaView')
  const { ARENA_ENDLESS } = await import('./arena')
  localStorage.clear()
  render(<Arena start={ARENA_ENDLESS} onExit={() => {}} />)
  const top = document.querySelector('.arena-floor.here')!
  expect(top.classList.contains('summit')).toBe(true)
  expect(top.textContent).toContain('♾ 無限の階')
})

it('闘技場：押した選択肢だけに光る波紋（rippled）がつく', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={5} onExit={() => {}} />)
  expect(document.querySelector('.arena .choice.rippled')).toBeNull()
  arenaPick(false)
  expect(document.querySelectorAll('.arena .choice.rippled')).toHaveLength(1)
  expect(document.querySelector('.arena .choice.rippled')!.classList.contains('wrong')).toBe(true)
  const { readFileSync } = await import('node:fs')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.arena \.choice\.rippled::after/)
})

it('ボス城の階：押した選択肢に光る波紋（rippled）がつく', async () => {
  localStorage.clear()
  const { BossFloor } = await import('./BossFloorView')
  const { bossFloorQs } = await import('./bosscastle')
  render(<BossFloor title="1階" qs={bossFloorQs('中1', 0)} onDone={() => {}} onBack={() => {}} />)
  expect(document.querySelector('.bfloor .choice.rippled')).toBeNull()
  fireEvent.click(document.querySelector<HTMLButtonElement>('.bfloor .choice')!)
  expect(document.querySelectorAll('.bfloor .choice.rippled')).toHaveLength(1)
  const { readFileSync } = await import('node:fs')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.bfloor \.choice\.rippled::after/)
})

it('闘技場・ボス城：正解した選択肢は波紋が金色にかがやく（CSS）', async () => {
  const { readFileSync } = await import('node:fs')
  const css = readFileSync('src/polish.css', 'utf8')
  expect(css).toMatch(/\.arena \.choice\.correct\.rippled::after, \.bfloor \.choice\.correct\.rippled::after \{/)
  expect(css).not.toMatch(/\.choice\.correct::before, \.bfloor/) // A・B・C の札（::before）はこわさない
})

it('闘技場：いまの階の数字はかわるたびに作りなおされて、ぽんとはねる', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={5} onExit={() => {}} />)
  const before = document.querySelector('.arena-now-num')!
  expect(before.textContent).toBe('6階')
  arenaPick(true)
  const after = document.querySelector('.arena-now-num')!
  expect(after.textContent).toBe('7階')
  expect(after).not.toBe(before)
  const { readFileSync } = await import('node:fs')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.arena-now-num \{ display: inline-block; animation: floor-num-pop/)
})

it('闘技場の結果：最高記録を更新したときだけ紙ふぶきが舞う', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={5} onExit={() => {}} />)
  arenaPick(true)
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.getByText(/最高記録 更新！/)).toBeInTheDocument()
  expect(document.querySelector('.arena-result .best-confetti')).not.toBeNull()
  fireEvent.click(screen.getByText('⚔ 続きから戦う'))
  arenaPick(false)
  fireEvent.click(screen.getByText('🏁 終了'))
  expect(screen.queryByText(/最高記録 更新！/)).toBeNull()
  expect(document.querySelector('.arena-result .best-confetti')).toBeNull()
})

it('ボス城の階：クリアの文字がきらっと光る（CSS）', async () => {
  const { readFileSync } = await import('node:fs')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.bfloor \.stage-result\.clear \{ animation: pop 0\.4s, clear-shine/)
})

it('闘技場：2連続正解から炎のアイコンがゆらゆらゆれる', async () => {
  const { Arena } = await import('./ArenaView')
  localStorage.clear()
  render(<Arena start={5} onExit={() => {}} />)
  expect(document.querySelector('.arena-flame')).toBeNull()
  arenaPick(true)
  fireEvent.click(screen.getByText(/^次へ/))
  arenaPick(true)
  expect(document.querySelector('.arena-flame')!.textContent).toBe('🔥')
  expect(document.querySelector('.arena-flame')!.parentElement!.textContent).toContain('🔥2連続')
  const { readFileSync } = await import('node:fs')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.arena-flame \{ display: inline-block;[^}]*animation: flame-flicker/)
})
