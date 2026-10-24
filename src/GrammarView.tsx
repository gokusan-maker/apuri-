import { splitSoft } from './softbreak'
import { GRAMMAR_DRILLS, type GrammarDrill } from './grammardrills'
import { useState } from 'react'
import { BossFigure } from './BossView'
import { GrammarCards } from './GrammarCardsView'
import { GrammarListen } from './GrammarListenView'
import { GrammarOrder } from './GrammarOrderView'
import { GrammarSpot } from './GrammarSpotView'
import { GrammarTime } from './GrammarTimeView'
import { GRAMMAR_MONSTER_COINS, monsterLook, monsterName, RUSH_COUNT, RUSH_GRAMMAR_COINS } from './grammarmonster'
import { shuffle } from './quiz'
import { dayKey } from './srs'
import { mistakeOf } from './grammarmistake'
import { GrammarBingo } from './GrammarBingoView'
import { GrammarShadow } from './GrammarShadowView'
import { GrammarPrint } from './GrammarPrintView'
import { GrammarDict } from './GrammarDictView'
import { GrammarDuel } from './GrammarDuelView'
import { GrammarOdd } from './GrammarOddView'
import { GrammarOneMore } from './GrammarOneMoreView'
import { loadDuelBest } from './grammarduel'
import { BINGO_COINS, loadBingoBest } from './grammarbingo'
import { addGrammarCorrect, last7, loadGrammarWeek, saveGrammarWeek } from './grammarweek'
import { champOf, countChamp, loadGrammarChamp, saveGrammarChamp } from './grammarchamp'
import { clearForGoal, GOAL_CHOICES, loadGrammarGoal, saveGrammarGoal } from './grammargoal'
import { GameTile } from './GameTileView'
import { ALL_GAMES_COINS, allGamesClaimed, claimAllGames, loadTodayGames } from './gamesplayed'
import { praiseEnOf, quickPractice, relatedUnits, choiceOrder, almostUnits, correctSentence, weakIdsOf, TENSE_TABLE, nextUnit, randomQuestion, gradeClearRates, danOf, loadWrongDays, markWrongDay, yesterdayQuestions, allCleared, loadMaster, saveMaster, unitOfQuestion, GRAMMAR_STREAK_COINS, GRAMMAR_STREAK_DAYS, loadGrammarDays, saveGrammarDays, studyGrammarDay, weakRanking, praiseOf, recommendUnits, searchUnits, loadClears, saveClears, unitStars, loadNotebook, notebookQuestions, noteAfter, saveNotebook, GRAMMAR_CLEAR_XP, favFirst, loadGrammarFav, saveGrammarFav, toggleGrammarFav, grammarShareText, loadGrammarStreak, saveGrammarStreak, streakAfter, GRAMMAR_HINT_COST, gradeOf, GRAMMAR_GRADES, type GrammarGrade, loadTaBest, dailyGrammar, loadDailyGrammarDay, saveDailyGrammarDay, GRAMMAR, grammarStamps, weakUnits, loadGrammar, loadMixBest, mixRank, saveGrammar, saveMixBest, STAMP_EVERY, type GrammarUnit } from './grammar'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

type Props = {
  onDrill?: (id: GrammarDrill) => void // 文法ドリル（単語ゲームから移したことばの形の練習）を選んだ
  units?: GrammarUnit[] // 省略時は文法の単元
  title?: string
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onStampTicket?: () => void // スタンプが10個ふえるごとに（文法のときだけ）
  onMonsterWin?: () => void // 文法モンスターをたおした（ごほうびはアプリ側）
  onDailyBonus?: () => void // 今日の文法を全問正解した（1日1回）
  onRushWin?: () => void // 文法モンスターラッシュを3連勝した
  onSpend?: (coins: number) => boolean // ヒントのコイン
  onFirstClear?: () => void // 単元をはじめて全問正解したとき
  onWeeklyGoal?: () => void // 今週の目標を達成したとき
  onBingo?: () => void // 文法ビンゴがそろったとき
  partnerName?: string // 全問正解のときほめてくれる相棒の名前
  quickStart?: boolean // 開いたらすぐ練習問題を始める（文法タブ）
  onStreakBonus?: () => void // 文法を3日続けたとき
  onMaster?: () => void // 全単元を全問正解したとき（1回だけ）
  onQuickPerfect?: () => void // 「すぐ練習」5問を全問正解したとき
  onRunBest?: () => void // 連続正解チャレンジでベストを更新したとき（3問以上）
  onAllGames?: () => void // 文法ゲームを1日に全部あそんだごほうび
  onTaBest?: () => void // 文法タイムアタック・2択スピードでベストを更新したとき
}

