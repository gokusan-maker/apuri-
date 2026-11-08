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
  expect(Object.keys(CHIRP_STYLE).sort()).toEqual(['aardvark', 'aardwolf', 'addax', 'agouti', 'albatross', 'alpaca', 'amurleopard', 'amurtiger', 'andeancat', 'anglerfish', 'angwantibo', 'anoa', 'anteater', 'arabianleopard', 'argali', 'armadillo', 'ashyminivet', 'asianblackbear', 'asianbrownflycatcher', 'asiangoldencat', 'asianstubtail', 'auklet', 'avocet', 'axolotl', 'ayeaye', 'badger', 'bagworm', 'baikal', 'bamboopartridge', 'bannerfish', 'banteng', 'barasingha', 'bat', 'batfish', 'baycat', 'bear', 'beaver', 'beetle', 'beluga', 'bengaltiger', 'bharal', 'bilby', 'binturong', 'bison', 'blackbuck', 'blackfootedcat', 'blackwoodpecker', 'blackwoodpigeon', 'bluedragon', 'blueringed', 'bluetail', 'bluetang', 'boar', 'bobcat', 'bongo', 'bontebok', 'bowerbird', 'boxfish', 'brownheadedthrush', 'bulbul', 'bullfinch', 'bunting', 'bushbaby', 'bushbuck', 'bushwarbler', 'butterfly', 'buzzard', 'camel', 'canadalynx', 'capuchin', 'capybara', 'caracal', 'cassowary', 'cat', 'cattleegret', 'chameleon', 'chamois', 'cheetah', 'chicken', 'chinchilla', 'chinesemountaincat', 'chiru', 'chital', 'clione', 'cloudedleopard', 'clownfish', 'coaltit', 'coati', 'coconutcrab', 'coelacanth', 'colugo', 'condor', 'copperpheasant', 'cormorant', 'crab', 'crane', 'crestedkingfisher', 'cuckoo', 'cuscus', 'cuttlefish', 'deer', 'degu', 'dhole', 'dikdik', 'dipper', 'divingbeetle', 'dollarbird', 'dolphin', 'dormouse', 'dragon', 'dragonfly', 'duck', 'dugong', 'duiker', 'dunlin', 'duskythrush', 'eagle', 'eagleowl', 'easterncrownedwarbler', 'echidna', 'eggcowry', 'egret', 'eider', 'eland', 'elephant', 'emperorangel', 'emu', 'ermine', 'eurasianhobby', 'eurasiansparrowhawk', 'falcated', 'falcon', 'fennec', 'finch', 'firefly', 'fireflysquid', 'firenewt', 'fishingcat', 'flamingo', 'flapjackoctopus', 'flatheadedcat', 'flatworm', 'flycatcher', 'flyingfish', 'flyingsquirrel', 'fossa', 'fox', 'frigatebird', 'frog', 'frogmouth', 'gadwall', 'gannet', 'gardeneel', 'garganey', 'gaur', 'gazelle', 'gecko', 'genet', 'geoffroycat', 'gerbil', 'gerenuk', 'gharial', 'giantflyingsquirrel', 'giantisopod', 'giantsquid', 'giantwaterbug', 'gibbon', 'giraffe', 'goat', 'goby', 'goldcrest', 'goldeneye', 'goldfish', 'goral', 'gorilla', 'goshawk', 'greattit', 'grebe', 'greenfinch', 'greyfacedbuzzard', 'greystreakedflycatcher', 'greywagtail', 'grysbok', 'guillemot', 'gull', 'hamster', 'harlequin', 'harlequinshrimp', 'harrier', 'hartebeest', 'harvestmouse', 'hawfinch', 'hawkeagle', 'hedgehog', 'hermitcrab', 'heron', 'hippo', 'hoatzin', 'honeybee', 'hoopoe', 'hornbill', 'horseshoecrab', 'howler', 'huemul', 'hummingbird', 'hutia', 'hyrax', 'iberianlynx', 'ibex', 'ibis', 'impala', 'indri', 'iriomotecat', 'jacana', 'jaguarundi', 'japanesegreenwoodpecker', 'japanesegrosbeak', 'japanesenightheron', 'japaneseserow', 'japanesesparrowhawk', 'japanesesquirrel', 'japanesethrush', 'japanesewagtail', 'jay', 'jellyfish', 'jerboa', 'junglecat', 'kagu', 'kajikafrog', 'kakapo', 'kangaroo', 'kea', 'kestrel', 'kingfisher', 'kinkajou', 'kite', 'kittiwake', 'kiwi', 'klipspringer', 'koala', 'kob', 'kodkod', 'koi', 'kudu', 'ladybug', 'langur', 'lanternfish', 'lark', 'lathamssnipe', 'lechwe', 'lemming', 'lemur', 'lessercuckoo', 'lidthsjay', 'lion', 'lionfish', 'lizard', 'longtail', 'longtailedtit', 'lynx', 'lyrebird', 'macaque', 'magpie', 'manatee', 'mandarinduck', 'mandarinfish', 'manta', 'mantis', 'mara', 'marbledcat', 'margay', 'markhor', 'marmot', 'marten', 'maskedcivet', 'meerkat', 'merganser', 'milu', 'mink', 'mochi', 'mole', 'molecricket', 'molerat', 'mongoose', 'moorishidol', 'moose', 'mountainfrog', 'mountainhare', 'mouse', 'mudskipper', 'muntjac', 'napoleonfish', 'narcissusflycatcher', 'narwhal', 'nautilus', 'newt', 'nightheron', 'nightjar', 'nilgai', 'numbat', 'nutcracker', 'nuthatch', 'nyala', 'oarfish', 'ocelot', 'octopus', 'okapi', 'olingo', 'olinguito', 'oncilla', 'orca', 'oribi', 'orientalcuckoo', 'orientalturtledove', 'oryx', 'ostrich', 'otter', 'owl', 'oystercatcher', 'paca', 'pacarana', 'pallascat', 'pampascat', 'panda', 'pangolin', 'paradiseflycatcher', 'parrot', 'parrotfish', 'peacock', 'pelican', 'penguin', 'petrel', 'pheasant', 'phoenix', 'pig', 'pika', 'pintail', 'pistolshrimp', 'pitta', 'platypus', 'pochard', 'polarbear', 'pondturtle', 'porcupinefish', 'possum', 'potoo', 'potoroo', 'potto', 'ptarmigan', 'pudu', 'pufferfish', 'puffin', 'puku', 'puma', 'pygmywoodpecker', 'quail', 'quetzal', 'quokka', 'quoll', 'rabbit', 'raccoon', 'ratsnake', 'redcrest', 'redpanda', 'redstart', 'reedbuck', 'reedwarbler', 'reindeer', 'rhino', 'ribboneel', 'ringtail', 'roadrunner', 'roan', 'robin', 'rockhopper', 'rosefinch', 'ruddykingfisher', 'rustyspotted', 'sable', 'saiga', 'saki', 'salamander', 'sambar', 'sandcat', 'sandpiper', 'saola', 'scalythrush', 'scaup', 'scoter', 'seafirefly', 'seahorse', 'seal', 'sealion', 'seamoth', 'seaotter', 'searobin', 'seaslug', 'seaturtle', 'seaurchin', 'secretarybird', 'serval', 'shearwater', 'sheep', 'shoebill', 'shoveler', 'shrew', 'shrimp', 'shrimpfish', 'siberianblue', 'siberianrubythroat', 'siberianthrush', 'sifaka', 'siskin', 'sitatunga', 'skimmer', 'skua', 'skunk', 'sloth', 'slowloris', 'smew', 'snail', 'snowleopard', 'solenodon', 'sparrow', 'spidercrab', 'springbok', 'springhare', 'squid', 'squirrel', 'squirrelmonkey', 'stagbeetle', 'starfish', 'starling', 'steenbok', 'stonechat', 'stonefish', 'stork', 'striatedheron', 'stripedcatfish', 'sugarglider', 'sumatrantiger', 'sunbear', 'sunbird', 'sunbittern', 'sunfish', 'suni', 'swallow', 'swan', 'swift', 'tahr', 'takahe', 'takin', 'tamaraw', 'tamarin', 'tanuki', 'tapir', 'tarsier', 'tayra', 'teal', 'tenrec', 'tern', 'thrush', 'tiger', 'titi', 'topi', 'toucan', 'treecreeper', 'treefrog', 'triggerfish', 'tropicbird', 'tsushimacat', 'tuatara', 'turtle', 'uakari', 'urial', 'variedtit', 'viscacha', 'vole', 'wagtail', 'walrus', 'waterbuck', 'waterdeer', 'waterscorpion', 'waterstrider', 'waxwing', 'weaver', 'weka', 'whale', 'whaleshark', 'whitebelliedgreenpigeon', 'whiteeye', 'whitewagtail', 'wigeon', 'willowtit', 'wolf', 'wombat', 'woodpecker', 'wren', 'yak', 'yellowtang', 'yellowthroat', 'zebra', 'zorilla'])
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
