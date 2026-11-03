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
