// ホームの相棒のひとり遊び：数秒ごとに「歩く・あくび・ぴょん」をくり返す。夜（ねむい時間）は眠る
export type Idle = 'walk' | 'rest' | 'yawn' | 'hop' | 'sleep'
export const IDLE_CYCLE: Idle[] = ['walk', 'rest', 'yawn', 'walk', 'rest', 'hop']
export const IDLE_MS = 6000

export function idleAt(tick: number, sleepy: boolean): Idle {
  return sleepy ? 'sleep' : IDLE_CYCLE[tick % IDLE_CYCLE.length]
}
