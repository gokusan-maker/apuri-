import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Boss } from './BossView'
import { BOSSES } from './boss'
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
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={onWin} onExit={() => {}} traits={[]} />) // とくぎなし（ダメージの計算をたしかめる）
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
    expect(screen.getByText('← もどる')).toBeInTheDocument() // 勝ったあとは「にげる」ではなく「もどる」
    expect(screen.queryByText('← にげる')).toBeNull()
    expect(document.querySelector('.boss-intro')).toBeNull()
    expect(document.querySelector('.boss-figure.finished')).not.toBeNull()
    expect(screen.getByLabelText(/最大ダメージ記録/)).toBeInTheDocument()
    expect(screen.getByLabelText(/タイム .*最短記録！/)).toBeInTheDocument()
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

  it('ボス戦の画面：名前とHPはネームプレートに。弱点・とくぎ・会心などの説明は出さない（オーナーの要望）', () => {
    const { container } = render(<Boss level="中1" words={wordsOf(['中1'])} hp={300} onWin={() => {}} onExit={() => {}} />)
    const plate = container.querySelector('.boss-plate')!
    expect(plate.querySelector('.boss-name')!.textContent).toBe(BOSSES['中1'].name)
    expect(plate.querySelector('[role="progressbar"]')).not.toBeNull()
    expect(plate.querySelector('.boss-hp-num')!.textContent).toBe('のこりHP 300 / 300')
    expect(container.querySelector('.boss-chips')).toBeNull()
    expect(screen.queryByText(/3秒以内で会心/)).toBeNull()
    expect((plate.querySelector('.boss-hp-ghost') as HTMLElement).style.width).toBe('100%')
    expect((container.querySelector('.battle-v2') as HTMLElement).style.getPropertyValue('--boss')).toBe(BOSSES['中1'].color)
  })

  it('3コンボで問題のパネルが燃え、大コンボで青い炎になる', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} hp={9999} onWin={() => {}} onExit={() => {}} />)
    const en = () => document.querySelector('.boss .en')!
    for (let n = 0; n < 3; n++) {
      expect(en().classList.contains('on-fire')).toBe(false)
      answer(true)
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(en().classList.contains('on-fire')).toBe(true)
    expect(en().classList.contains('blue')).toBe(false)
    for (let n = 0; n < 2; n++) {
      answer(true)
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(en().classList.contains('blue')).toBe(true)
    answer(false)
    fireEvent.click(screen.getByText('次へ'))
    expect(en().classList.contains('on-fire')).toBe(false)
  })

  it('アイテムは🎒ボタンを押すと一覧が出る（1画面に問題まで見えるように）', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} bag={{ bomb: 1, charm: 0, clock: 0, lucky: 0 }} />)
    expect(document.querySelector('.battle-items')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: '🎒 アイテム' }))
    expect(screen.getByRole('menu', { name: 'アイテム' })).toHaveTextContent('20ダメージ')
    fireEvent.click(screen.getByRole('menuitem', { name: /どっかんボンバー/ }))
    expect(document.querySelector('.battle-items')).toBeNull() // 使うと閉じる
    expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '220')
  })

  it('ハートがのこり1つになると、画面のふちが赤く脈打つ（ピンチ）', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
    const card = () => document.querySelector('.card.boss')!
    answer(false)
    fireEvent.click(screen.getByText('次へ'))
    expect(card().classList.contains('pinch')).toBe(false)
    answer(false)
    expect(card().classList.contains('pinch')).toBe(true)
  })

  it('まちがえて失ったハートは 💔 でわれる（次の問題では🤍）', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
    answer(false)
    expect(screen.getByLabelText('のこりハート 2').querySelector('.heart-break')!.textContent).toBe('💔')
    fireEvent.click(screen.getByText('次へ'))
    expect(screen.getByLabelText('のこりハート 2').querySelector('.heart-break')).toBeNull()
    expect(screen.getByLabelText('のこりハート 2').textContent).toBe('❤️❤️🤍')
  })

  it('会心の一撃で画面がゆれる（crit-shake）', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
    answer(true) // すぐに答えると会心
    expect(document.querySelector('.card.boss')!.classList.contains('crit-shake')).toBe(true)
  })

  it('ボスの HP が4分の1以下になると、ボスがふらふらする（weak）', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={40} />)
    expect(document.querySelector('.boss-figure')!.classList.contains('weak')).toBe(false)
    answer(true) // 会心で9ダメージ以上
    fireEvent.click(screen.getByText('次へ'))
    answer(true)
    fireEvent.click(screen.getByText('次へ'))
    answer(true)
    const hp = Number(screen.getByRole('progressbar', { name: 'ボスのHP' }).getAttribute('aria-valuenow'))
    expect(document.querySelector('.boss-figure')!.classList.contains('weak')).toBe(hp > 0 && hp <= 10)
  })

  it('まちがえると問題のパネルがゆれる（miss）', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
    expect(document.querySelector('.boss .en')!.classList.contains('miss')).toBe(false)
    answer(false)
    expect(document.querySelector('.boss .en')!.classList.contains('miss')).toBe(true)
  })

  it('ボスをたおすと K.O. のはんこが出る', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} />)
    expect(document.querySelector('.boss-ko')).toBeNull()
    answer(true)
    expect(document.querySelector('.boss-ko')!.textContent).toBe('K.O.!')
  })

  it('ボスのHPが数字でも出て、正解すると減る', () => {
    render(<Boss level="中1" words={wordsOf(['中1'])} hp={300} onWin={() => {}} onExit={() => {}} />)
    expect(screen.getByText('のこりHP 300 / 300')).toBeInTheDocument()
    answer(true)
    expect(document.querySelector('.boss-hp-num')!.classList.contains('hp-pop')).toBe(true) // ダメージで数字がはねる
    // 減ったぶんの白いバーも、いまのHPの幅へ追いかける
    expect((document.querySelector('.boss-hp-ghost') as HTMLElement).style.width).toBe((document.querySelector('.boss-hp-fill') as HTMLElement).style.width)
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

  it('相棒の特技の説明はボス戦の画面に出さない（オーナーの要望）', async () => {
    const { FORMS } = await import('./monster')
    render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={5} partner={{ form: FORMS[1], name: 'モチ' }} />)
    expect(document.querySelector('.boss-partner')).toBeNull()
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
  answer(true)
  expect(screen.getByText('⚡ 会心の一撃！')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '231')
  unmount()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
  vi.setSystemTime(Date.now() + 5000)
  answer(true)
  expect(screen.queryByText('⚡ 会心の一撃！')).not.toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '234')
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
  answer(true)
  expect(screen.getByText('あいぼうの火の息！ +3')).toBeInTheDocument()
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '228') // 会心9＋3
  unmount()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} partner={grown('penguin')} />)
  answer(false)
  expect(screen.getByText('あいぼうのペンギンガード！ ハートを守った')).toBeInTheDocument()
  expect(screen.getByLabelText('のこりハート 3')).toBeInTheDocument()
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
  fireEvent.click(screen.getByText('🎡 ごほうびルーレット！'))
  rnd.mockRestore()
  expect(bonus).toHaveBeenCalledWith(20)
  expect(screen.getByText(/🪙20 が当たった！/)).toBeInTheDocument()
  expect(screen.queryByText('🎡 ごほうびルーレット！')).toBeNull()
})

