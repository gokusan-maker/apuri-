import { useRef, useState } from 'react'
import type { Source } from './monster'
import { getRecognition, matchesSpeech } from './pronounce'
import { shuffle } from './quiz'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'
import { loadSettings } from './settings'
import type { Word } from './words'

type Props = {
  words: Word[]
  count?: number
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
}

export const XP_PRONOUNCE = 10

export function Pronounce({ words, count = 10, onAnswer }: Props) {
  const [list] = useState(() => shuffle(words).slice(0, count))
  const [index, setIndex] = useState(0)
  const [listening, setListening] = useState(false)
  const [heard, setHeard] = useState('')
  const [result, setResult] = useState<'ok' | 'ng' | null>(null)
  const [error, setError] = useState('')
  const recRef = useRef<{ abort: () => void } | null>(null)
  const Rec = getRecognition()
  const w = list[index % list.length]

  if (!Rec) {
    return (
      <section className="card">
        <p className="result-title">🎤 発音練習</p>
        <p className="stats-note">この端末・ブラウザでは音声認識が使えません。Chrome（Android）や Safari（iPhone）でお試しください。</p>
      </section>
    )
  }

  function listen() {
    if (!Rec || listening) return
    const rec = new Rec()
    rec.lang = loadSettings().accent
    rec.maxAlternatives = 5
    rec.interimResults = false
    rec.onresult = (e) => {
      const alts = Array.from(e.results[0] ?? []).map((a) => a.transcript)
      setHeard(alts[0] ?? '')
      const ok = matchesSpeech(alts, w.en)
      setResult(ok ? 'ok' : 'ng')
      if (ok) playCorrect()
      else playWrong()
      onAnswer?.(ok, ok ? XP_PRONOUNCE : 0, w.id, 'ear')
    }
    rec.onerror = (e) => setError(e.error === 'not-allowed' ? 'マイクの使用を許可してください' : 'うまく聞き取れませんでした')
    rec.onend = () => setListening(false)
    recRef.current = rec
    setError('')
    setHeard('')
    setResult(null)
    setListening(true)
    rec.start()
  }

  function next() {
    recRef.current?.abort()
    setIndex(index + 1)
    setHeard('')
    setResult(null)
    setError('')
  }

  return (
    <section className="card quiz pronounce" aria-live="polite">
      <p className="progress">
        {(index % list.length) + 1} / {list.length}
      </p>
      <p className="en">{w.en}</p>
      <p className="example-ja">{w.ja}</p>
      <button className="speak" onClick={() => speak(w.en)} aria-label="お手本を聞く">
        🔊
      </button>
      <button className={`listen mic${listening ? ' on' : ''}`} onClick={listen} aria-label="話す">
        🎤
      </button>
      <p className="stats-note">{listening ? '聞いています…' : 'マイクを押して英語で言ってみよう'}</p>
      {heard && <p className="heard">聞こえた：「{heard}」</p>}
      {result && <p className="feedback">{result === 'ok' ? 'ばっちり！' : 'おしい！もう一度'}</p>}
      {error && <p className="form-error">{error}</p>}
      <button className="flip" onClick={next}>
        次の単語
      </button>
    </section>
  )
}
