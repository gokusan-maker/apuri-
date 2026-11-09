import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, adsEnabled, loadAdScript, requestAd } from './ads'

// 小さな広告の枠。ID が設定されていないときは何も表示しない。
// 広告ユニット ID（slot）もないときは出さない（自動広告で問題の画面に広告が入らないように）
export function AdBanner({ slot, client = ADSENSE_CLIENT }: { slot: string; client?: string }) {
  const ref = useRef<HTMLModElement>(null)
  const on = adsEnabled(client) && /^\d{6,}$/.test(slot.trim())
  useEffect(() => {
    if (!on || !ref.current || ref.current.dataset.adsbygoogleStatus) return
    loadAdScript(client)
    requestAd()
  }, [on, client])
  if (!on) return null
  return (
    <aside className="ad-banner" aria-label="広告">
      <span className="ad-label">広告</span>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client.trim()}
        data-ad-slot={slot.trim()}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  )
}
