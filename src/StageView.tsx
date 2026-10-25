import { PlayContext, usePlaying } from './playing'
import { BossTime } from './BossTimeView'
import { useContext, useState, type ComponentProps, type CSSProperties } from 'react'
import { medalFor } from './medal'
import type { Source } from './monster'
import { BOSS_REMATCH_XP, BOSS_XP, BOSSES, formatSec, loadBossTimes, bossUnlocked, DAILY_BOSS_COINS, dailyBossLevel, HEARTS, dailyHp, loadBossTaBest, STRONG_COINS, SUDDEN_COINS, STRONG_HP, GOLDEN_COINS, goldenLevelOf, RUSH_COINS, RUSH_EX_COINS, STREAK_COINS, STREAK_EVERY, RUSH_EX_LEVELS, RUSH_LEVELS, type BossRecord } from './boss'
import { dayKey } from './srs'
import { Boss, BossFigure } from './BossView'
import type { BattleBag, BattleItemId } from './battleitems'
import { BossBook } from './BossBookView'
import { SPECIAL_EVENT_NOTE, specialEventOf, type SpecialEventId } from './bossevent'
import { loadQuestDay, QUEST_COINS, QUEST_HP, questBossOf, saveQuestDay } from './questboss'
import { ENDLESS_REWARD_COINS, endlessHp, endlessLevel, endlessLook, loadEndlessBest, rewardsBetween, saveEndlessBest } from './endless'
import { loadNightDay, NIGHT_COINS, nightBossOf, saveNightDay, loadRareWeek, loadWeekendWeek, RARE_HP, rareBossOf, saveRareWeek, saveWeekendWeek, WEEKEND_HP, weekendBossOf, weekKey } from './rareboss'
import { loadUniv, saveUniv, univExam, UNIV_BOSSES, univGraduated, type UnivBoss } from './univ'
import { GOLD_COINS, KEYS_FOR_GOLD, openTreasure, type Treasure } from './treasure'
import { usePersistent } from './usePersistent'
import { Castle } from './CastleView'
import { BOSS_GROUPS, loadBossGroup, saveBossGroup, type BossGroup } from './bossfilter'
import { BossArea, type AreaSpecial } from './BossAreaView'
import { BossWorld } from './BossWorldView'
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
  const [group, setGroup] = useState(loadBossGroup) // ボスをレベルでしぼりこむ
  const [area, setArea] = useState<BossGroup | null>(null) // ボス部屋：まずレベルをえらぶページ、えらんだらそのエリアへ

  const inApp = useContext(PlayContext) !== null // App の中では、もどるは上の「ほかの問題をえらぶ」
  const backLabel = part === 'boss' ? '👹 ボスの一覧へ' : 'ステージにもどる' // 勝ったあとのボタン
  // ステージ・ボス戦の画面では、App の上に「ほかの問題をえらぶ」（おすとステージ・ボスの一覧へ）
  usePlaying(!!(univFight || endless || rush || timeAttack || nightFight || weekendFight || rareFight || fighting || playing), () => {
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

  const groupLabel = (id: BossGroup) => BOSS_GROUPS.find((g) => g.id === id)!.label.replace(/^\S+ /, '')
  // ボス部屋のさいしょ：レベルをえらぶページ（地図）
  if (part === 'boss' && area === null)
    return (
      <section className="card stages">
        <h2>👹 ボス部屋</h2>
        <p className="boss-pick-title">🎯 地図から行きたい地方をえらぼう</p>
        <BossWorld
          regions={BOSS_GROUPS.map((g) => {
            const lvs = LEVELS.filter((lv) => g.levels.includes(lv))
            return { id: g.id, name: groupLabel(g.id), sub: { jh: '中1〜中3', hs: '高校・熟語', adv: '英検2級〜', basic: '数・色など' }[g.id], done: lvs.filter((lv) => boss[lv]).length, total: lvs.length }
          })}
          onPick={(id) => {
            setGroup(id)
            saveBossGroup(id)
            setArea(id)
            window.scrollTo?.({ top: 0 })
          }}
        />
        {onCastleReward && <CastleCollection onReward={onCastleReward} />}
      </section>
    )
  // エリアに出現する特別なボス（今日のボス・とくべつイベント）
  const specials: AreaSpecial[] = [
    ...(daily ? [{ id: 'daily', icon: '👹', name: '今日のボス', badge: dailyDone ? '✅ クリア' : 'TEAM BATTLE', onClick: () => { setDailyFight(1); setFighting(daily) } }] : []),
    ...(specialEvent === 'rare' ? [{ id: 'rare', icon: '✨', name: '今週のレアボス', badge: rareWeek === week ? '✅ クリア' : 'レア', onClick: () => setRareFight(true) }] : []),
    ...(specialEvent === 'weekend' ? [{ id: 'weekend', icon: '🌙', name: '週末ボス', badge: weekendWeek === week ? '✅ クリア' : '週末だけ', onClick: () => setWeekendFight(true) }] : []),
    ...(specialEvent === 'night' ? [{ id: 'night', icon: '🌃', name: 'ナイトボス', badge: nightDay === dayKey() ? '✅ クリア' : '夜だけ', onClick: () => setNightFight(true) }] : []),
    ...(specialEvent === 'quest' ? [{ id: 'quest', icon: '👑', name: questBossOf(dayKey()).look.name, badge: questDay === dayKey() ? '✅ クリア' : '強敵', aria: `特別クエスト：${questBossOf(dayKey()).look.name}${questDay === dayKey() ? '（クリア）' : '（強敵）'}`, onClick: () => setQuestFight(true) }] : []),
    ...(specialEvent === 'rush' ? [{ id: 'rush', icon: '🔥', name: 'ボスラッシュ', badge: rushDone ? '✅ クリア' : undefined, onClick: () => setRush({ round: 0, hearts: HEARTS, won: false }) }] : []),
    ...(specialEvent === 'rush-ex' ? [{ id: 'rush-ex', icon: '🌟', name: 'ボスラッシュEX', badge: rushExDone ? '✅ クリア' : '週末限定', onClick: () => setRush({ round: 0, hearts: HEARTS, won: false, ex: true }) }] : []),
    ...(specialEvent === 'endless' ? [{ id: 'endless', icon: '🗼', name: 'エンドレスの塔', badge: endlessBest > 0 ? `最高 ${endlessBest}階` : undefined, onClick: () => setEndless({ floor: 1, hearts: HEARTS, won: false }) }] : []),
    ...(specialEvent === 'time' ? [{ id: 'time', icon: '⏱️', name: 'ボスのタイムアタック', badge: loadBossTaBest() > 0 ? `ベスト ${loadBossTaBest()}` : undefined, onClick: () => setTimeAttack(true) }] : []),
  ]

  const bossTimes = loadBossTimes() // ボスごとの最短タイム（タイルに小さく出す）
  return (
    <section className="card stages">
      <h2>{part === 'stages' ? '🗺 単語ステージ' : part === 'boss' ? '👹 ボスに挑戦' : 'ステージ'}</h2>
      {part !== 'stages' && (
      <>
      {/* ボスをえらぶ：単語帳ごとのボスを1体ずつ色つきのタイルでならべ、どのボスもタップで戦える（オーナーの要望） */}
      {part === 'boss' && (
        <>
        {area !== null && (
          <>
            <button className="list-link boss-area-back" onClick={() => setArea(null)}>
              ← レベルをえらびなおす
            </button>
            <BossArea
              name={groupLabel(group)}
              group={group}
              specials={specials}
              onCoins={onRankBonus}
              bosses={LEVELS.filter((lv) => BOSS_GROUPS.find((g) => g.id === group)!.levels.includes(lv)).map((lv) => ({
                id: lv,
                name: BOSSES[lv].name,
                look: BOSSES[lv],
                beaten: !!boss[lv],
                golden: lv === goldenLevelOf(LEVELS, dayKey()),
                onClick: () => {
                  setFighting(lv)
                  window.scrollTo?.({ top: 0 })
                },
              }))}
            />
          </>
        )}
        {(() => {
          const lvs = LEVELS.filter((lv) => BOSS_GROUPS.find((g) => g.id === group)!.levels.includes(lv))
          return (
            <Castle
              key={group}
              name={`${BOSS_GROUPS.find((g) => g.id === group)!.label.replace(/^\S+ /, '')}のボスの城`}
              theme="red"
              goLabel="⚔ 戦う"
              againLabel="👑 再戦"
              floors={lvs.map((lv) => ({ id: lv, label: BOSSES[lv].name, sub: `${lv}${lv === goldenLevelOf(LEVELS, dayKey()) ? '・✨金色' : ''}`, fig: <BossFigure hit={false} look={BOSSES[lv]} />, cleared: !!boss[lv] }))}
              onOpen={(id) => {
                setFighting(id as Level)
                window.scrollTo?.({ top: 0 })
              }}
            />
          )
        })()}
        <details className="boss-pick-fold">
          <summary>📋 ボスの一覧から自由にえらぶ</summary>
        <div className="boss-pick" role="group" aria-label="ボスをえらぶ">
          {LEVELS.filter((lv) => BOSS_GROUPS.find((g) => g.id === group)!.levels.includes(lv)).map((lv) => (
            <button
              key={lv}
              className={`boss-pick-tile${boss[lv] ? ' beaten' : ''}`}
              style={{ '--boss-c': BOSSES[lv].color } as CSSProperties}
              aria-label={`${lv}のボス「${BOSSES[lv].name}」に挑戦${boss[lv] ? '（撃破ずみ）' : ''}`}
              title={BOSSES[lv].desc}
              onClick={() => {
                setFighting(lv)
                window.scrollTo?.({ top: 0 })
              }}
            >
              {boss[lv] && <span className="boss-pick-crown" aria-hidden="true">👑</span>}
              {lv === goldenLevelOf(LEVELS, dayKey()) && <span className="boss-pick-gold" title={`今日は金色（+🪙${GOLDEN_COINS}）`}>✨金色</span>}
              <span className="boss-pick-fig">
                <BossFigure hit={false} look={BOSSES[lv]} />
              </span>
              <span className="boss-pick-name">{BOSSES[lv].name}</span>
              <small className="boss-pick-lv">
                {lv}
                {bossTimes[BOSSES[lv].name] !== undefined && <span className="boss-pick-time" title={`最短タイム ${formatSec(bossTimes[BOSSES[lv].name])}`}> ⏱{Math.floor(bossTimes[BOSSES[lv].name] / 60)}:{String(bossTimes[BOSSES[lv].name] % 60).padStart(2, '0')}</span>}
              </small>
            </button>
          ))}
        </div>
        </details>
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
      {specialEvent && (part !== 'boss' || specialEvent === 'gold' || specialEvent === 'univ') && (
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
              theme="red"
              onChest={onRankBonus}
              goLabel="⚔ 挑戦"
              againLabel="👑 もう一度"
              floors={UNIV_BOSSES.map((b, i) => ({ id: b.id, label: b.name, sub: `${b.hint}・HP${b.hp}・🪙${b.coins}・${i >= 3 ? '難関大' : '入試'}の長文`, fig: <BossFigure hit={false} look={b} />, cleared: !!univ[b.id] }))}
              onOpen={(id) => setUnivFight(UNIV_BOSSES.find((b) => b.id === id)!)}
            />
            <p className="univ-rule">下の階から順に挑戦・高校の文法と入試の長文</p>
          </details>
          )}
          {specialEvent !== 'gold' && specialEvent !== 'univ' && part !== 'boss' && (
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
      {daily && part !== 'boss' && (
        <button
          className="boss-go-btn daily-boss"
          onClick={() => {
            setDailyFight(1)
            setFighting(daily)
          }}
        >
          <span className="boss-go-fig" aria-hidden="true">
            👹
          </span>
          <span className="boss-go-text">
            <strong>⚔️ 今日のボス</strong>
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
