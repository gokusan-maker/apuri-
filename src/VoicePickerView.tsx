import { useEffect, useState } from 'react'
import { englishVoices } from './speech'

// 読み上げの声を選ぶ（端末にある英語の声。声の一覧はあとから届くことがある）
export function VoicePicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [voices, setVoices] = useState<string[]>(englishVoices)
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    const ss = window.speechSynthesis
    const update = () => setVoices(englishVoices())
    ss.addEventListener?.('voiceschanged', update)
    return () => ss.removeEventListener?.('voiceschanged', update)
  }, [])
  if (voices.length === 0) return null
  return (
    <label className="setting">
      <span>読み上げの声</span>
      <select value={voices.includes(value) ? value : ''} onChange={(e) => onChange(e.target.value)} aria-label="読み上げの声">
        <option value="">おまかせ</option>
        {voices.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </label>
  )
}
