import { useState } from 'react'
import { NOTE_MAX } from './notes'

// 単語メモの表示と編集
export function Note({ text, onSave }: { text?: string; onSave: (t: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(text ?? '')
  if (editing) {
    return (
      <div className="note edit">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          maxLength={NOTE_MAX}
          rows={2}
          aria-label="メモ"
          placeholder="覚え方や気づいたことをメモ"
        />
        <button
          onClick={() => {
            onSave(draft)
            setEditing(false)
          }}
        >
          保存
        </button>
      </div>
    )
  }
  return (
    <p className="note">
      {text ? <span className="note-text">📝 {text}</span> : null}
      <button
        className="note-btn"
        onClick={() => {
          setDraft(text ?? '')
          setEditing(true)
        }}
      >
        {text ? 'メモを直す' : '📝 メモを書く'}
      </button>
    </p>
  )
}
