import { BossTime } from './BossTimeView'
import type { ComponentProps } from 'react'
import { medalFor } from './medal'
import { useState } from 'react'
import type { Source } from './monster'
import { BOSS_REMATCH_XP, BOSS_XP, BOSSES, bossUnlocked, DAILY_BOSS_COINS, dailyBossLevel, HEARTS, dailyHp, loadBossTaBest, STRONG_COINS, SUDDEN_COINS, STRONG_HP, GOLDEN_COINS, goldenLevelOf, RUSH_COINS, RUSH_EX_COINS, STREAK_COINS, STREAK_EVERY, RUSH_EX_LEVELS, RUSH_LEVELS, type BossRecord } from './boss'
import { dayKey } from './srs'
import { Boss, BossFigure } from './BossView'
import type { BattleBag, BattleItemId } from './battleitems'
import { BossBook } from './BossBookView'
import { ENDLESS_REWARD_COINS, endlessHp, endlessLevel, endlessLook, loadEndlessBest, rewardsBetween, saveEndlessBest } from './endless'
import { isNightTime, loadNightDay, NIGHT_COINS, nightBossOf, saveNightDay, loadRareWeek, loadWeekendWeek, RARE_HP, rareBossOf, saveRareWeek, saveWeekendWeek, WEEKEND_HP, weekendBossOf, weekKey } from './rareboss'
import { loadUniv, saveUniv, UNIV_BOSSES, univGraduated, univUnlocked, type UnivBoss } from './univ'
import { GOLD_COINS, KEYS_FOR_GOLD, openTreasure, type Treasure } from './treasure'
import { usePersistent } from './usePersistent'
import { Quiz } from './QuizView'
import { allThreeStars, isUnlocked, starsFor, stagesOf, STAGE_SIZE, type Stage, type StageRecord } from './stages'
import { LEVELS, WORDS, wordsOf, type Level, type Word } from './words'

type Props = {
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
  onRareWin?: () => void // 今週のレアボスをはじめて倒した（ごほうびはアプリ側）
  onWeekendWin?: () => void // 週末ボスをその週末はじめて倒した
}

export const STAR3_COINS = 20
// 中学のボスは4問に1問が文法問題
const GRAMMAR_BOSS_LEVELS: Level[] = ['中1', '中2', '中3']

const starText = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n)

