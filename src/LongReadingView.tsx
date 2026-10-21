import { useState } from 'react'
import { LONG_PASSAGES, loadLongRecord, MARKS, saveLongRecord, scoreLong, XP_LONG_ITEM, type LongPassage } from './longreading'
import type { Source } from './monster'
import { playCorrect, playWrong } from './sound'

type Props = { onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

// 本文の「( A )」を目立つ空所にする
function Paragraph({ text }: { text: string }) {
  const parts = text.split(/(\( [A-Z] \))/)
  return (
    <p className="long-para">
      {parts.map((s, i) =>
        /^\( [A-Z] \)$/.test(s) ? (
          <span key={i} className="long-blank">
            {s}
          </span>
        ) : (
          s
        ),
      )}
    </p>
  )
}

// 長文読解（入試形式）：空所補充（記号）と内容一致（○×）をまとめて答えて採点する
export function LongReading({ onAnswer }: Props) {
  const [p, setP] = useState<LongPassage | null>(null)
  const [blanks, setBlanks] = useState<Record<string, number>>({})
  const [tf, setTf] = useState<Record<number, boolean>>({})
  const [done, setDone] = useState(false)
  const [showJa, setShowJa] = useState(false)
  const [record, setRecord] = useState(loadLongRecord)

  if (!p) {
    return (
      <section className="card grammar long-reading">
        <h2>長文読解（入試形式）</h2>
        <p className="stats-note">私立高校の入試のような長文。空所に入る語を記号で選び、本文の内容と合うものに○、合わないものに×をつけよう。</p>
        <ul className="grammar-list">
          {LONG_PASSAGES.map((x) => (
            <li key={x.id}>
              <button
                onClick={() => {
                  setP(x)
                  setBlanks({})
                  setTf({})
                  setDone(false)
                  setShowJa(false)
                }}
              >
                📖 {x.title}
                <span className="long-meta">
                  {x.level}・{x.blanks.length + x.tf.length}問{record[x.id] !== undefined ? `・最高 ${record[x.id]}点` : ''}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const { score, total } = scoreLong(p, blanks, tf)
  const answered = Object.keys(blanks).length + Object.keys(tf).length
  const mark = (ok: boolean) => (done ? (ok ? ' right' : ' wrong') : '')

  return (
    <section className="card grammar long-reading">
      <div className="stage-head">
        <button className="stage-back" onClick={() => setP(null)}>
          ← 長文の一覧
        </button>
        <span>{p.level}</span>
      </div>
      <h2>{p.title}</h2>
      <div className="long-text">
        {p.paragraphs.map((t, i) => (
          <div key={i}>
            <Paragraph text={t} />
            {showJa && <p className="long-ja">{p.ja[i]}</p>}
          </div>
        ))}
      </div>
      <button className="list-link" onClick={() => setShowJa(!showJa)}>
        {showJa ? '和訳をかくす' : '和訳を見る'}
      </button>

      <h3 className="long-q">問1　本文の ( A )〜( {p.blanks.at(-1)!.id} ) に入る最も適切な語を、それぞれ ア〜エ から選びなさい。</h3>
      {p.blanks.map((b) => (
        <div key={b.id} className="long-item">
          <span className="long-label">( {b.id} )</span>
          <div className="long-choices">
            {b.choices.map((c, i) => (
              <button
                key={c}
                className={`long-choice${blanks[b.id] === i ? ' picked' : ''}${done && i === b.answer ? ' answer' : ''}`}
                disabled={done}
                aria-pressed={blanks[b.id] === i}
                onClick={() => setBlanks({ ...blanks, [b.id]: i })}
              >
                {MARKS[i]} {c}
              </button>
            ))}
          </div>
          {done && (
            <p className={`long-why${mark(blanks[b.id] === b.answer)}`}>
              {blanks[b.id] === b.answer ? '⭕' : '❌'} 正解 {MARKS[b.answer]}（{b.choices[b.answer]}）：{b.why}
            </p>
          )}
        </div>
      ))}

      <h3 className="long-q">問2　次の英文が本文の内容と合っていれば○、合っていなければ×を選びなさい。</h3>
      {p.tf.map((t, i) => (
        <div key={i} className="long-item">
          <p className="long-statement">
            ({i + 1}) {t.statement}
          </p>
          <div className="long-choices tf">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                className={`long-choice${tf[i] === v ? ' picked' : ''}${done && v === t.answer ? ' answer' : ''}`}
                disabled={done}
                aria-pressed={tf[i] === v}
                aria-label={`(${i + 1}) ${v ? '○' : '×'}`}
                onClick={() => setTf({ ...tf, [i]: v })}
              >
                {v ? '○' : '×'}
              </button>
            ))}
          </div>
          {done && (
            <p className={`long-why${mark(tf[i] === t.answer)}`}>
              {tf[i] === t.answer ? '⭕' : '❌'} 正解 {t.answer ? '○' : '×'}：{t.why}
            </p>
          )}
        </div>
      ))}

      {done ? (
        <div className="long-result" role="status">
          <p className="level-up">
            {score} / {total} 点{score === total ? ' 🎉 満点！' : ''}
          </p>
          <button
            className="flip"
            onClick={() => {
              setBlanks({})
              setTf({})
              setDone(false)
            }}
          >
            もう一度とく
          </button>
        </div>
      ) : (
        <button
          className="flip"
          disabled={answered < total}
          onClick={() => {
            setDone(true)
            if (score === total) playCorrect()
            else playWrong()
            for (let i = 0; i < total; i++) onAnswer?.(i < score, i < score ? XP_LONG_ITEM : 0, '', 'quiz')
            if (score > (record[p.id] ?? -1)) {
              const r = { ...record, [p.id]: score }
              setRecord(r)
              saveLongRecord(r)
            }
          }}
        >
          {answered < total ? `のこり ${total - answered}問` : '採点する'}
        </button>
      )}
    </section>
  )
}
