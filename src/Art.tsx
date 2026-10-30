import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Highlight } from './Highlight'

// Picture shown under a slide title. Two slides have a drawn illustration (see `art` below);
// any slide can get its own picture by adding a file to src/slides/ named after the slide id
// (for example installation-windows.png). See src/slides/README.md for every slide id.
const pictures = import.meta.glob<string>('./slides/*.{png,jpg,jpeg,webp,gif,svg,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})
// A slide can have several pictures: <id>.webp is the first, then <id>-2.webp, <id>-3.webp, and so on (shown top to bottom).
const picturesFor = (id: string) =>
  Object.entries(pictures)
    .map(([path, src]) => {
      const name = (path.split('/').pop() ?? '').replace(/\.[^.]+$/, '')
      if (name === id) return { n: 1, src }
      const m = name.match(/^(.*)-(\d+)$/)
      return m && m[1] === id ? { n: Number(m[2]), src } : null
    })
    .filter((p): p is { n: number; src: string } => p !== null)
    .sort((a, b) => a.n - b.n)
    .map((p) => p.src)

const icon = (name: string) => `${import.meta.env.BASE_URL}icons/${name}.svg`

function Chip({ file, label }: { file: string; label: string }) {
  return (
    <div className="chip">
      <span>
        <img src={icon(file)} alt="" draggable={false} />
      </span>
      {label}
    </div>
  )
}

const art: Record<string, () => ReactNode> = {
  // slide 1: What is Python?
  'hello-bubble': () => (
    <div className="hello">
      <span className="hello-logo">
        <img src={icon('python')} alt="" draggable={false} />
      </span>
      <div className="bubble">
        <Highlight line={'print("Hello, World!")'} />
      </div>
    </div>
  ),

  // slide 2: What Python is used for
  uses: () => (
    <div className="chips">
      <Chip file="pandas" label="Data analysis" />
      <Chip file="tensorflow" label="AI and machine learning" />
      <Chip file="django" label="Web development" />
      <Chip file="bash" label="Automation" />
    </div>
  ),
}

// Click a picture to see it large, centred on the screen. Click again, or press Esc, to close.
function Zoomable({ src }: { src: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button type="button" className="art-zoom" aria-label="Enlarge picture" onClick={() => setOpen(true)}>
        <img className="art-image" src={src} alt="" draggable={false} />
      </button>
      {open &&
        // portal to <body>: the sticky slide column would otherwise trap the overlay below the page controls
        createPortal(
          <div className="lightbox" role="dialog" aria-modal="true" aria-label="Picture" onClick={() => setOpen(false)}>
            <img src={src} alt="" draggable={false} />
            <button type="button" className="lightbox-close" aria-label="Close picture" autoFocus>
              ✕
            </button>
          </div>,
          document.body,
        )}
    </>
  )
}

export default function Art({ name, id }: { name?: string; id: string }) {
  const own = picturesFor(id)
  if (own.length) {
    return (
      <div className={own.length > 1 ? 'art art-multi' : 'art'}>
        {own.map((src) => (
          <Zoomable key={src} src={src} />
        ))}
      </div>
    )
  }
  const draw = name ? art[name] : undefined
  return draw ? (
    <div className="art" aria-hidden="true">
      {draw()}
    </div>
  ) : null
}
