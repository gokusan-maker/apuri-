import { PlayContext, usePlaying } from './playing'
import { BossTime } from './BossTimeView'
import { useContext, useState, type ComponentProps, type CSSProperties } from 'react'
import { medalFor } from './medal'
import type { Source } from './monster'
import { BOSS_REMATCH_XP, BOSS_XP, BOSSES, formatSec, loadBossTimes, bossUnlocked, DAILY_BOSS_COINS, dailyBossLevel, HEARTS, dailyHp, loadBossTaBest, STRONG_COINS, SUDDEN_COINS, STRONG_HP, GOLDEN_COINS, goldenLevelOf, RUSH_COINS, RUSH_EX_COINS, STREAK_COINS, STREAK_EVERY, RUSH_EX_LEVELS, RUSH_LEVELS, type BossRecord, type TeamQ, bossTraits, BOSS_TRAITS, bossBgOf } from './boss'
import { dayKey } from './srs'
import { Boss, BossFigure } from './BossView'
import type { BattleBag, BattleItemId } from './battleitems'
import { BossBook } from './BossBookView'
import { SPECIAL_EVENT_NOTE, specialEventOf, type SpecialEventId } from './bossevent'
import { EventScene } from './EventSceneView'
import { BossArena } from './BossArenaView'
import { loadQuestDay, QUEST_COINS, QUEST_HP, questBossOf, saveQuestDay } from './questboss'
import { ENDLESS_REWARD_COINS, endlessHp, endlessLevel, endlessLook, loadEndlessBest, rewardsBetween, saveEndlessBest } from './endless'
import { loadNightDay, NIGHT_COINS, nightBossOf, saveNightDay, loadRareWeek, loadWeekendWeek, RARE_HP, rareBossOf, saveRareWeek, saveWeekendWeek, WEEKEND_HP, weekendBossOf, weekKey } from './rareboss'
import { loadUniv, saveUniv, univExam, UNIV_BOSSES, univGraduated, type UnivBoss } from './univ'
import { GOLD_COINS, KEYS_FOR_GOLD, openTreasure, type Treasure } from './treasure'
import { usePersistent } from './usePersistent'
import { Castle } from './CastleView'
import { BossFloor } from './BossFloorView'
import { Arena } from './ArenaView'
import { arenaFloor, arenaStart, loadArenaBest } from './arena'
import { nextBossMilestone, BOSS_MILESTONE_COINS, loadBossMilestones, newBossMilestones, saveBossMilestones, BC_FLOOR_COINS, ALL_BOSS_TICKETS, ALL_BOSS_TITLE, allBossBeaten, loadAllBossClaimed, saveAllBossClaimed, BC_FLOORS, BC_KIND, bcPassOf, BC_WORD_QS, floorBossLook, loadBcBest, recordBcBest, BC_QS, bossCastleFloors, bossFloorQs, bossFarewell, bossPassages, bossTaunt, LEVEL_BOSS_LOOK, loadBcClears, loadBossLevel, loadLevelBoss, saveBcClears, saveBossLevel, saveLevelBoss, type BcFloor } from './bosscastle'
import { COURSES, courseById, courseWords, loadCourse, type CourseId } from './wordcourse'
import { LevelPick } from './LevelPickView'
import { levelUnits } from './grammarcastle'
import { CastleCollection } from './CastleCollectView'
import { Quiz } from './QuizView'
import { allThreeStars, isUnlocked, starsFor, stagesOf, STAGE_SIZE, type Stage, type StageRecord } from './stages'
import { LEVELS, WORDS, wordsOf, type Level, type Word } from './words'

type Props = {
  startStage?: string // はじめからこのステージを遊ぶ（単語ゲームの城から）
  part?: 'all' | 'boss' | 'stages' // boss：ボス部屋（ボスだけ）／stages：単語ゲームの単語ステージ
  levels: Level[]
  record: StageRecord
  onClear: (id: string, stars: number) => void
  onTreasure?: (t: Treasure) => void // クリアの宝箱をあけた
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  boss?: BossRecord
  onBossWin?: (level: Level) => void
  dailyDone?: boolean // 今日のボスにもう勝った
  onDailyWin?: (stars: number) => void // 今日のボスに勝った（★1〜3）
  onSpend?: (coins: number) => boolean
  onStudy?: (words: Word[]) => void // このステージの単語をカードで予習
  learnedPct?: Partial<Record<Level, number>> // 単語帳の定着率（メダル用）
  onUnivWin?: (boss: UnivBoss, first: boolean) => void // 大学入試の塔のボスに勝った（ごほうびはアプリ側）
  partner?: ComponentProps<typeof Boss>['partner'] // ボス戦にいっしょに出る相棒
  onRankBonus?: (coins: number) => void // ボス戦Sランクのおまけ
  onCastleReward?: (tickets: number) => void // 城の制覇コレクションのごほうび（ボス部屋の世界地図の下に出す）
  onRushClear?: (ex: boolean) => void // ボスラッシュを全部たおした（ごほうびはアプリ側。ex は週末のEX）
  weekend?: boolean // 週末はボスラッシュEXが出る
  rushExDone?: boolean
  onEndlessReward?: (times: number) => void // エンドレスの塔で新しく10階ごとに到達した
  rushDone?: boolean // 今日のボスラッシュのごほうびをもうもらった
  bag?: BattleBag // バトルアイテム
  onUseItem?: (id: BattleItemId) => void
  onBossDefeat?: () => void // どのボスでも、たおしたとき（ミッション用）
  startDaily?: boolean // 開いたらすぐ今日のボスと戦う（ホームのボタンから）
  onReadingAnswer?: Props['onAnswer'] // 読解ボスの答え（読解のなかま＝竜が育つ）
  readingBuddy?: { icon: string; name: string } // 読解ボスに勝ったときによろこぶ竜
  onSkill?: () => void // 相棒の特技が出た
  onDrop?: (id: BattleItemId) => void // ボスがアイテムをおとした
  keys?: number // 金の宝箱の鍵
  winStreak?: number // ボスの連勝数
  onLose?: () => void
  onOpenGold?: () => void
  power?: number // 相棒のちから（正解ダメージ+）
  hour?: number // いまの時刻（ナイトボス用）
  event?: SpecialEventId | null // とくべつイベントを決めて出す（テスト用。ふだんは日がわり）
  onRareWin?: () => void // 今週のレアボスをはじめて倒した（ごほうびはアプリ側）
  onWeekendWin?: () => void // 週末ボスをその週末はじめて倒した
  onQuestWin?: () => void // 特別クエストの強いボスをその日はじめて倒した
  onMarkWeak?: (wordId: string, on: boolean) => void // 正解しても苦手に入れる
}

