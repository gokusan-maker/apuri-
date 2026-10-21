import { useState } from 'react'
import { BossFigure } from './BossView'
import { GrammarCards } from './GrammarCardsView'
import { GrammarListen } from './GrammarListenView'
import { GrammarOrder } from './GrammarOrderView'
import { GrammarSpot } from './GrammarSpotView'
import { GrammarTime } from './GrammarTimeView'
import { GRAMMAR_MONSTER_COINS, monsterLook, monsterName, RUSH_COUNT, RUSH_GRAMMAR_COINS } from './grammarmonster'
import { shuffle } from './quiz'
import { dayKey } from './srs'
import { loadGrammarStreak, saveGrammarStreak, streakAfter, GRAMMAR_HINT_COST, gradeOf, GRAMMAR_GRADES, type GrammarGrade, loadTaBest, dailyGrammar, DAILY_GRAMMAR_COINS, loadDailyGrammarDay, saveDailyGrammarDay, GRAMMAR, grammarStamps, weakUnits, loadGrammar, loadMixBest, mixRank, saveGrammar, saveMixBest, STAMP_EVERY, type GrammarUnit } from './grammar'
import { XP_QUIZ_CORRECT, type Source } from './monster'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

type Props = {
  units?: GrammarUnit[] // 省略時は文法の単元
  title?: string
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onStampTicket?: () => void // スタンプが10個ふえるごとに（文法のときだけ）
  onMonsterWin?: () => void // 文法モンスターをたおした（ごほうびはアプリ側）
  onDailyBonus?: () => void // 今日の文法を全問正解した（1日1回）
  onRushWin?: () => void // 文法モンスターラッシュを3連勝した
  onSpend?: (coins: number) => boolean // ヒントのコイン
}

