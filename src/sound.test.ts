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
  expect(Object.keys(CHIRP_STYLE).sort()).toEqual(['aardvark', 'albatross', 'alpaca', 'anglerfish', 'anteater', 'armadillo', 'ashyminivet', 'asianbrownflycatcher', 'auklet', 'avocet', 'axolotl', 'badger', 'baikal', 'bamboopartridge', 'bat', 'bear', 'beaver', 'beetle', 'beluga', 'bison', 'blackwoodpecker', 'blackwoodpigeon', 'bluetail', 'boar', 'brownheadedthrush', 'bulbul', 'bullfinch', 'bunting', 'bushbaby', 'bushwarbler', 'butterfly', 'buzzard', 'camel', 'capybara', 'cat', 'cattleegret', 'chameleon', 'cheetah', 'chicken', 'chinchilla', 'clione', 'clownfish', 'coati', 'condor', 'copperpheasant', 'cormorant', 'crab', 'crane', 'crestedkingfisher', 'cuckoo', 'deer', 'dipper', 'dollarbird', 'dolphin', 'dragon', 'dragonfly', 'duck', 'dunlin', 'duskythrush', 'eagle', 'egret', 'eider', 'elephant', 'ermine', 'falcated', 'falcon', 'fennec', 'finch', 'firefly', 'fireflysquid', 'flamingo', 'flycatcher', 'flyingfish', 'flyingsquirrel', 'fox', 'frigatebird', 'frog', 'gadwall', 'gannet', 'garganey', 'gecko', 'giraffe', 'goat', 'goldcrest', 'goldeneye', 'goldfish', 'gorilla', 'goshawk', 'greattit', 'grebe', 'greenfinch', 'greystreakedflycatcher', 'guillemot', 'gull', 'hamster', 'harlequin', 'harrier', 'hawfinch', 'hawkeagle', 'hedgehog', 'hermitcrab', 'heron', 'hippo', 'honeybee', 'hoopoe', 'hornbill', 'hummingbird', 'ibis', 'jacana', 'japanesegreenwoodpecker', 'japanesegrosbeak', 'japanesethrush', 'japanesewagtail', 'jay', 'jellyfish', 'kangaroo', 'kestrel', 'kingfisher', 'kite', 'kittiwake', 'kiwi', 'koala', 'koi', 'ladybug', 'lark', 'lathamssnipe', 'lemming', 'lemur', 'lessercuckoo', 'lidthsjay', 'lion', 'lizard', 'longtail', 'longtailedtit', 'lynx', 'macaque', 'magpie', 'manatee', 'mandarinduck', 'manta', 'mantis', 'marten', 'meerkat', 'merganser', 'mink', 'mochi', 'mole', 'molecricket', 'moose', 'mouse', 'mudskipper', 'narcissusflycatcher', 'narwhal', 'nautilus', 'newt', 'nightheron', 'nightjar', 'nutcracker', 'nuthatch', 'octopus', 'okapi', 'orientalcuckoo', 'orientalturtledove', 'ostrich', 'otter', 'owl', 'oystercatcher', 'panda', 'pangolin', 'paradiseflycatcher', 'parrot', 'peacock', 'pelican', 'penguin', 'petrel', 'pheasant', 'phoenix', 'pig', 'pika', 'pintail', 'pitta', 'platypus', 'pochard', 'polarbear', 'ptarmigan', 'pufferfish', 'puffin', 'pygmywoodpecker', 'quail', 'quokka', 'rabbit', 'raccoon', 'redcrest', 'redpanda', 'redstart', 'reedwarbler', 'reindeer', 'rhino', 'robin', 'rosefinch', 'ruddykingfisher', 'salamander', 'sandpiper', 'scalythrush', 'scaup', 'scoter', 'seahorse', 'seal', 'sealion', 'seaurchin', 'shearwater', 'sheep', 'shoebill', 'shoveler', 'shrew', 'shrimp', 'siberianblue', 'siberianrubythroat', 'siberianthrush', 'siskin', 'skimmer', 'skua', 'skunk', 'sloth', 'smew', 'snail', 'snowleopard', 'sparrow', 'squid', 'squirrel', 'stagbeetle', 'starfish', 'starling', 'stonechat', 'stork', 'striatedheron', 'sunfish', 'swallow', 'swan', 'swift', 'tanuki', 'tapir', 'tarsier', 'teal', 'tern', 'thrush', 'tiger', 'toucan', 'treecreeper', 'treefrog', 'tropicbird', 'turtle', 'variedtit', 'vole', 'wagtail', 'walrus', 'waxwing', 'whale', 'whitebelliedgreenpigeon', 'whiteeye', 'wigeon', 'wolf', 'wombat', 'woodpecker', 'wren', 'yak', 'yellowthroat', 'zebra'])
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