it('チャンス問題が出る', () => {
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={26} traits={[]} />)
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
  fireEvent.click(screen.getByText('🎒 アイテム'))
  expect(screen.getByText(/まもりのおまもりん/).closest('button')).toBeDisabled() // ハート満タン
  fireEvent.click(screen.getByText(/どっかんボンバー/))
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '220')
  fireEvent.click(screen.getByText('🎒 アイテム'))
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
  expect(screen.getByText(/🎁 💣 どっかんボンバー ゲット！/)).toBeInTheDocument()
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
  const before = 240
  vi.setSystemTime(Date.now() + 10000) // 会心なし
  answer(true)
  const hp = Number(screen.getByRole('progressbar', { name: 'ボスのHP' }).getAttribute('aria-valuenow'))
  expect(before - hp).toBeGreaterThanOrEqual(6 + 4)
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
  fireEvent.click(screen.getByText('🎒 アイテム'))
  fireEvent.click(screen.getByText(/スローどけい/))
  expect(used).toEqual(['clock'])
  vi.setSystemTime(Date.now() + 5000)
  answer(true)
  expect(screen.getByText('⚡ 会心の一撃！')).toBeInTheDocument()
})

it('ボス戦は先制クイズなしで、すぐ問題が始まる', () => {
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
  expect(screen.queryByText(/先制クイズ/)).toBeNull()
  expect(document.querySelector('.boss-preempt')).toBeNull()
  expect(document.querySelectorAll('.choice').length).toBeGreaterThan(0)
  expect(screen.getByRole('progressbar', { name: 'ボスのHP' })).toHaveAttribute('aria-valuenow', '240')
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

it('相棒のヒントは選択肢を消さず、考え方のヒントを出す（1戦1回）', async () => {
  const { FORMS } = await import('./monster')
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} hp={500} partner={{ form: FORMS[1], name: 'あいぼう' }} />)
  const before = document.querySelectorAll('.boss .choice').length
  fireEvent.click(screen.getByTitle(/あいぼうが考え方のヒントをくれる/))
  expect(document.querySelectorAll('.boss .choice').length).toBe(before)
  expect(document.querySelector('.boss-hint-text')!.textContent).toMatch(/例文で考えよう|で始まるよ/)
  answer(true)
  fireEvent.click(screen.getByText('次へ'))
  expect(screen.queryByTitle(/あいぼうが考え方のヒントをくれる/)).toBeNull()
})

