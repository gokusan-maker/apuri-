import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { LONG_PASSAGES, MARKS, shownTitle, totalOf, wordCount } from './longreading'
import { LongReading } from './LongReadingView'

it('読解を読んで記号で答え、採点すると点数と解説が出る', () => {
  localStorage.clear()
  const onAnswer = vi.fn()
  render(<LongReading onAnswer={onAnswer} />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  expect(screen.getAllByText('( A )').length).toBeGreaterThan(0)
  expect(screen.getByRole('button', { name: /のこり 14問/ })).toBeDisabled()
  for (const b of p.blanks) {
    const label = `${MARKS[b.answer]} ${b.choices[b.answer]}`
    const btn = screen.getAllByRole('button', { name: label }).find((x) => x.closest('.long-item')!.textContent!.includes(`( ${b.id} )`))!
    fireEvent.click(btn)
  }
  p.tf.forEach((t, i) => fireEvent.click(screen.getByRole('button', { name: `(${i + 1}) ${i === 0 ? '×' : t.answer ? '○' : '×'}` })))
  for (const i of p.pick2!.answers) fireEvent.click(screen.getByRole('button', { name: `${MARKS[i]} ${p.pick2!.statements[i]}` }))
  p.qa!.forEach((x) => fireEvent.click(screen.getByRole('button', { name: `${MARKS[x.answer]} ${x.choices[x.answer]}` })))
  vi.setSystemTime(Date.now() + 125000)
  fireEvent.click(screen.getByRole('button', { name: '採点する' }))
  expect(screen.getByText(/13 \/ 14 点/)).toBeInTheDocument()
  expect(screen.getByText(/レベル合格！/)).toBeInTheDocument()
  expect(screen.getByLabelText('この読解で覚えたい語句').querySelectorAll('li').length).toBeGreaterThan(0)
  expect(screen.getByText('💡 つまずき解説')).toBeInTheDocument()
  expect(screen.getAllByText(/📌 根拠の文：/)).toHaveLength(1)
  expect(document.querySelectorAll('.long-tips li')).toHaveLength(1)
  expect(screen.getByText(/かかった時間 2分05秒/)).toBeInTheDocument()
  expect(screen.getAllByText(/⭕/).length).toBe(11)
  expect(onAnswer).toHaveBeenCalledTimes(14)
  expect(screen.getByRole('button', { name: new RegExp(`次の読解へ ▶ ${LONG_PASSAGES[1].title.replace(/[?()]/g, '.')}`) })).toBeInTheDocument()
  fireEvent.click(screen.getByText('← 読解の一覧'))
  expect(screen.getByText(/最高 13点 ★★☆/)).toBeInTheDocument()
  expect(screen.getByText(/内容一致（○×）：80%（4\/5）/)).toBeInTheDocument()
  expect(screen.getByText(new RegExp(`読んだ語数：${wordCount(p)}語`))).toBeInTheDocument()
})

it('下線部の意味と並べかえに答えられる', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES.find((x) => x.id === 'no-phone-trip')!
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  expect(document.querySelector('.long-underline')!.textContent).toBe(p.underline!.phrase)
  fireEvent.click(screen.getByRole('button', { name: `${MARKS[p.underline!.answer]} ${p.underline!.choices[p.underline!.answer]}` }))
  const area = document.querySelector('.long-order-words')!
  for (const w of p.order!.answer.split(' ')) {
    const btn = [...area.querySelectorAll<HTMLButtonElement>('button')].find((b) => b.textContent === w && !b.disabled)!
    fireEvent.click(btn)
  }
  expect(screen.getByLabelText('並べた英文').textContent).toContain(p.order!.answer)
})

