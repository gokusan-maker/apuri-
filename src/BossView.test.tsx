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
    expect(document.querySelectorAll('.boss .confetti').length).toBe(12)
  })

  it('3回まちがえると負け、もう一度挑戦できる', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
    for (let i = 0; i < 3; i++) {
      answer(false)
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('まけてしまった…')).toBeInTheDocument()
    const n = screen.getByRole('list', { name: 'まちがえた単語' }).querySelectorAll('li').length
    expect(n).toBeGreaterThanOrEqual(1)
    expect(n).toBeLessThanOrEqual(3)
    fireEvent.click(screen.getByText('もう一度挑戦'))
    expect(screen.getByLabelText('のこりハート 3')).toBeInTheDocument()
  })
})

it('コインでハートを1つ回復できる（1戦1回）', () => {
  let coins = 30
  const spend = (n: number) => (coins >= n ? ((coins -= n), true) : false)
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} onSpend={spend} />)
  answer(false)
  fireEvent.click(screen.getByText('次へ'))
  fireEvent.click(screen.getByText('❤️+1（🪙10）'))
  expect(screen.getByLabelText('のこりハート 3')).toBeInTheDocument()
  expect(coins).toBe(20)
  answer(false)
  fireEvent.click(screen.getByText('次へ'))
  expect(screen.queryByText('❤️+1（🪙10）')).not.toBeInTheDocument()
})

it('すぐに正解すると会心の一撃、ゆっくりだとふつうのダメージ', () => {
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
  expect(screen.getByText(/3秒以内に正解すると/)).toBeInTheDocument()
  answer(true)
  expect(screen.getByText('⚡ 会心の一撃！')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '91')
  unmount()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
  vi.setSystemTime(Date.now() + 5000)
  answer(true)
  expect(screen.queryByText('⚡ 会心の一撃！')).not.toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '94')
})

it('ゲージが満タンになると必殺技で大ダメージ', () => {
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
  expect(screen.queryByText('💥 必殺技をはなつ！')).not.toBeInTheDocument()
  for (let i = 0; i < 3; i++) {
    answer(true) // すぐ答えるので会心（ゲージ+2）
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByRole('meter', { name: '必殺技ゲージ' })).toHaveAttribute('aria-valuenow', '5')
  const hp = Number(screen.getByRole('progressbar', { name: 'ボスのHP' }).getAttribute('aria-valuenow'))
  fireEvent.click(screen.getByText('💥 必殺技をはなつ！'))
  expect(screen.getByText('💥 必殺技！ 25 ダメージ')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', String(hp - 25))
  expect(screen.getByRole('meter', { name: '必殺技ゲージ' })).toHaveAttribute('aria-valuenow', '0')
})

it('相棒がいっしょに戦う：ドラコは火の息で追加ダメージ、ペンペンはハートを守る', async () => {
  const { FORMS, withSpecies } = await import('./monster')
  const grown = (sp: string) => ({ form: withSpecies(FORMS[1], sp), species: sp, name: 'あいぼう' })
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} partner={grown('dragon')} />)
  expect(screen.getByText(/特技「火の息」/)).toBeInTheDocument()
  answer(true)
  expect(screen.getByText('あいぼうの火の息！ +3')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '88') // 会心9＋3
  unmount()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} partner={grown('penguin')} />)
  answer(false)
  expect(screen.getByText('あいぼうのペンギンガード！ ハートを守った')).toBeInTheDocument()
  expect(screen.getByLabelText('のこりハート 3')).toBeInTheDocument()
})

it('タマゴの相棒は応援だけ', async () => {
  const { FORMS } = await import('./monster')
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} partner={{ form: FORMS[0], name: 'たまご' }} />)
  expect(screen.getByText(/たまごが応援しているよ/)).toBeInTheDocument()
})

it('ノーミス＆会心でたおすとSランクでおまけコイン', () => {
  const bonus = vi.fn()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} onRankBonus={bonus} />)
  for (let i = 0; i < 20 && !screen.queryByText('ボスをたおした！ 🎉'); i++) {
    answer(true)
    if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByLabelText('ランク S')).toBeInTheDocument()
  expect(bonus).toHaveBeenCalledWith(10)
})

it('チャンス問題が出る', () => {
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={26} />)
  const slow = () => {
    vi.setSystemTime(Date.now() + 5000) // ゆっくり答えて会心にしない
    answer(true)
  }
  slow() // 6 → 20
  expect(screen.queryByText(/がおこった！/)).not.toBeInTheDocument()
  fireEvent.click(screen.getByText('次へ'))
  slow() // 7 → 13（半分以下）
  expect(screen.getByText(/がおこった！/)).toBeInTheDocument()
  fireEvent.click(screen.getByText('次へ'))
  expect(screen.getByText('⚡ チャンス問題！ 正解でダメージ2倍')).toBeInTheDocument()
  slow() // 8×2=16 → 0
  expect(screen.getByText('ボスをたおした！ 🎉')).toBeInTheDocument()
})

it('バトルアイテム：ばくだんで20ダメージ、おまもりでハート回復（1戦1回）', () => {
  const used: string[] = []
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} bag={{ bomb: 2, charm: 1 }} onUseItem={(id) => used.push(id)} />)
  expect(screen.getByText(/まもりのおまもりん/).closest('button')).toBeDisabled() // ハート満タン
  fireEvent.click(screen.getByText(/どっかんボンバー/))
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '80')
  expect(screen.getByText(/どっかんボンバー/).closest('button')).toBeDisabled()
  answer(false)
  expect(screen.getByLabelText('のこりハート 2')).toBeInTheDocument()
  fireEvent.click(screen.getByText(/まもりのおまもりん/))
  expect(screen.getByLabelText('のこりハート 3')).toBeInTheDocument()
  expect(used).toEqual(['bomb', 'charm'])
})
