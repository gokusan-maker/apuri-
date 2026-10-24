import { useState } from 'react'
import { hideSpot, hint, HIDE_CELLS, HIDE_COINS, HIDE_TRIES, loadHideDay, saveHideDay } from './hideseek'

const rand = () => Math.random()
const BUSHES = ['🌳', '🪨', '🌷', '📦', '🛋', '🌲', '🧺', '🌵', '🪴']

type Props = { day: string; name: string; onFound: () => void }

export function HideSeek({ day, name, onFound }: Props) {
  const [doneDay, setDoneDay] = useState(loadHideDay)
  const [spot, setSpot] = useState<number | null>(null)
  const [tried, setTried] = useState<number[]>([])
  const [msg, setMsg] = useState('')
  const finished = (s: string) => {
    setDoneDay(day)
    saveHideDay(day)
    setMsg(s)
  }
  if (doneDay === day && spot === null) return msg ? <p className="hide-msg">{msg}</p> : null
  return (
    <div className="hideseek">
      {spot === null ? (
        <button className="list-link" title={`1日1回・${HIDE_TRIES}回以内で見つけると🪙${HIDE_COINS}`} onClick={() => setSpot(hideSpot(rand()))}>
          🙈 {name}とかくれんぼ
        </button>
      ) : (
        <>
          <p className="hide-title">
            {doneDay === day ? msg : `${name}はどこにかくれたかな？（あと${HIDE_TRIES - tried.length}回）`}
          </p>
          {doneDay !== day && msg && <p className="hide-hint">{msg}</p>}
          <div className="hide-grid">
            {Array.from({ length: HIDE_CELLS }, (_, i) => (
              <button
                key={i}
                aria-label={`かくれ場所 ${i + 1}`}
                disabled={doneDay === day || tried.includes(i)}
                onClick={() => {
                  const t = [...tried, i]
                  setTried(t)
                  if (i === spot) {
                    onFound()
                    finished(`🎉 見つけた！ 🪙${HIDE_COINS}`)
                  } else if (t.length >= HIDE_TRIES) finished(`ざんねん… ${name}は ${spot + 1} 番にかくれていたよ`)
                  else setMsg(hint(i, spot))
                }}
              >
                {(doneDay === day && i === spot) || (tried.includes(i) && i === spot) ? '🐣' : tried.includes(i) ? '・' : BUSHES[i]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
