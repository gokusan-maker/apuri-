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
