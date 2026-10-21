import { loadSettings } from './settings'
import { MissedList } from './MissedListView'
import { useState } from 'react'
import { BOSS_HP, bossQuestions, BOSSES, damage, HEAL_COST, HEARTS, type BossLook, type BossRecord } from './boss'
import { quizXp, type Source } from './monster'
import { easyIf } from './quiz'
import { playCorrect, playWrong } from './sound'
import { LEVELS, type Level, type Word } from './words'

type Props = {
  level: Level
  words: Word[]
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onWin: () => void
  onExit: () => void
  bonus?: number
  onSpend?: (coins: number) => boolean
  look?: BossLook // 指定がなければ単語帳のボス
  title?: string // 上に出す見出し
  hp?: number // ボスのHP（大学入試の塔は強い）
  grammar?: boolean // 4問に1問を文法問題にする（大学入試の塔）
}


// 大学入試の塔のボスの飾り（体のうしろ）
function BossDecoBack({ deco, look }: { deco: string; look: BossLook }) {
  switch (deco) {
    case 'akamon':
      return <path d="M14 56 L0 30 L8 34 L4 20 L16 30 L18 22 L24 40 Z M86 56 L100 30 L92 34 L96 20 L84 30 L82 22 L76 40 Z" fill="#fca5a5" stroke={look.line} strokeWidth="2" strokeLinejoin="round" />
    case 'okuma':
      return <path d="M28 30 a9 9 0 1 1 6 -6 Z M72 30 a9 9 0 1 0 -6 -6 Z" fill={look.color} stroke={look.line} strokeWidth="3" />
    case 'aoba':
      return <path d="M28 30 L22 10 L40 24 Z M72 30 L78 10 L60 24 Z" fill="#4ade80" stroke={look.line} strokeWidth="2.5" strokeLinejoin="round" />
    case 'machikane':
      return <path d="M76 70 Q100 72 98 84 Q86 90 74 84 Z" fill={look.color} stroke={look.line} strokeWidth="2.5" />
    default:
      return null
  }
}

// 大学入試の塔のボスの飾り（体の上）
function BossDecoFront({ deco, look }: { deco: string; look: BossLook }) {
  switch (deco) {
    case 'gate':
      return (
        <g fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5">
          <rect x="28" y="6" width="44" height="5" rx="1" />
          <rect x="32" y="13" width="36" height="3" />
          <rect x="35" y="11" width="4" height="15" />
          <rect x="61" y="11" width="4" height="15" />
        </g>
      )
    case 'penken':
      return (
        <g stroke="#1f2937" strokeWidth="2" strokeLinejoin="round">
          <path d="M74 86 L90 24 L95 27 L79 88 Z" fill="#e5e7eb" />
          <path d="M70 84 L84 90 M77 87 L75 96" stroke="#fbbf24" strokeWidth="4" />
        </g>
      )
    case 'shachi':
      return <path d="M50 24 Q40 14 46 4 Q50 12 56 8 Q52 16 60 22 Z" fill="#fde047" stroke="#a16207" strokeWidth="2" strokeLinejoin="round" />
    case 'clark':
      return (
        <g stroke="#1f2937" strokeWidth="2">
          <path d="M26 24 L74 24 L66 18 L62 6 L38 6 L34 18 Z" fill="#78350f" />
          <path d="M36 66 Q44 62 50 66 Q56 62 64 66 Q56 70 50 68 Q44 70 36 66 Z" fill="#f8fafc" />
        </g>
      )
    case 'machikane':
      return <path d="M36 80 L40 76 L44 80 L48 76 L52 80 L56 76 L60 80 L64 76" fill="none" stroke="#f8fafc" strokeWidth="2.5" />
    case 'tokeidai':
      return (
        <g stroke={look.line} strokeWidth="2">
          <rect x="38" y="2" width="24" height="22" fill="#fef3c7" />
          <circle cx="50" cy="13" r="7" fill="#fff" />
          <path d="M50 13 L50 8 M50 13 L54 15" stroke="#1f2937" strokeLinecap="round" />
        </g>
      )
    case 'okuma':
      return <path d="M42 12 L58 12 L58 24 L42 24 Z M46 4 L54 4 L54 12 L46 12 Z" fill="#fef3c7" stroke={look.line} strokeWidth="2" />
    default:
      return null
  }
}

// オリジナルのボス。単語帳ごとに色と名前が変わる
export function BossFigure({ hit, look }: { hit: boolean; look: BossLook }) {
  return (
    <svg viewBox="0 0 100 100" className={`boss-svg${hit ? ' hit' : ''}`} aria-hidden="true">
      {(!look.deco || look.deco === 'akamon') && <path d="M30 30 L24 8 L40 24 Z M70 30 L76 8 L60 24 Z" fill={look.color} stroke={look.line} strokeWidth="3" />}
      {look.deco && <BossDecoBack deco={look.deco} look={look} />}
      <path d="M12 72 Q12 24 50 22 Q88 24 88 72 Q88 92 50 92 Q12 92 12 72 Z" fill={look.color} stroke={look.line} strokeWidth="3" />
      <path d="M30 50 L44 56 M70 50 L56 56" stroke={look.eye} strokeWidth="4" strokeLinecap="round" />
      <circle cx="38" cy="58" r="4" fill={look.eye} />
      <circle cx="62" cy="58" r="4" fill={look.eye} />
      <path d="M38 74 L44 70 L50 74 L56 70 L62 74" fill="none" stroke="#f5f3ff" strokeWidth="3" />
      {look.deco && <BossDecoFront deco={look.deco} look={look} />}
    </svg>
  )
}

