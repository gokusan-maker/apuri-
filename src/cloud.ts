// クラウドバックアップ（Supabase）：引き継ぎコードで、学習データを保存・別の端末に復元する。
// 端末の localStorage がもとのデータで、クラウドは控え。オフラインでもアプリはそのまま動く。
export const SUPABASE_URL = 'https://mljhjdzuabaujluearbd.supabase.co'
export const SUPABASE_KEY = 'sb_publishable_egCm2LVuFYcFt_OQvaoM7Q_QpXwBHue' // 公開用のキー（アプリに入れてよいもの）

const PREFIX = 'eitan:'
const CODE_KEY = 'eitan:cloud-code'
const SAVED_KEY = 'eitan:cloud-saved'
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // まぎらわしい I・O・0・1 は使わない

export type Backup = { app: 'eitan'; v: 1; savedAt: string; items: Record<string, string> }

export function makeCode(rng: () => number = Math.random): string {
  return Array.from({ length: 16 }, () => ALPHABET[Math.floor(rng() * ALPHABET.length)]).join('')
}

// 入力をコードの形にそろえる（小文字・空白・ハイフンを許す）
export function normalizeCode(input: string): string | null {
  const c = input.toUpperCase().replace(/[^A-Z0-9]/g, '')
  return /^[A-Z2-9]{16}$/.test(c) ? c : null
}

export const formatCode = (c: string) => c.replace(/(.{4})(?=.)/g, '$1-')

function safeGet(k: string): string | null {
  try {
    return localStorage.getItem(k)
  } catch {
    return null
  }
}

export const loadCode = () => safeGet(CODE_KEY) ?? ''
export const loadSavedAt = () => safeGet(SAVED_KEY) ?? ''

function safeSet(k: string, v: string): void {
  try {
    localStorage.setItem(k, v)
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}

// 自分のコード（なければ作って覚える）
export function ensureCode(rng?: () => number): string {
  const c = loadCode()
  if (c) return c
  const n = makeCode(rng)
  safeSet(CODE_KEY, n)
  return n
}

// 端末の学習データ（eitan: で始まるもの。クラウドの設定そのものは除く）
export function collectBackup(now = new Date()): Backup {
  const items: Record<string, string> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (!k || !k.startsWith(PREFIX) || k === CODE_KEY || k === SAVED_KEY) continue
    const v = localStorage.getItem(k)
    if (v !== null) items[k] = v
  }
  return { app: 'eitan', v: 1, savedAt: now.toISOString(), items }
}

export function isBackup(v: unknown): v is Backup {
  const b = v as Backup
  return !!b && b.app === 'eitan' && b.v === 1 && !!b.items && typeof b.items === 'object' && Object.entries(b.items).every(([k, x]) => k.startsWith(PREFIX) && typeof x === 'string')
}

// バックアップで端末のデータを置きかえる（コードは引き継いで、以後も同じコードで保存できる）
export function applyBackup(b: Backup, code: string): void {
  const old: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k && k.startsWith(PREFIX) && k !== CODE_KEY && k !== SAVED_KEY) old.push(k)
  }
  old.forEach((k) => localStorage.removeItem(k))
  Object.entries(b.items).forEach(([k, v]) => localStorage.setItem(k, v))
  localStorage.setItem(CODE_KEY, code)
  localStorage.setItem(SAVED_KEY, b.savedAt)
}

type Fetch = typeof fetch

async function rpc(name: string, body: object, f: Fetch): Promise<unknown> {
  const res = await f(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`cloud ${res.status}`)
  return res.json()
}

export async function cloudSave(code: string, f: Fetch = fetch): Promise<string> {
  const b = collectBackup()
  await rpc('eitan_backup_save', { p_code: code, p_data: b }, f)
  safeSet(SAVED_KEY, b.savedAt)
  return b.savedAt
}

// コードのバックアップを取ってくる（なければ null）
export async function cloudLoad(code: string, f: Fetch = fetch): Promise<Backup | null> {
  const v = await rpc('eitan_backup_load', { p_code: code }, f)
  return isBackup(v) ? v : null
}

// 自動保存するか：コードがあり、今日まだ保存していなくて、オンラインのとき
export function shouldAutoSave(code: string, savedAt: string, today: string, online: boolean): boolean {
  return !!code && online && savedAt.slice(0, 10) !== today
}
