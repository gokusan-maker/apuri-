import { afterEach, describe, expect, it } from 'vitest'
import { CHIRP_STYLE, chirpFreq } from './sound'

describe('効果音', () => {
  afterEach(() => {
    localStorage.clear()
    delete (window as unknown as { AudioContext?: unknown }).AudioContext
  })

  it('ファンファーレは4つの音。効果音オフなら鳴らさない', async () => {
    let started = 0
    class FakeCtx {
      currentTime = 0
      destination = {}
      createOscillator() {
        return { type: '', frequency: { value: 0 }, connect: (x: unknown) => x, start: () => started++, stop() {} }
      }
      createGain() {
        const g = { gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect: (x: unknown) => x }
        return g
      }
    }
    Object.assign(window, { AudioContext: FakeCtx })
    const { playFanfare } = await import('./sound')
    playFanfare()
    expect(started).toBe(4)
    localStorage.setItem('eitan:settings', JSON.stringify({ sound: false }))
    playFanfare()
    expect(started).toBe(4)
  })
})

it('鳴き声は小さいすがたほど高い', () => {
  expect(chirpFreq(0)).toBeGreaterThan(chirpFreq(2))
  expect(chirpFreq(10)).toBe(400)
})

it('キャラクターごとに鳴き声の高さと並びがちがう', () => {
  expect(Object.keys(CHIRP_STYLE).sort()).toEqual(['alpaca', 'anteater', 'armadillo', 'axolotl', 'badger', 'bat', 'bear', 'beaver', 'beetle', 'bison', 'butterfly', 'camel', 'capybara', 'cat', 'chameleon', 'cheetah', 'chicken', 'chinchilla', 'clione', 'coati', 'crab', 'deer', 'dolphin', 'dragon', 'duck', 'eagle', 'elephant', 'fennec', 'firefly', 'fireflysquid', 'flamingo', 'flyingfish', 'flyingsquirrel', 'fox', 'frog', 'gecko', 'giraffe', 'goat', 'hamster', 'hedgehog', 'hermitcrab', 'hippo', 'hornbill', 'hummingbird', 'jellyfish', 'kangaroo', 'kingfisher', 'kiwi', 'koala', 'koi', 'ladybug', 'lemur', 'lion', 'lynx', 'manatee', 'mandarinduck', 'manta', 'mantis', 'meerkat', 'mochi', 'mole', 'molecricket', 'mouse', 'narwhal', 'octopus', 'okapi', 'ostrich', 'otter', 'owl', 'panda', 'pangolin', 'parrot', 'peacock', 'pelican', 'penguin', 'phoenix', 'pig', 'pika', 'platypus', 'polarbear', 'pufferfish', 'puffin', 'quokka', 'rabbit', 'raccoon', 'redpanda', 'reindeer', 'seahorse', 'seal', 'sheep', 'shoebill', 'sloth', 'snail', 'snowleopard', 'squid', 'squirrel', 'stagbeetle', 'starfish', 'sunfish', 'swan', 'tanuki', 'tapir', 'tarsier', 'tiger', 'toucan', 'turtle', 'walrus', 'whale', 'wolf', 'woodpecker', 'yak', 'zebra'])
  expect(CHIRP_STYLE.dragon.pitch).toBeLessThan(CHIRP_STYLE.rabbit.pitch)
})

it('ボス戦の効果音がそろっていて、音を切っていれば鳴らさない', async () => {
  const { BOSS_SOUNDS, playBossSound } = await import('./sound')
  expect(Object.keys(BOSS_SOUNDS).sort()).toEqual(['appear', 'crit', 'special', 'victory'])
  for (const notes of Object.values(BOSS_SOUNDS)) for (const [f, , d] of notes) expect(f > 100 && d > 0).toBe(true)
  localStorage.setItem('eitan:settings', JSON.stringify({ sound: false }))
  expect(() => playBossSound('victory')).not.toThrow()
})

it('コンボ音は連続正解するほど高くなり、1オクターブで止まる', async () => {
  const { comboPitch } = await import('./sound')
  expect(comboPitch(1)).toBe(1)
  expect(comboPitch(0)).toBe(1)
  expect(comboPitch(2)).toBeGreaterThan(comboPitch(1))
  expect(comboPitch(13)).toBeCloseTo(2)
  expect(comboPitch(30)).toBeCloseTo(2)
})
