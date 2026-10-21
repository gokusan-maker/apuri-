import { MissedList } from './MissedListView'
import { useEffect, useState } from 'react'
import { blankOut, canBlank } from './blank'
import { quizXp, type Source } from './monster'
import { makeQuestion, makeQuiz, shuffle, trimChoices, type Question } from './quiz'
import { loadSettings } from './settings'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'
import { useKeys } from './useKeys'
import { Spell } from './SpellView'
import { Irregular } from './IrregularView'
import { Grammar } from './GrammarView'
import { CONFUSING } from './confusing'
import { DEFS } from './definitions'
import { EMOJI } from './emoji'
import { claimFeatured, FEATURED_XP, featuredClaimed, featuredFor } from './featured'
import { dayKey } from './srs'
import { quizShareText, shareText } from './shareText'
import { isNew, loadPlayed, loadRecent, markPlayed, pushRecent } from './playedModes'
import { Shiritori } from './ShiritoriView'
import { Numbers } from './NumbersView'
import { Versus } from './VersusView'
import { Memory } from './MemoryView'
import { Bingo } from './BingoView'
import { WordSearch } from './WordSearchView'
import { Twisters } from './TwisterView'
import { Placement } from './PlacementView'
import { Highlight } from './HighlightView'
import { Puzzle } from './PuzzleView'
import { type PuzzleQ, wasWereQ, ordinalQ, muchManyQ, pronounQ, modalQ, placePrepQ, homophoneQ, abcQ, alphabetQ, articleQ, beQ, grammarMixQ, negQ, riddleQ, timePrepQ, whQ, calcQ, compareQ, ingQ, thirdQ, pastQ, pluralQ, clockQ, colorQ, countQ, oddQ, oppositeQ } from './puzzles'
import { SOUNDS } from './sounds'
import { Sequence } from './SequenceView'
import { ListenThrough } from './ListenThroughView'
import { Scramble } from './ScrambleView'
import { getRecognition } from './pronounce'
import { Pronounce } from './PronounceView'
import { Rival } from './RivalView'
import { DAILY_GRAMMAR_COINS, GRAMMAR_CLEAR_XP } from './grammar'
import { BINGO_COINS } from './grammarbingo'
import { GRAMMAR_MONSTER_COINS, RUSH_GRAMMAR_COINS } from './grammarmonster'
import { LongReading } from './LongReadingView'
import { Reading } from './ReadingView'
import { Tiles } from './TilesView'
import { WORDS, type Level, type Word } from './words'

// listen：音声だけ聞いて日本語の意味を選ぶ
// spell：日本語を見て英単語を入力
// blank：例文の空欄に入る単語を選ぶ
// irregular：不規則動詞の活用ドリル
// speak：発音練習（音声認識が使える端末のみ表示）
// grammar：文法ミニ解説＋確認問題
// order：例文の並べ替え
// dictation：音声を聞いて書く
// sentence：例文を聞いて訳を選ぶ
// mix：英→日・日→英・リスニングが1問ごとにランダム
// read：例文の音読（音声認識が使える端末のみ表示）
// timed：1問10秒の英→日。早いほどボーナス
// rival：ライバルと早押し
// reading：読解ミニ
// tiles：文字タイルで単語を作る
// confusing：まちがえやすい単語
// define：英語の説明を読んで単語を当てる
// shiritori：英語しりとり
// sequence：曜日・月・序数の順番
// through：聞き流し
// order-ear：例文を聞いて並べる
// sentence-read：例文を読んで訳を選ぶ
// 1種類の問題をくり返すだけのパズル
const SIMPLE_PUZZLES: Partial<Record<Direction, () => PuzzleQ>> = {
  neg: negQ,
  homophone: homophoneQ,
  placeprep: placePrepQ,
  modal: modalQ,
  pronoun: pronounQ,
  muchmany: muchManyQ,
  ordinal: ordinalQ,
  waswere: wasWereQ,
}

