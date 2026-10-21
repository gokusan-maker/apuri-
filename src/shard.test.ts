import { expect, it } from 'vitest'
import { loadShards, saveShards, shardAfter, SHARDS_FOR_EGG } from './shard'

it('かけらは4回に1回くらい落ち、5つで交換される', () => {
  expect(shardAfter(2, 0.5)).toEqual({ shards: 2, dropped: false, exchange: false })
  expect(shardAfter(2, 0.1)).toEqual({ shards: 3, dropped: true, exchange: false })
  expect(shardAfter(SHARDS_FOR_EGG - 1, 0.1)).toEqual({ shards: 0, dropped: true, exchange: true })
  localStorage.clear()
  expect(loadShards()).toBe(0)
  saveShards(3)
  expect(loadShards()).toBe(3)
})