export function Grammar({ units = GRAMMAR, title = '文法ミニ解説', onAnswer, onStampTicket, onMonsterWin, onDailyBonus, onRushWin, onSpend }: Props) {
  const stampMode = units === GRAMMAR
  const [record, setRecord] = useState(loadGrammar)
  const [unit, setUnit] = useState<GrammarUnit | null>(null)
  const [step, setStep] = useState(-1) // -1：解説、0〜：問題、length：結果
  const [picked, setPicked] = useState<number | null>(null)
  const [streak, setStreak] = useState(loadGrammarStreak)
  const [score, setScore] = useState(0)
  const [battle, setBattle] = useState(false) // 文法モンスターと戦うモード
  const [ordering, setOrdering] = useState(false) // 並べかえクイズ
  const [spot, setSpot] = useState(false) // まちがいさがし
  const [timeAttack, setTimeAttack] = useState(false) // タイムアタック
  const [grade, setGrade] = useState<GrammarGrade | 'all'>('all')
  const [rush, setRush] = useState<{ list: GrammarUnit[]; at: number } | null>(null) // 文法モンスターラッシュ
  const [cards, setCards] = useState(false) // 要点カード
  const [hidden, setHidden] = useState<{ step: number; i: number } | null>(null) // ヒントで消した選択肢
  const [listen, setListen] = useState(false) // 例文リスニング
  const [today] = useState(() => dayKey())
  const [dailyDay, setDailyDay] = useState(loadDailyGrammarDay)
  const daily = dailyGrammar(today)
  const [mixBest, setMixBest] = useState(loadMixBest) // まとめテストのベスト（タイトルごと）

  function startBattle(u: GrammarUnit) {
    open(u)
    setBattle(true)
    setStep(0)
  }

  function open(u: GrammarUnit) {
    setHidden(null)
    setBattle(false)
    setOrdering(false)
    setUnit(u)
    setStep(-1)
    setPicked(null)
    setScore(0)
  }

  if (spot) return <GrammarSpot onAnswer={onAnswer} onBack={() => setSpot(false)} />
  if (cards) return <GrammarCards units={units.filter((u) => !stampMode || grade === 'all' || gradeOf(u.id) === grade)} onBack={() => setCards(false)} />
  if (listen) return <GrammarListen onAnswer={onAnswer} onBack={() => setListen(false)} />
  if (timeAttack) return <GrammarTime onAnswer={onAnswer} onBack={() => setTimeAttack(false)} />

  if (!unit) {
    return (
      <section className="card grammar">
        <h2>{title}</h2>
        <p className="stats-note grammar-total">
          全問正解 {units.filter((u) => record[u.id] === u.questions.length).length} / {units.length} 単元
        </p>
        <p className="stats-note">短い解説を読んで、3問の確認問題にチャレンジ！</p>
        {stampMode && (
          <button className="daily-grammar" onClick={() => open(daily)}>
            📅 今日の文法：{daily.title}
            <span>{dailyDay === today ? '✅ 今日はクリアずみ' : `確認問題を全問正解で 🪙${DAILY_GRAMMAR_COINS}`}</span>
          </button>
        )}
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
          <button className="list-link spot-btn" onClick={() => setListen(true)}>
            👂 例文リスニング（聞いて空所の語を選ぶ・5問）
          </button>
        )}
        {stampMode && (
          <button className="list-link spot-btn" onClick={() => setCards(true)}>
            🃏 要点カードでおさらい（学年タブでしぼりこめるよ）
          </button>
        )}
        {stampMode && (
          <button className="list-link spot-btn" onClick={() => setSpot(true)}>
            🔍 まちがいさがし（○×で10問）
          </button>
        )}
        {stampMode && (
          <button className="list-link spot-btn" onClick={() => setTimeAttack(true)}>
            ⏱ 文法タイムアタック（60秒）{loadTaBest() > 0 ? `　ベスト ${loadTaBest()}問` : ''}
          </button>
        )}
        {stampMode && streak.best > 0 && <p className="stats-note">🔥 確認問題の連続正解ベスト {streak.best}問</p>}
        {stampMode && (
          <button
            className="boss-btn grammar-monster-btn"
            onClick={() => {
              const list = shuffle(GRAMMAR).slice(0, RUSH_COUNT)
              setRush({ list, at: 0 })
              startBattle(list[0])
            }}
          >
            👾👾👾 文法モンスターラッシュ（{RUSH_COUNT}連戦・全勝で🪙{RUSH_GRAMMAR_COINS}）
          </button>
        )}
        {stampMode && weakUnits(record).length > 0 && (
          <button
            className="list-link weak-grammar-btn"
            onClick={() => {
              const ws = weakUnits(record)
              open({ id: 'weak-test', title: '苦手な文法の復習', points: [], examples: [], questions: shuffle(ws.flatMap((u) => u.questions)).slice(0, 10) })
              setStep(0)
            }}
          >
            🔁 苦手な文法の復習（{weakUnits(record).length}単元）
          </button>
        )}
        {stampMode && (
          <div className="grade-progress" aria-label="学年ごとの進みぐあい">
            {GRAMMAR_GRADES.map((g) => {
              const us = GRAMMAR.filter((u) => gradeOf(u.id) === g)
              const done = us.filter((u) => record[u.id] === u.questions.length).length
              return (
                <div key={g} className="grade-row">
                  <span>{g}</span>
                  <span className="grade-bar" role="progressbar" aria-label={`${g}の全問正解`} aria-valuemin={0} aria-valuemax={us.length} aria-valuenow={done}>
                    <span style={{ width: `${(done / us.length) * 100}%` }} />
                  </span>
                  <span>
                    {done}/{us.length}
                  </span>
                </div>
              )
            })}
          </div>
        )}
        {stampMode && (
          <div className="sub-tabs grade-tabs" role="tablist" aria-label="学年">
            {(['all', ...GRAMMAR_GRADES] as const).map((g) => (
              <button key={g} role="tab" aria-selected={grade === g} onClick={() => setGrade(g)}>
                {g === 'all' ? 'すべて' : g}
              </button>
            ))}
          </div>
        )}
        <ul className="grammar-list">
          {units.filter((u) => !stampMode || grade === 'all' || gradeOf(u.id) === grade).map((u) => (
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
    <button
      className="stage-back"
      onClick={() => {
        setUnit(null)
        setRush(null)
      }}
    >
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
        {battle && rush && score === unit.questions.length && (
          rush.at + 1 < rush.list.length ? (
            <button
              className="boss-btn grammar-monster-btn"
              onClick={() => {
                const at = rush.at + 1
                setRush({ ...rush, at })
                startBattle(rush.list[at])
              }}
            >
              次の文法モンスターへ ▶（{rush.at + 2} / {rush.list.length}）
            </button>
          ) : (
            <p className="level-up">👾 ラッシュ完全クリア！ 🪙{RUSH_GRAMMAR_COINS}</p>
          )
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
    const st = streakAfter(streak, ok)
    setStreak(st)
    saveGrammarStreak(st)
    onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `grammar:${unit.id}`, 'quiz')
    if (unit.id === 'mix-test' && step === unit.questions.length - 1 && nextScore > (mixBest[title] ?? -1)) {
      const b = { ...mixBest, [title]: nextScore }
      setMixBest(b)
      saveMixBest(b)
    }
    if (stampMode && unit.id === daily.id && step === unit.questions.length - 1 && nextScore === unit.questions.length && dailyDay !== today) {
      setDailyDay(today)
      saveDailyGrammarDay(today)
      onDailyBonus?.()
    }
    if (battle && step === unit.questions.length - 1 && nextScore === unit.questions.length) {
      onMonsterWin?.()
      if (rush && rush.at === rush.list.length - 1) onRushWin?.()
    }
    if (battle && rush && step === unit.questions.length - 1 && nextScore < unit.questions.length) setRush(null)
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
      {streak.now >= 2 && (
        <p className="grammar-streak">
          🔥 連続正解 {streak.now}
          {streak.now >= streak.best ? '（ベスト更新中！）' : `（ベスト ${streak.best}）`}
        </p>
      )}
      <p className="example blank-sentence">
        {before}
        <span className={`blank${picked !== null ? ' filled' : ''}`}>
          {picked !== null ? q.choices[q.answer] : '　　　'}
        </span>
        {after}
      </p>
      {onSpend && picked === null && q.choices.length > 2 && hidden?.step !== step && (
        <button
          className="hint-5050"
          onClick={() => {
            if (!onSpend(GRAMMAR_HINT_COST)) return
            const wrongs = q.choices.map((_, i) => i).filter((i) => i !== q.answer)
            setHidden({ step, i: wrongs[0] })
          }}
        >
          💡 ヒント：1つ消す（🪙{GRAMMAR_HINT_COST}）
        </button>
      )}
      <div className="choices">
        {q.choices.map((c, i) => {
          if (hidden?.step === step && hidden.i === i && picked === null) return null
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
