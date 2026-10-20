// CHANGELOG.md の「- YYYY-MM-DD: 内容」から新しい順に取り出す
export type Change = { date: string; text: string }

export function recentChanges(md: string, n = 10): Change[] {
  const out: Change[] = []
  for (const line of md.split('\n')) {
    const m = /^- (\d{4}-\d{2}-\d{2}): (.+)$/.exec(line.trim())
    if (m) out.push({ date: m[1], text: m[2] })
  }
  return out.reverse().slice(0, n)
}
