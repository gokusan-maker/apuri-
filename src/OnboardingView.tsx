import { useState } from 'react'
import { FORMS } from './monster'
import { MonsterFigure } from './MonsterView'

const STEPS = [
  {
    title: 'えいたんへようこそ！',
    body: '英単語を覚えると、相棒のモンスターが育っていくよ。正解するたびに XP（エサ）がもらえる！',
  },
  {
    title: 'いろんな学び方',
    body: '🃏カードで覚えて、❓クイズや🗺️ステージで力だめし。⏱タイムアタックで自己ベストをねらおう。',
  },
  {
    title: '相棒のタマゴ',
    body: '毎日少しずつ続けると、タマゴがかえって進化するよ。学び方によって進化先が変わるかも…？',
  },
]

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const s = STEPS[step]
  const last = step === STEPS.length - 1
  return (
    <div className="celebrate onboarding" role="dialog" aria-label="はじめての案内">
      <div className="celebrate-card">
        <div className="onboarding-figure">
          <MonsterFigure form={FORMS[last ? 0 : 2]} mood="happy" />
        </div>
        <p className="celebrate-title">{s.title}</p>
        <p className="celebrate-text">{s.body}</p>
        <p className="onboarding-dots" aria-hidden="true">
          {STEPS.map((_, i) => (i === step ? '●' : '○')).join(' ')}
        </p>
        <button className="flip" onClick={() => (last ? onDone() : setStep(step + 1))}>
          {last ? 'タマゴを受け取る 🥚' : 'つぎへ'}
        </button>
        {!last && (
          <button className="skip" onClick={onDone}>
            スキップ
          </button>
        )}
      </div>
    </div>
  )
}
