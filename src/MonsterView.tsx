import { typeOf } from './chartype'
import type { Daypart } from './daytime'
import { slotOf, wearList } from './shop'
import { playChirp } from './sound'
import { bondHearts, bondLevel, daysToNext } from './bond'
import { useEffect, useId, useState, type CSSProperties, type FormEvent } from 'react'
import { FORM_DESC, FORMS, formOf, kindOf, KINDS, RARITY_LABEL, SPECIES, speciesOf, withKind, withSpecies, levelInfo, levelsToNextStage, growthOf, growthScale, growthText, NAME_MAX, nextFormOf, seenForms, type Form, type MonsterState } from './monster'
import { completionPct } from './gacha'
import { loadPosesSeen, poseAt, savePosesSeen, seePose } from './pose'
import { canRelease, displayOrder, EGG_MILESTONES, MEMBERS_FOR_TICKET, releaseCoins, tradeableMembers, type Party as PartyState } from './party'
import { speak } from './speech'
import { shade } from './color'
import { RoomScene } from './RoomSceneView'
import { challengeOf } from './challenge'
import { IDLE_MS, idleAt } from './idle'
import type { SeasonFx } from './seasonfx'
import { loadPetLog, loadPetStamps, nextPet, PET_BONUS, petReaction, savePetLog, stampPet, type PetReaction } from './pet'
import { dayKey } from './srs'
import { pickLineNow, rememberLine, type Line } from './talk'

type Mood = 'normal' | 'happy' | 'lonely' | 'wink' | 'star' | 'wow' | 'sleep' | 'eat'
// さわったときの表情（順番に変わる）
const REACTIONS: Mood[] = ['happy', 'wink', 'star', 'wow']

type Props = {
  monster: MonsterState
  onRename?: (name: string) => void
  coins?: number
  onShop?: () => void
  room?: string
  title?: string // 称号
  cheer?: Line | null // 外から見せるひとこと（応援）
  feeling?: { icon: string; text: string } // ごきげん
  gain?: { amount: number; key: number } | null // もらったXP（ふわっと浮かぶ）
  mood?: Mood
  leveledUp?: boolean
  night?: boolean // 夜は部屋を暗くして星を出す
  daypart?: Daypart // 時間帯で部屋の背景の色を変える
  friends?: { m: MonsterState; i: number }[] // 相棒以外の仲間（i は仲間の番号）
  onSwitch?: (i: number) => void
  season?: SeasonFx // 季節の背景演出
  onPet?: () => void // なでた（ごきげんメーター）
  epithet?: string | null // 二つ名（ボスをたおした回数で変わる）
  mood100?: { points: number; max: number } // ごきげんメーター
  trioDone?: boolean // 今日の課題を3つクリアした日
  trioStreak?: number // 今日の課題の連続達成日数
  onPetBonus?: () => void // 1日5回なでると「ごきげんMAX」のコイン
  onPetStampTicket?: () => void // なでなでスタンプが10こたまった
  evolved?: boolean
  deco?: string // 季節のイベントの飾り（🎃 など）
  sleepy?: boolean // 夜おそく（💤 を出す）
  learned?: { en: string; ja: string }[] // 覚えた単語（ときどき話題にする）
}

// 相棒は完全オリジナルのモチ型モンスター。段階と系統で色と飾りが変わる。
function Face({ mood }: { mood: Mood }) {
  if (mood === 'lonely') {
    return (
      <g className="monster-face">
        <path d="M31 54 l10 3" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M69 54 l-10 3" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M33 61 q5 -4 10 0" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M57 61 q5 -4 10 0" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M44 75 Q50 70 56 75" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path className="monster-tear" d="M68 64 q3 6 0 9 q-3 -3 0 -9" fill="#60a5fa" />
      </g>
    )
  }
  if (mood === 'eat') {
    return (
      <g className="monster-face face-eat">
        <path d="M31 58 Q38 50 45 58" fill="none" stroke="#1f2937" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M55 58 Q62 50 69 58" fill="none" stroke="#1f2937" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="28" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.6" />
        <ellipse cx="72" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.6" />
        <ellipse className="chew" cx="50" cy="72" rx="6" ry="4" fill="#7f1d1d" stroke="#1f2937" strokeWidth="2" />
      </g>
    )
  }
  if (mood === 'sleep') {
    return (
      <g className="monster-face face-sleep">
        <path d="M31 58 Q38 63 45 58" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M55 58 Q62 63 69 58" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="28" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.35" />
        <ellipse cx="72" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.35" />
        <ellipse cx="50" cy="73" rx="3" ry="2.5" fill="#1f2937" />
        <circle className="snot" cx="57" cy="70" r="3" fill="#bae6fd" stroke="#38bdf8" strokeWidth="1" opacity="0.85" />
      </g>
    )
  }
  if (mood === 'wink' || mood === 'star' || mood === 'wow') {
    const star = 'M0 -7 l2 5 l5.5 0.5 l-4.2 3.6 l1.4 5.4 l-4.7 -3 l-4.7 3 l1.4 -5.4 l-4.2 -3.6 l5.5 -0.5 Z'
    return (
      <g className={`monster-face face-${mood}`}>
        {mood === 'star' ? (
          <g fill="#facc15" stroke="#a16207" strokeWidth="1.2">
            <path transform="translate(38 57)" d={star} />
            <path transform="translate(62 57)" d={star} />
          </g>
        ) : mood === 'wow' ? (
          <g fill="#1f2937">
            <circle cx="38" cy="56" r="5" />
            <circle cx="62" cy="56" r="5" />
            <circle cx="39.5" cy="54.5" r="1.6" fill="#fff" />
            <circle cx="63.5" cy="54.5" r="1.6" fill="#fff" />
          </g>
        ) : (
          <>
            <ellipse cx="38" cy="57" rx="6" ry="7.5" fill="#1f2937" />
            <circle cx="40" cy="54" r="2.4" fill="#fff" />
            <path d="M55 58 Q62 52 69 58" fill="none" stroke="#1f2937" strokeWidth="3.5" strokeLinecap="round" />
          </>
        )}
        <ellipse cx="28" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.55" />
        <ellipse cx="72" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.55" />
        {mood === 'wow' ? (
          <ellipse cx="50" cy="73" rx="4.5" ry="5.5" fill="#7f1d1d" stroke="#1f2937" strokeWidth="2" />
        ) : mood === 'wink' ? (
          <>
            <path d="M43 69 Q50 76 57 69" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M52 72 q3 5 6 1" fill="#fb7185" stroke="#1f2937" strokeWidth="1.5" />
          </>
        ) : (
          <path d="M42 68 Q50 80 58 68 Z" fill="#7f1d1d" stroke="#1f2937" strokeWidth="2" strokeLinejoin="round" />
        )}
      </g>
    )
  }
  return (
    <g className={mood === 'normal' ? 'monster-face glance' : 'monster-face'}>
      {mood === 'happy' ? (
        <>
          <path d="M31 59 Q38 49 45 59" fill="none" stroke="#1f2937" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M55 59 Q62 49 69 59" fill="none" stroke="#1f2937" strokeWidth="3.5" strokeLinecap="round" />
        </>
      ) : (
        <g className="monster-eyes">
          <ellipse cx="38" cy="57" rx="6" ry="7.5" fill="#1f2937" />
          <ellipse cx="62" cy="57" rx="6" ry="7.5" fill="#1f2937" />
          <circle cx="40" cy="54" r="2.4" fill="#fff" />
          <circle cx="64" cy="54" r="2.4" fill="#fff" />
          <circle cx="36" cy="60" r="1.1" fill="#fff" opacity="0.8" />
          <circle cx="60" cy="60" r="1.1" fill="#fff" opacity="0.8" />
        </g>
      )}
      <ellipse cx="28" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.45" />
      <ellipse cx="72" cy="68" rx="6" ry="4" fill="#fb7185" opacity="0.45" />
      {mood === 'happy' ? (
        <>
          <path d="M42 68 Q50 80 58 68 Z" fill="#7f1d1d" stroke="#1f2937" strokeWidth="2" strokeLinejoin="round" />
          <path d="M45.5 72.5 Q50 77 54.5 72.5 Q50 70.5 45.5 72.5 Z" fill="#fb7185" />
        </>
      ) : (
        <path d="M44 70 Q47 73 50 70 Q53 73 56 70" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
      )}
    </g>
  )
}

// 系統ごとの頭の飾り。段階が上がるほど立派になる
function Crest({ form, line }: { form: Form; line: string }) {
  const st = form.stage
  if (form.branch === 'card') {
    const leaves = st >= 5 ? [-40, -15, 15, 40] : st >= 4 ? [-28, 0, 28] : [-14, 14]
    return (
      <g>
        {leaves.map((r) => (
          <path key={r} transform={`rotate(${r} 50 28)`} d="M50 28 Q38 10 50 0 Q62 10 50 28 Z" fill="#22c55e" stroke="#14532d" strokeWidth="2" />
        ))}
        {leaves.map((r) => (
          <path key={`v${r}`} transform={`rotate(${r} 50 28)`} d="M50 26 L50 6" stroke="#14532d" strokeWidth="1.2" opacity="0.6" />
        ))}
        {st >= 6 && [30, 50, 70].map((x) => <circle key={x} cx={x} cy={x === 50 ? 4 : 12} r="3.5" fill="#f472b6" stroke="#9d174d" strokeWidth="1" />)}
      </g>
    )
  }
  if (form.branch === 'quiz') {
    const bolt = 'M0 0 L-8 14 L-2 14 L-6 26 L8 8 L2 8 Z'
    return (
      <g fill="#facc15" stroke="#a16207" strokeWidth="2" strokeLinejoin="round">
        <path transform="translate(54 2)" d={bolt} />
        {st >= 4 && <path transform="translate(30 12) scale(0.7)" d={bolt} />}
        {st >= 4 && <path transform="translate(74 12) scale(0.7)" d={bolt} />}
        {st >= 5 && (
          <g className="sparks" stroke="#fde047" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M8 50 l6 4 l-4 4 l6 4" />
            <path d="M92 50 l-6 4 l4 4 l-6 4" />
          </g>
        )}
      </g>
    )
  }
  if (form.branch === 'ear') {
    return <path d="M40 30 Q44 12 50 22 Q56 12 60 30" fill={shade(form.color, 0.3)} stroke={line} strokeWidth="2.5" />
  }
  if (st >= 2) return <path d="M50 27 Q46 14 52 10 Q50 18 56 20 Q52 22 50 27 Z" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
  return null
}

// 系統ごとにまわりをただようもの（Lv15〜）。葉っぱ・音符・火花
function Particles({ form }: { form: Form }) {
  const spots = form.stage >= 5 ? [[10, 40], [88, 34], [14, 84], [90, 80]] : [[12, 44], [88, 38]]
  return (
    <g className="particles">
      {spots.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} style={{ animationDelay: `${i * 0.6}s` }}>
          {form.branch === 'card' ? (
            <path d="M0 0 Q-5 -6 0 -10 Q5 -6 0 0 Z" fill="#4ade80" stroke="#15803d" strokeWidth="1" />
          ) : form.branch === 'ear' ? (
            <text fontSize="10" fill="#0369a1" textAnchor="middle">
              {i % 2 ? '♪' : '♫'}
            </text>
          ) : (
            <path d="M0 -6 l1.6 4.4 l4.4 1.6 l-4.4 1.6 l-1.6 4.4 l-1.6 -4.4 l-4.4 -1.6 l4.4 -1.6 Z" fill="#facc15" />
          )}
        </g>
      ))}
    </g>
  )
}

// 系統ごとの体の模様としっぽ（Lv15〜）。段階が上がると模様がふえる
function Tail({ form, fill, line }: { form: Form; fill: string; line: string }) {
  if (form.branch === 'card') return <path d="M78 80 Q96 78 94 62 Q86 70 80 70 Z" fill="#22c55e" stroke="#14532d" strokeWidth="2.5" strokeLinejoin="round" />
  if (form.branch === 'quiz') return <path d="M78 80 L92 76 L86 70 L98 62 L84 64 L88 56 L76 70 Z" fill="#facc15" stroke="#a16207" strokeWidth="2.5" strokeLinejoin="round" />
  return <path d="M78 82 Q98 84 96 70 Q92 74 86 72 Q92 66 88 62 Q84 72 78 72 Z" fill={fill} stroke={line} strokeWidth="2.5" strokeLinejoin="round" />
}

function Markings({ form, line }: { form: Form; line: string }) {
  const st = form.stage
  if (form.branch === 'card') {
    return (
      <g fill="none" stroke={line} strokeWidth="1.6" opacity="0.45" strokeLinecap="round">
        <path d="M22 62 q4 -3 8 0 M24 70 q4 -3 8 0" />
        <path d="M78 62 q-4 -3 -8 0 M76 70 q-4 -3 -8 0" />
        {st >= 5 && <path d="M50 84 Q44 80 46 74 Q50 78 50 84 Q56 80 54 74 Q50 78 50 84" fill="#86efac" />}
      </g>
    )
  }
  if (form.branch === 'quiz') {
    return (
      <g fill={line} opacity="0.35">
        <path d="M20 58 L30 62 L22 66 Z M80 58 L70 62 L78 66 Z" />
        {st >= 4 && <path d="M21 72 L30 75 L23 79 Z M79 72 L70 75 L77 79 Z" />}
        {st >= 5 && <path d="M44 32 L50 40 L56 32 Z" />}
      </g>
    )
  }
  return (
    <g fill="#fff" opacity="0.7">
      <path d="M40 82 q3 -6 5 0 q3 -6 5 0 q3 -6 5 0 q3 -6 5 0 Q50 90 40 82 Z" />
      {st >= 5 && <path d="M30 40 q2 -4 4 0 q2 -4 4 0 Z M62 40 q2 -4 4 0 q2 -4 4 0 Z" />}
    </g>
  )
}

// キャラクターの種類ごとのパーツ（ドラゴン・キツネ・ペンギン）
const SPECIES_TAILS = ['fox', 'dragon', 'rabbit', 'cat', 'owl', 'turtle', 'hamster', 'sheep', 'squirrel', 'panda', 'lion', 'elephant']
function SpeciesTail({ species, fill, line }: { species: string; fill: string; line: string }) {
  if (species === 'owl')
    return (
      <g fill={fill} stroke={line} strokeWidth="2.2" strokeLinejoin="round">
        <path d="M74 80 L96 74 L90 82 Z" />
        <path d="M74 84 L98 84 L90 90 Z" />
      </g>
    )
  if (species === 'turtle') return <path d="M78 84 Q90 86 94 80 Q88 78 78 78 Z" fill={fill} stroke={line} strokeWidth="2.2" strokeLinejoin="round" />
  if (species === 'rabbit') return <circle cx="82" cy="80" r="7" fill="#fff" stroke={line} strokeWidth="2" />
  if (species === 'hamster') return <circle cx="80" cy="82" r="4" fill={fill} stroke={line} strokeWidth="2" />
  if (species === 'sheep') return <circle cx="82" cy="80" r="6" fill="#fff" stroke={line} strokeWidth="2" />
  if (species === 'panda') return <circle cx="80" cy="84" r="4" fill="#1f2937" />
  if (species === 'elephant') return <path d="M78 82 Q88 84 88 92" fill="none" stroke={line} strokeWidth="2.5" strokeLinecap="round" />
  if (species === 'lion')
    return (
      <g stroke={line} strokeWidth="2.5" strokeLinecap="round">
        {/* 先にふさのついた、ながいしっぽ */}
        <path d="M76 82 Q96 84 94 66" fill="none" />
        <circle cx="94" cy="62" r="5" fill="#b45309" />
      </g>
    )
  if (species === 'squirrel')
    return (
      <g stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        {/* 大きくまきあがった、ふさふさのしっぽ */}
        <path d="M74 84 Q104 84 100 50 Q96 28 80 34 Q92 46 86 62 Q82 72 74 74 Z" fill={fill} />
        <path d="M90 44 Q96 52 92 62" fill="none" stroke="#fff7ed" strokeWidth="2" opacity="0.8" />
      </g>
    )
  if (species === 'cat')
    return (
      <g stroke={line} strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M78 80 Q96 80 92 62 Q90 54 96 50" strokeWidth="6" stroke={line} />
        <path d="M78 80 Q96 80 92 62 Q90 54 96 50" strokeWidth="3" stroke={fill} />
      </g>
    )
  if (species === 'fox')
    return (
      <g stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        <path d="M76 82 Q100 80 96 54 Q90 40 84 50 Q90 64 76 72 Z" fill={fill} />
        <path d="M96 54 Q90 40 84 50 Q88 52 92 58 Z" fill="#fff" strokeWidth="1.5" />
      </g>
    )
  return <path d="M76 80 Q92 84 96 72 L100 66 L92 68 L94 60 L86 66 Q84 74 76 72 Z" fill={fill} stroke={line} strokeWidth="2.5" strokeLinejoin="round" />
}

function DragonWings({ fill, line }: { fill: string; line: string }) {
  const wing = 'M0 0 L-14 -20 L-10 -12 L-20 -14 L-12 -6 L-20 -2 Z'
  return (
    <g className="wings" fill={fill} stroke={line} strokeWidth="2" strokeLinejoin="round">
      <path transform="translate(24 52)" d={wing} />
      <path transform="translate(76 52) scale(-1 1)" d={wing} />
    </g>
  )
}

// 体のうしろに出るパーツ：カメのこうら、タコの頭
function SpeciesBack({ species, fill, line, hidden }: { species: string; fill: string; line: string; hidden: boolean }) {
  if (species === 'turtle')
    return (
      <g stroke={hidden ? line : '#713f12'} strokeWidth="3" strokeLinejoin="round">
        <path d="M8 78 Q6 22 50 16 Q94 22 92 78 Q50 70 8 78 Z" fill={hidden ? fill : '#a16207'} />
        {!hidden && (
          <g fill="#ca8a04" stroke="#713f12" strokeWidth="2">
            <path d="M42 22 L58 22 L62 30 L58 36 L42 36 L38 30 Z" />
            <path d="M18 44 L28 36 L34 44 L30 54 L18 54 Z" />
            <path d="M82 44 L72 36 L66 44 L70 54 L82 54 Z" />
            <path d="M10 64 L18 58 L20 70 Z M90 64 L82 58 L80 70 Z" />
          </g>
        )}
      </g>
    )
  if (species === 'octopus') return <path d="M22 56 Q16 8 50 6 Q84 8 78 56 Z" fill={fill} stroke={line} strokeWidth="3" strokeLinejoin="round" />
  if (species === 'lion')
    return (
      // 頭のまわりの、ぎざぎざのたてがみ
      <path d="M50 2 L58 12 L70 6 L72 18 L86 18 L82 30 L94 38 L84 46 L92 58 L78 60 L80 74 L66 70 L60 82 L50 72 L40 82 L34 70 L20 74 L22 60 L8 58 L16 46 L6 38 L18 30 L14 18 L28 18 L30 6 L42 12 Z" fill={hidden ? fill : '#b45309'} stroke={line} strokeWidth="2.5" strokeLinejoin="round" />
    )
  return null
}

// タコの足（足のかわりに、くねくねの足が5本）
function OctopusLegs({ fill, line, hidden }: { fill: string; line: string; hidden: boolean }) {
  const legs = ['M24 80 Q14 92 6 88', 'M34 86 Q30 98 20 98', 'M50 88 Q50 98 44 100', 'M66 86 Q70 98 80 98', 'M76 80 Q86 92 94 88']
  return (
    <g fill="none" strokeLinecap="round">
      {legs.map((d) => (
        <path key={d} d={d} stroke={line} strokeWidth="11" />
      ))}
      {legs.map((d) => (
        <path key={`f${d}`} d={d} stroke={fill} strokeWidth="6" />
      ))}
      {!hidden && (
        <g fill="#fff" opacity="0.8">
          <circle cx="12" cy="90" r="1.6" />
          <circle cx="26" cy="97" r="1.6" />
          <circle cx="74" cy="97" r="1.6" />
          <circle cx="88" cy="90" r="1.6" />
        </g>
      )}
    </g>
  )
}

