import { useCallback, useEffect, useRef, useState } from 'react'
import { runPython, type PyResult } from './pyrun'

// Pen overlay for explaining code in a dry run.
//  - "Pen" draws straight on top of the page. Items are stored in page coordinates, so they scroll with the lesson.
//  - "Board" opens a white screen to write and draw on. It keeps its own drawing.
// Tools: pen, marker, rub-out eraser, remove-one-item eraser, line, arrow, box, circle, text and select (move / edit / delete).
// Colours, sizes, undo, clear. Esc closes the board or leaves the pen.

type Tool = 'pen' | 'highlighter' | 'eraser' | 'remove' | 'line' | 'arrow' | 'rect' | 'ellipse' | 'text' | 'select'
type Layer = 'page' | 'board'
type Pt = [number, number]
type Free = { k: 'free'; tool: 'pen' | 'highlighter' | 'eraser'; color: string; size: number; pts: Pt[] }
type Shape = { k: 'shape'; shape: 'line' | 'arrow' | 'rect' | 'ellipse'; color: string; size: number; a: Pt; b: Pt }
type TextItem = { k: 'text'; color: string; size: number; x: number; y: number; text: string }
type Item = Free | Shape | TextItem
type Edit = { layer: Layer; x: number; y: number; text: string; item: TextItem | null }

const COLORS = ['#e11d48', '#1f5c93', '#16a34a', '#f59e0b', '#111827', '#ffffff']
const SIZES = [3, 6, 12]
const PANEL_W = 216
const FONT = "600 {n}px 'Instrument Sans', system-ui, sans-serif"
const fontFor = (size: number) => FONT.replace('{n}', String(textPx(size)))
const textPx = (size: number) => 16 + size * 3 // pen sizes 3, 6, 12 -> text 25, 34, 52 px
const LINE_H = 1.25

const TOOLS: { id: Tool; icon: string; label: string; title: string }[] = [
  { id: 'pen', icon: '✏️', label: 'Pen', title: 'Draw freehand' },
  { id: 'highlighter', icon: '🖍', label: 'Marker', title: 'Highlight' },
  { id: 'eraser', icon: '🧽', label: 'Rub out', title: 'Rub out part of a drawing' },
  { id: 'remove', icon: '❌', label: 'Remove', title: 'Click a drawing to remove just that one item' },
  { id: 'line', icon: '╱', label: 'Line', title: 'Straight line' },
  { id: 'arrow', icon: '➜', label: 'Arrow', title: 'Arrow' },
  { id: 'rect', icon: '▭', label: 'Box', title: 'Rectangle' },
  { id: 'ellipse', icon: '◯', label: 'Circle', title: 'Circle or oval' },
  { id: 'text', icon: 'T', label: 'Text', title: 'Click and type. Enter to finish, Shift+Enter for a new line' },
  { id: 'select', icon: '⬚', label: 'Select', title: 'Click a drawing, or the code, to move it. Scroll the wheel to zoom it. Delete removes a drawing. Double-click text to edit' },
]
const SHAPE_TOOLS = ['line', 'arrow', 'rect', 'ellipse']

// Code boxes call this to show their code on the white screen
// run: show a Run button and print the output under the code. full: a dark full-screen code view instead of the white screen.
export type BoardOptions = { run?: boolean; full?: boolean }
type BoardCode = BoardOptions & { code: string; title?: string }
export function openBoard(code: string, title?: string, options: BoardOptions = {}) {
  window.dispatchEvent(new CustomEvent('open-board', { detail: { code, title, ...options } }))
}

const measureCtx = document.createElement('canvas').getContext('2d')

function textLines(t: TextItem) {
  return t.text.split('\n')
}
function textBox(t: TextItem) {
  const px = textPx(t.size)
  let w = 10
  if (measureCtx) {
    measureCtx.font = fontFor(t.size)
    for (const l of textLines(t)) w = Math.max(w, measureCtx.measureText(l).width)
  }
  return { x: t.x, y: t.y, w, h: textLines(t).length * px * LINE_H }
}

function segDist(p: Pt, a: Pt, b: Pt) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len2 = dx * dx + dy * dy
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2))
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy))
}

