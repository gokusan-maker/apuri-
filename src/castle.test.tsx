import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { castleNow, castleShown } from './castle'
import { Castle } from './CastleView'

it('城の塔：いまの階はクリアしていない最初の階。見せるのはクリアした2階・いまの階・カギつきの次の1階', () => {
  expect(castleNow([{ cleared: true }, { cleared: false }, { cleared: false }])).toBe(1)
  expect(castleNow([{ cleared: true }])).toBe(1)
  expect(castleShown(10, 4)).toEqual([5, 4, 3, 2])
  expect(castleShown(10, 0)).toEqual([1, 0])
})

it('城の塔：いまの階に「いまここ」、おすと開く。全部クリアで「てっぺん制覇」', () => {
  const open = vi.fn()
  const floors = ['a', 'b', 'c'].map((id, i) => ({ id, label: `階${id}`, cleared: i < 1 }))
  const r = render(<Castle name="文法の城" floors={floors} onOpen={open} />)
  expect(screen.getByRole('region', { name: '文法の城' })).toBeInTheDocument()
  expect(screen.getByText('いまここ')).toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: '2階：階b' }))
  expect(open).toHaveBeenCalledWith('b')
  r.unmount()
  render(<Castle name="文法の城" floors={floors.map((f) => ({ ...f, cleared: true }))} onOpen={open} />)
  expect(screen.getByText(/てっぺん制覇/)).toBeInTheDocument()
})

it('10階ごとに宝箱：クリアしたらあけられて🪙20、1回だけ', async () => {
  const { openableChests, CHEST_COINS } = await import('./castle')
  expect(openableChests(9, [])).toEqual([])
  expect(openableChests(23, [10])).toEqual([20])
  localStorage.removeItem('eitan:castle-chests')
  const got = vi.fn()
  const floors = Array.from({ length: 15 }, (_, i) => ({ id: `f${i}`, label: `階${i}`, cleared: i < 12 }))
  const r = render(<Castle name="単語の城" floors={floors} onOpen={() => {}} onChest={got} />)
  fireEvent.click(screen.getByRole('button', { name: /10階の宝箱をあける/ }))
  expect(got).toHaveBeenCalledWith(CHEST_COINS)
  expect(screen.getByText(/10階の宝箱から/)).toBeInTheDocument()
  r.unmount()
  render(<Castle name="単語の城" floors={floors} onOpen={() => {}} onChest={got} />)
  expect(screen.queryByRole('button', { name: /宝箱をあける/ })).toBeNull()
  localStorage.removeItem('eitan:castle-chests')
})

it('節目の階（10階ごと・てっぺん）の宝箱からレアの卵', async () => {
  const { openableChests, isMilestone, RareEggContext } = await import('./castle')
  const { Castle } = await import('./CastleView')
  const { render, screen, fireEvent } = await import('@testing-library/react')
  expect(isMilestone(10, 23)).toBe(true)
  expect(isMilestone(23, 23)).toBe(true)
  expect(isMilestone(7, 23)).toBe(false)
  expect(openableChests(4, [], 4)).toEqual([4]) // 4階の城は、てっぺんで宝箱
  localStorage.clear()
  const floors = Array.from({ length: 4 }, (_, i) => ({ id: `f${i}`, label: `階${i}`, cleared: true }))
  render(
    <RareEggContext.Provider value={() => '金色のタマゴ'}>
      <Castle name="テスト城" floors={floors} onOpen={() => {}} onChest={() => {}} />
    </RareEggContext.Provider>,
  )
  fireEvent.click(screen.getByText(/4階の宝箱をあける（🪙20＋🥚レアの卵）/))
  expect(screen.getByRole('status').textContent).toContain('🥚金色のタマゴ')
})
