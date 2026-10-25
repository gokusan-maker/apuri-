import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { READ_THEMES, readCastleFloors, themeSentence } from './readcastle'
import { passagesFor, READ_LEVELS } from './readlevel'
import { ReadThemeCastle } from './ReadThemeCastleView'
import type { LongPassage } from './longreading'

const fake = (id: string, text: string): LongPassage => ({ id, title: id, level: '難関大', paragraphs: [text], ja: [''], blanks: [], tf: [] })
const th = (id: string) => READ_THEMES.find((t) => t.id === id)!

it('構文の見つけ方：本物の構文だけを拾う', () => {
  expect(themeSentence(fake('a', 'Seen from the hill, the town looked tiny.'), th('participle'))).toBeTruthy()
  expect(themeSentence(fake('b', 'During the summer, we swam.'), th('participle'))).toBeNull()
  expect(themeSentence(fake('c', 'Getting lost, it turns out, can be useful.'), th('participle'))).toBeNull()
  expect(themeSentence(fake('d', 'Never have I seen such a sky.'), th('inversion'))).toBeTruthy()
  expect(themeSentence(fake('e', 'Little by little, I learned.'), th('inversion'))).toBeNull()
  expect(themeSentence(fake('f', 'Only forty students can join.'), th('inversion'))).toBeNull()
  expect(themeSentence(fake('g', 'It was not until 1940 that it was used.'), th('cleft'))).toBeTruthy()
  expect(themeSentence(fake('h', 'If you come to Japan, I would like to meet you.'), th('subjunctive'))).toBeNull()
  expect(themeSentence(fake('i', 'If ice sank, lakes would freeze.'), th('subjunctive'))).toBeTruthy()
  expect(themeSentence(fake('j', 'What matters is how you use time.'), th('pseudo-cleft'))).toBeTruthy()
})

it('テーマごとに最大3階。いまある長文で、どのテーマも1本以上', () => {
  const all = READ_LEVELS.flatMap((l) => passagesFor(l.id))
  const fl = readCastleFloors(all)
  for (const t of READ_THEMES) {
    const n = fl.filter((f) => f.theme.id === t.id).length
    expect(n, t.id).toBeGreaterThanOrEqual(1)
    expect(n).toBeLessThanOrEqual(3)
  }
})

it('構文の城：1階目は構文の解説と、長文に出てくるその文。「長文に挑戦」で長文を開く', () => {
  localStorage.clear()
  const open = vi.fn()
  const list = passagesFor('国公立')
  render(<ReadThemeCastle list={list} record={{}} onOpen={open} />)
  fireEvent.click(screen.getByRole('button', { name: /^1階：/ }))
  expect(screen.getByText(/この長文に出てくる/)).toBeInTheDocument()
  fireEvent.click(screen.getByText('長文に挑戦'))
  expect(open).toHaveBeenCalled()
})

it('構文の城：2階目からも、長文に入る前にその長文に出てくる構文の文とコツを見せる', () => {
  localStorage.clear()
  const open = vi.fn()
  const list = passagesFor('国公立')
  const { container } = render(<ReadThemeCastle list={list} record={{}} onOpen={open} />)
  fireEvent.click(screen.getByRole('button', { name: /^1階：/ }))
  // 1階目は図の解説（コツの1行ではない）
  expect(container.querySelector('.rc-tip')).toBeNull()
  // 1階目の長文を満点にすると、2階目でもまず構文の文とコツが出る
  fireEvent.click(screen.getByText('長文に挑戦'))
  const p = open.mock.calls[0][0] as LongPassage
  const rec = { [p.id]: 99 }
  const r2 = render(<ReadThemeCastle list={list} record={rec} onOpen={open} />)
  fireEvent.click(r2.getAllByRole('button', { name: /^2階：/ })[0])
  expect(r2.container.querySelector('.rc-tip')).not.toBeNull()
  expect(r2.getAllByText(/この長文に出てくる/).length).toBeGreaterThan(0)
})
