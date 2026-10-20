// 学習データのエクスポート／インポート（JSON ファイル）。
// localStorage の「eitan:」で始まるキーをまとめて書き出す。
export const BACKUP_VERSION = 1
const PREFIX = 'eitan:'

export type Backup = {
  app: 'eitan'
  version: number
  exportedAt: string
  data: Record<string, unknown>
}

export function exportData(storage: Storage = localStorage, now = new Date()): Backup {
  const data: Record<string, unknown> = {}
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i)
    if (!key || !key.startsWith(PREFIX)) continue
    const raw = storage.getItem(key)
    if (raw === null) continue
    try {
      data[key] = JSON.parse(raw)
    } catch {
      data[key] = raw
    }
  }
  return { app: 'eitan', version: BACKUP_VERSION, exportedAt: now.toISOString(), data }
}

export function backupFileName(now = new Date()): string {
  const d = now.toISOString().slice(0, 10)
  return `eitan-backup-${d}.json`
}

export class BackupError extends Error {}

// 読み込んだテキストを検証して書き戻す。戻り値は復元したキーの数。
export function importData(text: string, storage: Storage = localStorage): number {
  let b: Partial<Backup>
  try {
    b = JSON.parse(text) as Partial<Backup>
  } catch {
    throw new BackupError('JSON として読めませんでした')
  }
  if (!b || b.app !== 'eitan' || typeof b.data !== 'object' || b.data === null) {
    throw new BackupError('えいたんのバックアップファイルではありません')
  }
  if (typeof b.version !== 'number' || b.version > BACKUP_VERSION) {
    throw new BackupError('新しいバージョンのアプリで作られたファイルです')
  }
  const entries = Object.entries(b.data).filter(([k]) => k.startsWith(PREFIX))
  // 既存のデータを消してから入れ直す（混ざらないように）
  const old: string[] = []
  for (let i = 0; i < storage.length; i++) {
    const k = storage.key(i)
    if (k?.startsWith(PREFIX)) old.push(k)
  }
  old.forEach((k) => storage.removeItem(k))
  for (const [k, v] of entries) storage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v))
  return entries.length
}
