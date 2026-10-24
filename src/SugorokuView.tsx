import { useState } from 'react'
import { BOARD, loadSugoroku, moveAfter, rollDice, saveSugoroku } from './sugoroku'
import { playCorrect, playWrong } from './sound'
import type { Word } from './words'

const rand = () => Math.random()

type Props = { day: string; words: Word[]; onGoal: () => void }

export function SugorokuBoard({ day, words, onGoal }: Props) {
  const [s, setS] = useState(loadSugoroku)
  const [turn, setTurn] = useState<{ dice: number; word: Word; choices: Word[] } | null>(null)
  const [msg, setMsg] = useState('')
  const done = s.day === day && !turn
  return (
    <div className="sugoroku">
      <p className="sugoroku-title">
        🎲 英語すごろく（{s.pos} / {BOARD}マス・ゴールで🎟1）{s.laps > 0 ? `　ゴール${s.laps}回` : ''}
      </p>
      <div className="sugoroku-track" aria-label={`いま ${s.pos} マス目`}>
        {Array.from({ length: BOARD }, (_, i) => (
          <span key={i} className={`sq${i === s.pos ? ' here' : ''}${i < s.pos ? ' past' : ''}`} />
        ))}
        <span className="sq goal">🏁</span>
      </div>
      {turn ? (
        <div className="sugoroku-q">
          <p>
            🎲 {turn.dice}！ 「{turn.word.en}」の意味は？（正解で{turn.dice}マス進む）
          </p>
          <div className="sugoroku-choices">
            {turn.choices.map((c) => (
              <button
                key={c.id}
                className="list-link pill-btn pill-choice"
                onClick={() => {
                  const ok = c.id === turn.word.id
                  const r = moveAfter(s, turn.dice, ok, day)
                  if (ok) playCorrect()
                  else playWrong()
                  setS(r.next)
                  saveSugoroku(r.next)
                  setTurn(null)
                  setMsg(r.goal ? '🏁 ゴール！ 🎟ガチャチケットをもらった' : ok ? `⭕ 正解！ ${turn.dice}マス進んだ` : `❌ 正解は「${turn.word.ja}」。明日またチャレンジ！`)
                  if (r.goal) onGoal()
                }}
              >
                {c.ja}
              </button>
            ))}
          </div>
        </div>
      ) : done ? (
        msg && <p className="sugoroku-msg">{msg}</p>
      ) : (
        <button
          className="list-link pill-btn pill-start"
          disabled={words.length < 3}
          onClick={() => {
            const pick = () => words[Math.floor(rand() * words.length)]
            const word = pick()
            const others = words.filter((w) => w.id !== word.id && w.ja !== word.ja)
            const wrong = [others[Math.floor(rand() * others.length)]]
            const rest = others.filter((w) => w.id !== wrong[0].id && w.ja !== wrong[0].ja)
            wrong.push(rest[Math.floor(rand() * rest.length)])
            const at = Math.floor(rand() * 3)
            setTurn({ dice: rollDice(rand()), word, choices: [...wrong.slice(0, at), word, ...wrong.slice(at)] })
          }}
        >
          🎲 サイコロをふる（1日1回）
        </button>
      )}
    </div>
  )
}
