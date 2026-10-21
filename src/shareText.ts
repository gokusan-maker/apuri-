// 結果をテキストで共有する（共有メニューがなければコピー）
export function quizShareText(mode: string, score: number, total: number): string {
  const rate = total ? Math.round((score / total) * 100) : 0
  return `イングリッシュモンスターで「${mode}」${total}問中${score}問正解（${rate}%）${rate === 100 ? '👑' : ''} #イングリッシュモンスター`
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

// 今週のレポート（保護者や先生に送れる短い文）
export function weekReportText(r: { answers: number; days: number; learned: number; total: number; streak: number }): string {
  return `イングリッシュモンスター 今週のレポート\n・答えた問題：${r.answers}問\n・学習した日：${r.days}日\n・定着した単語：${r.learned} / ${r.total}語\n・連続学習：${r.streak}日`
}
