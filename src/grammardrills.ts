// 文法ドリル：単語ゲームのミニゲームから文法チャレンジへ移した、ことばの形・文法の練習
// （遊ぶときは QuizView の同じ id のゲームを使う）
export const GRAMMAR_DRILLS = [
  { id: 'be', label: '🟰 be動詞' },
  { id: 'third', label: '🧍 3単現の s' },
  { id: 'plural', label: '👥 複数形' },
  { id: 'article', label: '🅰️ a と an' },
  { id: 'pronoun', label: '👤 代名詞' },
  { id: 'neg', label: '🚫 否定文' },
  { id: 'wh', label: '❔ 疑問詞' },
  { id: 'ing', label: '🏃 ing形のつづり' },
  { id: 'past-ed', label: '⏪ 過去形のつづり' },
  { id: 'irregular', label: '🔁 不規則動詞' },
  { id: 'waswere', label: '⏪ was と were' },
  { id: 'placeprep', label: '📦 場所の前置詞' },
  { id: 'timeprep', label: '🗓 in・on・at（時）' },
  { id: 'muchmany', label: '🔢 much と many' },
  { id: 'modal', label: '💪 助動詞' },
  { id: 'compare', label: '📏 比較級・最上級' },
  { id: 'gmix', label: '🎲 文法ミックス' },
] as const

export type GrammarDrill = (typeof GRAMMAR_DRILLS)[number]['id']
export const isGrammarDrill = (id: string): id is GrammarDrill => GRAMMAR_DRILLS.some((d) => d.id === id)
