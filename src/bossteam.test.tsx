import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { teamBossQuestions, TEAM_ORDER } from './boss'
import { Boss } from './BossView'
import { BossTeamContext, type BossTeam } from './bossteam'
import { WORDS } from './words'

const team: BossTeam = {
  word: { name: 'モチまる', fig: <span>W</span> },
  grammar: { name: 'コトバン', fig: <span>G</span> },
  reading: { name: 'リュウ', fig: <span>R</span> },
}

it('チームバトルの問題は、単語→文法→読解の順にまわり、どれも答えが選択肢にある', () => {
  const qs = teamBossQuestions(WORDS.filter((w) => w.level === '中1'))
  expect(qs.slice(0, 6).map((q) => q.team)).toEqual([...TEAM_ORDER, ...TEAM_ORDER])
  for (const q of qs) {
    expect(q.choices[q.answer]).toBe(q.word.ja)
    expect(new Set(q.choices).size).toBe(q.choices.length)
  }
  expect(qs.filter((q) => q.team === 'grammar').every((q) => q.word.en.includes('___'))).toBe(true)
})

it('ボス戦では3体のなかまがならび、番のなかまが攻撃する（正解で次のなかまへ）', () => {
  render(
    <BossTeamContext.Provider value={team}>
      <Boss level="中1" words={WORDS.filter((w) => w.level === '中1')} onAnswer={() => {}} onWin={() => {}} onExit={() => {}} />
    </BossTeamContext.Provider>,
  )
  expect(screen.getByRole('group', { name: 'チーム' }).children).toHaveLength(3)
  expect(screen.getByText(/モチまるの単語アタック！/)).toBeInTheDocument()
  const q = document.querySelector('.boss-team-m.on')
  expect(q?.textContent).toContain('単語')
  const right = [...document.querySelectorAll<HTMLButtonElement>('.choices .choice')]
  const en = document.querySelector('.en')!.textContent!
  const w = WORDS.find((x) => x.en === en)!
  fireEvent.click(right.find((b) => b.textContent === w.ja)!)
  fireEvent.click(screen.getByText(/次へ|つぎへ/))
  expect(screen.getByText(/コトバンの文法アタック！/)).toBeInTheDocument()
})

it('単語→文法→読解の3体が続けて正解すると、合体技でダメージが+15ふえる', async () => {
  const { isTeamCombo, TEAM_COMBO_DAMAGE } = await import('./boss')
  expect(TEAM_COMBO_DAMAGE).toBe(15)
  expect(isTeamCombo('reading', 3)).toBe(true)
  expect(isTeamCombo('reading', 2)).toBe(false)
  expect(isTeamCombo('grammar', 5)).toBe(false)
})

it('正解すると、答えた番のなかまの上に「+〇XP」が出る', () => {
  render(
    <BossTeamContext.Provider value={team}>
      <Boss level="中1" words={WORDS.filter((w) => w.level === '中1')} onAnswer={() => {}} onWin={() => {}} onExit={() => {}} />
    </BossTeamContext.Provider>,
  )
  const en = document.querySelector('.en')!.textContent!
  const w = WORDS.find((x) => x.en === en)!
  fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choices .choice')].find((b) => b.textContent === w.ja)!)
  expect(screen.getByLabelText(/モチまるに XP \+\d+/)).toBeInTheDocument()
})

it('チームバトルのはじめに「VS」が出る（答えると消える）', () => {
  render(
    <BossTeamContext.Provider value={team}>
      <Boss level="中1" words={WORDS.filter((w) => w.level === '中1')} onAnswer={() => {}} onWin={() => {}} onExit={() => {}} />
    </BossTeamContext.Provider>,
  )
  expect(document.querySelector('.boss-vs')).not.toBeNull()
  fireEvent.click(document.querySelector<HTMLButtonElement>('.choices .choice')!)
  expect(document.querySelector('.boss-vs')).toBeNull()
})
