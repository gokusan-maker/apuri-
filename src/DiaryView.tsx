import { useState } from 'react'
import { DIARY_HINTS, DIARY_MAX, loadDiary, recentDiary, saveDiary, writeDiary } from './diary'
import { speak } from './speech'

// ひとこと英語日記
export function DiaryBox({ today }: { today: string }) {
  const [diary, setDiary] = useState(loadDiary)
  const [text, setText] = useState(() => loadDiary()[today] ?? '')
  const [saved, setSaved] = useState(false)
  const hint = DIARY_HINTS[Number(today.slice(-2)) % DIARY_HINTS.length]
  return (
    <details className="diary">
      <summary>📝 ひとこと英語日記{diary[today] ? '（今日は書いたよ）' : ''}</summary>
      <p className="stats-note">英語で1文書いてみよう。ヒント：{hint}</p>
      <textarea
        value={text}
        maxLength={DIARY_MAX}
        rows={2}
        aria-label="今日の英語日記"
        onChange={(e) => {
          setText(e.target.value)
          setSaved(false)
        }}
      />
      <button
        className="flip"
        onClick={() => {
          const d = writeDiary(diary, today, text)
          setDiary(d)
          saveDiary(d)
          setSaved(true)
        }}
      >
        {saved ? '保存しました' : '保存する'}
      </button>
      <ul className="missed-list" aria-label="最近の日記">
        {recentDiary(diary).map(([day, t]) => (
          <li key={day}>
            <small>{day.slice(5).replace('-', '/')}</small> {t}{' '}
            <button className="speak small" aria-label="読み上げる" onClick={() => speak(t)}>
              🔊
            </button>
          </li>
        ))}
      </ul>
    </details>
  )
}
