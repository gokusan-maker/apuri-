import type { ReactNode } from 'react'
import type { Mistakes } from './mistakes'
import type { DayBar } from './history'
import { WeekChart } from './WeekChartView'
import type { Word } from './words'

type Props = {
  streakDays: number
  studiedToday: number
  learned: number
  total: number
  week: DayBar[]
  goal: number
  weak: Word[]
  mistakes: Mistakes
  onReviewWeak: () => void
  onReviewWeakCards: () => void
  children?: ReactNode // 記録画面の下に並べる部品（マイ単語帳・バッジ・図鑑など）
}

export function Stats({ streakDays, studiedToday, learned, total, week, goal, weak, mistakes, onReviewWeak, onReviewWeakCards, children }: Props) {
  return (
    <section className="card stats-view">
      <h2>記録</h2>
      <dl className="result-list">
        <div>
          <dt>連続学習</dt>
          <dd>{streakDays}日</dd>
        </div>
        <div>
          <dt>今日の学習</dt>
          <dd>{studiedToday}問</dd>
        </div>
        <div>
          <dt>定着語数</dt>
          <dd>
            {learned} / {total}
          </dd>
        </div>
      </dl>
      <p className="stats-note">定着語数＝カードで3回以上続けて「覚えた」になった単語</p>
      <div className="xp-bar" role="progressbar" aria-label="定着の割合" aria-valuemin={0} aria-valuemax={total} aria-valuenow={learned}>
        <div className="xp-fill" style={{ width: `${(learned / total) * 100}%` }} />
      </div>
      <WeekChart days={week} goal={goal} />
      <h2>苦手な単語</h2>
      {weak.length === 0 ? (
        <p className="stats-note">まだありません。まちがえた単語がここに集まります。</p>
      ) : (
        <>
          <ol className="weak-list">
            {weak.slice(0, 10).map((w) => (
              <li key={w.id}>
                <span className="weak-en">{w.en}</span>
                <span className="weak-ja">{w.ja}</span>
                <span className="weak-count">×{mistakes[w.id]}</span>
              </li>
            ))}
          </ol>
          <div className="actions">
            <button className="good" onClick={onReviewWeakCards}>
              カードで復習
            </button>
            <button className="good" onClick={onReviewWeak}>
              クイズで復習
            </button>
          </div>
        </>
      )}
      {children}
    </section>
  )
}
