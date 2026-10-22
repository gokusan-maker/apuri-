import { describe, expect, it, vi } from 'vitest'
import { isNextLabel, scrollNeeded, watchNextButtons } from './nextbutton'

describe('次へボタンを見える位置に出す', () => {
  it('「次へ」「結果を見る」などを見分ける', () => {
    expect(isNextLabel('次へ')).toBe(true)
    expect(isNextLabel(' 🗣 言えた！ 次へ ')).toBe(true)
    expect(isNextLabel('結果を見る')).toBe(true)
    expect(isNextLabel('つぎへ')).toBe(true)
    expect(isNextLabel('意味を見る')).toBe(false)
    expect(isNextLabel('')).toBe(false)
  })

  it('メニューのうらにかくれていれば、その分だけ下にずらす', () => {
    expect(scrollNeeded({ top: 500, bottom: 540 }, 700)).toBe(0)
    expect(scrollNeeded({ top: 700, bottom: 740 }, 680)).toBe(72)
    // 上の解説が消えるほどはずらさない
    expect(scrollNeeded({ top: 30, bottom: 900 }, 680)).toBe(18)
  })

  it('答えて「次へ」が出てきたら、画面を下にずらす', async () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const scroll = vi.fn()
    window.scrollBy = scroll as unknown as typeof window.scrollBy
    const stop = watchNextButtons(root)
    const btn = document.createElement('button')
    btn.textContent = '次へ'
    btn.getBoundingClientRect = () => ({ top: 900, bottom: 940 }) as DOMRect
    root.appendChild(btn)
    await new Promise((r) => setTimeout(r, 0))
    await new Promise((r) => requestAnimationFrame(() => r(null)))
    expect(scroll).toHaveBeenCalledWith({ top: 940 - window.innerHeight + 12, behavior: 'smooth' })
    stop()
    root.remove()
  })
})
