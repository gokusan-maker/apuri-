import { describe, expect, it } from 'vitest'
import { ADV_PASSAGES } from './advreading'
import { loadReadLevel, passagesFor, READ_LEVELS, saveReadLevel } from './readlevel'

describe('読解のむずかしさ', () => {
  it('単語・文法と同じ15レベルで、中1（短い読解）以外は長文がある', () => {
    expect(READ_LEVELS.map((l) => l.label)).toEqual(['中1', '中2', '中3', '高1', '高2', '高3', '私学', '私学難関', '国公立', '旧帝大', '京大', '東大', 'TOEIC', 'TOEFL・IELTS', 'ネイティブ'])
    for (const l of READ_LEVELS.filter((x) => x.id !== '中1')) expect(passagesFor(l.id).length, l.id).toBeGreaterThanOrEqual(6)
    expect(passagesFor('国公立').every((p) => p.level.startsWith('難関大'))).toBe(true)
    expect(passagesFor('中2').every((p) => /^(中2|初級)/.test(p.level))).toBe(true)
  })

  it('えらんだむずかしさを覚える（はじめは かんたん）', () => {
    localStorage.clear()
    expect(loadReadLevel()).toBe('中1')
    saveReadLevel('TOEFL・IELTS')
    expect(loadReadLevel()).toBe('TOEFL・IELTS')
    // まえのレベル（難関大＋入試レベル）は新しいレベルへ
    localStorage.setItem('eitan:read-level', 'univ')
    localStorage.setItem('eitan:exam-tier', 'kyutei')
    expect(loadReadLevel()).toBe('旧帝大')
  })
})

describe('難関大・TOEFL/IELTS の読解', () => {
  it('空所が本文にあり、訳は段落と同じ数、選択肢の答えは範囲内', () => {
    const ids = new Set<string>()
    for (const p of ADV_PASSAGES) {
      expect(ids.has(p.id)).toBe(false)
      ids.add(p.id)
      expect(p.ja.length).toBe(p.paragraphs.length)
      const text = p.paragraphs.join(' ')
      for (const b of p.blanks) {
        expect(text).toContain(`( ${b.id} )`)
        expect(b.answer).toBeLessThan(b.choices.length)
        expect(new Set(b.choices).size).toBe(b.choices.length)
      }
      for (const q of p.qa ?? []) expect(q.answer).toBeLessThan(q.choices.length)
      const words = text.split(/\s+/).length
      expect(words, p.id).toBeGreaterThanOrEqual(150)
    }
  })
})

describe('むずかしさごとに解いた本数', () => {
  it('そのレベルで解いた本数と全部の本数（かんたんは数えない）', async () => {
    const { solvedOf } = await import('./readlevel')
    expect(solvedOf('中1', {}, ['cat'])!.done).toBe(1)
    const ps = passagesFor('国公立')
    expect(solvedOf('国公立', { [ps[0].id]: 5, 'cat': 3 })).toEqual({ done: 1, total: ps.length })
  })
})

describe('むずかしさごとの今日のおすすめ', () => {
  it('そのレベルの中から日ごとに1本（同じ日は同じ）', async () => {
    const { dailyPick } = await import('./readlevel')
    const list = passagesFor('TOEFL・IELTS')
    const p = dailyPick(list, '2026-10-22')!
    expect(list).toContain(p)
    expect(dailyPick(list, '2026-10-22')).toBe(p)
    expect(dailyPick([], '2026-10-22')).toBeUndefined()
    const seen = new Set(Array.from({ length: 30 }, (_, i) => dailyPick(list, `2026-11-${i + 1}`)!.id))
    expect(seen.size).toBeGreaterThan(2)
  })
})

