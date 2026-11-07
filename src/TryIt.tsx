import { useState } from 'react'
import { openBoard } from './Draw'

// Python runs in the browser through Pyodide (WebAssembly), loaded from a CDN on first use.
const PYODIDE_VERSION = '0.26.4'
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

type Pyodide = {
  runPythonAsync(code: string): Promise<unknown>
  loadPackagesFromImports(code: string): Promise<void>
  loadPackage(names: string | string[]): Promise<void>
  setStdout(o: { write: (bytes: Uint8Array) => number }): void
  setStderr(o: { write: (bytes: Uint8Array) => number }): void
}

declare global {
  interface Window {
    loadPyodide?: (o: { indexURL: string }) => Promise<Pyodide>
  }
}

let pyodide: Promise<Pyodide> | null = null

function loadPython(): Promise<Pyodide> {
  if (!pyodide) {
    pyodide = new Promise<Pyodide>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = PYODIDE_URL + 'pyodide.js'
      script.onload = () => window.loadPyodide!({ indexURL: PYODIDE_URL }).then(resolve, reject)
      script.onerror = () => reject(new Error('Could not load Python. Check your internet connection.'))
      document.head.appendChild(script)
    }).catch((e) => {
      pyodide = null
      throw e
    })
  }
  return pyodide
}

// Python keeps text without a newline (for example print(i, end=" ")) in its own buffer until it is flushed.
const flushOutput = (py: Pyodide) =>
  py.runPythonAsync('import sys\nsys.stdout.flush()\nsys.stderr.flush()').catch(() => undefined)

// Charts: draw with matplotlib's "agg" backend, then turn every open figure into a PNG to show under the output.
const CHART_SETUP = `import matplotlib
matplotlib.use("agg")
import matplotlib.pyplot as _plt
_plt.close("all")
_plt.show = lambda *a, **k: None`
const CHART_COLLECT = `import io, base64, json
import matplotlib.pyplot as _plt
_imgs = []
for _n in _plt.get_fignums():
    _b = io.BytesIO()
    _plt.figure(_n).savefig(_b, format="png", dpi=110, bbox_inches="tight")
    _imgs.append(base64.b64encode(_b.getvalue()).decode())
_plt.close("all")
json.dumps(_imgs)`

// openpyxl and seaborn are not bundled with Pyodide, so they are installed from PyPI (pure Python) when a box uses them.
async function installExtras(py: Pyodide, source: string) {
  const extras = [/\bopenpyxl\b/.test(source) && 'openpyxl', /\bseaborn\b/.test(source) && 'seaborn'].filter(Boolean)
  if (!extras.length) return
  await py.loadPackage(['micropip', 'numpy', 'pandas', 'matplotlib'])
  await py.runPythonAsync(`import micropip\nawait micropip.install(${JSON.stringify(extras)})`)
}

type Result = { text: string; error: boolean; images?: string[] }

export default function TryIt({ code, label }: { code: string; label?: string }) {
  const [source, setSource] = useState(code)
  const [result, setResult] = useState<Result | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'running'>('idle')

  const run = async () => {
    // Raw output capture: unlike the line-by-line mode it keeps text that has no newline yet, such as print(i, end=" ").
    let out = ''
    const decoder = new TextDecoder()
    const capture = {
      write: (bytes: Uint8Array) => {
        out += decoder.decode(bytes, { stream: true })
        return bytes.length
      },
    }
    try {
      setStatus(pyodide ? 'running' : 'loading')
      const py = await loadPython()
      // packages such as numpy are downloaded the first time a box imports them
      if (/^\s*(import|from)\s+(numpy|pandas|matplotlib|seaborn|openpyxl)/m.test(source)) setStatus('loading')
      await py.loadPackagesFromImports(source)
      await installExtras(py, source)
      setStatus('running')
      py.setStdout(capture)
      py.setStderr(capture)
      // pandas prints a long "Pyarrow will become required" notice when it is first imported; learners do not need it
      await py.runPythonAsync('import warnings\nwarnings.filterwarnings("ignore", category=DeprecationWarning)')
      const charts = /matplotlib|seaborn/.test(source)
      if (charts) await py.runPythonAsync(CHART_SETUP)
      await py.runPythonAsync(source)
      await flushOutput(py)
      const images = charts ? (JSON.parse((await py.runPythonAsync(CHART_COLLECT)) as string) as string[]) : []
      setResult({ text: out.replace(/\n$/, '') || (images.length ? '' : '(no output)'), error: false, images })
    } catch (e) {
      const ready = await pyodide?.catch(() => null)
      if (ready) await flushOutput(ready)
      // Pyodide adds its own internal frames first; start from the learner's code ("<exec>") and rename it.
      const all = (e instanceof Error ? e.message : String(e)).trim().split('\n')
      const first = all.findLastIndex((l) => l.includes('File "<exec>"'))
      const msg = (first >= 0 ? all.slice(first) : all.slice(-4)).join('\n').replace('File "<exec>"', 'File "your code"')
      setResult({ text: [out.replace(/\n$/, ''), msg].filter(Boolean).join('\n'), error: true })
    } finally {
      setStatus('idle')
    }
  }

  const busy = status !== 'idle'

  return (
    <figure className="codeblock try">
      <figcaption>
        <span>{label ?? 'Try it'}</span>
        <span className="try-actions">
          <button type="button" className="try-reset" onClick={() => openBoard(source, label)} title="Show this code on a white screen to explain it">
            ⬜ Board
          </button>
          <button type="button" className="try-reset" onClick={() => { setSource(code); setResult(null) }} disabled={busy}>
            Reset
          </button>
          <button type="button" className="try-run" onClick={run} disabled={busy}>
            {status === 'loading' ? 'Loading Python…' : status === 'running' ? 'Running…' : '▶ Run'}
          </button>
        </span>
      </figcaption>
      <textarea
        className="try-editor"
        value={source}
        spellCheck={false}
        wrap="off"
        aria-label="Python code you can edit and run"
        rows={Math.max(3, source.split('\n').length)}
        onChange={(e) => setSource(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Tab') {
            e.preventDefault()
            const el = e.currentTarget
            const { selectionStart: a, selectionEnd: b } = el
            setSource(source.slice(0, a) + '    ' + source.slice(b))
            requestAnimationFrame(() => el.setSelectionRange(a + 4, a + 4))
          } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault()
            run()
          }
        }}
      />
      {status === 'loading' && <p className="try-hint">First run downloads Python (a few MB). It is quick after that.</p>}
      {result && (
        <div className="codeblock-out">
          <span>{result.error ? 'Error' : 'Output'}</span>
          {result.text && <pre className={result.error ? 'try-error' : undefined}>{result.text}</pre>}
          {result.images?.map((img, i) => (
            <img key={i} className="try-chart" src={'data:image/png;base64,' + img} alt={`Chart ${i + 1} drawn by your code`} />
          ))}
        </div>
      )}
    </figure>
  )
}
