import { useEffect, useMemo, useRef, useState } from 'react'
import { loadEarned, loadTotals, newlyEarned, saveEarned, saveTotals, type Badge } from './badges'
import { BadgeList, BadgeToast } from './BadgesView'
import { Backup } from './BackupView'
import { Card } from './CardView'
import { WordList } from './WordListView'
import { Stats } from './StatsView'
import { bump, completedUnclaimed, loadMissions, MISSION_XP, saveMissions, type Counter, type Mission } from './missions'
import { Missions } from './MissionsView'
import { usePersistent } from './usePersistent'
import { Celebrate } from './CelebrateView'
import { Monster, Party as PartyView, Zukan } from './MonsterView'
import { loadMyWords, loadUseMy, saveMyWords, saveUseMy } from './myWords'
import { MyWords } from './MyWordsView'
import { addHistory, lastDays, loadHistory, saveHistory } from './history'
import { addEggs, eggsEarned, loadParty, saveParty, updateActive } from './party'
import {
  feed,
  rename,
  formOf,
  isLonely,
  levelInfo,
  type Source,
  XP_CARD_AGAIN,
  XP_CARD_GOOD,
} from './monster'
import {
  buildQueue,
  dayKey,
  grade,
  loadDailyNew,
  loadProgress,
  saveDailyNew,
  saveProgress,
  type ProgressMap,
} from './srs'
import { addMistake, easeMistake, loadMistakes, saveMistakes, weakWords } from './mistakes'
import { Quiz } from './QuizView'
import { loadBest } from './timeAttack'
import { TimeAttack } from './TimeAttackView'
import { loadStages, recordStars, saveStages } from './stages'
import { Stages } from './StageView'
import { buy, COIN_PER_CORRECT, loadWallet, saveWallet } from './shop'
import { Shop } from './ShopView'
import { Onboarding } from './OnboardingView'
import { ShareButton } from './ShareView'
import { loadOnboarded, saveOnboarded } from './onboarding'
import { BOSS_XP, loadBoss, saveBoss } from './boss'
import { addToday, loadTodayCount, saveTodayCount } from './stats'
import { currentStreak, loadStreak, recordStudy, saveStreak } from './streak'
import { applyTextSize, applyTheme, loadLevels, loadSettings, saveLevels, saveSettings, toggleLevel } from './settings'
import { SettingsPanel } from './SettingsView'
import { LEVELS, WORDS, wordsOf } from './words'

type Tab = 'card' | 'stage' | 'quiz' | 'time' | 'stats' | 'settings'

const TABS: { id: Tab; icon: string; label: string }[] = [
  { id: 'card', icon: '🃏', label: 'カード' },
  { id: 'stage', icon: '🗺️', label: 'ステージ' },
  { id: 'quiz', icon: '❓', label: 'クイズ' },
  { id: 'time', icon: '⏱', label: 'タイム' },
  { id: 'stats', icon: '📊', label: '記録' },
  { id: 'settings', icon: '⚙️', label: '設定' },
]

