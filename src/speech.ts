// 英語の発音（Web Speech API）。使えない端末では何もしない。速さと米/英は設定に従う。
import { loadSettings } from './settings'

// slow：ゆっくり（いつもの半分くらいの速さ）
export function speak(text: string, slow = false): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const { rate, accent } = loadSettings()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = accent
  u.rate = slow ? Math.max(0.4, rate * 0.55) : rate
  const voice = window.speechSynthesis.getVoices?.().find((v) => v.lang.replace('_', '-') === accent)
  if (voice) u.voice = voice
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}

// 続けて読み上げる（英語→日本語など）。最後まで読んだら onDone。止めるときは cancelSpeech()
export function speakSeq(parts: { text: string; lang?: string }[], onDone: () => void): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onDone()
    return
  }
  const { rate, accent } = loadSettings()
  window.speechSynthesis.cancel()
  parts.forEach((p, i) => {
    const u = new SpeechSynthesisUtterance(p.text)
    u.lang = p.lang ?? accent
    u.rate = rate
    if (i === parts.length - 1) u.onend = () => onDone()
    window.speechSynthesis.speak(u)
  })
}

export function cancelSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel()
}
