import { useState } from 'react'
import { evidenceParas, formatTime, LONG_PASSAGES, loadLongRecord, MARKS, saveLongRecord, scoreLong, targetMinutes, totalOf, XP_LONG_ITEM, type LongPassage } from './longreading'
import type { Source } from './monster'
import { playCorrect, playWrong } from './sound'

type Props = { onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }

// 本文の「( A )」を目立つ空所にする
function Paragraph({ text, underline }: { text: string; underline?: string }) {
  const parts = text.split(/(\( [A-Z] \)|\[ \d \])/)
  return (
    <p className="long-para">
      {parts.map((s, i) => {
        if (/^(\( [A-Z] \)|\[ \d \])$/.test(s))
          return (
            <span key={i} className="long-blank">
              {s}
            </span>
          )
        const at = underline ? s.indexOf(underline) : -1
        if (at < 0) return s
        return (
          <span key={i}>
            {s.slice(0, at)}
            <u className="long-underline">{underline}</u>
            {s.slice(at + underline!.length)}
          </span>
        )
      })}
    </p>
  )
}

// 長文読解（入試形式）：空所補充（記号）と内容一致（○×）をまとめて答えて採点する
export function LongReading({ onAnswer }: Props) {
  const [p, setP] = useState<LongPassage | null>(null)
  const [blanks, setBlanks] = useState<Record<string, number>>({})
  const [tf, setTf] = useState<Record<number, boolean>>({})
  const [picks, setPicks] = useState<number[]>([])
  const [under, setUnder] = useState<number | undefined>(undefined)
  const [order, setOrder] = useState<number[]>([]) // 並べた語の番号
  const [sents, setSents] = useState<Record<string, number>>({}) // 会話文の [ 1 ] に入る文
  const [startAt, setStartAt] = useState(0) // 読みはじめた時刻
  const [took, setTook] = useState(0) // かかった秒数
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
                  setStartAt(Date.now())
                  setP(x)
                  setBlanks({})
                  setTf({})
                  setPicks([])
                  setUnder(undefined)
                  setOrder([])
                  setSents({})
                  setDone(false)
                  setShowJa(false)
                }}
              >
                📖 {x.title}
                <span className="long-meta">
                  {x.level}・{totalOf(x)}点・目安{targetMinutes(x)}分{record[x.id] !== undefined ? `・最高 ${record[x.id]}点` : ''}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const evidence = done
    ? evidenceParas(
        p,
        p.blanks.filter((b) => blanks[b.id] !== b.answer).map((b) => b.id),
        p.tf.map((t, i) => (tf[i] === t.answer ? -1 : i)).filter((i) => i >= 0),
        !!p.underline && under !== p.underline.answer,
      )
    : []
  const orderText = p.order ? order.map((i) => p.order!.words[i]).join(' ') : ''
  const { score, total } = scoreLong(p, blanks, tf, picks, { underline: under, order: orderText, sentences: sents })
  const answered = Object.keys(blanks).length + Object.keys(tf).length + picks.length + (under !== undefined ? 1 : 0) + (p.order && order.length === p.order.words.length ? 1 : 0) + Object.keys(sents).length
  const mark = (ok: boolean) => (done ? (ok ? ' right' : ' wrong') : '')

  return (
    <section className="card grammar long-reading">
      <div className="stage-head">
        <button className="stage-back" onClick={() => setP(null)}>
          ← 長文の一覧
        </button>
        <span>
          {p.level}・⏱ 目安{targetMinutes(p)}分
        </span>
      </div>
      <h2>{p.title}</h2>
      <div className="long-text">
        {done && evidence.length > 0 && <p className="long-evidence-note">🟨 まちがえた問題の根拠がある段落に色をつけたよ</p>}
        {p.paragraphs.map((t, i) => (
          <div key={i} className={evidence.includes(i) ? 'long-evidence' : undefined} aria-label={evidence.includes(i) ? `根拠の段落 ${i + 1}` : undefined}>
            <Paragraph text={t} underline={p.underline?.phrase} />
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

      {p.sentences && (
        <>
          <h3 className="long-q">問1-2　会話の [ 1 ]〜[ {p.sentences.at(-1)!.id} ] に入る最も適切な文を、それぞれ ア〜エ から選びなさい。</h3>
          {p.sentences.map((sb) => (
            <div key={sb.id} className="long-item">
              <span className="long-label">[ {sb.id} ]</span>
              <div className="long-choices one">
                {sb.choices.map((c, i) => (
                  <button
                    key={c}
                    className={`long-choice${sents[sb.id] === i ? ' picked' : ''}${done && i === sb.answer ? ' answer' : ''}`}
                    disabled={done}
                    aria-pressed={sents[sb.id] === i}
                    onClick={() => setSents({ ...sents, [sb.id]: i })}
                  >
                    {MARKS[i]} {c}
                  </button>
                ))}
              </div>
              {done && (
                <p className={`long-why${sents[sb.id] === sb.answer ? ' right' : ' wrong'}`}>
                  {sents[sb.id] === sb.answer ? '⭕' : '❌'} 正解 {MARKS[sb.answer]}：{sb.why}
                </p>
              )}
            </div>
          ))}
        </>
      )}

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

      {p.pick2 && (
        <>
          <h3 className="long-q">問3　本文の内容と合うものを、ア〜カ から2つ選びなさい。</h3>
          <div className="long-item">
            {p.pick2.statements.map((st, i) => (
              <button
                key={i}
                className={`long-choice long-pick${picks.includes(i) ? ' picked' : ''}${done && p.pick2!.answers.includes(i) ? ' answer' : ''}`}
                disabled={done}
                aria-pressed={picks.includes(i)}
                onClick={() => setPicks(picks.includes(i) ? picks.filter((x) => x !== i) : picks.length < 2 ? [...picks, i] : [picks[1], i])}
              >
                {MARKS[i]} {st}
              </button>
            ))}
            {done && (
              <p className={`long-why${picks.filter((i) => p.pick2!.answers.includes(i)).length === 2 ? ' right' : ' wrong'}`}>
                正解 {p.pick2.answers.map((i) => MARKS[i]).join('・')}：{p.pick2.why}
              </p>
            )}
          </div>
        </>
      )}

      {p.underline && (
        <>
          <h3 className="long-q">問{p.pick2 ? 4 : 3}　下線部 <u>{p.underline.phrase}</u> の意味に最も近いものを、ア〜エ から選びなさい。</h3>
          <div className="long-item">
            <div className="long-choices one">
              {p.underline.choices.map((c, i) => (
                <button key={c} className={`long-choice${under === i ? ' picked' : ''}${done && i === p.underline!.answer ? ' answer' : ''}`} disabled={done} aria-pressed={under === i} onClick={() => setUnder(i)}>
                  {MARKS[i]} {c}
                </button>
              ))}
            </div>
            {done && (
              <p className={`long-why${under === p.underline.answer ? ' right' : ' wrong'}`}>
                {under === p.underline.answer ? '⭕' : '❌'} 正解 {MARKS[p.underline.answer]}：{p.underline.why}
              </p>
            )}
          </div>
        </>
      )}

      {p.order && (
        <>
          <h3 className="long-q">問{(p.pick2 ? 4 : 3) + (p.underline ? 1 : 0)}　（　）内の語を並べかえて、意味の通る英文にしなさい。</h3>
          <div className="long-item">
            <p className="long-statement">
              （ {p.order.words.join(' / ')} ） {p.order.rest}
            </p>
            <p className="long-order-answer" aria-label="並べた英文">
              {orderText || '　'} <span className="long-rest">{p.order.rest}</span>
            </p>
            <div className="long-order-words">
              {p.order.words.map((w, i) => (
                <button key={i} className="long-choice" disabled={done || order.includes(i)} onClick={() => setOrder([...order, i])}>
                  {w}
                </button>
              ))}
              {!done && order.length > 0 && (
                <button className="list-link" onClick={() => setOrder([])}>
                  やりなおす
                </button>
              )}
            </div>
            {done && (
              <p className={`long-why${orderText === p.order.answer ? ' right' : ' wrong'}`}>
                {orderText === p.order.answer ? '⭕' : '❌'} 正解 {p.order.answer} {p.order.rest}　{p.order.ja}
              </p>
            )}
          </div>
        </>
      )}

      {done ? (
        <div className="long-result" role="status">
          <p className="level-up">
            {score} / {total} 点{score === total ? ' 🎉 満点！' : ''}
          </p>
          <p className="stats-note">
            ⏱ かかった時間 {formatTime(took)}（目安 {targetMinutes(p)}分）{took <= targetMinutes(p) * 60 ? '　目安より早い！' : ''}
          </p>
          <button
            className="flip"
            onClick={() => {
              setBlanks({})
              setTf({})
              setPicks([])
              setUnder(undefined)
              setOrder([])
              setSents({})
              setStartAt(Date.now())
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
            setTook(Math.round((Date.now() - startAt) / 1000))
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