function App() {
  const [progress, setProgress] = usePersistent<ProgressMap>(loadProgress, saveProgress)
  const [mode, setMode] = useState<Tab>('card')
  const [showList, setShowList] = useState(false)
  // 苦手カード：記録画面から始める。一周するまで同じ単語は出さない
  const [weakCards, setWeakCards] = useState<string[] | null>(null)
  const today = dayKey()
  const [daily, setDaily] = usePersistent(() => loadDailyNew(today), saveDailyNew)
  const newToday = daily.day === today ? daily.count : 0


  const [party, setParty] = usePersistent(loadParty, saveParty)
  const monster = party.members[party.active]
  const setMonster = (m: typeof monster) => setParty((p) => updateActive(p, m))
  const [happy, setHappy] = useState(false)
  const [leveledUp, setLeveledUp] = useState(false)
  const [evolved, setEvolved] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const [streak, setStreak] = usePersistent(loadStreak, saveStreak)
  const streakDays = currentStreak(streak, today)

  const [todayCount, setTodayCount] = usePersistent(() => loadTodayCount(today), saveTodayCount)
  const studiedToday = todayCount.day === today ? todayCount.count : 0

  const [settings, setSettings] = useState(loadSettings)
  useEffect(() => {
    saveSettings(settings)
    applyTheme(settings.theme)
    applyTextSize(settings.largeText)
  }, [settings])

  // グラフ用の日ごとの記録。古いデータには無いので、今日の分は今日の学習数から補う
  const [history, setHistory] = useState(() => {
    const h = loadHistory()
    return h[today] === undefined && studiedToday > 0 ? { ...h, [today]: studiedToday } : h
  })
  useEffect(() => saveHistory(history), [history])

  const [celebrate, setCelebrate] = useState(false)
  const [totals, setTotals] = usePersistent(loadTotals, saveTotals)

  const [missions, setMissions] = usePersistent(() => loadMissions(today), saveMissions)
  const [wallet, setWallet] = usePersistent(loadWallet, saveWallet)
  const [showShop, setShowShop] = useState(false)
  const [onboarded, setOnboarded] = usePersistent(loadOnboarded, saveOnboarded)
  const count = (c: Counter, n = 1) => setMissions((m) => bump(m, today, c, n))

  // 1問答えるごとに呼ぶ（正解・不正解どちらでも）
  function studied(correct: boolean) {
    count('answers')
    if (correct) count('correct')
    if (correct) setWallet((w) => ({ ...w, coins: w.coins + COIN_PER_CORRECT }))
    setStreak(recordStudy(streak, today))
    const next = addToday(todayCount, today)
    setTodayCount(next)
    setHistory((h) => addHistory(h, today))
    const reached = studiedToday < settings.dailyGoal && next.count >= settings.dailyGoal
    if (reached) setCelebrate(true)
    setTotals((t) => ({
      ...t,
      answers: t.answers + 1,
      correct: t.correct + (correct ? 1 : 0),
      goals: t.goals + (reached ? 1 : 0),
    }))
  }

  const [mistakes, setMistakes] = usePersistent(loadMistakes, saveMistakes)
  const [weakOnly, setWeakOnly] = useState(false)

  function onAnswer(correct: boolean, xp: number, wordId: string, source: Source) {
    studied(correct)
    if (correct && source === 'ear') count('ear')
    if (!correct) setMistakes((m) => addMistake(m, wordId))
    if (correct && xp > 0) gainXp(xp, source)
  }

  function gainXp(amount: number, source: Source) {
    const next = feed(monster, amount, source, today)
    setMonster(next)
    setHappy(true)
    setLeveledUp(levelInfo(next.xp).level > levelInfo(monster.xp).level)
    setEvolved(formOf(next).id !== formOf(monster).id)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setHappy(false)
      setLeveledUp(false)
      setEvolved(false)
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
  const levelKey = `${levels.join(',')}${useMy ? `:my${myWords.length}` : ''}`

  const weak = useMemo(() => weakWords(words, mistakes), [words, mistakes])

  const queue = useMemo(() => buildQueue(words, progress, today, newToday), [words, progress, today, newToday])
  const learned = words.filter((w) => (progress[w.id]?.box ?? 0) >= 3).length
  const card = queue[0]

  // バッジ：条件を満たしたらその場でもらえる
  const [earned, setEarned] = usePersistent(loadEarned, saveEarned)
  const [bestTime, setBestTime] = useState(loadBest)
  const [toast, setToast] = useState<Badge[]>([])
  const learnedAll = WORDS.filter((w) => (progress[w.id]?.box ?? 0) >= 3).length
  const level = Math.max(...party.members.map((m) => levelInfo(m.xp).level))
  const streakCount = streak?.count ?? 0
  const got = newlyEarned({ ...totals, streak: streakCount, learned: learnedAll, level, bestTime }, earned)
  if (got.length > 0) {
    // 描画中に差分を反映する（React の「前回の描画からの変化に合わせて state を直す」書き方）
    setEarned({ ...earned, ...Object.fromEntries(got.map((b) => [b.id, today])) })
    setToast(got)
  }

  // ミッション達成：その場でボーナスXP
  const [missionToast, setMissionToast] = useState<Mission[]>([])
  const finished = completedUnclaimed(missions, today)
  if (finished.length > 0) {
    setMissions({ ...missions, claimed: [...missions.claimed, ...finished.map((m) => m.id)] })
    setMonster(feed(monster, MISSION_XP * finished.length, null, today))
    setMissionToast(finished)
  }
  useEffect(() => {
    if (missionToast.length === 0) return
    const id = window.setTimeout(() => setMissionToast([]), 3000)
    return () => window.clearTimeout(id)
  }, [missionToast])

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

  const weakCard = weakCards ? weak.find((w) => !weakCards.includes(w.id)) : undefined

  function answerWeak(correct: boolean) {
    if (!weakCard || !weakCards) return
    setWeakCards([...weakCards, weakCard.id])
    setProgress({ ...progress, [weakCard.id]: grade(progress[weakCard.id], correct, today) })
    studied(correct)
    if (correct) count('cardGood')
    setMistakes((m) => (correct ? easeMistake(m, weakCard.id) : addMistake(m, weakCard.id)))
    gainXp(correct ? XP_CARD_GOOD : XP_CARD_AGAIN, 'card')
  }

  function answer(correct: boolean) {
    if (!progress[card.id]) setDaily({ day: today, count: newToday + 1 })
    setProgress({ ...progress, [card.id]: grade(progress[card.id], correct, today) })
    studied(correct)
    if (correct) count('cardGood')
    if (!correct) setMistakes((m) => addMistake(m, card.id))
    gainXp(correct ? XP_CARD_GOOD : XP_CARD_AGAIN, 'card')
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
        <Monster
          monster={monster}
          onRename={(name) => setMonster(rename(monster, name))}
          coins={wallet.coins}
          onShop={() => setShowShop(true)}
          mood={happy ? 'happy' : isLonely(monster, today) ? 'lonely' : 'normal'}
          leveledUp={leveledUp}
          evolved={evolved}
        />
        <p className="stats">
          今日の残り {queue.length} 語 ・ 定着 {learned} / {words.length} 語
        </p>
        <div className="goal" aria-label={`今日の目標 ${Math.min(studiedToday, settings.dailyGoal)} / ${settings.dailyGoal} 問`}>
          <span>{studiedToday >= settings.dailyGoal ? '🎯 目標達成！' : `🎯 今日の目標 ${studiedToday} / ${settings.dailyGoal} 問`}</span>
          <div className="goal-bar">
            <div className="goal-fill" style={{ width: `${Math.min(studiedToday / settings.dailyGoal, 1) * 100}%` }} />
          </div>
        </div>
        {mode !== 'stats' && mode !== 'settings' && (
          <div className="levels" role="group" aria-label="単語帳">
            {LEVELS.map((l) => (
              <button key={l} aria-pressed={levels.includes(l)} onClick={() => setLevels(toggleLevel(levels, l))}>
                {l}
              </button>
            ))}
            {myWords.length > 0 && (
              <button aria-pressed={useMy} onClick={() => setUseMy(!useMy)}>
                マイ単語帳
              </button>
            )}
          </div>
        )}
      </header>

      {showShop ? (
        <Shop
          wallet={wallet}
          monster={monster}
          onBuy={(id) => {
            const next = buy(wallet, id)
            if (next) setWallet(next)
          }}
          onWear={(id) => setMonster({ ...monster, wear: id })}
          onClose={() => setShowShop(false)}
        />
      ) : mode === 'stage' ? (
        <Stages
          levels={levels}
          boss={boss}
          onBossWin={(level) => {
            setBoss((b) => ({ ...b, [level]: b[level] ?? today }))
            setMonster(feed(monster, BOSS_XP, null, today))
          }}
          record={stages}
          onAnswer={onAnswer}
          onClear={(id, stars) => {
            setStages((r) => recordStars(r, id, stars))
            if (stars > 0) count('stageClear')
          }}
        />
      ) : mode === 'settings' ? (
        <SettingsPanel settings={settings} onChange={setSettings} />
      ) : mode === 'stats' ? (
        <>
          <Missions state={missions} today={today} />
          <Stats
            streakDays={streakDays}
            studiedToday={studiedToday}
            learned={learned}
            total={words.length}
            week={lastDays(history, today)}
            goal={settings.dailyGoal}
            weak={weak}
            mistakes={mistakes}
            onReviewWeak={() => {
              setWeakOnly(true)
              setMode('quiz')
            }}
            onReviewWeakCards={() => {
              setWeakCards([])
              setShowList(false)
              setMode('card')
            }}
          >
            <ShareButton
              stats={{
                name: monster.name ?? formOf(monster).name,
                level: levelInfo(monster.xp).level,
                streak: streakDays,
                learned: learnedAll,
                badges: Object.keys(earned).length,
              }}
            />
            <MyWords list={myWords} onChange={setMyWords} />
            <BadgeList earned={earned} />
            <PartyView party={party} onSelect={(i) => setParty({ ...party, active: i })} />
            <Zukan monsters={party.members} />
            <Backup />
          </Stats>
        </>
      ) : mode === 'quiz' ? (
        <>
          {weakOnly && weak.length > 0 && (
            <p className="weak-banner">
              苦手だけ復習中（{weak.length}語）
              <button onClick={() => setWeakOnly(false)}>やめる</button>
            </p>
          )}
          <Quiz
            key={`${levelKey}${weakOnly ? ':weak' : ''}`}
            words={words}
            targets={weakOnly && weak.length > 0 ? weak : undefined}
            onAnswer={onAnswer}
            onFinish={(score, total) => {
              if (total >= 10 && score === total) setTotals((t) => ({ ...t, perfect: t.perfect + 1 }))
            }}
          />
        </>
      ) : mode === 'time' ? (
        <TimeAttack key={levelKey} words={words} onAnswer={onAnswer} onFinish={(n) => {
            setBestTime((b) => Math.max(b, n))
            count('timeAttack')
          }} />
      ) : (
        weakCards ? (
          <>
            <p className="weak-banner">
              苦手カードで復習中（のこり {weak.filter((w) => !weakCards.includes(w.id)).length}語）
              <button onClick={() => setWeakCards(null)}>やめる</button>
            </p>
            {weakCard ? (
              <Card
                key={`weak-${weakCard.id}`}
                card={weakCard}
                onAnswer={answerWeak}
                autoSpeak={settings.autoSpeak}
                jaFirst={settings.cardJaFirst}
              />
            ) : (
              <p className="done">苦手カードを一周しました 💪</p>
            )}
          </>
        ) : showList ? (
          <WordList words={words} progress={progress} onClose={() => setShowList(false)} />
        ) : (
          <>
            <Card key={card?.id} card={card} onAnswer={answer} autoSpeak={settings.autoSpeak} jaFirst={settings.cardJaFirst} />
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
        <div className="badge-toast mission-toast" role="status" onClick={() => setMissionToast([])}>
          <span className="badge-icon" aria-hidden="true">
            ✅
          </span>
          <div>
            <p className="badge-toast-title">ミッション達成！ +{MISSION_XP * missionToast.length}XP</p>
            <p className="badge-toast-name">{missionToast.map((m) => m.text).join('・')}</p>
          </div>
        </div>
      )}
      {!onboarded && <Onboarding onDone={() => setOnboarded(true)} />}
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
