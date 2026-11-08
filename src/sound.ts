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
  duck: { pitch: 1.1, steps: [1, 1, 0.9] }, // ガーガー
  squid: { pitch: 1.3, steps: [1, 1.15, 1.3, 1.15] }, // すいっ
  chicken: { pitch: 1.4, steps: [1, 1.2, 1.5, 1.2] }, // コケコッコー
  pig: { pitch: 0.9, steps: [1, 1.1, 0.9] }, // ブーブー
  beaver: { pitch: 1.2, steps: [1, 1.1, 1] }, // かじかじ
  deer: { pitch: 1.5, steps: [1, 1.3] }, // ぴゅい
  goat: { pitch: 1.3, steps: [1, 0.95, 1.05, 0.95] }, // メェ〜
  mouse: { pitch: 2.1, steps: [1, 1.15] }, // チュー
  snail: { pitch: 0.9, steps: [1, 0.95] }, // にょろ
  badger: { pitch: 0.85, steps: [1, 1.05, 0.9] }, // ふごふご
  jellyfish: { pitch: 1.6, steps: [1, 0.9, 1.1, 0.9] }, // ふわわ
  whale: { pitch: 0.5, steps: [1, 1.2, 1.4, 1.2] }, // ぶお〜ん
  hummingbird: { pitch: 2.2, steps: [1, 1.1, 1.2, 1.3] }, // ぶーん
  ostrich: { pitch: 0.75, steps: [1, 1.2, 0.9] }, // ぶおっ
  woodpecker: { pitch: 1.5, steps: [1, 1, 1, 1] }, // コンコンコンコン
  rusa: { pitch: 0.95, steps: [1, 0.9, 1.05] }, // ホン
  barasingha: { pitch: 0.85, steps: [1, 1.1, 0.95] }, // ホォー
  milu: { pitch: 0.9, steps: [1, 1.05, 0.9] }, // ホゥ
  waterdeer: { pitch: 1.25, steps: [1, 1.2, 1] }, // キャン
  huemul: { pitch: 1.05, steps: [1, 0.95, 1.1] }, // ピュイ
  sambar: { pitch: 0.95, steps: [1, 1.1, 0.9] }, // フォン
  chital: { pitch: 1.2, steps: [1, 1.15, 1.05] }, // キュッ
  banteng: { pitch: 0.65, steps: [1, 0.9, 0.95] }, // モォー
  gaur: { pitch: 0.6, steps: [1, 0.85, 0.9] }, // ブモォ
  anoa: { pitch: 0.75, steps: [1, 0.9, 1] }, // ンモ
  tamaraw: { pitch: 0.7, steps: [1, 0.85, 0.95] }, // モォ
  bharal: { pitch: 0.9, steps: [1, 1.1, 0.95] }, // メェ
  urial: { pitch: 0.85, steps: [1, 0.9, 1.05] }, // メッ
  argali: { pitch: 0.8, steps: [1, 0.9, 1] }, // メェッ
  goral: { pitch: 0.9, steps: [1, 0.95, 1.05] }, // コツッ
  tahr: { pitch: 0.85, steps: [1, 1.05, 0.9] }, // ゴツッ
  muntjac: { pitch: 1.05, steps: [1, 0.85, 1.05] }, // ワンッ
  gazelle: { pitch: 1.15, steps: [1, 1.2, 1.05] }, // シュッ
  chiru: { pitch: 1, steps: [1, 1.1, 0.95] }, // フゥッ
  grysbok: { pitch: 1.05, steps: [1, 0.95, 1.1] }, // カサッ
  suni: { pitch: 1.3, steps: [1, 1.2, 1.3] }, // チッ
  puku: { pitch: 1.1, steps: [1, 1.2, 1] }, // ピィッ
  reedbuck: { pitch: 1.25, steps: [1, 1.3, 1.2] }, // ピーッ
  oribi: { pitch: 1.2, steps: [1, 1.25, 1.1] }, // ピョコッ
  waterbuck: { pitch: 0.85, steps: [1, 0.9, 1] }, // ザバッ
  roan: { pitch: 0.85, steps: [1, 0.95, 1.1] }, // ブルッ
  lechwe: { pitch: 1.05, steps: [1, 1.15, 0.9] }, // パシャッ
  eland: { pitch: 0.75, steps: [1, 0.9, 1] }, // カチッ
  nilgai: { pitch: 0.75, steps: [1, 0.85, 0.95] }, // モフッ
  sable: { pitch: 0.8, steps: [1, 0.9, 1.05] }, // ブフッ
  impala: { pitch: 1.15, steps: [1, 1.3, 1.1] }, // ピョーン
  bushbuck: { pitch: 0.95, steps: [1, 0.9, 1.1] }, // ガサッ
  kob: { pitch: 1.05, steps: [1, 1.1, 1] }, // ピュイッ
  topi: { pitch: 1, steps: [1, 0.9, 1.15] }, // フン
  bontebok: { pitch: 0.95, steps: [1, 1.05, 1.15] }, // タタッ
  hartebeest: { pitch: 0.9, steps: [1, 1.1, 0.95] }, // ドドッ
  blackbuck: { pitch: 1.1, steps: [1, 1.25, 1.05] }, // ピョーン
  chamois: { pitch: 1, steps: [1, 1.1, 1.2] }, // カツン
  steenbok: { pitch: 1.1, steps: [1, 1.15, 0.95] }, // ピッ
  duiker: { pitch: 1.05, steps: [1, 0.85, 1] }, // サッ
  sitatunga: { pitch: 0.85, steps: [1, 0.9, 1.05] }, // ザブン
  klipspringer: { pitch: 1.15, steps: [1, 1.2, 1.1] }, // ピョン
  addax: { pitch: 0.9, steps: [1, 0.95, 1.1] }, // フッ
  nyala: { pitch: 0.95, steps: [1, 1.05, 0.9] }, // ヒュッ
  bongo: { pitch: 0.9, steps: [1, 0.85, 1] }, // フッ
  springbok: { pitch: 1.2, steps: [1, 1.4, 1.2, 1.4] }, // ピョン
  kudu: { pitch: 0.85, steps: [1, 0.95, 1.1] }, // ブフッ
  dikdik: { pitch: 1.4, steps: [1, 1.3, 1] }, // ディクディク
  weka: { pitch: 1.05, steps: [1, 1.25, 1] }, // クーイッ
  sunbird: { pitch: 1.6, steps: [1, 1.3, 1.6] }, // チィチィ
  emu: { pitch: 0.75, steps: [1, 1, 0.9] }, // ドゥンドゥン
  weaver: { pitch: 1.5, steps: [1, 1.2, 1.4, 1.2] }, // チュチュッ
  roadrunner: { pitch: 1.1, steps: [1, 0.9, 1.2] }, // クックー
  quetzal: { pitch: 1.3, steps: [1, 1.4, 1.1] }, // ピーヨ
  bowerbird: { pitch: 1.35, steps: [1, 1.25, 0.9] }, // ピュルル
  saki: { pitch: 1.2, steps: [1, 0.95, 1.2] }, // チッ
  indri: { pitch: 1.15, steps: [1, 1.3, 1.15, 1.45] }, // ウォーーン
  langur: { pitch: 1.0, steps: [1, 1.2, 0.85] }, // ホーッ
  titi: { pitch: 1.25, steps: [1, 1.1, 1.25] }, // ホッホッ
  capuchin: { pitch: 1.3, steps: [1, 1.15, 1.35] }, // キュッ
  uakari: { pitch: 1.1, steps: [1, 1.2, 0.9] }, // キャッ
  gibbon: { pitch: 1.2, steps: [1, 1.4, 1.7] }, // ウーウーアー
  squirrelmonkey: { pitch: 1.55, steps: [1, 1.3, 1.5] }, // キキッ
  howler: { pitch: 0.7, steps: [1, 0.8, 1.1] }, // ウォーー
  gerbil: { pitch: 1.45, steps: [1, 1.1, 1.3] }, // ちゅっ
  mountainhare: { pitch: 1.35, steps: [1, 1.15, 1.3] }, // ぷぅ
  dormouse: { pitch: 1.5, steps: [1, 1.2, 1.4] }, // ちちっ
  paca: { pitch: 0.9, steps: [1, 0.85, 1.05] }, // ぶるる
  marmot: { pitch: 1.4, steps: [1, 1.5, 1.2] }, // ぴーっ
  mongoose: { pitch: 1.15, steps: [1, 1.25, 0.95] }, // きっ
  olinguito: { pitch: 1.25, steps: [1, 1.3, 1.1] }, // きゅっ
  ibex: { pitch: 0.95, steps: [1, 1.1, 0.95] }, // めえ
  pudu: { pitch: 1.3, steps: [1, 1.2, 1] }, // ぴゅい
  oryx: { pitch: 0.85, steps: [1, 0.9, 1.1] }, // むおー
  tayra: { pitch: 1.0, steps: [1, 1.15, 0.9] }, // きゅるる
  hutia: { pitch: 0.8, steps: [1, 0.9, 1] }, // くうっ
  springhare: { pitch: 1.35, steps: [1, 1.25, 1.1] }, // ぴょっ
  pacarana: { pitch: 0.7, steps: [1, 0.85, 0.9] }, // ふごっ
  agouti: { pitch: 1.15, steps: [1, 1.05, 1.2] }, // くきっ
  degu: { pitch: 1.45, steps: [1, 1.3, 1.15] }, // ちゅるっ
  mara: { pitch: 1.05, steps: [1, 1.2, 0.95] }, // くるっ
  viscacha: { pitch: 1.25, steps: [1, 1.15, 1] }, // ぴゅいっ
  kagu: { pitch: 1.1, steps: [1, 1.3, 1.1] }, // わうっ
  angwantibo: { pitch: 1.0, steps: [1, 0.95, 1.05] }, // ふぅん
  sunbittern: { pitch: 1.3, steps: [1, 1.2, 0.9] }, // ぴゅーい
  ringtail: { pitch: 1.2, steps: [1, 1.1, 1.2] }, // きゃっ
  zorilla: { pitch: 1.15, steps: [1, 1.05, 0.9] }, // ふしゅっ
  potto: { pitch: 0.75, steps: [1, 0.9, 0.85] }, // ふむっ
  olingo: { pitch: 1.35, steps: [1, 1.15, 1.25] }, // きゅるっ
  possum: { pitch: 1.05, steps: [1, 0.85, 1.1] }, // きしし
  cuscus: { pitch: 0.9, steps: [1, 0.9, 0.95] }, // くすっ
  tuatara: { pitch: 0.6, steps: [1, 0.95, 0.9] }, // くるる
  cassowary: { pitch: 0.55, steps: [1, 0.8, 0.7] }, // ぶおん
  tamarin: { pitch: 1.6, steps: [1, 1.2, 1.4] }, // ちちっ
  genet: { pitch: 1.1, steps: [1, 1.05, 0.95] }, // みゅっ
  aardwolf: { pitch: 0.95, steps: [1, 0.85, 1.05] }, // ふすっ
  saola: { pitch: 0.85, steps: [1, 0.9, 1] }, // ふぉん
  sifaka: { pitch: 1.25, steps: [1, 1.1, 1.3] }, // しふぁっ
  jerboa: { pitch: 1.5, steps: [1, 1.3, 1.5] }, // ぴっ
  hyrax: { pitch: 1.2, steps: [1, 1.2, 1] }, // きゅっ
  fossa: { pitch: 1.0, steps: [1, 0.9, 1.15] }, // にゃう
  dhole: { pitch: 1.3, steps: [1, 1.25, 1.1] }, // ぴゅいっ
  gharial: { pitch: 0.6, steps: [1, 0.7, 0.8] }, // ぐるる
  sunbear: { pitch: 0.9, steps: [1, 1.1, 0.9] }, // くうん
  takin: { pitch: 0.65, steps: [1, 0.85, 0.75] }, // もおう
  amurtiger: { pitch: 0.7, steps: [1, 0.8, 0.9] }, // がおう
  bengaltiger: { pitch: 0.75, steps: [1, 0.8, 0.95] }, // がおう
  sumatrantiger: { pitch: 0.8, steps: [1, 0.85, 1.0] }, // がおー
  arabianleopard: { pitch: 0.9, steps: [1, 0.95, 1.1] }, // ぐるる
  iberianlynx: { pitch: 1.1, steps: [1, 1.25, 1.15] }, // にゃう
  canadalynx: { pitch: 1.05, steps: [1, 1.15, 1.0] }, // にゃう
  amurleopard: { pitch: 0.85, steps: [1, 0.9, 1.05] }, // ぐるる
  tsushimacat: { pitch: 1.15, steps: [1, 1.2, 1.1] }, // にゃう
  iriomotecat: { pitch: 1.2, steps: [1, 1.1, 1.25] }, // みゃお
  puma: { pitch: 1.6, steps: [1, 1.5, 1.3] }, // ぴゅいー
  bobcat: { pitch: 1.0, steps: [1, 1.15, 0.95] }, // うにゃ
  serval: { pitch: 1.35, steps: [1, 1.4, 1.2] }, // にゃっ
  asiangoldencat: { pitch: 1.1, steps: [1, 1.2, 1.3] }, // にゃーん
  cloudedleopard: { pitch: 0.9, steps: [1, 0.85, 1.1] }, // ぐるる
  flatheadedcat: { pitch: 1.3, steps: [1, 1.05, 1.25] }, // みゅう
  marbledcat: { pitch: 1.25, steps: [1, 1.1, 1.35] }, // みゃう
  pampascat: { pitch: 1.15, steps: [1, 1.2, 1.05] }, // ふにゃ
  junglecat: { pitch: 1.05, steps: [1, 1.25, 1.1] }, // にゃお
  chinesemountaincat: { pitch: 0.95, steps: [1, 1.1, 0.9] }, // ぐにゃ
  oncilla: { pitch: 1.5, steps: [1, 1.15, 1.3] }, // にゃん
  baycat: { pitch: 1.1, steps: [1, 0.95, 1.2] }, // くるる
  andeancat: { pitch: 1.0, steps: [1, 1.2, 1.1] }, // にゃー
  geoffroycat: { pitch: 1.2, steps: [1, 1.3, 1.15] }, // にゃう
  kodkod: { pitch: 1.6, steps: [1, 1.1, 1.4] }, // みゅっ
  rustyspotted: { pitch: 1.7, steps: [1, 1.25, 1.5] }, // みぃ
  blackfootedcat: { pitch: 1.6, steps: [1, 1.3, 1.5] }, // ぴゃっ
  jaguarundi: { pitch: 1.5, steps: [1, 1.4, 1.6] }, // ぴゅいっ
  sandcat: { pitch: 1.4, steps: [1, 1.2, 1.35] }, // みゃっ
  fishingcat: { pitch: 1.0, steps: [1, 1.15, 0.95] }, // ぐるる
  ocelot: { pitch: 1.1, steps: [1, 1.25, 1.05] }, // にゃお
  margay: { pitch: 1.3, steps: [1, 1.2, 1.4] }, // みゃう
  caracal: { pitch: 1.2, steps: [1, 1.3, 1.1] }, // にゃっ
  slowloris: { pitch: 1.1, steps: [1, 1, 1.05] }, // きゅっ
  sugarglider: { pitch: 1.35, steps: [1.2, 1.3, 1.4] }, // ちちっ
  echidna: { pitch: 1.05, steps: [1, 0.95, 1.1] }, // ふんふん
  frogmouth: { pitch: 0.8, steps: [0.8, 0.9, 0.8] }, // ぼっぼっ
  takahe: { pitch: 0.95, steps: [1, 1.1, 1] }, // くうう
  hoatzin: { pitch: 0.9, steps: [0.9, 1, 0.85] }, // ぐるる
  potoo: { pitch: 0.75, steps: [1, 0.9, 0.8] }, // ほーう
  secretarybird: { pitch: 0.95, steps: [1, 1.2, 1.2] }, // ずばっ
  kakapo: { pitch: 0.8, steps: [1, 0.9, 1] }, // ぶーん
  kea: { pitch: 1.25, steps: [1.2, 1.1, 1.3] }, // けあー
  lyrebird: { pitch: 1.3, steps: [1.2, 1, 1.3] }, // ぴゅるる
  rockhopper: { pitch: 1.15, steps: [1, 1.2, 1] }, // ぴょん
  potoroo: { pitch: 1.2, steps: [1.1, 1.2, 1.1] }, // ぴょん
  solenodon: { pitch: 1.1, steps: [1, 1.05, 0.95] }, // くんくん
  bilby: { pitch: 1.25, steps: [1, 1.15, 1.25] }, // ぴょこ
  tenrec: { pitch: 1.4, steps: [1.2, 1.3, 1.2] }, // しゃかしゃか
  markhor: { pitch: 0.9, steps: [1, 1.1, 1.2] }, // めえー
  saiga: { pitch: 0.95, steps: [1, 0.95, 1.05] }, // ふごふご
  gerenuk: { pitch: 1.05, steps: [0.95, 1.05, 1.2] }, // のびのび
  quoll: { pitch: 1.15, steps: [1.1, 1.2, 1] }, // さっ
  colugo: { pitch: 0.9, steps: [1.1, 1, 0.9] }, // すいーっ
  ayeaye: { pitch: 0.95, steps: [1, 1, 1.1] }, // こつこつ
  numbat: { pitch: 1.2, steps: [1, 1.15, 1.05] }, // ぺろぺろ
  kinkajou: { pitch: 1.05, steps: [1.1, 1, 1.15] }, // ぺろり
  binturong: { pitch: 0.85, steps: [1, 0.9, 1.05] }, // もふもふ
  lanternfish: { pitch: 1.15, steps: [0.95, 1.05, 1.15] }, // ぴかっ
  goby: { pitch: 1.3, steps: [1, 1.1, 1.2] }, // ぴぴっ
  triggerfish: { pitch: 1.0, steps: [1, 1.2, 0.95] }, // かちっ
  boxfish: { pitch: 1.1, steps: [1, 1.05, 1] }, // ぱたぱた
  shrimpfish: { pitch: 1.2, steps: [1.1, 1, 1.05] }, // すいすい
  parrotfish: { pitch: 0.9, steps: [1, 0.95, 1.1] }, // かりかり
  yellowtang: { pitch: 1.25, steps: [1, 1.2, 1.35] }, // きらきら
  stripedcatfish: { pitch: 0.85, steps: [1, 1.0, 1.15] }, // もごもご
  batfish: { pitch: 0.95, steps: [1, 1.1, 0.9] }, // ひらひら
  emperorangel: { pitch: 1.0, steps: [1, 1.2, 1.4] }, // きらっ
  moorishidol: { pitch: 1.05, steps: [1, 1.15, 1.0] }, // すいっ
  bannerfish: { pitch: 1.1, steps: [1, 1.2, 1.1] }, // ひらり
  bluetang: { pitch: 1.2, steps: [1, 1.15, 1.3] }, // すいすい
  flatworm: { pitch: 1.15, steps: [1, 1.2, 1.05] }, // ひらひら
  eggcowry: { pitch: 1.1, steps: [1, 1.05, 1.15] }, // つるん
  seamoth: { pitch: 0.9, steps: [1, 1.05, 0.95] }, // てくてく
  stonefish: { pitch: 0.6, steps: [1, 0.9, 0.95] }, // ごつん
  harlequinshrimp: { pitch: 1.2, steps: [1, 1.1, 1.25] }, // ひらり
  coconutcrab: { pitch: 0.7, steps: [1, 0.85, 1.05] }, // ガシッ
  lionfish: { pitch: 0.95, steps: [1, 1.1, 0.9] }, // ひらり
  seafirefly: { pitch: 1.35, steps: [1, 1.15, 1.3] }, // ぴかっ
  pistolshrimp: { pitch: 1.4, steps: [1, 0.7, 1.3] }, // パチン
  mandarinfish: { pitch: 1.15, steps: [1, 1.25, 1.1] }, // きらり
  bluedragon: { pitch: 1.25, steps: [1, 1.3, 1.15] }, // ぷかぷか
  cuttlefish: { pitch: 1.05, steps: [1, 1.2, 0.95] }, // ぴゅっ
  blueringed: { pitch: 1.3, steps: [1, 1.2, 0.9] }, // ピカッ
  ribboneel: { pitch: 1.2, steps: [1, 1.1, 1.25] }, // ひらひら
  searobin: { pitch: 0.85, steps: [1, 0.8, 1] }, // ぐうぐう
  napoleonfish: { pitch: 0.9, steps: [1, 1.15, 1] }, // ぷくっ
  giantisopod: { pitch: 0.75, steps: [1, 0.9, 0.8] }, // カシャン
  orca: { pitch: 1.0, steps: [1, 1.3, 1.1] }, // キュイッ
  coelacanth: { pitch: 0.65, steps: [1, 0.85, 0.9] }, // ゆったり
  dugong: { pitch: 0.8, steps: [1, 1.1, 0.95] }, // ぷかぷか
  giantsquid: { pitch: 0.7, steps: [1, 0.8, 1.1] }, // ぬるり
  oarfish: { pitch: 1.1, steps: [1, 1.2, 1.4] }, // ゆらゆら
  spidercrab: { pitch: 0.6, steps: [1, 0.9, 1] }, // かしゃかしゃ
  whaleshark: { pitch: 0.5, steps: [1, 1, 0.95] }, // ごぼごぼ
  porcupinefish: { pitch: 1.4, steps: [1, 1.3, 1] }, // ぷくっ
  gardeneel: { pitch: 1.6, steps: [1, 1.1, 1, 1.1] }, // ゆらゆら
  flapjackoctopus: { pitch: 1.2, steps: [1, 1.1, 1] }, // ぱたぱた
  pondturtle: { pitch: 0.8, steps: [1, 1, 1.05] }, // ぽちゃん
  ratsnake: { pitch: 1.0, steps: [1, 0.95, 0.9] }, // しゅるる
  seaturtle: { pitch: 0.7, steps: [1, 1.05, 1] }, // ざぶん
  kajikafrog: { pitch: 2.0, steps: [1, 1.2, 1.4, 1.2] }, // フィフィフィ
  asianblackbear: { pitch: 0.6, steps: [1, 0.9, 1] }, // ぐおー
  japaneseserow: { pitch: 0.9, steps: [1, 1, 0.9] }, // ふすっ
  japanesesquirrel: { pitch: 1.9, steps: [1, 1.1, 1, 1.2] }, // カリカリ
  harvestmouse: { pitch: 2.1, steps: [1, 1.2, 1.1] }, // ちゅっ
  giantflyingsquirrel: { pitch: 1.5, steps: [1, 1.2, 1.4] }, // ぐるる
  eagleowl: { pitch: 0.8, steps: [1, 0.85, 1] }, // ホーッ
  waterscorpion: { pitch: 1.0, steps: [1, 1, 1.15] }, // すっ
  maskedcivet: { pitch: 1.3, steps: [1, 0.9, 1.1] }, // きゅっ
  mountainfrog: { pitch: 1.4, steps: [1, 1.2, 1, 1.2, 1] }, // キャララ
  divingbeetle: { pitch: 1.0, steps: [1, 1.1, 1.2, 1.3] }, // ぶくぶく
  giantwaterbug: { pitch: 0.9, steps: [1, 0.95, 1.05] }, // ちゃぷ
  waterstrider: { pitch: 1.7, steps: [1, 1.15, 1.3] }, // すいっ
  firenewt: { pitch: 1.2, steps: [1, 1.05, 1] }, // ぴた
  molerat: { pitch: 1.8, steps: [1, 1.1, 1, 1.1, 1] }, // ちゅちゅ
  bagworm: { pitch: 1.1, steps: [1, 0.95, 1, 0.95] }, // かさこそ
  seaslug: { pitch: 1.6, steps: [1, 1.1, 1.2, 1.1] }, // ぷるぷる
  horseshoecrab: { pitch: 0.7, steps: [1, 1, 0.95] }, // かさかさ
  pallascat: { pitch: 0.8, steps: [1, 0.9, 1] }, // むすっ
  seaotter: { pitch: 1.3, steps: [1, 1, 1.1, 1] }, // コンコン
  easterncrownedwarbler: { pitch: 2, steps: [1, 1.2, 1, 1.2, 0.9] }, // ちよちよびー
  asianstubtail: { pitch: 2.4, steps: [1, 1.05, 1.1, 1.15, 1.2] }, // ししししし
  japanesenightheron: { pitch: 0.6, steps: [1, 1] }, // ぼぉー ぼぉー
  willowtit: { pitch: 1.7, steps: [1, 1.1, 1.1] }, // にーにー
  coaltit: { pitch: 2.1, steps: [1, 1, 1.3] }, // つつぴん
  eurasianhobby: { pitch: 1.9, steps: [1, 1, 1, 1] }, // ききき
  eurasiansparrowhawk: { pitch: 1.6, steps: [1, 1, 1] }, // きっきっ
  japanesesparrowhawk: { pitch: 1.8, steps: [1, 1, 1] }, // きぃきぃ
  greyfacedbuzzard: { pitch: 1.6, steps: [1, 1.4, 1.2] }, // ぴっくいー
  whitewagtail: { pitch: 1.7, steps: [1, 1.1] }, // ちゅちゅん
  greywagtail: { pitch: 1.8, steps: [1, 1.2, 1, 1.2] }, // ちちん ちちん
  japanesewagtail: { pitch: 1.4, steps: [1, 1] }, // じじっ
  greystreakedflycatcher: { pitch: 2, steps: [1, 1.1] }, // つぃー
  asianbrownflycatcher: { pitch: 2, steps: [1, 1.2, 1] }, // つぃー
  brownheadedthrush: { pitch: 1.5, steps: [1.2, 1.1, 1.4] }, // きょろん つぃー
  siberianthrush: { pitch: 1.5, steps: [1.2, 1, 1.4] }, // きょろん つぃー
  japanesethrush: { pitch: 1.6, steps: [1, 1.3, 1.1, 1.4, 1.2] }, // きょろん きょろん
  scalythrush: { pitch: 1.4, steps: [1.2, 0.9] }, // ひぃー ひょー
  striatedheron: { pitch: 1.2, steps: [1, 0.9] }, // きゅうっ
  blackwoodpigeon: { pitch: 0.7, steps: [1, 0.9] }, // うっうー
  orientalturtledove: { pitch: 0.9, steps: [1, 1, 1.1, 0.9] }, // でーでーぽっぽー
  siberianrubythroat: { pitch: 1.9, steps: [1, 1.3, 1.1, 1.4] }, // ちょりりり
  whitebelliedgreenpigeon: { pitch: 0.8, steps: [1, 1.3, 1, 1.3] }, // あーおー
  lathamssnipe: { pitch: 0.9, steps: [1.3, 1.1, 0.9, 0.7] }, // ずびゃーく
  ashyminivet: { pitch: 1.9, steps: [1, 1.2, 1.2, 1] }, // ひりりん
  lessercuckoo: { pitch: 1.6, steps: [1, 1.3, 1.2, 1.1, 1.2] }, // とっきょきょかきょく
  dollarbird: { pitch: 1, steps: [1, 1.1, 0.9] }, // げっげっ
  bamboopartridge: { pitch: 1.3, steps: [1, 1.2, 1, 1.2] }, // ちょっとこい
  copperpheasant: { pitch: 0.8, steps: [1, 1, 1, 1] }, // どどどど
  blackwoodpecker: { pitch: 0.9, steps: [1, 1, 1, 1, 1, 1] }, // どどどど
  lidthsjay: { pitch: 1.1, steps: [1, 0.9, 1] }, // じゃーじゃー
  hawfinch: { pitch: 1.7, steps: [1.2, 1.2] }, // ぴちっ ぴちっ
  japanesegreenwoodpecker: { pitch: 1.2, steps: [1, 1, 1, 1, 1] }, // こつこつこつ
  siskin: { pitch: 2, steps: [1, 1.2, 1.4, 1.2] }, // ちゅいーん
  japanesegrosbeak: { pitch: 1.6, steps: [1.3, 1, 1.3] }, // きーこーきー
  ruddykingfisher: { pitch: 1.4, steps: [1.3, 1.2, 1.1, 1, 0.9] }, // きょろろろ
  reedwarbler: { pitch: 1.3, steps: [1, 1, 1.3, 1, 1.3] }, // ぎょぎょし
  bushwarbler: { pitch: 1.5, steps: [1, 1.1, 1.5, 1.3, 1.6] }, // ほーほけきょ
  narcissusflycatcher: { pitch: 1.9, steps: [1, 1.3, 1.2, 1.1, 1.2] }, // ぴっころろ
  siberianblue: { pitch: 1.8, steps: [1, 1, 1.4, 1.3, 1.2] }, // ちっちっ、ぴんるるる
  pitta: { pitch: 1.4, steps: [1, 1, 1.3] }, // ほほへん
  stonechat: { pitch: 1.9, steps: [1, 1.1, 1, 1.1] }, // ひっ、じゃっじゃっ
  paradiseflycatcher: { pitch: 1.5, steps: [1, 1.2, 1.4, 1, 1, 1] }, // つきひほし、ほいほいほい
  hawkeagle: { pitch: 1.0, steps: [1.2, 1, 1.2] }, // ぴっぴょー
  variedtit: { pitch: 1.6, steps: [1, 1.1, 1] }, // にーにー
  nutcracker: { pitch: 0.9, steps: [1, 1, 1.1] }, // があがあ
  yellowthroat: { pitch: 2.0, steps: [1, 1.1] }, // ちっちっ
  cattleegret: { pitch: 0.9, steps: [1, 0.95] }, // ごあっ
  nightheron: { pitch: 0.8, steps: [1, 0.9] }, // くわっ
  goldcrest: { pitch: 2.4, steps: [1, 1.05, 1.1, 1.15] }, // ちぃちぃ
  bunting: { pitch: 2.0, steps: [1, 1] }, // ちっちっ
  duskythrush: { pitch: 1.4, steps: [1, 1.1] }, // くわっくわっ
  greenfinch: { pitch: 1.8, steps: [1.2, 1.3, 1, 1] }, // きりりころろ
  goshawk: { pitch: 1.1, steps: [1, 1.1, 1.1] }, // けっけっけっ
  bulbul: { pitch: 1.5, steps: [1.3, 1] }, // ひーよ
  greattit: { pitch: 1.9, steps: [1.2, 1, 1.2, 1] }, // つつぴー
  bluetail: { pitch: 1.7, steps: [1, 1.2, 1.1, 1] }, // ひっひっ、ちゅるり
  redstart: { pitch: 1.9, steps: [1, 1, 0.8, 0.8] }, // ひっひっ、かっかっ
  pygmywoodpecker: { pitch: 1.9, steps: [1, 1, 1, 1, 1] }, // ぎーっ、コツコツ
  longtailedtit: { pitch: 2.2, steps: [1, 1.1, 1, 1.1] }, // じゅりりり
  whiteeye: { pitch: 2.0, steps: [1, 1.2, 1.1, 1.3] }, // ちーちゅるちー
  bullfinch: { pitch: 1.3, steps: [1, 0.95] }, // ふぃー
  rosefinch: { pitch: 1.8, steps: [1.1, 1] }, // ふぃっふぃっ
  thrush: { pitch: 1.3, steps: [1, 0.9, 1.1] }, // つぃー
  waxwing: { pitch: 2.1, steps: [1, 1, 1.05] }, // ちりちり
  dunlin: { pitch: 1.8, steps: [1, 1.1, 1] }, // じゅりー
  orientalcuckoo: { pitch: 0.8, steps: [1, 1, 0.9, 0.9] }, // ぽぽ、ぽぽ
  crestedkingfisher: { pitch: 1.2, steps: [1, 1.2, 1, 1.2] }, // きゃらっきゃらっ
  flycatcher: { pitch: 1.7, steps: [1, 1.25, 1.5, 1.25] }, // ぴーりーりー
  jacana: { pitch: 1.4, steps: [1.2, 1, 1.2] }, // にゃおー
  treecreeper: { pitch: 2.0, steps: [1, 1.1, 1.2, 1.3] }, // ちりりり
  nightjar: { pitch: 0.9, steps: [1, 1, 1, 1] }, // きょきょきょきょ
  sandpiper: { pitch: 1.9, steps: [1, 1.15, 1.3] }, // ちーりーりー
  wagtail: { pitch: 1.8, steps: [1, 1.2, 1] }, // ちちん
  cuckoo: { pitch: 1.0, steps: [1.2, 0.95] }, // かっこう
  ptarmigan: { pitch: 1.1, steps: [1, 0.9, 1.1] }, // ぐぁっぐぁっ
  dipper: { pitch: 1.5, steps: [1, 1.3, 1.1] }, // ちちっ
  nuthatch: { pitch: 1.7, steps: [1, 1, 1.2] }, // ふぃふぃふぃ
  harlequin: { pitch: 1.6, steps: [1, 1.25, 1.1] }, // ぴーぴー
  garganey: { pitch: 1.4, steps: [1, 1.15, 1.05] }, // がりっ
  scoter: { pitch: 1.2, steps: [1, 1.1, 1.05] }, // ぴゅーっ
  redcrest: { pitch: 1.3, steps: [1, 1.1, 1.2] }, // くわっくわっ
  pochard: { pitch: 1.1, steps: [1, 0.95, 1.05] }, // くるるっ
  gadwall: { pitch: 1.0, steps: [1, 0.9, 0.95] }, // げっげっ
  baikal: { pitch: 1.2, steps: [1, 1.1, 0.95] }, // くろっ
  falcated: { pitch: 1.6, steps: [1, 1.2, 1] }, // ぴゅるっ
  shoveler: { pitch: 1.0, steps: [1, 0.9, 1] }, // くえっ
  wigeon: { pitch: 1.9, steps: [1, 1.4, 1.1] }, // ぴゅーう
  pintail: { pitch: 1.4, steps: [1, 1.05, 1.1] }, // ぷるる
  teal: { pitch: 1.8, steps: [1, 1.1, 1] }, // ぴりっ
  goldeneye: { pitch: 1.3, steps: [1, 1.15, 1] }, // ぴーっ
  longtail: { pitch: 1.4, steps: [1, 1.2, 1.4] }, // あおなっ
  smew: { pitch: 1.2, steps: [1, 1.1, 1] }, // くるっ
  eider: { pitch: 0.9, steps: [1, 1.1, 0.9] }, // あーうー
  merganser: { pitch: 1.0, steps: [1, 0.95, 0.9] }, // くわっ
  grebe: { pitch: 1.7, steps: [1, 1.2, 1.2] }, // きりりり
  scaup: { pitch: 0.9, steps: [1, 0.9, 1] }, // くるるっ
  petrel: { pitch: 2.0, steps: [1, 1.1, 1.2] }, // ちちっ
  skimmer: { pitch: 1.3, steps: [1, 1, 1.1] }, // わんわん
  gull: { pitch: 1.5, steps: [1, 1.3, 0.9] }, // みゃーお
  auklet: { pitch: 1.9, steps: [1, 1.1, 1.2] }, // ちりりっ
  tropicbird: { pitch: 1.8, steps: [1, 1.15, 1.3] }, // ぴりりっ
  kittiwake: { pitch: 1.7, steps: [1, 1.2, 1] }, // きてぃうぇいく
  guillemot: { pitch: 1.0, steps: [1, 0.95, 1.05] }, // おるるる
  cormorant: { pitch: 0.9, steps: [1, 0.9, 0.9] }, // ぐわっぐわっ
  albatross: { pitch: 1.0, steps: [1, 1.1, 1] }, // くわっくわっ
  frigatebird: { pitch: 1.1, steps: [1, 1, 0.8] }, // ころころ
  skua: { pitch: 1.2, steps: [1, 0.85, 0.85] }, // がっがっ
  shearwater: { pitch: 1.3, steps: [1, 1.1, 0.9] }, // ぴーうぃー
  gannet: { pitch: 1.4, steps: [1, 0.9, 1.1] }, // があっがあっ
  oystercatcher: { pitch: 1.7, steps: [1, 1.3, 1.3] }, // ぴりーっぴりーっ
  tern: { pitch: 1.9, steps: [1, 1.25, 1.1] }, // きりっきりっ
  avocet: { pitch: 1.6, steps: [1, 1.15, 1] }, // くぃっくぃっ
  kestrel: { pitch: 1.8, steps: [1, 1.2, 1.2] }, // きぃきぃ
  hoopoe: { pitch: 1.1, steps: [1, 1, 1] }, // ぽぽぽ
  harrier: { pitch: 1.2, steps: [1, 1.15, 1] }, // ぴゅい
  buzzard: { pitch: 1.3, steps: [1.2, 1] }, // ぴーえ
  kite: { pitch: 1.6, steps: [1.4, 1.2, 1] }, // ぴーひょろろ
  egret: { pitch: 1.0, steps: [1, 1.1] }, // くぁっ
  swift: { pitch: 2.2, steps: [1, 1.4, 1.8] }, // ぴゅーん
  jay: { pitch: 1.4, steps: [1, 0.9, 1.2] }, // じぇっ
  starling: { pitch: 1.6, steps: [1, 1.2, 1.1, 1.3] }, // ぎゅるる
  magpie: { pitch: 1.3, steps: [1, 1.3, 1] }, // かしゃっ
  vole: { pitch: 2, steps: [1, 1.2, 1] }, // ちゅっ
  mink: { pitch: 1.5, steps: [1, 1.2] }, // きゅっ
  shrew: { pitch: 2.2, steps: [1, 1.1, 1.2] }, // ちちっ
  marten: { pitch: 1.6, steps: [1, 1.3, 1.1] }, // きゅきゅっ
  lemming: { pitch: 1.8, steps: [1, 1.15] }, // ちゅちゅっ
  ermine: { pitch: 1.9, steps: [1, 1.2, 1.4] }, // きゅっ
  bushbaby: { pitch: 1.7, steps: [1, 1.4, 1] }, // きゅいっ
  condor: { pitch: 0.7, steps: [1, 0.9] }, // ばさっ
  ibis: { pitch: 1.0, steps: [1, 0.9, 1.1] }, // くわっ
  stork: { pitch: 0.8, steps: [1, 1, 1.1] }, // かたかた
  finch: { pitch: 1.8, steps: [1, 1.2, 1] }, // ちゅいっ
  lark: { pitch: 1.9, steps: [1, 1.2, 1.4, 1.6] }, // ぴーちく
  wren: { pitch: 2.1, steps: [1, 1.3, 1.6, 1.3] }, // ちちちっ
  pheasant: { pitch: 1.2, steps: [1, 1.4] }, // けーん
  newt: { pitch: 1.1, steps: [1, 1.1] }, // ぷくっ
  robin: { pitch: 2, steps: [1, 1.5, 1.25, 1.5] }, // ぴぴぴっ
  quail: { pitch: 1.6, steps: [1, 1.25, 1] }, // ぴぴっ
  heron: { pitch: 0.9, steps: [1, 0.8] }, // ぐわっ
  dragonfly: { pitch: 1.8, steps: [1, 1.1, 1.2, 1.1] }, // ぶーん
  lizard: { pitch: 1.5, steps: [1, 1.2, 1] }, // ちょろっ
  shrimp: { pitch: 1.7, steps: [1, 1.3, 1.6] }, // ぴちっ
  moose: { pitch: 0.6, steps: [1, 0.8, 1] }, // ぶおー
  anglerfish: { pitch: 0.7, steps: [1, 1.2, 0.9] }, // ぽわん
  swallow: { pitch: 2.0, steps: [1, 1.4, 1.2, 1.6] }, // ちゅぴっ
  falcon: { pitch: 1.9, steps: [1, 1.6, 2.2] }, // きゅいっ
  boar: { pitch: 0.8, steps: [1, 1.2, 1] }, // ぶひっ
  rhino: { pitch: 0.6, steps: [1, 0.9, 1.1] }, // ぶもっ
  sealion: { pitch: 1.0, steps: [1, 1.2, 1.4] }, // おうっ
  gorilla: { pitch: 0.6, steps: [1, 1, 1.2] }, // どんどん
  mudskipper: { pitch: 1.3, steps: [1, 1.5, 1] }, // ぴょこっ
  aardvark: { pitch: 0.9, steps: [1, 1.1, 0.9] }, // ふごふご
  clownfish: { pitch: 1.6, steps: [1, 1.3, 1.6] }, // ぷくっ
  salamander: { pitch: 0.7, steps: [1, 0.9, 0.8] }, // ごぽっ
  goldfish: { pitch: 1.4, steps: [1, 1.2, 1.4] }, // ぱくっ
  seaurchin: { pitch: 1.3, steps: [1, 1.3, 1.3] }, // ちくっ
  honeybee: { pitch: 1.8, steps: [1, 1, 1.1, 1] }, // ぶーん
  sparrow: { pitch: 2.0, steps: [1, 1.2, 1, 1.2] }, // ちゅん
  macaque: { pitch: 1.5, steps: [1, 1.5, 1.2, 1.6] }, // うきっ
  treefrog: { pitch: 1.6, steps: [1, 1.3, 1, 1.3] }, // けろっ
  nautilus: { pitch: 0.9, steps: [1, 1.1, 1.3] }, // こぽっ
  wombat: { pitch: 0.8, steps: [1, 0.9, 1] }, // ふごっ
  skunk: { pitch: 1.0, steps: [1, 0.8, 1.2] }, // ふすっ
  beluga: { pitch: 1.9, steps: [1, 1.4, 1.2, 1.7] }, // ぴゅるる
  crane: { pitch: 1.1, steps: [1, 1.3, 1.6] }, // こーっ
  flyingfish: { pitch: 1.7, steps: [1, 1.5, 1.9] }, // ひゅーん
  sunfish: { pitch: 0.8, steps: [1, 1.1, 1] }, // ぷかっ
  mantis: { pitch: 1.5, steps: [1, 1.2, 1.5] }, // しゃきっ
  lynx: { pitch: 1.3, steps: [1, 0.9, 1.3] }, // にゃっ
  cheetah: { pitch: 1.4, steps: [1, 1.6, 2] }, // びゅん
  pufferfish: { pitch: 1.2, steps: [1, 1.5, 1.2] }, // ぷくっ
  anteater: { pitch: 0.9, steps: [1, 1.2, 1.2] }, // くんくん
  chinchilla: { pitch: 1.6, steps: [1, 1.3, 1] }, // きゅっ
  shoebill: { pitch: 0.7, steps: [1, 1, 0.8] }, // かたかた
  fireflysquid: { pitch: 1.8, steps: [1, 1.4, 1.8] }, // ぴかっ
  coati: { pitch: 1.3, steps: [1, 1.2, 1.3] }, // くんくん
  reindeer: { pitch: 1.0, steps: [1, 1.2, 1.4] }, // しゃんしゃん
  phoenix: { pitch: 1.4, steps: [1, 1.5, 2] }, // ぴゅーい
  flyingsquirrel: { pitch: 1.6, steps: [1, 1.3, 1.1] }, // きゅるっ
  stagbeetle: { pitch: 0.9, steps: [1, 1.1, 0.9] }, // ぶぶっ
  mandarinduck: { pitch: 1.3, steps: [1, 1.2, 1] }, // ぐぐっ
  tarsier: { pitch: 1.7, steps: [1, 1.5, 1.2] }, // キィ
  hornbill: { pitch: 0.9, steps: [1, 1.3, 0.8] }, // カッカッ
  pika: { pitch: 1.9, steps: [1, 1.4, 1] }, // ピッ
  clione: { pitch: 1.8, steps: [1, 1.2, 1.5] }, // ふわっ
  molecricket: { pitch: 1.4, steps: [1, 1.2, 1.4] }, // じー
  bison: { pitch: 0.6, steps: [1, 0.9, 0.8] }, // ぶもー
  platypus: { pitch: 1.2, steps: [1, 1.1, 0.9] }, // くわっ
  koi: { pitch: 1.1, steps: [1, 1.3, 1.5] }, // ぱしゃっ
  manta: { pitch: 1.0, steps: [1, 1.2, 1] }, // すいー
  walrus: { pitch: 0.7, steps: [1, 0.8, 1] }, // おうっ
  hermitcrab: { pitch: 1.3, steps: [1, 1.1, 1.3] }, // かさかさ
  ladybug: { pitch: 1.6, steps: [1, 1.2, 1.4] }, // ぷーん
  eagle: { pitch: 1.2, steps: [1, 1.5, 1.1] }, // ぴーひょろ
  beetle: { pitch: 0.8, steps: [1, 0.9, 1.1] }, // ぶーん
  kingfisher: { pitch: 1.7, steps: [1, 1.4, 1.2] }, // ちー
  zebra: { pitch: 0.9, steps: [1, 1.2, 0.9] }, // ひひん
  gecko: { pitch: 1.5, steps: [1, 1.3, 1.1] }, // きゅっ
  yak: { pitch: 0.7, steps: [1, 0.9, 1] }, // もぉ
  tanuki: { pitch: 0.85, steps: [1, 1, 1.2] }, // ぽんぽん
  butterfly: { pitch: 1.65, steps: [1, 1.2, 1.4, 1.2] }, // ひらり
  starfish: { pitch: 1.6, steps: [1, 1.5, 1.2] }, // きらりん
  kiwi: { pitch: 1.45, steps: [1, 1.15, 1] }, // きーう
  puffin: { pitch: 1.25, steps: [1, 1.1, 1.3] }, // ぷふっ
  firefly: { pitch: 1.7, steps: [1, 1.3, 1, 1.3] }, // ぽわぽわ
  manatee: { pitch: 0.7, steps: [1, 1.05, 0.95] }, // ぼわん
  fennec: { pitch: 1.55, steps: [1, 1.2, 1.4] }, // きゃんっ
  toucan: { pitch: 1.2, steps: [1, 1.4, 1.1] }, // クワッ
  armadillo: { pitch: 1.05, steps: [1, 0.95, 1.1, 0.95] }, // ころころ
  snowleopard: { pitch: 0.95, steps: [1, 0.9, 1.15] }, // ぐるる
  quokka: { pitch: 1.35, steps: [1, 1.25, 1.5] }, // くおっ
  okapi: { pitch: 0.9, steps: [1, 1.2, 1.05] }, // ふぉっ
  tapir: { pitch: 0.8, steps: [1, 1.1, 1] }, // ぱふっ
  capybara: { pitch: 0.85, steps: [1, 1, 0.9] }, // ふー
  pangolin: { pitch: 0.95, steps: [1, 1.1, 0.95] }, // ころん
  narwhal: { pitch: 0.9, steps: [1, 1.25, 1.5] }, // ひゅーん
  axolotl: { pitch: 1.5, steps: [1, 0.9, 1.2] }, // ぷくっ
  lemur: { pitch: 1.4, steps: [1, 1.5, 1.2] }, // ワオッ
  redpanda: { pitch: 1.3, steps: [1, 1.15, 1.3] }, // きゅっ
  meerkat: { pitch: 1.6, steps: [1, 1.3, 1.6] }, // ぴぴっ
  kangaroo: { pitch: 1.1, steps: [1, 1.4, 1, 1.4] }, // ぴょんぴょん
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
