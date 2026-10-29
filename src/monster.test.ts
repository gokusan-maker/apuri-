import { beforeEach, describe, expect, it } from 'vitest'
import { feed, FORM_DESC, FORMS, formOf, isLonely, quizXp, rename, seenForms, type MonsterState, levelInfo, levelsToNextStage, loadMonster, saveMonster, stageOf, xpToNext } from './monster'

describe('monster', () => {
  beforeEach(() => localStorage.clear())

  it('XP 0 はレベル1（タマゴ）', () => {
    expect(levelInfo(0)).toEqual({ level: 1, into: 0, need: 20 })
  })

  it('必要量に達するとレベルが上がり、余りは持ち越す', () => {
    expect(levelInfo(19).level).toBe(1)
    expect(levelInfo(20)).toEqual({ level: 2, into: 0, need: 30 })
    expect(levelInfo(55)).toEqual({ level: 3, into: 5, need: 40 })
  })

  it('必要XPはレベルが上がるほど増える', () => {
    expect(xpToNext(2)).toBeGreaterThan(xpToNext(1))
  })

  it('保存と読み込み。壊れたデータは0に戻す', () => {
    saveMonster({ xp: 42 })
    expect(loadMonster()).toEqual({ xp: 42 })
    localStorage.setItem('eitan:monster', '{"xp":-3}')
    expect(loadMonster()).toEqual({ xp: 0 })
    localStorage.setItem('eitan:monster', 'broken')
    expect(loadMonster()).toEqual({ xp: 0 })
  })
})

describe('進化と表情', () => {
  it('レベル2で誕生、5・15・30で進化する', () => {
    expect(stageOf(1).name).toBe('ふしぎなタマゴ')
    expect(stageOf(2).index).toBe(1)
    expect(stageOf(4).index).toBe(1)
    expect(stageOf(5).index).toBe(2)
    expect(stageOf(15).index).toBe(3)
    expect(stageOf(29).index).toBe(3)
    expect(stageOf(30).index).toBe(4)
    expect(stageOf(49).index).toBe(4)
    expect(stageOf(69).index).toBe(5)
    expect(stageOf(70).index).toBe(6)
    expect(stageOf(99).index).toBe(6)
  })

  it('3日以上あくと「さみしそう」。記録が無い古いデータはさみしくない', () => {
    expect(isLonely({ xp: 10 }, '2026-10-20')).toBe(false)
    expect(isLonely({ xp: 10, lastDay: '2026-10-18' }, '2026-10-20')).toBe(false)
    expect(isLonely({ xp: 10, lastDay: '2026-10-17' }, '2026-10-20')).toBe(true)
    expect(isLonely({ xp: 10, lastDay: '2026-09-30' }, '2026-10-03')).toBe(true)
  })

  it('lastDay も保存・読み込みできる', () => {
    saveMonster({ xp: 3, lastDay: '2026-10-20' })
    expect(loadMonster()).toEqual({ xp: 3, lastDay: '2026-10-20' })
  })
})

it('コンボボーナスは1コンボ+0、以降+2ずつ、最大+10', () => {
  expect(quizXp(1)).toBe(10)
  expect(quizXp(2)).toBe(12)
  expect(quizXp(6)).toBe(20)
  expect(quizXp(20)).toBe(20)
})

describe('進化の分岐と図鑑', () => {
  const xpForLevel = (lv: number) => {
    let xp = 0
    for (let l = 1; l < lv; l++) xp += xpToNext(l)
    return xp
  }

  it('Lv15 になった時点でいちばん多い学び方の系統に進化し、その後は変わらない', () => {
    let m: MonsterState = { xp: xpForLevel(15) - 10, src: { card: 100, quiz: 300 } }
    expect(formOf(m).id).toBe('mochimaru')
    m = feed(m, 10, 'card', '2026-10-20')
    expect(m.branch).toBe('quiz')
    expect(formOf(m).name).toBe('イナズマモチ')
    m = feed(m, 5000, 'card', '2026-10-21')
    expect(m.branch).toBe('quiz')
    expect(formOf(m).id).toBe('inazuma-king')
  })

  it('リスニング・スペル中心ならソラモチ', () => {
    const m = feed({ xp: xpForLevel(15) - 1, src: { ear: 500 } }, 1, 'ear', '2026-10-20')
    expect(formOf(m).id).toBe('sora')
  })

  it('図鑑には通ってきた姿が全部のる（古いデータでも）', () => {
    expect(seenForms({ xp: xpForLevel(5) })).toEqual(['egg', 'chibi', 'mochimaru'])
    const m = feed({ xp: xpForLevel(30), branch: 'card' }, 1, 'card', '2026-10-20')
    expect(m.seen).toEqual(['egg', 'chibi', 'mochimaru', 'mori', 'mori-king'])
  })

  it('保存した系統・出どころ・図鑑を読み込める', () => {
    saveMonster({ xp: 3, src: { quiz: 3 }, branch: 'quiz', seen: ['egg'] })
    expect(loadMonster()).toEqual({ xp: 3, src: { quiz: 3 }, branch: 'quiz', seen: ['egg'] })
    localStorage.setItem('eitan:monster', '{"xp":3,"branch":"magic","seen":[1,"egg"]}')
    expect(loadMonster()).toEqual({ xp: 3, seen: ['egg'] })
  })
})

