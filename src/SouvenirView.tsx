import { SOUVENIRS } from './souvenir'

// おみやげコレクション
export function SouvenirList({ got }: { got: string[] }) {
  return (
    <div className="souvenirs">
      <h2>
        おみやげコレクション {got.length} / {SOUVENIRS.length}
      </h2>
      <p className="stats-note">1日の目標を達成すると、相棒がおでかけしておみやげを見つけてくるよ。</p>
      <ul className="badge-list">
        {SOUVENIRS.map((s) => (
          <li key={s.id} className={got.includes(s.id) ? 'got' : 'locked'} aria-label={got.includes(s.id) ? s.name : 'まだ見つけていない'}>
            <span className="badge-icon">{got.includes(s.id) ? s.icon : '❔'}</span>
            <span className="badge-name">{got.includes(s.id) ? s.name : '？？？'}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
