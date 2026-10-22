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
import { mistakeOf } from './grammarmistake'
import { GrammarBingo } from './GrammarBingoView'
import { GrammarShadow } from './GrammarShadowView'
import { GrammarPrint } from './GrammarPrintView'
import { GrammarDict } from './GrammarDictView'
import { GrammarDuel } from './GrammarDuelView'
import { GrammarOdd } from './GrammarOddView'
import { loadDuelBest } from './grammarduel'
import { BINGO_COINS, loadBingoBest } from './grammarbingo'
import { clearForGoal, GOAL_CHOICES, loadGrammarGoal, saveGrammarGoal } from './grammargoal'
import { danOf, loadWrongDays, markWrongDay, yesterdayQuestions, allCleared, loadMaster, saveMaster, unitOfQuestion, GRAMMAR_STREAK_COINS, GRAMMAR_STREAK_DAYS, loadGrammarDays, saveGrammarDays, studyGrammarDay, weakRanking, praiseOf, recommendUnits, searchUnits, loadClears, saveClears, unitStars, loadNotebook, notebookQuestions, noteAfter, saveNotebook, GRAMMAR_CLEAR_XP, favFirst, loadGrammarFav, saveGrammarFav, toggleGrammarFav, grammarShareText, loadGrammarStreak, saveGrammarStreak, streakAfter, GRAMMAR_HINT_COST, gradeOf, GRAMMAR_GRADES, type GrammarGrade, loadTaBest, dailyGrammar, DAILY_GRAMMAR_COINS, loadDailyGrammarDay, saveDailyGrammarDay, GRAMMAR, grammarStamps, weakUnits, loadGrammar, loadMixBest, mixRank, saveGrammar, saveMixBest, STAMP_EVERY, type GrammarUnit } from './grammar'
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
  onFirstClear?: () => void // 単元をはじめて全問正解したとき
  onWeeklyGoal?: () => void // 今週の目標を達成したとき
  onBingo?: () => void // 文法ビンゴがそろったとき
  partnerName?: string // 全問正解のときほめてくれる相棒の名前
  onStreakBonus?: () => void // 文法を3日続けたとき
  onMaster?: () => void // 全単元を全問正解したとき（1回だけ）
}

