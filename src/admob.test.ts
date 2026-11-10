import { afterEach, describe, expect, it } from 'vitest'
import { ADMOB, bannerId, platform, startAdMob, tabbarHeight } from './admob'

afterEach(() => {
  document.body.innerHTML = ''
  document.head.querySelectorAll('style[data-admob]').forEach((s) => s.remove())
})

describe('AdMob（Android アプリの広告）', () => {
  it('アプリ ID と広告ユニット ID の形がただしい', () => {
    expect(ADMOB.appId).toMatch(/^ca-app-pub-\d+~\d+$/)
    expect(ADMOB.banner).toMatch(/^ca-app-pub-\d+\/\d+$/)
  })

  it('iPhone と Android で広告ユニットを使い分ける', () => {
    expect(ADMOB.ios.appId).toMatch(/^ca-app-pub-\d+~\d+$/)
    expect(bannerId('ios')).toBe(ADMOB.ios.banner)
    expect(bannerId('android')).toBe(ADMOB.banner)
    expect(ADMOB.ios.banner).not.toBe(ADMOB.banner)
    expect(platform()).toBe('web')
  })

  it('テストのビルドではテスト広告になる', () => {
    expect(ADMOB.test).toBe(true)
  })

  it('ウェブ版では何もしない（スタイルも足さない）', async () => {
    await startAdMob()
    expect(document.head.querySelector('style[data-admob]')).toBeNull()
  })

  it('画面の下からタブの上の端までの高さをはかる', () => {
    expect(tabbarHeight()).toBeNull()
    const nav = document.createElement('nav')
    nav.className = 'tabbar'
    nav.getBoundingClientRect = () => ({ top: window.innerHeight - 70 }) as DOMRect
    document.body.appendChild(nav)
    expect(tabbarHeight()).toBe(70)
  })
})
