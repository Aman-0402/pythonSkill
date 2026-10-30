// Builds a PDF of a session's notes from src/content.ts.
//
// usage (from the project root):
//   node --experimental-strip-types scripts/notes-pdf.mjs <lesson slug | session number>
//   node --experimental-strip-types scripts/notes-pdf.mjs 1
//
// The PDF goes in "Notes pdf/" as "Session N - <title>.pdf". Pictures for a section or sub-section are taken from
// src/slides/ (a file named after the slide id, plus -2, -3, ...), exactly like the website.
// Needs Chrome (set CHROME_PATH if it is not in the usual Windows place). Nothing else is installed.
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { lessons } from '../src/content.ts'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'Notes pdf')
const slidesDir = path.join(root, 'src', 'slides')
const chrome = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const arg = process.argv[2]
if (!arg) {
  console.error('Give a lesson slug or a session number, for example: 1')
  process.exit(1)
}
const index = /^\d+$/.test(arg) ? Number(arg) - 1 : lessons.findIndex((l) => l.slug === arg)
const lesson = lessons[index]
if (!lesson) {
  console.error('No such lesson. Available:', lessons.map((l, i) => `${i + 1} = ${l.slug}`).join(', '))
  process.exit(1)
}
const sessionNo = index + 1

/* ---------- html helpers ---------- */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// `code` and **bold** inside running text
const inline = (text) =>
  text
    .split(/(`[^`]+`|\*\*[^*]+\*\*)/)
    .map((part) => {
      if (part.startsWith('`')) return `<code>${esc(part.slice(1, -1))}</code>`
      if (part.startsWith('**')) return `<strong>${esc(part.slice(2, -2))}</strong>`
      return esc(part)
    })
    .join('')

