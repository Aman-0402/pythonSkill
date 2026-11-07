import { useEffect, useRef, useState } from 'react'
import { Code } from './Highlight'

export type PracticeFile = {
  group: string
  path: string
  sessions: string
  what: string
  bytes: number
  sheets?: Record<string, (string | number | null)[][]>
}

const ROW_LIMIT = 100
type Cell = string | number | null

// A small CSV reader: quoted fields may hold the separator, and "" is one quote mark.
function parseTable(text: string, sep: string) {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"'
        i++
      } else if (c === '"') quoted = false
      else cell += c
    } else if (c === '"') quoted = true
    else if (c === sep) {
      row.push(cell)
      cell = ''
    } else if (c === '\n') {
      rows.push([...row, cell])
      row = []
      cell = ''
    } else if (c !== '\r') cell += c
  }
  if (cell || row.length) rows.push([...row, cell])
  return rows
}

function DataTable({ rows, header }: { rows: Cell[][]; header: boolean }) {
  const width = Math.max(...rows.map((r) => r.length))
  const head = header ? rows[0] : Array.from({ length: width }, (_, i) => `column ${i + 1}`)
  const body = header ? rows.slice(1) : rows
  return (
    <>
      <p className="viewer-note">
        {body.length > ROW_LIMIT ? `Showing the first ${ROW_LIMIT} of ${body.length} rows and ${width} columns.` : `${body.length} rows and ${width} columns.`}
        {!header && ' This file has no title line, so the column names here are only labels.'}
      </p>
      <div className="viewer-table" tabIndex={0} role="region" aria-label="File contents">
        <table>
          <thead>
            <tr>
              <th scope="col">row</th>
              {head.map((h, i) => <th scope="col" key={i}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {body.slice(0, ROW_LIMIT).map((r, i) => (
              <tr key={i}>
                <td className="viewer-row">{i}</td>
                {head.map((_, k) => {
                  const value = r[k]
                  const blank = value === undefined || value === null || value === ''
                  return <td key={k} className={blank ? 'viewer-blank' : undefined}>{blank ? 'blank' : value}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

function Notebook({ text }: { text: string }) {
  const cells = (JSON.parse(text) as { cells: { cell_type: string; source: string[] }[] }).cells
  return (
    <div className="viewer-cells">
      {cells.map((c, i) =>
        c.cell_type === 'code' ? (
          <pre className="viewer-code" key={i}><Code code={c.source.join('')} /></pre>
        ) : (
          <pre className="viewer-text" key={i}>{c.source.join('')}</pre>
        ),
      )}
    </div>
  )
}

function Workbook({ sheets }: { sheets: NonNullable<PracticeFile['sheets']> }) {
  const names = Object.keys(sheets)
  const [sheet, setSheet] = useState(names[0])
  return (
    <>
      <div className="viewer-tabs" role="group" aria-label="Sheets in this workbook">
        {names.map((n) => (
          <button type="button" key={n} aria-pressed={n === sheet} onClick={() => setSheet(n)}>{n}</button>
        ))}
      </div>
      <DataTable rows={sheets[sheet]} header />
    </>
  )
}

export default function FileViewer({ file, url, sizeText, onClose }: { file: PracticeFile; url: string; sizeText: string; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const name = file.path.split('/').pop() ?? file.path
  const type = name.split('.').pop() ?? ''
  const [text, setText] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    dialog.current?.showModal()
  }, [])

  useEffect(() => {
    if (file.sheets) return
    let live = true
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error('not found')
        return r.text()
      })
      .then((t) => live && setText(t))
      .catch(() => live && setFailed(true))
    return () => {
      live = false
    }
  }, [file, url])

  const body = () => {
    if (file.sheets) return <Workbook sheets={file.sheets} />
    if (failed) return <p className="viewer-note">This file could not be opened. Check your connection, or download it instead.</p>
    if (text === null) return <p className="viewer-note">Opening…</p>
    if (type === 'csv' || type === 'tsv') {
      const first = text.split('\n')[0]
      const sep = type === 'tsv' ? '\t' : first.includes(';') && !first.includes(',') ? ';' : ','
      return <DataTable rows={parseTable(text, sep)} header={!/no_header/.test(name)} />
    }
    if (type === 'ipynb') return <Notebook text={text} />
    if (type === 'py') return <pre className="viewer-code" tabIndex={0}><Code code={text.replace(/\n$/, '')} /></pre>
    return <pre className="viewer-text" tabIndex={0}>{text.replace(/\n$/, '')}</pre>
  }

  return (
    <dialog
      ref={dialog}
      className="viewer"
      aria-label={`Viewing ${name}`}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close()
      }}
    >
      <div className="viewer-box">
        <header className="viewer-head">
          <div>
            <h2>{name}</h2>
            <p>{file.what}</p>
          </div>
          <div className="viewer-actions">
            <a className="practice-button primary" href={url} download>Download <small>{sizeText}</small></a>
            <button type="button" className="practice-button" onClick={() => dialog.current?.close()}>Close</button>
          </div>
        </header>
        <div className="viewer-body">{body()}</div>
      </div>
    </dialog>
  )
}
