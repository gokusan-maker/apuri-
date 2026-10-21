import { loadSettings } from './settings'
import { MissedList } from './MissedListView'
import { useEffect, useRef, useState } from 'react'
import { MonsterFigure } from './MonsterView'
import { BATTLE_ITEMS, BOMB_DAMAGE, dropOf, type BattleBag, type BattleItemId } from './battleitems'
import { loadBook, markLost, recordWin, REVENGE_COINS, saveBook, takeRevenge } from './bossbook'
import { dayKey } from './srs'
import { skillCritMs, skillDamage, skillGauge, skillLevel, skillOf, skillSaves, replyOf, specialOf, WEAK_BONUS, weakOf } from './partner'
import { BOSS_HP, bossQuestions, BOSSES, CRIT_MS, critDamage, damage, GAUGE_MAX, gaugeAfter, HEAL_COST, HEARTS, CONTINUE_COST, defeatLineOf, introLineOf, bossBgOf, GOLDEN_COINS, goldenLook, isChance, isCharge, isAsleep, CHARGE_STUN, PREEMPT_DAMAGE, MINION_COINS, sRouletteOf, countBattle, shinyLook, hurtLineOf, isCritical, isEnraged, RANK_S_COINS, SPECIAL_DAMAGE, battleRank, loadMaxHit, recordHit, formatSec, loadBossTimes, recordBossTime, type BossLook, type BossRecord } from './boss'
import { quizXp, SPECIES, speciesOf, type Form, type Source } from './monster'
import { easyIf } from './quiz'
import { playBossSound, playComboCorrect, playCorrect, playWrong } from './sound'
import { LEVELS, type Level, type Word } from './words'

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
  hp?: number // ボスのHP（大学入試の塔は強い）
  grammar?: boolean // 4問に1問を文法問題にする（大学入試の塔）
  startHearts?: number // ボスラッシュではハートを引き継ぐ
  winLabel?: string // 勝ったあとのボタンの文字
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
  return (
    <svg viewBox="0 0 100 100" className={`boss-svg${hit ? ' hit' : ''}`} aria-hidden="true">
      {(!look.deco || look.deco === 'akamon') && <path d="M30 30 L24 8 L40 24 Z M70 30 L76 8 L60 24 Z" fill={look.color} stroke={look.line} strokeWidth="3" />}
      {look.deco && <BossDecoBack deco={look.deco} look={look} />}
      <path d="M12 72 Q12 24 50 22 Q88 24 88 72 Q88 92 50 92 Q12 92 12 72 Z" fill={look.color} stroke={look.line} strokeWidth="3" />
      <path d="M30 50 L44 56 M70 50 L56 56" stroke={look.eye} strokeWidth="4" strokeLinecap="round" />
      <circle cx="38" cy="58" r="4" fill={look.eye} />
      <circle cx="62" cy="58" r="4" fill={look.eye} />
      <path d="M38 74 L44 70 L50 74 L56 70 L62 74" fill="none" stroke="#f5f3ff" strokeWidth="3" />
      {look.deco && <BossDecoFront deco={look.deco} look={look} />}
    </svg>
  )
}

// 今の時刻（ミリ秒）。会心の一撃の判定に使う（ボタンを押したときだけ呼ぶ）
// 先制クイズの選択肢：弱点のキャラと、ほかの2つ（弱点によって並びを変える）
function preemptChoices(weak: string): string[] {
  const others = SPECIES.map((sp) => sp.id).filter((id) => id !== weak)
  const k = [...weak].reduce((a, c) => a + c.charCodeAt(0), 0)
  const pick = [others[k % others.length], others[(k + 1) % others.length]]
  const at = k % 3
  return [...pick.slice(0, at), weak, ...pick.slice(at)]
}

const nowMs = () => Date.now()
const rnd = () => Math.random()

