// 本番ビルドだけ Service Worker を登録する（開発中はキャッシュが邪魔になるため）
export function registerSW(nav: Navigator = navigator, isProd = import.meta.env.PROD): boolean {
  if (!isProd || !('serviceWorker' in nav)) return false
  window.addEventListener('load', () => {
    nav.serviceWorker.register('./sw.js').catch(() => {
      // 登録できなくてもアプリはそのまま使える
    })
  })
  return true
}
