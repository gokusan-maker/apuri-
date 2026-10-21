import { useState } from 'react'
import { GACHA_PRICE, PARTY_MAX } from './gacha'
import { FORMS, RARITY_LABEL, SPECIES, speciesRate, withSpecies, type Kind, type Species } from './monster'
import { MonsterFigure } from './MonsterView'

export type GachaResult = { kind: Kind; species: Species }

type Props = {
  coins: number
  members: number // 今の仲間の数
  tickets?: number // ガチャチケットの枚数
  pityLeft?: number // あと何回でスーパーレア以上が確定
  dragonUp?: boolean // 週末はドラコが出やすい
  onDraw: (ticket: boolean) => GachaResult | null // 引けたら出た色ちがいと種類を返す
  onRaise?: () => void // 出たタマゴを相棒にする
}

// タマゴガチャ：カプセルがゆれて開き、タマゴが出てくる
export function Gacha({ coins, members, tickets = 0, pityLeft, dragonUp = false, onDraw, onRaise }: Props) {
  const [result, setResult] = useState<(GachaResult & { key: number }) | null>(null)
  const full = members >= PARTY_MAX
  return (
    <div className="gacha">
      <h3 className="shop-h">🥚 タマゴガチャ（仲間 {members} / {PARTY_MAX}）</h3>
      <p className="stats-note">勉強でためたコインで新しいタマゴを引けるよ。色ちがい（レア・スーパーレア・ウルトラレア）が出るかも！ 生まれた子は「なかま」で相棒に選んで育てよう。</p>
      <button
        className="good gacha-btn"
        disabled={full || coins < GACHA_PRICE}
        onClick={() => {
          const k = onDraw(false)
          if (k) setResult({ ...k, key: Date.now() })
        }}
      >
        {full ? '仲間がいっぱい' : `🎰 ガチャを引く 🪙${GACHA_PRICE}`}
      </button>
      {tickets > 0 && !full && (
        <button
          className="good gacha-btn ticket"
          onClick={() => {
            const k = onDraw(true)
            if (k) setResult({ ...k, key: Date.now() })
          }}
        >
          🎟 チケットで引く（あと{tickets}枚）
        </button>
      )}
      <p className="stats-note">🎟 7日連続で学習するとガチャチケットが1枚もらえるよ。</p>
      {dragonUp && <p className="gacha-event">🐉 週末はドラコが出やすい！（10% → 20%）</p>}
      {pityLeft !== undefined && <p className="gacha-pity">✨ あと{pityLeft}回でスーパーレア以上が確定！</p>}
      <details className="gacha-odds">
        <summary>出る確率</summary>
        <ul>
          <li>ノーマル（ふつうの色）60%</li>
          <li>レア（さくら色・うみ色・よる色）各10%</li>
          <li>スーパーレア（きんいろ）9%</li>
          <li>ウルトラレア（にじいろ）1%</li>
          <li>キャラクター：{SPECIES.map((sp) => `${sp.name}${Math.round(speciesRate(sp, dragonUp) * 100)}%`).join('・')}</li>
        </ul>
      </details>
      {result && (
        <div key={result.key} className={`gacha-result r-${result.kind.rarity}`} role="status">
          <span className="gacha-capsule" aria-hidden="true" />
          <span className="gacha-egg">
            <MonsterFigure form={withSpecies(FORMS[0], result.species.id)} kind={result.kind.id} mood="happy" />
          </span>
          <p className="gacha-rarity">{RARITY_LABEL[result.kind.rarity]}！</p>
          <p className="gacha-name">
            {result.kind.id === 'normal' ? '' : `${result.kind.name}の`}
            {result.species.egg}が仲間になった！
          </p>
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
