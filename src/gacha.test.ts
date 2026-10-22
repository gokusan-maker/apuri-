import { expect, it } from 'vitest'
import { addStats, bonusOf, canDraw, loadGachaStats, saveGachaStats, drawEgg, gachaOmen, gachaPrice, GACHA_PRICE, GOLDEN_PRICE, isDuplicate, loadStep, nextStep, PARTY_MAX, saveStep, stepLeft } from './gacha'
import { KINDS, rollKind, sanitizeMonster, withKind, FORMS } from './monster'

it('レア度の出かた：ノーマル60%・レア30%・スーパーレア9%・ウルトラレア1%', () => {
  const n = 10000
  const count: Record<string, number> = {}
  for (let i = 0; i < n; i++) {
    const k = rollKind(i / n)
    count[k.rarity] = (count[k.rarity] ?? 0) + 1
  }
  expect(count).toEqual({ N: 6000, R: 3000, SR: 900, UR: 100 })
  expect(new Set(Array.from({ length: 300 }, (_, i) => rollKind(0.6 + i / 1000).id))).toEqual(new Set(['sakura', 'umi', 'yoru']))
})

it('コインでタマゴを引くと仲間がふえる。コイン不足や満員では引けない', () => {
  const party = { active: 0, members: [{ xp: 100 }] }
  const r = drawEgg({ coins: GACHA_PRICE + 5, owned: [] }, party, 0.995)!
  expect(r.wallet.coins).toBe(5)
  expect(r.wallet.pity).toBe(0)
  expect(r.party.members).toHaveLength(2)
  expect(r.party.members[1]).toEqual({ xp: 0, kind: 'niji' })
  expect(r.party.active).toBe(0)
  expect(drawEgg({ coins: 10, owned: [] }, party, 0.5)).toBeNull()
  const full = { active: 0, members: Array.from({ length: PARTY_MAX }, () => ({ xp: 0 })) }
  expect(canDraw({ coins: 999, owned: [] }, full)).toBe(false)
  expect(drawEgg({ coins: GACHA_PRICE, owned: [] }, party, 0.1)!.party.members[1]).toEqual({ xp: 0 })
})

it('色ちがいは保存しても残り、知らない値は捨てる。姿の色が変わる', () => {
  expect(sanitizeMonster({ xp: 5, kind: 'kin' }).kind).toBe('kin')
  expect(sanitizeMonster({ xp: 5, kind: 'xxx' }).kind).toBeUndefined()
  expect(withKind(FORMS[2], 'umi').color).toBe(KINDS.find((k) => k.id === 'umi')!.color)
  expect(withKind(FORMS[2], undefined)).toBe(FORMS[2])
})

it('ガチャのタマゴがあっても、節目のタマゴはちゃんともらえる', async () => {
  const { addEggs } = await import('./party')
  const r = drawEgg({ coins: 100, owned: [] }, { active: 0, members: [{ xp: 100 }] }, 0.1)!
  expect(r.party.gacha).toBe(1)
  const p = addEggs(r.party, 2) // 節目を1つ達成
  expect(p.members).toHaveLength(3)
  expect(addEggs(p, 2)).toBe(p)
})

it('7日連続でもらえるチケットでもガチャを引ける（コインはへらない）', async () => {
  const { addTicket } = await import('./gacha')
  const w = addTicket({ coins: 0, owned: [] })
  expect(w.tickets).toBe(1)
  const party = { active: 0, members: [{ xp: 0 }] }
  expect(drawEgg(w, party, 0.1)).toBeNull()
  const r = drawEgg(w, party, 0.1, true)!
  expect(r.wallet).toEqual({ coins: 0, owned: [], tickets: 0, pity: 1 })
  expect(r.party.members).toHaveLength(2)
  expect(addTicket({ coins: 0, owned: [], tickets: 9 }).tickets).toBe(9)
})

it('相棒以外の仲間もおるすばんで少しずつ育つ', async () => {
  const { feedHelpers, helperXp } = await import('./party')
  expect([helperXp(0), helperXp(5), helperXp(10), helperXp(40)]).toEqual([0, 1, 1, 4])
  const p = feedHelpers({ active: 0, members: [{ xp: 100 }, { xp: 0 }, { xp: 3 }] }, 40, '2026-10-20')
  expect(p.members.map((m) => m.xp)).toEqual([100, 4, 7])
  const one = { active: 0, members: [{ xp: 1 }] }
  expect(feedHelpers(one, 40, '2026-10-20')).toBe(one)
})