function hit(it: Item, p: Pt, tol: number): boolean {
  if (it.k === 'free') {
    if (it.tool === 'eraser') return false
    const reach = tol + (it.tool === 'highlighter' ? it.size * 1.5 : it.size / 2)
    if (it.pts.length === 1) return Math.hypot(p[0] - it.pts[0][0], p[1] - it.pts[0][1]) <= reach
    for (let i = 1; i < it.pts.length; i++) if (segDist(p, it.pts[i - 1], it.pts[i]) <= reach) return true
    return false
  }
  if (it.k === 'text') {
    const b = textBox(it)
    return p[0] >= b.x - tol && p[0] <= b.x + b.w + tol && p[1] >= b.y - tol && p[1] <= b.y + b.h + tol
  }
  const reach = tol + it.size / 2
  if (it.shape === 'line' || it.shape === 'arrow') return segDist(p, it.a, it.b) <= reach
  const x1 = Math.min(it.a[0], it.b[0])
  const x2 = Math.max(it.a[0], it.b[0])
  const y1 = Math.min(it.a[1], it.b[1])
  const y2 = Math.max(it.a[1], it.b[1])
  if (it.shape === 'rect') {
    const outer = p[0] >= x1 - reach && p[0] <= x2 + reach && p[1] >= y1 - reach && p[1] <= y2 + reach
    const inner = p[0] > x1 + reach && p[0] < x2 - reach && p[1] > y1 + reach && p[1] < y2 - reach
    return outer && !inner
  }
  const rx = Math.max((x2 - x1) / 2, 1)
  const ry = Math.max((y2 - y1) / 2, 1)
  const v = Math.hypot((p[0] - (x1 + x2) / 2) / rx, (p[1] - (y1 + y2) / 2) / ry)
  return Math.abs(v - 1) * Math.min(rx, ry) <= reach
}

function move(it: Item, dx: number, dy: number) {
  if (it.k === 'free') it.pts = it.pts.map(([x, y]) => [x + dx, y + dy])
  else if (it.k === 'shape') {
    it.a = [it.a[0] + dx, it.a[1] + dy]
    it.b = [it.b[0] + dx, it.b[1] + dy]
  } else {
    it.x += dx
    it.y += dy
  }
}

function bounds(it: Item) {
  if (it.k === 'text') return textBox(it)
  const pts = it.k === 'free' ? it.pts : [it.a, it.b]
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  const pad = it.size
  const x = Math.min(...xs) - pad
  const y = Math.min(...ys) - pad
  return { x, y, w: Math.max(...xs) + pad - x, h: Math.max(...ys) + pad - y }
}

function paint(canvas: HTMLCanvasElement, items: Item[], offsetY: number, selected: Item | null) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const dpr = window.devicePixelRatio || 1
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  for (const it of items) {
    ctx.globalCompositeOperation = it.k === 'free' && it.tool === 'eraser' ? 'destination-out' : 'source-over'
    ctx.globalAlpha = it.k === 'free' && it.tool === 'highlighter' ? 0.35 : 1
    if (it.k === 'free') {
      ctx.strokeStyle = it.tool === 'eraser' ? '#000' : it.color
      ctx.lineWidth = it.tool === 'pen' ? it.size : it.size * 3
      ctx.beginPath()
      it.pts.forEach(([x, y], i) => {
        if (i === 0) ctx.moveTo(x, y - offsetY)
        else ctx.lineTo(x, y - offsetY)
      })
      // a single tap leaves a dot
      if (it.pts.length === 1) ctx.lineTo(it.pts[0][0] + 0.01, it.pts[0][1] - offsetY)
      ctx.stroke()
    } else if (it.k === 'shape') {
      ctx.strokeStyle = it.color
      ctx.lineWidth = it.size
      const [ax, ay] = [it.a[0], it.a[1] - offsetY]
      const [bx, by] = [it.b[0], it.b[1] - offsetY]
      ctx.beginPath()
      if (it.shape === 'rect') ctx.rect(Math.min(ax, bx), Math.min(ay, by), Math.abs(bx - ax), Math.abs(by - ay))
      else if (it.shape === 'ellipse') ctx.ellipse((ax + bx) / 2, (ay + by) / 2, Math.max(Math.abs(bx - ax) / 2, 0.5), Math.max(Math.abs(by - ay) / 2, 0.5), 0, 0, Math.PI * 2)
      else {
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        if (it.shape === 'arrow') {
          const ang = Math.atan2(by - ay, bx - ax)
          const head = 10 + it.size * 2
          for (const side of [-1, 1]) {
            ctx.moveTo(bx, by)
            ctx.lineTo(bx - head * Math.cos(ang + side * 0.45), by - head * Math.sin(ang + side * 0.45))
          }
        }
      }
      ctx.stroke()
    } else {
      ctx.fillStyle = it.color
      ctx.font = fontFor(it.size)
      ctx.textBaseline = 'top'
      const px = textPx(it.size)
      textLines(it).forEach((line, i) => ctx.fillText(line, it.x, it.y - offsetY + i * px * LINE_H + (px * LINE_H - px) / 2))
    }
  }
  ctx.globalAlpha = 1
  ctx.globalCompositeOperation = 'source-over'
  if (selected && items.includes(selected)) {
    const b = bounds(selected)
    ctx.strokeStyle = '#2563eb'
    ctx.lineWidth = 1.5
    ctx.setLineDash([6, 4])
    ctx.strokeRect(b.x - 4, b.y - offsetY - 4, b.w + 8, b.h + 8)
    ctx.setLineDash([])
  }
}

