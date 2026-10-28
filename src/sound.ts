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

// コンボ音：連続正解するほど高くなる（半音ずつ、最大1オクターブ）
export const comboPitch = (combo: number) => 2 ** (Math.min(Math.max(combo - 1, 0), 12) / 12)

export function playComboCorrect(combo: number) {
  if (!ready()) return
  const k = comboPitch(combo)
  tone(880 * k, 0, 0.12)
  tone(1320 * k, 0.1, 0.18)
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
  owl: { pitch: 0.75, steps: [1, 1, 0.9] }, // ホーホー
  turtle: { pitch: 0.7, steps: [1, 1.1] }, // のそっ
  hamster: { pitch: 1.4, steps: [1, 1.2, 1.4] }, // チュチュッ
  sheep: { pitch: 0.85, steps: [1, 1.05, 1, 1.05] }, // メェ〜
  squirrel: { pitch: 1.35, steps: [1, 1.3, 1.1] }, // キキッ
  panda: { pitch: 0.8, steps: [1, 0.9] }, // むぐむぐ
  lion: { pitch: 0.55, steps: [1, 1.2, 0.8] }, // ガオー
  elephant: { pitch: 0.5, steps: [1, 1.5, 1.2] }, // パオーン
  koala: { pitch: 0.7, steps: [1, 0.85, 0.7] }, // ふぁ〜あ
  hedgehog: { pitch: 1.5, steps: [1, 1.1, 1, 1.1] }, // ふんふん
  pelican: { pitch: 0.9, steps: [1, 1.2] }, // ぐわっ
  seal: { pitch: 0.8, steps: [1, 0.9, 1.1] }, // おうっおうっ
  flamingo: { pitch: 1.1, steps: [1, 1.3, 1.1] }, // ほろろ
  otter: { pitch: 1.4, steps: [1, 1.2, 1.4] }, // きゅっきゅっ
  bear: { pitch: 0.6, steps: [1, 0.9] }, // ぐおー
  giraffe: { pitch: 1.0, steps: [0.9, 1.1, 1.3] }, // ふおーん
  frog: { pitch: 0.9, steps: [1, 1.3, 1, 1.3] }, // けろけろ
  raccoon: { pitch: 1.3, steps: [1, 1.15, 0.95] }, // きゅるる
  sloth: { pitch: 0.65, steps: [1, 0.95, 0.9, 0.85] }, // ふぁ〜あ…
  alpaca: { pitch: 1.2, steps: [1, 1.1, 0.9] }, // ふぇ〜
  mole: { pitch: 1.0, steps: [1, 0.9, 1] }, // もぐもぐ
  dolphin: { pitch: 1.8, steps: [1, 1.25, 1.5] }, // キュイッ
  hippo: { pitch: 0.55, steps: [1, 0.9, 1] }, // ぶふぉー
  crab: { pitch: 1.6, steps: [1, 1, 1.2] }, // チョキチョキ
  tiger: { pitch: 0.75, steps: [1, 0.85] }, // がおっ
  chameleon: { pitch: 1.1, steps: [1, 1.2, 1, 0.8] }, // くるる
  swan: { pitch: 1.0, steps: [1, 1.15, 1.3] }, // こーこー
  peacock: { pitch: 1.3, steps: [1, 1.4, 1.2] }, // ケーン
  wolf: { pitch: 0.8, steps: [1, 1.3, 1.5, 1.2] }, // わお〜ん
  parrot: { pitch: 1.6, steps: [1, 1.2, 1, 1.2] }, // ぴゅるっ
  bat: { pitch: 2.0, steps: [1, 1.1, 1.2] }, // きっきっ
  seahorse: { pitch: 1.5, steps: [1, 0.9, 1.1] }, // ぷくぷく
  camel: { pitch: 0.7, steps: [1, 0.95, 1.05] }, // ぶるる
  polarbear: { pitch: 0.6, steps: [1, 0.9, 1] }, // のっし
  octopus: { pitch: 1.2, steps: [1, 1.3, 1, 1.3] }, // ぷくぷく
}

export function playChirp(stage: number, species = 'mochi') {
  if (!ready()) return
  const st = CHIRP_STYLE[species] ?? CHIRP_STYLE.mochi
  const f = chirpFreq(stage) * st.pitch
  st.steps.forEach((k, i) => tone(f * k, i * 0.07, 0.09))
}

// ボス戦の効果音（周波数, はじまり秒, 長さ秒）
export const BOSS_SOUNDS = {
  appear: [[196, 0, 0.25], [185, 0.22, 0.25], [147, 0.44, 0.5]],
  crit: [[880, 0, 0.08], [1175, 0.07, 0.15]],
  special: [[392, 0, 0.1], [523, 0.08, 0.1], [659, 0.16, 0.1], [1047, 0.24, 0.35]],
  victory: [[523, 0, 0.15], [523, 0.15, 0.15], [523, 0.3, 0.15], [659, 0.45, 0.2], [587, 0.65, 0.15], [784, 0.8, 0.5]],
} satisfies Record<string, [number, number, number][]>

export function playBossSound(kind: keyof typeof BOSS_SOUNDS) {
  if (!ready()) return
  BOSS_SOUNDS[kind].forEach(([f, start, dur]) => tone(f, start, dur))
}

// ガチャの演出の音（カプセルが落ちる・ゆれる・確定・われる・登場）
export const GACHA_SOUNDS = {
  drop: [[220, 0, 0.08], [165, 0.09, 0.12]],
  shake: [[660, 0, 0.05], [700, 0.12, 0.05], [740, 0.24, 0.05]],
  omen: [[523, 0, 0.12], [659, 0.1, 0.12], [784, 0.2, 0.12], [1047, 0.3, 0.12], [1319, 0.42, 0.4]],
  crack: [[1200, 0, 0.04], [900, 0.05, 0.06], [1500, 0.12, 0.08]],
  reveal: [[523, 0, 0.12], [659, 0.12, 0.12], [784, 0.24, 0.12], [1047, 0.36, 0.45]],
  revealRare: [[523, 0, 0.1], [659, 0.1, 0.1], [784, 0.2, 0.1], [1047, 0.3, 0.1], [1319, 0.42, 0.1], [1568, 0.54, 0.6]],
} satisfies Record<string, [number, number, number][]>

export function playGachaSound(kind: keyof typeof GACHA_SOUNDS) {
  if (!ready()) return
  GACHA_SOUNDS[kind].forEach(([f, start, dur]) => tone(f, start, dur))
}
