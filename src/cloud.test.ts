import { beforeEach, expect, it, vi } from 'vitest'
import { applyBackup, cloudLoad, cloudSave, collectBackup, ensureCode, formatCode, isBackup, loadCode, loadSavedAt, makeCode, normalizeCode, SUPABASE_URL } from './cloud'

beforeEach(() => localStorage.clear())

it('引き継ぎコードは16文字で、入力の形をそろえられる', () => {
  const c = makeCode(() => 0.5)
  expect(c).toMatch(/^[A-Z2-9]{16}$/)
  expect(formatCode('ABCDEFGHJKLMNPQR')).toBe('ABCD-EFGH-JKLM-NPQR')
  expect(normalizeCode(' abcd-efgh jklm-npqr ')).toBe('ABCDEFGHJKLMNPQR')
  expect(normalizeCode('abc')).toBeNull()
  expect(ensureCode(() => 0)).toBe('AAAAAAAAAAAAAAAA')
  expect(ensureCode(() => 0.9)).toBe('AAAAAAAAAAAAAAAA') // 一度作ったら同じ
})

it('学習データ（eitan: で始まるもの）だけを集め、復元するとそっくり入れかわる', () => {
  localStorage.setItem('eitan:progress', '{"a":1}')
  localStorage.setItem('other-app', 'x')
  localStorage.setItem('eitan:cloud-code', 'AAAAAAAAAAAAAAAA')
  const b = collectBackup(new Date('2026-10-21T00:00:00Z'))
  expect(b.items).toEqual({ 'eitan:progress': '{"a":1}' })
  expect(isBackup(b)).toBe(true)
  expect(isBackup({ app: 'other' })).toBe(false)
  localStorage.setItem('eitan:old', 'zzz')
  applyBackup({ ...b, items: { 'eitan:wallet': '{"coins":5}' } }, 'BBBBBBBBBBBBBBBB')
  expect(localStorage.getItem('eitan:old')).toBeNull()
  expect(localStorage.getItem('eitan:progress')).toBeNull()
  expect(localStorage.getItem('eitan:wallet')).toBe('{"coins":5}')
  expect(localStorage.getItem('other-app')).toBe('x')
  expect(loadCode()).toBe('BBBBBBBBBBBBBBBB')
  expect(loadSavedAt()).toBe('2026-10-21T00:00:00.000Z')
})

it('クラウドへの保存と読みこみ（Supabase の関数を呼ぶ）', async () => {
  localStorage.setItem('eitan:progress', '{"a":1}')
  const f = vi.fn(async () => new Response(JSON.stringify('2026-10-21T00:00:00Z'), { status: 200 }))
  await cloudSave('AAAAAAAAAAAAAAAA', f as never)
  const [url, init] = f.mock.calls[0] as unknown as [string, RequestInit]
  expect(url).toBe(`${SUPABASE_URL}/rest/v1/rpc/eitan_backup_save`)
  expect(JSON.parse(init.body as string).p_data.items['eitan:progress']).toBe('{"a":1}')
  expect(loadSavedAt()).not.toBe('')
  const b = collectBackup()
  const g = vi.fn(async () => new Response(JSON.stringify(b), { status: 200 }))
  expect(await cloudLoad('AAAAAAAAAAAAAAAA', g as never)).toEqual(b)
  const none = vi.fn(async () => new Response('null', { status: 200 }))
  expect(await cloudLoad('AAAAAAAAAAAAAAAA', none as never)).toBeNull()
  const bad = vi.fn(async () => new Response('{}', { status: 400 }))
  await expect(cloudSave('AAAAAAAAAAAAAAAA', bad as never)).rejects.toThrow()
})
