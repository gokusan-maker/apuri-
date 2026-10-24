// 今日の課題（単語・文法・読解）の一覧と表示名
export type TodayTask = 'word' | 'grammar' | 'reading'

export const TODAY_TASK_INFO: { id: TodayTask; icon: string; name: string }[] = [
  { id: 'word', icon: '🔤', name: '単語' },
  { id: 'grammar', icon: '📐', name: '文法' },
  { id: 'reading', icon: '📖', name: '読解' },
]
export const TODAY_TASKS: TodayTask[] = TODAY_TASK_INFO.map((t) => t.id)
export const TODAY_TASK_LABEL = Object.fromEntries(TODAY_TASK_INFO.map((t) => [t.id, `${t.icon}${t.name}`])) as Record<TodayTask, string>
