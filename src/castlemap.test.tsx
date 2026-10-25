import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { mapSpots } from './castlemap'
import { CastleMap } from './CastleMapView'

describe('城の地図', () => {
  it('3つずつへび道にならぶ（2行目は右から左）', () => {
    const p = mapSpots(5)
    expect(p[0].x).toBeLessThan(p[2].x)
    expect(p[3].x).toBeGreaterThan(p[4].x)
    expect(p[3].y).toBeGreaterThan(p[2].y)
  })
  it('城をえらぶと onPick。全部クリアした城には👑', () => {
    const pick = vi.fn()
    render(<CastleMap title="地図" unit="本" current="a" spots={[{ id: 'a', name: 'かんたん', done: 2, total: 2 }, { id: 'b', name: 'ふつう', done: 0, total: 5 }]} onPick={pick} />)
    expect(screen.getByRole('tab', { name: /かんたん/ })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: /かんたん/ }).textContent).toContain('👑')
    fireEvent.click(screen.getByRole('tab', { name: /ふつう/ }))
    expect(pick).toHaveBeenCalledWith('b')
  })
})
