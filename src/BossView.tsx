import { maskAnswer, wordHint } from './readhint'
import { CHAR_TYPES, supportEffects } from './chartype'
import type { LongPassage } from './longreading'
import type { GrammarUnit } from './grammar'
import { learnProverb, PROVERBS } from './proverbs'
import { loadSettings } from './settings'
import { MissedList } from './MissedListView'
import { CountUp } from './CountUpView'
import { filledParts, readingBossQs, WIN_LINES, type ReadingQ } from './readingboss'
import { speak } from './speech'
import { makeLookup } from './glossary'
import { useContext, useEffect, useId, useRef, useState } from 'react'
import { BossArena } from './BossArenaView'
import { isNight } from './daytime'
import { ChestTicketContext } from './castle'
import { BossSupportContext, BossTeamContext, TEAM_ICON, TEAM_LABEL, TEAM_LOSE_LINES, TEAM_WIN_LINES, teamMvp } from './bossteam'
import { MonsterFigure } from './MonsterView'
import { BATTLE_ITEMS, BOMB_DAMAGE, dropOf, type BattleBag, type BattleItemId } from './battleitems'
import { loadBook, markLost, recordWin, REVENGE_COINS, saveBook, takeRevenge } from './bossbook'
import { dayKey } from './srs'
import { skillCritMs, skillDamage, skillGauge, skillLevel, skillOf, skillSaves, replyOf, specialOf, WEAK_BONUS, weakOf } from './partner'
import { cheerOnLose, isComeback, BIG_COMBO, BOSS_HP, bossQuestions, BOSS_QUESTIONS, teamBossQuestions, TEAM_ORDER, TEAM_COMBO_DAMAGE, isTeamCombo, levelAttack, type TeamRole, BOSSES, CRIT_MS, critDamage, damage, GAUGE_MAX, gaugeAfter, HEAL_COST, HEARTS, CONTINUE_COST, defeatLineOf, introLineOf, bossBgOf, GOLDEN_COINS, goldenLook, isChance, isCharge, isAsleep, CHARGE_STUN, MINION_COINS, sRouletteOf, countBattle, shinyLook, hurtLineOf, cheerStampOf, isCritical, isEnraged, RANK_S_COINS, SPECIAL_DAMAGE, battleRank, loadMaxHit, recordHit, formatSec, loadBossTimes, recordBossTime, type BossLook, type BossRecord, attackElemOf, CHARGE_HIT, COUNTER_DMG, counterTarget, fullTeamHp, hitMember, hitTarget, isCounterTurn, MEMBER_HIT, MEMBER_HP, reviveOne, type TeamHp, BOSS_TRAITS, DRAIN_HEAL, QUICK_RATE, SEAL_COINS, SEAL_TICKET_EVERY, addSealWin, addSealTraits, traitAfterHit, bossTraits, type BossTrait, arenaSeasonOf } from './boss'
import { quizXp, speciesOf, type Form, type Source } from './monster'
import { easyIf } from './quiz'
import { playBossSound, playComboCorrect, playCorrect, playWrong } from './sound'
import { LEVELS, levelOf, WORDS, type Level, type Word } from './words'

type Props = {
  level: Level
  words: Word[]
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onWin: () => void
  onExit: () => void
  bonus?: number
  onSpend?: (coins: number) => boolean
  look?: BossLook // 指定がなければ単語帳のボス
  title?: string // 上に出す見出し
  note?: string // 戦いの前に出すくわしい説明（ボス部屋のボタンは題名だけにして、説明はここで）
  hp?: number // ボスのHP（大学入試の塔は強い）
  grammar?: boolean // 4問に1問を文法問題にする（大学入試の塔）
  reading?: boolean // 読解ボス：その学年の長文から問題を出す（ステージのボス）
  traits?: BossTrait[] // ボスのとくぎ（ないときは名前で1つ）。城の最上階は2つ
  exam?: { passages: LongPassage[]; units: GrammarUnit[] } // 入試レベル：この長文と文法の単元から出す（大学入試の塔）
  winBuddy?: { icon: string; name: string } // 勝ったときによろこぶ読解のなかま（竜）
  startHearts?: number // ボスラッシュではハートを引き継ぐ
  winLabel?: string // 勝ったあとのボタンの文字
  nextBoss?: { label: string; onClick: () => void } // 勝ったあと、次のボスにすぐ挑む
  noBook?: boolean // ボス図鑑に記録しない（エンドレスの塔）
  bag?: BattleBag // 持っているバトルアイテム
  onDefeat?: () => void // どのボスでも、たおしたとき（ミッション用）
  onSkill?: () => void // 相棒の特技が出た（特技レベル用）
  onDrop?: (id: BattleItemId) => void // ボスがアイテムをおとした
  onLose?: () => void // ハートがなくなって負けた（連勝が切れる）
  power?: number // 相棒のちから：正解ダメージ+
  golden?: boolean // 今日の金色ボス
  onUseItem?: (id: BattleItemId) => void
  onWinHearts?: (hearts: number) => void // 勝ったときののこりハート
  onRankBonus?: (coins: number) => void // Sランクのおまけコイン
  partner?: { form: Form; kind?: string; wear?: string; species?: string; name: string; skillUses?: number } // いっしょに戦う相棒（タマゴは応援だけ）
}


// 大学入試の塔のボスの飾り（体のうしろ）
function BossDecoBack({ deco, look }: { deco: string; look: BossLook }) {
  switch (deco) {
    case 'scholar':
      return (
        <g stroke="#1e1b4b" strokeWidth="1.5">
          <rect x="4" y="52" width="16" height="22" rx="2" fill="#b45309" transform="rotate(-12 12 63)" />
          <rect x="80" y="50" width="16" height="22" rx="2" fill="#0369a1" transform="rotate(10 88 61)" />
          <path d="M8 56 h10 M83 54 h10" stroke="#fef3c7" />
        </g>
      )
    case 'lastboss':
      return (
        <g fill="#1c0505" stroke="#7f1d1d" strokeWidth="2" strokeLinejoin="round">
          <path d="M16 50 Q-6 30 2 10 Q10 26 18 22 Q12 38 24 44 Z" />
          <path d="M84 50 Q106 30 98 10 Q90 26 82 22 Q88 38 76 44 Z" />
          <path d="M30 28 Q18 10 26 0 Q30 16 40 22 Z M70 28 Q82 10 74 0 Q70 16 60 22 Z" fill="#e5e7eb" stroke="#57534e" />
        </g>
      )
    case 'speaker':
      return (
        <g stroke="#0f766e" strokeWidth="1.5">
          <path d="M2 30 h22 a4 4 0 0 1 4 4 v10 a4 4 0 0 1 -4 4 h-12 l-6 6 v-6 h-4 a4 4 0 0 1 -4 -4 v-10 a4 4 0 0 1 4 -4 Z" fill="#fff" />
          <text x="13" y="43" fontSize="9" textAnchor="middle" fill="#0f766e" stroke="none" fontWeight="900">Hi!</text>
          <path d="M76 24 h22 a4 4 0 0 1 4 4 v10 a4 4 0 0 1 -4 4 h-4 v6 l-6 -6 h-12 a4 4 0 0 1 -4 -4 v-10 a4 4 0 0 1 4 -4 Z" fill="#fde047" />
          <text x="87" y="37" fontSize="8" textAnchor="middle" fill="#713f12" stroke="none" fontWeight="900">Yo!</text>
        </g>
      )
    case 'akamon':
      return <path d="M14 56 L0 30 L8 34 L4 20 L16 30 L18 22 L24 40 Z M86 56 L100 30 L92 34 L96 20 L84 30 L82 22 L76 40 Z" fill="#fca5a5" stroke={look.line} strokeWidth="2" strokeLinejoin="round" />
    case 'okuma':
      return <path d="M28 30 a9 9 0 1 1 6 -6 Z M72 30 a9 9 0 1 0 -6 -6 Z" fill={look.color} stroke={look.line} strokeWidth="3" />
    case 'aoba':
      return <path d="M28 30 L22 10 L40 24 Z M72 30 L78 10 L60 24 Z" fill="#4ade80" stroke={look.line} strokeWidth="2.5" strokeLinejoin="round" />
    case 'machikane':
      return <path d="M76 70 Q100 72 98 84 Q86 90 74 84 Z" fill={look.color} stroke={look.line} strokeWidth="2.5" />
    default:
      return null
  }
}

