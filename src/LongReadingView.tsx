import { weekKey } from './rareboss'
import { useEffect, useState } from 'react'
import { loadWeekResults, pushWeekResult, weekTop, solvedBadges, loadBookmarks, saveBookmarks, addGenreStats, loadGenreStats, wpmOf, levelPick, TYPE_TIPS, loadLongHistory, pushLongHistory, readingLevel, DAILY_LONG_COINS, dailyLong, loadDailyLongDay, saveDailyLongDay, loadLongTimes, recordLongTime, seqRight, GENRES, genreOf, type Genre, loadLongDraft, saveLongDraft, randomLong, longStars, addReadWords, loadReadWords, wordCount, evidenceParas, formatTime, recommendLong, shownTitle, LONG_PASSAGES, loadLongRecord, loadTypeStats, mergeTypes, saveTypeStats, TYPE_LABEL, typeResults, type QType, MARKS, saveLongRecord, scoreLong, targetMinutes, totalOf, XP_LONG_ITEM, type LongPassage } from './longreading'
import { keyWords } from './longvocab'
import { LongVocabQuiz } from './LongVocabQuizView'
import { grammarTags } from './longgrammar'
import type { Source } from './monster'
import { playCorrect, playWrong } from './sound'
import { cancelSpeech, speak, speakSeq } from './speech'
import { dayKey } from './srs'

type Props = { onAnswer?: (correct: boolean, xp: number, wordId: string, source: Source) => void; onFavorite?: (ids: string[]) => void; onCoins?: (n: number) => void }

const nowMs = () => Date.now() // ボタンを押したときだけ呼ぶ
const rand = () => Math.random()

// 読み上げ用：空所は「ブランク」と読まず、少し間をあける
const readable = (t: string) => t.replace(/\( [A-Z] \)|\[ \d \]/g, ', ... ,')

// 本文の「( A )」を目立つ空所にする
function Paragraph({ text, underline, refer }: { text: string; underline?: string; refer?: { phrase: string; word: string } }) {
  const parts = text.split(/(\( [A-Z] \)|\[ \d \])/)
  return (
    <p className="long-para">
      {parts.map((s, i) => {
        if (/^(\( [A-Z] \)|\[ \d \])$/.test(s))
          return (
            <span key={i} className="long-blank">
              {s}
            </span>
          )
        const rAt = refer ? s.indexOf(refer.phrase) : -1
        if (rAt >= 0) {
          const w = s.indexOf(refer!.word, rAt)
          return (
            <span key={i}>
              {s.slice(0, w)}
              <u className="long-refer">{refer!.word}</u>
              {s.slice(w + refer!.word.length)}
            </span>
          )
        }
        const at = underline ? s.indexOf(underline) : -1
        if (at < 0) return s
        return (
          <span key={i}>
            {s.slice(0, at)}
            <u className="long-underline">{underline}</u>
            {s.slice(at + underline!.length)}
          </span>
        )
      })}
    </p>
  )
}

