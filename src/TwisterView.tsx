import { useState } from 'react'
import type { Source } from './monster'
import { speak } from './speech'
import { TWISTERS } from './twisters'

const TWISTER_XP = 5

type Props = { onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

// 早口ことば：聞いて、まねして言う（言えたら自分でボタン）
export function Twisters({ onAnswer }: Props) {
  const [i, setI] = useState(0)
  const [done, setDone] = useState<number[]>([])
  const t = TWISTERS[i]
  return (
    <section className="card quiz twister">
      <p className="quiz-progress">
        {i + 1} / {TWISTERS.length}・言えた {done.length}
      </p>
      <p className="example twister-text">{t.en}</p>
      <p className="example-ja">{t.ja}</p>
      <p className="stats-note">コツ：{t.tip}</p>
      <div className="choices">
        <button className="choice" onClick={() => speak(t.en, true)}>
          🐢 ゆっくり聞く
        </button>
        <button className="choice" onClick={() => speak(t.en)}>
          🔊 ふつうの速さで聞く
        </button>
        <button
          className="choice"
          disabled={done.includes(i)}
          onClick={() => {
            setDone([...done, i])
            onAnswer?.(true, TWISTER_XP, '', 'ear')
          }}
        >
          {done.includes(i) ? '✅ 言えた！' : '🗣 まねして言えた！'}
        </button>
      </div>
      <button className="flip" onClick={() => setI((i + 1) % TWISTERS.length)}>
        次の早口ことば
      </button>
    </section>
  )
}
