// ホーム画面に追加（PWA のインストール）の案内
export type InstallPrompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }

export function isStandalone(w: Window = window): boolean {
  const nav = w.navigator as Navigator & { standalone?: boolean }
  return nav.standalone === true || (typeof w.matchMedia === 'function' && w.matchMedia('(display-mode: standalone)').matches)
}

export function isIOS(ua: string = navigator.userAgent): boolean {
  return /iPhone|iPad|iPod/.test(ua)
}