// 長文読解（入試形式）：空所補充（記号）と内容一致（○×）をまとめて答えて採点する
export function LongReading({ onAnswer, onFavorite, onCoins }: Props) {
  const [p, setP] = useState<LongPassage | null>(null)
  const [starred, setStarred] = useState<string[]>([]) // この画面で★に入れた語
  const [blanks, setBlanks] = useState<Record<string, number>>({})
  const [tf, setTf] = useState<Record<number, boolean>>({})
  const [picks, setPicks] = useState<number[]>([])
  const [under, setUnder] = useState<number | undefined>(undefined)
  const [order, setOrder] = useState<number[]>([]) // 並べた語の番号
  const [sents, setSents] = useState<Record<string, number>>({}) // 会話文の [ 1 ] に入る文
  const [startAt, setStartAt] = useState(0) // 読みはじめた時刻
  const [qa, setQa] = useState<Record<number, number>>({}) // 英問英答
  const [refer, setRefer] = useState<number | undefined>(undefined) // 指示語
  const [gist, setGist] = useState<Record<number, number>>({}) // 段落の要旨
  const [titlePick, setTitlePick] = useState<number | undefined>(undefined) // タイトル選択
  const [ins, setIns] = useState<number | undefined>(undefined) // 文を入れる位置
  const [summ, setSumm] = useState<Record<number, number>>({}) // 要約文の完成
  const [voc, setVoc] = useState<Record<number, number>>({}) // 語句の意味
  const [seq, setSeq] = useState<number[]>([]) // 出来事の順番
  const [comp, setComp] = useState<Record<number, number>>({}) // 英文の完成
  const [took, setTook] = useState(0) // かかった秒数
  const [done, setDone] = useState(false)
  const [showJa, setShowJa] = useState(false)
  const [record, setRecord] = useState(loadLongRecord)
  const [types, setTypes] = useState(loadTypeStats)
  const [readWords, setReadWords] = useState(loadReadWords)
  const [history, setHistory] = useState(loadLongHistory)
  const [genreStats, setGenreStats] = useState(loadGenreStats)
  const [bookmarks, setBookmarks] = useState(loadBookmarks)
  const [weekRes, setWeekRes] = useState(loadWeekResults)
  const [vocabQuiz, setVocabQuiz] = useState(false)
  const [resumed, setResumed] = useState(false)
  const [readingAll, setReadingAll] = useState(false)
  const [jaParas, setJaParas] = useState<number[]>([])
  const [aloudAt, setAloudAt] = useState<number | null>(null) // 音読を始めた時刻
  const [wpm, setWpm] = useState(0)
  const [instant, setInstant] = useState(false) // すぐに答えあわせ（空所補充・○×） // 和訳を開いている段落
  const [bestTime, setBestTime] = useState(false)
  const [today] = useState(() => dayKey())
  const [dailyDay, setDailyDay] = useState(loadDailyLongDay)
  const [dailyGot, setDailyGot] = useState(false) // この回で今日の1本のごほうびをもらった // この回で最短タイムを更新した
  const [genre, setGenre] = useState<Genre | 'all'>('all')

  function openPassage(x: LongPassage) {
    const d = loadLongDraft(x.id)
    setStartAt(nowMs())
    setP(x)
    setBlanks(d?.blanks ?? {})
    setTf(d?.tf ?? {})
    setPicks(d?.picks ?? [])
    setUnder(d?.under)
    setOrder(d?.order ?? [])
    setSents(d?.sents ?? {})
    setQa(d?.qa ?? {})
    setRefer(d?.refer)
    setGist(d?.gist ?? {})
    setTitlePick(d?.title)
    setComp(d?.comp ?? {})
    setIns(d?.insert)
    setSumm(d?.summary ?? {})
    setVoc(d?.vocab ?? {})
    setSeq(d?.seq ?? [])
    setDone(false)
    setShowJa(false)
    setJaParas([])
    setAloudAt(null)
    setWpm(0)
    setResumed(!!d)
  }

  // 答えかけの内容をとっておく（採点したら消す）
  useEffect(() => {
    if (!p) return
    saveLongDraft(p.id, done ? null : { blanks, tf, picks, under, order, sents, qa, refer, gist, title: titlePick, comp, insert: ins, summary: summ, vocab: voc, seq })
  }, [p, done, blanks, tf, picks, under, order, sents, qa, refer, gist, titlePick, comp, ins, summ, voc, seq])

  if (!p && vocabQuiz) return <LongVocabQuiz readIds={Object.keys(record)} onAnswer={onAnswer} onBack={() => setVocabQuiz(false)} />
  if (!p) {
    return (
      <section className="card grammar long-reading">
        <h2>長文読解（入試形式）</h2>
        <p className="stats-note">私立高校の入試のような長文。空所に入る語を記号で選び、本文の内容と合うものに○、合わないものに×をつけよう。</p>
        <button className={`long-recommend daily-long${dailyDay === today ? ' done' : ''}`} onClick={() => openPassage(dailyLong(today))}>
          📅 今日の1本：<strong>{shownTitle(dailyLong(today), LONG_PASSAGES.indexOf(dailyLong(today)))}</strong>
          {dailyDay === today ? ' ✅ クリア' : `（満点で🪙${DAILY_LONG_COINS}）`}
        </button>
        {Object.keys(record).length > 0 && (
          <button className="list-link" onClick={() => setVocabQuiz(true)}>
            📒 重要語句クイズ（読んだ長文から5問）
          </button>
        )}
        <button className="list-link" onClick={() => openPassage(randomLong(record, rand()))}>
          🎲 ランダム挑戦{LONG_PASSAGES.some((x) => record[x.id] === undefined) ? '（まだ解いていない長文から）' : ''}
        </button>
        {recommendLong(types, record) && (
          <button className="long-recommend" onClick={() => openPassage(recommendLong(types, record)!.passage)}>
            💡 おすすめ：苦手な「{TYPE_LABEL[recommendLong(types, record)!.type]}」の練習に
            <strong>{shownTitle(recommendLong(types, record)!.passage, LONG_PASSAGES.indexOf(recommendLong(types, record)!.passage))}</strong>
          </button>
        )}
        {LONG_PASSAGES.some((x) => record[x.id] !== undefined && record[x.id] < totalOf(x)) && (
          <div className="long-review">
            <p className="long-review-title">🔁 もう一度ときたい長文（満点でないもの）</p>
            {LONG_PASSAGES.filter((x) => record[x.id] !== undefined && record[x.id] < totalOf(x)).map((x) => (
              <button key={x.id} className="list-link" onClick={() => openPassage(x)}>
                {shownTitle(x, LONG_PASSAGES.indexOf(x))}（{record[x.id]} / {totalOf(x)}点）
              </button>
            ))}
          </div>
        )}
        {Object.keys(types).length > 0 && (
          <details className="long-types">
            <summary>📊 問題のタイプ別 正答率</summary>
            <ul>
              {(Object.keys(TYPE_LABEL) as QType[])
                .filter((k) => types[k])
                .map((k) => {
                  const [ok, n] = types[k]!
                  const pct = Math.round((ok / n) * 100)
                  return (
                    <li key={k} className={pct < 60 ? 'weak' : undefined}>
                      {TYPE_LABEL[k]}：{pct}%（{ok}/{n}）{pct < 60 ? ' ← 苦手' : ''}
                    </li>
                  )
                })}
            </ul>
          </details>
        )}
        <p className="stats-note">📚 これまでに読んだ語数：{readWords}語</p>
        <div className="long-challenge" aria-label={`解いた長文 ${Object.keys(record).filter((id) => LONG_PASSAGES.some((x) => x.id === id)).length} / ${LONG_PASSAGES.length}本`}>
          <p className="stats-note">
            🏁 全部制覇チャレンジ：{Object.keys(record).filter((id) => LONG_PASSAGES.some((x) => x.id === id)).length} / {LONG_PASSAGES.length}本　{solvedBadges(Object.keys(record).filter((id) => LONG_PASSAGES.some((x) => x.id === id)).length, LONG_PASSAGES.length).join(' ')}
          </p>
          <div className="zukan-pct">
            <span style={{ width: `${(Object.keys(record).filter((id) => LONG_PASSAGES.some((x) => x.id === id)).length / LONG_PASSAGES.length) * 100}%` }} />
          </div>
        </div>
        {readingLevel(history) && (
          <p className="stats-note reading-level">
            🎓 読解レベル：<strong>{readingLevel(history)!.name}</strong>（直近{history.length}本の正答率 {readingLevel(history)!.pct}%）
          </p>
        )}
        {weekTop(weekRes, weekKey(today), weekKey).length > 0 && (
          <div className="long-week-rank">
            <p className="stats-note">🏆 今週の長文ランキング</p>
            <ol>
              {weekTop(weekRes, weekKey(today), weekKey).map((r) => {
                const x = LONG_PASSAGES.find((y) => y.id === r.id)
                return x ? <li key={r.id}>{`${shownTitle(x, LONG_PASSAGES.indexOf(x))}　${r.pct}%`}</li> : null
              })}
            </ol>
          </div>
        )}
        {Object.keys(genreStats).length > 0 && (
          <p className="stats-note genre-stats">
            📊 ジャンル別：
            {GENRES.filter((g) => genreStats[g]).map((g) => `${g} ${Math.round((genreStats[g]![0] / genreStats[g]![1]) * 100)}%`).join('・')}
          </p>
        )}
        {readingLevel(history) && levelPick(readingLevel(history)!.name, record) && (
          <button className="list-link" onClick={() => openPassage(levelPick(readingLevel(history)!.name, record)!)}>
            🎯 {readingLevel(history)!.name}のきみにおすすめ：{shownTitle(levelPick(readingLevel(history)!.name, record)!, LONG_PASSAGES.indexOf(levelPick(readingLevel(history)!.name, record)!))}
          </button>
        )}
        <div className="sub-tabs genre-tabs" role="tablist" aria-label="長文の種類">
          {(['all', ...GENRES] as const).map((g) => (
            <button key={g} role="tab" aria-selected={genre === g} onClick={() => setGenre(g)}>
              {g === 'all' ? 'すべて' : g}
            </button>
          ))}
        </div>
        <ul className="grammar-list">
          {[...LONG_PASSAGES.filter((x) => bookmarks.includes(x.id)), ...LONG_PASSAGES.filter((x) => !bookmarks.includes(x.id))].filter((x) => genre === 'all' || genreOf(x) === genre).map((x) => (
            <li key={x.id} className="with-fav">
              <button
                className={`grammar-fav${bookmarks.includes(x.id) ? ' on' : ''}`}
                aria-label={`${shownTitle(x, LONG_PASSAGES.indexOf(x))}をしおりに${bookmarks.includes(x.id) ? '入れない' : '入れる'}`}
                aria-pressed={bookmarks.includes(x.id)}
                onClick={() => {
                  const b = bookmarks.includes(x.id) ? bookmarks.filter((y) => y !== x.id) : [...bookmarks, x.id]
                  setBookmarks(b)
                  saveBookmarks(b)
                }}
              >
                {bookmarks.includes(x.id) ? '★' : '☆'}
              </button>
              <button
                onClick={() => openPassage(x)}
              >
                📖 {shownTitle(x, LONG_PASSAGES.indexOf(x))}
                <span className="long-meta">
                  {x.level}・{wordCount(x)}語・{totalOf(x)}点・目安{targetMinutes(x)}分{loadLongDraft(x.id) ? '・✏️とちゅう' : ''}{loadLongTimes()[x.id] ? `・🏁${formatTime(loadLongTimes()[x.id])}` : ''}{record[x.id] !== undefined ? `・最高 ${record[x.id]}点 ${'★'.repeat(longStars(record[x.id], totalOf(x)))}${'☆'.repeat(3 - longStars(record[x.id], totalOf(x)))}` : ''}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
  }

  const evidence = done
    ? evidenceParas(
        p,
        p.blanks.filter((b) => blanks[b.id] !== b.answer).map((b) => b.id),
        p.tf.map((t, i) => (tf[i] === t.answer ? -1 : i)).filter((i) => i >= 0),
        !!p.underline && under !== p.underline.answer,
      )
    : []
  const orderText = p.order ? order.map((i) => p.order!.words[i]).join(' ') : ''
  const { score, total } = scoreLong(p, blanks, tf, picks, { underline: under, order: orderText, sentences: sents, qa, refer, gist, title: titlePick, complete: comp, insert: ins, summary: summ, vocab: voc, seq })
  const answered = Object.keys(blanks).length + Object.keys(tf).length + picks.length + (under !== undefined ? 1 : 0) + (p.order && order.length === p.order.words.length ? 1 : 0) + Object.keys(sents).length + Object.keys(qa).length + (refer !== undefined ? 1 : 0) + Object.keys(gist).length + (titlePick !== undefined ? 1 : 0) + Object.keys(comp).length + (ins !== undefined ? 1 : 0) + Object.keys(summ).length + Object.keys(voc).length + (p.seq && seq.length === p.seq.events.length ? 1 : 0)
  const markNow = (ok: boolean) => (done || instant ? (ok ? ' right' : ' wrong') : '')

  return (
    <section className="card grammar long-reading">
      <div className="stage-head">
        <button
          className="stage-back"
          onClick={() => {
            cancelSpeech()
            setReadingAll(false)
            setP(null)
          }}
        >
          ← 長文の一覧
        </button>
        <span>
          {p.level}・{wordCount(p)}語・⏱ 目安{targetMinutes(p)}分
        </span>
      </div>
      <h2>{shownTitle(p, LONG_PASSAGES.indexOf(p))}</h2>
      {grammarTags(p).length > 0 && (
        <p className="long-gtags" aria-label="この長文に出てくる文法">
          📘 {grammarTags(p).map((t) => (
            <span key={t.id} className="long-gtag">
              {t.title}
            </span>
          ))}
        </p>
      )}
      {resumed && !done && <p className="stats-note">✏️ とちゅうから再開しました（答えかけの内容はそのまま）</p>}
      <div className="long-read-row">
        {aloudAt === null ? (
          <button
            className="list-link"
            onClick={() => {
              setWpm(0)
              setAloudAt(nowMs())
            }}
          >
            🎙 音読タイム（声に出して読む）
          </button>
        ) : (
          <button
            className="list-link"
            onClick={() => {
              setWpm(wpmOf(wordCount(p), Math.max(1, Math.round((nowMs() - aloudAt) / 1000))))
              setAloudAt(null)
            }}
          >
            ⏹ 読みおわった！
          </button>
        )}
        {readingAll ? (
          <button
            className="list-link long-read-all"
            onClick={() => {
              cancelSpeech()
              setReadingAll(false)
            }}
          >
            ⏹ 読み上げをとめる
          </button>
        ) : (
          ([false, true] as const).map((slow) => (
            <button
              key={String(slow)}
              className="list-link long-read-all"
              onClick={() => {
                setReadingAll(true)
                speakSeq(
                  p.paragraphs.map((t) => ({ text: readable(t) })),
                  () => setReadingAll(false),
                  slow,
                )
              }}
            >
              {slow ? '🐢 ゆっくり聞く' : '🔊 全文を聞く'}
            </button>
          ))
        )}
      </div>
      <label className="long-instant">
        <input type="checkbox" checked={instant} disabled={done} onChange={(e) => setInstant(e.target.checked)} /> ⚡ 1問ずつすぐに答えあわせ（空所補充・○×）
      </label>
      {wpm > 0 && <p className="stats-note">🎙 音読スピード：1分あたり {wpm}語{wpm >= 100 ? '　すらすら読めたね！' : ''}</p>}
      <div className="long-text">
        {done && evidence.length > 0 && <p className="long-evidence-note">🟨 まちがえた問題の根拠がある段落に色をつけたよ</p>}
        {p.paragraphs.map((t, i) => (
          <div key={i} className={evidence.includes(i) ? 'long-evidence' : undefined} aria-label={evidence.includes(i) ? `根拠の段落 ${i + 1}` : undefined}>
            <div className="long-para-row">
              <Paragraph text={t} underline={p.underline?.phrase} refer={p.refer} />
              <button className="speak small long-speak" aria-label={`第${i + 1}段落を聞く`} onClick={() => speak(readable(t))}>
                🔊
              </button>
              <button className="speak small long-speak" aria-label={`第${i + 1}段落の和訳`} aria-pressed={jaParas.includes(i)} onClick={() => setJaParas(jaParas.includes(i) ? jaParas.filter((x) => x !== i) : [...jaParas, i])}>
                訳
              </button>
            </div>
            {(showJa || jaParas.includes(i)) && <p className="long-ja">{p.ja[i]}</p>}
            {p.insert && p.insert.after.includes(i) && <p className="long-insert-mark">［{MARKS[p.insert.after.indexOf(i)]}］</p>}
          </div>
        ))}
      </div>
      {p.table && (
        <div className="long-table-wrap">
          <table className="long-table">
            <thead>
              <tr>
                {p.table[0].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.table.slice(1).map((row) => (
                <tr key={row[0]}>
                  {row.map((c, i) => (
                    <td key={i}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button className="list-link" onClick={() => setShowJa(!showJa)}>
        {showJa ? '和訳をかくす' : '和訳を見る'}
      </button>
      {keyWords(p).length > 0 && (
        <details className="long-vocab">
          <summary>📒 重要語句（{keyWords(p).length}）</summary>
          <ul>
            {keyWords(p).map((w) => (
              <li key={w.id}>
                <strong>{w.en}</strong> {w.ja}
                {onFavorite && (
                  <button
                    className="long-vocab-fav"
                    aria-label={`${w.en}を★に入れる`}
                    disabled={starred.includes(w.id)}
                    onClick={() => {
                      onFavorite([w.id])
                      setStarred([...starred, w.id])
                    }}
                  >
                    {starred.includes(w.id) ? '★' : '＋☆'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </details>
      )}

      <h3 className="long-q">問1　本文の ( A )〜( {p.blanks.at(-1)!.id} ) に入る最も適切な語を、それぞれ ア〜エ から選びなさい。</h3>
      {p.blanks.map((b) => (
        <div key={b.id} className="long-item">
          <span className="long-label">( {b.id} )</span>
          <div className="long-choices">
            {b.choices.map((c, i) => (
              <button
                key={c}
                className={`long-choice${blanks[b.id] === i ? ' picked' : ''}${(done || (instant && blanks[b.id] !== undefined)) && i === b.answer ? ' answer' : ''}`}
                disabled={done || (instant && blanks[b.id] !== undefined)}
                aria-pressed={blanks[b.id] === i}
                onClick={() => setBlanks({ ...blanks, [b.id]: i })}
              >
                {MARKS[i]} {c}
              </button>
            ))}
          </div>
          {(done || (instant && blanks[b.id] !== undefined)) && (
            <p className={`long-why${markNow(blanks[b.id] === b.answer)}`}>
              {blanks[b.id] === b.answer ? '⭕' : '❌'} 正解 {MARKS[b.answer]}（{b.choices[b.answer]}）：{b.why}
            </p>
          )}
        </div>
      ))}

      {p.sentences && (
        <>
          <h3 className="long-q">問1-2　会話の [ 1 ]〜[ {p.sentences.at(-1)!.id} ] に入る最も適切な文を、それぞれ ア〜エ から選びなさい。</h3>
          {p.sentences.map((sb) => (
            <div key={sb.id} className="long-item">
              <span className="long-label">[ {sb.id} ]</span>
              <div className="long-choices one">
                {sb.choices.map((c, i) => (
                  <button
                    key={c}
                    className={`long-choice${sents[sb.id] === i ? ' picked' : ''}${done && i === sb.answer ? ' answer' : ''}`}
                    disabled={done}
                    aria-pressed={sents[sb.id] === i}
                    onClick={() => setSents({ ...sents, [sb.id]: i })}
                  >
                    {MARKS[i]} {c}
                  </button>
                ))}
              </div>
              {done && (
                <p className={`long-why${sents[sb.id] === sb.answer ? ' right' : ' wrong'}`}>
                  {sents[sb.id] === sb.answer ? '⭕' : '❌'} 正解 {MARKS[sb.answer]}：{sb.why}
                </p>
              )}
            </div>
          ))}
        </>
      )}

      <h3 className="long-q">問2　次の英文が本文の内容と合っていれば○、合っていなければ×を選びなさい。</h3>
      {p.tf.map((t, i) => (
        <div key={i} className="long-item">
          <p className="long-statement">
            ({i + 1}) {t.statement}
          </p>
          <div className="long-choices tf">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                className={`long-choice${tf[i] === v ? ' picked' : ''}${(done || (instant && tf[i] !== undefined)) && v === t.answer ? ' answer' : ''}`}
                disabled={done || (instant && tf[i] !== undefined)}
                aria-pressed={tf[i] === v}
                aria-label={`(${i + 1}) ${v ? '○' : '×'}`}
                onClick={() => setTf({ ...tf, [i]: v })}
              >
                {v ? '○' : '×'}
              </button>
            ))}
          </div>
          {(done || (instant && tf[i] !== undefined)) && (
            <p className={`long-why${markNow(tf[i] === t.answer)}`}>
              {tf[i] === t.answer ? '⭕' : '❌'} 正解 {t.answer ? '○' : '×'}：{t.why}
            </p>
          )}
        </div>
      ))}

      {p.qa && (
        <>
          <h3 className="long-q">問　次の質問の答えとして最も適切なものを、それぞれ ア〜エ から選びなさい。</h3>
          {p.qa.map((x, n) => (
            <div key={n} className="long-item">
              <p className="long-statement">
                Q{n + 1}. {x.q}
              </p>
              <div className="long-choices one">
                {x.choices.map((c, i) => (
                  <button key={c} className={`long-choice${qa[n] === i ? ' picked' : ''}${done && i === x.answer ? ' answer' : ''}`} disabled={done} aria-pressed={qa[n] === i} onClick={() => setQa({ ...qa, [n]: i })}>
                    {MARKS[i]} {c}
                  </button>
                ))}
              </div>
              {done && (
                <p className={`long-why${qa[n] === x.answer ? ' right' : ' wrong'}`}>
                  {qa[n] === x.answer ? '⭕' : '❌'} 正解 {MARKS[x.answer]}：{x.why}
                </p>
              )}
            </div>
          ))}
        </>
      )}

      {p.pick2 && (
        <>
          <h3 className="long-q">問3　本文の内容と合うものを、ア〜カ から2つ選びなさい。</h3>
          <div className="long-item">
            {p.pick2.statements.map((st, i) => (
              <button
                key={i}
                className={`long-choice long-pick${picks.includes(i) ? ' picked' : ''}${done && p.pick2!.answers.includes(i) ? ' answer' : ''}`}
                disabled={done}
                aria-pressed={picks.includes(i)}
                onClick={() => setPicks(picks.includes(i) ? picks.filter((x) => x !== i) : picks.length < 2 ? [...picks, i] : [picks[1], i])}
              >
                {MARKS[i]} {st}
              </button>
            ))}
            {done && (
              <p className={`long-why${picks.filter((i) => p.pick2!.answers.includes(i)).length === 2 ? ' right' : ' wrong'}`}>
                正解 {p.pick2.answers.map((i) => MARKS[i]).join('・')}：{p.pick2.why}
              </p>
            )}
          </div>
        </>
      )}

      {p.complete && (
        <>
          <h3 className="long-q">問　本文の内容に合うように、英文の続きとして最も適切なものを ア〜エ から選びなさい。</h3>
          {p.complete.map((x, n) => (
            <div key={n} className="long-item">
              <p className="long-statement">
                ({n + 1}) {x.q}
              </p>
              <div className="long-choices one">
                {x.choices.map((c, i) => (
                  <button key={c} className={`long-choice${comp[n] === i ? ' picked' : ''}${done && i === x.answer ? ' answer' : ''}`} disabled={done} aria-pressed={comp[n] === i} onClick={() => setComp({ ...comp, [n]: i })}>
                    {MARKS[i]} {c}
                  </button>
                ))}
              </div>
              {done && (
                <p className={`long-why${comp[n] === x.answer ? ' right' : ' wrong'}`}>
                  {comp[n] === x.answer ? '⭕' : '❌'} 正解 {MARKS[x.answer]}：{x.why}
                </p>
              )}
            </div>
          ))}
        </>
      )}

      {p.seq && (
        <>
          <h3 className="long-q">問　次の ア〜エ の出来事を、起きた順に並べなさい（タップした順に並びます）。</h3>
          <div className="long-item">
            <p className="long-order-answer" aria-label="並べた順番">
              {seq.length ? seq.map((i) => MARKS[i]).join(' → ') : '　'}
            </p>
            <div className="long-choices one">
              {p.seq.events.map((e, i) => (
                <button key={e} className={`long-choice${seq.includes(i) ? ' picked' : ''}`} disabled={done || seq.includes(i)} onClick={() => setSeq([...seq, i])}>
                  {MARKS[i]} {e}
                </button>
              ))}
            </div>
            {!done && seq.length > 0 && (
              <button className="list-link" onClick={() => setSeq([])}>
                やりなおす
              </button>
            )}
            {done && (
              <p className={`long-why${seqRight(p.seq, seq) ? ' right' : ' wrong'}`}>
                {seqRight(p.seq, seq) ? '⭕' : '❌'} 正解 {p.seq.answer.map((i) => MARKS[i]).join(' → ')}：{p.seq.why}
              </p>
            )}
          </div>
        </>
      )}

      {p.vocab && (
        <>
          <h3 className="long-q">問　本文中の次の語の意味として最も適切なものを、前後の内容から考えて ア〜エ から選びなさい。</h3>
          {p.vocab.map((v, n) => (
            <div key={v.word} className="long-item">
              <p className="long-vocab-word">{v.word}</p>
              <div className="long-choices">
                {v.choices.map((c, i) => (
                  <button key={c} className={`long-choice${voc[n] === i ? ' picked' : ''}${done && i === v.answer ? ' answer' : ''}`} disabled={done} aria-pressed={voc[n] === i} onClick={() => setVoc({ ...voc, [n]: i })}>
                    {MARKS[i]} {c}
                  </button>
                ))}
              </div>
              {done && (
                <p className={`long-why${voc[n] === v.answer ? ' right' : ' wrong'}`}>
                  {voc[n] === v.answer ? '⭕' : '❌'} 正解 {MARKS[v.answer]}：{v.why}
                </p>
              )}
            </div>
          ))}
        </>
      )}

      {p.summary && (
        <>
          <h3 className="long-q">問　次の英文は本文の内容をまとめたものです。( 1 )〜( {p.summary.blanks.length} ) に入る最も適切な語を、ア〜エ から選びなさい。</h3>
          <p className="long-summary">{p.summary.text}</p>
          {p.summary.blanks.map((b, n) => (
            <div key={n} className="long-item">
              <p className="long-tf-text">( {n + 1} )</p>
              <div className="long-choices">
                {b.choices.map((c, i) => (
                  <button key={c} className={`long-choice${summ[n] === i ? ' picked' : ''}${done && i === b.answer ? ' answer' : ''}`} disabled={done} aria-pressed={summ[n] === i} onClick={() => setSumm({ ...summ, [n]: i })}>
                    {MARKS[i]} {c}
                  </button>
                ))}
              </div>
              {done && (
                <p className={`long-why${summ[n] === b.answer ? ' right' : ' wrong'}`}>
                  {summ[n] === b.answer ? '⭕' : '❌'} 正解 {MARKS[b.answer]}：{b.why}
                </p>
              )}
            </div>
          ))}
        </>
      )}

      {p.insert && (
        <>
          <h3 className="long-q">問　次の英文が入る最も適切な場所を、本文中の［ア］〜［エ］から選びなさい。</h3>
          <div className="long-item">
            <p className="long-insert-sentence">{p.insert.sentence}</p>
            <div className="long-choices">
              {p.insert.after.map((_, i) => (
                <button key={i} className={`long-choice${ins === i ? ' picked' : ''}${done && i === p.insert!.answer ? ' answer' : ''}`} disabled={done} aria-pressed={ins === i} onClick={() => setIns(i)}>
                  ［{MARKS[i]}］
                </button>
              ))}
            </div>
            {done && (
              <p className={`long-why${ins === p.insert.answer ? ' right' : ' wrong'}`}>
                {ins === p.insert.answer ? '⭕' : '❌'} 正解［{MARKS[p.insert.answer]}］：{p.insert.why}
              </p>
            )}
          </div>
        </>
      )}

      {p.titleQ && (
        <>
          <h3 className="long-q">問　この文章のタイトルとして最も適切なものを、ア〜エ から選びなさい。</h3>
          <div className="long-item">
            <div className="long-choices one">
              {p.titleQ.choices.map((c, i) => (
                <button key={c} className={`long-choice${titlePick === i ? ' picked' : ''}${done && i === p.titleQ!.answer ? ' answer' : ''}`} disabled={done} aria-pressed={titlePick === i} onClick={() => setTitlePick(i)}>
                  {MARKS[i]} {c}
                </button>
              ))}
            </div>
            {done && (
              <p className={`long-why${titlePick === p.titleQ.answer ? ' right' : ' wrong'}`}>
                {titlePick === p.titleQ.answer ? '⭕' : '❌'} 正解 {MARKS[p.titleQ.answer]}：{p.titleQ.why}
              </p>
            )}
          </div>
        </>
      )}

      {p.gist && (
        <>
          <h3 className="long-q">問　次の段落の内容に最も合う見出しを、それぞれ ア〜エ から選びなさい。</h3>
          {p.gist.map((x, n) => (
            <div key={n} className="long-item">
              <span className="long-label">第{x.para + 1}段落</span>
              <div className="long-choices one">
                {x.choices.map((c, i) => (
                  <button key={c} className={`long-choice${gist[n] === i ? ' picked' : ''}${done && i === x.answer ? ' answer' : ''}`} disabled={done} aria-pressed={gist[n] === i} onClick={() => setGist({ ...gist, [n]: i })}>
                    {MARKS[i]} {c}
                  </button>
                ))}
              </div>
              {done && (
                <p className={`long-why${gist[n] === x.answer ? ' right' : ' wrong'}`}>
                  {gist[n] === x.answer ? '⭕' : '❌'} 正解 {MARKS[x.answer]}：{x.why}
                </p>
              )}
            </div>
          ))}
        </>
      )}

      {p.refer && (
        <>
          <h3 className="long-q">問　本文中の二重下線部 <u className="long-refer">{p.refer.word}</u> が指すものを、ア〜エ から選びなさい。</h3>
          <div className="long-item">
            <div className="long-choices one">
              {p.refer.choices.map((c, i) => (
                <button key={c} className={`long-choice${refer === i ? ' picked' : ''}${done && i === p.refer!.answer ? ' answer' : ''}`} disabled={done} aria-pressed={refer === i} onClick={() => setRefer(i)}>
                  {MARKS[i]} {c}
                </button>
              ))}
            </div>
            {done && (
              <p className={`long-why${refer === p.refer.answer ? ' right' : ' wrong'}`}>
                {refer === p.refer.answer ? '⭕' : '❌'} 正解 {MARKS[p.refer.answer]}：{p.refer.why}
              </p>
            )}
          </div>
        </>
      )}

      {p.underline && (
        <>
          <h3 className="long-q">問{p.pick2 ? 4 : 3}　下線部 <u>{p.underline.phrase}</u> の意味に最も近いものを、ア〜エ から選びなさい。</h3>
          <div className="long-item">
            <div className="long-choices one">
              {p.underline.choices.map((c, i) => (
                <button key={c} className={`long-choice${under === i ? ' picked' : ''}${done && i === p.underline!.answer ? ' answer' : ''}`} disabled={done} aria-pressed={under === i} onClick={() => setUnder(i)}>
                  {MARKS[i]} {c}
                </button>
              ))}
            </div>
            {done && (
              <p className={`long-why${under === p.underline.answer ? ' right' : ' wrong'}`}>
                {under === p.underline.answer ? '⭕' : '❌'} 正解 {MARKS[p.underline.answer]}：{p.underline.why}
              </p>
            )}
          </div>
        </>
      )}

      {p.order && (
        <>
          <h3 className="long-q">問{(p.pick2 ? 4 : 3) + (p.underline ? 1 : 0)}　（　）内の語を並べかえて、意味の通る英文にしなさい。</h3>
          <div className="long-item">
            <p className="long-statement">
              （ {p.order.words.join(' / ')} ） {p.order.rest}
            </p>
            <p className="long-order-answer" aria-label="並べた英文">
              {orderText || '　'} <span className="long-rest">{p.order.rest}</span>
            </p>
            <div className="long-order-words">
              {p.order.words.map((w, i) => (
                <button key={i} className="long-choice" disabled={done || order.includes(i)} onClick={() => setOrder([...order, i])}>
                  {w}
                </button>
              ))}
              {!done && order.length > 0 && (
                <button className="list-link" onClick={() => setOrder([])}>
                  やりなおす
                </button>
              )}
            </div>
            {done && (
              <p className={`long-why${orderText === p.order.answer ? ' right' : ' wrong'}`}>
                {orderText === p.order.answer ? '⭕' : '❌'} 正解 {p.order.answer} {p.order.rest}　{p.order.ja}
              </p>
            )}
          </div>
        </>
      )}

      {done ? (
        <div className="long-result" role="status">
          <p className="level-up">
            {score} / {total} 点{score === total ? ' 🎉 満点！' : ''}
          </p>
          {score < total && (
            <div className="long-tips">
              <p className="long-tips-title">💡 つまずき解説</p>
              <ul>
                {(Object.entries(typeResults(p, { blanks, tf, picks, underline: under, order: orderText, sentences: sents, qa, refer, gist, title: titlePick, complete: comp, insert: ins, summary: summ, vocab: voc, seq })) as [QType, [number, number]][])
                  .filter(([, [ok, n]]) => ok < n)
                  .map(([k]) => (
                    <li key={k}>
                      <strong>{TYPE_LABEL[k]}</strong>：{TYPE_TIPS[k]}
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {dailyGot && <p className="level-up">📅 今日の1本を満点クリア！ 🪙{DAILY_LONG_COINS}</p>}
          <p className="stats-note">
            ⏱ かかった時間 {formatTime(took)}（目安 {targetMinutes(p)}分）{took <= targetMinutes(p) * 60 ? '　目安より早い！' : ''}
            {bestTime ? '　🏁 最短タイム更新！' : loadLongTimes()[p.id] ? `　（満点の最短 ${formatTime(loadLongTimes()[p.id])}）` : ''}
          </p>
          <button
            className="flip"
            onClick={() => {
              setBlanks({})
              setTf({})
              setPicks([])
              setUnder(undefined)
              setOrder([])
              setSents({})
              setQa({})
              setRefer(undefined)
              setGist({})
              setTitlePick(undefined)
              setComp({})
              setIns(undefined)
              setSumm({})
              setVoc({})
              setSeq([])
              setStartAt(Date.now())
              setDone(false)
            }}
          >
            もう一度とく
          </button>
          {score < total && (
            <button
              className="list-link"
              onClick={() => {
                // まちがえた設問の答えだけを消して、もう一度とく
                const keep = <T,>(m: Record<string | number, T>, ok: (k: string, v: T) => boolean) => Object.fromEntries(Object.entries(m).filter(([k, v]) => ok(k, v)))
                setBlanks(keep(blanks, (k, v) => p.blanks.find((b) => b.id === k)?.answer === v))
                setTf(keep(tf, (k, v) => p.tf[Number(k)]?.answer === v))
                if (p.pick2 && !p.pick2.answers.every((i) => picks.includes(i))) setPicks([])
                if (p.underline && under !== p.underline.answer) setUnder(undefined)
                if (p.order && orderText !== p.order.answer) setOrder([])
                setSents(keep(sents, (k, v) => p.sentences?.find((x) => x.id === k)?.answer === v))
                setQa(keep(qa, (k, v) => p.qa?.[Number(k)]?.answer === v))
                if (p.refer && refer !== p.refer.answer) setRefer(undefined)
                setGist(keep(gist, (k, v) => p.gist?.[Number(k)]?.answer === v))
                if (p.titleQ && titlePick !== p.titleQ.answer) setTitlePick(undefined)
                setComp(keep(comp, (k, v) => p.complete?.[Number(k)]?.answer === v))
                if (p.insert && ins !== p.insert.answer) setIns(undefined)
                setSumm(keep(summ, (k, v) => p.summary?.blanks[Number(k)]?.answer === v))
                setVoc(keep(voc, (k, v) => p.vocab?.[Number(k)]?.answer === v))
                if (p.seq && !seqRight(p.seq, seq)) setSeq([])
                setStartAt(Date.now())
                setDone(false)
              }}
            >
              🔁 まちがえた問題だけ解き直す
            </button>
          )}
        </div>
      ) : (
        <button
          className="flip"
          disabled={answered < total}
          onClick={() => {
            const sec = Math.round((Date.now() - startAt) / 1000)
            setTook(sec)
            setBestTime(score === total && recordLongTime(p.id, Math.max(1, sec)))
            const daily = score === total && p.id === dailyLong(today).id && dailyDay !== today
            setDailyGot(daily)
            if (daily) {
              setDailyDay(today)
              saveDailyLongDay(today)
              onCoins?.(DAILY_LONG_COINS)
            }
            setDone(true)
            if (score === total) playCorrect()
            else playWrong()
            const t = mergeTypes(types, typeResults(p, { blanks, tf, picks, underline: under, order: orderText, sentences: sents, qa, refer, gist, title: titlePick, complete: comp, insert: ins, summary: summ, vocab: voc, seq }))
            setTypes(t)
            saveTypeStats(t)
            setReadWords(addReadWords(wordCount(p)))
            setHistory(pushLongHistory(score / total))
            setWeekRes(pushWeekResult({ id: p.id, pct: Math.round((score / total) * 100), day: today }))
            setGenreStats(addGenreStats(genreOf(p), score, total))
            for (let i = 0; i < total; i++) onAnswer?.(i < score, i < score ? XP_LONG_ITEM : 0, '', 'quiz')
            if (score > (record[p.id] ?? -1)) {
              const r = { ...record, [p.id]: score }
              setRecord(r)
              saveLongRecord(r)
            }
          }}
        >
          {answered < total ? `のこり ${total - answered}問` : '採点する'}
        </button>
      )}
    </section>
  )
}
