import { describe, expect, it } from 'vitest'
import { getRecognition, matchesSpeech } from './pronounce'

describe('発音練習', () => {
  it('候補のどれかに単語が含まれていれば正解（大文字・記号は無視）', () => {
    expect(matchesSpeech(['Apple.'], 'apple')).toBe(true)
    expect(matchesSpeech(['an apple'], 'apple')).toBe(true)
    expect(matchesSpeech(['happy', 'apple'], 'apple')).toBe(true)
    expect(matchesSpeech(['pineapple'], 'apple')).toBe(false)
    expect(matchesSpeech(['ice cream please'], 'ice cream')).toBe(true)
  })

  it('音声認識が無い環境では null', () => {
    expect(getRecognition({} as Window)).toBeNull()
    const Fake = function () {}
    expect(getRecognition({ webkitSpeechRecognition: Fake } as unknown as Window)).toBe(Fake)
  })
})
