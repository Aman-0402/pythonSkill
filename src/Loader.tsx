// Loading screen: a snake chases its tail around a ring. The whole picture turns, the head leads and flicks its tongue.
const R = 40
const C = 2 * Math.PI * R

// Seven overlapping arcs that all end at the head: the longer the arc, the thinner it is, so the body tapers to a tail.
const ARCS = Array.from({ length: 7 }, (_, i) => {
  const degrees = 250 - i * 32
  return { start: -degrees, length: (C * degrees) / 360, width: 4 + i * 1.5 }
})

export default function Loader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="page-loading" role="status" aria-live="polite">
      <svg className="snake-ring" viewBox="0 0 120 120" aria-hidden="true">
        <circle className="snake-track" cx="60" cy="60" r={R} />
        <g className="snake-spin">
          {ARCS.map((a) => (
            <circle
              key={a.width}
              className="snake-body"
              cx="60"
              cy="60"
              r={R}
              strokeWidth={a.width}
              strokeDasharray={`${a.length} ${C}`}
              transform={`rotate(${a.start} 60 60)`}
            />
          ))}
          <g transform="rotate(180 100 60)">
            <path className="snake-tongue" d="M100 49 V38 M100 38 l-3.5 -5 M100 38 l3.5 -5" />
            <ellipse className="snake-head" cx="100" cy="60" rx="8" ry="11" />
            <circle className="snake-eye" cx="95.5" cy="56" r="2.6" />
            <circle className="snake-eye" cx="104.5" cy="56" r="2.6" />
            <circle className="snake-pupil" cx="95.5" cy="55" r="1.1" />
            <circle className="snake-pupil" cx="104.5" cy="55" r="1.1" />
          </g>
        </g>
      </svg>
      <p className="snake-label">
        {label}
        <span className="snake-dots" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span>
      </p>
    </div>
  )
}
