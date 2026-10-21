// 正解・不正解の短い効果音（Web Audio）。使えない環境や設定でオフのときは鳴らさない。
import { loadSettings } from './settings'

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
  if (!loadSettings().sound) return false
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

// レベルアップ・進化のファンファーレ（ド・ミ・ソ・ド）
export function playFanfare() {
  if (!ready()) return
  ;[523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, i === 3 ? 0.4 : 0.15))
}

// 相棒の鳴き声：小さいすがたほど高い声（ピッ・ピュイ）
export function chirpFreq(stage: number): number {
  return Math.max(400, 1400 - stage * 200)
}

// キャラクターごとの鳴き声のちがい：音の高さの倍率と、音の並び（倍率）
export const CHIRP_STYLE: Record<string, { pitch: number; steps: number[] }> = {
  mochi: { pitch: 1, steps: [1, 1.25] },
  fox: { pitch: 1.1, steps: [1, 1.5, 1.2] }, // コンコン
  penguin: { pitch: 0.9, steps: [1, 0.85, 1] }, // ペッペッ
  rabbit: { pitch: 1.3, steps: [1.2, 1.4] }, // ぴょこっ
  cat: { pitch: 1.15, steps: [1.3, 1, 0.8] }, // ニャーオ
  dragon: { pitch: 0.6, steps: [1, 0.8, 1.2] }, // ガオー
}

export function playChirp(stage: number, species = 'mochi') {
  if (!ready()) return
  const st = CHIRP_STYLE[species] ?? CHIRP_STYLE.mochi
  const f = chirpFreq(stage) * st.pitch
  st.steps.forEach((k, i) => tone(f * k, i * 0.07, 0.09))
}