// tiny Python colouring, same rules as the website
const highlight = (line) =>
  line
    .split(/(#.*$|"[^"]*"|'[^']*'|\b(?:print|exit|Print|prnt)(?=\()|\b\d+(?:\.\d+)?\b)/)
    .map((part) => {
      if (part.startsWith('#')) return `<span class="c">${esc(part)}</span>`
      if (/^["']/.test(part)) return `<span class="s">${esc(part)}</span>`
      if (/^(print|exit|Print|prnt)$/.test(part)) return `<span class="f">${esc(part)}</span>`
      if (/^\d/.test(part)) return `<span class="n">${esc(part)}</span>`
      return esc(part)
    })
    .join('')

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// pictures for a slide id: <id>.ext first, then <id>-2.ext, <id>-3.ext ...
const picturesFor = (id) => {
  if (!fs.existsSync(slidesDir)) return []
  return fs
    .readdirSync(slidesDir)
    .map((file) => {
      const name = file.replace(/\.[^.]+$/, '')
      if (!/\.(png|jpe?g|webp|gif|svg|avif)$/i.test(file)) return null
      if (name === id) return { n: 1, file }
      const m = name.match(/^(.*)-(\d+)$/)
      return m && m[1] === id ? { n: Number(m[2]), file } : null
    })
    .filter(Boolean)
    .sort((a, b) => a.n - b.n)
    .map((p) => {
      // embedded as a data URI so the page can shrink it in a canvas (a file:// image would taint the canvas)
      const ext = path.extname(p.file).slice(1).toLowerCase().replace('jpg', 'jpeg').replace('svg', 'svg+xml')
      return `data:image/${ext};base64,${fs.readFileSync(path.join(slidesDir, p.file)).toString('base64')}`
    })
}
const pictures = (id) => {
  const list = picturesFor(id)
  return list.length ? `<div class="pics n${list.length}">${list.map((src) => `<img src="${src}" alt="">`).join('')}</div>` : ''
}

const block = (b) => {
  switch (b.type) {
    case 'p':
      return `<p>${inline(b.text)}</p>`
    case 'ul':
      return `<ul>${b.items.map((t) => `<li>${inline(t)}</li>`).join('')}</ul>`
    case 'ol':
      return `<ol${b.start ? ` start="${b.start}"` : ''}>${b.items.map((t) => `<li>${inline(t)}</li>`).join('')}</ol>`
    case 'code':
      return `<figure class="code">${b.label ? `<figcaption>${esc(b.label)}</figcaption>` : ''}<pre>${b.code
        .split('\n')
        .map(highlight)
        .join('\n')}</pre>${b.output ? `<div class="out"><span>Output</span><pre>${esc(b.output)}</pre></div>` : ''}</figure>`
    case 'note':
      return `<aside class="note ${b.tone}"><strong>${esc(b.title)}</strong><p>${inline(b.text)}</p></aside>`
    case 'table':
      return `<table><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows
        .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
        .join('')}</tbody></table>`
    default:
      return ''
  }
}

/* ---------- page ---------- */
let body = ''
lesson.sections.forEach((s, i) => {
  body += `<section class="sec c${i % 8}"><h2>${esc(s.title)}</h2>${pictures(s.id)}`
  for (const b of s.blocks) {
    if (b.type === 'h3') body += `<h3>${esc(b.text)}</h3>${pictures(`${s.id}-${slug(b.text)}`)}`
    else body += block(b)
  }
  body += '</section>'
})

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Session ${sessionNo}: ${esc(lesson.title)}</title>
<style>
@page { size: A4; margin: 16mm 15mm 18mm; }
* { box-sizing: border-box; }
body { margin: 0; color: #1b2b3f; font: 10.5pt/1.55 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
header.top { margin: 0 0 8mm; padding: 9mm 9mm 8mm; color: #fff; background: linear-gradient(135deg, #0a1a3f, #1f5cc4); border-radius: 3mm; }
header.top .kicker { margin: 0 0 3mm; font: 700 8.5pt 'Consolas', monospace; letter-spacing: .12em; text-transform: uppercase; color: #6ff0aa; }
header.top h1 { margin: 0; font-size: 25pt; line-height: 1.1; letter-spacing: -.01em; }
header.top p { margin: 4mm 0 0; font-size: 11.5pt; color: #cfe0ff; }
.sec { --a: #1d4ed8; margin: 0 0 7mm; }
.c0 { --a: #1d4ed8; } .c1 { --a: #15803d; } .c2 { --a: #c2410c; } .c3 { --a: #6d28d9; }
.c4 { --a: #be185d; } .c5 { --a: #0e7490; } .c6 { --a: #a16207; } .c7 { --a: #4338ca; }
h2 { margin: 0 0 3.5mm; padding: 0 0 2mm 3.5mm; font-size: 16pt; color: #10203a; border-left: 1.6mm solid var(--a); border-bottom: .3mm solid #d9e2ee; break-after: avoid; }
h3 { margin: 5mm 0 2mm; font-size: 12pt; color: var(--a); break-after: avoid; }
p { margin: 0 0 2.5mm; }
ul, ol { margin: 0 0 3mm; padding-left: 6mm; }
li { margin-bottom: 1.2mm; }
li::marker { color: var(--a); font-weight: 700; }
strong { color: #0a1628; }
code { padding: 0 1.2mm; font: 9.5pt 'Consolas', 'Courier New', monospace; color: var(--a); background: #f1f5fb; border: .2mm solid #d9e2ee; border-radius: 1mm; }
figure.code { margin: 3mm 0 4mm; break-inside: avoid; border: .3mm solid #cfd9e6; border-radius: 2mm; overflow: hidden; background: #f6f8fb; }
figure.code figcaption { padding: 1.6mm 3.5mm; font: 700 8pt 'Consolas', monospace; color: #fff; background: var(--a); }
figure.code pre { margin: 0; padding: 3mm 4mm; font: 9.5pt/1.55 'Consolas', 'Courier New', monospace; white-space: pre-wrap; color: #10203a; }
figure.code .out { border-top: .3mm dashed #b9c6d8; background: #eef3fa; }
figure.code .out span { display: block; padding: 1.6mm 4mm 0; font: 700 7pt 'Consolas', monospace; letter-spacing: .1em; text-transform: uppercase; color: #6b7d92; }
figure.code .out pre { color: #0b5a8a; padding-top: 1mm; }
.c { color: #7a8aa0; font-style: italic; } .s { color: #0b7a3a; } .f { color: #c2410c; font-weight: 600; } .n { color: #be185d; }
aside.note { margin: 3mm 0 4mm; padding: 2.5mm 4mm; break-inside: avoid; border: .4mm solid; border-radius: 2mm; }
aside.note p { margin: 0; }
aside.tip { background: #eef6ff; border-color: #93c5fd; } aside.tip strong { color: #1e40af; }
aside.warn { background: #fff7e6; border-color: #f5b942; } aside.warn strong { color: #92400e; }
aside.note > strong { display: block; margin-bottom: .8mm; }
table { width: 100%; margin: 3mm 0 4mm; border-collapse: collapse; break-inside: avoid; font-size: 9.8pt; }
th { padding: 2mm 3mm; text-align: left; font: 700 8pt 'Consolas', monospace; letter-spacing: .06em; text-transform: uppercase; color: #fff; background: var(--a); }
td { padding: 1.8mm 3mm; border-bottom: .25mm solid #d9e2ee; vertical-align: top; }
tr:nth-child(even) td { background: #f7f9fc; }
.pics { display: flex; gap: 4mm; margin: 2mm 0 4mm; break-inside: avoid; }
.pics img { display: block; min-width: 0; height: auto; border: .3mm solid #cfd9e6; }
.pics.n1 img { width: 62%; }
.pics.n2 img { width: calc(50% - 2mm); }
.pics.n3 img { width: calc(33.3% - 3mm); }
</style></head>
<body>
<header class="top"><p class="kicker">Python for beginners · Session ${sessionNo}</p><h1>${esc(lesson.title)}</h1><p>${esc(lesson.summary)}</p></header>
${body}
<script>
// shrink big pictures to a print-friendly size (a few hundred KB instead of megabytes in the PDF)
window.__ready = false
addEventListener('load', async () => {
  for (const img of document.querySelectorAll('.pics img')) {
    await img.decode().catch(() => {})
    const scale = Math.min(1, 1100 / img.naturalWidth)
    const c = document.createElement('canvas')
    c.width = Math.round(img.naturalWidth * scale)
    c.height = Math.round(img.naturalHeight * scale)
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
    img.src = c.toDataURL('image/jpeg', 0.88)
    await img.decode().catch(() => {})
  }
  window.__ready = true
})
</script>
</body></html>`

/* ---------- print with Chrome ---------- */
fs.mkdirSync(outDir, { recursive: true })
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'notes-pdf-'))
const htmlFile = path.join(tmp, 'notes.html')
fs.writeFileSync(htmlFile, html)

const safeTitle = lesson.title.replace(/[\\/:*?"<>|]/g, '').trim()
const pdfFile = path.join(outDir, `Session ${sessionNo} - ${safeTitle}.pdf`)
const port = 9600 + Math.floor(Math.random() * 300)
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${path.join(tmp, 'profile')}`, 'about:blank'], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

try {
  let targets
  for (let i = 0; i < 60; i++) {
    try {
      targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json()
      if (targets.find((t) => t.type === 'page')) break
    } catch {}
    await sleep(250)
  }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl)
  await new Promise((r) => (ws.onopen = r))
  let id = 0
  const pending = new Map()
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data)
    if (d.id && pending.has(d.id)) pending.get(d.id)(d.result ?? d)
  }
  const send = (method, params = {}) =>
    new Promise((res) => {
      const n = ++id
      pending.set(n, res)
      ws.send(JSON.stringify({ id: n, method, params }))
    })

  await send('Page.enable')
  await send('Page.navigate', { url: pathToFileURL(htmlFile).href })
  for (let i = 0; i < 80; i++) {
    const ready = await send('Runtime.evaluate', { expression: 'window.__ready === true', returnByValue: true })
    if (ready.result?.value) break
    await sleep(250)
  }
  await sleep(300)
  // NOTES_PREVIEW=<path prefix>: also save the page as A4-sized pictures, <prefix>_1.png, <prefix>_2.png ...
  // (a quick look at the layout without a PDF viewer; the real page breaks can differ slightly)
  if (process.env.NOTES_PREVIEW) {
    await send('Emulation.setEmulatedMedia', { media: 'print' })
    await send('Emulation.setDeviceMetricsOverride', { width: 794, height: 1123, deviceScaleFactor: 1, mobile: false })
    const metrics = await send('Page.getLayoutMetrics')
    const total = Math.ceil((metrics.cssContentSize ?? metrics.contentSize).height / 1123)
    for (let i = 0; i < total; i++) {
      const shot = await send('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true,
        clip: { x: 0, y: i * 1123, width: 794, height: 1123, scale: 1 },
      })
      fs.writeFileSync(`${process.env.NOTES_PREVIEW}_${i + 1}.png`, Buffer.from(shot.data, 'base64'))
    }
  }
  const footer = `<div style="width:100%;font:8px Arial;color:#6b7d92;padding:0 15mm;display:flex;justify-content:space-between"><span>Session ${sessionNo}: ${esc(lesson.title)}</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`
  const pdf = await send('Page.printToPDF', {
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: footer,
  })
  if (!pdf.data) throw new Error('Chrome returned no PDF: ' + JSON.stringify(pdf).slice(0, 200))
  fs.writeFileSync(pdfFile, Buffer.from(pdf.data, 'base64'))
  ws.close()
  console.log(`wrote ${path.relative(root, pdfFile)} (${(fs.statSync(pdfFile).size / 1024).toFixed(0)} KB)`)
} finally {
  proc.kill()
  await sleep(800)
  try {
    fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 })
  } catch {
    // Windows can keep Chrome's profile files locked for a moment; the temp folder is harmless
  }
}
