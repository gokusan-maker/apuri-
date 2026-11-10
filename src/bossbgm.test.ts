import { afterEach, describe, expect, it, vi } from 'vitest'
import { BARS, BPM, STEPS, bossBgmStep, isBossBgmPlaying, setBossBgmIntense, startBossBgm, stopBossBgm } from './bossbgm'

function fakeAudio() {
  const made: string[] = []
  const param = () => ({ value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {}, cancelScheduledValues() {} })
  const node = (kind: string) => {
    made.push(kind)
    const n = {
      type: '',
      buffer: null,
      gain: param(),
      frequency: param(),
      connect: (x: unknown) => x,
      disconnect() {},
      start() {},
      stop() {},
    }
    return n
  }
  class FakeCtx {
    currentTime = 0
    sampleRate = 8000
    destination = {}
    resume = vi.fn(async () => undefined)
    createGain = () => node('gain')
    createOscillator = () => node('osc')
    createBiquadFilter = () => node('filter')
    createBufferSource = () => node('noise')
    createBuffer = (_c: number, len: number) => ({ getChannelData: () => new Float32Array(len) })
  }
  vi.stubGlobal('AudioContext', FakeCtx)
  return made
}

afterEach(() => {
  stopBossBgm()
  vi.unstubAllGlobals()
  localStorage.clear()
})

describe('ボス戦の BGM', () => {
  // AudioContext は一度作るとつかい回すので、作る前のこのテストを最初にする
  it('音が使えない環境では何もしない', () => {
    startBossBgm()
    expect(isBossBgmPlaying()).toBe(false)
  })

  it('イ短調の Am→F→G→E を4小節でくり返す、速いテンポの戦闘曲', () => {
    expect(STEPS).toBe(64)
    expect(BARS.map((b) => b.root % 12)).toEqual([9, 5, 7, 4]) // ラ・ファ・ソ・ミ
    expect(BARS[0].third).toBe(3) // Am は短調
    expect(BARS[3].third).toBe(4) // E は長三和音（ソ#）で引きしめる
    expect(BPM.normal).toBeGreaterThanOrEqual(140)
    expect(BPM.intense).toBeGreaterThan(BPM.normal)
  })

  it('ベースは8分で刻み、キックは小節の頭、スネアは2拍目と4拍目', () => {
    const bar = Array.from({ length: 16 }, (_, i) => bossBgmStep(i))
    expect(bar.filter((s) => s.bass !== undefined)).toHaveLength(8)
    expect(bar[0].kick && bar[0].bass === 45).toBe(true) // A2
    expect(bar.map((s, i) => (s.snare ? i : -1)).filter((i) => i >= 0)).toEqual([4, 12])
    expect(bossBgmStep(64)).toEqual(bossBgmStep(0)) // 4小節でループ
  })

  it('はげしいモードはドラムが細かくなり、メロディーの音もふえる', () => {
    const count = (intense: boolean, key: 'kick' | 'hat') =>
      Array.from({ length: 16 }, (_, i) => bossBgmStep(i, intense)).filter((s) => s[key]).length
    expect(count(true, 'kick')).toBeGreaterThan(count(false, 'kick'))
    expect(count(true, 'hat')).toBe(16)
    const leads = (intense: boolean) => Array.from({ length: 16 }, (_, i) => bossBgmStep(i, intense)).filter((s) => s.lead !== undefined).length
    expect(leads(true)).toBeGreaterThan(leads(false))
  })

  it('鳴らしはじめると音を作り、止めると止まる', () => {
    const made = fakeAudio()
    startBossBgm()
    expect(isBossBgmPlaying()).toBe(true)
    expect(made.filter((k) => k === 'osc').length).toBeGreaterThan(0)
    setBossBgmIntense(true)
    stopBossBgm()
    expect(isBossBgmPlaying()).toBe(false)
  })

  it('設定で BGM をオフにしていると鳴らさない', () => {
    fakeAudio()
    localStorage.setItem('eitan:settings', JSON.stringify({ bgm: false }))
    startBossBgm()
    expect(isBossBgmPlaying()).toBe(false)
  })

})
