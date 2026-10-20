// 単語帳（レベル）の選択。端末に保存する。
import { LEVELS, type Level } from './words'

const STORAGE_KEY = 'eitan:levels'

export function loadLevels(): Level[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as unknown) : null
    if (Array.isArray(v)) {
      const ok = LEVELS.filter((l) => v.includes(l))
      if (ok.length > 0) return ok
    }
  } catch {
    // 壊れていたら初期値
  }
  return [...LEVELS]
}

export function saveLevels(levels: Level[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(levels))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 1つは必ず選ばれている状態を保つ
export function toggleLevel(levels: Level[], l: Level): Level[] {
  const next = levels.includes(l) ? levels.filter((x) => x !== l) : [...levels, l]
  return next.length === 0 ? levels : LEVELS.filter((x) => next.includes(x))
}

// アプリの設定
export type Theme = 'system' | 'light' | 'dark'
export type Accent = 'en-US' | 'en-GB'

export type Settings = {
  rate: number // 発音の速さ 0.5〜1.5
  accent: Accent
  theme: Theme
  sound: boolean // 効果音
  dailyGoal: number // 1日の目標（問題数）
  autoSpeak: boolean // カードを出したら自動で発音
  cardJaFirst: boolean // カードを日本語→英語にする
  largeText: boolean // 文字を大きくする
}

export const GOALS = [10, 20, 30, 50]

export const DEFAULT_SETTINGS: Settings = {
  rate: 1,
  accent: 'en-US',
  theme: 'system',
  sound: true,
  dailyGoal: 20,
  autoSpeak: false,
  cardJaFirst: false,
  largeText: false,
}

const SETTINGS_KEY = 'eitan:settings'

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    const v = raw ? (JSON.parse(raw) as Partial<Settings>) : {}
    return {
      rate: typeof v.rate === 'number' && v.rate >= 0.5 && v.rate <= 1.5 ? v.rate : DEFAULT_SETTINGS.rate,
      accent: v.accent === 'en-GB' ? 'en-GB' : 'en-US',
      theme: v.theme === 'light' || v.theme === 'dark' ? v.theme : 'system',
      sound: typeof v.sound === 'boolean' ? v.sound : true,
      dailyGoal: typeof v.dailyGoal === 'number' && GOALS.includes(v.dailyGoal) ? v.dailyGoal : DEFAULT_SETTINGS.dailyGoal,
      autoSpeak: v.autoSpeak === true,
      cardJaFirst: v.cardJaFirst === true,
      largeText: v.largeText === true,
    }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(s: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

export function applyTheme(theme: Theme, root: HTMLElement = document.documentElement): void {
  if (theme === 'system') delete root.dataset.theme
  else root.dataset.theme = theme
}

// 文字の大きさ。rem で作っているので html の文字サイズを変えると全体が大きくなる
export function applyTextSize(large: boolean, root: HTMLElement = document.documentElement): void {
  root.style.fontSize = large ? '112.5%' : ''
}
