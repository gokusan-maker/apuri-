import { useRef, useState, type ChangeEvent } from 'react'
import { BackupError, backupFileName, exportData, importData } from './backup'

export function Backup() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')

  function download() {
    const blob = new Blob([JSON.stringify(exportData(), null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = backupFileName()
    a.click()
    URL.revokeObjectURL(url)
    setMessage('ファイルに保存しました')
  }

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!window.confirm('今の学習データを、このファイルの内容で置き換えます。よろしいですか？')) return
    try {
      importData(await file.text())
      setMessage('復元しました。再読み込みします…')
      window.location.reload()
    } catch (err) {
      setMessage(err instanceof BackupError ? err.message : '復元できませんでした')
    }
  }

  return (
    <div className="backup">
      <h2>データの保存と復元</h2>
      <p className="stats-note">機種変更のときなどに、学習データをファイルで持ち運べます。</p>
      <div className="actions">
        <button className="good" onClick={download}>
          ファイルに保存
        </button>
        <button className="good" onClick={() => fileRef.current?.click()}>
          ファイルから復元
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        hidden
        aria-label="バックアップファイル"
        onChange={onFile}
      />
      {message && (
        <p className="stats-note" role="status">
          {message}
        </p>
      )}
    </div>
  )
}
