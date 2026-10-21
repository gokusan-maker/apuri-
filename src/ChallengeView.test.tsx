import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Challenge } from './ChallengeView'

it('キャラクターと育ち具合で、チャレンジの種類と難しさが変わる', () => {
  const { unmount } = render(<Challenge monster={{ xp: 0 }} done={false} onClear={() => {}} onClose={() => {}} />)
  expect(screen.getByText('単語')).toBeInTheDocument()
  expect(screen.getByText(/やさしい（5問）/)).toBeInTheDocument()
  unmount()
  render(<Challenge monster={{ xp: 99999, species: 'dragon', branch: 'ear' }} done={false} onClear={() => {}} onClose={() => {}} />)
  expect(screen.getByText('英文和訳')).toBeInTheDocument()
  expect(screen.getByText(/むずかしい（10問）/)).toBeInTheDocument()
  fireEvent.click(screen.getByText('チャレンジ開始！'))
  expect(document.querySelector('.choice, .choices button')).not.toBeNull()
})

it('ペンペンは並べかえ、コンコンは文法', () => {
  const { unmount } = render(<Challenge monster={{ xp: 0, species: 'penguin' }} done={false} onClear={() => {}} onClose={() => {}} />)
  expect(screen.getByText('並べかえ')).toBeInTheDocument()
  unmount()
  render(<Challenge monster={{ xp: 0, species: 'fox' }} done onClear={() => {}} onClose={() => {}} />)
  expect(screen.getByText('文法')).toBeInTheDocument()
  expect(screen.getByText(/今日はクリアずみ/)).toBeInTheDocument()
})
