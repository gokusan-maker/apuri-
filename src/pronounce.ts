// 発音練習：音声認識の結果が目標の単語と合っているか判定する。
export function normalizeSpeech(s: string): string {
  return s.toLowerCase().replace(/[^a-z' ]/g, ' ').replace(/\s+/g, ' ').trim()
}

// 候補のどれかに目標の単語（語句）がそのまま含まれていれば正解
export function matchesSpeech(alternatives: string[], target: string): boolean {
  const t = normalizeSpeech(target)
  return alternatives.some((a) => ` ${normalizeSpeech(a)} `.includes(` ${t} `))
}

type RecognitionCtor = new () => {
  lang: string
  maxAlternatives: number
  interimResults: boolean
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: ((e: { error: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  abort: () => void
}

export function getRecognition(w: Window = window): RecognitionCtor | null {
  const x = w as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor }
  return x.SpeechRecognition ?? x.webkitSpeechRecognition ?? null
}

// 例文の音読：目標の単語の8割以上が聞き取れていれば合格
export function sentenceScore(alternatives: string[], target: string): number {
  const want = normalizeSpeech(target).split(' ').filter(Boolean)
  if (want.length === 0) return 0
  let best = 0
  for (const a of alternatives) {
    const got = new Set(normalizeSpeech(a).split(' '))
    best = Math.max(best, want.filter((w) => got.has(w)).length / want.length)
  }
  return best
}

export const SENTENCE_PASS = 0.8
