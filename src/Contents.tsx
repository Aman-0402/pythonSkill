import { Link } from './router'
import { lessons } from './content'

export default function Contents() {
  return (
    <div className="light-page">
    <main className="contents wrap">
      <Link href="/" className="back">
        ← Home
      </Link>
      <header className="contents-head">
        <h1>Contents</h1>
        <p>Pick a topic to start learning.</p>
      </header>

      <div className="topic-grid">
        {lessons.map((t) => (
          <Link href={`/contents/${t.slug}`} className="topic" key={t.slug}>
            <div className="topic-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />
              </svg>
            </div>
            <h2>{t.title}</h2>
            <p>{t.summary}</p>
            <span className="topic-open">Open notes →</span>
          </Link>
        ))}
      </div>
    </main>
    </div>
  )
}
