import { useContext, useEffect, useRef, useState, type CSSProperties } from 'react'
import { mapRoom, nextChestIn, ChestTicketContext, chestHasTicket, CHEST_COINS, castleNow, isMilestone, loadChests, loadWalk, mapShown, mapX, openableChests, RareEggContext, saveChests, saveWalk, WalkerContext, type MapTheme } from './castle'
import type { CastleFloor } from './CastleView'
import { MapScenery } from './MapSceneryView'
import { MAP_ZONES, stageIcon, walkerGear, ZONE_COINS, zoneIndex, zoneRange } from './mapzone'

// 地図を制覇したとき、次のレベルの地図へ進むボタン
export type NextMap = { label: string; go: () => void }

const ROW = 54 // ステージの間かく（px）。地図が1画面におさまるように
const GOAL: Record<MapTheme, string> = { sea: '🏝 宝の島に着いた！ この海を制覇', forest: '🌳 森の奥に着いた！ この森を制覇', mountain: '🏔 山頂に着いた！ この山を制覇' }

// ステージの地図：レベルのステージを道にそって進む。キャラが次のステージへ歩いていく
export function StageMap({ name, floors, onOpen, theme, unit = '階', goLabel = '⚔ すすむ', againLabel = '✅ もう一度', onChest, next }: { name: string; floors: CastleFloor[]; onOpen: (id: string) => void; theme: MapTheme; unit?: string; goLabel?: string; againLabel?: string; onChest?: (coins: number) => void; next?: NextMap }) {
  const [chests, setChests] = useState(loadChests)
  const [opened, setOpened] = useState<{ at: number; egg: string | null; ticket?: boolean } | null>(null)
  const giveEgg = useContext(RareEggContext)
  const giveTicket = useContext(ChestTicketContext)
  const walker = useContext(WalkerContext)[theme]
  const now = castleNow(floors)
  const total = floors.length
  const [from] = useState(() => loadWalk(name)) // 前に開いたときにいたステージ
  const at = Math.min(now, total - 1) // キャラがいるステージ
  useEffect(() => {
    if (total > 0) saveWalk(name, at)
  }, [name, at, total])
  // 新しいゾーンに着いたら、1回だけ到着ボーナスのコイン
  const paid = useRef(false)
  const reachedNew = total > 0 && from !== null && from < at && zoneIndex(from, total) < zoneIndex(at, total)
  useEffect(() => {
    if (reachedNew && onChest && !paid.current) {
      paid.current = true
      onChest(ZONE_COINS)
    }
  }, [reachedNew, onChest])
  if (total === 0) return null
  const chest = onChest ? openableChests(now, chests[name] ?? [], total)[0] : undefined
  const zi = zoneIndex(at, total) // いまのゾーン（ステージを進むと景色が変わる）
  const zone = MAP_ZONES[theme][zi]
  const [zFrom, zTo] = zoneRange(zi, total)
  const arrived = from !== null && from < at && zoneIndex(from, total) < zi // 前に開いたときより先のゾーンに入った
  const shown = mapShown(total, now)
  const h = shown.length * ROW + 60
  const yOf = (i: number) => h - 66 - shown.indexOf(i) * ROW
  // 前のステージから歩いてくる
  const start = from !== null && from < at ? Math.max(from, shown[0]) : null // 地図の外からなら、見えているいちばん下から
  const walkFrom = start !== null && start < at ? start : null
  const walkStyle = {
    left: `${mapX(at)}%`,
    top: yOf(at) - 34,
    '--fx': walkFrom === null ? '0' : `${mapX(walkFrom) - mapX(at)}cqw`,
    '--fy': walkFrom === null ? '0px' : `${yOf(walkFrom) - yOf(at)}px`,
  } as CSSProperties
  return (
    <section className={`smap smap-${theme} smap-z${zi}${zone.night ? ' smap-night' : ''}`} aria-label={name} style={{ '--road': zone.road, '--edge': zone.edge, '--accent': zone.accent, background: `linear-gradient(${zone.sky[0]}, ${zone.sky[1]})` } as CSSProperties}>
      <p className="smap-head">
        <span className="smap-name">🗺 {name}</span>
        <span className="smap-zdots" aria-label={`ゾーン ${zi + 1} / ${MAP_ZONES[theme].length}`}>
          {MAP_ZONES[theme].map((z, k) => (
            <i key={z.name} className={k < zi ? 'done' : k === zi ? 'now' : ''} title={z.name} />
          ))}
        </span>
        <span className="castle-count" aria-label={`${now} / ${total} ${unit}クリア`}>
          {now}/{total}
        </span>
      </p>
      {now >= total && (
        <p className="castle-top">
          {GOAL[theme]}
          <span className="smap-zone-stamps" aria-label="制覇したゾーン">
            {MAP_ZONES[theme].map((z) => z.icon).join('')}
          </span>
        </p>
      )}
      {now >= total && next && (
        <button className="smap-next-map" onClick={next.go}>
          ▶ 次は「{next.label}」へ
        </button>
      )}
      {chest !== undefined && (
        <button
          className="castle-chest-btn"
          onClick={() => {
            const next = { ...chests, [name]: [...(chests[name] ?? []), chest] }
            setChests(next)
            saveChests(next)
            const ticket = !!giveTicket && chestHasTicket(chest, total)
            if (ticket) giveTicket()
            setOpened({ at: chest, egg: giveEgg ? giveEgg() : null, ticket })
            onChest?.(CHEST_COINS)
          }}
        >
          🎁 ステージ{chest}の宝箱をあける（🪙{CHEST_COINS}{giveEgg ? '＋🥚レアの卵' : ''}{giveTicket && chestHasTicket(chest, total) ? '＋🎟' : ''}）
        </button>
      )}
      {opened !== null && chest === undefined && (
        <p className="castle-chest-got" role="status">
          <span className="chest-burst" aria-hidden="true">
            <i>🪙</i>
            <i>🪙</i>
            <i>🪙</i>
          </span>
          ✨ ステージ{opened.at}の宝箱から 🪙{CHEST_COINS}
          {opened.egg ? ` と 🥚${opened.egg}` : ''}
          {opened.ticket ? ' と 🎟ガチャチケット' : ''} を手に入れた！
        </p>
      )}
      <div className="smap-land" style={{ height: h }}>
        <MapScenery theme={theme} zone={zi} h={h} />
        {/* 道：ふち → 道 → まん中の点線 の3本でかく */}
        <svg className="smap-path" viewBox={`0 0 100 ${h}`} preserveAspectRatio="none" aria-hidden="true">
          <polyline className="smap-road-edge" points={shown.map((i) => `${mapX(i)},${yOf(i)}`).join(' ')} />
          <polyline className="smap-road" points={shown.map((i) => `${mapX(i)},${yOf(i)}`).join(' ')} />
          <polyline className="smap-road-dash" points={shown.map((i) => `${mapX(i)},${yOf(i)}`).join(' ')} />
        </svg>
        {arrived && (
          <p className="smap-arrive" role="status">
            <span className="smap-arrive-icon" aria-hidden="true">
              {zone.icon}
            </span>
            新しいゾーン「{zone.name}」に到着！{onChest ? ` 🪙${ZONE_COINS}` : ''}
            {walkerGear(zone) && <small className="smap-arrive-gear">{walkerGear(zone)} を持って進もう！</small>}
          </p>
        )}
        <span className="smap-zone" aria-label={`ゾーン${zi + 1}：${zone.name}（ステージ${zFrom}〜${zTo}）`}>
          {zone.icon} {zone.name}
          <small className="smap-zone-step">
            {Math.min(at + 1, zTo) - zFrom + 1}/{zTo - zFrom + 1}
          </small>
        </span>
        {zone.deco.map((d, k) => (
          <span key={k} className={`smap-deco d${k}`} aria-hidden="true">
            {d}
          </span>
        ))}
        {shown.map((i) => {
          const f = floors[i]
          const style = { left: `${mapX(i)}%`, top: yOf(i), '--room': `${mapRoom(mapX(i))}cqw` } as CSSProperties
          const chestMark = isMilestone(i + 1, total) && <span className="smap-chest" aria-label="宝箱のステージ（レアの卵）">🎁</span>
          if (i > now)
            return (
              <div key={f.id} className="smap-node locked" style={style} aria-label={`${i + 1}${unit}（まだ）`}>
                <span className="smap-spot">🔒</span>
                <small className="smap-no">{i + 1}</small>
                {chestMark}
              </div>
            )
          const isNow = i === now
          return (
            <div key={f.id} className={`smap-node${isNow ? ' now' : ' cleared'}${isNow ? (mapX(i) > 50 ? ' side-l' : ' side-r') : ''}`} style={style}>
              <span className="smap-spot" aria-hidden="true">
                {stageIcon(theme, i, total)}
                {!isNow && <i className="smap-star">★</i>}
              </span>
              {chestMark}
              <button className="smap-btn" aria-label={`${i + 1}${unit}：${f.label}${f.cleared ? '（クリア）' : ''}`} onClick={() => onOpen(f.id)}>
                {isNow && <small className="smap-no">ステージ{i + 1}</small>}
                {isNow && <span className="smap-label">{f.label}</span>}
                {isNow && isMilestone(i + 1, total) ? <small className="smap-chest-now">🎁 クリアで宝箱！</small> : isNow && f.sub && <small className="smap-sub">{f.sub}</small>}
                <span className="smap-go">{isNow ? goLabel : againLabel}</span>
              </button>
            </div>
          )
        })}
        {walker && (
          <span className={`smap-walker${walkFrom !== null ? ' walking' : ''}`} style={walkStyle} aria-hidden="true">
            {walker}
            {walkerGear(zone) && <i className="smap-gear">{walkerGear(zone)}</i>}
          </span>
        )}
      </div>
      {chest === undefined && nextChestIn(now, total) !== null && (
        <p className="smap-next-chest" aria-label="次の宝箱まで">
          {nextChestIn(now, total) === 1 ? '🎁 次のステージをクリアすると宝箱！ もう少し！' : `🎁 次の宝箱まで あと${nextChestIn(now, total)}ステージ`}
        </p>
      )}
      {shown[0] > 0 && <p className="castle-below">⬇ {shown[0]}ステージぶん、クリアずみ</p>}
    </section>
  )
}
