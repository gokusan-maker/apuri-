// ホームの「今日の課題」の単語：単語ゲームの中から、日ごとにランダムで1つ（同じ日は同じゲーム）
import type { Direction } from './QuizView'

export type WordGameId = Direction | 'card'
export const WORD_GAMES: { id: WordGameId; label: string }[] = [
  { id: 'card', label: '🃏 単語カード' },
  { id: 'mix', label: '🎲 ミックス4択' },
  { id: 'en-ja', label: '🇯🇵 英→日クイズ' },
  { id: 'ja-en', label: '🇬🇧 日→英クイズ' },
  { id: 'memory', label: '🃏 神経衰弱' },
  { id: 'mole', label: '🔨 単語もぐらたたき' },
  { id: 'bingo', label: '🎯 単語ビンゴ' },
  { id: 'wordsearch', label: '🔍 ことばさがし' },
  { id: 'riddle', label: '🤔 英語なぞなぞ' },
  { id: 'rival', label: '⚔️ ライバル戦' },
  { id: 'spell', label: '✏️ スペル' },
  { id: 'tiles', label: '🔤 文字タイル' },
  { id: 'listen', label: '🎧 リスニング' },
  { id: 'emoji', label: '😀 絵文字クイズ' },
  { id: 'opposite', label: '↔️ 反対の意味' },
  { id: 'timed', label: '⏳ 10秒クイズ' },
]

// 日付の文字列から決まる番号（同じ日はいつも同じ）
function dayHash(day: string): number {
  let h = 7
  for (const c of day) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h
}

export const dailyWordGame = (day: string) => WORD_GAMES[dayHash(day) % WORD_GAMES.length]

const KEY = 'eitan:daily-wordgame'
export function loadWordGameDay(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}
export function saveWordGameDay(day: string): void {
  try {
    localStorage.setItem(KEY, day)
  } catch {
    // 保存できなくても続ける
  }
}
