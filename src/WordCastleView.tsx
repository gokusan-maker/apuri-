import { useEffect, useState } from 'react'
import { Castle } from './CastleView'
import { FloorClear } from './FloorClearView'
import { BOSSES } from './boss'
import { BossFigure } from './BossView'
import type { Source } from './monster'
import { usePlaying } from './playing'
import { Quiz } from './QuizView'
import { Scramble } from './ScrambleView'
import { Spell } from './SpellView'
import { loadWcClears, saveWcClears, WC_GAME_LABEL, WC_MINIBOSS_COINS, WC_MINIBOSS_PASS, WC_PASS, wcCount, wordCastleFloorsFor, type WcFloor } from './wordcastle'
import { courseWords, type CourseId } from './wordcourse'

// 単語の城：単元（10語）ごとに 5問×3階 で登る。1階目は単語の解説から
export function WordCastle({ course, name = '単語の海', onAnswer, onChest, onSpend, onPlay }: { course: CourseId; name?: string; onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void; onChest?: (coins: number) => void; onSpend?: (n: number) => boolean; onPlay?: (on: boolean) => void }) {
  const floors = wordCastleFloorsFor(course)
  const [clears, setClears] = useState(loadWcClears)
  const [floor, setFloor] = useState<WcFloor | null>(null)
  const [phase, setPhase] = useState<'quiz' | 'done' | 'boss' | 'boss-done'>('quiz')
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [tally, setTally] = useState({ n: 0, ok: 0 }) // スペル・ならべかえの答えた数と正解数
  const leave = () => {
    setFloor(null)
    onPlay?.(false)
  }
  usePlaying(!!floor, leave)
  useEffect(() => () => onPlay?.(false), []) // eslint-disable-line react-hooks/exhaustive-deps
  const start = (f: WcFloor) => {
    onPlay?.(true)
    setFloor(f)
    setPhase('quiz') // 単語一覧は出さず、いきなり問題から
    setRound((r) => r + 1)
    setTally({ n: 0, ok: 0 })
    window.scrollTo?.({ top: 0 })
  }
  if (!floor)
    return (
      <Castle
        name={name}
        theme="sea"
        onChest={onChest}
        floors={floors.map((f) => ({ id: f.id, label: f.label, sub: f.sub, cleared: clears.includes(f.id) }))}
        onOpen={(id) => {
          const f = floors.find((x) => x.id === id)
          if (f) start(f)
        }}
      />
    )
  const total = wcCount(floor)
  const finish = (s: number) => {
    setScore(s)
    setPhase('done')
    if (s >= Math.min(WC_PASS, total) && !clears.includes(floor.id)) {
      const c = [...clears, floor.id]
      setClears(c)
      saveWcClears(c)
    }
  }
  // スペル・ならべかえ：1問ごとに数えて、ぜんぶ答えたら少し待って結果へ
  const track = (correct: boolean, xp: number, wordId: string, source: Source) => {
    onAnswer?.(correct, xp, wordId, source)
    const t = { n: tally.n + 1, ok: tally.ok + (correct ? 1 : 0) }
    setTally(t)
    if (t.n >= total) window.setTimeout(() => finish(t.ok), 1200)
  }
  const next = floors[floors.findIndex((x) => x.id === floor.id) + 1]
  // 単元の3階目をクリアするとミニボス：その単元の10語で勝負（8問以上でたおす）
  const bossId = `wc:${floor.stage.id}:boss`
  const look = BOSSES[floor.stage.level]
  const bossName = `ミニ${look.name}`
  return (
    <section className="card wc-play" aria-label={`単語の城 ${floor.label}`}>
      <h2 className="wc-title">🏰 {floor.label}</h2>
      {phase === 'quiz' && <p className="wc-game">{WC_GAME_LABEL[floor.direction]}</p>}
      {phase === 'quiz' && (floor.direction === 'spell' || floor.direction === 'dictation' || floor.direction === 'order') && (floor.direction === 'order' ? (
        <Scramble key={round} words={floor.words} count={floor.words.length} onAnswer={track} />
      ) : (
        <Spell key={round} words={floor.words} count={floor.words.length} byEar={floor.direction === 'dictation'} onAnswer={track} />
      ))}
      {phase === 'quiz' && floor.direction !== 'spell' && floor.direction !== 'dictation' && floor.direction !== 'order' && (
        <Quiz
          key={round}
          words={courseWords(course)}
          targets={floor.words}
          count={floor.words.length}
          direction={floor.direction}
          lockDirection
          onAnswer={onAnswer}
          onSpend={onSpend}
          onFinish={finish}
        />
      )}
      {phase === 'boss' && (
        <>
          <p className="wc-game wc-boss-title">👹 ミニボス「{bossName}」：{WC_MINIBOSS_PASS}問以上でたおせ！</p>
          <Quiz
            key={`boss-${round}`}
            words={courseWords(course)}
            targets={floor.stage.words}
            count={floor.stage.words.length}
            direction="mix"
            lockDirection
            onAnswer={onAnswer}
            onSpend={onSpend}
            onFinish={(s) => {
              setScore(s)
              setPhase('boss-done')
              if (s >= WC_MINIBOSS_PASS && !clears.includes(bossId)) {
                const c = [...clears, bossId]
                setClears(c)
                saveWcClears(c)
                onChest?.(WC_MINIBOSS_COINS)
              }
            }}
          />
        </>
      )}
      {phase === 'boss-done' && (
        <div className="wc-result" role="status">
          <p className={`stage-result${score >= WC_MINIBOSS_PASS ? ' clear' : ''}`}>{score >= WC_MINIBOSS_PASS ? `🎉 ミニボス「${bossName}」をたおした！ ${score}/${floor.stage.words.length}（はじめては🪙${WC_MINIBOSS_COINS}）` : `ざんねん… ${score}/${floor.stage.words.length}（${WC_MINIBOSS_PASS}問以上でたおせる）`}</p>
          {next && (
            <button className="good next-unit-btn" onClick={() => start(next)}>
              🏰 次の階へ ▶ {next.label}
            </button>
          )}
          <button className="list-link pill-btn pill-blue" onClick={() => setPhase('boss')}>
            🔁 ミニボスにもう一度
          </button>
          <button className="list-link pill-btn pill-blue" onClick={leave}>
            城にもどる
          </button>
        </div>
      )}
      {phase === 'done' && (
        <div className="wc-result" role="status">
          <p className={`stage-result${score >= Math.min(WC_PASS, total) ? ' clear' : ''}`}>
            {score >= Math.min(WC_PASS, total) ? `🏰 クリア！ ${score}/${total}問正解` : `あと少し！ ${score}/${total}問（${WC_PASS}問以上でクリア）`}
          </p>
          {score >= Math.min(WC_PASS, total) && <FloorClear next={next?.label} />}
          {score >= Math.min(WC_PASS, total) && floor.floor === 2 && (
            <button className="boss-btn wc-boss-btn" onClick={() => setPhase('boss')}>
              <span className="wc-boss-fig" aria-hidden="true">
                <BossFigure hit={false} look={look} />
              </span>
              <span>
                👹 ミニボス「{bossName}」出現！
                <small>この単元の{floor.stage.words.length}語で勝負{clears.includes(bossId) ? '（たおした）' : ''}</small>
              </span>
            </button>
          )}
          {score >= Math.min(WC_PASS, total) && next && (
            <button className="good next-unit-btn" onClick={() => start(next)}>
              🏰 次の階へ ▶ {next.label}
            </button>
          )}
          <button className="list-link pill-btn pill-blue" onClick={() => start(floor)}>
            🔁 もう一度
          </button>
          <button className="list-link pill-btn pill-blue" onClick={leave}>
            城にもどる
          </button>
        </div>
      )}
    </section>
  )
}
