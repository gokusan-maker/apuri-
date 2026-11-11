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

it('京大専用の長文㉛「余暇という自由」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-leisure')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉙「家族の食卓」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-family-meals')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉜「約束はなぜ人をしばるのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-promises')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉚「地方新聞が消えるとき」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-local-news')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉝「想像力と現実」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-imagination')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉛「ゲームが教えるもの」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-video-games')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉞「客観性」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-objectivity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉜「気候への責任はだれにあるか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-climate-responsibility')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㉟「考えを変える勇気」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-changing-minds')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉝「試験は扉か壁か」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-standardized-tests')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊱「言葉にできない知識」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-tacit-knowledge')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉞「働き手以上の存在」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-foreign-workers')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊲「名前とは何か」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-names')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㉟「宇宙はその費用に見合うか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-space-spending')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊳「競争の2つの顔」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-competition')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊱「画面を通して学ぶ」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-online-learning')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊴「人はなぜ笑うのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-humor')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊲「機械が書けるとき」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-ai-writing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊵「所有するとはどういうことか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-ownership')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊳「過去についての謝罪」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-historical-apologies')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊶「感謝の重み」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-gratitude')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊴「奉仕は義務にできるか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-required-service')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊷「ねたみに耳をかたむける」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-envy')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊵「バスは無料にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-free-transport')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊸「距離の効用」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-distance')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊶「夜を失う」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-light-pollution')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊹「決まりと判断」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-rules')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊷「手書きは今も大切か」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-handwriting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊺「沈黙の意味」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-silence')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊸「星の数は信じられるか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-online-reviews')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊻「たいくつが教えてくれること」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-boredom')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊹「十六歳は投票すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-voting-age')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊼「礼儀正しさの意味」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-politeness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊺「捨てられる食べ物」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-food-waste')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊽「なぜ友人は大切か」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-friendship')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊻「事務所なしで働く」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-remote-work')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊾「美しさは見る人の目の中だけにあるのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-beauty')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文㊼「砂糖に税をかける」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-sugar-tax')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文㊿「子ども時代の発明」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-childhood')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文48「安い服の本当の値段」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-fast-fashion')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文51「二種類の野心」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-ambition')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文49「レジ袋のその先へ」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-plastic')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文52「知ることと賢いこと」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-wisdom')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文50「大学の費用はだれがはらうべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-free-university')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文53「怒りの効用」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-anger')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文51「遺伝子が教えてくれること」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-dna-tests')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文54「後悔とともに生きる」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-regret')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文52「週四日の働き方」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-four-day-week')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文55「不完全さをたたえて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-imperfection')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文53「動物園にまだ居場所はあるか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-zoos')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文56「ふつうの日々の価値」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-ordinary')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文54「機械が審判をするべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-referees')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文57「見知らぬ人をむかえ入れる」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-hospitality')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文55「いつ働くのをやめるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-retirement-age')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文58「勇気のさまざまな顔」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-courage')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文56「SNSには若すぎる？」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-social-media-age')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文59「けんきょさとは何か」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-humility')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文57「通りはだれのためにあるのか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-car-free-cities')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文60「感じる時間」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-time-sense')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文58「速さの代償」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-fast-delivery')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文61「あたえる心」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-generosity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文59「一歩一歩を数える」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-wearables')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文62「やさしいうその問題」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-white-lies')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文60「歩道のキックボード」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-e-scooters')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文63「迷子にならずにふり返る」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-nostalgia')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文61「都市に住む余裕はだれにあるか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-housing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文64「場所の感覚」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-place')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文62「動物のいない肉？」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-lab-meat')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文65「会話という技術」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-conversation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文63「この絵はだれが作ったのか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-ai-art')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文66「しんぼう強さの力」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-patience')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文64「助けることで本当に得をするのはだれか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-voluntourism')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文67「公平とは何か」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-fairness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文65「給食は無料にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-school-meals')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文68「死を知って生きる」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-mortality')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文66「チップはやめるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-tipping')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文69「模倣と独創」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-imitation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文67「制服は必要か」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-uniforms')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文70「好奇心の二つの顔」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-curiosity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文68「学校はおそく始めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-school-start')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文71「信頼について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-trust')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文69「臓器提供は初期設定にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-organ-donation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文72「驚異と知識」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-wonder')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文70「学校でお金を教えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-financial-education')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文73「恥の役割と危険」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-shame')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文71「学生は先生を評価すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-teacher-evaluations')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文74「ほめることの技術」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-praise')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文72「試験は持ちこみ可にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-open-book-exams')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文75「理想と失敗と偽善」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-hypocrisy')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文73「すべての人にお金を？」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-basic-income')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文76「夢が語るもの」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-dreams')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文74「原子力にたよるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-nuclear-power')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文77「秘密の価値」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-secrets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文75「オンラインで投票すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-online-voting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文78「忠誠の限界」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-loyalty')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文76「税金で芸術を支えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-arts-funding')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文79「二種類のプライド」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-pride')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文77「長い夏休みはまだ必要か」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-summer-break')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文80「地図と土地」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-maps')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文78「博物館は無料にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-free-museums')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文81「助言のむずかしさ」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-advice')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文79「学校は成績をやめるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-no-grades')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文82「終わりの技術」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-endings')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文80「すべての生徒がプログラミングを学ぶべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-coding')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文83「疑いの使い方」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-doubt')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文81「教室は紙か画面か」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-digital-textbooks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文84「私たちを形づくる道具」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-tools')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文82「高齢の運転者はテストを受けるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-older-drivers')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文85「おとなになるとは」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-maturity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文83「親は画面を見る時間を制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-screen-time')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文86「くり返しをたたえて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-repetition')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文84「魚を守れるか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-overfishing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文87「楽しみに待つ喜び」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-anticipation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文85「つながらない権利」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-right-to-disconnect')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文88「誠実であるとは」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-sincerity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文86「データの代金をもらうべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-data-dividend')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文89「属したいという願い」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-belonging')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文87「技能か学位か」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-degrees')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文90「正義と慈悲」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-mercy')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文88「最低賃金はどこまで上げるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-minimum-wage')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文91「私たちが受けつぐもの」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-inheritance')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文89「飛行機に乗るのをへらすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-flying-less')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文92「手仕事の意味」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-craft')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文90「新しい屋根にはすべて太陽光パネルを？」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-solar-roofs')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文93「二種類の単純さ」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-simplicity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文91「住まいかホテルか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-short-term-rentals')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文94「不確かさとともに生きる」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-uncertainty')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文92「オンラインで匿名であるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-online-anonymity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文95「好みに議論の余地はないか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-taste')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文93「投票を義務にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-compulsory-voting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文96「あいまいさの弁護」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-ambiguity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文94「ロボットに税をかけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-robot-tax')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文97「恐れが教えてくれること」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-fear')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文95「学校で料理を教えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-cooking-classes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文98「快適さのかくれた代償」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-comfort')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文96「高速鉄道は価値があるか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-high-speed-rail')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文99「自己欺瞞のなぞ」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-self-deception')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文97「市民が刑事裁判を裁くべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-lay-judges')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文100「皮肉の効用」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-irony')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文98「都市はストリートアートを歓迎すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-street-art')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文101「うわさ話の社会的な役割」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-gossip')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文99「オリンピックを開く価値はあるか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-olympic-host')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文102「くじで決める」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-lotteries')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文100「自動運転車は道路を走るべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-self-driving')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文103「くらべる習慣」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-comparison')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文101「学校でスマートフォンを禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-phone-ban')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文104「寛容の限界」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-tolerance')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文102「医学研究に動物を使うべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-animal-research')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文105「本物の自分を求めて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-authenticity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文103「人間の遺伝子を編集すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-gene-editing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文106「人間の尊厳とは何か」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-dignity')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文104「都市は自転車専用車線をふやすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-bike-lanes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文107「無関心という問題」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-indifference')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文105「ごく裕福な人に富裕税をかけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-wealth-tax')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文108「なぜ権威にしたがうのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-authority')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文106「子どもを家で教育すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-homeschooling')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文109「欲望はどこから来るのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-desire')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文107「刑務所は何のためにあるのか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-prisons')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文110「悲嘆が求めるもの」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-grief')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文108「ネットで何を言ってよいかをだれが決めるのか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-content-moderation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文111「英雄とは何か」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-heroes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文109「薬を特許で守るべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-drug-patents')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文112「なぜプライバシーが大切なのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-privacy')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文110「学校で哲学を教えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-school-philosophy')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文113「才能と努力」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-talent')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文111「都心に入る車に料金を課すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-congestion-charge')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文114「自制心を考え直す」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-self-control')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文112「選挙運動の費用を公がはらうべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-campaign-funding')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文115「二種類の尊重」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-respect')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文113「昆虫を食べるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-insect-food')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文116「何がぜいたくなのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-luxury')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文114「保育をすべての家族に無料にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-free-childcare')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文117「旅で求めるもの」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-travel')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文115「修理する権利を認めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-right-to-repair')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文118「よい市民とは何か」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-citizenship')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文116「二重国籍を認めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-dual-citizenship')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文119「認められたいという欲求」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-recognition')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文117「給料を公開すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-pay-transparency')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文120「未来に負うもの」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-future-generations')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文118「チケットの転売を制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-ticket-resale')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文121「偶然の一致の意味」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-coincidence')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文119「深海を採掘すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-deep-sea-mining')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文122「楽観と希望」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-optimism')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文120「都市は屋外広告を禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-billboards')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文123「教えるとはどういうことか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-teaching')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文121「ギグワーカーを従業員としてあつかうべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-gig-workers')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文124「責める習慣」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-blame')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文122「炭素に税をかけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-carbon-tax')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文125「なぜ祝うのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-celebration')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文123「一つの世代全体に喫煙を禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-smoking-ban')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文126「豊かであるとはどういうことか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-wealth')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文124「クジラやイルカを水族館で飼うべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-captive-dolphins')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文127「手紙が教えてくれること」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-letters')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文125「リサイクルを法律で義務にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-mandatory-recycling')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文128「私たちがつける仮面」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-masks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文126「メニューにカロリーを表示すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-calorie-labels')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文129「メンターの役割」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-mentors')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文127「小さな店を守るべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-small-shops')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文130「おどろきの価値」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-surprise')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文128「都市はもっと騒音をへらすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-urban-noise')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文131「難しさの価値」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-difficulty')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文129「子どものエナジードリンクを制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-energy-drinks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文132「まちがいから学ぶ」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-mistakes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文130「宿題はなくすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-homework')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文133「休息の価値」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-rest')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文131「観光客に税をかけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-tourist-tax')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文134「読み返す楽しみ」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-rereading')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文132「社会は現金をなくすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-cashless')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文135「アマチュアをたたえて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-amateur')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文133「中古品の購入をうながすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-secondhand')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文136「道に迷うことの価値」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-getting-lost')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文134「ギャップイヤーをとるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-gap-year')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文137「決まった習慣のかくれた価値」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-routine')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文135「論争のある像は取りのぞくべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-statues')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文138「なぜ人は物語を語るのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-storytelling')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文136「店は一晩中開いている必要があるか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-late-night-shops')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文139「季節とともに生きる」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-seasons')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文137「学校で心の健康を教えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-mental-health-lessons')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文140「見知らぬ人の親切」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-strangers')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文138「子どもは一人で登校すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-walking-to-school')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文141「写真と記憶」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-photographs')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文139「公共図書館にもっと予算を出すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-libraries')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文142「ことわる技術」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-saying-no')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文140「学校の近くの体によくない食べ物を制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-junk-food-schools')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文143「老いの贈り物」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-old-age')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文141「都市はボトル入りの水をひかえさせるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-bottled-water')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文144「未完成をたたえて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-unfinished')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文142「学校の一日はもっと長くすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-longer-school-day')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文145「なぜリストをつくるのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-lists')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文143「公のお金でスタジアムを建てるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-stadium-funding')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文146「ライバルの価値」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-rivals')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文144「都市は無料のインターネットを提供すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-public-wifi')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文147「第一印象の落とし穴」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-first-impressions')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文145「店は日曜日に閉めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-sunday-trading')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文148「自分で学ぶこと」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-self-taught')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文146「学校で音楽を必修にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-music-education')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文149「古い建物の価値」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-old-buildings')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文147「育児休業を広げるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-parental-leave')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文150「共感の限界」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-empathy')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文148「都市は家賃を規制すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-rent-control')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文151「節度をたたえて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-moderation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文149「国立公園の訪問者を制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-park-visitor-limits')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文152「なぜ境界が必要なのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-boundaries')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文150「狩りは禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-hunting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文153「ためらいの価値」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-hesitation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文151「大きなダムをもっと建てるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-dams')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文154「義務を考え直す」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-duty')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文152「最高賃金を定めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-maximum-wage')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文155「小さな楽しみをたたえて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-small-pleasures')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文153「体育に成績をつけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-pe-grades')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文156「ぎこちなさの弁護」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-awkwardness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文154「学生の借金は帳消しにすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-student-debt')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文157「足りているという考え」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-enough')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文155「子どもが学校を休んだら親に罰金を科すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-truancy-fines')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文158「おちつきの意味」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-calm')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文156「ゲームのルートボックスを規制すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-loot-boxes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文159「あこがれについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-admiration')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文157「博物館は人間の遺体を展示すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-human-remains')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文160「負けることを学ぶ」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-losing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文158「自然に法的な権利を認めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-nature-rights')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文161「服従について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-obedience')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文159「スポーツでドーピングを認めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-doping')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文162「評判について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-reputation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文160「公共放送を税金で支えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-public-broadcasting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文163「無垢について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-innocence')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文161「十代の夜間外出禁止は必要か」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-teen-curfews')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文164「選ぶことの重荷」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-choice')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文162「選挙前の世論調査を禁じるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-election-polls')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文165「始まりについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-beginnings')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文163「十代の美容整形を制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-cosmetic-surgery')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文166「時間を守ることについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-punctuality')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文164「入学者をくじ引きで選ぶべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-admission-lottery')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文167「鏡について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-mirrors')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文165「有機農業に補助金を出すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-organic-farming')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文168「庭が教えること」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-gardens')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文166「サーカスで野生動物に芸をさせるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-circus-animals')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文169「天気の話」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-weather-talk')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文167「歴史的な町に高い建物を認めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-historic-skylines')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文170「隣人について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-neighbors')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文168「めずらしいペットの取引を禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-exotic-pets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文171「倹約について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-thrift')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文169「大学は卒業生の子を優遇すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-legacy-admissions')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文172「つかれについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-tiredness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文170「お酒に健康の警告をつけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-alcohol-labels')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文173「いそがしさについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-busyness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文171「教授の終身在職権を守るべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-tenure')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文174「なぜ泣くのか」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-tears')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文172「農薬は禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-pesticide-limits')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文175「暗やみをたたえて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-darkness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文173「医師や看護師のストライキを認めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-doctor-strikes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文176「物をなくすこと」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-lost-things')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文174「スポーツのかけごとを合法にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-sports-betting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文177「わすれられた感覚」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-smell')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文175「海外留学を義務にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-study-abroad')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文178「からかいについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-teasing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文176「電子たばこを禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-vaping')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文179「じゃまについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-interruptions')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文177「まずしい国の借金を帳消しにすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-debt-relief')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文180「おぼえられることについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-being-remembered')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文178「外国人観光客は高い料金をはらうべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-tourist-pricing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文181「暗記について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-memorization')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文179「しばふを野の花に変えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-lawns')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文182「さよならを言うこと」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-farewells')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文180「投票日を祝日にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-election-holiday')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文183「二度目の機会について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-second-chances')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文181「講義でノートパソコンを禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-laptop-ban')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文184「妥協について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-compromise')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文182「都市はクルーズ船を断るべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-cruise-ships')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文185「大げさな言い方について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-exaggeration')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文183「レジからお菓子をなくすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-checkout-sweets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文186「考えすぎについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-overthinking')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文184「飲み物の容器にデポジットをつけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-bottle-deposits')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文187「批判を受けとめること」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-criticism')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文185「受刑者に投票を認めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-prisoner-voting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文188「夢中になることについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-absorption')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文186「ガスこんろをやめていくべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-gas-stoves')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文189「当たり前だと思うこと」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-taken-for-granted')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文187「肉に税金をかけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-meat-tax')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文190「あわれみと思いやり」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-pity-compassion')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文188「警察官はカメラを身につけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-police-cameras')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文191「家を出ることについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-leaving-home')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文189「人にはわすれられる権利があるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-right-to-be-forgotten')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文192「自分にやさしくすることについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-self-kindness')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文190「宇宙旅行はすすめるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-space-tourism')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文193「助けを求めることについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-asking-for-help')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文191「GDPは進歩の正しいものさしか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-beyond-gdp')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文194「集めることについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-collecting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文192「気候に手を加えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-geoengineering')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文195「歩くことについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-walking')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文193「都市はもっと木を植えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-urban-trees')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文196「ねむりについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-sleep')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文194「時計を変えるのをやめるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-daylight-saving')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文197「音楽を聞くことについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-music')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文195「都市は制限速度を下げるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-lower-speed-limits')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文198「色について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-color')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文196「飲み水にフッ素を加えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-water-fluoride')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文199「着るものについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-clothing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文197「空港を広げるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-airport-expansion')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文200「本とともに暮らすことについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-books')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文198「海辺の地域は海から退くべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-managed-retreat')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文201「美術を見ることについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-looking-at-art')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文199「海にもっと風力発電所をつくるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-offshore-wind')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文202「スポーツを見ることについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-watching-sport')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文200「すべての生徒にAIの家庭教師をつけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-ai-tutors')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文203「都市の暮らしについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-city-life')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文201「消える前にその場所をおとずれるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-last-chance-tourism')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文204「植物の生について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-plants')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文202「学生選手にお金をはらうべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-paying-student-athletes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文205「動物とともに暮らすことについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-animals')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文203「取締役会に女性の割り当てを設けるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-board-quotas')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文206「雨について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-rain')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文204「大学は英語で教えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-english-medium')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文207「海について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-the-sea')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文205「親は子どものことをオンラインで分かち合うべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-sharenting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文208「山について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-mountains')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文206「生徒は電卓を使うべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-calculators')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文209「川について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-rivers')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文207「医療の記録を研究のために分かち合うべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-health-data')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文210「島について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-islands')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文208「オンラインの医者は対面の医療にかわれるか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-telemedicine')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文211「森について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-forests')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文209「すべての学校で応急手当を教えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-first-aid-lessons')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文212「砂ばくについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-deserts')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文210「国はデジタルノマドを歓迎すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-digital-nomads')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文213「雪について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-snow')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文211「水泳の授業を必修にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-swimming-lessons')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文214「風について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-wind')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文212「政府は電気自動車の購入にお金を出すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-ev-subsidies')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文215「石について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-stones')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文213「家の断熱を義務づけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-home-insulation')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文216「火について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-fire')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文214「メディア・リテラシーを必修にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-media-literacy')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文217「橋について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-bridges')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文215「ディベートを学校の必修にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-debate-lessons')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文218「まどについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-windows')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文216「学校は週四日制にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-four-day-school-week')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文219「かげについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-shadows')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文217「新しい若い運転者に制限を設けるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-young-drivers')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文220「ドアについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-doors')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文218「AIがつくった内容に表示をつけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-ai-labels')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文221「時計について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-clocks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文219「社員はペットを職場に連れてきてよいか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-pets-at-work')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文222「小道について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-paths')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文220「値段は需要に合わせて上下してよいか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-dynamic-pricing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文223「階段について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-stairs')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文221「店はレジ係を機械に置きかえてよいか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-self-checkouts')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文224「鐘について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-bells')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文222「インフルエンサーの広告は規制すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-influencer-ads')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文225「鍵について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-keys')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文223「大事なことは国民投票で決めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-referendums')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文226「結び目について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-knots')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文224「試験は紙から画面に移すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-digital-exams')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文227「はしごについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-ladders')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文225「子どもに家の手伝いのお金をはらうべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-paid-chores')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文228「ポケットについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-pockets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文226「学校の前の道路を車の通行止めにすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-school-streets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文229「ランプについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-lamps')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文227「ペットのネコは家の中で飼うべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-indoor-cats')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文230「いすについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-chairs')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文228「店は子どもの入店をことわってよいか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-child-free-zones')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文231「かごについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-baskets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文229「スポーツの用具の技術は制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-sports-technology')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文232「手ぶくろについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-gloves')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文230「別荘にはより高い税をかけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-second-homes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文233「井戸について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-wells')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文231「学校は男女別学にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-single-sex-schools')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文234「さくについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-fences')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文232「都市は公衆トイレをもっと用意すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-public-toilets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文235「かどについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-corners')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文233「都市は夜の文化を守るべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-nightlife')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文236「カレンダーについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-calendars')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文234「聖なる場所での登山は禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-sacred-sites')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文237「たなについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-shelves')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文235「花火を一般の人に売ってよいか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-firework-sales')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文238「えんぴつについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-pencils')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文236「若者に国民奉仕を求めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-national-service')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文239「ふうとうについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-envelopes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文237「夏休みは短くすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-summer-holidays')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文240「ろうかについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-corridors')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文238「生徒も学校の決まりづくりに加わるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-student-rules')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文241「スプーンについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-spoons')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文239「配達ロボットに歩道を使わせてよいか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-delivery-robots')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文242「はかりについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-scales')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文240「大きな車は駐車料金を多くはらうべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-large-car-parking')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文243「毛布について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-blankets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文241「公演中の電話は禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-phones-at-concerts')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文244「パズルについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-puzzles')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文242「都市は在来種だけを植えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-native-planting')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文245「標識について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-signs')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文243「スポーツ選手は社会問題について発言すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-athlete-activism')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文246「やかんについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-kettles')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文244「野生動物へのえさやりは禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-feeding-wildlife')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文247「カーテンについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-curtains')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文245「広場でのスケートボードは認めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-skateboarding')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文248「バルコニーについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-balconies')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文246「ホテルは毎日の部屋の掃除をやめるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-hotel-cleaning')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文249「しおりについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-bookmarks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文247「レストランは無断キャンセルに料金をとってよいか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-no-show-fees')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文250「ぼうしについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-hats')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文248「スーパーは見た目の悪い野菜も売るべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-imperfect-produce')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文251「ノートについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-notebooks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文249「親は子どもの居場所を見守るべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-tracking-children')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文252「絵はがきについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-postcards')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文250「職場で見えるいれずみを認めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-tattoos')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文253「おみやげについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-souvenirs')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文251「図書館は延滞料をやめるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-library-fines')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文254「ボタンについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-buttons')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文252「職場で昼寝をみとめるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-workplace-naps')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文255「かさについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-umbrellas')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文253「病院の面会時間をゆるめるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-visiting-hours')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文256「ベンチについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-benches')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文254「子どものスポーツで得点をつけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-keeping-score')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文257「地図について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-paper-maps')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文255「子どもはいつ学校を始めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-school-starting-age')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文258「貝がらについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-shells')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文256「自転車のヘルメットを義務にすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-bike-helmets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文259「羽根について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-feathers')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文257「都市でハチを飼うべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-city-beekeeping')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文260「こだまについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-echoes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文258「オンラインの返品は無料であるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-free-returns')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文261「足あとについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-footprints')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文259「電車やバスでの通話を制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-phone-calls-transit')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文262「風船について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-balloons')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文260「レストランは量を少なくすべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-portion-sizes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文263「硬貨について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-coins')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文261「新車に速度制限装置をつけるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-speed-limiters')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文264「塩について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-salt')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文262「献血する人にお金を払うべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-paid-blood-donors')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文265「インクについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-ink')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文263「大学は入学試験にたよるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-entrance-exams')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文266「ろうそくについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-candles')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文264「学校で手話を教えるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-sign-language-school')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文267「おわんについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-bowls')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文265「冷房の使用を制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-air-conditioning')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文268「霧について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-fog')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文266「試験の再受験をみとめるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-exam-retakes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文269「屋根について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-rooftops')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文267「都市は車のない日を定期的に設けるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-car-free-days')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文270「パンについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-bread')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文268「教室に防犯カメラを置くべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-classroom-cameras')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文271「車輪について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-wheels')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文269「ドライブスルーを制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-drive-throughs')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文272「塔について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-towers')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文270「レストランに犬を入れてよいか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-dogs-in-restaurants')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文273「ガラスについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-glass')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文271「政府は宝くじを運営すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-state-lotteries')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文274「れんがについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-bricks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文272「店は紙のレシートをやめるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-paper-receipts')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文275「ロープについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-ropes')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文273「学生に寮生活を求めるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-campus-housing')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文276「トンネルについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-tunnels')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文274「子どものヘディングを制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-heading-ball')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文277「港について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-harbors')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文275「学校に肉なしの日を設けるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-meat-free-days')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文278「たこについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-kites')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文276「外国語はいつから学ぶべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-early-languages')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文279「ほこりについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-dust')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文277「人工芝を制限すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-artificial-turf')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文280「市場について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-markets')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文278「美術館で写真をとらせるべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-museum-photography')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文281「噴水について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-fountains')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文279「職場や学校に立ち机を置くべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-standing-desks')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文282「コケについて」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-moss')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文280「病院は健康的な食べ物だけを売るべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-hospital-food')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文283「灯台について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-lighthouses')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大専用の長文281「ガソリン式の落ち葉吹き飛ばし機を禁止すべきか」：600語以上・1文18語以上で、要約の空所補充（3つ）つき。東大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('東大').find((x) => x.id === 'todai-leaf-blowers')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
  expect(p.summary?.blanks).toHaveLength(3)
})

