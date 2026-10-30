import { fireEvent, render, screen, within } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { Gacha } from './GachaView'
import { GACHA_PRICE, PARTY_MAX } from './gacha'
import { kindOf, speciesOf } from './monster'

it('ガチャを引くとレア度と出たタマゴが表示される', () => {
  const onDraw = vi.fn(() => ({ kind: kindOf('kin'), species: speciesOf('mochi') }))
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={onDraw} />)
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  expect(onDraw).toHaveBeenCalled()
  expect(screen.getByText('スーパーレア！')).toBeInTheDocument()
  expect(screen.getByText('きんいろのふしぎなタマゴが仲間になった！')).toBeInTheDocument()
  fireEvent.click(screen.getByText('とじる'))
  expect(screen.queryByText('スーパーレア！')).toBeNull()
})

it('コインが足りないときや仲間がいっぱいのときは引けない', () => {
  const { unmount } = render(<Gacha coins={GACHA_PRICE - 1} members={1} onDraw={() => null} />)
  expect(screen.getByRole('button', { name: /ガチャを引く/ })).toHaveAttribute('aria-disabled', 'true') // 押すと首をふるだけで引けない（デザイン58）
  unmount()
  render(<Gacha coins={999} members={PARTY_MAX} onDraw={() => null} />)
  expect(screen.getByRole('button', { name: '仲間がいっぱい' })).toBeDisabled()
})

it('チケットがあるときはチケットで引ける', () => {
  const onDraw = vi.fn(() => ({ kind: kindOf('umi'), species: speciesOf('dragon') }))
  render(<Gacha coins={0} members={1} tickets={2} onDraw={onDraw} />)
  fireEvent.click(screen.getByRole('button', { name: '🎟 チケットで引く（あと2枚）' }))
  expect(onDraw).toHaveBeenCalledWith(true)
  expect(screen.getByText('レア！')).toBeInTheDocument()
  expect(screen.getByText('うみ色のほのおのタマゴが仲間になった！')).toBeInTheDocument()
  expect(screen.getByText(/「ドラコ」の仲間だ！/)).toBeInTheDocument()
})

it('ガチャには出る確率や、何が出やすいかを書かない（お楽しみ）', () => {
  localStorage.clear()
  render(<Gacha coins={0} members={1} dragonUp pickup={speciesOf('fox')} onDraw={() => null} />)
  expect(screen.queryByText('出る確率')).toBeNull()
  expect(document.body.textContent).not.toMatch(/\d+%/)
  expect(document.body.textContent).not.toContain('コンコン')
  expect(document.body.textContent).not.toContain('ドラコ')
  expect(screen.getByText(/お楽しみ/)).toBeInTheDocument()
  expect(document.querySelectorAll('.gacha-pickup .pickup-stars i')).toHaveLength(3) // ピックアップのまわりで星がまたたく
})

it('はじめてのキャラクター・色ちがいは NEW! と出る', () => {
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('umi'), species: speciesOf('cat'), newKind: true, newSpecies: true })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(screen.getByLabelText('はじめて：ニャンタ・うみ色').textContent).toBe('NEW!ニャンタうみ色')
  expect(document.querySelector('.zukan-no-flash')!.textContent).toMatch(/図鑑 No\.\d+ に登録！/) // 新しいキャラは図鑑の番号がきらっと光る
})

it('もう持っているキャラクターなら、図鑑の番号は出さない', () => {
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('umi'), species: speciesOf('cat'), newKind: true })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(document.querySelector('.zukan-no-flash')).toBeNull()
})

