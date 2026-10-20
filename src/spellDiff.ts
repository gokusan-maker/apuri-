// スペルのまちがい表示：入力した文字のうち、正解と合っている文字（最長共通部分列）に印をつける
export function markSpelling(input: string, answer: string): { ch: string; ok: boolean }[] {
  const a = input.trim()
  const b = answer
  const al = a.toLowerCase()
  const bl = b.toLowerCase()
  const n = a.length
  const m = b.length
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0))
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--) dp[i][j] = al[i] === bl[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
  const out: { ch: string; ok: boolean }[] = []
  let i = 0
  let j = 0
  while (i < n) {
    if (j < m && al[i] === bl[j]) {
      out.push({ ch: a[i], ok: true })
      i++
      j++
    } else if (j < m && dp[i][j + 1] >= dp[i + 1][j]) j++
    else {
      out.push({ ch: a[i], ok: false })
      i++
    }
  }
  return out
}
