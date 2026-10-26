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
