import { useState } from 'react'
import { speak } from './speech'
import { TAP_LINES, BUDDY_FORMS, buddyLevel, buddyName, loadEggPieces, PIECES_FOR_EGG, TRACK_LABEL, type Buddy, type Track } from './buddies'
import { BuddyFigure } from './BuddyFigureView'

// 画面のいちばん上に出す、その項目のなかま（文法チャレンジ＝ことばモンスター、ボス部屋＝読解の竜）。
// 正解するとここで XP のバーがのびて、レベルが上がるのが見える
export function TrackAlly({ track, buddy, label }: { track: Track; buddy: Buddy; label: string }) {
  const [line, setLine] = useState(-1) // タップするとひとこと（順番に）
  const lv = buddyLevel(buddy)
  const next = BUDDY_FORMS[track].find((x) => x.minLv > lv.level)
  return (
    <div className={`boss-ally ally-${track}`} aria-label={label}>
      <button className="ally-fig" aria-label={`${buddyName(track, buddy)}に話しかける`} onClick={() => setLine((n) => (n + 1) % TAP_LINES[track].length)}>
        <BuddyFigure track={track} buddy={buddy} size={52} />
      </button>
      <div className="boss-ally-text">
        <strong>
          {buddyName(track, buddy)} Lv.{lv.level}
        </strong>
        <span className="buddy-bar ally-bar" role="progressbar" aria-label={`${TRACK_LABEL[track]}のなかまの経験値`} aria-valuemin={0} aria-valuemax={lv.need} aria-valuenow={lv.into}>
          <span style={{ width: `${(lv.into / lv.need) * 100}%` }} />
        </span>
        {line >= 0 && (
          <span className="ally-line" role="status">
            「{TAP_LINES[track][line].en}」
            <button className="speak small" onClick={() => speak(TAP_LINES[track][line].en)} aria-label="ひとことを聞く">
              🔊
            </button>
            <small>（{TAP_LINES[track][line].ja}）</small>
          </span>
        )}
        <small>
          XP {lv.into}/{lv.need}・{next ? `あと${next.minLv - lv.level}レベルで ？？？ に進化` : 'さいごの姿！'}
        </small>
      </div>
    </div>
  )
}

// ボス部屋のいちばん上：いっしょに戦う読解の竜
export const BossAlly = ({ buddy, wins, total, hunter = false, hideAlly = false }: { buddy: Buddy; wins?: number; total?: number; hunter?: boolean; hideAlly?: boolean }) => (
  <>
    {!hideAlly && <TrackAlly track="reading" buddy={buddy} label="いっしょに戦う読解の竜" />}
    <p className="boss-chips">
      {wins !== undefined && total !== undefined && (
        <span className="boss-record" aria-label="たおしたボスの数">
          🏆 {wins}/{total}体{hunter && <span title="ボスハンター"> 🏹</span>}
        </span>
      )}
      <span className="egg-pieces" aria-label={`タマゴのかけら ${loadEggPieces()} / ${PIECES_FOR_EGG}`}>
        🥚 かけら {loadEggPieces()}/{PIECES_FOR_EGG}
      </span>
    </p>
  </>
)
