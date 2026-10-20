import { speak } from './speech'
import type { Accent, Settings, Theme } from './settings'

type Props = {
  settings: Settings
  onChange: (s: Settings) => void
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

export function SettingsPanel({ settings, onChange }: Props) {
  const set = (patch: Partial<Settings>) => onChange({ ...settings, ...patch })
  return (
    <section className="card settings">
      <h2>設定</h2>

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

      <label className="setting toggle">
        <span>効果音</span>
        <input type="checkbox" checked={settings.sound} onChange={(e) => set({ sound: e.target.checked })} />
      </label>
    </section>
  )
}
