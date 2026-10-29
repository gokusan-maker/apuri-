// 大学入試のレベル（共通テスト〜国立医学部）：難関大の長文をレベル別にしぼりこむ
import { ADV_PASSAGES } from './advreading'
import type { LongPassage } from './longreading'

export type ExamTier = 'all' | 'kyotsu' | 'shiritsu' | 'shiritsu-med' | 'kokkoritsu' | 'kyutei' | 'kokuritsu-med'
export const EXAM_TIERS: { id: ExamTier; label: string }[] = [
  { id: 'all', label: 'すべて' },
  { id: 'kyotsu', label: '共通テスト' },
  { id: 'shiritsu', label: '私立難関大' },
  { id: 'shiritsu-med', label: '私立医学部' },
  { id: 'kokkoritsu', label: '国公立大' },
  { id: 'kyutei', label: '旧帝大' },
  { id: 'kokuritsu-med', label: '国立医学部' },
]

// 長文ごとの入試レベル（話題と長さで分ける。医学部は医療・脳・からだの話題）
const TIER_OF: Record<string, Exclude<ExamTier, 'all'>> = {
  // 共通テスト：お知らせ・メールなどの実用文と、短めの評論
  'adv-notice-elevator': 'kyotsu', 'adv-notice-volunteers': 'kyotsu', 'adv-notice-library': 'kyotsu', 'adv-biz-meeting-email': 'kyotsu', 'adv-biz-delay-email': 'kyotsu', 'adv-biz-launch-invite': 'kyotsu',
  'adv-advertising': 'kyotsu', 'adv-left-handed': 'shiritsu', 'adv-deja-vu': 'shiritsu', 'adv-sleepwalking': 'shiritsu', 'adv-mosquito': 'shiritsu', 'adv-qr-code': 'shiritsu', 'adv-escalator': 'shiritsu', 'adv-spicy': 'shiritsu', 'adv-bike-sharing': 'shiritsu', 'adv-loanwords': 'shiritsu', 'adv-static': 'shiritsu', 'adv-cat-landing': 'shiritsu', 'adv-emoji': 'shiritsu-med', 'adv-gratitude': 'shiritsu-med', 'adv-study-music': 'shiritsu-med', 'adv-reminiscence-bump': 'shiritsu-med', 'adv-loss-aversion': 'shiritsu-med', 'adv-fermentation': 'shiritsu-med', 'adv-myopia': 'shiritsu-med', 'adv-tickle': 'shiritsu-med', 'adv-exercise-brain': 'shiritsu-med', 'adv-daylight-saving': 'kokkoritsu', 'adv-car-free': 'kokkoritsu', 'adv-minimalism': 'kokkoritsu', 'adv-citizen-science': 'kokkoritsu', 'adv-tipping': 'kokkoritsu', 'adv-shifting-baseline': 'kokkoritsu', 'adv-pollinators': 'kokkoritsu', 'adv-decision-fatigue': 'kokkoritsu', 'adv-city-birds': 'kokkoritsu', 'adv-remote-work': 'kokkoritsu', 'adv-counting-tens': 'kokkoritsu', 'adv-overconfidence': 'kyutei', 'adv-bilingual': 'kyutei', 'adv-marshmallow': 'kyutei', 'adv-open-office': 'kyutei', 'adv-automation-paradox': 'kyutei', 'adv-matthew-effect': 'kyutei', 'adv-goodhart': 'kyutei', 'adv-jevons': 'kyutei', 'adv-theseus': 'kyutei', 'adv-dog-domestication': 'kyutei', 'adv-food-waste': 'kyotsu', 'adv-four-day-week': 'kyotsu', 'adv-esports-club': 'kyotsu', 'adv-second-hand': 'kyotsu', 'adv-part-time-job': 'kyotsu', 'adv-phones-class': 'kyotsu', 'adv-library-change': 'kyotsu', 'adv-school-start': 'kyotsu', 'adv-power-nap': 'kyotsu', 'adv-self-driving': 'kyotsu', 'adv-nostalgia': 'kyotsu', 'adv-disagreement': 'kyotsu', 'adv-procrastination': 'kyotsu', 'adv-stories': 'kyotsu', 'adv-fast-fashion': 'kyotsu', 'adv-navigation-apps': 'kyotsu', 'adv-learning-by-teaching': 'kyotsu', 'adv-goosebumps': 'kyotsu', 'adv-vending-machines': 'kyotsu', 'adv-karaoke': 'kyotsu', 'adv-sento': 'kyotsu', 'adv-punctual-trains': 'kyotsu', 'adv-street-piano': 'kyotsu', 'adv-subtitles': 'kyotsu', 'adv-board-games': 'kyotsu', 'adv-repair-cafe': 'kyotsu', 'adv-gap-year': 'kyotsu', 'adv-school-lunch': 'kyotsu', 'adv-library-of-things': 'kyotsu', 'adv-night-trains': 'kyotsu', 'adv-veg-stands': 'kyotsu', 'adv-local-mascots': 'kyotsu', 'adv-ekiben': 'kyotsu', 'adv-yawning': 'kyotsu', 'adv-hiccups': 'kyotsu', 'adv-earworms': 'kyotsu', 'adv-blinking': 'kyotsu', 'adv-sneezing': 'kyotsu', 'adv-brain-freeze': 'kyotsu', 'adv-foot-asleep': 'kyotsu', 'adv-cat-purr': 'kyotsu', 'adv-stomach-growl': 'kyotsu', 'adv-motion-sickness': 'kyotsu', 'adv-onion-tears': 'kyotsu', 'adv-wrinkly-fingers': 'kyotsu', 'adv-blue-sky': 'kyotsu', 'adv-shivering': 'kyotsu', 'adv-gray-hair': 'kyotsu', 'adv-twinkling-stars': 'kyotsu', 'adv-sweat': 'kyotsu', 'adv-bruises': 'kyotsu', 'adv-ice-floats': 'kyotsu', 'adv-autumn-leaves': 'kyotsu', 'adv-round-bubbles': 'kyotsu', 'adv-moon-illusion': 'kyotsu', 'adv-morning-dew': 'kyotsu', 'adv-starfish': 'kyotsu',
  // 私立難関大：行動経済学・心理の評論
  'adv-choice': 'shiritsu', 'adv-false-news': 'shiritsu', 'adv-sunk-cost': 'shiritsu', 'adv-defaults': 'shiritsu', 'adv-anchoring': 'shiritsu', 'adv-decoy': 'shiritsu', 'adv-framing': 'shiritsu', 'adv-endowment': 'shiritsu', 'adv-ikea-effect': 'shiritsu', 'adv-halo-effect': 'shiritsu', 'adv-mere-exposure': 'shiritsu', 'adv-comparison-trap': 'shiritsu', 'adv-spotlight': 'shiritsu', 'adv-planning-fallacy': 'shiritsu',
  // 私立医学部：からだ・健康・学習の科学
  'adv-placebo': 'shiritsu-med', 'adv-fever': 'shiritsu-med', 'adv-immune-memory': 'shiritsu-med', 'adv-blood-types': 'shiritsu-med', 'adv-body-clock': 'shiritsu-med', 'adv-appendix': 'shiritsu-med', 'adv-phantom-limb': 'shiritsu-med', 'adv-multitasking': 'shiritsu-med', 'adv-spacing': 'shiritsu-med', 'adv-testing-effect': 'shiritsu-med', 'adv-walking-ideas': 'shiritsu-med',
  // 国公立大：社会・文化の評論
  'adv-translation': 'kokkoritsu', 'adv-container': 'kokkoritsu', 'adv-qwerty': 'kokkoritsu', 'adv-cashless': 'kokkoritsu', 'adv-kindness': 'kokkoritsu', 'adv-repair': 'kokkoritsu', 'adv-mistakes': 'kokkoritsu', 'adv-zoo': 'kokkoritsu', 'adv-tourism': 'kokkoritsu', 'adv-handwriting': 'kokkoritsu', 'adv-silence': 'kokkoritsu', 'adv-commons': 'kokkoritsu', 'adv-bystander': 'kokkoritsu', 'adv-boredom': 'kokkoritsu',
  // 旧帝大：抽象度の高い評論（ことば・知識・科学のあり方）
  'adv-language-thought': 'kyutei', 'adv-wobbly-bridge': 'kyutei', 'todai-dialects': 'kyutei', 'todai-imitation': 'kyutei', 'todai-tourism': 'kyutei', 'kyodai-ruins': 'kokuritsu-med', 'kyodai-waiting': 'kokuritsu-med', 'kyodai-mending': 'kokuritsu-med', 'kyodai-listening': 'kokuritsu-med', 'kyodai-diary': 'kokuritsu-med', 'kyodai-recipe': 'kokuritsu-med', 'adv-stethoscope': 'kokuritsu-med', 'kyodai-questions': 'kokuritsu-med', 'adv-sleep-memory': 'kokuritsu-med', 'adv-language-loss': 'kyutei', 'adv-new-words': 'kyutei', 'adv-science-doubt': 'kyutei', 'adv-measure-target': 'kyutei', 'adv-crowds': 'kyutei', 'adv-maps': 'kyutei', 'adv-curse-knowledge': 'kyutei', 'adv-railway-time': 'kyutei', 'adv-explanatory-depth': 'kyutei', 'adv-survivorship': 'kyutei', 'adv-hindsight': 'kyutei',
  // 国立医学部：脳と心のしくみ
  'adv-forgetting': 'kokuritsu-med', 'adv-brain-cleaning': 'kokuritsu-med', 'adv-microbiome': 'kokuritsu-med', 'adv-transplant': 'kokuritsu-med', 'adv-handwashing': 'kokuritsu-med', 'adv-attention': 'kokuritsu-med', 'adv-hedonic-adaptation': 'kokuritsu-med', 'adv-curiosity': 'kokuritsu-med', 'adv-learning-styles': 'kokuritsu-med', 'adv-zeigarnik': 'kokuritsu-med', 'adv-peak-end': 'kokuritsu-med', 'adv-boomerang': 'kyotsu', 'adv-stale-bread': 'kyotsu', 'adv-morning-people': 'kyotsu', 'adv-dizzy': 'kyotsu', 'adv-cricket-thermometer': 'kyotsu', 'adv-jellyfish': 'kyotsu', 'adv-paper-cut': 'kyotsu', 'adv-seahorse': 'kyotsu', 'adv-pufferfish': 'kyotsu', 'adv-maple-syrup': 'kyotsu', 'adv-peacock': 'kyotsu', 'adv-tortoise': 'kyotsu', 'adv-eggshell': 'kyotsu', 'adv-hail': 'kyotsu', 'adv-puddles': 'kyotsu', 'adv-parrots': 'kyotsu', 'adv-ostrich': 'kyotsu', 'adv-polar-bear': 'kyotsu', 'adv-giant-panda': 'kyotsu', 'adv-elephant-trunk': 'kyotsu', 'adv-hedgehog': 'kyotsu', 'adv-swans': 'kyotsu', 'adv-frogs-life': 'kyotsu', 'adv-squirrels': 'kyotsu', 'adv-cats-boxes': 'kyotsu', 'adv-lion-pride': 'kyotsu', 'adv-koalas': 'kyotsu', 'adv-pelicans': 'kyotsu', 'adv-honeyguide': 'kyotsu', 'adv-tinyhouse': 'kyotsu', 'adv-seedvault': 'kyotsu', 'adv-crosswalk': 'kyotsu', 'adv-eraser': 'kyotsu', 'adv-paperclip': 'kyotsu', 'adv-kaitenzushi': 'kyotsu', 'adv-sakurafront': 'kyotsu', 'adv-compost': 'kyotsu', 'adv-firstlunch': 'kyotsu', 'adv-instantramen': 'kyotsu', 'adv-windturbine': 'kyotsu', 'adv-spiderweb': 'kyotsu', 'adv-monalisa': 'kyotsu', 'adv-homingpigeon': 'kyotsu', 'adv-hotairballoon': 'kyotsu', 'adv-yoyo': 'kyotsu', 'adv-mushroom': 'kyotsu', 'adv-scarecrow': 'kyotsu', 'adv-toothbrush': 'kyotsu', 'adv-planetarium': 'kyotsu', 'adv-eyeglasses': 'kyotsu', 'adv-bubblewrap': 'kyotsu', 'adv-stickynote': 'kyotsu', 'adv-safetypin': 'kyotsu', 'adv-dodo': 'kyotsu', 'adv-trafficlight': 'kyotsu', 'adv-skyscraper': 'kyotsu', 'adv-ferriswheel': 'kyotsu', 'adv-crossword': 'kyotsu', 'adv-sudoku': 'kyotsu', 'adv-blackboard': 'kyotsu', 'adv-thermometer': 'kyotsu', 'adv-wasabi': 'kyotsu', 'adv-guidedog': 'kyotsu', 'adv-liberty': 'kyotsu', 'adv-ricecooker': 'kyotsu', 'adv-kotatsu': 'kyotsu', 'adv-postoffice': 'kyotsu', 'adv-seatbelt': 'kyotsu', 'adv-airbag': 'kyotsu', 'adv-climbfuji': 'kyotsu', 'adv-seikan': 'kyotsu', 'adv-chochin': 'kyotsu', 'adv-daruma': 'kyotsu', 'adv-ikebana': 'kyotsu', 'adv-spinningtop': 'kyotsu',
}

