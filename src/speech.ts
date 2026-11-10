// 英語の発音。ウェブ版は Web Speech API（speechSynthesis）、スマホアプリ（Capacitor）は端末の読み上げ機能を使う。
// Android アプリの WebView には speechSynthesis がないので、アプリでは TextToSpeech プラグインで読む。
// 使えない端末では何もしない。速さと米/英は設定に従う。
import { loadSettings } from './settings'
import { isNativeApp } from './ads'

type Part = { text: string; lang?: string; rate: number; pitch?: number }

// アプリ版の読み上げ（プラグインは使うときだけ読みこむ）
type TTS = {
  speak(o: { text: string; lang?: string; rate?: number; pitch?: number; volume?: number; category?: string }): Promise<void>
  stop(): Promise<void>
}
let ttsPromise: Promise<TTS | null> | null = null
function nativeTTS(): Promise<TTS | null> {
  if (!ttsPromise)
    ttsPromise = import('@capacitor-community/text-to-speech').then((m) => m.TextToSpeech as TTS).catch(() => null)
  return ttsPromise
}

// 読み上げのたびに番号をふり、新しい読み上げや停止があったら古い続きは読まない
let generation = 0
// Chrome では読み上げ中の SpeechSynthesisUtterance がごみ集めされると途中で止まる・onend が来ないので、持っておく
let keep: SpeechSynthesisUtterance[] = []
/** いま持っている読み上げの数（テスト用） */
export function keptUtterances(): number {
  return keep.length
}

function hasWebSpeech(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && !!window.speechSynthesis
}

function isNativeSpeech(): boolean {
  return isNativeApp()
}

function play(parts: Part[], pickVoice: (lang: string) => SpeechSynthesisVoice | undefined, onDone?: () => void): void {
  const gen = ++generation
  if (isNativeSpeech()) {
    void nativeTTS().then(async (tts) => {
      if (!tts) {
        if (hasWebSpeech()) playWeb(parts, pickVoice, onDone)
        else onDone?.()
        return
      }
      try {
        await tts.stop()
      } catch {
        // 止めるものがなくてもよい
      }
      for (const p of parts) {
        if (gen !== generation) return
        try {
          // iPhone の消音スイッチが入っていても聞こえるように playback にする
          await tts.speak({ text: p.text, lang: p.lang, rate: p.rate, pitch: p.pitch ?? 1, volume: 1, category: 'playback' })
        } catch {
          // 読めなかった部分はとばす
        }
      }
      if (gen === generation) onDone?.()
    })
    return
  }
  if (!hasWebSpeech()) {
    onDone?.()
    return
  }
  playWeb(parts, pickVoice, onDone)
}

function playWeb(parts: Part[], pickVoice: (lang: string) => SpeechSynthesisVoice | undefined, onDone?: () => void): void {
  const s = window.speechSynthesis
  const us = parts.map((p, i) => {
    const u = new SpeechSynthesisUtterance(p.text)
    u.lang = p.lang ?? ''
    u.rate = p.rate
    if (p.pitch !== undefined) u.pitch = p.pitch
    const v = pickVoice(u.lang)
    if (v) u.voice = v
    if (i === parts.length - 1 && onDone) u.onend = () => onDone()
    return u
  })
  keep = us
  // 読み上げ中に cancel してすぐ speak すると、Chrome では新しい読み上げが消えることがあるので少し待つ
  const busy = !!(s.speaking || s.pending)
  s.cancel()
  const go = () => {
    // Chrome で一時停止のまま固まっていることがあるので、念のため再開してから読む
    s.resume?.()
    us.forEach((u) => s.speak(u))
  }
  if (busy) window.setTimeout(go, 80)
  else go()
}

function voices(): SpeechSynthesisVoice[] {
  if (!hasWebSpeech()) return []
  return window.speechSynthesis.getVoices?.() ?? []
}

// slow：ゆっくり（いつもの半分くらいの速さ）
export function speak(text: string, slow = false): void {
  const { rate, accent, voice: chosen } = loadSettings()
  play([{ text, lang: accent, rate: slow ? Math.max(0.4, rate * 0.55) : rate }], () => {
    const vs = voices()
    // 設定で選んだ声があればそれ、なければ米/英に合う声
    return (chosen && vs.find((v) => v.name === chosen)) || vs.find((v) => v.lang.replace('_', '-') === accent)
  })
}

// 続けて読み上げる（英語→日本語など）。最後まで読んだら onDone。止めるときは cancelSpeech()
export function speakSeq(parts: { text: string; lang?: string }[], onDone: () => void, slow = false): void {
  const { rate, accent } = loadSettings()
  play(
    parts.map((p) => ({ text: p.text, lang: p.lang ?? accent, rate: slow ? Math.max(0.4, rate * 0.7) : rate })),
    () => undefined,
    onDone,
  )
}

export function cancelSpeech(): void {
  generation++
  keep = []
  if (isNativeSpeech()) {
    void nativeTTS().then((tts) => tts?.stop().catch(() => undefined))
    return
  }
  if (hasWebSpeech()) window.speechSynthesis.cancel()
}

// 端末にある英語の声の名前（アプリ版では端末の標準の声を使うので空）
export function englishVoices(): string[] {
  if (isNativeSpeech()) return []
  return voices()
    .filter((v) => v.lang.toLowerCase().startsWith('en'))
    .map((v) => v.name)
}

// 相棒の声：ペットらしく少し高めの声で。lang が ja なら日本語で読む
export function speakPet(text: string, lang: 'ja' | 'en', pitch = 1.5): void {
  const { rate, accent } = loadSettings()
  const l = lang === 'ja' ? 'ja-JP' : accent
  play([{ text, lang: l, rate, pitch }], (ul) => voices().find((v) => v.lang.replace('_', '-').startsWith(ul.slice(0, 2))))
}

// iPhone の Safari などは、最初の読み上げを画面をさわった流れの中でしないと音が出ない。
// 最初のタップで音のない読み上げを一度して、あとの自動読み上げ（リスニング問題）も鳴るようにする
export function unlockSpeechOnFirstTap(): void {
  if (typeof window === 'undefined' || isNativeSpeech() || !hasWebSpeech()) return
  const unlock = () => {
    window.removeEventListener('pointerdown', unlock, true)
    window.removeEventListener('keydown', unlock, true)
    try {
      const s = window.speechSynthesis
      if (s.speaking || s.pending) return
      const u = new SpeechSynthesisUtterance(' ')
      u.volume = 0
      s.speak(u)
    } catch {
      // 読み上げが使えなくても画面はそのまま
    }
  }
  window.addEventListener('pointerdown', unlock, true)
  window.addEventListener('keydown', unlock, true)
}
