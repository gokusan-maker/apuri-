// Android アプリ（Capacitor）だけに出す AdMob のバナー広告。ウェブ版には出さない（ウェブ版は ads.ts の AdSense）。
// 広告は下のタブ（.tabbar）のすぐ上に出す。タブの上側に広告の高さぶんの余白を足し、その余白に広告を重ねるので、
// 「タブの上」を基準にしているほかの部品（次へボタンなど）はそのまま広告にかくれない。
// 開発中のビルドはテスト広告。ストアに出すビルドだけ本番の広告にする（.github/workflows/android-release.yml で VITE_ADMOB_TEST=0）。
// 自分で本番の広告をタップすると AdMob に不正とみなされるので注意。
// アプリ ID（ca-app-pub-…~…）は android-release.yml で AndroidManifest.xml に入れている。
// 中高生も使うので、パーソナライズしない広告（npa）にし、広告の内容は「保護者の指導」レベルまでにする。

import { isNativeApp } from './ads'

export const ADMOB = {
  test: import.meta.env.VITE_ADMOB_TEST !== '0',
  appId: 'ca-app-pub-5098915072054707~6195364830',
  banner: 'ca-app-pub-5098915072054707/8438384794',
}

const STYLE = `
:root { --ad-h: 0px; }
.tabbar { padding-top: calc(6px + var(--ad-h)) !important; }
.app { padding-bottom: calc(88px + env(safe-area-inset-bottom) + var(--ad-h)) !important; }
.badge-toast { bottom: calc(84px + env(safe-area-inset-bottom) + var(--ad-h)) !important; }
.pet-cheer { bottom: calc(76px + var(--ad-h)) !important; }
`

/** 画面の下からタブの上の端までの高さ（広告の余白を足す前の値） */
export function tabbarHeight(doc: Document = document): number | null {
  const bar = doc.querySelector('.tabbar')
  const w = doc.defaultView
  if (!bar || !w) return null
  return Math.max(0, Math.round(w.innerHeight - bar.getBoundingClientRect().top))
}

function setAdHeight(px: number, doc: Document = document): void {
  doc.documentElement.style.setProperty('--ad-h', `${Math.max(0, Math.round(px))}px`)
}

async function waitTabbar(tries = 40): Promise<number | null> {
  for (let i = 0; i < tries; i++) {
    const h = tabbarHeight()
    if (h) return h
    await new Promise((r) => setTimeout(r, 250))
  }
  return null
}

let started = false

/** アプリの起動時に1回よぶ。ウェブ版では何もしない。失敗しても学習には関係ないので何もしない */
export async function startAdMob(): Promise<void> {
  if (started || !isNativeApp()) return
  started = true
  try {
    const style = document.createElement('style')
    style.setAttribute('data-admob', '1')
    style.textContent = STYLE
    document.head.appendChild(style)

    const { AdMob, AdmobConsentStatus, BannerAdPluginEvents, BannerAdPosition, BannerAdSize, MaxAdContentRating } =
      await import('@capacitor-community/admob')
    // 欧州などで必要な同意の確認（Google の UMP）。日本では通常は何も出ない
    try {
      const consent = await AdMob.requestConsentInfo()
      if (consent.isConsentFormAvailable && consent.status === AdmobConsentStatus.REQUIRED) await AdMob.showConsentForm()
    } catch {
      // 同意の確認ができなくても広告の表示は続ける
    }
    await AdMob.initialize({ initializeForTesting: ADMOB.test, maxAdContentRating: MaxAdContentRating.ParentalGuidance })
    await AdMob.addListener(BannerAdPluginEvents.SizeChanged, (s) => setAdHeight(s.height))
    await AdMob.addListener(BannerAdPluginEvents.FailedToLoad, () => setAdHeight(0))

    const margin = await waitTabbar()
    if (margin === null) return
    await AdMob.showBanner({
      adId: ADMOB.banner,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin,
      isTesting: ADMOB.test,
      npa: true,
    })
  } catch {
    setAdHeight(0)
  }
}
