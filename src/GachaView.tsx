import { useState } from 'react'
import { GACHA_PRICE, gachaOmen, loadGachaLog, PARTY_MAX, pushGachaLog } from './gacha'
import { FORMS, kindOf, RARITY_LABEL, SPECIES, speciesOf, speciesRate, withSpecies, type Kind, type Species } from './monster'
import { MonsterFigure } from './MonsterView'

const MULTI = 3
const RANK = ['N', 'R', 'SR', 'UR'] as const
const bestRarity = (list: GachaResult[]) => list.map((k) => k.kind.rarity).sort((a, b) => RANK.indexOf(b) - RANK.indexOf(a))[0]

export type GachaResult = { kind: Kind; species: Species; newKind?: boolean; newSpecies?: boolean; refund?: number }

type Props = {
  coins: number
  members: number // 今の仲間の数
  tickets?: number // ガチャチケットの枚数
  pityLeft?: number // あと何回でスーパーレア以上が確定
  dragonUp?: boolean // 週末はドラコが出やすい
  pickup?: Species // 日替わりピックアップ（出やすい）
  price?: number // 1回の値段（ゴールデンタイムは安い）
  stepLeft?: number // ステップアップ：あと何回でレア以上確定（0なら次が確定）
  onDraw: (ticket: boolean) => GachaResult | null // 引けたら出た色ちがいと種類を返す
  onDrawMulti?: (n: number) => GachaResult[] // まとめて引く（3連ガチャ）
  onRaise?: () => void // 出たタマゴを相棒にする
}

// タマゴガチャ：カプセルがゆれて開き、タマゴが出てくる
export function Gacha({ coins, members, tickets = 0, pityLeft, dragonUp = false, pickup, stepLeft, price = GACHA_PRICE, onDraw, onDrawMulti, onRaise }: Props) {
  const [result, setResult] = useState<(GachaResult & { key: number }) | null>(null)
  const [log, setLog] = useState(loadGachaLog)
  const record = (k: GachaResult) => setLog((l) => pushGachaLog(l, { day: new Date().toISOString().slice(0, 10), kind: k.kind.id, species: k.species.id }))
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
              </li>
            ))}
          </ul>
          <button className="list-link" onClick={() => setMulti(null)}>
            とじる
          </button>
        </div>
      )}
      {result && (
        <div key={result.key} className={`gacha-result r-${result.kind.rarity}`} role="status">
          {result.kind.rarity !== 'N' && <span className="gacha-burst" aria-hidden="true" />}
          <span className="gacha-capsule" aria-hidden="true" />
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
          {!!result.refund && <p className="gacha-dup">かぶりボーナス！ 同じ子がいたので 🪙{result.refund} もどってきた</p>}
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
