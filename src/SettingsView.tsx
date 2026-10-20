import { Install } from './InstallView'
import { OfflineStatus } from './OfflineView'
import { GRADES } from './grade'
import type { Level } from './words'
import { useState } from 'react'
import { speak } from './speech'
import { DEFAULT_SETTINGS, GOALS, THEME_COLORS, type Accent, type Settings, type Theme } from './settings'

type Props = {
  settings: Settings
  onChange: (s: Settings) => void
  onGrade?: (levels: Level[]) => void
}

const THEMES: { id: Theme; label: string }[] = [
  { id: 'system', label: '端末に合わせる' },
  { id: 'light', label: 'ライト' },
  { id: 'dark', label: 'ダーク' },
]

const ACCENTS: { id: Accent; label: string }[] = [
  { id: 'en-US', label: 'アメリカ英語' },
  { id: 'en-GB', label: 'イギリス英語' },
]

export function SettingsPanel({ settings, onChange, onGrade }: Props) {
  const [graded, setGraded] = useState('')
  const set = (patch: Partial<Settings>) => onChange({ ...settings, ...patch })
  return (
    <section className="card settings">
      <h2>設定</h2>

      {onGrade && (
        <fieldset className="setting">
          <legend>学年から単語帳を選ぶ</legend>
          <div className="levels">
            {GRADES.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  onGrade(g.levels)
                  setGraded(`${g.label}向けの単語帳にしました（${g.levels.join('・')}）`)
                }}
              >
                {g.label}
              </button>
            ))}
          </div>
          {graded && (
            <p className="stats-note" role="status">
              {graded}
            </p>
          )}
        </fieldset>
      )}

      <label className="setting">
        <span>発音の速さ：{settings.rate.toFixed(1)}倍</span>
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.1}
          value={settings.rate}
          onChange={(e) => set({ rate: Number(e.target.value) })}
        />
      </label>

      <fieldset className="setting">
        <legend>音声</legend>
        <div className="levels">
          {ACCENTS.map((a) => (
            <button key={a.id} aria-pressed={settings.accent === a.id} onClick={() => set({ accent: a.id })}>
              {a.label}
            </button>
          ))}
        </div>
      </fieldset>
      <button className="speak-test" onClick={() => speak('Hello! Nice to meet you.')}>
        🔊 試しに聞く
      </button>

      <fieldset className="setting">
        <legend>画面の色</legend>
        <div className="levels">
          {THEMES.map((t) => (
            <button key={t.id} aria-pressed={settings.theme === t.id} onClick={() => set({ theme: t.id })}>
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="setting">
        <legend>テーマカラー</legend>
        <div className="levels">
          {THEME_COLORS.map((c) => (
            <button
              key={c.id}
              aria-pressed={settings.color === c.id}
              onClick={() => set({ color: c.id })}
              style={{ borderColor: c.value, color: settings.color === c.id ? '#fff' : c.value, background: settings.color === c.id ? c.value : 'transparent' }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="setting">
        <legend>1日の目標</legend>
        <div className="levels">
          {GOALS.map((g) => (
            <button key={g} aria-pressed={settings.dailyGoal === g} onClick={() => set({ dailyGoal: g })}>
              {g}問
            </button>
          ))}
        </div>
      </fieldset>

      <label className="setting toggle">
        <span>カードを出したら自動で発音</span>
        <input type="checkbox" checked={settings.autoSpeak} onChange={(e) => set({ autoSpeak: e.target.checked })} />
      </label>

      <label className="setting toggle">
        <span>カードを日本語→英語にする</span>
        <input type="checkbox" checked={settings.cardJaFirst} onChange={(e) => set({ cardJaFirst: e.target.checked })} />
      </label>

      <label className="setting toggle">
        <span>新しい単語をランダムな順に出す</span>
        <input type="checkbox" checked={settings.randomNew} onChange={(e) => set({ randomNew: e.target.checked })} />
      </label>

      <label className="setting toggle">
        <span>カードの例文の訳を隠す</span>
        <input type="checkbox" checked={settings.hideExampleJa} onChange={(e) => set({ hideExampleJa: e.target.checked })} />
      </label>

      <label className="setting toggle">
        <span>文字を大きくする</span>
        <input type="checkbox" checked={settings.largeText} onChange={(e) => set({ largeText: e.target.checked })} />
      </label>

      <label className="setting toggle">
        <span>効果音</span>
        <input type="checkbox" checked={settings.sound} onChange={(e) => set({ sound: e.target.checked })} />
      </label>

      <button
        className="danger-link"
        onClick={() => {
          if (window.confirm('設定を最初の状態にもどします（学習データはそのまま）。よろしいですか？')) onChange({ ...DEFAULT_SETTINGS })
        }}
      >
        設定を初期値にもどす
      </button>

      <Install />
      <OfflineStatus />
    </section>
  )
}