export const QUICK_PERFECT_COINS = 5 // すぐ練習を全問正解したときのコイン
// 一度でも開いた文法の単元（まだ開いていない・まだ答えていない単元に NEW 印）
const OPENED_KEY = 'eitan:grammar-opened'
// はじめて文法チャレンジを見たときにあった単元。NEW 印はそのあとに追加された単元だけにつける（最初から全部に NEW が並ばないように）
const KNOWN_KEY = 'eitan:grammar-known'
function loadKnownUnits(all: string[]): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KNOWN_KEY) ?? 'null') as unknown
    if (Array.isArray(v)) return v.filter((x): x is string => typeof x === 'string')
    localStorage.setItem(KNOWN_KEY, JSON.stringify(all))
  } catch {
    // 保存できなくても続ける
  }
  return all
}
function loadOpened(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(OPENED_KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}
function markOpened(id: string): string[] {
  const list = [...loadOpened().filter((x) => x !== id), id]
  try {
    localStorage.setItem(OPENED_KEY, JSON.stringify(list))
  } catch {
    // 保存できなくても続ける
  }
  return list
}

const GAME_COUNT = 12 // 文法ゲームの種類（下のタイルの数）
// 連続正解チャレンジ：まちがえるまで全単元の問題が続く。ベスト記録を残す
export const RUN_BEST_XP = 20 // 連続正解のベスト更新で文法のなかまにあげる XP
const RUN_KEY = 'eitan:grammar-run-best'
function loadRunBest(): number {
  try {
    return Number(localStorage.getItem(RUN_KEY)) || 0
  } catch {
    return 0
  }
}
function saveRunBest(n: number): void {
  try {
    localStorage.setItem(RUN_KEY, String(n))
  } catch {
    // 保存できなくても続ける
  }
}

export function Grammar({ onDrill, quickStart = false, units = GRAMMAR, title = '文法ミニ解説', onAnswer, onStampTicket, onMonsterWin, onDailyBonus, onRushWin, onSpend, onFirstClear, onWeeklyGoal, onBingo, partnerName, onStreakBonus, onMaster, onQuickPerfect, onRunBest, onTaBest, onAllGames }: Props) {
  const playedToday = loadTodayGames(dayKey()).filter((k) => k.startsWith('grammar:')).length
  const [allClaimed, setAllClaimed] = useState(() => allGamesClaimed(dayKey()))
  const [runBest, setRunBest] = useState(loadRunBest) // 連続正解チャレンジのベスト
  const [runBonus, setRunBonus] = useState(false) // ベスト更新のボーナスのお知らせ
  const [opened, setOpened] = useState(loadOpened) // 一度でも開いた単元（NEW 印を消す）
  const [known] = useState(() => loadKnownUnits(GRAMMAR.map((u) => u.id))) // 最初からあった単元には NEW をつけない
  const [quickPerfect, setQuickPerfect] = useState(false) // すぐ練習を全問正解した（ごほうびのお知らせ）
  const stampMode = units === GRAMMAR
  const [record, setRecord] = useState(loadGrammar)
  // quickStart のときは、開いたらすぐ練習問題（まだ全問正解していない単元から5問）
  const [unit, setUnit] = useState<GrammarUnit | null>(() => (quickStart ? quickPractice(loadGrammar(), Math.random) : null))
  const [step, setStep] = useState(quickStart ? 0 : -1) // -1：解説、0〜：問題、length：結果
  const [picked, setPicked] = useState<number | null>(null)
  const [streak, setStreak] = useState(loadGrammarStreak)
  const [copied, setCopied] = useState(false)
  const [bingo, setBingo] = useState(false)
  const [shadow, setShadow] = useState(false)
  const [printing, setPrinting] = useState(false)
  const [dict, setDict] = useState(false)
  const [duel, setDuel] = useState(false)
  const [odd, setOdd] = useState(false)
  const [note, setNote] = useState(loadNotebook)
  const [champ, setChamp] = useState(loadGrammarChamp)
  const [gweek, setGweek] = useState(loadGrammarWeek)
  const [missed, setMissed] = useState<GrammarUnit['questions']>([]) // この回でまちがえた問題
  const [todoFirst, setTodoFirst] = useState(false) // 単元一覧を「まだの単元から」ならべる
  const [shuffleSeed, setShuffleSeed] = useState(0) // 選択肢の順番をずらす（単元を開くたびに変わる）
  const [showPoints, setShowPoints] = useState(false) // まちがえたとき、その場で単元の要点を見る
  const [wrongDays, setWrongDays] = useState(loadWrongDays)
  const [clears, setClears] = useState(loadClears)
  const [gDays, setGDays] = useState(loadGrammarDays)
  const [master, setMaster] = useState(loadMaster)
  const [streakBonus, setStreakBonus] = useState(false)
  const [weekGoal, setWeekGoal] = useState(() => loadGrammarGoal(dayKey()))
  const [goalReached, setGoalReached] = useState(false)
  const [firstClear, setFirstClear] = useState(false) // この回ではじめて全問正解した
  const [fav, setFav] = useState(loadGrammarFav)
  const [keyword, setKeyword] = useState('')
  const [score, setScore] = useState(0)
  const [battle, setBattle] = useState(false) // 文法モンスターと戦うモード
  const [ordering, setOrdering] = useState(false) // 並べかえクイズ
  const [spot, setSpot] = useState(false) // まちがいさがし
  const [timeAttack, setTimeAttack] = useState(false) // タイムアタック
  const [grade, setGrade] = useState<GrammarGrade | 'all'>('all')
  const [rush, setRush] = useState<{ list: GrammarUnit[]; at: number } | null>(null) // 文法モンスターラッシュ
  const [cards, setCards] = useState(false) // 要点カード
  const [hidden, setHidden] = useState<{ step: number; i: number } | null>(null) // ヒントで消した選択肢
  const [listen, setListen] = useState(false) // 例文リスニング
  const [today] = useState(() => dayKey())
  const [dailyDay, setDailyDay] = useState(loadDailyGrammarDay)
  const daily = dailyGrammar(today)
  const [mixBest, setMixBest] = useState(loadMixBest) // まとめテストのベスト（タイトルごと）
  const [gradeKey, setGradeKey] = useState('') // 学年まとめテストのベストのキー（grade:中1 など）

  function startBattle(u: GrammarUnit) {
    open(u)
    setBattle(true)
    setStep(0)
  }

  function open(u: GrammarUnit) {
    if (GRAMMAR.some((g) => g.id === u.id) && !opened.includes(u.id)) setOpened(markOpened(u.id))
    setHidden(null)
    setQuickPerfect(false)
    setRunBonus(false)
    setCopied(false)
    setShadow(false)
    setPrinting(false)
    setDict(false)
    setFirstClear(false)
    setGoalReached(false)
    setBattle(false)
    setOrdering(false)
    setUnit(u)
    setStep(-1)
    setPicked(null)
    setScore(0)
    setMissed([])
    setShuffleSeed(Math.floor(Math.random() * 1000))
  }

  if (spot) return <GrammarSpot onAnswer={onAnswer} onBack={() => setSpot(false)} units={grade === 'all' ? GRAMMAR : GRAMMAR.filter((u) => gradeOf(u.id) === grade)} label={grade === 'all' ? undefined : grade} />
  if (cards) return <GrammarCards units={units.filter((u) => !stampMode || grade === 'all' || gradeOf(u.id) === grade)} onBack={() => setCards(false)} weak={weakIdsOf(note)} />
  if (listen) return <GrammarListen onAnswer={onAnswer} onBack={() => setListen(false)} />
  if (odd) return <GrammarOdd onAnswer={onAnswer} onBack={() => setOdd(false)} />
  if (duel) return <GrammarDuel onBest={onTaBest} onBack={() => setDuel(false)} />
  if (bingo) return <GrammarBingo onBack={() => setBingo(false)} onBingo={onBingo} />
  if (timeAttack) return <GrammarTime onAnswer={onAnswer} onBest={onTaBest} onBack={() => setTimeAttack(false)} units={grade === 'all' ? GRAMMAR : GRAMMAR.filter((u) => gradeOf(u.id) === grade)} label={grade === 'all' ? undefined : grade} />

  // 「まだの単元から」のときは、全問正解していない単元を先に
  const todoSort = <T extends GrammarUnit>(us: T[]) => (todoFirst ? [...us.filter((u) => record[u.id] !== u.questions.length), ...us.filter((u) => record[u.id] === u.questions.length)] : us)
  const unitItem = (u: GrammarUnit) => (
    <li key={u.id} className={stampMode ? 'with-fav' : undefined}>
      {stampMode && (
        <button
          className={`grammar-fav${fav.includes(u.id) ? ' on' : ''}`}
          aria-label={`${u.title}をお気に入り${fav.includes(u.id) ? 'からはずす' : 'にする'}`}
          aria-pressed={fav.includes(u.id)}
          onClick={() => {
            const f = toggleGrammarFav(fav, u.id)
            setFav(f)
            saveGrammarFav(f)
          }}
        >
          {fav.includes(u.id) ? '★' : '☆'}
        </button>
      )}
      <button onClick={() => open(u)} aria-label={u.title} title={u.title}>
        <span>
          {stampMode && weakIdsOf(note).includes(u.id) && <span className="unit-weak" aria-label="まちがえたことがある単元">⚠ </span>}
          {stampMode && record[u.id] === undefined && !opened.includes(u.id) && !known.includes(u.id) && <span className="unit-new">NEW</span>}
          <span className="unit-title">{u.title.split('（')[0]}</span>
        </span>
        <span className="grammar-score">
          {record[u.id] === undefined ? '' : `${record[u.id]} / ${u.questions.length}`}
          {record[u.id] === u.questions.length ? ' 👑' : ''}
          {stampMode && unitStars(clears[u.id] ?? 0) > 0 && <span className="unit-stars" aria-label={`レベル ★${unitStars(clears[u.id] ?? 0)}`}>{' ' + '★'.repeat(unitStars(clears[u.id] ?? 0))}</span>}
        </span>
      </button>
    </li>
  )

  const mixTest = () => {
    const qs = shuffle(units.flatMap((u) => u.questions)).slice(0, 10)
    open({ id: 'mix-test', title: `${title}のまとめテスト`, points: [], examples: [], questions: qs })
    setStep(0)
  }

  if (!unit) {
    return (
      <section className="card grammar">
        {/* 見出しだけ「文法チャレンジ」に（title はまとめテストのベスト記録の名前にも使うので変えない） */}
        <h2>{stampMode ? '📐 文法チャレンジ' : title}</h2>
        {stampMode ? (
          <>
            <button
              className="flip grammar-quick-btn"
              onClick={() => {
                open(quickPractice(record, Math.random, 5, grade))
                setStep(0)
              }}
            >
              ✏️ すぐ練習（5問{grade === 'all' ? '' : `・${grade}`}）
            </button>
            <div className="quick-grades" role="group" aria-label="すぐ練習の学年">
              {(['all', ...GRAMMAR_GRADES] as const).map((g) => (
                <button key={g} aria-pressed={grade === g} onClick={() => setGrade(g)}>
                  {g === 'all' ? 'すべて' : g}
                </button>
              ))}
            </div>
            <p className="game-grid-title">
              🎮 文法ゲーム <span className="game-count" aria-label={`${GAME_COUNT}しゅるい`}>{GAME_COUNT}</span>
              {playedToday > 0 && <span className="played-today">{playedToday >= GAME_COUNT ? '🎉 今日は全部あそんだ！' : `・今日 ${playedToday} しゅるいあそんだ`}</span>}
            </p>
            {onAllGames && playedToday >= GAME_COUNT && (
              allClaimed ? (
                <p className="stats-note">🎉 全部あそんだごほうびは今日もらったよ</p>
              ) : (
                <button
                  className="good"
                  onClick={() => {
                    claimAllGames(dayKey())
                    setAllClaimed(true)
                    onAllGames()
                  }}
                >
                  🎉 全部あそんだごほうび 🪙{ALL_GAMES_COINS} をもらう
                </button>
              )
            )}
            <div className="game-grid" aria-label="文法ゲーム">
              {notebookQuestions(note).length > 0 && (
                <GameTile
                  icon="📓"
                  name="まちがいノート"
                  sub={`まちがえた${notebookQuestions(note).length}問をとき直す`}
                  onClick={() => {
                    open({ id: 'notebook', title: '📓 まちがいノート', points: [], examples: [], questions: notebookQuestions(note).slice(0, 10) })
                    setStep(0)
                  }}
                />
              )}
              <GameTile playKey="grammar:まとめテスト" icon="📝" name="まとめテスト" sub={mixBest[title] !== undefined ? `ベスト ${mixBest[title]}/10・${mixRank(mixBest[title], 10)}` : 'ランダム10問'} onClick={mixTest} />
              <GameTile playKey="grammar:例文リスニング" icon="👂" name="例文リスニング" sub="聞いて選ぶ・5問" onClick={() => setListen(true)} />
              <GameTile playKey="grammar:要点カード" icon="🃏" name="要点カード" sub={grade === 'all' ? 'おさらい' : `${grade}の単元だけ`} onClick={() => setCards(true)} />
              <GameTile playKey="grammar:まちがいさがし" icon="🔍" name="まちがいさがし" sub={`○×で10問${grade === 'all' ? '' : `・${grade}`}`} onClick={() => setSpot(true)} />
              <GameTile playKey="grammar:なかま分け" icon="🧺" name="なかま分け" sub="ちがう文をさがす" onClick={() => setOdd(true)} />
              <GameTile playKey="grammar:2択スピード" icon="⚡" name="2択スピード" sub={loadDuelBest() > 0 ? `ベスト ${loadDuelBest()}秒` : '正しい英文はどっち？'} onClick={() => setDuel(true)} />
              <GameTile playKey="grammar:文法ビンゴ" icon="🎯" name="文法ビンゴ" sub={loadBingoBest() > 0 ? `ベスト ${loadBingoBest()}列` : `そろうと🪙${BINGO_COINS}`} onClick={() => setBingo(true)} />
              <GameTile playKey="grammar:タイムアタック" icon="⏱" name="タイムアタック" sub={`60秒${grade === 'all' ? '' : `・${grade}`}${loadTaBest() > 0 ? `・ベスト${loadTaBest()}問` : ''}`} onClick={() => setTimeAttack(true)} />
              <GameTile
                playKey="grammar:モンスターラッシュ"
                icon="👾"
                name="モンスターラッシュ"
                sub={`${RUSH_COUNT}連戦・全勝で🪙${RUSH_GRAMMAR_COINS}`}
                onClick={() => {
                  const list = shuffle(GRAMMAR).slice(0, RUSH_COUNT)
                  setRush({ list, at: 0 })
                  startBattle(list[0])
                }}
              />
              <GameTile
                playKey="grammar:連続正解"
                icon="🔥"
                name="連続正解"
                sub={runBest > 0 ? `ベスト ${runBest}問` : 'まちがえるまで'}
                onClick={() => {
                  open({ id: 'streak-run', title: '🔥 連続正解チャレンジ', points: [], examples: [], questions: shuffle(GRAMMAR.flatMap((u) => u.questions)) })
                  setStep(0)
                }}
              />
              <GameTile
                playKey="grammar:語順ならべかえ"
                icon="🔀"
                name="語順ならべかえ"
                sub="単語をならべて英文に"
                onClick={() => {
                  open({ id: 'order-mix', title: '🔀 語順ならべかえ', points: [], examples: shuffle(GRAMMAR.flatMap((u) => u.examples)).slice(0, 5), questions: [] })
                  setOrdering(true)
                }}
              />
              <GameTile
                playKey="grammar:ランダム1問"
                icon="🎲"
                name="ランダム1問"
                sub="全単元から1問"
                onClick={() => {
                  open({ id: 'random-one', title: '🎲 ランダム1問', points: [], examples: [], questions: [randomQuestion(Math.random())] })
                  setStep(0)
                }}
              />
            </div>
          </>
        ) : (
        <button
          className="flip mix-test"
          onClick={mixTest}
        >
          📝 まとめテスト（ランダム10問）{mixBest[title] !== undefined ? `　ベスト ${mixBest[title]}/10・${mixRank(mixBest[title], 10)}` : ''}
        </button>
        )}
        {stampMode && (
          <div className="grade-tests" aria-label="学年まとめテスト">
            {GRAMMAR_GRADES.filter((g) => g !== '高校').map((g) => (
              <button
                key={g}
                className="list-link"
                onClick={() => {
                  const qs = shuffle(GRAMMAR.filter((u) => gradeOf(u.id) === g).flatMap((u) => u.questions)).slice(0, 10)
                  setGradeKey(`grade:${g}`)
                  open({ id: 'grade-test', title: `${g}の文法まとめテスト`, points: [], examples: [], questions: qs })
                  setStep(0)
                }}
              >
                {g}まとめ
                {mixBest[`grade:${g}`] !== undefined && <small className="grade-best" aria-label={`ベスト ${mixBest[`grade:${g}`]}/10`}>🏆{mixBest[`grade:${g}`]}/10</small>}
              </button>
            ))}
          </div>
        )}
        {stampMode && onDrill && (
          <details className="grammar-drills">
            <summary>
              🧩 文法ドリル <span className="fold-meta">{GRAMMAR_DRILLS.length}</span>
            </summary>
            <div className="drill-grid" role="group" aria-label="文法ドリル">
              {GRAMMAR_DRILLS.map((d) => (
                <button key={d.id} onClick={() => onDrill(d.id)}>
                  {d.label}
                </button>
              ))}
            </div>
          </details>
        )}
        {stampMode && (
          <details className="tense-table">
            <summary>🕰 時制まとめ表</summary>
            <table>
              <tbody>
                {TENSE_TABLE.map((t) => (
                  <tr key={t.name}>
                    <th scope="row">{t.name}</th>
                    <td>
                      <span className="tense-form">{t.form}</span>
                      <span className="tense-en">
                        {t.en}
                        <button className="speak small" onClick={() => speak(t.en)} aria-label={`${t.name}の例文を聞く`}>
                          🔊
                        </button>
                      </span>
                      <span className="tense-ja">{t.ja}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        )}
        {stampMode && fav.length > 0 && (
          <button
            className="list-link weak-grammar-btn fav-test-btn"
            onClick={() => {
              const qs = shuffle(GRAMMAR.filter((u) => fav.includes(u.id)).flatMap((u) => u.questions)).slice(0, 10)
              open({ id: 'fav-test', title: '★ お気に入り単元テスト', points: [], examples: [], questions: qs })
              setStep(0)
            }}
          >
            ★ お気に入り単元テスト（★{fav.length}単元から最大10問）
          </button>
        )}
        {stampMode && yesterdayQuestions(wrongDays, today).length > 0 && (
          <button
            className="list-link weak-grammar-btn"
            onClick={() => {
              open({ id: 'yesterday', title: '📅 きのうの復習', points: [], examples: [], questions: yesterdayQuestions(wrongDays, today) })
              setStep(0)
            }}
          >
            📅 きのうの復習（きのうまちがえた問題 {yesterdayQuestions(wrongDays, today).length}問）
          </button>
        )}
        {stampMode && notebookQuestions(note).length > 0 && (
          <button
            className="list-link weak-grammar-btn"
            onClick={() => {
              open({ id: 'notebook', title: '📓 まちがいノート', points: [], examples: [], questions: notebookQuestions(note).slice(0, 10) })
              setStep(0)
            }}
          >
            📓 まちがいノート（{notebookQuestions(note).length}問）
          </button>
        )}
        {stampMode && almostUnits(record).length > 0 && (
          <div className="grammar-almost">
            <p className="stats-note">🎯 あと1問で全問正解！</p>
            {almostUnits(record).map((u) => (
              <button key={u.id} className="list-link" onClick={() => open(u)}>
                {`👉 ${u.title}（${record[u.id]} / ${u.questions.length}）`}
              </button>
            ))}
          </div>
        )}
        {stampMode && champOf(champ, today.slice(0, 7)) && (
          <button className="list-link grammar-champ" onClick={() => open(champOf(champ, today.slice(0, 7))!.unit)}>
            🏆 今月のチャンピオン単元：{champOf(champ, today.slice(0, 7))!.unit.title}（{champOf(champ, today.slice(0, 7))!.count}問正解）
          </button>
        )}
        {stampMode && weakRanking(note).length > 0 && (
          <div className="weak-ranking">
            <p className="stats-note">📉 苦手ランキング</p>
            <ol>
              {weakRanking(note).map((r) => (
                <li key={r.unit.id}>
                  <button className="list-link" onClick={() => open(r.unit)}>
                    {`${r.unit.title}（${r.count}問）`}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
        {stampMode && weakUnits(record).length > 0 && (
          <button
            className="list-link weak-grammar-btn"
            onClick={() => {
              const ws = weakUnits(record)
              open({ id: 'weak-test', title: '苦手な文法の復習', points: [], examples: [], questions: shuffle(ws.flatMap((u) => u.questions)).slice(0, 10) })
              setStep(0)
            }}
          >
            🔁 苦手な文法の復習（{weakUnits(record).length}単元）
          </button>
        )}
        {stampMode && (
          <div className="sub-tabs grade-tabs" role="tablist" aria-label="学年">
            {(['all', ...GRAMMAR_GRADES] as const).map((g) => (
              <button key={g} role="tab" aria-selected={grade === g} onClick={() => setGrade(g)}>
                {g === 'all' ? 'すべて' : g}
              </button>
            ))}
          </div>
        )}
        {stampMode && (
          <div className="grammar-recommend">
            <p className="stats-note">🌟 おすすめ単元</p>
            {recommendUnits(units.filter((u) => grade === 'all' || gradeOf(u.id) === grade), clears, record).map((u) => (
              <button key={u.id} className="list-link" onClick={() => open(u)}>
                {`👉 ${u.title}`}
              </button>
            ))}
          </div>
        )}
        {stampMode && (
          <input className="grammar-search" type="search" placeholder="🔍 単元をさがす（例：have）" aria-label="単元をさがす" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        )}
        {stampMode && keyword && searchUnits(units, keyword).length === 0 && <p className="stats-note">見つかりませんでした</p>}
        {stampMode && (
          <p className="unit-sort" role="group" aria-label="単元のならび">
            ならび：
            <button aria-pressed={!todoFirst} onClick={() => setTodoFirst(false)}>
              ふつう
            </button>
            <button aria-pressed={todoFirst} onClick={() => setTodoFirst(true)}>
              まだの単元から
            </button>
          </p>
        )}
        {stampMode && grade === 'all' && !keyword ? (
          <>
            {fav.length > 0 && <ul className="grammar-list">{units.filter((u) => fav.includes(u.id)).map(unitItem)}</ul>}
            {GRAMMAR_GRADES.map((g) => {
              const us = todoSort(units.filter((u) => gradeOf(u.id) === g))
              return (
                <details key={g} className="grammar-grade-fold">
                  <summary>
                    {g}の単元{us.every((u) => record[u.id] === u.questions.length) && ' 🏅'}
                    <span className="fold-meta" aria-label={`全問正解 ${us.filter((u) => record[u.id] === u.questions.length).length} / ${us.length}`}>
                      {us.filter((u) => record[u.id] === u.questions.length).length}/{us.length}
                    </span>
                  </summary>
                  {us.every((u) => record[u.id] === u.questions.length) && (
                    <div className="grade-certificate" role="note" aria-label={`${g}の賞状`}>
                      <p className="grade-certificate-title">🎓 賞状</p>
                      <p>{g}の文法 {us.length}単元を すべて全問正解しました。よくがんばりました！</p>
                    </div>
                  )}
                  <ul className="grammar-list">{us.map(unitItem)}</ul>
                </details>
              )
            })}
          </>
        ) : (
          <ul className="grammar-list">{favFirst(todoSort(searchUnits(units.filter((u) => !stampMode || grade === 'all' || gradeOf(u.id) === grade), keyword)), stampMode ? fav : []).map(unitItem)}</ul>
        )}
        {stampMode ? (
          <details className="grammar-records">
            <summary>
              📊 文法の記録
              <span className="fold-meta">{units.filter((u) => record[u.id] === u.questions.length).length}/{units.length}</span>
            </summary>
        <p className="stats-note grammar-total">
          全問正解 {units.filter((u) => record[u.id] === u.questions.length).length} / {units.length} 単元
        </p>
        {stampMode && (
          <p className="grammar-dan">
            🥋 段位：<strong>{danOf(units.filter((u) => record[u.id] === u.questions.length).length).name}</strong>
            {danOf(units.filter((u) => record[u.id] === u.questions.length).length).next !== null && `（次の段位まであと${danOf(units.filter((u) => record[u.id] === u.questions.length).length).next}単元）`}
            {units.filter((u) => record[u.id] === u.questions.length).length >= 100 && <span className="medal-100"> 💯 100単元クリア記念メダル</span>}
          </p>
        )}
        {stampMode && (
          <div className="grammar-week" role="img" aria-label={`今週の文法の正解数 ${last7(gweek, today).reduce((a, d) => a + d.count, 0)}問`}>
            <p className="grammar-week-title">📊 今週の成績（正解数）</p>
            <div className="grammar-week-bars">
              {last7(gweek, today).map((d) => (
                <span key={d.day} className={d.day === today ? 'today' : undefined}>
                  <small>{d.count || ''}</small>
                  <i style={{ height: `${Math.min(100, (d.count / Math.max(1, ...last7(gweek, today).map((x) => x.count))) * 100)}%` }} />
                  <b>{d.label}</b>
                </span>
              ))}
            </div>
          </div>
        )}
        {stampMode && (
          <ul className="grade-rates" aria-label="学年別クリア率">
            {gradeClearRates(record).map((g) => (
              <li key={g.grade}>
                <span className="grade-rate-name">{g.grade}</span>
                <span className="grade-rate-bar">
                  <span style={{ width: `${g.total ? (g.cleared / g.total) * 100 : 0}%` }} />
                </span>
                <span className="grade-rate-num">
                  {g.cleared}/{g.total}
                </span>
              </li>
            ))}
          </ul>
        )}
        {stampMode && (
          <div className="stamp-card" aria-label={`文法スタンプ ${grammarStamps(record)}個`}>
            <p className="stamp-title">
              📮 スタンプカード <span className="fold-meta">{grammarStamps(record)}/{GRAMMAR.length}</span>
              <small className="stamp-next">あと{STAMP_EVERY - (grammarStamps(record) % STAMP_EVERY)}個で🎟</small>
            </p>
            <div className="stamp-grid">
              {GRAMMAR.map((u) => (
                <span key={u.id} className={record[u.id] === u.questions.length ? 'stamp on' : 'stamp'} title={u.title}>
                  {record[u.id] === u.questions.length ? '🌸' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
        {stampMode && (
          <div className="grammar-goal">
            {weekGoal.goal > 0 ? (
              <p>
                🎯 今週の目標：全問正解 {Math.min(weekGoal.cleared.length, weekGoal.goal)} / {weekGoal.goal} 単元{weekGoal.rewarded ? ' ✅ たっせい！' : '（たっせいで🎟1）'}
              </p>
            ) : (
              <p>🎯 今週の目標を決めよう（全問正解する単元の数）</p>
            )}
            <div className="goal-choices">
              {GOAL_CHOICES.map((n) => (
                <button
                  key={n}
                  className={weekGoal.goal === n ? 'on' : undefined}
                  aria-pressed={weekGoal.goal === n}
                  disabled={weekGoal.rewarded}
                  onClick={() => {
                    const g = { ...weekGoal, goal: n }
                    setWeekGoal(g)
                    saveGrammarGoal(g)
                  }}
                >
                  {n}単元
                </button>
              ))}
            </div>
          </div>
        )}
        {stampMode && master && <p className="level-up">🏅 称号「文法マスター」</p>}
        {stampMode && gDays.streak > 0 && (
          <p className="stats-note">
            📆 文法 {gDays.last === today ? gDays.streak : 0}日連続（{GRAMMAR_STREAK_DAYS}日ごとに🪙{GRAMMAR_STREAK_COINS}）
          </p>
        )}
        {stampMode && streak.best > 0 && <p className="stats-note">🔥 確認問題の連続正解ベスト {streak.best}問</p>}
        {stampMode && (
          <div className="grade-progress" aria-label="学年ごとの進みぐあい">
            {GRAMMAR_GRADES.map((g) => {
              const us = GRAMMAR.filter((u) => gradeOf(u.id) === g)
              const done = us.filter((u) => record[u.id] === u.questions.length).length
              return (
                <div key={g} className="grade-row">
                  <span>{g}</span>
                  <span className="grade-bar" role="progressbar" aria-label={`${g}の全問正解`} aria-valuemin={0} aria-valuemax={us.length} aria-valuenow={done}>
                    <span style={{ width: `${(done / us.length) * 100}%` }} />
                  </span>
                  <span>
                    {done}/{us.length}
                  </span>
                </div>
              )
            })}
          </div>
        )}
          </details>
        ) : (
        <p className="stats-note grammar-total">
          全問正解 {units.filter((u) => record[u.id] === u.questions.length).length} / {units.length} 単元
        </p>
        )}
      </section>
    )
  }

  const back = (
    <button
      className="stage-back"
      onClick={() => {
        setUnit(null)
        setRush(null)
      }}
    >
      ← 単元一覧
    </button>
  )

  if (unit && dict) return <GrammarDict key={unit.id} unit={unit} onAnswer={onAnswer} onBack={() => setDict(false)} />
  if (unit && printing) return <GrammarPrint unit={unit} onBack={() => setPrinting(false)} />
  if (unit && shadow) return <GrammarShadow key={unit.id} unit={unit} onBack={() => setShadow(false)} />
  if (unit && ordering) return <GrammarOrder key={unit.id} unit={unit} onAnswer={onAnswer} onSpend={onSpend} onBack={() => {
        setOrdering(false)
        if (unit.id === 'order-mix') setUnit(null) // タイルから来たときは一覧へもどる
      }} />

  if (step === -1) {
    return (
      <section className="card grammar">
        {back}
        <h2>{unit.title}</h2>
        <ul className="grammar-points">
          {unit.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        {mistakeOf(unit.id) && (
          <div className="grammar-mistake">
            <p className="grammar-mistake-title">⚠ よくあるまちがい</p>
            <p className="ng">✕ {mistakeOf(unit.id)!.wrong}</p>
            <p className="ok">○ {mistakeOf(unit.id)!.right}</p>
            <p className="why">{mistakeOf(unit.id)!.why}</p>
          </div>
        )}
        {unit.examples.map((ex) => (
          <p key={ex.en} className="grammar-example">
            <span>
              {ex.en}
              <button className="speak small" onClick={() => speak(ex.en)} aria-label="例文を聞く">
                🔊
              </button>
            </span>
            <span className="example-ja">{ex.ja}</span>
          </p>
        ))}
        <button className="flip" onClick={() => setStep(0)}>
          確認問題へ（{unit.questions.length}問）
        </button>
        {relatedUnits(unit.id).length > 0 && (
          <p className="related-units">
            🔗 関連する単元：
            {relatedUnits(unit.id).map((u) => (
              <button key={u.id} className="list-link" onClick={() => open(u)}>
                {u.title}
              </button>
            ))}
          </p>
        )}
        <div className="unit-extras" role="group" aria-label="ほかの練習">
          {unit.examples.length > 0 && (
            <button className="unit-extra" onClick={() => setOrdering(true)}>
              <span className="unit-extra-icon" aria-hidden="true">🧩</span>
              <span className="unit-extra-name">例文の並べかえ</span>
              <small>{unit.examples.length}問に挑戦</small>
            </button>
          )}
          <button className="unit-extra" onClick={() => setPrinting(true)}>
            <span className="unit-extra-icon" aria-hidden="true">📄</span>
            <span className="unit-extra-name">おさらいプリント</span>
            <small>印刷できる</small>
          </button>
          {unit.examples.length > 0 && (
            <button className="unit-extra" onClick={() => setDict(true)}>
              <span className="unit-extra-icon" aria-hidden="true">✍️</span>
              <span className="unit-extra-name">ディクテーション</span>
              <small>聞いて書く</small>
            </button>
          )}
          {unit.examples.length > 0 && (
            <button className="unit-extra" onClick={() => setShadow(true)}>
              <span className="unit-extra-icon" aria-hidden="true">🗣</span>
              <span className="unit-extra-name">シャドーイング</span>
              <small>聞いてまねする</small>
            </button>
          )}
        </div>
        {stampMode && (
          <button
            className="boss-btn grammar-monster-btn"
            onClick={() => {
              setBattle(true)
              setStep(0)
            }}
          >
            <span className="gm-main">👾「{monsterName(unit)}」と戦う</span>
            <small className="gm-sub">全問正解でたおせる</small>
          </button>
        )}
      </section>
    )
  }

  const q = unit.questions[step]
  if (!q) {
    return (
      <section className="card result grammar-result">
        {back}
        {score === unit.questions.length && unit.questions.length > 0 && (
          <div className="grammar-confetti" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => (
              <i key={i} style={{ left: `${(i * 7 + 3) % 100}%`, animationDelay: `${(i % 5) * 0.12}s`, background: ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'][i % 6] }} />
            ))}
          </div>
        )}
        <p className="result-title" title={unit.title}>
          {unit.title.split('（')[0]}
        </p>
        <p className="result-score">
          {unit.id === 'streak-run' ? `🔥 ${score}問 連続正解！（ベスト ${runBest}問）` : `${score} / ${unit.questions.length} 問正解`}
        </p>
        {stampMode && missed.length > 0 && (
          <p className="stats-note note-added">📓 まちがえた{missed.length}問をまちがいノートに入れたよ（文法ゲームの「まちがいノート」でとき直せる）</p>
        )}
        {unit.id === 'streak-run' && runBonus && <p className="level-up">🏆 ベスト更新！ 文法のなかまに +{RUN_BEST_XP}XP</p>}
        {(unit.id === 'mix-test' || unit.id === 'grade-test') && (
          <p className={`battle-rank rank-${mixRank(score, unit.questions.length)}`} aria-label={`ランク ${mixRank(score, unit.questions.length)}`}>
            {mixRank(score, unit.questions.length)}
          </p>
        )}
        {battle && rush && score === unit.questions.length && (
          rush.at + 1 < rush.list.length ? (
            <button
              className="boss-btn grammar-monster-btn"
              onClick={() => {
                const at = rush.at + 1
                setRush({ ...rush, at })
                startBattle(rush.list[at])
              }}
            >
              次の文法モンスターへ ▶（{rush.at + 2} / {rush.list.length}）
            </button>
          ) : (
            <p className="level-up">👾 ラッシュ完全クリア！ 🪙{RUSH_GRAMMAR_COINS}</p>
          )
        )}
        {battle ? (
          score === unit.questions.length ? (
            <p className="result-message gm-win">
              <span className="gm-win-big">👾 たおした！ 🪙{GRAMMAR_MONSTER_COINS}</span>
              <small className="gm-name">{splitSoft(monsterName(unit)).flatMap((t, i) => (i > 0 ? [<wbr key={i} />, t] : [t]))}</small>
            </p>
          ) : (
            <p className="result-message">💨 にげられた… 解説を見直してもう一度！</p>
          )
        ) : (
          <p className="result-message">{score === unit.questions.length ? 'カンペキ！' : '解説を見直してもう一度！'}</p>
        )}
        {streakBonus && <p className="level-up">📆 文法{gDays.streak}日連続！ 🪙{GRAMMAR_STREAK_COINS}</p>}
        {quickPerfect && unit.id === 'quick-practice' && <p className="level-up">✏️ すぐ練習 5問全問正解！ 🪙{QUICK_PERFECT_COINS}</p>}
        {goalReached && <p className="level-up">🎯 今週の目標たっせい！ 🎟ガチャチケット1まい</p>}
        {partnerName && !battle && score === unit.questions.length && unit.questions.length > 0 && (
          <p className="grammar-praise">
            🐣 {partnerName}「{praiseEnOf(unit.id)}」
            <button className="speak small" onClick={() => speak(praiseEnOf(unit.id))} aria-label="ほめことばを聞く">
              🔊
            </button>
            <br />
            <small>（{praiseOf(unit.id)}）</small>
          </p>
        )}
        {firstClear && <p className="level-up">🌟 初クリア！ XP+{GRAMMAR_CLEAR_XP}</p>}
        {unit.questions.some((x) => correctSentence(x)) && (
          <details className="tense-table correct-list">
            <summary>📖 この回の正しい英文（{unit.questions.filter((x) => correctSentence(x)).length}文）</summary>
            <ul>
              {unit.questions
                .filter((x) => correctSentence(x))
                .map((x) => (
                  <li key={x.sentence}>
                    {correctSentence(x)}
                    <button className="speak small" onClick={() => speak(correctSentence(x)!)} aria-label={`${correctSentence(x)} を聞く`}>
                      🔊
                    </button>
                  </li>
                ))}
            </ul>
          </details>
        )}
        {!battle && missed.length > 0 && (
          <button
            className="good next-unit-btn retry-missed"
            onClick={() => {
              const qs = missed
              open({ id: 'retry-missed', title: '🔁 まちがえた問題', points: [], examples: [], questions: qs })
              setStep(0)
            }}
          >
            🔁 まちがえた問題だけもう一度（{missed.length}問）
          </button>
        )}
        {!battle && <GrammarOneMore key={unit.id} unitId={unit.id} onAnswer={onAnswer} />}
        {!battle && nextUnit(unit.id) && (
          <button className="good next-unit-btn" onClick={() => open(nextUnit(unit.id)!)}>
            次の単元へ ▶ {nextUnit(unit.id)!.title}
          </button>
        )}
        <button
          className="list-link"
          onClick={() => {
            navigator.clipboard
              ?.writeText(grammarShareText(unit.title, score, unit.questions.length))
              .then(() => setCopied(true))
              .catch(() => setCopied(false))
          }}
        >
          {copied ? '✅ コピーしました' : '📋 結果をコピー（シェア用）'}
        </button>
        <button className="flip" onClick={() => open(unit)}>
          もう一度
        </button>
      </section>
    )
  }

  function pick(i: number) {
    if (picked !== null || !unit) return
    setPicked(i)
    const ok = i === q.answer
    if (!ok) setMissed((m) => [...m, q])
    const nextScore = score + (ok ? 1 : 0)
    setScore(nextScore)
    if (ok) playCorrect()
    else playWrong()
    if (stampMode && gDays.last !== today) {
      const r = studyGrammarDay(gDays, today)
      setGDays(r.days)
      saveGrammarDays(r.days)
      if (r.bonus) {
        setStreakBonus(true)
        onStreakBonus?.()
      }
    }
    if (stampMode && !ok) setWrongDays(markWrongDay(q.sentence, today))
    const realUnit = unitOfQuestion(q)
    if (ok) {
      const gw = addGrammarCorrect(gweek, today)
      setGweek(gw)
      saveGrammarWeek(gw)
    }
    if (ok && realUnit) {
      const c = countChamp(champ, realUnit.id, today.slice(0, 7))
      setChamp(c)
      saveGrammarChamp(c)
    }
    if (stampMode) {
      const nb = noteAfter(note, q.sentence, ok)
      if (nb.length !== note.length || nb.some((x, i) => x !== note[i])) {
        setNote(nb)
        saveNotebook(nb)
      }
    }
    const st = streakAfter(streak, ok)
    setStreak(st)
    saveGrammarStreak(st)
    onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `grammar:${unit.id}`, 'quiz')
    if (unit.id === 'grade-test' && gradeKey && step === unit.questions.length - 1 && nextScore > (mixBest[gradeKey] ?? -1)) {
      const b = { ...mixBest, [gradeKey]: nextScore }
      setMixBest(b)
      saveMixBest(b)
    }
    if (unit.id === 'mix-test' && step === unit.questions.length - 1 && nextScore > (mixBest[title] ?? -1)) {
      const b = { ...mixBest, [title]: nextScore }
      setMixBest(b)
      saveMixBest(b)
    }
    if (stampMode && unit.id === daily.id && step === unit.questions.length - 1 && nextScore === unit.questions.length && dailyDay !== today) {
      setDailyDay(today)
      saveDailyGrammarDay(today)
      onDailyBonus?.()
    }
    if (unit.id === 'streak-run' && (!ok || step === unit.questions.length - 1) && nextScore > runBest) {
      setRunBest(nextScore)
      saveRunBest(nextScore)
      if (nextScore >= 3) {
        setRunBonus(true)
        onRunBest?.()
      }
    }
    if (unit.id === 'quick-practice' && step === unit.questions.length - 1 && nextScore === unit.questions.length) {
      setQuickPerfect(true)
      onQuickPerfect?.()
    }
    if (battle && step === unit.questions.length - 1 && nextScore === unit.questions.length) {
      onMonsterWin?.()
      if (rush && rush.at === rush.list.length - 1) onRushWin?.()
    }
    if (battle && rush && step === unit.questions.length - 1 && nextScore < unit.questions.length) setRush(null)
    if (step === unit.questions.length - 1 && nextScore === unit.questions.length && GRAMMAR.some((g) => g.id === unit.id)) {
      const c = { ...clears, [unit.id]: (clears[unit.id] ?? 0) + 1 }
      setClears(c)
      saveClears(c)
    }
    if (step === unit.questions.length - 1 && stampMode && !battle && nextScore === unit.questions.length && GRAMMAR.some((g) => g.id === unit.id)) {
      const r = clearForGoal(weekGoal, unit.id)
      setWeekGoal(r.goal)
      saveGrammarGoal(r.goal)
      if (r.reached) {
        setGoalReached(true)
        onWeeklyGoal?.()
      }
    }
    if (step === unit.questions.length - 1 && stampMode && nextScore === unit.questions.length && (record[unit.id] ?? -1) < unit.questions.length && GRAMMAR.some((g) => g.id === unit.id)) {
      onFirstClear?.()
      setFirstClear(true)
    }
    if (step === unit.questions.length - 1 && nextScore > (record[unit.id] ?? -1)) {
      const r = { ...record, [unit.id]: nextScore }
      if (stampMode && Math.floor(grammarStamps(r) / STAMP_EVERY) > Math.floor(grammarStamps(record) / STAMP_EVERY)) onStampTicket?.()
      setRecord(r)
      saveGrammar(r)
      if (stampMode && !master && allCleared(r)) {
        setMaster(true)
        saveMaster()
        onMaster?.()
      }
    }
  }

  const [before, after] = q.sentence.split('___')
  return (
    <section className="card quiz grammar" aria-live="polite">
      {back}
      <p className="progress grammar-progress">
        {unit.id === 'streak-run' ? (
          <>
            🔥 連続 <strong>{score}</strong> 問（ベスト {runBest}問）
          </>
        ) : (
          <>
            <strong>{step + 1}</strong> / {unit.questions.length} 問目
          </>
        )}
      </p>
      <div className="grammar-progress-bar" role="progressbar" aria-label="確認問題の進み具合" aria-valuemin={0} aria-valuemax={unit.questions.length} aria-valuenow={step + 1}>
        {unit.questions.map((_, i) => (
          <span key={i} className={i < step ? 'done' : i === step ? 'now' : undefined} />
        ))}
      </div>
      {battle && (
        <div className="grammar-monster">
          <span className="grammar-monster-fig">
            <BossFigure hit={picked !== null && picked === q.answer} look={monsterLook(unit)} />
          </span>
          <span>
            <strong className="gm-name">{splitSoft(monsterName(unit)).flatMap((t, i) => (i > 0 ? [<wbr key={i} />, t] : [t]))}</strong>
            <span className="boss-hp grammar-monster-hp" role="progressbar" aria-label="文法モンスターのHP" aria-valuemin={0} aria-valuemax={unit.questions.length} aria-valuenow={unit.questions.length - score}>
              <span className="boss-hp-fill" style={{ width: `${((unit.questions.length - score) / unit.questions.length) * 100}%` }} />
            </span>
          </span>
        </div>
      )}
      {partnerName && picked !== null && picked === q.answer && streak.now > 0 && streak.now % 3 === 0 && (
        <p className="grammar-praise">
          🐣 {partnerName}「{streak.now}問連続正解！ その調子！」
        </p>
      )}
      {streak.now >= 2 && (
        <p className="grammar-streak">
          🔥 連続正解 {streak.now}
          {streak.now >= streak.best ? '（ベスト更新中！）' : `（ベスト ${streak.best}）`}
        </p>
      )}
      <p className="example blank-sentence">
        {before}
        <span className={`blank${picked !== null ? ' filled' : ''}`}>
          {picked !== null ? q.choices[q.answer] : '　　　'}
        </span>
        {after}
      </p>
      {onSpend && picked === null && q.choices.length > 2 && hidden?.step !== step && (
        <button
          className="hint-5050"
          onClick={() => {
            if (!onSpend(GRAMMAR_HINT_COST)) return
            const wrongs = q.choices.map((_, i) => i).filter((i) => i !== q.answer)
            setHidden({ step, i: wrongs[0] })
          }}
        >
          💡 ヒント：1つ消す（🪙{GRAMMAR_HINT_COST}）
        </button>
      )}
      <div className="choices">
        {choiceOrder(q.choices.length, shuffleSeed + step).map((i) => {
          const c = q.choices[i]
          if (hidden?.step === step && hidden.i === i && picked === null) return null
          let cls = 'choice'
          if (picked !== null && i === q.answer) cls += ' correct'
          else if (picked === i) cls += ' wrong'
          return (
            <button key={c} className={cls} onClick={() => pick(i)} disabled={picked !== null}>
              {c}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{picked === q.answer ? '正解！' : 'ざんねん'}</p>
          <p className="grammar-why">{q.why}</p>
          {correctSentence(q) && (
            <button className="list-link" onClick={() => speak(correctSentence(q)!)}>
              🔊 正しい英文を聞く：{correctSentence(q)}
            </button>
          )}
          {picked !== q.answer && unitOfQuestion(q) && (
            showPoints ? (
              <ul className="grammar-points inline-points" aria-label="単元の要点">
                {unitOfQuestion(q)!.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            ) : (
              <button className="list-link" onClick={() => setShowPoints(true)}>
                📌 要点を見る（{unitOfQuestion(q)!.title}）
              </button>
            )
          )}
          {!GRAMMAR.some((g) => g.id === unit.id) && unitOfQuestion(q) && (
            <button className="list-link" onClick={() => open(unitOfQuestion(q)!)}>
              📖 もっとくわしく：{unitOfQuestion(q)!.title}
            </button>
          )}
          <button
            className="flip"
            onClick={() => {
              setPicked(null)
              setShowPoints(false)
              // 連続正解チャレンジは、まちがえたらそこで終わり
              setStep(unit.id === 'streak-run' && picked !== q.answer ? unit.questions.length : step + 1)
            }}
          >
            次へ
          </button>
        </>
      )}
    </section>
  )
}
