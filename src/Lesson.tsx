import { useEffect, useState, type ReactNode } from 'react'
import { Link } from './router'
import TryIt from './TryIt'
import { lessons, type Block, type Lesson as LessonData, type Section } from './content'

function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>
        if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
        return part
      })}
    </>
  )
}

function Highlight({ line }: { line: string }) {
  const parts = line.split(/(#.*$|"[^"]*"|'[^']*'|\b(?:print|exit|Print|prnt)(?=\()|\b\d+(?:\.\d+)?\b)/)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('#')) return <span className="tok-com" key={i}>{part}</span>
        if (/^["']/.test(part)) return <span className="tok-str" key={i}>{part}</span>
        if (/^(print|exit|Print|prnt)$/.test(part)) return <span className="tok-fn" key={i}>{part}</span>
        if (/^\d/.test(part)) return <span className="tok-num" key={i}>{part}</span>
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
        <ol>
          {block.items.map((t) => (
            <li key={t}><Inline text={t} /></li>
          ))}
        </ol>
      )
    case 'code':
      if (block.runnable) return <TryIt code={block.code} label={block.label} />
      return (
        <figure className="codeblock">
          {block.label && <figcaption>{block.label}</figcaption>}
          <pre>
            {block.code.split('\n').map((line, i) => (
              <div key={i}><Highlight line={line} /></div>
            ))}
          </pre>
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
              {block.rows.map((row) => (
                <tr key={row[0]}>
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

type Band = { id: string; eyebrow?: string; title: string; blocks: Block[] }

// Each top-level section becomes one band; every sub-heading inside it becomes its own band.
function toBands(sections: Section[]): Band[] {
  const bands: Band[] = []
  for (const s of sections) {
    let current: Band | null = null
    let intro: Block[] = []
    for (const b of s.blocks) {
      if (b.type === 'h3') {
        if (!current && intro.length) bands.push({ id: s.id, title: s.title, blocks: intro })
        const slug = b.text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        current = { id: `${s.id}-${slug}`, eyebrow: s.title, title: b.text, blocks: [] }
        bands.push(current)
      } else if (current) current.blocks.push(b)
      else intro.push(b)
    }
    if (!current) bands.push({ id: s.id, title: s.title, blocks: intro })
  }
  return bands
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
  const bands = toBands(lesson.sections)
  const [active, setActive] = useState(0)

  // snap the whole page slide by slide while this page is open
  useEffect(() => {
    document.documentElement.classList.add('snap-page')
    return () => document.documentElement.classList.remove('snap-page')
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
      const to = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: bands.length }[e.key]
      if (to === undefined) return
      e.preventDefault()
      goTo(to)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

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
      <div className="contents lesson-head wrap in-view" data-slide={0}>
        <Link href="/contents" className="back">← Contents</Link>
        <header className="contents-head">
          <h1>{lesson.title}</h1>
          <p>{lesson.summary}</p>
        </header>
        <a href={'#' + bands[0].id} className="scroll-cue">Start reading ↓</a>
      </div>

      {bands.map((b, i) => (
        <section className="band" key={b.id} id={b.id} data-slide={i + 1} data-size={sizeOf(b.blocks)}>
          <div className="wrap band-inner">
            <div className="band-head">
              {b.eyebrow && <p className="band-eyebrow">{b.eyebrow}</p>}
              <h2 className="band-title">{b.title}</h2>
            </div>
            <div className="notes">
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
