import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { RoomScene } from './RoomSceneView'
import { ROOMS } from './shop'

it('すべての部屋に背景のイラストがあり、部屋なしでは出ない', () => {
  for (const r of ROOMS) {
    const { container } = render(<RoomScene room={r.id} />)
    expect(container.querySelector(`.scene-${r.id}`), r.id).not.toBeNull()
  }
  expect(render(<RoomScene />).container.innerHTML).toBe('')
})

it('ホームでは部屋がカード全体ではなく、相棒のうしろの小さな四角にだけ敷かれる', async () => {
  const { Monster } = await import('./MonsterView')
  const { container } = render(<Monster monster={{ xp: 0 } as never} room="ocean" />)
  const card = container.querySelector('section.monster')!
  expect(card.className).not.toMatch(/room-/)
  const stage = card.querySelector('.monster-stage.room-ocean')!
  expect(stage).not.toBeNull()
  expect(stage.querySelector('.scene-ocean')).not.toBeNull()
  expect(stage.querySelector('.monster-body')).not.toBeNull()
})

it('ごきげんMAXの日だけ、相棒のうしろの四角が光る', async () => {
  const { Monster } = await import('./MonsterView')
  const { container, unmount } = render(<Monster monster={{ xp: 0 } as never} mood100={{ points: 20, max: 20 }} />)
  expect(container.querySelector('.monster-stage.stage-max')).not.toBeNull()
  unmount()
  const r = render(<Monster monster={{ xp: 0 } as never} mood100={{ points: 5, max: 20 }} />)
  expect(r.container.querySelector('.monster-stage.stage-max')).toBeNull()
})

it('今日の課題を3つクリアした日は、相棒の四角に🏅の印', async () => {
  const { Monster } = await import('./MonsterView')
  const { unmount } = render(<Monster monster={{ xp: 0 } as never} trioDone />)
  expect(document.querySelector('.monster-stage [aria-label="今日の課題3つクリア"]')).not.toBeNull()
  unmount()
  render(<Monster monster={{ xp: 0 } as never} />)
  expect(document.querySelector('[aria-label="今日の課題3つクリア"]')).toBeNull()
})

it('🏅に連続達成日数（2日以上）が出る', async () => {
  const { Monster } = await import('./MonsterView')
  const { unmount } = render(<Monster monster={{ xp: 0 } as never} trioDone trioStreak={4} />)
  expect(document.querySelector('[aria-label="今日の課題3つクリア 4日連続"]')?.textContent).toBe('🏅4')
  unmount()
  render(<Monster monster={{ xp: 0 } as never} trioDone trioStreak={1} />)
  expect(document.querySelector('[aria-label="今日の課題3つクリア"]')?.textContent).toBe('🏅')
})

it('ごきげんが上がると、メーターのハートが作りなおされてぽんとはねる', async () => {
  const { Monster } = await import('./MonsterView')
  const r = render(<Monster monster={{ xp: 0 } as never} mood100={{ points: 5, max: 20 }} />)
  const before = document.querySelector('.mood-heart')!
  expect(screen.getByLabelText('ごきげん 5 / 20').textContent).toContain('💗 ごきげん 5/20')
  r.rerender(<Monster monster={{ xp: 0 } as never} mood100={{ points: 6, max: 20 }} />)
  expect(document.querySelector('.mood-heart')).not.toBe(before)
})
