import { useState } from 'react'
import { ADV_PASSAGES } from './advreading'
import { Castle } from './CastleView'
import { LONG_PASSAGES, type LongPassage, type LongRecord } from './longreading'
import { readCastleFloors, type RcFloor } from './readcastle'
import { towerCleared } from './readtower'
import { GrammarFigure } from './GrammarFigView'

// 読解の城（構文ごと）：分詞構文・強調構文・分裂文・倒置・仮定法などのテーマを、その構文が入った長文で3階ずつ登る。
// テーマの1階目は構文の解説から（2階目からは、その長文に出てくる構文の文とひとことのコツ）。いまのレベルの長文を先に使い、足りなければほかのレベルの長文も使う
export function ReadThemeCastle({ list, record, onOpen, onChest }: { list: LongPassage[]; record: LongRecord; onOpen: (p: LongPassage) => void; onChest?: (coins: number) => void }) {
  const [explain, setExplain] = useState<RcFloor | null>(null)
  const ids = new Set(list.map((p) => p.id))
  const pool = [...list, ...[...LONG_PASSAGES, ...ADV_PASSAGES].filter((p) => !ids.has(p.id))]
  const all = readCastleFloors(pool)
  // いまのレベルの長文が多いテーマから
  const mine = (id: string) => all.filter((f) => f.theme.id === id && ids.has(f.passage.id)).length
  const themes = [...new Set(all.map((f) => f.theme.id))].sort((a, b) => mine(b) - mine(a))
  const floors = themes.flatMap((t) => all.filter((f) => f.theme.id === t))
  if (explain) {
    const t = explain.theme
    return (
      <section className="card rc-explain" aria-label={`${t.name}の解説`}>
        <button className="list-link" onClick={() => setExplain(null)}>
          ← 城にもどる
        </button>
        <h2>🏰 {t.name}</h2>
        {explain.floor === 0 ? <GrammarFigure fig={t.fig} /> : <p className="rc-tip">💡 {t.fig.tip}</p>}
        <div className="rc-find">
          <p className="rc-find-cap">🔍 この長文に出てくる「{t.name}」</p>
          <p className="rc-find-en">{explain.sentence}</p>
        </div>
        <div className="gc-go-bar">
          <button className="flip to-questions" onClick={() => onOpen(explain.passage)}>
            長文に挑戦
          </button>
        </div>
      </section>
    )
  }
  return (
    <Castle
      name="構文の山"
      theme="mountain"
      onChest={onChest}
      floors={floors.map((f) => {
        const n = all.filter((x) => x.theme.id === f.theme.id).length
        return { id: f.id, label: `${f.theme.name}　${f.floor + 1}/${n}`, sub: f.floor === 0 ? '📖 解説から' : f.passage.title, cleared: towerCleared(f.passage, record) }
      })}
      onOpen={(id) => {
        // どの階も、長文に入る前にその長文に出てくる構文の文を見せる（1階目は図の解説つき）
        setExplain(floors.find((x) => x.id === id)!)
        window.scrollTo?.({ top: 0 })
      }}
    />
  )
}