export function Stages({ levels, record, onClear, onTreasure, onAnswer, boss = {}, onBossWin, onSpend, onStudy, learnedPct = {}, dailyDone = false, onDailyWin, onUnivWin, partner, power = 0, hour = 12, onRareWin, onWeekendWin, onRankBonus, onRushClear, rushDone = false, weekend = false, rushExDone = false, onEndlessReward, bag, onUseItem, onBossDefeat, onSkill, onDrop, keys = 0, onOpenGold, winStreak = 0, onLose, startDaily = false, onReadingAnswer, readingBuddy }: Props) {
  const daily = dailyBossLevel(levels, dayKey())
  const [dailyFight, setDailyFight] = useState(startDaily && daily ? 1 : 0) // 今日のボスの強さ（0は今日のボスではない）
  const [playing, setPlaying] = useState<Stage | null>(null)
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
  const [timeAttack, setTimeAttack] = useState(false)
  const [strong, setStrong] = useState(false) // 強化版のボス
  const [sudden, setSudden] = useState(false) // サドンデス（ハート1つ）
  const [nightFight, setNightFight] = useState(false)
  const [nightDay, setNightDay] = usePersistent(loadNightDay, saveNightDay)
  const [rush, setRush] = useState<{ round: number; hearts: number; won: boolean; ex?: boolean } | null>(null)
  const [endless, setEndless] = useState<{ floor: number; hearts: number; won: boolean } | null>(null)
  const [endlessBest, setEndlessBest] = usePersistent(loadEndlessBest, saveEndlessBest)
  const week = weekKey(dayKey())
  const rare = rareBossOf(week)
  const [univFight, setUnivFight] = useState<UnivBoss | null>(null)

  if (univFight) {
    const first = !univ[univFight.id]
    return (
      <Boss
        reading
        winBuddy={readingBuddy}
        key={univFight.id}
        level="高校基礎"
        words={wordsOf(univFight.levels)}
        look={univFight}
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
        note={f === 1 ? `負けるまでどこまでのぼれるか挑戦！ 10階ごとに 🪙${ENDLESS_REWARD_COINS}＋🎟（最高 ${endlessBest}階）` : undefined}
        startHearts={endless.hearts}
        winLabel={`${f + 1}階へ ▶（ハート${endless.hearts}を引き継ぐ）`}
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
        note={rush.round === 0 ? (rush.ex ? `中3・高校基礎・熟語のボスと3連戦（ハートは引き継ぎ）。全部たおすと 🪙${RUSH_EX_COINS}＋🎟2` : `ボスと3連戦（ハートは引き継ぎ）。全部たおすと 🪙${RUSH_COINS}＋🎟`) : undefined}
        startHearts={rush.hearts}
        winLabel={last ? 'ラッシュ完全クリア！ ステージにもどる' : `次のボスへ ▶（ハート${rush.hearts}を引き継ぐ）`}
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

  if (weekendFight) {
    const wb = weekendBossOf(week)
    return (
      <Boss
        reading
        winBuddy={readingBuddy}
        level={wb.level}
        words={wordsOf([wb.level])}
        look={wb.look}
        title="🌙 週末ボス"
        note={`週末だけのボス「${wb.look.name}」（HP${WEEKEND_HP}）。たおすと 🎟1`}
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
        reading
        winBuddy={readingBuddy}
        level={rare.level}
        words={wordsOf([rare.level])}
        look={rare.look}
        title="✨ 今週のレアボス"
        note={`今週のレアボス「${rare.look.name}」に勝つと 色ちがい確定のタマゴ！`}
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
        key={fighting}
        reading
        winBuddy={readingBuddy}
        nextBoss={nextLevel ? { label: `次のボスへ ▶ ${BOSSES[nextLevel].name}`, onClick: () => setFighting(nextLevel) } : undefined}
        level={fighting}
        words={wordsOf([fighting])}
        golden={fighting === goldenLevelOf(LEVELS, dayKey())}
        hp={dailyFight ? dailyHp(dailyFight) : strong ? STRONG_HP : undefined}
        title={dailyFight ? `⚔️ 今日のボス ${'★'.repeat(dailyFight)}` : strong ? `💪 強化版の${fighting}ボス` : sudden ? `💀 サドンデス：${fighting}ボス` : undefined}
        note={dailyFight && daily ? `今日のボス「${BOSSES[daily].name}」（${daily}）。勝つと 🪙${DAILY_BOSS_COINS}${dailyFight > 1 ? `×${dailyFight}` : ''}` : undefined}
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
        <div className="stage-head">
          <button
            className="stage-back"
            onClick={() => {
              setPlaying(null)
              setResult(null)
            }}
          >
            ← ステージ一覧
          </button>
          <span>
            {playing.level} ステージ{playing.no}
          </span>
          {onStudy && result === null && (
            <button className="note-btn" onClick={() => onStudy(playing.words)}>
              📖 カードで予習
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
              '6問以上正解でクリア。もう一度！'
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
                onClick={() => {
                  setPlaying(stagesOf(playing.level)[playing.no])
                  setResult(null)
                  setTreasure(null)
                  window.scrollTo?.({ top: 0 })
                }}
              >
                次のステージへ ▶（{playing.level} ステージ{playing.no + 1}）
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

  return (
    <section className="card stages">
      <h2>ステージ</h2>
      {winStreak > 0 && (
        <p className="win-streak">
          🔥 ボス {winStreak}連勝中！（{STREAK_EVERY}連勝ごとに 🪙{STREAK_COINS}・負けるとリセット）
        </p>
      )}
      <div className="gold-chest">
        <span>🗝 金の宝箱の鍵 {'🔑'.repeat(Math.min(keys, KEYS_FOR_GOLD))}{'▫️'.repeat(Math.max(0, KEYS_FOR_GOLD - keys))}</span>
        {keys >= KEYS_FOR_GOLD && onOpenGold && (
          <button className="treasure-btn" onClick={onOpenGold}>
            🎁 金の宝箱をあける（🎟＋🪙{GOLD_COINS}）
          </button>
        )}
      </div>
      <BossBook
        onFight={(name) => {
          const lv = (Object.keys(BOSSES) as Level[]).find((l) => BOSSES[l].name === name)
          if (lv) {
            setFighting(lv)
            window.scrollTo?.({ top: 0 })
          }
        }}
      />
      <details className="univ-tower" open={Object.keys(univ).length > 0}>
        <summary>
          🏯 大学入試の塔<span className="mode-badge" aria-label={`${Object.keys(univ).length} / ${UNIV_BOSSES.length} 階クリア`}>{Object.keys(univ).length}/{UNIV_BOSSES.length}階</span>
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
        <p className="stats-note">下の階から順に挑戦（高校基礎・熟語＋文法）</p>
        <ol className="univ-floors">
          {[...UNIV_BOSSES].reverse().map((b) => {
            const i = UNIV_BOSSES.indexOf(b)
            const open = univUnlocked(i, univ)
            return (
              <li key={b.id} className={univ[b.id] ? 'beaten' : open ? 'open' : 'locked'}>
                <span className="univ-figure">
                  <BossFigure hit={false} look={open ? b : { ...b, color: '#9ca3af', line: '#6b7280', eye: '#e5e7eb' }} />
                </span>
                <span className="univ-info">
                  <strong>
                    {b.floor} {open ? b.name : '？？？'}
                  </strong>
                  <span className="univ-hint">
                    {b.hint}
                    {open && `・HP${b.hp}・🪙${b.coins}`}
                  </span>
                </span>
                {open && (
                  <button className="boss-btn" onClick={() => setUnivFight(b)}>
                    {univ[b.id] ? '👑 もう一度' : '⚔ 挑戦'}
                  </button>
                )}
              </li>
            )
          })}
        </ol>
      </details>
      <div className="boss-modes">
      <button className="boss-btn endless-boss" onClick={() => setEndless({ floor: 1, hearts: HEARTS, won: false })}>
        🗼 エンドレスの塔{endlessBest > 0 && <span className="mode-badge">最高 {endlessBest}階</span>}
      </button>
      {weekend && (
        <button className="boss-btn rush-boss ex" onClick={() => setRush({ round: 0, hearts: HEARTS, won: false, ex: true })}>
          🌟 週末限定ボスラッシュEX{rushExDone && <span className="mode-badge">✅ クリア</span>}
        </button>
      )}
      <button className="boss-btn rush-boss" onClick={() => setRush({ round: 0, hearts: HEARTS, won: false })}>
        🔥 ボスラッシュ{rushDone && <span className="mode-badge">✅ クリア</span>}
      </button>
      {isNightTime(hour) && (
        <button className="boss-btn night-boss" onClick={() => setNightFight(true)}>
          🌃 ナイトボス{nightDay === dayKey() && <span className="mode-badge">✅ クリア</span>}
        </button>
      )}
      {weekend && (
        <button className="boss-btn weekend-boss" onClick={() => setWeekendFight(true)}>
          🌙 週末ボス{weekendWeek === week && <span className="mode-badge">✅ クリア</span>}
        </button>
      )}
      <button className="boss-btn rush-boss" onClick={() => setTimeAttack(true)}>
        ⏱ ボスのタイムアタック{loadBossTaBest() > 0 && <span className="mode-badge">ベスト {loadBossTaBest()}</span>}
      </button>
      <button className="boss-btn rare-boss" onClick={() => setRareFight(true)}>
        ✨ 今週のレアボス{rareWeek === week && <span className="mode-badge">✅ クリア</span>}
      </button>
      </div>
      {goldenLevelOf(LEVELS, dayKey()) && <p className="golden-boss-note">✨ 金色ボス：{goldenLevelOf(LEVELS, dayKey())}（+🪙{GOLDEN_COINS}）</p>}
      {daily && (
        <button
          className="boss-btn daily-boss"
          onClick={() => {
            setDailyFight(1)
            setFighting(daily)
          }}
        >
          ⚔️ 今日のボス{dailyDone && <span className="mode-badge">✅ クリア</span>}
        </button>
      )}
      {daily && !dailyDone && (
        <div className="daily-stars">
          <span className="daily-stars-label">強さを選ぶ：</span>
          {[2, 3].map((n) => (
            <button
              key={n}
              className="list-link"
              onClick={() => {
                setDailyFight(n)
                setFighting(daily)
              }}
            >
              {'★'.repeat(n)}（HP{dailyHp(n)}・🪙×{n}）
            </button>
          ))}
        </div>
      )}
      <p className="stats-note">6問正解でクリア！</p>
      {(() => {
        const nextStage = levels.flatMap(stagesOf).find((st) => isUnlocked(st, record) && !(record[st.id] >= 1))
        return nextStage ? (
          <button
            className="flip continue-btn"
            onClick={() => {
              setPlaying(nextStage)
              setResult(null)
            }}
          >
            ▶ つづきから（{nextStage.level} ステージ{nextStage.no}）
          </button>
        ) : null
      })()}
      {levels.map((level) => {
        const list = stagesOf(level)
        const stars = list.reduce((a, s) => a + (record[s.id] ?? 0), 0)
        return (
          <div key={level} className="stage-level">
            <h3>
              {level} <span className="stage-total">★{stars} / {list.length * 3}</span>
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
              {list.map((s) => {
                const open = isUnlocked(s, record)
                return (
                  <button
                    key={s.id}
                    className={`stage-btn${record[s.id] ? ' cleared' : ''}`}
                    disabled={!open}
                    aria-label={`${level} ステージ${s.no}${open ? '' : '（ロック中）'}`}
                    onClick={() => {
                      setPlaying(s)
                      setResult(null)
                    }}
                  >
                    <span className="stage-no">{open ? s.no : '🔒'}</span>
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
              <p className="boss-locked">🔒 全ステージをクリアするとボスが出現</p>
            )}
          </div>
        )
      })}
    </section>
  )
}
