// 学習データをすべて消す（えいたんのキーだけ。ほかのアプリのデータは残す）
export function clearAllData(storage: Storage = localStorage): number {
  const keys: string[] = []
  for (let i = 0; i < storage.length; i++) {
    const k = storage.key(i)
    if (k?.startsWith('eitan:')) keys.push(k)
  }
  for (const k of keys) storage.removeItem(k)
  return keys.length
}