describe('かんたんの短い読解も解いた本数を数える', () => {
  it('全部答えた話がチェックになり、本数がふえる', async () => {
    const { render, screen, fireEvent } = await import('@testing-library/react')
    const { Reading } = await import('./ReadingView')
    const { PASSAGES } = await import('./reading')
    localStorage.clear()
    const p = PASSAGES[0]
    render(<Reading start={p} />)
    for (const q of p.questions) {
      fireEvent.click(screen.getByRole('button', { name: q.choices[q.answer] }))
      fireEvent.click(screen.getByText('次へ'))
    }
    expect(screen.getByText('🎉 全問正解！ この話はばっちり')).toBeInTheDocument() // 全問正解のお祝い
    fireEvent.click(screen.getByText('ほかの話を読む'))
    expect(screen.getByLabelText(`1 / ${PASSAGES.length} 階クリア`)).toBeInTheDocument() // 城の階の数
    fireEvent.click(screen.getByText('📚 話をえらんで自由に読む'))
    expect(screen.getAllByText(p.title).some((e) => e.closest('.short-item')?.classList.contains('short-done'))).toBe(true)
  })
})

describe('次のレベルへのちょうせん印', () => {
  it('1つ下のレベルを半分以上解くと、そのレベルに⭐ちょうせん', async () => {
    const { readyFor } = await import('./readlevel')
    const prev = passagesFor('高3')
    expect(readyFor('私学', {})).toBe(false)
    const half = Object.fromEntries(prev.slice(0, Math.ceil(prev.length / 2)).map((p) => [p.id, 5]))
    expect(readyFor('私学', half)).toBe(true)
    expect(readyFor('中1', half)).toBe(false) // いちばん下には出ない
  })
})

describe('高校入試レベルの追加読解', () => {
  it('高校入試のむずかしさに、新しい自作の読解が入っている', () => {
    const ids = [...passagesFor('高1'), ...passagesFor('高2')].map((p) => p.id)
    expect(ids).toContain('exam-radio')
    expect(ids).toContain('exam-wheelchair')
    expect(passagesFor('国公立').some((p) => p.id.startsWith('exam-'))).toBe(false)
  })
})

it('旧帝大・京大・東大は本番の長さの長文だけ（京大・東大は600語以上、旧帝大は450語以上）。短い長文は国公立に回る', async () => {
  const { passageStats } = await import('./examtier')
  for (const l of ['京大', '東大'] as const) for (const p of passagesFor(l)) expect(passageStats(p).words, p.id).toBeGreaterThanOrEqual(600)
  for (const p of passagesFor('旧帝大')) expect(passageStats(p).words, p.id).toBeGreaterThanOrEqual(450)
  expect(passagesFor('京大').some((p) => p.id === 'kyodai-ruins')).toBe(false)
  expect(passagesFor('国公立').some((p) => p.id === 'kyodai-ruins')).toBe(true)
  expect(passagesFor('国公立').some((p) => p.id === 'todai-dialects')).toBe(true)
  // 京大は和訳の問題つき
  expect(passagesFor('京大')[0].gistKind).toBe('transl')
})

it('TOEIC はメール・お知らせの長文だけ。メール・お知らせは高3（共通テスト）などには入らない', () => {
  expect(passagesFor('TOEIC').every((p) => /メール|お知らせ/.test(p.level))).toBe(true)
  expect(passagesFor('TOEIC').some((p) => p.id === 'toeic-office-move')).toBe(true)
  expect(passagesFor('高3').some((p) => /メール|お知らせ/.test(p.level))).toBe(false)
})

it('ネイティブのいちばんはじめに、くだけた言い方の多いエッセイ（native-）', () => {
  expect(passagesFor('ネイティブ')[0].id).toBe('native-small-talk')
  expect(passagesFor('国公立').some((p) => p.id.startsWith('native-'))).toBe(false)
})

it('京大専用の長文①「知らないことの価値」：650語以上・1文18語以上で、京大のいちばんはじめ（和訳の問題つき）。旧帝大・東大には出ない', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大')[0]
  expect(p.id).toBe('kyodai-not-knowing')
  expect(passageStats(p).words).toBeGreaterThanOrEqual(650)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.gistKind).toBe('transl')
  expect(passagesFor('旧帝大').some((x) => x.id === p.id)).toBe(false)
  expect(passagesFor('東大').some((x) => x.id === p.id)).toBe(false)
})

