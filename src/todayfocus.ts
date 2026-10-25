// 今日の課題（単語・文法・読解）の一覧と表示名
export type TodayTask = 'word' | 'grammar' | 'reading'

export const TODAY_TASK_INFO: { id: TodayTask; icon: string; name: string }[] = [
  { id: 'word', icon: '🔤', name: '単語' },
  { id: 'grammar', icon: '📐', name: '文法' },
  { id: 'reading', icon: '📖', name: '読解' },
]
export const TODAY_TASKS: TodayTask[] = TODAY_TASK_INFO.map((t) => t.id)
export const TODAY_TASK_LABEL = Object.fromEntries(TODAY_TASK_INFO.map((t) => [t.id, `${t.icon}${t.name}`])) as Record<TodayTask, string>

// 終えた課題のつぎ：単語→文法→読解の順で、まだの課題（最後までいったら最初にもどる）
export function nextTodayTask(cur: TodayTask, done: Record<TodayTask, boolean>): TodayTask | undefined {
  const i = TODAY_TASKS.indexOf(cur)
  return [...TODAY_TASKS.slice(i + 1), ...TODAY_TASKS.slice(0, i)].find((t) => !done[t])
}
export const AUTO_NEXT_SEC = 3 // 自動で次の課題へ行くまでの秒数
