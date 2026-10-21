import { expect, it } from 'vitest'
import { allPosesSeen, loadPosesSeen, poseAt, POSES, savePosesSeen, seePose } from './pose'

it('ポーズはタップごとに順番にかわり、全部見るとコンプリート', () => {
  expect(poseAt(0)).toBe(POSES[0])
  expect(poseAt(POSES.length)).toBe(POSES[0])
  let seen: string[] = []
  for (let i = 0; i < POSES.length - 1; i++) seen = seePose(seen, poseAt(i).id)
  expect(allPosesSeen(seen)).toBe(false)
  seen = seePose(seen, poseAt(POSES.length - 1).id)
  expect(seePose(seen, POSES[0].id)).toBe(seen)
  expect(allPosesSeen(seen)).toBe(true)
  localStorage.clear()
  savePosesSeen([...seen, 'nope'])
  expect(loadPosesSeen()).toEqual(seen)
})
