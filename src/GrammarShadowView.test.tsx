import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { GRAMMAR } from './grammar'
import { GrammarShadow } from './GrammarShadowView'

it('聞いてから「言えた」で次へ進み、全部終わるとおしまい', async () => {
  const speech = await import('./speech')
  const sp = vi.spyOn(speech, 'speak').mockImplementation(() => {})
  const u = GRAMMAR[0]
  render(<GrammarShadow unit={u} onBack={() => {}} />)
  for (const ex of u.examples) {
    expect(screen.getByText(ex.en)).toBeInTheDocument()
    expect(screen.getByText('🗣 言えた！ 次へ')).toBeDisabled()
    fireEvent.click(screen.getByText('🔊 聞く'))
    expect(sp).toHaveBeenLastCalledWith(ex.en)
    fireEvent.click(screen.getByText('🗣 言えた！ 次へ'))
  }
  expect(screen.getByText(`🎉 ${u.examples.length}文ぜんぶ言えた！`)).toBeInTheDocument()
  sp.mockRestore()
})
