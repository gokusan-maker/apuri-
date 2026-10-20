import { useState } from 'react'
import { makeShareImage, shareOrDownload, shareText, type ShareStats } from './share'

export function ShareButton({ stats }: { stats: ShareStats }) {
  const [msg, setMsg] = useState('')
  return (
    <div className="share">
      <button
        className="list-link"
        onClick={async () => {
          const svg = document.querySelector('.monster-body svg')?.outerHTML ?? null
          const blob = await makeShareImage(stats, svg)
          if (!blob) {
            setMsg('この端末では画像を作れませんでした')
            return
          }
          try {
            const r = await shareOrDownload(blob, shareText(stats))
            setMsg(r === 'shared' ? '' : '画像を保存しました')
          } catch {
            // 共有をキャンセルしたときなど
          }
        }}
      >
        📤 記録を画像でシェア
      </button>
      {msg && (
        <p className="stats-note" role="status">
          {msg}
        </p>
      )}
    </div>
  )
}