export const tierOf = (p: LongPassage): Exclude<ExamTier, 'all'> => TIER_OF[p.id] ?? (p.level.startsWith('難関大（評論）') ? 'kokkoritsu' : 'kyotsu')

export function passagesForTier(tier: ExamTier, list: LongPassage[] = ADV_PASSAGES.filter((p) => p.level.startsWith('難関大'))): LongPassage[] {
  return (tier === 'all' ? list : list.filter((p) => tierOf(p) === tier)).map((p) => withTranslation(p, list))
}

// 国公立大・旧帝大・国立医学部（と私立医学部）は、段落の和訳をえらぶ難しい問題もつける
export const HARD_TIERS: ExamTier[] = ['kokkoritsu', 'kyutei', 'kokuritsu-med', 'shiritsu-med']
const seedOf = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 9973, 7)
export function withTranslation(p: LongPassage, pool: LongPassage[] = ADV_PASSAGES): LongPassage {
  if (!HARD_TIERS.includes(tierOf(p)) || p.gist || p.paragraphs.length < 2 || p.ja.length !== p.paragraphs.length) return p
  const others = pool.filter((x) => x.id !== p.id && tierOf(x) === tierOf(p)).flatMap((x) => x.ja)
  const paras = p.paragraphs.length >= 3 ? [1, p.paragraphs.length - 1] : [0, 1]
  const gist = paras.map((para) => {
    const right = p.ja[para]
    const wrong = [...p.ja.filter((_, i) => i !== para), ...others].filter((t, i, a) => t !== right && a.indexOf(t) === i).slice(0, 3)
    const choices = [right, ...wrong]
    const k = (seedOf(p.id) + para) % choices.length
    const order = [...choices.slice(k), ...choices.slice(0, k)]
    return { para, choices: order, answer: order.indexOf(right), why: `第${para + 1}段落の英文を、文ごとに意味をたしかめよう。ほかの選択肢は別の段落・別の文章の和訳。` }
  })
  return { ...p, gist, gistKind: 'transl' }
}

const KEY = 'eitan:exam-tier'
export function loadExamTier(): ExamTier {
  try {
    const v = localStorage.getItem(KEY)
    return EXAM_TIERS.some((t) => t.id === v) ? (v as ExamTier) : 'all'
  } catch {
    return 'all'
  }
}
export function saveExamTier(t: ExamTier): void {
  try {
    localStorage.setItem(KEY, t)
  } catch {
    /* 保存できなくても動く */
  }
}
