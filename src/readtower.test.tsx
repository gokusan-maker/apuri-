import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { LONG_PASSAGES, totalOf } from './longreading'
import { towerFloor } from './readtower'
import { ReadTower } from './ReadTowerView'

const list = LONG_PASSAGES.slice(0, 6)

it('読解の塔：6割以上とれた長文がクリア。いまの階はクリアしていない最初の長文', () => {
  expect(towerFloor(list, {})).toBe(0)
  const rec = { [list[0].id]: totalOf(list[0]), [list[1].id]: Math.ceil(totalOf(list[1]) * 0.6) }
  expect(towerFloor(list, rec)).toBe(2)
  expect(towerFloor(list, { ...rec, [list[2].id]: 0 })).toBe(2) // 6割に足りないとまだ
})

it('読解の塔：いまの階・クリアした階・カギつきの次の階が見え、いまの階をおすと開く', () => {
  const rec = Object.fromEntries(list.slice(0, 3).map((p) => [p.id, totalOf(p)]))
  const open = vi.fn()
  render(<ReadTower list={list} record={rec} titleOf={(p) => p.title} onOpen={open} />)
  expect(screen.getByLabelText('3 / 6 階クリア')).toBeInTheDocument()
  expect(screen.getByLabelText('5階（まだ）')).toBeInTheDocument()
  expect(screen.queryByLabelText('6階（まだ）')).toBeNull() // 先は1階だけ
  fireEvent.click(screen.getByRole('button', { name: `4階：${list[3].title}` }))
  expect(open).toHaveBeenCalledWith(list[3])
  expect(screen.getByText('⬇ 1階ぶん、制覇ずみ')).toBeInTheDocument()
})
