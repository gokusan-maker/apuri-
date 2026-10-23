import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { SettingsPanel } from './SettingsView'
import { loadSettings } from './settings'

it('設定の項目名は短く、画面の色とテーマカラーは1行（fit）に並ぶ', () => {
  render(<SettingsPanel settings={loadSettings()} onChange={() => {}} />)
  expect(screen.getByText('定期テストの日')).toBeInTheDocument()
  expect(screen.getByText('かんたんモード（3択に）')).toBeInTheDocument()
  expect(screen.getByText('自動').closest('.levels')!.classList.contains('fit')).toBe(true)
  expect(screen.getByText('オレンジ').closest('.levels')!.classList.contains('fit')).toBe(true)
})
