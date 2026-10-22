import { expect, it } from 'vitest'
import { loadTrio, saveTrio, trioSpecies } from './gacha'

it('トリオボーナス：同じキャラが3体以上いるキャラを数える', () => {
  expect(trioSpecies([{ species: 'mochi' }, {}, { species: 'mochi' }, { species: 'draco' }])).toEqual(['mochi'])
  expect(trioSpecies([{ species: 'draco' }, { species: 'draco' }])).toEqual([])
  localStorage.clear()
  expect(loadTrio()).toEqual([])
  saveTrio(['mochi'])
  expect(loadTrio()).toEqual(['mochi'])
})
