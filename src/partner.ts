// 相棒がいっしょに戦う：キャラクターごとの特技（タマゴのうちは応援だけ）
export type SkillId = 'fire' | 'guard' | 'foxfire' | 'cheer' | 'claw' | 'revive'
export type Skill = { id: SkillId; name: string; desc: string }

export const PARTNER_SKILLS: Record<string, Skill> = {
  dragon: { id: 'fire', name: '火の息', desc: '正解するたびに +3 ダメージ' },
  penguin: { id: 'guard', name: 'ペンギンガード', desc: '1回だけ、まちがえてもハートを守る' },
  fox: { id: 'foxfire', name: 'きつね火', desc: '3問正解ごとに +5 ダメージ' },
  rabbit: { id: 'cheer', name: 'ぴょんぴょん応援', desc: '2問正解ごとに必殺技ゲージ +1' },
  cat: { id: 'claw', name: 'ねこの目', desc: '会心の一撃が5秒以内まで出る' },
  mochi: { id: 'revive', name: 'もちもち根性', desc: '1回だけ、ハートが0になってもハート1でふんばる' },
  owl: { id: 'cheer', name: 'ものしりの知恵', desc: '2問正解ごとに必殺技ゲージ +1' },
  turtle: { id: 'guard', name: 'こうらシールド', desc: '1回だけ、まちがえてもハートを守る' },
  hamster: { id: 'cheer', name: 'ほっぺため', desc: '2問正解ごとに必殺技ゲージ +1' },
  sheep: { id: 'guard', name: 'もこもこクッション', desc: '1回だけ、まちがえてもハートを守る' },
  squirrel: { id: 'foxfire', name: 'どんぐりストック', desc: '3問正解ごとに +5 ダメージ' },
  panda: { id: 'revive', name: 'のんびり根性', desc: '1回だけ、ハートが0になってもハート1でふんばる' },
  lion: { id: 'fire', name: 'ライオンハート', desc: '正解するたびに +3 ダメージ' },
  elephant: { id: 'guard', name: 'ぶあつい耳ガード', desc: '1回だけ、まちがえてもハートを守る' },
  koala: { id: 'cheer', name: 'ねむねむパワー', desc: '2問正解ごとに必殺技ゲージ +1' },
  hedgehog: { id: 'claw', name: 'トゲトゲガード', desc: '2問正解ごとに必殺技ゲージ +1' },
  pelican: { id: 'cheer', name: 'くちばしキャッチ', desc: '2問正解ごとに必殺技ゲージ +1' },
  seal: { id: 'cheer', name: 'ヒレぱちぱち', desc: '2問正解ごとに必殺技ゲージ +1' },
  flamingo: { id: 'cheer', name: 'かた足バランス', desc: '2問正解ごとに必殺技ゲージ +1' },
  otter: { id: 'cheer', name: 'こいしコロコロ', desc: '2問正解ごとに必殺技ゲージ +1' },
  bear: { id: 'claw', name: 'くまのつめ', desc: '2問正解ごとに必殺技ゲージ +1' },
  giraffe: { id: 'cheer', name: 'のびのびネック', desc: '2問正解ごとに必殺技ゲージ +1' },
  frog: { id: 'cheer', name: 'ケロケロジャンプ', desc: '2問正解ごとに必殺技ゲージ +1' },
  raccoon: { id: 'claw', name: 'ごしごしウォッシュ', desc: '2問正解ごとに必殺技ゲージ +1' },
  sloth: { id: 'cheer', name: 'のんびりパワー', desc: '2問正解ごとに必殺技ゲージ +1' },
  alpaca: { id: 'cheer', name: 'もこもこガード', desc: '2問正解ごとに必殺技ゲージ +1' },
  mole: { id: 'claw', name: 'ほりほりクロー', desc: '2問正解ごとに必殺技ゲージ +1' },
  dolphin: { id: 'cheer', name: 'ソナーキャッチ', desc: '2問正解ごとに必殺技ゲージ +1' },
  hippo: { id: 'claw', name: 'おおぐちバイト', desc: '2問正解ごとに必殺技ゲージ +1' },
  crab: { id: 'claw', name: 'チョキチョキハサミ', desc: '2問正解ごとに必殺技ゲージ +1' },
  tiger: { id: 'claw', name: 'タイガークロー', desc: '2問正解ごとに必殺技ゲージ +1' },
  chameleon: { id: 'cheer', name: 'いろがわりチェンジ', desc: '2問正解ごとに必殺技ゲージ +1' },
  swan: { id: 'cheer', name: 'しずかなどりょく', desc: '2問正解ごとに必殺技ゲージ +1' },
  peacock: { id: 'cheer', name: 'はねひろげ', desc: '2問正解ごとに必殺技ゲージ +1' },
  wolf: { id: 'claw', name: 'ムーンファング', desc: '2問正解ごとに必殺技ゲージ +1' },
  parrot: { id: 'cheer', name: 'まねっこリピート', desc: '2問正解ごとに必殺技ゲージ +1' },
  bat: { id: 'cheer', name: 'エコーキャッチ', desc: '2問正解ごとに必殺技ゲージ +1' },
  seahorse: { id: 'cheer', name: 'しっぽキャッチ', desc: '2問正解ごとに必殺技ゲージ +1' },
  camel: { id: 'cheer', name: 'こぶたくわえ', desc: '2問正解ごとに必殺技ゲージ +1' },
  polarbear: { id: 'claw', name: 'こおりのつめ', desc: '2問正解ごとに必殺技ゲージ +1' },
  octopus: { id: 'claw', name: '8本足ラッシュ', desc: '会心の一撃が5秒以内まで出る' },
}

