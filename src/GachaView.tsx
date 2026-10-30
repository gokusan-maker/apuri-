import type { CSSProperties } from 'react'
import { dayKey } from './srs'
import { takeFirstPull } from './gachafirst'
import { useState } from 'react'
import { speak } from './speech'
import { replyOf, skillOf, specialOf } from './partner'
import { STICKERS, STICKER_TICKETS } from './stickers'
import { castleLuck, helloLine, rareCheer, PITY, MYSTERY_COINS, LUCKY_BAG_PRICE, loadGachaFast, saveGachaFast, capsuleColorOf, CAPSULE_COLORS, isReach, loadCapsule, saveCapsule } from './gacha'
import { MEMBERS_FOR_TICKET } from './party'
import { CHARA_PRICE, loadNStreak, RARE_EVERY } from './gacha'
import { POINTS_FOR_SR, gachaShareText, GACHA_PRICE, gachaOmen, LUCKY_COINS, MULTI5, SLOT_COINS, loadGachaLog, loadGachaStats, PARTY_MAX, pushGachaLog } from './gacha'
import { typeOf } from './chartype'
import { formOf, levelInfo, type MonsterState } from './monster'
import { FORMS, kindOf, RARITY_LABEL, SPECIES, speciesOf, withSpecies, type Kind, type Species } from './monster'
import { challengeOf } from './challenge'
import { MonsterFigure } from './MonsterView'
import { GachaReveal } from './GachaRevealView'

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
  ownedSpecies?: string[] // 持っているキャラクターの種類（図鑑用）
  speciesLevels?: Record<string, number> // デザイン101：種類ごとのいちばん高いレベル（図鑑用）
  onChara?: () => GachaResult | null // キャラガチャ（生まれた姿で出る）
  charaPrice?: number
  coins: number
  members: number // 今の仲間の数
  tickets?: number // ガチャチケットの枚数
  partnerName?: string // レア以上が出たときによろこぶ相棒の名前
  pityLeft?: number // あと何回でスーパーレア以上が確定
  castles?: number // 制覇した城の数（多いほどレアが出やすい）
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
  free?: boolean // 今日の無料の1回がまだある
  rareTickets?: number // 💎レアチケット（レア以上確定）
  srTickets?: number // 🌟SRチケット（スーパーレア以上確定）
  onTier?: (tier: 'rare' | 'sr') => GachaResult | null
  tradeCount?: number // チケットと交換できる仲間（相棒・★以外）の数
  tradeDisabled?: boolean
  onTrade?: (picks?: number[]) => void
  tradePool?: { index: number; member: MonsterState }[] // 交換できる子（えらんで交換） // 仲間10体 → 🎟1まい
  onFree?: () => GachaResult | null // 1日1回の無料ガチャ
  onDrawMulti?: (n: number) => GachaResult[] // まとめて引く（3連ガチャ）
  onRaise?: () => void // 出たタマゴを相棒にする
  onNameNew?: (name: string) => void // 出た子にその場で名前をつける
}

