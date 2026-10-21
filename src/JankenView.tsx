import { useState } from 'react'
import { handOf, HANDS, judge, JANKEN_COINS, JANKEN_PER_DAY, loadJanken, saveJanken, type Hand } from './janken'

const rand = () => Math.random()

type Props = { day: string; name: string; onWin: () => void }

export function Janken({ day, name, onWin }: Props) {
  const [log, setLog] = useState(() => loadJanken(day))
  const [last, setLast] = useState<{ me: Hand; partner: Hand } | null>(null)
  const left = JANKEN_PER_DAY - log.count
  const result = last ? judge(last.me, last.partner) : null
  return (
    <div className="janken">
      <p className="janken-title">
        ✊ {name}とじゃんけん（今日あと{Math.max(0, left)}回・勝つと🪙{JANKEN_COINS}）
      </p>
      {last && (
        <p className="janken-result" role="status">
          きみ {HANDS[last.me].icon} vs {HANDS[last.partner].icon} {name}　{result === 1 ? `かち！ 🪙${JANKEN_COINS}` : result === 0 ? 'あいこ！ もう一回' : 'まけ…'}
        </p>
      )}
      {left > 0 && (
        <div className="janken-hands">
          {HANDS.map((h, i) => (
            <button
              key={h.id}
              aria-label={h.name}
              onClick={() => {
                const me = i as Hand
                const partner = handOf(rand())
                const r = judge(me, partner)
                setLast({ me, partner })
                if (r === 0) return
                const next = { day, count: log.count + 1 }
                setLog(next)
                saveJanken(next)
                if (r === 1) onWin()
              }}
            >
              {h.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
