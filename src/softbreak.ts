// カタカナの合成語（コレクションマスター など）を、語の切れ目でだけ改行できるように分ける。
// 画面では分けた部分のあいだに <wbr> を入れ、CSS の word-break: keep-all と組み合わせて使う。
// 長い語尾から順にためし、1回だけ分ける（ボス図鑑マスター → ボス図鑑｜マスター。マスター だけなら分けない）
const SUFFIXES = ['コンプリート', 'プリンセス', 'ケーキング', 'おまもりん', 'チャレンジ', 'マスター', 'ボンバー', 'クッキン', 'ゲートン', 'スター', 'コイン']

export function splitSoft(text: string): string[] {
  for (const suf of SUFFIXES) {
    if (text.endsWith(suf)) return text.length > suf.length ? [text.slice(0, -suf.length), suf] : [text]
  }
  return [text]
}
