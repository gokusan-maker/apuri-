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
  schedule: number[] // 今日から7日間の復習数
  favorites?: Word[]
  calendar?: ReactNode
  minutes?: [number, number] // 今日・この7日の学習時間（分）
  bestCombo?: number
  onReviewFav?: () => void
  onReviewFavCards?: () => void
  children?: ReactNode // 記録画面の下に並べる部品（マイ単語帳・バッジ・図鑑など）
}

export function Stats({ streakDays, studiedToday, learned, total, week, goal, weak, mistakes, onReviewWeak, onReviewWeakCards, schedule, favorites = [], onReviewFav, onReviewFavCards, calendar, minutes, bestCombo = 0, children }: Props) {
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
      {minutes && (
        <p className="study-time">
          ⏳ 学習時間：今日 <strong>{minutes[0]}分</strong>・この7日 <strong>{minutes[1]}分</strong>
          <br />
          🔥 コンボの自己ベスト：<strong>{bestCombo}</strong>
        </p>
      )}
      <div className="xp-bar" role="progressbar" aria-label="定着の割合" aria-valuemin={0} aria-valuemax={total} aria-valuenow={learned}>
        <div className="xp-fill" style={{ width: `${(learned / total) * 100}%` }} />
      </div>
      <WeekChart days={week} goal={goal} />
      {calendar}
      <h2>復習の予定</h2>
      <p className="stats-note">
        今日 {schedule[0]}語・<strong>明日 {schedule[1]}語</strong>
      </p>
      <ol className="schedule" aria-label="これから1週間の復習予定">
        {schedule.map((n, i) => (
          <li key={i}>
            <span className="schedule-day">{i === 0 ? '今日' : i === 1 ? '明日' : `${i}日後`}</span>
            <span className="schedule-n">{n}</span>
          </li>
        ))}
      </ol>
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
      <h2>★ お気に入り（{favorites.length}語）</h2>
      {favorites.length === 0 ? (
        <p className="stats-note">カードや単語一覧の ☆ をタップすると、ここに集まります。</p>
      ) : (
        <div className="actions">
          <button className="good" onClick={onReviewFavCards}>
            カードで復習
          </button>
          <button className="good" onClick={onReviewFav}>
            クイズで復習
          </button>
        </div>
      )}
      {children}
    </section>
  )
}
