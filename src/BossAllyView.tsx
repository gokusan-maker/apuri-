import { BUDDY_FORMS, buddyForm, buddyLevel, type Buddy } from './buddies'
import { BuddyFigure } from './BuddyFigureView'

// ボス部屋のいちばん上：いっしょに戦う読解の竜（読解問題に正解すると育つ）
export function BossAlly({ buddy }: { buddy: Buddy }) {
  const f = buddyForm('reading', buddy)
  const lv = buddyLevel(buddy).level
  const next = BUDDY_FORMS.reading.find((x) => x.minLv > lv)
  return (
    <div className="boss-ally" aria-label="いっしょに戦う読解の竜">
      <BuddyFigure track="reading" buddy={buddy} size={52} />
      <div className="boss-ally-text">
        <strong>
          {buddy.name ?? f.name} Lv.{lv}
        </strong>
        <small>{next ? `あと${next.minLv - lv}レベルで「${next.name}」に進化` : 'さいごの姿！'}・読解問題に正解すると育つ</small>
      </div>
    </div>
  )
}
