import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { CHAR_TYPES, typeOf } from './chartype'
import { Gacha } from './GachaView'
import { SPECIES } from './monster'

it('どのキャラクターにもタイプがある（特技からきまる）', () => {
  for (const sp of SPECIES) expect(Object.values(CHAR_TYPES)).toContain(typeOf(sp.id))
  expect(typeOf('dragon').name).toBe('アタック型')
  expect(typeOf('penguin').name).toBe('シールド型')
  expect(typeOf(undefined).name).toBe('ねばり型')
})

it('ガチャのページにキャラクター図鑑：会っていない子は ？？？、タップでタイプの説明', () => {
  render(<Gacha partnerName="モチ" coins={0} members={2} pityLeft={10} onDraw={() => null} ownedSpecies={['mochi', 'fox']} />)
  expect(screen.getByLabelText(`キャラクター図鑑 2 / ${SPECIES.length}`)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'コンコン（アタック型）' })).toBeInTheDocument()
  const locked = screen.getAllByRole('button', { name: 'まだ会っていないキャラクター' })
  expect(locked).toHaveLength(SPECIES.length - 2)
  fireEvent.click(screen.getByRole('button', { name: 'コンコン（アタック型）' }))
  expect(screen.getByRole('status').textContent).toContain('ボスへのダメージをふやす')
  // 押したカードはくるっと回る（押したものだけ）
  expect(screen.getByRole('button', { name: 'コンコン（アタック型）' }).closest('li')!.classList.contains('picked')).toBe(true)
  expect(document.querySelectorAll('.char-book-list li.picked')).toHaveLength(1)
})

it('なかま交換は、交換する10体をえらべる（10体えらぶまで交換できない）', () => {
  const pool = Array.from({ length: 12 }, (_, i) => ({ index: i + 1, member: { xp: 0, name: `子${i + 1}` } }))
  let got: number[] | undefined
  render(<Gacha partnerName="モチ" coins={0} members={13} pityLeft={10} onDraw={() => null} tradeCount={12} tradePool={pool} onTrade={(p) => (got = p)} />)
  fireEvent.click(screen.getByRole('button', { name: '🎟 えらんで交換' }))
  expect(screen.getByRole('status').textContent).toContain('10/10')
  expect(screen.getByRole('button', { name: '子3 Lv.1' })).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('button', { name: '子1 Lv.1' })).toBeDisabled()
  fireEvent.click(screen.getByRole('button', { name: '子3 Lv.1' }))
  expect(screen.getByRole('button', { name: '🎟 この10体と交換' })).toBeDisabled()
  fireEvent.click(screen.getByRole('button', { name: '子1 Lv.1' }))
  fireEvent.click(screen.getByRole('button', { name: '🎟 この10体と交換' }))
  expect(got?.sort((a, b) => a - b)).toEqual([1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((x) => x !== 2))
})

it('新しいキャラ（フクロウ・カメ・タコ）は、色ちがいではなくちがう形のパーツで描かれる', async () => {
  const { MonsterFigure } = await import('./MonsterView')
  const { FORMS, withSpecies } = await import('./monster')
  const paths = (sp: string) => {
    const r = render(<MonsterFigure form={withSpecies(FORMS[2], sp)} />)
    const d = [...r.container.querySelectorAll('path, circle')].map((e) => e.getAttribute('d') ?? `c${e.getAttribute('cx')},${e.getAttribute('cy')}`).join('|')
    r.unmount()
    return d
  }
  const base = paths('mochi')
  for (const sp of ['owl', 'turtle', 'octopus']) {
    expect(paths(sp)).not.toBe(base)
    expect(SPECIES.some((s) => s.id === sp)).toBe(true)
  }
  expect(typeOf('turtle').name).toBe('シールド型')
  expect(typeOf('owl').name).toBe('サポート型')
  expect(typeOf('octopus').name).toBe('スピード型')
})

it('ガチャは「タマゴガチャ」と「キャラガチャ」の2種類。キャラガチャは生まれた姿で出る', async () => {
  const { CHARA_PRICE, HATCH_XP } = await import('./gacha')
  const { formOf } = await import('./monster')
  expect(formOf({ xp: HATCH_XP, species: 'owl' }).stage).toBeGreaterThanOrEqual(1)
  let called = 0
  const k = { kind: { id: 'normal', name: 'ふつう', rarity: 'N' as const, color: '', line: '' }, species: SPECIES.find((s) => s.id === 'turtle')! }
  render(<Gacha partnerName="モチ" coins={CHARA_PRICE} members={2} pityLeft={10} onDraw={() => null} ownedSpecies={['mochi']} onChara={() => (called++, k)} />)
  expect(screen.getByRole('tab', { name: '🥚 タマゴガチャ' })).toHaveAttribute('aria-selected', 'true')
  fireEvent.click(screen.getByRole('tab', { name: '🐣 キャラガチャ' }))
  fireEvent.click(screen.getByRole('button', { name: `🐣 キャラガチャを引く 🪙${CHARA_PRICE}` }))
  expect(called).toBe(1)
  expect(screen.getByText(/カメスケが仲間になった/)).toBeInTheDocument()
})

