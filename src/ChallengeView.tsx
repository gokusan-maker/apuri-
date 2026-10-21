import { useState } from 'react'
import { challengeOf, cleared, difficultyOf } from './challenge'
import { formOf, speciesOf, type MonsterState, type Source } from './monster'
import { MonsterFigure } from './MonsterView'
import { Quiz } from './QuizView'
import { wordsOf } from './words'

type Props = {
  monster: MonsterState
  done: boolean // 今日はもうクリアした
  onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void
  onClear: () => void // クリアしたとき（ごほうびはアプリ側で）
  onClose: () => void
}

// 今日のチャレンジ：相棒のキャラクターで問題の種類、育ち具合で難しさが決まる
export function Challenge({ monster, done, onAnswer, onClear, onClose }: Props) {
  const form = formOf(monster)
  const kind = challengeOf(monster.species)
  const diff = difficultyOf(form.stage)
  const [playing, setPlaying] = useState(false)
  const [score, setScore] = useState({ answered: 0, correct: 0 })
  const finished = score.answered >= diff.count
  const ok = finished && cleared(score.correct, score.answered)

  return (
    <section className="card challenge">
      <button className="stage-back" onClick={onClose}>
        ← もどる
      </button>
      <h2>⚔ 今日のチャレンジ</h2>
      <div className="challenge-head">
        <span className="challenge-face">
          <MonsterFigure form={form} kind={monster.kind} mood={finished ? (ok ? 'star' : 'lonely') : 'happy'} />
        </span>
        <p>
          <strong>{monster.name ?? form.name}</strong>（{speciesOf(monster.species).name}）のチャレンジ
          <br />
          {kind.icon} <strong>{kind.label}</strong>・{diff.label}（{diff.count}問）
          <br />
          <span className="stats-note">
            6割正解でクリア：🪙{diff.coins}＋{diff.xp}XP（3日連続クリアで🎟ガチャチケット）{done ? '（今日はクリアずみ。練習はできるよ）' : ''}
          </span>
        </p>
      </div>
      {!playing && (
        <button className="flip" onClick={() => setPlaying(true)}>
          チャレンジ開始！
        </button>
      )}
      {playing && !finished && (
        <Quiz
          words={wordsOf(diff.levels)}
          direction={kind.dir}
          lockDirection
          count={diff.count}
          onAnswer={(correct, xp, wordId, source) => {
            onAnswer?.(correct, xp, wordId, source)
            const n = { answered: score.answered + 1, correct: score.correct + (correct ? 1 : 0) }
            setScore(n)
            if (n.answered === diff.count && cleared(n.correct, n.answered) && !done) onClear()
          }}
        />
      )}
      {finished && (
        <div className="challenge-result" role="status">
          <p className="celebrate-title">{ok ? 'チャレンジ成功！' : 'おしい！'}</p>
          <p>
            {score.answered}問中 {score.correct}問正解
          </p>
          {ok && !done && (
            <p>
              ごほうび 🪙{diff.coins}・{diff.xp}XP をもらった！
            </p>
          )}
          <button
            className="flip"
            onClick={() => {
              setScore({ answered: 0, correct: 0 })
              setPlaying(true)
            }}
          >
            もう一度
          </button>
        </div>
      )}
      <p className="stats-note">キャラクターによって問題の種類が変わるよ：モチ＝単語・コンコン＝文法・ペンペン＝並べかえ・ウサピョン＝リスニング・ニャンタ＝和文英訳・ドラコ＝英文和訳。相棒が育つほど難しくなる！</p>
    </section>
  )
}
