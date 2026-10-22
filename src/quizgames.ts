// ミニゲームの種類の分け方
import type { Direction } from './QuizView'

// 文法のミニゲーム（答えると文法のなかまが育つ）。単語の知識を問うもの（まちがえやすい単語・発音のコツ）は入れない
const GRAMMAR_GAMES: Direction[] = ['grammar', 'plural', 'past-ed', 'compare', 'be', 'article', 'neg', 'placeprep', 'modal', 'pronoun', 'muchmany', 'waswere', 'gmix', 'timeprep', 'wh', 'third', 'ing', 'irregular']
export const isGrammarGame = (d: Direction) => GRAMMAR_GAMES.includes(d)