it('採点するとまちがえた問題の根拠の段落に色がつく', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  for (const b of p.blanks) {
    const wrong = (b.answer + 1) % 4
    const btn = screen.getAllByRole('button', { name: `${MARKS[wrong]} ${b.choices[wrong]}` }).find((x) => x.closest('.long-item')!.textContent!.includes(`( ${b.id} )`))!
    fireEvent.click(btn)
  }
  p.tf.forEach((t, i) => fireEvent.click(screen.getByRole('button', { name: `(${i + 1}) ${t.answer ? '○' : '×'}` })))
  for (const i of p.pick2!.answers) fireEvent.click(screen.getByRole('button', { name: `${MARKS[i]} ${p.pick2!.statements[i]}` }))
  p.qa!.forEach((x) => fireEvent.click(screen.getByRole('button', { name: `${MARKS[x.answer]} ${x.choices[x.answer]}` })))
  fireEvent.click(screen.getByRole('button', { name: '採点する' }))
  expect(screen.getByText(/まちがえた問題の根拠/)).toBeInTheDocument()
  expect(document.querySelectorAll('.long-evidence').length).toBe(3)
})

it('会話文の空所に入る文を選べる', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES.find((x) => x.id === 'shopping-dialogue')!
  fireEvent.click(screen.getByText(new RegExp('At a Sports Shop')))
  expect(screen.getAllByText('[ 1 ]').length).toBeGreaterThan(0)
  const sb = p.sentences![0]
  fireEvent.click(screen.getByRole('button', { name: `${MARKS[sb.answer]} ${sb.choices[sb.answer]}` }))
  expect(screen.getByRole('button', { name: `${MARKS[sb.answer]} ${sb.choices[sb.answer]}` })).toHaveAttribute('aria-pressed', 'true')
})

it('表を読みとる読解では表が出る', () => {
  render(<LongReading />)
  fireEvent.click(screen.getByText(/Green City Sports Center/))
  expect(document.querySelectorAll('.long-table tbody tr')).toHaveLength(4)
  expect(screen.getByText('Tennis', { selector: 'td' })).toBeInTheDocument()
})

it('段落ごとに英語で読み上げられる（空所は読まない）', () => {
  const spoken: string[] = []
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: { cancel() {}, speak: (u: { text: string }) => spoken.push(u.text), getVoices: () => [] } })
  ;(globalThis as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance = class {
    text: string
    constructor(t: string) {
      this.text = t
    }
  }
  render(<LongReading />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  fireEvent.click(screen.getByLabelText('第1段落を聞く'))
  expect(spoken[0]).toContain('There is a small library')
  expect(spoken[0]).not.toContain('( A )')
})

it('指示語の問題では二重下線の語が出る', () => {
  render(<LongReading />)
  fireEvent.click(screen.getAllByText(/The Shinkansen and Its Seven-Minute Team/)[0])
  expect(document.querySelector('.long-text .long-refer')!.textContent).toBe('it')
  fireEvent.click(screen.getByRole('button', { name: 'ア the Shinkansen' }))
  expect(screen.getByRole('button', { name: 'ア the Shinkansen' })).toHaveAttribute('aria-pressed', 'true')
})

it('タイトル選択の読解はタイトルをかくして、選択肢から選ぶ', () => {
  render(<LongReading />)
  expect(screen.queryByText(/The Clever Octopus/)).not.toBeInTheDocument()
  const n = LONG_PASSAGES.findIndex((p) => p.id === 'octopus')
  fireEvent.click(screen.getByText(new RegExp(`タイトルを当てる読解 No.${n + 1}`)))
  fireEvent.click(screen.getByRole('button', { name: 'イ The Clever Octopus' }))
  expect(screen.getByRole('button', { name: 'イ The Clever Octopus' })).toHaveAttribute('aria-pressed', 'true')
})

it('満点でない読解は「もう一度ときたい読解」に出る', () => {
  const p = LONG_PASSAGES[1]
  localStorage.setItem('eitan:long-reading', JSON.stringify({ [p.id]: 3 }))
  render(<LongReading />)
  fireEvent.click(screen.getByText(new RegExp(`${p.title}（3 / \\d+点）`)))
  expect(screen.getByText('← 読解の一覧')).toBeInTheDocument()
  localStorage.clear()
})

it('ランダム挑戦で、まだ解いていない読解が開く', () => {
  localStorage.clear()
  const done = Object.fromEntries(LONG_PASSAGES.slice(0, -1).map((x) => [x.id, 1]))
  localStorage.setItem('eitan:long-reading', JSON.stringify(done))
  render(<LongReading />)
  fireEvent.click(screen.getByText(/🎲 ランダム挑戦/))
  expect(screen.getByText('← 読解の一覧')).toBeInTheDocument()
  expect(screen.getAllByText(LONG_PASSAGES[LONG_PASSAGES.length - 1].paragraphs[1].split(' ( ')[0].slice(0, 15), { exact: false }).length).toBeGreaterThan(0)
})

