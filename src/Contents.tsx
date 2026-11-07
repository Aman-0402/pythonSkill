import { useState } from 'react'
import { Link } from './router'
import { lessons } from './content'
import { isLocked } from './lock'
import { clearProgress, readProgress } from './progress'

// the course in stages, by session number
const stages = [
  { name: 'Python basics', from: 1, to: 4 },
  { name: 'Loops and collections', from: 5, to: 10 },
  { name: 'Organising code', from: 11, to: 15 },
  { name: 'NumPy', from: 16, to: 17 },
  { name: 'Pandas', from: 18, to: 23 },
  { name: 'Charts', from: 24, to: 25 },
  { name: 'Projects', from: 26, to: 30 },
]

export default function Contents() {
  const [progress, setProgress] = useState(readProgress)
  const finished = lessons.filter((l) => progress[l.slug]?.done).length
  const started = Object.keys(progress).length > 0

  // the one next step: carry on with an unfinished session, otherwise the first one not read yet
  const reading = lessons.find((l) => progress[l.slug] && !progress[l.slug].done)
  const next = lessons.find((l) => !progress[l.slug])
  const target = reading ?? next
  const targetHref = reading ? `/contents/${reading.slug}#${progress[reading.slug].slide}` : `/contents/${(next ?? lessons[0]).slug}`
  const targetLabel = reading ? 'Continue' : started ? 'Next session' : 'Start session 1'

  return (
    <div className="light-page">
      <header className="practice-hero">
        <div className="wrap practice-hero-grid">
          <div>
            <Link href="/" className="back">← Home</Link>
            <h1>Contents</h1>
            <p>{lessons.length} sessions, from your first line of Python to a finished data project.</p>
            <div className="contents-actions">
              {target && (
                <Link href={targetHref} className="practice-all">
                  {targetLabel}
                  {started && <small>session {lessons.indexOf(target) + 1}</small>}
                </Link>
              )}
              <Link href="/practice" className="hero-secondary">Practice files</Link>
            </div>
            {started && (
              <div className="contents-progress">
                <span>{finished} of {lessons.length} finished</span>
                <span className="contents-bar" aria-hidden="true"><i style={{ width: `${(finished / lessons.length) * 100}%` }} /></span>
                <button
                  type="button"
                  onClick={() => {
                    clearProgress()
                    setProgress({})
                  }}
                >
                  Clear my progress
                </button>
              </div>
            )}
          </div>
          <nav className="contents-stages" aria-label="Jump to a stage">
            {stages.map((s) => (
              <a href={`#session-${s.from}`} key={s.name}>
                <b>{s.name}</b>
                <span>{s.from} to {s.to}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="contents wrap">
        <div className="topic-grid">
          {lessons.map((t, i) => {
            const locked = isLocked(i)
            const read = progress[t.slug]
            const inProgress = !!read && !read.done
            const inner = (
              <>
                <div className="topic-top">
                  <div className="topic-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />
                    </svg>
                  </div>
                  <span className="topic-no">Session {i + 1}</span>
                </div>
                {read?.done && <span className="topic-tick" title="Finished">✓</span>}
                <h2>{t.title}</h2>
                <p>{t.summary}</p>
                {inProgress && (
                  <span className="topic-bar" aria-hidden="true">
                    <i style={{ width: `${read.pct}%` }} />
                  </span>
                )}
                <span className="topic-open">
                  {locked ? '🔒 Locked' : read?.done ? 'Finished · read again →' : inProgress ? `Continue from ${read.pct}% →` : 'Open notes →'}
                </span>
              </>
            )
            return locked ? (
              <div className="topic locked" id={`session-${i + 1}`} aria-disabled="true" key={t.slug}>{inner}</div>
            ) : (
              <Link href={`/contents/${t.slug}${inProgress ? '#' + read.slide : ''}`} className="topic" id={`session-${i + 1}`} key={t.slug}>{inner}</Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
