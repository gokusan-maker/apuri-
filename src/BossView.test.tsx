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
    expect(document.querySelector('.boss-intro')).not.toBeNull()
    expect(document.querySelector('.boss.bg-field')).not.toBeNull()
    for (let i = 0; i < 20 && !screen.queryByText('ボスをたおした！ 🎉'); i++) {
      answer(true)
      expect(document.querySelector('.dmg-pop')?.textContent).toMatch(/^-\d+$/)
      if (!screen.queryByText('ボスをたおした！ 🎉')) expect(document.querySelector('.boss-hurt')).not.toBeNull()
      if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('ボスをたおした！ 🎉')).toBeInTheDocument()
    expect(onWin).toHaveBeenCalledTimes(1)
    expect(document.body.textContent).not.toContain('ハートを減らさず') // Sランクの条件は title にだけ（文字を減らす）
    expect(document.querySelectorAll('.boss .confetti:not(.gold)').length).toBe(12)
    expect(screen.getByText('💥 とどめ！')).toBeInTheDocument()
    expect(document.querySelector('.boss-intro')).toBeNull()
    expect(document.querySelector('.boss-figure.finished')).not.toBeNull()
    expect(screen.getByText(/最大ダメージ記録/)).toBeInTheDocument()
    expect(screen.getByText(/⏱ タイム .*最短記録！/)).toBeInTheDocument()
    expect(screen.getByText(/🏅 MVP単語：/)).toBeInTheDocument()
  })

  it('5コンボ以上でコンボ表示が大きくなり「すごいコンボ！」が出る', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} hp={999} onWin={() => {}} onExit={() => {}} />)
    for (let i = 0; i < 4; i++) {
      answer(true)
      expect(screen.queryByText(/すごいコンボ！/)).not.toBeInTheDocument()
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(document.querySelector('.combo.big')).toBeNull()
    answer(true)
    expect(screen.getByText('🔥 すごいコンボ！ 5連続！')).toBeInTheDocument()
    expect(document.querySelector('.combo.big')?.textContent).toBe('🔥5')
  })

  it('ハートがのこり1つになると「逆転チャンス」が出る', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
    expect(screen.queryByText(/逆転チャンス/)).not.toBeInTheDocument()
    for (let i = 0; i < 2; i++) {
      answer(false)
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByLabelText('のこりハート 1')).toBeInTheDocument()
    expect(screen.getByText('⚡逆転チャンス！ダメージ2倍')).toBeInTheDocument()
  })

  it('勝ったあと「次のボスへ ▶」が出る', () => {
    const onNext = vi.fn()
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} nextBoss={{ label: '次のボスへ ▶ テスト', onClick: onNext }} />)
    expect(screen.queryByText('次のボスへ ▶ テスト')).toBeNull()
    for (let i = 0; i < 20 && !screen.queryByText('ボスをたおした！ 🎉'); i++) {
      answer(true)
      if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
    }
    fireEvent.click(screen.getByText('次のボスへ ▶ テスト'))
    expect(onNext).toHaveBeenCalled()
  })

  it('ボスのHPが数字でも出て、正解すると減る', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} hp={300} onWin={() => {}} onExit={() => {}} />)
    expect(screen.getByText('のこりHP 300 / 300')).toBeInTheDocument()
    answer(true)
    const m = /のこりHP (\d+) \/ 300/.exec(document.querySelector('.boss-hp-num')!.textContent!)!
    expect(Number(m[1])).toBeLessThan(300)
  })

  it('ボス戦のはじめに「⚔ バトルスタート！」が出て、答えると消える（タップのじゃまをしない）', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} hp={300} onWin={() => {}} onExit={() => {}} />)
    const b = document.querySelector('.battle-start')!
    expect(b.textContent).toContain('バトルスタート！')
    answer(true)
    expect(document.querySelector('.battle-start')).toBeNull()
  })

  it('負けると相棒がはげましてくれる', async () => {
    const { FORMS } = await import('./monster')
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} partner={{ form: FORMS[1], name: 'モチ' }} />)
    for (let i = 0; i < 8 && !screen.queryByText('まけてしまった…'); i++) {
      answer(false)
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('まけてしまった…')).toBeInTheDocument()
    expect(document.querySelector('.lose-cheer')!.textContent).toMatch(/^🐣 モチ「.+」$/)
  })

  it('勝つと読解のなかま（竜）が英語で勝利のひとこと（和訳つき）', async () => {
    const { WIN_LINES } = await import('./readingboss')
    const rnd = vi.spyOn(Math, 'random').mockReturnValue(0)
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} winBuddy={{ icon: '🐲', name: 'ベビードラゴン' }} />)
    rnd.mockRestore()
    answer(true)
    expect(screen.getByText(new RegExp(`🐲 ベビードラゴン「${WIN_LINES[0].en}」`))).toBeInTheDocument()
    expect(screen.getByText(`（${WIN_LINES[0].ja}）`)).toBeInTheDocument()
    expect(screen.getByLabelText('竜のひとことを聞く')).toBeInTheDocument()
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
  expect(screen.getByText('PERFECT!')).toBeInTheDocument()
  expect(document.querySelectorAll('.confetti.gold')).toHaveLength(16)
  expect(bonus).toHaveBeenCalledWith(10)
  const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.7) // 🪙20
  fireEvent.click(screen.getByText('🎡 Sランクのごほうびルーレットをまわす'))
  rnd.mockRestore()
  expect(bonus).toHaveBeenCalledWith(20)
  expect(screen.getByText(/🪙20 が当たった！/)).toBeInTheDocument()
  expect(screen.queryByText('🎡 Sランクのごほうびルーレットをまわす')).toBeNull()
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
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} bag={{ bomb: 2, charm: 1, clock: 0, lucky: 0 }} onUseItem={(id) => used.push(id)} />)
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

