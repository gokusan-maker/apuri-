// 問題に答えたあと「次へ」ボタンが画面の下（下のメニューのうら）にかくれていたら、
// スライドしなくても押せるところまで自動で少しだけ下にずらす。

const NEXT_LABEL = /次へ|つぎへ|結果を見る|にわたす/

// ボタンの文字が「次へ」系かどうか（長い文はボタンの説明なので対象外）
export function isNextLabel(text: string): boolean {
  const t = text.trim()
  return t.length > 0 && t.length <= 20 && NEXT_LABEL.test(t)
}

// ボタンを見えるところに出すために、下へずらす量（px）。見えていれば 0。
// barTop：下のメニューの上端（なければ画面の高さ）
export function scrollNeeded(rect: { top: number; bottom: number }, barTop: number, margin = 12): number {
  if (rect.bottom <= barTop) return 0 // もう見えている
  // ずらしすぎて上の答え・解説が消えないよう、ボタンの上端が画面の上より上にはいかない量にとどめる
  return Math.max(0, Math.min(rect.bottom - barTop + margin, rect.top - margin))
}

function barTopOf(doc: Document): number {
  const bar = doc.querySelector('.tabbar')
  const h = doc.defaultView?.innerHeight ?? 0
  if (!bar) return h
  const top = bar.getBoundingClientRect().top
  return top > 0 && top < h ? top : h
}

function reveal(btn: HTMLButtonElement) {
  if (btn.disabled || !btn.isConnected) return
  const dy = scrollNeeded(btn.getBoundingClientRect(), barTopOf(btn.ownerDocument))
  if (dy > 0) btn.ownerDocument.defaultView?.scrollBy({ top: dy, behavior: 'smooth' })
}

// 新しく出てきた（または押せるようになった）「次へ」ボタンを見えるところに出す。止めるときは戻り値を呼ぶ。
export function watchNextButtons(root: HTMLElement): () => void {
  const check = (node: Node) => {
    if (!(node instanceof HTMLElement)) return
    const btns = node instanceof HTMLButtonElement ? [node] : Array.from(node.querySelectorAll('button'))
    const btn = btns.find((b) => isNextLabel(b.textContent ?? ''))
    // 描画（解説など）が終わってから位置をはかる
    if (btn) requestAnimationFrame(() => reveal(btn))
  }
  const obs = new MutationObserver((list) => {
    for (const m of list) {
      if (m.type === 'attributes') check(m.target)
      else m.addedNodes.forEach(check)
    }
  })
  obs.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled'] })
  return () => obs.disconnect()
}
