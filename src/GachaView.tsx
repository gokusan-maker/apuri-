import { useState } from 'react'
import { STICKERS, STICKER_TICKETS } from './stickers'
import { LUCKY_BAG_PRICE, loadGachaFast, saveGachaFast, capsuleColorOf, CAPSULE_COLORS, isReach, loadCapsule, saveCapsule } from './gacha'
import { POINTS_FOR_SR, gachaShareText, GACHA_PRICE, gachaOmen, LUCKY_COINS, MULTI5, SLOT_COINS, loadGachaLog, loadGachaStats, PARTY_MAX, pushGachaLog } from './gacha'
import { FORMS, kindOf, RARITY_LABEL, SPECIES, speciesOf, speciesRate, withSpecies, type Kind, type Species } from './monster'
import { MonsterFigure } from './MonsterView'

const MULTI = 3
const RANK = ['N', 'R', 'SR', 'UR'] as const
const bestRarity = (list: GachaResult[]) => list.map((k) => k.kind.rarity).sort((a, b) => RANK.indexOf(b) - RANK.indexOf(a))[0]

export type GachaResult = { kind: Kind; species: Species; newKind?: boolean; newSpecies?: boolean; refund?: number; bonus?: string; lucky?: number; slot?: { reels: string[]; win: boolean }; sticker?: string }

// 結果をシェア用の文にしてコピーするボタン
function ShareButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      className="list-link gacha-share"
      onClick={() => {
        navigator.clipboard
          ?.writeText(text)
          .then(() => setCopied(true))
          .catch(() => setCopied(false))
      }}
    >
      {copied ? '✅ コピーしました' : '📋 結果をコピー（シェア用）'}
    </button>
  )
}

type Props = {
  coins: number
  members: number // 今の仲間の数
  tickets?: number // ガチャチケットの枚数
  pityLeft?: number // あと何回でスーパーレア以上が確定
  points?: number // ガチャポイント
  stickers?: string[] // 集めたシール
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
}