it('とちゅうで一覧にもどっても、もう一度開くと続きから', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  const b = p.blanks[0]
  const label = `${MARKS[b.answer]} ${b.choices[b.answer]}`
  fireEvent.click(screen.getAllByRole('button', { name: label }).find((x) => x.closest('.long-item')!.textContent!.includes(`( ${b.id} )`))!)
  fireEvent.click(screen.getByText('← 読解の一覧'))
  expect(screen.getAllByText(/✏️とちゅう/).length).toBe(2) // 上の「とちゅうの長文」とジャンルの中の2か所
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  expect(screen.getByText(/とちゅうから再開しました/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /のこり 13問/ })).toBeDisabled()
})

it('種類のタブで読解をしぼりこめる', () => {
  localStorage.clear()
  render(<LongReading />)
  const all = document.querySelectorAll('.grammar-list li').length
  fireEvent.click(screen.getByRole('tab', { name: 'スピーチ' }))
  const n = document.querySelectorAll('.grammar-list li').length
  expect(n).toBeGreaterThan(0)
  expect(n).toBeLessThan(all)
  expect(screen.getByRole('tab', { name: 'スピーチ' })).toHaveAttribute('aria-selected', 'true')
})

it('文を入れる位置の問題は本文に［ア］〜［エ］が出て選べる', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES.find((x) => x.insert)!
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  expect(document.querySelectorAll('.long-insert-mark')).toHaveLength(4)
  expect(screen.getByText(p.insert!.sentence)).toBeInTheDocument()
  const btn = screen.getByRole('button', { name: `［${MARKS[p.insert!.answer]}］` })
  fireEvent.click(btn)
  expect(btn).toHaveAttribute('aria-pressed', 'true')
})

it('全文を聞くで段落を順番に読み上げ、とめられる', async () => {
  localStorage.clear()
  const speech = await import('./speech')
  const seq = vi.spyOn(speech, 'speakSeq').mockImplementation(() => {})
  const cancel = vi.spyOn(speech, 'cancelSpeech').mockImplementation(() => {})
  render(<LongReading />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  fireEvent.click(screen.getByText('🔊 全文'))
  expect(seq).toHaveBeenCalledTimes(1)
  expect(seq.mock.calls[0][0]).toHaveLength(p.paragraphs.length)
  fireEvent.click(screen.getByText('⏹ とめる'))
  expect(cancel).toHaveBeenCalled()
  expect(screen.getByText('🔊 全文')).toBeInTheDocument()
  fireEvent.click(screen.getByText('🐢 ゆっくり'))
  expect(seq.mock.calls[1][2]).toBe(true)
  seq.mockRestore()
  cancel.mockRestore()
})

it('要約文の完成の問題に答えられる', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES.find((x) => x.summary)!
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  expect(screen.getByText(p.summary!.text)).toBeInTheDocument()
  const b = p.summary!.blanks[0]
  const btn = screen.getAllByRole('button', { name: `${MARKS[b.answer]} ${b.choices[b.answer]}` })[0]
  fireEvent.click(btn)
  expect(btn).toHaveAttribute('aria-pressed', 'true')
})

it('語句の意味の問題に答えられる', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES.find((x) => x.vocab)!
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  const v = p.vocab![0]
  const btn = screen.getByRole('button', { name: `${MARKS[v.answer]} ${v.choices[v.answer]}` })
  fireEvent.click(btn)
  expect(btn).toHaveAttribute('aria-pressed', 'true')
})

it('重要語句を★に入れられる', async () => {
  localStorage.clear()
  const { keyWords } = await import('./longvocab')
  const onFavorite = vi.fn()
  render(<LongReading onFavorite={onFavorite} />)
  const p = LONG_PASSAGES.find((x) => keyWords(x).length > 0)!
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  const w = keyWords(p)[0]
  const btn = screen.getByLabelText(`${w.en}を★に入れる`)
  fireEvent.click(btn)
  expect(onFavorite).toHaveBeenCalledWith([w.id])
  expect(btn).toBeDisabled()
})