export type Direction = 'waswere' | 'ordinal' | 'muchmany' | 'pronoun' | 'modal' | 'placeprep' | 'homophone' | 'neg' | 'riddle' | 'placement' | 'gmix' | 'timeprep' | 'wh' | 'be' | 'article' | 'twister' | 'wordsearch' | 'third' | 'ing' | 'bingo' | 'memory' | 'compare' | 'past-ed' | 'plural' | 'calc' | 'alphabet' | 'color' | 'clock' | 'count' | 'odd' | 'opposite' | 'abc' | 'versus' | 'emoji-ear' | 'emoji-rev' | 'emoji' | 'sounds' | 'numbers' | 'sentence-read' | 'order-ear' | 'through' | 'sequence' | 'shiritori' | 'define' | 'confusing' | 'tiles' | 'reading' | 'long-reading' | 'rival' | 'timed' | 'read' | 'mix' | 'en-ja' | 'ja-en' | 'listen' | 'sentence' | 'spell' | 'dictation' | 'blank' | 'order' | 'irregular' | 'speak' | 'grammar'

const prompt = (w: Word, d: Direction) =>
  d === 'ja-en' ? w.ja : d === 'emoji-rev' ? w.en : d === 'emoji' ? (EMOJI[w.id] ?? w.ja) : d === 'define' ? (DEFS[w.id] ?? w.ja) : d === 'sentence-read' ? w.example : w.en
const label = (d: Direction) =>
  d === 'emoji-rev' || d === 'emoji-ear' ? (w: Word) => EMOJI[w.id] ?? w.ja : d === 'ja-en' || d === 'blank' || d === 'define' || d === 'emoji' ? (w: Word) => w.en : d === 'sentence' || d === 'sentence-read' ? (w: Word) => w.exampleJa : (w: Word) => w.ja
// 穴埋めにできる単語が1つも無いとき（例文なしのマイ単語だけなど）は通常の単語から出す
const pool = (d: Direction, ws: Word[], all: Word[]) => {
  const can = d === 'define' ? (w: Word) => !!DEFS[w.id] : d === 'emoji' || d === 'emoji-rev' || d === 'emoji-ear' ? (w: Word) => !!EMOJI[w.id] : d === 'blank' ? canBlank : d === 'sentence' || d === 'sentence-read' ? (w: Word) => !!w.example && !!w.exampleJa : null
  if (!can) return ws
  const ok = ws.filter(can)
  if (ok.length > 0) return ok
  const fromAll = all.filter(can)
  return fromAll.length > 0 ? fromAll : WORDS.filter(can)
}

type Q = Question<Word> & { d?: Direction } // d：ミックスのときのその問題の種類

const MIX: Direction[] = ['en-ja', 'ja-en', 'listen']

function build(words: Word[], d: Direction, count: number, targets: Word[]): Q[] {
  const qs = buildAll(words, d, count, targets)
  return loadSettings().easy ? qs.map((q) => ({ ...trimChoices(q, 3), d: q.d })) : qs
}

function buildAll(words: Word[], d: Direction, count: number, targets: Word[]): Q[] {
  // 絵文字の逆：選択肢も絵文字のある単語から
  if (d === 'emoji-rev' || d === 'emoji-ear') return makeQuiz(WORDS.filter((w) => EMOJI[w.id]), label(d), count, Math.random, pool(d, targets, words))
  if (d !== 'mix') return makeQuiz(words, label(d), count, Math.random, pool(d, targets, words))
  return shuffle(targets)
    .slice(0, count)
    .map((w) => {
      const sub = MIX[Math.floor(Math.random() * MIX.length)]
      return { ...makeQuestion(w, words, label(sub)), d: sub }
    })
}

