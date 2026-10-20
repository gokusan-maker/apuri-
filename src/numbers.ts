// 数の聞き取り：数を英語の読み方にする（0〜9999）
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

export function toEnglish(n: number): string {
  if (n < 20) return ONES[n]
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : '')
  if (n < 1000) return `${ONES[Math.floor(n / 100)]} hundred` + (n % 100 ? ` ${toEnglish(n % 100)}` : '')
  return `${toEnglish(Math.floor(n / 1000))} thousand` + (n % 1000 ? ` ${toEnglish(n % 1000)}` : '')
}

// 学習記録に使う単語id（数の単語帳にある語）
export function wordIdOf(n: number): string {
  if (n >= 1000) return 'thousand'
  if (n >= 100) return 'hundred'
  if (n < 20) return ONES[n]
  return TENS[Math.floor(n / 10)]
}

// 出題：半分は聞きまちがえやすい 13〜19 と 30〜90（thirteen / thirty など）
export function pickNumber(r: () => number = Math.random): number {
  if (r() < 0.5) {
    const teen = 13 + Math.floor(r() * 7)
    return r() < 0.5 ? teen : (teen - 10) * 10
  }
  return 21 + Math.floor(r() * 979)
}

// 入力（全角数字・カンマ・空白も許す）を数にする
export function parseAnswer(text: string): number | null {
  const t = text.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)).replace(/[,\s]/g, '')
  return /^\d+$/.test(t) ? Number(t) : null
}
