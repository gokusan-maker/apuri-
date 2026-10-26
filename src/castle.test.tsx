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

it('ステージの地図（海・森・山）：いまのステージと前後だけ見え、キャラが前にいたステージから歩いてくる', async () => {
  const { mapShown, mapX, saveWalk, loadWalk, WalkerContext } = await import('./castle')
  const { Castle } = await import('./CastleView')
  const { render, screen } = await import('@testing-library/react')
  expect(mapShown(10, 0)).toEqual([0, 1, 2, 3])
  expect(mapShown(10, 5)).toEqual([4, 5, 6, 7])
  expect(mapShown(10, 10)).toEqual([6, 7, 8, 9])
  expect(mapX(0)).not.toBe(mapX(1))
  localStorage.clear()
  saveWalk('テストの海', 1)
  const floors = Array.from({ length: 6 }, (_, i) => ({ id: `f${i}`, label: `ステージ${i}`, cleared: i < 3 }))
  const { container } = render(
    <WalkerContext.Provider value={{ sea: <b>キャラ</b> }}>
      <Castle name="テストの海" theme="sea" floors={floors} onOpen={() => {}} />
    </WalkerContext.Provider>,
  )
  expect(screen.getByRole('region', { name: 'テストの海' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '4階：ステージ3' })).toBeInTheDocument()
  expect(container.querySelector('.smap-walker.walking')).not.toBeNull() // ステージ2から4へ歩く
  expect(loadWalk('テストの海')).toBe(3)
})
it('階クリアのなかまのひとことは、階ごとに順に変わる', async () => {
  const { floorCheer, FLOOR_CHEERS } = await import('./castle')
  expect(floorCheer(0)).toBe(FLOOR_CHEERS[0])
  expect(floorCheer(1)).not.toBe(floorCheer(0))
  expect(floorCheer(FLOOR_CHEERS.length)).toBe(FLOOR_CHEERS[0])
})

it('地図の宝箱：てっぺんと30階ごとの宝箱にはガチャチケットが入っている', async () => {
  const { chestHasTicket } = await import('./castle')
  expect(chestHasTicket(10, 75)).toBe(false)
  expect(chestHasTicket(30, 75)).toBe(true)
  expect(chestHasTicket(75, 75)).toBe(true)
})

it('地図の道はまん中をさけ、いまのステージの札は広い側に入る（はみ出さない）', async () => {
  const { mapX, mapRoom } = await import('./castle')
  for (let i = 0; i < 8; i++) {
    expect(Math.abs(mapX(i) - 50)).toBeGreaterThanOrEqual(12)
    expect(mapRoom(mapX(i))).toBeGreaterThanOrEqual(62)
  }
  expect(mapRoom(20)).toBe(80)
  expect(mapRoom(80)).toBe(80)
})

it('次の宝箱まで、あといくつかを数える（10ごとと、てっぺん）', async () => {
  const { nextChestIn } = await import('./castle')
  expect(nextChestIn(0, 25)).toBe(10)
  expect(nextChestIn(9, 25)).toBe(1)
  expect(nextChestIn(10, 25)).toBe(10)
  expect(nextChestIn(21, 25)).toBe(4)
  expect(nextChestIn(25, 25)).toBeNull()
})

it('地図の下に「次の宝箱まで あとnステージ」が出る', () => {
  const floors = Array.from({ length: 12 }, (_, i) => ({ id: `m${i}`, label: `S${i}`, cleared: i < 3 }))
  render(<Castle name="テストの海" floors={floors} onOpen={() => {}} theme="sea" />)
  expect(screen.getByLabelText('次の宝箱まで').textContent).toContain('あと7ステージ')
})

it('いまのステージが宝箱のステージなら、すすむの札に「クリアで宝箱！」が出る', () => {
  const floors = Array.from({ length: 12 }, (_, i) => ({ id: `q${i}`, label: `S${i}`, cleared: i < 9 }))
  const { unmount } = render(<Castle name="宝の海" floors={floors} onOpen={() => {}} theme="sea" />)
  expect(screen.getByText('🎁 クリアで宝箱！')).toBeInTheDocument()
  unmount()
  const f2 = floors.map((f, i) => ({ ...f, cleared: i < 4 }))
  render(<Castle name="宝の海2" floors={f2} onOpen={() => {}} theme="sea" />)
  expect(screen.queryByText('🎁 クリアで宝箱！')).toBeNull()
})

it('階クリアのお祝いに、宝箱があけられることや次の宝箱までの階の数が出る', async () => {
  const { FloorClear } = await import('./FloorClearView')
  const { unmount } = render(<FloorClear next="B" floor={9} total={25} />)
  expect(screen.getByText(/宝箱がひらけるよ/)).toBeInTheDocument()
  unmount()
  render(<FloorClear next="C" floor={2} total={25} />)
  expect(screen.getByText('🎁 次の宝箱まで あと7階')).toBeInTheDocument()
})

it('城の塔（宝箱あり）にも「次の宝箱まで あとn階」が出る', () => {
  const floors = Array.from({ length: 12 }, (_, i) => ({ id: `t${i}`, label: `F${i}`, cleared: i < 2 }))
  render(<Castle name="テストの城" floors={floors} onOpen={() => {}} onChest={() => {}} />)
  expect(screen.getByLabelText('次の宝箱まで').textContent).toContain('あと8階')
})
