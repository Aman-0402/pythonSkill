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
const PANEL_W = 176

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
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('draw-pos') || 'null')
      if (saved && typeof saved.x === 'number' && typeof saved.y === 'number') return saved
    } catch {
      /* no saved position */
    }
    return { x: Math.max(8, window.innerWidth - PANEL_W - 64), y: 90 }
  })
  const panel = useRef<HTMLDivElement>(null)
  const drag = useRef<{ dx: number; dy: number } | null>(null)

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

  // keep the panel on screen, and remember where it was left
  const clamp = useCallback((p: { x: number; y: number }) => {
    const w = panel.current?.offsetWidth ?? PANEL_W
    const h = panel.current?.offsetHeight ?? 48
    return {
      x: Math.min(Math.max(4, p.x), Math.max(4, window.innerWidth - w - 4)),
      y: Math.min(Math.max(4, p.y), Math.max(4, window.innerHeight - h - 4)),
    }
  }, [])
  useEffect(() => {
    const keep = () => setPos((p) => clamp(p))
    keep()
    window.addEventListener('resize', keep)
    return () => window.removeEventListener('resize', keep)
  }, [clamp, open, drawing])
  const startDrag = (e: React.PointerEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y }
  }
  const moveDrag = (e: React.PointerEvent<HTMLElement>) => {
    if (drag.current) setPos(clamp({ x: e.clientX - drag.current.dx, y: e.clientY - drag.current.dy }))
  }
  const endDrag = () => {
    if (!drag.current) return
    drag.current = null
    try {
      localStorage.setItem('draw-pos', JSON.stringify(pos))
    } catch {
      /* storage blocked */
    }
  }

  const togglePen = () => {
    setPen((p) => !p)
    setBoard(false)
  }
  const toggleBoard = () => {
    setPen(false)
    setBoard((b) => !b)
  }

  return (
    <>
      <canvas ref={pageCanvas} className={'draw-layer' + (pen && !board ? ' live' : '')} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} />
      {board && (
        <canvas ref={boardCanvas} className="draw-layer board live" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} />
      )}

      <div ref={panel} className={'draw-panel' + (open ? ' open' : '')} style={{ left: pos.x, top: pos.y }} role="toolbar" aria-label="Drawing tools">
        <div className="draw-head" onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={endDrag} title="Drag to move">
          <span className="draw-grip" aria-hidden="true">⠿</span>
          <span className="draw-title">Draw</span>
          <button className="draw-min" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Collapse' : 'Expand'} title={open ? 'Collapse' : 'Expand'}>
            {open ? '–' : '+'}
          </button>
        </div>
        {open && (
          <div className="draw-body">
            <div className="draw-row two">
              <button className={'draw-btn' + (pen ? ' on' : '')} onClick={togglePen} title="Draw on this page">✏️ Pen</button>
              <button className={'draw-btn' + (board ? ' on' : '')} onClick={toggleBoard} title="Open a white screen">⬜ Board</button>
            </div>
            {drawing ? (
              <>
                <div className="draw-row three">
                  <button className={'draw-btn' + (tool === 'pen' ? ' on' : '')} onClick={() => setTool('pen')}>Pen</button>
                  <button className={'draw-btn' + (tool === 'highlighter' ? ' on' : '')} onClick={() => setTool('highlighter')}>Marker</button>
                  <button className={'draw-btn' + (tool === 'eraser' ? ' on' : '')} onClick={() => setTool('eraser')}>Eraser</button>
                </div>
                <div className="draw-colors">
                  {COLORS.map((c) => (
                    <button key={c} className={'draw-color' + (color === c && tool !== 'eraser' ? ' on' : '')} style={{ background: c }} onClick={() => { setColor(c); if (tool === 'eraser') setTool('pen') }} aria-label={'Colour ' + c} />
                  ))}
                </div>
                <div className="draw-row three">
                  {SIZES.map((n) => (
                    <button key={n} className={'draw-size' + (size === n ? ' on' : '')} onClick={() => setSize(n)} aria-label={'Size ' + n}>
                      <i style={{ width: n + 4, height: n + 4 }} />
                    </button>
                  ))}
                </div>
                <div className="draw-row two">
                  <button className="draw-btn" onClick={undo}>↶ Undo</button>
                  <button className="draw-btn" onClick={clear}>🗑 Clear</button>
                </div>
              </>
            ) : (
              <p className="draw-hint">Pick <b>Pen</b> to draw on the lesson, or <b>Board</b> for a white screen.</p>
            )}
          </div>
        )}
      </div>
    </>
  )
}
