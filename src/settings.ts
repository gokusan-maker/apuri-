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
  color: ThemeColor // テーマカラー
  hideExampleJa: boolean // カード裏の例文の訳を隠す（タップで表示）
  randomNew: boolean // 新しい単語をランダムな順に出す
  testDate: string // 定期テストの日（YYYY-MM-DD、なしは空）
  reviewCap: number // 1日の復習の上限（0はなし）
  easy: boolean // かんたんモード：4択クイズの選択肢を3つにする
  newPerDay: number // 1日の新しい単語の数
  voice: string // 読み上げの声の名前（空は自動）
}

export type ThemeColor = 'blue' | 'pink' | 'green' | 'orange'

export const THEME_COLORS: { id: ThemeColor; label: string; value: string }[] = [
  { id: 'blue', label: 'あお', value: '#2563eb' },
  { id: 'pink', label: 'ピンク', value: '#db2777' },
  { id: 'green', label: 'みどり', value: '#16a34a' },
  { id: 'orange', label: 'オレンジ', value: '#ea580c' },
]

export const GOALS = [10, 20, 30, 50]
export const REVIEW_CAPS = [0, 30, 50, 100]
export const NEW_PER_DAY = [5, 10, 15, 20]

export const DEFAULT_SETTINGS: Settings = {
  rate: 1,
  accent: 'en-US',
  theme: 'system',
  sound: true,
  dailyGoal: 20,
  autoSpeak: false,
  cardJaFirst: false,
  largeText: false,
  color: 'blue',
  hideExampleJa: false,
  randomNew: false,
  testDate: '',
  reviewCap: 0,
  easy: false,
  newPerDay: 10,
  voice: '',
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
      color: THEME_COLORS.some((c) => c.id === v.color) ? (v.color as ThemeColor) : 'blue',
      hideExampleJa: v.hideExampleJa === true,
      randomNew: v.randomNew === true,
      easy: v.easy === true,
      voice: typeof v.voice === 'string' ? v.voice.slice(0, 100) : '',
      newPerDay: NEW_PER_DAY.includes(v.newPerDay as number) ? (v.newPerDay as number) : 10,
      reviewCap: REVIEW_CAPS.includes(v.reviewCap as number) ? (v.reviewCap as number) : 0,
      testDate: typeof v.testDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v.testDate) ? v.testDate : '',
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

// テーマカラー（ボタンなどの色）。ブラウザのバーの色も合わせる
export function applyColor(color: ThemeColor, root: HTMLElement = document.documentElement): void {
  const c = THEME_COLORS.find((x) => x.id === color) ?? THEME_COLORS[0]
  if (color === 'blue') root.style.removeProperty('--accent')
  else root.style.setProperty('--accent', c.value)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', c.value)
}
