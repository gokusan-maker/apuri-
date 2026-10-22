import type { ReactNode } from 'react'
import { buddyForm, buddyLevel, TRACK_LABEL, type Buddies, type Track } from './buddies'

type Props = {
  wordFigure: ReactNode // 単語の相棒（モチなど）の絵
  wordName: string
  wordLevel: number
  buddies: Buddies
  onGo: (where: 'word' | Track) => void // タップした子の画面へ
}

// ホームの3体：単語の相棒・文法の動物・長文の竜
export function BuddyRow({ wordFigure, wordName, wordLevel, buddies, onGo }: Props) {
  const tracks: Track[] = ['grammar', 'reading']
  return (
    <div className="buddy-row" aria-label="育てているなかま">
      <button className="buddy-card b-word" onClick={() => onGo('word')}>
        <span className="buddy-tag">単語</span>
        <span className="buddy-fig">{wordFigure}</span>
        <span className="buddy-name">{wordName}</span>
        <span className="buddy-lv">Lv.{wordLevel}</span>
      </button>
      {tracks.map((t) => {
        const b = buddies[t]
        const f = buddyForm(t, b)
        const lv = buddyLevel(b)
        return (
          <button key={t} className={`buddy-card b-${t}`} onClick={() => onGo(t)} aria-label={`${TRACK_LABEL[t]}のなかま ${b.name ?? f.name} Lv.${lv.level}`}>
            <span className="buddy-tag">{TRACK_LABEL[t]}</span>
            <span className="buddy-fig buddy-emoji" aria-hidden="true">
              {f.icon}
            </span>
            <span className="buddy-name">{b.name ?? f.name}</span>
            <span className="buddy-lv">Lv.{lv.level}</span>
            <span className="buddy-bar" aria-hidden="true">
              <span style={{ width: `${(lv.into / lv.need) * 100}%` }} />
            </span>
          </button>
        )
      })}
    </div>
  )
}