it('ガチャを引くと「最近のガチャ」に残る', () => {
  localStorage.clear()
  render(<Gacha coins={GACHA_PRICE * 2} members={1} onDraw={() => ({ kind: kindOf('kin'), species: speciesOf('dragon') })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(screen.getByText('最近のガチャ（1回）')).toBeInTheDocument()
  expect(document.querySelector('.gacha-log li')!.textContent).toContain('きんいろのドラコ')
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(screen.getByText('最近のガチャ（2回）')).toBeInTheDocument()
  const rows = document.querySelectorAll('.gacha-log li')
  expect(rows[0].classList.contains('log-newest')).toBe(true) // いちばん新しい行だけ光る
  expect(document.querySelectorAll('.gacha-log li.log-newest')).toHaveLength(1)
})

it('レア度で確定演出が変わる（ウルトラレアは虹色、ふつうは無し）', () => {
  const { unmount } = render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('niji'), species: speciesOf('fox') })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(screen.getByText('虹色の光！！ ウルトラレア確定！！')).toBeInTheDocument()
  expect(document.querySelector('.r-UR .gacha-burst')).not.toBeNull()
  unmount()
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('normal'), species: speciesOf('fox') })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(document.querySelector('.gacha-omen')).toBeNull()
  expect(document.querySelector('.gacha-burst')).toBeNull()
})

it('かぶったときはコインがもどったことを知らせる', () => {
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('normal'), species: speciesOf('mochi'), refund: 15 })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(screen.getByText('かぶりボーナス 🪙15！')).toBeInTheDocument()
})

it('ステップアップの残り回数と確定のお知らせ', () => {
  const { rerender } = render(<Gacha coins={0} members={1} stepLeft={2} onDraw={() => null} />)
  expect(screen.getByText('🔥 3回目でレア以上確定')).toBeInTheDocument()
  rerender(<Gacha coins={0} members={1} stepLeft={0} onDraw={() => null} />)
  expect(screen.getByText('🔥 ステップアップ！ 次の1回はレア以上確定！')).toBeInTheDocument()
})

it('ゴールデンタイムは値下げのお知らせと安い値段が出る', () => {
  render(<Gacha coins={40} members={1} price={40} onDraw={() => null} />)
  expect(screen.getByText(/ゴールデンタイム！/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '🎰 ガチャを引く 🪙40' })).toBeEnabled()
})

it('3連ガチャは3つの結果が並び、いちばんレアな確定演出が出る', () => {
  localStorage.clear()
  const list = [
    { kind: kindOf('normal'), species: speciesOf('fox') },
    { kind: kindOf('kin'), species: speciesOf('cat'), newKind: true },
    { kind: kindOf('umi'), species: speciesOf('mochi'), refund: 15 },
  ]
  const multi = vi.fn(() => list)
  render(<Gacha coins={GACHA_PRICE * 3} members={1} onDraw={() => null} onDrawMulti={multi} />)
  fireEvent.click(screen.getByRole('button', { name: /3連ガチャ/ }))
  expect(multi).toHaveBeenCalledWith(3)
  expect(document.querySelectorAll('.gacha-multi li')).toHaveLength(3)
  expect(screen.getByText('金色の光…！？ スーパーレア確定！')).toBeInTheDocument()
  expect(screen.getByText('最近のガチャ（3回）')).toBeInTheDocument()
})

it('3連ガチャはコインか仲間の空きが足りないと押せない', () => {
  const { rerender } = render(<Gacha coins={GACHA_PRICE * 2} members={1} onDraw={() => null} onDrawMulti={() => []} />)
  expect(screen.getByRole('button', { name: /3連ガチャ/ })).toHaveAttribute('aria-disabled', 'true') // コイン不足は押すと首をふるだけ（デザイン59）
  rerender(<Gacha coins={GACHA_PRICE * 3} members={PARTY_MAX - 2} onDraw={() => null} onDrawMulti={() => []} />)
  expect(screen.getByRole('button', { name: /3連ガチャ/ })).toBeDisabled()
})

it('おまけカプセルが出たら表示する', () => {
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('normal'), species: speciesOf('fox'), bonus: '🪙10' })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(screen.getByText('🎁 おまけカプセル！ 🪙10')).toBeInTheDocument()
})

it('カプセルの色を選ぶと保存される', () => {
  localStorage.clear()
  render(<Gacha coins={100} members={1} onDraw={() => null} />)
  fireEvent.click(screen.getByLabelText('カプセル みどり'))
  expect(screen.getByLabelText('カプセル みどり')).toHaveAttribute('aria-pressed', 'true')
  expect(localStorage.getItem('eitan:capsule-color')).toBe('green')
})

