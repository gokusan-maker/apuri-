// 正解・不正解の短い効果音（Web Audio）。使えない環境では何もしない。
let ctx: AudioContext | null = null

function tone(freq: number, start: number, dur: number) {
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0.15, ctx.currentTime + start)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur)
  osc.connect(gain).connect(ctx.destination)
  osc.start(ctx.currentTime + start)
  osc.stop(ctx.currentTime + start + dur)
}

function ready(): boolean {
  try {
    if (!ctx) {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AC) return false
      ctx = new AC()
    }
    return true
  } catch {
    return false
  }
}

export function playCorrect() {
  if (!ready()) return
  tone(880, 0, 0.12)
  tone(1320, 0.1, 0.18)
}

export function playWrong() {
  if (!ready()) return
  tone(220, 0, 0.25)
}
