import { afterEach, describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { AD_CONFIG, adsTxt, validClient } from './adconfig'
import { adScriptUrl, adsEnabled, isNativeApp, loadAdScript, resetAdsForTest } from './ads'
import { AdBanner } from './AdBanner'

const ID = 'ca-pub-1234567890123456'

afterEach(() => {
  document.head.querySelectorAll('script[data-eitan-ads]').forEach((s) => s.remove())
  delete window.adsbygoogle
  resetAdsForTest()
})

describe('広告（AdSense）', () => {
  it('ID の形を確かめる', () => {
    expect(validClient(ID)).toBe(true)
    expect(validClient('')).toBe(false)
    expect(validClient('pub-1234567890123456')).toBe(false)
    expect(validClient('ca-pub-abc')).toBe(false)
  })

  it('ID が空のあいだは広告を出さない（設定ファイルは空のまま）', () => {
    expect(adsEnabled('')).toBe(false)
    expect(loadAdScript('')).toBe(false)
    expect(document.querySelector('script[data-eitan-ads]')).toBeNull()
    const { container } = render(<AdBanner slot="1234567890" client="" />)
    expect(container.innerHTML).toBe('')
  })

  it('広告ユニットがないときも出さない（自動広告で問題の画面に入らないように）', () => {
    const { container } = render(<AdBanner slot="" client={ID} />)
    expect(container.innerHTML).toBe('')
  })

  it('ID があればスクリプトを1回だけ読み込み、パーソナライズしない広告にする', () => {
    expect(loadAdScript(ID)).toBe(true)
    expect(loadAdScript(ID)).toBe(true)
    const s = document.querySelectorAll<HTMLScriptElement>('script[data-eitan-ads]')
    expect(s).toHaveLength(1)
    expect(s[0].src).toBe(adScriptUrl(ID))
    expect(s[0].src).toContain('client=ca-pub-1234567890123456')
    expect(window.adsbygoogle?.requestNonPersonalizedAds).toBe(1)
  })

  it('広告の枠には「広告」と表示する', () => {
    const { getByLabelText, getByText } = render(<AdBanner slot="1234567890" client={ID} />)
    const ins = getByLabelText('広告').querySelector('ins.adsbygoogle')
    expect(ins?.getAttribute('data-ad-client')).toBe(ID)
    expect(ins?.getAttribute('data-ad-slot')).toBe('1234567890')
    expect(getByText('広告')).toBeTruthy()
    expect(window.adsbygoogle?.length).toBe(1)
  })

  it('Android アプリの中では広告を出さない（AdSense はアプリ内で使えないため）', () => {
    const w = window as Window & { Capacitor?: { isNativePlatform: () => boolean } }
    expect(isNativeApp()).toBe(false)
    expect(adsEnabled(ID)).toBe(true)
    w.Capacitor = { isNativePlatform: () => true }
    try {
      expect(isNativeApp()).toBe(true)
      expect(adsEnabled(ID)).toBe(false)
      const { container } = render(<AdBanner slot="1234567890" client={ID} />)
      expect(container.innerHTML).toBe('')
    } finally {
      delete w.Capacitor
    }
  })

  it('ads.txt は ID から作る', () => {
    expect(adsTxt(ID)).toBe('google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n')
    expect(adsTxt('')).toBe('')
    expect(typeof AD_CONFIG.client).toBe('string')
  })

  it('プライバシーポリシーに広告と Cookie のことを書いている', () => {
    const html = readFileSync('public/privacy.html', 'utf-8')
    expect(html).toContain('Google AdSense')
    expect(html).toContain('Cookie')
    expect(html).toContain('パーソナライズ広告')
  })
})