it('どのボスでもたおすと onDefeat が呼ばれる', () => {
  const defeat = vi.fn()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} onDefeat={defeat} />)
  answer(true)
  expect(defeat).toHaveBeenCalledTimes(1)
})

it('特技が出ると onSkill が呼ばれ、Lv3のドラコは +5', async () => {
  const { FORMS, withSpecies } = await import('./monster')
  const skill = vi.fn()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} onSkill={skill} partner={{ form: withSpecies(FORMS[1], 'dragon'), species: 'dragon', name: 'ドラ', skillUses: 30 }} />)
  expect(screen.getByText(/特技「火の息」Lv3/)).toBeInTheDocument()
  answer(true)
  expect(screen.getByText('ドラの火の息！ +5')).toBeInTheDocument()
  expect(skill).toHaveBeenCalledTimes(1)
})

it('Sランクでなければ PERFECT! は出ない', () => {
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  answer(false)
  fireEvent.click(screen.getByText('次へ'))
  answer(true)
  expect(screen.getByText('ボスをたおした！ 🎉')).toBeInTheDocument()
  expect(screen.queryByText('PERFECT!')).not.toBeInTheDocument()
})

it('たおすとボスが撃破セリフを言う', async () => {
  localStorage.clear()
  const { defeatLineOf, BOSSES } = await import('./boss')
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  answer(true)
  expect(screen.getByText(`「${defeatLineOf(BOSSES['中1'].name).en}」`, { exact: false })).toBeInTheDocument()
})

it('ボスがアイテムをおとすことがある', () => {
  const drop = vi.fn()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} onDrop={drop} />)
  const rnd = vi.spyOn(Math, 'random').mockReturnValue(0.01)
  answer(true)
  rnd.mockRestore()
  expect(drop).toHaveBeenCalledWith('bomb')
  expect(screen.getByText(/ボスが 💣 どっかんボンバー をおとした！/)).toBeInTheDocument()
})

it('相棒がいると必殺技はキャラクターの技名になる', async () => {
  const { FORMS, withSpecies } = await import('./monster')
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} partner={{ form: withSpecies(FORMS[1], 'dragon'), species: 'dragon', name: 'ドラ' }} />)
  for (let i = 0; i < 3; i++) {
    answer(true)
    fireEvent.click(screen.getByText('次へ'))
  }
  fireEvent.click(screen.getByText('💥 「ドラゴンブレス・ゼロ」をはなつ！'))
  expect(screen.getByText(/ドラの「ドラゴンブレス・ゼロ」！ 25 ダメージ/)).toBeInTheDocument()
})

