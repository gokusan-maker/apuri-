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
