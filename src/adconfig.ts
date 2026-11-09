// 広告（Google AdSense）の設定。ここに ID を入れると広告が出る（空のあいだは広告なし）。
// サイト運営者 ID は AdSense の「アカウント → アカウント情報」にある ca-pub- から始まる番号。
// 広告ユニット ID は「広告 → 広告ユニットごと → ディスプレイ広告」で作った data-ad-slot の数字。
export const AD_CONFIG = {
  client: '', // 例：'ca-pub-1234567890123456'
  slotHome: '', // ホームの下の広告ユニット
  slotResult: '', // 結果画面の広告ユニット（空ならホームと同じユニット）
}

/** ca-pub- と数字の形になっているか */
export function validClient(id: string): boolean {
  return /^ca-pub-\d{10,20}$/.test(id.trim())
}

/** ads.txt の中身（AdSense の審査に必要）。ID がなければ空 */
export function adsTxt(client: string = AD_CONFIG.client): string {
  return validClient(client) ? `google.com, ${client.trim().replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n` : ''
}
