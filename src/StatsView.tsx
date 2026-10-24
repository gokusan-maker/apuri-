import { medalFor } from "./medal";
import type { ReactNode } from "react";
import type { Mistakes } from "./mistakes";
import type { DayBar } from "./history";
import { WeekChart } from "./WeekChartView";
import type { Word } from "./words";

type Props = {
  streakDays: number;
  studiedToday: number;
  learned: number;
  total: number;
  week: DayBar[];
  goal: number;
  weak: Word[];
  mistakes: Mistakes;
  onReviewWeak: () => void;
  onReviewWeakCards: () => void;
  schedule: number[]; // 今日から7日間の復習数
  favorites?: Word[];
  calendar?: ReactNode;
  minutes?: [number, number]; // 今日・この7日の学習時間（分）
  bestCombo?: number;
  accuracy?: {
    today: number | null;
    card: number | null;
    quiz: number | null;
    ear: number | null;
  };
  byLevel?: { level: string; learned: number; total: number }[];
  onReviewFav?: () => void;
  onReviewFavCards?: () => void;
  children?: ReactNode; // 記録画面の下に並べる部品（マイ単語帳・バッジ・図鑑など）
};

export function Stats({
  streakDays,
  studiedToday,
  learned,
  total,
  week,
  goal,
  weak,
  mistakes,
  onReviewWeak,
  onReviewWeakCards,
  schedule,
  favorites = [],
  onReviewFav,
  onReviewFavCards,
  calendar,
  minutes,
  bestCombo = 0,
  byLevel = [],
  accuracy,
  children,
}: Props) {
  return (
    <section className="card stats-view">
      <h2>📈 学習データ</h2>
      <dl className="result-list">
        <div>
          <dt>連続学習</dt>
          <dd>{streakDays}日</dd>
        </div>
        <div>
          <dt>今日の学習</dt>
          <dd>{studiedToday}問</dd>
        </div>
        <div title="定着＝3回続けて「覚えた」">
          <dt>定着語数</dt>
          <dd>
            {learned} / {total}
          </dd>
        </div>
      </dl>
      {minutes && (minutes[1] > 0 || bestCombo > 0) && (
        <p className="study-time">
          {minutes[1] > 0 && (
            <>
              ⏳ 学習時間：今日 <strong>{minutes[0]}分</strong>・この7日{" "}
              <strong>{minutes[1]}分</strong>
            </>
          )}
          {minutes[1] > 0 && bestCombo > 0 && <br />}
          {bestCombo > 0 && (
            <>
              🔥 コンボの自己ベスト：<strong>{bestCombo}</strong>
            </>
          )}
        </p>
      )}
      {accuracy && (accuracy.today !== null || accuracy.card !== null || accuracy.quiz !== null || accuracy.ear !== null) && (
        <p className="study-time">
          🎯 今日の正答率：
          <strong>
            {accuracy.today ?? "―"}
            {accuracy.today !== null && "%"}
          </strong>
          <span className="acc-chips" aria-label="これまでの正答率">
            {(
              [
                ["カード", accuracy.card],
                ["クイズ", accuracy.quiz],
                ["耳・スペル", accuracy.ear],
              ] as const
            )
              .filter(([, v]) => v !== null)
              .map(([k, v]) => (
                <span key={k} className="acc-chip">
                  {k} <b>{`${v}%`}</b>
                </span>
              ))}
          </span>
        </p>
      )}
      {learned > 0 && (
        <div
          className="xp-bar"
          role="progressbar"
          aria-label="定着の割合"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={learned}
        >
          <div
            className="xp-fill"
            style={{ width: `${(learned / total) * 100}%` }}
          />
        </div>
      )}
      {byLevel.length > 0 && (
        <details className="by-level">
          <summary>📚 単語帳ごとの定着</summary>
          {byLevel.map((b) => (
            <div key={b.level} className="by-level-row">
              <span className="by-level-name">
                {b.learned === b.total && b.total > 0
                  ? "👑"
                  : medalFor(
                      b.total ? Math.round((b.learned / b.total) * 100) : 0,
                    )}
                {b.level}
              </span>
              <div
                className="goal-bar"
                role="progressbar"
                aria-label={`${b.level}の定着`}
                aria-valuemin={0}
                aria-valuemax={b.total}
                aria-valuenow={b.learned}
              >
                <div
                  className="goal-fill"
                  style={{ width: `${(b.learned / b.total) * 100}%` }}
                />
              </div>
              <span className="by-level-num">
                {b.learned}/{b.total}
              </span>
            </div>
          ))}
        </details>
      )}
      {week.some((d) => d.count > 0) && <WeekChart days={week} goal={goal} />}
      {calendar}
      {schedule.some((n) => n > 0) && (
        <>
      <h2>復習の予定</h2>
      <p className="stats-note">
        今日 {schedule[0]}語・<strong>明日 {schedule[1]}語</strong>
      </p>
      <ol className="schedule" aria-label="これから1週間の復習予定">
        {schedule.map((n, i) => (
          <li key={i}>
            <span className="schedule-day">
              {i === 0 ? "今日" : i === 1 ? "明日" : `${i}日後`}
            </span>
            <span className="schedule-n">{n}</span>
          </li>
        ))}
      </ol>
        </>
      )}
      {weak.length > 0 && (
        <>
          <h2>苦手な単語</h2>
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
      {favorites.length > 0 && (
        <>
          <h2>★ お気に入り（{favorites.length}語）</h2>
          <div className="actions">
            <button className="good" onClick={onReviewFavCards}>
              カードで復習
            </button>
            <button className="good" onClick={onReviewFav}>
              クイズで復習
            </button>
          </div>
        </>
      )}
      {children}
    </section>
  );
}