// 大学入試の塔のボスの飾り（体の上）
function BossDecoFront({ deco, look }: { deco: string; look: BossLook }) {
  switch (deco) {
    case 'mortarboard':
      return (
        <g>
          <path d="M22 18 L50 8 L78 18 L50 28 Z" fill="#111827" stroke="#000" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M34 22 V30 Q50 36 66 30 V22" fill="#1f2937" stroke="#000" strokeWidth="1.5" />
          <path d="M50 18 L74 22 L76 36" fill="none" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="76" cy="38" r="3" fill="#fbbf24" />
          <rect x="68" y="78" width="26" height="8" rx="4" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" transform="rotate(-20 81 82)" />
          <path d="M80 77 v10" stroke="#dc2626" strokeWidth="2" transform="rotate(-20 81 82)" />
        </g>
      )
    case 'scholar':
      return (
        <g>
          <path d="M28 26 L50 -2 L72 26 Z" fill="#4338ca" stroke="#1e1b4b" strokeWidth="2" strokeLinejoin="round" />
          <path d="M22 26 h56" stroke="#1e1b4b" strokeWidth="4" strokeLinecap="round" />
          <path d="M44 8 l2 4 l4 1 l-4 1 l-2 4 l-2 -4 l-4 -1 l4 -1 Z M58 16 l1 2 l2 1 l-2 1 l-1 2 l-1 -2 l-2 -1 l2 -1 Z" fill="#fde047" />
          <g fill="none" stroke="#fde68a" strokeWidth="2.5">
            <circle cx="38" cy="58" r="8" />
            <circle cx="62" cy="58" r="8" />
            <path d="M46 58 h8" />
          </g>
        </g>
      )
    case 'lastboss':
      return (
        <g stroke="#450a0a" strokeWidth="2" strokeLinejoin="round">
          <path d="M24 30 L28 4 L38 20 L44 0 L50 18 L56 0 L62 20 L72 4 L76 30 Z" fill="#111827" />
          <path d="M26 30 h48" stroke="#fbbf24" strokeWidth="3" />
          <path d="M50 22 l4 5 l-4 5 l-4 -5 Z" fill="#dc2626" stroke="#fbbf24" strokeWidth="1.2" />
          <circle cx="34" cy="22" r="2" fill="#a855f7" stroke="none" />
          <circle cx="66" cy="22" r="2" fill="#a855f7" stroke="none" />
          <path d="M22 84 Q50 98 78 84" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.8" />
        </g>
      )
    case 'speaker':
      return (
        <g stroke="#042f2e" strokeWidth="2">
          <path d="M16 54 Q16 18 50 16 Q84 18 84 54" fill="none" stroke="#111827" strokeWidth="5" />
          <rect x="8" y="48" width="14" height="22" rx="6" fill="#f43f5e" />
          <rect x="78" y="48" width="14" height="22" rx="6" fill="#f43f5e" />
          <path d="M22 66 Q30 80 42 78" fill="none" stroke="#111827" strokeWidth="2.5" />
          <circle cx="43" cy="78" r="2.5" fill="#111827" />
        </g>
      )
    case 'gate':
      return (
        <g fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5">
          <rect x="28" y="6" width="44" height="5" rx="1" />
          <rect x="32" y="13" width="36" height="3" />
          <rect x="35" y="11" width="4" height="15" />
          <rect x="61" y="11" width="4" height="15" />
        </g>
      )
    case 'penken':
      return (
        <g stroke="#1f2937" strokeWidth="2" strokeLinejoin="round">
          <path d="M74 86 L90 24 L95 27 L79 88 Z" fill="#e5e7eb" />
          <path d="M70 84 L84 90 M77 87 L75 96" stroke="#fbbf24" strokeWidth="4" />
        </g>
      )
    case 'shachi':
      return <path d="M50 24 Q40 14 46 4 Q50 12 56 8 Q52 16 60 22 Z" fill="#fde047" stroke="#a16207" strokeWidth="2" strokeLinejoin="round" />
    case 'clark':
      return (
        <g stroke="#1f2937" strokeWidth="2">
          <path d="M26 24 L74 24 L66 18 L62 6 L38 6 L34 18 Z" fill="#78350f" />
          <path d="M36 66 Q44 62 50 66 Q56 62 64 66 Q56 70 50 68 Q44 70 36 66 Z" fill="#f8fafc" />
        </g>
      )
    case 'machikane':
      return <path d="M36 80 L40 76 L44 80 L48 76 L52 80 L56 76 L60 80 L64 76" fill="none" stroke="#f8fafc" strokeWidth="2.5" />
    case 'crown':
      // 特別クエスト：マオウモチの王冠
      return (
        <g stroke="#92400e" strokeWidth="2" strokeLinejoin="round">
          <path d="M30 26 L32 6 L41 16 L50 2 L59 16 L68 6 L70 26 Z" fill="#facc15" />
          <circle cx="50" cy="18" r="3" fill="#ef4444" />
          <circle cx="38" cy="21" r="2" fill="#3b82f6" />
          <circle cx="62" cy="21" r="2" fill="#3b82f6" />
        </g>
      )
    case 'helmet':
      // 特別クエスト：ヨロイモチのかぶと
      return (
        <g stroke="#0f172a" strokeWidth="2" strokeLinejoin="round">
          <path d="M20 36 Q50 -4 80 36 Q50 28 20 36 Z" fill="#94a3b8" />
          <path d="M47 4 L53 4 L53 32 L47 32 Z" fill="#e2e8f0" />
        </g>
      )
    case 'thunder':
      // 特別クエスト：ライジンモチのいなずま
      return (
        <g fill="#fde047" stroke="#a16207" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M8 26 L20 26 L14 42 L24 42 L6 68 L12 48 L4 48 Z" />
          <path d="M92 26 L80 26 L86 42 L76 42 L94 68 L88 48 L96 48 Z" />
        </g>
      )
    case 'tokeidai':
      return (
        <g stroke={look.line} strokeWidth="2">
          <rect x="38" y="2" width="24" height="22" fill="#fef3c7" />
          <circle cx="50" cy="13" r="7" fill="#fff" />
          <path d="M50 13 L50 8 M50 13 L54 15" stroke="#1f2937" strokeLinecap="round" />
        </g>
      )
    case 'okuma':
      return <path d="M42 12 L58 12 L58 24 L42 24 Z M46 4 L54 4 L54 12 L46 12 Z" fill="#fef3c7" stroke={look.line} strokeWidth="2" />
    default:
      return null
  }
}

