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
  expect(Object.keys(CHIRP_STYLE).sort()).toEqual(['aardvark', 'albatross', 'alpaca', 'anglerfish', 'anteater', 'armadillo', 'ashyminivet', 'asianblackbear', 'asianbrownflycatcher', 'asianstubtail', 'auklet', 'avocet', 'axolotl', 'ayeaye', 'badger', 'bagworm', 'baikal', 'bamboopartridge', 'bannerfish', 'bat', 'batfish', 'bear', 'beaver', 'beetle', 'beluga', 'bilby', 'binturong', 'bison', 'blackfootedcat', 'blackwoodpecker', 'blackwoodpigeon', 'bluedragon', 'blueringed', 'bluetail', 'bluetang', 'boar', 'boxfish', 'brownheadedthrush', 'bulbul', 'bullfinch', 'bunting', 'bushbaby', 'bushwarbler', 'butterfly', 'buzzard', 'camel', 'capybara', 'caracal', 'cat', 'cattleegret', 'chameleon', 'cheetah', 'chicken', 'chinchilla', 'clione', 'clownfish', 'coaltit', 'coati', 'coconutcrab', 'coelacanth', 'colugo', 'condor', 'copperpheasant', 'cormorant', 'crab', 'crane', 'crestedkingfisher', 'cuckoo', 'cuttlefish', 'deer', 'dipper', 'divingbeetle', 'dollarbird', 'dolphin', 'dragon', 'dragonfly', 'duck', 'dugong', 'dunlin', 'duskythrush', 'eagle', 'eagleowl', 'easterncrownedwarbler', 'echidna', 'eggcowry', 'egret', 'eider', 'elephant', 'emperorangel', 'ermine', 'eurasianhobby', 'eurasiansparrowhawk', 'falcated', 'falcon', 'fennec', 'finch', 'firefly', 'fireflysquid', 'firenewt', 'fishingcat', 'flamingo', 'flapjackoctopus', 'flatworm', 'flycatcher', 'flyingfish', 'flyingsquirrel', 'fox', 'frigatebird', 'frog', 'frogmouth', 'gadwall', 'gannet', 'gardeneel', 'garganey', 'gecko', 'gerenuk', 'giantflyingsquirrel', 'giantisopod', 'giantsquid', 'giantwaterbug', 'giraffe', 'goat', 'goby', 'goldcrest', 'goldeneye', 'goldfish', 'gorilla', 'goshawk', 'greattit', 'grebe', 'greenfinch', 'greyfacedbuzzard', 'greystreakedflycatcher', 'greywagtail', 'guillemot', 'gull', 'hamster', 'harlequin', 'harlequinshrimp', 'harrier', 'harvestmouse', 'hawfinch', 'hawkeagle', 'hedgehog', 'hermitcrab', 'heron', 'hippo', 'hoatzin', 'honeybee', 'hoopoe', 'hornbill', 'horseshoecrab', 'hummingbird', 'ibis', 'jacana', 'jaguarundi', 'japanesegreenwoodpecker', 'japanesegrosbeak', 'japanesenightheron', 'japaneseserow', 'japanesesparrowhawk', 'japanesesquirrel', 'japanesethrush', 'japanesewagtail', 'jay', 'jellyfish', 'kajikafrog', 'kakapo', 'kangaroo', 'kea', 'kestrel', 'kingfisher', 'kinkajou', 'kite', 'kittiwake', 'kiwi', 'koala', 'koi', 'ladybug', 'lanternfish', 'lark', 'lathamssnipe', 'lemming', 'lemur', 'lessercuckoo', 'lidthsjay', 'lion', 'lionfish', 'lizard', 'longtail', 'longtailedtit', 'lynx', 'lyrebird', 'macaque', 'magpie', 'manatee', 'mandarinduck', 'mandarinfish', 'manta', 'mantis', 'margay', 'markhor', 'marten', 'maskedcivet', 'meerkat', 'merganser', 'mink', 'mochi', 'mole', 'molecricket', 'molerat', 'moorishidol', 'moose', 'mountainfrog', 'mouse', 'mudskipper', 'napoleonfish', 'narcissusflycatcher', 'narwhal', 'nautilus', 'newt', 'nightheron', 'nightjar', 'numbat', 'nutcracker', 'nuthatch', 'oarfish', 'ocelot', 'octopus', 'okapi', 'orca', 'orientalcuckoo', 'orientalturtledove', 'ostrich', 'otter', 'owl', 'oystercatcher', 'pallascat', 'panda', 'pangolin', 'paradiseflycatcher', 'parrot', 'parrotfish', 'peacock', 'pelican', 'penguin', 'petrel', 'pheasant', 'phoenix', 'pig', 'pika', 'pintail', 'pistolshrimp', 'pitta', 'platypus', 'pochard', 'polarbear', 'pondturtle', 'porcupinefish', 'potoo', 'potoroo', 'ptarmigan', 'pufferfish', 'puffin', 'pygmywoodpecker', 'quail', 'quokka', 'quoll', 'rabbit', 'raccoon', 'ratsnake', 'redcrest', 'redpanda', 'redstart', 'reedwarbler', 'reindeer', 'rhino', 'ribboneel', 'robin', 'rockhopper', 'rosefinch', 'ruddykingfisher', 'saiga', 'salamander', 'sandcat', 'sandpiper', 'scalythrush', 'scaup', 'scoter', 'seafirefly', 'seahorse', 'seal', 'sealion', 'seamoth', 'seaotter', 'searobin', 'seaslug', 'seaturtle', 'seaurchin', 'secretarybird', 'shearwater', 'sheep', 'shoebill', 'shoveler', 'shrew', 'shrimp', 'shrimpfish', 'siberianblue', 'siberianrubythroat', 'siberianthrush', 'siskin', 'skimmer', 'skua', 'skunk', 'sloth', 'slowloris', 'smew', 'snail', 'snowleopard', 'solenodon', 'sparrow', 'spidercrab', 'squid', 'squirrel', 'stagbeetle', 'starfish', 'starling', 'stonechat', 'stonefish', 'stork', 'striatedheron', 'stripedcatfish', 'sugarglider', 'sunfish', 'swallow', 'swan', 'swift', 'takahe', 'tanuki', 'tapir', 'tarsier', 'teal', 'tenrec', 'tern', 'thrush', 'tiger', 'toucan', 'treecreeper', 'treefrog', 'triggerfish', 'tropicbird', 'turtle', 'variedtit', 'vole', 'wagtail', 'walrus', 'waterscorpion', 'waterstrider', 'waxwing', 'whale', 'whaleshark', 'whitebelliedgreenpigeon', 'whiteeye', 'whitewagtail', 'wigeon', 'willowtit', 'wolf', 'wombat', 'woodpecker', 'wren', 'yak', 'yellowtang', 'yellowthroat', 'zebra'])
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
