// 色を白（amount>0）か黒（amount<0）に近づける
export function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16)
  const t = amount > 0 ? 255 : 0
  const k = Math.abs(amount)
  const c = [16, 8, 0].map((sh) => Math.round(((n >> sh) & 255) + (t - ((n >> sh) & 255)) * k))
  return `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`
}
