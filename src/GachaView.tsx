import { dayKey } from './srs'
import { takeFirstPull } from './gachafirst'
import { useState } from 'react'
import { speak } from './speech'
import { STICKERS, STICKER_TICKETS } from './stickers'
import { helloLine, rareCheer, PITY, MYSTERY_COINS, LUCKY_BAG_PRICE, loadGachaFast, saveGachaFast, capsuleColorOf, CAPSULE_COLORS, isReach, loadCapsule, saveCapsule } from './gacha'
import { POINTS_FOR_SR, gachaShareText, GACHA_PRICE, gachaOmen, LUCKY_COINS, MULTI5, SLOT_COINS, loadGachaLog, loadGachaStats, PARTY_MAX, pushGachaLog } from './gacha'
import { FORMS, kindOf, RARITY_LABEL, speciesOf, withSpecies, type Kind, type Species } from './monster'
import { MonsterFigure } from './MonsterView'

const MULTI = 3
const RANK = ['N', 'R', 'SR', 'UR'] as const
const bestRarity = (list: GachaResult[]) => list.map((k) => k.kind.rarity).sort((a, b) => RANK.indexOf(b) - RANK.indexOf(a))[0]

export type GachaResult = { kind: Kind; species: Species; newKind?: boolean; newSpecies?: boolean; refund?: number; bonus?: string; lucky?: number; slot?: { reels: string[]; win: boolean }; sticker?: string; mystery?: boolean; nth?: number } // nth：仲間の中でそのキャラが何体目か

// 結果をシェア用の文にしてコピーするボタン
function ShareButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      className="list-link gacha-share share-go"
      onClick={() => {
        navigator.clipboard
          ?.writeText(text)
          .then(() => setCopied(true))
          .catch(() => setCopied(false))
      }}
    >
      {copied ? '✅ コピーしました' : '📋 結果をコピー'}
    </button>
  )
}

type Props = {
  coins: number
  members: number // 今の仲間の数
  tickets?: number // ガチャチケットの枚数
  partnerName?: string // レア以上が出たときによろこぶ相棒の名前
  pityLeft?: number // あと何回でスーパーレア以上が確定
  points?: number // ガチャポイント
  stickers?: string[] // 集めたシール
  boostColor?: string // 今日のおすすめ色の名前
  luckyBag?: boolean // 今月の福袋が買える
  onLuckyBag?: () => GachaResult[]
  onExchange?: () => GachaResult | null // 20ポイントでスーパーレア以上確定
  dragonUp?: boolean // 週末はドラコが出やすい
  pickup?: Species // 日替わりピックアップ（出やすい）
  price?: number // 1回の値段（ゴールデンタイムは安い）
  stepLeft?: number // ステップアップ：あと何回でレア以上確定（0なら次が確定）
  onDraw: (ticket: boolean) => GachaResult | null // 引けたら出た色ちがいと種類を返す
  onDrawMulti?: (n: number) => GachaResult[] // まとめて引く（3連ガチャ）
  onRaise?: () => void // 出たタマゴを相棒にする
  onNameNew?: (name: string) => void // 出た子にその場で名前をつける
}