it('ガチャでキャラクターの種類も決まる（合計100%）', async () => {
  const { rollSpecies, formOf } = await import('./monster')
  const count: Record<string, number> = {}
  for (let i = 0; i < 1000; i++) count[rollSpecies(i / 1000).id] = (count[rollSpecies(i / 1000).id] ?? 0) + 1
  expect(count).toEqual({ mochi: 300, fox: 160, penguin: 160, rabbit: 160, cat: 120, dragon: 100 })
  const r = drawEgg({ coins: 100, owned: [] }, { active: 0, members: [{ xp: 0 }] }, 0.1, false, 0.95)!
  expect(r.party.members[1]).toEqual({ xp: 0, species: 'dragon' })
  expect(formOf({ xp: 30, species: 'dragon' }).name).toBe('ちびドラ')
  expect(formOf({ xp: 0, species: 'fox' }).name).toBe('こがねのタマゴ')
  expect(formOf({ xp: 99999, species: 'penguin', branch: 'ear' }).name).toBe('シンワノソラペンギ')
  expect(sanitizeMonster({ xp: 1, species: 'dragon' }).species).toBe('dragon')
  expect(sanitizeMonster({ xp: 1, species: 'unicorn' }).species).toBeUndefined()
})

it('天井：スーパーレア以上が出ないまま20回目はきんいろ確定', async () => {
  const { PITY, pityLeft } = await import('./gacha')
  const party = { active: 0, members: [{ xp: 0 }] }
  const r1 = drawEgg({ coins: 100, owned: [], pity: PITY - 2 }, party, 0.1)!
  expect(r1.kind.id).toBe('normal')
  expect(r1.wallet.pity).toBe(PITY - 1)
  expect(pityLeft(r1.wallet)).toBe(1)
  const r2 = drawEgg(r1.wallet, party, 0.1)!
  expect(r2.kind.id).toBe('kin')
  expect(r2.wallet.pity).toBe(0)
})

it('週末はドラコが出やすい（10%→20%、そのぶんモチが減る）', async () => {
  const { rollSpecies, SPECIES, speciesRate } = await import('./monster')
  const total = SPECIES.reduce((a, sp) => a + speciesRate(sp, true), 0)
  expect(total).toBeCloseTo(1)
  let dragons = 0
  for (let i = 0; i < 1000; i++) if (rollSpecies(i / 1000, true).id === 'dragon') dragons++
  expect(dragons).toBe(200)
})

it('最近のガチャの結果は新しい順に10回まで残る', async () => {
  const { loadGachaLog, pushGachaLog } = await import('./gacha')
  localStorage.clear()
  let log = loadGachaLog()
  for (let i = 0; i < 12; i++) log = pushGachaLog(log, { day: `2026-10-${10 + i}`, kind: 'normal', species: 'mochi' })
  expect(log).toHaveLength(10)
  expect(log[0].day).toBe('2026-10-21')
  expect(loadGachaLog()).toEqual(log)
})

it('確定演出のひとことはレア度ごとにちがい、ふつうは出ない', () => {
  expect(gachaOmen('N')).toBeNull()
  const lines = (['R', 'SR', 'UR'] as const).map(gachaOmen)
  expect(new Set(lines).size).toBe(3)
  expect(gachaOmen('UR')).toMatch(/虹色/)
})

it('同じキャラ・同じ色の子がいればかぶり（キャラや色がないものはモチ・ふつう）', () => {
  const members = [{ xp: 0 }, { xp: 0, species: 'fox', kind: 'kin' }] as never
  expect(isDuplicate(members, 'mochi', 'normal')).toBe(true)
  expect(isDuplicate(members, 'fox', 'kin')).toBe(true)
  expect(isDuplicate(members, 'fox', 'normal')).toBe(false)
  expect(isDuplicate(members, 'cat', 'kin')).toBe(false)
})

it('日替わりピックアップは日付で決まり、そのキャラが出やすくなる（合計は100%のまま）', async () => {
  const { pickupOf, rollSpecies, SPECIES, speciesRate, PICKUP_UP } = await import('./monster')
  const p = pickupOf('2026-10-21')
  expect(p.id).not.toBe('mochi')
  expect(pickupOf('2026-10-21')).toBe(p)
  expect(new Set(['2026-10-20', '2026-10-21', '2026-10-22', '2026-10-23', '2026-10-24'].map((d) => pickupOf(d).id)).size).toBeGreaterThan(1)
  for (const up of [false, true]) {
    const total = SPECIES.reduce((a, sp) => a + speciesRate(sp, up, p.id), 0)
    expect(total).toBeCloseTo(1)
  }
  expect(speciesRate(p, false, p.id)).toBeCloseTo(p.rate + PICKUP_UP)
  const count = (pick?: string) => Array.from({ length: 1000 }, (_, i) => rollSpecies(i / 1000, false, pick)).filter((sp) => sp.id === p.id).length
  expect(count(p.id)).toBeGreaterThan(count())
})

