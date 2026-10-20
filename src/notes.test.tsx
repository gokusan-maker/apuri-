import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from './CardView'
import { setNote } from './notes'
import { WORDS } from './words'

describe('単語メモ', () => {
  it('空にすると消え、200文字まで', () => {
    expect(setNote({}, 'a', ' hi ')).toEqual({ a: 'hi' })
    expect(setNote({ a: 'x' }, 'a', '  ')).toEqual({})
    expect(setNote({}, 'a', 'あ'.repeat(300)).a).toHaveLength(200)
  })

  it('カードの裏でメモを書ける', () => {
    let saved = ''
    render(<Card card={WORDS[0]} onAnswer={() => {}} onNote={(t) => (saved = t)} />)
    fireEvent.click(screen.getByText('意味を見る'))
    fireEvent.click(screen.getByText('📝 メモを書く'))
    fireEvent.change(screen.getByLabelText('メモ'), { target: { value: 'a で始まる果物' } })
    fireEvent.click(screen.getByText('保存'))
    expect(saved).toBe('a で始まる果物')
  })
})