export const skillOf = (species: string | undefined): Skill => PARTNER_SKILLS[species ?? 'mochi'] ?? PARTNER_SKILLS.mochi

// 特技レベル：ボス戦で特技が出た回数で上がる（Lv1→Lv2：10回、Lv3：30回）。Lv3で効果アップ
export const SKILL_LV_USES = [0, 10, 30]
export const skillLevel = (uses: number) => SKILL_LV_USES.filter((u) => uses >= u).length

// 正解したときの追加ダメージ（n は何問目の正解か）
export function skillDamage(skill: SkillId, n: number, lv = 1): number {
  if (skill === 'fire') return lv >= 3 ? 5 : 3
  if (skill === 'foxfire' && n % 3 === 0) return lv >= 3 ? 8 : 5
  return 0
}

// 正解したときの追加ゲージ（Lv3の応援は毎回）
export const skillGauge = (skill: SkillId, n: number, lv = 1) => (skill === 'cheer' && (lv >= 3 || n % 2 === 0) ? 1 : 0)

// 会心の一撃が出る時間（ミリ秒）
export const skillCritMs = (skill: SkillId, base: number, lv = 1) => (skill === 'claw' ? (lv >= 3 ? 6000 : 5000) : base)

// ガード・根性が1戦で使える回数
export const skillSaves = (skill: SkillId, lv = 1) => (skill === 'guard' && lv >= 3 ? 2 : 1)

