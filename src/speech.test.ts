import { afterEach, describe, expect, it, vi } from 'vitest'

const ttsSpoken: { text: string; lang?: string; category?: string }[] = []
vi.mock('@capacitor-community/text-to-speech', () => ({
  TextToSpeech: {
    speak: vi.fn(async (o: { text: string; lang?: string; category?: string }) => {
      ttsSpoken.push(o)
    }),
    stop: vi.fn(async () => undefined),
  },
}))

import { cancelSpeech, englishVoices, speak, speakSeq, unlockSpeechOnFirstTap } from './speech'

class FakeUtterance {
  text: string
  lang = ''
  rate = 1
  pitch = 1
  volume = 1
  voice: unknown = null
  onend: (() => void) | null = null
  constructor(t: string) {
    this.text = t
  }
}

function fakeSynth(opts: { speaking?: boolean } = {}) {
  const spoken: FakeUtterance[] = []
  const synth = {
    speaking: !!opts.speaking,
    pending: false,
    cancel: vi.fn(),
    resume: vi.fn(),
    speak: vi.fn((u: FakeUtterance) => spoken.push(u)),
    getVoices: () => [],
  }
  vi.stubGlobal('SpeechSynthesisUtterance', FakeUtterance)
  Object.defineProperty(window, 'speechSynthesis', { value: synth, configurable: true, writable: true })
  return { synth, spoken }
}

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  delete (window as unknown as { Capacitor?: unknown }).Capacitor
  ttsSpoken.length = 0
})

describe('発音の読み上げ', () => {
  it('ウェブ版は speechSynthesis で読み、固まったときのために resume してから読む', () => {
    const { synth, spoken } = fakeSynth()
    speak('apple')
    expect(synth.resume).toHaveBeenCalled()
    expect(spoken.map((u) => u.text)).toEqual(['apple'])
  })

  it('読み上げ中に次を読むときは、cancel のあと少し待ってから読む（Chrome で消えないように）', () => {
    vi.useFakeTimers()
    const { synth, spoken } = fakeSynth({ speaking: true })
    speak('banana')
    expect(synth.cancel).toHaveBeenCalled()
    expect(spoken).toHaveLength(0)
    vi.advanceTimersByTime(100)
    expect(spoken.map((u) => u.text)).toEqual(['banana'])
  })

  it('アプリ版（Android の WebView には speechSynthesis がない）は端末の読み上げで読む', async () => {
    ;(window as unknown as { Capacitor: unknown }).Capacitor = { isNativePlatform: () => true, getPlatform: () => 'android' }
    Object.defineProperty(window, 'speechSynthesis', { value: undefined, configurable: true, writable: true })
    speak('listen')
    await vi.waitFor(() => expect(ttsSpoken.map((o) => o.text)).toEqual(['listen']))
    expect(ttsSpoken[0].category).toBe('playback')
    expect(englishVoices()).toEqual([])
  })

  it('アプリ版で続けて読むと順に読み、最後に onDone。止めると続きは読まない', async () => {
    ;(window as unknown as { Capacitor: unknown }).Capacitor = { isNativePlatform: () => true }
    const done = vi.fn()
    speakSeq([{ text: 'one' }, { text: 'いち', lang: 'ja-JP' }], done)
    await vi.waitFor(() => expect(done).toHaveBeenCalled())
    expect(ttsSpoken.map((o) => o.text)).toEqual(['one', 'いち'])
    ttsSpoken.length = 0
    const done2 = vi.fn()
    speakSeq([{ text: 'two' }, { text: 'three' }], done2)
    cancelSpeech()
    await new Promise((r) => setTimeout(r, 20))
    expect(done2).not.toHaveBeenCalled()
    expect(ttsSpoken).toHaveLength(0)
  })

  it('最初のタップで音のない読み上げをして、iPhone でも自動読み上げが鳴るようにする', () => {
    const { spoken } = fakeSynth()
    unlockSpeechOnFirstTap()
    window.dispatchEvent(new Event('pointerdown'))
    window.dispatchEvent(new Event('pointerdown'))
    expect(spoken).toHaveLength(1)
    expect(spoken[0].volume).toBe(0)
  })
})
