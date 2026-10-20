import { useState } from 'react'
import type { Source } from './monster'
import { BOSS_REMATCH_XP, BOSS_XP, BOSSES, bossUnlocked, type BossRecord } from './boss'
import { Boss } from './BossView'
import { Quiz } from './QuizView'
import { allThreeStars, isUnlocked, starsFor, stagesOf, STAGE_SIZE, type Stage, type StageRecord } from './stages'
import { WORDS, wordsOf, type Level } from './words'

type Props = {
  levels: Level[]
  record: StageRecord
  onClear: (id: string, stars: number) => void
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  boss?: BossRecord
  onBossWin?: (level: Level) => void
  onSpend?: (coins: number) => boolean
}

export const STAR3_COINS = 20

const starText = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n)

export function Stages({ levels, record, onClear, onAnswer, boss = {}, onBossWin, onSpend }: Props) {
  const [playing, setPlaying] = useState<Stage | null>(null)
  const [result, setResult] = useState<number | null>(null)
  const [round, setRound] = useState(0)
  const [fighting, setFighting] = useState<Level | null>(null)
  const [firstThree, setFirstThree] = useState(false)

  if (fighting) {
    return (
      <Boss
        level={fighting}
        words={wordsOf([fighting])}
        bonus={boss[fighting] ? BOSS_REMATCH_XP : BOSS_XP}
        onSpend={onSpend}
        onAnswer={onAnswer}
        onWin={() => onBossWin?.(fighting)}
        onExit={() => setFighting(null)}
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