// 相棒ごとの必殺技名と演出の色（必殺技ゲージが満タンのとき）
export const SPECIAL_MOVES: Record<string, { name: string; color: string }> = {
  mochi: { name: 'もちもちメテオプレス', color: '#22c55e' },
  fox: { name: 'きつね火ランページ', color: '#f97316' },
  penguin: { name: 'こおりのスライディング', color: '#0ea5e9' },
  rabbit: { name: 'ムーンジャンプキック', color: '#ec4899' },
  cat: { name: 'ねこパンチ百連発', color: '#a855f7' },
  dragon: { name: 'ドラゴンブレス・ゼロ', color: '#ef4444' },
  owl: { name: 'ミッドナイト・フクロウアイ', color: '#a16207' },
  turtle: { name: 'こうらローリングアタック', color: '#16a34a' },
  hamster: { name: 'ひまわりのたね乱れうち', color: '#f59e0b' },
  sheep: { name: 'もこもこウールストーム', color: '#94a3b8' },
  squirrel: { name: 'どんぐりマシンガン', color: '#b45309' },
  panda: { name: 'ササの葉トルネード', color: '#15803d' },
  lion: { name: 'キング・オブ・ロアー', color: '#d97706' },
  elephant: { name: 'パオーン・ウォーターキャノン', color: '#0ea5e9' },
  koala: { name: 'ユーカリ・ドリームアタック', color: '#64748b' },
  hedgehog: { name: 'ハリネズミ・ローリングニードル', color: '#b45309' },
  pelican: { name: 'ペリカン・ビッグスプラッシュ', color: '#38bdf8' },
  seal: { name: 'アザラシ・アイススライド', color: '#7dd3fc' },
  flamingo: { name: 'フラミンゴ・ピンクダンス', color: '#ec4899' },
  otter: { name: 'カワウソ・リバーウェーブ', color: '#0ea5e9' },
  bear: { name: 'クマ・ハニーハグ', color: '#d97706' },
  giraffe: { name: 'キリン・スカイネック', color: '#eab308' },
  frog: { name: 'カエル・レインストーム', color: '#22c55e' },
  raccoon: { name: 'アライグマ・バブルウォッシュ', color: '#78716c' },
  sloth: { name: 'ナマケモノ・スローモーション', color: '#a8a29e' },
  alpaca: { name: 'アルパカ・フワフワクラウド', color: '#fbbf24' },
  mole: { name: 'モグラ・アンダーグラウンド', color: '#a16207' },
  dolphin: { name: 'イルカ・オーシャンジャンプ', color: '#3b82f6' },
  hippo: { name: 'カバ・ビッグマウスウェーブ', color: '#8b5cf6' },
  crab: { name: 'カニ・クロススラッシュ', color: '#ef4444' },
  tiger: { name: 'トラ・ストライプストライク', color: '#f97316' },
  chameleon: { name: 'カメレオン・レインボーカラー', color: '#22c55e' },
  swan: { name: 'ハクチョウ・ホワイトウィング', color: '#94a3b8' },
  peacock: { name: 'クジャク・フェザーショー', color: '#14b8a6' },
  wolf: { name: 'オオカミ・ムーンハウル', color: '#64748b' },
  parrot: { name: 'オウム・エコーボイス', color: '#16a34a' },
  bat: { name: 'コウモリ・ナイトウェーブ', color: '#7c3aed' },
  seahorse: { name: 'タツノオトシゴ・ゆらゆらウェーブ', color: '#f59e0b' },
  camel: { name: 'ラクダ・デザートストーム', color: '#b45309' },
  polarbear: { name: 'シロクマ・ブリザードハグ', color: '#7dd3fc' },
  octopus: { name: 'タコすみスプラッシュ', color: '#e11d48' },
}
export const specialOf = (species: string | undefined) => SPECIAL_MOVES[species ?? 'mochi'] ?? SPECIAL_MOVES.mochi

// ボスの弱点：ボスごとに弱点のキャラクターが決まっていて、その相棒だと正解ごとに追加ダメージ
export const WEAK_BONUS = 4
const WEAK_ORDER = ['mochi', 'fox', 'penguin', 'rabbit', 'cat', 'dragon']
export function weakOf(bossName: string): string {
  const n = [...bossName].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 9973, 3)
  return WEAK_ORDER[n % WEAK_ORDER.length]
}

