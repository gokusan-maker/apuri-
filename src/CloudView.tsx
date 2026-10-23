import { useState } from 'react'
import { applyBackup, cloudLoad, cloudSave, ensureCode, formatCode, loadCode, loadSavedAt, normalizeCode } from './cloud'

type Props = {
  save?: typeof cloudSave
  load?: typeof cloudLoad
  onRestored?: () => void // 復元したら読みこみ直す
}

const when = (iso: string) => (iso ? new Date(iso).toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'まだ')

// クラウドに保存・引き継ぎコードで別の端末に復元
export function Cloud({ save = cloudSave, load = cloudLoad, onRestored = () => window.location.reload() }: Props) {
  const [code, setCode] = useState(loadCode)
  const [savedAt, setSavedAt] = useState(loadSavedAt)
  const [input, setInput] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  return (
    <div className="cloud">
      <p className="stats-note">機種変更しても「引き継ぎコード」で元にもどせる（1日1回自動で保存）。コードは人に教えないでね。</p>
      <button
        className="flip"
        disabled={busy}
        onClick={async () => {
          setBusy(true)
          setMsg('')
          const c = code || ensureCode()
          setCode(c)
          try {
            setSavedAt(await save(c))
            setMsg('☁️ クラウドに保存しました')
          } catch {
            setMsg('保存できませんでした。インターネットにつながっているか確かめてね')
          }
          setBusy(false)
        }}
      >
        ☁️ クラウドに保存する
      </button>
      <p className="cloud-info">
        最後の保存：{when(savedAt)}
        {code && (
          <>
            <br />
            あなたの引き継ぎコード：<strong className="cloud-code">{formatCode(code)}</strong>
          </>
        )}
      </p>
      <form
        className="cloud-restore"
        onSubmit={async (e) => {
          e.preventDefault()
          const c = normalizeCode(input)
          if (!c) {
            setMsg('引き継ぎコードは16文字だよ')
            return
          }
          setBusy(true)
          setMsg('')
          try {
            const b = await load(c)
            if (!b) setMsg('そのコードのデータは見つかりませんでした')
            else if (window.confirm('今の端末の学習データを、クラウドのデータで置きかえます。よろしいですか？')) {
              applyBackup(b, c)
              setMsg('復元しました')
              onRestored()
            }
          } catch {
            setMsg('読みこめませんでした。インターネットにつながっているか確かめてね')
          }
          setBusy(false)
        }}
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="XXXX-XXXX-XXXX-XXXX" aria-label="引き継ぎコード" autoCapitalize="characters" />
        <button type="submit" disabled={busy}>
          復元
        </button>
      </form>
      {msg && (
        <p className="cloud-msg" role="status">
          {msg}
        </p>
      )}
    </div>
  )
}
