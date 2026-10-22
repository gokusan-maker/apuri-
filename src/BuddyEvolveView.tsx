import { TRACK_LABEL, type BuddyForm, type Track } from './buddies'

// 文法のペット・長文の竜が進化したときの全画面演出（タップで閉じる）
export function BuddyEvolve({ track, form, onClose }: { track: Track; form: BuddyForm; onClose: () => void }) {
  return (
    <div className={`celebrate buddy-evolve b-${track}`} role="dialog" aria-label="なかまの進化" onClick={onClose}>
      <div className="celebrate-card">
        <p className="buddy-evolve-fig" aria-hidden="true">
          {form.icon}
        </p>
        <p className="celebrate-title">{form.minLv === 2 ? 'タマゴがかえった！' : '進化した！'}</p>
        <p className="celebrate-text">
          {TRACK_LABEL[track]}のなかまが「{form.name}」になった！
        </p>
        <button className="flip" onClick={onClose}>
          やったね！
        </button>
      </div>
    </div>
  )
}
