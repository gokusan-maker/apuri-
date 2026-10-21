import { FORM_DESC, type Form } from './monster'
import { MonsterFigure } from './MonsterView'

// 進化したときの全画面演出（タップで閉じる）。光の柱→前の姿の白いシルエットが消える→新しい姿に色がつく
export function Evolve({ form, from, wear, kind, onClose }: { form: Form; from?: Form; wear?: string; kind?: string; onClose: () => void }) {
  return (
    <div className="celebrate evolve-screen" role="dialog" aria-label="進化" onClick={onClose}>
      <div className="evolve-flash" aria-hidden="true" />
      <div className="evolve-card">
        <div className="evolve-stage">
          <div className="evolve-pillar" aria-hidden="true" />
          <div className="evolve-rays" aria-hidden="true" />
          {from && (
            <div className="evolve-from" aria-hidden="true">
              <MonsterFigure form={from} kind={kind} />
            </div>
          )}
          <div className="evolve-figure">
            <MonsterFigure form={form} mood="happy" wear={wear} kind={kind} />
          </div>
          {['✨', '⭐', '✨', '🌟', '✨', '⭐'].map((s, i) => (
            <span key={i} className={`evolve-spark s${i}`} aria-hidden="true">
              {s}
            </span>
          ))}
        </div>
        <p className="celebrate-title">{form.stage === 1 ? 'タマゴがかえった！' : '進化した！'}</p>
        {from && from.id !== form.id && (
          <p className="evolve-change">
            {from.name} → <strong>{form.name}</strong>
          </p>
        )}
        <p className="evolve-name">{form.name}</p>
        {FORM_DESC[form.id] && <p className="evolve-desc">{FORM_DESC[form.id]}</p>}
        <button className="flip" onClick={onClose}>
          やったね！
        </button>
      </div>
    </div>
  )
}
