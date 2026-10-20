import { beforeEach, describe, expect, it } from 'vitest'
import { backupFileName, exportData, importData, needBackup, resetAll } from './backup'

describe('バックアップ', () => {
  beforeEach(() => localStorage.clear())

  it('eitan: のデータだけを書き出す', () => {
    localStorage.setItem('eitan:monster', '{"xp":42}')
    localStorage.setItem('eitan:best-time-attack', '7')
    localStorage.setItem('other-app', 'x')
    const b = exportData(localStorage, new Date('2026-10-20T12:00:00Z'))
    expect(b.app).toBe('eitan')
    expect(b.data).toEqual({ 'eitan:monster': { xp: 42 }, 'eitan:best-time-attack': 7 })
    expect(backupFileName(new Date('2026-10-20T12:00:00Z'))).toBe('eitan-backup-2026-10-20.json')
  })

  it('書き出したものを読み込むと元に戻り、古いデータは消える', () => {
    localStorage.setItem('eitan:monster', '{"xp":42}')
    localStorage.setItem('eitan:progress', '{"apple":{"box":2,"due":"2026-10-22"}}')
    const text = JSON.stringify(exportData())
    localStorage.clear()
    localStorage.setItem('eitan:monster', '{"xp":1}')
    localStorage.setItem('eitan:mistakes', '{"apple":3}')
    localStorage.setItem('other-app', 'keep')
    expect(importData(text)).toBe(2)
    expect(JSON.parse(localStorage.getItem('eitan:monster')!)).toEqual({ xp: 42 })
    expect(JSON.parse(localStorage.getItem('eitan:progress')!).apple.box).toBe(2)
    expect(localStorage.getItem('eitan:mistakes')).toBeNull()
    expect(localStorage.getItem('other-app')).toBe('keep')
  })

  it('別のファイルや壊れたファイルは読み込まず、今のデータを守る', () => {
    localStorage.setItem('eitan:monster', '{"xp":42}')
    expect(() => importData('not json')).toThrow('JSON として読めませんでした')
    expect(() => importData('{"app":"other","data":{}}')).toThrow('えいたんのバックアップファイルではありません')
    expect(() => importData('{"app":"eitan","version":99,"data":{}}')).toThrow('新しいバージョン')
    expect(localStorage.getItem('eitan:monster')).toBe('{"xp":42}')
  })
})

it('すべてのデータを消す（ほかのアプリのデータは残す）', () => {
  localStorage.setItem('eitan:monster', '{"xp":1}')
  localStorage.setItem('eitan:wallet', '{}')
  localStorage.setItem('other', 'x')
  expect(resetAll()).toBe(2)
  expect(localStorage.getItem('eitan:monster')).toBeNull()
  expect(localStorage.getItem('other')).toBe('x')
})

it('バックアップのおすすめは、50問以上学習していて14日以上保存していないとき', () => {
  expect(needBackup('', '2026-10-20', 10)).toBe(false)
  expect(needBackup('', '2026-10-20', 60)).toBe(true)
  expect(needBackup('2026-10-10', '2026-10-20', 60)).toBe(false)
  expect(needBackup('2026-10-06', '2026-10-20', 60)).toBe(true)
})
