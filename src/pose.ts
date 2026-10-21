// 相棒のポーズ：タップするたびにポーズが変わる。全部見ると称号「ポーズマスター」
export const POSES = [
  { id: 'jump', name: 'ジャンプ', icon: '⤴️' },
  { id: 'bow', name: 'おじぎ', icon: '🙇' },
  { id: 'banzai', name: 'ばんざい', icon: '🙌' },
  { id: 'spin', name: 'くるりん', icon: '🌀' },
  { id: 'wink', name: 'ウインク', icon: '😉' },
  { id: 'peace', name: 'ピース', icon: '✌️' },
] as const
export const POSE_TITLE = 'ポーズマスター'

const KEY = 'eitan:poses-seen'
export function loadPosesSeen(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]') as unknown
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && POSES.some((p) => p.id === x)) : []
  } catch {
    return []
  }
}
export function savePosesSeen(ids: string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
// n 回目のタップのポーズ
export const poseAt = (n: number) => POSES[((n % POSES.length) + POSES.length) % POSES.length]
export const seePose = (seen: string[], id: string) => (seen.includes(id) ? seen : [...seen, id])
export const allPosesSeen = (seen: string[]) => POSES.every((p) => seen.includes(p.id))
