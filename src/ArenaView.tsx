import { useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { ARENA_BEST_COINS, ARENA_ENDLESS, ARENA_PER, ARENA_QUICK_MS, arenaFloor, arenaLevel, arenaRank, arenaToNext, arenaLvLabel, isArenaEndless, isArenaLevelDown, isArenaLevelUp, arenaNextTitle, arenaSky, arenaTitle, arenaTitleIconAt, arenaNext, isArenaJump, arenaQuestionAt, isArenaGrammar, isArenaReading, loadArenaBest, recordArenaBest } from './arena'
import { quizXp, type Source } from './monster'
import { COURSES } from './wordcourse'
import { playCorrect, playWrong } from './sound'
import { speak } from './speech'

// 闘技場：エンドレスで戦う。正解でレベルアップ、まちがいでレベルダウン。「終了」で、いまのレベルを階で伝える。
// ボス戦ではないので、ボスは出さず「塔の階」が答えるたびに上下する（オーナーの要望）
// 1レベル20階。レベルの区切りをこえると「LEVEL UP!」の演出。いちばん上のレベルの上は無限の階
const SHAFT = 2 // いまの階の上下に見せる階の数
const CLIMB_EVERY = 10 // この回で10階のぼるごとにお祝い
const SHIELD_EVERY = 5 // 5連続正解ごとに盾（次のまちがいで1回だけ階が落ちない）
const floorColor = (f: number) => (isArenaEndless(f) ? `hsl(${(f * 37) % 360} 80% 55%)` : `hsl(${150 - (arenaLevel(f) ?? 0) * 11} 75% 48%)`)
// onAnswer：単語の問題の正誤を学習の記録に入れ、相棒のモンスターに XP（ボス戦と同じ）
export function Arena({ start, onExit, onCoins, onTicket, onAnswer, me }: { start: number; me?: ReactNode; onExit: () => void; onCoins?: (n: number) => void; onTicket?: (n: number) => void; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void }) {
  const [lv, setLv] = useState(start)
  const [q, setQ] = useState(() => arenaQuestionAt(start, 0))
  const [picked, setPicked] = useState<number | null>(null)
  const [count, setCount] = useState(0)
  const [right, setRight] = useState(0)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0) // きょういちばん長い連続正解（結果で見せる）
  const [shield, setShield] = useState(false)
  const [gotShield, setGotShield] = useState(false) // この答えで盾をもらった
  const [guarded, setGuarded] = useState(false) // この答えのまちがいを盾がまもった
  const [guards, setGuards] = useState(0) // 盾がまもった回数（結果で見せる）
  const [misses, setMisses] = useState(0) // 連続まちがい（3回で応援）
  const shownAt = useRef(0) // 問題が出た時刻（0 は最初の問題：最初に答えたときから数える）
  const [quick, setQuick] = useState(false)
  const [quicks, setQuicks] = useState(0) // 続けて「はやい！」で正解した数
  const [missed, setMissed] = useState<{ en: string; ja: string }[]>([]) // まちがえた問題（結果でふりかえる）
  const [top, setTop] = useState(start)
  const [base, setBase] = useState(start) // この回のはじめの階（きょう何階のぼったかを数える）
  const [climbed, setClimbed] = useState<number | null>(null) // この答えで「きょう10階ごと」に着いた
  const [ended, setEnded] = useState<{ newBest: boolean; best: number } | null>(null)
  const [prevBest, setPrevBest] = useState(loadArenaBest)
  // いままでの最高（はじめてなら、スタートの階）。これより上に着くと記録更新でコイン
  const [record, setRecord] = useState(() => Math.max(prevBest ?? start, start))
  const [newRecord, setNewRecord] = useState(false)
  const [newTitle, setNewTitle] = useState<string | null>(null) // はじめて着いた称号（ガチャチケット1枚）
  const correct = picked !== null && picked === q.answer
  const jump = picked !== null && isArenaJump(correct, streak)
  const nextLv = picked === null || (!correct && guarded) ? lv : arenaNext(lv, correct, correct ? streak : 0)
  // 答えたらすぐに塔の階が上下する（次へを押す前から新しい階を見せる）
  const shown = nextLv
  const dir = picked === null ? null : nextLv > lv ? 'up' : nextLv < lv ? 'down' : 'stay'
  const color = floorColor(shown)
  const levelUp = picked !== null && isArenaLevelUp(lv, nextLv)

  // at：クリックしたときの event.timeStamp（ミリ秒）
  function pick(i: number, at = 0) {
    if (picked !== null) return
    const fast = i === q.answer && shownAt.current > 0 && at - shownAt.current <= ARENA_QUICK_MS
    setQuick(fast)
    setQuicks(fast ? quicks + 1 : 0)
    setPicked(i)
    setCount(count + 1)
    if (!isArenaGrammar(q) && !isArenaReading(q)) onAnswer?.(i === q.answer, i === q.answer ? quizXp(streak + 1) : 0, q.word.id, 'quiz')
    setMisses(i === q.answer ? 0 : misses + 1)
    const earn = i === q.answer && (streak + 1) % SHIELD_EVERY === 0 && !shield
    setGotShield(earn)
    setGuarded(i !== q.answer && shield)
    if (earn) setShield(true)
    else if (i !== q.answer && shield) {
      setShield(false)
      setGuards(guards + 1)
    }
    if (i === q.answer) {
      setRight(right + 1)
      setStreak(streak + 1)
      setMaxStreak(Math.max(maxStreak, streak + 1))
      const up = arenaNext(lv, true, streak + 1)
      setTop(Math.max(top, up))
      const k = Math.floor((up - base) / CLIMB_EVERY)
      setClimbed(up > top && k > 0 && k > Math.floor((top - base) / CLIMB_EVERY) ? k * CLIMB_EVERY : null)
      if (up > record) {
        setRecord(up)
        setNewRecord(true)
        recordArenaBest(up)
        // コインは、最高記録で新しいレベル（無限の階では10階ごと）に着いたとき
        if (isArenaLevelUp(record, up)) onCoins?.(ARENA_BEST_COINS)
        // 最高記録で新しい称号に上がったら、ガチャチケット1枚（称号ごとに1回）
        if (arenaTitle(up) !== arenaTitle(record)) {
          setNewTitle(arenaTitle(up))
          onTicket?.(1)
        } else setNewTitle(null)
      } else {
        setNewRecord(false)
        setNewTitle(null)
      }
      playCorrect()
    } else {
      if (!missed.some((m) => m.en === q.word.en)) setMissed([...missed, { en: q.word.en, ja: q.choices[q.answer] }])
      setStreak(0)
      setNewRecord(false)
      setNewTitle(null)
      playWrong()
    }
  }
  function next(at = 0) {
    shownAt.current = at
    setLv(nextLv)
    setQ(arenaQuestionAt(nextLv, count, Math.random, q.word.id))
    setPicked(null)
  }
  function finish() {
    // 答えたあとに終了したときは、上下したあとの階で終わる
    if (picked !== null) {
      setLv(nextLv)
      setQ(arenaQuestionAt(nextLv, count, Math.random, q.word.id))
      setPicked(null)
    }
    const best = Math.max(top, prevBest ?? 0)
    recordArenaBest(top)
    setEnded({ newBest: prevBest === null || top > prevBest, best })
    setPrevBest(best)
  }

  if (ended)
    return (
      <section className="card boss battle-v2 arena-result" style={{ '--boss': color } as CSSProperties} aria-label="闘技場の結果">
        <p className="arena-result-title">🏟 闘技場 おつかれさま！</p>
        <p className="arena-result-floor" role="status">
          いまのあなたは <strong>{arenaFloor(lv)}</strong>
        </p>
        {arenaRank(right, count) && (
          <p className={`bfloor-rank rank-${arenaRank(right, count)}`} aria-label={`ランク ${arenaRank(right, count)}`}>
            {arenaRank(right, count)}
          </p>
        )}
        <p className="arena-title-badge">称号：{arenaTitle(lv)}</p>
        {/* きょう、はじめのレベルより上のレベルまで上がれたら */}
        {arenaLvLabel(top) !== arenaLvLabel(start) && top > start && (
          <p className="arena-lv-climb">
            📈 {arenaLvLabel(start)} → {arenaLvLabel(top)} まで上がった！
          </p>
        )}
        {arenaNextTitle(lv) && (
          <p className="arena-next-title">
            次の称号「{arenaNextTitle(lv)!.title}」まで あと{arenaNextTitle(lv)!.floors}階
          </p>
        )}
        <p className="arena-result-sub">
          {count}問中 {right}問正解{count > 0 ? `（正答率 ${Math.round((right / count) * 100)}%）` : ''}・きょういちばん上は {arenaFloor(top)}
        </p>
        {maxStreak >= 2 && <p className="arena-max-streak">🔥 いちばん長い連続正解：{maxStreak}問</p>}
        {guards > 0 && <p className="arena-max-streak">🛡 盾がまもった：{guards}回</p>}
        {missed.length > 0 && (
          <div className="arena-missed" aria-label="まちがえた問題">
            <p className="arena-missed-title">📝 ふりかえり（{missed.length}問）</p>
            <ul>
              {missed.slice(0, 8).map((m) => (
                <li key={m.en}>
                  <span className="am-en">{m.en}</span>
                  <span className="am-ja">{m.ja}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="arena-result-best">{ended.newBest ? `🏅 最高記録 更新！ ${arenaFloor(top)}` : `最高記録 ${arenaFloor(ended.best)}`}</p>
        <button
          className="good next-unit-btn"
          onClick={() => {
            setEnded(null)
            setMissed([])
            setCount(0)
            setRight(0)
            setStreak(0)
            setMaxStreak(0)
            setGuards(0)
            setTop(lv)
            setBase(lv)
          }}
        >
          ⚔ 続きから戦う
        </button>
        {lv !== start && (
          <button
            className="list-link"
            onClick={() => {
              setEnded(null)
              setMissed([])
              setCount(0)
              setRight(0)
              setStreak(0)
              setMaxStreak(0)
              setGuards(0)
              setLv(start)
              setTop(start)
              setBase(start)
              setQ(arenaQuestionAt(start, 0))
              setPicked(null)
            }}
          >
            🔁 はじめの階（{arenaFloor(start)}）から
          </button>
        )}
        <button className="list-link" onClick={onExit}>
          ← 城にもどる
        </button>
      </section>
    )

  return (
    <section className="card boss battle-v2 arena" style={{ '--boss': color } as CSSProperties} aria-label="闘技場">
      <div className="stage-head">
        <button className="stage-back" onClick={finish}>
          🏁 終了
        </button>
        <span>
          {shield && (
            <span className="arena-shield" title="次のまちがいで1回だけ階が落ちない">
              🛡{' '}
            </span>
          )}
          {streak >= 2 ? `🔥${streak}連続` : `🏟 ${count}問め`}
        </span>
      </div>
      {/* 塔の階：いまの階を中心に上下2階ずつ。答えるたびに上下に動く */}
      <div className="arena-tower" style={{ '--sky1': arenaSky(shown)[0], '--sky2': arenaSky(shown)[1] } as CSSProperties} role="progressbar" aria-label="闘技場の階" aria-valuemin={1} aria-valuemax={ARENA_ENDLESS} aria-valuenow={shown + 1}>
        <div key={`${shown}-${count}`} className={`arena-shaft${dir ? ` move-${dir}` : ''}${jump ? ' jump' : ''}`}>
          {Array.from({ length: SHAFT * 2 + 1 }, (_, k) => shown + SHAFT - k).map((f) =>
            f < 0 ? (
              <div key={f} className="arena-floor empty" aria-hidden="true">
                🌱
              </div>
            ) : (
              <div key={f} className={`arena-floor${f === shown ? ' here' : ''}${f === shown && streak >= 3 ? ' on-fire' : ''}${f === ARENA_ENDLESS ? ' summit' : ''}${f % ARENA_PER === 0 && f > 0 && f < ARENA_ENDLESS ? ' lv-gate' : ''}${isArenaEndless(f) ? ' endless' : ''}`} style={{ '--fc': floorColor(f) } as CSSProperties} aria-hidden={f !== shown}>
                <span className="af-num">{f + 1}階</span>
                <span className="af-lv">{arenaLvLabel(f)}</span>
                {f === ARENA_ENDLESS && <span className="af-summit">♾ 無限の階</span>}
                {arenaTitleIconAt(f) && <span className="af-title" title={`ここから称号「${arenaTitle(f)}」`}>{arenaTitleIconAt(f)}</span>}
                {f === record && f !== shown && <span className="af-best" title="いままでの最高の階">🚩 最高</span>}
                {f === shown && <span className={`af-me${me ? ' has-fig' : ''}${levelUp ? ' cheer' : ''}${picked !== null && !correct ? ' ouch' : ''}`} aria-hidden="true">
                    {streak >= 3 && '🔥'}
                    {me ?? '🦸'}
                  </span>}
              </div>
            ),
          )}
        </div>
        {dir === 'up' && <span key={`u${count}`} className="arena-arrow up" aria-hidden="true">{jump ? '🚀' : '⬆'}</span>}
        {/* LEVEL UP!：相棒がとびはね、紙ふぶきが舞う */}
        {levelUp && (
          <span key={`c${count}`} className="arena-confetti" aria-hidden="true">
            {['🎊', '✨', '🎉', '⭐', '✨', '🎊'].map((c, k) => (
              <i key={k} style={{ '--k': k } as CSSProperties}>
                {c}
              </i>
            ))}
          </span>
        )}
        {levelUp && (
          <span key={`m${count}`} className="arena-levelup" role="status">
            <b>LEVEL UP!</b>
            <span>{isArenaEndless(nextLv) ? (isArenaEndless(lv) ? `🎉 ${nextLv + 1}階 到達！` : '♾ 無限の階へ！') : `${arenaLvLabel(nextLv)}レベルに上がった！`}</span>
          </span>
        )}
        {dir === 'down' && <span key={`d${count}`} className="arena-arrow down" aria-hidden="true">⬇</span>}
      </div>
      <p className="arena-now">
        いま <strong>{arenaFloor(shown)}</strong>
      </p>
      {/* 次のレベルまでの進み（1レベル20階） */}
      <div className="arena-tonext" aria-label={`${arenaToNext(shown).label}まで あと${arenaToNext(shown).floors}階`}>
        <span className="atn-bar" aria-hidden="true">
          <i style={{ width: `${arenaToNext(shown).progress * 100}%` }} />
        </span>
        <span className="atn-text">
          {arenaToNext(shown).label}まで あと{arenaToNext(shown).floors}階
        </span>
      </div>
      {/* 無限の階は毎問ちがうレベルから出るので、どのレベルの問題かを見せる */}
      {isArenaEndless(lv) && <p className="arena-qtag endless-lv">♾ {COURSES[q.lv].label}レベルの問題</p>}
      {isArenaGrammar(q) && <p className="arena-qtag">📐 文法</p>}
      {isArenaReading(q) && <p className="arena-qtag reading">📖 読解　文の意味をえらぼう</p>}
      <div className="arena-q">
        <p className={`en${isArenaGrammar(q) || isArenaReading(q) ? ' boss-sentence-q' : ''}`}>{q.word.en}</p>
        {!isArenaGrammar(q) && !isArenaReading(q) && (
          <button className="arena-speak" aria-label="発音を聞く" onClick={() => speak(q.word.en)}>
            🔊
          </button>
        )}
      </div>
      <div className="choices">
        {q.choices.map((c, i) => (
          <button key={c} className={`choice${picked !== null && i === q.answer ? ' correct' : ''}${picked === i && i !== q.answer ? ' wrong' : ''}`} disabled={picked !== null} onClick={(e) => pick(i, e.timeStamp)}>
            {c}
          </button>
        ))}
      </div>
      {picked !== null && (
        <>
          <p className={`arena-move ${correct ? 'up' : 'down'}`} role="status">
            {!correct && guarded ? '🛡 盾がまもった！ 階はそのまま' : correct ? `${jump && nextLv - lv === 2 ? `🚀 ${streak}連続！ 2階ジャンプ！` : isArenaLevelUp(lv, nextLv) ? '⬆ レベルアップ！' : '⬆ 1階のぼった！'} ${arenaFloor(nextLv)}へ` : nextLv < lv ? `${isArenaLevelDown(lv, nextLv) ? '⬇ レベルダウン…' : '⬇ 1階おちた…'} ${arenaFloor(nextLv)}へ` : '😣 いちばん下の階でふんばった！'}
          </p>
          {!correct && <p className="arena-answer">正解は「{q.choices[q.answer]}」</p>}
          {correct && gotShield && <p className="arena-record">🛡 {SHIELD_EVERY}連続正解！ 盾をゲット（次のまちがいで1回だけ落ちない）</p>}
          {!correct && misses >= 3 && <p className="arena-cheer">💪 ドンマイ！ 1問ずつ取りもどそう</p>}
          {correct && quick && <p className="arena-quick">{quicks >= 3 ? `⚡⚡⚡ 電光石火！ ${quicks}問続けて はやい！` : '⚡ はやい！'}</p>}
          {correct && climbed && <p className="arena-record">🏆 この回で {climbed}階 のぼった！</p>}
          {correct && newRecord && (
            <p className="arena-record" role="status">
              🆕 最高記録！ 🪙{ARENA_BEST_COINS}
            </p>
          )}
          {correct && newTitle && (
            <p className="arena-record arena-title-get" role="status">
              🎖 新しい称号「{newTitle}」！ 🎟ガチャチケット×1
            </p>
          )}
          <button className="good next-unit-btn" onClick={(e) => next(e.timeStamp)}>
            次へ（{arenaLvLabel(nextLv)}）
          </button>
        </>
      )}
    </section>
  )
}
