import { Castle } from './CastleView'
import { stagesOf, type Stage, type StageRecord } from './stages'
import type { Level } from './words'

const starText = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n)

// 単語の城：えらんでいる単語帳の単語ステージが1階ずつ（星が1つでもとれたらクリア）
export function WordCastle({ levels, record, onOpen, onChest }: { levels: Level[]; record: StageRecord; onOpen: (s: Stage) => void; onChest?: (coins: number) => void }) {
  const all = levels.flatMap((lv) => stagesOf(lv))
  return (
    <Castle
      name="単語の城"
      theme="purple"
      onChest={onChest}
      floors={all.map((st) => ({ id: st.id, label: `${st.level} ステージ${st.no}`, sub: starText(record[st.id] ?? 0), cleared: (record[st.id] ?? 0) > 0 }))}
      onOpen={(id) => {
        const st = all.find((x) => x.id === id)
        if (st) onOpen(st)
      }}
    />
  )
}
