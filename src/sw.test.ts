import { readFileSync } from 'node:fs'
import { expect, it } from 'vitest'

// public/sw.js の staleAssets だけを取り出してためす
const src = readFileSync('public/sw.js', 'utf8')
const body = src.slice(src.indexOf('function staleAssets'), src.indexOf("self.addEventListener('install'"))
const staleAssets = new Function(`${body}; return staleAssets`)() as (keys: string[], url: string) => string[]

it('同じ名前の古い js/css だけを消す対象にする', () => {
  const keys = ['https://x/app/assets/index-AAA.js', 'https://x/app/assets/index-BBB.js', 'https://x/app/assets/index-OLD.css', 'https://x/app/index.html', 'https://x/app/icon-192.png']
  expect(staleAssets(keys, 'https://x/app/assets/index-BBB.js')).toEqual(['https://x/app/assets/index-AAA.js'])
  expect(staleAssets(keys, 'https://x/app/assets/index-NEW.css')).toEqual(['https://x/app/assets/index-OLD.css'])
  expect(staleAssets(keys, 'https://x/app/icon-192.png')).toEqual([])
})
