import { fireEvent, render, screen } from '@testing-library/react'
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
  expect(screen.getByRole('button', { name: /ガチャを引く/ })).toBeDisabled()
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
})

it('はじめてのキャラクター・色ちがいは NEW! と出る', () => {
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('umi'), species: speciesOf('cat'), newKind: true, newSpecies: true })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(screen.getByLabelText('はじめて：ニャンタ・うみ色').textContent).toBe('NEW!ニャンタうみ色')
})

it('ガチャを引くと「最近のガチャ」に残る', () => {
  localStorage.clear()
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('kin'), species: speciesOf('dragon') })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(screen.getByText('最近のガチャ（1回）')).toBeInTheDocument()
  expect(document.querySelector('.gacha-log li')!.textContent).toContain('きんいろのドラコ')
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
  expect(screen.getByText('かぶりボーナス！ 同じ子がいたので 🪙15 もどってきた')).toBeInTheDocument()
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
  expect(screen.getByRole('button', { name: /3連ガチャ/ })).toBeDisabled()
  rerender(<Gacha coins={GACHA_PRICE * 3} members={10} onDraw={() => null} onDrawMulti={() => []} />)
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
