import { useMemo, useState } from 'react'
import { Link } from './router'
import FileViewer, { type PracticeFile } from './FileViewer'
import data from './practice-list.json'

const list = data as { zip: string; zipBytes: number; files: PracticeFile[] }

const url = (path: string) => `${import.meta.env.BASE_URL}practice-files/${path}`

const groupNotes: Record<string, string> = {
  Pandas: 'Tables to load, clean, filter, group and merge. Keep your script in the same folder.',
  Charts: 'Ready-made data for your Matplotlib and Seaborn charts.',
  'File handling': 'Plain text and CSV files to open with Python.',
  Programs: 'Scripts that use input() or several files, so they run on your computer instead of in the browser.',
  Capstone: 'A project folder ready to use: the shop data, a starter notebook and a README.',
}

const groups = [...new Set(list.files.map((f) => f.group))]

const sizeText = (bytes: number) => (bytes < 1024 ? `${bytes} B` : `${Math.round(bytes / 1024)} KB`)
const extension = (path: string) => path.split('.').pop() ?? ''
const fileName = (path: string) => path.split('/').pop() ?? path
// the folder inside its group, shown only where it tells two files apart
const folderOf = (path: string) => path.split('/').slice(1, -1).join('/')

// "18 to 20" and "19, 21" both mean a set of session numbers
function hasSession(sessions: string, n: number) {
  const range = sessions.match(/^(\d+) to (\d+)$/)
  if (range) return n >= Number(range[1]) && n <= Number(range[2])
  return sessions.split(',').some((s) => Number(s) === n)
}

function matches(file: PracticeFile, query: string) {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w && w !== 'session')
  const text = `${file.path} ${file.what} ${file.group}`.toLowerCase()
  return words.every((w) => (/^\d+$/.test(w) ? hasSession(file.sessions, Number(w)) : text.includes(w)))
}

export default function Practice() {
  const [group, setGroup] = useState('All')
  const [query, setQuery] = useState('')
  const [viewing, setViewing] = useState<PracticeFile | null>(null)

  const shown = useMemo(
    () => list.files.filter((f) => (group === 'All' || f.group === group) && matches(f, query)),
    [group, query],
  )
  const clear = () => {
    setGroup('All')
    setQuery('')
  }

  return (
    <div className="light-page">
      <header className="practice-hero">
        <div className="wrap practice-hero-grid">
          <div>
            <Link href="/contents" className="back">← Contents</Link>
            <h1>Practice files</h1>
            <p>Everything you need to run the lessons on your own computer: data, programs and a project to finish.</p>
            <a className="practice-all" href={url(list.zip)} download>
              Download all {list.files.length} files
              <small>zip, {sizeText(list.zipBytes)}</small>
            </a>
          </div>
          <ol className="practice-steps">
            <li><b>Download</b> the zip and unzip it.</li>
            <li><b>Open</b> the folder in VS Code.</li>
            <li><b>Install</b> what you need once: <code>pip install pandas openpyxl</code></li>
            <li><b>Run</b> your script from the same folder as its data.</li>
          </ol>
        </div>
      </header>

      <div className="practice-tools">
        <div className="wrap practice-tools-row">
          <label className="practice-search">
            <span className="practice-sr">Search the files</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try: excel, merge or session 23" />
          </label>
          <div className="practice-chips" role="group" aria-label="Show one kind of file">
            {['All', ...groups].map((g) => (
              <button type="button" key={g} aria-pressed={group === g} onClick={() => setGroup(g)}>
                {g} <span>{g === 'All' ? list.files.length : list.files.filter((f) => f.group === g).length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="wrap practice-main">
        <p className="practice-count" aria-live="polite">{shown.length === list.files.length ? '' : `${shown.length} of ${list.files.length} files`}</p>

        {shown.length === 0 && (
          <div className="practice-empty">
            <h2>No files match that search</h2>
            <p>Try a file name, a topic such as “merge”, or a session number.</p>
            <button type="button" onClick={clear}>Show all files</button>
          </div>
        )}

        {groups.map((g) => {
          const files = shown.filter((f) => f.group === g)
          if (!files.length) return null
          return (
            <section className="practice-group" key={g}>
              <div className="practice-group-head">
                <h2>{g}</h2>
                <p>{groupNotes[g]}</p>
              </div>
              <ul>
                {files.map((f) => (
                  <li key={f.path}>
                    <span className={`practice-type type-${extension(f.path)}`}>{extension(f.path)}</span>
                    <span className="practice-file">
                      <b>{fileName(f.path)}</b>
                      {folderOf(f.path) && <i>{folderOf(f.path)}/</i>}
                      <span>{f.what}</span>
                    </span>
                    <span className="practice-session">Session {f.sessions}</span>
                    <span className="practice-size">{sizeText(f.bytes)}</span>
                    <span className="practice-row-actions">
                      <button type="button" className="practice-button" aria-label={`View ${fileName(f.path)}`} onClick={() => setViewing(f)}>View</button>
                      <a className="practice-button primary" href={url(f.path)} download aria-label={`Download ${fileName(f.path)}, ${sizeText(f.bytes)}`}>Download</a>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </main>

      {viewing && <FileViewer key={viewing.path} file={viewing} url={url(viewing.path)} sizeText={sizeText(viewing.bytes)} onClose={() => setViewing(null)} />}
    </div>
  )
}
