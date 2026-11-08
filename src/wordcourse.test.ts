import { expect, it } from 'vitest'
import { COURSES, courseReady, courseWords, legacyCourse, loadCourse } from './wordcourse'
import { levelOf, WORDS } from './words'

it('単語のレベル：中1〜高3・私学〜東大・TOEIC・TOEFL/IELTS・ネイティブ', () => {
  expect(COURSES.map((c) => c.label)).toEqual(['中1', '中2', '中3', '高1', '高2', '高3', '私学', '私学難関', '国公立', '旧帝大', '京大', '東大', 'TOEIC', 'TOEFL・IELTS', 'ネイティブ'])
  for (const c of COURSES) expect(courseReady(c), c.id).toBe(true)
})

it('レベルの単語は重ならず（TOEIC・TOEFL はほかと重なってよい）、高いレベルほどむずかしい語', () => {
  const ladder = COURSES.filter((c) => c.id !== 'TOEIC' && c.id !== 'TOEFL・IELTS')
  const ids = ladder.flatMap((c) => courseWords(c.id).map((w) => w.id))
  expect(new Set(ids).size).toBe(ids.length)
  // 中学のレベルにはむずかしい単語帳（英検準1級・1級）の語が入らない
  for (const id of ['中1', '中2', '中3'] as const) expect(courseWords(id).some((w) => levelOf(w) === '英検1級' || levelOf(w) === '英検準1級')).toBe(false)
  // 東大は英検1級・準1級の語が中心、3000語のように中学の語にもどらない
  expect(courseWords('東大').filter((w) => levelOf(w) === '英検1級' || levelOf(w) === '英検準1級').length).toBeGreaterThan(courseWords('東大').length * 0.8)
  expect(courseWords('高3').some((w) => levelOf(w) === '中1')).toBe(false)
  expect(courseWords('中1').some((w) => w.en === 'have')).toBe(true)
  // どの単語もどこかのレベルで学べる（レベルの見直しで移した語も消えない）
  const every = new Set([...ids, ...courseWords('TOEIC').map((w) => w.id), ...courseWords('TOEFL・IELTS').map((w) => w.id)])
  expect(WORDS.filter((w) => !every.has(w.id))).toEqual([])
})

it('まえの単語コース（英検・3000語など）からも、新しいレベルにうつる', () => {
  localStorage.clear()
  expect(legacyCourse(['中1', '中2', '中3', '高校基礎', '熟語'])).toBe('高1')
  expect(loadCourse(['英検1級'])).toBe('東大')
  expect(loadCourse([])).toBe('中1')
})

it('大学入試レベルの単語を増やした分も、そのレベルに入る', () => {
  expect(courseWords('旧帝大').some((w) => w.en === 'albeit')).toBe(true)
  expect(courseWords('私学').some((w) => w.en === 'convey')).toBe(true)
  expect(courseWords('中3').some((w) => w.en === 'paradox')).toBe(false)
})

it('単語のレベルの見直し：CEFR で下のレベルの語は、高いレベル（京大・国公立・TOEFL/IELTS）に入れない', () => {
  const ens = (id: Parameters<typeof courseWords>[0]) => new Set(courseWords(id).map((w) => w.en.toLowerCase()))
  const kyodai = ens('京大')
  for (const e of ['drought', 'sensible', 'dialect', 'immigrant', 'diligent', 'notorious']) expect(kyodai.has(e)).toBe(false)
  const toefl = ens('TOEFL・IELTS')
  for (const e of ['dandelion', 'eyebrow', 'eyelash', 'throat', 'waist', 'pirate']) expect(toefl.has(e)).toBe(false)
  const kokko = ens('国公立')
  for (const e of ['generous', 'tragedy', 'embarrass', 'symptom']) expect(kokko.has(e)).toBe(false)
  // 移した語は、下のレベルで学べる
  expect(ens('私学').has('drought')).toBe(true)
  expect(ens('高3').has('generous')).toBe(true)
  expect(ens('高3').has('fortune')).toBe(true)
})

it('単語のレベルの見直し②：上のレベルにやさしすぎる語を入れない（circumstance・investigate は下のレベル、acrimonious は東大）', () => {
  const lv = (e: string) => COURSES.filter((c) => c.id !== 'TOEFL・IELTS' && courseWords(c.id).some((w) => w.en.toLowerCase() === e)).map((c) => c.id)
  expect(lv('investigate')).toEqual(['高2'])
  for (const e of ['circumstance', 'cooperate']) expect(lv(e).some((x) => ['旧帝大', '京大', '東大'].includes(x))).toBe(false)
  expect(lv('acrimonious')).toEqual(['東大'])
  expect(lv('ephemeral')).toEqual(['京大'])
})
