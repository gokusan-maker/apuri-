// 広告（Google AdSense）の設定と読み込み。
// ADSENSE_CLIENT が空のあいだは広告を出さない（スクリプトも読み込まない）。
// 中高生も使うアプリなので、行動履歴にもとづく広告（パーソナライズ広告）は使わない。
// 問題を解いている最中には出さず、ホームの下と結果画面にだけ小さく出す。

import { AD_CONFIG, validClient } from './adconfig'

export { validClient }

/** AdSense のサイト運営者 ID（adconfig.ts で設定） */
export const ADSENSE_CLIENT: string = AD_CONFIG.client

/** 広告ユニットの ID（結果画面が空ならホームと同じユニットを使う） */
export const AD_SLOTS = {
  home: AD_CONFIG.slotHome,
  result: AD_CONFIG.slotResult || AD_CONFIG.slotHome,
}

/** Android アプリ（Capacitor）の中で動いているか。AdSense はアプリ内の WebView では使えない規約なので、アプリでは広告を出さない */
export function isNativeApp(w: Window | undefined = typeof window === 'undefined' ? undefined : window): boolean {
  const cap = (w as (Window & { Capacitor?: { isNativePlatform?: () => boolean } }) | undefined)?.Capacitor
  try {
    return !!cap?.isNativePlatform?.()
  } catch {
    return false
  }
}

export function adsEnabled(client: string = ADSENSE_CLIENT): boolean {
  return validClient(client) && !isNativeApp()
}

/** AdSense のスクリプトの URL */
export function adScriptUrl(client: string): string {
  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client.trim())}`
}

type AdsQueue = unknown[] & { requestNonPersonalizedAds?: number; pauseAdRequests?: number }
declare global {
  interface Window {
    adsbygoogle?: AdsQueue
  }
}

let loading = false

/** スクリプトを1回だけ読み込む（オフラインや広告ブロックで失敗しても、アプリはそのまま動く） */
export function loadAdScript(client: string = ADSENSE_CLIENT, doc: Document = document): boolean {
  if (!adsEnabled(client)) return false
  const w = doc.defaultView as (Window & typeof globalThis) | null
  if (w) {
    const q = (w.adsbygoogle = w.adsbygoogle ?? ([] as AdsQueue))
    q.requestNonPersonalizedAds = 1 // パーソナライズしない広告だけ
  }
  if (loading || doc.querySelector('script[data-eitan-ads]')) return true
  loading = true
  const s = doc.createElement('script')
  s.async = true
  s.src = adScriptUrl(client)
  s.crossOrigin = 'anonymous'
  s.setAttribute('data-eitan-ads', '1')
  doc.head.appendChild(s)
  return true
}

/** 広告枠を1つ埋めるよう AdSense にたのむ */
export function requestAd(w: Window = window): void {
  try {
    ;(w.adsbygoogle = w.adsbygoogle ?? ([] as AdsQueue)).push({})
  } catch {
    // 広告が出せなくても学習には関係ないので何もしない
  }
}

/** テスト用：読み込み状態を戻す */
export function resetAdsForTest(): void {
  loading = false
}
