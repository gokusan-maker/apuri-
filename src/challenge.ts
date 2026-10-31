// 今日のチャレンジ：選んでいるキャラクターで問題の種類が、育ち具合で難しさが変わる。1日1回ごほうび
import type { Level } from './words'

export type ChallengeKind = { dir: 'en-ja' | 'gmix' | 'order' | 'sentence-read' | 'listen' | 'ja-en'; label: string; icon: string }

export const CHALLENGE_BY_SPECIES: Record<string, ChallengeKind> = {
  mochi: { dir: 'en-ja', label: '単語', icon: '🔤' },
  fox: { dir: 'gmix', label: '文法', icon: '📐' },
  penguin: { dir: 'order', label: '並べかえ', icon: '🔀' },
  dragon: { dir: 'sentence-read', label: '英文和訳', icon: '📜' },
  rabbit: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  cat: { dir: 'ja-en', label: '和文英訳（単語）', icon: '✍' },
  owl: { dir: 'sentence-read', label: '英文和訳', icon: '📜' },
  turtle: { dir: 'en-ja', label: '単語', icon: '🔤' },
  hamster: { dir: 'en-ja', label: '単語', icon: '🔤' },
  sheep: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  squirrel: { dir: 'order', label: '並べかえ', icon: '🔀' },
  panda: { dir: 'gmix', label: '文法', icon: '📐' },
  lion: { dir: 'sentence-read', label: '英文和訳', icon: '📜' },
  elephant: { dir: 'en-ja', label: '単語', icon: '🔤' },
  koala: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  hedgehog: { dir: 'en-ja', label: '英→日', icon: '🦔' },
  pelican: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  seal: { dir: 'en-ja', label: '英→日', icon: '🦭' },
  flamingo: { dir: 'ja-en', label: '日→英', icon: '🦩' },
  otter: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  bear: { dir: 'en-ja', label: '英→日', icon: '🐻' },
  giraffe: { dir: 'ja-en', label: '日→英', icon: '🦒' },
  frog: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  raccoon: { dir: 'en-ja', label: '英→日', icon: '🦝' },
  sloth: { dir: 'en-ja', label: '英→日', icon: '🦥' },
  alpaca: { dir: 'ja-en', label: '日→英', icon: '🦙' },
  mole: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  dolphin: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  hippo: { dir: 'ja-en', label: '日→英', icon: '🦛' },
  crab: { dir: 'en-ja', label: '英→日', icon: '🦀' },
  tiger: { dir: 'ja-en', label: '日→英', icon: '🐯' },
  chameleon: { dir: 'en-ja', label: '英→日', icon: '🦎' },
  swan: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  peacock: { dir: 'ja-en', label: '日→英', icon: '🦚' },
  wolf: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  parrot: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  bat: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  seahorse: { dir: 'en-ja', label: '英→日', icon: '🌊' },
  camel: { dir: 'ja-en', label: '日→英', icon: '🐫' },
  polarbear: { dir: 'en-ja', label: '英→日', icon: '🐻‍❄️' },
  duck: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  squid: { dir: 'en-ja', label: '英→日', icon: '🦑' },
  chicken: { dir: 'ja-en', label: '日→英', icon: '🐔' },
  pig: { dir: 'en-ja', label: '英→日', icon: '🐷' },
  beaver: { dir: 'ja-en', label: '日→英', icon: '🦫' },
  deer: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  goat: { dir: 'ja-en', label: '日→英', icon: '🐐' },
  mouse: { dir: 'en-ja', label: '英→日', icon: '🐭' },
  snail: { dir: 'en-ja', label: '英→日', icon: '🐌' },
  badger: { dir: 'ja-en', label: '日→英', icon: '🦡' },
  jellyfish: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  whale: { dir: 'listen', label: 'リスニング', icon: '🎧' },
  hummingbird: { dir: 'en-ja', label: '英→日', icon: '🐦' },
  ostrich: { dir: 'ja-en', label: '日→英', icon: '🏃' },
  woodpecker: { dir: 'en-ja', label: '英→日', icon: '🪵' },
  shrimp: { dir: 'ja-en', label: '日→英', icon: '🦐' },
  moose: { dir: 'en-ja', label: '英→日', icon: '🌲' },
  anglerfish: { dir: 'ja-en', label: '日→英', icon: '🏮' },
  swallow: { dir: 'ja-en', label: '日→英', icon: '🌸' },
  falcon: { dir: 'en-ja', label: '英→日', icon: '🦅' },
  boar: { dir: 'en-ja', label: '英→日', icon: '⛰' },
  rhino: { dir: 'ja-en', label: '日→英', icon: '🦏' },
  sealion: { dir: 'en-ja', label: '英→日', icon: '⚓' },
  gorilla: { dir: 'en-ja', label: '英→日', icon: '🌳' },
  mudskipper: { dir: 'ja-en', label: '日→英', icon: '🌊' },
  aardvark: { dir: 'listen', label: 'リスニング', icon: '🌙' },
  clownfish: { dir: 'ja-en', label: '日→英', icon: '🪸' },
  salamander: { dir: 'en-ja', label: '英→日', icon: '🏞' },
  goldfish: { dir: 'en-ja', label: '英→日', icon: '🎐' },
  seaurchin: { dir: 'ja-en', label: '日→英', icon: '🌊' },
  honeybee: { dir: 'en-ja', label: '英→日', icon: '🌼' },
  sparrow: { dir: 'ja-en', label: '日→英', icon: '🌾' },
  macaque: { dir: 'en-ja', label: '英→日', icon: '♨️' },
  treefrog: { dir: 'listen', label: 'リスニング', icon: '☔' },
  nautilus: { dir: 'ja-en', label: '日→英', icon: '🐚' },
  wombat: { dir: 'ja-en', label: '日→英', icon: '🕳' },
  skunk: { dir: 'en-ja', label: '英→日', icon: '🦨' },
  beluga: { dir: 'listen', label: 'リスニング', icon: '🎵' },
  crane: { dir: 'en-ja', label: '英→日', icon: '🕊' },
  flyingfish: { dir: 'ja-en', label: '日→英', icon: '🌊' },
  sunfish: { dir: 'en-ja', label: '英→日', icon: '☀️' },
  mantis: { dir: 'ja-en', label: '日→英', icon: '🌿' },
  lynx: { dir: 'listen', label: 'リスニング', icon: '👂' },
  cheetah: { dir: 'en-ja', label: '英→日', icon: '💨' },
  pufferfish: { dir: 'ja-en', label: '日→英', icon: '🐡' },
  anteater: { dir: 'en-ja', label: '英→日', icon: '👃' },
  chinchilla: { dir: 'listen', label: 'リスニング', icon: '👂' },
  shoebill: { dir: 'en-ja', label: '英→日', icon: '🪶' },
  fireflysquid: { dir: 'ja-en', label: '日→英', icon: '💡' },
  coati: { dir: 'en-ja', label: '英→日', icon: '👃' },
  reindeer: { dir: 'ja-en', label: '日→英', icon: '🦌' },
  phoenix: { dir: 'en-ja', label: '英→日', icon: '🔥' },
  flyingsquirrel: { dir: 'ja-en', label: '日→英', icon: '🌳' },
  stagbeetle: { dir: 'en-ja', label: '英→日', icon: '🪵' },
  mandarinduck: { dir: 'ja-en', label: '日→英', icon: '🦆' },
  tarsier: { dir: 'en-ja', label: '英→日', icon: '👀' },
  hornbill: { dir: 'ja-en', label: '日→英', icon: '🌴' },
  pika: { dir: 'en-ja', label: '英→日', icon: '⛰' },
  clione: { dir: 'ja-en', label: '日→英', icon: '🧊' },
  molecricket: { dir: 'en-ja', label: '英→日', icon: '⛏' },
  bison: { dir: 'ja-en', label: '日→英', icon: '🦬' },
  platypus: { dir: 'en-ja', label: '英→日', icon: '🦆' },
  koi: { dir: 'ja-en', label: '日→英', icon: '🎏' },
  manta: { dir: 'en-ja', label: '英→日', icon: '🌊' },
  walrus: { dir: 'ja-en', label: '日→英', icon: '🦭' },
  hermitcrab: { dir: 'en-ja', label: '英→日', icon: '🐚' },
  ladybug: { dir: 'ja-en', label: '日→英', icon: '🐞' },
  eagle: { dir: 'en-ja', label: '英→日', icon: '🦅' },
  beetle: { dir: 'ja-en', label: '日→英', icon: '🪲' },
  kingfisher: { dir: 'en-ja', label: '英→日', icon: '🐦' },
  zebra: { dir: 'ja-en', label: '日→英', icon: '🦓' },
  gecko: { dir: 'en-ja', label: '英→日', icon: '🏠' },
  yak: { dir: 'gmix', label: '文法', icon: '⛰️' },
  tanuki: { dir: 'ja-en', label: '日→英', icon: '🍃' },
  butterfly: { dir: 'en-ja', label: '英→日', icon: '🦋' },
  starfish: { dir: 'order', label: '並べかえ', icon: '⭐' },
  kiwi: { dir: 'gmix', label: '文法', icon: '🌿' },
  puffin: { dir: 'en-ja', label: '英→日', icon: '🐟' },
  firefly: { dir: 'ja-en', label: '日→英', icon: '✨' },
  manatee: { dir: 'en-ja', label: '英→日', icon: '🌊' },
  fennec: { dir: 'listen', label: 'リスニング', icon: '👂' },
  toucan: { dir: 'listen', label: 'リスニング', icon: '🍊' },
  armadillo: { dir: 'gmix', label: '文法', icon: '🌵' },
  snowleopard: { dir: 'gmix', label: '文法', icon: '🏔️' },
  quokka: { dir: 'ja-en', label: '日→英', icon: '😊' },
  okapi: { dir: 'en-ja', label: '英→日', icon: '🌲' },
  tapir: { dir: 'en-ja', label: '英→日', icon: '🌙' },
  capybara: { dir: 'ja-en', label: '日→英', icon: '♨️' },
  pangolin: { dir: 'en-ja', label: '英→日', icon: '🛡️' },
  narwhal: { dir: 'ja-en', label: '日→英', icon: '🌌' },
  axolotl: { dir: 'en-ja', label: '英→日', icon: '💧' },
  lemur: { dir: 'ja-en', label: '日→英', icon: '☀️' },
  redpanda: { dir: 'en-ja', label: '英→日', icon: '🌳' },
  meerkat: { dir: 'en-ja', label: '英→日', icon: '👀' },
  kangaroo: { dir: 'ja-en', label: '日→英', icon: '🦘' },
  octopus: { dir: 'ja-en', label: '和文英訳（単語）', icon: '✍' },
}

