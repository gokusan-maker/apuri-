import { createContext, useContext, useEffect, useRef } from 'react'

// 問題の画面をひらいているあいだ、App に知らせる（App は相棒・タブなどをかくし、上に「ほかの問題をえらぶ」を出す）
// exit：えらぶ画面へもどす関数。とじたら（画面が消えたら）登録を外す
export type PlayRegister = (exit: () => void) => () => void
export const PlayContext = createContext<PlayRegister | null>(null)

export function usePlaying(active: boolean, exit: () => void) {
  const reg = useContext(PlayContext)
  const ref = useRef(exit)
  useEffect(() => {
    ref.current = exit
  })
  useEffect(() => {
    if (!reg || !active) return
    return reg(() => ref.current())
  }, [reg, active])
}