// タマゴガチャ：カプセルがゆれて開き、タマゴが出てくる
export function Gacha({ coins, members, tickets = 0, pityLeft, points, onExchange, stickers, luckyBag, onLuckyBag, dragonUp = false, pickup, stepLeft, price = GACHA_PRICE, onDraw, onDrawMulti, onRaise }: Props) {
  const [result, setResult] = useState<(GachaResult & { key: number }) | null>(null)
  const [log, setLog] = useState(loadGachaLog)
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
  const canMulti = !!onDrawMulti && members + MULTI <= PARTY_MAX && coins >= price * MULTI
  return (
    <div className="gacha">
      <h3 className="shop-h">🥚 タマゴガチャ（仲間 {members} / {PARTY_MAX}）</h3>
      <p className="stats-note">勉強でためたコインで新しいタマゴを引けるよ。色ちがい（レア・スーパーレア・ウルトラレア）が出るかも！ 生まれた子は「なかま」で相棒に選んで育てよう。</p>
      <button
        className="good gacha-btn"
        disabled={full || coins < price}
        onClick={() => {
          const k = onDraw(false)
          if (k) {
            setResult({ ...k, key: Date.now() })
            setMulti(null)
            record(k)
          }
        }}
      >
        {full ? '仲間がいっぱい' : `🎰 ガチャを引く 🪙${price}`}
      </button>
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
          🎰🎰🎰 3連ガチャ 🪙{price * MULTI}
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
          🌈 5連ガチャ（レア以上1つ確定）🪙{price * MULTI5}
          {members + MULTI5 > PARTY_MAX && <small>（仲間の空きが5ひつよう）</small>}
        </button>
      )}
      {full && <p className="stats-note gacha-full-hint">なかまがいっぱい！ 「記録」→「あいぼう」の「なかま」で 👋 おわかれすると、コインにかわってガチャを続けられるよ。</p>}
      {tickets > 0 && !full && (
        <button
          className="good gacha-btn ticket"
          onClick={() => {
            const k = onDraw(true)
            if (k) {
            setResult({ ...k, key: Date.now() })
            setMulti(null)
            record(k)
          }
          }}
        >
          🎟 チケットで引く（あと{tickets}枚）
        </button>
      )}
      <p className="stats-note">🎟 7日連続で学習するとガチャチケットが1枚もらえるよ。</p>
      {pickup && (
        <div className="gacha-pickup">
          <span className="gacha-pickup-fig">
            <MonsterFigure form={withSpecies(FORMS[0], pickup.id)} mood="happy" />
          </span>
          <span>
            <strong>🎯 今日のピックアップ</strong>
            <br />「{pickup.name}」が出やすい！（{Math.round(pickup.rate * 100)}% → {Math.round(speciesRate(pickup, dragonUp, pickup.id) * 100)}%）
          </span>
        </div>
      )}
      {price < GACHA_PRICE && <p className="gacha-golden">🌟 ゴールデンタイム！ 19時台はガチャが 🪙{GACHA_PRICE} → 🪙{price}</p>}
      {stepLeft !== undefined && (
        <p className={`gacha-step${stepLeft === 0 ? ' sure' : ''}`}>
          {stepLeft === 0 ? '🔥 ステップアップ！ 次の1回はレア以上確定！' : `🔥 ステップアップ：あと${stepLeft}回で、その次がレア以上確定`}
        </p>
      )}
      {dragonUp && <p className="gacha-event">🐉 週末はドラコが出やすい！（10% → 20%）</p>}
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
          🎍 今月の福袋（3連ガチャ＋バトルアイテム3つ）🪙{LUCKY_BAG_PRICE}
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
        <details className="sticker-book">
          <summary>
            🏷 シール帳 {stickers.length} / {STICKERS.length}（全部そろうと🎟{STICKER_TICKETS}）
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
          🎫 ガチャポイント {Math.min(points, POINTS_FOR_SR)} / {POINTS_FOR_SR}（たまるとスーパーレア以上確定と交換）
          {onExchange && points >= POINTS_FOR_SR && members < PARTY_MAX && (
            <button
              className="list-link"
              onClick={() => {
                const k = onExchange()
                if (k) {
                  setMulti(null)
                  setResult({ ...k, key: Date.now() })
                  record(k)
                }
              }}
            >
              🎫 交換する
            </button>
          )}
        </p>
      )}
      {pityLeft !== undefined && <p className="gacha-pity">✨ あと{pityLeft}回でスーパーレア以上が確定！</p>}
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
                <span className={`kind-tag r-${r}`}>{RARITY_LABEL[r]}</span> {stats[r]}回（{Math.round((stats[r] / stats.total) * 100)}%）
              </li>
            ))}
          </ul>
        </details>
      )}
      <details className="gacha-odds gacha-rates">
        <summary>出る確率</summary>
        <ul>
          <li>ノーマル（ふつうの色）60%</li>
          <li>レア（さくら色・うみ色・よる色）各10%</li>
          <li>スーパーレア（きんいろ）9%</li>
          <li>ウルトラレア（にじいろ）1%</li>
          <li>キャラクター：{SPECIES.map((sp) => `${sp.name}${Math.round(speciesRate(sp, dragonUp, pickup?.id) * 100)}%`).join('・')}</li>
        </ul>
      </details>
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
          <button className="list-link" onClick={() => setMulti(null)}>
            とじる
          </button>
        </div>
      )}
      {result && (
        <div key={result.key} className={`gacha-result r-${result.kind.rarity}${fast ? ' fast' : ''}`} role="status">
          {result.kind.rarity !== 'N' && <span className="gacha-burst" aria-hidden="true" />}
          <span className="gacha-capsule" aria-hidden="true" style={result.kind.rarity === 'N' ? { background: `linear-gradient(180deg, ${capsuleColorOf(capsule)} 50%, #f8fafc 50%)` } : undefined} />
          {gachaOmen(result.kind.rarity) && <p className="gacha-omen">{gachaOmen(result.kind.rarity)}</p>}
          <span className="gacha-egg">
            <MonsterFigure form={withSpecies(FORMS[0], result.species.id)} kind={result.kind.id} mood="happy" />
          </span>
          <p className="gacha-rarity">{RARITY_LABEL[result.kind.rarity]}！</p>
          {(result.newKind || result.newSpecies) && <p className="gacha-new">NEW! {result.newSpecies ? `はじめての「${result.species.name}」` : ''}{result.newSpecies && result.newKind ? '・' : ''}{result.newKind ? `はじめての「${result.kind.name}」` : ''}</p>}
          <p className="gacha-name">
            {result.kind.id === 'normal' ? '' : `${result.kind.name}の`}
            {result.species.egg}が仲間になった！
          </p>
          {result.bonus && <p className="gacha-bonus">🎁 おまけカプセル！ {result.bonus}</p>}
          {result.sticker && <p className="gacha-sticker">🏷 おまけシール {result.sticker}</p>}
          {result.slot && (
            <p className={`gacha-slot${result.slot.win ? ' win' : ''}`} aria-label={result.slot.win ? 'スロットがそろった' : 'スロット'}>
              🎰 {result.slot.reels.join(' ')}
              {result.slot.win && ` そろった！ 🪙${SLOT_COINS}`}
              {isReach(result.slot) && ' 🔥 リーチ！ おしい！'}
            </p>
          )}
          {!!result.lucky && <p className="gacha-lucky">🍀 ラッキーナンバー！ 通算{result.lucky}回目で 🪙{LUCKY_COINS}</p>}
          {!!result.refund && <p className="gacha-dup">かぶりボーナス！ 同じ子がいたので 🪙{result.refund} もどってきた</p>}
          <ShareButton text={gachaShareText([{ kindName: result.kind.name, normal: result.kind.id === 'normal', speciesName: result.species.name, rarity: RARITY_LABEL[result.kind.rarity] }])} />
          {result.species.id !== 'mochi' && <p className="gacha-species">「{result.species.name}」の仲間だ！ {result.species.desc}</p>}
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
          <button className="list-link" onClick={() => setResult(null)}>
            とじる
          </button>
        </div>
      )}
    </div>
  )
}
