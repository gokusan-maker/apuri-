import { Castle } from './CastleView'
import type { LongPassage, LongRecord } from './longreading'
import { towerCleared } from './readtower'

// 読解の塔（城）：長文1本が1階。6割以上とれたらクリアして次の階へ
export function ReadTower({ list, record, titleOf, onOpen }: { list: LongPassage[]; record: LongRecord; titleOf: (p: LongPassage) => string; onOpen: (p: LongPassage) => void }) {
  return (
    <Castle
      name="読解の塔"
      theme="blue"
      floors={list.map((p) => ({ id: p.id, label: titleOf(p), cleared: towerCleared(p, record) }))}
      onOpen={(id) => onOpen(list.find((p) => p.id === id)!)}
    />
  )
}