it('負けてもコインでコンティニューして続きから戦える（1戦1回）', () => {
  const spend = vi.fn(() => true)
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} onSpend={spend} />)
  for (let i = 0; i < 3; i++) {
    answer(false)
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText('まけてしまった…')).toBeInTheDocument()
  fireEvent.click(screen.getByText(/コンティニュー/))
  expect(spend).toHaveBeenCalledWith(20)
  expect(screen.getByLabelText('のこりハート 3')).toBeInTheDocument()
  for (let i = 0; i < 3 && !screen.queryByText('まけてしまった…'); i++) {
    answer(false)
    if (!screen.queryByText('まけてしまった…')) fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.queryByText(/コンティニュー/)).not.toBeInTheDocument()
})

it('弱点のキャラクターの相棒だと追加ダメージ', async () => {
  const { FORMS, withSpecies } = await import('./monster')
  const { weakOf } = await import('./partner')
  const { BOSSES } = await import('./boss')
  const sp = weakOf(BOSSES['中1'].name)
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} partner={{ form: withSpecies(FORMS[1], sp), species: sp === 'mochi' ? undefined : sp, name: 'あいぼう' }} />)
  fireEvent.click(screen.getByText('スキップ'))
  expect(screen.getByText(/弱点をついている！/)).toBeInTheDocument()
  const before = 100
  vi.setSystemTime(Date.now() + 10000) // 会心なし
  answer(true)
  const hp = Number(screen.getByRole('progressbar', { name: 'ボスのHP' }).getAttribute('aria-valuenow'))
  expect(before - hp).toBeGreaterThanOrEqual(6 + 4)
})

it('ボスのセリフに相棒が言い返す', async () => {
  const { FORMS, withSpecies } = await import('./monster')
  const { UNIV_BOSSES } = await import('./univ')
  render(<Boss level="高校基礎" words={wordsOf(['高校基礎'])} look={UNIV_BOSSES[0]} onWin={() => {}} onExit={() => {}} partner={{ form: withSpecies(FORMS[1], 'cat'), species: 'cat', name: 'ニャ' }} />)
  expect(screen.getByText(/ニャ：「I am not afraid of you.」/)).toBeInTheDocument()
})

it('ハートがなくなると onLose が呼ばれる', () => {
  const lose = vi.fn()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} onLose={lose} />)
  for (let i = 0; i < 3; i++) {
    answer(false)
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(lose).toHaveBeenCalledTimes(1)
})

it('金色ボスをたおすとおまけコイン', () => {
  const bonus = vi.fn()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} golden onRankBonus={bonus} />)
  expect(screen.getByText('金色のヤミモチ')).toBeInTheDocument()
  answer(true)
  expect(bonus).toHaveBeenCalledWith(20)
})

it('ためこうげきの問題をまちがえるとハートが2つへる', () => {
  vi.setSystemTime(Date.now() + 5000)
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={500} />)
  ;[true, false, true, true].forEach((ok) => {
    answer(ok)
    fireEvent.click(screen.getByText('次へ'))
  })
  expect(screen.getByText(/力をためている/)).toBeInTheDocument()
  answer(false)
  expect(screen.getByText(/ためこうげき！ ハートが2つへった/)).toBeInTheDocument()
})

it('3問連続正解でことばの盾がたまり、次のまちがいでハートがへらない', () => {
  vi.setSystemTime(Date.now() + 5000)
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={500} />)
  for (let i = 0; i < 3; i++) {
    answer(true)
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText(/ことばの盾：次のまちがい1回/)).toBeInTheDocument()
  answer(false)
  expect(screen.getByText('🛡 ことばの盾がハートを守った！')).toBeInTheDocument()
  expect(screen.getByLabelText('のこりハート 3')).toBeInTheDocument()
})