it('京大専用の長文284「巣について」：京大の下限600語以上・1文18語以上で、京大に出る', async () => {
  const { passageStats } = await import('./examtier')
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-nests')!
  expect(passageStats(p).words).toBeGreaterThanOrEqual(600)
  expect(passageStats(p).wps).toBeGreaterThanOrEqual(18)
})

it('東大 の長文「山火事を燃えるままにすべきか」（789語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-let-fires-burn')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「公費の研究は無料で読めるべきか」（715語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-open-access-research')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「余白について」（750語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-margins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「引き出しについて」（702語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-drawers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「沈んでいく都市の地面」（672語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-sinking-cities-groundwater')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「バラスト水の密航者たち」（637語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-ballast-water-stowaways')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「産業の時代を運んだ運河」（550語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-canal-age')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「菌とたたかう銅の力」（528語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-copper-surfaces')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「街頭の顔認証は許されるか」（742語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-facial-recognition')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「傷あとについて」（749語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-scars')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「靴について」（702語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-shoes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「壊血病の治療法をめぐる長い道のり」（632語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-scurvy-cure')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「湖が緑色に変わるとき」（624語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lakes-turn-green')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「手術が痛くなくなった日」（542語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-painless-surgery')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「氷はなぜすべるのか」（555語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-slippery-ice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「豊かな国は貧しい国から医療者を集めてよいか」（793語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-health-worker-recruitment')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「脚注について」（740語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-footnotes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「藍色の長い旅」（668語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-indigo-blue')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「マラリアと闘った樹皮」（599語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-quinine-bark')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「うるう秒は廃止すべきか」（798語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-leap-second')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「婉曲表現について」（797語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-euphemism')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「脳の半分で眠る」（655語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-half-brain-sleep')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「中央銀行はなぜ2%をめざすのか」（598語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-inflation-target')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「潮だまりの生き物たち」（454語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-rock-pools')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ムンバイの弁当配達人」（515語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-lunchbox-carriers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「家に番地がある理由」（555語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-house-numbers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「書体の静かな力」（535語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-typefaces')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「善い行いが言い訳になるとき」（664語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-moral-licensing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「鳥がV字で飛ぶ理由」（631語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-v-formation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「古い音楽は古い楽器で演奏すべきか」（790語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-old-instruments')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「パリンプセストについて」（798語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-palimpsest')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「検疫はどう生まれたか」（637語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-quarantine-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「道路の塩と川の塩」（611語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-road-salt')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「重大な犯罪に時効は必要か」（793語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-crime-time-limits')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「借りることについて」（714語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-borrowing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「正直な目撃者がまちがえるわけ」（636語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-eyewitness-memory')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「水の沸点が変わるわけ」（544語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-boiling-pressure')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ファスナーが広まるまで」（450語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-zipper-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「みんなでお金を集める」（484語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-crowdfunding')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「重い船が浮かぶしくみ」（573語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-ship-buoyancy')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「あやうい一つの品種」（662語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-banana-monoculture')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「成績のインフレ」（637語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-grade-inflation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「食料は自給すべきか」（677語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-food-self-sufficiency')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「回り道について」（655語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-detours')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「深海に降る雪」（644語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-marine-snow')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「学年をくり返すという制度」（519語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-grade-retention')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「恒星へ存在を知らせるべきか」（772語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-messaging-stars')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「拍手について」（770語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-applause')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「絶対音感のなぞ」（688語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-absolute-pitch')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「利用者をあざむくデザイン」（608語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-dark-patterns')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「いびきはなぜ起こるのか」（431語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-snoring')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「扇子の物語」（489語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-folding-fan')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「歌詞の聞きまちがい」（512語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-misheard-lyrics')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「鳴っていない電話」（509語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-phantom-vibration')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「辞書の中の幽霊語」（637語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-ghost-words')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「古いものほど長く残る？」（628語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-lindy-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「埋め立て地に都市を広げ続けるべきか」（772語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-reclaimed-land')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「延長保証について」（678語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-warranties')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「鳥は明日のために計画できるか」（596語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-jay-future-planning')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「科学者はなぜ単純な説明を好むのか」（527語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-occams-razor')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「健康な人にがん検診をすべきか」（752語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-cancer-screening')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「同じ本を訳し直すことについて」（717語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-retranslation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「根はどうやって下を知るのか」（627語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-root-gravity')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「風をとらえて家を冷やす」（563語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-windcatchers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「店内に流れる音楽」（414語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-shop-music')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「のどまで出かかった言葉」（472語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-tip-tongue')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「氷でつくる道路」（604語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-ice-roads')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「右側通行と左側通行」（642語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-road-sides')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ネタバレは本当に物語を台無しにするのか」（753語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-spoilers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「堤防が招く危険」（751語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-levee-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「自動再生は初期設定で止めるべきか」（755語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-autoplay-by-default')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「仕事の笑顔について」（757語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-the-professional-smile')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「小数がふつうになるまで」（692語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-decimal-fractions-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「アイス・ストゥーパ：冬の水を春へ」（643語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-ice-stupas-ladakh')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「公判前の拘束をアルゴリズムで決めるべきか」（788語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-pretrial-risk-scores')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「かくれんぼについて」（776語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-hide-and-seek')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「地球の年齢はどう求められたか」（689語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-age-of-the-earth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「合板の静かな成功」（617語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-plywood')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「足もとのアート」（449語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-manhole-covers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「車輪のついたかご」（409語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-shopping-cart')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「A4の形のひみつ」（548語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-paper-sizes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「砂時計が残る理由」（487語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-sand-timers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「雨は降らせられるか」（624語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-cloud-seeding')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「本物と複製」（612語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-museum-replicas')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「プロリーグは年俸に上限を設けるべきか」（771語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-salary-cap')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ガイドブックについて」（715語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-guidebooks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「細菌はどうやって仲間の数を知るのか」（621語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-quorum-sensing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「天の川をたよりに進む虫」（580語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-dung-beetle-stars')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「指導者の任期を制限すべきか」（753語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-term-limits')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「家に伝わる物について」（791語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-heirlooms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「潮の満ち引きで電気をつくる」（634語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-tidal-power')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「突然現れる巨大な波」（581語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-rogue-waves')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「嵐に名前がつく理由」（468語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-storm-names')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「オスからメスに変わる魚」（429語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-clownfish-change')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「滑走路から鳥を遠ざける」（505語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-airport-birds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「お湯のほうが早くこおる？」（490語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mpemba-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ホーソン工場で本当に起きたこと」（694語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hawthorne-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「かくそうとすると広まる」（637語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-streisand-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「在宅勤務者の監視は許されるか」（752語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-remote-monitoring')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「署名について」（720語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-signatures')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「夏のない年」（679語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-year-without-summer')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「人口はどのように高齢化するのか」（561語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-how-populations-age')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「幼稚産業は保護すべきか」（732語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-infant-industries')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「贈り物を包むことについて」（716語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-gift-wrapping')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「砂漠のアリの帰り道」（603語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-desert-ant-navigation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「こんがり焼ける化学」（542語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-maillard-reaction')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「通学路の見守り」（457語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-crossing-guards')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「風鈴の涼しい音」（438語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-furin-sound')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「黒板が消えない理由」（519語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-chalkboard-survival')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ピアノ調律という技」（533語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-piano-tuning-craft')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「港にカキを取りもどす」（686語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-oyster-restoration')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「言葉なしで道を示す」（680語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-pictogram-wayfinding')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「罰金は収入に応じて変えるべきか」（799語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-income-fines')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「遅れてくる返答について」（760語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-late-replies')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「人間の白目のなぞ」（682語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-eye-whites')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「茶葉が真ん中に集まるわけ」（637語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-tea-leaf-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「中身が減った商品に表示は必要か」（788語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-shrinkflation-warnings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「外国語の中のもう一人の自分」（773語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-second-language-self')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ゆっくり燃える火：腐食の化学」（698語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-corrosion-slow-fire')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「人を数える：国勢調査の歴史」（599語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-census-counting-people')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「生きているパン種」（413語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-sourdough-starter')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「足が描く近道」（534語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-desire-paths')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「足もとの点字ブロック」（560語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-tactile-paving')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「押しても何も起きないボタン」（686語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-placebo-buttons')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「冬を海の向こうへ運ぶ」（734語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-ice-trade')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「駐車場の設置義務はやめるべきか」（747語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-parking-minimums')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「義憤について」（751語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-indignation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「地球最大の毎日の旅」（690語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-diel-vertical-migration')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「振り子と1秒の長さ」（619語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-seconds-pendulum')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「何も見つからなかった研究を載せるべきか」（723語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-negative-results')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「砥石について」（784語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-whetstone')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「動く遺伝子と根気強い遺伝学者」（638語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-jumping-genes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「線路の幅をめぐる争い」（580語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-railway-gauge')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「駅の発車メロディー」（420語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-departure-melodies')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「飛行機の窓はなぜ角が丸いか」（503語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-round-plane-windows')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「安全が人を大胆にするとき」（628語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-risk-compensation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「急にどこでも目につく」（621語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-frequency-illusion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「見知らぬ人を助ける法的義務」（792語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-duty-to-rescue')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「乾杯について」（722語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-raising-a-glass')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「夜空はなぜ暗いのか」（650語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-dark-night-sky')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「悪いことほど重く感じるわけ」（566語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-negativity-bias')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「飲食店の衛生評価は表示すべきか」（793語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-hygiene-grades')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「森を変えたクリの胴枯病」（684語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-chestnut-blight')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ボストン糖蜜洪水」（619語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-molasses-flood')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「道路に穴があく理由」（482語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pothole-roads')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「指を鳴らす音の正体」（460語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-knuckle-cracking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「目覚めたあとのぼんやり」（529語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-sleep-inertia')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「海に落ちたおもちゃが教えたこと」（542語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-bath-toys-ocean')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「索引の静かな歴史」（667語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-book-index')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「だれを先に治療するか」（650語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-triage-priority')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「受診のたびに少額を払うべきか」（722語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-visit-copayments')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「肩をすくめることについて」（709語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-the-shrug')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「離岸流の見えない力」（664語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-rip-currents')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「記録紙の上の信号」（596語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-pulsar-discovery')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「空から鉛入り燃料をなくすべきか」（797語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-leaded-avgas')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「保留にされることについて」（793語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-hold')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ソバがたどった道」（694語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-buckwheat-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「プレーリードッグの警戒音」（583語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-prairie-dog-calls')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「橋にすき間がある理由」（437語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bridge-expansion-joints')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「世界の子守歌」（421語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-lullabies-world')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「手品師は注意をあやつる」（507語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-magic-misdirection')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「雪を読む：雪崩の予測」（511語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-avalanche-forecast')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「新しい言語が生まれるとき」（640語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-pidgin-creole')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「群衆が危険になるとき」（660語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-crowd-crush-safety')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「競業避止契約は禁止すべきか」（792語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-non-compete-clauses')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「洗濯ばさみについて」（790語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-clothes-pegs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「鋼鉄が安くなるまで」（695語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-bessemer-steel')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「人の顔を読むヤギ」（606語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-goats-human-faces')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「量刑の前に被害者は語るべきか」（784語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-victim-statements')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「聞こえてしまう言葉について」（727語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-overhearing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「果樹の接ぎ木という古い技術」（696語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-fruit-grafting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「砂漠の岩をおおう黒い膜」（582語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-desert-varnish')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「静かな車に音をつける」（542語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-quiet-car-sounds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「山道の道しるべを読む」（488語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-trail-markers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「フォーチュンクッキーの日本のルーツ」（608語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-fortune-cookie-roots')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「メトロノームの物語」（622語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-metronome-story')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「生き物につける二語の名前」（757語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-naming-species')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「脳なしで問題を解く粘菌」（717語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-slime-mold-mind')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「答案は名前を伏せて採点すべきか」（694語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-anonymous-marking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「刈った草のにおいについて」（711語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-cut-grass')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「塩と砂糖と水：コレラの治療」（665語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-oral-rehydration')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「夏ごとに消える池」（549語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-vernal-pools')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「都市にロープウェイは必要か」（775語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-urban-cable-cars')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「人の言葉を引き取ること」（781語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-finishing-sentences')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「結び目を数えて船の速さを測る」（700語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-log-line-knot')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ムクドリの群れはなぜそろうのか」（595語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-starling-murmurations')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ペーパータオルか、ハンドドライヤーか」（472語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hand-drying')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「樹皮をくり返しくれる木」（454語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-cork-harvest')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「スピーチの前にひざがふるえるわけ」（504語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-stage-fright')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「人間そっくり、でも何かがちがう」（482語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-uncanny-valley')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「最初の数字のふしぎな法則」（725語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-benford-law')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「とけるろうで金属を形作る」（639語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-lost-wax')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「最初から総額を表示させるべきか」（791語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-drip-pricing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「両手で渡すことについて」（785語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-both-hands')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「トルティーヤに隠された古代の化学」（689語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-nixtamalization')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「熱いフライパンで水が踊るわけ」（611語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-leidenfrost')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「自然の損失は別の場所で償えるか」（794語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-biodiversity-offsets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「小さくなった場所」（785語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-places-grown-smaller')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「波を描いた地図」（693語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-marshall-stick-charts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「熱を見るヘビ」（640語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-pit-viper-heat')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「生のパイナップルで口がひりひりするわけ」（418語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pineapple-sting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「通りすぎるサイレンの音の変化」（400語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-siren-pitch')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「機内食の味がうすく感じるわけ」（534語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-airplane-taste')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「雨のあとの香り」（560語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-petrichor')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「弦楽四重奏の問題」（683語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-cost-disease')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「古い部品、新しい役割」（663語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-exaptation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「建物でなく土地に課税すべきか」（766語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-land-value-tax')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「図書館の本の日付票について」（756語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-date-slips')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「空気の重さを量る：気圧計の歴史」（632語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-barometer-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「においで獲物を探す植物」（610語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-dodder-host-search')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「わざと負けるチームを罰するべきか」（783語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-tanking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「食べられて消える料理について」（758語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-vanishing-meal')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「トルコ赤の秘密の製法」（624語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-turkey-red')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「冷たい空に浮かぶ光の輪と幻日」（622語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-sun-halos')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「文字に色が見える人たち」（510語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-letter-colors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「地面を伝わるゾウのメッセージ」（457語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-elephant-rumbles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「割れた窓は犯罪を招くのか」（602語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-broken-windows')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「そのさくを取りはらう前に」（619語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-chesterton-fence')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「砂粒いくつで砂山になるか」（769語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-heap-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「親は子を相続から外してよいか」（772語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-disinherit-children')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「乗り換えについて」（772語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-changing-trains')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「速記の歴史」（687語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-shorthand-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「温泉の細菌とPCR」（612語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-thermus-aquaticus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「食料援助は現地で買うべきか」（794語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-local-food-aid')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「自転車のサドルから手を離すこと」（719語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-letting-go-saddle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「グアノの時代」（698語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-guano-age')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「船を引きとめる海」（620語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-dead-water')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「音楽のサンプリングに許可は必要か」（788語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-music-sampling')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「リノリウムの盛衰」（677語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-linoleum')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「イセエビの磁気の地図」（610語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-lobster-magnetic-map')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「蘇生の場に家族は立ち会うべきか」（796語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-family-resuscitation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「編みかけのセーターについて」（763語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-half-finished-sweater')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「指揮棒の誕生」（673語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-conductors-baton')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「耳がつまるしくみ」（641語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-ears-pop')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ポップコーンがはじけるわけ」（493語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-popcorn-pops')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「紙芝居の物語」（453語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-kamishibai')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「沈没船から出てきた計算機」（570語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-antikythera')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「かたむいた塔を救う」（574語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-pisa-tower')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「全体と部分が食いちがうとき」（685語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-simpson-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「海岸線の長さはどれだけか」（667語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-coastline-length')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「選挙区の線は独立委員会が引くべきか」（799語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-independent-redistricting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ターンパイク・トラストとイギリスの道路」（681語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-turnpike-trusts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「イチジクとイチジクコバチ」（598語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-fig-and-wasp')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ウォンバットの四角いふん」（513語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-wombat-cubes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「逃げ水と蜃気楼」（492語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-road-mirage')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「大人にならないサンショウウオ」（648語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-axolotl-regrowth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「海でいちばん速いパンチ」（647語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mantis-shrimp')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「湖がガスを吐いた夜」（762語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-lake-nyos')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「カメレオンの色の本当の意味」（720語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-chameleon-colors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「失業給付に求職の条件をつけるべきか」（796語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-benefit-conditionality')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ドアを押さえることについて」（705語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-holding-the-door')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ひっかいて鉱物を並べる：モース硬度」（694語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-mohs-hardness-scale')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「止まった岩がのぼって見えるとき」（597語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-waterfall-illusion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ペンネームの理由」（483語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pen-names')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「文字を書く向き」（454語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-writing-direction')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「だれでも直せるソフトウェア」（539語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-open-source')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「三人で動かす人形」（536語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-bunraku')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「死後に残るデジタルの記録」（653語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-digital-afterlife')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「人がさける数字」（661語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-unlucky-numbers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「美術館は所蔵品を売ってよいか」（778語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-museum-deaccession')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「夕暮れについて」（777語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-dusk')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ワクチンなしで病気に打ち勝つ」（679語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-guinea-worm-campaign')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「マルハナバチは花の電気を感じる」（632語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-bumblebee-electric-fields')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「不景気と小さなぜいたく」（408語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-lipstick-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「コーヒーのしみのなぞ」（442語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-coffee-ring')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「複利の静かな力」（550語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-compound-interest')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ストレスとおやつの関係」（497語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-stress-eating')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「教師の期待と生徒の成長」（643語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-teacher-expectations')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「都会の人はなぜ速く歩くのか」（625語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-city-walking-pace')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「作付けしない農地にお金を払うべきか」（792語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-farmland-set-aside')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「鼻歌について」（786語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-humming')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ガス灯を生きのびさせたマントル」（694語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-gas-mantle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「こおらない魚」（626語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-antarctic-antifreeze-fish')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「山の向こう側が乾く理由」（478語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-rain-shadow')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「大会前に練習を減らす理由」（447語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-tapering')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「プライベートブランドの静かな広がり」（574語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-store-brands')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「「当たっている選手」は本当にいるのか」（584語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hot-hand')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「画面が昔の物をまねる理由」（741語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-skeuomorphism')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「会話の一瞬のタイミング」（748語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-turn-taking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「AIを発明者と認めるべきか」（780語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ai-named-inventor')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「箱に入ったままの贈り物」（712語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-the-unused-gift')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「雨量計の歴史」（606語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-history-of-rain-gauge')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「一日に何千回も眠るペンギン」（581語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-penguin-microsleeps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ティーバッグの歴史」（477語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-tea-bag')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「退職面談の本音」（505語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-exit-interviews')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「その名言はだれのもの？」（502語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-misattributed-quotes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「グラフの軸はどこから」（628語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-truncated-axes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「警報が雑音になるとき」（631語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-alarm-fatigue')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ユースホステルの始まり」（398語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-youth-hostels')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「店がクーポンを配る理由」（441語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-coupons')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「こげつかないフライパンの誕生」（552語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-nonstick-pans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「グループ作業の手抜き」（494語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-group-projects')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「食べ放題がもうかるしくみ」（608語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-buffet-economics')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ほとんど空気でできた固体」（608語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-aerogel')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「処方薬の一般向け広告」（749語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-drug-advertising')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「見知らぬ人の筆跡」（783語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-stranger-handwriting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「産科鉗子と一族の秘密」（696語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-chamberlen-forceps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「待つことができるコウイカ」（643語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-cuttlefish-waiting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「健康な人をわざと感染させてよいか」（787語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-challenge-trials')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「古い住所録について」（783語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-address-book')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ベルリンで偶然生まれた青」（691語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-prussian-blue')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「危険な姿を借りる生き物」（559語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-batesian-mimicry')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「北極星の見つけ方」（488語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-north-star')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「家から家へ回る回覧板」（453語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-kairanban')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「トランプの長い旅」（559語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-playing-cards')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「シャドーイングで学ぶ」（524語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-shadowing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「陽性の結果が私たちを惑わすとき」（681語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-base-rate-neglect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「教材から生まれたパズル」（641語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-rubiks-cube')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「罪を認めた人の刑を軽くすべきか」（759語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-plea-bargaining')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「廊下の肖像画について」（721語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-hallway-portrait')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「1582年に消えた10日間」（692語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-gregorian-calendar')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「身内を見分ける根」（558語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-root-kin-recognition')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ごみ袋を持って走る」（437語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-plogging')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「水でうがいをする」（389語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-gargling')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「畑の三姉妹」（538語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-three-sisters')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「割れてもくずれないフラスコ」（504語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-safety-glass')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「極端な結果が続かない理由」（661語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-regression-to-the-mean')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「小さな標本の落とし穴」（626語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-small-samples')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「後払い決済を借金として規制すべきか」（787語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-buy-now-pay-later')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「心の中で数えることについて」（792語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-silent-counting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「三角形で国土をはかる」（641語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-triangulation-survey')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「若い鳴き鳥に先生が必要なわけ」（612語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-songbird-tutors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「空気で運ばれた手紙」（504語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pneumatic-tube-post')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「窓に税金がかかった時代」（473語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-window-tax')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「お金の「心の財布」」（602語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mental-accounting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「電話交換手という仕事」（564語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-switchboard-operators')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「岸のない海」（718語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-sargasso-sea')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「仕事を内側から作り変える」（691語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-job-crafting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「かけまちがいの電話について」（708語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-wrong-numbers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「水道水に塩素を入れた歴史」（601語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-chlorinated-water')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「海をこえて広がるクジラの歌」（609語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-humpback-song-waves')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「掃除機の歩み」（451語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-vacuum-cleaner-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「運動中に足がつるのはなぜか」（432語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-muscle-cramps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「真冬に船を燃やす祭り」（548語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-up-helly-aa')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「小さな承諾が大きな承諾を生む」（536語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-foot-in-the-door')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「バイオ炭で炭素を土にとじこめる」（648語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-biochar-soil')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「小さな失敗が好感を生むとき」（647語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-pratfall-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「学級の人数は法律で制限すべきか」（789語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-class-size-caps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ちぎれた半券について」（798語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-ticket-stub')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「重い犂と村のかたち」（686語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-heavy-plough')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「熱の球でスズメバチと戦うニホンミツバチ」（642語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-hornet-heat-ball')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ロケットが東へ向かうわけ」（488語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-rockets-head-east')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「日本の学校はなぜ4月始まりか」（459語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-school-year-april')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「都市の川で再び泳ぐ」（500語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-city-river-swimming')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「記憶の宮殿を歩く」（717語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-memory-palace')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「体育が教科になるまで」（608語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-pe-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「企業は取引先の人権侵害に責任を負うべきか」（746語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-supplier-duty')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「最後に去るということ」（690語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-last-to-leave')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「言葉で風をはかる：ビューフォート風力階級」（683語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-beaufort-wind-scale')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「触れると葉を閉じる植物」（564語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-sensitive-plant')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「風が吹くと寒く感じるわけ」（466語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-wind-chill')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ガラスに刻む模様」（410語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-edo-kiriko')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「人力車の盛衰」（552語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-rickshaw-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「牛乳を消化できない大人がいるわけ」（589語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-lactase-persistence')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「「なぜなら」の説得力」（727語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-because-requests')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「関節の痛みで雨はわかるのか」（704語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-weather-joint-pain')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「先発薬をジェネリックに切りかえるべきか」（792語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-generic-swap')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「何年も読みまちがえていた語」（723語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-misspoken-word')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「空気の箱で川底を掘る」（618語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-pneumatic-caisson')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「虫を撃ち落とす魚」（602語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-archerfish-shot')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「選択にかくれた値段」（548語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-opportunity-cost')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「スマホが文を先に書く」（446語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-predictive-text')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「高層ビルのハヤブサ」（573語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-city-peregrines')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「光の祭りディワリ」（548語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-diwali-lights')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「集団はなぜ知っていることばかり話すのか」（742語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hidden-profiles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「月餅と中秋の名月」（778語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-mooncakes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「柱の鉛筆の印について」（772語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-doorframe-marks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「穴あきカードを読む織機」（697語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-jacquard-loom')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「たい肥の熱で卵をあたためる鳥」（643語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-malleefowl-mound')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「バレーボールのはじまり」（525語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-how-volleyball-began')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「耳あかはそのままで」（492語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-leave-earwax-alone')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「分解できるように建てる」（583語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-buildings-made-to-come-apart')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「「5秒ルール」を確かめる」（566語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-five-second-rule')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「もう変わらないと思いこむ心」（681語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-end-of-history-illusion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ゴルフはなぜ18ホールか」（741語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-eighteen-holes-of-golf')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「メッセージアプリの相互接続は義務にすべきか」（780語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-messaging-interoperability')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「通りすぎる列車に手を振ること」（789語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-waving-at-trains')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「貝から生まれた紫」（688語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-tyrian-purple')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「羽のないクモが空を飛ぶしくみ」（645語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-ballooning-spiders')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「王がつくった文字」（510語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hangul-alphabet')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ロンドンの暗い五日間」（488語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-great-smog-london')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「飛行を記録するオレンジの箱」（545語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-flight-recorder')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「どの国のものでもない言語」（572語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-esperanto-dream')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「うまくいかなくなるまで昇進する」（671語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-peter-principle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「酵母なしでふくらむ菓子」（661語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-chemical-leavening')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「サッカークラブはサポーターが所有すべきか」（790語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-fan-owned-football-clubs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「みかんの皮をむくこと」（747語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-peeling-an-orange')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「地震計の歴史」（690語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-history-seismograph')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「目から血を飛ばすトカゲ」（577語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-horned-lizard-blood')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「海底にしずんだクジラ」（537語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-whale-fall')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「金星が水星より熱いわけ」（501語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-venus-heat')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ビルのあいだの小さな公園」（610語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-pocket-parks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「スタンプカードの力」（580語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-stamp-cards')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「注射器がたどった長い道」（726語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hypodermic-syringe')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「だれにも見えない質量」（732語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-dark-matter')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「小麦粉に葉酸を加えるべきか」（790語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-folic-acid-flour')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「しずくの落ちる蛇口について」（738語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-dripping-tap')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「打ち間違いを塗りつぶした秘書」（671語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-correction-fluid')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「羽毛で水を運ぶ鳥」（618語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-sandgrouse-water')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「川はなぜ曲がるのか」（461語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-river-meanders')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「テーブルの上の小さな世界」（422語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-model-railways')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ワイパーを考えた女性」（560語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-windshield-wiper')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「席がえの意味」（536語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-seat-changes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「すべりやすい坂はどこまで続くか」（699語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-slippery-slope')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「あぶみと騎士」（694語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-stirrup')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「解雇の代わりに労働時間を減らす企業に公費を出すべきか」（736語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-short-time-work')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「輪ゴムについて」（735語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-rubber-bands')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「圧力鍋がたどった長い道」（667語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-pressure-cooker')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「テナガザルはなぜいっしょに歌うのか」（589語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-gibbon-duets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「アボカドと消えた相棒」（468語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-avocado-seed-mystery')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「全身で味わう魚」（467語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-catfish-taste')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ランドセルの歩み」（506語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-randoseru-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「気づかずに使う電気」（503語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-standby-power')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「たとえは理由になるか」（648語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-arguing-by-analogy')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「サツマイモがたどった長い道」（654語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-sweet-potato-japan')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「水の権利は売り買いされるべきか」（738語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-water-markets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ふるいについて」（704語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-sieves')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「話す塔：腕木通信」（630語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-optical-telegraph')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「食事を分け合うチスイコウモリ」（521語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-vampire-bat-sharing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「瞬間冷却パックのしくみ」（439語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-instant-cold-packs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「お金のかわりに時間を預ける」（473語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-time-banks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ブルースと出会ったポケットの楽器」（524語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-harmonica-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「スタートラインの0.1秒」（521語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-false-start-rule')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「なじみの店か、新しい店か」（686語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-explore-exploit')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ドラム缶から国の楽器へ」（632語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-steelpan-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「誤答に減点する試験は正しいか」（772語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-negative-marking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「指ぬきについて」（701語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-thimbles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ダゲレオタイプと完璧な画像の代償」（687語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-daguerreotype')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ヤドカリの家の交換」（610語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-hermit-crab-vacancy-chains')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「交番という仕組み」（452語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-koban-police-boxes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「東と西で違う電気」（429語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-japan-two-frequencies')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「インスリンの発見」（555語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-insulin-discovery')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「シャトルの科学」（539語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-shuttlecock-feathers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「逆流する川と呼吸する湖」（693語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tonle-sap-lake')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「敵対的メディア効果」（682語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hostile-media-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「図書館の貸出に作家への支払いは必要か」（797語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-public-lending-right')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「文鎮について」（798語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-paperweights')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「計算尺の盛衰」（698語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-slide-rule-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ワニの敏感な皮膚」（610語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-crocodile-dome-receptors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「天井の高さと考え方」（425語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-ceiling-height-thinking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「卵白が泡になるわけ」（507語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-egg-white-foam')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「熟練の手が急に動かなくなるイップス」（569語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-yips-in-sport')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「かやぶき屋根の技を守る」（571語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-kayabuki-thatching')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「蚊の駆除と公共財の経済学」（742語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-mosquito-control-economics')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「動かずに練習する運動イメージ」（735語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-motor-imagery-sport')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ちょうつがいについて」（763語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-hinges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「曇り空が明かした放射能」（658語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-becquerel-cloudy-days')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「わざと受粉させるガ」（563語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-yucca-moth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「外国籍住民に地方選挙権を認めるべきか」（737語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-noncitizen-local-vote')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ふたについて」（668語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-lids')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「潮を予報した真ちゅうの機械」（608語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-tide-predicting-machines')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「潮の時間を刻む海辺の生き物」（544語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-tidal-clocks-shore-animals')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「いちばん早い日の入り」（498語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-earliest-sunset')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「やってくる図書館」（470語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-mobile-library')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「質屋の歴史」（625語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-pawnshop-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「「元に戻す」の力」（557語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-undo-command')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「値段をつけられないもの」（687語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-taboo-tradeoffs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「夕方5時のメロディー」（659語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-evening-chime')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「健康報道は絶対リスクで伝えるべきか」（797語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-absolute-risk-reporting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「マッチについて」（697語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-matchsticks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「金から生まれる赤：金赤ガラスの色のしくみ」（632語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-gold-ruby-glass')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「体でつくる橋：グンタイアリの道づくり」（589語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-army-ant-living-bridges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「春にやってくる黄砂」（498語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-yellow-sand-spring')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「手ぬぐいの知恵」（509語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-tenugui-cloth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「山から吹きおりる熱い風」（645語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-foehn-wind-heat')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「かつお節ができるまで」（628語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-katsuobushi-flakes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「めんをすする音」（773語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-slurping-noodles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「踏切の前で待つこと」（762語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-railway-crossing-gates')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「無罪判決をやり直すべきか」（786語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-double-jeopardy-retrial')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「糸巻きについて」（767語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-spools-of-thread')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「紙の中の絵：透かしの歴史」（686語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-paper-watermarks-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「貝の中の育児室：タナゴと二枚貝」（641語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-bitterling-mussel-nursery')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「まだないワクチンの購入を約束すべきか」（794語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-advance-market-commitments')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「氷について」（792語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-ice-cubes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「村で直せる手押しポンプ」（699語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-india-mark-ii-pump')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「キャベツの葉の中の「からし油爆弾」」（582語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-mustard-oil-bomb')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「地球でいちばん古い湖」（492語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-lake-baikal')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ひとつまみのヨウ素」（495語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-iodized-salt')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「世界に広まった種」（563語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-quinoa-boom')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「サモワールとロシアの茶」（579語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-russian-samovar')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「規範の強い社会、ゆるい社会」（705語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tight-loose-cultures')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「アフリカを横切る木の壁」（705語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-great-green-wall')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「従業員は取締役を選ぶべきか」（732語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-worker-directors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ブックエンドについて」（695語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-bookends')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「自動ピアノと記録された演奏」（692語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-player-piano-rolls')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「アカガニの大移動」（592語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-red-crab-migration')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「燃料補助金は廃止すべきか」（794語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-fuel-subsidy-reform')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「コートかけについて」（736語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-coat-hooks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ガタパーチャと海底電信」（652語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-gutta-percha')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ミヤコドリの貝の開け方」（588語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-oystercatcher-shells')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「血液をきれいにする機械」（522語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-artificial-kidney')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「土星の環」（512語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-saturn-rings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「移籍市場を変えたサッカー選手」（631語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-bosman-ruling')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ボールペンの誕生」（633語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-ballpoint-pen')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「理由なき仲間びいき」（760語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-minimal-groups')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「見つかった惑星と存在しなかった惑星」（720語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-neptune-and-vulcan')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「発見物に報奨金を払うべきか」（784語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-metal-detecting-rewards')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「巻き尺について」（788語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-tape-measures')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「瞳の奥を見る――検眼鏡の発明」（681語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-ophthalmoscope-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「深海魚はなぜ水圧に耐えられるのか」（638語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-deep-sea-fish-pressure')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「フリスビーの誕生」（543語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-frisbee-pie-tins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「都市とアマツバメ」（512語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-city-swifts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「生まれ順と性格」（583語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-birth-order-myth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「失われた言葉と脳」（724語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-aphasia-brain-maps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ピンボールを解放した一打」（693語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-pinball-skill-chance')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「警察はジオフェンス令状を使ってよいか」（799語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-geofence-warrants')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「名札について」（782語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-name-tags')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「からざおから機械へ：脱穀の歴史」（692語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-history-of-threshing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「脳のない眠り：逆さクラゲ」（616語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-sleeping-jellyfish')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ドアストッパーについて」（797語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-doorstops')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「金網の中の炎：炭鉱の安全灯」（696語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-davy-safety-lamp')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「木にたたきこむ合図：キツツキのドラミング」（582語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-woodpecker-drumming')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「切ったリンゴが茶色くなるわけ」（513語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-apple-browning')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「バスケットボールを救った時計」（487語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-shot-clock')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「金細工師が銀行家になるまで」（612語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-goldsmith-bankers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「畑の味方のすみか「ビートルバンク」」（555語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-beetle-banks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「目で聞く――マガーク効果」（722語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-mcgurk-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「小さい箱のほうが重く感じるのはなぜか」（678語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-size-weight-illusion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「イベリアオオヤマネコの復活」（458語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-iberian-lynx-return')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「目の前の変化に気づかない」（458語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-change-blindness')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「海に挑むボランティア：救命ボートの歴史」（566語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-lifeboat-service-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「行かないジムにお金を払う」（561語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-gym-membership-economics')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「当たり前だった手術の盛衰」（681語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tonsillectomy-rise-fall')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「機器に覚えてもらうこと」（648語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-memory-offloading')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「論文の査読者に報酬を払うべきか」（785語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-paid-peer-review')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「じょうごについて」（783語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-funnels')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「飛んだ杼：ジョン・ケイと織物の速さ」（694語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-flying-shuttle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「顔についた熱交換器：トナカイの鼻」（648語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-reindeer-noses')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「都会にすむ緑のインコ」（445語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-city-parakeets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「マヨネーズが分離しないわけ」（514語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mayonnaise-emulsion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「「送料無料」に引かれる心理」（527語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-free-shipping-pull')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「色を言うのをじゃまする文字」（642語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-stroop-interference')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ひとつだけ違うものは記憶に残る」（640語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-isolation-effect-memory')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「市の予算の一部を住民が決めるべきか」（788語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-participatory-budgeting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「コースターについて」（795語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-coasters')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「空気中の見えない水をはかる」（678語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-hygrometer-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「真水なしで生きる海鳥」（647語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-seabird-salt-glands')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「提出が遅れた課題は減点すべきか」（742語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-late-coursework-penalties')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「万華鏡について」（797語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-kaleidoscopes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「カーボン紙の歴史」（694語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-carbon-paper-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「カレイの目はなぜ片側にあるのか」（616語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-flatfish-eye-migration')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「自分で熱をつくる花」（444語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-flowers-make-heat')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「肩を並べて語る作業小屋」（466語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-mens-sheds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「みんなの乗り物 乗合馬車のはじまり」（657語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-omnibus-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「車の色が白・黒・灰色ばかりの理由」（540語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-car-color-choices')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「他人も自分と同じだと思いこむ心理」（655語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-false-consensus-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「木は傷を壁で囲いこむ」（715語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tree-wound-walls')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「だれにでもわかる2つの色」（492語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-football-yellow-red-cards')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ただで旅をする魚」（491語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-remora-sucking-disc')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ひづめの下の鉄：装蹄師の技」（615語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-farrier-horseshoe-craft')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「寝不足だと食べすぎるわけ」（536語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-short-sleep-appetite')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「「ゼロ」の心地よい魅力」（717語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-zero-risk-bias')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「鼻先の小さな穴：サメが電気を感じるしくみ」（755語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-shark-electric-sense')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「広告でライバルの名前を出してよいか」（794語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-comparative-ads')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ホッチキスについて」（726語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-staplers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「大地に刻まれた正方形：ローマの測量師とグローマ」（688語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-roman-groma')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「イラクサの小さな注射針」（585語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-nettle-stings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「目をそらして暗い星を見る」（436語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-averted-vision-stars')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「町をつなぐわらの綱」（464語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-rope-festival-kawanobe')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ミシンが家庭に来るまで」（527語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-sewing-machine-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「雲の中で生きる森」（572語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-cloud-forest-water')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「読書中の目の本当の動き」（715語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-reading-eye-movements')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「読むために必要な語の数」（705語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-lexical-coverage-reading')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「遅れて来た観客を入れるべきか」（799語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-latecomer-admission')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ビー玉について」（790語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-marbles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「七宝焼き（クロワゾネ）の歴史」（697語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-cloisonne-enamel')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「キーウィのくちばしの感覚」（648語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-kiwi-bill-touch')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「レモネードの長い旅」（488語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-lemonade-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「チャイムのない一週間」（404語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bell-free-week')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ヒキガエルのおなかから逃げ出す虫」（543語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-bombardier-beetle-toad')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「パン屋で仕事を入れかえる」（518語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-bakery-job-rotation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「楽しみと義務を組み合わせる」（717語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-temptation-bundling')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「海がつくる雪」（687語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-sea-effect-snow')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「研究助成で大学の間接経費を払うべきか」（764語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-grant-overheads')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「靴べらについて」（758語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-shoehorns')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「種まき機（シードドリル）の歴史」（692語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-seed-drill-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「アザラシはひげで見えない跡をたどる」（628語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-seal-whisker-trails')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「飾りつけをする鳥ニワシドリ」（503語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bowerbird-decorations')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「テディベアの名前の由来」（509語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-teddy-bear-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「人を30分借りる図書館」（572語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-human-library-loans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「川をさかのぼる波　海嘯」（568語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-tidal-bore-waves')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「最初と最後は覚えている　系列位置効果」（711語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-serial-position-memory')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「標準になったチェスの駒」（706語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-staunton-chess-pieces')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「飛行機の座席は倒せるべきか」（797語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-reclining-seats')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ピンセットについて」（742語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-tweezers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ライムライトの輝き」（635語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-limelight-stage')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「川底の建築家トビケラ」（600語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-caddisfly-cases')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「町の声をつないだ無線部」（531語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-radio-club-drill')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「画びょうの小さな歴史」（514語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-thumbtack-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「トウモロコシ畑に生まれた火山」（610語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-paricutin-volcano')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「鉛筆削りの歩み」（594語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-pencil-sharpener-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「注意にひそむ半秒のすき間」（731語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-attentional-blink')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「シャチのおばあさんの役割」（690語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-orca-grandmothers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「フォアグラは禁止すべきか」（796語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-foie-gras-ban')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ハンガーについて」（744語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-coat-hangers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「CQD から SOS へ：海の救難信号」（660語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-cqd-to-sos')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「盗んだ毒針で身を守るウミウシ」（632語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-nudibranch-stolen-stings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「泥の上で暮らす魚」（462語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-mudskipper-land-fish')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「おろし金の歴史」（560語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-grater-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「星の海に流した手紙」（572語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-voyager-golden-record')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「一人の顔が百万人より心を動かす理由」（662語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-identifiable-victim')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「鏡の前の小さな魚」（702語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-cleaner-wrasse-mirror')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「カード払いの上乗せ料金は認めるべきか」（737語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-card-surcharges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「水準器について」（695語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-spirit-levels')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「息を測る：スパイロメーターの歴史」（608語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-spirometer-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「巻きひげはどうやって支えをつかむのか」（542語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-tendril-coiling')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「しっぽを残して逃げるトカゲ」（464語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-lizard-tail-drop')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「十人で一つのリズム」（412語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-centipede-race-sports-day')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「カフスボタンの歴史」（503語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-cufflinks-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「海をはかる白い円盤」（527語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-secchi-disk-clarity')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「声に出すと覚えやすいわけ」（624語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-production-effect-aloud')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「バケツではかった海水温」（644語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-bucket-sea-temperature')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「投票用紙の名前の順番はくじで決めるべきか」（784語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ballot-name-order')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「虫めがねについて」（775語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-magnifying-glasses')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「土をつき固めた壁：版築の歴史」（692語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-rammed-earth-walls')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「追い風を待つ渡り鳥」（625語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-birds-wait-for-wind')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「一日だけの虫の長い一生」（487語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-mayfly-life')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「使い終わった油で走る町のバス」（455語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-cooking-oil-bus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ギターのネックの小さなクリップ」（548語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-guitar-capo')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「さまよう巨石」（507語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-glacial-erratics')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「すりばちの底で待つ狩人」（641語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-antlion-pits')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「集団の中の顔はなぜよく見えるのか」（607語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-cheerleader-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「格闘技は減量を規制すべきか」（799語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-weight-cutting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「くしについて」（767語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-combs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「線をなぞって面積をはかる道具」（698語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-polar-planimeter')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「最も深く潜るクジラ」（581語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-beaked-whale-dives')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「泥のかべの向こうの母鳥」（440語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hornbill-sealed-nest')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「アヒルを一羽も残さずに」（421語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-river-duck-race')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「二つの小さな穴：穴あけパンチの物語」（500語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hole-punch-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「やかんの中の白いかたまり」（504語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hard-water-scale')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「受けるか断るか：最後通告ゲームが明かすもの」（616語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-ultimatum-game')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「わが子ではなく弟や妹を育てる鳥」（641語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-helpers-at-the-nest')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「科学ニュースの報道解禁制度は廃止すべきか」（796語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-science-embargo')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「排水管の曲がり：トラップの歴史」（682語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-toilet-trap')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ハエの小さな平衡器官」（578語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-fly-halteres')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「アリが植える花」（544語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-ants-plant-seeds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「果物救出の日」（505語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-fruit-rescue-day')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「パックはなぜ平らか」（621語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hockey-puck-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「砂の城を支えるもの」（589語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-wet-sand-strength')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「花をふるわせるハチ」（734語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-buzz-pollination')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「戸口で忘れるわけ」（738語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-doorway-forgetting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「歴史的な蒸気機関車は走らせ続けるべきか」（734語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-historic-locomotives')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「エプロンについて」（750語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-apron')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「カメラ・ルシダ　プリズムで描く道具」（690語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-camera-lucida')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「水の上を走るトカゲ」（588語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-basilisk-water-running')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「魚をくわえて運ぶ鳥」（509語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-puffin-beak-fish')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「天気のことばの交流」（474語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-weather-words-exchange')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「乗らないための切符」（623語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-platform-ticket-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「餅はなぜのびる」（607語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mochi-stretch')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「水中で静止するマナティー」（771語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-manatee-buoyancy')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「みんながみんなを読みちがえるとき」（740語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-pluralistic-ignorance')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「車の盗難警報は禁止すべきか」（749語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-car-alarms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ヘアピンについて」（698語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-hairpins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「石に描く：リトグラフの始まり」（604語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lithography-stone')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「洞窟魚はなぜ目を失うのか」（585語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-cavefish-eyes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「茎をつたわる虫のメッセージ」（434語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-treehopper-plant-signals')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「「分」で測る町の地図」（434語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-minutes-map-project')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「羽ばたきの長い歴史」（537語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-feather-duster-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「日没後に光る雲」（516語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-noctilucent-clouds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「新しいことばを子どもはどう当てるか」（685語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-mutual-exclusivity-words')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「雪原のように光る海」（660語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-milky-seas-glow')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「公的記録は名前のアクセント記号を残すべきか」（792語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-official-name-marks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ほうきについて」（763語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-brooms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「革命期フランスの十時間制」（627語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-decimal-time-france')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「小翼羽――鳥の小さな親指の翼」（560語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-bird-alula')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「卵パックの誕生」（441語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-egg-carton')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「二ページ目の訂正欄」（418語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-student-paper-corrections')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「芝生の輪「フェアリーリング」」（526語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-fairy-rings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「「もし〜なら」の計画の力」（553語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-if-then-plans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「カーリングのストーンはなぜ曲がるのか」（784語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-curling-stone-physics')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「アリをあやつる菌」（688語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-zombie-ant-fungus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「死期の近い患者に未承認薬を試す権利を認めるべきか」（795語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-right-to-try')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「風見について」（793語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-weathervanes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「塔から外へ伸びる橋：カンチレバー橋」（693語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-cantilever-bridges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ホシバナモグラと触覚の速さ」（627語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-star-nosed-mole')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「水の中でくらすクモ」（493語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-diving-bell-spider')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「二つの祭りがつないだホームステイ」（542語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-homestay-two-festivals')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「階段をおりるばね」（608語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-slinky-walking-spring')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「シリアルが集まるわけ」（603語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-cheerios-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ゴムの手の錯覚」（791語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-rubber-hand-illusion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「アマゾンの生きた電池」（769語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-electric-eel-shock')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「大きなスポーツ大会は無料放送に残すべきか」（741語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-free-sport-tv')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「靴ひもについて」（713語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-shoelaces')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「旋律を線の上に：五線譜のはじまり」（657語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-guido-staff')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「牧草の中にかくれた相棒」（531語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-fescue-endophyte')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「水を飲まないネズミ」（446語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-kangaroo-rat-water')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「忘れられた自転車の第二の人生」（420語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bike-repair-club')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「煙感知器の意外な始まり」（548語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-smoke-alarm-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「自分を作りかえる砂漠の低木」（545語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-creosote-rings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「歌う砂丘のなぞ」（726語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-singing-dunes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「小さな前進の静かな力」（684語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-progress-principle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「子豚の断尾は禁止すべきか」（796語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-piglet-tail-docking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ナプキンについて」（756語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-napkins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「待つことを覚えたスプリンクラー」（699語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-fire-sprinkler-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「小さな昆虫の羽ばたきの秘密」（643語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-clap-and-fling')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ナキウサギの冬じたく」（442語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pika-haypiles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「広いグラウンドで音をそろえる」（430語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-school-marching-band')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「魔法びんの歴史」（558語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-vacuum-flask-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「地面にとどかない雨」（541語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-virga-vanishing-rain')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「絵をかくと覚えられる」（678語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-drawing-effect-memory')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「雪とともに生きる鳥ライチョウ」（685語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-ptarmigan-snow-life')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「採用で信用情報を調べるべきか」（762語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-employer-credit-checks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「おたまについて」（798語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-ladles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「火を使わない銀の精錬―パティオ法」（685語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-patio-process-silver')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「のどで子を育てるダーウィンガエル」（590語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-darwins-frog-brooding')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「家に帰るカサガイ」（536語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-limpets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「昼食は前の日に注文」（504語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-canteen-preorder')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「日没の緑の光」（633語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-green-flash')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「インデックスカードの歴史」（544語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-index-cards')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ささいなことほど長引く議論」（711語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-law-of-triviality')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ホヤに隠された歴史」（727語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-sea-squirts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「遺跡の見学に案内人を義務づけるべきか」（743語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-heritage-guides')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「音叉について」（737語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-tuning-fork')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「海に浮かぶ灯台――灯台船の歴史」（699語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lightship-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「水が切れるとき――木の中の気泡」（601語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-xylem-embolism')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「段ボールの舟レース」（497語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-cardboard-boat-race')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「椅子の背にかける布」（441語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-antimacassar')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「鳥はなぜ夜明けに歌うのか」（543語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-dawn-chorus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「風が運んだ土・黄土」（559語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-loess')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「チームで覚える・交換記憶」（680語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-transactive-memory')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「コガラの仲間の警戒の声」（681語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-chickadee-alarm-calls')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「少年野球の投球数制限は正しいか」（713語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-pitch-counts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ドミノについて」（700語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-dominoes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「冷凍肉を運んだ船」（596語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-frozen-meat-ships')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「南アフリカのイワシの大移動」（528語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-sardine-run')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ミーアキャットのサソリ授業」（541語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-meerkat-scorpion-lessons')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「町の博物館の「なぞの品」の日」（491語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-mystery-object-day')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ヘアドライヤーの歴史」（527語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hair-dryer-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「夕日と反対の空のピンクの帯」（523語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-belt-of-venus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「単語の中の文字は見やすい」（624語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-word-superiority-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「オットセイの親子の再会」（611語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-fur-seal-reunions')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「財団は期限内に資金を使い切るべきか」（780語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-foundation-spend-down')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「爪切りについて」（723語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-nail-clippers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「鏡の裏の銀：水銀を使わなくなった鏡」（629語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-mirror-silvering')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「餌で魚をつるサギ」（562語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-heron-bait-fishing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ナルシスのヘビの冬眠穴」（545語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-garter-snake-dens')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「中学校のハチのホテル」（514語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-school-bee-hotel')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「九本から十本へ：ボウリングの歴史」（570語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-tenpin-bowling-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「シャワーカーテンが寄ってくるわけ」（557語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-shower-curtain-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「暗やみの光点と集団の基準」（698語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-autokinetic-group-norms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「卓球の球の移り変わり」（650語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-table-tennis-ball')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「自転車は一時停止を「徐行」でよいか」（795語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-idaho-stop')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「オルゴールについて」（781語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-music-boxes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「糊で綴じる本の歴史」（649語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-perfect-binding')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「泥の中で眠る魚」（557語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-lungfish-estivation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「こんにゃく農家での一日」（534語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-konnyaku-farm-trip')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「海がなかなか温まらないわけ」（473語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-water-heat-capacity')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ハナアブの見えない大移動」（574語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hoverfly-migration')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「二つの箱とわからない確率」（599語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-ellsberg-unknown-odds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「解けない15パズル」（779語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-fifteen-puzzle-craze')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ガは幼虫時代を覚えているか」（722語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-caterpillar-memory')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「研究者は参加者をあざむいてよいか」（786語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-research-deception')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「マッチ箱について」（722語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-matchbox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「紫に変わった失敗の薬」（656語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-perkin-mauveine')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「白い砂浜をつくる魚」（535語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-parrotfish-sand')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「けがのふりをする鳥」（546語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-killdeer-broken-wing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「変わらない道具：すり鉢とすりこぎ」（544語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-mortar-pestle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「島が陸とつながるとき：トンボロ」（628語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-tombolo-tied-island')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「だれも走らないサッカー大会」（604語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-walking-football-festival')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「やさしく、毅然と、寛大に：コンピュータ大会の教訓」（794語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tit-for-tat-tournament')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「せまい岩棚の暮らし：ミツユビカモメの適応」（781語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-kittiwake-cliff-nesting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「理由なき退去要求は認めるべきか」（751語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-no-fault-eviction')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「荷物札について」（796語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-luggage-tags')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「パルスオキシメーターの歴史」（691語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-pulse-oximeter-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「芋を洗うサル」（631語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-koshima-potato-washing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「表紙を見ずに本を選ぶ」（528語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-library-blind-date-books')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「スナップボタンの小さな歴史」（509語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-snap-fastener-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「清流の巨人ヘルベンダー」（588語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hellbender-stream-giant')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「自分で自分の足を引っぱる心理」（588語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-self-handicapping-excuses')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「グラスフロッグが消えるしくみ」（737語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-glass-frog-hidden-blood')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「霧の中の巨人 ブロッケン現象」（773語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-brocken-spectre-glory')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「深夜のオンラインゲームは止めるべきか」（795語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-midnight-game-shutdown')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「つまようじについて」（797語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-toothpicks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「道路に光るガラスの目」（678語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-cats-eye-road-studs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「自分をつくり直す虫」（646語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-planarian-regeneration')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ハンモックの歴史」（473語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hammock-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「チェンマイの友だちと田植え」（411語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-rice-planting-exchange')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「アジサイの色を決める化学」（532語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hydrangea-colors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ハダカデバネズミの「方言」」（518語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mole-rat-dialects')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「副作用効果：意図の判断と道徳」（694語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-knobe-side-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「海のにおいの化学」（652語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-sea-smell-dms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「早期出願の「入学の約束」は許されるか」（724語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-binding-early-decision')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「箸置きについて」（716語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-chopstick-rests')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「カードを焦がして日照を測る」（658語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-sunshine-recorder')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ワラジムシ：落ち葉の下の甲殻類」（540語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-woodlice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「戻ってくるお皿」（465語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-festival-plates')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「バンドネオンの旅」（442語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bandoneon-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「着陸しない11日間」（513語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-godwit-nonstop-flight')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「海をわたる軽石」（498語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-pumice-rafts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「質問が行動を変える」（615語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-question-behavior-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「柱になる石」（688語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-basalt-columns')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「取材相手に引用の確認を認めるべきか」（739語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-quote-approval')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「麺棒について」（792語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-rolling-pins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「シェーレグリーン：壁をむしばんだ緑」（682語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-scheeles-green')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「生きた貯蔵つぼ：ミツツボアリ」（584語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-honeypot-ants')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「オリエンテーリング部の初レース」（471語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-orienteering-club-first-race')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「湯たんぽの長い歴史」（411語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hot-water-bottle-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「雨が氷に変わるとき」（556語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-freezing-rain-ice-storms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「自分で土にもぐる種」（540語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-storksbill-self-burying-seeds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「不安を書き出してから試験にのぞむ」（718語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-writing-away-exam-worries')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「毒をもつクローバー」（637語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-white-clover-cyanide-defense')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「体操の採点にセンサーを使うべきか」（762語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-gymnastics-sensor-judging')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「鍵穴について」（747語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-keyholes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ファルカーク・ホイール」（628語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-falkirk-wheel')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ウキクサの生き方」（562語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-duckweed-surface-life')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「一時に落ちる玉」（548語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-time-ball-signal')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「イチョウ並木の十二年」（516語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-ginkgo-street-survey')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「壁を伝う声」（568語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-whispering-gallery')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「へこんで見えない仮面」（590語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hollow-face-illusion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「北海を渡る小さな旅人」（666語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-bat-migration-sea')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「自分に関係づけると覚えられる」（701語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-self-reference-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「狩猟の鉛弾はやめるべきか」（798語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-lead-ammunition')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ばんそうこうについて」（794語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-sticking-plasters')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ビックフォードの安全導火線」（693語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-bickford-safety-fuse')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「頭に窓をもつ魚」（625語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-barreleye-eyes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「マーガレット・ナイトと底の平らな紙袋」（414語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-paper-bag-machine')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「霧から水をつかまえる」（404語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-fog-nets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「歩道に置かれた手紙」（521語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-lost-letter')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「言いまちがいが明かすもの」（490語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-slips-of-tongue')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ドッガーランド：北海の下の国」（644語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-doggerland')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ロンドンが息をできなかった夏」（673語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-great-stink')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「紙やすりについて」（772語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-sandpaper')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「フナクイムシ：木の船の見えない敵」（671語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-shipworm-timber')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「キャリントン・イベント：1859年からの警告」（634語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-carrington-storm')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「街角の消火栓の歴史」（437語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-fire-hydrant')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「アリのにおいの道」（414語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-ant-trails')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「コンタクトレンズの歩み」（572語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-contact-lens')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「眠る脳の短いさざ波」（627語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-sleep-spindles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「世界を運ぶ木の台」（661語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-shipping-pallet')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「応募書類は名前を隠して読むべきか」（794語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-blind-hiring')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「足場について」（781語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-scaffolding')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「球電のなぞ」（691語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-ball-lightning')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「木に登る巨大なカニ」（621語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-coconut-crab')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「大草原を変えた有刺鉄線」（461語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-barbed-wire-fences')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「レミングの本当の話」（469語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-lemming-cliff-myth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「頼みごとで仲よくなる」（580語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-ben-franklin-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「魚の頭の中の小さな石」（521語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-fish-ear-stones')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「鳥の卵の色の謎」（663語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-bird-egg-colors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ゲームが夢までついてくる」（646語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tetris-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「道路の横断は犯罪であるべきか」（784語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-jaywalking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「手すりについて」（790語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-handrails')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「砂漠をすべる石」（682語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-sailing-stones')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「シベリアの空が爆発した朝」（619語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-tunguska-event')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「樹液から生まれたガム」（494語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-chewing-gum-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「転がって旅する草」（443語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-tumbleweed-travels')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「選んでいないものを弁護する」（548語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-choice-blindness')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「こずえの役に立つどろぼう」（515語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mistletoe-forests')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「よく使う語にひそむ規則」（705語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-zipf-word-frequency')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「誰にも勝てないネズミ捕り」（690語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-mousetrap-patents')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「シーソーについて」（777語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-seesaws')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「砂漠の丸い裸地の謎」（666語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-fairy-circles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「海氷の下のつらら」（606語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-brinicles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ヤナギの皮からアスピリンへ」（501語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-willow-aspirin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「うろこの鎧をまとう動物」（529語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pangolins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「バニラの秘密を解いた少年」（624語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-vanilla-pollination')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ないはずの顔が見える」（601語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-face-pareidolia')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「押すと生まれる電気」（749語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-piezoelectricity')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「値札が生まれるまで」（713語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-fixed-prices')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「作家の「原稿を燃やして」に従うべきか」（785語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-destroying-manuscripts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「古びの艶について」（783語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-patina')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「島の動物はなぜ大きさが変わるのか」（677語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-island-rule')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「あらゆる音をまねる鳥」（623語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-lyrebird-mimicry')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ヒマワリにかくれた数」（543語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-sunflower-spirals')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「びんの王冠の発明」（538語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-crown-cap')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「袋小路の住宅地」（680語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-cul-de-sac')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「公共施設の名前を売るべきか」（774語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-naming-rights')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「枕について」（769語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-pillows')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「飛行機雲と温暖化」（670語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-contrails')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「フラミンゴはなぜピンク色か」（611語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-flamingo-pink')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ミントが冷たく感じる理由」（434語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-mint-cooling')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「段ボールの波の歴史」（465語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-corrugated-board')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「計算する馬ハンスの秘密」（576語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-clever-hans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「枯れ葉を落とさない木」（577語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-marcescence')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「光を飲みこむ超黒色の動物」（702語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-super-black')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「スピードバンプに頼るべきか」（788語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-speed-bumps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「砂の城について」（781語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-sandcastles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「水切りの物理学」（683語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-stone-skipping')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「わき腹の痛みのなぞ」（611語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-side-stitch')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「歩くとコーヒーがこぼれるわけ」（438語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-coffee-spill-walking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「害を予想すると害が生まれる」（539語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-nocebo-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「森の天井のすき間」（665語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-crown-shyness')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「海岸の海藻は取り除くべきか」（782語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-beach-wrack')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「パンくずについて」（784語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-crumbs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「大きなナッツが上に集まるわけ」（685語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-brazil-nut-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ハトが首をふって歩くわけ」（604語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-pigeon-head-bob')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「犬はなぜ首をかしげるのか」（521語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-dog-head-tilt')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「寝入りばなの「びくっ」」（487語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-sleep-starts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「海の泡はどこから来るのか」（563語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-sea-foam')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「友人の数に限界はあるか」（557語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-dunbar-number')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「空腹でイライラする科学」（725語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hunger-and-mood')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「サンゴが一斉に産卵する夜」（661語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-coral-mass-spawning')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「裁判を放送すべきか」（783語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-televised-trials')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ステンシルについて」（789語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-stencils')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「そこにない音――耳鳴りの科学」（663語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-tinnitus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「死んだふりをする動物たち」（608語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-playing-dead')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ブラシのような猫の舌」（452語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-cat-tongue')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「晴れた日の小さなつむじ風」（456語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-dust-devils')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「回転扉のひみつ」（530語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-revolving-doors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「泡で漁をするクジラ」（504語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-bubble-net-whales')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「船底に住みつく生き物たち」（661語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hull-fouling')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「泡で鳴るテッポウエビ」（617語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-snapping-shrimp')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「古い墓を再利用すべきか」（781語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-grave-reuse')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「お下がりについて」（769語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-hand-me-downs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「大西洋の美しい侵入者」（671語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lionfish-invasion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「水へ下りる階段　インドの階段井戸」（625語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-stepwells')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ヘアアイス：枯れ枝にできる氷の毛」（441語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hair-ice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「スノーローラー：風が作る雪玉」（420語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-snow-rollers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ペニテンテ：アンデスの氷の刃」（536語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-penitentes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「デコレータークラブ：海底を身にまとうカニ」（526語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-decorator-crabs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ヌタウナギのすごい粘液」（615語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hagfish-slime')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「鬼火を追いかけて」（609語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-will-o-wisp')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「古い船を沈めて魚礁にすべきか」（770語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ships-to-reefs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「泥火山：大地が泥をふき出すとき」（693語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-mud-volcanoes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「船首の像」（472語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-ship-figureheads')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「石に刻まれた津波の教え」（421語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-tsunami-stones')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「イッカクの牙のなぞ」（519語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-narwhal-tusk')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「溶岩が残したトンネル」（527語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-lava-tubes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ガラスでできた動物」（662語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-glass-sponges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「とける氷河に毛布を」（650語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-glacier-blankets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「遺伝子ドライブで蚊を減らすべきか」（769語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-gene-drives')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「シーグラスについて」（774語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-sea-glass')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「氷でできた空母」（677語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-pykrete')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「空を転がる雲「モーニンググローリー」」（619語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-morning-glory-cloud')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「雷が残すガラス」（517語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-fulgurites')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「葉をぬい合わせるアリ」（450語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-weaver-ants')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「死のにおいがする巨大な花」（520語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-corpse-flower')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「空が光り続ける湖」（525語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-catatumbo-lightning')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「千年を2枚の葉で生きる植物」（645語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-welwitschia')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「議会を燃やした木の割符」（679語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tally-sticks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「宇宙で採った資源を企業のものにしてよいか」（776語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-space-mining')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「玄関マットについて」（776語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-doormats')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「海の底にある湖」（678語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-brine-pools')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「さわれないほど熱い川」（621語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-boiling-river')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「れんが壁に残る消えかけた広告」（452語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-ghost-signs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「道のりを数えた石」（403語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-roadside-milestones')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「倒れた木が苗を育てる」（488語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-nurse-logs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「貝のいない真珠」（495語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-cave-pearls')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「建てるのではなく育てる橋」（610語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-living-root-bridges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「国籍をお金で売ってよいか」（782語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-golden-passports')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「蔵書票について」（787語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-bookplates')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「海が迫る海岸の幽霊の森」（682語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-ghost-forests')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「泥炭から現れた顔」（625語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-bog-bodies')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「セメントを使わない石垣」（448語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-dry-stone-walls')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「顔が赤くなるわけ」（406語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-why-we-blush')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「洞窟の天井の星」（539語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-glowworm-caves')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「流砂の本当の姿」（531語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-quicksand-science')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「だれにも読めない本」（669語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-voynich-manuscript')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ストラスブールが踊った夏」（629語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-dancing-plague')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「屋外ヒーターは禁止すべきか」（788語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-patio-heaters')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「スノードームについて」（776語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-snow-globes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「線文字Bの解読」（688語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-linear-b-decipherment')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「結び目に記された記録」（634語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-khipu-records')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「眉毛は何のためにあるのか」（499語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-eyebrows-purpose')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「駅スタンプの楽しみ」（443語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-station-stamps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「湖の中に作られた畑チナンパ」（512語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-chinampas')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「薬の安全を守る青い血」（493語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-horseshoe-crab-blood')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「漁師に合図を送るイルカ」（633語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-laguna-dolphin-fishers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「超音速旅客機はなぜ消えたか」（636語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-concorde-supersonic')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「私有地を自由に歩く権利は認められるべきか」（789語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-right-to-roam')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「アイロンがけについて」（788語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-ironing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「二千年前の種から育ったヤシ」（676語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-ancient-date-palm')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「小さな穴がよみがえらせた畑」（625語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-zai-pits')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「虹ができるしくみ」（450語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-rainbow-formation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「縄跳びの長い歴史」（421語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-jump-rope')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「海を渡ったビスケット」（525語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-ship-biscuit')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「年を数える虫」（660語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-periodical-cicadas')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「詩のような天気予報」（665語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-shipping-forecast')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「PK戦で勝敗を決めるべきか」（789語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-penalty-shootouts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「音で「見る」人々」（678語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-human-echolocation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「綱を引くための歌」（613語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-sea-shanties')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ネコはなぜ「ふみふみ」するのか」（450語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-cat-kneading')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「眠気を覚ます道路」（438語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-rumble-strips')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「すっぱい味を甘くする実」（524語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-miracle-fruit')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「シマウマはなぜしま模様なのか」（645語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-zebra-stripes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「せっけんの味がするハーブ」（640語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-cilantro-soap')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「候補者に順位をつけて投票すべきか」（778語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ranked-voting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「はさみについて」（788語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-scissors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「赤ちゃんのころを覚えていないのはなぜか」（685語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-childhood-amnesia')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「音の大きさを競った時代」（626語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-loudness-war')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「道路のオレンジ色のコーン」（511語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-traffic-cones')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「町を起こして回った人々」（444語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-knocker-uppers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「見つめると消えるもの」（508語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-troxler-fading')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「人の体の身代わり」（494語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-crash-test-dummies')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「値上がりで買う量が増えるとき」（649語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-giffen-goods')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「23人と同じ誕生日」（630語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-birthday-problem')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「生き物を人の手で移住させるべきか」（792語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-assisted-migration')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ぶらんこについて」（790語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-swings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「永遠に上がり続ける音」（686語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-shepard-tone')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「アバターが使う人を変えるとき」（621語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-proteus-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「決まりを破った動物」（471語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-platypus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「スパゲッティが二つに折れないわけ」（416語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-spaghetti-snap')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「前から読んでも後ろから読んでも」（551語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-palindromes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「暗闇の中の絵」（501語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-cave-art-darkness')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「言葉が意味を失うとき」（671語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-semantic-satiation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「自分でも気づかない動き」（626語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-ideomotor-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「スキー場は人工雪に頼るべきか」（790語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-artificial-snow')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「給水塔について」（783語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-water-towers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ハンマーに耐えるガラスのおたまじゃくし」（677語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-prince-ruperts-drops')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「失われたダマスカス鋼の秘密」（615語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-damascus-steel')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「川の泥の中の宝物」（494語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-thames-mudlarks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「石の中にかくれた結晶」（479語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-geode-crystals')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「カササギは光る物をぬすむのか」（522語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-magpie-shiny-myth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「海の上で時を告げる鐘」（518語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-ships-bells-watches')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「禁じられると欲しくなるわけ」（616語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-psychological-reactance')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「なかったことを覚えている」（615語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-mandela-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「ごみ袋ごとに料金を払うべきか」（737語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-household-waste-fees')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「島から外来の動物を取り除くべきか」（734語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-invasive-eradication')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「幕間について」（718語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-intermissions')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「迷路について」（762語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-mazes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「地面が抜け落ちるとき：陥没穴のしくみ」（641語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-sinkholes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ねじが合うようになるまで」（621語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-standard-screw-threads')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「氷河の氷はなぜ青く見えるのか」（574語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-blue-glacier-ice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「金属が木より冷たく感じるのはなぜか」（562語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-metal-feels-colder')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「悪用されうる研究は全部公開すべきか」（703語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-dual-use-research')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「屋根を明るい色にするよう義務づけるべきか」（707語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-reflective-roofs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「落書きについて」（704語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-doodles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「リハーサルについて」（670語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-rehearsals')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「塩性湿地の静かな価値」（681語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-salt-marshes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「貝塚が語る過去の暮らし」（701語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-shell-middens')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「松ぼっくりが開いたり閉じたりするしくみ」（558語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-pine-cone-scales')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「月がいつも同じ面を見せる理由」（570語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-moon-same-face')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「大学の講義はすべて録画すべきか」（682語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-lecture-recordings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「スマホのシャッター音を義務づけるべきか」（665語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-phone-shutter-sounds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「あだ名について」（662語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-nicknames')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「予備について」（664語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-spares')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「地球の軌道と氷期のリズム」（597語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-orbital-ice-age-cycles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ダーウィンとミミズの地道な仕事」（601語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-darwin-earthworms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「カモの足はなぜ凍らないのか」（536語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-countercurrent-duck-feet')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「オークの森の豊作と凶作」（541語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-oak-mast-years')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「冬にこおるカエル」（439語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-wood-frog-freezing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「皇帝ペンギンのおしくらまんじゅう」（403語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-penguin-huddles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「クランベリー畑に水を張るわけ」（516語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-cranberry-harvest')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「郵便番号の歩み」（507語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-postal-code-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ごほうびが楽しさをうばうとき」（621語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-overjustification-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「緊張は思ったほど見えていない」（617語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-illusion-of-transparency')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「駅に自動改札は必要か」（723語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ticket-gates')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「赤信号での右折を認めるべきか」（676語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-turn-on-red')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「日時計について」（725語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-sundials')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「いかりについて」（719語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-anchors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「湖の泥のこよみ：年縞」（666語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lake-varves')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「微生物が築いた岩：ストロマトライト」（594語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-stromatolites')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「海岸を照らしたフレネルレンズ」（536語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-fresnel-lens')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「避雷針の本当の役割」（551語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-lightning-rods')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「若いヒマワリが太陽を追うわけ」（420語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-young-sunflowers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「木が葉を落とすわけ」（417語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-trees-drop-leaves')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「布の工場から庭へ：芝刈り機の誕生」（514語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-lawn-mower-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「指差喚呼：まちがいを防ぐ習慣」（489語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-pointing-and-calling')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「人のせいにして状況を忘れる」（622語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-fundamental-attribution-error')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「部屋を変えた一着の部屋着」（613語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-diderot-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ラクダのこぶの中身」（474語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-camel-humps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「背は暗く腹は明るく：見えにくくなる色のしくみ」（459語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-countershading')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「町とともに色を変えたガ」（484語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-peppered-moth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「白黒のしま模様：ゼブラ横断歩道の物語」（488語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-zebra-crossing-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「自分でつくり出したことは覚えやすい」（663語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-generation-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「空腹で買い物をすると：ホット・コールド共感ギャップ」（653語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hot-cold-empathy-gap')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「雪の休校日をオンライン授業にすべきか」（723語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-snow-days')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「登山者は救助費用を払うべきか」（682語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-rescue-costs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「望遠鏡について」（670語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-telescopes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「スポンジについて」（682語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-sponges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「鳥の卵の形はなぜちがうのか」（669語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-egg-shapes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「寒い地方の動物はなぜ大きいのか」（647語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-bergmanns-rule')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「船首の下のふくらみ」（580語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-bulbous-bows')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「道路が完全には平らでないわけ」（562語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-road-camber')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「生徒を能力別に分けるべきか」（748語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ability-grouping')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「サンゴに害があるかもしれない日焼け止めを禁止すべきか」（706語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-coral-sunscreen-bans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「方位磁針について」（755語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-compasses')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「飛び石について」（741語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-stepping-stones')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「未来の気持ちを読みちがえるわけ」（667語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-impact-bias')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「湖の水が入れかわるわけ」（692語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lake-turnover')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「タイヤが黒いわけ」（569語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-black-tyres')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「翼の先が上を向いているわけ」（573語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-winglets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「鳥はどうやって羽の手入れをするのか」（457語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bird-preening')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「体育館でくつがキュッと鳴るわけ」（452語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-shoe-squeak')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「写真判定の物語」（565語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-photo-finish')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「パーキングメーターの物語」（523語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-parking-meter-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「見える努力が価値を高めるわけ」（647語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-labor-illusion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「だれも望まなかった旅：アビリーンのパラドックス」（654語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-abilene-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「著作権は作者の死後もこれほど長く続くべきか」（722語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-copyright-term')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「博物館は他国から持ち去られた品を返すべきか」（679語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-museum-restitution')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「呼び鈴について」（664語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-doorbells')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「渡し船について」（667語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-ferries')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「葉の小さな扉――気孔は空気と水をどう両立させるか」（636語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-leaf-stomata')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「地球を測ってメートルをつくる」（660語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-metre-meridian')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「消火器はどのように火を消すのか」（559語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-fire-extinguishers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「氷河期のあと、今も持ち上がり続ける土地」（523語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-post-glacial-rebound')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「イヌの鼻はなぜぬれているのか」（492語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-dog-wet-nose')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「録音した自分の声はなぜ変に聞こえるのか」（447語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-recorded-voice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「子どもの庭――幼稚園のはじまり」（540語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-kindergarten-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ガラス箱の中の植物――ウォードの箱の物語」（526語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-wardian-case')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「まるで自分のこと――バーナム効果」（624語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-barnum-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「前にも聞いた――くり返しが主張を本当らしく見せる理由」（621語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-illusory-truth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「道路から標識と縁石をなくすべきか」（751語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-shared-space-streets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「キャッチ・アンド・リリースは認められるべきか」（715語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-catch-and-release')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「波紋について」（723語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-ripples')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「リボンについて」（698語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-ribbons')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「魅力的だが危険なすみか：生態学的なわな」（651語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-ecological-traps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「親族を助ける：血縁淘汰という考え」（636語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-kin-selection')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「坂を流れ下る風：カタバ風」（564語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-katabatic-winds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「熱帯雨林の木の板根」（541語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-buttress-roots')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「水の中のストローはなぜ曲がって見えるのか」（498語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bent-straw-refraction')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「寒い日に息が白く見えるのはなぜか」（493語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-visible-breath')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「一輪と二本の柄：手押し車の歴史」（540語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-wheelbarrow-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「目に日かげを：サングラスの歴史」（524語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-sunglasses-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「月曜日からやり直す：フレッシュスタート効果」（651語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-fresh-start-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「苦労したものほど価値があると思うのはなぜか」（644語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-effort-justification')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「野生の食べ物を自由に採ってよいか」（698語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-wild-food-foraging')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「道路の安全をスピードカメラに頼るべきか」（692語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-speed-cameras')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「風車について」（740語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-windmills')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「潮だまりについて」（730語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-tide-pools')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「空の島――山頂に取り残された生き物」（695語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-sky-islands')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「植物どうしの化学的な張り合い――アレロパシーのなぞ」（698語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-allelopathy')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「湖全体がゆれる――静振（セイシュ）」（584語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-lake-seiches')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「砂漠舗石――下から作られる石の床」（585語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-desert-pavement')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「氷はなぜ真ん中が白くにごるのか」（517語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-cloudy-ice-cubes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「古い本はなぜ黄ばむのか」（437語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-yellowing-paper')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「クロスワードパズルの始まり」（572語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-crossword-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「くっつかない接着剤――付箋の物語」（521語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-sticky-note-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「同じ水でも手しだい――対比効果」（619語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-contrast-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「偏っているのはいつも相手？――素朴実在論」（660語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-naive-realism')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「最小額の硬貨は廃止すべきか」（688語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-smallest-coins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「祝日を月曜日に移すべきか」（705語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-monday-holidays')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「残り物について」（659語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-leftovers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「十字路について」（686語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-crossroads')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「マメ科植物が土を肥やすしくみ」（632語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-legume-nitrogen')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「時計で場所を知る：経度の問題」（613語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-longitude-timekeepers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「原因の見えない渋滞」（530語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-phantom-traffic-jams')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「嵐の上の赤い閃光スプライト」（521語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-red-sprites')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「古いチョコレートはなぜ白くなるのか」（474語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-chocolate-bloom')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「冬に水道管が破裂するのはなぜか」（437語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-frozen-pipes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「食器洗い機を実用化した女性」（514語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-dishwasher-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ジグソーパズルの歩み」（507語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-jigsaw-puzzle-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「多くの人が自分を平均以上だと思うのはなぜか」（623語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-better-than-average')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「目立って身を守る：ダズル迷彩の船」（651語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-dazzle-ships')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「地下に埋められた都市の川を地上にもどすべきか」（723語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-daylighting-streams')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「野生動物の数は避妊で管理すべきか」（671語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-wildlife-contraception')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「オールについて」（713語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-oars')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「いかだについて」（724語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-rafts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「地中海が干上がったとき」（624語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-messinian-salinity-crisis')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「王国なき商人たち：ハンザ同盟」（582語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-hanseatic-league')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ガラスの殻に住む生き物：珪藻」（587語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-diatoms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「空を流れる川：大気の川」（554語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-atmospheric-rivers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「牛乳はなぜふきこぼれるのか」（456語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-milk-boil-over')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「果物が果物を熟させるしくみ」（447語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-ethylene-ripening')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「木を切って森を生かす：萌芽更新（コピシング）」（522語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-coppicing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「海の中で息をする：潜水鐘の歴史」（490語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-diving-bell-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「違いに気づくしくみ：ウェーバーの法則」（693語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-weber-law')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「見ているのに見えていない：非注意による見落とし」（652語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-inattentional-blindness')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「都市で薪ストーブを規制すべきか」（755語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-wood-burning-stoves')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「人名にちなむ生物の名前は改めるべきか」（683語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-species-eponyms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「温度計について」（671語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-thermometers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「押し花について」（657語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-pressed-flowers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「コロンブス交換――二つの世界が生き物を交換したとき」（576語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-columbian-exchange')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「輪状種――輪になった進化」（519語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-ring-species')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「自然がつくった原子炉」（518語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-oklo-natural-reactor')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「目を細めるとよく見えるのはなぜか」（418語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-why-squinting-helps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「鳥が電線にとまっても平気なのはなぜか」（409語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-birds-on-power-lines')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「季節とともに移動する――移牧という営み」（500語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-transhumance')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ハトのための家――鳩舎の歴史」（502語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-dovecotes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「知りたくない心理――ダチョウ効果」（612語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-ostrich-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「大きく頼んで小さく得る――ドア・イン・ザ・フェイス」（633語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-door-in-the-face')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「加工した広告写真に表示を義務づけるべきか」（654語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-retouched-ad-photos')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「患者は医師の診療記録を読めるべきか」（660語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-patient-notes-access')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ハンカチについて」（664語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-handkerchiefs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「縫い目について」（662語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-seams')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「細胞の中の細胞：ミトコンドリアの意外な起源」（659語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-mitochondria-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「見えていないのに分かる：盲視のなぞ」（576語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-blindsight')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「森が終わるところ：山の森林限界」（541語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-mountain-tree-line')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「砂の川：海岸に沿って動く砂浜」（542語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-longshore-drift')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「歯みがきの後にオレンジジュースが変な味になるのはなぜか」（396語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-toothpaste-orange-juice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「貝がらの中の海の音」（414語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-seashell-sea-sound')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「みんなのものになったシートベルト」（529語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-three-point-seat-belt')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「はんこ：日本の個人の印」（524語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hanko-seals')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「「はい」の後で条件を変える：ローボール・テクニック」（643語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-low-ball-technique')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「くわしいほど本当らしく見える：連言錯誤」（608語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-conjunction-fallacy')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「使われていない預金を公益に使うべきか」（703語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-dormant-bank-accounts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「新人医師に医師不足の地域での勤務を義務づけるべきか」（701語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-rural-doctor-service')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「定規について」（744語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-rulers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「屋根裏部屋について」（743語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-attics')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「地球全体が凍った時代：スノーボールアース仮説」（691語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-snowball-earth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ふだん気づかない感覚：固有感覚」（696語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-proprioception')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「星までの距離をはかる：年周視差」（588語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-stellar-parallax')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「グラスをのぼるワイン：ワインの涙」（588語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-tears-of-wine')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「目を閉じても光が見えるのはなぜか」（445語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-phosphenes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「福袋：日本のお正月の楽しみ」（453語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-fukubukuro-lucky-bags')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「駅伝：たすきをつなぐ長距離リレー」（574語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hakone-ekiden')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「カプセルホテルの物語」（505語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-capsule-hotels')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「自分の名前の文字が好き：ネームレター効果」（633語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-name-letter-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ほかの人はだまされるが自分はちがう：第三者効果」（633語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-third-person-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「血漿の提供に報酬を払うべきか」（773語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-paid-plasma-donation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「行列に代わりに並ぶ人を雇ってよいか」（740語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-paid-line-standing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「トレーシングペーパーについて」（692語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-tracing-paper')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「くもの巣について」（726語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-cobwebs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「知らないうちに声が大きくなる——ロンバード効果」（587語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lombard-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「巨人は大きくするだけでは生まれない——二乗三乗の法則」（639語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-square-cube-law')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「月を照らす地球の光——地球照」（588語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-earthshine')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「深い海の水がわき上がる——湧昇」（581語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-ocean-upwelling')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「こいのぼり——空を泳ぐ魚」（416語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-koinobori')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「てるてる坊主——晴れを願う小さな人形」（434語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-teru-teru-bozu')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「のれん——店の入り口にかかる布」（496語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-noren-curtains')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「招き猫——福を招く猫」（506語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-maneki-neko')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「「何を」より「どこに」を覚える——グーグル効果」（594語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-google-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「そこにない音が聞こえる——ミッシング・ファンダメンタル」（584語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-missing-fundamental')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「子どもの名前に国が口を出すべきか」（753語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-baby-name-rules')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「学校の成績を順位表で公表すべきか」（682語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-school-league-tables')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「サイコロについて」（696語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-dice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「壁紙について」（653語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-wallpaper')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「なくなった手足の感覚——幻肢」（590語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-phantom-limbs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「上から始まる木——絞め殺しのイチジク」（592語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-strangler-figs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「砂漠の下の川——カナート」（559語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-qanats')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「丘の上の池——露池のなぞ」（528語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-dew-ponds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「おみくじ——紙に書かれた運勢」（466語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-omikuji')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「七夕——夏の星に願いを」（449語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-tanabata-wishes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「魚拓——釣った魚を写しとる」（527語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-gyotaku')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「けん玉——練習にこたえるおもちゃ」（515語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-kendama')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「絵はことばより覚えやすい——画像優位性効果」（645語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-picture-superiority')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「見なれた顔がわからない——相貌失認」（629語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-face-blindness')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「子どもを産む人に国はお金を払うべきか」（798語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-baby-bonuses')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「豊かな国は貧しい国から看護師を集めてよいか」（771語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-nurse-recruitment')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「リストについて」（731語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-lists')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「三つの点（省略記号）について」（706語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-the-ellipsis')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「アイスマン——銅器時代からの使者」（611語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-otzi-iceman')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「牛疫の根絶——忘れられた勝利」（582語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-rinderpest')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「虫から生まれた赤——コチニールの物語」（564語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-cochineal')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「もっともゆっくり落ちるしずく——ピッチドロップ実験」（539語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-pitch-drop')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「年賀状——日本の新年のあいさつ状」（450語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-nengajo')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「温泉に入るサル」（440語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-snow-monkeys')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「サフラン——手でつまれるスパイス」（514語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-saffron')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ミウラ折り——宇宙のための折り方」（509語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-miura-fold')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「「キキ」はなぜとがって聞こえるのか——ブーバ・キキ効果」（634語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-bouba-kiki')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「上がりつづけた知能検査の得点という謎」（625語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-flynn-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「都市は水源の土地の持ち主にお金を払うべきか」（797語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-watershed-payments')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「無給のインターンシップは認められるべきか」（753語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-unpaid-internships')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「地平線・水平線について」（749語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-horizons')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「取扱説明書について」（724語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-instruction-manuals')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「白米と海軍軍医——脚気との闘い」（615語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-beriberi-navy')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「影で地球をはかる——エラトステネス」（629語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-eratosthenes-earth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「化石の中からよみがえった魚——シーラカンス」（585語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-coelacanth-rediscovered')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「歩いて国を測る——伊能忠敬」（594語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-ino-tadataka-map')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ハチ公——待ちつづけた犬」（480語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hachiko-story')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「家計簿——日本式のお金のため方」（460語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-kakeibo-budget')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ハンドルを回して待つ——日本のカプセルトイ」（543語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-capsule-toys')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「海をこえたつる植物——クズ」（562語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-kudzu-vine')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「三つのドアとヤギ——モンティ・ホール問題」（666語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-monty-hall')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「時間いっぱいにふくらむ仕事——パーキンソンの法則」（651語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-parkinsons-law')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「議員は自宅から投票してよいか」（795語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-remote-voting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「失われた名所は元どおりに再建すべきか」（759語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-rebuilding-landmarks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「誤植について」（736語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-typos')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「線の引かれた紙について」（715語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-lined-paper')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「像とネズミと船――ラパ・ヌイの物語を考えなおす」（693語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-rapa-nui-collapse')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「鉄の棒と変わった男――フィニアス・ゲージ」（621語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-phineas-gage')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「古いバイオリンと新しいバイオリン――ストラディバリウス伝説を確かめる」（549語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-stradivarius-test')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「少なすぎず、多すぎず――ヤーキーズ・ドッドソンの法則」（538語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-yerkes-dodson')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「積ん読――まだ読んでいない本」（486語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-tsundoku-books')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「夜の屋外で食べる――福岡の屋台」（477語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-fukuoka-yatai')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「食べられない料理――日本の食品サンプル」（562語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-food-samples')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「線路を点検する黄色い列車――ドクターイエロー」（507語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-doctor-yellow')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「新しい道でみんなが遅くなるとき――ブライスのパラドックス」（646語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-braess-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「専門家をだました化石――ピルトダウン人」（619語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-piltdown-man')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「陪審員に被告人の前科を伝えるべきか」（792語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-jury-past-crimes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「サッカーの観客に立ち見を認めるべきか」（678語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-standing-at-football')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「アンコールについて」（697語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-encores')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「窓側の席について」（703語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-window-seats')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「あるはずのない星――ティコ・ブラーエと1572年の空」（643語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-tycho-new-star')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「首のある魚をさがして――ティクターリクの発見」（593語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-tiktaalik-prediction')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「地球の回転を見る――フーコーの振り子」（512語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-foucault-pendulum')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「太陽が静かになったとき――マウンダー極小期」（527語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-maunder-minimum')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「一年に二度の夏――キョクアジサシの長い旅」（422語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-arctic-tern-journey')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「こけし――東北の素朴な木の人形」（418語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-kokeshi-dolls')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「夏の甲子園――高校野球と強まる暑さ」（511語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-koshien-summer')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「タヌキ――昔話のうしろにいる本物の動物」（488語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-tanuki-raccoon-dog')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「兵士と鳥のたたかい――1932年のエミュー戦争」（633語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-great-emu-war')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「十五の石と何もない空間――竜安寺の庭」（611語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-ryoanji-rock-garden')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「うそ発見器の結果を法廷で使うべきか」（746語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-lie-detector-evidence')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「スポーツ選手は代表する国を自由に変えてよいか」（729語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-athletes-changing-nations')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ことわざについて」（757語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-proverbs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「序文について」（695語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-prefaces')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「海の民の潜水者――バジャウの人々の体」（688語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-bajau-divers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「かみつきで広がるがん――タスマニアデビルの苦しみ」（614語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-devil-facial-tumour')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ギャロッピング・ガーティ――自らをゆすってこわれた橋」（519語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-tacoma-narrows')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「湖が鉱山に消えた日――ペニュール湖」（536語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-lake-peigneur')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ギムリー・グライダー――燃料が切れたジェット機」（419語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-gimli-glider')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「メアリー・ローズ号――海から引き上げられた軍艦」（410語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-mary-rose-ship')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「秘密をかかえたチェス機械――「トルコ人」」（495語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mechanical-turk')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ハトに操縦をまかせる――スキナーの戦時中の計画」（507語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-project-pigeon')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「反響のない部屋――ほとんど完全な静けさに耳をすます」（628語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-anechoic-chamber')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「一生をやり直せるクラゲ」（621語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-immortal-jellyfish')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「古典的な本は今の読者に合わせて書き直すべきか」（757語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-revising-classic-books')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「外科医一人一人の手術成績を公表すべきか」（734語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-surgeon-results')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「追伸について」（701語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-postscripts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「スーツケースについて」（696語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-suitcases')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「化石の時代から来た木――ウォレマイ・パイン」（685語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-wollemi-pine')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「カホキア――ミシシッピ川のほとりの失われた都市」（657語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-cahokia-city')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ダーウィンのランと、だれも見たことのなかったガ」（539語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-darwin-comet-orchid')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「カカポ――夜の森を歩くオウム」（518語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-kakapo-parrot')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ハリファックス大爆発――にぎやかな港の大災害」（431語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-halifax-explosion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「腸チフスのメアリー――病気にならなかった料理人」（404語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-typhoid-mary')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「光る文字盤――ラジウムで絵筆をとった女性たち」（498語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-radium-dial-painters')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「からっぽの灯台――フラナン諸島のなぞ」（494語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-flannan-isles-keepers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「存在しなかった5発のミサイル――ペトロフの決断」（634語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-petrov-false-alarm')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「飢えの冬――医学を変えた飢きん」（621語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-dutch-hunger-winter')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「翻訳者の名前を本の表紙にのせるべきか」（751語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-translators-on-covers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「遺跡の一部は発掘せずに残すべきか」（710語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-leaving-sites-unexcavated')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「待合室について」（748語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-waiting-rooms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「せん定について」（721語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-pruning')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「メアリー・アニング――ライム・リージスの化石ハンター」（622語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-mary-anning-fossils')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ギョベクリ・テペ――農耕より古い巨石の遺跡」（608語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-gobekli-tepe')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「パンド――一つの生き物でできた森」（581語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-pando-aspen')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ねらいをはずしたマングース」（573語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-amami-mongoose')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ノームへのリレー――雪の中を薬を運んだ犬たち」（447語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-nome-serum-run')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ヨーロッパの飛行機を止めた火山」（429語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-iceland-ash-cloud')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「氷に閉じこめられて――シャクルトンとエンデュアランス号」（490語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-shackleton-endurance')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「始皇帝の土の軍隊」（515語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-terracotta-army')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「クローン羊ドリー――生物学を変えた羊」（635語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-dolly-cloned-sheep')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「砂漠の絵――ナスカの地上絵」（617語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-nazca-lines')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「本に内容の注意書きをつけるべきか」（742語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-book-content-warnings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「外国の地名は現地での呼び方に合わせるべきか」（705語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-foreign-place-names')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「レシピについて」（758語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-recipes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「下書きについて」（679語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-drafts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ヘルクラネウムの焼けた巻物を読む」（583語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-herculaneum-scrolls')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「洪水のあとで――オランダのデルタ計画」（608語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-delta-works')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「最初の航海でしずんだ軍艦」（588語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-vasa-warship')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「二度消えかけたレイヨウ、サイガ」（528語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-saiga-die-off')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「管の中を旅した手紙」（453語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pneumatic-post')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「オカピ――森のキリン」（442語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-okapi-forest-giraffe')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ロンドンを作りかえた4日間」（493語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-great-fire-london')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「オオウミガラス――消えた北の「ペンギン」」（486語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-great-auk')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「封をした手紙――くさび形文字が読めると証明された日」（634語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-cuneiform-1857-test')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「クアッガ――失われたシマウマと、失われたものの問い」（623語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-quagga-zebra')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「よい成績にお金を払うべきか」（729語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-paying-for-grades')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「食品の名前は土地のものであるべきか」（798語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-food-names-and-places')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「こまについて」（725語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-spinning-tops')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「自分の声を聞くことについて」（708語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-hearing-our-own-voice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「空気からパンを：アンモニアが変えた農業」（653語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-haber-bosch-ammonia')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「単位のちがいで失われた探査機」（630語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-mars-climate-orbiter')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「六人といかだと一つの説」（563語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-kon-tiki-raft')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「色の点にかくれた数字」（592語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-ishihara-color-plates')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「あえて省いた地図」（461語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-harry-beck-tube-map')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「短いメッセージのための小さな絵」（418語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-first-emoji')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「とても遠い島での暮らし」（498語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-tristan-da-cunha')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ロンサム・ジョージとピンタ島のゾウガメ」（486語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-lonesome-george')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「庭のはずれの妖精」（620語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-cottingley-fairies')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「1963年に生まれた島スルツェイ」（612語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-surtsey-island')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「体重で運賃を決めるべきか」（771語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-fares-by-passenger-weight')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「不利な受験生への合格基準を下げるべきか」（729語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-contextual-university-offers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「片方だけの靴下について」（723語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-odd-socks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ストップウォッチについて」（725語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-stopwatches')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「砂になった大きな湖：アラル海」（599語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-aral-sea-shrinking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「時代を終わらせたクレーターをさがして」（593語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-chicxulub-crater-search')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「湾の中の毒：水俣の教訓」（575語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-minamata-bay-lessons')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「海のルールを変えた座礁事故」（581語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-torrey-canyon-spill')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「馬で運ぶ郵便：ポニー・エクスプレス」（428語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pony-express-mail')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「とびはねる豆のひみつ」（415語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-mexican-jumping-beans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「つめで木をのぼるひな：ツメバケイ」（494語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hoatzin-clawed-chicks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「2000年問題」（500語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-year-2000-problem')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「モーツァルトで頭がよくなる？」（637語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-mozart-effect-myth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ラットパーク：依存とおり」（621語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-rat-park-experiment')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「生徒どうしで作品を採点すべきか」（714語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-peer-marking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「小さな地方の学校は統合すべきか」（737語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-rural-school-mergers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「紙コップについて」（720語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-paper-cups')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「冷蔵庫の扉について」（736語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-refrigerator-doors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「オゾンホールはどのように見つかったか」（622語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-ozone-hole-discovery')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「巨大噴火は人類を絶滅寸前にしたか」（629語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-toba-eruption-debate')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「インドを横切った忘れられた生け垣」（577語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-great-hedge-of-india')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「スコットランドの失われた植民地ダリエン」（603語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-darien-scheme')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「木のアヒルからプラスチックのブロックへ」（456語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-lego-brick-story')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「客が自分で品物を取る店」（436語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-first-self-service-store')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「太平洋ゴミベルトの本当のすがた」（517語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-pacific-garbage-patch')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ニレの並木を消した病気」（523語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-dutch-elm-disease')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「酸性雨はどうなったのか」（699語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-acid-rain-story')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「「アルバート坊や」の本当の話」（685語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-little-albert-study')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「おもちゃを男女別に並べるのをやめるべきか」（733語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-gender-labels-on-toys')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「公共交通は夜通し走らせるべきか」（714語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-all-night-public-transport')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「じょうろについて」（691語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-watering-cans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「デッキチェアについて」（682語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-deckchairs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「海水で溶岩と戦った島」（610語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-heimaey-lava-and-seawater')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「薬の試験のあり方を変えた薬」（587語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-thalidomide-and-drug-testing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「スペリオル湖の島のオオカミとヘラジカ」（533語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-isle-royale-wolves-and-moose')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「セント・キルダ最後の島民」（546語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-st-kilda-last-islanders')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ケブラーになったにごった液体」（448語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-kevlar-cloudy-liquid')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ヒンデンブルク号の最後の飛行」（461語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hindenburg-last-flight')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「偶然にできた湖」（543語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-salton-sea-accidental-lake')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「「ワウ！」信号のなぞ」（531語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-wow-signal-mystery')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「アルメロを救えなかった警告」（633語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-armero-unheeded-warning')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ロンドンが南海会社の株を買った年」（633語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-south-sea-bubble-1720')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「飲食店に衛生評価の表示を義務づけるべきか」（717語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-restaurant-hygiene-ratings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「眼鏡について」（743語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-spectacles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「物干しロープについて」（723語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-clotheslines')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「自らの災害を生きのびたダム」（584語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-vajont-dam-landslide')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ガラスの世界に入った8人」（613語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-biosphere-2-glass-world')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「27年で消えた巨大な動物」（573語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-steller-sea-cow-vanished')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「火がついた川」（557語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-cuyahoga-burning-river')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「種を守った科学者たち」（461語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-leningrad-seed-keepers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「火の上の町」（437語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-centralia-underground-fire')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「化学物質の上に作られた住宅地」（525語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-love-canal-buried-waste')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ソフトウェアを信じすぎた医療機器」（508語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-therac-25-software-errors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「リスボンがくずれた朝」（636語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-lisbon-1755-earthquake')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「37秒間の飛行」（624語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-ariane-5-first-flight')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「政府が税の申告書を代わりに記入すべきか」（707語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-prefilled-tax-returns')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「ペットへのマイクロチップを義務にすべきか」（668語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-compulsory-pet-microchips')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「南京錠について」（703語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-padlocks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「畑に埋められた船」（581語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-sutton-hoo-ship-burial')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ウサギにはなたれたウイルス」（567語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-myxomatosis-rabbit-control')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「自らを閉ざした村」（527語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-eyam-plague-village')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「最後のタスマニアタイガー」（518語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-thylacine-last-survivor')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「片足でカナダを横断する走り」（440語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-terry-fox-marathon-of-hope')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「めがねが必要だった望遠鏡」（404語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hubble-flawed-mirror')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「乗組員のいない船」（527語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mary-celeste-empty-ship')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「消えた入植者たち」（525語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-roanoke-lost-colony')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「救命ボートになった宇宙船」（613語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-apollo-13-lifeboat')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ざんごうの中の休止」（630語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-christmas-truce-1914')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「「含むかもしれない」表示を規制すべきか」（709語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-may-contain-labels')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「航空会社は座席より多く券を売ってよいか」（726語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-airline-overbooking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「綱渡りについて」（732語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-tightropes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「雪だるまについて」（697語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-snowmen')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「地下12キロメートルへ」（607語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-kola-superdeep-borehole')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「サン・ピエールが消えた朝」（591語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-mount-pelee-1902')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「白い灰をあびた漁船」（541語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-lucky-dragon-no5')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「自らを持ち上げた町」（536語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-galveston-1900-hurricane')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「水につかった洞窟からの救出」（436語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-thai-cave-rescue-2018')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「おくれて帰ってきた探査機」（401語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hayabusa-asteroid-probe')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「雪の斜面のテント」（562語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-dyatlov-pass-incident')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「たどり着かなかった飛行士」（520語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-amelia-earhart-disappearance')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「地下での69日間」（616語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-chilean-miners-rescue-2010')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「北極の氷に消えた二隻の船」（626語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-franklin-lost-expedition')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「すべての機器が同じ充電器を使うべきか」（654語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-common-chargers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「売れ残った商品を捨ててよいか」（664語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-destroying-unsold-goods')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「紙飛行機について」（689語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-paper-aeroplanes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「セロハンテープについて」（670語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-sticky-tape')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「キログラムが変わった日」（651語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-kilogram-redefined')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「鎖をたどって大きくなる変化」（654語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-bullwhip-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「迷惑メールの歴史」（552語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-email-spam-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「瞳の形がちがうわけ」（533語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-shapes-of-pupils')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ぬれたイヌが体をふるわけ」（421語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-why-wet-dogs-shake')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「コンピューターのマウスの物語」（414語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-computer-mouse-story')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「悪い貨幣がよい貨幣を追い出すわけ」（545語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-greshams-law')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「煙を待つ種子」（538語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-seeds-woken-by-smoke')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「使う人が増えるほど価値が上がる製品」（663語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-network-effects')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「電話の「ハロー」はどこから来たか」（615語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hello-on-the-telephone')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「医学生は今も人体の解剖を行うべきか」（674語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-cadaver-dissection')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「図書館は古いビデオゲームを自由に公開してよいか」（711語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-old-game-preservation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「エレベーターの音楽について」（664語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-lift-music')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「850語の英語」（618語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-basic-english-850')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「絶対零度への長い競争」（607語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-toward-absolute-zero')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ライバルの店がとなりに並ぶわけ」（532語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-hotelling-rival-shops')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「バオバブ：かわいた季節にそなえる木」（536語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-baobab-water-tree')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「アンパサンドの話」（432語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-ampersand-story')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「かしこい見積もり：フェルミ推定」（409語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-fermi-estimates')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「切れるように作られた電球」（519語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-phoebus-light-bulbs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「氷河の上を動き回るコケの玉」（517語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-glacier-mice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ダイヤモンドと水のなぞ」（623語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-diamond-water-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「校庭で生まれた言語」（610語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-nicaraguan-sign-language')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「タコを食用に養殖すべきか」（745語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-octopus-farming')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「裁判官は有権者が選ぶべきか」（682語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-elected-judges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「続編について」（679語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-sequels')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「びんとつぼについて」（655語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-jars')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「二つの島のあいだの見えない線」（586語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-wallace-line')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「受け入れられる考えの「窓」」（588語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-overton-window')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「オレンジ畑を救った甲虫」（528語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-vedalia-beetle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「重要な少数：80対20の法則」（511語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-pareto-principle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「スイスチーズの穴はどこから来るのか」（400語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-swiss-cheese-holes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「録音された笑い声の話」（432語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-laugh-track')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ヒックの法則：選択肢が多いと時間がかかるわけ」（528語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hicks-law')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「なぜ地図は北が上なのか」（522語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-north-up-maps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「次のページを信じてしまう：ゲルマン健忘症」（617語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-gell-mann-amnesia')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「その場にとどまるために走る：赤の女王仮説」（615語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-red-queen-hypothesis')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「弁護士は勝ったときだけ報酬を受け取るべきか」（738語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-contingency-fees')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「海洋保護区での底引き網漁は禁止すべきか」（675語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-trawling-protected-seas')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ティーポットについて」（659語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-teapots')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「バス停について」（672語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-bus-stops')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「そこにいなかった部隊」（578語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-ghost-army-deception')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「宇宙のつり合いの点」（599語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lagrange-points')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「日光浴をする巨大な魚」（520語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-ocean-sunfish')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「海の底で育つと思われていた実」（518語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-coco-de-mer')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「宇宙から来た石に当たった女性」（438語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hodges-meteorite')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「月へ行った種から育った木」（419語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-moon-trees')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「誕生日が若い選手の将来を左右する理由」（520語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-relative-age-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「一つの顔、三つの感情：クレショフ効果」（517語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-kuleshov-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「砂漠のほら穴にかくされた巻物」（627語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-dead-sea-scrolls')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「宇宙はどこから始まるのか」（631語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-karman-line')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「宝くじの当せん者は名前を明かさずにいることを認められるべきか」（679語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-lottery-winner-anonymity')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「医師の謝罪は裁判で使われないようにすべきか」（662語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-medical-apology-laws')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「植木鉢について」（682語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-flowerpots')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「額縁について」（657語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-picture-frames')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「動かせないほど重いお金：ヤップ島の石」（619語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-yap-stone-money')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「2番目に高い値段を払うと入札者が正直になる理由」（643語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-vickrey-second-price-auction')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「浜辺で最も危険な木」（520語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-manchineel-tree')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「だれにも読めない文字：ロンゴロンゴ」（512語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-rongorongo-script')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「トーストがバターの面を下にして落ちる理由」（430語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-buttered-toast-physics')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「すべての文字を使う文」（406語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pangrams')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「値段が高いほど欲しくなるとき」（520語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-veblen-goods')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「人間に難しいことが機械にやさしい理由」（486語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-moravec-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「天然資源の豊かさが経済を傷つけるとき：オランダ病」（612語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-dutch-disease')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「一つの記号、たくさんの名前：#の物語」（605語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-number-sign-hash')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「路上で演じる人に許可証を求めるべきか」（683語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-busking-licences')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「テレビでの有料の政治広告は禁止すべきか」（653語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-broadcast-political-ads')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「おぼんについて」（661語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-trays')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「雨どいについて」（671語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-gutters')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「顔を合わせない取り引き：沈黙交易」（637語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-silent-trade')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「小さな選択が積み重なり、だれも選ばなかった結果になるとき」（572語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-tyranny-of-small-decisions')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「空へ飛び出す魚」（521語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-flying-fish-glide')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「存在しなかった島々」（540語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-phantom-islands')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ハイタッチを始めたのはだれか」（415語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-high-five-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ピアノのけんばんが黒と白である理由」（421語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-piano-key-colours')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「自分が特別だと思うな：ヤンテのおきて」（513語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-law-of-jante')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「大きく近いボタンほど押しやすい理由」（511語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-fitts-law')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ラブ、デュース、フォーティ：テニスの点の数え方のなぞ」（633語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tennis-scoring-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「船乗りが「ポート」と「スターボード」と言う理由」（625語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-port-and-starboard')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「雇う側が以前の給料をたずねることを禁止すべきか」（708語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-salary-history-bans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「落とし物を届けた人へのお礼を法律で保障すべきか」（688語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-finders-rewards')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「テーブルクロスについて」（692語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-tablecloths')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「スツールについて」（676語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-stools')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ぜいたくを禁じる法律：絹を着てよいのはだれだったか」（644語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-sumptuary-laws')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「人をふやすとおくれた計画がさらにおくれるのはなぜか」（577語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-brooks-law')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「地面から伸びる氷の柱」（539語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-needle-ice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「小さな藻が作った白いがけ」（524語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-chalk-coccoliths')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「くしゃみの後に「ブレス・ユー」と言うのはなぜか」（431語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bless-you-sneezes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ボクシングのリングはなぜ四角いのか」（427語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-square-boxing-ring')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「うっかりか、悪意か：ハンロンのかみそり」（508語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hanlons-razor')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「天気がよければもっと幸せになれるか：焦点の錯覚」（508語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-focusing-illusion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「3点と帽子：ハットトリックの由来」（626語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hat-trick-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ドル記号はどこから来たのか」（630語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-dollar-sign-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「飼い主に犬のDNAの登録を義務づけるべきか」（734語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-dog-dna-registers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「トングについて」（715語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-tongs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「脚立について」（698語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-stepladders')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「赤い旗を持って前を歩く――イギリスの初期の道路の法律」（698語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-red-flag-act')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「豊かになっても幸せにならない？――イースタリンの逆説」（607語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-easterlin-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「月の光でできるにじ」（593語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-moonbows')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「木が石に変わるとき」（579語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-petrified-wood')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「一時停止の標識はなぜ八角形なのか」（428語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-octagonal-stop-signs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「納屋が赤くぬられていることが多いのはなぜか」（411語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-red-barns')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「次は裏が出るはず？――ギャンブラーの誤り」（583語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-gamblers-fallacy')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「一つで十分――ユニットバイアス」（589語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-unit-bias')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ゾウからジェット機へ――「ジャンボ」という語の由来」（641語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-jumbo-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「動詞になった男――「ボイコット」という語の由来」（641語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-boycott-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「遊ぶ子どもの声を騒音の規制の対象外にすべきか」（703語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-childrens-noise-exemption')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「雇い主がハイヒールの着用を求めることは認められるべきか」（685語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-workplace-high-heels')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ロッキングチェアについて」（683語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-rocking-chairs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「針山について」（680語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-pincushions')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「作者に十四年を：アン法」（614語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-statute-of-anne')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ブタ戦争：犠牲がひとつだけだった国境争い」（624語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-pig-war-san-juan')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「氷の芯を持つ丘：北極圏のピンゴ」（557語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-pingos')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「風の中で動かない雲」（575語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-lenticular-clouds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「マラソンはなぜ42.195キロなのか」（414語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-marathon-distance')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「理髪店のしま模様の柱はなぜあるのか」（418語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-barber-poles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「大きなお札はなぜ使いにくいのか」（573語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-denomination-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「人前だと速くなる？社会的促進のなぞ」（549語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-social-facilitation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「牛に焼き印を押さなかった牧場主：「マーベリック」の由来」（622語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-maverick-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「黒い紙に残った大臣の名前：「シルエット」の由来」（612語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-silhouette-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「教員に残業代を支払うべきか」（721語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-teacher-overtime-pay')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「夫婦が別々の名字を名乗ることを認めるべきか」（719語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-separate-married-surnames')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ちょうちんとランタンについて」（730語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-lanterns')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「そでについて」（717語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-sleeves')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「都市の中の都市――九龍城塞」（607語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-kowloon-walled-city')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「自分の立場を知らずに規則を選ぶ――無知のヴェール」（650語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-veil-of-ignorance')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「マストの青い炎――セントエルモの火」（610語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-st-elmos-fire')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「フードゥー――氷と雨が形づくる石の塔」（598語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-hoodoos')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「なぜ多くのタクシーは黄色いのか」（472語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-yellow-taxis')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ベーグルにはなぜ穴があるのか」（457語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bagel-holes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「人は報いを受けるのか――公正世界信念」（602語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-just-world-belief')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「節約がみなを貧しくするとき――節約のパラドックス」（604語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-paradox-of-thrift')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「将軍から大企業へ――「タイクーン」の由来」（657語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tycoon-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ロンドンの病院から混乱を表す言葉へ――「ベドラム」の由来」（676語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-bedlam-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「歩きながらのスマートフォンの使用を禁止すべきか」（753語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-phone-walking-bans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「自転車に乗る人に保険を義務づけるべきか」（724語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-cyclist-liability-insurance')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「笛について」（690語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-whistles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「郵便受けについて」（695語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-letterboxes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「効率の悪い側にも貿易が得になるわけ――比較優位」（593語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-comparative-advantage')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「征服した王国を数える――ドゥームズデイ・ブック」（590語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-domesday-book')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「動かない鳥――ハシビロコウ」（581語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-shoebill-stillness')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「小石に化けた植物――リトープス」（573語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-lithops-living-stones')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ジーンズにはなぜ小さな金属のリベットがついているのか」（431語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-jeans-rivets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「オリンピックの五つの輪はどこから来たのか」（411語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-olympic-rings-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「よい中古車が売りにくいわけ――レモン市場」（574語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-market-for-lemons')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「食費が語るもの――エンゲルの法則」（570語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-engels-law')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「将軍のほおひげ――「サイドバーン」の由来」（646語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-sideburns-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「医師の治療から心をうばわれた観客へ――「メズマライズ」の由来」（636語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-mesmerize-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「日焼けマシンの営業を禁止すべきか」（773語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-commercial-sunbeds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「レポート代行業を禁止すべきか」（730語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-essay-mill-bans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「くずかごについて」（679語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-wastepaper-baskets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「キーホルダーについて」（683語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-keyrings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「仕事の量は決まっているのか――労働総量の誤り」（587語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lump-of-labour-fallacy')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「粘土の図書館――アッシュルバニパルの書板」（580語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-library-of-ashurbanipal')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「何千年も生きる木――ブリッスルコーンパイン」（552語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-bristlecone-pines')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「竜宮の使い？――リュウグウノツカイ」（552語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-oarfish-earthquake-folklore')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「黄色いスマイルマークをえがいたのはだれか」（429語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-smiley-face-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「飲み物の缶のつまみは、なぜはずれないのか」（424語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-stay-on-can-tabs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「よいことを覚えている――ポリアンナ原理」（541語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-pollyanna-principle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「職と物価の交換？――フィリップス曲線」（566語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-phillips-curve')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「三人の王子と幸運な偶然――「セレンディピティ」の由来」（624語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-serendipity-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「手のとどかない水――「タンタライズ」の由来」（628語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tantalize-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「ハッカーへの身代金の支払いを禁止すべきか」（769語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ransomware-payments')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「顔の平たい犬の繁殖を制限すべきか」（767語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-flat-faced-dog-breeding')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「豚の貯金箱について」（713語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-piggy-banks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「バケツについて」（708語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-buckets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「バルト海の門の通行料――エーレスンド海峡通行税」（597語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-sound-dues')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「製品はなぜ作り手の組織に似るのか――コンウェイの法則」（592語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-conways-law')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ピンク色に染まる雪――スイカ雪」（569語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-watermelon-snow')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「冷たい海の天使――クリオネ」（573語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-sea-angel-clione')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「炭酸飲料のペットボトルの底はなぜでこぼこなのか」（426語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-fizzy-bottle-feet')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「なぜ未知の数にxを使うのか」（422語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-x-for-unknown')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「どのカードをめくるか――ウェイソン選択課題」（557語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-wason-selection-task')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「減税で税収はふえるのか――ラッファー曲線」（554語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-laffer-curve')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「聖人の首かざり――「トードリー」の由来」（625語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tawdry-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「言葉になった墓――「マウソレウム」の由来」（618語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-mausoleum-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「毛皮をとるための飼育を禁止すべきか」（773語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-fur-farming-ban')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「複雑な詐欺事件の裁判は陪審なしで行うべきか」（780語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-judge-only-fraud-trials')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「コルク抜きについて」（727語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-corkscrews')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「掲示板について」（708語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-noticeboards')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「パンと地主と自由貿易――穀物法の廃止」（594語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-corn-laws-repeal')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「持ち主が多すぎる――反共有地の悲劇」（609語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-tragedy-of-the-anticommons')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「遠い島のかさ――竜血樹」（560語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-dragons-blood-tree')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「海の底の役者――ミミックオクトパス」（581語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-mimic-octopus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「なぜ昔ながらのサッカーボールは白と黒なのか」（424語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-telstar-football-design')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ネクタイはどこから来たのか」（417語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-necktie-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「今日の一日待ちが長く感じられるのはなぜか――双曲割引」（561語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hyperbolic-discounting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「競売で勝つことが損になるのはなぜか――勝者の呪い」（587語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-winners-curse')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「舞台の上の強制労働――「ロボット」の由来」（669語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-robot-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「真ちゅうに残る発明者の名前――「サクソフォン」の由来」（664語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-saxophone-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「歩道への駐車は禁止すべきか」（758語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-pavement-parking-ban')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ふきんについて」（694語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-tea-towels')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「明かりのスイッチについて」（713語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-light-switches')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「パンと賃金と救済――スピーナムランド制度」（587語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-speenhamland-system')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「土地に裏づけられたお金――フランス革命のアシニア」（567語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-assignats-revolution')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ガをつり上げる――ボーラスグモ」（619語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-bolas-spider')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「味方か、ただ乗りか――ウシツツキ」（554語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-oxpecker-friend-or-foe')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ポロの名前をもらったテニスのシャツ」（448語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-polo-shirt-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ざんごうから街へ――トレンチコート」（418語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-trench-coat-origins')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ほかの人の予想を予想する――ケインズの美人投票」（564語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-keynesian-beauty-contest')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「にせ者のように感じる――インポスター現象」（563語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-impostor-phenomenon')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ぴくりと動くカエルの脚と有名な論争――「ガルバナイズ」の由来」（660語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-galvanize-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「「精妙博士」から教室のすみへ――dunce（劣等生）の由来」（644語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-dunce-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「スマートメーターは義務にすべきか」（763語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-compulsory-smart-meters')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「家主はペットを断ってよいか」（746語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-pets-in-rented-homes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ドアノブについて」（702語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-doorknobs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「街灯について」（698語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-lampposts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「紙でできた富――ジョン・ローとミシシッピ計画」（600語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-mississippi-scheme')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「最後の生き残りがすべてを得る――トンチン」（595語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-tontines')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「山の道化者――ケア」（548語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-kea-mountain-parrot')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「スペインのものでも、こけでもない――サルオガセモドキ」（560語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-spanish-moss')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「飛行機の窓はなぜ丸いのか」（444語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-round-aircraft-windows')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「多くのペンのキャップにはなぜ穴があるのか」（435語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pen-cap-holes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「いやな記憶はなぜ痛みを失うのか――フェーディング・アフェクト・バイアス」（541語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-fading-affect-bias')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「情報源が忘れられるとき――スリーパー効果」（545語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-sleeper-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「胸の上にすわる訪問者――「ナイトメア」の由来」（663語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-nightmare-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「空中ブランコの勇かんな若者――「レオタード」の由来」（634語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-leotard-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「刑事責任を問える年齢は引き上げるべきか」（756語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-age-of-criminal-responsibility')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「ゼロ時間契約は禁止すべきか」（713語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-zero-hours-contracts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「窓台について」（728語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-windowsills')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ロッカーについて」（740語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-lockers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「羊毛に包まれて墓へ――イングランドの埋葬の法律」（607語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-burial-in-wool-acts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「すべての食卓にかかる税――フランスの塩の税」（600語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-gabelle-salt-tax')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「木をたたく霊長類――アイアイ」（580語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-aye-aye-tapping-finger')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「部屋でいっぱいの貝がら――オウムガイ」（581語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-nautilus-chambered-shell')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ネコのためのドア」（434語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-cat-flap-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「見た目より近い――車の鏡」（430語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-closer-than-they-appear')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「知らずに借りる――潜在記憶による盗用」（548語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-cryptomnesia')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「成功は自分のおかげ、失敗はほかのせい――自己奉仕バイアス」（549語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-self-serving-bias')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「肉屋の台から散らかった状態へ――「シャンブルズ」の由来」（687語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-shambles-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「戦場に残った将校の名前――「シュラプネル」の由来」（693語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-shrapnel-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「化石燃料の広告は禁止すべきか」（764語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-fossil-fuel-advertising')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「集合住宅に階段が一つしかないことを認めるべきか」（768語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-single-staircase-buildings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「バックルについて」（728語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-buckles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「玄関の段について」（744語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-doorsteps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「お金として使われた貝：植民地時代のニューイングランドのワンパム」（636語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-wampum-shell-beads')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ナツメグが育った島々」（619語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-banda-islands-nutmeg')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「暗やみに住むサンショウウオ：ホライモリ」（575語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-olm-cave-salamander')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「のりでかりをする虫」（620語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-velvet-worm-glue')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ある看護師のために作られた手袋」（411語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-surgical-gloves-nurse')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「飛び出すトースター」（424語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pop-up-toaster')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「やかんがわく直前に静かになるのはなぜか」（576語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-kettle-quiet-before-boiling')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「羊毛が熱いお湯の洗たくでちぢむのはなぜか」（546語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-wool-felting-shrink')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「慈悲を求めた医師：guillotine という語の由来」（679語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-guillotine-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ロンドンの通りから生まれた名前：hooligan という語の由来」（692語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hooligan-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「船の速度を制限すべきか」（737語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ship-speed-limits')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「相続に税をかけるべきか」（759語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-inheritance-tax')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「まな板について」（756語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-chopping-boards')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「そりについて」（710語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-sledges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「存在しなかった物質――フロギストン」（646語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-phlogiston-theory')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「航海にあたいした木――パンノキとバウンティ号」（639語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-breadfruit-bounty-voyage')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「音で道を見つける鳥――アブラヨタカ」（599語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-oilbird-cave-clicks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「幽霊から逃げる――プロングホーン」（582語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-pronghorn-speed')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「会社の名前になったシャープペンシル」（442語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-mechanical-pencil-sharp')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「道路の真ん中の線」（437語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-road-center-line')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「たたいたカップの音が待つうちに高くなるわけ」（558語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hot-chocolate-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「部屋に入るとめがねがくもるわけ」（563語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-glasses-fog-indoors')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ベンガル風の家――「バンガロー」という言葉の由来」（657語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-bungalow-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「訓練を愛した士官――「マーティネット」という言葉の由来」（660語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-martinet-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「道路に野生動物のための橋を造るべきか」（706語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-wildlife-crossings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「新しい法律に有効期限をつけるべきか」（711語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-sunset-clauses')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「雨戸とシャッターについて」（719語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-shutters')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「時刻表について」（719語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-timetables')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「一部の人にしか見えなかった光線――N線の話」（642語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-n-rays-blondlot')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「月にすむつばさのある人々――1835年の新聞のでっち上げ」（630語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-great-moon-hoax-1835')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「うまく閉じないくちばし――イスカ」（597語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-crossbill-crossed-beak')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「歩いて狩りをする鳥――ヘビクイワシ」（590語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-secretary-bird-kick')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ゴルフボールが小さなくぼみでおおわれているわけ」（448語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-golf-ball-dimples')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「燃料計の小さな矢印」（452語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-fuel-gauge-arrow')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ぬれたものが暗く見えるわけ」（573語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-wet-things-look-darker')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「卵を回して火が通っているかを知る」（565語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-spinning-egg-test')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「大きな山車に乗った神――「ジャガーノート」という言葉の由来」（682語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-juggernaut-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「家系図の中の鳥の足――「ペディグリー」という言葉の由来」（668語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-pedigree-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「内部告発者に罰金の一部を支払うべきか」（712語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-whistleblower-rewards')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「家には日光を受ける法的な権利があるべきか」（714語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-right-to-light')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「おつかいについて」（692語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-errands')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「数を丸めることについて」（676語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-rounding')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「コーヒーハウスから保険市場へ――ロイズの物語」（630語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lloyds-coffee-house')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「数十億羽から一羽もいなくなるまで――リョコウバト」（623語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-passenger-pigeon-extinction')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「一つの砂漠の池にすむ一つの種――デビルズホール・パップフィッシュ」（567語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-devils-hole-pupfish')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「長い足の指と熱心な父親――レンカク」（554語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-jacana-father-care')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ヘリウムで声がおかしく聞こえるわけ」（462語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-helium-voice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「扇風機の羽根がとてもほこりっぽくなるわけ」（451語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-dusty-fan-blades')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「一部の街灯がオレンジ色に光っていたわけ」（568語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-sodium-lamp-orange')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「画面の中で車輪が逆に回って見えるわけ」（563語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-wagon-wheel-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「絞首台から油田へ――「デリック」という言葉の由来」（665語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-derrick-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「土ぼこりの色――「カーキ」という言葉の由来」（664語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-khaki-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「政府は民間の開発のために家を取り上げてよいか」（724語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-land-taken-for-private-projects')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「未来の出来事にお金をかけることを認めるべきか」（707語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-prediction-markets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「近道について」（717語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-shortcuts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ねむれない夜について」（672語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-sleepless-nights')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「金に結びつけられたお金――ブレトンウッズ体制の始まりと終わり」（641語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-bretton-woods-system')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「石の中のふしぎな動物たち――バージェス・シェール」（658語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-burgess-shale-fossils')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「なかまの最後の生き残り――ニュージーランドのトゥアタラ」（581語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-tuatara-ancient-reptile')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「危険なつめをもつ庭師――ヒクイドリ」（544語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-cassowary-forest-gardener')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「影のふちがぼやけるわけ」（423語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-soft-shadow-edges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ドライアイスが白いけむりを出すわけ」（408語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-dry-ice-fog')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「回転するボールが空中で曲がるわけ」（539語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-magnus-effect-curving-ball')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「変圧器がブーンと鳴るわけ」（510語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-transformer-hum')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ホールの刻印――「ホールマーク」という言葉の由来」（648語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hallmark-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「バグダッドの町から家のネコへ――「タビー」という言葉の由来」（628語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tabby-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「刑務所を利益のために運営してよいか」（789語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-prisons-run-for-profit')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「内部の情報を使った株の売買は犯罪であるべきか」（771語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-insider-trading-crime')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「散髪について」（737語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-haircuts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「雪どけについて」（725語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-thawing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「細菌で病気とたたかう――ボルバキアと蚊」（604語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-wolbachia-mosquitoes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「海での損失を分け合う――共同海損という決まり」（662語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-general-average-sea-law')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「巨大な鳥をとらえたワシ」（580語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-haasts-eagle-moa')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「オスなしで生きる小さな動物」（554語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-bdelloid-rotifers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「谷間の集会――アイスランドのアルシング」（449語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-althing-thingvellir')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ナマコ――海底の静かなそうじ屋」（455語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-sea-cucumbers-seafloor')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「石にきざまれた法――ハンムラビ法典」（544語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-code-of-hammurabi')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「囚人を連れてこい――人身保護令状の物語」（522語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-habeas-corpus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「白い服を着た人――「キャンディデート」という言葉の由来」（616語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-candidate-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「皮ふの下の小さなネズミ――「マッスル」という言葉の由来」（628語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-muscle-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「めずらしい化石を個人に売ってよいか」（781語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-fossil-sales')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「スポーツのリーグは最も弱いチームを下の部へ落とすべきか」（788語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-promotion-relegation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「えんとつについて」（749語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-chimneys')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「じゃりについて」（721語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-gravel')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「病原体のない病気――クールーとプリオンの発見」（643語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-kuru-prions')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「空っぽではなかった土地――マボ判決」（639語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-mabo-native-title')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「お金が価値を失ったとき――1923年のドイツ」（542語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-weimar-hyperinflation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「さわると毒のある鳥――ズグロモリモズ」（589語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-hooded-pitohui')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「バク――夢のような名前をもつ本物の動物」（444語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-tapir-baku')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「だれもが見られる法――ローマの十二表法」（420語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-twelve-tables-rome')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「国全体のための一つの法――ナポレオン法典」（541語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-napoleonic-code')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「カピバラ――世界最大のネズミの仲間」（559語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-capybara')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「迷路をぬける糸――clue という語の由来」（665語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-clue-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「パンを分け合う――companion という語の由来」（676語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-companion-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「陪審の評決は全員一致でなければならないか」（712語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-unanimous-juries')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「公共の建物にAEDの設置を義務づけるべきか」（739語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-public-defibrillators')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「腕時計について」（714語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-wristwatches')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「方眼紙について」（671語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-graph-paper')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「表のすき間――メンデレーエフが予言した元素」（608語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-mendeleev-missing-elements')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「太陽系を測る――金星の太陽面通過」（623語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-transits-of-venus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「多すぎる金――マンサ・ムーサのメッカへの旅」（586語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-mansa-musa-gold')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「冷たい海での何百年――ニシオンデンザメ」（559語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-greenland-shark')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「クオッカ――ほほえんでいるように見える動物」（450語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-quokka-rottnest')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「すべての本に番号を――ISBNの話」（448語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-isbn-book-numbers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「光で身をかくすイカ――ハワイミミイカ」（555語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-bobtail-squid-light')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「灯台の費用はだれがはらったのか――経済学のなぞ」（558語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-lighthouse-economics')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「星のせいにされた病気――「インフルエンザ」の語源」（646語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-influenza-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「クマの皮を着た戦士――「バーサーク」の語源」（646語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-berserk-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「保釈金の制度はなくすべきか」（746語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-cash-bail')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「空港は夜間の飛行を禁止すべきか」（722語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-airport-night-flights')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「たこについて」（725語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-calluses')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「折り目について」（731語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-creases')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「またたく星と宇宙の大きさ――ヘンリエッタ・リービット」（623語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-leavitt-cepheid-distances')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「米の約束――大坂の堂島米市場」（641語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-dojima-rice-futures')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「おくれてきた衛星――レーマーはどのように光の速さを測ったか」（565語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-romer-speed-of-light')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「北里しば三郎と破傷風とのたたかい」（555語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-kitasato-tetanus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「納豆――ねばねばの豆」（508語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-natto-sticky-beans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「水の上を歩く――アメンボ」（431語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-water-strider-legs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「音でえがく図形――クラドニ図形」（558語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-chladni-sound-figures')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「価格が毎日は変わらないのはなぜか――メニュー・コスト」（563語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-menu-costs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「月のせいにされた心――「ルナティック」の語源」（680語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-lunatic-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「こわれた台――「バンクラプト」の語源」（664語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-bankrupt-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「灰色の川魚から金色のペットへ――金魚の物語」（423語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-goldfish-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「角のあるご近所さん――ならのシカ」（435語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-nara-park-deer')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「遅れたことの証明――日本の電車の遅延証明書」（525語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-train-delay-certificates')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「梅の実のころの雨――日本に梅雨がある理由」（526語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-tsuyu-rainy-season')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「塩で給料？――「サラリー」の語源」（626語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-salary-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「肉を食べる石――「サルコファガス」の語源」（633語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-sarcophagus-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「象牙の売買はすべて禁止すべきか」（688語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ivory-trade-ban')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「ペットのクローンを作るべきか」（701語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-pet-cloning')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「きしむ床板について」（724語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-creaking-floorboards')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「かっこについて」（693語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-parentheses')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「魔法の弾丸をさがして：エールリッヒ、はた佐八郎とサルバルサン」（590語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-salvarsan-magic-bullet')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「大きくなる町に水を：玉川上水」（603語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-tamagawa-aqueduct')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「止まることを知っていた織機：豊田佐吉」（547語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-toyoda-automatic-loom')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「二つの国をつないだ化学者：高峰譲吉」（549語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-takamine-adrenaline')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「秋の風が生むあまさ――ほしがき」（411語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-hoshigaki-dried-persimmons')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「漢字の上の小さな助け――ふりがな」（403語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-furigana-reading-aids')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「うでで作る文字――手旗信号」（510語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-flag-semaphore')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「すっぱくて塩からくて赤い――梅干しができるまで」（515語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-umeboshi-pickled-ume')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「テーブルの伯爵？――「サンドイッチ」の語源」（606語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-sandwich-word-origin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「ガマの穂からカニカマへ――すり身の科学」（623語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-surimi-fish-paste')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「南極の観光は制限すべきか」（759語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-antarctic-tourism-limits')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「提供された精子や卵子で生まれた人は提供者を知るべきか」（746語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-donor-anonymity')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ハイフンについて」（706語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-hyphens')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「客間について」（715語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-guest-rooms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「見落とされていた項：木村栄と動く極」（598語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-kimura-z-term')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「細菌の名前になった人：志賀潔と赤痢」（588語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-shiga-dysentery-bacillus')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「人形と時計と工場：発明家・田中久重」（538語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-tanaka-hisashige-clock')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「仙台から生まれた強い磁石：本多光太郎とKS鋼」（510語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-honda-ks-steel')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ドアの上の小さな緑の走る人」（453語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-running-man-exit-sign')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「去年の冬の雪ですずしく――雪むろ」（435語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-yukimuro-snow-rooms')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「雨をためる田んぼ――田んぼダム」（508語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-paddy-field-dams')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「魚のための階段――ダムをこえる」（502語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-fish-ladders-dams')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「知るには早すぎ、変えるには遅すぎる――コリングリッジのジレンマ」（633語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-collingridge-dilemma')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「失敗を先に想像する――プレモーテム」（618語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-premortem-planning')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「植物性の食品に「ミルク」や「バーガー」と名づけてよいか」（786語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-plant-based-food-names')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「ホテルは使いすての洗面用品を配るのをやめるべきか」（738語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-hotel-toiletries')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「切り株について」（766語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-tree-stumps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「はかりについて」（741語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-weighing-scales')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「アンバーグリス：マッコウクジラが生む不思議な宝」（687語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-ambergris')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「4色で足りる：地図の問題とコンピューターによる証明」（627語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-four-colour-theorem')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「黒潮：海の中の暖かい川」（612語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-kuroshio-current')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「波と競争する：津波警報のしくみ」（601語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-tsunami-warnings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「地図に加わる新しい記号」（483語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-japan-map-symbols')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「持ち歩ける音楽――ウォークマン」（443語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-walkman-headphone-music')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ひとりでに漁を続ける網――ゴーストネット」（544語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-ghost-fishing-nets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「広島で生きのびた木々」（488語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hiroshima-surviving-trees')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「「やっかいな問題」――最終的な答えのない問題」（623語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-wicked-problems-planning')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「「ノーマル・アクシデント」――仕組みにひそむ事故」（607語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-normal-accidents-perrow')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「海水浴場をサメよけの網で守るべきか」（755語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-shark-nets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「古いダムは取りこわすべきか」（765語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-old-dam-removal')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「歩道橋について」（751語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-footbridges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「マグカップについて」（738語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-mugs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「かわいた霧の夏：アイスランドのラキ火山の噴火」（631語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-laki-eruption-1783')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「小さなダニとミツバチの苦難」（633語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-varroa-mite-honeybees')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「シルフィウム：古代の世界が使いつくした植物」（607語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-silphium-lost-plant')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「スキャブランドをけずった大洪水」（599語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-missoula-floods')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「田んぼにえがかれる絵」（479語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-rice-paddy-art')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「バスが続けて来るわけ」（473語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bus-bunching')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「楽しむために閉じこめられる――脱出ゲームの広がり」（511語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-escape-room-games')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「声に出してつづる――英語にスペリング・ビーがあるわけ」（501語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-spelling-bee-english')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「数えられるものだけを見る危うさ――マクナマラの誤り」（673語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-mcnamara-fallacy-measurement')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「カーテンのうしろの人――「オズの魔法使い」型の実験」（633語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-wizard-of-oz-testing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「議員の株の売買は禁止すべきか」（794語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-lawmaker-share-trading')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「列車のおくれは自動で補償すべきか」（748語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-automatic-delay-compensation')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「一個の石けんについて」（740語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-bar-of-soap')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「段ボール箱について」（667語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-cardboard-boxes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「宇宙から来る粒子で石の中を見る」（655語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-muon-imaging')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「女優の特許：ヘディ・ラマーと周波数ホッピング」（616語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lamarr-frequency-hopping')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「一度は見すてられた瞬間接着剤」（588語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-superglue-cyanoacrylate')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「画面はどうやって指を感じるのか」（600語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-capacitive-touchscreens')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「車線がへるところで交互に入る」（476語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-zipper-merge-lanes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「降水確率30%の意味」（415語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-chance-of-rain-forecast')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「道の駅――電車の来ない駅」（487語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-michi-no-eki-roadside')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「駅につけられた記号と番号」（496語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-station-numbering-japan')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「完ぺきとくらべるわな――ニルヴァーナの誤り」（635語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-nirvana-fallacy-perfect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「念のため、はどこまで正しいか――予防原則」（639語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-precautionary-principle-risk')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「プラスチックごみの輸出はやめるべきか」（778語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-plastic-waste-exports')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「投票に写真つきの身分証明は必要か」（788語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-voter-photo-id')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ゴム印について」（734語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-rubber-stamps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「延長コードについて」（764語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-extension-cords')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「水をこおらせる細菌」（633語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-ice-nucleating-bacteria')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「火山の噴煙の中の雷」（628語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-volcanic-lightning')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「スタジアムを回るウェーブのしくみ」（564語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-stadium-wave-physics')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「マリー・サープと海底の山脈」（634語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-marie-tharp-ocean-floor')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「トマトのタイマーで勉強する」（510語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pomodoro-tomato-timer')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「氷をなめらかにもどす機械」（493語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-ice-resurfacing-machine')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「グラン・サン・ベルナールの犬たち」（522語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-saint-bernard-pass-dogs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「山の上から煙を見はる」（504語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-fire-lookout-towers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「砂漠が熱帯雨林をやしなうしくみ」（627語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-sahara-dust-amazon')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「店が損をして売る商品」（616語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-loss-leader-pricing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「超加工食品に警告表示は必要か」（800語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ultra-processed-food-labels')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「腎臓の売買は認められるべきか」（790語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-kidney-sales')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「道しるべについて」（721語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-signposts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「下げふりについて」（736語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-plumb-lines')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「火山の上で引かれた線：キーリング曲線」（683語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-keeling-curve-mauna-loa')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「タラ戦争：小さな国はどうして漁場を守ったか」（670語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-cod-wars-iceland')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「砂が温かいとメスがふえる：ウミガメの性別を決める温度」（626語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-turtle-nest-temperature')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「樹皮がはがれる木があるのはなぜか」（625語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-bark-shedding-trees')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「バスや電車の座席の模様のひみつ」（484語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-transit-seat-moquette')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「滑走路のそばの布の筒」（463語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-airport-windsock')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「サメの皮ふの小さな歯」（522語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-shark-skin-denticles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「蚊取り線香はなぜうずまきなのか」（505語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mosquito-coil-spiral')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「工場で作ったダイヤモンドは本物か」（661語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-lab-grown-diamonds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「テーブルのないレストラン」（616語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-ghost-kitchens')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「少数の議員が採決を止めてよいか」（694語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-senate-filibuster')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「理由を示さずに陪審員を外してよいか」（676語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-peremptory-jury-challenges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「日曜の夕方について」（697語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-sunday-evenings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「数秒の差で電車を逃すことについて」（725語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-missing-a-train')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「月の地面がゆれるとき」（668語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-moonquakes-apollo-seismometers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「澄むかにごるか：浅い湖の二つの状態」（656語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-shallow-lakes-two-states')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ひとにぎりの土から生まれた薬：大村さとし」（579語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-omura-satoshi-avermectin')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「枝のふりをする鳥：タチヨタカ」（584語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-potoo-branch-disguise')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ガードレールが曲がるわけ」（465語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-roadside-guardrail-design')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「洪水とたたかう砂ぶくろ」（415語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-flood-sandbag-walls')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「雪をつかまえるさく」（500語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-snow-fence-drifts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「牛がわたらない金属の格子」（492語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-cattle-grid-crossings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「かべの下の小さな穴」（637語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-retaining-wall-weep-holes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「トンネルの入口が昼にいちばん明るいわけ」（646語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-tunnel-entrance-lighting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「だれの納税記録も公開すべきか」（716語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-public-tax-records')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「プロボクシングは禁止すべきか」（654語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ban-professional-boxing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「家具の配置がえについて」（681語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-rearranging-furniture')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ノックについて」（656語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-knocking')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「世界の屋根をこえて：インドガン」（654語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-bar-headed-geese-himalayas')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「足もとの境目：モホロビチッチと地殻の底」（632語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-mohorovicic-discontinuity')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「砂に円をえがく魚」（535語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-pufferfish-sand-circles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「草でできた集合住宅：シャカイハタオリ」（545語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-sociable-weaver-nests')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「手で作る海の塩」（425語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-sea-salt-by-hand')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「タンポポのわた毛が飛ぶしくみ」（408語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-dandelion-seed-flight')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「コーヒーを茶に変えた菌」（506語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-ceylon-coffee-rust')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「風よけの後ろを走る」（483語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-drafting-air-resistance')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「同じ音の言葉があふれる言語」（632語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-japanese-homophones')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「南極の氷の上でいん石をさがす」（638語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-antarctic-meteorite-hunting')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「教師の給料を生徒の成績で決めるべきか」（792語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-teacher-pay-by-results')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「薬剤師に薬の処方をみとめるべきか」（704語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-pharmacists-prescribing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ぬりたてのペンキについて」（703語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-wet-paint')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「車の警笛について」（720語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-car-horns')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「水からくみ出された土地：オランダのポルダー」（640語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-dutch-polders')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「船が雲にえがく線」（625語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-ship-track-clouds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「季節とともに長さが変わる時刻の時計」（608語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-japanese-seasonal-clocks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「外科医が緑や青の服を着るわけ」（558語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-surgeons-green-clothes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「クジラの群れが浜に乗り上げるわけ」（438語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pilot-whale-mass-strandings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「氷の海に道を開く船」（399語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-icebreaker-ships')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「雨で動く二つの海の近道」（507語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-panama-canal-rainwater')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「おくり物の水引とのしが語ること」（500語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-noshi-mizuhiki-meanings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「一度目と二度目の眠り」（619語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-first-and-second-sleep')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「七日の週がかえられないわけ」（639語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-seven-day-week-survival')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「人の遺伝子に特許をみとめるべきか」（766語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-human-gene-patents')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「亡くなった俳優や歌手をデジタルでよみがえらせるべきか」（790語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-digital-dead-performers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「発信音のあとの伝言について」（695語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-messages-after-the-tone')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「種の袋について」（678語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-seed-packets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「核実験が残した時計：細胞の年齢をはかる」（682語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-bomb-pulse-cell-dating')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「4キロの氷の下の湖：ボストーク湖」（645語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-lake-vostok-under-ice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「神社にかけられた幾何学：日本の算額」（545語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-sangaku-temple-geometry')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「いちばん小さなえさを食べるおだやかな巨人：ウバザメ」（549語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-basking-shark-filter-feeder')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「川を読む：エジプトのナイロメーター」（430語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-nilometers-egypt')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「耳もとの声：美術館の音声ガイドの歴史」（404語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-museum-audio-guides')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「グアムの森を静かにしたヘビ」（500語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-guam-brown-tree-snake')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「動物園からもどってきた野生の馬」（505語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-przewalski-horse-return')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「くじで選ぶ政治？市民議会の広がり」（647語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-citizens-assemblies-lot')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「フェアトレードのラベルにできること、できないこと」（621語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-fair-trade-labels')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「赤ちゃんポストを設けるべきか」（770語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-baby-hatches')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「少年の加害者の名前を公表すべきか」（705語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-naming-young-offenders')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「大皿に残った最後の一切れについて」（775語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-last-piece')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ウインドーショッピングについて」（719語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-window-shopping')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「赤と灰色：イギリスのリスたちの争い」（626語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-grey-squirrels-britain')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ハエが運ぶ病気：睡眠病との戦い」（636語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-sleeping-sickness-tsetse')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「春の海の青い光：富山湾のホタルイカ」（539語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-firefly-squid-toyama')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「氷の上の釣り：凍った湖のワカサギ」（533語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-wakasagi-ice-fishing')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「古いかべの青い丸：ロンドンのブルー・プラーク」（417語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-london-blue-plaques')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「鳥の足の小さな輪」（405語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bird-ringing-rings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「インドの空からハゲワシを消した薬」（517語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-india-vulture-decline')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「メッセージで送るお金：ケニアのエムペサ」（514語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mpesa-mobile-money')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「一つの文に二つの言語：コード・スイッチングを考え直す」（649語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-code-switching-languages')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「だれでも書きかえられる百科事典は信用できるか」（653語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-wikipedia-reliability')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「研究費の一部をくじで配るべきか」（663語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-research-funding-lottery')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「受刑者に仕事の正当な賃金を払うべきか」（676語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-prison-wages')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「本の背について」（667語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-book-spines')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ちびた鉛筆について」（663語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-pencil-stubs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「50まで数える細胞：ヘイフリックの限界」（617語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-hayflick-limit')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「大きな体なのにがんが少ない：ペトのパラドックス」（627語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-peto-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「四つ目の錐体：もっと多くの色が見える人はいるのか」（559語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-tetrachromacy')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「砂糖を雲に変える：わたあめの話」（569語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-cotton-candy-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「川をふさぐ鋼の門：ロンドンのテムズ・バリア」（414語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-thames-barrier-gates')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「仲間の顔を見分けるハチ」（408語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-paper-wasp-faces')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「フォードランディア：熱帯雨林の中の工場の町」（511語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-fordlandia-rubber-town')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「うすい空気の中で元気に暮らす：チベットの人々の高地への適応」（519語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-tibetan-high-altitude-genes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「多すぎるプランクトンの種類：ハッチンソンのなぞ」（647語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-plankton-paradox-hutchinson')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「第1幕に銃があらわれたら：チェーホフの銃という原則」（655語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-chekhovs-gun-principle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「大学の授業は成績を相対評価でつけるべきか」（664語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-grading-on-a-curve')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「急を要しない救急車の利用は有料にすべきか」（670語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ambulance-fees')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「受け皿について」（702語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-saucers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「栓抜きについて」（683語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-bottle-openers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ゼリーの中の輪：リーゼガング環のなぞ」（658語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-liesegang-rings')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「流しの中の輪：ハイドロリックジャンプの科学」（661語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-hydraulic-jump')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「電気がえがく木：リヒテンベルク図形」（542語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-lichtenberg-figures')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「決して話さない給仕：ダムウェイターの物語」（551語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-dumbwaiter')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「農家の畑の下の金：スタッフォードシャーの埋蔵品」（420語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-staffordshire-hoard-gold')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「7つの橋と答えのないパズル」（416語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-konigsberg-seven-bridges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「エニグマを破る：ブレッチリー・パークの静かな仕事」（522語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-bletchley-enigma-codebreakers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「タラがいなくなった日：グランドバンクス」（510語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-grand-banks-cod-collapse')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「みんなどこにいるのか：フェルミのパラドックス」（641語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-fermi-paradox-silence')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「あなたのノートは心の一部か」（646語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-extended-mind-notebook')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「病院は患者や見舞い客から駐車料金を取るべきか」（659語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-hospital-parking-charges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「電車は助けが必要な人のための席を残しておくべきか」（662語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-priority-seats')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「エッグカップについて」（672語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-egg-cups')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「なべ敷きについて」（673語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-trivets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「はねるシャンプー：ケイ効果」（656語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-kaye-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「こおった海にさく氷の花」（662語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-sea-ice-frost-flowers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「日光で書かれた知らせ：ヘリオグラフ」（548語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-heliograph')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「紙のリボンにのった値段：株式ティッカー」（546語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-stock-ticker')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「針で語られた物語：バイユーのタペストリー」（421語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-bayeux-tapestry-needle-story')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ティー・クリッパー最後の競走」（439語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-cutty-sark-tea-clipper')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「政治が科学を決めたとき：ルイセンコ」（513語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-lysenko-soviet-biology')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「港を自分たちで持ってくる：マルベリー計画」（512語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-mulberry-floating-harbours')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「メアリーが知らなかったこと：色をめぐるなぞ」（647語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-marys-room-knowledge-argument')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「分子をより分ける悪魔」（648語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-maxwells-demon-information')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「乗客は飛行中に電話をかけてよいとすべきか」（670語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-phone-calls-on-flights')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「地元の電車やバスで物を食べることは禁止すべきか」（669語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-eating-on-local-trains')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「オーブン用の手袋について」（685語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-oven-gloves')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ちりとりについて」（670語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-dustpans')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「配管の中の衝撃音：ウォーターハンマー」（660語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-water-hammer')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「流れが曲面にそうわけ：コアンダ効果」（696語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-coanda-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「止まらないエレベーター：パタノスター」（549語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-paternoster-lifts')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「管を通る声：伝声管」（541語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-speaking-tubes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「さびない鉄の柱」（425語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-iron-pillar-delhi-rust')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「塩でほられた礼拝堂」（428語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-wieliczka-salt-mine-chapel')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ハーメルンで本当は何が起きたのか」（524語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-hamelin-pied-piper-history')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ロジャー・ティチボーンだと名乗った男」（520語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-tichborne-claimant-trial')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「正しく、根拠があっても知識ではない？　ゲティア問題」（639語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-gettier-problem-knowledge')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「表か裏か？　眠り姫問題」（647語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-sleeping-beauty-probability')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「ギフトカードに有効期限をつけてよいとすべきか」（679語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-gift-card-expiry')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「飲食店はあまい飲み物のおかわり無料を提供してよいとすべきか」（657語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-free-drink-refills')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ティースプーンについて」（677語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-teaspoons')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「水切りざるについて」（667語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-colanders')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「スプーンをのぼる液体：ワイセンベルク効果」（666語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-weissenberg-effect')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「夕ぐれに赤が暗くなるとき：プルキンエ現象」（665語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-purkinje-shift')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「水をしぼり出す：洗濯用マングルの歴史」（543語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-laundry-mangles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「聞くためのじょうご：補聴ラッパの歴史」（542語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-ear-trumpets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「波がひく音楽」（424語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-zadar-sea-organ-waves')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「人々が地下でくらす町」（426語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-coober-pedy-dugout-homes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「カーディフの石の巨人」（523語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-cardiff-giant-stone-hoax')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「畑の下にかくれた都市」（514語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-derinkuyu-underground-city')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「1つの箱か2つの箱か：ニューカムの問題」（660語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-newcomb-problem-two-boxes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「おどろきにならないはずのテスト」（649語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-surprise-exam-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「1つの屋根の下の町」（460語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-whittier-town-one-building')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「こまかく分かれた町」（436語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-baarle-border-puzzle-town')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「巨大な結晶でいっぱいの部屋」（522語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-naica-giant-crystal-cave')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「移らなければならなかった町」（522語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-kiruna-town-moves-east')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「友だちのほうが人気者に見えるわけ」（646語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-friendship-paradox-feld')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「意図に100万ドル」（661語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-kavka-toxin-puzzle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「都市は観光用の馬車を禁止すべきか」（676語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-horse-drawn-carriages')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「水切りかごについて」（672語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-dish-racks')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ふろの栓について」（659語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-bath-plugs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「熱したなべの中の六角形：ベナール対流」（679語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-benard-convection-cells')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「つぶれる泡から出る光：ソノルミネセンス」（672語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-sonoluminescence')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「インクをかわかす：吸い取り紙の歴史」（555語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-blotting-paper')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「一つの台に二つの時計：チェス・クロックの話」（565語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-chess-clock')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「国が入れかわる島」（438語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pheasant-island-two-flags')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「住民が1人の村」（441語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-monowi-village-of-one')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「消えない火」（522語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-darvaza-burning-crater')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「海で最も孤独な場所」（520語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-point-nemo-ocean-pole')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「緑のリンゴはカラスについて教えてくれるか」（647語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hempel-raven-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「はじめて形を見るとき」（655語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-molyneux-blind-cube-sphere')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「陪審員が証人に質問することをみとめるべきか」（684語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-juror-questions')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「医者は白衣を着るのをやめるべきか」（674語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-doctors-white-coats')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「茶こしについて」（675語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-tea-strainers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「ペーパーナイフについて」（661語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-letter-openers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「暗やみの火花：トリボルミネセンス」（669語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-triboluminescence')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「飲みつづける鳥：水飲み鳥のしくみ」（678語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-drinking-bird')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「かんたんな武器：ハエたたきの物語」（570語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-fly-swatter')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「チリンチリン：自転車のベルの歴史」（576語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-bicycle-bell')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「寒さの村のくらし」（437語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-oymyakon-pole-of-cold')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ビールがロンドンの通りをおそった日」（437語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-london-beer-flood-1814')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「どの国もほしがらない砂漠」（517語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-bir-tawil-unwanted-land')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「何もない視野に見えるもの」（518語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-ganzfeld-empty-field')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「自分を偽だと言う文」（659語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-liar-paradox-truth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「理解せずに規則にしたがう」（665語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-searle-chinese-room')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「財産をほり出した島」（453語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-nauru-phosphate-island')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「燃やされつづけるヤギ」（432語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-gavle-straw-goat')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「数のない言語」（505語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-piraha-without-numbers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「2つの山の間のロバ」（518語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-buridans-ass-choice')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「あなたは機械につながるか」（653語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-nozick-experience-machine')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「運が罪を決めるとき」（660語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-moral-luck-drivers')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「手紙の配達日をへらすべきか」（701語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-letter-delivery-days')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「裁判官は判決をわかりやすいことばで書くべきか」（681語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-plain-language-judgments')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「洋服ブラシについて」（682語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-clothes-brushes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「こおった地面がわれるとき」（684語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-frost-quakes')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「ガリレオが作らなかった温度計」（679語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-galileo-thermometer')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「机の上でカチカチ鳴る玉」（586語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-newtons-cradle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「びんの中の天気予報」（573語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-storm-glass')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「宝船の艦隊をひきいた提督」（466語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-zheng-he-treasure-voyages')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「嵐が掘り出した村」（458語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-skara-brae-stone-village')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「アキレスはカメに追いつけるか」（517語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-zeno-achilles-tortoise')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「地球でいちばん平らな場所」（509語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-salar-de-uyuni-flatness')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「なぜ明日も今日と同じだと思うのか」（657語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-hume-problem-of-induction')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「命じられたから善いのか」（666語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-euthyphro-dilemma-goodness')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「祖父母には孫に会う法的な権利があるべきか」（679語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-grandparents-contact-rights')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「競馬でむちを禁止するべきか」（659語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-racing-whip-ban')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「耳栓について」（689語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-earplugs')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「釣りのうきについて」（669語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-fishing-floats')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「日光で回る小さな風車」（670語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-crookes-radiometer')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「二つのあみ目のあいだにあらわれる模様」（656語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-moire-patterns')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「回るカードの上の二つの絵」（573語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-thaumatrope')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「空気をおしちぢめて火をおこす」（575語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-fire-piston')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「帝国の果てからの手紙」（455語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-vindolanda-writing-tablets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「ブラックヒルズの4つの顔」（459語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-mount-rushmore-carving')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「ツァボのライオン」（495語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-tsavo-lions-railway')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「方位磁針をもつ細菌」（507語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-magnetotactic-bacteria')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「多数派が堂々めぐりするとき」（653語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-condorcet-voting-paradox')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「世界は大きいほどよいのか」（659語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-parfit-repugnant-conclusion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「店は流している音楽を小さくするべきか」（661語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-shop-background-music')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「電子書籍を買った人はそれを転売できるべきか」（682語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-ebook-resale')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「鳥のえさ台について」（671語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-bird-feeders')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「蚊帳について」（655語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-mosquito-nets')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「一方向にだけ回りたがる石」（677語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-rattleback')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「空そのもののかすかな光」（651語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-airglow')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「にぎるとしたがう潜水人形」（569語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-cartesian-diver')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「灯台に名前をあたえた塔」（453語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-pharos-lighthouse-alexandria')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('高3 の長文「真夜中まであと何分」（458語）：高3に出る', async () => {
  const p = passagesFor('高3').find((x) => x.id === 'adv-doomsday-clock-symbol')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「上に立てるほどじょうぶな葉」（502語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-giant-water-lily-paxton')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学 の長文「一瞬おくれて見る」（494語）：私学に出る', async () => {
  const p = passagesFor('私学').find((x) => x.id === 'adv-flash-lag-illusion')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「もう一つの地球の水」（668語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-putnam-twin-earth')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('私学難関 の長文「確実なことの値段」（651語）：私学難関に出る', async () => {
  const p = passagesFor('私学難関').find((x) => x.id === 'adv-allais-paradox-certainty')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「会社は紙の請求書にお金を取るべきか」（680語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-paper-bill-charges')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('東大 の長文「空港は免税店をのこすべきか」（666語）：東大に出る', async () => {
  const p = passagesFor('東大').find((x) => x.id === 'todai-duty-free-shops')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「回転式の入り口について」（659語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-turnstiles')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('京大 の長文「電車のつり革について」（671語）：京大に出る', async () => {
  const p = passagesFor('京大').find((x) => x.id === 'kyodai-on-train-straps')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「まばたきより速くのみこむわな」（656語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-bladderwort-trap')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('旧帝大 の長文「木から木へすべるように飛ぶヘビ」（657語）：旧帝大に出る', async () => {
  const p = passagesFor('旧帝大').find((x) => x.id === 'adv-flying-snake')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「二つの世界を同時に見る甲虫」（560語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-whirligig-beetle')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})

it('国公立 の長文「ふくろのようにたれ下がる雲」（565語）：国公立に出る', async () => {
  const p = passagesFor('国公立').find((x) => x.id === 'adv-mammatus-clouds')!
  expect(p).toBeTruthy()
  expect(p.blanks[0].choices[p.blanks[0].answer]).not.toBe('Although')
})
