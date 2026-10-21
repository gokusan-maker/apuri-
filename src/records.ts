// 記録の部屋：いろいろな自己ベストを1か所に集める（どれも端末の保存データから読むだけ）
import { loadBook, totalWins } from './bossbook'
import { loadEndlessBest } from './endless'
import { grammarStamps, loadGrammar } from './grammar'
import { loadLongRecord, LONG_PASSAGES, totalOf } from './longreading'
import { loadParty } from './party'

export type RecordRow = { icon: string; label: string; value: string }

export function collectRecords(): RecordRow[] {
  const book = loadBook()
  const long = loadLongRecord()
  const party = loadParty()
  const perfectLong = LONG_PASSAGES.filter((p) => long[p.id] === totalOf(p)).length
  return [
    { icon: '🗼', label: 'エンドレスの塔 最高到達', value: `${loadEndlessBest()}階` },
    { icon: '⚔️', label: 'ボスをたおした回数', value: `${totalWins(book)}回` },
    { icon: '🏅', label: 'Sランクを取ったボス', value: `${Object.values(book).filter((e) => e.best === 'S').length}体` },
    { icon: '📕', label: 'ボス図鑑にのったボス', value: `${Object.keys(book).length}体` },
    { icon: '🎰', label: 'ガチャで引いたタマゴ', value: `${party.gacha ?? 0}こ（今の仲間 ${party.members.length}匹）` },
    { icon: '📮', label: '文法スタンプ', value: `${grammarStamps(loadGrammar())}個` },
    { icon: '📖', label: '長文読解 満点', value: `${perfectLong} / ${LONG_PASSAGES.length}本` },
  ]
}
