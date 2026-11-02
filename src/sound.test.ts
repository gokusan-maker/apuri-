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
  expect(Object.keys(CHIRP_STYLE).sort()).toEqual(['aardvark', 'albatross', 'alpaca', 'anglerfish', 'anteater', 'armadillo', 'auklet', 'avocet', 'axolotl', 'badger', 'baikal', 'bat', 'bear', 'beaver', 'beetle', 'beluga', 'bison', 'boar', 'bullfinch', 'bushbaby', 'butterfly', 'buzzard', 'camel', 'capybara', 'cat', 'chameleon', 'cheetah', 'chicken', 'chinchilla', 'clione', 'clownfish', 'coati', 'condor', 'cormorant', 'crab', 'crane', 'crestedkingfisher', 'cuckoo', 'deer', 'dipper', 'dolphin', 'dragon', 'dragonfly', 'duck', 'dunlin', 'eagle', 'egret', 'eider', 'elephant', 'ermine', 'falcated', 'falcon', 'fennec', 'finch', 'firefly', 'fireflysquid', 'flamingo', 'flycatcher', 'flyingfish', 'flyingsquirrel', 'fox', 'frigatebird', 'frog', 'gadwall', 'gannet', 'garganey', 'gecko', 'giraffe', 'goat', 'goldeneye', 'goldfish', 'gorilla', 'grebe', 'guillemot', 'gull', 'hamster', 'harlequin', 'harrier', 'hedgehog', 'hermitcrab', 'heron', 'hippo', 'honeybee', 'hoopoe', 'hornbill', 'hummingbird', 'ibis', 'jacana', 'jay', 'jellyfish', 'kangaroo', 'kestrel', 'kingfisher', 'kite', 'kittiwake', 'kiwi', 'koala', 'koi', 'ladybug', 'lark', 'lemming', 'lemur', 'lion', 'lizard', 'longtail', 'longtailedtit', 'lynx', 'macaque', 'magpie', 'manatee', 'mandarinduck', 'manta', 'mantis', 'marten', 'meerkat', 'merganser', 'mink', 'mochi', 'mole', 'molecricket', 'moose', 'mouse', 'mudskipper', 'narwhal', 'nautilus', 'newt', 'nightjar', 'nuthatch', 'octopus', 'okapi', 'orientalcuckoo', 'ostrich', 'otter', 'owl', 'oystercatcher', 'panda', 'pangolin', 'parrot', 'peacock', 'pelican', 'penguin', 'petrel', 'pheasant', 'phoenix', 'pig', 'pika', 'pintail', 'platypus', 'pochard', 'polarbear', 'ptarmigan', 'pufferfish', 'puffin', 'pygmywoodpecker', 'quail', 'quokka', 'rabbit', 'raccoon', 'redcrest', 'redpanda', 'redstart', 'reindeer', 'rhino', 'robin', 'rosefinch', 'salamander', 'sandpiper', 'scaup', 'scoter', 'seahorse', 'seal', 'sealion', 'seaurchin', 'shearwater', 'sheep', 'shoebill', 'shoveler', 'shrew', 'shrimp', 'skimmer', 'skua', 'skunk', 'sloth', 'smew', 'snail', 'snowleopard', 'sparrow', 'squid', 'squirrel', 'stagbeetle', 'starfish', 'starling', 'stork', 'sunfish', 'swallow', 'swan', 'swift', 'tanuki', 'tapir', 'tarsier', 'teal', 'tern', 'thrush', 'tiger', 'toucan', 'treecreeper', 'treefrog', 'tropicbird', 'turtle', 'vole', 'wagtail', 'walrus', 'waxwing', 'whale', 'whiteeye', 'wigeon', 'wolf', 'wombat', 'woodpecker', 'wren', 'yak', 'zebra'])
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