it('演出を短くする設定が保存される', () => {
  localStorage.clear()
  render(<Gacha coins={100} members={1} onDraw={() => null} />)
  fireEvent.click(screen.getByLabelText(/演出を短くする/))
  expect(localStorage.getItem('eitan:gacha-fast')).toBe('1')
})

it('その日はじめてのガチャは「きょうの1回目」でキラキラ。2回目は出ない', () => {
  localStorage.clear()
  const onDraw = vi.fn(() => ({ kind: kindOf('normal'), species: speciesOf('mochi') }))
  render(<Gacha coins={GACHA_PRICE * 2} members={1} onDraw={onDraw} />)
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  expect(screen.getByText('✨ きょうの1回目！キラキラカプセル ✨')).toBeInTheDocument()
  expect(document.querySelector('.gacha-result.first-pull')).not.toBeNull()
  expect(document.querySelectorAll('.gacha-result .first-stars i')).toHaveLength(5) // まわりで星がまたたく
  expect((document.querySelector('.gacha-egg.sp-glow') as HTMLElement).style.getPropertyValue('--sp-glow')).toBe('#86efac') // モチは緑の光
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  expect(screen.queryByText(/きょうの1回目/)).toBeNull()
})

it('ガチャの結果から「もう1回ひく」で続けて引ける（コインがなければチケット）', () => {
  localStorage.clear()
  const onDraw = vi.fn(() => ({ kind: kindOf('normal'), species: speciesOf('mochi') }))
  const { rerender } = render(<Gacha coins={GACHA_PRICE * 2} members={1} onDraw={onDraw} />)
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  fireEvent.click(screen.getByRole('button', { name: `🔁 もう1回ひく（🪙${GACHA_PRICE}）` }))
  expect(onDraw).toHaveBeenLastCalledWith(false)
  rerender(<Gacha coins={0} tickets={1} members={1} onDraw={onDraw} />)
  fireEvent.click(screen.getByRole('button', { name: '🔁 もう1回ひく（🎟1）' }))
  expect(onDraw).toHaveBeenLastCalledWith(true)
  rerender(<Gacha coins={0} tickets={0} members={1} onDraw={onDraw} />)
  expect(screen.queryByText(/もう1回ひく/)).toBeNull()
})

it('スーパーレア確定までのゲージが出る', async () => {
  const { PITY } = await import('./gacha')
  render(<Gacha coins={0} members={1} onDraw={() => null} pityLeft={5} />)
  expect(screen.getByRole('meter', { name: 'スーパーレア確定までのゲージ' })).toHaveAttribute('aria-valuenow', String(PITY - 5))
})

it('同じキャラの2体目以上はガチャ結果に「○体目」が出る', () => {
  localStorage.clear()
  const onDraw = vi.fn(() => ({ kind: kindOf('normal'), species: speciesOf('mochi'), nth: 3 }))
  render(<Gacha coins={GACHA_PRICE} members={3} onDraw={onDraw} />)
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  expect(screen.getByText(`👥 ${speciesOf('mochi').name} 3体目`)).toBeInTheDocument()
})

it('レア以上が出ると相棒がよろこぶ（ふつうの色では出ない）', () => {
  localStorage.clear()
  let k = 'kin'
  const onDraw = vi.fn(() => ({ kind: kindOf(k), species: speciesOf('mochi') }))
  render(<Gacha coins={GACHA_PRICE * 2} members={1} onDraw={onDraw} partnerName="モチ" />)
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  expect(screen.getByText(/🐣 モチ「すごい！ スーパーレアだ！」/)).toBeInTheDocument()
  k = 'normal'
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  expect(screen.queryByText(/🐣 モチ「/)).toBeNull()
})

it('ガチャの結果に「属性：単語」が出る（単語の相棒のわくにおける）', () => {
  localStorage.clear()
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('umi'), species: speciesOf('cat'), newKind: false, newSpecies: false })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(screen.getByText('属性：単語')).toBeInTheDocument()
})

