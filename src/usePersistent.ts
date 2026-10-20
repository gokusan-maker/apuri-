import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

// 端末に保存する state。初回は load で読み、変わるたびに save で書く。
export function usePersistent<T>(load: () => T, save: (v: T) => void): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(load)
  useEffect(() => save(value), [value, save])
  return [value, setValue]
}
