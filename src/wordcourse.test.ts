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
  expect(ids.length + courseWords('TOEIC').filter((w) => levelOf(w) === 'ビジネス').length).toBe(WORDS.length)
})

it('まえの単語コース（英検・3000語など）からも、新しいレベルにうつる', () => {
  localStorage.clear()
  expect(legacyCourse(['中1', '中2', '中3', '高校基礎', '熟語'])).toBe('高1')
  expect(loadCourse(['英検1級'])).toBe('東大')
  expect(loadCourse([])).toBe('中1')
})

it('大学入試レベルの単語を増やした分も、そのレベルに入る', () => {
  expect(courseWords('東大').some((w) => w.en === 'albeit')).toBe(true)
  expect(courseWords('私学').some((w) => w.en === 'convey')).toBe(true)
  expect(courseWords('中3').some((w) => w.en === 'paradox')).toBe(false)
})
