import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from './router'
import TryIt from './TryIt'
import Quiz from './Quiz'
import { openBoard } from './Draw'
import Art from './Art'
import HeroCode from './HeroCode'
import { Code } from './Highlight'
import { isLocked } from './lock'
import { saveSlide } from './progress'
import { lessons, type Block, type Lesson as LessonData, type Section } from './content'

function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>
        if (part.startsWith('**')) return <strong key={i}><Inline text={part.slice(2, -2)} /></strong>
        return part
      })}
    </>
  )
}

function BlockView({ block }: { block: Block }): ReactNode {
  switch (block.type) {
    case 'p':
      return <p><Inline text={block.text} /></p>
    case 'h3':
      return <h3>{block.text}</h3>
    case 'ul':
      return (
        <ul>
          {block.items.map((t) => (
            <li key={t}><Inline text={t} /></li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol start={block.start}>
          {block.items.map((t) => (
            <li key={t}><Inline text={t} /></li>
          ))}
        </ol>
      )
    case 'code':
      if (block.runnable) return <TryIt code={block.code} label={block.label} />
      return (
        <figure className="codeblock">
          <figcaption>
            <span>{block.label ?? 'Code'}</span>
            <span className="try-actions">
              <button type="button" className="try-reset icon-btn" aria-label="Full screen" onClick={() => openBoard(block.code, block.label, { full: true })} title="Show this code full screen and draw on it to explain">
                <i>⛶</i> <span>Full screen</span>
              </button>
              <button type="button" className="try-reset icon-btn" aria-label="Board" onClick={() => openBoard(block.code, block.label)} title="Show this code on a white screen to explain it">
                <i>⬜</i> <span>Board</span>
              </button>
            </span>
          </figcaption>
          <pre><Code code={block.code} label={block.label} /></pre>
          {block.output && (
            <div className="codeblock-out">
              <span>Output</span>
              <pre>{block.output}</pre>
            </div>
          )}
        </figure>
      )
    case 'note':
      return (
        <aside className={`callout callout-${block.tone}`}>
          <strong>{block.title}</strong>
          <p><Inline text={block.text} /></p>
        </aside>
      )
    case 'table':
      return (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, i) => (
                    <td key={i}><Inline text={cell} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

type Band = { id: string; eyebrow?: string; title: string; art?: string; blocks: Block[]; quiz?: number }

// Each top-level section becomes one band; every sub-heading inside it becomes its own band.
function toBands(sections: Section[]): Band[] {
  const bands: Band[] = []
  for (const s of sections) {
    let current: Band | null = null
    let intro: Block[] = []
    for (const b of s.blocks) {
      if (b.type === 'h3') {
        if (!current && intro.length) bands.push({ id: s.id, title: s.title, art: s.art, blocks: intro })
        const slug = b.text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        current = { id: `${s.id}-${slug}`, eyebrow: s.title, title: b.text, art: b.art, blocks: [] }
        bands.push(current)
      } else if (current) current.blocks.push(b)
      else intro.push(b)
    }
    if (!current) bands.push({ id: s.id, title: s.title, art: s.art, blocks: intro })
  }
  return bands
}

// Put quiz slides among the lesson slides at random slide numbers, different on each visit. The lesson is cut into equal
// zones with one quiz in each, so they spread out and never land next to each other, on the first two slides or at the end.
const QUIZ_SIZE = 3 // questions on each quiz slide

function withQuizzes(bands: Band[]): Band[] {
  const count = Math.min(4, Math.max(1, Math.round(bands.length / 8)))
  const first = 2
  const zone = Math.floor((bands.length - 1 - first) / count)
  if (zone < 1) return bands
  const out = [...bands]
  for (let n = count - 1; n >= 0; n--) {
    const spot = first + n * zone + Math.floor(Math.random() * Math.max(1, zone - 1))
    out.splice(spot, 0, { id: `quiz-${n + 1}`, eyebrow: `Check yourself · ${QUIZ_SIZE} questions`, title: 'Quick quiz', blocks: [], quiz: spot / bands.length })
  }
  return out
}

// Short slides get bigger type so they fill the screen; slides with code or tables stay normal.
function sizeOf(blocks: Block[]): 'xl' | 'l' | 'm' {
  let chars = 0
  for (const b of blocks) {
    if (b.type === 'code' || b.type === 'table') return 'm'
    if (b.type === 'p') chars += b.text.length
    else if (b.type === 'ul' || b.type === 'ol') chars += b.items.join('').length + b.items.length * 20
    else if (b.type === 'note') chars += b.text.length + b.title.length
  }
  return chars < 330 ? 'xl' : chars < 620 ? 'l' : 'm'
}

export default function Lesson({ slug }: { slug: string }) {
  const lesson = lessons.find((l) => l.slug === slug)

  if (lesson && isLocked(lessons.indexOf(lesson))) {
    return (
      <div className="light-page"><main className="contents wrap">
        <Link href="/contents" className="back">← Contents</Link>
        <header className="contents-head">
          <h1>🔒 This session is locked</h1>
          <p>It will open when your trainer unlocks it. Go back to the contents page to read the earlier sessions.</p>
        </header>
      </main></div>
    )
  }

  if (!lesson) {
    return (
      <div className="light-page"><main className="contents wrap">
        <Link href="/contents" className="back">← Contents</Link>
        <header className="contents-head">
          <h1>Topic not found</h1>
          <p>Go back to the contents page and pick a topic from the list.</p>
        </header>
      </main></div>
    )
  }

  return <Slides lesson={lesson} />
}

function Slides({ lesson }: { lesson: LessonData }) {
  const bands = useMemo(() => withQuizzes(toBands(lesson.sections)), [lesson])
  const session = lessons.indexOf(lesson) + 1
  const quizCount = bands.filter((b) => b.quiz !== undefined).length
  const tryItCount = lesson.sections.flatMap((s) => s.blocks).filter((b) => b.type === 'code' && b.runnable).length
  const [active, setActive] = useState(0)

  // snap the whole page slide by slide while this page is open
  useEffect(() => {
    document.documentElement.classList.add('snap-page')
    return () => document.documentElement.classList.remove('snap-page')
  }, [])

  // a link straight to a slide: the slide does not exist until React has drawn it, so the browser cannot jump there itself
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' })
  }, [])

  const goTo = (i: number) => {
    const n = Math.min(Math.max(i, 0), bands.length)
    document.querySelector(`[data-slide="${n}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Left/Right arrows and Home/End move between slides; Up/Down keep their normal scrolling
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('textarea, input, select') || e.altKey || e.ctrlKey || e.metaKey) return
      if (document.querySelector('.lightbox, .draw-board')) return // a picture or the board is open: keys belong to it
      const to = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: bands.length }[e.key]
      if (to === undefined) return
      e.preventDefault()
      goTo(to)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // remember how far this lesson has been read; quiz slides move on each visit, so note the lesson slide before them
  useEffect(() => {
    if (active === 0) return
    const slide = bands.slice(0, active).reverse().find((b) => b.quiz === undefined)
    if (slide) saveSlide(lesson.slug, slide.id, Math.round((active / bands.length) * 100), active === bands.length)
  }, [active, bands, lesson.slug])

  // reveal the slide in view and track which one is current
  useEffect(() => {
    const slides = Array.from(document.querySelectorAll<HTMLElement>('[data-slide]'))
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) e.target.classList.add('in-view')
      },
      { threshold: 0.15 },
    )
    // the slide crossing the middle of the screen is the current one, even if taller than the screen
    const current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.slide))
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    slides.forEach((s) => {
      reveal.observe(s)
      current.observe(s)
    })
    return () => {
      reveal.disconnect()
      current.disconnect()
    }
  }, [])

  return (
    <div className="light-page">
      <header className="notes-hero in-view" data-slide={0}>
        <div className="wrap hero-wrap">
          <Link href="/contents" className="back">← Contents</Link>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-eyebrow">Python for beginners</p>
              <h1 data-length={lesson.title.length >= 28 ? 'longest' : lesson.title.length >= 18 ? 'long' : undefined}>
                {lesson.title.replace(/Part (\d)/, 'Part\u00a0$1').split(/(Python)/).map((part, i) =>
                  part === 'Python' ? <span className="hl" key={i}>{part}</span> : part,
                )}
              </h1>
              <p className="hero-sub">{lesson.summary}</p>
              <ul className="hero-facts">
                <li><b>{bands.length}</b> slides</li>
                <li><b>{tryItCount}</b> code boxes to run</li>
                {quizCount > 0 && <li><b>{quizCount}</b> quick {quizCount === 1 ? 'quiz' : 'quizzes'}, <b>{quizCount * QUIZ_SIZE}</b> questions</li>}
                {lesson.tag && <li>{lesson.tag}</li>}
              </ul>
              <a href={'#' + bands[0].id} className="scroll-cue">Start reading ↓</a>
            </div>
            <HeroCode snippet={lesson.hero} />
          </div>
        </div>
      </header>

      {bands.map((b, i) => (
        <section className={b.quiz === undefined ? 'band' : 'band band-quiz'} key={b.id} id={b.id} data-slide={i + 1} data-size={b.quiz === undefined ? sizeOf(b.blocks) : 'm'}>
          <div className="wrap band-inner">
            <div className="band-head">
              {b.eyebrow && <p className="band-eyebrow">{b.eyebrow}</p>}
              <h2 className="band-title">{b.title}</h2>
              <Art name={b.art} id={b.id} />
            </div>
            <div className="notes">
              {b.quiz !== undefined && <Quiz session={session} progress={b.quiz} count={QUIZ_SIZE} />}
              {b.blocks.map((blk, k) => (
                <BlockView key={k} block={blk} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <nav className="dots" aria-label="Slides">
        <a href="#top" className={active === 0 ? 'dot on' : 'dot'} aria-label="Title" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
        {bands.map((b, i) => (
          <a key={b.id} href={'#' + b.id} className={active === i + 1 ? 'dot on' : 'dot'} aria-label={b.title} />
        ))}
      </nav>
      <p className="counter" aria-hidden="true">{active} / {bands.length}</p>
      <div className="slide-nav">
        <button type="button" aria-label="Previous slide" disabled={active === 0} onClick={() => goTo(active - 1)}>↑</button>
        <button type="button" aria-label="Next slide" disabled={active === bands.length} onClick={() => goTo(active + 1)}>↓</button>
      </div>
    </div>
  )
}
