import { useEffect, useRef, type Dispatch, type SetStateAction } from 'react'
import { addTime, IDLE, TICK, type TimeLog } from './studyTime'

// 画面が見えていて、最後にさわってから IDLE 秒以内なら TICK 秒ずつ数える
export function useStudyTime(setLog: Dispatch<SetStateAction<TimeLog>>, today: string): void {
  const last = useRef(Date.now())
  useEffect(() => {
    const touch = () => {
      last.current = Date.now()
    }
    window.addEventListener('pointerdown', touch)
    window.addEventListener('keydown', touch)
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      if (Date.now() - last.current > IDLE * 1000) return
      setLog((l) => addTime(l, today, TICK))
    }, TICK * 1000)
    return () => {
      window.removeEventListener('pointerdown', touch)
      window.removeEventListener('keydown', touch)
      window.clearInterval(id)
    }
  }, [setLog, today])
}
