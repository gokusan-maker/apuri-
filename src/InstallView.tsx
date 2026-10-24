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
      <span>📲 ホーム画面に追加</span>
      {done ? (
        <p className="stats-note">✓ 追加ずみ</p>
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
        <p className="stats-note" title="共有（□↑）→「ホーム画面に追加」">共有□↑から</p>
      ) : (
        <p className="stats-note" title="ブラウザのメニューの「ホーム画面に追加」で、アプリのように使えます">メニューから</p>
      )}
    </div>
  )
}
