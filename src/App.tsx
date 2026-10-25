import { BuddyFigure } from './BuddyFigureView'
import type { GrammarDrill } from './grammardrills'
import { dequeue, enqueue } from './toastQueue'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PlayContext, type PlayRegister } from './playing'
import { todayReading, todayReadingTitle } from './todayread'
import { BossTeamContext, type BossTeam } from './bossteam'
import type { LongPassage } from './longreading'
import { READ_LEVEL_FOR, saveGrade, type GradeId } from './usergrade'
import { loadPlayOpen, savePlayOpen } from './homeplay'
import { LongReading } from './LongReadingView'
import { Reading } from './ReadingView'
import { recordEvo, addBuddyToday, loadBuddyToday, ATTR_EGG_PRICE, ATTR_LABEL, claimTeamTitle, GO_LINES, loadEggPieces, PIECES_FOR_EGG, PIECES_FULL_COINS, saveEggPieces, EVO_COINS, teamIndex, teamOf, TEAM_TITLES, hatchAttrEgg, lockedSpecies, buddyForm, buddyLevel, buddyName, feedBuddy, loadBuddyBox, saveBuddyBox, switchBuddy, loadBuddies, renameBuddy, saveBuddies, type Buddy, type BuddyForm, type Buddies, type Track } from './buddies'
import { BuddyEvolve } from './BuddyEvolveView'
import { BuddyRow } from './BuddyRowView'
import { TodayTasks } from './TodayTasksView'
import { TodayGrammar } from './TodayGrammarView'
import { TodayFocusBar } from './TodayFocusView'
import { TODAY_TASK_LABEL, TODAY_TASKS, type TodayTask } from './todayfocus'
import { BuddyDetail } from './BuddyDetailView'
import { WalkQuiz } from './WalkQuizView'
import { addPiece, loadPieces, PIECES_FOR_TICKET, savePieces } from './ticketpiece'
import { BIRTHDAY_TICKETS, birthdayAge, loadBirthday, registerBirthday, saveBirthday } from './birthday'
import { loadEarned, loadTotals, newlyEarned, rewardOf, saveEarned, saveTotals, type Badge } from './badges'
import { BadgeList, BadgeToast } from './BadgesView'
import { Backup } from './BackupView'
import { loadLastBackup, needBackup } from './backup'
import { Card } from './CardView'
import { CardCheer } from './CardCheerView'
import { CARD_BONUS_COINS, isCardBonus } from './cardcheer'
import { WordList } from './WordListView'
import { makeLookup } from './glossary'
import { loadNotes, saveNotes, setNote } from './notes'
import { addFavorites, loadFavorites, saveFavorites, toggleFavorite } from './favorites'
import { Stats } from './StatsView'
import { Calendar } from './CalendarView'
import { loadAccuracy, rate, recordAnswer, saveAccuracy } from './accuracy'
import { loadTime, minutesToday, minutesWeek, saveTime } from './studyTime'
import { useStudyTime } from './useStudyTime'
import { bump, loadMissions, MISSION_XP, saveMissions, type Counter, type Mission } from './missions'
import { baseBeaten, epithetOf, loadBook, totalWins } from './bossbook'
import { GOLD_COINS, KEYS_FOR_GOLD, loadKeys, saveKeys } from './treasure'
import { ANNIV_COINS, dueAnniversary, loadDone, MILESTONES, saveDone } from './anniversary'
import { pickWordOfDay } from './wordOfDay'
import { WordOfDay } from './WordOfDayView'
import { isWeekend, lastWeekSummary, loadWeeklyClaimed, saveWeeklyClaimed, weekCompare, weekCount, weekStart, WEEKLY_COINS, WEEKLY_TARGET, WEEKLY_XP } from './weekly'
import { usePersistent } from './usePersistent'
import { loadFreeGachaDay, saveFreeGachaDay } from './freegacha'
import { Roulette } from './RouletteView'
import { Janken } from './JankenView'
import { Training } from './TrainingView'
import { loadTraining } from './training'
import { giftReady, loadGiftDay, saveGiftDay } from './gift'
import { DailyGrammarQ } from './DailyGrammarQView'
import { DAILY_Q_XP } from './grammarq'
import { dailyGrammar, loadDailyGrammarDay, MASTER_TICKETS } from './grammar'
import { HideSeek } from './HideSeekView'
import { HIDE_COINS } from './hideseek'
import { addSticker, loadStickers, saveStickers, stickerOf, STICKER_TICKETS } from './stickers'
import { loadShards, saveShards, shardAfter, SHARDS_FOR_EGG } from './shard'
import { SugorokuBoard } from './SugorokuView'
import { JANKEN_COINS } from './janken'
import { addWalkDiary, loadWalkDay, loadWalkDiary, saveWalkDay, walkFind, walkPlace, WALK_COINS } from './walk'
import { omikujiDiscount, omikujiOf } from './omikuji'
import { loadRouletteDay, saveRouletteDay } from './roulette'
import { Celebrate } from './CelebrateView'
import { BossDex } from './BossView'
import { Evolve } from './EvolveView'
import { EvolutionPreview, Monster, MonsterFigure, Party as PartyView, Profile, Zukan } from './MonsterView'
import { loadMyWords, loadUseMy, saveMyWords, saveUseMy } from './myWords'
import { MyWords } from './MyWordsView'
import { bondHearts, bondLevel, bondWinCoins } from './bond'
import { MissedList } from './MissedListView'
import { LearnedChart } from './LearnedChartView'
import { lastLearned, loadLearnedLog, recordLearned, saveLearnedLog } from './learnedLog'
import { GROUPS } from './puzzles'
import { loadDiary } from './diary'
import { shareText, weekReportText } from './shareText'
import { loadPlayed } from './playedModes'
import { Album } from './AlbumView'
import { eventFor } from './events'
import { addSouvenir, loadSouvenirs, saveSouvenirs, souvenirFor, SOUVENIRS } from './souvenir'
import { SouvenirList } from './SouvenirView'
import { addHistory, lastDays, loadHistory, saveHistory } from './history'
import { addEggs, eggsEarned, feedHelpers, loadParty, loadWarm, nextWarm, releaseCoins, releaseMember, saveParty, saveWarm, toggleFav, tradeableMembers, tradeMembers, updateActive, WARM_XP, warmLeft } from './party'
import { TRIO_COINS, loadTrio, saveTrio, trioSpecies, COLOR_COMPLETE_TICKETS, completedSpecies, loadColorComplete, saveColorComplete, dailyColor, MYSTERY_COINS, MYSTERY_RATE, LUCKY_BAG_PRICE, loadLuckyBagMonth, saveLuckyBagMonth, PARTY_MAX, loadGachaPoints, saveGachaPoints, POINTS_FOR_SR, srEgg, MULTI5, SLOT_COINS, slotOf, seasonalKindOf, addStats, addTicket, bonusOf, isLuckyPull, LUCKY_COINS, drawEgg, gachaPrice, loadGachaStats, saveGachaStats, DUP_REFUND, isDuplicate, loadStep, nextStep, RARE_FULL_COINS, rareEgg, saveStep, stepLeft, TICKET_MAX } from './gacha'
import {
  feed,
  FORMS,
  rename,
  type MonsterState,
  formOf,
  isLonely,
  seenForms,
  kindOf,
  speciesOf,
  levelInfo,
  milestonesBetween,
  type Source,
  XP_CARD_AGAIN,
  XP_CARD_GOOD,
  withSpecies,
  pickupOf,
  type Form,
} from './monster'
import {
  buildQueue,
  upcoming,
  dayKey,
  grade,
  loadDailyNew,
  loadProgress,
  saveDailyNew,
  saveProgress,
  firstLearnedOn,
  addDays,
  type ProgressMap,
} from './srs'
import { addMistake, easeMistake, loadMistakes, saveMistakes, weakWords } from './mistakes'
import { Quiz } from './QuizView'
import { BossAlly, TrackAlly } from './BossAllyView'
import { BuddyZukan } from './BuddyZukanView'
import { loadLongRecord } from './longreading'
import { loadShortDone } from './reading'
import { loadReadLevel, passagesFor, READ_LEVELS, readyFor, saveReadLevel, solvedOf, type ReadLevel } from './readlevel'
import { trioStreakNow, loadTrioDay, dailyShort, loadDailyShortDay, loadTodayWordsDay, saveDailyShortDay, saveTodayWordsDay, TASK_XP, todayWords } from './dailyread'
import { titleFor } from './titles'
import { daysUntil, perDay } from './exam'
import { feelingFor } from './feeling'
import { cheerFor, snackLine, type Line } from './talk'
import { cheerEvent, encourage, type Cheer } from './encourage'
import { PetCheer } from './PetCheerView'
import { QUEST_COINS } from './questboss'
import { loadUniv, UNIV_BOSSES } from './univ'
import { annivMonths, annivText, MONTHLY_COINS } from './monthly'
import { addItem, BAG_MAX, BATTLE_ITEMS, loadBag, saveBag, spendItem } from './battleitems'
import { ENDLESS_REWARD_COINS } from './endless'
import { addMood, boosted, loadMood, moodFull, saveMood } from './moodmeter'
import { PET_BONUS } from './pet'
import { seasonFxOf } from './seasonfx'
import { cloudSave, loadCode, loadSavedAt, shouldAutoSave } from './cloud'
import { Challenge } from './ChallengeView'
import { difficultyOf, loadChallengeDay, loadChallengeStreak, nextChallengeStreak, saveChallengeDay, saveChallengeStreak, STREAK_TICKET_DAYS } from './challenge'
import { cancelSpeech, speak, speakPet } from './speech'
import { isNight } from './daytime'
import { RIVAL_COINS } from './rival'
import { playFanfare } from './sound'
import { loadBest } from './timeAttack'
import { TimeAttack } from './TimeAttackView'
import { loadStages, recordStars, saveStages } from './stages'
import { Stages, STAR3_COINS } from './StageView'
import { roomLine, buyAndMove, MOVE_LINE, favSnackOf, buyFreeze, couponsBetween, toggleWear, COIN_PER_CORRECT, EARLY_COINS, isEarlyNow, LOGIN_COINS, LOGIN_WEEK_COINS, eat, loadSnacks, loadWallet, saveSnacks, saveWallet, snacksLeft } from './shop'
import type { GachaResult } from './GachaView'
import { PartnerStatus } from './PartnerStatusView'
import { Records } from './RecordsView'
import { Shop, type ShopTab } from './ShopView'
import { Onboarding } from './OnboardingView'
import { ShareButton } from './ShareView'
import { loadOnboarded, saveOnboarded } from './onboarding'
import { levelAttack, BOSS_REMATCH_XP, BOSS_XP, BOSSES, HUNTER_TICKETS, loadBossHunter, saveBossHunter, DAILY_BOSS_COINS, loadWinStreak, saveWinStreak, STREAK_COINS, STREAK_DRAGON_XP, STREAK_EVERY, loadBoss, loadRushDay, loadRushExDay, RUSH_COINS, RUSH_EX_COINS, saveBoss, saveRushDay, saveRushExDay } from './boss'
import { addToday, loadCardsToday, loadTodayCount, loadTodayXp, saveCardsToday, saveTodayCount, saveTodayXp } from './stats'
import { currentStreakWithFreeze, loadStreak, recordStudyWithFreeze, saveStreak } from './streak'
import { applyColor, applyTextSize, applyTheme, loadLevels, loadSettings, saveLevels, saveSettings, toggleLevel } from './settings'
import { SettingsPanel } from './SettingsView'
import { LEVELS, WORDS, wordsOf, type Level, type Word } from './words'
import { splitSoft } from './softbreak'

type Tab = 'home' | 'word' | 'grammar' | 'reading' | 'boss' | 'settings'
type WordTab = 'card' | 'mini' | 'time' | 'stage'

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: 'home', icon: '🏠', label: 'ホーム' },
  { id: 'word', icon: '🔤', label: '単語ゲーム' },
  { id: 'grammar', icon: '📐', label: '文法チャレンジ' },
  { id: 'reading', icon: '📖', label: '読解ステージ' },
  { id: 'boss', icon: '👹', label: 'ボス部屋' },
  { id: 'settings', icon: '⚙️', label: '設定' },
]
// 単語ゲームはミニゲームが先。カードはミニゲームのタイル「🃏 単語カード」から
const WORD_TABS: { id: WordTab; label: string }[] = [
  { id: 'mini', label: '🎮 ミニゲーム' },
  { id: 'time', label: '⏱ タイムアタック' },
  { id: 'stage', label: '🗺 ステージ' },
]


const STATS_TABS = [
  { id: 'log', label: 'きろく' },
  { id: 'buddy', label: 'あいぼう' },
  { id: 'collection', label: 'コレクション' },
  { id: 'data', label: 'データ' },
] as const