// オリジナルのボス。単語帳ごとに色と名前が変わる
export function BossFigure({ hit, look }: { hit: boolean; look: BossLook }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg viewBox="0 0 100 100" className={`boss-svg${hit ? ' hit' : ''}`} aria-hidden="true">
      <defs>
        {/* 立体感：右下に落ちる陰影と左上のつや */}
        <radialGradient id={`bs${uid}`} cx="0.36" cy="0.28" r="0.95">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </radialGradient>
        <radialGradient id={`bg${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="95" rx="34" ry="4" fill="#000" opacity="0.18" />
      {(!look.deco || look.deco === 'akamon') && <path d="M30 30 L24 8 L40 24 Z M70 30 L76 8 L60 24 Z" fill={look.color} stroke={look.line} strokeWidth="3" />}
      {look.deco && <BossDecoBack deco={look.deco} look={look} />}
      <path d="M12 72 Q12 24 50 22 Q88 24 88 72 Q88 92 50 92 Q12 92 12 72 Z" fill={look.color} stroke={look.line} strokeWidth="3" />
      <path d="M13.5 72 Q13.5 25.5 50 23.5 Q86.5 25.5 86.5 72 Q86.5 90.5 50 90.5 Q13.5 90.5 13.5 72 Z" fill={`url(#bs${uid})`} pointerEvents="none" />
      <ellipse cx="32" cy="36" rx="12" ry="6" fill={`url(#bg${uid})`} transform="rotate(-25 32 36)" />
      <path d="M30 50 L44 56 M70 50 L56 56" stroke={look.eye} strokeWidth="4" strokeLinecap="round" />
      <circle cx="38" cy="58" r="4" fill={look.eye} />
      <circle cx="62" cy="58" r="4" fill={look.eye} />
      <path d="M38 74 L44 70 L50 74 L56 70 L62 74" fill="none" stroke="#f5f3ff" strokeWidth="3" />
      {look.deco && <BossDecoFront deco={look.deco} look={look} />}
    </svg>
  )
}

// 今の時刻（ミリ秒）。会心の一撃の判定に使う（ボタンを押したときだけ呼ぶ）
const nowMs = () => Date.now()
const rnd = () => Math.random()

// 読解ボスの本文で、単語帳にある語をタップすると意味が出る
const lookupWord = makeLookup(WORDS)

export function Boss({ level, words, onAnswer, onWin, onExit, bonus = 100, onSpend, look: lookProp, title, hp: maxHp = BOSS_HP, grammar = false, reading = false, winBuddy, partner, onRankBonus, startHearts = HEARTS, winLabel = 'ステージにもどる', nextBoss, onWinHearts, noBook = false, bag, onUseItem, onDefeat, onSkill, onDrop, onLose, golden = false, power = 0, note, exam, traits: traitsProp }: Props) {
  const baseLook = lookProp ?? BOSSES[level]
  const [shiny] = useState(() => countBattle() && !golden)
  const look = golden ? goldenLook(baseLook) : shiny ? shinyLook(baseLook) : baseLook
  const elem = attackElemOf(baseLook.color) // こうげきの属性（炎・氷・いなずま・どく・やみ）
  // チームバトル：App が単語・文法・読解のなかまをわたしているときは、3体が順番に攻撃する（読解ボスは、読解の番に本文の問題）
  const team = useContext(BossTeamContext)
  const supportTypes = useContext(BossSupportContext)
  const sup = supportEffects(supportTypes) // 応援なかまのタイプの効果
  const memberMax = MEMBER_HP + sup.hp
  const teamOn = !!team
  const teamWords = words.length > 0 ? words : WORDS.filter((w) => levelOf(w) === level)
  const readQs = () => readingBossQs(level, rnd, BOSS_QUESTIONS, exam?.passages)
  const makeQs = () => (teamOn ? teamBossQuestions(teamWords, rnd, BOSS_QUESTIONS, reading ? readQs() : undefined, exam?.units) : reading ? readQs() : bossQuestions(words, grammar)).map((q) => easyIf(loadSettings().easy, q))
  const [qs, setQs] = useState(makeQs)
  // チームバトルでは、答えた番のなかまに XP（App がわたしていなければこれまでどおり onAnswer）
  const answerFor = (x: (typeof qs)[number]) => (teamOn && 'team' in x ? (team![x.team as TeamRole].answer ?? onAnswer) : onAnswer)
  const [index, setIndex] = useState(0)
  const [hp, setHp] = useState(maxHp)
  const [hearts, setHearts] = useState(startHearts)
  const [combo, setCombo] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [hit, setHit] = useState(false)
  const [atk, setAtk] = useState<{ at: number; lose: number; who?: TeamRole; dmg?: number; counter?: boolean; ko?: boolean } | null>(null) // ボスのこうげき（演出用）。チームバトルでは受けたなかまとダメージ
  const [teamHp, setTeamHp] = useState<TeamHp>(() => fullTeamHp(memberMax)) // チームバトル：なかまの体力
  const [healed, setHealed] = useState(false) // 回復は1戦1回まで
  const [missed, setMissed] = useState<Word[]>([])
  const [crit, setCrit] = useState(false)
  const [gauge, setGauge] = useState(() => Math.min(GAUGE_MAX - 1, sup.gauge))
  const skill = partner && partner.form.stage > 0 ? skillOf(partner.species) : null
  const lv = skillLevel(partner?.skillUses ?? 0)
  const weak = weakOf(baseLook.name)
  const hitsWeak = !!skill && (partner?.species ?? 'mochi') === weak
  const [corrects, setCorrects] = useState(0)
  const [crits, setCrits] = useState(0)
  const [saves, setSaves] = useState(0) // ガード・根性を使った回数
  const [skillMsg, setSkillMsg] = useState('')
  const [night] = useState(() => isNight(new Date().getHours())) // 夜は舞台の空を暗く
  const [season] = useState(() => arenaSeasonOf(new Date().getMonth())) // 季節の雪・さくら
  const traits = traitsProp ?? bossTraits(baseLook.name) // ボスのとくぎ
  const [traitMsg, setTraitMsgRaw] = useState('') // とくぎが発動したとき
  const fired = useRef(false) // このバトルでとくぎが1回でも発動した（とくぎ封じの判定）
  const [sealed, setSealed] = useState(false) // とくぎ封じで勝った
  const [sealTicket, setSealTicket] = useState(false) // とくぎ封じ10回ごとのチケット
  const giveTicket = useContext(ChestTicketContext)
  const [firedShown, setFiredShown] = useState(false) // 画面の「封じ中」表示用
  const setTraitMsg = (m: string) => {
    if (m) {
      fired.current = true
      setFiredShown(true)
    }
    setTraitMsgRaw(m)
  }
  const [regenUsed, setRegenUsed] = useState(false)
  const [trioAt, setTrioAt] = useState(-1) // 合体技を出した問題の番号
  const [teamHits, setTeamHits] = useState<Record<TeamRole, number>>({ word: 0, grammar: 0, reading: 0 }) // なかまごとの正解数
  const [usedItems, setUsedItems] = useState<BattleItemId[]>([]) // 1戦1回ずつ
  const [drop, setDrop] = useState<BattleItemId | null>(null)
  const [continued, setContinued] = useState(false) // コンティニューは1戦1回
  const [lastDmg, setLastDmg] = useState(0) // 直前の正解のダメージ（数字の演出用）
  const [mvp, setMvp] = useState<{ en: string; ja: string; ms: number } | null>(null) // いちばん速く正解した単語
  const [hintAt, setHintAt] = useState<{ index: number; hide: number } | null>(null) // 相棒のヒント（1戦1回）
  const [tipAt, setTipAt] = useState<number | null>(null) // 読解のヒント（解説・根拠の文）を開いた問題の番号
  const [proverb, setProverb] = useState<number | null>(null) // たおしたときに教えてくれたことわざ
  const [revenge, setRevenge] = useState(false) // リベンジ成功
  const [shield, setShield] = useState(sup.shield) // ことばの盾（3問連続正解でたまる。シールド型の応援なかまがいると最初から）
  const [shieldUsed, setShieldUsed] = useState(-1) // 盾を使った問題の番号
  const [sPrize, setSPrize] = useState<ReturnType<typeof sRouletteOf> | null>(null)
  const [minion, setMinion] = useState<'none' | 'here' | 'beaten'>('none') // 子分
  const [minionAt, setMinionAt] = useState(-1) // 子分をたおした問題の番号
  const [newRecord, setNewRecord] = useState(0) // この戦いで更新した最大ダメージ
  const [special, setSpecial] = useState(0) // 必殺技を出した回数（演出のキー）
  const startedAt = useRef(0) // 戦いを始めた時刻（タイム記録用）
  const [time, setTime] = useState<{ sec: number; best: boolean } | null>(null)
  const shownAt = useRef(0) // 今の問題が出た時刻（会心の一撃の判定用）
  useEffect(() => {
    shownAt.current = nowMs()
  }, [index, qs])
  useEffect(() => {
    playBossSound('appear')
    startedAt.current = nowMs()
  }, [])

  const won = hp <= 0
  const lost = !won && (hearts <= 0 || index >= qs.length)
  const comeback = isComeback(hearts, startHearts) // 逆転チャンス：のこりハート1つで正解ダメージ2倍
  const q = qs[index]
  const enraged = isEnraged(hp, maxHp)
  // チャンス問題かどうかは、問題が出たときのいかり具合で決める
  const [chanceAt, setChanceAt] = useState(-1)
  if (picked === null && isChance(enraged, index) && chanceAt !== index) setChanceAt(index)
  const chance = chanceAt === index
  const [chargeAt, setChargeAt] = useState(-1)
  if (picked === null && isCharge(enraged, index) && chargeAt !== index && !chance) setChargeAt(index)
  const charge = chargeAt === index
  const [sleepAt, setSleepAt] = useState(-1)
  if (picked === null && isAsleep(enraged, index) && sleepAt !== index && !chance && !charge) setSleepAt(index)
  const asleep = sleepAt === index

  const [winLine] = useState(() => WIN_LINES[Math.floor(Math.random() * WIN_LINES.length)]) // 勝ったときの竜のひとこと
  const [gloss, setGloss] = useState<Word | null>(null) // 本文でタップした語の意味
  const [solved, setSolved] = useState<string[]>([]) // 読解ボス：答えがわかった空所（長文id:記号）

  function pick(i: number) {
    if (picked !== null || won || lost) return
    setPicked(i)
    setSkillMsg('')
    setTraitMsg('')
    if (i === q.answer) {
      const rq = q as Partial<ReadingQ>
      if (rq.blank && rq.passage) setSolved((v) => [...v, `${rq.passage!.id}:${rq.blank}`])
      const c = combo + 1
      const n = corrects + 1
      setCombo(c)
      if (c % 3 === 0) setShield(true)
      setCorrects(n)
      const ms = nowMs() - shownAt.current
      if (q.word.id && (!mvp || ms < mvp.ms)) setMvp({ en: q.word.en, ja: q.word.ja, ms })
      const slow = usedItems.includes('clock') ? 2 : 1
      const critMs = (skill ? skillCritMs(skill.id, CRIT_MS, lv) : CRIT_MS) * slow + sup.critMs
      const critical = isCritical(ms, critMs * (traits.includes('quick') ? QUICK_RATE : 1))
      if (!critical && traits.includes('quick') && isCritical(ms, critMs)) setTraitMsg(`${BOSS_TRAITS.quick.icon} ${look.name}の${BOSS_TRAITS.quick.name}！ 会心をかわされた`)
      if (critical && skill && !isCritical(ms, CRIT_MS * slow)) {
        onSkill?.()
        setSkillMsg(`${partner!.name}の${skill!.name}！ 会心の一撃`)
      }
      const extra = skill ? skillDamage(skill.id, n, lv) : 0
      if (extra > 0) {
        onSkill?.()
        setSkillMsg(`${partner!.name}の${skill!.name}！ +${extra}`)
      }
      const downTurn = teamOn && 'team' in q && teamHp[q.team as TeamRole] <= 0 // ダウン中のなかまの番はダメージ半分
      const base = Math.ceil(((critical ? critDamage(damage(c)) : damage(c)) * (chance || asleep || comeback ? 2 : 1)) / (downTurn ? 2 : 1))
      if (teamOn && 'team' in q) setTeamHits((t) => ({ ...t, [q.team as TeamRole]: t[q.team as TeamRole] + 1 }))
      const trio = teamOn && 'team' in q && isTeamCombo(q.team as TeamRole, c) ? TEAM_COMBO_DAMAGE : 0
      if (trio > 0) {
        setSkillMsg(`🤝 合体技「トリプルアタック」！ +${trio}`)
        setTrioAt(index)
      }
      const atk = teamOn && 'team' in q && !downTurn ? levelAttack(team![q.team as TeamRole].level) : 0 // なかまのレベルの攻撃力
      const rawHp = hp - base - extra - trio - atk - (hitsWeak ? WEAK_BONUS : 0) - (charge ? CHARGE_STUN : 0) - power - sup.atk
      const tr = traitAfterHit(traits, hp, rawHp, maxHp, regenUsed, critical)
      const nextHp = tr.hp
      if (tr.regenSealed) {
        setRegenUsed(true)
        setSkillMsg(`⚡ 会心の一撃で ${BOSS_TRAITS.regen.icon}${BOSS_TRAITS.regen.name} を止めた！`)
      }
      if (tr.blocked > 0) setTraitMsg(`${BOSS_TRAITS.armor.icon} ${look.name}の${BOSS_TRAITS.armor.name}！ ダメージ -${tr.blocked}`)
      if (tr.healed > 0) {
        setRegenUsed(true)
        setTraitMsg(`${BOSS_TRAITS.regen.icon} ${look.name}の${BOSS_TRAITS.regen.name}！ HP +${tr.healed}`)
      }
      setCrit(critical)
      setLastDmg(hp - nextHp)
      if (minion === 'here') {
        setMinion('beaten')
        setMinionAt(index)
        onRankBonus?.(MINION_COINS)
      } else if (minion === 'none' && nextHp > 0 && isEnraged(nextHp, maxHp)) setMinion('here')
      if (recordHit(hp - nextHp)) setNewRecord(hp - nextHp)
      if (critical) playBossSound('crit')
      const nc = crits + (critical ? 1 : 0)
      setCrits(nc)
      const plus = skill ? skillGauge(skill.id, n, lv) : 0
      if (plus > 0) {
        onSkill?.()
        setSkillMsg(`${partner!.name}の${skill!.name}！ ゲージ+${plus}`)
      }
      setGauge(Math.min(GAUGE_MAX, gaugeAfter(gauge, critical) + plus))
      setAtk(null)
      // ボスの反撃：4問ごとに、正解しても次のなかまにこうげき
      if (teamOn && 'team' in q && nextHp > 0 && isCounterTurn(index)) {
        const who = counterTarget(teamHp, q.team as TeamRole)
        if (who && shield) {
          setShield(false)
          setShieldUsed(index)
          setAtk({ at: index, lose: 0, who, dmg: 0, counter: true })
        } else if (who) {
          const r = hitMember(teamHp, who, COUNTER_DMG)
          setTeamHp(r.hp)
          setAtk({ at: index, lose: r.ko ? 1 : 0, who, dmg: COUNTER_DMG, counter: true })
          if (r.ko) {
            setHearts(Math.max(0, hearts - 1))
            if (hearts - 1 <= 0) {
              markLost(baseLook.name)
              onLose?.()
            }
          }
        }
      }
      setHp(Math.max(0, nextHp))
      setHit(true)
      playComboCorrect(c)
      answerFor(q)?.(true, quizXp(c), q.word.id, 'quiz')
      if (nextHp <= 0) win(nc)
    } else {
      setCombo(0)
      const canSave = !!skill && saves < skillSaves(skill.id, lv)
      const guard = skill?.id === 'guard' && canSave
      // まちがえたら必ずハートがへる（ためこうげきは2つ）。チームバトルでは番のなかまも体力がへる
      const lose = charge ? 2 : 1
      const who = teamOn && 'team' in q ? hitTarget(teamHp, q.team as TeamRole) : undefined
      const teamHit = who ? hitMember(teamHp, who, charge ? CHARGE_HIT : MEMBER_HIT) : null
      const revive = skill?.id === 'revive' && canSave && hearts - lose <= 0
      if (guard || revive) onSkill?.()
      if (guard || revive || shield) setAtk({ at: index, lose: 0 }) // こうげきは来たけど守った
      if (guard) {
        setSaves(saves + 1)
        setSkillMsg(`${partner!.name}の${skill!.name}！ ハートを守った`)
      } else if (revive) {
        setSaves(saves + 1)
        setHearts(1)
        if (teamHit && who) setTeamHp({ ...teamHit.hp, [who]: Math.max(1, teamHit.hp[who]) })
        setSkillMsg(`${partner!.name}の${skill!.name}！ ハート1でふんばった`)
      } else if (shield) {
        setShield(false)
        setShieldUsed(index)
      } else {
        if (teamHit && who) setTeamHp(teamHit.hp)
        setAtk(teamHit && who ? { at: index, lose, who, dmg: charge ? CHARGE_HIT : MEMBER_HIT, ko: teamHit.ko } : { at: index, lose })
        setHearts(Math.max(0, hearts - lose))
        if (hearts - lose <= 0) {
          markLost(baseLook.name)
          onLose?.()
        }
      }
      if (traits.includes('drain') && hp < maxHp) {
        setHp(Math.min(maxHp, hp + DRAIN_HEAL))
        setTraitMsg(`${BOSS_TRAITS.drain.icon} ${look.name}の${BOSS_TRAITS.drain.name}！ HP +${Math.min(DRAIN_HEAL, maxHp - hp)}`)
      }
      if (q.word.id) setMissed((m) => (m.some((w) => w.id === q.word.id) ? m : [...m, q.word]))
      playWrong()
      answerFor(q)?.(false, 0, q.word.id, 'quiz')
    }
  }

  function fireSpecial() {
    if (gauge < GAUGE_MAX || won || lost) return
    const nextHp = hp - SPECIAL_DAMAGE
    setGauge(0)
    setSpecial(special + 1)
    playBossSound('special')
    setHp(Math.max(0, nextHp))
    setHit(true)
    playCorrect()
    if (nextHp <= 0) win(crits)
  }

  function applyItem(id: BattleItemId) {
    if (!bag || bag[id] <= 0 || usedItems.includes(id) || won || lost) return
    setUsedItems([...usedItems, id])
    onUseItem?.(id)
    if (id === 'lucky') {
      setSkillMsg('🍀 ラッキーコイン！ この戦いのSランクボーナスが2倍')
      return
    }
    if (id === 'clock') {
      setSkillMsg('⏳ スローどけい！ 会心の一撃の時間が2倍になった')
      return
    }
    if (id === 'charm') {
      setHearts(Math.min(HEARTS, hearts + 1))
      setTeamHp(reviveOne)
      setSkillMsg('🧿 おまもりでハートが1つもどった！')
      return
    }
    const nextHp = hp - BOMB_DAMAGE
    setHp(Math.max(0, nextHp))
    setHit(true)
    setSkillMsg(`💣 どっかん！ ${BOMB_DAMAGE} ダメージ`)
    if (nextHp <= 0) win(crits)
  }

  function win(c: number) {
    playBossSound('victory')
    setProverb(learnProverb(rnd()))
    if (takeRevenge(baseLook.name)) {
      setRevenge(true)
      onRankBonus?.(REVENGE_COINS)
    }
    const sec = Math.max(1, Math.round((nowMs() - startedAt.current) / 1000))
    setTime({ sec, best: recordBossTime(look.name, sec) })
    if (!noBook) saveBook(recordWin(loadBook(), look, battleRank(hearts, c), dayKey()))
    onWin()
    onDefeat?.()
    if (golden) onRankBonus?.(GOLDEN_COINS)
    const d = onDrop ? dropOf(rnd()) : null
    setDrop(d)
    if (d) onDrop!(d)
    onWinHearts?.(hearts)
    if (battleRank(hearts, c) === 'S') onRankBonus?.(RANK_S_COINS * (usedItems.includes('lucky') ? 2 : 1))
    if (!fired.current) {
      setSealed(true)
      addSealTraits(traits)
      if (addSealWin() % SEAL_TICKET_EVERY === 0 && giveTicket) {
        giveTicket()
        setSealTicket(true)
      }
      onRankBonus?.(SEAL_COINS)
    }
  }

  function next() {
    setPicked(null)
    setHit(false)
    setCrit(false)
    setIndex(index + 1)
  }

  function retry() {
    setTipAt(null)
    setMvp(null)
    setHintAt(null)
    setProverb(null)
    setRevenge(false)
    setShield(false)
    setShieldUsed(-1)
    setSPrize(null)
    setMinion('none')
    setMinionAt(-1)
    startedAt.current = nowMs()
    setTime(null)
    setQs(makeQs())
    setIndex(0)
    setHp(maxHp)
    setHearts(startHearts)
    setTeamHp(fullTeamHp(memberMax))
    setCombo(0)
    setPicked(null)
    setHit(false)
    setHealed(false)
    setMissed([])
    setGauge(0)
    setCorrects(0)
    setTeamHits({ word: 0, grammar: 0, reading: 0 })
    setCrits(0)
    setUsedItems([])
    setDrop(null)
    setContinued(false)
    setChanceAt(-1)
    setChargeAt(-1)
    setSleepAt(-1)
    setSaves(0)
    setSkillMsg('')
    setTraitMsg('')
    setRegenUsed(false)
    fired.current = false
    setFiredShown(false)
    setSealed(false)
    setSealTicket(false)
  }

  return (
    <section className={`card quiz boss bg-${golden ? 'gold' : bossBgOf(level)}${atk && atk.at === index && picked !== null && atk.lose > 0 ? ' hurt' : ''}`}>
      <div className="stage-head">
        <button className="stage-back" onClick={onExit}>
          {won || lost ? '← もどる' : '← にげる'}
        </button>
        <span>{title ?? `${level} のボス`}</span>
      </div>
      {note && index === 0 && picked === null && <p className="boss-mode-note">{note}</p>}
      {picked !== null && q && picked === q.answer && !won && (
        <p className="boss-hurt">
          {look.name}「{hurtLineOf(baseLook.name, corrects).en}」<span className="boss-intro-ja">{hurtLineOf(baseLook.name, corrects).ja}</span>
        </p>
      )}
      {minion === 'here' && !won && !lost && <p className="boss-minion">👾 子分のチビ{look.name}があらわれた！ 次の正解でたおすと 🪙{MINION_COINS}</p>}
      {minion === 'beaten' && minionAt === index && picked !== null && !won && <p className="boss-minion">👾 子分をたおした！ 🪙{MINION_COINS}</p>}
      {enraged && !won && <p className="boss-rage">💢 {look.name}がおこった！</p>}
      {chance && !won && !lost && <p className="boss-chance">⚡ チャンス問題！ 正解でダメージ2倍</p>}
      {asleep && !won && !lost && <p className="boss-sleep">💤 {look.name}がねむっている！ 正解でダメージ2倍</p>}
      {shield && !won && !lost && <p className="boss-shield">🛡 ことばの盾：次のまちがい1回はハートがへらない</p>}
      {shieldUsed === index && picked !== null && <p className="boss-shield">🛡 ことばの盾がハートを守った！</p>}
      {charge && !won && !lost && picked === null && <p className="boss-charge">⚠ {look.name}が力をためている！ まちがえるとハート2つへる</p>}
      {charge && picked !== null && shieldUsed !== index && <p className="boss-charge">{picked === q?.answer ? `💫 ${look.name}がひるんだ！ +${CHARGE_STUN}` : `💥 ${look.name}のためこうげき！ ハートが2つへった`}</p>}
      {atk && atk.at === index && picked !== null && !won && (
        <div key={`atk${index}`} className={`boss-atk-fx elem-${elem.id}${atk.lose === 0 ? ' blocked' : ''}`} aria-hidden="true">
          <span className="elem-icon">{elem.icon}</span>
          <span className="slash s1" />
          <span className="slash s2" />
          <span className="slash s3" />
        </div>
      )}
      <div className={`boss-figure${enraged && !won ? ' rage' : ''}${won ? ' finished' : ''}${atk && atk.at === index && picked !== null ? ' attack' : ''}`}>
        <BossArena bg={golden ? 'gold' : bossBgOf(level)} color={look.color} night={night} season={season} />
        <BossFigure hit={hit} look={look} />
        {teamOn && index === 0 && picked === null && !won && (
          <span className="boss-vs" aria-hidden="true">
            VS
          </span>
        )}
        {hit && lastDmg > 0 && (
          <span key={`d${index}`} className={`dmg-pop${crit ? ' crit' : ''}`} aria-hidden="true">
            -{lastDmg}
          </span>
        )}
      </div>
      {hit && crit && (
        <p key={index} className="boss-crit" role="status">
          ⚡ 会心の一撃！
        </p>
      )}
      {special > 0 && (
        <p key={`sp${special}`} className="boss-special" role="status" style={skill ? { color: specialOf(partner!.species).color } : undefined}>
          💥 {skill ? `${partner!.name}の「${specialOf(partner!.species).name}」！` : '必殺技！'} {SPECIAL_DAMAGE} ダメージ
        </p>
      )}
      {shiny && <p className="golden-boss shiny-boss">✨ 色ちがいのボスがあらわれた！ たおすとボス図鑑に記録されるよ</p>}
      {golden && <p className="golden-boss">✨ 金色ボスがあらわれた！ たおすと 🪙{GOLDEN_COINS} のおまけ</p>}
      <p className="boss-name">{look.name}</p>
      {index === 0 && picked === null && hp === maxHp && (
        <div className="battle-start" aria-hidden="true">
          ⚔ バトルスタート！
        </div>
      )}
      {index === 0 && picked === null && hp === maxHp && (
        <p className="boss-intro">
          「{introLineOf(look.name).en}」
          <span className="boss-intro-ja">{introLineOf(look.name).ja}</span>
        </p>
      )}
      <p className={`boss-weak${hitsWeak ? ' hit' : ''}`}>
        弱点：{speciesOf(weak).name}
        {hitsWeak && `　⚡ 弱点をついている！ 正解ごとに +${WEAK_BONUS}`}
      </p>
      {index === 0 && picked === null && hp === maxHp && traits.length > 0 && (
        <p className={`trait-cutin t-${traits[0]}`} aria-hidden="true">
          {traits.map((t) => BOSS_TRAITS[t].icon).join('')} {look.name}のとくぎ「{traits.map((t) => BOSS_TRAITS[t].name).join('・')}」
        </p>
      )}
      {traits.length > 0 && !won && !lost && !firedShown && (
        <p className="seal-live" title="とくぎを発動させずに勝つと とくぎ封じ">
          🔒 とくぎ封じ中
        </p>
      )}
      {traits.map((t) => (
        <p key={t} className="boss-trait" title={BOSS_TRAITS[t].desc}>
          {traits.length > 1 ? '👑 ' : ''}とくぎ：{BOSS_TRAITS[t].icon} {BOSS_TRAITS[t].name}（{BOSS_TRAITS[t].desc}）
        </p>
      ))}
      {traitMsg && picked !== null && !won && (
        <p key={traitMsg + index} className="boss-trait-pop" role="status">
          {traitMsg}
        </p>
      )}
      {partner && !won && !lost && (
        <div className="boss-partner">
          {picked !== null && q && picked === q.answer && !won && (
            <span key={`cheer${index}`} className="cheer-stamp" aria-label="おうえんスタンプ">
              {cheerStampOf(corrects)}
            </span>
          )}
          <span className="boss-partner-fig">
            <MonsterFigure form={partner.form} kind={partner.kind} wear={partner.wear} mood={hit ? 'happy' : 'normal'} />
          </span>
          <span className="boss-partner-text">
            {skillMsg ? (
              <strong key={skillMsg + index} className="boss-skill-pop">
                {skillMsg}
              </strong>
            ) : skill ? (
              <>
                {partner.name}の特技「{skill.name}」Lv{lv}：{skill.desc}
              </>
            ) : (
              <>{teamOn ? '🤝 3人のチームで挑戦！' : `${partner.name}が応援中！`}</>
            )}
          </span>
        </div>
      )}
      {index === 0 && picked === null && <p className="stats-note boss-tip" title="3秒以内に正解すると会心の一撃">⚡ 3秒以内で会心！</p>}
      {look.taunt && index === 0 && picked === null && (
        <p className="boss-taunt">
          「{look.taunt.en}」<span>{look.taunt.ja}</span>
        </p>
      )}
      {look.taunt && partner && skill && index === 0 && picked === null && (
        <p className="boss-taunt partner-reply">
          {partner.name}：「{replyOf(partner.species).en}」<span>{replyOf(partner.species).ja}</span>
        </p>
      )}
      <div className="boss-hp" role="progressbar" aria-label="ボスのHP" aria-valuemin={0} aria-valuemax={maxHp} aria-valuenow={hp}>
        <div className="boss-hp-fill" style={{ width: `${(hp / maxHp) * 100}%` }} />
      </div>
      <p className="boss-hp-num">
        のこりHP {hp} / {maxHp}
      </p>
      <p className="boss-status">
        <span aria-label={`のこりハート ${hearts}`}>{'❤️'.repeat(hearts) + '🤍'.repeat(HEARTS - hearts)}</span>
        {comeback && !won && <span className="comeback-badge">⚡逆転チャンス！ダメージ2倍</span>}
        {combo >= 2 && (
          <span key={combo} className={`combo${combo >= BIG_COMBO ? ' big' : ''}`}>
            🔥{combo}
          </span>
        )}
        <span className={`special-gauge${gauge >= GAUGE_MAX ? ' full' : ''}`} role="meter" aria-label="必殺技ゲージ" aria-valuemin={0} aria-valuemax={GAUGE_MAX} aria-valuenow={gauge}>
          {Array.from({ length: GAUGE_MAX }, (_, i) => (
            <i key={i} className={i < gauge ? 'on' : ''} />
          ))}
        </span>
        {onSpend && !healed && !won && hearts > 0 && hearts < HEARTS && (
          <button
            className="hint-5050"
            onClick={() => {
              if (!onSpend(HEAL_COST)) return
              setHearts(hearts + 1)
              setTeamHp(reviveOne)
              setHealed(true)
            }}
          >
            ❤️+1（🪙{HEAL_COST}）
          </button>
        )}
      </p>
      {bag && !won && !lost && (bag.bomb > 0 || bag.charm > 0 || bag.clock > 0 || bag.lucky > 0) && (
        <div className="battle-items">
          {BATTLE_ITEMS.filter((it) => bag[it.id] > 0).map((it) => (
            <button key={it.id} className="battle-item" disabled={usedItems.includes(it.id) || (it.id === 'charm' && hearts >= HEARTS)} onClick={() => applyItem(it.id)}>
              <span className="bi-icon" aria-hidden="true">{it.icon}</span>
              <span className="bi-name">{it.name}</span>
              <span className="bi-count" aria-label={`あと${bag[it.id]}こ`}>×{bag[it.id]}</span>
            </button>
          ))}
        </div>
      )}
      {gauge >= GAUGE_MAX && !won && !lost && (
        <button className="special-btn" onClick={fireSpecial}>
          💥 {skill ? `「${specialOf(partner!.species).name}」をはなつ！` : '必殺技をはなつ！'}
        </button>
      )}

      {won ? (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="confetti"
              aria-hidden="true"
              style={{
                left: `${(i * 83) % 100}%`,
                background: [look.color, '#facc15', look.color, '#3b82f6', '#ffffff', '#ec4899'][i % 6], // たおしたボスの色をまぜる
                animationDelay: `${(i % 6) * 0.12}s`,
              }}
            />
          ))}
          {battleRank(hearts, crits) === 'S' && (
            <>
              {Array.from({ length: 16 }, (_, i) => (
                <span key={`g${i}`} className="confetti gold" aria-hidden="true" style={{ left: `${(i * 37 + 5) % 100}%`, animationDelay: `${(i % 8) * 0.1}s` }} />
              ))}
              <p className="perfect-banner">PERFECT!</p>
              {sPrize === null ? (
                <button
                  className="special-btn"
                  onClick={() => {
                    const p = sRouletteOf(rnd())
                    setSPrize(p)
                    if (p.kind === 'coins') onRankBonus?.(p.amount)
                    else onDrop?.(p.id)
                  }}
                >
                  🎡 ごほうびルーレット！
                </button>
              ) : (
                <p className="boss-drop">
                  🎡 {sPrize.kind === 'coins' ? `🪙${sPrize.amount}` : `${BATTLE_ITEMS.find((it) => it.id === sPrize.id)!.icon} ${BATTLE_ITEMS.find((it) => it.id === sPrize.id)!.name}`} が当たった！
                </p>
              )}
            </>
          )}
          <p className="boss-finisher" aria-hidden="true">💥 とどめ！</p>
          {mvp && (
            <p className="boss-mvp" title={`${mvp.en}（${mvp.ja}）を ${(mvp.ms / 1000).toFixed(1)}秒で正解`}>
              🏅 MVP単語：<strong>{mvp.en}</strong>（{mvp.ja}）{(mvp.ms / 1000).toFixed(1)}秒
            </p>
          )}
          {proverb !== null && (
            <p className="boss-proverb">
              📜 {look.name}のことわざ「{PROVERBS[proverb].en}」
              <span className="boss-intro-ja">{PROVERBS[proverb].ja}</span>
            </p>
          )}
          {revenge && <p className="level-up boss-revenge">🔥 リベンジ成功！ 🪙{REVENGE_COINS}</p>}
          <p className="level-up boss-result">ボスをたおした！ 🎉</p>
          <p className="buddy-chips game-chips boss-records">
            {time && (
              <span className={time.best ? 'game-best' : undefined} aria-label={`タイム ${formatSec(time.sec)}${time.best ? ' 最短記録！' : ''}`}>
                ⏱ {formatSec(time.sec)}
                {time.best ? ' 🏁 最短！' : ''}
              </span>
            )}
            {time && !time.best && <span>🏁 最短 {formatSec(loadBossTimes()[look.name] ?? time.sec)}</span>}
            <span className={newRecord > 0 ? 'game-best' : undefined} aria-label={newRecord > 0 ? `最大ダメージ記録を更新！ ${newRecord}` : `最大ダメージ記録 ${loadMaxHit()}`}>
              💥 {newRecord > 0 ? `${newRecord} 更新！` : `最大 ${loadMaxHit()}`}
            </span>
          </p>
          {drop && (
            <p className="boss-drop">
              🎁 {BATTLE_ITEMS.find((it) => it.id === drop)!.icon} {BATTLE_ITEMS.find((it) => it.id === drop)!.name} ゲット！
            </p>
          )}
          <p className="boss-taunt boss-defeat">
            「{defeatLineOf(look.name).en}」<span>{defeatLineOf(look.name).ja}</span>
          </p>
          {teamOn && (
            <p className="boss-team-result" aria-label={`チームの活やく 単語${teamHits.word}問・文法${teamHits.grammar}問・読解${teamHits.reading}問`}>
              {TEAM_ORDER.map((r) => (
                <span key={r} className={`team-${r}`}>
                  {TEAM_ICON[r]}
                  {TEAM_LABEL[r]} {teamHits[r]}問
                </span>
              ))}
            </p>
          )}
          {teamOn && (
            <p className={`boss-team-win team-${teamMvp(teamHits)}`} title={`${team![teamMvp(teamHits)].name}「${TEAM_WIN_LINES[teamMvp(teamHits)].en}」（${TEAM_WIN_LINES[teamMvp(teamHits)].ja}）`}>
              {TEAM_ICON[teamMvp(teamHits)]} 「{TEAM_WIN_LINES[teamMvp(teamHits)].en}」
              <small>{TEAM_WIN_LINES[teamMvp(teamHits)].ja}</small>
            </p>
          )}
          {/* ランク・ハート・会心・ボーナスは1枚の横長カードにまとめる（カードを減らして見やすく） */}
          <div className="boss-rank-row">
            <p className={`battle-rank rank-${battleRank(hearts, crits)}`} aria-label={`ランク ${battleRank(hearts, crits)}`}>
              {battleRank(hearts, crits)}
            </p>
            <div className="boss-rank-info">
              <p className="stats-note" title={battleRank(hearts, crits) === 'S' ? undefined : 'ハートを減らさず会心3回でSランク'}>
                ❤️{hearts}・⚡会心{crits}回{battleRank(hearts, crits) === 'S' ? `・🪙${RANK_S_COINS}！` : ''}
              </p>
              {sealed && <p className="boss-seal">🔒 とくぎ封じ！ 🪙{SEAL_COINS}{sealTicket ? ` ＋🎟（${SEAL_TICKET_EVERY}回ごとのごほうび）` : ''}</p>}
              <p className="result-message boss-bonus">
                ボーナス +<CountUp to={bonus} />
                XP
              </p>
            </div>
          </div>
          {winBuddy && !teamOn && (
            <p className="grammar-praise boss-buddy-cheer">
              {winBuddy.icon} {winBuddy.name}「{winLine.en}」
              <button className="speak small" onClick={() => speak(winLine.en)} aria-label="竜のひとことを聞く">
                🔊
              </button>
              <br />
              <small>（{winLine.ja}）</small>
            </p>
          )}
          <MissedList words={missed} />
          {nextBoss && (
            <button className="good next-unit-btn" onClick={nextBoss.onClick}>
              {nextBoss.label}
            </button>
          )}
          <button className="flip" onClick={onExit}>
            {winLabel}
          </button>
        </>
      ) : lost && picked === null ? (
        <>
          <p className="boss-result">まけてしまった…</p>
          {teamOn ? (
            <div className="boss-team-cheer" aria-label="チームのはげまし">
              {TEAM_ORDER.map((r) => (
                <p key={r} className={`team-${r}`} title={`${team![r].name}「${TEAM_LOSE_LINES[r]}」`}>
                  {TEAM_ICON[r]}「{TEAM_LOSE_LINES[r]}」
                </p>
              ))}
            </div>
          ) : (
            partner && <p className="grammar-praise lose-cheer">🐣 {partner.name}「{cheerOnLose(corrects)}」</p>
          )}
          {!teamOn && <p className="result-message">{reading ? '本文をもう一度ゆっくり読んで、もう一度挑戦しよう！' : '苦手な単語を復習して、もう一度挑戦しよう！'}</p>}
          {onSpend && !continued && hearts <= 0 && index < qs.length && (
            <button
              className="boss-btn continue-btn"
              title={`🪙${CONTINUE_COST}でハート全回復して続きから`}
              onClick={() => {
                if (!onSpend(CONTINUE_COST)) return
                setHearts(HEARTS)
                setTeamHp(fullTeamHp(memberMax))
                setContinued(true)
              }}
            >
              🔥 コンティニュー 🪙{CONTINUE_COST}
            </button>
          )}
          <MissedList words={missed} />
          <button className="flip" onClick={retry}>
            もう一度挑戦
          </button>
        </>
      ) : (
        <>
          {'passage' in q && (
            <details className="boss-passage chip-fold cf-3" open>
              <summary>📖 本文：{(q as ReadingQ).passage.title}</summary>
              {(q as ReadingQ).passage.paragraphs.map((t, i) => (
                <p key={i} className={tipAt === index && picked === null && (q as ReadingQ).hint?.quote && t.includes((q as ReadingQ).hint!.quote!.replace(/\s+$/, '')) ? 'boss-hint-para' : undefined}>
                  {filledParts(
                    t,
                    (q as ReadingQ).passage,
                    solved.filter((k) => k.startsWith(`${(q as ReadingQ).passage.id}:`)).map((k) => k.slice(k.lastIndexOf(':') + 1)),
                  ).map((x, j) =>
                    typeof x === 'string' ? (
                      x.split(/(\s+)/).map((tok, k) => {
                        const hit = lookupWord(tok)
                        return hit ? (
                          <button key={`${j}-${k}`} className="gloss-word" onClick={() => setGloss(gloss?.id === hit.id ? null : hit)}>
                            {tok}
                          </button>
                        ) : (
                          tok
                        )
                      })
                    ) : (
                      <mark key={j} className="boss-filled" aria-label={`（${x.id}）${x.word}`}>
                        ({x.id}) {x.word}
                      </mark>
                    ),
                  )}
                </p>
              ))}
              {gloss && (
                <p className="gloss" role="status">
                  {gloss.en}：{gloss.ja}
                </p>
              )}
            </details>
          )}
          {teamOn && 'team' in q && (
            <>
              <div className="boss-team" role="group" aria-label="チーム">
                {TEAM_ORDER.map((r) => (
                  <span key={r} className={`boss-team-m team-${r}${q.team === r ? ' on' : ''}${teamHp[r] <= 0 ? ' down' : ''}${atk && atk.at === index && picked !== null && atk.who === r && (atk.dmg ?? 0) > 0 ? ' hurt' : ''}`} aria-current={q.team === r ? 'true' : undefined}>
                    <span className="boss-team-hp" role="progressbar" aria-label={`${team![r].name}の体力`} aria-valuemin={0} aria-valuemax={memberMax} aria-valuenow={teamHp[r]}>
                      <i style={{ width: `${(teamHp[r] / memberMax) * 100}%` }} />
                    </span>
                    {teamHp[r] <= 0 && <b className="boss-team-down" aria-hidden="true">💫</b>}
                    {atk && atk.at === index && picked !== null && atk.who === r && (atk.dmg ?? 0) > 0 && (
                      <i key={`dmg${index}`} className="boss-team-dmg" aria-hidden="true">
                        -{atk.dmg}
                      </i>
                    )}
                    <span className="boss-team-fig" aria-hidden="true">
                      {team![r].fig}
                    </span>
                    <small>
                      {TEAM_ICON[r]}
                      {TEAM_LABEL[r]}
                      {team![r].level !== undefined && <b className="boss-team-lv" title={`攻撃力 +${levelAttack(team![r].level)}`}> Lv.{team![r].level}{levelAttack(team![r].level) > 0 && <i className="boss-team-atk">⚔+{levelAttack(team![r].level)}</i>}</b>}
                    </small>
                    {q.team === r && picked !== null && picked === q.answer && (
                      <i key={`xp${index}`} className="boss-team-xp" aria-label={`${team![r].name}に XP +${quizXp(combo)}`}>
                        +{quizXp(combo)}XP
                      </i>
                    )}
                  </span>
                ))}
              </div>
              {trioAt === index && picked !== null && (
                <p className="boss-trio-pop" role="status">
                  🤝 合体技 トリプルアタック！ +{TEAM_COMBO_DAMAGE}
                </p>
              )}
              {supportTypes.length > 0 && (
                <p className="boss-support" aria-label={`応援なかまの効果：${supportTypes.map((t) => CHAR_TYPES[t].name).join('・')}`}>
                  🐾 応援
                  {sup.atk > 0 && <span>⚔+{sup.atk}</span>}
                  {sup.shield && <span>🛡</span>}
                  {sup.gauge > 0 && <span>📣+{sup.gauge}</span>}
                  {sup.critMs > 0 && <span>⚡+{sup.critMs / 1000}秒</span>}
                  {sup.hp > 0 && <span>💪+{sup.hp}</span>}
                </p>
              )}
              <p className="boss-team-turn">
                {TEAM_ICON[q.team as TeamRole]} {team![q.team as TeamRole].name}の{TEAM_LABEL[q.team as TeamRole]}アタック！
              </p>
            </>
          )}
          <p className={`en${'passage' in q ? ' boss-reading-q' : ''}${'team' in q && q.team !== 'word' ? ' boss-sentence-q' : ''}`}>{q.word.en}</p>
          {'passage' in q && picked === null && ((q as ReadingQ).hint?.note || (q as ReadingQ).hint?.quote) &&
            (tipAt === index ? (
              <div className="boss-hint" role="status">
                {(q as ReadingQ).hint!.note && <p>💡 {maskAnswer((q as ReadingQ).hint!.note!, q.choices[q.answer])}</p>}
                {(q as ReadingQ).hint!.quote && (
                  <p>
                    📍 根拠：<q lang="en">{(q as ReadingQ).hint!.quote}</q>
                  </p>
                )}
              </div>
            ) : (
              <button
                className="hint-5050 boss-hint-btn"
                onClick={() => {
                  setTipAt(index)
                  // 根拠のある段落が本文のわくの外なら、見えるところまでスクロール
                  setTimeout(() => document.querySelector('.boss-hint-para')?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' }), 0)
                }}
              >
                💡 ヒント
              </button>
            ))}
          {partner && !('passage' in q) && hintAt === null && picked === null && (
            <button
              className="hint-5050 hint-erase"
              title={`${partner.name}が考え方のヒントをくれる`}
              onClick={() => setHintAt({ index, hide: -1 })}
            >
              💡 ヒント
            </button>
          )}
          {!('passage' in q) && hintAt?.index === index && picked === null && (
            <p className="read-hint-text boss-hint-text">💡 {(q as { hint?: string }).hint ?? wordHint(q.word, q.choices[q.answer])}</p>
          )}
          <div className="choices">
            {q.choices.map((c, i) => {
              if (hintAt && hintAt.index === index && hintAt.hide === i && picked === null) return null
              let cls = 'choice'
              if (picked !== null && i === q.answer) cls += ' correct'
              else if (picked === i) cls += ' wrong'
              return (
                <button key={c} className={cls} onClick={() => pick(i)} disabled={picked !== null}>
                  {c}
                </button>
              )
            })}
          </div>
          {picked !== null && (
            <>
              {atk && atk.at === index && !won && (
                <p className="boss-atk-msg" role="status">
                  {atk.who && teamOn
                    ? !atk.dmg
                      ? `🛡 ${look.name}の${atk.counter ? '反撃' : 'こうげき'}！ ガード！`
                      : `${elem.icon} ${elem.name}の${atk.counter ? '反撃' : 'こうげき'}！ ${TEAM_ICON[atk.who]}${TEAM_LABEL[atk.who]} -${atk.dmg}${atk.counter ? (atk.lose > 0 ? ' ダウン！' : '') : `${atk.ko ? ' ダウン！' : ''} ❤️-${atk.lose}`}`
                    : atk.lose === 0
                      ? `🛡 ${look.name}のこうげき！ ガード！`
                      : `${elem.icon} ${elem.name}のこうげき！ ❤️-${atk.lose}`}
                </p>
              )}
              <p className="feedback">
                {picked === q.answer ? `${damage(combo)} ダメージ！` : `正解は「${q.choices[q.answer]}」`}
              </p>
              {picked === q.answer && combo >= BIG_COMBO && (
                <p className="mega-combo boss-mega-combo" role="status">
                  🔥 すごいコンボ！ {combo}連続！
                </p>
              )}
              <button className="flip" onClick={next}>
                次へ
              </button>
            </>
          )}
        </>
      )}
    </section>
  )
}

// ボス図鑑：たおしたボスは姿と日付、まだのボスはシルエット
export function BossDex({ record }: { record: BossRecord }) {
  const shadow: BossLook = { name: '？？？', color: '#9ca3af', line: '#6b7280', eye: '#e5e7eb' }
  const beaten = LEVELS.filter((l) => record[l]).length
  return (
    <div className="zukan">
      <h2>
        ボス図鑑 {beaten} / {LEVELS.length}
      </h2>
      <ul className="badge-grid">
        {LEVELS.map((l) => (
          <li key={l} className={record[l] ? 'got' : 'locked'}>
            <span className="zukan-figure">
              <BossFigure hit={false} look={record[l] ? BOSSES[l] : shadow} />
            </span>
            <span className="badge-name">{record[l] ? BOSSES[l].name : '？？？'}</span>
            <span className="badge-desc">{record[l] ? `${record[l]}・${BOSSES[l].desc ?? ''}` : `${l}のボス`}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
