// ガチャの演出ページ（オーナーの要望：引いたら画面いっぱいの演出ページへ。カプセル→タマゴ→われて→出てきたキャラクターを見せる）
// レア度で光の色・確定演出・紙ふぶきの量が変わる。スキップでき、「演出を短くする」とすぐ出る
import { useEffect, useState } from 'react'
import type { GachaResult } from './GachaView'
import { MonsterFigure } from './MonsterView'
import { FORMS, withSpecies } from './monster'
import { playGachaSound } from './sound'

type Phase = 'drop' | 'shake' | 'omen' | 'crack' | 'reveal'
const STARS: Record<string, number> = { N: 1, R: 2, SR: 3, UR: 4 }
const RANK_EN: Record<string, string> = { N: 'NORMAL', R: 'RARE', SR: 'SUPER RARE', UR: 'ULTRA RARE' }
const CONFETTI_COLORS = ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#fde047']

// 紙ふぶき：つぶの位置・色・おくれは番号から決める（毎回同じ見え方）
function confetti(n: number) {
  return Array.from({ length: n }, (_, j) => ({
    left: `${(j * 37) % 100}%`,
    delay: `${((j * 53) % 100) / 100}s`,
    dur: `${1.6 + ((j * 29) % 10) / 10}s`,
    color: CONFETTI_COLORS[j % CONFETTI_COLORS.length],
    rot: `${(j * 47) % 360}deg`,
  }))
}

export function GachaReveal({ list, fast = false, onClose }: { list: GachaResult[]; fast?: boolean; onClose: () => void }) {
  const [i, setI] = useState(0)
  const [phase, setPhase] = useState<Phase>('drop')
  const k = list[i]
  const r = k.kind.rarity
  const rare = r === 'SR' || r === 'UR'
  const quick = fast || i > 0 // 2体目からと「演出を短くする」は短め

  useEffect(() => {
    const plan: [Phase, number][] = quick
      ? [['shake', 200], ['crack', 550], ['reveal', 850]]
      : rare
        ? [['shake', 900], ['omen', 2000], ['crack', 3300], ['reveal', 3800]]
        : [['shake', 900], ['crack', 2200], ['reveal', 2700]]
    playGachaSound('drop')
    const ids = plan.map(([p, t]) =>
      window.setTimeout(() => {
        setPhase(p)
        playGachaSound(p === 'reveal' ? (rare ? 'revealRare' : 'reveal') : p === 'omen' ? 'omen' : p === 'crack' ? 'crack' : 'shake')
      }, t),
    )
    return () => ids.forEach((id) => window.clearTimeout(id))
  }, [i, quick, rare])

  const egg = withSpecies(FORMS[0], k.species.id)
  const baby = withSpecies(FORMS[1], k.species.id)
  const name = `${k.kind.id === 'normal' ? '' : `${k.kind.name}の`}${k.species.name}`
  const last = i === list.length - 1
  return (
    <div className={`gacha-reveal r-${r} ph-${phase}${quick ? ' quick' : ''}`} role="dialog" aria-label="ガチャの演出">
      <div className="gr-bg" aria-hidden="true" />
      <div className="gr-rays" aria-hidden="true" />
      <div className="gr-stars" aria-hidden="true">
        {Array.from({ length: 18 }, (_, j) => (
          <i key={j} style={{ left: `${(j * 41) % 100}%`, top: `${(j * 67) % 100}%`, animationDelay: `${(j % 6) * 0.3}s` }} />
        ))}
      </div>
      {list.length > 1 && <p className="gr-count">{i + 1} / {list.length}</p>}
      {phase !== 'reveal' && (
        <button className="gr-skip" onClick={() => setPhase('reveal')}>
          スキップ ▶▶
        </button>
      )}

      {/* カプセルが落ちてきて、パカッとあくとタマゴ */}
      {(phase === 'drop' || phase === 'shake') && (
        <div className="gr-capsule" aria-hidden="true">
          <span className="gr-cap-top" />
          <span className="gr-cap-bottom" />
        </div>
      )}
      {phase !== 'drop' && phase !== 'reveal' && (
        <div className="gr-egg" aria-hidden="true">
          <MonsterFigure form={egg} kind={k.kind.id} mood="happy" />
          <span className="gr-crack" />
        </div>
      )}
      {phase === 'omen' && (
        <p className="gr-omen" aria-hidden="true">
          <span>！？</span>
          <b>{r === 'UR' ? 'ウルトラレア確定！！' : 'スーパーレア確定！'}</b>
        </p>
      )}
      {phase === 'crack' && <span className="gr-flash" aria-hidden="true" />}

      {phase === 'reveal' && (
        <div className="gr-show">
          <div className="gr-confetti" aria-hidden="true">
            {confetti(rare ? 44 : r === 'R' ? 28 : 16).map((c, j) => (
              <i key={j} style={{ left: c.left, animationDelay: c.delay, animationDuration: c.dur, background: c.color, rotate: c.rot }} />
            ))}
          </div>
          <span className="gr-shell left" aria-hidden="true" />
          <span className="gr-shell right" aria-hidden="true" />
          <p className="gr-rank">
            <span className="gr-stars-row" aria-label={`星${STARS[r]}つ`}>
              {'★'.repeat(STARS[r])}
            </span>
            <span className="gr-rank-en">{RANK_EN[r]}</span>
          </p>
          <div className="gr-fig">
            <MonsterFigure form={baby} kind={k.kind.id} mood="happy" />
          </div>
          <p className="gr-name">
            {name}
            {(k.newKind || k.newSpecies) && <span className="gr-new">NEW</span>}
          </p>
          <p className="gr-sub">タマゴから生まれるのはこの子！ 育てると会えるよ</p>
          <button
            className="flip go-next gr-next"
            onClick={() => {
              if (last) onClose()
              else {
                setI(i + 1)
                setPhase('drop')
              }
            }}
          >
            {last ? 'やったね！ とじる' : `つぎへ ▶（${i + 2}/${list.length}）`}
          </button>
        </div>
      )}
    </div>
  )
}
