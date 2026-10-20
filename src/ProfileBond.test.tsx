import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { Profile } from './MonsterView'

it('プロフィールになつき度が出る', () => {
  render(<Profile monster={{ xp: 100 } as never} studyDays={5} />)
  expect(screen.getByLabelText('なつき度 2').textContent).toContain('あと2日')
})
