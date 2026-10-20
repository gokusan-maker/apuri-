import { useEffect, useState } from 'react'

// オフラインで使えるか（Service Worker が動いているか）と、今の接続
export function OfflineStatus() {
  const sw = typeof navigator !== 'undefined' && 'serviceWorker' in navigator
  const [ready, setReady] = useState(() => sw && !!navigator.serviceWorker.controller)
  const [online, setOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true))

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    if (sw) navigator.serviceWorker.ready.then(() => setReady(true)).catch(() => {})
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [sw])

  return (
    <div className="setting offline">
      <span>オフライン</span>
      <p className="stats-note">
        {ready ? 'オフラインでも使えます ✓' : 'まだ準備中です（インターネットにつながった状態で一度開くと使えるようになります）'}
        {!online && '　いまはオフラインです'}
      </p>
    </div>
  )
}
