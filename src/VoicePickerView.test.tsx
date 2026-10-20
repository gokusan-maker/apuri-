import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { VoicePicker } from './VoicePickerView'

afterEach(() => {
  delete (window as { speechSynthesis?: unknown }).speechSynthesis
})

it('英語の声だけを選択肢に出し、選んだ声を返す', () => {
  Object.assign(window, {
    speechSynthesis: {
      getVoices: () => [
        { name: 'Samantha', lang: 'en-US' },
        { name: 'Kyoko', lang: 'ja-JP' },
        { name: 'Daniel', lang: 'en_GB' },
      ],
    },
  })
  let got = ''
  render(<VoicePicker value="" onChange={(v) => (got = v)} />)
  const sel = screen.getByLabelText('読み上げの声') as HTMLSelectElement
  expect([...sel.options].map((o) => o.textContent)).toEqual(['おまかせ', 'Samantha', 'Daniel'])
  fireEvent.change(sel, { target: { value: 'Daniel' } })
  expect(got).toBe('Daniel')
})

it('声がない端末では出さない', () => {
  const { container } = render(<VoicePicker value="" onChange={() => {}} />)
  expect(container.textContent).toBe('')
})