it('スローどけいを使うと、5秒かかっても会心の一撃', () => {
  const used: string[] = []
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} bag={{ bomb: 0, charm: 0, clock: 1, lucky: 0 }} onUseItem={(id) => used.push(id)} />)
  fireEvent.click(screen.getByText(/スローどけい/))
  expect(used).toEqual(['clock'])
  vi.setSystemTime(Date.now() + 5000)
  answer(true)
  expect(screen.getByText('⚡ 会心の一撃！')).toBeInTheDocument()
})

it('先制クイズで弱点を当てると10ダメージ、はずれると0', async () => {
  const { weakOf } = await import('./partner')
  const { speciesOf } = await import('./monster')
  const { BOSSES } = await import('./boss')
  const weak = speciesOf(weakOf(BOSSES['中1'].name)).name
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
  expect(screen.getByText(/先制クイズ/)).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: weak }))
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '90')
  expect(screen.getByText(/先制攻撃！/)).toBeInTheDocument()
  unmount()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
  const wrong = [...document.querySelectorAll<HTMLButtonElement>('.boss-preempt-choices button')].find((b) => b.textContent !== weak && b.textContent !== 'スキップ')!
  fireEvent.click(wrong)
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '100')
  expect(screen.getByText('先制クイズははずれ…')).toBeInTheDocument()
})

it('HPが半分になると子分があらわれ、次の正解でたおすと🪙2', () => {
  const bonus = vi.fn()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={20} onRankBonus={bonus} />)
  const slowAnswer = () => {
    vi.setSystemTime(Date.now() + 5000) // 会心なし
    answer(true)
  }
  slowAnswer() // 20 → 14
  fireEvent.click(screen.getByText('次へ'))
  slowAnswer() // → 7（半分以下）
  expect(screen.getByText(/子分のチビ/)).toBeInTheDocument()
  fireEvent.click(screen.getByText('次へ'))
  slowAnswer()
  expect(bonus).toHaveBeenCalledWith(2)
})

it('ボス戦10回に1回、色ちがいのボスがあらわれ、たおすとボス図鑑に記録される', async () => {
  localStorage.clear()
  localStorage.setItem('eitan:boss-battles', '9')
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
  expect(screen.getByText(/色ちがいのボスがあらわれた/)).toBeInTheDocument()
  answer(true)
  const { loadBook } = await import('./bossbook')
  expect(Object.keys(loadBook()).some((n) => n.startsWith('✨色ちがいの'))).toBe(true)
})

it('負けたボスに勝つとリベンジ成功で🪙5', async () => {
  const { BOSSES } = await import('./boss')
  localStorage.clear()
  localStorage.setItem('eitan:boss-lost', JSON.stringify([BOSSES['中1'].name]))
  const bonus = vi.fn()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} onRankBonus={bonus} />)
  answer(true)
  expect(screen.getByText(/リベンジ成功！/)).toBeInTheDocument()
  expect(bonus).toHaveBeenCalledWith(5)
})

it('6問目はボスがねむっていてダメージ2倍', () => {
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={500} />)
  for (let i = 0; i < 5; i++) {
    vi.setSystemTime(Date.now() + 5000)
    answer(true)
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText(/ねむっている！/)).toBeInTheDocument()
  const before = Number(screen.getByRole('progressbar', { name: 'ボスのHP' }).getAttribute('aria-valuenow'))
  vi.setSystemTime(Date.now() + 5000)
  answer(true)
  const after = Number(screen.getByRole('progressbar', { name: 'ボスのHP' }).getAttribute('aria-valuenow'))
  expect(before - after).toBeGreaterThanOrEqual(20) // ふつうは最大10
})

it('相棒のちからの分だけ正解ダメージがふえる', () => {
  vi.setSystemTime(Date.now() + 5000)
  const { unmount } = render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={500} />)
  vi.setSystemTime(Date.now() + 5000)
  answer(true)
  const a = 500 - Number(screen.getByRole('progressbar', { name: 'ボスのHP' }).getAttribute('aria-valuenow'))
  unmount()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={500} power={3} />)
  vi.setSystemTime(Date.now() + 5000)
  answer(true)
  const b = 500 - Number(screen.getByRole('progressbar', { name: 'ボスのHP' }).getAttribute('aria-valuenow'))
  expect(b - a).toBe(3)
})