describe('名前', () => {
  it('前後の空白を取り、10文字まで。空なら名前なしに戻る', () => {
    expect(rename({ xp: 1 }, '  ポチ  ')).toEqual({ xp: 1, name: 'ポチ' })
    expect(rename({ xp: 1 }, 'あいうえおかきくけこさしす').name).toBe('あいうえおかきくけこ')
    expect(rename({ xp: 1, name: 'ポチ' }, '   ')).toEqual({ xp: 1 })
  })

  it('名前も保存・読み込みされる', () => {
    saveMonster({ xp: 1, name: 'モッチー' })
    expect(loadMonster()).toEqual({ xp: 1, name: 'モッチー' })
  })
})

it('Lv50 で伝説の姿に進化し、図鑑は12種になる', () => {
  let xp = 0
  for (let l = 1; l < 50; l++) xp += xpToNext(l)
  expect(stageOf(50).index).toBe(5)
  expect(formOf({ xp, branch: 'ear' }).id).toBe('sora-legend')
  expect(formOf({ xp: xp - 1, branch: 'ear' }).id).toBe('sora-king')
  expect(seenForms({ xp, branch: 'card' })).toEqual(['egg', 'chibi', 'mochimaru', 'mori', 'mori-king', 'mori-legend'])
})

it('最初にXPをもらった日が出会った日になり、その後は変わらない', () => {
  let m = feed({ xp: 0 }, 5, 'card', '2026-10-20')
  expect(m.born).toBe('2026-10-20')
  m = feed(m, 5, 'quiz', '2026-10-25')
  expect(m.born).toBe('2026-10-20')
})

it('図鑑のすべての姿に説明文がある', () => {
  for (const f of FORMS) expect(FORM_DESC[f.id], f.id).toBeTruthy()
})

it('次の進化までのレベル', () => {
  expect(levelsToNextStage(1)).toEqual({ name: 'ちびモチ', levels: 1 })
  expect(levelsToNextStage(10)?.levels).toBe(5)
  expect(levelsToNextStage(50)?.levels).toBe(20)
  expect(levelsToNextStage(70)).toBeNull()
})

it('Lv70 で神話のすがたに進化し、説明もある', () => {
  for (const f of FORMS) expect(FORM_DESC[f.id], f.id).toBeTruthy()
  const m = feed({ xp: 0 }, 0, null, '2026-10-20')
  void m
  const myth = FORMS.filter((f) => f.stage === 6)
  expect(myth.map((f) => f.branch).sort()).toEqual(['card', 'ear', 'quiz'])
})

it('次の進化の姿とあと何レベルかがわかる', async () => {
  const { nextFormOf, FORMS } = await import('./monster')
  const egg = nextFormOf({ xp: 0 })!
  expect(egg.form.stage).toBe(1)
  expect(egg.levels).toBeGreaterThan(0)
  const quizzy = nextFormOf({ xp: 0, src: { quiz: 50 } })
  expect(quizzy).not.toBeNull()
  expect(nextFormOf({ xp: 10 ** 9 })).toBeNull()
  expect(FORMS.some((f) => f.id === egg.form.id || egg.form.id.startsWith(f.id))).toBe(true)
})

