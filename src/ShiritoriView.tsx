import { useState } from 'react'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { makeTurn, usable } from './shiritori'
import { playCorrect, playWrong } from './sound'
import { WORDS, type Word } from './words'

type Props = { onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

const POOL = WORDS.filter(usable)

function startWord(): Word {
  return POOL[Math.floor(Math.random() * POOL.length)]
}

export function Shiritori({ onAnswer }: Props) {
  const [chain, setChain] = useState<Word[]>(() => [startWord()])
  const current = chain[chain.length - 1]
  const [turn, setTurn] = useState(() => makeTurn(current, POOL, new Set([current.id])))
  const [over, setOver] = useState<'lose' | 'win' | null>(() => (turn ? null : 'win'))
  const [best, setBest] = useState(0)

  function pick(i: number) {
    if (!turn || over) return
    const w = turn.choices[i]
    if (i === turn.answer) {
      playCorrect()
      onAnswer?.(true, XP_QUIZ_CORRECT, w.id, 'quiz')
      const next = [...chain, w]
      setChain(next)
      const t = makeTurn(w, POOL, new Set(next.map((x) => x.id)))
      setTurn(t)
      if (!t) setOver('win')
      setBest(Math.max(best, next.length - 1))
    } else {
      playWrong()
      onAnswer?.(false, 0, turn.choices[turn.answer].id, 'quiz')
      setOver('lose')
    }
  }

  function again() {
    const s = startWord()
    setChain([s])
    const t = makeTurn(s, POOL, new Set([s.id]))
    setTurn(t)
    setOver(t ? null : 'win')
  }

  return (
    <section className="card quiz shiritori">
      <p className="progress">つないだ数 {chain.length - 1}（ベスト {best}）</p>
      <p className="shiritori-chain">{chain.slice(-4).map((w) => w.en).join(' → ')}</p>
      {over ? (
        <>
          <p className="feedback">
            {over === 'win' ? 'つなげる単語がなくなった！ 勝ち！' : `ざんねん！ 正解は「${turn?.choices[turn.answer].en}」`}
          </p>
          <button className="flip" onClick={again}>
            もう一度
          </button>
        </>
      ) : (
        <>
          <p className="verb-ask">
            「<strong>{current.en.slice(-1)}</strong>」で始まる単語はどれ？
          </p>
          <div className="choices">
            {turn!.choices.map((w, i) => (
              <button key={w.id} className="choice" onClick={() => pick(i)}>
                {w.en} <span className="choice-ja">{w.ja}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