export const challengeOf = (species: string | undefined): ChallengeKind => CHALLENGE_BY_SPECIES[species ?? 'mochi'] ?? CHALLENGE_BY_SPECIES.mochi

export type Difficulty = { id: 'easy' | 'normal' | 'hard'; label: string; count: number; levels: Level[]; coins: number; xp: number }

export const DIFFICULTIES: Difficulty[] = [
  { id: 'easy', label: 'やさしい', count: 5, levels: ['中1'], coins: 10, xp: 20 },
  { id: 'normal', label: 'ふつう', count: 8, levels: ['中2', '中3'], coins: 15, xp: 40 },
  { id: 'hard', label: 'むずかしい', count: 10, levels: ['高校基礎', '熟語'], coins: 20, xp: 60 },
]

// 育ち具合（進化の段階）で難しさが上がる：タマゴ〜モチまる=やさしい、Lv15〜30=ふつう、Lv50〜=むずかしい
export function difficultyOf(stage: number): Difficulty {
  return stage >= 5 ? DIFFICULTIES[2] : stage >= 3 ? DIFFICULTIES[1] : DIFFICULTIES[0]
}

export const CLEAR_RATE = 0.6 // 6割正解でクリア
export const cleared = (correct: number, total: number) => total > 0 && correct / total >= CLEAR_RATE

const KEY = 'eitan:challenge'
const STREAK_KEY = 'eitan:challenge-streak'

export function loadChallengeDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

export function saveChallengeDay(day: string): void {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 連続クリア日数：前の日もクリアしていれば +1、そうでなければ 1 から
export const STREAK_TICKET_DAYS = 3

function prevDay(day: string): string {
  const [y, m, d] = day.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d - 1)).toISOString().slice(0, 10)
}

export function nextChallengeStreak(lastDay: string, streak: number, today: string): number {
  return lastDay === prevDay(today) ? streak + 1 : 1
}

export function loadChallengeStreak(): number {
  try {
    const n = Number(localStorage.getItem(STREAK_KEY))
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
  } catch {
    return 0
  }
}

export function saveChallengeStreak(n: number): void {
  try {
    localStorage.setItem(STREAK_KEY, String(n))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// いま続いている連続クリア日数（最後のクリアが今日か昨日なら有効）
export function challengeStreakNow(lastDay: string, today: string): number {
  if (lastDay !== today && lastDay !== prevDay(today)) return 0
  return loadChallengeStreak()
}