it('ガチャで出た子が英語であいさつ（🔊を押したときだけ読む）', async () => {
  const { helloLine } = await import('./gacha')
  const sp = vi.spyOn(await import('./speech'), 'speak').mockImplementation(() => {})
  const onDraw = vi.fn(() => ({ kind: kindOf('kin'), species: speciesOf('mochi') }))
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={onDraw} />)
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  expect(screen.getByText(new RegExp(helloLine('mochi').en.replace(/[!?]/g, '.')))).toBeInTheDocument()
  expect(sp).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: 'あいさつを聞く' }))
  expect(sp).toHaveBeenCalledWith(helloLine('mochi').en)
})

it('ガチャで出た子に、その場で名前をつけられる', () => {
  const onNameNew = vi.fn()
  const onDraw = vi.fn(() => ({ kind: kindOf('kin'), species: speciesOf('mochi') }))
  render(<Gacha coins={GACHA_PRICE * 2} members={1} onDraw={onDraw} onNameNew={onNameNew} />)
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  fireEvent.click(screen.getByRole('button', { name: '✏️ 名前をつける' }))
  fireEvent.change(screen.getByLabelText('出た子の名前'), { target: { value: 'ピカ' } })
  fireEvent.click(screen.getByRole('button', { name: '決定' }))
  expect(onNameNew).toHaveBeenCalledWith('ピカ')
  expect(screen.getByText('🏷 「ピカ」と名前をつけたよ！')).toBeInTheDocument()
})

it('シール帳とガチャポイントは数をピルで短く出す', () => {
  localStorage.clear()
  render(<Gacha coins={0} members={1} stickers={['⚽']} points={5} pityLeft={12} onDraw={() => null} />)
  expect(screen.getByLabelText(/まい中 1まい/).textContent).toMatch(/^1\/\d+$/)
  expect(screen.getByLabelText(/ポイントでSR以上と交換/).textContent).toMatch(/^5\/\d+$/)
  expect(screen.getByText('✨ あと12回でSR以上確定')).toBeInTheDocument()
})

it('ガチャ結果の種類の説明はたたんであり、押すと読める', () => {
  localStorage.clear()
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('kin'), species: speciesOf('dragon') })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  const d = screen.getByText(/「ドラコ」の仲間だ！/).closest('details')!
  expect(d.open).toBe(false)
  expect(d.textContent).toContain(speciesOf('dragon').desc)
})

it('ガチャの補足チップは「ℹ️ ガチャのひみつ」にたたんである', () => {
  localStorage.clear()
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => null} />)
  const d = document.querySelector<HTMLDetailsElement>('details.gacha-info')!
  expect(d.open).toBe(false)
  expect(d.textContent).toContain('7日連続で1枚')
})

it('ガチャのページに「なかま10体 → 🎟1まい」の交換カードがあり、10体そろうと交換できる', () => {
  const trade = vi.fn()
  const { rerender } = render(<Gacha coins={0} members={5} onDraw={() => null} tradeCount={4} onTrade={trade} />)
  expect(screen.getByText(/なかま10体 → 🎟1まい/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'あと6体' })).toBeDisabled()
  rerender(<Gacha coins={0} members={12} onDraw={() => null} tradeCount={11} onTrade={trade} />)
  fireEvent.click(screen.getByRole('button', { name: '🎟 交換する' }))
  expect(trade).toHaveBeenCalled()
  expect(PARTY_MAX).toBe(500)
})

it('ガチャを引くと画面いっぱいの演出ページが開き、スキップで出てきた子を見られる', () => {
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('kin'), species: speciesOf('fox'), newSpecies: true })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  const dlg = screen.getByRole('dialog', { name: 'ガチャの演出' })
  fireEvent.click(within(dlg).getByRole('button', { name: /スキップ/ }))
  expect(within(dlg).getByText('SUPER RARE')).toBeInTheDocument()
  fireEvent.click(within(dlg).getByRole('button', { name: /やったね！ とじる/ }))
  expect(screen.queryByRole('dialog', { name: 'ガチャの演出' })).toBeNull()
})

it('制覇した城があれば、ガチャに城のボーナス（レアの出やすさ +n%）を表示', () => {
  render(<Gacha coins={GACHA_PRICE} members={1} castles={3} onDraw={() => null} />)
  expect(screen.getByLabelText('城のボーナス')).toHaveTextContent('+3%')
})

