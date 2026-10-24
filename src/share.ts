// 記録を画像にして共有する（Web Share API が無ければ画像を保存）
export type ShareStats = { name: string; level: number; streak: number; learned: number; badges: number }

export function shareLines(s: ShareStats): string[] {
  return [`${s.name} Lv.${s.level}`, `🔥 連続 ${s.streak}日`, `📚 定着 ${s.learned}語`, `🏅 バッジ ${s.badges}個`]
}

export function shareText(s: ShareStats): string {
  return `イングリッシュモンスターで英単語を勉強中！ ${shareLines(s).join(' / ')}`
}

function loadSvg(svg: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    const src = svg.includes('xmlns') ? svg : svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(src)
  })
}

// 画像に文字を描くときの日本語フォント（index.css の font-family と同じ考え方）
export const JA_FONT = "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Yu Gothic', Meiryo, sans-serif"

// 600x600 のカード画像を作る。canvas が使えない環境では null
export async function makeShareImage(s: ShareStats, monsterSvg: string | null): Promise<Blob | null> {
  const canvas = document.createElement('canvas')
  canvas.width = 600
  canvas.height = 600
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  ctx.fillStyle = '#2563eb'
  ctx.fillRect(0, 0, 600, 600)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.roundRect(30, 30, 540, 540, 36)
  ctx.fill()
  if (monsterSvg) {
    const img = await loadSvg(monsterSvg)
    if (img) ctx.drawImage(img, 200, 50, 200, 200)
  }
  ctx.fillStyle = '#1f2937'
  ctx.textAlign = 'center'
  // 日本語の字形で描く（system-ui だと端末によって中国語の字形になる）
  canvas.setAttribute('lang', 'ja')
  ;(ctx as CanvasRenderingContext2D & { lang?: string }).lang = 'ja'
  try {
    await document.fonts?.load(`bold 40px ${JA_FONT}`)
  } catch {
    // フォントが読めなくても端末の日本語フォントで続ける
  }
  ctx.font = `bold 40px ${JA_FONT}`
  const lines = shareLines(s)
  ctx.fillText(lines[0], 300, 300)
  ctx.font = `32px ${JA_FONT}`
  lines.slice(1).forEach((l, i) => ctx.fillText(l, 300, 360 + i * 50))
  ctx.fillStyle = '#2563eb'
  ctx.font = `bold 28px ${JA_FONT}`
  ctx.fillText('イングリッシュモンスター', 300, 545)
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'))
}

export async function shareOrDownload(blob: Blob, text: string): Promise<'shared' | 'downloaded'> {
  const file = new File([blob], 'eitan.png', { type: 'image/png' })
  const nav = navigator as Navigator & { canShare?: (d: unknown) => boolean }
  if (nav.share && nav.canShare?.({ files: [file] })) {
    await nav.share({ files: [file], text })
    return 'shared'
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'eitan.png'
  a.click()
  URL.revokeObjectURL(url)
  return 'downloaded'
}
