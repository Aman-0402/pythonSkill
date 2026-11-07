import { useState } from 'react'
import { Link } from './router'
import { lessons } from './content'
import { isLocked } from './lock'
import { clearProgress, readProgress } from './progress'

export default function Contents() {
  const [progress, setProgress] = useState(readProgress)
  const finished = lessons.filter((l) => progress[l.slug]?.done).length
  const started = Object.keys(progress).length > 0

  return (
    <div className="light-page">
    <main className="contents wrap">
      <Link href="/" className="back">
        ← Home
      </Link>
      <header className="contents-head">
        <h1>Contents</h1>
        <p>{started ? `${finished} of ${lessons.length} sessions finished.` : 'Pick a topic to start learning.'}</p>
        <Link href="/practice" className="practice-link">Practice files to download →</Link>
        {started && (
          <button
            type="button"
            className="progress-clear"
            onClick={() => {
              clearProgress()
              setProgress({})
            }}
          >
            Clear my progress
          </button>
        )}
      </header>

      <div className="topic-grid">
        {lessons.map((t, i) => {
          const locked = isLocked(i)
          const read = progress[t.slug]
          const reading = !!read && !read.done
          const inner = (
            <>
              <div className="topic-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />
                </svg>
              </div>
              {read?.done && <span className="topic-tick" title="Finished">✓</span>}
              <h2>{t.title}</h2>
              <p>{t.summary}</p>
              {reading && (
                <span className="topic-bar" aria-hidden="true">
                  <i style={{ width: `${read.pct}%` }} />
                </span>
              )}
              <span className="topic-open">
                {locked ? '🔒 Locked' : read?.done ? 'Finished · read again →' : reading ? `Continue from ${read.pct}% →` : 'Open notes →'}
              </span>
            </>
          )
          return locked ? (
            <div className="topic locked" aria-disabled="true" key={t.slug}>{inner}</div>
          ) : (
            <Link href={`/contents/${t.slug}${reading ? '#' + read.slide : ''}`} className="topic" key={t.slug}>{inner}</Link>
          )
        })}
      </div>
    </main>
    </div>
  )
}