// タマゴガチャ：カプセルがゆれて開き、タマゴが出てくる
export function Gacha({ partnerName, coins, members, tickets = 0, pityLeft, points, onExchange, stickers, boostColor, luckyBag, onLuckyBag, dragonUp = false, pickup, stepLeft, price = GACHA_PRICE, onDraw, onDrawMulti, onRaise, onNameNew }: Props) {
  const [result, setResult] = useState<(GachaResult & { key: number; first?: boolean }) | null>(null)
  const [log, setLog] = useState(loadGachaLog)
  const [naming, setNaming] = useState<string | null>(null) // 出た子の名前の入力中
  const [named, setNamed] = useState('')
  const [capsule, setCapsule] = useState(loadCapsule)
  const [fast, setFast] = useState(loadGachaFast)
  const [stats, setStats] = useState(loadGachaStats)
  const record = (k: GachaResult) => {
    setStats(loadGachaStats())
    recordLog(k)
  }
  const recordLog = (k: GachaResult) => setLog((l) => pushGachaLog(l, { day: new Date().toISOString().slice(0, 10), kind: k.kind.id, species: k.species.id }))
  const full = members >= PARTY_MAX
  const [multi, setMulti] = useState<{ list: GachaResult[]; key: number } | null>(null)
  const drawOne = (ticket: boolean) => {
    const k = onDraw(ticket)
    if (k) {
      setResult({ ...k, key: Date.now(), first: takeFirstPull(dayKey()) })
      setNaming(null)
      setNamed('')
      setMulti(null)
      record(k)
    }
  }
  const canMulti = !!onDrawMulti && members + MULTI <= PARTY_MAX && coins >= price * MULTI
  return (
    <div className="gacha">
      <h3 className="shop-h">🥚 タマゴガチャ（仲間 {members} / {PARTY_MAX}）</h3>
      <button
        className="good gacha-btn"
        disabled={full || coins < price}
        onClick={() => drawOne(false)}
      >
        {full ? '仲間がいっぱい' : `🎰 ガチャを引く 🪙${price}`}
      </button>
      <div className="gacha-multi">
      {onDrawMulti && !full && (
        <button
          className="good gacha-btn multi"
          disabled={!canMulti}
          onClick={() => {
            const list = onDrawMulti(MULTI)
            if (list.length === 0) return
            setResult(null)
            setMulti({ list, key: Date.now() })
            list.forEach(record)
          }}
        >
          <span className="gacha-multi-icon" aria-hidden="true">🎰</span>
          <span className="gacha-multi-title">3連ガチャ</span>
          <span className="gacha-multi-sub">タマゴ3つ</span>
          <span className="gacha-price">🪙{price * MULTI}</span>
          {members + MULTI > PARTY_MAX && <small>（仲間の空きが3ひつよう）</small>}
        </button>
      )}
      {onDrawMulti && !full && (
        <button
          className="good gacha-btn multi multi5"
          disabled={!(members + MULTI5 <= PARTY_MAX && coins >= price * MULTI5)}
          onClick={() => {
            const list = onDrawMulti(MULTI5)
            if (list.length === 0) return
            setResult(null)
            setMulti({ list, key: Date.now() })
            list.forEach(record)
          }}
        >
          <span className="gacha-multi-icon" aria-hidden="true">🌈</span>
          <span className="gacha-multi-title">5連ガチャ</span>
          <span className="gacha-multi-sub">レア以上1つ確定</span>
          <span className="gacha-price">🪙{price * MULTI5}</span>
          {members + MULTI5 > PARTY_MAX && <small>（仲間の空きが5ひつよう）</small>}
        </button>
      )}
      </div>
      {full && <p className="stats-note gacha-full-hint">なかまがいっぱい！ 「記録」→「あいぼう」の「なかま」で 👋 おわかれすると、コインにかわってガチャを続けられるよ。</p>}
      {tickets > 0 && !full && (
        <button
          className="good gacha-btn ticket"
          aria-label={`🎟 チケットで引く（あと${tickets}枚）`}
          onClick={() => drawOne(true)}
        >
          🎟 チケットで引く ×{tickets}
        </button>
      )}
      {stepLeft === 0 && (
        <p className="buddy-chips gacha-chips">
          <span className="gacha-step-chip sure">🔥 ステップアップ！ 次の1回はレア以上確定！</span>
        </p>
      )}
      <details className="gacha-info">
        <summary>ℹ️ ガチャのひみつ</summary>
        <p className="buddy-chips gacha-chips">
          <span>🎟 7日連続で1枚</span>
          {stepLeft !== undefined && stepLeft > 0 && <span className="gacha-step-chip">{`🔥 ${stepLeft + 1}回目でレア以上確定`}</span>}
          {dragonUp && <span className="gacha-event-chip">🌙 週末はふしぎなことが…？</span>}
          {boostColor && <span>🎨 ラッキーカラーの日…？</span>}
        </p>
      </details>
      {pickup && (
        <div className="gacha-pickup">
          <span className="gacha-pickup-fig">
            <MonsterFigure form={withSpecies(FORMS[0], pickup.id)} hidden />
          </span>
          <span>
            <strong>🎯 今日のピックアップ</strong>
            <br />出やすい子はお楽しみ！
          </span>
        </div>
      )}
      {price < GACHA_PRICE && <p className="gacha-golden">🌟 ゴールデンタイム！ 19時台はガチャが 🪙{GACHA_PRICE} → 🪙{price}</p>}
      {luckyBag && onLuckyBag && (
        <button
          className="good gacha-btn multi lucky-bag"
          disabled={members + 3 > PARTY_MAX}
          onClick={() => {
            const list = onLuckyBag()
            if (list.length === 0) return
            setResult(null)
            setMulti({ list, key: Date.now() })
            list.forEach(record)
          }}
        >
          <span className="gacha-multi-title">🎍 今月の福袋</span>
          <span className="gacha-multi-sub">3連ガチャ＋バトルアイテム3つ</span>
          <span className="gacha-multi-sub">🪙{LUCKY_BAG_PRICE}</span>
        </button>
      )}
      <label className="gacha-fast-toggle">
        <input
          type="checkbox"
          checked={fast}
          onChange={(e) => {
            setFast(e.target.checked)
            saveGachaFast(e.target.checked)
          }}
        />{' '}
        ⏩ 演出を短くする
      </label>
      <p className="capsule-picker" role="group" aria-label="カプセルの色">
        🎨 カプセル：
        {CAPSULE_COLORS.map((c) => (
          <button
            key={c.id}
            aria-label={`カプセル ${c.name}`}
            aria-pressed={capsule === c.id}
            className={capsule === c.id ? 'on' : undefined}
            style={{ background: c.color }}
            onClick={() => {
              setCapsule(c.id)
              saveCapsule(c.id)
            }}
          />
        ))}
      </p>
      {stickers && (
        <details className="sticker-book chip-fold cf-2">
          <summary>
            🏷 シール帳{' '}
            <span className="fold-meta" aria-label={`${STICKERS.length}まい中 ${stickers.length}まい・全部そろうと🎟${STICKER_TICKETS}`}>
              {stickers.length}/{STICKERS.length}
            </span>
          </summary>
          <p className="sticker-grid">
            {STICKERS.map((s) => (
              <span key={s} className={stickers.includes(s) ? 'got' : 'not'} aria-label={stickers.includes(s) ? `シール ${s}` : 'まだのシール'}>
                {stickers.includes(s) ? s : '？'}
              </span>
            ))}
          </p>
        </details>
      )}
      {points !== undefined && (
        <p className="gacha-points">
          🎫 ガチャポイント{' '}
          <span className="fold-meta" aria-label={`${POINTS_FOR_SR}ポイントでSR以上と交換`}>
            {Math.min(points, POINTS_FOR_SR)}/{POINTS_FOR_SR}
          </span>
          {onExchange && points >= POINTS_FOR_SR && members < PARTY_MAX && (
            <button
              className="list-link pill-btn pill-gold"
              onClick={() => {
                const k = onExchange()
                if (k) {
                  setMulti(null)
                  setResult({ ...k, key: Date.now(), first: takeFirstPull(dayKey()) })
      setNaming(null)
      setNamed('')
                  record(k)
                }
              }}
            >
              🎫 交換する
            </button>
          )}
        </p>
      )}
      {pityLeft !== undefined && (
        <>
          <p className="gacha-pity">✨ あと{pityLeft}回でSR以上確定</p>
          <div className="pity-gauge" role="meter" aria-label="スーパーレア確定までのゲージ" aria-valuemin={0} aria-valuemax={PITY} aria-valuenow={PITY - pityLeft}>
            <div style={{ width: `${((PITY - pityLeft) / PITY) * 100}%` }} />
          </div>
        </>
      )}
      {log.length > 0 && (
        <details className="gacha-odds gacha-log">
          <summary>最近のガチャ（{log.length}回）</summary>
          <ul>
            {log.map((g, i) => (
              <li key={i}>
                {g.day.slice(5).replace('-', '/')} <span className={`kind-tag r-${kindOf(g.kind).rarity}`}>{kindOf(g.kind).id === 'normal' ? '' : `${kindOf(g.kind).name}の`}</span>
                {speciesOf(g.species).name}
              </li>
            ))}
          </ul>
        </details>
      )}
      {stats.total > 0 && (
        <details className="gacha-odds gacha-stats">
          <summary>ガチャの記録（{stats.total}回）</summary>
          <ul>
            {(['UR', 'SR', 'R', 'N'] as const).map((r) => (
              <li key={r}>
                <span className={`kind-tag r-${r}`}>{RARITY_LABEL[r]}</span> {stats[r]}回
              </li>
            ))}
          </ul>
        </details>
      )}
      {multi && (
        <div key={multi.key} className={`gacha-multi r-${bestRarity(multi.list)}`} role="status">
          {gachaOmen(bestRarity(multi.list)) && <p className="gacha-omen">{gachaOmen(bestRarity(multi.list))}</p>}
          <ul>
            {multi.list.map((k, i) => (
              <li key={i} className={`r-${k.kind.rarity}`} style={{ animationDelay: `${i * 0.25}s` }}>
                <span className="gacha-multi-fig">
                  <MonsterFigure form={withSpecies(FORMS[0], k.species.id)} kind={k.kind.id} mood="happy" />
                </span>
                <span className="gacha-multi-name">
                  {k.kind.id === 'normal' ? '' : `${k.kind.name}の`}
                  {k.species.name}
                </span>
                <span className={`kind-tag r-${k.kind.rarity}`}>{RARITY_LABEL[k.kind.rarity]}</span>
                {(k.newKind || k.newSpecies) && <span className="gacha-new">NEW!</span>}
                {!!k.refund && <span className="gacha-dup">🪙{k.refund}もどった</span>}
                {k.bonus && <span className="gacha-bonus">🎁{k.bonus}</span>}
                {k.slot?.win && <span className="gacha-lucky">🎰{k.slot.reels[0]}×3 🪙{SLOT_COINS}</span>}
                {!!k.lucky && <span className="gacha-lucky">🍀{k.lucky}回目 🪙{LUCKY_COINS}</span>}
              </li>
            ))}
          </ul>
          <ShareButton text={gachaShareText(multi.list.map((k) => ({ kindName: k.kind.name, normal: k.kind.id === 'normal', speciesName: k.species.name, rarity: RARITY_LABEL[k.kind.rarity] })))} />
          <button className="list-link pill-btn pill-blue" onClick={() => setMulti(null)}>
            とじる
          </button>
        </div>
      )}
      {result && (
        <div key={result.key} className={`gacha-result r-${result.kind.rarity}${fast ? ' fast' : ''}${result.first ? ' first-pull' : ''}`} role="status">
          {result.first && <p className="gacha-first">✨ きょうの1回目！キラキラカプセル ✨</p>}
          {result.kind.rarity !== 'N' && <span className="gacha-burst" aria-hidden="true" />}
          <span className={`gacha-capsule${result.mystery ? ' mystery' : ''}`} aria-hidden="true" style={result.mystery ? undefined : result.kind.rarity === 'N' ? { background: `linear-gradient(180deg, ${capsuleColorOf(capsule)} 50%, #f8fafc 50%)` } : undefined} />
          {!result.mystery && gachaOmen(result.kind.rarity) && <p className="gacha-omen">{gachaOmen(result.kind.rarity)}</p>}
          <span className="gacha-egg">
            <MonsterFigure form={withSpecies(FORMS[0], result.species.id)} kind={result.kind.id} mood="happy" />
          </span>
          <p className="gacha-rarity">{RARITY_LABEL[result.kind.rarity]}！</p>
          <p className="gacha-attr">
            <span className="attr-badge attr-word">属性：単語</span>
          </p>
          {partnerName && !result.mystery && result.kind.rarity !== 'N' && <p className="grammar-praise gacha-cheer">🐣 {partnerName}「{rareCheer(result.kind.rarity)}」</p>}
          {result.nth !== undefined && result.nth > 1 && <p className="gacha-nth">👥 {result.species.name} {result.nth}体目</p>}
          {(result.newKind || result.newSpecies) && (
            <p className="buddy-chips gacha-new-chips" aria-label={`はじめて：${[result.newSpecies ? result.species.name : '', result.newKind ? result.kind.name : ''].filter(Boolean).join('・')}`}>
              <span className="gacha-new">NEW!</span>
              {result.newSpecies && <span>{result.species.name}</span>}
              {result.newKind && <span>{result.kind.name}</span>}
            </p>
          )}
          <p className="gacha-name">
            {result.kind.id === 'normal' ? '' : `${result.kind.name}の`}
            {result.species.egg}が仲間になった！
          </p>
          {onNameNew && (named ? (
            <p className="gacha-named">🏷 「{named}」と名前をつけたよ！</p>
          ) : naming === null ? (
            <button className="list-link pill-btn pill-green" onClick={() => setNaming('')}>
              ✏️ 名前をつける
            </button>
          ) : (
            <form
              className="buddy-rename"
              onSubmit={(e) => {
                e.preventDefault()
                const n = naming.trim().slice(0, 10)
                if (!n) return
                onNameNew(n)
                setNamed(n)
                setNaming(null)
              }}
            >
              <input aria-label="出た子の名前" value={naming} maxLength={10} onChange={(e) => setNaming(e.target.value)} />
              <button type="submit">決定</button>
            </form>
          ))}
          <p className="gacha-hello">
            👋 「{helloLine(result.species.id).en}」<span className="muted">{helloLine(result.species.id).ja}</span>
            <button className="speak small" onClick={() => speak(helloLine(result.species.id).en)} aria-label="あいさつを聞く">
              🔊
            </button>
          </p>
          {result.bonus && <p className="gacha-bonus">🎁 おまけカプセル！ {result.bonus}</p>}
          {result.mystery && <p className="gacha-lucky">❓ ミステリーカプセル！ おまけ 🪙{MYSTERY_COINS}</p>}
          {result.sticker && <p className="gacha-sticker">🏷 おまけシール {result.sticker}</p>}
          {result.slot && (
            <p className={`gacha-slot${result.slot.win ? ' win' : ''}`} aria-label={result.slot.win ? 'スロットがそろった' : 'スロット'}>
              🎰 {result.slot.reels.join(' ')}
              {result.slot.win && ` そろった！ 🪙${SLOT_COINS}`}
              {isReach(result.slot) && ' 🔥 リーチ！ おしい！'}
            </p>
          )}
          {!!result.lucky && <p className="gacha-lucky">🍀 ラッキーナンバー！ 通算{result.lucky}回目で 🪙{LUCKY_COINS}</p>}
          {!!result.refund && <p className="gacha-dup" title="同じ子がいたのでコインがもどってきた">かぶりボーナス 🪙{result.refund}！</p>}
          <ShareButton text={gachaShareText([{ kindName: result.kind.name, normal: result.kind.id === 'normal', speciesName: result.species.name, rarity: RARITY_LABEL[result.kind.rarity] }])} />
          {result.species.id !== 'mochi' && (
            <details className="gacha-species">
              <summary>「{result.species.name}」の仲間だ！</summary>
              {result.species.desc}
            </details>
          )}
          {onRaise && (
            <button
              className="flip"
              onClick={() => {
                onRaise()
                setResult(null)
              }}
            >
              🐣 この子を相棒にして育てる
            </button>
          )}
          {!full && (coins >= price || tickets > 0) && (
            <button className="good gacha-btn gacha-again" onClick={() => drawOne(coins < price)}>
              🔁 もう1回ひく{coins >= price ? `（🪙${price}）` : '（🎟1）'}
            </button>
          )}
          <button className="list-link pill-btn pill-blue" onClick={() => setResult(null)}>
            とじる
          </button>
        </div>
      )}
    </div>
  )
}
