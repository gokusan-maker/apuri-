import type { ComponentProps } from 'react'
import { medalFor } from './medal'
import { useState } from 'react'
import type { Source } from './monster'
import { BOSS_REMATCH_XP, BOSS_XP, BOSSES, bossUnlocked, DAILY_BOSS_COINS, dailyBossLevel, HEARTS, RUSH_COINS, RUSH_EX_COINS, RUSH_EX_LEVELS, RUSH_LEVELS, type BossRecord } from './boss'
import { dayKey } from './srs'
import { Boss, BossFigure } from './BossView'
import type { BattleBag, BattleItemId } from './battleitems'
import { BossBook } from './BossBookView'
import { ENDLESS_REWARD_COINS, endlessHp, endlessLevel, endlessLook, loadEndlessBest, rewardsBetween, saveEndlessBest } from './endless'
import { loadRareWeek, RARE_HP, rareBossOf, saveRareWeek, weekKey } from './rareboss'
import { loadUniv, saveUniv, UNIV_BOSSES, univGraduated, univUnlocked, type UnivBoss } from './univ'
import { openTreasure, type Treasure } from './treasure'
import { usePersistent } from './usePersistent'
import { Quiz } from './QuizView'
import { allThreeStars, isUnlocked, starsFor, stagesOf, STAGE_SIZE, type Stage, type StageRecord } from './stages'
import { WORDS, wordsOf, type Level, type Word } from './words'

type Props = {
  levels: Level[]
  record: StageRecord
  onClear: (id: string, stars: number) => void
  onTreasure?: (t: Treasure) => void // クリアの宝箱をあけた
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  boss?: BossRecord
  onBossWin?: (level: Level) => void
  dailyDone?: boolean // 今日のボスにもう勝った
  onDailyWin?: () => void
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
  onSkill?: () => void // 相棒の特技が出た
  onDrop?: (id: BattleItemId) => void // ボスがアイテムをおとした
  onRareWin?: () => void // 今週のレアボスをはじめて倒した（ごほうびはアプリ側）
}

export const STAR3_COINS = 20
// 中学のボスは4問に1問が文法問題
const GRAMMAR_BOSS_LEVELS: Level[] = ['中1', '中2', '中3']

const starText = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n)

