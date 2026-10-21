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

it('さわったときの表情：ウインク・星の目・びっくり', () => {
  for (const m of ['wink', 'star', 'wow'] as const) {
    expect(render(<MonsterFigure form={form('mochimaru')} mood={m} />).container.querySelector(`.face-${m}`)).not.toBeNull()
  }
})

it('ふつうの顔だけキョロキョロする', () => {
  expect(render(<MonsterFigure form={form('mochimaru')} />).container.querySelector('.glance')).not.toBeNull()
  expect(render(<MonsterFigure form={form('mochimaru')} mood="lonely" />).container.querySelector('.glance')).toBeNull()
})

it('図鑑：出会った姿をタップすると大きな絵と段階の星と説明が出る', async () => {
  const { Zukan } = await import('./MonsterView')
  const { fireEvent, screen } = await import('@testing-library/react')
  render(<Zukan monsters={[{ xp: 0, seen: ['egg', 'chibi', 'mochimaru'] }]} />)
  fireEvent.click(screen.getByRole('button', { name: 'モチまるの説明' }))
  expect(document.querySelector('.zukan-big svg')).not.toBeNull()
  expect(screen.getByLabelText('進化段階 2').textContent).toBe('★★☆☆☆☆')
  expect(screen.getByText(/ぷにぷにの体/)).toBeInTheDocument()
})

it('タマゴはかえる直前ほどひびが入る', () => {
  const n = (c: number) => render(<MonsterFigure form={form('egg')} crack={c} />).container.querySelectorAll('.egg-crack').length
  expect([n(0), n(0.3), n(0.6), n(0.9)]).toEqual([0, 1, 2, 3])
})

it('ねむいときは目を閉じて鼻ちょうちん', () => {
  expect(render(<MonsterFigure form={form('mochimaru')} mood="sleep" />).container.querySelector('.face-sleep .snot')).not.toBeNull()
})

it('Lv15からはしっぽと模様、神話の姿はきらきら', () => {
  const c = render(<MonsterFigure form={form('mochimaru')} />).container
  const m = render(<MonsterFigure form={form('mori-myth')} />).container
  expect(c.querySelectorAll('path').length).toBeLessThan(m.querySelectorAll('path').length)
  expect(m.querySelector('.myth-glitter')).not.toBeNull()
  expect(render(<MonsterFigure form={form('inazuma')} />).container.querySelector('.myth-glitter')).toBeNull()
})

it('図鑑は系統ごとに進化の流れで並ぶ（全15種）', async () => {
  const { Zukan } = await import('./MonsterView')
  render(<Zukan monsters={[{ xp: 0 }]} />)
  expect(document.querySelectorAll('.zukan-row')).toHaveLength(6) // 4系統＋キャラクター＋色ちがい
  expect(document.querySelectorAll('.zukan-line:not(.zukan-kinds) li')).toHaveLength(15)
  expect(document.querySelectorAll('.zukan-arrow')).toHaveLength(11)
})

it('図鑑に色ちがいの集まり具合が出る', async () => {
  const { Zukan } = await import('./MonsterView')
  const { screen } = await import('@testing-library/react')
  render(<Zukan monsters={[{ xp: 0 }, { xp: 0, kind: 'kin' }]} />)
  expect(screen.getByText(/色ちがい 2 \/ 6/)).toBeInTheDocument()
  expect(screen.getByLabelText('きんいろ（スーパーレア）')).toBeInTheDocument()
  expect(screen.getAllByLabelText('まだ出ていない色')).toHaveLength(4)
})

it('なかまの画面にそれぞれのレベル・XPバー・次の進化までが出る', async () => {
  const { Party } = await import('./MonsterView')
  const { screen } = await import('@testing-library/react')
  render(<Party party={{ active: 0, members: [{ xp: 0 }, { xp: 25, kind: 'umi' }] }} onSelect={() => {}} />)
  expect(screen.getByText(/相棒・Lv\.1/)).toBeInTheDocument()
  expect(screen.getByText('あとLv1で進化')).toBeInTheDocument()
  expect(screen.getByText('あとLv3で進化')).toBeInTheDocument()
  expect(screen.getByText(/うみ色/)).toBeInTheDocument()
  expect(document.querySelectorAll('.party-bar')).toHaveLength(2)
})

it('図鑑にキャラクター（モチ・コンコン・ペンペン・ドラコ）の集まり具合が出る', async () => {
  const { Zukan } = await import('./MonsterView')
  const { screen } = await import('@testing-library/react')
  render(<Zukan monsters={[{ xp: 0 }, { xp: 0, species: 'dragon' }]} />)
  expect(screen.getByText(/キャラクター 2 \/ 6/)).toBeInTheDocument()
  expect(screen.getByLabelText(/^ドラコ：/)).toBeInTheDocument()
  expect(screen.getAllByLabelText("まだ出会っていないキャラクター")).toHaveLength(4)
})
