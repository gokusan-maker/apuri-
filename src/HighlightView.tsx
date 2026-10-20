import { blankOut } from './blank'

// 例文の中の見出し語（変化形もふくむ）を太字にして出す
export function Highlight({ text, word }: { text: string; word: string }) {
  const p = blankOut(text, word)
  if (!p) return <>{text}</>
  return (
    <>
      {p.before}
      <strong className="hl">{p.answer}</strong>
      {p.after}
    </>
  )
}
