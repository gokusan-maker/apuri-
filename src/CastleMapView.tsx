import { mapSpots } from "./castlemap";

export type MapSpot = {
  id: string;
  name: string;
  sub?: string;
  done?: number;
  total?: number;
  badge?: string;
};

// 城の地図：レベルごとの城が道でつながっている。えらんだ城に入って階をのぼる
export function CastleMap({
  title,
  tabsLabel,
  unit = "",
  fold = false,
  spots,
  current,
  onPick,
}: {
  title: string;
  tabsLabel?: string;
  unit?: string;
  fold?: boolean;
  spots: MapSpot[];
  current: string;
  onPick: (id: string) => void;
}) {
  const pos = mapSpots(spots.length);
  const h = pos.at(-1)!.y + 96;
  const now = spots.find((s) => s.id === current);
  const land = (
    <div className="cmap-land" style={{ height: h }}>
      <svg
        className="cmap-bg"
        viewBox={`0 0 300 ${h}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="cmap-river"
          d={`M300 ${h * 0.15} C 220 ${h * 0.3}, 260 ${h * 0.6}, 170 ${h * 0.7} S 40 ${h * 0.9}, 0 ${h * 0.95}`}
        />
        <polyline
          className="cmap-road"
          points={pos.map((p) => `${p.x * 3},${p.y + 10}`).join(" ")}
        />
      </svg>
      <span className="cmap-tree t1" aria-hidden="true">
        🌲
      </span>
      <span className="cmap-tree t2" aria-hidden="true">
        🌳
      </span>
      <span className="cmap-tree t3" aria-hidden="true">
        🌲
      </span>
      <div role="tablist" aria-label={tabsLabel ?? title}>
        {spots.map((s, i) => {
          const on = s.id === current;
          const full =
            s.total !== undefined && s.total > 0 && s.done === s.total;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={on}
              className={`cmap-spot cm-${i % 6}${on ? " on" : ""}${full ? " full" : ""}`}
              style={{ left: `${pos[i].x}%`, top: pos[i].y - 26 }}
              onClick={() => onPick(s.id)}
            >
              {on && (
                <span className="cmap-here" aria-hidden="true">
                  攻略中
                </span>
              )}
              {s.badge && <span className="cmap-badge">{s.badge}</span>}
              <svg
                className="cmap-castle"
                viewBox="0 0 40 34"
                aria-hidden="true"
              >
                <path
                  className="cmap-c-wall"
                  d="M4 34 V16 h5 v-4 h4 v4 h4 v-4 h6 v4 h4 v-4 h4 v4 h5 V34 Z"
                />
                <path className="cmap-c-roof" d="M14 12 L20 2 L26 12 Z" />
                <path className="cmap-c-flag" d="M20 2 V-4 L27 -1 L20 1" />
                <rect
                  className="cmap-c-door"
                  x="17"
                  y="24"
                  width="6"
                  height="10"
                  rx="3"
                />
              </svg>
              <strong className="cmap-name">
                {full ? "👑" : ""}
                {s.name}
              </strong>
              {s.sub && <small className="cmap-sub">{s.sub}</small>}
              {s.total !== undefined && s.total > 0 && (
                <small className="cmap-prog">
                  {s.done ?? 0}/{s.total}
                  {unit}
                </small>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
  // fold：城をえらんだあとは地図をたたむ（タップでひらいて、ほかの城へ）
  if (fold && now)
    return (
      <details className="cmap" aria-label={title}>
        <summary className="cmap-title">
          🗺 {now.name}の城<small className="cmap-now">攻略中</small>
          <small className="cmap-change">ほかの城へ</small>
        </summary>
        {land}
      </details>
    );
  return (
    <section className="cmap" aria-label={title}>
      <p className="cmap-title">🗺 {title}</p>
      {land}
    </section>
  );
}
