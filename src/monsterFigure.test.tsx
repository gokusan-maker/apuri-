import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { MonsterFigure } from './MonsterView'
import { FORMS } from './monster'

const form = (id: string) => FORMS.find((f) => f.id === id)!

it('相棒の絵：段階が上がるほど飾りがふえる', () => {
  const egg = render(<MonsterFigure form={form('egg')} />).container
  expect(egg.querySelector('.egg-wobble')).not.toBeNull()
  const chibi = render(<MonsterFigure form={form('chibi')} />).container
  expect(chibi.querySelector('.monster-arms')).toBeNull()
  expect(chibi.querySelector('.particles')).toBeNull()
  const mori = render(<MonsterFigure form={form('mori')} />).container
  expect(mori.querySelector('.monster-arms')).not.toBeNull()
  expect(mori.querySelectorAll('.particles > g')).toHaveLength(2)
  const myth = render(<MonsterFigure form={form('sora-myth')} />).container
  expect(myth.querySelector('.halo')).not.toBeNull()
  expect(myth.querySelector('.wings')).not.toBeNull()
  expect(myth.querySelectorAll('.particles > g')).toHaveLength(4)
})

it('図鑑の未発見（シルエット）は顔も飾りも出ない', () => {
  const c = render(<MonsterFigure form={form('inazuma-myth')} hidden />).container
  expect(c.textContent).toContain('？')
  expect(c.querySelector('.particles')).toBeNull()
  expect(c.querySelector('.monster-face')).toBeNull()
})

it('ふつうの顔はまばたきする目、うれしい顔は笑った目', () => {
  expect(render(<MonsterFigure form={form('mochimaru')} />).container.querySelector('.monster-eyes')).not.toBeNull()
  expect(render(<MonsterFigure form={form('mochimaru')} mood="happy" />).container.querySelector('.monster-eyes')).toBeNull()
})
