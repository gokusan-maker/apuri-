import type { Form } from './monster'
import { MonsterFigure } from './MonsterView'

// 進化したときの全画面演出（タップで閉じる）
export function Evolve({ form, wear, onClose }: { form: Form; wear?: string; onClose: () => void }) {
  return (
    <div className="celebrate evolve-screen" role="dialog" aria-label="進化" onClick={onClose}>
      <div className="evolve-card">
        <div className="evolve-figure">
          <MonsterFigure form={form} mood="happy" wear={wear} />
        </div>
        <p className="celebrate-title">{form.stage === 1 ? 'タマゴがかえった！' : '進化した！'}</p>
        <p className="evolve-name">{form.name}</p>
        <button className="flip" onClick={onClose}>
          やったね！
        </button>
      </div>
    </div>
  )
}