export function Grammar({ units = GRAMMAR, title = '文法ミニ解説', onAnswer, onStampTicket, onMonsterWin, onDailyBonus, onRushWin, onSpend, onFirstClear, onWeeklyGoal, onBingo, partnerName, onStreakBonus, onMaster }: Props) {
  const stampMode = units === GRAMMAR
  const [record, setRecord] = useState(loadGrammar)
  const [unit, setUnit] = useState<GrammarUnit | null>(null)
  const [step, setStep] = useState(-1) // -1：解説、0〜：問題、length：結果
  const [picked, setPicked] = useState<number | null>(null)
  const [streak, setStreak] = useState(loadGrammarStreak)
  const [copied, setCopied] = useState(false)
  const [bingo, setBingo] = useState(false)
  const [shadow, setShadow] = useState(false)
  const [printing, setPrinting] = useState(false)
  const [dict, setDict] = useState(false)
  const [duel, setDuel] = useState(false)
  const [odd, setOdd] = useState(false)
  const [note, setNote] = useState(loadNotebook)
  const [wrongDays, setWrongDays] = useState(loadWrongDays)
  const [clears, setClears] = useState(loadClears)
  const [gDays, setGDays] = useState(loadGrammarDays)
  const [master, setMaster] = useState(loadMaster)
  const [streakBonus, setStreakBonus] = useState(false)
  const [weekGoal, setWeekGoal] = useState(() => loadGrammarGoal(dayKey()))
  const [goalReached, setGoalReached] = useState(false)
  const [firstClear, setFirstClear] = useState(false) // この回ではじめて全問正解した
  const [fav, setFav] = useState(loadGrammarFav)
  const [keyword, setKeyword] = useState('')
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
  const [gradeKey, setGradeKey] = useState('') // 学年まとめテストのベストのキー（grade:中1 など）

  function startBattle(u: GrammarUnit) {
    open(u)
    setBattle(true)
    setStep(0)
  }

  function open(u: GrammarUnit) {
    setHidden(null)
    setCopied(false)
    setShadow(false)
    setPrinting(false)
    setDict(false)
    setFirstClear(false)
    setGoalReached(false)
    setBattle(false)
    setOrdering(false)
    setUnit(u)
    setStep(-1)
    setPicked(null)
    setScore(0)
  }

  if (spot) return <GrammarSpot onAnswer={onAnswer} onBack={() => setSpot(false)} units={grade === 'all' ? GRAMMAR : GRAMMAR.filter((u) => gradeOf(u.id) === grade)} label={grade === 'all' ? undefined : grade} />
  if (cards) return <GrammarCards units={units.filter((u) => !stampMode || grade === 'all' || gradeOf(u.id) === grade)} onBack={() => setCards(false)} />
  if (listen) return <GrammarListen onAnswer={onAnswer} onBack={() => setListen(false)} />
  if (odd) return <GrammarOdd onAnswer={onAnswer} onBack={() => setOdd(false)} />
  if (duel) return <GrammarDuel onBack={() => setDuel(false)} />
  if (bingo) return <GrammarBingo onBack={() => setBingo(false)} onBingo={onBingo} />
  if (timeAttack) return <GrammarTime onAnswer={onAnswer} onBack={() => setTimeAttack(false)} units={grade === 'all' ? GRAMMAR : GRAMMAR.filter((u) => gradeOf(u.id) === grade)} label={grade === 'all' ? undefined : grade} />

  if (!unit) {
    return (
      <section className="card grammar">
        <h2>{title}</h2>
        <p className="stats-note grammar-total">
          全問正解 {units.filter((u) => record[u.id] === u.questions.length).length} / {units.length} 単元
        </p>
        {stampMode && (
          <p className="grammar-dan">
            🥋 段位：<strong>{danOf(units.filter((u) => record[u.id] === u.questions.length).length).name}</strong>
            {danOf(units.filter((u) => record[u.id] === u.questions.length).length).next !== null && `（次の段位まであと${danOf(units.filter((u) => record[u.id] === u.questions.length).length).next}単元）`}
            {units.filter((u) => record[u.id] === u.questions.length).length >= 100 && <span className="medal-100"> 💯 100単元クリア記念メダル</span>}
          </p>
        )}
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
          <div className="grade-tests" aria-label="学年まとめテスト">
            {GRAMMAR_GRADES.filter((g) => g !== '高校').map((g) => (
              <button
                key={g}
                className="list-link"
                onClick={() => {
                  const qs = shuffle(GRAMMAR.filter((u) => gradeOf(u.id) === g).flatMap((u) => u.questions)).slice(0, 10)
                  setGradeKey(`grade:${g}`)
                  open({ id: 'grade-test', title: `${g}の文法まとめテスト`, points: [], examples: [], questions: qs })
                  setStep(0)
                }}
              >
                📝 {g}まとめ{mixBest[`grade:${g}`] !== undefined ? `（ベスト ${mixBest[`grade:${g}`]}/10）` : ''}
              </button>
            ))}
          </div>
        )}
        {stampMode && (
          <button className="list-link spot-btn" onClick={() => setListen(true)}>
            👂 例文リスニング（聞いて空所の語を選ぶ・5問）
          </button>
        )}
        {stampMode && (
          <button className="list-link spot-btn" onClick={() => setCards(true)}>
            🃏 要点カードでおさらい{grade === 'all' ? '（学年タブでしぼりこめるよ）' : `（${grade}の単元だけ）`}
          </button>
        )}
        {stampMode && (
          <button className="list-link spot-btn" onClick={() => setSpot(true)}>
            🔍 まちがいさがし（○×で10問{grade === 'all' ? '' : `・${grade}`}）
          </button>
        )}
        {stampMode && (
          <button className="list-link spot-btn" onClick={() => setOdd(true)}>
            🧺 文法のなかま分け（ちがう文法の文をさがす）
          </button>
        )}
        {stampMode && (
          <button className="list-link spot-btn" onClick={() => setDuel(true)}>
            ⚡ 2択スピード（正しい英文はどっち？）{loadDuelBest() > 0 ? `　ベスト ${loadDuelBest()}秒` : ''}
          </button>
        )}
        {stampMode && (
          <button className="list-link spot-btn" onClick={() => setBingo(true)}>
            🎯 文法ビンゴ（そろうと🪙{BINGO_COINS}）{loadBingoBest() > 0 ? `　ベスト ${loadBingoBest()}列` : ''}
          </button>
        )}
        {stampMode && (
          <button className="list-link spot-btn" onClick={() => setTimeAttack(true)}>
            ⏱ 文法タイムアタック（60秒{grade === 'all' ? '' : `・${grade}`}）{loadTaBest() > 0 ? `　ベスト ${loadTaBest()}問` : ''}
          </button>
        )}
        {stampMode && (
          <div className="grammar-goal">
            {weekGoal.goal > 0 ? (
              <p>
                🎯 今週の目標：全問正解 {Math.min(weekGoal.cleared.length, weekGoal.goal)} / {weekGoal.goal} 単元{weekGoal.rewarded ? ' ✅ たっせい！' : '（たっせいで🎟1）'}
              </p>
            ) : (
              <p>🎯 今週の目標を決めよう（全問正解する単元の数）</p>
            )}
            <div className="goal-choices">
              {GOAL_CHOICES.map((n) => (
                <button
                  key={n}
                  className={weekGoal.goal === n ? 'on' : undefined}
                  aria-pressed={weekGoal.goal === n}
                  disabled={weekGoal.rewarded}
                  onClick={() => {
                    const g = { ...weekGoal, goal: n }
                    setWeekGoal(g)
                    saveGrammarGoal(g)
                  }}
                >
                  {n}単元
                </button>
              ))}
            </div>
          </div>
        )}
        {stampMode && master && <p className="level-up">🏅 称号「文法マスター」</p>}
        {stampMode && gDays.streak > 0 && (
          <p className="stats-note">
            📆 文法 {gDays.last === today ? gDays.streak : 0}日連続（{GRAMMAR_STREAK_DAYS}日ごとに🪙{GRAMMAR_STREAK_COINS}）
          </p>
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
        {stampMode && yesterdayQuestions(wrongDays, today).length > 0 && (
          <button
            className="list-link weak-grammar-btn"
            onClick={() => {
              open({ id: 'yesterday', title: '📅 きのうの復習', points: [], examples: [], questions: yesterdayQuestions(wrongDays, today) })
              setStep(0)
            }}
          >
            📅 きのうの復習（きのうまちがえた問題 {yesterdayQuestions(wrongDays, today).length}問）
          </button>
        )}
        {stampMode && notebookQuestions(note).length > 0 && (
          <button
            className="list-link weak-grammar-btn"
            onClick={() => {
              open({ id: 'notebook', title: '📓 まちがいノート', points: [], examples: [], questions: notebookQuestions(note).slice(0, 10) })
              setStep(0)
            }}
          >
            📓 まちがいノート（{notebookQuestions(note).length}問）
          </button>
        )}
        {stampMode && weakRanking(note).length > 0 && (
          <div className="weak-ranking">
            <p className="stats-note">📉 苦手ランキング</p>
            <ol>
              {weakRanking(note).map((r) => (
                <li key={r.unit.id}>
                  <button className="list-link" onClick={() => open(r.unit)}>
                    {`${r.unit.title}（${r.count}問）`}
                  </button>
                </li>
              ))}
            </ol>
          </div>
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
        {stampMode && (
          <div className="grammar-recommend">
            <p className="stats-note">🌟 おすすめ単元</p>
            {recommendUnits(units.filter((u) => grade === 'all' || gradeOf(u.id) === grade), clears, record).map((u) => (
              <button key={u.id} className="list-link" onClick={() => open(u)}>
                {`👉 ${u.title}`}
              </button>
            ))}
          </div>
        )}
        {stampMode && (
          <input className="grammar-search" type="search" placeholder="🔍 単元をさがす（例：関係代名詞・have）" aria-label="単元をさがす" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        )}
        {stampMode && keyword && searchUnits(units, keyword).length === 0 && <p className="stats-note">見つかりませんでした</p>}
        <ul className="grammar-list">
          {favFirst(searchUnits(units.filter((u) => !stampMode || grade === 'all' || gradeOf(u.id) === grade), keyword), stampMode ? fav : []).map((u) => (
            <li key={u.id} className={stampMode ? 'with-fav' : undefined}>
              {stampMode && (
                <button
                  className={`grammar-fav${fav.includes(u.id) ? ' on' : ''}`}
                  aria-label={`${u.title}をお気に入り${fav.includes(u.id) ? 'からはずす' : 'にする'}`}
                  aria-pressed={fav.includes(u.id)}
                  onClick={() => {
                    const f = toggleGrammarFav(fav, u.id)
                    setFav(f)
                    saveGrammarFav(f)
                  }}
                >
                  {fav.includes(u.id) ? '★' : '☆'}
                </button>
              )}
              <button onClick={() => open(u)}>
                <span>{u.title}</span>
                <span className="grammar-score">
                  {record[u.id] === undefined ? '未挑戦' : `${record[u.id]} / ${u.questions.length}`}
                  {record[u.id] === u.questions.length ? ' 👑' : ''}
                  {stampMode && unitStars(clears[u.id] ?? 0) > 0 && <span className="unit-stars" aria-label={`レベル ★${unitStars(clears[u.id] ?? 0)}`}>{' ' + '★'.repeat(unitStars(clears[u.id] ?? 0))}</span>}
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

  if (unit && dict) return <GrammarDict key={unit.id} unit={unit} onAnswer={onAnswer} onBack={() => setDict(false)} />
  if (unit && printing) return <GrammarPrint unit={unit} onBack={() => setPrinting(false)} />
  if (unit && shadow) return <GrammarShadow key={unit.id} unit={unit} onBack={() => setShadow(false)} />
  if (unit && ordering) return <GrammarOrder key={unit.id} unit={unit} onAnswer={onAnswer} onSpend={onSpend} onBack={() => setOrdering(false)} />

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
        {mistakeOf(unit.id) && (
          <div className="grammar-mistake">
            <p className="grammar-mistake-title">⚠ よくあるまちがい</p>
            <p className="ng">✕ {mistakeOf(unit.id)!.wrong}</p>
            <p className="ok">○ {mistakeOf(unit.id)!.right}</p>
            <p className="why">{mistakeOf(unit.id)!.why}</p>
          </div>
        )}
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
        <button className="list-link grammar-order-btn" onClick={() => setPrinting(true)}>
          📄 おさらいプリント（印刷できる）
        </button>
        {unit.examples.length > 0 && (
          <button className="list-link grammar-order-btn" onClick={() => setDict(true)}>
            ✍️ 例文のディクテーション（聞いて書く）
          </button>
        )}
        {unit.examples.length > 0 && (
          <button className="list-link grammar-order-btn" onClick={() => setShadow(true)}>
            🗣 例文のシャドーイング（聞いてまねする）
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
        {(unit.id === 'mix-test' || unit.id === 'grade-test') && (
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
        {streakBonus && <p className="level-up">📆 文法{gDays.streak}日連続！ 🪙{GRAMMAR_STREAK_COINS}</p>}
        {goalReached && <p className="level-up">🎯 今週の目標たっせい！ 🎟ガチャチケット1まい</p>}
        {partnerName && !battle && score === unit.questions.length && unit.questions.length > 0 && (
          <p className="grammar-praise">
            🐣 {partnerName}「{praiseOf(unit.id)}」
          </p>
        )}
        {firstClear && <p className="level-up">🌟 はじめての全問正解！ モンスターに XP+{GRAMMAR_CLEAR_XP}</p>}
        <button
          className="list-link"
          onClick={() => {
            navigator.clipboard
              ?.writeText(grammarShareText(unit.title, score, unit.questions.length))
              .then(() => setCopied(true))
              .catch(() => setCopied(false))
          }}
        >
          {copied ? '✅ コピーしました' : '📋 結果をコピー（シェア用）'}
        </button>
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
    if (stampMode && gDays.last !== today) {
      const r = studyGrammarDay(gDays, today)
      setGDays(r.days)
      saveGrammarDays(r.days)
      if (r.bonus) {
        setStreakBonus(true)
        onStreakBonus?.()
      }
    }
    if (stampMode && !ok) setWrongDays(markWrongDay(q.sentence, today))
    if (stampMode) {
      const nb = noteAfter(note, q.sentence, ok)
      if (nb.length !== note.length || nb.some((x, i) => x !== note[i])) {
        setNote(nb)
        saveNotebook(nb)
      }
    }
    const st = streakAfter(streak, ok)
    setStreak(st)
    saveGrammarStreak(st)
    onAnswer?.(ok, ok ? XP_QUIZ_CORRECT : 0, `grammar:${unit.id}`, 'quiz')
    if (unit.id === 'grade-test' && gradeKey && step === unit.questions.length - 1 && nextScore > (mixBest[gradeKey] ?? -1)) {
      const b = { ...mixBest, [gradeKey]: nextScore }
      setMixBest(b)
      saveMixBest(b)
    }
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
    if (step === unit.questions.length - 1 && nextScore === unit.questions.length && GRAMMAR.some((g) => g.id === unit.id)) {
      const c = { ...clears, [unit.id]: (clears[unit.id] ?? 0) + 1 }
      setClears(c)
      saveClears(c)
    }
    if (step === unit.questions.length - 1 && stampMode && !battle && nextScore === unit.questions.length && GRAMMAR.some((g) => g.id === unit.id)) {
      const r = clearForGoal(weekGoal, unit.id)
      setWeekGoal(r.goal)
      saveGrammarGoal(r.goal)
      if (r.reached) {
        setGoalReached(true)
        onWeeklyGoal?.()
      }
    }
    if (step === unit.questions.length - 1 && stampMode && nextScore === unit.questions.length && (record[unit.id] ?? -1) < unit.questions.length && GRAMMAR.some((g) => g.id === unit.id)) {
      onFirstClear?.()
      setFirstClear(true)
    }
    if (step === unit.questions.length - 1 && nextScore > (record[unit.id] ?? -1)) {
      const r = { ...record, [unit.id]: nextScore }
      if (stampMode && Math.floor(grammarStamps(r) / STAMP_EVERY) > Math.floor(grammarStamps(record) / STAMP_EVERY)) onStampTicket?.()
      setRecord(r)
      saveGrammar(r)
      if (stampMode && !master && allCleared(r)) {
        setMaster(true)
        saveMaster()
        onMaster?.()
      }
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
      {partnerName && picked !== null && picked === q.answer && streak.now > 0 && streak.now % 3 === 0 && (
        <p className="grammar-praise">
          🐣 {partnerName}「{streak.now}問連続正解！ その調子！」
        </p>
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
          {!GRAMMAR.some((g) => g.id === unit.id) && unitOfQuestion(q) && (
            <button className="list-link" onClick={() => open(unitOfQuestion(q)!)}>
              📖 もっとくわしく：{unitOfQuestion(q)!.title}
            </button>
          )}
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
