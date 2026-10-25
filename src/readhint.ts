// 読解のヒント：答えは見せずに、答えの根拠（どこを読めばよいか・考え方）を出す
import type { Passage } from './reading'

// 解説の中の正解の語を「＿＿」にかくす（考え方だけ見せる）
export function maskAnswer(why: string, answer: string): string {
  const esc = answer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return why.replace(new RegExp(/^[A-Za-z]/.test(answer) ? `\\b${esc}\\b` : esc, 'gi'), '＿＿')
}

// かんたん読解：答えの根拠になる英文（和訳で正解の語が出てくる文と同じ位置の英文）
export function evidenceOf(p: Passage, qi: number): string | null {
  const en = p.text.split(/(?<=[.!?])\s+/).filter(Boolean)
  const ja = p.ja.split(/(?<=[。！？])/).filter(Boolean)
  const q = p.questions[qi]
  const right = q.choices[q.answer]
  const core = right.replace(/(です|でした|だった|した|する)$/, '')
  if (en.length === ja.length) {
    const i = ja.findIndex((s) => s.includes(core) || s.includes(right))
    if (i >= 0) return en[i]
  }
  return null
}