it('レベルの節目 10・50・100 を通りこしたらお祝い', async () => {
  const { milestonesBetween } = await import('./monster')
  expect(milestonesBetween(8, 9)).toEqual([])
  expect(milestonesBetween(9, 10)).toEqual([10])
  expect(milestonesBetween(9, 55)).toEqual([10, 50])
  expect(milestonesBetween(10, 12)).toEqual([])
})

describe('相棒は1レベルごとに育つ', () => {
  it('進化してからのレベルの数だけ星がふえ、少し大きくなる', async () => {
    const { growthOf, growthText, growthScale } = await import('./monster')
    expect(growthOf(5)).toBe(0) // モチまるになったばかり
    expect(growthOf(6)).toBe(1)
    expect(growthOf(8)).toBe(3)
    expect(growthText(3)).toBe('★★★')
    expect(growthText(9)).toBe('★×9')
    expect(growthText(0)).toBe('')
    expect(growthScale(2)).toBeGreaterThan(growthScale(1))
    expect(growthScale(40)).toBe(1.15)
  })
})

it('キャラクター追加㊼：キツツキのキツツキンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const w = SPECIES.find((s) => s.id === 'woodpecker')!
  expect(w.name).toBe('キツツキン')
  expect(SPECIES.filter((s) => s.egg === w.egg)).toHaveLength(1)
})

it('キャラクター追加㊽：カンガルーのカンガルンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const k = SPECIES.find((s) => s.id === 'kangaroo')!
  expect(k.name).toBe('カンガルン')
  expect(SPECIES.filter((s) => s.egg === k.egg)).toHaveLength(1)
})

it('キャラクター追加㊾：ミーアキャットのミーアンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const m = SPECIES.find((s) => s.id === 'meerkat')!
  expect(m.name).toBe('ミーアン')
  expect(SPECIES.filter((s) => s.egg === m.egg)).toHaveLength(1)
})

it('キャラクター追加㊿：レッサーパンダのレサパンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const r = SPECIES.find((s) => s.id === 'redpanda')!
  expect(r.name).toBe('レサパン')
  expect(SPECIES.filter((s) => s.egg === r.egg)).toHaveLength(1)
})

it('キャラクター追加51：ワオキツネザルのワオリンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const l = SPECIES.find((s) => s.id === 'lemur')!
  expect(l.name).toBe('ワオリン')
  expect(SPECIES.filter((s) => s.egg === l.egg)).toHaveLength(1)
})

it('キャラクター追加52：ウーパールーパーのウパリンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const a = SPECIES.find((s) => s.id === 'axolotl')!
  expect(a.name).toBe('ウパリン')
  expect(SPECIES.filter((s) => s.egg === a.egg)).toHaveLength(1)
})

it('キャラクター追加53：イッカクのイッカクンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const n = SPECIES.find((s) => s.id === 'narwhal')!
  expect(n.name).toBe('イッカクン')
  expect(SPECIES.filter((s) => s.egg === n.egg)).toHaveLength(1)
})

it('キャラクター追加54：センザンコウのセンザンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const p = SPECIES.find((s) => s.id === 'pangolin')!
  expect(p.name).toBe('センザン')
  expect(SPECIES.filter((s) => s.egg === p.egg)).toHaveLength(1)
})

it('キャラクター追加55：カピバラのカピバンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const c = SPECIES.find((s) => s.id === 'capybara')!
  expect(c.name).toBe('カピバン')
  expect(SPECIES.filter((s) => s.egg === c.egg)).toHaveLength(1)
})

it('キャラクター追加56：バクのバクリンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const t = SPECIES.find((s) => s.id === 'tapir')!
  expect(t.name).toBe('バクリン')
  expect(SPECIES.filter((s) => s.egg === t.egg)).toHaveLength(1)
})

it('キャラクター追加57：オカピのオカピンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const o = SPECIES.find((s) => s.id === 'okapi')!
  expect(o.name).toBe('オカピン')
  expect(SPECIES.filter((s) => s.egg === o.egg)).toHaveLength(1)
})

it('キャラクター追加58：クオッカのクオッカンがいて、タマゴの名前がほかとかぶらない', async () => {
  const { SPECIES } = await import('./monster')
  const q = SPECIES.find((s) => s.id === 'quokka')!
  expect(q.name).toBe('クオッカン')
  expect(SPECIES.filter((s) => s.egg === q.egg)).toHaveLength(1)
})
