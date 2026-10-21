import { useState } from 'react'
import { GACHA_PRICE, PARTY_MAX } from './gacha'
import { FORMS, RARITY_LABEL, type Kind } from './monster'
import { MonsterFigure } from './MonsterView'

type Props = {
  coins: number
  members: number // 今の仲間の数
  tickets?: number // ガチャチケットの枚数
  onDraw: (ticket: boolean) => Kind | null // 引けたら出た色ちがいを返す
  onRaise?: () => void // 出たタマゴを相棒にする
}

// タマゴガチャ：カプセルがゆれて開き、タマゴが出てくる
export function Gacha({ coins, members, tickets = 0, onDraw, onRaise }: Props) {
  const [result, setResult] = useState<{ kind: Kind; key: number } | null>(null)
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
          if (k) setResult({ kind: k, key: Date.now() })
        }}
      >
        {full ? '仲間がいっぱい' : `🎰 ガチャを引く 🪙${GACHA_PRICE}`}
      </button>
      {tickets > 0 && !full && (
        <button
          className="good gacha-btn ticket"
          onClick={() => {
            const k = onDraw(true)
            if (k) setResult({ kind: k, key: Date.now() })
          }}
        >
          🎟 チケットで引く（あと{tickets}枚）
        </button>
      )}
      <p className="stats-note">🎟 7日連続で学習するとガチャチケットが1枚もらえるよ。</p>
      {result && (
        <div key={result.key} className={`gacha-result r-${result.kind.rarity}`} role="status">
          <span className="gacha-capsule" aria-hidden="true" />
          <span className="gacha-egg">
            <MonsterFigure form={FORMS[0]} kind={result.kind.id} mood="happy" />
          </span>
          <p className="gacha-rarity">{RARITY_LABEL[result.kind.rarity]}！</p>
          <p className="gacha-name">{result.kind.id === 'normal' ? 'ふしぎなタマゴ' : `${result.kind.name}のタマゴ`}が仲間になった！</p>
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
