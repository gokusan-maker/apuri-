// デイリーミッション：日付ごとに3つ選ばれ、達成するとボーナスXP。
export type Counter = 'answers' | 'correct' | 'cardGood' | 'ear' | 'timeAttack' | 'stageClear'

export type Mission = { id: string; text: string; counter: Counter; target: number }

export const MISSION_POOL: Mission[] = [
  { id: 'answers-10', text: '10問に答える', counter: 'answers', target: 10 },
  { id: 'answers-30', text: '30問に答える', counter: 'answers', target: 30 },
  { id: 'correct-10', text: '10問正解する', counter: 'correct', target: 10 },
  { id: 'card-5', text: 'カードで5語「覚えた」', counter: 'cardGood', target: 5 },
  { id: 'ear-3', text: 'リスニングかスペルで3問正解', counter: 'ear', target: 3 },
  { id: 'ear-5', text: '聞き取り系のクイズ（リスニング・数の聞き取りなど）で5問正解', counter: 'ear', target: 5 },
  { id: 'time-1', text: 'タイムアタックを1回遊ぶ', counter: 'timeAttack', target: 1 },
  { id: 'stage-1', text: 'ステージを1つクリア', counter: 'stageClear', target: 1 },
]

export const MISSION_XP = 30

export type MissionState = {
  day: string
  counts: Partial<Record<Counter, number>>
  claimed: string[]
}

// 日付から決まる3つ（同じ日は何度開いても同じ）
export function missionsFor(day: string): Mission[] {
  let h = 0
  for (const c of day) h = (h * 31 + c.charCodeAt(0)) >>> 0
  const pool = [...MISSION_POOL]
  const out: Mission[] = []
  while (out.length < 3) {
    h = (h * 1103515245 + 12345) >>> 0
    out.push(pool.splice(h % pool.length, 1)[0])
  }
  return out
}

export function fresh(day: string): MissionState {
  return { day, counts: {}, claimed: [] }
}

export function bump(s: MissionState, today: string, counter: Counter, n = 1): MissionState {
  const base = s.day === today ? s : fresh(today)
  return { ...base, counts: { ...base.counts, [counter]: (base.counts[counter] ?? 0) + n } }
}

// 達成したのにまだ受け取っていないミッション
export function completedUnclaimed(s: MissionState, today: string): Mission[] {
  if (s.day !== today) return []
  return missionsFor(today).filter((m) => (s.counts[m.counter] ?? 0) >= m.target && !s.claimed.includes(m.id))
}

const STORAGE_KEY = 'eitan:missions'

export function loadMissions(today: string): MissionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const v = raw ? (JSON.parse(raw) as MissionState) : null
    if (v && v.day === today && v.counts && typeof v.counts === 'object' && Array.isArray(v.claimed)) return v
  } catch {
    // 壊れていたら今日の分を新しく
  }
  return fresh(today)
}

export function saveMissions(s: MissionState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    // ストレージが使えない環境では保存をあきらめる
  }
}
