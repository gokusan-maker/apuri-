import { dequeue, enqueue } from './toastQueue'
import { useEffect, useMemo, useRef, useState } from 'react'
import { loadEarned, loadTotals, newlyEarned, rewardOf, saveEarned, saveTotals, type Badge } from './badges'
import { BadgeList, BadgeToast } from './BadgesView'
import { Backup } from './BackupView'
import { loadLastBackup, needBackup } from './backup'
import { Card } from './CardView'
import { WordList } from './WordListView'
import { makeLookup } from './glossary'
import { loadNotes, saveNotes, setNote } from './notes'
import { addFavorites, loadFavorites, saveFavorites, toggleFavorite } from './favorites'
import { Stats } from './StatsView'
import { Calendar } from './CalendarView'
import { loadAccuracy, rate, recordAnswer, saveAccuracy } from './accuracy'
import { loadTime, minutesToday, minutesWeek, saveTime } from './studyTime'
import { useStudyTime } from './useStudyTime'
import { bump, completedUnclaimed, loadMissions, MISSION_XP, saveMissions, type Counter, type Mission } from './missions'
import { Missions } from './MissionsView'
import { baseBeaten, epithetOf, loadBook, totalWins } from './bossbook'
import { GOLD_COINS, KEYS_FOR_GOLD, loadKeys, saveKeys } from './treasure'
import { ANNIV_COINS, dueAnniversary, loadDone, MILESTONES, saveDone } from './anniversary'
import { pickWordOfDay } from './wordOfDay'
import { WordOfDay } from './WordOfDayView'
import { isWeekend, lastWeekSummary, loadWeeklyClaimed, saveWeeklyClaimed, weekCompare, weekCount, weekStart, WEEKLY_COINS, WEEKLY_TARGET, WEEKLY_XP } from './weekly'
import { usePersistent } from './usePersistent'
import { Roulette } from './RouletteView'
import { Janken } from './JankenView'
import { giftReady, loadGiftDay, saveGiftDay } from './gift'
import { DailyGrammarQ } from './DailyGrammarQView'
import { DAILY_Q_XP } from './grammarq'
import { HideSeek } from './HideSeekView'
import { HIDE_COINS } from './hideseek'
import { addSticker, loadStickers, saveStickers, stickerOf, STICKER_TICKETS } from './stickers'
import { loadShards, saveShards, shardAfter, SHARDS_FOR_EGG } from './shard'
import { SugorokuBoard } from './SugorokuView'
import { JANKEN_COINS } from './janken'
import { loadWalkDay, saveWalkDay, walkFind, walkPlace, WALK_COINS } from './walk'
import { omikujiDiscount, omikujiOf } from './omikuji'
import { loadRouletteDay, saveRouletteDay } from './roulette'
import { Celebrate } from './CelebrateView'
import { BossDex } from './BossView'
import { Evolve } from './EvolveView'
import { EvolutionPreview, Monster, Party as PartyView, Profile, Zukan } from './MonsterView'
import { loadMyWords, loadUseMy, saveMyWords, saveUseMy } from './myWords'
import { MyWords } from './MyWordsView'
import { bondHearts, bondLevel, bondWinCoins } from './bond'
import { MissedList } from './MissedListView'
import { DiaryBox } from './DiaryView'
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
import { addEggs, eggsEarned, feedHelpers, loadParty, loadWarm, nextWarm, releaseCoins, releaseMember, saveParty, saveWarm, toggleFav, updateActive, WARM_XP, warmLeft } from './party'
import { loadGachaPoints, saveGachaPoints, POINTS_FOR_SR, srEgg, MULTI5, SLOT_COINS, slotOf, seasonalKindOf, addStats, addTicket, bonusOf, isLuckyPull, LUCKY_COINS, drawEgg, gachaPrice, loadGachaStats, saveGachaStats, DUP_REFUND, isDuplicate, loadStep, nextStep, RARE_FULL_COINS, rareEgg, saveStep, stepLeft, TICKET_MAX } from './gacha'
import {
  feed,
  FORMS,
  rename,
  type MonsterState,
  formOf,
  isLonely,
  seenForms,
  levelInfo,
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
import { titleFor } from './titles'
import { daysUntil, perDay } from './exam'
import { feelingFor } from './feeling'
import { cheerFor, snackLine, type Line } from './talk'
import { cheerEvent, encourage, type Cheer } from './encourage'
import { PetCheer } from './PetCheerView'
import { loadUniv, UNIV_BOSSES } from './univ'
import { annivMonths, annivText, MONTHLY_COINS } from './monthly'
import { addItem, BAG_MAX, BATTLE_ITEMS, loadBag, saveBag, spendItem } from './battleitems'
import { ENDLESS_REWARD_COINS } from './endless'
import { addMood, boosted, loadMood, MOOD_MAX, moodFull, moodNow, saveMood } from './moodmeter'
import { PET_BONUS } from './pet'
import { seasonFxOf } from './seasonfx'
import { cloudSave, loadCode, loadSavedAt, shouldAutoSave } from './cloud'
import { Challenge } from './ChallengeView'
import { challengeStreakNow, challengeOf, difficultyOf, loadChallengeDay, loadChallengeStreak, nextChallengeStreak, saveChallengeDay, saveChallengeStreak, STREAK_TICKET_DAYS } from './challenge'
import { speak, speakPet } from './speech'
import { isNight } from './daytime'
import { RIVAL_COINS } from './rival'
import { playFanfare } from './sound'
import { loadBest } from './timeAttack'
import { TimeAttack } from './TimeAttackView'
import { loadStages, recordStars, saveStages } from './stages'
import { Stages, STAR3_COINS } from './StageView'
import { favSnackOf, buy, buyFreeze, couponsBetween, toggleWear, COIN_PER_CORRECT, EARLY_COINS, isEarlyNow, LOGIN_COINS, LOGIN_WEEK_COINS, eat, loadSnacks, loadWallet, saveSnacks, saveWallet, snacksLeft } from './shop'
import type { GachaResult } from './GachaView'
import { PartnerStatus } from './PartnerStatusView'
import { Records } from './RecordsView'
import { Shop } from './ShopView'
import { Onboarding } from './OnboardingView'
import { ShareButton } from './ShareView'
import { loadOnboarded, saveOnboarded } from './onboarding'
import { BOSS_REMATCH_XP, BOSS_XP, BOSSES, DAILY_BOSS_COINS, loadWinStreak, saveWinStreak, STREAK_COINS, STREAK_EVERY, loadBoss, loadRushDay, loadRushExDay, RUSH_COINS, RUSH_EX_COINS, saveBoss, saveRushDay, saveRushExDay } from './boss'
import { addToday, loadCardsToday, loadTodayCount, loadTodayXp, saveCardsToday, saveTodayCount, saveTodayXp } from './stats'
import { currentStreakWithFreeze, loadStreak, recordStudyWithFreeze, saveStreak } from './streak'
import { applyColor, applyTextSize, applyTheme, loadLevels, loadSettings, saveLevels, saveSettings, toggleLevel } from './settings'
import { SettingsPanel } from './SettingsView'
import { LEVELS, WORDS, wordsOf, type Word } from './words'

type Tab = 'card' | 'stage' | 'quiz' | 'time' | 'stats' | 'settings'

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: 'card', icon: '🃏', label: 'カード' },
  { id: 'stage', icon: '🗺️', label: 'ステージ' },
  { id: 'quiz', icon: '❓', label: 'クイズ' },
  { id: 'time', icon: '⏱', label: 'タイム' },
  { id: 'stats', icon: '📊', label: '記録' },
  { id: 'settings', icon: '⚙️', label: '設定' },
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
  const [mode, setMode] = useState<Tab>('card')
  const [showList, setShowList] = useState(false)
  const [showBooks, setShowBooks] = useState(false) // 単語帳の選択を開いているか
  const [statsTab, setStatsTab] = useState<'log' | 'buddy' | 'collection' | 'data'>('log')
  // 苦手／お気に入りのカード復習：記録画面から始める。一周するまで同じ単語は出さない
  type Focus = 'weak' | 'fav' | 'pick' | 'week' | 'thisweek'
  const [cardFocus, setCardFocus] = useState<{ kind: Focus; done: string[] } | null>(null)
  const [picked, setPicked] = useState<string[]>([]) // 単語一覧から選んだ単語
  const [themeQuiz, setThemeQuiz] = useState(false) // テーマで練習：クイズでやる
  const [favorites, setFavorites] = usePersistent(loadFavorites, saveFavorites)
  const [rouletteDay, setRouletteDay] = usePersistent(loadRouletteDay, saveRouletteDay)
  const [walkDay, setWalkDay] = usePersistent(loadWalkDay, saveWalkDay)
  const [walkMsg, setWalkMsg] = useState('')
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

  const [missions, setMissions] = usePersistent(() => loadMissions(today), saveMissions)
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
  const [giftDay, setGiftDay] = usePersistent(loadGiftDay, saveGiftDay)
  const [giftMsg, setGiftMsg] = useState('')
  // 1日の目標を達成したら、次の日のおみやげを予約する
  if (studiedToday >= settings.dailyGoal && giftDay !== today && !giftReady(giftDay, today)) setGiftDay(today)
  const [winStreak, setWinStreak] = usePersistent(loadWinStreak, saveWinStreak)
  const cheerUp = (n: number) => setMoodMeter((m) => addMood(m, today, n))
  const streakDays = currentStreakWithFreeze(streak, today, wallet.freezes ?? 0)
  const [showShop, setShowShop] = useState(false)
  const [showChallenge, setShowChallenge] = useState(false)
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
  const finished = completedUnclaimed(missions, today)
  if (finished.length > 0) {
    setMissions({ ...missions, claimed: [...missions.claimed, ...finished.map((m) => m.id)] })
    updateMonster((m) => feed(m, MISSION_XP * finished.length, null, today))
    pushToast(finished)
  }
  useEffect(() => {
    if (!toastHead) return
    const id = window.setTimeout(() => setToastQueue(dequeue), 3000)
    return () => window.clearTimeout(id)
  }, [toastHead])

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
    if (!eggToast) return
    const id = window.setTimeout(() => setEggToast(false), 3500)
    return () => window.clearTimeout(id)
  }, [eggToast])
  useEffect(() => {
    if (toast.length === 0) return
    const id = window.setTimeout(() => setToast([]), 3000)
    return () => window.clearTimeout(id)
  }, [toast])

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
    setMode('card')
  }

  function startQuiz(kind: Focus) {
    setQuizFocus(kind)
    setMode('quiz')
  }

  const [shown, setShown] = useState(0) // 同じカードがもう一度出ても新しいカードとして扱う

  function answer(correct: boolean, easy = false) {
    setShown((n) => n + 1)
    setCardsToday((d) => addToday(d, today))
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
  function drawMany(ticket: boolean, n: number): GachaResult[] {
    let w = wallet
    let p = party
    let st = gachaStep
    const out: GachaResult[] = []
    let bonusXp = 0
    const pulled = loadGachaStats().total
    let sb = stickers
    let stickerDone = false
    for (let i = 0; i < n; i++) {
      const r = drawEgg(w, p, rand(), ticket, rand(), isWeekend(today), pickupOf(today).id, stepLeft(st, today) === 0 || (n >= MULTI5 && i === n - 1 && out.every((k) => k.kind.rarity === 'N')), gachaPrice(hour) - omikujiDiscount(today), seasonalKindOf(today))
      if (!r) break
      st = nextStep(st, today)
      const dup = isDuplicate(p.members, r.species.id, r.kind.id)
      const newSpecies = r.species.id !== 'mochi' && !p.members.some((m) => m.species === r.species.id)
      const newKind = r.kind.id !== 'normal' && !p.members.some((m) => m.kind === r.kind.id)
      const bonus = bonusOf(rand())
      const lucky = isLuckyPull(pulled + i + 1) ? pulled + i + 1 : 0
      const slot = slotOf(rand())
      const sticker = stickerOf(rand())
      const st2 = addSticker(sb, sticker)
      sb = st2.book
      if (st2.complete) stickerDone = true
      w = { ...r.wallet, coins: r.wallet.coins + (dup ? DUP_REFUND : 0) + (bonus?.kind === 'coins' ? bonus.amount : 0) + (lucky ? LUCKY_COINS : 0) + (slot.win ? SLOT_COINS : 0) }
      if (bonus?.kind === 'xp') bonusXp += bonus.amount
      p = r.party
      out.push({ kind: r.kind, species: r.species, newKind, newSpecies, refund: dup ? DUP_REFUND : 0, ...(bonus ? { bonus: bonus.text } : {}), ...(lucky ? { lucky } : {}), slot, sticker })
    }
    if (out.length > 0) {
      setWallet(w)
      setParty(p)
      setGachaStep(st)
      saveGachaStats(addStats(loadGachaStats(), out.map((k) => k.kind.rarity)))
      setGachaPoints((pt) => pt + out.length)
      setStickers(sb)
      if (stickerDone) {
        setWallet((x) => ({ ...addTicket(addTicket(x)) }))
        pushToast([{ id: 'stickers', text: `🏷 シール帳がコンプリート！ 🎟ガチャチケットを${STICKER_TICKETS}まいもらった`, counter: 'answers', target: 0 }])
      }
      count('gacha', out.length)
      if (bonusXp > 0) gainXp(bonusXp, null)
    }
    return out
  }

  return (
    <main className="app">
      <header>
        <div className="top">
          <h1>イングリッシュモンスター</h1>
          <p className={`streak${streakDays > 0 ? ' on' : ''}`} aria-label={`連続学習 ${streakDays} 日`}>
            🔥 {streakDays}日
          </p>
        </div>
        {xpRate > 1 && <p className="weekend">🎉 週末はXP2倍！</p>}
        {hour >= 18 && studiedToday === 0 && streakDays > 0 && (
          <p className="weak-banner streak-warn" role="status">
            🔥 今日はまだ学習していないよ。1問でも答えて、連続{streakDays}日をつなげよう！
          </p>
        )}
        {seasonEvent && (
          <p className="weekend season-event">
            {seasonEvent.icon} {seasonEvent.text}
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
          onShop={() => setShowShop(true)}
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
          mood100={{ points: moodNow(moodMeter, today), max: MOOD_MAX }}
          epithet={epithetOf(totalWins(loadBook()))}
          onPetBonus={() => setWallet((w) => ({ ...w, coins: w.coins + PET_BONUS }))}
        />
        <p className="stats">
          今日の残り {queue.length} 語 ・ 定着 {learned} / {words.length} 語
        </p>
        {settings.testDate && daysUntil(today, settings.testDate) >= 0 && (
          <p className="exam">
            📝 テストまであと <strong>{daysUntil(today, settings.testDate)}日</strong>・1日{' '}
            <strong>{perDay(words.length - learned, daysUntil(today, settings.testDate))}語</strong> 覚えれば間にあうよ
          </p>
        )}
        <p className={`omikuji o-${omikujiOf(today).id}`}>
          ⛩ 今日のおみくじ：<strong>{omikujiOf(today).name}</strong>　{omikujiOf(today).text}
        </p>
        {walkDay !== today ? (
          <button
            className="challenge-btn walk-btn"
            onClick={() => {
              const w = walkFind(words, rand())
              setWalkDay(today)
              setWallet((x) => ({ ...x, coins: x.coins + WALK_COINS }))
              setWalkMsg(`🐾 ${walkPlace(rand())}をさんぽして、「${w ? `${w.en}（${w.ja}）` : 'きれいな石'}」を拾ってきた！ 🪙${WALK_COINS}`)
              if (w) speak(w.en)
            }}
          >
            🐾 {monster.name ?? formOf(monster).name}とおさんぽに行く（1日1回）
          </button>
        ) : (
          walkMsg && (
            <p className="walk-msg" role="status">
              {walkMsg}
            </p>
          )
        )}
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
        <button className={`challenge-btn${challengeDay === today ? ' done' : ''}`} onClick={() => setShowChallenge(true)}>
          ⚔ 今日のチャレンジ：{challengeOf(monster.species).icon} {challengeOf(monster.species).label}・{difficultyOf(formOf(monster).stage).label}
          {challengeDay === today ? ' ✅クリア' : ''}
          {challengeStreakNow(challengeDay, today) > 1 && <span className="challenge-streak">🔥{challengeStreakNow(challengeDay, today)}日連続</span>}
        </button>
        <div className="goal" aria-label={`今日の目標 ${Math.min(studiedToday, settings.dailyGoal)} / ${settings.dailyGoal} 問`}>
          <span>{studiedToday >= settings.dailyGoal ? '🎯 目標達成！' : `🎯 今日の目標 ${studiedToday} / ${settings.dailyGoal} 問`}</span>
          <div className="goal-bar">
            <div className="goal-fill" style={{ width: `${Math.min(studiedToday / settings.dailyGoal, 1) * 100}%` }} />
          </div>
        </div>
        {mode !== 'stats' && mode !== 'settings' && (
          <>
            <button className="book-toggle" aria-expanded={showBooks} onClick={() => setShowBooks(!showBooks)}>
              📚 単語帳：{[...levels, ...(useMy ? ['マイ単語帳'] : [])].join('・')} {showBooks ? '▲' : '▼'}
            </button>
            {showBooks && (
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
            )}
          </>
        )}
      </header>

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
                setMode('card')
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
          eventId={seasonEvent?.id}
          wallet={wallet}
          monster={monster}
          onBuy={(id) => {
            const next = buy(wallet, id)
            if (next) setWallet(next)
          }}
          onWear={(id) => updateMonster((m) => ({ ...m, wear: id ? toggleWear(m.wear, id) : undefined }))}
          onClose={() => setShowShop(false)}
          snacksLeft={snacksLeft(snacks, today)}
          onRoom={(id) => setWallet((w) => ({ ...w, room: id }))}
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
          onGacha={(ticket) => drawMany(ticket, 1)[0] ?? null}
          onGachaMulti={(n) => drawMany(false, n)}
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
      ) : mode === 'stage' ? (
        <Stages
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
            const n = winStreak + 1
            setWinStreak(n)
            if (n % STREAK_EVERY === 0) {
              setWallet((w) => ({ ...w, coins: w.coins + STREAK_COINS }))
              pushToast([{ id: 'streak', text: `🔥 ボス${n}連勝！ 🪙${STREAK_COINS}`, counter: 'answers', target: 0 }])
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
            updateMonster((m) => feed(m, boss[level] ? BOSS_REMATCH_XP : BOSS_XP, null, today))
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
      ) : mode === 'settings' ? (
        <SettingsPanel settings={settings} onChange={setSettings} onGrade={setLevels} />
      ) : mode === 'stats' ? (
        <>
          <div className="sub-tabs" role="tablist" aria-label="記録の種類">
            {STATS_TABS.map((t) => (
              <button key={t.id} role="tab" aria-selected={statsTab === t.id} onClick={() => setStatsTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          {statsTab === 'log' && (
            <>
              <p className="today-summary">
                ☀️ 今日のまとめ：<strong>{studiedToday}問</strong>・<strong>+{todayXp.day === today ? todayXp.count : 0}XP</strong>・新しい単語{' '}
                <strong>{newToday}語</strong>
              </p>
              <button
                className="list-link"
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
              </button>
              <LearnedChart values={lastLearned(learnedLog, today)} />
              <DiaryBox today={today} />
              <details className="theme-practice">
                <summary>🗂 テーマで練習</summary>
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
              <p className="stats-note week-compare">📈 {weekCompare(weekCount(history, today), lastWeekSummary(history, today).count)}</p>
              {thisWeekWords.length >= 4 && (
                <button className="list-link" onClick={() => startQuiz('thisweek')}>
                  🗓 今週学んだ単語をクイズでおさらい（{thisWeekWords.length}語）
                </button>
              )}
              {weekAgo.length > 0 && (
                <button className="list-link" onClick={() => startQuiz('week')}>
                  📅 1週間前に学んだ単語をクイズでたしかめる（{weekAgo.length}語）
                </button>
              )}
              {firstToday.length > 0 && (
                <details className="first-today">
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
            <Missions state={missions} today={today} weekly={[Math.min(weekDone, WEEKLY_TARGET), WEEKLY_TARGET]} />
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
              <EvolutionPreview monster={monster} />
              <PartnerStatus monster={monster} />
              <PartyView party={party} onSelect={(i) => setParty({ ...party, active: i })} onFav={(i) => setParty((p) => toggleFav(p, i))}
                warmLeft={warmLeft(warm, today)}
                onWarm={(i) => {
                  if (warmLeft(warm, today) <= 0) return
                  setWarm(nextWarm(warm, today))
                  setParty((p) => ({ ...p, members: p.members.map((m, j) => (j === i ? feed(m, WARM_XP, null, today) : m)) }))
                }}
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
      ) : mode === 'quiz' ? (
        <>
          {quizFocus && focusList(quizFocus).length > 0 && (
            <p className="weak-banner">
              {FOCUS_LABEL[quizFocus]}だけ復習中（{focusList(quizFocus).length}語）
              <button onClick={() => setQuizFocus(null)}>やめる</button>
            </p>
          )}
          <Quiz
            key={`${levelKey}${quizFocus ? `:${quizFocus}` : ''}`}
            words={quizFocus === 'fav' ? [...words, ...favWords.filter((f) => !words.includes(f))] : words}
            targets={quizFocus && focusList(quizFocus).length > 0 ? focusList(quizFocus) : undefined}
            onAnswer={onAnswer}
            onFinish={(score, total) => {
              if (total >= 10 && score === total) setTotals((t) => ({ ...t, perfect: t.perfect + 1 }))
            }}
            onSpend={spend}
            onRivalWin={() => setWallet((w) => ({ ...w, coins: w.coins + RIVAL_COINS }))}
            onCombo={(c) => setTotals((t) => (c > (t.bestCombo ?? 0) ? { ...t, bestCombo: c } : t))}
            onFavorite={(ids) => setFavorites((f) => addFavorites(f, ids))}
            onGame={() => count('game')}
            onSetLevels={setLevels}
            onCoins={(n) => setWallet((w) => ({ ...w, coins: w.coins + n }))}
            onXp={(n) => gainXp(n, null)}
            partnerName={monster.name ?? formOf(monster).name}
            onGoalTicket={() => {
              setWallet((w) => addTicket(w))
              pushToast([{ id: 'grammar-goal', text: '🎯 文法の今週の目標をたっせい！ 🎟ガチャチケットをもらった', counter: 'answers', target: 0 }])
            }}
            onTicket={() => {
              setWallet((w) => addTicket(w))
              pushToast([{ id: 'stamp', text: '📮 文法スタンプが10個たまった！ 🎟ガチャチケットをもらった', counter: 'answers', target: 0 }])
            }}
          />
        </>
      ) : mode === 'time' ? (
        <TimeAttack key={levelKey} words={words} onAnswer={onAnswer} onFinish={(n) => {
            setBestTime((b) => Math.max(b, n))
            count('timeAttack')
          }} />
      ) : (
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
              <p className="done">{FOCUS_LABEL[cardFocus.kind]}{cardFocus.kind === 'pick' ? 'の' : ''}カードを一周しました 💪</p>
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
            <Card
              key={`${card?.id}-${shown}`}
              card={card}
              onAnswer={answer}
              autoSpeak={settings.autoSpeak}
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
              onQuiz={() => setMode('quiz')}
              onSkip={ordered.length > 1 ? () => setSkipped((s) => [...s.filter((x) => x !== card.id), card.id]) : undefined}
            />
            <button className="list-link" onClick={() => setShowList(true)}>
              📚 単語一覧・さがす
            </button>
          </>
        )
      )}

      <BadgeToast badges={toast} onClose={() => setToast([])} />
      {eggToast && (
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
      {petCheer && <PetCheer key={petCheer.key} cheer={petCheer.cheer} form={formOf(monster)} kind={monster.kind} onClose={() => setPetCheer(null)} />}
      {missionToast.length > 0 && (
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
                : `ミッション達成！ +${MISSION_XP * missionToast.length}XP`}
            </p>
            <p className="badge-toast-name">{missionToast.map((m) => m.text).join('・')}</p>
          </div>
        </div>
      )}
      {!onboarded && <Onboarding
          onDone={() => setOnboarded(true)}
          onGrade={setLevels}
          onPlacement={() => {
            try {
              localStorage.setItem('eitan:quiz-mode', 'placement')
            } catch {
              // ストレージが使えない環境では保存をあきらめる
            }
            setOnboarded(true)
            setMode('quiz')
          }}
        />}
      {evoForm && FORMS.find((f) => f.id === evoForm) && (
        <Evolve form={withSpecies(FORMS.find((f) => f.id === evoForm)!, monster.species)} from={evoFrom ?? undefined} wear={monster.wear} kind={monster.kind} onClose={() => setEvoForm(null)} />
      )}
      {celebrate && <Celebrate goal={settings.dailyGoal} onClose={() => setCelebrate(false)} />}

      <nav className="tabbar" aria-label="画面の切り替え">
        {TABS.map((t) => (
          <button
            key={t.id}
            aria-current={mode === t.id && !showShop ? 'page' : undefined}
            onClick={() => {
              setMode(t.id)
              setShowShop(false)
            }}
          >
            <span className="tab-icon" aria-hidden="true">
              {t.icon}
            </span>
            {t.label}
          </button>
        ))}
      </nav>
    </main>
  )
}

export default App
