import { BUDDY_FORMS, buddyLevel, buddyName, loadEggPieces, PIECES_FOR_EGG, TRACK_LABEL, type Buddy, type Track } from './buddies'
import { BuddyFigure } from './BuddyFigureView'

// 画面のいちばん上に出す、その項目のなかま（文法チャレンジ＝ことばモンスター、ボス部屋＝読解の竜）。
// 正解するとここで XP のバーがのびて、レベルが上がるのが見える
export function TrackAlly({ track, buddy, label }: { track: Track; buddy: Buddy; label: string }) {
  const lv = buddyLevel(buddy)
  const next = BUDDY_FORMS[track].find((x) => x.minLv > lv.level)
  return (
    <div className={`boss-ally ally-${track}`} aria-label={label}>
      <BuddyFigure track={track} buddy={buddy} size={52} />
      <div className="boss-ally-text">
        <strong>
          {buddyName(track, buddy)} Lv.{lv.level}
        </strong>
        <span className="buddy-bar ally-bar" role="progressbar" aria-label={`${TRACK_LABEL[track]}のなかまの経験値`} aria-valuemin={0} aria-valuemax={lv.need} aria-valuenow={lv.into}>
          <span style={{ width: `${(lv.into / lv.need) * 100}%` }} />
        </span>
        <small>
          XP {lv.into}/{lv.need}・{next ? `あと${next.minLv - lv.level}レベルで ？？？ に進化` : 'さいごの姿！'}・{TRACK_LABEL[track]}の問題に正解すると育つ
        </small>
      </div>
    </div>
  )
}

// ボス部屋のいちばん上：いっしょに戦う読解の竜
export const BossAlly = ({ buddy }: { buddy: Buddy }) => (
  <>
    <TrackAlly track="reading" buddy={buddy} label="いっしょに戦う読解の竜" />
    <p className="stats-note egg-pieces">
      🥚 タマゴのかけら {loadEggPieces()} / {PIECES_FOR_EGG}（ボスに勝つと1つ。そろうと新しいなかまが生まれる）
    </p>
  </>
)
