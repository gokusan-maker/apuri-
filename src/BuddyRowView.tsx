import { useState } from 'react'
import { growthOf, growthScale, growthText } from './monster'
import type { ReactNode } from 'react'
import { BuddyFigure } from './BuddyFigureView'
import { buddyLevel, buddyName, teamOf, TEAM_TITLES, TRACK_LABEL, type Buddies, type Track } from './buddies'

type Props = {
  wordFigure: ReactNode // 単語の相棒（モチなど）の絵
  wordName: string
  wordLevel: number
  buddies: Buddies
  onGo: (where: 'word' | Track) => void // タップした子の画面へ
  dancing?: boolean // トリオボーナスを受け取ったときに3体がおどる
  todayGain?: { word: number; grammar: number; reading: number } // 今日育った XP
  crowned?: boolean // 今日の課題を3つクリアした日は👑
}

// ホームの3体：単語の相棒・文法のことばモンスター・読解の竜
export function BuddyRow({ wordFigure, wordName, wordLevel, buddies, onGo, dancing = false, todayGain, crowned = false }: Props) {
  const tracks: Track[] = ['grammar', 'reading']
  const team = teamOf(wordLevel, buddies)
  const [showTitles, setShowTitles] = useState(false) // 称号の一覧
  return (
    <>
    <button className="team-level" aria-label="チームレベル" aria-expanded={showTitles} onClick={() => setShowTitles(!showTitles)}>
      🤝 チームLv.{team.level}「{team.title}」{team.next !== null && <small className="team-next">あと{team.next}で次の称号</small>}
    </button>
    {showTitles && (
      <ol className="team-titles" aria-label="チームの称号の一覧">
        {TEAM_TITLES.map((t) => (
          <li key={t.name} className={team.level >= t.min ? 'got' : 'locked'}>
            {team.level >= t.min ? `🏅 ${t.name}` : '？？？'}（チームLv.{t.min}〜）
          </li>
        ))}
      </ol>
    )}
    <span className="buddy-bar team-bar" role="progressbar" aria-label="次の称号まで" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(team.progress * 100)}>
      <span style={{ width: `${team.progress * 100}%` }} />
    </span>
    <div className={`buddy-row${dancing ? ' dancing' : ''}${crowned ? ' crowned' : ''}`} aria-label="育てているなかま">
      <button className="buddy-card b-word" onClick={() => onGo('word')}>
        <span className="buddy-tag">単語</span>
        <span className="buddy-fig" style={{ transform: `scale(${growthScale(growthOf(wordLevel))})` }}>
          {wordFigure}
        </span>
        <span className="buddy-name">{wordName}</span>
        <span className="buddy-lv">
          Lv.{wordLevel}
          {todayGain && todayGain.word > 0 && <span className="buddy-today"> +{todayGain.word}</span>}
          {growthOf(wordLevel) > 0 && <span className="buddy-growth" aria-label={`成長の星 ${growthOf(wordLevel)}`}> {growthText(growthOf(wordLevel))}</span>}
        </span>
      </button>
      {tracks.map((t) => {
        const b = buddies[t]
        const lv = buddyLevel(b)
        return (
          <button key={t} className={`buddy-card b-${t}`} onClick={() => onGo(t)} aria-label={`${TRACK_LABEL[t]}のなかま ${buddyName(t, b)} Lv.${lv.level}`}>
            <span className="buddy-tag">{TRACK_LABEL[t]}</span>
            <span className="buddy-fig" aria-hidden="true">
              <BuddyFigure track={t} buddy={b} />
            </span>
            <span className="buddy-name">{buddyName(t, b)}</span>
            <span className="buddy-lv">
              Lv.{lv.level}
              {todayGain && todayGain[t] > 0 && <span className="buddy-today"> +{todayGain[t]}</span>}
            </span>
            <span className="buddy-bar" aria-hidden="true">
              <span style={{ width: `${(lv.into / lv.need) * 100}%` }} />
            </span>
          </button>
        )
      })}
    </div>
    </>
  )
}
