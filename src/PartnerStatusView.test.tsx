import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { PartnerStatus } from './PartnerStatusView'

it('相棒の特技・必殺技・得意なボスが見られる', () => {
  render(<PartnerStatus monster={{ xp: 900, species: 'dragon', skillUses: 12, name: 'ドラ' }} />)
  expect(screen.getByText('📋 ドラのステータス')).toBeInTheDocument()
  expect(screen.getByText(/火の息 Lv2/)).toBeInTheDocument()
  expect(screen.getByText(/あと18回使うと Lv3/)).toBeInTheDocument()
  expect(screen.getByText('ドラゴンブレス・ゼロ')).toBeInTheDocument()
})