it('ガチャのタマゴは、出たキャラクターの色で光る', () => {
  localStorage.clear()
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('normal'), species: speciesOf('fox') })} />)
  fireEvent.click(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` }))
  expect((document.querySelector('.gacha-egg.sp-glow') as HTMLElement).style.getPropertyValue('--sp-glow')).toBe(speciesOf('fox').color)
})

it('図鑑：まだ会っていないキャラのシルエットはゆっくりゆれる（CSS）', async () => {
  const { readFileSync } = await import('node:fs')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.char-book-list li\.locked svg \{ animation: locked-sway/)
})

it('ガチャ：出てきたタマゴがぷるぷるふるえる（CSS。光の span とは別に中の絵を動かす）', async () => {
  const { readFileSync } = await import('node:fs')
  const css = readFileSync('src/polish.css', 'utf8')
  expect(css).toMatch(/\.gacha-result \.gacha-egg svg \{ transform-origin: 50% 85%; animation: egg-tremble/)
  expect(css).toMatch(/@keyframes egg-tremble/)
})

it('ガチャ：NEW! の札がぴょこっと左右にゆれる（CSS）', async () => {
  const { readFileSync } = await import('node:fs')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.gacha-new-chips > span\.gacha-new \{ display: inline-block; animation: new-wiggle/)
})

it('ガチャのまとめ引き：SR・UR のカードだけふちが虹色に光る（CSS）', async () => {
  const { readFileSync } = await import('node:fs')
  const css = readFileSync('src/polish.css', 'utf8')
  expect(css).toMatch(/\.gacha-multi li\.r-SR, \.gacha-multi li\.r-UR \{ animation: multi-card-in 0\.6s ease-out both, rare-rim/)
  expect(css).toMatch(/\.gacha-multi li \{ animation-name: multi-card-in; \}/) // 1枚ずつくるっと出てくる
  expect(css).toMatch(/@keyframes rare-rim/)
})

it('ガチャ：ボタンを押すとぷるんとゆれる（CSS。押せないときはゆれない）', async () => {
  const { readFileSync } = await import('node:fs')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/\.gacha-btn:not\(:disabled\):not\(\.short\):active \{ animation: gacha-jiggle/)
})

it('ガチャ：かぶりでコインがもどった文字は、ちゃりんとはねる（CSS）', async () => {
  const { readFileSync } = await import('node:fs')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/p\.gacha-dup \{ animation: dup-bounce/)
})

it('ガチャ：UR が出たときだけ、画面のふちが一瞬虹色に光る（CSS）', async () => {
  const { readFileSync } = await import('node:fs')
  const css = readFileSync('src/polish.css', 'utf8')
  expect(css).toMatch(/\.gacha-result\.r-UR::before \{[^}]*animation: ur-edge/)
  expect(css).not.toMatch(/\.gacha-result\.r-SR::before/)
})

it('デザイン58：コインがたりないときにガチャを押すと、ボタンが首をふって、あといくつたりないかを出す', () => {
  const onDraw = vi.fn(() => ({ kind: kindOf('kin'), species: speciesOf('mochi') }))
  render(<Gacha coins={GACHA_PRICE - 5} members={1} onDraw={onDraw} />)
  const btn = screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` })
  expect(btn).toHaveAttribute('aria-disabled', 'true')
  fireEvent.click(btn)
  expect(onDraw).not.toHaveBeenCalled()
  expect(screen.getByRole('button', { name: `🎰 ガチャを引く 🪙${GACHA_PRICE}` })).toHaveClass('gacha-shake')
  expect(screen.getByText(/コインがあと 5 たりない/)).toBeInTheDocument()
})

it('デザイン59：コインがたりないときに3連・5連ガチャを押すと、そのボタンが首をふる', () => {
  const onDrawMulti = vi.fn(() => [])
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => null} onDrawMulti={onDrawMulti} />)
  const b5 = screen.getByRole('button', { name: /5連ガチャ/ })
  expect(b5).toHaveAttribute('aria-disabled', 'true')
  fireEvent.click(b5)
  expect(onDrawMulti).not.toHaveBeenCalled()
  expect(screen.getByRole('button', { name: /5連ガチャ/ })).toHaveClass('gacha-shake')
  expect(screen.getByRole('button', { name: /3連ガチャ/ })).not.toHaveClass('gacha-shake')
  expect(screen.getByText(/5連ガチャにはコインがあと/)).toBeInTheDocument()
})

