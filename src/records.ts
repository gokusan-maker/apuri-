// 記録の部屋：いろいろな自己ベストを1か所に集める（どれも端末の保存データから読むだけ）
import { loadBook, totalWins } from './bossbook'
import { loadEndlessBest } from './endless'
import { loadGachaStats } from './gacha'
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
    { icon: '🗼', label: 'エンドレスの塔', value: `${loadEndlessBest()}階` },
    { icon: '⚔️', label: 'ボス撃破', value: `${totalWins(book)}回` },
    { icon: '🏅', label: 'Sランクのボス', value: `${Object.values(book).filter((e) => e.best === 'S').length}体` },
    { icon: '📕', label: 'ボス図鑑', value: `${Object.keys(book).length}体` },
    { icon: '🎰', label: 'ガチャ', value: `${loadGachaStats().total}回` },
    { icon: '🌈', label: 'ウルトラレア', value: `${loadGachaStats().UR}回` },
    { icon: '🐾', label: 'いまの仲間', value: `${party.members.length}匹` },
    { icon: '📮', label: '文法スタンプ', value: `${grammarStamps(loadGrammar())}個` },
    { icon: '📖', label: '読解の満点', value: `${perfectLong} / ${LONG_PASSAGES.length}本` },
  ]
}
