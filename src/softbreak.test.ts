import { expect, it } from 'vitest'
import { splitSoft } from './softbreak'

it('カタカナの合成語を語の切れ目で分ける（切れ目がなければそのまま）', () => {
  expect(splitSoft('コレクションマスター')).toEqual(['コレクション', 'マスター'])
  expect(splitSoft('100問チャレンジ')).toEqual(['100問', 'チャレンジ'])
  expect(splitSoft('スピードスター')).toEqual(['スピード', 'スター'])
  expect(splitSoft('ほしぞらステーション')).toEqual(['ほしぞら', 'ステーション'])
  expect(splitSoft('もぐもぐおにぎりん')).toEqual(['もぐもぐ', 'おにぎりん'])
  expect(splitSoft('ぷるるんプリンセス')).toEqual(['ぷるるん', 'プリンセス'])
  expect(splitSoft('はじめの一歩')).toEqual(['はじめの一歩'])
  expect(splitSoft('マスター')).toEqual(['マスター'])
  expect(splitSoft('ボス図鑑マスター')).toEqual(['ボス図鑑', 'マスター'])
})