it('出来事の順番をタップで並べられる', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES.find((x) => x.seq)!
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  for (const i of p.seq!.answer) fireEvent.click(screen.getByRole('button', { name: `${MARKS[i]} ${p.seq!.events[i]}` }))
  expect(screen.getByLabelText('並べた順番')).toHaveTextContent(p.seq!.answer.map((i) => MARKS[i]).join(' → '))
})

it('満点をとると最短タイムが記録される', () => {
  localStorage.clear()
  render(<LongReading />)
  const keys = ['pick2', 'underline', 'order', 'sentences', 'qa', 'table', 'refer', 'gist', 'titleQ', 'complete', 'insert', 'summary', 'vocab', 'seq']
  const p = LONG_PASSAGES.find((x) => keys.every((k) => !(k in x)))!
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  for (const b of p.blanks) {
    const label = `${MARKS[b.answer]} ${b.choices[b.answer]}`
    fireEvent.click(screen.getAllByRole('button', { name: label }).find((x) => x.closest('.long-item')!.textContent!.includes(`( ${b.id} )`))!)
  }
  p.tf.forEach((t, i) => fireEvent.click(screen.getByRole('button', { name: `(${i + 1}) ${t.answer ? '○' : '×'}` })))
  vi.setSystemTime(Date.now() + 60000)
  fireEvent.click(screen.getByRole('button', { name: '採点する' }))
  expect(screen.getByText(/最短タイム更新！/)).toBeInTheDocument()
  expect(JSON.parse(localStorage.getItem('eitan:long-best-time')!)[p.id]).toBe(60)
  fireEvent.click(screen.getByText('← 読解の一覧'))
  expect(screen.getByText(/直近1本の正答率 100%/)).toBeInTheDocument()
  expect(screen.getByText(/📊 ジャンル別：.*100%/)).toBeInTheDocument()
  expect(screen.getByText('🏆 今週の読解ランキング')).toBeInTheDocument()
})

it('今日の1本のボタンでその日の読解が開く', async () => {
  const { dailyLong, shownTitle } = await import('./longreading')
  const { dayKey } = await import('./srs')
  localStorage.clear()
  render(<LongReading />)
  const p = dailyLong(dayKey())
  fireEvent.click(screen.getByText(/📅 今日の1本/))
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(shownTitle(p, LONG_PASSAGES.indexOf(p)))
})

it('段落ごとに和訳を開いたり閉じたりできる', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  expect(screen.queryByText(p.ja[1])).toBeNull()
  fireEvent.click(screen.getByLabelText('第2段落の和訳'))
  expect(screen.getByText(p.ja[1])).toBeInTheDocument()
  expect(screen.queryByText(p.ja[0])).toBeNull()
  fireEvent.click(screen.getByLabelText('第2段落の和訳'))
  expect(screen.queryByText(p.ja[1])).toBeNull()
})

it('音読タイムで1分あたりの語数が出る', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  fireEvent.click(screen.getByText('🎙 音読'))
  vi.setSystemTime(Date.now() + 60000)
  fireEvent.click(screen.getByText('⏹ 読めた！'))
  expect(screen.getByText(new RegExp(`1分あたり ${wordCount(p)}語`))).toBeInTheDocument()
})

