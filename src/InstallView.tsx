import { useEffect, useState } from 'react'
import { isIOS, isStandalone, type InstallPrompt } from './install'

export function Install() {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null)
  const [done, setDone] = useState(isStandalone)

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault()
      setPrompt(e as InstallPrompt)
    }
    const onInstalled = () => setDone(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  return (
    <div className="setting install">
      <span>ホーム画面に追加</span>
      {done ? (
        <p className="stats-note">ホーム画面から使っています ✓</p>
      ) : prompt ? (
        <button
          className="flip"
          onClick={async () => {
            await prompt.prompt()
            const { outcome } = await prompt.userChoice
            if (outcome === 'accepted') setDone(true)
            setPrompt(null)
          }}
        >
          📲 ホーム画面に追加する
        </button>
      ) : isIOS() ? (
        <p className="stats-note">Safari の共有ボタン（□↑）→「ホーム画面に追加」で、アプリのように使えます。</p>
      ) : (
        <p className="stats-note">ブラウザのメニューの「ホーム画面に追加」で、アプリのように使える</p>
      )}
    </div>
  )
}
