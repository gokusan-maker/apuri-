import { expect, it } from 'vitest'
import { MAP_ZONES, stageIcon, zoneIndex, zoneRange, ZONES_PER_MAP } from './mapzone'

it('地図は5つのゾーンに分かれ、ステージを進むと景色が変わる（最初は0、最後は4）', () => {
  for (const t of ['sea', 'forest', 'mountain'] as const) {
    expect(MAP_ZONES[t]).toHaveLength(ZONES_PER_MAP)
    expect(new Set(MAP_ZONES[t].map((z) => z.name)).size).toBe(ZONES_PER_MAP)
  }
  expect(zoneIndex(0, 50)).toBe(0)
  expect(zoneIndex(10, 50)).toBe(1)
  expect(zoneIndex(49, 50)).toBe(4)
  expect(zoneIndex(0, 1)).toBe(0)
  expect(zoneIndex(2, 3)).toBe(3) // ステージが少ない地図でもゾーンは前に進む
  expect(zoneRange(1, 50)).toEqual([11, 20])
})

it('ステージの目印はステージごとに変わる', () => {
  expect(stageIcon('sea', 0, 50)).not.toBe(stageIcon('sea', 1, 50))
  expect(stageIcon('sea', 45, 50)).toBe(MAP_ZONES.sea[4].node[45 % 4])
})

it('前に開いたときより先のゾーンに入ったら「新しいゾーンに到着！」が出る（同じゾーンなら出ない）', async () => {
  const { render, screen, cleanup } = await import('@testing-library/react')
  const { StageMap } = await import('./StageMapView')
  const floors = (now: number) => Array.from({ length: 50 }, (_, i) => ({ id: 'f' + i, label: 'S' + i, cleared: i < now }))
  localStorage.clear()
  localStorage.setItem('eitan:map-walk', JSON.stringify({ テスト: 8 }))
  const coins: number[] = []
  render(<StageMap name="テスト" theme="sea" floors={floors(11)} onOpen={() => {}} onChest={(n) => coins.push(n)} />)
  expect(screen.getByRole('status').textContent).toContain('新しいゾーン「さんごの浅瀬」に到着！ 🪙10')
  expect(screen.getByRole('status').textContent).toContain('🤿 を持って進もう！') // さんご礁はシュノーケル
  expect(coins).toEqual([10]) // 到着ボーナスは1回だけ
  cleanup()
  render(<StageMap name="テスト" theme="sea" floors={floors(12)} onOpen={() => {}} onChest={(n) => coins.push(n)} />)
  expect(screen.queryByText(/新しいゾーン/)).toBeNull()
  expect(coins).toEqual([10])
})

it('地図の見出しに5つのゾーンのどこまで来たかの点', async () => {
  const { render, screen } = await import('@testing-library/react')
  const { StageMap } = await import('./StageMapView')
  localStorage.clear()
  render(<StageMap name="点" theme="forest" floors={Array.from({ length: 50 }, (_, i) => ({ id: 'f' + i, label: 'S' + i, cleared: i < 25 }))} onOpen={() => {}} />)
  const dots = screen.getByLabelText('ゾーン 3 / 5')
  expect(dots.querySelectorAll('i.done')).toHaveLength(2)
  expect(dots.querySelectorAll('i.now')).toHaveLength(1)
})

it('地図を全部制覇すると、5つのゾーンの印がならぶ', async () => {
  const { render, screen } = await import('@testing-library/react')
  const { StageMap } = await import('./StageMapView')
  const { MAP_ZONES } = await import('./mapzone')
  localStorage.clear()
  render(<StageMap name="全部" theme="mountain" floors={Array.from({ length: 10 }, (_, i) => ({ id: 'f' + i, label: 'S' + i, cleared: true }))} onOpen={() => {}} />)
  expect(screen.getByLabelText('制覇したゾーン').textContent).toBe(MAP_ZONES.mountain.map((z) => z.icon).join(''))
})

it('ゾーンの札に、そのゾーンの何ステージ目かが出る', async () => {
  const { render } = await import('@testing-library/react')
  const { StageMap } = await import('./StageMapView')
  localStorage.clear()
  // 50ステージ → ゾーン2はステージ11〜20。いまはステージ13（12までクリア）
  const { container } = render(<StageMap name="札" theme="sea" floors={Array.from({ length: 50 }, (_, i) => ({ id: 'f' + i, label: 'S' + i, cleared: i < 12 }))} onOpen={() => {}} />)
  expect(container.querySelector('.smap-zone-step')?.textContent).toBe('3/10')
})

it('地図を歩くキャラは、ゾーンに合った持ちものを持つ（嵐の海はかさ、雪の峠はマフラー）', async () => {
  const { MAP_ZONES, walkerGear } = await import('./mapzone')
  expect(walkerGear(MAP_ZONES.sea[3])).toBe('☂️')
  expect(walkerGear(MAP_ZONES.mountain[2])).toBe('🧣')
  expect(walkerGear(MAP_ZONES.sea[0])).toBeUndefined()
})
