import { useContext, useState, type ReactNode } from 'react'
import { CHEST_COINS, nextChestIn, castleNow, castleShown, isMilestone, loadChests, openableChests, RareEggContext, saveChests, type MapTheme } from './castle'
import { StageMap, type NextMap } from './StageMapView'

export type CastleFloor = { id: string; label: string; sub?: string; fig?: ReactNode; cleared: boolean }

// 城の塔：1階ずつクリアしてのぼる。夜空・月・山・天守の屋根・旗・石の壁・たいまつ・門と堀
export function Castle({ name, floors, onOpen, theme = 'blue', unit = '階', goLabel = '⚔ のぼる', againLabel = '✅ もう一度', onChest, next }: { name: string; floors: CastleFloor[]; onOpen: (id: string) => void; theme?: 'blue' | 'red' | 'green' | 'purple' | 'tower' | MapTheme; unit?: string; goLabel?: string; againLabel?: string; onChest?: (coins: number) => void; next?: NextMap }) {
  if (theme === 'sea' || theme === 'forest' || theme === 'mountain') return <StageMap name={name} floors={floors} onOpen={onOpen} theme={theme} unit={unit} onChest={onChest} againLabel={againLabel} next={next} />
  return <CastleTower name={name} floors={floors} onOpen={onOpen} theme={theme} unit={unit} goLabel={goLabel} againLabel={againLabel} onChest={onChest} />
}