const DIRECTIONS: { id: Direction; label: string; group: string }[] = [
  { id: 'en-ja', label: '英→日', group: '4択' },
  { id: 'ja-en', label: '日→英', group: '4択' },
  { id: 'mix', label: '🎲 ミックス', group: '4択' },
  { id: 'timed', label: '⏳ 10秒', group: '4択' },
  { id: 'define', label: '🇬🇧 英英クイズ', group: '4択' },
  { id: 'placement', label: '📋 レベル診断', group: '4択' },
  { id: 'emoji', label: '😀 絵文字クイズ', group: '4択' },
  { id: 'emoji-rev', label: '🔤 英語→絵文字', group: '4択' },
  { id: 'sentence-read', label: '📄 例文の訳', group: '4択' },
  { id: 'rival', label: '⚔️ ライバル戦', group: 'パズル・ゲーム' },
  { id: 'shiritori', label: '🔗 しりとり', group: 'パズル・ゲーム' },
  { id: 'versus', label: '👥 2人対戦', group: 'パズル・ゲーム' },
  { id: 'abc', label: '🔠 ABC順', group: 'パズル・ゲーム' },
  { id: 'opposite', label: '↔️ 反対の意味', group: 'パズル・ゲーム' },
  { id: 'odd', label: '🧩 仲間はずれ', group: 'パズル・ゲーム' },
  { id: 'count', label: '🔢 いくつある？', group: 'パズル・ゲーム' },
  { id: 'clock', label: '🕐 時計を読もう', group: 'パズル・ゲーム' },
  { id: 'color', label: '🎨 色の名前', group: 'パズル・ゲーム' },
  { id: 'alphabet', label: '🔤 アルファベット', group: 'パズル・ゲーム' },
  { id: 'calc', label: '➕ 英語で計算', group: 'パズル・ゲーム' },
  { id: 'riddle', label: '🤔 英語なぞなぞ', group: 'パズル・ゲーム' },
  { id: 'memory', label: '🃏 神経衰弱', group: 'パズル・ゲーム' },
  { id: 'bingo', label: '🎯 単語ビンゴ', group: 'パズル・ゲーム' },
  { id: 'wordsearch', label: '🔍 ことばさがし', group: 'パズル・ゲーム' },
  { id: 'plural', label: '👥 複数形', group: '文法・読解' },
  { id: 'past-ed', label: '⏪ 過去形のつづり', group: '文法・読解' },
  { id: 'compare', label: '📏 比較級・最上級', group: '文法・読解' },
  { id: 'be', label: '🟰 be動詞', group: '文法・読解' },
  { id: 'article', label: '🅰️ a と an', group: '文法・読解' },
  { id: 'neg', label: '🚫 否定文', group: '文法・読解' },
  { id: 'placeprep', label: '📦 場所の前置詞', group: '文法・読解' },
  { id: 'modal', label: '💪 助動詞', group: '文法・読解' },
  { id: 'pronoun', label: '👤 代名詞', group: '文法・読解' },
  { id: 'muchmany', label: '🔢 much と many', group: '文法・読解' },
  { id: 'ordinal', label: '🥇 〜番目（序数）', group: 'パズル・ゲーム' },
  { id: 'waswere', label: '⏪ was と were', group: '文法・読解' },
  { id: 'homophone', label: '👂 同じ発音', group: 'パズル・ゲーム' },
  { id: 'gmix', label: '🎲 文法ミックス', group: '文法・読解' },
  { id: 'timeprep', label: '🗓 in・on・at（時）', group: '文法・読解' },
  { id: 'wh', label: '❔ 疑問詞', group: '文法・読解' },
  { id: 'third', label: '🧍 3単現の s', group: '文法・読解' },
  { id: 'ing', label: '🏃 ing形のつづり', group: '文法・読解' },
  { id: 'sequence', label: '📅 順番クイズ', group: 'パズル・ゲーム' },
  { id: 'listen', label: '🎧 リスニング', group: '聞く・話す' },
  { id: 'emoji-ear', label: '👂 聞いて絵文字', group: '聞く・話す' },
  { id: 'through', label: '📻 聞き流し', group: '聞く・話す' },
  { id: 'numbers', label: '🔢 数・時刻・日付の聞き取り', group: '聞く・話す' },
  { id: 'order-ear', label: '🎧 聞き並べ', group: '聞く・話す' },
  { id: 'sentence', label: '🗣 例文リスニング', group: '聞く・話す' },
  { id: 'dictation', label: '🎧 書き取り', group: '聞く・話す' },
  { id: 'speak', label: '🎤 発音', group: '聞く・話す' },
  { id: 'read', label: '📢 音読', group: '聞く・話す' },
  { id: 'spell', label: '✏️ スペル', group: '書く・並べる' },
  { id: 'tiles', label: '🔤 文字タイル', group: '書く・並べる' },
  { id: 'blank', label: '📝 穴埋め', group: '書く・並べる' },
  { id: 'order', label: '🔀 並べ替え', group: '書く・並べる' },
  { id: 'irregular', label: '🔁 不規則動詞', group: '文法・読解' },
  { id: 'grammar', label: '📖 文法', group: '文法・読解' },
  { id: 'reading', label: '📰 読解', group: '文法・読解' },
  { id: 'long-reading', label: '📖 長文読解（入試形式）', group: '文法・読解' },
  { id: 'confusing', label: '⚠️ まちがえやすい単語', group: '文法・読解' },
  { id: 'sounds', label: '👄 発音のコツ', group: '文法・読解' },
  { id: 'twister', label: '👅 早口ことば', group: '聞く・話す' },
]
const GROUPS = ['4択', 'パズル・ゲーム', '聞く・話す', '書く・並べる', '文法・読解']
const COLLAPSE_KEY = 'eitan:quiz-collapsed'
function loadCollapsed(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(COLLAPSE_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
function saveCollapsed(list: string[]): string[] {
  try {
    localStorage.setItem(COLLAPSE_KEY, JSON.stringify(list))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
  return list
}

const MODE_KEY = 'eitan:quiz-mode'
function loadMode(fallback: Direction): Direction {
  try {
    const m = localStorage.getItem(MODE_KEY) as Direction | null
    return m && DIRECTIONS.some((d) => d.id === m) ? m : fallback
  } catch {
    return fallback
  }
}

type Props = {
  words: Word[]
  targets?: Word[] // 出題する単語（省略時は words 全部）
  direction?: Direction
  count?: number
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onFinish?: (score: number, total: number) => void
  onCombo?: (combo: number) => void // 正解するたびに今のコンボ数
  onSpend?: (coins: number) => boolean // コインを使う（足りなければ false）
  onRivalWin?: () => void
  onGame?: () => void // 神経衰弱・ビンゴをクリアしたとき
  onSetLevels?: (levels: Level[]) => void // レベル診断の結果で単語帳を切りかえる
  onTicket?: () => void // 文法スタンプ10個ごとのガチャチケット
  onCoins?: (n: number) => void // コインのごほうび（文法モンスターなど）
  onGoalTicket?: () => void // 文法の今週の目標をたっせい
  onXp?: (n: number) => void // XPのごほうび（文法の単元をはじめて全問正解など）
  onFavorite?: (ids: string[]) => void // まちがえた単語を★に入れる
  onRestart?: () => void // 指定すると「もう1回」でこれを呼ぶ（ステージ用）
  lockDirection?: boolean // 出題の向きを切り替えさせない（ステージ用）
}

export const QUESTION_TIME = 10
export const HINT_COST = 5
const COUNTS = [5, 10, 20]
// 問題数を使わない種類（自分のペースで続ける・決まった数で遊ぶもの）
const NO_COUNT: Direction[] = ['placement', 'twister', 'wordsearch', 'memory', 'bingo', 'shiritori', 'versus', 'rival', 'through', 'reading', 'long-reading', 'grammar', 'confusing', 'sounds']
const COUNT_KEY = 'eitan:quiz-count'
function loadCount(fallback: number): number {
  try {
    const n = Number(localStorage.getItem(COUNT_KEY))
    return COUNTS.includes(n) ? n : fallback
  } catch {
    return fallback
  }
}

export function Quiz({ words, targets, direction: directionProp, count: countProp = 10, onAnswer: onAnswerProp, onFinish, onRestart, lockDirection = false, onCombo, onSpend, onRivalWin, onFavorite, onGame, onSetLevels, onTicket, onCoins, onXp, onGoalTicket }: Props) {
  // 種類：指定がなければ最後に遊んだ種類（ステージは英→日）
  const [initial] = useState<Direction>(() => directionProp ?? (lockDirection ? 'en-ja' : loadMode('en-ja')))
  const [direction, setDirection] = useState<Direction>(initial)
  const [menu, setMenu] = useState(false)
  // 今日のおすすめ：その種類でその日はじめて正解するとボーナスXP（ステージは対象外）
  const [today] = useState(() => dayKey())
  const featured = lockDirection ? null : featuredFor(today)
  const onAnswer: Props['onAnswer'] = (correct, xp, wordId, source) => {
    if (correct && direction === featured && !featuredClaimed(today)) {
      claimFeatured(today)
      xp += FEATURED_XP
    }
    onAnswerProp?.(correct, xp, wordId, source)
  }
  const [played, setPlayed] = useState(loadPlayed)
  const [recent, setRecent] = useState(loadRecent)
  const [collapsed, setCollapsed] = useState(loadCollapsed)
  // 問題数：ステージ（向き固定）は指定どおり、ふだんは選んだ数を覚えておく
  const [count, setCount] = useState(() => (lockDirection ? countProp : loadCount(countProp)))
  const [questions, setQuestions] = useState<Q[]>(() => build(words, initial, count, targets ?? words))
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [earned, setEarned] = useState(0)
  const [lastXp, setLastXp] = useState(0)
  const [missed, setMissed] = useState<Word[]>([])
  const [favDone, setFavDone] = useState(false)
  const [shared, setShared] = useState('')
  const [left, setLeft] = useState(QUESTION_TIME) // 制限時間モードの残り秒
  const [removed, setRemoved] = useState<number[]>([]) // 50:50 で消した選択肢

  const q = questions[index]
  const qd: Direction = q?.d ?? direction // この問題の種類（ミックスでは1問ごとに変わる）

  // 1〜4キーで選ぶ、Enter で次へ（4択の画面だけ）
  const fourChoice = ['en-ja', 'ja-en', 'listen', 'sentence', 'blank', 'timed', 'define', 'sentence-read', 'emoji', 'emoji-rev', 'emoji-ear'].includes(qd)
  useKeys((key) => {
    if (!fourChoice || !q) return
    const n = Number(key)
    if (picked === null && n >= 1 && n <= q.choices.length) {
      pick(n - 1)
      return true
    }
    if (picked !== null && key === 'Enter') {
      next()
      return true
    }
  })

  // リスニングは問題が変わるたびに自動で読み上げる
  useEffect(() => {
    if ((qd === 'listen' || qd === 'emoji-ear') && q) speak(q.word.en)
    if (qd === 'sentence' && q) speak(q.word.example)
  }, [qd, q])

  // 制限時間モード：1秒ずつ減らし、0になったら時間切れ（まちがい扱い）
  const timing = direction === 'timed' && picked === null && !!q
  useEffect(() => {
    if (!timing) return
    const id = window.setInterval(() => setLeft((t) => t - 1), 1000)
    return () => window.clearInterval(id)
  }, [timing, index])
  useEffect(() => {
    if (timing && left <= 0) pick(-1)
  })

  function fiftyFifty() {
    if (!q || removed.length > 0 || !onSpend?.(HINT_COST)) return
    const wrong = shuffle(q.choices.map((_, i) => i).filter((i) => i !== q.answer)).slice(0, 2)
    setRemoved(wrong)
  }

  function pick(i: number) {
    if (picked !== null || removed.includes(i)) return
    setPicked(i)
    if (i === q.answer) {
      const c = combo + 1
      const xp = quizXp(c) + (direction === 'timed' ? Math.max(0, left) : 0)
      setScore(score + 1)
      setCombo(c)
      setMaxCombo(Math.max(maxCombo, c))
      setEarned(earned + xp)
      setLastXp(xp)
      playCorrect()
      onCombo?.(c)
      onAnswer?.(true, xp, q.word.id, qd === 'listen' || qd === 'sentence' || qd === 'emoji-ear' ? 'ear' : 'quiz')
    } else {
      setCombo(0)
      setLastXp(0)
      setMissed([...missed, q.word])
      playWrong()
      onAnswer?.(false, 0, q.word.id, qd === 'listen' || qd === 'sentence' || qd === 'emoji-ear' ? 'ear' : 'quiz')
    }
  }

  function next() {
    setPicked(null)
    setRemoved([])
    setLeft(QUESTION_TIME)
    setIndex(index + 1)
    if (index + 1 === questions.length) onFinish?.(score, questions.length)
  }

  function restart(d: Direction = direction, only?: Word[]) {
    setDirection(d)
    setMenu(false)
    try {
      localStorage.setItem(MODE_KEY, d)
    } catch {
      // ストレージが使えない環境では保存をあきらめる
    }
    setQuestions(build(words, d, only ? only.length : count, only ?? targets ?? words))
    setMissed([])
    setFavDone(false)
    setShared('')
    setLeft(QUESTION_TIME)
    setRemoved([])
    setIndex(0)
    setPicked(null)
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    setEarned(0)
  }

  function changeCount(n: number) {
    setCount(n)
    try {
      localStorage.setItem(COUNT_KEY, String(n))
    } catch {
      // ストレージが使えない環境では保存をあきらめる
    }
    setDirection(direction)
    setQuestions(build(words, direction, n, targets ?? words))
    setMissed([])
    setIndex(0)
    setPicked(null)
    setScore(0)
    setCombo(0)
    setMaxCombo(0)
    setEarned(0)
  }

  const toggle = lockDirection ? null : (
    <>
      <button className="mode-btn" aria-expanded={menu} onClick={() => setMenu(!menu)}>
        {DIRECTIONS.find((d) => d.id === direction)?.label} <span className="mode-change">種類を変える {menu ? '▲' : '▼'}</span>
      </button>
      {menu && (
        <div className="mode-menu" role="group" aria-label="クイズの種類">
          {featured && <p className="stats-note">⭐ は今日のおすすめ（その日はじめての正解で +{FEATURED_XP}XP）</p>}
          {recent.length > 0 && (
            <div className="mode-group mode-recent">
              <p className="mode-group-name">さいきん遊んだ種類</p>
              <div className="direction">
                {recent
                  .map((id) => DIRECTIONS.find((d) => d.id === id))
                  .filter((d): d is (typeof DIRECTIONS)[number] => !!d)
                  .map((d) => (
                    <button key={d.id} aria-pressed={direction === d.id} onClick={() => restart(d.id)}>
                      ↺ {d.label}
                    </button>
                  ))}
              </div>
            </div>
          )}
          {GROUPS.map((g) => (
            <div key={g} className="mode-group">
              <button
                className="mode-group-name"
                aria-expanded={!collapsed.includes(g)}
                onClick={() => setCollapsed((c) => saveCollapsed(c.includes(g) ? c.filter((x) => x !== g) : [...c, g]))}
              >
                {collapsed.includes(g) ? '▶' : '▼'} {g}
              </button>
              {!collapsed.includes(g) && (
              <div className="direction">
                {DIRECTIONS.filter((d) => d.group === g && ((d.id !== 'speak' && d.id !== 'read') || getRecognition())).map((d) => (
                  <button
                    key={d.id}
                    aria-pressed={direction === d.id}
                    onClick={() => {
                      setPlayed((p) => markPlayed(p, d.id))
                      setRecent((r) => pushRecent(r, d.id))
                      restart(d.id)
                    }}
                  >
                    <span>{d.label}</span>
                    {d.id === featured && (
                      <span className="featured-mark" aria-label="今日のおすすめ">
                        ⭐
                      </span>
                    )}
                    {isNew(d.id, played) && <span className="new-mark">NEW</span>}
                  </button>
                ))}
              </div>
              )}
            </div>
          ))}
        </div>
      )}
      {!NO_COUNT.includes(direction) && (
        <div className="counts" role="group" aria-label="問題数">
          {COUNTS.map((n) => (
            <button key={n} aria-pressed={count === n} onClick={() => changeCount(n)}>
              {n}問
            </button>
          ))}
        </div>
      )}
    </>
  )

  if (direction === 'order') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Scramble key={count} words={targets ?? words} count={count} onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'order-ear') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Scramble key={`ear-${count}`} words={targets ?? words} count={count} onAnswer={onAnswer} byEar />
      </>
    )
  }

  if (direction === 'through') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <ListenThrough words={targets ?? words} />
      </>
    )
  }

  if (direction === 'sequence') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Sequence key={count} count={count} onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'placement') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Placement onSetLevels={onSetLevels} />
      </>
    )
  }

  if (direction === 'twister') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Twisters onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'wordsearch') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <WordSearch words={targets && targets.length >= 6 ? targets : words} onAnswer={onAnswer} onClear={onGame} />
      </>
    )
  }

  if (direction === 'bingo') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Bingo words={targets && targets.length >= 9 ? targets : words} onAnswer={onAnswer} onClear={onGame} />
      </>
    )
  }

  if (direction === 'memory') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Memory words={targets && targets.length >= 6 ? targets : words} onAnswer={onAnswer} onClear={onGame} />
      </>
    )
  }

  if (direction === 'riddle') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`riddle-${count}`} make={() => riddleQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'gmix') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`gmix-${count}`} make={() => grammarMixQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'timeprep' || direction === 'wh') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`${direction}-${count}`} make={() => (direction === 'wh' ? whQ() : timePrepQ())} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  const simple = SIMPLE_PUZZLES[direction]
  if (simple) {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`${direction}-${count}`} make={() => simple()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'be' || direction === 'article') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`${direction}-${count}`} make={() => (direction === 'be' ? beQ() : articleQ())} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'third' || direction === 'ing') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`${direction}-${count}`} make={() => (direction === 'third' ? thirdQ() : ingQ())} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'compare') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`compare-${count}`} make={() => compareQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'past-ed') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`past-ed-${count}`} make={() => pastQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'plural') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`plural-${count}`} make={() => pluralQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'calc') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`calc-${count}`} make={() => calcQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'alphabet') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`alphabet-${count}`} make={() => alphabetQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'color') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`color-${count}`} make={() => colorQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'clock') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`clock-${count}`} make={() => clockQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'count') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`count-${count}`} make={() => countQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'odd') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`odd-${count}`} make={() => oddQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'opposite') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`opposite-${count}`} make={() => oppositeQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'abc') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Puzzle key={`abc-${count}`} make={() => abcQ()} onAnswer={onAnswer} count={count} />
      </>
    )
  }

  if (direction === 'versus') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Versus words={words} />
      </>
    )
  }

  if (direction === 'numbers') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Numbers key={count} onAnswer={onAnswer} round={count} />
      </>
    )
  }

  if (direction === 'shiritori') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Shiritori onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'sounds') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Grammar key="sounds" units={SOUNDS} title="発音のコツ" onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'confusing') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Grammar key="confusing" units={CONFUSING} title="まちがえやすい単語" onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'grammar') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Grammar onAnswer={onAnswer} onBingo={onCoins ? () => onCoins(BINGO_COINS) : undefined} onWeeklyGoal={onGoalTicket} onFirstClear={onXp ? () => onXp(GRAMMAR_CLEAR_XP) : undefined} onStampTicket={onTicket} onMonsterWin={onCoins ? () => onCoins(GRAMMAR_MONSTER_COINS) : undefined} onDailyBonus={onCoins ? () => onCoins(DAILY_GRAMMAR_COINS) : undefined} onRushWin={onCoins ? () => onCoins(RUSH_GRAMMAR_COINS) : undefined} onSpend={onSpend} />
      </>
    )
  }

  if (direction === 'tiles') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Tiles key={count} words={targets ?? words} count={count} onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'long-reading') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <LongReading onAnswer={onAnswer} onFavorite={onFavorite} />
      </>
    )
  }

  if (direction === 'reading') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Reading onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'rival') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Rival words={targets ?? words} onAnswer={onAnswer} onWin={onRivalWin} />
      </>
    )
  }

  if (direction === 'read') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Pronounce key={`read-${count}`} words={targets ?? words} count={count} onAnswer={onAnswer} sentence />
      </>
    )
  }

  if (direction === 'speak') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Pronounce key={count} words={targets ?? words} count={count} onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'irregular') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Irregular key={count} count={count} onAnswer={onAnswer} />
      </>
    )
  }

  if (direction === 'dictation') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Spell key={`dictation-${count}`} words={targets ?? words} count={count} onAnswer={onAnswer} byEar />
      </>
    )
  }

  if (direction === 'spell') {
    return (
      <>
        <div className="card-tabs">{toggle}</div>
        <Spell key={count} words={targets ?? words} count={count} onAnswer={onAnswer} />
      </>
    )
  }

  if (!q) {
    const rate = questions.length === 0 ? 0 : Math.round((score / questions.length) * 100)
    return (
      <section className="card result">
        <p className="result-title">結果</p>
        <p className="result-score">
          {score} / {questions.length} 問正解
        </p>
        <dl className="result-list">
          <div>
            <dt>正答率</dt>
            <dd>{rate}%</dd>
          </div>
          <div>
            <dt>獲得XP</dt>
            <dd>+{earned}</dd>
          </div>
          <div>
            <dt>最大コンボ</dt>
            <dd>{maxCombo}</dd>
          </div>
        </dl>
        <p className="result-message">
          {rate === 100 ? 'パーフェクト！すごい！' : rate >= 70 ? 'いい調子！' : 'もう1回で覚えちゃおう！'}
        </p>
        <button
          className="list-link"
          onClick={() =>
            shareText(quizShareText(DIRECTIONS.find((d) => d.id === direction)?.label ?? 'クイズ', score, questions.length)).then((r) =>
              setShared(r === 'copied' ? 'コピーしました' : r === 'shared' ? '' : 'シェアできませんでした'),
            )
          }
        >
          📤 結果をシェア
        </button>
        {shared && (
          <p className="stats-note" role="status">
            {shared}
          </p>
        )}
        <MissedList words={missed} />
        {missed.length > 0 && !onRestart && (
          <button className="list-link" onClick={() => restart(direction, missed)}>
            まちがえた {missed.length}問だけもう一度
          </button>
        )}
        {missed.length > 0 && onFavorite && (
          <button
            className="list-link"
            disabled={favDone}
            onClick={() => {
              onFavorite(missed.map((w) => w.id))
              setFavDone(true)
            }}
          >
            {favDone ? '★に入れました' : 'まちがえた単語を★お気に入りに入れる'}
          </button>
        )}
        <button className="flip" onClick={() => (onRestart ? onRestart() : restart())}>
          もう1回
        </button>
      </section>
    )
  }

  return (
    <section className="card quiz" aria-live="polite">
      {toggle}
      {direction === 'timed' && (
        <div className="timer-bar" aria-label={`のこり ${Math.max(0, left)}秒`}>
          <div className="timer-fill" style={{ width: `${(Math.max(0, left) / QUESTION_TIME) * 100}%` }} />
        </div>
      )}
      <p className="progress">
        {index + 1} / {questions.length}
        {combo >= 2 && (
          <span key={combo} className="combo">
            🔥{combo} コンボ！
          </span>
        )}
      </p>
      {qd === 'blank' ? (
        <BlankPrompt word={q.word} revealed={picked !== null} />
      ) : qd === 'sentence' ? (
        <>
          <button className="listen" onClick={() => speak(q.word.example)} aria-label="もう一度聞く">
            🔊
          </button>
          <button className="speak" onClick={() => speak(q.word.example, true)} aria-label="ゆっくり聞く">
            🐢
          </button>
          <p className="example listen-sentence">{picked !== null ? q.word.example : '例文を聞いて、意味を選ぼう'}</p>
        </>
      ) : qd === 'listen' || qd === 'emoji-ear' ? (
        <>
          <button className="listen" onClick={() => speak(q.word.en)} aria-label="もう一度聞く">
            🔊
          </button>
          <button className="speak" onClick={() => speak(q.word.en, true)} aria-label="ゆっくり聞く">
            🐢
          </button>
          <p className="en listen-word">{picked !== null ? q.word.en : '？'}</p>
        </>
      ) : (
        <p className={qd === 'ja-en' ? 'en ja-prompt' : qd === 'emoji' ? 'en emoji-prompt' : qd === 'define' || qd === 'sentence-read' ? 'define-prompt' : 'en'}>{prompt(q.word, qd)}</p>
      )}
      <div className={`choices${qd === 'emoji-rev' || qd === 'emoji-ear' ? ' emoji-choices' : ''}`}>
        {q.choices.map((c, i) => {
          let cls = 'choice'
          if (picked !== null && i === q.answer) cls += ' correct'
          else if (picked === i) cls += ' wrong'
          return (
            <button
              key={c}
              className={`${cls}${removed.includes(i) ? ' removed' : ''}`}
              onClick={() => pick(i)}
              disabled={picked !== null || removed.includes(i)}
            >
              {c}
            </button>
          )
        })}
      </div>
      {picked === null && onSpend && q.choices.length === 4 && removed.length === 0 && (
        <button className="hint-5050" onClick={fiftyFifty}>
          💡 50:50（🪙{HINT_COST}）
        </button>
      )}
      {picked === q.answer && combo > 0 && combo % 10 === 0 && (
        <p className="mega-combo" role="status">
          🔥{combo}コンボ！ すごい！
        </p>
      )}
      {picked !== null && (
        <>
          <p className="feedback">
            {picked === q.answer ? (
              <>
                正解！ <span className="xp-gain">+{lastXp} XP</span>
              </>
            ) : (
              `${picked === -1 ? '時間切れ！ ' : ''}正解は「${q.choices[q.answer]}」`
            )}
          </p>
          {picked !== q.answer && qd !== 'blank' && q.word.example && (
            <div className="miss-example">
              <p className="example">
                <strong>{q.word.en}</strong>：{q.word.ja}
              </p>
              <p className="example">
                <Highlight text={q.word.example} word={q.word.en} />
                <button className="speak small" onClick={() => speak(q.word.example)} aria-label="例文を聞く">
                  🔊
                </button>
              </p>
              <p className="example-ja">{q.word.exampleJa}</p>
            </div>
          )}
          <button className="flip" onClick={next}>
            次へ
          </button>
        </>
      )}
    </section>
  )
}

function BlankPrompt({ word, revealed }: { word: Word; revealed: boolean }) {
  const b = blankOut(word.example, word.en)
  if (!b) return null
  return (
    <div className="blank-prompt">
      <p className="example blank-sentence">
        {b.before}
        <span className={`blank${revealed ? ' filled' : ''}`}>{revealed ? b.answer : '\u3000\u3000\u3000'}</span>
        {b.after}
      </p>
      <p className="example-ja">{word.exampleJa}</p>
    </div>
  )
}
