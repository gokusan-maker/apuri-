import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { figOf, GRAMMAR_FIGS } from './grammarfig'
import { GrammarFigure } from './GrammarFigView'
import { grammarCastleFloors } from './grammarcastle'
import { GRAMMAR } from './grammar'

describe('文法の城の解説図', () => {
  it('城の項目（①②つきも）から図を引ける', () => {
    expect(figOf('gc:不定詞:1')).toBe(GRAMMAR_FIGS['不定詞'])
    expect(figOf('gc:時制①:1')).toBe(GRAMMAR_FIGS['時制'])
  })
  it('城に出てくる項目には全部図がある', () => {
    const names = new Set(grammarCastleFloors(GRAMMAR).filter((f) => f.explain).map((f) => f.id))
    for (const id of names) expect(figOf(id).uses.length, id).toBe(3)
  })
  it('かたちと使い方3つを表示する', () => {
    render(<GrammarFigure fig={GRAMMAR_FIGS['不定詞']} />)
    expect(screen.getByText('to')).toBeInTheDocument()
    expect(screen.getByText('～するために')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'I want to swim. を聞く' })).toBeInTheDocument()
  })
})

it('入試の城の解説：見出しの項目（時制・関係詞など）ごとに、かたちの図', async () => {
  const { examFigs } = await import('./grammarfig')
  expect(examFigs('共通テストの文法（時制・関係詞・分詞）').map((r) => r.name)).toEqual(['時制', '関係詞', '分詞'])
  expect(examFigs('私立医学部の文法（医療の英文で）')).toEqual([])
})

it('読解の構文のテーマにも、どれも図（かたちと使い方3つ）がある', async () => {
  const { READ_THEMES } = await import('./readcastle')
  for (const t of READ_THEMES) expect(t.fig.uses.length, t.id).toBe(3)
})