const LUCKY_XP = 20
const REVIEW_DONE_COINS = 10
const EVENT_COINS = 10 // 季節のイベント期間の、その日はじめての学習
function saveReviewDone(day: string) {
  try {
    localStorage.setItem('eitan:review-done', day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 単語帳の定着率（箱3以上の割合）
function learnedPct(ws: { id: string }[], progress: Record<string, { box: number } | undefined>): number {
  return ws.length ? Math.round((ws.filter((w) => (progress[w.id]?.box ?? 0) >= 3).length / ws.length) * 100) : 0
}


function saveLucky(day: string) {
  try {
    localStorage.setItem('eitan:lucky', day)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 乱数（ボタンを押したときだけ呼ぶ）
const rand = () => Math.random()
// ボス図鑑の基本の顔ぶれ（ステージのボスと大学入試の塔のボス）
const BASE_BOSS_NAMES = [...Object.values(BOSSES).map((b) => b.name), ...UNIV_BOSSES.map((b) => b.name)]

function App() {
  const [progress, setProgress] = usePersistent<ProgressMap>(loadProgress, saveProgress)
  const [freeGachaDay, setFreeGachaDay] = usePersistent(loadFreeGachaDay, saveFreeGachaDay) // 1日1回の無料ガチャを使った日
  const [mode, setMode] = useState<Tab>('home')
  const [showList, setShowList] = useState(false)
  const [statsTab, setStatsTab] = useState<'log' | 'buddy' | 'collection' | 'data'>('log')
  // 苦手／お気に入りのカード復習：記録画面から始める。一周するまで同じ単語は出さない
  type Focus = 'weak' | 'fav' | 'pick' | 'week' | 'thisweek'
  const [cardFocus, setCardFocus] = useState<{ kind: Focus; done: string[] } | null>(null)
  const [picked, setPicked] = useState<string[]>([]) // 単語一覧から選んだ単語
  const [themeQuiz, setThemeQuiz] = useState(false) // テーマで練習：クイズでやる
  const [grammarDrill, setGrammarDrill] = useState<GrammarDrill | null>(null) // 文法チャレンジの文法ドリルをやっているとき
  const [favorites, setFavorites] = usePersistent(loadFavorites, saveFavorites)
  const [rouletteDay, setRouletteDay] = usePersistent(loadRouletteDay, saveRouletteDay)
  const [walkDay, setWalkDay] = usePersistent(loadWalkDay, saveWalkDay)
  const [walkMsg, setWalkMsg] = useState('')
  const [walkDiary, setWalkDiary] = useState(loadWalkDiary)
  const [notes, setNotes] = usePersistent(loadNotes, saveNotes)
  const today = dayKey()
  const xpRate = isWeekend(today) ? 2 : 1 // 週末は正解のXPが2倍
  const [daily, setDaily] = usePersistent(() => loadDailyNew(today), saveDailyNew)
  const newToday = daily.day === today ? daily.count : 0
  const extraToday = daily.day === today ? (daily.extra ?? 0) : 0


  const [party, setParty] = usePersistent(loadParty, saveParty)
  const monster = party.members[party.active]
  // いまの相棒を更新する。同じ操作で何度呼んでも前の更新を消さないよう、最新の値から計算する
  const updateMonster = (f: (m: MonsterState) => MonsterState) =>
    setParty((p) => updateActive(p, f(p.members[p.active])))
  const [happy, setHappy] = useState(false)
  const [leveledUp, setLeveledUp] = useState(false)
  const [evolved, setEvolved] = useState(false)
  const [evoForm, setEvoForm] = useState<string | null>(null) // 全画面で見せる進化後の姿
  const [evoFrom, setEvoFrom] = useState<Form | null>(null) // 進化する前の姿（シルエットで見せる）
  const [gain, setGain] = useState<{ amount: number; key: number } | null>(null) // ふわっと浮かぶXP
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const [streak, setStreak] = usePersistent(loadStreak, saveStreak)

  const [todayCount, setTodayCount] = usePersistent(() => loadTodayCount(today), saveTodayCount)
  const studiedToday = todayCount.day === today ? todayCount.count : 0

  const [settings, setSettings] = useState(loadSettings)
  useEffect(() => {
    saveSettings(settings)
    applyTheme(settings.theme)
    applyTextSize(settings.largeText)
    applyColor(settings.color)
  }, [settings])

  // グラフ用の日ごとの記録。古いデータには無いので、今日の分は今日の学習数から補う
  const [history, setHistory] = useState(() => {
    const h = loadHistory()
    return h[today] === undefined && studiedToday > 0 ? { ...h, [today]: studiedToday } : h
  })
  useEffect(() => saveHistory(history), [history])

  const [accuracy, setAccuracy] = usePersistent(loadAccuracy, saveAccuracy)
  const [cardsToday, setCardsToday] = usePersistent(() => loadCardsToday(today), saveCardsToday)
  const cardsDone = cardsToday.day === today ? cardsToday.count : 0
  const [todayXp, setTodayXp] = usePersistent(() => loadTodayXp(today), saveTodayXp)
  const [timeLog, setTimeLog] = usePersistent(loadTime, saveTime)
  useStudyTime(setTimeLog, today)

  const [celebrate, setCelebrate] = useState(false)
  const [souvenirs, setSouvenirs] = usePersistent(loadSouvenirs, saveSouvenirs)
  const [dailyBossDay, setDailyBossDay] = usePersistent(
    () => {
      try {
        return localStorage.getItem('eitan:daily-boss') ?? ''
      } catch {
        return ''
      }
    },
    (d: string) => {
      try {
        localStorage.setItem('eitan:daily-boss', d)
      } catch {
        // ストレージが使えない環境では保存をあきらめる
      }
    },
  )
  const [cheer, setCheer] = useState<Line | null>(null) // 10問ごとの相棒の応援
  useEffect(() => {
    if (!cheer) return
    const id = window.setTimeout(() => setCheer(null), 3000)
    return () => window.clearTimeout(id)
  }, [cheer])
  const [totals, setTotals] = usePersistent(loadTotals, saveTotals)

  const [, setMissions] = usePersistent(() => loadMissions(today), saveMissions)
  const [wallet, setWallet] = usePersistent(loadWallet, saveWallet)
  const [rushDay, setRushDay] = usePersistent(loadRushDay, saveRushDay)
  const [rushExDay, setRushExDay] = usePersistent(loadRushExDay, saveRushExDay)
  const [gachaStep, setGachaStep] = usePersistent(loadStep, saveStep)
  const [bag, setBag] = usePersistent(loadBag, saveBag)
  const [moodMeter, setMoodMeter] = usePersistent(loadMood, saveMood)
  const [warm, setWarm] = usePersistent(loadWarm, saveWarm)
  const [keys, setKeys] = usePersistent(loadKeys, saveKeys)
  const [shards, setShards] = usePersistent(loadShards, saveShards)
  const [gachaPoints, setGachaPoints] = usePersistent(loadGachaPoints, saveGachaPoints)
  const [stickers, setStickers] = usePersistent(loadStickers, saveStickers)
  const [luckyMonth, setLuckyMonth] = usePersistent(loadLuckyBagMonth, saveLuckyBagMonth)
  const [power, setPower] = useState(() => loadTraining().power)
  const [giftDay, setGiftDay] = usePersistent(loadGiftDay, saveGiftDay)
  const [pieces, setPieces] = usePersistent(loadPieces, savePieces)
  const [bday, setBday] = usePersistent(() => registerBirthday(loadBirthday(), today, formOf(monster).stage >= 1), saveBirthday)
  const [giftMsg, setGiftMsg] = useState('')
  // 1日の目標を達成したら、次の日のおみやげを予約する
  if (studiedToday >= settings.dailyGoal && giftDay !== today && !giftReady(giftDay, today)) setGiftDay(today)
  const [winStreak, setWinStreak] = usePersistent(loadWinStreak, saveWinStreak)
  const cheerUp = (n: number) => setMoodMeter((m) => addMood(m, today, n))
  const streakDays = currentStreakWithFreeze(streak, today, wallet.freezes ?? 0)
  const [showShop, setShowShop] = useState(false)
  const [readLevel, setReadLevel] = useState<ReadLevel>(loadReadLevel) // 読解ステージのむずかしさ
  // 学年・レベルをえらんだら：単語帳と、読解のむずかしさもその学年に（今日の課題・ボス戦の文法もこれに合わせる）
  const pickGrade = (lv: Level[], g?: GradeId) => {
    setLevels(lv)
    if (!g) return
    saveGrade(g)
    setReadLevel(READ_LEVEL_FOR[g])
    saveReadLevel(READ_LEVEL_FOR[g])
  }
  const [buddyBox, setBuddyBox] = usePersistent(loadBuddyBox, saveBuddyBox) // 入れかえて休んでいる文法・読解のなかま
  const [buddies, setBuddies] = usePersistent(loadBuddies, saveBuddies) // 文法のことばモンスター・読解の竜
  const [buddyEvo, setBuddyEvo] = useState<{ track: Track; form: BuddyForm; buddy: Buddy } | null>(null) // なかまの進化演出
  const [wordTab, setWordTab] = useState<WordTab>('mini') // 単語タブの中（ミニゲーム・カード・タイムアタック）
  const [trioDance, setTrioDance] = useState(false) // トリオボーナスで3体がおどる
  const [grammarGo, setGrammarGo] = useState(false) // 文法チャレンジの上で今日の文法をひらいている
  const [todayQuiz, setTodayQuiz] = useState(false) // 今日の課題の「今日の単語（4択）」をやっている
  const [shortGo, setShortGo] = useState(false) // 今日の課題の「今日の読解」を開く
  const [cardTouched, setCardTouched] = useState(false) // カードを1枚でも答えたか（それまでは自動で発音しない）
  const [walkQuizOpen, setWalkQuizOpen] = useState(false)
  const [dailyGo, setDailyGo] = useState(false) // ホームの「今日のボスに挑む」から来た
  const [shopTab, setShopTab] = useState<ShopTab | undefined>(undefined) // ショップを開いたときの売り場
  // タブ・ショップ・チャレンジを開いたら、その画面だけを出していちばん上へ（押したら画面が変わったとわかるように）
  // ホームの「きょうのあそび」をひらいているか（端末ごとに覚える）
  const [playOpen, setPlayOpen] = useState(loadPlayOpen)
  const togglePlay = (open: boolean) => {
    if (open === playOpen) return
    setPlayOpen(open)
    savePlayOpen(open)
  }
  const toContent = () => requestAnimationFrame(() => window.scrollTo?.({ top: 0 }))
  const [showChallenge, setShowChallenge] = useState(false)
  const todayFocus: TodayTask | null = showShop || showChallenge ? null : mode === 'word' && todayQuiz ? 'word' : mode === 'grammar' && grammarGo ? 'grammar' : mode === 'reading' && shortGo ? 'reading' : null // 今日の課題だけを画面いっぱいに出している
  const goToday = (t: TodayTask) => {
    setTodayQuiz(t === 'word')
    setGrammarGo(t === 'grammar')
    setShortGo(t === 'reading')
    setGrammarDrill(null)
    if (t === 'word') setWordTab('mini')
    setMode(t)
    window.scrollTo?.({ top: 0 })
  }
  const todayDone: Record<TodayTask, boolean> = { word: loadTodayWordsDay() === today, grammar: loadDailyGrammarDay() === today, reading: loadDailyShortDay() === today }
  const todayNext = todayFocus && todayDone[todayFocus] ? TODAY_TASKS.find((t) => t !== todayFocus && !todayDone[t]) : undefined // 今日の課題を1つ終えたら、まだの課題へ
  const todayAllDone = !!todayFocus && TODAY_TASKS.every((t) => todayDone[t]) // 3つともクリア → ホームでトリオボーナス
  const todayNextBtn = todayNext ? (
    <button className="next-unit-btn today-next-btn" onClick={() => goToday(todayNext)}>
      次の課題へ ▶ {TODAY_TASK_LABEL[todayNext]}
    </button>
  ) : todayAllDone ? (
    <button
      className="next-unit-btn today-next-btn"
      onClick={() => {
        setTodayQuiz(false)
        setGrammarGo(false)
        setShortGo(false)
        setMode('home')
        window.scrollTo?.({ top: 0 })
      }}
    >
      🎉 ぜんぶクリア！ ホームへ ▶
    </button>
  ) : null
  // 問題の画面をひらいているあいだ（子の画面が usePlaying で知らせる）は、相棒・タブ・今日の課題ボタンをかくし、上に「ほかの問題をえらぶ」
  const [plays, setPlays] = useState<{ id: number; exit: () => void }[]>([])
  const playSeq = useRef(0)
  const playRegister = useCallback<PlayRegister>((exit) => {
    const id = ++playSeq.current
    setPlays((p) => [...p, { id, exit }])
    return () => setPlays((p) => p.filter((x) => x.id !== id))
  }, [])
  const cardPlay = mode === 'word' && wordTab === 'card' // 単語カードも、えらんだら問題だけの画面
  const playOn = (plays.length > 0 || cardPlay) && !todayFocus && !showShop && !showChallenge
  const exitPlay = () => {
    if (plays.length > 0) plays[plays.length - 1].exit()
    else if (cardPlay) setWordTab('mini')
  }
  // 音読・読み上げは、ページが変わったら止める（タブ・ショップ・今日の課題の切りかえ、問題の画面から出たとき）
  const pageKey = `${mode}|${showShop}|${showChallenge}|${todayFocus ?? ''}|${wordTab}|${readLevel}`
  const prevPlays = useRef(0)
  useEffect(() => () => cancelSpeech(), [pageKey]) // 前のページを閉じるときに止める（新しいページの自動読み上げは止めない）
  useEffect(() => {
    if (plays.length < prevPlays.current) cancelSpeech()
    prevPlays.current = plays.length
  }, [plays.length])
  const home = mode === 'home' && !showShop && !showChallenge // ホーム（相棒・あそび・今日の課題・記録）
  const [challengeDay, setChallengeDay] = usePersistent(loadChallengeDay, saveChallengeDay)
  const [snacks, setSnacks] = usePersistent(loadSnacks, saveSnacks)
  const [onboarded, setOnboarded] = usePersistent(loadOnboarded, saveOnboarded)
  const count = (c: Counter, n = 1) => setMissions((m) => bump(m, today, c, n))

  // 引き継ぎコードがあれば、1日1回自動でクラウドに保存（失敗しても気にしない）
  useEffect(() => {
    const code = loadCode()
    if (!shouldAutoSave(code, loadSavedAt(), today, typeof navigator === 'undefined' || navigator.onLine)) return
    const id = window.setTimeout(() => cloudSave(code).catch(() => {}), 5000)
    return () => window.clearTimeout(id)
  }, [today])

  // 相棒の励まし（連続正解・連続ミスで声をかけてくれる）
  const run = useRef({ ok: 0, ng: 0 })
  const [petCheer, setPetCheer] = useState<{ cheer: Cheer; key: number } | null>(null)
  useEffect(() => {
    if (!petCheer) return
    const id = window.setTimeout(() => setPetCheer(null), 3200)
    return () => window.clearTimeout(id)
  }, [petCheer])

  // 1問答えるごとに呼ぶ（正解・不正解どちらでも）
  function studied(correct: boolean) {
    run.current = correct ? { ok: run.current.ok + 1, ng: 0 } : { ok: 0, ng: run.current.ng + 1 }
    const ev = cheerEvent(run.current.ok, run.current.ng)
    if (ev) {
      const f = formOf(monster)
      const n = (run.current.ok + run.current.ng * 3 + todayCount.count) * 7
      const c = encourage(monster.species, f.stage, ev, (n % 100) / 100)
      setPetCheer((p) => ({ cheer: c, key: (p?.key ?? 0) + 1 }))
      if (settings.sound && settings.petVoice) speakPet(c.text, c.lang, f.stage >= 3 ? 1.2 : 1.6)
    }
    count('answers')
    if (correct) count('correct')
    if (correct) setWallet((w) => ({ ...w, coins: w.coins + COIN_PER_CORRECT }))
    if (correct) cheerUp(1)
    const r = recordStudyWithFreeze(streak, today, wallet.freezes ?? 0)
    setStreak(r.streak)
    // ログインボーナス：その日はじめての学習で🪙5、7日連続ごとに🪙20
    if (streak?.last !== today) {
      setTotals((t) => ({ ...t, studyDays: (t.studyDays ?? 0) + 1 }))
      const early = isEarlyNow() ? EARLY_COINS : 0
      const eventBonus = seasonEvent ? EVENT_COINS : 0
      const bonus = (r.streak.count % 7 === 0 ? LOGIN_WEEK_COINS : LOGIN_COINS) + early + eventBonus
      setWallet((w) => ({ ...w, coins: w.coins + bonus }))
      if (r.streak.count % 7 === 0) {
        setWallet((w) => addTicket(w))
        pushToast([{ id: 'ticket', text: `${r.streak.count}日連続！ 🎟 ガチャチケットを1枚もらった（ショップで使えるよ）`, counter: 'answers', target: 0 }])
      }
      const months = annivMonths(monster.born, today)
      if (months > 0) {
        setWallet((w) => ({ ...w, coins: w.coins + MONTHLY_COINS }))
        pushToast([{ id: 'monthly', text: `${annivText(monster.name ?? formOf(monster).name, months)} 🪙${MONTHLY_COINS}`, counter: 'answers', target: 0 }])
      }
      pushToast([{ id: 'login', text: `${seasonEvent ? `${seasonEvent.icon} ${seasonEvent.name}ボーナスつき！ ` : ''}${early ? '早起きえらい！' : '今日もえらい！'} 🪙${bonus}`, counter: 'answers', target: 0 }])
      const days = (totals.studyDays ?? 0) + 1
      if (titleFor(days) !== titleFor(days - 1)) {
        pushToast([{ id: 'title', text: `称号が「${titleFor(days)}」になった！（学習${days}日）`, counter: 'answers', target: 0 }])
      }
      if (bondLevel(days) > bondLevel(days - 1)) {
        pushToast([{ id: 'bond', text: `${monster.name ?? formOf(monster).name}「いつもありがとう！」 ${bondHearts(bondLevel(days))}`, counter: 'answers', target: 0 }])
      }
    }
    if (r.used) setWallet((w) => ({ ...w, freezes: Math.max(0, (w.freezes ?? 0) - 1) }))
    const next = addToday(todayCount, today)
    setTodayCount(next)
    if (next.count % 10 === 0) setCheer(cheerFor(next.count))
    setHistory((h) => addHistory(h, today))
    const reached = studiedToday < settings.dailyGoal && next.count >= settings.dailyGoal
    if (reached) {
      setCelebrate(true)
      // 相棒がおでかけして、おみやげを見つけてくる
      const sv = souvenirFor(today)
      setSouvenirs((l) => addSouvenir(l, sv.id))
      setWallet((w) => ({ ...w, coins: w.coins + sv.coins }))
      pushToast([{ id: 'souvenir', text: `${monster.name ?? formOf(monster).name}が「${sv.icon} ${sv.name}」を見つけてきた！ 🪙${sv.coins}`, counter: 'answers', target: 0 }])
    }
    setTotals((t) => ({
      ...t,
      answers: t.answers + 1,
      correct: t.correct + (correct ? 1 : 0),
      goals: t.goals + (reached ? 1 : 0),
    }))
  }

  const [mistakes, setMistakes] = usePersistent(loadMistakes, saveMistakes)
  const [quizFocus, setQuizFocus] = useState<Focus | null>(null)

  // ラッキー単語（今日のことば）に正解すると1日1回ボーナス
  const lucky = pickWordOfDay(WORDS, today)
  const seasonEvent = eventFor(today)
  const [hour] = useState(() => new Date().getHours())
  const [luckyDay, setLuckyDay] = usePersistent(
    () => {
      try {
        return localStorage.getItem('eitan:lucky') ?? ''
      } catch {
        return ''
      }
    },
    saveLucky,
  )
  function checkLucky(correct: boolean, wordId: string) {
    if (!correct || !lucky || wordId !== lucky.id || luckyDay === today) return
    setLuckyDay(today)
    gainXp(LUCKY_XP, null)
    pushToast([{ id: 'lucky', text: `ラッキー単語「${lucky.en}」に正解！ +${LUCKY_XP}XP`, counter: 'answers', target: 0 }])
  }

  function onAnswer(correct: boolean, xp: number, wordId: string, source: Source) {
    studied(correct)
    checkLucky(correct, wordId)
    setAccuracy((a) => recordAnswer(a, today, source, correct))
    if (correct && source === 'ear') count('ear')
    if (!correct && wordId) setMistakes((m) => addMistake(m, wordId)) // 単語にひもづかない問題（アルファベットなど）は記録しない
    if (correct && xp > 0) gainXp(xp * xpRate, source)
  }

  // 文法・長文の答え：学習の記録はいつもどおり、XP はその項目のなかま（文法＝ペットモンスター、長文＝竜）へ
  function feedTrack(track: Track, raw: number) {
    const amount = boosted(raw, moodFull(moodMeter, today))
    const r = feedBuddy(buddies, track, amount) // お知らせ用（同じタイミングで2回あげても足し算はずれないよう、保存は関数で）
    setBuddies((b) => feedBuddy(b, track, amount).buddies)
    addBuddyToday(today, track, amount)
    const name = (b: Buddies) => buddyName(track, b[track])
    if (r.evolved) {
      setBuddyEvo({ track, form: r.evolved, buddy: r.buddies[track] })
      recordEvo(track, r.evolved.name, today)
      setWallet((w) => ({ ...w, coins: w.coins + EVO_COINS })) // 新しい姿のお祝い
    }
    else if (r.levelUp) pushToast([{ id: `buddy-lv-${track}`, text: `${buddyForm(track, r.buddies[track]).icon} ${name(r.buddies)}が Lv.${buddyLevel(r.buddies[track]).level} になった！`, counter: 'answers', target: 0 }])
  }
  const onAnswerTrack = (track: Track) => (correct: boolean, xp: number, wordId: string, source: Source) => {
    onAnswer(correct, 0, wordId, source)
    if (correct && xp > 0) feedTrack(track, xp * xpRate)
  }
  // ボス戦のチーム：単語（相棒）・文法・読解のなかまの絵と名前
  const bossTeam: BossTeam = {
    word: { name: monster.name ?? formOf(monster).name, fig: <MonsterFigure form={formOf(monster)} kind={monster.kind} wear={monster.wear} mood="happy" />, answer: onAnswer, level: levelInfo(monster.xp).level },
    grammar: { name: buddyName('grammar', buddies.grammar), fig: <BuddyFigure track="grammar" buddy={buddies.grammar} />, answer: onAnswerTrack('grammar'), level: buddyLevel(buddies.grammar).level },
    reading: { name: buddyName('reading', buddies.reading), fig: <BuddyFigure track="reading" buddy={buddies.reading} />, answer: onAnswerTrack('reading'), level: buddyLevel(buddies.reading).level },
  }

  function gainXp(raw: number, source: Source | null) {
    const amount = boosted(raw, moodFull(moodMeter, today)) // ごきげんMAXの日は1.2倍
    setTodayXp((d) => ({ day: today, count: (d.day === today ? d.count : 0) + amount }))
    setGain((g) => ({ amount, key: (g?.key ?? 0) + 1 }))
    const next = feed(monster, amount, source, today)
    updateMonster((m) => feed(m, amount, source, today))
    setParty((p) => feedHelpers(p, amount, today))
    const helped = feedHelpers(party, amount, today)
    helped.members.forEach((m, i) => {
      if (i === party.active || formOf(m).id === formOf(party.members[i]).id) return
      pushToast([{ id: 'helper-evolve', text: `おるすばん中の${party.members[i].name ?? formOf(party.members[i]).name}が「${formOf(m).name}」に${formOf(m).stage === 1 ? 'かえった' : '進化した'}！`, counter: 'answers', target: 0 }])
    })
    setHappy(true)
    const up = levelInfo(next.xp).level > levelInfo(monster.xp).level
    setLeveledUp(up)
    if (up) playFanfare()
    for (const m of milestonesBetween(levelInfo(monster.xp).level, levelInfo(next.xp).level)) {
      setWallet((w) => addTicket(w))
      pushToast([{ id: `milestone-${m}`, text: `🎊 祝・Lv.${m}！ ${monster.name ?? formOf(monster).name}の記念日！ 🎟ガチャチケットをもらった`, counter: 'answers', target: 0 }])
    }
    const coupons = couponsBetween(levelInfo(monster.xp).level, levelInfo(next.xp).level)
    if (coupons > 0) {
      setWallet((w) => ({ ...w, coupons: (w.coupons ?? 0) + coupons }))
      pushToast([{ id: 'coupon', text: `Lv.${levelInfo(next.xp).level} になった記念に割引券をもらった！（次の着せ替え・部屋が半額）`, counter: 'answers', target: 0 }])
    }
    const changed = formOf(next).id !== formOf(monster).id
    setEvolved(changed)
    if (changed) {
      setEvoForm(formOf(next).id)
      setEvoFrom(formOf(monster))
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setHappy(false)
      setLeveledUp(false)
      setEvolved(false)
      setGain(null)
    }, 2000)
  }


  const [stages, setStages] = usePersistent(loadStages, saveStages)
  const [boss, setBoss] = usePersistent(loadBoss, saveBoss)

  const [levels, setLevels] = usePersistent(loadLevels, saveLevels)
  const [myWords, setMyWords] = usePersistent(loadMyWords, saveMyWords)
  const [useMy, setUseMy] = usePersistent(loadUseMy, saveUseMy)
  const words = useMemo(
    () => [...wordsOf(levels), ...(useMy ? myWords : [])],
    [levels, useMy, myWords],
  )
  const lookup = useMemo(() => makeLookup([...WORDS, ...myWords]), [myWords])
  const levelKey = `${levels.join(',')}${useMy ? `:my${myWords.length}` : ''}`

  const weak = useMemo(() => weakWords(words, mistakes), [words, mistakes])
  // お気に入りは単語帳の選択に関係なく全部から
  const favWords = useMemo(() => [...WORDS, ...myWords].filter((w) => favorites.includes(w.id)), [myWords, favorites])
  const focusList = (k: Focus) => (k === 'weak' ? weak : k === 'fav' ? favWords : k === 'week' ? weekAgo : k === 'thisweek' ? thisWeekWords : [...WORDS, ...myWords].filter((w) => picked.includes(w.id)))
  const FOCUS_LABEL: Record<Focus, string> = { weak: '苦手', fav: 'お気に入り', pick: '選んだ単語', week: '1週間前に学んだ単語', thisweek: '今週学んだ単語' }

  const queue = useMemo(() => buildQueue(words, progress, today, newToday, settings.newPerDay + extraToday, settings.randomNew, settings.reviewCap), [words, progress, today, newToday, extraToday, settings.randomNew, settings.reviewCap, settings.newPerDay])
  // その日はじめて開いたときだけ「今日の復習」を知らせる
  const dueReviews = words.filter((w) => progress[w.id] && progress[w.id].due <= today).length
  const [greet, setGreet] = useState(() => {
    try {
      return localStorage.getItem('eitan:greeted') !== today
    } catch {
      return false
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem('eitan:greeted', today)
    } catch {
      // ストレージが使えない環境では保存をあきらめる
    }
  }, [today])
  const firstToday = firstLearnedOn(progress, today)
    .map((id) => WORDS.find((w) => w.id === id) ?? myWords.find((w) => w.id === id))
    .filter((w): w is Word => !!w)
  // 今週（月曜から）はじめて学んだ単語
  const thisWeekWords = [...WORDS, ...myWords].filter((w) => {
    const f = progress[w.id]?.first
    return !!f && f >= weekStart(today) && f <= today
  })
  // 1週間前（5〜9日前）にはじめて学んだ単語
  const weekAgo = [...WORDS, ...myWords].filter((w) => {
    const f = progress[w.id]?.first
    return !!f && f >= addDays(today, -9) && f <= addDays(today, -5)
  })
  // 相棒が話題にする、覚えた単語（箱2以上から最大20語）
  const learnedSample = useMemo(() => WORDS.filter((w) => (progress[w.id]?.box ?? 0) >= 2).slice(0, 20), [progress])
  // 定着した単語の数（全単語帳）を毎日記録
  const learnedTotal = useMemo(() => Object.values(progress).filter((p) => p.box >= 3).length, [progress])
  const [learnedLog, setLearnedLog] = usePersistent(loadLearnedLog, saveLearnedLog)
  useEffect(() => {
    setLearnedLog((l) => recordLearned(l, today, learnedTotal))
  }, [today, learnedTotal, setLearnedLog])
  const learned = words.filter((w) => (progress[w.id]?.box ?? 0) >= 3).length
  // 「あとで」に回した単語は列のうしろへ（その日だけ）
  const [skipped, setSkipped] = useState<string[]>([])
  const ordered = skipped.length ? [...queue.filter((w) => !skipped.includes(w.id)), ...queue.filter((w) => skipped.includes(w.id))] : queue
  const card = ordered[0]


  // バッジ：条件を満たしたらその場でもらえる
  const [earned, setEarned] = usePersistent(loadEarned, saveEarned)
  const [bestTime, setBestTime] = useState(loadBest)
  const [toast, setToast] = useState<Badge[]>([])
  const learnedAll = WORDS.filter((w) => (progress[w.id]?.box ?? 0) >= 3).length
  const level = Math.max(...party.members.map((m) => levelInfo(m.xp).level))
  const streakCount = streak?.count ?? 0
  const got = newlyEarned(
    {
      ...totals,
      streak: streakCount,
      learned: learnedAll,
      level,
      bestTime,
      bosses: Object.keys(boss).length,
      coins: wallet.coins,
      members: party.members.length,
      studyDays: totals.studyDays ?? 0,
      formsSeen: new Set(party.members.flatMap(seenForms)).size,
      formsTotal: FORMS.length,
      souvenirs: souvenirs.length,
      souvenirsTotal: SOUVENIRS.length,
      modesPlayed: loadPlayed().length,
      diaryDays: Object.keys(loadDiary()).length,
      completeBooks: LEVELS.filter((l) => wordsOf([l]).every((w) => (progress[w.id]?.box ?? 0) >= 3)).length,
      towerFloors: Object.keys(loadUniv()).length,
      species: new Set(party.members.map((m) => m.species ?? 'mochi')).size,
      collection: new Set(party.members.map((m) => `${m.species ?? 'mochi'}:${m.kind ?? 'normal'}`)).size,
      bossBook: baseBeaten(loadBook(), BASE_BOSS_NAMES),
      bossTotal: BASE_BOSS_NAMES.length,
    },
    earned,
  )
  if (got.length > 0) {
    // 描画中に差分を反映する（React の「前回の描画からの変化に合わせて state を直す」書き方）
    setEarned({ ...earned, ...Object.fromEntries(got.map((b) => [b.id, today])) })
    setToast(got)
    const reward = rewardOf(got.map((b) => b.id))
    if (reward.tickets || reward.coins) setWallet((w) => ({ ...w, coins: w.coins + reward.coins, tickets: Math.min(TICKET_MAX, (w.tickets ?? 0) + reward.tickets) }))
  }

  // ミッション達成：その場でボーナスXP
  const [toastQueue, setToastQueue] = useState<Mission[][]>([])
  const toastHead = toastQueue[0]
  const missionToast = toastHead ?? []
  const pushToast = (ms: Mission[]) => setToastQueue((q) => enqueue(q, ms))
  // チームの称号が上がったら🎟（称号ごとに1回）
  const teamLevel = teamOf(levelInfo(monster.xp).level, buddies).level
  useEffect(() => {
    const n = claimTeamTitle(teamLevel)
    if (n <= 0) return
    setWallet((w) => Array.from({ length: n }).reduce<typeof w>((x) => addTicket(x), w))
    pushToast([{ id: 'team-title', text: `🤝 チームの称号が「${TEAM_TITLES[teamIndex(teamLevel)].name}」に！ 🎟ガチャチケット`, counter: 'answers', target: 0 }])
    // pushToast・setWallet は毎回つくり直されるので、チームレベルがかわったときだけ動かす
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamLevel])
  // 今日のミッションはオーナーの要望で表示・ごほうびともにやめた（数えるだけ）
  useEffect(() => {
    // 問題の画面ではお知らせを出さずに待つ（次の問題がかくれないように）。えらぶ画面にもどったら出す
    if (!toastHead || playOn) return
    const id = window.setTimeout(() => setToastQueue(dequeue), 3000)
    return () => window.clearTimeout(id)
  }, [toastHead, playOn])

  // 今日の復習：開いたときにあった復習を全部終えたら🪙（1日1回）
  const [reviewStart] = useState(dueReviews)
  const [reviewDay, setReviewDay] = usePersistent(() => {
    try {
      return localStorage.getItem('eitan:review-done') ?? ''
    } catch {
      return ''
    }
  }, saveReviewDone)
  if (reviewStart > 0 && dueReviews === 0 && reviewDay !== today) {
    setReviewDay(today)
    setWallet((w) => ({ ...w, coins: w.coins + REVIEW_DONE_COINS }))
    pushToast([{ id: 'review', text: `今日の復習をぜんぶ終えた！ 🪙${REVIEW_DONE_COINS}`, counter: 'answers', target: 0 }])
  }

  // 週間チャレンジ：達成したらその場でコインとXP
  // 新しい週に最初に開いたとき、先週のふりかえりを見せる
  const lastWeek = lastWeekSummary(history, today)
  const [reviewWeek, setReviewWeek] = useState(() => {
    try {
      return localStorage.getItem('eitan:review-week') !== weekStart(today)
    } catch {
      return false
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem('eitan:review-week', weekStart(today))
    } catch {
      // ストレージが使えない環境では保存をあきらめる
    }
  }, [today])

  const [weeklyClaimed, setWeeklyClaimed] = usePersistent(loadWeeklyClaimed, saveWeeklyClaimed)
  const thisWeek = weekStart(today)
  const weekDone = weekCount(history, today)
  if (weekDone >= WEEKLY_TARGET && weeklyClaimed !== thisWeek) {
    setWeeklyClaimed(thisWeek)
    setWallet((w) => ({ ...w, coins: w.coins + WEEKLY_COINS }))
    updateMonster((m) => feed(m, WEEKLY_XP, null, today))
    pushToast([{ id: 'weekly', text: `今週${WEEKLY_TARGET}問クリア・🪙${WEEKLY_COINS}もゲット`, counter: 'answers', target: WEEKLY_TARGET }])
  }

  // 相棒の記念日（まとめて過ぎていたら、いちばん新しいものだけお祝いして残りも済みにする）
  const [annivDone, setAnnivDone] = usePersistent(loadDone, saveDone)
  const annivKey = `m${party.active}`
  const anniv = dueAnniversary(monster.born, today, annivDone, annivKey)
  if (anniv !== null) {
    setAnnivDone([...annivDone, ...MILESTONES.filter((n) => n <= anniv).map((n) => `${annivKey}:${n}`)])
    setWallet((w) => ({ ...w, coins: w.coins + ANNIV_COINS }))
    pushToast([{ id: 'anniv', text: `${monster.name ?? formOf(monster).name}と出会って${anniv}日！ 🪙${ANNIV_COINS}`, counter: 'answers', target: 0 }])
  }

  // 節目のバッジでタマゴがもらえる
  const eggTotal = eggsEarned(earned)
  const [eggToast, setEggToast] = useState(false)
  if (party.members.length < eggTotal) {
    setParty(addEggs(party, eggTotal))
    setEggToast(true)
  }
  useEffect(() => {
    if (!eggToast || playOn) return
    const id = window.setTimeout(() => setEggToast(false), 3500)
    return () => window.clearTimeout(id)
  }, [eggToast, playOn])
  useEffect(() => {
    if (toast.length === 0 || playOn) return
    const id = window.setTimeout(() => setToast([]), 3000)
    return () => window.clearTimeout(id)
  }, [toast, playOn])

  const focusCard = cardFocus ? focusList(cardFocus.kind).find((w) => !cardFocus.done.includes(w.id)) : undefined

  function answerFocus(correct: boolean, easy = false) {
    if (!focusCard || !cardFocus) return
    setCardFocus({ ...cardFocus, done: [...cardFocus.done, focusCard.id] })
    setProgress({ ...progress, [focusCard.id]: grade(progress[focusCard.id], correct, today, easy) })
    studied(correct)
    checkLucky(correct, focusCard.id)
    if (correct) count('cardGood')
    if (!correct) setMistakes((m) => addMistake(m, focusCard.id))
    else if (cardFocus.kind === 'weak') setMistakes((m) => easeMistake(m, focusCard.id))
    gainXp(correct ? XP_CARD_GOOD : XP_CARD_AGAIN, 'card')
  }

  // コインを使う（足りなければ false）
  function spend(n: number): boolean {
    if (wallet.coins < n) return false
    setWallet((w) => ({ ...w, coins: w.coins - n }))
    return true
  }

  function startCards(kind: Focus) {
    setCardFocus({ kind, done: [] })
    setShowList(false)
    setMode('word')
    setWordTab('card')
  }

  function startQuiz(kind: Focus) {
    setQuizFocus(kind)
    setMode('word')
    setWordTab('mini')
  }

  const [shown, setShown] = useState(0) // 同じカードがもう一度出ても新しいカードとして扱う

  function answer(correct: boolean, easy = false) {
    setShown((n) => n + 1)
    setCardsToday((d) => addToday(d, today))
    if (isCardBonus(cardsDone + 1)) setWallet((w) => ({ ...w, coins: w.coins + CARD_BONUS_COINS })) // 50枚ごとのモチのごほうび
    if (!progress[card.id]) setDaily({ day: today, count: newToday + 1, extra: extraToday })
    setProgress({ ...progress, [card.id]: grade(progress[card.id], correct, today, easy) })
    studied(correct)
    checkLucky(correct, card.id)
    setAccuracy((a) => recordAnswer(a, today, 'card', correct))
    if (correct) count('cardGood')
    if (!correct) setMistakes((m) => addMistake(m, card.id))
    gainXp((correct ? XP_CARD_GOOD : XP_CARD_AGAIN) * xpRate, 'card')
  }

  // ガチャを n 回まとめて引く（1回ずつ財布・仲間・ステップを引きついで計算する）
  // なかま10体 → 🎟1まい（記録の「なかま」とガチャのページの両方から）
  function tradeTen() {
    const next = tradeMembers(party)
    if (!next || (wallet.tickets ?? 0) >= TICKET_MAX) return
    setParty(next)
    setWallet((w) => addTicket(w))
    pushToast([{ id: 'egg-trade', text: '🐾 仲間10体 → 🎟 ガチャチケットと交換した！', counter: 'answers', target: 0 }])
  }
  function drawMany(ticket: boolean, n: number, start = wallet): GachaResult[] {
    let w = start
    let p = party
    let st = gachaStep
    const out: GachaResult[] = []
    let bonusXp = 0
    const pulled = loadGachaStats().total
    let sb = stickers
    let stickerDone = false
    for (let i = 0; i < n; i++) {
      const r = drawEgg(w, p, rand(), ticket, rand(), isWeekend(today), pickupOf(today).id, stepLeft(st, today) === 0 || (n >= MULTI5 && i === n - 1 && out.every((k) => k.kind.rarity === 'N')), gachaPrice(hour) - omikujiDiscount(today), seasonalKindOf(today), dailyColor(today))
      if (!r) break
      st = nextStep(st, today)
      const dup = isDuplicate(p.members, r.species.id, r.kind.id)
      const newSpecies = r.species.id !== 'mochi' && !p.members.some((m) => m.species === r.species.id)
      const newKind = r.kind.id !== 'normal' && !p.members.some((m) => m.kind === r.kind.id)
      const bonus = bonusOf(rand())
      const lucky = isLuckyPull(pulled + i + 1) ? pulled + i + 1 : 0
      const slot = slotOf(rand())
      const sticker = stickerOf(rand())
      const mystery = rand() < MYSTERY_RATE
      const st2 = addSticker(sb, sticker)
      sb = st2.book
      if (st2.complete) stickerDone = true
      w = { ...r.wallet, coins: r.wallet.coins + (dup ? DUP_REFUND : 0) + (bonus?.kind === 'coins' ? bonus.amount : 0) + (lucky ? LUCKY_COINS : 0) + (slot.win ? SLOT_COINS : 0) + (mystery ? MYSTERY_COINS : 0) }
      if (bonus?.kind === 'xp') bonusXp += bonus.amount
      p = r.party
      out.push({ kind: r.kind, species: r.species, newKind, newSpecies, refund: dup ? DUP_REFUND : 0, ...(bonus ? { bonus: bonus.text } : {}), ...(lucky ? { lucky } : {}), slot, sticker, ...(mystery ? { mystery } : {}), nth: r.party.members.filter((m) => (m.species ?? 'mochi') === r.species.id).length })
    }
    if (out.length > 0) {
      setWallet(w)
      setParty(p)
      setGachaStep(st)
      saveGachaStats(addStats(loadGachaStats(), out.map((k) => k.kind.rarity)))
      setGachaPoints((pt) => pt + out.length)
      setStickers(sb)
      const done = loadColorComplete()
      const fresh = completedSpecies(p.members).filter((sp) => !done.includes(sp))
      if (fresh.length > 0) {
        saveColorComplete([...done, ...fresh])
        setWallet((x) => fresh.reduce((acc) => addTicket(addTicket(acc)), x))
        pushToast([{ id: 'color-complete', text: `🌈 ${fresh.map((sp) => speciesOf(sp).name).join('・')}の色ちがいを全部そろえた！ 🎟${COLOR_COMPLETE_TICKETS * fresh.length}`, counter: 'answers', target: 0 }])
      }
      const trioDone = loadTrio()
      const trio = trioSpecies(p.members).filter((sp) => !trioDone.includes(sp))
      if (trio.length > 0) {
        saveTrio([...trioDone, ...trio])
        setWallet((x) => ({ ...x, coins: x.coins + TRIO_COINS * trio.length }))
        pushToast([{ id: 'trio', text: `👪 ${trio.map((sp) => speciesOf(sp).name).join('・')}が3体そろった！ トリオボーナス 🪙${TRIO_COINS * trio.length}`, counter: 'answers', target: 0 }])
      }
      if (stickerDone) {
        setWallet((x) => ({ ...addTicket(addTicket(x)) }))
        pushToast([{ id: 'stickers', text: `🏷 シール帳がコンプリート！ 🎟ガチャチケットを${STICKER_TICKETS}まいもらった`, counter: 'answers', target: 0 }])
      }
      count('gacha', out.length)
      if (bonusXp > 0) gainXp(bonusXp, null)
    }
    return out
  }

  // 「おまけのあそび」：設定のいちばん下に出す（ゲーム画面にはおかない）
  const playBox = (
          <details className="home-play game-fold lg-1" open={playOpen} onToggle={(e) => togglePlay(e.currentTarget.open)}>
            <summary><span className="lg-icon" aria-hidden="true">🎁</span>おまけのあそび</summary>
            <p className={`omikuji o-${omikujiOf(today).id}`}>
              ⛩ 今日のおみくじ：<strong>{omikujiOf(today).name}</strong>　{omikujiOf(today).text}
            </p>
            {walkDay !== today ? (
              <button
                className="challenge-btn walk-btn"
                onClick={() => {
                  const w = walkFind(words, rand())
                  const place = walkPlace(rand())
                  setWalkDay(today)
                  if (w) setWalkDiary(addWalkDiary({ day: today, en: w.en, ja: w.ja, place }))
                  setWallet((x) => ({ ...x, coins: x.coins + WALK_COINS }))
                  setWalkMsg(`🐾 ${place}をさんぽして、「${w ? `${w.en}（${w.ja}）` : 'きれいな石'}」を拾ってきた！ 🪙${WALK_COINS}`)
                  if (w) speak(w.en)
                }}
              >
                🐾 {monster.name ?? formOf(monster).name}とおさんぽに行く
              </button>
            ) : (
              walkMsg && (
                <p className="walk-msg" role="status">
                  {walkMsg}
                </p>
              )
            )}
            {walkDiary.length > 0 && (
              <details className="walk-diary chip-fold cf-0">
                <summary>📔 おさんぽ日記（{walkDiary.length}こ）</summary>
                <ul>
                  {walkDiary.map((e, i) => (
                    <li key={i}>
                      {e.day.slice(5).replace('-', '/')} {e.place}：<strong>{e.en}</strong>（{e.ja}）
                    </li>
                  ))}
                </ul>
              </details>
            )}
          {walkDiary.length >= 3 &&
            (walkQuizOpen ? (
              <WalkQuiz diary={walkDiary} onAnswer={onAnswer} onClose={() => setWalkQuizOpen(false)} />
            ) : (
              <button className="list-link pill-btn pill-green" onClick={() => setWalkQuizOpen(true)}>
                🐾 おさんぽクイズ（拾った単語から3問）
              </button>
            ))}
            <SugorokuBoard
              day={today}
              words={words}
              onGoal={() => {
                setWallet((w) => addTicket(w))
                pushToast([{ id: 'sugoroku', text: '🏁 英語すごろくでゴール！ 🎟ガチャチケットをもらった', counter: 'answers', target: 0 }])
              }}
            />
            {giftReady(giftDay, today) ? (
              <button
                className="challenge-btn gift-btn"
                onClick={() => {
                  const st = stickerOf(rand())
                  const r = addSticker(stickers, st)
                  setStickers(r.book)
                  setGiftDay('')
                  setGiftMsg(`🎁 ${monster.name ?? formOf(monster).name}が「${st}」のシールをくれた！（きのう目標を達成したおれい）`)
                  if (r.complete) {
                    setWallet((x) => addTicket(addTicket(x)))
                    pushToast([{ id: 'stickers', text: `🏷 シール帳がコンプリート！ 🎟ガチャチケットを${STICKER_TICKETS}まいもらった`, counter: 'answers', target: 0 }])
                  }
                }}
              >
                🎁 {monster.name ?? formOf(monster).name}からおみやげがとどいてる！
              </button>
            ) : (
              giftMsg && (
                <p className="walk-msg" role="status">
                  {giftMsg}
                </p>
              )
            )}
            <Training day={today} words={words} name={monster.name ?? formOf(monster).name} onChange={(t) => setPower(t.power)} />
            <DailyGrammarQ day={today} onCorrect={() => gainXp(DAILY_Q_XP, null)} />
            <HideSeek day={today} name={monster.name ?? formOf(monster).name} onFound={() => setWallet((w) => ({ ...w, coins: w.coins + HIDE_COINS }))} />
            <Janken day={today} name={monster.name ?? formOf(monster).name} onWin={() => setWallet((w) => ({ ...w, coins: w.coins + JANKEN_COINS }))} />
            <Roulette
              done={rouletteDay === today}
              onPrize={(p) => {
                setRouletteDay(today)
                if (p.kind === 'coins') setWallet((w) => ({ ...w, coins: w.coins + p.amount }))
                else gainXp(p.amount, null)
              }}
            />
          </details>
  )
  // 単語・文法・読解の3体（ホームとボス部屋のいちばん上）
  const buddyRow = (
      <BuddyRow
        dancing={trioDance}
        crowned={loadTodayWordsDay() === today && loadDailyGrammarDay() === today && loadDailyShortDay() === today}
        todayGain={{ word: todayXp.day === today ? todayXp.count : 0, ...loadBuddyToday(today) }}
        wordFigure={<MonsterFigure form={formOf(monster)} kind={monster.kind} wear={monster.wear} mood="happy" />}
        wordName={monster.name ?? formOf(monster).name}
        wordLevel={levelInfo(monster.xp).level}
        buddies={buddies}
        onGo={(w) => {
          setShowShop(false)
          setShowChallenge(false)
          if (w === 'word') setWordTab('mini')
          setMode(w === 'grammar' ? 'grammar' : w === 'reading' ? 'reading' : 'word')
          const who = w === 'word' ? (monster.name ?? formOf(monster).name) : buddyName(w, buddies[w])
          pushToast([{ id: `go-${w}`, text: `${who}「${GO_LINES[w].en}」（${GO_LINES[w].ja}）`, counter: 'answers', target: 0 }])
          toContent()
        }}
      />
  )
  // カードで学ぶ（ホームの「今日の単語」と、単語タブのカードで使う）
  const cardStudy = (
        cardFocus ? (
          <>
            <p className="weak-banner">
              {FOCUS_LABEL[cardFocus.kind]}{cardFocus.kind === 'pick' ? 'の' : ''}カードで復習中（のこり{' '}
              {focusList(cardFocus.kind).filter((w) => !cardFocus.done.includes(w.id)).length}語）
              <button onClick={() => setCardFocus(null)}>やめる</button>
            </p>
            {focusCard ? (
              <Card
                key={`focus-${focusCard.id}`}
                card={focusCard}
                onAnswer={answerFocus}
                autoSpeak={settings.autoSpeak}
                jaFirst={settings.cardJaFirst}
                emojiHint={settings.easy}
                hideExampleJa={settings.hideExampleJa}
                lookup={lookup}
                favorite={favorites.includes(focusCard.id)}
                note={notes[focusCard.id]}
                onNote={(t) => setNotes((n) => setNote(n, focusCard.id, t))}
                onToggleFavorite={() => setFavorites((f) => toggleFavorite(f, focusCard.id))}
              />
            ) : (
              <p className="done-msg">{FOCUS_LABEL[cardFocus.kind]}{cardFocus.kind === 'pick' ? 'の' : ''}カードを一周しました 💪</p>
            )}
          </>
        ) : showList ? (
          <WordList
            words={words}
            progress={progress}
            onClose={() => setShowList(false)}
            favorites={favorites}
            onToggleFavorite={(id) => setFavorites((f) => toggleFavorite(f, id))}
            notes={notes}
            onNote={(id, t) => setNotes((n) => setNote(n, id, t))}
            onPractice={(id) => {
              setPicked([id])
              startCards('pick')
            }}
          />
        ) : (
          <>
            {cardsDone + queue.length > 0 && (
              <div className="card-progress" aria-label={`今日のカード ${cardsDone} / ${cardsDone + queue.length}`}>
                <div className="goal-bar">
                  <div className="goal-fill" style={{ width: `${(cardsDone / (cardsDone + queue.length)) * 100}%` }} />
                </div>
                <span>
                  {cardsDone} / {cardsDone + queue.length}
                </span>
              </div>
            )}
            <CardCheer done={cardsDone} />
            <Card
              key={`${card?.id}-${shown}`}
              card={card}
              onAnswer={(r) => {
                setCardTouched(true)
                answer(r)
              }}
              autoSpeak={settings.autoSpeak}
              autoStart={cardTouched}
              jaFirst={settings.cardJaFirst}
              emojiHint={settings.easy}
              hideExampleJa={settings.hideExampleJa}
              lookup={lookup}
              favorite={!!card && favorites.includes(card.id)}
              note={card ? notes[card.id] : undefined}
              onNote={(t) => card && setNotes((n) => setNote(n, card.id, t))}
              onToggleFavorite={() => card && setFavorites((f) => toggleFavorite(f, card.id))}
              onMore={
                words.some((w) => !progress[w.id])
                  ? () => setDaily({ day: today, count: newToday, extra: extraToday + 5 })
                  : undefined
              }
              onQuiz={() => setWordTab('mini')}
              onSkip={ordered.length > 1 ? () => setSkipped((s) => [...s.filter((x) => x !== card.id), card.id]) : undefined}
            />
            {mode === 'word' && wordTab !== 'mini' && (
              <button className="list-link pill-btn pill-blue" onClick={() => setShowList(true)}>
                📚 単語一覧・さがす
              </button>
            )}
          </>
        )
  )

  // 単語のおさらい（テーマで練習・今週の単語・1週間前の単語）：単語ゲームのミニゲームの下に置く
  const wordReview = (
    <section className="card word-review" aria-label="単語のおさらい">
      <h2>🔁 おさらい</h2>
      <button
        className="list-link"
        onClick={() => {
          setShowList(true)
          setWordTab('card')
        }}
      >
        <span className="lg-icon" aria-hidden="true">📚</span>単語一覧・さがす
      </button>
      {thisWeekWords.length >= 4 && (
        <button className="list-link" onClick={() => startQuiz('thisweek')}>
          <span className="lg-icon" aria-hidden="true">🗓</span>今週の単語<span className="fold-meta">{thisWeekWords.length}語</span>
        </button>
      )}
      {weekAgo.length > 0 && (
        <button className="list-link" onClick={() => startQuiz('week')}>
          <span className="lg-icon" aria-hidden="true">📅</span>1週間前の単語<span className="fold-meta">{weekAgo.length}語</span>
        </button>
      )}
      <details className="theme-practice game-fold lg-2">
        <summary>
          <span className="lg-icon" aria-hidden="true">🗂</span>テーマで練習
        </summary>
        <div className="counts" role="group" aria-label="練習のしかた">
          <button aria-pressed={!themeQuiz} onClick={() => setThemeQuiz(false)}>
            めくって覚える
          </button>
          <button aria-pressed={themeQuiz} onClick={() => setThemeQuiz(true)}>
            問題をとく
          </button>
        </div>
        <div className="levels">
          {GROUPS.map((g) => (
            <button
              key={g.name}
              onClick={() => {
                setPicked(g.ids)
                if (themeQuiz) startQuiz('pick')
                else startCards('pick')
              }}
            >
              {g.name}
            </button>
          ))}
        </div>
      </details>
    </section>
  )

  // ステージ（ボス部屋ではボスだけ、単語ゲームでは単語ステージだけ）
  const stagesView = (part: 'boss' | 'stages') => (
    <Stages
      part={part}
      startDaily={dailyGo}
      onReadingAnswer={onAnswerTrack('reading')}
    readingBuddy={{ icon: buddyForm('reading', buddies.reading).icon, name: buddyName('reading', buddies.reading) }}
      power={power}
      hour={hour}
      partner={{ form: formOf(monster), kind: monster.kind, wear: monster.wear, species: monster.species, name: monster.name ?? formOf(monster).name, skillUses: monster.skillUses }}
      onSpend={spend}
      dailyDone={dailyBossDay === today}
      onDailyWin={(stars) => {
        if (dailyBossDay === today) return
        setDailyBossDay(today)
        setWallet((w) => ({ ...w, coins: w.coins + DAILY_BOSS_COINS * stars }))
      }}
      learnedPct={Object.fromEntries(levels.map((l) => [l, learnedPct(wordsOf([l]), progress)]))}
      onStudy={(ws) => {
        setPicked(ws.map((w) => w.id))
        startCards('pick')
      }}
      levels={levels}
      boss={boss}
      onUnivWin={(b, first) => {
        gainXp(first ? BOSS_XP : BOSS_REMATCH_XP, null)
        setWallet((w) => ({ ...w, coins: w.coins + (first ? b.coins : 5), ...(first && b.id === 'akamon' ? { tickets: Math.min((w.tickets ?? 0) + 1, 9) } : {}) }))
        pushToast([{ id: 'univ', text: `🏯 ${b.name}をたおした！ 🪙${first ? b.coins : 5}${first && b.id === 'akamon' ? '・🎟ガチャチケット' : ''}`, counter: 'answers', target: 0 }])
      }}
      rushDone={rushDay === today}
      bag={bag}
      onUseItem={(id) => setBag((b) => spendItem(b, id))}
      onBossDefeat={() => {
        count('boss')
        setKeys((k) => k + 1)
        const sh = shardAfter(shards, rand())
        if (sh.dropped) {
          setShards(sh.shards)
          if (sh.exchange) {
            const r = rareEgg(party, rand(), rand())
            if (r) setParty(r.party)
            else setWallet((w) => ({ ...w, coins: w.coins + RARE_FULL_COINS }))
            pushToast([{ id: 'shard-egg', text: r ? `💠 ボスのかけらが${SHARDS_FOR_EGG}つそろった！ ${r.kind.name}の${r.species.egg}と交換した` : `💠 ボスのかけらが${SHARDS_FOR_EGG}つそろった！ 仲間がいっぱいなので 🪙${RARE_FULL_COINS}`, counter: 'answers', target: 0 }])
          } else pushToast([{ id: 'shard', text: `💠 ボスのかけらを拾った（${sh.shards} / ${SHARDS_FOR_EGG}）`, counter: 'answers', target: 0 }])
        }
        const tp = addPiece(pieces)
        setPieces(tp.pieces)
        if (tp.ticket) {
          setWallet((w) => addTicket(w))
          pushToast([{ id: 'ticket-piece', text: `🧩 チケットのかけらが${PIECES_FOR_TICKET}こそろった！ 🎟ガチャチケットをもらった`, counter: 'answers', target: 0 }])
        } else pushToast([{ id: 'ticket-piece', text: `🧩 チケットのかけら（${tp.pieces} / ${PIECES_FOR_TICKET}）`, counter: 'answers', target: 0 }])
        const n = winStreak + 1
        setWinStreak(n)
        if (n % STREAK_EVERY === 0) {
          setWallet((w) => ({ ...w, coins: w.coins + STREAK_COINS }))
          feedTrack('reading', STREAK_DRAGON_XP) // 連勝のごほうびは読解の竜にも
          pushToast([{ id: 'streak', text: `🔥 ボス${n}連勝！ 🪙${STREAK_COINS}・読解の竜に +${STREAK_DRAGON_XP}XP`, counter: 'answers', target: 0 }])
        }
      }}
      winStreak={winStreak}
      onLose={() => setWinStreak(0)}
      keys={keys}
      onOpenGold={() => {
        if (keys < KEYS_FOR_GOLD) return
        setKeys((k) => k - KEYS_FOR_GOLD)
        setWallet((w) => ({ ...addTicket(w), coins: w.coins + GOLD_COINS }))
        pushToast([{ id: 'gold', text: `🎁 金の宝箱！ 🎟ガチャチケットと🪙${GOLD_COINS}をゲット`, counter: 'answers', target: 0 }])
      }}
      onDrop={(id) => setBag((b) => addItem(b, id))}
      onSkill={() => updateMonster((m) => ({ ...m, skillUses: (m.skillUses ?? 0) + 1 }))}
      onEndlessReward={(times) => {
        setWallet((w) => ({ ...w, coins: w.coins + ENDLESS_REWARD_COINS * times, tickets: Math.min(TICKET_MAX, (w.tickets ?? 0) + times) }))
        pushToast([{ id: 'endless', text: `🗼 エンドレスの塔 最高記録更新！ 🪙${ENDLESS_REWARD_COINS * times}・🎟${times}`, counter: 'answers', target: 0 }])
      }}
      weekend={isWeekend(today)}
      rushExDone={rushExDay === today}
      onRushClear={(ex) => {
        if (ex) {
          if (rushExDay === today) return
          setRushExDay(today)
          setWallet((w) => ({ ...w, coins: w.coins + RUSH_EX_COINS, tickets: Math.min(TICKET_MAX, (w.tickets ?? 0) + 2) }))
          pushToast([{ id: 'rush-ex', text: `🌟 ボスラッシュEX完全クリア！ 🪙${RUSH_EX_COINS}・🎟2`, counter: 'answers', target: 0 }])
          return
        }
        if (rushDay === today) return
        setRushDay(today)
        setWallet((w) => ({ ...addTicket(w), coins: w.coins + RUSH_COINS }))
        pushToast([{ id: 'rush', text: `🔥 ボスラッシュ完全クリア！ 🪙${RUSH_COINS}・🎟ガチャチケット`, counter: 'answers', target: 0 }])
      }}
      onRankBonus={(c) => setWallet((w) => ({ ...w, coins: w.coins + c }))}
      onQuestWin={() => {
        setWallet((w) => ({ ...addTicket(w), coins: w.coins + QUEST_COINS }))
        pushToast([{ id: 'quest', text: `👑 特別クエストの強敵をたおした！ 🪙${QUEST_COINS}・🎟ガチャチケット`, counter: 'answers', target: 0 }])
      }}
      onWeekendWin={() => {
        setWallet((w) => addTicket(w))
        pushToast([{ id: 'weekend-boss', text: '🌙 週末ボスをたおした！ 🎟ガチャチケットをもらった', counter: 'answers', target: 0 }])
      }}
      onRareWin={() => {
        const r = rareEgg(party, rand(), rand())
        if (r) setParty(r.party)
        else setWallet((w) => ({ ...w, coins: w.coins + RARE_FULL_COINS }))
        pushToast([{ id: 'rare', text: r ? `✨ レアボスをたおした！ ${r.kind.name}の${r.species.egg}が仲間になった（ショップの「なかま」で見られるよ）` : `✨ レアボスをたおした！ 仲間がいっぱいなので 🪙${RARE_FULL_COINS}`, counter: 'answers', target: 0 }])
      }}
      onBossWin={(level) => {
        const bonus = bondWinCoins(totals.studyDays ?? 0)
        if (bonus > 0) {
          setWallet((w) => ({ ...w, coins: w.coins + bonus }))
          pushToast([{ id: 'bond-win', text: `${bondHearts(bondLevel(totals.studyDays ?? 0))} なかよしボーナス！ 🪙${bonus}`, counter: 'answers', target: 0 }])
        }
        setBoss((b) => ({ ...b, [level]: b[level] ?? today }))
        feedTrack('reading', boss[level] ? BOSS_REMATCH_XP : BOSS_XP) // 読解ボスのごほうびは読解のなかま（竜）へ
        // 全部のボスをたおしたら1回だけ「ボスハンター」
        if (!loadBossHunter() && Object.keys(BOSSES).every((k) => k === level || boss[k as Level])) {
          saveBossHunter()
          setWallet((w) => Array.from({ length: HUNTER_TICKETS }).reduce<typeof w>((x) => addTicket(x), w))
          pushToast([{ id: 'boss-hunter', text: `🏹 全部のボスをたおした！ 称号「ボスハンター」と🎟${HUNTER_TICKETS}`, counter: 'answers', target: 0 }])
        }
        // タマゴのかけら：5つで属性のタマゴが無料でかえる（全員なかまならコイン）
        const pieces = loadEggPieces() + 1
        if (pieces < PIECES_FOR_EGG) {
          saveEggPieces(pieces)
          pushToast([{ id: 'egg-piece', text: `🥚 タマゴのかけらを拾った！（${pieces} / ${PIECES_FOR_EGG}）`, counter: 'answers', target: 0 }])
        } else {
          saveEggPieces(0)
          const r = hatchAttrEgg(buddies, buddyBox, Math.random())
          if (r) {
            setBuddyBox(r.box)
            pushToast([{ id: 'egg-piece', text: `🥚 かけらが5つそろってタマゴがかえった！ 属性「${ATTR_LABEL[r.track]}」の「${r.sp.label}」が仲間に！`, counter: 'answers', target: 0 }])
          } else {
            setWallet((w) => ({ ...w, coins: w.coins + PIECES_FULL_COINS }))
            pushToast([{ id: 'egg-piece', text: `🥚 かけらが5つそろった！ もう全員なかまなので 🪙${PIECES_FULL_COINS}`, counter: 'answers', target: 0 }])
          }
        }
      }}
      record={stages}
      onAnswer={onAnswer}
      onClear={(id, stars) => {
        if (stars === 3 && (stages[id] ?? 0) < 3) setWallet((w) => ({ ...w, coins: w.coins + STAR3_COINS }))
        setStages((r) => recordStars(r, id, stars))
        if (stars > 0) count('stageClear')
      }}
      onTreasure={(t) => {
        if (t.kind === 'coins') setWallet((w) => ({ ...w, coins: w.coins + t.amount }))
        else if (t.kind === 'ticket') setWallet((w) => addTicket(w))
        else gainXp(t.amount, null)
      }}
    />
  )

  return (
    <PlayContext.Provider value={playRegister}>
    <BossTeamContext.Provider value={bossTeam}>
    <main className="app">
      <header>
        <div className="top">
          <h1>イングリッシュモンスター</h1>
          <p className={`streak${streakDays > 0 ? ' on' : ''}`} aria-label={`連続学習 ${streakDays} 日`}>
            🔥 {streakDays}日
          </p>
        </div>
        {home && (
          <>
          {(xpRate > 1 || seasonEvent) && (
            <p className="buddy-chips event-chips">
              {xpRate > 1 && <span className="weekend">🎉 週末はXP2倍！</span>}
              {seasonEvent && (
                <span className="weekend season-event">
                  {seasonEvent.icon} {seasonEvent.text}
                </span>
              )}
            </p>
          )}
          {hour >= 18 && studiedToday === 0 && streakDays > 0 && (
            <p className="weak-banner streak-warn" role="status">
              🔥 今日はまだ学習していないよ。1問でも答えて、連続{streakDays}日をつなげよう！
            </p>
          )}
          <Monster
            deco={seasonEvent?.icon}
            sleepy={hour >= 22 || hour < 5}
            night={isNight(hour)}
            season={seasonFxOf(today)}
            learned={learnedSample}
            shelf={SOUVENIRS.filter((sv) => souvenirs.includes(sv.id)).map((sv) => sv.icon)}
            monster={monster}
            onRename={(name) => updateMonster((m) => rename(m, name))}
            coins={wallet.coins}
            onShop={() => {
              setShopTab(undefined)
              setShowShop(true)
              toContent()
            }}
            room={wallet.room}
            title={titleFor(totals.studyDays ?? 0)}
            cheer={cheer}
            feeling={feelingFor(studiedToday, hour)}
            gain={gain}
            mood={happy ? 'happy' : isLonely(monster, today) ? 'lonely' : 'normal'}
            leveledUp={leveledUp}
            evolved={evolved}
            friends={party.members.map((m, i) => ({ m, i })).filter((x) => x.i !== party.active)}
            onSwitch={(i) => setParty((p) => ({ ...p, active: i }))}
            onPet={() => cheerUp(1)}
            trioDone={loadTrioDay() === today}
            trioStreak={trioStreakNow(today)}
            epithet={epithetOf(totalWins(loadBook()))}
            onPetBonus={() => setWallet((w) => ({ ...w, coins: w.coins + PET_BONUS }))}
            onPetStampTicket={() => {
              setWallet((w) => addTicket(w))
              pushToast([{ id: 'pet-stamps', text: '🐾 なでなでスタンプが10こたまった！ 🎟ガチャチケットをもらった', counter: 'answers', target: 0 }])
            }}
          />
          {buddyRow}
          <button
            className="list-link buddy-swap-link"
            onClick={() => {
              setStatsTab('buddy')
              requestAnimationFrame(() => document.querySelector('.buddy-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
            }}
          >
            🔁 なかまを入れかえる
          </button>
          <button
            className="home-gacha-btn"
            onClick={() => {
              setShopTab(undefined)
              setShowShop(true)
              toContent()
            }}
          >
            <span className="home-gacha-main">
              🎰 ガチャをひく！
              {wallet.tickets ? <small>🎟×{wallet.tickets}</small> : null}
              {freeGachaDay !== today && <small className="home-gacha-free">🎁 今日1回無料</small>}
            </span>
            <span className="home-gacha-pickup">なにが出るかはお楽しみ！</span>
          </button>
          {dailyBossDay !== today && (
            <button
              className="boss-go-btn"
              onClick={() => {
                setDailyGo(true)
                setMode('boss')
                toContent()
              }}
            >
              <span className="boss-go-fig" aria-hidden="true">
                👹
              </span>
              <span className="boss-go-text">
                <strong>⚔ 今日のボスに挑む</strong>
                <small title="単語・文法・読解の3人で戦う">TEAM BATTLE 🔤📐📖</small>
              </span>
              <span className="home-reward-pill">🪙{DAILY_BOSS_COINS}</span>
            </button>
          )}
          {birthdayAge(bday, today) > 0 && (
            <button
              className="challenge-btn birthday-btn"
              onClick={() => {
                const age = birthdayAge(bday, today)
                setBday({ ...bday, lastYear: Number(today.slice(0, 4)) })
                setWallet((w) => addTicket(w))
                pushToast([{ id: 'birthday', text: `🎂 ${monster.name ?? formOf(monster).name}、${age}さいのおたんじょう日おめでとう！ 🎟ガチャチケットを${BIRTHDAY_TICKETS}まいもらった`, counter: 'answers', target: 0 }])
              }}
            >
              🎂 今日は{monster.name ?? formOf(monster).name}のおたんじょう日！（{birthdayAge(bday, today)}さい）お祝いする
            </button>
          )}
          {settings.testDate && daysUntil(today, settings.testDate) >= 0 && (
            <p className="exam">
              📝 テストまであと <strong>{daysUntil(today, settings.testDate)}日</strong>・1日{' '}
              <strong>{perDay(words.length - learned, daysUntil(today, settings.testDate))}語</strong> 覚えれば間にあうよ
            </p>
          )}
          <div className="goal" aria-label={`今日の目標 ${Math.min(studiedToday, settings.dailyGoal)} / ${settings.dailyGoal} 問`}>
            <span>{studiedToday >= settings.dailyGoal ? '🎯 目標達成！' : `🎯 今日の目標 ${studiedToday} / ${settings.dailyGoal} 問`}</span>
            <div className="goal-bar">
              <div className="goal-fill" style={{ width: `${Math.min(studiedToday / settings.dailyGoal, 1) * 100}%` }} />
            </div>
          </div>
          </>
        )}
      </header>
      {todayFocus && (
        <TodayFocusBar
          current={todayFocus}
          done={todayDone}
          onBack={() => {
            setTodayQuiz(false)
            setGrammarGo(false)
            setShortGo(false)
            window.scrollTo?.({ top: 0 })
          }}
          onGo={goToday}
        />
      )}
      {playOn && (
        <div className="play-bar">
          <button
            className="play-back"
            onClick={() => {
              exitPlay()
              window.scrollTo?.({ top: 0 })
            }}
          >
            <span className="lg-icon" aria-hidden="true">{mode === 'word' ? '🎮' : mode === 'grammar' ? '📐' : mode === 'reading' ? '📖' : '👹'}</span>
            <span className="play-back-name">← ほかの問題をえらぶ</span>
          </button>
          {/* 問題の画面の Lv UP は、上のバーの右はしに小さく（問題をかくさない） */}
          {leveledUp && (
            <span className="play-lvup" role="status" title={`${monster.name ?? formOf(monster).name} が Lv.${levelInfo(monster.xp).level} になった！`}>
              ⬆ Lv.{levelInfo(monster.xp).level}
              {levelAttack(levelInfo(monster.xp).level) > levelAttack(levelInfo(monster.xp).level - 1) && ` ⚔+${levelAttack(levelInfo(monster.xp).level)}`}
            </span>
          )}
        </div>
      )}
      {mode === 'word' && !showShop && !showChallenge && !todayFocus && !playOn && (
        <div className="boss-ally ally-word" aria-label="単語の相棒（正解で育つ）">
          <span className="ally-fig" aria-hidden="true">
            <MonsterFigure form={formOf(monster)} kind={monster.kind} wear={monster.wear} mood="happy" />
          </span>
          <div className="boss-ally-text">
            <strong>
              {monster.name ?? formOf(monster).name} Lv.{levelInfo(monster.xp).level}
            </strong>
            <span className="buddy-bar ally-bar" role="progressbar" aria-label="単語の相棒の経験値" aria-valuemin={0} aria-valuemax={levelInfo(monster.xp).need} aria-valuenow={levelInfo(monster.xp).into}>
              <span style={{ width: `${(levelInfo(monster.xp).into / levelInfo(monster.xp).need) * 100}%` }} />
            </span>
            <small>
              XP {levelInfo(monster.xp).into}/{levelInfo(monster.xp).need}
            </small>
          </div>
        </div>
      )}
      {mode === 'word' && !showShop && !showChallenge && !todayQuiz && !playOn && (
        <button
          className="long-recommend daily-long today-read-btn"
          aria-label={`今日の課題（単語）：${todayWords(today).map((w) => w.en).join('・')}`}
          onClick={() => {
            setWordTab('mini')
            setTodayQuiz(true)
          }}
        >
          🔤 今日の課題{loadTodayWordsDay() === today ? ' ✅' : ''}
          <strong>{todayWords(today).map((w) => w.en).join('・')}</strong>
        </button>
      )}
      {mode === 'word' && !showShop && !showChallenge && !todayFocus && !playOn && (
        <div className="sub-tabs word-sub-tabs" role="tablist" aria-label="単語の種類">
          {WORD_TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={wordTab === t.id}
              onClick={() => {
                setWordTab(t.id)
                setTodayQuiz(false)
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
      {leveledUp && !home && !playOn && (
        <p className="lvup-banner" role="status">
          ⬆ Lv UP! {monster.name ?? formOf(monster).name} が Lv.{levelInfo(monster.xp).level} になった！
          {levelAttack(levelInfo(monster.xp).level) > levelAttack(levelInfo(monster.xp).level - 1) && ` ⚔攻撃力+${levelAttack(levelInfo(monster.xp).level)}`}
        </p>
      )}

      {reviewWeek && lastWeek.count > 0 && onboarded && (
        <p className="weak-banner week-review" role="status">
          📊 先週のふりかえり：{lastWeek.count}問・{lastWeek.days}日 学習しました{lastWeek.days >= 5 ? '。すばらしい！' : '。今週もがんばろう！'}
          <button onClick={() => setReviewWeek(false)} aria-label="ふりかえりをとじる">
            ✕
          </button>
        </p>
      )}
      {greet && dueReviews > 0 && onboarded && (
        <p className="weak-banner today-banner" role="status">
          📚 今日の復習が {dueReviews}語 あります
          <span>
            <button
              onClick={() => {
                setGreet(false)
                setShowShop(false)
                setMode('word')
                setWordTab('card')
              }}
            >
              はじめる
            </button>
            <button onClick={() => setGreet(false)} aria-label="とじる">
              ✕
            </button>
          </span>
        </p>
      )}
      {showChallenge ? (
        <Challenge
          monster={monster}
          done={challengeDay === today}
          onAnswer={onAnswer}
          onClear={() => {
            const d = difficultyOf(formOf(monster).stage)
            const streak = nextChallengeStreak(challengeDay, loadChallengeStreak(), today)
            saveChallengeStreak(streak)
            if (streak % STREAK_TICKET_DAYS === 0) {
              setWallet((w) => addTicket(w))
              pushToast([{ id: 'ticket', text: `今日のチャレンジ${streak}日連続クリア！ 🎟 ガチャチケットを1枚もらった`, counter: 'answers', target: 0 }])
            }
            setChallengeDay(today)
            setWallet((w) => ({ ...w, coins: w.coins + d.coins }))
            gainXp(d.xp, null)
          }}
          onClose={() => setShowChallenge(false)}
        />
      ) : showShop ? (
        <Shop
          attrEgg={{
            price: ATTR_EGG_PRICE,
            left: lockedSpecies(buddies, buddyBox).length,
            pieces: loadEggPieces(),
            onBuy: () => {
              if (wallet.coins < ATTR_EGG_PRICE) return null
              const r = hatchAttrEgg(buddies, buddyBox, Math.random())
              if (!r) return null
              setWallet((w) => ({ ...w, coins: w.coins - ATTR_EGG_PRICE }))
              setBuddyBox(r.box)
              return `🎉 タマゴがかえって、属性「${ATTR_LABEL[r.track]}」の「${r.sp.label}」が仲間になった！（なかまの入れかえでえらべるよ）`
            },
          }}
          initialTab={shopTab}
          eventId={seasonEvent?.id}
          wallet={wallet}
          monster={monster}
          onBuy={(id) => {
            const r = buyAndMove(wallet, id)
            if (!r) return
            setWallet(r.wallet)
            if (r.moved) setCheer(roomLine(r.moved.id))
            if (r.moved) pushToast([{ id: 'move-room', text: `🏠 お引っこし完了！「${r.moved.name}」へ。${MOVE_LINE.en}（${MOVE_LINE.ja}）`, counter: 'answers', target: 0 }])
          }}
          onWear={(id) => updateMonster((m) => ({ ...m, wear: id ? toggleWear(m.wear, id) : undefined }))}
          onSetWear={(wear) => updateMonster((m) => ({ ...m, wear }))}
          onClose={() => setShowShop(false)}
          snacksLeft={snacksLeft(snacks, today)}
          onRoom={(id) => {
            setWallet((w) => ({ ...w, room: id }))
            setCheer(roomLine(id))
          }}
          onBuyFreeze={() => {
            const next = buyFreeze(wallet)
            if (next) setWallet(next)
          }}
          members={party.members.length}
          dragonUp={isWeekend(today)}
          pickup={pickupOf(today)}
          stepLeft={stepLeft(gachaStep, today)}
          gachaPrice={gachaPrice(hour) - omikujiDiscount(today)}
          favSnack={favSnackOf(today).id}
          bag={bag}
          onBuyBattle={(id) => {
            const it = BATTLE_ITEMS.find((x) => x.id === id)!
            if (wallet.coins < it.price || bag[id] >= BAG_MAX) return
            setWallet((w) => ({ ...w, coins: w.coins - it.price }))
            setBag((b) => addItem(b, id))
          }}
          onRaiseNew={() => setParty((p) => ({ ...p, active: p.members.length - 1 }))}
          onNameNew={(name) => setParty((p) => ({ ...p, members: p.members.map((m, j) => (j === p.members.length - 1 ? rename(m, name) : m)) }))}
          onGacha={(ticket) => drawMany(ticket, 1)[0] ?? null}
          freeGacha={freeGachaDay !== today}
          tradeCount={tradeableMembers(party).length}
          tradeDisabled={(wallet.tickets ?? 0) >= TICKET_MAX}
          onTrade={tradeTen}
          onFreeGacha={() => {
            // 無料の1回は、チケット1枚をその場でつけて引くのと同じ
            const k = drawMany(true, 1, { ...wallet, tickets: (wallet.tickets ?? 0) + 1 })[0] ?? null // 上限をこえても本物のチケットは減らない
            if (k) setFreeGachaDay(today)
            return k
          }}
          onGachaMulti={(n) => drawMany(false, n)}
          boostColor={kindOf(dailyColor(today)).name}
          luckyBag={luckyMonth !== today.slice(0, 7) && wallet.coins >= LUCKY_BAG_PRICE}
          onLuckyBag={() => {
            if (luckyMonth === today.slice(0, 7) || wallet.coins < LUCKY_BAG_PRICE || party.members.length + 3 > PARTY_MAX) return []
            const out = drawMany(true, 3, { ...wallet, coins: wallet.coins - LUCKY_BAG_PRICE, tickets: (wallet.tickets ?? 0) + 3 })
            if (out.length === 0) return []
            setLuckyMonth(today.slice(0, 7))
            setBag((b) => addItem(addItem(addItem(b, 'bomb'), 'charm'), 'clock'))
            pushToast([{ id: 'lucky-bag', text: '🎍 福袋をあけた！ バトルアイテム（💣🧿⏳）ももらった', counter: 'answers', target: 0 }])
            return out
          }}
          gachaPoints={gachaPoints}
          stickers={stickers.got}
          onExchange={() => {
            if (gachaPoints < POINTS_FOR_SR) return null
            const r = srEgg(party, rand(), rand())
            if (!r) return null
            setParty(r.party)
            setGachaPoints((pt) => pt - POINTS_FOR_SR)
            const newSpecies = r.species.id !== 'mochi' && !party.members.some((m) => m.species === r.species.id)
            const newKind = !party.members.some((m) => m.kind === r.kind.id)
            return { kind: r.kind, species: r.species, newKind, newSpecies }
          }}
          onEat={(id) => {
            const r = eat(wallet, snacks, id, today)
            if (!r) return
            setWallet(r.wallet)
            setSnacks(r.log)
            cheerUp(3)
            gainXp(r.xp, null)
            const l = snackLine(id)
            pushToast([{ id: 'snack', text: `${l.en}（${l.ja}）`, counter: 'answers', target: 0 }])
          }}
        />
      ) : mode === 'reading' || mode === 'boss' ? (
        <>
          {mode === 'boss' && !playOn && <p className="boss-team-title">⚔️ ボスと戦うチーム（単語・文法・読解）</p>}
          {mode === 'boss' && !playOn && buddyRow}
          {mode === 'boss' && !playOn && <BossAlly buddy={buddies.reading} wins={Object.keys(boss).filter((k) => k in BOSSES).length} total={Object.keys(BOSSES).length} hunter={loadBossHunter()} hideAlly />}
          {mode === 'reading' && !shortGo && !playOn && <TrackAlly track="reading" buddy={buddies.reading} label="読解のなかま（正解で育つ）" />}
          {mode === 'reading' && !shortGo && !playOn && (
            <button className="long-recommend daily-long today-read-btn" aria-label={`今日の読解：${todayReadingTitle(today)}`} onClick={() => setShortGo(true)}>
              📖 今日の課題{loadDailyShortDay() === today ? ' ✅' : ''}
              <strong>{todayReadingTitle(today)}</strong>
            </button>
          )}
          {mode === 'reading' && !shortGo && !playOn && (
          <div className="read-levels" role="tablist" aria-label="読解のむずかしさ">
            {READ_LEVELS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={readLevel === t.id}
                onClick={() => {
                  setReadLevel(t.id)
                  saveReadLevel(t.id)
                  setShortGo(false)
                }}
              >
                {readyFor(t.id, loadLongRecord(), loadShortDone()) && <span className="read-level-ready">⭐ちょうせん</span>}
                <strong>{t.label}</strong>
                <small className="read-level-sub">{splitSoft(t.sub).flatMap((x, i) => (i > 0 ? [<wbr key={i} />, x] : [x]))}</small>
                {solvedOf(t.id, loadLongRecord(), loadShortDone()) && (
                  <small className="read-level-done">
                    {solvedOf(t.id, loadLongRecord(), loadShortDone())!.done}/{solvedOf(t.id, loadLongRecord(), loadShortDone())!.total}本
                  </small>
                )}
              </button>
            ))}
          </div>
          )}
          {mode === 'reading' && shortGo && todayReading(today).kind === 'long' ? (
            <LongReading
              key="today"
              passages={[todayReading(today).p as LongPassage]}
              start={todayReading(today).p as LongPassage}
              onClose={() => setShortGo(false)}
              onDone={() => {
                if (loadDailyShortDay() !== today) {
                  saveDailyShortDay(today)
                  feedTrack('reading', TASK_XP) // 今日の課題クリアのごほうびは読解のなかまへ
                }
              }}
              onAnswer={onAnswerTrack('reading')}
              onFavorite={(ids) => setFavorites((f) => addFavorites(f, ids))}
              onCoins={(n) => setWallet((w) => ({ ...w, coins: w.coins + n }))}
            />
          ) : mode === 'reading' && readLevel !== 'easy' && !shortGo ? (
            <LongReading key={readLevel} passages={passagesFor(readLevel)} title={`📖 ${READ_LEVELS.find((l) => l.id === readLevel)!.label}の読解（${READ_LEVELS.find((l) => l.id === readLevel)!.sub}）`} onAnswer={onAnswerTrack('reading')} onFavorite={(ids) => setFavorites((f) => addFavorites(f, ids))} onCoins={(n) => setWallet((w) => ({ ...w, coins: w.coins + n }))} />
          ) : mode === 'reading' ? (
            <Reading
              key={shortGo ? 'today' : 'list'}
              start={shortGo ? dailyShort(today) : undefined}
              onClose={shortGo ? () => setShortGo(false) : undefined}
              onDone={() => {
                if (shortGo && loadDailyShortDay() !== today) {
                  saveDailyShortDay(today)
                  feedTrack('reading', TASK_XP) // 今日の課題クリアのごほうびは読解のなかまへ
                }
              }}
              onAnswer={onAnswerTrack('reading')}
            />
          ) : (
          stagesView('boss')
          )}
          {mode === 'reading' && todayNextBtn}
        </>
      ) : mode === 'settings' ? (
        <>
          <SettingsPanel
            settings={settings}
            onChange={setSettings}
            onGrade={pickGrade}
            books={
              <div className="levels" role="group" aria-label="単語帳">
                {LEVELS.map((l) => (
                  <button key={l} aria-pressed={levels.includes(l)} onClick={() => setLevels(toggleLevel(levels, l))}>
                    {l}
                    <small className="level-pct" aria-hidden="true"> {learnedPct(wordsOf([l]), progress)}%</small>
                  </button>
                ))}
                {myWords.length > 0 && (
                  <button aria-pressed={useMy} onClick={() => setUseMy(!useMy)}>
                    マイ単語帳
                  </button>
                )}
              </div>
            }
          />
          {playBox}
        </>
      ) : mode === 'home' ? (
        <>
          <TodayTasks
            today={today}
            onPickGrade={() => {
              setMode('settings')
              window.scrollTo?.({ top: 0 })
            }}
            onTrio={(xp, ticket, week) => {
              if (week) {
                setWallet((w) => addTicket(addTicket(w)))
                pushToast([{ id: 'trio-week', text: '🎉 トリオボーナス7日連続！ 特別に🎟2枚', counter: 'answers', target: 0 }])
              }
              setTrioDance(true)
              window.setTimeout(() => setTrioDance(false), 3000)
              gainXp(xp, null)
              if (ticket) setWallet((w) => addTicket(w))
              feedTrack('grammar', xp)
              feedTrack('reading', xp)
            }}
            onGo={(w) => {
              if (w === 'reading') {
                setShortGo(true)
              }
              if (w === 'grammar') setGrammarGo(true)
              if (w === 'word') {
                setWordTab('mini')
                setTodayQuiz(true)
              }
              setMode(w)
              toContent()
            }}
          />
          <p className="today-section-title home-records-title">📊 記録</p>
          <div className="sub-tabs stats-tabs" role="tablist" aria-label="記録の種類">
            {STATS_TABS.map((t) => (
              <button key={t.id} role="tab" aria-selected={statsTab === t.id} onClick={() => setStatsTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          {statsTab === 'log' && (
            <>
              {studiedToday > 0 && (
              <p className="today-summary" aria-label="今日のまとめ">
                <span>☀️ 今日</span>
                <span>
                  📝 <strong>{studiedToday}問</strong>
                </span>
                <span>
                  ⭐ <strong>+{todayXp.day === today ? todayXp.count : 0}XP</strong>
                </span>
                <span>
                  🆕 <strong>{newToday}語</strong>
                </span>
              </p>
              )}
              {weekCount(history, today) > 0 && <button
                className="list-link share-go"
                onClick={() =>
                  shareText(
                    weekReportText({
                      answers: weekCount(history, today),
                      days: lastDays(history, today, 7).filter((d) => d.count > 0 && d.day >= weekStart(today)).length,
                      learned,
                      total: words.length,
                      streak: streakDays,
                    }),
                  )
                }
              >
                📤 今週のレポートをシェア
              </button>}
              <LearnedChart values={lastLearned(learnedLog, today)} />
              {(weekCount(history, today) > 0 || lastWeekSummary(history, today).count > 0) && <p className="stats-note week-compare">📈 {weekCompare(weekCount(history, today), lastWeekSummary(history, today).count)}</p>}
              {firstToday.length > 0 && (
                <details className="first-today chip-fold cf-0">
                  <summary>🌱 今日はじめて学んだ単語（{firstToday.length}語）</summary>
                  <MissedList words={firstToday} label="今日はじめて学んだ単語" />
                </details>
              )}
              {needBackup(loadLastBackup(), today, totals.answers) && (
                <p className="weak-banner backup-remind" role="status">
                  💾 しばらくデータを保存していません
                  <button onClick={() => setStatsTab('data')}>保存する</button>
                </p>
              )}
            <WordOfDay word={lucky} claimed={luckyDay === today} />
            <Stats
              streakDays={streakDays}
              studiedToday={studiedToday}
              learned={learned}
              total={words.length}
              week={lastDays(history, today)}
              goal={settings.dailyGoal}
              weak={weak}
              mistakes={mistakes}
              onReviewWeak={() => startQuiz('weak')}
              favorites={favWords}
              calendar={<Calendar history={history} today={today} goal={settings.dailyGoal} />}
              minutes={[minutesToday(timeLog, today), minutesWeek(timeLog, today)]}
              bestCombo={totals.bestCombo ?? 0}
              accuracy={{
                today: accuracy.day === today ? rate(accuracy.today) : null,
                card: rate(accuracy.by.card),
                quiz: rate(accuracy.by.quiz),
                ear: rate(accuracy.by.ear),
              }}
              byLevel={LEVELS.map((l) => {
                const ws = wordsOf([l])
                return { level: l, learned: ws.filter((w) => (progress[w.id]?.box ?? 0) >= 3).length, total: ws.length }
              })}
              onReviewFav={() => startQuiz('fav')}
              onReviewFavCards={() => startCards('fav')}
              schedule={upcoming(progress, today, 7, new Set(words.map((w) => w.id)))}
              onReviewWeakCards={() => startCards('weak')}
            />
          </>
          )}
          {statsTab === 'buddy' && (
            <section className="card stats-view">
              <BuddyDetail
                buddies={buddies}
                box={buddyBox}
                onRename={(t, n) => setBuddies((b) => renameBuddy(b, t, n))}
                onSwitch={(t, id) => {
                  const r = switchBuddy(buddies, buddyBox, t, id)
                  setBuddies(r.buddies)
                  setBuddyBox(r.box)
                }}
              />
              <BuddyZukan buddies={buddies} box={buddyBox} onComp={() => setWallet((w) => addTicket(w))} />
              <EvolutionPreview monster={monster} />
              <PartnerStatus monster={monster} />
              <PartyView party={party} onSelect={(i) => setParty({ ...party, active: i })} onFav={(i) => setParty((p) => toggleFav(p, i))}
                warmLeft={warmLeft(warm, today)}
                onWarm={(i) => {
                  if (warmLeft(warm, today) <= 0) return
                  setWarm(nextWarm(warm, today))
                  setParty((p) => ({ ...p, members: p.members.map((m, j) => (j === i ? feed(m, WARM_XP, null, today) : m)) }))
                }}
                ticketsFull={(wallet.tickets ?? 0) >= TICKET_MAX}
                onTradeMembers={tradeTen}
                onRelease={(i) => {
                  const next = releaseMember(party, i)
                  if (!next) return
                  setWallet((w) => ({ ...w, coins: w.coins + releaseCoins(levelInfo(party.members[i].xp).level) }))
                  setParty(next)
                }} onRename={(i, name) => setParty((p) => ({ ...p, members: p.members.map((m, j) => (j === i ? rename(m, name) : m)) }))} />
              <Profile monster={monster} studyDays={totals.studyDays ?? 0} />
              <Album earned={earned} born={monster.born} />
              <ShareButton
                stats={{
                  name: monster.name ?? formOf(monster).name,
                  level: levelInfo(monster.xp).level,
                  streak: streakDays,
                  learned: learnedAll,
                  badges: Object.keys(earned).length,
                }}
              />
            </section>
          )}
          {statsTab === 'collection' && (
            <section className="card stats-view">
              <Records />
              <BadgeList earned={earned} />
              <Zukan monsters={party.members} />
              <BossDex record={boss} />
              <SouvenirList got={souvenirs} />
            </section>
          )}
          {statsTab === 'data' && (
            <section className="card stats-view">
              <MyWords list={myWords} onChange={setMyWords} />
              <Backup />
            </section>
          )}
        </>
      ) : mode === 'word' && wordTab === 'stage' ? (
        stagesView('stages')
      ) : mode === 'word' && wordTab === 'time' ? (
        <>
          <TimeAttack key={levelKey} words={words} onAnswer={onAnswer} onFinish={(n) => {
              setBestTime((b) => Math.max(b, n))
              count('timeAttack')
            }} />
        </>
      ) : mode === 'grammar' && grammarDrill ? (
        <>
          <button className="stage-back" onClick={() => setGrammarDrill(null)}>
            ← 文法チャレンジ
          </button>
          <Quiz key={`drill:${grammarDrill}`} direction={grammarDrill} lockDirection words={words} onAnswer={onAnswerTrack('grammar')} onXp={(n) => feedTrack('grammar', n)} onCoins={(n) => setWallet((w) => ({ ...w, coins: w.coins + n }))} />
        </>
      ) : (mode === 'word' && wordTab === 'mini') || mode === 'grammar' ? (
        <>
          {mode === 'grammar' && !grammarGo && !playOn && <TrackAlly track="grammar" buddy={buddies.grammar} label="文法のなかま（正解で育つ）" />}
          {mode === 'grammar' && !grammarGo && !playOn && (
            <button className="long-recommend daily-long today-read-btn" aria-label={`今日の課題（文法）：${dailyGrammar(today).title}`} onClick={() => setGrammarGo(true)}>
              📐 今日の課題{loadDailyGrammarDay() === today ? ' ✅' : ''}
              <strong>{dailyGrammar(today).title.split('（')[0]}</strong>
            </button>
          )}
          {mode === 'grammar' && grammarGo && (
            <TodayGrammar
              today={today}
              onAnswer={onAnswerTrack('grammar')}
              onClear={(c) => {
                setWallet((w) => ({ ...w, coins: w.coins + c }))
                feedTrack('grammar', TASK_XP) // 今日の課題クリアのごほうびは文法のなかまへ
              }}
            />
          )}
          {mode === 'grammar' && todayNextBtn}
          {quizFocus && !todayFocus && focusList(quizFocus).length > 0 && (
            <p className="weak-banner">
              {FOCUS_LABEL[quizFocus]}だけ復習中（{focusList(quizFocus).length}語）
              <button onClick={() => setQuizFocus(null)}>やめる</button>
            </p>
          )}
          {!(mode === 'grammar' && grammarGo) && (
          <Quiz
            key={`${mode}:${levelKey}${quizFocus ? `:${quizFocus}` : ''}${mode === 'word' && todayQuiz ? ':today' : ''}`}
            direction={mode === 'grammar' ? 'grammar' : todayQuiz ? 'en-ja' : undefined}
            count={mode === 'word' && todayQuiz ? todayWords(today).length : undefined}
            onCards={mode === 'word' ? () => setWordTab('card') : undefined}
            onDrill={mode === 'grammar' ? setGrammarDrill : undefined}
            onGrammarAnswer={mode === 'word' ? onAnswerTrack('grammar') : undefined}
            lockDirection={mode === 'grammar' || (mode === 'word' && todayQuiz)}
            words={quizFocus === 'fav' ? [...words, ...favWords.filter((f) => !words.includes(f))] : words}
            targets={mode === 'word' && todayQuiz ? todayWords(today) : quizFocus && focusList(quizFocus).length > 0 ? focusList(quizFocus) : undefined}
            onAnswer={mode === 'grammar' ? onAnswerTrack('grammar') : onAnswer}
            onFinish={(score, total) => {
              if (mode === 'word' && todayQuiz && loadTodayWordsDay() !== today) {
                saveTodayWordsDay(today)
                gainXp(TASK_XP, null) // 今日の課題クリアのごほうびは単語の相棒へ
              }
              if (total >= 10 && score === total) setTotals((t) => ({ ...t, perfect: t.perfect + 1 }))
            }}
            onSpend={spend}
            onRivalWin={() => setWallet((w) => ({ ...w, coins: w.coins + RIVAL_COINS }))}
            onCombo={(c) => setTotals((t) => (c > (t.bestCombo ?? 0) ? { ...t, bestCombo: c } : t))}
            onFavorite={(ids) => setFavorites((f) => addFavorites(f, ids))}
            onGame={() => count('game')}
            onSetLevels={setLevels}
            onCoins={(n) => setWallet((w) => ({ ...w, coins: w.coins + n }))}
            onXp={(n) => (mode === 'grammar' ? feedTrack('grammar', n) : gainXp(n, null))}
            partnerName={mode === 'grammar' ? buddyName('grammar', buddies.grammar) : (monster.name ?? formOf(monster).name)} // 文法のときは文法のなかまがほめる
            onGrammarMaster={() => {
              setWallet((w) => addTicket(addTicket(addTicket(w))))
              pushToast([{ id: 'grammar-master', text: `🏅 文法の全単元を全問正解！ 称号「文法マスター」と🎟${MASTER_TICKETS}`, counter: 'answers', target: 0 }])
            }}
            onGoalTicket={() => {
              setWallet((w) => addTicket(w))
              pushToast([{ id: 'grammar-goal', text: '🎯 文法の今週の目標をたっせい！ 🎟ガチャチケットをもらった', counter: 'answers', target: 0 }])
            }}
            onTicket={() => {
              setWallet((w) => addTicket(w))
              pushToast([{ id: 'stamp', text: '📮 文法スタンプが10個たまった！ 🎟ガチャチケットをもらった', counter: 'answers', target: 0 }])
            }}
          />
          )}
          {mode === 'word' && todayNextBtn}
          {mode === 'word' && !todayQuiz && !quizFocus && !playOn && wordReview}
        </>
      ) : (
        <>
          {mode === 'word' && !playOn && (
            <button className="stage-back game-back" onClick={() => setWordTab('mini')}>
              ← ミニゲームをえらぶ
            </button>
          )}
          <p className="stats buddy-chips home-stats" aria-label={`今日の残り ${queue.length} 語 ・ 定着 ${learned} / ${words.length} 語`}>
            <span>📖 のこり {queue.length}語</span>
            <span>✅ 定着 {learned}/{words.length}</span>
          </p>
          {cardStudy}
        </>
      )}

      <BadgeToast badges={playOn ? [] : toast} onClose={() => setToast([])} />
      {eggToast && !playOn && (
        <div className={`badge-toast${toast.length > 0 ? ' second' : ''}`} role="status" onClick={() => setEggToast(false)}>
          <span className="badge-icon" aria-hidden="true">
            🥚
          </span>
          <div>
            <p className="badge-toast-title">新しい仲間！</p>
            <p className="badge-toast-name">タマゴをもらった（記録画面で相棒を選べるよ）</p>
          </div>
        </div>
      )}
      {petCheer && !playOn && (
        <PetCheer
          key={petCheer.key}
          cheer={petCheer.cheer}
          form={formOf(monster)}
          kind={monster.kind}
          figure={mode === 'grammar' ? <BuddyFigure track="grammar" buddy={buddies.grammar} size={44} /> : mode === 'reading' || mode === 'boss' ? <BuddyFigure track="reading" buddy={buddies.reading} size={44} /> : undefined}
          onClose={() => setPetCheer(null)}
        />
      )}
      {missionToast.length > 0 && !playOn && (
        <div className="badge-toast mission-toast" role="status" onClick={() => setToastQueue(dequeue)}>
          <span className="badge-icon" aria-hidden="true">
            ✅
          </span>
          <div>
            <p className="badge-toast-title">
              {missionToast[0].id === 'lucky'
                ? '🍀 ラッキー！'
                : missionToast[0].id === 'anniv'
                ? '記念日おめでとう！'
                : missionToast[0].id === 'title'
                ? '🎖 称号アップ'
                : missionToast[0].id === 'coupon'
                ? '🎟 割引券ゲット'
                : missionToast[0].id === 'souvenir'
                ? '🎒 おみやげ'
                : missionToast[0].id === 'snack'
                ? '😋 もぐもぐ'
                : missionToast[0].id === 'bond'
                ? '💕 なつき度アップ！'
                : missionToast[0].id === 'review'
                ? '📚 復習コンプリート！'
                : missionToast[0].id === 'login'
                ? 'ログインボーナス'
                : missionToast[0].id === 'weekly'
                ? `週間チャレンジ達成！ +${WEEKLY_XP}XP`
                : ['quest', 'rush', 'rush-ex', 'weekend-boss', 'rare', 'endless'].includes(missionToast[0].id)
                ? '⚔️ ボス討伐！'
                : `ミッション達成！ +${MISSION_XP * missionToast.length}XP`}
            </p>
            <p className="badge-toast-name">{missionToast.map((m) => m.text).join('・')}</p>
          </div>
        </div>
      )}
      {!onboarded && <Onboarding
          onDone={() => setOnboarded(true)}
          onGrade={pickGrade}
          onPlacement={() => {
            try {
              localStorage.setItem('eitan:quiz-mode', 'placement')
            } catch {
              // ストレージが使えない環境では保存をあきらめる
            }
            setOnboarded(true)
            setMode('word')
            setWordTab('mini')
          }}
        />}
      {evoForm && FORMS.find((f) => f.id === evoForm) && (
        <Evolve form={withSpecies(FORMS.find((f) => f.id === evoForm)!, monster.species)} from={evoFrom ?? undefined} wear={monster.wear} kind={monster.kind} onClose={() => setEvoForm(null)} />
      )}
      {celebrate && <Celebrate goal={settings.dailyGoal} onClose={() => setCelebrate(false)} />}

      {buddyEvo && <BuddyEvolve track={buddyEvo.track} form={buddyEvo.form} buddy={buddyEvo.buddy} onClose={() => setBuddyEvo(null)} />}
      <nav className="tabbar" aria-label="画面の切り替え">
        {TABS.map((t) => (
          <button
            key={t.id}
            aria-current={mode === t.id && !showShop ? 'page' : undefined}
            onClick={() => {
              if (t.id === mode && playOn) exitPlay() // 問題の画面でいまのタブをもう一度おすと、えらぶ画面へ
              if (t.id === 'word' && mode !== 'word') setWordTab('mini') // 単語ゲームのページは、えらぶ画面から
              setMode(t.id)
              setGrammarDrill(null)
              setDailyGo(false)
              setTodayQuiz(false)
              setShortGo(false)
              setGrammarGo(false)
              setShowShop(false)
              setShowChallenge(false)
              toContent()
            }}
          >
            <span className="tab-icon" aria-hidden="true">
              {t.icon}
            </span>
            {/* 長い名前（単語ゲームなど）は2行にして360pxでもはみ出さない */}
            <span className="tab-label">
              {t.label.length >= 5 ? (
                <>
                  {t.label.slice(0, 2)}
                  <br />
                  {t.label.slice(2)}
                </>
              ) : (
                t.label
              )}
            </span>
          </button>
        ))}
      </nav>
    </main>
    </BossTeamContext.Provider>
    </PlayContext.Provider>
  )
}

export default App
