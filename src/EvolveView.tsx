import { FORM_DESC, type Form } from './monster'
import { MonsterFigure } from './MonsterView'

// 進化したときの全画面演出（タップで閉じる）。光の筋→白いシルエット→色がつく
export function Evolve({ form, wear, kind, onClose }: { form: Form; wear?: string; kind?: string; onClose: () => void }) {
  return (
    <div className="celebrate evolve-screen" role="dialog" aria-label="進化" onClick={onClose}>
      <div className="evolve-flash" aria-hidden="true" />
      <div className="evolve-card">
        <div className="evolve-stage">
          <div className="evolve-rays" aria-hidden="true" />
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
        <p className="evolve-name">{form.name}</p>
        {FORM_DESC[form.id] && <p className="evolve-desc">{FORM_DESC[form.id]}</p>}
        <button className="flip" onClick={onClose}>
          やったね！
        </button>
      </div>
    </div>
  )
}
