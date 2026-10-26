import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { dictTokens, GRAMMAR } from './grammar'
import { GrammarDict } from './GrammarDictView'

// 語のボタンを順に押す
function tapWords(words: string[]) {
  for (const w of words) fireEvent.click(screen.getAllByRole('button', { name: `語 ${w}` }).find((x) => !(x as HTMLButtonElement).disabled)!)
}

it('聞いた英文を語のボタンでつくって答えあわせする（打ちこみなし）', async () => {
  const speech = await import('./speech')
  const sp = vi.spyOn(speech, 'speak').mockImplementation(() => {})
  const u = GRAMMAR[0]
  render(<GrammarDict unit={u} onBack={() => {}} />)
  fireEvent.click(screen.getByText('🔊 聞く'))
  expect(sp).toHaveBeenCalledWith(u.examples[0].en)
  expect(document.querySelector('.grammar-dict input')).toBeNull()
  tapWords(dictTokens(u.examples[0].en))
  fireEvent.click(screen.getByText('答えあわせ'))
  expect(screen.getByText(/⭕ 正解！/)).toBeInTheDocument()
  fireEvent.click(screen.getByText('次へ'))
  for (let i = 1; i < u.examples.length; i++) {
    tapWords(dictTokens(u.examples[i].en).slice(0, 1)) // 1語だけでは不正解
    fireEvent.click(screen.getByText('答えあわせ'))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText(`1 / ${u.examples.length} 文正解`)).toBeInTheDocument()
  expect(screen.getByLabelText(/^星 /)).toBeInTheDocument() // 結果に星
  sp.mockRestore()
})

it('ディクテーションも続けて正解すると連続正解のコンボが出る', async () => {
  localStorage.clear()
  const speech = await import('./speech')
  const sp = vi.spyOn(speech, 'speak').mockImplementation(() => {})
  const u = GRAMMAR.find((x) => x.examples.length >= 2)!
  render(<GrammarDict unit={u} onBack={() => {}} />)
  tapWords(dictTokens(u.examples[0].en))
  fireEvent.click(screen.getByText('答えあわせ'))
  fireEvent.click(screen.getByText('次へ'))
  tapWords(dictTokens(u.examples[1].en))
  fireEvent.click(screen.getByText('答えあわせ'))
  expect(screen.getByText('🔥 2連続正解！')).toBeInTheDocument()
  for (let i = 2; i < u.examples.length; i++) {
    fireEvent.click(screen.getByText('次へ'))
    tapWords(dictTokens(u.examples[i].en).slice(0, 1))
    fireEvent.click(screen.getByText('答えあわせ'))
  }
  fireEvent.click(screen.getByText('次へ'))
  expect(screen.getByText(/🔥 最高 2連続正解/).textContent).toContain('自己ベスト更新') // 結果に最高の連続正解（はじめてなので自己ベスト）
  sp.mockRestore()
})
