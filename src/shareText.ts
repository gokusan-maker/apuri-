// 結果をテキストで共有する（共有メニューがなければコピー）
export function quizShareText(mode: string, score: number, total: number): string {
  const rate = total ? Math.round((score / total) * 100) : 0
  return `えいたんで「${mode}」${total}問中${score}問正解（${rate}%）${rate === 100 ? '👑' : ''} #えいたん`
}

export async function shareText(text: string): Promise<'shared' | 'copied' | 'failed'> {
  try {
    if (navigator.share) {
      await navigator.share({ text })
      return 'shared'
    }
    await navigator.clipboard.writeText(text)
    return 'copied'
  } catch {
    return 'failed'
  }
}