it('デザイン60：コインがたりないときにキャラガチャを押すと、ボタンが首をふる', async () => {
  const { CHARA_PRICE } = await import('./gacha')
  const onChara = vi.fn(() => null)
  render(<Gacha coins={CHARA_PRICE - 10} members={2} onDraw={() => null} ownedSpecies={['mochi']} onChara={onChara} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  fireEvent.click(screen.getByRole('button', { name: `🐣 キャラガチャを引く 🪙${CHARA_PRICE}` }))
  expect(onChara).not.toHaveBeenCalled()
  expect(screen.getByRole('button', { name: `🐣 キャラガチャを引く 🪙${CHARA_PRICE}` })).toHaveClass('gacha-shake')
  expect(screen.getByText('🪙 キャラガチャにはコインがあと 10 たりないよ')).toBeInTheDocument()
})

it('デザイン61：キャラガチャで新しいキャラが出ると、図鑑のそのキャラが光ってうまる', async () => {
  const { CHARA_PRICE } = await import('./gacha')
  const { useState } = await import('react')
  const { SPECIES } = await import('./monster')
  const turtle = SPECIES.find((s) => s.id === 'turtle')!
  function Wrap() {
    const [owned, setOwned] = useState(['mochi'])
    return <Gacha coins={CHARA_PRICE} members={2} onDraw={() => null} ownedSpecies={owned} onChara={() => (setOwned([...owned, 'turtle']), { kind: kindOf('normal'), species: turtle })} />
  }
  render(<Wrap />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  fireEvent.click(screen.getByRole('button', { name: `🐣 キャラガチャを引く 🪙${CHARA_PRICE}` }))
  const item = screen.getByRole('button', { name: new RegExp(`^${turtle.name}（`) }).closest('li')!
  expect(item).toHaveClass('got')
  expect(item).toHaveClass('fresh')
})

it('デザイン62：キャラ図鑑ののこりが5体以下になると「あと○体！」が出る', async () => {
  const { SPECIES } = await import('./monster')
  const all = SPECIES.map((s) => s.id)
  const { unmount } = render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={all.slice(0, all.length - 3)} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  expect(screen.getByText('あと3体！')).toBeInTheDocument()
  unmount()
  render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={['mochi']} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  expect(screen.queryByText(/^あと\d+体！$/)).not.toBeInTheDocument()
})

it('デザイン64：キャラ図鑑をぜんぶうめると「👑 コンプリート！」のバッジが出る', async () => {
  const { SPECIES } = await import('./monster')
  render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={SPECIES.map((s) => s.id)} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  expect(screen.getByText('👑 コンプリート！')).toBeInTheDocument()
  expect(screen.queryByText(/^あと\d+体！$/)).not.toBeInTheDocument()
})

it('デザイン66：キャラ図鑑で「まだ会っていない子だけ見る」にすると、会えた子がかくれる', async () => {
  const { SPECIES } = await import('./monster')
  render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={['mochi', 'turtle']} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  const turtle = SPECIES.find((s) => s.id === 'turtle')!
  expect(screen.getByRole('button', { name: new RegExp(`^${turtle.name}（`) })).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: '❓ まだ会っていない子だけ見る' }))
  expect(screen.queryByRole('button', { name: new RegExp(`^${turtle.name}（`) })).not.toBeInTheDocument()
  expect(screen.getAllByRole('button', { name: 'まだ会っていないキャラクター' })).toHaveLength(SPECIES.length - 2)
})

it('デザイン67：キャラガチャのラインナップで、まだ会っていない子をタップすると生まれるタマゴのヒントが出る', async () => {
  const { SPECIES } = await import('./monster')
  render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={['mochi']} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  const lineup = screen.getByRole('list', { name: '出てくるキャラクター' })
  fireEvent.click(within(lineup).getAllByRole('button', { name: 'まだ会っていないキャラクターのヒント' })[0])
  const first = SPECIES.find((s) => s.id !== 'mochi')!
  expect(screen.getByText(new RegExp(`${first.egg}から生まれるらしい`))).toBeInTheDocument()
})

