import { useEffect, useRef } from 'react'

// キーボード操作（PC・タブレット用）。次のときは反応しない：
// 入力欄で文字を打っているとき／ボタンなどにフォーカスがあって Enter・スペースを押したとき（そのボタンを押す）
// キーを押しっぱなしにしたとき／案内やお祝いの画面（ダイアログ）が開いているとき
export function useKeys(handler: (key: string) => boolean | void): void {
  const ref = useRef(handler)
  useEffect(() => {
    ref.current = handler
  })
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return
      const t = e.target instanceof HTMLElement ? e.target : null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return
      if ((e.key === 'Enter' || e.key === ' ') && t && t.closest('button, a, [role="button"]')) return
      if (document.querySelector('[role="dialog"]')) return
      if (ref.current(e.key)) e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