type Gesture =
  | { type: 'draw'; item: Free | Shape }
  | { type: 'remove'; saved: boolean }
  | { type: 'move'; last: Pt }
  | { type: 'code'; last: Pt }
  | { type: 'resize'; origin: Pt; d0: number; s0: number }

export default function Draw() {
  const [open, setOpen] = useState(false) // toolbar visible
  const [pen, setPen] = useState(false) // drawing on the page
  const [board, setBoard] = useState(false) // white screen open
  const [tool, setTool] = useState<Tool>('pen')
  const [color, setColor] = useState(COLORS[0])
  const [size, setSize] = useState(SIZES[1])
  const [edit, setEdit] = useState<Edit | null>(null)
  const [boardCode, setBoardCode] = useState<BoardCode | null>(null)
  const [boardOut, setBoardOut] = useState<PyResult | null>(null) // what the code printed when Run was pressed on the board
  const [boardStatus, setBoardStatus] = useState<'idle' | 'loading' | 'running'>('idle')
  const [codeT, setCodeT] = useState({ x: 0, y: 0, s: 1 }) // where the code sits on the board, and its zoom
  const [codeSel, setCodeSel] = useState(false)
  const [, bump] = useState(0)
  const codeRef = useRef<HTMLDivElement>(null)
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
  const items = useRef<Record<Layer, Item[]>>({ page: [], board: [] })
  const history = useRef<Record<Layer, Item[][]>>({ page: [], board: [] })
  const selected = useRef<Item | null>(null)
  const gesture = useRef<Gesture | null>(null)
  const field = useRef<HTMLTextAreaElement>(null)
  const editRef = useRef<Edit | null>(null)
  useEffect(() => {
    editRef.current = edit
  }, [edit])

  const layer: Layer = board ? 'board' : 'page'
  const drawing = pen || board

  // choose what Select has picked (a drawn item, or the code on the board) and refresh the panel
  const select = (it: Item | null, code = false) => {
    selected.current = it
    setCodeSel(code)
    bump((n) => n + 1)
  }

  const redraw = useCallback((which: Layer) => {
    const canvas = which === 'page' ? pageCanvas.current : boardCanvas.current
    if (canvas) paint(canvas, items.current[which], which === 'page' ? window.scrollY : 0, selected.current)
  }, [])

  // remember the drawing before a change, so Undo can step back
  const snapshot = (which: Layer) => {
    const h = history.current[which]
    h.push(structuredClone(items.current[which]))
    if (h.length > 60) h.shift()
  }

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
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<BoardCode>).detail
      items.current.board = []
      history.current.board = []
      selected.current = null
      setCodeSel(false)
      setCodeT({ x: 0, y: 0, s: 1 })
      setEdit(null)
      setBoardCode(d)
      setBoardOut(null)
      if (d.full) setColor((c) => (c === COLORS[4] ? COLORS[3] : c)) // dark ink would vanish on the dark screen
      setPen(false)
      setOpen(true)
      setBoard(true)
    }
    window.addEventListener('open-board', onOpen)
    return () => window.removeEventListener('open-board', onOpen)
  }, [])

  const undo = () => {
    const prev = history.current[layer].pop()
    if (!prev) return
    items.current[layer] = prev
    select(null)
    redraw(layer)
  }
  const clear = () => {
    if (!items.current[layer].length) return
    snapshot(layer)
    items.current[layer] = []
    select(null)
    redraw(layer)
  }
  const deleteSelected = () => {
    const sel = selected.current
    if (!sel || !items.current[layer].includes(sel)) return
    snapshot(layer)
    items.current[layer] = items.current[layer].filter((i) => i !== sel)
    select(null)
    redraw(layer)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.tagName === 'TEXTAREA'
      if (e.key === 'Escape') {
        if (board) setBoard(false)
        else if (pen) setPen(false)
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && drawing && !typing && tool === 'select') {
        e.preventDefault()
        deleteSelected()
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && drawing && !typing) {
        e.preventDefault()
        undo()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const offsetY = () => (layer === 'page' ? window.scrollY : 0)
  const point = (e: { clientX: number; clientY: number }): Pt => [e.clientX, e.clientY + offsetY()]

  // text editing
  const commitEdit = useCallback(() => {
    const ed = editRef.current
    if (!ed) return
    editRef.current = null
    setEdit(null)
    const text = (field.current?.value ?? ed.text).replace(/\s+$/, '')
    const list = items.current[ed.layer]
    if (ed.item) {
      if (text === ed.item.text) return
      snapshot(ed.layer)
      if (text) ed.item.text = text
      else items.current[ed.layer] = list.filter((i) => i !== ed.item)
    } else if (text) {
      snapshot(ed.layer)
      list.push({ k: 'text', color, size, x: ed.x, y: ed.y, text })
    } else return
    redraw(ed.layer)
  }, [color, size, redraw])

  useEffect(() => {
    if (edit) field.current?.focus()
  }, [edit])

  const topHit = (p: Pt): Item | null => {
    const list = items.current[layer]
    for (let i = list.length - 1; i >= 0; i--) if (hit(list[i], p, 6)) return list[i]
    return null
  }
  const removeAt = (p: Pt) => {
    const g = gesture.current
    if (g?.type !== 'remove') return
    const target = topHit(p)
    if (!target) return
    if (!g.saved) {
      snapshot(layer)
      g.saved = true
    }
    items.current[layer] = items.current[layer].filter((i) => i !== target)
    if (selected.current === target) select(null)
    redraw(layer)
  }

  // zoom and centre: the picked drawn item, or else the code on the board
  const scaleCode = (f: number) =>
    setCodeT((c) => {
      const s = Math.min(4, Math.max(0.3, c.s * f))
      const w = codeRef.current?.offsetWidth ?? 0
      const h = codeRef.current?.offsetHeight ?? 0
      return { x: c.x - (w * (s - c.s)) / 2, y: c.y - (h * (s - c.s)) / 2, s }
    })
  const scaleItem = (it: Item, f: number) => {
    snapshot(layer)
    const b0 = bounds(it)
    const [cx, cy] = [b0.x + b0.w / 2, b0.y + b0.h / 2]
    if (it.k === 'free') it.pts = it.pts.map(([x, y]) => [cx + (x - cx) * f, cy + (y - cy) * f])
    else if (it.k === 'shape') {
      it.a = [cx + (it.a[0] - cx) * f, cy + (it.a[1] - cy) * f]
      it.b = [cx + (it.b[0] - cx) * f, cy + (it.b[1] - cy) * f]
    } else {
      it.size = (Math.max(10, textPx(it.size) * f) - 16) / 3
      const b1 = bounds(it)
      move(it, cx - (b1.x + b1.w / 2), cy - (b1.y + b1.h / 2))
    }
    redraw(layer)
  }
  const zoom = (f: number) => {
    if (selected.current) scaleItem(selected.current, f)
    else if (board && boardCode) scaleCode(f)
  }
  const center = () => {
    const it = selected.current
    if (it) {
      snapshot(layer)
      const b = bounds(it)
      move(it, window.innerWidth / 2 - (b.x + b.w / 2), window.innerHeight / 2 + offsetY() - (b.y + b.h / 2))
      redraw(layer)
    } else if (board && boardCode && codeRef.current) {
      const el = codeRef.current
      setCodeT((c) => ({
        ...c,
        x: (window.innerWidth - el.offsetWidth * c.s) / 2 - el.offsetLeft,
        y: (window.innerHeight - el.offsetHeight * c.s) / 2 - el.offsetTop,
      }))
    }
  }
  const onWheel = (e: React.WheelEvent) => {
    if (tool !== 'select') return
    const f = e.deltaY < 0 ? 1.1 : 1 / 1.1
    if (selected.current) scaleItem(selected.current, f)
    else if (codeSel) scaleCode(f)
  }

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    if (editRef.current) commitEdit()
    const p = point(e)
    if (tool === 'text') {
      e.preventDefault()
      setEdit({ layer, x: p[0], y: p[1], text: '', item: null })
      return
    }
    e.currentTarget.setPointerCapture(e.pointerId)
    if (tool === 'select') {
      const target = topHit(p)
      const box = codeRef.current?.getBoundingClientRect()
      if (!target && codeSel && box && Math.hypot(p[0] - box.right, p[1] - box.bottom) <= 18) {
        // grab the corner handle: resize the code about its top-left corner
        const d0 = Math.max(1, Math.hypot(p[0] - box.left, p[1] - box.top))
        gesture.current = { type: 'resize', origin: [box.left, box.top], d0, s0: codeT.s }
      } else if (target) {
        select(target)
        snapshot(layer)
        gesture.current = { type: 'move', last: p }
      } else if (board && box && p[0] >= box.left && p[0] <= box.right && p[1] >= box.top && p[1] <= box.bottom) {
        select(null, true)
        gesture.current = { type: 'code', last: p }
      } else select(null)
      redraw(layer)
    } else if (tool === 'remove') {
      gesture.current = { type: 'remove', saved: false }
      removeAt(p)
    } else {
      snapshot(layer)
      selected.current = null
      const item: Free | Shape = SHAPE_TOOLS.includes(tool)
        ? { k: 'shape', shape: tool as Shape['shape'], color, size, a: p, b: p }
        : { k: 'free', tool: tool as Free['tool'], color, size, pts: [p] }
      items.current[layer].push(item)
      gesture.current = { type: 'draw', item }
      redraw(layer)
    }
  }
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const g = gesture.current
    if (!g) return
    if (g.type === 'draw') {
      if (g.item.k === 'free') {
        // coalesced events keep fast strokes smooth
        const events = e.nativeEvent.getCoalescedEvents?.() ?? [e.nativeEvent]
        for (const ev of events) g.item.pts.push(point(ev))
      } else {
        g.item.b = point(e)
      }
    } else if (g.type === 'remove') {
      removeAt(point(e))
      return
    } else if (g.type === 'resize') {
      const p = point(e)
      const s = Math.min(4, Math.max(0.3, (g.s0 * Math.hypot(p[0] - g.origin[0], p[1] - g.origin[1])) / g.d0))
      setCodeT((c) => ({ ...c, s }))
      return
    } else if (g.type === 'code') {
      const p = point(e)
      const [dx, dy] = [p[0] - g.last[0], p[1] - g.last[1]]
      g.last = p
      setCodeT((c) => ({ ...c, x: c.x + dx, y: c.y + dy }))
      return
    } else if (selected.current) {
      const p = point(e)
      move(selected.current, p[0] - g.last[0], p[1] - g.last[1])
      g.last = p
    }
    redraw(layer)
  }
  const onUp = () => {
    const g = gesture.current
    gesture.current = null
    if (g?.type === 'draw' && g.item.k === 'shape' && Math.hypot(g.item.b[0] - g.item.a[0], g.item.b[1] - g.item.a[1]) < 4) {
      // a click without a drag makes no shape
      items.current[layer] = items.current[layer].filter((i) => i !== g.item)
      history.current[layer].pop()
      redraw(layer)
    }
  }
  const onDouble = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool !== 'select') return
    const target = topHit(point(e))
    if (target?.k === 'text') setEdit({ layer, x: target.x, y: target.y, text: target.text, item: target })
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

  const pickTool = (t: Tool) => {
    commitEdit()
    select(null)
    redraw(layer)
    setTool(t)
  }
  const togglePen = () => {
    commitEdit()
    setPen((p) => !p)
    setBoard(false)
  }
  const toggleBoard = () => {
    commitEdit()
    if (!board) {
      setBoardCode(null)
      setBoardOut(null)
    }
    setPen(false)
    setBoard((b) => !b)
  }

  const runOnBoard = async () => {
    if (!boardCode || boardStatus !== 'idle') return
    setBoardStatus('loading')
    setBoardOut(await runPython(boardCode.code, setBoardStatus))
    setBoardStatus('idle')
  }

  const canvasClass = (extra: string) => 'draw-layer' + extra + ' tool-' + tool
  const px = edit ? textPx(edit.item?.size ?? size) : 0

  return (
    <>
      <canvas ref={pageCanvas} className={canvasClass(pen && !board ? ' live' : '')} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onDoubleClick={onDouble} onWheel={onWheel} />
      {board && (
        <div className={'draw-board' + (boardCode?.full ? ' full' : '')}>
          {boardCode && (
            <div ref={codeRef} className={'draw-board-code' + (codeSel ? ' sel' : '')} style={{ transform: `translate(${codeT.x}px, ${codeT.y}px) scale(${codeT.s})` }}>
              {boardCode.title && <p>{boardCode.title}</p>}
              <pre>{boardCode.code}</pre>
              {boardOut && (
                <div className={'draw-board-out' + (boardOut.error ? ' err' : '')}>
                  <span>{boardOut.error ? 'Error' : 'Output'}</span>
                  {boardOut.text && <pre>{boardOut.text}</pre>}
                  {boardOut.images?.map((img, i) => (
                    <img key={i} src={'data:image/png;base64,' + img} alt={`Chart ${i + 1} drawn by the code`} />
                  ))}
                </div>
              )}
              {codeSel && <span className="draw-handle" style={{ width: 16 / codeT.s, height: 16 / codeT.s, right: -8 / codeT.s, bottom: -8 / codeT.s }} />}
            </div>
          )}
          <canvas ref={boardCanvas} className={canvasClass(' board live')} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onDoubleClick={onDouble} onWheel={onWheel} />
          <button className="draw-board-close" onClick={() => setBoard(false)}>✕ {boardCode?.full ? 'Close' : 'Close board'}</button>
          {boardCode?.run && (
            <button className="draw-board-close draw-board-run" onClick={runOnBoard} disabled={boardStatus !== 'idle'}>
              {boardStatus === 'loading' ? 'Loading Python…' : boardStatus === 'running' ? 'Running…' : boardOut ? '▶ Run again' : '▶ Run'}
            </button>
          )}
        </div>
      )}
      {edit && (
        <textarea
          key={edit.layer + edit.x + '-' + edit.y}
          ref={field}
          className="draw-text"
          defaultValue={edit.text}
          rows={Math.max(1, edit.text.split('\n').length)}
          spellCheck={false}
          style={{
            left: edit.x,
            top: edit.y - (edit.layer === 'page' ? window.scrollY : 0),
            color: edit.item?.color ?? color,
            font: fontFor(edit.item?.size ?? size),
            lineHeight: LINE_H,
            minHeight: px * LINE_H,
          }}
          placeholder="Type…"
          onInput={(e) => {
            const t = e.currentTarget
            t.rows = Math.max(1, t.value.split('\n').length)
          }}
          onKeyDown={(e) => {
            e.stopPropagation()
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              commitEdit()
            } else if (e.key === 'Escape') {
              editRef.current = null
              setEdit(null)
            }
          }}
          onBlur={commitEdit}
        />
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
                <div className="draw-tools">
                  {TOOLS.map((t) => (
                    <button key={t.id} className={'draw-tool' + (tool === t.id ? ' on' : '')} onClick={() => pickTool(t.id)} title={t.title}>
                      <span className="draw-tool-icon" aria-hidden="true">{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
                <div className="draw-colors">
                  {COLORS.map((c) => (
                    <button key={c} className={'draw-color' + (color === c && tool !== 'eraser' ? ' on' : '')} style={{ background: c }} onClick={() => { setColor(c); if (tool === 'eraser' || tool === 'remove') setTool('pen') }} aria-label={'Colour ' + c} />
                  ))}
                </div>
                <div className="draw-row three">
                  {SIZES.map((n) => (
                    <button key={n} className={'draw-size' + (size === n ? ' on' : '')} onClick={() => setSize(n)} aria-label={'Size ' + n}>
                      <i style={{ width: n + 4, height: n + 4 }} />
                    </button>
                  ))}
                </div>
                {(selected.current || (board && boardCode)) && (
                  <div className="draw-zoom">
                    <span>{selected.current ? 'Item' : 'Code'}</span>
                    <button className="draw-btn" onClick={() => zoom(1 / 1.15)} title="Zoom out (or scroll the wheel with Select)">🔍−</button>
                    <button className="draw-btn" onClick={() => zoom(1.15)} title="Zoom in (or scroll the wheel with Select)">🔍+</button>
                    <button className="draw-btn" onClick={center} title="Move to the centre of the screen">Center</button>
                  </div>
                )}
                <div className="draw-row two">
                  <button className="draw-btn" onClick={undo} title="Undo (Ctrl+Z)">↶ Undo</button>
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