it('デザイン68：キャラガチャのラインナップは左から順にはねる（順番の --i がつく・動きをへらす設定では止まる）', async () => {
  const { readFileSync } = await import('node:fs')
  render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={['mochi']} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  const items = within(screen.getByRole('list', { name: '出てくるキャラクター' })).getAllByRole('listitem')
  expect(items[0].style.getPropertyValue('--i')).toBe('0')
  expect(items[2].style.getPropertyValue('--i')).toBe('2')
  expect(readFileSync('src/polish.css', 'utf8')).toMatch(/prefers-reduced-motion: reduce\) \{ \.chara-gacha-lineup li \{ animation: none; \} \}/)
})

it('デザイン70：キャラ図鑑で会えた子をえらぶと、その子の「今日のチャレンジ」の問題の種類も出る', async () => {
  const { SPECIES } = await import('./monster')
  const { challengeOf } = await import('./challenge')
  render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={['mochi', 'fox']} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  const fox = SPECIES.find((s) => s.id === 'fox')!
  fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${fox.name}（`) }))
  expect(screen.getByText(`（今日のチャレンジ：${challengeOf('fox').icon} ${challengeOf('fox').label}）`)).toBeInTheDocument()
})

it('デザイン95：キャラ図鑑で会えた子をえらぶと、その子のとくぎ名も出る', async () => {
  const { SPECIES } = await import('./monster')
  const { skillOf } = await import('./partner')
  render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={['mochi', 'fox']} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  const fox = SPECIES.find((s) => s.id === 'fox')!
  fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${fox.name}（`) }))
  expect(screen.getByText(`（とくぎ：${skillOf('fox').name}）`)).toBeInTheDocument()
})

it('デザイン95：まだ会っていない子をえらんでも、とくぎ名は出さない', async () => {
  const { SPECIES } = await import('./monster')
  render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={['mochi']} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  const lineup = screen.getByRole('list', { name: '出てくるキャラクター' })
  fireEvent.click(within(lineup).getAllByRole('button', { name: 'まだ会っていないキャラクターのヒント' })[0])
  const first = SPECIES.find((s) => s.id !== 'mochi')!
  expect(screen.getByText(new RegExp(`${first.egg}から生まれるらしい`))).toBeInTheDocument()
  expect(screen.queryByText(/（とくぎ：/)).toBeNull()
})

it('デザイン97：キャラ図鑑で会えた子をえらぶと、その子の必殺技の名前も出る', async () => {
  const { SPECIES } = await import('./monster')
  const { specialOf } = await import('./partner')
  render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={['mochi', 'fox']} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  const fox = SPECIES.find((s) => s.id === 'fox')!
  fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${fox.name}（`) }))
  expect(screen.getByText(`（必殺技：${specialOf('fox').name}）`)).toBeInTheDocument()
})

it('デザイン99：キャラ図鑑で会えた子をえらぶと、その子のあいさつ（英語と日本語）も出る', async () => {
  const { SPECIES } = await import('./monster')
  const { replyOf } = await import('./partner')
  render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={['mochi', 'fox']} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  const fox = SPECIES.find((s) => s.id === 'fox')!
  fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${fox.name}（`) }))
  expect(screen.getByText(`「${replyOf('fox').en}」`)).toBeInTheDocument()
  expect(screen.getByText(`（${replyOf('fox').ja}）`)).toBeInTheDocument()
})

it('デザイン100：キャラ図鑑のあいさつは🔊を押したときだけ英語で読み上げる', async () => {
  const { SPECIES } = await import('./monster')
  const { replyOf } = await import('./partner')
  const sp = vi.spyOn(await import('./speech'), 'speak').mockImplementation(() => {})
  render(<Gacha coins={0} members={2} onDraw={() => null} ownedSpecies={['mochi', 'fox']} onChara={() => null} />)
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  const fox = SPECIES.find((s) => s.id === 'fox')!
  fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${fox.name}（`) }))
  expect(sp).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: '図鑑のあいさつを聞く' }))
  expect(sp).toHaveBeenCalledWith(replyOf('fox').en)
  sp.mockRestore()
})