it('ラッキーコインを使うとSランクボーナスが2倍', () => {
  const bonus = vi.fn()
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} onRankBonus={bonus} bag={{ bomb: 0, charm: 0, clock: 0, lucky: 1 }} onUseItem={() => {}} />)
  fireEvent.click(screen.getByText('🎒 アイテム'))
  fireEvent.click(screen.getByText(/ラッキーコイン/))
  for (let i = 0; i < 20 && !screen.queryByText('ボスをたおした！ 🎉'); i++) {
    answer(true)
    if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByLabelText('ランク S')).toBeInTheDocument()
  expect(bonus).toHaveBeenCalledWith(20)
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

it('読解ボスは「💡 ヒント」で解説（答えはかくす）か根拠の1文が見える', () => {
  localStorage.clear()
  render(<Boss level="中1" words={wordsOf(['中1'])} reading onAnswer={() => {}} onWin={() => {}} onExit={() => {}} />)
  expect(document.querySelector('.boss-hint')).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: '💡 ヒント' }))
  expect(document.querySelector('.boss-hint')!.textContent).toMatch(/💡|📍 根拠/)
  expect(screen.queryByRole('button', { name: '💡 ヒント' })).toBeNull()
})

it('勝ったあとのランク・ハート・ボーナスは1枚の横長カード（.boss-rank-row）にまとまる', () => {
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
  for (let i = 0; i < 20 && !screen.queryByText('ボスをたおした！ 🎉'); i++) {
    answer(true)
    if (!screen.queryByText('ボスをたおした！ 🎉')) fireEvent.click(screen.getByText('次へ'))
  }
  const row = document.querySelector('.boss-rank-row')!
  expect(row.querySelector('.battle-rank')).not.toBeNull()
  expect(row.textContent).toMatch(/ボーナス \+/)
})

it('まちがえるとボスのこうげきの演出（ツメあと・メッセージ）が出て、ハートがへる', () => {
  render(<Boss level="中1" words={wordsOf(['中1'])} onWin={() => {}} onExit={() => {}} />)
  answer(false)
  expect(screen.getByText(/のこうげき！ ❤️-1/)).toBeInTheDocument()
  expect(document.querySelector('.boss-atk-fx .slash')).not.toBeNull()
  expect(document.querySelector('.boss.hurt')).not.toBeNull()
})