export function Boss({ level, words, onAnswer, onWin, onExit, bonus = 100, onSpend, look: lookProp, title, hp: maxHp = BOSS_HP, grammar = false, partner, onRankBonus, startHearts = HEARTS, winLabel = 'ステージにもどる', onWinHearts, noBook = false, bag, onUseItem, onDefeat, onSkill, onDrop, onLose, golden = false, power = 0 }: Props) {
  const baseLook = lookProp ?? BOSSES[level]
  const [shiny] = useState(() => countBattle() && !golden)
  const look = golden ? goldenLook(baseLook) : shiny ? shinyLook(baseLook) : baseLook
  const [qs, setQs] = useState(() => bossQuestions(words, grammar).map((q) => easyIf(loadSettings().easy, q)))
  const [index, setIndex] = useState(0)
  const [hp, setHp] = useState(maxHp)
  const [hearts, setHearts] = useState(startHearts)
  const [combo, setCombo] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [hit, setHit] = useState(false)
  const [healed, setHealed] = useState(false) // 回復は1戦1回まで
  const [missed, setMissed] = useState<Word[]>([])
  const [crit, setCrit] = useState(false)
  const [gauge, setGauge] = useState(0)
  const skill = partner && partner.form.stage > 0 ? skillOf(partner.species) : null
  const lv = skillLevel(partner?.skillUses ?? 0)
  const weak = weakOf(baseLook.name)
  const hitsWeak = !!skill && (partner?.species ?? 'mochi') === weak
  const [corrects, setCorrects] = useState(0)
  const [crits, setCrits] = useState(0)
  const [saves, setSaves] = useState(0) // ガード・根性を使った回数
  const [skillMsg, setSkillMsg] = useState('')
  const [usedItems, setUsedItems] = useState<BattleItemId[]>([]) // 1戦1回ずつ
  const [drop, setDrop] = useState<BattleItemId | null>(null)
  const [continued, setContinued] = useState(false) // コンティニューは1戦1回
  const [lastDmg, setLastDmg] = useState(0) // 直前の正解のダメージ（数字の演出用）
  const [revenge, setRevenge] = useState(false) // リベンジ成功
  const [shield, setShield] = useState(false) // ことばの盾（3問連続正解でたまる）
  const [shieldUsed, setShieldUsed] = useState(-1) // 盾を使った問題の番号
  const [sPrize, setSPrize] = useState<ReturnType<typeof sRouletteOf> | null>(null)
  const [minion, setMinion] = useState<'none' | 'here' | 'beaten'>('none') // 子分
  const [minionAt, setMinionAt] = useState(-1) // 子分をたおした問題の番号
  const [preempt, setPreempt] = useState<boolean | null>(null) // 先制クイズの結果（null＝まだ）
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

  function pick(i: number) {
    if (picked !== null || won || lost) return
    setPicked(i)
    setSkillMsg('')
    if (i === q.answer) {
      const c = combo + 1
      const n = corrects + 1
      setCombo(c)
      if (c % 3 === 0) setShield(true)
      setCorrects(n)
      const ms = nowMs() - shownAt.current
      const slow = usedItems.includes('clock') ? 2 : 1
      const critical = isCritical(ms, (skill ? skillCritMs(skill.id, CRIT_MS, lv) : CRIT_MS) * slow)
      if (critical && skill && !isCritical(ms, CRIT_MS * slow)) {
        onSkill?.()
        setSkillMsg(`${partner!.name}の${skill!.name}！ 会心の一撃`)
      }
      const extra = skill ? skillDamage(skill.id, n, lv) : 0
      if (extra > 0) {
        onSkill?.()
        setSkillMsg(`${partner!.name}の${skill!.name}！ +${extra}`)
      }
      const base = (critical ? critDamage(damage(c)) : damage(c)) * (chance || asleep ? 2 : 1)
      const nextHp = hp - base - extra - (hitsWeak ? WEAK_BONUS : 0) - (charge ? CHARGE_STUN : 0) - power
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
      setHp(Math.max(0, nextHp))
      setHit(true)
      playComboCorrect(c)
      onAnswer?.(true, quizXp(c), q.word.id, 'quiz')
      if (nextHp <= 0) win(nc)
    } else {
      setCombo(0)
      const canSave = !!skill && saves < skillSaves(skill.id, lv)
      const guard = skill?.id === 'guard' && canSave
      const revive = skill?.id === 'revive' && canSave && hearts - (charge ? 2 : 1) <= 0
      if (guard || revive) onSkill?.()
      if (guard) {
        setSaves(saves + 1)
        setSkillMsg(`${partner!.name}の${skill!.name}！ ハートを守った`)
      } else if (revive) {
        setSaves(saves + 1)
        setHearts(1)
        setSkillMsg(`${partner!.name}の${skill!.name}！ ハート1でふんばった`)
      } else if (shield) {
        setShield(false)
        setShieldUsed(index)
      } else {
        const lose = charge ? 2 : 1
        setHearts(Math.max(0, hearts - lose))
        if (hearts - lose <= 0) {
          markLost(baseLook.name)
          onLose?.()
        }
      }
      if (q.word.id) setMissed((m) => (m.some((w) => w.id === q.word.id) ? m : [...m, q.word]))
      playWrong()
      onAnswer?.(false, 0, q.word.id, 'quiz')
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
    if (id === 'clock') {
      setSkillMsg('⏳ スローどけい！ 会心の一撃の時間が2倍になった')
      return
    }
    if (id === 'charm') {
      setHearts(Math.min(HEARTS, hearts + 1))
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
    if (battleRank(hearts, c) === 'S') onRankBonus?.(RANK_S_COINS)
  }

  function next() {
    setPicked(null)
    setHit(false)
    setCrit(false)
    setIndex(index + 1)
  }

  function retry() {
    setRevenge(false)
    setShield(false)
    setShieldUsed(-1)
    setSPrize(null)
    setMinion('none')
    setMinionAt(-1)
    startedAt.current = nowMs()
    setTime(null)
    setQs(bossQuestions(words, grammar).map((q) => easyIf(loadSettings().easy, q)))
    setIndex(0)
    setHp(maxHp)
    setHearts(startHearts)
    setCombo(0)
    setPicked(null)
    setHit(false)
    setHealed(false)
    setMissed([])
    setGauge(0)
    setCorrects(0)
    setCrits(0)
    setUsedItems([])
    setDrop(null)
    setContinued(false)
    setChanceAt(-1)
    setChargeAt(-1)
    setSleepAt(-1)
    setSaves(0)
    setSkillMsg('')
  }

  return (
    <section className={`card quiz boss bg-${golden ? 'gold' : bossBgOf(level)}`}>
      <div className="stage-head">
        <button className="stage-back" onClick={onExit}>
          ← にげる
        </button>
        <span>{title ?? `${level} のボス`}</span>
      </div>
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
      <div className={`boss-figure${enraged && !won ? ' rage' : ''}${won ? ' finished' : ''}`}>
        <BossFigure hit={hit} look={look} />
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
        <p className="boss-intro">
          「{introLineOf(look.name).en}」
          <span className="boss-intro-ja">{introLineOf(look.name).ja}</span>
        </p>
      )}
      {preempt === null && index === 0 && picked === null && hp === maxHp ? (
        <div className="boss-preempt">
          <p>❓ 先制クイズ：{look.name}の弱点はどのキャラクター？ 当てると先制 {PREEMPT_DAMAGE} ダメージ！</p>
          <div className="boss-preempt-choices">
            {preemptChoices(weak).map((id) => (
              <button
                key={id}
                className="list-link"
                onClick={() => {
                  const ok = id === weak
                  setPreempt(ok)
                  if (ok) {
                    setHp(Math.max(0, hp - PREEMPT_DAMAGE))
                    setHit(true)
                  }
                }}
              >
                {speciesOf(id).name}
              </button>
            ))}
            <button className="list-link" onClick={() => setPreempt(false)}>
              スキップ
            </button>
          </div>
        </div>
      ) : (
        preempt !== null && index === 0 && picked === null && <p className="boss-preempt-result">{preempt ? `⚡ 先制攻撃！ ${PREEMPT_DAMAGE} ダメージ` : '先制クイズははずれ…'}</p>
      )}
      {!(preempt === null && index === 0 && picked === null && hp === maxHp) && <p className={`boss-weak${hitsWeak ? ' hit' : ''}`}>
        弱点：{speciesOf(weak).name}
        {hitsWeak && `　⚡ 弱点をついている！ 正解ごとに +${WEAK_BONUS}`}
      </p>}
      {partner && (
        <div className="boss-partner">
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
              <>{partner.name}が応援しているよ！（生まれると特技が使える）</>
            )}
          </span>
        </div>
      )}
      {index === 0 && picked === null && <p className="stats-note boss-tip">⚡ 3秒以内に正解すると「会心の一撃」！ 正解でゲージがたまると必殺技が出せる</p>}
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
      <p className="boss-status">
        <span aria-label={`のこりハート ${hearts}`}>{'❤️'.repeat(hearts) + '🤍'.repeat(HEARTS - hearts)}</span>
        {combo >= 2 && <span className="combo">🔥{combo}</span>}
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
              setHealed(true)
            }}
          >
            ❤️+1（🪙{HEAL_COST}）
          </button>
        )}
      </p>
      {bag && !won && !lost && (bag.bomb > 0 || bag.charm > 0 || bag.clock > 0) && (
        <div className="battle-items">
          {BATTLE_ITEMS.filter((it) => bag[it.id] > 0).map((it) => (
            <button key={it.id} className="battle-item" disabled={usedItems.includes(it.id) || (it.id === 'charm' && hearts >= HEARTS)} onClick={() => applyItem(it.id)}>
              {it.icon} {it.name}（あと{bag[it.id]}）
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
                background: ['#f97316', '#facc15', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'][i % 6],
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
                  🎡 Sランクのごほうびルーレットをまわす
                </button>
              ) : (
                <p className="boss-drop">
                  🎡 {sPrize.kind === 'coins' ? `🪙${sPrize.amount}` : `${BATTLE_ITEMS.find((it) => it.id === sPrize.id)!.icon} ${BATTLE_ITEMS.find((it) => it.id === sPrize.id)!.name}`} が当たった！
                </p>
              )}
            </>
          )}
          <p className="boss-finisher" aria-hidden="true">💥 とどめ！</p>
          {revenge && <p className="level-up boss-revenge">🔥 リベンジ成功！ 🪙{REVENGE_COINS}</p>}
          <p className="level-up boss-result">ボスをたおした！ 🎉</p>
          {time && <p className="boss-maxhit">⏱ タイム {formatSec(time.sec)}{time.best ? '　🏁 最短記録！' : `（最短 ${formatSec(loadBossTimes()[look.name] ?? time.sec)}）`}</p>}
          <p className="boss-maxhit">{newRecord > 0 ? `💥 最大ダメージ記録を更新！ ${newRecord}` : `💥 最大ダメージ記録 ${loadMaxHit()}`}</p>
          {drop && (
            <p className="boss-drop">
              🎁 ボスが {BATTLE_ITEMS.find((it) => it.id === drop)!.icon} {BATTLE_ITEMS.find((it) => it.id === drop)!.name} をおとした！
            </p>
          )}
          <p className="boss-taunt boss-defeat">
            「{defeatLineOf(look.name).en}」<span>{defeatLineOf(look.name).ja}</span>
          </p>
          <p className={`battle-rank rank-${battleRank(hearts, crits)}`} aria-label={`ランク ${battleRank(hearts, crits)}`}>
            {battleRank(hearts, crits)}
          </p>
          <p className="stats-note">
            のこりハート {hearts}・会心 {crits}回{battleRank(hearts, crits) === 'S' ? `　Sランクボーナス 🪙${RANK_S_COINS}！` : '　（ハートを減らさず会心3回でSランク）'}
          </p>
          <p className="result-message">ボーナス +{bonus}XP</p>
          <MissedList words={missed} />
          <button className="flip" onClick={onExit}>
            {winLabel}
          </button>
        </>
      ) : lost && picked === null ? (
        <>
          <p className="boss-result">まけてしまった…</p>
          <p className="result-message">苦手な単語を復習して、もう一度挑戦しよう！</p>
          {onSpend && !continued && hearts <= 0 && index < qs.length && (
            <button
              className="boss-btn continue-btn"
              onClick={() => {
                if (!onSpend(CONTINUE_COST)) return
                setHearts(HEARTS)
                setContinued(true)
              }}
            >
              🔥 コンティニュー（🪙{CONTINUE_COST}でハート全回復して続きから）
            </button>
          )}
          <MissedList words={missed} />
          <button className="flip" onClick={retry}>
            もう一度挑戦
          </button>
        </>
      ) : (
        <>
          <p className="en">{q.word.en}</p>
          <div className="choices">
            {q.choices.map((c, i) => {
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
              <p className="feedback">
                {picked === q.answer ? `${damage(combo)} ダメージ！` : `正解は「${q.choices[q.answer]}」`}
              </p>
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
