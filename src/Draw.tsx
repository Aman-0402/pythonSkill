import { useCallback, useEffect, useRef, useState } from 'react'

// Pen overlay for explaining code in a dry run.
//  - "Pen" draws straight on top of the page. Strokes are stored in page coordinates, so they scroll with the lesson.
//  - "Board" opens a white screen to write and draw on. It keeps its own drawing.
// Pen / highlighter / eraser, a few colours and sizes, undo, clear. Esc closes the board or leaves the pen.

type Tool = 'pen' | 'highlighter' | 'eraser'
type Layer = 'page' | 'board'
type Stroke = { tool: Tool; color: string; size: number; pts: [number, number][] }

const COLORS = ['#e11d48', '#1f5c93', '#16a34a', '#f59e0b', '#111827', '#ffffff']
const SIZES = [3, 6, 12]

function paint(canvas: HTMLCanvasElement, strokes: Stroke[], offsetY: number) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const dpr = window.devicePixelRatio || 1
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (const s of strokes) {
    ctx.globalCompositeOperation = s.tool === 'eraser' ? 'destination-out' : 'source-over'
    ctx.globalAlpha = s.tool === 'highlighter' ? 0.35 : 1
    ctx.strokeStyle = s.tool === 'eraser' ? '#000' : s.color
    ctx.lineWidth = s.tool === 'highlighter' ? s.size * 3 : s.tool === 'eraser' ? s.size * 3 : s.size
    ctx.beginPath()
    s.pts.forEach(([x, y], i) => {
      if (i === 0) ctx.moveTo(x, y - offsetY)
      else ctx.lineTo(x, y - offsetY)
    })
    // a single tap leaves a dot
    if (s.pts.length === 1) ctx.lineTo(s.pts[0][0] + 0.01, s.pts[0][1] - offsetY)
    ctx.stroke()
  }
  ctx.globalAlpha = 1
  ctx.globalCompositeOperation = 'source-over'
}

export default function Draw() {
  const [open, setOpen] = useState(false) // toolbar visible
  const [pen, setPen] = useState(false) // drawing on the page
  const [board, setBoard] = useState(false) // white screen open
  const [tool, setTool] = useState<Tool>('pen')
  const [color, setColor] = useState(COLORS[0])
  const [size, setSize] = useState(SIZES[1])

  const pageCanvas = useRef<HTMLCanvasElement>(null)
  const boardCanvas = useRef<HTMLCanvasElement>(null)
  const strokes = useRef<Record<Layer, Stroke[]>>({ page: [], board: [] })
  const current = useRef<Stroke | null>(null)

  const layer: Layer = board ? 'board' : 'page'
  const drawing = pen || board

  const redraw = useCallback((which: Layer) => {
    const canvas = which === 'page' ? pageCanvas.current : boardCanvas.current
    if (canvas) paint(canvas, strokes.current[which], which === 'page' ? window.scrollY : 0)
  }, [])

  // keep canvases the size of the window
  useEffect(() => {
    const fit = () => {
      const dpr = window.devicePixelRatio || 1
      for (const [c, which] of [[pageCanvas.current, 'page'], [boardCanvas.current, 'board']] as const) {
        if (!c) continue
        c.width = Math.round(window.innerWidth * dpr)
        c.height = Math.round(window.innerHeight * dpr)
        redraw(which)
      }
    }
    fit()
    const onScroll = () => redraw('page')
    window.addEventListener('resize', fit)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('scroll', onScroll)
    }
  }, [redraw, board])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (board) setBoard(false)
      else if (pen) setPen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [board, pen])

  const point = (e: React.PointerEvent): [number, number] => [
    e.clientX,
    e.clientY + (layer === 'page' ? window.scrollY : 0),
  ]

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    e.currentTarget.setPointerCapture(e.pointerId)
    current.current = { tool, color, size, pts: [point(e)] }
    strokes.current[layer].push(current.current)
    redraw(layer)
  }
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!current.current) return
    // coalesced events keep fast strokes smooth
    const events = e.nativeEvent.getCoalescedEvents?.() ?? [e.nativeEvent]
    const off = layer === 'page' ? window.scrollY : 0
    for (const ev of events) current.current.pts.push([ev.clientX, ev.clientY + off])
    redraw(layer)
  }
  const onUp = () => {
    current.current = null
  }

  const undo = () => {
    strokes.current[layer].pop()
    redraw(layer)
  }
  const clear = () => {
    strokes.current[layer] = []
    redraw(layer)
  }

  const togglePen = () => {
    setOpen(true)
    setBoard(false)
    setPen((p) => !p)
  }
  const toggleBoard = () => {
    setOpen(true)
    setPen(false)
    setBoard((b) => !b)
  }

  return (
    <>
      <canvas ref={pageCanvas} className={'draw-layer' + (pen && !board ? ' live' : '')} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} />
      {board && (
        <canvas ref={boardCanvas} className="draw-layer board live" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} />
      )}

      <div className={'draw-bar' + (open ? ' open' : '')} role="toolbar" aria-label="Drawing tools">
        {!open ? (
          <button className="draw-fab" onClick={() => setOpen(true)} title="Open drawing tools" aria-label="Open drawing tools">✏️</button>
        ) : (
          <>
            <button className={'draw-btn' + (pen ? ' on' : '')} onClick={togglePen} title="Draw on this page">✏️ Pen</button>
            <button className={'draw-btn' + (board ? ' on' : '')} onClick={toggleBoard} title="Open a white screen">⬜ White screen</button>
            {drawing && (
              <>
                <span className="draw-sep" />
                <button className={'draw-btn' + (tool === 'pen' ? ' on' : '')} onClick={() => setTool('pen')}>Pen</button>
                <button className={'draw-btn' + (tool === 'highlighter' ? ' on' : '')} onClick={() => setTool('highlighter')}>Marker</button>
                <button className={'draw-btn' + (tool === 'eraser' ? ' on' : '')} onClick={() => setTool('eraser')}>Eraser</button>
                <span className="draw-sep" />
                {COLORS.map((c) => (
                  <button key={c} className={'draw-color' + (color === c && tool !== 'eraser' ? ' on' : '')} style={{ background: c }} onClick={() => { setColor(c); if (tool === 'eraser') setTool('pen') }} aria-label={'Colour ' + c} />
                ))}
                <span className="draw-sep" />
                {SIZES.map((s) => (
                  <button key={s} className={'draw-size' + (size === s ? ' on' : '')} onClick={() => setSize(s)} aria-label={'Size ' + s}>
                    <i style={{ width: s + 4, height: s + 4 }} />
                  </button>
                ))}
                <span className="draw-sep" />
                <button className="draw-btn" onClick={undo}>Undo</button>
                <button className="draw-btn" onClick={clear}>Clear</button>
              </>
            )}
            <span className="draw-sep" />
            <button
              className="draw-btn"
              onClick={() => {
                setPen(false)
                setBoard(false)
                setOpen(false)
              }}
              title="Close (Esc leaves drawing)"
            >
              ✕
            </button>
          </>
        )}
      </div>
    </>
  )
}
