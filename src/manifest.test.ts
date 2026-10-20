import { describe, expect, it } from 'vitest'
import raw from '../public/manifest.webmanifest?raw'
import html from '../index.html?raw'

describe('manifest', () => {
  const m = JSON.parse(raw)

  it('ホーム画面に追加できる項目がそろっている', () => {
    expect(m.name).toContain('えいたん')
    expect(m.short_name).toBe('えいたん')
    expect(m.display).toBe('standalone')
    expect(m.start_url).toBe('./')
  })

  it('192px と 512px の PNG アイコン、maskable がある', () => {
    const sizes = m.icons.filter((i: { type: string }) => i.type === 'image/png').map((i: { sizes: string }) => i.sizes)
    expect(sizes).toContain('192x192')
    expect(sizes).toContain('512x512')
    expect(m.icons.some((i: { purpose?: string }) => i.purpose === 'maskable')).toBe(true)
  })

  it('index.html から manifest と apple-touch-icon を参照している', () => {
    expect(html).toContain('href="./manifest.webmanifest"')
    expect(html).toContain('href="./apple-touch-icon.png"')
  })
})
