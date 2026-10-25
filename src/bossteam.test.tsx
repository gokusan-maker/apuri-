import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import { teamBossQuestions, TEAM_ORDER } from './boss'
import { Boss } from './BossView'
import { BossTeamContext, TEAM_WIN_LINES, teamMvp, type BossTeam } from './bossteam'
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

it('負けると、3体のなかまがそれぞれ1行ではげましてくれる', () => {
  render(
    <BossTeamContext.Provider value={team}>
      <Boss level="中1" words={WORDS.filter((w) => w.level === '中1')} onAnswer={() => {}} onWin={() => {}} onExit={() => {}} startHearts={1} />
    </BossTeamContext.Provider>,
  )
  // チームバトルでは、まちがえると番のなかまの体力が減り、体力0でダウン（ハート-1）→ 負け
  for (let i = 0; i < 36 && !screen.queryByLabelText('チームのはげまし'); i++) {
    const q = document.querySelector('.en')?.textContent ?? ''
    const bs = [...document.querySelectorAll<HTMLButtonElement>('.choices .choice')]
    if (bs.length === 0) break
    const w = WORDS.find((x) => x.en === q)
    fireEvent.click(w ? bs.find((b) => b.textContent !== w.ja)! : bs[bs.length - 1])
    const next = screen.queryAllByRole('button').find((b) => /次へ|結果/.test(b.textContent ?? ''))
    if (next) fireEvent.click(next)
  }
  const cheer = screen.getByLabelText('チームのはげまし')
  expect(cheer.children).toHaveLength(3)
  expect(cheer.textContent).toContain('文法を見直せば勝てるよ！')
  expect(cheer.querySelector('.team-grammar')!.getAttribute('title')).toContain('コトバン')
})

it('勝ったときのひとことは、いちばん正解したなかま（同じなら単語から）', () => {
  expect(teamMvp({ word: 1, grammar: 3, reading: 2 })).toBe('grammar')
  expect(teamMvp({ word: 2, grammar: 2, reading: 2 })).toBe('word')
  expect(teamMvp({ word: 0, grammar: 1, reading: 4 })).toBe('reading')
  for (const l of Object.values(TEAM_WIN_LINES)) expect(l.en.length).toBeLessThan(30)
})

it('なかまのレベルが上がると攻撃力も上がる（2レベルごとに+1、最大+10）', async () => {
  const { levelAttack } = await import('./boss')
  expect(levelAttack(1)).toBe(0)
  expect(levelAttack(4)).toBe(2)
  expect(levelAttack(9)).toBe(4)
  expect(levelAttack(40)).toBe(10)
})

it('チームバトルでは、答えたなかまのレベルの攻撃力のぶんダメージがふえる', () => {
  const hpAfter = (level: number) => {
    const t: BossTeam = { word: { ...team.word, level }, grammar: { ...team.grammar, level }, reading: { ...team.reading, level } }
    const r = render(
      <BossTeamContext.Provider value={t}>
        <Boss level="中1" words={WORDS.filter((w) => w.level === '中1')} onAnswer={() => {}} onWin={() => {}} onExit={() => {}} />
      </BossTeamContext.Provider>,
    )
    const en = document.querySelector('.en')!.textContent!
    const w = WORDS.find((x) => x.en === en)!
    fireEvent.click([...document.querySelectorAll<HTMLButtonElement>('.choices .choice')].find((b) => b.textContent === w.ja)!)
    const hp = Number(screen.getByRole('progressbar', { name: 'ボスのHP' }).getAttribute('aria-valuenow'))
    r.unmount()
    return hp
  }
  expect(hpAfter(1) - hpAfter(20)).toBe(10)
  render(
    <BossTeamContext.Provider value={{ ...team, word: { ...team.word, level: 6 } }}>
      <Boss level="中1" words={WORDS.filter((w) => w.level === '中1')} onAnswer={() => {}} onWin={() => {}} onExit={() => {}} />
    </BossTeamContext.Provider>,
  )
  expect(screen.getByTitle('攻撃力 +3').textContent).toContain('⚔+3')
})

it('ボスの文法問題は、ボスの単語帳のレベルの単元から（設定の学年ではなく）', async () => {
  const { grammarForLevel } = await import('./boss')
  const { gradeOf } = await import('./grammar')
  localStorage.setItem('eitan:grade', 'adult')
  expect(grammarForLevel('中1').every((u) => gradeOf(u.id) === '中1')).toBe(true)
  expect(grammarForLevel('数').every((u) => gradeOf(u.id) === '中1')).toBe(true)
  expect(grammarForLevel('中2').every((u) => ['中1', '中2'].includes(gradeOf(u.id)))).toBe(true)
  expect(grammarForLevel('高校基礎').some((u) => gradeOf(u.id) === '高校')).toBe(true)
  const words = WORDS.filter((w) => w.level === '中1')
  const qs = teamBossQuestions(words)
  const ja = new Set(words.map((w) => w.ja))
  for (const q of qs.filter((x) => x.team === 'word')) expect(q.choices.every((c) => ja.has(c))).toBe(true)
  localStorage.removeItem('eitan:grade')
})

it('チームバトル：まちがえると番のなかまがこうげきを受けて体力が減り、0でダウンするとハートが減る', () => {
  render(
    <BossTeamContext.Provider value={team}>
      <Boss level="中1" words={WORDS.filter((w) => w.level === '中1')} onAnswer={() => {}} onWin={() => {}} onExit={() => {}} />
    </BossTeamContext.Provider>,
  )
  const hpOf = (name: string) => Number(screen.getByRole('progressbar', { name: `${name}の体力` }).getAttribute('aria-valuenow'))
  expect(hpOf('モチまる')).toBe(40)
  const wrong = () => {
    const en = document.querySelector('.en')!.textContent!
    const w = WORDS.find((x) => x.en === en)
    const bs = [...document.querySelectorAll<HTMLButtonElement>('.choices .choice')]
    fireEvent.click(bs.find((b) => b.textContent !== (w?.ja ?? '')) ?? bs[0])
  }
  wrong()
  expect(hpOf('モチまる')).toBe(20)
  expect(screen.getByText(/のこうげき！ 🔤単語 -20/)).toBeInTheDocument()
  expect(screen.getByLabelText('のこりハート 3')).toBeInTheDocument()
})

it('ボスの反撃は4問ごと、番の次のなかまへ。体力0のなかまはとばす', async () => {
  const { counterTarget, hitMember, isCounterTurn, fullTeamHp, reviveOne, MEMBER_HP } = await import('./boss')
  expect([0, 1, 2, 3, 7].map(isCounterTurn)).toEqual([false, false, false, true, true])
  const hp = fullTeamHp()
  expect(counterTarget(hp, 'word')).toBe('grammar')
  expect(counterTarget({ ...hp, grammar: 0 }, 'word')).toBe('reading')
  const r = hitMember({ ...hp, word: 15 }, 'word', 20)
  expect(r).toEqual({ hp: { ...hp, word: 0 }, ko: true })
  expect(reviveOne(r.hp).word).toBe(MEMBER_HP / 2)
})
