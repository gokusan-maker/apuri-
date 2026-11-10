// ボス戦の BGM（Web Audio でその場で作る。音のファイルはいらない）。
// イ短調で Am → F → G → E をくり返す、速いテンポの戦闘曲。ベースは8分音符で刻み、
// 上は16分音符のアルペジオ、ドラムはキック・スネア・ハイハット。
// ピンチ（ハート1つ）やボスの怒り状態では「はげしい」モードになり、テンポが上がってドラムが細かくなる。
// 設定の「ボス戦の BGM」がオフのとき・音が使えない環境では鳴らさない。
import { audioContext } from './sound'
import { loadSettings } from './settings'

export const STEPS = 64 // 16分音符 × 16 × 4小節
export const BPM = { normal: 150, intense: 172 }

// 各小節の根音（MIDI）と、和音の3度（短3度=3, 長3度=4）
export const BARS: { root: number; third: number }[] = [
  { root: 57, third: 3 }, // Am（ラ・ド・ミ）
  { root: 53, third: 4 }, // F（ファ・ラ・ド）
  { root: 55, third: 4 }, // G（ソ・シ・レ）
  { root: 52, third: 4 }, // E（ミ・ソ#・シ）…短調の曲を引きしめる和音
]

// ベース：8分音符で根音・オクターブ・5度を刻む
const BASS = [0, 0, 12, 0, 0, 12, 7, 12]
// 上のメロディー：和音の音（0=根音 1=3度 2=5度 3=オクターブ）を16分で。null は休み
const LEAD: (number | null)[] = [0, null, 0, 1, 2, null, 3, null, 2, 1, null, 0, 1, null, 2, null]

export type Step = { bass?: number; lead?: number; kick: boolean; snare: boolean; hat: boolean }

/** 何ステップ目に何を鳴らすか（音の高さは MIDI 番号） */
export function bossBgmStep(step: number, intense = false): Step {
  const s = ((step % STEPS) + STEPS) % STEPS
  const bar = BARS[Math.floor(s / 16)]
  const i = s % 16
  const deg = LEAD[i]
  const tones = [0, bar.third, 7, 12]
  return {
    bass: i % 2 === 0 ? bar.root - 12 + BASS[i / 2] : undefined,
    lead: deg === null ? (intense && i % 2 === 1 ? bar.root + 24 : undefined) : bar.root + 12 + tones[deg],
    kick: i === 0 || i === 8 || i === 10 || (intense && (i === 3 || i === 14)),
    snare: i === 4 || i === 12 || (intense && i === 15),
    hat: intense ? true : i % 2 === 0,
  }
}

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12)

let master: GainNode | null = null
let timer: number | null = null
let nextTime = 0
let step = 0
let intense = false
let noise: AudioBuffer | null = null

function noiseBuffer(ctx: AudioContext): AudioBuffer {
  if (noise) return noise
  const b = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.3), ctx.sampleRate)
  const d = b.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
  noise = b
  return b
}

function note(ctx: AudioContext, out: AudioNode, type: OscillatorType, f: number, t: number, dur: number, vol: number, cutoff?: number) {
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = type
  o.frequency.setValueAtTime(f, t)
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  if (cutoff) {
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = cutoff
    o.connect(lp).connect(g)
  } else o.connect(g)
  g.connect(out)
  o.start(t)
  o.stop(t + dur + 0.02)
}

function kick(ctx: AudioContext, out: AudioNode, t: number) {
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.frequency.setValueAtTime(140, t)
  o.frequency.exponentialRampToValueAtTime(45, t + 0.12)
  g.gain.setValueAtTime(0.9, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
  o.connect(g).connect(out)
  o.start(t)
  o.stop(t + 0.2)
}

function hiss(ctx: AudioContext, out: AudioNode, t: number, dur: number, vol: number, from: number) {
  const src = ctx.createBufferSource()
  src.buffer = noiseBuffer(ctx)
  const hp = ctx.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = from
  const g = ctx.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(hp).connect(g).connect(out)
  src.start(t)
  src.stop(t + dur + 0.02)
}

function schedule(ctx: AudioContext, out: AudioNode, s: number, t: number, sixteenth: number) {
  const n = bossBgmStep(s, intense)
  if (n.bass !== undefined) note(ctx, out, 'sawtooth', hz(n.bass), t, sixteenth * 1.8, 0.32, 700)
  if (n.lead !== undefined) note(ctx, out, 'square', hz(n.lead), t, sixteenth * 0.9, 0.09, 2600)
  // 1小節目の頭に低い和音を重ねて、戦いの重さを出す
  if (s % 16 === 0) {
    const bar = BARS[Math.floor((s % STEPS) / 16)]
    for (const k of [0, bar.third, 7]) note(ctx, out, 'sawtooth', hz(bar.root + k), t, sixteenth * 14, 0.05, 1200)
  }
  if (n.kick) kick(ctx, out, t)
  if (n.snare) hiss(ctx, out, t, 0.14, 0.45, 1200)
  if (n.hat) hiss(ctx, out, t, 0.04, 0.12, 7000)
}

function tick() {
  const ctx = audioContext()
  if (!ctx || !master) return
  // 画面を見ていないあいだは先の分をためこまない
  if (typeof document !== 'undefined' && document.hidden) {
    nextTime = ctx.currentTime + 0.05
    return
  }
  const sixteenth = 60 / (intense ? BPM.intense : BPM.normal) / 4
  if (nextTime < ctx.currentTime) nextTime = ctx.currentTime + 0.02
  while (nextTime < ctx.currentTime + 0.12) {
    schedule(ctx, master, step, nextTime, sixteenth)
    nextTime += sixteenth
    step = (step + 1) % STEPS
  }
}

export function isBossBgmPlaying(): boolean {
  return timer !== null
}

/** ボス戦の BGM を鳴らしはじめる（もう鳴っていれば何もしない） */
export function startBossBgm(): void {
  if (timer !== null || typeof window === 'undefined' || !loadSettings().bgm) return
  const ctx = audioContext()
  if (!ctx) return
  try {
    void ctx.resume?.()
    master = ctx.createGain()
    // 発音（リスニング）や効果音が聞こえるように小さめに。フェードインで始める
    master.gain.setValueAtTime(0.0001, ctx.currentTime)
    master.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.8)
    master.connect(ctx.destination)
  } catch {
    master = null
    return
  }
  step = 0
  nextTime = ctx.currentTime + 0.05
  timer = window.setInterval(tick, 25)
  tick()
}

/** ピンチや怒り状態のときははげしい曲調にする */
export function setBossBgmIntense(on: boolean): void {
  intense = on
}

/** BGM を止める（少しフェードアウト） */
export function stopBossBgm(): void {
  if (timer !== null) window.clearInterval(timer)
  timer = null
  intense = false
  const ctx = audioContext()
  const m = master
  master = null
  if (!ctx || !m) return
  try {
    m.gain.cancelScheduledValues(ctx.currentTime)
    m.gain.setValueAtTime(Math.max(m.gain.value, 0.0001), ctx.currentTime)
    m.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4)
    window.setTimeout(() => m.disconnect(), 500)
  } catch {
    m.disconnect()
  }
}
