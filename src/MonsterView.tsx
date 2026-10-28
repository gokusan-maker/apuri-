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
        {trioDone && (
          <span className="stage-trio" aria-label={trioStreak >= 2 ? `今日の課題3つクリア ${trioStreak}日連続` : '今日の課題3つクリア'}>
            🏅{trioStreak >= 2 && <small className="stage-trio-n">{trioStreak}</small>}
          </span>
        )}
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
            <span className="monster-level">Lv.{level}</span>
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
              🪙 {coins}
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
  const order = displayOrder(party)
  // 相棒は、はじめの24体に入っていなくても必ず見せる
  const shown = order.slice(0, limit).includes(party.active) ? order.slice(0, limit) : [party.active, ...order.slice(0, limit - 1)]
  return (
    <div className="party">
      <h2>
        単語のなかま <span className="attr-badge attr-word">属性：単語</span>
      </h2>
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
