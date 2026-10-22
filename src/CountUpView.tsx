import { useEffect, useState } from 'react'

// 数字を0から数えあげて見せる（約0.8秒）。動きをへらす設定ならすぐ最後の数
export function CountUp({ to, ms = 800 }: { to: number; ms?: number }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [n, setN] = useState(reduce || to <= 0 ? to : 0)
  useEffect(() => {
    if (reduce || to <= 0) return
    const steps = 20
    let i = 0
    const t = window.setInterval(() => {
      i++
      setN(Math.round((to * i) / steps))
      if (i >= steps) window.clearInterval(t)
    }, ms / steps)
    return () => window.clearInterval(t)
  }, [to, ms, reduce])
  return <span className="count-up">{n}</span>
}
