import { useState, type FormEvent } from 'react'
import { addMany, addMyWord, exportText, parseBulk, removeMyWord, validate } from './myWords'
import type { Word } from './words'

type Props = {
  list: Word[]
  onChange: (list: Word[]) => void
}

export function MyWords({ list, onChange }: Props) {
  const [en, setEn] = useState('')
  const [ja, setJa] = useState('')
  const [example, setExample] = useState('')
  const [exampleJa, setExampleJa] = useState('')
  const [error, setError] = useState('')
  const [bulk, setBulk] = useState('')
  const [bulkMsg, setBulkMsg] = useState('')
  const [copied, setCopied] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    const w = { en, ja, example, exampleJa }
    const err = validate(w, list)
    if (err) {
      setError(err)
      return
    }
    onChange(addMyWord(list, w))
    setEn('')
    setJa('')
    setExample('')
    setExampleJa('')
    setError('')
  }

  return (
    <div className="my-words">
      <h2>{list.length > 0 ? `マイ単語帳（${list.length}語）` : 'マイ単語帳'}</h2>
      <p className="stats-note">設定の「単語帳をえらぶ」でオンにすると出題</p>
      <form className="my-form" onSubmit={submit}>
        <input value={en} onChange={(e) => setEn(e.target.value)} placeholder="英語（例：sunflower）" aria-label="英語" autoCapitalize="none" />
        <input value={ja} onChange={(e) => setJa(e.target.value)} placeholder="意味（例：ひまわり）" aria-label="意味" />
        <input value={example} onChange={(e) => setExample(e.target.value)} placeholder="例文（なくてもOK）" aria-label="例文" />
        <input value={exampleJa} onChange={(e) => setExampleJa(e.target.value)} placeholder="例文の訳（なくてもOK）" aria-label="例文の訳" />
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="flip">
          追加する
        </button>
      </form>
      <details className="bulk chip-fold cf-4">
        <summary>まとめて追加する</summary>
        <p className="stats-note">1行に「英語,意味」で入力（例：sunflower,ひまわり）</p>
        <textarea value={bulk} onChange={(e) => setBulk(e.target.value)} rows={4} aria-label="まとめて追加" />
        <button
          className="flip"
          onClick={() => {
            const { words, errors } = parseBulk(bulk)
            const r = addMany(list, words)
            onChange(r.list)
            setBulk('')
            setBulkMsg(`${r.added}語 追加しました${r.skipped + errors ? `（${r.skipped + errors}行は追加できませんでした）` : ''}`)
          }}
        >
          まとめて追加
        </button>
        {bulkMsg && (
          <p className="stats-note" role="status">
            {bulkMsg}
          </p>
        )}
      </details>
      {list.length > 0 && (
        <details className="bulk chip-fold cf-4">
          <summary>テキストで書き出す</summary>
          <p className="stats-note">コピーして、ほかの端末の「まとめて追加」に貼りつけられます</p>
          <textarea readOnly value={exportText(list)} rows={4} aria-label="書き出したテキスト" />
          <button
            className="flip"
            onClick={() => {
              navigator.clipboard
                ?.writeText(exportText(list))
                .then(() => setCopied(true))
                .catch(() => setCopied(false))
            }}
          >
            {copied ? 'コピーしました' : 'コピーする'}
          </button>
        </details>
      )}
      {list.length > 0 && (
        <ul className="weak-list">
          {list.map((w) => (
            <li key={w.id}>
              <span className="weak-en">{w.en}</span>
              <span className="weak-ja">{w.ja}</span>
              <button className="my-del" onClick={() => onChange(removeMyWord(list, w.id))} aria-label={`${w.en}を削除`}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
