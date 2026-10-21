import { beforeEach, describe, expect, it } from 'vitest'
import { ALL_STAGES, allThreeStars, isUnlocked, loadStages, recordStars, saveStages, starsFor, stagesOf } from './stages'
import { WORDS } from './words'

describe('ステージ', () => {
  beforeEach(() => localStorage.clear())

  it('レベルごとに10語ずつ分かれ、全単語がどこかのステージに入る', () => {
    const s = stagesOf('高校基礎')
    expect(s).toHaveLength(46)
    expect(s[0].words).toHaveLength(10)
    expect(s.map((x) => x.id).slice(0, 3)).toEqual(['高校基礎-1', '高校基礎-2', '高校基礎-3'])
    expect(ALL_STAGES.flatMap((x) => x.words)).toHaveLength(WORDS.length)
  })

  it('全ステージで星3ならトロフィー', () => {
    const rec = Object.fromEntries(stagesOf('数').map((s) => [s.id, 3]))
    expect(allThreeStars('数', rec)).toBe(true)
    expect(allThreeStars('数', { ...rec, [stagesOf('数')[0].id]: 2 })).toBe(false)
    expect(allThreeStars('数', {})).toBe(false)
  })

  it('星は正答率で決まる', () => {
    expect(starsFor(10, 10)).toBe(3)
    expect(starsFor(8, 10)).toBe(2)
    expect(starsFor(6, 10)).toBe(1)
    expect(starsFor(5, 10)).toBe(0)
  })

  it('前のステージをクリアすると次が開き、星は最高記録だけ残る', () => {
    const [s1, s2] = stagesOf('中1')
    expect(isUnlocked(s1, {})).toBe(true)
    expect(isUnlocked(s2, {})).toBe(false)
    let r = recordStars({}, s1.id, 0)
    expect(isUnlocked(s2, r)).toBe(false)
    r = recordStars(r, s1.id, 2)
    expect(isUnlocked(s2, r)).toBe(true)
    expect(recordStars(r, s1.id, 1)).toBe(r)
  })

  it('保存と読み込み', () => {
    saveStages({ '中1-1': 3 })
    expect(loadStages()).toEqual({ '中1-1': 3 })
    localStorage.setItem('eitan:stages', '{"中1-1":9,"中1-2":1}')
    expect(loadStages()).toEqual({ '中1-2': 1 })
  })
})
