import { useState } from 'react'
import { BossFigure } from './BossView'
import { GrammarOrder } from './GrammarOrderView'
import { GrammarSpot } from './GrammarSpotView'
import { GRAMMAR_MONSTER_COINS, monsterLook, monsterName } from './grammarmonster'
import { shuffle } from './quiz'
import { GRAMMAR, grammarStamps, loadGrammar, loadMixBest, mixRank, saveGrammar, saveMixBest, STAMP_EVERY, type GrammarUnit } from './grammar'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

type Props = {
  units?: GrammarUnit[] // 省略時は文法の単元
  title?: string
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onStampTicket?: () => void // スタンプが10個ふえるごとに（文法のときだけ）
  onMonsterWin?: () => void // 文法モンスターをたおした（ごほうびはアプリ側）
}

export function Grammar({ units = GRAMMAR, title = '文法ミニ解説', onAnswer, onStampTicket, onMonsterWin }: Props) {
  const stampMode = units === GRAMMAR
  const [record, setRecord] = useState(loadGrammar)
  const [unit, setUnit] = useState<GrammarUnit | null>(null)
  const [step, setStep] = useState(-1) // -1：解説、0〜：問題、length：結果
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [battle, setBattle] = useState(false) // 文法モンスターと戦うモード
  const [ordering, setOrdering] = useState(false) // 並べかえクイズ
  const [spot, setSpot] = useState(false) // まちがいさがし
  const [mixBest, setMixBest] = useState(loadMixBest) // まとめテストのベスト（タイトルごと）

  function open(u: GrammarUnit) {
    setBattle(false)
    setOrdering(false)
    setUnit(u)
    setStep(-1)
    setPicked(null)
    setScore(0)
  }

  if (spot) return <GrammarSpot onAnswer={onAnswer} onBack={() => setSpot(false)} />

  if (!unit) {
    return (
      <section className="card grammar">
        <h2>{title}</h2>
        <p className="stats-note grammar-total">
          全問正解 {units.filter((u) => record[u.id] === u.questions.length).length} / {units.length} 単元
        </p>
        <p className="stats-note">短い解説を読んで、3問の確認問題にチャレンジ！</p>
        {stampMode && (
          <div className="stamp-card" aria-label={`文法スタンプ ${grammarStamps(record)}個`}>
            <p className="stamp-title">
              📮 文法スタンプカード {grammarStamps(record)} / {GRAMMAR.length}
              <span>（あと{STAMP_EVERY - (grammarStamps(record) % STAMP_EVERY)}個で 🎟ガチャチケット）</span>
            </p>
            <div className="stamp-grid">
              {GRAMMAR.map((u) => (
                <span key={u.id} className={record[u.id] === u.questions.length ? 'stamp on' : 'stamp'} title={u.title}>
                  {record[u.id] === u.questions.length ? '🌸' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
        <button
          className="flip mix-test"
          onClick={() => {
            const qs = shuffle(units.flatMap((u) => u.questions)).slice(0, 10)
            open({ id: 'mix-test', title: `${title}のまとめテスト`, points: [], examples: [], questions: qs })
            setStep(0)
          }}
        >
          📝 まとめテスト（ランダム10問）{mixBest[title] !== undefined ? `　ベスト ${mixBest[title]}/10・${mixRank(mixBest[title], 10)}` : ''}
        </button>
        {stampMode && (
          <button className="list-link spot-btn" onClick={() => setSpot(true)}>
            🔍 まちがいさがし（○×で10問）
          </button>
        )}
        <ul className="grammar-list">
          {units.map((u) => (
            <li key={u.id}>
              <button onClick={() => open(u)}>
                <span>{u.title}</span>
                <span className="grammar-score">
                  {record[u.id] === undefined ? '未挑戦' : `${record[u.id]} / ${u.questions.length}`}
                  {record[u.id] === u.questions.length ? ' 👑' : ''}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const back = (
    <button className="stage-back" onClick={() => setUnit(null)}>
      ← 単元一覧
    </button>
  )

  if (unit && ordering) return <GrammarOrder key={unit.id} unit={unit} onAnswer={onAnswer} onBack={() => setOrdering(false)} />

  if (step === -1) {
    return (
      <section className="card grammar">
        {back}
        <h2>{unit.title}</h2>
        <ul className="grammar-points">
          {unit.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        {unit.examples.map((ex) => (
          <p key={ex.en} className="grammar-example">
            <span>
              {ex.en}
              <button className="speak small" onClick={() => speak(ex.en)} aria-label="例文を聞く">
                🔊
              </button>
            </span>
            <span className="example-ja">{ex.ja}</span>
          </p>
        ))}
        <button className="flip" onClick={() => setStep(0)}>
          確認問題へ（{unit.questions.length}問）
        </button>
        {unit.examples.length > 0 && (
          <button className="list-link grammar-order-btn" onClick={() => setOrdering(true)}>
            🧩 例文の並べかえに挑戦（{unit.examples.length}問）
          </button>
        )}
        {stampMode && (
          <button
            className="boss-btn grammar-monster-btn"
            onClick={() => {
              setBattle(true)
              setStep(0)
            }}
          >
            👾 文法モンスター「{monsterName(unit)}」と戦う（全問正解でたおせる）
          </button>
        )}
      </section>
    )
  }

  const q = unit.questions[step]
  if (!q) {
    return (
      <section className="card result">
        {back}
        <p className="result-title">{unit.title}</p>
        <p className="result-score">
          {score} / {unit.questions.length} 問正解
        </p>
        {unit.id === 'mix-test' && (
          <p className={`battle-rank rank-${mixRank(score, unit.questions.length)}`} aria-label={`ランク ${mixRank(score, unit.questions.length)}`}>
            {mixRank(score, unit.questions.length)}
          </p>
        )}
        {battle ? (
          <p className="result-message">{score === unit.questions.length ? `👾 ${monsterName(unit)}をたおした！ 🪙${GRAMMAR_MONSTER_COINS}` : `${monsterName(unit)}ににげられた…解説を見直してもう一度！`}</p>
        ) : (
          <p className="result-message">{score === unit.questions.length ? 'カンペキ！' : '解説を見直してもう一度！'}</p>
        )}
        <button className="flip" onClick={() => open(unit)}>
          もう一度
        </button>
      </section>
    )
  }

  function pick(i: number) {
    if (picked !== null || !unit) return
    setPicked(i)
    const ok = i === q.answer
    const nextScore = score + (ok ? 1 : 0)
    setScore(nextScore)
    if (ok) playCorrect()
    else playWrong()
    onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `grammar:${unit.id}`, 'quiz')
    if (unit.id === 'mix-test' && step === unit.questions.length - 1 && nextScore > (mixBest[title] ?? -1)) {
      const b = { ...mixBest, [title]: nextScore }
      setMixBest(b)
      saveMixBest(b)
    }
    if (battle && step === unit.questions.length - 1 && nextScore === unit.questions.length) onMonsterWin?.()
    if (step === unit.questions.length - 1 && nextScore > (record[unit.id] ?? -1)) {
      const r = { ...record, [unit.id]: nextScore }
      if (stampMode && Math.floor(grammarStamps(r) / STAMP_EVERY) > Math.floor(grammarStamps(record) / STAMP_EVERY)) onStampTicket?.()
      setRecord(r)
      saveGrammar(r)
    }
  }

  const [before, after] = q.sentence.split('___')
  return (
    <section className="card quiz grammar" aria-live="polite">
      {back}
      <p className="progress">
        {step + 1} / {unit.questions.length}
      </p>
      {battle && (
        <div className="grammar-monster">
          <span className="grammar-monster-fig">
            <BossFigure hit={picked !== null && picked === q.answer} look={monsterLook(unit)} />
          </span>
          <span>
            <strong>{monsterName(unit)}</strong>
            <span className="boss-hp grammar-monster-hp" role="progressbar" aria-label="文法モンスターのHP" aria-valuemin={0} aria-valuemax={unit.questions.length} aria-valuenow={unit.questions.length - score}>
              <span className="boss-hp-fill" style={{ width: `${((unit.questions.length - score) / unit.questions.length) * 100}%` }} />
            </span>
          </span>
        </div>
      )}
      <p className="example blank-sentence">
        {before}
        <span className={`blank${picked !== null ? ' filled' : ''}`}>
          {picked !== null ? q.choices[q.answer] : '　　　'}
        </span>
        {after}
      </p>
      <div className="choices">
        {q.choices.map((c, i) => {
          let cls = 'choice'
          if (picked !== null && i === q.answer) cls += ' correct'
          else if (picked === i) cls += ' wrong'
          return (
            <button key={c} className={cls} onClick={() => pick(i)} disabled={picked !== null}>
              {c}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <>
          <p className="feedback">{picked === q.answer ? '正解！' : 'ざんねん'}</p>
          <p className="grammar-why">{q.why}</p>
          <button
            className="flip"
            onClick={() => {
              setPicked(null)
              setStep(step + 1)
            }}
          >
            次へ
          </button>
        </>
      )}
    </section>
  )
}