it('ステップアップ：その日3回目はレア以上確定', () => {
  localStorage.clear()
  const d = '2026-10-21'
  let s = loadStep()
  expect(stepLeft(s, d)).toBe(2)
  s = nextStep(s, d)
  expect(stepLeft(s, d)).toBe(1)
  s = nextStep(s, d)
  expect(stepLeft(s, d)).toBe(0) // 次が確定
  saveStep(s)
  expect(stepLeft(loadStep(), '2026-10-22')).toBe(2) // 日がかわるとリセット
  const w = { coins: 100, owned: [] }
  const p = { active: 0, members: [{ xp: 0 }] }
  expect(drawEgg(w, p, 0, false, 0.5, false, undefined, false)!.kind.rarity).toBe('N')
  for (const r of [0, 0.3, 0.59]) expect(drawEgg(w, p, r, false, 0.5, false, undefined, true)!.kind.rarity).toBe('R')
})

it('ゴールデンタイム（19時台）はガチャが安い', () => {
  expect(gachaPrice(18)).toBe(GACHA_PRICE)
  expect(gachaPrice(19)).toBe(GOLDEN_PRICE)
  const w = { coins: GOLDEN_PRICE, owned: [] }
  const p = { active: 0, members: [{ xp: 0 }] }
  expect(canDraw(w, p)).toBe(false)
  expect(canDraw(w, p, false, GOLDEN_PRICE)).toBe(true)
  expect(drawEgg(w, p, 0.5, false, 0.5, false, undefined, false, GOLDEN_PRICE)!.wallet.coins).toBe(0)
})

it('おまけカプセルは5回に1回くらい、コインかおやつ', () => {
  expect(bonusOf(0)).toMatchObject({ kind: 'coins', amount: 10 })
  expect(bonusOf(0.15)).toMatchObject({ kind: 'xp', amount: 20 })
  expect(bonusOf(0.2)).toBeNull()
})

it('ガチャの記録はレア度ごとに数える', () => {
  localStorage.clear()
  const s = addStats(loadGachaStats(), ['N', 'R', 'R', 'UR'])
  expect(s).toEqual({ total: 4, N: 1, R: 2, SR: 0, UR: 1 })
  saveGachaStats(s)
  expect(loadGachaStats()).toEqual(s)
})

it('通算の回数が7の倍数ならラッキーナンバー', async () => {
  const { isLuckyPull, LUCKY_COINS } = await import('./gacha')
  expect(LUCKY_COINS).toBe(7)
  expect(isLuckyPull(0)).toBe(false)
  expect(isLuckyPull(6)).toBe(false)
  expect(isLuckyPull(7)).toBe(true)
  expect(isLuckyPull(14)).toBe(true)
  expect(isLuckyPull(15)).toBe(false)
})

it('コンプリート率はパーセントの切り捨て', async () => {
  const { completionPct } = await import('./gacha')
  expect(completionPct(0, 60)).toBe(0)
  expect(completionPct(1, 3)).toBe(33)
  expect(completionPct(60, 60)).toBe(100)
  expect(completionPct(70, 60)).toBe(100)
  expect(completionPct(1, 0)).toBe(0)
})

it('スロットは4%でそろい、それ以外はそろわない', async () => {
  const { slotOf, SLOT_RATE } = await import('./gacha')
  expect(slotOf(0).win).toBe(true)
  expect(new Set(slotOf(0.01).reels).size).toBe(1)
  for (let r = SLOT_RATE; r < 1; r += 0.013) {
    const s = slotOf(r)
    expect(s.win).toBe(false)
    expect(s.reels[0]).not.toBe(s.reels[2])
  }
})

it('季節ガチャ：10月はさくら色のかわりにかぼちゃ色が出る', async () => {
  const { drawEgg, seasonalKindOf } = await import('./gacha')
  expect(seasonalKindOf('2026-10-20')).toBe('pumpkin')
  expect(seasonalKindOf('2026-12-24')).toBe('snow')
  expect(seasonalKindOf('2026-11-01')).toBeUndefined()
  const w = { coins: 100, owned: [] }
  const p = { members: [{ xp: 0 }], active: 0 }
  expect(drawEgg(w, p, 0.61, false, 0.5, false, undefined, false, 50, 'pumpkin')!.kind.id).toBe('pumpkin')
  expect(drawEgg(w, p, 0.61, false, 0.5)!.kind.id).toBe('sakura')
  expect(drawEgg(w, p, 0.75, false, 0.5, false, undefined, false, 50, 'pumpkin')!.kind.id).toBe('umi')
})

