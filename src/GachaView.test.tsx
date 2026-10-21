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

it('出る確率が見られる（合計100%）', () => {
  render(<Gacha coins={0} members={1} onDraw={() => null} />)
  expect(screen.getByText('出る確率')).toBeInTheDocument()
  const pct = [...document.querySelectorAll('.gacha-rates li')].map((li) => {
    const n = Number(li.textContent!.match(/(\d+)%/)![1])
    return li.textContent!.includes('キャラクター') ? 0 : li.textContent!.includes('各') ? n * 3 : n
  })
  expect(pct.reduce((a, b) => a + b, 0)).toBe(100)
})

it('週末はドラコ出現アップのお知らせが出る', () => {
  render(<Gacha coins={0} members={1} dragonUp onDraw={() => null} />)
  expect(screen.getByText(/週末はドラコが出やすい/)).toBeInTheDocument()
})

it('はじめてのキャラクター・色ちがいは NEW! と出る', () => {
  render(<Gacha coins={GACHA_PRICE} members={1} onDraw={() => ({ kind: kindOf('umi'), species: speciesOf('cat'), newKind: true, newSpecies: true })} />)
  fireEvent.click(screen.getByRole('button', { name: /ガチャを引く/ }))
  expect(screen.getByText('NEW! はじめての「ニャンタ」・はじめての「うみ色」')).toBeInTheDocument()
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

it('今日のピックアップが表示される', () => {
  render(<Gacha coins={0} members={1} pickup={speciesOf('fox')} onDraw={() => null} />)
  expect(screen.getByText('🎯 今日のピックアップ')).toBeInTheDocument()
  expect(screen.getByText(/「コンコン」が出やすい！（16% → 24%）/)).toBeInTheDocument()
})

it('ステップアップの残り回数と確定のお知らせ', () => {
  const { rerender } = render(<Gacha coins={0} members={1} stepLeft={2} onDraw={() => null} />)
  expect(screen.getByText('🔥 ステップアップ：あと2回で、その次がレア以上確定')).toBeInTheDocument()
  rerender(<Gacha coins={0} members={1} stepLeft={0} onDraw={() => null} />)
  expect(screen.getByText('🔥 ステップアップ！ 次の1回はレア以上確定！')).toBeInTheDocument()
})