it('スーパーレア（きんいろ）とウルトラレア（にじいろ）は特別なすがた（光・マント/つばさ・ティアラ/王冠・ペンダント）', async () => {
  const { MonsterFigure } = await import('./MonsterView')
  const { formOf } = await import('./monster')
  const f = formOf({ xp: 60, species: 'fox' })
  const n = render(<MonsterFigure form={f} />)
  expect(n.container.querySelector('.rare-back')).toBeNull()
  n.unmount()
  const sr = render(<MonsterFigure form={f} kind="kin" />)
  expect(sr.container.querySelector('.rare-rays')).not.toBeNull()
  expect(sr.container.querySelector('.rare-sweep')).not.toBeNull()
  expect(sr.container.querySelector('.ur-wings')).toBeNull()
  sr.unmount()
  const ur = render(<MonsterFigure form={f} kind="niji" />)
  expect(ur.container.querySelector('.ur-wings')).not.toBeNull()
  expect(ur.container.querySelector('.ur-rings')).not.toBeNull()
  expect(ur.container.querySelector('.ur-body')).not.toBeNull()
})

it('図鑑：会えたキャラの数がふえると、数字が作りなおされてぽんとはねる', () => {
  const r = render(<Gacha partnerName="モチ" coins={0} members={2} pityLeft={10} onDraw={() => null} ownedSpecies={['mochi', 'fox']} />)
  const before = document.querySelector('.book-count')!
  expect(before.textContent).toBe('2')
  expect(screen.getByLabelText(`キャラクター図鑑 2 / ${SPECIES.length}`).textContent).toBe(`📖 キャラクター図鑑（2/${SPECIES.length}）`)
  r.rerender(<Gacha partnerName="モチ" coins={0} members={2} pityLeft={10} onDraw={() => null} ownedSpecies={['mochi', 'fox', 'cat']} />)
  expect(document.querySelector('.book-count')).not.toBe(before)
  expect(document.querySelector('.book-count')!.textContent).toBe('3')
})

it('デザイン119：キャラ図鑑をタイプでしぼりこめる（もう一度おすと全部にもどる）', () => {
  render(<Gacha partnerName="モチ" coins={0} members={2} pityLeft={10} onDraw={() => null} ownedSpecies={['mochi', 'fox', 'penguin']} />)
  const all = document.querySelectorAll('.char-book-list li').length
  expect(all).toBe(SPECIES.length)
  const btn = screen.getByRole('button', { name: '🛡 シールド型' })
  fireEvent.click(btn)
  expect(btn.getAttribute('aria-pressed')).toBe('true')
  const n = SPECIES.filter((sp) => typeOf(sp.id).id === 'shield').length
  expect(document.querySelectorAll('.char-book-list li')).toHaveLength(n)
  expect(screen.queryByRole('button', { name: 'コンコン（アタック型）' })).toBeNull()
  fireEvent.click(btn)
  expect(document.querySelectorAll('.char-book-list li')).toHaveLength(all)
})

it('デザイン126：キャラ図鑑の説明に、同じタイプのほかのキャラの数が出る', () => {
  render(<Gacha partnerName="モチ" coins={0} members={2} pityLeft={10} onDraw={() => null} ownedSpecies={['mochi', 'fox']} />)
  fireEvent.click(screen.getByRole('button', { name: 'コンコン（アタック型）' }))
  const n = SPECIES.filter((sp) => sp.id !== 'fox' && typeOf(sp.id).id === 'attack').length
  expect(screen.getByRole('status').textContent).toContain(`（同じアタック型のキャラ：ほかに${n}体）`)
})

it('デザイン131：キャラ図鑑を、なかまにいる数の多い順にならべかえられる', () => {
  render(<Gacha partnerName="モチ" coins={0} members={5} pityLeft={10} onDraw={() => null} ownedSpecies={['mochi', 'fox', 'cat', 'cat', 'cat']} />)
  const first = () => document.querySelector('.char-book-list li .char-book-name')!.textContent
  expect(first()).toBe(SPECIES[0].name)
  fireEvent.click(screen.getByRole('button', { name: '👥 なかまの多い順' }))
  expect(first()).toBe(SPECIES.find((sp) => sp.id === 'cat')!.name)
  fireEvent.click(screen.getByRole('button', { name: '📖 図鑑の番号順' }))
  expect(first()).toBe(SPECIES[0].name)
})

it('デザイン134：キャラ図鑑に、まだ会っていない子の数がタイプ別に出る', () => {
  render(<Gacha partnerName="モチ" coins={0} members={2} pityLeft={10} onDraw={() => null} ownedSpecies={['mochi', 'fox']} />)
  const el = screen.getByLabelText('タイプ別のまだ会っていない数')
  const n = SPECIES.filter((sp) => sp.id !== 'mochi' && sp.id !== 'fox' && typeOf(sp.id).id === 'attack').length
  expect(el.textContent).toContain(`⚔あと${n}`)
})

it('デザイン140：キャラ図鑑の説明で、生まれたタマゴの名前が 🥚 つきで目立つ', async () => {
  const { speciesOf } = await import('./monster')
  render(<Gacha partnerName="モチ" coins={0} members={2} pityLeft={10} onDraw={() => null} ownedSpecies={['mochi', 'fox']} />)
  fireEvent.click(screen.getByRole('button', { name: 'コンコン（アタック型）' }))
  const el = screen.getByLabelText('生まれたタマゴ')
  expect(el.textContent).toBe(`（🥚 ${speciesOf('fox').egg}から生まれた）`)
  expect(el.querySelector('strong')!.textContent).toBe(speciesOf('fox').egg)
})