// ボスのセリフへの相棒の返しセリフ（キャラクターごと）
export const PARTNER_REPLIES: Record<string, { en: string; ja: string }> = {
  mochi: { en: "We won't lose!", ja: 'ぼくたちは負けないよ！' },
  fox: { en: 'Too easy for us!', ja: 'そんなの、かんたんだよ！' },
  penguin: { en: 'Stay cool and do our best!', ja: 'おちついて、がんばろう！' },
  rabbit: { en: "Let's jump right in!", ja: 'さあ、とびこもう！' },
  cat: { en: 'I am not afraid of you.', ja: 'きみなんか、こわくないにゃ。' },
  dragon: { en: 'Feel the power of words!', ja: 'ことばの力を見せてやる！' },
  owl: { en: 'I know the answer already.', ja: '答えはもうわかっているよ。' },
  turtle: { en: 'Slow and steady wins!', ja: 'ゆっくり、でも確実に勝つよ！' },
  hamster: { en: 'Small but full of energy!', ja: '小さくても元気いっぱい！' },
  sheep: { en: 'Soft wool, strong heart!', ja: 'やわらかい毛でも、心は強いよ！' },
  squirrel: { en: 'I saved my best moves for you!', ja: 'とっておきのわざを見せてあげる！' },
  panda: { en: 'Take it easy, I am strong!', ja: 'のんびりでも、ぼくは強いよ！' },
  lion: { en: 'Hear me roar!', ja: 'ぼくのほえ声を聞け！' },
  elephant: { en: 'I never forget a word!', ja: 'ぼくは一度覚えたことばをわすれないよ！' },
  koala: { en: 'I am awake now!', ja: 'いま目がさめたよ！' },
  hedgehog: { en: 'Small, but sharp!', ja: '小さいけど、するどいよ！' },
  pelican: { en: 'My bill can hold a lot of words!', ja: 'ぼくのくちばしには、単語がたくさん入るよ！' },
  seal: { en: 'Clap, clap! Nice job!', ja: 'ぱちぱち！ よくできたね！' },
  flamingo: { en: 'I can stand on one leg all day!', ja: 'かた足で一日じゅう立っていられるよ！' },
  otter: { en: 'Let’s float and learn together!', ja: 'ぷかぷかうかんで、いっしょに覚えよう！' },
  bear: { en: 'Honey tastes better after studying!', ja: '勉強のあとのはちみつは最高！' },
  giraffe: { en: 'I can see the answer from up here!', ja: 'ここから答えが見えるよ！' },
  frog: { en: 'Hop, hop! One more jump!', ja: 'ぴょんぴょん！ もうひとジャンプ！' },
  raccoon: { en: 'Let’s wash away the mistakes!', ja: 'まちがいは洗い流しちゃおう！' },
  sloth: { en: 'Slowly, but I never forget!', ja: 'ゆっくりだけど、ぜったいわすれないよ！' },
  alpaca: { en: 'So fluffy, so smart!', ja: 'ふわふわで、かしこいよ！' },
  mole: { en: 'I dug up the answer!', ja: '答えをほりあてたよ！' },
  dolphin: { en: 'I can hear every sound!', ja: 'どんな音も聞き分けられるよ！' },
  hippo: { en: 'My big mouth can hold long sentences!', ja: '大きな口なら、長い文もまるごと入るよ！' },
  crab: { en: 'Snip, snip! Mistakes are gone!', ja: 'チョキチョキ！ まちがいは切っちゃった！' },
  tiger: { en: 'I caught that word in one jump!', ja: 'ひとっとびで単語をつかまえた！' },
  chameleon: { en: 'Watch me change colors!', ja: '色がかわるところを見ててね！' },
  swan: { en: 'Calm on top, working hard below!', ja: '上はしずかに、下ではがんばってるよ！' },
  peacock: { en: 'Look at my beautiful feathers!', ja: 'ぼくのきれいな羽を見て！' },
  wolf: { en: 'Let’s read it out loud together!', ja: 'いっしょに声に出して読もう！' },
  parrot: { en: 'Repeat after me! Repeat after me!', ja: 'まねしてね！ まねしてね！' },
  bat: { en: 'I can hear sounds you cannot!', ja: 'きみに聞こえない音も聞こえるよ！' },
  seahorse: { en: 'Hold on tight to new words!', ja: '新しい単語はしっかりつかもう！' },
  camel: { en: 'Step by step, we can go far!', ja: '一歩ずつなら、遠くまで行けるよ！' },
  polarbear: { en: 'Cold days can’t stop me!', ja: '寒い日でも、ぼくは止まらないよ！' },
  octopus: { en: 'Eight arms are better than two!', ja: '8本の足は2本より強いよ！' },
}
export const replyOf = (species: string | undefined) => PARTNER_REPLIES[species ?? 'mochi'] ?? PARTNER_REPLIES.mochi