export function Stages({ levels, record, onClear, onTreasure, onAnswer, boss = {}, onBossWin, onSpend, onStudy, learnedPct = {}, dailyDone = false, onDailyWin, onUnivWin, partner, onRareWin, onRankBonus, onRushClear, rushDone = false, weekend = false, rushExDone = false, onEndlessReward, bag, onUseItem, onBossDefeat, onSkill, onDrop }: Props) {
  const daily = dailyBossLevel(levels, dayKey())
  const [dailyFight, setDailyFight] = useState(false)
  const [playing, setPlaying] = useState<Stage | null>(null)
  const [result, setResult] = useState<number | null>(null)
  const [round, setRound] = useState(0)
  const [fighting, setFighting] = useState<Level | null>(null)
  const [firstThree, setFirstThree] = useState(false)
  const [treasure, setTreasure] = useState<Treasure | null>(null)
  const [univ, setUniv] = usePersistent(loadUniv, saveUniv)
  const [rareWeek, setRareWeek] = usePersistent(loadRareWeek, saveRareWeek)
  const [rareFight, setRareFight] = useState(false)
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
        key={univFight.id}
        level="高校基礎"
        words={wordsOf(univFight.levels)}
        look={univFight}
        title={`🏯 大学入試の塔 ${univFight.floor}`}
        hp={univFight.hp}
        grammar
        partner={partner}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onRankBonus={onRankBonus}
        bonus={first ? BOSS_XP : BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onAnswer}
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
        key={`endless-${f}`}
        level={lv}
        words={wordsOf([lv])}
        look={endlessLook(f)}
        hp={endlessHp(f)}
        noBook
        title={`🗼 エンドレスの塔 ${f}階（最高 ${endlessBest}階）`}
        startHearts={endless.hearts}
        winLabel={`${f + 1}階へ ▶（ハート${endless.hearts}を引き継ぐ）`}
        partner={partner}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        bonus={BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onAnswer}
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
        key={`rush-${rush.round}`}
        level={lv}
        words={wordsOf([lv])}
        title={`🔥 ボスラッシュ${rush.ex ? 'EX' : ''} ${rush.round + 1} / ${levels.length}`}
        startHearts={rush.hearts}
        winLabel={last ? 'ラッシュ完全クリア！ ステージにもどる' : `次のボスへ ▶（ハート${rush.hearts}を引き継ぐ）`}
        partner={partner}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        bonus={BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onAnswer}
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

  if (rareFight) {
    return (
      <Boss
        level={rare.level}
        words={wordsOf([rare.level])}
        look={rare.look}
        title="✨ 今週のレアボス"
        hp={RARE_HP}
        partner={partner}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onRankBonus={onRankBonus}
        bonus={BOSS_REMATCH_XP}
        onSpend={onSpend}
        onAnswer={onAnswer}
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
    return (
      <Boss
        level={fighting}
        words={wordsOf([fighting])}
        grammar={GRAMMAR_BOSS_LEVELS.includes(fighting)}
        partner={partner}
        bag={bag}
        onUseItem={onUseItem}
        onDefeat={onBossDefeat}
        onSkill={onSkill}
        onDrop={onDrop}
        onRankBonus={onRankBonus}
        bonus={boss[fighting] ? BOSS_REMATCH_XP : BOSS_XP}
        onSpend={onSpend}
        onAnswer={onAnswer}
        onWin={() => {
          onBossWin?.(fighting)
          if (dailyFight) onDailyWin?.()
        }}
        onExit={() => {
          setFighting(null)
          setDailyFight(false)
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
      <BossBook />
      <details className="univ-tower" open={Object.keys(univ).length > 0}>
        <summary>
          🏯 大学入試の塔（{Object.keys(univ).length} / {UNIV_BOSSES.length} 階クリア）
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
        <p className="stats-note">大学にちなんだボスが待つ塔。下の階から順に挑戦しよう（高校基礎・熟語の単語と、4問に1問は文法問題）。</p>
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
      <button className="boss-btn endless-boss" onClick={() => setEndless({ floor: 1, hearts: HEARTS, won: false })}>
        🗼 エンドレスの塔（最高 {endlessBest}階）10階ごとに 🪙{ENDLESS_REWARD_COINS}＋🎟
      </button>
      {weekend && (
        <button className="boss-btn rush-boss ex" onClick={() => setRush({ round: 0, hearts: HEARTS, won: false, ex: true })}>
          {rushExDone ? '✅ 今日のボスラッシュEXは完全クリア！（もう一度挑戦）' : `🌟 週末限定ボスラッシュEX（中3・高校基礎・熟語）全部たおすと 🪙${RUSH_EX_COINS}＋🎟2`}
        </button>
      )}
      <button className="boss-btn rush-boss" onClick={() => setRush({ round: 0, hearts: HEARTS, won: false })}>
        {rushDone ? '✅ 今日のボスラッシュは完全クリア！（もう一度挑戦）' : `🔥 ボスラッシュ（3連戦・ハート引き継ぎ）全部たおすと 🪙${RUSH_COINS}＋🎟`}
      </button>
      <button className="boss-btn rare-boss" onClick={() => setRareFight(true)}>
        {rareWeek === week ? `✅ 今週のレアボス「${rare.look.name}」はたおした！（もう一度戦う）` : `✨ 今週のレアボス「${rare.look.name}」に勝つと 色ちがい確定のタマゴ！`}
      </button>
      {daily && (
        <button
          className="boss-btn daily-boss"
          onClick={() => {
            setDailyFight(true)
            setFighting(daily)
          }}
        >
          {dailyDone ? `✅ 今日のボス「${BOSSES[daily].name}」はたおした！（もう一度戦う）` : `⚔️ 今日のボス「${BOSSES[daily].name}」（${daily}）に勝つと 🪙${DAILY_BOSS_COINS}`}
        </button>
      )}
      <p className="stats-note">10語ずつのステージ。6問以上正解でクリアして、次のステージへ！</p>
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
              <button className={`boss-btn${boss[level] ? ' beaten' : ''}`} onClick={() => setFighting(level)}>
                {boss[level] ? `👑 ${BOSSES[level].name} 撃破ずみ（もう一度戦う）` : `👹 ボス「${BOSSES[level].name}」に挑戦！`}
              </button>
            ) : (
              <p className="boss-locked">🔒 全ステージをクリアするとボスが出現</p>
            )}
          </div>
        )
      })}
    </section>
  )
}
