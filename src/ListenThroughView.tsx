import { useEffect, useState } from 'react'
import { cancelSpeech, speakSeq } from './speech'
import type { Word } from './words'

// 聞き流し：単語を「英語→日本語」の順に読み上げ続ける
export function ListenThrough({ words }: { words: Word[] }) {
  const [playing, setPlaying] = useState(false)
  const [index, setIndex] = useState(0)
  const [withJa, setWithJa] = useState(true)
  const w = words[index % Math.max(words.length, 1)]

  useEffect(() => {
    if (!playing || !w) return
    let timer = 0
    speakSeq([{ text: w.en }, ...(withJa ? [{ text: w.ja, lang: 'ja-JP' }] : [])], () => {
      timer = window.setTimeout(() => setIndex((i) => i + 1), 800)
    })
    return () => {
      window.clearTimeout(timer)
      cancelSpeech()
    }
  }, [playing, w, withJa])

  if (!w) return null
  return (
    <section className="card quiz listen-through">
      <p className="progress">
        {(index % words.length) + 1} / {words.length}
      </p>
      <p className="en">{w.en}</p>
      <p className="example-ja">{w.ja}</p>
      <button className="listen" onClick={() => setPlaying(!playing)} aria-label={playing ? 'とめる' : '再生'}>
        {playing ? '⏸' : '▶'}
      </button>
      <div className="actions">
        <button className="good" onClick={() => setIndex(Math.max(0, index - 1))}>
          ◀ まえ
        </button>
        <button className="good" onClick={() => setIndex(index + 1)}>
          つぎ ▶
        </button>
      </div>
      <label className="setting toggle listen-ja">
        <span>日本語も読み上げる</span>
        <input type="checkbox" checked={withJa} onChange={(e) => setWithJa(e.target.checked)} />
      </label>
    </section>
  )
}