export const STAR3_COINS = 20
// 中学のボスは4問に1問が文法問題
const GRAMMAR_BOSS_LEVELS: Level[] = ['中1', '中2', '中3']

const starText = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n)

export function Stages({ part = 'all', levels, record, onClear, onTreasure, onAnswer, boss = {}, onBossWin, onSpend, onStudy, learnedPct = {}, dailyDone = false, onDailyWin, onUnivWin, partner, power = 0, hour = 12, onRareWin, onWeekendWin, onRankBonus, onRushClear, rushDone = false, weekend = false, rushExDone = false, onEndlessReward, bag, onUseItem, onBossDefeat, onSkill, onDrop, keys = 0, onOpenGold, winStreak = 0, onLose, startDaily = false, onReadingAnswer, readingBuddy, event, onQuestWin, onMarkWeak, startStage, onCastleReward }: Props) {
  const daily = dailyBossLevel(levels, dayKey())
  const [dailyFight, setDailyFight] = useState(startDaily && daily ? 1 : 0) // 今日のボスの強さ（0は今日のボスではない）
  const [playing, setPlaying] = useState<Stage | null>(() => (startStage ? (levels.flatMap((lv) => stagesOf(lv)).find((x) => x.id === startStage) ?? null) : null)) // 単語ゲームの城からえらんだステージはすぐ始める
  const [result, setResult] = useState<number | null>(null)
  const [round, setRound] = useState(0)
  const [fighting, setFighting] = useState<Level | null>(startDaily && daily ? daily : null)
  const [firstThree, setFirstThree] = useState(false)
  const [treasure, setTreasure] = useState<Treasure | null>(null)
  const [univ, setUniv] = usePersistent(loadUniv, saveUniv)
  const [rareWeek, setRareWeek] = usePersistent(loadRareWeek, saveRareWeek)
  const [rareFight, setRareFight] = useState(false)
  const [weekendWeek, setWeekendWeek] = usePersistent(loadWeekendWeek, saveWeekendWeek)
  const [weekendFight, setWeekendFight] = useState(false)
  const [questFight, setQuestFight] = useState(false)
  const [questDay, setQuestDay] = usePersistent(loadQuestDay, saveQuestDay)
  const [timeAttack, setTimeAttack] = useState(false)
  const [strong, setStrong] = useState(false) // 強化版のボス
  const [sudden, setSudden] = useState(false) // サドンデス（ハート1つ）
  const [nightFight, setNightFight] = useState(false)
  const [nightDay, setNightDay] = usePersistent(loadNightDay, saveNightDay)
  const [rush, setRush] = useState<{ round: number; hearts: number; won: boolean; ex?: boolean } | null>(null)
  const [endless, setEndless] = useState<{ floor: number; hearts: number; won: boolean } | null>(null)
  const [endlessBest, setEndlessBest] = usePersistent(loadEndlessBest, saveEndlessBest)
  const week = weekKey(dayKey())
  const specialEvent = event !== undefined ? event : specialEventOf(dayKey(), { hour, weekend, goldReady: keys >= KEYS_FOR_GOLD && !!onOpenGold })
  const rare = rareBossOf(week)
  const [univFight, setUnivFight] = useState<UnivBoss | null>(null)
  const [bcFloor, setBcFloor] = useState<(BcFloor & { qs: TeamQ[]; first?: boolean; round?: number }) | null>(null) // ボスの城の問題の階（1〜4階）
  const [bcClears, setBcClears] = useState(loadBcClears)
  const [arenaOn, setArenaOn] = useState(false) // 城の下の闘技場
  const [lvFight, setLvFight] = useState<CourseId | null>(null) // レベルのボスと戦っている
  const [lboss, setLboss] = useState(loadLevelBoss) // たおしたレベルのボス
  const [farewell, setFarewell] = useState<string | null>(null) // はじめてたおしたボスの負けおしみ（城にもどったら見せる）
  const [allClaimed, setAllClaimed] = useState(loadAllBossClaimed) // 全ボス制覇のごほうびをもらった
  const [bossLv, setBossLv] = useState<CourseId>(() => loadBossLevel(loadCourse(levels))) // えらんでいるボスのレベル（レベルごとに城とボス）

  const inApp = useContext(PlayContext) !== null // App の中では、もどるは上の「ほかの問題をえらぶ」
  const backLabel = part === 'boss' ? '👹 ボスの一覧へ' : 'ステージにもどる' // 勝ったあとのボタン
  // ステージ・ボス戦の画面では、App の上に「ほかの問題をえらぶ」（おすとステージ・ボスの一覧へ）
  usePlaying(!!(lvFight || bcFloor || univFight || endless || rush || timeAttack || nightFight || weekendFight || rareFight || fighting || playing), () => {
    setLvFight(null)
    setBcFloor(null)
    setUnivFight(null)
    setEndless(null)
    setRush(null)
    setTimeAttack(false)
    setNightFight(false)
    setWeekendFight(false)
    setRareFight(false)
    setFighting(null)
    setDailyFight(0)
    setPlaying(null)
    setResult(null)
    setTreasure(null)
  })

  if (univFight) {
    const first = !univ[univFight.id]
    return (
      <Boss
        winLabel={backLabel}
        reading
        winBuddy={readingBuddy}
        key={univFight.id}
        level="高校基礎"
        words={wordsOf(univFight.levels)}
        look={univFight}
        exam={univExam(UNIV_BOSSES.indexOf(univFight))}
        title={`🏯 大学入試の塔 ${univFight.floor}`}
        hp={univFight.hp}
        partner={partner}
        power={power}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onLose={onLose}
        onRankBonus={onRankBonus}
        bonus={first ? BOSS_XP : BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onReadingAnswer ?? onAnswer}
        onWin={() => {
          setUniv((r) => ({ ...r, [univFight.id]: dayKey() }))
          onUnivWin?.(univFight, first)
        }}
        onExit={() => setUnivFight(null)}
      />
    )
  }

  if (endless) {
    const f = endless.floor
    const lv = endlessLevel(f)
    return (
      <Boss
        reading
        winBuddy={readingBuddy}
        key={`endless-${f}`}
        level={lv}
        words={wordsOf([lv])}
        look={endlessLook(f)}
        hp={endlessHp(f)}
        noBook
        title={`🗼 塔 ${f}階（最高 ${endlessBest}階）`}
        note={f === 1 ? `10階ごとに 🪙${ENDLESS_REWARD_COINS}＋🎟` : undefined}
        startHearts={endless.hearts}
        winLabel={`${f + 1}階へ ▶ ❤️${endless.hearts}`}
        partner={partner}
        power={power}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onLose={onLose}
        bonus={BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onReadingAnswer ?? onAnswer}
        onRankBonus={onRankBonus}
        onWinHearts={(h) => setEndless((e) => (e ? { ...e, hearts: h } : e))}
        onWin={() => {
          setEndless((e) => (e ? { ...e, won: true } : e))
          if (f > endlessBest) {
            const times = rewardsBetween(endlessBest, f)
            setEndlessBest(f)
            if (times > 0) onEndlessReward?.(times)
          }
        }}
        onExit={() => setEndless(endless.won ? { floor: f + 1, hearts: endless.hearts, won: false } : null)}
      />
    )
  }

  if (rush) {
    const levels = rush.ex ? RUSH_EX_LEVELS : RUSH_LEVELS
    const lv = levels[rush.round]
    const last = rush.round === levels.length - 1
    return (
      <Boss
        reading
        winBuddy={readingBuddy}
        key={`rush-${rush.round}`}
        level={lv}
        words={wordsOf([lv])}
        title={`🔥 ボスラッシュ${rush.ex ? 'EX' : ''} ${rush.round + 1} / ${levels.length}`}
        note={rush.round === 0 ? (rush.ex ? `3連戦！ 全勝で 🪙${RUSH_EX_COINS}＋🎟2` : `3連戦！ 全勝で 🪙${RUSH_COINS}＋🎟`) : undefined}
        startHearts={rush.hearts}
        winLabel={last ? `ラッシュ完全クリア！ ${backLabel}` : `次のボスへ ▶ ❤️${rush.hearts}`}
        partner={partner}
        power={power}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onLose={onLose}
        bonus={BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onReadingAnswer ?? onAnswer}
        onRankBonus={onRankBonus}
        onWinHearts={(h) => setRush((r) => (r ? { ...r, hearts: h } : r))}
        onWin={() => {
          setRush((r) => (r ? { ...r, won: true } : r))
          if (last) onRushClear?.(!!rush.ex)
        }}
        onExit={() => setRush(rush.won && !last ? { round: rush.round + 1, hearts: rush.hearts, won: false, ex: rush.ex } : null)}
      />
    )
  }

  if (timeAttack) return <BossTime words={wordsOf(levels)} onBack={() => setTimeAttack(false)} />

  if (nightFight) {
    const nb = nightBossOf(dayKey())
    return (
      <Boss
        winLabel={backLabel}
        reading
        winBuddy={readingBuddy}
        level={nb.level}
        words={wordsOf([nb.level])}
        look={nb.look}
        title="🌃 ナイトボス"
        note={`夜7時〜10時だけ出るボス「${nb.look.name}」。たおすと 🪙${NIGHT_COINS}`}
        partner={partner}
        power={power}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onLose={onLose}
        onRankBonus={onRankBonus}
        bonus={BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onReadingAnswer ?? onAnswer}
        onWin={() => {
          if (nightDay === dayKey()) return
          setNightDay(dayKey())
          onRankBonus?.(NIGHT_COINS)
        }}
        onExit={() => setNightFight(false)}
      />
    )
  }

  if (questFight) {
    const qb = questBossOf(dayKey())
    return (
      <Boss
        winLabel={backLabel}
        reading
        winBuddy={readingBuddy}
        level={qb.level}
        words={wordsOf([qb.level])}
        look={qb.look}
        title={`👑 特別クエスト：${qb.look.name}`}
        note={`とても強いボス！ たおすと 🪙${QUEST_COINS}・🎟1（HP${QUEST_HP}）`}
        hp={QUEST_HP}
        partner={partner}
        power={power}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onLose={onLose}
        onRankBonus={onRankBonus}
        bonus={BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onReadingAnswer ?? onAnswer}
        onWin={() => {
          if (questDay === dayKey()) return
          setQuestDay(dayKey())
          onQuestWin?.()
        }}
        onExit={() => setQuestFight(false)}
      />
    )
  }

  if (weekendFight) {
    const wb = weekendBossOf(week)
    return (
      <Boss
        winLabel={backLabel}
        reading
        winBuddy={readingBuddy}
        level={wb.level}
        words={wordsOf([wb.level])}
        look={wb.look}
        title="🌙 週末ボス"
        note={`たおすと 🎟1（HP${WEEKEND_HP}）`}
        hp={WEEKEND_HP}
        partner={partner}
        power={power}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onLose={onLose}
        onRankBonus={onRankBonus}
        bonus={BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onReadingAnswer ?? onAnswer}
        onWin={() => {
          if (weekendWeek === week) return
          setWeekendWeek(week)
          onWeekendWin?.()
        }}
        onExit={() => setWeekendFight(false)}
      />
    )
  }

  if (rareFight) {
    return (
      <Boss
        winLabel={backLabel}
        reading
        winBuddy={readingBuddy}
        level={rare.level}
        words={wordsOf([rare.level])}
        look={rare.look}
        title="✨ 今週のレアボス"
        note={`勝つと 色ちがい確定のタマゴ！`}
        hp={RARE_HP}
        partner={partner}
        power={power}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onLose={onLose}
        onRankBonus={onRankBonus}
        bonus={BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onReadingAnswer ?? onAnswer}
        onWin={() => {
          if (rareWeek === week) return
          setRareWeek(week)
          onRareWin?.()
        }}
        onExit={() => setRareFight(false)}
      />
    )
  }

  // レベル（中1〜ネイティブ）のボス：そのレベルの単語・文法・読解で戦う
  if (lvFight) {
    const c = courseById(lvFight)
    const first = !lboss[lvFight]
    return (
      <Boss
        winLabel={backLabel}
        key={`lv-${lvFight}`}
        reading
        winBuddy={readingBuddy}
        level={c.level}
        words={courseWords(lvFight)}
        look={BOSSES[LEVEL_BOSS_LOOK[lvFight]]}
        exam={{ passages: bossPassages(lvFight) ?? [], units: levelUnits(lvFight) }}
        traits={bossTraits(BOSSES[LEVEL_BOSS_LOOK[lvFight]].name, true)}
        title={`👹 ${c.label}のボス`}
        partner={partner}
        power={power}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onLose={onLose}
        onRankBonus={onRankBonus}
        bonus={first ? BOSS_XP : BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onReadingAnswer ?? onAnswer}
        onWin={() => {
          const next = { ...lboss, [lvFight]: dayKey() }
          // 撃破数が5・10レベルになったら記念のコイン（1回ずつ）
          const ms = newBossMilestones(COURSES.filter((x) => next[x.id]).length, loadBossMilestones())
          if (ms.length > 0) {
            saveBossMilestones([...loadBossMilestones(), ...ms])
            onRankBonus?.(BOSS_MILESTONE_COINS * ms.length)
          }
          if (first) setFarewell(bossFarewell(BOSSES[LEVEL_BOSS_LOOK[lvFight]].name, c.label) + (ms.length > 0 ? `　🎉 ${ms[ms.length - 1]}レベルのボスを撃破！ 記念の🪙${BOSS_MILESTONE_COINS * ms.length}` : ''))
          setLboss(next)
          saveLevelBoss(next)
          onBossWin?.(LEVEL_BOSS_LOOK[lvFight])
        }}
        onExit={() => setLvFight(null)}
      />
    )
  }

  if (fighting) {
    const nextLevel = !dailyFight && !strong && !sudden ? levels.slice(levels.indexOf(fighting) + 1).find((l) => bossUnlocked(l, record)) : undefined
    return (
      <Boss
        winLabel={backLabel}
        key={fighting}
        reading
        winBuddy={readingBuddy}
        nextBoss={nextLevel ? { label: `次のボスへ ▶ ${BOSSES[nextLevel].name}`, onClick: () => setFighting(nextLevel) } : undefined}
        level={fighting}
        words={wordsOf([fighting])}
        golden={fighting === goldenLevelOf(LEVELS, dayKey())}
        hp={dailyFight ? dailyHp(dailyFight) : strong ? STRONG_HP : undefined}
        title={dailyFight ? `⚔️ 今日のボス ${'★'.repeat(dailyFight)}` : strong ? `💪 強化版の${fighting}ボス` : sudden ? `💀 サドンデス：${fighting}ボス` : undefined}
        note={dailyFight && daily ? `今日のボス（${daily}）・勝つと🪙${DAILY_BOSS_COINS}${dailyFight > 1 ? `×${dailyFight}` : ''}` : undefined}
        startHearts={sudden ? 1 : undefined}
        grammar={GRAMMAR_BOSS_LEVELS.includes(fighting)}
        partner={partner}
        power={power}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onLose={onLose}
        onRankBonus={onRankBonus}
        bonus={boss[fighting] ? BOSS_REMATCH_XP : BOSS_XP}
        onSpend={onSpend}
        onAnswer={onReadingAnswer ?? onAnswer}
        onWin={() => {
          onBossWin?.(fighting)
          if (dailyFight) onDailyWin?.(dailyFight)
          if (strong) onRankBonus?.(STRONG_COINS)
          if (sudden) onRankBonus?.(SUDDEN_COINS)
        }}
        onExit={() => {
          setFighting(null)
          setDailyFight(0)
          setStrong(false)
          setSudden(false)
        }}
      />
    )
  }

  if (playing) {
    return (
      <section className="stage-play">
        <div className="stage-head stage-play-head">
          {!inApp && (
            <button
              className="stage-back"
              onClick={() => {
                setPlaying(null)
                setResult(null)
              }}
            >
              ← ステージ一覧
            </button>
          )}
          <span className="stage-play-name">
            {playing.level} ステージ{playing.no}
          </span>
          {onStudy && result === null && (
            <button className="note-btn" title="このステージの10語をカードで予習" onClick={() => onStudy(playing.words)}>
              📖 予習
            </button>
          )}
        </div>
        {result !== null && (
          <p className={`stage-result${result > 0 ? ' clear' : ''}`}>
            {result > 0 ? (
              <span aria-label={`クリア！ ${starText(result)}`}>
                クリア！{' '}
                {[0, 1, 2].map((i) => (
                  <span key={i} className={`star${i < result ? ' lit' : ''}`} style={{ animationDelay: `${i * 0.3}s` }}>
                    {i < result ? '★' : '☆'}
                  </span>
                ))}
              </span>
            ) : (
              'おしい！ もう一度！'
            )}
            {firstThree && <span className="stage-bonus">はじめての★3！ 🪙{STAR3_COINS}</span>}
            {result > 0 &&
              (treasure ? (
                <span key={treasure.text} className={`treasure-open t-${treasure.kind}`} role="status">
                  🎁 {treasure.text}
                </span>
              ) : (
                <button
                  className="treasure-btn"
                  onClick={() => {
                    const t = openTreasure(result, Math.random())
                    setTreasure(t)
                    onTreasure?.(t)
                  }}
                >
                  🎁 宝箱をあける
                </button>
              ))}
            {result > 0 && stagesOf(playing.level)[playing.no] && (
              <button
                className="good next-unit-btn"
                aria-label={`次のステージへ（${playing.level} ステージ${playing.no + 1}）`}
                onClick={() => {
                  setPlaying(stagesOf(playing.level)[playing.no])
                  setResult(null)
                  setTreasure(null)
                  window.scrollTo?.({ top: 0 })
                }}
              >
                次のステージへ ▶
              </button>
            )}
            {result > 0 && (
              <span className="stage-progress">
                {playing.level}の★ {stagesOf(playing.level).reduce((a, st) => a + (record[st.id] ?? 0), 0)} / {stagesOf(playing.level).length * 3}
              </span>
            )}
          </p>
        )}
        <Quiz
          key={`${playing.id}-${round}`}
          words={WORDS}
          targets={playing.words}
          count={STAGE_SIZE}
          lockDirection
          onAnswer={onAnswer}
          onMarkWeak={onMarkWeak}
          onFinish={(score, total) => {
            const stars = starsFor(score, total)
            setResult(stars)
            setTreasure(null)
            setFirstThree(stars === 3 && (record[playing.id] ?? 0) < 3)
            onClear(playing.id, stars)
          }}
          onRestart={() => {
            setResult(null)
            setRound(round + 1)
          }}
        />
      </section>
    )
  }

  // 闘技場（城の下）：エンドレス
  if (part === 'boss' && arenaOn) return <Arena start={arenaStart(bossLv)} onExit={() => setArenaOn(false)} />

  // ボスの城の問題の階
  if (part === 'boss' && bcFloor)
    return (
      <BossFloor
        key={`${bcFloor.id}:${bcFloor.round ?? 0}`}
        title={`🏰 ${courseById(bcFloor.course).label}のボスの階　${BC_KIND[bcFloor.floor]}`}
        qs={bcFloor.qs}
        taunt={bossTaunt(BOSSES[LEVEL_BOSS_LOOK[bcFloor.course]].name, bcFloor.floor)}
        onBack={() => setBcFloor(null)}
        onRetry={() => setBcFloor((cur) => (cur ? { ...cur, qs: bossFloorQs(cur.course, cur.floor), first: !loadBcClears().includes(cur.id), round: (cur.round ?? 0) + 1 } : cur))}
        reward={bcFloor.first && onRankBonus ? BC_FLOOR_COINS : 0}
        best={loadBcBest()[bcFloor.id]}
        boss={floorBossLook(bcFloor.course, bcFloor.floor)}
        onDone={(score) => {
          recordBcBest(bcFloor.id, score)
          if (score >= bcPassOf(bcFloor.qs.length) && !bcClears.includes(bcFloor.id)) {
            onRankBonus?.(BC_FLOOR_COINS)
            const next = [...bcClears, bcFloor.id]
            setBcClears(next)
            saveBcClears(next)
          }
        }}
      />
    )

  const arenaBest = loadArenaBest() // 闘技場の最高の階
  const bcBest = loadBcBest() // ボスの城の問題の階ごとの最高得点
  const bossTimes = loadBossTimes() // ボスごとの最短タイム（タイルに小さく出す）
  return (
    <section className="card stages">
      {part !== 'boss' && <h2>{part === 'stages' ? '🗺 単語ステージ' : 'ステージ'}</h2>}{/* ボス部屋は単語・文法と同じく、城の上に見出しを出さない */}
      {part !== 'stages' && (
      <>
      {/* ボスをえらぶ：単語帳ごとのボスを1体ずつ色つきのタイルでならべ、どのボスもタップで戦える（オーナーの要望） */}
      {part === 'boss' && (
        <>
        <LevelPick
          label="ボスのレベル"
          current={bossLv}
          spots={COURSES.map((c) => ({ id: c.id, name: c.label, sub: `👹 ${BOSSES[LEVEL_BOSS_LOOK[c.id]].name}`, badge: bossTimes[BOSSES[LEVEL_BOSS_LOOK[c.id]].name] !== undefined ? `⏱ ${formatSec(bossTimes[BOSSES[LEVEL_BOSS_LOOK[c.id]].name])}` : undefined, done: lboss[c.id] ? BC_FLOORS : bossCastleFloors([c.id]).filter((f) => bcClears.includes(f.id)).length, total: BC_FLOORS }))}
          onPick={(id) => {
            setBossLv(id as CourseId)
            saveBossLevel(id as CourseId)
          }}
        />
        <Castle
          key={bossLv}
          name={`${courseById(bossLv).label}のボスの城`}
          theme="red"
          floors={bossCastleFloors([bossLv]).map((f) => {
            const isBoss = f.floor === BC_FLOORS - 1
            const c = courseById(f.course)
            const look = BOSSES[LEVEL_BOSS_LOOK[f.course]]
            return {
              id: f.id,
              label: isBoss ? `👹 ${look.name}` : `${c.label}　${BC_KIND[f.floor]}`,
              sub: isBoss ? `${c.label}のボス・とくぎ ${bossTraits(look.name, true).map((t) => BOSS_TRAITS[t].icon).join('')}` : `👾 ${floorBossLook(f.course, f.floor).name}・${f.floor === 0 ? BC_WORD_QS : BC_QS}問${bcBest[f.id] !== undefined ? `・最高 ${bcBest[f.id]}問` : ''}`,
              fig: isBoss ? <BossFigure hit={false} look={look} /> : undefined,
              cleared: !!lboss[f.course] || bcClears.includes(f.id),
            }
          })}
          goLabel="⚔ のぼる"
          againLabel="✅ もう一度"
          onOpen={(id) => {
            const f = bossCastleFloors([bossLv]).find((x) => x.id === id)!
            window.scrollTo?.({ top: 0 })
            if (f.floor === BC_FLOORS - 1) setLvFight(f.course)
            else setBcFloor({ ...f, qs: bossFloorQs(f.course, f.floor), first: !bcClears.includes(f.id) })
          }}
        />
        {/* 城の下の闘技場：エンドレスで戦い、正解でレベルアップ・まちがいでレベルダウン（オーナーの要望） */}
        <div className="arena-entry" role="region" aria-label="闘技場">
          <p className="arena-entry-title">🏟 闘技場（エンドレス）</p>
          <p className="arena-entry-sub">
            正解で上の階、まちがいで下の階へ。{arenaBest !== null ? `最高 ${arenaFloor(arenaBest)}` : 'どこまで上がれる？'}
          </p>
          <button
            className="good next-unit-btn"
            onClick={() => {
              window.scrollTo?.({ top: 0 })
              setArenaOn(true)
            }}
          >
            ⚔ 闘技場で戦う（{courseById(bossLv).label}から）
          </button>
        </div>
        {farewell && (
          <p className="bfloor-taunt" role="status">
            {farewell}
          </p>
        )}
        {lboss[bossLv] && COURSES[COURSES.findIndex((c) => c.id === bossLv) + 1] && (
          <button
            className="good next-unit-btn boss-next-lv"
            onClick={() => {
              const next = COURSES[COURSES.findIndex((c) => c.id === bossLv) + 1].id
              setBossLv(next)
              saveBossLevel(next)
              window.scrollTo?.({ top: 0 })
            }}
          >
            ▶ 次は「{COURSES[COURSES.findIndex((c) => c.id === bossLv) + 1].label}」のボスの城へ
          </button>
        )}
        <p className={`boss-all${allBossBeaten(lboss) ? ' done' : ''}`} aria-label="ボス撃破の数">
          👹 撃破 {COURSES.filter((c) => lboss[c.id]).length} / {COURSES.length} レベル
          {allBossBeaten(lboss) ? `　👑 称号「${ALL_BOSS_TITLE}」` : '（全部たおすと特別な称号）'}
          {nextBossMilestone(COURSES.filter((c) => lboss[c.id]).length) && <small className="boss-next-ms">　🎯 あと{nextBossMilestone(COURSES.filter((c) => lboss[c.id]).length)!.left}レベルで記念の🪙{BOSS_MILESTONE_COINS}</small>}
        </p>
        {allBossBeaten(lboss) && !allClaimed && onCastleReward && (
          <button
            className="castle-chest-btn"
            onClick={() => {
              saveAllBossClaimed()
              setAllClaimed(true)
              onCastleReward(ALL_BOSS_TICKETS)
            }}
          >
            🎁 全レベルのボス制覇のごほうび（🎟ガチャチケット×{ALL_BOSS_TICKETS}）
          </button>
        )}
        <details className="boss-pick-fold">
          <summary>📋 ボスの一覧から自由にえらぶ</summary>
        <div className="boss-pick" role="group" aria-label="ボスをえらぶ">
          {COURSES.map((c) => {
            const look = BOSSES[LEVEL_BOSS_LOOK[c.id]]
            return (
              <button
                key={c.id}
                className={`boss-pick-tile${lboss[c.id] ? ' beaten' : ''}`}
                style={{ '--boss-c': look.color } as CSSProperties}
                aria-label={`${c.label}のボス「${look.name}」に挑戦${lboss[c.id] ? '（撃破ずみ）' : ''}`}
                title={look.desc}
                onClick={() => {
                  setLvFight(c.id)
                  window.scrollTo?.({ top: 0 })
                }}
              >
                {lboss[c.id] && <span className="boss-pick-crown" aria-hidden="true">👑</span>}
                <span className="boss-pick-fig">
                  <BossFigure hit={false} look={look} />
                </span>
                <span className="boss-pick-name">{look.name}</span>
                <small className="boss-pick-lv">
                  {c.label}
                  {bossTimes[look.name] !== undefined && <span className="boss-pick-time" title={`最短タイム ${formatSec(bossTimes[look.name])}`}> ⏱{Math.floor(bossTimes[look.name] / 60)}:{String(bossTimes[look.name] % 60).padStart(2, '0')}</span>}
                </small>
              </button>
            )
          })}
        </div>
        </details>
        {onCastleReward && <CastleCollection onReward={onCastleReward} />}
        </>
      )}
      {winStreak > 0 && (
        <p className="win-streak">
          🔥 ボス {winStreak}連勝中！（{STREAK_EVERY}連勝ごとに 🪙{STREAK_COINS}・負けるとリセット）
        </p>
      )}
      <BossBook
        onFight={(name) => {
          const lv = (Object.keys(BOSSES) as Level[]).find((l) => BOSSES[l].name === name)
          if (lv) {
            setFighting(lv)
            window.scrollTo?.({ top: 0 })
          }
        }}
      />
      {specialEvent && (
        <div className={`special-event se-${specialEvent}`} role="region" aria-label="とくべつイベント">
          <p className="special-event-ribbon">
            ⚡ とくべつイベント出現中！<span className="special-event-note">{SPECIAL_EVENT_NOTE[specialEvent]}</span>
          </p>
          {specialEvent === 'gold' && (
      <div className="gold-chest">
            <span className="lg-icon" aria-hidden="true">🗝️</span>
            <span className="mode-name">金の宝箱の鍵</span>
            <span className="gold-keys" aria-label={`鍵 ${Math.min(keys, KEYS_FOR_GOLD)} / ${KEYS_FOR_GOLD}`}>
              {Array.from({ length: KEYS_FOR_GOLD }, (_, i) => (
                <i key={i} className={i < keys ? 'got' : undefined} />
              ))}
            </span>
            {keys >= KEYS_FOR_GOLD && onOpenGold && (
              <button className="treasure-btn" onClick={onOpenGold}>
                🎁 金の宝箱をあける（🎟＋🪙{GOLD_COINS}）
              </button>
            )}
          </div>
          )}
          {specialEvent === 'univ' && (
      <details className="univ-tower game-fold" open>
            <summary>
              <span className="lg-icon" aria-hidden="true">🏯</span>大学入試の塔<span className="mode-badge" aria-label={`${Object.keys(univ).length} / ${UNIV_BOSSES.length} 階クリア`}>{Object.keys(univ).length}/{UNIV_BOSSES.length}階</span>
              <span className="univ-meter" aria-hidden="true">
                <i style={{ width: `${(Object.keys(univ).length / UNIV_BOSSES.length) * 100}%` }} />
              </span>
            </summary>
            {(() => {
              const day = univGraduated(univ)
              return (
                day && (
                  <div className="univ-diploma" role="note">
                    <strong>🎓 合格証書</strong>
                    <span>あなたは大学入試の塔の全{UNIV_BOSSES.length}階を制覇しました。ここに合格を証します。</span>
                    <span className="univ-diploma-day">{day.replace(/-/g, '/')}　モンスター塔 学長 アカモンドラゴン</span>
                  </div>
                )
              )
            })()}
            <Castle
              name="大学入試の塔"
              theme="tower"
              onChest={onRankBonus}
              goLabel="⚔ 挑戦"
              againLabel="👑 もう一度"
              floors={UNIV_BOSSES.map((b, i) => ({ id: b.id, label: b.name, sub: `${b.hint}・HP${b.hp}・🪙${b.coins}・${i >= 3 ? '難関大' : '入試'}の長文`, fig: <BossFigure hit={false} look={b} />, cleared: !!univ[b.id] }))}
              onOpen={(id) => setUnivFight(UNIV_BOSSES.find((b) => b.id === id)!)}
            />
            <p className="univ-rule">下の階から順に挑戦・高校の文法と入試の長文</p>
          </details>
          )}
          {specialEvent !== 'gold' && specialEvent !== 'univ' && <EventScene id={specialEvent} />}
          {specialEvent !== 'gold' && specialEvent !== 'univ' && (
            <div className="boss-modes">
              {specialEvent === 'endless' && <button className="boss-btn endless-boss" onClick={() => setEndless({ floor: 1, hearts: HEARTS, won: false })}>
        <span className="lg-icon" aria-hidden="true">🗼</span><span className="mode-name">エンドレスの塔</span>{endlessBest > 0 && <span className="mode-badge">最高 {endlessBest}階</span>}
      </button>}
              {specialEvent === 'rush-ex' && <button className="boss-btn rush-boss ex" onClick={() => setRush({ round: 0, hearts: HEARTS, won: false, ex: true })}>
          <span className="lg-icon" aria-hidden="true">🌟</span><span className="mode-name">週末限定ボスラッシュEX</span>{rushExDone && <span className="mode-badge">✅ クリア</span>}
        </button>}
              {specialEvent === 'rush' && <button className="boss-btn rush-boss" onClick={() => setRush({ round: 0, hearts: HEARTS, won: false })}>
        <span className="lg-icon" aria-hidden="true">🔥</span><span className="mode-name">ボスラッシュ</span>{rushDone && <span className="mode-badge">✅ クリア</span>}
      </button>}
              {specialEvent === 'night' && <button className="boss-btn night-boss" onClick={() => setNightFight(true)}>
          <span className="lg-icon" aria-hidden="true">🌃</span><span className="mode-name">ナイトボス</span>{nightDay === dayKey() && <span className="mode-badge">✅ クリア</span>}
        </button>}
              {specialEvent === 'weekend' && <button className="boss-btn weekend-boss" onClick={() => setWeekendFight(true)}>
          <span className="lg-icon" aria-hidden="true">🌙</span><span className="mode-name">週末ボス</span>{weekendWeek === week && <span className="mode-badge">✅ クリア</span>}
        </button>}
              {specialEvent === 'time' && <button className="boss-btn rush-boss" onClick={() => setTimeAttack(true)}>
        <span className="lg-icon" aria-hidden="true">⏱️</span><span className="mode-name">ボスのタイムアタック</span>{loadBossTaBest() > 0 && <span className="mode-badge">ベスト {loadBossTaBest()}</span>}
      </button>}
              {specialEvent === 'quest' && (
                <button className="boss-btn quest-boss" aria-label={`特別クエスト：${questBossOf(dayKey()).look.name}${questDay === dayKey() ? '（クリア）' : '（強敵）'}`} onClick={() => setQuestFight(true)}>
                  <span className="lg-icon" aria-hidden="true">👑</span><span className="mode-name">{questBossOf(dayKey()).look.name}</span>{questDay === dayKey() ? <span className="mode-badge">✅ クリア</span> : <span className="mode-badge">強敵</span>}
                </button>
              )}
              {specialEvent === 'rare' && <button className="boss-btn rare-boss" onClick={() => setRareFight(true)}>
        <span className="lg-icon" aria-hidden="true">✨</span><span className="mode-name">今週のレアボス</span>{rareWeek === week && <span className="mode-badge">✅ クリア</span>}
      </button>}
            </div>
          )}
        </div>
      )}
      {goldenLevelOf(LEVELS, dayKey()) && <p className="golden-boss-note">✨ 今日は「{goldenLevelOf(LEVELS, dayKey())}」のボスが金色 +🪙{GOLDEN_COINS}</p>}
      {daily && (
        <button
          className="boss-go-btn daily-boss"
          onClick={() => {
            setDailyFight(1)
            setFighting(daily)
          }}
        >
          <span className="boss-go-fig" aria-hidden="true">
            <BossArena bg={bossBgOf(daily)} color={BOSSES[daily].color} />
            <BossFigure hit={false} look={BOSSES[daily]} />
          </span>
          <span className="boss-go-text">
            <strong>⚔️ 今日のボス：{BOSSES[daily].name}</strong>
            <small className="boss-go-trait">とくぎ {BOSS_TRAITS[bossTraits(BOSSES[daily].name)[0]].icon} {BOSS_TRAITS[bossTraits(BOSSES[daily].name)[0]].name}</small>
            <small title="単語・文法・読解の3人で戦う">TEAM BATTLE 🔤📐📖</small>
          </span>
          {dailyDone && <span className="mode-badge">✅ クリア</span>}
        </button>
      )}
      {daily && !dailyDone && (
        <div className="daily-stars">
          <span className="daily-stars-label">強さを選ぶ：</span>
          {[2, 3].map((n) => (
            <button
              key={n}
              className={`list-link star-pick star-${n}`}
              title={`HP${dailyHp(n)}・コイン${n}倍`}
              aria-label={`${'★'.repeat(n)}（HP${dailyHp(n)}・🪙×${n}）`}
              onClick={() => {
                setDailyFight(n)
                setFighting(daily)
              }}
            >
              <span aria-hidden="true">{'★'.repeat(n)}</span> {n === 2 ? 'つよい' : 'さいきょう'} 🪙×{n}
            </button>
          ))}
        </div>
      )}
      </>
      )}
      {part !== 'boss' && (
      <>
      <p className="stats-note">6問正解でクリア！</p>
      {(() => {
        const nextStage = levels.flatMap(stagesOf).find((st) => isUnlocked(st, record) && !(record[st.id] >= 1))
        return nextStage ? (
          <button
            className="flip continue-btn stage-continue"
            onClick={() => {
              setPlaying(nextStage)
              setResult(null)
            }}
          >
            ▶ つづきから（{nextStage.level} ステージ{nextStage.no}）
          </button>
        ) : null
      })()}
      <div className="stage-levels">
      {levels.map((level) => {
        const list = stagesOf(level)
        const stars = list.reduce((a, s) => a + (record[s.id] ?? 0), 0)
        // 解放ずみが2つ以下でボスもまだなら、3列にならべて縦に長くしない
        const compact = list.filter((s) => isUnlocked(s, record)).length <= 2 && !bossUnlocked(level, record)
        return (
          <div key={level} className={`stage-level${compact ? ' compact' : ''}`}>
            <h3>
              {level} <span className="stage-total">★{stars}</span>
              {medalFor(learnedPct[level] ?? 0) && (
                <span className="stage-medal" role="img" aria-label={`メダル（定着率${learnedPct[level]}%）`}>
                  {medalFor(learnedPct[level] ?? 0)}
                </span>
              )}
              {allThreeStars(level, record) && (
                <span className="stage-trophy" role="img" aria-label="トロフィー（全ステージ星3）">
                  🏆
                </span>
              )}
            </h3>
            <div className="stage-grid">
              {/* まだ先が長く見えて疲れないよう、解放ずみのステージだけ見せる（クリアすると次が出てくる） */}
              {list.filter((s) => isUnlocked(s, record)).map((s) => {
                return (
                  <button
                    key={s.id}
                    className={`stage-btn${record[s.id] ? ' cleared' : ''}`}
                    aria-label={`${level} ステージ${s.no}`}
                    onClick={() => {
                      setPlaying(s)
                      setResult(null)
                    }}
                  >
                    <span className="stage-no">{s.no}</span>
                    <span className="stage-stars">{starText(record[s.id] ?? 0)}</span>
                  </button>
                )
              })}
            </div>
            {bossUnlocked(level, record) ? (
              <>
                <button className={`boss-btn${boss[level] ? ' beaten' : ''}`} onClick={() => setFighting(level)}>
                  {boss[level] ? `👑 ${BOSSES[level].name} 撃破ずみ（もう一度戦う）` : `👹 ボス「${BOSSES[level].name}」に挑戦！`}
                </button>
                {boss[level] && (
                  <button
                    className="boss-btn strong-boss"
                    onClick={() => {
                      setStrong(true)
                      setFighting(level)
                    }}
                  >
                    💪 強化版「{BOSSES[level].name}」に挑む（HP{STRONG_HP}・勝つと🪙{STRONG_COINS}）
                  </button>
                )}
                {boss[level] && (
                  <button
                    className="boss-btn strong-boss sudden-boss"
                    onClick={() => {
                      setSudden(true)
                      setFighting(level)
                    }}
                  >
                    💀 サドンデス（ハート1つ・勝つと🪙{SUDDEN_COINS}）
                  </button>
                )}
              </>
            ) : (
              null
            )}
          </div>
        )
      })}
      </div>
      </>
      )}
    </section>
  )
}