// 頭のパーツ（角・耳）
function SpeciesHead({ species, fill, line, big = false }: { species: string; fill: string; line: string; big?: boolean }) {
  if (species === 'dragon')
    return (
      <g fill="#fde68a" stroke="#92400e" strokeWidth="2" strokeLinejoin="round" transform={big ? 'translate(50 34) scale(1.35) translate(-50 -34)' : undefined}>
        <path d="M34 34 Q26 22 30 12 Q34 24 40 30 Z" />
        <path d="M66 34 Q74 22 70 12 Q66 24 60 30 Z" />
      </g>
    )
  if (species === 'rabbit')
    return (
      <g stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        <path d="M34 32 Q26 0 36 -2 Q46 0 44 30 Z" fill={fill} />
        <path d="M66 32 Q74 0 64 -2 Q54 0 56 30 Z" fill={fill} />
        <path d="M36 26 Q32 6 37 4 Q41 6 41 26 Z M64 26 Q68 6 63 4 Q59 6 59 26 Z" fill="#f9a8d4" stroke="none" />
      </g>
    )
  if (species === 'cat')
    return (
      <g stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        <path d="M26 40 L28 18 L44 30 Z" fill={fill} />
        <path d="M74 40 L72 18 L56 30 Z" fill={fill} />
        <path d="M30 34 L31 24 L38 30 Z M70 34 L69 24 L62 30 Z" fill="#f9a8d4" stroke="none" />
        <path d="M36 44 l4 -6 M50 42 l0 -7 M64 44 l-4 -6" stroke={line} strokeWidth="2" opacity="0.5" />
      </g>
    )
  if (species === 'hedgehog')
    return (
      <g fill={fill} stroke={line} strokeWidth="2" strokeLinejoin="round">
        {/* 頭のうしろのトゲトゲ */}
        <path d="M18 44 L10 30 L24 34 L22 18 L36 26 L42 10 L50 24 L58 10 L64 26 L78 18 L76 34 L90 30 L82 44 Z" />
      </g>
    )
  if (species === 'swan')
    return (
      <g>
        {/* オレンジのくちばしと、つけねの黒いもよう */}
        <path d="M44 64 L56 64 L50 76 Z" fill="#fb923c" stroke="#9a3412" strokeWidth="1.5" strokeLinejoin="round" />
        <ellipse cx="50" cy="63" rx="7" ry="3" fill="#1f2937" />
      </g>
    )
  if (species === 'ostrich')
    return (
      <g>
        {/* 平たい黄色のくちばし */}
        <ellipse cx="50" cy="69" rx="10" ry="4.5" fill="#fbbf24" stroke="#92400e" strokeWidth="1.5" />
      </g>
    )
  if (species === 'kangaroo')
    return (
      <g>
        {/* おなかのふくろ */}
        <path d="M38 74 Q50 88 62 74" fill="#f5d0a9" stroke="#7c4a1e" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'meerkat')
    return (
      <g>
        {/* 目のまわりの黒いもよう */}
        <ellipse cx="40" cy="50" rx="6" ry="5" fill="none" stroke="#3f2a14" strokeWidth="3" />
        <ellipse cx="60" cy="50" rx="6" ry="5" fill="none" stroke="#3f2a14" strokeWidth="3" />
      </g>
    )
  if (species === 'redpanda')
    return (
      <g>
        {/* 目の下の白いもよう */}
        <path d="M33 56 Q38 64 44 58" fill="none" stroke="#fff7ed" strokeWidth="3" strokeLinecap="round" />
        <path d="M67 56 Q62 64 56 58" fill="none" stroke="#fff7ed" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'lemur')
    return (
      <g>
        {/* 目のまわりの黒いもようと、白い顔 */}
        <path d="M30 42 L44 52 L32 58 Z" fill="#27272a" />
        <path d="M70 42 L56 52 L68 58 Z" fill="#27272a" />
      </g>
    )
  if (species === 'axolotl')
    return (
      <g>
        {/* 頭の左右のふさふさのえら */}
        <path d="M24 40 L14 34 M24 46 L12 46 M24 52 L14 58" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
        <path d="M76 40 L86 34 M76 46 L88 46 M76 52 L86 58" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'narwhal')
    return (
      <g>
        {/* おでこからまっすぐのびる、らせんもようのきば */}
        <path d="M50 26 L56 2 L52 26 Z" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M51 20 L54 18 M52 14 L55 12 M53 8 L55 7" stroke="#94a3b8" strokeWidth="1" />
      </g>
    )
  if (species === 'pangolin')
    return (
      <g>
        {/* 頭から背中にならぶうろこ */}
        <path d="M34 30 Q38 24 42 30 M44 26 Q48 20 52 26 M54 26 Q58 20 62 26 M60 30 Q64 24 68 30" fill="none" stroke="#5c3d1e" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'capybara')
    return (
      <g>
        {/* 頭の上のみかんと、ゆけむり */}
        <circle cx="50" cy="20" r="6" fill="#fb923c" stroke="#9a3412" strokeWidth="1.5" />
        <path d="M50 14 L52 11" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'tapir')
    return (
      <g>
        {/* 少し長いはな */}
        <path d="M44 66 Q50 80 56 66" fill="#cbd5e1" stroke="#1e293b" strokeWidth="1.5" />
      </g>
    )
  if (species === 'okapi')
    return (
      <g>
        {/* 足もとの白いしまもよう */}
        <path d="M36 84 L44 84 M36 88 L44 88 M56 84 L64 84 M56 88 L64 88" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'quokka')
    return (
      <g>
        {/* にっこり上がった口もと */}
        <path d="M42 66 Q50 74 58 66" fill="none" stroke="#5a3a22" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'snowleopard')
    return (
      <g>
        {/* 体の黒いはん点もよう */}
        <circle cx="34" cy="44" r="3" fill="none" stroke="#475569" strokeWidth="1.8" />
        <circle cx="66" cy="44" r="3" fill="none" stroke="#475569" strokeWidth="1.8" />
        <circle cx="50" cy="34" r="2.5" fill="none" stroke="#475569" strokeWidth="1.8" />
      </g>
    )
  if (species === 'armadillo')
    return (
      <g>
        {/* 背中の帯もよう */}
        <path d="M30 38 Q50 30 70 38 M28 46 Q50 38 72 46" fill="none" stroke="#44403c" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'toucan')
    return (
      <g>
        {/* 大きなオレンジのくちばし */}
        <path d="M42 60 Q62 56 76 66 Q62 72 42 68 Z" fill="#fb923c" stroke="#9a3412" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M70 64 Q74 66 76 66" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'fennec')
    return (
      <g>
        {/* とても大きな三角の耳 */}
        <path d="M26 30 L18 2 L40 22 Z" fill="#fde68a" stroke="#92400e" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M74 30 L82 2 L60 22 Z" fill="#fde68a" stroke="#92400e" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    )
  if (species === 'manatee')
    return (
      <g>
        {/* 口のまわりのひげ */}
        <path d="M38 66 L30 64 M38 70 L30 72 M62 66 L70 64 M62 70 L70 72" stroke="#3f4a55" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'firefly')
    return (
      <g>
        {/* 光るおしりと、2本のしょっかく */}
        <circle cx="50" cy="88" r="7" fill="#fde047" opacity="0.9" />
        <path d="M44 22 Q38 10 32 8 M56 22 Q62 10 68 8" fill="none" stroke="#3f6212" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'puffin')
    return (
      <g>
        {/* 三角の大きなしまもようのくちばし */}
        <path d="M42 60 L62 66 L42 72 Z" fill="#f97316" stroke="#9a3412" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M48 62 L48 70" stroke="#facc15" strokeWidth="2" />
      </g>
    )
  if (species === 'kiwi')
    return (
      <g>
        {/* 細長くて少し下を向いたくちばし */}
        <path d="M48 62 Q62 70 74 84 L70 86 Q58 74 46 68 Z" fill="#e7cfa0" stroke="#713f12" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    )
  if (species === 'starfish')
    return (
      <g>
        {/* 体の小さなつぶつぶもよう */}
        <circle cx="40" cy="48" r="2" fill="#fecdd3" />
        <circle cx="60" cy="48" r="2" fill="#fecdd3" />
        <circle cx="50" cy="40" r="2" fill="#fecdd3" />
        <circle cx="44" cy="58" r="2" fill="#fecdd3" />
        <circle cx="56" cy="58" r="2" fill="#fecdd3" />
      </g>
    )
  if (species === 'butterfly')
    return (
      <g>
        {/* 左右の大きな羽 */}
        <path d="M30 44 Q8 30 12 56 Q20 66 34 58 Z" fill="#ddd6fe" stroke="#5b21b6" strokeWidth="1.5" />
        <path d="M70 44 Q92 30 88 56 Q80 66 66 58 Z" fill="#ddd6fe" stroke="#5b21b6" strokeWidth="1.5" />
      </g>
    )
  if (species === 'tanuki')
    return (
      <g>
        {/* 目のまわりの黒いもよう */}
        <ellipse cx="38" cy="52" rx="8" ry="6" fill="#3f2d1d" opacity="0.75" />
        <ellipse cx="62" cy="52" rx="8" ry="6" fill="#3f2d1d" opacity="0.75" />
      </g>
    )
  if (species === 'yak')
    return (
      <g>
        {/* 左右にのびる角と、ひたいの長い毛 */}
        <path d="M28 30 Q16 26 18 14 M72 30 Q84 26 82 14" fill="none" stroke="#e7e5e4" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 30 Q50 40 60 30" fill="#4a3628" stroke="#2a1d14" strokeWidth="1.5" />
      </g>
    )
  if (species === 'gecko')
    return (
      <g>
        {/* 大きな丸い目のまわりのふち */}
        <circle cx="38" cy="48" r="9" fill="none" stroke="#166534" strokeWidth="2" />
        <circle cx="62" cy="48" r="9" fill="none" stroke="#166534" strokeWidth="2" />
      </g>
    )
  if (species === 'zebra')
    return (
      <g>
        {/* 頭のしまもよう */}
        <path d="M40 22 L44 34 M50 20 L50 33 M60 22 L56 34" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'kingfisher')
    return (
      <g>
        {/* 長いくちばし */}
        <path d="M46 58 L54 58 L50 70 Z" fill="#f97316" stroke="#0c4a6e" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    )
  if (species === 'beetle')
    return (
      <g>
        {/* 頭の大きなつの */}
        <path d="M50 30 L50 14 M50 18 L42 10 M50 18 L58 10" stroke="#422006" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'eagle')
    return (
      <g>
        {/* まがったくちばし */}
        <path d="M44 56 Q50 52 56 56 Q54 64 50 66 Q48 62 44 56 Z" fill="#facc15" stroke="#44403c" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    )
  if (species === 'ladybug')
    return (
      <g>
        {/* せなかの黒い星もよう */}
        <circle cx="36" cy="70" r="4" fill="#1c1917" />
        <circle cx="64" cy="70" r="4" fill="#1c1917" />
      </g>
    )
  if (species === 'hermitcrab')
    return (
      <g>
        {/* 背中のうずまき貝がら */}
        <path d="M70 62 a10 10 0 1 1 -2 -8 a6 6 0 1 0 -4 6" fill="none" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'walrus')
    return (
      <g>
        {/* 下にのびる2本のきば */}
        <path d="M44 62 L42 76 M56 62 L58 76" stroke="#fefce8" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'manta')
    return (
      <g>
        {/* 左右に広がる大きなひれ */}
        <path d="M22 60 Q12 54 8 64 M78 60 Q88 54 92 64" fill="none" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'koi')
    return (
      <g>
        {/* 口もとのひげ */}
        <path d="M44 62 Q38 66 34 64 M56 62 Q62 66 66 64" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'platypus')
    return (
      <g>
        {/* 平たいくちばし */}
        <ellipse cx="50" cy="62" rx="10" ry="4" fill="#4c1d95" opacity="0.8" />
      </g>
    )
  if (species === 'bison')
    return (
      <g>
        {/* 頭の短いつの */}
        <path d="M30 34 Q24 28 28 22 M70 34 Q76 28 72 22" fill="none" stroke="#e7e5e4" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'molecricket')
    return (
      <g>
        {/* 土をほる大きな前足 */}
        <path d="M24 70 L16 74 M24 74 L16 80 M76 70 L84 74 M76 74 L84 80" stroke="#44403c" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'clione')
    return (
      <g>
        {/* 小さなはねのようなひれ */}
        <path d="M26 56 Q18 50 22 44 M74 56 Q82 50 78 44" fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'pika')
    return (
      <g>
        {/* 丸い小さな耳 */}
        <circle cx="36" cy="24" r="6" fill="#d6d3d1" stroke="#57534e" strokeWidth="2" />
        <circle cx="64" cy="24" r="6" fill="#d6d3d1" stroke="#57534e" strokeWidth="2" />
      </g>
    )
  if (species === 'hornbill')
    return (
      <g>
        {/* くちばしの上のかぶと */}
        <path d="M42 50 Q50 40 60 48" fill="#f97316" stroke="#3f3f46" strokeWidth="2" strokeLinejoin="round" />
      </g>
    )
  if (species === 'tarsier')
    return (
      <g>
        {/* とても大きな目 */}
        <circle cx="38" cy="46" r="11" fill="none" stroke="#5c3d1e" strokeWidth="2" />
        <circle cx="62" cy="46" r="11" fill="none" stroke="#5c3d1e" strokeWidth="2" />
      </g>
    )
  if (species === 'mandarinduck')
    return (
      <g>
        {/* 頭のかざり羽 */}
        <path d="M50 22 Q60 14 68 22 Q60 20 50 26 Z" fill="#fb923c" stroke="#7c2d12" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    )
  if (species === 'stagbeetle')
    return (
      <g>
        {/* 頭の大きなあご */}
        <path d="M40 28 Q34 16 42 12 M60 28 Q66 16 58 12" fill="none" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'flyingsquirrel')
    return (
      <g>
        {/* 広げた皮のまく */}
        <path d="M24 62 Q14 70 22 80 M76 62 Q86 70 78 80" fill="none" stroke="#44403c" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'phoenix')
    return (
      <g>
        {/* 頭の炎のかざり羽 */}
        <path d="M44 26 Q46 12 50 20 Q54 8 56 26" fill="#fb923c" stroke="#7c2d12" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    )
  if (species === 'reindeer')
    return (
      <g>
        {/* 枝わかれしたつの */}
        <path d="M38 28 L32 14 M34 20 L26 18 M62 28 L68 14 M66 20 L74 18" stroke="#422006" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'coati')
    return (
      <g>
        {/* 長くのびた鼻 */}
        <path d="M50 56 L50 70" stroke="#451a03" strokeWidth="5" strokeLinecap="round" />
      </g>
    )
  if (species === 'fireflysquid')
    return (
      <g>
        {/* 体の光る点 */}
        <circle cx="34" cy="68" r="2.5" fill="#60a5fa" />
        <circle cx="50" cy="74" r="2.5" fill="#60a5fa" />
        <circle cx="66" cy="68" r="2.5" fill="#60a5fa" />
      </g>
    )
  if (species === 'shoebill')
    return (
      <g>
        {/* 大きなくちばし */}
        <path d="M44 58 Q50 72 56 58 Z" fill="#a8a29e" stroke="#57534e" strokeWidth="1.5" />
      </g>
    )
  if (species === 'chinchilla')
    return (
      <g>
        {/* 大きな丸い耳 */}
        <circle cx="30" cy="30" r="9" fill="#d1d5db" stroke="#4b5563" strokeWidth="1.5" />
        <circle cx="70" cy="30" r="9" fill="#d1d5db" stroke="#4b5563" strokeWidth="1.5" />
      </g>
    )
  if (species === 'anteater')
    return (
      <g>
        {/* 長い鼻 */}
        <path d="M50 60 Q62 66 74 74" fill="none" stroke="#57442d" strokeWidth="5" strokeLinecap="round" />
      </g>
    )
  if (species === 'pufferfish')
    return (
      <g>
        {/* 体のとげ */}
        <path d="M24 50 l-6 -2 M76 50 l6 -2 M50 22 l0 -6 M30 32 l-4 -4 M70 32 l4 -4" stroke="#92400e" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'cheetah')
    return (
      <g>
        {/* 体の黒いもよう */}
        <circle cx="36" cy="64" r="2.5" fill="#78350f" />
        <circle cx="64" cy="64" r="2.5" fill="#78350f" />
        <circle cx="50" cy="72" r="2.5" fill="#78350f" />
      </g>
    )
  if (species === 'lynx')
    return (
      <g>
        {/* 耳の先の黒い毛 */}
        <path d="M30 22 l-2 -8 M70 22 l2 -8" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'mantis')
    return (
      <g>
        {/* 大きなかま */}
        <path d="M30 62 q-8 -10 -2 -18 M70 62 q8 -10 2 -18" fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'sunfish')
    return (
      <g>
        {/* 上と下の大きなひれ */}
        <path d="M50 24 l6 -12 l4 14 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <path d="M50 84 l6 12 l4 -14 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
      </g>
    )
  if (species === 'flyingfish')
    return (
      <g>
        {/* 大きなむなびれ */}
        <path d="M30 56 l-16 -10 l6 16 Z" fill="#bae6fd" stroke="#0c4a6e" strokeWidth="1.5" />
        <path d="M70 56 l16 -10 l-6 16 Z" fill="#bae6fd" stroke="#0c4a6e" strokeWidth="1.5" />
      </g>
    )
  if (species === 'crane')
    return (
      <g>
        {/* 頭の赤いところ */}
        <circle cx="50" cy="22" r="5" fill="#dc2626" />
      </g>
    )
  if (species === 'beluga')
    return (
      <g>
        {/* 丸いおでこ */}
        <ellipse cx="50" cy="30" rx="14" ry="8" fill="#ffffff" stroke="#475569" strokeWidth="1.5" />
      </g>
    )
  if (species === 'skunk')
    return (
      <g>
        {/* 背中の白いしま */}
        <path d="M50 26 L50 56" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      </g>
    )
  if (species === 'wombat')
    return (
      <g>
        {/* 丸い鼻 */}
        <ellipse cx="50" cy="56" rx="7" ry="5" fill="#3f2d20" />
      </g>
    )
  if (species === 'nautilus')
    return (
      <g>
        {/* からのうずまき */}
        <path d="M50 50 m-10 0 a10 10 0 1 1 20 0 a6 6 0 1 1 -12 0 a3 3 0 1 1 6 0" fill="none" stroke="#7c2d12" strokeWidth="2" />
      </g>
    )
  if (species === 'treefrog')
    return (
      <g>
        {/* 指の丸い吸盤 */}
        <circle cx="30" cy="84" r="3" fill="#bbf7d0" stroke="#14532d" strokeWidth="1" />
        <circle cx="70" cy="84" r="3" fill="#bbf7d0" stroke="#14532d" strokeWidth="1" />
      </g>
    )
  if (species === 'macaque')
    return (
      <g>
        {/* 赤い顔 */}
        <ellipse cx="50" cy="48" rx="14" ry="11" fill="#f9a8d4" />
      </g>
    )
  if (species === 'sparrow')
    return (
      <g>
        {/* ほおの黒いもよう */}
        <circle cx="34" cy="52" r="3" fill="#1f2937" />
        <circle cx="66" cy="52" r="3" fill="#1f2937" />
      </g>
    )
  if (species === 'honeybee')
    return (
      <g>
        {/* 体のしまもよう */}
        <path d="M32 62 L68 62 M34 70 L66 70" stroke="#713f12" strokeWidth="4" strokeLinecap="round" />
      </g>
    )
  if (species === 'seaurchin')
    return (
      <g>
        {/* 体のとげ */}
        <path d="M20 60 l-8 0 M80 60 l8 0 M28 40 l-6 -6 M72 40 l6 -6 M50 30 l0 -8" stroke="#3b0764" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'goldfish')
    return (
      <g>
        {/* ひらひらの尾びれ */}
        <path d="M50 82 q-14 12 -20 4 q8 -2 20 -4 q12 2 20 4 q-6 8 -20 -4 Z" fill="#fdba74" stroke="#9a3412" strokeWidth="1.5" />
      </g>
    )
  if (species === 'salamander')
    return (
      <g>
        {/* 体のまだらもよう */}
        <circle cx="38" cy="66" r="3" fill="#57534e" />
        <circle cx="60" cy="72" r="2.5" fill="#57534e" />
        <circle cx="64" cy="60" r="2" fill="#57534e" />
      </g>
    )
  if (species === 'clownfish')
    return (
      <g>
        {/* 体の白いしま */}
        <path d="M38 40 L38 76 M62 40 L62 76" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
      </g>
    )
  if (species === 'aardvark')
    return (
      <g>
        {/* 長い耳 */}
        <ellipse cx="34" cy="22" rx="5" ry="12" fill="#e7c6a5" stroke="#6b4423" strokeWidth="1.5" />
        <ellipse cx="66" cy="22" rx="5" ry="12" fill="#e7c6a5" stroke="#6b4423" strokeWidth="1.5" />
      </g>
    )
  if (species === 'mudskipper')
    return (
      <g>
        {/* 頭の上の大きな目 */}
        <circle cx="40" cy="26" r="6" fill="#ffffff" stroke="#4d4d26" strokeWidth="1.5" />
        <circle cx="60" cy="26" r="6" fill="#ffffff" stroke="#4d4d26" strokeWidth="1.5" />
      </g>
    )
  if (species === 'gorilla')
    return (
      <g>
        {/* 大きなむね */}
        <ellipse cx="50" cy="66" rx="14" ry="10" fill="#9ca3af" />
      </g>
    )
  if (species === 'sealion')
    return (
      <g>
        {/* 鼻の上のボール */}
        <circle cx="50" cy="12" r="7" fill="#f87171" stroke="#4a3426" strokeWidth="1.5" />
      </g>
    )
  if (species === 'rhino')
    return (
      <g>
        {/* 鼻の上のつの */}
        <path d="M46 46 L50 30 L54 46 Z" fill="#e5e7eb" stroke="#374151" strokeWidth="1.5" />
      </g>
    )
  if (species === 'boar')
    return (
      <g>
        {/* 小さなきば */}
        <path d="M42 60 l-3 6 M58 60 l3 6" stroke="#fef3c7" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'falcon')
    return (
      <g>
        {/* 目の下の黒いもよう */}
        <path d="M36 44 l-2 10 M64 44 l2 10" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'swallow')
    return (
      <g>
        {/* 赤いのど */}
        <ellipse cx="50" cy="58" rx="8" ry="5" fill="#dc2626" />
      </g>
    )
  if (species === 'anglerfish')
    return (
      <g>
        {/* 頭の上のちょうちん */}
        <path d="M50 26 Q56 10 66 12" fill="none" stroke="#111827" strokeWidth="2" />
        <circle cx="67" cy="13" r="4" fill="#fde047" />
      </g>
    )
  if (species === 'moose')
    return (
      <g>
        {/* 平たい大きなつの */}
        <path d="M30 26 q-14 -6 -14 -16 q8 4 12 2 q2 6 6 8 Z" fill="#d6b98c" stroke="#3b2a1a" strokeWidth="1.5" />
        <path d="M70 26 q14 -6 14 -16 q-8 4 -12 2 q-2 6 -6 8 Z" fill="#d6b98c" stroke="#3b2a1a" strokeWidth="1.5" />
      </g>
    )
  if (species === 'shrimp')
    return (
      <g>
        {/* 長いひげ */}
        <path d="M44 34 Q36 14 22 10 M56 34 Q64 14 78 10" fill="none" stroke="#991b1b" strokeWidth="1.5" />
      </g>
    )
  if (species === 'lizard')
    return (
      <g>
        {/* 長いしっぽ */}
        <path d="M70 80 Q88 84 92 70" fill="none" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'dragonfly')
    return (
      <g>
        {/* すきとおった羽 */}
        <path d="M30 40 Q14 30 10 42 Q20 48 30 44 M70 40 Q86 30 90 42 Q80 48 70 44" fill="#e0f2fe" stroke="#075985" strokeWidth="1.2" opacity="0.85" />
      </g>
    )
  if (species === 'heron')
    return (
      <g>
        {/* 長いくちばし */}
        <path d="M58 40 L80 44 L58 46 Z" fill="#facc15" stroke="#334155" strokeWidth="1" />
      </g>
    )
  if (species === 'quail')
    return (
      <g>
        {/* 頭のちょこんとした羽かざり */}
        <path d="M50 22 Q46 12 52 8" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'robin')
    return (
      <g>
        {/* オレンジ色のむね */}
        <ellipse cx="50" cy="62" rx="14" ry="10" fill="#fdba74" opacity="0.9" />
      </g>
    )
  if (species === 'newt')
    return (
      <g>
        {/* 赤いおなかのもよう */}
        <ellipse cx="50" cy="64" rx="10" ry="7" fill="#fca5a5" opacity="0.9" />
      </g>
    )
  if (species === 'pheasant')
    return (
      <g>
        {/* 赤い顔のもよう */}
        <circle cx="42" cy="40" r="4" fill="#ef4444" opacity="0.9" />
        <circle cx="58" cy="40" r="4" fill="#ef4444" opacity="0.9" />
      </g>
    )
  if (species === 'wren')
    return (
      <g>
        {/* ぴんと立ったしっぽ */}
        <path d="M70 66 L82 46" fill="none" stroke="#422006" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'lark')
    return (
      <g>
        {/* 頭のとさか */}
        <path d="M46 20 L50 10 L54 20" fill="#d4a373" stroke="#5c3d1e" strokeWidth="1.5" />
      </g>
    )
  if (species === 'finch')
    return (
      <g>
        {/* 小さくて太いくちばし */}
        <path d="M46 44 L50 50 L54 44 Z" fill="#fde68a" stroke="#78350f" strokeWidth="1" />
      </g>
    )
  if (species === 'stork')
    return (
      <g>
        {/* 長い赤いくちばし */}
        <path d="M50 44 L50 62" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'ibis')
    return (
      <g>
        {/* 下にまがった長いくちばし */}
        <path d="M52 44 Q64 50 66 62" fill="none" stroke="#9d174d" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'condor')
    return (
      <g>
        {/* 首の白いえりまき */}
        <path d="M36 54 Q50 62 64 54" fill="none" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
      </g>
    )
  if (species === 'bushbaby')
    return (
      <g>
        {/* 大きな耳 */}
        <ellipse cx="30" cy="26" rx="8" ry="11" fill="#d6c4a8" stroke="#57442c" strokeWidth="1.5" />
        <ellipse cx="70" cy="26" rx="8" ry="11" fill="#d6c4a8" stroke="#57442c" strokeWidth="1.5" />
      </g>
    )
  if (species === 'ermine')
    return (
      <g>
        {/* しっぽの先の黒いもよう */}
        <path d="M70 70 Q82 66 86 56" fill="none" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
        <circle cx="86" cy="56" r="3" fill="#0f172a" />
      </g>
    )
  if (species === 'lemming')
    return (
      <g>
        {/* 小さな丸い耳 */}
        <circle cx="38" cy="30" r="5" fill="#d97706" stroke="#451a03" strokeWidth="1.2" />
        <circle cx="62" cy="30" r="5" fill="#d97706" stroke="#451a03" strokeWidth="1.2" />
      </g>
    )
  if (species === 'marten')
    return (
      <g>
        {/* のどの白いもよう */}
        <ellipse cx="50" cy="56" rx="8" ry="5" fill="#fef9c3" opacity="0.9" />
      </g>
    )
  if (species === 'shrew')
    return (
      <g>
        {/* とがった鼻 */}
        <path d="M44 46 L50 58 L56 46 Z" fill="#a8a29e" stroke="#292524" strokeWidth="1.2" />
      </g>
    )
  if (species === 'mink')
    return (
      <g>
        {/* あごの白いもよう */}
        <ellipse cx="50" cy="58" rx="6" ry="3" fill="#fef3c7" />
      </g>
    )
  if (species === 'vole')
    return (
      <g>
        {/* ほおのひげ */}
        <path d="M36 50 L24 48 M36 54 L24 56 M64 50 L76 48 M64 54 L76 56" fill="none" stroke="#431407" strokeWidth="1" />
      </g>
    )
  if (species === 'magpie')
    return (
      <g>
        {/* 白いむねのもよう */}
        <ellipse cx="50" cy="62" rx="12" ry="8" fill="#f8fafc" opacity="0.95" />
      </g>
    )
  if (species === 'starling')
    return (
      <g>
        {/* 黄色いくちばし */}
        <path d="M46 44 L50 52 L54 44 Z" fill="#facc15" stroke="#1c1917" strokeWidth="1" />
      </g>
    )
  if (species === 'jay')
    return (
      <g>
        {/* つばさの青いしましま */}
        <path d="M28 58 L36 56 L28 62 L36 60 M72 58 L64 56 L72 62 L64 60" fill="none" stroke="#2563eb" strokeWidth="2" />
      </g>
    )
  if (species === 'swift')
    return (
      <g>
        {/* 細長いつばさ */}
        <path d="M30 52 Q12 44 4 52 M70 52 Q88 44 96 52" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'egret')
    return (
      <g>
        {/* 頭のかざり羽 */}
        <path d="M50 22 Q60 14 68 18" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'kite')
    return (
      <g>
        {/* 広げたつばさ */}
        <path d="M30 50 Q16 40 6 46 M70 50 Q84 40 94 46" fill="none" stroke="#3f2a0a" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'buzzard')
    return (
      <g>
        {/* むねのまだらもよう */}
        <circle cx="46" cy="62" r="2" fill="#451a03" />
        <circle cx="54" cy="64" r="2" fill="#451a03" />
        <circle cx="50" cy="68" r="2" fill="#451a03" />
      </g>
    )
  if (species === 'harrier')
    return (
      <g>
        {/* 顔のまるいふち */}
        <circle cx="50" cy="40" r="14" fill="none" stroke="#e7e5e4" strokeWidth="2" opacity="0.8" />
      </g>
    )
  if (species === 'hoopoe')
    return (
      <g>
        {/* 頭のかんむり羽 */}
        <path d="M38 24 L42 10 L46 22 L50 8 L54 22 L58 10 L62 24" fill="#fdba74" stroke="#7c2d12" strokeWidth="1.2" />
      </g>
    )
  if (species === 'kestrel')
    return (
      <g>
        {/* 目の下のひげもよう */}
        <path d="M42 44 L40 52 M58 44 L60 52" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'avocet')
    return (
      <g>
        {/* 上にそったくちばし */}
        <path d="M58 40 Q72 40 80 30" fill="none" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'tern')
    return (
      <g>
        {/* 黒いぼうしと、ふたまたの尾 */}
        <path d="M34 30 Q50 18 66 30" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
        <path d="M44 86 L38 98 M56 86 L62 98" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'oystercatcher')
    return (
      <g>
        {/* まっ赤で長いくちばし */}
        <path d="M58 42 L80 44" fill="none" stroke="#dc2626" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'gannet')
    return (
      <g>
        {/* とがったくちばしと目のまわりの黒いふち */}
        <path d="M58 42 L78 46 L58 48" fill="#94a3b8" stroke="#1c1917" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    )
  if (species === 'shearwater')
    return (
      <g>
        {/* 細長い翼 */}
        <path d="M22 60 Q10 54 4 58 M78 60 Q90 54 96 58" fill="none" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'skua')
    return (
      <g>
        {/* するどいかぎ形のくちばし */}
        <path d="M58 42 Q72 40 74 48 L66 46" fill="#1c1917" stroke="#1c1917" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    )
  if (species === 'frigatebird')
    return (
      <g>
        {/* のどの赤いふくろ */}
        <ellipse cx="50" cy="66" rx="10" ry="8" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" />
      </g>
    )
  if (species === 'albatross')
    return (
      <g>
        {/* とても長い翼とピンクのくちばし */}
        <path d="M24 58 Q8 50 0 56 M76 58 Q92 50 100 56" fill="none" stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />
        <path d="M58 42 L74 46 L58 47" fill="#fbcfe8" stroke="#1f2937" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
    )
  if (species === 'cormorant')
    return (
      <g>
        {/* 広げてかわかす翼と、黄色いくちもと */}
        <path d="M22 56 L6 46 L10 62 M78 56 L94 46 L90 62" fill="none" stroke="#020617" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="58" cy="46" r="2.5" fill="#facc15" />
      </g>
    )
  if (species === 'guillemot')
    return (
      <g>
        {/* 白いおなかと、目の後ろの細い線 */}
        <path d="M40 62 Q50 80 60 62" fill="#f8fafc" stroke="#0c0a09" strokeWidth="1.2" />
        <path d="M58 40 L66 38" fill="none" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'kittiwake')
    return (
      <g>
        {/* 黄色いくちばしと、黒い翼の先 */}
        <path d="M58 42 L72 45 L58 47" fill="#facc15" stroke="#334155" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M18 64 L26 60 M82 64 L74 60" fill="none" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'tropicbird')
    return (
      <g>
        {/* 長い2本の尾羽と、赤いくちばし */}
        <path d="M46 86 Q40 100 34 112 M54 86 Q60 100 66 112" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M58 42 L72 45 L58 47" fill="#ef4444" stroke="#1e293b" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
    )
  if (species === 'auklet')
    return (
      <g>
        {/* 頭のくるんとした飾り羽と、オレンジのくちばし */}
        <path d="M50 24 Q60 12 56 26" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        <path d="M58 42 L68 44 L58 47" fill="#fb923c" stroke="#0f172a" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
    )
  if (species === 'gull')
    return (
      <g>
        {/* 先に赤と黒のもようがある黄色いくちばし */}
        <path d="M58 42 L72 45 L58 47" fill="#facc15" stroke="#334155" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="70" cy="45" r="1.5" fill="#dc2626" />
      </g>
    )
  if (species === 'skimmer')
    return (
      <g>
        {/* 下が長い赤と黒のくちばし */}
        <path d="M58 42 L70 42 M58 46 L78 48" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'petrel')
    return (
      <g>
        {/* こしの白いもようと、水をける細い足 */}
        <path d="M40 74 Q50 80 60 74" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
        <path d="M46 88 L44 98 M54 88 L56 98" fill="none" stroke="#0c0a09" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'scaup')
    return (
      <g>
        {/* 黒い頭と黄色い目 */}
        <path d="M34 34 Q50 20 66 34" fill="none" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
        <circle cx="56" cy="38" r="2" fill="#facc15" />
      </g>
    )
  if (species === 'grebe')
    return (
      <g>
        {/* くりいろのほおと、くちばしのつけねの黄色い点 */}
        <circle cx="42" cy="46" r="5" fill="#b45309" opacity="0.7" />
        <circle cx="58" cy="44" r="2" fill="#fde047" />
      </g>
    )
  if (species === 'merganser')
    return (
      <g>
        {/* 頭のうしろのぼさぼさの羽と、赤く細いくちばし */}
        <path d="M36 30 L28 24 M38 28 L32 20 M40 28 L38 18" fill="none" stroke="#052e16" strokeWidth="2" strokeLinecap="round" />
        <path d="M58 44 L76 46" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'eider')
    return (
      <g>
        {/* 黒いぼうしと、首のうすい緑 */}
        <path d="M36 32 Q50 22 64 32" fill="none" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <path d="M38 54 Q50 58 62 54" fill="none" stroke="#86efac" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'smew')
    return (
      <g>
        {/* 目のまわりの黒いもよう */}
        <ellipse cx="44" cy="42" rx="6" ry="4" fill="#111827" />
        <ellipse cx="56" cy="42" rx="6" ry="4" fill="#111827" />
      </g>
    )
  if (species === 'longtail')
    return (
      <g>
        {/* 長くとがった尾と、ほおの黒いもよう */}
        <path d="M50 86 L50 110" fill="none" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
        <circle cx="46" cy="48" r="4" fill="#374151" />
      </g>
    )
  if (species === 'goldeneye')
    return (
      <g>
        {/* 金色の目と、ほおの白い丸 */}
        <circle cx="56" cy="40" r="2.5" fill="#facc15" />
        <circle cx="58" cy="48" r="3.5" fill="#ffffff" />
      </g>
    )
  if (species === 'teal')
    return (
      <g>
        {/* 目のまわりから首へのびる緑のもよう */}
        <path d="M46 40 Q56 42 60 52" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
      </g>
    )
  if (species === 'pintail')
    return (
      <g>
        {/* 細長い尾と、首の白いすじ */}
        <path d="M50 86 L46 108" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
        <path d="M54 48 Q56 58 52 66" fill="none" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'wigeon')
    return (
      <g>
        {/* おでこのクリーム色のすじ */}
        <path d="M44 28 Q50 24 56 28" fill="none" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" />
      </g>
    )
  if (species === 'shoveler')
    return (
      <g>
        {/* しゃもじのような平たく広いくちばし */}
        <path d="M58 42 Q72 40 78 46 Q72 52 58 48 Z" fill="#1f2937" stroke="#022c22" strokeWidth="1.2" />
      </g>
    )
  if (species === 'falcated')
    return (
      <g>
        {/* 頭のうしろにたれた、緑と赤むらさきの羽 */}
        <path d="M36 32 Q28 40 32 50" fill="none" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
        <path d="M40 30 Q34 36 36 44" fill="none" stroke="#9d174d" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'baikal')
    return (
      <g>
        {/* 顔の黄色と緑のともえもよう */}
        <path d="M40 40 Q46 34 50 42 Q46 50 40 46" fill="#facc15" stroke="#1c1917" strokeWidth="1" />
        <path d="M52 38 Q60 40 60 50" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'gadwall')
    return (
      <g>
        {/* むねのこまかい波もよう */}
        <path d="M38 62 Q41 60 44 62 Q47 64 50 62 Q53 60 56 62 Q59 64 62 62" fill="none" stroke="#4b5563" strokeWidth="1.2" />
        <path d="M38 68 Q41 66 44 68 Q47 70 50 68 Q53 66 56 68 Q59 70 62 68" fill="none" stroke="#4b5563" strokeWidth="1.2" />
      </g>
    )
  if (species === 'pochard')
    return (
      <g>
        {/* 赤茶色の頭と赤い目 */}
        <path d="M34 34 Q50 20 66 34" fill="none" stroke="#9a3412" strokeWidth="6" strokeLinecap="round" />
        <circle cx="56" cy="40" r="2.2" fill="#dc2626" />
      </g>
    )
  if (species === 'redcrest')
    return (
      <g>
        {/* ふわっとしたオレンジの頭と、赤いくちばし */}
        <path d="M32 34 Q50 14 68 34" fill="#f97316" stroke="#9a3412" strokeWidth="1.5" />
        <path d="M58 44 L72 46 L58 48" fill="#dc2626" stroke="#1c1917" strokeWidth="1.2" strokeLinejoin="round" />
      </g>
    )
  if (species === 'scoter')
    return (
      <g>
        {/* くちばしのつけねの黄色いこぶ */}
        <ellipse cx="62" cy="43" rx="4" ry="3" fill="#facc15" stroke="#030712" strokeWidth="1" />
      </g>
    )
  if (species === 'garganey')
    return (
      <g>
        {/* 目の上の白い長いまゆげもよう */}
        <path d="M44 36 Q54 32 64 40" fill="none" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'harlequin')
    return (
      <g>
        {/* 顔と首の白いもようと、茶色のわき腹 */}
        <path d="M44 36 L46 46 M40 52 Q50 56 60 52" fill="none" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="36" cy="68" rx="5" ry="7" fill="#c2410c" opacity="0.85" />
      </g>
    )
  if (species === 'nuthatch')
    return (
      <g>
        {/* 黒い目すじと、白いおなか */}
        <path d="M38 40 L56 40" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="50" cy="66" rx="9" ry="7" fill="#f8fafc" opacity="0.85" />
      </g>
    )
  if (species === 'dipper')
    return (
      <g>
        {/* 白いまぶたと、こげ茶の羽 */}
        <ellipse cx="42" cy="40" rx="3" ry="2" fill="#f8fafc" />
        <path d="M30 62 Q40 70 52 64" fill="none" stroke="#2b1d14" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'ptarmigan')
    return (
      <g>
        {/* 目の上の赤いとさかと、白い羽 */}
        <path d="M38 34 Q42 30 46 34" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="50" cy="66" rx="10" ry="7" fill="#ffffff" opacity="0.9" />
      </g>
    )
  if (species === 'cuckoo')
    return (
      <g>
        {/* おなかのしまもようと、黄色い目のふち */}
        <path d="M42 60 L58 60 M42 65 L58 65 M44 70 L56 70" fill="none" stroke="#4b5563" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="42" cy="40" r="3.5" fill="none" stroke="#facc15" strokeWidth="1.5" />
      </g>
    )
  if (species === 'wagtail')
    return (
      <g>
        {/* 黒いむねのもようと、長い尾 */}
        <path d="M40 54 Q50 60 60 54" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
        <path d="M70 66 L84 72" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'sandpiper')
    return (
      <g>
        {/* 白いおなかと、目の上の白いすじ */}
        <ellipse cx="50" cy="66" rx="9" ry="7" fill="#fafaf9" />
        <path d="M37 37 L47 36" fill="none" stroke="#fafaf9" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'nightjar')
    return (
      <g>
        {/* 木の皮のようなもようと、白い首の点 */}
        <path d="M38 58 L44 62 M50 56 L56 60 M42 68 L48 72" fill="none" stroke="#292524" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="50" cy="50" r="2.5" fill="#fafaf9" />
      </g>
    )
  if (species === 'treecreeper')
    return (
      <g>
        {/* 細くまがったくちばしと、白いおなか */}
        <path d="M56 42 Q64 44 68 50" fill="none" stroke="#422006" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="50" cy="66" rx="8" ry="6" fill="#fefce8" />
      </g>
    )
  if (species === 'jacana')
    return (
      <g>
        {/* 首の金色と、長い尾羽 */}
        <path d="M44 46 Q50 50 56 46" fill="none" stroke="#eab308" strokeWidth="3" strokeLinecap="round" />
        <path d="M68 64 Q80 70 88 78" fill="none" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'flycatcher')
    return (
      <g>
        {/* 黒い顔と、白いおなか */}
        <path d="M36 44 Q46 52 58 44" fill="#0f172a" opacity="0.8" />
        <ellipse cx="50" cy="66" rx="9" ry="7" fill="#f8fafc" />
      </g>
    )
  if (species === 'crestedkingfisher')
    return (
      <g>
        {/* ぼさぼさの冠羽と、まだらもよう */}
        <path d="M40 26 L44 18 L48 26 L52 17 L56 26" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M40 58 L44 60 M50 56 L54 58 M44 66 L48 68" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'orientalcuckoo')
    return (
      <g>
        {/* おなかのしまもようと、黄色い目のふち */}
        <path d="M42 60 L58 60 M42 65 L58 65 M44 70 L56 70" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
        <circle cx="42" cy="40" r="3.5" fill="none" stroke="#eab308" strokeWidth="1.5" />
      </g>
    )
  if (species === 'dunlin')
    return (
      <g>
        {/* 少し下にまがったくちばしと、おなかの黒いもよう */}
        <path d="M56 44 Q63 46 66 52" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="50" cy="66" rx="7" ry="4" fill="#1c1917" opacity="0.7" />
      </g>
    )
  if (species === 'waxwing')
    return (
      <g>
        {/* とがった冠羽と、尾の先の黄色い帯 */}
        <path d="M44 28 L52 16 L54 28" fill="#d6b48a" stroke="#57351a" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M70 70 L80 74" fill="none" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'thrush')
    return (
      <g>
        {/* 白っぽいおなかと、落ち葉 */}
        <ellipse cx="50" cy="66" rx="9" ry="7" fill="#fafaf9" />
        <path d="M24 82 Q30 76 36 82 Q30 86 24 82" fill="#c2410c" opacity="0.8" />
      </g>
    )
  if (species === 'rosefinch')
    return (
      <g>
        {/* つばさの白いもようと、ばら色のほお */}
        <path d="M30 60 L38 58 M30 66 L38 64" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="40" cy="46" r="4" fill="#db2777" opacity="0.6" />
      </g>
    )
  if (species === 'bullfinch')
    return (
      <g>
        {/* 黒いぼうしと、赤いほお */}
        <path d="M34 34 Q50 22 64 34" fill="#1e293b" />
        <circle cx="42" cy="48" r="5" fill="#e11d48" opacity="0.75" />
      </g>
    )
  if (species === 'whiteeye')
    return (
      <g>
        {/* 目のまわりの白い輪と、梅の花 */}
        <circle cx="42" cy="40" r="5" fill="none" stroke="#ffffff" strokeWidth="2.5" />
        <circle cx="26" cy="82" r="4" fill="#fbcfe8" />
      </g>
    )
  if (species === 'longtailedtit')
    return (
      <g>
        {/* 目の上の黒いすじと、長い尾 */}
        <path d="M36 38 Q44 34 50 38" fill="none" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        <path d="M70 66 L92 74" fill="none" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'pygmywoodpecker')
    return (
      <g>
        {/* せなかのしまもようと、小さなくちばし */}
        <path d="M30 56 L40 56 M30 62 L40 62 M30 68 L40 68" fill="none" stroke="#fafaf9" strokeWidth="2" strokeLinecap="round" />
        <path d="M58 44 L66 44" fill="none" stroke="#292524" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'redstart')
    return (
      <g>
        {/* つばさの白い紋と、だいだい色のおなか */}
        <circle cx="34" cy="60" r="3.5" fill="#ffffff" />
        <ellipse cx="50" cy="66" rx="9" ry="7" fill="#fb923c" />
      </g>
    )
  if (species === 'bluetail')
    return (
      <g>
        {/* わきのだいだい色と、目の上の白いまゆ */}
        <ellipse cx="34" cy="64" rx="4" ry="6" fill="#f97316" />
        <path d="M37 37 L46 36" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'greattit')
    return (
      <g>
        {/* 白いほおと、むねの黒いネクタイ */}
        <ellipse cx="42" cy="44" rx="5" ry="4" fill="#ffffff" />
        <path d="M50 52 L50 74" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
      </g>
    )
  if (species === 'bulbul')
    return (
      <g>
        {/* ほおの茶色い点と、ぼさっとした頭 */}
        <circle cx="44" cy="46" r="4" fill="#92400e" opacity="0.8" />
        <path d="M42 28 L46 22 L50 28 L54 22 L56 28" fill="none" stroke="#1f2937" strokeWidth="2" strokeLinejoin="round" />
      </g>
    )
  if (species === 'goshawk')
    return (
      <g>
        {/* 白いまゆと、むねの細かいしま */}
        <path d="M36 37 Q44 33 50 37" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 60 L58 60 M42 64 L58 64 M44 68 L56 68" fill="none" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'greenfinch')
    return (
      <g>
        {/* つばさの黄色い帯と、ピンク色のくちばし */}
        <path d="M30 62 L42 60" fill="none" stroke="#facc15" strokeWidth="4" strokeLinecap="round" />
        <path d="M58 44 L64 46 L58 48 Z" fill="#f9a8d4" />
      </g>
    )
  if (species === 'duskythrush')
    return (
      <g>
        {/* 白いまゆと、むねの黒い点々 */}
        <path d="M36 37 L46 35" fill="none" stroke="#fef3c7" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="44" cy="62" r="2" fill="#292524" /><circle cx="52" cy="64" r="2" fill="#292524" /><circle cx="48" cy="70" r="2" fill="#292524" />
      </g>
    )
  if (species === 'bunting')
    return (
      <g>
        {/* 黄色いおなかと、灰緑色の顔 */}
        <ellipse cx="50" cy="66" rx="9" ry="7" fill="#facc15" />
        <path d="M36 40 Q46 46 56 40" fill="#65745a" opacity="0.7" />
      </g>
    )
  if (species === 'goldcrest')
    return (
      <g>
        {/* 頭のてっぺんの黄色い羽 */}
        <path d="M42 26 Q50 18 58 26" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        <path d="M40 30 L60 30" fill="none" stroke="#1c1917" strokeWidth="1.5" />
      </g>
    )
  if (species === 'nightheron')
    return (
      <g>
        {/* 赤い目と、頭のうしろの白い飾り羽 */}
        <circle cx="44" cy="40" r="3" fill="#dc2626" />
        <path d="M60 32 Q72 36 80 46" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'cattleegret')
    return (
      <g>
        {/* 頭と首の亜麻色 */}
        <path d="M38 34 Q50 26 60 34 L58 50 Q50 54 42 50 Z" fill="#f59e0b" opacity="0.6" />
        <path d="M58 44 L68 46" fill="none" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'yellowthroat')
    return (
      <g>
        {/* 黒い冠羽と、黄色いのど */}
        <path d="M44 28 L50 16 L54 28" fill="#1c1917" />
        <ellipse cx="50" cy="52" rx="7" ry="5" fill="#facc15" />
      </g>
    )
  if (species === 'nutcracker')
    return (
      <g>
        {/* 星のような白い点々 */}
        <circle cx="40" cy="56" r="2" fill="#ffffff" /><circle cx="48" cy="62" r="2" fill="#ffffff" /><circle cx="56" cy="56" r="2" fill="#ffffff" /><circle cx="44" cy="68" r="2" fill="#ffffff" /><circle cx="54" cy="68" r="2" fill="#ffffff" />
      </g>
    )
  if (species === 'variedtit')
    return (
      <g>
        {/* 頭の白いもようと、足でおさえた木の実 */}
        <path d="M40 38 Q50 34 60 38" fill="none" stroke="#fafaf9" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="50" cy="84" rx="5" ry="4" fill="#92400e" />
      </g>
    )
  if (species === 'hawkeagle')
    return (
      <g>
        {/* 頭のうしろの冠羽と、つばさのしま */}
        <path d="M58 30 L66 24 L62 34" fill="#292524" />
        <path d="M28 58 L40 56 M28 64 L40 62 M28 70 L40 68" fill="none" stroke="#292524" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'paradiseflycatcher')
    return (
      <g>
        {/* 目のまわりの青いリングと、とても長い尾 */}
        <circle cx="42" cy="40" r="4.5" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        <path d="M66 66 Q84 76 96 92" fill="none" stroke="#1e1b4b" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'stonechat')
    return (
      <g>
        {/* 黒い頭と、オレンジ色のむね */}
        <path d="M34 36 Q50 24 64 36 L60 46 Q50 50 40 46 Z" fill="#1c1917" />
        <ellipse cx="50" cy="60" rx="8" ry="6" fill="#fb923c" />
      </g>
    )
  if (species === 'pitta')
    return (
      <g>
        {/* つばさの青いもようと、おなかの赤 */}
        <path d="M30 58 L42 56" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="52" cy="72" rx="6" ry="4" fill="#ef4444" />
      </g>
    )
  if (species === 'siberianblue')
    return (
      <g>
        {/* 白いおなかと、目の下の黒いすじ */}
        <ellipse cx="50" cy="66" rx="9" ry="7" fill="#f8fafc" />
        <path d="M38 44 L48 46" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'narcissusflycatcher')
    return (
      <g>
        {/* 黄色いのどと、黄色いまゆ */}
        <ellipse cx="50" cy="62" rx="10" ry="7" fill="#facc15" />
        <path d="M37 40 L46 38" fill="none" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'bushwarbler')
    return (
      <g>
        {/* 白っぽいまゆと、うすいおなか */}
        <path d="M36 41 L47 39" fill="none" stroke="#f7fee7" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="50" cy="65" rx="9" ry="6" fill="#ecfccb" />
      </g>
    )
  if (species === 'reedwarbler')
    return (
      <g>
        {/* 赤い口の中と、白っぽいまゆ */}
        <path d="M36 41 L47 39" fill="none" stroke="#f5f5f4" strokeWidth="2" strokeLinecap="round" />
        <path d="M46 52 L54 52 L50 56 Z" fill="#ef4444" />
      </g>
    )
  if (species === 'ruddykingfisher')
    return (
      <g>
        {/* 大きな赤いくちばし */}
        <path d="M44 50 L60 52 L44 55 Z" fill="#dc2626" />
      </g>
    )
  if (species === 'japanesegrosbeak')
    return (
      <g>
        {/* 太くて黄色いくちばしと、黒い頭 */}
        <path d="M44 50 L58 52 L44 56 Z" fill="#facc15" />
        <ellipse cx="50" cy="34" rx="12" ry="7" fill="#0f172a" />
      </g>
    )
  if (species === 'siskin')
    return (
      <g>
        {/* 黒い頭のてっぺんと、つばさの黄色いすじ */}
        <ellipse cx="50" cy="32" rx="8" ry="4" fill="#1c1917" />
        <path d="M30 60 L40 64" fill="none" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'japanesegreenwoodpecker')
    return (
      <g>
        {/* 赤い頭のてっぺんと、まっすぐなくちばし */}
        <ellipse cx="50" cy="31" rx="8" ry="4" fill="#dc2626" />
        <path d="M44 51 L60 52 L44 54 Z" fill="#475569" />
      </g>
    )
  if (species === 'hawfinch')
    return (
      <g>
        {/* 太いくちばしと、目のまわりの黒いもよう */}
        <path d="M44 49 L57 52 L44 56 Z" fill="#cbd5e1" />
        <path d="M40 46 L46 50" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'lidthsjay')
    return (
      <g>
        {/* 茶色のせなかと、白っぽいくちばし */}
        <ellipse cx="50" cy="62" rx="12" ry="7" fill="#92400e" />
        <path d="M44 50 L56 52 L44 54 Z" fill="#e2e8f0" />
      </g>
    )
  if (species === 'blackwoodpecker')
    return (
      <g>
        {/* 頭のてっぺんの赤と、白いくちばし */}
        <ellipse cx="50" cy="30" rx="9" ry="5" fill="#dc2626" />
        <path d="M44 50 L60 52 L44 54 Z" fill="#e7e5e4" />
      </g>
    )
  if (species === 'copperpheasant')
    return (
      <g>
        {/* 長い尾と、目のまわりの赤 */}
        <path d="M30 66 L10 80" fill="none" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
        <circle cx="42" cy="44" r="3" fill="#dc2626" />
      </g>
    )
  if (species === 'bamboopartridge')
    return (
      <g>
        {/* だいだい色の顔 */}
        <ellipse cx="50" cy="44" rx="10" ry="6" fill="#fb923c" />
      </g>
    )
  if (species === 'dollarbird')
    return (
      <g>
        {/* 赤いくちばしと、つばさの白い丸 */}
        <path d="M44 50 L57 52 L44 55 Z" fill="#ef4444" />
        <circle cx="34" cy="62" r="3" fill="#f8fafc" />
      </g>
    )
  if (species === 'lessercuckoo')
    return (
      <g>
        {/* しまもようのおなかと、黄色いアイリング */}
        <path d="M42 62 L58 62 M42 66 L58 66" fill="none" stroke="#1e293b" strokeWidth="1.5" />
        <circle cx="42" cy="44" r="3.5" fill="none" stroke="#facc15" strokeWidth="1.5" />
      </g>
    )
  if (species === 'ashyminivet')
    return (
      <g>
        {/* 白いおでこと、黒い目すじ */}
        <ellipse cx="50" cy="36" rx="9" ry="4" fill="#f8fafc" />
        <path d="M38 44 L48 46" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'lathamssnipe')
    return (
      <g>
        {/* 長いくちばしと、まだらもよう */}
        <path d="M44 51 L66 53 L44 54 Z" fill="#78350f" />
        <circle cx="40" cy="62" r="2" fill="#3f2a0a" />
        <circle cx="48" cy="66" r="2" fill="#3f2a0a" />
      </g>
    )
  if (species === 'whitebelliedgreenpigeon')
    return (
      <g>
        {/* 黄色っぽいむねと、赤むらさきのかた */}
        <ellipse cx="50" cy="60" rx="9" ry="6" fill="#fde047" />
        <ellipse cx="34" cy="56" rx="5" ry="3" fill="#9d174d" />
      </g>
    )
  if (species === 'siberianrubythroat')
    return (
      <g>
        {/* 赤いのどと、白いまゆ */}
        <ellipse cx="50" cy="56" rx="6" ry="4" fill="#dc2626" />
        <path d="M37 41 L47 39" fill="none" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'orientalturtledove')
    return (
      <g>
        {/* 首の青と黒のしま */}
        <path d="M58 48 L62 46 M58 51 L62 49" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'blackwoodpigeon')
    return (
      <g>
        {/* 首のまわりの緑とむらさきのかがやき */}
        <path d="M56 46 Q60 50 56 54" fill="none" stroke="#22c55e" strokeWidth="2" />
        <path d="M58 46 Q62 50 58 54" fill="none" stroke="#a855f7" strokeWidth="2" />
      </g>
    )
  if (species === 'striatedheron')
    return (
      <g>
        {/* 黒い頭と、笹の葉のようなつばさのもよう */}
        <ellipse cx="50" cy="32" rx="9" ry="5" fill="#0f172a" />
        <path d="M32 58 L42 54 M34 64 L44 60" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
      </g>
    )
  if (species === 'scalythrush')
    return (
      <g>
        {/* うろこのような黒いもよう */}
        <path d="M40 60 Q44 57 48 60 M50 60 Q54 57 58 60 M44 66 Q48 63 52 66" fill="none" stroke="#1c1917" strokeWidth="1.5" />
      </g>
    )
  if (species === 'japanesethrush')
    return (
      <g>
        {/* 黄色いくちばしと、白いおなかの黒い点々 */}
        <path d="M44 50 L55 52 L44 54 Z" fill="#facc15" />
        <ellipse cx="50" cy="64" rx="9" ry="6" fill="#f8fafc" />
        <circle cx="47" cy="63" r="1.3" fill="#030712" />
        <circle cx="53" cy="65" r="1.3" fill="#030712" />
      </g>
    )
  if (species === 'siberianthrush')
    return (
      <g>
        {/* くっきりした白いまゆ */}
        <path d="M35 41 L49 38" fill="none" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'brownheadedthrush')
    return (
      <g>
        {/* オレンジ色のむねと、白いまゆ */}
        <ellipse cx="50" cy="62" rx="10" ry="7" fill="#fb923c" />
        <path d="M37 41 L46 39" fill="none" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'asianbrownflycatcher')
    return (
      <g>
        {/* 大きな黒い目と白いアイリング */}
        <circle cx="42" cy="44" r="4" fill="none" stroke="#f8fafc" strokeWidth="1.5" />
      </g>
    )
  if (species === 'greystreakedflycatcher')
    return (
      <g>
        {/* 白いむねの黒いたてじま */}
        <path d="M46 58 L46 66 M50 58 L50 67 M54 58 L54 66" fill="none" stroke="#1e293b" strokeWidth="1.5" />
      </g>
    )
  if (species === 'japanesewagtail')
    return (
      <g>
        {/* 白いまゆと黒い顔 */}
        <path d="M36 41 L48 39" fill="none" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'greywagtail')
    return (
      <g>
        {/* 黄色いおなかと、白いまゆ */}
        <ellipse cx="50" cy="64" rx="10" ry="7" fill="#fde047" />
        <path d="M37 41 L47 39" fill="none" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'whitewagtail')
    return (
      <g>
        {/* 白い顔と黒い目すじ */}
        <path d="M37 44 L47 45" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'greyfacedbuzzard')
    return (
      <g>
        {/* 白いのどと黒いたてすじ */}
        <ellipse cx="50" cy="55" rx="5" ry="4" fill="#f8fafc" />
        <path d="M50 52 L50 59" fill="none" stroke="#1c1917" strokeWidth="1.5" />
      </g>
    )
  if (species === 'japanesesparrowhawk')
    return (
      <g>
        {/* 黄色い目のまわりと、しまもようのむね */}
        <circle cx="42" cy="44" r="3.5" fill="none" stroke="#facc15" strokeWidth="1.5" />
        <path d="M44 60 L56 60 M44 64 L56 64" fill="none" stroke="#c2410c" strokeWidth="1.5" />
      </g>
    )
  if (species === 'eurasiansparrowhawk')
    return (
      <g>
        {/* むねの細かいしまもようと、黄色い目 */}
        <path d="M44 58 L56 58 M44 61 L56 61 M44 64 L56 64" fill="none" stroke="#9a3412" strokeWidth="1" />
        <circle cx="42" cy="44" r="3" fill="#facc15" />
      </g>
    )
  if (species === 'eurasianhobby')
    return (
      <g>
        {/* 黒いほおのもようと、赤茶色の足のはね */}
        <path d="M42 46 L40 54" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="50" cy="74" rx="8" ry="3" fill="#b45309" />
      </g>
    )
  if (species === 'coaltit')
    return (
      <g>
        {/* 小さな冠羽と白いほお */}
        <path d="M48 28 L50 22 L52 28" fill="#0f172a" />
        <ellipse cx="44" cy="46" rx="4" ry="3" fill="#f8fafc" />
      </g>
    )
  if (species === 'willowtit')
    return (
      <g>
        {/* 黒いぼうしと黒いあご */}
        <ellipse cx="50" cy="32" rx="11" ry="6" fill="#0c0a09" />
        <ellipse cx="50" cy="55" rx="4" ry="3" fill="#0c0a09" />
      </g>
    )
  if (species === 'japanesenightheron')
    return (
      <g>
        {/* くり色の首と、のばした首のもよう */}
        <path d="M50 40 L50 56" fill="none" stroke="#f5f5f4" strokeWidth="1.5" />
      </g>
    )
  if (species === 'asianstubtail')
    return (
      <g>
        {/* 白っぽいまゆと、とても短い尾 */}
        <path d="M37 41 L48 39" fill="none" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'easterncrownedwarbler')
    return (
      <g>
        {/* 頭の中央の白っぽいすじと、白いまゆ */}
        <path d="M50 26 L50 34" fill="none" stroke="#ecfccb" strokeWidth="2" />
        <path d="M37 41 L47 39" fill="none" stroke="#f7fee7" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'seaotter')
    return (
      <g>
        {/* おなかの上の石と、白っぽい顔のひげ */}
        <ellipse cx="50" cy="68" rx="7" ry="5" fill="#78716c" stroke="#44403c" strokeWidth="1.5" />
        <path d="M36 50 L28 48 M36 53 L28 54 M64 50 L72 48 M64 53 L72 54" fill="none" stroke="#f5f5f4" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    )
  if (species === 'pallascat')
    return (
      <g>
        {/* ひたいの点もようと、ほおの黒いしま */}
        <path d="M44 28 L44 30 M50 27 L50 29 M56 28 L56 30" fill="none" stroke="#57534e" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M33 48 L39 50 M33 52 L39 53 M67 48 L61 50 M67 52 L61 53" fill="none" stroke="#44403c" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'horseshoecrab')
    return (
      <g>
        {/* こうらのふちと、長い尾 */}
        <path d="M30 40 Q50 22 70 40" fill="none" stroke="#3f3f46" strokeWidth="2" />
        <path d="M50 80 L50 94" fill="none" stroke="#3f3f46" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'seaslug')
    return (
      <g>
        {/* 頭の2本の角と、背中の水玉もよう */}
        <path d="M42 24 L39 14 M58 24 L61 14" fill="none" stroke="#581c87" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="40" cy="66" r="3" fill="#fde047" />
        <circle cx="60" cy="66" r="3" fill="#fde047" />
        <circle cx="50" cy="74" r="3" fill="#fb923c" />
      </g>
    )
  if (species === 'bagworm')
    return (
      <g>
        {/* みのの小枝と、ぶらさがる糸 */}
        <path d="M50 8 L50 22" fill="none" stroke="#e7e5e4" strokeWidth="1.2" />
        <path d="M34 50 L44 56 M66 50 L56 56 M36 66 L46 70 M64 66 L54 70" fill="none" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'molerat')
    return (
      <g>
        {/* 大きな前歯と、しわ */}
        <rect x="46" y="54" width="3.5" height="8" rx="1" fill="#fefce8" stroke="#9f1239" strokeWidth="1" />
        <rect x="50.5" y="54" width="3.5" height="8" rx="1" fill="#fefce8" stroke="#9f1239" strokeWidth="1" />
        <path d="M38 70 Q50 74 62 70 M40 77 Q50 80 60 77" fill="none" stroke="#be123c" strokeWidth="1.2" />
      </g>
    )
  if (species === 'firenewt')
    return (
      <g>
        {/* 赤いおなかのまだらもよう */}
        <ellipse cx="50" cy="70" rx="12" ry="8" fill="#dc2626" />
        <circle cx="46" cy="68" r="1.8" fill="#1c1917" />
        <circle cx="54" cy="72" r="1.8" fill="#1c1917" />
        <circle cx="50" cy="66" r="1.4" fill="#1c1917" />
      </g>
    )
  if (species === 'waterstrider')
    return (
      <g>
        {/* 長いあしと、水面の波紋 */}
        <path d="M34 58 L18 50 M34 66 L16 72 M66 58 L82 50 M66 66 L84 72" fill="none" stroke="#292524" strokeWidth="1.8" strokeLinecap="round" />
        <ellipse cx="50" cy="90" rx="26" ry="3.5" fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
      </g>
    )
  if (species === 'giantwaterbug')
    return (
      <g>
        {/* 大きな前あし（かま） */}
        <path d="M34 50 L22 40 L26 34 M66 50 L78 40 L74 34" fill="none" stroke="#3f2a14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  if (species === 'divingbeetle')
    return (
      <g>
        {/* はねのふちの黄色い線と、空気のあわ */}
        <path d="M32 46 Q50 34 68 46" fill="none" stroke="#facc15" strokeWidth="2" />
        <circle cx="72" cy="30" r="3" fill="none" stroke="#bae6fd" strokeWidth="1.5" />
        <circle cx="78" cy="22" r="2" fill="none" stroke="#bae6fd" strokeWidth="1.5" />
      </g>
    )
  if (species === 'mountainfrog')
    return (
      <g>
        {/* 目の後ろの黒いもようと、のどのふくらみ */}
        <path d="M34 38 L42 42 M66 38 L58 42" fill="none" stroke="#431407" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="50" cy="62" rx="8" ry="4" fill="#fed7aa" />
      </g>
    )
  if (species === 'maskedcivet')
    return (
      <g>
        {/* 顔の真ん中の白いすじと、目のまわりの白 */}
        <path d="M50 22 L50 50" fill="none" stroke="#fafaf9" strokeWidth="4" strokeLinecap="round" />
        <path d="M38 40 Q42 36 46 40 M54 40 Q58 36 62 40" fill="none" stroke="#e7e5e4" strokeWidth="2" />
      </g>
    )
  if (species === 'waterscorpion')
    return (
      <g>
        {/* かまの前あしと、おしりの長い呼吸管 */}
        <path d="M34 48 L24 36 L28 32 M66 48 L76 36 L72 32" fill="none" stroke="#44403c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M50 82 L50 98" fill="none" stroke="#44403c" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'eagleowl')
    return (
      <g>
        {/* 頭の羽角と、顔のまわりのふち */}
        <path d="M36 26 L32 12 L42 22 M64 26 L68 12 L58 22" fill="#a16207" stroke="#422006" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="42" cy="42" r="7" fill="none" stroke="#fde68a" strokeWidth="1.5" />
        <circle cx="58" cy="42" r="7" fill="none" stroke="#fde68a" strokeWidth="1.5" />
      </g>
    )
  if (species === 'giantflyingsquirrel')
    return (
      <g>
        {/* 広げた飛まく */}
        <path d="M30 50 Q18 64 30 76 M70 50 Q82 64 70 76" fill="none" stroke="#451a03" strokeWidth="2" />
      </g>
    )
  if (species === 'harvestmouse')
    return (
      <g>
        {/* 草のくきと、巻きつけたしっぽ */}
        <path d="M80 96 L80 30" fill="none" stroke="#65a30d" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M64 74 Q76 78 80 70 Q84 64 78 62" fill="none" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    )
  if (species === 'japanesesquirrel')
    return (
      <g>
        {/* 耳の先の房毛と、木の実 */}
        <path d="M38 22 L36 14 M62 22 L64 14" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="72" r="5" fill="#92400e" stroke="#451a03" strokeWidth="1.2" />
      </g>
    )
  if (species === 'japaneseserow')
    return (
      <g>
        {/* 短い角と、ほおの白い毛 */}
        <path d="M42 22 L40 12 M58 22 L60 12" fill="none" stroke="#292524" strokeWidth="3" strokeLinecap="round" />
        <path d="M36 54 Q42 60 48 56 M64 54 Q58 60 52 56" fill="none" stroke="#f5f5f4" strokeWidth="2" />
      </g>
    )
  if (species === 'asianblackbear')
    return (
      <g>
        {/* むねの三日月もよう */}
        <path d="M38 64 Q50 74 62 64 Q50 70 38 64 Z" fill="#fafaf9" />
      </g>
    )
  if (species === 'kajikafrog')
    return (
      <g>
        {/* 指先の吸ばんと、流れる水 */}
        <circle cx="32" cy="84" r="2.5" fill="#d6d3d1" />
        <circle cx="68" cy="84" r="2.5" fill="#d6d3d1" />
        <path d="M18 94 Q30 90 42 94 Q54 98 66 94 Q78 90 86 94" fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
      </g>
    )
  if (species === 'seaturtle')
    return (
      <g>
        {/* こうらのもようと、ひれ */}
        <path d="M40 58 L50 52 L60 58 L60 70 L50 76 L40 70 Z" fill="none" stroke="#1a2e05" strokeWidth="1.5" />
        <path d="M30 62 Q20 58 18 66 M70 62 Q80 58 82 66" fill="none" stroke="#1a2e05" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'ratsnake')
    return (
      <g>
        {/* 体のうろこもようと、ちょろっと出た舌 */}
        <path d="M36 64 Q50 70 64 64 M38 72 Q50 78 62 72" fill="none" stroke="#365314" strokeWidth="1.5" />
        <path d="M50 58 L50 64 L47 67 M50 64 L53 67" fill="none" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    )
  if (species === 'pondturtle')
    return (
      <g>
        {/* こうらのもようと、すわっている石 */}
        <path d="M40 60 L50 54 L60 60 L60 70 L50 76 L40 70 Z" fill="none" stroke="#422006" strokeWidth="1.5" />
        <ellipse cx="50" cy="92" rx="22" ry="4" fill="#a8a29e" />
      </g>
    )
  if (species === 'flapjackoctopus')
    return (
      <g>
        {/* 頭の上の耳のようなひれ */}
        <ellipse cx="36" cy="26" rx="6" ry="4" fill="#fb923c" stroke="#9a3412" strokeWidth="1.2" />
        <ellipse cx="64" cy="26" rx="6" ry="4" fill="#fb923c" stroke="#9a3412" strokeWidth="1.2" />
      </g>
    )
  if (species === 'gardeneel')
    return (
      <g>
        {/* 体の黒い点もようと、足元の砂 */}
        <circle cx="46" cy="60" r="1.6" fill="#1c1917" />
        <circle cx="54" cy="68" r="1.6" fill="#1c1917" />
        <circle cx="48" cy="76" r="1.6" fill="#1c1917" />
        <ellipse cx="50" cy="92" rx="26" ry="5" fill="#fde68a" />
      </g>
    )
  if (species === 'porcupinefish')
    return (
      <g>
        {/* 体のまわりのとげ */}
        <path d="M30 50 L24 46 M28 62 L21 62 M30 74 L24 78 M70 50 L76 46 M72 62 L79 62 M70 74 L76 78 M50 86 L50 93" fill="none" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    )
  if (species === 'whaleshark')
    return (
      <g>
        {/* 背中の白い点もようと、横の線 */}
        <circle cx="40" cy="58" r="2" fill="#f8fafc" />
        <circle cx="50" cy="54" r="2" fill="#f8fafc" />
        <circle cx="60" cy="58" r="2" fill="#f8fafc" />
        <circle cx="45" cy="66" r="2" fill="#f8fafc" />
        <circle cx="55" cy="66" r="2" fill="#f8fafc" />
        <path d="M34 72 Q50 76 66 72" fill="none" stroke="#e2e8f0" strokeWidth="1.2" />
      </g>
    )
  if (species === 'spidercrab')
    return (
      <g>
        {/* とても長いあし */}
        <path d="M34 58 L14 44 L8 60 M34 66 L12 72 L10 88 M66 58 L86 44 L92 60 M66 66 L88 72 L90 88" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )
  if (species === 'oarfish')
    return (
      <g>
        {/* 頭の赤いひれと長い背びれ */}
        <path d="M40 30 Q36 14 30 8 M46 28 Q46 12 44 4 M52 30 Q58 18 64 34 Q70 50 76 66" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'giantsquid')
    return (
      <g>
        {/* 長いうで */}
        <path d="M38 70 Q30 88 20 94 M46 72 Q44 90 38 98 M54 72 Q56 90 62 98 M62 70 Q70 88 80 94" fill="none" stroke="#4c0519" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'dugong')
    return (
      <g>
        {/* 三日月のしっぽ */}
        <path d="M78 66 Q90 58 96 50 M78 66 Q90 74 96 82" fill="none" stroke="#57534e" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'coelacanth')
    return (
      <g>
        {/* あしのような太いひれ */}
        <path d="M36 70 Q30 82 34 90 M64 70 Q70 82 66 90 M44 74 Q42 86 46 92 M56 74 Q58 86 54 92" fill="none" stroke="#172554" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'orca')
    return (
      <g>
        {/* 白いもようと高い背びれ */}
        <path d="M50 14 L46 34 L56 34 Z" fill="#111827" />
        <ellipse cx="38" cy="46" rx="6" ry="3" fill="#ffffff" />
        <ellipse cx="62" cy="46" rx="6" ry="3" fill="#ffffff" />
      </g>
    )
  if (species === 'giantisopod')
    return (
      <g>
        {/* よろいのふし */}
        <path d="M30 44 Q50 38 70 44 M28 54 Q50 48 72 54 M30 64 Q50 58 70 64" fill="none" stroke="#3f3f46" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'napoleonfish')
    return (
      <g>
        {/* もり上がったおでこと、めがねもよう */}
        <path d="M34 30 Q50 14 66 30" fill="none" stroke="#134e4a" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 44 L40 40 M60 40 L70 44" fill="none" stroke="#134e4a" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'searobin')
    return (
      <g>
        {/* 青緑のむなびれと、あしのようなひれ */}
        <path d="M30 50 Q16 40 14 58 Q22 60 30 56 M70 50 Q84 40 86 58 Q78 60 70 56" fill="#14b8a6" stroke="#9a3412" strokeWidth="1.5" />
        <path d="M40 72 L36 84 M46 74 L44 86 M54 74 L56 86 M60 72 L64 84" fill="none" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'ribboneel')
    return (
      <g>
        {/* 鼻先のひらひらと、長い背びれ */}
        <path d="M42 26 Q38 16 44 12 M58 26 Q62 16 56 12" fill="none" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 60 Q50 52 76 60" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'blueringed')
    return (
      <g>
        {/* 青いわっかのもよう */}
        <circle cx="38" cy="48" r="4" fill="none" stroke="#1d4ed8" strokeWidth="2" />
        <circle cx="62" cy="48" r="4" fill="none" stroke="#1d4ed8" strokeWidth="2" />
        <circle cx="50" cy="62" r="4" fill="none" stroke="#1d4ed8" strokeWidth="2" />
      </g>
    )
  if (species === 'cuttlefish')
    return (
      <g>
        {/* 体のふちのひれと、色が変わるもよう */}
        <path d="M26 40 Q22 56 26 72 M74 40 Q78 56 74 72" fill="none" stroke="#6b21a8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M40 54 Q50 48 60 54 M40 62 Q50 56 60 62" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'bluedragon')
    return (
      <g>
        {/* つばさのようなとげ */}
        <path d="M30 50 L16 42 M30 56 L14 56 M30 62 L16 70 M70 50 L84 42 M70 56 L86 56 M70 62 L84 70" fill="none" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'mandarinfish')
    return (
      <g>
        {/* うずまきもよう */}
        <path d="M36 46 Q42 40 46 46 Q42 52 36 50 M54 56 Q60 50 64 56 Q60 62 54 60" fill="none" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'pistolshrimp')
    return (
      <g>
        {/* 片方だけ大きなはさみ */}
        <path d="M70 52 Q86 44 90 52 Q86 60 72 58" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
        <path d="M30 54 Q22 52 20 56" fill="none" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'seafirefly')
    return (
      <g>
        {/* 青い光のつぶ */}
        <circle cx="22" cy="40" r="3" fill="#7dd3fc" />
        <circle cx="80" cy="36" r="2.5" fill="#7dd3fc" />
        <circle cx="76" cy="74" r="3" fill="#7dd3fc" />
        <circle cx="24" cy="72" r="2" fill="#7dd3fc" />
      </g>
    )
  if (species === 'lionfish')
    return (
      <g>
        {/* ひらひらのむなびれと、背びれのとげ */}
        <path d="M30 52 Q12 44 10 62 Q20 66 30 60 M70 52 Q88 44 90 62 Q80 66 70 60" fill="#fecaca" stroke="#7f1d1d" strokeWidth="1.5" />
        <path d="M40 26 L38 14 M50 24 L50 10 M60 26 L62 14" fill="none" stroke="#7f1d1d" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'coconutcrab')
    return (
      <g>
        {/* 大きなはさみ */}
        <path d="M24 50 Q10 42 12 56 Q20 62 28 56 M76 50 Q90 42 88 56 Q80 62 72 56" fill="#d97706" stroke="#451a03" strokeWidth="2" />
      </g>
    )
  if (species === 'harlequinshrimp')
    return (
      <g>
        {/* ふりそでのようなはさみと水玉 */}
        <path d="M28 46 Q12 36 14 54 Q22 58 30 52 M72 46 Q88 36 86 54 Q78 58 70 52" fill="#fbcfe8" stroke="#7e22ce" strokeWidth="1.5" />
        <circle cx="40" cy="60" r="2.5" fill="#a855f7" />
        <circle cx="58" cy="64" r="2.5" fill="#a855f7" />
      </g>
    )
  if (species === 'stonefish')
    return (
      <g>
        {/* ごつごつした岩のようなこぶ */}
        <circle cx="34" cy="36" r="4" fill="#a8a29e" />
        <circle cx="62" cy="34" r="5" fill="#a8a29e" />
        <circle cx="48" cy="28" r="3.5" fill="#a8a29e" />
        <circle cx="70" cy="50" r="3" fill="#a8a29e" />
      </g>
    )
  if (species === 'seamoth')
    return (
      <g>
        {/* 天狗の鼻のような口先と、羽のようなむなびれ */}
        <path d="M50 30 L50 10" fill="none" stroke="#525252" strokeWidth="4" strokeLinecap="round" />
        <path d="M30 52 Q14 46 16 62 Q24 64 30 58 M70 52 Q86 46 84 62 Q76 64 70 58" fill="#e5e5e5" stroke="#525252" strokeWidth="1.5" />
      </g>
    )
  if (species === 'eggcowry')
    return (
      <g>
        {/* 貝がらをつつむ黒い外とう膜 */}
        <path d="M28 60 Q50 76 72 60" fill="none" stroke="#292524" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 66 L38 72 M50 68 L50 76 M60 66 L62 72" fill="none" stroke="#292524" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'flatworm')
    return (
      <g>
        {/* 波打つ体のふち */}
        <path d="M20 60 Q28 52 36 60 Q44 68 52 60 Q60 52 68 60 Q76 68 84 60" fill="none" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'bluetang')
    return (
      <g>
        {/* 黄色いしっぽと黒いもよう */}
        <path d="M78 50 L94 40 L94 68 Z" fill="#facc15" stroke="#172554" strokeWidth="1.5" />
        <path d="M34 42 Q50 36 62 44 Q56 56 40 58" fill="none" stroke="#172554" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'bannerfish')
    return (
      <g>
        {/* 旗のようにのびた背びれと、黒いしま */}
        <path d="M50 26 Q54 10 66 4" fill="none" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M40 34 L36 72 M60 34 L64 72" fill="none" stroke="#1c1917" strokeWidth="4" strokeLinecap="round" />
      </g>
    )
  if (species === 'moorishidol')
    return (
      <g>
        {/* むちのようにのびた背びれと黒いしま */}
        <path d="M50 26 Q60 8 80 6" fill="none" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
        <path d="M38 32 L34 74 M62 32 L66 74" fill="none" stroke="#1c1917" strokeWidth="5" strokeLinecap="round" />
      </g>
    )
  if (species === 'emperorangel')
    return (
      <g>
        {/* 黄色いしまもよう */}
        <path d="M30 40 Q50 34 70 40 M28 50 Q50 44 72 50 M30 60 Q50 54 70 60" fill="none" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    )
  if (species === 'batfish')
    return (
      <g>
        {/* とても高い背びれとしりびれ（オレンジのふち） */}
        <path d="M44 30 Q50 4 58 30 M44 72 Q50 98 58 72" fill="#1c1917" stroke="#f97316" strokeWidth="2.5" />
      </g>
    )
  if (species === 'stripedcatfish')
    return (
      <g>
        {/* 黄色いすじと口のひげ */}
        <path d="M24 46 Q50 40 76 46 M24 58 Q50 52 76 58" fill="none" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M30 66 L18 74 M34 68 L24 80 M66 68 L76 80 M70 66 L82 74" fill="none" stroke="#78350f" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'yellowtang')
    return (
      <g>
        {/* つき出た口先と白いとげ */}
        <path d="M18 50 L8 48" fill="none" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
        <path d="M78 56 L86 52" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'parrotfish')
    return (
      <g>
        {/* オウムのくちばしのような口 */}
        <path d="M14 50 Q10 56 16 60 L24 56 Z" fill="#e0f2fe" stroke="#164e63" strokeWidth="2" />
      </g>
    )
  if (species === 'shrimpfish')
    return (
      <g>
        {/* さかだちの体の黒いすじ */}
        <path d="M40 16 L40 84" stroke="#78350f" strokeWidth="3" />
      </g>
    )
  if (species === 'boxfish')
    return (
      <g>
        {/* 四角い体の点もよう */}
        <circle cx="34" cy="44" r="3" fill="#713f12" />
        <circle cx="50" cy="56" r="3" fill="#713f12" />
      </g>
    )
  if (species === 'triggerfish')
    return (
      <g>
        {/* 白い水玉もよう */}
        <circle cx="36" cy="60" r="4" fill="#ffffff" />
        <circle cx="48" cy="66" r="4" fill="#ffffff" />
      </g>
    )
  if (species === 'goby')
    return (
      <g>
        {/* 見はりの大きな目 */}
        <circle cx="30" cy="34" r="6" fill="#ffffff" stroke="#365314" strokeWidth="2" />
        <circle cx="31" cy="34" r="3" fill="#365314" />
      </g>
    )
  if (species === 'lanternfish')
    return (
      <g>
        {/* 体にならぶ光る点 */}
        <circle cx="30" cy="62" r="2.5" fill="#7dd3fc" />
        <circle cx="40" cy="64" r="2.5" fill="#7dd3fc" />
        <circle cx="50" cy="64" r="2.5" fill="#7dd3fc" />
      </g>
    )
  if (species === 'binturong')
    return (
      <g>
        {/* もじゃもじゃの毛 */}
        <path d="M24 30 L28 22 L32 30 L36 22 L40 30" fill="none" stroke="#1c1917" strokeWidth="2" />
      </g>
    )
  if (species === 'kinkajou')
    return (
      <g>
        {/* 長い舌 */}
        <path d="M44 62 Q48 72 44 76" fill="none" stroke="#f472b6" strokeWidth="3" />
      </g>
    )
  if (species === 'numbat')
    return (
      <g>
        {/* せなかの白いしま */}
        <path d="M56 40 L60 56 M64 40 L68 56 M72 42 L74 56" stroke="#ffffff" strokeWidth="3" />
      </g>
    )
  if (species === 'ayeaye')
    return (
      <g>
        {/* 大きな目 */}
        <circle cx="34" cy="38" r="7" fill="#fde68a" stroke="#0c0a09" strokeWidth="2" />
        <circle cx="34" cy="38" r="3" fill="#0c0a09" />
      </g>
    )
  if (species === 'colugo')
    return (
      <g>
        {/* 広げた膜 */}
        <path d="M14 50 Q30 70 50 66 Q70 70 86 50" fill="none" stroke="#292524" strokeWidth="2" />
      </g>
    )
  if (species === 'quoll')
    return (
      <g>
        {/* 白い水玉もよう */}
        <circle cx="38" cy="56" r="3" fill="#ffffff" />
        <circle cx="52" cy="50" r="3" fill="#ffffff" />
        <circle cx="62" cy="60" r="3" fill="#ffffff" />
      </g>
    )
  if (species === 'gerenuk')
    return (
      <g>
        {/* 長い首 */}
        <path d="M50 30 L50 10" stroke="#5c3d1e" strokeWidth="6" strokeLinecap="round" />
      </g>
    )
  if (species === 'saiga')
    return (
      <g>
        {/* ふくらんだ大きな鼻 */}
        <ellipse cx="22" cy="52" rx="8" ry="6" fill="#d6b98a" stroke="#6b4f2a" strokeWidth="2" />
      </g>
    )
  if (species === 'markhor')
    return (
      <g>
        {/* ねじれた角 */}
        <path d="M40 20 Q34 12 40 6 Q46 0 40 -6" fill="none" stroke="#44403c" strokeWidth="3" />
      </g>
    )
  if (species === 'tenrec')
    return (
      <g>
        {/* せなかの針としま */}
        <path d="M34 30 L36 22 M44 28 L46 20 M54 30 L56 22" stroke="#1f2937" strokeWidth="2" />
      </g>
    )
  if (species === 'bilby')
    return (
      <g>
        {/* 長い耳 */}
        <ellipse cx="38" cy="16" rx="5" ry="14" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
        <ellipse cx="58" cy="16" rx="5" ry="14" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
      </g>
    )
  if (species === 'solenodon')
    return (
      <g>
        {/* 長い鼻 */}
        <path d="M24 52 L8 56" stroke="#3f2a06" strokeWidth="4" strokeLinecap="round" />
      </g>
    )
  if (species === 'potoroo')
    return (
      <g>
        {/* 小さなキノコ */}
        <path d="M70 80 Q76 70 82 80 Z" fill="#f87171" stroke="#4a2f1a" strokeWidth="2" />
      </g>
    )
  if (species === 'rockhopper')
    return (
      <g>
        {/* 目の上の黄色いかざり羽 */}
        <path d="M30 30 Q24 24 18 26 M30 32 Q22 30 16 34" fill="none" stroke="#facc15" strokeWidth="2" />
      </g>
    )
  if (species === 'lyrebird')
    return (
      <g>
        {/* 竪琴のような尾羽 */}
        <path d="M70 60 Q90 40 84 20 M70 60 Q96 54 96 30" fill="none" stroke="#a16207" strokeWidth="3" />
      </g>
    )
  if (species === 'kea')
    return (
      <g>
        {/* つばさの下のオレンジ色 */}
        <path d="M60 50 Q72 56 66 68" fill="none" stroke="#f97316" strokeWidth="4" />
      </g>
    )
  if (species === 'kakapo')
    return (
      <g>
        {/* ふくろうのような顔の羽 */}
        <circle cx="40" cy="40" r="10" fill="none" stroke="#1a2e05" strokeWidth="2" />
      </g>
    )
  if (species === 'secretarybird')
    return (
      <g>
        {/* 頭の後ろのかざり羽 */}
        <path d="M30 24 L18 14 M32 22 L22 10 M34 22 L28 8" stroke="#1c1917" strokeWidth="2" />
      </g>
    )
  if (species === 'potoo')
    return (
      <g>
        {/* 枝のような体のもよう */}
        <path d="M50 20 L50 80 M44 40 L56 44 M44 60 L56 56" stroke="#44403c" strokeWidth="2" />
      </g>
    )
  if (species === 'hoatzin')
    return (
      <g>
        {/* 頭のとさか */}
        <path d="M40 18 L36 6 M44 18 L44 4 M48 18 L52 6" stroke="#431407" strokeWidth="2" />
      </g>
    )
  if (species === 'takahe')
    return (
      <g>
        {/* 赤い大きなくちばし */}
        <path d="M18 46 L6 52 L18 56 Z" fill="#dc2626" stroke="#172554" strokeWidth="2" />
      </g>
    )
  if (species === 'frogmouth')
    return (
      <g>
        {/* 大きな口 */}
        <path d="M20 52 Q40 66 60 52" fill="none" stroke="#292524" strokeWidth="3" />
      </g>
    )
  if (species === 'echidna')
    return (
      <g>
        {/* せなかのとげ */}
        <path d="M30 34 L28 24 M40 30 L40 20 M50 30 L52 20 M60 34 L64 24" stroke="#292524" strokeWidth="2" />
      </g>
    )
  if (species === 'sugarglider')
    return (
      <g>
        {/* 大きな目と広げた膜 */}
        <circle cx="38" cy="40" r="5" fill="#111827" />
        <path d="M20 56 Q50 72 80 56" fill="none" stroke="#374151" strokeWidth="2" />
      </g>
    )
  if (species === 'slowloris')
    return (
      <g>
        {/* 大きな丸い目 */}
        <circle cx="36" cy="40" r="7" fill="#fef3c7" stroke="#451a03" strokeWidth="2" />
        <circle cx="56" cy="40" r="7" fill="#fef3c7" stroke="#451a03" strokeWidth="2" />
      </g>
    )
  if (species === 'caracal')
    return (
      <g>
        {/* 耳の先の黒いふさ */}
        <path d="M30 16 L28 4 M62 16 L64 4" stroke="#111827" strokeWidth="3" />
      </g>
    )
  if (species === 'margay')
    return (
      <g>
        {/* 大きな目のまわりの白いふち */}
        <circle cx="38" cy="40" r="6" fill="none" stroke="#fef3c7" strokeWidth="2" />
        <circle cx="58" cy="40" r="6" fill="none" stroke="#fef3c7" strokeWidth="2" />
      </g>
    )
  if (species === 'ocelot')
    return (
      <g>
        {/* 鎖のようにつながったもよう */}
        <path d="M34 60 q6 -6 12 0 q6 6 12 0" fill="none" stroke="#111827" strokeWidth="2" />
      </g>
    )
  if (species === 'fishingcat')
    return (
      <g>
        {/* 前足の水かき */}
        <path d="M30 78 q4 4 8 0 M58 78 q4 4 8 0" fill="none" stroke="#283023" strokeWidth="2" />
      </g>
    )
  if (species === 'sandcat')
    return (
      <g>
        {/* 足の裏の毛 */}
        <path d="M30 80 l2 3 l2 -3 l2 3 M60 80 l2 3 l2 -3 l2 3" fill="none" stroke="#4a3415" strokeWidth="1.5" />
      </g>
    )
  if (species === 'jaguarundi')
    return (
      <g>
        {/* 細長い胴のライン */}
        <path d="M24 64 q24 8 48 0" fill="none" stroke="#1f1712" strokeWidth="2" />
      </g>
    )
  if (species === 'blackfootedcat')
    return (
      <g>
        {/* 黒い足の裏 */}
        <ellipse cx="34" cy="84" rx="5" ry="2.5" fill="#111827" />
        <ellipse cx="62" cy="84" rx="5" ry="2.5" fill="#111827" />
      </g>
    )
  if (species === 'rustyspotted')
    return (
      <g>
        {/* さびいろの点もよう */}
        <circle cx="40" cy="62" r="2" fill="#9a3412" />
        <circle cx="50" cy="66" r="2" fill="#9a3412" />
        <circle cx="58" cy="60" r="2" fill="#9a3412" />
      </g>
    )
  if (species === 'kodkod')
    return (
      <g>
        {/* 黒い点もよう */}
        <circle cx="38" cy="58" r="1.8" fill="#111827" />
        <circle cx="48" cy="64" r="1.8" fill="#111827" />
        <circle cx="60" cy="58" r="1.8" fill="#111827" />
      </g>
    )
  if (species === 'geoffroycat')
    return (
      <g>
        {/* 小さな黒い点 */}
        <circle cx="36" cy="60" r="1.5" fill="#111827" />
        <circle cx="46" cy="56" r="1.5" fill="#111827" />
        <circle cx="56" cy="62" r="1.5" fill="#111827" />
        <circle cx="62" cy="54" r="1.5" fill="#111827" />
      </g>
    )
  if (species === 'andeancat')
    return (
      <g>
        {/* 太いしっぽのしま */}
        <path d="M74 70 l6 -2 M76 74 l6 -2 M78 78 l6 -2" stroke="#292524" strokeWidth="2" />
      </g>
    )
  if (species === 'baycat')
    return (
      <g>
        {/* 長いしっぽの先 */}
        <path d="M76 72 q10 -6 8 -18" fill="none" stroke="#3a1a0c" strokeWidth="2.5" />
      </g>
    )
  if (species === 'oncilla')
    return (
      <g>
        {/* 花の形のもよう */}
        <circle cx="42" cy="60" r="3" fill="none" stroke="#33220f" strokeWidth="1.5" />
        <circle cx="56" cy="62" r="3" fill="none" stroke="#33220f" strokeWidth="1.5" />
      </g>
    )
  if (species === 'chinesemountaincat')
    return (
      <g>
        {/* 先が黒いしっぽ */}
        <circle cx="82" cy="58" r="3" fill="#111827" />
      </g>
    )
  if (species === 'junglecat')
    return (
      <g>
        {/* 耳の先の短いふさ */}
        <path d="M31 15 L30 9 M61 15 L62 9" stroke="#2f2416" strokeWidth="2" />
      </g>
    )
  if (species === 'pampascat')
    return (
      <g>
        {/* 足のしまもよう */}
        <path d="M30 76 h6 M30 80 h6 M60 76 h6 M60 80 h6" stroke="#3a2a14" strokeWidth="1.5" />
      </g>
    )
  if (species === 'marbledcat')
    return (
      <g>
        {/* 大理石のようなまだら */}
        <path d="M36 58 q4 -4 8 0 q-4 4 -8 0 M54 62 q4 -4 8 0 q-4 4 -8 0" fill="#2b1d10" opacity="0.6" />
      </g>
    )
  if (species === 'flatheadedcat')
    return (
      <g>
        {/* 平たい頭のライン */}
        <path d="M30 22 q18 -6 36 0" fill="none" stroke="#24180f" strokeWidth="2" />
      </g>
    )
  if (species === 'cloudedleopard')
    return (
      <g>
        {/* 雲の形のもよう */}
        <path d="M36 60 q3 -5 7 -2 q4 -3 6 2 q-3 4 -6 2 q-4 3 -7 -2 z" fill="none" stroke="#2a1f12" strokeWidth="1.5" />
      </g>
    )
  if (species === 'asiangoldencat')
    return (
      <g>
        {/* 金色のかがやき */}
        <circle cx="70" cy="18" r="3" fill="#facc15" />
      </g>
    )
  if (species === 'serval')
    return (
      <g>
        {/* 大きな耳 */}
        <path d="M28 18 L24 2 L36 14 M64 18 L68 2 L56 14" fill="none" stroke="#3a2508" strokeWidth="2" />
      </g>
    )
  if (species === 'bobcat')
    return (
      <g>
        {/* 短いしっぽ */}
        <path d="M74 66 l6 -3" stroke="#2f1f10" strokeWidth="4" strokeLinecap="round" />
      </g>
    )
  if (species === 'puma')
    return (
      <g>
        {/* 力強い後ろ足 */}
        <path d="M58 74 q8 4 10 12" fill="none" stroke="#3b2614" strokeWidth="2.5" />
      </g>
    )
  if (species === 'iriomotecat')
    return (
      <g>
        {/* 耳の後ろの白い点 */}
        <circle cx="30" cy="20" r="2" fill="#ffffff" />
        <circle cx="62" cy="20" r="2" fill="#ffffff" />
      </g>
    )
  if (species === 'tsushimacat')
    return (
      <g>
        {/* ひたいのたてじま */}
        <path d="M44 22 v8 M48 21 v9 M52 22 v8" stroke="#2b1e11" strokeWidth="1.5" />
      </g>
    )
  if (species === 'amurleopard')
    return (
      <g>
        {/* 梅の花のようなもよう */}
        <circle cx="40" cy="60" r="3.5" fill="none" stroke="#2e1e0c" strokeWidth="1.5" />
        <circle cx="56" cy="58" r="3.5" fill="none" stroke="#2e1e0c" strokeWidth="1.5" />
      </g>
    )
  if (species === 'canadalynx')
    return (
      <g>
        {/* 大きな足 */}
        <ellipse cx="34" cy="84" rx="7" ry="3" fill="#2c261c" opacity="0.5" />
        <ellipse cx="62" cy="84" rx="7" ry="3" fill="#2c261c" opacity="0.5" />
      </g>
    )
  if (species === 'iberianlynx')
    return (
      <g>
        {/* ほおの長い毛 */}
        <path d="M24 48 l-6 6 l6 -1 M72 48 l6 6 l-6 -1" fill="none" stroke="#2e1d0b" strokeWidth="1.5" />
      </g>
    )
  if (species === 'arabianleopard')
    return (
      <g>
        {/* うすい色のもよう */}
        <circle cx="42" cy="58" r="3" fill="none" stroke="#3a2610" strokeWidth="1" opacity="0.6" />
        <circle cx="54" cy="62" r="3" fill="none" stroke="#3a2610" strokeWidth="1" opacity="0.6" />
      </g>
    )
  if (species === 'sumatrantiger')
    return (
      <g>
        {/* こく細かいしま */}
        <path d="M34 54 l4 10 M42 52 l4 12 M50 52 l4 12 M58 54 l4 10" stroke="#1f1206" strokeWidth="2" />
      </g>
    )
  if (species === 'bengaltiger')
    return (
      <g>
        {/* 太い黒いしま */}
        <path d="M30 50 l6 14 M44 48 l4 16 M56 48 l-2 16 M66 50 l-6 14" stroke="#1c1005" strokeWidth="3" />
      </g>
    )
  if (species === 'amurtiger')
    return (
      <g>
        {/* 冬毛のしま */}
        <path d="M32 52 l5 12 M46 50 l3 14 M58 50 l-3 14" stroke="#1d1207" strokeWidth="2.5" />
      </g>
    )
  if (species === 'takin')
    return (
      <g>
        {/* 太いつの */}
        <path d="M34 26 q-8 -6 -4 -14 M66 26 q8 -6 4 -14" stroke="#2a1d0a" strokeWidth="3" fill="none" />
      </g>
    )
  if (species === 'sunbear')
    return (
      <g>
        {/* 胸の太陽もよう */}
        <path d="M38 62 q12 -8 24 0 q-12 6 -24 0 z" fill="#f59e0b" />
      </g>
    )
  if (species === 'gharial')
    return (
      <g>
        {/* 細長い口 */}
        <path d="M40 58 h34 q4 2 0 4 h-34" stroke="#1c2412" strokeWidth="2" fill="#7d935a" />
      </g>
    )
  if (species === 'dhole')
    return (
      <g>
        {/* ふさふさの黒いしっぽ */}
        <path d="M78 66 q14 -2 12 -16 q-6 8 -14 10 z" fill="#2b0f05" />
      </g>
    )
  if (species === 'fossa')
    return (
      <g>
        {/* 長いしっぽ */}
        <path d="M76 70 q18 4 20 -14" stroke="#24150b" strokeWidth="4" fill="none" />
      </g>
    )
  if (species === 'hyrax')
    return (
      <g>
        {/* 岩のかけら */}
        <path d="M20 84 l10 -8 l12 4 l6 6 z" fill="#78716c" />
      </g>
    )
  if (species === 'jerboa')
    return (
      <g>
        {/* 長いしっぽとふさ */}
        <path d="M74 74 q16 6 22 -4" stroke="#3a2a12" strokeWidth="2" fill="none" />
        <circle cx="96" cy="70" r="3" fill="#f5f5f4" />
      </g>
    )
  if (species === 'sifaka')
    return (
      <g>
        {/* 茶色の頭のぼうし */}
        <path d="M36 24 q14 -10 28 0 q-14 4 -28 0 z" fill="#78350f" />
      </g>
    )
  if (species === 'saola')
    return (
      <g>
        {/* まっすぐな2本のつの */}
        <path d="M40 24 l-6 -18 M60 24 l6 -18" stroke="#1f130a" strokeWidth="3" />
      </g>
    )
  if (species === 'aardwolf')
    return (
      <g>
        {/* 背中のたてがみ */}
        <path d="M30 34 l4 -8 l4 8 l4 -8 l4 8 l4 -8 l4 8" stroke="#2b1f0e" strokeWidth="2" fill="none" />
      </g>
    )
  if (species === 'genet')
    return (
      <g>
        {/* しまもようのしっぽ */}
        <path d="M76 72 q18 0 22 -16" stroke="#d8c7a6" strokeWidth="5" fill="none" />
        <path d="M84 72 l2 -4 M91 68 l3 -3 M96 61 l3 -2" stroke="#1c140b" strokeWidth="2" />
      </g>
    )
  if (species === 'tamarin')
    return (
      <g>
        {/* 白い口ひげ */}
        <path d="M44 60 q-10 4 -14 14 M56 60 q10 4 14 14" stroke="#f5f5f4" strokeWidth="2.5" fill="none" />
      </g>
    )
  if (species === 'cassowary')
    return (
      <g>
        {/* かぶとのとさかと青い首 */}
        <path d="M44 22 q6 -14 12 0 z" fill="#a16207" />
        <path d="M44 70 q6 6 12 0" stroke="#2563eb" strokeWidth="4" fill="none" />
      </g>
    )
  if (species === 'tuatara')
    return (
      <g>
        {/* 背中のとげのたてがみ */}
        <path d="M30 40 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6 l4 -6 l4 6" stroke="#e7e5e4" strokeWidth="1.5" fill="none" />
      </g>
    )
  if (species === 'cuscus')
    return (
      <g>
        {/* 枝にまきつくしっぽ */}
        <path d="M74 74 q14 6 16 -6 q-2 -8 -8 -4" stroke="#2b2418" strokeWidth="3" fill="none" />
      </g>
    )
  if (species === 'possum')
    return (
      <g>
        {/* ふさふさのしっぽ */}
        <path d="M74 70 q20 2 18 -18 q-8 10 -18 10 z" fill="#22201e" />
      </g>
    )
  if (species === 'olingo')
    return (
      <g>
        {/* 大きな目のまわりのくまどり */}
        <circle cx="42" cy="44" r="6" fill="#2a1a0c" opacity="0.35" />
        <circle cx="58" cy="44" r="6" fill="#2a1a0c" opacity="0.35" />
      </g>
    )
  if (species === 'potto')
    return (
      <g>
        {/* 枝をにぎる手 */}
        <path d="M24 78 h52" stroke="#5b3a1e" strokeWidth="4" />
        <circle cx="34" cy="76" r="4" fill="#241a10" /><circle cx="66" cy="76" r="4" fill="#241a10" />
      </g>
    )
  if (species === 'zorilla')
    return (
      <g>
        {/* 白いしまもよう */}
        <path d="M36 30 q14 20 4 44 M64 30 q-14 20 -4 44" stroke="#fafaf9" strokeWidth="4" fill="none" />
      </g>
    )
  if (species === 'ringtail')
    return (
      <g>
        {/* わっかもようのしっぽ */}
        <path d="M74 72 q20 -2 22 -20" stroke="#f5f5f4" strokeWidth="6" fill="none" />
        <path d="M80 72 l1 -5 M87 69 l2 -5 M92 63 l3 -4 M95 56 l4 -2" stroke="#2a2014" strokeWidth="2.5" />
      </g>
    )
  if (species === 'sunbittern')
    return (
      <g>
        {/* つばさの目玉もよう */}
        <circle cx="28" cy="56" r="7" fill="#f97316" /><circle cx="28" cy="56" r="3" fill="#231a10" />
        <circle cx="72" cy="56" r="7" fill="#f97316" /><circle cx="72" cy="56" r="3" fill="#231a10" />
      </g>
    )
  if (species === 'angwantibo')
    return (
      <g>
        {/* 金色の毛のつや */}
        <path d="M30 40 q20 -12 40 0" stroke="#fde68a" strokeWidth="2" fill="none" />
      </g>
    )
  if (species === 'kagu')
    return (
      <g>
        {/* 頭のかんむり羽 */}
        <path d="M46 24 q-10 -8 -18 -2 M50 22 q-6 -12 -16 -10" stroke="#a8a29e" strokeWidth="2.5" fill="none" />
      </g>
    )
  if (species === 'viscacha')
    return (
      <g>
        {/* 長い耳と巻いたしっぽ */}
        <path d="M40 22 l-4 -16 M60 22 l4 -16" stroke="#2a241c" strokeWidth="3" />
        <path d="M76 70 q14 -2 10 -14 q-6 2 -4 8" stroke="#2a241c" strokeWidth="3" fill="none" />
      </g>
    )
  if (species === 'mara')
    return (
      <g>
        {/* 長い足 */}
        <path d="M40 76 l-2 14 M60 76 l2 14" stroke="#2a1f12" strokeWidth="3" />
      </g>
    )
  if (species === 'degu')
    return (
      <g>
        {/* しっぽの先のふさ */}
        <path d="M74 72 q12 4 18 -4" stroke="#251a0e" strokeWidth="2" fill="none" />
        <circle cx="92" cy="68" r="3.5" fill="#251a0e" />
      </g>
    )
  if (species === 'agouti')
    return (
      <g>
        {/* かかえた木の実 */}
        <circle cx="50" cy="72" r="6" fill="#78350f" />
        <path d="M46 68 q4 -4 8 0" stroke="#3f2a10" strokeWidth="1.5" fill="none" />
      </g>
    )
  if (species === 'pacarana')
    return (
      <g>
        {/* 背中の白いはん点 */}
        <circle cx="38" cy="50" r="3" fill="#f5f5f4" /><circle cx="50" cy="48" r="3" fill="#f5f5f4" /><circle cx="62" cy="50" r="3" fill="#f5f5f4" />
      </g>
    )
  if (species === 'springhare')
    return (
      <g>
        {/* 長い後ろ足 */}
        <path d="M44 78 l-8 12 h8 M58 78 l8 12 h-8" stroke="#2a1d0c" strokeWidth="3" fill="none" />
      </g>
    )
  if (species === 'hutia')
    return (
      <g>
        {/* するどいつめ */}
        <path d="M36 82 l-3 4 M40 82 l-1 5 M60 82 l1 5 M64 82 l3 4" stroke="#1f1810" strokeWidth="2" />
      </g>
    )
  if (species === 'tayra')
    return (
      <g>
        {/* のどの黄色いもよう */}
        <path d="M42 62 q8 8 16 0 q-8 4 -16 0 z" fill="#eab308" />
      </g>
    )
  if (species === 'oryx')
    return (
      <g>
        {/* 2本のまっすぐなツノ */}
        <path d="M40 30 l-6 -24 M60 30 l6 -24" stroke="#5b4636" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'pudu')
    return (
      <g>
        {/* 小さなとがったツノ */}
        <path d="M42 28 l-2 -8 M58 28 l2 -8" stroke="#3d2817" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'ibex')
    return (
      <g>
        {/* 弓なりの大きなツノ */}
        <path d="M40 30 q-14 -10 -6 -26 M60 30 q14 -10 6 -26" stroke="#4a3620" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'olinguito')
    return (
      <g>
        {/* 丸い耳 */}
        <circle cx="34" cy="26" r="6" fill="#b5672e" stroke="#4a2510" strokeWidth="2" />
        <circle cx="66" cy="26" r="6" fill="#b5672e" stroke="#4a2510" strokeWidth="2" />
      </g>
    )
  if (species === 'mongoose')
    return (
      <g>
        {/* ふさふさのしっぽ */}
        <path d="M78 70 q16 -4 14 -22" stroke="#3f3527" strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'marmot')
    return (
      <g>
        {/* 大きな前歯 */}
        <rect x="46" y="58" width="8" height="7" rx="1" fill="#fefce8" stroke="#3b2a17" strokeWidth="1.5" />
      </g>
    )
  if (species === 'paca')
    return (
      <g>
        {/* 体の白い点のもよう */}
        <circle cx="36" cy="66" r="2.5" fill="#fef9c3" />
        <circle cx="46" cy="70" r="2.5" fill="#fef9c3" />
        <circle cx="56" cy="70" r="2.5" fill="#fef9c3" />
        <circle cx="66" cy="66" r="2.5" fill="#fef9c3" />
      </g>
    )
  if (species === 'dormouse')
    return (
      <g>
        {/* 背中の黒いすじ */}
        <path d="M50 30 L50 70" stroke="#3f2a10" strokeWidth="3" strokeLinecap="round" />
      </g>
    )
  if (species === 'mountainhare')
    return (
      <g>
        {/* 耳の先の黒いもよう */}
        <path d="M38 14 l-2 -6 l5 3 z M62 14 l2 -6 l-5 3 z" fill="#1f2937" />
      </g>
    )
  if (species === 'gerbil')
    return (
      <g>
        {/* 長いしっぽの先のふさ */}
        <path d="M78 72 q14 4 18 -8" stroke="#6b4a1f" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="96" cy="63" r="3" fill="#6b4a1f" />
      </g>
    )
  if (species === 'howler')
    return (
      <g>
        {/* ふくらんだのど */}
        <ellipse cx="50" cy="66" rx="9" ry="6" fill="#6b4226" stroke="#1c0f06" strokeWidth="1.5" />
      </g>
    )
  if (species === 'squirrelmonkey')
    return (
      <g>
        {/* 白い顔と黒い口元 */}
        <ellipse cx="50" cy="48" rx="12" ry="10" fill="#fafaf9" />
        <ellipse cx="50" cy="54" rx="5" ry="3.5" fill="#1c1917" />
      </g>
    )
  if (species === 'gibbon')
    return (
      <g>
        {/* 長いうで */}
        <path d="M24 56 q-14 -18 -6 -38 M76 56 q14 -18 6 -38" stroke="#151210" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'uakari')
    return (
      <g>
        {/* まっかな顔 */}
        <ellipse cx="50" cy="46" rx="13" ry="11" fill="#dc2626" />
      </g>
    )
  if (species === 'capuchin')
    return (
      <g>
        {/* 頭の上の黒い毛 */}
        <path d="M38 28 q12 -10 24 0 q-12 -4 -24 0 z" fill="#1c1209" />
      </g>
    )
  if (species === 'titi')
    return (
      <g>
        {/* くるっとまいた長いしっぽ */}
        <path d="M76 74 q18 2 14 16 q-4 8 -12 2" stroke="#3e2614" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'langur')
    return (
      <g>
        {/* 黒い顔 */}
        <ellipse cx="50" cy="46" rx="11" ry="10" fill="#1c1917" />
      </g>
    )
  if (species === 'indri')
    return (
      <g>
        {/* 白と黒のもよう */}
        <path d="M30 60 q20 10 40 0 l0 10 q-20 10 -40 0 z" fill="#1f1d1a" />
      </g>
    )
  if (species === 'saki')
    return (
      <g>
        {/* お面のような白い顔 */}
        <ellipse cx="50" cy="46" rx="13" ry="12" fill="#f5f0e6" />
      </g>
    )
  if (species === 'bowerbird')
    return (
      <g>
        {/* むらさき色の目 */}
        <circle cx="42" cy="40" r="3" fill="#a78bfa" />
        <circle cx="58" cy="40" r="3" fill="#a78bfa" />
      </g>
    )
  if (species === 'quetzal')
    return (
      <g>
        {/* 赤いおなか */}
        <ellipse cx="50" cy="66" rx="12" ry="9" fill="#dc2626" />
      </g>
    )
  if (species === 'roadrunner')
    return (
      <g>
        {/* 頭のとさか */}
        <path d="M44 22 l4 -10 l4 10 l4 -8 l2 10" stroke="#3b2d1c" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'weaver')
    return (
      <g>
        {/* 黒い顔 */}
        <path d="M38 40 q12 14 24 0 q-2 10 -12 12 q-10 -2 -12 -12 z" fill="#1c1917" />
      </g>
    )
  if (species === 'emu')
    return (
      <g>
        {/* 長い首 */}
        <path d="M50 30 l0 -16" stroke="#2a2018" strokeWidth="6" strokeLinecap="round" />
      </g>
    )
  if (species === 'sunbird')
    return (
      <g>
        {/* 細く曲がったくちばし */}
        <path d="M60 46 q14 2 18 12" stroke="#082f49" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'weka')
    return (
      <g>
        {/* まだらもよう */}
        <circle cx="40" cy="62" r="2.5" fill="#33240f" />
        <circle cx="52" cy="66" r="2.5" fill="#33240f" />
        <circle cx="62" cy="60" r="2.5" fill="#33240f" />
      </g>
    )
  if (species === 'dikdik')
    return (
      <g>
        {/* 大きな目 */}
        <circle cx="40" cy="42" r="5" fill="#1c1917" />
        <circle cx="60" cy="42" r="5" fill="#1c1917" />
      </g>
    )
  if (species === 'kudu')
    return (
      <g>
        {/* らせんのツノ */}
        <path d="M40 28 q-10 -8 -2 -14 q6 -6 -2 -14 M60 28 q10 -8 2 -14 q-6 -6 2 -14" stroke="#3a2e20" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'springbok')
    return (
      <g>
        {/* わき腹のこい茶色の帯 */}
        <path d="M28 62 q22 6 44 0" stroke="#5a3410" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'bongo')
    return (
      <g>
        {/* 白いたてじま */}
        <path d="M36 54 l0 18 M44 54 l0 18 M52 54 l0 18 M60 54 l0 18" stroke="#fef3c7" strokeWidth="2" strokeLinecap="round" />
      </g>
    )
  if (species === 'nyala')
    return (
      <g>
        {/* 背中のたてがみ */}
        <path d="M34 34 q16 -6 32 0" stroke="#211913" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'addax')
    return (
      <g>
        {/* おでこのまき毛 */}
        <path d="M42 30 q8 -8 16 0" stroke="#7c5a3a" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'klipspringer')
    return (
      <g>
        {/* 岩のあしば */}
        <path d="M30 86 q20 -8 40 0" stroke="#78716c" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'sitatunga')
    return (
      <g>
        {/* 沼の水面 */}
        <path d="M28 88 q11 -5 22 0 q11 5 22 0" stroke="#0e7490" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'duiker')
    return (
      <g>
        {/* しげみの葉 */}
        <path d="M26 84 q8 -10 16 0 q8 -10 16 0" stroke="#15803d" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'steenbok')
    return (
      <g>
        {/* 大きな耳 */}
        <path d="M34 30 q-6 -12 2 -18 M66 30 q6 -12 -2 -18" stroke="#431407" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'chamois')
    return (
      <g>
        {/* かぎ形のツノ */}
        <path d="M40 26 q-2 -12 6 -12 M60 26 q2 -12 -6 -12" stroke="#1c1917" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'blackbuck')
    return (
      <g>
        {/* らせんのツノ */}
        <path d="M40 28 l-4 -6 l4 -4 l-4 -6 M60 28 l4 -6 l-4 -4 l4 -6" stroke="#0c0a09" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'hartebeest')
    return (
      <g>
        {/* 曲がったツノ */}
        <path d="M42 24 q-6 -8 2 -14 M58 24 q6 -8 -2 -14" stroke="#451a03" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'bontebok')
    return (
      <g>
        {/* 顔の白いすじ */}
        <path d="M50 30 v22" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'topi')
    return (
      <g>
        {/* 足のこいもよう */}
        <path d="M38 78 v10 M62 78 v10" stroke="#3b0764" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'kob')
    return (
      <g>
        {/* たてごと形のツノ */}
        <path d="M42 26 q-6 -6 0 -12 q4 -4 0 -8 M58 26 q6 -6 0 -12 q-4 -4 0 -8" stroke="#4a2a10" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'bushbuck')
    return (
      <g>
        {/* 白い点々 */}
        <circle cx="40" cy="62" r="2.5" fill="#ffffff" />
        <circle cx="50" cy="66" r="2.5" fill="#ffffff" />
        <circle cx="60" cy="62" r="2.5" fill="#ffffff" />
      </g>
    )
  if (species === 'impala')
    return (
      <g>
        {/* おしりの黒いすじ */}
        <path d="M72 58 v14" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'sable')
    return (
      <g>
        {/* 弓なりのツノ */}
        <path d="M42 26 q-4 -14 10 -20 M58 26 q4 -14 18 -16" stroke="#000000" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'nilgai')
    return (
      <g>
        {/* のどの毛のふさ */}
        <path d="M50 56 v10" stroke="#0f172a" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'eland')
    return (
      <g>
        {/* ねじれたまっすぐなツノ */}
        <path d="M44 26 l-4 -18 M56 26 l4 -18" stroke="#3f2a16" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'lechwe')
    return (
      <g>
        {/* 足もとの水しぶき */}
        <path d="M30 88 q6 -6 12 0 M58 88 q6 -6 12 0" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'roan')
    return (
      <g>
        {/* 長い耳のふさ */}
        <path d="M30 34 l-8 -8 M70 34 l8 -8" stroke="#3b2416" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'waterbuck')
    return (
      <g>
        {/* おしりの白い輪 */}
        <circle cx="74" cy="64" r="6" stroke="#ffffff" strokeWidth="3" fill="none" />
      </g>
    )
  if (species === 'oribi')
    return (
      <g>
        {/* 耳の下の黒いもよう */}
        <circle cx="36" cy="40" r="3" fill="#1c1917" />
        <circle cx="64" cy="40" r="3" fill="#1c1917" />
      </g>
    )
  if (species === 'reedbuck')
    return (
      <g>
        {/* 口笛の音 */}
        <path d="M70 48 q6 -4 10 0 M74 42 q6 -4 10 0" stroke="#4a3518" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'puku')
    return (
      <g>
        {/* 金色のきらめき */}
        <path d="M78 30 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 l4 -2 z" fill="#fde047" />
      </g>
    )
  if (species === 'suni')
    return (
      <g>
        {/* ふるしっぽ */}
        <path d="M74 60 q8 -4 6 -12" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'grysbok')
    return (
      <g>
        {/* しもふりの白い毛 */}
        <circle cx="42" cy="58" r="1.5" fill="#ffffff" />
        <circle cx="50" cy="62" r="1.5" fill="#ffffff" />
        <circle cx="58" cy="58" r="1.5" fill="#ffffff" />
        <circle cx="46" cy="66" r="1.5" fill="#ffffff" />
      </g>
    )
  if (species === 'chiru')
    return (
      <g>
        {/* まっすぐ長いツノ */}
        <path d="M44 26 l-2 -22 M56 26 l2 -22" stroke="#4a3820" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'gazelle')
    return (
      <g>
        {/* わき腹の茶色いすじ */}
        <path d="M34 62 h32" stroke="#7c4a1e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'muntjac')
    return (
      <g>
        {/* 小さなキバ */}
        <path d="M46 56 v5 M54 56 v5" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'tahr')
    return (
      <g>
        {/* 首のふさふさの毛 */}
        <path d="M34 46 q-6 8 -2 16 M66 46 q6 8 2 16" stroke="#2e2014" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'goral')
    return (
      <g>
        {/* のどの白いもよう */}
        <path d="M44 54 q6 6 12 0" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'argali')
    return (
      <g>
        {/* うずまきのツノ */}
        <circle cx="34" cy="34" r="7" stroke="#3a2a18" strokeWidth="4" fill="none" />
        <circle cx="66" cy="34" r="7" stroke="#3a2a18" strokeWidth="4" fill="none" />
      </g>
    )
  if (species === 'urial')
    return (
      <g>
        {/* 胸の黒い毛 */}
        <path d="M46 54 v12 M50 54 v14 M54 54 v12" stroke="#1c1917" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'bharal')
    return (
      <g>
        {/* 横に広がるツノ */}
        <path d="M36 30 q-10 -4 -14 4 M64 30 q10 -4 14 4" stroke="#57534e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'tamaraw')
    return (
      <g>
        {/* V字のツノ */}
        <path d="M40 28 l-6 -8 M60 28 l6 -8" stroke="#292524" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'anoa')
    return (
      <g>
        {/* まっすぐな短いツノ */}
        <path d="M42 28 l-3 -8 M58 28 l3 -8" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'gaur')
    return (
      <g>
        {/* 白いくつ下 */}
        <path d="M36 82 h6 M58 82 h6" stroke="#f5f5f4" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'banteng')
    return (
      <g>
        {/* 白いおしり */}
        <ellipse cx="50" cy="74" rx="8" ry="4" fill="#fafaf9" />
      </g>
    )
  if (species === 'chital')
    return (
      <g>
        {/* 白いはんてん */}
        <circle cx="40" cy="60" r="2" fill="#fff7ed" />
        <circle cx="50" cy="64" r="2" fill="#fff7ed" />
        <circle cx="60" cy="60" r="2" fill="#fff7ed" />
      </g>
    )
  if (species === 'sambar')
    return (
      <g>
        {/* 太い三つまたのツノ */}
        <path d="M40 28 l-4 -10 l-4 3 M60 28 l4 -10 l4 3" stroke="#3f2a1e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'huemul')
    return (
      <g>
        {/* 顔の黒い模様 */}
        <path d="M46 44 l4 6 l4 -6" stroke="#1c1917" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'waterdeer')
    return (
      <g>
        {/* 長いキバ */}
        <path d="M46 56 v6 M54 56 v6" stroke="#fafaf9" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'milu')
    return (
      <g>
        {/* ロバのようなしっぽ */}
        <path d="M70 66 q8 4 6 14" stroke="#3a2614" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'barasingha')
    return (
      <g>
        {/* たくさんにえだ分かれしたツノ */}
        <path d="M40 28 l-6 -10 M37 23 l-6 -2 M60 28 l6 -10 M63 23 l6 -2" stroke="#57534e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'rusa')
    return (
      <g>
        {/* のどのたてがみ */}
        <path d="M44 58 q6 6 12 0" stroke="#5c3d1e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'visayandeer')
    return (
      <g>
        {/* 黄色い星のはんてん */}
        <circle cx="42" cy="62" r="2" fill="#facc15" />
        <circle cx="52" cy="66" r="2" fill="#facc15" />
        <circle cx="60" cy="61" r="2" fill="#facc15" />
      </g>
    )
  if (species === 'baweandeer')
    return (
      <g>
        {/* 夜にかがやく目 */}
        <circle cx="44" cy="40" r="1.5" fill="#fde68a" />
        <circle cx="56" cy="40" r="1.5" fill="#fde68a" />
      </g>
    )
  if (species === 'calamiandeer')
    return (
      <g>
        {/* みじかいツノ */}
        <path d="M44 28 l-2 -6 M56 28 l2 -6" stroke="#44403c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'whitelipped')
    return (
      <g>
        {/* 白い口もと */}
        <ellipse cx="50" cy="52" rx="6" ry="3" fill="#fafaf9" />
      </g>
    )
  if (species === 'eldsdeer')
    return (
      <g>
        {/* 弓のように曲がったツノ */}
        <path d="M40 28 q-8 -10 2 -14 M60 28 q8 -10 -2 -14" stroke="#57534e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'brocket')
    return (
      <g>
        {/* 短いまっすぐなツノ */}
        <path d="M45 28 v-6 M55 28 v-6" stroke="#44403c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'marshdeer')
    return (
      <g>
        {/* 黒い足先 */}
        <path d="M38 84 h6 M56 84 h6" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'pampasdeer')
    return (
      <g>
        {/* 背の高い草 */}
        <path d="M24 86 l2 -10 M30 86 l-1 -12 M70 86 l1 -12 M76 86 l-2 -10" stroke="#65a30d" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'muledeer')
    return (
      <g>
        {/* ラバのような大きな耳 */}
        <ellipse cx="32" cy="34" rx="7" ry="4" fill="#8f7154" />
        <ellipse cx="68" cy="34" rx="7" ry="4" fill="#8f7154" />
      </g>
    )
  if (species === 'whitetail')
    return (
      <g>
        {/* 旗のような白いしっぽ */}
        <ellipse cx="72" cy="58" rx="3" ry="6" fill="#fafaf9" />
      </g>
    )
  if (species === 'fallowdeer')
    return (
      <g>
        {/* シャベルのように平たいツノ */}
        <path d="M38 28 q-10 -6 -6 -14 q6 2 8 10 M62 28 q10 -6 6 -14 q-6 2 -8 10" stroke="#57534e" strokeWidth="2.5" fill="#d6d3d1" strokeLinecap="round" />
      </g>
    )
  if (species === 'tufteddeer')
    return (
      <g>
        {/* ふさふさの前がみ */}
        <path d="M42 30 q8 -8 16 0" stroke="#1c1917" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    )
  if (species === 'woodpecker')
    return (
      <g>
        {/* 赤いとさかと、とがった長いくちばし */}
        <path d="M38 22 Q50 6 62 22 Q50 18 38 22 Z" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M45 64 L55 64 L50 80 Z" fill="#78716c" stroke="#292524" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    )
  if (species === 'hummingbird')
    return (
      <g>
        {/* 細長いくちばし */}
        <path d="M50 64 L72 70 L50 70 Z" fill="#1f2937" />
      </g>
    )
  if (species === 'whale')
    return (
      <g stroke="#7dd3fc" strokeWidth="2.5" strokeLinecap="round" fill="none">
        {/* 頭の上のしおふき */}
        <path d="M50 26 L50 12 M50 14 Q42 6 36 12 M50 14 Q58 6 64 12" />
      </g>
    )
  if (species === 'jellyfish')
    return (
      <g stroke={line} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8">
        {/* 頭の上でゆれる、ふわふわのかさのもよう */}
        <path d="M30 30 Q40 18 50 30 Q60 18 70 30" />
      </g>
    )
  if (species === 'badger')
    return (
      <g>
        {/* 顔の真ん中の白いすじ */}
        <path d="M46 24 Q50 22 54 24 L53 60 Q50 62 47 60 Z" fill="#f5f5f4" opacity="0.9" />
      </g>
    )
  if (species === 'mouse')
    return (
      <g>
        {/* 小さなピンクの鼻と、ひげ */}
        <circle cx="50" cy="66" r="3.5" fill="#f9a8d4" />
        <path d="M44 68 L30 64 M44 70 L30 72 M56 68 L70 64 M56 70 L70 72" stroke="#52525b" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    )
  if (species === 'beaver')
    return (
      <g>
        {/* 大きな前歯 */}
        <rect x="45" y="70" width="10" height="9" rx="1.5" fill="#fff" stroke="#78350f" strokeWidth="1.5" />
        <path d="M50 70 L50 79" stroke="#78350f" strokeWidth="1.2" />
      </g>
    )
  if (species === 'pig')
    return (
      <g>
        {/* まるい鼻と、ふたつの鼻の穴 */}
        <ellipse cx="50" cy="68" rx="10" ry="7" fill="#f9a8d4" stroke="#9d174d" strokeWidth="1.5" />
        <ellipse cx="46" cy="68" rx="1.8" ry="2.5" fill="#9d174d" />
        <ellipse cx="54" cy="68" rx="1.8" ry="2.5" fill="#9d174d" />
      </g>
    )
  if (species === 'chicken')
    return (
      <g fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" strokeLinejoin="round">
        {/* 頭の上の赤いとさか */}
        <path d="M38 30 Q36 16 44 20 Q46 8 52 18 Q58 8 60 20 Q68 18 62 30 Z" />
      </g>
    )
  if (species === 'squid')
    return (
      <g fill={fill} stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        {/* 頭の上の三角のひれ */}
        <path d="M30 34 L50 4 L70 34 Z" />
      </g>
    )
  if (species === 'duck')
    return (
      <g>
        {/* 平たいオレンジのくちばし */}
        <ellipse cx="50" cy="68" rx="12" ry="5" fill="#fb923c" stroke="#9a3412" strokeWidth="1.5" />
      </g>
    )
  if (species === 'parrot')
    return (
      <g>
        {/* 曲がったくちばし */}
        <path d="M44 62 Q50 56 58 62 Q58 74 50 78 Q54 70 44 62 Z" fill="#facc15" stroke="#a16207" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    )
  if (species === 'polarbear')
    return (
      <g stroke={line} strokeWidth="2.5">
        {/* 小さなまるい白い耳 */}
        <circle cx="27" cy="27" r="8" fill={fill} />
        <circle cx="73" cy="27" r="8" fill={fill} />
      </g>
    )
  if (species === 'camel')
    return (
      <g fill={fill} stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        {/* 頭のうしろに見えるふたつのこぶ */}
        <path d="M24 34 Q32 14 42 30 Q50 16 58 30 Q68 14 76 34 Z" />
      </g>
    )
  if (species === 'seahorse')
    return (
      <g fill={fill} stroke={line} strokeWidth="2" strokeLinejoin="round">
        {/* 頭の上の小さなかんむりのようなとげ */}
        <path d="M40 28 L44 14 L50 24 L56 12 L60 28 Z" />
      </g>
    )
  if (species === 'bat')
    return (
      <g fill={fill} stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        {/* 大きくとがった耳 */}
        <path d="M24 42 L18 8 L40 30 Z" />
        <path d="M76 42 L82 8 L60 30 Z" />
      </g>
    )
  if (species === 'wolf')
    return (
      <g fill={fill} stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        {/* ぴんと立ったとがった耳 */}
        <path d="M22 40 L26 10 L42 30 Z" />
        <path d="M78 40 L74 10 L58 30 Z" />
      </g>
    )
  if (species === 'peacock')
    return (
      <g stroke={line} strokeWidth="1.5">
        {/* 頭の上の小さなかざり羽 */}
        <path d="M50 30 L42 12 M50 30 L50 8 M50 30 L58 12" fill="none" />
        <circle cx="42" cy="11" r="3.5" fill="#1d4ed8" />
        <circle cx="50" cy="7" r="3.5" fill="#1d4ed8" />
        <circle cx="58" cy="11" r="3.5" fill="#1d4ed8" />
      </g>
    )
  if (species === 'chameleon')
    return (
      <g stroke={line} strokeWidth="2" strokeLinejoin="round">
        {/* 頭の上のとさか */}
        <path d="M36 30 Q50 6 64 30 Q50 22 36 30 Z" fill={fill} />
      </g>
    )
  if (species === 'tiger')
    return (
      <g stroke={line} strokeWidth="3" strokeLinecap="round" fill="none">
        {/* ひたいのしまもよう */}
        <path d="M40 30 L44 40 M50 26 L50 38 M60 30 L56 40" />
      </g>
    )
  if (species === 'crab')
    return (
      <g stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        {/* 頭の上の大きなハサミ */}
        <path d="M18 34 L10 16 L22 22 L24 12 L30 30 Z" fill={fill} />
        <path d="M82 34 L90 16 L78 22 L76 12 L70 30 Z" fill={fill} />
      </g>
    )
  if (species === 'hippo')
    return (
      <g>
        {/* 大きな鼻づらと、ふたつの鼻の穴 */}
        <ellipse cx="50" cy="72" rx="18" ry="11" fill="#ddd6fe" opacity="0.9" />
        <ellipse cx="44" cy="70" rx="2.5" ry="3" fill="#4c1d95" />
        <ellipse cx="56" cy="70" rx="2.5" ry="3" fill="#4c1d95" />
      </g>
    )
  if (species === 'dolphin')
    return (
      <g stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        {/* 頭の上のせびれ */}
        <path d="M44 28 Q52 6 64 22 Q56 24 52 30 Z" fill={fill} />
      </g>
    )
  if (species === 'mole')
    return (
      <g>
        {/* ピンクのとがった鼻 */}
        <ellipse cx="50" cy="68" rx="7" ry="5" fill="#f9a8d4" stroke="#be185d" strokeWidth="1.5" />
      </g>
    )
  if (species === 'alpaca')
    return (
      <g>
        {/* 頭の上のもこもこの毛 */}
        <g fill="#fffbeb" stroke="#d6b88a" strokeWidth="1.5">
          <circle cx="38" cy="24" r="9" />
          <circle cx="50" cy="20" r="10" />
          <circle cx="62" cy="24" r="9" />
        </g>
      </g>
    )
  if (species === 'sloth')
    return (
      <g>
        {/* 目からのびる、たれた茶色のもよう */}
        <path d="M24 46 Q34 44 44 54 Q36 60 26 56 Z M76 46 Q66 44 56 54 Q64 60 74 56 Z" fill="#78716c" opacity="0.6" />
      </g>
    )
  if (species === 'raccoon')
    return (
      <g>
        {/* 目のまわりの黒いマスク */}
        <path d="M22 50 Q36 40 48 52 Q36 60 22 50 Z M78 50 Q64 40 52 52 Q64 60 78 50 Z" fill="#292524" opacity="0.55" />
      </g>
    )
  if (species === 'frog')
    return (
      <g stroke={line} strokeWidth="2.5">
        {/* 頭の上にとび出た大きな目 */}
        <circle cx="32" cy="24" r="10" fill={fill} />
        <circle cx="68" cy="24" r="10" fill={fill} />
        <circle cx="32" cy="24" r="5" fill="#fff" stroke="none" />
        <circle cx="68" cy="24" r="5" fill="#fff" stroke="none" />
        <circle cx="33" cy="25" r="2.5" fill="#1f2937" stroke="none" />
        <circle cx="69" cy="25" r="2.5" fill="#1f2937" stroke="none" />
      </g>
    )
  if (species === 'snail')
    return (
      <g stroke={line} strokeWidth="2" strokeLinecap="round" fill="none">
        {/* 頭の上の2本のしょっ角 */}
        <path d="M42 30 L36 10 M58 30 L64 10" />
        <circle cx="36" cy="9" r="3" fill={line} />
        <circle cx="64" cy="9" r="3" fill={line} />
      </g>
    )
  if (species === 'goat')
    return (
      <g stroke="#57534e" strokeWidth="3" strokeLinecap="round" fill="none">
        {/* うしろに曲がった2本のつの */}
        <path d="M40 30 Q34 12 24 16 M60 30 Q66 12 76 16" />
      </g>
    )
  if (species === 'deer')
    return (
      <g stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" fill="none">
        {/* えだわかれしたつの */}
        <path d="M38 30 L32 10 M33 16 L24 12 M62 30 L68 10 M67 16 L76 12" />
      </g>
    )
  if (species === 'giraffe')
    return (
      <g stroke={line} strokeWidth="2.5" strokeLinecap="round">
        {/* 頭の上の2本のつの（オシコーン） */}
        <path d="M40 30 L36 12 M60 30 L64 12" fill="none" />
        <circle cx="36" cy="11" r="4" fill="#92400e" />
        <circle cx="64" cy="11" r="4" fill="#92400e" />
      </g>
    )
  if (species === 'bear')
    return (
      <g stroke={line} strokeWidth="2.5">
        {/* 小さなまるい耳 */}
        <circle cx="26" cy="26" r="9" fill={fill} />
        <circle cx="74" cy="26" r="9" fill={fill} />
        <circle cx="26" cy="26" r="4.5" fill="#fcd34d" stroke="none" />
        <circle cx="74" cy="26" r="4.5" fill="#fcd34d" stroke="none" />
      </g>
    )
  if (species === 'koala')
    return (
      <g stroke={line} strokeWidth="2.5">
        {/* ふわふわの大きなまるい耳 */}
        <circle cx="20" cy="34" r="14" fill={fill} />
        <circle cx="80" cy="34" r="14" fill={fill} />
        <circle cx="20" cy="34" r="8" fill="#f3f4f6" stroke="none" />
        <circle cx="80" cy="34" r="8" fill="#f3f4f6" stroke="none" />
      </g>
    )
  if (species === 'elephant')
    return (
      <g fill={fill} stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        {/* 大きくひらいた耳 */}
        <path d="M24 34 Q2 30 4 56 Q8 72 24 64 Z" />
        <path d="M76 34 Q98 30 96 56 Q92 72 76 64 Z" />
        <path d="M20 42 Q10 44 12 56 Q16 62 22 58 Z M80 42 Q90 44 88 56 Q84 62 78 58 Z" fill="#fbcfe8" stroke="none" opacity="0.7" />
      </g>
    )
  if (species === 'lion')
    return (
      <g fill={fill} stroke={line} strokeWidth="2.5">
        <circle cx="30" cy="30" r="7" />
        <circle cx="70" cy="30" r="7" />
      </g>
    )
  if (species === 'panda')
    return (
      <g fill="#1f2937" stroke="#1f2937" strokeWidth="2">
        {/* 黒くてまるい耳 */}
        <circle cx="26" cy="28" r="10" />
        <circle cx="74" cy="28" r="10" />
      </g>
    )
  if (species === 'squirrel')
    return (
      <g stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        {/* とがった耳と、先の毛のふさ */}
        <path d="M26 40 L24 16 L40 30 Z" fill={fill} />
        <path d="M74 40 L76 16 L60 30 Z" fill={fill} />
        <path d="M24 16 l-3 -6 M24 16 l3 -6 M76 16 l-3 -6 M76 16 l3 -6" stroke={line} strokeWidth="2" />
      </g>
    )
  if (species === 'sheep')
    return (
      <g>
        {/* もこもこの毛と、くるんとした角 */}
        <g fill="#fff" stroke={line} strokeWidth="2">
          <circle cx="32" cy="24" r="9" />
          <circle cx="44" cy="18" r="9" />
          <circle cx="56" cy="18" r="9" />
          <circle cx="68" cy="24" r="9" />
        </g>
        <g fill="none" stroke="#a16207" strokeWidth="4" strokeLinecap="round">
          <path d="M22 40 Q10 34 14 24 Q20 18 24 28" />
          <path d="M78 40 Q90 34 86 24 Q80 18 76 28" />
        </g>
      </g>
    )
  if (species === 'hamster')
    return (
      <g stroke={line} strokeWidth="2.5">
        <circle cx="26" cy="30" r="10" fill={fill} />
        <circle cx="74" cy="30" r="10" fill={fill} />
        <circle cx="26" cy="30" r="5" fill="#fda4af" stroke="none" />
        <circle cx="74" cy="30" r="5" fill="#fda4af" stroke="none" />
      </g>
    )
  if (species === 'owl')
    return (
      <g fill={fill} stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        <path d="M26 38 L18 10 L32 22 L44 30 Z" />
        <path d="M74 38 L82 10 L68 22 L56 30 Z" />
      </g>
    )
  if (species === 'fox')
    return (
      <g stroke={line} strokeWidth="2.5" strokeLinejoin="round">
        <path d="M24 44 L22 12 L44 30 Z" fill={fill} />
        <path d="M76 44 L78 12 L56 30 Z" fill={fill} />
        <path d="M27 36 L26 20 L37 30 Z M73 36 L74 20 L63 30 Z" fill="#fde68a" stroke="none" />
      </g>
    )
  return null
}

// 顔まわりのパーツ（おなか・口もと）
function SpeciesFace({ species }: { species: string }) {
  if (species === 'penguin') return <ellipse cx="50" cy="70" rx="22" ry="18" fill="#fff" opacity="0.92" />
  if (species === 'cat')
    return (
      <g stroke="#475569" strokeWidth="1.3" strokeLinecap="round" opacity="0.8">
        <path d="M24 64 L12 61 M24 68 L12 69 M76 64 L88 61 M76 68 L88 69" />
      </g>
    )
  if (species === 'rabbit') return <ellipse cx="50" cy="76" rx="14" ry="9" fill="#fff" opacity="0.8" />
  if (species === 'otter')
    return (
      <g>
        {/* 白っぽい口もとと、まるい鼻 */}
        <ellipse cx="50" cy="72" rx="13" ry="8" fill="#fef3c7" opacity="0.9" />
        <ellipse cx="50" cy="67" rx="5" ry="3.5" fill="#1f2937" />
      </g>
    )
  if (species === 'flamingo')
    return (
      <g stroke="#9d174d" strokeWidth="2" strokeLinejoin="round">
        {/* 下に曲がったくちばし（先が黒い） */}
        <path d="M42 64 Q50 60 58 64 Q56 74 50 80 Q47 72 42 64 Z" fill="#fde7f3" />
        <path d="M47 74 Q50 80 50 80 Q53 76 54 72 Z" fill="#1f2937" stroke="none" />
      </g>
    )
  if (species === 'seal')
    return (
      <g>
        {/* 黒い鼻と、ぴんと出たひげ */}
        <ellipse cx="50" cy="66" rx="5" ry="4" fill="#1f2937" />
        <g stroke="#475569" strokeWidth="1.5" strokeLinecap="round">
          <path d="M42 70 L28 66 M42 73 L28 74 M58 70 L72 66 M58 73 L72 74" />
        </g>
      </g>
    )
  if (species === 'pelican')
    return (
      <g stroke="#b45309" strokeWidth="2" strokeLinejoin="round">
        {/* 長いくちばしと、のどのふくろ */}
        <path d="M40 64 L60 64 L54 82 L46 82 Z" fill="#fbbf24" />
        <path d="M44 82 Q50 94 56 82 Z" fill="#fde68a" />
      </g>
    )
  if (species === 'hedgehog')
    return (
      <g>
        {/* とがった小さな鼻 */}
        <circle cx="50" cy="70" r="4" fill="#1f2937" />
        <ellipse cx="50" cy="76" rx="11" ry="6" fill="#fde7c7" opacity="0.8" />
      </g>
    )
  if (species === 'koala')
    return (
      <g>
        {/* 大きな黒い鼻 */}
        <ellipse cx="50" cy="66" rx="7" ry="9" fill="#1f2937" />
        <ellipse cx="50" cy="80" rx="12" ry="7" fill="#f3f4f6" opacity="0.8" />
      </g>
    )
  if (species === 'elephant')
    return (
      <g fill="none" stroke="#4b5563" strokeLinecap="round">
        {/* まん中から下にのびる、くるんとした鼻 */}
        <path d="M50 62 Q52 78 46 86 Q42 90 46 92" strokeWidth="9" />
        <path d="M50 62 Q52 78 46 86 Q42 90 46 92" strokeWidth="5" stroke="#a8b3c4" />
      </g>
    )
  if (species === 'lion')
    return (
      <g>
        <ellipse cx="50" cy="74" rx="14" ry="10" fill="#fef3c7" opacity="0.9" />
        <path d="M46 70 L54 70 L50 75 Z" fill="#78350f" />
      </g>
    )
  if (species === 'panda')
    return (
      <g fill="#1f2937" opacity="0.85">
        {/* 目のまわりの黒いもよう */}
        <ellipse cx="36" cy="54" rx="9" ry="7" transform="rotate(-20 36 54)" />
        <ellipse cx="64" cy="54" rx="9" ry="7" transform="rotate(20 64 54)" />
      </g>
    )
  if (species === 'squirrel')
    return (
      <g>
        <ellipse cx="50" cy="76" rx="15" ry="10" fill="#fff7ed" opacity="0.9" />
        <circle cx="26" cy="66" r="6" fill="#fdba74" opacity="0.8" />
        <circle cx="74" cy="66" r="6" fill="#fdba74" opacity="0.8" />
      </g>
    )
  if (species === 'sheep')
    return (
      <g fill="#fff" stroke="#cbd5e1" strokeWidth="1.5">
        <circle cx="22" cy="78" r="7" />
        <circle cx="78" cy="78" r="7" />
        <circle cx="50" cy="90" r="7" />
      </g>
    )
  if (species === 'hamster')
    return (
      <g>
        <ellipse cx="50" cy="76" rx="16" ry="11" fill="#fff" opacity="0.85" />
        <circle cx="24" cy="66" r="8" fill="#fde68a" opacity="0.9" />
        <circle cx="76" cy="66" r="8" fill="#fde68a" opacity="0.9" />
      </g>
    )
  if (species === 'owl')
    return (
      <g>
        <circle cx="38" cy="57" r="12" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
        <circle cx="62" cy="57" r="12" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
        <path d="M40 78 q3 4 6 0 q3 4 6 0 q3 4 6 0 M43 84 q3 4 6 0 q3 4 6 0" fill="none" stroke="#92400e" strokeWidth="1.6" opacity="0.6" />
      </g>
    )
  if (species === 'turtle')
    return <path d="M34 72 Q50 66 66 72 Q64 88 50 89 Q36 88 34 72 Z" fill="#fef9c3" opacity="0.85" />
  if (species === 'octopus')
    return (
      <g fill="#fff" opacity="0.55">
        <circle cx="34" cy="30" r="3" />
        <circle cx="62" cy="22" r="4" />
        <circle cx="70" cy="38" r="2.5" />
      </g>
    )
  if (species === 'fox') return <path d="M32 66 Q50 58 68 66 Q66 84 50 86 Q34 84 32 66 Z" fill="#fff" opacity="0.85" />
  if (species === 'dragon')
    return (
      <g fill="none" stroke="#fef3c7" strokeWidth="2" opacity="0.9" strokeLinecap="round">
        <path d="M40 80 Q50 84 60 80 M42 85 Q50 88 58 85" />
      </g>
    )
  return null
}

// 系統「耳」のつばさ。段階が上がると大きくなる
function Wings({ form, fill, line }: { form: Form; fill: string; line: string }) {
  const big = form.stage >= 4 ? 1.35 : 1
  const wing = 'M0 0 Q-16 -14 -12 -32 Q-6 -22 2 -20 Q-4 -12 6 -8 Z'
  return (
    <g className="wings" fill={fill} stroke={line} strokeWidth="2.5" strokeLinejoin="round">
      <path transform={`translate(22 62) scale(${big})`} d={wing} />
      <path transform={`translate(78 62) scale(${-big} ${big})`} d={wing} />
    </g>
  )
}

// 飾り（タマゴのときは着られない）
// つけている着せ替え（いくつか重ねられる）
export function Wear({ id }: { id?: string }) {
  return (
    <>
      {wearList(id).map((x) => (
        <WearOne key={x} id={x} />
      ))}
    </>
  )
}

function WearOne({ id }: { id: string }) {
  switch (id) {
    case 'ribbon':
      return (
        <g stroke="#9d174d" strokeWidth="2" strokeLinejoin="round">
          <path d="M66 34 L60 46 L64 46 Z M70 34 L74 46 L78 44 Z" fill="#db2777" />
          <path d="M68 32 Q56 20 54 30 Q54 40 68 32 Z M68 32 Q80 20 82 30 Q82 40 68 32 Z" fill="#f472b6" />
          <circle cx="68" cy="32" r="4" fill="#ec4899" />
          <path d="M58 27 q2 -2 5 0 M74 27 q3 -2 5 0" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.8" />
        </g>
      )
    case 'glasses':
      return (
        <g>
          <g fill="#e0f2fe" fillOpacity="0.35" stroke="#1f2937" strokeWidth="2.5">
            <circle cx="38" cy="57" r="10" />
            <circle cx="62" cy="57" r="10" />
          </g>
          <path d="M48 56 Q50 53 52 56 M28 55 L20 52 M72 55 L80 52" fill="none" stroke="#1f2937" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 52 q3 -4 7 -4 M56 52 q3 -4 7 -4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
      )
    case 'sunglasses':
      return (
        <g>
          <path d="M26 50 L48 50 Q48 64 37 64 Q26 64 26 50 Z M52 50 L74 50 Q74 64 63 64 Q52 64 52 50 Z" fill="#111827" stroke="#000" strokeWidth="2" />
          <path d="M48 52 L52 52 M26 51 L19 49 M74 51 L81 49" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M30 53 l6 0 M56 53 l6 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </g>
      )
    case 'cap':
      return (
        <g stroke="#1e3a8a" strokeWidth="2" strokeLinejoin="round">
          <path d="M66 32 Q84 30 90 36 Q80 38 66 37 Z" fill="#1d4ed8" />
          <path d="M28 36 Q28 14 50 13 Q72 14 72 36 Z" fill="#3b82f6" />
          <path d="M50 13 L50 36" stroke="#1e40af" strokeWidth="1.5" opacity="0.6" />
          <circle cx="50" cy="13" r="2.5" fill="#1d4ed8" />
          <circle cx="40" cy="27" r="5" fill="#fff" strokeWidth="1.2" />
          <text x="40" y="29.5" fontSize="7" textAnchor="middle" fill="#1d4ed8" stroke="none" fontWeight="bold">
            E
          </text>
          <path d="M33 22 q3 -6 9 -7" stroke="#fff" strokeWidth="1.8" fill="none" opacity="0.6" />
        </g>
      )
    case 'pearls':
      return (
        <g fill="#f8fafc" stroke="#94a3b8" strokeWidth="1">
          {[26, 32, 38, 44, 50, 56, 62, 68, 74].map((x) => (
            <circle key={x} cx={x} cy={80 + (12 - Math.abs(50 - x) / 2) * 0.5} r="3.2" />
          ))}
          <circle cx="50" cy="91" r="4.5" fill="#fbcfe8" stroke="#db2777" />
        </g>
      )
    case 'scarf':
      return (
        <g stroke="#991b1b" strokeWidth="2" strokeLinejoin="round">
          <path d="M60 82 L64 100 L74 98 L70 80 Z" fill="#dc2626" />
          <path d="M20 76 Q50 88 80 76 L80 84 Q50 96 20 84 Z" fill="#ef4444" />
          <path d="M28 80 L28 87 M38 83 L38 90 M50 84 L50 91 M62 83 L62 90 M72 80 L72 87" stroke="#fff" strokeWidth="2" opacity="0.6" />
        </g>
      )
    case 'hat':
      return (
        <g stroke="#000" strokeWidth="1.5">
          <ellipse cx="50" cy="31" rx="22" ry="4.5" fill="#1f2937" />
          <path d="M37 30 L38 6 Q50 3 62 6 L63 30 Q50 33 37 30 Z" fill="#1f2937" />
          <path d="M37.5 22 Q50 25 62.5 22 L62.8 27 Q50 30 37.2 27 Z" fill="#dc2626" />
          <path d="M42 9 L42 20" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )
    case 'flower':
      return (
        <g>
          <path d="M26 34 Q50 22 74 34" fill="none" stroke="#65a30d" strokeWidth="3" />
          {[26, 37, 50, 63, 74].map((x, i) => (
            <g key={x} transform={`translate(${x} ${34 - (12 - Math.abs(50 - x) / 2) * 0.9})`}>
              {[0, 72, 144, 216, 288].map((r) => (
                <ellipse key={r} transform={`rotate(${r})`} cx="0" cy="-3.5" rx="2.6" ry="3.6" fill={['#f9a8d4', '#fde047', '#c4b5fd', '#fde047', '#f9a8d4'][i]} stroke="#a16207" strokeWidth="0.6" />
              ))}
              <circle r="2" fill="#f59e0b" />
            </g>
          ))}
        </g>
      )
    case 'bowtie':
      return (
        <g stroke="#4c1d95" strokeWidth="2" strokeLinejoin="round">
          <path d="M50 82 Q40 72 34 74 Q32 82 34 90 Q40 92 50 82 Z M50 82 Q60 72 66 74 Q68 82 66 90 Q60 92 50 82 Z" fill="#7c3aed" />
          <rect x="46" y="78" width="8" height="8" rx="2.5" fill="#6d28d9" />
          <path d="M37 78 q3 -2 6 0 M57 78 q3 -2 6 0" stroke="#ddd6fe" strokeWidth="1.5" fill="none" />
        </g>
      )
    case 'catears':
      return (
        <g stroke="#78350f" strokeWidth="2" strokeLinejoin="round">
          <path d="M24 40 L26 12 L46 30 Z" fill="#fbbf24" />
          <path d="M76 40 L74 12 L54 30 Z" fill="#fbbf24" />
          <path d="M29 33 L30 20 L40 29 Z M71 33 L70 20 L60 29 Z" fill="#f9a8d4" stroke="none" />
        </g>
      )
    case 'witchhat':
      return (
        <g stroke="#1f2937" strokeWidth="2" strokeLinejoin="round">
          <ellipse cx="50" cy="32" rx="26" ry="5" fill="#6d28d9" />
          <path d="M34 31 Q40 18 46 10 Q52 2 64 4 Q56 8 58 18 L66 31 Z" fill="#7c3aed" />
          <path d="M36 26 L64 26 L65.5 30 L34.5 30 Z" fill="#f59e0b" stroke="none" />
          <path d="M52 22 l1 -3 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 Z" fill="#fde047" stroke="none" />
        </g>
      )
    case 'santahat':
      return (
        <g stroke="#7f1d1d" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M30 32 Q34 8 56 8 Q72 10 78 26 L70 30 Z" fill="#dc2626" />
          <path d="M40 16 Q48 10 58 11" stroke="#fca5a5" strokeWidth="2" fill="none" />
          <rect x="27" y="27" width="46" height="8" rx="4" fill="#fff" />
          <circle cx="78" cy="27" r="5" fill="#fff" />
        </g>
      )
    case 'crown':
      return (
        <g stroke="#a16207" strokeWidth="2" strokeLinejoin="round">
          <path d="M32 32 L30 12 L41 22 L50 7 L59 22 L70 12 L68 32 Z" fill="#facc15" />
          <path d="M32 27 L68 27" stroke="#ca8a04" strokeWidth="1.5" />
          <circle cx="30" cy="11" r="2.5" fill="#fde047" />
          <circle cx="50" cy="6" r="2.5" fill="#fde047" />
          <circle cx="70" cy="11" r="2.5" fill="#fde047" />
          <circle cx="50" cy="22" r="3" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
          <circle cx="40" cy="27" r="1.8" fill="#22c55e" stroke="none" />
          <circle cx="60" cy="27" r="1.8" fill="#3b82f6" stroke="none" />
          <path d="M36 16 L37 25" stroke="#fef9c3" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )
    case 'headphones':
      return (
        <g>
          <path d="M17 58 Q16 18 50 17 Q84 18 83 58" fill="none" stroke="#1f2937" strokeWidth="5" strokeLinecap="round" />
          <path d="M17 58 Q16 18 50 17 Q84 18 83 58" fill="none" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="9" y="50" width="14" height="20" rx="6" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
          <rect x="77" y="50" width="14" height="20" rx="6" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
          <path d="M13 54 L13 62 M81 54 L81 62" stroke="#bfdbfe" strokeWidth="2" strokeLinecap="round" />
        </g>
      )
    default:
      return null
  }
}

// スーパーレア（きんいろ）・ウルトラレア（にじいろ）の特別なすがた
// うしろ：SR は金の光の輪と放射、UR はにじのプリズムの光と二重の輪
function RareBack({ ur, uid }: { ur: boolean; uid: string }) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30)
  const colors = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#38bdf8', '#a78bfa']
  return (
    <g className="rare-back" pointerEvents="none">
      <circle cx="50" cy="58" r="46" fill={`url(#r${uid})`} />
      <g className="rare-rays">
        {rays.map((a, i) => (
          <path key={a} d="M50 58 L46 6 L54 6 Z" fill={ur ? colors[i % colors.length] : '#fde047'} opacity={ur ? 0.45 : 0.38} transform={`rotate(${a} 50 58)`} />
        ))}
      </g>
      {ur && (
        <g fill="none" strokeWidth="1.5" className="ur-rings">
          <ellipse cx="50" cy="58" rx="44" ry="44" stroke="#f0abfc" strokeDasharray="3 5" opacity="0.8" />
          <ellipse cx="50" cy="58" rx="38" ry="38" stroke="#7dd3fc" strokeDasharray="1 4" opacity="0.8" />
        </g>
      )}
    </g>
  )
}

// SR のマント・UR のクリスタルのつばさ（体のうしろ）
function RareCape({ ur, uid }: { ur: boolean; uid: string }) {
  if (ur)
    return (
      <g className="ur-wings" stroke="#7e22ce" strokeWidth="1.6" strokeLinejoin="round">
        {[-1, 1].map((dir) => (
          <g key={dir} transform={dir < 0 ? undefined : 'translate(100 0) scale(-1 1)'}>
            <path d="M26 58 Q4 30 2 12 Q14 22 20 20 Q14 34 26 40 Z" fill={`url(#w${uid})`} />
            <path d="M24 64 Q0 50 -2 30 Q10 40 16 38 Q12 52 26 54 Z" fill={`url(#w${uid})`} opacity="0.9" />
            <path d="M24 70 Q4 68 0 52 Q10 58 16 56 Q14 66 26 64 Z" fill={`url(#w${uid})`} opacity="0.8" />
            <path d="M20 22 L23 34 M14 40 L22 50 M10 58 L22 62" stroke="#fff" strokeWidth="1" opacity="0.7" />
          </g>
        ))}
      </g>
    )
  return (
    <g stroke="#7f1d1d" strokeWidth="2" strokeLinejoin="round">
      <path d="M26 40 Q50 32 74 40 L90 92 Q50 100 10 92 Z" fill="#b91c1c" />
      <path d="M26 40 Q50 32 74 40 L76 46 Q50 38 24 46 Z" fill="#fbbf24" stroke="#a16207" strokeWidth="1.5" />
      <path d="M10 92 Q50 100 90 92" fill="none" stroke="#fbbf24" strokeWidth="3" />
    </g>
  )
}

// 前：SR は宝石のティアラと目の星、UR はプリズムの王冠と、まわる星
function RareFront({ ur, crown }: { ur: boolean; crown: boolean }) {
  return (
    <g pointerEvents="none">
      {!crown &&
        (ur ? (
          <g stroke="#6b21a8" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M32 32 L36 16 L42 26 L50 10 L58 26 L64 16 L68 32 Z" fill="#e9d5ff" />
            <path d="M50 10 L54 22 L50 30 L46 22 Z" fill="#f0abfc" />
            <circle cx="36" cy="17" r="2.6" fill="#7dd3fc" />
            <circle cx="64" cy="17" r="2.6" fill="#86efac" />
            <circle cx="50" cy="21" r="2.2" fill="#fde047" stroke="none" />
          </g>
        ) : (
          <g stroke="#92400e" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M34 32 Q50 18 66 32 L62 26 L56 28 L50 18 L44 28 L38 26 Z" fill="#fde047" />
            <circle cx="50" cy="24" r="3" fill="#ef4444" />
            <circle cx="40" cy="28" r="1.8" fill="#38bdf8" stroke="none" />
            <circle cx="60" cy="28" r="1.8" fill="#22c55e" stroke="none" />
          </g>
        ))}
      {/* 宝石のペンダント */}
      <g>
        <path d="M32 78 Q50 90 68 78" fill="none" stroke={ur ? '#c084fc' : '#d97706'} strokeWidth="2.4" strokeDasharray="2.5 1.5" />
        <path d="M50 84 L55 89 L50 96 L45 89 Z" fill={ur ? '#a5f3fc' : '#dc2626'} stroke={ur ? '#6b21a8' : '#7f1d1d'} strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M50 84 L52 89 L50 92 L48 89 Z" fill="#fff" opacity="0.7" />
      </g>
      {/* 目の中の星 */}
      <g fill="#fff" className="rare-glint">
        <path d="M40.5 54 l1 2.2 l2.2 1 l-2.2 1 l-1 2.2 l-1 -2.2 l-2.2 -1 l2.2 -1 Z" />
        <path d="M60.5 54 l1 2.2 l2.2 1 l-2.2 1 l-1 2.2 l-1 -2.2 l-2.2 -1 l2.2 -1 Z" />
      </g>
      {/* ただよう光（SR は金貨、UR はにじの星） */}
      <g className="rare-float">
        {(ur
          ? [
              ['#f472b6', 8, 30],
              ['#38bdf8', 92, 26],
              ['#facc15', 90, 78],
              ['#4ade80', 10, 80],
              ['#a78bfa', 50, 4],
            ]
          : [
              ['#fbbf24', 10, 34],
              ['#fde047', 90, 30],
              ['#f59e0b', 88, 80],
            ]
        ).map(([c, x, y], i) =>
          ur ? (
            <path key={i} d={`M${x} ${Number(y) - 5} l1.6 3.4 l3.4 1.6 l-3.4 1.6 l-1.6 3.4 l-1.6 -3.4 l-3.4 -1.6 l3.4 -1.6 Z`} fill={c as string} stroke="#fff" strokeWidth="0.6" style={{ animationDelay: `${i * 0.4}s` }} />
          ) : (
            <g key={i} style={{ animationDelay: `${i * 0.5}s` }}>
              <circle cx={x} cy={y} r="4" fill={c as string} stroke="#a16207" strokeWidth="1" />
              <path d={`M${Number(x) - 1.5} ${Number(y) - 1.5} h3 v3 h-3 Z`} fill="none" stroke="#a16207" strokeWidth="0.8" />
            </g>
          ),
        )}
      </g>
    </g>
  )
}

export function MonsterFigure({
  form: baseForm,
  mood = 'normal',
  hidden = false,
  wear,
  crack = 0,
  kind,
}: {
  form: Form
  kind?: string // 色ちがい
  mood?: Mood
  hidden?: boolean
  wear?: string
  crack?: number // タマゴのひび（0〜1。かえる直前ほど大きい）
}) {
  const form = withKind(baseForm, kind)
  const rainbow = kind === 'niji' && !hidden
  const gold = kind === 'kin' && !hidden
  const uid = (kind ?? '') + (form.species ?? '') + form.id.replace(/[^a-z]/g, '') + useId().replace(/[^a-zA-Z0-9]/g, '')
  const fill = hidden ? '#9ca3af' : form.color
  const line = hidden ? '#6b7280' : form.line
  const body = hidden ? fill : `url(#b${uid})`
  const defs = (
    <defs>
      {rainbow || gold ? (
        <linearGradient id={`b${uid}`} x1="0" y1="0" x2="1" y2="1">
          {(rainbow ? ['#fca5a5', '#fdba74', '#fde047', '#86efac', '#7dd3fc', '#c4b5fd', '#f0abfc'] : ['#fef3c7', '#f59e0b', '#fde68a', '#fffbeb', '#d97706', '#fbbf24', '#b45309']).map((c, i) => (
            <stop key={c} offset={i / 6} stopColor={c} />
          ))}
        </linearGradient>
      ) : (
        <radialGradient id={`b${uid}`} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor={shade(form.color, 0.55)} />
          <stop offset="0.55" stopColor={form.color} />
          <stop offset="1" stopColor={shade(form.color, -0.18)} />
        </radialGradient>
      )}
      {/* 立体感：下と右に落ちる陰影と、左上のつや */}
      <radialGradient id={`s${uid}`} cx="0.36" cy="0.26" r="0.92">
        <stop offset="0.55" stopColor="#0f172a" stopOpacity="0" />
        <stop offset="1" stopColor="#0f172a" stopOpacity="0.3" />
      </radialGradient>
      <radialGradient id={`g${uid}`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`r${uid}`}>
        <stop offset="0" stopColor={rainbow ? '#f5d0fe' : '#fef08a'} stopOpacity="0.95" />
        <stop offset="0.6" stopColor={rainbow ? '#a5f3fc' : '#fbbf24'} stopOpacity="0.35" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`w${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fbcfe8" />
        <stop offset="0.35" stopColor="#bae6fd" />
        <stop offset="0.7" stopColor="#ddd6fe" />
        <stop offset="1" stopColor="#fef9c3" />
      </linearGradient>
      <linearGradient id={`x${uid}`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0.75" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <clipPath id={`c${uid}`}>
        <path d="M18 70 Q18 28 50 26 Q82 28 82 70 Q82 90 50 90 Q18 90 18 70 Z" />
      </clipPath>
      <radialGradient id={`h${uid}`}>
        <stop offset="0" stopColor="#fef08a" stopOpacity="0.9" />
        <stop offset="1" stopColor="#fef08a" stopOpacity="0" />
      </radialGradient>
    </defs>
  )
  if (form.stage === 0) {
    return (
      <svg viewBox="0 0 100 100" className="monster-svg" aria-hidden="true">
        {defs}
        <ellipse cx="50" cy="95" rx="24" ry="4" fill="#000" opacity="0.12" />
        <g className={hidden ? undefined : 'egg-wobble'}>
          <ellipse cx="50" cy="56" rx="30" ry="38" fill={body} stroke={line} strokeWidth="3" />
          {!hidden && <ellipse cx="50" cy="56" rx="28.5" ry="36.5" fill={`url(#s${uid})`} pointerEvents="none" />}
          <path d="M22 54 l7 -6 l7 6 l7 -6 l7 6 l7 -6 l7 6 l7 -6 l6 5" fill="none" stroke={line} strokeWidth="3" strokeLinejoin="round" />
          {!hidden && (
            <>
              <circle cx="38" cy="72" r="5" fill="#f59e0b" opacity="0.8" />
              <circle cx="60" cy="80" r="3.5" fill="#f59e0b" opacity="0.8" />
              <circle cx="64" cy="66" r="2.5" fill="#f59e0b" opacity="0.8" />
              <ellipse cx="38" cy="32" rx="7" ry="10" fill="#fff" opacity="0.5" transform="rotate(-20 38 32)" />
              {crack >= 0.3 && <path className="egg-crack" d="M50 20 l-4 8 l6 5 l-5 8" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" />}
              {crack >= 0.6 && <path className="egg-crack" d="M70 40 l-6 4 l4 6 l-7 3" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" />}
              {crack >= 0.85 && <path className="egg-crack" d="M30 62 l7 -2 l-2 7 l8 -1" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" />}
            </>
          )}
        </g>
      </svg>
    )
  }
  // 生まれたては小さく、だんだん大きくなる（足もとを中心に拡大）
  const size = form.stage === 1 ? 0.78 : form.stage === 2 ? 0.9 : 1
  return (
    <svg viewBox="0 0 100 100" className="monster-svg" aria-hidden="true">
      {defs}
      {(gold || rainbow) && <RareBack ur={rainbow} uid={uid} />}
      {form.stage >= 5 && !hidden && <circle cx="50" cy="56" r="46" fill={`url(#h${uid})`} opacity={form.stage >= 6 ? 0.9 : 0.6} />}
      {form.stage >= 5 && !hidden && (
        <g className="aura">
          <circle cx="50" cy="56" r="46" fill="none" stroke={form.stage >= 6 ? '#c4b5fd' : '#fde047'} strokeWidth="3" strokeDasharray="4 6" />
          <path d="M14 30 l3 -7 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 Z M80 14 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 Z M86 78 l2 -4 l2 4 l4 2 l-4 2 l-2 4 l-2 -4 l-4 -2 Z" fill="#fde047" />
        </g>
      )}
      <ellipse cx="50" cy="94" rx={30 * size} ry="4" fill="#000" opacity="0.13" />
      {(gold || rainbow) && (
        <g className="kind-shine" fill={rainbow ? '#f0abfc' : '#fbbf24'}>
          <path d="M10 60 l2 -5 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 Z" />
          <path d="M88 52 l1.5 -4 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 Z" />
        </g>
      )}
      {form.stage >= 3 && !hidden && <Particles form={form} />}
      <g transform={`translate(50 92) scale(${size}) translate(-50 -92)`}>
        <g className={hidden ? undefined : `monster-breathe${rainbow ? ' ur-body' : ''}`}>
          {(gold || rainbow) && <RareCape ur={rainbow} uid={uid} />}
          {form.species && SPECIES_TAILS.includes(form.species) ? (
            form.stage >= 1 && <SpeciesTail species={form.species} fill={hidden ? fill : body} line={line} />
          ) : (
            form.stage >= 3 && <Tail form={form} fill={hidden ? fill : body} line={line} />
          )}
          {form.species && <SpeciesBack species={form.species} fill={hidden ? fill : body} line={line} hidden={hidden} />}
          {form.species === 'octopus' && <OctopusLegs fill={hidden ? fill : body} line={line} hidden={hidden} />}
          {form.species === 'dragon' && form.stage >= 2 && form.branch !== 'ear' && <DragonWings fill={hidden ? fill : shade(form.color, 0.3)} line={line} />}
          {form.branch === 'ear' && <Wings form={form} fill={hidden ? fill : shade(form.color, 0.25)} line={line} />}
          {form.stage >= 2 && form.species !== 'octopus' && (
            <g fill={form.species === 'penguin' && !hidden ? '#fb923c' : body} stroke={line} strokeWidth="3">
              <ellipse cx="36" cy="89" rx="9" ry="5" />
              <ellipse cx="64" cy="89" rx="9" ry="5" />
            </g>
          )}
          <path d="M18 70 Q18 28 50 26 Q82 28 82 70 Q82 90 50 90 Q18 90 18 70 Z" fill={body} stroke={line} strokeWidth="3" />
          {!hidden && <path d="M19.5 70 Q19.5 29.5 50 27.5 Q80.5 29.5 80.5 70 Q80.5 88.5 50 88.5 Q19.5 88.5 19.5 70 Z" fill={`url(#s${uid})`} pointerEvents="none" />}
          {(gold || rainbow) && (
            <g clipPath={`url(#c${uid})`}>
              <rect className="rare-sweep" x="-30" y="20" width="22" height="80" fill={`url(#x${uid})`} transform="skewX(-20)" />
            </g>
          )}
          {!hidden && <ellipse cx="50" cy="77" rx="18" ry="10" fill="#fff" opacity="0.28" />}
          {!hidden && <ellipse cx="35" cy="39" rx="12" ry="7" fill={`url(#g${uid})`} transform="rotate(-25 35 39)" />}
          {!hidden && <ellipse cx="33" cy="37" rx="4" ry="2.2" fill="#fff" opacity="0.9" transform="rotate(-25 33 37)" />}
          {!hidden && form.species && <SpeciesFace species={form.species} />}
          {!hidden && form.stage >= 3 && <Markings form={form} line={line} />}
          {!hidden && form.stage >= 6 && (
            <g fill="#fff" className="myth-glitter">
              <circle cx="30" cy="50" r="1.2" />
              <circle cx="72" cy="46" r="1.5" />
              <circle cx="66" cy="80" r="1.2" />
              <circle cx="34" cy="80" r="1" />
            </g>
          )}
          {form.stage >= 2 && (
            <g fill={body} stroke={line} strokeWidth="3" className="monster-arms">
              <path d="M20 66 Q8 70 12 78 Q18 80 22 74" />
              <path d="M80 66 Q92 70 88 78 Q82 80 78 74" />
            </g>
          )}
          {form.stage === 1 && !hidden && (
            <path d="M30 34 L36 26 L42 33 L50 24 L58 33 L64 26 L70 34 Q50 24 30 34 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
          )}
          {form.species && <SpeciesHead species={form.species} fill={hidden ? fill : body} line={line} big={form.stage >= 3} />}
          {!hidden && !(form.stage <= 2 && wearList(wear).some((w) => slotOf(w) === 'head')) && <Crest form={form} line={line} />}
          {form.stage >= 4 && (
            <g stroke="#a16207" strokeWidth="2" strokeLinejoin="round">
              <path d="M30 34 L33 22 L41 30 L50 18 L59 30 L67 22 L70 34 Z" fill="#fbbf24" />
              <circle cx="50" cy="28" r="3" fill={form.stage >= 5 ? '#a855f7' : '#ef4444'} stroke="none" />
              <circle cx="38" cy="31" r="1.8" fill="#38bdf8" stroke="none" />
              <circle cx="62" cy="31" r="1.8" fill="#38bdf8" stroke="none" />
            </g>
          )}
          {form.stage >= 6 && !hidden && <path d="M50 40 l4 5 l-4 5 l-4 -5 Z" fill="#e879f9" stroke="#86198f" strokeWidth="1.2" />}
          {form.stage >= 6 && <ellipse className="halo" cx="50" cy="10" rx="20" ry="5" fill="none" stroke="#fde047" strokeWidth="3.5" />}
          {hidden ? (
            <text x="50" y="66" textAnchor="middle" fontSize="22" fill="#f3f4f6">
              ？
            </text>
          ) : (
            <Face mood={mood} />
          )}
          {!hidden && (form.species === 'penguin' || form.species === 'owl') && <path d="M45 62 L55 62 L50 68 Z" fill="#fb923c" stroke="#9a3412" strokeWidth="1.2" strokeLinejoin="round" />}
          {!hidden && <Wear id={wear} />}
          {(gold || rainbow) && mood !== 'sleep' && <RareFront ur={rainbow} crown={form.stage >= 4 || wearList(wear).some((w) => slotOf(w) === 'head')} />}
        </g>
      </g>
    </svg>
  )
}

export function Monster({ monster, onRename, coins, onShop, room, title, cheer, feeling, gain, mood = 'normal', leveledUp = false, evolved = false, deco, sleepy = false, learned = [], night = false, daypart, friends = [], onSwitch, onPetBonus, onPetStampTicket, season, onPet, mood100, epithet, trioDone = false, trioStreak = 0 }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [line, setLine] = useState<Line | null>(null)
  // デザイン71：相棒を切りかえたら、新しい相棒が「よろしくね！」とあいさつする
  const who = `${monster.species ?? ''}|${monster.name ?? ''}`
  const [greetFor, setGreetFor] = useState(who)
  if (who !== greetFor) {
    setGreetFor(who)
    setLine({ en: 'Nice to work with you!', ja: `${monster.name ?? formOf(monster).name}だよ。よろしくね！` })
  }
  const [poke, setPoke] = useState(0)
  const [posesSeen, setPosesSeen] = useState(loadPosesSeen)
  const [petStamps, setPetStamps] = useState(loadPetStamps)
  const [react, setReact] = useState<PetReaction>('normal')
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), IDLE_MS)
    return () => window.clearInterval(id)
  }, [])
  const idle = idleAt(tick, sleepy)
  useEffect(() => {
    if (!line) return
    const id = window.setTimeout(() => setLine(null), 3500)
    return () => window.clearTimeout(id)
  }, [line])
  const { level, into, need } = levelInfo(monster.xp)
  const form = formOf(monster)
  const cls = mood === 'happy' ? ' bounce' : mood === 'lonely' ? ' droop' : ''
  return (
    <section className={`monster${room ? ' has-room' : ''}${daypart ? ` daypart-${daypart}` : ''}`} aria-label="相棒モンスター">
      {season && (
        <span className={`season-fx season-${season.id}`} aria-label={`季節の演出：${season.name}`}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <i key={i}>{season.icon}</i>
          ))}
        </span>
      )}
      {night && (
        <span className="night-sky" aria-label="夜">
          <i />
          <i />
          <i />
        </span>
      )}
      {/* 朝の時間は、窓からななめに光がさしこむ */}
      {daypart === 'morning' && <span className="morning-rays" aria-hidden="true" />}
      {/* 夕方は、空がゆっくりオレンジ色に変わっていく */}
      {daypart === 'evening' && <span className="evening-glow" aria-hidden="true" />}
      {/* 夜は相棒のまわりを、小さなほたるの光がふわふわとぶ */}
      {night && (
        <span className="fireflies" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      )}
      {sleepy && (
        <span className="monster-zzz" aria-label="ねむそう">
          💤
        </span>
      )}
      {deco && (
        <span className="monster-deco" aria-label={`飾り ${deco}`}>
          {deco}
        </span>
      )}
      <div className={`monster-stage${room ? ` room-${room}` : ''}${mood100 && mood100.points >= mood100.max ? ' stage-max' : ''}`}>
        <RoomScene room={room} align="xMaxYMax" />
        {/* デザイン72：今日の課題を3つクリアした日は、相棒のまわりに花びらが1回だけまう */}
        {trioDone && (
          <span className="trio-petals" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((j) => (
              <i key={j} style={{ left: `${10 + j * 15}%`, animationDelay: `${j * 0.25}s` } as CSSProperties}>
                🌸
              </i>
            ))}
          </span>
        )}
        {trioDone && (
          <span className="stage-trio" aria-label={trioStreak >= 2 ? `今日の課題3つクリア ${trioStreak}日連続` : '今日の課題3つクリア'}>
            🏅{trioStreak >= 2 && <small className="stage-trio-n">{trioStreak}</small>}
          </span>
        )}
      {/* 進化したときは、体のまわりに光の輪が広がる */}
      {evolved && <span className="evolve-ring" aria-hidden="true" />}
      <button
        key={poke}
        className={`monster-body${cls}${evolved ? ' evolve' : ''}${poke ? (react === 'tickle' ? ' wiggle' : ' bounce') : ''}`}
        aria-label="相棒にさわる"
        onClick={() => {
          const r = Math.random()
          const pet = nextPet(loadPetLog(), dayKey())
          savePetLog(pet)
          const st = stampPet(petStamps, dayKey())
          if (st.stamps !== petStamps) setPetStamps(st.stamps)
          if (st.ticket) onPetStampTicket?.()
          onPet?.()
          const re = petReaction(pet.count)
          setReact(re)
          if (re === 'max') onPetBonus?.()
          const l =
            re === 'max'
              ? { en: 'I love you!', ja: `だいすき！ ごきげんMAX！ 🪙${PET_BONUS}` }
              : re === 'tickle'
                ? { en: 'That tickles!', ja: 'くすぐったいよ〜！' }
                : learned.length > 0 && form.stage > 0 && r < 0.3
                  ? rememberLine(learned[Math.floor(Math.random() * learned.length)])
                  : pickLineNow(form.stage, mood === 'lonely', Math.random())
          setLine(l)
          playChirp(form.stage, monster.species)
          setPoke(poke + 1)
          const seen = seePose(posesSeen, poseAt(poke).id)
          if (seen.length !== posesSeen.length) {
            setPosesSeen(seen)
            savePosesSeen(seen)
          }
          if (form.stage > 0) speak(l.en)
        }}
      >
<span className={`monster-idle${line || leveledUp ? '' : ` idle-${idle}`}`} data-idle={idle} style={{ scale: growthScale(growthOf(level)) }}>
                  <MonsterFigure form={form} mood={line ? (react === 'max' ? 'star' : react === 'tickle' ? 'wow' : REACTIONS[poke % REACTIONS.length]) : idle === 'yawn' && mood === 'normal' && !leveledUp ? 'wow' : leveledUp ? 'star' : sleepy && mood === 'normal' ? 'sleep' : mood} wear={monster.wear} kind={monster.kind} crack={form.stage === 0 ? into / need : 0} />
          {idle === 'yawn' && !line && !leveledUp && (
            <span className="idle-yawn" aria-hidden="true">
              ふぁ〜
            </span>
          )}
        </span>
        {leveledUp && <span className="lvup-ring" aria-hidden="true" />}
        {poke > 0 && (
          <span key={`h${poke}`} className={`poke-hearts${react === 'max' ? ' max' : ''}`} aria-hidden="true">
            <i>♥</i>
            <i>♥</i>
            <i>♥</i>
          </span>
        )}
        {gain && gain.amount > 0 && (
          <span key={gain.key} className="xp-float" aria-hidden="true">
            +{gain.amount}
          </span>
        )}
      </button>
      </div>
      {poke > 0 && (
        <p className={`pose-label pose-${poseAt(poke - 1).id}`}>
          {poseAt(poke - 1).icon} {poseAt(poke - 1).name}
        </p>
      )}
      {(line ?? cheer) && (
        <div className="bubble" role="status" onClick={() => setLine(null)}>
          <span className="bubble-en">
            {(line ?? cheer)!.en}
            <button
              className="speak small"
              aria-label="ひとことを聞く"
              onClick={(e) => {
                e.stopPropagation()
                speak((line ?? cheer)!.en)
              }}
            >
              🔊
            </button>
          </span>
          <span className="bubble-ja">{(line ?? cheer)!.ja}</span>
        </div>
      )}
      <div className="monster-info">
        {mood100 && (
          <p className={`mood-meter${mood100.points >= mood100.max ? ' full' : ''}`} aria-label={`ごきげん ${mood100.points} / ${mood100.max}`}>
            <span className="mood-meter-bar">
              <span style={{ width: `${(mood100.points / mood100.max) * 100}%` }} />
            </span>
            {/* ごきげんが上がるたびに、ハートがぽんとはねる（key で作りなおす） */}
            <span key={`mh${mood100.points}`} className="mood-heart">
              💗
            </span>
            {mood100.points >= mood100.max ? ' ごきげんMAX！ 今日はXP1.2倍' : ` ごきげん ${mood100.points}/${mood100.max}`}
          </p>
        )}
        {friends.length > 0 && (
          <div className="monster-friends" aria-label={`仲間 ${friends.length}匹`}>
            {friends.slice(0, 6).map(({ m, i }) => (
              <button key={i} className="friend-mini" aria-label={`${m.name ?? formOf(m).name}と交代`} onClick={() => onSwitch?.(i)}>
                <MonsterFigure form={formOf(m)} kind={m.kind} wear={m.wear} />
              </button>
            ))}
            {friends.length > 6 && <span className="friend-more">+{friends.length - 6}</span>}
          </div>
        )}
        {editing ? (
          <form
            className="rename"
            onSubmit={(e: FormEvent) => {
              e.preventDefault()
              onRename?.(draft)
              setEditing(false)
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={NAME_MAX * 2}
              placeholder={form.name}
              aria-label="名前"
              autoFocus
            />
            <button type="submit">決定</button>
          </form>
        ) : (
          <p className="monster-name">
            {monster.name ? (
              <>
                {monster.name}
                <span className="monster-kind">（{form.name}）</span>
              </>
            ) : (
              form.name
            )}{' '}
            {/* レベルアップしたときは「Lv」の数字がきらっと光る */}
            <span className={`monster-level${leveledUp ? ' lv-shine' : ''}`}>Lv.{level}</span>
            {growthOf(level) > 0 && <span className="buddy-growth" aria-label={`成長の星 ${growthOf(level)}`}>{growthText(growthOf(level))}</span>}
            {onRename && (
              <button
                className="rename-btn"
                aria-label="名前をつける"
                onClick={() => {
                  setDraft(monster.name ?? '')
                  setEditing(true)
                }}
              >
                ✏️
              </button>
            )}
          </p>
        )}
        {epithet && <p className="epithet">⚔️ {epithet}</p>}
        {(title || feeling) && (
          <p className="title-badge">
            {title && `🎖 ${title}`}
            {feeling && <span className="feeling">{` ${feeling.icon} ${feeling.text}`}</span>}
          </p>
        )}
        {/* レベルアップまであと少し（8割以上）だと、バーがきらきら光る */}
        <div className={`xp-bar${need > 0 && into / need >= 0.8 ? ' almost' : ''}`} role="progressbar" aria-valuemin={0} aria-valuemax={need} aria-valuenow={into}>
          <div className="xp-fill" style={{ width: `${(into / need) * 100}%` }} />
        </div>
        <p className="xp-text">
          XP {into} / {need}
          {coins !== undefined && (
            <button className="coins" onClick={onShop} aria-label={`コイン ${coins}枚・ショップを開く`}>
              🪙{' '}
              {/* コインの数が変わると、数字が下からすっと入れかわる */}
              <span key={coins} className="coin-num">
                {coins}
              </span>
            </button>
          )}
        </p>
        {evolved ? (
          <p className="level-up">{form.stage === 1 ? 'タマゴがかえった！' : `${form.name}に進化した！`}</p>
        ) : leveledUp ? (
          <p className="level-up">レベルアップ！</p>
        ) : mood === 'lonely' ? (
          <p className="lonely">さみしそう… また一緒に勉強しよう</p>
        ) : null}
      </div>
    </section>
  )
}

// 図鑑の並び：はじめの3つ → 系統ごとに4段階
const ZUKAN_ROWS = [
  { label: '🥚 はじめ', ids: ['egg', 'chibi', 'mochimaru'] },
  { label: '🃏 カード', ids: ['mori', 'mori-king', 'mori-legend', 'mori-myth'] },
  { label: '❓ クイズ', ids: ['inazuma', 'inazuma-king', 'inazuma-legend', 'inazuma-myth'] },
  { label: '👂 リスニング・スペル', ids: ['sora', 'sora-king', 'sora-legend', 'sora-myth'] },
]

export function Zukan({ monsters }: { monsters: MonsterState[] }) {
  const seen = new Set(monsters.flatMap(seenForms))
  const kinds = new Set(monsters.map((m) => m.kind).filter(Boolean))
  const species = new Set(monsters.map((m) => m.species).filter(Boolean))
  const [spDetail, setSpDetail] = useState<string | null>(null)
  const owned = new Set(monsters.map((m) => `${m.species ?? 'mochi'}:${m.kind ?? 'normal'}`))
  const ownedCount = SPECIES.reduce((n, sp) => n + KINDS.filter((k) => owned.has(`${sp.id}:${k.id}`)).length, 0)
  const pct = completionPct(ownedCount, SPECIES.length * KINDS.length)
  const [detail, setDetail] = useState<Form | null>(null)
  return (
    <div className="zukan">
      <h2>
        モンスター図鑑 {seen.size} / {FORMS.length}
      </h2>
      <p className="stats-note" title="Lv15 からは、いちばん多く使った学び方で進化先が変わるよ。">Lv15 から学び方で進化が変わる</p>
      {ZUKAN_ROWS.filter((row) => row.ids.some((id) => seen.has(id)) || ZUKAN_ROWS.filter((r) => !r.ids.some((id) => seen.has(id))).length <= 1).map((row) => (
        <div key={row.label} className="zukan-row">
          <span className="zukan-row-label">{row.label}</span>
          {!row.ids.some((id) => seen.has(id)) ? (
            <p className="zukan-row-locked" aria-label={`まだ出会っていない姿 ${row.ids.length}`}>
              🔒 ？？？ ×{row.ids.length}
            </p>
          ) : (
          <ol className="zukan-line">
            {row.ids.map((id, i) => {
              const f = FORMS.find((x) => x.id === id)!
              return (
                <li key={id} className={seen.has(id) ? 'got' : 'locked'}>
                  {i > 0 && (
                    <span className="zukan-arrow" aria-hidden="true">
                      ▶
                    </span>
                  )}
                  <button
                    className="party-pick zukan-pick"
                    aria-label={seen.has(id) ? `${f.name}の説明` : 'まだ出会っていない姿'}
                    disabled={!seen.has(id)}
                    onClick={() => setDetail(detail?.id === id ? null : f)}
                  >
                    <span className="zukan-figure">
                      <MonsterFigure form={f} hidden={!seen.has(id)} />
                    </span>
                    <span className="badge-name">{seen.has(id) ? f.name : '？？？'}</span>
                    <span className="badge-desc" title={f.hint}>{f.hint.split('・')[0]}</span>
                  </button>
                </li>
              )
            })}
          </ol>
          )}
        </div>
      ))}
      {/* まだ1つも会っていない系統が2つ以上なら、まとめて1行の「🔒 ？？？ ×N」にする */}
      {ZUKAN_ROWS.filter((row) => !row.ids.some((id) => seen.has(id))).length > 1 && (
        <div className="zukan-row">
          <span className="zukan-row-label">🔒 まだの進化</span>
          <p className="zukan-row-locked" aria-label={`まだ出会っていない姿 ${ZUKAN_ROWS.filter((row) => !row.ids.some((id) => seen.has(id))).reduce((n, r) => n + r.ids.length, 0)}`}>
            🔒 ？？？ ×{ZUKAN_ROWS.filter((row) => !row.ids.some((id) => seen.has(id))).reduce((n, r) => n + r.ids.length, 0)}
          </p>
        </div>
      )}
      <div className="zukan-row">
        <span className="zukan-row-label">
          🐾 キャラクター {SPECIES.filter((sp) => sp.id === 'mochi' || species.has(sp.id)).length} / {SPECIES.length}
        </span>
        <ol className="zukan-line zukan-kinds zukan-species">
          {SPECIES.filter((sp) => sp.id === 'mochi' || species.has(sp.id)).map((sp) => {
            const got = true
            return (
              <li key={sp.id} className={got ? 'got' : 'locked'}>
                {/* カードのふちを、そのキャラクターの色に（オーナーの依頼：デザインを高める） */}
                <button
                  className="zukan-pick sp-card"
                  style={{ '--sp-c': sp.line || '#16a34a' } as CSSProperties}
                  disabled={!got}
                  aria-label={got ? `${sp.name}：${sp.desc}` : 'まだ出会っていないキャラクター'}
                  onClick={() => setSpDetail(spDetail === sp.id ? null : sp.id)}
                >
                  <span className="zukan-figure">
                    <MonsterFigure form={withSpecies(FORMS[2], sp.id)} hidden={!got} />
                  </span>
                  <span className="badge-name">{got ? sp.name : '？？？'}</span>
                </button>
              </li>
            )
          })}
          {/* まだ出会っていないキャラクターは1マスの「？×N」にまとめる */}
          {SPECIES.some((sp) => sp.id !== 'mochi' && !species.has(sp.id)) && (
            <li className="locked zukan-more" aria-label={`まだ出会っていないキャラクター ${SPECIES.filter((sp) => sp.id !== 'mochi' && !species.has(sp.id)).length}`}>
              ？×{SPECIES.filter((sp) => sp.id !== 'mochi' && !species.has(sp.id)).length}
            </li>
          )}
        </ol>
      </div>
      {spDetail && (
        <p className="zukan-detail" role="status">
          <strong>{speciesOf(spDetail).name}</strong>：{speciesOf(spDetail).desc}（今日のチャレンジ：{challengeOf(spDetail).label}）
        </p>
      )}
      <div className="zukan-row">
        <span className="zukan-row-label">
          🎨 色ちがい {KINDS.filter((k) => k.id === 'normal' || kinds.has(k.id)).length} / {KINDS.length}
        </span>
        <ol className="zukan-line zukan-kinds">
          {KINDS.filter((k) => k.id === 'normal' || kinds.has(k.id)).map((k) => {
            const got = true
            return (
              <li key={k.id} className={got ? 'got' : 'locked'}>
                <span className="zukan-pick" aria-label={got ? `${k.name}（${RARITY_LABEL[k.rarity]}）` : 'まだ出ていない色'}>
                  <span className="zukan-figure">
                    <MonsterFigure form={FORMS[2]} kind={k.id} hidden={!got} />
                  </span>
                  <span className="badge-name">{got ? k.name : '？？？'}</span>
                  <span className={`badge-desc kind-tag r-${k.rarity}`}>{RARITY_LABEL[k.rarity]}</span>
                </span>
              </li>
            )
          })}
          {/* まだ出ていない色は1マスの「？×N」にまとめる */}
          {KINDS.some((k) => k.id !== 'normal' && !kinds.has(k.id)) && (
            <li className="locked zukan-more" aria-label={`まだ出ていない色 ${KINDS.filter((k) => k.id !== 'normal' && !kinds.has(k.id)).length}`}>
              ？×{KINDS.filter((k) => k.id !== 'normal' && !kinds.has(k.id)).length}
            </li>
          )}
        </ol>
      </div>
      <details className="zukan-collection game-fold lg-3">
        <summary>
          <span className="lg-icon" aria-hidden="true">📒</span>コレクション表
          <span className="fold-meta" aria-label={`コレクション表 ${ownedCount} / ${SPECIES.length * KINDS.length}・コンプリート率 ${pct}%`}>
            {ownedCount}/{SPECIES.length * KINDS.length}
          </span>
        </summary>
        <div className="zukan-pct" role="progressbar" aria-label="コンプリート率" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
          <span style={{ width: `${pct}%` }} />
        </div>
        <table>
          <thead>
            <tr>
              <th />
              {KINDS.map((k) => (
                <th key={k.id} className={`kind-tag r-${k.rarity}`}>
                  {k.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SPECIES.map((sp) => (
              <tr key={sp.id}>
                <th>{sp.name}</th>
                {KINDS.map((k) => {
                  const got = owned.has(`${sp.id}:${k.id}`)
                  return (
                    <td key={k.id} aria-label={`${sp.name}・${k.name}${got ? '（持っている）' : '（まだ）'}`}>
                      {got ? (
                        <span className="collection-figure">
                          <MonsterFigure form={withSpecies(FORMS[1], sp.id)} kind={k.id} />
                        </span>
                      ) : (
                        '・'
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
      {detail && (
        <div className="zukan-detail" role="status" style={{ background: `linear-gradient(135deg, ${detail.color}55, transparent 70%)` }}>
          <span className="zukan-big">
            <MonsterFigure form={detail} mood="happy" />
          </span>
          <span>
            <strong>{detail.name}</strong>
            <span className="zukan-stars" aria-label={`進化段階 ${detail.stage}`}>
              {'★'.repeat(detail.stage)}
              {'☆'.repeat(6 - detail.stage)}
            </span>
            <br />
            {FORM_DESC[detail.id]}
          </span>
        </div>
      )}
    </div>
  )
}

const PARTY_PAGE = 24

export function Party({ party, onSelect, onRename, onFav, onRelease, onWarm, warmLeft = 0, onTradeMembers, ticketsFull = false }: { party: PartyState; onSelect: (i: number) => void; onRename?: (i: number, name: string) => void; onFav?: (i: number) => void; onRelease?: (i: number) => void; onWarm?: (i: number) => void; warmLeft?: number; onTradeMembers?: () => void; ticketsFull?: boolean }) {
  const [editing, setEditing] = useState<number | null>(null)
  const [draft, setDraft] = useState('')
  const locked = EGG_MILESTONES.slice(party.members.length - (party.gacha ?? 0) - 1)
  const [limit, setLimit] = useState(PARTY_PAGE) // 仲間は500体まで。はじめは24体だけ見せて「もっと見る」
  const [byLv, setByLv] = useState(false) // デザイン82：なかまをレベルの高い順にならべる
  const [favOnly, setFavOnly] = useState(false) // デザイン83：おきにいり★の子だけ見る
  const sorted = byLv ? [...displayOrder(party)].sort((a, b) => party.members[b].xp - party.members[a].xp) : displayOrder(party)
  const [typeOnly, setTypeOnly] = useState('') // デザイン84：タイプでしぼりこむ
  const types = [...new Set(party.members.map((m) => typeOf(m.species).id))]
  const order = sorted.filter((i) => i === party.active || ((!favOnly || party.members[i].fav) && (!typeOnly || typeOf(party.members[i].species).id === typeOnly)))
  // 相棒は、はじめの24体に入っていなくても必ず見せる
  const shown = order.slice(0, limit).includes(party.active) ? order.slice(0, limit) : [party.active, ...order.slice(0, limit - 1)]
  return (
    <div className="party">
      <h2>
        単語のなかま <span className="attr-badge attr-word">属性：単語</span>
      </h2>
      {/* デザイン85：なかまの数とおきにいり★の数 */}
      <p className="party-count" aria-label={`なかま ${party.members.length}体・おきにいり ${party.members.filter((m) => m.fav).length}体`}>
        🐾 {party.members.length}体{party.members.some((m) => m.fav) && `・★ ${party.members.filter((m) => m.fav).length}体`}
      </p>
      <details className="party-help chip-fold cf-4">
        <summary>ℹ️ なかまについて</summary>
        <p className="stats-note">ガチャのモチたちは属性「単語」。単語の相棒のわくにだけおけます（文法・読解のなかまは「あいぼう」の上で入れかえ）。</p>
        {onRelease && party.members.length > 1 && <p className="stats-note">👋 でおわかれすると、レベルに応じてコインにかわるよ（なかま交換所。相棒とおきにいり★はおわかれできない）。</p>}
        {party.members.length > 1 && <p className="stats-note">タップで相棒を交代。相棒以外の子も、おるすばんで少しずつ育つよ（もらったXPの1割）。</p>}
        {onTradeMembers && <p className="stats-note">🐾 仲間10体で、🎟ガチャチケット1まいと交換できるよ（新しく来た子から順に。相棒とおきにいり★は数えない）。</p>}
      </details>
      {onTradeMembers && tradeableMembers(party).length > 0 && (
        <button
          className="good egg-trade-btn"
          disabled={tradeableMembers(party).length < MEMBERS_FOR_TICKET || ticketsFull}
          title="仲間（相棒・おきにいり★以外）10体で、ガチャチケット1まいと交換"
          onClick={() => {
            if (window.confirm(`仲間${MEMBERS_FOR_TICKET}体とおわかれして、🎟ガチャチケット1まいと交換しますか？（新しく来た子から順に。もとにもどせません）`)) onTradeMembers()
          }}
        >
          🐾×{MEMBERS_FOR_TICKET} → 🎟1 と交換
          <small>
            {ticketsFull ? 'チケットがいっぱい' : `なかま ${Math.min(tradeableMembers(party).length, MEMBERS_FOR_TICKET)}/${MEMBERS_FOR_TICKET}`}
          </small>
        </button>
      )}

      {party.members.length > 2 && (
        <p className="party-sorts">
          <button className="list-link pill-btn party-sort" aria-pressed={byLv} onClick={() => setByLv(!byLv)}>
            {byLv ? '🔀 いつものならび' : '⬆️ レベルの高い順'}
          </button>
          {party.members.some((m) => m.fav) && (
            <button className="list-link pill-btn party-sort" aria-pressed={favOnly} onClick={() => setFavOnly(!favOnly)}>
              {favOnly ? '👀 みんな見る' : '★ おきにいりだけ'}
            </button>
          )}
        </p>
      )}
      {party.members.length > 2 && types.length > 1 && (
        <p className="party-sorts party-types" role="group" aria-label="タイプでしぼりこむ">
          {types.map((t) => {
            const ty = party.members.map((m) => typeOf(m.species)).find((x) => x.id === t)!
            return (
              <button key={t} className={`list-link pill-btn party-sort char-type t-${t}`} aria-pressed={typeOnly === t} onClick={() => setTypeOnly(typeOnly === t ? '' : t)}>
                {ty.icon} {ty.name}
              </button>
            )
          })}
        </p>
      )}
      <ul className="badge-grid">
        {shown.map((i) => {
          const m = party.members[i]
          const f = formOf(m)
          const active = i === party.active
          return (
            <li key={i} className={`${active ? 'got active' : 'got'}${m.kind && ['SR', 'UR'].includes(kindOf(m.kind).rarity) ? ` shine r-${kindOf(m.kind).rarity}` : ''}`}>
              <button className="party-pick party-member" onClick={() => onSelect(i)} aria-pressed={active}>
                <span className="zukan-figure">
                  <MonsterFigure form={f} wear={m.wear} kind={m.kind} />
                </span>
                <span className="badge-name">{m.name ?? f.name}</span>
                <span className="badge-desc">
                  {active ? '相棒・' : ''}Lv.{levelInfo(m.xp).level}
                  {m.kind && <span className={`kind-tag r-${kindOf(m.kind).rarity}`}> {kindOf(m.kind).name}</span>}
                </span>
                <span className={`char-type t-${typeOf(m.species).id}`} title={typeOf(m.species).desc}>
                  {typeOf(m.species).icon} {typeOf(m.species).name}
                </span>
                <span className="party-bar" aria-hidden="true">
                  <span style={{ width: `${Math.round((levelInfo(m.xp).into / levelInfo(m.xp).need) * 100)}%` }} />
                </span>
                <span className="party-next">
                  {levelsToNextStage(levelInfo(m.xp).level) ? `あとLv${levelsToNextStage(levelInfo(m.xp).level)!.levels}で進化` : 'さいごの姿'}
                </span>
              </button>
              {onFav && (
                <button className={`fav-btn${m.fav ? ' on' : ''}`} aria-label={`${m.name ?? f.name}をおきにいりに${m.fav ? 'しない' : 'する'}`} aria-pressed={!!m.fav} onClick={() => onFav(i)}>
                  {m.fav ? '★' : '☆'}
                </button>
              )}
              {onWarm && f.stage === 0 && (
                <button className="warm-btn" disabled={warmLeft <= 0} aria-label={`${m.name ?? f.name}をあたためる`} title={`今日あと${warmLeft}回`} onClick={() => onWarm(i)}>
                  🔥 あたためる ×{warmLeft}
                </button>
              )}
              {onRelease && canRelease(party, i) && (
                <button
                  className="release-btn"
                  aria-label={`${m.name ?? f.name}とおわかれする`}
                  onClick={() => {
                    if (window.confirm(`${m.name ?? f.name}とおわかれして、🪙${releaseCoins(levelInfo(m.xp).level)}にかえますか？（もとにもどせません）`)) onRelease(i)
                  }}
                >
                  👋
                </button>
              )}
              {onRename &&
                (editing === i ? (
                  <form
                    className="rename party-rename"
                    onSubmit={(e: FormEvent) => {
                      e.preventDefault()
                      onRename(i, draft)
                      setEditing(null)
                    }}
                  >
                    <input value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={NAME_MAX * 2} placeholder={f.name} aria-label={`${f.name}の名前`} autoFocus />
                    <button type="submit">決定</button>
                  </form>
                ) : (
                  <button
                    className="rename-btn"
                    aria-label={`${m.name ?? f.name}に名前をつける`}
                    onClick={() => {
                      setDraft(m.name ?? '')
                      setEditing(i)
                    }}
                  >
                    ✏️
                  </button>
                ))}
            </li>
          )
        })}
        {/* まだもらっていないタマゴは1枚の「？×N」にまとめる（もらえる条件は title） */}
        {locked.length > 0 && (
          <li className="locked" title={locked.map((m) => `${m.label}でタマゴ`).join('・')} aria-label={`まだのタマゴ ${locked.length}（${locked.map((m) => m.label).join('・')}）`}>
            <span className="badge-icon" aria-hidden="true">
              🥚
            </span>
            <span className="badge-name">？×{locked.length}</span>
            <span className="badge-desc">{locked[0].label}でタマゴ</span>
          </li>
        )}
      </ul>
      {order.length > limit && (
        <button className="list-link pill-btn pill-blue party-more" onClick={() => setLimit(limit + PARTY_PAGE)}>
          もっと見る（あと{order.length - limit}体）
        </button>
      )}
    </div>
  )
}

const SRC_LABEL = { card: 'カード', quiz: 'クイズ', ear: '耳・スペル' } as const

export function Profile({ monster, studyDays = 0 }: { monster: MonsterState; studyDays?: number }) {
  const form = formOf(monster)
  const total = (monster.src?.card ?? 0) + (monster.src?.quiz ?? 0) + (monster.src?.ear ?? 0)
  return (
    <div className="profile">
      <h2>相棒のプロフィール</h2>
      <dl>
        <dt>名前</dt>
        <dd>{monster.name ?? form.name}</dd>
        <dt>すがた</dt>
        <dd>
          {form.name}（Lv.{levelInfo(monster.xp).level}）
        </dd>
        <dt>出会った日</dt>
        <dd>{monster.born ?? '記録なし'}</dd>
        <dt>累計XP</dt>
        <dd>{monster.xp}</dd>
        <dt>次の進化</dt>
        <dd>{levelsToNextStage(levelInfo(monster.xp).level) ? `あと ${levelsToNextStage(levelInfo(monster.xp).level)!.levels} レベル` : 'さいごのすがた！'}</dd>
        <dt>なつき度</dt>
        <dd aria-label={`なつき度 ${bondLevel(studyDays)}`}>
          {bondHearts(bondLevel(studyDays))}
          {daysToNext(studyDays) !== null && <small title={`あと${daysToNext(studyDays)}日学習でハートがふえる`}> あと{daysToNext(studyDays)}日</small>}
        </dd>
      </dl>
      {total > 0 && (
        <>
          <p className="stats-note" title="Lv15 の進化先に影響">学び方の割合</p>
          {(['card', 'quiz', 'ear'] as const).map((k) => {
            const n = monster.src?.[k] ?? 0
            const pct = Math.round((n / total) * 100)
            return (
              <div key={k} className="by-level-row">
                <span className="by-level-name">{SRC_LABEL[k]}</span>
                <div className="goal-bar">
                  <div className="goal-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="by-level-num">{pct}%</span>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

// 相棒の進化図：次の姿をシルエットで見せる
export function EvolutionPreview({ monster }: { monster: MonsterState }) {
  const n = nextFormOf(monster)
  if (!n) return <p className="evo-preview stats-note">🌟 さいごの姿まで進化したよ！</p>
  return (
    <div className="evo-preview">
      <span className="evo-preview-fig">
        <MonsterFigure form={n.form} hidden />
      </span>
      <span>
        <strong>🔮 次の姿は…？</strong>
        <br />
        あと Lv{n.levels} で進化！
        {n.form.stage >= 3 && !monster.branch && <small>（Lv15 のときにいちばん多い学び方で姿が決まるよ：カード・クイズ・リスニング）</small>}
      </span>
    </div>
  )
}