it('相棒のヒントでまちがいの選択肢が1つ消える（1戦1回）', async () => {
  const { FORMS } = await import('./monster')
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={500} partner={{ form: FORMS[1], name: 'あいぼう' }} />)
  const before = document.querySelectorAll('.boss .choice').length
  fireEvent.click(screen.getByText(/あいぼうのヒント/))
  expect(document.querySelectorAll('.boss .choice').length).toBe(before - 1)
  expect(screen.queryByText(/あいぼうのヒント/)).toBeNull()
  answer(true)
  fireEvent.click(screen.getByText('次へ'))
  expect(screen.queryByText(/あいぼうのヒント/)).toBeNull()
})

it('ラッキーコインを使うとSランクボーナスが2倍', () => {
  const bonus = vi.fn()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} onRankBonus={bonus} bag={{ bomb: 0, charm: 0, clock: 0, lucky: 1 }} onUseItem={() => {}} />)
  fireEvent.click(screen.getByText(/ラッキーコイン/))
  for (let i = 0; i < 20 && !screen.queryByText('ボスをたおした！ 🎉'); i++) {
    answer(true)
    if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByLabelText('ランク S')).toBeInTheDocument()
  expect(bonus).toHaveBeenCalledWith(20)
})

it('相棒がいると正解したときにおうえんスタンプが出る', async () => {
  const { FORMS } = await import('./monster')
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={500} partner={{ form: FORMS[1], name: 'あいぼう' }} />)
  answer(true)
  expect(screen.getByLabelText('おうえんスタンプ')).toHaveTextContent('👍 ナイス！')
})

it('読解ボスで空所の問題に正解すると、本文のその空所に答えが入る', async () => {
  localStorage.clear()
  const { passageQs } = await import('./readingboss')
  const { LONG_PASSAGES } = await import('./longreading')
  const all = LONG_PASSAGES.flatMap(passageQs)
  render(<Boss level="中1" words={wordsOf(['中1'])} reading onAnswer={() => {}} onWin={() => {}} onExit={() => {}} />)
  // 最初の問題は本文の順で空所の問題
  const en = document.querySelector('.boss .en')!.textContent
  const q = all.find((x) => x.word.en === en)!
  expect(q.blank).toBeDefined()
  expect(document.querySelector('.boss-filled')).toBeNull()
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent === q.choices[q.answer])!)
  expect(screen.getByLabelText(`（${q.blank}）${q.choices[q.answer]}`)).toBeInTheDocument()
})

it('読解ボスの本文で、単語帳にある語をタップすると意味が出る', () => {
  localStorage.clear()
  render(<Boss level="中1" words={wordsOf(['中1'])} reading onAnswer={() => {}} onWin={() => {}} onExit={() => {}} />)
  const w = document.querySelector<HTMLButtonElement>('.boss-passage .gloss-word')!
  expect(w).not.toBeNull()
  fireEvent.click(w)
  expect(screen.getByRole('status').textContent).toMatch(/：/)
})

it('読解ボスに負けたときは「本文をもう一度読もう」と出る', async () => {
  localStorage.clear()
  const { passageQs } = await import('./readingboss')
  const { LONG_PASSAGES } = await import('./longreading')
  const all = LONG_PASSAGES.flatMap(passageQs)
  render(<Boss level="中1" words={wordsOf(['中1'])} reading startHearts={1} onAnswer={() => {}} onWin={() => {}} onExit={() => {}} />)
  const en = document.querySelector('.boss .en')!.textContent
  const q = all.find((x) => x.word.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choice')].find((b) => b.textContent !== q.choices[q.answer])!)
  const next = screen.queryByRole('button', { name: /次へ|結果を見る/ })
  if (next) fireEvent.click(next)
  expect(screen.getByText(/本文をもう一度ゆっくり読んで/)).toBeInTheDocument()
  expect(screen.queryByText(/苦手な単語を復習して/)).toBeNull()
})
