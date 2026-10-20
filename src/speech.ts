// 英語の発音（Web Speech API）。使えない端末では何もしない。
export function speak(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'en-US'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(u)
}
