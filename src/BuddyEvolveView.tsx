import { BuddyFigure } from './BuddyFigureView'
import { TRACK_LABEL, type Buddy, type BuddyForm, type Track } from './buddies'

// 文法のことばモンスター・読解の竜が進化したときの全画面演出（タップで閉じる）
export function BuddyEvolve({ track, form, buddy, onClose }: { track: Track; form: BuddyForm; buddy: Buddy; onClose: () => void }) {
  return (
    <div className={`celebrate buddy-evolve b-${track}`} role="dialog" aria-label="なかまの進化" onClick={onClose}>
      <div className="celebrate-card">
        <p className="buddy-evolve-fig" aria-hidden="true">
          <BuddyFigure track={track} buddy={buddy} size={140} />
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
