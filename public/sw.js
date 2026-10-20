// えいたん Service Worker：アプリ本体をキャッシュしてオフラインでも使えるようにする。
// ページ（HTML）はネット優先・失敗したらキャッシュ、その他のファイルはキャッシュ優先。
const CACHE = 'eitan-v3'
const CORE = ['./', './index.html', './manifest.webmanifest', './favicon.svg', './icon-192.png', './apple-touch-icon.png']

// 同じ名前（index-xxxx.js の index 部分と拡張子）で、別のハッシュの古いファイル
function staleAssets(keys, url) {
  const m = /\/assets\/([^/]+?)-[^/-]+\.(js|css)$/.exec(url)
  if (!m) return []
  return keys.filter((k) => k !== url && new RegExp('/assets/' + m[1] + '-[^/-]+\\.' + m[2] + '$').test(k))
}

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put('./index.html', copy))
          return res
        })
        .catch(() => caches.match('./index.html')),
    )
    return
  }

  event.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone()
            caches.open(CACHE).then(async (c) => {
              await c.put(req, copy)
              // 新しい版を入れたら、同じ名前の古い版を消す
              const keys = (await c.keys()).map((r) => r.url)
              await Promise.all(staleAssets(keys, req.url).map((k) => c.delete(k)))
            })
          }
          return res
        }),
    ),
  )
})