it('まちがえた問題だけ解き直せる', () => {
  localStorage.clear()
  const onAnswer = vi.fn()
  render(<LongReading onAnswer={onAnswer} />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  expect(screen.getAllByText('( A )').length).toBeGreaterThan(0)
  expect(screen.getByRole('button', { name: /のこり 14問/ })).toBeDisabled()
  for (const b of p.blanks) {
    const label = `${MARKS[b.answer]} ${b.choices[b.answer]}`
    const btn = screen.getAllByRole('button', { name: label }).find((x) => x.closest('.long-item')!.textContent!.includes(`( ${b.id} )`))!
    fireEvent.click(btn)
  }
  p.tf.forEach((t, i) => fireEvent.click(screen.getByRole('button', { name: `(${i + 1}) ${i === 0 ? '×' : t.answer ? '○' : '×'}` })))
  for (const i of p.pick2!.answers) fireEvent.click(screen.getByRole('button', { name: `${MARKS[i]} ${p.pick2!.statements[i]}` }))
  p.qa!.forEach((x) => fireEvent.click(screen.getByRole('button', { name: `${MARKS[x.answer]} ${x.choices[x.answer]}` })))
  vi.setSystemTime(Date.now() + 125000)
  fireEvent.click(screen.getByRole('button', { name: '採点する' }))
  expect(screen.getByText(/13 \/ 14 点/)).toBeInTheDocument()
  expect(screen.getByText(/レベル合格！/)).toBeInTheDocument()
  expect(screen.getByText('💡 つまずき解説')).toBeInTheDocument()
  fireEvent.click(screen.getByText('🔁 まちがえた問題だけ解き直す'))
  expect(screen.getByRole('button', { name: /のこり 1問/ })).toBeDisabled()
  fireEvent.click(screen.getByRole('button', { name: `(1) ${p.tf[0].answer ? '○' : '×'}` }))
  fireEvent.click(screen.getByRole('button', { name: '採点する' }))
  expect(screen.getByText(/14 \/ 14 点/)).toBeInTheDocument()
})

it('すぐに答えあわせモードでは、答えるとすぐ正解と解説が出る', () => {
  localStorage.clear()
  render(<LongReading />)
  const p = LONG_PASSAGES[0]
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  fireEvent.click(screen.getByLabelText(/1問ずつ答えあわせ/))
  const t = p.tf[0]
  fireEvent.click(screen.getByRole('button', { name: `(1) ${t.answer ? '○' : '×'}` }))
  expect(screen.getByText(new RegExp(t.why.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))).toBeInTheDocument()
  expect(screen.getByRole('button', { name: `(1) ${t.answer ? '×' : '○'}` })).toBeDisabled()
})

it('★のしおりをつけた読解は一覧の上に来る', () => {
  localStorage.clear()
  render(<LongReading />)
  const last = LONG_PASSAGES[LONG_PASSAGES.length - 1]
  const btn = screen.getAllByLabelText(/をしおりに入れる$/).find((b) => b.getAttribute('aria-label') === `${shownTitle(last, LONG_PASSAGES.length - 1)}をしおりに入れる`)!
  fireEvent.click(btn)
  expect(JSON.parse(localStorage.getItem('eitan:long-bookmarks')!)).toEqual([last.id])
  expect(document.querySelector('.grammar-list li .grammar-fav.on')).not.toBeNull()
  expect(document.querySelectorAll('.grammar-list li')[0].querySelector('.grammar-fav.on')).not.toBeNull()
})

it('読んだ読解があると重要語句クイズができる', () => {
  localStorage.clear()
  localStorage.setItem('eitan:long-reading', JSON.stringify({ [LONG_PASSAGES[0].id]: 5, [LONG_PASSAGES[1].id]: 5 }))
  render(<LongReading />)
  fireEvent.click(screen.getByText(/重要語句クイズ（読んだ読解から5問）/))
  expect(screen.getByText(/📒 重要語句クイズ 1 \//)).toBeInTheDocument()
  fireEvent.click(document.querySelector<HTMLButtonElement>('.long-vq .choice')!)
  expect(screen.getByText('次へ')).toBeInTheDocument()
})

it('全部制覇チャレンジの進みぐあいが出る', () => {
  localStorage.clear()
  const rec = Object.fromEntries(LONG_PASSAGES.slice(0, 10).map((x) => [x.id, 1]))
  localStorage.setItem('eitan:long-reading', JSON.stringify(rec))
  render(<LongReading />)
  expect(screen.getByText(new RegExp(`全部制覇：10 / ${LONG_PASSAGES.length}本.*🥉10本`))).toBeInTheDocument()
})

it('読解の一覧に「空所でよく出る熟語」まとめが出る', () => {
  localStorage.clear()
  render(<LongReading />)
  fireEvent.click(screen.getByText(/よく出る熟語/))
  expect(screen.getByText('thank you for')).toBeTruthy()
})

it('解いた読解があれば「○×だけチャレンジ」で10問とける', () => {
  localStorage.clear()
  const p = LONG_PASSAGES[0]
  localStorage.setItem('eitan:long-reading', JSON.stringify({ [p.id]: 3, [LONG_PASSAGES[1].id]: 2 }))
  const onAnswer = vi.fn()
  render(<LongReading onAnswer={onAnswer} />)
  fireEvent.click(screen.getByText(/○×だけチャレンジ/))
  expect(screen.getByText('⭕❌ ○×だけチャレンジ 1 / 10')).toBeInTheDocument()
  for (let i = 0; i < 10; i++) {
    fireEvent.click(screen.getByRole('button', { name: '○' }))
    fireEvent.click(screen.getByText('次へ'))
  }
  expect(screen.getByText(/\/ 10 問正解/)).toBeInTheDocument()
  expect(onAnswer).toHaveBeenCalledTimes(10)
})

it('段落の文の並べかえ：答えるまでその段落はかくれ、正しい順に並べると正解', async () => {
  localStorage.clear()
  const { paraSeqQ } = await import('./longreading')
  const p = LONG_PASSAGES.find((x) => x.paraSeq)!
  const q = paraSeqQ(p)!
  render(<LongReading />)
  fireEvent.click(screen.getAllByText(new RegExp(p.title.replace(/[?()]/g, '.'))).at(-1)!)
  expect(screen.getByText('（この段落は下の「文の並べかえ」の問題です）')).toBeInTheDocument()
  for (const i of q.answer) fireEvent.click(screen.getByRole('button', { name: new RegExp(q.events[i].slice(0, 20).replace(/[?()."]/g, '.')) }))
  expect(screen.getByLabelText('並べた文の順番').textContent).toBe(q.answer.map((i) => MARKS[i]).join(' → '))
})

it('「すべて」の一覧はジャンルごとに折りたたまれている', () => {
  localStorage.clear()
  render(<LongReading />)
  const folds = [...document.querySelectorAll<HTMLDetailsElement>('details.long-genre-fold')]
  expect(folds.length).toBeGreaterThanOrEqual(3)
  expect(folds.every((d) => !d.open)).toBe(true)
  expect(folds.reduce((a, d) => a + d.querySelectorAll('li').length, 0)).toBe(LONG_PASSAGES.length)
})

it('採点したら「次の読解へ ▶」でまだ解いていない次の読解を開ける', () => {
  localStorage.clear()
  const [a, b] = LONG_PASSAGES
  localStorage.setItem('eitan:long-draft', '{}')
  render(<LongReading />)
  fireEvent.click(screen.getAllByText(new RegExp(a.title)).at(-1)!)
  for (const bl of a.blanks) {
    const btn = screen.getAllByRole('button', { name: `${MARKS[bl.answer]} ${bl.choices[bl.answer]}` }).find((x) => x.closest('.long-item')!.textContent!.includes(`( ${bl.id} )`))!
    fireEvent.click(btn)
  }
  a.tf.forEach((t, i) => fireEvent.click(screen.getByRole('button', { name: `(${i + 1}) ${t.answer ? '○' : '×'}` })))
  for (const i of a.pick2!.answers) fireEvent.click(screen.getByRole('button', { name: `${MARKS[i]} ${a.pick2!.statements[i]}` }))
  a.qa!.forEach((x) => fireEvent.click(screen.getByRole('button', { name: `${MARKS[x.answer]} ${x.choices[x.answer]}` })))
  fireEvent.click(screen.getByRole('button', { name: '採点する' }))
  fireEvent.click(screen.getByRole('button', { name: /次の読解へ ▶/ }))
  expect(screen.getAllByText(new RegExp(b.title.replace(/[?()]/g, '.'))).length).toBeGreaterThan(0)
  expect(screen.getByRole('button', { name: /のこり/ })).toBeDisabled()
})

it('読解の本文の文字の大きさを小・中・大で変えられ、覚えている', () => {
  localStorage.clear()
  const p = LONG_PASSAGES[0]
  const { unmount } = render(<LongReading />)
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  expect(document.querySelector('.long-text.font-m')).not.toBeNull()
  fireEvent.click(screen.getByRole('button', { name: '大' }))
  expect(document.querySelector('.long-text.font-l')).not.toBeNull()
  unmount()
  render(<LongReading />)
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  expect(document.querySelector('.long-text.font-l')).not.toBeNull()
})

it('読解を解いているあいだ「のこり○問」が上に出て、答えるとへる', () => {
  localStorage.clear()
  const p = LONG_PASSAGES[0]
  render(<LongReading />)
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  const total = Number(/のこり (\d+)問/.exec(document.querySelector('.long-remaining')!.textContent!)![1])
  const b = p.blanks[0]
  fireEvent.click(screen.getAllByRole('button', { name: `${MARKS[b.answer]} ${b.choices[b.answer]}` }).find((x) => x.closest('.long-item')!.textContent!.includes(`( ${b.id} )`))!)
  expect(document.querySelector('.long-remaining')!.textContent).toContain(`のこり ${total - 1}問`)
})

it('「中3チャレンジ」で中3レベルのまだ解いていない読解が開く', () => {
  localStorage.clear()
  const p = LONG_PASSAGES.find((x) => x.level.startsWith('中3'))!
  render(<LongReading />)
  fireEvent.click(screen.getByText(/🔥 中3チャレンジ/))
  expect(screen.getAllByText(new RegExp(p.title.replace(/[?()]/g, '.'))).length).toBeGreaterThan(0)
  expect(document.querySelector('.long-remaining')).not.toBeNull()
})

it('読解を100本解くと記念メダル（それまでは解いた本数を表示）', () => {
  localStorage.clear()
  const { unmount } = render(<LongReading />)
  expect(screen.getByText('📚 解いた読解 0 / 100本（100本で記念メダル）')).toBeInTheDocument()
  unmount()
  localStorage.setItem('eitan:long-reading', JSON.stringify(Object.fromEntries(LONG_PASSAGES.slice(0, 100).map((x) => [x.id, 1]))))
  render(<LongReading />)
  expect(screen.getByText('💯 読解100本クリア記念メダル！')).toBeInTheDocument()
})

it('ジャンルごとの折りたたみに満点の本数が出る', () => {
  localStorage.clear()
  const p = LONG_PASSAGES[0]
  localStorage.setItem('eitan:long-reading', JSON.stringify({ [p.id]: totalOf(p), [LONG_PASSAGES[1].id]: 0 }))
  render(<LongReading />)
  const sums = [...document.querySelectorAll('details.long-genre-fold summary')].map((x) => x.textContent ?? '')
  expect(sums.some((t) => t.includes('💯1'))).toBe(true)
  expect([...document.querySelectorAll('details.long-genre-fold summary .fold-meta')].some((e) => e.getAttribute('aria-label')!.includes('💯満点 1本'))).toBe(true)
})

it('採点すると本文の空所に正しい語が入り、まちがえた空所は色がかわる', () => {
  localStorage.clear()
  const p = LONG_PASSAGES[0]
  render(<LongReading />)
  fireEvent.click(screen.getAllByText(new RegExp(p.title)).at(-1)!)
  p.blanks.forEach((b, k) => {
    const pick = k === 0 ? (b.answer + 1) % 4 : b.answer
    fireEvent.click(screen.getAllByRole('button', { name: `${MARKS[pick]} ${b.choices[pick]}` }).find((x) => x.closest('.long-item')!.textContent!.includes(`( ${b.id} )`))!)
  })
  p.tf.forEach((t, i) => fireEvent.click(screen.getByRole('button', { name: `(${i + 1}) ${t.answer ? '○' : '×'}` })))
  for (const i of p.pick2!.answers) fireEvent.click(screen.getByRole('button', { name: `${MARKS[i]} ${p.pick2!.statements[i]}` }))
  p.qa!.forEach((x) => fireEvent.click(screen.getByRole('button', { name: `${MARKS[x.answer]} ${x.choices[x.answer]}` })))
  fireEvent.click(screen.getByRole('button', { name: '採点する' }))
  expect(document.querySelectorAll('.long-blank.filled')).toHaveLength(p.blanks.length)
  expect(document.querySelectorAll('.long-blank.filled.ng')).toHaveLength(1)
  expect(document.querySelector('.long-blank.filled.ng')!.textContent).toBe(`( ${p.blanks[0].id} ) ${p.blanks[0].choices[p.blanks[0].answer]}`)
})

it('答えかけの読解は一覧の上の「✏️ とちゅうの読解」に出る', () => {
  localStorage.clear()
  const p = LONG_PASSAGES[5]
  localStorage.setItem('eitan:long-draft', JSON.stringify({ [p.id]: { blanks: { A: 0 }, tf: {}, picks: [], order: [], sents: {}, qa: {}, gist: {}, comp: {} } }))
  render(<LongReading />)
  const box = document.querySelector('.long-drafts')!
  expect(box.textContent).toContain(shownTitle(p, 5))
})

it('読解の一覧：読んだ語数がピルで出て、ジャンルの数字は小さい補足になる', () => {
  localStorage.clear()
  render(<LongReading />)
  expect(document.querySelector('.long-words')?.textContent).toMatch(/読んだ語数：0語/)
  expect(document.querySelector('details.long-genre-fold summary .fold-meta')?.getAttribute('aria-label')).toMatch(/本・解いた 0本/)
  expect(document.querySelector('details.long-genre-fold summary .fold-meta')?.textContent).toMatch(/^0\/\d+$/)
})

it('1本もないジャンルは出さず、ジャンルが1つだけなら種類のタブも出さない', async () => {
  const { passagesFor } = await import('./readlevel')
  const { genreOf } = await import('./longreading')
  localStorage.clear()
  const univ = passagesFor('univ')
  const genres = new Set(univ.map(genreOf))
  const { unmount } = render(<LongReading passages={univ} />)
  expect(document.querySelectorAll('details.long-genre-fold').length).toBe(genres.size)
  if (genres.size < 2) expect(screen.queryByRole('tablist', { name: '読解の種類' })).toBeNull()
  unmount()
  const exam = passagesFor('exam')
  render(<LongReading passages={exam} />)
  expect(document.querySelectorAll('details.long-genre-fold').length).toBe(new Set(exam.map(genreOf)).size)
  expect([...document.querySelectorAll('details.long-genre-fold .fold-meta')].every((e) => !/\/0/.test(e.textContent ?? ''))).toBe(true)
})

it('読解の一覧の1行は「題名」と短いメタ（★・語数・目安）だけ', () => {
  localStorage.clear()
  render(<LongReading />)
  const item = document.querySelector('.long-item')!
  expect(item.querySelector('.long-item-title')).not.toBeNull()
  const meta = item.querySelector('.long-meta')!.textContent ?? ''
  expect(meta).toMatch(/^★+・\d+語・目安\d+分/)
  expect(meta).not.toContain('点・')
})

it('読解の本文画面：上の情報は短く（語数・分）、文法タグは（ ）の前だけ、音読・全文・ゆっくりは短いボタン', () => {
  localStorage.clear()
  render(<LongReading />)
  fireEvent.click(document.querySelector('.long-item')!)
  expect(screen.getByText('🎙 音読')).toBeInTheDocument()
  expect(screen.getByText('🔊 全文')).toBeInTheDocument()
  for (const t of document.querySelectorAll('.long-gtag')) expect(t.textContent).not.toContain('（')
})

it('読解の結果：次の読解の題名は小さい2行目、つまずき解説はたたまれている', () => {
  localStorage.clear()
  render(<LongReading />)
  fireEvent.click(document.querySelector('.long-item')!)
  for (const g of [...document.querySelectorAll('.long-choices')]) {
    const b = g.querySelector('button:not(:disabled)') as HTMLButtonElement | null
    if (b && !g.querySelector('[aria-pressed="true"]')) fireEvent.click(b)
  }
  const submit = screen.queryByRole('button', { name: '採点する' })
  if (!submit) return // 並べかえなどボタン以外の問題がある読解なら、ここでは確かめない
  fireEvent.click(submit)
  expect(document.querySelector('.long-score')).not.toBeNull()
  const tips = document.querySelector('details.long-tips') as HTMLDetailsElement | null
  if (tips) expect(tips.open).toBe(false)
  expect(document.querySelector('.next-long-title')).not.toBeNull()
})
