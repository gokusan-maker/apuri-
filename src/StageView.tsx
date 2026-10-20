import { useState } from 'react'
import type { Source } from './monster'
import { BOSS_REMATCH_XP, BOSS_XP, BOSSES, bossUnlocked, type BossRecord } from './boss'
import { Boss } from './BossView'
import { Quiz } from './QuizView'
import { isUnlocked, starsFor, stagesOf, STAGE_SIZE, type Stage, type StageRecord } from './stages'
import { WORDS, wordsOf, type Level } from './words'

type Props = {
  levels: Level[]
  record: StageRecord
  onClear: (id: string, stars: number) => void
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  boss?: BossRecord
  onBossWin?: (level: Level) => void
}

const starText = (n: number) => '★'.repeat(n) + '☆'.repeat(3 - n)

export function Stages({ levels, record, onClear, onAnswer, boss = {}, onBossWin }: Props) {
  const [playing, setPlaying] = useState<Stage | null>(null)
  const [result, setResult] = useState<number | null>(null)
  const [round, setRound] = useState(0)
  const [fighting, setFighting] = useState<Level | null>(null)

  if (fighting) {
    return (
      <Boss
        level={fighting}
        words={wordsOf([fighting])}
        bonus={boss[fighting] ? BOSS_REMATCH_XP : BOSS_XP}
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
            {result > 0 ? `クリア！ ${starText(result)}` : '6問以上正解でクリア。もう一度！'}
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
      {levels.map((level) => {
        const list = stagesOf(level)
        const stars = list.reduce((a, s) => a + (record[s.id] ?? 0), 0)
        return (
          <div key={level} className="stage-level">
            <h3>
              {level} <span className="stage-total">★{stars} / {list.length * 3}</span>
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