// タマゴガチャ：カプセルがゆれて開き、タマゴが出てくる
export function Gacha({ partnerName, coins, members, tickets = 0, pityLeft, castles = 0, points, onExchange, stickers, boostColor, luckyBag, onLuckyBag, dragonUp = false, pickup, stepLeft, price = GACHA_PRICE, onDraw, free = false, onFree, rareTickets = 0, srTickets = 0, onTier, tradeCount, tradeDisabled = false, onTrade, tradePool, onDrawMulti, onRaise, onNameNew, ownedSpecies, speciesLevels, onChara, charaPrice = CHARA_PRICE }: Props) {
  const [result, setResult] = useState<(GachaResult & { key: number; first?: boolean }) | null>(null)
  const [shake, setShake] = useState(0) // コインがたりないのに押した回数（首をふる）
  const [shakeM, setShakeM] = useState(0) // 首をふった連ガチャ（3 か 5）
  const [shakeN, setShakeN] = useState(0)
  const shakeAt = (n: number) => {
    setShakeM(n)
    setShakeN(shakeN + 1)
  }
  const [log, setLog] = useState(loadGachaLog)
  const [naming, setNaming] = useState<string | null>(null) // 出た子の名前の入力中
  const [named, setNamed] = useState('')
  const [capsule, setCapsule] = useState(loadCapsule)
  const [fast, setFast] = useState(loadGachaFast)
  const [reveal, setReveal] = useState<GachaResult[] | null>(null) // 引いたら画面いっぱいの演出ページ
  const [stats, setStats] = useState(loadGachaStats)
  const [picks, setPicks] = useState<number[] | null>(null) // 交換する子をえらんでいるところ
  const [tab, setTab] = useState<'egg' | 'chara'>('egg') // ガチャの種類
  const [charaGot, setCharaGot] = useState('') // キャラガチャで出た子の名前
  const [freshId, setFreshId] = useState('') // 図鑑にはじめてのったキャラ（光ってうまる）
  const [lineupHint, setLineupHint] = useState('') // ラインナップでタップした子（ヒントを出す）
  const drawChara = () => {
    const k = onChara?.() ?? null
    if (!k) return
    setFreshId(k.species.id !== 'mochi' && !(ownedSpecies ?? []).includes(k.species.id) ? k.species.id : '')
    setReveal([k])
    record(k)
    setCharaGot(`${k.kind.id === 'normal' ? '' : `${k.kind.name}の`}${k.species.name}`)
  }
  const record = (k: GachaResult) => {
    setStats(loadGachaStats())
    recordLog(k)
  }
  const recordLog = (k: GachaResult) => setLog((l) => pushGachaLog(l, { day: new Date().toISOString().slice(0, 10), kind: k.kind.id, species: k.species.id }))
  const full = members >= PARTY_MAX
  const [multi, setMulti] = useState<{ list: GachaResult[]; key: number } | null>(null)
  const drawOne = (ticket: boolean | 'free' | 'rare' | 'sr') => {
    const k = ticket === 'free' ? (onFree?.() ?? null) : ticket === 'rare' || ticket === 'sr' ? (onTier?.(ticket) ?? null) : onDraw(ticket)
    if (k) {
      setResult({ ...k, key: Date.now(), first: takeFirstPull(dayKey()) })
      setReveal([k])
      setNaming(null)
      setNamed('')
      setMulti(null)
      record(k)
    }
  }
  const canMulti = !!onDrawMulti && members + MULTI <= PARTY_MAX && coins >= price * MULTI
  const poor3 = members + MULTI <= PARTY_MAX && coins < price * MULTI // 空きはあるのにコインがたりない（押すと首をふる）
  const poor5 = members + MULTI5 <= PARTY_MAX && coins < price * MULTI5
  return (
    <div className="gacha">
      {reveal && reveal.length > 0 && (
        <GachaReveal
          list={reveal}
          fast={fast}
          onClose={() => {
            setReveal(null)
            // とじたら、下の結果（名前をつける・相棒にする など）へ
            window.setTimeout(() => document.querySelector('.gacha-result, .gacha-multi')?.scrollIntoView?.({ block: 'center' }), 50)
          }}
        />
      )}
      {onChara && (
        <div className="gacha-kinds" role="tablist" aria-label="ガチャの種類">
          <button role="tab" aria-selected={tab === 'egg'} className={`gacha-kind-tab${tab === 'egg' ? ' on' : ''}`} onClick={() => setTab('egg')}>
            🥚 タマゴガチャ
          </button>
          <button role="tab" aria-selected={tab === 'chara'} className={`gacha-kind-tab${tab === 'chara' ? ' on' : ''}`} onClick={() => setTab('chara')}>
            🐣 キャラガチャ
          </button>
        </div>
      )}
      {tab === 'chara' && onChara ? (
        <div className="chara-gacha">
          <h3 className="shop-h">🐣 キャラガチャ（仲間 {members} / {PARTY_MAX}）</h3>
          <p className="chara-gacha-note">タマゴではなく、もう生まれた姿で出てくるよ。すぐにボス戦でいっしょに戦える！</p>
          <ul className="chara-gacha-lineup" aria-label="出てくるキャラクター">
            {SPECIES.map((sp) => {
              const met = (ownedSpecies ?? []).includes(sp.id) || sp.id === 'mochi'
              return (
                <li key={sp.id} title={met ? `${sp.name}（${typeOf(sp.id).name}）` : 'まだ会っていないキャラクター'} style={{ '--i': Math.min(SPECIES.indexOf(sp), 30) } as CSSProperties}>
                  <button className="lineup-pick" aria-label={met ? sp.name : 'まだ会っていないキャラクターのヒント'} onClick={() => setLineupHint(lineupHint === sp.id ? '' : sp.id)}>
                    <MonsterFigure form={withSpecies(FORMS[2], sp.id)} hidden={!met} />
                  </button>
                </li>
              )
            })}
          </ul>
          {lineupHint && (
            <p className="zukan-detail lineup-hint" role="status">
              {(ownedSpecies ?? []).includes(lineupHint) || lineupHint === 'mochi' ? `${speciesOf(lineupHint).name}：${speciesOf(lineupHint).desc}` : `💡 ${speciesOf(lineupHint).egg}から生まれるらしい…（${typeOf(lineupHint).icon} ${typeOf(lineupHint).name}）`}
            </p>
          )}
          <button
            key={`chara-${shakeM === 1 ? shakeN : 0}`}
            className={`good gacha-btn chara-btn${!full && coins < charaPrice ? ' short' : ''}${!full && coins < charaPrice && shakeM === 1 ? ' gacha-shake' : ''}`}
            disabled={full}
            aria-disabled={!full && coins < charaPrice}
            onClick={() => (coins < charaPrice ? shakeAt(1) : drawChara())}
          >
            {full ? '仲間がいっぱい' : `🐣 キャラガチャを引く 🪙${charaPrice}`}
          </button>
          {shakeM === 1 && !full && coins < charaPrice && (
            <p className="gacha-short-note" role="status">
              🪙 キャラガチャにはコインがあと {charaPrice - coins} たりないよ
            </p>
          )}
          {charaGot && (
            <p className="chara-gacha-got" role="status">
              🎉 {charaGot}が仲間になった！ 「記録」→「あいぼう」で相棒にできるよ
            </p>
          )}
          {ownedSpecies && <CharBook owned={ownedSpecies} fresh={freshId} levels={speciesLevels} />}
        </div>
      ) : (
        <>
          <h3 className="shop-h">🥚 タマゴガチャ（仲間 {members} / {PARTY_MAX}）</h3>
      {free && onFree && !full && (
        <button className="good gacha-btn gacha-free" onClick={() => drawOne('free')}>
          🎁 今日の無料ガチャ（1日1回）
        </button>
      )}
      <button
        key={`gacha-${shake}`}
        className={`good gacha-btn${!full && coins < price ? ' short' : ''}${shake > 0 && !full && coins < price ? ' gacha-shake' : ''}`}
        disabled={full}
        aria-disabled={!full && coins < price}
        onClick={() => (coins < price ? setShake(shake + 1) : drawOne(false))}
      >
        {full ? '仲間がいっぱい' : `🎰 ガチャを引く 🪙${price}`}
      </button>
      {shake > 0 && !full && coins < price && (
        <p className="gacha-short-note" role="status">
          🪙 コインがあと {price - coins} たりないよ。問題に正解してためよう！
        </p>
      )}
      <div className="gacha-multi">
      {onDrawMulti && !full && (
        <button
          key={`multi3-${shakeM === 3 ? shakeN : 0}`}
          className={`good gacha-btn multi${poor3 ? ' short' : ''}${poor3 && shakeM === 3 ? ' gacha-shake' : ''}`}
          disabled={!canMulti && !poor3}
          aria-disabled={poor3}
          onClick={() => {
            if (poor3) return shakeAt(3)
            const list = onDrawMulti(MULTI)
            if (list.length === 0) return
            setResult(null)
            setMulti({ list, key: Date.now() })
            setReveal(list)
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
          key={`multi5-${shakeM === 5 ? shakeN : 0}`}
          className={`good gacha-btn multi multi5${poor5 ? ' short' : ''}${poor5 && shakeM === 5 ? ' gacha-shake' : ''}`}
          disabled={!(members + MULTI5 <= PARTY_MAX && coins >= price * MULTI5) && !poor5}
          aria-disabled={poor5}
          onClick={() => {
            if (poor5) return shakeAt(5)
            const list = onDrawMulti(MULTI5)
            if (list.length === 0) return
            setResult(null)
            setMulti({ list, key: Date.now() })
            setReveal(list)
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
      {shakeM > 0 && (shakeM === 3 ? poor3 : poor5) && (
        <p className="gacha-short-note" role="status">
          🪙 {shakeM}連ガチャにはコインがあと {price * shakeM - coins} たりないよ
        </p>
      )}
      {full && <p className="stats-note gacha-full-hint">なかまがいっぱい！ 「記録」→「あいぼう」の「なかま」で 👋 おわかれすると、コインにかわってガチャを続けられるよ。</p>}
      {onTrade && tradeCount !== undefined && (
        <div className="gacha-trade" aria-label={`なかま10体でチケット1まい（いま ${Math.min(tradeCount, MEMBERS_FOR_TICKET)}/${MEMBERS_FOR_TICKET}体）`}>
          <p className="gacha-trade-title">🔁 なかま{MEMBERS_FOR_TICKET}体 → 🎟1まい</p>
          <span className="gacha-trade-meter" aria-hidden="true">
            <i style={{ width: `${(Math.min(tradeCount, MEMBERS_FOR_TICKET) / MEMBERS_FOR_TICKET) * 100}%` }} />
          </span>
          <button
            className="list-link pill-btn pill-gold gacha-trade-btn"
            disabled={tradeCount < MEMBERS_FOR_TICKET || tradeDisabled}
            onClick={() => (tradePool ? setPicks(picks ? null : tradePool.slice(-MEMBERS_FOR_TICKET).map((x) => x.index)) : onTrade())}
          >
            {tradeDisabled ? 'チケットがいっぱい' : tradeCount >= MEMBERS_FOR_TICKET ? (tradePool ? '🎟 えらんで交換' : '🎟 交換する') : `あと${MEMBERS_FOR_TICKET - tradeCount}体`}
          </button>
          <small className="gacha-trade-note">相棒と★おきにいりの子は交換されないよ</small>
          {picks && tradePool && (
            <div className="trade-pick">
              <p className="trade-pick-head" role="status">
                交換する子をえらぶ（{picks.length}/{MEMBERS_FOR_TICKET}体）
              </p>
              <ul className="trade-pick-list">
                {tradePool.map(({ index, member }) => {
                  const on = picks.includes(index)
                  const f = formOf(member)
                  return (
                    <li key={index}>
                      <button
                        className={`trade-pick-item${on ? ' on' : ''}`}
                        aria-pressed={on}
                        aria-label={`${member.name ?? f.name} Lv.${levelInfo(member.xp).level}`}
                        disabled={!on && picks.length >= MEMBERS_FOR_TICKET}
                        onClick={() => setPicks(on ? picks.filter((x) => x !== index) : [...picks, index])}
                      >
                        <MonsterFigure form={f} kind={member.kind} />
                        <span>{member.name ?? f.name}</span>
                        <small>Lv.{levelInfo(member.xp).level}</small>
                      </button>
                    </li>
                  )
                })}
              </ul>
              <div className="trade-pick-btns">
                <button
                  className="good gacha-btn"
                  disabled={picks.length !== MEMBERS_FOR_TICKET}
                  onClick={() => {
                    onTrade(picks)
                    setPicks(null)
                  }}
                >
                  🎟 この{MEMBERS_FOR_TICKET}体と交換
                </button>
                <button className="list-link pill-btn pill-blue" onClick={() => setPicks(null)}>
                  やめる
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {onTier && !full && (rareTickets > 0 || srTickets > 0) && (
        <div className="gacha-tier-row">
          {srTickets > 0 && (
            <button className="good gacha-btn tier-sr" aria-label={`🌟 SRチケットで引く（スーパーレア以上確定・あと${srTickets}まい）`} onClick={() => drawOne('sr')}>
              🌟 SR ×{srTickets}
              <small>SR以上確定</small>
            </button>
          )}
          {rareTickets > 0 && (
            <button className="good gacha-btn tier-rare" aria-label={`💎 レアチケットで引く（レア以上確定・あと${rareTickets}まい）`} onClick={() => drawOne('rare')}>
              💎 レア ×{rareTickets}
              <small>レア以上確定</small>
            </button>
          )}
        </div>
      )}
      {tickets > 0 && !full && (
        <button
          className="good gacha-btn ticket"
          aria-label={`🎟 チケットで引く（あと${tickets}枚）`}
          onClick={() => drawOne(true)}
        >
          🎟 チケットで引く ×{tickets}
        </button>
      )}
      {/* レア保証：ノーマルが4回つづいたら5回目はレア以上 */}
      <p className="gacha-rare-due">
        {RARE_EVERY - 1 - loadNStreak() === 0 ? '🌈 次の1回はレア以上確定！' : `🌈 あと${RARE_EVERY - 1 - loadNStreak()}回でレア以上確定（ノーマルがつづいたら）`}
      </p>
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
            {/* だれかはひみつのまま、まわりで星がまたたく */}
            <span className="pickup-stars" aria-hidden="true">
              <i>✦</i>
              <i>✧</i>
              <i>✦</i>
            </span>
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
            setReveal(list)
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
                  setReveal([k])
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
      {castles > 0 && (
        <p className="gacha-castle-luck" aria-label="城のボーナス">
          🏰 城のボーナス：レアが出やすさ +{Math.round(castleLuck(castles) * 100)}%（制覇した城 {castles}）
        </p>
      )}
      {ownedSpecies && <CharBook owned={ownedSpecies} fresh={freshId} levels={speciesLevels} />}
      {log.length > 0 && (
        <details className="gacha-odds gacha-log chip-fold cf-4">
          <summary>最近のガチャ（{log.length}回）</summary>
          <ul>
            {log.map((g, i) => (
              // いちばん新しい行（先頭）だけ少し光る
              <li key={i} className={i === 0 ? 'log-newest' : undefined}>
                {g.day.slice(5).replace('-', '/')} <span className={`kind-tag r-${kindOf(g.kind).rarity}`}>{kindOf(g.kind).id === 'normal' ? '' : `${kindOf(g.kind).name}の`}</span>
                {speciesOf(g.species).name}
              </li>
            ))}
          </ul>
        </details>
      )}
      {stats.total > 0 && (
        <details className="gacha-odds gacha-stats chip-fold cf-3">
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
          {/* きょうの1回目は、カプセルのまわりで小さな星がまたたく */}
          {result.first && (
            <span className="first-stars" aria-hidden="true">
              {['✦', '✧', '✦', '✧', '✦'].map((c, k) => (
                <i key={k} style={{ '--k': k } as CSSProperties}>
                  {c}
                </i>
              ))}
            </span>
          )}
          {result.kind.rarity !== 'N' && <span className="gacha-burst" aria-hidden="true" />}
          <span className={`gacha-capsule${result.mystery ? ' mystery' : ''}`} aria-hidden="true" style={result.mystery ? undefined : result.kind.rarity === 'N' ? { background: `linear-gradient(180deg, ${capsuleColorOf(capsule)} 50%, #f8fafc 50%)` } : undefined} />
          {!result.mystery && gachaOmen(result.kind.rarity) && <p className="gacha-omen">{gachaOmen(result.kind.rarity)}</p>}
          {/* タマゴのまわりに、そのキャラクターの色の光（オーナーの依頼：デザインを高める） */}
          <span className="gacha-egg sp-glow" style={{ '--sp-glow': result.species.color || '#86efac' } as CSSProperties}>
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
          {result.newSpecies && (
            <p className="zukan-no-flash" role="status">
              📖 図鑑 No.{SPECIES.findIndex((sp) => sp.id === result.species.id) + 1} に登録！
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
            <details className="gacha-species chip-fold cf-0">
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
        </>
      )}
    </div>
  )
}

// キャラクター図鑑：ガチャで出るキャラ全部。まだ会っていない子はシルエットと「？？？」
function CharBook({ owned, fresh = '', levels }: { owned: string[]; fresh?: string; levels?: Record<string, number> }) {
  const got = new Set(['mochi', ...owned])
  const [pick, setPick] = useState<string | null>(null)
  const [onlyNew, setOnlyNew] = useState(false) // まだ会っていない子だけ見る
  const n = SPECIES.filter((sp) => got.has(sp.id)).length
  return (
    <details className="gacha-odds char-book chip-fold cf-1">
      <summary aria-label={`キャラクター図鑑 ${n} / ${SPECIES.length}`}>
        📖 キャラクター図鑑（
        {/* 会えたキャラがふえると、数字がぽんとはねる */}
        <span key={n} className="book-count">
          {n}
        </span>
        /{SPECIES.length}）
        {SPECIES.length - n > 0 && SPECIES.length - n <= 5 && <span className="book-near">あと{SPECIES.length - n}体！</span>}
        {n === SPECIES.length && <span className="book-near book-done">👑 コンプリート！</span>}
      </summary>
      {n < SPECIES.length && (
        <button className="list-link pill-btn book-filter" aria-pressed={onlyNew} onClick={() => setOnlyNew(!onlyNew)}>
          {onlyNew ? '📖 ぜんぶ見る' : '❓ まだ会っていない子だけ見る'}
        </button>
      )}
      <ul className="char-book-list">
        {SPECIES.filter((sp) => !onlyNew || !got.has(sp.id)).map((sp) => {
          const ok = got.has(sp.id)
          const t = typeOf(sp.id)
          return (
            <li key={sp.id} className={`${ok ? 'got' : 'locked'}${pick === sp.id ? ' picked' : ''}${ok && fresh === sp.id ? ' fresh' : ''}`}>
              <button className="char-book-pick" aria-label={ok ? `${sp.name}（${t.name}）` : 'まだ会っていないキャラクター'} onClick={() => setPick(pick === sp.id ? null : sp.id)}>
                <MonsterFigure form={withSpecies(FORMS[2], sp.id)} hidden={!ok} />
                <span className="char-book-name">{ok ? sp.name : '？？？'}</span>
                <span className={`char-type t-${t.id}`} title={t.desc}>
                  {t.icon}
                  {t.name.replace('型', '')}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      {pick && (
        <p className="zukan-detail" role="status">
          {got.has(pick) ? (
            <>
              <strong>{speciesOf(pick).name}</strong>：{speciesOf(pick).desc}
              <span className="zukan-challenge">（{speciesOf(pick).egg}から生まれた）</span>
              {owned.includes(pick) && <span className="zukan-challenge">（なかまに {owned.filter((x) => x === pick).length}体）</span>}
              {levels?.[pick] !== undefined && <span className="zukan-challenge">（いちばん育っている子：Lv.{levels[pick]}）</span>}
              <span className="zukan-challenge">（今日のチャレンジ：{challengeOf(pick).icon} {challengeOf(pick).label}）</span>
              <span className="zukan-challenge">（とくぎ：{skillOf(pick).name}）</span>
              <span className="zukan-challenge">（必殺技：{specialOf(pick).name}）</span>
              <span className="zukan-challenge" lang="en">「{replyOf(pick).en}」</span>
              <button className="speak small" onClick={() => speak(replyOf(pick).en)} aria-label="図鑑のあいさつを聞く">
                🔊
              </button>
              <span className="zukan-challenge">（{replyOf(pick).ja}）</span>
            </>
          ) : (
            <>{speciesOf(pick).egg}から生まれるらしい…</>
          )}
          （{typeOf(pick).icon} {typeOf(pick).name}：{typeOf(pick).desc}）
        </p>
      )}
    </details>
  )
}
