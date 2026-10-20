import { dequeue, enqueue } from './toastQueue'
import { useEffect, useMemo, useRef, useState } from 'react'
import { loadEarned, loadTotals, newlyEarned, saveEarned, saveTotals, type Badge } from './badges'
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
import { ANNIV_COINS, dueAnniversary, loadDone, MILESTONES, saveDone } from './anniversary'
import { pickWordOfDay } from './wordOfDay'
import { WordOfDay } from './WordOfDayView'
import { isWeekend, lastWeekSummary, loadWeeklyClaimed, saveWeeklyClaimed, weekCompare, weekCount, weekStart, WEEKLY_COINS, WEEKLY_TARGET, WEEKLY_XP } from './weekly'
import { usePersistent } from './usePersistent'
import { Celebrate } from './CelebrateView'
import { BossDex } from './BossView'
import { Evolve } from './EvolveView'
import { Monster, Party as PartyView, Profile, Zukan } from './MonsterView'
import { loadMyWords, loadUseMy, saveMyWords, saveUseMy } from './myWords'
import { MyWords } from './MyWordsView'
import { bondHearts, bondLevel } from './bond'
import { MissedList } from './MissedListView'
import { shareText, weekReportText } from './shareText'
import { loadPlayed } from './playedModes'
import { Album } from './AlbumView'
import { eventFor } from './events'
import { addSouvenir, loadSouvenirs, saveSouvenirs, souvenirFor, SOUVENIRS } from './souvenir'
import { SouvenirList } from './SouvenirView'
import { addHistory, lastDays, loadHistory, saveHistory } from './history'
import { addEggs, eggsEarned, loadParty, saveParty, updateActive } from './party'
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
import { RIVAL_COINS } from './rival'
import { playFanfare } from './sound'
import { loadBest } from './timeAttack'
import { TimeAttack } from './TimeAttackView'
import { loadStages, recordStars, saveStages } from './stages'
import { Stages, STAR3_COINS } from './StageView'
import { buy, buyFreeze, couponsBetween, toggleWear, COIN_PER_CORRECT, EARLY_COINS, isEarlyNow, LOGIN_COINS, LOGIN_WEEK_COINS, eat, loadSnacks, loadWallet, saveSnacks, saveWallet, snacksLeft } from './shop'
import { Shop } from './ShopView'
import { Onboarding } from './OnboardingView'
import { ShareButton } from './ShareView'
import { loadOnboarded, saveOnboarded } from './onboarding'
import { BOSS_REMATCH_XP, BOSS_XP, loadBoss, saveBoss } from './boss'
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
  const [favorites, setFavorites] = usePersistent(loadFavorites, saveFavorites)
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
  const [cheer, setCheer] = useState<Line | null>(null) // 10問ごとの相棒の応援
  useEffect(() => {
    if (!cheer) return
    const id = window.setTimeout(() => setCheer(null), 3000)
    return () => window.clearTimeout(id)
  }, [cheer])
  const [totals, setTotals] = usePersistent(loadTotals, saveTotals)

  const [missions, setMissions] = usePersistent(() => loadMissions(today), saveMissions)
  const [wallet, setWallet] = usePersistent(loadWallet, saveWallet)
  const streakDays = currentStreakWithFreeze(streak, today, wallet.freezes ?? 0)
  const [showShop, setShowShop] = useState(false)
  const [snacks, setSnacks] = usePersistent(loadSnacks, saveSnacks)
  const [onboarded, setOnboarded] = usePersistent(loadOnboarded, saveOnboarded)
  const count = (c: Counter, n = 1) => setMissions((m) => bump(m, today, c, n))

  // 1問答えるごとに呼ぶ（正解・不正解どちらでも）
  function studied(correct: boolean) {
    count('answers')
    if (correct) count('correct')
    if (correct) setWallet((w) => ({ ...w, coins: w.coins + COIN_PER_CORRECT }))
    const r = recordStudyWithFreeze(streak, today, wallet.freezes ?? 0)
    setStreak(r.streak)
    // ログインボーナス：その日はじめての学習で🪙5、7日連続ごとに🪙20
    if (streak?.last !== today) {
      setTotals((t) => ({ ...t, studyDays: (t.studyDays ?? 0) + 1 }))
      const early = isEarlyNow() ? EARLY_COINS : 0
      const eventBonus = seasonEvent ? EVENT_COINS : 0
      const bonus = (r.streak.count % 7 === 0 ? LOGIN_WEEK_COINS : LOGIN_COINS) + early + eventBonus
      setWallet((w) => ({ ...w, coins: w.coins + bonus }))
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

  function gainXp(amount: number, source: Source | null) {
    setTodayXp((d) => ({ day: today, count: (d.day === today ? d.count : 0) + amount }))
    setGain((g) => ({ amount, key: (g?.key ?? 0) + 1 }))
    const next = feed(monster, amount, source, today)
    updateMonster((m) => feed(m, amount, source, today))
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
    if (changed) setEvoForm(formOf(next).id)
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
  const focusList = (k: Focus) => (k === 'weak' ? weak : k === 'fav' ? favWords : k === 'week' ? weekAgo : k === 'thisweek' ? thisWeekWords : words.filter((w) => picked.includes(w.id)))
  const FOCUS_LABEL: Record<Focus, string> = { weak: '苦手', fav: 'お気に入り', pick: '選んだ単語の', week: '1週間前に学んだ単語', thisweek: '今週学んだ単語' }

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
  const learned = words.filter((w) => (progress[w.id]?.box ?? 0) >= 3).length
  const card = queue[0]


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
      completeBooks: LEVELS.filter((l) => wordsOf([l]).every((w) => (progress[w.id]?.box ?? 0) >= 3)).length,
    },
    earned,
  )
  if (got.length > 0) {
    // 描画中に差分を反映する（React の「前回の描画からの変化に合わせて state を直す」書き方）
    setEarned({ ...earned, ...Object.fromEntries(got.map((b) => [b.id, today])) })
    setToast(got)
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

  return (
    <main className="app">
      <header>
        <div className="top">
          <h1>えいたん</h1>
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
      {showShop ? (
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
          onEat={(id) => {
            const r = eat(wallet, snacks, id, today)
            if (!r) return
            setWallet(r.wallet)
            setSnacks(r.log)
            gainXp(r.xp, null)
            const l = snackLine(id)
            pushToast([{ id: 'snack', text: `${l.en}（${l.ja}）`, counter: 'answers', target: 0 }])
          }}
        />
      ) : mode === 'stage' ? (
        <Stages
          onSpend={spend}
          learnedPct={Object.fromEntries(levels.map((l) => [l, learnedPct(wordsOf([l]), progress)]))}
          onStudy={(ws) => {
            setPicked(ws.map((w) => w.id))
            startCards('pick')
          }}
          levels={levels}
          boss={boss}
          onBossWin={(level) => {
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
              <PartyView party={party} onSelect={(i) => setParty({ ...party, active: i })} />
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
              {FOCUS_LABEL[cardFocus.kind]}カードで復習中（のこり{' '}
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
              <p className="done">{FOCUS_LABEL[cardFocus.kind]}カードを一周しました 💪</p>
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
      {!onboarded && <Onboarding onDone={() => setOnboarded(true)} onGrade={setLevels} />}
      {evoForm && FORMS.find((f) => f.id === evoForm) && (
        <Evolve form={FORMS.find((f) => f.id === evoForm)!} wear={monster.wear} onClose={() => setEvoForm(null)} />
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
