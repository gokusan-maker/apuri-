import { useContext, useState } from 'react'
import { PlayContext, usePlaying } from './playing'
import type { Source } from './monster'
import { loadShortDone, markShortDone, PASSAGES, type Passage } from './reading'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'
import { makeLookup } from './glossary'
import { WORDS, type Word } from './words'
import { GameTile } from './GameTileView'
import { evidenceOf } from './readhint'
import { Castle } from './CastleView'

const lookup = makeLookup(WORDS)

export const XP_READING = 15
const CHUNK = 20 // 一覧は20話ずつ色つきの折りたたみにまとめる（文法の学年と同じ形）

type Props = {
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  start?: Passage // はじめからこの話を開く（ホームの今日の読解）
  onClose?: () => void // 今日の課題：一覧にもどらず、課題の画面をとじる
  onDone?: (score: number, total: number) => void // 1本ぜんぶ答えたとき
  onCoins?: (n: number) => void // 城の宝箱
}

export function Reading({ onAnswer, start, onDone, onClose, onCoins }: Props) {
  const [p, setP] = useState<Passage | null>(start ?? null)
  const [done, setDone] = useState(loadShortDone) // 解いた話
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showJa, setShowJa] = useState(false)
  const [gloss, setGloss] = useState<Word | null>(null)
  const [hint, setHint] = useState(false) // この問題でヒントを使った

  const inApp = useContext(PlayContext) !== null // App の中では、上の「ほかの問題をえらぶ」で一覧へもどる
  usePlaying(!!p && !onClose, () => setP(null)) // 今日の課題（onClose）は今日の課題のバーがある

  const openP = (x: Passage) => {
    setP(x)
    setGloss(null)
    setStep(0)
    setPicked(null)
    setHint(false)
    setScore(0)
    setShowJa(false)
  }

  if (!p) {
    return (
      <section className="card grammar">
        {/* かんたんレベルの城：短い話1本が1階。全部答えたらクリアして次の階へ */}
        <Castle name="読解ミニの城" theme="green" onChest={onCoins} floors={PASSAGES.map((x) => ({ id: x.id, label: x.title, cleared: done.includes(x.id) }))} onOpen={(id) => openP(PASSAGES.find((x) => x.id === id)!)} />
        {/* 読解ゲーム：文法・単語のページと同じ色つきタイル */}
        <p className="game-grid-title">🎮 読解ゲーム</p>
        <div className="game-grid read-games" aria-label="読解ゲーム">
          {PASSAGES.some((x) => !done.includes(x.id)) && (
            <GameTile icon="🎯" name="つぎの話" sub={PASSAGES.find((x) => !done.includes(x.id))!.title} onClick={() => openP(PASSAGES.find((x) => !done.includes(x.id))!)} />
          )}
          <GameTile
            playKey="read:short-random"
            icon="🎲"
            name="ランダム挑戦"
            sub={PASSAGES.some((x) => !done.includes(x.id)) ? 'まだの話から1本' : '全部から1本'}
            onClick={() => {
              const todo = PASSAGES.filter((x) => !done.includes(x.id))
              const pool = todo.length > 0 ? todo : PASSAGES
              openP(pool[Math.floor(Math.random() * pool.length)])
            }}
          />
        </div>
        {Array.from({ length: Math.ceil(PASSAGES.length / CHUNK) }, (_, c) => {
          const part = PASSAGES.slice(c * CHUNK, (c + 1) * CHUNK)
          const nextIdx = PASSAGES.findIndex((x) => !done.includes(x.id))
          return (
            <details key={c} className={`grammar-grade-fold short-fold game-fold lg-${c % 5}`} open={nextIdx >= c * CHUNK && nextIdx < (c + 1) * CHUNK}>
              <summary>
                <span className="lg-icon" aria-hidden="true">📖</span>
                {c * CHUNK + 1}〜{c * CHUNK + part.length}話
                <span className="fold-meta" aria-label={`解いた話 ${part.filter((x) => done.includes(x.id)).length} / ${part.length}本`}>
                  {part.filter((x) => done.includes(x.id)).length}/{part.length}
                </span>
              </summary>
              <ul className="grammar-list">
                {part.map((x, j) => (
                  <li key={x.id} className={done.includes(x.id) ? 'short-item short-done' : 'short-item'}>
                    <button title={x.title} onClick={() => openP(x)}>
                      <span className="short-no" aria-label={done.includes(x.id) ? '解いた' : undefined}>
                        {done.includes(x.id) ? '✓' : c * CHUNK + j + 1}
                      </span>
                      <span className="short-title">{x.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          )
        })}
      </section>
    )
  }

  const q = p.questions[step]
  return (
    <section className="card grammar reading">
      {!onClose && !inApp && (
        <button className="stage-back" onClick={() => setP(null)}>
          ← 一覧
        </button>
      )}
      <h2>
        {p.title}
        <button className="speak small" onClick={() => speak(p.text)} aria-label="英文を聞く">
          🔊
        </button>
      </h2>
      <p className="reading-text">
        {p.text.split(/(\s+)/).map((tok, i) => {
          const hit = lookup(tok)
          return hit ? (
            <button key={i} className="gloss-word" onClick={() => setGloss(gloss?.id === hit.id ? null : hit)}>
              {tok}
            </button>
          ) : (
            <span key={i}>{tok}</span>
          )
        })}
      </p>
      {gloss && (
        <p className="gloss" role="status">
          {gloss.en}：{gloss.ja}
        </p>
      )}
      {showJa ? <p className="example-ja">{p.ja}</p> : null}
      {q ? (
        <>
          <p className="reading-q">
            Q{step + 1}. {q.q}
          </p>
          <div className="choices">
            {q.choices.map((c, i) => {
              let cls = 'choice'
              if (picked !== null && i === q.answer) cls += ' correct'
              else if (picked === i) cls += ' wrong'
              return (
                <button
                  key={c}
                  className={cls}
                  disabled={picked !== null}
                  onClick={() => {
                    setPicked(i)
                    const ok = i === q.answer
                    if (ok) {
                      setScore(score + 1)
                      playCorrect()
                    } else playWrong()
                    onAnswer?.(ok, ok ? XP_READING : 0, `reading:${p.id}`, 'quiz')
                  }}
                >
                  {c}
                </button>
              )
            })}
          </div>
          {picked === null && !hint && (
            <button className="list-link pill-btn pill-gold read-hint" onClick={() => setHint(true)}>
              💡 ヒント
            </button>
          )}
          {picked === null && hint && (
            <p className="read-hint-text">
              💡 {evidenceOf(p, step) ? `この文に答えがあるよ：「${evidenceOf(p, step)}」` : '質問のことばに近い英文をさがしてみよう。わからない単語はタップで意味が出るよ。'}
            </p>
          )}
          {picked !== null && (
            <button
              className="flip go-next"
              onClick={() => {
                setHint(false)
                setPicked(null)
                setStep(step + 1)
                if (step + 1 === p.questions.length) {
                  setShowJa(true)
                  setDone(markShortDone(p.id))
                  onDone?.(score, p.questions.length)
                }
              }}
            >
              次へ
            </button>
          )}
        </>
      ) : (
        <>
          <p className="result-score">
            {score} / {p.questions.length} 問正解
          </p>
          <button className="flip" onClick={() => (onClose ? onClose() : setP(null))}>
            ほかの話を読む
          </button>
        </>
      )}
    </section>
  )
}