it('ガチャの結果をシェア用の文にする', async () => {
  const { gachaShareText } = await import('./gacha')
  expect(gachaShareText([{ kindName: 'きんいろ', normal: false, speciesName: 'ドラコ', rarity: 'スーパーレア' }])).toBe('イングリッシュモンスターのガチャで きんいろのドラコ（スーパーレア） が出た！')
  expect(gachaShareText([{ kindName: 'ふつう', normal: true, speciesName: 'モチ', rarity: 'ノーマル' }, { kindName: 'うみ色', normal: false, speciesName: 'モチ', rarity: 'レア' }])).toContain('モチ（ノーマル）・うみ色のモチ（レア）')
})

it('ポイント交換のタマゴはスーパーレア以上', async () => {
  const { srEgg, loadGachaPoints, saveGachaPoints } = await import('./gacha')
  const p = { members: [{ xp: 0 }], active: 0 }
  expect(srEgg(p, 0, 0.5)!.kind.id).toBe('kin')
  expect(srEgg(p, 0.9, 0.5)!.kind.id).toBe('niji')
  expect(srEgg({ members: Array.from({ length: 12 }, () => ({ xp: 0 })), active: 0 }, 0, 0)).toBeNull()
  localStorage.clear()
  expect(loadGachaPoints()).toBe(0)
  saveGachaPoints(21)
  expect(loadGachaPoints()).toBe(21)
})

it('はじめの2つがそろうとリーチ', async () => {
  const { isReach, slotOf } = await import('./gacha')
  expect(isReach({ reels: ['🍒', '🍒', '⭐'], win: false })).toBe(true)
  expect(isReach({ reels: ['🍒', '🍒', '🍒'], win: true })).toBe(false)
  expect(isReach({ reels: ['🍒', '🔔', '⭐'], win: false })).toBe(false)
  let reach = 0
  for (let r = 0.04; r < 1; r += 0.001) if (isReach(slotOf(r))) reach++
  expect(reach).toBeGreaterThan(0)
})

it('カプセルの色は5色から選べて、知らない色はあか', async () => {
  const { capsuleColorOf, CAPSULE_COLORS, loadCapsule, saveCapsule } = await import('./gacha')
  expect(CAPSULE_COLORS).toHaveLength(5)
  expect(capsuleColorOf('nope')).toBe(CAPSULE_COLORS[0].color)
  localStorage.clear()
  expect(loadCapsule()).toBe('red')
  saveCapsule('pink')
  expect(loadCapsule()).toBe('pink')
  localStorage.setItem('eitan:capsule-color', 'gold')
  expect(loadCapsule()).toBe('red')
})

it('今日のおすすめ色はレアの3色のどれかで、出やすくなる', async () => {
  const { dailyColor, drawEgg } = await import('./gacha')
  expect(['sakura', 'umi', 'yoru']).toContain(dailyColor('2026-10-20'))
  const w = { coins: 1000, owned: [] }
  const p = { members: [{ xp: 0 }], active: 0 }
  let boosted = 0
  for (let r = 0.6; r < 0.9; r += 0.003) if (drawEgg(w, p, r, false, 0.5, false, undefined, false, 50, undefined, 'umi')!.kind.id === 'umi') boosted++
  let normal = 0
  for (let r = 0.6; r < 0.9; r += 0.003) if (drawEgg(w, p, r, false, 0.5)!.kind.id === 'umi') normal++
  expect(boosted).toBeGreaterThan(normal)
})

it('1つのキャラクターでふつうの6色がそろうと色コンプ', async () => {
  const { completedSpecies } = await import('./gacha')
  const six = ['normal', 'sakura', 'umi', 'yoru', 'kin', 'niji']
  expect(completedSpecies(six.map((k) => ({ species: 'fox', kind: k === 'normal' ? undefined : k })))).toEqual(['fox'])
  expect(completedSpecies(six.slice(1).map((k) => ({ species: 'fox', kind: k })))).toEqual([])
  expect(completedSpecies([...six.map((k) => ({ kind: k === 'normal' ? undefined : k }))])).toEqual(['mochi'])
})
