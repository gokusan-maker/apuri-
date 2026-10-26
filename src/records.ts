// 記録の部屋：いろいろな自己ベストを1か所に集める（どれも端末の保存データから読むだけ）
import { loadBook, totalWins } from './bossbook'
import { chestsOpened, loadChests } from './castle'
import { loadEndlessBest } from './endless'
import { loadGachaStats } from './gacha'
import { grammarStamps, loadDictBest, loadGrammar } from './grammar'
import { LONG_PASSAGES, perfectLongCount } from './longreading'
import { loadNumbersBest } from './numbers'
import { loadParty } from './party'
import { loadSpellBest } from './spell'

export type RecordRow = { icon: string; label: string; value: string }

export function collectRecords(): RecordRow[] {
  const book = loadBook()
  const party = loadParty()
  const perfectLong = perfectLongCount()
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
    { icon: '🔤', label: 'スペル連続正解', value: `${loadSpellBest()}問` },
    { icon: '👂', label: '数の聞き取り', value: `${loadNumbersBest()} / 10問` },
    { icon: '✍️', label: '書き取り連続', value: `${loadDictBest()}文` },
    { icon: '🎁', label: 'あけた宝箱', value: `${chestsOpened(loadChests())}個` },
  ]
}
