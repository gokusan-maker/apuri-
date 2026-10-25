// 単語のレベルの見直し（ネットで調べた基準で）：CEFR-J Wordlist（投野由紀夫・東京外国語大学、ver 1.5）で B1・B2 とされ、
// しかも英語の使用頻度（Google の上位2万語）でも低い語を、中1・中2・中3 から上の学年（中2・中3・高校基礎）へ移す。
// 英検の目安（5級≒A1・4級≒A1・3級≒A1〜A2・準2級≒A2〜B1・2級≒B1・準1級≒B2・1級≒C1）に単語コースを合わせるため。
// 出典：The CEFR-J Wordlist Version 1.5. Compiled by Yukio Tono, Tokyo University of Foreign Studies.
import type { Level } from './words'

export const LEVEL_FIX: Partial<Record<string, Level>> = {
  // → 中2（45語）
  'cliff': '中2', 'choir': '中2', 'housework': '中2', 'raspberry': '中2', 'spinach': '中2', 'broccoli': '中2', 'ginger': '中2', 'cucumber': '中2',
  'shiny': '中2', 'sticky': '中2', 'nowhere': '中2', 'handkerchief': '中2', 'cheerful': '中2', 'sunrise': '中2', 'frost': '中2', 'jog': '中2',
  'paddle': '中2', 'basement': '中2', 'cushion': '中2', 'heater': '中2', 'mailbox': '中2', 'kitten': '中2', 'crow': '中2', 'mosquito': '中2',
  'bacon': '中2', 'popcorn': '中2', 'giggle': '中2', 'sigh': '中2', 'shiver': '中2', 'nephew': '中2', 'niece': '中2', 'gentleman': '中2',
  'forehead': '中2', 'pork': '中2', 'shrimp': '中2', 'lettuce': '中2', 'pineapple': '中2', 'nap': '中2', 'ant': '中2', 'stir': '中2',
  'whisper': '中2', 'nod': '中2', 'unpack': '中2', 'toss': '中2', 'mash': '中2',
  // → 中3（12語）
  'crab': '中3', 'coconut': '中3', 'sail': '中3', 'swan': '中3', 'gum': '中3', 'bud': '中3', 'trophy': '中3', 'blink': '中3',
  'worm': '中3', 'peel': '中3', 'unlock': '中3', 'leak': '中3',
  // → 高校基礎（103語）
  'clap': '高校基礎', 'chew': '高校基礎', 'chop': '高校基礎', 'chimney': '高校基礎', 'pudding': '高校基礎', 'seesaw': '高校基礎', 'cocoa': '高校基礎', 'plum': '高校基礎',
  'paintbrush': '高校基礎', 'seldom': '高校基礎', 'soak': '高校基礎', 'hail': '高校基礎', 'moonlight': '高校基礎', 'yummy': '高校基礎', 'porch': '高校基礎', 'donkey': '高校基礎',
  'sparrow': '高校基礎', 'crocodile': '高校基礎', 'pancake': '高校基礎', 'tulip': '高校基礎', 'dandelion': '高校基礎', 'wink': '高校基礎', 'sniff': '高校基礎', 'lick': '高校基礎',
  'mustache': '高校基礎', 'eyebrow': '高校基礎', 'eyelash': '高校基礎', 'mango': '高校基礎', 'yawn': '高校基礎', 'pebble': '高校基礎', 'paw': '高校基礎', 'wipe': '高校基礎',
  'sweep': '高校基礎', 'snore': '高校基礎', 'tickle': '高校基礎', 'lid': '高校基礎', 'nut': '高校基礎', 'pajamas': '高校基礎', 'dash': '高校基礎', 'curl': '高校基礎',
  'dip': '高校基礎', 'rub': '高校基礎', 'punch': '高校基礎', 'lap': '高校基礎', 'glow': '高校基礎', 'quarrel': '高校基礎', 'grin': '高校基礎', 'kneel': '高校基礎',
  'mumble': '高校基礎', 'decorate': '高校基礎', 'neat': '高校基礎', 'parade': '高校基礎', 'pirate': '高校基礎', 'pumpkin': '高校基礎', 'tunnel': '高校基礎', 'badge': '高校基礎',
  'blossom': '高校基礎', 'barrier': '高校基礎', 'carve': '高校基礎', 'cope': '高校基礎', 'crawl': '高校基礎', 'flesh': '高校基礎', 'hay': '高校基礎', 'heap': '高校基礎',
  'hedge': '高校基礎', 'herb': '高校基礎', 'dense': '高校基礎', 'drain': '高校基礎', 'dock': '高校基礎', 'cardboard': '高校基礎', 'confess': '高校基礎', 'dye': '高校基礎',
  'snap': '高校基礎', 'amaze': '高校基礎', 'bind': '高校基礎', 'servant': '高校基礎', 'vacant': '高校基礎', 'shrink': '高校基礎', 'subtle': '高校基礎', 'insult': '高校基礎',
  'waist': '高校基礎', 'squeeze': '高校基礎', 'stain': '高校基礎', 'starve': '高校基礎', 'sincere': '高校基礎', 'rival': '高校基礎', 'suburb': '高校基礎', 'trait': '高校基礎',
  'tribe': '高校基礎', 'mercy': '高校基礎', 'refugee': '高校基礎', 'nerve': '高校基礎', 'offend': '高校基礎', 'obey': '高校基礎', 'opponent': '高校基礎', 'grain': '高校基礎',
  'genius': '高校基礎', 'interfere': '高校基礎', 'neglect': '高校基礎', 'tolerate': '高校基礎', 'vanish': '高校基礎', 'withdraw': '高校基礎', 'manufacture': '高校基礎',
}
