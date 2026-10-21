import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, expect, it, vi } from 'vitest'
import { Cloud } from './CloudView'

beforeEach(() => localStorage.clear())

it('クラウドに保存すると引き継ぎコードと保存時刻が出る', async () => {
  const save = vi.fn(async () => '2026-10-21T00:00:00.000Z')
  render(<Cloud save={save} />)
  fireEvent.click(screen.getByText('☁️ クラウドに保存する'))
  await waitFor(() => expect(screen.getByText('☁️ クラウドに保存しました')).toBeInTheDocument())
  expect(save).toHaveBeenCalledWith(expect.stringMatching(/^[A-Z2-9]{16}$/))
  expect(document.querySelector('.cloud-code')!.textContent).toMatch(/^[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/)
})

it('引き継ぎコードで復元すると、データが置きかわる', async () => {
  vi.spyOn(window, 'confirm').mockReturnValue(true)
  const restored = vi.fn()
  const load = vi.fn(async () => ({ app: 'eitan' as const, v: 1 as const, savedAt: '2026-10-21T00:00:00.000Z', items: { 'eitan:wallet': '{"coins":99,"owned":[]}' } }))
  render(<Cloud load={load} onRestored={restored} />)
  fireEvent.change(screen.getByLabelText('引き継ぎコード'), { target: { value: 'abcd-efgh-jklm-npqr' } })
  fireEvent.click(screen.getByText('復元'))
  await waitFor(() => expect(restored).toHaveBeenCalled())
  expect(load).toHaveBeenCalledWith('ABCDEFGHJKLMNPQR')
  expect(localStorage.getItem('eitan:wallet')).toBe('{"coins":99,"owned":[]}')
})

it('コードがまちがっていたり、データがないときは知らせる', async () => {
  render(<Cloud load={async () => null} />)
  fireEvent.change(screen.getByLabelText('引き継ぎコード'), { target: { value: 'abc' } })
  fireEvent.click(screen.getByText('復元'))
  expect(screen.getByText('引き継ぎコードは16文字だよ')).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText('引き継ぎコード'), { target: { value: 'ABCDEFGHJKLMNPQR' } })
  fireEvent.click(screen.getByText('復元'))
  await waitFor(() => expect(screen.getByText('そのコードのデータは見つかりませんでした')).toBeInTheDocument())
})
