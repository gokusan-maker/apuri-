// 英語の発音（Web Speech API）。使えない端末では何もしない。速さと米/英は設定に従う。
import { loadSettings } from './settings'

export function speak(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const { rate, accent } = loadSettings()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = accent
  u.rate = rate
  const voice = window.speechSynthesis.getVoices?.().find((v) => v.lang.replace('_', '-') === accent)
  if (voice) u.voice = voice
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}