function CastleTower({ name, floors, onOpen, theme, unit, goLabel, againLabel, onChest }: { name: string; floors: CastleFloor[]; onOpen: (id: string) => void; theme: 'blue' | 'red' | 'green' | 'purple' | 'tower'; unit: string; goLabel: string; againLabel: string; onChest?: (coins: number) => void }) {
  const [chests, setChests] = useState(loadChests)
  const [opened, setOpened] = useState<{ at: number; egg: string | null } | null>(null) // いまあけた宝箱の階と、出てきたレアの卵
  const giveEgg = useContext(RareEggContext)
  if (floors.length === 0) return null
  const now = castleNow(floors)
  const chest = onChest ? openableChests(now, chests[name] ?? [], floors.length)[0] : undefined
  const top = now >= floors.length
  const tower = theme === 'tower' // イベントの塔：城とはちがう、細長い1本の塔（雲の上・星空）
  return (
    <section className={`castle castle-${theme}`} aria-label={name}>
      <svg className="castle-sky" viewBox="0 0 360 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <circle className="castle-moon" cx="236" cy="34" r="13" />
        <path d="M0 120 L40 70 L80 100 L130 55 L180 95 L230 60 L280 100 L320 75 L360 105 L360 120 Z" className="castle-mount" />
      </svg>
      <p className="castle-head">
        <span className="castle-name">{tower ? '🗼' : '🏰'} {name}</span>
        <span className="castle-count" aria-label={`${now} / ${floors.length} ${unit}クリア`}>
          {now}/{floors.length}
          {unit}
        </span>
      </p>
      {top && <p className="castle-top">{tower ? '👑 てっぺん制覇！ 塔をのぼりきった' : '👑 てっぺん制覇！ 城の主になった'}</p>}
      {chest !== undefined && (
        <button
          className="castle-chest-btn"
          onClick={() => {
            const next = { ...chests, [name]: [...(chests[name] ?? []), chest] }
            setChests(next)
            saveChests(next)
            setOpened({ at: chest, egg: giveEgg ? giveEgg() : null })
            onChest?.(CHEST_COINS)
          }}
        >
          🎁 {chest}{unit}の宝箱をあける（🪙{CHEST_COINS}{giveEgg ? '＋🥚レアの卵' : ''}）
        </button>
      )}
      {opened !== null && chest === undefined && (
        <p className="castle-chest-got" role="status">
          ✨ {opened.at}{unit}の宝箱から 🪙{CHEST_COINS}{opened.egg ? ` と 🥚${opened.egg}` : ''} を手に入れた！
        </p>
      )}
      <div className="castle-body">
        {tower ? (
          <svg className="castle-roof tower-roof" viewBox="0 0 320 120" aria-hidden="true">
            {/* てっぺんの光る水晶と、細長い尖塔 */}
            <path d="M160 2 L172 22 L160 42 L148 22 Z" className="tower-crystal" />
            <path d="M160 42 L196 96 L124 96 Z" className="tower-spire" />
            <path d="M160 42 L160 96" className="tower-spire-line" />
            <rect x="116" y="94" width="88" height="10" rx="2" className="tower-ledge" />
            <rect x="126" y="104" width="68" height="16" className="tower-stone" />
            <rect x="150" y="66" width="20" height="22" rx="10" className="castle-window lit" />
            <circle cx="40" cy="30" r="2" className="tower-star" />
            <circle cx="80" cy="60" r="1.5" className="tower-star" />
            <circle cx="262" cy="22" r="2" className="tower-star" />
            <circle cx="292" cy="70" r="1.5" className="tower-star" />
          </svg>
        ) : (
        <svg className="castle-roof" viewBox="0 0 320 110" aria-hidden="true">
          {/* 左右の小さな塔 */}
          <g className="castle-turret">
            <rect x="14" y="58" width="44" height="52" />
            <path d="M8 60 L36 14 L64 60 Z" className="castle-cone" />
            <path d="M36 14 L36 2" className="castle-pole" />
            <path className="castle-flag" d="M36 2 L54 7 L36 12 Z" />
            <rect x="31" y="72" width="10" height="16" rx="5" className="castle-slit" />
          </g>
          <g className="castle-turret">
            <rect x="262" y="58" width="44" height="52" />
            <path d="M256 60 L284 14 L312 60 Z" className="castle-cone" />
            <path d="M284 14 L284 2" className="castle-pole" />
            <path className="castle-flag" d="M284 2 L302 7 L284 12 Z" />
            <rect x="279" y="72" width="10" height="16" rx="5" className="castle-slit" />
          </g>
          {/* まん中の天守 */}
          <rect x="98" y="46" width="124" height="64" className="castle-keep" />
          <path d="M90 50 L160 4 L230 50 Z" className="castle-cone big" />
          <path d="M160 4 L160 -10" className="castle-pole" />
          <path className="castle-flag big" d="M160 -10 L188 -3 L160 4 Z" />
          <circle cx="160" cy="34" r="8" className="castle-crest" />
          <rect x="146" y="64" width="28" height="30" rx="14" className="castle-window lit" />
          {/* 城壁のぎざぎざ */}
          <path d="M0 110 V96 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h14 v8 h14 v-8 h12 V110 Z" className="castle-battle" />
        </svg>
        )}
        <ol className="castle-floors">
          {castleShown(floors.length, now).map((i) => {
            const f = floors[i]
            if (i > now)
              return (
                <li key={f.id} className="locked" aria-label={`${i + 1}${unit}（まだ）`}>
                  <span className="castle-plate">{i + 1}</span>
                  <span className="castle-gate-lock">🔒 とびらはまだ閉じている</span>
                </li>
              )
            const isNow = i === now
            return (
              <li key={f.id} className={`${isNow ? 'now' : 'cleared'}${isMilestone(i + 1, floors.length) ? ' chest' : ''}`}>
                {isNow && <span className="castle-torch l" aria-hidden="true" />}
                {isNow && <span className="castle-torch r" aria-hidden="true" />}
                {isNow && <span className="castle-ribbon" aria-hidden="true">いまここ</span>}
                {!isNow && <span className="castle-banner" aria-hidden="true">★</span>}
                <span className="castle-plate">{i + 1}</span>
                {isMilestone(i + 1, floors.length) && <span className="castle-chest-mark" aria-label="宝箱の階（レアの卵）">🎁🥚</span>}
                {f.fig && <span className="castle-arch">{f.fig}</span>}
                <button className="castle-btn" aria-label={`${i + 1}${unit}：${f.label}${f.cleared ? '（クリア）' : ''}`} onClick={() => onOpen(f.id)}>
                  <span className="castle-label">{f.label}</span>
                  {f.sub && <small className="castle-sub">{f.sub}</small>}
                  <span className="castle-go">{isNow ? goLabel : againLabel}</span>
                </button>
              </li>
            )
          })}
        </ol>
        {onChest && chest === undefined && nextChestIn(now, floors.length) !== null && (
          <p className="castle-next-chest" aria-label="次の宝箱まで">
            {nextChestIn(now, floors.length) === 1 ? `🎁 次の${unit}をクリアすると宝箱！ もう少し！` : `🎁 次の宝箱まで あと${nextChestIn(now, floors.length)}${unit}`}
          </p>
        )}
        {now > 2 && <p className="castle-below">⬇ {now - 2}{unit}ぶん、制覇ずみ</p>}
        {tower ? (
          <div className="tower-clouds" aria-hidden="true" />
        ) : (
          <>
            <div className="castle-gate" aria-hidden="true">
              <span className="castle-door">
                <i />
              </span>
            </div>
            <div className="castle-moat" aria-hidden="true" />
          </>
        )}
      </div>
    </section>
  )
}
