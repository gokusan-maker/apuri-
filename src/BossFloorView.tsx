import { useState } from 'react'
import type { BossLook, TeamQ } from './boss'
import { BossArena } from './BossArenaView'
import { BossFigure } from './BossView'
import { bcLivesOf, bcPassOf } from './bosscastle'
import { playCorrect, playWrong } from './sound'

// ボスの城の問題の階：単語は10問（8問以上）、ほかは5問（4問以上）正解でクリア。終わったらすぐ再チャレンジできる
// まちがえると自分のライフ（❤️）がへり、0になったら負け（オーナーの要望）
export function BossFloor({ title, qs, onDone, onBack, onRetry, taunt, reward = 0, best, boss }: { title: string; qs: TeamQ[]; onDone: (score: number) => void; onBack: () => void; onRetry?: () => void; taunt?: string; reward?: number; best?: number; boss?: BossLook }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0) // 連続正解
  const [hint, setHint] = useState(false)
  const maxLives = bcLivesOf(qs.length)
  const [lives, setLives] = useState(maxLives)
  const q = qs[i]
  const pass = bcPassOf(qs.length)
  const hurt = picked !== null && q !== undefined && picked !== q.answer
  const dead = lives <= 0
  // 自分のライフ：いまの問題で失ったハートは 💔 でわれる
  const lifeView = (
    <p className={`bfloor-life${dead ? ' empty' : ''}`} aria-label={`のこりライフ ${lives}`}>
      <span className="bfloor-life-label">あなたのライフ</span>
      {Array.from({ length: maxLives }, (_, k) =>
        k < lives ? (
          '❤️'
        ) : k === lives && hurt ? (
          <span key={`b${i}`} className="heart-break">
            💔
          </span>
        ) : (
          '🤍'
        ),
      )}
    </p>
  )
  // 階のボス：クリアに必要な正解数がそのままボスのHP。正解するたびにダメージ
  const bossHp = Math.max(0, pass - score)
  const bossView = boss && (
    <div className={`bfloor-boss${bossHp === 0 ? ' down' : ''}`}>
      <div className={`boss-figure${hurt ? ' attack' : ''}`}>
        <BossArena bg="castle" color={boss.color} />
        <BossFigure hit={picked !== null && picked === q?.answer} look={boss} />
      </div>
      <div className="boss-plate">
        <p className="boss-name">{bossHp === 0 ? `${boss.name}をたおした！` : `階のボス ${boss.name}`}</p>
        <div className="boss-hp" role="progressbar" aria-label="階のボスのHP" aria-valuemin={0} aria-valuemax={pass} aria-valuenow={bossHp}>
          <div className={`boss-hp-fill${bossHp / pass <= 0.25 ? ' low' : bossHp / pass <= 0.5 ? ' mid' : ''}`} style={{ width: `${(bossHp / pass) * 100}%` }} />
        </div>
        <p key={`hp${bossHp}`} className={`boss-hp-num${bossHp < pass ? ' hp-pop' : ''}`}>
          のこりHP {bossHp} / {pass}
        </p>
      </div>
    </div>
  )
  const retryBtn = onRetry && (
    <button className="good next-unit-btn bfloor-retry" onClick={onRetry}>
      🔁 再チャレンジ（{qs.length}問）
    </button>
  )
  if (!q)
    return (
      <section className="card bfloor battle-v2" aria-label={title}>
        {bossView}
        <p className={`stage-result${score >= pass ? ' clear' : ''}`} role="status">
          {dead ? `💀 ライフがなくなった… ${score}/${qs.length}問正解` : score >= pass ? `🏰 クリア！ ${score}/${qs.length}問正解` : `あと少し！ ${score}/${qs.length}問（${pass}問以上でクリア）`}
        </p>
        {!dead && (
          <p className="bfloor-life-left" aria-label={`のこりライフ ${lives} / ${maxLives}`}>
            のこりライフ {'❤️'.repeat(lives)}
            {'🤍'.repeat(maxLives - lives)}
          </p>
        )}
        {score === qs.length && <p className="bfloor-perfect">💯 パーフェクト！</p>}
        {best !== undefined && score > best && <p className="bfloor-best">🏅 自己ベスト更新！（前回まで {best}問）</p>}
        {score >= pass && reward > 0 && <p className="bfloor-reward">🪙 {reward}コイン ゲット！</p>}
        {score >= pass && taunt && <p className="bfloor-taunt">{taunt}</p>}
        {retryBtn}
        <button className={`${onRetry ? 'list-link' : 'good next-unit-btn'}`} onClick={onBack}>
          城にもどる
        </button>
      </section>
    )
  return (
    <section className={`card bfloor battle-v2${hurt ? ' hurt' : ''}${lives === 1 && maxLives > 1 ? ' pinch' : ''}`} aria-label={title}>
      <button className="list-link" onClick={onBack}>
        ← 城にもどる
      </button>
      <p className="bfloor-title">{title}</p>
      {bossView}
      {lifeView}
      {/* 3連続正解からコンボの表示 */}
      {picked !== null && combo >= 3 && (
        <p key={`combo${i}`} className="bfloor-combo" role="status">
          🔥 {combo}連続正解！
        </p>
      )}
      {/* のこりライフ1つ：あと1回まちがえると負け */}
      {lives === 1 && maxLives > 1 && picked === null && <p className="bfloor-pinch">⚠ ピンチ！ あと1回まちがえると負け</p>}
      {/* まちがえたら階のボスのこうげき（ボス戦と同じ演出） */}
      {hurt && boss && (
        <>
          <div key={`atk${i}`} className="boss-atk-fx" aria-hidden="true">
            <span className="slash s1" />
            <span className="slash s2" />
            <span className="slash s3" />
          </div>
          <p className="bfloor-atk" role="status">
            💥 {boss.name}のこうげき！ ライフ -1
          </p>
        </>
      )}
      <p className="bfloor-count">
        {i + 1} / {qs.length}
      </p>
      {/* クリアまであと何問：正解の数と目標を星で見せる */}
      <p className={`bfloor-goal${score >= pass ? ' done' : ''}`} aria-label={`正解 ${score}問 ／ クリアは${pass}問`}>
        {Array.from({ length: pass }, (_, k) => (k < score ? '★' : '☆')).join('')}
        <span>{score >= pass ? ' クリア確定！' : ` あと${pass - score}問正解でクリア`}</span>
      </p>
      {/* 最後の問題：ラスト1問の合図 */}
      {i === qs.length - 1 && picked === null && <p className="bfloor-last">🔔 ラスト1問！</p>}
      <p className={`bfloor-q team-${q.team}`}>{q.word.en}</p>
      {q.hint && picked === null && !hint && (
        <button className="hint-5050" onClick={() => setHint(true)}>
          💡 ヒント
        </button>
      )}
      {hint && picked === null && q.hint && <p className="read-hint-text">💡 {q.hint}</p>}
      <div className="choices">
        {q.choices.map((c, k) => (
          <button
            key={c}
            className={`choice${picked !== null && k === q.answer ? ' correct' : ''}${picked === k && k !== q.answer ? ' wrong' : ''}`}
            disabled={picked !== null}
            onClick={() => {
              setPicked(k)
              if (k === q.answer) {
                setScore(score + 1)
                setCombo(combo + 1)
                playCorrect()
              } else {
                setCombo(0)
                setLives(lives - 1)
                playWrong()
              }
            }}
          >
            {c}
          </button>
        ))}
      </div>
      {picked !== null && (
        <button
          className="good next-unit-btn"
          onClick={() => {
            // ライフが0になったら、のこりの問題はとばして結果へ
            const last = i === qs.length - 1 || dead
            setI(dead ? qs.length : i + 1)
            setPicked(null)
            setHint(false)
            if (last) onDone(score)
          }}
        >
          {i === qs.length - 1 || dead ? '結果を見る' : '次へ'}
        </button>
      )}
      {/* 最後の問題に答えたら、結果を見なくてもすぐ再チャレンジできる */}
      {dead && picked !== null && <p className="bfloor-down">💀 ライフがなくなった！</p>}
      {picked !== null && (i === qs.length - 1 || dead) && onRetry && (
        <button
          className="list-link bfloor-retry-now"
          onClick={() => {
            onDone(score)
            onRetry()
          }}
        >
          🔁 すぐに再チャレンジ
        </button>
      )}
    </section>
  )
}