it('京大専用の長文②「便利さがうばうもの」：650語以上・1文18語以上で、京大に出る（旧帝大・東大には出ない）', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-convenience')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(650)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(passagesFor('旧帝大').some((x) => x.id === p.id)).toBe(false)
})

it('京大専用の長文③「孤独な天才という神話」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-lone-genius')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('京大専用の長文④「翻訳で失われるもの・生まれるもの」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-translation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('京大専用の長文⑤「制限が生む創造性」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-constraints')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文①「なぜ贈り物をするのか」：600語以上・1文18語以上で、東大のいちばんはじめ（要約の設問つき）。京大・旧帝大には出ない', async () => {
  const { passageStats } = await import('./examtier')
  expect(passagesFor('東大')[0].id.startsWith('todai-')).toBe(true)
  const p = passagesFor('東大').find((x) => x.id === 'todai-gifts')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect((p.qa ?? []).some((q) => q.q.includes('要約'))).toBe(true)
  expect(passagesFor('京大').some((x) => x.id === p.id)).toBe(false)
  expect(passagesFor('旧帝大').some((x) => x.id === p.id)).toBe(false)
})

it('京大専用の長文⑥「なぜ本物が大切なのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-originals')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文②「お仕事は何ですか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-work-identity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
  expect(passagesFor('京大').some((x) => x.id === p.id)).toBe(false)
})

it('京大専用の長文⑦「忘れることの効用」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-forgetting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文③「知らない人を信頼する」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-trust')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑧「手つかずの自然という神話」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-wilderness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文④「人はなぜ都市へ移るのか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-cities')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑨「幸福ははかれるか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-happiness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑤「インターネットは言語をだめにしているか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-online-writing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑩「習慣と自由」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-habit-freedom')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑥「過去はだれのものか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-returning-objects')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑪「進歩という考え」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-progress')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑦「動物の心をはかる」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-animal-minds')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑫「遊びの真剣さ」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-play')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑧「行列の公平さ」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-queues')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑬「なぜ古い本を読むのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-classics')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑨「スポーツと国」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-sport-nation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑭「孤独感とひとりの時間」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-solitude')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑩「今なぜ外国語を学ぶのか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-language-learning')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑮「専門家を信頼する」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-expertise')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑪「人はなぜ物を集めるのか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-collecting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑯「儀式はなぜ残るのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-rituals')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑫「シェアリング・エコノミー」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-sharing-economy')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑰「注意という実践」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-attention')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑬「子どもと広告」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-child-advertising')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑱「ホームの意味」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-home')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑭「人はなぜペットを飼うのか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-pets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑲「希望のはたらき」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-hope')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑮「肉を食べることの問題」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-eating-meat')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文⑳「記憶と歴史」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-history-memory')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑯「淡水の不足」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-water-scarcity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉑「なぜフィクションを読むのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-fiction')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑰「縮む町」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-shrinking-towns')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉒「区分の使い道と限界」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-categories')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑱「ごほうびとやる気」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-rewards-motivation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉓「運の見えない役割」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-luck')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑲「ソーシャルメディア時代の名声」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-online-fame')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉔「伝統はどう作られるか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-tradition')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文⑳「介護ロボット」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-care-robots')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('東大専用の長文㉑「ランキングを注意深く読む」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-rankings')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('東大専用の長文㉒「人生100年の設計」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-hundred-year-life')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉕「役に立たない知識の擁護」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-useless-knowledge')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉓「サードプレイス」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-third-places')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉖「ゆっくりさの価値」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-slowness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉔「都市の野生動物」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-urban-wildlife')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉗「考えを形づくる比喩」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-metaphor')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉕「公共の場の監視カメラ」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-surveillance')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉘「自分らしくあることと自分になること」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-true-self')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉖「頭と心でする寄付」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-effective-giving')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉙「ゆるしは何を変えるか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-forgiveness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉗「あなたのために選ばれたもの」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-recommendations')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉚「畏敬の念という経験」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-awe')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉘「英語はだれのことばか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-global-english')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})
