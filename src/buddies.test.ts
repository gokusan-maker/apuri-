import { describe, expect, it } from 'vitest'
import { BUDDY_FORMS, buddyForm, buddyLevel, feedBuddy, loadBuddies, saveBuddies } from './buddies'

describe('項目ごとのなかま（文法のペット・長文の竜）', () => {
  it('はじめはタマゴ。XPがたまると文法はペット、長文は竜にかえる', () => {
    expect(buddyForm('grammar', { xp: 0 }).icon).toBe('🥚')
    let b = { grammar: { xp: 0 }, reading: { xp: 0 } }
    const r = feedBuddy(b, 'grammar', 1000)
    b = r.buddies
    expect(r.levelUp).toBe(true)
    expect(r.evolved).not.toBeNull()
    expect(BUDDY_FORMS.grammar.slice(1).map((f) => f.icon)).toContain(buddyForm('grammar', b.grammar).icon)
    expect(b.reading.xp).toBe(0)
    const r2 = feedBuddy(b, 'reading', 30)
    expect(buddyLevel(r2.buddies.reading).level).toBeGreaterThanOrEqual(2)
    expect(buddyForm('reading', r2.buddies.reading).name).toBe('ちびドラ')
  })
  it('同じ姿のままならレベルが上がっても evolved は null', () => {
    const b = { grammar: { xp: 0 }, reading: { xp: 0 } }
    expect(feedBuddy(b, 'reading', 1).evolved).toBeNull()
  })
  it('保存して読みこめる。こわれたデータは0から', () => {
    localStorage.clear()
    expect(loadBuddies()).toEqual({ grammar: { xp: 0 }, reading: { xp: 0 } })
    saveBuddies({ grammar: { xp: 50, name: 'ポチ' }, reading: { xp: 3 } })
    expect(loadBuddies()).toEqual({ grammar: { xp: 50, name: 'ポチ' }, reading: { xp: 3 } })
    localStorage.setItem('eitan:buddies', '{bad')
    expect(loadBuddies()).toEqual({ grammar: { xp: 0 }, reading: { xp: 0 } })
  })
})

describe('属性のタマゴ', () => {
  it('まだ仲間でない文法・読解のなかまから1体が仲間になり、全員そろうと出ない', async () => {
    const { hatchAttrEgg, lockedSpecies, isUnlocked, BUDDY_SPECIES } = await import('./buddies')
    const b = { grammar: { xp: 0 }, reading: { xp: 0 } }
    let box = { grammar: {}, reading: {} }
    expect(lockedSpecies(b, box)).toHaveLength(4)
    const r = hatchAttrEgg(b, box, 0)!
    expect(r.track).toBe('grammar')
    expect(isUnlocked('grammar', BUDDY_SPECIES.grammar[1], b, r.box)).toBe(true)
    box = r.box
    for (let i = 0; i < 3; i++) box = hatchAttrEgg(b, box, 0)!.box
    expect(lockedSpecies(b, box)).toHaveLength(0)
    expect(hatchAttrEgg(b, box, 0)).toBeNull()
  })
})

describe('チームレベル', () => {
  it('3体のレベルの合計で称号がかわる', async () => {
    const { teamOf } = await import('./buddies')
    const t = teamOf(1, { grammar: { xp: 0 }, reading: { xp: 0 } })
    expect(t).toEqual({ level: 3, title: 'かけだしチーム', next: 7 })
    expect(teamOf(8, { grammar: { xp: 0 }, reading: { xp: 0 } }).title).toBe('なかよしチーム')
    expect(teamOf(200, { grammar: { xp: 0 }, reading: { xp: 0 } }).next).toBeNull()
  })
})