export function Boss({ level, words, onAnswer, onWin, onExit, bonus = 100, onSpend, look: lookProp, title, hp: maxHp = BOSS_HP, grammar = false }: Props) {
  const look = lookProp ?? BOSSES[level]
  const [qs, setQs] = useState(() => bossQuestions(words, grammar).map((q) => easyIf(loadSettings().easy, q)))
  const [index, setIndex] = useState(0)
  const [hp, setHp] = useState(maxHp)
  const [hearts, setHearts] = useState(HEARTS)
  const [combo, setCombo] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [hit, setHit] = useState(false)
  const [healed, setHealed] = useState(false) // 回復は1戦1回まで
  const [missed, setMissed] = useState<Word[]>([])

  const won = hp <= 0
  const lost = !won && (hearts <= 0 || index >= qs.length)
  const q = qs[index]

  function pick(i: number) {
    if (picked !== null || won || lost) return
    setPicked(i)
    if (i === q.answer) {
      const c = combo + 1
      setCombo(c)
      const nextHp = hp - damage(c)
      setHp(Math.max(0, nextHp))
      setHit(true)
      playCorrect()
      onAnswer?.(true, quizXp(c), q.word.id, 'quiz')
      if (nextHp <= 0) onWin()
    } else {
      setCombo(0)
      setHearts(hearts - 1)
      if (q.word.id) setMissed((m) => (m.some((w) => w.id === q.word.id) ? m : [...m, q.word]))
      playWrong()
      onAnswer?.(false, 0, q.word.id, 'quiz')
    }
  }

  function next() {
    setPicked(null)
    setHit(false)
    setIndex(index + 1)
  }

  function retry() {
    setQs(bossQuestions(words, grammar).map((q) => easyIf(loadSettings().easy, q)))
    setIndex(0)
    setHp(maxHp)
    setHearts(HEARTS)
    setCombo(0)
    setPicked(null)
    setHit(false)
    setHealed(false)
    setMissed([])
  }

  return (
    <section className="card quiz boss">
      <div className="stage-head">
        <button className="stage-back" onClick={onExit}>
          ← にげる
        </button>
        <span>{title ?? `${level} のボス`}</span>
      </div>
      <div className="boss-figure">
        <BossFigure hit={hit} look={look} />
      </div>
      <p className="boss-name">{look.name}</p>
      <div className="boss-hp" role="progressbar" aria-label="ボスのHP" aria-valuemin={0} aria-valuemax={maxHp} aria-valuenow={hp}>
        <div className="boss-hp-fill" style={{ width: `${(hp / maxHp) * 100}%` }} />
      </div>
      <p className="boss-status">
        <span aria-label={`のこりハート ${hearts}`}>{'❤️'.repeat(hearts) + '🤍'.repeat(HEARTS - hearts)}</span>
        {combo >= 2 && <span className="combo">🔥{combo}</span>}
        {onSpend && !healed && !won && hearts > 0 && hearts < HEARTS && (
          <button
            className="hint-5050"
            onClick={() => {
              if (!onSpend(HEAL_COST)) return
              setHearts(hearts + 1)
              setHealed(true)
            }}
          >
            ❤️+1（🪙{HEAL_COST}）
          </button>
        )}
      </p>

      {won ? (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="confetti"
              aria-hidden="true"
              style={{
                left: `${(i * 83) % 100}%`,
                background: ['#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'][i % 6],
                animationDelay: `${(i % 6) * 0.12}s`,
              }}
            />
          ))}
          <p className="level-up boss-result">ボスをたおした！ 🎉</p>
          <p className="result-message">ボーナス +{bonus}XP</p>
          <MissedList words={missed} />
          <button className="flip" onClick={onExit}>
            ステージにもどる
          </button>
        </>
      ) : lost && picked === null ? (
        <>
          <p className="boss-result">まけてしまった…</p>
          <p className="result-message">苦手な単語を復習して、もう一度挑戦しよう！</p>
          <MissedList words={missed} />
          <button className="flip" onClick={retry}>
            もう一度挑戦
          </button>
        </>
      ) : (
        <>
          <p className="en">{q.word.en}</p>
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
              <p className="feedback">
                {picked === q.answer ? `${damage(combo)} ダメージ！` : `正解は「${q.choices[q.answer]}」`}
              </p>
              <button className="flip" onClick={next}>
                次へ
              </button>
            </>
          )}
        </>
      )}
    </section>
  )
}

// ボス図鑑：たおしたボスは姿と日付、まだのボスはシルエット
export function BossDex({ record }: { record: BossRecord }) {
  const shadow: BossLook = { name: '？？？', color: '#9ca3af', line: '#6b7280', eye: '#e5e7eb' }
  const beaten = LEVELS.filter((l) => record[l]).length
  return (
    <div className="zukan">
      <h2>
        ボス図鑑 {beaten} / {LEVELS.length}
      </h2>
      <ul className="badge-grid">
        {LEVELS.map((l) => (
          <li key={l} className={record[l] ? 'got' : 'locked'}>
            <span className="zukan-figure">
              <BossFigure hit={false} look={record[l] ? BOSSES[l] : shadow} />
            </span>
            <span className="badge-name">{record[l] ? BOSSES[l].name : '？？？'}</span>
            <span className="badge-desc">{record[l] ? `${record[l]}・${BOSSES[l].desc ?? ''}` : `${l}のボス`}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
